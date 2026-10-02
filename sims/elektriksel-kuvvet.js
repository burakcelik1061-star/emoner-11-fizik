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

   NÖTR CİSİM (etki ile kutuplanma)
   --------------------------------
   Yüklü bir cisim nötr bir cismi DAİMA ÇEKER — yükün işareti fark etmez.
   Nötr cisim kutuplanır: yüklü cisme bakan yüzünde ZIT, uzak yüzünde AYNI
   işaretli yük toplanır. Zıt yük daha yakın olduğundan çekme itmeden büyüktür
   (kitapta nötr elektroskop ve yün kazağa sürtülen balon örnekleri).
   Küreler a = 2 cm yarıçaplı iletken kabul edilir. Nötr iletken küre ile
   nokta yük arasındaki kuvvet görüntü (yansıma) yük yöntemiyle TAM olarak:
       F = k·q²·a³·(2d² − a²) / (d³·(d² − a²)²)  ≈  2·k·q²·a³ / d⁵   (d ≫ a)
   Coulomb kuvvetinden çok daha zayıftır ve 1/d⁵ ile azalır.

   DOKUNMA
   -------
   Özdeş iki iletken küre değince toplam yük eşit paylaşılır:
       q₁′ = q₂′ = (q₁ + q₂)/2
   Nötr küre bu yüzden değdiği anda yüklenir ve İTİLİR.

   BİRİMLER
   --------
   Kaydırıcılarda yük μC, uzaklık cm’dir (sınıfta kullanılan ölçek). Hesap
   daima SI ile yapılır; klasik panelde çevrim açıkça gösterilir.
   q μC ve d cm iken kullanışlı kısayol:  F = 90 · q₁q₂ / d²   (N)
   ========================================================================== */

const D = window.F11;
const { R, K } = D;

const KC = 9e9;             // N·m²/C²
const A_KURE = 0.02;        // m — kürelerin yarıçapı (iletken)
const EN_YAKIN = 2 * A_KURE; // m — merkezler arası bu uzaklıkta küreler DEĞER

/* ------------------------------------------------------------- Fizik */

function q1C(p) { return p.q1 * 1e-6; }
function q2C(p) { return p.q2 * 1e-6; }

/** Yüklerden biri nötr, öbürü yüklü mü? (etki ile çekme) */
function notrVar(p) { return (p.q1 === 0) !== (p.q2 === 0); }

/** Kuvvetin BÜYÜKLÜĞÜ (N). İki yük: Coulomb. Biri nötr iletken küre:
    görüntü yük yöntemiyle tam bağıntı. İkisi de nötr: sıfır. */
function kuvvet(p, d) {
  const dd = Math.max(d, EN_YAKIN);
  if (notrVar(p)) {
    const q = q1C(p) + q2C(p), a = A_KURE;
    return KC * q * q * a * a * a * (2 * dd * dd - a * a) / (dd * dd * dd * Math.pow(dd * dd - a * a, 2));
  }
  return KC * Math.abs(q1C(p) * q2C(p)) / (dd * dd);
}

/** Çekme mi itme mi? Zıt işaretler çeker, aynı işaretler iter; yüklü cisim
    nötr cismi (işareti ne olursa olsun) çeker. İkisi de nötrse kuvvet yok. */
function cekiyor(p) { return p.q1 * p.q2 < 0 || notrVar(p); }
function kuvvetYok(p) { return p.q1 === 0 && p.q2 === 0; }

/** q₂ üzerindeki kuvvetin işaretli yönü: +1 sağa (q₁’den uzağa), −1 sola,
    0 kuvvet yok. */
function yon(p) { return kuvvetYok(p) ? 0 : cekiyor(p) ? -1 : +1; }

function turMetni(p) {
  return kuvvetYok(p) ? 'Kuvvet yok' : notrVar(p) ? 'Çekme (etki ile)' : cekiyor(p) ? 'Çekme' : 'İtme';
}

