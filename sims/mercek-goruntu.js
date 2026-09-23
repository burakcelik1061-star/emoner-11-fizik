(function () {
"use strict";
window.F11 = window.F11 || {};

/* ==========================================================================
   sims/mercek-goruntu.js
   --------------------------------------------------------------------------
   Konu 3.10 · Merceklerde görüntü

   MERCEK DENKLEMİ  (aynadakiyle AYNI)
   -----------------------------------
       1/f = 1/a + 1/b        ⟹      b = a·f / (a − f)

       a : cismin merceğe uzaklığı   (daima +)
       b : görüntünün uzaklığı
           b > 0 ⟹ merceğin ARKASINDA (çıkış tarafı) · GERÇEK
           b < 0 ⟹ merceğin ÖNÜNDE   (cisim tarafı)  · SANAL
       f : odak uzaklığı
           f > 0 ⟹ ince kenarlı      f < 0 ⟹ kalın kenarlı

   AYNADAN TEK FARKI: ışık mercekten GEÇER, bu yüzden gerçek görüntü cismin
   ÖTE tarafında oluşur. Aynada ise gerçek görüntü cismin tarafındaydı.
   Formüller ve beş durum birebir aynıdır.

   BÜYÜTME
   -------
       |büyütme| = |b / a|

   İNCE KENARLI MERCEKTE BEŞ DURUM
   -------------------------------
       a > 2f      gerçek · ters · küçük
       a = 2f      gerçek · ters · eşit          (b = 2f)
       f < a < 2f  gerçek · ters · büyük
       a = f       görüntü oluşmaz (sonsuzda)
       a < f       sanal  · düz  · büyük         → BÜYÜTEÇ

   KALIN KENARLI MERCEKTE
   ----------------------
       Her zaman: sanal · düz · küçük.
   ========================================================================== */

const D = window.F11;
const { R, K } = D;

const TUR_SURESI = 20;

/* Optik alet ön ayarları: f (cm), a (cm) ve kullanımda a’nın gezdiği pay.
   Fotoğraf makinesinde konu yaklaşıp uzaklaşır; projeksiyonda slayt
   netleme için merceğe yaklaşıp uzaklaşır; büyüteçte mercek cisme
   yaklaştırılıp uzaklaştırılır (a < f kalır, görüntü hep sanal). */
const ALETLER = [
  { ad: 'Fotoğraf makinesi', f: 5,  a: 200, pay: 80 },
  { ad: 'Projeksiyon',       f: 10, a: 12.5, pay: 1.5 },
  { ad: 'Büyüteç',           f: 10, a: 6,  pay: 2 }
];

/* ------------------------------------------------------------- Fizik */

function odak(p, st) {
  if (p.mod > 2.5) return ALETLER[Math.round((st && st.alet) || p.alet) - 1].f;
  return (p.tur < 1.5 ? 1 : -1) * p.f;
}

function turUzakligi(st, p) {
  const f = Math.abs(p.f);
  const bas = 4 * f, son = 0.35 * f;
  return bas * Math.pow(son / bas, Math.min(1, st.t / TUR_SURESI));
}

function aletAl(st, p) { return ALETLER[Math.round((st && st.alet) || p.alet) - 1]; }

function cisimA(st, p) {
  if (p.mod > 2.5) {
    const al = aletAl(st, p);
    const u = st && st.t ? (st.t % ALET_SURESI) / ALET_SURESI : 0;
    return al.a + al.pay * Math.sin(2 * Math.PI * u);
  }
  return p.mod < 1.5 ? (st.a ?? p.a) : turUzakligi(st, p);
}

function goruntuB(a, f) {
  const payda = a - f;
  if (Math.abs(payda) < 1e-6) return null;
  return (a * f) / payda;
}

function durumAdi(a, f) {
  if (f < 0) return 'Kalın kenarlı · her zaman aynı';
  const e = f * 0.03;
  if (Math.abs(a - 2 * f) < e) return 'Cisim 2F’de';
  if (Math.abs(a - f) < e)     return 'Cisim F’de';
  if (a > 2 * f)               return 'Cisim 2F’nin dışında';
  if (a > f)                   return 'Cisim F ile 2F arasında';
  return 'Cisim F ile mercek arasında';
}

function ozellik(a, f) {
  const b = goruntuB(a, f);
  if (b === null) return { cins: 'Oluşmaz', yon: '—', boy: '—' };
  const m = Math.abs(b / a);
  return {
    cins: b > 0 ? 'Gerçek' : 'Sanal',
    yon:  b > 0 ? 'Ters'   : 'Düz',
    boy:  m > 1.02 ? 'Büyük' : (m < 0.98 ? 'Küçük' : 'Eşit'),
    b, m
  };
}

/* -------------------------------------------------------------- Durum */

/* 1. düzenekte cisim uzaklığı taranır: beş durumun nasıl birbirine
   dönüştüğü Oynat'a basıldığı anda görünür. Kaydırıcı başlangıcı verir. */
function durum(p) { return { t: 0, a: p.a, alet: p.alet }; }

const ALET_SURESI = 5;          // s — her aletin ekranda kalma süresi

function adim(st, dt, p) {
  st.t += dt;
  if (p.mod < 1.5) st.a = D.tarama(st.t, p.a, taramaHedefi(p), 14);
  else if (p.mod > 2.5) {
    /* Optik aletler sırayla gezilir: fotoğraf makinesi → projeksiyon → büyüteç */
    const bas = Math.round(p.alet) - 1;
    st.alet = ((bas + Math.floor(st.t / ALET_SURESI)) % ALETLER.length) + 1;
  }
}
function bitti(st, p) { return p.mod > 1.5 && p.mod < 2.5 && st.t >= TUR_SURESI; }

/* ------------------------------------------------- Ortak yerleşim */

/** Cismin bu düzenekte alabileceği en büyük uzaklık (1: tarama, 2: tur). */
/* Tarama beş durumu da geçecek yöne gider (2F’nin dışındaysa merceğe doğru,
   içindeyse uzağa); ölçek bu aralığa göre kurulur. */
function taramaHedefi(p) { return p.a > 2.2 * p.f ? 0.4 * p.f : 3 * p.f; }

function aEnBuyuk(p) {
  return p.mod < 1.5 ? Math.max(p.a, taramaHedefi(p)) : 4 * Math.abs(p.f);
}

function yerlesim(w, h, st, p) {
  const f = odak(p, st);
  const a = cisimA(st, p);
  const b = goruntuB(a, f);
  const cy = h * 0.52;

  /* 1. ve 2. düzenekte yerleşim TARAMA BOYUNCA SABİT: cisim gerçekten
     merceğe yaklaşır, görüntü gerçekten kayar. (Anlık a’ya göre kurulsaydı
     cisim yerinde durur, mercek ile odaklar kayıyormuş gibi görünürdü.)
     Optik aletlerde her alet kendi a’sı için ayrı yerleştirilir. */
  let solCm, sagCm;
  if (p.mod > 2.5) {
    /* alet boyunca sabit: a’nın gezdiği aralığın iki ucu da sığsın */
    const al = aletAl(st, p);
    solCm = Math.abs(f) * 2.3; sagCm = Math.abs(f) * 2.3;
    for (const aq of [al.a - al.pay, al.a, al.a + al.pay]) {
      const bq = goruntuB(aq, f);
      solCm = Math.max(solCm, aq * 1.10);
      if (bq !== null && Math.abs(bq) < 300) {
        if (bq < 0) solCm = Math.max(solCm, -bq * 1.2);      // etiketi de sığsın
        else        sagCm = Math.max(sagCm, bq * 1.06);
      }
    }
  } else {
    solCm = Math.max(aEnBuyuk(p) * 1.08, Math.abs(f) * 2.3);
    sagCm = Math.max(Math.abs(f) * 4.2, 1);
  }

  /* Merceğin yatay yeri SABİT değil, iki tarafın ihtiyacına göre dengelenir.
     Sabit ortada dururken projeksiyon gibi a≪b durumlarında sol taraf birkaç
     piksele sıkışıyor ve cisim görünmez oluyordu. Bu seçim, iki taraf için
     hesaplanan ölçeği eşitleyerek en büyük ortak ölçeği verir. */
  const solKenar = w * 0.05, sagKenar = w * 0.95;
  const mx = (solKenar * sagCm + sagKenar * solCm) / Math.max(1e-6, solCm + sagCm);

  const olcek = Math.min(
    (mx - solKenar) / Math.max(1, solCm),
    (sagKenar - mx) / Math.max(1, sagCm),
    6.0
  );
  const boyPx = Math.min(h * 0.22, 56);
  return { f, a, b, cy, mx, olcek, boyPx, ince: f > 0 };
}

/* --------------------------------------------- Gerçekçi görünüm */

function cizGercek(ctx, w, h, st, p) {
  const y = yerlesim(w, h, st, p);
  const sol = w * 0.02, sag = w * 0.98;

  D.kesikliCizgi(ctx, sol, y.cy, sag, y.cy, 'rgba(150,170,200,.55)', 1.4, [7, 5]);
  D.mercek(ctx, y.mx, y.cy, Math.min(h * 0.58, 180), y.ince ? 'ince' : 'kalin');

  const fp = y.f * y.olcek;
  nokta(ctx, y.mx, y.cy, 'O', K.beyaz);
  nokta(ctx, y.mx + fp, y.cy, 'F', R.ivme);
  nokta(ctx, y.mx - fp, y.cy, 'F′', R.ivme);
  nokta(ctx, y.mx + 2 * fp, y.cy, '2F', R.kuvvet);
  nokta(ctx, y.mx - 2 * fp, y.cy, '2F′', R.kuvvet);

  const ox = y.mx - y.a * y.olcek;
  const ty = y.cy - y.boyPx;
  D.nesneOku(ctx, ox, y.cy, y.boyPx, R.hiz, 'cisim');

  /* 1 · eksene paralel gelir, odaktan geçer */
  D.isin(ctx, ox, ty, y.mx, ty, R.ivme, 2, true);
  cikanIsin(ctx, y.mx, ty, y.mx + fp, y.cy, sag, R.ivme);

  /* 2 · merkezden geçer, sapmaz */
  const m2 = (y.cy - ty) / (y.mx - ox);
  D.isin(ctx, ox, ty, y.mx, y.cy, R.surtunme, 2, true);
  D.isin(ctx, y.mx, y.cy, sag, y.cy + m2 * (sag - y.mx), R.surtunme, 2, true);

  /* 3 · ön odaktan geçerek gelir, paralel çıkar
     Cisim odağa yaklaşınca bu ışın dikleşip panelden taşar; o durumda
     çizilmez, görüntü diğer iki ışınla zaten belirlenir. */
  const fx = y.mx - fp;
  if (Math.abs(fx - ox) > 4) {
    const y3 = ty + (y.mx - ox) * (y.cy - ty) / (fx - ox);
    if (y3 > 6 && y3 < h - 6) {
      D.isin(ctx, ox, ty, y.mx, y3, R.kuvvet, 2, true);
      /* ıraksakta ışın ARKA odağa yönelir; uzantısı merceğin ötesinde kesikli */
      if (!y.ince) D.sanalIsin(ctx, y.mx, y3, fx, y.cy, 'rgba(150,175,210,.8)');
      D.isin(ctx, y.mx, y3, sag, y3, R.kuvvet, 2, true);
    }
  }

  /* görüntü */
  const bxPanel = y.b === null ? null : y.mx + y.b * y.olcek;
  if (y.b === null || bxPanel < w * 0.01 || bxPanel > w * 0.99) {
    D.yaziAydinlik(ctx,
      y.b === null ? 'Cisim tam odakta — çıkan ışınlar PARALEL, görüntü oluşmaz'
                   : (y.b > 0 ? 'Görüntü merceğin ötesinde ' : 'Sanal görüntü cisim tarafında ') +
                     D.biçim(Math.abs(y.b)) + ' cm uzakta — panelin dışında',
      w * 0.5, h * 0.95, R.kuvvet, '700 12px system-ui, sans-serif', 'center');
  } else {
    const bx = y.mx + y.b * y.olcek;
    const gBoyTam = -y.boyPx * (y.b / y.a);
    /* Büyük büyütmelerde görüntü oku panelden taşıyordu; panele sığacak
       şekilde kısaltılır ve gerçek oranı etiketle belirtilir. */
    const enFazla = h * 0.42;
    const tasti = Math.abs(gBoyTam) > enFazla;
    const gBoy = tasti ? Math.sign(gBoyTam) * enFazla : gBoyTam;
    const sanal = y.b < 0;
    const etiket = (sanal ? 'sanal görüntü' : 'görüntü') +
                   (tasti ? '  (×' + D.biçim(Math.abs(y.b / y.a), 3) + ')' : '');
    /* Sanal görüntü: çıkan ışınlar ıraksar; GERİ UZANTILARI (kesikli) görüntünün
       tepesinde kesişir. Göz, ışığı oradan geliyormuş gibi görür. */
    if (sanal) {
      const tepeY = y.cy - gBoyTam;                 // ok ucu: taban − boy
      D.sanalIsin(ctx, y.mx, ty, bx, tepeY, 'rgba(150,175,210,.85)');
      D.sanalIsin(ctx, y.mx, y.cy, bx, tepeY, 'rgba(150,175,210,.85)');
    }
    ctx.save();
    if (sanal) ctx.globalAlpha = 0.72;
    D.nesneOku(ctx, bx, y.cy, gBoy, sanal ? '#8FA8C8' : R.kuvvet, etiket);
    if (tasti) {
      /* kesildiğini göstermek için ucunda kesik çizgi */
      D.kesikliCizgi(ctx, bx - 9, y.cy - gBoy, bx + 9, y.cy - gBoy,
                     sanal ? '#8FA8C8' : R.kuvvet, 1.4, [4, 3]);
    }
    ctx.restore();

    D.olcu(ctx, Math.min(y.mx, bx), y.cy + h * 0.38, Math.max(y.mx, bx), y.cy + h * 0.38,
           'b = ' + D.biçim(y.b, 4) + ' cm', R.kuvvet);
  }

  D.olcu(ctx, Math.min(ox, y.mx), y.cy + h * 0.30, Math.max(ox, y.mx), y.cy + h * 0.30,
         'a = ' + D.biçim(y.a, 4) + ' cm', R.hiz);

  D.yaziAydinlik(ctx, durumAdi(y.a, y.f), 10, 18, R.surtunme,
                 '700 12px system-ui, sans-serif', 'left');

  if (p.mod > 2.5) {
    D.yaziAydinlik(ctx, ALETLER[Math.round((st && st.alet) || p.alet) - 1].ad, w - 10, 18, R.normal,
                   '700 12px system-ui, sans-serif', 'right');
  } else if (p.mod > 1.5) {
    D.yaziAydinlik(ctx, 'otomatik tur · ' + D.biçim(Math.max(0, TUR_SURESI - st.t)) + ' s',
                   w - 10, 18, R.surtunme, '600 11px system-ui, sans-serif', 'right');
  }
}

function nokta(ctx, x, yy, ad, renk) {
  ctx.save();
  ctx.fillStyle = renk;
  ctx.beginPath(); ctx.arc(x, yy, 3.5, 0, 6.2832); ctx.fill();
  ctx.restore();
  D.yaziAydinlik(ctx, ad, x, yy - 9, renk, '700 11px system-ui, sans-serif', 'center');
}

/** Mercekten çıkan ışın: fiziksel yol daima SAĞA gider. */
function cikanIsin(ctx, px, py, qx, qy, sag, renk) {
  const dx = qx - px;
  if (Math.abs(dx) < 1e-6) return;
  const m = (qy - py) / dx;
  D.isin(ctx, px, py, sag, py + m * (sag - px), renk, 2, true);
  if (qx < px) D.sanalIsin(ctx, px, py, qx, qy, 'rgba(150,175,210,.8)');
}

/* ------------------------------------------ Klasik fizik görünümü */

function cizKlasik(ctx, w, h, st, p) {
  D.izgara(ctx, w, h, 26);
  const f = odak(p, st), a = cisimA(st, p);
  const o = ozellik(a, f);

  D.yaziHaleli(ctx, f > 0 ? 'İnce kenarlı mercek' : 'Kalın kenarlı mercek',
               12, 22, K.beyaz, '700 12px system-ui, sans-serif', 'left');

  const sol = [
    ['1/f = 1/a + 1/b', K.beyaz, '700 14px system-ui, sans-serif'],
    ['b = a·f / (a − f)', K.metin, '12px system-ui, sans-serif'],
    ['', K.metin2, '11px'],
    ['f = ' + D.biçim(f, 4) + ' cm', R.ivme, '700 13px system-ui, sans-serif'],
    ['a = ' + D.biçim(a, 4) + ' cm', R.hiz,  '700 13px system-ui, sans-serif'],
    ['a − f = ' + D.biçim(a - f, 4) + ' cm', K.metin2, '12px system-ui, sans-serif'],
    ['b = ' + (o.b === undefined ? '∞' : D.biçim(o.b, 4)) + ' cm',
      R.kuvvet, '700 14px system-ui, sans-serif'],
    ['', K.metin2, '11px'],
    ['Büyütme |b/a| = ' + (o.m === undefined ? '—' : D.biçim(o.m, 4)),
      R.normal, '700 13px system-ui, sans-serif'],
    ['Dioptri = ' + D.biçim(100 / f, 4) + ' D', K.metin2, '12px system-ui, sans-serif']
  ];
  let sy = 46;
  sol.forEach(([t, c, fo]) => { if (t) D.yaziHaleli(ctx, t, 12, sy, c, fo, 'left'); sy += 17; });

  const sx = w * 0.54;
  const sag = [
    [durumAdi(a, f), R.surtunme, '700 12px system-ui, sans-serif'],
    ['', K.metin2, '11px'],
    ['Cins : ' + o.cins, o.cins === 'Gerçek' ? R.kuvvet : '#8FA8C8', '700 13px system-ui, sans-serif'],
    ['Yön  : ' + o.yon,  K.beyaz, '700 13px system-ui, sans-serif'],
    ['Boy  : ' + o.boy,  R.normal, '700 13px system-ui, sans-serif'],
    ['', K.metin2, '11px'],
    ['MERCEK: b>0 ⟹ öte taraf', K.metin2, '11px system-ui, sans-serif'],
    ['AYNA:   b>0 ⟹ aynı taraf', K.metin2, '11px system-ui, sans-serif'],
    ['Formüller aynı, YER farklı', R.ivme, '700 12px system-ui, sans-serif'],
    ['', K.metin2, '11px'],
    ['Gerçek görüntü perdeye düşer,', K.metin2, '11px system-ui, sans-serif'],
    ['daima terstir', K.metin2, '11px system-ui, sans-serif'],
    ['Sanal görüntü düşmez, düzdür', K.metin2, '11px system-ui, sans-serif']
  ];
  sy = 46;
  sag.forEach(([t, c, fo]) => { if (t) D.yaziHaleli(ctx, t, sx, sy, c, fo, 'left'); sy += 17; });
}

/* ---------------------------------------------------- Grafik paneli */

function cizGrafik(ctx, w, h, st, p) {
  const pay = 8, gw = (w - pay * 3) / 2, gh = h - 6;
  const f = odak(p, st);
  const ince = f > 0;
  const aMax = Math.max(Math.abs(f) * 5, p.mod > 2.5 ? cisimA(st, p) * 1.1 : aEnBuyuk(p));
  const sinir = Math.abs(f) * 4;

  const v1 = [];
  for (let a = aMax / 160; a <= aMax; a += aMax / 160) {
    if (Math.abs(a - f) < Math.abs(f) * 0.06) continue;
    const b = goruntuB(a, f);
    if (b > sinir || b < -sinir) continue;
    v1.push({ t: a, v: b });
  }
  D.miniGrafik(ctx, {
    x: pay, y: 3, w: gw, h: gh,
    baslik: ince ? 'b − a   (a = f’de b → ∞)' : 'b − a   (kalın kenarlıda b daima −)',
    birim: 'cm', tEtiket: 'a (cm)',
    imlec: (() => { const a = cisimA(st, p), b = goruntuB(a, f); return b === null ? null : { t: a, v: b }; })(),
    veri: v1, tMax: aMax,
    vMin: ince ? -sinir : -Math.abs(f) * 1.15,
    vMax: ince ? sinir : 0,
    renk: R.kuvvet
  });

  const v2 = [];
  for (let a = aMax / 160; a <= aMax; a += aMax / 160) {
    if (Math.abs(a - f) < Math.abs(f) * 0.06) continue;
    const m = Math.abs(goruntuB(a, f) / a);
    if (m > 4) continue;
    v2.push({ t: a, v: m });
  }
  D.miniGrafik(ctx, {
    x: pay * 2 + gw, y: 3, w: gw, h: gh,
    baslik: ince ? 'Büyütme − a   (a = 2f’de tam 1)' : 'Büyütme − a   (daima < 1)',
    birim: '', tEtiket: 'a (cm)',
    imlec: (() => { const a = cisimA(st, p), b = goruntuB(a, f); return b === null ? null : { t: a, v: Math.abs(b / a) }; })(),
    veri: v2, tMax: aMax, vMin: 0, vMax: ince ? 4 : 1.05, renk: R.normal
  });
}

/* ------------------------------------------------------------ Okumalar */

function okumalar(st, p) {
  const f = odak(p, st), a = cisimA(st, p);
  const o = ozellik(a, f);

  const temel = [
    { et: 'Mercek türü',     dg: f > 0 ? 'İnce kenarlı' : 'Kalın kenarlı', birim: '' },
    { et: 'Odak uzaklığı f', dg: D.biçim(f, 4), birim: 'cm' },
    { et: 'Cisim uzaklığı a',dg: D.biçim(a, 4), birim: 'cm' }
  ];

  if (o.b === undefined) {
    return temel.concat([
      { et: 'Durum',    dg: durumAdi(a, f),      birim: '' },
      { et: 'Görüntü',  dg: 'Oluşmaz (sonsuzda)', birim: '' }
    ]);
  }

  const ek = [
    { et: 'Görüntü uzaklığı b', dg: D.biçim(o.b, 4), birim: 'cm' },
    { et: 'Büyütme |b/a|',      dg: D.biçim(o.m, 4), birim: '' },
    { et: 'Durum',              dg: durumAdi(a, f),  birim: '' },
    { et: 'Özellikleri',        dg: o.cins + ' · ' + o.yon + ' · ' + o.boy, birim: '' }
  ];

  if (p.mod > 2.5) {
    const al = aletAl(st, p);
    ek.push({ et: 'Alet', dg: al.ad, birim: '' });
    ek.push({ et: 'Perdeye düşer mi?', dg: o.b > 0 ? 'Evet' : 'Hayır (sanal)', birim: '' });
  }

  return temel.concat(ek);
}

/* ------------------------------------------------------------- Kayıt */

D.simler = D.simler || {};
D.simler['mercek-goruntu'] = {
  id: 'mercek-goruntu',
  baslik: '3.10 · Merceklerde görüntü · 1/f = 1/a + 1/b',
  yukseklik: 350,
  grafikPanel: true,
  grafikYukseklik: 150,
  parametreler: [
    { anahtar: 'mod', etiket: 'Düzenek', tur: 'secim', deger: 1, secenekler: [
      { d: 1, e: 'Cisim uzaklığını tara' },
      { d: 2, e: 'Otomatik tur — beş durum' },
      { d: 3, e: 'Optik aletler' }
    ]},
    { anahtar: 'tur', etiket: 'Mercek türü', tur: 'secim', deger: 1, secenekler: [
      { d: 1, e: 'İnce kenarlı (yakınsak)' },
      { d: 2, e: 'Kalın kenarlı (ıraksak)' }
    ]},
    { anahtar: 'alet', etiket: 'Optik alet', tur: 'secim', deger: 1, secenekler: [
      { d: 1, e: 'Fotoğraf makinesi' },
      { d: 2, e: 'Projeksiyon' },
      { d: 3, e: 'Büyüteç' }
    ]},
    { anahtar: 'f', etiket: 'Odak uzaklığı f', min: 8,  max: 50,  adim: 2, deger: 20, birim: 'cm' },
    { anahtar: 'a', etiket: 'Cisim uzaklığı a', min: 4, max: 200, adim: 2, deger: 60, birim: 'cm' }
  ],
  durum, adim, bitti, cizGercek, cizKlasik, cizGrafik, okumalar
};

})();
