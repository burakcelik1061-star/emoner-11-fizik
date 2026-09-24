(function () {
"use strict";
window.F11 = window.F11 || {};

/* ==========================================================================
   sims/duzlem-ayna.js
   --------------------------------------------------------------------------
   Konu 3.2 · Düzlem aynalar  (MEB 11, s.312-322)

   YANSIMA YASASI
   --------------
       gelme açısı = yansıma açısı        (ikisi de NORMALDEN ölçülür)

   DÜZLEM AYNADA GÖRÜNTÜ
   ---------------------
   · Aynanın arkasında, cisimle aynadan EŞİT uzaklıkta
   · Boyu cisimle aynı
   · Düz (ters değil)
   · SANAL — perdeye düşürülemez, yalnızca aynaya bakınca görülür

   AYNA BOYU KURALI
   ----------------
   Bir insanın kendini boydan boya görebilmesi için gereken en küçük ayna,
   boyunun YARISI kadardır ve bu sonuç insanın aynaya uzaklığından BAĞIMSIZDIR.
   Simülasyon bunu uzaklık kaydırıcısıyla doğrudan gösterir.

   DÖNDÜRME KURALI
   ---------------
   Ayna θ kadar döndürülürse yansıyan ışın 2θ kadar döner.

   GÖRÜŞ ALANI (kitap s.317-318)
   -----------------------------
   Gözün aynadaki görüntüsünden aynanın iki ucuna çizilen doğruların arasında
   kalan, ayna önündeki bölge. Saydam olmayan bir cismin kendisinin ya da
   görüntüsünün arkasında kalan cisimler görülemez. Aynaya yaklaşınca görüş
   alanı genişler.

   DÜZGÜN VE DAĞINIK YANSIMA (kitap s.316)
   ---------------------------------------
   Paralel ışınlar düz yüzeyden paralel, pürüzlü yüzeyden farklı doğrultularda
   yansır — ama her ışın kendi noktasındaki normale göre yansıma yasasına uyar.
   ========================================================================== */

const D = window.F11;
const { R, K } = D;

/* ------------------------------------------------------------- Fizik */

function gelmeAcisi(p) { return (p.gelme * Math.PI) / 180; }
function aynaAcisi(p)  { return (p.aynaAci * Math.PI) / 180; }

/** Ayna döndürülünce yansıyan ışının döndüğü açı (derece). */
function isinDonmesi(p) { return 2 * p.aynaAci; }

/**
 * İki düzlem ayna arasındaki görüntülerin açısal konumları (derece, matematik
 * yönü; 1. ayna 0°’de, 2. ayna α’da; cisim AÇIORTAYDA). Görüntüler ardışık
 * yansımalarla bulunur: bir görüntü ancak bir aynanın ÖNÜNDEYSE o aynada
 * yeniden yansır. İki zincir (önce 1. aynada / önce 2. aynada) birleştirilir,
 * çakışan görüntüler bir kez sayılır. 360/α tam sayıysa sonuç 360/α − 1’dir.
 */
function goruntuAcilari(alfa) {
  const phi = alfa / 2;
  const norm = a => ((a % 360) + 360) % 360;
  const onunde1 = a => { const x = norm(a); return x > 1e-6 && x < 180 - 1e-6; };
  const onunde2 = a => { const x = norm(a - alfa + 180); return x > 1e-6 && x < 180 - 1e-6; };
  const ayni = (a, b) => { const d = Math.abs(norm(a) - norm(b)); return Math.min(d, 360 - d) < 1e-6; };
  const sonuc = [];
  for (const ilk of [1, 2]) {
    let a = phi, ayna = ilk;
    for (let k = 0; k < 60; k++) {
      if (ayna === 1) { if (!onunde1(a)) break; a = -a; }
      else            { if (!onunde2(a)) break; a = 2 * alfa - a; }
      if (!ayni(a, phi) && !sonuc.some(b => ayni(a, b))) sonuc.push(norm(a));
      ayna = 3 - ayna;
    }
  }
  return sonuc;
}

function goruntuSayisi(p) { return goruntuAcilari(Math.max(1, p.ikiAci)).length; }

/** Mod 1: gelen ışın uzayda SABİTTİR; ayna θ dönünce gelme açısı i − θ olur. */
function gercekGelme(p) { return p.gelme - p.aynaAci; }
function arkadanMi(p) { return Math.abs(gercekGelme(p)) >= 90; }

/** Mod 2: göz yüksekliği (boyun 0,92’si) ve doğru yerleştirilmiş aynanın
    üst ucu (baş ile göz arasının ortası). */
function gozYuk(p) { return 0.92 * p.boy; }
function aynaUstYuk(p) { return (p.boy + gozYuk(p)) / 2; }
function aynaAltYuk(p) { return Math.max(0, aynaUstYuk(p) - p.aynaBoy); }
/** Aynada görülebilen en alçak vücut noktası (cm, yerden). Bir noktanın ışını
    aynaya (y + göz)/2 yüksekliğinde çarpar; bu nokta aynanın altındaysa
    görülemez. */
function gorulenAlt(p) { return Math.max(0, 2 * aynaAltYuk(p) - gozYuk(p)); }

/** Boydan boya görmek için gereken en küçük ayna boyu (cm). */
function gerekenAynaBoyu(p) { return p.boy / 2; }

/* -------------------------------------------------------------- Durum */

/* Oynat'a basılınca düzeneğin anahtar büyüklüğü taranır; kaydırıcı taramanın
   BAŞLADIĞI değeri verir. Böylece her düzenekte bir şeyin nasıl değiştiği
   canlı görünür. */
const TARAMA_PERIYOT = 12;

function durum(p) { return { t: 0, gelme: p.gelme, uzaklik: p.uzaklik, ikiAci: p.ikiAci, gozX: p.gozX }; }

function adim(st, dt, p) {
  st.t += dt;
  if (p.mod < 1.5 || p.mod > 4.5) st.gelme = D.tarama(st.t, p.gelme, p.gelme < 40 ? 80 : 5, TARAMA_PERIYOT);
  else if (p.mod < 2.5) st.uzaklik = D.tarama(st.t, p.uzaklik, p.uzaklik < 160 ? 300 : 30, TARAMA_PERIYOT);
  else if (p.mod < 3.5) st.ikiAci  = Math.round(D.tarama(st.t, p.ikiAci, p.ikiAci < 100 ? 180 : 40, TARAMA_PERIYOT) / 10) * 10;
  else                  st.gozX    = D.tarama(st.t, p.gozX, p.gozX < 0 ? 4 : -4, TARAMA_PERIYOT);   // göz sağa-sola yürür
}

function bitti() { return false; }

function etkin(st, p) {
  return Object.assign({}, p, { gelme: st.gelme ?? p.gelme, uzaklik: st.uzaklik ?? p.uzaklik,
                                ikiAci: st.ikiAci ?? p.ikiAci, gozX: st.gozX ?? p.gozX });
}

/* ------------------------------------------------ Görüş alanı (mod 4) */

/* Üstten bakış, birim kareli oda. Ayna üst duvarda, x ∈ [−2, 2], y = 0;
   oda y > 0 yönünde. Toplar sabit, saydam değil (yarıçap 0,35 birim). */
const AYNA_YARI = 2;
const TOPLAR = [
  { ad: 'K', x: -4.5, y: 3 }, { ad: 'L', x: -2, y: 4.5 }, { ad: 'M', x: 0.6, y: 2.2 },
  { ad: 'N', x: 2.5, y: 4 },  { ad: 'P', x: 5, y: 2.5 }
];
const TOP_R = 0.35;

function goz(p) { return { x: p.gozX, y: p.gozUz }; }

/** Noktanın doğru parçasına uzaklığı. */
function parcaUzaklik(px, py, ax, ay, bx, by) {
  const dx = bx - ax, dy = by - ay, L2 = dx * dx + dy * dy || 1;
  const t = Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / L2));
  return Math.hypot(px - (ax + t * dx), py - (ay + t * dy));
}

