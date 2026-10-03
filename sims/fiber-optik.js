(function () {
"use strict";
window.F11 = window.F11 || {};

/* ==========================================================================
   sims/fiber-optik.js
   --------------------------------------------------------------------------
   Konu 3.6 · Fiber optik  (MEB 11, s.361-366)

   YAPI (kitap Şekil 3.27)
   -----------------------
   ÇEKİRDEK (n_ç) · onu saran, indisi biraz daha küçük CAM ÖRTÜ (n_ö) ·
   en dışta nem ve darbeye karşı koruyan plastik KILIF.   n_ç > n_ö
   (Bu dosyada cam örtünün indisi için p.nk anahtarı kullanılır.)

   SINIR AÇISI (çekirdek–cam örtü)
   -------------------------------
       sin θ_s = n_ö / n_ç

   Işık çekirdek duvarına θ_s'den BÜYÜK bir açıyla çarparsa tam yansır ve
   fiberin içinde kalır. Fiber kıvrılsa bile bu koşul sürdüğü için ışık
   kilometrelerce yol alır.

   KABUL AÇISI ve SAYISAL AÇIKLIK (NA)
   -----------------------------------
   Fiberin düz ucundan θ₀ ile giren ışın içeride θ_r ile ilerler:

       sin θ₀ = n_ç · sin θ_r

   Duvara çarpma açısı (normalden) 90° − θ_r'dir. Tam yansıma koşulu
   90° − θ_r ≥ θ_s ⟹ θ_r ≤ 90° − θ_s. En büyük giriş açısı:

       sin θ₀(maks) = n_ç · cos θ_s = √(n_ç² − n_ö²)  ≡  NA

   NA'ya SAYISAL AÇIKLIK denir. Bu açının dışından giren ışık fibere
   girebilir ama tutunamaz, cam örtüye kaçar ve kılıfta soğurulur.

   MOD DAĞILIMI (modal dispersiyon)
   --------------------------------
   Eksen boyunca giden ışın en kısa yolu, sınır açısında giden ışın en uzun
   yolu izler. Uzunluk oranı n_ç/n_ö'dür. Zaman farkı:

       Δt = (L·n_ç / c) · (n_ç/n_ö − 1)

   Bu fark, uzun mesafede ışık darbelerinin birbirine karışmasına yol açar
   ve çok modlu fiberin veri hızını sınırlar. Tek modlu fiberde (çok ince
   çekirdek) ışık tek yol izlediğinden bu gecikme yoktur — kitapta şehirler
   ve kıtalar arası iletimde tek modlu kullanılmasının sebebi.

   BÜKÜLME KAYBI (4. düzenek)
   --------------------------
   Keskin bükülmede dış duvara gelme açısı küçülür; sınır açısının altına
   inince ışık dışarı kaçar. Su dolu şişeden akan su (Alıştırma 22) ve
   pleksiglas çubuk bu yüzden ışığı ancak yumuşak kıvrımlarda taşır.
   ========================================================================== */

const D = window.F11;
const { R, K } = D;

const C_ISIK = 3e8;      // m/s

/* ------------------------------------------------------------- Fizik */

function rad(d) { return (d * Math.PI) / 180; }
function der(r) { return (r * 180) / Math.PI; }

/** Çekirdek–cam örtü sınır açısı (derece). */
function sinirAcisi(p) {
  if (p.nc <= p.nk) return null;
  return der(Math.asin(p.nk / p.nc));
}

/** Sayısal açıklık NA = √(n_ç² − n_ö²). */
function sayisalAciklik(p) {
  const q = p.nc * p.nc - p.nk * p.nk;
  return q <= 0 ? 0 : Math.sqrt(q);
}

/** En büyük kabul açısı (derece). */
function kabulAcisi(p) {
  const na = sayisalAciklik(p);
  return na >= 1 ? 90 : der(Math.asin(na));
}

/** Giriş açısı θ₀ için fiber içindeki ilerleme açısı θ_r (derece). */
function icAci(p) {
  const s = Math.sin(rad(p.giris)) / p.nc;
  return der(Math.asin(Math.min(1, s)));
}

/** Duvara çarpma açısı (normalden, derece). */
function duvarAcisi(p) { return 90 - icAci(p); }

function tutunurMu(p) {
  const s = sinirAcisi(p);
  return s !== null && duvarAcisi(p) >= s;
}

/** Eksen boyunca giden ışının süresi (s). */
function sureEksen(p) { return (p.L * 1000 * p.nc) / C_ISIK; }

/** En eğik (sınır açısındaki) ışının süresi (s). */
function sureEnUzun(p) {
  return (p.L * 1000 * p.nc * p.nc) / (p.nk * C_ISIK);
}

/** Mod dağılımı gecikmesi (s). n_ç ≤ n_ö ise fiber ışığı hiç tutamaz: null. */
function gecikme(p) { return p.nc > p.nk ? sureEnUzun(p) - sureEksen(p) : null; }

/** 1 km'de yaklaşık yansıma sayısı — seçilen giriş açısı için. */
function yansimaSayisi(p) {
  const t = rad(icAci(p));
  const capM = p.cap * 1e-6;                    // µm → m
  return (Math.tan(t) / capM) * 1000;
}

/* -------------------------------------------------------------- Durum */

/* Oynat'a basılınca düzeneğin anahtar büyüklüğü taranır; kaydırıcı taramanın
   BAŞLADIĞI değeri verir. Böylece her düzenekte bir şeyin nasıl değiştiği
   canlı görünür. */
const TARAMA_PERIYOT = 12;

function durum(p) { return { t: 0, giris: p.giris, L: p.L, nk: p.nk, Rb: p.bukum }; }

/** 4. düzenekte bükülme yarıçapı taramasının hedefi (a cinsinden). */
function bukumHedef(p) { return p.bukum > 5 ? 1.5 : 12; }

function adim(st, dt, p) {
  st.t += dt;
  if (p.mod > 3.5) {
    st.Rb = D.tarama(st.t, p.bukum, bukumHedef(p), 14);
  } else if (p.mod > 2.5) {
    st.L = D.tarama(st.t, p.L, p.L < 50 ? 100 : 1, TARAMA_PERIYOT);
  } else if (p.mod > 1.5) {
    /* Kabul konisi: cam örtü indisi taranır; indisler yakınlaştıkça koni daralır,
       uzaklaştıkça açılır. NA = √(n_ç² − n_ö²) canlı değişir. */
    st.nk = D.tarama(st.t, p.nk, Math.min(p.nc - 0.005, p.nk < 1.45 ? 1.47 : 1.34), TARAMA_PERIYOT);
  } else {
    /* Cam örtü indisi taranır: çekirdeğe yaklaştıkça sınır açısı büyür ve ışın
       tutunamaz hâle gelir. Hem sahne hem NA−n_ö eğrisi canlanır. */
    st.nk    = D.tarama(st.t, p.nk, Math.min(p.nc - 0.004, p.nk < 1.45 ? 1.475 : 1.34), TARAMA_PERIYOT);
    st.giris = D.tarama(st.t, p.giris, p.giris < 20 ? 34 : 4, TARAMA_PERIYOT * 1.6);
  }
}

function bitti() { return false; }

function etkin(st, p) {
  return Object.assign({}, p, {
    giris: st.giris ?? p.giris,
    L:     st.L ?? p.L,
    nk:    st.nk ?? p.nk
  });
}

/* --------------------------------------------- Gerçekçi görünüm */

function cizGercek(ctx, w, h, st, pHam) {
  const p = etkin(st, pHam);
  if (p.mod > 3.5) { cizBoru(ctx, w, h, st, p); return; }
  if (p.mod > 2.5) { cizGecikme(ctx, w, h, st, p); return; }
  if (p.mod > 1.5) { cizKabulKonisi(ctx, w, h, p); return; }
  cizYol(ctx, w, h, st, p);
}

/** Fiberin gövdesini çizer (çekirdek · cam örtü · plastik kılıf), çekirdek
    sınırlarının y değerlerini döndürür. o: { cy, cek, sagX, etiketsiz } */
function fiberGovde(ctx, w, h, p, solX, o = {}) {
  const cy = o.cy ?? h * 0.52;
  const cek = o.cek ?? Math.min(h * 0.16, 52);  // çekirdek yarı kalınlığı (px)
  const kil = cek + 16;                           // cam örtünün dış sınırı
  const dis = kil + 7;                            // plastik kılıfın dış sınırı
  const sagX = o.sagX ?? w;

  ctx.save();
  ctx.fillStyle = '#3B4150';                      // plastik kılıf — ışık geçirmez
  ctx.fillRect(solX, cy - dis, sagX - solX, dis * 2);
  ctx.restore();
  D.ortam(ctx, solX, cy - kil, sagX - solX, kil * 2, '', 'rgba(200,225,240,.95)');
  D.ortam(ctx, solX, cy - cek, sagX - solX, cek * 2, '', 'rgba(60,140,205,.30)');

  ctx.save();
  ctx.strokeStyle = '#7FD4E6'; ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(solX, cy - cek); ctx.lineTo(sagX, cy - cek);
  ctx.moveTo(solX, cy + cek); ctx.lineTo(sagX, cy + cek);
  ctx.stroke();
  ctx.restore();

  if (!o.etiketsiz) {
    D.yaziAydinlik(ctx, 'çekirdek · n_ç = ' + D.biçim(p.nc, 3), solX + 10, cy - cek + 16,
                   '#14506E', '700 11px system-ui, sans-serif', 'left');
    D.yaziAydinlik(ctx, 'cam örtü · n_ö = ' + D.biçim(p.nk, 3), solX + 10, cy - cek - 4,
                   '#14506E', '700 11px system-ui, sans-serif', 'left');
    D.yaziAydinlik(ctx, 'kılıf (plastik)', solX + 10, cy - dis - 6,
                   '#3B4150', '700 11px system-ui, sans-serif', 'left');
  }
  return { cy, cek, kil, dis };
}

/* ---- Mod 1 · Fiber içindeki yol ---- */

function cizYol(ctx, w, h, st, p) {
  const solX = w * 0.16, sagX = w * 0.84;       // fiberin iki ucu (kitap s.365 örneği)
  const { cy, cek, kil, dis } = fiberGovde(ctx, w, h, p, solX, { sagX });

  /* giriş ışını (havada) */
  const t0 = rad(p.giris);
  const gL = Math.min(w * 0.14, 110);
  D.isin(ctx, solX - gL * Math.cos(t0), cy - gL * Math.sin(t0), solX, cy,
         R.ivme, 2.4, true);
  D.kesikliCizgi(ctx, solX - 40, cy, solX + 40, cy, '#4A5F86', 1.3, [5, 4]);
  D.aciYayi(ctx, solX, cy, 34, Math.PI, Math.PI + t0, R.ivme,
            D.biçim(p.giris) + '°');

  /* uç yüzeyler */
  ctx.save();
  ctx.strokeStyle = '#9AA5B1'; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(solX, cy - dis); ctx.lineTo(solX, cy + dis);
  ctx.moveTo(sagX, cy - dis); ctx.lineTo(sagX, cy + dis);
  ctx.stroke(); ctx.restore();

  const tr = rad(icAci(p));
  const tutar = tutunurMu(p);
  const egim = Math.tan(tr);

  /* zikzak yol */
  let x = solX, y = cy, yon = -1;               // önce yukarı
  const renk = tutar ? R.hiz : R.kuvvet;
  let guvenlik = 0;

  while (x < sagX && guvenlik++ < 60) {
    const dy = yon < 0 ? -(y - (cy - cek)) : ((cy + cek) - y);
    const dx = egim > 1e-6 ? Math.abs(dy) / egim : (sagX - x);
    const nx = x + dx, ny = y + dy;

    if (nx >= sagX || egim <= 1e-6) {
      /* çıkış yüzeyine varır ve havaya çıkarken normalden uzaklaşarak θ₀ ile kırılır */
      const cyY = y + (sagX - x) * egim * yon;
      D.isin(ctx, x, y, sagX, cyY, renk, 2.6, false);
      const t0c = rad(p.giris), Lc = w - 4 - sagX;
      D.isin(ctx, sagX, cyY, w - 4, cyY + yon * Lc * Math.tan(t0c), R.ivme, 2.4, true);
      D.kesikliCizgi(ctx, sagX - 30, cyY, w - 2, cyY, '#4A5F86', 1.2, [4, 3]);
      D.yaziAydinlik(ctx, 'çıkışta ' + D.biçim(p.giris) + '°', sagX + 6, cyY + (yon < 0 ? 16 : -8), R.ivme,
                     '700 11px system-ui, sans-serif', 'left');
      break;
    }

    D.isin(ctx, x, y, nx, ny, renk, 2.6, true);

    if (!tutar) {
      /* cam örtüye kaçıyor — kırılarak geçer, plastik kılıfta soğurulur */
      const sk = (p.nc / p.nk) * Math.sin(rad(duvarAcisi(p)));
      const tk = Math.asin(Math.min(1, sk));
      const L2 = (kil - cek) / Math.max(0.05, Math.cos(tk));
      const ex = nx + L2 * Math.sin(tk), ey = ny + yon * L2 * Math.cos(tk);
      D.isin(ctx, nx, ny, ex, ey, R.kuvvet, 2.2, false);
      ctx.save(); ctx.fillStyle = R.kuvvet; ctx.beginPath(); ctx.arc(ex, ey, 4, 0, 6.2832); ctx.fill(); ctx.restore();
      D.yaziAydinlik(ctx, 'cam örtüye KAÇIYOR · kılıfta soğurulur', nx + 12, ny + yon * (dis + 26 - (ny - cy) * yon), R.kuvvet,
                     '700 12px system-ui, sans-serif', 'left');
      break;
    }

    /* tam yansıma noktası */
    ctx.save();
    ctx.fillStyle = R.ivme; ctx.globalAlpha = 0.85;
    ctx.beginPath(); ctx.arc(nx, ny, 3.5, 0, 6.2832); ctx.fill();
    ctx.restore();

    x = nx; y = ny; yon = -yon;
  }

  /* duvar açısı bilgisi */
  const sa = sinirAcisi(p);
  D.yaziAydinlik(ctx,
    'Duvara çarpma açısı ' + D.biçim(duvarAcisi(p), 4) + '°   ·   sınır açısı ' +
    (sa === null ? '—' : D.biçim(sa, 4) + '°'),
    10, h - 10, tutar ? R.hiz : R.kuvvet, '700 12px system-ui, sans-serif', 'left');

  D.yaziAydinlik(ctx, tutar ? 'TAM YANSIMA — ışık fiberde kalıyor' : 'Tam yansıma YOK — ışık kayboluyor',
                 10, h - 28, tutar ? R.hiz : R.kuvvet,
                 '700 12px system-ui, sans-serif', 'left');
}

/* ---- Mod 2 · Kabul konisi ---- */

function cizKabulKonisi(ctx, w, h, p) {
  const solX = w * 0.40;
  const { cy, cek } = fiberGovde(ctx, w, h, p, solX, { etiketsiz: false });

  const kabul = kabulAcisi(p);
  const L = Math.min(w * 0.34, 210);

  /* kabul konisi dolgusu */
  ctx.save();
  ctx.fillStyle = 'rgba(53,192,138,.16)';
  ctx.beginPath();
  ctx.moveTo(solX, cy);
  ctx.lineTo(solX - L * Math.cos(rad(kabul)), cy - L * Math.sin(rad(kabul)));
  ctx.lineTo(solX - L, cy);
  ctx.lineTo(solX - L * Math.cos(rad(kabul)), cy + L * Math.sin(rad(kabul)));
  ctx.closePath(); ctx.fill();
  ctx.restore();

  /* koni sınırları */
  [-1, 1].forEach(s => {
    D.kesikliCizgi(ctx, solX, cy,
                   solX - L * Math.cos(rad(kabul)), cy + s * L * Math.sin(rad(kabul)),
                   R.hiz, 2, [6, 4]);
  });
  D.kesikliCizgi(ctx, solX - L - 10, cy, solX + 40, cy, '#4A5F86', 1.3, [5, 4]);

  /* Deneme ışınları. Açı değerleri her ışının ucuna yazılırsa panelin sol
     kenarından taşıyor; bu yüzden sayı yerine RENK kodu kullanılır ve
     açıklaması altta bir satırda verilir. */
  const acilar = [0, kabul * 0.5, kabul * 0.95, kabul * 1.4, kabul * 2.0];
  acilar.forEach((a, i) => {
    if (a > 88) return;
    const ok = a <= kabul + 1e-9;
    const renk = ok ? R.hiz : R.kuvvet;
    const t = rad(a);
    const s = i % 2 === 0 ? -1 : 1;
    D.isin(ctx, solX - L * Math.cos(t), cy + s * L * Math.sin(t), solX, cy, renk, 2, true);
    /* fiber içinde kısa bir parça */
    const tr = Math.asin(Math.min(1, Math.sin(t) / p.nc));
    const uz = Math.min(w - solX - 6, cek / Math.max(0.02, Math.tan(tr)));
    D.isin(ctx, solX, cy, solX + uz, cy - s * uz * Math.tan(tr),
           renk, 1.8, false);
  });

  /* kullanıcının seçtiği giriş ışını (θ₀) — kalın, sarı */
  {
    const t = rad(p.giris);
    const ok = p.giris <= kabul + 1e-9;
    D.isin(ctx, solX - L * 0.9 * Math.cos(t), cy - L * 0.9 * Math.sin(t), solX, cy, R.ivme, 3, true);
    const tr = Math.asin(Math.min(1, Math.sin(t) / p.nc));
    const uz = Math.min(w - solX - 6, cek / Math.max(0.02, Math.tan(tr)));
    D.isin(ctx, solX, cy, solX + uz, cy + uz * Math.tan(tr), ok ? R.ivme : R.kuvvet, 2.4, false);
    D.yaziAydinlik(ctx, 'θ₀ = ' + D.biçim(p.giris) + '° ' + (ok ? '✓' : '✕'),
                   solX - L * 0.9 * Math.cos(t) + 4, cy - L * 0.9 * Math.sin(t) - 8, R.ivme,
                   '700 11px system-ui, sans-serif', 'left');
  }

  D.aciYayi(ctx, solX, cy, 62, Math.PI, Math.PI + rad(kabul), R.hiz,
            D.biçim(kabul, 4) + '°');

  D.yaziAydinlik(ctx, 'NA = ' + D.biçim(sayisalAciklik(p), 4) +
                 '   kabul açısı ' + D.biçim(kabul, 4) + '°',
                 10, h - 28, R.normal, '700 13px system-ui, sans-serif', 'left');
  D.yaziAydinlik(ctx, 'yeşil: koni içinde ⟹ tutunur   ·   kırmızı: dışında ⟹ kaybolur',
                 10, h - 10, R.surtunme, '700 11px system-ui, sans-serif', 'left');
}

/* ---- Mod 3 · Tek modlu ve çok modlu fiber (kitap Şekil 3.29–3.30) ----
   Tek modlu fiberde çekirdek çok incedir, ışık tek yol izler. Çok modlu
   fiberde çekirdek kalındır; ışık farklı açılarla (modlarla) ilerler ve eğik
   ışınlar daha uzun yol alır. Işık darbeleri çekirdekte v = c/n_ç ile akar:
   eğik ışının x yönündeki ilerleme hızı v·cos θ_r olduğundan geride kalır. */
const DARBE_HIZ = 150;          // çekirdekte ışığın ekrandaki hızı (px/s)
const DARBE_ARA = 1.6;          // s — ardışık darbeler arası

/** Üçgen dalga: eksenden yukarı başlayan zikzakın düşey sapması (px). */
function zikzak(u, cek) {
  const m = ((u + cek) % (4 * cek) + 4 * cek) % (4 * cek);
  return m < 2 * cek ? (cek - m) : (m - 3 * cek);
}

function cizGecikme(ctx, w, h, st, p) {
  const solX = w * 0.06, sagX = w * 0.90;
  const sa = sinirAcisi(p);
  const t = st.t || 0;

  /* tek modlu */
  const cy1 = h * 0.22;
  fiberGovde(ctx, w, h, p, solX, { cy: cy1, cek: 4, sagX, etiketsiz: true });
  D.yaziAydinlik(ctx, 'TEK MODLU · ince çekirdek · tek yol', solX, cy1 - 33, '#14506E', '700 12px system-ui, sans-serif', 'left');
  D.isin(ctx, solX, cy1, sagX, cy1, R.hiz, 2, false);

  /* çok modlu */
  const cy2 = h * 0.60, cek2 = Math.min(h * 0.13, 40);
  fiberGovde(ctx, w, h, p, solX, { cy: cy2, cek: cek2, sagX, etiketsiz: true });
  D.yaziAydinlik(ctx, 'ÇOK MODLU · kalın çekirdek · birçok yol', solX, cy2 - cek2 - 30, '#14506E', '700 12px system-ui, sans-serif', 'left');

  const yollar = [{ aci: 0, renk: R.hiz }];
  if (sa !== null) {
    const tmax = 90 - sa;
    yollar.push({ aci: tmax * 0.5, renk: R.ivme }, { aci: tmax, renk: R.kuvvet });
  }
  yollar.forEach(yl => {
    const tg = Math.tan(rad(yl.aci));
    ctx.save(); ctx.strokeStyle = yl.renk; ctx.lineWidth = 1.6; ctx.globalAlpha = 0.75;
    ctx.beginPath();
    for (let x = solX; x <= sagX; x += 2) {
      const yy = cy2 + (tg > 0 ? zikzak((x - solX) * tg, cek2) : 0);
      x === solX ? ctx.moveTo(x, yy) : ctx.lineTo(x, yy);
    }
    ctx.stroke(); ctx.restore();
  });

  /* darbeler: her DARBE_ARA saniyede bir, aynı anda gönderilir */
  const uzun = sagX - solX;
  for (let k = Math.floor(t / DARBE_ARA); k >= 0 && k > Math.floor(t / DARBE_ARA) - 4; k--) {
    const gecen = t - k * DARBE_ARA;
    /* tek modlu */
    const x1 = solX + DARBE_HIZ * gecen;
    if (x1 <= sagX) nokta(ctx, x1, cy1, R.hiz);
    /* çok modlu: yol boyunca s = v·t, x = s·cos θ */
    yollar.forEach(yl => {
      const c = Math.cos(rad(yl.aci)), tg = Math.tan(rad(yl.aci));
      const x = solX + DARBE_HIZ * gecen * c;
      if (x <= sagX) nokta(ctx, x, cy2 + (tg > 0 ? zikzak((x - solX) * tg, cek2) : 0), yl.renk);
    });
  }
  /* alıcılar */
  [[cy1, 12], [cy2, cek2 + 8]].forEach(([cy, yy]) => {
    ctx.save(); ctx.fillStyle = '#2A3242'; ctx.fillRect(sagX + 2, cy - yy, 12, yy * 2); ctx.restore();
  });
  D.yaziAydinlik(ctx, 'alıcılar →', sagX - 4, cy2 + cek2 + 38, '#2A3242', '600 11px system-ui, sans-serif', 'right');

  if (gecikme(p) === null) {
    D.yaziAydinlik(ctx, 'n_ç ≤ n_ö ⟹ tam yansıma YOK, fiber ışığı taşıyamaz',
                   10, h - 10, R.kuvvet, '700 13px system-ui, sans-serif', 'left');
    return;
  }
  const gec = gecikme(p) * 1e9;
  D.yaziAydinlik(ctx, 'En eğik ışın ' + D.biçim(p.L) + ' km’de ' + D.biçim(gec, 4) +
                 ' ns geç varır (yolu %' + D.biçim((p.nc / p.nk - 1) * 100, 3) + ' uzun)',
                 10, h - 26, R.normal, '700 12px system-ui, sans-serif', 'left');
  D.yaziAydinlik(ctx, 'Darbeler karışmasın: en fazla ' + D.biçim(1 / (2 * gecikme(p)) / 1e6, 3) +
                 ' Mb/s · tek modluda bu gecikme yok', 10, h - 9, R.surtunme,
                 '700 11px system-ui, sans-serif', 'left');
}

function nokta(ctx, x, y, renk) {
  ctx.save(); ctx.fillStyle = renk; ctx.strokeStyle = '#fff'; ctx.lineWidth = 1.2;
  ctx.beginPath(); ctx.arc(x, y, 4.2, 0, 6.2832); ctx.fill(); ctx.stroke(); ctx.restore();
}

/* ---- Mod 4 · Bükülen ışık borusu (bükülme kaybı · Alıştırma 22) ----
   Su ya da pleksiglas bir çubuk/akış (n_ç) havada (n = 1). Çubuk önce düz,
   sonra R yarıçaplı çeyrek çember boyunca bükülür, sonra yine düz gider.
   Işınlar İKİ BOYUTTA (çubuğun ekseninden geçen düzlemde) TAM olarak izlenir:
   düz duvarlarda ve eş merkezli çember duvarlarda her çarpmada gelme açısı
   hesaplanır; sınır açısından küçükse ışın kırılarak DIŞARI kaçar.
   Uzunluklar çubuğun yarı kalınlığı a cinsinden (a = 1). */
const BORU_L1 = 9, BORU_L2 = 6;                // düz kısımların uzunluğu (a)

/** Işını izler. Dönen: { noktalar: [[x,y],…], kacti, kacis:{x,y,dx,dy}, minGelme } */
function boruIzle(n, Rb, y0, aci) {
  const sS = 1 / n;                                          // sin θ_s (dışı hava)
  let x = -BORU_L1, y = y0, dx = Math.cos(aci), dy = Math.sin(aci);
  let bolge = 0;                                             // 0: düz giriş · 1: bükülme · 2: düz çıkış
  const nok = [[x, y]];
  let minGelme = 90, kacti = false, kacis = null;
  const Cx = 0, Cy = Rb;                                     // bükülme merkezi (y yukarı)
  for (let g = 0; g < 400; g++) {
    let t = Infinity, tur = null, nx = 0, ny = 0;
    const al = (tt, tr, a, b) => { if (tt > 1e-9 && tt < t) { t = tt; tur = tr; nx = a; ny = b; } };
    if (bolge === 0) {
      if (dy > 0) al((1 - y) / dy, 'duvar', 0, 1);
      if (dy < 0) al((-1 - y) / dy, 'duvar', 0, -1);
      if (dx > 0) al((0 - x) / dx, 'gecis1', 0, 0);
      if (dx < 0) al((-BORU_L1 - x) / dx, 'son', 0, 0);
    } else if (bolge === 1) {
      const qx = x - Cx, qy = y - Cy, b = qx * dx + qy * dy, c0 = qx * qx + qy * qy;
      for (const [Rr, ic] of [[Rb + 1, false], [Rb - 1, true]]) {
        const D2 = b * b - (c0 - Rr * Rr);
        if (D2 < 0) continue;
        const kk = Math.sqrt(D2);
        const tt = ic ? -b - kk : -b + kk;
        if (tt > 1e-9) {
          const px = qx + tt * dx, py = qy + tt * dy;
          if (py <= 1e-9 && px >= -1e-9) al(tt, 'duvar', (ic ? -1 : 1) * px / Rr, (ic ? -1 : 1) * py / Rr);
        }
      }
      if (dy > 0 && qy < 0) { const tt = -qy / dy; if (qx + tt * dx > 0) al(tt, 'gecis2', 0, 0); }
      if (dx < 0 && qx > 0 - 1e-12) { const tt = -qx / dx; if (qy + tt * dy < 0) al(tt, 'geri1', 0, 0); }
    } else {
      if (dx > 0) al((Rb + 1 - x) / dx, 'duvar', 1, 0);
      if (dx < 0) al((Rb - 1 - x) / dx, 'duvar', -1, 0);
      if (dy > 0) al((Rb + BORU_L2 - y) / dy, 'son', 0, 0);
      if (dy < 0) al((Rb - y) / dy, 'geri2', 0, 0);
    }
    if (tur === null) break;
    x += t * dx; y += t * dy; nok.push([x, y]);
    if (tur === 'son') break;
    if (tur === 'gecis1') { bolge = 1; continue; }
    if (tur === 'geri1')  { bolge = 0; continue; }
    if (tur === 'gecis2') { bolge = 2; continue; }
    if (tur === 'geri2')  { bolge = 1; continue; }
    /* duvar: n dışa dönük birim normal */
    const cosI = dx * nx + dy * ny;                         // > 0: dışa doğru
    const sinI = Math.sqrt(Math.max(0, 1 - cosI * cosI));
    const gel = der(Math.asin(Math.min(1, sinI)));
    if (gel < minGelme) minGelme = gel;
    if (sinI < sS) {
      /* kırılarak havaya çıkar: teğet bileşen n kat büyür */
      const tx = dx - cosI * nx, ty = dy - cosI * ny;       // teğet bileşen
      const sOut = n * sinI, cOut = Math.sqrt(Math.max(0, 1 - sOut * sOut));
      const tl = Math.hypot(tx, ty) || 1;
      kacti = true;
      kacis = { x, y, dx: nx * cOut + tx / tl * sOut, dy: ny * cOut + ty / tl * sOut };
      break;
    }
    dx -= 2 * cosI * nx; dy -= 2 * cosI * ny;
  }
  return { noktalar: nok, kacti, kacis, minGelme };
}

/** Düz çubukta tutunan en büyük iç açı (derece): 90° − θ_s. */
function boruEnBuyukAci(n) { return 90 - der(Math.asin(1 / n)); }

/** Lazer demeti: 9 giriş yüksekliği × 9 açı, açılar ±0,5·(90° − θ_s) içinde —
    düz çubukta HEPSİ tutunur; kayıp yalnız bükülmeden gelir. */
const DEMET = 0.5;
function boruDemet(n, Rb) {
  const tm = rad(boruEnBuyukAci(n)) * DEMET;
  let kayip = 0, top = 0, minG = 90;
  for (let i = 0; i < 9; i++) for (let j = 0; j < 9; j++) {
    const y0 = -0.9 + 1.8 * i / 8, a = -tm + 2 * tm * j / 8;
    const r = boruIzle(n, Rb, y0, a);
    top++; if (r.kacti) kayip++;
    if (r.minGelme < minG) minG = r.minGelme;
  }
  return { kayipYuzde: 100 * kayip / top, minGelme: minG };
}

const _boruOnbellek = {};
function boruEgrisi(n) {
  const k = n.toFixed(3);
  if (_boruOnbellek[k]) return _boruOnbellek[k];
  const v1 = [], v2 = [];
  for (let Rb = 1.5; Rb <= 14.001; Rb += 0.25) {
    const d = boruDemet(n, Rb);
    v1.push({ t: Rb, v: d.kayipYuzde }); v2.push({ t: Rb, v: d.minGelme });
  }
  return (_boruOnbellek[k] = { v1, v2 });
}

function boruRb(st, p) { return st.Rb ?? p.bukum; }

function cizBoru(ctx, w, h, st, p) {
  const n = p.nc, Rb = boruRb(st, p);
  const RbMax = Math.max(p.bukum, bukumHedef(p));
  const a = Math.min(15, (h - 50) / (1 + RbMax + BORU_L2), (w - 60) / (BORU_L1 + RbMax + 2));
  const ox = 30 + BORU_L1 * a, oy = h - 26 - 1 * a;           // (0,0) bükülmenin başı
  const X = u => ox + u * a, Y = v => oy - v * a;

  /* çubuk gövdesi */
  ctx.save();
  ctx.fillStyle = n < 1.4 ? 'rgba(60,140,205,.30)' : 'rgba(120,200,220,.30)';
  ctx.strokeStyle = '#4A90B8'; ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(X(-BORU_L1), Y(-1)); ctx.lineTo(X(0), Y(-1));
  ctx.arc(X(0), Y(Rb), (Rb + 1) * a, Math.PI / 2, 0, true);
  ctx.lineTo(X(Rb + 1), Y(Rb + BORU_L2)); ctx.lineTo(X(Rb - 1), Y(Rb + BORU_L2));
  ctx.lineTo(X(Rb - 1), Y(Rb));
  ctx.arc(X(0), Y(Rb), Math.max(0.01, (Rb - 1) * a), 0, Math.PI / 2, false);
  ctx.lineTo(X(-BORU_L1), Y(1)); ctx.closePath();
  ctx.fill(); ctx.stroke();
  ctx.restore();

  /* lazer */
  ctx.save(); ctx.fillStyle = '#2A3242'; ctx.fillRect(X(-BORU_L1) - 26, Y(0) - 7, 22, 14); ctx.restore();

  /* görünür ışınlar */
  const tm = rad(boruEnBuyukAci(n));
  const isinlar = [[0, 0], [0.6, DEMET], [-0.6, -DEMET], [0.3, -DEMET / 2], [-0.3, DEMET / 2]];
  isinlar.forEach(([y0, k], i) => {
    const r = boruIzle(n, Rb, y0, k * tm);
    const renk = r.kacti ? R.kuvvet : R.hiz;
    ctx.save(); ctx.strokeStyle = renk; ctx.lineWidth = 1.8; ctx.globalAlpha = 0.9;
    ctx.beginPath();
    r.noktalar.forEach(([u, v], j) => j ? ctx.lineTo(X(u), Y(v)) : ctx.moveTo(X(u), Y(v)));
    ctx.stroke(); ctx.restore();
    if (r.kacti) {
      const e = r.kacis;
      D.isin(ctx, X(e.x), Y(e.y), X(e.x + e.dx * 4), Y(e.y + e.dy * 4), R.kuvvet, 2, true);
    } else {
      const [u, v] = r.noktalar[r.noktalar.length - 1];
      D.isin(ctx, X(u), Y(v) + 1, X(u), Y(v) - 14, R.hiz, 1.8, true);
    }
  });

  D.yaziAydinlik(ctx, (n < 1.4 ? 'su' : 'pleksiglas') + ' çubuk · n = ' + D.biçim(n, 3) + ' · dışı hava',
                 w - 10, 20, '#1B3A52', '700 12px system-ui, sans-serif', 'right');
  const d = boruDemet(n, Rb);
  D.yaziAydinlik(ctx, 'R/a = ' + D.biçim(Rb, 2) + '   ·   ışık kaybı %' + D.biçim(d.kayipYuzde, 3),
                 w - 10, 40, d.kayipYuzde > 0 ? R.kuvvet : R.hiz, '700 12px system-ui, sans-serif', 'right');
  D.yaziAydinlik(ctx, 'sınır açısı ' + D.biçim(der(Math.asin(1 / n)), 3) + '° · en küçük gelme açısı ' +
                 D.biçim(d.minGelme, 3) + '°', w - 10, 58, R.surtunme, '600 11px system-ui, sans-serif', 'right');
  D.yaziAydinlik(ctx, d.kayipYuzde > 0 ? 'Keskin bükülmede gelme açısı sınır açısının altına iner ⟹ ışık KAÇAR'
                                       : 'Bükülme yumuşak: her çarpmada tam yansıma ⟹ ışık çubuğu izler',
                 10, h - 8, d.kayipYuzde > 0 ? R.kuvvet : R.hiz, '700 12px system-ui, sans-serif', 'left');
}

/* ------------------------------------------ Klasik fizik görünümü */

function cizKlasik(ctx, w, h, st, pHam) {
  const p = etkin(st, pHam);
  D.izgara(ctx, w, h, 26);
  if (p.mod > 3.5) { klasikBoru(ctx, w, h, st, p); return; }
  const sa = sinirAcisi(p);
  const na = sayisalAciklik(p);

  const sol = [
    ['sin θ_s = n_ö / n_ç', K.beyaz, '700 13px system-ui, sans-serif'],
    ['n_ç = ' + D.biçim(p.nc, 3), R.hiz, '12px system-ui, sans-serif'],
    ['n_ö = ' + D.biçim(p.nk, 3) + '  (cam örtü)', R.kuvvet, '12px system-ui, sans-serif'],
    ['θ_s = ' + (sa === null ? 'YOK (n_ç ≤ n_ö)' : D.biçim(sa, 4) + '°'),
      R.surtunme, '700 13px system-ui, sans-serif'],
    ['', K.metin2, '11px'],
    ['NA = √(n_ç² − n_ö²)', K.beyaz, '700 12px system-ui, sans-serif'],
    ['NA = ' + D.biçim(na, 4), R.normal, '700 13px system-ui, sans-serif'],
    ['Kabul açısı = ' + D.biçim(kabulAcisi(p), 4) + '°', R.ivme, '700 13px system-ui, sans-serif'],
    ['', K.metin2, '11px'],
    ['θ₀ = ' + D.biçim(p.giris) + '° ⟹ θ_r = ' + D.biçim(icAci(p), 4) + '°',
      K.metin2, '11px system-ui, sans-serif'],
    ['Duvara çarpma = ' + D.biçim(duvarAcisi(p), 4) + '°', K.metin2, '11px system-ui, sans-serif'],
    [tutunurMu(p) ? 'θ > θ_s ⟹ TUTUNUR' : 'θ < θ_s ⟹ KAÇAR',
      tutunurMu(p) ? R.hiz : R.kuvvet, '700 13px system-ui, sans-serif']
  ];
  let sy = 40;
  sol.forEach(([t, c, f]) => { if (t) D.yaziHaleli(ctx, t, 12, sy, c, f, 'left'); sy += 17; });

  const sx = w * 0.54;
  const sag = [
    ['Çok modluda gecikme', K.beyaz, '700 12px system-ui, sans-serif'],
    ['Δt = (L·n_ç/c)·(n_ç/n_ö − 1)', K.metin, '11px system-ui, sans-serif'],
    ['', K.metin2, '11px'],
    ['L = ' + D.biçim(p.L) + ' km', R.normal, '12px system-ui, sans-serif'],
    ['Eksen ışını: ' + D.biçim(sureEksen(p) * 1e6, 4) + ' µs', R.hiz, '12px system-ui, sans-serif'],
    ['En eğik ışın: ' + (gecikme(p) === null ? 'tutunamaz' : D.biçim(sureEnUzun(p) * 1e6, 4) + ' µs'), R.kuvvet, '12px system-ui, sans-serif'],
    ['Δt = ' + (gecikme(p) === null ? '—' : D.biçim(gecikme(p) * 1e9, 4) + ' ns'), R.surtunme, '700 13px system-ui, sans-serif'],
    ['', K.metin2, '11px'],
    ['Yol farkı oranı = n_ç/n_ö', K.metin2, '11px system-ui, sans-serif'],
    ['= ' + D.biçim(p.nc / p.nk, 5), K.metin2, '11px system-ui, sans-serif'],
    ['', K.metin2, '11px'],
    ['1 km’de yansıma ≈', K.beyaz, '700 12px system-ui, sans-serif'],
    [D.biçim(yansimaSayisi(p) / 1000, 4) + ' bin kez', R.ivme, '700 12px system-ui, sans-serif']
  ];
  sy = 40;
  sag.forEach(([t, c, f]) => { if (t) D.yaziHaleli(ctx, t, sx, sy, c, f, 'left'); sy += 17; });
}

function klasikBoru(ctx, w, h, st, p) {
  const n = p.nc, Rb = boruRb(st, p), d = boruDemet(n, Rb), ts = der(Math.asin(1 / n));
  D.yaziHaleli(ctx, 'Bükülen ışık borusu · dışı hava', 12, 40, K.beyaz, '700 12px system-ui, sans-serif', 'left');
  const satir = [
    ['sin θ_s = 1 / n = ' + D.biçim(1 / n, 4), K.beyaz, '700 12px system-ui, sans-serif'],
    ['θ_s = ' + D.biçim(ts, 3) + '°', R.surtunme, '700 13px system-ui, sans-serif'],
    ['', K.metin2, '11px'],
    ['Bükülme yarıçapı R = ' + D.biçim(Rb, 2) + ' a', R.normal, '700 12px system-ui, sans-serif'],
    ['(a: çubuğun yarı kalınlığı)', K.metin2, '11px system-ui, sans-serif'],
    ['Dış duvarda en küçük gelme açısı', K.metin2, '11px system-ui, sans-serif'],
    ['= ' + D.biçim(d.minGelme, 3) + '°  ' + (d.minGelme < ts ? '< θ_s ⟹ KAÇAR' : '≥ θ_s ⟹ tutunur'),
      d.minGelme < ts ? R.kuvvet : R.hiz, '700 12px system-ui, sans-serif'],
    ['', K.metin2, '11px'],
    ['81 ışınlık lazer demetinde kayıp', K.metin2, '11px system-ui, sans-serif'],
    ['%' + D.biçim(d.kayipYuzde, 3), d.kayipYuzde > 0 ? R.kuvvet : R.hiz, '700 14px system-ui, sans-serif']
  ];
  let sy = 62;
  satir.forEach(([t, c, f]) => { if (t) D.yaziHaleli(ctx, t, 12, sy, c, f, 'left'); sy += 18; });
  const sx = w * 0.56;
  ['Alıştırma 22: su dolu şişenin', 'deliğinden akan suyun içinde', 'lazer ışığı tam yansımalarla', 'ilerler (n = 1,3 · θ_s ≈ 48°).',
   '', 'Fiber optik kablolarda veri', 'kaybının bir nedeni de keskin', 'bükülmedir: kablolar belli bir', 'yarıçaptan dar kıvrılmamalıdır.']
    .forEach((t, i) => t && D.yaziHaleli(ctx, t, sx, 62 + i * 17, K.metin2, '11px system-ui, sans-serif', 'left'));
}

/* ---------------------------------------------------- Grafik paneli */

function cizGrafik(ctx, w, h, st, pHam) {
  const p = etkin(st, pHam);
  const pay = 8, gw = (w - pay * 3) / 2, gh = h - 6;

  if (p.mod > 3.5) {
    const eg = boruEgrisi(p.nc), Rb = boruRb(st, p), d = boruDemet(p.nc, Rb);
    D.miniGrafik(ctx, { x: pay, y: 3, w: gw, h: gh, baslik: 'Işık kaybı % − bükülme yarıçapı R/a',
      birim: '%', tEtiket: 'R/a', veri: eg.v1, tMin: 1.5, tMax: 14, vMin: 0, vMax: 100, renk: R.kuvvet,
      imlec: { t: Rb, v: d.kayipYuzde } });
    D.miniGrafik(ctx, { x: pay * 2 + gw, y: 3, w: gw, h: gh,
      baslik: 'En küçük gelme açısı − R/a   (θ_s = ' + D.biçim(der(Math.asin(1 / p.nc)), 3) + '°’nin altı: kayıp)',
      birim: '°', tEtiket: 'R/a', veri: eg.v2, tMin: 1.5, tMax: 14, vMin: 0, vMax: 90, renk: R.surtunme,
      imlec: { t: Rb, v: d.minGelme } });
    return;
  }

  /* NA − cam örtü indisi */
  const v1 = [];
  for (let nk = 1.30; nk <= p.nc; nk += 0.002) {
    const q = p.nc * p.nc - nk * nk;
    v1.push({ t: nk, v: q <= 0 ? 0 : Math.sqrt(q) });
  }
  D.miniGrafik(ctx, {
    x: pay, y: 3, w: gw, h: gh,
    baslik: 'NA − cam örtü indisi   (indisler yakınsa NA küçülür)',
    birim: '', tEtiket: 'n_ö',
    imlec: { t: p.nk, v: sayisalAciklik(p) },
    veri: v1, tMin: 1.30, tMax: Math.max(1.31, p.nc), vMin: 0,
    vMax: Math.max(0.05, Math.sqrt(Math.max(0, p.nc * p.nc - 1.69)) * 1.1),
    renk: R.normal
  });

  /* gecikme − uzunluk (fiber ışığı tutamıyorsa gecikme tanımsız: 0 çizilir) */
  const v2 = [];
  const kat = Math.max(0, (p.nc / C_ISIK) * (p.nc / p.nk - 1) * 1000 * 1e9);   // ns/km
  for (let L = 0; L <= 100; L += 2) v2.push({ t: L, v: kat * L });
  D.miniGrafik(ctx, {
    x: pay * 2 + gw, y: 3, w: gw, h: gh,
    baslik: 'Gecikme − uzunluk   (' + D.biçim(kat, 4) + ' ns/km · DOĞRU orantı)',
    birim: 'ns', tEtiket: 'L (km)',
    imlec: { t: p.L, v: (gecikme(p) || 0) * 1e9 },
    veri: v2, tMax: 100, vMin: 0, vMax: Math.max(1, kat * 100 * 1.05), renk: R.kuvvet
  });
}

/* ------------------------------------------------------------ Okumalar */

function okumalar(st, pHam) {
  const p = etkin(st, pHam);
  const sa = sinirAcisi(p);
  const na = sayisalAciklik(p);

  if (p.mod > 3.5) {
    const Rb = boruRb(st, p), d = boruDemet(p.nc, Rb);
    return [
      { et: 'Çubuk indisi n',        dg: D.biçim(p.nc, 3), birim: '' },
      { et: 'Sınır açısı θ_s',       dg: D.biçim(der(Math.asin(1 / p.nc)), 3), birim: '°' },
      { et: 'Bükülme yarıçapı R/a',  dg: D.biçim(Rb, 2), birim: '' },
      { et: 'En küçük gelme açısı',  dg: D.biçim(d.minGelme, 3), birim: '°' },
      { et: 'Işık kaybı',            dg: D.biçim(d.kayipYuzde, 3), birim: '%' }
    ];
  }

  if (p.mod < 1.5) {
    return [
      { et: 'Çekirdek n_ç',    dg: D.biçim(p.nc, 3), birim: '' },
      { et: 'Cam örtü n_ö',    dg: D.biçim(p.nk, 3), birim: '' },
      { et: 'Sınır açısı θ_s', dg: sa === null ? 'Yok' : D.biçim(sa, 4), birim: sa === null ? '' : '°' },
      { et: 'Giriş açısı θ₀',  dg: D.biçim(p.giris), birim: '°' },
      { et: 'İçerideki açı θ_r', dg: D.biçim(icAci(p), 4), birim: '°' },
      { et: 'Duvara çarpma',   dg: D.biçim(duvarAcisi(p), 4), birim: '°' },
      { et: 'Sonuç',           dg: tutunurMu(p) ? 'Tam yansıma · tutunur' : 'Cam örtüye kaçar', birim: '' }
    ];
  }

  if (p.mod < 2.5) {
    return [
      { et: 'Sayısal açıklık NA', dg: D.biçim(na, 4), birim: '' },
      { et: 'Kabul açısı',        dg: D.biçim(kabulAcisi(p), 4), birim: '°' },
      { et: 'Kabul konisi',       dg: D.biçim(2 * kabulAcisi(p), 4), birim: '° (tam açı)' },
      { et: 'Sınır açısı θ_s',    dg: sa === null ? 'Yok' : D.biçim(sa, 4), birim: sa === null ? '' : '°' },
      { et: 'Giriş açısı θ₀',     dg: D.biçim(p.giris), birim: '°' },
      { et: 'Bu ışın',            dg: p.giris <= kabulAcisi(p) ? 'Kabul edilir' : 'Kaybolur', birim: '' }
    ];
  }

  const gec = gecikme(p);
  if (gec === null) {
    return [
      { et: 'Fiber uzunluğu L',  dg: D.biçim(p.L), birim: 'km' },
      { et: 'Durum',             dg: 'n_ç ≤ n_ö — fiber ışığı tutamaz', birim: '' }
    ];
  }
  return [
    { et: 'Fiber uzunluğu L',  dg: D.biçim(p.L),                 birim: 'km' },
    { et: 'Eksen ışını süresi',dg: D.biçim(sureEksen(p) * 1e6, 5), birim: 'µs' },
    { et: 'En eğik ışın süresi',dg: D.biçim(sureEnUzun(p) * 1e6, 5), birim: 'µs' },
    { et: 'Gecikme Δt',        dg: D.biçim(gec * 1e9, 4),        birim: 'ns' },
    { et: 'Birim uzunlukta',   dg: D.biçim(gec * 1e9 / Math.max(0.01, p.L), 4), birim: 'ns/km' },
    { et: 'En yüksek veri hızı',dg: D.biçim(1 / (2 * gec) / 1e6, 4), birim: 'Mb/s' }
  ];
}

/* ------------------------------------------------------------- Kayıt */

D.simler = D.simler || {};
D.simler['fiber-optik'] = {
  id: 'fiber-optik',
  baslik: '3.6 · Fiber optik · tam yansıma, tek/çok modlu, bükülme kaybı',
  yukseklik: 330,
  grafikPanel: true,
  grafikYukseklik: 150,
  parametreler: [
    { anahtar: 'mod', etiket: 'Düzenek', tur: 'secim', deger: 1, secenekler: [
      { d: 1, e: 'Fiber içindeki yol' },
      { d: 2, e: 'Kabul konisi · NA' },
      { d: 3, e: 'Tek modlu · çok modlu' },
      { d: 4, e: 'Bükülen ışık borusu (Alıştırma 22)' }
    ]},
    { anahtar: 'nc',    etiket: 'Çekirdek indisi n_ç', min: 1.30, max: 1.70, adim: 0.005, deger: 1.48, birim: '' },
    { anahtar: 'nk',    etiket: 'Cam örtü indisi n_ö', min: 1.30, max: 1.68, adim: 0.005, deger: 1.46, birim: '' },
    { anahtar: 'giris', etiket: 'Giriş açısı θ₀',      min: 0,    max: 40,   adim: 1,     deger: 8,    birim: '°' },
    { anahtar: 'L',     etiket: 'Fiber uzunluğu',      min: 1,    max: 100,  adim: 1,     deger: 10,   birim: 'km' },
    { anahtar: 'cap',   etiket: 'Çekirdek çapı',       min: 5,    max: 100,  adim: 5,     deger: 50,   birim: 'µm' },
    { anahtar: 'bukum', etiket: 'Bükülme yarıçapı R/a', min: 1.5,  max: 12,   adim: 0.5,   deger: 10,   birim: '' }
  ],
  durum, adim, bitti, cizGercek, cizKlasik, cizGrafik, okumalar
};

})();
