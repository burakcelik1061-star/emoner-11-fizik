(function () {
"use strict";
window.F11 = window.F11 || {};

/* ==========================================================================
   sims/elektromiknatis.js
   --------------------------------------------------------------------------
   Konu 2.2.4 · Elektromıknatıslar ve kullanım alanları  (MEB 11, s.213-217)

   ÇEKİRDEK ETKİSİ
   ---------------
       B = μ₀ · μr · n · i
   Ferromanyetik çekirdek, alanı bağıl geçirgenliği (μr) kadar katlar.
   Yumuşak demirde μr birkaç bine çıkabilir.

   DOYMA (SATURATION) — GERÇEKÇİLİK İÇİN ÖNEMLİ
   --------------------------------------------
   Formül sınırsız büyüme öngörür ama gerçek malzeme DOYAR. Demirde bütün
   manyetik bölgeler (domainler) hizalandıktan sonra alan artık μr katıyla
   büyümez; tepe değeri yaklaşık 1,5-2 T’dır. Bu simülasyon doymayı modeller
   ve sınıra gelindiğinde ekranda açıkça belirtir. Doymayı yok sayan bir
   simülasyon, akımı artırdıkça saçma değerler üretirdi.

   KALDIRMA KUVVETİ
   ----------------
       F = B² · A / (2μ₀)
   Kutup yüzeyi A olan bir elektromıknatısın demire uyguladığı çekme kuvveti.
   Kuvvetin B’nin KARESİYLE artması, alanı iki katına çıkarmanın kaldırma
   gücünü dört katına çıkarması demektir.
   ========================================================================== */

const D = window.F11;
const { R, K } = D;

const MU0 = 4 * Math.PI * 1e-7;
const G = 10;

/* Çekirdek malzemeleri — bağıl geçirgenlik ve doyma alanı */
/* Bağıl geçirgenlikler, hava aralığı bulunan gerçek bir elektromıknatıstaki
   ETKİN değerlerdir. Kapalı bir demir halkada μr binlerce olabilir, ama hava
   aralığı manyetik devreye baskın gelir ve etkin değeri çok düşürür.
   Doyma alanları malzemenin gerçek üst sınırlarıdır. */
const CEKIRDEK = {
  1: { ad: 'Hava (çekirdeksiz)', mur: 1,    doyma: 99,  renk: null },
  2: { ad: 'Nikel',              mur: 100,  doyma: 0.6, renk: '#9AA5B1' },
  3: { ad: 'Ferrit',             mur: 600,  doyma: 0.4, renk: '#3A3A42' },
  4: { ad: 'Yumuşak demir',      mur: 1200, doyma: 1.8, renk: '#6E7684' }
};
function cek(p) { return CEKIRDEK[Math.round(p.cekirdek)] || CEKIRDEK[4]; }

/* ------------------------------------------------------------- Fizik */

function sarimYog(p) { return p.N / (p.L / 100); }

/** Doymayı HESABA KATMADAN önceki ham alan (T). */
function alanHam(p) {
  return MU0 * cek(p).mur * sarimYog(p) * Math.abs(p.i);
}

/**
 * Gerçek alan (T).
 * Malzeme doymayı ANİDEN yapmaz; eğri yumuşak biçimde bükülüp doyma değerine
 * yaklaşır. tanh bu davranışı iyi temsil eder:
 *     düşük akımda  B ≈ B_doğrusal   (tanh x ≈ x)
 *     yüksek akımda B → B_doyma      (tanh x → 1)
 * Sert bir Math.min kullanmak, akımın belli bir değerinden sonra eğrinin
 * köşeli biçimde kırılmasına ve kaydırıcının hiçbir etkisinin kalmamasına
 * yol açıyordu — gerçek bir çekirdek böyle davranmaz.
 */
function alan(p) {
  const c = cek(p);
  if (c.doyma > 90) return alanHam(p);          // hava doymaz
  return c.doyma * Math.tanh(alanHam(p) / c.doyma);
}

/** Doymaya YAKIN mı? (doyma değerinin %85’ini geçtiyse) */
function doymusMu(p) { return alan(p) > cek(p).doyma * 0.85; }

/** Kutup yüzeyi (m²) — dairesel kesit. */
function kutupAlani(p) {
  const r = p.A / 100 / 2;
  return Math.PI * r * r;
}

/* Temas verimi.
   F = B²A/(2μ₀) ifadesi, kutup yüzeyinin demire KUSURSUZ yapıştığı ideal
   durumu verir ve gerçekte ulaşılamayan bir ÜST SINIRDIR. Uygulamada
   yüzey pürüzü, pas, boya ve hurdanın düz olmaması yüzünden temas kısmidir;
   ayrıca aradaki mikron ölçekli hava aralığı manyetik devreye baskın gelir.
   Sanayi tipi kaldırma mıknatıslarının kataloglarındaki değerler, ideal
   hesabın kabaca üçte biri ile yarısı arasındadır. Bu çarpan olmadan
   simülasyon, 14 cm’lik bir mıknatısa 4 ton kaldırtıyordu. */
const TEMAS_VERIMI = 0.40;

/** Kaldırma kuvveti (N) — gerçekçi temas verimi uygulanmış. */
function kaldirmaKuvveti(p) {
  const B = alan(p);
  return ((B * B * kutupAlani(p)) / (2 * MU0)) * TEMAS_VERIMI;
}

/** İdeal (kusursuz temas) üst sınırı — karşılaştırma için. */
function idealKuvvet(p) {
  const B = alan(p);
  return (B * B * kutupAlani(p)) / (2 * MU0);
}

/** Kaldırabileceği kütle (kg). */
function kaldirilanKutle(p) { return kaldirmaKuvveti(p) / G; }

/* -------------------------------------------------------------- Durum */

/* VİNÇ DÖNGÜSÜ
   Mıknatıs yüke uzaktan kuvvet uygulayıp onu yerden çekmez — kuvvet aradaki
   boşlukla çok hızlı düşer. Gerçekte vinç mıknatısı yükün ÜSTÜNE indirir,
   temas anında akım yükü tutar ve vinç kaldırır. Kaldırma kuvveti yükün
   ağırlığından azsa (ya da akım azalırsa) yük kopar ve SERBEST DÜŞER. */
const KALDIRMA_H = 1.5;          // m — vincin kaldırma yüksekliği
const VINC_PERIYOT = 7;          // s

/** Mıknatısın alt yüzünün, yerdeki yükün üst yüzünden yüksekliği (m). */
function vincYuksekligi(t) {
  const u = t % VINC_PERIYOT;
  if (u < 2)   return KALDIRMA_H * (1 - u / 2);          // iniyor
  if (u < 2.8) return 0;                                  // temas
  if (u < 4.8) return KALDIRMA_H * (u - 2.8) / 2;         // kaldırıyor
  return KALDIRMA_H;                                      // yukarıda bekliyor
}

function durum(p) {
  /* st.i: canlı (taranan) akım · yukH: yükün yerden yüksekliği (m) */
  return { t: 0, cekildi: false, vurus: 0, zilFaz: 0,
           yukH: 0, yukV: 0, bagli: false, koptu: false, kayit: [], vKayit: [] };
}

function adim(st, dt, p) {
  st.t += dt;
  /* Akım taranır: B'nin doyuma gidişi hem sahnede hem B−i eğrisi üzerindeki
     çalışma noktasında canlı görünür. Akımın YÖNÜ korunur; kaydırıcı
     taramanın başladığı akımdır. */
  /* Zilde akım taranmaz (zil sabit akımla çalışır); akım sıfır seçildiyse
     hiçbir düzenekte akım verilmez. */
  const s = p.i < 0 ? -1 : 1;
  st.i = p.mod > 1.5 || p.i === 0 ? p.i
       : D.tarama(st.t, p.i, s * (Math.abs(p.i) < 5 ? 10 : 0.5), 12);
  const pe = etkin(st, p);

  if (p.mod > 1.5) {
    /* Zil: elektromıknatıs çeker → kontak açılır → yay geri çeker → kapanır.
       Akım yoksa mıknatıslık da yoktur: dil kıpırdamaz, zil çalmaz. */
    if (pe.i !== 0) {
      const hiz = 8 + Math.abs(pe.i) * 1.2;
      st.zilFaz = (st.zilFaz + dt * hiz) % 2;
      const yeni = st.zilFaz < 1;
      if (yeni !== st.cekildi) { st.cekildi = yeni; if (yeni) st.vurus++; }
    } else st.cekildi = false;
    /* Bobin akımı: kontak KAPALIYKEN akar, dil çekilip kontak açılınca kesilir.
       Kaydı kesintili (aç-kapa) bir akım verir. */
    if (st.kayit.length === 0 || st.t - st.kayit[st.kayit.length - 1].t > 0.004) {
      st.kayit.push({ t: st.t, v: st.cekildi || pe.i === 0 ? 0 : Math.abs(pe.i) });
      st.vKayit.push({ t: st.t, v: st.vurus });
    }
    if (st.kayit.length > 500) { st.kayit.shift(); st.vKayit.shift(); }
    return;
  }

  const hm = vincYuksekligi(st.t);
  const yeter = kaldirilanKutle(pe) >= p.yuk;
  if (st.bagli && !yeter) { st.bagli = false; st.koptu = true; }   // kuvvet yetmedi
  if (!st.bagli && yeter && st.yukH <= 1e-6 && hm <= 1e-6) { st.bagli = true; st.koptu = false; }

  if (st.bagli) { st.yukH = hm; st.yukV = 0; }
  else if (st.yukH > 0) {
    st.yukV += G * dt;                                  // serbest düşme
    st.yukH = Math.max(0, st.yukH - st.yukV * dt);
    if (st.yukH === 0) st.yukV = 0;
  }
}

/** Taranan akımla güncellenmiş parametreler. */
function etkin(st, p) {
  return Object.assign({}, p, { i: (st && st.i != null) ? st.i : p.i });
}

function bitti() { return false; }

/* --------------------------------------------- Gerçekçi görünüm */

function cizGercek(ctx, w, h, st, pHam) {
  const p = etkin(st, pHam);
  if (p.mod > 1.5) { cizZil(ctx, w, h, st, p); return; }
  cizVinc(ctx, w, h, st, p);
}

function cizVinc(ctx, w, h, st, p) {
  const zeminY = h - 40;
  ctx.fillStyle = '#8A7B62'; ctx.fillRect(0, zeminY, w, h - zeminY);
  ctx.fillStyle = '#6E6250';
  for (let x = 8; x < w; x += 40) ctx.fillRect(x, zeminY + 10, 22, 3);

  const cx = w * 0.46;
  const c = cek(p);
  const B = alan(p);

  /* ölçek: yük yerdeyken üst yüzü ile vincin en üst konumu arası KALDIRMA_H */
  const yeter = kaldirilanKutle(p) >= p.yuk;
  const yukBoy = 38 + Math.min(46, p.yuk / 18);
  const gh = 74;
  const tamAlt = zeminY - yukBoy;                     // yerdeki yükün üst yüzü (px)
  const enUst = 58 + gh;                              // mıknatısın en yüksek alt yüzü (px)
  const pxM = (tamAlt - enUst) / KALDIRMA_H;
  const hm = vincYuksekligi(st.t);

  /* tavan kirişi ve halat */
  ctx.fillStyle = '#5F6B78'; ctx.fillRect(0, 6, w, 10);
  ctx.strokeStyle = '#3A4049'; ctx.lineWidth = 3;
  const gy = tamAlt - hm * pxM - gh;                  // mıknatıs gövdesinin üstü
  ctx.beginPath(); ctx.moveTo(cx, 16); ctx.lineTo(cx, gy); ctx.stroke();

  /* elektromıknatıs gövdesi (U biçimli) */
  const gw = Math.min(150, w * 0.26);
  const gx = cx - gw / 2;
  ctx.fillStyle = c.renk || '#4A5059';
  ctx.fillRect(gx, gy, gw, 22);
  ctx.fillRect(gx, gy, 26, gh);
  ctx.fillRect(gx + gw - 26, gy, 26, gh);

  /* sarımlar */
  ctx.save();
  ctx.strokeStyle = '#B87333'; ctx.lineWidth = 4;
  const sarim = Math.max(3, Math.min(8, Math.round(p.N / 60)));
  for (let k = 0; k < sarim; k++) {
    const yy = gy + 28 + k * ((gh - 34) / sarim);
    ctx.beginPath(); ctx.moveTo(gx - 4, yy); ctx.lineTo(gx + 30, yy); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(gx + gw - 30, yy); ctx.lineTo(gx + gw + 4, yy); ctx.stroke();
  }
  ctx.restore();

  /* kutup etiketleri — gövdenin İÇ yüzüne; akım yoksa kutup da yok */
  const kutupY = gy + gh;
  if (p.i !== 0) {
    D.rozet(ctx, p.i > 0 ? 'N' : 'S', gx + 40, kutupY - 14,
            p.i > 0 ? '#E2483F' : '#2F6FD0', '#FFFFFF', '700 13px system-ui, sans-serif', true);
    D.rozet(ctx, p.i > 0 ? 'S' : 'N', gx + gw - 40, kutupY - 14,
            p.i > 0 ? '#2F6FD0' : '#E2483F', '#FFFFFF', '700 13px system-ui, sans-serif', true);
  }

  /* kaldırılan hurda — mıknatısa bağlıysa onunla yükselir, koparsa düşer */
  const yukY = tamAlt - st.yukH * pxM;
  ctx.fillStyle = '#7D8A99';
  D.yuvarlakDik(ctx, cx - yukBoy * 0.9, yukY, yukBoy * 1.8, yukBoy, 6); ctx.fill();
  ctx.fillStyle = '#5F6B78';
  ctx.fillRect(cx - yukBoy * 0.55, yukY + yukBoy * 0.3, yukBoy * 1.1, 5);
  D.yaziAydinlik(ctx, D.biçim(p.yuk) + ' kg', cx, yukY + yukBoy * 0.62, '#1B2430',
                 '700 13px system-ui, sans-serif', 'center');

  /* bilgi */
  const rozetYazi = st.bagli ? 'YÜKÜ TUTUYOR' : st.koptu ? 'YÜK KOPTU · SERBEST DÜŞME'
                  : yeter ? 'YETERLİ · temas bekleniyor' : 'KUVVET YETERSİZ';
  D.rozet(ctx, rozetYazi, w / 2, 52,
          yeter ? 'rgba(53,192,138,.92)' : 'rgba(226,72,63,.92)',
          yeter ? '#0A2A1E' : '#FFFFFF', '700 12px system-ui, sans-serif', true);

  /* Panel etiketi sol üstte, rozet üst ortada; bu yazılar onların altına konur. */
  D.yaziAydinlik(ctx, c.ad, 10, 44, R.mur, '700 12px system-ui, sans-serif', 'left');
  D.yaziAydinlik(ctx, 'B = ' + D.biçim(B, 3) + ' T', w - 10, 44, R.normal,
                 '700 12px system-ui, sans-serif', 'right');
  D.yaziAydinlik(ctx, 'kaldırır: ' + D.biçim(kaldirilanKutle(p)) + ' kg',
                 w - 10, 62, R.kuvvet, '700 12px system-ui, sans-serif', 'right');

  if (doymusMu(p))
    D.yaziAydinlik(ctx, '⚠ DOYMAYA YAKIN — akımı artırmanın faydası kalmadı',
                   w / 2, h - 12, '#B03030', '700 11px system-ui, sans-serif', 'center');
  else
    D.yaziAydinlik(ctx, 'akımı kesersen mıknatıslık kaybolur — yük düşer',
                   10, h - 12, R.mur, '600 11px system-ui, sans-serif', 'left');
}

function cizZil(ctx, w, h, st, p) {
  const cy = h * 0.50;
  const solX = w * 0.16;

  /* pil ve devre */
  ctx.fillStyle = '#4A5059';
  D.yuvarlakDik(ctx, 14, cy + 54, 44, 24, 4); ctx.fill();
  D.yaziAydinlik(ctx, 'pil', 36, cy + 66, '#FFFFFF', '600 10px system-ui, sans-serif', 'center');

  const akimVar = p.i !== 0;

  /* elektromıknatıs */
  const mx = solX + 60, my = cy - 16;
  ctx.fillStyle = '#6E7684';
  ctx.fillRect(mx, my, 26, 52);
  ctx.fillRect(mx + 54, my, 26, 52);
  ctx.save(); ctx.strokeStyle = '#B87333'; ctx.lineWidth = 4;
  for (let k = 0; k < 5; k++) {
    const yy = my + 8 + k * 9;
    ctx.beginPath(); ctx.moveTo(mx - 4, yy); ctx.lineTo(mx + 30, yy); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(mx + 50, yy); ctx.lineTo(mx + 84, yy); ctx.stroke();
  }
  ctx.restore();

  /* çekirdek akım varken renklenir */
  if (st.cekildi) {
    ctx.save(); ctx.globalAlpha = .5; ctx.fillStyle = '#E2483F';
    ctx.fillRect(mx, my, 26, 52); ctx.fillRect(mx + 54, my, 26, 52);
    ctx.restore();
  }

  /* hareketli demir dil (armatür) — çekilince sağa/aşağı gider */
  const dilX = mx + 100;
  const sapma = st.cekildi ? 14 : 0;
  ctx.save();
  ctx.strokeStyle = '#9AA5B1'; ctx.lineWidth = 6; ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(dilX, cy - 46);
  ctx.lineTo(dilX - sapma, cy + 34);
  ctx.stroke();
  ctx.restore();

  /* Tokmak dilin alt ucundaki çubuğun ucundadır. Dil mıknatısa (SOLA)
     çekilince tokmak da sola gider ve mıknatısın altındaki ÇANA vurur. */
  const tokX = dilX - sapma * 1.6, tokY = cy + 80;
  ctx.strokeStyle = '#7D8A99'; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(dilX - sapma, cy + 34); ctx.lineTo(tokX, tokY - 8); ctx.stroke();
  ctx.fillStyle = '#B87333';
  ctx.beginPath(); ctx.arc(tokX, tokY, 9, 0, 6.2832); ctx.fill();

  /* çan: sağ kenarı, çekilmiş tokmağın sol kenarına denk gelir */
  const canR = 30;
  const canX = dilX - 14 * 1.6 - 9 - canR;             // sabit; 14 = çekilmiş dilin sapması
  ctx.fillStyle = '#C9A24B';
  ctx.beginPath(); ctx.arc(canX, tokY, canR, 0, 6.2832); ctx.fill();
  ctx.fillStyle = '#8A6B25';
  ctx.beginPath(); ctx.arc(canX, tokY, 8, 0, 6.2832); ctx.fill();

  if (st.cekildi) {
    /* vuruş anı: çandan ses dalgaları yayılır */
    ctx.save();
    ctx.strokeStyle = '#E0A000'; ctx.lineWidth = 2.4;
    [12, 22, 32].forEach(r => {
      ctx.beginPath(); ctx.arc(canX, tokY, canR + r, Math.PI * 0.55, Math.PI * 1.45); ctx.stroke();
    });
    ctx.restore();
  }

  /* kontak — çekilince AÇILIR, devre kesilir */
  const kx = dilX + 6, ky = cy - 46;
  ctx.strokeStyle = st.cekildi ? '#B03030' : '#35C08A';
  ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(kx, ky); ctx.lineTo(kx + 26, ky - (st.cekildi ? 12 : 0));
  ctx.stroke();
  D.yaziAydinlik(ctx, st.cekildi ? 'kontak AÇIK' : 'kontak KAPALI', kx + 40, ky - 6,
                 st.cekildi ? '#B03030' : '#1A7A55', '700 11px system-ui, sans-serif', 'left');

  D.rozet(ctx, akimVar ? 'ELEKTRİKLİ ZİL · kendi kendini kesen devre' : 'AKIM YOK · zil çalmaz', w / 2, 52,
          akimVar ? 'rgba(47,111,208,.92)' : 'rgba(110,118,132,.92)', '#FFFFFF',
          '700 11px system-ui, sans-serif', true);
  D.yaziAydinlik(ctx, 'vuruş: ' + st.vurus, w - 10, h - 12, R.mur,
                 '700 12px system-ui, sans-serif', 'right');
  D.yaziAydinlik(ctx, 'akım → çeker → kontak açılır → akım kesilir → yay geri çeker → tekrar',
                 10, h - 12, R.mur, '600 10px system-ui, sans-serif', 'left');
}

/* ----------------------------------------- Klasik fizik görünümü */

function cizKlasik(ctx, w, h, st, pHam) {
  const p = etkin(st, pHam);
  D.izgara(ctx, w, h, 26);
  const c = cek(p);
  const B = alan(p), Bham = alanHam(p);

  if (p.mod > 1.5) {
    D.yaziHaleli(ctx, 'Zil devresi — kesintili çalışma', 12, 22, K.beyaz,
                 '700 12px system-ui, sans-serif', 'left');
    const adim = [
      ['1', 'Devre kapalı · akım geçer', R.hiz],
      ['2', 'Elektromıknatıs demir dili ÇEKER', R.normal],
      ['3', 'Dil hareket edince KONTAK AÇILIR', R.kuvvet],
      ['4', 'Akım kesilir · mıknatıslık biter', R.ivme],
      ['5', 'Yay dili geri çeker · kontak kapanır', R.hiz],
      ['→', 'Döngü saniyede onlarca kez tekrarlanır', K.metin2]
    ];
    /* Döngünün o anki adımı vurgulanır: dil çekiliyken 2–3–4, bırakılmışken
       5–1. Akım yoksa hiçbir adım işlemez. */
    const z = st.zilFaz || 0;
    const etkinAdim = p.i === 0 ? -1 : z < 1 ? (z < 0.33 ? 1 : z < 0.66 ? 2 : 3) : (z < 1.5 ? 4 : 0);
    let sy = 52;
    adim.forEach(([n, t, c2], i) => {
      if (i === etkinAdim) {
        ctx.save(); ctx.fillStyle = 'rgba(255,196,60,.22)';
        ctx.fillRect(10, sy - 12, w * 0.62, 22); ctx.restore();
      }
      D.yaziHaleli(ctx, n, 22, sy, c2, '700 13px system-ui, sans-serif', 'center');
      D.yaziHaleli(ctx, t, 40, sy, c2 === K.metin2 ? K.metin2 : K.beyaz,
                   '12px system-ui, sans-serif', 'left');
      sy += 24;
    });
    if (p.i === 0)
      D.yaziHaleli(ctx, 'Akım yok ⟹ döngü başlamaz', w - 12, 52, R.kuvvet,
                   '700 12px system-ui, sans-serif', 'right');
    D.yaziHaleli(ctx, 'Anahtar fikir: mıknatıslık AÇILIP KAPANABİLİYOR',
                 12, h - 16, R.ivme, '600 11px system-ui, sans-serif', 'left');
    return;
  }

  /* --- kaldırma düzeneği --- */
  D.yaziHaleli(ctx, 'Çekirdek ve doyma', 12, 22, K.beyaz,
               '700 12px system-ui, sans-serif', 'left');

  /* B - i eğrisi: doğrusal sonra doyma platosu */
  const gx = 40, gy = 48, gw2 = Math.min(210, w * 0.40), gh2 = h - gy - 58;
  ctx.strokeStyle = K.eksen; ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.moveTo(gx, gy); ctx.lineTo(gx, gy + gh2); ctx.lineTo(gx + gw2, gy + gh2);
  ctx.stroke();
  D.yaziHaleli(ctx, 'B', gx - 8, gy + 4, K.metin2, '11px system-ui, sans-serif', 'right');
  D.yaziHaleli(ctx, 'i', gx + gw2 + 6, gy + gh2, K.metin2, '11px system-ui, sans-serif', 'left');

  const iMax = 10;
  /* Havada doyma yoktur ve alan mT mertebesindedir; ölçek o zaman 10 A’deki
     alana göre kurulur, yoksa eğri eksene yapışık kalırdı. */
  const bTepe = c.doyma > 90 ? Math.max(1e-6, MU0 * sarimYog(p) * iMax * 1.15) : c.doyma * 1.25;
  ctx.save();
  ctx.strokeStyle = R.normal; ctx.lineWidth = 2.6;
  ctx.beginPath();
  for (let k = 0; k <= 60; k++) {
    const ii = (k / 60) * iMax;
    const bb = c.doyma > 90 ? MU0 * c.mur * sarimYog(p) * ii
                            : c.doyma * Math.tanh(MU0 * c.mur * sarimYog(p) * ii / c.doyma);
    const X = gx + (ii / iMax) * gw2;
    const Y = gy + gh2 - (bb / bTepe) * gh2;
    k ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y);
  }
  ctx.stroke(); ctx.restore();

  /* doyma çizgisi */
  if (c.doyma < 90) {
    const Yd = gy + gh2 - (c.doyma / bTepe) * gh2;
    D.kesikliCizgi(ctx, gx, Yd, gx + gw2, Yd, R.kuvvet, 1.4, [5, 4]);
    D.yaziHaleli(ctx, 'doyma ' + D.biçim(c.doyma, 2) + ' T', gx + gw2, Yd - 8, R.kuvvet,
                 '600 10px system-ui, sans-serif', 'right');
  }

  /* anlık nokta */
  const Xi = gx + (Math.min(Math.abs(p.i), iMax) / iMax) * gw2;
  const Yi = gy + gh2 - (B / bTepe) * gh2;
  D.noktaCisim(ctx, Xi, Yi, 5, R.ivme);

  /* sağ sütun */
  const bx = gx + gw2 + 26;
  const satir = [
    ['B = μ₀·μr·n·i', K.beyaz, '700 12px system-ui, sans-serif'],
    ['μr = ' + D.biçim(c.mur), R.ivme, '11px system-ui, sans-serif'],
    ['n = ' + D.biçim(sarimYog(p)) + ' sarım/m', K.metin2, '11px system-ui, sans-serif'],
    ['Doyma olmasa: ' + D.biçim(Bham, 2) + ' T', K.metin2, '11px system-ui, sans-serif'],
    ['Gerçek: ' + D.biçim(B, 3) + ' T' + (doymusMu(p) ? ' ⚠' : ''),
     doymusMu(p) ? R.kuvvet : R.normal, '700 12px system-ui, sans-serif'],
    ['', K.metin2, '11px'],
    ['F = B²·A / (2μ₀)', K.beyaz, '700 12px system-ui, sans-serif'],
    ['A = ' + D.biçim(kutupAlani(p) * 1e4) + ' cm²', K.metin2, '11px system-ui, sans-serif'],
    ['ideal: ' + D.biçim(idealKuvvet(p)) + ' N', K.metin2, '11px system-ui, sans-serif'],
    ['gerçek: ' + D.biçim(kaldirmaKuvveti(p)) + ' N', R.kuvvet, '700 12px system-ui, sans-serif'],
    ['m = ' + D.biçim(kaldirilanKutle(p)) + ' kg', R.hiz, '700 12px system-ui, sans-serif']
  ];
  let sy = 46;
  satir.forEach(([t, c2, f]) => {
    if (t) D.yaziHaleli(ctx, t, bx, sy, c2, f, 'left');
    sy += 17;
  });

  D.yaziHaleli(ctx, 'F ∝ B² — alan 2 katına çıkarsa kaldırma gücü 4 katına',
               12, h - 16, R.ivme, '600 11px system-ui, sans-serif', 'left');
}

/* ------------------------------------------------------- Grafikler */

function cizGrafik(ctx, w, h, st, pHam) {
  const p = etkin(st, pHam);
  const pay = 8, gw = (w - pay * 3) / 2, gh = h - 6;
  const c = cek(p);

  if (p.mod > 1.5) {
    /* Zil: bobin akımı aç-kapa (kare dalga) ve vuruş sayısı */
    const kay = st.kayit || [], vk = st.vKayit || [];
    const t0 = kay.length ? kay[0].t : 0;
    D.miniGrafik(ctx, {
      x: pay, y: 3, w: gw, h: gh,
      baslik: 'Bobin akımı − t   (kontak aç-kapa · KESİNTİLİ)', birim: 'A',
      veri: kay, tMin: t0, tMax: Math.max(t0 + 0.5, st.t), vMin: 0,
      vMax: Math.max(1, Math.abs(p.i) * 1.2), renk: R.ivme
    });
    D.miniGrafik(ctx, {
      x: pay * 2 + gw, y: 3, w: gw, h: gh,
      baslik: 'Vuruş sayısı − t   (akım büyükse daha hızlı)', birim: 'kez',
      veri: vk, tMin: t0, tMax: Math.max(t0 + 0.5, st.t), vMin: 0,
      vMax: Math.max(5, st.vurus * 1.2), renk: R.kuvvet
    });
    return;
  }

  const v1 = [];
  for (let ii = 0; ii <= 10; ii += 0.2)
    v1.push({ t: ii, v: c.doyma > 90 ? MU0 * c.mur * sarimYog(p) * ii
                                      : c.doyma * Math.tanh(MU0 * c.mur * sarimYog(p) * ii / c.doyma) });
  D.miniGrafik(ctx, {
    x: pay, y: 3, w: gw, h: gh,
    baslik: 'B − i   (doyma sonrası DÜZLEŞİR)', birim: 'T', tEtiket: 'i (A)',
    imlec: { t: Math.abs(p.i), v: alan(p) },
    veri: v1, tMax: 10, vMin: 0,
    vMax: c.doyma > 90 ? Math.max(1e-6, v1[v1.length - 1].v * 1.1) : Math.min(c.doyma, 2) * 1.2,
    renk: R.normal
  });

  const v2 = [];
  for (let ii = 0; ii <= 10; ii += 0.2) {
    const bb = c.doyma > 90 ? MU0 * c.mur * sarimYog(p) * ii
                            : c.doyma * Math.tanh(MU0 * c.mur * sarimYog(p) * ii / c.doyma);
    v2.push({ t: ii, v: ((bb * bb * kutupAlani(p)) / (2 * MU0)) * TEMAS_VERIMI / G });
  }
  D.miniGrafik(ctx, {
    x: pay * 2 + gw, y: 3, w: gw, h: gh,
    baslik: 'Kaldırılan kütle − i   (F ∝ B²)', birim: 'kg', tEtiket: 'i (A)',
    imlec: { t: Math.abs(p.i), v: kaldirilanKutle(p) },
    veri: v2, tMax: 10, vMin: 0,
    vMax: Math.max(1, v2[v2.length - 1].v * 1.1),
    renk: R.kuvvet
  });
}

/* ----------------------------------------------------------- Okumalar */

function okumalar(st, pHam) {
  const p = etkin(st, pHam);
  const c = cek(p);
  if (p.mod > 1.5) {
    return [
      { et: 'Düzenek',   dg: 'Elektrikli zil',                   birim: '' },
      { et: 'Kontak',    dg: p.i === 0 ? 'KAPALI (akım yok)' : st.cekildi ? 'AÇIK' : 'KAPALI', birim: '' },
      { et: 'Vuruş',     dg: String(st.vurus),                   birim: 'kez' },
      { et: 'Akım  i',   dg: D.biçim(Math.abs(p.i)),             birim: 'A' },
      { et: 'Çalışma',   dg: 'Kendi kendini keser',              birim: '' }
    ];
  }
  return [
    { et: 'Çekirdek',      dg: c.ad,                        birim: '' },
    { et: 'μr',            dg: D.biçim(c.mur),              birim: '' },
    { et: 'Doyma olmasa',  dg: D.biçim(alanHam(p), 3),      birim: 'T' },
    { et: 'Gerçek  B',     dg: D.biçim(alan(p), 3) + (doymusMu(p) ? ' ⚠' : ''), birim: 'T' },
    { et: 'Kaldırma  F',   dg: D.biçim(kaldirmaKuvveti(p)), birim: 'N' },
    { et: 'Kaldırdığı',    dg: D.biçim(kaldirilanKutle(p)), birim: 'kg' },
    { et: 'Yük',           dg: st.bagli ? 'Tutuluyor' : st.koptu ? 'Koptu' : 'Yerde', birim: '' }
  ];
}

/* ------------------------------------------------------------- Tanım */

D.simler = D.simler || {};
D.simler['elektromiknatis'] = {
  id: 'elektromiknatis',
  baslik: '2.2.4 · Elektromıknatıs · çekirdek, doyma, kaldırma',
  yukseklik: 340,
  grafikPanel: true,
  grafikYukseklik: 170,
  parametreler: [
    { anahtar: 'mod', etiket: 'Düzenek', tur: 'secim', deger: 1, secenekler: [
      { d: 1, e: 'Hurda vinci (kaldırma)' },
      { d: 2, e: 'Elektrikli zil' }
    ]},
    { anahtar: 'cekirdek', etiket: 'Çekirdek', tur: 'secim', deger: 4, secenekler: [
      { d: 1, e: 'Hava (çekirdeksiz) · μr = 1' },
      { d: 2, e: 'Nikel · etkin μr ≈ 100' },
      { d: 3, e: 'Ferrit · etkin μr ≈ 600' },
      { d: 4, e: 'Yumuşak demir · etkin μr ≈ 1200' }
    ]},
    { anahtar: 'N', etiket: 'Sarım sayısı N', min: 20, max: 600, adim: 10, deger: 200, birim: '' },
    { anahtar: 'L', etiket: 'Bobin uzunluğu L', min: 5, max: 60, adim: 5, deger: 20, birim: 'cm' },
    { anahtar: 'i', etiket: 'Akım i', min: -10, max: 10, adim: 0.5, deger: 1.5, birim: 'A' },
    { anahtar: 'A', etiket: 'Kutup çapı', min: 2, max: 40, adim: 2, deger: 14, birim: 'cm' },
    { anahtar: 'yuk', etiket: 'Kaldırılacak yük', min: 10, max: 2000, adim: 10, deger: 300, birim: 'kg' }
  ],
  durum, adim, bitti, cizGercek, cizKlasik, cizGrafik, okumalar
};

})();