/** Top gözden aynada görülebilir mi? Işın top → aynadaki H noktası → göz.
    H, göz ile topun görüntüsünü (x, −y) birleştiren doğrunun aynayı kestiği
    noktadır. H aynanın dışındaysa görüş alanı dışındadır; yol üzerinde başka
    bir top varsa (cismin ya da görüntünün arkası) görülemez. */
function gorunurluk(top, p) {
  const g = goz(p);
  const gx = top.x, gy = -top.y;                        // görüntü
  const t = g.y / (g.y - gy);                            // y = 0 kesişimi
  const hx = g.x + (gx - g.x) * t;
  if (Math.abs(hx) > AYNA_YARI) return { gorunur: false, neden: 'alan dışı', hx };
  for (const b of TOPLAR) {
    if (b === top) continue;
    if (parcaUzaklik(b.x, b.y, top.x, top.y, hx, 0) < TOP_R * 1.6 ||
        parcaUzaklik(b.x, b.y, hx, 0, g.x, g.y) < TOP_R * 1.6)
      return { gorunur: false, neden: b.ad + ' engelliyor', hx };
  }
  return { gorunur: true, neden: '', hx };
}

/** Görüş açısı (°): gözün aynayı gördüğü açı — yaklaştıkça büyür. */
function gorusAcisi(p) {
  const g = goz(p);
  return (Math.atan2(AYNA_YARI - g.x, g.y) + Math.atan2(AYNA_YARI + g.x, g.y)) * 180 / Math.PI;
}

/* ------------------------------------------------ Dağınık yansıma (mod 5) */

/** Pürüzlü yüzeyin k. noktasındaki normalin eğikliği (rad) — sabit tohumlu. */
function puruzEgim(k) { const x = Math.sin(k * 12.9898 + 4.1) * 43758.5453; return (x - Math.floor(x) - 0.5) * 1.1; }

/* --------------------------------------------- Gerçekçi görünüm */

function cizGercek(ctx, w, h, st, pHam) {
  const p = etkin(st, pHam);
  if (p.mod < 1.5)      cizYansima(ctx, w, h, st, p);
  else if (p.mod < 2.5) cizGoruntu(ctx, w, h, st, p);
  else if (p.mod < 3.5) cizIkiAyna(ctx, w, h, st, p);
  else if (p.mod < 4.5) cizGorusAlani(ctx, w, h, st, p);
  else                  cizDaginik(ctx, w, h, st, p);
}

