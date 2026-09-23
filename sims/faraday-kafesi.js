(function () {
"use strict";
window.F11 = window.F11 || {};

/* ==========================================================================
   sims/faraday-kafesi.js
   --------------------------------------------------------------------------
   Konu 2.1.3 · Faraday kafesi   (MEB 11, s.178-185)

   TEMEL SONUÇ
   -----------
   Dengeye gelmiş bir iletkenin İÇİNDE elektriksel alan sıfırdır:
       E_iç = E_dış + E_indüklenen = 0
   Dış alan yok olmaz; iletkenin yüzeyinde ayrışan yükler tam olarak onu
   götüren bir alan üretir. Yani "kalkan" pasif bir engel değil, AKTİF bir
   dengelemedir. Simülasyonun anlatmak istediği tek cümle budur.

   ÜÇ DÜZENEK  (kitaptaki örneklerle birebir)
   ------------------------------------------
   1) Düzgün dış alan : Yükler ayrışırken içerideki alanın sıfıra inişi
      animasyonla izlenir. Gerçekte bu süre ~10⁻¹⁹ s’dir; sınıfta görülebilsin
      diye yavaşlatılmıştır ve ekranda bu açıkça yazar.

   2) Yıldırım        : Araca/uçağa çarpan yük, gövdenin DIŞ yüzeyinden akar.
      İçerideki yolcu güvendedir (MEB s.179).

   3) Asansörde telefon: Kafes gözü, dalga boyundan çok küçükse dalga giremez.
      Telefon sinyali için λ ≈ 33 cm; birkaç cm’lik göz bile yeterlidir.
   ========================================================================== */

const D = window.F11;
const { R, K } = D;

/* Gerçek gevşeme süresi ~10⁻¹⁹ s. Ekranda görülebilmesi için ölçeklendi. */
const AYRISMA_SURESI = 1.2;     // s (sahne zamanı)
const ISIK_HIZI = 3e8;

/* ------------------------------------------------------------- Fizik */

/** Yüzey yüklerinin ayrışma oranı: 0 (henüz yok) → 1 (tam denge).
    Gerçek iletkende iç alan ÜSTEL olarak söner: E_iç = E₀·e^(−t/τ).
    τ, %99 dengeye AYRISMA_SURESI’nde varılacak biçimde seçildi. */
const TAU = AYRISMA_SURESI / Math.log(100);
function ayrismaOrani(st, p) {
  if (p.mod > 1.5) return 1;                       // diğer düzeneklerde denge kurulmuş
  return 1 - Math.exp(-st.t / TAU);
}

/** İletkenin İÇİNDEKİ alan (N/C). Denge kurulunca sıfırlanır. */
/** Taranan göz aralığıyla güncellenmiş parametreler. */
function etkin(st, p) {
  return Object.assign({}, p, { goz: (st && st.goz != null) ? st.goz : p.goz });
}

function icAlan(st, p) {
  return p.E0 * (1 - ayrismaOrani(st, p));
}

/** Telefon sinyalinin dalga boyu (m). */
function dalgaBoyu(p) { return ISIK_HIZI / (p.f * 1e6); }

/** Kafes gözü dalga boyunun kaçta biri? Küçükse ekranlama iyi. */
function gozOran(p) { return (p.goz / 100) / dalgaBoyu(p); }

function gecerMi(p) { return gozOran(p) > 0.5; }

/** Kafesten geçen dalganın GENLİK oranı. Göz λ/2’den küçükse delik dalgayı
    geçiremez; geçen genlik yaklaşık 2·göz/λ olur (ekranlama etkinliği
    SE ≈ 20·log(λ / 2·göz) dB). Göz ≥ λ/2 ise dalga olduğu gibi geçer. */
function gecenGenlik(p) { return Math.min(1, 2 * gozOran(p)); }

function sinyalMetni(p) {
  const T = gecenGenlik(p);
  return T >= 1 ? 'Tam geçer' : T > 0.3 ? 'Zayıflar' : 'Giremez';
}

/** Sahnede λ ve göz AYNI ölçekle çizilir (piksel / cm). */
const PX_CM = 2;

/* -------------------------------------------------------------- Durum */

function durum(p) {
  return { t: 0, kayit: [], yildirimY: -0.2, aktif: false };
}

function adim(st, dt, p) {
  st.t += dt;
  /* Kafes göz aralığı taranır (yalnız asansör düzeneğinde anlamlı):
     ekranlamanın λ/2 eşiğinde nasıl çöktüğü hem sahnede hem Ekranlama−göz
     eğrisinde canlı görünür. */
  if (p.mod > 2.5) st.goz = D.tarama(st.t, p.goz, p.goz < 20 ? 40 : 1, 12);

  if (p.mod < 1.5) {
    if (st.kayit.length === 0 || st.t - st.kayit[st.kayit.length - 1].t > 0.01)
      st.kayit.push({ t: st.t, v: icAlan(st, p) });
  } else if (p.mod < 2.5) {
    /* yıldırım: yukarıdan iner, gövdeye ulaşınca yüzeyden yere akar */
    st.yildirimY = Math.min(YILDIRIM_SON, st.yildirimY + dt * 1.6);
    st.aktif = st.yildirimY >= 1;
    /* Dış yüzeyden akan akım: çarpma anında tepe (~30 kA), sonra hızla söner.
       Gerçekte bu birkaç yüz mikrosaniyedir — burada ağır çekim. */
    const akim = st.aktif ? 30 * Math.exp(-(st.yildirimY - 1) / 0.5) : 0;
    if (st.kayit.length === 0 || st.t - st.kayit[st.kayit.length - 1].t > 0.01)
      st.kayit.push({ t: st.t, v: akim });
  }
}

/* Çarpmadan sonra yükün dış yüzeyden yere akışı ~2 s izlenir. */
const YILDIRIM_SON = 4.4;

function bitti(st, p) {
  if (p.mod < 1.5) return st.t > AYRISMA_SURESI * 1.8;
  if (p.mod < 2.5) return st.yildirimY >= YILDIRIM_SON;
  return false;
}

/* ------------------------------------------------- Çizim yardımcıları */

/** Kafes gövdesi — köşeleri yuvarlatılmış iletken kutu. */
function kafes(ctx, x, y, w, h, kenarRenk, dolgu) {
  ctx.save();
  D.yuvarlakDik(ctx, x, y, w, h, 12);
  if (dolgu) { ctx.fillStyle = dolgu; ctx.fill(); }
  ctx.strokeStyle = kenarRenk; ctx.lineWidth = 5; ctx.stroke();
  ctx.restore();
}

/**
 * Yüzeydeki indüklenen yükler.
 * Dış alan DÜŞEYDİR (üstte + levha, altta − levha ⟹ alan aşağı doğru).
 * Elektronlar alana ZIT yönde, yani YUKARI kayar:
 *     üst yüzey → negatif,  alt yüzey → pozitif
 * Yükleri sağ-sol yüzeylere koymak, yatay alan varmış gibi görünür ve
 * yanlış olur; bu yüzden dağılım üst ve alt kenarlar boyuncadır.
 */
function yuzeyYukleri(ctx, x, y, w, h, oran) {
  if (oran <= 0.02) return;
  const adet = 6;
  ctx.save();
  ctx.font = '700 15px system-ui, sans-serif';
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.globalAlpha = Math.min(1, oran * 1.3);
  for (let i = 0; i < adet; i++) {
    const xx = x + 18 + (i / (adet - 1)) * (w - 36);
    /* Kenarın biraz içine çizilir; üstteki E_iç etiketiyle çakışmasın. */
    ctx.fillStyle = '#2F6FD0'; ctx.fillText('−', xx, y + 12);
    ctx.fillStyle = '#E2483F'; ctx.fillText('+', xx, y + h - 12);
  }
  ctx.restore();
}

/* --------------------------------------------- Gerçekçi görünüm */

function cizGercek(ctx, w, h, st, pHam) {
  const p = etkin(st, pHam);
  if (p.mod < 1.5)      cizDuzgunAlan(ctx, w, h, st, p);
  else if (p.mod < 2.5) cizYildirim(ctx, w, h, st, p);
  else                  cizSinyal(ctx, w, h, st, p);
}

function cizDuzgunAlan(ctx, w, h, st, p) {
  const oran = ayrismaOrani(st, p);
  const kx = w * 0.30, kw = w * 0.40;
  const ky = h * 0.24, kh = h * 0.50;

  /* levhalar */
  ctx.fillStyle = '#E2483F'; ctx.fillRect(14, ky - 34, w - 28, 8);
  ctx.fillStyle = '#2F6FD0'; ctx.fillRect(14, ky + kh + 26, w - 28, 8);

  /* dış alan çizgileri — kafesin içine GİRMEZ */
  ctx.save();
  ctx.strokeStyle = 'rgba(120,150,200,.85)'; ctx.lineWidth = 1.4;
  const adet = 11;
  for (let i = 0; i < adet; i++) {
    const x = 26 + (i + 0.5) * ((w - 52) / adet);
    const icerde = x > kx && x < kx + kw;
    ctx.globalAlpha = 1;
    ctx.beginPath();
    if (!icerde) {
      ctx.moveTo(x, ky - 26); ctx.lineTo(x, ky + kh + 26);
      ctx.stroke();
    } else {
      /* Dış çizgiler yüzeyde biter (orada yüzey yüküne bağlanır); içerideki
         kısım iç alanla orantılı olarak SOLAR — denge kurulunca hiç kalmaz. */
      ctx.moveTo(x, ky - 26); ctx.lineTo(x, ky);
      ctx.moveTo(x, ky + kh); ctx.lineTo(x, ky + kh + 26);
      ctx.stroke();
      ctx.globalAlpha = 1 - oran;
      ctx.beginPath(); ctx.moveTo(x, ky); ctx.lineTo(x, ky + kh); ctx.stroke();
    }
  }
  ctx.restore();

  kafes(ctx, kx, ky, kw, kh, '#7D8A99', 'rgba(255,255,255,.55)');
  yuzeyYukleri(ctx, kx, ky, kw, kh, oran);

  /* içerideki test yükü ve ona etkiyen kuvvet */
  const cx = kx + kw / 2, cy = ky + kh / 2;
  D.noktaCisim(ctx, cx, cy, 7, R.ivme);
  const Eic = icAlan(st, p);
  if (Eic > p.E0 * 0.04) {
    const boy = 18 + (Eic / Math.max(p.E0, 1)) * 34;
    D.vektor(ctx, cx, cy, cx, cy + boy, R.kuvvet, '', { kalinlik: 2.4 });
  } else {
    D.yaziAydinlik(ctx, 'F = 0', cx, cy + 24, R.hiz, '700 12px system-ui, sans-serif', 'center');
  }

  D.yaziAydinlik(ctx, 'E_iç = ' + D.biçim(Eic) + ' N/C', cx, ky - 10,
                 Eic > p.E0 * 0.04 ? R.kuvvet : R.hiz,
                 '700 13px system-ui, sans-serif', 'center');
  D.yaziAydinlik(ctx, 'E_dış = ' + D.biçim(p.E0) + ' N/C', w - 10, 18, R.normal,
                 '700 12px system-ui, sans-serif', 'right');

  D.rozet(ctx, oran >= 0.99 ? 'DENGE KURULDU' : 'YÜKLER AYRIŞIYOR…', w / 2, 52,
          oran >= 0.99 ? 'rgba(53,192,138,.92)' : 'rgba(255,176,32,.92)',
          oran >= 0.99 ? '#0A2A1E' : '#2A1E05', '700 11px system-ui, sans-serif', true);

  D.yaziAydinlik(ctx, 'gerçekte ≈ 10⁻¹⁹ s — burada yavaşlatıldı', 10, h - 10,
                 R.mur, '600 10px system-ui, sans-serif', 'left');
}

function cizYildirim(ctx, w, h, st, p) {
  const yolY = h - 34;
  ctx.fillStyle = '#55555A'; ctx.fillRect(0, yolY, w, h - yolY);
  ctx.strokeStyle = '#C8C8C0'; ctx.lineWidth = 2; ctx.setLineDash([16, 14]);
  ctx.beginPath(); ctx.moveTo(0, yolY + 16); ctx.lineTo(w, yolY + 16); ctx.stroke();
  ctx.setLineDash([]);

  /* araç gövdesi */
  const ax = w * 0.30, aw = w * 0.40, ah = 62;
  const ay = yolY - ah - 10;
  ctx.fillStyle = '#2F6FD0';
  D.yuvarlakDik(ctx, ax, ay, aw, ah, 12); ctx.fill();
  ctx.fillStyle = '#8FB6EC';
  D.yuvarlakDik(ctx, ax + aw * 0.20, ay + 8, aw * 0.28, 22, 5); ctx.fill();
  D.yuvarlakDik(ctx, ax + aw * 0.54, ay + 8, aw * 0.28, 22, 5); ctx.fill();
  ctx.fillStyle = '#23272E';
  [[ax + aw * 0.22, yolY - 8], [ax + aw * 0.78, yolY - 8]].forEach(([x, y]) => {
    ctx.beginPath(); ctx.arc(x, y, 11, 0, 6.2832); ctx.fill();
  });

  /* yolcu */
  D.noktaCisim(ctx, ax + aw / 2, ay + ah * 0.62, 7, R.ivme);

  /* yıldırım — zikzak kalıbı SABİT (her karede rastgele titremesin) */
  const tepe = 4, hedef = ay;
  const ilerleme = Math.min(1, Math.max(0, st.yildirimY));
  const yy = tepe + (hedef - tepe) * ilerleme;
  ctx.save();
  ctx.strokeStyle = '#FFD24A'; ctx.lineWidth = 4; ctx.lineJoin = 'round';
  /* çarptıktan sonra kanal sönerek kaybolur */
  if (st.aktif) ctx.globalAlpha = Math.max(0.15, 1 - (st.yildirimY - 1) * 0.5);
  ctx.beginPath();
  let cx = ax + aw / 2;
  ctx.moveTo(cx, tepe);
  for (let y = tepe, k = 0; y < yy; y += 22, k++) {
    cx += Math.sin(k * 2.39 + 0.7) * 9;
    ctx.lineTo(cx, Math.min(y + 22, yy));
  }
  ctx.stroke(); ctx.restore();

  /* gövdede akan yük — yalnızca DIŞ yüzeyde, çatıdan yanlara ve tekerlek
     hizasından yere */
  if (st.aktif) {
    ctx.save();
    ctx.strokeStyle = '#FFD24A'; ctx.lineWidth = 3.4; ctx.globalAlpha = .9;
    D.yuvarlakDik(ctx, ax, ay, aw, ah, 12); ctx.stroke();
    ctx.restore();
    const ts = st.yildirimY / 1.6;
    D.akimAkisi(ctx, ax + aw / 2, ay, ax + 6, ay, ts, '#FFB020', 1.2, 4);
    D.akimAkisi(ctx, ax + aw / 2, ay, ax + aw - 6, ay, ts, '#FFB020', 1.2, 4);
    D.akimAkisi(ctx, ax, ay + 6, ax, yolY, ts, '#FFB020', 1.2, 3);
    D.akimAkisi(ctx, ax + aw, ay + 6, ax + aw, yolY, ts, '#FFB020', 1.2, 3);
    D.yaziAydinlik(ctx, 'yük DIŞ yüzeyden akıyor', ax + aw / 2, ay - 14,
                   '#B07800', '700 12px system-ui, sans-serif', 'center');
    D.yaziAydinlik(ctx, 'içeride E = 0 · yolcu güvende', ax + aw / 2, ay + ah + 22,
                   R.hiz, '700 12px system-ui, sans-serif', 'center');
  }

  D.rozet(ctx, 'MEB s.179 · araca ve uçağa yıldırım', w / 2, 52,
          'rgba(47,111,208,.92)', '#FFFFFF', '700 11px system-ui, sans-serif', true);
}

function cizSinyal(ctx, w, h, st, p) {
  const kx = w * 0.42, kw = w * 0.34, ky = h * 0.18, kh = h * 0.62;

  /* baz istasyonu */
  ctx.strokeStyle = '#6E7684'; ctx.lineWidth = 4;
  ctx.beginPath(); ctx.moveTo(52, h - 30); ctx.lineTo(52, h * 0.30); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(38, h * 0.36); ctx.lineTo(52, h * 0.30); ctx.lineTo(66, h * 0.36); ctx.stroke();

  /* Dalga kafese kadar tam genlikle gelir; içeride genliği 2·göz/λ oranına
     düşer (göz ≥ λ/2 ise hiç düşmez). λ ve göz aynı ölçekle çizilir. Dalga
     sağa doğru İLERLER: faz (kx − ωt). */
  const T = gecenGenlik(p);
  const lam = Math.max(10, Math.min(420, dalgaBoyu(p) * 100 * PX_CM));
  ctx.save();
  ctx.lineWidth = 2.2;
  const dalgaY = x => h * 0.50 + Math.sin((x - 62) / lam * 6.2832 - st.t * 6) * 16 * (x < kx ? 1 : T);
  ctx.strokeStyle = '#E2483F';
  ctx.beginPath();
  for (let x = 62; x <= kx; x += 3) x === 62 ? ctx.moveTo(x, dalgaY(x)) : ctx.lineTo(x, dalgaY(x));
  ctx.stroke();
  if (T > 0.02) {
    ctx.strokeStyle = T >= 1 ? '#35C08A' : '#E2A23F';
    ctx.globalAlpha = Math.max(0.35, T);
    ctx.beginPath();
    for (let x = kx; x < w - 16; x += 3) x === kx ? ctx.moveTo(x, dalgaY(x)) : ctx.lineTo(x, dalgaY(x));
    ctx.stroke();
  }
  ctx.restore();

  /* asansör kafesi — göz aralığı çizilir */
  kafes(ctx, kx, ky, kw, kh, '#7D8A99', 'rgba(255,255,255,.5)');
  ctx.save();
  ctx.strokeStyle = 'rgba(125,138,153,.85)'; ctx.lineWidth = 1.2;
  const gozPx = Math.max(3, p.goz * PX_CM);
  for (let y = ky + gozPx; y < ky + kh; y += gozPx) {
    ctx.beginPath(); ctx.moveTo(kx, y); ctx.lineTo(kx + kw, y); ctx.stroke();
  }
  for (let x = kx + gozPx; x < kx + kw; x += gozPx) {
    ctx.beginPath(); ctx.moveTo(x, ky); ctx.lineTo(x, ky + kh); ctx.stroke();
  }
  ctx.restore();

  /* telefon */
  const tx = kx + kw / 2, ty = ky + kh / 2;
  ctx.fillStyle = '#23272E';
  D.yuvarlakDik(ctx, tx - 12, ty - 20, 24, 40, 4); ctx.fill();
  ctx.fillStyle = T > 0.3 ? '#2E5A48' : '#5A3030';
  D.yuvarlakDik(ctx, tx - 9, ty - 17, 18, 30, 2); ctx.fill();
  /* çekim çubukları: geçen genlikle orantılı */
  const cubuk = Math.round(4 * T);
  for (let i = 0; i < 4; i++) {
    ctx.fillStyle = i < cubuk ? '#35C08A' : 'rgba(255,255,255,.18)';
    ctx.fillRect(tx - 7 + i * 4, ty + 8 - (i + 1) * 4, 3, (i + 1) * 4);
  }

  const durumYazi = T >= 1 ? 'sinyal TAM' : T > 0.3 ? 'sinyal ZAYIF' : 'sinyal YOK';
  D.yaziAydinlik(ctx, durumYazi + '  (geçen genlik %' + D.biçim(T * 100, 0) + ')', tx, ky + kh + 20,
                 T >= 1 ? '#1A7A55' : T > 0.3 ? '#9A6A00' : '#B03030',
                 '700 13px system-ui, sans-serif', 'center');
  D.yaziAydinlik(ctx, 'λ = ' + D.biçim(dalgaBoyu(p) * 100) + ' cm  ·  göz = ' + D.biçim(p.goz) + ' cm',
                 w - 10, 18, R.mur, '700 12px system-ui, sans-serif', 'right');
}

/* ----------------------------------------- Klasik fizik görünümü */

function cizKlasik(ctx, w, h, st, pHam) {
  const p = etkin(st, pHam);
  D.izgara(ctx, w, h, 26);

  if (p.mod < 1.5) {
    /* --- Süperpozisyon: dış alan + indüklenen alan = 0 --- */
    const oran = ayrismaOrani(st, p);
    const cx = w * 0.26, cy = h * 0.34;

    D.yaziHaleli(ctx, 'İletkenin içinde ne oluyor?', 12, 22, K.beyaz,
                 '700 12px system-ui, sans-serif', 'left');

    const oklar = [
      ['E_dış', p.E0, R.normal, 0],
      ['E_ind', -p.E0 * oran, R.surtunme, 44],
      ['E_iç', p.E0 * (1 - oran), R.kuvvet, 96]
    ];
    oklar.forEach(([ad, deger, renk, dy]) => {
      const y = cy + dy;
      const boy = (deger / Math.max(p.E0, 1)) * 92;
      if (Math.abs(boy) > 2) {
        D.vektor(ctx, cx, y, cx + boy, y, renk, '', { kalinlik: 2.8 });
      } else {
        D.noktaCisim(ctx, cx, y, 5, R.hiz);
      }
      D.yaziHaleli(ctx, ad, cx - 10, y, renk, '700 12px system-ui, sans-serif', 'right');
      D.yaziHaleli(ctx, D.biçim(deger) + ' N/C', cx + 104, y, K.metin2,
                   '11px system-ui, sans-serif', 'left');
    });

    ctx.strokeStyle = K.eksen; ctx.lineWidth = 1.2;
    ctx.beginPath(); ctx.moveTo(cx - 60, cy + 72); ctx.lineTo(cx + 150, cy + 72); ctx.stroke();

    const satir = [
      ['E_iç = E_dış + E_ind', K.beyaz],
      ['Denge kurulunca:', K.metin2],
      ['E_ind = −E_dış', R.surtunme],
      ['⟹ E_iç = 0', R.hiz]
    ];
    /* Sağ sütun, sol alttaki notun üstünde biter. */
    let sy = h - 40 - (satir.length - 1) * 18;
    satir.forEach(([t, c]) => {
      D.yaziHaleli(ctx, t, w - 12, sy, c, '700 12px system-ui, sans-serif', 'right'); sy += 18;
    });

    D.yaziHaleli(ctx, 'Dış alan YOK OLMAZ — yüzey yükleri onu tam olarak götürür',
                 12, h - 16, R.ivme, '600 11px system-ui, sans-serif', 'left');

  } else if (p.mod < 2.5) {
    /* --- Yıldırım: kesit ve yük dağılımı --- */
    const kx = w * 0.16, kw = w * 0.46, ky = h * 0.26, kh = h * 0.40;
    D.yaziHaleli(ctx, 'İletken kabuk — kesit', 12, 22, K.beyaz,
                 '700 12px system-ui, sans-serif', 'left');

    ctx.save();
    D.yuvarlakDik(ctx, kx, ky, kw, kh, 10);
    ctx.strokeStyle = R.ivme; ctx.lineWidth = 4; ctx.stroke();
    ctx.restore();

    /* yükler yalnız dış yüzeyde — yıldırım çarpınca belirir */
    ctx.save();
    ctx.font = '700 13px system-ui, sans-serif';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillStyle = R.ivme;
    ctx.globalAlpha = st.aktif ? Math.min(1, (st.yildirimY - 1) * 3) : 0;
    for (let i = 0; i < 7; i++) {
      const t = i / 6;
      ctx.fillText('+', kx + t * kw, ky - 8);
      ctx.fillText('+', kx + t * kw, ky + kh + 8);
    }
    for (let i = 0; i < 3; i++) {
      const t = (i + 1) / 4;
      ctx.fillText('+', kx - 8, ky + t * kh);
      ctx.fillText('+', kx + kw + 8, ky + t * kh);
    }
    ctx.restore();

    D.noktaCisim(ctx, kx + kw / 2, ky + kh / 2, 6, R.hiz);
    D.yaziHaleli(ctx, 'E = 0', kx + kw / 2, ky + kh / 2 + 20, R.hiz,
                 '700 12px system-ui, sans-serif', 'center');

    const satir = [
      ['Yükler birbirini iter', K.metin2],
      ['⟹ en uzağa, DIŞ yüzeye kaçar', K.beyaz],
      ['⟹ iç boşlukta yük yok', K.metin2],
      ['⟹ E_iç = 0', R.hiz]
    ];
    let sy = h - 16 - (satir.length - 1) * 18;
    satir.forEach(([t, c]) => {
      D.yaziHaleli(ctx, t, w - 12, sy, c, '700 12px system-ui, sans-serif', 'right'); sy += 18;
    });

  } else {
    /* --- Sinyal: göz aralığı ile dalga boyu karşılaştırması --- */
    const lam = dalgaBoyu(p), goz = p.goz / 100;
    D.yaziHaleli(ctx, 'Ekranlama koşulu', 12, 22, K.beyaz,
                 '700 12px system-ui, sans-serif', 'left');

    /* iki uzunluğu ölçekli çubuk olarak yan yana koy */
    const bx = 30, by = h * 0.36, tam = w - 90;
    const enB = Math.max(lam, goz);
    ctx.fillStyle = R.normal;
    ctx.fillRect(bx, by, (lam / enB) * tam, 16);
    ctx.fillStyle = R.kuvvet;
    ctx.fillRect(bx, by + 34, Math.max(2, (goz / enB) * tam), 16);
    D.yaziHaleli(ctx, 'λ = ' + D.biçim(lam * 100) + ' cm', bx, by - 10, R.normal,
                 '700 11px system-ui, sans-serif', 'left');
    D.yaziHaleli(ctx, 'göz = ' + D.biçim(goz * 100) + ' cm', bx, by + 64, R.kuvvet,
                 '700 11px system-ui, sans-serif', 'left');

    const oran = gozOran(p);
    const T = gecenGenlik(p);
    const satir = [
      ['göz / λ = ' + D.biçim(oran, 3), K.beyaz],
      ['geçen genlik ≈ 2·göz/λ = %' + D.biçim(T * 100, 0), K.metin2],
      [gecerMi(p) ? 'göz > λ/2 ⟹ dalga GEÇER'
         : T > 0.3 ? 'göz < λ/2 ⟹ dalga ZAYIFLAR' : 'göz ≪ λ ⟹ dalga GİREMEZ',
       gecerMi(p) ? R.kuvvet : T > 0.3 ? R.ivme : R.hiz]
    ];
    let sy = h - 76;
    satir.forEach(([t, c]) => {
      D.yaziHaleli(ctx, t, w - 12, sy, c, '700 12px system-ui, sans-serif', 'right'); sy += 18;
    });

    D.yaziHaleli(ctx, 'Mikrodalga fırının camındaki delikler de bu yüzden küçüktür',
                 12, h - 16, R.ivme, '600 11px system-ui, sans-serif', 'left');
  }
}

/* ------------------------------------------------------- Grafikler */

function cizGrafik(ctx, w, h, st, pHam) {
  const p = etkin(st, pHam);
  const pay = 8, gw = (w - pay * 3) / 2, gh = h - 6;

  if (p.mod > 1.5 && p.mod < 2.5) {
    const tSon = YILDIRIM_SON / 1.6 + 0.2;
    D.miniGrafik(ctx, {
      x: pay, y: 3, w: gw, h: gh,
      baslik: 'Dış yüzeyden akan akım − t   (ağır çekim)', birim: 'kA',
      veri: st.kayit, tMax: tSon, vMin: 0, vMax: 32, renk: R.ivme
    });
    D.miniGrafik(ctx, {
      x: pay * 2 + gw, y: 3, w: gw, h: gh,
      baslik: 'İç boşlukta E − t   (akım ne olursa olsun SIFIR)', birim: 'N/C',
      veri: st.kayit.map(d => ({ t: d.t, v: 0 })), tMax: tSon, vMin: 0, vMax: 1, renk: R.hiz
    });
    return;
  }

  D.miniGrafik(ctx, {
    x: pay, y: 3, w: gw, h: gh,
    baslik: 'E_iç − t   (yükler ayrıştıkça sıfıra iner)', birim: 'N/C',
    veri: p.mod < 1.5 ? st.kayit : [{ t: 0, v: 0 }, { t: 1, v: 0 }],
    tMax: AYRISMA_SURESI * 1.8, vMin: 0, vMax: Math.max(1, p.E0 * 1.05),
    renk: R.kuvvet
  });

  /* ekranlama etkinliği: göz küçüldükçe artar */
  /* Ekranlama = 1 − geçen genlik = 1 − 2·göz/λ (göz ≥ λ/2 ise 0). */
  const veri = [];
  for (let g = 0.2; g <= 40; g += 0.4)
    veri.push({ t: g, v: 100 * (1 - gecenGenlik(Object.assign({}, p, { goz: g }))) });
  D.miniGrafik(ctx, {
    x: pay * 2 + gw, y: 3, w: gw, h: gh,
    baslik: 'Ekranlama − göz aralığı  (λ/2’de sıfır)', birim: '%', tEtiket: 'göz (cm)',
    /* Çalışma noktası: taranan göz aralığında ekranlamanın nereye düştüğü. */
    imlec: { t: p.goz, v: 100 * (1 - gecenGenlik(p)) },
    veri, tMax: 40, vMin: 0, vMax: 100,
    renk: R.hiz
  });
}

/* ----------------------------------------------------------- Okumalar */

function okumalar(st, pHam) {
  const p = etkin(st, pHam);
  if (p.mod < 1.5) {
    const oran = ayrismaOrani(st, p);
    return [
      { et: 'Dış alan  E_dış', dg: D.biçim(p.E0),          birim: 'N/C' },
      { et: 'Ayrışma',         dg: D.biçim(oran * 100),    birim: '%' },
      { et: 'İndüklenen alan', dg: '−' + D.biçim(p.E0 * oran), birim: 'N/C' },
      { et: 'İç alan  E_iç',   dg: D.biçim(icAlan(st, p)), birim: 'N/C' },
      { et: 'Durum',           dg: oran >= 0.99 ? 'Denge · kalkan etkin' : 'Ayrışıyor', birim: '' }
    ];
  }
  if (p.mod < 2.5) {
    return [
      { et: 'Yıldırım',     dg: st.aktif ? 'Çarptı' : 'İniyor', birim: '' },
      { et: 'Yük nerede?',  dg: 'Dış yüzeyde',                  birim: '' },
      { et: 'İç boşlukta E',dg: '0',                            birim: 'N/C' },
      { et: 'Yolcu',        dg: 'Güvende',                      birim: '' }
    ];
  }
  return [
    { et: 'Frekans  f',    dg: D.biçim(p.f),                 birim: 'MHz' },
    { et: 'Dalga boyu λ',  dg: D.biçim(dalgaBoyu(p) * 100),  birim: 'cm' },
    { et: 'Kafes gözü',    dg: D.biçim(p.goz),               birim: 'cm' },
    { et: 'göz / λ',       dg: D.biçim(gozOran(p), 3),       birim: '' },
    { et: 'Sinyal',        dg: sinyalMetni(p),               birim: '' }
  ];
}

/* ------------------------------------------------------------- Tanım */

D.simler = D.simler || {};
D.simler['faraday-kafesi'] = {
  id: 'faraday-kafesi',
  baslik: '2.1.3 · Faraday kafesi · iletkenin içinde E = 0',
  yukseklik: 330,
  grafikPanel: true,
  grafikYukseklik: 170,
  parametreler: [
    { anahtar: 'mod', etiket: 'Düzenek', tur: 'secim', deger: 1, secenekler: [
      { d: 1, e: 'Düzgün dış alandaki kafes' },
      { d: 2, e: 'Araca yıldırım çarpması' },
      { d: 3, e: 'Asansörde telefon sinyali' }
    ]},
    { anahtar: 'E0',  etiket: 'Dış alan E₀', min: 200, max: 5000, adim: 100, deger: 2000, birim: 'N/C' },
    { anahtar: 'f',   etiket: 'Sinyal frekansı', min: 100, max: 2600, adim: 100, deger: 900, birim: 'MHz' },
    { anahtar: 'goz', etiket: 'Kafes göz aralığı', min: 0.5, max: 40, adim: 0.5, deger: 2, birim: 'cm' }
  ],
  durum, adim, bitti, cizGercek, cizKlasik, cizGrafik, okumalar
};

})();
