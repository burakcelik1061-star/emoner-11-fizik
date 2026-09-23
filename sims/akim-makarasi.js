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
  /* Akımın YÖNÜ korunur, yalnız büyüklüğü kaydırıcı sınırları içinde
     taranır (en çok 10 A). Akım sıfır seçildiyse sıfır kalır: akım yoksa
     alan da yoktur. */
  const s = p.i < 0 ? -1 : 1;
  const hedef = p.i === 0 ? 0 : s * (Math.abs(p.i) < 5 ? 10 : 1);
  st.i = D.tarama(st.t, p.i, hedef, TARAMA_PERIYOT);
}

/** Ok boyu / çizgi sıklığı için akımın göreli büyüklüğü (0–1). */
function akimOrani(p) { return Math.min(1, Math.abs(p.i) / 10); }

function isaretSembolu(ctx, x, y, isaret, r, renk) {
  if (isaret > 0) D.alanDisari(ctx, x, y, r, renk);
  else if (isaret < 0) D.alanIceri(ctx, x, y, r, renk);
}

/**
 * Halkanın EKSENDEN GEÇEN kesitinde iki tel ucu vardır (i > 0 için üstte ⊙,
 * altta ⊗). Bu iki ucun alanı toplanıp çizgiler izlenir: çizgiler halkanın
 * İÇİNDEN geçer, her tel ucunun çevresinde dönerek dışarıdan geri gelir.
 */