function cizGorusAlani(ctx, w, h, st, p) {
  const u = Math.min(w / 13, (h - 50) / 8.5);           // px / birim kare
  const ox = w / 2, oy = 40;
  const X = x => ox + x * u, Y = y => oy + y * u;
  /* birim kareler */
  ctx.save(); ctx.strokeStyle = 'rgba(120,130,150,.18)'; ctx.lineWidth = 1;
  for (let x = -6; x <= 6; x++) { ctx.beginPath(); ctx.moveTo(X(x), Y(0)); ctx.lineTo(X(x), Y(8)); ctx.stroke(); }
  for (let y = 0; y <= 8; y++) { ctx.beginPath(); ctx.moveTo(X(-6), Y(y)); ctx.lineTo(X(6), Y(y)); ctx.stroke(); }
  ctx.restore();

  const g = goz(p), gG = { x: g.x, y: -g.y };
  /* görüş alanı: gözün görüntüsünden aynanın uçlarına çizilen doğrular */
  /* görüntüden (x, −y) aynanın ucundan geçen doğru, oda tabanına (y = 8) kadar uzatılır */
  const uzat = (ux) => { const t = (8 - gG.y) / Math.max(1e-6, 0 - gG.y); return { x: gG.x + (ux - gG.x) * t, y: 8 }; };
  const s1 = uzat(-AYNA_YARI), s2 = uzat(AYNA_YARI);
  ctx.save(); ctx.fillStyle = 'rgba(53,192,138,.14)';
  ctx.beginPath(); ctx.moveTo(X(-AYNA_YARI), Y(0)); ctx.lineTo(X(s1.x), Y(s1.y)); ctx.lineTo(X(s2.x), Y(s2.y)); ctx.lineTo(X(AYNA_YARI), Y(0)); ctx.closePath(); ctx.fill();
  ctx.restore();
  ctx.save(); ctx.setLineDash([5, 4]); ctx.strokeStyle = 'rgba(26,122,85,.8)'; ctx.lineWidth = 1.4;
  [[-AYNA_YARI, s1], [AYNA_YARI, s2]].forEach(([ux, sn]) => { ctx.beginPath(); ctx.moveTo(X(ux), Y(0)); ctx.lineTo(X(sn.x), Y(sn.y)); ctx.stroke(); });
  ctx.restore();

  /* ayna (üst duvar) */
  ctx.fillStyle = '#8FB6EC'; ctx.fillRect(X(-AYNA_YARI), Y(0) - 5, AYNA_YARI * 2 * u, 5);
  ctx.save(); ctx.strokeStyle = '#5F6B78'; ctx.lineWidth = 1;
  for (let x = X(-AYNA_YARI); x < X(AYNA_YARI); x += 6) { ctx.beginPath(); ctx.moveTo(x, Y(0) - 5); ctx.lineTo(x + 5, Y(0) - 10); ctx.stroke(); }
  ctx.restore();

  /* toplar ve ışın yolları */
  let gorulen = [];
  TOPLAR.forEach(b => {
    const v = gorunurluk(b, p);
    if (v.gorunur) {
      gorulen.push(b.ad);
      D.isin(ctx, X(b.x), Y(b.y), X(v.hx), Y(0), 'rgba(255,176,32,.9)', 1.6, false);
      D.isin(ctx, X(v.hx), Y(0), X(g.x), Y(g.y), 'rgba(226,75,74,.9)', 1.6, false);
    }
    ctx.fillStyle = v.gorunur ? '#35C08A' : '#9AA5B1';
    ctx.beginPath(); ctx.arc(X(b.x), Y(b.y), TOP_R * u, 0, 6.2832); ctx.fill();
    D.yaziAydinlik(ctx, b.ad, X(b.x), Y(b.y), '#FFFFFF', '700 12px system-ui, sans-serif', 'center');
    if (!v.gorunur && v.neden !== 'alan dışı')
      D.yaziAydinlik(ctx, v.neden, X(b.x), Y(b.y) + TOP_R * u + 12, '#B03030', '600 10px system-ui, sans-serif', 'center');
  });

  /* göz */
  ctx.fillStyle = '#23272E'; ctx.beginPath(); ctx.ellipse(X(g.x), Y(g.y), 9, 6, 0, 0, 6.2832); ctx.fill();
  ctx.fillStyle = '#FFFFFF'; ctx.beginPath(); ctx.arc(X(g.x), Y(g.y), 2.5, 0, 6.2832); ctx.fill();
  D.yaziAydinlik(ctx, 'göz', X(g.x) + 14, Y(g.y) + 2, R.mur, '700 11px system-ui, sans-serif', 'left');

  D.rozet(ctx, 'görülen: ' + (gorulen.length ? gorulen.join(', ') : 'hiçbiri'), w / 2, 4, 'rgba(26,122,85,.92)', '#FFFFFF',
          '700 11px system-ui, sans-serif', true);
  D.yaziAydinlik(ctx, 'görüş alanı: gözün görüntüsünden aynanın uçlarına çizilen doğruların arası (yeşil)',
                 10, h - 10, R.mur, '600 11px system-ui, sans-serif', 'left');
}

function cizDaginik(ctx, w, h, st, p) {
  const i = gelmeAcisi(p);
  const yy = h * 0.66, yarim = w * 0.46;
  const bolum = [[w * 0.03, w / 2 - 12, false, 'DÜZGÜN yüzey (ayna)'], [w / 2 + 12, w * 0.97, true, 'PÜRÜZLÜ yüzey (kâğıt)']];
  for (const [x0, x1, puruzlu, ad] of bolum) {
    /* yüzey */
    ctx.save(); ctx.strokeStyle = '#5F6B78'; ctx.lineWidth = 3; ctx.beginPath();
    const adet = 7, ara = (x1 - x0) / adet;
    if (!puruzlu) { ctx.moveTo(x0, yy); ctx.lineTo(x1, yy); }
    else for (let k = 0; k <= adet * 3; k++) { const x = x0 + k * ara / 3; const y = yy + (k % 2 ? -5 : 5) * (0.6 + Math.abs(puruzEgim(k))); if (k) ctx.lineTo(x, y); else ctx.moveTo(x, y); }
    ctx.stroke(); ctx.restore();
    D.yaziAydinlik(ctx, ad, (x0 + x1) / 2, yy + 26, R.mur, '700 12px system-ui, sans-serif', 'center');
    /* paralel gelen ışınlar ve yansımalar */
    for (let k = 0; k < adet; k++) {
      const hx = x0 + (k + 0.5) * ara;
      const L = Math.min(h * 0.5, 150);
      const gx = hx - Math.sin(i) * L, gy = yy - Math.cos(i) * L;
      D.isin(ctx, gx, gy, hx, yy, 'rgba(255,176,32,.9)', 1.6);
      const n = puruzlu ? puruzEgim(k * 3 + 1) : 0;            // yerel normalin eğikliği
      const rAci = 2 * n + i;                                   // yansıyan ışının düşeyle açısı (sağa +)
      const rx = hx + Math.sin(rAci) * L * 0.9, ry = yy - Math.cos(rAci) * L * 0.9;
      if (Math.cos(rAci) > 0.05) D.isin(ctx, hx, yy, rx, ry, 'rgba(226,75,74,.9)', 1.6);
      if (puruzlu && k === 3)
        D.kesikliCizgi(ctx, hx, yy, hx + Math.sin(n) * 50, yy - Math.cos(n) * 50, R.mur, 1.2, [3, 3]);
    }
  }
  D.yaziAydinlik(ctx, 'her ışın kendi noktasındaki NORMALE göre yansır; pürüzlü yüzeyde normaller farklı olduğu için ışınlar dağılır',
                 10, h - 10, R.mur, '600 11px system-ui, sans-serif', 'left');
  void yarim;
}

