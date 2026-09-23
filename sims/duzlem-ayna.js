(function () {
"use strict";
window.F11 = window.F11 || {};

/* ==========================================================================
   sims/duzlem-ayna.js
   --------------------------------------------------------------------------
   Konu 3.2 · Düzlem aynalar  (MEB 11, s.315-326)

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

function durum(p) { return { t: 0, gelme: p.gelme, uzaklik: p.uzaklik, ikiAci: p.ikiAci }; }

function adim(st, dt, p) {
  st.t += dt;
  if (p.mod < 1.5)      st.gelme   = D.tarama(st.t, p.gelme, p.gelme < 40 ? 80 : 5, TARAMA_PERIYOT);
  else if (p.mod < 2.5) st.uzaklik = D.tarama(st.t, p.uzaklik, p.uzaklik < 160 ? 300 : 30, TARAMA_PERIYOT);
  else                  st.ikiAci  = Math.round(D.tarama(st.t, p.ikiAci, p.ikiAci < 100 ? 180 : 40, TARAMA_PERIYOT) / 10) * 10;
}

function bitti() { return false; }

function etkin(st, p) {
  return Object.assign({}, p, { gelme: st.gelme ?? p.gelme, uzaklik: st.uzaklik ?? p.uzaklik, ikiAci: st.ikiAci ?? p.ikiAci });
}

/* --------------------------------------------- Gerçekçi görünüm */

function cizGercek(ctx, w, h, st, pHam) {
  const p = etkin(st, pHam);
  if (p.mod < 1.5)      cizYansima(ctx, w, h, st, p);
  else if (p.mod < 2.5) cizGoruntu(ctx, w, h, st, p);
  else                  cizIkiAyna(ctx, w, h, st, p);
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
  parametreler: [
    { anahtar: 'mod', etiket: 'Düzenek', tur: 'secim', deger: 1, secenekler: [
      { d: 1, e: 'Yansıma yasası' },
      { d: 2, e: 'Boydan boya görmek' },
      { d: 3, e: 'İki ayna · görüntü sayısı' }
    ]},
    { anahtar: 'gelme',   etiket: 'Gelme açısı (ayna dönmeden)', min: 0, max: 80, adim: 5, deger: 40, birim: '°' },
    { anahtar: 'aynaAci', etiket: 'Aynayı döndür', min: -30, max: 30, adim: 5, deger: 0, birim: '°' },
    { anahtar: 'boy',     etiket: 'İnsan boyu', min: 120, max: 200, adim: 5, deger: 170, birim: 'cm' },
    { anahtar: 'uzaklik', etiket: 'Aynaya uzaklık', min: 30, max: 300, adim: 10, deger: 100, birim: 'cm' },
    { anahtar: 'aynaBoy', etiket: 'Ayna boyu', min: 20, max: 200, adim: 5, deger: 85, birim: 'cm' },
    { anahtar: 'ikiAci',  etiket: 'İki ayna arası açı', min: 30, max: 180, adim: 10, deger: 90, birim: '°' }
  ],
  durum, adim, bitti, cizGercek, cizKlasik, okumalar
};

})();
