(function () {
"use strict";
window.F11 = window.F11 || {};

/* ==========================================================================
   sims/gorunur-derinlik.js
   --------------------------------------------------------------------------
   Konu 3.5 · Görünür derinlik  (MEB 11, s.354-360)

   TEMEL BAĞINTI (eksene yakın bakış · paraksiyel)
   -----------------------------------------------
       h′ / h = n_gözlemci / n_cisim

   · Cisim suda, gözlemci havada:  h′ = h / n     ⟹ SIĞ görünür
   · Cisim havada, gözlemci suda:  h′ = h · n     ⟹ YÜKSEK görünür

   Görünür yükselme (kalkma) miktarı:

       Δ = h − h′ = h·(1 − 1/n)

   TAM BAĞINTI (bu dosyada kullanılan)
   -----------------------------------
   Belli bir θ₁ bakış açısı için, ışının geri uzantısının düşey ekseni
   kestiği derinlik:

       h′ = h · tan θ₁ / tan θ₂          (n₁ sin θ₁ = n₂ sin θ₂)

   θ₁ → 0 için bu ifade h·n₂/n₁ değerine gider. Eğik bakıldığında cisim
   daha da sığ görünür — havuz kenarından bakınca dibin "kalkmasının"
   sebebi budur. Simülasyon her iki değeri de yan yana gösterir.

   CAM LEVHADA YANAL KAYMA
   -----------------------
       d = t · sin(θ₁ − θ₂) / cos θ₂

   Paralel yüzlü levhada çıkan ışın, gelen ışına DAİMA paraleldir; yalnızca
   yana kayar. Kayma, levha kalınlığı ve gelme açısıyla artar.

   BARDAKTAKİ PARA (kitap 6. Etkinlik)
   -----------------------------------
   Porselen bardaktaki para kenarın arkasında kalıp görünmezken sıvı eklenince
   görünür. Işık yolu tam Snell ile çözülür; eşik sıvı yüksekliği n büyüdükçe
   AZALIR (sıvı yağ sudan önce gösterir).

   RENGE BAĞLILIK (kitap s.357)
   ----------------------------
   n dalga boyuna bağlı olduğundan görünür derinlik de renge bağlıdır:
   suda n(λ) = 1,3252 + 2985/λ²  ⟹  mor cisim kırmızıdan biraz daha SIĞ görünür.
   ========================================================================== */

const D = window.F11;
const { R, K } = D;

/* ------------------------------------------------------------- Fizik */

function rad(d) { return (d * Math.PI) / 180; }
function der(r) { return (r * 180) / Math.PI; }

/** Cismin bulunduğu ve gözlemcinin bulunduğu ortamın indisleri. */
function indisler(p) {
  return p.mod < 1.5 ? { nC: p.n, nG: 1.00 }      // cisim suda, göz havada
                     : { nC: 1.00, nG: p.n };     // cisim havada, göz suda
}

/** Snell — kırılma açısı (rad). Tam yansıma varsa null. */
function kirilma(nC, nG, t1) {
  const s = (nC / nG) * Math.sin(t1);
  return Math.abs(s) > 1 ? null : Math.asin(s);
}

/** Paraksiyel görünür derinlik (cm). */
function paraksiyel(p) {
  const { nC, nG } = indisler(p);
  return (p.h * nG) / nC;
}

/**
 * BAKIŞ AÇISI gözün bulunduğu ortamda, normalden ölçülür (θ_göz). Işığın
 * cismin ortamındaki açısı Snell’den: nC·sin θ_cisim = nG·sin θ_göz.
 * Sudan havaya bakışta θ_göz sınır açısını aşarsa havadan o doğrultuda ışık
 * GELEMEZ (Snell penceresinin dışı) ⟹ null.
 */
function cisimAcisi(p, tGoz) {
  const { nC, nG } = indisler(p);
  const s = (nG / nC) * Math.sin(tGoz);
  return Math.abs(s) > 1 ? null : Math.asin(s);
}

/** Seçilen bakış açısındaki TAM görünür derinlik (cm):
    h′ = h · tan θ_cisim / tan θ_göz. */
function tamGorunur(p) {
  if (p.aci < 0.5) return paraksiyel(p);
  const tg = rad(p.aci);
  const tc = cisimAcisi(p, tg);
  if (tc === null) return null;
  return (p.h * Math.tan(tc)) / Math.tan(tg);
}

/** Cam levhada yanal kayma (cm). */
function yanalKayma(p) {
  const t1 = rad(p.aci);
  const t2 = Math.asin(Math.sin(t1) / p.n);
  return (p.kalinlik * Math.sin(t1 - t2)) / Math.cos(t2);
}

function levhaKirilma(p) {
  return Math.asin(Math.sin(rad(p.aci)) / p.n);
}

function nSu(l) { return 1.3252 + 2985 / (l * l); }
const SIVILAR = [ { n: 1.33, ad: 'su', c: '#2F7FC1' }, { n: 1.47, ad: 'sıvı yağ', c: '#C9A227' },
                  { n: 1.52, ad: 'cam', c: '#2E9E6A' } ];

/* ---- Mod 4 · Bardaktaki para (kitap 6. Etkinlik, Düzenek I–II) ----
   Porselen (ışık geçirmez) bardağın dibindeki para, göz kenarın üstünden
   bakarken önce GÖRÜNMEZ. Sıvı eklendikçe paradan çıkan ışın yüzeyde
   normalden uzaklaşarak kırılır, kenarın üstünden aşıp göze ulaşır.
   Işın yolu Fermat/Snell ile TAM çözülür: yüzeydeki kırılma noktası xs,
       n·sin θ_sıvı = sin θ_hava
   koşulunu sağlayan nokta olarak ikiye bölme yöntemiyle bulunur.
   Uzunluklar cm; orijin bardağın iç tabanının sol köşesi. */
const KAP_G = 8, KAP_Y = 10;                 // iç genişlik, iç yükseklik
const PARA_X = 4.6;                          // paranın ortası
/* Göz, kenarın üstünden geçip boş bardağın tabanına x = 4’te düşen bakış
   doğrultusunda. Eşik sıvı yüksekliği gözün bu doğru üzerindeki UZAKLIĞINA
   bağlı değildir (eşikte ışın kenardan geçer; kenardan sonrası aynı doğru). */
const GOZ_X = 8 + 0.6 * 4, GOZ_Y = 10 + 0.6 * 10;

/** d derinlikli sıvıda paradan göze giden ışının yüzeydeki kırılma noktası. */
function kirilmaNoktasi(n, d) {
  let a = PARA_X, b = GOZ_X;
  for (let i = 0; i < 70; i++) {
    const m = (a + b) / 2;
    const f = n * (m - PARA_X) / Math.hypot(m - PARA_X, d) - (GOZ_X - m) / Math.hypot(GOZ_X - m, GOZ_Y - d);
    if (f > 0) b = m; else a = m;
  }
  return (a + b) / 2;
}

/** Işın yolu ve görünürlük. Boşken (d ≈ 0) doğrudan paradan göze doğru. */
function bardakIsin(n, d) {
  if (d < 1e-3) {
    const yKenar = (KAP_G - PARA_X) * GOZ_Y / (GOZ_X - PARA_X);
    return { bos: true, xs: null, yKenar, gorunur: yKenar >= KAP_Y, pay: yKenar - KAP_Y };
  }
  const xs = kirilmaNoktasi(n, d);
  const yKenar = d + (KAP_G - xs) * (GOZ_Y - d) / (GOZ_X - xs);
  const iceride = xs <= KAP_G;
  const gorunur = iceride && yKenar >= KAP_Y;
  /* görüntü: havadaki ışının geri uzantısının paranın düşeyini kestiği yer */
  const yGor = d + (PARA_X - xs) * (GOZ_Y - d) / (GOZ_X - xs);
  const sinS = (xs - PARA_X) / Math.hypot(xs - PARA_X, d);
  return { bos: false, xs, yKenar, iceride, gorunur, yGor, gDerinlik: d - yGor,
           aSivi: der(Math.asin(sinS)), aHava: der(Math.asin(Math.min(1, n * sinS))), pay: yKenar - KAP_Y };
}

/** Paranın görünmeye başladığı sıvı yüksekliği (cm). */
function esikYukseklik(n) {
  if (bardakIsin(n, KAP_Y).pay < 0) return null;
  let a = 0.001, b = KAP_Y;
  for (let i = 0; i < 50; i++) {
    const m = (a + b) / 2;
    if (bardakIsin(n, m).gorunur) b = m; else a = m;
  }
  return (a + b) / 2;
}

/** Kenar üstünden bakış sınırı: gözden kenara, sıvıda kırılarak tabana. */
function gorusSiniri(n, d) {
  const eg = (GOZ_X - KAP_G) / (GOZ_Y - KAP_Y);             // tan θ_hava
  const xa = KAP_G - (KAP_Y - d) * eg;                      // yüzeye (ya da tabana) ulaştığı x
  if (d < 1e-3) return { xa, ya: 0, xb: xa };
  const sa = eg / Math.hypot(1, eg), sw = sa / n;
  return { xa, ya: d, xb: xa - d * sw / Math.sqrt(1 - sw * sw) };
}

function sivi(n) {
  if (Math.abs(n - 1.33) < 0.006) return 'su';
  if (Math.abs(n - 1.47) < 0.006) return 'sıvı yağ';
  if (Math.abs(n - 1.52) < 0.006) return 'cam';
  if (Math.abs(n - 1.36) < 0.006) return 'etil alkol';
  if (Math.abs(n - 2.41) < 0.006) return 'elmas';
  return 'sıvı';
}

/** Göz: badem biçimi, bebeği bakış yönünde (dx, dy). */
function goz(ctx, x, y, dx, dy, r = 9) {
  const a = Math.atan2(dy, dx);
  ctx.save(); ctx.translate(x, y); ctx.rotate(a);
  ctx.fillStyle = '#FFFFFF'; ctx.strokeStyle = '#2A3242'; ctx.lineWidth = 1.6;
  ctx.beginPath(); ctx.moveTo(-r, 0); ctx.quadraticCurveTo(0, -r * 0.9, r, 0); ctx.quadraticCurveTo(0, r * 0.9, -r, 0);
  ctx.fill(); ctx.stroke();
  ctx.fillStyle = '#3B6EA5'; ctx.beginPath(); ctx.arc(r * 0.3, 0, r * 0.38, 0, 6.2832); ctx.fill();
  ctx.fillStyle = '#111'; ctx.beginPath(); ctx.arc(r * 0.36, 0, r * 0.17, 0, 6.2832); ctx.fill();
  ctx.restore();
}

function cizBardak(ctx, w, h, st, p) {
  const d = st.su ?? 0;
  const genis = GOZ_X + 4.5, yuksek = GOZ_Y + 3.5;              // cm: −2…GOZ_X+2.5 · −1.5…GOZ_Y+2
  const s = Math.min((w - 30) / genis, (h - 30) / yuksek);
  const ox = (w - genis * s) / 2 + 2 * s, oy = h - 24 - 1.5 * s;
  const X = x => ox + x * s, Y = y => oy - y * s;
  const ik = bardakIsin(p.n, d);
  const renk = p.n > 1.4 ? 'rgba(214,176,60,.42)' : 'rgba(60,140,205,.34)';

  /* sıvı */
  if (d > 0) { ctx.save(); ctx.fillStyle = renk; ctx.fillRect(X(0), Y(d), KAP_G * s, d * s); ctx.restore(); }
  /* porselen bardak — ışık geçirmez */
  ctx.save();
  ctx.fillStyle = '#E9EDF2'; ctx.strokeStyle = '#8A95A8'; ctx.lineWidth = 1.5;
  const k = 0.5 * s;
  ctx.beginPath();
  ctx.moveTo(X(0) - k, Y(KAP_Y)); ctx.lineTo(X(0), Y(KAP_Y)); ctx.lineTo(X(0), Y(0));
  ctx.lineTo(X(KAP_G), Y(0)); ctx.lineTo(X(KAP_G), Y(KAP_Y)); ctx.lineTo(X(KAP_G) + k, Y(KAP_Y));
  ctx.lineTo(X(KAP_G) + k, Y(0) + k); ctx.lineTo(X(0) - k, Y(0) + k); ctx.closePath();
  ctx.fill(); ctx.stroke();
  ctx.restore();
  D.yaziAydinlik(ctx, 'porselen bardak', X(KAP_G / 2), Y(0) + k + 14, '#5A6478', '600 11px system-ui, sans-serif', 'center');

  /* para */
  ctx.save(); ctx.fillStyle = '#D4A017'; ctx.strokeStyle = '#8A6A0A'; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.ellipse(X(PARA_X), Y(0) - 3, 1.0 * s, 3, 0, 0, 6.2832); ctx.fill(); ctx.stroke(); ctx.restore();

  /* görüş sınırı: kenarın hemen üstünden geçen bakış */
  const gs = gorusSiniri(p.n, d);
  D.kesikliCizgi(ctx, X(GOZ_X), Y(GOZ_Y), X(gs.xa), Y(gs.ya), 'rgba(90,100,130,.8)', 1.3, [5, 4]);
  if (d > 1e-3) D.kesikliCizgi(ctx, X(gs.xa), Y(gs.ya), X(gs.xb), Y(0), 'rgba(90,100,130,.8)', 1.3, [5, 4]);

  const gozRenk = ik.gorunur ? R.ivme : '#C0392B';
  if (ik.bos) {
    /* boş bardak: paradan göze giden doğru ışın kenara çarpar */
    D.isin(ctx, X(PARA_X), Y(0), X(KAP_G), Y(ik.yKenar), '#C0392B', 2, false);
    carpi(ctx, X(KAP_G), Y(ik.yKenar));
  } else if (!ik.iceride) {
    const yDuvar = (KAP_G - PARA_X) * d / (ik.xs - PARA_X);
    D.isin(ctx, X(PARA_X), Y(0), X(KAP_G), Y(yDuvar), '#C0392B', 2, false);
    carpi(ctx, X(KAP_G), Y(yDuvar));
  } else {
    D.isin(ctx, X(PARA_X), Y(0), X(ik.xs), Y(d), gozRenk, 2.2, true);
    D.kesikliCizgi(ctx, X(ik.xs), Y(d) - 30, X(ik.xs), Y(d) + 30, '#4A5F86', 1.2, [4, 3]);
    if (ik.gorunur) {
      D.isin(ctx, X(ik.xs), Y(d), X(GOZ_X), Y(GOZ_Y), gozRenk, 2.2, true);
      /* geri uzantı ve görünen para */
      D.sanalIsin(ctx, X(ik.xs), Y(d), X(PARA_X), Y(ik.yGor), 'rgba(226,75,74,.85)');
      ctx.save(); ctx.globalAlpha = 0.55; ctx.fillStyle = '#D4A017';
      ctx.beginPath(); ctx.ellipse(X(PARA_X), Y(ik.yGor), 1.0 * s, 3, 0, 0, 6.2832); ctx.fill(); ctx.restore();
      D.yaziAydinlik(ctx, 'görünen para', X(PARA_X) - 1.1 * s - 4, Y(ik.yGor) + 4, R.kuvvet,
                     '700 11px system-ui, sans-serif', 'right');
    } else {
      D.isin(ctx, X(ik.xs), Y(d), X(KAP_G), Y(ik.yKenar), '#C0392B', 2, false);
      carpi(ctx, X(KAP_G), Y(ik.yKenar));
    }
  }
  goz(ctx, X(GOZ_X), Y(GOZ_Y), X(KAP_G) - X(GOZ_X), Y(KAP_Y) - Y(GOZ_Y), 11);

  /* ölçüler */
  if (d > 0.05) D.olcu(ctx, X(-1.3), Y(0), X(-1.3), Y(d), D.biçim(d, 1) + ' cm', R.hiz);
  const esik = esikYukseklik(p.n);
  if (esik !== null) {
    D.kesikliCizgi(ctx, X(-0.4), Y(esik), X(KAP_G + 0.4), Y(esik), 'rgba(167,139,250,.9)', 1.2, [2, 3]);
    D.yaziAydinlik(ctx, 'eşik ' + D.biçim(esik, 2) + ' cm', X(KAP_G) + k + 6, Y(esik) + 4, R.surtunme,
                   '700 11px system-ui, sans-serif', 'left');
  }
  D.yaziAydinlik(ctx, sivi(p.n) + ' · n = ' + D.biçim(p.n, 3), w - 10, 20, '#1B3A52', '700 12px system-ui, sans-serif', 'right');
  D.yaziAydinlik(ctx, ik.gorunur ? 'PARA GÖRÜNÜYOR — ışın kenarı aşıp göze geliyor'
                                 : 'Para görünmüyor — ışın bardağın kenarına çarpıyor',
                 10, h - 8, ik.gorunur ? R.ivme : '#C0392B', '700 12px system-ui, sans-serif', 'left');
}

function carpi(ctx, x, y) {
  ctx.save(); ctx.strokeStyle = '#C0392B'; ctx.lineWidth = 2.4;
  ctx.beginPath(); ctx.moveTo(x - 6, y - 6); ctx.lineTo(x + 6, y + 6); ctx.moveTo(x + 6, y - 6); ctx.lineTo(x - 6, y + 6);
  ctx.stroke(); ctx.restore();
}



/* -------------------------------------------------------------- Durum */

/* Oynat'a basılınca düzeneğin anahtar büyüklüğü taranır; kaydırıcı taramanın
   BAŞLADIĞI değeri verir. Böylece her düzenekte bir şeyin nasıl değiştiği
   canlı görünür. */
const TARAMA_PERIYOT = 12;

function durum(p) { return { t: 0, h: p.h, aci: p.aci, su: 0 }; }

function hHedef(p) { return p.h < 105 ? 200 : 10; }

function adim(st, dt, p) {
  st.t += dt;
  /* 4. düzenek: bardağa sıvı yavaşça eklenir, sonra boşaltılır */
  if (p.mod > 3.5) { st.su = D.tarama(st.t, 0, KAP_Y * 0.95, 16); return; }
  if (p.mod > 2.5) st.aci = D.tarama(st.t, p.aci, p.aci < 35 ? 70 : 2, TARAMA_PERIYOT);
  else             st.h   = D.tarama(st.t, p.h, hHedef(p), TARAMA_PERIYOT);
}

function bitti() { return false; }

function etkin(st, p) {
  return Object.assign({}, p, { h: st.h ?? p.h, aci: st.aci ?? p.aci });
}

/* --------------------------------------------- Gerçekçi görünüm */

function cizGercek(ctx, w, h, st, pHam) {
  const p = etkin(st, pHam);
  if (p.mod > 3.5) { cizBardak(ctx, w, h, st, p); return; }
  if (p.mod > 2.5) { cizLevha(ctx, w, h, p); return; }

  const suUst = p.mod < 1.5 ? h * 0.38 : h * 0.62;         // gözün tarafı gözler sığacak kadar
  const { nC, nG } = indisler(p);

  /* ortamlar — üstteki etiket panel rozetinin altında kalmasın diye sağa yazılır */
  D.ortam(ctx, 0, 0, w, suUst, '', 'rgba(60,140,205,.07)');
  D.ortam(ctx, 0, suUst, w, h - suUst,
          sivi(p.n) + ' · n = ' + D.biçim(p.n, 3), 'rgba(60,140,205,.30)');
  D.yaziAydinlik(ctx, 'hava · n = 1,00', w - 10, 18, '#1B3A52',
                 '700 12px system-ui, sans-serif', 'right');

  /* Cismin bulunduğu taraf ölçeği, gözün bulunduğu taraf ışın uzunluğunu belirler.
     Bu ikisi karıştırılırsa gözlemci ve ışınlar panelin dışına taşar. */
  const bosluk   = p.mod < 1.5 ? h - suUst : suUst;          // cismin tarafı
  const gozTaraf = p.mod < 1.5 ? suUst : h - suUst;          // gözün tarafı
  /* Ölçek tarama boyunca SABİT (en büyük h’ye göre): cisim gerçekten
     derine iner / yükselir. Anlık h’ye göre kurulsaydı cisim hep aynı
     yerde dururdu. */
  const hEnBuyuk = Math.max(pHam.h, hHedef(pHam));
  const olcek = Math.min((bosluk * 0.74) / Math.max(1, hEnBuyuk), 2.2);
  const cx = w * 0.30;
  const yon = p.mod < 1.5 ? +1 : -1;               // cisim aşağıda mı yukarıda mı
  const cisimY = suUst + yon * p.h * olcek;

  /* gerçek cisim */
  D.noktaCisim(ctx, cx, cisimY, 7, R.hiz);
  /* sudan bakışta etiket noktanın sağına: soldaki kalkma ölçüsüyle çakışmasın */
  if (yon > 0)
    D.yaziAydinlik(ctx, 'gerçek yer', cx, cisimY + 22, R.hiz, '700 12px system-ui, sans-serif', 'center');
  else
    D.yaziAydinlik(ctx, 'gerçek yer', cx + 14, cisimY + 4, R.hiz, '700 12px system-ui, sans-serif', 'left');

  /* iki ışın: eksene yakın (referans) ve seçilen BAKIŞ açısı. t2 gözün
     ortamındaki açı (bakış), t1 cismin ortamındaki açı (Snell’den). */
  const t2Ham = rad(Math.max(0.6, p.aci));
  const t1Ham = cisimAcisi(p, t2Ham);
  const t2 = t1Ham === null ? null : t2Ham;
  const t1 = t1Ham === null ? t2Ham : t1Ham;
  const gorunur = tamGorunur(p);

  if (t2 === null) {
    D.yaziAydinlik(ctx, 'Bu bakış açısında havadan ışık gelemez — Snell penceresinin dışı (su yüzeyi ayna gibi)',
                   w * 0.5, h * 0.94, R.kuvvet, '700 12px system-ui, sans-serif', 'center');
  }

  /* ışın 1: düşey (eksene yakın) — ucunda DİK bakan göz */
  const uz1 = gozTaraf * 0.6;             // göz + alt yazı sığsın
  D.isin(ctx, cx, cisimY, cx, suUst, R.ivme, 1.8, false);
  D.isin(ctx, cx, suUst, cx, suUst - yon * uz1, R.ivme, 1.8, true);
  goz(ctx, cx, suUst - yon * (uz1 + 10), 0, yon, 9);
  /* dik bakışta görünen yer (içi boş halka) */
  const ph0 = paraksiyel(p);
  ctx.save(); ctx.strokeStyle = R.kuvvet; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.arc(cx, suUst + yon * ph0 * olcek, 6, 0, 6.2832); ctx.stroke(); ctx.restore();

  /* ışın 2: cisimden θ_cisim açısıyla çıkar, yüzeyde kırılıp θ_göz ile göze gider */
  const yatay = Math.abs(cisimY - suUst) * Math.tan(t1);
  const kx = cx + yatay;
  if (t2 !== null) D.isin(ctx, cx, cisimY, kx, suUst, R.ivme, 2.4, true);

  if (t2 !== null) {
    const uz = gozTaraf * 0.6;
    const ex = kx + uz * Math.tan(t2), ey = suUst - yon * uz;
    D.isin(ctx, kx, suUst, ex, ey, R.ivme, 2.4, true);
    /* eğik bakan göz, ışının geldiği yöne (yüzeye) bakar */
    const ug = Math.hypot(ex - kx, ey - suUst) || 1;
    goz(ctx, ex + (ex - kx) / ug * 10, ey + (ey - suUst) / ug * 10, kx - ex, suUst - ey, 10);

    /* geri uzantı ve görünür konum */
    const gY = suUst + yon * gorunur * olcek;
    D.sanalIsin(ctx, kx, suUst, cx, gY, 'rgba(226,75,74,.85)');
    D.noktaCisim(ctx, cx, gY, 7, R.kuvvet);
    D.yaziAydinlik(ctx, 'görünen yer', cx + 14, gY + (yon > 0 ? 4 : 0), R.kuvvet,
                   '700 12px system-ui, sans-serif', 'left');

    /* kalkma ölçüsü */
    D.olcu(ctx, cx - 40, cisimY, cx - 40, gY,
           D.biçim(Math.abs(p.h - gorunur), 3) + ' cm', R.kuvvet);
  }

  /* normal ve açılar */
  D.kesikliCizgi(ctx, kx, suUst - gozTaraf * 0.55, kx, suUst + bosluk * 0.45,
                 '#4A5F86', 1.3, [5, 4]);

  /* derinlik ölçüsü */
  D.olcu(ctx, w * 0.80, suUst, w * 0.80, cisimY,
         (p.mod < 1.5 ? 'h = ' : 'H = ') + D.biçim(p.h) + ' cm', R.hiz);

  /* özet */
  const ph = paraksiyel(p);
  D.yaziAydinlik(ctx,
    'Dik bakışta (○): ' + D.biçim(ph, 4) + ' cm   ·   ' + D.biçim(p.aci) + '° bakışta (●): ' +
    (gorunur === null ? '—' : D.biçim(gorunur, 4) + ' cm'),
    10, h - 10, R.surtunme, '700 12px system-ui, sans-serif', 'left');
}

/* ---- Mod 3 · Cam levhada yanal kayma ---- */

function cizLevha(ctx, w, h, p) {
  const t1 = rad(p.aci), t2 = levhaKirilma(p);
  const kal = Math.min(h * 0.46, p.kalinlik * 9);
  const ust = h * 0.28, alt = ust + kal;
  const gx = w * 0.40;

  D.ortam(ctx, 0, ust, w, kal, 'cam · n = ' + D.biçim(p.n, 3), 'rgba(60,140,205,.26)');
  D.yaziAydinlik(ctx, 'hava', 12, ust - 12, '#4A5F86', '600 11px system-ui, sans-serif', 'left');
  D.yaziAydinlik(ctx, 'hava', 12, alt + 20, '#4A5F86', '600 11px system-ui, sans-serif', 'left');

  /* normaller */
  D.kesikliCizgi(ctx, gx, ust - 52, gx, ust + 52, '#4A5F86', 1.3, [5, 4]);
  const cx2 = gx + kal * Math.tan(t2);
  D.kesikliCizgi(ctx, cx2, alt - 52, cx2, alt + 52, '#4A5F86', 1.3, [5, 4]);

  /* gelen ışın */
  const L = Math.min(w * 0.30, 150);
  D.isin(ctx, gx - L * Math.sin(t1), ust - L * Math.cos(t1), gx, ust, R.ivme, 2.6, true);
  D.aciYayi(ctx, gx, ust, 38, -Math.PI / 2, -Math.PI / 2 - t1,
            R.ivme, D.biçim(p.aci) + '°');

  /* levha içi */
  D.isin(ctx, gx, ust, cx2, alt, R.kuvvet, 2.6, true);
  D.aciYayi(ctx, gx, ust, 56, Math.PI / 2, Math.PI / 2 - t2,
            R.kuvvet, D.biçim(der(t2), 3) + '°');

  /* çıkan ışın — gelen ışına PARALEL */
  D.isin(ctx, cx2, alt, cx2 + L * Math.sin(t1), alt + L * Math.cos(t1), R.ivme, 2.6, true);

  /* sapmasaydı nereye giderdi */
  const sx = gx + (kal + L * Math.cos(t1)) * Math.tan(t1);
  D.sanalIsin(ctx, gx, ust, sx, alt + L * Math.cos(t1), 'rgba(167,139,250,.85)');
  D.yaziAydinlik(ctx, 'levha olmasaydı', sx + 6, alt + L * Math.cos(t1) - 6,
                 R.surtunme, '600 11px system-ui, sans-serif', 'left');

  /* kayma ölçüsü — çıkan ışına dik */
  const d = yanalKayma(p);
  const dpx = d * (kal / Math.max(0.01, p.kalinlik));
  const mx = cx2 + L * 0.45 * Math.sin(t1), my = alt + L * 0.45 * Math.cos(t1);
  D.olcu(ctx, mx, my, mx + dpx * Math.cos(t1), my - dpx * Math.sin(t1),
         'd = ' + D.biçim(d, 3) + ' cm', R.surtunme);

  D.yaziAydinlik(ctx, 'Çıkan ışın gelen ışına PARALELDİR — yalnızca yana kayar',
                 w * 0.5, h - 10, R.surtunme, '700 12px system-ui, sans-serif', 'center');
}

/* ------------------------------------------ Klasik fizik görünümü */

function cizKlasik(ctx, w, h, st, pHam) {
  const p = etkin(st, pHam);
  D.izgara(ctx, w, h, 26);

  if (p.mod > 3.5) { klasikBardak(ctx, w, h, st, p); return; }
  if (p.mod > 2.5) {
    D.yaziHaleli(ctx, 'Paralel yüzlü levha', 12, 22, K.beyaz,
                 '700 12px system-ui, sans-serif', 'left');
    const t2 = levhaKirilma(p);
    const satir = [
      ['d = t · sin(θ₁ − θ₂) / cos θ₂', K.beyaz, '700 13px system-ui, sans-serif'],
      ['', K.metin2, '11px'],
      ['t = ' + D.biçim(p.kalinlik) + ' cm', R.normal, '12px system-ui, sans-serif'],
      ['θ₁ = ' + D.biçim(p.aci) + '°', R.ivme, '12px system-ui, sans-serif'],
      ['θ₂ = ' + D.biçim(der(t2), 4) + '°', R.kuvvet, '12px system-ui, sans-serif'],
      ['θ₁ − θ₂ = ' + D.biçim(p.aci - der(t2), 4) + '°', K.metin2, '11px system-ui, sans-serif'],
      ['d = ' + D.biçim(yanalKayma(p), 4) + ' cm', R.surtunme, '700 14px system-ui, sans-serif'],
      ['', K.metin2, '11px'],
      ['Çıkan ışın gelene PARALEL', R.hiz, '700 12px system-ui, sans-serif'],
      ['çünkü iki yüzey de paralel:', K.metin2, '11px system-ui, sans-serif'],
      ['1·sinθ₁ = n·sinθ₂ = 1·sinθ₃', K.metin2, '11px system-ui, sans-serif'],
      ['⟹ θ₃ = θ₁', K.beyaz, '700 12px system-ui, sans-serif'],
      ['', K.metin2, '11px'],
      ['θ₁ = 0 ⟹ d = 0 (kayma yok)', R.surtunme, '11px system-ui, sans-serif']
    ];
    let sy = 46;
    satir.forEach(([t, c, f]) => { if (t) D.yaziHaleli(ctx, t, w * 0.34, sy, c, f, 'left'); sy += 17; });
    return;
  }

  const { nC, nG } = indisler(p);
  const ph = paraksiyel(p);
  const tg = tamGorunur(p);

  D.yaziHaleli(ctx, p.mod < 1.5 ? 'Havadan suya bakış' : 'Sudan havaya bakış',
               12, 22, K.beyaz, '700 12px system-ui, sans-serif', 'left');

  const sol = [
    ['h′/h = n_göz / n_cisim', K.beyaz, '700 13px system-ui, sans-serif'],
    ['', K.metin2, '11px'],
    ['n_cisim = ' + D.biçim(nC, 3), R.hiz, '12px system-ui, sans-serif'],
    ['n_göz   = ' + D.biçim(nG, 3), R.ivme, '12px system-ui, sans-serif'],
    ['h = ' + D.biçim(p.h) + ' cm', R.hiz, '700 13px system-ui, sans-serif'],
    ['', K.metin2, '11px'],
    ['Dik bakışta (paraksiyel)', K.beyaz, '700 12px system-ui, sans-serif'],
    ['h′ = ' + D.biçim(ph, 4) + ' cm', R.kuvvet, '700 14px system-ui, sans-serif'],
    ['Kalkma = ' + D.biçim(Math.abs(p.h - ph), 4) + ' cm', R.surtunme, '12px system-ui, sans-serif']
  ];
  if (Math.abs(p.n - 1.33) < 0.006) {
    /* kitap s.357: görünür derinlik ışığın rengine de bağlıdır */
    const hr = p.mod < 1.5 ? p.h / nSu(680) : p.h * nSu(680);
    const hm = p.mod < 1.5 ? p.h / nSu(410) : p.h * nSu(410);
    sol.push(['', K.metin2, '11px'],
             ['Renge bağlı (su, dik bakış):', K.beyaz, '700 11px system-ui, sans-serif'],
             ['kırmızı ' + D.biçim(hr, 3) + ' · mor ' + D.biçim(hm, 3) + ' cm', R.normal, '700 11px system-ui, sans-serif']);
  }
  let sy = 46;
  sol.forEach(([t, c, f]) => { if (t) D.yaziHaleli(ctx, t, 12, sy, c, f, 'left'); sy += 17; });

  const sx = w * 0.52;
  const tc = cisimAcisi(p, rad(Math.max(0.6, p.aci)));
  const sag = [
    ['Eğik bakışta (tam bağıntı)', K.beyaz, '700 12px system-ui, sans-serif'],
    ['h′ = h · tanθ_cisim / tanθ_göz', K.metin, '12px system-ui, sans-serif'],
    ['', K.metin2, '11px'],
    ['θ_göz = ' + D.biçim(p.aci, 0) + '°  (bakış)', R.ivme, '12px system-ui, sans-serif'],
    ['θ_cisim = ' + (tc === null ? 'yok — Snell penceresi dışı' : D.biçim(der(tc), 4) + '°'),
      R.kuvvet, '12px system-ui, sans-serif'],
    ['h′ = ' + (tg === null ? '—' : D.biçim(tg, 4) + ' cm'),
      R.kuvvet, '700 14px system-ui, sans-serif'],
    ['', K.metin2, '11px'],
    [p.mod < 1.5 ? 'Eğik bakışta daha SIĞ' : 'Eğik bakışta daha YÜKSEK',
      R.surtunme, '700 12px system-ui, sans-serif'],
    ['Ders düzeyinde h′ = h/n yeter;', K.metin2, '11px system-ui, sans-serif'],
    ['o, dik bakışın sonucudur.', K.metin2, '11px system-ui, sans-serif'],
    ['', K.metin2, '11px'],
    ['Gözün yüzeye UZAKLIĞINA bağlı değil,', R.hiz, '700 11px system-ui, sans-serif'],
    ['yalnız bakış doğrultusuna bağlı.', R.hiz, '700 11px system-ui, sans-serif']
  ];
  sy = 46;
  sag.forEach(([t, c, f]) => { if (t) D.yaziHaleli(ctx, t, sx, sy, c, f, 'left'); sy += 17; });
}

/* ---------------------------------------------------- Grafik paneli */

function cizGrafik(ctx, w, h, st, pHam) {
  const p = etkin(st, pHam);
  const pay = 8, gw = (w - pay * 3) / 2, gh = h - 6;

  if (p.mod > 3.5) { grafikBardak(ctx, pay, gw, gh, st, p); return; }
  if (p.mod > 2.5) {
    const v1 = [];
    for (let a = 0; a <= 85; a += 1) {
      const t1 = rad(a), t2 = Math.asin(Math.sin(t1) / p.n);
      v1.push({ t: a, v: (p.kalinlik * Math.sin(t1 - t2)) / Math.cos(t2) });
    }
    D.miniGrafik(ctx, {
      x: pay, y: 3, w: gw, h: gh,
      baslik: 'Yanal kayma − θ₁   (0°’de sıfır)', birim: 'cm', tEtiket: 'θ₁ (°)',
      imlec: { t: p.aci, v: yanalKayma(p) },
      veri: v1, tMax: 85, vMin: 0, vMax: p.kalinlik * 1.05, renk: R.surtunme
    });

    const v2 = [];
    for (let t = 1; t <= 20; t += 0.5) {
      const t1 = rad(p.aci), t2 = levhaKirilma(p);
      v2.push({ t, v: (t * Math.sin(t1 - t2)) / Math.cos(t2) });
    }
    D.miniGrafik(ctx, {
      x: pay * 2 + gw, y: 3, w: gw, h: gh,
      baslik: 'Yanal kayma − kalınlık   (DOĞRU orantı)', birim: 'cm', tEtiket: 't (cm)',
      imlec: { t: p.kalinlik, v: yanalKayma(p) },
      veri: v2, tMax: 20, vMin: 0, vMax: Math.max(0.5, yanalKayma(p) * 20 / p.kalinlik * 1.05),
      renk: R.normal
    });
    return;
  }

  /* Oynatınca h taranır: iki grafikte de imleçler h ekseninde kayar. */
  const hMax = Math.max(pHam.h, hHedef(pHam));
  const oran = q => (q.mod < 1.5 ? 1 / q.n : q.n);
  const v1 = [], v1e = [];
  for (let hh = 5; hh <= hMax; hh += hMax / 80) {
    v1.push({ t: hh, v: hh * oran(p) });
    const g = tamGorunur(Object.assign({}, p, { h: hh }));
    if (g !== null) v1e.push({ t: hh, v: g });
  }
  const yUst = Math.max(hMax, hMax * oran(p), ...v1e.map(q => q.v)) * 1.05;
  const tg = tamGorunur(p);
  D.miniGrafik(ctx, { x: pay, y: 3, w: gw, h: gh,
    baslik: 'h′ − h   (kırmızı: dik bakış · turuncu: ' + D.biçim(p.aci, 0) + '° bakış)', birim: 'cm', tEtiket: 'h (cm)',
    veri: v1, tMax: hMax, vMin: 0, vMax: yUst, renk: R.kuvvet, imlec: { t: p.h, v: paraksiyel(p) } });
  if (v1e.length > 1)
    D.miniGrafik(ctx, { x: pay, y: 3, w: gw, h: gh, baslik: '', birim: '', tEtiket: '',
      veri: v1e, tMax: hMax, vMin: 0, vMax: yUst, renk: R.ivme, imlec: tg === null ? null : { t: p.h, v: tg } });

  /* kitap 6. Etkinlik: su · sıvı yağ · cam — aynı derinlikte, dik bakışta */
  const yUst2 = hMax * (p.mod < 1.5 ? 1 / 1.33 : 1.52) * 1.05;
  SIVILAR.forEach((sv, i) => {
    const q = Object.assign({}, p, { n: sv.n });
    const v = [];
    for (let hh = 5; hh <= hMax; hh += hMax / 40) v.push({ t: hh, v: hh * oran(q) });
    D.miniGrafik(ctx, { x: pay * 2 + gw, y: 3, w: gw, h: gh,
      baslik: i ? '' : 'Dik bakışta h′ − h   (mavi su · sarı sıvı yağ · yeşil cam)', birim: i ? '' : 'cm',
      tEtiket: i ? '' : 'h (cm)', veri: v, tMax: hMax, vMin: 0, vMax: yUst2, renk: sv.c,
      imlec: { t: p.h, v: p.h * oran(q) } });
  });
}

/* ---- Mod 4 · klasik panel ve grafikler ---- */

function klasikBardak(ctx, w, h, st, p) {
  const d = st.su ?? 0, ik = bardakIsin(p.n, d), e = esikYukseklik(p.n);
  D.yaziHaleli(ctx, '6. Etkinlik · bardaktaki para', 12, 44, K.beyaz, '700 12px system-ui, sans-serif', 'left');
  const sol = [
    [sivi(p.n) + ' · n = ' + D.biçim(p.n, 3), R.hiz, '700 12px system-ui, sans-serif'],
    ['sıvı yüksekliği d = ' + D.biçim(d, 2) + ' cm', R.hiz, '12px system-ui, sans-serif'],
    ['', K.metin2, '11px']
  ];
  if (!ik.bos && ik.iceride) {
    sol.push(['θ_sıvı = ' + D.biçim(ik.aSivi, 3) + '°  ·  θ_hava = ' + D.biçim(ik.aHava, 3) + '°', R.ivme, '12px system-ui, sans-serif'],
             ['n·sin θ_sıvı = sin θ_hava  (Snell)', K.metin2, '11px system-ui, sans-serif']);
  } else sol.push(['Işın sıvıdan çıkamadan duvara çarpar', K.metin2, '11px system-ui, sans-serif'], ['', K.metin2, '11px']);
  sol.push(['kenarı aşma payı = ' + D.biçim(ik.pay, 2) + ' cm', ik.gorunur ? R.ivme : '#C0392B', '700 12px system-ui, sans-serif'],
           [ik.gorunur ? '≥ 0 ⟹ para GÖRÜNÜYOR' : '< 0 ⟹ para görünmüyor', ik.gorunur ? R.ivme : '#C0392B', '700 12px system-ui, sans-serif'],
           ['', K.metin2, '11px'],
           ['görünür derinlik = ' + (ik.gorunur ? D.biçim(ik.gDerinlik, 3) + ' cm' : '—'), R.kuvvet, '700 13px system-ui, sans-serif'],
           ['dik bakışta d/n = ' + D.biçim(d / p.n, 3) + ' cm', K.metin2, '11px system-ui, sans-serif']);
  let sy = 68;
  sol.forEach(([t, c, f]) => { if (t) D.yaziHaleli(ctx, t, 12, sy, c, f, 'left'); sy += 18; });

  /* sağ: aynı bardakta farklı sıvılar — kitap 11. basamak (su yerine sıvı yağ) */
  const sx = w * 0.60;
  D.yaziHaleli(ctx, 'Görünme eşiği', sx, 68, K.beyaz, '700 12px system-ui, sans-serif', 'left');
  SIVILAR.forEach((sv, i) => {
    const es = esikYukseklik(sv.n);
    D.yaziHaleli(ctx, sv.ad + ' (' + D.biçim(sv.n, 2) + '): ' + (es === null ? '—' : D.biçim(es, 2) + ' cm'),
                 sx, 90 + i * 19, sv.c, '700 12px system-ui, sans-serif', 'left');
  });
  ['n büyüdükçe eşik AZALIR:', 'para daha az sıvıyla görünür.', '', 'Sıvı arttıkça görünür', 'derinlik de artar.']
    .forEach((t, i) => t && D.yaziHaleli(ctx, t, sx, 160 + i * 17, K.metin2, '11px system-ui, sans-serif', 'left'));
}

function grafikBardak(ctx, pay, gw, gh, st, p) {
  const d = st.su ?? 0, ust = KAP_Y * 0.95;
  const v0 = [], v1 = [], v2 = [], v3 = [];
  for (let i = 0; i <= 120; i++) {
    const dd = ust * i / 120, ik = bardakIsin(p.n, dd);
    v0.push({ t: dd, v: dd });
    v1.push({ t: dd, v: dd / p.n });
    if (ik.gorunur && !ik.bos) v2.push({ t: dd, v: ik.gDerinlik });
    v3.push({ t: dd, v: ik.pay });
  }
  const ik = bardakIsin(p.n, d);
  const ortak = { x: pay, y: 3, w: gw, h: gh, tMax: ust, vMin: 0, vMax: ust };
  D.miniGrafik(ctx, Object.assign({}, ortak, { baslik: 'Derinlik − sıvı yüksekliği   (gri gerçek · kırmızı d/n · turuncu göze gelen)',
    birim: 'cm', tEtiket: 'd (cm)', veri: v0, renk: '#8A95A8', imlec: { t: d, v: d } }));
  D.miniGrafik(ctx, Object.assign({}, ortak, { baslik: '', birim: '', tEtiket: '', veri: v1, renk: R.kuvvet,
    imlec: { t: d, v: d / p.n } }));
  if (v2.length > 1)
    D.miniGrafik(ctx, Object.assign({}, ortak, { baslik: '', birim: '', tEtiket: '', veri: v2, renk: R.ivme,
      imlec: ik.gorunur && !ik.bos ? { t: d, v: ik.gDerinlik } : null }));
  const pMin = Math.min(...v3.map(q => q.v)), pMax = Math.max(...v3.map(q => q.v));
  D.miniGrafik(ctx, { x: pay * 2 + gw, y: 3, w: gw, h: gh,
    baslik: 'Kenarı aşma payı − sıvı yüksekliği   (0’ın üstü: para görünür)', birim: 'cm', tEtiket: 'd (cm)',
    veri: v3, tMax: ust, vMin: Math.min(-0.5, pMin), vMax: Math.max(0.5, pMax), renk: ik.gorunur ? R.ivme : '#C0392B',
    imlec: { t: d, v: ik.pay } });
}

/* ------------------------------------------------------------ Okumalar */

function okumalar(st, pHam) {
  const p = etkin(st, pHam);
  if (p.mod > 3.5) {
    const d = st.su ?? 0, ik = bardakIsin(p.n, d), e = esikYukseklik(p.n);
    return [
      { et: 'Sıvı',             dg: sivi(p.n) + ' · n = ' + D.biçim(p.n, 3), birim: '' },
      { et: 'Sıvı yüksekliği',  dg: D.biçim(d, 2), birim: 'cm' },
      { et: 'Görünme eşiği',    dg: e === null ? 'bardak dolsa da görünmez' : D.biçim(e, 2), birim: e === null ? '' : 'cm' },
      { et: 'Para',             dg: ik.gorunur ? 'GÖRÜNÜYOR' : 'görünmüyor', birim: '' },
      { et: 'Görünür derinlik', dg: ik.gorunur ? D.biçim(ik.gDerinlik, 3) : '—', birim: ik.gorunur ? 'cm' : '' }
    ];
  }
  if (p.mod > 2.5) {
    const t2 = levhaKirilma(p);
    return [
      { et: 'Levha indisi n',  dg: D.biçim(p.n, 3),            birim: '' },
      { et: 'Kalınlık t',      dg: D.biçim(p.kalinlik),        birim: 'cm' },
      { et: 'Gelme açısı θ₁',  dg: D.biçim(p.aci),             birim: '°' },
      { et: 'Kırılma açısı θ₂',dg: D.biçim(der(t2), 4),        birim: '°' },
      { et: 'Yanal kayma d',   dg: D.biçim(yanalKayma(p), 4),  birim: 'cm' },
      { et: 'Çıkış açısı θ₃',  dg: D.biçim(p.aci),             birim: '° · gelenle aynı' }
    ];
  }

  const { nC, nG } = indisler(p);
  const ph = paraksiyel(p);
  const tg = tamGorunur(p);

  return [
    { et: 'Cismin ortamı',   dg: 'n = ' + D.biçim(nC, 3), birim: '' },
    { et: 'Gözün ortamı',    dg: 'n = ' + D.biçim(nG, 3), birim: '' },
    { et: p.mod < 1.5 ? 'Gerçek derinlik h' : 'Gerçek yükseklik H', dg: D.biçim(p.h), birim: 'cm' },
    { et: 'Dik bakışta h′',  dg: D.biçim(ph, 4), birim: 'cm' },
    { et: 'Kalkma h − h′',   dg: D.biçim(Math.abs(p.h - ph), 4), birim: 'cm' },
    { et: D.biçim(p.aci, 0) + '° bakışta h′',
      dg: tg === null ? 'Işık gelmez (Snell penceresi dışı)' : D.biçim(tg, 4), birim: tg === null ? '' : 'cm' },
    { et: 'Sonuç',
      dg: p.mod < 1.5 ? 'Cisim SIĞ görünür' : 'Cisim YÜKSEK görünür', birim: '' }
  ];
}

/* ------------------------------------------------------------- Kayıt */

D.simler = D.simler || {};
D.simler['gorunur-derinlik'] = {
  id: 'gorunur-derinlik',
  baslik: '3.5 · Görünür derinlik · h′ = h·n_göz/n_cisim · bardaktaki para',
  yukseklik: 340,
  grafikPanel: true,
  grafikYukseklik: 150,
  parametreler: [
    { anahtar: 'mod', etiket: 'Düzenek', tur: 'secim', deger: 1, secenekler: [
      { d: 1, e: 'Cisim suda · havadan bakış' },
      { d: 2, e: 'Cisim havada · sudan bakış' },
      { d: 4, e: 'Bardaktaki para (6. Etkinlik)' },
      { d: 3, e: 'Cam levhada yanal kayma' }
    ]},
    { anahtar: 'n',        etiket: 'Ortamın indisi n', min: 1.05, max: 2.50, adim: 0.01, deger: 1.33, birim: '' },
    { anahtar: 'h',        etiket: 'Gerçek derinlik / yükseklik', min: 10, max: 200, adim: 5, deger: 100, birim: 'cm' },
    { anahtar: 'aci',      etiket: 'Bakış açısı (1-2) / gelme açısı (3)', min: 0, max: 70, adim: 1, deger: 20, birim: '°' },
    { anahtar: 'kalinlik', etiket: 'Levha kalınlığı t', min: 2, max: 20, adim: 1, deger: 10, birim: 'cm' }
  ],
  durum, adim, bitti, cizGercek, cizKlasik, cizGrafik, okumalar
};

})();
