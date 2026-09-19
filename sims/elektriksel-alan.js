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

/** Levhalar arasındaki zerrenin ivmesi (m/s²). */
function ivmeZerre(p) {
  return (qTestC(p) * alanDuzgun(p)) / kutleKg(p);
}

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
    st.r = D.tarama(st.t, p.r, p.r < 70 ? 120 : 10, 12);
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
  const yariAcik = (p.d / 100) / 2;
  const Lm = p.L / 100;
  if (st.x >= Lm || st.y >= yariAcik) {
    const tCikis = Lm / p.v0;                       // yandan çıkış anı
    const tCarpma = Math.sqrt(2 * yariAcik / a);    // levhaya çarpma anı
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
  const arti = q > 0;
  ctx.save();
  const g = ctx.createRadialGradient(x - r * .3, y - r * .35, r * .2, x, y, r);
  g.addColorStop(0, arti ? '#F3958E' : '#8FB6EC');
  g.addColorStop(1, arti ? '#E2483F' : '#2F6FD0');
  ctx.fillStyle = g;
  ctx.beginPath(); ctx.arc(x, y, r, 0, 6.2832); ctx.fill();
  ctx.strokeStyle = '#FFFFFF'; ctx.lineWidth = 2.4; ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(x - r * .4, y); ctx.lineTo(x + r * .4, y);
  if (arti) { ctx.moveTo(x, y - r * .4); ctx.lineTo(x, y + r * .4); }
  ctx.stroke();
  ctx.restore();
}

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
  D.noktaCisim(ctx, tx, ty, 7, p.qt > 0 ? '#E2483F' : '#2F6FD0');
  D.yaziAydinlik(ctx, 'q₀ = ' + D.biçim(p.qt) + ' nC', tx, ty - 26, R.mur,
                 '600 11px system-ui, sans-serif', 'center');

  /* E ve F okları — aynı noktadan, farklı uzunlukta */
  const disa = (p.q > 0) ? 1 : -1;
  D.vektor(ctx, tx, ty, tx + 56 * disa, ty, R.normal, 'E', { kalinlik: 2.6 });
  const fYon = disa * (p.qt > 0 ? 1 : -1);
  D.vektor(ctx, tx, ty + 16, tx + 44 * fYon, ty + 16, R.kuvvet, 'F', { kalinlik: 2.6 });

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

  alanCizgileri(ctx, ax, cy, p.q, 'rgba(120,150,200,.55)', 14, 18, h * 0.40);
  alanCizgileri(ctx, bx, cy, q2,  'rgba(120,150,200,.55)', 14, 18, h * 0.40);
  yukKuresi(ctx, ax, cy, p.q, 14);
  yukKuresi(ctx, bx, cy, q2, 14);

  D.yaziAydinlik(ctx, p.q > 0 ? '+q' : '−q', ax, cy - 28, R.mur, '700 12px system-ui, sans-serif', 'center');
  D.yaziAydinlik(ctx, q2 > 0 ? '+q' : '−q', bx, cy - 28, R.mur, '700 12px system-ui, sans-serif', 'center');

  /* Orta noktadaki bileşke. Yarı uzaklık, yüklerin GERÇEK ayrıklığından
     hesaplanır; yükler açıldıkça E düşer. */
  const yari = Math.max(0.05, (p.r || 60) / 200);
  const E1 = alanNokta(p, yari), E2 = E1;
  const ortaX = (ax + bx) / 2;
  const net = p.zit ? (E1 + E2) : 0;

  D.noktaCisim(ctx, ortaX, cy, 5, R.ivme);
  if (p.zit) {
    /* Ok boyu gerçek alanla ölçeklenir: yükler uzaklaştıkça kısalır. */
    const okBoy = Math.max(16, Math.min(64, net / 9000));
    D.vektor(ctx, ortaX, cy, ortaX + okBoy, cy, R.normal, 'E_net', { kalinlik: 2.8 });
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

  D.noktaCisim(ctx, px, py, 7, p.qt > 0 ? '#E2483F' : '#2F6FD0');
  D.vektor(ctx, px, py, px, py + 34, R.kuvvet, 'F', { kalinlik: 2.4 });

  D.yaziAydinlik(ctx, 'ϑ₀ = ' + D.biçim(p.v0) + ' m/s', solX - 6, ustY + aralik / 2 - 16,
                 R.hiz, '600 11px system-ui, sans-serif', 'right');
  D.yaziAydinlik(ctx, 'V = ' + D.biçim(p.V) + ' V', w - 10, 18, R.mur,
                 '700 12px system-ui, sans-serif', 'right');
  D.yaziAydinlik(ctx, 'E = V/d = ' + D.biçim(alanDuzgun(p)) + ' N/C', w - 10, 36,
                 R.normal, '700 12px system-ui, sans-serif', 'right');
  D.olcu(ctx, solX + uzun + 14, ustY, solX + uzun + 14, altY,
         'd = ' + D.biçim(p.d) + ' cm', R.mur);

  if (st.cikti)
    D.yaziAydinlik(ctx, st.y >= (p.d / 100) / 2 ? 'zerre levhaya çarptı' : 'zerre levhalardan çıktı',
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
    D.noktaCisim(ctx, cx, cy, 8, p.q > 0 ? '#E2483F' : '#2F6FD0');
    D.noktaCisim(ctx, tx, cy, 6, R.ivme);
    D.yaziHaleli(ctx, 'q', cx, cy + 20, K.beyaz, '600 11px system-ui, sans-serif', 'center');
    D.yaziHaleli(ctx, 'q₀', tx, cy + 20, K.beyaz, '600 11px system-ui, sans-serif', 'center');
    D.olcu(ctx, cx, cy - 30, tx, cy - 30, 'd = ' + D.biçim(r) + ' m', K.metin2);

    const E = alanNokta(p, r), Fq = Math.abs(qTestC(p)) * E;
    const disa = (p.q > 0) ? 1 : -1;
    D.vektor(ctx, tx, cy, tx + 46 * disa, cy, R.normal, 'E', { kalinlik: 2.4 });

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
    D.noktaCisim(ctx, ax, cy, 8, p.q > 0 ? '#E2483F' : '#2F6FD0');
    D.noktaCisim(ctx, bx, cy, 8, q2  > 0 ? '#E2483F' : '#2F6FD0');
    const ortaX = (ax + bx) / 2;
    D.noktaCisim(ctx, ortaX, cy, 5, R.ivme);

    /* Orta noktadaki iki alan vektörü. Boyları GERÇEK alanla ölçeklenir:
       yükler uzaklaştıkça E = kq/(d/2)² küçülür, oklar kısalır. */
    const yariM = Math.max(0.05, (p.r || 60) / 200);          // yarı uzaklık (m)
    const Eorta = alanNokta({ q: p.q }, yariM);
    const okBoy = Math.max(12, Math.min(52, Eorta / 30000));
    D.vektor(ctx, ortaX, cy - 26, ortaX + okBoy, cy - 26, R.normal, 'E₁', { kalinlik: 2.2 });
    D.vektor(ctx, ortaX, cy - 46, ortaX + (p.zit ? okBoy : -okBoy), cy - 46,
             R.konum, 'E₂', { kalinlik: 2.2 });

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
  const ox = 40, oy = 42;
  const boyX = solGen - ox - 20;
  const boyY = h - oy - 46;

  /* eksenler: sağa x, aşağı y (sapma) */
  ctx.strokeStyle = K.eksen; ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(ox, oy); ctx.lineTo(ox, oy + boyY);
  ctx.moveTo(ox, oy); ctx.lineTo(ox + boyX, oy);
  ctx.stroke();
  D.yaziHaleli(ctx, 'x', ox + boyX + 6, oy, K.metin2, '11px system-ui, sans-serif', 'left');
  D.yaziHaleli(ctx, 'y (sapma)', ox - 6, oy + boyY + 14, K.metin2, '11px system-ui, sans-serif', 'left');

  /* parabol */
  const a = ivmeZerre(p);
  const Lm = p.L / 100, ym = (p.d / 100) / 2;
  const sX = boyX / Lm, sY = boyY / Math.max(ym, 1e-6);
  ctx.save();
  ctx.strokeStyle = R.konum; ctx.lineWidth = 2.4; ctx.beginPath();
  for (let i = 0; i <= 60; i++) {
    const x = (i / 60) * Lm;
    const t = x / p.v0;
    const y = 0.5 * a * t * t;
    const X = ox + x * sX, Y = oy + Math.min(y, ym) * sY;
    i ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y);
  }
  ctx.stroke(); ctx.restore();

  /* anlık konum */
  const X = ox + Math.min(st.x, Lm) * sX, Y = oy + Math.min(st.y, ym) * sY;
  D.noktaCisim(ctx, X, Y, 6, R.ivme);
  D.vektor(ctx, X, Y, X + 30, Y, R.hiz, '', { kalinlik: 2 });
  D.vektor(ctx, X, Y, X, Y + 26, R.ivme, '', { kalinlik: 2 });

  /* sağ sütun: yatay atışla eşleştirme */
  const bx = solGen + 14;
  const satir = [
    ['YATAY ATIŞLA AYNI', R.ivme, '700 12px system-ui, sans-serif'],
    ['x = ϑ₀·t', K.beyaz, '12px system-ui, sans-serif'],
    ['y = ½·a·t²', K.beyaz, '12px system-ui, sans-serif'],
    ['fark: g yerine a = qE/m', K.metin2, '11px system-ui, sans-serif'],
    ['', K.metin2, '11px system-ui, sans-serif'],
    ['E = V/d = ' + D.biçim(alanDuzgun(p)) + ' N/C', R.normal, '700 12px system-ui, sans-serif'],
    ['F = q·E = ' + D.biçim(Math.abs(qTestC(p)) * alanDuzgun(p), 5) + ' N', R.kuvvet, '12px system-ui, sans-serif'],
    ['a = F/m = ' + D.biçim(a) + ' m/s²', R.ivme, '700 12px system-ui, sans-serif'],
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
    D.miniGrafik(ctx, {
      x: pay, y: 3, w: gw, h: gh,
      baslik: 'y − x   (parabol · yatay atışın aynısı)', birim: 'cm', tEtiket: 'x (cm)',
      veri: st.iz.map(d => ({ t: d.x * 100, v: d.y * 100 })),
      tMax: p.L, vMin: 0, vMax: Math.max(1, (p.d / 2) * 1.05),
      renk: R.konum
    });
    D.miniGrafik(ctx, {
      x: pay * 2 + gw, y: 3, w: gw, h: gh,
      baslik: 'ϑy − t   (düzgün alan ⟹ sabit ivme ⟹ DOĞRU)', birim: 'm/s',
      veri: st.iz.map(d => ({ t: d.t, v: ivmeZerre(p) * d.t })),
      tMax: Math.max(0.01, st.t), vMin: 0,
      vMax: Math.max(0.01, ivmeZerre(p) * Math.max(0.01, st.t) * 1.15),
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
    baslik: 'F − q₀   (eğim = E · doğru orantı)', birim: 'N', tEtiket: 'q₀ (nC)',
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
      { et: 'İvme  a',       dg: D.biçim(a),                                birim: 'm/s²' },
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
    { anahtar: 'm',  etiket: 'Zerre kütlesi', min: 1, max: 50, adim: 1, deger: 10, birim: 'mg' }
  ],
  durum, adim, bitti, cizGercek, cizKlasik, cizGrafik, okumalar
};

})();
