(function () {
"use strict";
window.F11 = window.F11 || {};

/* ==========================================================================
   sims/alternatif-akim.js
   --------------------------------------------------------------------------
   Konu 2.3.3 · Alternatif akım  (MEB 11, s.253-262)

   ALTERNATİF AKIM NASIL DOĞAR? (kitap s.254-258)
   ---------------------------------------------
   Manyetik alanda dönen N sarımlı çerçevede
       Φ = B·A·cos(ωt)   ⟹   ε = N·B·A·ω·sin(ωt),   ε_maks = N·B·A·ω
   Yönü ve büyüklüğü periyodik değişen bu akım ALTERNATİF akımdır; en büyük
   değeri B, N, A ve dönme frekansıyla doğru orantılıdır. Periyot T = 1/f.

   ETKİN DEĞER
   -----------
       V_etkin = V_maks / √2 ,  i_etkin = i_maks / √2
   Tanım (kitap s.258): aynı direnci aynı sürede aynı kadar ısıtan DOĞRU
   akımın değeri. Ampermetre ve voltmetre etkin değeri gösterir.
   Türkiye şebekesi: 220 V etkin, 50 Hz (tepe ≈ 311 V).

   ÜÇ DÜZENEK
   ----------
   1) Priz ve ampul (şebeke)
   2) AC jeneratörü: çerçeve döner, bilezikler ve fırçalarla lambaya bağlanır
   3) Etkin değer: aynı iki direnç, biri AC biri V_etkin’lik DC ile ısıtılır;
      tam periyotların sonunda ısılar EŞİTTİR.

   AĞIR ÇEKİM
   ----------
   50 Hz’in periyodu 0,02 s’dir; gözle izlenemez. Sahne, ekranda saniyede
   ~1,25 dönme olacak biçimde yavaşlatılır; bütün değerler GERÇEKTİR.
   ========================================================================== */

const D = window.F11;
const { R, K } = D;

/* ------------------------------------------------------------- Fizik */

function jenerator(p) { return p.mod > 1.5 && p.mod < 2.5; }
function omega(p) { return 2 * Math.PI * p.f; }

function vTepe(p) {
  if (jenerator(p)) return p.N * p.B * (p.A / 1e4) * omega(p);
  return p.Vetkin * Math.SQRT2;
}
function vEtkin(p) { return vTepe(p) / Math.SQRT2; }
function iTepe(p)  { return vTepe(p) / Math.max(1, p.R); }
function iEtkin(p) { return iTepe(p) / Math.SQRT2; }

/** Ağır çekim katsayısı: ekranda en çok ~1,25 periyot/s. */
function agir(p) { return Math.max(1, p.f / 1.25); }
function sahneT(st, p) { return st.t / agir(p); }            // GERÇEK zaman (s)

function vAn(st, p) { return vTepe(p) * Math.sin(omega(p) * sahneT(st, p)); }
function iAn(st, p) { return vAn(st, p) / Math.max(1, p.R); }
function gucAn(st, p) { const i = iAn(st, p); return i * i * p.R; }
function ortGuc(p) { return iEtkin(p) * vEtkin(p); }
function periyot(p) { return 1 / p.f; }

/** Isı (J) — AC direnç: ∫ i²R dt kapalı formu; DC: V_etkin²/R · t. */
function isiAC(t, p) {
  const w = omega(p), Vm = vTepe(p);
  return Vm * Vm / (2 * Math.max(1, p.R)) * (t - Math.sin(2 * w * t) / (2 * w));
}
function isiDC(t, p) { const V = vEtkin(p); return V * V / Math.max(1, p.R) * t; }

/* -------------------------------------------------------------- Durum */

function durum(p) { return { t: 0 }; }
function adim(st, dt, p) { st.t += dt; }
function bitti() { return false; }

/* --------------------------------------------- Gerçekçi görünüm */

function cizGercek(ctx, w, h, st, p) {
  if (jenerator(p)) { cizJenerator(ctx, w, h, st, p); return; }
  if (p.mod > 2.5)  { cizIsitma(ctx, w, h, st, p); return; }
  cizPriz(ctx, w, h, st, p);
}

/* Akkor flamanın ısıl zaman sabiti (s). Güç 2f frekansıyla dalgalanır ama
   flaman sıcaklığı bu dalgalanmayı 1/√(1 + (2·ω·τ)²) oranında süzer:
   50 Hz’de parlaklık yalnız ~%3 titrer, 1 Hz’de ise gözle görülür söner-yanar. */
const FLAMAN_TAU = 0.05;
function flamanTitresme(p) { return 1 / Math.sqrt(1 + Math.pow(2 * omega(p) * FLAMAN_TAU, 2)); }

/** Akkor ampul. anlikOran = P/P_ort − 1 ∈ [−1, 1]. */
function ampul(ctx, bx, by, anlikOran, p) {
  const parlak = Math.max(0, Math.min(1, 0.6 + 0.4 * flamanTitresme(p) * anlikOran));
  ctx.save();
  ctx.globalAlpha = 0.25 + parlak * 0.75;
  const g = ctx.createRadialGradient(bx, by, 4, bx, by, 46);
  g.addColorStop(0, '#FFE9A8'); g.addColorStop(1, 'rgba(255,210,74,0)');
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(bx, by, 46, 0, 6.2832); ctx.fill();
  ctx.restore();
  ctx.fillStyle = '#FFD24A'; ctx.beginPath(); ctx.arc(bx, by, 22, 0, 6.2832); ctx.fill();
  ctx.fillStyle = '#9AA5B1'; ctx.fillRect(bx - 9, by + 20, 18, 13);
}

function cizPriz(ctx, w, h, st, p) {
  const v = vAn(st, p);
  const px = w * 0.16, py = h * 0.30;
  ctx.fillStyle = '#E6E9EF';
  D.yuvarlakDik(ctx, px - 46, py - 46, 92, 92, 12); ctx.fill();
  ctx.fillStyle = '#23272E';
  [[-18, -8], [18, -8]].forEach(([dx, dy]) => { ctx.beginPath(); ctx.arc(px + dx, py + dy, 7, 0, 6.2832); ctx.fill(); });
  ctx.fillStyle = '#9AA5B1'; ctx.fillRect(px - 30, py + 26, 60, 6);
  D.yaziAydinlik(ctx, 'priz', px, py + 60, R.mur, '600 11px system-ui, sans-serif', 'center');

  const arti = v >= 0;
  D.yaziAydinlik(ctx, arti ? '+' : '−', px - 18, py - 26, arti ? '#E2483F' : '#2F6FD0', '700 18px system-ui, sans-serif', 'center');
  D.yaziAydinlik(ctx, arti ? '−' : '+', px + 18, py - 26, arti ? '#2F6FD0' : '#E2483F', '700 18px system-ui, sans-serif', 'center');

  ctx.strokeStyle = '#7D8A99'; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(px + 46, py); ctx.lineTo(w * 0.52, py); ctx.lineTo(w * 0.52, h * 0.52); ctx.stroke();

  /* Yükler bir yöne akıp gitmez, yerinde ileri-geri salınır (temsilî genlik). */
  const yerDeg = -Math.cos(omega(p) * sahneT(st, p)) * Math.min(12, 3 + iTepe(p) * 2);
  ctx.save(); ctx.fillStyle = '#2F6FD0';
  for (let x = px + 62; x < w * 0.52 - 8; x += 28) { ctx.beginPath(); ctx.arc(x + yerDeg, py, 3.2, 0, 6.2832); ctx.fill(); }
  ctx.restore();

  const bx = w * 0.62, by = h * 0.46;
  ampul(ctx, bx, by, gucAn(st, p) / Math.max(1e-9, ortGuc(p)) - 1, p);
  ctx.strokeStyle = '#7D8A99'; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(w * 0.52, h * 0.52); ctx.lineTo(bx, by + 33); ctx.stroke();

  D.yaziAydinlik(ctx, 'V_etkin = ' + D.biçim(vEtkin(p)) + ' V (voltmetre bunu gösterir)', w - 10, 30, R.normal, '700 12px system-ui, sans-serif', 'right');
  D.yaziAydinlik(ctx, 'V_maks = ' + D.biçim(vTepe(p)) + ' V', w - 10, 48, R.ivme, '700 12px system-ui, sans-serif', 'right');
  D.yaziAydinlik(ctx, 'anlık V = ' + D.biçim(v) + ' V', w - 10, 66, R.mur, '700 12px system-ui, sans-serif', 'right');
  D.yaziAydinlik(ctx, 'f = ' + D.biçim(p.f) + ' Hz · T = ' + D.biçim(periyot(p) * 1000, 1) + ' ms · ağır çekim ×' + D.biçim(agir(p), 0),
                 10, h - 12, R.mur, '600 11px system-ui, sans-serif', 'left');
  D.yaziAydinlik(ctx, 'anlık güç saniyede ' + D.biçim(2 * p.f) + ' kez sıfıra iner · parlaklık titremesi %' + D.biçim(100 * flamanTitresme(p), 0),
                 w - 10, h - 12, R.mur, '600 11px system-ui, sans-serif', 'right');
}

function cizJenerator(ctx, w, h, st, p) {
  const cx = w * 0.40, cy = h * 0.44, R0 = Math.min(w * 0.16, h * 0.26);
  ctx.fillStyle = '#E2483F'; ctx.fillRect(12, cy - R0 - 12, 40, (R0 + 12) * 2);
  ctx.fillStyle = '#2F6FD0'; ctx.fillRect(cx + R0 + 30, cy - R0 - 12, 40, (R0 + 12) * 2);
  ctx.fillStyle = '#FFFFFF'; ctx.font = '700 18px system-ui, sans-serif';
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText('N', 32, cy); ctx.fillText('S', cx + R0 + 50, cy);
  ctx.save(); ctx.strokeStyle = 'rgba(47,111,208,.45)'; ctx.lineWidth = 1.3;
  for (let k = -2; k <= 2; k++) { const yy = cy + k * (R0 * 0.5); ctx.beginPath(); ctx.moveTo(54, yy); ctx.lineTo(cx + R0 + 28, yy); ctx.stroke(); }
  ctx.restore();

  /* Dönme ekseni boyunca bakış. t = 0’da çerçeve alana DİK (akı en büyük). */
  const aci = omega(p) * sahneT(st, p);
  const sx = Math.sin(aci), sy = Math.cos(aci);
  const k1x = cx + sx * R0, k1y = cy - sy * R0, k2x = cx - sx * R0, k2y = cy + sy * R0;
  ctx.save(); ctx.strokeStyle = 'rgba(120,130,150,.45)'; ctx.lineWidth = 1; ctx.setLineDash([4, 5]);
  ctx.beginPath(); ctx.arc(cx, cy, R0, 0, 6.2832); ctx.stroke(); ctx.restore();
  ctx.save(); ctx.strokeStyle = '#B87333'; ctx.lineWidth = 5;
  ctx.beginPath(); ctx.moveTo(k1x, k1y); ctx.lineTo(k2x, k2y); ctx.stroke(); ctx.restore();
  D.noktaCisim(ctx, cx, cy, 4, '#3A4049');
  const v = vAn(st, p), oranE = Math.abs(v) / Math.max(1e-9, vTepe(p));
  if (oranE > 0.06) {
    const r = 4 + 8 * oranE;
    (v > 0 ? D.alanDisari : D.alanIceri)(ctx, k1x, k1y, r, '#7A4A10');
    (v > 0 ? D.alanIceri : D.alanDisari)(ctx, k2x, k2y, r, '#7A4A10');
  }

  /* bilezikler (kayar halkalar) ve fırçalar: akım yönü HİÇ çevrilmez ⟹ AC */
  const by = cy + R0 + 34;
  ctx.fillStyle = '#C9A24B'; ctx.beginPath(); ctx.arc(cx - 12, by, 10, 0, 6.2832); ctx.fill();
  ctx.fillStyle = '#A8782E'; ctx.beginPath(); ctx.arc(cx + 12, by, 10, 0, 6.2832); ctx.fill();
  ctx.fillStyle = '#3A4049'; ctx.fillRect(cx - 17, by + 10, 10, 8); ctx.fillRect(cx + 7, by + 10, 10, 8);
  D.yaziAydinlik(ctx, 'bilezikler · fırçalar', cx, by + 30, R.mur, '600 10px system-ui, sans-serif', 'center');

  const lx = w * 0.84, ly = cy + 10;
  ctx.strokeStyle = '#7D8A99'; ctx.lineWidth = 2.4;
  ctx.beginPath(); ctx.moveTo(cx - 12, by + 18); ctx.lineTo(cx - 12, h - 30); ctx.lineTo(lx - 8, h - 30); ctx.lineTo(lx - 8, ly + 33); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(cx + 12, by + 18); ctx.lineTo(cx + 12, h - 40); ctx.lineTo(lx + 8, h - 40); ctx.lineTo(lx + 8, ly + 33); ctx.stroke();
  ampul(ctx, lx, ly, gucAn(st, p) / Math.max(1e-9, ortGuc(p)) - 1, p);

  /* kitaptaki t₁ … t₅ çeyrek periyot konumları */
  const ceyrek = Math.floor(((aci / (Math.PI / 2)) % 4 + 4) % 4 + 1e-9);
  const tAdlari = ['t₁ = 0 → T/4', 't₂ = T/4 → T/2', 't₃ = T/2 → 3T/4', 't₄ = 3T/4 → T'];
  D.yaziAydinlik(ctx, tAdlari[ceyrek] + ' · θ = ' + D.biçim(((aci * 180 / Math.PI) % 360), 0) + '°', cx, 18, R.mur,
                 '700 11px system-ui, sans-serif', 'center');
  D.yaziAydinlik(ctx, 'ε = ' + D.biçim(v, 1) + ' V · ε_maks = N·B·A·ω = ' + D.biçim(vTepe(p), 1) + ' V', w - 10, 18, R.normal,
                 '700 12px system-ui, sans-serif', 'right');
  D.yaziAydinlik(ctx, 'dönme ' + D.biçim(p.f) + ' tur/s · ağır çekim ×' + D.biçim(agir(p), 0), 10, h - 12, R.mur,
                 '600 11px system-ui, sans-serif', 'left');
}

function cizIsitma(ctx, w, h, st, p) {
  const t = sahneT(st, p);
  const Qac = isiAC(t, p), Qdc = isiDC(t, p);
  const kab = (x, baslik, Q, renk, akiyor) => {
    const kx = x - 60, ky = h * 0.30, kw = 120, kh = h * 0.42;
    ctx.fillStyle = 'rgba(120,170,220,.25)'; ctx.fillRect(kx, ky + 16, kw, kh - 16);
    ctx.strokeStyle = '#7D8A99'; ctx.lineWidth = 2.4; ctx.strokeRect(kx, ky, kw, kh);
    /* direnç teli */
    ctx.save(); ctx.strokeStyle = akiyor ? '#E2483F' : '#B87333'; ctx.lineWidth = 3; ctx.beginPath();
    for (let k = 0; k <= 12; k++) { const xx = kx + 20 + k * 6.6, yy = ky + kh * 0.7 + (k % 2 ? -8 : 8); if (k) ctx.lineTo(xx, yy); else ctx.moveTo(xx, yy); }
    ctx.stroke(); ctx.restore();
    D.yaziAydinlik(ctx, baslik, x, ky - 14, renk, '700 12px system-ui, sans-serif', 'center');
    D.yaziAydinlik(ctx, 'Q = ' + D.biçim(Q, 1) + ' J', x, ky + kh + 18, renk, '700 12px system-ui, sans-serif', 'center');
  };
  const Pan = gucAn(st, p);
  kab(w * 0.28, 'AC · V_maks = ' + D.biçim(vTepe(p)) + ' V', Qac, R.ivme, Pan > 0.05 * ortGuc(p));
  kab(w * 0.68, 'DC · V = V_etkin = ' + D.biçim(vEtkin(p)) + ' V', Qdc, R.normal, true);
  D.yaziAydinlik(ctx, 'aynı R = ' + D.biçim(p.R) + ' Ω', w / 2, h * 0.30 + h * 0.21, R.mur, '700 11px system-ui, sans-serif', 'center');
  const tamPeriyot = Math.floor(t / periyot(p));
  D.yaziAydinlik(ctx, 't = ' + D.biçim(t * 1000, 1) + ' ms · ' + tamPeriyot + ' tam periyot · fark %' +
                 D.biçim(Qdc > 0 ? 100 * Math.abs(Qac - Qdc) / Qdc : 0, 1), w / 2, 18, R.mur, '700 12px system-ui, sans-serif', 'center');
  D.yaziAydinlik(ctx, 'tam periyotların sonunda ısılar EŞİT ⟹ etkin değer = V_maks/√2 (kitap s.258)',
                 10, h - 12, R.mur, '600 11px system-ui, sans-serif', 'left');
}

/* ----------------------------------------- Klasik fizik görünümü */

function cizKlasik(ctx, w, h, st, p) {
  D.izgara(ctx, w, h, 26);
  D.yaziHaleli(ctx, jenerator(p) ? 'AC jeneratörü' : 'Etkin (RMS) değer', 12, 22, K.beyaz, '700 12px system-ui, sans-serif', 'left');

  const gx = 40, gy = 52, gw = Math.min(170, w * 0.36), gh = h - gy - 62;
  const orta = gy + gh / 2;
  ctx.strokeStyle = K.eksen; ctx.lineWidth = 1.4;
  ctx.beginPath(); ctx.moveTo(gx, gy); ctx.lineTo(gx, gy + gh); ctx.moveTo(gx, orta); ctx.lineTo(gx + gw, orta); ctx.stroke();
  ctx.save(); ctx.strokeStyle = R.normal; ctx.lineWidth = 2.4; ctx.beginPath();
  for (let k = 0; k <= 80; k++) { const x = gx + (k / 80) * gw, yy = orta - Math.sin((k / 80) * 4 * Math.PI) * (gh / 2 - 6); if (k) ctx.lineTo(x, yy); else ctx.moveTo(x, yy); }
  ctx.stroke(); ctx.restore();
  const faz = (p.f * sahneT(st, p)) % 2;
  D.noktaCisim(ctx, gx + (faz / 2) * gw, orta - Math.sin(faz * 2 * Math.PI) * (gh / 2 - 6), 5, R.ivme);
  const eSeviye = (gh / 2 - 6) / Math.SQRT2;
  D.kesikliCizgi(ctx, gx, orta - eSeviye, gx + gw, orta - eSeviye, R.hiz, 1.6, [6, 4]);
  D.kesikliCizgi(ctx, gx, orta + eSeviye, gx + gw, orta + eSeviye, R.hiz, 1.6, [6, 4]);
  D.yaziHaleli(ctx, 'V_etkin', gx + gw + 4, orta - eSeviye, R.hiz, '600 10px system-ui, sans-serif', 'left');
  D.yaziHaleli(ctx, 'V_maks', gx + gw + 4, gy + 6, R.ivme, '600 10px system-ui, sans-serif', 'left');
  D.yaziHaleli(ctx, 'T = ' + D.biçim(periyot(p) * 1000, 1) + ' ms', gx + gw / 2, gy + gh + 14, K.metin2, '600 10px system-ui, sans-serif', 'center');

  const bx = gx + gw + 44;
  const satir = jenerator(p) ? [
    ['ε = N·B·A·ω·sin(ωt)', K.beyaz, '700 11px system-ui, sans-serif'],
    ['ε_maks = ' + D.biçim(p.N) + '·' + D.biçim(p.B, 2) + '·' + D.biçim(p.A / 1e4, 4) + '·' + D.biçim(omega(p), 1), K.metin2, '11px system-ui, sans-serif'],
    ['= ' + D.biçim(vTepe(p), 1) + ' V', R.ivme, '700 12px system-ui, sans-serif'],
    ['i_maks = ε_maks/R = ' + D.biçim(iTepe(p), 3) + ' A', K.metin2, '11px system-ui, sans-serif'],
    ['V_etkin = ' + D.biçim(vEtkin(p), 1) + ' V · T = 1/f', R.hiz, '700 11px system-ui, sans-serif'],
    ['', K.metin2, '11px'],
    ['B, N, A ya da ω 2 katı ⟹ i_maks 2 katı', K.metin2, '11px system-ui, sans-serif'],
    ['ω 4 katı ⟹ T dörtte bir', K.metin2, '11px system-ui, sans-serif']
  ] : [
    ['V = V_maks·sin(2πft)', K.beyaz, '700 11px system-ui, sans-serif'],
    ['V_etkin = V_maks / √2', R.hiz, '700 11px system-ui, sans-serif'],
    ['= ' + D.biçim(vTepe(p)) + ' / 1,41 = ' + D.biçim(vEtkin(p)) + ' V', R.hiz, '700 11px system-ui, sans-serif'],
    ['i_maks = ' + D.biçim(iTepe(p), 2) + ' A · i_etkin = ' + D.biçim(iEtkin(p), 2) + ' A', R.ivme, '700 11px system-ui, sans-serif'],
    ['P_ort = V_etkin·i_etkin = ' + D.biçim(ortGuc(p)) + ' W', R.kuvvet, '700 11px system-ui, sans-serif'],
    ['', K.metin2, '11px'],
    ['Q = i_etkin²·R·t = (V_etkin²/R)·t', K.beyaz, '700 11px system-ui, sans-serif'],
    ['Ampermetre/voltmetre ETKİN değeri gösterir', K.metin2, '11px system-ui, sans-serif']
  ];
  let sy = 46;
  satir.forEach(([t, c, f]) => { if (t) D.yaziHaleli(ctx, t, bx, sy, c, f, 'left'); sy += 17; });

  D.yaziHaleli(ctx, 'Etkin değer: aynı direnci aynı sürede aynı kadar ısıtan DC değeri',
               12, h - 16, R.ivme, '600 11px system-ui, sans-serif', 'left');
}

/* ------------------------------------------------------- Grafikler */

function cizGrafik(ctx, w, h, st, p) {
  const pay = 8, gw = (w - pay * 3) / 2, gh = h - 6;
  const tepe = vTepe(p);
  const pencere = periyot(p) * 3;
  const tS = sahneT(st, p), t0 = Math.max(0, tS - pencere);
  const ORNEK = 240, w0 = omega(p);
  const ms = 1000;

  if (p.mod > 2.5) {
    const g1 = [], g2 = [], q1 = [], q2 = [];
    const Tson = Math.max(periyot(p), tS);
    for (let k = 0; k <= ORNEK; k++) {
      const t = t0 + pencere * k / ORNEK;
      const i = tepe * Math.sin(w0 * t) / Math.max(1, p.R);
      g1.push({ t: (t - t0) * ms, v: i * i * p.R });
      const tq = Tson * k / ORNEK;
      q1.push({ t: tq * ms, v: isiAC(tq, p) });
    }
    D.miniGrafik(ctx, {
      x: pay, y: 3, w: gw, h: gh,
      baslik: 'P − t   (AC anlık güç · kesikli: DC gücü = ortalama)', birim: 'W', tEtiket: 't (ms)',
      imlec: { t: (tS - t0) * ms, v: gucAn(st, p) },
      veri: g1, tMax: pencere * ms, vMin: 0, vMax: ortGuc(p) * 2.2, renk: R.ivme
    });
    const gxp = pay + 34, gwi = Math.max(10, gw - 42), gyp = 3 + 18, ghi = Math.max(10, gh - 36);
    const yUst = D.guzelUst(ortGuc(p) * 2.2, 3);
    D.kesikliCizgi(ctx, gxp, gyp + ghi - ortGuc(p) / yUst * ghi, gxp + gwi, gyp + ghi - ortGuc(p) / yUst * ghi, R.normal, 1.6, [5, 4]);
    D.miniGrafik(ctx, {
      x: pay * 2 + gw, y: 3, w: gw, h: gh,
      baslik: 'Q − t   (AC basamaklı · DC doğru · periyot sonlarında eşit)', birim: 'J', tEtiket: 't (ms)',
      imlec: { t: tS * ms, v: isiAC(tS, p) },
      veri: q1, tMax: Tson * ms, vMin: 0, vMax: Math.max(1e-9, isiDC(Tson, p) * 1.1), renk: R.ivme
    });
    const gx2 = pay * 2 + gw + 34;
    const yUst2 = D.guzelUst(Math.max(1e-9, isiDC(Tson, p) * 1.1), 3);
    D.kesikliCizgi(ctx, gx2, gyp + ghi, gx2 + gwi, gyp + ghi - isiDC(Tson, p) / yUst2 * ghi, R.normal, 1.6, [5, 4]);
    return;
  }

  const vVeri = [], ikinci = [];
  for (let k = 0; k <= ORNEK; k++) {
    const t = t0 + (pencere * k) / ORNEK;
    const v = tepe * Math.sin(w0 * t);
    vVeri.push({ t: (t - t0) * ms, v });
    if (jenerator(p)) ikinci.push({ t: (t - t0) * ms, v: p.B * (p.A / 1e4) * Math.cos(w0 * t) * 1000 });   // mWb
    else { const i = v / Math.max(1, p.R); ikinci.push({ t: (t - t0) * ms, v: i * i * p.R }); }
  }
  if (jenerator(p)) {
    const Fm = p.B * (p.A / 1e4) * 1000;                                  // mWb
    D.miniGrafik(ctx, {
      x: pay, y: 3, w: gw, h: gh,
      baslik: 'Φ − t   (bir sarım · kosinüs)', birim: 'mWb', tEtiket: 't (ms)',
      imlec: { t: (tS - t0) * ms, v: Fm * Math.cos(w0 * tS) },
      veri: ikinci, tMax: pencere * ms, vMin: -Fm * 1.15, vMax: Fm * 1.15, renk: R.normal
    });
    D.miniGrafik(ctx, {
      x: pay * 2 + gw, y: 3, w: gw, h: gh,
      baslik: 'ε − t   (sinüs · akı sıfırken en büyük)', birim: 'V', tEtiket: 't (ms)',
      imlec: { t: (tS - t0) * ms, v: vAn(st, p) },
      veri: vVeri, tMax: pencere * ms, vMin: -tepe * 1.15, vMax: tepe * 1.15, renk: R.kuvvet
    });
    return;
  }
  D.miniGrafik(ctx, {
    x: pay, y: 3, w: gw, h: gh,
    baslik: 'V − t   (sinüs · yön değiştiriyor)', birim: 'V', tEtiket: 't (ms)',
    imlec: { t: (tS - t0) * ms, v: vAn(st, p) },
    veri: vVeri, tMax: pencere * ms, vMin: -tepe * 1.15, vMax: tepe * 1.15, renk: R.normal
  });
  D.miniGrafik(ctx, {
    x: pay * 2 + gw, y: 3, w: gw, h: gh,
    baslik: 'P − t   (güç HEP POZİTİF · frekansı 2 katı)', birim: 'W', tEtiket: 't (ms)',
    imlec: { t: (tS - t0) * ms, v: gucAn(st, p) },
    veri: ikinci, tMax: pencere * ms, vMin: 0, vMax: Math.max(1, ortGuc(p) * 2.2), renk: R.kuvvet
  });
}

/* ----------------------------------------------------------- Okumalar */

function okumalar(st, p) {
  const o = [
    { et: 'V etkin',     dg: D.biçim(vEtkin(p), 1),       birim: 'V' },
    { et: 'V maks',      dg: D.biçim(vTepe(p), 1),        birim: 'V' },
    { et: 'Anlık V',     dg: D.biçim(vAn(st, p), 1),      birim: 'V' },
    { et: 'i etkin',     dg: D.biçim(iEtkin(p), 3),       birim: 'A' },
    { et: 'Frekans  f',  dg: D.biçim(p.f),                birim: 'Hz' },
    { et: 'Periyot  T',  dg: D.biçim(periyot(p) * 1000, 1), birim: 'ms' },
    { et: 'Ortalama güç',dg: D.biçim(ortGuc(p), 1),       birim: 'W' }
  ];
  if (p.mod > 2.5) {
    const t = sahneT(st, p);
    o.push({ et: 'Q_AC / Q_DC', dg: D.biçim(isiDC(t, p) > 0 ? isiAC(t, p) / isiDC(t, p) : 1, 3), birim: '' });
  }
  return o;
}

/* ------------------------------------------------------------- Tanım */

D.simler = D.simler || {};
D.simler['alternatif-akim'] = {
  id: 'alternatif-akim',
  baslik: '2.3.3 · Alternatif akım · jeneratör, etkin değer ve güç',
  yukseklik: 320,
  grafikPanel: true,
  grafikYukseklik: 175,
  parametreler: [
    { anahtar: 'mod', etiket: 'Düzenek', tur: 'secim', deger: 1, secenekler: [
      { d: 1, e: 'Priz ve ampul (şebeke)' },
      { d: 2, e: 'AC jeneratörü (dönen çerçeve)' },
      { d: 3, e: 'Etkin değer: AC ile DC’nin ısıttığı su' }
    ]},
    { anahtar: 'Vetkin', etiket: 'Etkin gerilim (1 ve 3. düzenek)', min: 12, max: 400, adim: 4, deger: 220, birim: 'V' },
    { anahtar: 'f',      etiket: 'Frekans f (jeneratörde dönme sayısı)', min: 1, max: 100, adim: 1, deger: 50, birim: 'Hz' },
    { anahtar: 'R',      etiket: 'Direnç R', min: 5, max: 500, adim: 5, deger: 100, birim: 'Ω' },
    { anahtar: 'B',      etiket: 'Manyetik alan B (2. düzenek)', min: 0.05, max: 1, adim: 0.05, deger: 0.2, birim: 'T' },
    { anahtar: 'N',      etiket: 'Sarım sayısı N (2. düzenek)', min: 1, max: 500, adim: 1, deger: 100, birim: '' },
    { anahtar: 'A',      etiket: 'Çerçeve alanı A (2. düzenek)', min: 10, max: 400, adim: 10, deger: 100, birim: 'cm²' }
  ],
  durum, adim, bitti, cizGercek, cizKlasik, cizGrafik, okumalar
};

})();
