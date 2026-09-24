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

   CİSİM SONSUZDA (kitap Tablo 3.3/3.4, ilk satır)
   ------------------------------------------------
   Işınlar paralel gelir; görüntü ODAK noktasında, nokta şeklindedir
   (çukurda gerçek, tümsekte uzantılarla — sanal).

   KİTAP ÖRNEĞİ (s.338-339, 9. Alıştırma)
   --------------------------------------
   Eğrilik yarıçapı 4 m (f = 2 m) olan çukur ayna, 180 cm boyundaki Toprak
   6, 4, 3, 2 ve 1 m’deyken: görüntü 3 m / 4 m / 6 m / oluşmaz / −2 m;
   boyu 90 / 180 / 360 / — / 360 cm.

   Bu dosyadaki tüm sayılar kapalı formülden gelir; sayısal integrasyon yok,
   ekrandaki değerler elle yapılan hesapla birebir aynıdır.
   ========================================================================== */

const D = window.F11;
const { R, K } = D;

const TUR_SURESI = 20;          // otomatik tur (mod 2) uzunluğu, s

/* Kitap örneği (mod 4): Toprak aynaya adım adım yaklaşır. */
const KITAP_A = [600, 400, 300, 200, 100];     // cm
const KITAP_ADIM = 3.5;                         // s — her konumda bekleme
/* Sonsuz düzeneği (mod 3): sahnede ışınlar paralel; grafiklerde cisim 2f’den
   20f’ye uzaklaşıp geri gelir — a büyüdükçe b’nin f’ye, büyütmenin 0’a
   yaklaştığı imleçlerle görülür. */
const SONSUZ_PERIYOT = 16;                      // s
function sonsuzA(st, p) { return D.tarama(st.t || 0, 2 * p.f, 20 * p.f, SONSUZ_PERIYOT); }
const ISIK_HIZI_PX = 150;                       // sahnedeki ışık atmalarının hızı, px/s

/** Mod 4’te parametreler kitaptaki değerlerle değiştirilir. */
function P(p) { return p.mod > 3.5 ? Object.assign({}, p, { f: 200, cisimBoyu: 180, tur: 1 }) : p; }
function kitapIdx(st) { return Math.min(KITAP_A.length - 1, Math.floor((st.t || 0) / KITAP_ADIM)); }

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
  if (p.mod > 3.5) return KITAP_A[kitapIdx(st)];
  if (p.mod > 2.5) return sonsuzA(st, p);          // sonsuz: grafikteki yaklaşım
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
function bitti(st, p) {
  if (p.mod > 3.5) return st.t >= KITAP_A.length * KITAP_ADIM;
  if (p.mod > 2.5) return false;
  return p.mod > 1.5 && st.t >= TUR_SURESI;
}

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
  const sonsuz = p.mod > 2.5 && p.mod < 3.5;
  if (sonsuz) {
    const sol = cukur ? p.f * 2.6 : p.f * 1.4, sag = cukur ? p.f * 0.5 : p.f * 1.6;
    const sk = w * 0.06, gk = w * 0.96;
    return { cukur, cy, ax: sk + (gk - sk) * sol / (sol + sag), olcek: Math.min((gk - sk) / (sol + sag), 6.5),
             f, a, b, boyPx: 0 };
  }
  const solKenar = w * 0.06, sagKenar = w * 0.96;
  const ax = solKenar + (sagKenar - solKenar) * solCm / (solCm + sagCm);
  const olcek = Math.min((sagKenar - solKenar) / (solCm + sagCm), 6.5);

  const boyPx = Math.min(h * 0.24, p.cisimBoyu * olcek * 2.2, 66);
  return { cukur, cy, ax, olcek, f, a, b, boyPx };
}

function xKonum(y, d) { return y.ax - d * y.olcek; }

/* --------------------------------------------- Gerçekçi görünüm */

