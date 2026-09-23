(function () {
"use strict";
window.F11 = window.F11 || {};

/* ==========================================================================
   sims/elektriksel-alan.js
   --------------------------------------------------------------------------
   Konu 2.2 · Elektriksel alan

   Matematiksel model:
       E = F / q₀              (tanım — birim yüke düşen kuvvet)
       E = k · |q| / d²        (nokta yükün alanı)
       E = V / d               (paralel levhalar arasında, DÜZGÜN alan)
       F = q · E               (alandaki yüke etkiyen kuvvet)

   ÜÇ DÜZENEK
   ----------
   1) Nokta yük  : Alan çizgileri merkezden dışa (+) ya da içe (−). Test yükü
      gezdirilir; E ve F birlikte okunur. Asıl gösterilen: E yalnızca KAYNAK
      yüke bağlıdır, test yükünü değiştirmek E’yi değiştirmez — yalnızca F’yi.

   2) İki yük    : Süperpozisyon. İki alanın vektörel toplamı çizilir.

   3) Paralel levhalar : Düzgün alan. İçeri yatay giren yüklü zerre PARABOL
      çizer. Bu, 1. ünitedeki yatay atışın birebir aynısıdır — yalnızca g
      yerine a = qE/m vardır. Konunun en değerli bağlantısı budur.
   ========================================================================== */

const D = window.F11;
const { R, K } = D;

const KC = 9e9;

/* ------------------------------------------------------------- Fizik */

function qKaynakC(p) { return p.q * 1e-6; }          // μC → C
function qTestC(p)   { return p.qt * 1e-9; }          // nC → C
function kutleKg(p)  { return p.m * 1e-6; }           // mg → kg

/** Nokta yükün r metre uzaklıktaki alan büyüklüğü (N/C). */
function alanNokta(p, r) {
  const rr = Math.max(r, 0.03);
  return KC * Math.abs(qKaynakC(p)) / (rr * rr);
}

/** Paralel levhalar arasındaki düzgün alan (N/C). */
function alanDuzgun(p) { return p.V / (p.d / 100); }

const G = 9.8;

/** Elektriksel ivme qE/m (m/s²) — işaretli, aşağı (− levhaya doğru) pozitif.
    Üst levha +, alt levha − olduğundan E aşağı yönlüdür: artı zerre aşağı,
    eksi zerre YUKARI itilir. */
function ivmeElektrik(p) {
  return (qTestC(p) * alanDuzgun(p)) / kutleKg(p);
}

/** Zerrenin toplam düşey ivmesi. Yer çekimi seçiliyse g de eklenir. */
function ivmeZerre(p) {
  return ivmeElektrik(p) + (p.yc > 0.5 ? G : 0);
}

/** mg / |qE| — "yer çekimi ihmal" varsayımının ne kadar geçerli olduğu. */
function agirlikOrani(p) {
  const qE = Math.abs(qTestC(p)) * alanDuzgun(p);
  return qE > 0 ? (kutleKg(p) * G) / qE : Infinity;
}

function isaret(q) { return q > 0 ? 1 : q < 0 ? -1 : 0; }
function yukRengi(q) { return q > 0 ? '#E2483F' : q < 0 ? '#2F6FD0' : '#8A949F'; }

/* -------------------------------------------------------------- Durum */

function durum(p) {
  /* st.r: canlı test yükü uzaklığı (1. ve 2. düzenekte taranır) */
  return { t: 0, x: 0, y: 0, vy: 0, cikti: false, iz: [] };
}

/** Taranan test yükü uzaklığıyla güncellenmiş parametreler. */
function etkin(st, p) {
  return Object.assign({}, p, { r: (st && st.r != null) ? st.r : p.r });
}

function adim(st, dt, p) {
  st.t += dt;
  if (p.mod < 2.5) {
    /* Alan haritası duruyordu; artık test yükü kaynaktan uzaklaşıp yaklaşır,
       böylece E'nin uzaklığın karesiyle azalışı canlı görünür. */
    st.r = D.tarama(st.t, p.r, p.r < 55 ? 100 : 10, 12);
    return;
  }

  if (st.cikti) return;

  /* Levhalar arasında: yatayda sabit hız, düşeyde sabit ivme.
     Yatay atışın birebir aynısı — kapalı formül kullanılır ki ekrandaki
     sayılar elle yapılan hesapla birebir tutsun. */
  const a = ivmeZerre(p);
  st.x  = p.v0 * st.t;
  st.vy = a * st.t;
  st.y  = 0.5 * a * st.t * st.t;

  if (st.iz.length === 0 || st.t - st.iz[st.iz.length - 1].t > 0.004)
    st.iz.push({ t: st.t, x: st.x, y: st.y });

  /* Çıkış anı TAM hesaplanır. Sabit adımla ilerleyip "geçti mi" diye bakmak
     bir kare payı taşma bırakır ve ekrandaki sapma levha aralığından büyük
     görünür. Burada hangi sınıra önce varıldığı analitik olarak bulunur. */
  /* Eksi zerre YUKARI sapar (y < 0); çarpma denetimi iki levha için de
     |y| ile yapılır. a = 0 ise zerre düz gider ve yalnızca yandan çıkar. */
  const yariAcik = (p.d / 100) / 2;
  const Lm = p.L / 100;
  if (st.x >= Lm || Math.abs(st.y) >= yariAcik) {
    const tCikis = Lm / p.v0;                                   // yandan çıkış anı
    const tCarpma = a !== 0 ? Math.sqrt(2 * yariAcik / Math.abs(a)) : Infinity;
    const tSon = Math.min(tCikis, tCarpma);
    st.t  = tSon;
    st.x  = p.v0 * tSon;
    st.vy = a * tSon;
    st.y  = 0.5 * a * tSon * tSon;
    st.iz.push({ t: st.t, x: st.x, y: st.y });
    st.cikti = true;
  }
}

function bitti(st, p) { return p.mod > 2.5 && st.cikti; }

/* ---------------------------------------------------- Çizim yardımcıları */

/** Nokta yükten çıkan/giren alan çizgileri. */
function alanCizgileri(ctx, cx, cy, isaret, renk, adet, icR, disR) {
  ctx.save();
  ctx.strokeStyle = renk; ctx.lineWidth = 1.4;
  for (let i = 0; i < adet; i++) {
    const a = (i / adet) * Math.PI * 2;
    const x1 = cx + Math.cos(a) * icR,  y1 = cy + Math.sin(a) * icR;
    const x2 = cx + Math.cos(a) * disR, y2 = cy + Math.sin(a) * disR;
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();

    /* ok ucu — yön yükün işaretine göre */
    const om = icR + (disR - icR) * 0.62;
    const ox = cx + Math.cos(a) * om, oy = cy + Math.sin(a) * om;
    const yön = isaret > 0 ? 1 : -1;
    const ux = Math.cos(a) * yön, uy = Math.sin(a) * yön;
    ctx.beginPath();
    ctx.moveTo(ox + ux * 5, oy + uy * 5);
    ctx.lineTo(ox - uy * 3.4 - ux * 2, oy + ux * 3.4 - uy * 2);
    ctx.lineTo(ox + uy * 3.4 - ux * 2, oy - ux * 3.4 - uy * 2);
    ctx.closePath(); ctx.fillStyle = renk; ctx.fill();
  }
  ctx.restore();
}

function yukKuresi(ctx, x, y, q, r) {
  const arti = q > 0, yuksuz = q === 0;
  ctx.save();
  const g = ctx.createRadialGradient(x - r * .3, y - r * .35, r * .2, x, y, r);
  g.addColorStop(0, yuksuz ? '#C9CFD6' : arti ? '#F3958E' : '#8FB6EC');
  g.addColorStop(1, yukRengi(q));
  ctx.fillStyle = g;
  ctx.beginPath(); ctx.arc(x, y, r, 0, 6.2832); ctx.fill();
  if (!yuksuz) {
    ctx.strokeStyle = '#FFFFFF'; ctx.lineWidth = 2.4; ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(x - r * .4, y); ctx.lineTo(x + r * .4, y);
    if (arti) { ctx.moveTo(x, y - r * .4); ctx.lineTo(x, y + r * .4); }
    ctx.stroke();
  }
  ctx.restore();
}

/**
 * İKİ YÜKÜN GERÇEK ALAN ÇİZGİLERİ
 * Her noktada E = Σ kqᵢ·r̂/r² hesaplanır ve çizgi o yönde küçük adımlarla
 * ilerletilir. Böylece zıt yüklerde çizgiler +’dan çıkıp EĞRİLEREK −’ye
 * girer; aynı yüklerde birbirini iter ve ortada nötr nokta boş kalır.
 * Düz ışınsal çizgiler yalnızca TEK yük için doğrudur.
 */
function alanCizgileriIkili(ctx, yukler, w, h, renk, adet) {
  const alan = (x, y) => {
    let ex = 0, ey = 0;
    for (const y0 of yukler) {
      const dx = x - y0.x, dy = y - y0.y;
      const r2 = dx * dx + dy * dy, r = Math.sqrt(r2);
      if (r < 1e-6) continue;
      ex += y0.q * dx / (r2 * r); ey += y0.q * dy / (r2 * r);
    }
    return [ex, ey];
  };
  ctx.save();
  ctx.strokeStyle = renk; ctx.fillStyle = renk; ctx.lineWidth = 1.4;
  for (const kaynak of yukler) {
    if (kaynak.q === 0) continue;
    const s = kaynak.q > 0 ? 1 : -1;      // −’den çıkan çizgi −E yönünde izlenir
    for (let i = 0; i < adet; i++) {
      const a0 = ((i + 0.5) / adet) * Math.PI * 2;
      let x = kaynak.x + Math.cos(a0) * (kaynak.r + 2);
      let y = kaynak.y + Math.sin(a0) * (kaynak.r + 2);
      const yol = [[x, y]];
      for (let k = 0; k < 520; k++) {
        const [ex, ey] = alan(x, y);
        const e = Math.hypot(ex, ey);
        if (!(e > 1e-12)) break;                          // nötr nokta
        const [fx, fy] = alan(x + s * 1.5 * ex / e, y + s * 1.5 * ey / e);   // RK2
        const f = Math.hypot(fx, fy);
        if (!(f > 1e-12)) break;
        x += s * 3 * fx / f; y += s * 3 * fy / f;
        yol.push([x, y]);
        if (x < -10 || x > w + 10 || y < -10 || y > h + 10) break;
        if (yukler.some(b => b !== kaynak && Math.hypot(x - b.x, y - b.y) < b.r)) break;
      }
      if (yol.length < 3) continue;
      ctx.beginPath();
      yol.forEach(([px, py], j) => j ? ctx.lineTo(px, py) : ctx.moveTo(px, py));
      ctx.stroke();
      /* ok ucu: çizginin başına yakın, daima +E yönünde */
      const j = Math.min(yol.length - 2, 14);
      const [x1, y1] = yol[j], [x2, y2] = yol[j + 1];
      let ux = (x2 - x1) * s, uy = (y2 - y1) * s;
      const u = Math.hypot(ux, uy) || 1; ux /= u; uy /= u;
      ctx.beginPath();
      ctx.moveTo(x1 + ux * 5, y1 + uy * 5);
      ctx.lineTo(x1 - uy * 3.4 - ux * 2, y1 + ux * 3.4 - uy * 2);
      ctx.lineTo(x1 + uy * 3.4 - ux * 2, y1 - ux * 3.4 - uy * 2);
      ctx.closePath(); ctx.fill();
    }
  }
  ctx.restore();
}

/** Tek yükün alan okunun boyu: E ∝ 1/d², ok ∝ 1/d (göz izleyebilsin diye
    karekök ölçek) — uzaklaştıkça KISALIR. */
function alanOkBoyu(r) { return Math.max(12, Math.min(72, 72 * 0.12 / Math.max(r, 0.03))); }

/* --------------------------------------------- Gerçekçi görünüm */

function cizGercek(ctx, w, h, st, pHam) {
  const p = etkin(st, pHam);
  if (p.mod < 1.5)      cizTekYuk(ctx, w, h, st, p);
  else if (p.mod < 2.5) cizIkiYuk(ctx, w, h, st, p);
  else                  cizLevhalar(ctx, w, h, st, p, true);
}

function cizTekYuk(ctx, w, h, st, p) {
  const cx = w * 0.38, cy = h / 2;
  const olcek = (w * 0.5) / 1.0;              // 1 m ekranda w*0.5 piksel

  /* Yüksüz cismin alanı yoktur: çizgi de yok. */
  if (p.q !== 0)
    alanCizgileri(ctx, cx, cy, p.q, 'rgba(120,150,200,.75)', 16, 20, Math.min(w, h) * 0.46);
  yukKuresi(ctx, cx, cy, p.q, 15);
  D.yaziAydinlik(ctx, 'q = ' + D.biçim(p.q) + ' μC', cx, cy - 30, R.mur,
                 '700 12px system-ui, sans-serif', 'center');

  /* test yükü */
  const r = p.r / 100;
  const tx = cx + r * olcek, ty = cy;
  const E = alanNokta(p, r);
  const Fq = Math.abs(qTestC(p)) * E;

  D.olcu(ctx, cx, cy + 46, tx, cy + 46, 'd = ' + D.biçim(p.r) + ' cm', R.mur);
  D.noktaCisim(ctx, tx, ty, 7, yukRengi(p.qt));
  D.yaziAydinlik(ctx, 'q₀ = ' + D.biçim(p.qt) + ' nC', tx, ty - 26, R.mur,
                 '600 11px system-ui, sans-serif', 'center');

  /* E ve F okları. E’nin yönü kaynağın işaretine (+ dışa, − içe), F’nin yönü
     ayrıca test yükünün işaretine bağlıdır. Boylar uzaklıkla kısalır; F oku
     q₀ ile orantılıdır. Kaynak yüksüzse E = 0, test yükü sıfırsa F = 0. */
  const disa = isaret(p.q);
  const boyE = alanOkBoyu(r);
  if (disa !== 0)
    D.vektor(ctx, tx, ty, tx + boyE * disa, ty, R.normal, 'E', { kalinlik: 2.6 });
  const fYon = disa * isaret(p.qt);
  if (fYon !== 0)
    D.vektor(ctx, tx, ty + 16, tx + Math.max(10, boyE * Math.abs(p.qt) / 50) * fYon, ty + 16,
             R.kuvvet, 'F', { kalinlik: 2.6 });

  D.yaziAydinlik(ctx, 'E = ' + D.biçim(E) + ' N/C', w - 10, 18, R.normal,
                 '700 12px system-ui, sans-serif', 'right');
  D.yaziAydinlik(ctx, 'F = ' + D.biçim(Fq, 5) + ' N', w - 10, 36, R.kuvvet,
                 '700 12px system-ui, sans-serif', 'right');
}

function cizIkiYuk(ctx, w, h, st, p) {
  /* Oynat'a basılınca iki yük birbirinden uzaklaşıp yaklaşır; orta noktadaki
     bileşke alanın uzaklıkla nasıl zayıfladığı canlı görünür. */
  const acilma = Math.max(0.3, Math.min(1, (p.r || 60) / 90));
  const cy = h / 2;
  const ax = w * (0.5 - 0.22 * acilma), bx = w * (0.5 + 0.22 * acilma);
  const q2 = p.zit ? -p.q : p.q;

  alanCizgileriIkili(ctx, [{ x: ax, y: cy, q: p.q, r: 14 }, { x: bx, y: cy, q: q2, r: 14 }],
                     w, h, 'rgba(120,150,200,.62)', 14);
  yukKuresi(ctx, ax, cy, p.q, 14);
  yukKuresi(ctx, bx, cy, q2, 14);

  const ad = q => (q > 0 ? '+' : q < 0 ? '−' : '') + D.biçim(Math.abs(q)) + ' μC';
  D.yaziAydinlik(ctx, ad(p.q), ax, cy - 28, R.mur, '700 12px system-ui, sans-serif', 'center');
  D.yaziAydinlik(ctx, ad(q2), bx, cy - 28, R.mur, '700 12px system-ui, sans-serif', 'center');

  /* Orta noktadaki bileşke. Yarı uzaklık, yüklerin GERÇEK ayrıklığından
     hesaplanır; yükler açıldıkça E düşer. */
  const yari = Math.max(0.05, (p.r || 60) / 200);
  const E1 = alanNokta(p, yari), E2 = E1;
  const ortaX = (ax + bx) / 2;
  const net = p.zit ? (E1 + E2) : 0;

  D.noktaCisim(ctx, ortaX, cy, 5, R.ivme);
  if (p.q === 0) {
    D.yaziAydinlik(ctx, 'yükler sıfır: alan yok',
                   w / 2, h - 16, R.mur, '600 11px system-ui, sans-serif', 'center');
  } else if (p.zit) {
    /* Ok boyu gerçek alanla ölçeklenir: yükler uzaklaştıkça kısalır. Yön
       + yükten − yüke doğrudur: soldaki yük + ise sağa, − ise sola. */
    const okBoy = Math.max(16, Math.min(64, net / 9000));
    D.vektor(ctx, ortaX, cy, ortaX + okBoy * isaret(p.q), cy, R.normal, 'E_net', { kalinlik: 2.8 });
    D.yaziAydinlik(ctx, 'zıt yükler: alanlar AYNI yönde ⟹ toplanır',
                   w / 2, h - 16, R.mur, '600 11px system-ui, sans-serif', 'center');
  } else {
    D.yaziAydinlik(ctx, 'aynı yükler: orta noktada alanlar ZIT ⟹ E = 0',
                   w / 2, h - 16, R.mur, '600 11px system-ui, sans-serif', 'center');
  }
  D.yaziAydinlik(ctx, 'orta nokta: E = ' + D.biçim(net) + ' N/C', w - 10, 18,
                 R.normal, '700 12px system-ui, sans-serif', 'right');
}

function cizLevhalar(ctx, w, h, st, p, gercek) {
  const solX = w * 0.16, uzun = w * 0.66;
  const aralik = Math.min(h * 0.54, 170);
  const ustY = h / 2 - aralik / 2, altY = h / 2 + aralik / 2;

  /* levhalar */
  ctx.fillStyle = '#E2483F'; ctx.fillRect(solX, ustY - 9, uzun, 9);
  ctx.fillStyle = '#2F6FD0'; ctx.fillRect(solX, altY, uzun, 9);
  D.yaziAydinlik(ctx, '+', solX - 14, ustY - 4, '#E2483F', '700 16px system-ui, sans-serif', 'center');
  D.yaziAydinlik(ctx, '−', solX - 14, altY + 6, '#2F6FD0', '700 16px system-ui, sans-serif', 'center');

  /* düzgün alan çizgileri: eşit aralıklı ve paralel */
  ctx.save();
  ctx.strokeStyle = 'rgba(120,150,200,.8)'; ctx.lineWidth = 1.3;
  const adet = 9;
  for (let i = 0; i < adet; i++) {
    const x = solX + (i + 0.5) * (uzun / adet);
    ctx.beginPath(); ctx.moveTo(x, ustY); ctx.lineTo(x, altY); ctx.stroke();
    const my = (ustY + altY) / 2;
    ctx.beginPath();
    ctx.moveTo(x, my + 6); ctx.lineTo(x - 4, my - 3); ctx.lineTo(x + 4, my - 3);
    ctx.closePath(); ctx.fillStyle = 'rgba(120,150,200,.9)'; ctx.fill();
  }
  ctx.restore();

  /* zerre — yol ölçeği: L cm yatayda uzun piksele karşılık gelir */
  const olcekX = uzun / (p.L / 100);
  const olcekY = aralik / (p.d / 100);
  const px = solX + st.x * olcekX;
  const py = ustY + (aralik / 2) + st.y * olcekY;

  ctx.save();
  ctx.strokeStyle = R.konum; ctx.lineWidth = 2; ctx.setLineDash([4, 4]);
  ctx.beginPath();
  st.iz.forEach((d, i) => {
    const X = solX + d.x * olcekX, Y = ustY + aralik / 2 + d.y * olcekY;
    i ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y);
  });
  ctx.stroke(); ctx.restore();

  D.noktaCisim(ctx, px, py, 7, yukRengi(p.qt));
  /* Elektriksel kuvvet: artı zerre aşağı (− levhaya), eksi zerre yukarı. */
  if (p.qt !== 0)
    D.vektor(ctx, px, py, px, py + 34 * isaret(p.qt), R.kuvvet, 'qE', { kalinlik: 2.4 });
  if (p.yc > 0.5)
    D.vektor(ctx, px + 14, py, px + 14, py + 22, R.agirlik || R.kuvvet, 'mg', { kalinlik: 2 });

  D.yaziAydinlik(ctx, 'ϑ₀ = ' + D.biçim(p.v0) + ' m/s', solX - 6, ustY + aralik / 2 - 16,
                 R.hiz, '600 11px system-ui, sans-serif', 'right');
  D.yaziAydinlik(ctx, 'V = ' + D.biçim(p.V) + ' V', w - 10, 18, R.mur,
                 '700 12px system-ui, sans-serif', 'right');
  D.yaziAydinlik(ctx, 'E = V/d = ' + D.biçim(alanDuzgun(p)) + ' N/C', w - 10, 36,
                 R.normal, '700 12px system-ui, sans-serif', 'right');
  D.olcu(ctx, solX + uzun + 14, ustY, solX + uzun + 14, altY,
         'd = ' + D.biçim(p.d) + ' cm', R.mur);

  if (st.cikti)
    D.yaziAydinlik(ctx, Math.abs(st.y) >= (p.d / 100) / 2 - 1e-9
                     ? (st.y > 0 ? 'zerre alt (−) levhaya çarptı' : 'zerre üst (+) levhaya çarptı')
                     : 'zerre levhalardan çıktı',
                   w / 2, h - 12, R.mur, '600 11px system-ui, sans-serif', 'center');
}

/* ----------------------------------------- Klasik fizik görünümü */

function cizKlasik(ctx, w, h, st, pHam) {
  const p = etkin(st, pHam);
  D.izgara(ctx, w, h, 26);

  if (p.mod < 1.5) {
    /* --- Nokta yük: E ve F ayrımı --- */
    const cy = h * 0.34, cx = 60;
    ctx.strokeStyle = K.eksen; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(24, cy); ctx.lineTo(w - 16, cy); ctx.stroke();

    const r = p.r / 100;
    const tx = Math.min(w - 90, cx + (w - 150) * (p.r / 100));
    D.noktaCisim(ctx, cx, cy, 8, yukRengi(p.q));
    D.noktaCisim(ctx, tx, cy, 6, R.ivme);
    D.yaziHaleli(ctx, 'q', cx, cy + 20, K.beyaz, '600 11px system-ui, sans-serif', 'center');
    D.yaziHaleli(ctx, 'q₀', tx, cy + 20, K.beyaz, '600 11px system-ui, sans-serif', 'center');
    D.olcu(ctx, cx, cy - 30, tx, cy - 30, 'd = ' + D.biçim(r) + ' m', K.metin2);

    const E = alanNokta(p, r), Fq = Math.abs(qTestC(p)) * E;
    const disa = isaret(p.q);
    if (disa !== 0)
      D.vektor(ctx, tx, cy, tx + alanOkBoyu(r) * 0.8 * disa, cy, R.normal, 'E', { kalinlik: 2.4 });

    const satir = [
      ['E = k·|q| / d²', K.beyaz],
      ['E = 9·10⁹ · ' + D.biçim(Math.abs(p.q)) + '·10⁻⁶ / ' + D.biçim(r * r, 4), K.metin2],
      ['E = ' + D.biçim(E) + ' N/C', R.normal],
      ['F = q₀ · E = ' + D.biçim(Math.abs(p.qt)) + '·10⁻⁹ · ' + D.biçim(E), K.metin2],
      ['F = ' + D.biçim(Fq, 5) + ' N', R.kuvvet]
    ];
    let sy = h - 16 - (satir.length - 1) * 17;
    satir.forEach(([t, c]) => {
      D.yaziHaleli(ctx, t, w - 12, sy, c,
                   (c === K.metin2 ? '' : '700 ') + (c === K.metin2 ? '11px' : '12px') +
                   ' system-ui, sans-serif', 'right');
      sy += 17;
    });

    /* Sağdaki 5 satırlık hesap dökümü h-84 ile h-16 arasını kaplıyor;
       not onun ÜSTÜNDE, eksenin altındaki boş bölgede durur. */
    D.yaziHaleli(ctx, 'E kaynağa aittir — q₀ değişse de', 12, h * 0.60,
                 R.ivme, '600 11px system-ui, sans-serif', 'left');
    D.yaziHaleli(ctx, 'E DEĞİŞMEZ, yalnız F değişir', 12, h * 0.60 + 16,
                 R.ivme, '600 11px system-ui, sans-serif', 'left');

  } else if (p.mod < 2.5) {
    /* --- İki yük: süperpozisyon ---
       Oynat'a basılınca iki yük birbirinden uzaklaşıp yaklaşır; orta noktadaki
       bileşke alanın nasıl zayıflayıp güçlendiği canlı görünür. */
    const acilma = Math.max(0.25, Math.min(1, (p.r || 60) / 90));
    const cy = h * 0.40;
    const ax = w * (0.47 - 0.23 * acilma), bx = w * (0.47 + 0.23 * acilma);
    ctx.strokeStyle = K.eksen; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(24, cy); ctx.lineTo(w - 16, cy); ctx.stroke();

    const q2 = p.zit ? -p.q : p.q;
    D.noktaCisim(ctx, ax, cy, 8, yukRengi(p.q));
    D.noktaCisim(ctx, bx, cy, 8, yukRengi(q2));
    const ortaX = (ax + bx) / 2;
    D.noktaCisim(ctx, ortaX, cy, 5, R.ivme);

    /* Orta noktadaki iki alan vektörü. Boyları GERÇEK alanla ölçeklenir:
       yükler uzaklaştıkça E = kq/(d/2)² küçülür, oklar kısalır.
       Yön: + yükün alanı ondan UZAĞA, − yükün alanı ona DOĞRU bakar.
       Soldaki yükün (q₁) alanı orta noktada +q₁ için sağa; sağdaki yükün
       (q₂) alanı +q₂ için sola bakar. */
    const yariM = Math.max(0.05, (p.r || 60) / 200);          // yarı uzaklık (m)
    const Eorta = alanNokta({ q: p.q }, yariM);
    const okBoy = Math.max(12, Math.min(52, Eorta / 30000));
    if (p.q !== 0) {
      D.vektor(ctx, ortaX, cy - 26, ortaX + okBoy * isaret(p.q), cy - 26, R.normal, 'E₁', { kalinlik: 2.2 });
      D.vektor(ctx, ortaX, cy - 46, ortaX - okBoy * isaret(q2), cy - 46,
               R.konum, 'E₂', { kalinlik: 2.2 });
    }

    /* Yarı uzaklık, yüklerin canlı ayrıklığından gelir. */
    const yari = Math.max(0.05, (p.r || 60) / 200);
    const Etek = KC * Math.abs(qKaynakC(p)) / (yari * yari);
    const satir = p.zit
      ? [['Zıt yükler (dipol)', K.beyaz],
         ['E₁ ve E₂ AYNI yönde', K.metin2],
         ['E_net = E₁ + E₂ = ' + D.biçim(2 * Etek) + ' N/C', R.normal]]
      : [['Aynı yükler', K.beyaz],
         ['E₁ ve E₂ ZIT yönde, eşit büyüklükte', K.metin2],
         ['E_net = 0  (nötr nokta)', R.hiz]];
    /* Sağ sütun, alttaki notun ÜSTÜNDE biter; aksi hâlde ikisi çakışıyordu. */
    let sy = h - 40 - (satir.length - 1) * 18;
    satir.forEach(([t, c]) => {
      D.yaziHaleli(ctx, t, w - 12, sy, c, '700 12px system-ui, sans-serif', 'right'); sy += 18;
    });

    D.yaziHaleli(ctx, 'Süperpozisyon: alanlar VEKTÖREL toplanır',
                 12, h - 16, R.ivme, '600 11px system-ui, sans-serif', 'left');

  } else {
    /* --- Levhalar: yatay atışla birebir aynı --- */
    cizLevhalarKlasik(ctx, w, h, st, p);
  }
}

function cizLevhalarKlasik(ctx, w, h, st, p) {
  const solGen = Math.min(230, w * 0.46);
  const ox = 40, ust = 42;
  const boyX = solGen - ox - 20;
  const boyY = h - ust - 46;
  /* Giriş ekseni iki levhanın ORTASINDADIR: artı zerre aşağı (− levhaya),
     eksi zerre yukarı (+ levhaya) sapar. */
  const oy = ust + boyY / 2;

  /* levhalar (+ üstte, − altta) ve eksenler: sağa x, aşağı y */
  ctx.strokeStyle = '#E2483F'; ctx.lineWidth = 2.4;
  ctx.beginPath(); ctx.moveTo(ox, ust); ctx.lineTo(ox + boyX, ust); ctx.stroke();
  ctx.strokeStyle = '#2F6FD0';
  ctx.beginPath(); ctx.moveTo(ox, ust + boyY); ctx.lineTo(ox + boyX, ust + boyY); ctx.stroke();
  ctx.strokeStyle = K.eksen; ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(ox, ust); ctx.lineTo(ox, ust + boyY);
  ctx.moveTo(ox, oy); ctx.lineTo(ox + boyX, oy);
  ctx.stroke();
  D.yaziHaleli(ctx, 'x', ox + boyX + 6, oy, K.metin2, '11px system-ui, sans-serif', 'left');
  D.yaziHaleli(ctx, 'y (aşağı +)', ox - 6, ust + boyY + 14, K.metin2, '11px system-ui, sans-serif', 'left');

  /* parabol — levhada biter */
  const a = ivmeZerre(p);
  const Lm = p.L / 100, ym = (p.d / 100) / 2;
  const sX = boyX / Lm, sY = (boyY / 2) / Math.max(ym, 1e-6);
  ctx.save();
  ctx.strokeStyle = R.konum; ctx.lineWidth = 2.4; ctx.beginPath();
  for (let i = 0; i <= 60; i++) {
    const x = (i / 60) * Lm;
    const t = x / p.v0;
    const y = 0.5 * a * t * t;
    const X = ox + x * sX, Y = oy + Math.max(-ym, Math.min(y, ym)) * sY;
    i ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y);
    if (Math.abs(y) >= ym) break;
  }
  ctx.stroke(); ctx.restore();

  /* anlık konum: hız yatayda sabit, ivme düşey (yönü a’nın işareti) */
  const X = ox + Math.min(st.x, Lm) * sX, Y = oy + Math.max(-ym, Math.min(st.y, ym)) * sY;
  D.noktaCisim(ctx, X, Y, 6, R.ivme);
  D.vektor(ctx, X, Y, X + 30, Y, R.hiz, '', { kalinlik: 2 });
  if (a !== 0) D.vektor(ctx, X, Y, X, Y + 26 * Math.sign(a), R.ivme, '', { kalinlik: 2 });

  /* sağ sütun: yatay atışla eşleştirme */
  const bx = solGen + 14;
  const oran = agirlikOrani(p);
  const satir = [
    ['YATAY ATIŞLA AYNI', R.ivme, '700 12px system-ui, sans-serif'],
    ['x = ϑ₀·t', K.beyaz, '12px system-ui, sans-serif'],
    ['y = ½·a·t²', K.beyaz, '12px system-ui, sans-serif'],
    [p.yc > 0.5 ? 'a = g + qE/m  (yer çekimi dahil)' : 'fark: g yerine a = qE/m', K.metin2, '11px system-ui, sans-serif'],
    [p.yc > 0.5 ? '' : 'yer çekimi ihmal · mg/qE = ' + (isFinite(oran) ? '%' + D.biçim(oran * 100, 0) : '∞'),
     oran > 0.1 && p.yc < 0.5 ? R.kuvvet : K.metin2, '11px system-ui, sans-serif'],
    ['E = V/d = ' + D.biçim(alanDuzgun(p)) + ' N/C', R.normal, '700 12px system-ui, sans-serif'],
    ['F = q·E = ' + D.biçim(Math.abs(qTestC(p)) * alanDuzgun(p), 5) + ' N', R.kuvvet, '12px system-ui, sans-serif'],
    ['a = ' + D.biçim(a) + ' m/s²' + (a < 0 ? '  (yukarı)' : a > 0 ? '  (aşağı)' : ''), R.ivme, '700 12px system-ui, sans-serif'],
    ['t = ' + D.biçim(st.t, 3) + ' s', K.metin2, '11px system-ui, sans-serif'],
    ['y = ' + D.biçim(st.y * 100) + ' cm', R.konum, '700 12px system-ui, sans-serif']
  ];
  /* Panel köşesindeki HTML etiketiyle çakışmasın diye aşağıdan başlar. */
  let sy = 46;
  satir.forEach(([t, c, f]) => {
    if (t) D.yaziHaleli(ctx, t, bx, sy, c, f, 'left');
    sy += 17;
  });
}

