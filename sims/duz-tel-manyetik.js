(function () {
"use strict";
window.F11 = window.F11 || {};

/* ==========================================================================
   sims/duz-tel-manyetik.js
   --------------------------------------------------------------------------
   Konu 2.2.2 · Üzerinden akım geçen düz telin manyetik alanı
                                                    (MEB 11, s.198-206)

   Matematiksel model:
       B = (μ₀ · i) / (2π · d)          μ₀ = 4π·10⁻⁷ T·m/A

   Sadeleştirilmiş hâli (sınavda hızlı hesap için):
       B = 2·10⁻⁷ · i / d               (i amper, d metre, B tesla)

   YÖN — SAĞ EL KURALI
   -------------------
   Başparmak AKIM yönünü gösterecek şekilde tel kavranır; diğer dört parmağın
   sarılma yönü ALAN çizgilerinin yönüdür. Alan çizgileri teli çevreleyen
   İÇ İÇE ÇEMBERLERDİR — mıknatısınki gibi uçlardan çıkıp girmez.

   İKİ DÜZENEK
   -----------
   1) Tek tel   : Kesit görünümü. Akım sayfa düzlemine dik (⊙ ya da ⊗).
                  Çemberler ve pusulalar çizilir, B mesafeyle 1/d azalır.
   2) İki tel   : Aynı yönlü akımlar telleri ÇEKER, zıt yönlüler İTER.
                  (Elektrikteki yük kuralının TERSİ — sık yapılan hata.)
   ========================================================================== */

const D = window.F11;
const { R, K } = D;

const MU0 = 4 * Math.PI * 1e-7;

/* ------------------------------------------------------------- Fizik */

/** Düz telin d metre uzaklıktaki alanı (T). */
function alanTel(i, d) {
  const dd = Math.max(d, 0.01);
  return (MU0 * Math.abs(i)) / (2 * Math.PI * dd);
}

/** İki tel arasındaki birim uzunluk başına kuvvet (N/m). */
function kuvvetBirim(i1, i2, d) {
  const dd = Math.max(d, 0.01);
  return (MU0 * Math.abs(i1 * i2)) / (2 * Math.PI * dd);
}

/** Aynı yönlü akımlar çeker. Akımlardan biri sıfırsa kuvvet yoktur. */
function tellerCekiyor(p) { return p.i1 * p.i2 > 0; }
function kuvvetYok(p) { return p.i1 * p.i2 === 0; }
function etkilesimMetni(p) { return kuvvetYok(p) ? 'Kuvvet yok' : tellerCekiyor(p) ? 'Çekme' : 'İtme'; }

/** Akım yönü metni: ⊙ dışarı, ⊗ içeri, 0 akım yok. */
function yonMetni(i) { return i > 0 ? 'Dışarı ⊙' : i < 0 ? 'İçeri ⊗' : 'Akım yok'; }

/** Ölçüm noktasındaki B okunun boyu (px): B ∝ i/d — uzaklaştıkça kısalır. */
function alanOkBoyu(i, dCm) {
  if (i === 0) return 0;
  return Math.max(10, Math.min(72, 42 * (20 / Math.max(dCm, 1)) * (Math.abs(i) / 10)));
}

/**
 * İKİ TELİN GERÇEK (SÜPERPOZE) ALAN ÇİZGİLERİ
 * Her noktada B = Σ μ₀iₖ/(2πrₖ) · φ̂ₖ hesaplanır; çizgi bu yönde izlenir ve
 * başladığı yere dönünce kapanır. Aynı yönlü akımlarda uzaktaki çizgiler iki
 * teli BİRLİKTE sarar; zıt yönlülerde çizgiler teller arasında sıklaşır.
 */
function ikiTelCizgileri(ctx, teller, w, h, renk) {
  const alan = (x, y) => {
    let bx = 0, by = 0;
    for (const t of teller) {
      const dx = x - t.x, dy = y - t.y, r2 = dx * dx + dy * dy;
      if (r2 < 1) continue;
      /* ⊙ (i > 0): ekranda saat yönünün tersi → sağdaki noktada yukarı */
      bx += t.i * dy / r2; by += -t.i * dx / r2;
    }
    return [bx, by];
  };
  const tohumlar = [];
  for (const t of teller) {
    if (t.i === 0) continue;
    const disari = t === teller[0] ? -1 : 1;
    [22, 44, 70, 104].forEach(r => tohumlar.push([t.x + disari * r, t.y]));
  }
  ctx.save();
  ctx.strokeStyle = renk; ctx.fillStyle = renk; ctx.lineWidth = 1.4;
  for (const [sx, sy] of tohumlar) {
    let x = sx, y = sy;
    const yol = [[x, y]];
    for (let k = 0; k < 1400; k++) {
      const [b1x, b1y] = alan(x, y);
      const b1 = Math.hypot(b1x, b1y);
      if (!(b1 > 1e-12)) break;
      /* orta nokta (RK2) adımı: kapalı çizgiler spiral gibi kaymasın */
      const [b2x, b2y] = alan(x + 1.5 * b1x / b1, y + 1.5 * b1y / b1);
      const b2 = Math.hypot(b2x, b2y);
      if (!(b2 > 1e-12)) break;
      x += 3 * b2x / b2; y += 3 * b2y / b2;
      yol.push([x, y]);
      if (k > 20 && Math.hypot(x - sx, y - sy) < 4) { yol.push([sx, sy]); break; }   // kapandı
      if (x < -400 || x > w + 400 || y < -400 || y > h + 400) break;
    }
    ctx.beginPath();
    yol.forEach(([px, py], j) => j ? ctx.lineTo(px, py) : ctx.moveTo(px, py));
    ctx.stroke();
    /* yön oku tohum noktasında */
    const [bx, by] = alan(sx, sy);
    const b = Math.hypot(bx, by) || 1, ux = bx / b, uy = by / b;
    ctx.beginPath();
    ctx.moveTo(sx + ux * 6, sy + uy * 6);
    ctx.lineTo(sx - uy * 3.6 - ux * 2, sy + ux * 3.6 - uy * 2);
    ctx.lineTo(sx + uy * 3.6 - ux * 2, sy - ux * 3.6 - uy * 2);
    ctx.closePath(); ctx.fill();
  }
  ctx.restore();
}

/* -------------------------------------------------------------- Durum */

/* Oynat'a basılınca ölçüm noktasının tele uzaklığı taranır; B'nin uzaklıkla
   TERS (kareyle değil) azaldığı canlı görünür. */
const TARAMA_PERIYOT = 12;      // s

function durum(p) { return { t: 0, d: p.d }; }

function adim(st, dt, p) {
  st.t += dt;
  /* Tek telde ölçüm noktası, iki telde teller arası uzaklık taranır. */
  st.d = D.tarama(st.t, p.d, p.d < 30 ? 60 : 4, TARAMA_PERIYOT);
}

function bitti() { return false; }

function etkin(st, p) {
  return Object.assign({}, p, { d: (st && st.d != null) ? st.d : p.d });
}

/* ------------------------------------------------- Çizim yardımcıları */

/** Teli çevreleyen alan çemberleri ve üzerlerindeki yön okları. */
function alanCemberleri(ctx, cx, cy, yon, renk, yaricaplar) {
  ctx.save();
  ctx.strokeStyle = renk; ctx.lineWidth = 1.4;
  for (const r of yaricaplar) {
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, 6.2832); ctx.stroke();

    /* çemberin üstünde ve altında birer yön oku */
    for (const a of [-Math.PI / 2, Math.PI / 2]) {
      const x = cx + Math.cos(a) * r, y = cy + Math.sin(a) * r;
      /* teğet yön: saat yönü mü ters mi — akımın yönüne bağlı */
      const tx = -Math.sin(a) * yon, ty = Math.cos(a) * yon;
      ctx.save(); ctx.fillStyle = renk;
      ctx.beginPath();
      ctx.moveTo(x + tx * 6, y + ty * 6);
      ctx.lineTo(x - ty * 3.6 - tx * 2, y + tx * 3.6 - ty * 2);
      ctx.lineTo(x + ty * 3.6 - tx * 2, y - tx * 3.6 - ty * 2);
      ctx.closePath(); ctx.fill(); ctx.restore();
    }
  }
  ctx.restore();
}

/** Akım taşıyan telin kesiti: ⊙ (dışarı), ⊗ (içeri) ya da akımsız. */
function telKesiti(ctx, x, y, iAkim) {
  ctx.save();
  ctx.fillStyle = '#B87333';                       // bakır
  ctx.beginPath(); ctx.arc(x, y, 13, 0, 6.2832); ctx.fill();
  ctx.restore();
  if (iAkim !== 0) (iAkim > 0 ? D.alanDisari : D.alanIceri)(ctx, x, y, 9, '#3A2A10');
}

/* --------------------------------------------- Gerçekçi görünüm */

function cizGercek(ctx, w, h, st, pHam) {
  const p = etkin(st, pHam);
  if (p.mod > 1.5) { cizIkiTel(ctx, w, h, st, p); return; }

  /* SABİT ölçek: 60 cm ekranda w·0,56 px. Ölçek d ile değişseydi ölçüm
     noktası ekranda hiç kıpırdamazdı. */
  const cx = w * 0.24, cy = h * 0.52;
  const olcek = (w * 0.56) / 0.60;

  /* alan çemberleri — akım yoksa alan da yok */
  const yon = p.i1 > 0 ? -1 : +1;   /* ⊙ için saat yönünün TERSİ */
  if (p.i1 !== 0)
    alanCemberleri(ctx, cx, cy, yon, 'rgba(56,150,200,.8)',
                   [38, 66, 96, 128, 166].filter(r => r < Math.min(w, h) * 0.62));

  telKesiti(ctx, cx, cy, p.i1);
  D.yaziAydinlik(ctx, 'i = ' + D.biçim(Math.abs(p.i1)) + ' A', cx, cy - 30, R.mur,
                 '700 12px system-ui, sans-serif', 'center');
  D.yaziAydinlik(ctx, p.i1 > 0 ? 'akım sayfadan DIŞARI (⊙)'
                     : p.i1 < 0 ? 'akım sayfanın İÇİNE (⊗)' : 'akım yok → manyetik alan yok',
                 cx, cy + 34, R.mur, '600 11px system-ui, sans-serif', 'center');

  /* ölçüm noktası — tele gerçekten yaklaşır / uzaklaşır */
  const px = cx + (p.d / 100) * olcek, py = cy;
  const B = alanTel(p.i1, p.d / 100);
  D.olcu(ctx, cx, cy + 74, px, cy + 74, 'd = ' + D.biçim(p.d) + ' cm', R.mur);

  /* o noktadaki alan vektörü teğettir; boyu B ile (∝ i/d) değişir */
  const tx = 0, ty = yon;
  const boy = alanOkBoyu(p.i1, p.d);
  if (boy > 0) {
    D.vektor(ctx, px, py, px + tx * boy, py + ty * boy, R.normal, 'B', { kalinlik: 2.6 });
    D.pusula(ctx, px, py, 14, Math.atan2(ty, tx));
  } else {
    /* telin alanı yok: pusula yalnız Dünya’nın alanını (kuzeyi) gösterir */
    D.pusula(ctx, px, py, 14, -Math.PI / 2);
  }

  D.yaziAydinlik(ctx, 'B = ' + D.biçim(B * 1e6) + ' μT', w - 10, 18, R.normal,
                 '700 12px system-ui, sans-serif', 'right');
  D.yaziAydinlik(ctx, 'çizgiler İÇ İÇE ÇEMBER — başı sonu yok', 10, h - 12, R.mur,
                 '600 11px system-ui, sans-serif', 'left');
}

/** İki tel arasındaki yarı aralık (px): d ile orantılı, 2–60 cm. */
function yariAralikPx(w, dCm) { return 18 + (dCm / 60) * Math.min(w * 0.34, 190); }

function cizIkiTel(ctx, w, h, st, p) {
  const cy = h * 0.50;
  const ara = yariAralikPx(w, p.d);                 // teller gerçekten yaklaşır/uzaklaşır
  const x1 = w / 2 - ara, x2 = w / 2 + ara;

  ikiTelCizgileri(ctx, [{ x: x1, y: cy, i: p.i1 }, { x: x2, y: cy, i: p.i2 }],
                  w, h, 'rgba(56,150,200,.6)');

  telKesiti(ctx, x1, cy, p.i1);
  telKesiti(ctx, x2, cy, p.i2);
  D.yaziAydinlik(ctx, 'i₁ = ' + D.biçim(Math.abs(p.i1)) + ' A', x1, cy - 34, R.mur,
                 '700 12px system-ui, sans-serif', 'center');
  D.yaziAydinlik(ctx, 'i₂ = ' + D.biçim(Math.abs(p.i2)) + ' A', x2, cy - 34, R.mur,
                 '700 12px system-ui, sans-serif', 'center');

  /* kuvvet okları — boy F/L ile ölçeklenir; akımlardan biri sıfırsa yok */
  const cek = tellerCekiyor(p), yok = kuvvetYok(p);
  const yon = cek ? 1 : -1;
  if (!yok) {
    const F = kuvvetBirim(p.i1, p.i2, p.d / 100);
    const boy = Math.max(12, Math.min(56, 12 + Math.sqrt(F * 1e6 / 2000) * 44));
    D.vektor(ctx, x1, cy + 26, x1 + boy * yon, cy + 26, R.kuvvet, '', { kalinlik: 3 });
    D.vektor(ctx, x2, cy + 26, x2 - boy * yon, cy + 26, R.kuvvet, '', { kalinlik: 3 });
  }

  D.rozet(ctx, yok ? 'AKIMSIZ TEL VAR · KUVVET YOK' : cek ? 'AYNI YÖN · ÇEKME' : 'ZIT YÖN · İTME', w / 2, 38,
          yok ? 'rgba(110,118,132,.92)' : cek ? 'rgba(47,111,208,.92)' : 'rgba(226,72,63,.92)', '#FFFFFF',
          '700 12px system-ui, sans-serif', true);

  D.olcu(ctx, x1, cy + 86, x2, cy + 86, 'd = ' + D.biçim(p.d) + ' cm', R.mur);

  const F = kuvvetBirim(p.i1, p.i2, p.d / 100);
  D.yaziAydinlik(ctx, 'F/L = ' + D.biçim(F * 1e6) + ' μN/m', w - 10, 18, R.kuvvet,
                 '700 12px system-ui, sans-serif', 'right');
  D.yaziAydinlik(ctx, 'DİKKAT: yüklerin tersi — aynı yön ÇEKER', 10, h - 12, R.ivme,
                 '700 11px system-ui, sans-serif', 'left');
}

/* ----------------------------------------- Klasik fizik görünümü */

function cizKlasik(ctx, w, h, st, pHam) {
  const p = etkin(st, pHam);
  D.izgara(ctx, w, h, 26);

  if (p.mod > 1.5) { klasikIkiTel(ctx, w, h, p); return; }
  const dOlcek = Math.max(18, Math.min(92, 14 + (p.d / 60) * 78));

  const d = p.d / 100;
  const B = alanTel(p.i1, d);

  /* --- sol: B − d eğrisi yerine şematik --- */
  D.yaziHaleli(ctx, 'Sağ el kuralı', 12, 22, K.beyaz, '700 12px system-ui, sans-serif', 'left');

  const cx = w * 0.22, cy = h * 0.46;
  const yon = p.i1 > 0 ? -1 : +1;
  ctx.save(); ctx.strokeStyle = K.eksen; ctx.lineWidth = 1.3;
  [30, 52].forEach(r => { ctx.beginPath(); ctx.arc(cx, cy, r, 0, 6.2832); ctx.stroke(); });
  ctx.restore();
  if (p.i1 !== 0) (p.i1 > 0 ? D.alanDisari : D.alanIceri)(ctx, cx, cy, 10, R.ivme);
  else D.noktaCisim(ctx, cx, cy, 6, K.metin2);
  D.yaziHaleli(ctx, p.i1 > 0 ? 'i ⊙' : p.i1 < 0 ? 'i ⊗' : 'i = 0', cx, cy + 74, R.ivme,
               '700 12px system-ui, sans-serif', 'center');
  D.yaziHaleli(ctx, p.i1 === 0 ? 'akım yok ⟹ B = 0'
                 : yon < 0 ? 'çizgiler: saat yönünün TERSİ' : 'çizgiler: SAAT yönünde',
               cx, cy + 92, K.metin2, '11px system-ui, sans-serif', 'center');

  /* ölçüm noktası: tele uzaklığı d ile orantılı; B oku teğet ve ∝ 1/d */
  const mx = cx + dOlcek;
  D.noktaCisim(ctx, mx, cy, 4, K.beyaz);
  const bBoy = alanOkBoyu(p.i1, p.d) * 0.6;
  if (bBoy > 0) D.vektor(ctx, mx, cy, mx, cy + yon * bBoy, R.normal, 'B', { kalinlik: 2.2 });

  /* --- sağ: hesap dökümü --- */
  const bx = w * 0.46;
  const satir = [
    ['B = μ₀·i / (2π·d)', K.beyaz, '700 12px system-ui, sans-serif'],
    ['μ₀ = 4π·10⁻⁷ T·m/A', K.metin2, '11px system-ui, sans-serif'],
    ['', K.metin2, '11px'],
    ['Kısa yol:  B = 2·10⁻⁷ · i / d', R.ivme, '700 12px system-ui, sans-serif'],
    ['= 2·10⁻⁷ · ' + D.biçim(Math.abs(p.i1)) + ' / ' + D.biçim(d, 3), K.metin2, '11px system-ui, sans-serif'],
    ['B = ' + D.biçim(B * 1e6) + ' μT', R.normal, '700 13px system-ui, sans-serif'],
    ['', K.metin2, '11px'],
    ['B ∝ i   ·   B ∝ 1/d', K.beyaz, '12px system-ui, sans-serif'],
    ['(ters kare DEĞİL — ters orantı)', R.kuvvet, '11px system-ui, sans-serif']
  ];
  /* Panel köşesindeki "KLASİK FİZİK GÖRÜNÜMÜ" etiketinin altından başlar. */
  let sy = 46;
  satir.forEach(([t, c, f]) => {
    if (t) D.yaziHaleli(ctx, t, bx, sy, c, f, 'left');
    sy += 17;
  });
}

function klasikIkiTel(ctx, w, h, p) {
  const cek = tellerCekiyor(p), yok = kuvvetYok(p);
  const d = p.d / 100;
  const cy = h * 0.34;
  const x1 = w * 0.08, x2 = x1 + 20 + (p.d / 60) * w * 0.40;

  D.yaziHaleli(ctx, 'İki paralel tel', 12, 22, K.beyaz, '700 12px system-ui, sans-serif', 'left');

  const telIsareti = (x, i) => i !== 0 ? (i > 0 ? D.alanDisari : D.alanIceri)(ctx, x, cy, 10, R.ivme)
                                      : D.noktaCisim(ctx, x, cy, 6, K.metin2);
  telIsareti(x1, p.i1);
  telIsareti(x2, p.i2);
  D.yaziHaleli(ctx, 'i₁', x1, cy + 26, K.beyaz, '600 11px system-ui, sans-serif', 'center');
  D.yaziHaleli(ctx, 'i₂', x2, cy + 26, K.beyaz, '600 11px system-ui, sans-serif', 'center');
  D.olcu(ctx, x1, cy - 34, x2, cy - 34, 'd = ' + D.biçim(d) + ' m', K.metin2);

  const yon = cek ? 1 : -1;
  const F = kuvvetBirim(p.i1, p.i2, d);
  if (!yok) {
    const boy = Math.max(10, Math.min(40, 10 + Math.sqrt(F * 1e6 / 2000) * 30));
    D.vektor(ctx, x1, cy + 48, x1 + boy * yon, cy + 48, R.kuvvet, 'F₁', { kalinlik: 2.4 });
    D.vektor(ctx, x2, cy + 48, x2 - boy * yon, cy + 48, R.kuvvet, 'F₂', { kalinlik: 2.4 });
  }
  const satir = [
    ['F/L = μ₀·i₁·i₂ / (2π·d)', K.beyaz],
    ['= 2·10⁻⁷ · ' + D.biçim(Math.abs(p.i1)) + '·' + D.biçim(Math.abs(p.i2)) + ' / ' + D.biçim(d, 3), K.metin2],
    ['F/L = ' + D.biçim(F * 1e6) + ' μN/m', R.kuvvet],
    ['', K.metin2],
    [yok ? 'Akımlardan biri 0 ⟹ kuvvet yok' : cek ? 'Aynı yön ⟹ ÇEKME' : 'Zıt yön ⟹ İTME',
     yok ? K.metin2 : cek ? R.normal : R.kuvvet]
  ];
  let sy = 26;
  satir.forEach(([t, c]) => {
    if (t) D.yaziHaleli(ctx, t, w - 12, sy, c, '700 12px system-ui, sans-serif', 'right');
    sy += 18;
  });

  D.yaziHaleli(ctx, 'Yüklerde aynı işaret İTERDİ — akımda aynı yön ÇEKER', 12, h - 16,
               R.ivme, '600 11px system-ui, sans-serif', 'left');
}

/* ------------------------------------------------------- Grafikler */

function cizGrafik(ctx, w, h, st, pHam) {
  const p = etkin(st, pHam);
  const pay = 8, gw = (w - pay * 3) / 2, gh = h - 6;

  if (p.mod > 1.5) {
    /* İki tel: F/L − d (ters orantı) ve F/L − i₂ (doğru orantı) */
    const f1 = [];
    for (let dd = 2; dd <= 60; dd += 1) f1.push({ t: dd, v: kuvvetBirim(p.i1, p.i2, dd / 100) * 1e6 });
    D.miniGrafik(ctx, {
      x: pay, y: 3, w: gw, h: gh,
      baslik: 'F/L − d   (ters orantı)', birim: 'μN/m', tEtiket: 'd (cm)',
      imlec: { t: p.d, v: kuvvetBirim(p.i1, p.i2, p.d / 100) * 1e6 },
      veri: f1, tMax: 60, vMin: 0, vMax: Math.max(1e-3, kuvvetBirim(p.i1, p.i2, 0.02) * 1e6),
      renk: R.kuvvet
    });
    const f2 = [];
    for (let ii = 0; ii <= 20; ii += 1) f2.push({ t: ii, v: kuvvetBirim(p.i1, ii, p.d / 100) * 1e6 });
    D.miniGrafik(ctx, {
      x: pay * 2 + gw, y: 3, w: gw, h: gh,
      baslik: 'F/L − |i₂|   (doğru orantı)', birim: 'μN/m', tEtiket: '|i₂| (A)',
      imlec: { t: Math.abs(p.i2), v: kuvvetBirim(p.i1, p.i2, p.d / 100) * 1e6 },
      veri: f2, tMax: 20, vMin: 0, vMax: Math.max(1e-3, kuvvetBirim(p.i1, 20, p.d / 100) * 1e6 * 1.05),
      renk: R.ivme
    });
    return;
  }

  /* B − d : ters ORANTI (hiperbol) */
  const v1 = [];
  for (let dd = 2; dd <= 60; dd += 1) v1.push({ t: dd, v: alanTel(p.i1, dd / 100) * 1e6 });
  D.miniGrafik(ctx, {
    x: pay, y: 3, w: gw, h: gh,
    baslik: 'B − d   (ters ORANTI: d 2 katına → B yarıya)', birim: 'μT', tEtiket: 'd (cm)',
    imlec: { t: p.d, v: alanTel(p.i1, p.d / 100) * 1e6 },
    veri: v1, tMax: 60, vMin: 0, vMax: alanTel(p.i1, 0.02) * 1e6,
    renk: R.normal
  });

  /* B − i : doğru orantı */
  const v2 = [];
  for (let ii = 0; ii <= 20; ii += 1) v2.push({ t: ii, v: alanTel(ii, p.d / 100) * 1e6 });
  D.miniGrafik(ctx, {
    x: pay * 2 + gw, y: 3, w: gw, h: gh,
    baslik: 'B − |i|   (doğru orantı · eğim = μ₀/2πd)', birim: 'μT', tEtiket: '|i| (A)',
    imlec: { t: Math.abs(p.i1), v: alanTel(p.i1, p.d / 100) * 1e6 },
    veri: v2, tMax: 20, vMin: 0, vMax: Math.max(1e-3, alanTel(20, p.d / 100) * 1e6 * 1.05),
    renk: R.ivme
  });
}

/* ----------------------------------------------------------- Okumalar */

function okumalar(st, pHam) {
  const p = etkin(st, pHam);
  const d = p.d / 100;
  if (p.mod > 1.5) {
    return [
      { et: 'Akım  i₁',   dg: D.biçim(p.i1),                      birim: 'A' },
      { et: 'Akım  i₂',   dg: D.biçim(p.i2),                      birim: 'A' },
      { et: 'Uzaklık  d', dg: D.biçim(p.d),                       birim: 'cm' },
      { et: 'F / L',      dg: D.biçim(kuvvetBirim(p.i1, p.i2, d) * 1e6), birim: 'μN/m' },
      { et: 'Etkileşim',  dg: etkilesimMetni(p), birim: '' }
    ];
  }
  return [
    { et: 'Akım  i',     dg: D.biçim(Math.abs(p.i1)),        birim: 'A' },
    { et: 'Yön',         dg: yonMetni(p.i1),               birim: '' },
    { et: 'Uzaklık  d',  dg: D.biçim(p.d),                   birim: 'cm' },
    { et: 'Alan  B',     dg: D.biçim(alanTel(p.i1, d) * 1e6), birim: 'μT' },
    { et: 'Çizgi biçimi',dg: 'İç içe çember',                birim: '' }
  ];
}

/* ------------------------------------------------------------- Tanım */

D.simler = D.simler || {};
D.simler['duz-tel-manyetik'] = {
  id: 'duz-tel-manyetik',
  baslik: '2.2.2 · Akım geçen düz telin manyetik alanı',
  yukseklik: 340,
  grafikPanel: true,
  grafikYukseklik: 170,
  parametreler: [
    { anahtar: 'mod', etiket: 'Düzenek', tur: 'secim', deger: 1, secenekler: [
      { d: 1, e: 'Tek tel (kesit)' },
      { d: 2, e: 'İki paralel tel' }
    ]},
    { anahtar: 'i1', etiket: 'Akım i₁', min: -20, max: 20, adim: 1, deger: 10, birim: 'A' },
    { anahtar: 'i2', etiket: 'Akım i₂', min: -20, max: 20, adim: 1, deger: 10, birim: 'A' },
    { anahtar: 'd',  etiket: 'Uzaklık d', min: 2, max: 60, adim: 2, deger: 20, birim: 'cm' }
  ],
  durum, adim, bitti, cizGercek, cizKlasik, cizGrafik, okumalar
};

})();
