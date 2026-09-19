(function () {
"use strict";
window.F11 = window.F11 || {};

/* ==========================================================================
   sims/cembersel-degiskenler.js
   --------------------------------------------------------------------------
   Konu 1.6.2 · Düzgün çembersel hareketin değişkenleri (MEB 11, s.101-119)

   Altı değişken ve aralarındaki bağlar:
       f = 1/T                    (frekans — periyodun tersi)
       ω = 2π/T = 2π·f            (açısal hız)
       ϑ = ω·r = 2π·r/T           (çizgisel hız)
       a_m = ϑ²/r = ω²·r          (merkezcil ivme — MERKEZE doğru)
       F_m = m·a_m = m·ϑ²/r       (merkezcil kuvvet — MERKEZE doğru)

   İKİ MOD
   -------
   1) İpe bağlı taş  : merkezcil kuvveti İP GERİLMESİ sağlar
   2) Virajı dönen araba : merkezcil kuvveti SÜRTÜNME sağlar

   İkinci mod kitabın s.102’deki sorusunu yanıtlar: "güvenli sürat sınırı
   aracın kütlesine bağlı mıdır?" Ekranda kütle sadeleşerek cevap veriyor:
       m·ϑ²/r ≤ μs·m·g  ⟹  ϑ_maks = √(μs·g·r)   — kütle yok.
       Buradaki μs STATİK sürtünme katsayısıdır: lastik yana kaymaz, yuvarlanır.

   MERKEZCİL KUVVET YENİ BİR KUVVET DEĞİLDİR
   -----------------------------------------
   Diyagrama "merkezcil kuvvet" diye ayrı bir ok çizilmez. O, zaten var olan
   bir kuvvetin (ip gerilmesi, sürtünme, yer çekimi) merkeze doğru olan
   bileşenine verilen isimdir. Sahne bunu ismiyle birlikte gösterir.
   ========================================================================== */

const D = window.F11;
const { R, K } = D;

const G_SABIT = 10;

function omega(p)    { return 2 * Math.PI / p.T; }
function frekans(p)  { return 1 / p.T; }
function hiz(p)      { return omega(p) * p.r; }
function merkezcilIvme(p) { const v = hiz(p); return v * v / p.r; }
function merkezcilKuvvet(p) { return p.m * merkezcilIvme(p); }

/** Virajda sürtünmenin sağlayabileceği en büyük merkezcil kuvvet. */
function surtunmeSiniri(p) { return p.mu * p.m * G_SABIT; }
/** Savrulmadan dönülebilecek en büyük sürat. */
function guvenliHiz(p) { return Math.sqrt(p.mu * G_SABIT * p.r); }

function virajMi(p) { return Math.round(p.mod) === 2; }

/* -------------------------------------------------------------- Durum */

function durum(p) { return { t: 0, aci: -Math.PI / 2 }; }

function adim(st, dt, p) {
  st.t += dt;
  st.aci += omega(p) * dt;
}

function bitti(st, p) { return st.t > p.T * 2.2; }

/* ------------------------------------------------- Gerçekçi görünüm */

function cizGercek(ctx, w, h, st, p) {
  const cx = w * 0.44, cy = h * 0.52;
  const s = Math.min((w * 0.32) / p.r, (h * 0.36) / p.r);
  const viraj = virajMi(p);
  const savruluyor = viraj && hiz(p) > guvenliHiz(p);

  /* zemin */
  ctx.fillStyle = viraj ? '#3C3C3A' : '#E8F0F7';
  ctx.fillRect(0, 0, w, h);
  if (!viraj) {
    ctx.fillStyle = '#D6E4EF';
    for (let i = 0; i < w; i += 34) for (let j = 0; j < h; j += 34)
      if (((i / 34) + (j / 34)) % 2 === 0) ctx.fillRect(i, j, 34, 34);
  }

  const rp = p.r * s;

  if (viraj) {
    /* asfalt şerit */
    ctx.strokeStyle = '#55555A'; ctx.lineWidth = 40;
    ctx.beginPath(); ctx.arc(cx, cy, rp, 0, 6.2832); ctx.stroke();
    ctx.save();
    ctx.setLineDash([14, 12]);
    ctx.strokeStyle = '#E8C547'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(cx, cy, rp, 0, 6.2832); ctx.stroke();
    ctx.restore();
  } else {
    ctx.save();
    ctx.setLineDash([5, 6]);
    ctx.strokeStyle = '#8FA8BE'; ctx.lineWidth = 1.6;
    ctx.beginPath(); ctx.arc(cx, cy, rp, 0, 6.2832); ctx.stroke();
    ctx.restore();
  }

  /* merkez */
  ctx.fillStyle = viraj ? '#8A8A82' : '#5F6B78';
  ctx.beginPath(); ctx.arc(cx, cy, 5, 0, 6.2832); ctx.fill();

  const px = cx + rp * Math.cos(st.aci), py = cy + rp * Math.sin(st.aci);

  /* ip (sadece taş modunda) */
  if (!viraj) {
    ctx.strokeStyle = '#8A6A3A'; ctx.lineWidth = 2.4;
    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(px, py); ctx.stroke();
  }

  /* cisim */
  if (viraj) {
    ctx.save();
    ctx.translate(px, py);
    ctx.rotate(st.aci + Math.PI / 2);
    ctx.fillStyle = savruluyor ? '#E24B4A' : '#2E5C8A';
    D.yuvarlakDik(ctx, -11, -18, 22, 36, 4); ctx.fill();
    ctx.fillStyle = '#9FC8E8';
    D.yuvarlakDik(ctx, -8, -12, 16, 11, 2); ctx.fill();
    ctx.restore();
  } else {
    D.top(ctx, px, py, 10);
  }

  /* --- kuvvet ve hız okları --- */
  const tx = -Math.sin(st.aci), ty = Math.cos(st.aci);
  const rx = Math.cos(st.aci), ry = Math.sin(st.aci);
  const v = hiz(p);

  D.vektor(ctx, px, py, px + tx * Math.min(70, 20 + v * 5), py + ty * Math.min(70, 20 + v * 5),
           R.hiz, 'ϑ', { kalinlik: 2.8 });
  D.vektor(ctx, px, py, px - rx * 48, py - ry * 48, R.merkezcil,
           viraj ? 'sürtünme' : 'ip gerilmesi', { kalinlik: 2.8 });

  /* savrulma uyarısı */
  if (savruluyor) {
    ctx.save();
    ctx.setLineDash([6, 6]);
    ctx.strokeStyle = 'rgba(226,75,74,.85)'; ctx.lineWidth = 2.4;
    ctx.beginPath();
    ctx.moveTo(px, py); ctx.lineTo(px + tx * rp * 1.1, py + ty * rp * 1.1);
    ctx.stroke();
    ctx.restore();
  }

  /* Rozet kısa: sol üstteki "gerçekçi görünüm" etiketiyle çakışmasın. */
  const msj = viraj
    ? (savruluyor ? 'SAVRULUYOR' : 'Güvenli viraj')
    : 'Merkezcil kuvvet = ip gerilmesi';
  ctx.save(); ctx.font = '600 12px system-ui, sans-serif';
  const g = ctx.measureText(msj).width + 22; ctx.restore();
  D.rozet(ctx, msj, Math.max(8, w - g - 10), 9,
          savruluyor ? 'rgba(226,75,74,.95)' : 'rgba(255,255,255,.92)',
          savruluyor ? '#2A0A0E' : '#2C3850');

  if (viraj)
    /* Viraj sahnesi KOYU (asfalt) — hale rengi paletten değil, açıkça koyu
       verilir; yoksa kâğıt paletinin beyaz halesi yazıyı okunmaz yapar. */
    D.yaziHaleli(ctx, 'ϑ_maks = √(μs·g·r) = ' + D.biçim(guvenliHiz(p)) + ' m/s',
                 10, h - 14, '#E8EDF5', '600 11px system-ui, sans-serif', 'left',
                 'rgba(11,18,32,.6)');
}

/* --------------------------------------------- Klasik fizik görünümü */

function cizKlasik(ctx, w, h, st, p) {
  D.izgara(ctx, w, h, 28);
  const viraj = virajMi(p);
  const cx = w * 0.28, cy = h * 0.34;
  const s = Math.min((w * 0.20) / p.r, (h * 0.22) / p.r);
  const rp = p.r * s;

  D.yorunge(ctx, cx, cy, rp, K.eksen);
  D.noktaCisim(ctx, cx, cy, 4, K.metin2);

  const px = cx + rp * Math.cos(st.aci), py = cy + rp * Math.sin(st.aci);
  const tx = -Math.sin(st.aci), ty = Math.cos(st.aci);
  const rx = Math.cos(st.aci), ry = Math.sin(st.aci);

  /* hız teğet, ivme merkeze — ikisi birbirine DİK */
  D.vektor(ctx, px, py, px + tx * 46, py + ty * 46, R.hiz, 'ϑ', { kalinlik: 2.4 });
  D.vektor(ctx, px, py, px - rx * 40, py - ry * 40, R.merkezcil, 'a_m', { kalinlik: 2.4 });
  D.noktaCisim(ctx, px, py, 6, R.konum);

  /* --- değişken tablosu --- */
  const v = hiz(p);
  const satirlar = [
    ['f = 1 / T',            D.biçim(frekans(p), 2) + ' Hz'],
    ['ω = 2π / T',           D.biçim(omega(p)) + ' rad/s'],
    ['ϑ = ω · r',            D.biçim(v) + ' m/s'],
    ['a_m = ϑ² / r',         D.biçim(merkezcilIvme(p)) + ' m/s²'],
    ['F_m = m · a_m',        D.biçim(merkezcilKuvvet(p)) + ' N']
  ];
  const tx0 = w * 0.50;
  let sy = 34;
  D.yaziHaleli(ctx, 'değişkenler', tx0, 16, K.metin2,
               '600 11px system-ui, sans-serif', 'left');
  satirlar.forEach(([sol, sag]) => {
    D.yaziHaleli(ctx, sol, tx0, sy, R.merkezcil, '600 12px system-ui, sans-serif', 'left');
    D.yaziHaleli(ctx, sag, w - 12, sy, K.beyaz, '600 12px system-ui, sans-serif', 'right');
    sy += 24;
  });

  /* --- moda özel alt bölüm --- */
  const ay = Math.max(sy + 16, h * 0.62);
  D.kesikliCizgi(ctx, 12, ay - 14, w - 12, ay - 14, 'rgba(74,95,134,.55)', 1, [4, 4]);

  if (viraj) {
    const gerekli = merkezcilKuvvet(p);
    const mevcut = surtunmeSiniri(p);
    const guvenli = gerekli <= mevcut;
    const alt = [
      ['Gereken F_m = m·ϑ²/r', D.biçim(gerekli) + ' N', R.merkezcil],
      ['Sürtünmenin sınırı μs·m·g', D.biçim(mevcut) + ' N', R.surtunme],
      [guvenli ? 'Gereken ≤ sınır ⟹ güvenli' : 'Gereken > sınır ⟹ savrulur',
       'ϑ_maks = ' + D.biçim(guvenliHiz(p)) + ' m/s', guvenli ? R.hiz : R.kuvvet]
    ];
    let by = ay;
    alt.forEach(([sol, sag, renk]) => {
      D.yaziHaleli(ctx, sol, 12, by, renk, '600 11px system-ui, sans-serif', 'left');
      D.yaziHaleli(ctx, sag, w - 12, by, K.beyaz, '11px system-ui, sans-serif', 'right');
      by += 19;
    });
    D.yaziHaleli(ctx, 'ϑ_maks = √(μs·g·r) — kütle sadeleşir, ağır araç da hafif araç da aynı',
                 w - 12, h - 8, K.metin2, '10px system-ui, sans-serif', 'right');
  } else {
    const alt = [
      'Merkezcil kuvvet AYRI bir kuvvet değildir.',
      'Burada onu ip gerilmesi sağlıyor: T = m·ϑ²/r',
      'Diyagrama "merkezcil kuvvet" diye ek ok çizilmez.'
    ];
    let by = ay;
    alt.forEach((t, i) => {
      D.yaziHaleli(ctx, t, 12, by, i === 0 ? R.ivme : K.metin,
                   (i === 0 ? '700 ' : '') + '11px system-ui, sans-serif', 'left');
      by += 18;
    });
    D.yaziHaleli(ctx, 'ϑ ⊥ a_m · hız teğet, ivme merkeze', w - 12, h - 8,
                 K.metin2, '10px system-ui, sans-serif', 'right');
  }
}

/* ----------------------------------------------------------- Okumalar */

function okumalar(st, p) {
  const o = [
    { et: 'Periyot  T',    dg: D.biçim(p.T),                birim: 's' },
    { et: 'Frekans  f',    dg: D.biçim(frekans(p), 2),      birim: 'Hz' },
    { et: 'Açısal hız ω',  dg: D.biçim(omega(p)),           birim: 'rad/s' },
    { et: 'Çizgisel hız ϑ',dg: D.biçim(hiz(p)),             birim: 'm/s' },
    { et: 'Merkezcil ivme',dg: D.biçim(merkezcilIvme(p)),   birim: 'm/s²' },
    { et: 'Merkezcil kuvvet', dg: D.biçim(merkezcilKuvvet(p)), birim: 'N' }
  ];
  /* Viraj düzeneğinde konunun asıl sorusu "savrulur mu?" — okuma satırında da
     görünsün, yalnızca çizimde kalmasın. */
  if (p.mod === 2) {
    const guvenli = hiz(p) <= guvenliHiz(p);
    o.push({ et: 'Güvenli sürat ϑ_maks', dg: D.biçim(guvenliHiz(p)), birim: 'm/s' });
    o.push({ et: 'Durum', dg: guvenli ? 'Güvenli' : 'SAVRULUR', birim: '' });
  }
  return o;
}

/* ------------------------------------------------------------- Tanım */

D.simler = D.simler || {};
D.simler['cembersel-degiskenler'] = {
  id: 'cembersel-degiskenler',
  baslik: 'Çembersel hareketin altı değişkeni',
  yukseklik: 350,
  parametreler: [
    { anahtar: 'mod', etiket: 'Düzenek', tur: 'secim', deger: 1, secenekler: [
      { d: 1, e: 'İpe bağlı taş (masa üstü)' },
      { d: 2, e: 'Virajı dönen araba' }
    ]},
    { anahtar: 'r', etiket: 'Yarıçap r', min: 2,  max: 20, adim: 1,   deger: 8,  birim: 'm' },
    { anahtar: 'T', etiket: 'Periyot T', min: 1,  max: 12, adim: 0.5, deger: 5,  birim: 's' },
    { anahtar: 'm', etiket: 'Kütle m',   min: 1,  max: 1500, adim: 1, deger: 800, birim: 'kg' },
    { anahtar: 'mu', etiket: 'μs (viraj)', min: 0.2, max: 1.2, adim: 0.1, deger: 0.8, birim: '' }
  ],
  durum, adim, bitti, cizGercek, cizKlasik, okumalar
};

})();
