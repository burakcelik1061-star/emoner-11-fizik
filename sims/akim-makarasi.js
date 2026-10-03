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
   Uzun solenoid (makara), İÇİNDE (L ≫ r iken):
       B = μ₀ · n · i           n = N/L  (birim uzunluktaki sarım sayısı)
   Sonlu solenoidin merkezinde gerçek değer biraz küçüktür:
       B = μ₀ · n · i · L / √(L² + 4r²)
   ve uçlarda yaklaşık YARIYA iner (HyperPhysics: formül uzun solenoid
   idealleştirmesidir).

   ALAN ÇİZGİLERİ TAM ÇÖZÜMDEN
   ---------------------------
   Çizgiler iki sonsuz tel yaklaşımıyla DEĞİL, dairesel halkanın gerçek
   alanıyla (tam eliptik integraller, AGM yöntemi) izlenir. Solenoid, eşit
   aralıklı halkaların toplamıdır. Böylece içeride düzgün alan, uçlarda
   saçılma ve dışarıda çubuk mıknatıs görüntüsü kendiliğinden çıkar.

   KİTAPTAKİ ÖRNEK (MEB s.211, 3. düzenek)
   ---------------------------------------
   Demir çivilere sarılmış dört makara; dirençler eşit, akımı pil sayısı
   belirler. Kitaptaki model B = 4·K·π·i·N/L (K = 10⁻⁷) = μ₀·n·i olduğundan
   B ∝ i·N/L: 1. düzenek i·N/2L, ötekiler 2i·N/2L = i·N/L = i·2N/2L.
   Değerler hava çekirdekli makara içindir; demir çivi alanı hepsinde büyütür.
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

/** Uzun (ideal) solenoidin İÇİNDEKİ alan (T). L metre. */
function alanSolenoid(N, i, L) {
  const LL = Math.max(L, 0.01);
  return MU0 * (N / LL) * Math.abs(i);
}

/** Sonlu solenoidin ekseni üzerinde, merkezden x uzaklıkta alan (T). */
function solenoidEksen(N, i, L, r, x) {
  const n = N / Math.max(L, 0.01);
  const a = x + L / 2, b = x - L / 2;
  return MU0 * n * Math.abs(i) / 2 * (a / Math.hypot(a, r) - b / Math.hypot(b, r));
}

/** Karşılaştırma için: aynı akımın düz telde r uzaklıkta ürettiği alan. */
function alanDuzTel(i, r) {
  const rr = Math.max(r, 0.005);
  return (MU0 * Math.abs(i)) / (2 * Math.PI * rr);
}

function sarimYogunlugu(p) { return p.N / (p.L / 100); }

/** Tam eliptik integraller K(m), E(m) — AGM yöntemi (m = k²). */
function elipsKE(m) {
  let a = 1, b = Math.sqrt(Math.max(0, 1 - m)), top = 0.5 * m, us = 0.5;
  for (let k = 0; k < 14; k++) {
    const c = (a - b) / 2, an = (a + b) / 2;
    b = Math.sqrt(a * b); a = an;
    us *= 2; top += us * c * c;
    if (c < 1e-13) break;
  }
  const Kk = Math.PI / (2 * a);
  return { K: Kk, E: Kk * (1 - top) };
}

/** Yarıçapı a olan halkanın (x eksen boyunca, ρ eksene uzaklık) noktasındaki
    alanı; μ₀I/2π çarpanı dışarıda. Merkezde bx = π/a ⟹ B = μ₀I/(2a). */
function halkaAlani(a, x, rho) {
  const r = Math.max(rho, 1e-6);
  const s1 = (a + r) * (a + r) + x * x, s2 = Math.max(1e-9, (a - r) * (a - r) + x * x);
  const m = Math.min(1 - 1e-12, 4 * a * r / s1);
  const { K: Kk, E } = elipsKE(m);
  const q = 1 / Math.sqrt(s1);
  return {
    bx: q * (Kk + (a * a - r * r - x * x) / s2 * E),
    br: (x / r) * q * (-Kk + (a * a + r * r + x * x) / s2 * E)
  };
}

/* -------------------------------------------------------------- Durum */

/* Oynat'a basılınca akım taranır (güç kaynağının düğmesi çevrilir); B'nin
   akımla DOĞRU orantılı büyüdüğü canlı görünür. */
const TARAMA_PERIYOT = 10;      // s

function durum(p) { return { t: 0, i: p.i }; }

function adim(st, dt, p) {
  st.t += dt;
  if (p.mod > 2.5) return;
  /* Akımın YÖNÜ korunur, yalnız büyüklüğü taranır (en çok 10 A). Akım
     sıfır seçildiyse sıfır kalır: akım yoksa alan da yoktur. */
  const s = p.i < 0 ? -1 : 1;
  const hedef = p.i === 0 ? 0 : s * (Math.abs(p.i) < 5 ? 10 : 1);
  st.i = D.tarama(st.t, p.i, hedef, TARAMA_PERIYOT);
}

function bitti() { return false; }

