(function () {
"use strict";
window.F11 = window.F11 || {};

/* ==========================================================================
   sims/kirilma.js
   --------------------------------------------------------------------------
   Konu 3.5 · Işığın kırılması

   SNELL YASASI
   ------------
       n₁ · sin θ₁ = n₂ · sin θ₂          (açılar NORMALDEN ölçülür)

   KIRILMA İNDİSİ
   --------------
       n = c / v            c = 3×10⁸ m/s (boşluktaki ışık hızı)
       v = c / n            ortamdaki hız
       λ = λ₀ / n           ortamdaki dalga boyu

   FREKANS DEĞİŞMEZ. Değişen hız ve dalga boyudur — ışığın rengi bu yüzden
   suya girince değişmez.

   SINIR AÇISI (tam yansıma)
   -------------------------
   Yalnızca ÇOK KIRICI ortamdan AZ KIRICI ortama geçerken (n₁ > n₂):

       sin θ_sınır = n₂ / n₁

   θ₁ > θ_sınır ise ışık hiç kırılmaz, TAMAMI yansır.

   YANSIYAN IŞIK ORANI (Fresnel)
   -----------------------------
   Kırılmanın yanında bir miktar ışık her zaman yansır. Bu oran Fresnel
   bağıntılarıyla hesaplanır ve simülasyonda gerçek değerle gösterilir:

       r_s = (n₁cosθ₁ − n₂cosθ₂) / (n₁cosθ₁ + n₂cosθ₂)
       r_p = (n₁cosθ₂ − n₂cosθ₁) / (n₁cosθ₂ + n₂cosθ₁)
       Yansıma oranı = (r_s² + r_p²) / 2      (polarizasyonsuz ışık)

   Dik gelişte (θ₁ = 0) bu oran ((n₁−n₂)/(n₁+n₂))² olur: hava–cam sınırı
   için %4, hava–elmas için %17. Elmasın parlaklığının bir sebebi budur.
   ========================================================================== */

const D = window.F11;
const { R, K } = D;

const C_ISIK = 3e8;             // m/s

/* Yaygın ortamlar — indise en yakın olanın adı yazılır. */
const ORTAMLAR = [
  { n: 1.00, ad: 'hava' },
  { n: 1.31, ad: 'buz' },
  { n: 1.33, ad: 'su' },
  { n: 1.36, ad: 'etil alkol' },
  { n: 1.47, ad: 'gliserin' },
  { n: 1.50, ad: 'cam' },
  { n: 1.58, ad: 'polikarbonat' },
  { n: 1.66, ad: 'ağır cam' },
  { n: 2.42, ad: 'elmas' }
];

function ortamAdi(n) {
  let en = ORTAMLAR[0], fark = 9;
  for (const o of ORTAMLAR) {
    const d = Math.abs(o.n - n);
    if (d < fark) { fark = d; en = o; }
  }
  return fark < 0.03 ? en.ad : 'ortam';
}

/* ------------------------------------------------------------- Fizik */

function gelmeRad(p) { return (p.gelme * Math.PI) / 180; }

/** Snell: kırılma açısı (radyan). Tam yansıma varsa null. */
function kirilmaAcisi(p) {
  const s = (p.n1 / p.n2) * Math.sin(gelmeRad(p));
  return Math.abs(s) > 1 ? null : Math.asin(s);
}

/** Sınır açısı (derece). n1 ≤ n2 ise yoktur. */
function sinirAcisi(p) {
  if (p.n1 <= p.n2) return null;
  return (Math.asin(p.n2 / p.n1) * 180) / Math.PI;
}

function tamYansimaMi(p) {
  const s = sinirAcisi(p);
  return s !== null && p.gelme > s + 1e-9;
}

/** Fresnel — yansıyan ışık oranı (0…1), polarizasyonsuz ışık. */
function yansimaOrani(p) {
  const t2 = kirilmaAcisi(p);
  if (t2 === null) return 1;
  const c1 = Math.cos(gelmeRad(p)), c2 = Math.cos(t2);
  const rs = (p.n1 * c1 - p.n2 * c2) / (p.n1 * c1 + p.n2 * c2);
  const rp = (p.n1 * c2 - p.n2 * c1) / (p.n1 * c2 + p.n2 * c1);
  return (rs * rs + rp * rp) / 2;
}

function hiz(n)  { return C_ISIK / n; }
function dalga(n, lam0) { return lam0 / n; }

/* -------------------------------------------------------------- Durum */

/* Oynat'a basılınca gelme açısı yavaşça taranır. Böylece kırılma açısının
   nasıl değiştiği — ve 2. düzenekte sınır açısının nasıl AŞILDIĞI — canlı
   görünür. Kaydırıcı, taramanın BAŞLADIĞI açıyı belirler. */
const TARAMA_PERIYOT = 14;      // s — bir gidiş-geliş

function durum(p) { return { t: 0, gelme: p.gelme }; }

function adim(st, dt, p) {
  st.t += dt;
  /* Kaydırıcı değerinden başlayıp 0–89° arasında gidip gelir. */
  st.gelme = D.tarama(st.t, p.gelme, p.gelme < 45 ? 89 : 2, TARAMA_PERIYOT);
}

function bitti() { return false; }

/** Çizim ve hesaplarda kullanılacak, taranan açıyla güncellenmiş parametreler. */
function etkin(st, p) {
  return Object.assign({}, p, { gelme: (st && st.gelme != null) ? st.gelme : p.gelme });
}

/* --------------------------------------------- Gerçekçi görünüm */

function cizGercek(ctx, w, h, st, pHam) {
  const p = etkin(st, pHam);
  const oy = h * 0.50;                     // sınır yüzeyi
  const ox = w * 0.46;                     // gelme noktası O

  /* iki ortam — üstteki ortamın etiketi panel köşesindeki rozetin altında
     kalmasın diye SAĞA yazılır, alttaki solda kalabilir. */
  D.ortam(ctx, 0, 0, w, oy, '', renkOrtam(p.n1, 0.55));
  D.ortam(ctx, 0, oy, w, h - oy,
          ortamAdi(p.n2) + '  ·  n₂ = ' + D.biçim(p.n2, 3), renkOrtam(p.n2, 0.95));
  D.yaziAydinlik(ctx, ortamAdi(p.n1) + '  ·  n₁ = ' + D.biçim(p.n1, 3),
                 w - 10, 18, '#1B3A52', '700 12px system-ui, sans-serif', 'right');

  /* normal */
  D.kesikliCizgi(ctx, ox, oy - h * 0.44, ox, oy + h * 0.44, '#4A5F86', 1.5, [6, 5]);
  D.yaziAydinlik(ctx, 'normal', ox + 6, oy - h * 0.30, '#4A5F86',
                 '600 11px system-ui, sans-serif', 'left');

  if (p.mod > 2.5) { cizDalga(ctx, w, h, st, p, ox, oy); return; }

  const t1 = gelmeRad(p);
  const t2 = kirilmaAcisi(p);
  const L = Math.min(w * 0.42, h * 0.44);

  /* gelen ışın — sol üstten O'ya */
  const gx = ox - Math.sin(t1) * L, gy = oy - Math.cos(t1) * L;
  D.isin(ctx, gx, gy, ox, oy, R.ivme, 2.6, true);
  D.aciYayi(ctx, ox, oy, 42, -Math.PI / 2, -Math.PI / 2 - t1,
            R.ivme, D.biçim(p.gelme) + '°');

  /* yansıyan ışın — şiddeti Fresnel oranıyla */
  const oran = yansimaOrani(p);
  ctx.save();
  ctx.globalAlpha = Math.min(1, 0.22 + oran * 1.4);
  D.isin(ctx, ox, oy, ox + Math.sin(t1) * L, oy - Math.cos(t1) * L,
         R.hiz, 1.4 + oran * 3.4, true);
  ctx.restore();
  D.yaziAydinlik(ctx, 'yansıyan  %' + D.biçim(oran * 100, 3),
                 ox + Math.sin(t1) * L * 0.62 + 8,
                 oy - Math.cos(t1) * L * 0.62, R.hiz,
                 '600 11px system-ui, sans-serif', 'left');

  /* kırılan ışın */
  if (t2 === null) {
    D.yaziAydinlik(ctx, 'TAM YANSIMA — ışık ikinci ortama HİÇ geçemiyor',
                   w * 0.5, h * 0.93, R.kuvvet,
                   '700 13px system-ui, sans-serif', 'center');
  } else {
    ctx.save();
    ctx.globalAlpha = Math.max(0.25, 1 - oran);
    D.isin(ctx, ox, oy, ox + Math.sin(t2) * L, oy + Math.cos(t2) * L,
           R.kuvvet, 2.6, true);
    ctx.restore();
    D.aciYayi(ctx, ox, oy, 42, Math.PI / 2, Math.PI / 2 - t2,
              R.kuvvet, D.biçim((t2 * 180) / Math.PI, 3) + '°');
    D.yaziAydinlik(ctx, 'kırılan  %' + D.biçim((1 - oran) * 100, 3),
                   ox + Math.sin(t2) * L * 0.72 + 8,
                   oy + Math.cos(t2) * L * 0.72, R.kuvvet,
                   '600 11px system-ui, sans-serif', 'left');
  }

  /* sınır açısı göstergesi */
  const sa = sinirAcisi(p);
  if (p.mod > 1.5 && sa !== null) {
    const ts = (sa * Math.PI) / 180;
    D.kesikliCizgi(ctx, ox, oy, ox - Math.sin(ts) * L * 1.02, oy - Math.cos(ts) * L * 1.02,
                   R.surtunme, 2, [5, 4]);
    D.yaziAydinlik(ctx, 'sınır açısı ' + D.biçim(sa, 3) + '°',
                   ox - Math.sin(ts) * L - 6, oy - Math.cos(ts) * L - 6,
                   R.surtunme, '700 11px system-ui, sans-serif', 'right');
    /* sınır açısında kırılan ışın yüzey boyunca gider */
    D.kesikliCizgi(ctx, ox, oy, ox + L * 0.9, oy, R.surtunme, 1.6, [4, 4]);
  } else if (p.mod > 1.5) {
    D.yaziAydinlik(ctx, 'n₁ ≤ n₂ olduğu için sınır açısı YOKTUR — tam yansıma olamaz',
                   w * 0.5, h * 0.93, R.surtunme,
                   '700 12px system-ui, sans-serif', 'center');
  }

  /* hangi yöne kırıldı? */
  if (t2 !== null && p.gelme > 2) {
    const yon = p.n2 > p.n1 ? 'normale YAKLAŞTI' : (p.n2 < p.n1 ? 'normalden UZAKLAŞTI' : 'sapmadı');
    D.yaziAydinlik(ctx, 'Işık ' + yon, 10, h - 10, R.surtunme,
                   '700 12px system-ui, sans-serif', 'left');
  }
}

/** Ortamın indisine göre mavilik — yoğun ortam daha koyu. */
function renkOrtam(n, k) {
  const y = Math.min(1, Math.max(0, (n - 1) / 1.5));
  const a = (0.06 + y * 0.30) * k;
  return 'rgba(60,140,205,' + a.toFixed(3) + ')';
}

/* ---- Mod 3 · Dalga cepheleri ---- */

function cizDalga(ctx, w, h, st, p, ox, oy) {
  const t1 = gelmeRad(p);
  const t2 = kirilmaAcisi(p);
  const lam1 = 26;                                    // 1. ortamda cephe aralığı (px)
  const lam2 = lam1 * (p.n1 / p.n2);                  // λ ∝ 1/n

  if (t2 === null) {
    D.yaziAydinlik(ctx, 'Tam yansıma — ikinci ortama dalga geçmiyor',
                   w * 0.5, h * 0.93, R.kuvvet, '700 13px system-ui, sans-serif', 'center');
  }

  const s1 = Math.sin(t1);
  ctx.save();
  ctx.lineWidth = 1.8;

  if (Math.abs(s1) < 0.035) {
    /* dik geliş — cepheler yüzeye paralel */
    const faz = (st.t * 60) % lam1;
    ctx.strokeStyle = R.ivme;
    for (let y = oy - faz; y > 0; y -= lam1) cizgi(ctx, 0, y, w, y);
    if (t2 !== null) {
      ctx.strokeStyle = R.kuvvet;
      const faz2 = (st.t * 60 * (p.n1 / p.n2)) % lam2;
      for (let y = oy + faz2; y < h; y += lam2) cizgi(ctx, 0, y, w, y);
    }
  } else {
    /* Cepheler yüzeyi AYNI noktalarda keser — kırılmanın sebebi budur.
       Yüzey boyunca iz dalga boyu: L = λ₁/sin θ₁ = λ₂/sin θ₂ */
    const L = lam1 / s1;
    const faz = (st.t * 60 / s1) % L;
    const n = Math.ceil(w / Math.abs(L)) + 3;

    for (let k = -n; k <= n; k++) {
      const xk = ox + k * L + faz;
      /* 1. ortam: cephe, gelen ışına dik */
      ctx.strokeStyle = R.ivme;
      cizgiDik(ctx, xk, oy, Math.sin(t1), Math.cos(t1), -1, w, h, oy);
      /* 2. ortam */
      if (t2 !== null) {
        ctx.strokeStyle = R.kuvvet;
        cizgiDik(ctx, xk, oy, Math.sin(t2), Math.cos(t2), +1, w, h, oy);
      }
    }
  }
  ctx.restore();

  /* ölçüler */
  D.yaziAydinlik(ctx, 'λ₁ ∝ 1/n₁', 10, oy - 14, R.ivme,
                 '700 12px system-ui, sans-serif', 'left');
  D.yaziAydinlik(ctx, 'λ₂ = λ₁·n₁/n₂  ·  frekans DEĞİŞMEZ', 10, oy + 24, R.kuvvet,
                 '700 12px system-ui, sans-serif', 'left');
  D.yaziAydinlik(ctx, 'Cepheler yüzeyi aynı noktalarda keser — kırılmanın sebebi bu',
                 w * 0.5, h - 10, R.surtunme, '600 11px system-ui, sans-serif', 'center');
}

function cizgi(ctx, x1, y1, x2, y2) {
  ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
}

/**
 * (xk, oy) noktasından geçen, (dx,dy) ışın doğrultusuna DİK bir cephe çizgisi.
 * taraf = −1 üst yarı, +1 alt yarı.
 */
function cizgiDik(ctx, xk, oy, dx, dy, taraf, w, h, sinir) {
  const px = dy, py = -dx;                 // dik doğrultu
  const uz = Math.max(w, h) * 1.4;
  let x1 = xk - px * uz, y1 = oy - py * uz;
  let x2 = xk + px * uz, y2 = oy + py * uz;

  /* yalnızca ilgili yarıya çiz */
  ctx.save();
  ctx.beginPath();
  if (taraf < 0) ctx.rect(0, 0, w, sinir);
  else           ctx.rect(0, sinir, w, h - sinir);
  ctx.clip();
  cizgi(ctx, x1, y1, x2, y2);
  ctx.restore();
}

/* ------------------------------------------ Klasik fizik görünümü */

function cizKlasik(ctx, w, h, st, pHam) {
  const p = etkin(st, pHam);
  D.izgara(ctx, w, h, 26);
  const t2 = kirilmaAcisi(p);
  const sa = sinirAcisi(p);
  const oran = yansimaOrani(p);

  D.yaziHaleli(ctx, 'Snell yasası', 12, 22, K.beyaz,
               '700 12px system-ui, sans-serif', 'left');

  const sol = [
    ['n₁·sin θ₁ = n₂·sin θ₂', K.beyaz, '700 14px system-ui, sans-serif'],
    ['', K.metin2, '11px'],
    ['n₁ = ' + D.biçim(p.n1, 3) + '  (' + ortamAdi(p.n1) + ')', R.ivme, '12px system-ui, sans-serif'],
    ['n₂ = ' + D.biçim(p.n2, 3) + '  (' + ortamAdi(p.n2) + ')', R.kuvvet, '12px system-ui, sans-serif'],
    ['θ₁ = ' + D.biçim(p.gelme) + '°', R.ivme, '700 13px system-ui, sans-serif'],
    ['sin θ₁ = ' + D.biçim(Math.sin(gelmeRad(p)), 4), K.metin2, '11px system-ui, sans-serif'],
    ['sin θ₂ = (n₁/n₂)·sin θ₁ = ' +
      D.biçim((p.n1 / p.n2) * Math.sin(gelmeRad(p)), 4), K.metin2, '11px system-ui, sans-serif'],
    ['θ₂ = ' + (t2 === null ? 'YOK (tam yansıma)' : D.biçim((t2 * 180) / Math.PI, 4) + '°'),
      R.kuvvet, '700 13px system-ui, sans-serif']
  ];
  let sy = 46;
  sol.forEach(([t, c, f]) => { if (t) D.yaziHaleli(ctx, t, 12, sy, c, f, 'left'); sy += 17; });

  const sx = w * 0.52;
  const sag = [
    ['n = c/v  ·  λ = λ₀/n', K.beyaz, '700 12px system-ui, sans-serif'],
    ['v₁ = ' + D.biçim(hiz(p.n1) / 1e8, 4) + '×10⁸ m/s', R.ivme, '12px system-ui, sans-serif'],
    ['v₂ = ' + D.biçim(hiz(p.n2) / 1e8, 4) + '×10⁸ m/s', R.kuvvet, '12px system-ui, sans-serif'],
    ['λ₂/λ₁ = n₁/n₂ = ' + D.biçim(p.n1 / p.n2, 4), R.normal, '12px system-ui, sans-serif'],
    ['Frekans DEĞİŞMEZ', R.hiz, '700 12px system-ui, sans-serif'],
    ['', K.metin2, '11px'],
    ['sin θ_sınır = n₂/n₁', K.beyaz, '700 12px system-ui, sans-serif'],
    [sa === null ? 'n₁ ≤ n₂ ⟹ sınır açısı YOK'
                 : 'θ_sınır = ' + D.biçim(sa, 4) + '°',
      R.surtunme, '700 13px system-ui, sans-serif'],
    ['', K.metin2, '11px'],
    ['Yansıyan oran (Fresnel)', K.beyaz, '700 12px system-ui, sans-serif'],
    ['%' + D.biçim(oran * 100, 4), R.hiz, '700 13px system-ui, sans-serif']
  ];
  sy = 46;
  sag.forEach(([t, c, f]) => { if (t) D.yaziHaleli(ctx, t, sx, sy, c, f, 'left'); sy += 17; });
}

/* ---------------------------------------------------- Grafik paneli */

function cizGrafik(ctx, w, h, st, pHam) {
  const p = etkin(st, pHam);
  const pay = 8, gw = (w - pay * 3) / 2, gh = h - 6;

  /* θ₂ − θ₁ */
  const v1 = [];
  for (let d = 0; d <= 90; d += 1) {
    const s = (p.n1 / p.n2) * Math.sin((d * Math.PI) / 180);
    if (Math.abs(s) > 1) break;
    v1.push({ t: d, v: (Math.asin(s) * 180) / Math.PI });
  }
  D.miniGrafik(ctx, {
    x: pay, y: 3, w: gw, h: gh,
    baslik: p.n1 > p.n2 ? 'θ₂ − θ₁   (sınır açısında kesiliyor)' : 'θ₂ − θ₁',
    birim: '°', tEtiket: 'θ₁ (°)',
    imlec: (() => { const t2 = kirilmaAcisi(p); return t2 === null ? null : { t: p.gelme, v: (t2 * 180) / Math.PI }; })(),
    veri: v1, tMax: 90, vMin: 0, vMax: 90, renk: R.kuvvet
  });

  /* Fresnel yansıma oranı */
  const v2 = [];
  for (let d = 0; d <= 90; d += 1) {
    const q = { n1: p.n1, n2: p.n2, gelme: d };
    v2.push({ t: d, v: yansimaOrani(q) * 100 });
  }
  D.miniGrafik(ctx, {
    x: pay * 2 + gw, y: 3, w: gw, h: gh,
    baslik: 'Yansıyan ışık oranı   (sıyırma açısında %100’e gider)',
    birim: '%', tEtiket: 'θ₁ (°)',
    imlec: { t: p.gelme, v: yansimaOrani(p) * 100 },
    veri: v2, tMax: 90, vMin: 0, vMax: 100, renk: R.hiz
  });
}

/* ------------------------------------------------------------ Okumalar */

function okumalar(st, pHam) {
  const p = etkin(st, pHam);
  const t2 = kirilmaAcisi(p);
  const sa = sinirAcisi(p);
  const oran = yansimaOrani(p);

  const temel = [
    { et: '1. ortam', dg: ortamAdi(p.n1) + ' · n₁ = ' + D.biçim(p.n1, 3), birim: '' },
    { et: '2. ortam', dg: ortamAdi(p.n2) + ' · n₂ = ' + D.biçim(p.n2, 3), birim: '' },
    { et: 'Gelme açısı θ₁', dg: D.biçim(p.gelme), birim: '°' },
    { et: 'Kırılma açısı θ₂',
      dg: t2 === null ? 'Yok — tam yansıma' : D.biçim((t2 * 180) / Math.PI, 4), birim: t2 === null ? '' : '°' }
  ];

  if (p.mod < 1.5) {
    return temel.concat([
      { et: 'Yansıyan ışık', dg: D.biçim(oran * 100, 3), birim: '%' },
      { et: 'Geçen ışık',    dg: D.biçim((1 - oran) * 100, 3), birim: '%' },
      { et: 'Sapma yönü',
        dg: p.n2 > p.n1 ? 'Normale yaklaşır' : (p.n2 < p.n1 ? 'Normalden uzaklaşır' : 'Sapmaz'), birim: '' }
    ]);
  }

  if (p.mod < 2.5) {
    return temel.concat([
      { et: 'Sınır açısı', dg: sa === null ? 'Yok (n₁ ≤ n₂)' : D.biçim(sa, 4), birim: sa === null ? '' : '°' },
      { et: 'Durum', dg: tamYansimaMi(p) ? 'TAM YANSIMA' : 'Kırılma var', birim: '' },
      { et: 'Yansıyan ışık', dg: D.biçim(oran * 100, 3), birim: '%' }
    ]);
  }

  return temel.concat([
    { et: 'v₁ = c/n₁', dg: D.biçim(hiz(p.n1) / 1e8, 4), birim: '×10⁸ m/s' },
    { et: 'v₂ = c/n₂', dg: D.biçim(hiz(p.n2) / 1e8, 4), birim: '×10⁸ m/s' },
    { et: 'λ₁ (λ₀ = ' + D.biçim(p.lam0) + ' nm)', dg: D.biçim(dalga(p.n1, p.lam0), 4), birim: 'nm' },
    { et: 'λ₂', dg: D.biçim(dalga(p.n2, p.lam0), 4), birim: 'nm' },
    { et: 'Frekans', dg: D.biçim(C_ISIK / (p.lam0 * 1e-9) / 1e12, 4), birim: 'THz · değişmez' }
  ]);
}

/* ------------------------------------------------------------- Kayıt */

D.simler = D.simler || {};
D.simler['kirilma'] = {
  id: 'kirilma',
  baslik: '3.5 · Işığın kırılması · Snell yasası, sınır açısı, dalga boyu',
  yukseklik: 340,
  grafikPanel: true,
  grafikYukseklik: 150,
  parametreler: [
    { anahtar: 'mod', etiket: 'Düzenek', tur: 'secim', deger: 1, secenekler: [
      { d: 1, e: 'Snell yasası' },
      { d: 2, e: 'Sınır açısı · tam yansıma' },
      { d: 3, e: 'Hız ve dalga boyu' }
    ]},
    { anahtar: 'n1',    etiket: '1. ortamın indisi n₁', min: 1.00, max: 2.50, adim: 0.01, deger: 1.00, birim: '' },
    { anahtar: 'n2',    etiket: '2. ortamın indisi n₂', min: 1.00, max: 2.50, adim: 0.01, deger: 1.33, birim: '' },
    { anahtar: 'gelme', etiket: 'Gelme açısı θ₁',       min: 0,    max: 89,   adim: 1,    deger: 40,   birim: '°' },
    { anahtar: 'lam0',  etiket: 'Boşluktaki dalga boyu', min: 400, max: 750,  adim: 10,   deger: 550,  birim: 'nm' }
  ],
  durum, adim, bitti, cizGercek, cizKlasik, cizGrafik, okumalar
};

})();
