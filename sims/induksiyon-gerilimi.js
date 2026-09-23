(function () {
"use strict";
window.F11 = window.F11 || {};

/* ==========================================================================
   sims/induksiyon-gerilimi.js
   --------------------------------------------------------------------------
   Konu 2.3.2 · İndüksiyon gerilimi  (MEB 11, s.242-252)

   Matematiksel model — Faraday yasası:
       ε = −N · ΔΦ / Δt
   Baştaki eksi işareti LENZ YASASI’dır: indüklenen akım, kendisini doğuran
   DEĞİŞİME KARŞI KOYACAK yönde akar.

   Raylı tel özel hâli (hareket emk’sı):
       ε = B · L · ϑ

   ÜÇ DÜZENEK
   ----------
   1) Mıknatıs–bobin : Mıknatıs yaklaşır/uzaklaşır. Hızı artırınca gerilim artar.
      Durunca gerilim SIFIRLANIR — akının kendisi değil, değişimi üretir.
   2) Raylı tel      : Sabit hızla çekilen tel, ε = B·L·ϑ üretir. Üstelik
      indüklenen akım tele KARŞI kuvvet uygular — bedava enerji yoktur.
   3) Dönen çerçeve  : Jeneratör. Akı kosinüs, gerilim SİNÜS çıkar; akı sıfırken
      gerilim en büyüktür.
   ========================================================================== */

const D = window.F11;
const { R, K } = D;

/* ------------------------------------------------------------- Fizik */

function cerceveAlani(p) { return (p.a / 100) * (p.a / 100); }

/* --- 1. düzenek: mıknatıs bobine girip çıkar --- */

/* Mıknatıs merkezinin bobin merkezine en uzak konumu (m). Mıknatıs bu
   uzaklıktan bobinin tam ortasına kadar girer, sonra geri çekilir. */
const EN_UZAK = 0.9;
/* Bobinin etkin yarıçapı (m): akının uzaklıkla sönme ölçeği. */
const X0 = 0.06;

/** Mıknatıs merkezinin bobin merkezine uzaklığı (m), zamana bağlı.
    t = 0’da en uzakta; yarım periyotta bobinin ORTASINDA (x = 0). */
function miknatisX(st, p) {
  return EN_UZAK * (1 + Math.cos(p.v * st.t * 0.8)) / 2;
}

/**
 * Bobinin gördüğü alan (T). Eksen üzerinde dipol / halka alanı biçimi:
 *     B(x) = B₀ / (1 + (x/X0)²)^(3/2)
 * Uzakta ~1/x³ (dipol) gibi söner; mıknatıs bobinin ORTASINA geldiğinde
 * akı EN BÜYÜK olur (B₀ = p.B). Mıknatıs orada durup döndüğü an akı
 * değişmez ⟹ o an ε = 0.
 */
function bobinAlani(st, p) {
  const u = miknatisX(st, p) / X0;
  return p.B / Math.pow(1 + u * u, 1.5);
}

/* --- Ortak: anlık akı --- */

function aki(st, p) {
  if (p.mod < 1.5) return bobinAlani(st, p) * cerceveAlani(p);
  if (p.mod < 2.5) return p.B * (p.L / 100) * st.x;          // A = L · x
  return p.B * cerceveAlani(p) * Math.cos(st.aci);
}

/* --- Gerilim: sayısal türev yerine analitik ifadeler --- */

function gerilim(st, p) {
  if (p.mod < 1.5) {
    /* dΦ/dt sayısal olarak alınır (dipol ifadesi karmaşık) */
    const h = 1e-3;
    const ileri = { t: st.t + h };
    const geri  = { t: st.t - h };
    const f1 = bobinAlani(ileri, p) * cerceveAlani(p);
    const f0 = bobinAlani(geri, p) * cerceveAlani(p);
    return -p.N * (f1 - f0) / (2 * h);
  }
  if (p.mod < 2.5) {
    /* Hareket emk’sı — kapalı form. Raylı tel TEK sarımlık bir devredir:
       N çarpanı YOKTUR. Tel geri dönerken ϑ’nin işareti, dolayısıyla ε’nin
       işareti de değişir. */
    return -p.B * (p.L / 100) * p.v * rayYonu(st);
  }
  /* dönen çerçeve: Φ = BAcos(ωt) ⟹ ε = N·B·A·ω·sin(ωt) */
  return p.N * p.B * cerceveAlani(p) * p.omega * Math.sin(st.aci);
}

/** İndüklenen akım (A) — devre direnci p.R. */
function akim(st, p) { return gerilim(st, p) / Math.max(0.1, p.R); }

/**
 * Galvanometrenin tam ölçek akımı (A). İbre bu değerde sona dayanır.
 * Her düzenekte o düzeneğin TEPE akımına göre hesaplanır; sabit bir ölçek
 * kullanılırsa ibre ya hiç kıpırdamaz ya da sürekli dayanır.
 */
function akimTamOlcek(st, p) {
  const Rr = Math.max(0.1, p.R);
  if (p.mod < 1.5) {
    /* Tepe emk bir periyot boyunca örneklenerek bulunur (mıknatıs bobine
       girerken, en hızlı olduğu yerde değil akının en dik değiştiği yerde). */
    if (!(p.v > 0)) return 0.05;
    const T = (2 * Math.PI) / (p.v * 0.8);
    let tepe = 0;
    for (let k = 0; k < 160; k++) {
      const e = Math.abs(gerilim({ t: (k / 160) * T }, p));
      if (e > tepe) tepe = e;
    }
    return Math.max(0.05, tepe / Rr);
  }
  if (p.mod < 2.5) return Math.max(0.05, p.B * (p.L / 100) * 4 / Rr);
  return Math.max(0.05, (p.N * p.B * cerceveAlani(p) * p.omega) / Rr);
}

/** Raylı telin hareket yönü: +1 sağa (alan büyüyor), −1 sola. */
function rayYonu(st) { return st && st.yon != null ? st.yon : 1; }

/** Raylı telde indüklenen akımın tele uyguladığı KARŞI kuvvet (N). */
function karsiKuvvet(st, p) {
  if (p.mod > 1.5 && p.mod < 2.5)
    return Math.abs(akim(st, p)) * p.B * (p.L / 100);
  return 0;
}

/* -------------------------------------------------------------- Durum */

function durum(p) {
  return { t: 0, x: 0.25, yon: 1, aci: 0, kayit: [], akiKayit: [] };
}

function adim(st, dt, p) {
  st.t += dt;
  if (p.mod > 1.5 && p.mod < 2.5) {
    /* Tel rayın sonuna varınca GERİ çekilir: çevrelenen alan küçülmeye
       başlar, ε ve akım yön değiştirir (Lenz). Işınlanma yok. */
    st.x += st.yon * p.v * dt;
    if (st.x >= 0.9)  { st.x = 0.9;  st.yon = -1; }
    if (st.x <= 0.05) { st.x = 0.05; st.yon = 1; }
  }
  if (p.mod > 2.5) {
    st.aci += p.omega * dt;
    if (st.aci > 2 * Math.PI) st.aci -= 2 * Math.PI;
  }

  if (st.kayit.length === 0 || st.t - st.kayit[st.kayit.length - 1].t > 0.015) {
    st.kayit.push({ t: st.t, v: gerilim(st, p) });
    st.akiKayit.push({ t: st.t, v: aki(st, p) });
  }
  if (st.kayit.length > 400) { st.kayit.shift(); st.akiKayit.shift(); }
}

function bitti() { return false; }

/* --------------------------------------------- Gerçekçi görünüm */

function cizGercek(ctx, w, h, st, p) {
  if (p.mod < 1.5)      cizMiknatis(ctx, w, h, st, p);
  else if (p.mod < 2.5) cizRay(ctx, w, h, st, p);
  else                  cizJenerator(ctx, w, h, st, p);
}

/** Küçük galvanometre — ibresi akımla sapar. */
function galvanometre(ctx, x, y, r, i, enBuyuk) {
  ctx.save();
  ctx.fillStyle = 'rgba(255,255,255,.95)';
  ctx.beginPath(); ctx.arc(x, y, r, 0, 6.2832); ctx.fill();
  ctx.strokeStyle = '#7D8A99'; ctx.lineWidth = 2; ctx.stroke();
  ctx.restore();

  const oran = Math.max(-1, Math.min(1, i / Math.max(1e-9, enBuyuk)));
  const a = -Math.PI / 2 + oran * 1.0;
  ctx.save();
  ctx.strokeStyle = Math.abs(oran) > 0.02 ? '#E2483F' : '#7D8A99';
  ctx.lineWidth = 3; ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(x, y + r * 0.45);
  ctx.lineTo(x + Math.cos(a) * r * 0.78, y + r * 0.45 + Math.sin(a) * r * 0.78);
  ctx.stroke(); ctx.restore();

  D.yaziAydinlik(ctx, '0', x, y + r * 0.45 - r * 0.9, '#5F6B78',
                 '600 9px system-ui, sans-serif', 'center');
}

function cizMiknatis(ctx, w, h, st, p) {
  const cy = h * 0.46;
  const bobinX = w * 0.62;
  const bobinMerkez = bobinX + 32;
  const pxM = (bobinMerkez - 70) / EN_UZAK;          // px / m

  /* bobinin arka yarıları */
  ctx.save();
  ctx.strokeStyle = '#8A5A2B'; ctx.lineWidth = 4;
  for (let k = 0; k < 6; k++) {
    const x = bobinX + k * 13;
    ctx.beginPath(); ctx.ellipse(x, cy, 7, 38, 0, Math.PI / 2, Math.PI * 1.5); ctx.stroke();
  }
  ctx.restore();

  /* mıknatıs — N ucu bobine bakar; bobinin İÇİNE kadar girer */
  const mx = bobinMerkez - miknatisX(st, p) * pxM;
  D.miknatis(ctx, mx - 44, cy - 16, 88, 32, true);

  /* bobinin ön yarıları (mıknatısın önünden geçer) */
  ctx.save();
  ctx.strokeStyle = '#B87333'; ctx.lineWidth = 5;
  for (let k = 0; k < 6; k++) {
    const x = bobinX + k * 13;
    ctx.beginPath(); ctx.ellipse(x, cy, 7, 38, 0, -Math.PI / 2, Math.PI / 2); ctx.stroke();
  }
  ctx.restore();

  /* hareket oku — ekrandaki gerçek hareket yönü */
  const hiz = -(miknatisX({ t: st.t + 0.01 }, p) - miknatisX({ t: st.t - 0.01 }, p)) / 0.02 * pxM;
  if (Math.abs(hiz) > 4)
    D.vektor(ctx, mx, cy - 34, mx + Math.sign(hiz) * 40, cy - 34, R.hiz, 'ϑ', { kalinlik: 2.4 });

  /* galvanometre */
  const eps = gerilim(st, p), i = akim(st, p);
  /* Galvanometre mıknatısın yolunun ALTINDA durur; mıknatıs üstünden geçer. */
  const gX = w * 0.30, gY = cy + 100, gR = 28;
  /* bağlantı telleri (galvanometrenin altından önce çizilir) */
  ctx.strokeStyle = '#7D8A99'; ctx.lineWidth = 2.4;
  ctx.beginPath();
  ctx.moveTo(bobinX, cy + 38); ctx.lineTo(bobinX, gY - 8); ctx.lineTo(gX + gR, gY - 8);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(bobinX + 65, cy + 38); ctx.lineTo(bobinX + 65, gY + 8); ctx.lineTo(gX + gR, gY + 8);
  ctx.stroke();
  galvanometre(ctx, gX, gY, gR, i, akimTamOlcek(st, p));
  D.yaziAydinlik(ctx, 'galvanometre', gX - gR - 8, gY, R.mur,
                 '600 11px system-ui, sans-serif', 'right');

  D.yaziAydinlik(ctx, 'ε = ' + D.biçim(eps, 3) + ' V', w - 10, 44, R.normal,
                 '700 13px system-ui, sans-serif', 'right');
  D.yaziAydinlik(ctx, 'i = ' + D.biçim(i, 3) + ' A', w - 10, 62, R.ivme,
                 '700 12px system-ui, sans-serif', 'right');

  if (Math.abs(hiz) < 4)
    D.yaziAydinlik(ctx, 'mıknatıs duruyor ⟹ akı değişmiyor ⟹ ε = 0', w / 2, h - 12,
                   '#B03030', '700 12px system-ui, sans-serif', 'center');
  else
    D.yaziAydinlik(ctx, 'akı DEĞİŞİYOR ⟹ gerilim doğuyor', w / 2, h - 12, R.mur,
                   '600 11px system-ui, sans-serif', 'center');
}

function cizRay(ctx, w, h, st, p) {
  const bx = w * 0.08, by = h * 0.16, bw = w * 0.84, bh = h * 0.56;

  ctx.save();
  ctx.fillStyle = 'rgba(56,150,200,.10)'; ctx.fillRect(bx, by, bw, bh);
  ctx.restore();
  D.alanBolgesi(ctx, bx, by, bw, bh, -1, 'rgba(47,111,208,.7)', 40);

  const ust = by + bh * 0.24, alt = by + bh * 0.76;
  ctx.fillStyle = '#9AA5B1';
  ctx.fillRect(bx + 6, ust - 3, bw - 12, 6);
  ctx.fillRect(bx + 6, alt - 3, bw - 12, 6);
  ctx.fillRect(bx + 6, ust, 6, alt - ust);          // sol kapak

  /* hareketli tel */
  const tx = bx + 10 + st.x * (bw - 30);
  ctx.save();
  ctx.strokeStyle = '#B87333'; ctx.lineWidth = 9; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(tx, ust); ctx.lineTo(tx, alt); ctx.stroke();
  ctx.restore();

  /* çevrelenen alan taranır */
  ctx.save();
  ctx.fillStyle = 'rgba(53,192,138,.16)';
  ctx.fillRect(bx + 12, ust, tx - bx - 12, alt - ust);
  ctx.restore();

  /* hız ve karşı kuvvet — karşı kuvvet daima harekete ZIT */
  const yon = rayYonu(st);
  if (p.v > 0)
    D.vektor(ctx, tx, ust - 22, tx + 44 * yon, ust - 22, R.hiz, 'ϑ', { kalinlik: 2.6 });
  const Fk = karsiKuvvet(st, p);
  if (Fk > 1e-6)
    D.vektor(ctx, tx, alt + 22, tx - 44 * yon, alt + 22, R.kuvvet, 'F_karşı', { kalinlik: 2.6 });

  const eps = gerilim(st, p), i = akim(st, p);
  galvanometre(ctx, bx + 34, (ust + alt) / 2, 24, i, akimTamOlcek(st, p));

  D.yaziAydinlik(ctx, (yon > 0 ? 'alan BÜYÜYOR' : 'alan KÜÇÜLÜYOR') + ' · ε = B·L·ϑ = ' +
                 D.biçim(Math.abs(eps), 3) + ' V', w - 10, 44,
                 R.normal, '700 13px system-ui, sans-serif', 'right');
  D.yaziAydinlik(ctx, 'i = ' + D.biçim(Math.abs(i), 3) + ' A', w - 10, 62, R.ivme,
                 '700 12px system-ui, sans-serif', 'right');
  D.yaziAydinlik(ctx, 'F_karşı = ' + D.biçim(Fk, 3) + ' N', w - 10, 80, R.kuvvet,
                 '700 12px system-ui, sans-serif', 'right');
  D.yaziAydinlik(ctx, 'indüklenen akım harekete KARŞI koyar — bedava enerji yok',
                 10, h - 12, R.mur, '600 11px system-ui, sans-serif', 'left');
}

function cizJenerator(ctx, w, h, st, p) {
  const cx = w * 0.44, cy = h * 0.46, R0 = Math.min(w * 0.18, h * 0.28);

  ctx.fillStyle = '#E2483F'; ctx.fillRect(12, cy - R0 - 12, 40, (R0 + 12) * 2);
  ctx.fillStyle = '#2F6FD0'; ctx.fillRect(w * 0.76, cy - R0 - 12, 40, (R0 + 12) * 2);
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 18px system-ui, sans-serif';
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText('N', 32, cy); ctx.fillText('S', w * 0.76 + 20, cy);

  ctx.save();
  ctx.strokeStyle = 'rgba(47,111,208,.45)'; ctx.lineWidth = 1.4;
  for (let k = -2; k <= 2; k++) {
    const yy = cy + k * (R0 * 0.55);
    ctx.beginPath(); ctx.moveTo(54, yy); ctx.lineTo(w * 0.76, yy); ctx.stroke();
  }
  ctx.restore();

  /* Dönen çerçeve, dönme ekseni boyunca bakılarak (eksen sayfaya dik).
     Φ = B·A·cos(ωt): t = 0’da akı EN BÜYÜK, yani çerçeve düzlemi alana DİK
     (ekranda düşey) durur ve normali alana paraleldir. */
  const eps = gerilim(st, p);
  const sx = Math.sin(st.aci), sy = Math.cos(st.aci);
  const k1x = cx + sx * R0, k1y = cy - sy * R0;
  const k2x = cx - sx * R0, k2y = cy + sy * R0;
  ctx.save();
  ctx.strokeStyle = 'rgba(120,130,150,.45)'; ctx.lineWidth = 1; ctx.setLineDash([4, 5]);
  ctx.beginPath(); ctx.arc(cx, cy, R0, 0, 6.2832); ctx.stroke();
  ctx.restore();
  ctx.save();
  ctx.strokeStyle = '#B87333'; ctx.lineWidth = 5;
  ctx.beginPath(); ctx.moveTo(k1x, k1y); ctx.lineTo(k2x, k2y); ctx.stroke();
  ctx.restore();
  D.noktaCisim(ctx, cx, cy, 4, K.beyaz);

  /* indüklenen akım kenarlarda ⊙/⊗ — ε’nin işaretiyle döner, boyu |ε| ile */
  const epsM = Math.max(1e-9, p.N * p.B * cerceveAlani(p) * p.omega);
  const oranE = Math.abs(eps) / epsM;
  if (oranE > 0.06) {
    const r = 4 + 8 * oranE;
    (eps > 0 ? D.alanDisari : D.alanIceri)(ctx, k1x, k1y, r, '#7A4A10');
    (eps > 0 ? D.alanIceri : D.alanDisari)(ctx, k2x, k2y, r, '#7A4A10');
  }
  galvanometre(ctx, w * 0.91, cy + 70, 26, akim(st, p),
               Math.max(0.05, p.N * p.B * cerceveAlani(p) * p.omega / p.R));

  D.yaziAydinlik(ctx, 'ε = ' + D.biçim(eps, 3) + ' V', w / 2, h - 30, R.normal,
                 '700 14px system-ui, sans-serif', 'center');
  D.yaziAydinlik(ctx, 'akı kosinüs ⟹ gerilim SİNÜS · alternatif akım doğuyor',
                 w / 2, h - 12, R.mur, '600 11px system-ui, sans-serif', 'center');
}

/* ----------------------------------------- Klasik fizik görünümü */

function cizKlasik(ctx, w, h, st, p) {
  D.izgara(ctx, w, h, 26);
  const eps = gerilim(st, p), F = aki(st, p);

  D.yaziHaleli(ctx, 'Faraday ve Lenz', 12, 22, K.beyaz,
               '700 12px system-ui, sans-serif', 'left');

  const satir = p.mod < 2.5 ? [
    ['ε = −N · ΔΦ / Δt', K.beyaz, '700 13px system-ui, sans-serif'],
    ['eksi işareti = LENZ', R.kuvvet, '11px system-ui, sans-serif'],
    ['', K.metin2, '11px'],
    [p.mod < 1.5 ? 'N = ' + D.biçim(p.N) + ' sarım' : 'N = 1 (raylı tel tek halka)',
     K.metin2, '11px system-ui, sans-serif'],
    ['Φ = ' + D.biçim(F, 4) + ' Wb', K.metin2, '11px system-ui, sans-serif'],
    ['ε = ' + D.biçim(eps, 3) + ' V', R.normal, '700 13px system-ui, sans-serif'],
    ['i = ε/R = ' + D.biçim(akim(st, p), 3) + ' A', R.ivme, '700 12px system-ui, sans-serif']
  ] : [
    ['Φ = B·A·cos(ωt)', K.beyaz, '12px system-ui, sans-serif'],
    ['ε = N·B·A·ω·sin(ωt)', K.beyaz, '700 13px system-ui, sans-serif'],
    ['', K.metin2, '11px'],
    ['ε_maks = N·B·A·ω', R.ivme, '700 12px system-ui, sans-serif'],
    ['= ' + D.biçim(p.N * p.B * cerceveAlani(p) * p.omega, 3) + ' V', R.ivme, '12px system-ui, sans-serif'],
    ['anlık ε = ' + D.biçim(eps, 3) + ' V', R.normal, '700 13px system-ui, sans-serif'],
    ['Φ = ' + D.biçim(F, 4) + ' Wb', K.metin2, '11px system-ui, sans-serif']
  ];
  let sy = 46;
  satir.forEach(([t, c, f]) => {
    if (t) D.yaziHaleli(ctx, t, w * 0.52, sy, c, f, 'left');
    sy += 18;
  });

  /* sol: Lenz kuralının şeması */
  const cx = w * 0.22, cy = h * 0.48;
  if (p.mod > 1.5 && p.mod < 2.5) {
    const yon = rayYonu(st);
    if (p.v > 0) {
      D.vektor(ctx, cx - 40 * yon, cy - 30, cx + 40 * yon, cy - 30, R.hiz, 'ϑ', { kalinlik: 2.4 });
      D.vektor(ctx, cx + 40 * yon, cy + 10, cx - 40 * yon, cy + 10, R.kuvvet, 'F_karşı', { kalinlik: 2.4 });
    }
    D.yaziHaleli(ctx, p.v === 0 ? 'tel duruyor ⟹ ε = 0'
                   : yon > 0 ? 'hareket sağa ⟹ kuvvet sola' : 'hareket sola ⟹ kuvvet sağa',
                 cx, cy + 46, R.kuvvet, '600 11px system-ui, sans-serif', 'center');
    D.yaziHaleli(ctx, 'ε = B·L·ϑ', cx, cy + 70, K.beyaz,
                 '700 12px system-ui, sans-serif', 'center');
  } else {
    /* Akının değişim yönü: dΦ/dt = −ε/N */
    const degisim = -eps;
    const sabit = Math.abs(eps) < 1e-4;
    const buyuyor = degisim > 0;
    D.yaziHaleli(ctx, sabit ? 'Akı DEĞİŞMİYOR' : buyuyor ? 'Akı ARTIYOR' : 'Akı AZALIYOR', cx, cy - 34,
                 sabit ? K.metin2 : buyuyor ? R.kuvvet : R.hiz, '700 13px system-ui, sans-serif', 'center');
    /* Kısa tutuldu: uzun satır sağ sütunun üstüne biniyordu. */
    D.yaziHaleli(ctx, sabit ? 'indüklenen akım yok' : buyuyor ? 'akım artışa karşı koyar' : 'akım azalmaya karşı koyar',
                 cx, cy - 10, K.metin2, '11px system-ui, sans-serif', 'center');
    if (!sabit)
      D.yaziHaleli(ctx, buyuyor ? '⟹ zıt yönde alan üretir' : '⟹ aynı yönde alan üretir',
                   cx, cy + 12, K.beyaz, '600 11px system-ui, sans-serif', 'center');
  }

  D.yaziHaleli(ctx, 'Lenz: doğa değişime direnir — enerji korunumunun sonucu',
               12, h - 16, R.ivme, '600 11px system-ui, sans-serif', 'left');
}

/* ------------------------------------------------------- Grafikler */

function cizGrafik(ctx, w, h, st, p) {
  const pay = 8, gw = (w - pay * 3) / 2, gh = h - 6;
  const epsMax = Math.max(...st.kayit.map(d => Math.abs(d.v)), 0.05);
  const fMax = Math.max(...st.akiKayit.map(d => Math.abs(d.v)), 1e-4);

  D.miniGrafik(ctx, {
    x: pay, y: 3, w: gw, h: gh,
    baslik: 'Φ − t   (akı)', birim: 'Wb',
    veri: st.akiKayit, tMin: st.akiKayit.length ? st.akiKayit[0].t : 0,
    tMax: Math.max(1, st.t),
    vMin: -fMax * 1.15, vMax: fMax * 1.15,
    renk: R.normal
  });

  D.miniGrafik(ctx, {
    x: pay * 2 + gw, y: 3, w: gw, h: gh,
    baslik: 'ε − t   (Φ grafiğinin EĞİMİ)', birim: 'V',
    veri: st.kayit, tMin: st.kayit.length ? st.kayit[0].t : 0,
    tMax: Math.max(1, st.t),
    vMin: -epsMax * 1.15, vMax: epsMax * 1.15,
    renk: R.kuvvet
  });
}

/* ----------------------------------------------------------- Okumalar */

function okumalar(st, p) {
  const eps = gerilim(st, p);
  const o = [
    { et: 'Akı  Φ',      dg: D.biçim(aki(st, p), 4),      birim: 'Wb' },
    { et: 'Gerilim  ε',  dg: D.biçim(eps, 3),             birim: 'V' },
    { et: 'Akım  i',     dg: D.biçim(akim(st, p), 3),     birim: 'A' },
    { et: 'Sarım  N',    dg: p.mod > 1.5 && p.mod < 2.5 ? '1' : D.biçim(p.N), birim: '' }
  ];
  if (p.mod > 1.5 && p.mod < 2.5) {
    o.push({ et: 'Karşı kuvvet', dg: D.biçim(karsiKuvvet(st, p), 3), birim: 'N' });
    o.push({ et: 'Hız  ϑ',       dg: D.biçim(p.v * rayYonu(st), 2) + (rayYonu(st) > 0 ? ' →' : ' ←'), birim: 'm/s' });
  }
  if (p.mod > 2.5) {
    o.push({ et: 'ε_maks', dg: D.biçim(p.N * p.B * cerceveAlani(p) * p.omega, 3), birim: 'V' });
  }
  return o;
}

/* ------------------------------------------------------------- Tanım */

D.simler = D.simler || {};
D.simler['induksiyon-gerilimi'] = {
  id: 'induksiyon-gerilimi',
  baslik: '2.3.2 · İndüksiyon gerilimi · Faraday ve Lenz',
  yukseklik: 340,
  grafikPanel: true,
  grafikYukseklik: 170,
  parametreler: [
    { anahtar: 'mod', etiket: 'Düzenek', tur: 'secim', deger: 1, secenekler: [
      { d: 1, e: 'Mıknatıs bobine girip çıkıyor' },
      { d: 2, e: 'Raylı tel (ε = B·L·ϑ)' },
      { d: 3, e: 'Dönen çerçeve (jeneratör)' }
    ]},
    { anahtar: 'B',     etiket: 'Manyetik alan B', min: 0.1, max: 2, adim: 0.1, deger: 0.8, birim: 'T' },
    { anahtar: 'N',     etiket: 'Sarım sayısı N', min: 1, max: 200, adim: 1, deger: 50, birim: '' },
    { anahtar: 'v',     etiket: 'Hız ϑ', min: 0, max: 4, adim: 0.2, deger: 1.5, birim: 'm/s' },
    { anahtar: 'L',     etiket: 'Tel uzunluğu L', min: 10, max: 60, adim: 5, deger: 30, birim: 'cm' },
    { anahtar: 'a',     etiket: 'Çerçeve kenarı', min: 5, max: 40, adim: 5, deger: 20, birim: 'cm' },
    { anahtar: 'omega', etiket: 'Dönme hızı ω', min: 0.5, max: 12, adim: 0.5, deger: 4, birim: 'rad/s' },
    { anahtar: 'R',     etiket: 'Devre direnci', min: 0.5, max: 20, adim: 0.5, deger: 2, birim: 'Ω' }
  ],
  durum, adim, bitti, cizGercek, cizKlasik, cizGrafik, okumalar
};

})();