function cizYansima(ctx, w, h, st, p) {
  const ax = w * 0.50, ay = h * 0.56;
  const aynaBoy = Math.min(h * 0.62, 210);
  const th = aynaAcisi(p);

  D.duzlemAyna(ctx, ax, ay, aynaBoy, th);

  /* normal */
  D.normalDogrultu(ctx, ax, ay, 84, th);
  D.yaziAydinlik(ctx, 'normal', ax - Math.cos(th) * 96, ay - Math.sin(th) * 96,
                 R.mur, '600 11px system-ui, sans-serif', 'center');

  /* Gelen ışın uzayda SABİT: ayna dönmeden önceki normale göre i açısıyla
     gelir. Ayna θ dönünce gelme açısı i − θ olur ve yansıyan ışın 2θ döner. */
  const i = gelmeAcisi(p);
  const L = Math.min(w * 0.36, 190);
  const gx = ax - Math.cos(i) * L, gy = ay - Math.sin(i) * L;
  D.isin(ctx, gx, gy, ax, ay, '#FFB020', 2.4);
  D.yaziAydinlik(ctx, 'gelen', gx + 8, gy - 10, '#B07800',
                 '700 11px system-ui, sans-serif', 'left');

  if (arkadanMi(p)) {
    D.yaziAydinlik(ctx, 'ışın aynanın ARKASINA düşüyor — yansıma yok', w / 2, h - 12, '#B03030',
                   '700 12px system-ui, sans-serif', 'center');
    return;
  }

  /* yansıyan ışın — normalin diğer tarafında, eşit açıyla */
  const ig = i - th;                                   // gerçek gelme açısı
  const ry0 = 2 * th - i;
  const rx = ax - Math.cos(ry0) * L, ry = ay - Math.sin(ry0) * L;
  D.isin(ctx, ax, ay, rx, ry, '#E24B4A', 2.4);
  D.yaziAydinlik(ctx, 'yansıyan', rx + 8, ry - 10, '#B03030',
                 '700 11px system-ui, sans-serif', 'left');

  /* ayna dönmeseydi yansıyan ışın nerede olurdu — 2θ farkı görünsün */
  if (p.aynaAci !== 0) {
    D.sanalIsin(ctx, ax, ay, ax - Math.cos(-i) * L * 0.8, ay - Math.sin(-i) * L * 0.8, 'rgba(176,48,48,.45)');
  }

  /* açı yayları — normalden ölçülür */
  const aci = D.biçim(Math.abs(gercekGelme(p)), 0) + '°';
  D.aciYayi(ctx, ax, ay, 52, Math.PI + th, Math.PI + th + ig, R.ivme, aci);
  D.aciYayi(ctx, ax, ay, 68, Math.PI + th - ig, Math.PI + th, R.kuvvet, aci);

  D.yaziAydinlik(ctx, 'gelme açısı = yansıma açısı', w / 2, h - 12, R.mur,
                 '700 12px system-ui, sans-serif', 'center');
  if (p.aynaAci !== 0)
    D.yaziAydinlik(ctx, 'ayna ' + D.biçim(p.aynaAci) + '° döndü ⟹ yansıyan ışın ' +
                   D.biçim(isinDonmesi(p)) + '° döndü (kesikli: eski yeri)', w - 10, 26, R.ivme,
                   '700 12px system-ui, sans-serif', 'right');
}

function cizGoruntu(ctx, w, h, st, p) {
  const ax = w * 0.52;
  const zemin = h - 40;
  const olcek = Math.min((h - 90) / 190, (w * 0.34) / 200);

  /* zemin */
  ctx.fillStyle = '#C9A06A'; ctx.fillRect(0, zemin, w, h - zemin);

  /* Ayna DOĞRU yere asılır: üst ucu baş ile göz arasının ortasında. Boyu
     yetmezse aşağı uzanamaz ve ayaklar görünmez. */
  const aynaUst = zemin - aynaUstYuk(p) * olcek;
  const aynaAlt = zemin - aynaAltYuk(p) * olcek;
  ctx.save();
  ctx.fillStyle = 'rgba(143,182,236,.30)';
  ctx.fillRect(ax - 4, aynaUst, 8, aynaAlt - aynaUst);
  ctx.strokeStyle = '#8FB6EC'; ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(ax, aynaUst); ctx.lineTo(ax, aynaAlt);
  ctx.stroke();
  ctx.restore();

  /* insan — D.insan ÖLÇEK alır, piksel boyu değil: figür yaklaşık 28·s
     yüksekliğindedir, bu yüzden istenen piksel boyu 28'e bölünür. */
  const ix = ax - p.uzaklik * olcek;
  const boyPx = p.boy * olcek;
  const olcekInsan = boyPx / 28;
  D.insan(ctx, ix, zemin, olcekInsan);

  /* görüntü — aynanın arkasında, eşit uzaklıkta, kesikli */
  ctx.save();
  ctx.globalAlpha = 0.45;
  const gx = ax + p.uzaklik * olcek;
  D.insan(ctx, gx, zemin, olcekInsan);
  ctx.restore();
  D.yaziAydinlik(ctx, 'görüntü (sanal)', gx, zemin + 22, R.mur,
                 '600 11px system-ui, sans-serif', 'center');

  /* baş ve ayak ışınları */
  const bas = zemin - boyPx, ayak = zemin;
  const goz = zemin - gozYuk(p) * olcek;
  D.isin(ctx, ix, bas, ax, (bas + goz) / 2, 'rgba(255,176,32,.85)', 1.8, false);
  D.isin(ctx, ax, (bas + goz) / 2, ix, goz, 'rgba(226,75,74,.85)', 1.8, false);

  const yeterli = gorulenAlt(p) <= 0.5;
  if (yeterli) {
    D.isin(ctx, ix, ayak, ax, (ayak + goz) / 2, 'rgba(255,176,32,.85)', 1.8, false);
    D.isin(ctx, ax, (ayak + goz) / 2, ix, goz, 'rgba(226,75,74,.85)', 1.8, false);
  } else {
    /* ayaktan çıkan ışın aynanın ALTINDAN geçer — göze ulaşamaz */
    D.sanalIsin(ctx, ix, ayak, ax, (ayak + goz) / 2, 'rgba(176,48,48,.6)');
    D.yaziAydinlik(ctx, '✕ ayak görünmez', ax + 8, (ayak + goz) / 2, '#B03030',
                   '700 11px system-ui, sans-serif', 'left');
    /* görülebilen en alt noktanın ışını */
    const gAlt = zemin - gorulenAlt(p) * olcek;
    D.isin(ctx, ix, gAlt, ax, aynaAlt, 'rgba(255,176,32,.85)', 1.8, false);
    D.isin(ctx, ax, aynaAlt, ix, goz, 'rgba(226,75,74,.85)', 1.8, false);
    D.olcu(ctx, ix - 22, gAlt, ix - 22, ayak, 'görünmeyen ' + D.biçim(gorulenAlt(p), 0) + ' cm', '#B03030');
  }

  /* gereken ayna aralığı işaretle */
  const ust = (bas + goz) / 2, alt = (ayak + goz) / 2;
  D.olcu(ctx, ax + 30, ust, ax + 30, alt, D.biçim(gerekenAynaBoyu(p)) + ' cm', R.hiz);
  D.rozet(ctx, yeterli ? 'BOYDAN BOYA GÖRÜYOR' : 'AYNA KISA — tamamı görünmüyor',
          w / 2, 52, yeterli ? 'rgba(53,192,138,.92)' : 'rgba(226,72,63,.92)',
          yeterli ? '#0A2A1E' : '#FFFFFF', '700 11px system-ui, sans-serif', true);

  D.yaziAydinlik(ctx, 'boy ' + D.biçim(p.boy) + ' cm · ayna ' + D.biçim(p.aynaBoy) + ' cm',
                 10, 42, R.mur, '700 12px system-ui, sans-serif', 'left');
  D.yaziAydinlik(ctx, 'gereken: boyun YARISI = ' + D.biçim(gerekenAynaBoyu(p)) + ' cm',
                 w - 10, 42, R.hiz, '700 12px system-ui, sans-serif', 'right');
  D.yaziAydinlik(ctx, 'uzaklığı değiştir — gereken ayna boyu DEĞİŞMEZ',
                 w / 2, h - 12, R.mur, '600 11px system-ui, sans-serif', 'center');
}

