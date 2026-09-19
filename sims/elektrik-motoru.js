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
   çerçeveyi öteleyemez (toplamları sıfır) ama DÖNDÜRÜR.

       F = B·i·L            (her bir yan kenara)
       τ = B·i·A·N·cosθ     (çerçeveye etkiyen döndürme etkisi)

   θ burada çerçeve düzlemi ile alan arasındaki açıdır. Çerçeve alana PARALEL
   iken döndürme etkisi EN BÜYÜK, alana DİK iken SIFIRDIR.

   KOMÜTATÖR — İŞİN PÜF NOKTASI
   ----------------------------
   Çerçeve yarım tur döndüğünde kuvvetler onu geri çevirmeye başlar. Komütatör
   (yarım halkalı toplayıcı) tam o anda akımın yönünü TERS ÇEVİRİR; böylece
   döndürme etkisi hep aynı yönde kalır ve dönme sürer. Komütatör olmadan
   çerçeve yalnızca SALINIR — simülasyonda kapatıp bunu görebilirsin.
   ========================================================================== */

const D = window.F11;
const { R, K } = D;

/* ------------------------------------------------------------- Fizik */

function alanCerceve(p) { return (p.a / 100) * (p.b / 100); }   // m²

/** Anlık döndürme etkisi (N·m). θ: çerçeve düzlemi ile alan arasındaki açı. */
function tork(st, p) {
  return p.B * Math.abs(p.i) * alanCerceve(p) * p.N * Math.cos(st.aci);
}

/**
 * Komütatörün belirlediği akım yönü (+1 / −1).
 *
 * Komütatör, akımı TORKUN İŞARET DEĞİŞTİRDİĞİ anda çevirir. τ ∝ cosθ olduğuna
 * göre bu an θ = 90° ve 270°’dir — yani çerçeve düzleminin alana DİK olduğu,
 * torkun zaten sıfırlandığı an. Tam o anda akım tersine döner ve tork yeniden
 * aynı yönde büyümeye başlar.
 *
 * (Önceki sürümde çevirme 180°’de yapılıyordu; o zaman çerçeve 90°’yi geçince
 * tork ters dönüyor ve motor dönmek yerine 90°’de salınıp duruyordu.)
 */
function akimIsareti(st, p) {
  if (!p.komutator) return 1;
  return Math.cos(st.aci) >= 0 ? 1 : -1;
}

/** Etkin (komütatör uygulanmış) tork. */
function etkinTork(st, p) {
  return tork(st, p) * akimIsareti(st, p);
}

/** Eylemsizlik momenti — ince çerçeve yaklaşımı (kg·m²). */
function eylemsizlik(p) {
  const m = p.m / 1000;
  const yari = (p.a / 100) / 2;
  return m * yari * yari;
}

/* -------------------------------------------------------------- Durum */

function durum(p) {
  return { t: 0, aci: 0, omega: 0, tur: 0, kayit: [] };
}

function adim(st, dt, p) {
  st.t += dt;

  const I = Math.max(1e-6, eylemsizlik(p));
  const acisalIvme = etkinTork(st, p) / I - p.surtunme * st.omega;

  st.omega += acisalIvme * dt;
  st.aci += st.omega * dt;

  if (st.aci >= 2 * Math.PI) { st.aci -= 2 * Math.PI; st.tur++; }
  if (st.aci < 0) { st.aci += 2 * Math.PI; }

  if (st.kayit.length === 0 || st.t - st.kayit[st.kayit.length - 1].t > 0.02)
    st.kayit.push({ t: st.t, v: st.omega });
  if (st.kayit.length > 400) st.kayit.shift();
}

function bitti() { return false; }

/* --------------------------------------------- Gerçekçi görünüm */

