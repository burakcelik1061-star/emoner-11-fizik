(function () {
"use strict";
window.F11 = window.F11 || {};

/* ==========================================================================
   sims/miknatislar.js
   --------------------------------------------------------------------------
   Konu 2.2.1 · Mıknatısların etkileşimi ve manyetik alan  (MEB 11, s.186-197)

   ALAN ÇİZGİLERİ GERÇEKTEN HESAPLANIYOR
   -------------------------------------
   Çizgiler elle çizilmiş süslemeler değildir. Her mıknatıs, uçlarının biraz
   içinde zıt işaretli iki "manyetik yük" varmış gibi modellenir (Gilbert
   modeli) ve alan bu kaynakların ters-kare katkılarının toplamı olarak
   noktadan noktaya hesaplanır. Çizgiler bu alanı adım adım izleyerek çıkarılır.

   Bu model gerçek fizik değildir — manyetik tek kutup yoktur — ama çubuk
   mıknatısın DIŞINDAKİ alanı çok iyi verir: çizgiler N’den çıkar, S’ye girer,
   hiç kesişmez; pusulanın N ucu alan yönünü gösterir (Physics Classroom,
   Walter Fendt "Magnetic Field of a Bar Magnet").

   ÜÇ DÜZENEK
   ----------
   1) İki mıknatıs masada: Kuvvet dört kutbun etkileşiminin toplamıdır. Masa
      sürtünmesi gerçektir: kuvvet statik sürtünme sınırını aşmıyorsa mıknatıslar
      KIPIRDAMAZ; aşıyorsa zıt kutuplar yapışır, aynı kutuplar itişip sürtünmeyle
      durur. Aynı kutuplar arasında NÖTR NOKTA oluşur.
   2) Tek mıknatıs + pusula: Gezici pusula çizgiye TEĞET durur; alan şiddeti
      (mT) okunur (PhET "Magnet and Compass").
   3) Dünya: Dünya, eksenine ≈ 11° eğik bir çubuk mıknatıs gibidir ve bu
      mıknatısın S kutbu coğrafi kuzeydedir (HyperPhysics). Gözlemci enlem
      boyunca gezer: eğim açısı tan I = 2·tan λ ile ekvatorda 0°, kutupta 90°.
      Sapma (deklinasyon) açısı ise yere göre değişen, pusulayla coğrafi kuzey
      arasındaki açıdır (Türkiye ≈ 6° doğu, IGRF 2026).
   ========================================================================== */

const D = window.F11;
const { R, K } = D;

/* --- Çubuk mıknatıs: gerçek birimler --- */
const BOY_CM   = 10;          // mıknatıs boyu
const ICERI_CM = 0.5;         // kutuplar uçların bu kadar içinde
const KUTUP_Q  = 55;          // kutup şiddeti (A·m) — güçlü bir okul mıknatısı
const KM       = 1e-7;        // μ₀ / 4π  (T·m/A)
const KUTLE    = 0.05;        // kg, her mıknatıs
const MU_S = 0.25, MU_K = 0.18, G = 9.81;
const FS = MU_S * KUTLE * G;  // statik sürtünme sınırı ≈ 0,12 N
const FK = MU_K * KUTLE * G;  // kinetik sürtünme ≈ 0,09 N
const EN_UZAK_CM = 16;        // panelden çıkmasınlar
const AGIR = 12;              // ağır çekim: gerçek hareket 0,1–0,3 s sürer

/* --- Dünya (dipol modeli + gerçek ölçüm) --- */
const EKSEN_EGIK = 11;        // °, manyetik eksenin dönme ekseniyle açısı (HyperPhysics)
const B0_EKVATOR = 30;        // μT, dipolün ekvatordaki alanı
/* Ankara, IGRF 2026: F ≈ 48 μT, H ≈ 25 μT, Z ≈ 41 μT, I ≈ 58°, δ ≈ 6° D */

/* ------------------------------------------------------------- Fizik */

/** Bir mıknatısın iki kutbu (piksel). ters = true ise N sağda olur. */
function kutuplar(m) {
  const yarim = m.boy * (0.5 - ICERI_CM / BOY_CM);
  const n = { x: m.x - yarim * (m.ters ? -1 : 1), y: m.y, g: +m.guc };
  const s = { x: m.x + yarim * (m.ters ? -1 : 1), y: m.y, g: -m.guc };
  return [n, s];
}

/** Verilen noktadaki toplam alan vektörü (yön için; birim keyfi). */
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
  return solSagUc(p) !== sagSolUc(p);
}
function solSagUc(p) { return p.ters1 ? 'N' : 'S'; }
function sagSolUc(p) { return p.ters2 ? 'S' : 'N'; }

/** Aralık g (m) iken SAĞ mıknatısa etkiyen kuvvet (N); + sağa = itme.
    Dört kutup çiftinin Coulomb benzeri etkileşimlerinin toplamı:
    F = (μ₀/4π)·q₁q₂ / r². Yakın kutuplar baskındır ama uzak kutuplar
    kuvveti azaltır; uzakta kuvvet 1/r⁴ gibi hızla söner. */
function kuvvet(g, p) {
  const L = BOY_CM / 100, a = L / 2 - ICERI_CM / 100;
  const c1 = -(g / 2 + L / 2), c2 = g / 2 + L / 2;
  const s1 = p.ters1 ? -1 : 1, s2 = p.ters2 ? -1 : 1;     // sol uçtaki kutup N ise +1
  const k1 = [[c1 - a, s1], [c1 + a, -s1]];
  const k2 = [[c2 - a, s2], [c2 + a, -s2]];
  let F = 0;
  for (const [x1, q1] of k1)
    for (const [x2, q2] of k2) {
      const d = x2 - x1;
      F += KM * KUTUP_Q * KUTUP_Q * q1 * q2 * Math.sign(d) / (d * d);
    }
  return F;
}

/** Tek mıknatısın (merkez orijinde, boy BOY_CM) (x, y) noktasındaki alanı, mT. */
function tekAlanMT(x, y, ters) {
  const a = (BOY_CM / 2 - ICERI_CM) / 100;
  const sN = ters ? 1 : -1;                         // N kutbunun x işareti
  let bx = 0, by = 0;
  for (const [kx, q] of [[sN * a, 1], [-sN * a, -1]]) {
    const dx = x - kx, dy = y, r = Math.max(0.004, Math.hypot(dx, dy));
    bx += KM * KUTUP_Q * q * dx / (r * r * r);
    by += KM * KUTUP_Q * q * dy / (r * r * r);
  }
  return Math.hypot(bx, by) * 1000;
}

/** Gezici pusulanın yolu (m): mıknatısın çevresinde elips. */
const YOL_A = 0.09, YOL_B = 0.05;
function gezginKonum(aci) { return { x: YOL_A * Math.cos(aci), y: YOL_B * Math.sin(aci) }; }
/** Yol boyunca en büyük B (mT) — grafiğin ölçeği sabit kalsın diye. */
function yolBMaks() {
  let m = 0;
  for (let a = 0; a < 6.2832; a += 0.02) { const k = gezginKonum(a); m = Math.max(m, tekAlanMT(k.x, k.y, false)); }
  return m;
}

/* --- Dünya: dipol alanı, manyetik enlem λ'da --- */
function egimAcisi(lamDer) {
  return Math.atan(2 * Math.tan(lamDer * Math.PI / 180)) * 180 / Math.PI;
}
function dunyaB(lamDer) {
  const s = Math.sin(lamDer * Math.PI / 180), c = Math.cos(lamDer * Math.PI / 180);
  return { top: B0_EKVATOR * Math.sqrt(1 + 3 * s * s), yatay: B0_EKVATOR * c, dusey: 2 * B0_EKVATOR * s };
}
function enlem(p, st) { return (st && st.enlem != null) ? st.enlem : p.enlem; }

/* -------------------------------------------------------------- Durum */

function durum(p) {
  return { t: 0, g: p.ara / 100, v: 0, durdu: false, yapisti: false, kipirdadi: false,
           gezginAci: 0, enlem: p.enlem, kayit: [] };
}

function kaydet(st, v, ara) {
  if (st.kayit.length === 0 || st.t - st.kayit[st.kayit.length - 1].t > ara)
    st.kayit.push({ t: st.t, v });
  if (st.kayit.length > 500) st.kayit.shift();
}

/* HAREKET (1. düzenek) — iki mıknatıs da serbest, eşit kütleli.
   Her birine eşit ve zıt F etkir (Newton III). Masa sürtünmesi:
     duruyorsa  : |F| ≤ f_s,maks ise KIPIRDAMAZ (statik sürtünme F’yi dengeler)
     kayıyorsa  : kinetik sürtünme f_k hıza ters yönde
   Kuvvet uzaklığa bağlı olduğu için her adımda yeniden hesaplanır. */
function adim(st, dt, p) {
  if (p.mod > 2.5) {
    st.t += dt;
    st.enlem = D.tarama(st.t, p.enlem, p.enlem < 45 ? 90 : 0, 12);
    return;
  }
  if (p.mod > 1.5) {
    st.t += dt;
    st.gezginAci = (st.t * 0.5) % (2 * Math.PI);
    const k = gezginKonum(st.gezginAci);
    kaydet(st, tekAlanMT(k.x, k.y, !!p.ters1), 0.03);
    return;
  }

  const dtF = dt / AGIR;
  st.t += dtF;
  if (st.durdu) return;

  const F = kuvvet(st.g, p);
  if (st.v === 0 && Math.abs(F) <= FS) {
    if (st.kipirdadi) st.durdu = true;       // sürtünme durdurdu
    kaydet(st, st.g * 100, 0.004);
    return;
  }
  const surt = st.v !== 0 ? -Math.sign(st.v) * FK : -Math.sign(F) * FK;
  const vYeni = st.v + ((F + surt) / KUTLE) * dtF;
  st.v = (st.v !== 0 && Math.sign(vYeni) !== Math.sign(st.v)) ? 0 : vYeni;
  st.kipirdadi = true;
  st.g += 2 * st.v * dtF;                      // ikisi de v hızıyla ayrılır
  if (st.g <= 0) { st.g = 0; st.v = 0; st.durdu = true; st.yapisti = true; }
  if (st.g >= EN_UZAK_CM / 100) { st.g = EN_UZAK_CM / 100; st.v = 0; st.durdu = true; }
  kaydet(st, st.g * 100, 0.004);
}

/* Kuvvet sürtünmeyi yenemiyorsa sahne 1,5 s gösterilip durur. */
function bitti(st, p) {
  return p.mod < 1.5 && (st.durdu || (!st.kipirdadi && st.t * AGIR > 1.5));
}

function durumMetni(st, p) {
  if (st.yapisti) return 'Yapıştılar';
  if (st.durdu && st.g >= EN_UZAK_CM / 100 - 1e-9) return 'Panel sınırı';
  if (st.durdu) return 'Sürtünme durdurdu';
  if (!st.kipirdadi) return st.t > 0 ? 'Kıpırdamıyor (F ≤ fₛ)' : 'Hazır';
  return cekiyor(p) ? 'Yaklaşıyorlar' : 'Uzaklaşıyorlar';
}

/* ---------------------------------------------- Ortak: mıknatıs listesi */

/** px/cm ölçeği — düzenek boyunca SABİT (en uzak ayrılma da sığar). */
function olcek1(w) { return Math.min(12, (w - 40) / (2 * BOY_CM + EN_UZAK_CM)); }
function olcek2(w, h) { return Math.min(15, w * 0.026, h * 0.036); }

function mknListesi(w, h, p, st, my) {
  const cy = my != null ? my : h * 0.52;
  if (p.mod < 1.5) {
    const s = olcek1(w), boy = BOY_CM * s;
    const gCm = (st && st.g != null) ? st.g * 100 : p.ara;
    const d = (gCm / 2 + BOY_CM / 2) * s;
    return [
      { x: w / 2 - d, y: cy, boy, ters: !!p.ters1, guc: 1 },
      { x: w / 2 + d, y: cy, boy, ters: !!p.ters2, guc: 1 }
    ];
  }
  const s = olcek2(w, h);
  return [{ x: w * 0.44, y: cy, boy: BOY_CM * s, ters: !!p.ters1, guc: 1, s }];
}

/* --------------------------------------------- Gerçekçi görünüm */

function alanCizgileri(ctx, mknlar, w, h, adet) {
  ctx.save();
  ctx.strokeStyle = 'rgba(56,130,190,.85)';
  ctx.fillStyle = 'rgba(56,130,190,.95)';
  ctx.lineWidth = 1.5;
  for (const m of mknlar) {
    const [n] = kutuplar(m);
    for (let i = 0; i < adet; i++) {
      const a = (i / adet) * Math.PI * 2 + 0.34;
      const yol = cizgiIzle(n.x + Math.cos(a) * 11, n.y + Math.sin(a) * 11, mknlar, +1, w, h);
      if (yol.length < 3) continue;
      ctx.beginPath();
      yol.forEach((q, j) => j ? ctx.lineTo(q.x, q.y) : ctx.moveTo(q.x, q.y));
      ctx.stroke();
      cizgiOku(ctx, yol, 0.42);
    }
  }
  ctx.restore();
}

/** Çizginin belli bir oranındaki noktaya yön oku. */
function cizgiOku(ctx, yol, oran) {
  const i = Math.floor(yol.length * oran);
  const o = yol[i], o2 = yol[Math.min(yol.length - 1, i + 3)];
  if (!o || !o2 || o === o2) return;
  const dx = o2.x - o.x, dy = o2.y - o.y, d = Math.hypot(dx, dy) || 1;
  const ux = dx / d, uy = dy / d;
  ctx.beginPath();
  ctx.moveTo(o.x + ux * 6, o.y + uy * 6);
  ctx.lineTo(o.x - uy * 3.6 - ux * 2, o.y + ux * 3.6 - uy * 2);
  ctx.lineTo(o.x + uy * 3.6 - ux * 2, o.y - ux * 3.6 - uy * 2);
  ctx.closePath(); ctx.fill();
}

function cizGercek(ctx, w, h, st, p) {
  if (p.mod > 2.5) { cizDunya(ctx, w, h, st, p); return; }

  /* masa yüzeyi — üstten bakış */
  ctx.fillStyle = '#F2EADB'; ctx.fillRect(0, 0, w, h);

  const my = h * 0.50;
  const mknlar = mknListesi(w, h, p, st, my);
  alanCizgileri(ctx, mknlar, w, h, 9);

  for (const m of mknlar)
    D.miknatis(ctx, m.x - m.boy / 2, my - 15, m.boy, 30, m.ters);

  if (p.mod < 1.5) {
    /* pusulalar: alana göre yönelir */
    for (const [px, py] of [[w / 2, my - 78], [w / 2, my + 86], [w * 0.07, my - 60], [w * 0.93, my - 60]]) {
      const { bx, by } = alan(px, py, mknlar);
      D.pusula(ctx, px, py, 14, Math.atan2(by, bx));
    }

    const cek = cekiyor(p);
    D.rozet(ctx, cek ? 'ZIT KUTUPLAR · ÇEKME' : 'AYNI KUTUPLAR · İTME', w / 2, 8,
            cek ? 'rgba(47,111,208,.92)' : 'rgba(226,72,63,.92)', '#FFFFFF',
            '700 12px system-ui, sans-serif', true);

    /* kuvvet (F) ve sürtünme (f) okları — mıknatısların altında */
    const [m1, m2] = mknlar;
    const F = kuvvet(st.g, p), Fb = Math.abs(F);
    const okBoy = v => 8 + 52 * Math.min(1, v / 0.6);
    const yF = cek ? 1 : -1;                          // sol mıknatıs için F yönü
    if (Fb > 1e-4) {
      D.vektor(ctx, m1.x, my + 26, m1.x + okBoy(Fb) * yF, my + 26, R.kuvvet, '', { kalinlik: 3 });
      D.vektor(ctx, m2.x, my + 26, m2.x - okBoy(Fb) * yF, my + 26, R.kuvvet, '', { kalinlik: 3 });
    }
    const f = surtunmeBuyuklugu(st, F);
    if (f > 1e-4) {
      /* sol mıknatısta sürtünme yönü: kayarken hızına ters, dururken F’ye ters */
      const ySol = st.v !== 0 ? (st.v > 0 ? 1 : -1) : -yF;
      D.vektor(ctx, m1.x, my + 40, m1.x + okBoy(f) * ySol, my + 40, R.surtunme, '', { kalinlik: 2.4 });
      D.vektor(ctx, m2.x, my + 40, m2.x - okBoy(f) * ySol, my + 40, R.surtunme, '', { kalinlik: 2.4 });
    }
    D.yaziAydinlik(ctx, 'F = ' + D.biçim(Fb, 3) + ' N', m1.x - m1.boy / 2, my + 58, R.kuvvet,
                   '700 11px system-ui, sans-serif', 'left');
    D.yaziAydinlik(ctx, 'f = ' + D.biçim(f, 3) + ' N (sürtünme)', m2.x + m2.boy / 2, my + 58, '#7A5CC8',
                   '700 11px system-ui, sans-serif', 'right');

    /* nötr nokta: aynı kutuplar arasında, eksen üzerinde tam ortada */
    if (!cek && st.g > 0.002) {
      ctx.save();
      ctx.strokeStyle = R.hiz; ctx.lineWidth = 2.4;
      ctx.beginPath(); ctx.arc(w / 2, my, 5, 0, 6.2832); ctx.stroke();
      ctx.restore();
      D.yaziAydinlik(ctx, 'nötr nokta', w / 2, my - 22, '#1A7A55',
                     '700 11px system-ui, sans-serif', 'center');
    }

    const durumY = durumMetni(st, p);
    D.yaziAydinlik(ctx, durumY + ' · aralık ' + D.biçim(st.g * 100, 1) + ' cm', w - 12, h - 12,
                   R.mur, '700 11px system-ui, sans-serif', 'right');
    D.yaziAydinlik(ctx, 'ağır çekim ×' + AGIR + ' · t = ' + D.biçim(st.t, 3) + ' s', 12, h - 12,
                   R.mur, '600 11px system-ui, sans-serif', 'left');
  } else {
    const m = mknlar[0], s = m.s;
    const sabit = [[12, -7], [-11, 8]];
    for (const [xc, yc] of sabit) {
      const px = m.x + xc * s, py = my + yc * s;
      const { bx, by } = alan(px, py, mknlar);
      D.pusula(ctx, px, py, 14, Math.atan2(by, bx));
    }
    /* gezici pusula ve ona düşen B */
    const k = gezginKonum(st.gezginAci || 0);
    const gx = m.x + k.x * 100 * s, gy = my + k.y * 100 * s;
    ctx.save();
    ctx.setLineDash([4, 6]); ctx.strokeStyle = 'rgba(80,90,110,.45)'; ctx.lineWidth = 1.2;
    ctx.beginPath(); ctx.ellipse(m.x, my, YOL_A * 100 * s, YOL_B * 100 * s, 0, 0, 6.2832); ctx.stroke();
    ctx.restore();
    const { bx, by } = alan(gx, gy, mknlar);
    D.pusula(ctx, gx, gy, 17, Math.atan2(by, bx));
    /* etiket mıknatısın üstüne binmesin: pusula üst yarıdaysa üstüne, alttaysa altına */
    D.yaziAydinlik(ctx, 'B = ' + D.biçim(tekAlanMT(k.x, k.y, !!p.ters1), 2) + ' mT', gx, k.y > 0.01 ? gy + 32 : gy - 26,
                   '#1F6FA0', '700 12px system-ui, sans-serif', 'center');
    D.yaziAydinlik(ctx, 'pusula iğnesi daima çizgiye TEĞET durur', w / 2, h - 12,
                   R.mur, '600 11px system-ui, sans-serif', 'center');
  }

  if (p.mod > 1.5)
    D.yaziAydinlik(ctx, 'çizgiler N’den çıkar, S’ye girer', 12, h - 30, R.mur,
                   '600 11px system-ui, sans-serif', 'left');
}

/** Sürtünme kuvvetinin büyüklüğü: kayarken f_k, dururken F’yi dengeleyen
    statik sürtünme (en çok f_s,maks). */
function surtunmeBuyuklugu(st, F) {
  if (st.yapisti) return 0;                 // temas: kuvveti diğer mıknatıs karşılar
  if (st.v !== 0) return FK;
  return Math.min(Math.abs(F), FS);
}

/** Koyu uzay zemininde okunaklı yazı (açık hale yerine gölge). */
function uzayYazi(ctx, t, x, y, renk, font, hiza) {
  ctx.save();
  ctx.font = font; ctx.textAlign = hiza; ctx.textBaseline = 'middle';
  ctx.shadowColor = 'rgba(0,0,0,.9)'; ctx.shadowBlur = 4;
  ctx.fillStyle = renk; ctx.fillText(t, x, y);
  ctx.restore();
}

function cizDunya(ctx, w, h, st, p) {
  const cx = w * 0.42, cy = h * 0.53, r = Math.min(w, h) * 0.25;
  const e = EKSEN_EGIK * Math.PI / 180;

  /* uzay */
  ctx.fillStyle = '#0B1020'; ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = 'rgba(255,255,255,.55)';
  for (let i = 0; i < 40; i++) {
    const a = (i * 2.399) % 6.2832, rr = 0.3 + ((i * 37) % 100) / 100;
    ctx.fillRect(cx + Math.cos(a) * r * (1.6 + rr * 1.6),
                 cy + Math.sin(a) * r * (1.4 + rr * 1.4), 1.6, 1.6);
  }

  /* Manyetik alan çizgileri — Dünya’nın içindeki çubuk mıknatısın N kutbu
     coğrafi GÜNEY yarıda: çizgiler güney yarıküreden ÇIKIP kuzey yarıküreye
     GİRER. Dönüş: yatay mıknatıs (N sağda) +90° + eğiklik kadar döndürülür. */
  const mkn = [{ x: cx, y: cy, boy: r * 0.5, ters: true, guc: 1 }];
  ctx.save();
  ctx.translate(cx, cy); ctx.rotate(e + Math.PI / 2); ctx.translate(-cx, -cy);
  ctx.strokeStyle = 'rgba(80,180,220,.7)'; ctx.fillStyle = 'rgba(120,200,235,.95)'; ctx.lineWidth = 1.4;
  const n = kutuplar(mkn[0])[0];
  for (let i = 0; i < 16; i++) {
    const a = (i / 16) * Math.PI * 2 + 0.2;
    const yol = cizgiIzle(n.x + Math.cos(a) * 12, n.y + Math.sin(a) * 12, mkn, +1, w * 2, h * 2, 260, 5);
    ctx.beginPath();
    yol.forEach((q, j) => j ? ctx.lineTo(q.x, q.y) : ctx.moveTo(q.x, q.y));
    ctx.stroke();
    cizgiOku(ctx, yol, 0.5);
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

  /* içteki hayali çubuk mıknatıs: S kutbu kuzeyde */
  ctx.save();
  ctx.translate(cx, cy); ctx.rotate(e); ctx.globalAlpha = 0.85;
  D.miknatis(ctx, -r * 0.09, -r * 0.42, r * 0.18, r * 0.84, true, true);
  ctx.restore();

  /* coğrafi eksen */
  D.kesikliCizgi(ctx, cx, cy - r - 26, cx, cy + r + 26, 'rgba(255,255,255,.75)', 1.6, [6, 5]);
  uzayYazi(ctx, 'coğrafi kuzey', cx, cy - r - 36, '#EAF0FA',
               '600 11px system-ui, sans-serif', 'center');

  /* manyetik eksen — ≈ 11° eğik */
  const ux = Math.sin(e), uy = -Math.cos(e);
  D.kesikliCizgi(ctx, cx - ux * (r + 26), cy - uy * (r + 26),
                 cx + ux * (r + 26), cy + uy * (r + 26), '#FF6B6B', 1.8, [7, 4]);
  uzayYazi(ctx, 'manyetik eksen (' + EKSEN_EGIK + '°)', cx + ux * (r + 30) + 8, cy + uy * (r + 30) + 12, '#FF8A8A',
               '600 11px system-ui, sans-serif', 'left');

  /* Gözlemci: manyetik enlem λ’da. Eğim pusulası yerel alanı gösterir:
     yatay bileşen (manyetik kuzeye) B₀cosλ, düşey (aşağı) 2B₀sinλ. */
  const lam = enlem(p, st) * Math.PI / 180;
  const E = { x: Math.cos(e), y: Math.sin(e) }, U = { x: ux, y: uy };
  const Rd = { x: Math.cos(lam) * E.x + Math.sin(lam) * U.x, y: Math.cos(lam) * E.y + Math.sin(lam) * U.y };
  const T  = { x: -Math.sin(lam) * E.x + Math.cos(lam) * U.x, y: -Math.sin(lam) * E.y + Math.cos(lam) * U.y };
  const Bd = { x: Math.cos(lam) * T.x - 2 * Math.sin(lam) * Rd.x, y: Math.cos(lam) * T.y - 2 * Math.sin(lam) * Rd.y };
  const ox = cx + r * Rd.x, oy = cy + r * Rd.y;
  D.kesikliCizgi(ctx, ox - T.x * 34, oy - T.y * 34, ox + T.x * 34, oy + T.y * 34, 'rgba(255,255,255,.8)', 1.4, [4, 3]);
  D.noktaCisim(ctx, ox, oy, 4, '#FFD24A');
  const px = ox + Rd.x * 22, py = oy + Rd.y * 22;
  D.pusula(ctx, px, py, 15, Math.atan2(Bd.y, Bd.x));
  uzayYazi(ctx, 'λ = ' + D.biçim(enlem(p, st), 0) + '° · eğim I = ' + D.biçim(egimAcisi(enlem(p, st)), 0) + '°',
               px + 20, py - 4, '#FFD24A', '700 12px system-ui, sans-serif', 'left');

  /* haritada pusula: sapma açısı */
  const kx = w - 44, ky = 58;
  D.kesikliCizgi(ctx, kx, ky - 34, kx, ky + 30, 'rgba(255,255,255,.7)', 1.2, [4, 3]);
  D.pusula(ctx, kx, ky, 22, -Math.PI / 2 + p.sapma * Math.PI / 180);
  uzayYazi(ctx, 'sapma δ = ' + D.biçim(p.sapma) + '°', kx, ky + 42, '#EAF0FA',
               '600 11px system-ui, sans-serif', 'center');

  uzayYazi(ctx, 'Güneş rüzgârı saptırılır — Van Allen kuşakları', 10, h - 12,
               '#8FB6EC', '600 11px system-ui, sans-serif', 'left');
}

/* ----------------------------------------- Klasik fizik görünümü */

function cizKlasik(ctx, w, h, st, p) {
  D.izgara(ctx, w, h, 26);

  if (p.mod > 2.5) { klasikDunya(ctx, w, h, p, st); return; }

  const my = h * 0.42;
  const mk = mknListesi(w, h, p, st, my);
  mk.forEach(m => D.miknatis(ctx, m.x - m.boy / 2, my - 15, m.boy, 30, m.ters));

  if (p.mod < 1.5) {
    const cek = cekiyor(p);
    const [m1, m2] = mk;
    const F = kuvvet(st.g, p), Fb = Math.abs(F);
    const f = surtunmeBuyuklugu(st, F);
    const okBoy = v => 8 + 52 * Math.min(1, v / 0.6);
    const yF = cek ? 1 : -1;
    if (Fb > 1e-4) {
      D.vektor(ctx, m1.x, my + 30, m1.x + okBoy(Fb) * yF, my + 30, R.kuvvet, 'F', { kalinlik: 2.4 });
      D.vektor(ctx, m2.x, my + 30, m2.x - okBoy(Fb) * yF, my + 30, R.kuvvet, 'F', { kalinlik: 2.4 });
    }
    if (f > 1e-4) {
      const ySol = st.v !== 0 ? (st.v > 0 ? 1 : -1) : -yF;
      D.vektor(ctx, m1.x, my + 50, m1.x + okBoy(f) * ySol, my + 50, R.surtunme, 'f', { kalinlik: 2.2 });
      D.vektor(ctx, m2.x, my + 50, m2.x - okBoy(f) * ySol, my + 50, R.surtunme, 'f', { kalinlik: 2.2 });
    }

    /* nötr nokta: aynı kutuplar arasında, EKSEN ÜZERİNDE tam ortada */
    if (!cek && st.g > 0.002) {
      D.noktaCisim(ctx, w / 2, my, 5, R.hiz);
      D.yaziHaleli(ctx, 'nötr nokta · B = 0', w / 2, my - 26, R.hiz,
                   '700 11px system-ui, sans-serif', 'center');
    }

    const hareket = Fb > FS;
    const satir = [
      ['Karşılaşan kutuplar: ' + solSagUc(p) + ' — ' + sagSolUc(p), K.beyaz],
      [cek ? 'Zıt ⟹ ÇEKME' : 'Aynı ⟹ İTME', cek ? R.normal : R.kuvvet],
      ['F = ' + D.biçim(Fb, 3) + ' N  (4 kutbun toplamı)', R.kuvvet],
      ['fₛ,maks = μₛ·m·g = ' + D.biçim(FS, 3) + ' N', R.surtunme],
      [st.yapisti ? 'Temas: yapıştılar' : hareket ? 'F > fₛ,maks ⟹ harekete geçer' : 'F ≤ fₛ,maks ⟹ kıpırdamaz',
       hareket ? R.ivme : K.metin2]
    ];
    let sy = 26;
    satir.forEach(([t, c]) => {
      D.yaziHaleli(ctx, t, w - 12, sy, c, '700 12px system-ui, sans-serif', 'right'); sy += 18;
    });
  } else {
    /* Gezici pusulanın bulunduğu noktada B vektörü: çizgiye teğettir ve
       mıknatısın çevresinde dolaşırken yönü sürekli değişir. */
    const m = mk[0], s = m.s;
    const k = gezginKonum(st.gezginAci || 0);
    const px = m.x + k.x * 100 * s, py = my + k.y * 100 * s;
    const { bx, by } = alan(px, py, mk);
    const b = Math.hypot(bx, by) || 1;
    D.kesikliCizgi(ctx, m.x, my, px, py, K.metin2, 1, [3, 4]);
    D.noktaCisim(ctx, px, py, 5, K.beyaz);
    D.vektor(ctx, px, py, px + (bx / b) * 36, py + (by / b) * 36, R.normal, 'B', { kalinlik: 2.4 });
    const r = Math.hypot(k.x, k.y) * 100;
    const satir = [
      ['B, çizgiye teğet', R.normal],
      ['B = ' + D.biçim(tekAlanMT(k.x, k.y, !!p.ters1), 2) + ' mT', K.beyaz],
      ['merkeze uzaklık ' + D.biçim(r, 1) + ' cm', K.metin2],
      ['Dünya’nın alanı ≈ 0,05 mT — burada ihmal edilir', K.metin2]
    ];
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

function klasikDunya(ctx, w, h, p, st) {
  const sapma = p.sapma;
  const rad = (sapma * Math.PI) / 180;

  /* --- Sapma (deklinasyon): haritada, yatay düzlem --- */
  const cx = w * 0.14, cy = h * 0.42, L = 78;
  D.yaziHaleli(ctx, 'Sapma δ (haritada)', 12, 22, K.beyaz, '700 12px system-ui, sans-serif', 'left');
  D.vektor(ctx, cx, cy + L / 2, cx, cy - L / 2, K.beyaz, '', { kalinlik: 2.4 });
  D.yaziHaleli(ctx, 'coğrafi K', cx, cy - L / 2 - 14, K.beyaz, '600 11px system-ui, sans-serif', 'center');
  const ex = cx + Math.sin(rad) * L, ey = cy + L / 2 - Math.cos(rad) * L;
  D.vektor(ctx, cx, cy + L / 2, ex, ey, R.kuvvet, '', { kalinlik: 2.4 });
  D.yaziHaleli(ctx, 'pusula', ex + 8, ey + 14, R.kuvvet, '600 11px system-ui, sans-serif', 'left');
  D.yaziHaleli(ctx, 'δ = ' + D.biçim(sapma) + '°', cx, cy + L / 2 + 18, R.ivme,
               '700 12px system-ui, sans-serif', 'center');

  /* --- Eğim (inklinasyon): düşey düzlemde B’nin bileşenleri --- */
  const lamD = enlem(p, st);
  const I = egimAcisi(lamD), Ir = I * Math.PI / 180;
  const B = dunyaB(lamD);
  const ox = w * 0.33, oy = h * 0.30, U = 92;          // U px = en büyük B (60 μT)
  const kB = U / 60;
  D.yaziHaleli(ctx, 'Eğim I (düşey düzlemde)', ox - 10, 22, K.beyaz, '700 12px system-ui, sans-serif', 'left');
  ctx.strokeStyle = K.eksen; ctx.lineWidth = 1.2;
  ctx.beginPath(); ctx.moveTo(ox - 14, oy); ctx.lineTo(ox + U + 20, oy); ctx.stroke();
  D.yaziHaleli(ctx, 'yatay (kuzeye →)', ox + U + 22, oy - 8, K.metin2, '10px system-ui, sans-serif', 'left');
  const bxp = B.yatay * kB, byp = B.dusey * kB;
  if (bxp > 2) D.vektor(ctx, ox, oy, ox + bxp, oy, R.normal, '', { kalinlik: 2.2 });
  if (byp > 2) D.vektor(ctx, ox + bxp, oy, ox + bxp, oy + byp, R.surtunme, '', { kalinlik: 2.2 });
  D.vektor(ctx, ox, oy, ox + bxp, oy + byp, R.ivme, '', { kalinlik: 2.8 });
  D.yaziHaleli(ctx, 'B_yatay', ox + bxp / 2, oy - 10, R.normal, '700 11px system-ui, sans-serif', 'center');
  D.yaziHaleli(ctx, 'B_düşey', ox + bxp + 8, oy + byp / 2, R.surtunme, '700 11px system-ui, sans-serif', 'left');
  if (I > 3) D.aciYayi(ctx, ox, oy, 26, 0, Ir, K.metin2, 'I');

  const satir = [
    ['manyetik enlem λ = ' + D.biçim(lamD, 0) + '°', K.beyaz],
    ['tan I = 2·tan λ  ⟹  I = ' + D.biçim(I, 1) + '°', R.ivme],
    ['B = B₀√(1+3sin²λ) = ' + D.biçim(B.top, 1) + ' μT', K.beyaz],
    ['B_yatay = ' + D.biçim(B.yatay, 1) + ' · B_düşey = ' + D.biçim(B.dusey, 1) + ' μT', K.metin2],
    ['Pusula YALNIZ yatay bileşeni izler', K.metin2],
    ['Ankara ölçümü (IGRF 2026):', K.metin2],
    ['48 μT · I = 58° · δ = 6° doğu', R.normal]
  ];
  let sy = h - 40 - (satir.length - 1) * 17;
  satir.forEach(([t, c]) => {
    D.yaziHaleli(ctx, t, w - 12, sy, c, '700 11px system-ui, sans-serif', 'right'); sy += 17;
  });

  D.yaziHaleli(ctx, 'Dünya’nın manyetik GÜNEY kutbu, coğrafi KUZEY’dedir', 12, h - 16,
               R.ivme, '600 11px system-ui, sans-serif', 'left');
}

/* ------------------------------------------------------- Grafikler */

function cizGrafik(ctx, w, h, st, p) {
  const pay = 8, gw = (w - pay * 3) / 2, gh = h - 6;
  const sol = { x: pay, y: 3, w: gw, h: gh };
  const sag = { x: pay * 2 + gw, y: 3, w: gw, h: gh };

  if (p.mod < 1.5) {
    /* F − d: dört kutuplu tam kuvvet; kesikli çizgi statik sürtünme sınırı.
       Eğri çizginin üstündeyse mıknatıslar harekete geçer. */
    const veri = [];
    for (let d = 0.5; d <= 10.0001; d += 0.1) veri.push({ t: d, v: Math.abs(kuvvet(d / 100, p)) });
    const vMax = 1.5;
    D.miniGrafik(ctx, Object.assign({}, sol, {
      baslik: '|F| − aralık   (kesikli: fₛ,maks)', birim: 'N', tEtiket: 'd (cm)',
      veri: veri.map(q => ({ t: q.t, v: Math.min(q.v, vMax) })), tMin: 0.5, tMax: 10,
      vMin: 0, vMax, renk: R.kuvvet,
      imlec: { t: Math.max(0.5, Math.min(10, st.g * 100)), v: Math.min(vMax, Math.abs(kuvvet(st.g, p))) }
    }));
    /* statik sürtünme sınırı — miniGrafik ile aynı ölçek */
    const gx = sol.x + 34, gwi = Math.max(10, sol.w - 42), gy = sol.y + 18, ghi = Math.max(10, sol.h - 36);
    const yUst = D.guzelUst(vMax, 3);
    const yy = gy + ghi - (FS / yUst) * ghi;
    D.kesikliCizgi(ctx, gx, yy, gx + gwi, yy, R.surtunme, 1.4, [5, 4]);

    D.miniGrafik(ctx, Object.assign({}, sag, {
      baslik: 'Aralık − t   (gerçek zaman)', birim: 'cm',
      veri: st.kayit, tMax: Math.max(0.1, st.t), vMin: 0, vMax: Math.max(4, p.ara * 1.2, ...st.kayit.map(q => q.v)),
      renk: R.konum
    }));
    return;
  }

  if (p.mod < 2.5) {
    D.miniGrafik(ctx, Object.assign({}, sol, {
      baslik: 'Gezici pusulada B − t   (kutuplara yakınken büyük)', birim: 'mT',
      veri: st.kayit, tMax: Math.max(12.6, st.t), tMin: Math.max(0, st.t - 12.6), vMin: 0,
      vMax: yolBMaks(), renk: R.normal
    }));
    const veri = [];
    for (let d = 1; d <= 15.0001; d += 0.25) {
      const x = -(BOY_CM / 2 + d) / 100;
      veri.push({ t: d, v: tekAlanMT(p.ters1 ? -x : x, 0, !!p.ters1) });
    }
    D.miniGrafik(ctx, Object.assign({}, sag, {
      baslik: 'N kutbunun önünde, eksen boyunca B − uzaklık', birim: 'mT', tEtiket: 'd (cm)',
      veri, tMin: 1, tMax: 15, vMin: 0, vMax: 25, renk: R.hiz
    }));
    return;
  }

  const lam = enlem(p, st);
  const iVeri = [], bVeri = [];
  for (let l = 0; l <= 90.001; l += 1) {
    iVeri.push({ t: l, v: egimAcisi(Math.min(l, 89.999)) });
    bVeri.push({ t: l, v: dunyaB(l).top });
  }
  D.miniGrafik(ctx, Object.assign({}, sol, {
    baslik: 'Eğim açısı I − manyetik enlem   (tan I = 2 tan λ)', birim: '°', tEtiket: 'λ (°)',
    veri: iVeri, tMax: 90, vMin: 0, vMax: 90, renk: R.ivme,
    imlec: { t: lam, v: egimAcisi(Math.min(lam, 89.999)) }
  }));
  D.miniGrafik(ctx, Object.assign({}, sag, {
    baslik: 'B − manyetik enlem   (dipol: ekvatorda 30, kutupta 60 μT)', birim: 'μT', tEtiket: 'λ (°)',
    veri: bVeri, tMax: 90, vMin: 0, vMax: 60, renk: R.normal,
    imlec: { t: lam, v: dunyaB(lam).top }
  }));
}

/* ----------------------------------------------------------- Okumalar */

function okumalar(st, p) {
  if (p.mod > 2.5) {
    const lam = enlem(p, st), B = dunyaB(lam);
    return [
      { et: 'Manyetik enlem λ', dg: D.biçim(lam, 0),              birim: '°' },
      { et: 'Eğim açısı I',     dg: D.biçim(egimAcisi(Math.min(lam, 89.999)), 1), birim: '°' },
      { et: 'B toplam',         dg: D.biçim(B.top, 1),            birim: 'μT' },
      { et: 'B yatay',          dg: D.biçim(B.yatay, 1),          birim: 'μT' },
      { et: 'B düşey',          dg: D.biçim(B.dusey, 1),          birim: 'μT' },
      { et: 'Sapma δ',          dg: D.biçim(p.sapma),             birim: '°' }
    ];
  }
  if (p.mod < 1.5) {
    const cek = cekiyor(p);
    return [
      { et: 'Karşılaşan kutuplar', dg: solSagUc(p) + ' — ' + sagSolUc(p), birim: '' },
      { et: 'Etkileşim',           dg: cek ? 'Çekme' : 'İtme',            birim: '' },
      { et: 'Aralık',              dg: D.biçim(st.g * 100, 2),            birim: 'cm' },
      { et: 'Manyetik kuvvet F',   dg: D.biçim(Math.abs(kuvvet(st.g, p)), 3), birim: 'N' },
      { et: 'Statik sürtünme sınırı', dg: D.biçim(FS, 3),                 birim: 'N' },
      { et: 'Durum',               dg: durumMetni(st, p),                 birim: '' },
      { et: 'Nötr nokta',          dg: cek ? 'Yok (aralarında)' : 'Var (tam ortada)', birim: '' }
    ];
  }
  const k = gezginKonum(st.gezginAci || 0);
  return [
    { et: 'Mıknatıs',          dg: p.ters1 ? 'S — N' : 'N — S', birim: '' },
    { et: 'Pusuladaki B',      dg: D.biçim(tekAlanMT(k.x, k.y, !!p.ters1), 2), birim: 'mT' },
    { et: 'Merkeze uzaklık',   dg: D.biçim(Math.hypot(k.x, k.y) * 100, 1), birim: 'cm' },
    { et: 'Pusula iğnesi',     dg: 'Çizgiye teğet',             birim: '' },
    { et: 'Çizgiler',          dg: 'N’den çıkar, S’ye girer; kesişmez', birim: '' }
  ];
}

/* ------------------------------------------------------------- Tanım */

D.simler = D.simler || {};
D.simler['miknatislar'] = {
  id: 'miknatislar',
  baslik: '2.2.1 · Mıknatıslar · alan çizgileri ve pusula',
  yukseklik: 360,
  grafikPanel: true,
  grafikYukseklik: 170,
  parametreler: [
    { anahtar: 'mod', etiket: 'Düzenek', tur: 'secim', deger: 1, secenekler: [
      { d: 1, e: 'İki mıknatıs masada (itme / çekme)' },
      { d: 2, e: 'Tek mıknatıs + pusula' },
      { d: 3, e: 'Dünya’nın manyetik alanı' }
    ]},
    { anahtar: 'ters1', etiket: 'Sol mıknatıs (1–2. düzenek)', tur: 'secim', deger: 0, secenekler: [
      { d: 0, e: 'N — S' },
      { d: 1, e: 'S — N (çevrik)' }
    ]},
    { anahtar: 'ters2', etiket: 'Sağ mıknatıs (1. düzenek)', tur: 'secim', deger: 0, secenekler: [
      { d: 0, e: 'N — S' },
      { d: 1, e: 'S — N (çevrik)' }
    ]},
    { anahtar: 'ara',   etiket: 'Aralarındaki uzaklık (1. düzenek)', min: 1, max: 10, adim: 0.5, deger: 2, birim: 'cm' },
    { anahtar: 'enlem', etiket: 'Manyetik enlem (3. düzenek)', min: 0, max: 90, adim: 1, deger: 39, birim: '°' },
    { anahtar: 'sapma', etiket: 'Sapma açısı (3. düzenek)', min: 0, max: 20, adim: 1, deger: 6, birim: '°' }
  ],
  durum, adim, bitti, cizGercek, cizKlasik, cizGrafik, okumalar
};

})();