/** Kuvveti okunur birimle yazar: nötr cisme etki eden kuvvet mN–μN mertebesindedir. */
function fYaz(F) {
  if (F === 0) return '0 N';
  if (F >= 10) return D.biçim(F, 1) + ' N';
  if (F >= 0.1) return D.biçim(F, 3) + ' N';
  if (F >= 1e-3) return D.biçim(F * 1e3, 3) + ' mN';
  return D.biçim(F * 1e6, 3) + ' μN';
}

/** O anki yükler: dokunmadan sonra paylaşılmış olabilir. */
function yukler(st, p) { return Object.assign({}, p, { q1: st.q1, q2: st.q2 }); }

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

/** Çekme hareketinin gerçek süresini kabaca tahmin eder (oynatma hızı için). */
function yaklasmaSuresi(p) {
  if (!cekiyor(p)) return 0;
  const k = p.mod < 1.5 ? 2 : 1;                 // ikisi serbestse bağıl ivme 2 kat
  /* bağıl hareket, uyarlamalı adım (adım başına uzaklığın en çok binde biri) */
  let d = p.d / 100, v = 0, t = 0;
  for (let i = 0; i < 200000 && d > EN_YAKIN; i++) {
    const acc = k * kuvvet(p, d) / kutleKg(p);
    const dt = Math.min(0.001 * d / (v + 1e-12), Math.sqrt(0.002 * d / Math.max(acc, 1e-12)));
    v += acc * dt; d -= v * dt; t += dt;
  }
  return t;
}

/* Oynatma hızı (fiziksel s / ekran s). İki yükte hareket çok hızlıdır:
   AGIR kat ağır çekim. Nötr cisim çekilirken kuvvet çok zayıftır; hareket
   ekranda yaklaşık 6 s sürecek şekilde gerekirse HIZLANDIRILIR. */
function oynatmaHizi(p) {
  if (notrVar(p)) return Math.max(1 / AGIR, yaklasmaSuresi(p) / 6);   // ~6 s, en çok ×8 ağır çekim
  return 1 / AGIR;
}

function durum(p) {
  return { t: 0, x1: 0, x2: p.d / 100, v1: 0, v2: 0, durdu: false, carpisti: false, paylasti: false,
           q1: p.q1, q2: p.q2, hiz: oynatmaHizi(p), kayit: [] };
}

/* HAREKET — yalnızca Coulomb kuvvetiyle, başka hiçbir şeyle değil.
   Zıt yükler birbirine YAKLAŞIR, aynı yükler UZAKLAŞIR; yüklü küre nötr
   küreyi ÇEKER (etki ile); ikisi de nötrse HİÇBİRİ kıpırdamaz.
   1. düzenek: iki yük de serbest (eşit kütleli arabalarda). Newton III:
      q₁’e etki eden kuvvet q₂’ye etki edenle eşit ve zıttır, ikisi de hareket eder.
   2. düzenek: q₁ yerine sabitlenmiş, yalnız q₂ hareket eder.
   Kuvvet uzaklığa bağlı olduğu için her adımda yeniden hesaplanır — sabit
   ivmeli hareket DEĞİLDİR. */
/** q₂’nin ivmesi (+ sağa); q₁’inki eşit ve zıttır (Newton III, eşit kütleler). */
function ivme(p, d) { return (kuvvet(p, d) / kutleKg(p)) * yon(p); }

/* SAYISAL ÇÖZÜM — hız Verlet’i, UYARLAMALI alt adımlarla.
   Kuvvet yükler yaklaştıkça 1/d² (nötr kürede 1/d⁵) ile çok hızlı büyür; tek
   bir kare adımı bunu yakalayamaz ve enerji korunmaz (eski tek adımlı hesapta
   değme anındaki hız %5–50 yanlış çıkıyordu). Alt adım, cisim bir adımda
   uzaklığın binde birinden fazla yol almayacak şekilde seçilir; bu sayede
   ½mϑ² = ΔU enerji korunumu %0,1’in altında sağlanır. */