function cizIkiAyna(ctx, w, h, st, p) {
  const cx = w * 0.46, cy = h * 0.54;
  const L = Math.min(w * 0.30, h * 0.40);
  const a = (p.ikiAci * Math.PI) / 180;

  /* İki ayna: sırlı (yansıtan) yüzleri aradaki bölgeye, taramalı arka
     yüzleri DIŞARIYA bakar. */
  D.duzlemAyna(ctx, cx + L / 2, cy, L, Math.PI / 2);
  ctx.save();
  ctx.translate(cx, cy); ctx.rotate(-a); ctx.translate(-cx, -cy);
  D.duzlemAyna(ctx, cx + L / 2, cy, L, -Math.PI / 2);
  ctx.restore();

  D.aciYayi(ctx, cx, cy, 46, -a, 0, R.ivme, D.biçim(p.ikiAci) + '°');

  /* cisim */
  const nx = cx + Math.cos(-a / 2) * L * 0.55;
  const ny = cy + Math.sin(-a / 2) * L * 0.55;
  D.noktaCisim(ctx, nx, ny, 8, R.hiz);
  D.yaziAydinlik(ctx, 'cisim', nx, ny - 20, R.mur,
                 '700 11px system-ui, sans-serif', 'center');

  /* Görüntüler — ardışık yansımalarla bulunan GERÇEK konumlar. Hepsi köşeye
     eşit uzaklıkta, yani aynı çember üzerindedir. */
  const acilar = goruntuAcilari(p.ikiAci);
  const n = acilar.length;
  const rr = Math.hypot(nx - cx, ny - cy);
  ctx.save();
  ctx.strokeStyle = 'rgba(120,130,150,.35)'; ctx.setLineDash([3, 5]);
  ctx.beginPath(); ctx.arc(cx, cy, rr, 0, 6.2832); ctx.stroke();
  ctx.restore();
  for (const ac of acilar) {
    const r = (ac * Math.PI) / 180;
    const gx = cx + Math.cos(r) * rr, gy = cy - Math.sin(r) * rr;
    ctx.save(); ctx.globalAlpha = 0.55;
    D.noktaCisim(ctx, gx, gy, 6, R.konum);
    ctx.restore();
  }

  const n360 = 360 / Math.max(1, p.ikiAci);
  D.rozet(ctx, n + ' GÖRÜNTÜ', w / 2, 52, 'rgba(47,111,208,.92)', '#FFFFFF',
          '700 12px system-ui, sans-serif', true);
  D.yaziAydinlik(ctx, Number.isInteger(n360) ? 'n = 360/α − 1 = ' + (n360 - 1)
                   : '360/α tam değil ⟹ sayı cismin yerine bağlı (burada açıortayda)',
                 w / 2, h - 12, R.mur, '600 11px system-ui, sans-serif', 'center');
}

/* ----------------------------------------- Klasik fizik görünümü */

