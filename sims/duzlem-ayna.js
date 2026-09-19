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

/** İki düzlem ayna arasındaki açı için görüntü sayısı. */
function goruntuSayisi(p) {
  const n = 360 / Math.max(1, p.ikiAci);
  return Number.isInteger(n) ? n - 1 : Math.floor(n);
}

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

  /* gelen ışın */
  const i = gelmeAcisi(p);
  const L = Math.min(w * 0.36, 190);
  const gx = ax - Math.cos(th + i) * L, gy = ay - Math.sin(th + i) * L;
  D.isin(ctx, gx, gy, ax, ay, '#FFB020', 2.4);
  D.yaziAydinlik(ctx, 'gelen', gx + 8, gy - 10, '#B07800',
                 '700 11px system-ui, sans-serif', 'left');

  /* yansıyan ışın — normalin diğer tarafında, eşit açıyla */
  const rx = ax - Math.cos(th - i) * L, ry = ay - Math.sin(th - i) * L;
  D.isin(ctx, ax, ay, rx, ry, '#E24B4A', 2.4);
  D.yaziAydinlik(ctx, 'yansıyan', rx + 8, ry - 10, '#B03030',
                 '700 11px system-ui, sans-serif', 'left');

  /* açı yayları */
  D.aciYayi(ctx, ax, ay, 52, Math.PI + th, Math.PI + th + i,
            R.ivme, D.biçim(p.gelme) + '°');
  D.aciYayi(ctx, ax, ay, 68, Math.PI + th - i, Math.PI + th,
            R.kuvvet, D.biçim(p.gelme) + '°');

  D.yaziAydinlik(ctx, 'gelme açısı = yansıma açısı', w / 2, h - 12, R.mur,
                 '700 12px system-ui, sans-serif', 'center');
  if (p.aynaAci !== 0)
    D.yaziAydinlik(ctx, 'ayna ' + D.biçim(p.aynaAci) + '° döndü ⟹ yansıyan ışın ' +
                   D.biçim(isinDonmesi(p)) + '° döner', w - 10, 26, R.ivme,
                   '700 12px system-ui, sans-serif', 'right');
}

