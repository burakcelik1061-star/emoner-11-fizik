(function () {
"use strict";
window.F11 = window.F11 || {};

/* ==========================================================================
   sims/dusey-atislar.js
   --------------------------------------------------------------------------
   Konu 1.1 ek · Düşey atışlar (yukarı / aşağı / hareketli platformdan)

   NEDEN AYRI BİR SİMÜLASYON?
   --------------------------
   Serbest düşme ile düşey atış, kitapta aynı başlık altında toplanır
   (ikisinde de tek kuvvet ağırlıktır). Ama ÇÖZÜM açısından farklıdırlar:
     · Yukarı atışta hareket iki fazlıdır (çıkış + iniş) ve simetriktir
     · Aşağı atışta ilk hız harekete eklenir
     · HAREKETLİ bir platformdan atışta ise BAĞIL HIZ devreye girer

   Üçüncüsü bu simülasyonun asıl hedefidir.

   BAĞIL HIZ — KONUNUN EN ZOR NOKTASI
   ----------------------------------
   Yukarı çıkan bir balondan taş "aşağı doğru" atıldığında, taşın YERE GÖRE
   hızı aşağı doğru olmak zorunda değildir:

       ϑ₀(yere göre) = ϑ(platform) + ϑ(platforma göre)

   Balon +20 m/s ile çıkarken taş balona göre 10 m/s aşağı atılırsa:
       ϑ₀ = (+20) + (−10) = +10 m/s   →  taş hâlâ YUKARI gidiyor!

   Öğrencilerin çoğu burada −10 ya da −30 der. Simülasyon iki hızı ayrı
   vektörler olarak gösterip toplamını çizerek bunu görünür kılar.
   ========================================================================== */

const D = window.F11;
const { R, K } = D;

const KAYIT = 0.02;

/* Taşın yere göre ilk hızı — bağıl hız toplamı. */
function ilkHiz(p) { return p.vp + p.vb; }

/** Uçuş süresi: h0 + ϑ₀t − ½gt² = 0 pozitif kökü. */
function ucusSuresi(p) {
  const v0 = ilkHiz(p);
  return (v0 + Math.sqrt(v0 * v0 + 2 * p.g * p.h0)) / p.g;
}
/** Yerden ölçülen en yüksek nokta. */
function tepeYukseklik(p) {
  const v0 = ilkHiz(p);
  return p.h0 + (v0 > 0 ? (v0 * v0) / (2 * p.g) : 0);
}

/* -------------------------------------------------------------- Durum */

function durum(p) {
  return {
    t: 0,
    y: p.h0,                 // taşın yerden yüksekliği
    v: ilkHiz(p),
    platformY: p.h0,         // balonun yerden yüksekliği
    indi: false,
    kayit: [{ t: 0, y: p.h0, v: ilkHiz(p), py: p.h0 }],
    sonKayit: 0
  };
}

function adim(st, dt, p) {
  if (st.indi) return;
  const v0 = ilkHiz(p);
  st.t += dt;

  /* Kapalı form — tahtadaki formülle birebir aynı sayı çıksın diye */
  st.y = p.h0 + v0 * st.t - 0.5 * p.g * st.t * st.t;
  st.v = v0 - p.g * st.t;
  /* Platform sabit hızla yoluna devam eder (ivmesi yok) */
  st.platformY = p.h0 + p.vp * st.t;

  if (st.y <= 0) {
    st.t = ucusSuresi(p);
    st.y = 0;
    st.v = v0 - p.g * st.t;
    st.platformY = p.h0 + p.vp * st.t;
    st.indi = true;
  }

  if (st.t - st.sonKayit >= KAYIT && st.kayit.length < 3000) {
    st.sonKayit += KAYIT;
    st.kayit.push({ t: st.t, y: st.y, v: st.v, py: st.platformY });
  }
}

function bitti(st) { return st.indi; }

/* ------------------------------------------------- Gerçekçi görünüm */

function cizGercek(ctx, w, h, st, p) {
  const ufuk = h - 28;
  const ust = 34;

  /* Ölçek: taşın tepe noktası ile platformun gidebileceği en yüksek nokta */
  const enYuksek = Math.max(tepeYukseklik(p), st.platformY, p.h0) * 1.08;
  const olcek = (ufuk - ust) / Math.max(1, enYuksek);
  const Y = m => ufuk - m * olcek;

  D.gokyuzu(ctx, w, h, ufuk);
  D.tepeler(ctx, w, ufuk);
  D.cimZemin(ctx, w, h, ufuk);

  const bx = Math.round(w * 0.30);   // balon
  const tx = Math.round(w * 0.58);   // taş

  /* --- atış seviyesi --- */
  D.kesikliCizgi(ctx, 20, Y(p.h0), w - 40, Y(p.h0), 'rgba(77,163,255,.5)', 1.4, [6, 5]);
  D.yaziAydinlik(ctx, 'atış seviyesi · ' + D.biçim(p.h0) + ' m', w - 44, Y(p.h0) - 11,
                 '#185FA5', '600 11px system-ui, sans-serif', 'right');

  /* --- platform ---
     Hareketli ise sıcak hava balonu, sabit ise kule + atıcı çizilir.
     Böylece aynı simülasyon hem basit atışı hem bağıl hız durumunu anlatır. */
  const by = Y(st.platformY);
  if (Math.abs(p.vp) < 0.1) {
    D.tuglaKule(ctx, bx - 22, by, 44, ufuk, { mazgal: true, pencere: true, kapi: true });
    D.insan(ctx, bx + 32, by, .9, '#3C3489', p.vb >= 0 ? -1.1 : 0.9);
    ctx.fillStyle = '#5F6B78';
    ctx.fillRect(bx - 28, by - 4, 56, 5);
  } else {
  ctx.fillStyle = '#D85A30';
  ctx.beginPath(); ctx.ellipse(bx, by - 42, 26, 32, 0, 0, 6.2832); ctx.fill();
  ctx.fillStyle = '#E8C547';
  ctx.beginPath(); ctx.ellipse(bx, by - 42, 9, 32, 0, 0, 6.2832); ctx.fill();
  ctx.strokeStyle = '#8A5A28'; ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(bx - 14, by - 16); ctx.lineTo(bx - 8, by - 4);
  ctx.moveTo(bx + 14, by - 16); ctx.lineTo(bx + 8, by - 4);
  ctx.stroke();
  ctx.fillStyle = '#8A5A28';
  D.yuvarlakDik(ctx, bx - 11, by - 4, 22, 14, 2); ctx.fill();
  }

  /* platform hız oku */
  if (Math.abs(p.vp) > 0.1) {
    const yon = p.vp > 0 ? -1 : 1;
    D.vektor(ctx, bx - 40, by - 8, bx - 40, by - 8 + yon * Math.min(46, 12 + Math.abs(p.vp) * 1.6),
             '#993C1D', 'platform ' + D.biçim(p.vp), { kalinlik: 2.4 });
  }

  /* --- taşın yolu --- */
  D.kesikliCizgi(ctx, tx, ust, tx, ufuk, 'rgba(60,80,110,.35)', 1, [2, 6]);
  const ty = Y(st.y);
  D.top(ctx, tx, ty, 8);

  /* taşın hız oku */
  if (!st.indi && Math.abs(st.v) > 0.3) {
    const yon = st.v > 0 ? -1 : 1;
    D.vektor(ctx, tx + 22, ty, tx + 22, ty + yon * Math.min(56, 12 + Math.abs(st.v) * 1.3),
             R.hiz, 'ϑ = ' + D.biçim(st.v), { kalinlik: 2.4 });
  }

  /* --- tepe noktası --- */
  const tepe = tepeYukseklik(p);
  if (tepe > p.h0 + 0.5) {
    D.kesikliCizgi(ctx, tx - 50, Y(tepe), w - 40, Y(tepe), 'rgba(255,176,32,.7)', 1.4, [4, 4]);
    D.yaziAydinlik(ctx, 'tepe · ' + D.biçim(tepe) + ' m', w - 44, Y(tepe) - 11,
                   '#854F0B', '600 11px system-ui, sans-serif', 'right');
  }

  /* --- yükseklik cetveli --- */
  const rx = w - 26;
  ctx.strokeStyle = R.mur; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(rx, ust); ctx.lineTo(rx, ufuk); ctx.stroke();
  const adimM = D.guzelAdim(enYuksek, 4);
  for (let m = 0; m <= enYuksek; m += adimM) {
    const yy = Y(m);
    ctx.beginPath(); ctx.moveTo(rx, yy); ctx.lineTo(rx + 5, yy); ctx.stroke();
    D.yaziAydinlik(ctx, D.biçim(m), rx + 8, yy, R.mur, '10px system-ui, sans-serif', 'left');
  }

  /* --- durum rozeti: taş hangi yöne gidiyor? --- */
  const v0 = ilkHiz(p);
  let msj, zemin, yazi;
  if (st.t < 0.01) {
    msj = v0 > 0.1 ? 'Taş YUKARI çıkıyor · ϑ₀ = +' + D.biçim(v0)
        : v0 < -0.1 ? 'Taş AŞAĞI iniyor · ϑ₀ = ' + D.biçim(v0)
        : 'Taş serbest bırakıldı · ϑ₀ = 0';
    zemin = 'rgba(255,255,255,.93)'; yazi = '#2C3850';
  } else if (st.indi) {
    msj = 'Yere çarptı · ϑ = ' + D.biçim(Math.abs(st.v)) + ' m/s';
    zemin = 'rgba(226,75,74,.95)'; yazi = '#2A0A0E';
  } else {
    msj = st.v > 0 ? 'Yükseliyor · yavaşlıyor' : 'Düşüyor · hızlanıyor';
    zemin = 'rgba(255,255,255,.93)'; yazi = '#2C3850';
  }
  ctx.save(); ctx.font = '600 12px system-ui, sans-serif';
  const g = ctx.measureText(msj).width + 22; ctx.restore();
  D.rozet(ctx, msj, Math.max(8, w - g - 36), 9, zemin, yazi);
}

/* --------------------------------------------- Klasik fizik görünümü */

function cizKlasik(ctx, w, h, st, p) {
  D.izgara(ctx, w, h, 28);
  const v0 = ilkHiz(p);

  /* =================================================================
     SOL: KOORDİNAT DÜZLEMİ
     Diğer simülasyonlardaki gibi gerçek bir eksen — zemin, y ekseni,
     cismin konumu ve hız vektörü. Önceki sürümde yalnızca vektör
     toplamı vardı; taşın nerede olduğu ve zemin görünmüyordu.
     ================================================================= */
  /* İki sütun: sol koordinat düzlemi, sağ bağıl hız toplamı.
     Sınırlar orantıyla değil SABİT genişlikle hesaplanır; dar panelde
     iki bölüm birbirine giriyordu. */
  const solGen = Math.min(190, w * 0.42);      // sol sütunun toplam genişliği
  const ust = 30, alt = h - 34;
  const ox = 44;
  const cizBoy = solGen - ox - 52;             // seviye çizgilerinin uzunluğu
  const enYuksek = Math.max(tepeYukseklik(p), p.h0, 1) * 1.08;
  const olcek = (alt - ust) / enYuksek;
  const Y = m => alt - m * olcek;

  D.eksen(ctx, {
    ox, oy: alt, xUzun: 0, yUzun: alt - ust,
    xEtiket: '', yEtiket: 'y', birimY: 'm',
    olcek, yYukari: true
  });
  D.taramaliZemin(ctx, ox - 10, ox + cizBoy, alt, K.eksen);
  D.yaziHaleli(ctx, 'zemin', ox + cizBoy + 4, alt + 12, K.metin2,
               '10px system-ui, sans-serif', 'left');

  /* atış seviyesi */
  D.kesikliCizgi(ctx, ox, Y(p.h0), ox + cizBoy, Y(p.h0), 'rgba(77,163,255,.55)', 1.4, [5, 5]);
  D.yaziHaleli(ctx, 'h₀ ' + D.biçim(p.h0), ox + cizBoy + 4, Y(p.h0), R.konum,
               '600 10px system-ui, sans-serif', 'left');

  /* tepe seviyesi */
  const tepe = tepeYukseklik(p);
  if (tepe > p.h0 + 0.5) {
    D.kesikliCizgi(ctx, ox, Y(tepe), ox + cizBoy, Y(tepe), 'rgba(255,176,32,.6)', 1.4, [4, 4]);
    D.yaziHaleli(ctx, 'tepe ' + D.biçim(tepe), ox + cizBoy + 4, Y(tepe), R.ivme,
                 '600 10px system-ui, sans-serif', 'left');
  }

  /* taşın izlediği yol ve o anki konumu */
  const cx = ox + cizBoy * 0.52;
  D.kesikliCizgi(ctx, cx, ust, cx, alt, 'rgba(74,95,134,.4)', 1, [2, 6]);
  const cy = Y(Math.max(0, st.y));
  D.noktaCisim(ctx, cx, cy, 8, R.konum);
  D.yaziHaleli(ctx, D.biçim(st.y) + ' m', cx - 12, cy, K.beyaz,
               '600 11px system-ui, sans-serif', 'right');

  /* hız vektörü — yönü işaretle birlikte döner */
  if (!st.indi && Math.abs(st.v) > 0.3) {
    const yon = st.v > 0 ? -1 : 1;
    const boy = Math.min(58, 12 + Math.abs(st.v) * 1.2);
    D.vektor(ctx, cx, cy + yon * 10, cx, cy + yon * (10 + boy), R.hiz,
             'ϑ = ' + D.biçim(st.v), { kalinlik: 2.6 });
  }

  /* ivme — her zaman aşağı, her zaman g */
  D.vektor(ctx, ox + cizBoy * 0.9, ust + 16, ox + cizBoy * 0.9,
           ust + 16 + Math.min(46, p.g * 3.8), R.ivme, 'g', { kalinlik: 2.2 });

  /* =================================================================
     SAĞ: BAĞIL HIZ TOPLAMI — konunun can alıcı noktası
     ================================================================= */
  const bx = solGen + 14;
  const by = h * 0.34;
  const ol = 2.0;
  const cap = v => Math.max(-46, Math.min(46, v * ol));

  D.yaziHaleli(ctx, 'ilk hız nasıl bulunur?', bx, 16, K.metin2,
               '600 11px system-ui, sans-serif', 'left');
  D.kesikliCizgi(ctx, bx, by, w - 14, by, 'rgba(74,95,134,.5)', 1, [4, 4]);
  D.yaziHaleli(ctx, 'yukarı +', w - 14, by - 12, K.metin2, '10px system-ui, sans-serif', 'right');

  /* Etiketler vektör ucunda değil, taban çizgisinin ALTINDA ortalanır.
     Uçta olduklarında dar panelde yatayda taşıyorlardı. */
  const ara = (w - bx - 28) / 2;
  const kol = [
    [bx + 14,           p.vp, R.agirlik, 'ϑ_platform'],
    [bx + 14 + ara,     p.vb, R.surtunme, 'ϑ_bağıl'],
    [bx + 14 + ara * 2, v0,   R.hiz,     'ϑ₀']
  ];
  kol.forEach(([x, deger, renk, ad], i) => {
    D.vektor(ctx, x, by, x, by - cap(deger), renk, '', { kalinlik: i === 2 ? 3.2 : 2.6 });
    if (Math.abs(deger) < 0.1)
      D.noktaCisim(ctx, x, by, 4, renk);
    D.yaziHaleli(ctx, ad, x, by + 26, renk, '600 10px system-ui, sans-serif', 'center');
    D.yaziHaleli(ctx, D.biçim(deger), x, by + 40, K.beyaz,
                 '700 12px system-ui, sans-serif', 'center');
  });
  D.yaziHaleli(ctx, '+', bx + 14 + ara * 0.5, by + 33, K.metin2,
               '700 17px system-ui, sans-serif', 'center');
  D.yaziHaleli(ctx, '=', bx + 14 + ara * 1.5, by + 33, K.metin2,
               '700 17px system-ui, sans-serif', 'center');

  /* ---- anlık hesap satırları ---- */
  const satirlar = [
    'ϑ₀ = ' + D.biçim(p.vp) + ' + (' + D.biçim(p.vb) + ') = ' + D.biçim(v0) + ' m/s',
    'y = h₀ + ϑ₀·t − ½g·t² = ' + D.biçim(st.y) + ' m',
    'ϑ = ϑ₀ − g·t = ' + D.biçim(st.v) + ' m/s',
    'Uçuş süresi = ' + D.biçim(ucusSuresi(p), 2) + ' s'
  ];
  let sy = h - 30 - (satirlar.length - 1) * 18;
  satirlar.forEach((t, i) => {
    D.yaziHaleli(ctx, t, w - 14, sy, i === 0 ? R.hiz : K.beyaz,
                 (i === 0 ? '700 ' : '') + '11px system-ui, sans-serif', 'right');
    sy += 18;
  });

  /* ---- uyarı: yön tersine dönebilir ---- */
  const tersine = (p.vb < 0 && v0 > 0);
  D.yaziHaleli(ctx,
    tersine ? 'Aşağı atıldı ama YERE GÖRE yukarı gidiyor!'
            : 'Taş, platformun hızını da yanında götürür',
    w - 14, h - 8, tersine ? R.ivme : K.metin2,
    (tersine ? '700 ' : '') + '10px system-ui, sans-serif', 'right');
}

/* ------------------------------------------------------------ Grafik */

function cizGrafik(ctx, w, h, st, p) {
  const T = ucusSuresi(p);
  const v0 = ilkHiz(p);
  const pay = 8;
  const gw = (w - pay * 3) / 2;
  const gh = h - 6;

  D.miniGrafik(ctx, {
    x: pay, y: 3, w: gw, h: gh,
    baslik: 'y − t   (taş ve balon)', birim: 'm',
    veri: st.kayit.map(d => ({ t: d.t, v: d.y })),
    tMax: T, vMin: 0, vMax: Math.max(tepeYukseklik(p), p.h0) * 1.15,
    renk: R.konum
  });

  D.miniGrafik(ctx, {
    x: pay * 2 + gw, y: 3, w: gw, h: gh,
    baslik: 'ϑ − t   (işaret değişimi)', birim: 'm/s',
    veri: st.kayit.map(d => ({ t: d.t, v: d.v })),
    tMax: T,
    vMin: Math.min(-(p.g * T - v0) * 1.1, -5),
    vMax: Math.max(v0 * 1.3, 5),
    renk: R.hiz
  });
}

/* ----------------------------------------------------------- Okumalar */

function okumalar(st, p) {
  const v0 = ilkHiz(p);
  return [
    { et: 'Süre  t',        dg: D.biçim(st.t, 2),                birim: 's' },
    { et: 'ϑ₀ (yere göre)', dg: D.biçim(v0),                     birim: 'm/s' },
    { et: 'Taş yüksekliği', dg: D.biçim(st.y),                   birim: 'm' },
    { et: 'Taş hızı  ϑ',    dg: D.biçim(st.v),                   birim: 'm/s' },
    { et: 'Tepe noktası',   dg: D.biçim(tepeYukseklik(p)),       birim: 'm' },
    { et: 'Uçuş süresi',    dg: D.biçim(ucusSuresi(p), 2),       birim: 's' }
  ];
}

/* ------------------------------------------------------------- Tanım */

D.simler = D.simler || {};

/* Aynı fizik motoru iki konuya da hizmet eder; yalnızca başlangıç değerleri
   ve başlık farklıdır. Böylece her konu kendi tipik senaryosuyla açılır. */
const ORTAK = {
  yukseklik: 340,
  grafikPanel: true,
  grafikYukseklik: 170,
  parametreler: [
    /* Adım 1: konu metnindeki HER örnek (voleybolcunun 2 m'si dahil)
       simülasyonda birebir kurulabilsin diye. −/+ düğmeleri ince ayarı sağlar. */
    { anahtar: 'h0', etiket: 'Atış yüksekliği', min: 0, max: 200, adim: 1, deger: 75, birim: 'm' },
    { anahtar: 'vp', etiket: 'Platform hızı', min: -20, max: 25, adim: 1, deger: 0, birim: 'm/s' },
    /* Aralık ±45: konudaki en büyük örnek (havai fişek, ϑ₀ = 40 m/s)
       simülasyonda kurulabilsin. */
    { anahtar: 'vb', etiket: 'Atış (platforma göre)', min: -45, max: 45, adim: 1, deger: 20, birim: 'm/s' },
    { anahtar: 'g', etiket: 'g', tur: 'secim', deger: 10, secenekler: [
      { d: 10,  e: '10 m/s²' },
      { d: 1.6, e: '1,6 m/s² (Ay)' }
    ]}
  ],
  durum, adim, bitti, cizGercek, cizKlasik, cizGrafik, okumalar
};

/** Parametre varsayılanını değiştirilmiş bir kopya üretir. */
function varyant(id, baslik, varsayilan) {
  return Object.assign({}, ORTAK, {
    id, baslik,
    parametreler: ORTAK.parametreler.map(pr =>
      pr.anahtar in varsayilan ? Object.assign({}, pr, { deger: varsayilan[pr.anahtar] }) : pr)
  });
}

/* Aşağıdan yukarıya atış: yerden 45 m'lik kuleden 20 m/s ile yukarı */
D.simler['yukari-atis'] = varyant('yukari-atis',
  'Aşağıdan yukarıya atış', { h0: 45, vp: 0, vb: 20 });

/* Yukarıdan aşağıya atış: 75 m'de, 20 m/s ile çıkan balondan 10 m/s aşağı
   (bağıl hız sorusunun tam kendisi) */
D.simler['asagi-atis'] = varyant('asagi-atis',
  'Yukarıdan aşağıya atış', { h0: 75, vp: 20, vb: -10 });

})();
