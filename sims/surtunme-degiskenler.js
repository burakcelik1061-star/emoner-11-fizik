(function () {
"use strict";
window.F11 = window.F11 || {};

/* ==========================================================================
   sims/surtunme-degiskenler.js
   --------------------------------------------------------------------------
   Konu 1.4.2 · Sürtünme kuvvetinin bağlı olduğu değişkenler  (MEB 11, s.70-85)

   Kitabın matematiksel modeli (s.75):
       f_k = μk · N            (kinetik)
       f_s ≤ μs · N            (statik, üst sınır)
   Katsayı sembolü ders kitabında k'dir (k_s, k_k). Bu sistemde uluslararası
   standart olan μ kullanılır (μs, μk) — konu metninde bu fark belirtilmiştir.

   DENEY KURGUSU
   -------------
   Bloğun üzerine zamanla ağırlık eklenir; N büyür. Her N değeri için gereken
   kopma kuvveti ölçülür. Sağdaki f − N grafiği kendiliğinden bir DOĞRU çizer
   ve bu doğrunun EĞİMİ sürtünme katsayısıdır. Yani öğrenci k'yi ezberlemez,
   grafikten okur.

   TEMAS ALANI
   -----------
   "Alan" seçeneği bloğun çizimini değiştirir ama hesaba HİÇ girmez.
   Sayılar aynı kalır. Bu, konunun en şaşırtıcı sonucudur ve en iyi böyle
   gösterilir: öğrenci alanı değiştirir, sayının kıpırdamadığını görür.
   ========================================================================== */

const D = window.F11;
const { R, K } = D;

const G_SABIT = 10;
const KAYIT = 0.05;

/* Yüzey çiftleri — k_s her zaman k_k'den büyüktür. */
const YUZEYLER = {
  1: { ad: 'Buz',    ks: 0.10, kk: 0.03, renk: '#CFE6F5', doku: '#A9CBE0' },
  2: { ad: 'Ahşap',  ks: 0.50, kk: 0.30, renk: '#C98B4B', doku: '#8A5A28' },
  3: { ad: 'Beton',  ks: 0.70, kk: 0.60, renk: '#9AA5B1', doku: '#6E7A86' },
  4: { ad: 'Lastik', ks: 1.00, kk: 0.90, renk: '#4A4A4A', doku: '#2E2E2E' }
};
function yuzey(p) { return YUZEYLER[Math.round(p.yuzey)] || YUZEYLER[2]; }

/** Bloğun toplam kütlesi: kendi kütlesi + eklenen ağırlıklar. */
function toplamKutle(st, p) { return p.m + st.eklenen; }
function normal(st, p)      { return toplamKutle(st, p) * G_SABIT; }
function fsMaks(st, p)      { return yuzey(p).ks * normal(st, p); }
function fk(st, p)          { return yuzey(p).kk * normal(st, p); }

/* -------------------------------------------------------------- Durum */

function durum(p) {
  return { t: 0, eklenen: 0, adet: 0, kayit: [], sonKayit: -1 };
}

function adim(st, dt, p) {
  st.t += dt;
  /* Her saniyede bir 2 kg'lık ağırlık eklenir. */
  const yeniAdet = Math.min(8, Math.floor(st.t));
  if (yeniAdet !== st.adet) {
    st.adet = yeniAdet;
    st.eklenen = yeniAdet * 2;
  }
  if (st.t - st.sonKayit >= KAYIT && st.kayit.length < 1200) {
    st.sonKayit = st.t;
    st.kayit.push({ N: normal(st, p), fs: fsMaks(st, p), fkv: fk(st, p) });
  }
}

function bitti(st) { return st.t > 8.6; }

/* ------------------------------------------------- Gerçekçi görünüm */

function cizGercek(ctx, w, h, st, p) {
  const y = yuzey(p);
  const ufuk = h - 46;
  const bx = w * 0.40;

  D.gokyuzu(ctx, w, h, ufuk, { bulutlar: false, gunes: false });

  /* zemin — seçilen yüzeyin rengiyle */
  ctx.fillStyle = y.renk; ctx.fillRect(0, ufuk, w, h - ufuk);
  ctx.strokeStyle = y.doku; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(0, ufuk + .5); ctx.lineTo(w, ufuk + .5); ctx.stroke();
  for (let i = 0; i < w; i += 8) {
    ctx.beginPath(); ctx.moveTo(i, ufuk + 4); ctx.lineTo(i + 5, ufuk + 8); ctx.stroke();
  }
  D.yaziAydinlik(ctx, 'yüzey: ' + y.ad + '  ·  μs = ' + D.biçim(y.ks) + ' · μk = ' + D.biçim(y.kk),
                 8, h - 12, '#2C3850', '600 11px system-ui, sans-serif', 'left');

  /* --- blok: temas alanı seçime göre değişir, HESABA GİRMEZ --- */
  const genis = p.alan > 0.5;
  const bg = genis ? 92 : 40;
  const bh = genis ? 26 : 60;
  D.sandik(ctx, bx, ufuk, bg, bh);
  D.yaziAydinlik(ctx, D.biçim(p.m) + ' kg', bx, ufuk - bh / 2, '#4A2E10',
                 '700 11px system-ui, sans-serif', 'center');

  /* temas alanı vurgusu */
  ctx.strokeStyle = '#38D6E0'; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(bx - bg / 2, ufuk + 2); ctx.lineTo(bx + bg / 2, ufuk + 2); ctx.stroke();
  D.yaziAydinlik(ctx, genis ? 'geniş temas alanı' : 'dar temas alanı',
                 bx, ufuk + 18, '#0E6570', '600 10px system-ui, sans-serif', 'center');

  /* --- üste eklenen ağırlıklar --- */
  for (let i = 0; i < st.adet; i++) {
    const ay = ufuk - bh - 2 - i * 13;
    ctx.fillStyle = '#5F6B78';
    D.yuvarlakDik(ctx, bx - 26, ay - 11, 52, 11, 3); ctx.fill();
    ctx.strokeStyle = '#414B56'; ctx.lineWidth = 1; ctx.stroke();
  }
  if (st.adet > 0)
    D.yaziAydinlik(ctx, '+' + D.biçim(st.eklenen) + ' kg', bx + 36,
                   ufuk - bh - 6 - (st.adet - 1) * 13, '#2C3850',
                   '700 11px system-ui, sans-serif', 'left');

  /* --- kuvvet okları --- */
  const enB = yuzey(p).ks * (p.m + 16) * G_SABIT;
  const ol = 80 / Math.max(enB, 1);
  const oky = ufuk - bh - 2 - st.adet * 13 - 22;
  D.vektor(ctx, bx, oky, bx - fsMaks(st, p) * ol, oky, R.surtunme,
           'f_s,maks = ' + D.biçim(fsMaks(st, p)) + ' N', { kalinlik: 3 });
  D.vektor(ctx, bx, oky + 22, bx, oky + 22 + Math.min(52, normal(st, p) * ol * 0.5),
           R.agirlik, 'G = ' + D.biçim(normal(st, p)) + ' N', { kalinlik: 2.2 });

  D.rozet(ctx, 'N = ' + D.biçim(normal(st, p)) + ' N', 10, 9,
          'rgba(56,214,224,.95)', '#06343A');
}

/* --------------------------------------------- Klasik fizik görünümü */

function cizKlasik(ctx, w, h, st, p) {
  D.izgara(ctx, w, h, 28);
  const y = yuzey(p);
  const N = normal(st, p);

  /* =================================================================
     SOL: SERBEST CİSİM DİYAGRAMI
     Bu panel önceden yalnızca metindi — "klasik fizik görünümü" olmasına
     rağmen ne zemin ne cisim ne vektör vardı. Artık gerçek bir diyagram:
     blok, zemin, N, G ve sürtünme vektörleri.
     ================================================================= */
  const solGen = Math.min(210, w * 0.44);
  const cx = solGen * 0.46, cy = h * 0.42;

  D.yaziHaleli(ctx, 'serbest cisim diyagramı', 12, 16, K.metin2,
               '600 11px system-ui, sans-serif', 'left');
  D.taramaliZemin(ctx, 14, solGen - 8, cy + 26, K.eksen);

  /* blok — temas alanı seçimine göre şekli değişir, HESABA GİRMEZ */
  const genis = p.alan > 0.5;
  const bg = genis ? 76 : 40, bh = genis ? 26 : 44;
  ctx.fillStyle = '#2E3D57';
  D.yuvarlakDik(ctx, cx - bg / 2, cy + 26 - bh, bg, bh, 5); ctx.fill();
  ctx.strokeStyle = K.eksen; ctx.lineWidth = 1.5; ctx.stroke();
  D.yaziHaleli(ctx, D.biçim(toplamKutle(st, p)) + ' kg', cx, cy + 26 - bh / 2, K.beyaz,
               '600 11px system-ui, sans-serif', 'center');

  /* temas alanını vurgula — sayıların değişmediğini göstermek için */
  ctx.strokeStyle = R.normal; ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(cx - bg / 2, cy + 27); ctx.lineTo(cx + bg / 2, cy + 27);
  ctx.stroke();

  /* vektörler — ortak ölçek */
  const enB = Math.max(N, fsMaks(st, p), 1);
  const ol = 58 / enB;
  const ust = cy + 26 - bh;
  D.vektor(ctx, cx, ust, cx, ust - N * ol, R.normal, 'N', { kalinlik: 2.6 });
  D.vektor(ctx, cx, cy + 26, cx, cy + 26 + N * ol, R.agirlik, 'G', { kalinlik: 2.6 });
  D.vektor(ctx, cx - bg / 2, ust + bh / 2, cx - bg / 2 - fsMaks(st, p) * ol, ust + bh / 2,
           R.surtunme, 'f', { kalinlik: 2.6 });

  /* =================================================================
     SAĞ: MATEMATİKSEL MODEL
     ================================================================= */
  const bx = solGen + 12;
  D.yaziHaleli(ctx, 'matematiksel model', bx, 16, K.metin2,
               '600 11px system-ui, sans-serif', 'left');

  const satirlar = [
    ['N = m · g',          D.biçim(toplamKutle(st, p)) + ' · 10 = ' + D.biçim(N) + ' N', R.normal],
    ['f_s,maks = μs · N',  D.biçim(y.ks) + ' · ' + D.biçim(N) + ' = ' + D.biçim(fsMaks(st, p)) + ' N', R.surtunme],
    ['f_k = μk · N',       D.biçim(y.kk) + ' · ' + D.biçim(N) + ' = ' + D.biçim(fk(st, p)) + ' N', R.ivme]
  ];
  let sy = 42;
  satirlar.forEach(([sol, sag, renk]) => {
    D.yaziHaleli(ctx, sol, bx, sy, renk, '600 12px system-ui, sans-serif', 'left');
    D.yaziHaleli(ctx, sag, w - 14, sy + 17, K.beyaz, '12px system-ui, sans-serif', 'right');
    sy += 40;
  });

  /* --- temas alanı karşılaştırması: konunun asıl dersi --- */
  const ky = sy + 6;
  D.kesikliCizgi(ctx, bx, ky - 12, w - 14, ky - 12, 'rgba(74,95,134,.6)', 1, [4, 4]);
  D.yaziHaleli(ctx, 'temas alanı değiştirilirse?', bx, ky + 4, K.metin2,
               '600 11px system-ui, sans-serif', 'left');

  const deger = D.biçim(fk(st, p)) + ' N';
  const kAra = Math.min(120, (w - bx - 40) / 2);
  [['dar', 34, 40], ['geniş', 62, 22]].forEach(([et, gen, yuk], i) => {
    const qx = bx + 34 + i * kAra, qy = ky + 44;
    ctx.fillStyle = '#2E3D57';
    D.yuvarlakDik(ctx, qx - gen / 2, qy - yuk, gen, yuk, 4); ctx.fill();
    ctx.strokeStyle = K.eksen; ctx.lineWidth = 1.2; ctx.stroke();
    D.yaziHaleli(ctx, et, qx, qy + 14, K.metin2, '10px system-ui, sans-serif', 'center');
    D.yaziHaleli(ctx, 'f = ' + deger, qx, qy + 30, R.hiz,
                 '700 12px system-ui, sans-serif', 'center');
  });
  D.yaziHaleli(ctx, 'AYNI ⟹ alana bağlı değil · hıza da değil',
               w - 14, h - 10, R.hiz, '600 11px system-ui, sans-serif', 'right');
}

/* ------------------------------------------------------------ Grafik */

function cizGrafik(ctx, w, h, st, p) {
  const y = yuzey(p);
  const Nmax = (p.m + 16) * G_SABIT;
  const pay = 8;
  const gw = (w - pay * 3) / 2;
  const gh = h - 6;

  /* f − N grafiği: DOĞRU çıkar, eğimi katsayıdır. Konunun türetimi bu. */
  D.miniGrafik(ctx, {
    x: pay, y: 3, w: gw, h: gh,
    baslik: 'f_s,maks − N   (eğim = μs = ' + D.biçim(y.ks) + ')', birim: 'N',
    veri: st.kayit.map(d => ({ t: d.N, v: d.fs })),
    tMax: Nmax, vMin: 0, vMax: y.ks * Nmax * 1.15,
    renk: R.surtunme
  });

  D.miniGrafik(ctx, {
    x: pay * 2 + gw, y: 3, w: gw, h: gh,
    baslik: 'f_k − N   (eğim = μk = ' + D.biçim(y.kk) + ')', birim: 'N',
    veri: st.kayit.map(d => ({ t: d.N, v: d.fkv })),
    tMax: Nmax, vMin: 0, vMax: y.ks * Nmax * 1.15,
    renk: R.ivme
  });
}

/* ----------------------------------------------------------- Okumalar */

function okumalar(st, p) {
  const y = yuzey(p);
  return [
    { et: 'Yüzey',       dg: y.ad,                              birim: '' },
    { et: 'Toplam kütle',dg: D.biçim(toplamKutle(st, p)),       birim: 'kg' },
    { et: 'Normal  N',   dg: D.biçim(normal(st, p)),            birim: 'N' },
    { et: 'μs',          dg: D.biçim(y.ks),                     birim: '' },
    { et: 'f_s,maks',    dg: D.biçim(fsMaks(st, p)),            birim: 'N' },
    { et: 'f_k',         dg: D.biçim(fk(st, p)),                birim: 'N' }
  ];
}

/* ------------------------------------------------------------- Tanım */

D.simler = D.simler || {};
D.simler['surtunme-degiskenler'] = {
  id: 'surtunme-degiskenler',
  baslik: 'Ağırlık ekleme deneyi · f = k·N',
  yukseklik: 320,
  grafikPanel: true,
  grafikYukseklik: 175,
  parametreler: [
    { anahtar: 'yuzey', etiket: 'Yüzey', tur: 'secim', deger: 2, secenekler: [
      { d: 1, e: 'Buz  (μs=0,10 · μk=0,03)' },
      { d: 2, e: 'Ahşap  (μs=0,50 · μk=0,30)' },
      { d: 3, e: 'Beton  (μs=0,70 · μk=0,60)' },
      { d: 4, e: 'Lastik  (μs=1,00 · μk=0,90)' }
    ]},
    { anahtar: 'm', etiket: 'Blok kütlesi', min: 2, max: 20, adim: 1, deger: 4, birim: 'kg' },
    { anahtar: 'alan', etiket: 'Temas alanı', tur: 'secim', deger: 0, secenekler: [
      { d: 0, e: 'Dar (blok dik)' },
      { d: 1, e: 'Geniş (blok yatık)' }
    ]}
  ],
  durum, adim, bitti, cizGercek, cizKlasik, cizGrafik, okumalar
};

})();
