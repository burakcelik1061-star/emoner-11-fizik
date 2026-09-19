(function () {
"use strict";
window.F11 = window.F11 || {};

/* ==========================================================================
   sims/miknatislar.js
   --------------------------------------------------------------------------
   Konu 2.2.1 · Mıknatısların etkileşimi ve manyetik alan  (MEB 11, s.186-197)

   ALAN ÇİZGİLERİ GERÇEKTEN HESAPLANIYOR
   -------------------------------------
   Çizgiler elle çizilmiş süslemeler değildir. Her mıknatıs, uçlarında zıt
   işaretli iki "manyetik yük" varmış gibi modellenir (Gilbert modeli) ve
   alan bu iki kaynağın ters-kare katkılarının toplamı olarak noktadan noktaya
   hesaplanır. Çizgiler bu alanı adım adım izleyerek çıkarılır.

   Bu model gerçek fizik değildir — manyetik tek kutup yoktur — ama çubuk
   mıknatısın DIŞINDAKİ alanı çok iyi verir ve lise düzeyinde tam olarak
   beklenen resmi üretir: çizgiler N’den çıkar, S’ye girer, hiç kesişmez.

   ÜÇ DÜZENEK
   ----------
   1) İki mıknatıs : Kutuplar seçilir. N-N itme, N-S çekme. Aradaki pusulalar
      alanın yönünü gösterir. Zıt kutuplarda çizgiler birleşir, aynı kutuplarda
      aralarında NÖTR NOKTA oluşur.
   2) Tek mıknatıs + pusula : Pusula gezdirilir, iğnenin daima çizgiye TEĞET
      durduğu görülür.
   3) Dünya : Coğrafi kuzey ile manyetik kuzey aynı yer değildir; aradaki açı
      SAPMA (deklinasyon) açısıdır. Türkiye için yaklaşık 5-6° doğudur.
   ========================================================================== */

const D = window.F11;
const { R, K } = D;

/* Dünya’nın manyetik alanı — gerçek mertebeler */
const DUNYA_TOPLAM = 50;      // μT, ortalama
const DUNYA_YATAY  = 24;      // μT, Türkiye enlemlerinde yaklaşık

/* ------------------------------------------------------------- Fizik */

/**
 * Bir mıknatısı iki kutup noktasıyla temsil eder.
 * ters = true ise N sağda olur.
 */
function kutuplar(m) {
  const yarim = m.boy / 2;
  const n = { x: m.x - yarim * (m.ters ? -1 : 1), y: m.y, g: +m.guc };
  const s = { x: m.x + yarim * (m.ters ? -1 : 1), y: m.y, g: -m.guc };
  return [n, s];
}

/** Verilen noktadaki toplam alan vektörü (keyfi birim). */
function alan(x, y, mknlar) {
  let bx = 0, by = 0;
  for (const m of mknlar) {
    for (const k of kutuplar(m)) {
      const dx = x - k.x, dy = y - k.y;
      const r2 = dx * dx + dy * dy;
      const r = Math.sqrt(r2);
      if (r < 6) continue;                    // kutup içine girme
      const c = k.g / (r2 * r);               // ters kare · birim vektör
      bx += c * dx; by += c * dy;
    }
  }
  return { bx, by };
}

/** Alan çizgisini adım adım izler; nokta dizisi döndürür. */
function cizgiIzle(x, y, mknlar, yon, w, h, adimSayisi = 260, adim = 4) {
  const yol = [{ x, y }];
  for (let i = 0; i < adimSayisi; i++) {
    const { bx, by } = alan(x, y, mknlar);
    const b = Math.hypot(bx, by);
    if (!isFinite(b) || b < 1e-12) break;
    x += (bx / b) * adim * yon;
    y += (by / b) * adim * yon;
    if (x < -20 || x > w + 20 || y < -20 || y > h + 20) { yol.push({ x, y }); break; }
    /* bir kutba çok yaklaştıysa dur */
    let bitti = false;
    for (const m of mknlar)
      for (const k of kutuplar(m))
        if (Math.hypot(x - k.x, y - k.y) < 9) bitti = true;
    yol.push({ x, y });
    if (bitti) break;
  }
  return yol;
}

/** İki mıknatıs çekiyor mu? Karşı karşıya gelen kutuplara bakılır. */
function cekiyor(p) {
  /* Sol mıknatısın SAĞ ucu ile sağ mıknatısın SOL ucu karşılaşır. */
  const solSagUc = p.ters1 ? 'N' : 'S';
  const sagSolUc = p.ters2 ? 'S' : 'N';
  return solSagUc !== sagSolUc;
}

/** Sapma (deklinasyon) açısı — pusula kuzeyinin coğrafi kuzeyden farkı. */
function sapmaAcisi(p, st) { return (st && st.sapma != null) ? st.sapma : p.sapma; }

/* -------------------------------------------------------------- Durum */

/* Hareket sabitleri.
   Mıknatıslar masa üstünde sürtünmeyle hareket eder; bu durumda hız,
   kuvvetle orantılı kabul edilebilir (aşırı sönümlü yaklaşım). Kutup
   modelinde kuvvet ~1/r² olduğu için hız da 1/r² ile değişir:
   çekmede yaklaştıkça HIZLANIR, itmede uzaklaştıkça YAVAŞLAR. */
const HIZ_KATSAYI = 12000;      // br³/s
const EN_AZ_HIZ   = 6;          // br/s — çok uzakta bile gözle görülür kalsın
const EN_YAKIN_ARA = 6;         // br — yapıştılar
const EN_UZAK_ARA  = 95;        // br — panelden çıkmasınlar

function durum(p) { return { t: 0, ara: p.ara, durdu: false, gezginAci: 0, sapma: p.sapma }; }

function adim(st, dt, p) {
  st.t += dt;
  /* Tek mıknatıs düzeneğinde gezici pusula mıknatısın çevresinde dolaşır;
     Dünya düzeneğinde sapma açısı taranır; iki mıknatıs düzeneğinde
     mıknatıslar gerçekten hareket eder. Her düzenekte bir şey oynar. */
  if (p.mod > 2.5) { st.sapma = D.tarama(st.t, p.sapma, p.sapma < 10 ? 20 : 0, 10); return; }
  if (p.mod > 1.5) { st.gezginAci = (st.t * 0.5) % (2 * Math.PI); return; }
  if (st.durdu) return;

  const yon = cekiyor(p) ? -1 : +1;
  const r = Math.max(EN_YAKIN_ARA, st.ara);
  const hiz = Math.max(EN_AZ_HIZ, HIZ_KATSAYI / (r * r));
  st.ara += yon * hiz * dt;

  if (st.ara <= EN_YAKIN_ARA) { st.ara = EN_YAKIN_ARA; st.durdu = true; }
  if (st.ara >= EN_UZAK_ARA)  { st.ara = EN_UZAK_ARA;  st.durdu = true; }
}

function bitti(st, p) { return p.mod < 1.5 && st.durdu; }

/** Kutup modeline göre bağıl kuvvet (çizimde ok boyunu ölçeklemek için). */
function bagilKuvvet(st) {
  const r = Math.max(EN_YAKIN_ARA, st.ara);
  return HIZ_KATSAYI / (r * r);
}

/* ---------------------------------------------- Ortak: mıknatıs listesi */

function mknListesi(w, h, p, st) {
  const cy = h * 0.52;
  const boy = Math.min(120, w * 0.20);
  if (p.mod < 1.5) {
    /* Kaydırıcı BAŞLANGIÇ aralığını verir; oynatınca mıknatıslar gerçekten
       hareket eder, o yüzden çizimde canlı aralık (st.ara) kullanılır. */
    const araBr = (st && st.ara != null) ? st.ara : p.ara;
    const ara = (araBr / 100) * w * 0.30;
    return [
      { x: w / 2 - ara - boy / 2, y: cy, boy, ters: !!p.ters1, guc: 1 },
      { x: w / 2 + ara + boy / 2, y: cy, boy, ters: !!p.ters2, guc: 1 }
    ];
  }
  return [{ x: w * 0.40, y: cy, boy: boy * 1.2, ters: !!p.ters1, guc: 1 }];
}

/* --------------------------------------------- Gerçekçi görünüm */

function cizGercek(ctx, w, h, st, p) {
  if (p.mod > 2.5) { cizDunya(ctx, w, h, st, p); return; }

  const mknlar = mknListesi(w, h, p, st);

  /* --- alan çizgileri --- */
  ctx.save();
  ctx.strokeStyle = 'rgba(56,150,200,.85)';
  ctx.lineWidth = 1.5;
  for (const m of mknlar) {
    const [n] = kutuplar(m);
    const adet = 9;
    for (let i = 0; i < adet; i++) {
      const a = (i / adet) * Math.PI * 2 + 0.34;
      const bx = n.x + Math.cos(a) * 11, by = n.y + Math.sin(a) * 11;
      const yol = cizgiIzle(bx, by, mknlar, +1, w, h);
      if (yol.length < 3) continue;
      ctx.beginPath();
      yol.forEach((q, j) => j ? ctx.lineTo(q.x, q.y) : ctx.moveTo(q.x, q.y));
      ctx.stroke();

      /* yön oku — çizginin ortasında */
      const o = yol[Math.floor(yol.length * 0.42)];
      const o2 = yol[Math.min(yol.length - 1, Math.floor(yol.length * 0.42) + 3)];
      if (o && o2) {
        const dx = o2.x - o.x, dy = o2.y - o.y, d = Math.hypot(dx, dy) || 1;
        const ux = dx / d, uy = dy / d;
        ctx.save(); ctx.fillStyle = 'rgba(56,150,200,.95)';
        ctx.beginPath();
        ctx.moveTo(o.x + ux * 6, o.y + uy * 6);
        ctx.lineTo(o.x - uy * 3.6 - ux * 2, o.y + ux * 3.6 - uy * 2);
        ctx.lineTo(o.x + uy * 3.6 - ux * 2, o.y - ux * 3.6 - uy * 2);
        ctx.closePath(); ctx.fill(); ctx.restore();
      }
    }
  }
  ctx.restore();

  /* --- mıknatıslar --- */
  const my = h * 0.52;
  for (const m of mknlar)
    D.miknatis(ctx, m.x - m.boy / 2, my - 17, m.boy, 34, m.ters);

  /* --- pusulalar: alana göre yönelirler --- */
  /* İki mıknatıs düzeneğinde ORTA pusula kuvvet oklarının üstüne denk geliyordu;
     kaldırıldı ve yerine yanlara birer pusula kondu. */
  const pusulaYerleri = p.mod < 1.5
    ? [[w / 2, my - 72], [w / 2, my + 72], [w * 0.12, my], [w * 0.88, my]]
    : (() => {
        /* Sabit iki pusula + mıknatısın çevresinde dolaşan bir GEZİCİ pusula */
        const a = (st && st.gezginAci) || 0;
        const rg = Math.min(w * 0.26, 118);
        return [[w * 0.74, my - 60], [w * 0.20, my + 70],
                [w * 0.46 + rg * Math.cos(a), my + rg * 0.52 * Math.sin(a)]];
      })();
  for (const [px, py] of pusulaYerleri) {
    const { bx, by } = alan(px, py, mknlar);
    D.pusula(ctx, px, py, 15, Math.atan2(by, bx));
  }

  /* --- durum rozeti --- */
  if (p.mod < 1.5) {
    const cek = cekiyor(p);
    D.rozet(ctx, cek ? 'ZIT KUTUPLAR · ÇEKME' : 'AYNI KUTUPLAR · İTME', w / 2, 38,
            cek ? 'rgba(47,111,208,.92)' : 'rgba(226,72,63,.92)', '#FFFFFF',
            '700 12px system-ui, sans-serif', true);

    /* kuvvet okları */
    const [m1, m2] = mknlar;
    const yon = cek ? 1 : -1;
    /* Ok boyu gerçek kuvvetle ölçeklenir: yaklaştıkça uzar, uzaklaştıkça kısalır. */
    const boyOk = Math.max(14, Math.min(54, 10 + bagilKuvvet(st) * 2.2));
    D.vektor(ctx, m1.x + m1.boy / 2 + 6, my, m1.x + m1.boy / 2 + 6 + boyOk * yon, my,
             R.kuvvet, '', { kalinlik: 3 });
    D.vektor(ctx, m2.x - m2.boy / 2 - 6, my, m2.x - m2.boy / 2 - 6 - boyOk * yon, my,
             R.kuvvet, '', { kalinlik: 3 });

    if (!cek)
      D.yaziAydinlik(ctx, 'aralarında NÖTR NOKTA var', w / 2, my + 108, R.mur,
                     '700 11px system-ui, sans-serif', 'center');
  } else {
    D.yaziAydinlik(ctx, 'pusula iğnesi daima çizgiye TEĞET durur', w / 2, h - 12,
                   R.mur, '600 11px system-ui, sans-serif', 'center');
  }

  D.yaziAydinlik(ctx, 'çizgiler N’den çıkar, S’ye girer', 10, h - 12, R.mur,
                 '600 11px system-ui, sans-serif', 'left');
}

function cizDunya(ctx, w, h, st, p) {
  const cx = w * 0.46, cy = h * 0.52, r = Math.min(w, h) * 0.26;

  /* uzay */
  ctx.fillStyle = '#0B1020'; ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = 'rgba(255,255,255,.55)';
  for (let i = 0; i < 40; i++) {
    const a = (i * 2.399) % 6.2832, rr = 0.3 + ((i * 37) % 100) / 100;
    ctx.fillRect(cx + Math.cos(a) * r * (1.6 + rr * 1.6),
                 cy + Math.sin(a) * r * (1.4 + rr * 1.4), 1.6, 1.6);
  }

  /* manyetik alan çizgileri — dipol */
  const egik = (sapmaAcisi(p, st) * Math.PI) / 180;
  const mkn = [{ x: cx, y: cy, boy: r * 0.9, ters: false, guc: 1 }];
  ctx.save();
  ctx.translate(cx, cy); ctx.rotate(egik + Math.PI / 2); ctx.translate(-cx, -cy);
  ctx.strokeStyle = 'rgba(80,180,220,.7)'; ctx.lineWidth = 1.4;
  for (let i = 0; i < 10; i++) {
    const a = (i / 10) * Math.PI * 2 + 0.3;
    const n = kutuplar(mkn[0])[0];
    const yol = cizgiIzle(n.x + Math.cos(a) * 12, n.y + Math.sin(a) * 12, mkn, +1, w, h, 200, 5);
    ctx.beginPath();
    yol.forEach((q, j) => j ? ctx.lineTo(q.x, q.y) : ctx.moveTo(q.x, q.y));
    ctx.stroke();
  }
  ctx.restore();

  /* Dünya */
  const g = ctx.createRadialGradient(cx - r * .3, cy - r * .35, r * .2, cx, cy, r);
  g.addColorStop(0, '#5AA9E6'); g.addColorStop(1, '#1B4A78');
  ctx.fillStyle = g;
  ctx.beginPath(); ctx.arc(cx, cy, r, 0, 6.2832); ctx.fill();
  ctx.fillStyle = 'rgba(90,170,90,.85)';
  ctx.beginPath(); ctx.ellipse(cx - r * .2, cy - r * .1, r * .42, r * .26, .4, 0, 6.2832); ctx.fill();
  ctx.beginPath(); ctx.ellipse(cx + r * .35, cy + r * .3, r * .28, r * .2, -.3, 0, 6.2832); ctx.fill();

  /* coğrafi eksen */
  D.kesikliCizgi(ctx, cx, cy - r - 30, cx, cy + r + 30, 'rgba(255,255,255,.75)', 1.6, [6, 5]);
  D.yaziHaleli(ctx, 'coğrafi kuzey', cx, cy - r - 40, '#EAF0FA',
               '600 11px system-ui, sans-serif', 'center');

  /* manyetik eksen — sapma açısı kadar eğik */
  const ux = Math.sin(egik), uy = -Math.cos(egik);
  D.kesikliCizgi(ctx, cx - ux * (r + 30), cy - uy * (r + 30),
                 cx + ux * (r + 30), cy + uy * (r + 30), '#FF6B6B', 1.8, [7, 4]);
  D.yaziHaleli(ctx, 'manyetik kuzey', cx + ux * (r + 46), cy + uy * (r + 46), '#FF6B6B',
               '600 11px system-ui, sans-serif', 'center');

  /* sapma açısı yayı */
  D.aciYayi && D.aciYayi(ctx, cx, cy - r - 10, 30, -Math.PI / 2, -Math.PI / 2 + egik,
                         R.ivme, D.biçim(sapmaAcisi(p, st)) + '°');

  /* pusula */
  D.pusula(ctx, w * 0.86, h * 0.30, 22, -Math.PI / 2 + egik);
  D.yaziHaleli(ctx, 'pusula', w * 0.86, h * 0.30 + 36, '#EAF0FA',
               '600 11px system-ui, sans-serif', 'center');

  D.yaziHaleli(ctx, 'Güneş rüzgârı saptırılır — Van Allen kuşakları', 10, h - 12,
               '#8FB6EC', '600 11px system-ui, sans-serif', 'left');
}

/* ----------------------------------------- Klasik fizik görünümü */

function cizKlasik(ctx, w, h, st, p) {
  D.izgara(ctx, w, h, 26);

  if (p.mod > 2.5) { klasikDunya(ctx, w, h, p); return; }

  const mknlar = mknListesi(w, h, p, st);
  const my = h * 0.40;
  const mk = mknListesi(w, my * 2, p, st);

  /* şematik: iki mıknatıs ve kutup adları */
  mk.forEach(m => D.miknatis(ctx, m.x - m.boy / 2, my - 15, m.boy, 30, m.ters));

  if (p.mod < 1.5) {
    const cek = cekiyor(p);
    const [m1, m2] = mk;
    const yon = cek ? 1 : -1;
    D.vektor(ctx, m1.x + m1.boy / 2 + 6, my, m1.x + m1.boy / 2 + 6 + 30 * yon, my,
             R.kuvvet, 'F', { kalinlik: 2.4 });
    D.vektor(ctx, m2.x - m2.boy / 2 - 6, my, m2.x - m2.boy / 2 - 6 - 30 * yon, my,
             R.kuvvet, 'F', { kalinlik: 2.4 });

    /* nötr nokta yalnız aynı kutuplarda ve tam ortada */
    if (!cek) {
      const ox = (m1.x + m2.x) / 2;
      D.noktaCisim(ctx, ox, my + 52, 5, R.hiz);
      D.yaziHaleli(ctx, 'nötr nokta · B = 0', ox, my + 70, R.hiz,
                   '700 11px system-ui, sans-serif', 'center');
    }

    const satir = [
      /* Kısa tutuldu: uzun satır panel köşesindeki etiketin altına giriyordu. */
      ['Kutuplar: ' + (p.ters1 ? 'N' : 'S') + ' — ' + (p.ters2 ? 'S' : 'N'), K.beyaz],
      [cek ? 'Zıt ⟹ ÇEKME' : 'Aynı ⟹ İTME', cek ? R.normal : R.kuvvet],
      ['Kuvvetler eşit ve zıt (Newton III)', K.metin2]
    ];
    /* Sağ özet ÜST köşeye alındı: alt bölge soldaki kural listesine ayrıldı,
       uzun satırlar birbirinin üstüne biniyordu. */
    let sy = 26;
    satir.forEach(([t, c]) => {
      D.yaziHaleli(ctx, t, w - 12, sy, c, '700 12px system-ui, sans-serif', 'right'); sy += 18;
    });
  }

  /* alan çizgisi kuralları */
  const kural = [
    'N’den çıkar, S’ye girer (dışarıda)',
    'Kapalı eğridir — mıknatısın içinde S’den N’ye',
    'Asla kesişmez',
    'Sıklık = alanın şiddeti'
  ];
  let ky = h - 16 - (kural.length - 1) * 16;
  kural.forEach(t => {
    D.yaziHaleli(ctx, '· ' + t, 12, ky, K.metin2, '11px system-ui, sans-serif', 'left');
    ky += 16;
  });
}

function klasikDunya(ctx, w, h, p) {
  const sapma = sapmaAcisi(p);
  const rad = (sapma * Math.PI) / 180;
  const cx = w * 0.28, cy = h * 0.46, L = 78;

  D.yaziHaleli(ctx, 'Sapma (deklinasyon) açısı', 12, 22, K.beyaz,
               '700 12px system-ui, sans-serif', 'left');

  /* coğrafi kuzey */
  D.vektor(ctx, cx, cy + L / 2, cx, cy - L / 2, K.beyaz, '', { kalinlik: 2.4 });
  D.yaziHaleli(ctx, 'coğrafi K', cx, cy - L / 2 - 14, K.beyaz,
               '600 11px system-ui, sans-serif', 'center');

  /* manyetik kuzey */
  const ex = cx + Math.sin(rad) * L, ey = cy + L / 2 - Math.cos(rad) * L;
  D.vektor(ctx, cx, cy + L / 2, ex, ey, R.kuvvet, '', { kalinlik: 2.4 });
  D.yaziHaleli(ctx, 'manyetik K', ex + 16, ey - 8, R.kuvvet,
               '600 11px system-ui, sans-serif', 'left');

  const satir = [
    ['Sapma açısı = ' + D.biçim(sapma) + '°', R.ivme],
    ['Türkiye’de ≈ 5–6° doğu', K.metin2],
    ['', K.metin2],
    ['B_toplam ≈ ' + DUNYA_TOPLAM + ' μT', K.beyaz],
    ['B_yatay ≈ ' + DUNYA_YATAY + ' μT', R.normal],
    ['Pusula YALNIZ yatay bileşeni izler', K.metin2]
  ];
  let sy = 44;
  satir.forEach(([t, c]) => {
    if (t) D.yaziHaleli(ctx, t, w - 12, sy, c, '700 12px system-ui, sans-serif', 'right');
    sy += 18;
  });

  D.yaziHaleli(ctx, 'Dünya’nın manyetik GÜNEY kutbu, coğrafi KUZEY’dedir', 12, h - 16,
               R.ivme, '600 11px system-ui, sans-serif', 'left');
}

/* ----------------------------------------------------------- Okumalar */

function okumalar(st, p) {
  if (p.mod > 2.5) {
    const rad = (sapmaAcisi(p, st) * Math.PI) / 180;
    return [
      { et: 'Sapma açısı',      dg: D.biçim(sapmaAcisi(p, st)),             birim: '°' },
      { et: 'B toplam',         dg: String(DUNYA_TOPLAM),                   birim: 'μT' },
      { et: 'B yatay',          dg: String(DUNYA_YATAY),                    birim: 'μT' },
      { et: 'B düşey',          dg: D.biçim(Math.sqrt(Math.max(0, DUNYA_TOPLAM * DUNYA_TOPLAM - DUNYA_YATAY * DUNYA_YATAY))), birim: 'μT' },
      { et: 'Pusula sapması',   dg: D.biçim(Math.sin(rad) * 100),           birim: 'cm/m' }
    ];
  }
  if (p.mod < 1.5) {
    const cek = cekiyor(p);
    return [
      { et: 'Sol mıknatısın sağ ucu', dg: p.ters1 ? 'N' : 'S', birim: '' },
      { et: 'Sağ mıknatısın sol ucu', dg: p.ters2 ? 'S' : 'N', birim: '' },
      { et: 'Etkileşim',              dg: cek ? 'Çekme' : 'İtme', birim: '' },
      { et: 'Aralık (canlı)',         dg: D.biçim(st.ara),        birim: 'br' },
      { et: 'Bağıl kuvvet',           dg: D.biçim(bagilKuvvet(st) / (HIZ_KATSAYI / (p.ara * p.ara)), 3), birim: '× başlangıç' },
      { et: 'Durum',                  dg: st.durdu ? (cek ? 'Yapıştılar' : 'Ayrıldılar') : (cek ? 'Yaklaşıyorlar' : 'İtiliyorlar'), birim: '' },
      { et: 'Nötr nokta',             dg: cek ? 'Yok (aralarında)' : 'Var (tam ortada)', birim: '' }
    ];
  }
  return [
    { et: 'Mıknatıs',      dg: p.ters1 ? 'S — N' : 'N — S', birim: '' },
    { et: 'Çizgi yönü',    dg: 'N’den çıkar, S’ye girer',   birim: '' },
    { et: 'Pusula iğnesi', dg: 'Çizgiye teğet',             birim: '' },
    { et: 'Kesişme',       dg: 'Yok — asla',                birim: '' }
  ];
}

/* ------------------------------------------------------------- Tanım */

D.simler = D.simler || {};
D.simler['miknatislar'] = {
  id: 'miknatislar',
  baslik: '2.2.1 · Mıknatıslar · alan çizgileri ve pusula',
  yukseklik: 360,
  parametreler: [
    { anahtar: 'mod', etiket: 'Düzenek', tur: 'secim', deger: 1, secenekler: [
      { d: 1, e: 'İki mıknatıs (itme / çekme)' },
      { d: 2, e: 'Tek mıknatıs + pusula' },
      { d: 3, e: 'Dünya’nın manyetik alanı' }
    ]},
    { anahtar: 'ters1', etiket: 'Sol mıknatıs', tur: 'secim', deger: 0, secenekler: [
      { d: 0, e: 'N — S' },
      { d: 1, e: 'S — N (çevrik)' }
    ]},
    { anahtar: 'ters2', etiket: 'Sağ mıknatıs', tur: 'secim', deger: 0, secenekler: [
      { d: 0, e: 'N — S' },
      { d: 1, e: 'S — N (çevrik)' }
    ]},
    { anahtar: 'ara',   etiket: 'Aralarındaki uzaklık', min: 10, max: 100, adim: 5, deger: 40, birim: 'br' },
    { anahtar: 'sapma', etiket: 'Sapma açısı', min: 0, max: 20, adim: 1, deger: 6, birim: '°' }
  ],
  durum, adim, bitti, cizGercek, cizKlasik, okumalar
};

})();
