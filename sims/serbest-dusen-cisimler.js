(function () {
"use strict";
window.F11 = window.F11 || {};

/* ==========================================================================
   sims/serbest-dusen-cisimler.js
   --------------------------------------------------------------------------
   Konu 1.1.1 · Serbest düşen cisimler  (MEB 11, s.16-19)

   Kitabın anlatısı: Galileo’nun "havası alınmış ortamda yün yumağı ile
   kurşun aynı hızla düşer" hipotezi; 2 Ağustos 1971’de Ay yüzeyinde 0,03 kg
   şahin tüyü ile 1,32 kg jeolog çekicinin aynı anda bırakılması (Görsel 1.1);
   1. Etkinlik’te basketbol, bovling, futbol, tenis, golf topları ile cam
   bilyenin düşmesi; iki hava dalgıcı örneği.

   FİZİK MODELİ (aşağı yön +)
   --------------------------
   Havasız:   ϑ = g·t          düşülen yol = ½·g·t²
   Havalı:    a = g − k·ϑ²     k = ρ·C·A / (2m)   (hıza bağlı kare direnç)
   Bu denklemin durgun başlangıç için KAPALI çözümü kullanılır:
       ϑ_L = √(g/k)                          limit hız
       ϑ(t) = ϑ_L · tanh(g·t/ϑ_L)
       yol(t) = (ϑ_L²/g) · ln cosh(g·t/ϑ_L)
       iniş süresi: t = (ϑ_L/g) · arccosh(e^(g·h/ϑ_L²))
   Sayısal integrasyon YOK; ekrandaki her değer bu formüllerden gelir.

   Toplar (kütle, çap) gerçek değerlerdir; küre için C = 0,47, hava için
   ρ = 1,2 kg/m³ alınmıştır. Tüy için ϑ_L ≈ 3,3 m/s.
   ========================================================================== */

const D = window.F11;
const { R, K } = D;

const RHO = 1.2, CD = 0.47;
const STROBE = 0.5;               // s — eşit zaman aralıklı konum işaretleri

/** Küre için kare direnç katsayısı k = ρ·C·A/(2m). */
function kKure(m, cap) { return RHO * CD * Math.PI * cap * cap / 4 / (2 * m); }

/* 1. Etkinlik’teki toplar: kütle (kg), çap (m) */
const TOPLAR = [
  { ad: 'bovling',   m: 6.35,  cap: 0.218,  renk: '#2B3A67', isik: '#5C6FA8' },
  { ad: 'basketbol', m: 0.62,  cap: 0.239,  renk: '#D9661F', isik: '#F29A5A' },
  { ad: 'futbol',    m: 0.43,  cap: 0.22,   renk: '#E8E8E8', isik: '#FFFFFF' },
  { ad: 'tenis',     m: 0.058, cap: 0.067,  renk: '#B7D637', isik: '#E0F27A' },
  { ad: 'golf',      m: 0.046, cap: 0.0427, renk: '#F4F4F0', isik: '#FFFFFF' },
  { ad: 'cam bilye', m: 0.0054, cap: 0.016, renk: '#6FC3D9', isik: '#C8F0FA' }
];

/* ------------------------------------------------------------- Fizik */

function ay(p) { return p.g < 5; }
function havaVar(p) { return p.hava > 0.5 && !ay(p) && p.mod < 2.5; }

/** Düzeneğin cisimleri: ad, k (1/m), başlama anı. */
function cisimler(p) {
  if (p.mod > 2.5) {
    return [{ ad: '1. dalgıç', k: 0, bas: 0, renk: '#D9661F' },
            { ad: '2. dalgıç', k: 0, bas: p.ara, renk: '#2B6CB0' }];
  }
  const hava = havaVar(p);
  if (p.mod > 1.5) return TOPLAR.map(t => ({ ad: t.ad, k: hava ? kKure(t.m, t.cap) : 0, bas: 0, top: t, renk: t.renk }));
  return [{ ad: ay(p) ? 'çekiç (1,32 kg)' : 'metal top', k: hava ? 0.0016 : 0, bas: 0, renk: '#5F6B78' },
          { ad: ay(p) ? 'şahin tüyü (0,03 kg)' : 'tüy', k: hava ? 0.9 : 0, bas: 0, renk: '#8FA3C4', tuy: true }];
}

/** τ saniye düşen cismin hızı ve düşülen yolu (tam çözüm). */
function hal(c, g, tau) {
  if (tau <= 0) return { v: 0, s: 0 };
  if (c.k === 0) return { v: g * tau, s: 0.5 * g * tau * tau };
  const vL = Math.sqrt(g / c.k), u = g * tau / vL;
  /* ln cosh u = u + ln((1 + e^(−2u))/2) — büyük u’da taşmasın */
  return { v: vL * Math.tanh(u), s: (vL * vL / g) * (u + Math.log((1 + Math.exp(-2 * u)) / 2)) };
}

/** h yükseklikten iniş süresi (düşmeye başladıktan sonra). */
function inisSuresi(c, g, h) {
  if (c.k === 0) return Math.sqrt(2 * h / g);
  const vL = Math.sqrt(g / c.k), x = g * h / (vL * vL);
  /* arccosh(e^x) = x + ln(1 + √(1 − e^(−2x))) */
  return (vL / g) * (x + Math.log(1 + Math.sqrt(1 - Math.exp(-2 * x))));
}

/** t anında cismin durumu: yükseklik, hız, indi mi. */
function anlik(c, p, t) {
  const Ti = inisSuresi(c, p.g, p.h0);
  const tau = Math.min(Math.max(0, t - c.bas), Ti);
  const hl = hal(c, p.g, tau);
  const indi = t - c.bas >= Ti;
  return { y: Math.max(0, p.h0 - hl.s), v: indi ? hl.v : hl.v, indi, Ti, basladi: t >= c.bas, a: indi || t < c.bas ? 0 : p.g - c.k * hl.v * hl.v };
}

function sonAn(p) { return Math.max(...cisimler(p).map(c => c.bas + inisSuresi(c, p.g, p.h0))); }

/* -------------------------------------------------------------- Durum */

function durum() { return { t: 0 }; }
function adim(st, dt) { st.t += dt; }
function bitti(st, p) { return st.t >= sonAn(p); }

/* ------------------------------------------------- Gerçekçi görünüm */

function cizGercek(ctx, w, h, st, p) {
  const ayda = ay(p);
  const ufuk = h - 34, ust = 58;
  const olcek = (ufuk - ust) / p.h0;

  /* gökyüzü ve zemin */
  if (ayda) {
    ctx.fillStyle = '#0B1020'; ctx.fillRect(0, 0, w, ufuk);
    ctx.fillStyle = '#FFFFFF';
    for (let i = 0; i < 26; i++) {
      ctx.globalAlpha = .25 + ((i * 37) % 60) / 100;
      ctx.fillRect((i * 97) % w, (i * 53) % (ufuk - 20), 1.6, 1.6);
    }
    ctx.globalAlpha = 1;
    ctx.fillStyle = '#2E6FBF'; ctx.beginPath(); ctx.arc(w - 48, 30, 14, 0, 6.2832); ctx.fill();
    ctx.fillStyle = '#5FA05A'; ctx.beginPath(); ctx.arc(w - 52, 27, 5, 0, 6.2832); ctx.fill();
    ctx.fillStyle = '#8A8A82'; ctx.fillRect(0, ufuk, w, h - ufuk);
  } else {
    D.gokyuzu(ctx, w, h, ufuk);
    D.tepeler(ctx, w, ufuk);
    D.cimZemin(ctx, w, h, ufuk);
  }
  const yaziR = ayda ? '#E6E9EE' : R.mur;
  /* koyu Ay göğünde açık zemin yazısı (beyaz haleli) okunmuyor: koyu haleli yaz */
  const yaz = ayda ? (c, m, x, y, r, f, hz) => D.yaziHaleli(c, m, x, y, r, f, hz, 'rgba(11,16,32,.95)')
                   : D.yaziAydinlik;
  const iz = ayda ? 'rgba(220,225,235,.40)' : 'rgba(60,80,110,.40)';
  const cs = cisimler(p);
  const an = cs.map(c => anlik(c, p, st.t));

  if (p.mod > 2.5) {
    /* helikopter ve iki dalgıç */
    const hx = w * 0.30;
    helikopter(ctx, hx, ust - 22, st.t);
    const xs = [w * 0.30, w * 0.30];
    an.forEach((a, i) => {
      const y = ufuk - a.y * olcek;
      if (!a.basladi) return;
      dalgic(ctx, xs[i] + (i ? 16 : -16), y, cs[i].renk);
      D.yaziAydinlik(ctx, (i + 1) + '. · ' + D.biçim(a.v, 1) + ' m/s', xs[i] + (i ? 30 : -30), y + 4, cs[i].renk,
                     '700 11px system-ui, sans-serif', i ? 'left' : 'right');
    });
    if (an[1].basladi && !an[0].indi) {
      const y1 = ufuk - an[0].y * olcek, y2 = ufuk - an[1].y * olcek;
      D.olcu(ctx, w * 0.62, y2, w * 0.62, y1, 'aradaki mesafe ' + D.biçim(an[1].y - an[0].y, 1) + ' m', R.kuvvet);
    }
    D.rozet(ctx, 'Hava direnci ihmal · 2. dalgıç ' + D.biçim(p.ara) + ' s sonra atlıyor', 10, h - 30,
            'rgba(255,255,255,.9)', '#2C3850');
  } else {
    const kg = Math.max(40, Math.min(58, w * 0.11)), kx = Math.round(w * 0.10);
    D.tuglaKule(ctx, kx, ust - 12, kg, ufuk, { mazgal: !ayda, pencere: !ayda, kapi: !ayda });
    D.insan(ctx, kx + kg + 13, ust - 12, .85, ayda ? '#D8DCE4' : '#3C3489', -0.35);
    D.kesikliCizgi(ctx, kx + kg, ust, w - 40, ust, iz, 1, [5, 5]);
    const n = cs.length, x0 = w * (n > 2 ? 0.32 : 0.40), dx = n > 2 ? (w * 0.52) / (n - 1) : w * 0.30;
    cs.forEach((c, i) => {
      const x = x0 + dx * i, a = an[i], y = ufuk - a.y * olcek;
      D.kesikliCizgi(ctx, x, ust, x, ufuk, iz, 1, [2, 6]);
      if (c.tuy) cizTuy(ctx, x, y, havaVar(p) && !a.indi ? Math.sin(st.t * 6) * 0.35 : 0);
      else if (c.top) D.top(ctx, x, y - Math.max(4, c.top.cap * 40), Math.max(4, c.top.cap * 40), c.top.renk, c.top.isik);
      else if (ayda) cekic(ctx, x, y);
      else D.top(ctx, x, y - 9, 9, '#5F6B78', '#9AA5B1');
      yaz(ctx, c.ad, x, ust - 10, yaziR, (n > 2 ? '600 10px' : '600 11px') + ' system-ui, sans-serif', 'center');
      /* iniş süresi, yere değen cismin ÜSTÜNDE (alttaki rozetle çakışmasın) */
      if (a.indi) yaz(ctx, D.biçim(a.Ti, 2) + ' s', x, ufuk - 28, ayda ? '#fff' : '#1F3A1F',
                                 '700 11px system-ui, sans-serif', 'center');
    });
    const et = ayda ? 'Ay · atmosfer yok' : (havaVar(p) ? 'Dünya · hava direnci VAR' : 'Dünya · havası alınmış ortam');
    D.rozet(ctx, et + ' · g = ' + D.biçim(p.g, 2) + ' m/s²', 10, h - 30, 'rgba(255,255,255,.9)', '#2C3850');
  }

  /* yükseklik cetveli */
  const cx = w - 34;
  ctx.strokeStyle = yaziR; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(cx, ust); ctx.lineTo(cx, ufuk); ctx.stroke();
  for (let i = 0; i <= 4; i++) {
    const yy = ufuk - (ufuk - ust) * i / 4;
    ctx.beginPath(); ctx.moveTo(cx, yy); ctx.lineTo(cx + 6, yy); ctx.stroke();
    yaz(ctx, D.biçim(p.h0 * i / 4) + ' m', cx + 9, yy, yaziR, '11px system-ui, sans-serif', 'left');
  }

  /* sonuç rozeti — üstte ortada (sol üstte HTML etiketi var) */
  if (bitti(st, p) && p.mod < 2.5) {
    const T = an.map(a => a.Ti), fark = Math.max(...T) - Math.min(...T);
    const ayni = fark < 0.005;
    D.rozet(ctx, ayni ? 'Hepsi aynı anda yere indi' : 'İlk ve son iniş arası ' + D.biçim(fark, 2) + ' s',
            w / 2 + 40, 11, ayni ? 'rgba(53,192,138,.95)' : 'rgba(255,176,32,.95)', ayni ? '#04251A' : '#3A2A0C',
            '600 12px system-ui, sans-serif', true);
  }
}

function cizTuy(ctx, x, y, aci) {
  ctx.save();
  ctx.translate(x, y - 11); ctx.rotate(aci);
  ctx.fillStyle = '#E8EDF5';
  ctx.beginPath(); ctx.ellipse(0, 0, 4.5, 11, 0, 0, 6.2832); ctx.fill();
  ctx.strokeStyle = '#A7B8D4'; ctx.lineWidth = 1.4;
  ctx.beginPath(); ctx.moveTo(0, -11); ctx.lineTo(0, 12); ctx.stroke();
  ctx.lineWidth = .9;
  for (let i = -8; i < 9; i += 4) {
    ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(-4, i + 3); ctx.moveTo(0, i); ctx.lineTo(4, i + 3); ctx.stroke();
  }
  ctx.restore();
}

/** Jeolog çekici (Ay’da). */
function cekic(ctx, x, y) {
  ctx.save();
  ctx.fillStyle = '#8B6A43'; ctx.fillRect(x - 2, y - 26, 4, 22);
  ctx.fillStyle = '#9AA5B1'; ctx.fillRect(x - 9, y - 30, 18, 7);
  ctx.restore();
}

function helikopter(ctx, x, y, t) {
  ctx.save();
  ctx.fillStyle = '#3E4A5C';
  ctx.beginPath(); ctx.ellipse(x, y, 30, 12, 0, 0, 6.2832); ctx.fill();
  ctx.fillRect(x + 22, y - 3, 40, 5);
  ctx.fillStyle = '#9CC8E8'; ctx.beginPath(); ctx.ellipse(x - 14, y - 2, 11, 7, 0, 0, 6.2832); ctx.fill();
  ctx.strokeStyle = '#1F2633'; ctx.lineWidth = 2.5;
  const r = 44 * Math.abs(Math.cos(t * 25));
  ctx.beginPath(); ctx.moveTo(x - r, y - 16); ctx.lineTo(x + r, y - 16); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(x, y - 12); ctx.lineTo(x, y - 16); ctx.stroke();
  ctx.restore();
}

function dalgic(ctx, x, y, renk) {
  ctx.save();
  ctx.fillStyle = renk; ctx.strokeStyle = renk; ctx.lineWidth = 3; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.arc(x, y - 18, 4.5, 0, 6.2832); ctx.fill();
  ctx.beginPath(); ctx.moveTo(x, y - 13); ctx.lineTo(x, y - 2);
  ctx.moveTo(x - 9, y - 16); ctx.lineTo(x, y - 10); ctx.lineTo(x + 9, y - 16);
  ctx.moveTo(x, y - 2); ctx.lineTo(x - 6, y + 6); ctx.moveTo(x, y - 2); ctx.lineTo(x + 6, y + 6);
  ctx.stroke(); ctx.restore();
}

/* --------------------------------------------- Klasik fizik görünümü */

function cizKlasik(ctx, w, h, st, p) {
  D.izgara(ctx, w, h, 28);
  const cs = cisimler(p), an = cs.map(c => anlik(c, p, st.t));

  if (p.mod > 1.5 && p.mod < 2.5) {
    /* 1. Etkinlik tablosu */
    const kx = [12, w * 0.24, w * 0.40, w * 0.56, w * 0.76];
    D.yaziHaleli(ctx, '1. Etkinlik · ' + D.biçim(p.h0) + ' m’den bırakılan toplar', 12, 42, K.beyaz,
                 '700 12px system-ui, sans-serif', 'left');
    ['top', 'kütle', 'çap', 'limit hız', 'iniş süresi'].forEach((t, i) =>
      D.yaziHaleli(ctx, t, kx[i], 64, K.metin2, '700 11px system-ui, sans-serif', 'left'));
    TOPLAR.forEach((t, i) => {
      const c = cs[i], a = an[i], y = 84 + i * 20;
      const vL = c.k > 0 ? Math.sqrt(p.g / c.k) : Infinity;
      [t.ad, D.biçim(t.m < 0.1 ? t.m * 1000 : t.m, t.m < 0.1 ? 1 : 2) + (t.m < 0.1 ? ' g' : ' kg'), D.biçim(t.cap * 100, 1) + ' cm',
       isFinite(vL) ? D.biçim(vL, 1) + ' m/s' : '—', a.indi ? D.biçim(a.Ti, 3) + ' s' : '…']
        .forEach((s, j) => D.yaziHaleli(ctx, s, kx[j], y, j === 0 ? K.beyaz : j === 4 ? R.kuvvet : K.metin,
                                        (j === 0 || j === 4 ? '700 ' : '') + '12px system-ui, sans-serif', 'left'));
    });
    const T0 = Math.sqrt(2 * p.h0 / p.g);
    const alt = havaVar(p)
      ? ['Havasız ortamda hepsi ' + D.biçim(T0, 3) + ' s’de iner (t = √(2h/g)).',
         'Havada fark KÜTLEDEN değil, hava direncinden:',
         'k = ρ·C·A/(2m) küçük olan (ağır ve küçük) daha hızlı iner.']
      : ['Havası alınmış ortam: HEPSİNİN ivmesi g = ' + D.biçim(p.g, 2) + ' m/s²',
         'Hepsi ' + D.biçim(T0, 3) + ' s’de iner: t = √(2h/g) kütleye bağlı değil.'];
    alt.forEach((s, i) => D.yaziHaleli(ctx, s, 12, 220 + i * 18, i ? K.metin2 : R.hiz,
                                       (i ? '' : '700 ') + '12px system-ui, sans-serif', 'left'));
    return;
  }

  if (p.mod > 2.5) {
    const a1 = an[0], a2 = an[1];
    const satir = [
      ['İki hava dalgıcı (kitap örneği, s.19)', K.beyaz, '700 12px system-ui, sans-serif'],
      ['a) İvmeleri: ikisinde de g = ' + D.biçim(p.g, 2) + ' m/s² · EŞİT', R.ivme, '700 12px system-ui, sans-serif'],
      ['', K.metin2, '11px'],
      ['b) Hız farkı: ϑ₁ − ϑ₂ = g·Δt = ' + D.biçim(p.g * p.ara, 2) + ' m/s · SABİT', R.hiz, '700 12px system-ui, sans-serif'],
      ['   şimdi: ' + D.biçim(a1.v, 2) + ' − ' + D.biçim(a2.v, 2) + ' = ' + D.biçim(a1.v - a2.v, 2) + ' m/s', K.metin2, '11px system-ui, sans-serif'],
      ['', K.metin2, '11px'],
      ['c) Aradaki mesafe: g·Δt·(t − Δt/2) · ARTAR', R.kuvvet, '700 12px system-ui, sans-serif'],
      ['   şimdi: ' + D.biçim(Math.max(0, a2.y - a1.y), 2) + ' m', K.metin2, '11px system-ui, sans-serif'],
      ['', K.metin2, '11px'],
      ['Önde giden hep daha hızlıdır; aynı sürede daha', K.metin2, '11px system-ui, sans-serif'],
      ['çok yol alır, mesafe açılır.', K.metin2, '11px system-ui, sans-serif']
    ];
    let sy = 42;
    satir.forEach(([t, c, f]) => { if (t) D.yaziHaleli(ctx, t, 12, sy, c, f, 'left'); sy += 18; });
    return;
  }

  /* mod 1: eşit zaman aralıklı konumlar (strobe) */
  const ox = 58, oy = h - 40, yUzun = h - 88;
  const olcek = yUzun / p.h0;
  D.eksen(ctx, { ox, oy, xUzun: w - ox - 24, yUzun, xEtiket: '', yEtiket: 'y', birimY: 'm', yBol: 4, yMax: p.h0, yYukari: true });
  D.taramaliZemin(ctx, ox, w - 20, oy, K.eksen);
  const xs = [ox + 62, ox + 150], renk = [R.konum, K.beyaz];
  cs.forEach((c, i) => {
    /* noktalar: 0, 0,5, 1 … s anlarındaki konumlar — aşağı indikçe seyrekleşir */
    let sonY = -1e9;
    ctx.save();
    for (let k = 0; k * STROBE <= Math.min(st.t, an[i].Ti) + 1e-9; k++) {
      const y = oy - (p.h0 - hal(c, p.g, k * STROBE).s) * olcek;
      if (Math.abs(y - sonY) < 8) continue;
      sonY = y;
      ctx.strokeStyle = renk[i]; ctx.lineWidth = 1.6; ctx.globalAlpha = 0.6;
      ctx.beginPath(); ctx.arc(xs[i], y, 3.4, 0, 6.2832); ctx.stroke();
    }
    ctx.restore();
    const y = oy - an[i].y * olcek;
    D.noktaCisim(ctx, xs[i], y, 9, renk[i]);
    D.yaziHaleli(ctx, c.ad, xs[i], 40, renk[i], '600 12px system-ui, sans-serif', 'center');
    const okBoy = v => Math.min(80, 8 + v * 1.4);
    if (!an[i].indi) D.vektor(ctx, xs[i], y + 11, xs[i], y + 11 + okBoy(an[i].v), R.hiz, 'ϑ = ' + D.biçim(an[i].v));
  });
  /* ivme okları: a = g − k·ϑ² */
  const ivOk = a => Math.min(58, Math.max(0, a) * 4.4);
  [[w - 110, 0], [w - 42, 1]].forEach(([ix, i]) => {
    const a = an[i].a;
    if (ivOk(a) > 2) D.vektor(ctx, ix, 64, ix, 64 + ivOk(a), R.ivme, '');
    else D.noktaCisim(ctx, ix, 64, 3, R.ivme);
    D.yaziHaleli(ctx, (i ? 'tüy' : 'top') + ' a', ix, 36, R.ivme, '600 10px system-ui, sans-serif', 'center');
    D.yaziHaleli(ctx, D.biçim(a) + ' m/s²', ix, 50, R.ivme, '600 10px system-ui, sans-serif', 'center');
  });
  D.yaziHaleli(ctx, 'noktalar ' + D.biçim(STROBE) + ' s aralıkla · aşağı indikçe seyrekleşir: hız artıyor',
               ox + 4, h - 16, K.metin2, '11px system-ui, sans-serif', 'left');
}

/* ---------------------------------------------------- Grafik paneli */

function cizGrafik(ctx, w, h, st, p) {
  const pay = 8, gw = (w - pay * 3) / 2, gh = h - 6;
  const cs = cisimler(p), T = sonAn(p) * 1.02;
  const t = Math.min(st.t, sonAn(p));
  const vMax = Math.max(1, ...cs.map(c => hal(c, p.g, inisSuresi(c, p.g, p.h0)).v)) * 1.05;
  const seri = (c, f) => {
    const v = [];
    for (let i = 0; i <= 120; i++) {
      const tt = t * i / 120;
      if (tt < c.bas) continue;
      v.push({ t: tt, v: f(anlik(c, p, tt)) });
    }
    return v;
  };
  const imlec = (c, f) => { const a = anlik(c, p, t); return a.basladi ? { t, v: f(a) } : null; };
  cs.forEach((c, i) => {
    const renk = p.mod < 1.5 ? [R.hiz, '#8FA3C4'][i] : c.renk === '#E8E8E8' || c.renk === '#F4F4F0' ? '#9AA5B1' : c.renk;
    D.miniGrafik(ctx, { x: pay, y: 3, w: gw, h: gh, baslik: i ? '' : 'ϑ − t   (havasızda hepsi aynı doğru: eğim g)',
      birim: i ? '' : 'm/s', tEtiket: i ? '' : 't (s)', veri: seri(c, a => a.v), tMax: T, vMin: 0, vMax, renk,
      imlec: imlec(c, a => a.v) });
  });
  if (p.mod > 2.5) {
    const v = [];
    for (let i = 0; i <= 120; i++) {
      const tt = t * i / 120, a1 = anlik(cs[0], p, tt), a2 = anlik(cs[1], p, tt);
      v.push({ t: tt, v: (a2.basladi ? a2.y : p.h0) - a1.y });
    }
    const a1 = anlik(cs[0], p, t), a2 = anlik(cs[1], p, t);
    D.miniGrafik(ctx, { x: pay * 2 + gw, y: 3, w: gw, h: gh, baslik: 'Aradaki mesafe − t   (artıyor)', birim: 'm',
      tEtiket: 't (s)', veri: v, tMax: T, vMin: 0, vMax: p.h0, renk: R.kuvvet,
      imlec: { t, v: (a2.basladi ? a2.y : p.h0) - a1.y } });
    return;
  }
  cs.forEach((c, i) => {
    const renk = p.mod < 1.5 ? [R.konum, '#8FA3C4'][i] : c.renk === '#E8E8E8' || c.renk === '#F4F4F0' ? '#9AA5B1' : c.renk;
    D.miniGrafik(ctx, { x: pay * 2 + gw, y: 3, w: gw, h: gh, baslik: i ? '' : 'y − t   (yerden yükseklik)',
      birim: i ? '' : 'm', tEtiket: i ? '' : 't (s)', veri: seri(c, a => a.y), tMax: T, vMin: 0, vMax: p.h0, renk,
      imlec: imlec(c, a => a.y) });
  });
}

/* ----------------------------------------------------------- Okumalar */

function okumalar(st, p) {
  const cs = cisimler(p), an = cs.map(c => anlik(c, p, st.t));
  const tamam = { et: 'Geçen süre', dg: D.biçim(Math.min(st.t, sonAn(p)), 2), birim: 's' };
  if (p.mod > 1.5 && p.mod < 2.5) {
    const inenler = cs.map((c, i) => [c.ad, an[i]]).filter(([, a]) => a.indi).sort((a, b) => a[1].Ti - b[1].Ti);
    return [tamam,
      { et: 'Ortam', dg: ay(p) ? 'Ay' : havaVar(p) ? 'Dünya · havalı' : 'Dünya · havasız', birim: '' },
      { et: 'Havasız iniş süresi', dg: D.biçim(Math.sqrt(2 * p.h0 / p.g), 3), birim: 's' },
      { et: 'İnenler (sırayla)', dg: inenler.length ? inenler.map(x => x[0]).join(', ') : '—', birim: '' }];
  }
  return [tamam].concat(cs.flatMap((c, i) => [
    { et: c.ad + ' ϑ', dg: D.biçim(an[i].v, 2), birim: 'm/s' },
    { et: c.ad + ' yükseklik', dg: D.biçim(an[i].y, 2), birim: 'm' }
  ]));
}

/* ------------------------------------------------------------- Tanım */

D.simler = D.simler || {};
D.simler['serbest-dusen-cisimler'] = {
  id: 'serbest-dusen-cisimler',
  baslik: '1.1.1 · Serbest düşen cisimler · top ve tüy, farklı toplar, iki dalgıç',
  yukseklik: 360,
  grafikPanel: true,
  grafikYukseklik: 150,
  parametreler: [
    { anahtar: 'mod', etiket: 'Düzenek', tur: 'secim', deger: 1, secenekler: [
      { d: 1, e: 'Top ve tüy (Ay’da çekiç ve tüy)' },
      { d: 2, e: 'Farklı toplar (1. Etkinlik)' },
      { d: 3, e: 'İki hava dalgıcı (örnek)' }
    ]},
    { anahtar: 'h0', etiket: 'Yükseklik', min: 10, max: 180, adim: 5, deger: 80, birim: 'm' },
    { anahtar: 'g', etiket: 'Ortam', tur: 'secim', deger: 9.8, secenekler: [
      { d: 9.8,  e: 'Dünya (g = 9,8 m/s² · kitap)' },
      { d: 10,   e: 'Dünya (g = 10 m/s² · soru çözümü)' },
      { d: 1.62, e: 'Ay (g = 1,62 m/s²)' }
    ]},
    { anahtar: 'hava', etiket: 'Hava', tur: 'secim', deger: 1, secenekler: [
      { d: 1, e: 'Hava direnci var' },
      { d: 0, e: 'Havası alınmış' }
    ]},
    { anahtar: 'ara', etiket: 'Dalgıçlar arası süre Δt', min: 1, max: 4, adim: 0.5, deger: 2, birim: 's' }
  ],
  durum, adim, bitti, cizGercek, cizKlasik, cizGrafik, okumalar
};

})();
