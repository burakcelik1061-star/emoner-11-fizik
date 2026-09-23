(function () {
"use strict";
window.F11 = window.F11 || {};

/* ==========================================================================
   sims/manyetik-aki.js
   --------------------------------------------------------------------------
   Konu 2.3.1 · Manyetik akı  (MEB 11, s.236-241)

   Matematiksel model:
       Φ = B · A · cosθ
   θ : yüzeyin NORMALİ ile manyetik alan arasındaki açı.
       θ = 0°   → Φ en büyük (alan yüzeye dik geçiyor)
       θ = 90°  → Φ = 0      (alan yüzeye teğet, hiç "delmiyor")

   Birim: weber (Wb) = T·m²

   AKI NEDİR?
   ----------
   Akı, bir yüzeyden "kaç tane alan çizgisi geçtiğinin" ölçüsüdür. Üç şeyle
   değişir: alanın şiddeti, yüzeyin alanı ve yüzeyin yönelimi. Bir sonraki
   konuda göreceğimiz gibi, indüksiyon gerilimini doğuran şey akının KENDİSİ
   değil, akının DEĞİŞİMİDİR — bu yüzden üç değişkeni de ayrı ayrı tanımak
   gerekir.

   ÜÇ DÜZENEK
   ----------
   1) Açıyı çevir : Çerçeve döndürülür, cosθ bağımlılığı görülür.
   2) Alanı değiştir : B artar/azalır, Φ doğru orantılı değişir.
   3) Çerçeveyi büyüt/küçült : A değişir.
   Her üçünde de Φ−t grafiği çizilir; değişim hızı (eğim) sonraki konunun konusu.
   ========================================================================== */

const D = window.F11;
const { R, K } = D;

/* ------------------------------------------------------------- Fizik */

function alanCerceve(p) { return (p.a / 100) * (p.b / 100); }     // m²

/** Anlık açı (rad) — düzeneğe göre değişir. */
function acı(st, p) {
  if (p.mod < 1.5) return st.aci;              // dönen çerçeve
  return (p.aci * Math.PI) / 180;              // sabit açı
}

/** Anlık manyetik alan (T) — 2. düzenekte zamanla değişir. */
function alanB(st, p) {
  if (p.mod > 1.5 && p.mod < 2.5) {
    /* B doğrusal olarak artar, sonra sabitlenir */
    return Math.min(p.B, p.B * (st.t / 2));
  }
  return p.B;
}

/** Anlık çerçeve alanı (m²) — 3. düzenekte zamanla değişir. */
function alanA(st, p) {
  if (p.mod > 2.5) {
    const k = 0.3 + 0.7 * Math.min(1, st.t / 2);
    return alanCerceve(p) * k;
  }
  return alanCerceve(p);
}

/** Manyetik akı (Wb). */
function aki(st, p) {
  return alanB(st, p) * alanA(st, p) * Math.cos(acı(st, p));
}

/* -------------------------------------------------------------- Durum */

function durum(p) {
  return { t: 0, aci: 0, kayit: [] };
}

function adim(st, dt, p) {
  st.t += dt;
  if (p.mod < 1.5) st.aci += (p.omega * dt) % (2 * Math.PI);
  if (st.aci > 2 * Math.PI) st.aci -= 2 * Math.PI;

  if (st.kayit.length === 0 || st.t - st.kayit[st.kayit.length - 1].t > 0.02)
    st.kayit.push({ t: st.t, v: aki(st, p) });
  if (st.kayit.length > 500) st.kayit.shift();
}

/* Dönen çerçevede en az BİR TAM TUR izlenir (yavaş ω’da 6 s yetmiyordu). */
function bitti(st, p) {
  if (p.mod < 1.5) return st.t > Math.max(6, (2 * Math.PI) / Math.max(0.05, p.omega));
  return st.t > 6;
}

/* --------------------------------------------- Gerçekçi görünüm */

function cizGercek(ctx, w, h, st, p) {
  const bx = w * 0.06, by = h * 0.14, bw = w * 0.88, bh = h * 0.62;
  const B = alanB(st, p);

  /* alan bölgesi — sayfaya dik, ⊗ */
  ctx.save();
  ctx.fillStyle = 'rgba(56,150,200,.10)';
  ctx.fillRect(bx, by, bw, bh);
  ctx.strokeStyle = 'rgba(56,150,200,.45)'; ctx.lineWidth = 1.2;
  ctx.strokeRect(bx, by, bw, bh);
  ctx.restore();

  /* alan yoğunluğu B ile artsın — çizgi sıklığı alanın şiddetini gösterir */
  const sıklık = Math.max(24, 70 - B * 28);
  D.alanBolgesi(ctx, bx, by, bw, bh, -1, 'rgba(47,111,208,.7)', sıklık);

  /* Çerçeve a × b dikdörtgenidir ve DÜŞEY bir eksen etrafında döner. Alan
     sayfanın içine (⊗) olduğundan θ = 0’da çerçeve bize tam yüzünü gösterir;
     θ büyüdükçe eni cosθ oranında daralır, θ = 90°’de kenardan görünür. */
  const cx = bx + bw / 2, cy = by + bh / 2;
  const A = alanA(st, p);
  const k = Math.sqrt(A / alanCerceve(p));                  // 3. düzenekte büyüme
  const olcek = (Math.min(bw, bh) * 0.62) / (Math.max(p.a, p.b) / 100);
  const yariEn = (p.a / 100) * k * olcek / 2, yariBoy = (p.b / 100) * k * olcek / 2;
  const th = acı(st, p);
  const gen = Math.abs(Math.cos(th)) * yariEn;

  ctx.save();
  ctx.fillStyle = 'rgba(184,115,51,.10)';
  ctx.fillRect(cx - gen, cy - yariBoy, gen * 2, yariBoy * 2);
  ctx.strokeStyle = '#B87333'; ctx.lineWidth = 5; ctx.lineJoin = 'round';
  ctx.strokeRect(cx - Math.max(1, gen), cy - yariBoy, Math.max(2, gen * 2), yariBoy * 2);
  ctx.restore();
  D.kesikliCizgi(ctx, cx, cy - yariBoy - 16, cx, cy + yariBoy + 16, 'rgba(120,130,150,.7)', 1.2, [5, 4]);

  /* Yüzey normali n = (sinθ, 0, −cosθ): sayfaya dik bileşeni ⊗/⊙ ile,
     sayfa düzlemindeki bileşeni (sinθ) yatay okla gösterilir. θ = 0’da n
     tamamen sayfanın içine, yani B ile AYNI yöndedir. */
  const nDik = Math.cos(th), nYatay = Math.sin(th);
  if (Math.abs(nDik) > 0.08)
    (nDik > 0 ? D.alanIceri : D.alanDisari)(ctx, cx, cy, 5 + 9 * Math.abs(nDik), R.ivme);
  if (Math.abs(nYatay) > 0.08)
    D.vektor(ctx, cx, cy, cx + nYatay * 60, cy, R.ivme, 'n', { kalinlik: 2.4 });
  else
    D.yaziAydinlik(ctx, 'n', cx + 18, cy - 14, R.ivme, '700 12px system-ui, sans-serif', 'left');

  /* akıyı temsil eden "delen çizgi" sayısı */
  const F = aki(st, p);
  const enBuyuk = p.B * alanCerceve(p);
  const oran = Math.abs(F) / Math.max(1e-9, enBuyuk);
  D.yaziAydinlik(ctx, 'Φ = ' + D.biçim(F, 4) + ' Wb', w - 10, 44, R.normal,
                 '700 13px system-ui, sans-serif', 'right');
  D.yaziAydinlik(ctx, 'B = ' + D.biçim(B, 2) + ' T ⊗', 10, 44, R.mur,
                 '700 12px system-ui, sans-serif', 'left');
  D.yaziAydinlik(ctx, 'A = ' + D.biçim(A, 4) + ' m²', 10, 62, R.mur,
                 '700 12px system-ui, sans-serif', 'left');

  /* oran çubuğu */
  const cbx = cx - 90, cby = by + bh + 20;
  ctx.fillStyle = 'rgba(120,130,150,.35)'; ctx.fillRect(cbx, cby, 180, 12);
  ctx.fillStyle = R.normal; ctx.fillRect(cbx, cby, 180 * oran, 12);
  D.yaziAydinlik(ctx, 'Φ / Φ_maks = ' + D.biçim(oran, 2), cx, cby + 28, R.mur,
                 '600 11px system-ui, sans-serif', 'center');

  D.rozet(ctx, p.mod < 1.5 ? 'ÇERÇEVE DÖNÜYOR · açı değişiyor'
                          : (p.mod < 2.5 ? 'ALAN ARTIYOR · B değişiyor'
                                         : 'ÇERÇEVE BÜYÜYOR · A değişiyor'),
          /* Sol üstte B ve A etiketleri var; rozet onların sağında kalsın. */
          w * 0.63, 52, 'rgba(47,111,208,.92)', '#FFFFFF',
          '700 11px system-ui, sans-serif', true);

  if (Math.abs(Math.cos(th)) < 0.03)
    D.yaziAydinlik(ctx, 'çerçeve alana PARALEL ⟹ hiç çizgi delmiyor ⟹ Φ = 0',
                   cx, h - 12, '#B03030', '700 11px system-ui, sans-serif', 'center');
}

/* ----------------------------------------- Klasik fizik görünümü */

function cizKlasik(ctx, w, h, st, p) {
  D.izgara(ctx, w, h, 26);
  const B = alanB(st, p), A = alanA(st, p), th = acı(st, p);
  const F = aki(st, p);

  D.yaziHaleli(ctx, 'Akı = alanı "delen" çizgi sayısı · üstten bakış', 12, 22, K.beyaz,
               '700 12px system-ui, sans-serif', 'left');

  /* şematik: yüzey ve normal */
  const cx = w * 0.22, cy = h * 0.48, L = 56;
  ctx.save();
  ctx.strokeStyle = R.ivme; ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(cx - Math.sin(th) * L, cy - Math.cos(th) * L);
  ctx.lineTo(cx + Math.sin(th) * L, cy + Math.cos(th) * L);
  ctx.stroke(); ctx.restore();
  D.vektor(ctx, cx, cy, cx + Math.cos(th) * 48, cy - Math.sin(th) * 48,
           R.hiz, 'n', { kalinlik: 2.2 });
  D.vektor(ctx, cx - 70, cy, cx + 70, cy, R.normal, 'B', { kalinlik: 2.2 });
  D.aciYayi(ctx, cx, cy, 34, 0, -th, K.metin2, D.biçim(th * 180 / Math.PI, 0) + '°');

  /* sağ sütun */
  const bx = w * 0.46;
  const satir = [
    ['Φ = B · A · cosθ', K.beyaz, '700 12px system-ui, sans-serif'],
    ['B = ' + D.biçim(B, 2) + ' T', K.metin2, '11px system-ui, sans-serif'],
    ['A = ' + D.biçim(A, 4) + ' m²', K.metin2, '11px system-ui, sans-serif'],
    ['cosθ = ' + D.biçim(Math.cos(th), 3), R.ivme, '11px system-ui, sans-serif'],
    ['Φ = ' + D.biçim(F, 4) + ' Wb', R.normal, '700 13px system-ui, sans-serif'],
    ['', K.metin2, '11px'],
    ['θ = 0° ⟹ Φ en büyük', K.metin2, '11px system-ui, sans-serif'],
    ['θ = 90° ⟹ Φ = 0', K.metin2, '11px system-ui, sans-serif'],
    ['1 Wb = 1 T·m²', K.metin2, '11px system-ui, sans-serif']
  ];
  let sy = 46;
  satir.forEach(([t, c, f]) => {
    if (t) D.yaziHaleli(ctx, t, bx, sy, c, f, 'left');
    sy += 17;
  });

  D.yaziHaleli(ctx, 'θ, yüzeyin NORMALİ ile alan arasındaki açıdır',
               12, h - 16, R.ivme, '600 11px system-ui, sans-serif', 'left');
}

/* ------------------------------------------------------- Grafikler */

function cizGrafik(ctx, w, h, st, p) {
  const pay = 8, gw = (w - pay * 3) / 2, gh = h - 6;
  const enBuyuk = p.B * alanCerceve(p);

  D.miniGrafik(ctx, {
    x: pay, y: 3, w: gw, h: gh,
    baslik: 'Φ − t   (eğimi sonraki konunun konusu)', birim: 'Wb',
    veri: st.kayit, tMin: st.kayit.length ? st.kayit[0].t : 0,
    tMax: Math.max(1, st.t),
    vMin: p.mod < 1.5 ? -enBuyuk * 1.1 : 0, vMax: enBuyuk * 1.1,
    renk: R.normal
  });

  /* Φ − θ eğrisi — o anki B ve A ile (2. ve 3. düzenekte eğri büyür) */
  const BA = alanB(st, p) * alanA(st, p);
  const v2 = [];
  for (let d = 0; d <= 360; d += 3)
    v2.push({ t: d, v: BA * Math.cos(d * Math.PI / 180) });
  D.miniGrafik(ctx, {
    x: pay * 2 + gw, y: 3, w: gw, h: gh,
    baslik: 'Φ − θ   (kosinüs · 90°’de sıfır)', birim: 'Wb', tEtiket: 'θ (°)',
    imlec: { t: acı(st, p) * 180 / Math.PI, v: aki(st, p) },
    veri: v2, tMax: 360, vMin: -enBuyuk * 1.1, vMax: enBuyuk * 1.1,
    renk: R.ivme
  });
}

/* ----------------------------------------------------------- Okumalar */

function okumalar(st, p) {
  const B = alanB(st, p), A = alanA(st, p), th = acı(st, p);
  return [
    { et: 'Alan  B',     dg: D.biçim(B, 2),                      birim: 'T' },
    { et: 'Yüzey  A',    dg: D.biçim(A, 4),                      birim: 'm²' },
    { et: 'Açı  θ',      dg: D.biçim(th * 180 / Math.PI, 0),     birim: '°' },
    { et: 'cosθ',        dg: D.biçim(Math.cos(th), 3),           birim: '' },
    { et: 'Akı  Φ',      dg: D.biçim(aki(st, p), 4),             birim: 'Wb' },
    { et: 'Durum',       dg: Math.abs(Math.cos(th)) < 0.03 ? 'Φ = 0 (paralel)' : 'Çizgiler deliyor', birim: '' }
  ];
}

/* ------------------------------------------------------------- Tanım */

D.simler = D.simler || {};
D.simler['manyetik-aki'] = {
  id: 'manyetik-aki',
  baslik: '2.3.1 · Manyetik akı · Φ = B·A·cosθ',
  yukseklik: 340,
  grafikPanel: true,
  grafikYukseklik: 170,
  parametreler: [
    { anahtar: 'mod', etiket: 'Neyi değiştirelim?', tur: 'secim', deger: 1, secenekler: [
      { d: 1, e: 'Açıyı — çerçeve dönüyor' },
      { d: 2, e: 'Alanı — B artıyor' },
      { d: 3, e: 'Yüzeyi — çerçeve büyüyor' }
    ]},
    { anahtar: 'B',     etiket: 'Manyetik alan B', min: 0.1, max: 2, adim: 0.1, deger: 0.8, birim: 'T' },
    { anahtar: 'a',     etiket: 'Çerçeve eni', min: 5, max: 40, adim: 5, deger: 20, birim: 'cm' },
    { anahtar: 'b',     etiket: 'Çerçeve boyu', min: 5, max: 40, adim: 5, deger: 20, birim: 'cm' },
    { anahtar: 'aci',   etiket: 'Sabit açı θ', min: 0, max: 90, adim: 5, deger: 0, birim: '°' },
    { anahtar: 'omega', etiket: 'Dönme hızı ω', min: 0.2, max: 6, adim: 0.2, deger: 1.5, birim: 'rad/s' }
  ],
  durum, adim, bitti, cizGercek, cizKlasik, cizGrafik, okumalar
};

})();
