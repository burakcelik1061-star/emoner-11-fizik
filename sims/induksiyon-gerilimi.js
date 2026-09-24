(function () {
"use strict";
window.F11 = window.F11 || {};

/* ==========================================================================
   sims/induksiyon-gerilimi.js
   --------------------------------------------------------------------------
   Konu 2.3.2 · İndüksiyon gerilimi  (MEB 11, s.242-252)

   Faraday yasası (kitap s.247):
       ε = −N · ΔΦ / Δt
   Eksi işareti LENZ YASASI’dır: indüksiyon akımı, akı DEĞİŞİMİNE karşı koyan
   yönde akar. Mıknatıs yaklaşırken halka ona aynı kutbunu gösterip İTER,
   uzaklaşırken zıt kutbunu gösterip ÇEKER.

   DÖRT DÜZENEK
   ------------
   1) Mıknatıs–bobin : Mıknatıs bobine girip çıkar. Nokta dipolün halka
      eksenindeki akısı TAM olarak Φ(x) = Φ₀ / (1 + x²/r²)^{3/2} (r: bobin
      yarıçapı). Mıknatıs en uçta durduğu anda ε = 0.
   2) Raylı tel      : ε = B·L·ϑ; indüklenen akım tele KARŞI kuvvet uygular ve
      çekmek için harcanan güç F·ϑ, devredeki elektrik gücüne ε·i eşittir.
   3) Dönen çerçeve  : jeneratör; akı kosinüs, gerilim SİNÜS.
   4) Faraday’ın iki bobini (kitap s.250): anahtar kapanınca birinci devrenin
      akımı L/R süresinde büyür, demir çekirdekteki alan değişir ve ikinci
      bobinde KISA bir akım oluşur. Akım sabitlenince indüksiyon biter;
      anahtar açılınca ibre ters yönde sapar.
   ========================================================================== */

const D = window.F11;
const { R, K } = D;

/* ------------------------------------------------------------- Fizik */

function cerceveAlani(p) { return (p.a / 100) * (p.a / 100); }           // kare çerçeve
function bobinYaricap(p) { return (p.a / 100) / 2; }                      // dairesel bobin
function bobinAlani(p) { return Math.PI * bobinYaricap(p) * bobinYaricap(p); }

/* --- 1. düzenek: mıknatıs bobine girip çıkar --- */
const EN_UZAK = 0.9;                      // m — mıknatısın en uzak konumu

/** Mıknatısın açısal gidiş-geliş frekansı: tepe hızı tam p.v olsun. */
function miknatisW(p) { return 2 * p.v / EN_UZAK; }
/** Mıknatıs merkezinin bobin merkezine uzaklığı (m). t = 0’da en uzakta. */
function miknatisX(st, p) { return EN_UZAK * (1 + Math.cos(miknatisW(p) * st.t)) / 2; }
function miknatisHizi(st, p) { return -EN_UZAK / 2 * miknatisW(p) * Math.sin(miknatisW(p) * st.t); }  // dx/dt

/** Tek halkadan geçen akı (Wb); Φ₀ = B·πr² (mıknatıs bobin ortasındayken). */
function aki1(x, p) {
  const u = x / bobinYaricap(p);
  return p.B * bobinAlani(p) / Math.pow(1 + u * u, 1.5);
}

/* --- 4. düzenek: anahtar --- */
const TAU = 0.25;                          // s — birinci devrenin L/R süresi
const KAPAT = 0.5, AC = 3.5;               // s — anahtarın kapandığı ve açıldığı an
function anahtarKapali(t) { return t >= KAPAT && t < AC; }
/** Birinci devre akımının son değere oranı (0–1). */
function birinciOran(t) {
  if (t < KAPAT) return 0;
  const s = 1 - Math.exp(-(Math.min(t, AC) - KAPAT) / TAU);
  if (t < AC) return s;
  return s * Math.exp(-(t - AC) / (TAU * 0.4));             // açınca daha hızlı söner (kıvılcım)
}
function birinciTurev(t) {
  if (t < KAPAT) return 0;
  if (t < AC) return Math.exp(-(t - KAPAT) / TAU) / TAU;
  const s = 1 - Math.exp(-(AC - KAPAT) / TAU);
  return -s * Math.exp(-(t - AC) / (TAU * 0.4)) / (TAU * 0.4);
}

/* --- Ortak: anlık akı (tek halka) --- */
function aki(st, p) {
  if (p.mod < 1.5) return aki1(miknatisX(st, p), p);
  if (p.mod < 2.5) return p.B * (p.L / 100) * st.x;                  // A = L · x
  if (p.mod < 3.5) return p.B * cerceveAlani(p) * Math.cos(st.aci);
  return p.B * bobinAlani(p) * birinciOran(st.t);
}

/** İndüksiyon gerilimi (V) — analitik türevler. */
function gerilim(st, p) {
  if (p.mod < 1.5) {
    const x = miknatisX(st, p), r = bobinYaricap(p), u = x / r;
    const dPhi_dx = p.B * bobinAlani(p) * (-3 * u / r) / Math.pow(1 + u * u, 2.5);
    return -p.N * dPhi_dx * miknatisHizi(st, p);
  }
  if (p.mod < 2.5) return -p.B * (p.L / 100) * p.v * rayYonu(st);       // tek halka: N yok
  if (p.mod < 3.5) return p.N * p.B * cerceveAlani(p) * p.omega * Math.sin(st.aci);
  return -p.N * p.B * bobinAlani(p) * birinciTurev(st.t);
}

function akim(st, p) { return gerilim(st, p) / Math.max(0.1, p.R); }

/** Galvanometrenin tam ölçek akımı: düzeneğin tepe akımı. */
function akimTamOlcek(p) {
  const Rr = Math.max(0.1, p.R);
  if (p.mod < 1.5) {
    if (!(p.v > 0)) return 0.05;
    const T = 2 * Math.PI / miknatisW(p);
    let tepe = 0;
    for (let k = 0; k < 200; k++) tepe = Math.max(tepe, Math.abs(gerilim({ t: (k / 200) * T }, p)));
    return Math.max(1e-4, tepe / Rr);
  }
  if (p.mod < 2.5) return Math.max(1e-4, p.B * (p.L / 100) * 4 / Rr);
  if (p.mod < 3.5) return Math.max(1e-4, (p.N * p.B * cerceveAlani(p) * p.omega) / Rr);
  return Math.max(1e-4, p.N * p.B * bobinAlani(p) / (TAU * 0.4) / Rr);
}

function rayYonu(st) { return st && st.yon != null ? st.yon : 1; }

function karsiKuvvet(st, p) {
  if (p.mod > 1.5 && p.mod < 2.5) return Math.abs(akim(st, p)) * p.B * (p.L / 100);
  return 0;
}

/* -------------------------------------------------------------- Durum */

function durum(p) { return { t: 0, x: 0.25, yon: 1, aci: 0, kayit: [], akiKayit: [] }; }

function adim(st, dt, p) {
  st.t += dt;
  if (p.mod > 1.5 && p.mod < 2.5) {
    st.x += st.yon * p.v * dt;
    if (st.x >= 0.9)  { st.x = 0.9;  st.yon = -1; }
    if (st.x <= 0.05) { st.x = 0.05; st.yon = 1; }
  }
  if (p.mod > 2.5 && p.mod < 3.5) {
    st.aci += p.omega * dt;
    if (st.aci > 2 * Math.PI) st.aci -= 2 * Math.PI;
  }
  if (st.kayit.length === 0 || st.t - st.kayit[st.kayit.length - 1].t > 0.015) {
    st.kayit.push({ t: st.t, v: gerilim(st, p) });
    st.akiKayit.push({ t: st.t, v: aki(st, p) });
  }
  if (st.kayit.length > 400) { st.kayit.shift(); st.akiKayit.shift(); }
}

function bitti(st, p) { return p.mod > 3.5 && st.t > AC + 1.5; }

/* --------------------------------------------- Gerçekçi görünüm */

function cizGercek(ctx, w, h, st, p) {
  if (p.mod < 1.5)      cizMiknatis(ctx, w, h, st, p);
  else if (p.mod < 2.5) cizRay(ctx, w, h, st, p);
  else if (p.mod < 3.5) cizJenerator(ctx, w, h, st, p);
  else                  cizAnahtar(ctx, w, h, st, p);
}

/** Küçük galvanometre — ibresi akımla sapar. */
function galvanometre(ctx, x, y, r, i, enBuyuk) {
  ctx.save();
  ctx.fillStyle = 'rgba(255,255,255,.95)';
  ctx.beginPath(); ctx.arc(x, y, r, 0, 6.2832); ctx.fill();
  ctx.strokeStyle = '#7D8A99'; ctx.lineWidth = 2; ctx.stroke();
  ctx.restore();
  const oran = Math.max(-1, Math.min(1, i / Math.max(1e-12, enBuyuk)));
  const a = -Math.PI / 2 + oran * 1.0;
  ctx.save();
  ctx.strokeStyle = Math.abs(oran) > 0.02 ? '#E2483F' : '#7D8A99';
  ctx.lineWidth = 3; ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(x, y + r * 0.45);
  ctx.lineTo(x + Math.cos(a) * r * 0.78, y + r * 0.45 + Math.sin(a) * r * 0.78);
  ctx.stroke(); ctx.restore();
  D.yaziAydinlik(ctx, '0', x, y + r * 0.45 - r * 0.9, '#5F6B78', '600 9px system-ui, sans-serif', 'center');
}

/** Bobin ön yarılarına indüksiyon akımı yön okları (yukarı: +1, aşağı: −1). */
function bobinAkimOklari(ctx, x0, adet, ara, cy, ry, yon, renk) {
  if (!yon) return;
  ctx.save(); ctx.fillStyle = renk;
  for (let k = 0; k < adet; k += 2) {
    const x = x0 + k * ara + 7, y = cy;
    ctx.beginPath();
    ctx.moveTo(x, y - 7 * yon); ctx.lineTo(x - 4.5, y + 3 * yon); ctx.lineTo(x + 4.5, y + 3 * yon);
    ctx.closePath(); ctx.fill();
  }
  ctx.restore();
}

function cizMiknatis(ctx, w, h, st, p) {
  const cy = h * 0.44;
  const bobinX = w * 0.60, adet = 6, ara = 13;
  const bobinMerkez = bobinX + (adet - 1) * ara / 2;
  const pxM = (bobinMerkez - 60) / EN_UZAK;
  const ry = Math.max(16, Math.min(h * 0.22, bobinYaricap(p) * pxM));   // bobin yarıçapı, gerçek ölçek

  ctx.save(); ctx.strokeStyle = '#8A5A2B'; ctx.lineWidth = 4;
  for (let k = 0; k < adet; k++) { const x = bobinX + k * ara; ctx.beginPath(); ctx.ellipse(x, cy, 7, ry, 0, Math.PI / 2, Math.PI * 1.5); ctx.stroke(); }
  ctx.restore();

  const mx = bobinMerkez - miknatisX(st, p) * pxM;
  D.miknatis(ctx, mx - 44, cy - 14, 88, 28, true);

  ctx.save(); ctx.strokeStyle = '#B87333'; ctx.lineWidth = 5;
  for (let k = 0; k < adet; k++) { const x = bobinX + k * ara; ctx.beginPath(); ctx.ellipse(x, cy, 7, ry, 0, -Math.PI / 2, Math.PI / 2); ctx.stroke(); }
  ctx.restore();

  const eps = gerilim(st, p), i = akim(st, p), ts = akimTamOlcek(p);
  const vx = -miknatisHizi(st, p);                 // ekranda sağa + (bobine doğru)
  const varAkim = Math.abs(i) > ts * 0.003;          // uzaktayken akım küçük ama VAR
  /* Lenz: yaklaşırken (akı artar) bobinin mıknatısa bakan yüzü N olur ve İTER;
     uzaklaşırken S olur ve ÇEKER. Ön yarıda akım yaklaşırken YUKARI akar. */
  if (varAkim) {
    const yaklas = vx > 0;
    D.rozet(ctx, yaklas ? 'N' : 'S', bobinX - 16, cy - ry - 30, yaklas ? '#E2483F' : '#2F6FD0', '#FFFFFF',
            '700 13px system-ui, sans-serif', true);
    bobinAkimOklari(ctx, bobinX, adet, ara, cy + ry * 0.55, ry, yaklas ? 1 : -1, '#FFD24A');
    const Fboy = 14 + 30 * Math.min(1, Math.abs(i) / ts);
    D.vektor(ctx, mx, cy + 26, mx + (yaklas ? -Fboy : Fboy), cy + 26, R.kuvvet, yaklas ? 'itme' : 'çekme', { kalinlik: 2.6 });
  }
  if (Math.abs(vx) * pxM > 4)
    D.vektor(ctx, mx, cy - 30, mx + Math.sign(vx) * 40, cy - 30, R.hiz, 'ϑ', { kalinlik: 2.4 });

  const gX = w * 0.30, gY = cy + ry + 60, gR = 26;
  ctx.strokeStyle = '#7D8A99'; ctx.lineWidth = 2.4;
  ctx.beginPath(); ctx.moveTo(bobinX, cy + ry); ctx.lineTo(bobinX, gY - 8); ctx.lineTo(gX + gR, gY - 8); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(bobinX + (adet - 1) * ara, cy + ry); ctx.lineTo(bobinX + (adet - 1) * ara, gY + 8); ctx.lineTo(gX + gR, gY + 8); ctx.stroke();
  galvanometre(ctx, gX, gY, gR, i, ts);
  D.yaziAydinlik(ctx, 'galvanometre', gX - gR - 8, gY, R.mur, '600 11px system-ui, sans-serif', 'right');

  D.yaziAydinlik(ctx, 'ε = ' + D.biçim(eps, 4) + ' V', w - 10, 20, R.normal, '700 13px system-ui, sans-serif', 'right');
  D.yaziAydinlik(ctx, 'i = ' + D.biçim(i * 1000, 2) + ' mA', w - 10, 38, R.ivme, '700 12px system-ui, sans-serif', 'right');
  D.yaziAydinlik(ctx, !varAkim ? 'mıknatıs duruyor / dönüyor ⟹ akı değişmiyor ⟹ ε = 0'
                     : vx > 0 ? 'yaklaşıyor ⟹ akı ARTIYOR ⟹ bobin N yüzünü gösterip İTER (Lenz)'
                              : 'uzaklaşıyor ⟹ akı AZALIYOR ⟹ bobin S yüzünü gösterip ÇEKER (Lenz)',
                 w / 2, h - 12, varAkim ? R.mur : '#B03030', '600 11px system-ui, sans-serif', 'center');
}

function cizRay(ctx, w, h, st, p) {
  const bx = w * 0.08, by = h * 0.16, bw = w * 0.84, bh = h * 0.56;
  ctx.save(); ctx.fillStyle = 'rgba(56,150,200,.10)'; ctx.fillRect(bx, by, bw, bh); ctx.restore();
  D.alanBolgesi(ctx, bx, by, bw, bh, -1, 'rgba(47,111,208,.7)', 40);

  const ust = by + bh * 0.24, alt = by + bh * 0.76;
  ctx.fillStyle = '#9AA5B1';
  ctx.fillRect(bx + 6, ust - 3, bw - 12, 6);
  ctx.fillRect(bx + 6, alt - 3, bw - 12, 6);
  ctx.fillRect(bx + 6, ust, 6, alt - ust);

  const tx = bx + 10 + st.x * (bw - 30);
  ctx.save(); ctx.fillStyle = 'rgba(53,192,138,.16)'; ctx.fillRect(bx + 12, ust, tx - bx - 12, alt - ust); ctx.restore();
  ctx.save(); ctx.strokeStyle = '#B87333'; ctx.lineWidth = 9; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(tx, ust); ctx.lineTo(tx, alt); ctx.stroke(); ctx.restore();

  const yon = rayYonu(st);
  /* Lenz: B ⊗, alan büyürken (sağa) içeri akı artar ⟹ akım dışarı alan üretir
     ⟹ halkada saat yönünün tersi ⟹ telde YUKARI (q·ϑ×B ile aynı). */
  if (p.v > 0) {
    const iy = yon > 0 ? -1 : 1;
    D.vektor(ctx, tx + 14, (ust + alt) / 2 - iy * 18, tx + 14, (ust + alt) / 2 + iy * 18, '#C98A00', 'i', { kalinlik: 2.6 });
    D.vektor(ctx, tx, ust - 22, tx + 44 * yon, ust - 22, R.hiz, 'ϑ', { kalinlik: 2.6 });
  }
  const Fk = karsiKuvvet(st, p);
  if (Fk > 1e-6) D.vektor(ctx, tx, alt + 22, tx - 44 * yon, alt + 22, R.kuvvet, 'F_karşı', { kalinlik: 2.6 });

  const eps = gerilim(st, p), i = akim(st, p);
  galvanometre(ctx, bx + 34, (ust + alt) / 2, 24, i, akimTamOlcek(p));

  D.yaziAydinlik(ctx, (yon > 0 ? 'alan BÜYÜYOR' : 'alan KÜÇÜLÜYOR') + ' · ε = B·L·ϑ = ' + D.biçim(Math.abs(eps), 3) + ' V',
                 w - 10, 20, R.normal, '700 13px system-ui, sans-serif', 'right');
  D.yaziAydinlik(ctx, 'i = ' + D.biçim(Math.abs(i), 3) + ' A · F_karşı = ' + D.biçim(Fk, 3) + ' N', w - 10, 38, R.ivme,
                 '700 12px system-ui, sans-serif', 'right');
  D.yaziAydinlik(ctx, 'çekmek için harcanan güç F·ϑ = elektrik gücü ε·i — bedava enerji yok',
                 10, h - 12, R.mur, '600 11px system-ui, sans-serif', 'left');
}

function cizJenerator(ctx, w, h, st, p) {
  const cx = w * 0.44, cy = h * 0.46, R0 = Math.min(w * 0.18, h * 0.28);
  ctx.fillStyle = '#E2483F'; ctx.fillRect(12, cy - R0 - 12, 40, (R0 + 12) * 2);
  ctx.fillStyle = '#2F6FD0'; ctx.fillRect(w * 0.76, cy - R0 - 12, 40, (R0 + 12) * 2);
  ctx.fillStyle = '#FFFFFF'; ctx.font = '700 18px system-ui, sans-serif';
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText('N', 32, cy); ctx.fillText('S', w * 0.76 + 20, cy);
  ctx.save(); ctx.strokeStyle = 'rgba(47,111,208,.45)'; ctx.lineWidth = 1.4;
  for (let k = -2; k <= 2; k++) { const yy = cy + k * (R0 * 0.55); ctx.beginPath(); ctx.moveTo(54, yy); ctx.lineTo(w * 0.76, yy); ctx.stroke(); }
  ctx.restore();

  /* Φ = B·A·cos(ωt): t = 0’da çerçeve düzlemi alana DİK (ekranda düşey). */
  const eps = gerilim(st, p);
  const sx = Math.sin(st.aci), sy = Math.cos(st.aci);
  const k1x = cx + sx * R0, k1y = cy - sy * R0, k2x = cx - sx * R0, k2y = cy + sy * R0;
  ctx.save(); ctx.strokeStyle = 'rgba(120,130,150,.45)'; ctx.lineWidth = 1; ctx.setLineDash([4, 5]);
  ctx.beginPath(); ctx.arc(cx, cy, R0, 0, 6.2832); ctx.stroke(); ctx.restore();
  ctx.save(); ctx.strokeStyle = '#B87333'; ctx.lineWidth = 5;
  ctx.beginPath(); ctx.moveTo(k1x, k1y); ctx.lineTo(k2x, k2y); ctx.stroke(); ctx.restore();
  D.noktaCisim(ctx, cx, cy, 4, K.beyaz);

  const epsM = Math.max(1e-9, p.N * p.B * cerceveAlani(p) * p.omega);
  const oranE = Math.abs(eps) / epsM;
  if (oranE > 0.06) {
    const r = 4 + 8 * oranE;
    (eps > 0 ? D.alanDisari : D.alanIceri)(ctx, k1x, k1y, r, '#7A4A10');
    (eps > 0 ? D.alanIceri : D.alanDisari)(ctx, k2x, k2y, r, '#7A4A10');
  }
  galvanometre(ctx, w * 0.91, cy + 70, 26, akim(st, p), akimTamOlcek(p));
  D.yaziAydinlik(ctx, 'ε = ' + D.biçim(eps, 3) + ' V', w / 2, h - 30, R.normal, '700 14px system-ui, sans-serif', 'center');
  D.yaziAydinlik(ctx, 'akı kosinüs ⟹ gerilim SİNÜS · akı sıfırken ε en büyük', w / 2, h - 12, R.mur,
                 '600 11px system-ui, sans-serif', 'center');
}

function cizAnahtar(ctx, w, h, st, p) {
  /* Faraday’ın halkası: demir çubuk, iki bobin, anahtar ve galvanometre */
  const cy = h * 0.42, x1 = w * 0.18, x2 = w * 0.58, cw = w * 0.28;
  ctx.fillStyle = '#6E7684'; ctx.fillRect(x1 - 20, cy - 10, x2 + cw - x1 + 40, 20);
  const bobin = (x0, renkOn, parlak) => {
    ctx.save(); ctx.strokeStyle = renkOn; ctx.lineWidth = 4;
    if (parlak > 0.02) { ctx.shadowColor = 'rgba(255,200,40,' + Math.min(0.9, parlak) + ')'; ctx.shadowBlur = 10; }
    for (let k = 0; k < 9; k++) { const x = x0 + k * cw / 8; ctx.beginPath(); ctx.ellipse(x, cy, 6, 26, 0, -Math.PI / 2, Math.PI / 2); ctx.stroke(); }
    ctx.restore();
  };
  const o = birinciOran(st.t);
  bobin(x1, '#B87333', o);
  bobin(x2, '#B87333', 0);

  /* birinci devre: pil + anahtar */
  const py = cy + 80;
  ctx.strokeStyle = '#7D8A99'; ctx.lineWidth = 2.4;
  ctx.beginPath(); ctx.moveTo(x1, cy + 26); ctx.lineTo(x1, py); ctx.lineTo(x1 + cw * 0.3, py); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(x1 + cw, cy + 26); ctx.lineTo(x1 + cw, py); ctx.lineTo(x1 + cw * 0.72, py); ctx.stroke();
  ctx.fillStyle = '#4A5059'; ctx.fillRect(x1 + cw * 0.3, py - 8, 20, 16);
  D.yaziAydinlik(ctx, 'pil', x1 + cw * 0.3 + 10, py + 20, R.mur, '600 10px system-ui, sans-serif', 'center');
  const ax = x1 + cw * 0.72, kapali = anahtarKapali(st.t);
  ctx.strokeStyle = kapali ? '#1A7A55' : '#B03030'; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(ax, py); ctx.lineTo(ax - 22, py - (kapali ? 0 : 14)); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(x1 + cw * 0.3 + 20, py); ctx.lineTo(ax - 22, py); ctx.stroke();
  D.yaziAydinlik(ctx, kapali ? 'anahtar KAPALI' : 'anahtar AÇIK', ax - 10, py - 24, kapali ? '#1A7A55' : '#B03030',
                 '700 11px system-ui, sans-serif', 'center');

  /* ikinci devre: galvanometre */
  const gX = x2 + cw / 2, gY = cy + 84;
  ctx.strokeStyle = '#7D8A99'; ctx.lineWidth = 2.4;
  ctx.beginPath(); ctx.moveTo(x2, cy + 26); ctx.lineTo(x2, gY); ctx.lineTo(gX - 24, gY); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(x2 + cw, cy + 26); ctx.lineTo(x2 + cw, gY); ctx.lineTo(gX + 24, gY); ctx.stroke();
  galvanometre(ctx, gX, gY, 24, akim(st, p), akimTamOlcek(p));

  const i2 = akim(st, p);
  D.yaziAydinlik(ctx, 'birinci devre akımı: %' + D.biçim(o * 100, 0), x1 + cw / 2, cy - 44, '#B07800',
                 '700 12px system-ui, sans-serif', 'center');
  D.yaziAydinlik(ctx, 'ikinci bobin: ε = ' + D.biçim(gerilim(st, p), 3) + ' V · i = ' + D.biçim(i2 * 1000, 1) + ' mA',
                 x2 + cw / 2, cy - 44, R.normal, '700 12px system-ui, sans-serif', 'center');
  D.yaziAydinlik(ctx, Math.abs(i2) < akimTamOlcek(p) * 0.02
                     ? (kapali ? 'akım SABİT ⟹ akı değişmiyor ⟹ indüksiyon YOK' : 'akım yok ⟹ indüksiyon yok')
                     : kapali ? 'anahtar kapandı ⟹ akı ARTIYOR ⟹ ibre bir yöne sapıyor'
                              : 'anahtar açıldı ⟹ akı AZALIYOR ⟹ ibre TERS yöne sapıyor',
                 w / 2, h - 12, R.mur, '600 11px system-ui, sans-serif', 'center');
}

/* ----------------------------------------- Klasik fizik görünümü */

function cizKlasik(ctx, w, h, st, p) {
  D.izgara(ctx, w, h, 26);
  const eps = gerilim(st, p), F = aki(st, p);

  D.yaziHaleli(ctx, 'Faraday ve Lenz', 12, 22, K.beyaz, '700 12px system-ui, sans-serif', 'left');

  let satir;
  if (p.mod > 1.5 && p.mod < 2.5) {
    const i = akim(st, p), Fk = karsiKuvvet(st, p);
    satir = [
      ['ε = B · L · ϑ  (N = 1)', K.beyaz, '700 13px system-ui, sans-serif'],
      ['= ' + D.biçim(p.B, 2) + '·' + D.biçim(p.L / 100, 2) + '·' + D.biçim(p.v, 2) + ' = ' + D.biçim(Math.abs(eps), 3) + ' V', K.metin2, '11px system-ui, sans-serif'],
      ['i = ε/R = ' + D.biçim(Math.abs(i), 3) + ' A', R.ivme, '700 12px system-ui, sans-serif'],
      ['F_karşı = B·i·L = ' + D.biçim(Fk, 4) + ' N', R.kuvvet, '700 12px system-ui, sans-serif'],
      ['', K.metin2, '11px'],
      ['mekanik güç F·ϑ = ' + D.biçim(Fk * p.v, 4) + ' W', K.metin2, '11px system-ui, sans-serif'],
      ['elektrik gücü ε·i = ' + D.biçim(Math.abs(eps * i), 4) + ' W', K.metin2, '11px system-ui, sans-serif'],
      ['⟹ eşit: enerji korunur', R.hiz, '700 11px system-ui, sans-serif']
    ];
  } else if (p.mod > 2.5 && p.mod < 3.5) {
    satir = [
      ['Φ = B·A·cos(ωt)', K.beyaz, '12px system-ui, sans-serif'],
      ['ε = N·B·A·ω·sin(ωt)', K.beyaz, '700 13px system-ui, sans-serif'],
      ['ε_maks = N·B·A·ω = ' + D.biçim(p.N * p.B * cerceveAlani(p) * p.omega, 3) + ' V', R.ivme, '700 12px system-ui, sans-serif'],
      ['anlık ε = ' + D.biçim(eps, 3) + ' V', R.normal, '700 13px system-ui, sans-serif'],
      ['Φ = ' + D.biçim(F, 4) + ' Wb', K.metin2, '11px system-ui, sans-serif']
    ];
  } else {
    satir = [
      ['ε = −N · ΔΦ / Δt', K.beyaz, '700 13px system-ui, sans-serif'],
      ['eksi işareti = LENZ', R.kuvvet, '11px system-ui, sans-serif'],
      ['N = ' + D.biçim(p.N) + ' sarım · r = ' + D.biçim(bobinYaricap(p) * 100, 1) + ' cm', K.metin2, '11px system-ui, sans-serif'],
      ['Φ (bir halka) = ' + D.biçim(F, 5) + ' Wb', K.metin2, '11px system-ui, sans-serif'],
      ['ε = ' + D.biçim(eps, 4) + ' V', R.normal, '700 13px system-ui, sans-serif'],
      ['i = ε/R = ' + D.biçim(akim(st, p) * 1000, 2) + ' mA', R.ivme, '700 12px system-ui, sans-serif']
    ];
    if (p.mod < 1.5)
      satir.push(['mıknatıs hızı ϑ = ' + D.biçim(Math.abs(miknatisHizi(st, p)), 2) + ' m/s', K.metin2, '11px system-ui, sans-serif']);
  }
  let sy = 46;
  satir.forEach(([t, c, f]) => { if (t) D.yaziHaleli(ctx, t, w * 0.52, sy, c, f, 'left'); sy += 18; });

  const cx = w * 0.22, cy = h * 0.48;
  if (p.mod > 1.5 && p.mod < 2.5) {
    const yon = rayYonu(st);
    if (p.v > 0) {
      D.vektor(ctx, cx - 40 * yon, cy - 30, cx + 40 * yon, cy - 30, R.hiz, 'ϑ', { kalinlik: 2.4 });
      D.vektor(ctx, cx + 40 * yon, cy + 10, cx - 40 * yon, cy + 10, R.kuvvet, 'F_karşı', { kalinlik: 2.4 });
    }
    D.yaziHaleli(ctx, p.v === 0 ? 'tel duruyor ⟹ ε = 0' : yon > 0 ? 'hareket sağa ⟹ kuvvet sola' : 'hareket sola ⟹ kuvvet sağa',
                 cx, cy + 46, R.kuvvet, '600 11px system-ui, sans-serif', 'center');
  } else {
    const degisim = -eps;                                             // dΦ/dt’nin işareti = −ε’nin işareti
    const sabit = Math.abs(akim(st, p)) < akimTamOlcek(p) * 0.02;
    const buyuyor = degisim > 0;
    D.yaziHaleli(ctx, sabit ? 'Akı DEĞİŞMİYOR' : buyuyor ? 'Akı ARTIYOR' : 'Akı AZALIYOR', cx, cy - 34,
                 sabit ? K.metin2 : buyuyor ? R.kuvvet : R.hiz, '700 13px system-ui, sans-serif', 'center');
    D.yaziHaleli(ctx, sabit ? 'indüksiyon akımı yok' : buyuyor ? 'akım artışa karşı koyar' : 'akım azalmaya karşı koyar',
                 cx, cy - 10, K.metin2, '11px system-ui, sans-serif', 'center');
    if (!sabit)
      D.yaziHaleli(ctx, buyuyor ? '⟹ ZIT yönde alan üretir' : '⟹ AYNI yönde alan üretir',
                   cx, cy + 12, K.beyaz, '600 11px system-ui, sans-serif', 'center');
  }

  D.yaziHaleli(ctx, 'Lenz: indüksiyon akımı akı değişimine karşı koyar — enerji korunumu',
               12, h - 16, R.ivme, '600 11px system-ui, sans-serif', 'left');
}

/* ------------------------------------------------------- Grafikler */

function cizGrafik(ctx, w, h, st, p) {
  const pay = 8, gw = (w - pay * 3) / 2, gh = h - 6;
  const epsMax = Math.max(...st.kayit.map(d => Math.abs(d.v)), 1e-4);
  const fMax = Math.max(...st.akiKayit.map(d => Math.abs(d.v)), 1e-6);
  const isaretli = p.mod > 2.5 && p.mod < 3.5;        // yalnız jeneratörde Φ işaret değiştirir

  D.miniGrafik(ctx, {
    x: pay, y: 3, w: gw, h: gh,
    baslik: 'Φ − t   (bir halkadan geçen akı)', birim: 'Wb',
    veri: st.akiKayit, tMin: st.akiKayit.length ? st.akiKayit[0].t : 0,
    tMax: Math.max(1, st.t),
    vMin: isaretli ? -fMax * 1.15 : 0, vMax: fMax * 1.15,
    renk: R.normal
  });
  D.miniGrafik(ctx, {
    x: pay * 2 + gw, y: 3, w: gw, h: gh,
    baslik: 'ε − t   (Φ grafiğinin EĞİMİYLE orantılı, ters işaretli)', birim: 'V',
    veri: st.kayit, tMin: st.kayit.length ? st.kayit[0].t : 0,
    tMax: Math.max(1, st.t),
    vMin: -epsMax * 1.15, vMax: epsMax * 1.15,
    renk: R.kuvvet
  });
}

/* ----------------------------------------------------------- Okumalar */

function okumalar(st, p) {
  const eps = gerilim(st, p);
  const o = [
    { et: 'Akı  Φ (bir halka)', dg: D.biçim(aki(st, p), 5), birim: 'Wb' },
    { et: 'Gerilim  ε',  dg: D.biçim(eps, 4),                birim: 'V' },
    { et: 'Akım  i',     dg: D.biçim(akim(st, p) * 1000, 2), birim: 'mA' },
    { et: 'Sarım  N',    dg: p.mod > 1.5 && p.mod < 2.5 ? '1' : D.biçim(p.N), birim: '' }
  ];
  if (p.mod < 1.5) o.push({ et: 'Mıknatıs hızı', dg: D.biçim(Math.abs(miknatisHizi(st, p)), 2), birim: 'm/s' });
  if (p.mod > 1.5 && p.mod < 2.5) {
    o.push({ et: 'Karşı kuvvet', dg: D.biçim(karsiKuvvet(st, p), 3), birim: 'N' });
    o.push({ et: 'Hız  ϑ',       dg: D.biçim(p.v * rayYonu(st), 2) + (rayYonu(st) > 0 ? ' →' : ' ←'), birim: 'm/s' });
  }
  if (p.mod > 2.5 && p.mod < 3.5) o.push({ et: 'ε_maks', dg: D.biçim(p.N * p.B * cerceveAlani(p) * p.omega, 3), birim: 'V' });
  if (p.mod > 3.5) o.push({ et: 'Anahtar', dg: anahtarKapali(st.t) ? 'Kapalı' : 'Açık', birim: '' });
  return o;
}

/* ------------------------------------------------------------- Tanım */

D.simler = D.simler || {};
D.simler['induksiyon-gerilimi'] = {
  id: 'induksiyon-gerilimi',
  baslik: '2.3.2 · İndüksiyon gerilimi · Faraday ve Lenz',
  yukseklik: 340,
  grafikPanel: true,
  grafikYukseklik: 170,
  parametreler: [
    { anahtar: 'mod', etiket: 'Düzenek', tur: 'secim', deger: 1, secenekler: [
      { d: 1, e: 'Mıknatıs bobine girip çıkıyor' },
      { d: 2, e: 'Raylı tel (ε = B·L·ϑ)' },
      { d: 3, e: 'Dönen çerçeve (jeneratör)' },
      { d: 4, e: 'Faraday’ın iki bobini (anahtar)' }
    ]},
    { anahtar: 'B',     etiket: 'Manyetik alan B', min: 0.1, max: 2, adim: 0.1, deger: 0.8, birim: 'T' },
    { anahtar: 'N',     etiket: 'Sarım sayısı N', min: 1, max: 200, adim: 1, deger: 50, birim: '' },
    { anahtar: 'v',     etiket: 'Hız ϑ (1–2. düzenek)', min: 0, max: 4, adim: 0.2, deger: 1.5, birim: 'm/s' },
    { anahtar: 'L',     etiket: 'Tel uzunluğu L (2. düzenek)', min: 10, max: 60, adim: 5, deger: 30, birim: 'cm' },
    { anahtar: 'a',     etiket: 'Bobin çapı / çerçeve kenarı', min: 5, max: 40, adim: 5, deger: 20, birim: 'cm' },
    { anahtar: 'omega', etiket: 'Dönme hızı ω (3. düzenek)', min: 0.5, max: 12, adim: 0.5, deger: 4, birim: 'rad/s' },
    { anahtar: 'R',     etiket: 'Devre direnci', min: 0.5, max: 20, adim: 0.5, deger: 2, birim: 'Ω' }
  ],
  durum, adim, bitti, cizGercek, cizKlasik, cizGrafik, okumalar
};

})();
