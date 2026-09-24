(function () {
"use strict";
window.F11 = window.F11 || {};

/* ==========================================================================
   sims/elektrik-motoru.js
   --------------------------------------------------------------------------
   Konu 2.2.6 · Manyetik alanda akım geçen dikdörtgen çerçeve — elektrik motoru
                                                    (MEB 11, s.229-235)

   NEDEN DÖNER?
   ------------
   Çerçevenin karşılıklı iki kenarındaki akımlar ZIT yönlüdür. Aynı alandaki
   zıt akımlar zıt yönlü kuvvet görür: biri yukarı, diğeri aşağı. Bu iki kuvvet
   çerçeveyi öteleyemez (toplamları sıfır) ama DÖNDÜRÜR. Yön, kitaptaki sağ el
   kuralıyla (F = i·L × B) bulunur.

       F = B·i·L            (alana dik her bir kenara)
       τ = B·i·A·N·cosθ     (çerçeveye etkiyen döndürme etkisi)

   θ: çerçeve düzlemi ile alan arasındaki açı. Kitap (s.232): döndürme etkisi,
   çerçeve düzlemi alanla AYNI düzlemdeyken en büyüktür; alana dikken sıfırdır.

   KOMÜTATÖR
   ---------
   Yarık halka çerçeveyle birlikte döner, fırçalar sabittir. Yarıklar θ = 90°
   ve 270°’de fırçalardan geçer; akım tam torkun işaret değiştirdiği anda
   TERS ÇEVRİLİR ve döndürme etkisi hep aynı yönde kalır. Komütatör olmadan
   çerçeve θ = 90° çevresinde yalnızca SALINIR.

   YÜK
   ---
   Motorun döndürdüğü yük ve sürtünme, hızla orantılı bir fren torku
   (τ_yük = k·ω) olarak modellenir. Motor, ortalama tork bu frene eşit olunca
   sabit bir ORTALAMA hıza ulaşır: ω ≈ (2/π)·τ_maks / k. Tek çerçevede tork
   dalgalı olduğundan çerçeve zayıf torklu bölgelerde daha uzun kalır ve gerçek
   ortalama bu değerin biraz altında olur (varsayılan ayarda ≈ %86’sı).

   GALVANOMETRE (kitap s.232-233)
   -----------------------------
   Aynı çerçeve bir YAY ile tutulursa dönme durur: ibre, manyetik tork yayın
   geri çağırıcı torkuna eşit olunca kalır. Kutup parçaları eğri, ortada demir
   çekirdek vardır; alan RADYALDİR, bu yüzden tork açıdan bağımsızdır:
       N·B·i·A = κ·φ   ⟹   φ = (N·B·A / κ) · i
   İbre sapması akımla DOĞRU orantılıdır; ölçek eşit aralıklıdır.
   ========================================================================== */

const D = window.F11;
const { R, K } = D;

const KAPPA = 1.2e-3;            // N·m/rad — galvanometre yayının burulma sabiti
const GALV_DURAK = 60;           // ° — ibrenin mekanik durdurucusu
const GALV_ZETA = 0.45;          // sönüm oranı (alüminyum gövdede girdap akımı)

/* ------------------------------------------------------------- Fizik */

function komutatorVar(p) { return p.mod < 1.5; }
function galvanometre(p) { return p.mod > 2.5; }

function alanCerceve(p) { return (p.a / 100) * (p.b / 100); }   // m²

/** Anlık döndürme etkisi (N·m), İŞARETLİ; pozitif tork θ’yı artırır. */
function tork(st, p) {
  return p.B * p.i * alanCerceve(p) * p.N * Math.cos(st.aci);
}

/** Komütatörün belirlediği akım yönü (+1 / −1): cosθ’nın işaretiyle çevrilir. */
function akimIsareti(st, p) {
  if (!komutatorVar(p)) return 1;
  return Math.cos(st.aci) >= 0 ? 1 : -1;
}

function etkinTork(st, p) { return tork(st, p) * akimIsareti(st, p); }

/** Eylemsizlik momenti — kütle eksene paralel iki kenarda (kg·m²). */
function eylemsizlik(p) {
  const m = p.m / 1000, yari = (p.a / 100) / 2;
  return m * yari * yari;
}

function tauMaks(p) { return Math.abs(p.B * p.i * alanCerceve(p) * p.N); }
function yukKatsayi(p) { return p.k / 1000; }                     // N·m·s

/** Komütatörlü motorun ulaşacağı sabit hız (rad/s). */
function sonHiz(p) { return (2 / Math.PI) * tauMaks(p) / Math.max(1e-9, yukKatsayi(p)); }

/** Ağır çekim: motorda ekrandaki dönme en çok ~1,2 tur/s, komütatörsüz
    çerçevede bir salınım en az ~1,2 s sürsün (gerçekte saniyenin onda biri). */
function motorAgir(p) {
  if (galvanometre(p) || tauMaks(p) === 0) return 1;
  if (!komutatorVar(p)) {
    const T = 2 * Math.PI * Math.sqrt(Math.max(1e-7, eylemsizlik(p)) / tauMaks(p));
    return Math.max(1, Math.ceil(1.2 / T));
  }
  return Math.max(1, Math.ceil(sonHiz(p) / (2 * Math.PI * 1.2)));
}

/* --- galvanometre (akım mA) --- */
function galvDenge(p) {                                  // derece
  const phi = p.N * p.B * alanCerceve(p) * (p.i / 1000) / KAPPA * 180 / Math.PI;
  return Math.max(-GALV_DURAK, Math.min(GALV_DURAK, phi));
}
function galvHassasiyet(p) {                             // °/mA
  return p.N * p.B * alanCerceve(p) / 1000 / KAPPA * 180 / Math.PI;
}

/* -------------------------------------------------------------- Durum */

function durum(p) {
  return { t: 0, aci: 0, omega: 0, tur: 0, toplamAci: 0, phi: 0, wphi: 0, kayit: [], agir: motorAgir(p) };
}

function adim(st, dt, p) {
  st.t += dt;

  if (galvanometre(p)) {
    /* I·φ'' = N·B·i·A − κ·φ − c·φ'   (radyal alan: tork açıdan bağımsız) */
    const I = Math.max(1e-7, eylemsizlik(p));
    const c = 2 * GALV_ZETA * Math.sqrt(KAPPA * I);
    const tauM = p.N * p.B * alanCerceve(p) * (p.i / 1000);
    const a = (tauM - KAPPA * st.phi - c * st.wphi) / I;
    st.wphi += a * dt; st.phi += st.wphi * dt;
    const lim = GALV_DURAK * Math.PI / 180;
    if (Math.abs(st.phi) > lim) { st.phi = Math.sign(st.phi) * lim; st.wphi = 0; }
    if (st.kayit.length === 0 || st.t - st.kayit[st.kayit.length - 1].t > 0.02)
      st.kayit.push({ t: st.t, v: st.phi * 180 / Math.PI });
    if (st.kayit.length > 400) st.kayit.shift();
    return;
  }

  /* Motor: zaman GERÇEK zamandır; sahne st.agir kat yavaş oynatılır. */
  const h = dt / (st.agir || 1);
  st.t += h - dt;
  const I = Math.max(1e-7, eylemsizlik(p));
  const alfa = (etkinTork(st, p) - yukKatsayi(p) * st.omega) / I;
  st.omega += alfa * h;
  st.aci += st.omega * h;
  st.toplamAci += st.omega * h;
  st.tur = Math.floor(Math.abs(st.toplamAci) / (2 * Math.PI));
  st.aci = ((st.aci % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

  if (st.kayit.length === 0 || st.t - st.kayit[st.kayit.length - 1].t > 0.02 / (st.agir || 1))
    st.kayit.push({ t: st.t, v: st.omega });
  if (st.kayit.length > 400) st.kayit.shift();
}

function bitti() { return false; }

/* --------------------------------------------- Gerçekçi görünüm */

function cizGercek(ctx, w, h, st, p) {
  if (galvanometre(p)) { cizGalvanometre(ctx, w, h, st, p); return; }
  const cx = w * 0.46, cy = h * 0.46;
  const R0 = Math.min(w * 0.22, h * 0.30);

  /* kalıcı mıknatısın kutupları */
  ctx.fillStyle = '#E2483F';
  ctx.fillRect(10, cy - R0 - 16, 44, (R0 + 16) * 2);
  ctx.fillStyle = '#2F6FD0';
  ctx.fillRect(w - 54, cy - R0 - 16, 44, (R0 + 16) * 2);
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 20px system-ui, sans-serif';
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText('N', 32, cy); ctx.fillText('S', w - 32, cy);

  /* alan çizgileri — N’den S’ye, yatay */
  ctx.save();
  ctx.strokeStyle = 'rgba(47,111,208,.5)'; ctx.lineWidth = 1.4;
  for (let k = -2; k <= 2; k++) {
    const yy = cy + k * (R0 * 0.52);
    ctx.beginPath(); ctx.moveTo(56, yy); ctx.lineTo(w - 56, yy); ctx.stroke();
  }
  ctx.restore();

  /* Dönme EKSENİ boyunca bakılıyor: kenarlar ⊙/⊗ kesitleri olarak döner. */
  const ux = Math.cos(st.aci), uy = Math.sin(st.aci);
  const k1x = cx + ux * R0, k1y = cy - uy * R0;
  const k2x = cx - ux * R0, k2y = cy + uy * R0;

  ctx.save();
  ctx.strokeStyle = 'rgba(120,130,150,.45)'; ctx.lineWidth = 1; ctx.setLineDash([4, 5]);
  ctx.beginPath(); ctx.arc(cx, cy, R0, 0, 6.2832); ctx.stroke();
  ctx.restore();

  ctx.save();
  ctx.strokeStyle = '#B87333'; ctx.lineWidth = 5;
  ctx.beginPath(); ctx.moveTo(k1x, k1y); ctx.lineTo(k2x, k2y); ctx.stroke();
  ctx.restore();
  D.noktaCisim(ctx, cx, cy, 4, '#3A4049');

  const isaret = akimIsareti(st, p) * Math.sign(p.i);
  if (isaret !== 0) {
    (isaret > 0 ? D.alanDisari : D.alanIceri)(ctx, k1x, k1y, 11, '#7A4A10');
    (isaret > 0 ? D.alanIceri : D.alanDisari)(ctx, k2x, k2y, 11, '#7A4A10');
    const F = p.B * Math.abs(p.i) * (p.b / 100) * p.N;
    const boy = Math.min(52, 16 + F * 26);
    const fy = isaret > 0 ? -1 : 1;
    D.vektor(ctx, k1x, k1y, k1x, k1y + boy * fy, R.kuvvet, '', { kalinlik: 3 });
    D.vektor(ctx, k2x, k2y, k2x, k2y - boy * fy, R.kuvvet, '', { kalinlik: 3 });
  } else {
    D.noktaCisim(ctx, k1x, k1y, 7, '#7A4A10');
    D.noktaCisim(ctx, k2x, k2y, 7, '#7A4A10');
  }

  /* Komütatör: yarık halka ÇERÇEVEYLE BİRLİKTE döner, fırçalar sabit (sol-sağ).
     Yarık çizgisi çerçeveye diktir; θ = 90°/270°’de yarıklar fırçalardan geçer. */
  const ky = cy + R0 + 36, kr = 15;
  if (komutatorVar(p)) {
    const g = st.aci - Math.PI / 2;                      // yarık doğrultusu (matematik yönü)
    ctx.save();
    ctx.translate(cx, ky); ctx.rotate(-g);
    ctx.fillStyle = '#C9A24B';
    ctx.beginPath(); ctx.arc(0, 0, kr, Math.PI + 0.12, -0.12); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#A8782E';
    ctx.beginPath(); ctx.arc(0, 0, kr, 0.12, Math.PI - 0.12); ctx.closePath(); ctx.fill();
    ctx.restore();
  } else {
    ctx.fillStyle = '#C9A24B';
    ctx.beginPath(); ctx.arc(cx, ky, kr, 0, 6.2832); ctx.fill();
    ctx.fillStyle = '#17223A';
    ctx.beginPath(); ctx.arc(cx, ky, 6, 0, 6.2832); ctx.fill();
  }
  ctx.fillStyle = '#3A4049';                               // fırçalar
  ctx.fillRect(cx - kr - 12, ky - 5, 10, 10);
  ctx.fillRect(cx + kr + 2, ky - 5, 10, 10);
  D.yaziAydinlik(ctx, komutatorVar(p) ? 'yarık halka döner · fırçalar sabit' : 'bütün halka (bilezik) · akım hiç çevrilmez',
                 cx, ky + 28, komutatorVar(p) ? '#1A7A55' : '#B03030',
                 '700 11px system-ui, sans-serif', 'center');

  D.yaziAydinlik(ctx, 'ω = ' + D.biçim(st.omega) + ' rad/s', w - 60, 20, R.hiz,
                 '700 12px system-ui, sans-serif', 'right');
  D.yaziAydinlik(ctx, 'tur: ' + st.tur + ((st.agir || 1) > 1 ? ' · ağır çekim ×' + st.agir : ''), w - 60, 38, R.mur,
                 '700 12px system-ui, sans-serif', 'right');

  if (p.i === 0)
    D.yaziAydinlik(ctx, 'akım yok ⟹ kuvvet yok ⟹ çerçeve dönmez',
                   cx, h - 12, '#B03030', '700 11px system-ui, sans-serif', 'center');
  else if (!komutatorVar(p))
    D.yaziAydinlik(ctx, 'komütatör yok ⟹ çerçeve dönmez, θ = 90° çevresinde SALINIR',
                   cx, h - 12, '#B03030', '700 11px system-ui, sans-serif', 'center');
  else if (oluNoktada(st, p))
    D.yaziAydinlik(ctx, 'ÖLÜ NOKTA · tork sıfır — gerçek motorlar bu yüzden çok çerçeveli',
                   cx, h - 12, '#B03030', '700 11px system-ui, sans-serif', 'center');
}

function cizGalvanometre(ctx, w, h, st, p) {
  const cx = w * 0.46, cy = h * 0.60;
  const Rc = Math.min(w * 0.14, h * 0.20);             // bobin yarıçapı

  /* eğri kutup parçaları ve demir çekirdek: alan RADYAL */
  ctx.fillStyle = '#E2483F';
  ctx.beginPath(); ctx.arc(cx, cy, Rc + 14, Math.PI * 0.62, Math.PI * 1.38); ctx.lineTo(cx - Rc - 60, cy - Rc * 0.9);
  ctx.lineTo(cx - Rc - 60, cy + Rc * 0.9); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#2F6FD0';
  ctx.beginPath(); ctx.arc(cx, cy, Rc + 14, -Math.PI * 0.38, Math.PI * 0.38); ctx.lineTo(cx + Rc + 60, cy + Rc * 0.9);
  ctx.lineTo(cx + Rc + 60, cy - Rc * 0.9); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#FFFFFF'; ctx.font = '700 16px system-ui, sans-serif';
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText('N', cx - Rc - 40, cy); ctx.fillText('S', cx + Rc + 40, cy);
  ctx.fillStyle = '#8A93A0';
  ctx.beginPath(); ctx.arc(cx, cy, Rc - 12, 0, 6.2832); ctx.fill();
  ctx.save(); ctx.strokeStyle = 'rgba(47,111,208,.6)'; ctx.lineWidth = 1.2;
  for (let k = -2; k <= 2; k++) {
    const a = k * 0.22;
    [[Math.PI + a, -1], [a, 1]].forEach(([ang]) => {
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(ang) * (Rc - 10), cy + Math.sin(ang) * (Rc - 10));
      ctx.lineTo(cx + Math.cos(ang) * (Rc + 12), cy + Math.sin(ang) * (Rc + 12));
      ctx.stroke();
    });
  }
  ctx.restore();

  /* bobin kenarları (yan kenarlar boşlukta döner); ψ = −φ */
  const psi = -st.phi;
  const s1x = cx + Math.cos(psi) * Rc, s1y = cy - Math.sin(psi) * Rc;
  const s2x = cx - Math.cos(psi) * Rc, s2y = cy + Math.sin(psi) * Rc;
  const sgn = Math.sign(p.i);
  if (sgn !== 0) {
    (sgn > 0 ? D.alanIceri : D.alanDisari)(ctx, s1x, s1y, 8, '#7A4A10');
    (sgn > 0 ? D.alanDisari : D.alanIceri)(ctx, s2x, s2y, 8, '#7A4A10');
    /* kuvvetler teğet: sağdaki kenar aşağı, soldaki yukarı (i > 0) ⟹ saat yönü */
    const tx = Math.sin(psi), ty = Math.cos(psi);          // sağ kenarda saat yönü teğeti (ekran)
    const boy = Math.min(40, 10 + Math.abs(p.i) * 3) * sgn;
    D.vektor(ctx, s1x, s1y, s1x + tx * boy, s1y + ty * boy, R.kuvvet, '', { kalinlik: 2.6 });
    D.vektor(ctx, s2x, s2y, s2x - tx * boy, s2y - ty * boy, R.kuvvet, '', { kalinlik: 2.6 });
  } else {
    D.noktaCisim(ctx, s1x, s1y, 6, '#7A4A10'); D.noktaCisim(ctx, s2x, s2y, 6, '#7A4A10');
  }

  /* ölçek ve ibre */
  const ib = Math.min(h * 0.50, 150);
  ctx.save(); ctx.strokeStyle = '#3A4049'; ctx.lineWidth = 1.4; ctx.fillStyle = '#3A4049';
  ctx.beginPath(); ctx.arc(cx, cy, ib, -Math.PI / 2 - GALV_DURAK * Math.PI / 180, -Math.PI / 2 + GALV_DURAK * Math.PI / 180); ctx.stroke();
  ctx.font = '600 10px system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  const duy = galvHassasiyet(p);                           // °/mA
  for (let d = -GALV_DURAK; d <= GALV_DURAK; d += 15) {
    const a = -Math.PI / 2 + d * Math.PI / 180;
    ctx.beginPath();
    ctx.moveTo(cx + Math.cos(a) * ib, cy + Math.sin(a) * ib);
    ctx.lineTo(cx + Math.cos(a) * (ib - (d % 30 === 0 ? 10 : 6)), cy + Math.sin(a) * (ib - (d % 30 === 0 ? 10 : 6)));
    ctx.stroke();
    if (d % 30 === 0 && duy > 0)
      ctx.fillText(D.biçim(d / duy, 1), cx + Math.cos(a) * (ib + 12), cy + Math.sin(a) * (ib + 12));
  }
  ctx.restore();
  const ia = -Math.PI / 2 + st.phi;
  ctx.save(); ctx.strokeStyle = '#B03030'; ctx.lineWidth = 2.6; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(ia) * (ib - 4), cy + Math.sin(ia) * (ib - 4)); ctx.stroke();
  ctx.restore();
  D.noktaCisim(ctx, cx, cy, 5, '#3A4049');
  /* spiral yay */
  ctx.save(); ctx.strokeStyle = '#6E7684'; ctx.lineWidth = 1.2; ctx.beginPath();
  for (let k = 0; k <= 60; k++) {
    const a = k / 60 * 4 * Math.PI + st.phi, r = 3 + k * 0.18;
    const x = cx + Math.cos(a) * r, y = cy + Math.sin(a) * r;
    if (k) ctx.lineTo(x, y); else ctx.moveTo(x, y);
  }
  ctx.stroke(); ctx.restore();

  D.yaziAydinlik(ctx, 'ölçek: mA', cx, cy - ib - 26, R.mur, '700 11px system-ui, sans-serif', 'center');
  D.yaziAydinlik(ctx, 'φ = ' + D.biçim(st.phi * 180 / Math.PI, 1) + '°', w - 12, 20, '#B03030',
                 '700 12px system-ui, sans-serif', 'right');
  D.yaziAydinlik(ctx, 'i = ' + D.biçim(p.i, 1) + ' mA', w - 12, 38, R.ivme,
                 '700 12px system-ui, sans-serif', 'right');
  D.yaziAydinlik(ctx, Math.abs(galvDenge(p)) >= GALV_DURAK - 1e-6 ? 'ÖLÇEK DIŞI · ibre durdurucuda'
                     : 'radyal alan ⟹ tork açıdan bağımsız ⟹ ölçek eşit aralıklı',
                 10, h - 12, Math.abs(galvDenge(p)) >= GALV_DURAK - 1e-6 ? '#B03030' : R.mur,
                 '600 11px system-ui, sans-serif', 'left');
}

/* ----------------------------------------- Klasik fizik görünümü */

function cizKlasik(ctx, w, h, st, p) {
  D.izgara(ctx, w, h, 26);

  if (galvanometre(p)) {
    D.yaziHaleli(ctx, 'Galvanometre · tork dengesi', 12, 22, K.beyaz, '700 12px system-ui, sans-serif', 'left');
    const A = alanCerceve(p);
    const tM = p.N * p.B * A * (p.i / 1000);
    const tY = KAPPA * st.phi;
    const bx = 16;
    const satir = [
      ['τ_manyetik = N·B·i·A', K.beyaz, '700 12px system-ui, sans-serif'],
      ['= ' + D.biçim(p.N) + '·' + D.biçim(p.B, 2) + '·' + D.biçim(p.i / 1000, 4) + '·' + D.biçim(A, 4) + ' = ' + D.biçim(tM * 1000, 3) + ' mN·m', K.metin2, '11px system-ui, sans-serif'],
      ['τ_yay = κ·φ = ' + D.biçim(tY * 1000, 3) + ' mN·m', R.surtunme, '700 12px system-ui, sans-serif'],
      ['κ = ' + D.biçim(KAPPA * 1000, 2) + ' mN·m/rad', K.metin2, '11px system-ui, sans-serif'],
      ['', K.metin2, '11px'],
      ['Denge: N·B·i·A = κ·φ', K.beyaz, '700 12px system-ui, sans-serif'],
      ['φ = (N·B·A/κ)·i = ' + D.biçim(galvDenge(p), 1) + '°', R.ivme, '700 12px system-ui, sans-serif'],
      ['hassasiyet = N·B·A/κ = ' + D.biçim(galvHassasiyet(p), 2) + ' °/mA', R.hiz, '700 12px system-ui, sans-serif'],
      ['N, B veya A artarsa hassasiyet artar', K.metin2, '11px system-ui, sans-serif']
    ];
    let sy = 46;
    satir.forEach(([t, c, f]) => { if (t) D.yaziHaleli(ctx, t, bx, sy, c, f, 'left'); sy += 18; });
    /* tork çubukları */
    const gx = w * 0.62, gy = 60, gw = w * 0.32, m = Math.max(1e-9, Math.abs(tM), Math.abs(tY));
    [['τ_manyetik', tM, R.kuvvet], ['τ_yay', -tY, R.surtunme]].forEach(([ad, v, c], k) => {
      const y = gy + k * 44;
      D.yaziHaleli(ctx, ad, gx, y, c, '700 11px system-ui, sans-serif', 'left');
      ctx.fillStyle = K.izgara; ctx.fillRect(gx, y + 10, gw, 12);
      ctx.fillStyle = c;
      const L = gw / 2 * Math.min(1, Math.abs(v) / m);
      ctx.fillRect(v >= 0 ? gx + gw / 2 : gx + gw / 2 - L, y + 10, L, 12);
    });
    D.yaziHaleli(ctx, 'dengede ikisi eşit ve zıt', gx, gy + 110, K.metin2, '11px system-ui, sans-serif', 'left');
    D.yaziHaleli(ctx, 'Kitap s.232: ibre, yay gerilip dönmeye ters etki yaptığında durur',
                 12, h - 16, R.ivme, '600 11px system-ui, sans-serif', 'left');
    return;
  }

  D.yaziHaleli(ctx, 'Döndürme etkisi', 12, 22, K.beyaz, '700 12px system-ui, sans-serif', 'left');

  const cx = w * 0.23, cy = h * 0.45, L = 62;
  ctx.strokeStyle = K.eksen; ctx.lineWidth = 1.4;
  ctx.beginPath(); ctx.moveTo(cx - 84, cy); ctx.lineTo(cx + 84, cy); ctx.stroke();
  D.yaziHaleli(ctx, 'B', cx + 90, cy, R.normal, '700 12px system-ui, sans-serif', 'left');

  const ux = Math.cos(st.aci), uy = Math.sin(st.aci);
  ctx.save();
  ctx.strokeStyle = R.ivme; ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(cx - ux * L, cy + uy * L); ctx.lineTo(cx + ux * L, cy - uy * L);
  ctx.stroke(); ctx.restore();
  D.noktaCisim(ctx, cx, cy, 4, K.beyaz);
  D.aciYayi(ctx, cx, cy, 38, -st.aci, 0, K.metin2, D.biçim(st.aci * 180 / Math.PI, 0) + '°');

  const T = Math.abs(etkinTork(st, p));
  const enBuyuk = tauMaks(p);
  const gx = cx - 84, gy = cy + 74, gw = 168;
  ctx.fillStyle = K.izgara; ctx.fillRect(gx, gy, gw, 12);
  ctx.fillStyle = R.kuvvet;
  ctx.fillRect(gx, gy, gw * Math.min(1, T / Math.max(1e-9, enBuyuk)), 12);
  D.yaziHaleli(ctx, 'τ / τ_maks', cx, gy + 28, K.metin2, '11px system-ui, sans-serif', 'center');

  const bx = w * 0.50;
  const satir = [
    ['τ = B·i·A·N·cosθ', K.beyaz, '700 12px system-ui, sans-serif'],
    ['A = ' + D.biçim(alanCerceve(p), 4) + ' m²  ·  N = ' + D.biçim(p.N), K.metin2, '11px system-ui, sans-serif'],
    ['cosθ = ' + D.biçim(Math.cos(st.aci), 3), R.ivme, '11px system-ui, sans-serif'],
    ['τ = ' + D.biçim(T, 4) + ' N·m', R.kuvvet, '700 13px system-ui, sans-serif'],
    ['θ = 0° (alanla aynı düzlem) ⟹ τ EN BÜYÜK', K.metin2, '11px system-ui, sans-serif'],
    ['θ = 90° (alana dik) ⟹ τ = 0', K.metin2, '11px system-ui, sans-serif'],
    ['', K.metin2, '11px'],
    ['yük freni τ_yük = k·ω', R.surtunme, '11px system-ui, sans-serif'],
    [komutatorVar(p) ? 'son hız ω ≈ (2/π)·τ_maks/k = ' + D.biçim(sonHiz(p), 1) + ' rad/s' : 'Komütatör yok ⟹ yalnızca SALINIR',
     komutatorVar(p) ? R.hiz : R.kuvvet, '700 11px system-ui, sans-serif']
  ];
  let sy = 46;
  satir.forEach(([t, c, f]) => { if (t) D.yaziHaleli(ctx, t, bx, sy, c, f, 'left'); sy += 17; });

  D.yaziHaleli(ctx, 'İki kenardaki kuvvetler zıt ⟹ ötelemez, DÖNDÜRÜR',
               12, h - 16, R.ivme, '600 11px system-ui, sans-serif', 'left');
}

/* ------------------------------------------------------- Grafikler */

function cizGrafik(ctx, w, h, st, p) {
  const pay = 8, gw = (w - pay * 3) / 2, gh = h - 6;

  if (galvanometre(p)) {
    const v1 = [];
    for (let i = -10; i <= 10.0001; i += 0.25) v1.push({ t: i, v: galvDenge(Object.assign({}, p, { i })) });
    D.miniGrafik(ctx, {
      x: pay, y: 3, w: gw, h: gh,
      baslik: 'φ − i   (DOĞRU orantı · ±' + GALV_DURAK + '°’de durdurucu)', birim: '°', tEtiket: 'i (mA)',
      imlec: { t: p.i, v: galvDenge(p) }, veri: v1, tMin: -10, tMax: 10,
      vMin: -GALV_DURAK, vMax: GALV_DURAK, renk: R.ivme
    });
    D.miniGrafik(ctx, {
      x: pay * 2 + gw, y: 3, w: gw, h: gh,
      baslik: 'φ − t   (ibre sönümlü salınıp dengeye oturur)', birim: '°',
      veri: st.kayit, tMin: st.kayit.length ? st.kayit[0].t : 0, tMax: Math.max(1, st.t),
      vMin: -GALV_DURAK, vMax: GALV_DURAK, renk: '#B03030'
    });
    return;
  }

  const v1 = [];
  const enBuyuk = Math.max(1e-9, tauMaks(p));
  for (let d = 0; d <= 360; d += 3) v1.push({ t: d, v: etkinTork({ aci: d * Math.PI / 180 }, p) });
  const s = p.i < 0 ? -1 : 1;
  D.miniGrafik(ctx, {
    x: pay, y: 3, w: gw, h: gh,
    baslik: komutatorVar(p) ? 'τ − θ  (komütatörle: hep AYNI yönde)' : 'τ − θ  (komütatörsüz: yön DEĞİŞİR)',
    birim: 'N·m', tEtiket: 'θ (°)',
    imlec: { t: st.aci * 180 / Math.PI, v: etkinTork(st, p) },
    veri: v1, tMax: 360,
    vMin: komutatorVar(p) ? Math.min(0, s * enBuyuk * 1.1) : -enBuyuk * 1.1,
    vMax: komutatorVar(p) ? Math.max(0, s * enBuyuk * 1.1) : enBuyuk * 1.1,
    renk: R.kuvvet
  });

  let wMin = 0, wMax = 0;
  for (const d of st.kayit) { if (d.v < wMin) wMin = d.v; if (d.v > wMax) wMax = d.v; }
  D.miniGrafik(ctx, {
    x: pay * 2 + gw, y: 3, w: gw, h: gh,
    baslik: 'ω − t   (gerçek zaman · işaret = dönme yönü)', birim: 'rad/s', tEtiket: 't (s)',
    veri: st.kayit, tMin: st.kayit.length ? st.kayit[0].t : 0,
    tMax: Math.max(0.05, st.t),
    vMin: wMin < 0 ? wMin * 1.1 : 0,
    vMax: wMax > 0 ? Math.max(wMax, komutatorVar(p) ? sonHiz(p) * (p.i < 0 ? 0 : 1) : 0) * 1.1 : (wMin < 0 ? 0 : 1),
    renk: R.hiz
  });
}

/* ----------------------------------------------------------- Okumalar */

/* Tek çerçeveli motorun ÖLÜ NOKTASI: θ = 90° ve 270°’de tork sıfırdır. */
function oluNoktada(st, p) {
  return Math.abs(st.omega) < 0.05 && Math.abs(Math.cos(st.aci)) < 0.05;
}

function okumalar(st, p) {
  if (galvanometre(p)) {
    return [
      { et: 'Akım  i',       dg: D.biçim(p.i, 1),                      birim: 'mA' },
      { et: 'Sapma  φ',      dg: D.biçim(st.phi * 180 / Math.PI, 1),   birim: '°' },
      { et: 'Denge sapması', dg: D.biçim(galvDenge(p), 1),             birim: '°' },
      { et: 'Hassasiyet',    dg: D.biçim(galvHassasiyet(p), 2),        birim: '°/mA' },
      { et: 'Yay sabiti κ',  dg: D.biçim(KAPPA * 1000, 2),             birim: 'mN·m/rad' }
    ];
  }
  return [
    { et: 'Açı  θ',        dg: D.biçim(st.aci * 180 / Math.PI),  birim: '°' },
    { et: 'Tork  τ',       dg: D.biçim(Math.abs(etkinTork(st, p)), 4), birim: 'N·m' },
    { et: 'Açısal hız ω',  dg: D.biçim(st.omega),                birim: 'rad/s' },
    { et: 'Devir',         dg: D.biçim(st.omega * 60 / (2 * Math.PI)), birim: 'dev/dk' },
    { et: 'Tam tur',       dg: String(st.tur),                   birim: '' },
    { et: 'Durum',         dg: p.i === 0 ? 'Akım yok · durgun' : oluNoktada(st, p)
        ? (komutatorVar(p) ? 'ÖLÜ NOKTADA TAKILDI' : 'Dengede durdu')
        : !komutatorVar(p) ? 'Salınıyor'
        /* Tek çerçevede tork dalgalıdır: hız sabit bir ORTALAMA çevresinde dalgalanır.
           Ortalamaya ulaşma süresi ≈ 5·I/k. */
        : (st.t > 5 * eylemsizlik(p) / yukKatsayi(p) ? 'Ortalama hız sabit (dalgalı) ' + (st.omega > 0 ? '↺' : '↻')
           : Math.abs(st.omega) > 0.5 ? 'Hızlanıyor' : 'Kalkıyor'), birim: '' }
  ];
}

/* ------------------------------------------------------------- Tanım */

D.simler = D.simler || {};
D.simler['elektrik-motoru'] = {
  id: 'elektrik-motoru',
  baslik: '2.2.6 · Elektrik motoru · dönen çerçeve, komütatör, galvanometre',
  yukseklik: 350,
  grafikPanel: true,
  grafikYukseklik: 170,
  parametreler: [
    { anahtar: 'mod', etiket: 'Düzenek', tur: 'secim', deger: 1, secenekler: [
      { d: 1, e: 'Motor (komütatörlü) — sürekli döner' },
      { d: 2, e: 'Komütatörsüz çerçeve — yalnızca salınır' },
      { d: 3, e: 'Galvanometre (yaylı, ibreli)' }
    ]},
    { anahtar: 'B', etiket: 'Manyetik alan B', min: 0.1, max: 2, adim: 0.1, deger: 0.6, birim: 'T' },
    { anahtar: 'i', etiket: 'Akım i (galvanometrede mA)', min: -10, max: 10, adim: 0.5, deger: 3, birim: 'A' },
    { anahtar: 'N', etiket: 'Sarım sayısı N', min: 1, max: 100, adim: 1, deger: 20, birim: '' },
    { anahtar: 'a', etiket: 'Çerçeve eni', min: 2, max: 20, adim: 1, deger: 8, birim: 'cm' },
    { anahtar: 'b', etiket: 'Çerçeve boyu', min: 2, max: 20, adim: 1, deger: 10, birim: 'cm' },
    { anahtar: 'm', etiket: 'Çerçeve kütlesi', min: 5, max: 200, adim: 5, deger: 50, birim: 'g' },
    { anahtar: 'k', etiket: 'Yük / sürtünme k (1–2. düzenek)', min: 0.5, max: 20, adim: 0.5, deger: 5, birim: 'mN·m·s' }
  ],
  durum, adim, bitti, cizGercek, cizKlasik, cizGrafik, okumalar
};

})();