function cizGercek(ctx, w, h, st, p) {
  const cx = w * 0.46, cy = h * 0.48;
  const R0 = Math.min(w * 0.22, h * 0.32);

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

  /* dönme ekseni */
  D.kesikliCizgi(ctx, cx, cy - R0 - 24, cx, cy + R0 + 24, 'rgba(120,130,150,.7)', 1.4, [5, 5]);

  /* çerçeve — yandan görünüş: iki kenarın kesiti daire olarak çizilir */
  const ux = Math.cos(st.aci), uy = Math.sin(st.aci);
  const k1x = cx + ux * R0, k1y = cy + uy * R0 * 0.42;
  const k2x = cx - ux * R0, k2y = cy - uy * R0 * 0.42;

  ctx.save();
  ctx.strokeStyle = '#B87333'; ctx.lineWidth = 5;
  ctx.beginPath(); ctx.moveTo(k1x, k1y); ctx.lineTo(k2x, k2y); ctx.stroke();
  ctx.restore();

  const isaret = akimIsareti(st, p) * (p.i >= 0 ? 1 : -1);
  /* iki kenarda akım ZIT yönlüdür */
  (isaret > 0 ? D.alanDisari : D.alanIceri)(ctx, k1x, k1y, 11, '#7A4A10');
  (isaret > 0 ? D.alanIceri : D.alanDisari)(ctx, k2x, k2y, 11, '#7A4A10');

  /* kuvvetler — zıt yönlü, çerçeveyi döndürür */
  const F = p.B * Math.abs(p.i) * (p.b / 100) * p.N;
  const boy = Math.min(52, 16 + F * 26);
  const fy = isaret > 0 ? -1 : 1;
  D.vektor(ctx, k1x, k1y, k1x, k1y + boy * fy, R.kuvvet, '', { kalinlik: 3 });
  D.vektor(ctx, k2x, k2y, k2x, k2y - boy * fy, R.kuvvet, '', { kalinlik: 3 });

  /* komütatör */
  const ky = cy + R0 + 34;
  ctx.fillStyle = p.komutator ? '#C9A24B' : '#5F6B78';
  ctx.beginPath(); ctx.arc(cx, ky, 15, Math.PI, 0); ctx.fill();
  ctx.beginPath(); ctx.arc(cx, ky, 15, 0, Math.PI); ctx.fill();
  ctx.strokeStyle = '#17223A'; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(cx - 15, ky); ctx.lineTo(cx + 15, ky); ctx.stroke();
  D.yaziAydinlik(ctx, p.komutator ? 'komütatör AÇIK' : 'komütatör KAPALI',
                 cx, ky + 28, p.komutator ? '#1A7A55' : '#B03030',
                 '700 11px system-ui, sans-serif', 'center');

  D.yaziAydinlik(ctx, 'ω = ' + D.biçim(st.omega) + ' rad/s', w - 60, 20, R.hiz,
                 '700 12px system-ui, sans-serif', 'right');
  D.yaziAydinlik(ctx, 'tur: ' + st.tur, w - 60, 38, R.mur,
                 '700 12px system-ui, sans-serif', 'right');

  if (!p.komutator)
    D.yaziAydinlik(ctx, 'komütatör yok ⟹ çerçeve dönmez, SALINIR',
                   cx, h - 12, '#B03030', '700 11px system-ui, sans-serif', 'center');
  else if (oluNoktada(st, p))
    D.yaziAydinlik(ctx, 'ÖLÜ NOKTA · tork sıfır — gerçek motorlar bu yüzden çok çerçeveli',
                   cx, h - 12, '#B03030', '700 11px system-ui, sans-serif', 'center');
}

/* ----------------------------------------- Klasik fizik görünümü */

