(function () {
"use strict";
window.F11 = window.F11 || {};

/* ==========================================================================
   sims/manyetik-aki.js
   --------------------------------------------------------------------------
   Konu 2.3.1 · Manyetik akı  (MEB 11, s.236-241)

   Matematiksel model:
       Φ = B · A · cosθ
   θ : yüzeyin NORMALİ ile manyetik alan arasındaki açı (kitap s.239).
       θ = 0°   → Φ en büyük (alan yüzeye dik geçiyor)
       θ = 90°  → Φ = 0      (yüzey alana paralel, hiç çizgi geçmiyor)
   Birim: weber (Wb) = T·m².  N sarımlı bobinde toplam akı N·Φ’dir (s.240).

   AKI = YÜZEYDEN GEÇEN ÇİZGİ SAYISI
   ---------------------------------
   Alan sayfaya dik (⊗) çizgilerle gösterilir. Çizgi SIKLIĞI (birim alandaki
   çizgi sayısı) B ile orantılıdır: aralık ∝ 1/√B. Çerçevenin (izdüşümünün)
   içine düşen çizgiler sarıyla işaretlenir ve sayılır — kitaptaki "yüzeyden
   geçen çizgi sayısı" tanımının kendisi. Ölçek SABİTTİR: 40 cm’lik çerçeve
   panelin çoğunu kaplar, 5 cm’lik çerçeve gerçekten küçük görünür.

   DÖRT DÜZENEK
   ------------
   1) Açıyı çevir      : çerçeve döner, cosθ bağımlılığı görülür.
   2) Alanı değiştir   : mıknatıslar yaklaşır, B artar, Φ doğru orantılı artar.
   3) Yüzeyi büyüt     : A artar.
   4) Çerçeveyi kaydır : düzgün alanda öteleme akıyı DEĞİŞTİRMEZ (s.240);
                         akı yalnız çerçeve alandan çıkarken azalır.
   ========================================================================== */

const D = window.F11;
const { R, K } = D;

/* ------------------------------------------------------------- Fizik */

function alanCerceve(p) { return (p.a / 100) * (p.b / 100); }     // m²

/** Anlık açı (rad). */
function acı(st, p) {
  if (p.mod < 1.5) return st.aci;
  if (p.mod > 3.5) return 0;                   // kaydırmada yüz alana dik
  return (p.aci * Math.PI) / 180;
}

/** Anlık manyetik alan (T) — 2. düzenekte mıknatıslar yaklaşır, B artar. */
function alanB(st, p) {
  if (p.mod > 1.5 && p.mod < 2.5) return p.B * Math.min(1, st.t / 3);
  return p.B;
}

/** Anlık çerçeve alanı (m²) — 3. düzenekte büyür. */
function alanA(st, p) {
  if (p.mod > 2.5 && p.mod < 3.5) return alanCerceve(p) * (0.3 + 0.7 * Math.min(1, st.t / 3));
  return alanCerceve(p);
}

/* --- 4. düzenek: kaydırma --- */
const KAY_BOLGE = 2.2;                 // alan bölgesinin genişliği = 2,2 · a
function kaymaKonumu(st, p) {          // çerçeve merkezinin x’i (m), bölge [0, L]
  const a = p.a / 100;
  return 0.6 * a + (a / 2) * st.t;     // hız: a/2 her saniye
}
function kaymaHizi(p) { return (p.a / 100) / 2; }
/** Çerçevenin alan bölgesi İÇİNDE kalan kesri (0–1). */
function icKesir(st, p) {
  const a = p.a / 100, L = KAY_BOLGE * a, xc = kaymaKonumu(st, p);
  const sol = Math.max(0, xc - a / 2), sag = Math.min(L, xc + a / 2);
  return Math.max(0, sag - sol) / a;
}

/** Manyetik akı (Wb) — tek sarım. */
function aki(st, p) {
  const k = p.mod > 3.5 ? icKesir(st, p) : 1;
  return alanB(st, p) * alanA(st, p) * k * Math.cos(acı(st, p));
}

/** Çizgi aralığı (m): birim alandaki çizgi sayısı B ile orantılı. */
function cizgiAraligi(B) { return B > 1e-6 ? 0.05 / Math.sqrt(B) : Infinity; }

/* -------------------------------------------------------------- Durum */

function durum(p) { return { t: 0, aci: 0, kayit: [] }; }

function adim(st, dt, p) {
  st.t += dt;
  if (p.mod < 1.5) {
    st.aci += p.omega * dt;
    if (st.aci > 2 * Math.PI) st.aci -= 2 * Math.PI;
  }
  if (st.kayit.length === 0 || st.t - st.kayit[st.kayit.length - 1].t > 0.02)
    st.kayit.push({ t: st.t, v: aki(st, p) });
  if (st.kayit.length > 600) st.kayit.shift();
}

function bitti(st, p) {
  if (p.mod < 1.5) return st.t > Math.max(6, (2 * Math.PI) / Math.max(0.05, p.omega));
  if (p.mod > 3.5) return st.t > (KAY_BOLGE + 0.6) * 2 + 1;       // alandan tamamen çıkınca
  return st.t > 6;
}

/* --------------------------------------------- Gerçekçi görünüm */

/** Sabit ölçek (px/m): en büyük çerçeve (40 cm) panele sığar. */
function olcekGetir(bw, bh, p) {
  if (p.mod > 3.5) return Math.min(bw / ((KAY_BOLGE + 2.0) * (p.a / 100)), (bh * 0.80) / (p.b / 100), (Math.min(bw, bh) * 0.80) / 0.40);
  return (Math.min(bw, bh) * 0.80) / 0.40;
}

/** Alan bölgesinde ⊗ çizgileri; dikdörtgenin (izdüşümün) içindekiler sarı ve sayılır. */
function cizgiIzgarasi(ctx, bolge, aralikPx, icerde) {
  let sayi = 0;
  if (!isFinite(aralikPx) || aralikPx > 400) return 0;
  const r = Math.max(2.5, Math.min(6, aralikPx * 0.28));
  for (let y = bolge.y + aralikPx / 2; y < bolge.y + bolge.h; y += aralikPx)
    for (let x = bolge.x + aralikPx / 2; x < bolge.x + bolge.w; x += aralikPx) {
      const ic = icerde(x, y);
      if (ic) {
        sayi++;
        ctx.fillStyle = 'rgba(255,196,40,.55)';
        ctx.beginPath(); ctx.arc(x, y, r + 2.5, 0, 6.2832); ctx.fill();
      }
      D.alanIceri(ctx, x, y, r, ic ? '#8A5A00' : 'rgba(47,111,208,.7)');
    }
  return sayi;
}

function cizGercek(ctx, w, h, st, p) {
  const bx = w * 0.05, by = h * 0.16, bw = w * 0.90, bh = h * 0.60;
  const B = alanB(st, p);
  const olcek = olcekGetir(bw, bh, p);
  const aralik = cizgiAraligi(B) * olcek;
  const th = acı(st, p);
  const A = alanA(st, p);
  const k = Math.sqrt(A / alanCerceve(p));                        // 3. düzenekte büyüme
  const yariEn = (p.a / 100) * k * olcek / 2, yariBoy = (p.b / 100) * k * olcek / 2;
  const gen = Math.abs(Math.cos(th)) * yariEn;

  /* alan bölgesi */
  let bolge = { x: bx, y: by, w: bw, h: bh };
  let cx = bx + bw / 2;
  const cy = by + bh / 2;
  if (p.mod > 3.5) {
    bolge = { x: bx, y: by, w: KAY_BOLGE * (p.a / 100) * olcek, h: bh };
    cx = bx + kaymaKonumu(st, p) * olcek;
  }
  ctx.save();
  ctx.fillStyle = 'rgba(56,150,200,.10)'; ctx.fillRect(bolge.x, bolge.y, bolge.w, bolge.h);
  ctx.strokeStyle = 'rgba(56,150,200,.45)'; ctx.lineWidth = 1.2; ctx.strokeRect(bolge.x, bolge.y, bolge.w, bolge.h);
  ctx.restore();

  /* 2. düzenek: mıknatıslar sayfanın önünde ve arkasındadır (görünmez);
     yaklaştıkça B artar ve çizgiler SIKLAŞIR. */

  /* çerçevenin sayfadaki izdüşümü: [cx − gen, cx + gen] × [cy − yariBoy, cy + yariBoy] */
  const sayi = cizgiIzgarasi(ctx, bolge, aralik,
    (x, y) => Math.abs(x - cx) < gen && Math.abs(y - cy) < yariBoy);

  ctx.save();
  ctx.strokeStyle = '#B87333'; ctx.lineWidth = 4; ctx.lineJoin = 'round';
  ctx.strokeRect(cx - Math.max(1, gen), cy - yariBoy, Math.max(2, gen * 2), yariBoy * 2);
  ctx.restore();
  if (p.mod < 1.5)
    D.kesikliCizgi(ctx, cx, cy - yariBoy - 14, cx, cy + yariBoy + 14, 'rgba(120,130,150,.7)', 1.2, [5, 4]);
  if (p.mod > 3.5)
    D.vektor(ctx, cx, cy + yariBoy + 16, cx + 40, cy + yariBoy + 16, R.hiz, 'ϑ', { kalinlik: 2.4 });

  /* yüzey normali: sayfaya dik bileşeni ⊗/⊙, düzlemdeki bileşeni ok */
  const nDik = Math.cos(th), nYatay = Math.sin(th);
  if (Math.abs(nYatay) > 0.08)
    D.vektor(ctx, cx, cy, cx + nYatay * 56, cy, R.ivme, 'N', { kalinlik: 2.4 });

  const F = aki(st, p);
  D.yaziAydinlik(ctx, 'Φ = ' + D.biçim(F, 4) + ' Wb' + (p.N > 1 ? '   ·   N·Φ = ' + D.biçim(p.N * F, 4) + ' Wb' : ''),
                 w - 10, 20, R.normal, '700 13px system-ui, sans-serif', 'right');
  D.yaziAydinlik(ctx, 'B = ' + D.biçim(B, 2) + ' T ⊗   A = ' + D.biçim(A, 4) + ' m²', 10, 20, R.mur,
                 '700 12px system-ui, sans-serif', 'left');
  D.yaziAydinlik(ctx, 'çerçeveden geçen çizgi: ' + sayi + (Math.abs(nDik) > 0.03 && sayi > 0 ? '  (sarılar)' : ''),
                 cx, by + bh + 22, '#8A5A00', '700 12px system-ui, sans-serif', 'center');

  const durumYazi = p.mod < 1.5 ? 'ÇERÇEVE DÖNÜYOR · θ değişiyor'
                  : p.mod < 2.5 ? 'MIKNATISLAR YAKLAŞIYOR · B değişiyor'
                  : p.mod < 3.5 ? 'ÇERÇEVE BÜYÜYOR · A değişiyor'
                  : (icKesir(st, p) > 0.999 ? 'DÜZGÜN ALANDA KAYIYOR · Φ SABİT'
                     : icKesir(st, p) > 0 ? 'ALANDAN ÇIKIYOR · Φ azalıyor' : 'ALANIN DIŞINDA · Φ = 0');
  D.rozet(ctx, durumYazi, w / 2, 30, 'rgba(47,111,208,.92)', '#FFFFFF', '700 11px system-ui, sans-serif', true);

  if (p.mod < 1.5 && Math.abs(Math.cos(th)) < 0.03)
    D.yaziAydinlik(ctx, 'çerçeve alana PARALEL ⟹ hiç çizgi geçmiyor ⟹ Φ = 0',
                   w / 2, h - 12, '#B03030', '700 11px system-ui, sans-serif', 'center');
  else
    D.yaziAydinlik(ctx, 'çizgi sıklığı ∝ B · geçen çizgi sayısı ∝ Φ', 10, h - 12, R.mur,
                   '600 11px system-ui, sans-serif', 'left');
}

/* ----------------------------------------- Klasik fizik görünümü */

function cizKlasik(ctx, w, h, st, p) {
  D.izgara(ctx, w, h, 26);
  const B = alanB(st, p), A = alanA(st, p), th = acı(st, p);
  const F = aki(st, p);

  D.yaziHaleli(ctx, p.mod > 3.5 ? 'Akı = B × alan İÇİNDEKİ yüzey' : 'Yandan bakış · N ile B arasındaki açı', 12, 22, K.beyaz,
               '700 12px system-ui, sans-serif', 'left');

  const cx = w * 0.22, cy = h * 0.48, L = 56;
  if (p.mod > 3.5) {
    /* alan bölgesi ve çerçevenin içeride kalan kısmı */
    const kes = icKesir(st, p);
    const W = Math.min(w * 0.36, 180), H = 70, x0 = 20, y0 = cy - H / 2;
    ctx.fillStyle = 'rgba(56,150,200,.18)'; ctx.fillRect(x0, y0 - 10, W, H + 20);
    const fw = W / KAY_BOLGE, fx = x0 + (kaymaKonumu(st, p) / (KAY_BOLGE * p.a / 100)) * W - fw / 2;
    ctx.fillStyle = 'rgba(255,196,40,.45)';
    ctx.fillRect(Math.max(fx, x0), y0, Math.max(0, Math.min(fx + fw, x0 + W) - Math.max(fx, x0)), H);
    ctx.strokeStyle = R.ivme; ctx.lineWidth = 3; ctx.strokeRect(fx, y0, fw, H);
    D.yaziHaleli(ctx, 'içeride: %' + D.biçim(kes * 100, 0), x0 + W / 2, y0 + H + 28, R.ivme,
                 '700 12px system-ui, sans-serif', 'center');
  } else {
    ctx.save();
    ctx.strokeStyle = R.ivme; ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(cx - Math.sin(th) * L, cy - Math.cos(th) * L);
    ctx.lineTo(cx + Math.sin(th) * L, cy + Math.cos(th) * L);
    ctx.stroke(); ctx.restore();
    D.vektor(ctx, cx, cy, cx + Math.cos(th) * 48, cy - Math.sin(th) * 48, R.hiz, 'N', { kalinlik: 2.2 });
    D.vektor(ctx, cx - 70, cy, cx + 70, cy, R.normal, 'B', { kalinlik: 2.2 });
    D.aciYayi(ctx, cx, cy, 34, 0, -th, K.metin2, D.biçim(th * 180 / Math.PI, 0) + '°');
  }

  const bx = w * 0.46;
  const satir = p.mod > 3.5 ? [
    ['Φ = B · A_iç', K.beyaz, '700 12px system-ui, sans-serif'],
    ['A_iç = ' + D.biçim(A * icKesir(st, p), 4) + ' m²', K.metin2, '11px system-ui, sans-serif'],
    ['Φ = ' + D.biçim(F, 4) + ' Wb', R.normal, '700 13px system-ui, sans-serif'],
    ['', K.metin2, '11px'],
    ['Tamamen içerideyken kaydırmak', K.metin2, '11px system-ui, sans-serif'],
    ['akıyı DEĞİŞTİRMEZ (düzgün alan)', R.hiz, '700 11px system-ui, sans-serif'],
    ['Çıkarken: ΔΦ/Δt = B·b·ϑ', R.ivme, '700 11px system-ui, sans-serif'],
    ['= ' + D.biçim(B * (p.b / 100) * kaymaHizi(p), 4) + ' Wb/s (sonraki konu)', K.metin2, '11px system-ui, sans-serif']
  ] : [
    ['Φ = B · A · cosθ', K.beyaz, '700 12px system-ui, sans-serif'],
    ['B = ' + D.biçim(B, 2) + ' T', K.metin2, '11px system-ui, sans-serif'],
    ['A = ' + D.biçim(A, 4) + ' m²', K.metin2, '11px system-ui, sans-serif'],
    ['cosθ = ' + D.biçim(Math.cos(th), 3), R.ivme, '11px system-ui, sans-serif'],
    ['Φ = ' + D.biçim(F, 4) + ' Wb', R.normal, '700 13px system-ui, sans-serif'],
    [p.N > 1 ? 'N sarımlı bobin: N·Φ = ' + D.biçim(p.N * F, 4) + ' Wb' : '', R.hiz, '700 11px system-ui, sans-serif'],
    ['θ = 0° ⟹ Φ en büyük · θ = 90° ⟹ Φ = 0', K.metin2, '11px system-ui, sans-serif'],
    ['1 Wb = 1 T·m²', K.metin2, '11px system-ui, sans-serif']
  ];
  let sy = 46;
  satir.forEach(([t, c, f]) => { if (t) D.yaziHaleli(ctx, t, bx, sy, c, f, 'left'); sy += 17; });

  D.yaziHaleli(ctx, 'θ, yüzey NORMALİ (N) ile alan arasındaki açıdır',
               12, h - 16, R.ivme, '600 11px system-ui, sans-serif', 'left');
}

/* ------------------------------------------------------- Grafikler */

function cizGrafik(ctx, w, h, st, p) {
  const pay = 8, gw = (w - pay * 3) / 2, gh = h - 6;
  const enBuyuk = p.B * alanCerceve(p);

  D.miniGrafik(ctx, {
    x: pay, y: 3, w: gw, h: gh,
    baslik: p.mod > 3.5 ? 'Φ − t   (içeride SABİT · çıkarken doğrusal azalır)' : 'Φ − t   (eğimi sonraki konunun konusu)',
    birim: 'Wb',
    veri: st.kayit, tMin: st.kayit.length ? st.kayit[0].t : 0,
    tMax: Math.max(1, st.t),
    vMin: p.mod < 1.5 ? -enBuyuk * 1.1 : 0, vMax: enBuyuk * 1.1,
    renk: R.normal
  });

  if (p.mod > 3.5) {
    /* Φ − x: çerçeve merkezinin bölgeye göre konumu */
    const a = p.a / 100, v2 = [];
    for (let k = 0; k <= 120; k++) {
      const tt = k / 120 * ((KAY_BOLGE + 0.6) * 2 + 1);
      v2.push({ t: kaymaKonumu({ t: tt }, p) * 100, v: aki({ t: tt, aci: 0 }, p) });
    }
    D.miniGrafik(ctx, {
      x: pay * 2 + gw, y: 3, w: gw, h: gh,
      baslik: 'Φ − x   (x: çerçeve merkezi · alan 0 – ' + D.biçim(KAY_BOLGE * a * 100, 0) + ' cm)', birim: 'Wb', tEtiket: 'x (cm)',
      imlec: { t: kaymaKonumu(st, p) * 100, v: aki(st, p) },
      veri: v2, tMin: v2[0].t, tMax: v2[v2.length - 1].t, vMin: 0, vMax: enBuyuk * 1.1, renk: R.ivme
    });
    return;
  }

  const BA = alanB(st, p) * alanA(st, p);
  const v2 = [];
  for (let d = 0; d <= 360; d += 3) v2.push({ t: d, v: BA * Math.cos(d * Math.PI / 180) });
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
  const F = aki(st, p);
  const o = [
    { et: 'Alan  B',     dg: D.biçim(B, 2),                      birim: 'T' },
    { et: 'Yüzey  A',    dg: D.biçim(A, 4),                      birim: 'm²' },
    { et: 'Açı  θ',      dg: D.biçim(th * 180 / Math.PI, 0),     birim: '°' },
    { et: 'Akı  Φ',      dg: D.biçim(F, 4),                      birim: 'Wb' },
    { et: 'N·Φ (bobin)', dg: D.biçim(p.N * F, 4),                birim: 'Wb' }
  ];
  if (p.mod > 3.5) o.push({ et: 'Alan içindeki kesir', dg: '%' + D.biçim(icKesir(st, p) * 100, 0), birim: '' });
  else o.push({ et: 'Durum', dg: Math.abs(Math.cos(th)) < 0.03 ? 'Φ = 0 (paralel)' : 'Çizgiler geçiyor', birim: '' });
  return o;
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
      { d: 2, e: 'Alanı — mıknatıslar yaklaşıyor' },
      { d: 3, e: 'Yüzeyi — çerçeve büyüyor' },
      { d: 4, e: 'Konumu — çerçeve kayıyor (düzgün alan)' }
    ]},
    { anahtar: 'B',     etiket: 'Manyetik alan B', min: 0.1, max: 2, adim: 0.1, deger: 0.8, birim: 'T' },
    { anahtar: 'a',     etiket: 'Çerçeve eni', min: 5, max: 40, adim: 5, deger: 20, birim: 'cm' },
    { anahtar: 'b',     etiket: 'Çerçeve boyu', min: 5, max: 40, adim: 5, deger: 20, birim: 'cm' },
    { anahtar: 'N',     etiket: 'Sarım sayısı N', min: 1, max: 100, adim: 1, deger: 1, birim: '' },
    { anahtar: 'aci',   etiket: 'Sabit açı θ (2–3. düzenek)', min: 0, max: 90, adim: 5, deger: 0, birim: '°' },
    { anahtar: 'omega', etiket: 'Dönme hızı ω (1. düzenek)', min: 0.2, max: 6, adim: 0.2, deger: 1.5, birim: 'rad/s' }
  ],
  durum, adim, bitti, cizGercek, cizKlasik, cizGrafik, okumalar
};

})();
