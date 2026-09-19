(function () {
"use strict";
window.F11 = window.F11 || {};

/* ==========================================================================
   sims/alternatif-akim.js
   --------------------------------------------------------------------------
   Konu 2.3.3 · Alternatif akım  (MEB 11, s.253-262)

   Matematiksel model:
       V(t) = V_maks · sin(2π·f·t)
       i(t) = i_maks · sin(2π·f·t)

   ETKİN (RMS) DEĞER — KONUNUN KALBİ
   ---------------------------------
       V_etkin = V_maks / √2  ≈ 0,707 · V_maks
       i_etkin = i_maks / √2

   Prizdeki "220 V" bir ETKİN değerdir; tepe değeri 220·√2 ≈ 311 V’tur.
   Etkin değer keyfî bir tanım değildir: aynı direnci aynı sürede aynı kadar
   ısıtan doğru akımın değeridir. Bu yüzden ısı hesabında doğrudan kullanılır.

   Türkiye şebekesi: 220 V etkin, 50 Hz.
   ========================================================================== */

/* Şebeke 50 Hz'dir; periyodu 0,02 s. Gerçek zamanda ne ampulün sönüp yanışı
   ne de sinüsün ilerleyişi gözle görülebilir — üstelik "+0,5 s" düğmesi tam
   25 periyot demek olduğu için her basışta AYNI faza dönülüyordu ve sahne
   donmuş görünüyordu. Bu yüzden sahne zamanı yavaşlatılarak gösterilir:
   frekans, gerilim ve güç değerleri GERÇEK 50 Hz değerleridir, yalnızca
   akış ağır çekimdedir. */
const YAVASLATMA = 40;

/** Ekranda gösterilen (ağır çekim) sahne zamanı. */
function sahneT(st) { return st.t / YAVASLATMA; }

const D = window.F11;
const { R, K } = D;

/* ------------------------------------------------------------- Fizik */

function vTepe(p)  { return p.Vetkin * Math.SQRT2; }
function iTepe(p)  { return vTepe(p) / Math.max(1, p.R); }
function iEtkin(p) { return iTepe(p) / Math.SQRT2; }

/** Anlık gerilim (V). */
function vAn(st, p) {
  return vTepe(p) * Math.sin(2 * Math.PI * p.f * sahneT(st));
}
function iAn(st, p) { return vAn(st, p) / Math.max(1, p.R); }

/** Anlık güç (W) — hep pozitif, çünkü P = i²R. */
function gucAn(st, p) {
  const i = iAn(st, p);
  return i * i * p.R;
}

/** Ortalama güç (W) = etkin değerlerin çarpımı. */
function ortGuc(p) { return iEtkin(p) * p.Vetkin; }

/** Periyot (s). */
function periyot(p) { return 1 / p.f; }

/* -------------------------------------------------------------- Durum */

function durum(p) {
  return { t: 0, vKayit: [], gKayit: [] };
}

function adim(st, dt, p) {
  st.t += dt;
  const adimSure = Math.max(0.0005, periyot(p) / 120) * YAVASLATMA;
  if (st.vKayit.length === 0 || st.t - st.vKayit[st.vKayit.length - 1].t > adimSure) {
    st.vKayit.push({ t: st.t, v: vAn(st, p) });
    st.gKayit.push({ t: st.t, v: gucAn(st, p) });
  }
  const enFazla = 600;
  if (st.vKayit.length > enFazla) { st.vKayit.shift(); st.gKayit.shift(); }
}

function bitti() { return false; }

/* --------------------------------------------- Gerçekçi görünüm */

function cizGercek(ctx, w, h, st, p) {
  const v = vAn(st, p), i = iAn(st, p);

  /* priz */
  const px = w * 0.16, py = h * 0.30;
  ctx.fillStyle = '#E6E9EF';
  D.yuvarlakDik(ctx, px - 46, py - 46, 92, 92, 12); ctx.fill();
  ctx.fillStyle = '#23272E';
  [[-18, -8], [18, -8]].forEach(([dx, dy]) => {
    ctx.beginPath(); ctx.arc(px + dx, py + dy, 7, 0, 6.2832); ctx.fill();
  });
  ctx.fillStyle = '#9AA5B1';
  ctx.fillRect(px - 30, py + 26, 60, 6);
  D.yaziAydinlik(ctx, 'priz', px, py + 60, R.mur, '600 11px system-ui, sans-serif', 'center');

  /* anlık gerilim göstergesi — kutupları yön değiştiriyor */
  const arti = v >= 0;
  D.yaziAydinlik(ctx, arti ? '+' : '−', px - 18, py - 26,
                 arti ? '#E2483F' : '#2F6FD0', '700 18px system-ui, sans-serif', 'center');
  D.yaziAydinlik(ctx, arti ? '−' : '+', px + 18, py - 26,
                 arti ? '#2F6FD0' : '#E2483F', '700 18px system-ui, sans-serif', 'center');

  /* kablo ve ampul */
  ctx.strokeStyle = '#7D8A99'; ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(px + 46, py); ctx.lineTo(w * 0.52, py); ctx.lineTo(w * 0.52, h * 0.52);
  ctx.stroke();

  /* ampul — parlaklığı anlık güçle */
  const bx = w * 0.62, by = h * 0.46;
  const parlaklik = Math.min(1, gucAn(st, p) / Math.max(1, ortGuc(p) * 2));
  ctx.save();
  ctx.globalAlpha = 0.25 + parlaklik * 0.75;
  const g = ctx.createRadialGradient(bx, by, 4, bx, by, 46);
  g.addColorStop(0, '#FFE9A8'); g.addColorStop(1, 'rgba(255,210,74,0)');
  ctx.fillStyle = g;
  ctx.beginPath(); ctx.arc(bx, by, 46, 0, 6.2832); ctx.fill();
  ctx.restore();

  ctx.fillStyle = '#FFD24A';
  ctx.beginPath(); ctx.arc(bx, by, 24, 0, 6.2832); ctx.fill();
  ctx.fillStyle = '#9AA5B1';
  ctx.fillRect(bx - 10, by + 22, 20, 14);
  ctx.strokeStyle = '#7D8A99'; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(w * 0.52, h * 0.52); ctx.lineTo(bx, by + 36); ctx.stroke();

  /* değerler */
  D.yaziAydinlik(ctx, 'V_etkin = ' + D.biçim(p.Vetkin) + ' V', w - 10, 30, R.normal,
                 '700 13px system-ui, sans-serif', 'right');
  D.yaziAydinlik(ctx, 'V_maks = ' + D.biçim(vTepe(p)) + ' V', w - 10, 48, R.ivme,
                 '700 12px system-ui, sans-serif', 'right');
  D.yaziAydinlik(ctx, 'anlık V = ' + D.biçim(v) + ' V', w - 10, 66, R.mur,
                 '700 12px system-ui, sans-serif', 'right');
  D.yaziAydinlik(ctx, 'f = ' + D.biçim(p.f) + ' Hz · T = ' + D.biçim(periyot(p), 3) + ' s',
                 10, h - 12, R.mur, '600 11px system-ui, sans-serif', 'left');
  D.yaziAydinlik(ctx, 'ampul saniyede ' + D.biçim(2 * p.f) + ' kez sönüp yanıyor',
                 w - 10, h - 12, R.mur, '600 11px system-ui, sans-serif', 'right');
}

/* ----------------------------------------- Klasik fizik görünümü */

function cizKlasik(ctx, w, h, st, p) {
  D.izgara(ctx, w, h, 26);

  D.yaziHaleli(ctx, 'Etkin (RMS) değer', 12, 22, K.beyaz,
               '700 12px system-ui, sans-serif', 'left');

  /* sinüs ve etkin değer çizgisi */
  /* Sinüs şeması dar tutulur; sağ sütunun sığması için yer bırakmalı. */
  const gx = 40, gy = 52, gw = Math.min(170, w * 0.36), gh = h - gy - 62;
  const orta = gy + gh / 2;
  ctx.strokeStyle = K.eksen; ctx.lineWidth = 1.4;
  ctx.beginPath(); ctx.moveTo(gx, gy); ctx.lineTo(gx, gy + gh);
  ctx.moveTo(gx, orta); ctx.lineTo(gx + gw, orta); ctx.stroke();

  const tepe = vTepe(p);
  ctx.save(); ctx.strokeStyle = R.normal; ctx.lineWidth = 2.4;
  ctx.beginPath();
  for (let k = 0; k <= 80; k++) {
    const x = gx + (k / 80) * gw;
    const yy = orta - Math.sin((k / 80) * 4 * Math.PI) * (gh / 2 - 6);
    k ? ctx.lineTo(x, yy) : ctx.moveTo(x, yy);
  }
  ctx.stroke(); ctx.restore();

  /* etkin değer seviyesi */
  const eSeviye = (p.Vetkin / tepe) * (gh / 2 - 6);
  D.kesikliCizgi(ctx, gx, orta - eSeviye, gx + gw, orta - eSeviye, R.hiz, 1.6, [6, 4]);
  D.kesikliCizgi(ctx, gx, orta + eSeviye, gx + gw, orta + eSeviye, R.hiz, 1.6, [6, 4]);
  D.yaziHaleli(ctx, 'V_etkin', gx + gw + 4, orta - eSeviye, R.hiz,
               '600 10px system-ui, sans-serif', 'left');
  D.yaziHaleli(ctx, 'V_maks', gx + gw + 4, gy + 6, R.ivme,
               '600 10px system-ui, sans-serif', 'left');

  /* sağ sütun */
  const bx = gx + gw + 40;
  const satir = [
    ['V = V_maks·sin(2πft)', K.beyaz, '700 11px system-ui, sans-serif'],
    ['', K.metin2, '11px'],
    ['V_etkin = V_maks / √2', R.hiz, '700 11px system-ui, sans-serif'],
    ['= ' + D.biçim(vTepe(p)) + ' / 1,41', K.metin2, '11px system-ui, sans-serif'],
    ['= ' + D.biçim(p.Vetkin) + ' V', R.hiz, '700 12px system-ui, sans-serif'],
    ['', K.metin2, '11px'],
    ['i_maks = ' + D.biçim(iTepe(p), 2) + ' A', K.metin2, '11px system-ui, sans-serif'],
    ['i_etkin = ' + D.biçim(iEtkin(p), 2) + ' A', R.ivme, '700 12px system-ui, sans-serif'],
    ['', K.metin2, '11px'],
    ['P_ort = V_etkin·i_etkin', K.beyaz, '700 11px system-ui, sans-serif'],
    ['= ' + D.biçim(ortGuc(p)) + ' W', R.kuvvet, '700 13px system-ui, sans-serif']
  ];
  let sy = 46;
  satir.forEach(([t, c, f]) => {
    if (t) D.yaziHaleli(ctx, t, bx, sy, c, f, 'left');
    sy += 17;
  });

  D.yaziHaleli(ctx, 'Etkin değer: aynı direnci aynı kadar ısıtan DC değeri',
               12, h - 16, R.ivme, '600 11px system-ui, sans-serif', 'left');
}

/* ------------------------------------------------------- Grafikler */

function cizGrafik(ctx, w, h, st, p) {
  const pay = 8, gw = (w - pay * 3) / 2, gh = h - 6;
  const tepe = vTepe(p);
  const pencere = Math.max(0.02, periyot(p) * 3);
  const t0 = Math.max(0, sahneT(st) - pencere);

  /* Eğriler KAYITTAN değil, kapalı formdan çizilir.
     Motor 1/240 s'lik sabit adımla koşuyor; 50 Hz'in periyodu 20 ms olduğu
     için kayıt periyot başına ancak ~5 örnek tutabiliyordu ve sinüs zikzağa
     dönüyordu. V(t) ve P(t) analitik olduğundan pencere doğrudan taranır. */
  const ORNEK = 240;
  const vVeri = [], gVeri = [];
  for (let k = 0; k <= ORNEK; k++) {
    const t = t0 + (pencere * k) / ORNEK;
    const v = tepe * Math.sin(2 * Math.PI * p.f * t);
    const i = v / Math.max(1, p.R);
    vVeri.push({ t: t - t0, v });
    gVeri.push({ t: t - t0, v: i * i * p.R });
  }

  D.miniGrafik(ctx, {
    x: pay, y: 3, w: gw, h: gh,
    baslik: 'V − t   (sinüs · yön değiştiriyor)', birim: 'V',
    veri: vVeri, tMax: pencere, vMin: -tepe * 1.15, vMax: tepe * 1.15,
    renk: R.normal
  });

  D.miniGrafik(ctx, {
    x: pay * 2 + gw, y: 3, w: gw, h: gh,
    baslik: 'P − t   (güç HEP POZİTİF · frekansı 2 katı)', birim: 'W',
    veri: gVeri, tMax: pencere, vMin: 0, vMax: Math.max(1, ortGuc(p) * 2.2),
    renk: R.kuvvet
  });
}

/* ----------------------------------------------------------- Okumalar */

function okumalar(st, p) {
  return [
    { et: 'V etkin',     dg: D.biçim(p.Vetkin),        birim: 'V' },
    { et: 'V maks',      dg: D.biçim(vTepe(p)),        birim: 'V' },
    { et: 'Anlık V',     dg: D.biçim(vAn(st, p)),      birim: 'V' },
    { et: 'i etkin',     dg: D.biçim(iEtkin(p), 2),    birim: 'A' },
    { et: 'Frekans  f',  dg: D.biçim(p.f),             birim: 'Hz' },
    { et: 'Periyot  T',  dg: D.biçim(periyot(p), 3),   birim: 's' },
    { et: 'Ortalama güç',dg: D.biçim(ortGuc(p)),       birim: 'W' }
  ];
}

/* ------------------------------------------------------------- Tanım */

D.simler = D.simler || {};
D.simler['alternatif-akim'] = {
  id: 'alternatif-akim',
  baslik: '2.3.3 · Alternatif akım · etkin değer ve güç',
  yukseklik: 320,
  grafikPanel: true,
  grafikYukseklik: 175,
  parametreler: [
    { anahtar: 'Vetkin', etiket: 'Etkin gerilim', min: 12, max: 400, adim: 4, deger: 220, birim: 'V' },
    { anahtar: 'f',      etiket: 'Frekans f', min: 1, max: 100, adim: 1, deger: 50, birim: 'Hz' },
    { anahtar: 'R',      etiket: 'Direnç R', min: 5, max: 500, adim: 5, deger: 100, birim: 'Ω' }
  ],
  durum, adim, bitti, cizGercek, cizKlasik, cizGrafik, okumalar
};

})();