function kesitCizgileri(ctx, uclar, tohumlar, w, h, renk) {
  const alan = (x, y) => {
    let bx = 0, by = 0;
    for (const u of uclar) {
      const dx = x - u.x, dy = y - u.y, r2 = dx * dx + dy * dy;
      if (r2 < 1) continue;
      bx += u.i * dy / r2; by += -u.i * dx / r2;
    }
    return [bx, by];
  };
  ctx.save();
  ctx.strokeStyle = renk; ctx.fillStyle = renk; ctx.lineWidth = 1.5;
  for (const [sx, sy] of tohumlar) {
    let x = sx, y = sy;
    const yol = [[x, y]];
    for (let k = 0; k < 1600; k++) {
      const [b1x, b1y] = alan(x, y);
      const b1 = Math.hypot(b1x, b1y);
      if (!(b1 > 1e-12)) break;
      /* orta nokta (RK2) adımı: kapalı çizgiler spiral gibi kaymasın */
      const [b2x, b2y] = alan(x + 1.5 * b1x / b1, y + 1.5 * b1y / b1);
      const b2 = Math.hypot(b2x, b2y);
      if (!(b2 > 1e-12)) break;
      x += 3 * b2x / b2; y += 3 * b2y / b2;
      yol.push([x, y]);
      if (k > 20 && Math.hypot(x - sx, y - sy) < 4) { yol.push([sx, sy]); break; }
      if (x < -300 || x > w + 300 || y < -300 || y > h + 300) break;
    }
    ctx.beginPath();
    yol.forEach(([px, py], j) => j ? ctx.lineTo(px, py) : ctx.moveTo(px, py));
    ctx.stroke();
    const [bx, by] = alan(sx, sy);
    const b = Math.hypot(bx, by) || 1, ux = bx / b, uy = by / b;
    ctx.beginPath();
    ctx.moveTo(sx + ux * 6, sy + uy * 6);
    ctx.lineTo(sx - uy * 3.6 - ux * 2, sy + ux * 3.6 - uy * 2);
    ctx.lineTo(sx + uy * 3.6 - ux * 2, sy - ux * 3.6 - uy * 2);
    ctx.closePath(); ctx.fill();
  }
  ctx.restore();
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
  const cx = w * 0.42, cy = h * 0.50;
  const rpx = Math.min(w * 0.22, h * 0.30);
  const s = Math.sign(p.i);                         // +1, −1, 0

  /* Halka sayfa düzlemine DİK durur, ekseni yatay (soldan sağa). Hafif
     yandan bakıldığı için ince bir elips görünür: sağ yarı öne, sol yarı
     arkaya düşer. Kesitte üst ve alt uçlarda tel sayfaya dik geçer. */
  if (s !== 0)
    kesitCizgileri(ctx, [{ x: cx, y: cy - rpx, i: s }, { x: cx, y: cy + rpx, i: -s }],
                   [-0.72, -0.42, -0.14, 0.14, 0.42, 0.72].map(f => [cx, cy + f * rpx]),
                   w, h, 'rgba(56,150,200,.62)');

  ctx.save();
  ctx.lineCap = 'round';
  ctx.strokeStyle = '#8A5A2B'; ctx.lineWidth = 5;              // arka yarı
  ctx.beginPath(); ctx.ellipse(cx, cy, rpx * 0.26, rpx, 0, Math.PI / 2, Math.PI * 1.5); ctx.stroke();
  ctx.strokeStyle = '#B87333'; ctx.lineWidth = 7;              // ön yarı
  ctx.beginPath(); ctx.ellipse(cx, cy, rpx * 0.26, rpx, 0, -Math.PI / 2, Math.PI / 2); ctx.stroke();
  ctx.restore();

  /* Akım: üst uçta dışarı (⊙), ön yarıda AŞAĞI, alt uçta içeri (⊗). Ön
     yarıdaki akış noktaları akımla orantılı hızla ilerler. */
  isaretSembolu(ctx, cx, cy - rpx, s, 8, '#3A2A10');
  isaretSembolu(ctx, cx, cy + rpx, -s, 8, '#3A2A10');
  if (s !== 0) {
    const faz = D.akisFazi(st.t * (0.3 + akimOrani(p) * 0.9), 1);
    ctx.save(); ctx.fillStyle = '#FFD24A';
    for (let k = 0; k < 5; k++) {
      let u = (faz + k / 5) % 1;                    // 0: üst, 1: alt
      if (s < 0) u = 1 - u;
      const a = -Math.PI / 2 + u * Math.PI;
      ctx.beginPath();
      ctx.arc(cx + Math.cos(a) * rpx * 0.26, cy + Math.sin(a) * rpx, 3.2, 0, 6.2832);
      ctx.fill();
    }
    ctx.restore();
  }
  D.yaziAydinlik(ctx, 'i = ' + D.biçim(Math.abs(p.i)) + ' A · N = ' + D.biçim(p.N),
                 cx, cy - rpx - 22, R.mur, '700 12px system-ui, sans-serif', 'center');

  /* merkezdeki alan vektörü — eksen boyunca; boyu akımla orantılı */
  const B = alanHalka(p.N, p.i, p.r / 100);
  if (s !== 0) {
    const boy = 16 + 64 * akimOrani(p);
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

function cizSolenoid(ctx, w, h, st, p) {
  const solX = w * 0.18, uzun = w * 0.58;
  const yariCap = Math.min(h * 0.20, 62);
  const cy = h * 0.50;
  const ustY = cy - yariCap, altY = cy + yariCap;
  const disari = p.i > 0;
  const s = Math.sign(p.i);

  /* solenoid sarımları; her sarımın üst ucunda ⊙, alt ucunda ⊗ (i > 0) */
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
  if (s !== 0 && uzun / sarimAdet >= 12)
    for (let k = 0; k < sarimAdet; k++) {
      const x = solX + (k + 0.5) * (uzun / sarimAdet);
      isaretSembolu(ctx, x, ustY, s, 4.5, '#3A2A10');
      isaretSembolu(ctx, x, altY, -s, 4.5, '#3A2A10');
    }

  /* içeride DÜZGÜN alan — eşit aralıklı paralel çizgiler. Çizgi SIKLIĞI
     alanın şiddetini gösterir: akım arttıkça çizgi sayısı artar. */
  ctx.save();
  ctx.strokeStyle = 'rgba(56,150,200,.9)'; ctx.lineWidth = 1.6;
  const adet = s === 0 ? 0 : 2 + Math.round(5 * akimOrani(p));
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

  /* dışarıda dönen çizgiler — çubuk mıknatıs görüntüsü (N’den çıkıp S’ye) */
  ctx.save();
  ctx.strokeStyle = 'rgba(56,150,200,.45)'; ctx.lineWidth = 1.3;
  ctx.fillStyle = 'rgba(56,150,200,.8)';
  (s === 0 ? [] : [1.5, 2.1]).forEach(k => {
    /* dış çizgide yön oku: içerideki alanın TERSİ yönünde */
    const ox = solX + uzun / 2;
    [cy - yariCap * k * 0.75, cy + yariCap * k * 0.75].forEach(oy => {
      ctx.beginPath();
      ctx.moveTo(ox - 6 * s, oy); ctx.lineTo(ox + 3 * s, oy - 4.5); ctx.lineTo(ox + 3 * s, oy + 4.5);
      ctx.closePath(); ctx.fill();
    });
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

  /* kutup etiketleri — solenoid bir çubuk mıknatıs gibi davranır; akım
     yoksa mıknatıslık da yoktur */
  if (s !== 0) {
    const solKutup = disari ? 'S' : 'N';
    const sagKutup = disari ? 'N' : 'S';
    D.rozet(ctx, solKutup, solX - 22, cy, solKutup === 'N' ? '#E2483F' : '#2F6FD0',
            '#FFFFFF', '700 15px system-ui, sans-serif', true);
    D.rozet(ctx, sagKutup, solX + uzun + 22, cy, sagKutup === 'N' ? '#E2483F' : '#2F6FD0',
            '#FFFFFF', '700 15px system-ui, sans-serif', true);
  }

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
  const s = Math.sign(p.i);
  if (halka) {
    /* Halkaya EKSENİ boyunca (sağdan) bakış: i > 0 iken akım saat yönünün
       tersine döner ve B bakana doğru (⊙) çıkar. */
    ctx.save(); ctx.strokeStyle = K.eksen; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(cx, cy, 44, 0, 6.2832); ctx.stroke(); ctx.restore();
    isaretSembolu(ctx, cx, cy, s, 11, R.normal);
    if (s !== 0) {
      /* akımın dolaşımı: halka üstünde ilerleyen nokta (hız ∝ i) */
      const a = -s * st.t * (0.6 + akimOrani(p) * 1.8);
      D.noktaCisim(ctx, cx + Math.cos(a) * 44, cy + Math.sin(a) * 44, 5, R.ivme);
    }
    D.yaziHaleli(ctx, s > 0 ? 'B ⊙' : s < 0 ? 'B ⊗' : 'B = 0', cx, cy + 62, R.normal,
                 '700 12px system-ui, sans-serif', 'center');
    D.yaziHaleli(ctx, s === 0 ? 'akım yok' : 'akım yönü: ' + (s > 0 ? 'saat tersi' : 'saat yönü'),
                 cx, cy + 80, K.metin2, '11px system-ui, sans-serif', 'center');
  } else {
    /* Yandan kesit: üst kenarda ⊙, alt kenarda ⊗ (i > 0); içeride B eksene
       paralel ve DÜZGÜN. */
    ctx.save(); ctx.strokeStyle = K.eksen; ctx.lineWidth = 2;
    ctx.strokeRect(cx - 60, cy - 30, 120, 60); ctx.restore();
    for (let k = 0; k < 6; k++) {
      const x = cx - 50 + k * 20;
      isaretSembolu(ctx, x, cy - 30, s, 6, R.ivme);
      isaretSembolu(ctx, x, cy + 30, -s, 6, R.ivme);
    }
    const boy = 20 + 40 * akimOrani(p);
    if (s !== 0)
      [-12, 0, 12].forEach(dy =>
        D.vektor(ctx, cx - boy / 2 * s, cy + dy, cx + boy / 2 * s, cy + dy, R.normal, '', { kalinlik: 2 }));
    D.yaziHaleli(ctx, s === 0 ? 'akım yok ⟹ B = 0' : 'düzgün alan', cx, cy + 52, R.normal,
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
      imlec: { t: p.r, v: alanHalka(p.N, p.i, p.r / 100) * 1e6 },
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
      imlec: { t: p.L, v: alanSolenoid(p.N, p.i, p.L / 100) * 1e6 },
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
      { et: 'Düz tele göre', dg: p.i === 0 ? '—' : D.biçim(B / alanDuzTel(p.i, r), 1), birim: 'kat' }
    ];
  }
  const B = alanSolenoid(p.N, p.i, L);
  return [
    { et: 'Sarım  N',     dg: D.biçim(p.N),                 birim: '' },
    { et: 'Uzunluk  L',   dg: D.biçim(p.L),                 birim: 'cm' },
    { et: 'n = N/L',      dg: D.biçim(sarimYogunlugu(p)),   birim: 'sarım/m' },
    { et: 'Akım  i',      dg: D.biçim(Math.abs(p.i)),       birim: 'A' },
    { et: 'B (iç)',       dg: D.biçim(B * 1e6),             birim: 'μT' },
    { et: 'Kutuplar',     dg: p.i > 0 ? 'S — N' : p.i < 0 ? 'N — S' : 'Yok', birim: '' }
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
