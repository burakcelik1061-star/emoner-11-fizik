(function () {
"use strict";
window.F11 = window.F11 || {};

/* ==========================================================================
   sims/elektriksel-kuvvet.js
   --------------------------------------------------------------------------
   Konu 2.1 · Elektriksel kuvvet — Coulomb yasası

   Matematiksel model:
       F = k · |q₁·q₂| / d²        k = 9·10⁹ N·m²/C²

   İKİ DÜZENEK
   -----------
   1) Sabit uzaklık : Yükler yalıtkan ayaklara sabitlenmiştir. Öğrenci d’yi ve
      yükleri değiştirir, kuvvetin nasıl değiştiğini okur. Asıl gösterilen şey
      ETKİ-TEPKİ: iki yükün büyüklükleri farklı olsa bile kuvvetler EŞİTTİR.

   2) Serbest bırak : Sağdaki yük raylı arabaya bağlıdır ve serbesttir. Kuvvet
      sabit olmadığı için ivme de sabit değildir — d küçüldükçe kuvvet artar,
      ivme artar. Bu, 1. ünitedeki sabit ivmeli hareketten farklıdır ve
      öğrencinin en çok yanıldığı noktadır.

   BİRİMLER
   --------
   Kaydırıcılarda yük μC, uzaklık cm’dir (sınıfta kullanılan ölçek). Hesap
   daima SI ile yapılır; klasik panelde çevrim açıkça gösterilir.
   q μC ve d cm iken kullanışlı kısayol:  F = 90 · q₁q₂ / d²   (N)
   ========================================================================== */

const D = window.F11;
const { R, K } = D;

const KC = 9e9;             // N·m²/C²
const EN_YAKIN = 0.04;      // m — bu uzaklıkta deney durur (F → ∞ bölgesi)

/* ------------------------------------------------------------- Fizik */

function q1C(p) { return p.q1 * 1e-6; }
function q2C(p) { return p.q2 * 1e-6; }

/** Coulomb kuvvetinin BÜYÜKLÜĞÜ (N). */
function kuvvet(p, d) {
  const dd = Math.max(d, EN_YAKIN);
  return KC * Math.abs(q1C(p) * q2C(p)) / (dd * dd);
}

/** Çekme mi itme mi? Zıt işaretler çeker, aynı işaretler iter. Yüklerden
    biri SIFIRSA q₁·q₂ = 0 olur: ne çekme ne itme vardır, kuvvet yoktur. */
function cekiyor(p) { return p.q1 * p.q2 < 0; }
function kuvvetYok(p) { return p.q1 * p.q2 === 0; }

/** q₂ üzerindeki kuvvetin işaretli yönü: +1 sağa (q₁’den uzağa), −1 sola,
    0 kuvvet yok. */
function yon(p) { return kuvvetYok(p) ? 0 : cekiyor(p) ? -1 : +1; }

function turMetni(p) { return kuvvetYok(p) ? 'Kuvvet yok' : cekiyor(p) ? 'Çekme' : 'İtme'; }

/** Yükü işaretiyle yazar: +3, −2, 0 (sıfırın işareti olmaz). */
function isaretli(q) { return (q > 0 ? '+' : q < 0 ? '−' : '') + D.biçim(Math.abs(q)); }

/** Yük rengi: artı kırmızı, eksi mavi, yüksüz gri. */
function yukRengi(q) { return q > 0 ? '#E2483F' : q < 0 ? '#2F6FD0' : '#8A949F'; }

function kutleKg(p) { return p.m / 1000; }

/* -------------------------------------------------------------- Durum */

/* AĞIR ÇEKİM
   Gerçek değerlerle hareket 0,2–1 s içinde biter ve gözle izlenemez. Sahne
   bu yüzden AGIR kat yavaş oynatılır; ekrandaki süre (t) ve hızlar GERÇEK
   fiziksel değerlerdir, yalnızca oynatma yavaştır. */
const AGIR = 8;

/** İki yük arasındaki uzaklık (m). q₁ x₁’de, q₂ x₂’de. */
function uz(st) { return st.x2 - st.x1; }

function durum(p) {
  return { t: 0, x1: 0, x2: p.d / 100, v1: 0, v2: 0, durdu: false, carpisti: false, kayit: [] };
}

/* HAREKET — yalnızca Coulomb kuvvetiyle, başka hiçbir şeyle değil.
   Zıt yükler birbirine YAKLAŞIR, aynı yükler UZAKLAŞIR, yüklerden biri
   sıfırsa kuvvet yoktur ve HİÇBİRİ kıpırdamaz.
   1. düzenek: iki yük de serbest (eşit kütleli arabalarda). Newton III:
      q₁’e etki eden kuvvet q₂’ye etki edenle eşit ve zıttır, ikisi de hareket eder.
   2. düzenek: q₁ yerine sabitlenmiş, yalnız q₂ hareket eder.
   Kuvvet uzaklığa bağlı olduğu için her adımda yeniden hesaplanır — sabit
   ivmeli hareket DEĞİLDİR. */
function adim(st, dt, p) {
  const dtF = dt / AGIR;
  st.t += dtF;
  if (st.durdu) return;

  const F = kuvvet(p, uz(st));
  const a = (F / kutleKg(p)) * yon(p);          // q₂’nin ivmesi (+ sağa)
  st.v2 += a * dtF;
  st.x2 += st.v2 * dtF;
  if (p.mod < 1.5) {                            // q₁ eşit ve zıt kuvvetle
    st.v1 -= a * dtF;
    st.x1 += st.v1 * dtF;
  }

  if (uz(st) <= EN_YAKIN) {
    /* çarpışma: uzaklığı EN_YAKIN’a sabitle (1. düzenekte simetrik) */
    const orta = (st.x1 + st.x2) / 2;
    if (p.mod < 1.5) { st.x1 = orta - EN_YAKIN / 2; st.x2 = orta + EN_YAKIN / 2; }
    else st.x2 = st.x1 + EN_YAKIN;
    st.durdu = true; st.carpisti = true;
  }
  if (uz(st) > 2.4) st.durdu = true;

  if (st.kayit.length === 0 || st.t - st.kayit[st.kayit.length - 1].t > 0.002)
    st.kayit.push({ t: st.t, v: Math.abs(st.v2) });
  if (st.kayit.length > 400) st.kayit.shift();
}

/* Kuvvet yoksa hareket de yok: sahne 1 s gösterilip durur. */
function bitti(st, p) { return st.durdu || (kuvvetYok(p) && st.t * AGIR > 1); }

/* ------------------------------------------------- Ortak yerleşim */

/** Fiziksel x (m) → piksel dönüşümü; her iki panel de bunu kullanır. */
function olcekle(w, st, p) {
  /* Ölçek hareket boyunca SABİT: yükler itiyorsa uzaklığın 2,4 m’ye kadar
     açılacağı, çekiyorsa başlangıç uzaklığı sığacak şekilde kurulur. */
  const d0 = p.d / 100;
  const itme = !kuvvetYok(p) && !cekiyor(p);
  const kapsam = Math.max(1.05, (itme ? 2.4 : d0) + 0.25);
  const sol = p.mod < 1.5 ? d0 / 2 - kapsam / 2 - 0.2 : -0.18;
  const sag = p.mod < 1.5 ? d0 / 2 + kapsam / 2 + 0.2 : kapsam;
  const pay = 58;
  const ol = (w - pay * 2) / (sag - sol);
  return { X: (x) => pay + (x - sol) * ol, ol };
}

/** Yük küresi: artı kırmızı, eksi mavi; yarıçap yük büyüklüğüyle artar. */
function yukKuresi(ctx, x, y, q, etiket, hiza = 'center', kaydir = 0) {
  const r = 11 + Math.min(Math.abs(q), 10) * 1.15;
  const arti = q > 0, yuksuz = q === 0;
  const ana = yukRengi(q);
  const isik = yuksuz ? '#C9CFD6' : arti ? '#F3958E' : '#8FB6EC';

  ctx.save();
  const g = ctx.createRadialGradient(x - r * .3, y - r * .35, r * .2, x, y, r);
  g.addColorStop(0, isik); g.addColorStop(1, ana);
  ctx.fillStyle = g;
  ctx.beginPath(); ctx.arc(x, y, r, 0, 6.2832); ctx.fill();

  /* işaret — yüksüz kürede işaret yok */
  if (!yuksuz) {
    ctx.strokeStyle = '#FFFFFF'; ctx.lineWidth = 2.6; ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(x - r * .42, y); ctx.lineTo(x + r * .42, y);
    if (arti) { ctx.moveTo(x, y - r * .42); ctx.lineTo(x, y + r * .42); }
    ctx.stroke();
  }
  ctx.restore();

  /* Yükler birbirine yaklaşınca iki etiket üst üste biner; bu yüzden
     etiketler DIŞA doğru hizalanır: soldaki sola, sağdaki sağa taşar. */
  if (etiket)
    D.yaziAydinlik(ctx, etiket, x + kaydir, y - r - 12, R.mur,
                   '700 12px system-ui, sans-serif', hiza);
  return r;
}

/* --------------------------------------------- Gerçekçi görünüm */

function cizGercek(ctx, w, h, st, p) {
  const { X } = olcekle(w, st, p);
  const tezgahY = h - 56;
  const merkezY = tezgahY - 54;

  /* laboratuvar tezgâhı */
  ctx.fillStyle = '#C9A06A'; ctx.fillRect(0, tezgahY, w, 12);
  ctx.fillStyle = '#A07B45'; ctx.fillRect(0, tezgahY + 12, w, h - tezgahY - 12);
  ctx.fillStyle = '#8A6838';
  for (let x = 12; x < w; x += 46) ctx.fillRect(x, tezgahY + 16, 26, 3);

  const x1 = X(st.x1), x2 = X(st.x2);

  /* ray (sürtünmesiz) */
  ctx.fillStyle = '#9AA5B1'; ctx.fillRect(8, tezgahY - 4, w - 16, 4);
  ctx.fillStyle = '#7D8A99';
  for (let x = 8; x < w - 8; x += 18) ctx.fillRect(x, tezgahY - 4, 2, 4);

  /* sabit yük: yalıtkan ayak · serbest yük: araba */
  const ayak = x => {
    ctx.fillStyle = '#6E7684';
    ctx.fillRect(x - 3, merkezY, 6, tezgahY - merkezY);
    ctx.fillStyle = '#4A5059';
    ctx.fillRect(x - 13, tezgahY - 7, 26, 7);
  };
  const araba = x => {
    ctx.fillStyle = '#5F6B78';
    D.yuvarlakDik(ctx, x - 16, tezgahY - 22, 32, 18, 4); ctx.fill();
    ctx.fillStyle = '#2E3D57';
    [-8, 8].forEach(dx => {
      ctx.beginPath(); ctx.arc(x + dx, tezgahY - 3, 4.5, 0, 6.2832); ctx.fill();
    });
    ctx.fillStyle = '#6E7684';
    ctx.fillRect(x - 2.5, merkezY, 5, tezgahY - 22 - merkezY);
  };
  if (p.mod < 1.5) araba(x1); else ayak(x1);
  araba(x2);

  const r1 = yukKuresi(ctx, x1, merkezY, p.q1, 'q₁ = ' + D.biçim(p.q1) + ' μC', 'right', -6);
  const r2 = yukKuresi(ctx, x2, merkezY, p.q2, 'q₂ = ' + D.biçim(p.q2) + ' μC', 'left', 6);

  /* uzaklık ölçüsü */
  D.olcu(ctx, x1, tezgahY - 30, x2, tezgahY - 30,
         'd = ' + D.biçim(uz(st) * 100) + ' cm', R.mur);

  /* kuvvet okları — Newton III: eşit büyüklük, zıt yön */
  const F = kuvvet(p, uz(st));
  if (!kuvvetYok(p)) {
    const boy = Math.min(78, 22 + Math.sqrt(F) * 34);
    const y2 = yon(p);
    /* İtmede oklar küreden DIŞA çıkar. Çekmede ise ok, kürenin DIŞ yanından
       küreye doğru (öbür yüke yönelik) çizilir: yükler yaklaştığında oklar
       birbirinin üstünden geçip dışa bakıyormuş gibi — yani itme gibi —
       görünmesin. */
    if (y2 > 0) {
      D.vektor(ctx, x1 - r1, merkezY, x1 - r1 - boy, merkezY, R.kuvvet, '', { kalinlik: 3 });
      D.vektor(ctx, x2 + r2, merkezY, x2 + r2 + boy, merkezY, R.kuvvet, '', { kalinlik: 3 });
    } else {
      D.vektor(ctx, x1 - r1 - boy, merkezY, x1 - r1 - 2, merkezY, R.kuvvet, '', { kalinlik: 3 });
      D.vektor(ctx, x2 + r2 + boy, merkezY, x2 + r2 + 2, merkezY, R.kuvvet, '', { kalinlik: 3 });
    }
    /* Yük etiketleri küre üstünde duruyor; F etiketi onlarla çakışmasın diye
       belirgin biçimde daha yukarı alındı. */
    D.yaziAydinlik(ctx, 'F = ' + D.biçim(F) + ' N', (x1 + x2) / 2, merkezY - 54,
                   R.kuvvet, '700 13px system-ui, sans-serif', 'center');
  }

  /* Rozet, panel köşesindeki "GERÇEKÇİ GÖRÜNÜM" etiketinin altına yerleşir. */
  D.rozet(ctx, kuvvetYok(p) ? 'YÜKSÜZ CİSİM VAR · KUVVET YOK'
              : cekiyor(p) ? 'ZIT YÜKLER · ÇEKME' : 'AYNI YÜKLER · İTME',
          w / 2, 52,
          kuvvetYok(p) ? 'rgba(110,118,132,.92)'
            : cekiyor(p) ? 'rgba(47,111,208,.92)' : 'rgba(226,72,63,.92)', '#FFFFFF',
          '700 12px system-ui, sans-serif', true);

  D.yaziAydinlik(ctx, 'ağır çekim ×' + AGIR + ' · t = ' + D.biçim(st.t, 3) + ' s (gerçek)',
                 12, h - 12, R.mur, '600 11px system-ui, sans-serif', 'left');

  if (st.durdu)
    D.yaziAydinlik(ctx, st.carpisti ? 'yükler çarpıştı' : 'yükler ayrıldı (2,4 m)',
                   w - 12, h - 12, R.mur, '600 11px system-ui, sans-serif', 'right');
  else if (kuvvetYok(p))
    D.yaziAydinlik(ctx, 'kuvvet yok ⟹ yükler kıpırdamaz',
                   w - 12, h - 12, R.mur, '600 11px system-ui, sans-serif', 'right');
}

/* ----------------------------------------- Klasik fizik görünümü */

function cizKlasik(ctx, w, h, st, p) {
  D.izgara(ctx, w, h, 26);
  const { X } = olcekle(w, st, p);
  const ekseny = Math.round(h * 0.42);

  /* x ekseni */
  ctx.strokeStyle = K.eksen; ctx.lineWidth = 1.6;
  ctx.beginPath(); ctx.moveTo(24, ekseny); ctx.lineTo(w - 16, ekseny); ctx.stroke();
  D.yaziHaleli(ctx, 'x', w - 12, ekseny - 10, K.metin2, '11px system-ui, sans-serif', 'right');

  const x1 = X(st.x1), x2 = X(st.x2);
  const F = kuvvet(p, uz(st));
  const y2 = yon(p);

  /* yükler nokta cisim olarak */
  D.noktaCisim(ctx, x1, ekseny, 7, yukRengi(p.q1));
  D.noktaCisim(ctx, x2, ekseny, 7, yukRengi(p.q2));
  D.yaziHaleli(ctx, 'q₁ ' + isaretli(p.q1) + ' μC',
               x1 - 6, ekseny + 22, K.beyaz, '600 11px system-ui, sans-serif', 'right');
  D.yaziHaleli(ctx, 'q₂ ' + isaretli(p.q2) + ' μC',
               x2 + 6, ekseny + 22, K.beyaz, '600 11px system-ui, sans-serif', 'left');

  /* d ölçüsü */
  /* Çekme durumunda kuvvet okları içe bakar ve etiketleri eksenin hemen
     üstünde kalır; ölçü çizgisi onların üstünden geçsin. */
  D.olcu(ctx, x1, ekseny - 52, x2, ekseny - 52,
         'd = ' + D.biçim(uz(st)) + ' m', K.metin2);

  /* eşit ve zıt kuvvet vektörleri — q₁·q₂ = 0 ise kuvvet yok, ok da yok */
  if (y2 !== 0) {
    const boy = Math.min(62, 20 + Math.sqrt(F) * 28);
    if (y2 > 0) {                       // itme: noktadan dışa
      D.vektor(ctx, x1, ekseny, x1 - boy, ekseny, R.kuvvet, 'F₂₁', { kalinlik: 2.6 });
      D.vektor(ctx, x2, ekseny, x2 + boy, ekseny, R.kuvvet, 'F₁₂', { kalinlik: 2.6 });
    } else {                            // çekme: dış yandan noktaya doğru
      D.vektor(ctx, x1 - boy - 8, ekseny, x1 - 8, ekseny, R.kuvvet, 'F₂₁', { kalinlik: 2.6 });
      D.vektor(ctx, x2 + boy + 8, ekseny, x2 + 8, ekseny, R.kuvvet, 'F₁₂', { kalinlik: 2.6 });
    }
  } else {
    D.yaziHaleli(ctx, 'q₁·q₂ = 0  →  F = 0  (yüksüz cisme elektriksel kuvvet etki etmez)',
                 12, ekseny - 22, R.normal, '600 11px system-ui, sans-serif', 'left');
  }

  /* hesap dökümü */
  const dd = Math.max(uz(st), EN_YAKIN);
  const satir = [
    ['F = k · |q₁·q₂| / d²', K.beyaz, '700 12px system-ui, sans-serif'],
    ['k = 9·10⁹ N·m²/C²', K.metin2, '11px system-ui, sans-serif'],
    ['|q₁·q₂| = ' + D.biçim(Math.abs(p.q1 * p.q2)) + ' · 10⁻¹² C²', K.metin2, '11px system-ui, sans-serif'],
    ['d² = ' + D.biçim(dd * dd, 3) + ' m²', K.metin2, '11px system-ui, sans-serif'],
    ['F = ' + D.biçim(F) + ' N', R.kuvvet, '700 13px system-ui, sans-serif']
  ];
  let sy = h - 14 - (satir.length - 1) * 17;
  satir.forEach(([t, c, f]) => {
    D.yaziHaleli(ctx, t, w - 12, sy, c, f, 'right'); sy += 17;
  });

  /* Newton III vurgusu — sağdaki hesap dökümüyle aynı satıra düşmesin */
  if (y2 !== 0)
    D.yaziHaleli(ctx, '|F₁₂| = |F₂₁|  — yükler farklı olsa bile eşittir (Newton III)',
                 12, ekseny + 46, R.normal, '600 11px system-ui, sans-serif', 'left');

  {
    const a = F / kutleKg(p);
    D.yaziHaleli(ctx, (p.mod < 1.5 ? 'iki yük de serbest:  a₁ = a₂ = F/m = ' : 'q₂ serbest:  a = F/m = ') + D.biçim(a) + ' m/s²' +
                 (y2 !== 0 ? '  (SABİT DEĞİL)' : ''),
                 12, 20, R.ivme, '600 11px system-ui, sans-serif', 'left');
    D.yaziHaleli(ctx, 'ϑ = ' + D.biçim(Math.abs(st.v2)) + ' m/s',
                 12, 37, R.hiz, '600 11px system-ui, sans-serif', 'left');
  }
}

/* ------------------------------------------------------- Grafikler */

function cizGrafik(ctx, w, h, st, p) {
  const pay = 8, gw = (w - pay * 3) / 2, gh = h - 6;

  /* F − d eğrisi: ters kare yasası gözle görünür olsun */
  /* Serbest düzenekte yük 2,4 m’ye kadar itilebilir; eksen onu da kapsar ki
     çalışma noktası kenara yapışmasın. Yaklaşırken (d < 10 cm) üst sınır da
     büyür. */
  const dMax = 2.4;
  const dMin = Math.max(EN_YAKIN, Math.min(0.08, uz(st)));
  const veri = [];
  for (let d = dMin; d <= dMax + 1e-9; d += (dMax - dMin) / 120) veri.push({ t: d, v: kuvvet(p, d) });
  const Fmax = kuvvet(p, Math.min(0.1, uz(st)));

  D.miniGrafik(ctx, {
    x: pay, y: 3, w: gw, h: gh,
    baslik: kuvvetYok(p) ? 'F − d   (q₁·q₂ = 0 → her uzaklıkta F = 0)'
                         : 'F − d   (ters kare:  d 2 katına → F dörtte bire)',
    birim: 'N', tEtiket: 'd (m)',
    imlec: { t: uz(st), v: kuvvet(p, uz(st)) },
    veri, tMax: dMax, vMin: 0, vMax: Math.max(1e-6, Fmax * 1.05),
    renk: R.kuvvet
  });

  /* ikinci grafik: serbest yükün hızı (1. düzenekte iki yük aynı hızla) */
  {
    D.miniGrafik(ctx, {
      x: pay * 2 + gw, y: 3, w: gw, h: gh,
      /* Eğim = ivme = F/m. Yaklaşan (çeken) yükte F büyür → eğim ARTAR;
         uzaklaşan (iten) yükte F küçülür → eğim AZALIR. */
      baslik: kuvvetYok(p) ? 'ϑ − t   (kuvvet yok · yük durgun)'
            : cekiyor(p) ? 'ϑ − t   (yaklaşıyor · eğim artıyor)'
                         : 'ϑ − t   (uzaklaşıyor · eğim azalıyor)',
      birim: 'm/s',
      veri: st.kayit, tMin: st.kayit.length ? st.kayit[0].t : 0,
      tMax: Math.max(0.05, st.t), vMin: 0,
      vMax: Math.max(0.1, Math.abs(st.v2) * 1.2),
      renk: R.hiz
    });
  }
}

/* ----------------------------------------------------------- Okumalar */

function okumalar(st, p) {
  const F = kuvvet(p, uz(st));
  const o = [
    { et: 'q₁',            dg: D.biçim(p.q1),          birim: 'μC' },
    { et: 'q₂',            dg: D.biçim(p.q2),          birim: 'μC' },
    { et: 'Uzaklık  d',    dg: D.biçim(uz(st) * 100),   birim: 'cm' },
    { et: 'Kuvvet  F',     dg: D.biçim(F),             birim: 'N' },
    { et: 'Tür',           dg: turMetni(p), birim: '' }
  ];
  o.push({ et: 'İvme  a', dg: D.biçim(F / kutleKg(p)), birim: 'm/s²' });
  o.push({ et: p.mod < 1.5 ? 'Her yükün hızı  ϑ' : 'q₂ hızı  ϑ', dg: D.biçim(Math.abs(st.v2)), birim: 'm/s' });
  return o;
}

/* ------------------------------------------------------------- Tanım */

D.simler = D.simler || {};
D.simler['elektriksel-kuvvet'] = {
  id: 'elektriksel-kuvvet',
  baslik: '2.1.1 · Coulomb yasası · iki nokta yük',
  yukseklik: 330,
  grafikPanel: true,
  grafikYukseklik: 175,
  parametreler: [
    { anahtar: 'mod', etiket: 'Düzenek', tur: 'secim', deger: 1, secenekler: [
      { d: 1, e: 'İki yük de serbest (Newton III)' },
      { d: 2, e: 'q₁ sabit, q₂ serbest' }
    ]},
    { anahtar: 'q1', etiket: 'Yük q₁', min: -10, max: 10, adim: 1, deger: 3,  birim: 'μC' },
    { anahtar: 'q2', etiket: 'Yük q₂', min: -10, max: 10, adim: 1, deger: -2, birim: 'μC' },
    { anahtar: 'd',  etiket: 'Başlangıç uzaklığı d', min: 10, max: 100, adim: 5, deger: 30, birim: 'cm' },
    { anahtar: 'm',  etiket: 'Serbest yükün kütlesi', min: 10, max: 200, adim: 10, deger: 50, birim: 'g' }
  ],
  durum, adim, bitti, cizGercek, cizKlasik, cizGrafik, okumalar
};

})();
