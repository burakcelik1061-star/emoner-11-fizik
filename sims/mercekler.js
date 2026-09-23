(function () {
"use strict";
window.F11 = window.F11 || {};

/* ==========================================================================
   sims/mercekler.js
   --------------------------------------------------------------------------
   Konu 3.9 · Merceklerin özellikleri

   İKİ TÜR
   -------
   · İNCE KENARLI (yakınsak / dışbükey)  → ışığı TOPLAR,  f > 0
   · KALIN KENARLI (ıraksak / içbükey)   → ışığı DAĞITIR, f < 0

   MERCEK YAPICI DENKLEMİ
   ----------------------
       1/f = (n − 1) · (1/R₁ − 1/R₂)

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

   ÜÇ ÖZEL IŞIN
   ------------
   1) Eksene paralel gelen   → odaktan geçer
   2) Odaktan geçerek gelen  → eksene paralel çıkar
   3) Merkezden geçen        → sapmadan devam eder
   ========================================================================== */

const D = window.F11;
const { R, K } = D;

/* ------------------------------------------------------------- Fizik */

function ters(x) { return Math.abs(x) < 1e-9 ? 0 : 1 / x; }

/** Mercek yapıcı denklemi — odak uzaklığı (cm). Düzlemse null (f = ∞). */
function odakYapici(p) {
  const guc = (p.n - 1) * (ters(p.R1) - ters(p.R2));
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

function durum(p) { return { t: 0, f: p.f, n: p.n, cisimUzaklik: p.cisimUzaklik }; }

function fHedef(p) { return p.f < 34 ? 60 : 8; }
function nHedef(p) { return p.n < 1.65 ? 2.0 : 1.3; }
function aHedef(p) { return p.cisimUzaklik < 80 ? 150 : 12; }

/* Her düzenekte YALNIZ o düzeneğin anahtar büyüklüğü taranır:
   1) f  ·  2) n (yapıcı denklemden f değişir)  ·  3) cisim uzaklığı.
   1. ve 3. düzenekte f doğrudan verildiği için n’yi taramak hiçbir şeyi
   değiştirmez; bu yüzden orada taranmaz. */
function adim(st, dt, p) {
  st.t += dt;
  if (p.mod < 1.5)      st.f = D.tarama(st.t, p.f, fHedef(p), TARAMA_PERIYOT);
  else if (p.mod < 2.5) st.n = D.tarama(st.t, p.n, nHedef(p), TARAMA_PERIYOT);
  else                  st.cisimUzaklik = D.tarama(st.t, p.cisimUzaklik, aHedef(p), TARAMA_PERIYOT);
}

function bitti() { return false; }

function etkin(st, p) {
  return Object.assign({}, p, { f: st.f ?? p.f, n: st.n ?? p.n, cisimUzaklik: st.cisimUzaklik ?? p.cisimUzaklik });
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
    const f1 = odakYapici(Object.assign({}, ham, { n: ham.n }));
    const f2 = odakYapici(Object.assign({}, ham, { n: nHedef(ham) }));
    const adaylar = [f1, f2].filter(x => x !== null).map(Math.abs);
    fOlcek = adaylar.length ? Math.min(150, Math.max(...adaylar)) : 60;
  } else fOlcek = Math.abs(f);
  let olcek = Math.min((w * 0.40) / Math.max(6, fOlcek * 1.3), 6.0);
  if (p.mod > 2.5) {
    /* cisim, taramanın en uzak noktasında da panelde kalsın */
    const aMax = Math.max(ham.cisimUzaklik, aHedef(ham));
    olcek = Math.min(olcek, (w * 0.44) / aMax);
  }
  return { f, duz, cy, mx, boy, olcek, ince: !duz && f > 0 };
}

function cizMercekVeOdaklar(ctx, w, h, y, p) {
  D.kesikliCizgi(ctx, w * 0.02, y.cy, w * 0.98, y.cy, 'rgba(150,170,200,.55)', 1.4, [7, 5]);
  if (y.duz) {
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
  if (icerde(y.mx + fp)) isaret(ctx, y.mx + fp, y.cy, y.ince ? 'F' : 'F′', R.ivme);
  if (icerde(y.mx - fp)) isaret(ctx, y.mx - fp, y.cy, y.ince ? 'F′' : 'F', R.ivme);

  if (icerde(y.mx + fp))
    D.olcu(ctx, y.mx, y.cy + h * 0.30, y.mx + fp, y.cy + h * 0.30,
           'f = ' + D.biçim(Math.abs(y.f), 4) + ' cm', R.ivme);
  else
    D.yaziAydinlik(ctx, 'f = ' + D.biçim(Math.abs(y.f), 4) + ' cm — odak panelin dışında',
                   y.mx, y.cy + h * 0.30, R.ivme, '700 11px system-ui, sans-serif', 'center');
  D.yaziAydinlik(ctx, y.ince ? 'İnce kenarlı · f > 0' : 'Kalın kenarlı · f < 0',
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
  const y = yerlesim(w, h, p, pHam);
  cizMercekVeOdaklar(ctx, w, h, y, p);

  if (p.mod > 2.5) { cizOzelIsinlar(ctx, w, h, y, p); return; }
  cizParalelIsinlar(ctx, w, h, y, p);

  if (p.mod > 1.5) {
    /* yapıcı denklemin terimleri */
    D.yaziAydinlik(ctx,
      'R₁ = ' + (Math.abs(p.R1) < 1e-9 ? 'düz' : D.biçim(p.R1) + ' cm') +
      '   R₂ = ' + (Math.abs(p.R2) < 1e-9 ? 'düz' : D.biçim(p.R2) + ' cm') +
      '   n = ' + D.biçim(p.n, 3),
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
    const yy = y.cy + oran * y.boy * 0.42;

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

  D.yaziAydinlik(ctx,
    '1 · paralel ⟹ odaktan   2 · merkezden ⟹ sapmaz   3 · odaktan ⟹ paralel',
    10, h - 10, R.surtunme, '700 12px system-ui, sans-serif', 'left');
}

function cikan(ctx, px, py, qx, qy, sag, renk) {
  const dx = qx - px;
  if (Math.abs(dx) < 1e-6) return;
  const m = (qy - py) / dx;
  D.isin(ctx, px, py, sag, py + m * (sag - px), renk, 2, true);
  if (qx < px) D.sanalIsin(ctx, px, py, qx, qy, 'rgba(180,200,230,.8)');
}

/* ------------------------------------------ Klasik fizik görünümü */

function cizKlasik(ctx, w, h, st, pHam) {
  const p = etkin(st, pHam);
  D.izgara(ctx, w, h, 26);
  const f = odak(p);
  const ince = f > 0;

  D.yaziHaleli(ctx, ince ? 'İnce kenarlı (yakınsak)' : 'Kalın kenarlı (ıraksak)',
               12, 22, K.beyaz, '700 12px system-ui, sans-serif', 'left');

  if (p.mod > 1.5 && p.mod < 2.5) {
    const fy = odakYapici(p);
    const sol = [
      ['1/f = (n−1)·(1/R₁ − 1/R₂)', K.beyaz, '700 13px system-ui, sans-serif'],
      ['', K.metin2, '11px'],
      ['n = ' + D.biçim(p.n, 3) + '  ⟹  n−1 = ' + D.biçim(p.n - 1, 3),
        R.normal, '12px system-ui, sans-serif'],
      ['1/R₁ = ' + (Math.abs(p.R1) < 1e-9 ? '0 (düz)' : D.biçim(ters(p.R1), 5)),
        R.ivme, '12px system-ui, sans-serif'],
      ['1/R₂ = ' + (Math.abs(p.R2) < 1e-9 ? '0 (düz)' : D.biçim(ters(p.R2), 5)),
        R.kuvvet, '12px system-ui, sans-serif'],
      ['fark = ' + D.biçim(ters(p.R1) - ters(p.R2), 5), K.metin2, '11px system-ui, sans-serif'],
      ['', K.metin2, '11px'],
      ['f = ' + (fy === null ? 'sonsuz' : D.biçim(fy, 4) + ' cm'),
        R.hiz, '700 14px system-ui, sans-serif'],
      ['D = 1/f = ' + D.biçim(dioptri(fy), 4) + ' dioptri', R.normal, '700 13px system-ui, sans-serif']
    ];
    let sy = 46;
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
      ['Mercek sistemleri', K.beyaz, '700 12px system-ui, sans-serif'],
      ['D = D₁ + D₂', R.ivme, '700 12px system-ui, sans-serif'],
      ['Dioptriler doğrudan toplanır', K.metin2, '11px system-ui, sans-serif'],
      ['', K.metin2, '11px'],
      ['n büyürse f küçülür ⟹ güçlenir', R.surtunme, '11px system-ui, sans-serif'],
      ['R küçülürse f küçülür ⟹ güçlenir', R.surtunme, '11px system-ui, sans-serif']
    ];
    sy = 46;
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
    let sy = 46;
    satir.forEach(([t, c, fo]) => { if (t) D.yaziHaleli(ctx, t, w * 0.30, sy, c, fo, 'left'); sy += 17; });
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
  let sy = 46;
  satir.forEach(([t, c, fo]) => { if (t) D.yaziHaleli(ctx, t, w * 0.34, sy, c, fo, 'left'); sy += 17; });
}

/* ---------------------------------------------------- Grafik paneli */

function cizGrafik(ctx, w, h, st, pHam) {
  const p = etkin(st, pHam);
  const pay = 8, gw = (w - pay * 3) / 2, gh = h - 6;

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
    const a0 = p.cisimUzaklik;
    const d2 = [];
    for (let aq = 2; aq <= 150; aq += 1) {
      if (Math.abs(aq - f) < 1.5) continue;
      const b = (aq * f) / (aq - f);
      if (Math.abs(b) <= 200) d2.push({ t: aq, v: b });
    }
    const b0 = Math.abs(a0 - f) < 1e-6 ? null : (a0 * f) / (a0 - f);
    D.miniGrafik(ctx, {
      x: pay * 2 + gw, y: 3, w: gw, h: gh,
      baslik: 'b − a   (1/f = 1/a + 1/b · bu merceğin görüntü uzaklığı)', birim: 'cm', tEtiket: 'a (cm)',
      imlec: b0 === null || Math.abs(b0) > 200 ? null : { t: a0, v: b0 },
      veri: d2, tMax: 150, vMin: -200, vMax: 200, renk: R.kuvvet
    });
    return;
  }

  /* f − n (merceğin biçimi sabit, cam değişiyor) */
  const sk = Math.sign(ters(p.R1) - ters(p.R2)) || 1;       // + toplayıcı, − dağıtıcı biçim
  const v1 = [];
  for (let n = 1.3; n <= 2.0; n += 0.01) {
    const guc = (n - 1) * (ters(p.R1) - ters(p.R2));
    if (Math.abs(guc) < 1e-6) continue;
    const f = 1 / guc;
    if (Math.abs(f) > 200) continue;
    v1.push({ t: n, v: f });
  }
  D.miniGrafik(ctx, {
    x: pay, y: 3, w: gw, h: gh,
    baslik: v1.length ? 'f − n   (n büyüdükçe |f| küçülür · mercek GÜÇLENİR)' : 'f − n   (R₁ = R₂: güç sıfır, f = ∞)',
    birim: 'cm', tEtiket: 'n',
    imlec: (() => { const fy = odakYapici(p); return (fy === null || Math.abs(fy) > 200) ? null : { t: p.n, v: fy }; })(),
    veri: v1, tMin: 1.3, tMax: 2.0, vMin: sk < 0 ? -200 : 0, vMax: sk < 0 ? 0 : 200, renk: R.ivme
  });

  /* dioptri − |R₁| (R₁’in işareti korunur) */
  const s1 = p.R1 < 0 ? -1 : 1;
  const v2 = [];
  for (let Rq = 5; Rq <= 60; Rq += 1) {
    const guc = (p.n - 1) * (1 / (s1 * Rq) - ters(p.R2));
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
  const f = odak(p);
  const ince = f > 0;

  if (p.mod > 1.5 && p.mod < 2.5) {
    const fy = odakYapici(p);
    return [
      { et: 'Cam indisi n',    dg: D.biçim(p.n, 3), birim: '' },
      { et: '1. yüzey R₁',     dg: Math.abs(p.R1) < 1e-9 ? 'düz' : D.biçim(p.R1), birim: Math.abs(p.R1) < 1e-9 ? '' : 'cm' },
      { et: '2. yüzey R₂',     dg: Math.abs(p.R2) < 1e-9 ? 'düz' : D.biçim(p.R2), birim: Math.abs(p.R2) < 1e-9 ? '' : 'cm' },
      { et: '(n−1)(1/R₁−1/R₂)',dg: D.biçim((p.n - 1) * (ters(p.R1) - ters(p.R2)), 5), birim: '1/cm' },
      { et: 'Odak uzaklığı f', dg: fy === null ? 'Sonsuz' : D.biçim(fy, 4), birim: fy === null ? '' : 'cm' },
      { et: 'Dioptri D',       dg: D.biçim(dioptri(fy), 4), birim: 'D' },
      { et: 'Mercek türü',     dg: fy === null ? 'Düz cam' : (fy > 0 ? 'İnce kenarlı · toplayıcı' : 'Kalın kenarlı · dağıtıcı'), birim: '' }
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
  baslik: '3.9 · Mercekler · odak, yapıcı denklem, özel ışınlar',
  yukseklik: 340,
  grafikPanel: true,
  grafikYukseklik: 150,
  parametreler: [
    { anahtar: 'mod', etiket: 'Düzenek', tur: 'secim', deger: 1, secenekler: [
      { d: 1, e: 'Odak noktası' },
      { d: 2, e: 'Mercek yapıcı denklemi' },
      { d: 3, e: 'Üç özel ışın' }
    ]},
    { anahtar: 'tur', etiket: 'Mercek türü', tur: 'secim', deger: 1, secenekler: [
      { d: 1, e: 'İnce kenarlı (yakınsak)' },
      { d: 2, e: 'Kalın kenarlı (ıraksak)' }
    ]},
    { anahtar: 'f',            etiket: 'Odak uzaklığı f', min: 8,   max: 60,  adim: 2,   deger: 20,  birim: 'cm' },
    { anahtar: 'n',            etiket: 'Cam indisi n',    min: 1.30, max: 2.00, adim: 0.01, deger: 1.50, birim: '' },
    { anahtar: 'R1',           etiket: '1. yüzey R₁',     min: -60, max: 60,  adim: 2,   deger: 20,  birim: 'cm' },
    { anahtar: 'R2',           etiket: '2. yüzey R₂',     min: -60, max: 60,  adim: 2,   deger: -20, birim: 'cm' },
    { anahtar: 'isinSayisi',   etiket: 'Işın sayısı',     min: 2,   max: 8,   adim: 1,   deger: 6,   birim: '' },
    { anahtar: 'cisimUzaklik', etiket: 'Cisim uzaklığı',  min: 10,  max: 150, adim: 5,   deger: 60,  birim: 'cm' }
  ],
  durum, adim, bitti, cizGercek, cizKlasik, cizGrafik, okumalar
};

})();
