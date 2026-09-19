(function () {
"use strict";
window.F11 = window.F11 || {};

/* ==========================================================================
   sims/prizmalar.js
   --------------------------------------------------------------------------
   Konu 3.8 · Prizmalar

   SAPMA AÇISI
   -----------
       θ₂ = arcsin(sin θ₁ / n)         1. yüzeyde kırılma
       θ₃ = A − θ₂                     prizma geometrisi
       θ₄ = arcsin(n · sin θ₃)         2. yüzeyde kırılma
       δ  = θ₁ + θ₄ − A                toplam sapma

   A tepe açısı. θ₃ sınır açısını aşarsa ışın ikinci yüzeyden ÇIKAMAZ,
   içeride tam yansımaya uğrar.

   EN KÜÇÜK SAPMA
   --------------
   Işın prizmadan simetrik geçtiğinde (θ₁ = θ₄, θ₂ = θ₃ = A/2) sapma en
   küçüktür:

       δ_min = 2·arcsin(n·sin(A/2)) − A
       n = sin((A + δ_min)/2) / sin(A/2)

   İkinci bağıntı, bir camın kırılma indisini ölçmenin klasik yoludur.

   DİSPERSİYON (renklere ayrılma)
   ------------------------------
   Kırılma indisi dalga boyuna bağlıdır. Cauchy yaklaşımı:

       n(λ) = n₀ + B / λ²              (λ nanometre)

   Bu dosyada B, kullanıcı tarafından ayarlanır ve varsayılan değer gerçek
   bir taç camına (BK7) oturtulmuştur:
       n(486 nm) = 1,5224   n(589 nm) = 1,5168   n(656 nm) = 1,5143

   λ küçüldükçe n büyür ⟹ MOR en çok, KIRMIZI en az sapar.

   TAM YANSIMA PRİZMASI (45°–45°–90°)
   ----------------------------------
   Dik kenardan giren ışın hipotenüse 45° ile çarpar. Sınır açısı
   45°'den küçükse (yani n > 1/sin45° = 1,414) ışın TAM yansır ve 90°
   döner. Dürbün, periskop ve fotoğraf makinelerinde ayna yerine bu
   prizmalar kullanılır — çünkü tam yansımada ışık kaybı yoktur.
   ========================================================================== */

const D = window.F11;
const { R, K } = D;

/* ------------------------------------------------------------- Fizik */

function rad(d) { return (d * Math.PI) / 180; }
function der(r) { return (r * 180) / Math.PI; }

/** Cauchy: dalga boyuna göre kırılma indisi. */
function indis(p, lam) {
  const B = p.disp * 1000;                       // 10³ nm²
  return p.nD - B / (589 * 589) + B / (lam * lam);
}

/** Prizmadan geçişin tüm açıları. Çıkamıyorsa cikis = null. */
function gecis(p, n) {
  const A = p.tepe;
  const t1 = rad(p.giris);
  const s2 = Math.sin(t1) / n;
  if (Math.abs(s2) > 1) return null;
  const t2 = Math.asin(s2);
  const t3 = rad(A) - t2;
  const s4 = n * Math.sin(t3);
  if (Math.abs(s4) > 1) {
    return { t1, t2, t3, t4: null, sapma: null, tamYansima: true };
  }
  const t4 = Math.asin(s4);
  return { t1, t2, t3, t4, sapma: der(t1 + t4) - A, tamYansima: false };
}

/** En küçük sapma açısı (derece). Yoksa null. */
function enKucukSapma(p, n) {
  const s = n * Math.sin(rad(p.tepe / 2));
  if (Math.abs(s) > 1) return null;
  return der(2 * Math.asin(s)) - p.tepe;
}

/** Prizma içindeki sınır açısı (derece). */
function sinirAcisi(n) {
  return n <= 1 ? null : der(Math.asin(1 / n));
}

/** Dalga boyundan yaklaşık RGB rengi. */
function renkDalga(lam) {
  let r = 0, g = 0, b = 0;
  if (lam < 440)      { r = -(lam - 440) / 60; b = 1; }
  else if (lam < 490) { g = (lam - 440) / 50;  b = 1; }
  else if (lam < 510) { g = 1; b = -(lam - 510) / 20; }
  else if (lam < 580) { r = (lam - 510) / 70;  g = 1; }
  else if (lam < 645) { r = 1; g = -(lam - 645) / 65; }
  else                { r = 1; }
  let k = 1;
  if (lam > 700)      k = 0.3 + 0.7 * (780 - lam) / 80;
  else if (lam < 420) k = 0.3 + 0.7 * (lam - 380) / 40;
  const q = x => Math.round(255 * Math.max(0, Math.min(1, x * k)));
  return 'rgb(' + q(r) + ',' + q(g) + ',' + q(b) + ')';
}

/* -------------------------------------------------------------- Durum */

/* Oynat'a basılınca düzeneğin anahtar büyüklüğü taranır; kaydırıcı taramanın
   BAŞLADIĞI değeri verir. Böylece her düzenekte bir şeyin nasıl değiştiği
   canlı görünür. */
const TARAMA_PERIYOT = 14;

function durum(p) { return { t: 0, giris: p.giris, nD: p.nD }; }

function adim(st, dt, p) {
  st.t += dt;
  if (p.mod > 2.5) {
    /* Tam yansıma prizmasında indis 1,414'ün ALTINA indirilir: koşul bozulunca
       ışığın hipotenüsten kaçışı canlı görünür. */
    st.nD = D.tarama(st.t, p.nD, 1.30, TARAMA_PERIYOT);
  }
  else             st.giris = D.tarama(st.t, p.giris, p.giris < 45 ? 85 : 8, TARAMA_PERIYOT);
}

function bitti() { return false; }

function etkin(st, p) {
  return Object.assign({}, p, { giris: st.giris ?? p.giris, nD: st.nD ?? p.nD });
}

/* ------------------------------------------------- Geometri yardımcıları */

/** İki doğrunun kesişimi: P + t·u  ile  Q + s·v. */
function kesisim(px, py, ux, uy, qx, qy, vx, vy) {
  const det = ux * -vy - uy * -vx;
  if (Math.abs(det) < 1e-9) return null;
  const t = ((qx - px) * -vy - (qy - py) * -vx) / det;
  return { x: px + t * ux, y: py + t * uy, t };
}

/** Üçgen prizmanın köşeleri. */
function prizma(w, h, p) {
  const A = rad(p.tepe);
  const kenar = Math.min(h * 0.62, w * 0.34);
  const tx = w * 0.46, ty = h * 0.20;
  return {
    A, kenar, tx, ty,
    lx: tx - kenar * Math.sin(A / 2), ly: ty + kenar * Math.cos(A / 2),
    rx: tx + kenar * Math.sin(A / 2), ry: ty + kenar * Math.cos(A / 2)
  };
}

function cizPrizmaGovde(ctx, g, p) {
  ctx.save();
  ctx.fillStyle = 'rgba(127,212,230,.20)';
  ctx.strokeStyle = '#7FD4E6'; ctx.lineWidth = 2.4;
  ctx.beginPath();
  ctx.moveTo(g.tx, g.ty); ctx.lineTo(g.lx, g.ly); ctx.lineTo(g.rx, g.ry);
  ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.restore();
  D.yaziAydinlik(ctx, 'A = ' + D.biçim(p.tepe) + '°', g.tx, g.ty - 10, '#14506E',
                 '700 12px system-ui, sans-serif', 'center');
}

/**
 * Bir rengin prizmadan geçiş yolunu çizer.
 * Giriş noktası sol yüzeyin oranSol kadarında.
 */
function cizIsinYolu(ctx, w, h, g, p, n, renk, kalinlik, oranSol, etiket,
                     gelenCiz = true, cikisAci = null) {
  const gec = gecis(p, n);
  if (!gec) return null;

  const A2 = g.A / 2;
  /* sol yüzey doğrultusu (tepeden tabana) */
  const sux = -Math.sin(A2), suy = Math.cos(A2);
  const Qx = g.tx + g.kenar * oranSol * sux;
  const Qy = g.ty + g.kenar * oranSol * suy;

  /* gelen ışın: yön açısı A/2 − θ₁ */
  const gAci = A2 - gec.t1;
  const gL = Math.min(w * 0.30, 170);
  if (gelenCiz) {
    D.isin(ctx, Qx - gL * Math.cos(gAci), Qy - gL * Math.sin(gAci), Qx, Qy,
           renk, kalinlik, true);
  }

  /* içerideki ışın: yön açısı A/2 − θ₂ */
  const iAci = A2 - gec.t2;
  const iux = Math.cos(iAci), iuy = Math.sin(iAci);

  /* sağ yüzeyle kesişim */
  const rux = Math.sin(A2), ruy = Math.cos(A2);
  const k = kesisim(Qx, Qy, iux, iuy, g.tx, g.ty, rux, ruy);
  if (!k || k.t <= 0) return null;

  D.isin(ctx, Qx, Qy, k.x, k.y, renk, kalinlik, true);

  if (gec.tamYansima) {
    D.yaziAydinlik(ctx, 'TAM YANSIMA — ışın prizmadan çıkamıyor',
                   w * 0.5, h * 0.94, R.kuvvet, '700 12px system-ui, sans-serif', 'center');
    return gec;
  }

  /* çıkan ışın: yön açısı −A/2 + θ₄ (dispersiyonda abartılmış açı verilir) */
  const cAci = cikisAci === null ? -A2 + gec.t4 : cikisAci;
  const cL = Math.min(w * 0.34, 200);
  D.isin(ctx, k.x, k.y, k.x + cL * Math.cos(cAci), k.y + cL * Math.sin(cAci),
         renk, kalinlik, true);

  if (etiket) {
    D.yaziAydinlik(ctx, etiket, k.x + cL * Math.cos(cAci) + 6,
                   k.y + cL * Math.sin(cAci), renk,
                   '700 11px system-ui, sans-serif', 'left');
  }
  return { gec, cikisX: k.x, cikisY: k.y, gAci, cAci };
}

/* --------------------------------------------- Gerçekçi görünüm */

function cizGercek(ctx, w, h, st, pHam) {
  const p = etkin(st, pHam);
  if (p.mod > 2.5) { cizTamYansimaPrizmasi(ctx, w, h, p); return; }
  if (p.mod > 1.5) { cizDispersiyon(ctx, w, h, p); return; }

  const g = prizma(w, h, p);
  cizPrizmaGovde(ctx, g, p);

  const n = indis(p, 589);
  const yol = cizIsinYolu(ctx, w, h, g, p, n, R.ivme, 2.6, 0.48, null);

  const gec = gecis(p, n);
  if (yol && yol.gec && !yol.gec.tamYansima) {
    /* sapmasaydı nereye giderdi */
    const uz = Math.min(w * 0.34, 200);
    D.sanalIsin(ctx, yol.cikisX, yol.cikisY,
                yol.cikisX + uz * Math.cos(yol.gAci),
                yol.cikisY + uz * Math.sin(yol.gAci), 'rgba(167,139,250,.9)');
    D.yaziAydinlik(ctx, 'sapmasaydı', yol.cikisX + uz * Math.cos(yol.gAci) + 6,
                   yol.cikisY + uz * Math.sin(yol.gAci), R.surtunme,
                   '600 11px system-ui, sans-serif', 'left');
    D.aciYayi(ctx, yol.cikisX, yol.cikisY, 58, yol.gAci, yol.cAci, R.kuvvet,
              'δ = ' + D.biçim(yol.gec.sapma, 4) + '°');
  }

  const dmin = enKucukSapma(p, n);
  D.yaziAydinlik(ctx,
    'Sapma δ = ' + (gec && gec.sapma !== null ? D.biçim(gec.sapma, 4) + '°' : '—') +
    '   ·   en küçük sapma ' + (dmin === null ? '—' : D.biçim(dmin, 4) + '°'),
    10, h - 10, R.kuvvet, '700 12px system-ui, sans-serif', 'left');
}

/* ---- Mod 2 · Dispersiyon ---- */

function cizDispersiyon(ctx, w, h, p) {
  const g = prizma(w, h, p);
  cizPrizmaGovde(ctx, g, p);

  /* Taç camında mor ile kırmızı arasındaki gerçek açısal ayrım ~1,5°'dir;
     bu kadarı ekranda birkaç piksel eder ve hiçbir şey görünmez. Bu yüzden
     ÇIKAN ışınların açı farkı ABARTI katıyla büyütülerek çizilir.
     Sayısal değerler (okumalar ve klasik panel) GERÇEK değerlerdir. */
  const ABARTI = 12;
  const renkler = [400, 440, 480, 520, 560, 600, 660, 700];

  const A2 = g.A / 2;
  const sux = -Math.sin(A2), suy = Math.cos(A2);
  const Qx = g.tx + g.kenar * 0.48 * sux, Qy = g.ty + g.kenar * 0.48 * suy;

  const gec0 = gecis(p, indis(p, 589));
  if (!gec0 || gec0.tamYansima) {
    D.yaziAydinlik(ctx, 'Bu açıda ışın prizmadan çıkamıyor — tepe açısını küçült',
                   w * 0.5, h * 0.92, R.kuvvet, '700 12px system-ui, sans-serif', 'center');
    return;
  }

  /* beyaz gelen ışın — bir kez, kalın */
  const gAci = A2 - gec0.t1;
  const gL = Math.min(w * 0.30, 170);
  D.isin(ctx, Qx - gL * Math.cos(gAci), Qy - gL * Math.sin(gAci), Qx, Qy,
         '#FFFFFF', 4, true);
  D.isin(ctx, Qx - gL * Math.cos(gAci), Qy - gL * Math.sin(gAci), Qx, Qy,
         'rgba(80,110,150,.55)', 1, false);
  D.yaziAydinlik(ctx, 'beyaz ışık',
                 Qx - gL * Math.cos(gAci) + 4, Qy - gL * Math.sin(gAci) - 12,
                 '#14506E', '700 11px system-ui, sans-serif', 'left');

  const cOrta = -A2 + gec0.t4;           // sarı ışığın gerçek çıkış açısı
  let mor = null, kirmizi = null;

  renkler.forEach(lam => {
    const n = indis(p, lam);
    const gc = gecis(p, n);
    if (!gc || gc.tamYansima) return;
    const gercek = -A2 + gc.t4;
    const cizilen = cOrta + (gercek - cOrta) * ABARTI;
    cizIsinYolu(ctx, w, h, g, p, n, renkDalga(lam), 2.2, 0.48, null, false, cizilen);
    if (lam === 400) mor = gc.sapma;
    if (lam === 700) kirmizi = gc.sapma;
  });

  if (mor !== null && kirmizi !== null) {
    D.yaziAydinlik(ctx,
      'Mor ' + D.biçim(mor, 4) + '°  ·  Kırmızı ' + D.biçim(kirmizi, 4) +
      '°  ·  ayrım ' + D.biçim(mor - kirmizi, 3) + '°',
      10, h - 28, R.normal, '700 12px system-ui, sans-serif', 'left');
  }
  D.yaziAydinlik(ctx,
    'MOR en çok sapar  ·  çizimde ayrım ' + ABARTI + '× abartılı',
    10, h - 10, R.surtunme, '700 11px system-ui, sans-serif', 'left');
}

/* ---- Mod 3 · 45°–45°–90° tam yansıma prizması ---- */

function cizTamYansimaPrizmasi(ctx, w, h, p) {
  const n = indis(p, 589);
  const L = Math.min(h * 0.56, w * 0.34);
  const x0 = w * 0.42, y0 = h * 0.20;
  const Ax = x0, Ay = y0;                  // üst sol
  const Bx = x0, By = y0 + L;              // alt sol
  const Cx = x0 + L, Cy = y0 + L;          // alt sağ

  ctx.save();
  ctx.fillStyle = 'rgba(127,212,230,.20)';
  ctx.strokeStyle = '#7FD4E6'; ctx.lineWidth = 2.4;
  ctx.beginPath();
  ctx.moveTo(Ax, Ay); ctx.lineTo(Bx, By); ctx.lineTo(Cx, Cy);
  ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.restore();

  D.yaziAydinlik(ctx, '45°', Ax + 12, Ay + 24, '#14506E', '700 11px system-ui, sans-serif', 'left');
  D.yaziAydinlik(ctx, '90°', Bx + 12, By - 10, '#14506E', '700 11px system-ui, sans-serif', 'left');
  D.yaziAydinlik(ctx, '45°', Cx - 26, Cy - 10, '#14506E', '700 11px system-ui, sans-serif', 'left');

  /* giriş: sol dik kenara DİK — kırılmadan girer */
  const gy = y0 + L * 0.42;
  const gL = Math.min(w * 0.30, 160);
  D.isin(ctx, Ax - gL, gy, Ax, gy, R.ivme, 2.8, true);
  D.isin(ctx, Ax, gy, Ax + (gy - Ay), gy, R.ivme, 2.8, true);

  /* hipotenüse çarpma noktası: y = gy, hipotenüs x = Ax + (y − Ay) */
  const hx = Ax + (gy - Ay), hy = gy;

  const sa = sinirAcisi(n);
  const tam = sa !== null && 45 >= sa;

  /* normal */
  D.normalDogrultu(ctx, hx, hy, 44, -Math.PI / 4);
  D.aciYayi(ctx, hx, hy, 34, Math.PI, Math.PI + Math.PI / 4, R.ivme, '45°');

  if (tam) {
    /* tam yansıma: 90° döner, aşağı gider */
    D.isin(ctx, hx, hy, hx, Cy, R.hiz, 2.8, true);
    D.isin(ctx, hx, Cy, hx, Cy + gL * 0.8, R.hiz, 2.8, true);
    D.yaziAydinlik(ctx, 'TAM YANSIMA · ışın 90° döndü, kayıp YOK',
                   10, h - 28, R.hiz, '700 12px system-ui, sans-serif', 'left');
  } else {
    /* sınır açısı 45°'den büyük: ışık hipotenüsten kaçar */
    const t2 = Math.asin(Math.min(1, n * Math.sin(Math.PI / 4)));
    D.isin(ctx, hx, hy, hx + gL * 0.7 * Math.cos(-Math.PI / 4 + t2),
           hy + gL * 0.7 * Math.sin(-Math.PI / 4 + t2), R.kuvvet, 2.4, true);
    D.yaziAydinlik(ctx, 'n çok küçük — sınır açısı 45°’den büyük, ışık KAÇIYOR',
                   10, h - 28, R.kuvvet, '700 12px system-ui, sans-serif', 'left');
  }

  /* İki alt satır aynı hizadayken çakışıyordu; durum yazısı üstte, ölçüm altta. */
  D.yaziAydinlik(ctx,
    'n = ' + D.biçim(n, 4) + '  ·  sınır açısı ' + (sa === null ? '—' : D.biçim(sa, 4) + '°') +
    '  ·  gerekli n > 1,414',
    10, h - 10, R.surtunme, '700 12px system-ui, sans-serif', 'left');
}

/* ------------------------------------------ Klasik fizik görünümü */

function cizKlasik(ctx, w, h, st, pHam) {
  const p = etkin(st, pHam);
  D.izgara(ctx, w, h, 26);
  const n = indis(p, 589);

  if (p.mod > 2.5) {
    const sa = sinirAcisi(n);
    D.yaziHaleli(ctx, '45°–45°–90° prizması', 12, 22, K.beyaz,
                 '700 12px system-ui, sans-serif', 'left');
    const satir = [
      ['Hipotenüse çarpma açısı = 45°', K.beyaz, '700 13px system-ui, sans-serif'],
      ['', K.metin2, '11px'],
      ['sin θ_s = 1/n', K.metin, '12px system-ui, sans-serif'],
      ['n = ' + D.biçim(n, 4), R.ivme, '700 13px system-ui, sans-serif'],
      ['θ_s = ' + (sa === null ? '—' : D.biçim(sa, 4) + '°'), R.kuvvet, '700 13px system-ui, sans-serif'],
      ['', K.metin2, '11px'],
      ['Koşul: 45° ≥ θ_s', K.beyaz, '700 12px system-ui, sans-serif'],
      ['⟹ sin45° ≥ 1/n ⟹ n ≥ 1/sin45°', K.metin2, '11px system-ui, sans-serif'],
      ['⟹ n ≥ 1,4142', R.hiz, '700 13px system-ui, sans-serif'],
      [(sa !== null && 45 >= sa) ? 'SAĞLANIYOR — ışın 90° döner' : 'SAĞLANMIYOR — ışık kaçar',
        (sa !== null && 45 >= sa) ? R.hiz : R.kuvvet, '700 13px system-ui, sans-serif'],
      ['', K.metin2, '11px'],
      ['Neden ayna değil de prizma?', K.beyaz, '700 12px system-ui, sans-serif'],
      ['Tam yansımada kayıp YOK;', K.metin2, '11px system-ui, sans-serif'],
      ['sırlı aynada her yansımada', K.metin2, '11px system-ui, sans-serif'],
      ['%5–10 ışık kaybolur.', K.metin2, '11px system-ui, sans-serif']
    ];
    let sy = 46;
    satir.forEach(([t, c, f]) => { if (t) D.yaziHaleli(ctx, t, w * 0.34, sy, c, f, 'left'); sy += 17; });
    return;
  }

  if (p.mod > 1.5) {
    const nm = indis(p, 400), nk = indis(p, 700);
    const gm = gecis(p, nm), gk = gecis(p, nk);
    D.yaziHaleli(ctx, 'Dispersiyon · Cauchy', 12, 22, K.beyaz,
                 '700 12px system-ui, sans-serif', 'left');
    const satir = [
      ['n(λ) = n₀ + B/λ²', K.beyaz, '700 14px system-ui, sans-serif'],
      ['', K.metin2, '11px'],
      ['n(400 nm) = ' + D.biçim(nm, 5) + '   mor', '#9B5CF6', '700 12px system-ui, sans-serif'],
      ['n(589 nm) = ' + D.biçim(n, 5) + '   sarı', R.ivme, '700 12px system-ui, sans-serif'],
      ['n(700 nm) = ' + D.biçim(nk, 5) + '   kırmızı', R.kuvvet, '700 12px system-ui, sans-serif'],
      ['', K.metin2, '11px'],
      ['Sapma açıları', K.beyaz, '700 12px system-ui, sans-serif'],
      ['mor     δ = ' + (gm && gm.sapma !== null ? D.biçim(gm.sapma, 4) + '°' : '—'),
        '#9B5CF6', '12px system-ui, sans-serif'],
      ['kırmızı δ = ' + (gk && gk.sapma !== null ? D.biçim(gk.sapma, 4) + '°' : '—'),
        R.kuvvet, '12px system-ui, sans-serif'],
      ['açısal ayrım = ' +
        (gm && gk && gm.sapma !== null && gk.sapma !== null
          ? D.biçim(gm.sapma - gk.sapma, 3) + '°' : '—'),
        R.normal, '700 13px system-ui, sans-serif'],
      ['', K.metin2, '11px'],
      ['λ küçük ⟹ n büyük ⟹ çok sapar', R.surtunme, '700 12px system-ui, sans-serif'],
      ['Sıra: mor–mavi–yeşil–sarı–turuncu–kırmızı', K.metin2, '11px system-ui, sans-serif']
    ];
    let sy = 46;
    satir.forEach(([t, c, f]) => { if (t) D.yaziHaleli(ctx, t, w * 0.34, sy, c, f, 'left'); sy += 17; });
    return;
  }

  const gec = gecis(p, n);
  const dmin = enKucukSapma(p, n);
  D.yaziHaleli(ctx, 'Prizmada sapma', 12, 22, K.beyaz,
               '700 12px system-ui, sans-serif', 'left');

  const sol = [
    ['δ = θ₁ + θ₄ − A', K.beyaz, '700 14px system-ui, sans-serif'],
    ['', K.metin2, '11px'],
    ['A  = ' + D.biçim(p.tepe) + '°', R.normal, '12px system-ui, sans-serif'],
    ['n  = ' + D.biçim(n, 4), R.normal, '12px system-ui, sans-serif'],
    ['θ₁ = ' + D.biçim(p.giris) + '°', R.ivme, '700 13px system-ui, sans-serif'],
    ['θ₂ = ' + (gec ? D.biçim(der(gec.t2), 4) + '°' : '—'), K.metin2, '12px system-ui, sans-serif'],
    ['θ₃ = A − θ₂ = ' + (gec ? D.biçim(der(gec.t3), 4) + '°' : '—'), K.metin2, '12px system-ui, sans-serif'],
    ['θ₄ = ' + (gec && gec.t4 !== null ? D.biçim(der(gec.t4), 4) + '°' : 'ÇIKAMIYOR'),
      R.kuvvet, '700 13px system-ui, sans-serif'],
    ['δ  = ' + (gec && gec.sapma !== null ? D.biçim(gec.sapma, 4) + '°' : '—'),
      R.kuvvet, '700 14px system-ui, sans-serif']
  ];
  let sy = 46;
  sol.forEach(([t, c, f]) => { if (t) D.yaziHaleli(ctx, t, 12, sy, c, f, 'left'); sy += 17; });

  const sx = w * 0.54;
  const sa = sinirAcisi(n);
  const sag = [
    ['En küçük sapma', K.beyaz, '700 12px system-ui, sans-serif'],
    ['δ_min = 2·arcsin(n·sin(A/2)) − A', K.metin, '11px system-ui, sans-serif'],
    ['δ_min = ' + (dmin === null ? '—' : D.biçim(dmin, 4) + '°'), R.hiz, '700 14px system-ui, sans-serif'],
    ['', K.metin2, '11px'],
    ['Simetrik geçişte oluşur:', K.metin2, '11px system-ui, sans-serif'],
    ['θ₁ = θ₄ = ' + (dmin === null ? '—' : D.biçim((p.tepe + dmin) / 2, 4) + '°'),
      K.metin2, '11px system-ui, sans-serif'],
    ['θ₂ = θ₃ = A/2 = ' + D.biçim(p.tepe / 2, 3) + '°', K.metin2, '11px system-ui, sans-serif'],
    ['', K.metin2, '11px'],
    ['Prizma içi sınır açısı', K.beyaz, '700 12px system-ui, sans-serif'],
    ['θ_s = ' + (sa === null ? '—' : D.biçim(sa, 4) + '°'), R.surtunme, '700 13px system-ui, sans-serif'],
    ['θ₃ > θ_s ise ışın çıkamaz', K.metin2, '11px system-ui, sans-serif'],
    ['', K.metin2, '11px'],
    ['n ölçmek için:', K.beyaz, '700 12px system-ui, sans-serif'],
    ['n = sin((A+δ_min)/2) / sin(A/2)', R.ivme, '11px system-ui, sans-serif']
  ];
  sy = 46;
  sag.forEach(([t, c, f]) => { if (t) D.yaziHaleli(ctx, t, sx, sy, c, f, 'left'); sy += 17; });
}

/* ---------------------------------------------------- Grafik paneli */

function cizGrafik(ctx, w, h, st, pHam) {
  const p = etkin(st, pHam);
  const pay = 8, gw = (w - pay * 3) / 2, gh = h - 6;
  const n = indis(p, 589);

  /* δ − θ₁ : en küçük sapmayı gösteren U eğrisi */
  const v1 = [];
  for (let a = 1; a <= 89; a += 1) {
    const g = gecis({ tepe: p.tepe, giris: a }, n);
    if (g && g.sapma !== null) v1.push({ t: a, v: g.sapma });
  }
  const dmin = enKucukSapma(p, n);
  D.miniGrafik(ctx, {
    x: pay, y: 3, w: gw, h: gh,
    baslik: 'δ − θ₁   (en küçük sapma ' + (dmin === null ? '—' : D.biçim(dmin, 4) + '°') + ')',
    birim: '°', tEtiket: 'θ₁ (°)',
    imlec: (() => { const g = gecis(p, n); return (g && g.sapma !== null) ? { t: p.giris, v: g.sapma } : null; })(),
    veri: v1, tMax: 89, vMin: 0,
    vMax: Math.max(10, (dmin === null ? 60 : dmin) * 2.2), renk: R.kuvvet
  });

  /* n − λ : dispersiyon eğrisi */
  const v2 = [];
  for (let lam = 380; lam <= 760; lam += 5) v2.push({ t: lam, v: indis(p, lam) });
  const nmin = indis(p, 760), nmax = indis(p, 380);
  D.miniGrafik(ctx, {
    x: pay * 2 + gw, y: 3, w: gw, h: gh,
    baslik: 'n − λ   (mor uçta n en büyük)', birim: '', tEtiket: 'λ (nm)',
    imlec: { t: 589, v: indis(p, 589) },
    veri: v2, tMin: 380, tMax: 760, vMin: nmin - (nmax - nmin) * 0.3,
    vMax: nmax + (nmax - nmin) * 0.3, renk: R.normal, sifirdanBasla: false
  });
}

/* ------------------------------------------------------------ Okumalar */

function okumalar(st, pHam) {
  const p = etkin(st, pHam);
  const n = indis(p, 589);
  const sa = sinirAcisi(n);

  if (p.mod > 2.5) {
    return [
      { et: 'Prizma indisi n',  dg: D.biçim(n, 4), birim: '' },
      { et: 'Sınır açısı θ_s',  dg: sa === null ? '—' : D.biçim(sa, 4), birim: '°' },
      { et: 'Çarpma açısı',     dg: '45', birim: '°' },
      { et: 'Gerekli en küçük n', dg: D.biçim(Math.SQRT2, 5), birim: '' },
      { et: 'Sonuç',
        dg: (sa !== null && 45 >= sa) ? 'Tam yansıma · 90° döner' : 'Işık kaçıyor', birim: '' },
      { et: 'Işık kaybı',
        dg: (sa !== null && 45 >= sa) ? 'Yok (%100 yansır)' : 'Var', birim: '' }
    ];
  }

  if (p.mod > 1.5) {
    const nm = indis(p, 400), nk = indis(p, 700);
    const gm = gecis(p, nm), gk = gecis(p, nk);
    return [
      { et: 'n (400 nm · mor)',     dg: D.biçim(nm, 5), birim: '' },
      { et: 'n (589 nm · sarı)',    dg: D.biçim(n, 5),  birim: '' },
      { et: 'n (700 nm · kırmızı)', dg: D.biçim(nk, 5), birim: '' },
      { et: 'Mor sapması',     dg: gm && gm.sapma !== null ? D.biçim(gm.sapma, 4) : '—', birim: '°' },
      { et: 'Kırmızı sapması', dg: gk && gk.sapma !== null ? D.biçim(gk.sapma, 4) : '—', birim: '°' },
      { et: 'Açısal ayrım',
        dg: gm && gk && gm.sapma !== null && gk.sapma !== null
              ? D.biçim(gm.sapma - gk.sapma, 4) : '—', birim: '°' },
      { et: 'En çok sapan', dg: 'Mor (λ küçük ⟹ n büyük)', birim: '' }
    ];
  }

  const gec = gecis(p, n);
  const dmin = enKucukSapma(p, n);
  return [
    { et: 'Tepe açısı A',    dg: D.biçim(p.tepe), birim: '°' },
    { et: 'Giriş açısı θ₁',  dg: D.biçim(p.giris), birim: '°' },
    { et: 'θ₂ (içeride)',    dg: gec ? D.biçim(der(gec.t2), 4) : '—', birim: '°' },
    { et: 'θ₃ = A − θ₂',     dg: gec ? D.biçim(der(gec.t3), 4) : '—', birim: '°' },
    { et: 'θ₄ (çıkış)',
      dg: gec && gec.t4 !== null ? D.biçim(der(gec.t4), 4) : 'Çıkamıyor',
      birim: gec && gec.t4 !== null ? '°' : '' },
    { et: 'Sapma δ',
      dg: gec && gec.sapma !== null ? D.biçim(gec.sapma, 4) : '—', birim: '°' },
    { et: 'En küçük sapma',  dg: dmin === null ? '—' : D.biçim(dmin, 4), birim: '°' },
    { et: 'Prizma içi θ_s',  dg: sa === null ? '—' : D.biçim(sa, 4), birim: '°' }
  ];
}

/* ------------------------------------------------------------- Kayıt */

D.simler = D.simler || {};
D.simler['prizmalar'] = {
  id: 'prizmalar',
  baslik: '3.8 · Prizmalar · sapma, en küçük sapma, dispersiyon, tam yansıma',
  yukseklik: 340,
  grafikPanel: true,
  grafikYukseklik: 150,
  parametreler: [
    { anahtar: 'mod', etiket: 'Düzenek', tur: 'secim', deger: 1, secenekler: [
      { d: 1, e: 'Sapma açısı' },
      { d: 2, e: 'Dispersiyon · renklere ayrılma' },
      { d: 3, e: '45° tam yansıma prizması' }
    ]},
    { anahtar: 'tepe',  etiket: 'Tepe açısı A',     min: 20,   max: 75,   adim: 1,    deger: 60,    birim: '°' },
    { anahtar: 'nD',    etiket: 'n (589 nm)',       min: 1.30, max: 1.90, adim: 0.005, deger: 1.517, birim: '' },
    { anahtar: 'giris', etiket: 'Giriş açısı θ₁',   min: 5,    max: 85,   adim: 1,    deger: 50,    birim: '°' },
    { anahtar: 'disp',  etiket: 'Dispersiyon B',    min: 0,    max: 20,   adim: 0.2,  deger: 4.2,   birim: '·10³ nm²' }
  ],
  durum, adim, bitti, cizGercek, cizKlasik, cizGrafik, okumalar
};

})();
