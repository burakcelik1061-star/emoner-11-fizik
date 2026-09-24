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
   1) Düzgün dış alanda nötr iletken küre (MEB s.181, Şekil 2.12): alan soldan
      sağa; elektronlar alana ters kayar, sol yüzey −, sağ yüzey + olur.
      Yükler ayrışırken içerideki alanın sıfıra inişi animasyonla izlenir.
      Gerçekte bu süre ~10⁻¹⁹ s’dir; sınıfta görülebilsin diye yavaşlatılmıştır.
      Alan çizgileri TAM çözümden izlenir: çizgiler − yüklerde biter, + yüklerden
      yeniden başlar, yüzeye DİK girer; kutuplarda sıklaşır (E = 3E₀), yanlarda
      seyrelir (E = 0).

   2) Yıldırım        : Araca/uçağa çarpan yük, gövdenin DIŞ yüzeyinden akar.
      İçerideki yolcu güvendedir (MEB s.179). Koruyan metal gövdedir, lastik
      değil. Yıldırımların çoğu buluttan NEGATİF yük indirir.

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

/* 'Giremez' eşiği: ekranlama ≥ 15 dB, yani geçen genlik ≤ %18 (geçen güç
   ≤ %3). Bunun altında telefon sinyali kullanılamayacak kadar zayıflar.
   Kitaptaki örnek (göz 2 cm, λ 33 cm): genlik %12 ⟹ giremez. */
const GIREMEZ_ESIK = 0.18;

function sinyalMetni(p) {
  const T = gecenGenlik(p);
  return T >= 1 ? 'Tam geçer' : T > GIREMEZ_ESIK ? 'Zayıflar' : 'Giremez';
}

/** Ekranlama etkinliği (dB): SE = 20·log(λ / 2·göz); göz ≥ λ/2 ise 0. */
function ekranlamaDb(p) { return Math.max(0, -20 * Math.log10(gecenGenlik(p))); }

/** Sahnede λ ve göz AYNI ölçekle çizilir (piksel / cm). */
const PX_CM = 2;

/* ---- 1. düzenek: düzgün alanda nötr iletken küre (tam çözüm) ----
   Uzunluklar küre yarıçapı R birimiyle, merkez (0,0), dış alan +y yönünde.
   Yüzey yükleri (σ = 3ε₀E₀·cosθ) dışarıda, merkezdeki p = 4πε₀R³E₀ dipolünün
   alanını; içeride düzgün −E₀ alanını üretir (süperpozisyon):
       dışarıda  E = E₀ŷ + E₀·(3(ŷ·r̂)r̂ − ŷ)/r³
       içeride   E = 0
   Ayrışma sürerken yüzeydeki yük dengedekinin 'oran' katıdır; ürettiği alan da.
   Sonuçlar: kutuplarda E = 3E₀ (yüzeye dik), yanlarda E = 0. */
function toplamAlan(x, y, oran) {
  const r2 = x * x + y * y;
  if (r2 < 1) return { x: 0, y: 1 - oran };
  const r5 = r2 * r2 * Math.sqrt(r2);
  return { x: oran * 3 * x * y / r5, y: 1 + oran * (3 * y * y - r2) / r5 };
}

/** Sol levhadan (y = −H) çıkan alan çizgisini küreye ya da simetri düzlemine
    (y = 0) varana dek izler (RK2, orta nokta). Öbür yarı bunun aynadaki
    görüntüsüdür: y → −y yansımasında çizgiler aynı kalır. */
