(function () {
"use strict";
window.F11 = window.F11 || {};

/* ==========================================================================
   sims/tele-etki-kuvvet.js
   --------------------------------------------------------------------------
   Konu 2.2.5 · Manyetik alanda akım geçen düz tele etki eden kuvvet
                                                    (MEB 11, s.218-228)

   Matematiksel model:
       F = B · i · L · sinα
   α : akım ile manyetik alan arasındaki açı.
       α = 90°  → F en büyük (F = BiL)
       α = 0°   → F = 0        (tel alana PARALEL ise kuvvet yoktur)

   YÖN — SOL EL KURALI (MEB gösterimi)
   -----------------------------------
   Sol elin parmakları alanı, başparmak akımı gösterecek şekilde tutulur;
   avuç içinin baktığı yön kuvvetin yönüdür. Bu kural, önceki konudaki
   SAĞ el kuralıyla karıştırılmamalıdır:
       sağ el  → akımın ÜRETTİĞİ alanın yönü
       sol el  → alanın tele UYGULADIĞI kuvvetin yönü

   ÜÇ DÜZENEK
   ----------
   1) Açı : α değiştirilir, sinüs bağımlılığı doğrudan görülür.
   2) Raylı tel : Tel serbesttir, kuvvet altında hızlanır (ivme = F/m).
   3) Hoparlör : Akım yön değiştirdikçe bobin ileri-geri gider; ses böyle üretilir.
   ========================================================================== */

const D = window.F11;
const { R, K } = D;

/* ------------------------------------------------------------- Fizik */

function acıRad(p) { return (p.aci * Math.PI) / 180; }

/** Tele etki eden kuvvet (N). */
/**
 * Etkin açı (radyan).
 * Açı düzeneğinde teli kullanıcı eğer. Ray ve hoparlör düzeneklerinde ise
 * çubuk, sayfaya dik alana göre zaten DİKTİR — orada α daima 90°'dir.
 * (Önceki sürümde açı kaydırıcısı bu düzeneklerde de F'yi değiştiriyordu;
 * çizim dik dururken sayı değişiyordu.)
 */
function etkinAci(p, st) {
  if (p.mod >= 1.5) return Math.PI / 2;
  const a = (st && st.aci != null) ? st.aci : p.aci;
  return (a * Math.PI) / 180;
}

function kuvvet(p, st) {
  return p.B * Math.abs(p.i) * (p.L / 100) * Math.sin(etkinAci(p, st));
}

/** Serbest telin ivmesi (m/s²). */
function ivme(p, st) {
  return kuvvet(p, st) / (p.m / 1000);
}

/**
 * Kuvvetin işaretli yönü (+1 / −1).
 * Açı düzeneğinde alan sayfa düzlemindedir, kuvvet sayfaya diktir:
 *   +1 → sayfadan dışarı ⊙,  −1 → sayfanın içine ⊗   (yalnız akımın işareti belirler)
 * Ray ve hoparlör düzeneklerinde alan sayfaya diktir, kuvvet sayfa düzlemindedir:
 *   +1 → sağa,  −1 → sola    (akım ve alan yönü birlikte belirler)
 */
function kuvvetYonu(p) {
  const iIsaret = p.i >= 0 ? 1 : -1;
  if (p.mod < 1.5) return iIsaret;
  return iIsaret * (p.Byon >= 0 ? 1 : -1);
}

/* -------------------------------------------------------------- Durum */

function durum(p) {
  return { t: 0, x: 0, v: 0, cikti: false, kayit: [], hopFaz: 0, hopX: 0, aci: p.aci };
}

function adim(st, dt, p) {
  st.t += dt;

  if (p.mod < 1.5) {
    /* Açı düzeneği: telin alanla yaptığı açı taranır; F = BiL·sinα'nın
       90°'de en büyük, 0° ve 180°'de sıfır olduğu canlı görünür. */
    st.aci = D.tarama(st.t, p.aci, p.aci < 90 ? 175 : 5, 12);
    return;
  }

  if (p.mod > 2.5) {
    /* Hoparlör: akım sinüs biçiminde salınır, bobin de onunla gider gelir */
    st.hopFaz += dt * p.f * 2 * Math.PI;
    st.hopX = Math.sin(st.hopFaz);
    return;
  }
  if (p.mod < 1.5) return;                 // açı düzeneği durağan

  if (st.cikti) return;

  /* Raylı tel: sabit kuvvet ⟹ sabit ivme (1. üniteyle aynı) */
  const a = ivme(p, st) * kuvvetYonu(p);
  st.v += a * dt;
  st.x += st.v * dt;

  /* Akım ya da sin α sıfırsa tel hiç hareket etmez, 'cikti' tetiklenmez;
     kayıt sınırsız büyümesin. */
  if (st.kayit.length === 0 || st.t - st.kayit[st.kayit.length - 1].t > 0.01)
    st.kayit.push({ t: st.t, v: Math.abs(st.v) });
  if (st.kayit.length > 400) st.kayit.shift();

  if (Math.abs(st.x) >= 0.5) { st.x = Math.sign(st.x) * 0.5; st.cikti = true; }
}

function bitti(st, p) { return p.mod > 1.5 && p.mod < 2.5 && st.cikti; }

/* --------------------------------------------- Gerçekçi görünüm */

function cizGercek(ctx, w, h, st, p) {
  if (p.mod < 1.5)      cizAci(ctx, w, h, st, p);
  else if (p.mod < 2.5) cizRay(ctx, w, h, st, p);
  else                  cizHoparlor(ctx, w, h, st, p);
}

/** Alan bölgesini ⊗ / ⊙ ızgarasıyla boyar. */
function alanArkaPlani(ctx, x, y, bw, bh, Byon) {
  ctx.save();
  ctx.fillStyle = 'rgba(56,150,200,.10)';
  ctx.fillRect(x, y, bw, bh);
  ctx.strokeStyle = 'rgba(56,150,200,.45)'; ctx.lineWidth = 1.2;
  ctx.strokeRect(x, y, bw, bh);
  ctx.restore();
  D.alanBolgesi(ctx, x, y, bw, bh, Byon, 'rgba(47,111,208,.75)', 38);
}

/**
 * Açı düzeneğinde alan SAYFA DÜZLEMİNDE, yataydır.
 * Bunun sebebi geometridir: α, akım ile alan arasındaki açıdır. Alanı sayfaya
 * dik (⊗) çizersek tel ile alan arasındaki açı her zaman 90° olur ve α’yı
 * değiştirmek anlamsızlaşırdı. Alan sayfa düzleminde olunca α gerçekten
 * değişebilir ve kuvvet de sayfaya DİK çıkar (⊙ / ⊗).
 */
function cizAci(ctx, w, h, st, p) {
  const bx = w * 0.10, by = h * 0.16, bw = w * 0.78, bh = h * 0.58;

  ctx.save();
  ctx.fillStyle = 'rgba(56,150,200,.10)';
  ctx.fillRect(bx, by, bw, bh);
  ctx.strokeStyle = 'rgba(56,150,200,.45)'; ctx.lineWidth = 1.2;
  ctx.strokeRect(bx, by, bw, bh);
  ctx.restore();

  /* alan çizgileri: yatay, eşit aralıklı, sağa doğru */
  ctx.save();
  ctx.strokeStyle = 'rgba(47,111,208,.7)'; ctx.lineWidth = 1.5;
  const satirAdet = 5;
  for (let k = 0; k < satirAdet; k++) {
    const yy = by + 22 + k * ((bh - 44) / (satirAdet - 1));
    ctx.beginPath(); ctx.moveTo(bx + 10, yy); ctx.lineTo(bx + bw - 10, yy); ctx.stroke();
    const mx = bx + bw * 0.80;
    ctx.save(); ctx.fillStyle = 'rgba(47,111,208,.9)';
    ctx.beginPath();
    ctx.moveTo(mx + 7, yy); ctx.lineTo(mx - 3, yy - 4.5); ctx.lineTo(mx - 3, yy + 4.5);
    ctx.closePath(); ctx.fill(); ctx.restore();
  }
  ctx.restore();

  const cx = bx + bw / 2, cy = by + bh / 2;
  const boy = Math.min(bw * 0.40, 160);
  const a = etkinAci(p, st);          // taranan açı — tel gerçekten döner

  /* tel — alanla α açısı yapacak şekilde döndürülür */
  const ux = Math.cos(a), uy = -Math.sin(a);
  ctx.save();
  ctx.strokeStyle = '#B87333'; ctx.lineWidth = 8; ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(cx - ux * boy, cy - uy * boy);
  ctx.lineTo(cx + ux * boy, cy + uy * boy);
  ctx.stroke(); ctx.restore();

  /* akım yönü oku telin üstünde */
  const yon = p.i >= 0 ? 1 : -1;
  D.vektor(ctx, cx - ux * 26 * yon, cy - uy * 26 * yon,
           cx + ux * 30 * yon, cy + uy * 30 * yon, R.ivme, '', { kalinlik: 3 });
  D.yaziAydinlik(ctx, 'i = ' + D.biçim(Math.abs(p.i)) + ' A',
                 cx + ux * boy * 0.72, cy + uy * boy * 0.72 - 16, R.ivme,
                 '700 12px system-ui, sans-serif', 'center');

  /* referans doğrultu (alan yönü, yatay) ve açı yayı */
  D.kesikliCizgi(ctx, cx, cy, cx + boy * 0.8, cy, 'rgba(47,111,208,.8)', 1.6, [6, 5]);
  D.aciYayi(ctx, cx, cy, 46, 0, -a, R.ivme, D.biçim(p.mod < 1.5 ? (st.aci ?? p.aci) : 90) + '°');

  /* kuvvet — sayfaya dik! ⊙ ya da ⊗ */
  const F = kuvvet(p, st);
  const disari = kuvvetYonu(p) > 0;
  if (F > 1e-9) {
    const fx = cx, fy = by + bh + 30;
    (disari ? D.alanDisari : D.alanIceri)(ctx, fx, fy, 13, R.kuvvet);
    D.yaziAydinlik(ctx, 'F = ' + D.biçim(F, 3) + ' N ' + (disari ? '⊙ dışarı' : '⊗ içeri'),
                   fx + 26, fy, R.kuvvet, '700 12px system-ui, sans-serif', 'left');
  } else {
    D.yaziAydinlik(ctx, 'F = 0 — tel alana PARALEL', cx, by + bh + 32, R.hiz,
                   '700 13px system-ui, sans-serif', 'center');
  }

  /* Panel köşesindeki etiketin ALTINA konur. */
  D.yaziAydinlik(ctx, 'B = ' + D.biçim(p.B, 2) + ' T · düzlemde, sağa',
                 10, 44, R.normal, '700 12px system-ui, sans-serif', 'left');
  D.yaziAydinlik(ctx, 'kuvvet daima hem akıma hem alana DİKTİR ⟹ sayfaya dik çıkar',
                 10, h - 12, R.mur, '600 11px system-ui, sans-serif', 'left');
}

function cizRay(ctx, w, h, st, p) {
  const bx = w * 0.06, by = h * 0.18, bw = w * 0.88, bh = h * 0.52;
  alanArkaPlani(ctx, bx, by, bw, bh, p.Byon);

  /* iki ray */
  const ust = by + bh * 0.26, alt = by + bh * 0.74;
  ctx.fillStyle = '#9AA5B1';
  ctx.fillRect(bx + 8, ust - 3, bw - 16, 6);
  ctx.fillRect(bx + 8, alt - 3, bw - 16, 6);

  /* hareketli tel */
  const merkez = bx + bw / 2;
  const olcek = (bw * 0.40) / 0.5;
  const tx = merkez + st.x * olcek;
  ctx.save();
  ctx.strokeStyle = '#B87333'; ctx.lineWidth = 9; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(tx, ust); ctx.lineTo(tx, alt); ctx.stroke();
  ctx.restore();

  /* akım yönü — telde yukarı/aşağı */
  const iy = p.i >= 0 ? -1 : 1;
  D.vektor(ctx, tx, (ust + alt) / 2 - iy * 16, tx, (ust + alt) / 2 + iy * 22,
           R.ivme, '', { kalinlik: 2.6 });

  /* kuvvet oku — raylar boyunca */
  const F = kuvvet(p, st), yon = kuvvetYonu(p);
  if (F > 1e-9)
    D.vektor(ctx, tx, alt + 26, tx + 46 * yon, alt + 26, R.kuvvet, 'F', { kalinlik: 3 });

  /* pil */
  ctx.fillStyle = '#4A5059';
  D.yuvarlakDik(ctx, bx + 10, alt + 34, 42, 20, 4); ctx.fill();
  D.yaziAydinlik(ctx, 'pil', bx + 31, alt + 44, '#FFFFFF', '600 10px system-ui, sans-serif', 'center');

  D.yaziAydinlik(ctx, 'F = ' + D.biçim(F, 3) + ' N · a = ' + D.biçim(ivme(p, st)) + ' m/s²',
                 w - 10, 22, R.kuvvet, '700 12px system-ui, sans-serif', 'right');
  D.yaziAydinlik(ctx, 'ϑ = ' + D.biçim(Math.abs(st.v)) + ' m/s',
                 w - 10, 40, R.hiz, '700 12px system-ui, sans-serif', 'right');
  D.yaziAydinlik(ctx, 'B = ' + D.biçim(p.B, 2) + ' T ' + (p.Byon > 0 ? '⊙' : '⊗'),
                 10, 44, R.normal, '700 12px system-ui, sans-serif', 'left');
  D.yaziAydinlik(ctx, 'sabit kuvvet ⟹ sabit ivme — 1. ünitedeki gibi',
                 10, h - 12, R.mur, '600 11px system-ui, sans-serif', 'left');
}

function cizHoparlor(ctx, w, h, st, p) {
  const cx = w * 0.40, cy = h * 0.50;

  /* kalıcı mıknatıs (halka) */
  ctx.fillStyle = '#5F6B78';
  D.yuvarlakDik(ctx, cx - 76, cy - 62, 44, 124, 6); ctx.fill();
  ctx.fillStyle = '#E2483F'; ctx.fillRect(cx - 76, cy - 62, 44, 20);
  ctx.fillStyle = '#2F6FD0'; ctx.fillRect(cx - 76, cy + 42, 44, 20);

  /* bobin — akımla ileri geri */
  const kayma = st.hopX * 18;
  ctx.save();
  ctx.strokeStyle = '#B87333'; ctx.lineWidth = 4;
  for (let k = 0; k < 5; k++) {
    const x = cx - 18 + kayma + k * 7;
    ctx.beginPath(); ctx.ellipse(x, cy, 5, 30, 0, 0, 6.2832); ctx.stroke();
  }
  ctx.restore();

  /* konik diyafram */
  ctx.save();
  ctx.fillStyle = 'rgba(180,160,130,.9)';
  ctx.beginPath();
  ctx.moveTo(cx + 18 + kayma, cy - 32);
  ctx.lineTo(cx + 120 + kayma, cy - 76);
  ctx.lineTo(cx + 120 + kayma, cy + 76);
  ctx.lineTo(cx + 18 + kayma, cy + 32);
  ctx.closePath(); ctx.fill();
  ctx.strokeStyle = 'rgba(120,100,70,.9)'; ctx.lineWidth = 2; ctx.stroke();
  ctx.restore();

  /* ses dalgaları */
  ctx.save();
  ctx.strokeStyle = 'rgba(53,192,138,.8)'; ctx.lineWidth = 2;
  for (let k = 1; k <= 3; k++) {
    const r = 26 + k * 24 + st.hopX * 6;
    ctx.beginPath();
    ctx.arc(cx + 124, cy, r, -0.7, 0.7);
    ctx.stroke();
  }
  ctx.restore();

  const F = p.B * Math.abs(p.i * st.hopX) * (p.L / 100);
  D.yaziAydinlik(ctx, 'anlık F = ' + D.biçim(F, 3) + ' N', w - 10, 22, R.kuvvet,
                 '700 12px system-ui, sans-serif', 'right');
  D.yaziAydinlik(ctx, 'f = ' + D.biçim(p.f) + ' Hz', w - 10, 40, R.ivme,
                 '700 12px system-ui, sans-serif', 'right');
  D.rozet(ctx, 'HOPARLÖR · akım yön değiştirdikçe bobin gider gelir', w / 2, 52,
          'rgba(47,111,208,.92)', '#FFFFFF', '700 11px system-ui, sans-serif', true);
  D.yaziAydinlik(ctx, 'kalıcı mıknatıs sabit, hareket eden şey AKIMLI bobin',
                 10, h - 12, R.mur, '600 11px system-ui, sans-serif', 'left');
}

/* ----------------------------------------- Klasik fizik görünümü */

function cizKlasik(ctx, w, h, st, p) {
  D.izgara(ctx, w, h, 26);
  const F = kuvvet(p, st);

  /* sol: sol el kuralı şeması */
  D.yaziHaleli(ctx, 'Sol el kuralı', 12, 22, K.beyaz, '700 12px system-ui, sans-serif', 'left');

  const cx = w * 0.22, cy = h * 0.44;
  const a = etkinAci(p, st);
  const disari = kuvvetYonu(p) > 0;

  if (p.mod < 1.5) {
    /* Açı düzeneği: B sayfa düzleminde yatay, i açılı, F sayfaya dik */
    D.vektor(ctx, cx - 54, cy + 34, cx + 54, cy + 34, R.normal, 'B', { kalinlik: 2.4 });
    D.vektor(ctx, cx - Math.cos(a) * 46, cy + 34 + Math.sin(a) * 46,
             cx + Math.cos(a) * 46, cy + 34 - Math.sin(a) * 46, R.ivme, 'i', { kalinlik: 2.4 });
    (disari ? D.alanDisari : D.alanIceri)(ctx, cx, cy - 34, 13, R.kuvvet);
    D.yaziHaleli(ctx, 'F ' + (disari ? '⊙' : '⊗'), cx + 24, cy - 34, R.kuvvet,
                 '700 12px system-ui, sans-serif', 'left');
    D.aciYayi(ctx, cx, cy + 34, 34, 0, -a, K.metin2, D.biçim(p.mod < 1.5 ? (st.aci ?? p.aci) : 90) + '°');
  } else {
    /* Ray ve hoparlör: B sayfaya dik (⊗/⊙), i düşey, F sayfa düzleminde yatay.
       Gerçekçi panelle aynı geometri gösterilmezse öğrenci iki paneli
       eşleştiremez; bu yüzden şema moda göre değişir. */
    (p.Byon > 0 ? D.alanDisari : D.alanIceri)(ctx, cx - 46, cy, 12, R.normal);
    (p.Byon > 0 ? D.alanDisari : D.alanIceri)(ctx, cx - 46, cy - 34, 12, R.normal);
    (p.Byon > 0 ? D.alanDisari : D.alanIceri)(ctx, cx - 46, cy + 34, 12, R.normal);
    D.yaziHaleli(ctx, 'B ' + (p.Byon > 0 ? '⊙' : '⊗'), cx - 46, cy + 62, R.normal,
                 '700 12px system-ui, sans-serif', 'center');
    const iy = p.i >= 0 ? -1 : 1;
    D.vektor(ctx, cx + 26, cy - iy * 40, cx + 26, cy + iy * 40, R.ivme, 'i', { kalinlik: 2.4 });
    D.vektor(ctx, cx + 26, cy, cx + 26 + 48 * (disari ? 1 : -1), cy, R.kuvvet, 'F', { kalinlik: 2.6 });
  }

  /* sağ: hesap */
  const bx = w * 0.48;
  const satir = [
    ['F = B · i · L · sinα', K.beyaz, '700 12px system-ui, sans-serif'],
    ['B = ' + D.biçim(p.B, 2) + ' T', K.metin2, '11px system-ui, sans-serif'],
    ['i = ' + D.biçim(Math.abs(p.i)) + ' A', K.metin2, '11px system-ui, sans-serif'],
    ['L = ' + D.biçim(p.L / 100, 2) + ' m', K.metin2, '11px system-ui, sans-serif'],
    ['sin' + D.biçim(p.mod < 1.5 ? p.aci : 90) + '° = ' +
      D.biçim(Math.sin(etkinAci(p, st)), 3), R.ivme, '11px system-ui, sans-serif'],
    ['F = ' + D.biçim(F, 4) + ' N', R.kuvvet, '700 13px system-ui, sans-serif'],
    ['', K.metin2, '11px'],
    /* Açı düzeneğinde F sayfaya DİK; ray/hoparlörde sayfa DÜZLEMİNDE. */
    ['Yön: ' + (p.mod < 1.5
        ? (disari ? 'sayfadan DIŞARI ⊙' : 'sayfanın İÇİNE ⊗')
        : (disari ? 'SAĞA →' : 'SOLA ←')),
      R.normal, '700 12px system-ui, sans-serif'],
    ['F ⊥ i  ve  F ⊥ B', K.metin2, '11px system-ui, sans-serif']
  ];
  let sy = 46;
  satir.forEach(([t, c, f]) => {
    if (t) D.yaziHaleli(ctx, t, bx, sy, c, f, 'left');
    sy += 17;
  });

  D.yaziHaleli(ctx, p.aci < 1 ? 'α = 0 ⟹ sinα = 0 ⟹ KUVVET YOK'
                              : 'SAĞ el alan üretir · SOL el kuvvet verir',
               12, h - 16, p.aci < 1 ? R.hiz : R.ivme,
               '600 11px system-ui, sans-serif', 'left');
}

/* ------------------------------------------------------- Grafikler */

function cizGrafik(ctx, w, h, st, p) {
  const pay = 8, gw = (w - pay * 3) / 2, gh = h - 6;

  /* F − α : sinüs */
  const v1 = [];
  for (let ac = 0; ac <= 180; ac += 2)
    v1.push({ t: ac, v: p.B * Math.abs(p.i) * (p.L / 100) * Math.sin(ac * Math.PI / 180) });
  D.miniGrafik(ctx, {
    x: pay, y: 3, w: gw, h: gh,
    baslik: 'F − α   (90°’de en büyük · 0° ve 180°’de SIFIR)', birim: 'N', tEtiket: 'α (°)',
    imlec: { t: (etkinAci(p, st) * 180) / Math.PI, v: kuvvet(p, st) },
    veri: v1, tMax: 180, vMin: 0,
    vMax: Math.max(1e-4, p.B * Math.abs(p.i) * (p.L / 100) * 1.1),
    renk: R.kuvvet
  });

  if (p.mod > 1.5 && p.mod < 2.5) {
    D.miniGrafik(ctx, {
      x: pay * 2 + gw, y: 3, w: gw, h: gh,
      baslik: 'ϑ − t   (sabit kuvvet ⟹ DOĞRU)', birim: 'm/s',
      veri: st.kayit, tMin: st.kayit.length ? st.kayit[0].t : 0,
      tMax: Math.max(0.2, st.t), vMin: 0,
      vMax: Math.max(0.1, Math.abs(st.v) * 1.2),
      renk: R.hiz
    });
  } else {
    const v2 = [];
    for (let ii = 0; ii <= 20; ii += 0.5)
      v2.push({ t: ii, v: p.B * ii * (p.L / 100) * Math.sin(etkinAci(p, st)) });
    D.miniGrafik(ctx, {
      x: pay * 2 + gw, y: 3, w: gw, h: gh,
      baslik: 'F − i   (doğru orantı · eğim = B·L·sinα)', birim: 'N', tEtiket: 'i (A)',
      /* Hoparlörde akım salınır; imleç ANLIK akımı izler. */
      imlec: { t: Math.abs(p.mod > 2.5 ? p.i * st.hopX : p.i),
               v: p.B * Math.abs(p.mod > 2.5 ? p.i * st.hopX : p.i) * (p.L / 100) * Math.sin(etkinAci(p, st)) },
      veri: v2, tMax: 20, vMin: 0,
      vMax: Math.max(1e-4, p.B * 20 * (p.L / 100) * Math.max(0.05, Math.sin(etkinAci(p, st))) * 1.1),
      renk: R.ivme
    });
  }
}

/* ----------------------------------------------------------- Okumalar */

function okumalar(st, p) {
  const F = kuvvet(p, st);
  const o = [
    { et: 'Alan  B',   dg: D.biçim(p.B, 2) + (p.mod < 1.5 ? ' (düzlemde)' : (p.Byon > 0 ? ' ⊙' : ' ⊗')), birim: 'T' },
    { et: 'Akım  i',   dg: D.biçim(Math.abs(p.i)),          birim: 'A' },
    { et: 'Uzunluk  L',dg: D.biçim(p.L),                    birim: 'cm' },
    { et: 'Açı  α',    dg: D.biçim(p.aci),                  birim: '°' },
    { et: 'Kuvvet  F', dg: D.biçim(F, 4),                   birim: 'N' },
    { et: 'Kuvvetin yönü', dg: F < 1e-9 ? 'Kuvvet yok'
        : (p.mod < 1.5 ? (kuvvetYonu(p) > 0 ? 'Sayfadan dışarı ⊙' : 'Sayfanın içine ⊗')
                       : (kuvvetYonu(p) > 0 ? 'Sağa' : 'Sola')), birim: '' }
  ];
  if (p.mod > 1.5 && p.mod < 2.5) {
    o.push({ et: 'İvme  a', dg: D.biçim(ivme(p, st)),           birim: 'm/s²' });
    o.push({ et: 'Hız  ϑ',  dg: D.biçim(Math.abs(st.v)),    birim: 'm/s' });
  }
  return o;
}

/* ------------------------------------------------------------- Tanım */

D.simler = D.simler || {};
D.simler['tele-etki-kuvvet'] = {
  id: 'tele-etki-kuvvet',
  baslik: '2.2.5 · Manyetik alanda akımlı tele etki eden kuvvet',
  yukseklik: 340,
  grafikPanel: true,
  grafikYukseklik: 170,
  parametreler: [
    { anahtar: 'mod', etiket: 'Düzenek', tur: 'secim', deger: 1, secenekler: [
      { d: 1, e: 'Açıyı değiştir (F = BiL·sinα)' },
      { d: 2, e: 'Raylı tel (serbest, hızlanır)' },
      { d: 3, e: 'Hoparlör' }
    ]},
    { anahtar: 'B',   etiket: 'Manyetik alan B', min: 0.05, max: 2, adim: 0.05, deger: 0.5, birim: 'T' },
    { anahtar: 'Byon',etiket: 'Alan yönü', tur: 'secim', deger: -1, secenekler: [
      { d: -1, e: 'Sayfanın içine ⊗' },
      { d: 1,  e: 'Sayfadan dışarı ⊙' }
    ]},
    { anahtar: 'i',   etiket: 'Akım i', min: -20, max: 20, adim: 1, deger: 6, birim: 'A' },
    { anahtar: 'L',   etiket: 'Tel uzunluğu L', min: 5, max: 100, adim: 5, deger: 40, birim: 'cm' },
    { anahtar: 'aci', etiket: 'Açı α', min: 0, max: 180, adim: 5, deger: 90, birim: '°' },
    { anahtar: 'm',   etiket: 'Tel kütlesi', min: 5, max: 200, adim: 5, deger: 40, birim: 'g' },
    { anahtar: 'f',   etiket: 'Ses frekansı', min: 1, max: 12, adim: 1, deger: 3, birim: 'Hz' }
  ],
  durum, adim, bitti, cizGercek, cizKlasik, cizGrafik, okumalar
};

})();
