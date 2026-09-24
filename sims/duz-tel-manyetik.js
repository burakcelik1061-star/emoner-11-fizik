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
   Sadeleştirilmiş hâli:
       B = 2·10⁻⁷ · i / d               (i amper, d metre, B tesla)

   YÖN — SAĞ EL KURALI
   -------------------
   Başparmak AKIM yönünü gösterecek şekilde tel kavranır; dört parmağın
   sarılma yönü ALAN çizgilerinin yönüdür. Çizgiler teli çevreleyen İÇ İÇE
   ÇEMBERLERDİR. Çember sıklığı alanla orantılıdır: B ∝ 1/d olduğu için
   çemberler dışarı doğru SEYRELİR (yarıçaplar geometrik dizi).

   İKİ DÜZENEK
   -----------
   1) Tek tel (üstten bakış, tel düşey): Pusula ölçüm noktası tele yaklaşıp
      uzaklaşır. İstenirse Dünya’nın yatay alanı (≈ 25 μT, kuzeye) eklenir:
      pusula iki alanın BİLEŞKESİNİ gösterir — Ørsted deneyi (kitap s.199).
      Walter Fendt’in uygulaması gibi varsayılan olarak Dünya alanı yok sayılır.
   2) İki paralel tel: Hafif alüminyum şeritler asılıdır ve manyetik kuvvetle
      gerçekten salınır. Aynı yönlü akımlar ÇEKER, zıt yönlüler İTER; akımlardan
      biri sıfırsa hiçbir şey olmaz. Yakınsa çeken şeritler birbirine yapışır.
   ========================================================================== */

const D = window.F11;
const { R, K } = D;

const MU0 = 4 * Math.PI * 1e-7;
const B_DUNYA_YATAY = 25e-6;     // T, Türkiye (IGRF 2026, Ankara ≈ 25 μT)

/* Asılı alüminyum şerit */
const SERIT_LAMBDA = 1e-3;       // kg/m — birim uzunluk başına kütle
const SERIT_BOY    = 0.5;        // m — asılma uzunluğu (sarkaç boyu)
const G            = 9.81;
const SONUM_TAU    = 1.2;        // s — hava sürtünmesiyle sönüm
const TEMAS_ARA    = 0.006;      // m — şeritler bu aralıkta değer

/* ------------------------------------------------------------- Fizik */

/** Düz telin d metre uzaklıktaki alanı (T). */
function alanTel(i, d) {
  const dd = Math.max(d, 0.01);
  return (MU0 * Math.abs(i)) / (2 * Math.PI * dd);
}

/** İki tel arasındaki birim uzunluk başına kuvvet (N/m). */
function kuvvetBirim(i1, i2, d) {
  const dd = Math.max(d, 0.002);
  return (MU0 * Math.abs(i1 * i2)) / (2 * Math.PI * dd);
}

/** Aynı yönlü akımlar çeker. Akımlardan biri sıfırsa kuvvet yoktur. */
function tellerCekiyor(p) { return p.i1 * p.i2 > 0; }
function kuvvetYok(p) { return p.i1 * p.i2 === 0; }
function etkilesimMetni(p) { return kuvvetYok(p) ? 'Kuvvet yok' : tellerCekiyor(p) ? 'Çekme' : 'İtme'; }

/** Akım yönü metni: ⊙ dışarı (yukarı), ⊗ içeri (aşağı), 0 akım yok. */
function yonMetni(i) { return i > 0 ? 'Yukarı ⊙' : i < 0 ? 'Aşağı ⊗' : 'Akım yok'; }

function dunyaVar(p) { return p.dunya > 0.5; }

/** Ölçüm noktasında (telin DOĞUSUNDA, d uzakta) alan bileşenleri, μT.
    Ekran: x doğu, y güney (aşağı). ⊙ akımda çizgiler saat yönünün tersine:
    doğudaki noktada alan KUZEYE (−y). Dünya’nın yatay alanı da kuzeye. */