function cizgiIzle(x0, H, oran) {
  const yol = [[x0, -H]];
  let x = x0, y = -H;
  const ds = 0.03;
  for (let i = 0; i < 700; i++) {
    const a = toplamAlan(x, y, oran), m = Math.hypot(a.x, a.y);
    if (m < 1e-9) break;
    /* Orta nokta kürenin içine düşerse (dengede orada E = 0) son adım
       Euler ile atılır; aksi hâlde çizgi yüzeye değmeden kesilir. */
    const mx = x + a.x / m * ds / 2, my = y + a.y / m * ds / 2;
    const b = mx * mx + my * my < 1 ? a : toplamAlan(mx, my, oran);
    const nb = Math.hypot(b.x, b.y);
    if (nb < 1e-9) break;
    const nx = x + b.x / nb * ds, ny = y + b.y / nb * ds;
    if (nx * nx + ny * ny < 1) {                         // yüzeye ulaştı
      const s = cemberKesisim(x, y, nx, ny);
      const g = [x + (nx - x) * s, y + (ny - y) * s];
      yol.push(g);
      return { yol, giris: g };
    }
    if (ny >= 0) {                                       // simetri düzlemi
      const s = -y / (ny - y);
      yol.push([x + (nx - x) * s, 0]);
      return { yol, giris: null };
    }
    x = nx; y = ny; yol.push([x, y]);
  }
  return { yol, giris: null };
}

/** (x,y) dışarıda, (nx,ny) içeride: parçanın birim çemberi kestiği oran. */
function cemberKesisim(x, y, nx, ny) {
  const dx = nx - x, dy = ny - y;
  const a = dx * dx + dy * dy, b = 2 * (x * dx + y * dy), c = x * x + y * y - 1;
  const s = (-b - Math.sqrt(Math.max(0, b * b - 4 * a * c))) / (2 * a);
  return Math.max(0, Math.min(1, s));
}

/** Çizgi sayısı dış alanla orantılı (E₀ = 2000 N/C → 8 çizgi). */
function cizgiSayisi(p) { return Math.max(3, Math.min(20, Math.round(p.E0 / 250))); }

/** Merkezden geçen alan çizgisi boyunca E (N/C); u = uzaklık / R. */
function eksenAlani(p, oran, u) {
  const a = Math.abs(u);
  return a < 1 ? p.E0 * (1 - oran) : p.E0 * (1 + 2 * oran / (a * a * a));
}

function kureYerlesim(w, h) {
  const ust = 34, alt = h - 22, sol = 22, sag = w - 22;
  const cx = w / 2, cy = (ust + alt) / 2;
  const R = Math.min(72, (alt - ust) * 0.26, w * 0.13);
  return { cx, cy, R, ust, alt, sol, sag, H: (cx - sol) / R };
}

/* ---- 2. düzenek: yıldırım akımı ----
   Çarpma anında tepe ~30 kA (ortalama bir yıldırım), sonra hızla söner.
   Gerçekte birkaç yüz mikrosaniye sürer — burada ağır çekim. */
function yildirimAkimi(st) {
  return st.aktif ? 30 * Math.exp(-(st.yildirimY - 1) / 0.5) : 0;
}

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
    const akim = yildirimAkimi(st);
    if (st.kayit.length === 0 || st.t - st.kayit[st.kayit.length - 1].t > 0.01)
      st.kayit.push({ t: st.t, v: akim });
  }
}

/* Çarpmadan sonra yükün dış yüzeyden yere akışı ~2 s izlenir. */
const YILDIRIM_SON = 4.4;