/** Taramada ulaşılan en büyük |i|. Grafik eksenleri buna göre SABİT tutulur;
    böylece akım değiştikçe eğri ve imleç gerçekten yükselip alçalır. */
function iMaks(p) {
  const a = Math.abs(p.i);
  return a === 0 ? 0 : Math.max(a, a < 5 ? 10 : 1);
}

/* ---- 3. düzenek: kitaptaki dört elektromıknatıs ---- */
const KO_N = 50, KO_L = 0.03, KO_I = 1, KO_R = 0.0025;   // sarım, m, A, m (çivi yarıçapı)
const KO_SURE = 2.5;                                      // her düzenek bu kadar vurgulanır
const KO_DUZ = [
  { pil: 1, L: 2, N: 1 },     // 1. düzenek: i, 2L, N
  { pil: 2, L: 2, N: 1 },     // 2. düzenek: 2i, 2L, N
  { pil: 1, L: 1, N: 1 },     // 3. düzenek: i, L, N
  { pil: 1, L: 2, N: 2 }      // 4. düzenek: i, 2L, 2N
];
function koDeger(k) {
  const d = KO_DUZ[k], i = KO_I * d.pil, N = KO_N * d.N, L = KO_L * d.L;
  return { i, N, L, n: N / L, B: alanSolenoid(N, i, L) };
}
function koSecili(st) { return Math.floor((st ? st.t : 0) / KO_SURE) % 4; }

function etkin(st, p) {
  return Object.assign({}, p, { i: (st && st.i != null) ? st.i : p.i });
}

/** Ok boyu için akımın göreli büyüklüğü (0–1). */
function akimOrani(p) { return Math.min(1, Math.abs(p.i) / 10); }

/** Çizgi sayısı N·i ile artar (sıklık = şiddet). Çift sayı: eksene simetrik. */
function cizgiSayisi(p) {
  const NI = p.N * Math.abs(p.i);
  if (NI === 0) return 0;
  return 2 * Math.max(1, Math.min(5, Math.round(1 + 4 * Math.sqrt(NI / 4000))));
}

function isaretSembolu(ctx, x, y, isaret, r, renk) {
  if (isaret > 0) D.alanDisari(ctx, x, y, r, renk);
  else if (isaret < 0) D.alanIceri(ctx, x, y, r, renk);
}

/* ------------------------------------------- Alan çizgileri (önbellekli) */

/** halkalar: [{x, a}] ekran konumu ve yarıçapı (px); eksen y = cy.
    Çizgiler orta düzlemdeki tohumlardan her iki yöne izlenir (RK2). Geometri
    ve çizgi sayısı değişmedikçe yeniden hesaplanmaz — sınıf bilgisayarı yorulmasın. */
const onbellek = new Map();
function cizgileriHesapla(anahtar, halkalar, cy, tohumX, tohumlar, w, h) {
  if (onbellek.has(anahtar)) return onbellek.get(anahtar);
  const alan = (x, y) => {
    let bx = 0, by = 0;
    const rho = Math.abs(y - cy), sg = y >= cy ? 1 : -1;
    for (const k of halkalar) {
      const b = halkaAlani(k.a, x - k.x, rho);
      bx += b.bx; by += b.br * sg;
    }
    return [bx, by];
  };
  const yakinTel = (x, y) => halkalar.some(k => Math.abs(x - k.x) < 4 && Math.abs(Math.abs(y - cy) - k.a) < 4);
  const izle = (sx, sy, yon) => {
    let x = sx, y = sy;
    const yol = [[x, y]];
    for (let s = 0; s < 1500; s++) {
      const [b1x, b1y] = alan(x, y), b1 = Math.hypot(b1x, b1y);
      if (!(b1 > 1e-12)) break;
      const [b2x, b2y] = alan(x + yon * 1.5 * b1x / b1, y + yon * 1.5 * b1y / b1), b2 = Math.hypot(b2x, b2y);
      if (!(b2 > 1e-12)) break;
      x += yon * 3 * b2x / b2; y += yon * 3 * b2y / b2;
      yol.push([x, y]);
      if (s > 20 && Math.hypot(x - sx, y - sy) < 4) { yol.push([sx, sy]); return { yol, kapali: true }; }
      if (x < -60 || x > w + 60 || y < -60 || y > h + 60 || yakinTel(x, y)) break;
    }
    return { yol, kapali: false };
  };
  const cizgiler = tohumlar.map(sy => {
    const ileri = izle(tohumX, sy, 1);
    if (ileri.kapali) return ileri.yol;
    const geri = izle(tohumX, sy, -1);
    return geri.yol.slice(1).reverse().concat(ileri.yol);
  });
  if (onbellek.size > 12) onbellek.clear();
  onbellek.set(anahtar, cizgiler);
  return cizgiler;
}

