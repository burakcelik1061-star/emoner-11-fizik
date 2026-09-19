(function () {
"use strict";
window.F11 = window.F11 || {};

/* ==========================================================================
   sims/gorunur-derinlik.js
   --------------------------------------------------------------------------
   Konu 3.6 · Görünür derinlik

   TEMEL BAĞINTI (eksene yakın bakış · paraksiyel)
   -----------------------------------------------
       h′ / h = n_gözlemci / n_cisim

   · Cisim suda, gözlemci havada:  h′ = h / n     ⟹ SIĞ görünür
   · Cisim havada, gözlemci suda:  h′ = h · n     ⟹ YÜKSEK görünür

   Görünür yükselme (kalkma) miktarı:

       Δ = h − h′ = h·(1 − 1/n)

   TAM BAĞINTI (bu dosyada kullanılan)
   -----------------------------------
   Belli bir θ₁ bakış açısı için, ışının geri uzantısının düşey ekseni
   kestiği derinlik:

       h′ = h · tan θ₁ / tan θ₂          (n₁ sin θ₁ = n₂ sin θ₂)

   θ₁ → 0 için bu ifade h·n₂/n₁ değerine gider. Eğik bakıldığında cisim
   daha da sığ görünür — havuz kenarından bakınca dibin "kalkmasının"
   sebebi budur. Simülasyon her iki değeri de yan yana gösterir.

   CAM LEVHADA YANAL KAYMA
   -----------------------
       d = t · sin(θ₁ − θ₂) / cos θ₂

   Paralel yüzlü levhada çıkan ışın, gelen ışına DAİMA paraleldir; yalnızca
   yana kayar. Kayma, levha kalınlığı ve gelme açısıyla artar.
   ========================================================================== */

const D = window.F11;
const { R, K } = D;

/* ------------------------------------------------------------- Fizik */

function rad(d) { return (d * Math.PI) / 180; }
function der(r) { return (r * 180) / Math.PI; }

/** Cismin bulunduğu ve gözlemcinin bulunduğu ortamın indisleri. */
function indisler(p) {
  return p.mod < 1.5 ? { nC: p.n, nG: 1.00 }      // cisim suda, göz havada
                     : { nC: 1.00, nG: p.n };     // cisim havada, göz suda
}

/** Snell — kırılma açısı (rad). Tam yansıma varsa null. */
function kirilma(nC, nG, t1) {
  const s = (nC / nG) * Math.sin(t1);
  return Math.abs(s) > 1 ? null : Math.asin(s);
}

/** Paraksiyel görünür derinlik (cm). */
function paraksiyel(p) {
  const { nC, nG } = indisler(p);
  return (p.h * nG) / nC;
}

/** Seçilen bakış açısındaki TAM görünür derinlik (cm). */
function tamGorunur(p) {
  const { nC, nG } = indisler(p);
  const t1 = rad(p.aci);
  if (p.aci < 0.5) return paraksiyel(p);
  const t2 = kirilma(nC, nG, t1);
  if (t2 === null) return null;                   // tam yansıma
  return (p.h * Math.tan(t1)) / Math.tan(t2);
}

/** Cam levhada yanal kayma (cm). */
function yanalKayma(p) {
  const t1 = rad(p.aci);
  const t2 = Math.asin(Math.sin(t1) / p.n);
  return (p.kalinlik * Math.sin(t1 - t2)) / Math.cos(t2);
}

function levhaKirilma(p) {
  return Math.asin(Math.sin(rad(p.aci)) / p.n);
}

/* -------------------------------------------------------------- Durum */

/* Oynat'a basılınca düzeneğin anahtar büyüklüğü taranır; kaydırıcı taramanın
   BAŞLADIĞI değeri verir. Böylece her düzenekte bir şeyin nasıl değiştiği
   canlı görünür. */
const TARAMA_PERIYOT = 12;

function durum(p) { return { t: 0, h: p.h, aci: p.aci }; }

function adim(st, dt, p) {
  st.t += dt;
  if (p.mod > 2.5) st.aci = D.tarama(st.t, p.aci, p.aci < 35 ? 70 : 2, TARAMA_PERIYOT);
  else             st.h   = D.tarama(st.t, p.h, p.h < 105 ? 200 : 10, TARAMA_PERIYOT);
}

function bitti() { return false; }

function etkin(st, p) {
  return Object.assign({}, p, { h: st.h ?? p.h, aci: st.aci ?? p.aci });
}

/* --------------------------------------------- Gerçekçi görünüm */

function cizGercek(ctx, w, h, st, pHam) {
  const p = etkin(st, pHam);
  if (p.mod > 2.5) { cizLevha(ctx, w, h, p); return; }

  const suUst = p.mod < 1.5 ? h * 0.30 : h * 0.62;
  const { nC, nG } = indisler(p);

  /* ortamlar — üstteki etiket panel rozetinin altında kalmasın diye sağa yazılır */
  D.ortam(ctx, 0, 0, w, suUst, '', 'rgba(60,140,205,.07)');
  D.ortam(ctx, 0, suUst, w, h - suUst,
          'su · n = ' + D.biçim(p.n, 3), 'rgba(60,140,205,.30)');
  D.yaziAydinlik(ctx, 'hava · n = 1,00', w - 10, 18, '#1B3A52',
                 '700 12px system-ui, sans-serif', 'right');

  /* Cismin bulunduğu taraf ölçeği, gözün bulunduğu taraf ışın uzunluğunu belirler.
     Bu ikisi karıştırılırsa gözlemci ve ışınlar panelin dışına taşar. */
  const bosluk   = p.mod < 1.5 ? h - suUst : suUst;          // cismin tarafı
  const gozTaraf = p.mod < 1.5 ? suUst : h - suUst;          // gözün tarafı
  const olcek = Math.min((bosluk * 0.74) / Math.max(1, p.h), 2.2);
  const cx = w * 0.30;
  const yon = p.mod < 1.5 ? +1 : -1;               // cisim aşağıda mı yukarıda mı
  const cisimY = suUst + yon * p.h * olcek;

  /* gerçek cisim */
  D.noktaCisim(ctx, cx, cisimY, 7, R.hiz);
  D.yaziAydinlik(ctx, 'gerçek yer', cx, cisimY + (yon > 0 ? 22 : -16), R.hiz,
                 '700 12px system-ui, sans-serif', 'center');

  /* iki ışın: eksene yakın (referans) ve seçilen açı */
  const t1 = rad(Math.max(0.6, p.aci));
  const t2 = kirilma(nC, nG, t1);
  const gorunur = tamGorunur(p);

  if (t2 === null) {
    D.yaziAydinlik(ctx, 'Bu açıda TAM YANSIMA — ışık yüzeyden çıkamıyor',
                   w * 0.5, h * 0.94, R.kuvvet, '700 13px system-ui, sans-serif', 'center');
  }

  /* ışın 1: düşey (eksene yakın) */
  D.isin(ctx, cx, cisimY, cx, suUst, R.ivme, 1.8, false);
  D.isin(ctx, cx, suUst, cx, suUst - yon * gozTaraf * 0.72, R.ivme, 1.8, true);

  /* ışın 2: θ₁ açısıyla */
  const yatay = Math.abs(cisimY - suUst) * Math.tan(t1);
  const kx = cx + yatay;
  D.isin(ctx, cx, cisimY, kx, suUst, R.ivme, 2.4, true);

  if (t2 !== null) {
    const uz = gozTaraf * 0.72;
    const ex = kx + uz * Math.tan(t2), ey = suUst - yon * uz;
    D.isin(ctx, kx, suUst, ex, ey, R.ivme, 2.4, true);

    /* geri uzantı ve görünür konum */
    const gY = suUst + yon * gorunur * olcek;
    D.sanalIsin(ctx, kx, suUst, cx, gY, 'rgba(226,75,74,.85)');
    D.noktaCisim(ctx, cx, gY, 7, R.kuvvet);
    D.yaziAydinlik(ctx, 'görünen yer', cx + 14, gY + (yon > 0 ? 4 : 0), R.kuvvet,
                   '700 12px system-ui, sans-serif', 'left');

    /* kalkma ölçüsü */
    D.olcu(ctx, cx - 40, cisimY, cx - 40, gY,
           D.biçim(Math.abs(p.h - gorunur), 3) + ' cm', R.kuvvet);
  }

  /* normal ve açılar */
  D.kesikliCizgi(ctx, kx, suUst - gozTaraf * 0.55, kx, suUst + bosluk * 0.45,
                 '#4A5F86', 1.3, [5, 4]);

  /* derinlik ölçüsü */
  D.olcu(ctx, w * 0.80, suUst, w * 0.80, cisimY,
         (p.mod < 1.5 ? 'h = ' : 'H = ') + D.biçim(p.h) + ' cm', R.hiz);

  /* gözlemci — daima gözün bulunduğu ortamın içinde */
  const gozY = p.mod < 1.5 ? suUst * 0.55 : suUst + (h - suUst) * 0.58;
  D.insan(ctx, w * 0.91, gozY + 14, 1.0);

  /* özet */
  const ph = paraksiyel(p);
  D.yaziAydinlik(ctx,
    'Dik bakışta: ' + D.biçim(ph, 4) + ' cm   ·   ' + D.biçim(p.aci) + '° bakışta: ' +
    (gorunur === null ? '—' : D.biçim(gorunur, 4) + ' cm'),
    10, h - 10, R.surtunme, '700 12px system-ui, sans-serif', 'left');
}

/* ---- Mod 3 · Cam levhada yanal kayma ---- */

function cizLevha(ctx, w, h, p) {
  const t1 = rad(p.aci), t2 = levhaKirilma(p);
  const kal = Math.min(h * 0.46, p.kalinlik * 9);
  const ust = h * 0.28, alt = ust + kal;
  const gx = w * 0.40;

  D.ortam(ctx, 0, ust, w, kal, 'cam · n = ' + D.biçim(p.n, 3), 'rgba(60,140,205,.26)');
  D.yaziAydinlik(ctx, 'hava', 12, ust - 12, '#4A5F86', '600 11px system-ui, sans-serif', 'left');
  D.yaziAydinlik(ctx, 'hava', 12, alt + 20, '#4A5F86', '600 11px system-ui, sans-serif', 'left');

  /* normaller */
  D.kesikliCizgi(ctx, gx, ust - 52, gx, ust + 52, '#4A5F86', 1.3, [5, 4]);
  const cx2 = gx + kal * Math.tan(t2);
  D.kesikliCizgi(ctx, cx2, alt - 52, cx2, alt + 52, '#4A5F86', 1.3, [5, 4]);

  /* gelen ışın */
  const L = Math.min(w * 0.30, 150);
  D.isin(ctx, gx - L * Math.sin(t1), ust - L * Math.cos(t1), gx, ust, R.ivme, 2.6, true);
  D.aciYayi(ctx, gx, ust, 38, -Math.PI / 2, -Math.PI / 2 - t1,
            R.ivme, D.biçim(p.aci) + '°');

  /* levha içi */
  D.isin(ctx, gx, ust, cx2, alt, R.kuvvet, 2.6, true);
  D.aciYayi(ctx, gx, ust, 56, Math.PI / 2, Math.PI / 2 - t2,
            R.kuvvet, D.biçim(der(t2), 3) + '°');

  /* çıkan ışın — gelen ışına PARALEL */
  D.isin(ctx, cx2, alt, cx2 + L * Math.sin(t1), alt + L * Math.cos(t1), R.ivme, 2.6, true);

  /* sapmasaydı nereye giderdi */
  const sx = gx + (kal + L * Math.cos(t1)) * Math.tan(t1);
  D.sanalIsin(ctx, gx, ust, sx, alt + L * Math.cos(t1), 'rgba(167,139,250,.85)');
  D.yaziAydinlik(ctx, 'levha olmasaydı', sx + 6, alt + L * Math.cos(t1) - 6,
                 R.surtunme, '600 11px system-ui, sans-serif', 'left');

  /* kayma ölçüsü — çıkan ışına dik */
  const d = yanalKayma(p);
  const dpx = d * (kal / Math.max(0.01, p.kalinlik));
  const mx = cx2 + L * 0.45 * Math.sin(t1), my = alt + L * 0.45 * Math.cos(t1);
  D.olcu(ctx, mx, my, mx + dpx * Math.cos(t1), my - dpx * Math.sin(t1),
         'd = ' + D.biçim(d, 3) + ' cm', R.surtunme);

  D.yaziAydinlik(ctx, 'Çıkan ışın gelen ışına PARALELDİR — yalnızca yana kayar',
                 w * 0.5, h - 10, R.surtunme, '700 12px system-ui, sans-serif', 'center');
}

/* ------------------------------------------ Klasik fizik görünümü */

function cizKlasik(ctx, w, h, st, pHam) {
  const p = etkin(st, pHam);
  D.izgara(ctx, w, h, 26);

  if (p.mod > 2.5) {
    D.yaziHaleli(ctx, 'Paralel yüzlü levha', 12, 22, K.beyaz,
                 '700 12px system-ui, sans-serif', 'left');
    const t2 = levhaKirilma(p);
    const satir = [
      ['d = t · sin(θ₁ − θ₂) / cos θ₂', K.beyaz, '700 13px system-ui, sans-serif'],
      ['', K.metin2, '11px'],
      ['t = ' + D.biçim(p.kalinlik) + ' cm', R.normal, '12px system-ui, sans-serif'],
      ['θ₁ = ' + D.biçim(p.aci) + '°', R.ivme, '12px system-ui, sans-serif'],
      ['θ₂ = ' + D.biçim(der(t2), 4) + '°', R.kuvvet, '12px system-ui, sans-serif'],
      ['θ₁ − θ₂ = ' + D.biçim(p.aci - der(t2), 4) + '°', K.metin2, '11px system-ui, sans-serif'],
      ['d = ' + D.biçim(yanalKayma(p), 4) + ' cm', R.surtunme, '700 14px system-ui, sans-serif'],
      ['', K.metin2, '11px'],
      ['Çıkan ışın gelene PARALEL', R.hiz, '700 12px system-ui, sans-serif'],
      ['çünkü iki yüzey de paralel:', K.metin2, '11px system-ui, sans-serif'],
      ['1·sinθ₁ = n·sinθ₂ = 1·sinθ₃', K.metin2, '11px system-ui, sans-serif'],
      ['⟹ θ₃ = θ₁', K.beyaz, '700 12px system-ui, sans-serif'],
      ['', K.metin2, '11px'],
      ['θ₁ = 0 ⟹ d = 0 (kayma yok)', R.surtunme, '11px system-ui, sans-serif']
    ];
    let sy = 46;
    satir.forEach(([t, c, f]) => { if (t) D.yaziHaleli(ctx, t, w * 0.34, sy, c, f, 'left'); sy += 17; });
    return;
  }

  const { nC, nG } = indisler(p);
  const ph = paraksiyel(p);
  const tg = tamGorunur(p);

  D.yaziHaleli(ctx, p.mod < 1.5 ? 'Havadan suya bakış' : 'Sudan havaya bakış',
               12, 22, K.beyaz, '700 12px system-ui, sans-serif', 'left');

  const sol = [
    ['h′/h = n_göz / n_cisim', K.beyaz, '700 13px system-ui, sans-serif'],
    ['', K.metin2, '11px'],
    ['n_cisim = ' + D.biçim(nC, 3), R.hiz, '12px system-ui, sans-serif'],
    ['n_göz   = ' + D.biçim(nG, 3), R.ivme, '12px system-ui, sans-serif'],
    ['h = ' + D.biçim(p.h) + ' cm', R.hiz, '700 13px system-ui, sans-serif'],
    ['', K.metin2, '11px'],
    ['Dik bakışta (paraksiyel)', K.beyaz, '700 12px system-ui, sans-serif'],
    ['h′ = ' + D.biçim(ph, 4) + ' cm', R.kuvvet, '700 14px system-ui, sans-serif'],
    ['Kalkma = ' + D.biçim(Math.abs(p.h - ph), 4) + ' cm', R.surtunme, '12px system-ui, sans-serif']
  ];
  let sy = 46;
  sol.forEach(([t, c, f]) => { if (t) D.yaziHaleli(ctx, t, 12, sy, c, f, 'left'); sy += 17; });

  const sx = w * 0.52;
  const t2 = kirilma(nC, nG, rad(Math.max(0.6, p.aci)));
  const sag = [
    ['Eğik bakışta (tam bağıntı)', K.beyaz, '700 12px system-ui, sans-serif'],
    ['h′ = h · tanθ₁ / tanθ₂', K.metin, '12px system-ui, sans-serif'],
    ['', K.metin2, '11px'],
    ['θ₁ = ' + D.biçim(p.aci) + '°', R.ivme, '12px system-ui, sans-serif'],
    ['θ₂ = ' + (t2 === null ? 'tam yansıma' : D.biçim(der(t2), 4) + '°'),
      R.kuvvet, '12px system-ui, sans-serif'],
    ['h′ = ' + (tg === null ? '—' : D.biçim(tg, 4) + ' cm'),
      R.kuvvet, '700 14px system-ui, sans-serif'],
    ['', K.metin2, '11px'],
    [p.mod < 1.5 ? 'Eğik bakışta daha SIĞ' : 'Eğik bakışta daha YÜKSEK',
      R.surtunme, '700 12px system-ui, sans-serif'],
    ['Ders düzeyinde h′ = h/n yeter;', K.metin2, '11px system-ui, sans-serif'],
    ['o, dik bakışın sonucudur.', K.metin2, '11px system-ui, sans-serif']
  ];
  sy = 46;
  sag.forEach(([t, c, f]) => { if (t) D.yaziHaleli(ctx, t, sx, sy, c, f, 'left'); sy += 17; });
}

/* ---------------------------------------------------- Grafik paneli */

function cizGrafik(ctx, w, h, st, pHam) {
  const p = etkin(st, pHam);
  const pay = 8, gw = (w - pay * 3) / 2, gh = h - 6;

  if (p.mod > 2.5) {
    const v1 = [];
    for (let a = 0; a <= 85; a += 1) {
      const t1 = rad(a), t2 = Math.asin(Math.sin(t1) / p.n);
      v1.push({ t: a, v: (p.kalinlik * Math.sin(t1 - t2)) / Math.cos(t2) });
    }
    D.miniGrafik(ctx, {
      x: pay, y: 3, w: gw, h: gh,
      baslik: 'Yanal kayma − θ₁   (0°’de sıfır)', birim: 'cm', tEtiket: 'θ₁ (°)',
      veri: v1, tMax: 85, vMin: 0, vMax: p.kalinlik * 1.05, renk: R.surtunme
    });

    const v2 = [];
    for (let t = 1; t <= 20; t += 0.5) {
      const t1 = rad(p.aci), t2 = levhaKirilma(p);
      v2.push({ t, v: (t * Math.sin(t1 - t2)) / Math.cos(t2) });
    }
    D.miniGrafik(ctx, {
      x: pay * 2 + gw, y: 3, w: gw, h: gh,
      baslik: 'Yanal kayma − kalınlık   (DOĞRU orantı)', birim: 'cm', tEtiket: 't (cm)',
      veri: v2, tMax: 20, vMin: 0, vMax: Math.max(0.5, yanalKayma(p) * 20 / p.kalinlik * 1.05),
      renk: R.normal
    });
    return;
  }

  /* h′ − n */
  const v1 = [];
  for (let n = 1.0; n <= 2.5; n += 0.02) {
    const q = { mod: p.mod, n, h: p.h, aci: 0 };
    v1.push({ t: n, v: paraksiyel(q) });
  }
  D.miniGrafik(ctx, {
    x: pay, y: 3, w: gw, h: gh,
    baslik: p.mod < 1.5 ? 'h′ − n   (h′ = h/n · TERS orantı)' : 'h′ − n   (h′ = h·n · DOĞRU orantı)',
    birim: 'cm', tEtiket: 'n',
    imlec: { t: p.n, v: paraksiyel(p) },
    veri: v1, tMin: 1.0, tMax: 2.5, vMin: 0,
    vMax: Math.max(p.h * 1.05, paraksiyel({ mod: p.mod, n: 2.5, h: p.h })) * 1.05,
    renk: R.kuvvet
  });

  /* h′ − bakış açısı */
  const v2 = [];
  for (let a = 0; a <= 80; a += 1) {
    const q = { mod: p.mod, n: p.n, h: p.h, aci: a };
    const g = tamGorunur(q);
    if (g === null) break;
    v2.push({ t: a, v: g });
  }
  D.miniGrafik(ctx, {
    x: pay * 2 + gw, y: 3, w: gw, h: gh,
    baslik: 'h′ − bakış açısı   (eğildikçe değişir)', birim: 'cm', tEtiket: 'θ₁ (°)',
    imlec: (() => { const g = tamGorunur(p); return g === null ? null : { t: p.aci, v: g }; })(),
    veri: v2, tMax: 80, vMin: 0,
    vMax: Math.max(p.h, paraksiyel(p)) * 1.15, renk: R.ivme
  });
}

/* ------------------------------------------------------------ Okumalar */

function okumalar(st, pHam) {
  const p = etkin(st, pHam);
  if (p.mod > 2.5) {
    const t2 = levhaKirilma(p);
    return [
      { et: 'Levha indisi n',  dg: D.biçim(p.n, 3),            birim: '' },
      { et: 'Kalınlık t',      dg: D.biçim(p.kalinlik),        birim: 'cm' },
      { et: 'Gelme açısı θ₁',  dg: D.biçim(p.aci),             birim: '°' },
      { et: 'Kırılma açısı θ₂',dg: D.biçim(der(t2), 4),        birim: '°' },
      { et: 'Yanal kayma d',   dg: D.biçim(yanalKayma(p), 4),  birim: 'cm' },
      { et: 'Çıkış açısı θ₃',  dg: D.biçim(p.aci),             birim: '° · gelenle aynı' }
    ];
  }

  const { nC, nG } = indisler(p);
  const ph = paraksiyel(p);
  const tg = tamGorunur(p);

  return [
    { et: 'Cismin ortamı',   dg: 'n = ' + D.biçim(nC, 3), birim: '' },
    { et: 'Gözün ortamı',    dg: 'n = ' + D.biçim(nG, 3), birim: '' },
    { et: p.mod < 1.5 ? 'Gerçek derinlik h' : 'Gerçek yükseklik H', dg: D.biçim(p.h), birim: 'cm' },
    { et: 'Dik bakışta h′',  dg: D.biçim(ph, 4), birim: 'cm' },
    { et: 'Kalkma h − h′',   dg: D.biçim(Math.abs(p.h - ph), 4), birim: 'cm' },
    { et: D.biçim(p.aci) + '° bakışta h′',
      dg: tg === null ? 'Tam yansıma' : D.biçim(tg, 4), birim: tg === null ? '' : 'cm' },
    { et: 'Sonuç',
      dg: p.mod < 1.5 ? 'Cisim SIĞ görünür' : 'Cisim YÜKSEK görünür', birim: '' }
  ];
}

/* ------------------------------------------------------------- Kayıt */

D.simler = D.simler || {};
D.simler['gorunur-derinlik'] = {
  id: 'gorunur-derinlik',
  baslik: '3.6 · Görünür derinlik · h′ = h·n_göz/n_cisim',
  yukseklik: 340,
  grafikPanel: true,
  grafikYukseklik: 150,
  parametreler: [
    { anahtar: 'mod', etiket: 'Düzenek', tur: 'secim', deger: 1, secenekler: [
      { d: 1, e: 'Cisim suda · havadan bakış' },
      { d: 2, e: 'Cisim havada · sudan bakış' },
      { d: 3, e: 'Cam levhada yanal kayma' }
    ]},
    { anahtar: 'n',        etiket: 'Ortamın indisi n', min: 1.05, max: 2.50, adim: 0.01, deger: 1.33, birim: '' },
    { anahtar: 'h',        etiket: 'Gerçek derinlik / yükseklik', min: 10, max: 200, adim: 5, deger: 100, birim: 'cm' },
    { anahtar: 'aci',      etiket: 'Bakış / gelme açısı', min: 0, max: 70, adim: 1, deger: 20, birim: '°' },
    { anahtar: 'kalinlik', etiket: 'Levha kalınlığı t', min: 2, max: 20, adim: 1, deger: 10, birim: 'cm' }
  ],
  durum, adim, bitti, cizGercek, cizKlasik, cizGrafik, okumalar
};

})();