function adim(st, dt, pHam) {
  const dtF = dt * st.hiz;
  st.t += dtF;
  if (st.durdu) return;

  let kalan = dtF;
  for (let g = 0; g < 4000 && kalan > 0 && !st.durdu; g++) {
    const p = yukler(st, pHam);
    const serbest2 = p.mod < 1.5;
    const d = uz(st), a0 = ivme(p, d);
    const vBagil = Math.abs(st.v2 - (serbest2 ? st.v1 : 0)), aBagil = Math.abs(a0) * (serbest2 ? 2 : 1);
    let h = Math.min(kalan, 0.001 * d / (vBagil + 1e-12), Math.sqrt(0.002 * d / (aBagil + 1e-12)));
    h = Math.max(h, 1e-9);
    st.v2 += 0.5 * a0 * h; st.x2 += st.v2 * h;
    if (serbest2) { st.v1 -= 0.5 * a0 * h; st.x1 += st.v1 * h; }
    const a1 = ivme(p, uz(st));
    st.v2 += 0.5 * a1 * h;
    if (serbest2) st.v1 -= 0.5 * a1 * h;
    kalan -= h;
    if (uz(st) <= EN_YAKIN) degme(st, p);
    if (uz(st) > (st.paylasti ? gorunurUz(pHam) : 2.4)) { st.durdu = true; st.kenar = true; }
  }

  if (st.kayit.length === 0 || st.t - st.kayit[st.kayit.length - 1].t > 0.002)
    st.kayit.push({ t: st.t, v: Math.abs(st.v2) });
  if (st.kayit.length > 400) st.kayit.shift();
}

/** Küreler değdi. */
function degme(st, p) {
  {
    /* küreler DEĞDİ: uzaklığı EN_YAKIN’a sabitle (1. düzenekte simetrik).
       Özdeş iletken küreler yükü EŞİT paylaşır: q′ = (q₁ + q₂)/2. Paylaşılan
       yük sıfır değilse ikisi de aynı işaretlidir ⟹ birbirlerini İTERLER. */
    const orta = (st.x1 + st.x2) / 2;
    if (p.mod < 1.5) { st.x1 = orta - EN_YAKIN / 2; st.x2 = orta + EN_YAKIN / 2; }
    else st.x2 = st.x1 + EN_YAKIN;
    st.v1 = 0; st.v2 = 0; st.carpisti = true;
    if (!st.paylasti) {
      const q = (st.q1 + st.q2) / 2;
      st.q1 = q; st.q2 = q; st.paylasti = true;
      st.hiz = 1 / AGIR;                        // itme hızlı: ağır çekime dön
      if (q === 0) st.durdu = true;
    } else st.durdu = true;
  }
}

/* Kuvvet yoksa hareket de yok: sahne 1 s gösterilip durur. */
function bitti(st, p) { return st.durdu || (kuvvetYok(yukler(st, p)) && st.t * AGIR > 1); }

/* ------------------------------------------------- Ortak yerleşim */

/** Fiziksel x (m) → piksel dönüşümü; her iki panel de bunu kullanır. */
/** Sahnenin gösterdiği en büyük uzaklık (m). */
function kapsamAl(p) {
  const itme = !kuvvetYok(p) && !cekiyor(p);
  return Math.max(1.05, (itme ? 2.4 : p.d / 100) + 0.25);
}
/** Yük paylaşımından sonraki itmede kürelerin sahnede kalabileceği en büyük uzaklık. */
function gorunurUz(p) { return kapsamAl(p) - 0.04; }

