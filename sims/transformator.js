(function () {
"use strict";
window.F11 = window.F11 || {};

/* ==========================================================================
   sims/transformator.js
   --------------------------------------------------------------------------
   Konu 2.3.4 · Transformatör  (MEB 11, s.263-272)

   İDEAL TRANSFORMATÖR (kitap s.268)
   ---------------------------------
   Birincil ve ikincil bobindeki akı değişimi aynıdır (demir çekirdek akıyı
   kayıpsız taşır). Faraday: V_p = −N_p·ΔΦ/Δt, V_s = −N_s·ΔΦ/Δt ⟹
       V_p / V_s = N_p / N_s ,   P_p = P_s ⟹ V_p·i_p = V_s·i_s
   Gerçekte ısınma ve çekirdek kayıpları yüzünden P_s < P_p (verim).

   DOĞRU AKIMDA ÇALIŞMAZ
   ---------------------
   Sabit akım sabit akı üretir; ΔΦ = 0 ⟹ ikincilde gerilim YOK. Yalnızca
   anahtar kapandığı an, birincil akım yükselirken kısa bir DARBE görülür.

   ENERJİ İLETİMİ (kitap s.263, s.269)
   ----------------------------------
   Hattaki kayıp P_k = i²·R_hat. Aynı güç P = V·i daha YÜKSEK gerilimle
   taşınırsa akım düşer, kayıp 1/V² ile azalır. Bu yüzden santralin yanında
   YÜKSELTİCİ (K), şehre yakın ALÇALTICI (L, M) transformatörler kullanılır.
   ========================================================================== */

const D = window.F11;
const { R, K } = D;

const F_SEBEKE = 50;              // Hz
const AGIR = 40;                  // 50 Hz ekranda ~1,25 Hz
const TAU_DC = 0.004;             // s — birincil sargının L/R süresi (DC darbesi)

/* ------------------------------------------------------------- Fizik */

function dcMi(p) { return p.mod > 1.5 && p.mod < 2.5; }
function iletimMi(p) { return p.mod > 2.5; }
function oran(p) { return p.N2 / Math.max(1, p.N1); }

/** İkincil etkin gerilim (V). DC’de sürekli durumda sıfır. */
function v2(p) { return dcMi(p) ? 0 : p.V1 * oran(p); }
function i2(p) { return v2(p) / Math.max(1, p.Ryuk); }
function p2(p) { return v2(p) * i2(p); }
function p1(p) { return p2(p) / Math.max(0.01, p.verim / 100); }
function i1(p) { return dcMi(p) ? Infinity : p1(p) / Math.max(1, p.V1); }
function kayip(p) { return p1(p) - p2(p); }

function tur(p) {
  if (Math.abs(oran(p) - 1) < 0.02) return 'AYIRICI (1:1)';
  return oran(p) > 1 ? 'YÜKSELTİCİ' : 'ALÇALTICI';
}

/** Gerçek zaman (s). */
function gercekT(st) { return st.t / AGIR; }

/** Anlık gerilimler (V). AC: aynı fazda sinüs; DC: V₁ sabit, V₂ yalnız
    anahtar kapanırken e^(−t/τ) darbesi (birincil akım yükselirken). */
function v1An(st, p) {
  const t = gercekT(st);
  return dcMi(p) ? p.V1 : p.V1 * Math.SQRT2 * Math.sin(2 * Math.PI * F_SEBEKE * t);
}
function v2An(st, p) {
  const t = gercekT(st);
  if (dcMi(p)) return p.V1 * oran(p) * Math.exp(-t / TAU_DC);
  return v1An(st, p) * oran(p);
}

/* --- enerji iletimi --- */
function hatAkimi(p) { return p.Psan * 1e6 / (p.Vhat * 1e3); }         // A
function hatKaybi(p) { const i = hatAkimi(p); return i * i * p.Rhat; }     // W
function kayipOrani(p) { return hatKaybi(p) / (p.Psan * 1e6); }

/* -------------------------------------------------------------- Durum */

function durum(p) { return { t: 0, kayit: [], Vhat: p.Vhat }; }

/* Enerji iletiminde Oynat’a basılınca K transformatörünün çıkış gerilimi
   (kademe değiştirici) taranır: gerilim yükseldikçe hat akımı ve kayıp
   canlı olarak düşer, imleç eğriler üzerinde kayar. */
const ILETIM_TARAMA = 12;          // s

function adim(st, dt, p) {
  st.t += dt;
  if (iletimMi(p)) {
    /* düşük gerilime doğru taranır: kaybın hızla büyüdüğü dik bölge görünsün */
    st.Vhat = D.tarama(st.t, p.Vhat, p.Vhat < 40 ? 400 : 10, ILETIM_TARAMA);
    return;
  }
  /* ts: sahne zamanı (kayıt aralığı için) · t: gerçek zaman (ms, grafik ekseni) */
  if (st.kayit.length === 0 || st.t - st.kayit[st.kayit.length - 1].ts > 0.01)
    st.kayit.push({ ts: st.t, t: gercekT(st) * 1000, v: v2An(st, p) });
  if (st.kayit.length > 500) st.kayit.shift();
}

function bitti() { return false; }

/** Taranan iletim gerilimiyle güncellenmiş parametreler. */
function etkin(st, p) {
  return iletimMi(p) && st && st.Vhat != null ? Object.assign({}, p, { Vhat: st.Vhat }) : p;
}

/* --------------------------------------------- Gerçekçi görünüm */

function cizGercek(ctx, w, h, st, pHam) {
  const p = etkin(st, pHam);
  if (iletimMi(p)) { cizIletim(ctx, w, h, st, p); return; }
  const cy = h * 0.48, cx = w * 0.50, cw = 120, ch = 150;

  ctx.save(); ctx.strokeStyle = '#6E7684'; ctx.lineWidth = 26;
  ctx.strokeRect(cx - cw / 2, cy - ch / 2, cw, ch); ctx.restore();
  D.yaziAydinlik(ctx, 'demir çekirdek', cx, cy + ch / 2 + 26, R.mur, '600 11px system-ui, sans-serif', 'center');

  const sol = Math.max(3, Math.min(12, Math.round(p.N1 / 100)));
  const sag = Math.max(3, Math.min(12, Math.round(p.N2 / 100)));
  ctx.save(); ctx.strokeStyle = '#B87333'; ctx.lineWidth = 4;
  for (let k = 0; k < sol; k++) { const yy = cy - ch / 2 + 16 + k * ((ch - 32) / Math.max(1, sol - 1)); ctx.beginPath(); ctx.moveTo(cx - cw / 2 - 26, yy); ctx.lineTo(cx - cw / 2 + 14, yy); ctx.stroke(); }
  for (let k = 0; k < sag; k++) { const yy = cy - ch / 2 + 16 + k * ((ch - 32) / Math.max(1, sag - 1)); ctx.beginPath(); ctx.moveTo(cx + cw / 2 - 14, yy); ctx.lineTo(cx + cw / 2 + 26, yy); ctx.stroke(); }
  ctx.restore();

  /* akı: AC’de çekirdek boyunca yön değiştirerek salınır; DC’de sabit */
  const t = gercekT(st);
  const akiFaz = dcMi(p) ? 0 : -Math.cos(2 * Math.PI * F_SEBEKE * t);        // Φ ∝ ∫V dt
  ctx.save();
  ctx.strokeStyle = 'rgba(56,150,200,.85)'; ctx.lineWidth = 2; ctx.setLineDash([7, 5]);
  ctx.lineDashOffset = 18 * akiFaz;
  ctx.globalAlpha = dcMi(p) ? 0.5 : 0.35 + 0.65 * Math.abs(akiFaz);
  ctx.strokeRect(cx - cw / 2, cy - ch / 2, cw, ch); ctx.restore();
  D.yaziAydinlik(ctx, dcMi(p) ? (t < 5 * TAU_DC ? 'Φ artıyor (anahtar yeni kapandı)' : 'Φ SABİT') : 'Φ yön değiştiriyor',
                 cx, cy, dcMi(p) && t >= 5 * TAU_DC ? '#B03030' : R.normal, '700 11px system-ui, sans-serif', 'center');

  /* giriş kaynağı ve anlık gerilim */
  const kx = w * 0.13;
  ctx.fillStyle = dcMi(p) ? '#8A6838' : '#2F6FD0';
  D.yuvarlakDik(ctx, kx - 30, cy - 26, 60, 52, 6); ctx.fill();
  D.yaziAydinlik(ctx, dcMi(p) ? '=' : '~', kx, cy, '#FFFFFF', '700 22px system-ui, sans-serif', 'center');
  D.yaziAydinlik(ctx, dcMi(p) ? 'DC kaynak (pil)' : 'AC kaynak · 50 Hz', kx, cy + 44, R.mur, '600 11px system-ui, sans-serif', 'center');
  ctx.strokeStyle = '#7D8A99'; ctx.lineWidth = 2.4;
  ctx.beginPath();
  ctx.moveTo(kx + 30, cy - 14); ctx.lineTo(cx - cw / 2 - 26, cy - 14);
  ctx.moveTo(kx + 30, cy + 14); ctx.lineTo(cx - cw / 2 - 26, cy + 14);
  ctx.stroke();

  /* çıkış yükü — ampul, parlaklığı ikincil güçle */
  const ax = w * 0.87;
  const v2a = v2An(st, p);
  const Pan = v2a * v2a / Math.max(1, p.Ryuk);
  const parlak = dcMi(p) ? Math.min(1, Pan / 200) : Math.min(1, p2(p) / 200);   // akkor flaman AC’de ortalamayı izler
  ctx.save(); ctx.globalAlpha = 0.2 + parlak * 0.8;
  const g = ctx.createRadialGradient(ax, cy, 4, ax, cy, 40);
  g.addColorStop(0, '#FFE9A8'); g.addColorStop(1, 'rgba(255,210,74,0)');
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(ax, cy, 40, 0, 6.2832); ctx.fill(); ctx.restore();
  ctx.fillStyle = parlak > 0.05 ? '#FFD24A' : '#5A5A4A';
  ctx.beginPath(); ctx.arc(ax, cy, 20, 0, 6.2832); ctx.fill();
  ctx.strokeStyle = '#7D8A99'; ctx.lineWidth = 2.4;
  ctx.beginPath();
  ctx.moveTo(cx + cw / 2 + 26, cy - 14); ctx.lineTo(ax, cy - 14);
  ctx.moveTo(cx + cw / 2 + 26, cy + 14); ctx.lineTo(ax, cy + 14);
  ctx.stroke();

  D.yaziAydinlik(ctx, 'N_p = ' + D.biçim(p.N1), cx - cw / 2 - 30, cy - ch / 2 - 10, R.mur, '700 12px system-ui, sans-serif', 'center');
  D.yaziAydinlik(ctx, 'N_s = ' + D.biçim(p.N2), cx + cw / 2 + 30, cy - ch / 2 - 10, R.mur, '700 12px system-ui, sans-serif', 'center');
  D.yaziAydinlik(ctx, 'V_p = ' + D.biçim(p.V1) + ' V' + (dcMi(p) ? '' : ' (etkin)'), 10, 24, R.normal, '700 12px system-ui, sans-serif', 'left');
  D.yaziAydinlik(ctx, 'V_s = ' + D.biçim(dcMi(p) ? v2a : v2(p), dcMi(p) ? 2 : 1) + ' V' + (dcMi(p) ? '' : ' (etkin)'), w - 10, 24, R.ivme,
                 '700 13px system-ui, sans-serif', 'right');

  D.rozet(ctx, dcMi(p) ? 'DC — ÇALIŞMAZ' : tur(p), w / 2, 52,
          dcMi(p) ? 'rgba(176,48,48,.95)' : (oran(p) > 1 ? 'rgba(226,72,63,.92)' : 'rgba(47,111,208,.92)'),
          '#FFFFFF', '700 12px system-ui, sans-serif', true);

  D.yaziAydinlik(ctx, dcMi(p) ? 'anahtar kapanırken kısa bir darbe, sonra ΔΦ = 0 ⟹ V_s = 0 · birincil sargı ISINIR'
                              : 'gerilim yükselirse akım düşer — güç korunur (ağır çekim ×' + AGIR + ')',
                 w / 2, h - 12, dcMi(p) ? '#B03030' : R.mur, '600 11px system-ui, sans-serif', 'center');
}

function cizIletim(ctx, w, h, st, p) {
  const y = h * 0.46;
  const kutu = (x, ust, alt, renk) => {
    ctx.fillStyle = renk; D.yuvarlakDik(ctx, x - 22, y - 20, 44, 40, 5); ctx.fill();
    D.yaziAydinlik(ctx, ust, x, y - 32, R.mur, '700 11px system-ui, sans-serif', 'center');
    D.yaziAydinlik(ctx, alt, x, y + 34, R.mur, '600 10px system-ui, sans-serif', 'center');
  };
  const xs = w * 0.07, xK = w * 0.20, xL = w * 0.74, xM = w * 0.86, xe = w * 0.95;
  const oranK = kayipOrani(p);
  /* hat: kayıp oranıyla kızarır */
  const isi = Math.min(1, oranK * 4);
  ctx.save();
  ctx.strokeStyle = 'rgb(' + Math.round(110 + 145 * isi) + ',' + Math.round(118 - 60 * isi) + ',' + Math.round(132 - 90 * isi) + ')';
  ctx.lineWidth = 3 + 3 * isi;
  ctx.beginPath(); ctx.moveTo(xK + 22, y - 8); ctx.lineTo(xL - 22, y - 8); ctx.moveTo(xK + 22, y + 8); ctx.lineTo(xL - 22, y + 8); ctx.stroke();
  ctx.restore();
  /* direkler */
  for (let x = xK + 60; x < xL - 40; x += 70) {
    ctx.strokeStyle = '#8A93A0'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(x, y - 30); ctx.lineTo(x - 10, y + 60); ctx.moveTo(x, y - 30); ctx.lineTo(x + 10, y + 60); ctx.stroke();
  }
  /* akım: yükler ileri-geri (AC) ama hız ∝ akım — hatta taşınan AKIM göstergesi */
  const iHat = hatAkimi(p);
  const gen = Math.min(18, 2 + iHat / 60);
  const sal = Math.sin(2 * Math.PI * 1.25 * st.t) * gen;
  ctx.fillStyle = '#FFB020';
  for (let x = xK + 34; x < xL - 30; x += 26) { ctx.beginPath(); ctx.arc(x + sal, y - 8, 2.8, 0, 6.2832); ctx.fill(); }

  kutu(xs, 'santral', D.biçim(10) + ' kV', '#5F6B78');
  kutu(xK, 'K · yükseltici', '10 → ' + D.biçim(p.Vhat, 0) + ' kV', p.Vhat >= 10 ? '#E2483F' : '#2F6FD0');
  kutu(xL, 'L · alçaltıcı', D.biçim(p.Vhat, 0) + ' → 10 kV', '#2F6FD0');
  kutu(xM, 'M · alçaltıcı', '10 kV → 220 V', '#2F6FD0');
  ctx.fillStyle = '#B87333'; ctx.beginPath(); ctx.moveTo(xe - 14, y + 20); ctx.lineTo(xe - 14, y - 4); ctx.lineTo(xe, y - 18); ctx.lineTo(xe + 14, y - 4); ctx.lineTo(xe + 14, y + 20); ctx.closePath(); ctx.fill();
  D.yaziAydinlik(ctx, 'ev', xe, y + 34, R.mur, '600 10px system-ui, sans-serif', 'center');
  ctx.strokeStyle = '#7D8A99'; ctx.lineWidth = 2;
  [[xs + 22, xK - 22], [xL + 22, xM - 22], [xM + 22, xe - 14]].forEach(([a, b]) => { ctx.beginPath(); ctx.moveTo(a, y); ctx.lineTo(b, y); ctx.stroke(); });

  D.yaziAydinlik(ctx, 'hat akımı i = P/V = ' + D.biçim(iHat, 1) + ' A', (xK + xL) / 2, y - 48, '#B07800', '700 12px system-ui, sans-serif', 'center');
  D.yaziAydinlik(ctx, 'hatta ısıya giden: i²·R = ' + (hatKaybi(p) >= 1e6 ? D.biçim(hatKaybi(p) / 1e6, 2) + ' MW' : D.biçim(hatKaybi(p) / 1e3, 1) + ' kW') +
                 ' (%' + D.biçim(Math.min(100, oranK * 100), 2) + ')', (xK + xL) / 2, y + 78, oranK > 0.1 ? '#B03030' : '#1A7A55',
                 '700 12px system-ui, sans-serif', 'center');
  D.yaziAydinlik(ctx, 'P = ' + D.biçim(p.Psan) + ' MW · hat direnci R = ' + D.biçim(p.Rhat) + ' Ω', 10, 20, R.mur, '700 12px system-ui, sans-serif', 'left');
  D.yaziAydinlik(ctx, oranK >= 1 ? 'bu gerilimle güç taşınamaz: kayıp üretimi aşıyor'
                     : 'gerilimi k katına çıkarmak kaybı k² kat azaltır (kitap s.269)',
                 w / 2, h - 12, oranK >= 1 ? '#B03030' : R.mur, '600 11px system-ui, sans-serif', 'center');
}

/* ----------------------------------------- Klasik fizik görünümü */

function cizKlasik(ctx, w, h, st, pHam) {
  const p = etkin(st, pHam);
  D.izgara(ctx, w, h, 26);

  if (iletimMi(p)) {
    D.yaziHaleli(ctx, 'Neden yüksek gerilim?', 12, 22, K.beyaz, '700 12px system-ui, sans-serif', 'left');
    const satir = [
      ['P = V · i  ⟹  i = P / V', K.beyaz, '700 12px system-ui, sans-serif'],
      ['i = ' + D.biçim(p.Psan) + ' MW / ' + D.biçim(p.Vhat) + ' kV = ' + D.biçim(hatAkimi(p), 1) + ' A', K.metin2, '11px system-ui, sans-serif'],
      ['P_kayıp = i² · R_hat', R.kuvvet, '700 12px system-ui, sans-serif'],
      ['= ' + D.biçim(hatAkimi(p), 1) + '² · ' + D.biçim(p.Rhat) + ' = ' + D.biçim(hatKaybi(p) / 1e3, 1) + ' kW', K.metin2, '11px system-ui, sans-serif'],
      ['kayıp oranı = P·R/V² = %' + D.biçim(Math.min(100, kayipOrani(p) * 100), 3), R.ivme, '700 12px system-ui, sans-serif'],
      ['', K.metin2, '11px'],
      ['Telin direnci ekonomik sebeple sabit;', K.metin2, '11px system-ui, sans-serif'],
      ['kaybı azaltmanın yolu AKIMI düşürmek,', K.metin2, '11px system-ui, sans-serif'],
      ['bunun için GERİLİMİ yükseltmektir.', R.hiz, '700 11px system-ui, sans-serif']
    ];
    let sy = 46;
    satir.forEach(([t, c, f]) => { if (t) D.yaziHaleli(ctx, t, 16, sy, c, f, 'left'); sy += 18; });
    return;
  }

  D.yaziHaleli(ctx, 'İdeal ve gerçek transformatör', 12, 22, K.beyaz, '700 12px system-ui, sans-serif', 'left');
  const gx = 30, gy = h * 0.34, gw = Math.min(200, w * 0.36);
  const P1 = dcMi(p) ? 0 : p1(p), P2 = dcMi(p) ? 0 : p2(p), Pk = P1 - P2;
  const enB = Math.max(1e-6, P1);
  ctx.fillStyle = K.izgara; ctx.fillRect(gx, gy, gw, 22);
  ctx.fillStyle = R.hiz;    ctx.fillRect(gx, gy, gw * (P2 / enB), 22);
  ctx.fillStyle = R.kuvvet; ctx.fillRect(gx + gw * (P2 / enB), gy, gw * (Pk / enB), 22);
  D.yaziHaleli(ctx, 'P_p = ' + D.biçim(P1) + ' W', gx, gy - 10, K.beyaz, '700 11px system-ui, sans-serif', 'left');
  D.yaziHaleli(ctx, 'faydalı P_s = ' + D.biçim(P2) + ' W', gx, gy + 38, R.hiz, '600 11px system-ui, sans-serif', 'left');
  D.yaziHaleli(ctx, 'kayıp ' + D.biçim(Pk) + ' W', gx, gy + 54, R.kuvvet, '600 11px system-ui, sans-serif', 'left');
  D.yaziHaleli(ctx, 'verim = %' + D.biçim(p.verim), gx, gy + 78, R.ivme, '700 12px system-ui, sans-serif', 'left');

  const bx = gx + gw + 40;
  const satir = !dcMi(p) ? [
    ['V_p / V_s = N_p / N_s', K.beyaz, '700 12px system-ui, sans-serif'],
    [D.biçim(p.V1) + ' / ' + D.biçim(v2(p), 1) + ' = ' + D.biçim(p.N1) + ' / ' + D.biçim(p.N2), K.metin2, '11px system-ui, sans-serif'],
    ['', K.metin2, '11px'],
    ['İdealde V_p·i_p = V_s·i_s', K.beyaz, '700 12px system-ui, sans-serif'],
    ['i_p = ' + D.biçim(i1(p), 3) + ' A', K.metin2, '11px system-ui, sans-serif'],
    ['i_s = ' + D.biçim(i2(p), 3) + ' A', R.normal, '700 12px system-ui, sans-serif'],
    ['', K.metin2, '11px'],
    ['Gerçekte P_s < P_p (ısınma, çekirdek)', R.kuvvet, '700 11px system-ui, sans-serif']
  ] : [
    ['DOĞRU AKIMDA', R.kuvvet, '700 13px system-ui, sans-serif'],
    ['i sabit ⟹ Φ sabit ⟹ ΔΦ = 0', K.metin2, '11px system-ui, sans-serif'],
    ['V_s = −N_s·ΔΦ/Δt = 0', R.kuvvet, '700 13px system-ui, sans-serif'],
    ['', K.metin2, '11px'],
    ['Yalnız anahtar kapanırken akım', K.metin2, '11px system-ui, sans-serif'],
    ['yükselir ⟹ kısa bir darbe', K.metin2, '11px system-ui, sans-serif'],
    ['', K.metin2, '11px'],
    ['Birincil akımı yalnız sargı direnci', K.metin2, '11px system-ui, sans-serif'],
    ['sınırlar ⟹ sargı ISINIR', R.kuvvet, '11px system-ui, sans-serif']
  ];
  let sy = 46;
  satir.forEach(([t, c, f]) => { if (t) D.yaziHaleli(ctx, t, bx, sy, c, f, 'left'); sy += 17; });

  D.yaziHaleli(ctx, 'Gerilim kazanırsan akım kaybedersin — bedava enerji yok',
               12, h - 16, R.ivme, '600 11px system-ui, sans-serif', 'left');
}

/* ------------------------------------------------------- Grafikler */

function cizGrafik(ctx, w, h, st, pHam) {
  const p = etkin(st, pHam);
  const pay = 8, gw = (w - pay * 3) / 2, gh = h - 6;

  if (iletimMi(p)) {
    const v1 = [], v2v = [];
    for (let V = 10; V <= 400; V += 2) {
      const q = Object.assign({}, p, { Vhat: V });
      v1.push({ t: V, v: Math.min(100, kayipOrani(q) * 100) });
      v2v.push({ t: V, v: hatAkimi(q) });
    }
    D.miniGrafik(ctx, {
      x: pay, y: 3, w: gw, h: gh,
      baslik: 'Kayıp oranı − iletim gerilimi   (∝ 1/V²)', birim: '%', tEtiket: 'V (kV)',
      imlec: { t: p.Vhat, v: Math.min(100, kayipOrani(p) * 100) },
      veri: v1, tMin: 10, tMax: 400, vMin: 0, vMax: Math.min(100, Math.max(1, kayipOrani(Object.assign({}, p, { Vhat: 10 })) * 100)),
      renk: R.kuvvet
    });
    D.miniGrafik(ctx, {
      x: pay * 2 + gw, y: 3, w: gw, h: gh,
      baslik: 'Hat akımı − iletim gerilimi   (i = P/V)', birim: 'A', tEtiket: 'V (kV)',
      imlec: { t: p.Vhat, v: hatAkimi(p) },
      veri: v2v, tMin: 10, tMax: 400, vMin: 0, vMax: hatAkimi(Object.assign({}, p, { Vhat: 10 })),
      renk: R.ivme
    });
    return;
  }

  const v1v = [];
  for (let n = 50; n <= 2000; n += 25) v1v.push({ t: n, v: dcMi(p) ? 0 : p.V1 * (n / Math.max(1, p.N1)) });
  D.miniGrafik(ctx, {
    x: pay, y: 3, w: gw, h: gh,
    baslik: 'V_s − N_s   (sarımla DOĞRU orantı · etkin)', birim: 'V', tEtiket: 'N_s (sarım)',
    imlec: { t: p.N2, v: v2(p) },
    veri: v1v, tMin: 50, tMax: 2000, vMin: 0,
    vMax: Math.max(1, p.V1 * (2000 / Math.max(1, p.N1)) * 1.05),
    renk: R.ivme
  });

  const t0 = st.kayit.length ? st.kayit[0].t : 0, tS = Math.max(t0 + (dcMi(p) ? 20 : 40), gercekT(st) * 1000);
  const tepe = Math.max(1, p.V1 * (dcMi(p) ? 1 : Math.SQRT2) * oran(p));
  D.miniGrafik(ctx, {
    x: pay * 2 + gw, y: 3, w: gw, h: gh,
    baslik: dcMi(p) ? 'V_s − t   (DC: yalnız anahtar kapanırken darbe)' : 'V_s − t   (V_p ile aynı biçim · 50 Hz)', birim: 'V', tEtiket: 't (ms)',
    veri: st.kayit.filter(q => q.t >= tS - 60), tMin: Math.max(t0, tS - 60), tMax: tS,
    vMin: dcMi(p) ? 0 : -tepe * 1.1, vMax: tepe * 1.1, renk: R.normal
  });
}

/* ----------------------------------------------------------- Okumalar */

function okumalar(st, pHam) {
  const p = etkin(st, pHam);
  if (iletimMi(p)) {
    return [
      { et: 'Santral gücü',   dg: D.biçim(p.Psan),                birim: 'MW' },
      { et: 'İletim gerilimi',dg: D.biçim(p.Vhat),                birim: 'kV' },
      { et: 'Hat akımı',      dg: D.biçim(hatAkimi(p), 1),        birim: 'A' },
      { et: 'Hattaki kayıp',  dg: D.biçim(hatKaybi(p) / 1e3, 1),  birim: 'kW' },
      { et: 'Kayıp oranı',    dg: '%' + D.biçim(Math.min(100, kayipOrani(p) * 100), 3), birim: '' }
    ];
  }
  return [
    { et: 'Tür',        dg: dcMi(p) ? 'DC — çalışmaz' : tur(p),     birim: '' },
    { et: 'N_p / N_s',  dg: D.biçim(p.N1) + ' / ' + D.biçim(p.N2),  birim: '' },
    { et: 'V_p',        dg: D.biçim(p.V1),                          birim: 'V' },
    { et: 'V_s',        dg: dcMi(p) ? D.biçim(v2An(st, p), 2) : D.biçim(v2(p), 1), birim: 'V' },
    { et: 'i_p',        dg: dcMi(p) ? 'Çok büyük (ısınır)' : D.biçim(i1(p), 3), birim: dcMi(p) ? '' : 'A' },
    { et: 'i_s',        dg: D.biçim(dcMi(p) ? v2An(st, p) / Math.max(1, p.Ryuk) : i2(p), 3), birim: 'A' },
    { et: 'P_p / P_s',  dg: dcMi(p) ? '—' : D.biçim(p1(p)) + ' / ' + D.biçim(p2(p)), birim: 'W' }
  ];
}

/* ------------------------------------------------------------- Tanım */

D.simler = D.simler || {};
D.simler['transformator'] = {
  id: 'transformator',
  baslik: '2.3.4 · Transformatör · sarım oranı, güç, enerji iletimi',
  yukseklik: 330,
  grafikPanel: true,
  grafikYukseklik: 170,
  parametreler: [
    { anahtar: 'mod', etiket: 'Düzenek', tur: 'secim', deger: 1, secenekler: [
      { d: 1, e: 'Transformatör · AC kaynak' },
      { d: 2, e: 'Transformatör · DC kaynak (dene, çalışmayacak)' },
      { d: 3, e: 'Enerji iletimi · neden yüksek gerilim?' }
    ]},
    { anahtar: 'V1',   etiket: 'Birincil gerilim V_p (1–2)', min: 2, max: 400, adim: 2, deger: 220, birim: 'V' },
    { anahtar: 'N1',   etiket: 'Birincil sarım N_p (1–2)', min: 50, max: 2000, adim: 50, deger: 1000, birim: '' },
    { anahtar: 'N2',   etiket: 'İkincil sarım N_s (1–2)', min: 50, max: 2000, adim: 50, deger: 200, birim: '' },
    { anahtar: 'Ryuk', etiket: 'Yük direnci (1–2)', min: 2, max: 200, adim: 2, deger: 20, birim: 'Ω' },
    { anahtar: 'verim',etiket: 'Verim (1)', min: 70, max: 100, adim: 1, deger: 96, birim: '%' },
    { anahtar: 'Vhat', etiket: 'İletim gerilimi (3)', min: 10, max: 400, adim: 2, deger: 154, birim: 'kV' },
    { anahtar: 'Psan', etiket: 'Taşınan güç (3)', min: 1, max: 100, adim: 1, deger: 10, birim: 'MW' },
    { anahtar: 'Rhat', etiket: 'Hat direnci (3)', min: 1, max: 20, adim: 1, deger: 5, birim: 'Ω' }
  ],
  durum, adim, bitti, cizGercek, cizKlasik, cizGrafik, okumalar
};

})();