function olcumAlani(p, dCm) {
  const Bt = alanTel(p.i1, dCm / 100) * 1e6;
  const tel = { x: 0, y: p.i1 > 0 ? -Bt : p.i1 < 0 ? Bt : 0 };
  const dun = dunyaVar(p) ? { x: 0, y: -B_DUNYA_YATAY * 1e6 } : { x: 0, y: 0 };
  return { tel, dun, net: { x: tel.x + dun.x, y: tel.y + dun.y }, Bt };
}

/** Herhangi bir noktada (telden dx, dy metre) net yatay alan, μT (ekran ekseni). */
function noktaAlani(p, dx, dy) {
  const r2 = Math.max(1e-6, dx * dx + dy * dy);
  const k = 2e-7 * p.i1 / r2 * 1e6;             // μT·m
  /* ⊙ (i > 0): saat yönünün tersi → ekranda (dy, −dx) yönü */
  let bx = k * dy, by = -k * dx;
  if (dunyaVar(p)) by -= B_DUNYA_YATAY * 1e6;
  return { bx, by };
}

/** Nötr nokta (Dünya alanı varsa): telin alanı Dünya’nınkine eşit ve zıt.
    d₀ = 2·10⁻⁷ · i / B_Dünya; ⊙ akımda telin BATISINDA, ⊗ akımda DOĞUSUNDA. */
function notrUzaklik(p) { return p.i1 === 0 ? null : 2e-7 * Math.abs(p.i1) / B_DUNYA_YATAY; }

/** İki şerit: aralık g iken dışa doğru (itici +) kuvvet, N/m. */
function disaKuvvet(p, g) {
  if (kuvvetYok(p)) return 0;
  const F = kuvvetBirim(p.i1, p.i2, g);
  return tellerCekiyor(p) ? -F : F;
}

/** Denge yer değiştirmesi tahmini (itmede) — ölçek için. */
function itmeDengesi(p, d0) {
  const c = 2e-7 * Math.abs(p.i1 * p.i2) * SERIT_BOY / (SERIT_LAMBDA * G);
  return (-d0 + Math.sqrt(d0 * d0 + 8 * c)) / 4;
}

/* -------------------------------------------------------------- Durum */

/* Tek telde Oynat’a basılınca ölçüm noktası (pusula) elle tele yaklaştırılıp
   uzaklaştırılır; B’nin uzaklıkla TERS (kareyle değil) azaldığı görünür. */
const TARAMA_PERIYOT = 12;      // s

function durum(p) {
  return { t: 0, d: p.d, u: 0, v: 0, temas: false, durdu: false, kayit: [] };
}

function adim(st, dt, p) {
  st.t += dt;
  if (p.mod < 1.5) {
    st.d = D.tarama(st.t, p.d, p.d < 30 ? 60 : 4, TARAMA_PERIYOT);
    return;
  }
  /* İki şerit, eşit ve zıt kuvvetle (Newton III) simetrik salınır.
     u: her şeridin dışa doğru yer değiştirmesi; aralık g = d₀ + 2u.
     λ·u'' = F_dış/L − λ·(g/ℓ)·u − λ·u'/τ   (küçük açılı sarkaç + sönüm) */
  if (st.durdu) return;
  const d0 = p.d / 100;
  const g = d0 + 2 * st.u;
  const a = disaKuvvet(p, g) / SERIT_LAMBDA - (G / SERIT_BOY) * st.u - st.v / SONUM_TAU;
  st.v += a * dt;
  st.u += st.v * dt;
  if (d0 + 2 * st.u <= TEMAS_ARA) {
    st.u = (TEMAS_ARA - d0) / 2; st.v = 0; st.temas = true; st.durdu = true;
  }
  if (st.t > 10 && Math.abs(st.v) < 2e-5) st.durdu = true;
  if (kuvvetYok(p) && st.t > 1.5) st.durdu = true;      // kuvvet yok: hiçbir şey olmaz
  if (st.kayit.length === 0 || st.t - st.kayit[st.kayit.length - 1].t > 0.03)
    st.kayit.push({ t: st.t, v: (d0 + 2 * st.u) * 100 });
  if (st.kayit.length > 600) st.kayit.shift();
}

function bitti(st, p) { return p.mod > 1.5 && st.durdu; }

function etkin(st, p) {
  const d = (p.mod < 1.5 && st && st.d != null) ? st.d : p.d;
  return Object.assign({}, p, { d, d0: p.d });
}