function olcekle(w, st, p) {
  /* Ölçek hareket boyunca SABİT: yükler itiyorsa uzaklığın 2,4 m’ye kadar
     açılacağı, çekiyorsa başlangıç uzaklığı sığacak şekilde kurulur. */
  const d0 = p.d / 100;
  const kapsam = kapsamAl(p);
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

function cizGercek(ctx, w, h, st, pHam) {
  const p = yukler(st, pHam);
  const { X } = olcekle(w, st, pHam);
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
  /* nötr küre kutuplanır: yüklü küreye bakan yüzde ZIT, uzak yüzde AYNI yük */
  if (notrVar(p)) {
    const solNotr = p.q1 === 0, qY = solNotr ? p.q2 : p.q1;
    kutuplanma(ctx, solNotr ? x1 : x2, merkezY, solNotr ? r1 : r2, solNotr ? +1 : -1, qY);
  }

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
    D.yaziAydinlik(ctx, 'F = ' + fYaz(F), (x1 + x2) / 2, merkezY - 54,
                   R.kuvvet, '700 13px system-ui, sans-serif', 'center');
  }

  /* Rozet, panel köşesindeki "GERÇEKÇİ GÖRÜNÜM" etiketinin altına yerleşir. */
  D.rozet(ctx, kuvvetYok(p) ? 'İKİSİ DE NÖTR · KUVVET YOK'
              : notrVar(p) ? 'YÜKLÜ + NÖTR · ETKİ İLE ÇEKME'
              : cekiyor(p) ? 'ZIT YÜKLER · ÇEKME' : 'AYNI YÜKLER · İTME',
          w / 2, 52,
          kuvvetYok(p) ? 'rgba(110,118,132,.92)'
            : cekiyor(p) ? 'rgba(47,111,208,.92)' : 'rgba(226,72,63,.92)', '#FFFFFF',
          '700 12px system-ui, sans-serif', true);

  D.yaziAydinlik(ctx, (st.hiz < 0.95 ? 'ağır çekim ×' + D.biçim(1 / st.hiz, 1)
                      : st.hiz > 1.05 ? 'hızlandırılmış ×' + D.biçim(st.hiz, 1) : 'gerçek hız') +
                 ' · t = ' + D.biçim(st.t, 3) + ' s (gerçek)',
                 12, h - 12, R.mur, '600 11px system-ui, sans-serif', 'left');

  if (st.durdu)
    D.yaziAydinlik(ctx, st.kenar ? (st.paylasti ? 'değip itildiler · sahnenin kenarı' : 'yükler ayrıldı (2,4 m)')
                    : st.paylasti && p.q1 === 0 ? 'değdiler · toplam yük 0, ikisi de nötr' : 'küreler değdi',
                   w - 12, h - 12, R.mur, '600 11px system-ui, sans-serif', 'right');
  else if (st.paylasti)
    D.yaziAydinlik(ctx, 'Değdiler: yük eşit paylaşıldı (' + D.biçim(p.q1) + ' μC + ' + D.biçim(p.q2) + ' μC) ⟹ artık itiyorlar',
                   w / 2, 84, R.kuvvet, '700 12px system-ui, sans-serif', 'center');
  else if (kuvvetYok(p))
    D.yaziAydinlik(ctx, 'ikisi de nötr ⟹ kuvvet yok, kıpırdamazlar',
                   w - 12, h - 12, R.mur, '600 11px system-ui, sans-serif', 'right');
}

/** Nötr kürede ayrışan yükler: yüklü tarafa bakan yarıda zıt işaret (çok),
    öbür yarıda aynı işaret. yonYuklu: yüklü küre sağda +1, solda −1. */
function kutuplanma(ctx, x, y, r, yonYuklu, qYuklu) {
  const zit = qYuklu > 0 ? '−' : '+', ayni = qYuklu > 0 ? '+' : '−';
  ctx.save();
  ctx.font = '700 11px system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  [-0.55, 0, 0.55].forEach(k => {
    ctx.fillStyle = zit === '−' ? '#1D4E9E' : '#B3261E';
    ctx.fillText(zit, x + yonYuklu * r * 0.62, y + k * r * 0.7);
    ctx.fillStyle = ayni === '−' ? '#1D4E9E' : '#B3261E';
    ctx.fillText(ayni, x - yonYuklu * r * 0.62, y + k * r * 0.7);
  });
  ctx.restore();
}