function bitti(st, p) {
  if (p.mod < 1.5) return st.t > AYRISMA_SURESI * 2.4;
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

/* --------------------------------------------- Gerçekçi görünüm */

function cizGercek(ctx, w, h, st, pHam) {
  const p = etkin(st, pHam);
  if (p.mod < 1.5)      cizDuzgunAlan(ctx, w, h, st, p);
  else if (p.mod < 2.5) cizYildirim(ctx, w, h, st, p);
  else                  cizSinyal(ctx, w, h, st, p);
}

function cizDuzgunAlan(ctx, w, h, st, p) {
  const oran = ayrismaOrani(st, p);
  const L = kureYerlesim(w, h);
  /* matematik (x: alana dik, y: alan yönü) → ekran: alan SAĞA doğru.
     Sol yarı doğrudan izlenir, sağ yarı onun aynadaki görüntüsüdür. */
  const S = (x, y) => [L.cx + y * L.R, L.cy + x * L.R];
  const A = (x, y) => [L.cx - y * L.R, L.cy + x * L.R];

  /* levhalar: solda +, sağda − ⟹ dış alan soldan sağa */
  ctx.fillStyle = '#E2483F'; ctx.fillRect(L.sol - 8, L.ust - 6, 8, L.alt - L.ust + 12);
  ctx.fillStyle = '#2F6FD0'; ctx.fillRect(L.sag, L.ust - 6, 8, L.alt - L.ust + 12);
  ctx.save();
  ctx.font = '700 11px system-ui, sans-serif';
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = '#FFFFFF';
  for (let y = L.ust + 10; y < L.alt; y += 28) {
    ctx.fillText('+', L.sol - 4, y); ctx.fillText('−', L.sag + 4, y);
  }
  ctx.restore();

  /* küre gövdesi: önce dolgu, çizgiler üstüne, kenar en son */
  ctx.beginPath(); ctx.arc(L.cx, L.cy, L.R, 0, 6.2832);
  ctx.fillStyle = 'rgba(255,255,255,.55)'; ctx.fill();

  /* alan çizgileri — tam çözümden izlenir */
  const n = cizgiSayisi(p);
  const ustX = (L.ust - L.cy) / L.R, altX = (L.alt - L.cy) / L.R;
  const cizgiler = [];
  for (let i = 0; i < n; i++) {
    const x0 = ustX + (i + 0.5) * (altX - ustX) / n;
    const c = cizgiIzle(x0, L.H, oran);
    c.denge = oran > 0.999 ? c.giris : cizgiIzle(x0, L.H, 1).giris;
    cizgiler.push(c);
  }
  ctx.save();
  ctx.strokeStyle = 'rgba(96,130,190,.9)'; ctx.fillStyle = 'rgba(96,130,190,.95)';
  ctx.lineWidth = 1.4;
  cizgiler.forEach(c => {
    [S, A].forEach(don => {
      ctx.beginPath();
      c.yol.forEach(([x, y], k) => {
        const [px, py] = don(x, y);
        if (k) ctx.lineTo(px, py); else ctx.moveTo(px, py);
      });
      ctx.stroke();
    });
    /* yön okları: alan iki yarıda da SAĞA doğru */
    const k = Math.floor(c.yol.length * 0.4);
    if (k + 1 < c.yol.length) {
      cizgiOku(ctx, S(...c.yol[k]), S(...c.yol[k + 1]));
      cizgiOku(ctx, A(...c.yol[k + 1]), A(...c.yol[k]));
    }
    /* ayrışma sürerken içeriden geçen kısım: iç alan düzgündür (yatay çizgi)
       ve iç alanla birlikte SÖNER — denge kurulunca hiç kalmaz. */
    if (c.giris && oran < 0.995) {
      const [x1, y1] = S(...c.giris), [x2] = A(...c.giris);
      ctx.globalAlpha = 1 - oran;
      ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y1); ctx.stroke();
      ctx.globalAlpha = 1;
    }
  });
  ctx.restore();

  ctx.save();
  ctx.beginPath(); ctx.arc(L.cx, L.cy, L.R, 0, 6.2832);
  ctx.strokeStyle = '#7D8A99'; ctx.lineWidth = 5; ctx.stroke();
  ctx.restore();

  /* Yüzey yükleri, çizgilerin dengede BİTTİĞİ (−) ve yeniden BAŞLADIĞI (+)
     noktalara konur. Yük yoğunluğu σ = 3ε₀E₀·cosθ kendiliğinden görünür:
     alana bakan kutuplarda sık, yanlarda hiç yok. */
  if (oran > 0.02) {
    const ic = 1 - 11 / L.R;
    ctx.save();
    ctx.font = '700 15px system-ui, sans-serif';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.globalAlpha = Math.min(1, oran * 1.3);
    cizgiler.forEach(c => {
      if (!c.denge) return;
      const [x, y] = c.denge;
      ctx.fillStyle = '#2F6FD0'; ctx.fillText('−', ...S(x * ic, y * ic));
      ctx.fillStyle = '#E2483F'; ctx.fillText('+', ...A(x * ic, y * ic));
    });
    ctx.restore();
  }

  /* içerideki test yükü ve ona etkiyen kuvvet */
  const Eic = icAlan(st, p);
  D.noktaCisim(ctx, L.cx, L.cy, 7, R.ivme);
  if (Eic > p.E0 * 0.04) {
    const boy = 16 + (Eic / Math.max(p.E0, 1)) * (L.R - 30);
    D.vektor(ctx, L.cx, L.cy, L.cx + boy, L.cy, R.kuvvet, '', { kalinlik: 2.4 });
  } else {
    D.yaziAydinlik(ctx, 'F = 0', L.cx, L.cy + 20, R.hiz, '700 12px system-ui, sans-serif', 'center');
  }

  /* Yüzeyin hemen dışındaki alan (Physics Classroom: dengede yüzeye DİK).
     Sol kutupta dik bileşen E₀ → 3E₀ büyür; üst noktada yüzeye paralel
     bileşen E₀ → 0 söner. Paralel bileşen kaldıkça yükler kaymayı sürdürür. */
  const MOR = '#7B4FD6', kE = 15;
  const dik = 1 + 2 * oran, paralel = 1 - oran;
  const kx = L.cx - L.R - 5;
  D.vektor(ctx, kx - dik * kE, L.cy, kx, L.cy, MOR, '', { kalinlik: 2.6, ucBoy: 8 });
  D.yaziAydinlik(ctx, 'E⊥ = ' + D.biçim(dik, 2) + '·E₀', kx - 4, L.cy - 14, MOR,
                 '700 11px system-ui, sans-serif', 'right');
  const uy = L.cy - L.R - 9;
  if (paralel * kE > 3)
    D.vektor(ctx, L.cx - paralel * kE / 2, uy, L.cx + paralel * kE / 2, uy, MOR, '', { kalinlik: 2.6, ucBoy: 7 });
  D.yaziAydinlik(ctx, paralel < 0.01 ? 'E∥ = 0 · yükler durdu' : 'E∥ = ' + D.biçim(paralel, 2) + '·E₀',
                 L.cx, uy - 13, MOR, '700 11px system-ui, sans-serif', 'center');

  /* Sol üst köşe panel başlığına ayrılmıştır. */
  D.yaziAydinlik(ctx, 'E_iç = ' + D.biçim(Eic) + ' N/C', w - 12, 17,
                 Eic > p.E0 * 0.04 ? R.kuvvet : R.hiz, '700 13px system-ui, sans-serif', 'right');
  D.rozet(ctx, oran >= 0.99 ? 'DENGE KURULDU' : 'YÜKLER AYRIŞIYOR…', L.cx, L.cy + L.R + 12,
          oran >= 0.99 ? 'rgba(53,192,138,.92)' : 'rgba(255,176,32,.92)',
          oran >= 0.99 ? '#0A2A1E' : '#2A1E05', '700 11px system-ui, sans-serif', true);

  D.yaziAydinlik(ctx, 'gerçekte ≈ 10⁻¹⁹ s — burada yavaşlatıldı', 12, h - 7,
                 R.mur, '600 10px system-ui, sans-serif', 'left');
  D.yaziAydinlik(ctx, 'E_dış = ' + D.biçim(p.E0) + ' N/C  →', w - 12, h - 7, '#2A7FA0',
                 '700 12px system-ui, sans-serif', 'right');
}