function cizKlasik(ctx, w, h, st, pHam) {
  const p = etkin(st, pHam);
  D.izgara(ctx, w, h, 26);

  if (p.mod < 1.5) {
    D.yaziHaleli(ctx, 'Yansıma yasası', 12, 22, K.beyaz,
                 '700 12px system-ui, sans-serif', 'left');
    const satir = [
      ['Gelme açısı = Yansıma açısı', K.beyaz, '700 13px system-ui, sans-serif'],
      [arkadanMi(p) ? 'ışın aynanın arkasında — yansıma yok'
         : 'i = ' + D.biçim(Math.abs(gercekGelme(p)), 0) + '°  ·  r = ' + D.biçim(Math.abs(gercekGelme(p)), 0) + '°',
       R.ivme, '12px system-ui, sans-serif'],
      ['', K.metin2, '11px'],
      ['Açılar YÜZEYDEN değil,', R.kuvvet, '700 12px system-ui, sans-serif'],
      ['NORMALDEN ölçülür', R.kuvvet, '700 12px system-ui, sans-serif'],
      ['', K.metin2, '11px'],
      ['Gelen ışın, yansıyan ışın ve', K.metin2, '11px system-ui, sans-serif'],
      ['normal AYNI düzlemdedir', K.metin2, '11px system-ui, sans-serif'],
      ['', K.metin2, '11px'],
      ['Ayna θ dönerse ışın 2θ döner', K.beyaz, '700 12px system-ui, sans-serif'],
      ['θ = ' + D.biçim(p.aynaAci) + '° ⟹ ' + D.biçim(isinDonmesi(p)) + '°', R.normal, '700 12px system-ui, sans-serif']
    ];
    let sy = 46;
    satir.forEach(([t, c, f]) => {
      if (t) D.yaziHaleli(ctx, t, w * 0.30, sy, c, f, 'left');
      sy += 17;
    });
    return;
  }

  if (p.mod < 2.5) {
    D.yaziHaleli(ctx, 'Neden boyun yarısı?', 12, 22, K.beyaz,
                 '700 12px system-ui, sans-serif', 'left');

    /* geometri şeması — aynanın uzaklığı taranan uzaklıkla değişir; ışınların
       eğimi değişse de aynanın gereken boyu (yarım boy) DEĞİŞMEZ */
    const ix = w * 0.12, ust = h * 0.22, alt = h * 0.76;
    const ax = ix + w * (0.06 + 0.30 * Math.min(1, p.uzaklik / 300));
    const goz = ust + (alt - ust) * 0.08;
    ctx.strokeStyle = K.eksen; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(ix, ust); ctx.lineTo(ix, alt); ctx.stroke();
    ctx.strokeStyle = '#8FB6EC'; ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(ax, (ust + goz) / 2); ctx.lineTo(ax, (alt + goz) / 2);
    ctx.stroke();

    D.isin(ctx, ix, ust, ax, (ust + goz) / 2, R.ivme, 1.8, false);
    D.isin(ctx, ax, (ust + goz) / 2, ix, goz, R.kuvvet, 1.8, false);
    D.isin(ctx, ix, alt, ax, (alt + goz) / 2, R.ivme, 1.8, false);
    D.isin(ctx, ax, (alt + goz) / 2, ix, goz, R.kuvvet, 1.8, false);

    D.yaziHaleli(ctx, 'baş', ix - 8, ust, K.metin2, '11px system-ui, sans-serif', 'right');
    D.yaziHaleli(ctx, 'göz', ix - 8, goz, K.metin2, '11px system-ui, sans-serif', 'right');
    D.yaziHaleli(ctx, 'ayak', ix - 8, alt, K.metin2, '11px system-ui, sans-serif', 'right');

    const bx = w * 0.52;
    const satir = [
      ['Işın aynaya tam ORTA noktadan', K.metin2, '11px system-ui, sans-serif'],
      ['yansır (gelme = yansıma)', K.metin2, '11px system-ui, sans-serif'],
      ['', K.metin2, '11px'],
      ['Üst sınır: baş–göz arasının yarısı', K.beyaz, '11px system-ui, sans-serif'],
      ['Alt sınır: göz–ayak arasının yarısı', K.beyaz, '11px system-ui, sans-serif'],
      ['', K.metin2, '11px'],
      ['Toplam = boyun YARISI', R.hiz, '700 13px system-ui, sans-serif'],
      ['= ' + D.biçim(gerekenAynaBoyu(p)) + ' cm', R.hiz, '700 13px system-ui, sans-serif'],
      ['', K.metin2, '11px'],
      ['UZAKLIK formüle GİRMEZ', R.kuvvet, '700 12px system-ui, sans-serif'],
      ['Ayna DOĞRU yüksekliğe asılmalı:', K.metin2, '11px system-ui, sans-serif'],
      ['üst ucu baş–göz ortasında', K.metin2, '11px system-ui, sans-serif']
    ];
    let sy = 46;
    satir.forEach(([t, c, f]) => {
      if (t) D.yaziHaleli(ctx, t, bx, sy, c, f, 'left');
      sy += 17;
    });
    return;
  }

  if (p.mod > 3.5 && p.mod < 4.5) {
    D.yaziHaleli(ctx, 'Görüş alanı nasıl bulunur?', 12, 22, K.beyaz, '700 12px system-ui, sans-serif', 'left');
    const satir = [
      ['1. Gözün aynadaki görüntüsü alınır', K.metin2, '11px system-ui, sans-serif'],
      ['   (aynaya dik, eşit uzaklıkta)', K.metin2, '11px system-ui, sans-serif'],
      ['2. Görüntüden aynanın uçlarına', K.metin2, '11px system-ui, sans-serif'],
      ['   doğrular çizilir', K.metin2, '11px system-ui, sans-serif'],
      ['3. Aradaki bölge = görüş alanı', R.hiz, '700 12px system-ui, sans-serif'],
      ['', K.metin2, '11px'],
      ['Görüş açısı = ' + D.biçim(gorusAcisi(p), 1) + '°', R.normal, '700 12px system-ui, sans-serif'],
      ['Aynaya yaklaşınca alan GENİŞLER', K.beyaz, '700 11px system-ui, sans-serif'],
      ['Saydam olmayan cismin ya da görüntüsünün', K.metin2, '11px system-ui, sans-serif'],
      ['arkasında kalan cisim GÖRÜLEMEZ', R.kuvvet, '700 11px system-ui, sans-serif']
    ];
    let sy = 46;
    satir.forEach(([t, c, f]) => { if (t) D.yaziHaleli(ctx, t, 16, sy, c, f, 'left'); sy += 17; });
    return;
  }
  if (p.mod > 4.5) {
    D.yaziHaleli(ctx, 'Düzgün ve dağınık yansıma', 12, 22, K.beyaz, '700 12px system-ui, sans-serif', 'left');
    const satir = [
      ['Düzgün yansıma: paralel gelen ışınlar', K.metin2, '11px system-ui, sans-serif'],
      ['düz yüzeyden PARALEL yansır → görüntü oluşur', R.hiz, '700 11px system-ui, sans-serif'],
      ['', K.metin2, '11px'],
      ['Dağınık yansıma: pürüzlü yüzeyde her noktanın', K.metin2, '11px system-ui, sans-serif'],
      ['normali farklıdır → ışınlar FARKLI yönlere', R.ivme, '700 11px system-ui, sans-serif'],
      ['yansır → her yönden görülür, görüntü oluşmaz', K.metin2, '11px system-ui, sans-serif'],
      ['', K.metin2, '11px'],
      ['İkisinde de her ışın için gelme = yansıma', K.beyaz, '700 12px system-ui, sans-serif'],
      ['gelme açısı = ' + D.biçim(p.gelme, 0) + '°', R.normal, '11px system-ui, sans-serif']
    ];
    let sy = 46;
    satir.forEach(([t, c, f]) => { if (t) D.yaziHaleli(ctx, t, 16, sy, c, f, 'left'); sy += 17; });
    return;
  }

  /* iki ayna */
  D.yaziHaleli(ctx, 'İki düzlem ayna arasında görüntü', 12, 22, K.beyaz,
               '700 12px system-ui, sans-serif', 'left');
  const n360 = 360 / Math.max(1, p.ikiAci);
  const tam = Number.isInteger(n360);
  const satir = [
    ['n = 360/α − 1', K.beyaz, '700 13px system-ui, sans-serif'],
    ['α = ' + D.biçim(p.ikiAci) + '°', K.metin2, '11px system-ui, sans-serif'],
    ['360/α = ' + D.biçim(n360, 3), K.metin2, '11px system-ui, sans-serif'],
    [tam ? 'bölme TAM ⟹ n = ' + goruntuSayisi(p)
         : 'bölme tam değil ⟹ cisim açıortayda: n = ' + goruntuSayisi(p),
     R.normal, '700 13px system-ui, sans-serif'],
    [tam ? '' : '(formül yalnız TAM bölmede geçerlidir)', K.metin2, '11px system-ui, sans-serif'],
    ['', K.metin2, '11px'],
    ['α = 90° ⟹ 3 görüntü', K.metin2, '11px system-ui, sans-serif'],
    ['α = 60° ⟹ 5 görüntü', K.metin2, '11px system-ui, sans-serif'],
    ['α = 0° (paralel) ⟹ sonsuz', R.ivme, '700 12px system-ui, sans-serif']
  ];
  let sy = 50;
  satir.forEach(([t, c, f]) => {
    if (t) D.yaziHaleli(ctx, t, w * 0.30, sy, c, f, 'left');
    sy += 18;
  });
  D.yaziHaleli(ctx, 'Berberdeki karşılıklı aynalar: α ≈ 0 ⟹ görüntü tükenmez',
               12, h - 16, R.ivme, '600 11px system-ui, sans-serif', 'left');
}