/** Hesaplanan çizgileri akım yönüne göre çizer (s = −1 ise yönler ters). */
function cizgileriCiz(ctx, cizgiler, s, renk, okNoktalari) {
  ctx.save();
  ctx.strokeStyle = renk; ctx.fillStyle = renk; ctx.lineWidth = 1.5;
  for (const yol of cizgiler) {
    if (yol.length < 3) continue;
    ctx.beginPath();
    yol.forEach(([px, py], j) => j ? ctx.lineTo(px, py) : ctx.moveTo(px, py));
    ctx.stroke();
    for (const f of okNoktalari) {
      const k = Math.floor((yol.length - 2) * f);
      const [x1, y1] = yol[k], [x2, y2] = yol[k + 1];
      let ux = x2 - x1, uy = y2 - y1; const m = Math.hypot(ux, uy) || 1;
      ux = ux / m * s; uy = uy / m * s;
      const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
      ctx.beginPath();
      ctx.moveTo(mx + ux * 6, my + uy * 6);
      ctx.lineTo(mx - uy * 3.6 - ux * 2, my + ux * 3.6 - uy * 2);
      ctx.lineTo(mx + uy * 3.6 - ux * 2, my - ux * 3.6 - uy * 2);
      ctx.closePath(); ctx.fill();
    }
  }
  ctx.restore();
}

/* --------------------------------------------- Gerçekçi görünüm */

function cizGercek(ctx, w, h, st, pHam) {
  const p = etkin(st, pHam);
  if (p.mod < 1.5)      cizHalka(ctx, w, h, st, p);
  else if (p.mod < 2.5) cizSolenoid(ctx, w, h, st, p);
  else                  cizKitapOrnegi(ctx, w, h, st, p);
}

function cizHalka(ctx, w, h, st, p) {
  const cx = w * 0.42, cy = h * 0.50;
  const rpx = Math.min(w * 0.22, h * 0.30);
  const s = Math.sign(p.i);

  /* Halka sayfa düzlemine DİK durur, ekseni yatay. Çizgiler halkanın gerçek
     alanından: halkanın İÇİNDEN geçer, tel çevresinde dönerek dışarıdan döner. */
  const n = cizgiSayisi(p);
  if (s !== 0 && n > 0) {
    const tohum = [];
    for (let k = 0; k < n; k++) tohum.push(cy + (-0.9 + (k + 0.5) * 1.8 / n) * rpx);
    const cz = cizgileriHesapla(['h', w, h, n].join('|'), [{ x: cx, a: rpx }], cy, cx, tohum, w, h);
    cizgileriCiz(ctx, cz, s, 'rgba(56,150,200,.62)', [0.0, 0.5]);
  }

  ctx.save();
  ctx.lineCap = 'round';
  ctx.strokeStyle = '#8A5A2B'; ctx.lineWidth = 5;              // arka yarı
  ctx.beginPath(); ctx.ellipse(cx, cy, rpx * 0.26, rpx, 0, Math.PI / 2, Math.PI * 1.5); ctx.stroke();
  ctx.strokeStyle = '#B87333'; ctx.lineWidth = 7;              // ön yarı
  ctx.beginPath(); ctx.ellipse(cx, cy, rpx * 0.26, rpx, 0, -Math.PI / 2, Math.PI / 2); ctx.stroke();
  ctx.restore();

  /* Akım: üst uçta dışarı (⊙), ön yarıda AŞAĞI, alt uçta içeri (⊗). */
  isaretSembolu(ctx, cx, cy - rpx, s, 8, '#3A2A10');
  isaretSembolu(ctx, cx, cy + rpx, -s, 8, '#3A2A10');
  if (s !== 0) {
    const faz = D.akisFazi(st.t * (0.3 + akimOrani(p) * 0.9), 1);
    ctx.save(); ctx.fillStyle = '#FFD24A';
    for (let k = 0; k < 5; k++) {
      let u = (faz + k / 5) % 1;
      if (s < 0) u = 1 - u;
      const a = -Math.PI / 2 + u * Math.PI;
      ctx.beginPath();
      ctx.arc(cx + Math.cos(a) * rpx * 0.26, cy + Math.sin(a) * rpx, 3.2, 0, 6.2832);
      ctx.fill();
    }
    ctx.restore();
  }
  D.yaziAydinlik(ctx, 'i = ' + D.biçim(Math.abs(p.i), 2) + ' A · N = ' + D.biçim(p.N),
                 cx, cy - rpx - 22, R.mur, '700 12px system-ui, sans-serif', 'center');

  const B = alanHalka(p.N, p.i, p.r / 100);
  if (s !== 0) {
    const boy = 8 + 72 * akimOrani(p);                     // B ∝ i: ok boyu akımla orantılı
    D.vektor(ctx, cx, cy, cx + boy * s, cy, R.normal, 'B', { kalinlik: 3 });
  } else {
    D.yaziAydinlik(ctx, 'akım yok → B = 0', cx + 16, cy, R.mur, '600 11px system-ui, sans-serif', 'left');
  }
  D.noktaCisim(ctx, cx, cy, 4, R.ivme);

  D.olcu(ctx, cx - rpx * 0.26 - 26, cy, cx - rpx * 0.26 - 26, cy + rpx,
         'r = ' + D.biçim(p.r) + ' cm', R.mur);

  D.yaziAydinlik(ctx, 'B(merkez) = ' + D.biçim(B * 1e6) + ' μT', w - 10, 18, R.normal,
                 '700 12px system-ui, sans-serif', 'right');
  D.yaziAydinlik(ctx, 'halkanın her parçası merkezde AYNI yöne katkı verir',
                 10, h - 12, R.mur, '600 11px system-ui, sans-serif', 'left');
}

