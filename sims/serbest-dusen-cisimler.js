(function () {
"use strict";
window.F11 = window.F11 || {};

/* ==========================================================================
   sims/serbest-dusen-cisimler.js
   --------------------------------------------------------------------------
   Konu 1.1.1 · Serbest düşen cisimler

   Kitabın açılış anlatısı: Galileo'nun "havası alınmış ortamda yün yumağı ile
   kurşun aynı hızla düşer" hipotezi ve 2 Ağustos 1971'de Apollo 15 astronotu
   David Scott'ın Ay yüzeyinde şahin tüyü ile jeolog çekicini aynı anda
   bırakması.

   Bu yüzden simülasyon TEK cisim değil İKİ cisim düşürür: ağır bir metal top
   ve hafif bir tüy. Öğrenci kütlenin değil HAVA DİRENCİNİN fark yarattığını
   kendi gözüyle görür.

   Fizik modeli
   ------------
   Aşağı yön pozitif alınmıştır.
       a = g − k·ϑ²          (k: sürüklenme katsayısı, cisme özgü)
   Havasız ortamda ve Ay'da k = 0 olur, ivme sabittir: a = g.
   k > 0 iken cisim limit hıza yaklaşır: ϑ_limit = √(g/k)
   (Limit hız 1.5'te ayrıca işlenecek; burada sadece görsel sezgi veriliyor.)
   ========================================================================== */

const D = window.F11;
const { R, K } = D;

/* Sürüklenme katsayıları — gerçekçi oranı verecek şekilde seçildi.
   Tüy için ϑ_limit = √(10/0,9) ≈ 3,3 m/s, metal top için ≈ 79 m/s. */
const k_TOP = 0.0016;
const k_TUY = 0.9;

/* Işık hızında koşmayalım: strobe (eşit zaman aralığı) işareti periyodu */
const STROBE = 0.5;

/* -------------------------------------------------------------- Durum */

function durum(p) {
  return {
    t: 0,
    top: { y: p.h0, v: 0, indi: false, sure: 0 },
    tuy: { y: p.h0, v: 0, indi: false, sure: 0 },
    strobeTop: [p.h0],
    strobeTuy: [p.h0],
    sonStrobe: 0
  };
}

/** Ortamda hava var mı? Ay seçiliyse atmosfer yok. */
function havaVar(p) { return p.hava > 0.5 && p.g > 5; }

/**
 * Bir cismi bir adım ilerletir.
 *
 * k = 0 (havasız ortam) ise sabit ivmeli hareketin KAPALI FORM çözümü
 * kullanılır — ekrandaki sayı, tahtada yazılan h = ½gt² ve ϑ = gt
 * formüllerinin verdiği sayıyla birebir aynı çıksın diye.
 *
 * k > 0 (hava direnci) ise kapalı form yok, sayısal integrasyon yapılır.
 * Orada zaten amaç kesin sayı değil, tüyün geri kaldığını göstermek.
 */
function cisimAdim(c, dt, g, k, h0) {
  if (c.indi) return;
  c.sure += dt;

  if (k === 0) {
    c.v = g * c.sure;
    c.y = h0 - 0.5 * g * c.sure * c.sure;
  } else {
    const a = g - k * c.v * c.v;      // aşağı pozitif
    c.v += a * dt;
    c.y -= c.v * dt;
  }

  if (c.y <= 0) {
    c.y = 0;
    c.indi = true;
    if (k === 0) {                    // iniş anı da tam olsun
      c.sure = Math.sqrt(2 * h0 / g);
      c.v = g * c.sure;
    }
  }
}

function adim(st, dt, p) {
  const k = havaVar(p) ? 1 : 0;
  cisimAdim(st.top, dt, p.g, k_TOP * k, p.h0);
  cisimAdim(st.tuy, dt, p.g, k_TUY * k, p.h0);
  st.t += dt;

  /* Eşit zaman aralıklarında konum kaydı. Yere inen cisim için kayıt durur —
     dipte üst üste yığılmasın. Diziler bağımsız uzunlukta olabilir. */
  if (st.t - st.sonStrobe >= STROBE) {
    st.sonStrobe += STROBE;
    if (!st.top.indi && st.strobeTop.length < 60) st.strobeTop.push(st.top.y);
    if (!st.tuy.indi && st.strobeTuy.length < 60) st.strobeTuy.push(st.tuy.y);
  }
}

function bitti(st) { return st.top.indi && st.tuy.indi; }

/* ------------------------------------------------- Gerçekçi görünüm */

function cizGercek(ctx, w, h, st, p) {
  const ay = p.g < 5;
  const ufuk = h - 34;
  const ust = 42;
  const olcek = (ufuk - ust) / p.h0;      // piksel / metre

  /* --- gökyüzü --- */
  if (ay) {
    ctx.fillStyle = '#0B1020'; ctx.fillRect(0, 0, w, ufuk);
    ctx.fillStyle = '#FFFFFF';
    for (let i = 0; i < 26; i++) {
      const sx = (i * 97) % w, sy = (i * 53) % (ufuk - 20);
      ctx.globalAlpha = .25 + ((i * 37) % 60) / 100;
      ctx.fillRect(sx, sy, 1.6, 1.6);
    }
    ctx.globalAlpha = 1;
    /* Dünya, ufukta */
    ctx.fillStyle = '#2E6FBF';
    ctx.beginPath(); ctx.arc(w - 48, 44, 16, 0, 6.2832); ctx.fill();
    ctx.fillStyle = '#5FA05A';
    ctx.beginPath(); ctx.arc(w - 52, 40, 6, 0, 6.2832); ctx.fill();
  } else {
    D.gokyuzu(ctx, w, h, ufuk);
    D.tepeler(ctx, w, ufuk);
  }

  /* --- zemin --- */
  if (ay) {
    ctx.fillStyle = '#8A8A82'; ctx.fillRect(0, ufuk, w, h - ufuk);
    ctx.fillStyle = '#6E6E67';
    for (let i = 0; i < 5; i++) {
      ctx.beginPath();
      ctx.ellipse(18 + i * (w / 5), ufuk + 12, 13, 4.5, 0, 0, 6.2832);
      ctx.fill();
    }
  } else {
    D.cimZemin(ctx, w, h, ufuk);
  }

  /* --- kule --- */
  /* Konumlar panel genişliğinin oranı olarak verilir; tuval yeniden
     boyutlandığında (sunum modu, tam ekran) sahne dengesini korur. */
  const kg = Math.max(40, Math.min(58, w * 0.11));
  const kx = Math.round(w * 0.14);
  D.tuglaKule(ctx, kx, ust - 12, kg, ufuk, { mazgal: !ay, pencere: !ay, kapi: !ay });

  /* --- kuleden bırakan kişi --- */
  D.insan(ctx, kx + kg + 13, ust - 12, .85, ay ? '#D8DCE4' : '#3C3489', -0.35);

  /* --- düşen cisimler --- */
  const topX = Math.round(w * 0.46);
  const tuyX = Math.round(w * 0.64);

  const iz = ay ? 'rgba(220,225,235,.40)' : 'rgba(60,80,110,.40)';
  D.kesikliCizgi(ctx, topX, ust, topX, ufuk, iz, 1, [2, 6]);
  D.kesikliCizgi(ctx, tuyX, ust, tuyX, ufuk, iz, 1, [2, 6]);
  /* bırakma seviyesi — ikisinin de aynı yükseklikten başladığını gösterir */
  D.kesikliCizgi(ctx, kx + kg, ust, w - 40, ust, iz, 1, [5, 5]);

  const etRenk = ay ? '#E6E9EE' : R.mur;
  D.yaziAydinlik(ctx, 'metal top', topX, ust - 14, etRenk, '600 11px system-ui, sans-serif', 'center');
  D.yaziAydinlik(ctx, 'tüy',      tuyX, ust - 14, etRenk, '600 11px system-ui, sans-serif', 'center');

  const topY = ufuk - st.top.y * olcek;
  const tuyY = ufuk - st.tuy.y * olcek;

  /* metal top */
  D.top(ctx, topX, topY, 9, '#5F6B78', '#9AA5B1');
  /* tüy — basit bir tüy silueti */
  cizTuy(ctx, tuyX, tuyY, havaVar(p) ? Math.sin(st.t * 6) * 0.35 : 0);

  /* --- yükseklik cetveli --- */
  const cx = w - 34;
  ctx.strokeStyle = ay ? '#C9CDD4' : R.mur; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(cx, ust); ctx.lineTo(cx, ufuk); ctx.stroke();
  for (let i = 0; i <= 4; i++) {
    const yy = ufuk - (ufuk - ust) * i / 4;
    ctx.beginPath(); ctx.moveTo(cx, yy); ctx.lineTo(cx + 6, yy); ctx.stroke();
    D.yaziAydinlik(ctx, D.biçim(p.h0 * i / 4) + ' m', cx + 9, yy,
                   ay ? '#E6E9EE' : R.mur, '11px system-ui, sans-serif', 'left');
  }

  /* --- durum rozeti --- */
  const et = ay ? 'Ay · atmosfer yok'
                : (havaVar(p) ? 'Dünya · hava direnci VAR' : 'Dünya · havası alınmış ortam');
  D.rozet(ctx, et, 10, h - 30,
          ay ? 'rgba(255,255,255,.9)' : 'rgba(255,255,255,.88)', '#2C3850');

  /* --- iniş bilgisi ---
     Panelin sol üst köşesinde HTML "gerçekçi görünüm" etiketi duruyor.
     Bu yüzden sonuç rozeti üste ORTALANIR, köşeye değil. */
  if (st.top.indi && st.tuy.indi) {
    const fark = Math.abs(st.tuy.sure - st.top.sure);
    const ayni = fark < 0.02;
    D.rozet(ctx,
      ayni ? 'İkisi de aynı anda yere indi' : `Tüy ${D.biçim(fark)} s geç indi`,
      w / 2 + 40, 11,
      ayni ? 'rgba(53,192,138,.95)' : 'rgba(255,176,32,.95)',
      ayni ? '#04251A' : '#3A2A0C',
      '600 12px system-ui, sans-serif', true);
  }
}

/** Küçük tüy silueti; aci kadar sallanır (hava varsa). */
function cizTuy(ctx, x, y, aci) {
  ctx.save();
  ctx.translate(x, y); ctx.rotate(aci);
  ctx.fillStyle = '#E8EDF5';
  ctx.beginPath();
  ctx.ellipse(0, 0, 4.5, 11, 0, 0, 6.2832);
  ctx.fill();
  ctx.strokeStyle = '#A7B8D4'; ctx.lineWidth = 1.4;
  ctx.beginPath(); ctx.moveTo(0, -11); ctx.lineTo(0, 12); ctx.stroke();
  ctx.lineWidth = .9;
  for (let i = -8; i < 9; i += 4) {
    ctx.beginPath();
    ctx.moveTo(0, i); ctx.lineTo(-4, i + 3);
    ctx.moveTo(0, i); ctx.lineTo(4, i + 3);
    ctx.stroke();
  }
  ctx.restore();
}

/* --------------------------------------------- Klasik fizik görünümü */

function cizKlasik(ctx, w, h, st, p) {
  D.izgara(ctx, w, h, 28);

  const ox = 58, oy = h - 40, yUzun = h - 78;
  const olcek = yUzun / p.h0;

  D.eksen(ctx, {
    ox, oy, xUzun: w - ox - 24, yUzun,
    xEtiket: '', yEtiket: 'y', birimY: 'm',
    yBol: 4, yMax: p.h0, yYukari: true
  });
  D.taramaliZemin(ctx, ox, w - 20, oy, K.eksen);

  const topX = ox + 62, tuyX = ox + 150;

  /* Eşit zaman aralıklarında konum işaretleri — kitaptaki Görsel 1.4'ün aynısı.
     Noktalar aşağı indikçe seyrekleşir: hızın arttığını gözle gösterir.

     Sabit hızla inen tüyde noktalar eşit aralıklı ve çok sık olur; üst üste
     binip şeride dönüşmesinler diye birbirine 8 pikselden yakın olanlar atlanır. */
  strobeCiz(ctx, st.strobeTop, topX, oy, olcek, R.konum);
  strobeCiz(ctx, st.strobeTuy, tuyX, oy, olcek, K.beyaz);

  /* cisimler */
  const topY = oy - st.top.y * olcek;
  const tuyY = oy - st.tuy.y * olcek;

  D.noktaCisim(ctx, topX, topY, 9, R.konum);
  D.noktaCisim(ctx, tuyX, tuyY, 9, K.beyaz);

  D.yaziHaleli(ctx, 'metal top', topX, 22, R.konum, '600 12px system-ui, sans-serif', 'center');
  D.yaziHaleli(ctx, 'tüy', tuyX, 22, K.beyaz, '600 12px system-ui, sans-serif', 'center');

  /* hız vektörleri (ölçek: 1 m/s = 1.4 px, en fazla 80 px) */
  const okBoy = v => Math.min(80, 8 + v * 1.4);
  if (!st.top.indi) D.vektor(ctx, topX, topY + 11, topX, topY + 11 + okBoy(st.top.v),
                             R.hiz, 'ϑ = ' + D.biçim(st.top.v));
  if (!st.tuy.indi) D.vektor(ctx, tuyX, tuyY + 11, tuyX, tuyY + 11 + okBoy(st.tuy.v),
                             R.hiz, 'ϑ = ' + D.biçim(st.tuy.v));

  /* ivme vektörleri — HER CİSİM İÇİN AYRI: a = g − k·ϑ².
     Havasız ortamda ikisi de g’dir; havada tüyün ivmesi hızla sıfıra iner,
     top ise neredeyse g ile düşmeyi sürdürür. */
  const havali = havaVar(p);
  const ivmeTop = st.top.indi ? 0 : p.g - (havali ? k_TOP : 0) * st.top.v * st.top.v;
  const ivmeTuy = st.tuy.indi ? 0 : p.g - (havali ? k_TUY : 0) * st.tuy.v * st.tuy.v;
  const ivOk = a => Math.min(58, Math.max(0, a) * 4.4);
  [[w - 110, ivmeTop, 'top a'], [w - 42, ivmeTuy, 'tüy a']].forEach(([ix, a, ad]) => {
    if (ivOk(a) > 2) D.vektor(ctx, ix, 60, ix, 60 + ivOk(a), R.ivme, '');
    else D.noktaCisim(ctx, ix, 60, 3, R.ivme);
    D.yaziHaleli(ctx, ad, ix, 30, R.ivme, '600 10px system-ui, sans-serif', 'center');
    D.yaziHaleli(ctx, D.biçim(a) + ' m/s²', ix, 44, R.ivme,
                 '600 10px system-ui, sans-serif', 'center');
  });

  /* strobe açıklaması */
  D.yaziHaleli(ctx, `noktalar ${D.biçim(STROBE)} s aralıkla`, ox + 4, h - 16,
               K.metin2, '11px system-ui, sans-serif', 'left');
}

/** Strobe noktalarını çizer; çok sıkışanları atlayarak okunur tutar. */
function strobeCiz(ctx, dizi, x, oy, olcek, renk) {
  ctx.save();
  let sonY = -1e9;
  for (let i = 0; i < dizi.length; i++) {
    const y = oy - dizi[i] * olcek;
    if (Math.abs(y - sonY) < 8) continue;
    sonY = y;
    ctx.globalAlpha = 0.20 + 0.55 * (i / Math.max(1, dizi.length - 1));
    ctx.strokeStyle = renk; ctx.lineWidth = 1.6;
    ctx.beginPath(); ctx.arc(x, y, 3.4, 0, 6.2832); ctx.stroke();
  }
  ctx.restore();
}

/* ----------------------------------------------------------- Okumalar */

function okumalar(st, p) {
  const fark = (st.top.indi && st.tuy.indi) ? Math.abs(st.tuy.sure - st.top.sure) : null;
  return [
    { et: 'Geçen süre',      dg: D.biçim(st.t, 2),        birim: 's' },
    { et: 'Top ϑ',           dg: D.biçim(st.top.v),       birim: 'm/s' },
    { et: 'Tüy ϑ',           dg: D.biçim(st.tuy.v),       birim: 'm/s' },
    { et: 'Top yüksekliği',  dg: D.biçim(st.top.y),       birim: 'm' },
    { et: 'Tüy yüksekliği',  dg: D.biçim(st.tuy.y),       birim: 'm' },
    { et: 'İniş farkı',      dg: fark === null ? '—' : D.biçim(fark, 2), birim: fark === null ? '' : 's' }
  ];
}

/* ------------------------------------------------------------- Tanım */

D.simler = D.simler || {};
D.simler['serbest-dusen-cisimler'] = {
  id: 'serbest-dusen-cisimler',
  baslik: 'Metal top ve tüy birlikte düşüyor',
  yukseklik: 360,
  parametreler: [
    { anahtar: 'h0', etiket: 'Yükseklik', min: 10, max: 180, adim: 5, deger: 80, birim: 'm' },
    { anahtar: 'g', etiket: 'Ortam', tur: 'secim', deger: 10, secenekler: [
      { d: 10,  e: 'Dünya (g = 10 m/s²)' },
      { d: 1.6, e: 'Ay (g = 1,6 m/s²)' }
    ]},
    { anahtar: 'hava', etiket: 'Hava', tur: 'secim', deger: 1, secenekler: [
      { d: 1, e: 'Hava direnci var' },
      { d: 0, e: 'Havası alınmış' }
    ]}
  ],
  durum, adim, bitti, cizGercek, cizKlasik, okumalar
};

})();