/** Alan çizgisinin ortasına küçük yön oku (a → b yönünde). */
function cizgiOku(ctx, a, b) {
  const dx = b[0] - a[0], dy = b[1] - a[1], m = Math.hypot(dx, dy) || 1;
  const ux = dx / m, uy = dy / m, s = 7;
  ctx.beginPath();
  ctx.moveTo(a[0] + ux * s / 2, a[1] + uy * s / 2);
  ctx.lineTo(a[0] - ux * s / 2 - uy * s / 2, a[1] - uy * s / 2 + ux * s / 2);
  ctx.lineTo(a[0] - ux * s / 2 + uy * s / 2, a[1] - uy * s / 2 - ux * s / 2);
  ctx.closePath(); ctx.fill();
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
     hizasından yere. Akım söndükçe akış da söner: yük toprağa geçmiştir. */
  const I = yildirimAkimi(st);
  if (st.aktif && I > 0.3) {
    ctx.save();
    ctx.strokeStyle = '#FFD24A'; ctx.lineWidth = 3.4;
    ctx.globalAlpha = Math.min(0.9, 0.2 + I / 30);
    D.yuvarlakDik(ctx, ax, ay, aw, ah, 12); ctx.stroke();
    ctx.restore();
    const ts = st.yildirimY / 1.6;
    D.akimAkisi(ctx, ax + aw / 2, ay, ax + 6, ay, ts, '#FFB020', 1.2, 4);
    D.akimAkisi(ctx, ax + aw / 2, ay, ax + aw - 6, ay, ts, '#FFB020', 1.2, 4);
    D.akimAkisi(ctx, ax, ay + 6, ax, yolY, ts, '#FFB020', 1.2, 3);
    D.akimAkisi(ctx, ax + aw, ay + 6, ax + aw, yolY, ts, '#FFB020', 1.2, 3);
  }
  if (st.aktif) {
    D.yaziAydinlik(ctx, I > 0.3 ? 'yük DIŞ yüzeyden yere akıyor' : 'yük toprağa geçti',
                   ax + aw / 2, ay - 14, '#B07800', '700 12px system-ui, sans-serif', 'center');
    D.yaziAydinlik(ctx, 'içeride E = 0 · yolcu güvende', ax + aw / 2, ay + ah + 22,
                   R.hiz, '700 12px system-ui, sans-serif', 'center');
  }

  D.rozet(ctx, 'MEB s.179 · araca ve uçağa yıldırım', w / 2, 52,
          'rgba(47,111,208,.92)', '#FFFFFF', '700 11px system-ui, sans-serif', true);
  D.yaziAydinlik(ctx, 'koruyan METAL GÖVDE — lastikler değil', w - 12, 18, R.mur,
                 '700 11px system-ui, sans-serif', 'right');
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
  ctx.fillStyle = T > GIREMEZ_ESIK ? '#2E5A48' : '#5A3030';
  D.yuvarlakDik(ctx, tx - 9, ty - 17, 18, 30, 2); ctx.fill();
  /* çekim çubukları: geçen genlikle orantılı */
  const cubuk = Math.round(4 * T);
  for (let i = 0; i < 4; i++) {
    ctx.fillStyle = i < cubuk ? '#35C08A' : 'rgba(255,255,255,.18)';
    ctx.fillRect(tx - 7 + i * 4, ty + 8 - (i + 1) * 4, 3, (i + 1) * 4);
  }

  const durumYazi = T >= 1 ? 'sinyal TAM' : T > GIREMEZ_ESIK ? 'sinyal ZAYIF' : 'sinyal YOK';
  D.yaziAydinlik(ctx, durumYazi + '  (geçen genlik %' + D.biçim(T * 100, 0) + ')', tx, ky + kh + 20,
                 T >= 1 ? '#1A7A55' : T > GIREMEZ_ESIK ? '#9A6A00' : '#B03030',
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
    /* Oklar cx’ten başlar; E_ind sola baktığı için adlar okun ulaşamayacağı
       kadar solda (cx − 100) durur. */
    const cx = Math.max(w * 0.26, 140), cy = h * 0.34;

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
      D.yaziHaleli(ctx, ad, cx - 100, y, renk, '700 12px system-ui, sans-serif', 'right');
      D.yaziHaleli(ctx, D.biçim(deger) + ' N/C', cx + 104, y, K.metin2,
                   '11px system-ui, sans-serif', 'left');
    });

    ctx.strokeStyle = K.eksen; ctx.lineWidth = 1.2;
    ctx.beginPath(); ctx.moveTo(cx - 130, cy + 72); ctx.lineTo(cx + 150, cy + 72); ctx.stroke();

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

    /* yüzeyin hemen dışı: dengede alan yüzeye DİK, paralel bileşen yok */
    const ust = [
      ['Yüzeyin hemen dışında (küre):', K.metin2],
      ['kutupta E⊥ = ' + D.biçim(1 + 2 * oran, 2) + '·E₀  (dengede 3E₀)', R.normal],
      ['yanda E∥ = ' + D.biçim(1 - oran, 2) + '·E₀  (dengede 0)', R.surtunme]
    ];
    /* Dar panelde soldaki başlıkla çakışmasın diye bir satır aşağı iner. */
    ctx.save(); ctx.font = '700 12px system-ui, sans-serif';
    const genis = ctx.measureText('İletkenin içinde ne oluyor?').width
                + Math.max(...ust.map(([t]) => ctx.measureText(t).width)) + 40;
    ctx.restore();
    const y0 = genis > w ? 44 : 22;
    ust.forEach(([t, c], i) =>
      D.yaziHaleli(ctx, t, w - 12, y0 + i * 18, c, '700 12px system-ui, sans-serif', 'right'));

  } else if (p.mod < 2.5) {
    /* --- Yıldırım: kesit ve yük dağılımı --- */
    const kx = w * 0.16, kw = w * 0.46, ky = h * 0.26, kh = h * 0.40;
    D.yaziHaleli(ctx, 'İletken kabuk — kesit', 12, 22, K.beyaz,
                 '700 12px system-ui, sans-serif', 'left');

    ctx.save();
    D.yuvarlakDik(ctx, kx, ky, kw, kh, 10);
    ctx.strokeStyle = R.ivme; ctx.lineWidth = 4; ctx.stroke();
    ctx.restore();

    /* Yıldırımın getirdiği (çoğunlukla negatif) yük yalnız DIŞ yüzeyde
       görünür ve akım söndükçe toprağa geçip kaybolur. */
    ctx.save();
    ctx.font = '700 15px system-ui, sans-serif';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillStyle = R.konum;
    ctx.globalAlpha = Math.min(1, yildirimAkimi(st) / 10);
    for (let i = 0; i < 7; i++) {
      const t = i / 6;
      ctx.fillText('−', kx + t * kw, ky - 9);
      ctx.fillText('−', kx + t * kw, ky + kh + 9);
    }
    for (let i = 0; i < 3; i++) {
      const t = (i + 1) / 4;
      ctx.fillText('−', kx - 9, ky + t * kh);
      ctx.fillText('−', kx + kw + 9, ky + t * kh);
    }
    ctx.restore();

    D.noktaCisim(ctx, kx + kw / 2, ky + kh / 2, 6, R.hiz);
    D.yaziHaleli(ctx, 'E = 0', kx + kw / 2, ky + kh / 2 + 20, R.hiz,
                 '700 12px system-ui, sans-serif', 'center');

    const satir = [
      ['Yıldırım çoğunlukla NEGATİF yük getirir', K.metin2],
      ['Yükler birbirini iter ⟹ DIŞ yüzeye yayılır', K.beyaz],
      ['dış yüzeyden yere akar, içeri girmez', K.metin2],
      ['⟹ iç boşlukta E = 0', R.hiz]
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
      ['ekranlama = 20·log(λ / 2·göz) = ' + D.biçim(ekranlamaDb(p), 1) + ' dB', K.metin2],
      [gecerMi(p) ? 'göz > λ/2 ⟹ dalga GEÇER'
         : T > GIREMEZ_ESIK ? 'göz < λ/2 ⟹ dalga ZAYIFLAR' : 'göz ≪ λ ⟹ dalga GİREMEZ',
       gecerMi(p) ? R.kuvvet : T > GIREMEZ_ESIK ? R.ivme : R.hiz]
    ];
    let sy = h - 40 - (satir.length - 1) * 18;
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
  const sol = { x: pay, y: 3, w: gw, h: gh };
  const sag = { x: pay * 2 + gw, y: 3, w: gw, h: gh };

  if (p.mod < 1.5) {
    const oran = ayrismaOrani(st, p);
    D.miniGrafik(ctx, Object.assign({}, sol, {
      baslik: 'E_iç − t   (yükler ayrıştıkça sıfıra iner)', birim: 'N/C',
      veri: st.kayit, tMax: AYRISMA_SURESI * 2.4, vMin: 0, vMax: Math.max(1, p.E0 * 1.05),
      renk: R.kuvvet
    }));
    /* Merkezden geçen alan çizgisi boyunca E: dışarıda kutba yaklaştıkça 3E₀’a
       çıkar, yüzeyde SIÇRAR ve içeride sıfırdır (ayrışma sürerken E₀(1−oran)). */
    const veri = [];
    for (let u = -3; u < -1; u += 0.05) veri.push({ t: u, v: eksenAlani(p, oran, u) });
    veri.push({ t: -1, v: eksenAlani(p, oran, -1.0001) }, { t: -1, v: icAlan(st, p) },
              { t: 1, v: icAlan(st, p) }, { t: 1, v: eksenAlani(p, oran, 1.0001) });
    for (let u = 1.05; u <= 3.0001; u += 0.05) veri.push({ t: u, v: eksenAlani(p, oran, u) });
    D.miniGrafik(ctx, Object.assign({}, sag, {
      baslik: 'E − x   (merkezden geçen çizgi · |x| < R küre içi)', birim: 'N/C',
      tEtiket: 'x / R', veri, tMin: -3, tMax: 3, vMin: 0, vMax: p.E0 * 3,
      renk: R.normal
    }));
    return;
  }

  if (p.mod < 2.5) {
    const tSon = YILDIRIM_SON / 1.6 + 0.2;
    D.miniGrafik(ctx, Object.assign({}, sol, {
      baslik: 'Dış yüzeyden akan akım − t   (ağır çekim)', birim: 'kA',
      veri: st.kayit, tMax: tSon, vMin: 0, vMax: 32, renk: R.ivme
    }));
    D.miniGrafik(ctx, Object.assign({}, sag, {
      baslik: 'İç boşlukta E − t   (akım ne olursa olsun SIFIR)', birim: 'N/C',
      veri: st.kayit.map(d => ({ t: d.t, v: 0 })), tMax: tSon, vMin: 0, vMax: 1, renk: R.hiz
    }));
    return;
  }

  /* Geçen genlik − frekans: frekans büyüdükçe λ küçülür, aynı göz dalgaya
     görece büyük gelir ve daha çok sinyal sızar. */
  const fVeri = [];
  for (let f = 100; f <= 2600; f += 20)
    fVeri.push({ t: f, v: 100 * gecenGenlik(Object.assign({}, p, { f })) });
  D.miniGrafik(ctx, Object.assign({}, sol, {
    baslik: 'Geçen genlik − frekans   (göz = ' + D.biçim(p.goz) + ' cm)', birim: '%',
    tEtiket: 'f (MHz)', veri: fVeri, tMin: 100, tMax: 2600, vMin: 0, vMax: 100,
    imlec: { t: p.f, v: 100 * gecenGenlik(p) }, renk: R.ivme
  }));

  /* Ekranlama = 1 − geçen genlik = 1 − 2·göz/λ (göz ≥ λ/2 ise 0). */
  const veri = [];
  for (let g = 0.2; g <= 40; g += 0.4)
    veri.push({ t: g, v: 100 * (1 - gecenGenlik(Object.assign({}, p, { goz: g }))) });
  D.miniGrafik(ctx, Object.assign({}, sag, {
    baslik: 'Ekranlama − göz aralığı  (λ/2’de sıfır)', birim: '%', tEtiket: 'göz (cm)',
    /* Çalışma noktası: taranan göz aralığında ekranlamanın nereye düştüğü. */
    imlec: { t: p.goz, v: 100 * (1 - gecenGenlik(p)) },
    veri, tMax: 40, vMin: 0, vMax: 100,
    renk: R.hiz
  }));
}

