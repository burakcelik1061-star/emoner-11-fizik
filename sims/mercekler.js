(function () {
"use strict";
window.F11 = window.F11 || {};

/* ==========================================================================
   sims/mercekler.js
   --------------------------------------------------------------------------
   Konu 3.8.1 · Merceklerin özellikleri  (MEB 11, s.373-380)

   İKİ TÜR
   -------
   · İNCE KENARLI (yakınsak / dışbükey)  → ışığı TOPLAR,  f > 0
   · KALIN KENARLI (ıraksak / içbükey)   → ışığı DAĞITIR, f < 0

   MERCEK YAPICI DENKLEMİ (mercek n₀ indisli bir ortamda)
   ------------------------------------------------------
       1/f = (n/n₀ − 1) · (1/R₁ − 1/R₂)

   Havada n₀ = 1. Kitap (s.376): odak uzaklığı eğrilik yarıçaplarına,
   ışığın rengine, merceğin ve ortamın kırıcılık indisine bağlıdır.
   n < n₀ ise (n/n₀ − 1) eksi olur: mercek KARAKTER DEĞİŞTİRİR — yakınsak
   mercek dağıtır, ıraksak mercek toplar (kitap Şekil 3.40).

   İşaret kuralı (ışık SOLDAN gelir):
       R > 0  ⟹ eğrilik merkezi mercek ARKASINDA (sağda)
       R < 0  ⟹ eğrilik merkezi mercek ÖNÜNDE   (solda)
       Düz yüzey ⟹ R = ∞ ⟹ 1/R = 0

   İki yüzü de dışbükey bir mercekte R₁ > 0, R₂ < 0 olur ve iki terim
   TOPLANIR — bu yüzden ince kenarlı mercek güçlü bir toplayıcıdır.

   DİOPTRİ
   -------
       D = 1/f          (f METRE cinsinden)

   Gözlük numarası budur. +2 numara = 0,50 m odaklı ince kenarlı mercek.

   MERCEK SİSTEMLERİ
   -----------------
   Birbirine değen ince mercekler için dioptriler TOPLANIR:

       D = D₁ + D₂       ⟺       1/f = 1/f₁ + 1/f₂

   ÖZEL IŞINLAR (kitap Tablo 3.6 ve 3.7)
   -------------------------------------
   1) Eksene paralel gelen   → odaktan geçer (ıraksakta uzantısı)
   2) Merkezden geçen        → sapmadan devam eder
   3) Odaktan geçerek gelen  → eksene paralel çıkar
   4) 2F’den geçerek gelen   → öbür taraftaki 2F’den geçer

   HERHANGİ BİR IŞIN (kitap Şekil 3.41)
   ------------------------------------
   O’dan gelen ışına paralel YARDIMCI EKSEN çizilir; odak düzlemiyle kesiştiği
   nokta YARDIMCI ODAK F′’dür. Işın ya da uzantısı F′’den geçer.

   Kitapta merceğin iki odağının ikisi de F ile gösterilir; F′ yardımcı
   odaktır. Bu dosya da öyle yazar.
   ========================================================================== */

const D = window.F11;
const { R, K } = D;

/* ------------------------------------------------------------- Fizik */

function ters(x) { return Math.abs(x) < 1e-9 ? 0 : 1 / x; }

/** Mercek yapıcı denklemi — odak uzaklığı (cm). Düzlemse null (f = ∞). */
function odakYapici(p) {
  const guc = (p.n / (p.n0 || 1) - 1) * (ters(p.R1) - ters(p.R2));
  if (Math.abs(guc) < 1e-9) return null;
  return 1 / guc;
}

/** O anda geçerli odak uzaklığı (cm, işaretli). */
function odak(p) {
  if (p.mod > 1.5 && p.mod < 2.5) {
    const f = odakYapici(p);
    return f === null ? 1e9 : f;
  }
  return (p.tur < 1.5 ? 1 : -1) * p.f;
}

/** Dioptri (f cm cinsinden verilir). */
function dioptri(f) { return f === null || !isFinite(f) ? 0 : 100 / f; }

/** Merceğin tipi. */
function inceMi(p) { return odak(p) > 0; }

/* -------------------------------------------------------------- Durum */

/* Oynat'a basılınca düzeneğin anahtar büyüklüğü taranır; kaydırıcı taramanın
   BAŞLADIĞI değeri verir. Böylece her düzenekte bir şeyin nasıl değiştiği
   canlı görünür. */
const TARAMA_PERIYOT = 12;

function durum(p) { return { t: 0, f: p.f, n0: p.n0, cisimUzaklik: p.cisimUzaklik, aci: p.aci, uzak: 300 }; }

function fHedef(p) { return p.f < 34 ? 60 : 8; }
function n0Hedef(p) { return p.n0 < 1.4 ? 1.8 : 1.0; }
function aHedef(p) { return p.cisimUzaklik < 80 ? 150 : 12; }

/* Her düzenekte YALNIZ o düzeneğin anahtar büyüklüğü taranır:
   1) f · 2) ortamın indisi n₀ (merceğin n’sini geçince karakter değişir) ·
   3) cisim uzaklığı · 4) gelen ışının açısı · 5) Galileo’da giriş açısı,
   gözde cismin uzaklığı. */
function adim(st, dt, p) {
  st.t += dt;
  if (p.mod < 1.5)      st.f = D.tarama(st.t, p.f, fHedef(p), TARAMA_PERIYOT);
  else if (p.mod < 2.5) st.n0 = D.tarama(st.t, p.n0, n0Hedef(p), TARAMA_PERIYOT * 1.4);
  else if (p.mod < 3.5) st.cisimUzaklik = D.tarama(st.t, p.cisimUzaklik, aHedef(p), TARAMA_PERIYOT);
  else if (p.mod < 4.5) st.aci = D.tarama(st.t, p.aci, p.aci > 0 ? -25 : 25, TARAMA_PERIYOT);
  else if (p.sistem === 1) st.aci = D.tarama(st.t, 4, -4, TARAMA_PERIYOT);
  else st.uzak = D.tarama(st.t, 300, 18, 16);
}

function bitti() { return false; }

function etkin(st, p) {
  return Object.assign({}, p, { f: st.f ?? p.f, n0: st.n0 ?? p.n0, cisimUzaklik: st.cisimUzaklik ?? p.cisimUzaklik,
                                aci: p.mod > 3.5 && p.mod < 4.5 ? (st.aci ?? p.aci) : p.aci });
}

/* ------------------------------------------------- Ortak yerleşim */

function yerlesim(w, h, p, pHam) {
  const ham = pHam || p;
  const f = odak(p);
  const duz = !isFinite(f) || Math.abs(f) > 1e6;         // düz cam: f = ∞
  const cy = h * 0.52;
  const mx = w * 0.50;
  const boy = Math.min(h * 0.62, 190);

  /* Ölçek TARAMA BOYUNCA SABİT: taranan büyüklüğün en uç değerine göre.
     Anlık f’ye göre kurulsaydı f değişirken odaklar ekranda hiç kıpırdamazdı. */
  let fOlcek;
  if (p.mod < 1.5) fOlcek = Math.max(ham.f, fHedef(ham));
  else if (p.mod < 2.5) {
    const f1 = odakYapici(Object.assign({}, ham, { n0: ham.n0 }));
    const f2 = odakYapici(Object.assign({}, ham, { n0: n0Hedef(ham) }));
    const adaylar = [f1, f2].filter(x => x !== null).map(Math.abs);
    fOlcek = adaylar.length ? Math.min(150, Math.max(...adaylar)) : 60;
  } else fOlcek = Math.abs(f);
  let olcek = Math.min((w * 0.40) / Math.max(6, fOlcek * 1.3), 6.0);
  if (p.mod > 2.5 && p.mod < 3.5) {
    /* cisim, taramanın en uzak noktasında da panelde kalsın */
    const aMax = Math.max(ham.cisimUzaklik, aHedef(ham));
    olcek = Math.min(olcek, (w * 0.44) / aMax);
  }
  return { f, duz, cy, mx, boy, olcek, ince: !duz && f > 0 };
}

function cizMercekVeOdaklar(ctx, w, h, y, p) {
  if (p.mod > 1.5 && p.mod < 2.5 && p.n0 > 1.005) {
    /* mercek bir sıvının içinde */
    ctx.save(); ctx.fillStyle = 'rgba(60,140,205,' + Math.min(0.32, (p.n0 - 1) * 0.45).toFixed(3) + ')';
    ctx.fillRect(0, 0, w, h); ctx.restore();
  }
  D.kesikliCizgi(ctx, w * 0.02, y.cy, w * 0.98, y.cy, 'rgba(150,170,200,.55)', 1.4, [7, 5]);
  if (p.mod > 1.5 && p.mod < 2.5) {
    y.Hisin = mercekProfil(ctx, y, p, w) * 0.85;
    D.yaziAydinlik(ctx, 'ortam n₀ = ' + D.biçim(p.n0, 3) + (Math.abs(p.n0 - 1) < 0.005 ? ' (hava)' : Math.abs(p.n0 - 1.33) < 0.006 ? ' (su)' : ''),
                   w - 10, 38, '#1B3A52', '700 12px system-ui, sans-serif', 'right');
  } else if (y.duz) {
    /* gücü sıfır: iki yüzey aynı eğrilikte — ince paralel levha gibi davranır */
    ctx.save();
    ctx.fillStyle = 'rgba(127,212,230,.25)'; ctx.strokeStyle = '#7FD4E6'; ctx.lineWidth = 2;
    ctx.fillRect(y.mx - 5, y.cy - y.boy / 2, 10, y.boy);
    ctx.strokeRect(y.mx - 5, y.cy - y.boy / 2, 10, y.boy);
    ctx.restore();
  } else {
    D.mercek(ctx, y.mx, y.cy, y.boy, y.ince ? 'ince' : 'kalin');
  }
  isaret(ctx, y.mx, y.cy, 'O', K.beyaz);

  if (y.duz) {
    D.yaziAydinlik(ctx, 'Güç sıfır · f = ∞ (düz cam gibi)', w - 10, 18, K.metin2,
                   '700 12px system-ui, sans-serif', 'right');
    return;
  }

  const fp = Math.abs(y.f) * y.olcek;
  const icerde = x => x > w * 0.01 && x < w * 0.99;
  if (icerde(y.mx + fp)) isaret(ctx, y.mx + fp, y.cy, 'F', R.ivme);
  if (icerde(y.mx - fp)) isaret(ctx, y.mx - fp, y.cy, 'F', R.ivme);
  if (p.mod > 2.5 && p.mod < 3.5) {
    if (icerde(y.mx + 2 * fp)) isaret(ctx, y.mx + 2 * fp, y.cy, '2F', R.normal);
    if (icerde(y.mx - 2 * fp)) isaret(ctx, y.mx - 2 * fp, y.cy, '2F', R.normal);
  }

  if (icerde(y.mx + fp))
    D.olcu(ctx, y.mx, y.cy + h * 0.30, y.mx + fp, y.cy + h * 0.30,
           'f = ' + D.biçim(Math.abs(y.f), 4) + ' cm', R.ivme);
  else
    D.yaziAydinlik(ctx, 'f = ' + D.biçim(Math.abs(y.f), 4) + ' cm — odak panelin dışında',
                   y.mx, y.cy + h * 0.30, R.ivme, '700 11px system-ui, sans-serif', 'center');
  D.yaziAydinlik(ctx, p.mod > 1.5 && p.mod < 2.5
                   ? (y.ince ? 'Işığı TOPLUYOR · f > 0' : 'Işığı DAĞITIYOR · f < 0')
                   : (y.ince ? 'İnce kenarlı · f > 0' : 'Kalın kenarlı · f < 0'),
                 w - 10, 18, y.ince ? R.hiz : R.kuvvet,
                 '700 12px system-ui, sans-serif', 'right');
}

function isaret(ctx, x, yy, ad, renk) {
  ctx.save();
  ctx.fillStyle = renk;
  ctx.beginPath(); ctx.arc(x, yy, 4, 0, 6.2832); ctx.fill();
  ctx.restore();
  D.yaziAydinlik(ctx, ad, x, yy - 10, renk, '700 12px system-ui, sans-serif', 'center');
}

/* --------------------------------------------- Gerçekçi görünüm */

function cizGercek(ctx, w, h, st, pHam) {
  const p = etkin(st, pHam);
  if (p.mod > 4.5) { cizSistem(ctx, w, h, st, p); return; }
  const y = yerlesim(w, h, p, pHam);
  cizMercekVeOdaklar(ctx, w, h, y, p);

  if (p.mod > 3.5) { cizHerhangi(ctx, w, h, y, p); return; }
  if (p.mod > 2.5) { cizOzelIsinlar(ctx, w, h, y, p); return; }
  cizParalelIsinlar(ctx, w, h, y, p);

  if (p.mod > 1.5) {
    /* yapıcı denklemin terimleri */
    D.yaziAydinlik(ctx,
      'R₁ = ' + (Math.abs(p.R1) < 1e-9 ? 'düz' : D.biçim(p.R1) + ' cm') +
      '   R₂ = ' + (Math.abs(p.R2) < 1e-9 ? 'düz' : D.biçim(p.R2) + ' cm') +
      '   n = ' + D.biçim(p.n, 3) + '   n₀ = ' + D.biçim(p.n0, 3) +
      (p.n < p.n0 ? '  ⟹ n < n₀: KARAKTER DEĞİŞTİ' : ''),
      10, h - 28, R.normal, '700 12px system-ui, sans-serif', 'left');
    D.yaziAydinlik(ctx,
      'f = ' + (odakYapici(p) === null ? 'sonsuz' : D.biçim(odakYapici(p), 4) + ' cm') +
      '   ·   D = ' + D.biçim(dioptri(odakYapici(p)), 4) + ' dioptri',
      10, h - 10, R.ivme, '700 13px system-ui, sans-serif', 'left');
  } else {
    D.yaziAydinlik(ctx,
      y.duz ? 'Güç sıfır — ışınlar sapmadan geçer'
      : y.ince ? 'Paralel ışınlar F’de GERÇEKTEN kesişir — odak gerçek'
             : 'Paralel ışınlar ıraksar; UZANTILARI F’de kesişir — odak sanal',
      10, h - 10, y.ince ? R.hiz : R.kuvvet,
      '700 12px system-ui, sans-serif', 'left');
  }
}

/* ---- Mod 1 ve 2 · Paralel ışınlar ---- */

function cizParalelIsinlar(ctx, w, h, y, p) {
  const n = Math.max(2, Math.round(p.isinSayisi));
  const fp = y.f * y.olcek;                     // işaretli
  const sol = w * 0.03, sag = w * 0.97;

  for (let k = 0; k < n; k++) {
    const oran = (k / (n - 1)) * 2 - 1;
    if (Math.abs(oran) < 0.06) continue;
    const yy = y.cy + oran * (y.Hisin ?? y.boy * 0.42);

    /* gelen ışın */
    D.isin(ctx, sol, yy, y.mx, yy, R.ivme, 2, true);

    /* gücü sıfır mercek (düz cam): ışın doğrultusunu değiştirmez */
    if (y.duz) { D.isin(ctx, y.mx, yy, sag, yy, R.ivme, 2, true); continue; }

    /* çıkan ışın — odağa doğru (f>0) ya da odaktan kaçarak (f<0) */
    const dx = Math.sign(y.f) * fp;
    const dy = Math.sign(y.f) * (y.cy - yy);
    const uz = (sag - y.mx) / Math.max(1e-6, Math.abs(dx));
    D.isin(ctx, y.mx, yy, y.mx + dx * uz, yy + dy * uz, R.ivme, 2, true);

    if (!y.ince) {
      /* sanal uzantı — sol taraftaki odağa */
      D.sanalIsin(ctx, y.mx, yy, y.mx + fp, y.cy, 'rgba(180,200,230,.8)');
    }
  }
}

/* ---- Mod 3 · Üç özel ışın ---- */

function cizOzelIsinlar(ctx, w, h, y, p) {
  const fp = y.f * y.olcek;
  const sol = w * 0.03, sag = w * 0.97;
  const a = p.cisimUzaklik;
  const ox = y.mx - a * y.olcek;
  const boy = Math.min(h * 0.20, 58);
  const ty = y.cy - boy;

  D.nesneOku(ctx, ox, y.cy, boy, R.hiz, 'cisim');

  /* 1 · eksene paralel gelir, odaktan geçer */
  D.isin(ctx, ox, ty, y.mx, ty, R.ivme, 2, true);
  cikan(ctx, y.mx, ty, y.mx + fp, y.cy, sag, R.ivme);

  /* 2 · merkezden geçer, sapmaz */
  const m = (y.cy - ty) / (y.mx - ox);
  D.isin(ctx, ox, ty, y.mx, y.cy, R.surtunme, 2, true);
  D.isin(ctx, y.mx, y.cy, sag, y.cy + m * (sag - y.mx), R.surtunme, 2, true);

  /* 3 · ön odaktan geçerek gelir, paralel çıkar (panele sığmazsa çizilmez) */
  const fx = y.mx - fp;
  if (Math.abs(fx - ox) > 4) {
    const y3 = ty + (y.mx - ox) * (y.cy - ty) / (fx - ox);
    if (y3 > 6 && y3 < h - 6) {
      D.isin(ctx, ox, ty, y.mx, y3, R.kuvvet, 2, true);
      /* ıraksakta ışın ARKA odağa yönelir; uzantı merceğin ötesinde kesikli */
      if (!y.ince) D.sanalIsin(ctx, y.mx, y3, fx, y.cy, 'rgba(180,200,230,.8)');
      D.isin(ctx, y.mx, y3, sag, y3, R.kuvvet, 2, true);
    }
  }

  /* 4 · 2F’den geçerek gelir, öbür taraftaki 2F’den geçer. Iraksakta öbür
     taraftaki 2F’ye yönelerek gelir, uzantısı geldiği taraftaki 2F’den geçer. */
  const xHedef = y.mx + 2 * Math.abs(fp) * (y.ince ? -1 : 1);
  if (Math.abs(xHedef - ox) > 4) {
    const y4 = ty + (y.mx - ox) * (y.cy - ty) / (xHedef - ox);
    if (y4 > 6 && y4 < h - 6) {
      D.isin(ctx, ox, ty, y.mx, y4, R.normal, 2, true);
      if (!y.ince) D.sanalIsin(ctx, y.mx, y4, xHedef, y.cy, 'rgba(180,200,230,.8)');
      cikan(ctx, y.mx, y4, y.mx + 2 * fp, y.cy, sag, R.normal);
    }
  }

  D.yaziAydinlik(ctx,
    '1 paralel ⟹ F   2 merkezden ⟹ sapmaz   3 F’den ⟹ paralel   4 2F’den ⟹ 2F’den',
    10, h - 10, R.surtunme, '700 12px system-ui, sans-serif', 'left');
}

function cikan(ctx, px, py, qx, qy, sag, renk) {
  const dx = qx - px;
  if (Math.abs(dx) < 1e-6) return;
  const m = (qy - py) / dx;
  D.isin(ctx, px, py, sag, py + m * (sag - px), renk, 2, true);
  if (qx < px) D.sanalIsin(ctx, px, py, qx, qy, 'rgba(180,200,230,.8)');
}

function rad(d) { return d * Math.PI / 180; }
function der(r) { return r * 180 / Math.PI; }

/* ---- Mod 2 · Gerçek mercek biçimi (R₁, R₂) ve eğrilik merkezleri ----
   Yüzey tepe noktasından x(y) − x_tepe = R − işaret(R)·√(R² − y²)
   (R > 0: merkez sağda). Kenar kalınlığı hiçbir zaman eksiye düşmesin
   diye orta kalınlık gerektiği kadar büyütülür. */
function mercekProfil(ctx, y, p, w) {
  const s = y.olcek, R1 = p.R1 * s, R2 = p.R2 * s;
  let H = y.boy / 2;
  /* yükseklik en küçük yarıçapın %60’ı: yüzeyler yarım küreye dönmesin */
  [R1, R2].forEach(Rr => { if (Math.abs(Rr) > 1e-6) H = Math.min(H, Math.abs(Rr) * 0.6); });
  const sag = (Rr, yy) => Math.abs(Rr) < 1e-6 ? 0 : Rr - Math.sign(Rr) * Math.sqrt(Rr * Rr - yy * yy);
  const t = Math.max(6, sag(R1, H) - sag(R2, H) + 6);
  const x1 = y.mx - t / 2, x2 = y.mx + t / 2;
  ctx.save();
  ctx.fillStyle = 'rgba(127,212,230,.30)'; ctx.strokeStyle = '#4FA9C9'; ctx.lineWidth = 2.4;
  ctx.beginPath();
  for (let i = 0; i <= 40; i++) { const yy = -H + 2 * H * i / 40; const x = x1 + sag(R1, yy); i ? ctx.lineTo(x, y.cy + yy) : ctx.moveTo(x, y.cy + yy); }
  for (let i = 40; i >= 0; i--) { const yy = -H + 2 * H * i / 40; ctx.lineTo(x2 + sag(R2, yy), y.cy + yy); }
  ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.restore();
  const icerde = x => x > 8 && x < w - 8;
  /* eğrilik merkezleri — yazılar eksenin ALTINDA (F ve O yazılarıyla çakışmasın) */
  [[R1, x1, 'M₁'], [R2, x2, 'M₂']].forEach(([Rr, xv, ad]) => {
    if (Math.abs(Rr) < 1e-6 || !icerde(xv + Rr)) return;
    ctx.save(); ctx.fillStyle = R.normal; ctx.beginPath(); ctx.arc(xv + Rr, y.cy, 3.5, 0, 6.2832); ctx.fill(); ctx.restore();
    D.yaziAydinlik(ctx, ad, xv + Rr, y.cy + 18, R.normal, '700 12px system-ui, sans-serif', 'center');
  });
  return H;
}

/** Renge bağlılık: taç camında n(kırmızı) ≈ n − 0,0025, n(mavi) ≈ n + 0,0056. */
function renkliOdak(p, dn) { return odakYapici(Object.assign({}, p, { n: p.n + dn })); }

/* ---- Mod 4 · Herhangi bir ışın · yardımcı eksen (kitap Şekil 3.41) ----
   Gelen ışına paralel, optik merkezden geçen YARDIMCI EKSEN çizilir. Odak
   düzleminin (odaktan asal eksene dik) yardımcı eksenle kesiştiği nokta
   YARDIMCI ODAK F′’dür. Işın ya da uzantısı F′’den geçecek şekilde kırılır.
   Bu, ince mercek bağıntısıyla aynıdır:  tan β = tan α − y/f */
function cizHerhangi(ctx, w, h, y, p) {
  const sol = w * 0.03, sag = w * 0.97;
  const tg = Math.tan(rad(p.aci));                       // yukarı doğru pozitif
  const yh = y.cy - y.boy * 0.26;                          // merceğe çarpma noktası
  const fp = y.f * y.olcek;                                // işaretli (px)
  /* yardımcı eksen */
  D.kesikliCizgi(ctx, sol, y.cy - tg * (sol - y.mx), sag, y.cy - tg * (sag - y.mx), R.normal, 1.4, [9, 5]);
  D.yaziAydinlik(ctx, 'yardımcı eksen', sag - 4, y.cy - tg * (sag - 40 - y.mx) + (tg > 0 ? 16 : -8), R.normal,
                 '700 11px system-ui, sans-serif', 'right');
  /* odak düzlemi — yakınsakta arkadaki, ıraksakta öndeki odaktan */
  const xd = y.mx + fp, yF = y.cy - tg * fp;
  D.kesikliCizgi(ctx, xd, y.cy - y.boy * 0.56, xd, y.cy + y.boy * 0.56, 'rgba(90,100,130,.85)', 1.2, [4, 3]);
  D.yaziAydinlik(ctx, 'odak düzlemi', xd + (fp > 0 ? 5 : -5), y.cy + y.boy * 0.56, 'rgba(70,80,110,.95)',
                 '600 10px system-ui, sans-serif', fp > 0 ? 'left' : 'right');
  /* gelen ışın ve kırılan ışın */
  D.isin(ctx, sol, yh - tg * (sol - y.mx), y.mx, yh, R.ivme, 2.4, true);
  if (yF > 4 && yF < h - 4) {
    ctx.save(); ctx.fillStyle = R.surtunme; ctx.beginPath(); ctx.arc(xd, yF, 5, 0, 6.2832); ctx.fill(); ctx.restore();
    D.yaziAydinlik(ctx, 'F′', xd + 8, yF - 6, R.surtunme, '700 13px system-ui, sans-serif', 'left');
  }
  cikan(ctx, y.mx, yh, xd, yF, sag, R.kuvvet);
  D.yaziAydinlik(ctx, y.ince ? 'Kırılan ışın yardımcı odak F′’den GEÇER'
                             : 'Kırılan ışının UZANTISI yardımcı odak F′’den geçer',
                 10, h - 10, R.kuvvet, '700 12px system-ui, sans-serif', 'left');
}

/* ---- Mod 5 · Mercek sistemleri (Alıştırma 25 ve 26) ---- */

/* Göz: ince mercek + sabit uzaklıkta retina (hava eşdeğeri, cm).
   Uyum (akomodasyon): göz merceği gücünü [Pmin, Pmax] aralığında ayarlar. */
const RETINA = 1 / 0.6;                 // 1,667 cm — 60 D’lik göz uzağı tam görür
const GOZLUK_ARA = 1.2;                 // gözlük camı göz merceğinin 1,2 cm önünde
const GOZLER = {
  2: { ad: 'Miyop göz', Pmin: 0.625, Pmax: 0.665, fg: -(40 - GOZLUK_ARA) },          // uzak nokta 40 cm
  3: { ad: 'Hipermetrop göz', Pmin: 0.58, Pmax: 0.62, fg: 1 / (1 / (25 - GOZLUK_ARA) - 1 / (50 - GOZLUK_ARA)) }  // yakın nokta 50 cm → 25 cm
};

/** Cisim göz merceğinden x cm uzaktayken: kullanılan güç, odağın retinaya uzaklığı. */
function gozHesap(sistem, x, gozluk) {
  const g = GOZLER[sistem];
  let V;                                               // göz merceğine gelen ışığın yakınsaklığı (1/cm)
  if (gozluk) {
    const V1 = -1 / (x - GOZLUK_ARA) + 1 / g.fg;
    V = V1 / (1 - GOZLUK_ARA * V1);
  } else V = -1 / x;
  const Pist = 1 / RETINA - V;
  const P = Math.min(g.Pmax, Math.max(g.Pmin, Pist));
  const V3 = V + P;
  const b = V3 > 1e-9 ? 1 / V3 : Infinity;
  return { P, Pist, b, hata: b - RETINA, net: Math.abs(Pist - P) < 1e-9 };
}

/** Paraksiyel ince mercek izleme: [{x, f}] merceklerinden geçen ışının kırık çizgisi (x cm, y cm). */
function paraksiyelIz(y0, u0, x0, mercekler, xSon) {
  const nok = [[x0, y0]];
  let x = x0, yy = y0, u = u0;
  mercekler.forEach(m => {
    yy += u * (m.x - x); x = m.x; nok.push([x, yy]);
    u -= yy / m.f;
  });
  nok.push([xSon, yy + u * (xSon - x)]);
  return { nok, u, y: yy, x };
}

function cizSistem(ctx, w, h, st, p) {
  if (p.sistem === 1) { cizGalileo(ctx, w, h, st, p); return; }
  const g = GOZLER[p.sistem];
  const x = st.uzak ?? 300, gozluk = p.gozluk > 1.5;
  const s = Math.min(95, (w * 0.28) / RETINA, (h * 0.40) / 1.05);
  const XE = w * 0.60, cy = h * 0.48;
  const X = u => XE + u * s, Y = v => cy - v * s;
  /* göz küresi: arka yüzeyi retina */
  const Rg = 1.05, merkez = RETINA - Rg;
  ctx.save();
  ctx.fillStyle = 'rgba(255,255,255,.85)'; ctx.strokeStyle = '#8A95A8'; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.arc(X(merkez), cy, Rg * s, 0, 6.2832); ctx.fill(); ctx.stroke();
  ctx.strokeStyle = '#C0392B'; ctx.lineWidth = 4;
  ctx.beginPath(); ctx.arc(X(merkez), cy, Rg * s, -0.6, 0.6); ctx.stroke();
  ctx.restore();
  D.yaziAydinlik(ctx, 'retina', X(RETINA) + 6, cy - Rg * s * 0.62, '#C0392B', '700 11px system-ui, sans-serif', 'left');
  D.mercek(ctx, XE, cy, 0.9 * s, 'ince');
  D.kesikliCizgi(ctx, 4, cy, w - 4, cy, 'rgba(150,170,200,.5)', 1.2, [7, 5]);
  if (gozluk) {
    D.mercek(ctx, X(-GOZLUK_ARA), cy, 1.3 * s, g.fg > 0 ? 'ince' : 'kalin');
    D.yaziAydinlik(ctx, 'gözlük ' + (g.fg > 0 ? '+' : '') + D.biçim(100 / g.fg, 3) + ' D',
                   X(-GOZLUK_ARA), cy - 0.72 * s, g.fg > 0 ? R.hiz : R.kuvvet, '700 11px system-ui, sans-serif', 'center');
  }
  /* ışınlar: eksen üzerindeki bir cisim noktasından */
  const gh = gozHesap(p.sistem, x, gozluk);
  const merc = gozluk ? [{ x: -GOZLUK_ARA, f: g.fg }, { x: 0, f: 1 / gh.P }] : [{ x: 0, f: 1 / gh.P }];
  const xBas = (4 - XE) / s, xIlk = merc[0].x;
  const odakX = gh.b;
  const renk = gh.net ? R.hiz : R.kuvvet;
  [-0.34, -0.17, 0.17, 0.34].forEach(yp => {
    /* ilk merceğe yp yüksekliğinde varan ışın; cisim x cm önde */
    const u0 = yp / (x + xIlk);                            // xIlk ≤ 0
    const xS = Math.max(xBas, -x);                          // cisim panelin içindeyse oradan başlar
    const iz = paraksiyelIz(yp - u0 * (xIlk - xS), u0, xS, merc, RETINA);
    ctx.save(); ctx.strokeStyle = renk; ctx.lineWidth = 1.8;
    ctx.beginPath(); iz.nok.forEach(([a, b], i) => (i ? ctx.lineTo(X(a), Y(b)) : ctx.moveTo(X(a), Y(b)))); ctx.stroke();
    ctx.restore();
    if (!gh.net && isFinite(odakX) && odakX > RETINA)
      D.sanalIsin(ctx, X(RETINA), Y(iz.nok[iz.nok.length - 1][1]), X(odakX), cy, 'rgba(226,75,74,.8)');
  });
  if (isFinite(odakX) && X(odakX) < w - 4) {
    ctx.save(); ctx.fillStyle = renk; ctx.beginPath(); ctx.arc(X(odakX), cy, 4.5, 0, 6.2832); ctx.fill(); ctx.restore();
  }
  D.yaziAydinlik(ctx, g.ad + (gozluk ? ' · gözlüklü' : ' · gözlüksüz') + ' · cisim ' + (x > 250 ? 'uzakta (' : '') +
                 D.biçim(x, 0) + ' cm' + (x > 250 ? ')' : ''), 10, 20, '#14506E', '700 12px system-ui, sans-serif', 'left');
  D.yaziAydinlik(ctx, gh.net ? 'NET görüyor — odak retinada'
                   : (gh.hata < 0 ? 'BULANIK — odak retinanın ÖNÜNDE' : 'BULANIK — odak retinanın ARKASINDA'),
                 10, h - 10, renk, '700 12px system-ui, sans-serif', 'left');
}

function cizGalileo(ctx, w, h, st, p) {
  const f1 = p.f, f2 = -p.f / 3, d = f1 + f2;              // afokal: iki odak çakışır
  const s = (w * 0.46) / d, x1 = w * 0.22, x2 = x1 + d * s, cy = h * 0.50;
  const aci = st.aci ?? 3, tg = Math.tan(rad(aci));
  D.kesikliCizgi(ctx, 4, cy, w - 4, cy, 'rgba(150,170,200,.5)', 1.2, [7, 5]);
  D.mercek(ctx, x1, cy, h * 0.62, 'ince');
  D.mercek(ctx, x2, cy, h * 0.30, 'kalin');
  D.yaziAydinlik(ctx, 'A · yakınsak (objektif)', x1, cy + h * 0.36, R.hiz, '700 11px system-ui, sans-serif', 'center');
  D.yaziAydinlik(ctx, 'B · ıraksak (göz merceği)', x2 + 10, cy + h * 0.20, R.kuvvet, '700 11px system-ui, sans-serif', 'left');
  const fx = x1 + f1 * s;
  isaret(ctx, fx, cy, 'F₁ = F₂', R.ivme);
  const H = h * 0.25 / s;                                   // cm
  [-1, -0.5, 0, 0.5, 1].forEach(k => {
    const y0 = k * H;
    const a = x => x1 + x * s, b = v => cy - v * s;
    /* A’ya y0 yüksekliğinde varan eğik paralel ışın */
    const xBas = (4 - x1) / s;
    const iz = paraksiyelIz(y0 - tg * (0 - xBas), tg, xBas, [{ x: 0, f: f1 }, { x: d, f: f2 }], (w - 4 - x1) / s);
    ctx.save(); ctx.strokeStyle = R.ivme; ctx.lineWidth = 1.8;
    ctx.beginPath(); iz.nok.forEach(([u, v], i) => (i ? ctx.lineTo(a(u), b(v)) : ctx.moveTo(a(u), b(v)))); ctx.stroke(); ctx.restore();
    /* ıraksak olmasaydı A’nın odak düzleminde toplanacaklardı */
    const [ux, uy] = iz.nok[2];
    D.sanalIsin(ctx, a(ux), b(uy), fx, cy - f1 * tg * s, 'rgba(180,200,230,.8)');
  });
  const cikis = der(Math.atan(tg * f1 / Math.abs(f2)));
  D.yaziAydinlik(ctx, 'Galileo teleskobu · paralel girer, paralel çıkar', w - 10, 20, '#14506E', '700 12px system-ui, sans-serif', 'right');
  D.yaziAydinlik(ctx, 'giriş ' + D.biçim(aci, 2) + '° ⟹ çıkış ' + D.biçim(cikis, 2) + '°   (açısal büyütme f₁/|f₂| = ' +
                 D.biçim(f1 / Math.abs(f2), 2) + ')', 10, h - 10, R.normal, '700 12px system-ui, sans-serif', 'left');
}

/* ---- Mod 4–5 klasik, grafik, okuma ---- */

function klasikHerhangi(ctx, w, h, p) {
  const f = odak(p), a = p.aci;
  const satir = [
    ['Herhangi bir ışının kırılması', K.beyaz, '700 12px system-ui, sans-serif'],
    ['1) O’dan gelen ışına PARALEL yardımcı eksen', K.metin2, '11px system-ui, sans-serif'],
    ['2) Odaktan asal eksene dik: odak düzlemi', K.metin2, '11px system-ui, sans-serif'],
    ['3) Kesişim: yardımcı odak F′', K.metin2, '11px system-ui, sans-serif'],
    ['4) Işın (ya da uzantısı) F′’den geçer', K.metin2, '11px system-ui, sans-serif'],
    ['', K.metin2, '11px'],
    ['f = ' + D.biçim(f, 3) + ' cm · α = ' + D.biçim(a, 3) + '°', R.normal, '700 12px system-ui, sans-serif'],
    ['F′ yüksekliği = f · tan α = ' + D.biçim(f * Math.tan(rad(a)), 3) + ' cm', R.surtunme, '700 12px system-ui, sans-serif'],
    ['', K.metin2, '11px'],
    ['Aynı sonuç: tan β = tan α − y/f', R.kuvvet, '700 12px system-ui, sans-serif'],
    ['(y: ışının merceğe çarptığı yükseklik)', K.metin2, '11px system-ui, sans-serif'],
    ['Paralel gelen ışın (α = 0) ⟹ F′ = F', K.metin2, '11px system-ui, sans-serif']
  ];
  let sy = 40;
  satir.forEach(([t, c, fo]) => { if (t) D.yaziHaleli(ctx, t, 12, sy, c, fo, 'left'); sy += 18; });
}

function klasikSistem(ctx, w, h, st, p) {
  let satir;
  if (p.sistem === 1) {
    const f1 = p.f, f2 = -p.f / 3, aci = st.aci ?? 3;
    satir = [
      ['Galileo teleskobu (Alıştırma 25)', K.beyaz, '700 12px system-ui, sans-serif'],
      ['A: yakınsak f₁ = ' + D.biçim(f1, 3) + ' cm', R.hiz, '700 12px system-ui, sans-serif'],
      ['B: ıraksak  f₂ = ' + D.biçim(f2, 3) + ' cm', R.kuvvet, '700 12px system-ui, sans-serif'],
      ['aradaki uzaklık d = f₁ − |f₂| = ' + D.biçim(f1 + f2, 3) + ' cm', K.metin2, '11px system-ui, sans-serif'],
      ['⟹ A’nın odağı B’nin odağıyla çakışır', K.metin2, '11px system-ui, sans-serif'],
      ['⟹ paralel giren ışınlar paralel çıkar', R.ivme, '700 12px system-ui, sans-serif'],
      ['', K.metin2, '11px'],
      ['Açısal büyütme = f₁ / |f₂| = ' + D.biçim(f1 / Math.abs(f2), 3), R.normal, '700 13px system-ui, sans-serif'],
      ['giriş ' + D.biçim(aci, 2) + '° ⟹ çıkış ' + D.biçim(der(Math.atan(Math.tan(rad(aci)) * 3)), 2) + '°', K.metin2, '11px system-ui, sans-serif'],
      ['', K.metin2, '11px'],
      ['Galileo’nun 1609 teleskobu ~30 kat', K.metin2, '11px system-ui, sans-serif'],
      ['büyütüyordu; görüntü DÜZ çıkar.', K.metin2, '11px system-ui, sans-serif']
    ];
  } else {
    const g = GOZLER[p.sistem], x = st.uzak ?? 300;
    const a = gozHesap(p.sistem, x, false), b = gozHesap(p.sistem, x, true);
    const miyop = p.sistem === 2;
    satir = [
      [g.ad + ' (Alıştırma 26)', K.beyaz, '700 12px system-ui, sans-serif'],
      [miyop ? 'Göz merceği fazla güçlü: uzak nokta 40 cm' : 'Göz merceği yeterince güçlü değil: yakın nokta 50 cm',
        K.metin2, '11px system-ui, sans-serif'],
      [miyop ? 'Uzaktaki cismin görüntüsü retinanın ÖNÜNE düşer' : 'Yakındaki cismin görüntüsü retinanın ARKASINA düşer',
        K.metin2, '11px system-ui, sans-serif'],
      ['', K.metin2, '11px'],
      ['cisim uzaklığı: ' + D.biçim(x, 0) + ' cm', R.normal, '700 12px system-ui, sans-serif'],
      ['gözlüksüz: ' + (a.net ? 'net' : 'bulanık, odak ' + D.biçim(Math.abs(a.hata) * 10, 2) + ' mm ' + (a.hata < 0 ? 'önde' : 'arkada')),
        a.net ? R.hiz : R.kuvvet, '700 12px system-ui, sans-serif'],
      ['gözlüklü:  ' + (b.net ? 'net' : 'bulanık, odak ' + D.biçim(Math.abs(b.hata) * 10, 2) + ' mm ' + (b.hata < 0 ? 'önde' : 'arkada')),
        b.net ? R.hiz : R.kuvvet, '700 12px system-ui, sans-serif'],
      ['', K.metin2, '11px'],
      [(miyop ? 'IRAKSAK' : 'YAKINSAK') + ' gözlük: f = ' + D.biçim(g.fg, 3) + ' cm  (' + (g.fg > 0 ? '+' : '') + D.biçim(100 / g.fg, 3) + ' D)',
        miyop ? R.kuvvet : R.hiz, '700 12px system-ui, sans-serif'],
      [miyop ? 'Işığı biraz dağıtır, odak retinaya kayar' : 'Işığı biraz toplar, odak retinaya kayar',
        K.metin2, '11px system-ui, sans-serif'],
      ['(göz modeli: 60 D, retina 1,67 cm · gözlük 1,2 cm önde)', K.metin2, '10px system-ui, sans-serif']
    ];
  }
  let sy = 40;
  satir.forEach(([t, c, fo]) => { if (t) D.yaziHaleli(ctx, t, 12, sy, c, fo, 'left'); sy += 18; });
}

function grafikHerhangi(ctx, pay, gw, gh, p) {
  const f = odak(p), yv = 3;                                 // örnek: merceğe 3 cm yükseklikte çarpar
  const v1 = [], v2 = [];
  for (let a = -25; a <= 25; a += 1) {
    v1.push({ t: a, v: der(Math.atan(Math.tan(rad(a)) - yv / f)) });
    v2.push({ t: a, v: f * Math.tan(rad(a)) });
  }
  const b = der(Math.atan(Math.tan(rad(p.aci)) - yv / f));
  const lim1 = Math.max(...v1.map(q => Math.abs(q.v))) * 1.1;
  D.miniGrafik(ctx, { x: pay, y: 3, w: gw, h: gh, baslik: 'Çıkış açısı β − geliş açısı α   (y = 3 cm’de çarpan ışın)',
    birim: '°', tEtiket: 'α (°)', veri: v1, tMin: -25, tMax: 25, vMin: -lim1, vMax: lim1, renk: R.kuvvet,
    imlec: { t: p.aci, v: b } });
  const lim2 = Math.abs(f) * Math.tan(rad(25)) * 1.1;
  D.miniGrafik(ctx, { x: pay * 2 + gw, y: 3, w: gw, h: gh, baslik: 'Yardımcı odak F′ yüksekliği − α   (f·tan α)',
    birim: 'cm', tEtiket: 'α (°)', veri: v2, tMin: -25, tMax: 25, vMin: -lim2, vMax: lim2, renk: R.surtunme,
    imlec: { t: p.aci, v: f * Math.tan(rad(p.aci)) } });
}

function grafikSistem(ctx, pay, gw, gh, st, p) {
  if (p.sistem === 1) {
    const oran = 3, v1 = [], v2 = [];
    for (let a = -5; a <= 5; a += 0.25) {
      v1.push({ t: a, v: der(Math.atan(Math.tan(rad(a)) * oran)) });
      v2.push({ t: a, v: p.f * Math.tan(rad(a)) });
    }
    const aci = st.aci ?? 3;
    D.miniGrafik(ctx, { x: pay, y: 3, w: gw, h: gh, baslik: 'Çıkış açısı − giriş açısı   (eğim = açısal büyütme 3)',
      birim: '°', tEtiket: 'giriş (°)', veri: v1, tMin: -5, tMax: 5, vMin: -16, vMax: 16, renk: R.normal,
      imlec: { t: aci, v: der(Math.atan(Math.tan(rad(aci)) * oran)) } });
    const lim = p.f * Math.tan(rad(5)) * 1.1;
    D.miniGrafik(ctx, { x: pay * 2 + gw, y: 3, w: gw, h: gh, baslik: 'Odak düzlemindeki ara görüntü yüksekliği − giriş açısı',
      birim: 'cm', tEtiket: 'giriş (°)', veri: v2, tMin: -5, tMax: 5, vMin: -lim, vMax: lim, renk: R.ivme,
      imlec: { t: aci, v: p.f * Math.tan(rad(aci)) } });
    return;
  }
  const x = st.uzak ?? 300;
  const v1 = [], v2 = [], v3 = [], v4 = [];
  for (let xx = 15; xx <= 300; xx += 2.5) {
    const a = gozHesap(p.sistem, xx, false), b = gozHesap(p.sistem, xx, true);
    v1.push({ t: xx, v: a.hata * 10 }); v2.push({ t: xx, v: b.hata * 10 });
    v3.push({ t: xx, v: a.Pist * 100 }); v4.push({ t: xx, v: b.Pist * 100 });
  }
  const a = gozHesap(p.sistem, x, false), b = gozHesap(p.sistem, x, true);
  const lim = Math.max(0.2, ...v1.map(q => Math.abs(q.v)), ...v2.map(q => Math.abs(q.v))) * 1.1;
  const o1 = { x: pay, y: 3, w: gw, h: gh, tMin: 15, tMax: 300, vMin: -lim, vMax: lim };
  D.miniGrafik(ctx, Object.assign({}, o1, { baslik: 'Odak − retina (mm) − cisim uzaklığı   (kırmızı gözlüksüz · yeşil gözlüklü)',
    birim: 'mm', tEtiket: 'cisim (cm)', veri: v1, renk: R.kuvvet, imlec: { t: x, v: a.hata * 10 } }));
  D.miniGrafik(ctx, Object.assign({}, o1, { baslik: '', birim: '', tEtiket: '', veri: v2, renk: R.hiz, imlec: { t: x, v: b.hata * 10 } }));
  const g = GOZLER[p.sistem];
  const pl = [...v3, ...v4].map(q => q.v), pa = Math.min(...pl, g.Pmin * 100) - 1, pu = Math.max(...pl, g.Pmax * 100) + 1;
  const o2 = { x: pay * 2 + gw, y: 3, w: gw, h: gh, tMin: 15, tMax: 300, vMin: pa, vMax: pu, sifirdanBasla: false };
  D.miniGrafik(ctx, Object.assign({}, o2, { baslik: 'Net görmek için gereken göz gücü (D)   · göz ' + D.biçim(g.Pmin * 100, 1) + '–' + D.biçim(g.Pmax * 100, 1) + ' D ayarlayabilir',
    birim: 'D', tEtiket: 'cisim (cm)', veri: v3, renk: R.kuvvet, imlec: { t: x, v: a.Pist * 100 } }));
  D.miniGrafik(ctx, Object.assign({}, o2, { baslik: '', birim: '', tEtiket: '', veri: v4, renk: R.hiz, imlec: { t: x, v: b.Pist * 100 } }));
}

function okumaSistem(st, p) {
  if (p.sistem === 1) {
    const aci = st.aci ?? 3;
    return [
      { et: 'A (yakınsak) f₁', dg: D.biçim(p.f, 3), birim: 'cm' },
      { et: 'B (ıraksak) f₂',  dg: D.biçim(-p.f / 3, 3), birim: 'cm' },
      { et: 'Aradaki uzaklık', dg: D.biçim(p.f * 2 / 3, 3), birim: 'cm' },
      { et: 'Giriş açısı',     dg: D.biçim(aci, 3), birim: '°' },
      { et: 'Çıkış açısı',     dg: D.biçim(der(Math.atan(Math.tan(rad(aci)) * 3)), 3), birim: '°' },
      { et: 'Açısal büyütme',  dg: '3', birim: '' }
    ];
  }
  const g = GOZLER[p.sistem], x = st.uzak ?? 300, gozluk = p.gozluk > 1.5, r = gozHesap(p.sistem, x, gozluk);
  return [
    { et: 'Göz',              dg: g.ad + (gozluk ? ' · gözlüklü' : ' · gözlüksüz'), birim: '' },
    { et: 'Cisim uzaklığı',   dg: D.biçim(x, 0), birim: 'cm' },
    { et: 'Gereken göz gücü', dg: D.biçim(r.Pist * 100, 3), birim: 'D' },
    { et: 'Kullanılan güç',   dg: D.biçim(r.P * 100, 3), birim: 'D' },
    { et: 'Görüş',            dg: r.net ? 'Net' : 'Bulanık (' + D.biçim(Math.abs(r.hata) * 10, 2) + ' mm ' + (r.hata < 0 ? 'önde' : 'arkada') + ')', birim: '' },
    { et: 'Gözlük',           dg: (g.fg > 0 ? 'Yakınsak +' : 'Iraksak ') + D.biçim(100 / g.fg, 3) + ' D', birim: '' }
  ];
}

/* ------------------------------------------ Klasik fizik görünümü */

function cizKlasik(ctx, w, h, st, pHam) {
  const p = etkin(st, pHam);
  D.izgara(ctx, w, h, 26);
  if (p.mod > 4.5) { klasikSistem(ctx, w, h, st, p); return; }
  if (p.mod > 3.5) { klasikHerhangi(ctx, w, h, p); return; }
  const f = odak(p);
  const ince = f > 0;

  D.yaziHaleli(ctx, ince ? 'Işığı toplar (yakınsak davranış)' : 'Işığı dağıtır (ıraksak davranış)',
               12, 40, K.beyaz, '700 12px system-ui, sans-serif', 'left');

  if (p.mod > 1.5 && p.mod < 2.5) {
    const fy = odakYapici(p);
    const sol = [
      ['1/f = (n/n₀ − 1)·(1/R₁ − 1/R₂)', K.beyaz, '700 13px system-ui, sans-serif'],
      ['n = ' + D.biçim(p.n, 3) + ' · n₀ = ' + D.biçim(p.n0, 3) + '  ⟹  n/n₀−1 = ' + D.biçim(p.n / p.n0 - 1, 4),
        p.n < p.n0 ? R.kuvvet : R.normal, '12px system-ui, sans-serif'],
      ['1/R₁ = ' + (Math.abs(p.R1) < 1e-9 ? '0 (düz)' : D.biçim(ters(p.R1), 5)),
        R.ivme, '12px system-ui, sans-serif'],
      ['1/R₂ = ' + (Math.abs(p.R2) < 1e-9 ? '0 (düz)' : D.biçim(ters(p.R2), 5)),
        R.kuvvet, '12px system-ui, sans-serif'],
      ['fark = ' + D.biçim(ters(p.R1) - ters(p.R2), 5), K.metin2, '11px system-ui, sans-serif'],
      ['', K.metin2, '11px'],
      ['f = ' + (fy === null ? 'sonsuz' : D.biçim(fy, 4) + ' cm'),
        R.hiz, '700 14px system-ui, sans-serif'],
      ['D = 1/f = ' + D.biçim(dioptri(fy), 4) + ' dioptri', R.normal, '700 13px system-ui, sans-serif'],
      ['', K.metin2, '11px'],
      ['Renge bağlı (kitap s.376):', K.beyaz, '700 11px system-ui, sans-serif'],
      ['kırmızı f = ' + (renkliOdak(p, -0.0025) === null ? '∞' : D.biçim(renkliOdak(p, -0.0025), 4)) +
       ' · mavi f = ' + (renkliOdak(p, 0.0056) === null ? '∞' : D.biçim(renkliOdak(p, 0.0056), 4)) + ' cm',
        R.surtunme, '11px system-ui, sans-serif']
    ];
    let sy = 62;
    sol.forEach(([t, c, fo]) => { if (t) D.yaziHaleli(ctx, t, 12, sy, c, fo, 'left'); sy += 17; });

    const sx = w * 0.52;
    const sag = [
      ['İşaret kuralı', K.beyaz, '700 12px system-ui, sans-serif'],
      ['(ışık SOLDAN gelir)', K.metin2, '11px system-ui, sans-serif'],
      ['R > 0 ⟹ merkez ARKADA', K.metin2, '11px system-ui, sans-serif'],
      ['R < 0 ⟹ merkez ÖNDE', K.metin2, '11px system-ui, sans-serif'],
      ['Düz yüzey ⟹ 1/R = 0', K.metin2, '11px system-ui, sans-serif'],
      ['', K.metin2, '11px'],
      ['İki yüzü dışbükey:', K.beyaz, '700 12px system-ui, sans-serif'],
      ['R₁>0, R₂<0 ⟹ terimler TOPLANIR', R.hiz, '11px system-ui, sans-serif'],
      ['', K.metin2, '11px'],
      ['Karakter değiştirme (Şekil 3.40)', K.beyaz, '700 12px system-ui, sans-serif'],
      ['n < n₀ ⟹ (n/n₀ − 1) < 0', R.kuvvet, '700 11px system-ui, sans-serif'],
      ['yakınsak mercek DAĞITIR,', K.metin2, '11px system-ui, sans-serif'],
      ['ıraksak mercek TOPLAR', K.metin2, '11px system-ui, sans-serif'],
      ['n = n₀ ⟹ mercek ışığı hiç kırmaz', K.metin2, '11px system-ui, sans-serif'],
      ['', K.metin2, '11px'],
      ['n büyürse f küçülür ⟹ güçlenir', R.surtunme, '11px system-ui, sans-serif'],
      ['R küçülürse f küçülür ⟹ güçlenir', R.surtunme, '11px system-ui, sans-serif']
    ];
    sy = 40;
    sag.forEach(([t, c, fo]) => { if (t) D.yaziHaleli(ctx, t, sx, sy, c, fo, 'left'); sy += 17; });
    return;
  }

  if (p.mod > 2.5) {
    const satir = [
      ['1 · Eksene paralel gelen', R.ivme, '700 12px system-ui, sans-serif'],
      ['     ⟹ odaktan geçer', K.metin2, '11px system-ui, sans-serif'],
      ['2 · Merkezden geçen', R.surtunme, '700 12px system-ui, sans-serif'],
      ['     ⟹ SAPMADAN devam eder', K.metin2, '11px system-ui, sans-serif'],
      ['3 · Odaktan geçerek gelen', R.kuvvet, '700 12px system-ui, sans-serif'],
      ['     ⟹ eksene paralel çıkar', K.metin2, '11px system-ui, sans-serif'],
      ['4 · 2F’den geçerek gelen', R.normal, '700 12px system-ui, sans-serif'],
      ['     ⟹ öbür taraftaki 2F’den geçer', K.metin2, '11px system-ui, sans-serif'],
      ['', K.metin2, '11px'],
      ['2. ışın neden sapmaz?', K.beyaz, '700 12px system-ui, sans-serif'],
      ['Merkezde merceğin iki yüzeyi', K.metin2, '11px system-ui, sans-serif'],
      ['birbirine PARALELDİR ⟹ orası', K.metin2, '11px system-ui, sans-serif'],
      ['ince bir levha gibi davranır:', K.metin2, '11px system-ui, sans-serif'],
      ['yön değişmez, kayma ihmal edilir', K.metin2, '11px system-ui, sans-serif'],
      ['', K.metin2, '11px'],
      ['f = ' + D.biçim(Math.abs(f), 4) + ' cm  ·  a = ' + D.biçim(p.cisimUzaklik) + ' cm',
        R.normal, '12px system-ui, sans-serif']
    ];
    let sy = 62;
    satir.forEach(([t, c, fo]) => { if (t) D.yaziHaleli(ctx, t, w * 0.30, sy, c, fo, 'left'); sy += 16; });
    return;
  }

  const satir = [
    ['f = ' + D.biçim(Math.abs(f), 4) + ' cm', R.ivme, '700 14px system-ui, sans-serif'],
    ['D = ' + D.biçim(dioptri(f), 4) + ' dioptri', R.normal, '700 13px system-ui, sans-serif'],
    ['', K.metin2, '11px'],
    [ince ? 'Işığı TOPLAR' : 'Işığı DAĞITIR', ince ? R.hiz : R.kuvvet, '700 13px system-ui, sans-serif'],
    [ince ? 'Odak GERÇEK (f > 0)' : 'Odak SANAL (f < 0)', K.beyaz, '700 12px system-ui, sans-serif'],
    ['', K.metin2, '11px'],
    ['Merceğin İKİ odağı vardır', K.metin2, '11px system-ui, sans-serif'],
    ['ve ikisi de merkeze eşit', K.metin2, '11px system-ui, sans-serif'],
    ['uzaklıktadır — aynadan farkı bu', K.metin2, '11px system-ui, sans-serif'],
    ['', K.metin2, '11px'],
    ['Aynada ışık YANSIR,', R.surtunme, '11px system-ui, sans-serif'],
    ['mercekte KIRILIR', R.surtunme, '11px system-ui, sans-serif'],
    ['Bu yüzden mercekte görüntü', K.metin2, '11px system-ui, sans-serif'],
    ['cismin ÖTE tarafında oluşur', K.metin2, '11px system-ui, sans-serif']
  ];
  let sy = 62;
  satir.forEach(([t, c, fo]) => { if (t) D.yaziHaleli(ctx, t, w * 0.34, sy, c, fo, 'left'); sy += 17; });
}

/* ---------------------------------------------------- Grafik paneli */

function cizGrafik(ctx, w, h, st, pHam) {
  const p = etkin(st, pHam);
  const pay = 8, gw = (w - pay * 3) / 2, gh = h - 6;
  if (p.mod > 4.5) { grafikSistem(ctx, pay, gw, gh, st, p); return; }
  if (p.mod > 3.5) { grafikHerhangi(ctx, pay, gw, gh, p); return; }

  if (p.mod < 1.5 || p.mod > 2.5) {
    /* 1. ve 3. düzenek: gösterilen merceğin kendi grafikleri */
    const f = odak(p);
    const s = f < 0 ? -1 : 1;
    const d1 = [];
    for (let fq = 8; fq <= 60; fq += 1) d1.push({ t: fq, v: s * 100 / fq });
    D.miniGrafik(ctx, {
      x: pay, y: 3, w: gw, h: gh,
      baslik: 'D − |f|   (D = 1/f · odak kısaldıkça güç artar)', birim: 'D', tEtiket: '|f| (cm)',
      imlec: { t: Math.abs(f), v: dioptri(f) },
      veri: d1, tMin: 8, tMax: 60, vMin: s < 0 ? -13 : 0, vMax: s < 0 ? 0 : 13, renk: R.normal
    });
    /* a = f’de b → ±∞: iki kol AYRI çizilir (tek dizide dikey bir çizgiyle
       birleşiyor, f taranırken o çizgi titriyordu). Değerler çerçevenin biraz
       dışında kırpılır, eğri çerçeveden düzgünce çıkar. İmleç de kırpılır:
       görüntü çok uzaktayken grafiğin kenarında kalır, kaybolmaz. */
    const a0 = p.cisimUzaklik, SINIR = 200;
    const kol = [[], []];
    for (let aq = 1; aq <= 150.001; aq += 0.5) {
      if (Math.abs(aq - f) < 1e-6) continue;
      const b = (aq * f) / (aq - f);
      kol[aq < f ? 0 : 1].push({ t: aq, v: Math.max(-1.3 * SINIR, Math.min(1.3 * SINIR, b)) });
    }
    const b0 = Math.abs(a0 - f) < 1e-6 ? SINIR : (a0 * f) / (a0 - f);
    const imlec = { t: a0, v: Math.max(-SINIR, Math.min(SINIR, b0)) };
    const imKol = a0 < f ? 0 : 1;
    let ilk = true;
    kol.forEach((k, i) => {
      if (k.length < 2) return;
      D.miniGrafik(ctx, {
        x: pay * 2 + gw, y: 3, w: gw, h: gh,
        baslik: ilk ? 'b − a   (1/f = 1/a + 1/b · a = f’de b → ∞)' : '', birim: ilk ? 'cm' : '', tEtiket: ilk ? 'a (cm)' : '',
        imlec: i === imKol ? imlec : null,
        veri: k, tMax: 150, vMin: -SINIR, vMax: SINIR, renk: R.kuvvet
      });
      ilk = false;
    });
    return;
  }

  /* f − n₀ : ortamın indisi merceğinkini geçince f işaret değiştirir */
  const fark = ters(p.R1) - ters(p.R2);
  const kol = [[], []];
  for (let n0 = 1.0; n0 <= 1.8001; n0 += 0.005) {
    const guc = (p.n / n0 - 1) * fark;
    if (Math.abs(guc) < 1e-6) continue;
    const fq = 1 / guc;
    if (Math.abs(fq) > 200) continue;
    kol[n0 < p.n ? 0 : 1].push({ t: n0, v: fq });
  }
  const fy = odakYapici(p);
  const cursor = fy === null || Math.abs(fy) > 200 ? null : { t: p.n0, v: fy };
  const ciz = kol.filter(k => k.length > 1);
  if (!ciz.length) ciz.push([]);
  ciz.forEach((k, i) => D.miniGrafik(ctx, {
    x: pay, y: 3, w: gw, h: gh,
    baslik: i ? '' : 'f − n₀   (n₀ = n = ' + D.biçim(p.n, 2) + '’de f = ∞, sonra işaret değiştirir)',
    birim: i ? '' : 'cm', tEtiket: i ? '' : 'n₀ (ortam)',
    imlec: cursor && ((p.n0 < p.n) === (k[0] && k[0].t < p.n)) ? cursor : null,
    veri: k, tMin: 1.0, tMax: 1.8, vMin: -200, vMax: 200, renk: R.ivme
  }));

  /* dioptri − |R₁| (R₁’in işareti korunur) */
  const s1 = p.R1 < 0 ? -1 : 1;
  const v2 = [];
  for (let Rq = 5; Rq <= 60; Rq += 1) {
    const guc = (p.n / p.n0 - 1) * (1 / (s1 * Rq) - ters(p.R2));
    v2.push({ t: Rq, v: guc * 100 });
  }
  let dMin = 0, dMax = 0;
  v2.forEach(d => { if (d.v < dMin) dMin = d.v; if (d.v > dMax) dMax = d.v; });
  D.miniGrafik(ctx, {
    x: pay * 2 + gw, y: 3, w: gw, h: gh,
    baslik: 'Dioptri − |R₁|   (yüzey ne kadar kavisliyse etkisi o kadar büyük)', birim: 'D', tEtiket: '|R₁| (cm)',
    imlec: Math.abs(p.R1) >= 5 ? { t: Math.abs(p.R1), v: dioptri(odakYapici(p)) } : null,
    veri: v2, tMin: 5, tMax: 60, vMin: dMin * 1.05, vMax: Math.max(1, dMax * 1.05), renk: R.normal
  });
}

/* ------------------------------------------------------------ Okumalar */

function okumalar(st, pHam) {
  const p = etkin(st, pHam);
  if (p.mod > 4.5) return okumaSistem(st, p);
  const f = odak(p);
  const ince = f > 0;

  if (p.mod > 3.5) {
    return [
      { et: 'Mercek türü',      dg: ince ? 'İnce kenarlı' : 'Kalın kenarlı', birim: '' },
      { et: 'Odak uzaklığı f',  dg: D.biçim(f, 4), birim: 'cm' },
      { et: 'Gelen ışının açısı α', dg: D.biçim(p.aci, 3), birim: '°' },
      { et: 'Yardımcı odak F′', dg: 'eksenden ' + D.biçim(f * Math.tan(rad(p.aci)), 3), birim: 'cm' },
      { et: 'Kural',            dg: ince ? 'Işın F′’den geçer' : 'Uzantısı F′’den geçer', birim: '' }
    ];
  }

  if (p.mod > 1.5 && p.mod < 2.5) {
    const fy = odakYapici(p);
    return [
      { et: 'Cam indisi n',    dg: D.biçim(p.n, 3), birim: '' },
      { et: 'Ortam indisi n₀', dg: D.biçim(p.n0, 3), birim: '' },
      { et: '1. yüzey R₁',     dg: Math.abs(p.R1) < 1e-9 ? 'düz' : D.biçim(p.R1), birim: Math.abs(p.R1) < 1e-9 ? '' : 'cm' },
      { et: '2. yüzey R₂',     dg: Math.abs(p.R2) < 1e-9 ? 'düz' : D.biçim(p.R2), birim: Math.abs(p.R2) < 1e-9 ? '' : 'cm' },
      { et: '(n/n₀−1)(1/R₁−1/R₂)', dg: D.biçim((p.n / p.n0 - 1) * (ters(p.R1) - ters(p.R2)), 5), birim: '1/cm' },
      { et: 'Odak uzaklığı f', dg: fy === null ? 'Sonsuz' : D.biçim(fy, 4), birim: fy === null ? '' : 'cm' },
      { et: 'Dioptri D',       dg: D.biçim(dioptri(fy), 4), birim: 'D' },
      { et: 'Davranış',        dg: fy === null ? 'Işığı kırmaz' : (fy > 0 ? 'Toplar' : 'Dağıtır') + (p.n < p.n0 ? ' · karakter değişti' : ''), birim: '' }
    ];
  }

  if (p.mod > 2.5) {
    return [
      { et: 'Mercek türü',     dg: ince ? 'İnce kenarlı' : 'Kalın kenarlı', birim: '' },
      { et: 'Odak uzaklığı f', dg: D.biçim(f, 4), birim: 'cm' },
      { et: 'Cisim uzaklığı a',dg: D.biçim(p.cisimUzaklik), birim: 'cm' },
      { et: '1. ışın',         dg: 'Paralel gelir, odaktan geçer', birim: '' },
      { et: '2. ışın',         dg: 'Merkezden geçer, sapmaz', birim: '' },
      { et: '3. ışın',         dg: 'Odaktan gelir, paralel çıkar', birim: '' }
    ];
  }

  return [
    { et: 'Mercek türü',     dg: ince ? 'İnce kenarlı (yakınsak)' : 'Kalın kenarlı (ıraksak)', birim: '' },
    { et: 'Odak uzaklığı f', dg: D.biçim(f, 4), birim: 'cm' },
    { et: 'Dioptri D = 1/f', dg: D.biçim(dioptri(f), 4), birim: 'D' },
    { et: 'Odağın cinsi',    dg: ince ? 'Gerçek' : 'Sanal', birim: '' },
    { et: 'Işığa etkisi',    dg: ince ? 'Toplar' : 'Dağıtır', birim: '' },
    { et: 'Gözlük karşılığı',dg: (dioptri(f) > 0 ? '+' : '') + D.biçim(dioptri(f), 3) + ' numara', birim: '' }
  ];
}

/* ------------------------------------------------------------- Kayıt */

D.simler = D.simler || {};
D.simler['mercekler'] = {
  id: 'mercekler',
  baslik: '3.8.1 · Merceklerin özellikleri · odak, ortam, özel ışınlar, yardımcı eksen',
  yukseklik: 340,
  grafikPanel: true,
  grafikYukseklik: 150,
  parametreler: [
    { anahtar: 'mod', etiket: 'Düzenek', tur: 'secim', deger: 1, secenekler: [
      { d: 1, e: 'Odak noktası' },
      { d: 2, e: 'Mercek yapıcı denklemi' },
      { d: 3, e: 'Dört özel ışın' },
      { d: 4, e: 'Herhangi bir ışın · yardımcı eksen' },
      { d: 5, e: 'Mercek sistemleri · teleskop, göz' }
    ]},
    { anahtar: 'sistem', etiket: 'Sistem (5)', tur: 'secim', deger: 1, secenekler: [
      { d: 1, e: 'Galileo teleskobu' },
      { d: 2, e: 'Miyop göz' },
      { d: 3, e: 'Hipermetrop göz' }
    ]},
    { anahtar: 'gozluk', etiket: 'Gözlük (5)', tur: 'secim', deger: 1, secenekler: [
      { d: 1, e: 'Gözlüksüz' },
      { d: 2, e: 'Gözlüklü' }
    ]},
    { anahtar: 'tur', etiket: 'Mercek türü', tur: 'secim', deger: 1, secenekler: [
      { d: 1, e: 'İnce kenarlı (yakınsak)' },
      { d: 2, e: 'Kalın kenarlı (ıraksak)' }
    ]},
    { anahtar: 'f',            etiket: 'Odak uzaklığı f', min: 8,   max: 60,  adim: 2,   deger: 20,  birim: 'cm' },
    { anahtar: 'n',            etiket: 'Cam indisi n',    min: 1.30, max: 2.00, adim: 0.01, deger: 1.50, birim: '' },
    { anahtar: 'n0',           etiket: 'Ortam indisi n₀', min: 1.00, max: 1.80, adim: 0.01, deger: 1.00, birim: '' },
    { anahtar: 'R1',           etiket: '1. yüzey R₁',     min: -60, max: 60,  adim: 2,   deger: 20,  birim: 'cm' },
    { anahtar: 'R2',           etiket: '2. yüzey R₂',     min: -60, max: 60,  adim: 2,   deger: -20, birim: 'cm' },
    { anahtar: 'isinSayisi',   etiket: 'Işın sayısı',     min: 2,   max: 8,   adim: 1,   deger: 6,   birim: '' },
    { anahtar: 'cisimUzaklik', etiket: 'Cisim uzaklığı',  min: 10,  max: 150, adim: 5,   deger: 60,  birim: 'cm' },
    { anahtar: 'aci',          etiket: 'Gelen ışın açısı', min: -25, max: 25, adim: 1,   deger: 12,  birim: '°' }
  ],
  durum, adim, bitti, cizGercek, cizKlasik, cizGrafik, okumalar
};

})();
