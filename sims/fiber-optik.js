(function () {
"use strict";
window.F11 = window.F11 || {};

/* ==========================================================================
   sims/fiber-optik.js
   --------------------------------------------------------------------------
   Konu 3.7 · Fiber optik

   YAPI
   ----
   Fiber, kırılma indisi büyük bir ÇEKİRDEK ile onu saran, indisi biraz daha
   küçük bir KILIF'tan oluşur:  n_ç > n_k

   SINIR AÇISI (çekirdek–kılıf)
   ----------------------------
       sin θ_s = n_k / n_ç

   Işık çekirdek duvarına θ_s'den BÜYÜK bir açıyla çarparsa tam yansır ve
   fiberin içinde kalır. Fiber kıvrılsa bile bu koşul sürdüğü için ışık
   kilometrelerce yol alır.

   KABUL AÇISI ve SAYISAL AÇIKLIK (NA)
   -----------------------------------
   Fiberin düz ucundan θ₀ ile giren ışın içeride θ_r ile ilerler:

       sin θ₀ = n_ç · sin θ_r

   Duvara çarpma açısı (normalden) 90° − θ_r'dir. Tam yansıma koşulu
   90° − θ_r ≥ θ_s ⟹ θ_r ≤ 90° − θ_s. En büyük giriş açısı:

       sin θ₀(maks) = n_ç · cos θ_s = √(n_ç² − n_k²)  ≡  NA

   NA'ya SAYISAL AÇIKLIK denir. Bu açının dışından giren ışık fibere
   girebilir ama tutunamaz, kılıfa kaçar.

   MOD DAĞILIMI (modal dispersiyon)
   --------------------------------
   Eksen boyunca giden ışın en kısa yolu, sınır açısında giden ışın en uzun
   yolu izler. Uzunluk oranı n_ç/n_k'dir. Zaman farkı:

       Δt = (L·n_ç / c) · (n_ç/n_k − 1)

   Bu fark, uzun mesafede ışık darbelerinin birbirine karışmasına yol açar
   ve basamak indisli fiberin veri hızını sınırlar. Çözüm: kademeli indisli
   (graded-index) ya da tek modlu (single-mode) fiber.
   ========================================================================== */

const D = window.F11;
const { R, K } = D;

const C_ISIK = 3e8;      // m/s

/* ------------------------------------------------------------- Fizik */

function rad(d) { return (d * Math.PI) / 180; }
function der(r) { return (r * 180) / Math.PI; }

/** Çekirdek–kılıf sınır açısı (derece). */
function sinirAcisi(p) {
  if (p.nc <= p.nk) return null;
  return der(Math.asin(p.nk / p.nc));
}

/** Sayısal açıklık NA = √(n_ç² − n_k²). */
function sayisalAciklik(p) {
  const q = p.nc * p.nc - p.nk * p.nk;
  return q <= 0 ? 0 : Math.sqrt(q);
}

/** En büyük kabul açısı (derece). */
function kabulAcisi(p) {
  const na = sayisalAciklik(p);
  return na >= 1 ? 90 : der(Math.asin(na));
}

/** Giriş açısı θ₀ için fiber içindeki ilerleme açısı θ_r (derece). */
function icAci(p) {
  const s = Math.sin(rad(p.giris)) / p.nc;
  return der(Math.asin(Math.min(1, s)));
}

/** Duvara çarpma açısı (normalden, derece). */
function duvarAcisi(p) { return 90 - icAci(p); }

function tutunurMu(p) {
  const s = sinirAcisi(p);
  return s !== null && duvarAcisi(p) >= s;
}

/** Eksen boyunca giden ışının süresi (s). */
function sureEksen(p) { return (p.L * 1000 * p.nc) / C_ISIK; }

/** En eğik (sınır açısındaki) ışının süresi (s). */
function sureEnUzun(p) {
  return (p.L * 1000 * p.nc * p.nc) / (p.nk * C_ISIK);
}

/** Mod dağılımı gecikmesi (s). */
function gecikme(p) { return sureEnUzun(p) - sureEksen(p); }

/** 1 km'de yaklaşık yansıma sayısı — seçilen giriş açısı için. */
function yansimaSayisi(p) {
  const t = rad(icAci(p));
  const capM = p.cap * 1e-6;                    // µm → m
  return (Math.tan(t) / capM) * 1000;
}

/* -------------------------------------------------------------- Durum */

/* Oynat'a basılınca düzeneğin anahtar büyüklüğü taranır; kaydırıcı taramanın
   BAŞLADIĞI değeri verir. Böylece her düzenekte bir şeyin nasıl değiştiği
   canlı görünür. */
const TARAMA_PERIYOT = 12;

function durum(p) { return { t: 0, giris: p.giris, L: p.L, nk: p.nk }; }

function adim(st, dt, p) {
  st.t += dt;
  if (p.mod > 2.5) {
    st.L = D.tarama(st.t, p.L, p.L < 50 ? 100 : 1, TARAMA_PERIYOT);
  } else if (p.mod > 1.5) {
    /* Kabul konisi: kılıf indisi taranır; indisler yakınlaştıkça koni daralır,
       uzaklaştıkça açılır. NA = √(n_ç² − n_k²) canlı değişir. */
    st.nk = D.tarama(st.t, p.nk, Math.min(p.nc - 0.005, p.nk < 1.45 ? 1.47 : 1.34), TARAMA_PERIYOT);
  } else {
    /* Kılıf indisi taranır: çekirdeğe yaklaştıkça sınır açısı büyür ve ışın
       tutunamaz hâle gelir. Hem sahne hem NA−n_kılıf eğrisi canlanır. */
    st.nk    = D.tarama(st.t, p.nk, Math.min(p.nc - 0.004, p.nk < 1.45 ? 1.475 : 1.34), TARAMA_PERIYOT);
    st.giris = D.tarama(st.t, p.giris, p.giris < 20 ? 34 : 4, TARAMA_PERIYOT * 1.6);
  }
}

function bitti() { return false; }

function etkin(st, p) {
  return Object.assign({}, p, {
    giris: st.giris ?? p.giris,
    L:     st.L ?? p.L,
    nk:    st.nk ?? p.nk
  });
}

/* --------------------------------------------- Gerçekçi görünüm */

function cizGercek(ctx, w, h, st, pHam) {
  const p = etkin(st, pHam);
  if (p.mod > 2.5) { cizGecikme(ctx, w, h, st, p); return; }
  if (p.mod > 1.5) { cizKabulKonisi(ctx, w, h, p); return; }
  cizYol(ctx, w, h, st, p);
}

/** Fiberin gövdesini çizer, çekirdek sınırlarının y değerlerini döndürür. */
function fiberGovde(ctx, w, h, p, solX) {
  const cy = h * 0.52;
  const cek = Math.min(h * 0.16, 52);           // çekirdek yarı kalınlığı (px)
  const kil = cek + 16;

  D.ortam(ctx, solX, cy - kil, w - solX, kil * 2, '', 'rgba(60,140,205,.14)');
  D.ortam(ctx, solX, cy - cek, w - solX, cek * 2, '', 'rgba(60,140,205,.30)');

  ctx.save();
  ctx.strokeStyle = '#7FD4E6'; ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(solX, cy - cek); ctx.lineTo(w, cy - cek);
  ctx.moveTo(solX, cy + cek); ctx.lineTo(w, cy + cek);
  ctx.stroke();
  ctx.restore();

  D.yaziAydinlik(ctx, 'çekirdek · n = ' + D.biçim(p.nc, 3), solX + 10, cy - cek + 16,
                 '#14506E', '700 11px system-ui, sans-serif', 'left');
  D.yaziAydinlik(ctx, 'kılıf · n = ' + D.biçim(p.nk, 3), solX + 10, cy - kil - 6,
                 '#14506E', '700 11px system-ui, sans-serif', 'left');

  return { cy, cek, kil };
}

/* ---- Mod 1 · Fiber içindeki yol ---- */

function cizYol(ctx, w, h, st, p) {
  const solX = w * 0.16;
  const { cy, cek } = fiberGovde(ctx, w, h, p, solX);

  /* giriş ışını (havada) */
  const t0 = rad(p.giris);
  const gL = Math.min(w * 0.14, 110);
  D.isin(ctx, solX - gL * Math.cos(t0), cy - gL * Math.sin(t0), solX, cy,
         R.ivme, 2.4, true);
  D.kesikliCizgi(ctx, solX - 40, cy, solX + 40, cy, '#4A5F86', 1.3, [5, 4]);
  D.aciYayi(ctx, solX, cy, 34, Math.PI, Math.PI + t0, R.ivme,
            D.biçim(p.giris) + '°');

  /* uç yüzey */
  ctx.save();
  ctx.strokeStyle = '#9AA5B1'; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(solX, cy - cek - 16); ctx.lineTo(solX, cy + cek + 16);
  ctx.stroke(); ctx.restore();

  const tr = rad(icAci(p));
  const tutar = tutunurMu(p);
  const egim = Math.tan(tr);

  /* zikzak yol */
  let x = solX, y = cy, yon = -1;               // önce yukarı
  const renk = tutar ? R.hiz : R.kuvvet;
  let guvenlik = 0;

  while (x < w - 2 && guvenlik++ < 40) {
    const dy = yon < 0 ? -(y - (cy - cek)) : ((cy + cek) - y);
    const dx = egim > 1e-6 ? Math.abs(dy) / egim : (w - x);
    const nx = x + dx, ny = y + dy;

    if (nx >= w - 2 || egim <= 1e-6) {
      D.isin(ctx, x, y, w - 2, y + (w - 2 - x) * egim * yon, renk, 2.6, true);
      break;
    }

    D.isin(ctx, x, y, nx, ny, renk, 2.6, true);

    if (!tutar) {
      /* kılıfa kaçıyor — kırılarak dışarı çıkar */
      const sk = (p.nc / p.nk) * Math.sin(rad(duvarAcisi(p)));
      const tk = Math.asin(Math.min(1, sk));
      const L2 = 90;
      D.isin(ctx, nx, ny, nx + L2 * Math.sin(tk), ny + yon * L2 * Math.cos(tk),
             R.kuvvet, 2.2, true);
      D.yaziAydinlik(ctx, 'ışık kılıfa KAÇIYOR', nx + 12, ny + yon * 44, R.kuvvet,
                     '700 12px system-ui, sans-serif', 'left');
      break;
    }

    /* tam yansıma noktası */
    ctx.save();
    ctx.fillStyle = R.ivme; ctx.globalAlpha = 0.85;
    ctx.beginPath(); ctx.arc(nx, ny, 3.5, 0, 6.2832); ctx.fill();
    ctx.restore();

    x = nx; y = ny; yon = -yon;
  }

  /* duvar açısı bilgisi */
  const sa = sinirAcisi(p);
  D.yaziAydinlik(ctx,
    'Duvara çarpma açısı ' + D.biçim(duvarAcisi(p), 4) + '°   ·   sınır açısı ' +
    (sa === null ? '—' : D.biçim(sa, 4) + '°'),
    10, h - 10, tutar ? R.hiz : R.kuvvet, '700 12px system-ui, sans-serif', 'left');

  D.yaziAydinlik(ctx, tutar ? 'TAM YANSIMA — ışık fiberde kalıyor' : 'Tam yansıma YOK',
                 w - 10, h - 10, tutar ? R.hiz : R.kuvvet,
                 '700 12px system-ui, sans-serif', 'right');
}

/* ---- Mod 2 · Kabul konisi ---- */

function cizKabulKonisi(ctx, w, h, p) {
  const solX = w * 0.40;
  const { cy, cek } = fiberGovde(ctx, w, h, p, solX);

  const kabul = kabulAcisi(p);
  const L = Math.min(w * 0.34, 210);

  /* kabul konisi dolgusu */
  ctx.save();
  ctx.fillStyle = 'rgba(53,192,138,.16)';
  ctx.beginPath();
  ctx.moveTo(solX, cy);
  ctx.lineTo(solX - L * Math.cos(rad(kabul)), cy - L * Math.sin(rad(kabul)));
  ctx.lineTo(solX - L, cy);
  ctx.lineTo(solX - L * Math.cos(rad(kabul)), cy + L * Math.sin(rad(kabul)));
  ctx.closePath(); ctx.fill();
  ctx.restore();

  /* koni sınırları */
  [-1, 1].forEach(s => {
    D.kesikliCizgi(ctx, solX, cy,
                   solX - L * Math.cos(rad(kabul)), cy + s * L * Math.sin(rad(kabul)),
                   R.hiz, 2, [6, 4]);
  });
  D.kesikliCizgi(ctx, solX - L - 10, cy, solX + 40, cy, '#4A5F86', 1.3, [5, 4]);

  /* Deneme ışınları. Açı değerleri her ışının ucuna yazılırsa panelin sol
     kenarından taşıyor; bu yüzden sayı yerine RENK kodu kullanılır ve
     açıklaması altta bir satırda verilir. */
  const acilar = [0, kabul * 0.5, kabul * 0.95, kabul * 1.4, kabul * 2.0];
  acilar.forEach((a, i) => {
    if (a > 88) return;
    const ok = a <= kabul + 1e-9;
    const renk = ok ? R.hiz : R.kuvvet;
    const t = rad(a);
    const s = i % 2 === 0 ? -1 : 1;
    D.isin(ctx, solX - L * Math.cos(t), cy + s * L * Math.sin(t), solX, cy, renk, 2, true);
    /* fiber içinde kısa bir parça */
    const tr = Math.asin(Math.min(1, Math.sin(t) / p.nc));
    const uz = Math.min(w - solX - 6, cek / Math.max(0.02, Math.tan(tr)));
    D.isin(ctx, solX, cy, solX + uz, cy - s * uz * Math.tan(tr),
           renk, 1.8, false);
  });

  D.aciYayi(ctx, solX, cy, 62, Math.PI, Math.PI + rad(kabul), R.hiz,
            D.biçim(kabul, 4) + '°');

  D.yaziAydinlik(ctx, 'NA = ' + D.biçim(sayisalAciklik(p), 4) +
                 '   kabul açısı ' + D.biçim(kabul, 4) + '°',
                 10, h - 28, R.normal, '700 13px system-ui, sans-serif', 'left');
  D.yaziAydinlik(ctx, 'yeşil: koni içinde ⟹ tutunur   ·   kırmızı: dışında ⟹ kaybolur',
                 10, h - 10, R.surtunme, '700 11px system-ui, sans-serif', 'left');
}

/* ---- Mod 3 · Mod dağılımı (gecikme) ---- */

function cizGecikme(ctx, w, h, st, p) {
  const solX = w * 0.10;
  const { cy, cek } = fiberGovde(ctx, w, h, p, solX);
  const sa = sinirAcisi(p);

  /* eksen ışını — en hızlı */
  D.isin(ctx, solX, cy, w - 4, cy, R.hiz, 2.6, true);
  D.yaziAydinlik(ctx, 'eksen ışını · en kısa yol', solX + 12, cy - 8, R.hiz,
                 '700 11px system-ui, sans-serif', 'left');

  /* en eğik ışın — sınır açısında */
  if (sa !== null) {
    const tr = rad(90 - sa);
    const egim = Math.tan(tr);
    let x = solX, y = cy, yon = -1, g = 0;
    while (x < w - 4 && g++ < 30) {
      const dy = yon < 0 ? -(y - (cy - cek)) : ((cy + cek) - y);
      const dx = egim > 1e-6 ? Math.abs(dy) / egim : (w - x);
      let nx = x + dx, ny = y + dy;
      if (nx > w - 4) { ny = y + (w - 4 - x) * egim * yon; nx = w - 4; }
      D.isin(ctx, x, y, nx, ny, R.kuvvet, 2.2, false);
      x = nx; y = ny; yon = -yon;
    }
    D.yaziAydinlik(ctx, 'sınır açısındaki ışın · en uzun yol', solX + 12, cy + cek + 26,
                   R.kuvvet, '700 11px system-ui, sans-serif', 'left');
  }

  /* darbe gösterimi */
  const gec = gecikme(p) * 1e9;                  // ns
  const pay = Math.min(1, gec / 400);
  const dx0 = w * 0.62, dy0 = h * 0.12;
  darbe(ctx, dx0, dy0, 60, 14, R.hiz, 'gönderilen darbe');
  darbe(ctx, dx0, dy0 + 34, 60 + pay * 150, 14, R.kuvvet, 'varan darbe · yayıldı');

  D.yaziAydinlik(ctx,
    'Gecikme Δt = ' + D.biçim(gec, 4) + ' ns   (' + D.biçim(p.L) + ' km)',
    10, h - 28, R.normal, '700 13px system-ui, sans-serif', 'left');
  D.yaziAydinlik(ctx,
    'Darbeler birbirine karışmadan en fazla ' + D.biçim(1 / (2 * gecikme(p)) / 1e6, 3) +
    ' Mb/s gönderilebilir',
    10, h - 10, R.surtunme, '700 12px system-ui, sans-serif', 'left');
}

function darbe(ctx, x, y, gen, yuk, renk, etiket) {
  ctx.save();
  ctx.fillStyle = renk; ctx.globalAlpha = 0.75;
  ctx.fillRect(x, y, gen, yuk);
  ctx.restore();
  D.yaziAydinlik(ctx, etiket, x + gen + 8, y + yuk - 2, renk,
                 '600 11px system-ui, sans-serif', 'left');
}

/* ------------------------------------------ Klasik fizik görünümü */

function cizKlasik(ctx, w, h, st, pHam) {
  const p = etkin(st, pHam);
  D.izgara(ctx, w, h, 26);
  const sa = sinirAcisi(p);
  const na = sayisalAciklik(p);

  D.yaziHaleli(ctx, 'Fiber optik', 12, 22, K.beyaz,
               '700 12px system-ui, sans-serif', 'left');

  const sol = [
    ['sin θ_s = n_k / n_ç', K.beyaz, '700 13px system-ui, sans-serif'],
    ['n_ç = ' + D.biçim(p.nc, 3), R.hiz, '12px system-ui, sans-serif'],
    ['n_k = ' + D.biçim(p.nk, 3), R.kuvvet, '12px system-ui, sans-serif'],
    ['θ_s = ' + (sa === null ? 'YOK (n_ç ≤ n_k)' : D.biçim(sa, 4) + '°'),
      R.surtunme, '700 13px system-ui, sans-serif'],
    ['', K.metin2, '11px'],
    ['NA = √(n_ç² − n_k²)', K.beyaz, '700 12px system-ui, sans-serif'],
    ['NA = ' + D.biçim(na, 4), R.normal, '700 13px system-ui, sans-serif'],
    ['Kabul açısı = ' + D.biçim(kabulAcisi(p), 4) + '°', R.ivme, '700 13px system-ui, sans-serif'],
    ['', K.metin2, '11px'],
    ['θ₀ = ' + D.biçim(p.giris) + '° ⟹ θ_r = ' + D.biçim(icAci(p), 4) + '°',
      K.metin2, '11px system-ui, sans-serif'],
    ['Duvara çarpma = ' + D.biçim(duvarAcisi(p), 4) + '°', K.metin2, '11px system-ui, sans-serif'],
    [tutunurMu(p) ? 'θ > θ_s ⟹ TUTUNUR' : 'θ < θ_s ⟹ KAÇAR',
      tutunurMu(p) ? R.hiz : R.kuvvet, '700 13px system-ui, sans-serif']
  ];
  let sy = 46;
  sol.forEach(([t, c, f]) => { if (t) D.yaziHaleli(ctx, t, 12, sy, c, f, 'left'); sy += 17; });

  const sx = w * 0.54;
  const sag = [
    ['Mod dağılımı', K.beyaz, '700 12px system-ui, sans-serif'],
    ['Δt = (L·n_ç/c)·(n_ç/n_k − 1)', K.metin, '11px system-ui, sans-serif'],
    ['', K.metin2, '11px'],
    ['L = ' + D.biçim(p.L) + ' km', R.normal, '12px system-ui, sans-serif'],
    ['Eksen ışını: ' + D.biçim(sureEksen(p) * 1e6, 4) + ' µs', R.hiz, '12px system-ui, sans-serif'],
    ['En eğik ışın: ' + D.biçim(sureEnUzun(p) * 1e6, 4) + ' µs', R.kuvvet, '12px system-ui, sans-serif'],
    ['Δt = ' + D.biçim(gecikme(p) * 1e9, 4) + ' ns', R.surtunme, '700 13px system-ui, sans-serif'],
    ['', K.metin2, '11px'],
    ['Yol farkı oranı = n_ç/n_k', K.metin2, '11px system-ui, sans-serif'],
    ['= ' + D.biçim(p.nc / p.nk, 5), K.metin2, '11px system-ui, sans-serif'],
    ['', K.metin2, '11px'],
    ['1 km’de yansıma ≈', K.beyaz, '700 12px system-ui, sans-serif'],
    [D.biçim(yansimaSayisi(p) / 1000, 4) + ' bin kez', R.ivme, '700 12px system-ui, sans-serif']
  ];
  sy = 46;
  sag.forEach(([t, c, f]) => { if (t) D.yaziHaleli(ctx, t, sx, sy, c, f, 'left'); sy += 17; });
}

/* ---------------------------------------------------- Grafik paneli */

function cizGrafik(ctx, w, h, st, pHam) {
  const p = etkin(st, pHam);
  const pay = 8, gw = (w - pay * 3) / 2, gh = h - 6;

  /* NA − kılıf indisi */
  const v1 = [];
  for (let nk = 1.30; nk <= p.nc; nk += 0.002) {
    const q = p.nc * p.nc - nk * nk;
    v1.push({ t: nk, v: q <= 0 ? 0 : Math.sqrt(q) });
  }
  D.miniGrafik(ctx, {
    x: pay, y: 3, w: gw, h: gh,
    baslik: 'NA − kılıf indisi   (indisler yakınsa NA küçülür)',
    birim: '', tEtiket: 'n_kılıf',
    imlec: { t: p.nk, v: sayisalAciklik(p) },
    veri: v1, tMin: 1.30, tMax: Math.max(1.31, p.nc), vMin: 0,
    vMax: Math.max(0.05, Math.sqrt(Math.max(0, p.nc * p.nc - 1.69)) * 1.1),
    renk: R.normal
  });

  /* gecikme − uzunluk */
  const v2 = [];
  const kat = (p.nc / C_ISIK) * (p.nc / p.nk - 1) * 1000 * 1e9;   // ns/km
  for (let L = 0; L <= 100; L += 2) v2.push({ t: L, v: kat * L });
  D.miniGrafik(ctx, {
    x: pay * 2 + gw, y: 3, w: gw, h: gh,
    baslik: 'Gecikme − uzunluk   (' + D.biçim(kat, 4) + ' ns/km · DOĞRU orantı)',
    birim: 'ns', tEtiket: 'L (km)',
    imlec: { t: p.L, v: gecikme(p) * 1e9 },
    veri: v2, tMax: 100, vMin: 0, vMax: Math.max(1, kat * 100 * 1.05), renk: R.kuvvet
  });
}

/* ------------------------------------------------------------ Okumalar */

function okumalar(st, pHam) {
  const p = etkin(st, pHam);
  const sa = sinirAcisi(p);
  const na = sayisalAciklik(p);

  if (p.mod < 1.5) {
    return [
      { et: 'Çekirdek n_ç',    dg: D.biçim(p.nc, 3), birim: '' },
      { et: 'Kılıf n_k',       dg: D.biçim(p.nk, 3), birim: '' },
      { et: 'Sınır açısı θ_s', dg: sa === null ? 'Yok' : D.biçim(sa, 4), birim: sa === null ? '' : '°' },
      { et: 'Giriş açısı θ₀',  dg: D.biçim(p.giris), birim: '°' },
      { et: 'İçerideki açı θ_r', dg: D.biçim(icAci(p), 4), birim: '°' },
      { et: 'Duvara çarpma',   dg: D.biçim(duvarAcisi(p), 4), birim: '°' },
      { et: 'Sonuç',           dg: tutunurMu(p) ? 'Tam yansıma · tutunur' : 'Kılıfa kaçar', birim: '' }
    ];
  }

  if (p.mod < 2.5) {
    return [
      { et: 'Sayısal açıklık NA', dg: D.biçim(na, 4), birim: '' },
      { et: 'Kabul açısı',        dg: D.biçim(kabulAcisi(p), 4), birim: '°' },
      { et: 'Kabul konisi',       dg: D.biçim(2 * kabulAcisi(p), 4), birim: '° (tam açı)' },
      { et: 'Sınır açısı θ_s',    dg: sa === null ? 'Yok' : D.biçim(sa, 4), birim: sa === null ? '' : '°' },
      { et: 'Giriş açısı θ₀',     dg: D.biçim(p.giris), birim: '°' },
      { et: 'Bu ışın',            dg: p.giris <= kabulAcisi(p) ? 'Kabul edilir' : 'Kaybolur', birim: '' }
    ];
  }

  const gec = gecikme(p);
  return [
    { et: 'Fiber uzunluğu L',  dg: D.biçim(p.L),                 birim: 'km' },
    { et: 'Eksen ışını süresi',dg: D.biçim(sureEksen(p) * 1e6, 5), birim: 'µs' },
    { et: 'En eğik ışın süresi',dg: D.biçim(sureEnUzun(p) * 1e6, 5), birim: 'µs' },
    { et: 'Gecikme Δt',        dg: D.biçim(gec * 1e9, 4),        birim: 'ns' },
    { et: 'Birim uzunlukta',   dg: D.biçim(gec * 1e9 / Math.max(0.01, p.L), 4), birim: 'ns/km' },
    { et: 'En yüksek veri hızı',dg: D.biçim(1 / (2 * gec) / 1e6, 4), birim: 'Mb/s' }
  ];
}

/* ------------------------------------------------------------- Kayıt */

D.simler = D.simler || {};
D.simler['fiber-optik'] = {
  id: 'fiber-optik',
  baslik: '3.7 · Fiber optik · tam yansıma, sayısal açıklık, mod dağılımı',
  yukseklik: 330,
  grafikPanel: true,
  grafikYukseklik: 150,
  parametreler: [
    { anahtar: 'mod', etiket: 'Düzenek', tur: 'secim', deger: 1, secenekler: [
      { d: 1, e: 'Fiber içindeki yol' },
      { d: 2, e: 'Kabul konisi · NA' },
      { d: 3, e: 'Mod dağılımı · gecikme' }
    ]},
    { anahtar: 'nc',    etiket: 'Çekirdek indisi n_ç', min: 1.40, max: 1.70, adim: 0.005, deger: 1.48, birim: '' },
    { anahtar: 'nk',    etiket: 'Kılıf indisi n_k',    min: 1.30, max: 1.68, adim: 0.005, deger: 1.46, birim: '' },
    { anahtar: 'giris', etiket: 'Giriş açısı θ₀',      min: 0,    max: 40,   adim: 1,     deger: 8,    birim: '°' },
    { anahtar: 'L',     etiket: 'Fiber uzunluğu',      min: 1,    max: 100,  adim: 1,     deger: 10,   birim: 'km' },
    { anahtar: 'cap',   etiket: 'Çekirdek çapı',       min: 5,    max: 100,  adim: 5,     deger: 50,   birim: 'µm' }
  ],
  durum, adim, bitti, cizGercek, cizKlasik, cizGrafik, okumalar
};

})();