/* ----------------------------------------------------------- Okumalar */

function okumalar(st, pHam) {
  const p = etkin(st, pHam);
  if (p.mod < 1.5) {
    const oran = ayrismaOrani(st, p);
    return [
      { et: 'Dış alan  E_dış', dg: D.biçim(p.E0),          birim: 'N/C' },
      { et: 'Ayrışma',         dg: D.biçim(oran * 100),    birim: '%' },
      { et: 'İç alan  E_iç',   dg: D.biçim(icAlan(st, p)), birim: 'N/C' },
      { et: 'Kutupta E (yüzeye dik)',    dg: D.biçim(p.E0 * (1 + 2 * oran)), birim: 'N/C' },
      { et: 'Yanda E (yüzeye paralel)',  dg: D.biçim(p.E0 * (1 - oran)),     birim: 'N/C' },
      { et: 'Durum',           dg: oran >= 0.99 ? 'Denge · kalkan etkin' : 'Ayrışıyor', birim: '' }
    ];
  }
  if (p.mod < 2.5) {
    return [
      { et: 'Yıldırım',     dg: st.aktif ? 'Çarptı' : 'İniyor', birim: '' },
      { et: 'Dış yüzeyde akım', dg: D.biçim(yildirimAkimi(st), 1), birim: 'kA' },
      { et: 'Yük nerede?',  dg: !st.aktif ? '—' : yildirimAkimi(st) > 0.3 ? 'Dış yüzeyden yere akıyor' : 'Toprağa geçti', birim: '' },
      { et: 'İç boşlukta E',dg: '0',                            birim: 'N/C' },
      { et: 'Yolcu',        dg: 'Güvende',                      birim: '' }
    ];
  }
  return [
    { et: 'Frekans  f',    dg: D.biçim(p.f),                 birim: 'MHz' },
    { et: 'Dalga boyu λ',  dg: D.biçim(dalgaBoyu(p) * 100),  birim: 'cm' },
    { et: 'Kafes gözü',    dg: D.biçim(p.goz),               birim: 'cm' },
    { et: 'göz / λ',       dg: D.biçim(gozOran(p), 3),       birim: '' },
    { et: 'Geçen genlik',  dg: D.biçim(gecenGenlik(p) * 100, 0), birim: '%' },
    { et: 'Ekranlama',     dg: D.biçim(ekranlamaDb(p), 1),   birim: 'dB' },
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
      { d: 1, e: 'Düzgün dış alanda iletken küre' },
      { d: 2, e: 'Araca yıldırım çarpması' },
      { d: 3, e: 'Asansörde telefon sinyali' }
    ]},
    { anahtar: 'E0',  etiket: 'Dış alan E₀ (1. düzenek)', min: 200, max: 5000, adim: 100, deger: 2000, birim: 'N/C' },
    { anahtar: 'f',   etiket: 'Sinyal frekansı (3. düzenek)', min: 100, max: 2600, adim: 100, deger: 900, birim: 'MHz' },
    { anahtar: 'goz', etiket: 'Kafes göz aralığı (3. düzenek)', min: 0.5, max: 40, adim: 0.5, deger: 2, birim: 'cm' }
  ],
  durum, adim, bitti, cizGercek, cizKlasik, cizGrafik, okumalar
};

})();
