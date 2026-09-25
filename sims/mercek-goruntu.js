(function () {
"use strict";
window.F11 = window.F11 || {};

/* ==========================================================================
   sims/mercek-goruntu.js
   --------------------------------------------------------------------------
   Konu 3.8.2 · Merceklerde görüntü  (MEB 11, s.381-390)

   MERCEK DENKLEMİ  (aynadakiyle AYNI)
   -----------------------------------
       1/f = 1/a + 1/b        ⟹      b = a·f / (a − f)

       a : cismin merceğe uzaklığı   (daima +)
       b : görüntünün uzaklığı
           b > 0 ⟹ merceğin ARKASINDA (çıkış tarafı) · GERÇEK
           b < 0 ⟹ merceğin ÖNÜNDE   (cisim tarafı)  · SANAL
       f : odak uzaklığı
           f > 0 ⟹ yakınsak (ince kenarlı)   f < 0 ⟹ ıraksak (kalın kenarlı)

   Kitap: görüntü boyunun cisim boyuna oranı, uzaklıkların oranına eşittir:
       h′ / h = |b| / a

   YAKINSAK MERCEK (kitap Tablo 3.8)
   ---------------------------------
       cisim sonsuzda   görüntü F’de · nokta · gerçek
       a > 2f           2F ile F arasında · ters · gerçek · küçük
       a = 2f           2F’de · ters · gerçek · eşit
       f < a < 2f       2F ile sonsuz arasında · ters · gerçek · büyük
       a = f            sonsuzda (oluşmaz)
       a < f            cisimle aynı tarafta · düz · sanal · büyük  → BÜYÜTEÇ

   IRAKSAK MERCEK (kitap Tablo 3.9)
   --------------------------------
       cisim sonsuzda   cisimle aynı taraftaki F’de · nokta · sanal
       diğer her yerde  F ile mercek arasında · düz · sanal · küçük
       a = |f|          görüntü |f|/2’de, boyu cismin YARISI

   Kitapta merceğin iki tarafındaki noktaların ikisi de F ve 2F ile
   gösterilir; bu dosya da öyle yazar.
   ========================================================================== */

const D = window.F11;
const { R, K } = D;

const TUR_SURESI = 20;
const ALET_SURESI = 6;          // s — her aletin ekranda kalma süresi
const SARKAC_T = 4;             // s — yaylı sarkacın periyodu (5. düzenek)

function rad(d) { return d * Math.PI / 180; }

/* Optik alet ön ayarları: f (cm), a (cm) ve kullanımda a’nın gezdiği pay.
   Fotoğraf makinesinde konu yaklaşıp uzaklaşır; projeksiyonda slayt netleme
   için merceğe yaklaşıp uzaklaşır; büyüteçte mercek cisme yaklaştırılıp
   uzaklaştırılır (a < f kalır). Kapı dürbünü ıraksaktır (Alıştırma 27).
   Mikroskopta iki yakınsak mercek vardır (Alıştırma 29). */
const ALETLER = [
  { ad: 'Fotoğraf makinesi', f: 5,  a: 200, pay: 80 },
  { ad: 'Projeksiyon',       f: 10, a: 12.5, pay: 1.5 },
  { ad: 'Büyüteç',           f: 10, a: 6,  pay: 2 },
  { ad: 'Kapı dürbünü',      f: -4, a: 120, pay: 70 },
  { ad: 'Mikroskop',         f: 1,  a: 1.15, pay: 0.004, iki: true, fe: 3 }
];
/* Mikroskopta objektif ile oküler arası: a = 1,15 cm iken ara görüntü
   okülerin 2,0 cm önüne düşecek şekilde sabit. Örnek 1,146–1,154 cm arasında
   (netleme) gidip gelirken ara görüntü okülerin 1,8–2,2 cm önünde, yani
   odağının (3 cm) HEP içinde kalır: son görüntü daima sanaldır. */
const MIK_L = 1.15 * 1 / (1.15 - 1) + 2.0;

/* ------------------------------------------------------------- Fizik */

function aletMi(p) { return p.mod > 2.5 && p.mod < 3.5; }
function aletAl(st, p) { return ALETLER[Math.round((st && st.alet) || p.alet) - 1]; }

function odak(p, st) {
  if (aletMi(p)) return aletAl(st, p).f;
  return (p.tur < 1.5 ? 1 : -1) * p.f;
}

function turUzakligi(st, p) {
  const f = Math.abs(p.f);
  const bas = 4 * f, son = 0.35 * f;
  return bas * Math.pow(son / bas, Math.min(1, st.t / TUR_SURESI));
}

/** Cisim sonsuzda (4. düzenek): grafiklerde cisim 2f’den 20f’ye uzaklaşıp gelir. */
function sonsuzA(st, p) { return D.tarama(st.t || 0, 2 * p.f, 20 * p.f, 16); }

/** Yaylı sarkaç (5. düzenek): denge 2f’de, genlik f ⟹ cisim 3f ile f arasında. */
function sarkacA(st, p) { return 2 * p.f + p.f * Math.cos(2 * Math.PI * (st.t || 0) / SARKAC_T); }

function cisimA(st, p) {
  if (aletMi(p)) {
    const al = aletAl(st, p);
    const u = st && st.t ? (st.t % ALET_SURESI) / ALET_SURESI : 0;
    return al.a + al.pay * Math.sin(2 * Math.PI * u);
  }
  if (p.mod > 4.5) return sarkacA(st, p);
  if (p.mod > 3.5) return sonsuzA(st, p);
  return p.mod < 1.5 ? (st.a ?? p.a) : turUzakligi(st, p);
}

function goruntuB(a, f) {
  const payda = a - f;
  if (Math.abs(payda) < 1e-6) return null;
  return (a * f) / payda;
}

function durumAdi(a, f) {
  if (f < 0) {
    if (Math.abs(a + f) < -f * 0.03) return 'Cisim F’de · görüntü f/2’de, boyu yarısı';
    return 'Iraksak mercek · görüntü F ile mercek arasında';
  }
  const e = f * 0.03;
  if (Math.abs(a - 2 * f) < e) return 'Cisim 2F’de';
  if (Math.abs(a - f) < e)     return 'Cisim F’de';
  if (a > 2 * f)               return 'Cisim 2F’nin dışında';
  if (a > f)                   return 'Cisim F ile 2F arasında';
  return 'Cisim F ile mercek arasında';
}

function ozellik(a, f) {
  const b = goruntuB(a, f);
  if (b === null) return { cins: 'Oluşmaz', yon: '—', boy: '—' };
  const m = Math.abs(b / a);
  return {
    cins: b > 0 ? 'Gerçek' : 'Sanal',
    yon:  b > 0 ? 'Ters'   : 'Düz',
    boy:  m > 1.02 ? 'Büyük' : (m < 0.98 ? 'Küçük' : 'Eşit'),
    b, m
  };
}

/** Mikroskop: objektif ve oküler görüntüleri, toplam büyütme. */
function mikroskop(a) {
  const fo = 1, fe = 3;
  const bo = goruntuB(a, fo);
  if (bo === null || bo <= 0) return null;
  const ae = MIK_L - bo;
  const be = goruntuB(ae, fe);
  const mo = bo / a, me = be === null ? Infinity : Math.abs(be / ae);
  return { fo, fe, bo, ae, be, mo, me, M: mo * me };
}

/* -------------------------------------------------------------- Durum */

function durum(p) { return { t: 0, a: p.a, alet: p.alet }; }

function adim(st, dt, p) {
  st.t += dt;
  if (p.mod < 1.5) st.a = D.tarama(st.t, p.a, taramaHedefi(p), 14);
  else if (aletMi(p)) {
    /* optik aletler sırayla gezilir */
    const bas = Math.round(p.alet) - 1;
    st.alet = ((bas + Math.floor(st.t / ALET_SURESI)) % ALETLER.length) + 1;
  }
}
function bitti(st, p) { return p.mod > 1.5 && p.mod < 2.5 && st.t >= TUR_SURESI; }

/* ------------------------------------------------- Ortak yerleşim */

/* Tarama beş durumu da geçecek yöne gider (2F’nin dışındaysa merceğe doğru,
   içindeyse uzağa); ölçek bu aralığa göre kurulur. */
function taramaHedefi(p) { return p.a > 2.2 * p.f ? 0.4 * p.f : 3 * p.f; }

function aEnBuyuk(p) {
  if (p.mod < 1.5) return Math.max(p.a, taramaHedefi(p));
  if (p.mod > 4.5) return 3.6 * Math.abs(p.f);                 // sarkaç + yay
  return 4 * Math.abs(p.f);
}

function yerlesim(w, h, st, p) {
  const f = odak(p, st);
  const a = cisimA(st, p);
  const b = goruntuB(a, f);
  const cy = h * 0.54;

  /* Yerleşim tarama boyunca SABİT: cisim gerçekten merceğe yaklaşır,
     görüntü gerçekten kayar. Optik aletlerde her alet kendi a aralığı için
     ayrı yerleştirilir. */
  let solCm, sagCm;
  if (aletMi(p)) {
    const al = aletAl(st, p);
    solCm = Math.abs(f) * 2.3; sagCm = Math.abs(f) * 2.3;
    for (const aq of [al.a - al.pay, al.a, al.a + al.pay]) {
      const bq = goruntuB(aq, f);
      solCm = Math.max(solCm, aq * 1.10);
      if (bq !== null && Math.abs(bq) < 300) {
        if (bq < 0) solCm = Math.max(solCm, -bq * 1.2);
        else        sagCm = Math.max(sagCm, bq * 1.06);
      }
    }
  } else if (p.mod > 3.5 && p.mod < 4.5) {
    solCm = 2.6 * Math.abs(f); sagCm = 2.6 * Math.abs(f);
  } else {
    solCm = Math.max(aEnBuyuk(p) * 1.08, Math.abs(f) * 2.3);
    sagCm = Math.max(Math.abs(f) * 4.2, 1);
  }

  /* Merceğin yatay yeri iki tarafın ihtiyacına göre dengelenir (a ≪ b
     durumlarında cisim birkaç piksele sıkışmasın). */
  const solKenar = w * 0.05, sagKenar = w * 0.95;
  const mx = (solKenar * sagCm + sagKenar * solCm) / Math.max(1e-6, solCm + sagCm);
  const olcek = Math.min((mx - solKenar) / Math.max(1, solCm), (sagKenar - mx) / Math.max(1, sagCm), 6.0);
  const boyPx = Math.min(h * 0.22, 56);
  return { f, a, b, cy, mx, olcek, boyPx, ince: f > 0 };
}

/* --------------------------------------------- Gerçekçi görünüm */

function cizGercek(ctx, w, h, st, p) {
  if (aletMi(p) && aletAl(st, p).iki) { cizMikroskop(ctx, w, h, st, p); return; }
  const y = yerlesim(w, h, st, p);
  const sol = w * 0.02, sag = w * 0.98;

  D.kesikliCizgi(ctx, sol, y.cy, sag, y.cy, 'rgba(150,170,200,.55)', 1.4, [7, 5]);
  D.mercek(ctx, y.mx, y.cy, Math.min(h * 0.58, 180), y.ince ? 'ince' : 'kalin');

  const fp = y.f * y.olcek;
  nokta(ctx, y.mx, y.cy, 'O', K.beyaz);
  [[fp, 'F', R.ivme], [-fp, 'F', R.ivme], [2 * fp, '2F', R.kuvvet], [-2 * fp, '2F', R.kuvvet]].forEach(([dx, ad, renk]) => {
    if (y.mx + dx > 4 && y.mx + dx < w - 4) nokta(ctx, y.mx + dx, y.cy, ad, renk);
  });

  if (p.mod > 3.5 && p.mod < 4.5) { cizSonsuz(ctx, w, h, st, y); return; }

  const ox = y.mx - y.a * y.olcek;
  const ty = y.cy - y.boyPx;
  if (p.mod > 4.5) yay(ctx, y.mx - 3.45 * Math.abs(y.f) * y.olcek, ox, y.cy);
  D.nesneOku(ctx, ox, y.cy, y.boyPx, R.hiz, 'cisim');

  /* 1 · eksene paralel gelir, odaktan geçer */
  D.isin(ctx, ox, ty, y.mx, ty, R.ivme, 2, true);
  cikanIsin(ctx, y.mx, ty, y.mx + fp, y.cy, sag, R.ivme);

  /* 2 · merkezden geçer, sapmaz */
  const m2 = (y.cy - ty) / (y.mx - ox);
  D.isin(ctx, ox, ty, y.mx, y.cy, R.surtunme, 2, true);
  D.isin(ctx, y.mx, y.cy, sag, y.cy + m2 * (sag - y.mx), R.surtunme, 2, true);

  /* 3 · ön odaktan geçerek gelir, paralel çıkar (panelden taşarsa çizilmez;
     görüntü diğer iki ışınla zaten belirlenir — kitap: en az iki ışın) */
  const fx = y.mx - fp;
  if (Math.abs(fx - ox) > 4) {
    const y3 = ty + (y.mx - ox) * (y.cy - ty) / (fx - ox);
    if (y3 > 6 && y3 < h - 6) {
      D.isin(ctx, ox, ty, y.mx, y3, R.kuvvet, 2, true);
      if (!y.ince) D.sanalIsin(ctx, y.mx, y3, fx, y.cy, 'rgba(150,175,210,.8)');
      D.isin(ctx, y.mx, y3, sag, y3, R.kuvvet, 2, true);
    }
  }

  /* görüntü */
  const bxPanel = y.b === null ? null : y.mx + y.b * y.olcek;
  if (y.b === null || bxPanel < w * 0.01 || bxPanel > w * 0.99) {
    D.yaziAydinlik(ctx,
      y.b === null ? 'Cisim tam odakta — çıkan ışınlar PARALEL, görüntü sonsuzda'
                   : (y.b > 0 ? 'Görüntü merceğin ötesinde ' : 'Sanal görüntü cisim tarafında ') +
                     D.biçim(Math.abs(y.b)) + ' cm uzakta — panelin dışında',
      w * 0.5, h * 0.95, R.kuvvet, '700 12px system-ui, sans-serif', 'center');
  } else {
    const bx = y.mx + y.b * y.olcek;
    const gBoyTam = -y.boyPx * (y.b / y.a);
    const enFazla = h * 0.42;
    const tasti = Math.abs(gBoyTam) > enFazla;
    const gBoy = tasti ? Math.sign(gBoyTam) * enFazla : gBoyTam;
    const sanal = y.b < 0;
    const etiket = (sanal ? 'sanal görüntü' : 'görüntü') +
                   (tasti ? '  (×' + D.biçim(Math.abs(y.b / y.a), 3) + ')' : '');
    if (sanal) {
      const tepeY = y.cy - gBoyTam;
      D.sanalIsin(ctx, y.mx, ty, bx, tepeY, 'rgba(150,175,210,.85)');
      D.sanalIsin(ctx, y.mx, y.cy, bx, tepeY, 'rgba(150,175,210,.85)');
    }
    ctx.save();
    if (sanal) ctx.globalAlpha = 0.72;
    D.nesneOku(ctx, bx, y.cy, gBoy, sanal ? '#8FA8C8' : R.kuvvet, etiket);
    if (tasti) D.kesikliCizgi(ctx, bx - 9, y.cy - gBoy, bx + 9, y.cy - gBoy, sanal ? '#8FA8C8' : R.kuvvet, 1.4, [4, 3]);
    ctx.restore();
    D.olcu(ctx, Math.min(y.mx, bx), y.cy + h * 0.36, Math.max(y.mx, bx), y.cy + h * 0.36,
           'b = ' + D.biçim(y.b, 4) + ' cm', R.kuvvet);
  }

  D.olcu(ctx, Math.min(ox, y.mx), y.cy + h * 0.28, Math.max(ox, y.mx), y.cy + h * 0.28,
         'a = ' + D.biçim(y.a, 4) + ' cm', R.hiz);

  /* başlık — sol üstteki "gerçekçi görünüm" etiketinin altında */
  D.yaziAydinlik(ctx, durumAdi(y.a, y.f), 10, 42, R.surtunme, '700 12px system-ui, sans-serif', 'left');
  if (aletMi(p)) {
    D.yaziAydinlik(ctx, aletAl(st, p).ad, w - 10, 18, R.normal, '700 12px system-ui, sans-serif', 'right');
  } else if (p.mod > 4.5) {
    D.yaziAydinlik(ctx, 'Yaylı sarkaçtaki cisim 3f ile f arasında salınıyor (Alıştırma 28)', w - 10, 18, R.normal,
                   '700 11px system-ui, sans-serif', 'right');
  } else if (p.mod > 1.5) {
    D.yaziAydinlik(ctx, 'otomatik tur · ' + D.biçim(Math.max(0, TUR_SURESI - st.t)) + ' s',
                   w - 10, 18, R.surtunme, '600 11px system-ui, sans-serif', 'right');
  }
}

function nokta(ctx, x, yy, ad, renk) {
  ctx.save();
  ctx.fillStyle = renk;
  ctx.beginPath(); ctx.arc(x, yy, 3.5, 0, 6.2832); ctx.fill();
  ctx.restore();
  D.yaziAydinlik(ctx, ad, x, yy - 9, renk, '700 11px system-ui, sans-serif', 'center');
}

/** Mercekten çıkan ışın: fiziksel yol daima SAĞA gider. */
function cikanIsin(ctx, px, py, qx, qy, sag, renk) {
  const dx = qx - px;
  if (Math.abs(dx) < 1e-6) return;
  const m = (qy - py) / dx;
  D.isin(ctx, px, py, sag, py + m * (sag - px), renk, 2, true);
  if (qx < px) D.sanalIsin(ctx, px, py, qx, qy, 'rgba(150,175,210,.8)');
}

/** Duvardan cisme uzanan yay (5. düzenek). */
function yay(ctx, x0, x1, cy) {
  ctx.save();
  ctx.fillStyle = '#6B7488'; ctx.fillRect(x0 - 8, cy - 30, 8, 44);
  ctx.strokeStyle = '#6B7488'; ctx.lineWidth = 1.8;
  ctx.beginPath(); ctx.moveTo(x0, cy + 6);
  const n = 14, L = Math.max(10, x1 - 8 - x0);
  for (let i = 1; i <= n; i++) ctx.lineTo(x0 + L * i / n, cy + 6 + (i % 2 ? -7 : 7));
  ctx.lineTo(x1 - 8, cy + 6); ctx.stroke();
  ctx.fillStyle = '#A7B0C2'; ctx.fillRect(x1 - 8, cy - 2, 16, 14);
  ctx.restore();
}

/* ---- Mod 4 · Cisim sonsuzda (kitap Tablo 3.8 ve 3.9, ilk satır) ----
   Işınlar paralel gelir; yakınsakta F’de GERÇEKTEN toplanır, ıraksakta
   uzantıları cisimle aynı taraftaki F’de kesişir. Oynatınca ışık atmaları akar. */
function cizSonsuz(ctx, w, h, st, y) {
  const sol = w * 0.03, sag = w * 0.97, fx = y.mx + y.f * y.olcek;
  const t = st.t || 0, V = 150, ara = 70;
  const H = Math.min(h * 0.24, 70);
  for (let k = -3; k <= 3; k++) {
    if (!k) continue;
    const yy = y.cy + H * k / 3;
    D.isin(ctx, sol, yy, y.mx, yy, R.ivme, 1.8, true);
    const m = (y.cy - yy) / (fx - y.mx);                      // çıkan ışının eğimi (yakınsakta F’ye)
    const ey = yy + m * (sag - y.mx);
    D.isin(ctx, y.mx, yy, sag, ey, R.kuvvet, 2, true);
    if (!y.ince) D.sanalIsin(ctx, y.mx, yy, fx, y.cy, 'rgba(150,175,210,.85)');
    /* atmalar */
    const L1 = y.mx - sol, L2 = Math.hypot(sag - y.mx, ey - yy);
    ctx.save();
    for (let d = (t * V) % ara; d < L1 + L2; d += ara) {
      const [x, yq] = d < L1 ? [sol + d, yy] : [y.mx + (sag - y.mx) * (d - L1) / L2, yy + (ey - yy) * (d - L1) / L2];
      ctx.fillStyle = d < L1 ? '#FFB020' : '#FF5A4E';
      ctx.beginPath(); ctx.arc(x, yq, 3.2, 0, 6.2832); ctx.fill();
    }
    ctx.restore();
  }
  ctx.save();
  if (y.ince) {
    const g = ctx.createRadialGradient(fx, y.cy, 0, fx, y.cy, 18);
    g.addColorStop(0, 'rgba(255,220,120,' + (0.7 + 0.25 * Math.sin(t * 6)) + ')'); g.addColorStop(1, 'rgba(255,120,60,0)');
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(fx, y.cy, 18, 0, 6.2832); ctx.fill();
  }
  ctx.fillStyle = y.ince ? R.kuvvet : '#8FA8C8'; ctx.beginPath(); ctx.arc(fx, y.cy, 5, 0, 6.2832); ctx.fill();
  ctx.restore();
  D.rozet(ctx, 'görüntü: F’de NOKTA · ' + (y.ince ? 'gerçek' : 'sanal'), fx, y.cy + H + 16,
          y.ince ? R.kuvvet : '#5F7FA8', '#fff', '700 12px system-ui, sans-serif', true);
  D.yaziAydinlik(ctx, 'Cisim sonsuzda ⟹ ışınlar paralel gelir', 10, 42, R.surtunme, '700 12px system-ui, sans-serif', 'left');
  D.yaziAydinlik(ctx, y.ince ? 'Yakınsak: paralel ışınlar F’de toplanır (Tablo 3.8)'
                             : 'Iraksak: uzantılar cisimle aynı taraftaki F’de kesişir (Tablo 3.9)',
                 w / 2, h - 10, R.mur, '600 11px system-ui, sans-serif', 'center');
}

/* ---- Mikroskop (Alıştırma 29): objektif + oküler, ikisi de yakınsak ----
   Objektif, odağının biraz dışındaki örneğin gerçek, ters, büyük ara
   görüntüsünü oluşturur. Bu görüntü okülerin odağının İÇİNE düşer; oküler
   onu büyüteç gibi büyütür: son görüntü sanal ve daha büyüktür.
   Toplam büyütme = objektif büyütmesi × oküler büyütmesi. */
function cizMikroskop(ctx, w, h, st, p) {
  const a = cisimA(st, p), m = mikroskop(a);
  const cy = h * 0.40;
  /* ölçek ve cismin çizim boyu SABİT (netleme boyunca ekran kaymasın) */
  const xMin = -2.2, xMax = MIK_L + 4.5;
  const s = (w * 0.92) / (xMax - xMin);
  const X = u => w * 0.04 + (u - xMin) * s;
  const hCisim = h * 0.40 / 24;
  D.kesikliCizgi(ctx, 4, cy, w - 4, cy, 'rgba(150,170,200,.55)', 1.4, [7, 5]);
  D.mercek(ctx, X(0), cy, h * 0.24, 'ince');
  D.mercek(ctx, X(MIK_L), cy, h * 0.5, 'ince');
  D.yaziAydinlik(ctx, 'objektif', X(0), cy - h * 0.15, R.hiz, '700 11px system-ui, sans-serif', 'center');
  D.yaziAydinlik(ctx, 'oküler', X(MIK_L), cy - h * 0.28, R.hiz, '700 11px system-ui, sans-serif', 'center');
  [[1, 'Fₒ'], [-1, 'Fₒ']].forEach(([k, ad]) => nokta(ctx, X(k * 1), cy, ad, R.ivme));
  [[MIK_L + 3, 'Fₑ'], [MIK_L - 3, 'Fₑ']].forEach(([u, ad]) => nokta(ctx, X(u), cy, ad, R.ivme));
  const ox = X(-a);
  D.nesneOku(ctx, ox, cy, hCisim, R.hiz, '');
  D.yaziAydinlik(ctx, 'örnek', ox, cy + 16, R.hiz, '700 11px system-ui, sans-serif', 'center');
  if (!m) return;
  /* objektif ışınları → ara görüntü */
  const ix = X(m.bo), iy = cy + hCisim * m.mo;                 // ters: eksenin altında
  D.isin(ctx, ox, cy - hCisim, X(0), cy - hCisim, R.ivme, 1.8, true);
  D.isin(ctx, X(0), cy - hCisim, ix, iy, R.ivme, 1.8, true);
  D.isin(ctx, ox, cy - hCisim, ix, iy, R.surtunme, 1.8, true);
  D.nesneOku(ctx, ix, cy, -hCisim * m.mo, R.kuvvet, '');
  D.yaziAydinlik(ctx, 'ara görüntü: gerçek · ters · ' + D.biçim(m.mo, 2) + '×', ix, iy + 16, R.kuvvet,
                 '700 11px system-ui, sans-serif', 'center');
  /* oküler ışınları → sanal son görüntü */
  const sag = w - 4;
  const fX = X(MIK_L + 3);
  const mEg = (cy - iy) / (fX - X(MIK_L));
  D.isin(ctx, ix, iy, X(MIK_L), iy, R.normal, 1.8, true);
  D.isin(ctx, X(MIK_L), iy, sag, iy + mEg * (sag - X(MIK_L)), R.normal, 1.8, true);
  const m2 = (cy - iy) / (X(MIK_L) - ix);
  D.isin(ctx, ix, iy, X(MIK_L), cy, R.normal, 1.8, true);
  D.isin(ctx, X(MIK_L), cy, sag, cy + m2 * (sag - X(MIK_L)), R.normal, 1.8, true);
  if (isFinite(m.be) && m.be < 0) {
    const fx2 = X(MIK_L + m.be), fy2 = cy + hCisim * m.mo * m.me;
    D.sanalIsin(ctx, X(MIK_L), iy, fx2, fy2, 'rgba(150,175,210,.85)');
    D.sanalIsin(ctx, X(MIK_L), cy, fx2, fy2, 'rgba(150,175,210,.85)');
    ctx.save(); ctx.globalAlpha = 0.72;
    D.nesneOku(ctx, fx2, cy, -(fy2 - cy), '#8FA8C8', '');
    ctx.restore();
    D.yaziAydinlik(ctx, 'son görüntü: sanal · ' + D.biçim(m.M, 3) + '×', fx2 + 6, Math.min(h - 30, fy2 - 6), '#5F7FA8',
                   '700 11px system-ui, sans-serif', 'left');
  }
  D.yaziAydinlik(ctx, 'Mikroskop (Alıştırma 29)', w - 10, 18, R.normal, '700 12px system-ui, sans-serif', 'right');
  D.yaziAydinlik(ctx, 'Toplam büyütme = ' + D.biçim(m.mo, 3) + ' × ' + D.biçim(m.me, 3) + ' = ' + D.biçim(m.M, 3),
                 10, h - 10, R.normal, '700 12px system-ui, sans-serif', 'left');
}

/* ------------------------------------------ Klasik fizik görünümü */

function cizKlasik(ctx, w, h, st, p) {
  D.izgara(ctx, w, h, 26);
  if (aletMi(p) && aletAl(st, p).iki) { klasikMikroskop(ctx, w, h, st, p); return; }
  const f = odak(p, st), a = cisimA(st, p);
  const o = ozellik(a, f);

  if (p.mod > 3.5 && p.mod < 4.5) {
    const b = goruntuB(a, f);
    const satir = [
      ['Cisim sonsuzda · ' + (f > 0 ? 'yakınsak' : 'ıraksak'), K.beyaz, '700 12px system-ui, sans-serif'],
      ['1/f = 1/a + 1/b', K.beyaz, '700 14px system-ui, sans-serif'],
      ['a → ∞ ⟹ 1/a → 0 ⟹ b = f', R.ivme, '700 13px system-ui, sans-serif'],
      ['', K.metin2, '11px'],
      ['Görüntü: ' + (f > 0 ? 'F’de, nokta, GERÇEK' : 'cisimle aynı taraftaki F’de, nokta, SANAL'),
        R.kuvvet, '700 12px system-ui, sans-serif'],
      ['', K.metin2, '11px'],
      ['Grafikte cisim uzaklaşıyor:', K.beyaz, '700 12px system-ui, sans-serif'],
      ['a = ' + D.biçim(a, 0) + ' cm ⟹ b = ' + D.biçim(b, 2) + ' cm', R.hiz, '700 13px system-ui, sans-serif'],
      ['b − f = ' + D.biçim(b - f, 3) + ' cm  (a büyüdükçe → 0)', R.kuvvet, '700 12px system-ui, sans-serif'],
      ['büyütme = ' + D.biçim(Math.abs(b / a), 3) + '  (→ 0: nokta)', R.normal, '700 12px system-ui, sans-serif']
    ];
    let sy = 40;
    satir.forEach(([t, c, fo]) => { if (t) D.yaziHaleli(ctx, t, 12, sy, c, fo, 'left'); sy += 18; });
    return;
  }

  D.yaziHaleli(ctx, f > 0 ? 'Yakınsak (ince kenarlı) mercek' : 'Iraksak (kalın kenarlı) mercek',
               12, 40, K.beyaz, '700 12px system-ui, sans-serif', 'left');
  const sol = [
    ['1/f = 1/a + 1/b', K.beyaz, '700 14px system-ui, sans-serif'],
    ['b = a·f / (a − f)', K.metin, '12px system-ui, sans-serif'],
    ['f = ' + D.biçim(f, 4) + ' cm', R.ivme, '700 13px system-ui, sans-serif'],
    ['a = ' + D.biçim(a, 4) + ' cm', R.hiz,  '700 13px system-ui, sans-serif'],
    ['b = ' + (o.b === undefined ? '∞' : D.biçim(o.b, 4)) + ' cm', R.kuvvet, '700 14px system-ui, sans-serif'],
    ['', K.metin2, '11px'],
    ['h′/h = |b|/a = ' + (o.m === undefined ? '—' : D.biçim(o.m, 4)), R.normal, '700 13px system-ui, sans-serif'],
    ['(boylar oranı = uzaklıklar oranı)', K.metin2, '11px system-ui, sans-serif']
  ];
  if (p.mod > 4.5) {
    const f1 = Math.abs(f);
    const bL = goruntuB(3 * f1, f), bM = goruntuB(2 * f1, f), bN = goruntuB(f1, f);
    sol.push(['', K.metin2, '11px'],
      ['Uçlar ve denge (Alıştırma 28):', K.beyaz, '700 11px system-ui, sans-serif'],
      ['a = 3f ⟹ b = ' + D.biçim(bL / f1, 3) + 'f · a = 2f ⟹ b = ' + D.biçim(bM / f1, 3) + 'f', K.metin2, '11px system-ui, sans-serif'],
      ['a = f ⟹ ' + (bN === null ? 'görüntü sonsuzda' : 'b = ' + D.biçim(bN / f1, 3) + 'f'), K.metin2, '11px system-ui, sans-serif']);
  }
  let sy = 62;
  sol.forEach(([t, c, fo]) => { if (t) D.yaziHaleli(ctx, t, 12, sy, c, fo, 'left'); sy += 17; });

  const sx = w * 0.54;
  const sag = [
    [durumAdi(a, f), R.surtunme, '700 12px system-ui, sans-serif'],
    ['', K.metin2, '11px'],
    ['Cins : ' + o.cins, o.cins === 'Gerçek' ? R.kuvvet : '#8FA8C8', '700 13px system-ui, sans-serif'],
    ['Yön  : ' + o.yon,  K.beyaz, '700 13px system-ui, sans-serif'],
    ['Boy  : ' + o.boy,  R.normal, '700 13px system-ui, sans-serif'],
    ['', K.metin2, '11px'],
    ['Gerçek görüntü: kırılan ışınlar', K.metin2, '11px system-ui, sans-serif'],
    ['kesişir, cismin KARŞI tarafında', K.metin2, '11px system-ui, sans-serif'],
    ['Sanal görüntü: uzantılar kesişir,', K.metin2, '11px system-ui, sans-serif'],
    ['cisimle AYNI tarafta', K.metin2, '11px system-ui, sans-serif'],
    ['', K.metin2, '11px'],
    ['Formüller aynayla aynı, YER farklı', R.ivme, '700 11px system-ui, sans-serif']
  ];
  sy = 62;
  sag.forEach(([t, c, fo]) => { if (t) D.yaziHaleli(ctx, t, sx, sy, c, fo, 'left'); sy += 17; });
}

function klasikMikroskop(ctx, w, h, st, p) {
  const a = cisimA(st, p), m = mikroskop(a);
  const satir = [
    ['Mikroskop · iki yakınsak mercek', K.beyaz, '700 12px system-ui, sans-serif'],
    ['objektif fₒ = 1 cm · oküler fₑ = 3 cm', K.metin2, '11px system-ui, sans-serif'],
    ['aralarındaki uzaklık ' + D.biçim(MIK_L, 3) + ' cm', K.metin2, '11px system-ui, sans-serif'],
    ['', K.metin2, '11px'],
    ['örnek objektiften a = ' + D.biçim(a, 3) + ' cm', R.hiz, '700 12px system-ui, sans-serif'],
    ['ara görüntü b = ' + (m ? D.biçim(m.bo, 3) : '—') + ' cm · gerçek · ters · ' + (m ? D.biçim(m.mo, 3) : '—') + '×',
      R.kuvvet, '700 12px system-ui, sans-serif'],
    ['okülerden ' + (m ? D.biçim(m.ae, 3) : '—') + ' cm < fₑ ⟹ büyüteç gibi', K.metin2, '11px system-ui, sans-serif'],
    ['son görüntü ' + (m && isFinite(m.be) ? D.biçim(m.be, 3) + ' cm · sanal · ' + D.biçim(m.me, 3) + '×' : '—'),
      '#5F7FA8', '700 12px system-ui, sans-serif'],
    ['', K.metin2, '11px'],
    ['Toplam büyütme = ' + (m ? D.biçim(m.M, 3) : '—'), R.normal, '700 14px system-ui, sans-serif'],
    ['(objektif büyütmesi × oküler büyütmesi)', K.metin2, '11px system-ui, sans-serif'],
    ['Kitap: 20× objektif ve 10× oküler ⟹ 200×', K.metin2, '11px system-ui, sans-serif']
  ];
  let sy = 40;
  satir.forEach(([t, c, fo]) => { if (t) D.yaziHaleli(ctx, t, 12, sy, c, fo, 'left'); sy += 18; });
}

/* ---------------------------------------------------- Grafik paneli */

/** a = f asimptotunda iki kol AYRI çizilir; değerler ve imleç kırpılır —
    dikey birleşme çizgisi olmaz, imleç grafiğin kenarında kalır. */
function kolluGrafik(ctx, o, veri, imlec, f) {
  const kol = [veri.filter(q => q.t < f), veri.filter(q => q.t > f)];
  const imKol = imlec && imlec.t < f ? 0 : 1;
  let ilk = true;
  kol.forEach((k, i) => {
    if (k.length < 2) return;
    D.miniGrafik(ctx, Object.assign({}, o, ilk ? {} : { baslik: '', birim: '', tEtiket: '' },
                                    { veri: k, imlec: i === imKol ? imlec : null }));
    ilk = false;
  });
  if (ilk) D.miniGrafik(ctx, Object.assign({}, o, { veri: [], imlec: null }));
}

function cizGrafik(ctx, w, h, st, p) {
  const pay = 8, gw = (w - pay * 3) / 2, gh = h - 6;
  const sol = { x: pay, y: 3, w: gw, h: gh }, sag = { x: pay * 2 + gw, y: 3, w: gw, h: gh };

  if (aletMi(p) && aletAl(st, p).iki) {
    const a0 = cisimA(st, p), m0 = mikroskop(a0);
    const v1 = [], v2 = [];
    for (let a = 1.06; a <= 1.3001; a += 0.004) {
      const m = mikroskop(a);
      if (!m) continue;
      v1.push({ t: a, v: m.bo });
      if (isFinite(m.M)) v2.push({ t: a, v: Math.min(m.M, 300) });
    }
    D.miniGrafik(ctx, Object.assign({}, sol, { baslik: 'Objektifte ara görüntü b − örnek uzaklığı a', birim: 'cm',
      tEtiket: 'a (cm)', veri: v1, tMin: 1.06, tMax: 1.3, vMin: 0, vMax: 20, renk: R.kuvvet,
      imlec: m0 ? { t: a0, v: Math.min(20, m0.bo) } : null }));
    D.miniGrafik(ctx, Object.assign({}, sag, { baslik: 'Toplam büyütme − a   (örnek odağa yaklaştıkça artar)', birim: '×',
      tEtiket: 'a (cm)', veri: v2, tMin: 1.06, tMax: 1.3, vMin: 0, vMax: 300, renk: R.normal,
      imlec: m0 && isFinite(m0.M) ? { t: a0, v: Math.min(300, m0.M) } : null }));
    return;
  }

  const f = odak(p, st);
  const ince = f > 0;
  const aCanli = cisimA(st, p);
  const aMax = p.mod > 3.5 && p.mod < 4.5 ? 20 * Math.abs(f)
             : Math.max(Math.abs(f) * 5, aletMi(p) ? (aletAl(st, p).a + aletAl(st, p).pay) * 1.1 : aEnBuyuk(p));
  const sinir = Math.abs(f) * 4;

  const v1 = [], v2 = [];
  for (let i = 1; i <= 240; i++) {
    const a = aMax * i / 240;
    const b = goruntuB(a, f);
    if (b === null) continue;
    v1.push({ t: a, v: Math.max(-1.3 * sinir, Math.min(1.3 * sinir, b)) });
    v2.push({ t: a, v: Math.min(5.2, Math.abs(b / a)) });
  }
  const bC = goruntuB(aCanli, f);
  const imB = { t: aCanli, v: bC === null ? sinir : Math.max(-sinir, Math.min(sinir, bC)) };
  const imM = { t: aCanli, v: bC === null ? 4 : Math.min(4, Math.abs(bC / aCanli)) };

  kolluGrafik(ctx, Object.assign({}, sol, {
    baslik: ince ? 'b − a   (a = f’de b → ∞)' : 'b − a   (ıraksakta b daima −)',
    birim: 'cm', tEtiket: 'a (cm)', tMax: aMax,
    vMin: ince ? -sinir : -Math.abs(f) * 1.15, vMax: ince ? sinir : 0, renk: R.kuvvet
  }), v1, imB, f);
  kolluGrafik(ctx, Object.assign({}, sag, {
    baslik: ince ? 'Büyütme h′/h − a   (a = 2f’de tam 1)' : 'Büyütme h′/h − a   (daima < 1 · a = |f|’de ½)',
    birim: '', tEtiket: 'a (cm)', tMax: aMax, vMin: 0, vMax: ince ? 4 : 1.05, renk: R.normal
  }), v2, imM, f);
}

/* ------------------------------------------------------------ Okumalar */

function okumalar(st, p) {
  if (aletMi(p) && aletAl(st, p).iki) {
    const a = cisimA(st, p), m = mikroskop(a);
    return [
      { et: 'Alet',               dg: 'Mikroskop', birim: '' },
      { et: 'Örnek uzaklığı a',   dg: D.biçim(a, 4), birim: 'cm' },
      { et: 'Ara görüntü',        dg: m ? D.biçim(m.bo, 4) + ' cm · ' + D.biçim(m.mo, 3) + '×' : '—', birim: '' },
      { et: 'Son görüntü',        dg: m && isFinite(m.be) ? D.biçim(m.be, 4) + ' cm · sanal' : '—', birim: '' },
      { et: 'Toplam büyütme',     dg: m ? D.biçim(m.M, 4) : '—', birim: '×' }
    ];
  }
  const f = odak(p, st), a = cisimA(st, p);
  const o = ozellik(a, f);
  if (p.mod > 3.5 && p.mod < 4.5) {
    return [
      { et: 'Cisim',            dg: 'Sonsuzda (paralel ışınlar)', birim: '' },
      { et: 'Odak uzaklığı f',  dg: D.biçim(f, 4), birim: 'cm' },
      { et: 'Görüntünün yeri',  dg: f > 0 ? 'F (öbür tarafta)' : 'Cisimle aynı taraftaki F', birim: '' },
      { et: 'Özelliği',         dg: 'Nokta · ' + (f > 0 ? 'gerçek' : 'sanal'), birim: '' }
    ];
  }

  const temel = [
    { et: 'Mercek türü',     dg: f > 0 ? 'Yakınsak (ince kenarlı)' : 'Iraksak (kalın kenarlı)', birim: '' },
    { et: 'Odak uzaklığı f', dg: D.biçim(f, 4), birim: 'cm' },
    { et: 'Cisim uzaklığı a',dg: D.biçim(a, 4), birim: 'cm' }
  ];
  if (o.b === undefined) {
    return temel.concat([
      { et: 'Durum',    dg: durumAdi(a, f),       birim: '' },
      { et: 'Görüntü',  dg: 'Sonsuzda (oluşmaz)', birim: '' }
    ]);
  }
  const ek = [
    { et: 'Görüntü uzaklığı b', dg: D.biçim(o.b, 4), birim: 'cm' },
    { et: 'Büyütme h′/h',       dg: D.biçim(o.m, 4), birim: '' },
    { et: 'Durum',              dg: durumAdi(a, f),  birim: '' },
    { et: 'Özellikleri',        dg: o.cins + ' · ' + o.yon + ' · ' + o.boy, birim: '' }
  ];
  if (aletMi(p)) {
    ek.push({ et: 'Alet', dg: aletAl(st, p).ad, birim: '' });
    ek.push({ et: 'Perdeye düşer mi?', dg: o.b > 0 ? 'Evet' : 'Hayır (sanal)', birim: '' });
  }
  return temel.concat(ek);
}

/* ------------------------------------------------------------- Kayıt */

D.simler = D.simler || {};
D.simler['mercek-goruntu'] = {
  id: 'mercek-goruntu',
  baslik: '3.8.2 · Merceklerde görüntü · 1/f = 1/a + 1/b',
  yukseklik: 350,
  grafikPanel: true,
  grafikYukseklik: 150,
  parametreler: [
    { anahtar: 'mod', etiket: 'Düzenek', tur: 'secim', deger: 1, secenekler: [
      { d: 1, e: 'Cisim uzaklığını tara' },
      { d: 4, e: 'Cisim sonsuzda (paralel ışınlar)' },
      { d: 2, e: 'Otomatik tur — beş durum' },
      { d: 5, e: 'Yaylı sarkaçtaki cisim (Alıştırma 28)' },
      { d: 3, e: 'Optik aletler' }
    ]},
    { anahtar: 'tur', etiket: 'Mercek türü', tur: 'secim', deger: 1, secenekler: [
      { d: 1, e: 'Yakınsak (ince kenarlı)' },
      { d: 2, e: 'Iraksak (kalın kenarlı)' }
    ]},
    { anahtar: 'alet', etiket: 'Optik alet', tur: 'secim', deger: 1, secenekler: [
      { d: 1, e: 'Fotoğraf makinesi' },
      { d: 2, e: 'Projeksiyon' },
      { d: 3, e: 'Büyüteç' },
      { d: 4, e: 'Kapı dürbünü' },
      { d: 5, e: 'Mikroskop' }
    ]},
    { anahtar: 'f', etiket: 'Odak uzaklığı f', min: 8,  max: 50,  adim: 2, deger: 20, birim: 'cm' },
    { anahtar: 'a', etiket: 'Cisim uzaklığı a', min: 4, max: 200, adim: 2, deger: 60, birim: 'cm' }
  ],
  durum, adim, bitti, cizGercek, cizKlasik, cizGrafik, okumalar
};

})();
