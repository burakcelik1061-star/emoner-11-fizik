(function () {
"use strict";
window.F11 = window.F11 || {};

/* ==========================================================================
   sims/kuresel-goruntu.js
   --------------------------------------------------------------------------
   Konu 3.3.2 · Küresel aynalarda görüntü  (MEB 11, s.333-342)

   AYNA DENKLEMİ
   -------------
       1/f = 1/a + 1/b          ⟹   b = a·f / (a − f)

       a : cismin aynaya uzaklığı   (daima +)
       b : görüntünün uzaklığı      (+ ⟹ önde/GERÇEK, − ⟹ arkada/SANAL)
       f : odak uzaklığı            (+ ⟹ çukur, − ⟹ tümsek)

   BÜYÜTME
   -------
       |büyütme| = |b / a|

   ÇUKUR AYNADA BEŞ DURUM
   ----------------------
       a > 2f      gerçek · ters · küçük        (2f ile f arasında)
       a = 2f      gerçek · ters · eşit         (b = 2f)
       f < a < 2f  gerçek · ters · büyük        (2f'nin ötesinde)
       a = f       görüntü oluşmaz              (ışınlar paralel çıkar)
       a < f       sanal  · düz  · büyük        (aynanın arkasında)

   TÜMSEK AYNADA
   -------------
       Cisim nerede olursa olsun: SANAL · DÜZ · KÜÇÜK.
       Çünkü f < 0 iken a − f daima pozitif ve a'dan büyüktür ⟹ |b| < a.

   Bu dosyadaki tüm sayılar kapalı formülden gelir; sayısal integrasyon yok,
   ekrandaki değerler elle yapılan hesapla birebir aynıdır.
   ========================================================================== */

const D = window.F11;
const { R, K } = D;

const TUR_SURESI = 20;          // otomatik tur (mod 2) uzunluğu, s

/* ------------------------------------------------------------- Fizik */

/** İşaretli odak uzaklığı: çukurda +f, tümsekte −f. */
function odak(p) { return (p.tur < 1.5 ? 1 : -1) * p.f; }

/** Otomatik turda cismin o anki uzaklığı — üstel yaklaşma. */
function turUzakligi(st, p) {
  const f = p.f;
  const bas = 4 * f, son = 0.35 * f;
  const oran = Math.min(1, st.t / TUR_SURESI);
  return bas * Math.pow(son / bas, oran);
}

/** O anda geçerli cisim uzaklığı (cm). */
function cisimA(st, p) {
  return p.mod < 1.5 ? (st.a ?? p.a) : turUzakligi(st, p);
}

/** Ayna denklemi. Cisim tam odaktaysa null döner. */
function goruntuB(a, f) {
  const payda = a - f;
  if (Math.abs(payda) < 1e-6) return null;
  return (a * f) / payda;
}

/** Durum adı — beş durumdan hangisi. */
function durumAdi(a, f) {
  if (f < 0) return 'Tümsek ayna · her zaman aynı';
  const e = f * 0.03;
  if (Math.abs(a - 2 * f) < e) return 'Cisim M’de';
  if (Math.abs(a - f) < e)     return 'Cisim F’de';
  if (a > 2 * f)               return 'Cisim M’nin dışında';
  if (a > f)                   return 'Cisim F ile M arasında';
  return 'Cisim F ile ayna arasında';
}

/** Görüntünün üç özelliği. */
function goruntuOzellik(a, f) {
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
function durum(p) { return { t: 0, a: p.a }; }

/* Tarama beş durumu da geçecek yöne gider: cisim 2F’nin dışındaysa aynaya
   doğru (2F’yi ve F’yi geçerek), içindeyse aynadan uzağa (F’yi ve 2F’yi
   geçerek). Ölçek bu aralığa göre kurulur. */
function taramaHedefi(p) { return p.a > 2.2 * p.f ? 0.4 * p.f : 3 * p.f; }

/** Cismin bu düzenekte alabileceği en büyük uzaklık — ölçek ve grafik ekseni
    buna göre kurulur ki tarama boyunca SABİT kalsın. */
function aEnBuyuk(p) {
  return p.mod < 1.5 ? Math.max(p.a, taramaHedefi(p)) : 4 * p.f;
}

function adim(st, dt, p) {
  st.t += dt;
  if (p.mod < 1.5) st.a = D.tarama(st.t, p.a, taramaHedefi(p), 14);
}
function bitti(st, p) { return p.mod > 1.5 && st.t >= TUR_SURESI; }

/* ------------------------------------------------- Ortak yerleşim */

function yerlesim(w, h, st, p) {
  const cukur = p.tur < 1.5;
  const f = odak(p);
  const a = cisimA(st, p);
  const b = goruntuB(a, f);

  const cy = h * 0.52;

  /* Yerleşim tarama boyunca SABİT: cismin en uzak konumu, M ve (taramada
     oluşuyorsa) aynanın ARKASINDAKİ sanal görüntü sığacak şekilde. Anlık a’ya
     göre kurulsaydı cisim ekranda yerinde durur, ayna ile odak kayıyormuş gibi
     görünürdü. Panele yine sığmayan görüntü ayrıca bildirilir. */
  const aMinS = p.mod < 1.5 ? Math.min(p.a, taramaHedefi(p)) : 0.35 * p.f;
  const sanalVar = !cukur || aMinS < p.f;
  const solCm = Math.max(aEnBuyuk(p) * 1.10, cukur ? p.f * 2.4 : p.f * 0.5, 1);
  const sagCm = cukur ? (sanalVar ? p.f * 2.2 : solCm * 0.28) : p.f * 2.3;
  const solKenar = w * 0.06, sagKenar = w * 0.96;
  const ax = solKenar + (sagKenar - solKenar) * solCm / (solCm + sagCm);
  const olcek = Math.min((sagKenar - solKenar) / (solCm + sagCm), 6.5);

  const boyPx = Math.min(h * 0.24, p.cisimBoyu * olcek * 2.2, 66);
  return { cukur, cy, ax, olcek, f, a, b, boyPx };
}

function xKonum(y, d) { return y.ax - d * y.olcek; }

/* --------------------------------------------- Gerçekçi görünüm */

function cizGercek(ctx, w, h, st, p) {
  const y = yerlesim(w, h, st, p);
  const solKenar = w * 0.03;

  /* asal eksen */
  D.kesikliCizgi(ctx, w * 0.02, y.cy, w * 0.98, y.cy, 'rgba(150,170,200,.55)', 1.4, [7, 5]);

  /* ayna — çizim yarıçapı R = 2f */
  const Rpx = Math.abs(2 * y.f) * y.olcek;
  D.kureselAyna(ctx, y.ax, y.cy, Rpx, y.cukur ? 'cukur' : 'tumsek', 0.42);

  /* T · F · M */
  const fx = xKonum(y, y.f);
  const mx = xKonum(y, 2 * y.f);
  isaret(ctx, y.ax, y.cy, 'T', K.beyaz);
  isaret(ctx, fx, y.cy, 'F', R.ivme);
  isaret(ctx, mx, y.cy, 'M', R.kuvvet);

  /* cisim */
  const ox = xKonum(y, y.a);
  const ty = y.cy - y.boyPx;
  D.nesneOku(ctx, ox, y.cy, y.boyPx, R.hiz, 'cisim');

  /* ---- üç özel ışın ----
     Cisim M'ye yaklaştıkça 2. ışın (merkezden geçen) çok dikleşir ve aynaya
     panelin dışında çarpar. Böyle durumlarda o ışın çizilmez; görüntüyü
     belirlemek için zaten iki ışın yeterlidir. */
  const panelDisi = yy => yy < 6 || yy > h - 6;

  /* 1) eksene paralel gelir, odaktan geçer */
  D.isin(ctx, ox, ty, y.ax, ty, R.ivme, 2, true);
  cikanIsin(ctx, y.ax, ty, fx, y.cy, solKenar, R.ivme);

  /* 2) merkezden geçer, geri döner */
  let atlanan = 0;
  if (Math.abs(mx - ox) > 4) {
    const y2 = ty + (y.ax - ox) * (y.cy - ty) / (mx - ox);
    if (panelDisi(y2)) atlanan++;
    else {
      D.isin(ctx, ox, ty, y.ax, y2, R.surtunme, 2, true);
      cikanIsin(ctx, y.ax, y2, mx, y.cy, solKenar, R.surtunme);
    }
  }

  /* 3) odaktan geçerek gelir, eksene paralel yansır */
  if (Math.abs(fx - ox) > 4) {
    const y3 = ty + (y.ax - ox) * (y.cy - ty) / (fx - ox);
    if (panelDisi(y3)) atlanan++;
    else {
      D.isin(ctx, ox, ty, y.ax, y3, R.kuvvet, 2, true);
      if (y.f < 0) D.sanalIsin(ctx, y.ax, y3, fx, y.cy, 'rgba(150,175,210,.8)');
      D.isin(ctx, y.ax, y3, solKenar, y3, R.kuvvet, 2, true);
    }
  }
  if (atlanan)
    D.yaziAydinlik(ctx, atlanan + ' ışın panele sığmadığı için çizilmedi',
                   w - 10, h - 10, R.surtunme,
                   '600 11px system-ui, sans-serif', 'right');

  /* ---- görüntü ---- */
  const bxPanel = y.b === null ? null : xKonum(y, y.b);
  if (y.b === null || bxPanel < w * 0.01 || bxPanel > w * 0.99) {
    D.yaziAydinlik(ctx,
      y.b === null ? 'Cisim tam odakta — yansıyan ışınlar PARALEL, görüntü oluşmaz'
                   : (y.b > 0 ? 'Görüntü önde ' : 'Sanal görüntü arkada ') + D.biçim(Math.abs(y.b)) +
                     ' cm uzakta — panelin dışında',
      w * 0.5, h * 0.95, R.kuvvet, '700 12px system-ui, sans-serif', 'center');
  } else {
    const bx = xKonum(y, y.b);
    const gBoyTam = -y.boyPx * (y.b / y.a);
    /* Büyük büyütmelerde görüntü oku panelden taşıyordu; panele sığacak
       şekilde kısaltılır ve gerçek oranı etiketle belirtilir. */
    const enFazla = h * 0.42;
    const tasti = Math.abs(gBoyTam) > enFazla;
    const gBoy = tasti ? Math.sign(gBoyTam) * enFazla : gBoyTam;
    const sanal = y.b < 0;
    const etiket = (sanal ? 'sanal görüntü' : 'görüntü') +
                   (tasti ? '  (×' + D.biçim(Math.abs(y.b / y.a), 3) + ')' : '');
    /* Sanal görüntü aynanın ARKASINDA: yansıyan ışınların geri uzantıları
       (kesikli) orada kesişir. 1. ışın (paralel gelen) ile tepe noktasına
       gelen ışın her durumda çizilebilir. */
    if (sanal) {
      const tepeY = y.cy - gBoyTam;                 // ok ucu: taban − boy
      D.sanalIsin(ctx, y.ax, ty, bx, tepeY, 'rgba(150,175,210,.85)');
      D.sanalIsin(ctx, y.ax, y.cy, bx, tepeY, 'rgba(150,175,210,.85)');
      /* tepe noktasına gelen ışın: eksenle eşit açıyla yansır */
      D.isin(ctx, ox, ty, y.ax, y.cy, R.hiz, 1.6, true);
      D.isin(ctx, y.ax, y.cy, solKenar, y.cy + (y.cy - ty) * (y.ax - solKenar) / (y.ax - ox), R.hiz, 1.6, true);
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
  }

  /* ---- ölçüler ---- */
  D.olcu(ctx, Math.min(ox, y.ax), y.cy + h * 0.30, Math.max(ox, y.ax), y.cy + h * 0.30,
         'a = ' + D.biçim(y.a) + ' cm', R.hiz);
  if (bxPanel !== null && bxPanel >= w * 0.01 && bxPanel <= w * 0.99) {
    D.olcu(ctx, Math.min(bxPanel, y.ax), y.cy + h * 0.38, Math.max(bxPanel, y.ax), y.cy + h * 0.38,
           'b = ' + D.biçim(y.b) + ' cm', R.kuvvet);
  }

  /* durum başlığı */
  D.yaziAydinlik(ctx, durumAdi(y.a, y.f), 10, 18, R.surtunme,
                 '700 12px system-ui, sans-serif', 'left');

  if (p.mod > 1.5) {
    const kalan = Math.max(0, TUR_SURESI - st.t);
    D.yaziAydinlik(ctx, 'otomatik tur · ' + D.biçim(kalan) + ' s', w - 10, 18,
                   R.surtunme, '600 11px system-ui, sans-serif', 'right');
  }
}

function isaret(ctx, x, yy, ad, renk) {
  ctx.save();
  ctx.fillStyle = renk;
  ctx.beginPath(); ctx.arc(x, yy, 4, 0, 6.2832); ctx.fill();
  ctx.restore();
  D.yaziAydinlik(ctx, ad, x, yy - 10, renk, '700 12px system-ui, sans-serif', 'center');
}

/** Aynadan çıkan ışın: fiziksel yol daima sola gider, uzantısı kesikli. */
function cikanIsin(ctx, px, py, qx, qy, solKenar, renk) {
  const dx = qx - px;
  if (Math.abs(dx) < 1e-6) return;
  const m = (qy - py) / dx;
  D.isin(ctx, px, py, solKenar, py + m * (solKenar - px), renk, 2, true);
  if (qx > px) D.sanalIsin(ctx, px, py, qx, qy, 'rgba(150,175,210,.8)');
}

/* ------------------------------------------ Klasik fizik görünümü */

function cizKlasik(ctx, w, h, st, p) {
  D.izgara(ctx, w, h, 26);
  const f = odak(p);
  const a = cisimA(st, p);
  const o = goruntuOzellik(a, f);

  D.yaziHaleli(ctx, p.tur < 1.5 ? 'Çukur ayna' : 'Tümsek ayna', 12, 22, K.beyaz,
               '700 12px system-ui, sans-serif', 'left');

  /* --- sol sütun: hesap --- */
  const sol = [
    ['1/f = 1/a + 1/b', K.beyaz, '700 14px system-ui, sans-serif'],
    ['b = a·f / (a − f)', K.metin, '12px system-ui, sans-serif'],
    ['', K.metin2, '11px'],
    ['f = ' + D.biçim(f) + ' cm', R.ivme, '700 13px system-ui, sans-serif'],
    ['a = ' + D.biçim(a) + ' cm', R.hiz,  '700 13px system-ui, sans-serif'],
    ['a − f = ' + D.biçim(a - f) + ' cm', K.metin2, '12px system-ui, sans-serif'],
    ['b = ' + (o.b === undefined ? '∞' : D.biçim(o.b, 4)) + ' cm',
      R.kuvvet, '700 14px system-ui, sans-serif'],
    ['', K.metin2, '11px'],
    ['Büyütme = |b/a|', K.beyaz, '700 12px system-ui, sans-serif'],
    ['= ' + (o.m === undefined ? '—' : D.biçim(o.m, 3)), R.normal, '700 13px system-ui, sans-serif']
  ];
  let sy = 46;
  sol.forEach(([t, c, fo]) => { if (t) D.yaziHaleli(ctx, t, 12, sy, c, fo, 'left'); sy += 17; });

  /* --- sağ sütun: durum tablosu --- */
  const sx = w * 0.54;
  D.yaziHaleli(ctx, durumAdi(a, f), sx, 22, R.surtunme,
               '700 12px system-ui, sans-serif', 'left');
  const sag = [
    ['Cins : ' + o.cins, o.cins === 'Gerçek' ? R.kuvvet : '#8FA8C8', '700 13px system-ui, sans-serif'],
    ['Yön  : ' + o.yon,  K.beyaz, '700 13px system-ui, sans-serif'],
    ['Boy  : ' + o.boy,  R.normal, '700 13px system-ui, sans-serif'],
    ['', K.metin2, '11px'],
    ['b > 0 ⟹ ÖNDE · gerçek', K.metin2, '11px system-ui, sans-serif'],
    ['b < 0 ⟹ ARKADA · sanal', K.metin2, '11px system-ui, sans-serif'],
    ['', K.metin2, '11px'],
    ['Gerçek görüntü perdeye düşer', K.metin2, '11px system-ui, sans-serif'],
    ['ve DAİMA terstir', K.metin2, '11px system-ui, sans-serif'],
    ['Sanal görüntü perdeye düşmez', K.metin2, '11px system-ui, sans-serif'],
    ['ve DAİMA düzdür', K.metin2, '11px system-ui, sans-serif']
  ];
  sy = 46;
  sag.forEach(([t, c, fo]) => { if (t) D.yaziHaleli(ctx, t, sx, sy, c, fo, 'left'); sy += 17; });
}

/* ---------------------------------------------------- Grafik paneli */

function cizGrafik(ctx, w, h, st, p) {
  const pay = 8, gw = (w - pay * 3) / 2, gh = h - 6;
  const f = odak(p);
  const cukur = p.tur < 1.5;
  const aMax = Math.max(p.f * 5, aEnBuyuk(p));
  /* Canlı çalışma noktası — tarama oynatılınca eğri üzerinde kayar. */
  const aCanli = cisimA(st, p);
  const bCanli = goruntuB(aCanli, f);
  /* Çukurda b hem + hem − olur; tümsekte daima −f ile 0 arasındadır. */
  const bUst = cukur ? Math.abs(f) * 4 : 0;
  const bAlt = cukur ? -Math.abs(f) * 4 : -Math.abs(f) * 1.15;
  const sinir = Math.abs(f) * 4;

  /* --- b − a --- */
  const v1 = [];
  for (let a = aMax / 160; a <= aMax; a += aMax / 160) {
    if (Math.abs(a - f) < Math.abs(f) * 0.06) continue;      // asimptot çevresi
    const b = goruntuB(a, f);
    if (b > sinir || b < -sinir) continue;
    v1.push({ t: a, v: b });
  }
  D.miniGrafik(ctx, {
    x: pay, y: 3, w: gw, h: gh,
    baslik: cukur ? 'b − a   (a = f’de ışınlar paralel: b → ∞)'
                        : 'b − a   (tümsekte b daima negatif)',
    birim: 'cm', tEtiket: 'a (cm)',
    imlec: bCanli === null ? null : { t: aCanli, v: bCanli },
    veri: v1, tMax: aMax, vMin: bAlt, vMax: bUst, renk: R.kuvvet
  });

  /* --- büyütme − a --- */
  const v2 = [];
  for (let a = aMax / 160; a <= aMax; a += aMax / 160) {
    if (Math.abs(a - f) < Math.abs(f) * 0.06) continue;
    const b = goruntuB(a, f);
    const m = Math.abs(b / a);
    if (m > 4) continue;
    v2.push({ t: a, v: m });
  }
  D.miniGrafik(ctx, {
    x: pay * 2 + gw, y: 3, w: gw, h: gh,
    baslik: cukur ? 'Büyütme − a   (a = 2f’de tam 1)'
                        : 'Büyütme − a   (tümsekte daima < 1)',
    birim: '', tEtiket: 'a (cm)',
    imlec: bCanli === null ? null : { t: aCanli, v: Math.abs(bCanli / aCanli) },
    veri: v2, tMax: aMax, vMin: 0, vMax: 4, renk: R.normal
  });
}

/* ------------------------------------------------------------ Okumalar */

function okumalar(st, p) {
  const f = odak(p);
  const a = cisimA(st, p);
  const o = goruntuOzellik(a, f);

  if (o.b === undefined) {
    return [
      { et: 'Cisim uzaklığı a', dg: D.biçim(a),     birim: 'cm' },
      { et: 'Odak uzaklığı f',  dg: D.biçim(f),     birim: 'cm' },
      { et: 'Durum',            dg: durumAdi(a, f), birim: '' },
      { et: 'Görüntü',          dg: 'Oluşmaz (sonsuzda)', birim: '' }
    ];
  }

  return [
    { et: 'Cisim uzaklığı a',   dg: D.biçim(a),        birim: 'cm' },
    { et: 'Odak uzaklığı f',    dg: D.biçim(f),        birim: 'cm' },
    { et: 'Görüntü uzaklığı b', dg: D.biçim(o.b, 4),   birim: 'cm' },
    { et: 'Büyütme |b/a|',      dg: D.biçim(o.m, 3),   birim: '' },
    { et: 'Görüntü boyu',       dg: D.biçim(p.cisimBoyu * o.m, 3), birim: 'cm' },
    { et: 'Durum',              dg: durumAdi(a, f),    birim: '' },
    { et: 'Özellikleri',        dg: o.cins + ' · ' + o.yon + ' · ' + o.boy, birim: '' }
  ];
}

/* ------------------------------------------------------------- Kayıt */

D.simler = D.simler || {};
D.simler['kuresel-goruntu'] = {
  id: 'kuresel-goruntu',
  baslik: '3.3.2 · Küresel aynalarda görüntü · 1/f = 1/a + 1/b',
  yukseklik: 350,
  grafikPanel: true,
  grafikYukseklik: 150,
  parametreler: [
    { anahtar: 'mod', etiket: 'Düzenek', tur: 'secim', deger: 1, secenekler: [
      { d: 1, e: 'Cisim uzaklığını tara' },
      { d: 2, e: 'Otomatik tur — beş durum' }
    ]},
    { anahtar: 'tur', etiket: 'Ayna türü', tur: 'secim', deger: 1, secenekler: [
      { d: 1, e: 'Çukur (konkav)' },
      { d: 2, e: 'Tümsek (konveks)' }
    ]},
    { anahtar: 'f',          etiket: 'Odak uzaklığı f', min: 10, max: 50,  adim: 2, deger: 20, birim: 'cm' },
    { anahtar: 'a',          etiket: 'Cisim uzaklığı a', min: 4,  max: 200, adim: 2, deger: 60, birim: 'cm' },
    { anahtar: 'cisimBoyu',  etiket: 'Cisim boyu',      min: 2,  max: 20,  adim: 1, deger: 8,  birim: 'cm' }
  ],
  durum, adim, bitti, cizGercek, cizKlasik, cizGrafik, okumalar
};

})();
