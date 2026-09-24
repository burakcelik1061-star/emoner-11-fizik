(function () {
"use strict";
window.F11 = window.F11 || {};

/* ==========================================================================
   sims/limit-hiz.js
   --------------------------------------------------------------------------
   Konu 1.5 · Limit hız   (MEB 11, s. 86-94)

   Kitabın anlatısı (s.90):
     Atlayışın başında hız sıfır ⟹ hava direnci de sıfır ⟹ ivme = g
     Hız arttıkça direnç kuvveti büyür ⟹ net kuvvet ve ivme küçülür
     Direnç ağırlığa eşitlenince net kuvvet sıfır ⟹ ivme sıfır
     Cisim bundan sonra SABİT HIZLA düşer. Bu hıza LİMİT HIZ denir.

   Direnç kuvveti (kitap Tablo 1.2) sürtünme katsayısı k, kesit alanı A ve
   hız büyüklüğüne bağlıdır. Burada k ve A tek bir sürüklenme katsayısında
   (D) birleştirilmiştir:
       F_d = D · ϑ²
       Limit hızda:  D·ϑ_L² = m·g  ⟹  ϑ_L = √(m·g / D)

   NEDEN SAYISAL İNTEGRASYON?
   --------------------------
   Diğer simülasyonlarda kapalı form kullanıldı çünkü tahtadaki formülle
   birebir aynı sayı gerekiyordu. Burada durum farklı: müfredat limit hızın
   SAYISAL çözümünü istemiyor, ϑ_L formülünü ve niteliksel davranışı istiyor.
   ϑ_L ekranda kapalı formülle TAM olarak hesaplanır; gidişat ise adım adım
   entegre edilir.
   ========================================================================== */

const D = window.F11;
const { R, K } = D;

const G_SABIT = 10;
const KAYIT = 0.05;

/* Sürüklenme katsayıları: k·A birleşik değeri.
   Değerler gerçek paraşütçü limit hızlarını verecek şekilde seçildi. */
const DURUS = {
  1: { ad: 'Yatay yayılmış', Dk: 0.26 },   /* ~55 m/s (~198 km/h) — ölçülmüş  */
  2: { ad: 'Dik dalış',      Dk: 0.14 }    /* ~76 m/s (~272 km/h) — freefly   */
};
const D_PARASUT = 26;                       /* ~5,5 m/s (güvenli iniş)        */

function durus(p) { return DURUS[Math.round(p.durus)] || DURUS[1]; }

/* Paraşüt bir anda değil, gölgelik havayla dolarken açılır (gerçekte
   2–3 s). Katsayı birden 100 katına çıkarılırsa yaklaşık 100 g’lik — gerçekte
   ölümcül — bir yavaşlama hesaplanıyordu. Kademeli dolumla tepe yavaşlama
   gerçek spor paraşütlerindeki 3–6 g aralığına düşer. */
const DOLMA_SURESI = 2.5;   // s

/** O anki sürüklenme katsayısı — paraşüt dolarken kademeli büyür. */
function suruklenme(st, p) {
  const Dk = durus(p).Dk;
  if (!st.parasutAcik) return Dk;
  const u = Math.min(1, (st.t - st.acilmaAni) / DOLMA_SURESI);
  return Dk + (D_PARASUT - Dk) * u * u * u;
}

/** Limit hız: direnç ağırlığa eşitlendiği andaki hız. Kapalı formülle, tam. */
function limitHiz(Dk, p) { return Math.sqrt(p.m * G_SABIT / Dk); }

/* -------------------------------------------------------------- Durum */

function durum(p) {
  return {
    t: 0,
    y: p.h0,            // yerden yükseklik (m)
    v: 0,               // düşme hızı (m/s, aşağı pozitif)
    parasutAcik: false,
    acilmaAni: null,
    indi: false,
    kayit: [{ t: 0, v: 0, a: G_SABIT, Fd: 0 }],
    sonKayit: 0
  };
}

function adim(st, dt, p) {
  if (st.indi) return;
  st.t += dt;

  if (!st.parasutAcik && st.y <= p.acilis) {
    st.parasutAcik = true;
    st.acilmaAni = st.t;
  }

  const Dk = suruklenme(st, p);
  const a = G_SABIT - (Dk / p.m) * st.v * st.v;
  st.v += a * dt;
  if (st.v < 0) st.v = 0;
  st.y -= st.v * dt;

  if (st.y <= 0) { st.y = 0; st.indi = true; }

  if (st.t - st.sonKayit >= KAYIT && st.kayit.length < 4000) {
    st.sonKayit += KAYIT;
    st.kayit.push({ t: st.t, v: st.v, a, Fd: Dk * st.v * st.v });
  }
}

function bitti(st) { return st.indi; }

/* ------------------------------------------------- Gerçekçi görünüm */

function cizGercek(ctx, w, h, st, p) {
  const ufuk = h - 26;
  const ust = 26;
  const px = w * 0.40;

  /* Gökyüzü: yükseklikle koyulaşır — irtifa hissi verir */
  const oran = Math.min(1, st.y / Math.max(p.h0, 1));
  const gokKoyu = Math.round(214 - 110 * oran);
  ctx.fillStyle = `rgb(${Math.round(gokKoyu * 0.72)},${Math.round(gokKoyu * 0.86)},${Math.min(255, gokKoyu + 30)})`;
  ctx.fillRect(0, 0, w, ufuk);

  /* Kayan bulutlar — düşüş hissini verir */
  const kay = (st.y * 0.6) % 160;
  for (let i = -1; i < 4; i++) D.bulut(ctx, 30 + i * 130, ust + 20 + ((i * 70 + kay) % (ufuk - 60)), 0.5);

  /* zemin */
  D.cimZemin(ctx, w, h, ufuk);

  /* --- paraşütçü, ekranın ortasında sabit; manzara akıyor --- */
  const py = ufuk - 118;
  if (st.parasutAcik) {
    ctx.fillStyle = '#E24B4A';
    ctx.beginPath();
    ctx.ellipse(px, py - 46, 42, 24, 0, Math.PI, 0);
    ctx.fill();
    ctx.strokeStyle = '#8A6A3A'; ctx.lineWidth = 1.2;
    [-34, -12, 12, 34].forEach(dx => {
      ctx.beginPath(); ctx.moveTo(px + dx, py - 46); ctx.lineTo(px, py - 12); ctx.stroke();
    });
  }
  D.insan(ctx, px, py + 14, 1.15, '#3C3489', st.parasutAcik ? -1.2 : -0.1);

  /* --- kuvvet okları: ağırlık sabit, direnç büyüyor --- */
  const G = p.m * G_SABIT;
  const Fd = suruklenme(st, p) * st.v * st.v;
  const ol = 62 / Math.max(G, 1);
  D.vektor(ctx, px + 70, py, px + 70, py + G * ol, R.agirlik,
           'G = ' + D.biçim(G) + ' N', { kalinlik: 2.6 });
  if (Fd > 1)
    D.vektor(ctx, px - 70, py, px - 70, py - Math.min(Fd, G * 1.6) * ol, R.normal,
             'F_d = ' + D.biçim(Fd) + ' N', { kalinlik: 2.6 });

  /* --- irtifa cetveli --- */
  const rx = w - 30;
  ctx.strokeStyle = '#2C3850'; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(rx, ust); ctx.lineTo(rx, ufuk); ctx.stroke();
  const yy = ufuk - (st.y / Math.max(p.h0, 1)) * (ufuk - ust);
  ctx.fillStyle = '#E24B4A';
  ctx.beginPath();
  ctx.moveTo(rx, yy); ctx.lineTo(rx + 9, yy - 5); ctx.lineTo(rx + 9, yy + 5);
  ctx.closePath(); ctx.fill();
  D.yaziAydinlik(ctx, D.biçim(st.y) + ' m', rx - 6, yy, '#2C3850',
                 '700 11px system-ui, sans-serif', 'right');
  /* paraşüt açılma seviyesi */
  const ay = ufuk - (p.acilis / Math.max(p.h0, 1)) * (ufuk - ust);
  D.kesikliCizgi(ctx, 10, ay, rx, ay, 'rgba(226,75,74,.6)', 1.4, [5, 4]);
  D.yaziAydinlik(ctx, 'paraşüt: ' + D.biçim(p.acilis) + ' m', 14, ay - 10, '#8A2B2B',
                 '600 10px system-ui, sans-serif', 'left');

  /* --- durum rozeti --- */
  const vL = limitHiz(suruklenme(st, p), p);
  const yakin = Math.abs(st.v - vL) < vL * 0.02;
  const msj = st.parasutAcik
    ? (yakin ? 'Paraşüt açık · limit hızda' : 'Paraşüt açıldı · yavaşlıyor')
    : (yakin ? 'LİMİT HIZ · a = 0 · sabit hız' : 'Hızlanıyor · a küçülüyor');
  ctx.save(); ctx.font = '600 12px system-ui, sans-serif';
  const g = ctx.measureText(msj).width + 22; ctx.restore();
  D.rozet(ctx, msj, Math.max(8, w - g - 44), 9,
          yakin ? 'rgba(53,192,138,.95)' : 'rgba(255,255,255,.92)',
          yakin ? '#04251A' : '#2C3850');
}

/* --------------------------------------------- Klasik fizik görünümü */

function cizKlasik(ctx, w, h, st, p) {
  D.izgara(ctx, w, h, 28);

  /* --- SOL: irtifa ekseni ve zemin -----------------------------------
     Panel önceden yalnızca serbest cisim diyagramıydı; paraşütçünün hangi
     yükseklikte olduğu görünmüyordu. Artık gerçek bir y ekseni var. */
  const eUst = 28, eAlt = h - 30, eOx = 34;
  const eOlcek = (eAlt - eUst) / Math.max(p.h0, 1);
  const EY = m => eAlt - m * eOlcek;
  D.eksen(ctx, {
    ox: eOx, oy: eAlt, xUzun: 0, yUzun: eAlt - eUst,
    xEtiket: '', yEtiket: 'y', birimY: 'm', olcek: eOlcek, yYukari: true
  });
  D.taramaliZemin(ctx, eOx - 10, eOx + 58, eAlt, K.eksen);
  /* paraşüt açılma seviyesi */
  D.kesikliCizgi(ctx, eOx, EY(p.acilis), eOx + 58, EY(p.acilis),
                 'rgba(226,75,74,.6)', 1.4, [4, 4]);
  D.yaziHaleli(ctx, 'paraşüt', eOx + 62, EY(p.acilis), R.kuvvet,
               '600 10px system-ui, sans-serif', 'left');
  /* paraşütçünün o anki yeri */
  D.noktaCisim(ctx, eOx + 28, EY(st.y), 7, st.parasutAcik ? R.kuvvet : R.konum);
  D.yaziHaleli(ctx, D.biçim(st.y) + ' m', eOx + 62, EY(st.y), K.beyaz,
               '600 11px system-ui, sans-serif', 'left');

  const cx = w * 0.46, cy = h * 0.42;
  const G = p.m * G_SABIT;
  const Dk = suruklenme(st, p);
  const Fd = Dk * st.v * st.v;
  const net = G - Fd;
  const a = net / p.m;

  D.yaziHaleli(ctx, 'serbest cisim diyagramı', 12, 16, K.metin2,
               '600 11px system-ui, sans-serif', 'left');

  ctx.fillStyle = '#2E3D57';
  D.yuvarlakDik(ctx, cx - 22, cy - 26, 44, 52, 6); ctx.fill();
  ctx.strokeStyle = K.eksen; ctx.lineWidth = 1.5; ctx.stroke();

  const ol = 64 / Math.max(G, 1);
  D.vektor(ctx, cx, cy + 26, cx, cy + 26 + G * ol, R.agirlik, 'G', { kalinlik: 2.6 });
  if (Fd > 1)
    D.vektor(ctx, cx, cy - 26, cx, cy - 26 - Math.min(Fd, G * 1.5) * ol, R.normal,
             'F_d', { kalinlik: 2.6 });

  /* bileşke */
  const by = cy + 110;
  D.kesikliCizgi(ctx, 20, by, w - 20, by, 'rgba(74,95,134,.5)', 1, [3, 5]);
  if (Math.abs(net) > G * 0.01) {
    D.vektor(ctx, cx, by, cx, by + net * ol, R.ivme,
             'F_net = ' + D.biçim(net) + ' N', { kalinlik: 3 });
  } else {
    D.noktaCisim(ctx, cx, by, 5, K.metin2);
    D.yaziHaleli(ctx, 'F_net = 0 ⟹ a = 0', cx + 16, by, R.hiz,
                 '700 12px system-ui, sans-serif', 'left');
  }

  /* sayısal özet */
  const vL = limitHiz(Dk, p);
  const satirlar = [
    'F_d = D · ϑ² = ' + D.biçim(Dk) + ' · ' + D.biçim(st.v) + '² = ' + D.biçim(Fd) + ' N',
    'F_net = G − F_d = ' + D.biçim(net) + ' N',
    'a = F_net / m = ' + D.biçim(a) + ' m/s²',
    'ϑ_L = √(m·g / D) = ' + D.biçim(vL) + ' m/s'
  ];
  let sy = h - 28 - (satirlar.length - 1) * 17;
  satirlar.forEach((t, i) => {
    D.yaziHaleli(ctx, t, w - 12, sy, i === 3 ? R.hiz : K.beyaz,
                 (i === 3 ? '700 ' : '') + '11px system-ui, sans-serif', 'right');
    sy += 17;
  });
  D.yaziHaleli(ctx, st.parasutAcik ? 'paraşüt açık · D büyük' : 'serbest düşüş · D küçük',
               w - 12, h - 8, K.metin2, '10px system-ui, sans-serif', 'right');
}

/* ------------------------------------------------------------ Grafik */

function cizGrafik(ctx, w, h, st, p) {
  const pay = 8;
  const gw = (w - pay * 4) / 3;
  const gh = h - 6;
  const T = Math.max(st.t, 2);
  const vSerbest = limitHiz(durus(p).Dk, p);

  /* ϑ − t: konunun yıldız grafiği. Eğri limit hıza YATAY ASİMPTOT yapar. */
  D.miniGrafik(ctx, {
    x: pay, y: 3, w: gw, h: gh,
    baslik: 'ϑ − t   (limit hıza yaklaşır)', birim: 'm/s',
    veri: st.kayit.map(d => ({ t: d.t, v: d.v })),
    tMax: T, vMin: 0, vMax: vSerbest * 1.2,
    renk: R.hiz, dolgu: true
  });

  D.miniGrafik(ctx, {
    x: pay * 2 + gw, y: 3, w: gw, h: gh,
    baslik: 'a − t   (sıfıra iner)', birim: 'm/s²',
    veri: st.kayit.map(d => ({ t: d.t, v: d.a })),
    /* paraşüt dolarken yavaşlama ~4 g’ye çıkar; eksen onu kesmesin */
    tMax: T, vMin: -G_SABIT * 5, vMax: G_SABIT * 1.2,
    renk: R.ivme
  });

  D.miniGrafik(ctx, {
    x: pay * 3 + gw * 2, y: 3, w: gw, h: gh,
    baslik: 'F_d − t   (G’ye yaklaşır)', birim: 'N',
    veri: st.kayit.map(d => ({ t: d.t, v: d.Fd })),
    tMax: T, vMin: 0, vMax: p.m * G_SABIT * 1.4,
    renk: R.normal
  });
}

/* ----------------------------------------------------------- Okumalar */

function okumalar(st, p) {
  const Dk = suruklenme(st, p);
  const Fd = Dk * st.v * st.v;
  const G = p.m * G_SABIT;
  return [
    { et: 'Süre  t',      dg: D.biçim(st.t, 1),          birim: 's' },
    { et: 'Yükseklik',    dg: D.biçim(st.y),             birim: 'm' },
    { et: 'Hız  ϑ',       dg: D.biçim(st.v),             birim: 'm/s' },
    { et: 'Direnç  F_d',  dg: D.biçim(Fd),               birim: 'N' },
    { et: 'İvme  a',      dg: D.biçim((G - Fd) / p.m),   birim: 'm/s²' },
    { et: 'Limit hız ϑ_L',dg: D.biçim(limitHiz(Dk, p)),  birim: 'm/s' }
  ];
}

/* ------------------------------------------------------------- Tanım */

D.simler = D.simler || {};
D.simler['limit-hiz'] = {
  id: 'limit-hiz',
  baslik: 'Paraşütçü · limit hıza yolculuk',
  yukseklik: 330,
  grafikPanel: true,
  grafikYukseklik: 175,
  parametreler: [
    { anahtar: 'm', etiket: 'Kütle m', min: 50, max: 130, adim: 5, deger: 80, birim: 'kg' },
    { anahtar: 'durus', etiket: 'Duruş', tur: 'secim', deger: 1, secenekler: [
      { d: 1, e: 'Yatay yayılmış (kesit büyük)' },
      { d: 2, e: 'Dik dalış (kesit küçük)' }
    ]},
    { anahtar: 'h0', etiket: 'Atlayış yüksekliği', min: 600, max: 3000, adim: 100, deger: 1500, birim: 'm' },
    { anahtar: 'acilis', etiket: 'Paraşüt açılışı', min: 0, max: 800, adim: 50, deger: 400, birim: 'm' }
  ],
  durum, adim, bitti, cizGercek, cizKlasik, cizGrafik, okumalar
};

})();
