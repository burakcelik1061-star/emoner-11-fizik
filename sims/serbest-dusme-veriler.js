(function () {
"use strict";
window.F11 = window.F11 || {};

/* ==========================================================================
   sims/serbest-dusme-veriler.js
   --------------------------------------------------------------------------
   Konu 1.1.2 · Serbest düşme hareketi ile ilgili veriler   (MEB 11, s. 20-29)

   Kitabın kurduğu işaret düzenini birebir izler:
     · YUKARI yön pozitif
     · g = −10 m/s²  (yani ivme her zaman negatif)
     · Konum, cismin BIRAKILDIĞI NOKTAYA göre ölçülür.
       Cisim atış seviyesinin altına inince y negatif olur.
       (Kitap s.26: t = 3 s'de y = −15 m)

   Bu yüzden iki panel iki farklı şeyi gösterir ve bu kasıtlıdır:
     Sol  (gerçekçi) → cismin YERDEN yüksekliği, gerçek dünyadaki hâli
     Sağ  (klasik)   → ATIŞ NOKTASINA göre konum, kitabın koordinat düzlemi
   Öğrenci "sıfırı nereye koyduğun sonucu değiştirmez ama işareti değiştirir"
   fikrini iki paneli karşılaştırarak kavrar.

   Matematiksel modeller (kitap s.23 tablosu):
       h = ϑ₀·t ± ½·g·t²        ϑ = ϑ₀ ± g·t        ϑ² = ϑ₀² ± 2·g·h
   ========================================================================== */

const D = window.F11;
const { R, K } = D;

const STROBE = 0.5;      // strobe işareti aralığı (s)
const KAYIT  = 0.02;     // grafik için veri kayıt aralığı (s)

/* ------------------------------------------------------- Türetilmiş değerler */

/** Havada kalma süresi: h0 + ϑ₀t − ½gt² = 0 kökü. */
function ucusSuresi(p) {
  const { v0, h0, g } = p;
  return (v0 + Math.sqrt(v0 * v0 + 2 * g * h0)) / g;
}
/** Atış noktasına göre en yüksek nokta (yukarı atışta). */
function tepeYukseklik(p) {
  return p.v0 > 0 ? (p.v0 * p.v0) / (2 * p.g) : 0;
}

/* -------------------------------------------------------------- Durum */

function durum(p) {
  return {
    t: 0,
    y: 0,                 // atış noktasına göre konum (m), yukarı +
    v: p.v0,              // hız (m/s), yukarı +
    indi: false,
    strobe: [{ t: 0, y: 0 }],
    sonStrobe: 0,
    kayit: [{ t: 0, y: 0, v: p.v0 }],
    sonKayit: 0,
    tepeGecti: false,
    tepeAn: null          // tepe noktasına ulaşılan an
  };
}

/* Sabit ivmeli hareketin KAPALI FORM çözümü.
   Sayısal integrasyon (Euler) yerine bunu kullanıyoruz çünkü bu bir öğretim
   aracı: ekrandaki sayı, tahtada yazılan formülün verdiği sayıyla BİREBİR
   aynı çıkmalı. Euler ile t = 2 s'de y = −0,04 m gibi küçük ama
   açıklanamayan sapmalar oluşuyordu. Kapalı form hem tam doğru hem daha ucuz. */
function konumAn(t, p) { return p.v0 * t - 0.5 * p.g * t * t; }
function hizAn(t, p)   { return p.v0 - p.g * t; }

function adim(st, dt, p) {
  if (st.indi) return;

  const oncekiV = st.v;
  st.t += dt;
  st.y = konumAn(st.t, p);
  st.v = hizAn(st.t, p);

  /* tepe noktası: hız işaret değiştirdiği an */
  if (!st.tepeGecti && oncekiV > 0 && st.v <= 0) {
    st.tepeGecti = true;
    st.tepeAn = p.v0 / p.g;
  }

  /* yere indi mi? (yerden yükseklik = h0 + y)
     İniş anı da kapalı formdan alınır; son kare yarım adım taşmaz. */
  if (p.h0 + st.y <= 0) {
    st.t = ucusSuresi(p);
    st.y = -p.h0;
    st.v = hizAn(st.t, p);
    st.indi = true;
    /* iniş anı grafikte eksik kalmasın */
    st.kayit.push({ t: st.t, y: st.y, v: st.v });
  }

  if (st.t - st.sonStrobe >= STROBE && st.strobe.length < 80) {
    st.sonStrobe += STROBE;
    st.strobe.push({ t: st.t, y: st.y });
  }
  if (!st.indi && st.t - st.sonKayit >= KAYIT && st.kayit.length < 5000) {
    st.sonKayit += KAYIT;
    st.kayit.push({ t: st.t, y: st.y, v: st.v });
  }
}

function bitti(st) { return st.indi; }

/* ------------------------------------------------- Gerçekçi görünüm */

function cizGercek(ctx, w, h, st, p) {
  const ufuk = h - 30;
  const ust  = 26;

  /* Ölçek: en yüksek nokta ile zemin arasını sığdır. */
  const enYuksek = p.h0 + Math.max(0, tepeYukseklik(p));
  const olcek = (ufuk - ust) / Math.max(1, enYuksek);
  const yerdenPiksel = m => ufuk - m * olcek;

  D.gokyuzu(ctx, w, h, ufuk);
  D.tepeler(ctx, w, ufuk);
  D.cimZemin(ctx, w, h, ufuk);

  /* --- bina --- */
  const bg = Math.max(52, Math.min(78, w * 0.15));
  const bx = Math.round(w * 0.13);
  const binaUst = yerdenPiksel(p.h0);
  D.tuglaKule(ctx, bx, binaUst, bg, ufuk, { mazgal: false, pencere: true, kapi: true });

  /* pencere hizasında duran kişi */
  D.insan(ctx, bx + bg + 14, binaUst, .9, '#3C3489', p.v0 >= 0 ? -1.15 : 0.9);

  /* --- cismin yolu --- */
  const cx = Math.round(w * 0.52);
  const iz = 'rgba(60,80,110,.38)';
  D.kesikliCizgi(ctx, cx, ust, cx, ufuk, iz, 1, [2, 6]);
  /* atış seviyesi çizgisi — y = 0 düzlemi */
  D.kesikliCizgi(ctx, bx + bg, binaUst, w - 46, binaUst, 'rgba(77,163,255,.55)', 1.4, [6, 5]);
  D.yaziAydinlik(ctx, 'atış seviyesi (y = 0)', w - 50, binaUst - 11,
                 '#185FA5', '600 11px system-ui, sans-serif', 'right');

  /* strobe izleri */
  st.strobe.forEach((s, i) => {
    ctx.save();
    ctx.globalAlpha = 0.16 + 0.4 * (i / Math.max(1, st.strobe.length - 1));
    ctx.strokeStyle = '#B84A26'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.arc(cx, yerdenPiksel(p.h0 + s.y), 4, 0, 6.2832); ctx.stroke();
    ctx.restore();
  });

  /* tepe noktası işareti */
  if (p.v0 > 0) {
    const ty = yerdenPiksel(p.h0 + tepeYukseklik(p));
    D.kesikliCizgi(ctx, cx - 40, ty, w - 46, ty, 'rgba(255,176,32,.7)', 1.4, [4, 4]);
    D.yaziAydinlik(ctx, 'tepe · ϑ = 0', w - 50, ty - 11,
                   '#854F0B', '600 11px system-ui, sans-serif', 'right');
  }

  /* cisim */
  const cy = yerdenPiksel(p.h0 + st.y);
  D.top(ctx, cx, cy, 9);

  /* --- yerden yükseklik cetveli --- */
  const rx = w - 34;
  ctx.strokeStyle = R.mur; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(rx, ust); ctx.lineTo(rx, ufuk); ctx.stroke();
  const adimM = enYuksek > 60 ? 20 : 10;
  for (let m = 0; m <= enYuksek; m += adimM) {
    const yy = yerdenPiksel(m);
    ctx.beginPath(); ctx.moveTo(rx, yy); ctx.lineTo(rx + 5, yy); ctx.stroke();
    D.yaziAydinlik(ctx, String(m), rx + 8, yy, R.mur, '10px system-ui, sans-serif', 'left');
  }

  D.rozet(ctx, `yerden yükseklik: ${D.biçim(Math.max(0, p.h0 + st.y))} m`,
          w / 2 + 40, 9, 'rgba(255,255,255,.9)', '#2C3850');
}

/* --------------------------------------------- Klasik fizik görünümü */

function cizKlasik(ctx, w, h, st, p) {
  D.izgara(ctx, w, h, 28);

  const tepe = Math.max(0, tepeYukseklik(p));
  const ustSinir = Math.max(tepe, 5);
  const altSinir = p.h0;

  const ustPay = 30, altPay = 26;
  const kullanilir = h - ustPay - altPay;
  const olcek = kullanilir / (ustSinir + altSinir);

  const sifirY = ustPay + ustSinir * olcek;    // y = 0 düzleminin ekran konumu
  const ox = 62;
  const py = m => sifirY - m * olcek;

  /* --- y ekseni: sıfır ORTADA, yukarısı +, aşağısı − --- */
  ctx.save();
  ctx.strokeStyle = K.eksen; ctx.lineWidth = 1.6; ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(ox, py(ustSinir) - 8); ctx.lineTo(ox, py(-altSinir));
  ctx.stroke();
  ctx.restore();
  D.ok(ctx, ox, py(ustSinir) + 4, ox, py(ustSinir) - 10, K.eksen, 1.6, 9);
  D.yaziHaleli(ctx, 'y (m)', ox + 8, py(ustSinir) - 12, K.metin2,
               '600 12px system-ui, sans-serif', 'left');

  /* çentikler — hem pozitif hem negatif tarafta */
  const adimM = (ustSinir + altSinir) > 90 ? 20 : 10;
  ctx.save();
  ctx.strokeStyle = K.eksen; ctx.lineWidth = 1;
  for (let m = -Math.floor(altSinir / adimM) * adimM; m <= ustSinir; m += adimM) {
    const yy = py(m);
    ctx.beginPath(); ctx.moveTo(ox - 5, yy); ctx.lineTo(ox, yy); ctx.stroke();
    D.yaziHaleli(ctx, String(m), ox - 9, yy,
                 m === 0 ? K.beyaz : K.metin2,
                 (m === 0 ? '700 ' : '') + '11px system-ui, sans-serif', 'right');
  }
  ctx.restore();

  /* y = 0 düzlemi (atış noktası) */
  D.kesikliCizgi(ctx, ox, sifirY, w - 20, sifirY, 'rgba(77,163,255,.5)', 1.4, [5, 5]);
  D.yaziHaleli(ctx, 'atış noktası', w - 24, sifirY - 11, R.konum,
               '600 11px system-ui, sans-serif', 'right');

  /* zemin */
  D.taramaliZemin(ctx, ox - 10, w - 20, py(-altSinir), K.eksen);
  D.yaziHaleli(ctx, `zemin (y = −${D.biçim(p.h0)} m)`, w - 24, py(-altSinir) + 14,
               K.metin2, '11px system-ui, sans-serif', 'right');

  /* strobe */
  const cx = ox + 92;
  let sonY = -1e9;
  st.strobe.forEach((s, i) => {
    const yy = py(s.y);
    if (Math.abs(yy - sonY) < 8) return;
    sonY = yy;
    ctx.save();
    ctx.globalAlpha = 0.2 + 0.55 * (i / Math.max(1, st.strobe.length - 1));
    ctx.strokeStyle = R.konum; ctx.lineWidth = 1.6;
    ctx.beginPath(); ctx.arc(cx, yy, 3.4, 0, 6.2832); ctx.stroke();
    ctx.restore();
  });

  /* cisim + vektörler */
  const cy = py(st.y);
  D.noktaCisim(ctx, cx, cy, 9, R.konum);

  /* hız vektörü — işaretiyle birlikte yön değiştirir */
  if (Math.abs(st.v) > 0.3) {
    const boy = Math.min(70, 10 + Math.abs(st.v) * 1.5);
    const yon = st.v > 0 ? -1 : 1;
    D.vektor(ctx, cx, cy + yon * 11, cx, cy + yon * (11 + boy),
             R.hiz, 'ϑ = ' + D.biçim(st.v));
  } else {
    D.yaziHaleli(ctx, 'ϑ = 0', cx + 16, cy, R.hiz, '600 12px system-ui, sans-serif', 'left');
  }

  /* ivme vektörü — her zaman aşağı, her zaman aynı boy */
  const ax = w - 58;
  D.vektor(ctx, ax, 52, ax, 52 + Math.min(60, p.g * 4.6), R.ivme, 'g');
  D.yaziHaleli(ctx, '−' + D.biçim(p.g) + ' m/s²', ax, 38, R.ivme,
               '600 11px system-ui, sans-serif', 'center');

  D.yaziHaleli(ctx, `noktalar ${D.biçim(STROBE)} s aralıkla`, ox - 46, h - 10,
               K.metin2, '11px system-ui, sans-serif', 'left');
}

/* ------------------------------------------------------------ Grafik */

function cizGrafik(ctx, w, h, st, p) {
  const T = ucusSuresi(p);
  const tepe = Math.max(0, tepeYukseklik(p));

  const pay = 8;
  const gw = (w - pay * 4) / 3;
  const gh = h - 6;

  /* Eksen sınırları SABİT tutulur — eğri büyürken çerçeve oynamaz,
     öğrenci eğrinin şeklini izleyebilir. */
  D.miniGrafik(ctx, {
    x: pay, y: 3, w: gw, h: gh,
    baslik: 'y − t   (konum)', birim: 'm',
    veri: st.kayit.map(d => ({ t: d.t, v: d.y })),
    tMax: T, vMin: -p.h0, vMax: Math.max(tepe, p.h0 * 0.15),
    renk: R.konum
  });

  D.miniGrafik(ctx, {
    x: pay * 2 + gw, y: 3, w: gw, h: gh,
    baslik: 'ϑ − t   (hız)', birim: 'm/s',
    veri: st.kayit.map(d => ({ t: d.t, v: d.v })),
    /* En küçük hız iniş anındaki hızdır: ϑ = ϑ₀ − g·T (aşağı atışta da doğru) */
    tMax: T, vMin: Math.min(0, p.v0 - p.g * T) * 1.05, vMax: Math.max(p.v0, 5),
    renk: R.hiz, dolgu: true
  });

  const aMax = p.g * 1.5;
  D.miniGrafik(ctx, {
    x: pay * 3 + gw * 2, y: 3, w: gw, h: gh,
    baslik: 'a − t   (ivme)', birim: 'm/s²',
    veri: st.kayit.map(d => ({ t: d.t, v: -p.g })),
    tMax: T, vMin: -aMax, vMax: aMax * 0.45,
    renk: R.ivme
  });
}

/* ----------------------------------------------------------- Okumalar */

function okumalar(st, p) {
  const tepe = tepeYukseklik(p);
  return [
    { et: 'Süre  t',              dg: D.biçim(st.t, 2),                 birim: 's' },
    { et: 'Konum  y',             dg: D.biçim(st.y),                    birim: 'm' },
    { et: 'Yerden yükseklik',     dg: D.biçim(Math.max(0, p.h0 + st.y)),birim: 'm' },
    { et: 'Hız  ϑ',               dg: D.biçim(st.v),                    birim: 'm/s' },
    { et: 'Çıkılan en yüksek',    dg: p.v0 > 0 ? D.biçim(tepe) : '0',   birim: 'm' },
    { et: 'Havada kalma',         dg: D.biçim(ucusSuresi(p), 2),        birim: 's' }
  ];
}

/* ------------------------------------------------------------- Tanım */

D.simler = D.simler || {};
D.simler['serbest-dusme-veriler'] = {
  id: 'serbest-dusme-veriler',
  baslik: 'İlk hızlı serbest düşme ve grafikleri',
  yukseklik: 340,
  grafikPanel: true,
  grafikYukseklik: 180,
  parametreler: [
    { anahtar: 'v0', etiket: 'İlk hız ϑ₀', min: -20, max: 30, adim: 5, deger: 10, birim: 'm/s' },
    { anahtar: 'h0', etiket: 'Atış yüksekliği', min: 15, max: 100, adim: 5, deger: 45, birim: 'm' },
    { anahtar: 'g', etiket: 'g', tur: 'secim', deger: 10, secenekler: [
      { d: 10,  e: '10 m/s² (işlem kolaylığı)' },
      { d: 9.8, e: '9,8 m/s² (gerçek)' },
      { d: 1.6, e: '1,6 m/s² (Ay)' }
    ]}
  ],
  durum, adim, bitti, cizGercek, cizKlasik, cizGrafik, okumalar
};

})();