/* ------------------------------------------------------- Grafikler */

function cizGrafik(ctx, w, h, st, pHam) {
  const p = etkin(st, pHam);
  const pay = 8, gw = (w - pay * 3) / 2, gh = h - 6;
  const sol = { x: pay, y: 3, w: gw, h: gh }, sag = { x: pay * 2 + gw, y: 3, w: gw, h: gh };
  const cz = (k, o) => D.miniGrafik(ctx, Object.assign({}, k, o));

  if (p.mod < 1.5) {
    const v1 = [], v2 = [];
    for (let a = 0; a <= 89; a += 1) v1.push({ t: a, v: a });
    for (let a = -30; a <= 30; a += 1) v2.push({ t: a, v: 2 * a });
    cz(sol, { baslik: 'Yansıma açısı − gelme açısı   (r = i)', birim: '°', tEtiket: 'i (°)',
      veri: v1, tMax: 90, vMin: 0, vMax: 90, renk: R.kuvvet,
      imlec: arkadanMi(p) ? null : { t: Math.abs(gercekGelme(p)), v: Math.abs(gercekGelme(p)) } });
    cz(sag, { baslik: 'Yansıyan ışının dönmesi − aynanın dönmesi   (2θ)', birim: '°', tEtiket: 'θ (°)',
      veri: v2, tMin: -30, tMax: 30, vMin: -60, vMax: 60, renk: R.ivme, imlec: { t: p.aynaAci, v: isinDonmesi(p) } });
    return;
  }
  if (p.mod < 2.5) {
    const v1 = [], v2 = [];
    for (let d = 30; d <= 300; d += 5) v1.push({ t: d, v: gerekenAynaBoyu(p) });
    for (let a = 20; a <= 200; a += 2) v2.push({ t: a, v: gorulenAlt(Object.assign({}, p, { aynaBoy: a })) });
    cz(sol, { baslik: 'Gereken ayna boyu − uzaklık   (uzaklıktan BAĞIMSIZ)', birim: 'cm', tEtiket: 'uzaklık (cm)',
      veri: v1, tMin: 30, tMax: 300, vMin: 0, vMax: p.boy, renk: R.hiz, imlec: { t: p.uzaklik, v: gerekenAynaBoyu(p) } });
    cz(sag, { baslik: 'Görünmeyen alt kısım − ayna boyu   (boy/2’de sıfır)', birim: 'cm', tEtiket: 'ayna boyu (cm)',
      veri: v2, tMin: 20, tMax: 200, vMin: 0, vMax: p.boy, renk: R.kuvvet, imlec: { t: p.aynaBoy, v: gorulenAlt(p) } });
    return;
  }
  if (p.mod < 3.5) {
    const v1 = [];
    for (let a = 30; a <= 180; a += 1) v1.push({ t: a, v: goruntuAcilari(a).length });
    cz(sol, { baslik: 'Görüntü sayısı − aynalar arası açı', birim: 'tane', tEtiket: 'α (°)',
      veri: v1, tMin: 30, tMax: 180, vMin: 0, vMax: 12, renk: R.konum, imlec: { t: p.ikiAci, v: goruntuSayisi(p) } });
    const v2 = [];
    for (let a = 30; a <= 180; a += 1) v2.push({ t: a, v: 360 / a - 1 });
    cz(sag, { baslik: '360/α − 1   (yalnız TAM bölmede görüntü sayısına eşit)', birim: '', tEtiket: 'α (°)',
      veri: v2, tMin: 30, tMax: 180, vMin: 0, vMax: 12, renk: R.ivme, imlec: { t: p.ikiAci, v: 360 / p.ikiAci - 1 } });
    return;
  }
  if (p.mod < 4.5) {
    const v1 = [], v2 = [];
    for (let d = 1; d <= 7.01; d += 0.1) v1.push({ t: d, v: gorusAcisi(Object.assign({}, p, { gozUz: d })) });
    for (let x = -4; x <= 4.01; x += 0.1) v2.push({ t: x, v: gorusAcisi(Object.assign({}, p, { gozX: x })) });
    cz(sol, { baslik: 'Görüş açısı − aynaya uzaklık   (yaklaşınca GENİŞLER)', birim: '°', tEtiket: 'uzaklık (birim)',
      veri: v1, tMin: 1, tMax: 7, vMin: 0, vMax: 180, renk: R.hiz, imlec: { t: p.gozUz, v: gorusAcisi(p) } });
    cz(sag, { baslik: 'Görüş açısı − gözün yatay konumu', birim: '°', tEtiket: 'x (birim)',
      veri: v2, tMin: -4, tMax: 4, vMin: 0, vMax: 180, renk: R.normal, imlec: { t: p.gozX, v: gorusAcisi(p) } });
    return;
  }
  /* dağınık yansıma: yansıyan ışının düşeyle açısı − konum */
  const i = p.gelme;
  const v1 = [], v2 = [];
  for (let k = 0; k < 7; k++) { v1.push({ t: k + 1, v: i }); v2.push({ t: k + 1, v: (2 * puruzEgim(k * 3 + 1)) * 180 / Math.PI + i }); }
  cz(sol, { baslik: 'Düzgün yüzey: yansıyan ışınların yönü   (hepsi aynı)', birim: '°', tEtiket: 'ışın no',
    veri: v1, tMin: 1, tMax: 7, vMin: -90, vMax: 90, renk: R.hiz });
  cz(sag, { baslik: 'Pürüzlü yüzey: yansıyan ışınların yönü   (dağınık)', birim: '°', tEtiket: 'ışın no',
    veri: v2, tMin: 1, tMax: 7, vMin: -90, vMax: 90, renk: R.ivme });
}

