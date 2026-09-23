(function () {
"use strict";
window.F11 = window.F11 || {};

/* ==========================================================================
   sims/aydinlanma.js
   --------------------------------------------------------------------------
   Konu 3.1 · Işık şiddeti, ışık akısı ve aydınlanma  (MEB 11, s.302-314)

   Matematiksel model (kitaptaki notasyonla):
       I : ışık şiddeti      — kandela (cd)
       Φ : ışık akısı        — lümen (lm)
       E : aydınlanma        — lüks (lx)

       Φ = 4π · I          (noktasal kaynağın TOPLAM akısı)
       E = Φ / A           (yüzeye düşen akı yoğunluğu)
       E = I / d²          (yüzey ışınlara DİK ise)
       E = I·cosα / d²     (yüzey eğikse — kosinüs yasası)

   TERS KARE, YİNE
   ---------------
   2. ünitedeki Coulomb ve elektriksel alan da ters kareydi. Sebep aynı
   geometridir: noktadan her yöne yayılan etki, d uzaklıkta 4πd² alanlı bir
   küreye dağılır. Bu simülasyon o bağlantıyı açıkça kurar.
   ========================================================================== */

const D = window.F11;
const { R, K } = D;

/* ------------------------------------------------------------- Fizik */

function toplamAki(p) { return 4 * Math.PI * p.I; }               // lm

function aciRad(p) { return (p.alfa * Math.PI) / 180; }

/** Yüzeydeki aydınlanma (lx). */
function aydinlanma(p) {
  const d = Math.max(0.1, p.d / 100);
  return (p.I * Math.cos(aciRad(p))) / (d * d);
}

/** Belirli bir E için gereken toplam akı (lm) — oda aydınlatması. */
function gerekenAki(p) { return p.Eist * p.odaA; }

/** Kaç ampul gerekir? */
function ampulSayisi(p) { return gerekenAki(p) / Math.max(1, p.ampulLm); }

/* -------------------------------------------------------------- Durum */

/* Oynat'a basılınca kaynağın uzaklığı taranır; aydınlanmanın uzaklığın
   KARESİYLE nasıl azaldığı canlı görünür. Kaydırıcı taramanın başladığı
   uzaklığı belirler. */
const TARAMA_PERIYOT = 12;      // s

function durum(p) { return { t: 0, d: p.d, Eist: p.Eist }; }

function adim(st, dt, p) {
  st.t += dt;
  /* Uzaklık her düzenekte taranır ki E−d eğrisindeki çalışma noktası oynasın. */
  st.d = D.tarama(st.t, p.d, p.d < 200 ? 400 : 40, TARAMA_PERIYOT);
  if (p.mod > 1.5) {
    /* Oda tasarımı: istenen aydınlanma da taranır, gereken ampul sayısı değişir. */
    st.Eist = Math.round(D.tarama(st.t, p.Eist, p.Eist < 400 ? 750 : 50, TARAMA_PERIYOT * 1.3) / 25) * 25;
  }
}

function bitti() { return false; }

/** Taranan uzaklıkla güncellenmiş parametreler. */
function etkin(st, p) {
  return Object.assign({}, p, {
    d:    (st && st.d != null)    ? st.d    : p.d,
    Eist: (st && st.Eist != null) ? st.Eist : p.Eist
  });
}

/* --------------------------------------------- Gerçekçi görünüm */

function cizGercek(ctx, w, h, st, pHam) {
  const p = etkin(st, pHam);
  if (p.mod > 1.5) { cizOda(ctx, w, h, st, p); return; }

  /* Ölçek SABİT: 4 m (kaydırıcının en büyük değeri) ekranda w·0,70 px. */
  const kx = w * 0.14, ky = h * 0.38;
  const olcek = (w * 0.70) / 4.0;
  const d = p.d / 100;
  const yx = kx + d * olcek;

  /* ışık kaynağı */
  D.ampul(ctx, kx, ky, 15, Math.min(1, p.I / 200));
  D.yaziAydinlik(ctx, 'I = ' + D.biçim(p.I) + ' cd', kx, ky - 44, R.mur,
                 '700 12px system-ui, sans-serif', 'center');

  /* Yayılan ışınlar: kaynaktan SABİT açılarla çıkan bir demet. Uzaklık
     arttıkça demet genişler; yüzeye düşen ışın sayısı azalır — ters kare
     yasası tam olarak budur. Yüzey eğikse ışınlara dik izdüşümü cosα kadar
     küçülür ve yine daha az ışın yakalar. */
  const alfa = aciRad(p);
  const yuzeyBoy = 74;
  const yakalar = (yuzeyBoy / 2) * Math.cos(alfa);
  let isabet = 0;
  ctx.save();
  for (let k = -8; k <= 8; k++) {
    const a = k * 0.05;
    const dy = Math.tan(a) * (yx - kx);
    if (Math.abs(dy) <= yakalar) {
      isabet++;
      D.isin(ctx, kx + 14 * Math.cos(a), ky + 14 * Math.sin(a), yx - 6, ky + dy, 'rgba(255,196,60,.85)', 1.6, false);
    } else {
      /* yüzeyi ıskalayan ışın: panelin kenarına kadar soluk */
      const ux = w - 8 - kx;
      D.isin(ctx, kx + 14 * Math.cos(a), ky + 14 * Math.sin(a), w - 8, ky + Math.tan(a) * ux,
             'rgba(255,196,60,.22)', 1.2, false);
    }
  }
  ctx.restore();

  /* yüzey — alfa kadar eğik */
  ctx.save();
  ctx.translate(yx, ky); ctx.rotate(alfa); ctx.translate(-yx, -ky);
  ctx.fillStyle = '#C9A06A';
  ctx.fillRect(yx - 5, ky - yuzeyBoy / 2, 10, yuzeyBoy);
  ctx.restore();

  /* yüzey normali */
  D.normalDogrultu(ctx, yx, ky, 48, alfa);
  if (p.alfa > 1)
    D.aciYayi(ctx, yx, ky, 34, Math.PI, Math.PI + alfa, R.ivme, D.biçim(p.alfa) + '°');

  /* uzaklık ölçüsü */
  D.olcu(ctx, kx, ky + 96, yx, ky + 96, 'd = ' + D.biçim(p.d) + ' cm', R.mur);

  /* aydınlanma göstergesi — yüzeyin parlaklığı (göz duyarlılığına yakın
     olsun diye karekök ölçek; en yakın uzaklıktaki E’ye göre) */
  const E = aydinlanma(p);
  const Eref = p.I / (0.2 * 0.2);
  ctx.save();
  ctx.translate(yx, ky); ctx.rotate(alfa); ctx.translate(-yx, -ky);
  ctx.globalAlpha = Math.min(0.95, 0.08 + 0.87 * Math.sqrt(Math.max(0, E) / Eref));
  ctx.fillStyle = '#FFF3B0';
  ctx.fillRect(yx - 5, ky - yuzeyBoy / 2, 10, yuzeyBoy);
  ctx.restore();
  D.yaziAydinlik(ctx, 'yüzeye düşen ışın: ' + isabet + ' / 17', yx, ky + yuzeyBoy / 2 + 18, R.mur,
                 '600 11px system-ui, sans-serif', 'center');

  D.yaziAydinlik(ctx, 'E = ' + D.biçim(E) + ' lx', w - 10, 28, R.normal,
                 '700 14px system-ui, sans-serif', 'right');
  D.yaziAydinlik(ctx, 'Φ_toplam = ' + D.biçim(toplamAki(p)) + ' lm', w - 10, 48, R.ivme,
                 '700 12px system-ui, sans-serif', 'right');
  D.yaziAydinlik(ctx, 'ışınlar noktadan her yöne yayılır — küreye dağılır',
                 10, h - 12, R.mur, '600 11px system-ui, sans-serif', 'left');
}

function cizOda(ctx, w, h, st, p) {
  /* oda kesiti */
  const ox = w * 0.10, oy = h * 0.20, ow = w * 0.80, oh = h * 0.56;
  ctx.fillStyle = '#E8DCC8'; ctx.fillRect(ox, oy, ow, oh);
  ctx.strokeStyle = '#8A7B62'; ctx.lineWidth = 3; ctx.strokeRect(ox, oy, ow, oh);
  ctx.fillStyle = '#A07B45'; ctx.fillRect(ox, oy + oh - 14, ow, 14);

  /* tavandaki ampuller */
  const adet = Math.max(1, Math.min(14, Math.ceil(ampulSayisi(p))));
  for (let k = 0; k < adet; k++) {
    const x = ox + (k + 0.5) * (ow / adet);
    D.ampul(ctx, x, oy + 26, 9, 0.8);
  }

  /* zemindeki aydınlanma bandı */
  const yeterli = ampulSayisi(p) <= 14;
  ctx.save();
  ctx.globalAlpha = 0.45;
  ctx.fillStyle = yeterli ? '#FFE9A8' : '#E0C9A0';
  ctx.fillRect(ox + 6, oy + oh - 40, ow - 12, 26);
  ctx.restore();

  D.yaziAydinlik(ctx, 'oda alanı ' + D.biçim(p.odaA) + ' m² · hedef ' + D.biçim(p.Eist) + ' lx',
                 w / 2, oy + oh + 26, R.mur, '700 12px system-ui, sans-serif', 'center');
  D.yaziAydinlik(ctx, D.biçim(adet) + ' ampul', w / 2, oy + 54, '#8A6838',
                 '700 14px system-ui, sans-serif', 'center');
  D.yaziAydinlik(ctx, 'gereken akı: ' + D.biçim(gerekenAki(p)) + ' lm', w - 10, 26, R.normal,
                 '700 12px system-ui, sans-serif', 'right');
  D.yaziAydinlik(ctx, 'ampul başına ' + D.biçim(p.ampulLm) + ' lm', w - 10, 44, R.ivme,
                 '700 12px system-ui, sans-serif', 'right');
}

/* ----------------------------------------- Klasik fizik görünümü */

function cizKlasik(ctx, w, h, st, pHam) {
  const p = etkin(st, pHam);
  D.izgara(ctx, w, h, 26);

  if (p.mod > 1.5) {
    D.yaziHaleli(ctx, 'Kaç ampul gerekir?', 12, 22, K.beyaz,
                 '700 12px system-ui, sans-serif', 'left');
    const satir = [
      ['E = Φ / A', K.beyaz, '700 13px system-ui, sans-serif'],
      ['⟹ Φ = E · A', K.metin2, '12px system-ui, sans-serif'],
      ['', K.metin2, '11px'],
      ['Φ = ' + D.biçim(p.Eist) + ' lx · ' + D.biçim(p.odaA) + ' m²', K.metin2, '11px system-ui, sans-serif'],
      ['Φ = ' + D.biçim(gerekenAki(p)) + ' lm', R.normal, '700 13px system-ui, sans-serif'],
      ['', K.metin2, '11px'],
      ['adet = Φ / (ampul akısı)', K.beyaz, '700 12px system-ui, sans-serif'],
      ['= ' + D.biçim(gerekenAki(p)) + ' / ' + D.biçim(p.ampulLm), K.metin2, '11px system-ui, sans-serif'],
      ['= ' + D.biçim(ampulSayisi(p), 2) + ' ⟹ ' + Math.ceil(ampulSayisi(p)) + ' adet',
       R.ivme, '700 13px system-ui, sans-serif']
    ];
    let sy = 50;
    satir.forEach(([t, c, f]) => {
      if (t) D.yaziHaleli(ctx, t, w * 0.30, sy, c, f, 'left');
      sy += 18;
    });
    D.yaziHaleli(ctx, 'Sonuç kesirli çıkarsa YUKARI yuvarlanır — eksik ışık olmaz',
                 12, h - 16, R.ivme, '600 11px system-ui, sans-serif', 'left');
    return;
  }

  /* --- nokta kaynak: ters kare --- */
  D.yaziHaleli(ctx, 'Ters kare yasası', 12, 22, K.beyaz,
               '700 12px system-ui, sans-serif', 'left');

  /* iç içe küreler şeması */
  const cx = w * 0.14, cy = h * 0.48;
  ctx.save();
  ctx.strokeStyle = K.eksen; ctx.lineWidth = 1.4;
  [22, 42, 62].forEach((r, i) => {
    ctx.beginPath(); ctx.arc(cx, cy, r, -0.9, 0.9); ctx.stroke();
    D.yaziHaleli(ctx, (i + 1) + 'd', cx + r + 6, cy - 4, K.metin2,
                 '10px system-ui, sans-serif', 'left');
  });
  ctx.restore();
  D.noktaCisim(ctx, cx, cy, 5, R.ivme);
  D.yaziHaleli(ctx, 'alan ∝ d² ⟹ E ∝ 1/d²', cx, cy + 84, K.metin2,
               '11px system-ui, sans-serif', 'center');

  const d = p.d / 100, E = aydinlanma(p);
  const bx = w * 0.42;
  const satir = [
    ['E = I·cosα / d²', K.beyaz, '700 13px system-ui, sans-serif'],
    ['I = ' + D.biçim(p.I) + ' cd', K.metin2, '11px system-ui, sans-serif'],
    ['d = ' + D.biçim(d, 2) + ' m ⟹ d² = ' + D.biçim(d * d, 3), K.metin2, '11px system-ui, sans-serif'],
    ['cos' + D.biçim(p.alfa) + '° = ' + D.biçim(Math.cos(aciRad(p)), 3), R.ivme, '11px system-ui, sans-serif'],
    ['E = ' + D.biçim(E) + ' lx', R.normal, '700 14px system-ui, sans-serif'],
    ['', K.metin2, '11px'],
    ['Φ = 4π·I = ' + D.biçim(toplamAki(p)) + ' lm', K.metin2, '11px system-ui, sans-serif'],
    ['(kaynağın her yöne toplam akısı)', K.metin2, '10px system-ui, sans-serif']
  ];
  let sy = 46;
  satir.forEach(([t, c, f]) => {
    if (t) D.yaziHaleli(ctx, t, bx, sy, c, f, 'left');
    sy += 18;
  });

  D.yaziHaleli(ctx, 'Coulomb ve elektriksel alan da ters kareydi — aynı geometri',
               12, h - 16, R.ivme, '600 11px system-ui, sans-serif', 'left');
}

/* ------------------------------------------------------- Grafikler */

function cizGrafik(ctx, w, h, st, pHam) {
  const p = etkin(st, pHam);
  const pay = 8, gw = (w - pay * 3) / 2, gh = h - 6;

  const v1 = [];
  for (let dd = 20; dd <= 400; dd += 5)
    v1.push({ t: dd, v: (p.I * Math.cos(aciRad(p))) / Math.pow(dd / 100, 2) });
  D.miniGrafik(ctx, {
    x: pay, y: 3, w: gw, h: gh,
    baslik: 'E − d   (ters KARE: d 2 katına → E dörtte bire)', birim: 'lx', tEtiket: 'd (cm)',
    imlec: { t: p.d, v: (p.I * Math.cos(aciRad(p))) / Math.pow(p.d / 100, 2) },
    veri: v1, tMax: 400, vMin: 0,
    vMax: (p.I * Math.cos(aciRad(p))) / Math.pow(0.2, 2) * 1.05,
    renk: R.normal
  });

  const v2 = [];
  for (let a = 0; a <= 90; a += 2)
    v2.push({ t: a, v: (p.I * Math.cos(a * Math.PI / 180)) / Math.pow(p.d / 100, 2) });
  D.miniGrafik(ctx, {
    x: pay * 2 + gw, y: 3, w: gw, h: gh,
    baslik: 'E − α   (kosinüs · 90°’de sıfır)', birim: 'lx', tEtiket: 'α (°)',
    imlec: { t: p.alfa, v: (p.I * Math.cos(aciRad(p))) / Math.pow(p.d / 100, 2) },
    veri: v2, tMax: 90, vMin: 0,
    vMax: Math.max(0.01, p.I / Math.pow(p.d / 100, 2) * 1.05),
    renk: R.ivme
  });
}

/* ----------------------------------------------------------- Okumalar */

function okumalar(st, pHam) {
  const p = etkin(st, pHam);
  if (p.mod > 1.5) {
    return [
      { et: 'Oda alanı',      dg: D.biçim(p.odaA),                birim: 'm²' },
      { et: 'Hedef  E',       dg: D.biçim(p.Eist),                birim: 'lx' },
      { et: 'Gereken akı  Φ', dg: D.biçim(gerekenAki(p)),         birim: 'lm' },
      { et: 'Ampul akısı',    dg: D.biçim(p.ampulLm),             birim: 'lm' },
      { et: 'Hesap',          dg: D.biçim(ampulSayisi(p), 2),     birim: 'adet' },
      { et: 'Gereken',        dg: String(Math.ceil(ampulSayisi(p))), birim: 'adet' }
    ];
  }
  return [
    { et: 'Işık şiddeti  I',  dg: D.biçim(p.I),              birim: 'cd' },
    { et: 'Uzaklık  d',       dg: D.biçim(p.d),              birim: 'cm' },
    { et: 'Açı  α',           dg: D.biçim(p.alfa),           birim: '°' },
    { et: 'Aydınlanma  E',    dg: D.biçim(aydinlanma(p)),    birim: 'lx' },
    { et: 'Toplam akı  Φ',    dg: D.biçim(toplamAki(p)),     birim: 'lm' }
  ];
}

/* ------------------------------------------------------------- Tanım */

D.simler = D.simler || {};
D.simler['aydinlanma'] = {
  id: 'aydinlanma',
  baslik: '3.1 · Aydınlanma · I, Φ ve E',
  yukseklik: 330,
  grafikPanel: true,
  grafikYukseklik: 170,
  parametreler: [
    { anahtar: 'mod', etiket: 'Düzenek', tur: 'secim', deger: 1, secenekler: [
      { d: 1, e: 'Nokta kaynak + yüzey' },
      { d: 2, e: 'Oda aydınlatma tasarımı' }
    ]},
    { anahtar: 'I',       etiket: 'Işık şiddeti I', min: 10, max: 400, adim: 10, deger: 100, birim: 'cd' },
    { anahtar: 'd',       etiket: 'Uzaklık d', min: 20, max: 400, adim: 10, deger: 100, birim: 'cm' },
    { anahtar: 'alfa',    etiket: 'Yüzey eğimi α', min: 0, max: 85, adim: 5, deger: 0, birim: '°' },
    { anahtar: 'odaA',    etiket: 'Oda alanı', min: 5, max: 100, adim: 5, deger: 25, birim: 'm²' },
    { anahtar: 'Eist',    etiket: 'İstenen aydınlanma', min: 50, max: 800, adim: 50, deger: 300, birim: 'lx' },
    { anahtar: 'ampulLm', etiket: 'Ampul akısı', min: 400, max: 3000, adim: 100, deger: 1600, birim: 'lm' }
  ],
  durum, adim, bitti, cizGercek, cizKlasik, cizGrafik, okumalar
};

})();