function cizGoruntu(ctx, w, h, st, p) {
  const ax = w * 0.52;
  const zemin = h - 40;
  const olcek = Math.min((h - 90) / 190, (w * 0.34) / 200);

  /* zemin */
  ctx.fillStyle = '#C9A06A'; ctx.fillRect(0, zemin, w, h - zemin);

  /* ayna — gereken boy ve seçilen boy */
  const gerekli = gerekenAynaBoyu(p) * olcek;
  const secilen = p.aynaBoy * olcek;
  const aynaAlt = zemin - (p.boy / 4) * olcek;         // göz hizası merkezli
  ctx.save();
  ctx.fillStyle = 'rgba(143,182,236,.30)';
  ctx.fillRect(ax - 4, aynaAlt - secilen, 8, secilen);
  ctx.strokeStyle = '#8FB6EC'; ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(ax, aynaAlt - secilen); ctx.lineTo(ax, aynaAlt);
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
  const goz = zemin - boyPx * 0.92;
  D.isin(ctx, ix, bas, ax, (bas + goz) / 2, 'rgba(255,176,32,.85)', 1.8, false);
  D.isin(ctx, ax, (bas + goz) / 2, ix, goz, 'rgba(226,75,74,.85)', 1.8, false);
  D.isin(ctx, ix, ayak, ax, (ayak + goz) / 2, 'rgba(255,176,32,.85)', 1.8, false);
  D.isin(ctx, ax, (ayak + goz) / 2, ix, goz, 'rgba(226,75,74,.85)', 1.8, false);

  /* gereken ayna aralığı işaretle */
  const ust = (bas + goz) / 2, alt = (ayak + goz) / 2;
  D.olcu(ctx, ax + 30, ust, ax + 30, alt, D.biçim(gerekenAynaBoyu(p)) + ' cm', R.hiz);

  const yeterli = p.aynaBoy >= gerekenAynaBoyu(p) - 0.5;
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

  /* iki ayna */
  D.duzlemAyna(ctx, cx + Math.cos(0) * L / 2, cy, L, Math.PI / 2);
  ctx.save();
  ctx.translate(cx, cy); ctx.rotate(-a); ctx.translate(-cx, -cy);
  D.duzlemAyna(ctx, cx + L / 2, cy, L, Math.PI / 2);
  ctx.restore();

  D.aciYayi(ctx, cx, cy, 46, -a, 0, R.ivme, D.biçim(p.ikiAci) + '°');

  /* cisim */
  const nx = cx + Math.cos(-a / 2) * L * 0.55;
  const ny = cy + Math.sin(-a / 2) * L * 0.55;
  D.noktaCisim(ctx, nx, ny, 8, R.hiz);
  D.yaziAydinlik(ctx, 'cisim', nx, ny - 20, R.mur,
                 '700 11px system-ui, sans-serif', 'center');

  /* görüntüler — cismin etrafında dairesel dizilim */
  const n = goruntuSayisi(p);
  const rr = Math.hypot(nx - cx, ny - cy);
  for (let k = 1; k <= n; k++) {
    const ac = -a / 2 + k * a * (k % 2 ? 1 : -1) * 0.0 + (k * 2 * Math.PI) / (n + 1);
    const gx = cx + Math.cos(-a / 2 + (k * 2 * Math.PI) / (n + 1)) * rr;
    const gy = cy + Math.sin(-a / 2 + (k * 2 * Math.PI) / (n + 1)) * rr;
    ctx.save(); ctx.globalAlpha = 0.5;
    D.noktaCisim(ctx, gx, gy, 6, R.konum);
    ctx.restore();
  }

  D.rozet(ctx, n + ' GÖRÜNTÜ', w / 2, 52, 'rgba(47,111,208,.92)', '#FFFFFF',
          '700 12px system-ui, sans-serif', true);
  D.yaziAydinlik(ctx, 'n = 360/α − 1  (bölme tam ise)', w / 2, h - 12, R.mur,
                 '600 11px system-ui, sans-serif', 'center');
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
      ['i = ' + D.biçim(p.gelme) + '°  ·  r = ' + D.biçim(p.gelme) + '°', R.ivme, '12px system-ui, sans-serif'],
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

    /* geometri şeması */
    const ix = w * 0.16, ax = w * 0.40, ust = h * 0.22, alt = h * 0.76;
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
      ['UZAKLIK formüle GİRMEZ', R.kuvvet, '700 12px system-ui, sans-serif']
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
         : 'bölme tam değil ⟹ n = ' + goruntuSayisi(p) + ' (tam kısmı)',
     R.normal, '700 13px system-ui, sans-serif'],
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
      { et: 'Gelme açısı',   dg: D.biçim(p.gelme),        birim: '°' },
      { et: 'Yansıma açısı', dg: D.biçim(p.gelme),        birim: '°' },
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
      { et: 'Sonuç',          dg: p.aynaBoy >= gerekenAynaBoyu(p) - 0.5 ? 'Tamamını görür' : 'Yetersiz', birim: '' },
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
    { anahtar: 'gelme',   etiket: 'Gelme açısı', min: 0, max: 80, adim: 5, deger: 40, birim: '°' },
    { anahtar: 'aynaAci', etiket: 'Aynayı döndür', min: -30, max: 30, adim: 5, deger: 0, birim: '°' },
    { anahtar: 'boy',     etiket: 'İnsan boyu', min: 120, max: 200, adim: 5, deger: 170, birim: 'cm' },
    { anahtar: 'uzaklik', etiket: 'Aynaya uzaklık', min: 30, max: 300, adim: 10, deger: 100, birim: 'cm' },
    { anahtar: 'aynaBoy', etiket: 'Ayna boyu', min: 20, max: 200, adim: 5, deger: 85, birim: 'cm' },
    { anahtar: 'ikiAci',  etiket: 'İki ayna arası açı', min: 30, max: 180, adim: 10, deger: 90, birim: '°' }
  ],
  durum, adim, bitti, cizGercek, cizKlasik, okumalar
};

})();
