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

   PARALEL IŞIK (kitap s.307, s.310)
   ---------------------------------
   El feneri gibi paralel demette ışınlar yayılmaz: yüzeye düşen akı ve
   aydınlanma UZAKLIKTAN BAĞIMSIZDIR, yalnızca açıyla (cosα) değişir.

   ODA AYDINLATMASI (kitap s.308)
   ------------------------------
   Oturma odası için m² başına ≈ 300 lm, ofis için ≈ 400 lm önerilir.
   Aynı akıyı LED ampul akkor ampulün yaklaşık beşte biri güçle verir.

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
function paralelMi(p) { return p.mod > 2.5; }

/** Yüzeydeki aydınlanma (lx). Paralel demette uzaklık yoktur; karşılaştırma
    için demet, 1 m’deki nokta kaynağın dik aydınlanmasına (I / 1 m²) eşit seçildi. */
function aydinlanma(p) {
  if (paralelMi(p)) return p.I * Math.cos(aciRad(p));
  const d = Math.max(0.1, p.d / 100);
  return (p.I * Math.cos(aciRad(p))) / (d * d);
}

/* Işık verimliliği (lm/W) — kitabın örneğiyle (s.308) aynı: 1100 lm’lik
   LED 17 W (≈ 65 lm/W), akkor 75 W (≈ 14,7 lm/W). */
const VERIM = { 1: { ad: 'LED', lmW: 1100 / 17 }, 2: { ad: 'akkor', lmW: 1100 / 75 } };
function ampulGucu(p) { return p.ampulLm / VERIM[p.tur || 1].lmW; }

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
  if (p.mod > 1.5 && p.mod < 2.5) {
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
  if (paralelMi(p)) { cizParalel(ctx, w, h, st, p); return; }
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
  /* Ekrandaki ışın yelpazesi İKİ boyutludur: çarpan ışın sayısı 1/d ile azalır.
     Gerçek (üç boyutlu) yayılmada ışık d²’ye göre büyüyen bir alana dağılır. */
  D.yaziAydinlik(ctx, 'd = 1 m’dekinin 1/d² = ' + D.biçim(1 / Math.pow(p.d / 100, 2), 3) + ' katı', yx, ky + yuzeyBoy / 2 + 18, R.mur,
                 '600 11px system-ui, sans-serif', 'center');
  void isabet;

  D.yaziAydinlik(ctx, 'E = ' + D.biçim(E) + ' lx', w - 10, 28, R.normal,
                 '700 14px system-ui, sans-serif', 'right');
  D.yaziAydinlik(ctx, 'Φ_toplam = ' + D.biçim(toplamAki(p)) + ' lm', w - 10, 48, R.ivme,
                 '700 12px system-ui, sans-serif', 'right');
  D.yaziAydinlik(ctx, 'ışınlar noktadan her yöne yayılır — küreye dağılır',
                 10, h - 12, R.mur, '600 11px system-ui, sans-serif', 'left');
}

function cizParalel(ctx, w, h, st, p) {
  const kx = w * 0.12, ky = h * 0.40;
  const olcek = (w * 0.70) / 4.0;
  const yx = kx + (p.d / 100) * olcek;
  /* el feneri */
  ctx.fillStyle = '#4A5059'; D.yuvarlakDik(ctx, kx - 40, ky - 16, 44, 32, 5); ctx.fill();
  ctx.fillStyle = '#6E7684'; ctx.beginPath(); ctx.moveTo(kx + 4, ky - 16); ctx.lineTo(kx + 18, ky - 26); ctx.lineTo(kx + 18, ky + 26); ctx.lineTo(kx + 4, ky + 16); ctx.closePath(); ctx.fill();
  D.yaziAydinlik(ctx, 'el feneri (paralel demet)', 10, ky - 40, R.mur, '700 11px system-ui, sans-serif', 'left');
  /* demet: sabit genişlik, uzaklıkla GENİŞLEMEZ */
  const yari = 24, alfa = aciRad(p);
  const yuzeyBoy = 2 * yari / Math.max(0.12, Math.cos(alfa));      // eğik yüzeyde aynı demet daha geniş alana yayılır
  ctx.save(); ctx.fillStyle = 'rgba(255,210,74,.22)'; ctx.fillRect(kx + 18, ky - yari, yx - kx - 18, 2 * yari); ctx.restore();
  for (let k = -3; k <= 3; k++) D.isin(ctx, kx + 18, ky + k * yari / 3.2, yx - 6, ky + k * yari / 3.2, 'rgba(255,196,60,.85)', 1.6, false);
  ctx.save(); ctx.translate(yx, ky); ctx.rotate(alfa);
  ctx.fillStyle = '#C9A06A'; ctx.fillRect(-5, -Math.max(yuzeyBoy / 2 + 10, 40), 10, 2 * Math.max(yuzeyBoy / 2 + 10, 40));
  ctx.globalAlpha = Math.min(0.95, 0.1 + 0.85 * Math.cos(alfa));
  ctx.fillStyle = '#FFF3B0'; ctx.fillRect(-5, -yuzeyBoy / 2, 10, yuzeyBoy);
  ctx.restore();
  D.normalDogrultu(ctx, yx, ky, 48, alfa);
  if (p.alfa > 1) D.aciYayi(ctx, yx, ky, 34, Math.PI, Math.PI + alfa, R.ivme, D.biçim(p.alfa) + '°');
  D.olcu(ctx, kx + 18, ky + 96, yx, ky + 96, 'd = ' + D.biçim(p.d) + ' cm', R.mur);
  D.yaziAydinlik(ctx, 'E = ' + D.biçim(aydinlanma(p)) + ' lx', w - 10, 28, R.normal, '700 14px system-ui, sans-serif', 'right');
  D.yaziAydinlik(ctx, 'demet yayılmıyor ⟹ uzaklık değişince E DEĞİŞMEZ · yalnızca açıyla (cosα) azalır',
                 10, h - 12, R.mur, '600 11px system-ui, sans-serif', 'left');
}