/** Solenoid çizim ölçeği (px/cm): L ve r gerçek oranda çizilir. */
function solenoidOlcek(w, h, p) { return Math.min((w * 0.60) / p.L, (h * 0.30) / p.r); }

function cizSolenoid(ctx, w, h, st, p) {
  const s = Math.sign(p.i);
  const olc = solenoidOlcek(w, h, p);
  const uzun = p.L * olc, yariCap = p.r * olc;
  const cx = w * 0.48, cy = h * 0.50;
  const solX = cx - uzun / 2;
  const ustY = cy - yariCap, altY = cy + yariCap;

  /* alan çizgileri: eşit aralıklı halkaların toplamı (tam çözüm) */
  const M = Math.max(12, Math.min(40, Math.round(uzun / 8)));
  const n = cizgiSayisi(p);
  if (s !== 0 && n > 0) {
    const halkalar = [];
    for (let k = 0; k < M; k++) halkalar.push({ x: solX + (k + 0.5) * uzun / M, a: yariCap });
    const tohum = [];
    for (let k = 0; k < n; k++) tohum.push(cy + (-0.85 + (k + 0.5) * 1.7 / n) * yariCap);
    const cz = cizgileriHesapla(['s', w, h, n, p.L, p.r].join('|'), halkalar, cy, cx, tohum, w, h);
    cizgileriCiz(ctx, cz, s, 'rgba(56,150,200,.7)', [0.25, 0.75]);
  }

  /* görünen sarımlar */
  const sarimAdet = Math.max(5, Math.min(24, Math.round(p.N / 12), Math.round(uzun / 10)));
  ctx.save();
  ctx.strokeStyle = '#B87333'; ctx.lineWidth = 4;
  for (let k = 0; k < sarimAdet; k++) {
    const x = solX + (k + 0.5) * (uzun / sarimAdet);
    ctx.beginPath(); ctx.ellipse(x, cy, Math.min(7, uzun / sarimAdet * 0.4), yariCap, 0, 0, 6.2832); ctx.stroke();
  }
  ctx.restore();
  if (s !== 0 && uzun / sarimAdet >= 12)
    for (let k = 0; k < sarimAdet; k++) {
      const x = solX + (k + 0.5) * (uzun / sarimAdet);
      isaretSembolu(ctx, x, ustY, s, 4.5, '#3A2A10');
      isaretSembolu(ctx, x, altY, -s, 4.5, '#3A2A10');
    }

  /* kutup etiketleri — çizgilerin ÇIKTIĞI uç N */
  if (s !== 0) {
    const solKutup = s > 0 ? 'S' : 'N', sagKutup = s > 0 ? 'N' : 'S';
    D.rozet(ctx, solKutup, solX - 26, cy - 12, solKutup === 'N' ? '#E2483F' : '#2F6FD0',
            '#FFFFFF', '700 15px system-ui, sans-serif', true);
    D.rozet(ctx, sagKutup, solX + uzun + 26, cy - 12, sagKutup === 'N' ? '#E2483F' : '#2F6FD0',
            '#FFFFFF', '700 15px system-ui, sans-serif', true);
  }

  const L = p.L / 100, r = p.r / 100;
  const Bid = alanSolenoid(p.N, p.i, L), Bm = solenoidEksen(p.N, p.i, L, r, 0);
  D.yaziAydinlik(ctx, 'B(merkez) = ' + D.biçim(Bm * 1e6) + ' μT  ·  formül μ₀ni = ' + D.biçim(Bid * 1e6) + ' μT',
                 w - 10, 18, R.normal, '700 12px system-ui, sans-serif', 'right');
  D.yaziAydinlik(ctx, 'N = ' + D.biçim(p.N) + ' sarım · i = ' + D.biçim(Math.abs(p.i), 2) + ' A',
                 solX, ustY - 18, R.mur, '700 12px system-ui, sans-serif', 'left');
  D.olcu(ctx, solX, Math.min(h - 34, altY + 26), solX + uzun, Math.min(h - 34, altY + 26),
         'L = ' + D.biçim(p.L) + ' cm · r = ' + D.biçim(p.r) + ' cm', R.mur);
  D.yaziAydinlik(ctx, 'içeride alan DÜZGÜN · uçlarda saçılır · dışarıda çubuk mıknatıs gibi',
                 10, h - 12, R.mur, '600 11px system-ui, sans-serif', 'left');
}

