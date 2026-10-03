(function () {
"use strict";
window.F11 = window.F11 || {};

/* ==========================================================================
   sims/kirilma.js
   --------------------------------------------------------------------------
   Konu 3.4 · Işığın kırılması  (MEB 11, s.343-353)

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
   için %4,3, hava–elmas için %17. Elmasın parlaklığının bir sebebi budur.

   SAPMA AÇISI (kitap Şekil 3.18)
   ------------------------------
       α = |θ₁ − θ₂|        gelme doğrultusu ile kırılan ışın arasındaki açı

   BEYAZ IŞIK (kitap Şekil 3.22 ve 3.23)
   -------------------------------------
   Suyun kırılma indisi dalga boyuna bağlıdır (Cauchy bağıntısı, 20 °C):
       n(λ) = 1,3252 + 2985 / λ²        (λ nm; 404 nm’de 1,3435, 706 nm’de 1,3312)
   Mor ışığın n’si en büyük ⟹ en çok kırılır, sınır açısı en KÜÇÜKTÜR.
   Su→hava sınır açısı: kırmızı (680 nm) 48,67° · mor (410 nm) 48,12°.
   ========================================================================== */

const D = window.F11;
const { R, K } = D;

const C_ISIK = 3e8;             // m/s

/* Kitap Tablo 3.5 (s.346) ve s.348 örneğindeki indisler — kaydırıcı değeri
   bunlardan birine denk gelirse ortamın adı yazılır. */
const ORTAMLAR = [
  { n: 1.000, ad: 'hava' },
  { n: 1.309, ad: 'buz' },
  { n: 1.333, ad: 'su' },
  { n: 1.361, ad: 'etil alkol' },
  { n: 1.473, ad: 'gliserin' },
  { n: 1.501, ad: 'benzen' },
  { n: 1.51,  ad: 'pleksiglas' },
  { n: 1.52,  ad: 'cam' },
  { n: 1.544, ad: 'kuartz' },
  { n: 2.41,  ad: 'elmas' }
];

function ortamAdi(n) {
  let en = ORTAMLAR[0], fark = 9;
  for (const o of ORTAMLAR) {
    const d = Math.abs(o.n - n);
    if (d < fark) { fark = d; en = o; }
  }
  return fark < 0.006 ? en.ad : 'ortam';
}

/* Beyaz ışığın renkleri (kitap Şekil 3.23’teki sıra) ve suyun indisi. */
const RENKLER = [
  { ad: 'kırmızı',  l: 680, c: '#E53935' },
  { ad: 'turuncu',  l: 610, c: '#FB8C00' },
  { ad: 'sarı',     l: 580, c: '#E8B800' },
  { ad: 'yeşil',    l: 530, c: '#2E9E4F' },
  { ad: 'mavi',     l: 470, c: '#1E88E5' },
  { ad: 'lacivert', l: 440, c: '#3F3FB0' },
  { ad: 'mor',      l: 410, c: '#8E24AA' }
];
function nSu(l) { return 1.3252 + 2985 / (l * l); }
const ABARTMA = 25;              // 4. düzenekte renkler arası açı farkının çizim büyütmesi
const B5_ALT = 47.4, B5_UST = 49.4;   // 5. düzenekte gelme açısının tarandığı dar aralık

/** Beyaz ışık düzeneklerinde renk için parametreler (4: hava→su, 5: su→hava). */
function renkP(p, l) {
  return p.mod < 4.5 ? { n1: 1.000, n2: nSu(l), gelme: p.gelme }
                     : { n1: nSu(l), n2: 1.000, gelme: p.gelme };
}
function derece(rad) { return rad * 180 / Math.PI; }

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

function durum(p) { return { t: 0, gelme: p.mod > 4.5 ? B5_ALT : p.gelme }; }

function adim(st, dt, p) {
  st.t += dt;
  /* 5. düzenek: renklerin sınır açıları 48,1°–48,7° arasında olduğundan
     tarama bu dar aralıkta, yavaş yapılır; renkler TEK TEK tam yansımaya geçer. */
  if (p.mod > 4.5) { st.gelme = D.tarama(st.t, B5_ALT, B5_UST, 16); return; }
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
  /* 2. düzenekte optik daire, derece yazıları ve lazer panele sığsın diye küçük */
  const L = Math.min(w * 0.42, h * 0.44) * (p.mod > 1.5 && p.mod < 2.5 ? 0.8 : 1);
  if (p.mod > 3.5) { cizBeyaz(ctx, w, h, st, p, ox, oy, L); return; }
  if (p.mod > 1.5 && p.mod < 2.5) optikDaire(ctx, w, h, p, ox, oy, L);
  else {
    D.ortam(ctx, 0, 0, w, oy, '', renkOrtam(p.n1, 0.55));
    D.ortam(ctx, 0, oy, w, h - oy,
            ortamAdi(p.n2) + '  ·  n₂ = ' + D.biçim(p.n2, 3), renkOrtam(p.n2, 0.95));
    D.yaziAydinlik(ctx, ortamAdi(p.n1) + '  ·  n₁ = ' + D.biçim(p.n1, 3),
                   w - 10, 18, '#1B3A52', '700 12px system-ui, sans-serif', 'right');
  }

  /* normal */
  D.kesikliCizgi(ctx, ox, oy - h * 0.44, ox, oy + h * 0.44, '#4A5F86', 1.5, [6, 5]);
  D.yaziAydinlik(ctx, 'normal', ox + 6, oy - h * 0.30, '#4A5F86',
                 '600 11px system-ui, sans-serif', 'left');

  if (p.mod > 2.5) { cizDalga(ctx, w, h, st, p, ox, oy); return; }

  const t1 = gelmeRad(p);
  const t2 = kirilmaAcisi(p);

  /* gelen ışın — sol üstten O'ya (2. düzenekte optik dairenin dışındaki
     lazerden; yarım dairenin eğri yüzüne dik girdiği için orada kırılmaz) */
  const Lg = p.mod > 1.5 && p.mod < 2.5 ? L * 1.02 + 22 : L;
  const gx = ox - Math.sin(t1) * Lg, gy = oy - Math.cos(t1) * Lg;
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

    /* sapma açısı α: gelme doğrultusunun uzantısı ile kırılan ışın arası */
    const alfa = Math.abs(p.gelme - derece(t2));
    if (p.mod < 1.5 && alfa > 1.5) {
      D.kesikliCizgi(ctx, ox, oy, ox + Math.sin(t1) * L * 0.85, oy + Math.cos(t1) * L * 0.85,
                     'rgba(90,100,130,.75)', 1.4, [5, 4]);
      /* yay ile yazısı: yazı DIŞTAKİ ışının sağına, kırılan-% yazısından uzakta */
      const Ra = L * 0.45, tDis = Math.max(t1, t2);
      D.aciYayi(ctx, ox, oy, Ra, Math.PI / 2 - t1, Math.PI / 2 - t2, R.surtunme, '');
      D.yaziAydinlik(ctx, 'sapma α = ' + D.biçim(alfa, 3) + '°', ox + Math.sin(tDis) * Ra + 8,
                     oy + Math.cos(tDis) * Ra + 4, R.surtunme, '700 11px system-ui, sans-serif', 'left');
    }
  }

  /* sınır açısı göstergesi */
  const sa = sinirAcisi(p);
  if (p.mod > 1.5 && sa !== null) {
    const ts = (sa * Math.PI) / 180;
    D.kesikliCizgi(ctx, ox, oy, ox - Math.sin(ts) * L * 1.02, oy - Math.cos(ts) * L * 1.02,
                   R.surtunme, 2, [5, 4]);
    /* çizginin ucunda yalnız θs; değeri (lazer ve derece
       yazılarıyla çakışmasın) */
    D.yaziAydinlik(ctx, 'θs', ox - Math.sin(ts) * L * 1.02 + 4, oy - Math.cos(ts) * L * 1.02 + 14,
                   R.surtunme, '700 11px system-ui, sans-serif', 'left');
    D.yaziAydinlik(ctx, 'sınır açısı θs = ' + D.biçim(sa, 3) + '°', 10, h - 28,
                   R.surtunme, '700 12px system-ui, sans-serif', 'left');
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

/* ---- Mod 2 · Optik daire (kitap 5. Etkinlik, Şekil I–III) ----
   Yarım daire cam (n₁) optik dairenin merkezine oturur; lazer dairenin
   kenarından merkeze (O) doğru gönderilir. Işın camın EĞRİ yüzüne dik girdiği
   için orada kırılmaz; kırılma yalnızca düz yüzde, O noktasında olur. */
function optikDaire(ctx, w, h, p, ox, oy, L) {
  const Rd = L * 1.02;
  D.ortam(ctx, 0, 0, w, h, '', renkOrtam(p.n2, 0.95));
  ctx.save();
  ctx.fillStyle = 'rgba(255,255,255,.55)';                       // optik dairenin yüzü
  ctx.beginPath(); ctx.arc(ox, oy, Rd, 0, 6.2832); ctx.fill();
  ctx.fillStyle = renkOrtam(Math.max(p.n1, 1.3), 1.7);            // yarım daire kesitli cam
  ctx.strokeStyle = 'rgba(40,110,170,.9)'; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(ox + Rd * 0.94, oy);
  ctx.arc(ox, oy, Rd * 0.94, 0, Math.PI, true); ctx.closePath(); ctx.fill(); ctx.stroke();
  /* derece bölmeleri — 5°’de bir, 10°’de uzun */
  ctx.strokeStyle = 'rgba(40,60,90,.7)'; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.arc(ox, oy, Rd, 0, 6.2832);
  for (let d = 0; d < 360; d += 5) {
    const a = d * Math.PI / 180, uz = d % 10 === 0 ? 8 : 4;
    ctx.moveTo(ox + Math.cos(a) * Rd, oy + Math.sin(a) * Rd);
    ctx.lineTo(ox + Math.cos(a) * (Rd + uz), oy + Math.sin(a) * (Rd + uz));
  }
  ctx.stroke();
  ctx.restore();
  /* açı yazıları NORMALDEN ölçülür (kitaptaki optik daire gibi) */
  for (let d = 30; d <= 90; d += 30) for (const sx of [-1, 1]) for (const sy of [-1, 1]) {
    if (d === 90 && sy > 0) continue;
    const a = d * Math.PI / 180;
    D.yaziAydinlik(ctx, d + '°', ox + sx * Math.sin(a) * (Rd + 17), oy + sy * Math.cos(a) * (Rd + 17) + 4,
                   'rgba(40,60,90,.85)', '600 10px system-ui, sans-serif', 'center');
  }
  /* lazer — ışını merkeze doğrultulmuş */
  const t1 = gelmeRad(p), Lg = Rd + 22;
  ctx.save();
  ctx.translate(ox - Math.sin(t1) * Lg, oy - Math.cos(t1) * Lg);
  ctx.rotate(Math.atan2(Math.cos(t1), Math.sin(t1)));
  ctx.fillStyle = '#2A3242'; ctx.fillRect(-24, -6, 26, 12);
  ctx.fillStyle = '#E53935'; ctx.fillRect(0, -3, 3, 6);
  ctx.restore();
  D.yaziAydinlik(ctx, 'yarım daire: ' + ortamAdi(p.n1) + ' · n₁ = ' + D.biçim(p.n1, 3),
                 w - 10, 20, '#1B3A52', '700 12px system-ui, sans-serif', 'right');
  D.yaziAydinlik(ctx, 'dışı: ' + ortamAdi(p.n2) + ' · n₂ = ' + D.biçim(p.n2, 3),
                 w - 10, 38, '#1B3A52', '700 12px system-ui, sans-serif', 'right');
}

/* ---- Mod 4–5 · Beyaz ışık ---- */

/** Beyaz ışık: yedi rengin yan yana şeridi (yönü u, dik doğrultu v). */
function serit(ctx, x1, y1, x2, y2, alfalar) {
  const dx = x2 - x1, dy = y2 - y1, uz = Math.hypot(dx, dy) || 1;
  const vx = -dy / uz, vy = dx / uz;
  ctx.save(); ctx.lineWidth = 1.7;
  RENKLER.forEach((c, i) => {
    const o = (i - 3) * 1.6, a = alfalar ? alfalar[i] : 1;
    if (a <= 0.01) return;
    ctx.globalAlpha = a; ctx.strokeStyle = c.c;
    ctx.beginPath(); ctx.moveTo(x1 + vx * o, y1 + vy * o); ctx.lineTo(x2 + vx * o, y2 + vy * o); ctx.stroke();
  });
  ctx.restore();
}

function cizBeyaz(ctx, w, h, st, p, ox, oy, L) {
  const havaSu = p.mod < 4.5;
  D.ortam(ctx, 0, 0, w, oy, '', havaSu ? renkOrtam(1, 0.55) : renkOrtam(1.333, 0.55));
  D.ortam(ctx, 0, oy, w, h - oy, '', havaSu ? renkOrtam(1.333, 0.95) : renkOrtam(1, 0.95));
  D.yaziAydinlik(ctx, havaSu ? 'hava · n = 1' : 'su · n ≈ 1,33 (renge göre değişir)', w - 10, 20,
                 '#1B3A52', '700 12px system-ui, sans-serif', 'right');
  D.yaziAydinlik(ctx, havaSu ? 'su · n ≈ 1,33 (renge göre değişir)' : 'hava · n = 1', w - 10, oy + 46,
                 '#1B3A52', '700 12px system-ui, sans-serif', 'right');
  D.kesikliCizgi(ctx, ox, oy - h * 0.44, ox, oy + h * 0.44, '#4A5F86', 1.5, [6, 5]);

  const t1 = gelmeRad(p);
  const gx = ox - Math.sin(t1) * L, gy = oy - Math.cos(t1) * L;
  serit(ctx, gx, gy, ox, oy);
  D.yaziAydinlik(ctx, 'beyaz ışık', gx + 6, gy - 6, '#3A4660', '700 11px system-ui, sans-serif', 'left');
  D.aciYayi(ctx, ox, oy, 42, -Math.PI / 2, -Math.PI / 2 - t1, R.ivme,
            D.biçim(p.gelme, havaSu ? 0 : 2) + '°');
  const rx = ox + Math.sin(t1) * L, ry = oy - Math.cos(t1) * L;       // yansıyan yön

  if (havaSu) {
    /* hava → su: hepsi kırılır; mor en çok. Renkler arası fark çok küçük
       (en fazla ~0,5°) olduğu için ABARTMA kat büyütülerek çizilir. */
    const ty = kirilmaAcisi(renkP(p, 580));
    const fr = yansimaOrani(renkP(p, 580));
    serit(ctx, ox, oy, rx, ry, RENKLER.map(() => Math.min(1, 0.1 + fr * 2)));
    RENKLER.forEach(c => {
      const t2 = kirilmaAcisi(renkP(p, c.l));
      const td = ty + ABARTMA * (t2 - ty);
      D.isin(ctx, ox, oy, ox + Math.sin(td) * L, oy + Math.cos(td) * L, c.c, 2, true);
    });
    const tk = kirilmaAcisi(renkP(p, 680)), tm = kirilmaAcisi(renkP(p, 410));
    const tdk = ty + ABARTMA * (tk - ty), tdm = ty + ABARTMA * (tm - ty);
    if (p.gelme > 8) {
      D.yaziAydinlik(ctx, 'kırmızı', ox + Math.sin(tdk) * L + 6, oy + Math.cos(tdk) * L + 4, '#C62828',
                     '700 11px system-ui, sans-serif', 'left');
      D.yaziAydinlik(ctx, 'mor', ox + Math.sin(tdm) * L - 6, oy + Math.cos(tdm) * L + 4, '#7B1FA2',
                     '700 11px system-ui, sans-serif', 'right');
    }
    D.yaziAydinlik(ctx, 'Beyaz ışık havadan suya: MOR en çok kırılır (normale en çok yaklaşır)', 10, h - 26,
                   R.surtunme, '700 12px system-ui, sans-serif', 'left');
    D.yaziAydinlik(ctx, 'Renkler arası açı ×' + ABARTMA + ' büyütülerek çizildi · gerçek fark ' +
                   D.biçim(derece(tk - tm), 3) + '°', 10, h - 9, R.mur, '600 11px system-ui, sans-serif', 'left');
    return;
  }

  /* su → hava: her rengin sınır açısı farklı; kırılan ışınlar GERÇEK açıyla */
  const alfalar = [];
  const yansiyan = [], gecen = [];
  RENKLER.forEach(c => {
    const cp = renkP(p, c.l), t2 = kirilmaAcisi(cp), fr = yansimaOrani(cp);
    alfalar.push(t2 === null ? 1 : Math.max(0.08, fr));
    if (t2 === null) { yansiyan.push(c.ad); return; }
    gecen.push(c.ad);
    ctx.save(); ctx.globalAlpha = Math.max(0.3, 1 - fr);
    D.isin(ctx, ox, oy, ox + Math.sin(t2) * L, oy + Math.cos(t2) * L, c.c, 2, true);
    ctx.restore();
  });
  serit(ctx, ox, oy, rx, ry, alfalar);
  D.yaziAydinlik(ctx, 'Havaya geçen: ' + (gecen.length ? gecen.join(', ') : '—'), 10, h - 26,
                 R.kuvvet, '700 12px system-ui, sans-serif', 'left');
  D.yaziAydinlik(ctx, 'Tam yansıyan: ' + (yansiyan.length ? yansiyan.join(', ') : '—'), 10, h - 9,
                 '#5B3FA0', '700 12px system-ui, sans-serif', 'left');
}

function klasikBeyaz(ctx, w, h, p) {
  const havaSu = p.mod < 4.5;
  D.yaziHaleli(ctx, havaSu ? 'Beyaz ışık · hava → su' : 'Beyaz ışık · su → hava · θ₁ = ' + D.biçim(p.gelme, 2) + '°',
               12, 44, K.beyaz, '700 12px system-ui, sans-serif', 'left');
  const kx = [12, w * 0.24, w * 0.40, w * 0.58, w * 0.76];
  const bas = ['renk', 'λ (nm)', 'n (su)', havaSu ? 'θ₂ (°)' : 'θ_s (°)', havaSu ? '' : 'durum'];
  bas.forEach((t, i) => t && D.yaziHaleli(ctx, t, kx[i], 68, K.metin2, '700 11px system-ui, sans-serif', 'left'));
  RENKLER.forEach((c, i) => {
    const y = 88 + i * 19, cp = renkP(p, c.l);
    let dg, durum = '';
    if (havaSu) dg = D.biçim(derece(kirilmaAcisi(cp)), 3);
    else {
      const sa = sinirAcisi(cp);
      dg = D.biçim(sa, 2);
      durum = Math.abs(p.gelme - sa) < 0.02 ? 'sınırda' : (p.gelme > sa ? 'tam yansıma' : 'geçer');
    }
    const satir = [c.ad, String(c.l), D.biçim(nSu(c.l), 4), dg, durum];
    satir.forEach((t, j) => t && D.yaziHaleli(ctx, t, kx[j], y, c.c, '700 12px system-ui, sans-serif', 'left'));
  });
  const alt = havaSu
    ? ['n(λ) = 1,3252 + 2985/λ²   (su, 20 °C)',
       'λ küçüldükçe n büyür ⟹ mor en çok kırılır',
       'θ₂(kırmızı) − θ₂(mor) = ' + D.biçim(derece(kirilmaAcisi(renkP(p, 680)) - kirilmaAcisi(renkP(p, 410))), 3) + '°']
    : ['sin θ_s = 1 / n(λ)',
       'Kırmızının sınır açısı en büyük, morunki en küçük',
       'θ₁ > θ_s olan renkler tam yansır (kitap Şekil 3.23)'];
  alt.forEach((t, i) => D.yaziHaleli(ctx, t, 12, 238 + i * 18, i ? K.metin2 : K.beyaz,
                                     (i ? '' : '700 ') + '12px system-ui, sans-serif', 'left'));
}

function grafikBeyaz(ctx, pay, gw, gh, p) {
  const k = RENKLER[0], m = RENKLER[6];
  if (p.mod < 4.5) {
    const v1 = [], v2 = [];
    for (let d = 0; d <= 89; d += 1) {
      const q = Object.assign({}, p, { gelme: d });
      v1.push({ t: d, v: derece(kirilmaAcisi(renkP(q, 580))) });
      v2.push({ t: d, v: derece(kirilmaAcisi(renkP(q, k.l)) - kirilmaAcisi(renkP(q, m.l))) });
    }
    D.miniGrafik(ctx, { x: pay, y: 3, w: gw, h: gh, baslik: 'θ₂ − θ₁   (sarı ışık, hava → su)',
      birim: '°', tEtiket: 'θ₁ (°)', veri: v1, tMax: 90, vMin: 0, vMax: 50, renk: '#C99A00',
      imlec: { t: p.gelme, v: derece(kirilmaAcisi(renkP(p, 580))) } });
    D.miniGrafik(ctx, { x: pay * 2 + gw, y: 3, w: gw, h: gh,
      baslik: 'Renk ayrışması θ₂(kırmızı) − θ₂(mor) − θ₁', birim: '°', tEtiket: 'θ₁ (°)', veri: v2,
      tMax: 90, vMin: 0, vMax: 0.6, renk: m.c,
      imlec: { t: p.gelme, v: derece(kirilmaAcisi(renkP(p, k.l)) - kirilmaAcisi(renkP(p, m.l))) } });
    return;
  }
  /* su → hava: dar aralıkta, kırmızı ve mor için iki eğri üst üste */
  const seri = (c, f) => {
    const v = [];
    for (let i = 0; i <= 200; i++) {
      const d = B5_ALT + (B5_UST - B5_ALT) * i / 200;
      const y = f(renkP(Object.assign({}, p, { gelme: d }), c.l));
      if (y !== null) v.push({ t: d, v: y });
    }
    return v;
  };
  const gecis = cp => (1 - yansimaOrani(cp)) * 100;
  const kirA = cp => { const t2 = kirilmaAcisi(cp); return t2 === null ? null : derece(t2); };
  [k, m].forEach((c, i) => {
    const cp = renkP(p, c.l);
    D.miniGrafik(ctx, { x: pay, y: 3, w: gw, h: gh,
      baslik: i ? '' : 'Havaya geçen ışık % − θ₁   (kırmızı · mor)', birim: '%', tEtiket: 'θ₁ (°)',
      veri: seri(c, gecis), tMin: B5_ALT, tMax: B5_UST, vMin: 0, vMax: 100, renk: c.c,
      imlec: { t: p.gelme, v: gecis(cp) } });
    const t2 = kirA(cp);
    D.miniGrafik(ctx, { x: pay * 2 + gw, y: 3, w: gw, h: gh,
      baslik: i ? '' : 'Kırılma açısı θ₂ − θ₁   (90°’de sınır açısı)', birim: '°', tEtiket: 'θ₁ (°)',
      veri: seri(c, kirA), tMin: B5_ALT, tMax: B5_UST, vMin: 60, vMax: 90, sifirdanBasla: false, renk: c.c,
      imlec: t2 === null ? null : { t: p.gelme, v: t2 } });
  });
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
    /* dik geliş — cepheler yüzeye paralel ve AŞAĞI (yüzeye doğru) ilerler */
    const faz = (st.t * 60) % lam1;
    ctx.strokeStyle = R.ivme;
    for (let y = oy - lam1 + faz; y > 0; y -= lam1) cizgi(ctx, 0, y, w, y);
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
  if (p.mod > 3.5) { klasikBeyaz(ctx, w, h, p); return; }
  const t2 = kirilmaAcisi(p);
  const sa = sinirAcisi(p);
  const oran = yansimaOrani(p);


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
      R.kuvvet, '700 13px system-ui, sans-serif'],
    ['', K.metin2, '11px'],
    ['Sapma açısı α = |θ₁ − θ₂|', K.beyaz, '700 12px system-ui, sans-serif'],
    ['α = ' + (t2 === null ? '—' : D.biçim(Math.abs(p.gelme - derece(t2)), 3) + '°'),
      R.surtunme, '700 13px system-ui, sans-serif']
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
  if (p.mod > 3.5) { grafikBeyaz(ctx, pay, gw, gh, p); return; }

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
  if (p.mod > 3.5) {
    const kr = renkP(p, RENKLER[0].l), mr = renkP(p, RENKLER[6].l);
    if (p.mod < 4.5) {
      const a = derece(kirilmaAcisi(kr)), b = derece(kirilmaAcisi(mr));
      return [
        { et: 'Geçiş',               dg: 'hava → su · beyaz ışık', birim: '' },
        { et: 'Gelme açısı θ₁',      dg: D.biçim(p.gelme),  birim: '°' },
        { et: 'θ₂ kırmızı (680 nm)', dg: D.biçim(a, 3),     birim: '°' },
        { et: 'θ₂ mor (410 nm)',     dg: D.biçim(b, 3),     birim: '°' },
        { et: 'Renk ayrışması',      dg: D.biçim(a - b, 3), birim: '°' }
      ];
    }
    const yansiyan = RENKLER.filter(c => tamYansimaMi(renkP(p, c.l))).map(c => c.ad);
    return [
      { et: 'Geçiş',               dg: 'su → hava · beyaz ışık', birim: '' },
      { et: 'Gelme açısı θ₁',      dg: D.biçim(p.gelme, 2), birim: '°' },
      { et: 'Sınır açısı kırmızı', dg: D.biçim(sinirAcisi(kr), 2), birim: '°' },
      { et: 'Sınır açısı mor',     dg: D.biçim(sinirAcisi(mr), 2), birim: '°' },
      { et: 'Tam yansıyan',        dg: yansiyan.length ? yansiyan.join(', ') : 'yok', birim: '' }
    ];
  }
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
  baslik: '3.4 · Işığın kırılması · Snell yasası, sınır açısı, beyaz ışık',
  yukseklik: 340,
  grafikPanel: true,
  grafikYukseklik: 150,
  parametreler: [
    { anahtar: 'mod', etiket: 'Düzenek', tur: 'secim', deger: 1, secenekler: [
      { d: 1, e: 'Snell yasası' },
      { d: 2, e: 'Sınır açısı · tam yansıma' },
      { d: 3, e: 'Hız ve dalga boyu' },
      { d: 4, e: 'Beyaz ışık · hava → su (renklere ayrılma)' },
      { d: 5, e: 'Beyaz ışık · su → hava (renklerin sınır açısı)' }
    ]},
    { anahtar: 'n1',    etiket: '1. ortamın indisi n₁', min: 1.00, max: 2.50, adim: 0.01, deger: 1.00, birim: '' },
    { anahtar: 'n2',    etiket: '2. ortamın indisi n₂', min: 1.00, max: 2.50, adim: 0.01, deger: 1.33, birim: '' },
    { anahtar: 'gelme', etiket: 'Gelme açısı θ₁',       min: 0,    max: 89,   adim: 1,    deger: 40,   birim: '°' },
    { anahtar: 'lam0',  etiket: 'Boşluktaki dalga boyu', min: 400, max: 750,  adim: 10,   deger: 550,  birim: 'nm' }
  ],
  durum, adim, bitti, cizGercek, cizKlasik, cizGrafik, okumalar
};

})();