/* ----------------------------------------------------------- Okumalar */

function okumalar(st, pHam) {
  const p = etkin(st, pHam);
  if (p.mod < 1.5) {
    return [
      { et: 'Gelme açısı',   dg: arkadanMi(p) ? '—' : D.biçim(Math.abs(gercekGelme(p)), 0), birim: '°' },
      { et: 'Yansıma açısı', dg: arkadanMi(p) ? 'yok' : D.biçim(Math.abs(gercekGelme(p)), 0), birim: '°' },
      { et: 'Ayna dönmesi',  dg: D.biçim(p.aynaAci),      birim: '°' },
      { et: 'Işının dönmesi',dg: D.biçim(isinDonmesi(p)), birim: '°' }
    ];
  }
  if (p.mod < 2.5) {
    return [
      { et: 'Boy',            dg: D.biçim(p.boy),                birim: 'cm' },
      { et: 'Aynaya uzaklık', dg: D.biçim(p.uzaklik),            birim: 'cm' },
      { et: 'Gereken ayna',   dg: D.biçim(gerekenAynaBoyu(p)),   birim: 'cm' },
      { et: 'Seçilen ayna',   dg: D.biçim(p.aynaBoy),            birim: 'cm' },
      { et: 'Sonuç',          dg: gorulenAlt(p) <= 0.5 ? 'Tamamını görür' : 'Alttan ' + D.biçim(gorulenAlt(p), 0) + ' cm görünmez', birim: '' },
      { et: 'Görüntü',        dg: 'Sanal · düz · eşit boy',      birim: '' }
    ];
  }
  if (p.mod > 3.5 && p.mod < 4.5) {
    const gor = TOPLAR.filter(b => gorunurluk(b, p).gorunur).map(b => b.ad);
    return [
      { et: 'Gözün konumu',  dg: 'x = ' + D.biçim(p.gozX, 1) + ' · uzaklık ' + D.biçim(p.gozUz, 1), birim: 'birim' },
      { et: 'Görüş açısı',   dg: D.biçim(gorusAcisi(p), 1), birim: '°' },
      { et: 'Görülen toplar',dg: gor.length ? gor.join(', ') : 'yok', birim: '' },
      { et: 'Görülmeyen',    dg: TOPLAR.filter(b => !gorunurluk(b, p).gorunur).map(b => b.ad + ' (' + gorunurluk(b, p).neden + ')').join(', ') || 'yok', birim: '' }
    ];
  }
  if (p.mod > 4.5) {
    return [
      { et: 'Gelme açısı',  dg: D.biçim(p.gelme, 0), birim: '°' },
      { et: 'Düzgün yüzey', dg: 'Işınlar paralel yansır', birim: '' },
      { et: 'Pürüzlü yüzey',dg: 'Işınlar dağılır', birim: '' },
      { et: 'Yasa',         dg: 'Her ışın için i = r', birim: '' }
    ];
  }
  return [
    { et: 'Aynalar arası açı', dg: D.biçim(p.ikiAci),          birim: '°' },
    { et: '360/α',             dg: D.biçim(360 / Math.max(1, p.ikiAci), 3), birim: '' },
    { et: 'Görüntü sayısı',    dg: String(goruntuSayisi(p)),    birim: 'tane' }
  ];
}

/* ------------------------------------------------------------- Tanım */

D.simler = D.simler || {};
D.simler['duzlem-ayna'] = {
  id: 'duzlem-ayna',
  baslik: '3.2 · Düzlem ayna · yansıma, görüntü, ayna boyu',
  yukseklik: 340,
  grafikPanel: true,
  grafikYukseklik: 160,
  parametreler: [
    { anahtar: 'mod', etiket: 'Düzenek', tur: 'secim', deger: 1, secenekler: [
      { d: 1, e: 'Yansıma yasası' },
      { d: 5, e: 'Düzgün ve dağınık yansıma' },
      { d: 4, e: 'Görüş alanı (hangi toplar görülür?)' },
      { d: 2, e: 'Boydan boya görmek' },
      { d: 3, e: 'İki ayna · görüntü sayısı' }
    ]},
    { anahtar: 'gelme',   etiket: 'Gelme açısı (yansıma, dağınık)', min: 0, max: 80, adim: 5, deger: 40, birim: '°' },
    { anahtar: 'aynaAci', etiket: 'Aynayı döndür (yansıma)', min: -30, max: 30, adim: 5, deger: 0, birim: '°' },
    { anahtar: 'gozX',    etiket: 'Gözün yatay konumu (görüş alanı)', min: -4, max: 4, adim: 0.5, deger: 0, birim: 'birim' },
    { anahtar: 'gozUz',   etiket: 'Gözün aynaya uzaklığı (görüş alanı)', min: 1, max: 7, adim: 0.5, deger: 6, birim: 'birim' },
    { anahtar: 'boy',     etiket: 'İnsan boyu (boydan boya)', min: 120, max: 200, adim: 5, deger: 170, birim: 'cm' },
    { anahtar: 'uzaklik', etiket: 'Aynaya uzaklık (boydan boya)', min: 30, max: 300, adim: 10, deger: 100, birim: 'cm' },
    { anahtar: 'aynaBoy', etiket: 'Ayna boyu (boydan boya)', min: 20, max: 200, adim: 5, deger: 85, birim: 'cm' },
    { anahtar: 'ikiAci',  etiket: 'İki ayna arası açı', min: 30, max: 180, adim: 10, deger: 90, birim: '°' }
  ],
  durum, adim, bitti, cizGercek, cizKlasik, cizGrafik, okumalar
};

})();