function cizKitapOrnegi(ctx, w, h, st, p) {
  const sec = koSecili(st), Bmaks = koDeger(1).B;
  const ust = 50, pw = (w - 30) / 2, ph = (h - ust - 14) / 2;
  /* Sol üst köşe panel başlığına ayrılmıştır; rozet sağa yaslanır. */
  ctx.save(); ctx.font = '700 11px system-ui, sans-serif';
  const rzG = ctx.measureText('MEB s.211 · demir çivi + makara · dirençler eşit').width + 22;
  ctx.restore();
  D.rozet(ctx, 'MEB s.211 · demir çivi + makara · dirençler eşit', w - 10 - rzG / 2, 14,
          'rgba(47,111,208,.92)', '#FFFFFF', '700 11px system-ui, sans-serif', true);
  for (let k = 0; k < 4; k++) {
    const d = KO_DUZ[k], v = koDeger(k);
    const x0 = 10 + (k % 2) * (pw + 10), y0 = ust + Math.floor(k / 2) * (ph + 4);
    if (k === sec) {
      ctx.fillStyle = 'rgba(255,210,74,.22)'; D.yuvarlakDik(ctx, x0, y0, pw, ph - 4, 10); ctx.fill();
      ctx.strokeStyle = 'rgba(200,150,20,.7)'; ctx.lineWidth = 1.6; ctx.stroke();
    }
    D.yaziAydinlik(ctx, (k + 1) + '. düzenek', x0 + 10, y0 + 14, R.mur, '700 12px system-ui, sans-serif', 'left');

    /* çivi (yatay), makara ortada */
    const cy = y0 + ph * 0.36, civiBoy = pw * 0.70, cx = x0 + pw / 2;
    const civiSol = cx - civiBoy / 2;
    ctx.fillStyle = '#8E98A6'; ctx.fillRect(civiSol, cy - 4, civiBoy, 8);
    ctx.fillRect(civiSol - 3, cy - 9, 4, 18);                                  // başı
    ctx.beginPath(); ctx.moveTo(civiSol + civiBoy, cy - 4); ctx.lineTo(civiSol + civiBoy + 10, cy);
    ctx.lineTo(civiSol + civiBoy, cy + 4); ctx.closePath(); ctx.fill();      // ucu
    const Lpx = pw * 0.24 * d.L, sarim = 7 * d.N;
    ctx.save(); ctx.strokeStyle = '#B87333'; ctx.lineWidth = 2.4;
    for (let j = 0; j < sarim; j++) {
      const x = cx - Lpx / 2 + (j + 0.5) * Lpx / sarim;
      ctx.beginPath(); ctx.ellipse(x, cy, 2.2, 10, 0, 0, 6.2832); ctx.stroke();
    }
    ctx.restore();
    /* kutuplar: B sağa ⟹ sağ uç N */
    D.yaziAydinlik(ctx, 'S', civiSol - 12, cy, '#2F6FD0', '700 12px system-ui, sans-serif', 'center');
    D.yaziAydinlik(ctx, 'N', civiSol + civiBoy + 20, cy, '#E2483F', '700 12px system-ui, sans-serif', 'center');
    /* B oku: büyüklükle orantılı */
    const okB = 14 + 40 * v.B / Bmaks;
    D.vektor(ctx, cx - okB / 2, cy - 18, cx + okB / 2, cy - 18, R.normal, '', { kalinlik: 2.6, ucBoy: 7 });

    /* teller ve pil(ler) */
    const py = y0 + ph * 0.72, solU = cx - Lpx / 2, sagU = cx + Lpx / 2;
    ctx.save(); ctx.strokeStyle = '#B87333'; ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.moveTo(solU, cy + 10); ctx.lineTo(solU, py); ctx.lineTo(cx - 8 - 9 * d.pil, py);
    ctx.moveTo(sagU, cy + 10); ctx.lineTo(sagU, py); ctx.lineTo(cx + 8 + 9 * d.pil, py);
    ctx.stroke(); ctx.restore();
    for (let j = 0; j < d.pil; j++) {
      const bx = cx - 9 * d.pil + j * 18 + 1;
      ctx.fillStyle = '#3A4250'; ctx.fillRect(bx, py - 7, 16, 14);
      ctx.fillStyle = '#E2A23F'; ctx.fillRect(bx + 16, py - 3, 2, 6);
    }
    D.yaziAydinlik(ctx, d.pil + ' pil · ' + (d.L === 1 ? 'L' : '2L') + ' · ' + (d.N === 1 ? 'N' : '2N'),
                   x0 + 10, y0 + ph - 16, R.mur, '600 11px system-ui, sans-serif', 'left');
    D.yaziAydinlik(ctx, 'B = ' + D.biçim(v.B * 1e3, 2) + ' mT', x0 + pw - 10, y0 + ph - 16,
                   k === sec ? '#1F6FA0' : R.mur, '700 12px system-ui, sans-serif', 'right');
  }
}

/* ----------------------------------------- Klasik fizik görünümü */

