(function () {
"use strict";
window.F11 = window.F11 || {};

/* ==========================================================================
   sims/kuresel-ayna.js
   --------------------------------------------------------------------------
   Konu 3.3 · Küresel aynaların özellikleri

   TEMEL BÜYÜKLÜKLER
   -----------------
       T : tepe noktası (ayna ile asal eksenin kesiştiği yer)
       M : eğrilik merkezi   (ayna hangi kürenin parçasıysa o kürenin merkezi)
       F : odak noktası
       R : eğrilik yarıçapı  (TM uzaklığı)
       f : odak uzaklığı     f = R/2

   ÇUKUR ayna:  M ve F aynanın ÖNÜNDE  → f > 0, odak GERÇEK
   TÜMSEK ayna: M ve F aynanın ARKASINDA → f < 0, odak SANAL

   ODAĞIN TÜRETİMİ (bu dosyada TAM formülle, yaklaşıklık kullanılmadan)
   --------------------------------------------------------------------
   Asal eksene paralel, eksenden u kadar uzaklıkta gelen bir ışın aynaya
   sin θ = u/R olacak şekilde çarpar. Yansıdıktan sonra ekseni tepe
   noktasından

       d(θ) = R − R/(2·cos θ)

   uzaklıkta keser. θ → 0 için d = R/2 = f bulunur. Yani "f = R/2"
   yalnızca eksene YAKIN (paraksiyel) ışınlar için geçerlidir.

   KÜRESEL SAPMA (aberasyon)
   -------------------------
       Δ = d(0) − d(θ) = (R/2)·(sec θ − 1)

   Açıklık büyüdükçe kenar ışınlar odaktan öne kayar; tek bir nokta yerine
   "kostik" denen bir eğri oluşur. Bu yüzden teleskoplarda küresel ayna
   değil PARABOLİK ayna kullanılır.

   ÖZEL IŞINLAR (mod 2 — ince ayna yaklaşıklığı ile çizilir)
   ---------------------------------------------------------
   1) Asal eksene paralel gelen ışın   → odaktan geçecek şekilde yansır
   2) Odaktan geçerek gelen ışın       → asal eksene paralel yansır
   3) Merkezden geçerek gelen ışın     → geldiği yoldan geri döner
   ========================================================================== */

const D = window.F11;
const { R, K } = D;

/* ------------------------------------------------------------- Fizik */

/** İşaretli odak uzaklığı (cm): çukurda +, tümsekte −. */
function odakUzakligi(p) {
  return (p.tur < 1.5 ? 1 : -1) * p.yaricap / 2;
}

/** İşaretli eğrilik yarıçapı (cm). */
function isaretliR(p) {
  return (p.tur < 1.5 ? 1 : -1) * p.yaricap;
}

/** Açıklık yarı açısı (radyan). */
function aciklikRad(p) { return (p.aciklik * Math.PI) / 180; }

/**
 * Eksene paralel gelen bir ışının, yansıdıktan sonra ekseni tepe noktasından
 * kaç cm uzakta kestiği. TAM formül — paraksiyel yaklaşıklık YOK.
 * Dönen değer daima aynanın ön/arka yönündeki uzaklığın BÜYÜKLÜĞÜ.
 */
function kesimUzakligi(Rcm, teta) {
  return Rcm - Rcm / (2 * Math.cos(teta));
}

/** Kenar ışınla paraksiyel odak arasındaki küresel sapma (cm). */
function kureselSapma(p) {
  const t = aciklikRad(p);
  return (p.yaricap / 2) * (1 / Math.cos(t) - 1);
}

/** Ayna denklemi: 1/f = 1/a + 1/b  ⟹  b = a·f/(a−f). */
function goruntuUzakligi(p) {
  const f = odakUzakligi(p), a = p.cisimUzaklik;
  const payda = a - f;
  if (Math.abs(payda) < 0.5) return null;      // cisim tam odakta
  return (a * f) / payda;
}

/** Büyütme oranı |b/a|. */
function buyutme(p) {
  const b = goruntuUzakligi(p);
  return b === null ? null : Math.abs(b / p.cisimUzaklik);
}

/* -------------------------------------------------------------- Durum */

/* Oynat'a basılınca düzeneğin anahtar büyüklüğü taranır; kaydırıcı taramanın
   BAŞLADIĞI değeri verir. Böylece her düzenekte bir şeyin nasıl değiştiği
   canlı görünür. */
const TARAMA_PERIYOT = 12;

function durum(p) { return { t: 0, yaricap: p.yaricap, cisimUzaklik: p.cisimUzaklik, aciklik: p.aciklik }; }

function hedefR(p)  { return p.yaricap < 70 ? 120 : 20; }
function hedefA(p)  { return p.cisimUzaklik < 85 ? 160 : 15; }
function hedefAc(p) { return p.aciklik < 25 ? 45 : 4; }

function adim(st, dt, p) {
  st.t += dt;
  if (p.mod < 1.5)      st.yaricap      = D.tarama(st.t, p.yaricap, hedefR(p), TARAMA_PERIYOT);
  else if (p.mod < 2.5) st.cisimUzaklik = D.tarama(st.t, p.cisimUzaklik, hedefA(p), TARAMA_PERIYOT);
  else                  st.aciklik      = D.tarama(st.t, p.aciklik, hedefAc(p), TARAMA_PERIYOT);
}

function bitti() { return false; }

function etkin(st, p) {
  return Object.assign({}, p, { yaricap: st.yaricap ?? p.yaricap, cisimUzaklik: st.cisimUzaklik ?? p.cisimUzaklik, aciklik: st.aciklik ?? p.aciklik });
}

/* ------------------------------------------------- Ortak yerleşim */

/**
 * Panel yerleşimi. Işık daima SOLDAN gelir.
 * Çukur aynada tepe sağda, M ve F solda; tümsekte tepe ortada, M ve F sağda.
 */
function yerlesim(w, h, p, pHam) {
  const cukur = p.tur < 1.5;
  const cy = h * 0.54;
  const ax = cukur ? w * 0.80 : w * 0.56;          // tepe noktası T
  const t = aciklikRad(p);
  const ham = pHam || p;

  /* Ölçek, TARAMA BOYUNCA SABİT tutulur: taranan büyüklüğün alacağı en
     büyük değere göre kurulur. Ölçek anlık değere göre kurulsaydı R taranırken
     F ve M ekranda hiç kıpırdamaz, yalnızca sayılar değişirdi. */
  const Rolcek = p.mod < 1.5 ? Math.max(ham.yaricap, hedefR(ham)) : p.yaricap;
  const aOlcek = Math.max(ham.cisimUzaklik, hedefA(ham));
  const tOlcek = p.mod > 2.5 ? (Math.max(ham.aciklik, hedefAc(ham)) * Math.PI) / 180 : t;
  const yatayCm = p.mod > 1.5 && p.mod < 2.5
    ? Math.max(p.yaricap * 1.10, aOlcek * 1.08)
    : Rolcek * 1.12;
  const dusey = Math.max(6, Rolcek * Math.sin(tOlcek));

  /* Çukurda M/F solda, tümsekte SAĞDA kalır. Her iki durumda da işaret
     etiketleri panel kenarında kesilmesin diye kullanılabilir genişlik
     o tarafa göre hesaplanır. */
  const kullanilabilir = cukur ? (ax - w * 0.07) : (w * 0.93 - ax);
  const olcek = Math.min(
    kullanilabilir / Math.max(1, yatayCm),
    (h * 0.36) / dusey,
    5.2
  );

  return { cukur, cy, ax, olcek, t };
}

/** Aynanın önündeki d (cm) uzaklığı için ekran x'i. d>0 ⟹ önde (solda). */
function xKonum(y, d) { return y.ax - d * y.olcek; }

/* --------------------------------------------- Gerçekçi görünüm */

function cizGercek(ctx, w, h, st, pHam) {
  const p = etkin(st, pHam);
  const y = yerlesim(w, h, p, pHam);

  /* asal eksen */
  D.kesikliCizgi(ctx, w * 0.03, y.cy, w * 0.97, y.cy, 'rgba(150,170,200,.55)', 1.4, [7, 5]);
  /* Etiket eksenin üstünde değil, panelin tepesinde durur — M işaretiyle çakışmasın. */
  D.yaziAydinlik(ctx, 'asal eksen', w * 0.97, 16, 'rgba(120,145,180,.95)',
                 '11px system-ui, sans-serif', 'right');

  /* Ayna gövdesi.
     Açıklık 14° gibi küçükken yay neredeyse düz çizilir (sagitta = R(1−cosθ)
     ≈ 0,03R) ve çukur ile tümsek gözle ayırt edilemez. Bu yüzden GÖVDE ders
     kitaplarındaki gibi cömert bir yayla çizilir; ışınlar ise gerçek açıklık
     içinde kalır. Gerçek açıklık ayrıca ayna üzerinde koyu renkle işaretlenir. */
  const Rpx = p.yaricap * y.olcek;
  const govdeAci = Math.max(y.t, 0.45);
  D.kureselAyna(ctx, y.ax, y.cy, Rpx, y.cukur ? 'cukur' : 'tumsek', govdeAci);

  /* ışınların kullandığı gerçek açıklık — aynanın üstünde vurgulu yay */
  if (y.t < govdeAci - 0.02) {
    const cx0 = y.cukur ? y.ax - Rpx : y.ax + Rpx;
    const bas = y.cukur ? -y.t : Math.PI - y.t;
    const son = y.cukur ?  y.t : Math.PI + y.t;
    ctx.save();
    ctx.strokeStyle = '#2E6FA8'; ctx.lineWidth = 5; ctx.globalAlpha = 0.9;
    ctx.beginPath(); ctx.arc(cx0, y.cy, Rpx, bas, son); ctx.stroke();
    ctx.restore();
  }

  /* T · F · M */
  const f = Math.abs(odakUzakligi(p));
  const fx = xKonum(y, odakUzakligi(p));
  const mx = xKonum(y, isaretliR(p));
  nokta(ctx, y.ax, y.cy, 'T', K.beyaz);
  nokta(ctx, fx, y.cy, 'F', R.ivme);
  nokta(ctx, mx, y.cy, 'M', R.kuvvet);

  if (p.mod < 1.5)      cizOdak(ctx, w, h, y, p);
  else if (p.mod < 2.5) cizOzelIsinlar(ctx, w, h, y, p);
  else                  cizSapma(ctx, w, h, y, p);

  /* f = R/2 ölçü çizgisi */
  olcuCizgisi(ctx, y.ax, fx, y.cy + h * 0.31, 'f = ' + D.biçim(f) + ' cm', R.ivme);
  olcuCizgisi(ctx, y.ax, mx, y.cy + h * 0.38,
              'R = ' + D.biçim(p.yaricap) + ' cm', R.kuvvet);
}

function nokta(ctx, x, yy, ad, renk) {
  ctx.save();
  ctx.fillStyle = renk;
  ctx.beginPath(); ctx.arc(x, yy, 4, 0, 6.2832); ctx.fill();
  ctx.restore();
  D.yaziAydinlik(ctx, ad, x, yy - 11, renk, '700 13px system-ui, sans-serif', 'center');
}

function olcuCizgisi(ctx, x1, x2, yy, etiket, renk) {
  ctx.save();
  ctx.strokeStyle = renk; ctx.lineWidth = 1.4; ctx.globalAlpha = 0.85;
  ctx.beginPath();
  ctx.moveTo(x1, yy - 5); ctx.lineTo(x1, yy + 5);
  ctx.moveTo(x2, yy - 5); ctx.lineTo(x2, yy + 5);
  ctx.moveTo(x1, yy);     ctx.lineTo(x2, yy);
  ctx.stroke();
  ctx.restore();
  D.yaziAydinlik(ctx, etiket, (x1 + x2) / 2, yy - 9, renk,
                 '700 11px system-ui, sans-serif', 'center');
}

/* ---- Mod 1 · Paralel ışınlar odakta toplanır ---- */

function cizOdak(ctx, w, h, y, p) {
  const Rpx = p.yaricap * y.olcek;
  const n = Math.max(2, Math.round(p.isinSayisi));
  const solKenar = w * 0.03;

  for (let k = 0; k < n; k++) {
    /* eksenin iki yanına simetrik dağıt, eksenin tam üstünü atla */
    const oran = n === 1 ? 0.5 : (k / (n - 1)) * 2 - 1;      // −1 … +1
    if (Math.abs(oran) < 0.08) continue;
    const teta = y.t * oran;
    const u = Rpx * Math.sin(teta);
    yansiyanIsin(ctx, y, p, Rpx, u, teta, solKenar, w);
  }
}

/**
 * Eksene paralel, eksenden u px uzaklıkta gelen ışını çarpma noktasına kadar
 * ve yansıdıktan sonraki yoluyla birlikte çizer.
 */
function yansiyanIsin(ctx, y, p, Rpx, u, teta, solKenar, w, renk) {
  const cos = Math.cos(teta);
  const cx = y.cukur ? y.ax - Rpx : y.ax + Rpx;      // eğrilik merkezi (px)
  const px = y.cukur ? cx + Rpx * cos : cx - Rpx * cos;
  const py = y.cy + u;
  const c = renk || R.ivme;

  /* gelen ışın */
  D.isin(ctx, solKenar, py, px, py, c, 2, true);

  /* eksen kesim noktası — TAM çözüm */
  const kx = y.cukur ? cx + Rpx / (2 * cos) : cx - Rpx / (2 * cos);

  if (y.cukur) {
    /* gerçek yol: çarpma noktasından kesim noktasına ve biraz ötesine */
    const dx = kx - px, dy = y.cy - py;
    const d = Math.hypot(dx, dy) || 1;
    const uzat = 1 + (Rpx * 0.30) / d;
    D.isin(ctx, px, py, px + dx * uzat, py + dy * uzat, c, 2, true);
  } else {
    /* tümsek: ışın ıraksar; uzantısı sanal odaktan geçer */
    const dx = px - kx, dy = py - y.cy;
    const d = Math.hypot(dx, dy) || 1;
    const uzat = (Rpx * 0.85) / d;
    D.isin(ctx, px, py, px + dx * uzat, py + dy * uzat, c, 2, true);
    D.sanalIsin(ctx, px, py, kx, y.cy, 'rgba(180,200,230,.75)');
  }
}

/* ---- Mod 2 · Üç özel ışın ---- */

function cizOzelIsinlar(ctx, w, h, y, p) {
  const f = odakUzakligi(p), a = p.cisimUzaklik;
  const b = goruntuUzakligi(p);
  const ox = xKonum(y, a);
  const boy = Math.min(h * 0.22, 64);
  const ty = y.cy - boy;
  const fx = xKonum(y, f);
  const mx = xKonum(y, isaretliR(p));
  const solKenar = w * 0.03;

  D.nesneOku(ctx, ox, y.cy, boy, R.hiz, 'cisim');

  /* ---- 1) eksene paralel gelir, odaktan geçer ---- */
  D.isin(ctx, ox, ty, y.ax, ty, R.ivme, 2, true);
  egikIsin(ctx, y.ax, ty, fx, y.cy, solKenar, R.ivme);

  /* ---- 2) odaktan geçerek gelir, eksene paralel yansır ---- */
  if (Math.abs(fx - ox) > 3) {
    const y2 = ty + (y.ax - ox) * (y.cy - ty) / (fx - ox);
    if (f > 0) {
      D.isin(ctx, ox, ty, y.ax, y2, R.hiz, 2, true);          // F'den geçerek
    } else {
      D.isin(ctx, ox, ty, y.ax, y2, R.hiz, 2, true);
      D.sanalIsin(ctx, y.ax, y2, fx, y.cy, 'rgba(180,200,230,.75)');
    }
    D.isin(ctx, y.ax, y2, solKenar, y2, R.hiz, 2, true);
  }

  /* ---- 3) merkezden geçerek gelir, geri döner ---- */
  if (Math.abs(mx - ox) > 3) {
    const y3 = ty + (y.ax - ox) * (y.cy - ty) / (mx - ox);
    D.isin(ctx, ox, ty, y.ax, y3, R.surtunme, 2, true);
    egikIsin(ctx, y.ax, y3, mx, y.cy, solKenar, R.surtunme);
  }

  /* ---- görüntü ---- */
  if (b !== null && Math.abs(b) > 420) {
    /* cisim odağa çok yakın: görüntü panele sığmayacak kadar uzakta */
    D.yaziAydinlik(ctx, 'Cisim odağa çok yakın — görüntü ' + D.biçim(Math.abs(b)) +
                   ' cm uzakta, panele sığmıyor', w * 0.5, h * 0.94, R.kuvvet,
                   '700 12px system-ui, sans-serif', 'center');
  } else if (b !== null) {
    const bx = xKonum(y, b);
    const gBoyGercek = -boy * (b / a);      // gerçek görüntü ters (aşağı)
    const sanal = b < 0;
    if (bx < w * 0.01 || bx > w * 0.99) {
      /* görüntü panelin dışına düşüyor: yerini ve yönünü söyle */
      D.yaziAydinlik(ctx, (sanal ? 'sanal görüntü ' : 'görüntü ') + D.biçim(Math.abs(b)) +
                     ' cm ' + (sanal ? 'aynanın arkasında' : 'önde') + ' — panelin dışında',
                     w * 0.5, h * 0.94, R.kuvvet, '700 12px system-ui, sans-serif', 'center');
    } else {
      /* çok büyük görüntü panel yüksekliğine kırpılır; gerçek boy yazılır */
      const sinir = y.cy - 8;
      const gBoy = Math.max(-sinir, Math.min(sinir, gBoyGercek));
      ctx.save();
      if (sanal) ctx.globalAlpha = 0.75;
      D.nesneOku(ctx, bx, y.cy, gBoy, sanal ? '#9FB8D8' : R.kuvvet,
                 sanal ? 'sanal görüntü' : 'görüntü');
      ctx.restore();
      if (gBoy !== gBoyGercek)
        D.yaziAydinlik(ctx, 'görüntü ' + D.biçim(buyutme(p), 2) + ' kat büyük — ok kırpıldı',
                       w * 0.5, h * 0.94, R.kuvvet, '700 12px system-ui, sans-serif', 'center');
    }
  } else {
    D.yaziAydinlik(ctx, 'Cisim tam odakta ⟹ görüntü oluşmaz',
                   w * 0.5, h * 0.92, R.kuvvet,
                   '700 12px system-ui, sans-serif', 'center');
  }
}

/** Aynadan çıkan yansımış ışın: fiziksel yol daima SOLA gider. */
function egikIsin(ctx, px, py, qx, qy, solKenar, renk) {
  const dx = qx - px;
  if (Math.abs(dx) < 1e-6) return;
  const m = (qy - py) / dx;
  D.isin(ctx, px, py, solKenar, py + m * (solKenar - px), renk, 2, true);
  if (qx > px) D.sanalIsin(ctx, px, py, qx, qy, 'rgba(180,200,230,.75)');
}

/* ---- Mod 3 · Küresel sapma ---- */

function cizSapma(ctx, w, h, y, p) {
  const Rpx = p.yaricap * y.olcek;
  const solKenar = w * 0.03;
  const n = 9;

  for (let k = 1; k <= n; k++) {
    const oran = k / n;
    const teta = y.t * oran;
    const u = Rpx * Math.sin(teta);
    /* kenara yaklaştıkça renk kırmızıya kayar */
    const c = oran > 0.72 ? R.kuvvet : (oran > 0.40 ? R.surtunme : R.ivme);
    yansiyanIsin(ctx, y, p, Rpx, +u, +teta, solKenar, w, c);
    yansiyanIsin(ctx, y, p, Rpx, -u, -teta, solKenar, w, c);
  }

  /* paraksiyel odak ile kenar odağı arasındaki fark */
  const kenarCm = kesimUzakligi(p.yaricap, y.t);
  const kx = xKonum(y, y.cukur ? kenarCm : -kenarCm);
  ctx.save();
  ctx.strokeStyle = R.kuvvet; ctx.lineWidth = 1.6; ctx.setLineDash([4, 4]);
  ctx.beginPath(); ctx.moveTo(kx, y.cy - h * 0.26); ctx.lineTo(kx, y.cy + h * 0.26);
  ctx.stroke(); ctx.restore();
  D.yaziAydinlik(ctx, 'kenar ışınların odağı', kx, y.cy - h * 0.28, R.kuvvet,
                 '700 11px system-ui, sans-serif', 'center');

  D.yaziAydinlik(ctx, 'Küresel sapma: ' + D.biçim(kureselSapma(p), 3) + ' cm',
                 w * 0.5, h * 0.95, R.kuvvet,
                 '700 12px system-ui, sans-serif', 'center');
}

/* ------------------------------------------ Klasik fizik görünümü */

function cizKlasik(ctx, w, h, st, pHam) {
  const p = etkin(st, pHam);
  D.izgara(ctx, w, h, 26);
  const cukur = p.tur < 1.5;
  const f = odakUzakligi(p);

  if (p.mod < 1.5) {
    D.yaziHaleli(ctx, cukur ? 'Çukur ayna · gerçek odak' : 'Tümsek ayna · sanal odak',
                 12, 22, K.beyaz, '700 12px system-ui, sans-serif', 'left');
    const satir = [
      ['R = ' + D.biçim(p.yaricap) + ' cm', R.kuvvet, '700 13px system-ui, sans-serif'],
      ['f = R/2 = ' + D.biçim(Math.abs(f)) + ' cm', R.ivme, '700 13px system-ui, sans-serif'],
      ['', K.metin2, '11px'],
      [cukur ? 'M ve F aynanın ÖNÜNDE' : 'M ve F aynanın ARKASINDA',
        K.beyaz, '700 12px system-ui, sans-serif'],
      [cukur ? 'Işınlar F’de gerçekten kesişir' : 'Işınlar ıraksar, uzantıları F’de kesişir',
        K.metin2, '11px system-ui, sans-serif'],
      ['', K.metin2, '11px'],
      ['Paralel ışın ⟹ odaktan geçer', K.metin2, '11px system-ui, sans-serif'],
      ['Bu yüzden F’ye "odak" denir', K.metin2, '11px system-ui, sans-serif'],
      ['', K.metin2, '11px'],
      ['f = R/2 yalnızca eksene YAKIN', R.surtunme, '700 11px system-ui, sans-serif'],
      ['ışınlar için tam doğrudur', R.surtunme, '700 11px system-ui, sans-serif']
    ];
    let sy = 46;
    satir.forEach(([t, c, fo]) => { if (t) D.yaziHaleli(ctx, t, w * 0.34, sy, c, fo, 'left'); sy += 17; });
    return;
  }

  if (p.mod < 2.5) {
    D.yaziHaleli(ctx, 'Üç özel ışın', 12, 22, K.beyaz,
                 '700 12px system-ui, sans-serif', 'left');

    /* küçük şema: paralel gelen ışın F’den (tümsekte F’nin uzantısından) */
    const ex = w * 0.05, ax = w * 0.30, cy = h * 0.52;
    ctx.strokeStyle = K.eksen; ctx.lineWidth = 1.4;
    ctx.beginPath(); ctx.moveTo(ex, cy); ctx.lineTo(w * 0.36, cy); ctx.stroke();
    ctx.strokeStyle = '#8FB6EC'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(ax, cy - 34); ctx.lineTo(ax, cy + 34); ctx.stroke();
    const fxk = cukur ? ax - (ax - ex) * 0.42 : ax + w * 0.05;
    D.isin(ctx, ex, cy - 26, ax, cy - 26, R.ivme, 1.6, false);
    const egim = 26 / (fxk - ax);                     // yansıyan doğrunun eğimi
    D.isin(ctx, ax, cy - 26, ex, cy - 26 + egim * (ex - ax), R.ivme, 1.6, false);
    if (!cukur) D.sanalIsin(ctx, ax, cy - 26, fxk, cy, 'rgba(180,200,230,.75)');
    ctx.fillStyle = R.ivme;
    ctx.beginPath(); ctx.arc(fxk, cy, 3, 0, 6.2832); ctx.fill();
    D.yaziHaleli(ctx, 'F', fxk, cy + 16, R.ivme, '700 11px system-ui, sans-serif', 'center');

    const b = goruntuUzakligi(p);
    const m = buyutme(p);
    const satir = [
      ['1 · Eksene paralel gelen', R.ivme, '700 12px system-ui, sans-serif'],
      ['     ⟹ odaktan geçer', K.metin2, '11px system-ui, sans-serif'],
      ['2 · Odaktan geçerek gelen', R.hiz, '700 12px system-ui, sans-serif'],
      ['     ⟹ eksene paralel yansır', K.metin2, '11px system-ui, sans-serif'],
      ['3 · Merkezden geçerek gelen', R.surtunme, '700 12px system-ui, sans-serif'],
      ['     ⟹ geldiği yoldan döner', K.metin2, '11px system-ui, sans-serif'],
      ['', K.metin2, '11px'],
      ['1/f = 1/a + 1/b', K.beyaz, '700 13px system-ui, sans-serif'],
      ['a = ' + D.biçim(p.cisimUzaklik) + '   f = ' + D.biçim(f) + '   b = ' +
        (b === null ? '∞' : D.biçim(b)) + ' cm', R.normal, '12px system-ui, sans-serif'],
      ['Büyütme = |b/a| = ' + (m === null ? '—' : D.biçim(m, 3)),
        R.hiz, '700 12px system-ui, sans-serif']
    ];
    let sy = 46;
    satir.forEach(([t, c, fo]) => { if (t) D.yaziHaleli(ctx, t, w * 0.40, sy, c, fo, 'left'); sy += 17; });
    D.yaziHaleli(ctx, 'Şema ince ayna yaklaşıklığıyla çizilir', 12, h - 12,
                 K.metin2, '11px system-ui, sans-serif', 'left');
    return;
  }

  /* mod 3 */
  D.yaziHaleli(ctx, 'Küresel sapma (aberasyon)', 12, 22, K.beyaz,
               '700 12px system-ui, sans-serif', 'left');
  const t = aciklikRad(p);
  const satir = [
    ['d(θ) = R − R/(2·cos θ)', K.beyaz, '700 13px system-ui, sans-serif'],
    ['θ → 0  ⟹  d = R/2 = f', R.ivme, '12px system-ui, sans-serif'],
    ['', K.metin2, '11px'],
    ['θ = ' + D.biçim(p.aciklik) + '°', K.metin2, '12px system-ui, sans-serif'],
    ['Kenar ışın odağı = ' + D.biçim(kesimUzakligi(p.yaricap, t), 3) + ' cm',
      R.kuvvet, '700 12px system-ui, sans-serif'],
    ['Paraksiyel odak  = ' + D.biçim(p.yaricap / 2) + ' cm',
      R.ivme, '700 12px system-ui, sans-serif'],
    ['', K.metin2, '11px'],
    ['Δ = (R/2)·(sec θ − 1)', K.beyaz, '700 12px system-ui, sans-serif'],
    ['Δ = ' + D.biçim(kureselSapma(p), 3) + ' cm', R.kuvvet, '700 13px system-ui, sans-serif'],
    ['', K.metin2, '11px'],
    ['Çözüm: PARABOLİK ayna', R.hiz, '700 12px system-ui, sans-serif'],
    ['Teleskop aynaları bu yüzden', K.metin2, '11px system-ui, sans-serif'],
    ['küresel değil paraboliktir', K.metin2, '11px system-ui, sans-serif']
  ];
  let sy = 46;
  satir.forEach(([tx, c, fo]) => { if (tx) D.yaziHaleli(ctx, tx, w * 0.34, sy, c, fo, 'left'); sy += 17; });
}

/* ------------------------------------------------------------ Okumalar */

function okumalar(st, pHam) {
  const p = etkin(st, pHam);
  const cukur = p.tur < 1.5;
  const f = odakUzakligi(p);

  if (p.mod < 1.5) {
    return [
      { et: 'Ayna türü',       dg: cukur ? 'Çukur' : 'Tümsek', birim: '' },
      { et: 'Eğrilik yarıçapı R', dg: D.biçim(p.yaricap),      birim: 'cm' },
      { et: 'Odak uzaklığı f = R/2', dg: D.biçim(Math.abs(f)), birim: 'cm' },
      { et: 'Odağın cinsi',    dg: cukur ? 'Gerçek' : 'Sanal',  birim: '' },
      { et: 'M ve F',          dg: cukur ? 'Aynanın önünde' : 'Aynanın arkasında', birim: '' }
    ];
  }

  if (p.mod < 2.5) {
    const b = goruntuUzakligi(p);
    const m = buyutme(p);
    if (b === null) {
      return [
        { et: 'Cisim uzaklığı a', dg: D.biçim(p.cisimUzaklik), birim: 'cm' },
        { et: 'Odak uzaklığı f',  dg: D.biçim(f),              birim: 'cm' },
        { et: 'Görüntü',          dg: 'Sonsuzda (oluşmaz)',    birim: '' }
      ];
    }
    return [
      { et: 'Cisim uzaklığı a',  dg: D.biçim(p.cisimUzaklik), birim: 'cm' },
      { et: 'Odak uzaklığı f',   dg: D.biçim(f),              birim: 'cm' },
      { et: 'Görüntü uzaklığı b',dg: D.biçim(b, 4),           birim: 'cm' },
      { et: 'Büyütme |b/a|',     dg: D.biçim(m, 3),           birim: '' },
      { et: 'Görüntü cinsi',     dg: b > 0 ? 'Gerçek · ters' : 'Sanal · düz', birim: '' },
      { et: 'Boy',               dg: m > 1.02 ? 'Büyük' : (m < 0.98 ? 'Küçük' : 'Eşit'), birim: '' }
    ];
  }

  const t = aciklikRad(p);
  return [
    { et: 'Açıklık yarı açısı θ', dg: D.biçim(p.aciklik),                 birim: '°' },
    { et: 'Paraksiyel odak R/2',  dg: D.biçim(p.yaricap / 2),             birim: 'cm' },
    { et: 'Kenar ışın odağı',     dg: D.biçim(kesimUzakligi(p.yaricap, t), 4), birim: 'cm' },
    { et: 'Küresel sapma Δ',      dg: D.biçim(kureselSapma(p), 4),        birim: 'cm' },
    { et: 'Sapma oranı',          dg: D.biçim(100 * kureselSapma(p) / (p.yaricap / 2), 3), birim: '%' }
  ];
}

/* ------------------------------------------------------------- Kayıt */

D.simler = D.simler || {};
D.simler['kuresel-ayna'] = {
  id: 'kuresel-ayna',
  baslik: '3.3 · Küresel ayna · odak, özel ışınlar, küresel sapma',
  yukseklik: 360,
  parametreler: [
    { anahtar: 'mod', etiket: 'Düzenek', tur: 'secim', deger: 1, secenekler: [
      { d: 1, e: 'Odak noktası' },
      { d: 2, e: 'Üç özel ışın' },
      { d: 3, e: 'Küresel sapma' }
    ]},
    { anahtar: 'tur', etiket: 'Ayna türü', tur: 'secim', deger: 1, secenekler: [
      { d: 1, e: 'Çukur (konkav)' },
      { d: 2, e: 'Tümsek (konveks)' }
    ]},
    { anahtar: 'yaricap',      etiket: 'Eğrilik yarıçapı R', min: 20, max: 120, adim: 5,  deger: 60, birim: 'cm' },
    { anahtar: 'aciklik',      etiket: 'Açıklık yarı açısı', min: 4,  max: 45,  adim: 1,  deger: 14, birim: '°' },
    { anahtar: 'isinSayisi',   etiket: 'Işın sayısı',        min: 2,  max: 8,   adim: 1,  deger: 6,  birim: '' },
    { anahtar: 'cisimUzaklik', etiket: 'Cisim uzaklığı a',   min: 10, max: 160, adim: 5,  deger: 90, birim: 'cm' }
  ],
  durum, adim, bitti, cizGercek, cizKlasik, okumalar
};

})();