/* ------------------------------------------------------- Grafikler */

function cizGrafik(ctx, w, h, st, pHam) {
  const p = etkin(st, pHam);
  const pay = 8, gw = (w - pay * 3) / 2, gh = h - 6;

  if (p.mod > 2.5) {
    /* Eksi zerre yukarı saptığında y ve ϑy negatiftir; eksen o yöne açılır. */
    const a = ivmeZerre(p);
    const yari = (p.d / 2) * 1.05;
    const tSon = Math.max(0.01, st.t);
    const vUc = Math.max(0.01, Math.abs(a) * tSon * 1.15);
    D.miniGrafik(ctx, {
      x: pay, y: 3, w: gw, h: gh,
      baslik: 'y − x   (parabol · yatay atışın aynısı)', birim: 'cm', tEtiket: 'x (cm)',
      veri: st.iz.map(d => ({ t: d.x * 100, v: d.y * 100 })),
      tMax: p.L, vMin: a < 0 ? -yari : 0, vMax: a < 0 ? 0 : Math.max(1, yari),
      renk: R.konum
    });
    D.miniGrafik(ctx, {
      x: pay * 2 + gw, y: 3, w: gw, h: gh,
      baslik: 'ϑy − t   (düzgün alan ⟹ sabit ivme ⟹ DOĞRU)', birim: 'm/s',
      veri: st.iz.map(d => ({ t: d.t, v: a * d.t })),
      tMax: tSon, vMin: a < 0 ? -vUc : 0, vMax: a < 0 ? 0 : vUc,
      renk: R.hiz
    });
    return;
  }

  /* E − d: ters kare */
  const veri = [];
  /* Değerler 10⁶ mertebesinde; N/C ile eksen etiketi (6000000) sol paya
     sığmıyor. kN/C'ye çevrilerek okunur hâle getirilir. */
  for (let d = 0.05; d <= 1.2; d += 0.02) veri.push({ t: d * 100, v: alanNokta(p, d) / 1000 });
  D.miniGrafik(ctx, {
    x: pay, y: 3, w: gw, h: gh,
    baslik: 'E − d   (ters kare · E kaynağa aittir)', birim: 'kN/C', tEtiket: 'd (cm)',
    imlec: { t: p.r, v: alanNokta(p, p.r / 100) / 1000 },
    veri, tMin: 5, tMax: 120, vMin: 0, vMax: alanNokta(p, 0.08) / 1000,
    renk: R.normal
  });

  /* F − q₀: doğru orantı */
  const v2 = [];
  const E0 = alanNokta(p, p.r / 100);
  for (let q = 0; q <= 50; q += 2) v2.push({ t: q, v: q * 1e-9 * E0 });
  D.miniGrafik(ctx, {
    x: pay * 2 + gw, y: 3, w: gw, h: gh,
    baslik: 'F − |q₀|   (eğim = E · doğru orantı)', birim: 'N', tEtiket: '|q₀| (nC)',
    imlec: { t: Math.abs(p.qt), v: Math.abs(qTestC(p)) * E0 },
    veri: v2, tMax: 50, vMin: 0, vMax: Math.max(1e-9, 50e-9 * E0 * 1.05),
    renk: R.kuvvet
  });
}

