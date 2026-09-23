(function () {
"use strict";
window.F11 = window.F11 || {};

/* ==========================================================================
   sims/transformator.js
   --------------------------------------------------------------------------
   Konu 2.3.4 · Transformatör  (MEB 11, s.263-272)

   İDEAL TRANSFORMATÖR
   -------------------
       V₂/V₁ = N₂/N₁          (gerilim sarımla DOĞRU orantılı)
       i₂/i₁ = N₁/N₂          (akım sarımla TERS orantılı)
       P₁ = P₂                (güç korunur — bedava enerji yok)

   GERÇEK TRANSFORMATÖR
   --------------------
   Verim %100 değildir. İki ana kayıp vardır:
     · Bakır kaybı  : sargı direncinde i²R ısısı
     · Demir kaybı  : çekirdekteki girdap akımları ve histerezis
   Bu simülasyon verimi modelleyip P₂ < P₁ olduğunu açıkça gösterir. Verimi
   yok sayan bir simülasyon, öğrenciye "enerji bedava" izlenimi verirdi.

   Tipik güç trafolarının verimi %95-99 arasındadır.

   EN ÖNEMLİ SINIR
   ---------------
   Transformatör DOĞRU AKIMDA ÇALIŞMAZ. Çünkü sabit akım sabit akı üretir,
   sabit akı da indüksiyon gerilimi doğurmaz. Simülasyonda DC seçilirse
   çıkış sıfırlanır ve bunun sebebi ekranda yazar.
   ========================================================================== */

const D = window.F11;
const { R, K } = D;

/* ------------------------------------------------------------- Fizik */

function oran(p) { return p.N2 / Math.max(1, p.N1); }

/** Çıkış gerilimi (V). DC’de sıfırdır. */
function v2(p) {
  if (!p.ac) return 0;
  return p.V1 * oran(p);
}

/** Giriş akımı (A) — yük direncinden belirlenir. */
function i2(p) {
  if (!p.ac) return 0;
  return v2(p) / Math.max(1, p.Ryuk);
}

function p2(p) { return v2(p) * i2(p); }

/** Giriş gücü — verim yüzünden çıkıştan BÜYÜKtür. */
function p1(p) {
  const verim = p.verim / 100;
  return p2(p) / Math.max(0.01, verim);
}

function i1(p) {
  if (!p.ac) return 0;
  return p1(p) / Math.max(1, p.V1);
}

/** Isıya giden kayıp güç (W). */
function kayip(p) { return p1(p) - p2(p); }

function tur(p) {
  if (Math.abs(oran(p) - 1) < 0.02) return 'Ayırıcı (1:1)';
  return oran(p) > 1 ? 'YÜKSELTİCİ' : 'DÜŞÜRÜCÜ';
}

/* -------------------------------------------------------------- Durum */

/* Oynat'a basılınca ikincil sarım sayısı taranır; V₂'nin N₂ ile DOĞRU
   orantılı değiştiği ve düşürücü ↔ yükseltici geçişi canlı görünür. */
const TARAMA_PERIYOT = 14;      // s

function durum(p) { return { t: 0, N2: p.N2 }; }

function adim(st, dt, p) {
  st.t += dt;
  const hedef = p.N2 < p.N1 ? Math.min(2000, p.N1 * 2.2) : 100;
  st.N2 = Math.round(D.tarama(st.t, p.N2, hedef, TARAMA_PERIYOT));
}

function bitti() { return false; }

function etkin(st, p) {
  return Object.assign({}, p, { N2: (st && st.N2 != null) ? st.N2 : p.N2 });
}

/* --------------------------------------------- Gerçekçi görünüm */

function cizGercek(ctx, w, h, st, pHam) {
  const p = etkin(st, pHam);
  const cy = h * 0.48;
  const cx = w * 0.50;
  const cw = 120, ch = 150;

  /* demir çekirdek — kapalı halka */
  ctx.save();
  ctx.strokeStyle = '#6E7684'; ctx.lineWidth = 26;
  ctx.strokeRect(cx - cw / 2, cy - ch / 2, cw, ch);
  ctx.restore();
  D.yaziAydinlik(ctx, 'demir çekirdek', cx, cy + ch / 2 + 26, R.mur,
                 '600 11px system-ui, sans-serif', 'center');

  /* sargılar — sarım sayısıyla orantılı çizgi adedi */
  const sol = Math.max(3, Math.min(12, Math.round(p.N1 / 40)));
  const sag = Math.max(3, Math.min(12, Math.round(p.N2 / 40)));
  ctx.save();
  ctx.strokeStyle = '#B87333'; ctx.lineWidth = 4;
  for (let k = 0; k < sol; k++) {
    const yy = cy - ch / 2 + 16 + k * ((ch - 32) / Math.max(1, sol - 1));
    ctx.beginPath(); ctx.moveTo(cx - cw / 2 - 26, yy); ctx.lineTo(cx - cw / 2 + 14, yy); ctx.stroke();
  }
  for (let k = 0; k < sag; k++) {
    const yy = cy - ch / 2 + 16 + k * ((ch - 32) / Math.max(1, sag - 1));
    ctx.beginPath(); ctx.moveTo(cx + cw / 2 - 14, yy); ctx.lineTo(cx + cw / 2 + 26, yy); ctx.stroke();
  }
  ctx.restore();

  /* akı halkası — AC’de çekirdek boyunca bir o yana bir bu yana salınır
     (akı sinüs gibi yön değiştirir); DC’de akı sabittir, kıpırdamaz. */
  if (p.ac) {
    ctx.save();
    ctx.strokeStyle = 'rgba(56,150,200,.85)'; ctx.lineWidth = 2;
    ctx.setLineDash([7, 5]);
    ctx.lineDashOffset = 18 * Math.sin(2 * Math.PI * 0.5 * st.t);
    ctx.strokeRect(cx - cw / 2, cy - ch / 2, cw, ch);
    ctx.restore();
    D.yaziAydinlik(ctx, 'Φ değişiyor', cx, cy, R.normal,
                   '700 11px system-ui, sans-serif', 'center');
  } else {
    D.yaziAydinlik(ctx, 'Φ SABİT', cx, cy, '#B03030',
                   '700 12px system-ui, sans-serif', 'center');
  }

  /* giriş kaynağı */
  const kx = w * 0.13;
  ctx.fillStyle = p.ac ? '#2F6FD0' : '#8A6838';
  D.yuvarlakDik(ctx, kx - 30, cy - 26, 60, 52, 6); ctx.fill();
  D.yaziAydinlik(ctx, p.ac ? '~' : '=', kx, cy, '#FFFFFF',
                 '700 22px system-ui, sans-serif', 'center');
  D.yaziAydinlik(ctx, p.ac ? 'AC kaynak' : 'DC kaynak', kx, cy + 44, R.mur,
                 '600 11px system-ui, sans-serif', 'center');

  ctx.strokeStyle = '#7D8A99'; ctx.lineWidth = 2.4;
  ctx.beginPath();
  ctx.moveTo(kx + 30, cy - 14); ctx.lineTo(cx - cw / 2 - 26, cy - 14);
  ctx.moveTo(kx + 30, cy + 14); ctx.lineTo(cx - cw / 2 - 26, cy + 14);
  ctx.stroke();

  /* çıkış yükü — ampul */
  const ax = w * 0.87;
  const parlak = Math.min(1, p2(p) / 200);
  ctx.save();
  ctx.globalAlpha = 0.2 + parlak * 0.8;
  const g = ctx.createRadialGradient(ax, cy, 4, ax, cy, 40);
  g.addColorStop(0, '#FFE9A8'); g.addColorStop(1, 'rgba(255,210,74,0)');
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(ax, cy, 40, 0, 6.2832); ctx.fill();
  ctx.restore();
  ctx.fillStyle = p.ac ? '#FFD24A' : '#5A5A4A';
  ctx.beginPath(); ctx.arc(ax, cy, 20, 0, 6.2832); ctx.fill();

  ctx.strokeStyle = '#7D8A99'; ctx.lineWidth = 2.4;
  ctx.beginPath();
  ctx.moveTo(cx + cw / 2 + 26, cy - 14); ctx.lineTo(ax, cy - 14);
  ctx.moveTo(cx + cw / 2 + 26, cy + 14); ctx.lineTo(ax, cy + 14);
  ctx.stroke();

  /* değerler */
  D.yaziAydinlik(ctx, 'N₁ = ' + D.biçim(p.N1), cx - cw / 2 - 30, cy - ch / 2 - 10,
                 R.mur, '700 12px system-ui, sans-serif', 'center');
  D.yaziAydinlik(ctx, 'N₂ = ' + D.biçim(p.N2), cx + cw / 2 + 30, cy - ch / 2 - 10,
                 R.mur, '700 12px system-ui, sans-serif', 'center');
  D.yaziAydinlik(ctx, 'V₁ = ' + D.biçim(p.V1) + ' V', 10, 24, R.normal,
                 '700 12px system-ui, sans-serif', 'left');
  D.yaziAydinlik(ctx, 'V₂ = ' + D.biçim(v2(p)) + ' V', w - 10, 24, R.ivme,
                 '700 13px system-ui, sans-serif', 'right');

  D.rozet(ctx, p.ac ? tur(p) : 'DC — ÇALIŞMAZ', w / 2, 52,
          p.ac ? (oran(p) > 1 ? 'rgba(226,72,63,.92)' : 'rgba(47,111,208,.92)')
               : 'rgba(176,48,48,.95)',
          '#FFFFFF', '700 12px system-ui, sans-serif', true);

  if (!p.ac)
    D.yaziAydinlik(ctx, 'DC ⟹ akı sabit ⟹ ΔΦ = 0 ⟹ indüksiyon YOK · birincil sargı ISINIR',
                   w / 2, h - 12, '#B03030', '700 12px system-ui, sans-serif', 'center');
  else
    D.yaziAydinlik(ctx, 'gerilim yükselirse akım düşer — güç korunur',
                   w / 2, h - 12, R.mur, '600 11px system-ui, sans-serif', 'center');
}

/* ----------------------------------------- Klasik fizik görünümü */

function cizKlasik(ctx, w, h, st, pHam) {
  const p = etkin(st, pHam);
  D.izgara(ctx, w, h, 26);

  D.yaziHaleli(ctx, 'İdeal ve gerçek transformatör', 12, 22, K.beyaz,
               '700 12px system-ui, sans-serif', 'left');

  /* sol: güç akışı çubuğu */
  const gx = 30, gy = h * 0.34, gw = Math.min(200, w * 0.36);
  const P1 = p1(p), P2 = p2(p), Pk = kayip(p);
  const enB = Math.max(1e-6, P1);

  ctx.fillStyle = K.izgara; ctx.fillRect(gx, gy, gw, 22);
  ctx.fillStyle = R.hiz;    ctx.fillRect(gx, gy, gw * (P2 / enB), 22);
  ctx.fillStyle = R.kuvvet; ctx.fillRect(gx + gw * (P2 / enB), gy, gw * (Pk / enB), 22);

  D.yaziHaleli(ctx, 'P₁ = ' + D.biçim(P1) + ' W', gx, gy - 10, K.beyaz,
               '700 11px system-ui, sans-serif', 'left');
  /* Çubuk dar; iki etiket yan yana sığmıyordu — alt alta yazılır. */
  D.yaziHaleli(ctx, 'faydalı ' + D.biçim(P2) + ' W', gx, gy + 38, R.hiz,
               '600 11px system-ui, sans-serif', 'left');
  D.yaziHaleli(ctx, 'kayıp ' + D.biçim(Pk) + ' W', gx, gy + 54, R.kuvvet,
               '600 11px system-ui, sans-serif', 'left');
  D.yaziHaleli(ctx, 'verim = %' + D.biçim(p.verim), gx, gy + 78, R.ivme,
               '700 12px system-ui, sans-serif', 'left');

  /* sağ: oranlar */
  const bx = gx + gw + 40;
  const satir = p.ac ? [
    ['V₂/V₁ = N₂/N₁', K.beyaz, '700 12px system-ui, sans-serif'],
    [D.biçim(v2(p)) + '/' + D.biçim(p.V1) + ' = ' + D.biçim(p.N2) + '/' + D.biçim(p.N1), K.metin2, '11px system-ui, sans-serif'],
    ['oran = ' + D.biçim(oran(p), 3), R.ivme, '700 12px system-ui, sans-serif'],
    ['', K.metin2, '11px'],
    ['i₂/i₁ = N₁/N₂  (TERS)', K.beyaz, '700 12px system-ui, sans-serif'],
    ['i₁ = ' + D.biçim(i1(p), 3) + ' A', K.metin2, '11px system-ui, sans-serif'],
    ['i₂ = ' + D.biçim(i2(p), 3) + ' A', R.normal, '700 12px system-ui, sans-serif'],
    ['', K.metin2, '11px'],
    ['İdealde P₁ = P₂', K.metin2, '11px system-ui, sans-serif'],
    ['Gerçekte P₂ < P₁', R.kuvvet, '700 12px system-ui, sans-serif']
  ] : [
    ['DOĞRU AKIMDA', R.kuvvet, '700 13px system-ui, sans-serif'],
    ['i sabit ⟹ B sabit', K.metin2, '11px system-ui, sans-serif'],
    ['B sabit ⟹ Φ sabit', K.metin2, '11px system-ui, sans-serif'],
    ['ΔΦ = 0', R.kuvvet, '700 12px system-ui, sans-serif'],
    ['', K.metin2, '11px'],
    ['ε = −N·ΔΦ/Δt = 0', R.kuvvet, '700 13px system-ui, sans-serif'],
    ['', K.metin2, '11px'],
    ['Transformatör yalnızca AC’de', K.beyaz, '700 12px system-ui, sans-serif'],
    ['çalışır.', K.beyaz, '700 12px system-ui, sans-serif'],
    ['', K.metin2, '11px'],
    ['DC’de birincil akımı yalnız sargı', K.metin2, '11px system-ui, sans-serif'],
    ['direnci sınırlar ⟹ sargı ısınır', R.kuvvet, '11px system-ui, sans-serif']
  ];
  let sy = 46;
  satir.forEach(([t, c, f]) => {
    if (t) D.yaziHaleli(ctx, t, bx, sy, c, f, 'left');
    sy += 17;
  });

  D.yaziHaleli(ctx, 'Gerilim kazanırsan akım kaybedersin — bedava enerji yok',
               12, h - 16, R.ivme, '600 11px system-ui, sans-serif', 'left');
}

/* ------------------------------------------------------- Grafikler */

function cizGrafik(ctx, w, h, st, pHam) {
  const p = etkin(st, pHam);
  const pay = 8, gw = (w - pay * 3) / 2, gh = h - 6;

  /* V₂ − N₂ : doğru orantı */
  const v1v = [];
  for (let n = 10; n <= 2000; n += 20)
    v1v.push({ t: n, v: p.ac ? p.V1 * (n / Math.max(1, p.N1)) : 0 });
  D.miniGrafik(ctx, {
    x: pay, y: 3, w: gw, h: gh,
    baslik: 'V₂ − N₂   (sarımla DOĞRU orantı)', birim: 'V', tEtiket: 'N₂ (sarım)',
    imlec: { t: p.N2, v: v2(p) },
    veri: v1v, tMax: 2000, vMin: 0,
    vMax: Math.max(1, p.V1 * (2000 / Math.max(1, p.N1)) * 1.05),
    renk: R.ivme
  });

  /* i₂ − N₂ : ters orantı */
  const v2v = [];
  for (let n = 40; n <= 2000; n += 20) {
    const vv = p.ac ? p.V1 * (n / Math.max(1, p.N1)) : 0;
    v2v.push({ t: n, v: vv / Math.max(1, p.Ryuk) });
  }
  D.miniGrafik(ctx, {
    x: pay * 2 + gw, y: 3, w: gw, h: gh,
    baslik: 'i₂ − N₂   (sabit yükte akım da artar)', birim: 'A', tEtiket: 'N₂ (sarım)',
    imlec: { t: p.N2, v: i2(p) },
    veri: v2v, tMax: 2000, vMin: 0,
    vMax: Math.max(0.01, (p.V1 * (2000 / Math.max(1, p.N1)) / Math.max(1, p.Ryuk)) * 1.05),
    renk: R.normal
  });
}

/* ----------------------------------------------------------- Okumalar */

function okumalar(st, pHam) {
  const p = etkin(st, pHam);
  return [
    { et: 'Tür',        dg: p.ac ? tur(p) : 'DC — çalışmaz',  birim: '' },
    { et: 'N₁ / N₂',    dg: D.biçim(p.N1) + ' / ' + D.biçim(p.N2), birim: '' },
    { et: 'V₁',         dg: D.biçim(p.V1),                    birim: 'V' },
    { et: 'V₂',         dg: D.biçim(v2(p)),                   birim: 'V' },
    { et: 'i₁',         dg: p.ac ? D.biçim(i1(p), 3) : 'Çok büyük (ısınır)', birim: p.ac ? 'A' : '' },
    { et: 'i₂',         dg: D.biçim(i2(p), 3),                birim: 'A' },
    { et: 'P₁ (giren)', dg: D.biçim(p1(p)),                   birim: 'W' },
    { et: 'P₂ (çıkan)', dg: D.biçim(p2(p)),                   birim: 'W' },
    { et: 'Kayıp',      dg: D.biçim(kayip(p)),                birim: 'W' }
  ];
}

/* ------------------------------------------------------------- Tanım */

D.simler = D.simler || {};
D.simler['transformator'] = {
  id: 'transformator',
  baslik: '2.3.4 · Transformatör · sarım oranı, güç ve verim',
  yukseklik: 330,
  grafikPanel: true,
  grafikYukseklik: 170,
  parametreler: [
    { anahtar: 'ac', etiket: 'Kaynak', tur: 'secim', deger: 1, secenekler: [
      { d: 1, e: 'Alternatif akım (AC)' },
      { d: 0, e: 'Doğru akım (DC) — dene, çalışmayacak' }
    ]},
    { anahtar: 'V1',   etiket: 'Giriş gerilimi V₁', min: 12, max: 400, adim: 4, deger: 220, birim: 'V' },
    { anahtar: 'N1',   etiket: 'Birincil sarım N₁', min: 50, max: 2000, adim: 50, deger: 1000, birim: '' },
    { anahtar: 'N2',   etiket: 'İkincil sarım N₂', min: 50, max: 2000, adim: 50, deger: 200, birim: '' },
    { anahtar: 'Ryuk', etiket: 'Yük direnci', min: 2, max: 200, adim: 2, deger: 20, birim: 'Ω' },
    { anahtar: 'verim',etiket: 'Verim', min: 70, max: 100, adim: 1, deger: 96, birim: '%' }
  ],
  durum, adim, bitti, cizGercek, cizKlasik, cizGrafik, okumalar
};

})();