function klasikKitapOrnegi(ctx, w, h, st) {
  const sec = koSecili(st);
  D.yaziHaleli(ctx, 'B = 4·K·π·i·N / L = μ₀·(N/L)·i   (K = 10⁻⁷)', 12, 46, K.beyaz,
               '700 12px system-ui, sans-serif', 'left');
  const sut = [12, w * 0.20, w * 0.33, w * 0.46, w * 0.62, w - 12];
  const bas = ['Düzenek', 'i', 'N', 'L', 'B ∝ i·N/L', 'B (hava)'];
  let y = 76;
  bas.forEach((t, j) => D.yaziHaleli(ctx, t, sut[j], y, K.metin2, '700 11px system-ui, sans-serif', j === 5 ? 'right' : 'left'));
  const oran = ['i·N/2L', '2i·N/2L', 'i·N/L', 'i·2N/2L'];
  for (let k = 0; k < 4; k++) {
    const d = KO_DUZ[k], v = koDeger(k);
    y += 22;
    if (k === sec) {
      ctx.fillStyle = 'rgba(255,210,74,.18)'; ctx.fillRect(6, y - 10, w - 12, 20);
    }
    const renk = k === sec ? K.beyaz : K.metin2;
    const satir = [(k + 1) + '.', (d.pil === 1 ? 'i' : '2i'), (d.N === 1 ? 'N' : '2N'), (d.L === 1 ? 'L' : '2L'),
                   oran[k], D.biçim(v.B * 1e3, 2) + ' mT'];
    satir.forEach((t, j) => D.yaziHaleli(ctx, t, sut[j], y, j === 4 ? R.ivme : renk,
                                          '700 12px system-ui, sans-serif', j === 5 ? 'right' : 'left'));
  }
  const not = [
    ['En az alan: 1. düzenek ⟹ en az raptiye', R.kuvvet],
    ['2, 3 ve 4. düzeneklerde B eşit ⟹ eşit raptiye', R.hiz],
    ['(i = 1 A/pil, N = 50, L = 3 cm; demir çivi B’yi hepsinde büyütür)', K.metin2]
  ];
  let sy = h - 16 - (not.length - 1) * 18;
  not.forEach(([t, c]) => { D.yaziHaleli(ctx, t, 12, sy, c, '700 12px system-ui, sans-serif', 'left'); sy += 18; });
}