function cizKlasik(ctx, w, h, st, p) {
  D.izgara(ctx, w, h, 26);

  D.yaziHaleli(ctx, 'Döndürme etkisi', 12, 22, K.beyaz,
               '700 12px system-ui, sans-serif', 'left');

  /* üstten görünüş: çerçeve düzlemi ve alan */
  const cx = w * 0.23, cy = h * 0.45, L = 62;
  ctx.strokeStyle = K.eksen; ctx.lineWidth = 1.4;
  ctx.beginPath(); ctx.moveTo(cx - 84, cy); ctx.lineTo(cx + 84, cy); ctx.stroke();
  D.yaziHaleli(ctx, 'B', cx + 90, cy, R.normal, '700 12px system-ui, sans-serif', 'left');

  const ux = Math.cos(st.aci), uy = Math.sin(st.aci);
  ctx.save();
  ctx.strokeStyle = R.ivme; ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(cx - ux * L, cy - uy * L); ctx.lineTo(cx + ux * L, cy + uy * L);
  ctx.stroke(); ctx.restore();
  D.noktaCisim(ctx, cx, cy, 4, K.beyaz);
  D.aciYayi(ctx, cx, cy, 38, 0, st.aci, K.metin2, D.biçim(st.aci * 180 / Math.PI) + '°');

  const T = Math.abs(etkinTork(st, p));
  const enBuyuk = p.B * Math.abs(p.i) * alanCerceve(p) * p.N;

  /* tork göstergesi */
  const gx = cx - 84, gy = cy + 74, gw = 168;
  ctx.fillStyle = K.izgara; ctx.fillRect(gx, gy, gw, 12);
  ctx.fillStyle = R.kuvvet;
  ctx.fillRect(gx, gy, gw * Math.min(1, T / Math.max(1e-9, enBuyuk)), 12);
  D.yaziHaleli(ctx, 'τ / τ_maks', cx, gy + 28, K.metin2,
               '11px system-ui, sans-serif', 'center');

  /* sağ sütun */
  const bx = w * 0.50;
  const satir = [
    ['τ = B·i·A·N·cosθ', K.beyaz, '700 12px system-ui, sans-serif'],
    ['A = ' + D.biçim(alanCerceve(p), 4) + ' m²', K.metin2, '11px system-ui, sans-serif'],
    ['N = ' + D.biçim(p.N) + ' sarım', K.metin2, '11px system-ui, sans-serif'],
    ['cosθ = ' + D.biçim(Math.cos(st.aci), 3), R.ivme, '11px system-ui, sans-serif'],
    ['τ = ' + D.biçim(T, 4) + ' N·m', R.kuvvet, '700 13px system-ui, sans-serif'],
    ['', K.metin2, '11px'],
    ['θ = 0° ⟹ τ EN BÜYÜK', K.metin2, '11px system-ui, sans-serif'],
    ['θ = 90° ⟹ τ = 0', K.metin2, '11px system-ui, sans-serif'],
    ['', K.metin2, '11px'],
    [p.komutator ? 'Komütatör akımı çevirir' : 'Komütatör yok',
     p.komutator ? R.hiz : R.kuvvet, '700 11px system-ui, sans-serif'],
    [p.komutator ? '⟹ sürekli DÖNER' : '⟹ yalnızca SALINIR',
     p.komutator ? R.hiz : R.kuvvet, '700 11px system-ui, sans-serif']
  ];
  let sy = 46;
  satir.forEach(([t, c, f]) => {
    if (t) D.yaziHaleli(ctx, t, bx, sy, c, f, 'left');
    sy += 17;
  });

  D.yaziHaleli(ctx, 'İki kenardaki kuvvetler zıt ⟹ ötelemez, DÖNDÜRÜR',
               12, h - 16, R.ivme, '600 11px system-ui, sans-serif', 'left');
}

/* ------------------------------------------------------- Grafikler */

function cizGrafik(ctx, w, h, st, p) {
  const pay = 8, gw = (w - pay * 3) / 2, gh = h - 6;

  /* τ − θ */
  const v1 = [];
  const enBuyuk = p.B * Math.abs(p.i) * alanCerceve(p) * p.N;
  for (let d = 0; d <= 360; d += 3) {
    const rad = d * Math.PI / 180;
    let t = enBuyuk * Math.cos(rad);
    if (p.komutator) t = Math.abs(t) * (Math.floor(rad / Math.PI) % 2 === 0 ? 1 : 1);
    v1.push({ t: d, v: p.komutator ? Math.abs(enBuyuk * Math.cos(rad)) : enBuyuk * Math.cos(rad) });
  }
  D.miniGrafik(ctx, {
    x: pay, y: 3, w: gw, h: gh,
    baslik: p.komutator ? 'τ − θ  (komütatörle: hep AYNI yönde)'
                        : 'τ − θ  (komütatörsüz: yön DEĞİŞİR)',
    birim: 'N·m', tEtiket: 'θ (°)',
    veri: v1, tMax: 360,
    vMin: p.komutator ? 0 : -enBuyuk * 1.1, vMax: enBuyuk * 1.1,
    renk: R.kuvvet
  });

  D.miniGrafik(ctx, {
    x: pay * 2 + gw, y: 3, w: gw, h: gh,
    baslik: 'ω − t   (açısal hız)', birim: 'rad/s',
    veri: st.kayit, tMin: st.kayit.length ? st.kayit[0].t : 0,
    tMax: Math.max(1, st.t),
    vMin: Math.min(0, ...st.kayit.map(d => d.v)) * 1.1 || -1,
    vMax: Math.max(1, ...st.kayit.map(d => d.v)) * 1.1,
    renk: R.hiz
  });
}

