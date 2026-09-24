(function () {
"use strict";
window.F11 = window.F11 || {};

/* ==========================================================================
   sims/bileske-kuvvet.js
   --------------------------------------------------------------------------
   Konu 1.3.1 · Bileşke kuvvet ve hareket arasındaki ilişki  (MEB 11, s. 40-52)

   Kitabın etkinliği "halat çekme" üzerine kuruludur: iki takım zıt yönde
   kuvvet uygular, öğrenci bileşke kuvvetle hareketi ilişkilendirir. Bu
   simülasyon o düzeneğin aynısıdır.

   Üç durumu tek düzenekte gösterir:
     F₁ = F₂, ϑ₀ = 0   → Newton I · cisim durur (denge)
     F₁ = F₂, ϑ₀ ≠ 0   → Newton I · cisim SABİT HIZLA devam eder
     F₁ ≠ F₂           → Newton II · cisim ivmelenir, a = F_net / m

   İkinci durum önemlidir: öğrencilerin çoğu "kuvvet yoksa cisim durur"
   sanır. Bileşke kuvveti sıfırlayıp ilk hız vererek bu yanılgı kırılır.

   Matematiksel model (kitap s.47):
       F_net = F₁ − F₂          a = F_net / m          F = m·a
       ϑ = ϑ₀ + a·t             x = ϑ₀·t + ½·a·t²
   ========================================================================== */

const D = window.F11;
const { R, K } = D;

const PIST = 40;        // görünür pist uzunluğu (m)
const KAYIT = 0.02;

/* ------------------------------------------------------- Türetilmiş */

function netKuvvet(p) { return p.f1 - p.f2; }
function ivme(p)      { return netKuvvet(p) / p.m; }

/* -------------------------------------------------------------- Durum */

function durum(p) {
  return {
    t: 0,
    x: 0,
    v: p.v0,
    bittiMi: false,
    kayit: [{ t: 0, x: 0, v: p.v0, a: ivme(p) }],
    sonKayit: 0
  };
}

function adim(st, dt, p) {
  if (st.bittiMi) return;
  const a = ivme(p);
  st.t += dt;

  /* Kapalı form — tahtadaki formülle birebir aynı sayı çıksın diye */
  st.x = p.v0 * st.t + 0.5 * a * st.t * st.t;
  st.v = p.v0 + a * st.t;

  if (st.x > PIST || st.x < -PIST * 0.25) st.bittiMi = true;

  if (st.t - st.sonKayit >= KAYIT && st.kayit.length < 2000) {
    st.sonKayit += KAYIT;
    st.kayit.push({ t: st.t, x: st.x, v: st.v, a });
  }
}

function bitti(st) { return st.bittiMi; }

/* ------------------------------------------------- Gerçekçi görünüm */

function cizGercek(ctx, w, h, st, p) {
  const ufuk = h - 46;
  const solPay = 70;
  /* Cisim sola da gidebilir (F₂ > F₁): −PIST/4 … PIST aralığının tamamı
     panele sığar; eskiden sola giden sandık panelin dışına çıkıyordu. */
  const GERI = PIST * 0.25;
  const s = (w - solPay - 40) / (PIST + GERI);  // piksel / metre
  const X = m => solPay + (m + GERI) * s;

  D.gokyuzu(ctx, w, h, ufuk, { bulutlar: true });
  D.tepeler(ctx, w, ufuk);

  /* --- zemin: 5 m'de bir işaretli, sürtünmesiz (buz) --- */
  ctx.fillStyle = '#BFD8E8';
  ctx.fillRect(0, ufuk, w, h - ufuk);
  ctx.strokeStyle = '#8FB0C8'; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(0, ufuk + .5); ctx.lineTo(w, ufuk + .5); ctx.stroke();
  for (let m = -GERI; m <= PIST; m += 5) {
    const px = X(m);
    if (px < 0 || px > w) continue;
    ctx.beginPath(); ctx.moveTo(px, ufuk); ctx.lineTo(px, ufuk + 8); ctx.stroke();
    D.yaziAydinlik(ctx, String(m), px, ufuk + 18, '#4A6076',
                   '10px system-ui, sans-serif', 'center');
  }
  D.yaziAydinlik(ctx, 'sürtünmesiz zemin', 8, h - 8, '#4A6076',
                 '10px system-ui, sans-serif', 'left');

  /* --- sandık --- */
  const cx = X(st.x);
  const boy = 34 + Math.min(26, p.m * 0.28);   // kütle büyüdükçe sandık büyür
  const gen = boy * 1.25;
  D.sandik(ctx, cx, ufuk, gen, boy);
  D.yaziAydinlik(ctx, D.biçim(p.m) + ' kg', cx, ufuk - boy / 2,
                 '#4A2E10', '700 12px system-ui, sans-serif', 'center');

  /* --- kuvvet okları: ölçek ortak, böylece boylar karşılaştırılabilir --- */
  const kMax = Math.max(p.f1, p.f2, 1);
  const okOlcek = Math.min(72 / kMax, 1.6);
  const oy = ufuk - boy / 2;

  if (p.f1 > 0) {
    D.vektor(ctx, cx + gen / 2, oy, cx + gen / 2 + p.f1 * okOlcek, oy,
             R.kuvvet, 'F₁ = ' + D.biçim(p.f1) + ' N', { kalinlik: 3 });
    cizAdam(ctx, cx + gen / 2 + p.f1 * okOlcek + 16, ufuk, 1, '#993C1D', -1);
  }
  if (p.f2 > 0) {
    D.vektor(ctx, cx - gen / 2, oy, cx - gen / 2 - p.f2 * okOlcek, oy,
             R.surtunme, 'F₂ = ' + D.biçim(p.f2) + ' N', { kalinlik: 3 });
    cizAdam(ctx, cx - gen / 2 - p.f2 * okOlcek - 16, ufuk, 1, '#4C3A8A', 1);
  }

  /* --- durum rozeti: hangi yasa işliyor? --- */
  const F = netKuvvet(p);
  let msj, zemin, yazi;
  if (Math.abs(F) < 0.01) {
    msj = Math.abs(st.v) < 0.01
      ? 'Newton I · duruyor'
      : 'Newton I · sabit hız';
    zemin = 'rgba(56,214,224,.95)'; yazi = '#06343A';
  } else {
    msj = `Newton II · a = ${D.biçim(ivme(p))} m/s²`;
    zemin = 'rgba(255,176,32,.95)'; yazi = '#3A2A0C';
  }
  /* Rozeti sağ üste yasla ama panelden taşmasın diye ölçüp konumlandır. */
  ctx.save();
  ctx.font = '600 12px system-ui, sans-serif';
  const rg = ctx.measureText(msj).width + 22;
  ctx.restore();
  D.rozet(ctx, msj, Math.max(8, w - rg - 10), 9, zemin, yazi);
}

/** Halatı çeken küçük figür. yon: +1 → figür sandığın SOLUNDA, sola çeker;
    −1 → figür sandığın SAĞINDA, sağa çeker. Kolu ve halat parçası daima
    SANDIĞA doğru uzanır (eskiden ters yöne, boşluğa uzanıyordu). */
function cizAdam(ctx, x, yAyak, s, renk, yon) {
  const { elX, elY } = D.insan(ctx, x, yAyak, s, renk, yon > 0 ? 0.39 : 2.75);
  ctx.save();
  ctx.strokeStyle = '#8A6A3A'; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(elX, elY); ctx.lineTo(x + yon * 22, elY); ctx.stroke();
  ctx.restore();
}

/* --------------------------------------------- Klasik fizik görünümü */

function cizKlasik(ctx, w, h, st, p) {
  D.izgara(ctx, w, h, 28);

  const merkezX = w * 0.38, merkezY = h * 0.46;
  const F = netKuvvet(p);
  const a = ivme(p);

  D.yaziHaleli(ctx, 'serbest cisim diyagramı', 12, 18, K.metin2,
               '600 11px system-ui, sans-serif', 'left');

  /* zemin */
  D.taramaliZemin(ctx, 20, w - 20, merkezY + 48, K.eksen);

  /* cisim */
  ctx.fillStyle = '#2E3D57';
  D.yuvarlakDik(ctx, merkezX - 30, merkezY - 22, 60, 44, 6); ctx.fill();
  ctx.strokeStyle = K.eksen; ctx.lineWidth = 1.5; ctx.stroke();
  D.yaziHaleli(ctx, 'm = ' + D.biçim(p.m) + ' kg', merkezX, merkezY, K.beyaz,
               '600 12px system-ui, sans-serif', 'center');

  /* --- dört kuvvet --- */
  const kMax = Math.max(p.f1, p.f2, 1);
  const ol = Math.min(96 / kMax, 1.8);
  const G = p.m * 10;
  const dikOl = Math.min(44 / Math.max(G, 1), 0.5);

  if (p.f1 > 0)
    D.vektor(ctx, merkezX + 30, merkezY, merkezX + 30 + p.f1 * ol, merkezY,
             R.kuvvet, 'F₁', { kalinlik: 2.6 });
  if (p.f2 > 0)
    D.vektor(ctx, merkezX - 30, merkezY, merkezX - 30 - p.f2 * ol, merkezY,
             R.surtunme, 'F₂', { kalinlik: 2.6 });

  D.vektor(ctx, merkezX, merkezY - 22, merkezX, merkezY - 22 - G * dikOl,
           R.normal, 'N', { kalinlik: 2.2 });
  D.vektor(ctx, merkezX, merkezY + 22, merkezX, merkezY + 22 + G * dikOl,
           R.agirlik, 'G = m·g', { kalinlik: 2.2 });

  /* --- bileşke --- */
  const by = merkezY + 88;
  D.yaziHaleli(ctx, 'bileşke kuvvet', 24, by - 16, K.metin2,
               '600 11px system-ui, sans-serif', 'left');
  D.kesikliCizgi(ctx, 24, by, w - 24, by, 'rgba(74,95,134,.5)', 1, [3, 5]);
  if (Math.abs(F) > 0.01) {
    D.vektor(ctx, merkezX, by, merkezX + F * ol, by,
             R.ivme, 'F_net = ' + D.biçim(F) + ' N', { kalinlik: 3.2 });
  } else {
    D.noktaCisim(ctx, merkezX, by, 5, K.metin2);
    D.yaziHaleli(ctx, 'F_net = 0  ⟹  a = 0', merkezX + 16, by, R.normal,
                 '700 12px system-ui, sans-serif', 'left');
  }

  /* --- düşeyde denge notu --- */
  D.yaziHaleli(ctx, 'N ve G birbirini dengeler ⟹ düşeyde hareket yok',
               w - 16, 18, K.metin2, '10px system-ui, sans-serif', 'right');

  /* --- sayısal özet --- */
  const satir = [
    ['F_net = F₁ − F₂', D.biçim(p.f1) + ' − ' + D.biçim(p.f2) + ' = ' + D.biçim(F) + ' N'],
    ['a = F_net / m',   D.biçim(F) + ' / ' + D.biçim(p.m) + ' = ' + D.biçim(a) + ' m/s²'],
    ['ϑ = ϑ₀ + a·t',    D.biçim(p.v0) + ' + ' + D.biçim(a) + '·' + D.biçim(st.t, 1) +
                        ' = ' + D.biçim(st.v) + ' m/s']
  ];
  let sy = merkezY - 74;
  satir.forEach(([sol, sag]) => {
    D.yaziHaleli(ctx, sol, w - 16, sy, K.metin2, '11px system-ui, sans-serif', 'right');
    D.yaziHaleli(ctx, sag, w - 16, sy + 15, K.beyaz, '600 12px system-ui, sans-serif', 'right');
    sy += 38;
  });
}

/* ------------------------------------------------------------ Grafik */

function cizGrafik(ctx, w, h, st, p) {
  const a = ivme(p);
  const T = Math.max(st.t, 2);
  const pay = 8;
  const gw = (w - pay * 4) / 3;
  const gh = h - 6;

  /* Zincir: sabit ivme → doğrusal hız → parabolik konum.
     Üç grafiği yan yana görmek bu zinciri tek bakışta anlatır. */
  D.miniGrafik(ctx, {
    x: pay, y: 3, w: gw, h: gh,
    baslik: 'a − t   (ivme)', birim: 'm/s²',
    veri: st.kayit.map(d => ({ t: d.t, v: d.a })),
    tMax: T, vMin: Math.min(a * 1.4, 0), vMax: Math.max(a * 1.4, 1),
    renk: R.ivme
  });

  D.miniGrafik(ctx, {
    x: pay * 2 + gw, y: 3, w: gw, h: gh,
    baslik: 'ϑ − t   (hız)', birim: 'm/s',
    veri: st.kayit.map(d => ({ t: d.t, v: d.v })),
    tMax: T, vMin: Math.min(0, st.v * 1.3), vMax: Math.max(st.v * 1.3, p.v0 * 1.3, 1),
    renk: R.hiz, dolgu: true
  });

  D.miniGrafik(ctx, {
    x: pay * 3 + gw * 2, y: 3, w: gw, h: gh,
    baslik: 'x − t   (konum)', birim: 'm',
    veri: st.kayit.map(d => ({ t: d.t, v: d.x })),
    tMax: T, vMin: Math.min(0, st.x * 1.2), vMax: Math.max(st.x * 1.2, 1),
    renk: R.konum
  });
}

/* ----------------------------------------------------------- Okumalar */

function okumalar(st, p) {
  return [
    { et: 'Süre  t',        dg: D.biçim(st.t, 2),           birim: 's' },
    { et: 'F_net',          dg: D.biçim(netKuvvet(p)),      birim: 'N' },
    { et: 'İvme  a',        dg: D.biçim(ivme(p)),           birim: 'm/s²' },
    { et: 'Hız  ϑ',         dg: D.biçim(st.v),              birim: 'm/s' },
    { et: 'Konum  x',       dg: D.biçim(st.x),              birim: 'm' },
    { et: 'Ağırlık  G',     dg: D.biçim(p.m * 10),          birim: 'N' }
  ];
}

/* ------------------------------------------------------------- Tanım */

D.simler = D.simler || {};
D.simler['bileske-kuvvet'] = {
  id: 'bileske-kuvvet',
  baslik: 'Bileşke kuvvet ve ivme',
  yukseklik: 320,
  grafikPanel: true,
  grafikYukseklik: 175,
  parametreler: [
    { anahtar: 'f1', etiket: 'F₁ (sağa)',  min: 0, max: 120, adim: 5, deger: 60, birim: 'N' },
    { anahtar: 'f2', etiket: 'F₂ (sola)',  min: 0, max: 120, adim: 5, deger: 20, birim: 'N' },
    { anahtar: 'm',  etiket: 'Kütle m',    min: 5, max: 100, adim: 5, deger: 20, birim: 'kg' },
    { anahtar: 'v0', etiket: 'İlk hız ϑ₀', min: 0, max: 20,  adim: 1, deger: 0,  birim: 'm/s' }
  ],
  durum, adim, bitti, cizGercek, cizKlasik, cizGrafik, okumalar
};

})();