function cizKlasik(ctx, w, h, st, pHam) {
  const p = etkin(st, pHam);
  D.izgara(ctx, w, h, 26);
  if (p.mod > 2.5) { klasikKitapOrnegi(ctx, w, h, st); return; }

  const r = p.r / 100, L = p.L / 100;
  const halka = p.mod < 1.5;

  D.yaziHaleli(ctx, halka ? 'Düz halka · merkez' : 'Solenoid · iç bölge', 12, 22,
               K.beyaz, '700 12px system-ui, sans-serif', 'left');

  const cx = w * 0.22, cy = h * 0.46;
  const s = Math.sign(p.i);
  if (halka) {
    /* Halkaya EKSENİ boyunca (sağdan) bakış: i > 0 iken akım saat yönünün
       tersine döner ve B bakana doğru (⊙) çıkar. */
    ctx.save(); ctx.strokeStyle = K.eksen; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(cx, cy, 44, 0, 6.2832); ctx.stroke(); ctx.restore();
    isaretSembolu(ctx, cx, cy, s, 11, R.normal);
    if (s !== 0) {
      const a = -s * st.t * (0.6 + akimOrani(p) * 1.8);
      D.noktaCisim(ctx, cx + Math.cos(a) * 44, cy + Math.sin(a) * 44, 5, R.ivme);
    }
    D.yaziHaleli(ctx, s > 0 ? 'B ⊙' : s < 0 ? 'B ⊗' : 'B = 0', cx, cy + 62, R.normal,
                 '700 12px system-ui, sans-serif', 'center');
    D.yaziHaleli(ctx, s === 0 ? 'akım yok' : 'akım yönü: ' + (s > 0 ? 'saat tersi' : 'saat yönü'),
                 cx, cy + 80, K.metin2, '11px system-ui, sans-serif', 'center');
  } else {
    ctx.save(); ctx.strokeStyle = K.eksen; ctx.lineWidth = 2;
    ctx.strokeRect(cx - 60, cy - 30, 120, 60); ctx.restore();
    for (let k = 0; k < 6; k++) {
      const x = cx - 50 + k * 20;
      isaretSembolu(ctx, x, cy - 30, s, 6, R.ivme);
      isaretSembolu(ctx, x, cy + 30, -s, 6, R.ivme);
    }
    const boy = 8 + 52 * akimOrani(p);
    if (s !== 0)
      [-12, 0, 12].forEach(dy =>
        D.vektor(ctx, cx - boy / 2 * s, cy + dy, cx + boy / 2 * s, cy + dy, R.normal, '', { kalinlik: 2 }));
    D.yaziHaleli(ctx, s === 0 ? 'akım yok ⟹ B = 0' : 'düzgün alan', cx, cy + 52, R.normal,
                 '700 12px system-ui, sans-serif', 'center');
  }

  const bx = w * 0.46;
  let satir;
  if (halka) {
    const B = alanHalka(p.N, p.i, r), Btel = alanDuzTel(p.i, r);
    satir = [
      ['B = μ₀·N·i / (2r)', K.beyaz, '700 12px system-ui, sans-serif'],
      ['N = ' + D.biçim(p.N) + '  ·  i = ' + D.biçim(Math.abs(p.i), 2) + ' A  ·  r = ' + D.biçim(r, 3) + ' m', K.metin2, '11px system-ui, sans-serif'],
      ['B = ' + D.biçim(B * 1e6) + ' μT', R.normal, '700 13px system-ui, sans-serif'],
      ['', K.metin2, '11px'],
      ['Aynı akım, DÜZ telde (r kadar uzakta):', K.metin2, '11px system-ui, sans-serif'],
      ['B_tel = ' + D.biçim(Btel * 1e6) + ' μT', R.kuvvet, '12px system-ui, sans-serif'],
      ['Tek sarım π ≈ 3,14 kat · N sarım πN = ' + (p.i === 0 ? '—' : D.biçim(B / Btel, 0)) + ' kat', R.ivme, '700 12px system-ui, sans-serif']
    ];
  } else {
    const Bid = alanSolenoid(p.N, p.i, L), Bm = solenoidEksen(p.N, p.i, L, r, 0);
    const Buc = solenoidEksen(p.N, p.i, L, r, L / 2);
    satir = [
      ['B = μ₀ · n · i   (uzun solenoid, L ≫ r)', K.beyaz, '700 12px system-ui, sans-serif'],
      ['n = N/L = ' + D.biçim(p.N) + '/' + D.biçim(L, 3) + ' = ' + D.biçim(sarimYogunlugu(p)) + ' sarım/m', K.metin2, '11px system-ui, sans-serif'],
      ['B = ' + D.biçim(Bid * 1e6) + ' μT   — yarıçap formülde YOK', R.normal, '700 13px system-ui, sans-serif'],
      ['', K.metin2, '11px'],
      ['Bu makarada L/r = ' + D.biçim(L / r, 1) + ':', K.metin2, '11px system-ui, sans-serif'],
      ['merkezde gerçek B = ' + D.biçim(Bm * 1e6) + ' μT (%' + D.biçim(Bid > 0 ? 100 * Bm / Bid : 100, 0) + ')', R.ivme, '700 12px system-ui, sans-serif'],
      ['uçta B = ' + D.biçim(Buc * 1e6) + ' μT ≈ yarısı', K.metin2, '11px system-ui, sans-serif']
    ];
  }
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
  /* Eksenler taramanın en büyük akımına göre sabit: imleç akımla birlikte kayar. */
  const pM = Object.assign({}, p, { i: iMaks(pHam) });

  if (p.mod > 2.5) {
    const sec = koSecili(st), v = koDeger(sec);
    const veri = [];
    for (let x = 0; x <= 2000; x += 50) veri.push({ t: x, v: MU0 * x * 1e3 });
    D.miniGrafik(ctx, {
      x: pay, y: 3, w: gw, h: gh,
      baslik: 'B − i·N/L   (doğru orantı)', birim: 'mT', tEtiket: 'i·N/L (A/m)',
      veri, tMax: 2000, vMin: 0, vMax: MU0 * 2000 * 1e3, renk: R.normal,
      imlec: { t: v.i * v.n, v: v.B * 1e3 }
    });
    const v2 = [];
    for (let k = 0; k <= 120; k++) {
      const x = -0.07 + k * 0.14 / 120;
      v2.push({ t: x * 100, v: solenoidEksen(v.N, v.i, v.L, KO_R, x) * 1e3 });
    }
    D.miniGrafik(ctx, {
      x: pay * 2 + gw, y: 3, w: gw, h: gh,
      baslik: (sec + 1) + '. düzenek · B − x', birim: 'mT', tEtiket: 'x (cm)',
      veri: v2, tMin: -7, tMax: 7, vMin: 0, vMax: koDeger(1).B * 1e3 * 1.1, renk: R.ivme
    });
    return;
  }

  const v1 = [];
  for (let n = 0; n <= 400; n += 10)
    v1.push({ t: n, v: (halka ? alanHalka(n, p.i, p.r / 100) : alanSolenoid(n, p.i, p.L / 100)) * 1e6 });
  D.miniGrafik(ctx, {
    x: pay, y: 3, w: gw, h: gh,
    baslik: 'B − N   (doğru orantı)', birim: 'μT', tEtiket: 'N (sarım)',
    imlec: { t: p.N, v: (halka ? alanHalka(p.N, p.i, p.r / 100) : alanSolenoid(p.N, p.i, p.L / 100)) * 1e6 },
    veri: v1, tMax: 400, vMin: 0,
    vMax: Math.max(1e-3, (halka ? alanHalka(400, pM.i, p.r / 100) : alanSolenoid(400, pM.i, p.L / 100)) * 1e6 * 1.05),
    renk: R.normal
  });

  if (halka) {
    const v2 = [];
    for (let rr = 1; rr <= 30; rr += 0.5)
      v2.push({ t: rr, v: alanHalka(p.N, p.i, rr / 100) * 1e6 });
    D.miniGrafik(ctx, {
      x: pay * 2 + gw, y: 3, w: gw, h: gh,
      baslik: 'B − r   (ters orantı)', birim: 'μT', tEtiket: 'r (cm)',
      imlec: { t: p.r, v: alanHalka(p.N, p.i, p.r / 100) * 1e6 },
      veri: v2, tMin: 1, tMax: 30, vMin: 0, vMax: Math.max(1e-3, alanHalka(p.N, pM.i, 0.01) * 1e6),
      renk: R.ivme
    });
    return;
  }

  /* Eksen boyunca gerçek B; kesikli çizgi uzun-solenoid formülü μ₀ni. */
  const L = p.L / 100, r = p.r / 100;
  const v2 = [];
  for (let k = 0; k <= 120; k++) {
    const x = -L + k * (2 * L / 120);
    v2.push({ t: x * 100, v: solenoidEksen(p.N, p.i, L, r, x) * 1e6 });
  }
  const Bid = alanSolenoid(p.N, p.i, L) * 1e6;
  const vMax = Math.max(1e-3, alanSolenoid(p.N, pM.i, L) * 1e6 * 1.1);
  const kutu = { x: pay * 2 + gw, y: 3, w: gw, h: gh };
  D.miniGrafik(ctx, Object.assign({}, kutu, {
    baslik: 'B − x   (kesikli: μ₀ni)', birim: 'μT', tEtiket: 'x (cm)',
    veri: v2, tMin: -p.L, tMax: p.L, vMin: 0, vMax, renk: R.ivme
  }));
  if (Bid > 0) {
    const gx = kutu.x + 34, gwi = Math.max(10, kutu.w - 42), gy = kutu.y + 18, ghi = Math.max(10, kutu.h - 36);
    const yUst = D.guzelUst(vMax, 3);
    const yy = gy + ghi - (Bid / yUst) * ghi;
    D.kesikliCizgi(ctx, gx + gwi * 0.25, yy, gx + gwi * 0.75, yy, R.normal, 1.4, [5, 4]);
  }
}