/* ----------------------------------------------------------- Okumalar */

function okumalar(st, pHam) {
  const p = etkin(st, pHam);
  if (p.mod > 2.5) {
    const a = ivmeZerre(p);
    return [
      { et: 'Alan  E = V/d', dg: D.biçim(alanDuzgun(p)),                    birim: 'N/C' },
      { et: 'Kuvvet  F',     dg: D.biçim(Math.abs(qTestC(p)) * alanDuzgun(p), 5), birim: 'N' },
      { et: 'İvme  a',       dg: D.biçim(a) + (a < 0 ? ' ↑' : a > 0 ? ' ↓' : ''), birim: 'm/s²' },
      { et: 'Süre  t',       dg: D.biçim(st.t, 3),                          birim: 's' },
      { et: 'Yatay  x',      dg: D.biçim(st.x * 100),                       birim: 'cm' },
      { et: 'Sapma  y',      dg: D.biçim(st.y * 100),                       birim: 'cm' }
    ];
  }
  if (p.mod > 1.5) {
    const yariM = Math.max(0.05, (p.r || 60) / 200);
    const Etek = KC * Math.abs(qKaynakC(p)) / (yariM * yariM);
    return [
      { et: 'Düzenek',       dg: p.zit ? 'Zıt yükler' : 'Aynı yükler', birim: '' },
      { et: 'Yarı uzaklık',  dg: D.biçim(yariM * 100),                 birim: 'cm' },
      { et: 'Tek yükün alanı', dg: D.biçim(Etek),                      birim: 'N/C' },
      { et: 'Orta noktada E', dg: p.zit ? D.biçim(2 * Etek) : '0',     birim: 'N/C' },
      { et: 'Yorum',         dg: p.zit ? 'Toplanır' : 'Götürür',       birim: '' }
    ];
  }
  const E = alanNokta(p, p.r / 100);
  return [
    { et: 'Kaynak yük  q',  dg: D.biçim(p.q),                     birim: 'μC' },
    { et: 'Uzaklık  d',     dg: D.biçim(p.r),                     birim: 'cm' },
    { et: 'Alan  E',        dg: D.biçim(E),                       birim: 'N/C' },
    { et: 'Test yükü  q₀',  dg: D.biçim(p.qt),                    birim: 'nC' },
    { et: 'Kuvvet  F = q₀E', dg: D.biçim(Math.abs(qTestC(p)) * E, 5), birim: 'N' }
  ];
}