function cizOda(ctx, w, h, st, p) {
  /* oda kesiti */
  const ox = w * 0.10, oy = h * 0.25, ow = w * 0.80, oh = h * 0.52;   // üstteki üç satır yazıya yer
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
  D.yaziAydinlik(ctx, 'ampul başına ' + D.biçim(p.ampulLm) + ' lm · ' + VERIM[p.tur || 1].ad + ' ≈ ' + D.biçim(ampulGucu(p), 0) + ' W', w - 10, 44, R.ivme,
                 '700 12px system-ui, sans-serif', 'right');
  D.yaziAydinlik(ctx, 'toplam güç: ' + D.biçim(Math.ceil(ampulSayisi(p)) * ampulGucu(p), 0) + ' W', w - 10, 62, R.kuvvet,
                 '700 12px system-ui, sans-serif', 'right');
}

/* ----------------------------------------- Klasik fizik görünümü */

function cizKlasik(ctx, w, h, st, pHam) {
  const p = etkin(st, pHam);
  D.izgara(ctx, w, h, 26);

  if (p.mod > 1.5 && p.mod < 2.5) {
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
       R.ivme, '700 13px system-ui, sans-serif'],
      ['', K.metin2, '11px'],
      ['LED: ' + D.biçim(Math.ceil(ampulSayisi(p)) * p.ampulLm / VERIM[1].lmW, 0) + ' W · akkor: ' +
       D.biçim(Math.ceil(ampulSayisi(p)) * p.ampulLm / VERIM[2].lmW, 0) + ' W', R.hiz, '700 12px system-ui, sans-serif'],
      ['(aynı ışık, LED ≈ 1/5 güç)', K.metin2, '11px system-ui, sans-serif']
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

  if (paralelMi(p)) {
    D.yaziHaleli(ctx, 'Paralel ışık', 12, 22, K.beyaz, '700 12px system-ui, sans-serif', 'left');
    const satir = [
      ['Demet yayılmaz: aynı akı aynı kesite düşer', K.metin2, '11px system-ui, sans-serif'],
      ['⟹ E uzaklıktan BAĞIMSIZ', R.hiz, '700 12px system-ui, sans-serif'],
      ['E = E₀ · cosα', K.beyaz, '700 13px system-ui, sans-serif'],
      ['E₀ = ' + D.biçim(p.I) + ' lx · cos' + D.biçim(p.alfa) + '° = ' + D.biçim(Math.cos(aciRad(p)), 3), K.metin2, '11px system-ui, sans-serif'],
      ['E = ' + D.biçim(aydinlanma(p)) + ' lx', R.normal, '700 14px system-ui, sans-serif'],
      ['', K.metin2, '11px'],
      ['Yüzey ışınlara paralel (α = 90°) ⟹ E = 0', K.metin2, '11px system-ui, sans-serif'],
      ['Nokta kaynakta ise E ∝ 1/d² azalır', K.metin2, '11px system-ui, sans-serif']
    ];
    let sy = 46;
    satir.forEach(([t, c, f]) => { if (t) D.yaziHaleli(ctx, t, 16, sy, c, f, 'left'); sy += 18; });
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

  if (p.mod > 1.5 && p.mod < 2.5) {
    /* Oda: gereken ampul sayısı ve toplam güç − hedef aydınlanma */
    const v1 = [], v2 = [];
    for (let E = 50; E <= 800; E += 10) {
      const n = Math.ceil(E * p.odaA / p.ampulLm);
      v1.push({ t: E, v: n });
      v2.push({ t: E, v: n * ampulGucu(p) });
    }
    const n0 = Math.ceil(ampulSayisi(p));
    D.miniGrafik(ctx, { x: pay, y: 3, w: gw, h: gh, baslik: 'Ampul sayısı − hedef E   (basamaklı: yukarı yuvarlanır)', birim: 'adet', tEtiket: 'E (lx)',
      imlec: { t: p.Eist, v: n0 }, veri: v1, tMin: 50, tMax: 800, vMin: 0, vMax: Math.max(2, v1[v1.length - 1].v * 1.05), renk: R.ivme });
    D.miniGrafik(ctx, { x: pay * 2 + gw, y: 3, w: gw, h: gh, baslik: 'Toplam güç − hedef E   (' + VERIM[p.tur || 1].ad + ')', birim: 'W', tEtiket: 'E (lx)',
      imlec: { t: p.Eist, v: n0 * ampulGucu(p) }, veri: v2, tMin: 50, tMax: 800, vMin: 0, vMax: Math.max(10, v2[v2.length - 1].v * 1.05), renk: R.kuvvet });
    return;
  }

  const v1 = [];
  for (let dd = 20; dd <= 400; dd += 5)
    v1.push({ t: dd, v: paralelMi(p) ? aydinlanma(p) : (p.I * Math.cos(aciRad(p))) / Math.pow(dd / 100, 2) });
  D.miniGrafik(ctx, {
    x: pay, y: 3, w: gw, h: gh,
    baslik: paralelMi(p) ? 'E − d   (paralel demet: SABİT)' : 'E − d   (ters KARE: d 2 katına → E dörtte bire)', birim: 'lx', tEtiket: 'd (cm)',
    imlec: { t: p.d, v: aydinlanma(p) },
    veri: v1, tMin: 20, tMax: 400, vMin: 0,
    vMax: paralelMi(p) ? Math.max(1, p.I * 1.2) : Math.max(1e-3, (p.I * Math.cos(aciRad(p))) / Math.pow(0.2, 2) * 1.05),
    renk: R.normal
  });

  const v2 = [];
  for (let a = 0; a <= 90; a += 2)
    v2.push({ t: a, v: paralelMi(p) ? p.I * Math.cos(a * Math.PI / 180) : (p.I * Math.cos(a * Math.PI / 180)) / Math.pow(p.d / 100, 2) });
  D.miniGrafik(ctx, {
    x: pay * 2 + gw, y: 3, w: gw, h: gh,
    baslik: 'E − α   (kosinüs · 90°’de sıfır)', birim: 'lx', tEtiket: 'α (°)',
    imlec: { t: p.alfa, v: aydinlanma(p) },
    veri: v2, tMax: 90, vMin: 0,
    vMax: Math.max(0.01, (paralelMi(p) ? p.I : p.I / Math.pow(p.d / 100, 2)) * 1.05),
    renk: R.ivme
  });
}

/* ----------------------------------------------------------- Okumalar */

function okumalar(st, pHam) {
  const p = etkin(st, pHam);
  if (p.mod > 1.5 && p.mod < 2.5) {
    return [
      { et: 'Oda alanı',      dg: D.biçim(p.odaA),                birim: 'm²' },
      { et: 'Hedef  E',       dg: D.biçim(p.Eist),                birim: 'lx' },
      { et: 'Gereken akı  Φ', dg: D.biçim(gerekenAki(p)),         birim: 'lm' },
      { et: 'Ampul akısı',    dg: D.biçim(p.ampulLm),             birim: 'lm' },
      { et: 'Hesap',          dg: D.biçim(ampulSayisi(p), 2),     birim: 'adet' },
      { et: 'Gereken',        dg: String(Math.ceil(ampulSayisi(p))), birim: 'adet' },
      { et: 'Toplam güç',     dg: D.biçim(Math.ceil(ampulSayisi(p)) * ampulGucu(p), 0), birim: 'W' }
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
      { d: 2, e: 'Oda aydınlatma tasarımı' },
      { d: 3, e: 'Paralel ışık (el feneri) + yüzey' }
    ]},
    { anahtar: 'I',       etiket: 'Işık şiddeti I (1 ve 3)', min: 10, max: 400, adim: 10, deger: 100, birim: 'cd' },
    { anahtar: 'd',       etiket: 'Uzaklık d (1 ve 3)', min: 20, max: 400, adim: 10, deger: 100, birim: 'cm' },
    { anahtar: 'alfa',    etiket: 'Normal ile ışın arası açı α (1 ve 3)', min: 0, max: 85, adim: 5, deger: 0, birim: '°' },
    { anahtar: 'odaA',    etiket: 'Oda alanı (2)', min: 5, max: 100, adim: 5, deger: 25, birim: 'm²' },
    { anahtar: 'Eist',    etiket: 'İstenen aydınlanma (2)', min: 50, max: 800, adim: 50, deger: 300, birim: 'lx' },
    { anahtar: 'ampulLm', etiket: 'Ampul akısı (2)', min: 400, max: 3000, adim: 100, deger: 1100, birim: 'lm' },
    { anahtar: 'tur',     etiket: 'Ampul türü (2)', tur: 'secim', deger: 1, secenekler: [
      { d: 1, e: 'LED (≈ 65 lm/W)' },
      { d: 2, e: 'Akkor (≈ 15 lm/W)' }
    ]}
  ],
  durum, adim, bitti, cizGercek, cizKlasik, cizGrafik, okumalar
};

})();