/* ----------------------------------------------------------- Okumalar */

function okumalar(st, pHam) {
  const p = etkin(st, pHam);
  const r = p.r / 100, L = p.L / 100;
  if (p.mod > 2.5) {
    const sec = koSecili(st), v = koDeger(sec);
    return [
      { et: 'Vurgulanan düzenek', dg: String(sec + 1),           birim: '' },
      { et: 'Akım  i',        dg: D.biçim(v.i, 0),               birim: 'A' },
      { et: 'Sarım  N',       dg: D.biçim(v.N, 0),               birim: '' },
      { et: 'Uzunluk  L',     dg: D.biçim(v.L * 100, 0),         birim: 'cm' },
      { et: 'n = N/L',        dg: D.biçim(v.n, 0),               birim: 'sarım/m' },
      { et: 'B (hava çekirdek)', dg: D.biçim(v.B * 1e3, 2),      birim: 'mT' },
      { et: 'Karşılaştırma',  dg: '1 < 2 = 3 = 4',               birim: '' }
    ];
  }
  if (p.mod < 1.5) {
    const B = alanHalka(p.N, p.i, r);
    return [
      { et: 'Sarım  N',    dg: D.biçim(p.N),              birim: '' },
      { et: 'Akım  i',     dg: D.biçim(Math.abs(p.i), 2), birim: 'A' },
      { et: 'Yarıçap  r',  dg: D.biçim(p.r),              birim: 'cm' },
      { et: 'B (merkez)',  dg: D.biçim(B * 1e6),          birim: 'μT' },
      { et: 'Tek düz tele göre (πN)', dg: p.i === 0 ? '—' : D.biçim(B / alanDuzTel(p.i, r), 0), birim: 'kat' }
    ];
  }
  const Bid = alanSolenoid(p.N, p.i, L), Bm = solenoidEksen(p.N, p.i, L, r, 0);
  return [
    { et: 'Sarım  N',      dg: D.biçim(p.N),                 birim: '' },
    { et: 'n = N/L',       dg: D.biçim(sarimYogunlugu(p)),   birim: 'sarım/m' },
    { et: 'Akım  i',       dg: D.biçim(Math.abs(p.i), 2),    birim: 'A' },
    { et: 'B = μ₀ni',      dg: D.biçim(Bid * 1e6),           birim: 'μT' },
    { et: 'B merkez (gerçek)', dg: D.biçim(Bm * 1e6),        birim: 'μT' },
    { et: 'Kutuplar',      dg: p.i > 0 ? 'S — N' : p.i < 0 ? 'N — S' : 'Yok', birim: '' }
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
      { d: 2, e: 'Solenoid (içindeki alan)' },
      { d: 3, e: 'Kitap örneği: dört elektromıknatıs (s.211)' }
    ]},
    { anahtar: 'N', etiket: 'Sarım sayısı N', min: 1,  max: 400, adim: 1,  deger: 100, birim: '' },
    { anahtar: 'i', etiket: 'Akım i', min: -10, max: 10, adim: 1, deger: 2, birim: 'A' },
    { anahtar: 'r', etiket: 'Yarıçap r', min: 1, max: 30, adim: 1, deger: 10, birim: 'cm' },
    { anahtar: 'L', etiket: 'Solenoid uzunluğu L (2. düzenek)', min: 5, max: 100, adim: 5, deger: 40, birim: 'cm' }
  ],
  durum, adim, bitti, cizGercek, cizKlasik, cizGrafik, okumalar
};

})();
