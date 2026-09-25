(function () {
"use strict";
window.F11 = window.F11 || {};

/* ==========================================================================
   sims/prizmalar.js
   --------------------------------------------------------------------------
   Konu 3.7 · Prizmalar  (MEB 11, s.367-372)

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

   TAM YANSIMALI PRİZMA (ikizkenar dik üçgen · kitap Şekil 3.33)
   -------------------------------------------------------------
   a) Dik kenara dik gelen ışın hipotenüse 45° ile çarpar, tam yansır,
      öbür dik kenardan dik çıkar (90° döner).
   b) Hipotenüse dik gelen ışın iki tam yansımayla geri döner (180°).
   c) Hipotenüse paralel gelen ışın paralel çıkar.
   Koşul: 45° ≥ θ_s ⟹ n ≥ 1/sin45° = 1,414. Kitapta camdan havaya θ_s = 42°.
   Dürbün, periskop, fotoğraf makinesi ve mikroskopta aynaya tercih edilir:
   tam yansımada ışık kaybı yoktur.

   Bu dosyadaki 3. ve 4. düzenekler GENEL bir ışın izleyiciyle çizilir:
   ışın her yüzeyde Snell yasası ya da tam yansımayla tam olarak ilerletilir.
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
  if (p.mod > 3.5 && p.sistem === 3) {
    /* renkleri birleştirme: giriş açısı taranır — çıkan ışın hep gelene paralel */
    st.giris = D.tarama(st.t, p.giris, p.giris < 50 ? 65 : 35, TARAMA_PERIYOT);
  } else if (p.mod > 2.5) {
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

  /* sağ yüzeyle kesişim — kesişim yüzeyin DIŞINDAYSA (tabandan aşağıda)
     ışın önce TABANA çarpar; bu açıda sağ yüzeye hiç ulaşmaz. */
  const rux = Math.sin(A2), ruy = Math.cos(A2);
  const k = kesisim(Qx, Qy, iux, iuy, g.tx, g.ty, rux, ruy);
  if (!k || k.t <= 0) return null;
  const sSag = (k.x - g.tx) * rux + (k.y - g.ty) * ruy;
  if (sSag > g.kenar + 1e-6) {
    const kt = kesisim(Qx, Qy, iux, iuy, g.lx, g.ly, 1, 0);
    if (kt && kt.t > 0) D.isin(ctx, Qx, Qy, kt.x, kt.y, renk, kalinlik, true);
    if (gelenCiz)
      D.yaziAydinlik(ctx, 'Bu açıda ışın sağ yüzeye değil TABANA çarpıyor',
                     w * 0.5, h - 30, R.kuvvet, '700 12px system-ui, sans-serif', 'center');
    return null;
  }

  D.isin(ctx, Qx, Qy, k.x, k.y, renk, kalinlik, true);

  if (gec.tamYansima) {
    /* Tam yansıma: ışın kaybolmaz, sağ yüzeyden İÇERİYE yansır ve tabana
       (ya da sol yüzeye) doğru ilerler. d′ = d − 2(d·n)n */
    const nx = Math.cos(A2), ny = -Math.sin(A2);             // sağ yüzeyin dış normali
    const dn = iux * nx + iuy * ny;
    const yx = iux - 2 * dn * nx, yy = iuy - 2 * dn * ny;
    const adaylar = [
      kesisim(k.x, k.y, yx, yy, g.lx, g.ly, 1, 0),                          // taban
      kesisim(k.x, k.y, yx, yy, g.tx, g.ty, -Math.sin(A2), Math.cos(A2))    // sol yüzey
    ].filter(q => q && q.t > 1e-6);
    if (adaylar.length) {
      const q = adaylar.reduce((a, b) => (b.t < a.t ? b : a));
      D.isin(ctx, k.x, k.y, q.x, q.y, renk, kalinlik, true);
    }
    D.yaziAydinlik(ctx, 'TAM YANSIMA — ışın sağ yüzeyden çıkamıyor, içeri yansıyor',
                   w * 0.5, h - 30, R.kuvvet, '700 12px system-ui, sans-serif', 'center');
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
  if (p.mod > 3.5) { cizBilesik(ctx, w, h, st, p, pHam); return; }
  if (p.mod > 2.5) { cizTamYansimaPrizmasi(ctx, w, h, st, p); return; }
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
    D.yaziAydinlik(ctx, 'sapmasaydı', Math.min(w - 8, yol.cikisX + uz * Math.cos(yol.gAci) + 6),
                   yol.cikisY + uz * Math.sin(yol.gAci) - 8, R.surtunme,
                   '600 11px system-ui, sans-serif', yol.cikisX + uz * Math.cos(yol.gAci) + 70 > w ? 'right' : 'left');
    D.aciYayi(ctx, yol.cikisX, yol.cikisY, 58, yol.gAci, yol.cAci, R.kuvvet,
              'δ = ' + D.biçim(yol.gec.sapma, 4) + '°');
  }

  const dmin = enKucukSapma(p, n);
  D.yaziAydinlik(ctx,
    'Sapma δ = ' + (gec && gec.sapma !== null ? D.biçim(gec.sapma, 4) + '°' : '—') +
    '   ·   en küçük sapma ' + (dmin === null ? '—' : D.biçim(dmin, 4) + '°'),
    10, h - 10, R.kuvvet, '700 12px system-ui, sans-serif', 'left');
}

/* ------------------------------------------ Genel ışın izleyici ----
   Işın, çokgen biçimli cam prizmalardan TAM olarak izlenir. Her yüzeyde:
       gelme açısı normalden;  n₁ sin i = n₂ sin r   (kırılma)
       n₁ > n₂ ve sin i > n₂/n₁ ise tam yansıma: d′ = d + 2 cos i · N
   Prizmalar birbirine değmez; dışarısı hava (n = 1). */

/** Çokgenin ağırlık merkezi. */
function merkez(k) {
  let x = 0, y = 0;
  k.forEach(q => { x += q[0]; y += q[1]; });
  return [x / k.length, y / k.length];
}

/**
 * prizmalar: [[x,y],…] köşe listeleri · n: camın indisi
 * Döner: { noktalar: [[x,y],…], ortam: [n,…] (her parçanın indisi),
 *          olaylar: [{ x, y, gelme, tam, iceriden, nx, ny }] }
 */
function izle(prizmalar, x, y, dx, dy, n, w, h) {
  const nok = [[x, y]], ortam = [], olaylar = [];
  let icinde = -1;                                     // −1: havada
  for (let g = 0; g < 40; g++) {
    let tEn = Infinity, j = -1, ex = 0, ey = 0;
    prizmalar.forEach((k, pi) => {
      for (let i = 0; i < k.length; i++) {
        const [ax, ay] = k[i], [bx, by] = k[(i + 1) % k.length];
        const sx = bx - ax, sy = by - ay;
        const det = dx * -sy - dy * -sx;
        if (Math.abs(det) < 1e-12) continue;
        const t = ((ax - x) * -sy - (ay - y) * -sx) / det;
        const u = (dx * (ay - y) - dy * (ax - x)) / det;
        if (t > 1e-6 && u >= -1e-9 && u <= 1 + 1e-9 && t < tEn) { tEn = t; j = pi; ex = sx; ey = sy; }
      }
    });
    if (j < 0) {
      /* panelin kenarına kadar uzat */
      let t = 4000;
      if (dx > 1e-9) t = Math.min(t, (w + 5 - x) / dx);
      if (dx < -1e-9) t = Math.min(t, (-5 - x) / dx);
      if (dy > 1e-9) t = Math.min(t, (h + 5 - y) / dy);
      if (dy < -1e-9) t = Math.min(t, (-5 - y) / dy);
      nok.push([x + t * dx, y + t * dy]); ortam.push(1);
      break;
    }
    x += tEn * dx; y += tEn * dy;
    nok.push([x, y]); ortam.push(icinde < 0 ? 1 : n);
    /* gelen ışına bakan birim normal */
    const L = Math.hypot(ex, ey);
    let nx = -ey / L, ny = ex / L;
    if (dx * nx + dy * ny > 0) { nx = -nx; ny = -ny; }
    const cosI = -(dx * nx + dy * ny);
    const iceriden = icinde === j;
    const n1 = iceriden ? n : 1, n2 = iceriden ? 1 : n, eta = n1 / n2;
    const k2 = 1 - eta * eta * (1 - cosI * cosI);
    const gelme = der(Math.acos(Math.min(1, cosI)));
    if (k2 < 0) {
      dx += 2 * cosI * nx; dy += 2 * cosI * ny;
      olaylar.push({ x, y, gelme, tam: true, iceriden, nx, ny });
    } else {
      const c = eta * cosI - Math.sqrt(k2);
      dx = eta * dx + c * nx; dy = eta * dy + c * ny;
      const l = Math.hypot(dx, dy); dx /= l; dy /= l;
      olaylar.push({ x, y, gelme, tam: false, iceriden, nx, ny });
      icinde = iceriden ? -1 : j;
    }
  }
  return { noktalar: nok, ortam, olaylar };
}

/** Fresnel yansıma oranı (polarizasyonsuz). */
function fresnel(n1, n2, gelmeDer) {
  const c1 = Math.cos(rad(gelmeDer)), s2 = n1 / n2 * Math.sin(rad(gelmeDer));
  if (s2 >= 1) return 1;
  const c2 = Math.sqrt(1 - s2 * s2);
  const rs = (n1 * c1 - n2 * c2) / (n1 * c1 + n2 * c2), rp = (n1 * c2 - n2 * c1) / (n1 * c2 + n2 * c1);
  return (rs * rs + rp * rp) / 2;
}

/** İzlenen yolu çizer; olay noktalarında kısa normal, tam yansımada halka. */
function cizYol(ctx, iz, renk, kal = 2.4, normaller = true) {
  ctx.save(); ctx.strokeStyle = renk; ctx.lineWidth = kal; ctx.lineJoin = 'round';
  ctx.beginPath();
  iz.noktalar.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
  ctx.stroke(); ctx.restore();
  /* son parçaya ok */
  const m = iz.noktalar.length;
  if (m >= 2) {
    const [ax, ay] = iz.noktalar[m - 2], [bx, by] = iz.noktalar[m - 1];
    const L = Math.hypot(bx - ax, by - ay);
    if (L > 30) D.isin(ctx, ax + (bx - ax) * 0.5, ay + (by - ay) * 0.5, ax + (bx - ax) * 0.62, ay + (by - ay) * 0.62, renk, kal, true);
  }
  if (!normaller) return;
  iz.olaylar.forEach(o => {
    D.kesikliCizgi(ctx, o.x - o.nx * 22, o.y - o.ny * 22, o.x + o.nx * 22, o.y + o.ny * 22, 'rgba(74,95,134,.8)', 1.1, [3, 3]);
    if (o.tam) {
      ctx.save(); ctx.strokeStyle = R.hiz; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(o.x, o.y, 6, 0, 6.2832); ctx.stroke(); ctx.restore();
    }
  });
}

/** Işık darbeleri yol boyunca akar: camda hız c/n (ekranda V/n). */
function akanNoktalar(ctx, iz, t, renk, V = 170, ara = 1.4) {
  const par = [];
  let top = 0;
  for (let i = 0; i + 1 < iz.noktalar.length; i++) {
    const [ax, ay] = iz.noktalar[i], [bx, by] = iz.noktalar[i + 1];
    const L = Math.hypot(bx - ax, by - ay), sure = L * iz.ortam[i] / V;
    par.push({ ax, ay, bx, by, bas: top, sure }); top += sure;
  }
  for (let k = 0; k < 6; k++) {
    const tt = (t % ara) + k * ara;
    if (tt > top) break;
    const s = par.find(q => tt >= q.bas && tt <= q.bas + q.sure);
    if (!s) continue;
    const u = (tt - s.bas) / s.sure;
    ctx.save(); ctx.fillStyle = renk; ctx.strokeStyle = '#fff'; ctx.lineWidth = 1.2;
    ctx.beginPath(); ctx.arc(s.ax + (s.bx - s.ax) * u, s.ay + (s.by - s.ay) * u, 4, 0, 6.2832);
    ctx.fill(); ctx.stroke(); ctx.restore();
  }
}

function cizCokgen(ctx, k, dolgu = 'rgba(127,212,230,.22)') {
  ctx.save(); ctx.fillStyle = dolgu; ctx.strokeStyle = '#4FA9C9'; ctx.lineWidth = 2.2;
  ctx.beginPath(); k.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
  ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.restore();
}

/* ---- Mod 2 · Dispersiyon ----
   Taç camında mor ile kırmızı arasındaki gerçek açısal ayrım ~1,5°’dir;
   ekranda birkaç piksel eder. Bu yüzden çizimde camın dispersiyonu ABARTI
   katı büyütülür (daha dağıtıcı bir cam gibi) ve ışınlar bu camda TAM
   izlenir — prizma içinde de ayrılırlar. Sayısal değerler GERÇEK camındır. */
function cizDispersiyon(ctx, w, h, p) {
  const g = prizma(w, h, p);
  cizPrizmaGovde(ctx, g, p);
  const k = [[g.tx, g.ty], [g.lx, g.ly], [g.rx, g.ry]];
  const gec0 = gecis(p, indis(p, 589));
  if (!gec0 || gec0.tamYansima) {
    D.yaziAydinlik(ctx, 'Bu açıda ışın prizmadan çıkamıyor — tepe açısını küçült',
                   w * 0.5, h * 0.92, R.kuvvet, '700 12px system-ui, sans-serif', 'center');
  }
  const [x0, y0, dx, dy] = gelisNoktasi(k, p, w);
  const beyaz = izle([k], x0, y0, dx, dy, indis(p, 589), w, h);
  const [qx, qy] = beyaz.noktalar[1];
  D.isin(ctx, x0, y0, qx, qy, '#FFFFFF', 4, true);
  D.isin(ctx, x0, y0, qx, qy, 'rgba(80,110,150,.55)', 1, false);
  D.yaziAydinlik(ctx, 'beyaz ışık', x0 + 4, y0 - 12, '#14506E', '700 11px system-ui, sans-serif', 'left');
  RENK_DALGA.forEach(lam => {
    const iz = izle([k], x0, y0, dx, dy, cizN(p, lam), w, h);
    cizYol(ctx, { noktalar: iz.noktalar.slice(1), ortam: iz.ortam.slice(1), olaylar: [] }, renkDalga(lam), 2, false);
    if (lam === 400 || lam === 700) {
      const [ex, ey] = iz.noktalar[iz.noktalar.length - 1];
      const [ax, ay] = iz.noktalar[iz.noktalar.length - 2];
      const u = 0.55;
      D.yaziAydinlik(ctx, lam === 400 ? 'mor' : 'kırmızı', ax + (ex - ax) * u + 6, ay + (ey - ay) * u + (lam === 400 ? 12 : -6),
                     renkDalga(lam), '700 11px system-ui, sans-serif', 'left');
    }
  });
  const gm = gecis(p, indis(p, 400)), gk = gecis(p, indis(p, 700));
  if (gm && gk && gm.sapma !== null && gk.sapma !== null) {
    D.yaziAydinlik(ctx, 'Mor ' + D.biçim(gm.sapma, 4) + '°  ·  Kırmızı ' + D.biçim(gk.sapma, 4) +
                   '°  ·  ayrım ' + D.biçim(gm.sapma - gk.sapma, 3) + '°',
                   10, h - 28, R.normal, '700 12px system-ui, sans-serif', 'left');
  }
  D.yaziAydinlik(ctx, 'MOR en çok sapar  ·  çizimde renk ayrımı ×' + ABARTI + ' abartılı',
                 10, h - 10, R.surtunme, '700 11px system-ui, sans-serif', 'left');
}

/* ---- Mod 3 · Tam yansımalı prizma (kitap Şekil 3.33 ve örnekler) ---- */

/** Seçilen düzene göre prizma köşeleri ve gelen ışın. */
function tamSahne(w, h, p) {
  const L = Math.min(h * 0.56, w * 0.34);
  const x0 = w * 0.40, y0 = h * 0.12;
  const d = p.duzen;
  if (d === 2) {                               // b) hipotenüse dik giriş · 180°
    const hh = L * 0.62;
    return { kose: [[x0, y0], [x0 + hh, y0 + hh], [x0, y0 + 2 * hh]], gy: y0 + 0.5 * hh,
             ad: 'b) hipotenüse DİK gelen ışın geri döner (iki tam yansıma)' };
  }
  if (d === 3) {                               // c) hipotenüse paralel giriş
    const hc = L * 0.62;
    return { kose: [[x0 - hc * 0.3, y0 + hc], [x0 + hc * 0.7, y0], [x0 + hc * 1.7, y0 + hc]], gy: y0 + 0.78 * hc,
             ad: 'c) hipotenüse PARALEL gelen ışın paralel çıkar' };
  }
  if (d === 4) {                               // kitap örneği: 30°–60°–90°
    return { kose: [[x0, y0], [x0, y0 + L], [x0 + L * Math.tan(rad(30)), y0 + L]], gy: y0 + 0.62 * L,
             ad: '30°–60°–90° prizma: hipotenüse 30° ile gelir (kitap s.370)' };
  }
  return { kose: [[x0, y0], [x0, y0 + L], [x0 + L, y0 + L]], gy: y0 + 0.42 * L,
           ad: d === 5 ? 'K prizması: kırmızı sınırda, mavi tam yansır (kitap s.371)'
                       : 'a) dik kenara DİK gelen ışın 90° döner' };
}

/** Işının cam→hava geçtiği İLK yüzeydeki gelme açısı (tam yansımanın sınandığı yer). */
function kritikGelme(iz) {
  const o = iz.olaylar.find(e => e.iceriden);
  return o ? o.gelme : null;
}

function cizTamYansimaPrizmasi(ctx, w, h, st, p) {
  const s = tamSahne(w, h, p);
  cizCokgen(ctx, s.kose);
  const renkler = p.duzen === 5 ? [[656, '#E53935', 'kırmızı'], [470, '#1E6FD9', 'mavi']] : [[589, R.ivme, '']];
  let satir = h - 28;
  renkler.forEach(([lam, renk, ad], i) => {
    const n = indis(p, lam);
    const iz = izle([s.kose], 4, s.gy + i * 0.001, 1, 0, n, w, h);
    /* K prizmasında iki renk aynı yoldan tam yansıyınca üst üste biner:
       kırmızı kalın çizilir, mavi üstünde ince kalır */
    cizYol(ctx, iz, renk, p.duzen === 5 && i === 0 ? 5 : 2.4, i === 0);
    akanNoktalar(ctx, iz, st.t || 0, renk);
    const ilk = iz.olaylar.find(e => e.iceriden), sa = sinirAcisi(n);
    const tam = ilk && ilk.tam;
    D.yaziAydinlik(ctx, (ad ? ad + ': ' : '') + 'gelme ' + (ilk ? D.biçim(ilk.gelme, 3) : '—') + '° · sınır ' +
                   D.biçim(sa, 3) + '° ⟹ ' + (tam ? 'TAM YANSIMA' : 'kırılarak ÇIKAR'),
                   10, satir, tam ? R.hiz : R.kuvvet, '700 12px system-ui, sans-serif', 'left');
    satir += 18;
  });
  if (p.duzen !== 5) {
    const n = indis(p, 589);
    D.yaziAydinlik(ctx, 'n = ' + D.biçim(n, 4) + '   (camdan havaya sınır açısı ' + D.biçim(sinirAcisi(n), 3) + '°)',
                   10, h - 10, R.surtunme, '600 11px system-ui, sans-serif', 'left');
  }
  D.yaziAydinlik(ctx, s.ad, w - 10, 20, '#14506E', '700 12px system-ui, sans-serif', 'right');
}

/* ---- Mod 4 · Bileşik prizma sistemleri (8. Etkinlik IV, Alıştırma 23–24) ---- */

/** Sistemin prizmaları ve gelen ışın. */
function bilesikSahne(w, h, p, pHam) {
  if (p.sistem === 2) {                        // dürbün: iki prizma, ışın iki kez 180° döner
    const hh = Math.min(h * 0.2, w * 0.13), ya = h * 0.1;
    const xa = w * 0.64, xb = w * 0.36, yb = ya + hh;
    return { prizmalar: [[[xa, ya], [xa + hh, ya + hh], [xa, ya + 2 * hh]],
                         [[xb, yb], [xb - hh, yb + hh], [xb, yb + 2 * hh]]],
             gy: ya + 0.5 * hh, goz: true, yuz: 4, yansima: 4,
             ad: 'Dürbün: 4 tam yansıma · ışın yön değiştirmeden aşağı kayar' };
  }
  if (p.sistem === 3) {                        // renkleri birleştirme: ters çevrilmiş özdeş prizma
    const g = prizma(w * 0.62, h, p);
    const k1 = [[g.tx, g.ty], [g.lx, g.ly], [g.rx, g.ry]].map(([x, y]) => [x - w * 0.10, y]);
    /* 2. prizma = 1.’nin 180° döndürülmüşü; yüzeyleri karşılıklı PARALEL.
       Yeri, sarı ışının (kaydırıcıdaki giriş açısıyla) çıkış doğrultusuna göre sabit. */
    const q = Object.assign({}, pHam, { mod: 2 });
    const iz0 = izle([k1], ...gelisNoktasi(k1, q, w), cizN(q, 589), w, h);
    const cik = iz0.olaylar.find(e => e.iceriden && !e.tam);
    const son = iz0.noktalar[iz0.noktalar.length - 1];
    let O = [w * 0.6, h * 0.5];
    if (cik) {
      const ux = son[0] - cik.x, uy = son[1] - cik.y, ul = Math.hypot(ux, uy) || 1;
      const sag = [(k1[0][0] + k1[2][0]) / 2, (k1[0][1] + k1[2][1]) / 2];
      const hedef = [cik.x + ux / ul * w * 0.10, cik.y + uy / ul * w * 0.10];
      O = [(sag[0] + hedef[0]) / 2, (sag[1] + hedef[1]) / 2];
    }
    const k2 = k1.map(([x, y]) => [2 * O[0] - x, 2 * O[1] - y]);
    return { prizmalar: [k1, k2], dispersiyon: true, ad: 'Ters çevrilmiş özdeş prizma renkleri yeniden BİRLEŞTİRİR' };
  }
  /* periskop: iki prizma, her biri 90° döndürür */
  const L = Math.min(h * 0.3, w * 0.18), x1 = w * 0.42, y1 = h * 0.07, y2 = y1 + L + h * 0.24;
  return { prizmalar: [[[x1, y1], [x1, y1 + L], [x1 + L, y1 + L]],
                       [[x1, y2], [x1 + L, y2], [x1 + L, y2 + L]]],
           gy: y1 + 0.5 * L, goz: true, yuz: 4, yansima: 2,
           ad: 'Periskop: 2 tam yansıma · ışın 90° + 90° döner' };
}

/** Sol yüzeyin %48’inden, θ₁ açısıyla giren ışının başlangıcı ve doğrultusu. */
function gelisNoktasi(k, p, w) {
  const [T, Lk] = k;
  const Qx = T[0] + (Lk[0] - T[0]) * 0.48, Qy = T[1] + (Lk[1] - T[1]) * 0.48;
  const A2 = rad(p.tepe) / 2, gAci = A2 - rad(p.giris);
  const uz = Math.min(w * 0.26, 150);
  return [Qx - uz * Math.cos(gAci), Qy - uz * Math.sin(gAci), Math.cos(gAci), Math.sin(gAci)];
}

/** Çizimde kullanılan indis: dispersiyon ABARTI katı büyütülür (daha dağıtıcı bir cam gibi). */
const ABARTI = 12;
function cizN(p, lam) { const n0 = indis(p, 589); return n0 + ABARTI * (indis(p, lam) - n0); }
const RENK_DALGA = [400, 440, 480, 520, 560, 600, 650, 700];

function cizBilesik(ctx, w, h, st, p, pHam) {
  const s = bilesikSahne(w, h, p, pHam);
  s.prizmalar.forEach(k => cizCokgen(ctx, k));
  if (s.dispersiyon) {
    const [x0, y0, dx, dy] = gelisNoktasi(s.prizmalar[0], p, w);
    D.isin(ctx, x0, y0, x0 + dx * 60, y0 + dy * 60, '#FFFFFF', 4, false);
    D.isin(ctx, x0, y0, x0 + dx * 60, y0 + dy * 60, 'rgba(80,110,150,.55)', 1, false);
    D.yaziAydinlik(ctx, 'beyaz ışık', x0 + 4, y0 - 10, '#14506E', '700 11px system-ui, sans-serif', 'left');
    RENK_DALGA.forEach(lam => {
      const iz = izle(s.prizmalar, x0, y0, dx, dy, cizN(p, lam), w, h);
      cizYol(ctx, iz, renkDalga(lam), 1.8, false);
    });
    D.yaziAydinlik(ctx, 'Çıkan renkler gelen ışına PARALEL · renk ayrımı ×' + ABARTI + ' abartılı (daha dağıtıcı cam gibi)',
                   10, h - 10, R.surtunme, '600 11px system-ui, sans-serif', 'left');
  } else {
    const n = indis(p, 589);
    const iz = izle(s.prizmalar, 4, s.gy, 1, 0, n, w, h);
    cizYol(ctx, iz, R.ivme, 2.6, true);
    akanNoktalar(ctx, iz, st.t || 0, R.ivme);
    const [ex, ey] = iz.noktalar[iz.noktalar.length - 1];
    const tamSay = iz.olaylar.filter(e => e.tam).length;
    const basarili = tamSay === s.yansima;
    if (basarili) goz(ctx, Math.min(w - 16, ex - 14), ey, -1, 0);
    D.yaziAydinlik(ctx, basarili ? 'Işık göze ulaşıyor · ' + tamSay + ' tam yansıma, yansımada kayıp YOK'
                                 : 'n = ' + D.biçim(n, 3) + ' < 1,414 ⟹ 45° yüzeyde tam yansıma yok, ışık KAÇIYOR',
                   10, h - 10, basarili ? R.hiz : R.kuvvet, '700 12px system-ui, sans-serif', 'left');
  }
  D.yaziAydinlik(ctx, s.ad, w - 10, 20, '#14506E', '700 12px system-ui, sans-serif', 'right');
}

/** Göz (bakış yönü −x: ışığa bakar). */
function goz(ctx, x, y) {
  ctx.save(); ctx.translate(x, y);
  ctx.fillStyle = '#fff'; ctx.strokeStyle = '#2A3242'; ctx.lineWidth = 1.6;
  ctx.beginPath(); ctx.moveTo(10, 0); ctx.quadraticCurveTo(0, -9, -10, 0); ctx.quadraticCurveTo(0, 9, 10, 0);
  ctx.fill(); ctx.stroke();
  ctx.fillStyle = '#3B6EA5'; ctx.beginPath(); ctx.arc(-3, 0, 3.8, 0, 6.2832); ctx.fill();
  ctx.fillStyle = '#111'; ctx.beginPath(); ctx.arc(-3.6, 0, 1.7, 0, 6.2832); ctx.fill();
  ctx.restore();
}

/** Prizma sisteminden göze ulaşan ışık oranı: dik yüzeylerde Fresnel kaybı,
    45° yüzeylerde tam yansıma (kayıpsız) ya da kısmi yansıma. */
function sistemGecen(n, yuz, yansima) {
  const R0 = ((n - 1) / (n + 1)) ** 2;
  const R45 = fresnel(n, 1, 45);
  return Math.pow(1 - R0, yuz) * Math.pow(R45, yansima);
}
const AYNA_R = 0.90;            // sıradan alüminyum ayna: her yansımada ~%90

/* ------------------------------------------ Klasik fizik görünümü */

function cizKlasik(ctx, w, h, st, pHam) {
  const p = etkin(st, pHam);
  D.izgara(ctx, w, h, 26);
  const n = indis(p, 589);

  if (p.mod > 3.5) {
    const liste = [];
    if (p.sistem === 3) {
      const g1 = gecis(p, indis(p, 400)), g2 = gecis(p, indis(p, 700));
      liste.push(['Renkleri birleştirme (Alıştırma 23 b)', K.beyaz, '700 12px system-ui, sans-serif'],
        ['1. prizma beyaz ışığı ayırır:', K.metin2, '11px system-ui, sans-serif'],
        ['mor δ = ' + (g1 && g1.sapma !== null ? D.biçim(g1.sapma, 3) + '°' : '—') + ' · kırmızı δ = ' +
          (g2 && g2.sapma !== null ? D.biçim(g2.sapma, 3) + '°' : '—'), R.normal, '700 12px system-ui, sans-serif'],
        ['', K.metin2, '11px'],
        ['2. prizma aynı camdan, 180° döndürülmüş:', K.metin2, '11px system-ui, sans-serif'],
        ['yüzeyleri 1.’nin yüzeylerine PARALEL', K.metin2, '11px system-ui, sans-serif'],
        ['⟹ her renk ters yönde aynı kadar sapar', R.ivme, '700 12px system-ui, sans-serif'],
        ['⟹ toplam sapma 0, renkler yine paralel', R.hiz, '700 12px system-ui, sans-serif'],
        ['', K.metin2, '11px'],
        ['Üst üste binen renkler yeniden BEYAZ', K.beyaz, '700 12px system-ui, sans-serif'],
        ['ışık oluşturur (Newton’un deneyi).', K.metin2, '11px system-ui, sans-serif']);
    } else {
      const s = p.sistem === 2 ? { yuz: 4, yansima: 4, ad: 'Dürbün (Alıştırma 24)' } : { yuz: 4, yansima: 2, ad: 'Periskop' };
      const gec = sistemGecen(n, s.yuz, s.yansima), ayna = Math.pow(AYNA_R, s.yansima);
      liste.push([s.ad + ' · ' + s.yansima + ' yansıma', K.beyaz, '700 12px system-ui, sans-serif'],
        ['n = ' + D.biçim(n, 4) + '  ·  θ_s = ' + D.biçim(sinirAcisi(n), 3) + '°', R.normal, '12px system-ui, sans-serif'],
        [n >= Math.SQRT2 ? '45° ≥ θ_s ⟹ her yansıma TAM' : '45° < θ_s ⟹ yansıma KISMİ, ışık kaçar',
          n >= Math.SQRT2 ? R.hiz : R.kuvvet, '700 12px system-ui, sans-serif'],
        ['', K.metin2, '11px'],
        ['Göze ulaşan ışık', K.beyaz, '700 12px system-ui, sans-serif'],
        ['prizmalarla: %' + D.biçim(gec * 100, 3), R.hiz, '700 13px system-ui, sans-serif'],
        ['(yalnız ' + s.yuz + ' dik yüzeyde ((n−1)/(n+1))² kaybı)', K.metin2, '11px system-ui, sans-serif'],
        ['aynalarla:   %' + D.biçim(ayna * 100, 3), R.kuvvet, '700 13px system-ui, sans-serif'],
        ['(her yansımada ~%' + D.biçim(AYNA_R * 100, 0) + ' yansıtan ayna)', K.metin2, '11px system-ui, sans-serif'],
        ['', K.metin2, '11px'],
        ['Kitap: prizmada parlaklık ve netlik kaybı', K.metin2, '11px system-ui, sans-serif'],
        ['aynaya göre azdır, prizma daha dayanıklıdır.', K.metin2, '11px system-ui, sans-serif']);
    }
    let sy = 40;
    liste.forEach(([t, c, f]) => { if (t) D.yaziHaleli(ctx, t, 12, sy, c, f, 'left'); sy += 18; });
    return;
  }

  if (p.mod > 2.5) {
    const sahne = tamSahne(600, 340, p);
    const renkler = p.duzen === 5 ? [[656, 'kırmızı', R.kuvvet], [470, 'mavi', '#5B8DEF']] : [[589, 'ışık', R.ivme]];
    const liste = [['Tam yansımalı prizma', K.beyaz, '700 12px system-ui, sans-serif'],
                   ['sin θ_s = 1/n', K.metin, '12px system-ui, sans-serif']];
    renkler.forEach(([lam, ad, renk]) => {
      const nn = indis(p, lam), iz = izle([sahne.kose], 4, sahne.gy, 1, 0, nn, 600, 340);
      const ilk = iz.olaylar.find(e => e.iceriden);
      liste.push(['', K.metin2, '11px'],
        [ad + ': n = ' + D.biçim(nn, 4) + ' ⟹ θ_s = ' + D.biçim(sinirAcisi(nn), 3) + '°', renk, '700 12px system-ui, sans-serif'],
        ['yüzeye gelme ' + (ilk ? D.biçim(ilk.gelme, 3) : '—') + '° ⟹ ' +
          (ilk && ilk.tam ? 'TAM YANSIMA' : 'kırılarak çıkar'), ilk && ilk.tam ? R.hiz : R.kuvvet, '700 12px system-ui, sans-serif']);
    });
    liste.push(['', K.metin2, '11px'],
      ['Dar açılar 45° ⟹ koşul n ≥ 1/sin45° = 1,414', K.metin2, '11px system-ui, sans-serif'],
      ['Kitap: camdan havaya θ_s = 42° (n ≈ 1,49)', K.metin2, '11px system-ui, sans-serif'],
      ['Işık prizmayı gelme doğrultusuna DİK', K.metin2, '11px system-ui, sans-serif'],
      ['ya da PARALEL olarak terk eder.', K.metin2, '11px system-ui, sans-serif']);
    let sy = 40;
    liste.forEach(([t, c, f]) => { if (t) D.yaziHaleli(ctx, t, 12, sy, c, f, 'left'); sy += 17; });
    return;
  }

  if (p.mod > 1.5) {
    const nm = indis(p, 400), nk = indis(p, 700);
    const gm = gecis(p, nm), gk = gecis(p, nk);
    D.yaziHaleli(ctx, 'Dispersiyon · Cauchy', w * 0.34, 40, K.beyaz,
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
    let sy = 62;
    satir.forEach(([t, c, f]) => { if (t) D.yaziHaleli(ctx, t, w * 0.34, sy, c, f, 'left'); sy += 17; });
    return;
  }

  const gec = gecis(p, n);
  const dmin = enKucukSapma(p, n);
  D.yaziHaleli(ctx, 'Prizmada sapma', 12, 40, K.beyaz,
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
  let sy = 62;
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
  sy = 40;
  sag.forEach(([t, c, f]) => { if (t) D.yaziHaleli(ctx, t, sx, sy, c, f, 'left'); sy += 17; });
}

/* ---------------------------------------------------- Grafik paneli */

function cizGrafik(ctx, w, h, st, pHam) {
  const p = etkin(st, pHam);
  const pay = 8, gw = (w - pay * 3) / 2, gh = h - 6;
  const n = indis(p, 589);
  if (p.mod > 2.5) { grafikTam(ctx, pay, gw, gh, p, pHam); return; }

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

/* ---- Mod 3–4 grafikleri ---- */
function grafikTam(ctx, pay, gw, gh, p, pHam) {
  const sol = { x: pay, y: 3, w: gw, h: gh }, sag = { x: pay * 2 + gw, y: 3, w: gw, h: gh };
  const cz = (k, o) => D.miniGrafik(ctx, Object.assign({}, k, o));

  if (p.mod > 3.5 && p.sistem === 3) {
    /* renkleri birleştirme: θ₁ ekseninde, imleçler taranan giriş açısıyla kayar */
    const v1 = [], v2 = [], v3 = [];
    const s = bilesikSahne(600, 340, Object.assign({}, p, { giris: pHam.giris }), pHam);
    for (let a = 35; a <= 65; a += 1) {          // taranan aralık
      const q = Object.assign({}, p, { giris: a });
      const gm = gecis(q, indis(q, 400)), gk = gecis(q, indis(q, 700));
      if (gm && gm.sapma !== null) v1.push({ t: a, v: gm.sapma });
      if (gk && gk.sapma !== null) v2.push({ t: a, v: gk.sapma });
      const [x0, y0, dx, dy] = gelisNoktasi(s.prizmalar[0], q, 600);
      const iz = izle(s.prizmalar, x0, y0, dx, dy, indis(q, 589), 600, 340);
      const m = iz.noktalar.length, [ax, ay] = iz.noktalar[m - 2], [bx, by] = iz.noktalar[m - 1];
      v3.push({ t: a, v: der(Math.atan2(by - ay, bx - ax) - Math.atan2(dy, dx)) });
    }
    const top = [...v1, ...v2].map(q => q.v), yUst = Math.max(...top) * 1.1, yAlt = Math.min(...top) * 0.9;
    const gm = gecis(p, indis(p, 400)), gk = gecis(p, indis(p, 700));
    cz(sol, { baslik: '1. prizmada sapma − θ₁   (mor üstte · kırmızı altta)', birim: '°', tEtiket: 'θ₁ (°)',
      veri: v1, tMin: 35, tMax: 65, vMin: yAlt, vMax: yUst, sifirdanBasla: false, renk: '#8E24AA',
      imlec: gm && gm.sapma !== null ? { t: p.giris, v: gm.sapma } : null });
    cz(sol, { baslik: '', birim: '', tEtiket: '', veri: v2, tMin: 35, tMax: 65, vMin: yAlt, vMax: yUst,
      sifirdanBasla: false, renk: '#E53935', imlec: gk && gk.sapma !== null ? { t: p.giris, v: gk.sapma } : null });
    const cur = v3.find(q => Math.abs(q.t - Math.round(p.giris)) < 0.5);
    cz(sag, { baslik: 'İki prizmadan sonra toplam sapma − θ₁   (≈ 0: gelene paralel)', birim: '°', tEtiket: 'θ₁ (°)',
      veri: v3, tMin: 35, tMax: 65, vMin: -5, vMax: 5, renk: R.hiz,
      imlec: cur ? { t: p.giris, v: cur.v } : null });
    return;
  }

  /* n ekseninde: n taranırken imleçler kayar */
  const nOrta = indis(p, 589);
  if (p.mod > 3.5) {
    const s = p.sistem === 2 ? { yuz: 4, yansima: 4 } : { yuz: 4, yansima: 2 };
    const v1 = [], v2 = [], v3 = [];
    for (let n = 1.30; n <= 1.901; n += 0.01) {
      v1.push({ t: n, v: 100 * sistemGecen(n, s.yuz, s.yansima) });
      v2.push({ t: n, v: 100 * Math.pow(AYNA_R, s.yansima) });
      v3.push({ t: n, v: 100 * (1 - fresnel(n, 1, 45)) });
    }
    cz(sol, { baslik: 'Göze ulaşan ışık % − n   (mavi prizma · kırmızı ayna)', birim: '%', tEtiket: 'n',
      veri: v1, tMin: 1.3, tMax: 1.9, vMin: 0, vMax: 100, renk: R.hiz,
      imlec: { t: nOrta, v: 100 * sistemGecen(nOrta, s.yuz, s.yansima) } });
    cz(sol, { baslik: '', birim: '', tEtiket: '', veri: v2, tMin: 1.3, tMax: 1.9, vMin: 0, vMax: 100, renk: R.kuvvet });
    cz(sag, { baslik: '45° yüzeyden kaçan ışık % − n   (n ≥ 1,414: sıfır)', birim: '%', tEtiket: 'n',
      veri: v3, tMin: 1.3, tMax: 1.9, vMin: 0, vMax: 100, renk: R.kuvvet,
      imlec: { t: nOrta, v: 100 * (1 - fresnel(nOrta, 1, 45)) } });
    return;
  }

  /* mod 3: kritik yüzeydeki gelme açısı ve sınır açısı */
  const sahne = tamSahne(600, 340, p);
  const lam = p.duzen === 5 ? 656 : 589;
  const vS = [], vG = [], vK = [];
  for (let nd = 1.30; nd <= 1.901; nd += 0.01) {
    const nn = nd + (indis(p, lam) - nOrta);
    vS.push({ t: nd, v: sinirAcisi(nn) });
    const ilk = izle([sahne.kose], 4, sahne.gy, 1, 0, nn, 600, 340).olaylar.find(e => e.iceriden);
    if (ilk) {
      vG.push({ t: nd, v: ilk.gelme });
      vK.push({ t: nd, v: ilk.tam ? 0 : 100 * (1 - fresnel(nn, 1, ilk.gelme)) });
    }
  }
  const nn = indis(p, lam);
  const ilk = izle([sahne.kose], 4, sahne.gy, 1, 0, nn, 600, 340).olaylar.find(e => e.iceriden);
  cz(sol, { baslik: 'Sınır açısı (mor) ve yüzeye gelme açısı (turuncu) − n', birim: '°', tEtiket: 'n (589 nm)',
    veri: vS, tMin: 1.3, tMax: 1.9, vMin: 0, vMax: 90, renk: R.surtunme, imlec: { t: nOrta, v: sinirAcisi(nn) } });
  if (vG.length > 1)
    cz(sol, { baslik: '', birim: '', tEtiket: '', veri: vG, tMin: 1.3, tMax: 1.9, vMin: 0, vMax: 90, renk: R.ivme,
      imlec: ilk ? { t: nOrta, v: ilk.gelme } : null });
  cz(sag, { baslik: 'Yüzeyden kaçan ışık % − n   (tam yansımada 0)', birim: '%', tEtiket: 'n (589 nm)',
    veri: vK, tMin: 1.3, tMax: 1.9, vMin: 0, vMax: 100, renk: R.kuvvet,
    imlec: ilk ? { t: nOrta, v: ilk.tam ? 0 : 100 * (1 - fresnel(nn, 1, ilk.gelme)) } : null });
}

/* ------------------------------------------------------------ Okumalar */

function okumalar(st, pHam) {
  const p = etkin(st, pHam);
  const n = indis(p, 589);
  const sa = sinirAcisi(n);

  if (p.mod > 3.5) {
    if (p.sistem === 3) {
      const gm = gecis(p, indis(p, 400)), gk = gecis(p, indis(p, 700));
      return [
        { et: 'Sistem',          dg: 'İki özdeş prizma · ikincisi ters', birim: '' },
        { et: 'Giriş açısı θ₁',  dg: D.biçim(p.giris), birim: '°' },
        { et: '1. prizmada mor', dg: gm && gm.sapma !== null ? D.biçim(gm.sapma, 4) : '—', birim: '°' },
        { et: '1. prizmada kırmızı', dg: gk && gk.sapma !== null ? D.biçim(gk.sapma, 4) : '—', birim: '°' },
        { et: 'İkisinden sonra', dg: 'Sapma 0 · renkler paralel', birim: '' }
      ];
    }
    const s = p.sistem === 2 ? { yuz: 4, yansima: 4, ad: 'Dürbün' } : { yuz: 4, yansima: 2, ad: 'Periskop' };
    return [
      { et: 'Sistem',             dg: s.ad + ' · ' + s.yansima + ' yansıma', birim: '' },
      { et: 'Prizma indisi n',    dg: D.biçim(n, 4), birim: '' },
      { et: 'Sınır açısı θ_s',    dg: D.biçim(sa, 4), birim: '°' },
      { et: 'Göze ulaşan (prizma)', dg: D.biçim(100 * sistemGecen(n, s.yuz, s.yansima), 3), birim: '%' },
      { et: 'Göze ulaşan (ayna)', dg: D.biçim(100 * Math.pow(AYNA_R, s.yansima), 3), birim: '%' }
    ];
  }

  if (p.mod > 2.5) {
    const sahne = tamSahne(600, 340, p);
    const lam = p.duzen === 5 ? 656 : 589, nn = indis(p, lam);
    const ilk = izle([sahne.kose], 4, sahne.gy, 1, 0, nn, 600, 340).olaylar.find(e => e.iceriden);
    const liste = [
      { et: 'Düzen',            dg: ['', 'a) 90° döndürür', 'b) 180° döndürür', 'c) paralel çıkarır', '30°–60°–90°', 'K prizması'][p.duzen], birim: '' },
      { et: (p.duzen === 5 ? 'Kırmızı ' : '') + 'indis n', dg: D.biçim(nn, 4), birim: '' },
      { et: 'Sınır açısı θ_s',  dg: D.biçim(sinirAcisi(nn), 4), birim: '°' },
      { et: 'Yüzeye gelme',     dg: ilk ? D.biçim(ilk.gelme, 4) : '—', birim: '°' },
      { et: 'Sonuç',            dg: ilk && ilk.tam ? 'Tam yansıma' : 'Kırılarak çıkar', birim: '' }
    ];
    if (p.duzen === 5) {
      const nb = indis(p, 470), ib = izle([sahne.kose], 4, sahne.gy, 1, 0, nb, 600, 340).olaylar.find(e => e.iceriden);
      liste.push({ et: 'Mavi: n · sonuç', dg: D.biçim(nb, 4) + ' · ' + (ib && ib.tam ? 'tam yansıma' : 'çıkar'), birim: '' });
    }
    return liste;
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
  baslik: '3.7 · Prizmalar · sapma, renklere ayrılma, tam yansımalı prizma, dürbün',
  yukseklik: 340,
  grafikPanel: true,
  grafikYukseklik: 150,
  parametreler: [
    { anahtar: 'mod', etiket: 'Düzenek', tur: 'secim', deger: 1, secenekler: [
      { d: 1, e: 'Sapma açısı' },
      { d: 2, e: 'Dispersiyon · renklere ayrılma' },
      { d: 3, e: 'Tam yansımalı prizma' },
      { d: 4, e: 'Bileşik sistemler (periskop · dürbün)' }
    ]},
    { anahtar: 'duzen', etiket: 'Tam yansımalı prizma (3)', tur: 'secim', deger: 1, secenekler: [
      { d: 1, e: 'a) dik kenara dik · 90°' },
      { d: 2, e: 'b) hipotenüse dik · 180°' },
      { d: 3, e: 'c) hipotenüse paralel' },
      { d: 4, e: '30°–60°–90° prizma (örnek)' },
      { d: 5, e: 'K prizması: kırmızı ve mavi' }
    ]},
    { anahtar: 'sistem', etiket: 'Bileşik sistem (4)', tur: 'secim', deger: 1, secenekler: [
      { d: 1, e: 'Periskop' },
      { d: 2, e: 'Dürbün' },
      { d: 3, e: 'Renkleri birleştirme' }
    ]},
    { anahtar: 'tepe',  etiket: 'Tepe açısı A',     min: 20,   max: 75,   adim: 1,    deger: 60,    birim: '°' },
    { anahtar: 'nD',    etiket: 'n (589 nm)',       min: 1.30, max: 1.90, adim: 0.005, deger: 1.517, birim: '' },
    { anahtar: 'giris', etiket: 'Giriş açısı θ₁',   min: 5,    max: 85,   adim: 1,    deger: 50,    birim: '°' },
    { anahtar: 'disp',  etiket: 'Dispersiyon B',    min: 0,    max: 20,   adim: 0.2,  deger: 4.2,   birim: '·10³ nm²' }
  ],
  durum, adim, bitti, cizGercek, cizKlasik, cizGrafik, okumalar
};

})();