/* ----------------------------------------------------------- Okumalar */

/* Tek çerçeveli motorun ÖLÜ NOKTASI.
   θ = 90° ve 270°’de tork sıfırdır. Motor tam orada duracak kadar yavaşlarsa
   bir daha kalkamaz. Gerçek motorlarda bu yüzden üç ya da daha fazla çerçeve
   kullanılır; biri ölü noktadayken diğerleri tork üretmeye devam eder.
   Bu kusuru gizlemek yerine ekranda göstermek öğretici olduğu için tutuldu. */
function oluNoktada(st, p) {
  return Math.abs(st.omega) < 0.05 && Math.abs(Math.cos(st.aci)) < 0.05;
}

function okumalar(st, p) {
  return [
    { et: 'Açı  θ',        dg: D.biçim(st.aci * 180 / Math.PI),  birim: '°' },
    { et: 'Tork  τ',       dg: D.biçim(Math.abs(etkinTork(st, p)), 4), birim: 'N·m' },
    { et: 'Açısal hız ω',  dg: D.biçim(st.omega),                birim: 'rad/s' },
    { et: 'Devir',         dg: D.biçim(st.omega * 60 / (2 * Math.PI)), birim: 'dev/dk' },
    { et: 'Tam tur',       dg: String(st.tur),                   birim: '' },
    { et: 'Komütatör',     dg: p.komutator ? 'Açık' : 'Kapalı',  birim: '' },
    { et: 'Durum',         dg: oluNoktada(st, p)
        ? (p.komutator ? 'ÖLÜ NOKTADA TAKILDI' : 'Dengede salınıyor')
        : (Math.abs(st.omega) > 0.5 ? 'Dönüyor' : 'Hızlanıyor'), birim: '' }
  ];
}

/* ------------------------------------------------------------- Tanım */

D.simler = D.simler || {};
D.simler['elektrik-motoru'] = {
  id: 'elektrik-motoru',
  baslik: '2.2.6 · Elektrik motoru · dönen çerçeve ve komütatör',
  yukseklik: 350,
  grafikPanel: true,
  grafikYukseklik: 170,
  parametreler: [
    { anahtar: 'komutator', etiket: 'Komütatör', tur: 'secim', deger: 1, secenekler: [
      { d: 1, e: 'Açık — sürekli döner' },
      { d: 0, e: 'Kapalı — yalnızca salınır' }
    ]},
    { anahtar: 'B', etiket: 'Manyetik alan B', min: 0.1, max: 2, adim: 0.1, deger: 0.6, birim: 'T' },
    { anahtar: 'i', etiket: 'Akım i', min: -10, max: 10, adim: 0.5, deger: 3, birim: 'A' },
    { anahtar: 'N', etiket: 'Sarım sayısı N', min: 1, max: 100, adim: 1, deger: 20, birim: '' },
    { anahtar: 'a', etiket: 'Çerçeve eni', min: 2, max: 20, adim: 1, deger: 8, birim: 'cm' },
    { anahtar: 'b', etiket: 'Çerçeve boyu', min: 2, max: 20, adim: 1, deger: 10, birim: 'cm' },
    { anahtar: 'm', etiket: 'Çerçeve kütlesi', min: 5, max: 200, adim: 5, deger: 50, birim: 'g' },
    { anahtar: 'surtunme', etiket: 'Yük / sürtünme', min: 5, max: 200, adim: 5, deger: 60, birim: '' }
  ],
  durum, adim, bitti, cizGercek, cizKlasik, cizGrafik, okumalar
};

})();
