(function () {
"use strict";
window.F11 = window.F11 || {};

/* ==========================================================================
   sims/cembersel-yorunge-hiz.js
   --------------------------------------------------------------------------
   Konu 1.6.1 · Çembersel harekette yörünge ve hız kavramları (MEB 11, s.95-100)

   Kitabın etkinliği (s.97): farklı sistemlerde yarıçap vektörleri verilir,
   öğrenciden hız vektörlerini çizmesi istenir. Doğru cevap her zaman aynıdır:
   hız vektörü yörüngeye TEĞETTİR ve yarıçapa DİKTİR.

   BU SİMÜLASYONUN ASIL HEDEFİ
   ---------------------------
   "İp koparsa cisim nereye gider?" sorusu. Öğrencilerin çoğu merkezden
   DIŞARI doğru fırlayacağını sanır (merkezkaç yanılgısı). Doğrusu: Newton I
   gereği cisim o anki hızını korur, yani TEĞET doğrultuda düz gider.

   Simülasyon ip koptuğunda hem doğru yolu (yeşil) hem de yanlış sanılan yolu
   (kırmızı kesikli) çizer. İkisi yan yana görülünce yanılgı kalıcı biçimde kırılır.

   Düzgün çembersel harekette hızın BÜYÜKLÜĞÜ sabittir ama YÖNÜ sürekli değişir.
   Yön değişimi de bir hız değişimidir ⟹ bu hareket İVMELİDİR.
   ========================================================================== */

const D = window.F11;
const { R, K } = D;

/* -------------------------------------------------------------- Durum */

function durum(p) {
  return {
    t: 0,
    aci: -Math.PI / 2,        // tepe noktadan başla (saat yönünün tersi)
    kopti: false,
    kopmaAci: null,
    kopmaX: 0, kopmaY: 0,     // kopma anındaki konum (metre, merkeze göre)
    serbestT: 0,              // koptuktan sonra geçen süre
    iz: []
  };
}

/** Açısal hız: 2π / T */
function omega(p) { return 2 * Math.PI / p.T; }
/** Çizgisel hız büyüklüğü: ω·r */
function cizgiselHiz(p) { return omega(p) * p.r; }

function adim(st, dt, p) {
  st.t += dt;

  if (!st.kopti) {
    const onceki = st.aci;
    st.aci += omega(p) * dt;

    /* Seçilen açıdan geçerken ip kopar */
    if (p.kop > 0) {
      const hedef = -Math.PI / 2 + (p.kop * Math.PI / 180);
      if (onceki < hedef && st.aci >= hedef) {
        st.kopti = true;
        st.kopmaAci = hedef;
        st.kopmaX = p.r * Math.cos(hedef);
        st.kopmaY = p.r * Math.sin(hedef);
      }
    }
    if (st.iz.length < 400) st.iz.push({ a: st.aci });
  } else {
    st.serbestT += dt;
  }
}

function bitti(st, p) {
  return st.kopti ? st.serbestT > p.r * 2.2 / Math.max(cizgiselHiz(p), 0.1)
                  : st.t > p.T * 2.4;
}

/** Cismin o anki konumu (metre, merkeze göre). */
function konum(st, p) {
  if (!st.kopti) {
    return { x: p.r * Math.cos(st.aci), y: p.r * Math.sin(st.aci) };
  }
  /* Kopduktan sonra Newton I: teğet doğrultuda sabit hızla düz gider. */
  const v = cizgiselHiz(p);
  const tx = -Math.sin(st.kopmaAci), ty = Math.cos(st.kopmaAci);
  return { x: st.kopmaX + tx * v * st.serbestT, y: st.kopmaY + ty * v * st.serbestT };
}

/* ------------------------------------------------- Gerçekçi görünüm */

function cizGercek(ctx, w, h, st, p) {
  const cx = w * 0.42, cy = h * 0.52;
  const s = Math.min((w * 0.34) / p.r, (h * 0.38) / p.r);   // piksel / metre
  const X = m => cx + m * s;
  const Y = m => cy + m * s;

  /* masa üstü görünümü — yukarıdan bakış */
  ctx.fillStyle = '#E8F0F7'; ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = '#D6E4EF';
  for (let i = 0; i < w; i += 34) for (let j = 0; j < h; j += 34)
    if (((i / 34) + (j / 34)) % 2 === 0) ctx.fillRect(i, j, 34, 34);

  /* yörünge */
  ctx.save();
  ctx.setLineDash([5, 6]);
  ctx.strokeStyle = '#8FA8BE'; ctx.lineWidth = 1.6;
  ctx.beginPath(); ctx.arc(cx, cy, p.r * s, 0, 6.2832); ctx.stroke();
  ctx.restore();

  /* merkez çivi */
  ctx.fillStyle = '#5F6B78';
  ctx.beginPath(); ctx.arc(cx, cy, 6, 0, 6.2832); ctx.fill();
  D.yaziAydinlik(ctx, 'merkez', cx, cy + 20, '#4A5A6B', '600 10px system-ui, sans-serif', 'center');

  const k = konum(st, p);
  const px = X(k.x), py = Y(k.y);

  /* ip — kopmadıysa gergin, koptuysa sarkık */
  if (!st.kopti) {
    ctx.strokeStyle = '#8A6A3A'; ctx.lineWidth = 2.4;
    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(px, py); ctx.stroke();
  } else {
    ctx.strokeStyle = 'rgba(138,106,58,.45)'; ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.quadraticCurveTo(X(st.kopmaX) * .6 + cx * .4, Y(st.kopmaY) + 18, X(st.kopmaX), Y(st.kopmaY));
    ctx.stroke();
    /* kopma noktası */
    ctx.fillStyle = '#E24B4A';
    ctx.beginPath(); ctx.arc(X(st.kopmaX), Y(st.kopmaY), 4, 0, 6.2832); ctx.fill();
    D.yaziAydinlik(ctx, 'ip koptu', X(st.kopmaX), Y(st.kopmaY) - 14, '#8A2B2B',
                   '700 11px system-ui, sans-serif', 'center');

    /* --- DOĞRU yol: teğet doğrultu (yeşil) --- */
    const v = cizgiselHiz(p);
    const tx = -Math.sin(st.kopmaAci), ty = Math.cos(st.kopmaAci);
    ctx.strokeStyle = '#1D9E75'; ctx.lineWidth = 2.4;
    ctx.beginPath();
    ctx.moveTo(X(st.kopmaX), Y(st.kopmaY));
    ctx.lineTo(X(st.kopmaX + tx * p.r * 2.4), Y(st.kopmaY + ty * p.r * 2.4));
    ctx.stroke();

    /* --- YANLIŞ sanılan yol: merkezden dışarı (kırmızı kesikli) --- */
    const rx = Math.cos(st.kopmaAci), ry = Math.sin(st.kopmaAci);
    ctx.save();
    ctx.setLineDash([6, 6]);
    ctx.strokeStyle = 'rgba(226,75,74,.75)'; ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(X(st.kopmaX), Y(st.kopmaY));
    ctx.lineTo(X(st.kopmaX + rx * p.r * 1.5), Y(st.kopmaY + ry * p.r * 1.5));
    ctx.stroke();
    ctx.restore();
    D.yaziAydinlik(ctx, 'yanlış sanılan', X(st.kopmaX + rx * p.r * 1.6),
                   Y(st.kopmaY + ry * p.r * 1.6), '#A32D2D',
                   '600 10px system-ui, sans-serif', 'center');
  }

  /* cisim */
  D.top(ctx, px, py, 9);

  /* geçmiş iz */
  ctx.save();
  ctx.globalAlpha = .3;
  ctx.strokeStyle = '#B84A26'; ctx.lineWidth = 2;
  ctx.beginPath();
  st.iz.forEach((q, i) => {
    const qx = X(p.r * Math.cos(q.a)), qy = Y(p.r * Math.sin(q.a));
    i ? ctx.lineTo(qx, qy) : ctx.moveTo(qx, qy);
  });
  ctx.stroke();
  ctx.restore();

  /* Rozet kısa tutulur: panelin sol üstünde "gerçekçi görünüm" etiketi var,
     uzun metin onun altına girip okunmaz hâle geliyordu. */
  const msj = st.kopti ? 'Newton I · teğet gidiyor' : 'Düzgün çembersel hareket';
  ctx.save(); ctx.font = '600 12px system-ui, sans-serif';
  const g = ctx.measureText(msj).width + 22; ctx.restore();
  D.rozet(ctx, msj, Math.max(8, w - g - 10), 9,
          st.kopti ? 'rgba(53,192,138,.95)' : 'rgba(255,255,255,.92)',
          st.kopti ? '#04251A' : '#2C3850');
}

/* --------------------------------------------- Klasik fizik görünümü */

function cizKlasik(ctx, w, h, st, p) {
  D.izgara(ctx, w, h, 28);
  const cx = w * 0.42, cy = h * 0.50;
  const s = Math.min((w * 0.30) / p.r, (h * 0.34) / p.r);
  const v = cizgiselHiz(p);

  D.yorunge(ctx, cx, cy, p.r * s, K.eksen);
  D.noktaCisim(ctx, cx, cy, 4, K.metin2);

  const k = konum(st, p);
  const px = cx + k.x * s, py = cy + k.y * s;

  /* --- yarıçap vektörü --- */
  D.vektor(ctx, cx, cy, px, py, R.konum, 'r = ' + D.biçim(p.r) + ' m', { kalinlik: 2 });

  /* --- hız vektörü: DAİMA teğet, yarıçapa DİK --- */
  const aci = st.kopti ? st.kopmaAci : st.aci;
  const tx = -Math.sin(aci), ty = Math.cos(aci);
  const vb = Math.min(76, 22 + v * 7);
  D.vektor(ctx, px, py, px + tx * vb, py + ty * vb, R.hiz,
           'ϑ = ' + D.biçim(v) + ' m/s', { kalinlik: 2.8 });

  /* dik açı işareti — hız ile yarıçap arasındaki 90° */
  if (!st.kopti) {
    const rx = Math.cos(aci), ry = Math.sin(aci);
    const d = 11;
    ctx.save();
    ctx.strokeStyle = K.metin2; ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(px - rx * d, py - ry * d);
    ctx.lineTo(px - rx * d + tx * d, py - ry * d + ty * d);
    ctx.lineTo(px + tx * d, py + ty * d);
    ctx.stroke();
    ctx.restore();
    D.yaziHaleli(ctx, '90°', px - rx * 22 + tx * 22, py - ry * 22 + ty * 22,
                 K.metin2, '600 10px system-ui, sans-serif', 'center');
  }

  D.noktaCisim(ctx, px, py, 7, R.konum);

  /* --- farklı konumlardaki hız vektörleri (soluk) ---
     Kitabın s.97 etkinliği: her konumda hız teğettir. */
  if (!st.kopti) {
    ctx.save();
    ctx.globalAlpha = .28;
    for (let i = 0; i < 4; i++) {
      const a = st.aci + i * Math.PI / 2;
      const qx = cx + p.r * s * Math.cos(a), qy = cy + p.r * s * Math.sin(a);
      D.vektor(ctx, qx, qy, qx - Math.sin(a) * 34, qy + Math.cos(a) * 34, R.hiz, '', { kalinlik: 2 });
    }
    ctx.restore();
  }

  /* --- açıklama satırları --- */
  const satirlar = [
    'Hız vektörü yörüngeye TEĞET',
    'Hız vektörü yarıçapa DİK (90°)',
    'Büyüklüğü sabit: ϑ = ' + D.biçim(v) + ' m/s',
    'Yönü sürekli değişiyor ⟹ İVMELİ hareket'
  ];
  let sy = h - 26 - (satirlar.length - 1) * 16;
  satirlar.forEach((t, i) => {
    D.yaziHaleli(ctx, t, w - 12, sy, i === 3 ? R.ivme : K.beyaz,
                 (i === 3 ? '700 ' : '') + '11px system-ui, sans-serif', 'right');
    sy += 16;
  });
  D.yaziHaleli(ctx, 'soluk oklar: diğer konumlardaki hız', w - 12, h - 8,
               K.metin2, '10px system-ui, sans-serif', 'right');
}

/* ----------------------------------------------------------- Okumalar */

function okumalar(st, p) {
  const v = cizgiselHiz(p);
  const derece = ((st.kopti ? st.kopmaAci : st.aci) + Math.PI / 2) * 180 / Math.PI;
  return [
    { et: 'Yarıçap  r',   dg: D.biçim(p.r),              birim: 'm' },
    { et: 'Periyot  T',   dg: D.biçim(p.T),              birim: 's' },
    { et: 'Çizgisel hız ϑ', dg: D.biçim(v),              birim: 'm/s' },
    { et: 'Açı',          dg: D.biçim(((derece % 360) + 360) % 360, 0), birim: '°' },
    { et: 'Hızın yönü',   dg: 'Teğet',                   birim: '' },
    { et: 'Durum',        dg: st.kopti ? 'Doğrusal' : 'Çembersel', birim: '' }
  ];
}

/* ------------------------------------------------------------- Tanım */

D.simler = D.simler || {};
D.simler['cembersel-yorunge-hiz'] = {
  id: 'cembersel-yorunge-hiz',
  baslik: 'Teğetsel hız ve ipin kopması',
  yukseklik: 360,
  parametreler: [
    { anahtar: 'r', etiket: 'Yarıçap r', min: 1, max: 6, adim: 0.5, deger: 3, birim: 'm' },
    { anahtar: 'T', etiket: 'Periyot T', min: 1, max: 8, adim: 0.5, deger: 4, birim: 's' },
    { anahtar: 'kop', etiket: 'İp kopsun', tur: 'secim', deger: 0, secenekler: [
      { d: 0,   e: 'Kopmasın' },
      { d: 90,  e: 'Sağ tarafta (90°)' },
      { d: 180, e: 'Altta (180°)' },
      { d: 270, e: 'Sol tarafta (270°)' }
    ]}
  ],
  durum, adim, bitti, cizGercek, cizKlasik, okumalar
};

})();
