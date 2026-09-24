(function () {
"use strict";
window.F11 = window.F11 || {};

/* ==========================================================================
   sims/serbest-cisim-diyagrami.js
   --------------------------------------------------------------------------
   Konu 1.3.2 · Serbest cisim diyagramı   (MEB 11, s. 53-64)

   Kitabın etkinliği bir tablodur: görsel verilir, öğrenci cisme etki eden
   kuvvetleri belirler ve diyagramı çizer. Bu simülasyon o tablonun canlı hâli.

   Altı senaryo:  sol panelde gerçek düzenek, sağ panelde serbest cisim
   diyagramı. Öğrenci ikisi arasında gidip gelerek "hangi kuvvet nereden
   geliyor" bağlantısını kurar.

   TASARIM KARARI
   --------------
   Diyagramda cisim DAİMA bir kutu/nokta olarak çizilir, sahnedeki şekliyle
   değil. Sebep: serbest cisim diyagramının amacı cismi bir parçacığa
   indirgemektir (kitap s.53: "cismin bir parçacık gibi davrandığı kabul
   edilir"). Sahnedeki kova, kitap, sandık — diyagramda hepsi aynı kutudur.

   Sürtünme bu konuda ihmal edilir (kitap s.53 tablosu). Sürtünme 1.4'te gelir.
   ========================================================================== */

const D = window.F11;
const { R, K } = D;

const G_SABIT = 10;

/* ==================================================================
   SENARYO TANIMLARI
   Her senaryo, cisme etki eden kuvvetleri ve ivmeyi bildirir.
   yon: ekran koordinatında birim vektör (y aşağı pozitif).
   ================================================================== */

const SENARYOLAR = {

  1: {
    ad: 'Yatay ipte çekilen blok',
    not: 'Kitabın s.53’teki örneği. Sürtünme ihmal ediliyor.',
    kullanilan: 'm ve F',
    hareketli: true,
    ivme: p => p.f / p.m,                       // yatay, sağa
    kuvvetler: p => [
      { sembol: 'T', ad: 'ip gerilmesi', yon: [1, 0],  buyukluk: p.f,          renk: R.kuvvet },
      { sembol: 'N', ad: 'normal kuvvet', yon: [0, -1], buyukluk: p.m * G_SABIT, renk: R.normal },
      { sembol: 'G', ad: 'ağırlık',       yon: [0, 1],  buyukluk: p.m * G_SABIT, renk: R.agirlik }
    ],
    ozet: p => [
      'F_net = T = ' + D.biçim(p.f) + ' N (yatay)',
      'Düşey: N = G ⟹ denge',
      'a = T/m = ' + D.biçim(p.f / p.m) + ' m/s² (sağa)'
    ]
  },

  2: {
    ad: 'Masada duran kitap',
    not: 'Cisim durgun. Bileşke kuvvet sıfır.',
    kullanilan: 'sadece m',
    hareketli: false,
    ivme: () => 0,
    kuvvetler: p => [
      { sembol: 'N', ad: 'normal kuvvet', yon: [0, -1], buyukluk: p.m * G_SABIT, renk: R.normal },
      { sembol: 'G', ad: 'ağırlık',       yon: [0, 1],  buyukluk: p.m * G_SABIT, renk: R.agirlik }
    ],
    ozet: p => [
      'N = G = ' + D.biçim(p.m * G_SABIT) + ' N',
      'F_net = 0 ⟹ a = 0',
      'N ve G etki-tepki DEĞİL'
    ]
  },

  3: {
    ad: 'İple asılı duran kova',
    not: 'Zemin yok ⟹ normal kuvvet yok.',
    kullanilan: 'sadece m',
    hareketli: false,
    ivme: () => 0,
    kuvvetler: p => [
      { sembol: 'T', ad: 'ip gerilmesi', yon: [0, -1], buyukluk: p.m * G_SABIT, renk: R.kuvvet },
      { sembol: 'G', ad: 'ağırlık',      yon: [0, 1],  buyukluk: p.m * G_SABIT, renk: R.agirlik }
    ],
    ozet: p => [
      'T = G = ' + D.biçim(p.m * G_SABIT) + ' N',
      'F_net = 0 ⟹ a = 0',
      'Zemine değmiyor ⟹ N YOK'
    ]
  },

  4: {
    ad: 'Yukarı ivmelenen asansör',
    not: 'İvme yukarı ⟹ N > G. Kişi kendini ağır hisseder.',
    kullanilan: 'm ve a',
    hareketli: true,
    ivme: p => p.a,
    kuvvetler: p => [
      { sembol: 'N', ad: 'normal kuvvet', yon: [0, -1], buyukluk: p.m * (G_SABIT + p.a), renk: R.normal },
      { sembol: 'G', ad: 'ağırlık',       yon: [0, 1],  buyukluk: p.m * G_SABIT,         renk: R.agirlik }
    ],
    ozet: p => [
      'N − G = m·a',
      'N = m(g + a) = ' + D.biçim(p.m * (G_SABIT + p.a)) + ' N',
      'G = ' + D.biçim(p.m * G_SABIT) + ' N  ⟹  ' + (p.a > 0 ? 'N > G' : 'N = G (a = 0)')
    ]
  },

  5: {
    ad: 'Sürtünmesiz eğik düzlem',
    not: 'Ağırlık, eğime paralel ve dik bileşenlerine ayrılır.',
    kullanilan: 'm ve α',
    hareketli: true,
    ivme: p => G_SABIT * Math.sin(p.aci * Math.PI / 180),
    /* Sahnede eğim SAĞA doğru yükselir, cisim SOLA-aşağı kayar. Yüzeye dik
       normal kuvvet bu yüzden sol-yukarı bakar: (−sin α, −cos α). */
    kuvvetler: p => {
      const r = p.aci * Math.PI / 180;
      return [
        { sembol: 'N', ad: 'normal kuvvet',
          yon: [-Math.sin(r), -Math.cos(r)],
          buyukluk: p.m * G_SABIT * Math.cos(r), renk: R.normal },
        { sembol: 'G', ad: 'ağırlık',
          yon: [0, 1], buyukluk: p.m * G_SABIT, renk: R.agirlik }
      ];
    },
    ozet: p => {
      const r = p.aci * Math.PI / 180;
      return [
        'G∥ = G·sin α = ' + D.biçim(p.m * G_SABIT * Math.sin(r)) + ' N',
        'G⊥ = G·cos α = ' + D.biçim(p.m * G_SABIT * Math.cos(r)) + ' N = N',
        'a = g·sin α = ' + D.biçim(G_SABIT * Math.sin(r)) + ' m/s²'
      ];
    }
  },

  6: {
    ad: 'Serbest düşen cisim',
    not: 'Hava direnci yok ⟹ tek kuvvet ağırlık.',
    kullanilan: 'sadece m',
    hareketli: true,
    ivme: () => G_SABIT,
    kuvvetler: p => [
      { sembol: 'G', ad: 'ağırlık', yon: [0, 1], buyukluk: p.m * G_SABIT, renk: R.agirlik }
    ],
    ozet: p => [
      'Tek kuvvet: G = ' + D.biçim(p.m * G_SABIT) + ' N',
      'F_net = G = m·g',
      'a = g = 10 m/s² · kütle sadeleşir'
    ]
  }
};

function senaryo(p) { return SENARYOLAR[Math.round(p.sen)] || SENARYOLAR[1]; }

/* -------------------------------------------------------------- Durum */

function durum(p) {
  return { t: 0, ilerleme: 0, hiz: 0 };
}

/* Sahnedeki nesne ivmesiyle GERÇEKTEN ivmelenir: ϑ = a·t, x = ½·a·t².
   (Önceki sürümde her adımda ½·a·dt² ekleniyordu; bu, ivmeli hareketi sabit
   ve çok küçük bir hızla sürünmeye çeviriyordu.) ilerleme metre cinsindendir. */
function adim(st, dt, p) {
  const s = senaryo(p);
  st.t += dt;
  if (s.hareketli) {
    st.hiz += s.ivme(p) * dt;
    st.ilerleme += st.hiz * dt;
  }
}

function bitti(st, p) {
  const s = senaryo(p);
  /* ivmesi sıfır olan (dengedeki) düzenekler 3 s gösterilip durur */
  return s.hareketli && Math.abs(s.ivme(p)) > 1e-9 ? st.ilerleme > 26 : st.t > 3;
}

/* ------------------------------------------------- Gerçekçi görünüm */

function cizGercek(ctx, w, h, st, p) {
  const s = senaryo(p);
  const ufuk = h - 42;
  const ilerle = Math.min(st.ilerleme, 26);

  D.gokyuzu(ctx, w, h, ufuk, { bulutlar: Math.round(p.sen) !== 4 });

  switch (Math.round(p.sen)) {
    case 1: sahneIpliBlok(ctx, w, h, ufuk, p, ilerle); break;
    case 2: sahneMasa(ctx, w, h, ufuk, p); break;
    case 3: sahneAsili(ctx, w, h, ufuk, p); break;
    case 4: sahneAsansor(ctx, w, h, ufuk, p, ilerle); break;
    case 5: sahneEgik(ctx, w, h, ufuk, p, ilerle); break;
    case 6: sahneSerbest(ctx, w, h, ufuk, p, ilerle); break;
  }

  ctx.save();
  ctx.font = '600 12px system-ui, sans-serif';
  const g = ctx.measureText(s.ad).width + 22;
  ctx.restore();
  D.rozet(ctx, s.ad, Math.max(8, w - g - 10), 9, 'rgba(255,255,255,.92)', '#2C3850');
}

/* --- senaryo sahneleri --- */

function sahneIpliBlok(ctx, w, h, ufuk, p, ilerle) {
  D.cimZemin(ctx, w, h, ufuk);
  const x = 90 + ilerle * 11;
  D.sandik(ctx, x, ufuk, 48, 40);
  ctx.strokeStyle = '#8A6A3A'; ctx.lineWidth = 2.4;
  ctx.beginPath(); ctx.moveTo(x + 24, ufuk - 22); ctx.lineTo(x + 96, ufuk - 22); ctx.stroke();
  D.insan(ctx, x + 112, ufuk, 1, '#993C1D', 0.35);
  D.yaziAydinlik(ctx, 'T = ' + D.biçim(p.f) + ' N', x + 60, ufuk - 34,
                 '#993C1D', '600 12px system-ui, sans-serif', 'center');
  D.yaziAydinlik(ctx, D.biçim(p.m) + ' kg', x, ufuk - 20, '#4A2E10',
                 '700 12px system-ui, sans-serif', 'center');
}

function sahneMasa(ctx, w, h, ufuk, p) {
  D.cimZemin(ctx, w, h, ufuk);
  const mx = w * 0.42, my = ufuk - 58;
  ctx.fillStyle = R.ahsapKoyu;
  ctx.fillRect(mx - 70, my, 140, 9);
  ctx.fillRect(mx - 58, my + 9, 11, 49);
  ctx.fillRect(mx + 47, my + 9, 11, 49);
  ctx.fillStyle = '#2E5C8A';
  D.yuvarlakDik(ctx, mx - 30, my - 22, 60, 22, 3); ctx.fill();
  ctx.fillStyle = '#9FC8E8';
  ctx.fillRect(mx - 27, my - 19, 54, 4);
  D.yaziAydinlik(ctx, D.biçim(p.m) + ' kg kitap', mx, my - 34, R.mur,
                 '600 12px system-ui, sans-serif', 'center');
}

function sahneAsili(ctx, w, h, ufuk, p) {
  D.cimZemin(ctx, w, h, ufuk);
  const x = w * 0.45;
  ctx.fillStyle = R.metal;
  ctx.fillRect(x - 90, 22, 180, 9);
  ctx.strokeStyle = '#8A6A3A'; ctx.lineWidth = 2.4;
  ctx.beginPath(); ctx.moveTo(x, 31); ctx.lineTo(x, ufuk - 96); ctx.stroke();
  ctx.fillStyle = '#7D8A99';
  ctx.beginPath();
  ctx.moveTo(x - 26, ufuk - 96); ctx.lineTo(x + 26, ufuk - 96);
  ctx.lineTo(x + 20, ufuk - 50); ctx.lineTo(x - 20, ufuk - 50);
  ctx.closePath(); ctx.fill();
  ctx.strokeStyle = '#5A6674'; ctx.lineWidth = 1.6; ctx.stroke();
  D.yaziAydinlik(ctx, D.biçim(p.m) + ' kg', x, ufuk - 73, '#2C3850',
                 '700 12px system-ui, sans-serif', 'center');
}

function sahneAsansor(ctx, w, h, ufuk, p, ilerle) {
  ctx.fillStyle = '#25324A'; ctx.fillRect(0, 0, w, h);
  const x = w * 0.45;
  /* kuyu duvarları */
  ctx.fillStyle = '#1A2436';
  ctx.fillRect(x - 96, 0, 12, h); ctx.fillRect(x + 84, 0, 12, h);
  /* kat çizgileri — asansör yükseldikçe aşağı kayar */
  ctx.strokeStyle = '#3A4E76'; ctx.lineWidth = 1;
  for (let i = -1; i < 6; i++) {
    const yy = ((i * 62 + ilerle * 9) % (h + 62));
    ctx.beginPath(); ctx.moveTo(x - 84, yy); ctx.lineTo(x + 84, yy); ctx.stroke();
  }
  /* kabin */
  ctx.fillStyle = '#3A4E76';
  D.yuvarlakDik(ctx, x - 62, h * 0.24, 124, h * 0.56, 5); ctx.fill();
  ctx.strokeStyle = '#8FA3C8'; ctx.lineWidth = 2; ctx.stroke();
  /* halat */
  ctx.strokeStyle = '#9AA5B1'; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h * 0.24); ctx.stroke();
  /* kişi + tartı */
  const taban = h * 0.8;
  ctx.fillStyle = '#5F6B78';
  D.yuvarlakDik(ctx, x - 24, taban - 10, 48, 10, 3); ctx.fill();
  D.insan(ctx, x, taban - 10, 1.15, '#E8EDF5', -0.4);
  D.yaziHaleli(ctx, D.biçim(p.m) + ' kg', x + 34, taban - 34, '#E8EDF5',
               '700 12px system-ui, sans-serif', 'left');
  D.vektor(ctx, x + 74, taban - 40, x + 74, taban - 92, R.ivme,
           'a = ' + D.biçim(p.a) + ' m/s²');
}

function sahneEgik(ctx, w, h, ufuk, p, ilerle) {
  D.cimZemin(ctx, w, h, ufuk);
  const r = p.aci * Math.PI / 180;
  const taban = Math.min(w * 0.72, (ufuk - 40) / Math.tan(r || 0.01));
  const x0 = w * 0.1;
  const { yuk, tepeX, tepeY } = D.egikDuzlem(ctx, x0, ufuk, taban, r);
  D.aciYayi(ctx, x0, ufuk, 42, -r, 0, '#4A2E10', D.biçim(p.aci) + '°');

  /* sandık eğim boyunca aşağı kayar */
  const oran = Math.min(ilerle / 26, 1);
  const bx = tepeX - (taban * 0.92) * oran;
  const by = tepeY + (yuk * 0.92) * oran;
  ctx.save();
  ctx.translate(bx, by); ctx.rotate(-r);
  D.sandik(ctx, 0, 0, 40, 32);
  ctx.restore();
  D.yaziAydinlik(ctx, D.biçim(p.m) + ' kg', bx, by - 26, '#4A2E10',
                 '700 12px system-ui, sans-serif', 'center');
  D.yaziAydinlik(ctx, 'sürtünmesiz', x0 + taban * 0.5, ufuk - 12, '#4A2E10',
                 '10px system-ui, sans-serif', 'center');
}

function sahneSerbest(ctx, w, h, ufuk, p, ilerle) {
  D.tepeler(ctx, w, ufuk);
  D.cimZemin(ctx, w, h, ufuk);
  const x = w * 0.45;
  const y = 44 + Math.min(ilerle * 9, ufuk - 70);
  D.tuglaKule(ctx, x - 86, 30, 44, ufuk, { mazgal: true });
  D.kesikliCizgi(ctx, x, 40, x, ufuk, 'rgba(60,80,110,.4)', 1, [2, 6]);
  D.top(ctx, x, y, 10);
  D.yaziAydinlik(ctx, D.biçim(p.m) + ' kg', x + 16, y, '#4A2E10',
                 '700 12px system-ui, sans-serif', 'left');
  D.yaziAydinlik(ctx, 'hava direnci ihmal', 10, h - 10, '#4A6076',
                 '10px system-ui, sans-serif', 'left');
}

/* --------------------------------------------- Serbest cisim diyagramı */

function cizKlasik(ctx, w, h, st, p) {
  const s = senaryo(p);
  D.izgara(ctx, w, h, 28);

  const cx = w * 0.40, cy = h * 0.50;

  D.yaziHaleli(ctx, 'serbest cisim diyagramı', 12, 16, K.metin2,
               '600 11px system-ui, sans-serif', 'left');
  D.yaziHaleli(ctx, 'kullanılan: ' + s.kullanilan, w - 12, 16, K.metin2,
               '10px system-ui, sans-serif', 'right');
  /* hareketli senaryolarda anlık hız: kuvvetler sabit ama hız artıyor */
  if (s.hareketli && Math.abs(s.ivme(p)) > 1e-9)
    D.yaziHaleli(ctx, 't = ' + D.biçim(st.t, 2) + ' s · ϑ = a·t = ' + D.biçim(st.hiz || 0) + ' m/s',
                 w - 12, 32, R.hiz, '600 11px system-ui, sans-serif', 'right');
  else
    D.yaziHaleli(ctx, 'F_net = 0 · denge (a = 0)', w - 12, 32, R.hiz,
                 '600 11px system-ui, sans-serif', 'right');

  /* Eğik düzlemde eksenler eğime göre döndürülür — problem böyle çözülür.
     Eğim sahnedeki gibi SAĞA doğru yükselir. G’nin bileşenleri kesikli
     çizilir: G∥ eğim boyunca aşağı (hareketin yönü), G⊥ yüzeye doğru. */
  if (Math.round(p.sen) === 5) {
    const r = p.aci * Math.PI / 180;
    ctx.save();
    ctx.setLineDash([4, 4]);
    ctx.strokeStyle = 'rgba(74,95,134,.7)'; ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(cx - Math.cos(r) * 92, cy + Math.sin(r) * 92);
    ctx.lineTo(cx + Math.cos(r) * 92, cy - Math.sin(r) * 92);
    ctx.stroke();
    ctx.restore();
    D.yaziHaleli(ctx, 'eğim doğrultusu', cx + Math.cos(r) * 100, cy - Math.sin(r) * 100 - 12,
                 K.metin2, '10px system-ui, sans-serif', 'center');
    const G = p.m * G_SABIT;
    const olc = 66 / Math.max(G, 1);
    const gPar = G * Math.sin(r) * olc, gDik = G * Math.cos(r) * olc;
    ctx.save(); ctx.globalAlpha = 0.6;
    D.vektor(ctx, cx, cy, cx - Math.cos(r) * gPar, cy + Math.sin(r) * gPar, R.agirlik, 'G∥', { kalinlik: 1.6 });
    D.vektor(ctx, cx, cy, cx + Math.sin(r) * gDik, cy + Math.cos(r) * gDik, R.agirlik, 'G⊥', { kalinlik: 1.6 });
    ctx.restore();
  }

  /* Cisim daima kutu — parçacık indirgemesi (kitap s.53) */
  ctx.fillStyle = '#2E3D57';
  D.yuvarlakDik(ctx, cx - 26, cy - 20, 52, 40, 6); ctx.fill();
  ctx.strokeStyle = K.eksen; ctx.lineWidth = 1.5; ctx.stroke();
  D.yaziHaleli(ctx, D.biçim(p.m) + ' kg', cx, cy, K.beyaz,
               '600 11px system-ui, sans-serif', 'center');

  /* Kuvvetler — ortak ölçek, böylece boylar karşılaştırılabilir */
  const kuv = s.kuvvetler(p);
  const enBuyuk = Math.max(...kuv.map(k => k.buyukluk), 1);
  const ol = 66 / enBuyuk;

  kuv.forEach(k => {
    const boy = Math.max(18, k.buyukluk * ol);
    const bx = cx + k.yon[0] * (26 + 4), by = cy + k.yon[1] * (20 + 4);
    D.vektor(ctx, bx, by, bx + k.yon[0] * boy, by + k.yon[1] * boy,
             k.renk, k.sembol + ' = ' + D.biçim(k.buyukluk) + ' N', { kalinlik: 2.6 });
  });

  /* --- Kuvvet listesi: SOL ÜST, başlığın altında ---
     Alt köşede özet satırlarıyla dar panellerde çakışıyordu. */
  let ly = 48;
  D.yaziHaleli(ctx, 'etki eden kuvvetler', 12, 34, K.metin2,
               '600 10px system-ui, sans-serif', 'left');
  kuv.forEach(k => {
    ctx.fillStyle = k.renk;
    ctx.fillRect(12, ly - 4, 9, 9);
    D.yaziHaleli(ctx, k.sembol + ' · ' + k.ad, 27, ly, K.metin,
                 '11px system-ui, sans-serif', 'left');
    ly += 15;
  });

  /* --- Özet: SAĞ ALT köşe ---
     Üstte olduğunda kuvvet vektörlerinin etiketleriyle çakışıyordu. */
  const ozet = s.ozet(p);
  let sy = h - 28 - (ozet.length - 1) * 17;
  ozet.forEach(satir => {
    D.yaziHaleli(ctx, satir, w - 12, sy, K.beyaz, '11px system-ui, sans-serif', 'right');
    sy += 17;
  });
  D.yaziHaleli(ctx, s.not, w - 12, h - 8, K.metin2, '10px system-ui, sans-serif', 'right');
}

/* ----------------------------------------------------------- Okumalar */

function okumalar(st, p) {
  const s = senaryo(p);
  const kuv = s.kuvvetler(p);
  const a = s.ivme(p);
  return [
    { et: 'Senaryo',        dg: String(Math.round(p.sen)),            birim: '/ 6' },
    { et: 'Kuvvet sayısı',  dg: String(kuv.length),                   birim: '' },
    { et: 'Ağırlık  G',     dg: D.biçim(p.m * G_SABIT),               birim: 'N' },
    { et: 'İvme  a',        dg: D.biçim(a),                           birim: 'm/s²' },
    { et: 'Durum',          dg: Math.abs(a) < 0.01 ? 'Dengede' : 'İvmeli', birim: '' },
    { et: 'Bileşke  F',     dg: D.biçim(Math.abs(a) * p.m),           birim: 'N' }
  ];
}

/* ------------------------------------------------------------- Tanım */

D.simler = D.simler || {};
D.simler['serbest-cisim-diyagrami'] = {
  id: 'serbest-cisim-diyagrami',
  baslik: 'Serbest cisim diyagramı · altı senaryo',
  yukseklik: 340,
  parametreler: [
    { anahtar: 'sen', etiket: 'Senaryo', tur: 'secim', deger: 1, secenekler: [
      { d: 1, e: '1 · Yatay ipte çekilen blok' },
      { d: 2, e: '2 · Masada duran kitap' },
      { d: 3, e: '3 · İple asılı kova' },
      { d: 4, e: '4 · Yukarı ivmelenen asansör' },
      { d: 5, e: '5 · Sürtünmesiz eğik düzlem' },
      { d: 6, e: '6 · Serbest düşen cisim' }
    ]},
    { anahtar: 'm',   etiket: 'Kütle m',   min: 2,  max: 50, adim: 1, deger: 10, birim: 'kg' },
    { anahtar: 'f',   etiket: 'Kuvvet F',  min: 10, max: 200, adim: 10, deger: 50, birim: 'N' },
    { anahtar: 'a',   etiket: 'Asansör a', min: 0,  max: 5,  adim: 0.5, deger: 2, birim: 'm/s²' },
    { anahtar: 'aci', etiket: 'Eğim α',    min: 10, max: 60, adim: 5,  deger: 30, birim: '°' }
  ],
  durum, adim, bitti, cizGercek, cizKlasik, okumalar
};

})();