/** İki telde canlı aralık (cm). */
function canliAralik(st, p) { return (p.d / 100 + 2 * ((st && st.u) || 0)) * 100; }

/* ------------------------------------------------- Çizim yardımcıları */

/** Teli çevreleyen alan çemberleri. Sıklık ∝ B ∝ |i|/r olsun diye yarıçaplar
    geometrik dizidir: ardışık iki çember arasındaki "alan akısı" eşittir,
    ln(rₙ₊₁/rₙ) = k/|i|. Akım büyüdükçe çemberler sıklaşır. */
function cemberYaricaplari(i, rMax) {
  if (i === 0) return [];
  const q = Math.exp(4.05 / Math.abs(i));        // i = 10 A → oran 1,5
  const r = [];
  for (let x = 24; x < rMax && r.length < 12; x *= q) r.push(x);
  return r;
}

function alanCemberleri(ctx, cx, cy, yon, renk, yaricaplar) {
  ctx.save();
  ctx.strokeStyle = renk; ctx.lineWidth = 1.4;
  for (const r of yaricaplar) {
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, 6.2832); ctx.stroke();
    for (const a of [-Math.PI / 2, Math.PI / 2]) {
      const x = cx + Math.cos(a) * r, y = cy + Math.sin(a) * r;
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
function telKesiti(ctx, x, y, iAkim, r = 13) {
  ctx.save();
  ctx.fillStyle = '#B87333';
  ctx.beginPath(); ctx.arc(x, y, r, 0, 6.2832); ctx.fill();
  ctx.restore();
  if (iAkim !== 0) (iAkim > 0 ? D.alanDisari : D.alanIceri)(ctx, x, y, r * 0.7, '#3A2A10');
}

/**
 * İKİ TELİN GERÇEK (SÜPERPOZE) ALAN ÇİZGİLERİ
 * Her noktada B = Σ μ₀iₖ/(2πrₖ) · φ̂ₖ hesaplanır; çizgi bu yönde izlenir ve
 * başladığı yere dönünce kapanır.
 */
function ikiTelCizgileri(ctx, teller, w, h, renk) {
  const alan = (x, y) => {
    let bx = 0, by = 0;
    for (const t of teller) {
      const dx = x - t.x, dy = y - t.y, r2 = dx * dx + dy * dy;
      if (r2 < 1) continue;
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
      const [b2x, b2y] = alan(x + 1.5 * b1x / b1, y + 1.5 * b1y / b1);
      const b2 = Math.hypot(b2x, b2y);
      if (!(b2 > 1e-12)) break;
      x += 3 * b2x / b2; y += 3 * b2y / b2;
      yol.push([x, y]);
      if (k > 20 && Math.hypot(x - sx, y - sy) < 4) { yol.push([sx, sy]); break; }
      if (x < -400 || x > w + 400 || y < -400 || y > h + 400) break;
    }
    ctx.beginPath();
    yol.forEach(([px, py], j) => j ? ctx.lineTo(px, py) : ctx.moveTo(px, py));
    ctx.stroke();
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

/** Kuzey oku (üstten bakışta yön rehberi). */
function kuzeyOku(ctx, x, y) {
  D.vektor(ctx, x, y + 14, x, y - 12, R.mur, '', { kalinlik: 1.8, ucBoy: 7 });
  D.yaziAydinlik(ctx, 'K', x, y - 20, R.mur, '700 11px system-ui, sans-serif', 'center');
}

/* Ölçüm noktasındaki B okunun boyu: taramanın EN YAKIN noktasındaki alan
   72 px olacak biçimde SABİT ölçek — ok boyu B ile tam orantılı kalır. */
function okOlcegi(p) {
  const dB = p.d0 != null ? p.d0 : p.d;              // kaydırıcıdaki başlangıç
  const dMin = Math.min(dB, dB < 30 ? 60 : 4);
  const Bmax = alanTel(20, dMin / 100) * 1e6 + (dunyaVar(p) ? 25 : 0);
  return 72 / Math.max(1e-9, Bmax);
}

/* --------------------------------------------- Gerçekçi görünüm */

function cizGercek(ctx, w, h, st, pHam) {
  const p = etkin(st, pHam);
  if (p.mod > 1.5) { cizIkiTel(ctx, w, h, st, p); return; }

  /* SABİT ölçek: 60 cm ekranda w·0,56 px. */
  const cx = w * 0.24, cy = h * 0.50;
  const olcek = (w * 0.56) / 0.60;              // px / m

  const yon = p.i1 > 0 ? -1 : +1;              // ⊙ için saat yönünün TERSİ
  alanCemberleri(ctx, cx, cy, yon, 'rgba(56,150,200,.8)', cemberYaricaplari(p.i1, Math.min(w, h) * 0.62));

  /* Ørsted: telin çevresinde pusula halkası (r = 9 cm). Dünya alanı varsa
     iğneler iki alanın bileşkesini gösterir; akım büyüdükçe çembere dizilir. */
  const rH = 0.09 * olcek;
  for (let k = 1; k < 8; k++) {
    const a = k * Math.PI / 4;
    const dx = Math.cos(a) * 0.09, dy = Math.sin(a) * 0.09;
    const { bx, by } = noktaAlani(p, dx, dy);
    const aci = (Math.hypot(bx, by) < 1e-9) ? -Math.PI / 2 : Math.atan2(by, bx);
    D.pusula(ctx, cx + Math.cos(a) * rH, cy + Math.sin(a) * rH, 10, aci);
  }

  telKesiti(ctx, cx, cy, p.i1);
  D.yaziAydinlik(ctx, 'i = ' + D.biçim(Math.abs(p.i1)) + ' A', cx, cy - rH - 20, R.mur,
                 '700 12px system-ui, sans-serif', 'center');
  D.yaziAydinlik(ctx, p.i1 > 0 ? 'akım YUKARI, bize doğru (⊙)'
                     : p.i1 < 0 ? 'akım AŞAĞI, bizden öteye (⊗)' : 'akım yok → telin alanı yok',
                 cx, cy + rH + 24, R.mur, '600 11px system-ui, sans-serif', 'center');

  /* Nötr nokta: yalnız Dünya alanı hesaba katılınca */
  const d0 = notrUzaklik(p);
  if (dunyaVar(p) && d0 && d0 < 0.6) {
    const nx = cx + (p.i1 > 0 ? -1 : 1) * d0 * olcek;
    if (nx > 6 && nx < w - 6) {
      ctx.save(); ctx.strokeStyle = R.hiz; ctx.lineWidth = 2.2;
      ctx.beginPath(); ctx.arc(nx, cy, 6, 0, 6.2832); ctx.stroke(); ctx.restore();
      D.yaziAydinlik(ctx, 'nötr nokta', nx, cy - 14, '#1A7A55', '700 11px system-ui, sans-serif', 'center');
    }
  }

  /* ölçüm noktası — telin doğusunda, tele gerçekten yaklaşır / uzaklaşır */
  const px = cx + (p.d / 100) * olcek, py = cy;
  const A = olcumAlani(p, p.d);
  D.olcu(ctx, cx, h - 34, px, h - 34, 'd = ' + D.biçim(p.d) + ' cm', R.mur);
  D.kesikliCizgi(ctx, px, py + 18, px, h - 38, 'rgba(90,100,120,.5)', 1, [3, 4]);

  const kap = okOlcegi(p);
  if (A.Bt > 1e-9) D.vektor(ctx, px, py, px, py + A.tel.y * kap, R.normal, 'B_tel', { kalinlik: 2.6 });
  if (dunyaVar(p))
    D.vektor(ctx, px + 22, py, px + 22, py + A.dun.y * kap, R.mur, 'B_D', { kalinlik: 2 });
  const netB = Math.hypot(A.net.x, A.net.y);
  D.pusula(ctx, px, py, 14, netB < 1e-9 ? -Math.PI / 2 : Math.atan2(A.net.y, A.net.x));

  kuzeyOku(ctx, w - 24, 40);
  D.yaziAydinlik(ctx, 'B_tel = ' + D.biçim(A.Bt) + ' μT' + (dunyaVar(p) ? '   ·   B_net = ' + D.biçim(netB) + ' μT' : ''),
                 w - 44, 18, '#1F6FA0', '700 12px system-ui, sans-serif', 'right');
  D.yaziAydinlik(ctx, dunyaVar(p) ? 'pusula: telin + Dünya’nın alanının BİLEŞKESİ (Ørsted)'
                                  : 'çemberler dışa doğru seyrelir: B ∝ 1/d',
                 10, h - 12, R.mur, '600 11px system-ui, sans-serif', 'left');
}

/** İki telde sabit ölçek (px/cm): başlangıç aralığı ve olası itme sığar. */
function ikiTelOlcek(w, p) {
  const d0 = p.d / 100;
  const acilma = kuvvetYok(p) || tellerCekiyor(p) ? 0 : 1.6 * itmeDengesi(p, d0);
  const kapsam = (d0 + 2 * acilma) * 100 + 8;          // cm
  return Math.min(40, (w - 60) / kapsam);
}

function cizIkiTel(ctx, w, h, st, p) {
  const cy = h * 0.46;
  const s = ikiTelOlcek(w, p);
  const gCm = canliAralik(st, p);
  const x1 = w / 2 - gCm / 2 * s, x2 = w / 2 + gCm / 2 * s;
  const rT = Math.max(5, Math.min(12, TEMAS_ARA * 100 / 2 * s));

  ikiTelCizgileri(ctx, [{ x: x1, y: cy, i: p.i1 }, { x: x2, y: cy, i: p.i2 }], w, h, 'rgba(56,150,200,.6)');

  /* başlangıç konumları (kesikli) — şeritlerin ne kadar kaydığı görünsün */
  const b1 = w / 2 - p.d / 2 * s, b2 = w / 2 + p.d / 2 * s;
  [b1, b2].forEach(x => D.kesikliCizgi(ctx, x, cy - 30, x, cy + 30, 'rgba(90,100,120,.55)', 1, [3, 3]));

  telKesiti(ctx, x1, cy, p.i1, rT);
  telKesiti(ctx, x2, cy, p.i2, rT);
  D.yaziAydinlik(ctx, 'i₁ = ' + D.biçim(Math.abs(p.i1)) + ' A', x1, cy - 40, R.mur,
                 '700 12px system-ui, sans-serif', 'center');
  D.yaziAydinlik(ctx, 'i₂ = ' + D.biçim(Math.abs(p.i2)) + ' A', x2, cy - 40, R.mur,
                 '700 12px system-ui, sans-serif', 'center');

  const cek = tellerCekiyor(p), yok = kuvvetYok(p);
  const F = kuvvetBirim(p.i1, p.i2, gCm / 100);
  if (!yok && !st.temas) {
    const yon = cek ? 1 : -1;
    const boy = Math.max(12, Math.min(56, 12 + Math.sqrt(F * 1e6 / 2000) * 44));
    D.vektor(ctx, x1, cy + 34, x1 + boy * yon, cy + 34, R.kuvvet, '', { kalinlik: 3 });
    D.vektor(ctx, x2, cy + 34, x2 - boy * yon, cy + 34, R.kuvvet, '', { kalinlik: 3 });
  }

  D.rozet(ctx, yok ? 'AKIMSIZ TEL VAR · KUVVET YOK' : cek ? 'AYNI YÖN · ÇEKME' : 'ZIT YÖN · İTME', w / 2, 8,
          yok ? 'rgba(110,118,132,.92)' : cek ? 'rgba(47,111,208,.92)' : 'rgba(226,72,63,.92)', '#FFFFFF',
          '700 12px system-ui, sans-serif', true);

  D.olcu(ctx, x1, cy + 70, x2, cy + 70, 'd = ' + D.biçim(gCm, 2) + ' cm', R.mur);
  const kay = (gCm - p.d) / 2 * 10;                    // mm, her şerit
  D.yaziAydinlik(ctx, st.temas ? 'şeritler DEĞDİ' :
                 'her şerit ' + D.biçim(Math.abs(kay), 2) + ' mm ' + (kay < -1e-3 ? 'içe' : kay > 1e-3 ? 'dışa' : '') + ' kaydı',
                 w / 2, cy + 94, R.mur, '700 11px system-ui, sans-serif', 'center');

  D.yaziAydinlik(ctx, 'F/L = ' + D.biçim(F * 1e6) + ' μN/m', w - 10, 18, R.kuvvet,
                 '700 12px system-ui, sans-serif', 'right');
  D.yaziAydinlik(ctx, 'asılı alüminyum şeritler (uçtan görünüş) · 50 cm, 1 g/m', 10, h - 30, R.mur,
                 '600 11px system-ui, sans-serif', 'left');
  D.yaziAydinlik(ctx, 'DİKKAT: yüklerin tersi — aynı yön ÇEKER', 10, h - 12, R.ivme,
                 '700 11px system-ui, sans-serif', 'left');
}

/* ----------------------------------------- Klasik fizik görünümü */

function cizKlasik(ctx, w, h, st, pHam) {
  const p = etkin(st, pHam);
  D.izgara(ctx, w, h, 26);

  if (p.mod > 1.5) { klasikIkiTel(ctx, w, h, st, p); return; }

  const d = p.d / 100;
  const A = olcumAlani(p, p.d);

  D.yaziHaleli(ctx, 'Sağ el kuralı', 12, 22, K.beyaz, '700 12px system-ui, sans-serif', 'left');

  const cx = w * 0.20, cy = h * 0.44;
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

  /* ölçüm noktası: tele uzaklığı d ile orantılı; B oku teğet ve ∝ 1/d
     (sabit ölçek: ok boyu B ile tam orantılı) */
  const mx = cx + 14 + (p.d / 60) * Math.min(96, w * 0.2);
  D.noktaCisim(ctx, mx, cy, 4, K.beyaz);
  const kap = okOlcegi(p) * 0.8;
  if (A.Bt > 1e-9) D.vektor(ctx, mx, cy, mx, cy + A.tel.y * kap, R.normal, 'B', { kalinlik: 2.2 });
  if (dunyaVar(p)) {
    D.vektor(ctx, mx + 18, cy, mx + 18, cy + A.dun.y * kap, K.metin2, 'B_D', { kalinlik: 1.8 });
  }

  const bx = w * 0.46;
  const satir = [
    ['B = μ₀·i / (2π·d)', K.beyaz, '700 12px system-ui, sans-serif'],
    ['μ₀ = 4π·10⁻⁷ T·m/A', K.metin2, '11px system-ui, sans-serif'],
    ['Kısa yol:  B = 2·10⁻⁷ · i / d', R.ivme, '700 12px system-ui, sans-serif'],
    ['= 2·10⁻⁷ · ' + D.biçim(Math.abs(p.i1)) + ' / ' + D.biçim(d, 3), K.metin2, '11px system-ui, sans-serif'],
    ['B = ' + D.biçim(A.Bt) + ' μT', R.normal, '700 13px system-ui, sans-serif'],
    ['B ∝ i   ·   B ∝ 1/d  (ters kare DEĞİL)', K.beyaz, '12px system-ui, sans-serif']
  ];
  if (dunyaVar(p)) {
    const d0 = notrUzaklik(p);
    satir.push(['Dünya (yatay) = 25 μT, kuzeye', K.metin2, '11px system-ui, sans-serif']);
    satir.push(['nötr nokta: d₀ = 2·10⁻⁷·i / 25 μT = ' + (d0 ? D.biçim(d0 * 100, 1) + ' cm' : '—'),
                R.hiz, '700 11px system-ui, sans-serif']);
  }
  let sy = 46;
  satir.forEach(([t, c, f]) => { D.yaziHaleli(ctx, t, bx, sy, c, f, 'left'); sy += 18; });
}

function klasikIkiTel(ctx, w, h, st, p) {
  const cek = tellerCekiyor(p), yok = kuvvetYok(p);
  const gCm = canliAralik(st, p), d = gCm / 100;
  const cy = h * 0.34;
  const x1 = w * 0.08, x2 = x1 + 20 + Math.min(1, gCm / 60) * w * 0.40;

  D.yaziHaleli(ctx, 'İki paralel tel', 12, 22, K.beyaz, '700 12px system-ui, sans-serif', 'left');

  const telIsareti = (x, i) => i !== 0 ? (i > 0 ? D.alanDisari : D.alanIceri)(ctx, x, cy, 10, R.ivme)
                                      : D.noktaCisim(ctx, x, cy, 6, K.metin2);
  telIsareti(x1, p.i1);
  telIsareti(x2, p.i2);
  D.yaziHaleli(ctx, 'i₁', x1, cy + 26, K.beyaz, '600 11px system-ui, sans-serif', 'center');
  D.yaziHaleli(ctx, 'i₂', x2, cy + 26, K.beyaz, '600 11px system-ui, sans-serif', 'center');
  D.olcu(ctx, x1, cy - 34, x2, cy - 34, 'd = ' + D.biçim(d, 4) + ' m', K.metin2);

  const F = kuvvetBirim(p.i1, p.i2, d);
  if (!yok) {
    const yon = cek ? 1 : -1;
    const boy = Math.max(10, Math.min(40, 10 + Math.sqrt(F * 1e6 / 2000) * 30));
    D.vektor(ctx, x1, cy + 48, x1 + boy * yon, cy + 48, R.kuvvet, 'F₁', { kalinlik: 2.4 });
    D.vektor(ctx, x2, cy + 48, x2 - boy * yon, cy + 48, R.kuvvet, 'F₂', { kalinlik: 2.4 });
  }
  const satir = [
    ['F/L = μ₀·i₁·i₂ / (2π·d)', K.beyaz],
    ['= 2·10⁻⁷ · ' + D.biçim(Math.abs(p.i1)) + '·' + D.biçim(Math.abs(p.i2)) + ' / ' + D.biçim(d, 4), K.metin2],
    ['F/L = ' + D.biçim(F * 1e6) + ' μN/m', R.kuvvet],
    [yok ? 'Akımlardan biri 0 ⟹ kuvvet yok' : cek ? 'Aynı yön ⟹ ÇEKME' : 'Zıt yön ⟹ İTME',
     yok ? K.metin2 : cek ? R.normal : R.kuvvet],
    ['Şerit: kuvvet ↔ ağırlığın geri çağırması', K.metin2],
    ['denge: λ·g·x/ℓ = F/L', K.metin2]
  ];
  let sy = 26;
  satir.forEach(([t, c]) => {
    D.yaziHaleli(ctx, t, w - 12, sy, c, '700 12px system-ui, sans-serif', 'right');
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
    const gCm = canliAralik(st, p);
    const f1 = [];
    for (let dd = 1; dd <= 60; dd += 0.5) f1.push({ t: dd, v: kuvvetBirim(p.i1, p.i2, dd / 100) * 1e6 });
    D.miniGrafik(ctx, {
      x: pay, y: 3, w: gw, h: gh,
      baslik: 'F/L − d   (ters orantı)', birim: 'μN/m', tEtiket: 'd (cm)',
      imlec: { t: Math.max(1, gCm), v: kuvvetBirim(p.i1, p.i2, Math.max(0.01, gCm / 100)) * 1e6 },
      veri: f1, tMin: 1, tMax: 60, vMin: 0, vMax: Math.max(1e-3, kuvvetBirim(p.i1, p.i2, 0.01) * 1e6),
      renk: R.kuvvet
    });
    const vs = st.kayit.map(q => q.v);
    D.miniGrafik(ctx, {
      x: pay * 2 + gw, y: 3, w: gw, h: gh,
      baslik: 'Şeritler arası aralık − t', birim: 'cm',
      /* dar aralığa yakınlaştırılmış: milimetrelik salınım görünsün */
      veri: st.kayit, tMax: Math.max(4, st.t), sifirdanBasla: false,
      vMin: Math.max(0, Math.min(p.d, ...vs) - 0.3), vMax: Math.max(p.d, ...vs) + 0.3, renk: R.konum
    });
    return;
  }

  const v1 = [];
  for (let dd = 2; dd <= 60; dd += 1) v1.push({ t: dd, v: alanTel(p.i1, dd / 100) * 1e6 });
  D.miniGrafik(ctx, {
    x: pay, y: 3, w: gw, h: gh,
    baslik: 'B_tel − d   (ters ORANTI: d 2 katına → B yarıya)', birim: 'μT', tEtiket: 'd (cm)',
    imlec: { t: p.d, v: alanTel(p.i1, p.d / 100) * 1e6 },
    veri: v1, tMax: 60, vMin: 0, vMax: Math.max(1e-3, alanTel(p.i1, 0.02) * 1e6),
    renk: R.normal
  });

  const v2 = [];
  for (let ii = 0; ii <= 20; ii += 1) v2.push({ t: ii, v: alanTel(ii, p.d / 100) * 1e6 });
  D.miniGrafik(ctx, {
    x: pay * 2 + gw, y: 3, w: gw, h: gh,
    baslik: 'B_tel − |i|   (doğru orantı · eğim = μ₀/2πd)', birim: 'μT', tEtiket: '|i| (A)',
    imlec: { t: Math.abs(p.i1), v: alanTel(p.i1, p.d / 100) * 1e6 },
    veri: v2, tMax: 20, vMin: 0, vMax: Math.max(1e-3, alanTel(20, p.d / 100) * 1e6 * 1.05),
    renk: R.ivme
  });
}

/* ----------------------------------------------------------- Okumalar */

function okumalar(st, pHam) {
  const p = etkin(st, pHam);
  if (p.mod > 1.5) {
    const gCm = canliAralik(st, p);
    return [
      { et: 'Akım  i₁',     dg: D.biçim(p.i1),                      birim: 'A' },
      { et: 'Akım  i₂',     dg: D.biçim(p.i2),                      birim: 'A' },
      { et: 'Aralık (canlı)', dg: D.biçim(gCm, 2),                  birim: 'cm' },
      { et: 'F / L',        dg: D.biçim(kuvvetBirim(p.i1, p.i2, gCm / 100) * 1e6), birim: 'μN/m' },
      { et: 'Etkileşim',    dg: etkilesimMetni(p),                   birim: '' },
      { et: 'Durum',        dg: st.temas ? 'Şeritler değdi' : st.durdu ? 'Dengede' : st.t > 0 ? 'Salınıyor' : 'Hazır', birim: '' }
    ];
  }
  const A = olcumAlani(p, p.d);
  const net = Math.hypot(A.net.x, A.net.y);
  const liste = [
    { et: 'Akım  i',     dg: D.biçim(Math.abs(p.i1)),        birim: 'A' },
    { et: 'Yön',         dg: yonMetni(p.i1),                 birim: '' },
    { et: 'Uzaklık  d',  dg: D.biçim(p.d),                   birim: 'cm' },
    { et: 'Telin alanı B', dg: D.biçim(A.Bt),                birim: 'μT' }
  ];
  if (dunyaVar(p)) {
    const d0 = notrUzaklik(p);
    liste.push({ et: 'Pusuladaki net B', dg: D.biçim(net), birim: 'μT' });
    liste.push({ et: 'Nötr nokta', dg: d0 ? D.biçim(d0 * 100, 1) + ' cm ' + (p.i1 > 0 ? 'batıda' : 'doğuda') : 'yok', birim: '' });
  } else {
    liste.push({ et: 'Çizgi biçimi', dg: 'İç içe çember', birim: '' });
  }
  return liste;
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
      { d: 1, e: 'Tek tel (üstten bakış)' },
      { d: 2, e: 'İki paralel tel (asılı şeritler)' }
    ]},
    { anahtar: 'dunya', etiket: 'Dünya’nın alanı (1. düzenek)', tur: 'secim', deger: 0, secenekler: [
      { d: 0, e: 'Yok say (yalnız telin alanı)' },
      { d: 1, e: 'Hesaba kat (Ørsted deneyi)' }
    ]},
    { anahtar: 'i1', etiket: 'Akım i₁', min: -20, max: 20, adim: 1, deger: 10, birim: 'A' },
    { anahtar: 'i2', etiket: 'Akım i₂ (2. düzenek)', min: -20, max: 20, adim: 1, deger: 10, birim: 'A' },
    { anahtar: 'd',  etiket: 'Uzaklık d', min: 2, max: 60, adim: 1, deger: 20, birim: 'cm' }
  ],
  durum, adim, bitti, cizGercek, cizKlasik, cizGrafik, okumalar
};

})();
