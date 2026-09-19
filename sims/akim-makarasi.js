(function () {
"use strict";
window.F11 = window.F11 || {};

/* ==========================================================================
   sims/akim-makarasi.js
   --------------------------------------------------------------------------
   Konu 2.2.3 · Akım makarasının (bobinin) manyetik alanı
                                                    (MEB 11, s.207-212)

   İKİ DURUM, İKİ FORMÜL
   ---------------------
   Tek halka / N sarımlı düz halka, MERKEZDE:
       B = μ₀ · N · i / (2r)
   Uzun solenoid (makara), İÇİNDE:
       B = μ₀ · n · i           n = N/L  (birim uzunluktaki sarım sayısı)

   ANAHTAR FİKİR
   -------------
   Bir halka, düz telin bükülmüş hâlidir. Bükünce ne değişir? Halkanın her
   parçasının merkezde ürettiği alan AYNI YÖNE bakar; hepsi toplanır. Bu
   yüzden aynı akımla, düz tele göre çok daha güçlü bir alan elde edilir.

   Çok sayıda halkayı yan yana dizince solenoid olur ve içeride alan DÜZGÜN
   hâle gelir — tıpkı paralel levhalar arasındaki elektrik alan gibi.
   Solenoidin dışarıdan görünüşü bir ÇUBUK MIKNATISIN aynısıdır.
   ========================================================================== */

const D = window.F11;
const { R, K } = D;

const MU0 = 4 * Math.PI * 1e-7;

/* ------------------------------------------------------------- Fizik */

/** N sarımlı düz halkanın MERKEZİNDEKİ alan (T). r metre. */
function alanHalka(N, i, r) {
  const rr = Math.max(r, 0.005);
  return (MU0 * N * Math.abs(i)) / (2 * rr);
}

/** Uzun solenoidin İÇİNDEKİ alan (T). L metre. */
function alanSolenoid(N, i, L) {
  const LL = Math.max(L, 0.01);
  return MU0 * (N / LL) * Math.abs(i);
}

/** Karşılaştırma için: aynı akımın düz telde r uzaklıkta ürettiği alan. */
function alanDuzTel(i, r) {
  const rr = Math.max(r, 0.005);
  return (MU0 * Math.abs(i)) / (2 * Math.PI * rr);
}

function sarimYogunlugu(p) { return p.N / (p.L / 100); }

/* -------------------------------------------------------------- Durum */

/* Oynat'a basılınca akım taranır; B'nin akımla DOĞRU orantılı büyüdüğü
   canlı görünür. Telde ayrıca akım akışı canlandırılır. */
const TARAMA_PERIYOT = 10;      // s

function durum(p) { return { t: 0, i: p.i }; }

function adim(st, dt, p) {
  st.t += dt;
  st.i = D.tarama(st.t, p.i, p.i < 10 ? 20 : 1, TARAMA_PERIYOT);
}

function bitti() { return false; }

function etkin(st, p) {
  return Object.assign({}, p, { i: (st && st.i != null) ? st.i : p.i });
}

/* --------------------------------------------- Gerçekçi görünüm */

function cizGercek(ctx, w, h, st, pHam) {
  const p = etkin(st, pHam);
  if (p.mod < 1.5) cizHalka(ctx, w, h, st, p);
  else             cizSolenoid(ctx, w, h, st, p);
}

function cizHalka(ctx, w, h, st, p) {
  const cx = w * 0.42, cy = h * 0.52;
  const rpx = Math.min(w, h) * 0.24;
  const disari = p.i > 0;

  /* Halka, sayfa düzlemine DİK duruyor gibi çizilir: kesitte iki tel ucu. */
  ctx.save();
  ctx.strokeStyle = '#B87333'; ctx.lineWidth = 7;
  ctx.beginPath(); ctx.ellipse(cx, cy, rpx, rpx * 0.30, 0, 0, 6.2832); ctx.stroke();
  ctx.restore();

  /* akım yönü okları — halkanın üstünde ve altında */
  const yon = disari ? 1 : -1;
  [[cx - rpx * 0.5, cy - rpx * 0.30], [cx + rpx * 0.5, cy + rpx * 0.30]].forEach(([x, y], k) => {
    const s = k === 0 ? 1 : -1;
    D.vektor(ctx, x - 16 * s * yon, y, x + 16 * s * yon, y, R.ivme, '', { kalinlik: 2.6 });
  });
  D.yaziAydinlik(ctx, 'i = ' + D.biçim(Math.abs(p.i)) + ' A · N = ' + D.biçim(p.N),
                 cx, cy - rpx * 0.30 - 26, R.mur, '700 12px system-ui, sans-serif', 'center');

  /* Eksen boyunca alan — halkadan geçer, dışarıda döner */
  ctx.save();
  ctx.strokeStyle = 'rgba(56,150,200,.8)'; ctx.lineWidth = 1.6;
  [0, 0.45, 0.8].forEach(k => {
    const yy = cy - rpx * 0.30 * k * 0.7;
    ctx.beginPath();
    ctx.moveTo(cx - rpx * 1.7, yy);
    ctx.bezierCurveTo(cx - rpx * 0.6, yy - rpx * 0.5 * k,
                      cx + rpx * 0.6, yy - rpx * 0.5 * k,
                      cx + rpx * 1.7, yy);
    ctx.stroke();
  });
  ctx.restore();

  /* merkezdeki alan vektörü — halkanın eksenine paralel */
  const B = alanHalka(p.N, p.i, p.r / 100);
  D.vektor(ctx, cx - 30 * yon, cy, cx + 46 * yon, cy, R.normal, 'B', { kalinlik: 3 });
  D.noktaCisim(ctx, cx, cy, 4, R.ivme);

  D.olcu(ctx, cx, cy + rpx * 0.30 + 34, cx + rpx, cy + rpx * 0.30 + 34,
         'r = ' + D.biçim(p.r) + ' cm', R.mur);

  D.yaziAydinlik(ctx, 'B(merkez) = ' + D.biçim(B * 1e6) + ' μT', w - 10, 18, R.normal,
                 '700 12px system-ui, sans-serif', 'right');
  D.yaziAydinlik(ctx, 'halkanın her parçası merkezde AYNI yöne katkı verir',
                 10, h - 12, R.mur, '600 11px system-ui, sans-serif', 'left');
}

function cizSolenoid(ctx, w, h, st, p) {
  const solX = w * 0.18, uzun = w * 0.58;
  const yariCap = Math.min(h * 0.20, 62);
  const cy = h * 0.50;
  const ustY = cy - yariCap, altY = cy + yariCap;
  const disari = p.i > 0;

  /* solenoid sarımları */
  const sarimAdet = Math.max(5, Math.min(18, Math.round(p.N / 12)));
  ctx.save();
  ctx.strokeStyle = '#B87333'; ctx.lineWidth = 5;
  for (let k = 0; k < sarimAdet; k++) {
    const x = solX + (k + 0.5) * (uzun / sarimAdet);
    ctx.beginPath();
    ctx.ellipse(x, cy, 7, yariCap, 0, 0, 6.2832);
    ctx.stroke();
  }
  ctx.restore();

  /* içeride DÜZGÜN alan — eşit aralıklı paralel çizgiler */
  ctx.save();
  ctx.strokeStyle = 'rgba(56,150,200,.9)'; ctx.lineWidth = 1.6;
  const adet = 5;
  for (let k = 0; k < adet; k++) {
    const y = ustY + 14 + (k / (adet - 1)) * (2 * yariCap - 28);
    ctx.beginPath();
    ctx.moveTo(solX + 6, y); ctx.lineTo(solX + uzun - 6, y);
    ctx.stroke();
    const mx = solX + uzun * 0.5;
    ctx.save(); ctx.fillStyle = 'rgba(56,150,200,.95)';
    ctx.beginPath();
    const s = disari ? 1 : -1;
    ctx.moveTo(mx + 7 * s, y);
    ctx.lineTo(mx - 3 * s, y - 4.5); ctx.lineTo(mx - 3 * s, y + 4.5);
    ctx.closePath(); ctx.fill(); ctx.restore();
  }
  ctx.restore();

  /* dışarıda dönen çizgiler — çubuk mıknatıs görüntüsü */
  ctx.save();
  ctx.strokeStyle = 'rgba(56,150,200,.45)'; ctx.lineWidth = 1.3;
  [1.5, 2.1].forEach(k => {
    ctx.beginPath();
    ctx.moveTo(solX + uzun - 6, cy);
    ctx.bezierCurveTo(solX + uzun + yariCap * k, cy - yariCap * k,
                      solX - yariCap * k, cy - yariCap * k,
                      solX + 6, cy);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(solX + uzun - 6, cy);
    ctx.bezierCurveTo(solX + uzun + yariCap * k, cy + yariCap * k,
                      solX - yariCap * k, cy + yariCap * k,
                      solX + 6, cy);
    ctx.stroke();
  });
  ctx.restore();

  /* kutup etiketleri — solenoid bir çubuk mıknatıs gibi davranır */
  const solKutup = disari ? 'S' : 'N';
  const sagKutup = disari ? 'N' : 'S';
  D.rozet(ctx, solKutup, solX - 22, cy, solKutup === 'N' ? '#E2483F' : '#2F6FD0',
          '#FFFFFF', '700 15px system-ui, sans-serif', true);
  D.rozet(ctx, sagKutup, solX + uzun + 22, cy, sagKutup === 'N' ? '#E2483F' : '#2F6FD0',
          '#FFFFFF', '700 15px system-ui, sans-serif', true);

  const B = alanSolenoid(p.N, p.i, p.L / 100);
  D.yaziAydinlik(ctx, 'B(iç) = ' + D.biçim(B * 1e6) + ' μT', w - 10, 18, R.normal,
                 '700 12px system-ui, sans-serif', 'right');
  D.yaziAydinlik(ctx, 'N = ' + D.biçim(p.N) + ' sarım · i = ' + D.biçim(Math.abs(p.i)) + ' A',
                 solX, ustY - 18, R.mur, '700 12px system-ui, sans-serif', 'left');
  D.olcu(ctx, solX, altY + 30, solX + uzun, altY + 30, 'L = ' + D.biçim(p.L) + ' cm', R.mur);
  D.yaziAydinlik(ctx, 'içeride alan DÜZGÜN · dışarıda çubuk mıknatıs gibi',
                 10, h - 12, R.mur, '600 11px system-ui, sans-serif', 'left');
}

/* ----------------------------------------- Klasik fizik görünümü */

function cizKlasik(ctx, w, h, st, pHam) {
  const p = etkin(st, pHam);
  D.izgara(ctx, w, h, 26);

  const r = p.r / 100, L = p.L / 100;
  const halka = p.mod < 1.5;
  const B = halka ? alanHalka(p.N, p.i, r) : alanSolenoid(p.N, p.i, L);
  const Btel = alanDuzTel(p.i, halka ? r : 0.05);

  /* --- sol: şematik --- */
  D.yaziHaleli(ctx, halka ? 'Düz halka · merkez' : 'Solenoid · iç bölge', 12, 22,
               K.beyaz, '700 12px system-ui, sans-serif', 'left');

  const cx = w * 0.22, cy = h * 0.46;
  if (halka) {
    ctx.save(); ctx.strokeStyle = K.eksen; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(cx, cy, 44, 0, 6.2832); ctx.stroke(); ctx.restore();
    D.alanDisari(ctx, cx, cy, 11, R.normal);
    D.yaziHaleli(ctx, 'B ⊙', cx, cy + 62, R.normal, '700 12px system-ui, sans-serif', 'center');
    D.yaziHaleli(ctx, 'akım yönü: ' + (p.i > 0 ? 'saat tersi' : 'saat yönü'),
                 cx, cy + 80, K.metin2, '11px system-ui, sans-serif', 'center');
  } else {
    ctx.save(); ctx.strokeStyle = K.eksen; ctx.lineWidth = 2;
    ctx.strokeRect(cx - 54, cy - 30, 108, 60); ctx.restore();
    D.alanBolgesi(ctx, cx - 50, cy - 26, 100, 52, p.i > 0 ? 1 : -1, R.normal, 26);
    D.yaziHaleli(ctx, 'düzgün alan', cx, cy + 50, R.normal,
                 '700 12px system-ui, sans-serif', 'center');
  }

  /* --- sağ: hesap --- */
  const bx = w * 0.46;
  const satir = halka ? [
    ['B = μ₀·N·i / (2r)', K.beyaz, '700 12px system-ui, sans-serif'],
    ['N = ' + D.biçim(p.N) + '  ·  i = ' + D.biçim(Math.abs(p.i)) + ' A  ·  r = ' + D.biçim(r, 3) + ' m', K.metin2, '11px system-ui, sans-serif'],
    ['B = ' + D.biçim(B * 1e6) + ' μT', R.normal, '700 13px system-ui, sans-serif'],
    ['', K.metin2, '11px'],
    ['Aynı akım, DÜZ telde (r kadar uzakta):', K.metin2, '11px system-ui, sans-serif'],
    ['B_tel = ' + D.biçim(Btel * 1e6) + ' μT', R.kuvvet, '12px system-ui, sans-serif'],
    ['Halka ' + D.biçim(B / Btel, 1) + ' kat güçlü', R.ivme, '700 12px system-ui, sans-serif']
  ] : [
    ['B = μ₀ · n · i', K.beyaz, '700 12px system-ui, sans-serif'],
    ['n = N/L = ' + D.biçim(p.N) + '/' + D.biçim(L, 3) + ' = ' + D.biçim(sarimYogunlugu(p)) + ' sarım/m', K.metin2, '11px system-ui, sans-serif'],
    ['B = 4π·10⁻⁷ · ' + D.biçim(sarimYogunlugu(p)) + ' · ' + D.biçim(Math.abs(p.i)), K.metin2, '11px system-ui, sans-serif'],
    ['B = ' + D.biçim(B * 1e6) + ' μT', R.normal, '700 13px system-ui, sans-serif'],
    ['', K.metin2, '11px'],
    ['YARIÇAP formülde YOK', R.kuvvet, '700 12px system-ui, sans-serif'],
    ['İçeride her nokta aynı B’yi görür', K.metin2, '11px system-ui, sans-serif']
  ];
  let sy = 46;
  satir.forEach(([t, c, f]) => {
    if (t) D.yaziHaleli(ctx, t, bx, sy, c, f, 'left');
    sy += 17;
  });

  D.yaziHaleli(ctx, halka ? 'Sağ el: parmaklar AKIM yönünde sarılır, başparmak B’yi gösterir'
                          : 'Solenoid dışarıdan bakılınca çubuk mıknatıstır',
               12, h - 16, R.ivme, '600 11px system-ui, sans-serif', 'left');
}

/* ------------------------------------------------------- Grafikler */

function cizGrafik(ctx, w, h, st, pHam) {
  const p = etkin(st, pHam);
  const pay = 8, gw = (w - pay * 3) / 2, gh = h - 6;
  const halka = p.mod < 1.5;

  /* B − N : doğru orantı (her iki durumda da) */
  const v1 = [];
  for (let n = 0; n <= 400; n += 10)
    v1.push({ t: n, v: (halka ? alanHalka(n, p.i, p.r / 100) : alanSolenoid(n, p.i, p.L / 100)) * 1e6 });
  D.miniGrafik(ctx, {
    x: pay, y: 3, w: gw, h: gh,
    baslik: 'B − N   (sarım sayısıyla DOĞRU orantı)', birim: 'μT', tEtiket: 'N (sarım)',
    imlec: { t: p.N, v: (halka ? alanHalka(p.N, p.i, p.r / 100) : alanSolenoid(p.N, p.i, p.L / 100)) * 1e6 },
    veri: v1, tMax: 400, vMin: 0,
    vMax: Math.max(1e-3, v1[v1.length - 1].v * 1.05),
    renk: R.normal
  });

  /* ikinci grafik moda göre */
  if (halka) {
    const v2 = [];
    for (let rr = 1; rr <= 30; rr += 0.5)
      v2.push({ t: rr, v: alanHalka(p.N, p.i, rr / 100) * 1e6 });
    D.miniGrafik(ctx, {
      x: pay * 2 + gw, y: 3, w: gw, h: gh,
      baslik: 'B − r   (yarıçapla TERS orantı)', birim: 'μT', tEtiket: 'r (cm)',
      veri: v2, tMax: 30, vMin: 0, vMax: alanHalka(p.N, p.i, 0.01) * 1e6,
      renk: R.ivme
    });
  } else {
    const v2 = [];
    for (let LL = 5; LL <= 100; LL += 2)
      v2.push({ t: LL, v: alanSolenoid(p.N, p.i, LL / 100) * 1e6 });
    D.miniGrafik(ctx, {
      x: pay * 2 + gw, y: 3, w: gw, h: gh,
      baslik: 'B − L   (aynı sarımı UZATIRSAN alan düşer)', birim: 'μT', tEtiket: 'L (cm)',
      veri: v2, tMax: 100, vMin: 0, vMax: alanSolenoid(p.N, p.i, 0.05) * 1e6,
      renk: R.ivme
    });
  }
}

/* ----------------------------------------------------------- Okumalar */

function okumalar(st, pHam) {
  const p = etkin(st, pHam);
  const r = p.r / 100, L = p.L / 100;
  if (p.mod < 1.5) {
    const B = alanHalka(p.N, p.i, r);
    return [
      { et: 'Sarım  N',    dg: D.biçim(p.N),              birim: '' },
      { et: 'Akım  i',     dg: D.biçim(Math.abs(p.i)),    birim: 'A' },
      { et: 'Yarıçap  r',  dg: D.biçim(p.r),              birim: 'cm' },
      { et: 'B (merkez)',  dg: D.biçim(B * 1e6),          birim: 'μT' },
      { et: 'Düz tele göre', dg: D.biçim(B / alanDuzTel(p.i, r), 1), birim: 'kat' }
    ];
  }
  const B = alanSolenoid(p.N, p.i, L);
  return [
    { et: 'Sarım  N',     dg: D.biçim(p.N),                 birim: '' },
    { et: 'Uzunluk  L',   dg: D.biçim(p.L),                 birim: 'cm' },
    { et: 'n = N/L',      dg: D.biçim(sarimYogunlugu(p)),   birim: 'sarım/m' },
    { et: 'Akım  i',      dg: D.biçim(Math.abs(p.i)),       birim: 'A' },
    { et: 'B (iç)',       dg: D.biçim(B * 1e6),             birim: 'μT' },
    { et: 'Kutuplar',     dg: p.i > 0 ? 'S — N' : 'N — S',  birim: '' }
  ];
}

/* ------------------------------------------------------------- Tanım */

D.simler = D.simler || {};
D.simler['akim-makarasi'] = {
  id: 'akim-makarasi',
  baslik: '2.2.3 · Akım makarası · halka ve solenoid',
  yukseklik: 340,
  grafikPanel: true,
  grafikYukseklik: 170,
  parametreler: [
    { anahtar: 'mod', etiket: 'Düzenek', tur: 'secim', deger: 1, secenekler: [
      { d: 1, e: 'Düz halka (merkezdeki alan)' },
      { d: 2, e: 'Solenoid (içindeki alan)' }
    ]},
    { anahtar: 'N', etiket: 'Sarım sayısı N', min: 1,  max: 400, adim: 1,  deger: 100, birim: '' },
    { anahtar: 'i', etiket: 'Akım i', min: -10, max: 10, adim: 1, deger: 2, birim: 'A' },
    { anahtar: 'r', etiket: 'Halka yarıçapı r', min: 1, max: 30, adim: 1, deger: 10, birim: 'cm' },
    { anahtar: 'L', etiket: 'Solenoid uzunluğu L', min: 5, max: 100, adim: 5, deger: 40, birim: 'cm' }
  ],
  durum, adim, bitti, cizGercek, cizKlasik, cizGrafik, okumalar
};

})();