function cizGercek(ctx, w, h, st, pHam) {
  const p = P(pHam);
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

  if (p.mod > 2.5 && p.mod < 3.5) { cizSonsuz(ctx, w, h, st, y, p); return; }

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
  /* 4) tepe noktasına (T) gelen ışın: asal eksenle eşit açı yaparak yansır */
  if (y.ax - ox > 4) {
    D.isin(ctx, ox, ty, y.ax, y.cy, R.hiz, 1.6, true);
    D.isin(ctx, y.ax, y.cy, solKenar, y.cy + (y.cy - ty) * (y.ax - solKenar) / (y.ax - ox), R.hiz, 1.6, true);
  }

  if (atlanan)
    D.yaziAydinlik(ctx, atlanan + ' ışın panele sığmadığı için çizilmedi',
                   w - 10, 36, R.surtunme,
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
       (kesikli) orada kesişir: 1. ışının ve tepe ışınının uzantıları. */
    if (sanal) {
      const tepeY = y.cy - gBoyTam;                 // ok ucu: taban − boy
      D.sanalIsin(ctx, y.ax, ty, bx, tepeY, 'rgba(150,175,210,.85)');
      D.sanalIsin(ctx, y.ax, y.cy, bx, tepeY, 'rgba(150,175,210,.85)');
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

  if (p.mod > 3.5) {
    D.yaziAydinlik(ctx, 'Kitap örneği: Toprak (180 cm) · r = 4 m · ' + (kitapIdx(st) + 1) + '/5', w - 10, 18,
                   R.surtunme, '600 11px system-ui, sans-serif', 'right');
  } else if (p.mod > 1.5) {
    const kalan = Math.max(0, TUR_SURESI - st.t);
    D.yaziAydinlik(ctx, 'otomatik tur · ' + D.biçim(kalan) + ' s', w - 10, 18,
                   R.surtunme, '600 11px system-ui, sans-serif', 'right');
  }
}

/** Cisim sonsuzda: paralel ışınlar; görüntü odakta NOKTA.
    Yansıma çizilen küresel yüzeyde TAM hesaplanır (n normal, r = d − 2(d·n)n).
    Işınlar eksene yakın tutulur (yükseklik ≤ 0,2·R): eksene yakın ışınlar F’de
    toplanır. Oynatınca ışık atmaları gelen ve yansıyan yol boyunca akar. */
function cizSonsuz(ctx, w, h, st, y, p) {
  const solKenar = w * 0.03, fx = xKonum(y, y.f);
  const Rpx = Math.abs(2 * y.f) * y.olcek;
  const cx = y.cukur ? y.ax - Rpx : y.ax + Rpx;              // eğrilik merkezi (M)
  const hMax = 0.2 * Rpx;
  const t = st.t || 0;
  const yollar = [];

  for (let k = -3; k <= 3; k++) {
    if (k === 0) continue;
    const dy = hMax * k / 3, yy = y.cy + dy;
    const kok = Math.sqrt(Rpx * Rpx - dy * dy);
    const px = y.cukur ? cx + kok : cx - kok;                  // çarpma noktası yüzeyde
    const nx = (px - cx) / Rpx, ny = dy / Rpx;
    const rx = 1 - 2 * nx * nx, ry = -2 * nx * ny;             // yansıyan doğrultu
    /* yansıyan ışın panel kenarına kadar */
    let s = Infinity;
    if (rx < 0) s = Math.min(s, (solKenar - px) / rx);
    if (ry > 0) s = Math.min(s, (h - 2 - yy) / ry);
    if (ry < 0) s = Math.min(s, (2 - yy) / ry);
    const qx = px + rx * s, qy = yy + ry * s;
    D.isin(ctx, solKenar, yy, px, yy, R.ivme, 1.8, true);
    D.isin(ctx, px, yy, qx, qy, R.kuvvet, 2, true);
    if (!y.cukur) {
      /* tümsek: yansıyanların geri uzantıları eksende (F’de) kesişir */
      const sg = (y.cy - yy) / -ry;
      D.sanalIsin(ctx, px, yy, px - rx * sg, y.cy, 'rgba(150,175,210,.8)');
    }
    yollar.push({ x0: solKenar, y0: yy, px, py: yy, qx, qy, L1: px - solKenar, L2: s });
  }

  /* ışık atmaları: her ışın boyunca eşit aralıklı, aynı hızda akan noktalar */
  const ara = 70;
  ctx.save();
  yollar.forEach(yl => {
    const top = yl.L1 + yl.L2;
    for (let d = (t * ISIK_HIZI_PX) % ara; d < top; d += ara) {
      let x, yy2;
      if (d < yl.L1) { x = yl.x0 + d; yy2 = yl.y0; }
      else { const u = (d - yl.L1) / yl.L2; x = yl.px + (yl.qx - yl.px) * u; yy2 = yl.py + (yl.qy - yl.py) * u; }
      ctx.fillStyle = d < yl.L1 ? '#FFB020' : '#FF5A4E';
      ctx.beginPath(); ctx.arc(x, yy2, 3.2, 0, 6.2832); ctx.fill();
    }
  });
  ctx.restore();

  /* odak noktası: çukurda ışık gerçekten burada toplanır — parlar */
  ctx.save();
  if (y.cukur) {
    const par = 0.75 + 0.25 * Math.sin(t * 6);
    const g = ctx.createRadialGradient(fx, y.cy, 0, fx, y.cy, 18);
    g.addColorStop(0, 'rgba(255,220,120,' + (0.9 * par) + ')');
    g.addColorStop(1, 'rgba(255,120,60,0)');
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(fx, y.cy, 18, 0, 6.2832); ctx.fill();
  }
  ctx.fillStyle = y.cukur ? R.kuvvet : '#8FA8C8';
  ctx.beginPath(); ctx.arc(fx, y.cy, 5, 0, 6.2832); ctx.fill();
  ctx.restore();

  const gy = y.cy + hMax + 34;
  D.kesikliCizgi(ctx, fx, y.cy + 8, fx, gy, y.cukur ? R.kuvvet : '#5F7FA8', 1.2, [3, 3]);
  D.rozet(ctx, 'görüntü: F’de NOKTA · ' + (y.cukur ? 'gerçek' : 'sanal'), fx, gy, y.cukur ? R.kuvvet : '#5F7FA8', '#fff',
          '700 12px system-ui, sans-serif', true);
  D.yaziAydinlik(ctx, 'Cisim sonsuzda (ör. Güneş) ⟹ ışınlar paralel gelir', 10, 44, R.surtunme,
                 '700 12px system-ui, sans-serif', 'left');
  D.yaziAydinlik(ctx, y.cukur ? 'güneş ocağı bu yüzden çukur aynadır: ışık F’de toplanır'
                              : 'tümsek aynada ışınlar ıraksar; uzantıları F’de kesişir',
                 w / 2, h - 10, R.mur, '600 11px system-ui, sans-serif', 'center');
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

function cizKlasik(ctx, w, h, st, pHam) {
  const p = P(pHam);
  D.izgara(ctx, w, h, 26);
  const f = odak(p);
  const a = cisimA(st, p);
  const o = goruntuOzellik(a, f);

  if (p.mod > 2.5 && p.mod < 3.5) {
    const ga = cisimA(st, p), gb = goruntuB(ga, f);
    D.yaziHaleli(ctx, 'Cisim sonsuzda · ' + (f > 0 ? 'çukur' : 'tümsek') + ' ayna', 12, 44, K.beyaz, '700 12px system-ui, sans-serif', 'left');
    const satir = [
      ['1/f = 1/a + 1/b', K.beyaz, '700 14px system-ui, sans-serif'],
      ['a → ∞ ⟹ 1/a → 0 ⟹ b = f', R.ivme, '700 13px system-ui, sans-serif'],
      ['', K.metin2, '11px'],
      ['Görüntünün yeri: odak noktası', K.metin2, '12px system-ui, sans-serif'],
      ['Özelliği: nokta şeklinde, ' + (f > 0 ? 'gerçek' : 'sanal'), R.kuvvet, '700 12px system-ui, sans-serif'],
      ['', K.metin2, '11px'],
      ['Kitap Tablo 3.3 ve 3.4 — ilk satır', K.metin2, '11px system-ui, sans-serif'],
      ['', K.metin2, '11px'],
      ['Grafikte cisim uzaklaşıyor:', K.beyaz, '700 12px system-ui, sans-serif'],
      ['a = ' + D.biçim(ga, 0) + ' cm  ⟹  b = ' + D.biçim(gb, 1) + ' cm', R.hiz, '700 13px system-ui, sans-serif'],
      ['b − f = ' + D.biçim(gb - f, 2) + ' cm  (a büyüdükçe → 0)', R.kuvvet, '700 12px system-ui, sans-serif'],
      ['büyütme = ' + D.biçim(Math.abs(gb / ga), 3) + '  (→ 0: görüntü NOKTA)', R.normal, '700 12px system-ui, sans-serif']
    ];
    let sy = 68;
    satir.forEach(([t, c, fo]) => { if (t) D.yaziHaleli(ctx, t, 16, sy, c, fo, 'left'); sy += 18; });
    return;
  }
  if (p.mod > 3.5) {
    D.yaziHaleli(ctx, 'Kitap 9. Alıştırma · a) ÇUKUR ayna, f = 2 m · boy 180 cm', 12, 22, K.beyaz, '700 12px system-ui, sans-serif', 'left');
    const kx = [12, w * 0.20, w * 0.40, w * 0.60, w * 0.80];
    ['a (m)', 'b (m)', 'boy (cm)', 'gerçek/sanal', 'düz/ters'].forEach((t, i) =>
      D.yaziHaleli(ctx, t, kx[i], 48, K.metin2, '700 11px system-ui, sans-serif', 'left'));
    const idx = kitapIdx(st);
    /* a) çukur (f = +200 cm) ve b) aynı f’li tümsek (f = −200 cm) — iki tablo */
    const tablo = (ff, y0) => {
      KITAP_A.forEach((aa, i) => {
        const yy = y0 + i * 20;
        const oo = goruntuOzellik(aa, ff);
        const goster = i <= idx, yok = oo.b === undefined;
        if (i === idx) { ctx.save(); ctx.fillStyle = 'rgba(255,196,60,.22)'; ctx.fillRect(6, yy - 11, w - 12, 19); ctx.restore(); }
        const hucre = [
          D.biçim(aa / 100, 0),
          !goster ? '…' : yok ? 'oluşmaz' : D.biçim(oo.b / 100, 2),
          !goster ? '…' : yok ? '—' : D.biçim(180 * oo.m, 0),
          !goster ? '…' : yok ? '—' : oo.cins,
          !goster ? '…' : yok ? '—' : oo.yon
        ];
        hucre.forEach((t, j) => D.yaziHaleli(ctx, t, kx[j], yy, j === 0 ? K.beyaz : (ff > 0 ? R.normal : '#8FA8C8'),
                                             '700 12px system-ui, sans-serif', 'left'));
      });
    };
    tablo(200, 68);
    D.yaziHaleli(ctx, 'b) Aynı odak uzaklıklı TÜMSEK ayna (f = −2 m)', 12, 184, K.beyaz, '700 12px system-ui, sans-serif', 'left');
    tablo(-200, 206);
    D.yaziHaleli(ctx, 'Tümsekte görüntü daima F ile T arasında: sanal · düz · küçük', 12, h - 12, R.ivme,
                 '600 11px system-ui, sans-serif', 'left');
    return;
  }

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

function cizGrafik(ctx, w, h, st, pHam) {
  const p = P(pHam);
  const pay = 8, gw = (w - pay * 3) / 2, gh = h - 6;
  const f = odak(p);
  const cukur = p.tur < 1.5;
  const sonsuz = p.mod > 2.5 && p.mod < 3.5;
  const aMax = sonsuz ? 20 * p.f : Math.max(p.f * 5, aEnBuyuk(p));
  /* Canlı çalışma noktası — tarama oynatılınca eğri üzerinde kayar. */
  const aCanli = cisimA(st, p);
  const bCanli = goruntuB(aCanli, f);
  /* Çukurda b hem + hem − olur; tümsekte daima −f ile 0 arasındadır. */
  const bUst = cukur ? Math.abs(f) * 4 : 0;
  const bAlt = sonsuz && cukur ? 0 : cukur ? -Math.abs(f) * 4 : -Math.abs(f) * 1.15;
  const sinir = Math.abs(f) * 4;
  /* a = f’nin iki yanı ayrı eğridir; tek dizide çizilirse −4f’den +4f’ye
     dikey bir çizgiyle birleşirdi. İmleç, cismin bulunduğu kolda çizilir. */
  const ikiKol = (k, veri, imlec) => {
    const kol = [veri.filter(q => q.t < f), veri.filter(q => q.t > f)];
    const imKol = aCanli < f ? 0 : 1;
    let cizildi = false;
    kol.forEach((vr, i) => {
      if (vr.length < 2) return;
      D.miniGrafik(ctx, Object.assign({}, k, { veri: vr, imlec: i === imKol ? imlec : null }));
      cizildi = true;
    });
    if (!cizildi) D.miniGrafik(ctx, Object.assign({}, k, { veri: [] }));
  };

  /* --- b − a --- */
  const v1 = [];
  for (let a = aMax / 160; a <= aMax; a += aMax / 160) {
    if (Math.abs(a - f) < Math.abs(f) * 0.06) continue;      // asimptot çevresi
    if (sonsuz && a < f) continue;                           // sonsuzda yalnız uzak kol
    const b = goruntuB(a, f);
    if (b > sinir || b < -sinir) continue;
    v1.push({ t: a, v: b });
  }
  ikiKol({
    x: pay, y: 3, w: gw, h: gh,
    baslik: sonsuz ? 'b − a   (a → ∞ iken b → f = ' + D.biçim(f) + ' cm)'
          : cukur ? 'b − a   (a = f’de ışınlar paralel: b → ∞)'
                        : 'b − a   (tümsekte b daima negatif)',
    birim: 'cm', tEtiket: 'a (cm)',
    tMax: aMax, vMin: bAlt, vMax: bUst, renk: R.kuvvet
  }, v1, bCanli === null || Math.abs(bCanli) > sinir ? null : { t: aCanli, v: bCanli });

  /* --- büyütme − a --- */
  const v2 = [];
  for (let a = aMax / 160; a <= aMax; a += aMax / 160) {
    if (Math.abs(a - f) < Math.abs(f) * 0.06) continue;
    const b = goruntuB(a, f);
    const m = Math.abs(b / a);
    if (m > 4) continue;
    v2.push({ t: a, v: m });
  }
  ikiKol({
    x: pay * 2 + gw, y: 3, w: gw, h: gh,
    baslik: sonsuz ? 'Büyütme − a   (a → ∞ iken → 0: nokta)'
          : cukur ? 'Büyütme − a   (a = 2f’de tam 1)'
                        : 'Büyütme − a   (tümsekte daima < 1)',
    birim: '', tEtiket: 'a (cm)',
    tMax: aMax, vMin: 0, vMax: 4, renk: R.normal
  }, v2, bCanli === null || Math.abs(bCanli / aCanli) > 4 ? null : { t: aCanli, v: Math.abs(bCanli / aCanli) });
}

/* ------------------------------------------------------------ Okumalar */

function okumalar(st, pHam) {
  const p = P(pHam);
  const f = odak(p);
  const a = cisimA(st, p);
  const o = goruntuOzellik(a, f);
  if (p.mod > 2.5 && p.mod < 3.5) {
    return [
      { et: 'Cisim',           dg: 'Sonsuzda (paralel ışınlar)', birim: '' },
      { et: 'Odak uzaklığı f', dg: D.biçim(f),                   birim: 'cm' },
      { et: 'Görüntünün yeri', dg: 'Odak noktası',                birim: '' },
      { et: 'Özelliği',        dg: 'Nokta · ' + (f > 0 ? 'gerçek' : 'sanal'), birim: '' }
    ];
  }

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
      { d: 3, e: 'Cisim sonsuzda (paralel ışınlar)' },
      { d: 2, e: 'Otomatik tur — beş durum' },
      { d: 4, e: 'Kitap örneği: Toprak ve r = 4 m’lik ayna' }
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
