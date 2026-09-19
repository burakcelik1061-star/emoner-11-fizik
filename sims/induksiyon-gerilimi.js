(function () {
"use strict";
window.F11 = window.F11 || {};

/* ==========================================================================
   sims/induksiyon-gerilimi.js
   --------------------------------------------------------------------------
   Konu 2.3.2 · İndüksiyon gerilimi  (MEB 11, s.242-252)

   Matematiksel model — Faraday yasası:
       ε = −N · ΔΦ / Δt
   Baştaki eksi işareti LENZ YASASI’dır: indüklenen akım, kendisini doğuran
   DEĞİŞİME KARŞI KOYACAK yönde akar.

   Raylı tel özel hâli (hareket emk’sı):
       ε = B · L · ϑ

   ÜÇ DÜZENEK
   ----------
   1) Mıknatıs–bobin : Mıknatıs yaklaşır/uzaklaşır. Hızı artırınca gerilim artar.
      Durunca gerilim SIFIRLANIR — akının kendisi değil, değişimi üretir.
   2) Raylı tel      : Sabit hızla çekilen tel, ε = B·L·ϑ üretir. Üstelik
      indüklenen akım tele KARŞI kuvvet uygular — bedava enerji yoktur.
   3) Dönen çerçeve  : Jeneratör. Akı kosinüs, gerilim SİNÜS çıkar; akı sıfırken
      gerilim en büyüktür.
   ========================================================================== */

const D = window.F11;
const { R, K } = D;

/* ------------------------------------------------------------- Fizik */

function cerceveAlani(p) { return (p.a / 100) * (p.a / 100); }

/* --- 1. düzenek: mıknatıs bobine yaklaşıp uzaklaşır --- */

/** Mıknatısın bobin merkezine uzaklığı (m), zamana bağlı. */
function miknatisX(st, p) {
  return 0.45 * Math.cos(p.v * st.t * 0.8);
}

/** Bobindeki alan — mıknatısa yaklaştıkça artar (dipol benzeri). */
/* Mıknatısın bobine en çok yaklaştığı uzaklık (m). */
const EN_YAKIN = 0.05;

/**
 * Bobinin gördüğü alan (T). Çubuk mıknatıs bir dipoldür: alan uzaklığın
 * KÜPÜYLE azalır.
 *
 * Katsayı, p.B "mıknatıs en yakınken bobindeki alan" olacak şekilde seçildi.
 * (Önceki sürümde sabit 0,001 kullanılıyordu ve en yakın noktada alan 4 T
 * çıkıyordu — laboratuvar elektromıknatısı bile 2 T'yi zor bulur. Biçim
 * doğruydu ama büyüklük fiziksel değildi.)
 */
function bobinAlani(st, p) {
  const x = Math.abs(miknatisX(st, p)) + EN_YAKIN;
  return p.B * Math.pow(EN_YAKIN / x, 3);
}

/* --- Ortak: anlık akı --- */

function aki(st, p) {
  if (p.mod < 1.5) return bobinAlani(st, p) * cerceveAlani(p);
  if (p.mod < 2.5) return p.B * (p.L / 100) * st.x;          // A = L · x
  return p.B * cerceveAlani(p) * Math.cos(st.aci);
}

/* --- Gerilim: sayısal türev yerine analitik ifadeler --- */

function gerilim(st, p) {
  if (p.mod < 1.5) {
    /* dΦ/dt sayısal olarak alınır (dipol ifadesi karmaşık) */
    const h = 1e-3;
    const ileri = { t: st.t + h };
    const geri  = { t: st.t - h };
    const f1 = bobinAlani(ileri, p) * cerceveAlani(p);
    const f0 = bobinAlani(geri, p) * cerceveAlani(p);
    return -p.N * (f1 - f0) / (2 * h);
  }
  if (p.mod < 2.5) {
    /* hareket emk’sı — kapalı form */
    return -p.N * p.B * (p.L / 100) * p.v;
  }
  /* dönen çerçeve: Φ = BAcos(ωt) ⟹ ε = N·B·A·ω·sin(ωt) */
  return p.N * p.B * cerceveAlani(p) * p.omega * Math.sin(st.aci);
}

/** İndüklenen akım (A) — devre direnci p.R. */
function akim(st, p) { return gerilim(st, p) / Math.max(0.1, p.R); }

/**
 * Galvanometrenin tam ölçek akımı (A). İbre bu değerde sona dayanır.
 * Her düzenekte o düzeneğin TEPE akımına göre hesaplanır; sabit bir ölçek
 * kullanılırsa ibre ya hiç kıpırdamaz ya da sürekli dayanır.
 */
function akimTamOlcek(st, p) {
  const Rr = Math.max(0.1, p.R);
  if (p.mod < 1.5) {
    /* Tepe emk, mıknatıs bobine en çok yaklaştığı anda oluşur:
       |ε| = N·A·|dB/dx|·ϑ   ve   |dB/dx| = 3B/x  (x = EN_YAKIN) */
    const vMaks = 0.45 * 0.8 * p.v;
    const epsTepe = p.N * cerceveAlani(p) * (3 * p.B / EN_YAKIN) * vMaks;
    return Math.max(0.05, epsTepe / Rr);
  }
  if (p.mod < 2.5) return Math.max(0.05, Math.abs(akim(st, p)) * 1.4);
  return Math.max(0.05, (p.N * p.B * cerceveAlani(p) * p.omega) / Rr);
}

/** Raylı telde indüklenen akımın tele uyguladığı KARŞI kuvvet (N). */
function karsiKuvvet(st, p) {
  if (p.mod > 1.5 && p.mod < 2.5)
    return Math.abs(akim(st, p)) * p.B * (p.L / 100);
  return 0;
}

/* -------------------------------------------------------------- Durum */

function durum(p) {
  return { t: 0, x: 0.25, aci: 0, kayit: [], akiKayit: [] };
}

function adim(st, dt, p) {
  st.t += dt;
  if (p.mod > 1.5 && p.mod < 2.5) {
    st.x += p.v * dt;
    if (st.x > 0.9) st.x = 0.05;
  }
  if (p.mod > 2.5) {
    st.aci += p.omega * dt;
    if (st.aci > 2 * Math.PI) st.aci -= 2 * Math.PI;
  }

  if (st.kayit.length === 0 || st.t - st.kayit[st.kayit.length - 1].t > 0.015) {
    st.kayit.push({ t: st.t, v: gerilim(st, p) });
    st.akiKayit.push({ t: st.t, v: aki(st, p) });
  }
  if (st.kayit.length > 400) { st.kayit.shift(); st.akiKayit.shift(); }
}

function bitti() { return false; }

/* --------------------------------------------- Gerçekçi görünüm */

function cizGercek(ctx, w, h, st, p) {
  if (p.mod < 1.5)      cizMiknatis(ctx, w, h, st, p);
  else if (p.mod < 2.5) cizRay(ctx, w, h, st, p);
  else                  cizJenerator(ctx, w, h, st, p);
}

/** Küçük galvanometre — ibresi akımla sapar. */
function galvanometre(ctx, x, y, r, i, enBuyuk) {
  ctx.save();
  ctx.fillStyle = 'rgba(255,255,255,.95)';
  ctx.beginPath(); ctx.arc(x, y, r, 0, 6.2832); ctx.fill();
  ctx.strokeStyle = '#7D8A99'; ctx.lineWidth = 2; ctx.stroke();
  ctx.restore();

  const oran = Math.max(-1, Math.min(1, i / Math.max(1e-9, enBuyuk)));
  const a = -Math.PI / 2 + oran * 1.0;
  ctx.save();
  ctx.strokeStyle = Math.abs(oran) > 0.02 ? '#E2483F' : '#7D8A99';
  ctx.lineWidth = 3; ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(x, y + r * 0.45);
  ctx.lineTo(x + Math.cos(a) * r * 0.78, y + r * 0.45 + Math.sin(a) * r * 0.78);
  ctx.stroke(); ctx.restore();

  D.yaziAydinlik(ctx, '0', x, y + r * 0.45 - r * 0.9, '#5F6B78',
                 '600 9px system-ui, sans-serif', 'center');
}

function cizMiknatis(ctx, w, h, st, p) {
  const cy = h * 0.46;
  const bobinX = w * 0.62;

  /* bobin */
  ctx.save();
  ctx.strokeStyle = '#B87333'; ctx.lineWidth = 5;
  for (let k = 0; k < 6; k++) {
    const x = bobinX + k * 13;
    ctx.beginPath(); ctx.ellipse(x, cy, 7, 38, 0, 0, 6.2832); ctx.stroke();
  }
  ctx.restore();

  /* mıknatıs */
  const mx = bobinX - 60 + miknatisX(st, p) * (-260);
  D.miknatis(ctx, mx - 44, cy - 16, 88, 32, false);

  /* hareket oku */
  const hiz = -(miknatisX({ t: st.t + 0.01 }, p) - miknatisX({ t: st.t - 0.01 }, p)) / 0.02 * 260;
  if (Math.abs(hiz) > 4)
    D.vektor(ctx, mx, cy - 34, mx + Math.sign(hiz) * 40, cy - 34, R.hiz, 'ϑ', { kalinlik: 2.4 });

  /* galvanometre */
  const eps = gerilim(st, p), i = akim(st, p);
  galvanometre(ctx, w * 0.20, cy + 4, 34, i, akimTamOlcek(st, p));
  D.yaziAydinlik(ctx, 'galvanometre', w * 0.20, cy + 56, R.mur,
                 '600 11px system-ui, sans-serif', 'center');

  /* bağlantı telleri */
  ctx.strokeStyle = '#7D8A99'; ctx.lineWidth = 2.4;
  ctx.beginPath();
  ctx.moveTo(bobinX - 8, cy - 38); ctx.lineTo(bobinX - 8, cy - 62);
  ctx.lineTo(w * 0.20, cy - 62); ctx.lineTo(w * 0.20, cy - 30);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(bobinX + 73, cy + 38); ctx.lineTo(bobinX + 73, cy + 76);
  ctx.lineTo(w * 0.20, cy + 76); ctx.lineTo(w * 0.20, cy + 38);
  ctx.stroke();

  D.yaziAydinlik(ctx, 'ε = ' + D.biçim(eps, 3) + ' V', w - 10, 44, R.normal,
                 '700 13px system-ui, sans-serif', 'right');
  D.yaziAydinlik(ctx, 'i = ' + D.biçim(i, 3) + ' A', w - 10, 62, R.ivme,
                 '700 12px system-ui, sans-serif', 'right');

  if (Math.abs(hiz) < 4)
    D.yaziAydinlik(ctx, 'mıknatıs durdu ⟹ akı değişmiyor ⟹ ε = 0', w / 2, h - 12,
                   '#B03030', '700 12px system-ui, sans-serif', 'center');
  else
    D.yaziAydinlik(ctx, 'akı DEĞİŞİYOR ⟹ gerilim doğuyor', w / 2, h - 12, R.mur,
                   '600 11px system-ui, sans-serif', 'center');
}

function cizRay(ctx, w, h, st, p) {
  const bx = w * 0.08, by = h * 0.16, bw = w * 0.84, bh = h * 0.56;

  ctx.save();
  ctx.fillStyle = 'rgba(56,150,200,.10)'; ctx.fillRect(bx, by, bw, bh);
  ctx.restore();
  D.alanBolgesi(ctx, bx, by, bw, bh, -1, 'rgba(47,111,208,.7)', 40);

  const ust = by + bh * 0.24, alt = by + bh * 0.76;
  ctx.fillStyle = '#9AA5B1';
  ctx.fillRect(bx + 6, ust - 3, bw - 12, 6);
  ctx.fillRect(bx + 6, alt - 3, bw - 12, 6);
  ctx.fillRect(bx + 6, ust, 6, alt - ust);          // sol kapak

  /* hareketli tel */
  const tx = bx + 10 + st.x * (bw - 30);
  ctx.save();
  ctx.strokeStyle = '#B87333'; ctx.lineWidth = 9; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(tx, ust); ctx.lineTo(tx, alt); ctx.stroke();
  ctx.restore();

  /* çevrelenen alan taranır */
  ctx.save();
  ctx.fillStyle = 'rgba(53,192,138,.16)';
  ctx.fillRect(bx + 12, ust, tx - bx - 12, alt - ust);
  ctx.restore();

  /* çekme ve karşı kuvvet */
  D.vektor(ctx, tx, ust - 22, tx + 44, ust - 22, R.hiz, 'ϑ', { kalinlik: 2.6 });
  const Fk = karsiKuvvet(st, p);
  if (Fk > 1e-6)
    D.vektor(ctx, tx, alt + 22, tx - 44, alt + 22, R.kuvvet, 'F_karşı', { kalinlik: 2.6 });

  const eps = gerilim(st, p), i = akim(st, p);
  galvanometre(ctx, bx + 34, (ust + alt) / 2, 24, i, Math.max(0.05, p.B * (p.L / 100) * 3 / p.R));

  D.yaziAydinlik(ctx, 'ε = B·L·ϑ = ' + D.biçim(Math.abs(eps), 3) + ' V', w - 10, 44,
                 R.normal, '700 13px system-ui, sans-serif', 'right');
  D.yaziAydinlik(ctx, 'i = ' + D.biçim(Math.abs(i), 3) + ' A', w - 10, 62, R.ivme,
                 '700 12px system-ui, sans-serif', 'right');
  D.yaziAydinlik(ctx, 'F_karşı = ' + D.biçim(Fk, 3) + ' N', w - 10, 80, R.kuvvet,
                 '700 12px system-ui, sans-serif', 'right');
  D.yaziAydinlik(ctx, 'indüklenen akım harekete KARŞI koyar — bedava enerji yok',
                 10, h - 12, R.mur, '600 11px system-ui, sans-serif', 'left');
}

function cizJenerator(ctx, w, h, st, p) {
  const cx = w * 0.44, cy = h * 0.46, R0 = Math.min(w * 0.18, h * 0.28);

  ctx.fillStyle = '#E2483F'; ctx.fillRect(12, cy - R0 - 12, 40, (R0 + 12) * 2);
  ctx.fillStyle = '#2F6FD0'; ctx.fillRect(w * 0.76, cy - R0 - 12, 40, (R0 + 12) * 2);
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 18px system-ui, sans-serif';
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText('N', 32, cy); ctx.fillText('S', w * 0.76 + 20, cy);

  ctx.save();
  ctx.strokeStyle = 'rgba(47,111,208,.45)'; ctx.lineWidth = 1.4;
  for (let k = -2; k <= 2; k++) {
    const yy = cy + k * (R0 * 0.55);
    ctx.beginPath(); ctx.moveTo(54, yy); ctx.lineTo(w * 0.76, yy); ctx.stroke();
  }
  ctx.restore();

  /* dönen çerçeve */
  const ux = Math.cos(st.aci), uy = Math.sin(st.aci);
  ctx.save();
  ctx.strokeStyle = '#B87333'; ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(cx + ux * R0, cy + uy * R0 * 0.42);
  ctx.lineTo(cx - ux * R0, cy - uy * R0 * 0.42);
  ctx.stroke(); ctx.restore();
  D.noktaCisim(ctx, cx, cy, 4, K.beyaz);

  const eps = gerilim(st, p);
  galvanometre(ctx, w * 0.91, cy + 70, 26, akim(st, p),
               Math.max(0.05, p.N * p.B * cerceveAlani(p) * p.omega / p.R));

  D.yaziAydinlik(ctx, 'ε = ' + D.biçim(eps, 3) + ' V', w / 2, h - 30, R.normal,
                 '700 14px system-ui, sans-serif', 'center');
  D.yaziAydinlik(ctx, 'akı kosinüs ⟹ gerilim SİNÜS · alternatif akım doğuyor',
                 w / 2, h - 12, R.mur, '600 11px system-ui, sans-serif', 'center');
}

/* ----------------------------------------- Klasik fizik görünümü */

function cizKlasik(ctx, w, h, st, p) {
  D.izgara(ctx, w, h, 26);
  const eps = gerilim(st, p), F = aki(st, p);

  D.yaziHaleli(ctx, 'Faraday ve Lenz', 12, 22, K.beyaz,
               '700 12px system-ui, sans-serif', 'left');

  const satir = p.mod < 2.5 ? [
    ['ε = −N · ΔΦ / Δt', K.beyaz, '700 13px system-ui, sans-serif'],
    ['eksi işareti = LENZ', R.kuvvet, '11px system-ui, sans-serif'],
    ['', K.metin2, '11px'],
    ['N = ' + D.biçim(p.N) + ' sarım', K.metin2, '11px system-ui, sans-serif'],
    ['Φ = ' + D.biçim(F, 4) + ' Wb', K.metin2, '11px system-ui, sans-serif'],
    ['ε = ' + D.biçim(eps, 3) + ' V', R.normal, '700 13px system-ui, sans-serif'],
    ['i = ε/R = ' + D.biçim(akim(st, p), 3) + ' A', R.ivme, '700 12px system-ui, sans-serif']
  ] : [
    ['Φ = B·A·cos(ωt)', K.beyaz, '12px system-ui, sans-serif'],
    ['ε = N·B·A·ω·sin(ωt)', K.beyaz, '700 13px system-ui, sans-serif'],
    ['', K.metin2, '11px'],
    ['ε_maks = N·B·A·ω', R.ivme, '700 12px system-ui, sans-serif'],
    ['= ' + D.biçim(p.N * p.B * cerceveAlani(p) * p.omega, 3) + ' V', R.ivme, '12px system-ui, sans-serif'],
    ['anlık ε = ' + D.biçim(eps, 3) + ' V', R.normal, '700 13px system-ui, sans-serif'],
    ['Φ = ' + D.biçim(F, 4) + ' Wb', K.metin2, '11px system-ui, sans-serif']
  ];
  let sy = 46;
  satir.forEach(([t, c, f]) => {
    if (t) D.yaziHaleli(ctx, t, w * 0.52, sy, c, f, 'left');
    sy += 18;
  });

  /* sol: Lenz kuralının şeması */
  const cx = w * 0.22, cy = h * 0.48;
  if (p.mod > 1.5 && p.mod < 2.5) {
    D.vektor(ctx, cx - 40, cy - 30, cx + 40, cy - 30, R.hiz, 'ϑ', { kalinlik: 2.4 });
    D.vektor(ctx, cx + 40, cy + 10, cx - 40, cy + 10, R.kuvvet, 'F_karşı', { kalinlik: 2.4 });
    D.yaziHaleli(ctx, 'hareket sağa ⟹ kuvvet sola', cx, cy + 46, R.kuvvet,
                 '600 11px system-ui, sans-serif', 'center');
    D.yaziHaleli(ctx, 'ε = B·L·ϑ', cx, cy + 70, K.beyaz,
                 '700 12px system-ui, sans-serif', 'center');
  } else {
    const buyuyor = p.mod < 1.5
      ? (bobinAlani({ t: st.t + 0.01 }, p) > bobinAlani({ t: st.t - 0.01 }, p))
      : Math.sin(st.aci) > 0;
    D.yaziHaleli(ctx, buyuyor ? 'Akı ARTIYOR' : 'Akı AZALIYOR', cx, cy - 34,
                 buyuyor ? R.kuvvet : R.hiz, '700 13px system-ui, sans-serif', 'center');
    /* Kısa tutuldu: uzun satır sağ sütunun üstüne biniyordu. */
    D.yaziHaleli(ctx, buyuyor ? 'akım artışa karşı koyar' : 'akım azalmaya karşı koyar',
                 cx, cy - 10, K.metin2, '11px system-ui, sans-serif', 'center');
    D.yaziHaleli(ctx, buyuyor ? '⟹ zıt yönde alan üretir' : '⟹ aynı yönde alan üretir',
                 cx, cy + 12, K.beyaz, '600 11px system-ui, sans-serif', 'center');
  }

  D.yaziHaleli(ctx, 'Lenz: doğa değişime direnir — enerji korunumunun sonucu',
               12, h - 16, R.ivme, '600 11px system-ui, sans-serif', 'left');
}

/* ------------------------------------------------------- Grafikler */

function cizGrafik(ctx, w, h, st, p) {
  const pay = 8, gw = (w - pay * 3) / 2, gh = h - 6;
  const epsMax = Math.max(...st.kayit.map(d => Math.abs(d.v)), 0.05);
  const fMax = Math.max(...st.akiKayit.map(d => Math.abs(d.v)), 1e-4);

  D.miniGrafik(ctx, {
    x: pay, y: 3, w: gw, h: gh,
    baslik: 'Φ − t   (akı)', birim: 'Wb',
    veri: st.akiKayit, tMin: st.akiKayit.length ? st.akiKayit[0].t : 0,
    tMax: Math.max(1, st.t),
    vMin: -fMax * 1.15, vMax: fMax * 1.15,
    renk: R.normal
  });

  D.miniGrafik(ctx, {
    x: pay * 2 + gw, y: 3, w: gw, h: gh,
    baslik: 'ε − t   (Φ grafiğinin EĞİMİ)', birim: 'V',
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
    { et: 'Akı  Φ',      dg: D.biçim(aki(st, p), 4),      birim: 'Wb' },
    { et: 'Gerilim  ε',  dg: D.biçim(eps, 3),             birim: 'V' },
    { et: 'Akım  i',     dg: D.biçim(akim(st, p), 3),     birim: 'A' },
    { et: 'Sarım  N',    dg: D.biçim(p.N),                birim: '' }
  ];
  if (p.mod > 1.5 && p.mod < 2.5) {
    o.push({ et: 'Karşı kuvvet', dg: D.biçim(karsiKuvvet(st, p), 3), birim: 'N' });
    o.push({ et: 'Hız  ϑ',       dg: D.biçim(p.v, 2),                birim: 'm/s' });
  }
  if (p.mod > 2.5) {
    o.push({ et: 'ε_maks', dg: D.biçim(p.N * p.B * cerceveAlani(p) * p.omega, 3), birim: 'V' });
  }
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
      { d: 3, e: 'Dönen çerçeve (jeneratör)' }
    ]},
    { anahtar: 'B',     etiket: 'Manyetik alan B', min: 0.1, max: 2, adim: 0.1, deger: 0.8, birim: 'T' },
    { anahtar: 'N',     etiket: 'Sarım sayısı N', min: 1, max: 200, adim: 1, deger: 50, birim: '' },
    { anahtar: 'v',     etiket: 'Hız ϑ', min: 0, max: 4, adim: 0.2, deger: 1.5, birim: 'm/s' },
    { anahtar: 'L',     etiket: 'Tel uzunluğu L', min: 10, max: 60, adim: 5, deger: 30, birim: 'cm' },
    { anahtar: 'a',     etiket: 'Çerçeve kenarı', min: 5, max: 40, adim: 5, deger: 20, birim: 'cm' },
    { anahtar: 'omega', etiket: 'Dönme hızı ω', min: 0.5, max: 12, adim: 0.5, deger: 4, birim: 'rad/s' },
    { anahtar: 'R',     etiket: 'Devre direnci', min: 0.5, max: 20, adim: 0.5, deger: 2, birim: 'Ω' }
  ],
  durum, adim, bitti, cizGercek, cizKlasik, cizGrafik, okumalar
};

})();
