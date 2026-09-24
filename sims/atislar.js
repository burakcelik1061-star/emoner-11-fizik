(function () {
"use strict";
window.F11 = window.F11 || {};

/* ==========================================================================
   sims/atislar.js
   --------------------------------------------------------------------------
   Konu 1.2 · İki boyutta sabit ivmeli hareket   (MEB 11, s. 30-39)

   Tek simülasyon iki atış türünü birden verir:
       α = 0°   → yatay atış
       α > 0°   → eğik atış

   KİTABIN MERKEZ FİKRİ (Görsel 1.6)
   ---------------------------------
   "Yatay doğrultuda fırlatılan top ile aynı yükseklikten ilk hızsız bırakılan
   top aynı anda yere ulaşır." Bu, yatay ve düşey bileşenlerin birbirinden
   BAĞIMSIZ olduğunun kanıtıdır.

   Bu yüzden sahnede her zaman bir KARŞILAŞTIRMA TOPU vardır: atış noktasından
   yalnızca düşey doğrultuda, ϑ₀y ilk hızıyla hareket eder. Bu top her an
   asıl cisimle AYNI YÜKSEKLİKTEDİR — aralarına çizilen yatay kesikli çizgi
   bunu gözle gösterir. α = 0 seçilirse karşılaştırma topu serbest bırakılmış
   olur ve kitaptaki görselin birebir aynısı çıkar.

   Matematiksel model (kitap s.33-34):
       ϑ₀x = ϑ₀·cos α        ϑ₀y = ϑ₀·sin α
       x   = ϑ₀x·t                          (yatayda sabit hız)
       y   = h₀ + ϑ₀y·t − ½·g·t²            (düşeyde serbest düşme)
       ϑx  = ϑ₀x  (değişmez)                ϑy = ϑ₀y − g·t

   ÖLÇEK NOTU
   ----------
   Yatay ve düşey eksende AYNI piksel/metre ölçeği kullanılır. Farklı ölçek
   kullanılsa yörünge gerçekte olmadığı kadar basık ya da dik görünür ve
   öğrenci yanlış bir parabol şekli ezberler.
   ========================================================================== */

const D = window.F11;
const { R, K } = D;

const STROBE = 0.25;
const KAYIT  = 0.02;

/* --------------------------------------------------- Türetilmiş değerler */

/**
 * SINAV AÇILARI TABLOSU
 * ---------------------
 * Ders kitabı ve sınavlar 37° ile 53° için yuvarlanmış değerleri kullanır:
 *     sin37° = cos53° = 0,6      cos37° = sin53° = 0,8
 * Gerçek değerler ise sin53° = 0,7986 ve cos53° = 0,6018'dir.
 *
 * Burada kitabın değerleri tercih edilmiştir. Sebep: bu bir öğretim aracı.
 * Öğretmen tahtada "25 · 0,8 = 20 m/s" dediğinde ekranda 19,97 yazarsa
 * öğrenci kendi hesabından şüphe eder. g'yi 9,81 yerine 10 almakla aynı
 * gerekçe — sınavda kullanılan modelle tutarlı kalmak.
 *
 * Diğer tüm açılarda gerçek trigonometrik değerler kullanılır.
 */
const SINAV_ACILARI = {
  37: { sin: 0.6, cos: 0.8 },
  53: { sin: 0.8, cos: 0.6 }
};

function bilesenler(p) {
  const tablo = SINAV_ACILARI[Math.round(p.aci)];
  if (tablo && Math.abs(p.aci - Math.round(p.aci)) < 1e-6) {
    return { vx: p.v0 * tablo.cos, vy: p.v0 * tablo.sin };
  }
  const rad = p.aci * Math.PI / 180;
  return { vx: p.v0 * Math.cos(rad), vy: p.v0 * Math.sin(rad) };
}
/* ==================================================================
   DUVAR
   Yörüngeye dik bir duvar konabilir. Çarpışmada YALNIZCA yatay hız
   değişir: yönü döner ve SEKME oranı kadar küçülür. Düşey hareket
   çarpışmadan HİÇ etkilenmez — bu, 1.2'nin bağımsızlık ilkesinin
   en çarpıcı sonucudur: duvar olsa da olmasa da cisim aynı anda yere iner.
   ================================================================== */
const SEKME = 0.5;      // duvardan sonra yatay hız bu oranda kalır

function duvarVar(p) { return p.duvar > 0.5; }
/** Cismin duvara ulaşma anı (duvar yoksa sonsuz). */
function duvarAni(p) {
  const { vx } = bilesenler(p);
  return duvarVar(p) && vx > 0 ? p.duvar / vx : Infinity;
}

/** t anındaki yatay konum — duvar çarpışmasını da hesaba katar. */
function yatayKonum(t, p) {
  const { vx } = bilesenler(p);
  const td = duvarAni(p);
  return t <= td ? vx * t : p.duvar - vx * SEKME * (t - td);
}
/** t anındaki yatay hız (işaretli). */
function yatayHiz(t, p) {
  const { vx } = bilesenler(p);
  return t <= duvarAni(p) ? vx : -vx * SEKME;
}

/** Uçuş süresi: h₀ + ϑ₀y·t − ½gt² = 0 pozitif kökü.
    Duvar düşey hareketi etkilemediği için bu süre duvardan BAĞIMSIZDIR. */
function ucusSuresi(p) {
  const { vy } = bilesenler(p);
  return (vy + Math.sqrt(vy * vy + 2 * p.g * p.h0)) / p.g;
}
function menzil(p)  { return yatayKonum(ucusSuresi(p), p); }
/** Yerden ölçülen en yüksek nokta. */
function maksYuk(p) {
  const { vy } = bilesenler(p);
  return p.h0 + (vy > 0 ? (vy * vy) / (2 * p.g) : 0);
}

/* -------------------------------------------------------------- Durum */

function durum(p) {
  const { vx, vy } = bilesenler(p);
  return {
    t: 0,
    x: 0, y: p.h0,
    vx, vy,
    indi: false,
    strobe: [{ x: 0, y: p.h0 }],
    sonStrobe: 0,
    kayit: [{ t: 0, vx, vy, y: p.h0 }],
    sonKayit: 0
  };
}

function adim(st, dt, p) {
  if (st.indi) return;
  const { vx, vy } = bilesenler(p);
  st.t += dt;

  /* Kapalı form — ekrandaki sayı tahtadaki formülle birebir aynı olsun diye */
  st.x  = yatayKonum(st.t, p);
  st.y  = p.h0 + vy * st.t - 0.5 * p.g * st.t * st.t;
  st.vx = yatayHiz(st.t, p);
  st.vy = vy - p.g * st.t;

  if (st.y <= 0) {
    st.t  = ucusSuresi(p);
    st.x  = yatayKonum(st.t, p);
    st.y  = 0;
    st.vx = yatayHiz(st.t, p);
    st.vy = vy - p.g * st.t;
    st.indi = true;
    st.kayit.push({ t: st.t, vx: st.vx, vy: st.vy, y: 0 });
  }

  if (st.t - st.sonStrobe >= STROBE && st.strobe.length < 120) {
    st.sonStrobe += STROBE;
    st.strobe.push({ x: st.x, y: st.y });
  }
  if (!st.indi && st.t - st.sonKayit >= KAYIT && st.kayit.length < 5000) {
    st.sonKayit += KAYIT;
    st.kayit.push({ t: st.t, vx: st.vx, vy: st.vy, y: st.y });
  }
}

function bitti(st) { return st.indi; }

/* ------------------------------------------------------------- Ölçek */

/** Yatay ve düşeyde AYNI ölçek — yörünge şekli bozulmasın. */
function olcekKur(w, h, p, pay) {
  /* Duvar varsa cisim duvara kadar gidip geri döner; en uzak nokta duvardır. */
  const m = Math.max(menzil(p), duvarVar(p) ? p.duvar : 0);
  const yMax = maksYuk(p);
  const kx = (w - pay.sol - pay.sag) / Math.max(1, m * 1.12);
  const ky = (h - pay.ust - pay.alt) / Math.max(1, yMax * 1.12);
  return Math.min(kx, ky);
}

/* ------------------------------------------------- Gerçekçi görünüm */

function cizGercek(ctx, w, h, st, p) {
  const ufuk = h - 28;
  const pay = { sol: 30, sag: 30, ust: 30, alt: 28 };
  const s = olcekKur(w, h, p, pay);

  const X = m => pay.sol + m * s;          // yatay metre → piksel
  const Y = m => ufuk - m * s;             // yükseklik → piksel

  D.gokyuzu(ctx, w, h, ufuk);
  D.tepeler(ctx, w, ufuk);
  D.cimZemin(ctx, w, h, ufuk);

  /* --- fırlatma platformu (h₀ > 0 ise kayalık) --- */
  if (p.h0 > 0.5) {
    ctx.fillStyle = '#8A7A63';
    ctx.beginPath();
    ctx.moveTo(0, ufuk);
    ctx.lineTo(0, Y(p.h0));
    ctx.lineTo(X(0) + 16, Y(p.h0));
    ctx.lineTo(X(0) + 22, ufuk);
    ctx.closePath(); ctx.fill();
    ctx.strokeStyle = '#6B5D4A'; ctx.lineWidth = 1.5; ctx.stroke();
    /* platform üstü çim */
    ctx.fillStyle = R.cim;
    ctx.fillRect(0, Y(p.h0) - 4, X(0) + 18, 5);
  }

  /* --- atıcı --- */
  D.insan(ctx, X(0) - 12, Y(p.h0), .85, '#3C3489', -(p.aci * Math.PI / 180) - 0.2);

  /* --- yörünge izi (sürekli eğri) --- */
  const T = ucusSuresi(p);
  const { vx, vy } = bilesenler(p);
  ctx.save();
  ctx.setLineDash([4, 5]);
  ctx.strokeStyle = 'rgba(184,74,38,.55)'; ctx.lineWidth = 1.6;
  ctx.beginPath();
  for (let i = 0; i <= 60; i++) {
    const t = T * i / 60;
    const px = X(yatayKonum(t, p)), py = Y(p.h0 + vy * t - 0.5 * p.g * t * t);
    i ? ctx.lineTo(px, py) : ctx.moveTo(px, py);
  }
  ctx.stroke();
  ctx.restore();

  /* --- duvar --- */
  if (duvarVar(p)) {
    const dx = X(p.duvar), dyst = Y(maksYuk(p) * 1.02);
    ctx.fillStyle = R.tugla;
    ctx.fillRect(dx, dyst, 11, ufuk - dyst);
    ctx.strokeStyle = R.tuglaDrz; ctx.lineWidth = 1;
    for (let r = dyst; r < ufuk; r += 10) {
      ctx.beginPath(); ctx.moveTo(dx, r + .5); ctx.lineTo(dx + 11, r + .5); ctx.stroke();
    }
    ctx.fillStyle = R.tuglaKoyu;
    ctx.fillRect(dx - 2, dyst - 4, 15, 5);
    D.yaziAydinlik(ctx, 'duvar · ' + D.biçim(p.duvar) + ' m', dx + 6, dyst - 14,
                   '#7A2E12', '600 11px system-ui, sans-serif', 'center');
  }

  /* --- strobe: eşit zaman aralıklarında konum --- */
  st.strobe.forEach((q, i) => {
    ctx.save();
    ctx.globalAlpha = .18 + .45 * (i / Math.max(1, st.strobe.length - 1));
    ctx.fillStyle = '#B84A26';
    ctx.beginPath(); ctx.arc(X(q.x), Y(q.y), 3.4, 0, 6.2832); ctx.fill();
    ctx.restore();
  });

  /* --- karşılaştırma topu: aynı noktadan yalnızca DÜŞEY hareket --- */
  const karX = X(0) + 14;
  D.kesikliCizgi(ctx, karX, Y(maksYuk(p)) - 10, karX, ufuk, 'rgba(60,80,110,.35)', 1, [2, 6]);
  if (!st.indi) {
    /* iki cismin aynı yükseklikte olduğunu gösteren yatay bağ */
    D.kesikliCizgi(ctx, karX, Y(st.y), X(st.x), Y(st.y), 'rgba(53,192,138,.85)', 1.6, [5, 4]);
  }
  D.top(ctx, karX, Y(st.y), 7, '#35C08A', '#8FE3C2');
  D.yaziAydinlik(ctx, 'karşılaştırma topu', karX + 8, Y(maksYuk(p)) - 18,
                 '#0F6E56', '600 10px system-ui, sans-serif', 'left');

  /* --- cisim --- */
  D.top(ctx, X(st.x), Y(st.y), 8);

  /* --- iniş noktası ve menzil --- */
  const mX = X(menzil(p));
  ctx.strokeStyle = '#993C1D'; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(mX, ufuk - 12); ctx.lineTo(mX, ufuk + 4); ctx.stroke();
  ctx.fillStyle = '#E24B4A';
  ctx.beginPath();
  ctx.moveTo(mX, ufuk - 12); ctx.lineTo(mX + 13, ufuk - 8); ctx.lineTo(mX, ufuk - 4);
  ctx.closePath(); ctx.fill();
  D.olcu(ctx, X(0), ufuk + 14, mX, ufuk + 14,
         'menzil ' + D.biçim(menzil(p)) + ' m', '#444441');

  /* --- en yüksek nokta --- */
  const hm = maksYuk(p);
  if (hm > p.h0 + 0.5) {
    D.kesikliCizgi(ctx, pay.sol - 16, Y(hm), w - 14, Y(hm), 'rgba(255,176,32,.7)', 1.4, [4, 4]);
    D.yaziAydinlik(ctx, 'h_max = ' + D.biçim(hm) + ' m', w - 18, Y(hm) - 11,
                   '#854F0B', '600 11px system-ui, sans-serif', 'right');
  }

  D.rozet(ctx, p.aci < 0.5 ? 'yatay atış' : `eğik atış · α = ${D.biçim(p.aci)}°`,
          w / 2 + 40, 9, 'rgba(255,255,255,.9)', '#2C3850');
}

/* --------------------------------------------- Klasik fizik görünümü */

function cizKlasik(ctx, w, h, st, p) {
  D.izgara(ctx, w, h, 28);

  const pay = { sol: 52, sag: 26, ust: 34, alt: 40 };
  const s = olcekKur(w, h, p, pay);
  const oy = h - pay.alt;
  const X = m => pay.sol + m * s;
  const Y = m => oy - m * s;

  const T = ucusSuresi(p);
  const { vx, vy } = bilesenler(p);
  const m = menzil(p), hm = maksYuk(p);

  /* Çentikler yuvarlak metre değerlerine konur (10, 20, 50 …) — eksen
     tahtaya çizilmiş bir grafik gibi okunsun diye. */
  D.eksen(ctx, {
    ox: pay.sol, oy, xUzun: w - pay.sol - pay.sag, yUzun: h - pay.ust - pay.alt,
    xEtiket: 'x', yEtiket: 'y', birimX: 'm', birimY: 'm',
    olcek: s
  });
  /* x ekseni aynı zamanda zemindir; tarama bunu açıkça gösterir */
  D.taramaliZemin(ctx, pay.sol, w - pay.sag - 18, oy, K.eksen);

  /* yörünge */
  ctx.save();
  ctx.strokeStyle = 'rgba(77,163,255,.5)'; ctx.lineWidth = 1.8;
  ctx.beginPath();
  for (let i = 0; i <= 60; i++) {
    const t = T * i / 60;
    const px = X(yatayKonum(t, p)), py = Y(p.h0 + vy * t - 0.5 * p.g * t * t);
    i ? ctx.lineTo(px, py) : ctx.moveTo(px, py);
  }
  ctx.stroke();
  ctx.restore();

  if (duvarVar(p)) {
    const dx = X(p.duvar);
    ctx.save();
    ctx.strokeStyle = R.kuvvet; ctx.lineWidth = 2.4;
    ctx.beginPath(); ctx.moveTo(dx, oy); ctx.lineTo(dx, Y(maksYuk(p) * 1.02)); ctx.stroke();
    ctx.restore();
    D.yaziHaleli(ctx, 'duvar', dx, Y(maksYuk(p) * 1.02) - 10, R.kuvvet,
                 '600 11px system-ui, sans-serif', 'center');
  }

  const cx = X(st.x), cy = Y(st.y);

  /* --- eksenlere iz düşümler: hareketin iki bağımsız bileşeni --- */
  /* yatay iz düşüm — eşit aralıklı, çünkü ϑx sabit */
  st.strobe.forEach(q => {
    ctx.fillStyle = 'rgba(255,122,69,.75)';
    ctx.fillRect(X(q.x) - 1.5, oy + 6, 3, 7);
  });
  /* düşey iz düşüm — giderek seyrekleşir, çünkü düşeyde ivmeli */
  st.strobe.forEach(q => {
    ctx.fillStyle = 'rgba(53,192,138,.75)';
    ctx.fillRect(pay.sol - 13, Y(q.y) - 1.5, 7, 3);
  });
  D.yaziHaleli(ctx, 'yatayda eşit aralıklı → sabit hız', X(0), oy + 24,
               R.merkezcil, '10px system-ui, sans-serif', 'left');

  /* --- hız vektörü ve bileşenleri --- */
  if (!st.indi) {
    const ol = 1.15;                                   // m/s → piksel
    const bx = cx + st.vx * ol, by = cy - st.vy * ol;
    /* bileşenler */
    D.vektor(ctx, cx, cy, bx, cy, R.merkezcil, 'ϑx = ' + D.biçim(st.vx), { kalinlik: 2 });
    D.vektor(ctx, cx, cy, cx, by, R.hiz,     'ϑy = ' + D.biçim(st.vy), { kalinlik: 2 });
    /* bileşke */
    ctx.save();
    ctx.setLineDash([3, 3]); ctx.strokeStyle = 'rgba(167,184,212,.5)'; ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(bx, cy); ctx.lineTo(bx, by); ctx.moveTo(cx, by); ctx.lineTo(bx, by);
    ctx.stroke();
    ctx.restore();
    D.vektor(ctx, cx, cy, bx, by, K.beyaz,
             'ϑ = ' + D.biçim(Math.hypot(st.vx, st.vy)), { kalinlik: 2.6 });
  }

  D.noktaCisim(ctx, cx, cy, 8, R.konum);

  /* --- başlangıç açısı --- */
  if (p.aci > 0.5 && st.t < 0.01) {
    D.aciYayi(ctx, X(0), Y(p.h0), 34, -p.aci * Math.PI / 180, 0, K.metin,
              D.biçim(p.aci) + '°');
  }

  /* --- ivme: her zaman aşağı, sabit --- */
  const ax = w - 46;
  D.vektor(ctx, ax, pay.ust + 6, ax, pay.ust + 6 + Math.min(52, p.g * 4.2), R.ivme, 'g');

  D.yaziHaleli(ctx, `h_max ${D.biçim(hm)} m · iniş noktası ${D.biçim(m)} m · uçuş ${D.biçim(T, 2)} s`,
               pay.sol, 16, K.metin2, '11px system-ui, sans-serif', 'left');
  if (duvarVar(p))
    D.yaziHaleli(ctx, 'duvar düşey hareketi etkilemez ⟹ uçuş süresi değişmedi',
                 w - pay.sag, h - 8, R.ivme, '600 10px system-ui, sans-serif', 'right');
}

/* ------------------------------------------------------------ Grafik */

function cizGrafik(ctx, w, h, st, p) {
  const T = ucusSuresi(p);
  const { vx, vy } = bilesenler(p);
  const pay = 8;
  const gw = (w - pay * 4) / 3;
  const gh = h - 6;

  D.miniGrafik(ctx, {
    x: pay, y: 3, w: gw, h: gh,
    baslik: 'ϑx − t   (yatay hız)', birim: 'm/s',
    veri: st.kayit.map(d => ({ t: d.t, v: d.vx })),
    /* duvardan sekince ϑx NEGATİF olur; eksen o değeri de kapsar */
    tMax: T, vMin: duvarVar(p) && duvarAni(p) < T ? -vx * SEKME * 1.3 : 0,
    vMax: Math.max(vx * 1.3, 5),
    renk: '#FF7A45', dolgu: true
  });

  D.miniGrafik(ctx, {
    x: pay * 2 + gw, y: 3, w: gw, h: gh,
    baslik: 'ϑy − t   (düşey hız)', birim: 'm/s',
    veri: st.kayit.map(d => ({ t: d.t, v: d.vy })),
    tMax: T, vMin: Math.min(-(p.g * T - vy) * 1.1, -5), vMax: Math.max(vy * 1.2, 5),
    renk: R.hiz
  });

  D.miniGrafik(ctx, {
    x: pay * 3 + gw * 2, y: 3, w: gw, h: gh,
    baslik: 'y − t   (yükseklik)', birim: 'm',
    veri: st.kayit.map(d => ({ t: d.t, v: d.y })),
    tMax: T, vMin: 0, vMax: Math.max(maksYuk(p) * 1.15, 5),
    renk: R.konum
  });
}

/* ----------------------------------------------------------- Okumalar */

function okumalar(st, p) {
  return [
    { et: 'Süre  t',        dg: D.biçim(st.t, 2),        birim: 's' },
    { et: 'Yatay  x',       dg: D.biçim(st.x),           birim: 'm' },
    { et: 'Yükseklik  y',   dg: D.biçim(st.y),           birim: 'm' },
    /* Etiket duruma göre: duvar yoksa ϑx gerçekten sabittir ve bunu
       vurgulamak konunun ana fikri; duvar varsa sabit değildir. */
    { et: duvarVar(p) ? 'ϑx' : 'ϑx  (sabit)', dg: D.biçim(st.vx), birim: 'm/s' },
    { et: 'ϑy',             dg: D.biçim(st.vy),          birim: 'm/s' },
    { et: 'Menzil',         dg: D.biçim(menzil(p)),      birim: 'm' }
  ];
}

/* ------------------------------------------------------------- Tanım */

D.simler = D.simler || {};
D.simler['atislar'] = {
  id: 'atislar',
  baslik: 'Yatay ve eğik atış',
  yukseklik: 330,
  grafikPanel: true,
  grafikYukseklik: 175,
  parametreler: [
    { anahtar: 'v0',  etiket: 'İlk hız ϑ₀', min: 5, max: 60, adim: 1, deger: 25, birim: 'm/s' },
    { anahtar: 'aci', etiket: 'Açı α',      min: 0, max: 80, adim: 1, deger: 53, birim: '°' },
    { anahtar: 'h0',  etiket: 'Yükseklik h₀', min: 0, max: 80, adim: 5, deger: 0, birim: 'm' },
    { anahtar: 'duvar', etiket: 'Duvar', min: 0, max: 140, adim: 10, deger: 0, birim: 'm' },
    { anahtar: 'g', etiket: 'g', tur: 'secim', deger: 10, secenekler: [
      { d: 10,  e: '10 m/s² (Dünya)' },
      { d: 1.6, e: '1,6 m/s² (Ay)' }
    ]}
  ],
  durum, adim, bitti, cizGercek, cizKlasik, cizGrafik, okumalar
};

})();