/* ----------------------------------------- Klasik fizik görünümü */

function cizKlasik(ctx, w, h, st, pHam) {
  const p = yukler(st, pHam);
  D.izgara(ctx, w, h, 26);
  const { X } = olcekle(w, st, pHam);
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

  /* eşit ve zıt kuvvet vektörleri — ikisi de nötrse kuvvet yok, ok da yok */
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
    D.yaziHaleli(ctx, 'İkisi de nötr ⟹ F = 0',
                 12, ekseny - 22, R.normal, '600 11px system-ui, sans-serif', 'left');
  }

  /* hesap dökümü */
  const dd = Math.max(uz(st), EN_YAKIN);
  const qY = Math.abs(p.q1 + p.q2);
  const satir = notrVar(p) ? [
    ['Nötr iletken küre (a = 2 cm) · etki ile çekme', K.beyaz, '700 12px system-ui, sans-serif'],
    ['F = k·q²·a³·(2d² − a²) / (d³·(d² − a²)²)', K.metin2, '11px system-ui, sans-serif'],
    ['uzakta F ≈ 2·k·q²·a³ / d⁵  (1/d⁵ ile azalır)', K.metin2, '11px system-ui, sans-serif'],
    ['q = ' + D.biçim(qY) + ' μC · d = ' + D.biçim(dd * 100, 3) + ' cm', K.metin2, '11px system-ui, sans-serif'],
    ['F = ' + fYaz(F) + '   (yükün işareti fark etmez)', R.kuvvet, '700 13px system-ui, sans-serif']
  ] : [
    ['F = k · |q₁·q₂| / d²', K.beyaz, '700 12px system-ui, sans-serif'],
    ['k = 9·10⁹ N·m²/C²', K.metin2, '11px system-ui, sans-serif'],
    ['|q₁·q₂| = ' + D.biçim(Math.abs(p.q1 * p.q2)) + ' · 10⁻¹² C²', K.metin2, '11px system-ui, sans-serif'],
    ['d² = ' + D.biçim(dd * dd, 3) + ' m²', K.metin2, '11px system-ui, sans-serif'],
    ['F = ' + fYaz(F), R.kuvvet, '700 13px system-ui, sans-serif']
  ];
  let sy = h - 14 - (satir.length - 1) * 17;
  satir.forEach(([t, c, f]) => {
    D.yaziHaleli(ctx, t, w - 12, sy, c, f, 'right'); sy += 17;
  });

  /* Newton III vurgusu — sağdaki hesap dökümüyle aynı satıra düşmesin */
  if (notrVar(p))
    D.yaziHaleli(ctx, 'Nötr cisim kutuplanır: yakın yüzde ZIT yük ⟹ çekme > itme (Newton III yine geçerli)',
                 12, ekseny + 46, R.normal, '600 11px system-ui, sans-serif', 'left');
  else if (y2 !== 0)
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

function cizGrafik(ctx, w, h, st, pHam) {
  const p = yukler(st, pHam);
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
    baslik: kuvvetYok(p) ? 'F − d   (ikisi de nötr → her uzaklıkta F = 0)'
          : notrVar(p) ? 'F − d   (nötr küre: F ∝ 1/d⁵ · çok hızlı azalır)'
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

function okumalar(st, pHam) {
  const p = yukler(st, pHam);
  const F = kuvvet(p, uz(st));
  const o = [
    { et: 'q₁',            dg: D.biçim(p.q1),          birim: 'μC' },
    { et: 'q₂',            dg: D.biçim(p.q2),          birim: 'μC' },
    { et: 'Uzaklık  d',    dg: D.biçim(uz(st) * 100),   birim: 'cm' },
    { et: 'Kuvvet  F',     dg: fYaz(F).split(' ')[0], birim: fYaz(F).split(' ')[1] },
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
