(function () {
"use strict";
window.F11 = window.F11 || {};

/* ==========================================================================
   sims/elektriksel-kuvvet.js
   --------------------------------------------------------------------------
   Konu 2.1 · Elektriksel kuvvet — Coulomb yasası

   Matematiksel model:
       F = k · |q₁·q₂| / d²        k = 9·10⁹ N·m²/C²

   İKİ DÜZENEK
   -----------
   1) Sabit uzaklık : Yükler yalıtkan ayaklara sabitlenmiştir. Öğrenci d’yi ve
      yükleri değiştirir, kuvvetin nasıl değiştiğini okur. Asıl gösterilen şey
      ETKİ-TEPKİ: iki yükün büyüklükleri farklı olsa bile kuvvetler EŞİTTİR.

   2) Serbest bırak : Sağdaki yük raylı arabaya bağlıdır ve serbesttir. Kuvvet
      sabit olmadığı için ivme de sabit değildir — d küçüldükçe kuvvet artar,
      ivme artar. Bu, 1. ünitedeki sabit ivmeli hareketten farklıdır ve
      öğrencinin en çok yanıldığı noktadır.

   BİRİMLER
   --------
   Kaydırıcılarda yük μC, uzaklık cm’dir (sınıfta kullanılan ölçek). Hesap
   daima SI ile yapılır; klasik panelde çevrim açıkça gösterilir.
   q μC ve d cm iken kullanışlı kısayol:  F = 90 · q₁q₂ / d²   (N)
   ========================================================================== */

const D = window.F11;
const { R, K } = D;

const KC = 9e9;             // N·m²/C²
const EN_YAKIN = 0.04;      // m — bu uzaklıkta deney durur (F → ∞ bölgesi)

/* ------------------------------------------------------------- Fizik */

function q1C(p) { return p.q1 * 1e-6; }
function q2C(p) { return p.q2 * 1e-6; }

/** Coulomb kuvvetinin BÜYÜKLÜĞÜ (N). */
function kuvvet(p, d) {
  const dd = Math.max(d, EN_YAKIN);
  return KC * Math.abs(q1C(p) * q2C(p)) / (dd * dd);
}

/** Çekme mi itme mi? Zıt işaretler çeker. */
function cekiyor(p) { return p.q1 * p.q2 < 0; }

/** q₂ üzerindeki kuvvetin işaretli yönü: +1 sağa (q₁’den uzağa), −1 sola. */
function yon(p) { return cekiyor(p) ? -1 : +1; }

function kutleKg(p) { return p.m / 1000; }

/* -------------------------------------------------------------- Durum */

function durum(p) {
  return { t: 0, x2: p.d / 100, v2: 0, durdu: false, kayit: [] };
}

function adim(st, dt, p) {
  st.t += dt;
  if (p.mod < 1.5) {
    /* Ölçüm düzeneği: oynatınca uzaklık taranır, F'nin uzaklığın KARESİYLE
       nasıl azaldığı canlı görünür. Kaydırıcı taramanın başladığı uzaklık. */
    const hedef = p.d < 120 ? 220 : 12;
    st.x2 = D.tarama(st.t, p.d, hedef, 12) / 100;
    st.v2 = 0;
    return;
  }

  if (st.durdu) return;

  /* Serbest yük: kuvvet uzaklığa bağlı olduğu için her adımda yeniden
     hesaplanır. Sabit ivmeli hareket DEĞİLDİR. */
  const F = kuvvet(p, st.x2);
  const a = (F / kutleKg(p)) * yon(p);
  st.v2 += a * dt;
  st.x2 += st.v2 * dt;

  if (st.x2 <= EN_YAKIN) { st.x2 = EN_YAKIN; st.durdu = true; }
  if (st.x2 > 2.4)       { st.x2 = 2.4;      st.durdu = true; }

  /* ϑ − t kaydı. Yük sıfırsa cisim hiç kıpırdamaz, 'durdu' hiç tetiklenmez ve
     kayıt sonsuza kadar birikir; sınıf bilgisayarını yormamak için sınırlı. */
  if (st.kayit.length === 0 || st.t - st.kayit[st.kayit.length - 1].t > 0.02)
    st.kayit.push({ t: st.t, v: Math.abs(st.v2) });
  if (st.kayit.length > 400) st.kayit.shift();
}

function bitti(st, p) { return p.mod > 1.5 && st.durdu; }

/* ------------------------------------------------- Ortak yerleşim */

/** Fiziksel x (m) → piksel dönüşümü; her iki panel de bunu kullanır. */
function olcekle(w, st, p) {
  const sag = Math.max(1.05, st.x2 + 0.25);
  const sol = -0.18;
  const pay = 58;
  const ol = (w - pay * 2) / (sag - sol);
  return { X: (x) => pay + (x - sol) * ol, ol };
}

/** Yük küresi: artı kırmızı, eksi mavi; yarıçap yük büyüklüğüyle artar. */
function yukKuresi(ctx, x, y, q, etiket, hiza = 'center', kaydir = 0) {
  const r = 11 + Math.min(Math.abs(q), 10) * 1.15;
  const arti = q > 0;
  const ana = arti ? '#E2483F' : '#2F6FD0';
  const isik = arti ? '#F3958E' : '#8FB6EC';

  ctx.save();
  const g = ctx.createRadialGradient(x - r * .3, y - r * .35, r * .2, x, y, r);
  g.addColorStop(0, isik); g.addColorStop(1, ana);
  ctx.fillStyle = g;
  ctx.beginPath(); ctx.arc(x, y, r, 0, 6.2832); ctx.fill();

  /* işaret */
  ctx.strokeStyle = '#FFFFFF'; ctx.lineWidth = 2.6; ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(x - r * .42, y); ctx.lineTo(x + r * .42, y);
  if (arti) { ctx.moveTo(x, y - r * .42); ctx.lineTo(x, y + r * .42); }
  ctx.stroke();
  ctx.restore();

  /* Yükler birbirine yaklaşınca iki etiket üst üste biner; bu yüzden
     etiketler DIŞA doğru hizalanır: soldaki sola, sağdaki sağa taşar. */
  if (etiket)
    D.yaziAydinlik(ctx, etiket, x + kaydir, y - r - 12, R.mur,
                   '700 12px system-ui, sans-serif', hiza);
  return r;
}

/* --------------------------------------------- Gerçekçi görünüm */

function cizGercek(ctx, w, h, st, p) {
  const { X } = olcekle(w, st, p);
  const tezgahY = h - 56;
  const merkezY = tezgahY - 54;

  /* laboratuvar tezgâhı */
  ctx.fillStyle = '#C9A06A'; ctx.fillRect(0, tezgahY, w, 12);
  ctx.fillStyle = '#A07B45'; ctx.fillRect(0, tezgahY + 12, w, h - tezgahY - 12);
  ctx.fillStyle = '#8A6838';
  for (let x = 12; x < w; x += 46) ctx.fillRect(x, tezgahY + 16, 26, 3);

  const x1 = X(0), x2 = X(st.x2);

  /* serbest düzenekte ray */
  if (p.mod > 1.5) {
    ctx.fillStyle = '#9AA5B1'; ctx.fillRect(x1, tezgahY - 4, w - x1 - 8, 4);
    ctx.fillStyle = '#7D8A99';
    for (let x = x1; x < w - 8; x += 18) ctx.fillRect(x, tezgahY - 4, 2, 4);
  }

  /* yalıtkan ayaklar */
  [[x1, true], [x2, p.mod < 1.5]].forEach(([x, sabit]) => {
    if (!sabit) return;
    ctx.fillStyle = '#6E7684';
    ctx.fillRect(x - 3, merkezY, 6, tezgahY - merkezY);
    ctx.fillStyle = '#4A5059';
    ctx.fillRect(x - 13, tezgahY - 7, 26, 7);
  });

  /* serbest yükün arabası */
  if (p.mod > 1.5) {
    ctx.fillStyle = '#5F6B78';
    D.yuvarlakDik(ctx, x2 - 16, tezgahY - 22, 32, 18, 4); ctx.fill();
    ctx.fillStyle = '#2E3D57';
    [-8, 8].forEach(dx => {
      ctx.beginPath(); ctx.arc(x2 + dx, tezgahY - 3, 4.5, 0, 6.2832); ctx.fill();
    });
    ctx.fillStyle = '#6E7684';
    ctx.fillRect(x2 - 2.5, merkezY, 5, tezgahY - 22 - merkezY);
  }

  const r1 = yukKuresi(ctx, x1, merkezY, p.q1, 'q₁ = ' + D.biçim(p.q1) + ' μC', 'right', -6);
  const r2 = yukKuresi(ctx, x2, merkezY, p.q2, 'q₂ = ' + D.biçim(p.q2) + ' μC', 'left', 6);

  /* uzaklık ölçüsü */
  D.olcu(ctx, x1, tezgahY - 30, x2, tezgahY - 30,
         'd = ' + D.biçim(st.x2 * 100) + ' cm', R.mur);

  /* kuvvet okları — Newton III: eşit büyüklük, zıt yön */
  const F = kuvvet(p, st.x2);
  if (Math.abs(p.q1) > 0 && Math.abs(p.q2) > 0) {
    const boy = Math.min(78, 22 + Math.sqrt(F) * 34);
    const y2 = yon(p);
    D.vektor(ctx, x1 + r1 * y2 * -1, merkezY, x1 - boy * y2, merkezY,
             R.kuvvet, '', { kalinlik: 3 });
    D.vektor(ctx, x2 + r2 * y2, merkezY, x2 + boy * y2, merkezY,
             R.kuvvet, '', { kalinlik: 3 });
    /* Yük etiketleri küre üstünde duruyor; F etiketi onlarla çakışmasın diye
       belirgin biçimde daha yukarı alındı. */
    D.yaziAydinlik(ctx, 'F = ' + D.biçim(F) + ' N', (x1 + x2) / 2, merkezY - 54,
                   R.kuvvet, '700 13px system-ui, sans-serif', 'center');
  }

  /* Rozet, panel köşesindeki "GERÇEKÇİ GÖRÜNÜM" etiketinin altına yerleşir. */
  D.rozet(ctx, cekiyor(p) ? 'ZIT YÜKLER · ÇEKME' : 'AYNI YÜKLER · İTME',
          w / 2, 52,
          cekiyor(p) ? 'rgba(47,111,208,.92)' : 'rgba(226,72,63,.92)', '#FFFFFF',
          '700 12px system-ui, sans-serif', true);

  if (st.durdu)
    D.yaziAydinlik(ctx, st.x2 <= EN_YAKIN + 1e-6 ? 'yükler çarpıştı' : 'raydan çıktı',
                   w - 12, h - 12, R.mur, '600 11px system-ui, sans-serif', 'right');
}

/* ----------------------------------------- Klasik fizik görünümü */

function cizKlasik(ctx, w, h, st, p) {
  D.izgara(ctx, w, h, 26);
  const { X } = olcekle(w, st, p);
  const ekseny = Math.round(h * 0.42);

  /* x ekseni */
  ctx.strokeStyle = K.eksen; ctx.lineWidth = 1.6;
  ctx.beginPath(); ctx.moveTo(24, ekseny); ctx.lineTo(w - 16, ekseny); ctx.stroke();
  D.yaziHaleli(ctx, 'x', w - 12, ekseny - 10, K.metin2, '11px system-ui, sans-serif', 'right');

  const x1 = X(0), x2 = X(st.x2);
  const F = kuvvet(p, st.x2);
  const y2 = yon(p);

  /* yükler nokta cisim olarak */
  D.noktaCisim(ctx, x1, ekseny, 7, p.q1 > 0 ? '#E2483F' : '#2F6FD0');
  D.noktaCisim(ctx, x2, ekseny, 7, p.q2 > 0 ? '#E2483F' : '#2F6FD0');
  D.yaziHaleli(ctx, 'q₁ ' + (p.q1 > 0 ? '+' : '−') + D.biçim(Math.abs(p.q1)) + ' μC',
               x1 - 6, ekseny + 22, K.beyaz, '600 11px system-ui, sans-serif', 'right');
  D.yaziHaleli(ctx, 'q₂ ' + (p.q2 > 0 ? '+' : '−') + D.biçim(Math.abs(p.q2)) + ' μC',
               x2 + 6, ekseny + 22, K.beyaz, '600 11px system-ui, sans-serif', 'left');

  /* d ölçüsü */
  /* Çekme durumunda kuvvet okları içe bakar ve etiketleri eksenin hemen
     üstünde kalır; ölçü çizgisi onların üstünden geçsin. */
  D.olcu(ctx, x1, ekseny - 52, x2, ekseny - 52,
         'd = ' + D.biçim(st.x2) + ' m', K.metin2);

  /* eşit ve zıt kuvvet vektörleri */
  const boy = Math.min(62, 20 + Math.sqrt(F) * 28);
  D.vektor(ctx, x1, ekseny, x1 - boy * y2, ekseny, R.kuvvet, 'F₂₁', { kalinlik: 2.6 });
  D.vektor(ctx, x2, ekseny, x2 + boy * y2, ekseny, R.kuvvet, 'F₁₂', { kalinlik: 2.6 });

  /* hesap dökümü */
  const dd = Math.max(st.x2, EN_YAKIN);
  const satir = [
    ['F = k · |q₁·q₂| / d²', K.beyaz, '700 12px system-ui, sans-serif'],
    ['k = 9·10⁹ N·m²/C²', K.metin2, '11px system-ui, sans-serif'],
    ['|q₁·q₂| = ' + D.biçim(Math.abs(p.q1 * p.q2)) + ' · 10⁻¹² C²', K.metin2, '11px system-ui, sans-serif'],
    ['d² = ' + D.biçim(dd * dd, 3) + ' m²', K.metin2, '11px system-ui, sans-serif'],
    ['F = ' + D.biçim(F) + ' N', R.kuvvet, '700 13px system-ui, sans-serif']
  ];
  let sy = h - 14 - (satir.length - 1) * 17;
  satir.forEach(([t, c, f]) => {
    D.yaziHaleli(ctx, t, w - 12, sy, c, f, 'right'); sy += 17;
  });

  /* Newton III vurgusu — sağdaki hesap dökümüyle aynı satıra düşmesin */
  D.yaziHaleli(ctx, '|F₁₂| = |F₂₁|  — yükler farklı olsa bile eşittir (Newton III)',
               12, ekseny + 46, R.normal, '600 11px system-ui, sans-serif', 'left');

  if (p.mod > 1.5) {
    const a = F / kutleKg(p);
    D.yaziHaleli(ctx, 'q₂ serbest:  a = F/m = ' + D.biçim(a) + ' m/s²  (SABİT DEĞİL)',
                 12, 20, R.ivme, '600 11px system-ui, sans-serif', 'left');
    D.yaziHaleli(ctx, 'ϑ = ' + D.biçim(Math.abs(st.v2)) + ' m/s',
                 12, 37, R.hiz, '600 11px system-ui, sans-serif', 'left');
  }
}

/* ------------------------------------------------------- Grafikler */

function cizGrafik(ctx, w, h, st, p) {
  const pay = 8, gw = (w - pay * 3) / 2, gh = h - 6;

  /* F − d eğrisi: ters kare yasası gözle görünür olsun */
  const veri = [];
  for (let d = 0.08; d <= 1.2; d += 0.02) veri.push({ t: d, v: kuvvet(p, d) });
  const Fmax = kuvvet(p, 0.1);

  D.miniGrafik(ctx, {
    x: pay, y: 3, w: gw, h: gh,
    baslik: 'F − d   (ters kare:  d 2 katına → F dörtte bire)', birim: 'N', tEtiket: 'd (m)',
    imlec: { t: st.x2, v: kuvvet(p, st.x2) },
    veri, tMax: 1.2, vMin: 0, vMax: Fmax * 1.05,
    renk: R.kuvvet
  });

  /* ikinci grafik düzeneğe göre değişir */
  if (p.mod > 1.5) {
    D.miniGrafik(ctx, {
      x: pay * 2 + gw, y: 3, w: gw, h: gh,
      baslik: 'ϑ − t   (serbest yük · eğim artıyor)', birim: 'm/s',
      veri: st.kayit, tMin: st.kayit.length ? st.kayit[0].t : 0,
      tMax: Math.max(1, st.t), vMin: 0,
      vMax: Math.max(1, Math.abs(st.v2) * 1.2),
      renk: R.hiz
    });
  } else {
    const v2 = [];
    for (let q = 0.5; q <= 10; q += 0.25)
      v2.push({ t: q, v: KC * Math.abs(q1C(p)) * (q * 1e-6) / Math.pow(Math.max(st.x2, EN_YAKIN), 2) });
    D.miniGrafik(ctx, {
      x: pay * 2 + gw, y: 3, w: gw, h: gh,
      baslik: 'F − q₂   (doğru orantı:  q 2 katına → F 2 katına)', birim: 'N', tEtiket: 'q₂ (μC)',
      veri: v2, tMax: 10, vMin: 0,
      vMax: Math.max(1e-6, v2[v2.length - 1].v * 1.05),
      renk: R.konum
    });
  }
}

/* ----------------------------------------------------------- Okumalar */

function okumalar(st, p) {
  const F = kuvvet(p, st.x2);
  const o = [
    { et: 'q₁',            dg: D.biçim(p.q1),          birim: 'μC' },
    { et: 'q₂',            dg: D.biçim(p.q2),          birim: 'μC' },
    { et: 'Uzaklık  d',    dg: D.biçim(st.x2 * 100),   birim: 'cm' },
    { et: 'Kuvvet  F',     dg: D.biçim(F),             birim: 'N' },
    { et: 'Tür',           dg: cekiyor(p) ? 'Çekme' : 'İtme', birim: '' }
  ];
  if (p.mod > 1.5) {
    o.push({ et: 'İvme  a', dg: D.biçim(F / kutleKg(p)), birim: 'm/s²' });
    o.push({ et: 'Hız  ϑ',  dg: D.biçim(Math.abs(st.v2)), birim: 'm/s' });
  }
  return o;
}

/* ------------------------------------------------------------- Tanım */

D.simler = D.simler || {};
D.simler['elektriksel-kuvvet'] = {
  id: 'elektriksel-kuvvet',
  baslik: '2.1.1 · Coulomb yasası · iki nokta yük',
  yukseklik: 330,
  grafikPanel: true,
  grafikYukseklik: 175,
  parametreler: [
    { anahtar: 'mod', etiket: 'Düzenek', tur: 'secim', deger: 1, secenekler: [
      { d: 1, e: 'Sabit uzaklık (ölçüm)' },
      { d: 2, e: 'q₂ serbest bırakılıyor' }
    ]},
    { anahtar: 'q1', etiket: 'Yük q₁', min: -10, max: 10, adim: 1, deger: 3,  birim: 'μC' },
    { anahtar: 'q2', etiket: 'Yük q₂', min: -10, max: 10, adim: 1, deger: -2, birim: 'μC' },
    { anahtar: 'd',  etiket: 'Uzaklık d', min: 10, max: 100, adim: 5, deger: 30, birim: 'cm' },
    { anahtar: 'm',  etiket: 'q₂ kütlesi', min: 10, max: 200, adim: 10, deger: 50, birim: 'g' }
  ],
  durum, adim, bitti, cizGercek, cizKlasik, cizGrafik, okumalar
};

})();