/* ------------------------------------------------------------- Tanım */

D.simler = D.simler || {};
D.simler['elektriksel-alan'] = {
  id: 'elektriksel-alan',
  baslik: '2.1.2 · Elektriksel alan · çizgiler, test yükü, düzgün alan',
  yukseklik: 340,
  grafikPanel: true,
  grafikYukseklik: 175,
  parametreler: [
    { anahtar: 'mod', etiket: 'Düzenek', tur: 'secim', deger: 1, secenekler: [
      { d: 1, e: 'Tek nokta yük + test yükü' },
      { d: 2, e: 'İki yük (süperpozisyon)' },
      { d: 3, e: 'Paralel levhalar (düzgün alan)' }
    ]},
    { anahtar: 'q',  etiket: 'Kaynak yük q', min: -10, max: 10, adim: 1, deger: 4, birim: 'μC' },
    { anahtar: 'r',  etiket: 'Test yükü uzaklığı', min: 10, max: 100, adim: 5, deger: 40, birim: 'cm' },
    { anahtar: 'qt', etiket: 'Test/zerre yükü q₀', min: -50, max: 50, adim: 5, deger: 20, birim: 'nC' },
    { anahtar: 'zit', etiket: 'İkinci yük', tur: 'secim', deger: 1, secenekler: [
      { d: 1, e: 'Zıt işaretli (dipol)' },
      { d: 0, e: 'Aynı işaretli' }
    ]},
    { anahtar: 'V',  etiket: 'Levha gerilimi V', min: 500, max: 5000, adim: 250, deger: 2000, birim: 'V' },
    { anahtar: 'd',  etiket: 'Levha aralığı d', min: 5, max: 20, adim: 1, deger: 10, birim: 'cm' },
    { anahtar: 'L',  etiket: 'Levha uzunluğu', min: 10, max: 60, adim: 5, deger: 40, birim: 'cm' },
    { anahtar: 'v0', etiket: 'Giriş hızı ϑ₀', min: 1, max: 20, adim: 1, deger: 6, birim: 'm/s' },
    { anahtar: 'm',  etiket: 'Zerre kütlesi', min: 1, max: 50, adim: 1, deger: 10, birim: 'mg' },
    { anahtar: 'yc', etiket: 'Yer çekimi (levha)', tur: 'secim', deger: 0, secenekler: [
      { d: 0, e: 'İhmal (kitaptaki gibi)' },
      { d: 1, e: 'Hesaba kat (a = g + qE/m)' }
    ]}
  ],
  durum, adim, bitti, cizGercek, cizKlasik, cizGrafik, okumalar
};

})();
