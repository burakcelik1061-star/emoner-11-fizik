(function () {
"use strict";
window.F11 = window.F11 || {};

/* ==========================================================================
   sims/statik-kinetik-surtunme.js
   --------------------------------------------------------------------------
   Konu 1.4.1 · Statik ve kinetik sürtünme kuvvetleri   (MEB 11, s. 65-70)

   Kitaptaki Elif deneyinin birebir canlandırması (s.68):
     Blok yatay düzlemde duruyor, ipe bir kuvvetölçer bağlı.
     Uygulanan kuvvet YAVAŞ YAVAŞ artırılıyor.
     41 N'da blok harekete geçiyor; sonrasında 35 N hareketi sürdürmeye yetiyor.

   Bu yüzden kuvvet kullanıcı tarafından değil, ZAMANLA KENDİLİĞİNDEN artar.
   Deneyin tamamı böyle kurgulanmıştır; öğrenci kopma anını yakalamak için
   "+0,5 s" düğmesiyle tek tek ilerleyebilir.

   Fizik modeli
   ------------
   Blok duruyorken:   f_s = min(F, f_s_max)     (statik sürtünme KENDİNİ AYARLAR)
   F > f_s_max olunca blok kopar ve harekete geçer.
   Blok hareketliyken: f_k sabittir, F'den bağımsızdır.
                       a = (F − f_k) / m

   Statik sürtünmenin "kendini ayarlaması" bu konunun can alıcı noktasıdır:
   f_s tek bir değer değil, 0 ile f_s_max arasında DEĞİŞEN bir kuvvettir.
   ========================================================================== */

const D = window.F11;
const { R, K } = D;

const G_SABIT = 10;
const KAYIT = 0.02;

/* Sürtünme kuvvetleri NORMAL KUVVETLE orantılıdır (f = μ·N, N = m·g).
   Önceki sürümde f_s ve f_k doğrudan newton olarak giriliyordu; kütle
   değiştirilince sürtünme hiç değişmiyordu — fiziksel olarak yanlış.
   Varsayılanlar (m = 10 kg, μs = 0,41, μk = 0,35) kitaptaki Elif deneyinin
   41 N ve 35 N değerlerini birebir verir. */
function normalKuvvet(p) { return p.m * G_SABIT; }
function statikMaks(p)   { return p.mus * normalKuvvet(p); }

/* Kinetik katsayı fiziksel olarak statik katsayıyı AŞAMAZ. Kaydıraçlar
   bağımsız olduğu için kullanıcı tersini seçebilir; burada kırpılır.
   Böylece "kopma" anında sürtünme hep düşer, hiç artmaz. */
function kinetik(p) { return Math.min(p.muk, p.mus) * normalKuvvet(p); }

/* -------------------------------------------------------------- Durum */

function durum(p) {
  return {
    t: 0,
    F: 0,              // kuvvetölçerin gösterdiği değer (N)
    f: 0,              // sürtünme kuvveti (N)
    v: 0,              // blok hızı (m/s)
    x: 0,              // blok konumu (m)
    hareketli: false,
    koptuF: null,      // kopma anındaki kuvvet — grafikte işaretlenir
    kayit: [{ F: 0, f: 0, t: 0, v: 0 }],
    sonKayit: 0
  };
}

function adim(st, dt, p) {
  st.t += dt;
  st.F = p.hiz * st.t;                       // kuvvet düzgün artıyor

  if (!st.hareketli) {
    /* Statik sürtünme uygulanan kuvvete eşit büyür — ta ki sınıra dayanana dek. */
    if (st.F > statikMaks(p)) {
      st.hareketli = true;
      st.koptuF = statikMaks(p);
      st.f = kinetik(p);
    } else {
      st.f = st.F;
      st.v = 0;
    }
  }

  if (st.hareketli) {
    st.f = kinetik(p);                       // kinetik sürtünme sabit
    const a = (st.F - kinetik(p)) / p.m;
    st.v += a * dt;
    if (st.v < 0) st.v = 0;
    st.x += st.v * dt;
  }

  /* Kayıt aralığı deneyin süresine göre: μ ve m büyük, F yavaş artıyorsa
     deney uzar; sabit aralıkla grafik yarıda kesiliyordu. */
  const aralik = Math.max(KAYIT, (statikMaks(p) * 2.2 / Math.max(p.hiz, 0.1)) / 2500);
  if (st.t - st.sonKayit >= aralik && st.kayit.length < 3000) {
    st.sonKayit += aralik;
    st.kayit.push({ F: st.F, f: st.f, t: st.t, v: st.v });
  }
}

function bitti(st, p) { return st.F > statikMaks(p) * 2.2 || st.x > 18; }

/* ------------------------------------------------- Gerçekçi görünüm */

function cizGercek(ctx, w, h, st, p) {
  const ufuk = h - 40;
  const solPay = 46;
  const s = (w - solPay - 150) / 18;          // piksel / metre
  const bx = solPay + Math.min(st.x, 18) * s;

  D.gokyuzu(ctx, w, h, ufuk, { bulutlar: false, gunes: false });

  /* --- zemin: pürüzlü doku, sürtünmenin kaynağı --- */
  ctx.fillStyle = '#9C8468';
  ctx.fillRect(0, ufuk, w, h - ufuk);
  ctx.strokeStyle = '#7A6550'; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(0, ufuk + .5); ctx.lineTo(w, ufuk + .5); ctx.stroke();
  for (let i = 0; i < w; i += 7) {
    const yy = ufuk + 3 + ((i * 13) % 5);
    ctx.beginPath(); ctx.moveTo(i, yy); ctx.lineTo(i + 4, yy + 3); ctx.stroke();
  }

  /* --- blok --- */
  const boy = 40, gen = 54;
  D.sandik(ctx, bx, ufuk, gen, boy);
  D.yaziAydinlik(ctx, D.biçim(p.m) + ' kg', bx, ufuk - boy / 2, '#4A2E10',
                 '700 12px system-ui, sans-serif', 'center');

  /* --- ip + kuvvetölçer (dinamometre) --- */
  const ky = ufuk - boy / 2;
  const kx = bx + gen / 2 + 22;
  ctx.strokeStyle = '#8A6A3A'; ctx.lineWidth = 2.2;
  ctx.beginPath(); ctx.moveTo(bx + gen / 2, ky); ctx.lineTo(kx, ky); ctx.stroke();

  /* kuvvetölçer gövdesi */
  ctx.fillStyle = '#E8EDF5';
  D.yuvarlakDik(ctx, kx, ky - 15, 74, 30, 6); ctx.fill();
  ctx.strokeStyle = '#5F6B78'; ctx.lineWidth = 1.6; ctx.stroke();
  /* yay göstergesi */
  ctx.strokeStyle = '#B84A26'; ctx.lineWidth = 1.6;
  ctx.beginPath();
  for (let i = 0; i <= 12; i++) {
    const px = kx + 6 + i * 4.6, py = ky + (i % 2 ? -5 : 5);
    i ? ctx.lineTo(px, py) : ctx.moveTo(px, py);
  }
  ctx.stroke();
  D.yaziAydinlik(ctx, D.biçim(st.F) + ' N', kx + 37, ky - 24, '#2C3850',
                 '700 13px system-ui, sans-serif', 'center');

  /* çeken kişi */
  ctx.strokeStyle = '#8A6A3A'; ctx.lineWidth = 2.2;
  ctx.beginPath(); ctx.moveTo(kx + 74, ky); ctx.lineTo(kx + 100, ky); ctx.stroke();
  D.insan(ctx, kx + 116, ufuk, 1, '#993C1D', 0.32);

  /* --- kuvvet okları ---
     Ölçek deneyin EN BÜYÜK kuvvetine göre sabitlenir (F en çok f_s·2,2 olur).
     Böylece ok hiçbir zaman panelden taşmaz ve boylar baştan sona
     karşılaştırılabilir kalır. */
  const ol = 68 / Math.max(statikMaks(p) * 2.2, 1);
  D.vektor(ctx, bx + gen / 2, ufuk - boy - 14, bx + gen / 2 + st.F * ol, ufuk - boy - 14,
           R.kuvvet, 'F = ' + D.biçim(st.F) + ' N', { kalinlik: 2.8 });
  if (st.f > 0.2)
    D.vektor(ctx, bx - gen / 2, ufuk - boy - 14, bx - gen / 2 - st.f * ol, ufuk - boy - 14,
             R.surtunme, 'f = ' + D.biçim(st.f) + ' N', { kalinlik: 2.8 });

  /* --- durum rozeti --- */
  const msj = st.hareketli
    ? `KİNETİK · f_k = ${D.biçim(kinetik(p))} N (sabit)`
    : `STATİK · f_s = ${D.biçim(st.f)} N (F ile büyüyor)`;
  const zemin = st.hareketli ? 'rgba(255,176,32,.95)' : 'rgba(167,139,250,.95)';
  const yazi  = st.hareketli ? '#3A2A0C' : '#241C45';
  ctx.save(); ctx.font = '600 12px system-ui, sans-serif';
  const g = ctx.measureText(msj).width + 22; ctx.restore();
  D.rozet(ctx, msj, Math.max(8, w - g - 10), 9, zemin, yazi);

  if (st.koptuF !== null && st.t < 90)
    D.yaziAydinlik(ctx, `kopma: ${D.biçim(st.koptuF)} N`, 8, h - 10, '#4A2E10',
                   '600 11px system-ui, sans-serif', 'left');
}

/* --------------------------------------------- Klasik fizik görünümü */

function cizKlasik(ctx, w, h, st, p) {
  D.izgara(ctx, w, h, 28);
  const cx = w * 0.40, cy = h * 0.46;
  const N = p.m * G_SABIT;

  D.yaziHaleli(ctx, 'serbest cisim diyagramı', 12, 16, K.metin2,
               '600 11px system-ui, sans-serif', 'left');
  D.taramaliZemin(ctx, 18, w - 18, cy + 46, K.eksen);

  ctx.fillStyle = '#2E3D57';
  D.yuvarlakDik(ctx, cx - 28, cy - 22, 56, 44, 6); ctx.fill();
  ctx.strokeStyle = K.eksen; ctx.lineWidth = 1.5; ctx.stroke();
  D.yaziHaleli(ctx, D.biçim(p.m) + ' kg', cx, cy, K.beyaz,
               '600 11px system-ui, sans-serif', 'center');

  const enB = Math.max(statikMaks(p) * 2.2, N, 1);
  const ol = 72 / enB;

  if (st.F > 0.2)
    D.vektor(ctx, cx + 28, cy, cx + 28 + st.F * ol, cy, R.kuvvet,
             'F = ' + D.biçim(st.F), { kalinlik: 2.6 });
  if (st.f > 0.2)
    D.vektor(ctx, cx - 28, cy, cx - 28 - st.f * ol, cy, R.surtunme,
             'f = ' + D.biçim(st.f), { kalinlik: 2.6 });
  D.vektor(ctx, cx, cy - 22, cx, cy - 22 - N * ol, R.normal, 'N', { kalinlik: 2.2 });
  D.vektor(ctx, cx, cy + 22, cx, cy + 22 + N * ol, R.agirlik, 'G', { kalinlik: 2.2 });

  /* --- durum açıklaması --- */
  const satirlar = st.hareketli
    ? ['Blok HAREKETTE',
       'f_k = μk·N = ' + D.biçim(Math.min(p.muk, p.mus)) + '·' + D.biçim(normalKuvvet(p)) + ' = ' + D.biçim(kinetik(p)) + ' N',
       'F_net = F − f_k = ' + D.biçim(st.F - kinetik(p)) + ' N',
       'a = ' + D.biçim((st.F - kinetik(p)) / p.m) + ' m/s²']
    : ['Blok DURUYOR',
       'f = f_s = F = ' + D.biçim(st.f) + ' N',
       'f_s,maks = μs·N = ' + D.biçim(p.mus) + '·' + D.biçim(normalKuvvet(p)) + ' = ' + D.biçim(statikMaks(p)) + ' N',
       'F_net = 0 ⟹ a = 0'];

  let sy = h - 26 - (satirlar.length - 1) * 17;
  satirlar.forEach((t, i) => {
    D.yaziHaleli(ctx, t, w - 12, sy, i === 0 ? (st.hareketli ? R.ivme : R.surtunme) : K.beyaz,
                 (i === 0 ? '700 ' : '') + '11px system-ui, sans-serif', 'right');
    sy += 17;
  });
  D.yaziHaleli(ctx, 'N = G = ' + D.biçim(N) + ' N · düşeyde denge', w - 12, h - 8,
               K.metin2, '10px system-ui, sans-serif', 'right');
}

/* ------------------------------------------------------------ Grafik */

function cizGrafik(ctx, w, h, st, p) {
  const pay = 8;
  const gw = (w - pay * 4) / 3;
  const gh = h - 6;
  const Fmax = statikMaks(p) * 2.2;

  /* 1) Konunun YILDIZ grafiği: f − F
     Önce 45°'lik doğru (f_s = F), sonra kopma, sonra yatay doğru (f_k sabit). */
  D.miniGrafik(ctx, {
    x: pay, y: 3, w: gw, h: gh,
    baslik: 'f − F   (sürtünme–uygulanan)', birim: 'N',
    veri: st.kayit.map(d => ({ t: d.F, v: d.f })),
    tMax: Fmax, vMin: 0, vMax: statikMaks(p) * 1.3,
    renk: R.surtunme
  });

  D.miniGrafik(ctx, {
    x: pay * 2 + gw, y: 3, w: gw, h: gh,
    baslik: 'F − t   (uygulanan)', birim: 'N',
    veri: st.kayit.map(d => ({ t: d.t, v: d.F })),
    tMax: Math.max(st.t, 1), vMin: 0, vMax: Fmax,
    renk: R.kuvvet
  });

  D.miniGrafik(ctx, {
    x: pay * 3 + gw * 2, y: 3, w: gw, h: gh,
    baslik: 'ϑ − t   (blok hızı)', birim: 'm/s',
    veri: st.kayit.map(d => ({ t: d.t, v: d.v })),
    tMax: Math.max(st.t, 1), vMin: 0, vMax: Math.max(st.v * 1.3, 1),
    renk: R.hiz, dolgu: true
  });
}

/* ----------------------------------------------------------- Okumalar */

function okumalar(st, p) {
  return [
    { et: 'Uygulanan  F',  dg: D.biçim(st.F),                      birim: 'N' },
    { et: 'Sürtünme  f',   dg: D.biçim(st.f),                      birim: 'N' },
    { et: 'Türü',          dg: st.hareketli ? 'Kinetik' : 'Statik', birim: '' },
    { et: 'Bileşke  F_net',dg: D.biçim(st.hareketli ? st.F - kinetik(p) : 0), birim: 'N' },
    { et: 'Hız  ϑ',        dg: D.biçim(st.v),                      birim: 'm/s' },
    { et: 'Kopma kuvveti', dg: st.koptuF === null ? '—' : D.biçim(st.koptuF),
      birim: st.koptuF === null ? '' : 'N' }
  ];
}

/* ------------------------------------------------------------- Tanım */

D.simler = D.simler || {};
D.simler['statik-kinetik-surtunme'] = {
  id: 'statik-kinetik-surtunme',
  baslik: 'Kuvvetölçer deneyi · statikten kinetiğe',
  yukseklik: 300,
  grafikPanel: true,
  grafikYukseklik: 180,
  parametreler: [
    { anahtar: 'mus', etiket: 'μs (statik)',  min: 0.05, max: 1.0, adim: 0.01, deger: 0.41, birim: '' },
    { anahtar: 'muk', etiket: 'μk (kinetik)', min: 0.02, max: 0.9, adim: 0.01, deger: 0.35, birim: '' },
    { anahtar: 'm',   etiket: 'Kütle m',   min: 2,  max: 30, adim: 1, deger: 10, birim: 'kg' },
    { anahtar: 'hiz', etiket: 'F artış hızı', min: 2, max: 30, adim: 1, deger: 10, birim: 'N/s' }
  ],
  durum, adim, bitti, cizGercek, cizKlasik, cizGrafik, okumalar
};

})();
