(function () {
"use strict";
window.F11 = window.F11 || {};

/* ==========================================================================
   draw2d.js — Ortak 2B çizim kütüphanesi
   --------------------------------------------------------------------------
   Tüm simülasyonlar bu fonksiyonları kullanır. Amaç:
     · her sahnede aynı görsel dil (aynı ok ucu, aynı etiket, aynı renk)
     · sıfır görsel dosyası — her şey vektör, çevrimdışı çalışır
     · ucuz: sabit arka planlar bir kez çizilip çevrimdışı tuvalde saklanır

   Koordinat sözleşmesi:
     Bu kütüphane EKRAN koordinatı alır (x sağa, y AŞAĞI artar).
     Fiziksel koordinat dönüşümünü her simülasyon kendi ölçekleyicisiyle yapar.
   ========================================================================== */

/* ------------------------------------------------------------------ Renk */
/* Fizik büyüklüklerinin sabit renkleri — tokens.css ile birebir aynı.
   Tuval CSS değişkeni okuyamadığı için burada da yazılı. */
const R_BUYUKLUK_PARLAK = {
  konum:     '#4DA3FF',
  hiz:       '#35C08A',
  ivme:      '#FFB020',
  kuvvet:    '#FF6B6B',
  surtunme:  '#A78BFA',
  normal:    '#38D6E0',
  agirlik:   '#FF8FA3',
  merkezcil: '#FF7A45'
};

/* Kâğıt (açık) zeminde aynı anlamların koyulaştırılmış karşılıkları.
   Ton aynı kalır — öğrenci "yeşil = hız" bilgisini korur — yalnızca
   parlaklık düşer, böylece açık zeminde okunur. */
const R_BUYUKLUK_KOYU = {
  konum:     '#1F6FD0',
  hiz:       '#0E7A54',
  ivme:      '#A86C00',
  kuvvet:    '#C33A3A',
  surtunme:  '#6A45C2',
  normal:    '#0B757F',
  agirlik:   '#B94C63',
  merkezcil: '#B54A19'
};

const R = {
  konum:     '#4DA3FF',
  hiz:       '#35C08A',
  ivme:      '#FFB020',
  kuvvet:    '#FF6B6B',
  surtunme:  '#A78BFA',
  normal:    '#38D6E0',
  agirlik:   '#FF8FA3',
  merkezcil: '#FF7A45',

  /* sahne renkleri (gerçekçi panel her zaman aydınlık) */
  gok:       '#D6EAF8',
  gokAlt:    '#EAF4FC',
  gunes:     '#FAC775',
  bulut:     '#FFFFFF',
  tepe:      '#C0DD97',
  cim:       '#97C459',
  cimKoyu:   '#639922',
  toprak:    '#B08968',
  tugla:     '#D85A30',
  tuglaDrz:  '#B84A26',
  tuglaKoyu: '#993C1D',
  cam:       '#85B7EB',
  camCerc:   '#0C447C',
  beton:     '#9AA5B1',
  metal:     '#7D8A99',
  ahsap:     '#C98B4B',
  ahsapKoyu: '#8A5A28',
  top:       '#E24B4A',
  topIsik:   '#F09595',
  golge:     'rgba(20,35,60,.13)',
  mur:       '#444441',
  murAcik:   '#6E7684'
};

/* Klasik fizik panelinin paleti. İki seçenek var:
     'pano'  — koyu zemin (varsayılan)
     'kagit' — açık zemin, klasik fizik sorusundaki çizim gibi

   'beyaz' anahtarı "en güçlü metin rengi" demektir; kâğıt palette koyu bir
   değer alır. Adı 19 yerde kullanıldığı için korunmuştur.
   'hale' yazıların etrafındaki kontur rengidir: koyu zeminde koyu, açık
   zeminde beyaz olmalı — yoksa yazılar lekeli görünür. */
const K_PANO = {
  zemin:  '#17223A',
  izgara: '#223150',
  eksen:  '#4A5F86',
  metin:  '#A7B8D4',
  metin2: '#6F84A8',
  beyaz:  '#EAF0FA',
  hale:   'rgba(11,18,32,.55)',
  klasikZemin: '#111A2B',
  grafikZemin: '#0E1726'
};

const K_KAGIT = {
  zemin:  '#E2E9F3',
  izgara: '#D5DFEC',
  eksen:  '#4F627E',
  metin:  '#39445A',
  metin2: '#66738C',
  beyaz:  '#121924',
  hale:   'rgba(255,255,255,.88)',
  klasikZemin: '#F4F7FB',
  grafikZemin: '#EFF3F9'
};

const K = Object.assign({}, K_PANO);

/**
 * Simülasyon panellerinin görünümünü değiştirir.
 *   'pano'  → koyu klasik panel + koyu grafikler (varsayılan)
 *   'kagit' → açık klasik panel + açık grafikler, vektörler koyulaştırılır
 * Gerçekçi panel her iki durumda da aydınlıktır, değişmez.
 */
function simTema(mod) {
  const kagit = mod === 'kagit';
  Object.assign(K, kagit ? K_KAGIT : K_PANO);
  Object.assign(R, kagit ? R_BUYUKLUK_KOYU : R_BUYUKLUK_PARLAK);
  /* Panel köşesindeki HTML etiketi CSS ile boyanıyor; paletle uyumlu kalsın. */
  document.documentElement.dataset.simtema = kagit ? 'kagit' : 'pano';
  return kagit ? 'kagit' : 'pano';
}

/* ----------------------------------------------------- Manyetizma */
/* Manyetik alanın sayfa düzlemine DİK bileşenleri geleneksel olarak
   nokta (⊙ = okun ucu, bize doğru) ve çarpı (⊗ = okun tüyü, sayfaya doğru)
   ile gösterilir. Bu iki sembol 2. ünitenin tamamında kullanılır. */

/** ⊙ — sayfadan DIŞARI (bize doğru). */
function alanDisari(ctx, x, y, r = 7, renk = '#38D6E0') {
  ctx.save();
  ctx.strokeStyle = renk; ctx.fillStyle = renk; ctx.lineWidth = 1.6;
  ctx.beginPath(); ctx.arc(x, y, r, 0, 6.2832); ctx.stroke();
  ctx.beginPath(); ctx.arc(x, y, r * 0.3, 0, 6.2832); ctx.fill();
  ctx.restore();
}

/** ⊗ — sayfanın İÇİNE (bizden uzağa). */
function alanIceri(ctx, x, y, r = 7, renk = '#38D6E0') {
  ctx.save();
  ctx.strokeStyle = renk; ctx.lineWidth = 1.6;
  ctx.beginPath(); ctx.arc(x, y, r, 0, 6.2832); ctx.stroke();
  const k = r * 0.62;
  ctx.beginPath();
  ctx.moveTo(x - k, y - k); ctx.lineTo(x + k, y + k);
  ctx.moveTo(x + k, y - k); ctx.lineTo(x - k, y + k);
  ctx.stroke();
  ctx.restore();
}

/**
 * Düzgün manyetik alan bölgesi: ⊙ ya da ⊗ ızgarası.
 * yon > 0 → dışarı (⊙),  yon < 0 → içeri (⊗)
 */
function alanBolgesi(ctx, x, y, w, h, yon, renk = '#38D6E0', adim = 34) {
  ctx.save();
  ctx.globalAlpha = 0.85;
  for (let yy = y + adim / 2; yy < y + h; yy += adim)
    for (let xx = x + adim / 2; xx < x + w; xx += adim)
      (yon > 0 ? alanDisari : alanIceri)(ctx, xx, yy, 6, renk);
  ctx.restore();
}

/**
 * Çubuk mıknatıs. Kırmızı yarı N, mavi yarı S.
 * ters = true ise kutuplar yer değiştirir.
 */
function miknatis(ctx, x, y, w, h, ters = false, dikey = false) {
  ctx.save();
  const n = '#E2483F', sK = '#2F6FD0';
  if (dikey) {
    ctx.fillStyle = ters ? sK : n; ctx.fillRect(x, y, w, h / 2);
    ctx.fillStyle = ters ? n : sK; ctx.fillRect(x, y + h / 2, w, h / 2);
  } else {
    ctx.fillStyle = ters ? sK : n; ctx.fillRect(x, y, w / 2, h);
    ctx.fillStyle = ters ? n : sK; ctx.fillRect(x + w / 2, y, w / 2, h);
  }
  ctx.strokeStyle = 'rgba(20,30,50,.35)'; ctx.lineWidth = 1.4;
  ctx.strokeRect(x, y, w, h);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 ' + Math.max(11, Math.min(17, h * 0.42)) + 'px system-ui, sans-serif';
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  if (dikey) {
    ctx.fillText(ters ? 'S' : 'N', x + w / 2, y + h * 0.25);
    ctx.fillText(ters ? 'N' : 'S', x + w / 2, y + h * 0.75);
  } else {
    ctx.fillText(ters ? 'S' : 'N', x + w * 0.25, y + h / 2);
    ctx.fillText(ters ? 'N' : 'S', x + w * 0.75, y + h / 2);
  }
  ctx.restore();
}

/** Pusula: gövde + kuzeyi kırmızı olan iğne. aci radyan, 0 = sağ. */
function pusula(ctx, x, y, r, aci) {
  ctx.save();
  ctx.fillStyle = 'rgba(255,255,255,.92)';
  ctx.beginPath(); ctx.arc(x, y, r, 0, 6.2832); ctx.fill();
  ctx.strokeStyle = '#7D8A99'; ctx.lineWidth = 1.6; ctx.stroke();

  const ux = Math.cos(aci), uy = Math.sin(aci);
  const px = -uy, py = ux;
  const uc = r * 0.82, en = r * 0.22;
  /* kuzey yarısı */
  ctx.fillStyle = '#E2483F';
  ctx.beginPath();
  ctx.moveTo(x + ux * uc, y + uy * uc);
  ctx.lineTo(x + px * en, y + py * en);
  ctx.lineTo(x - px * en, y - py * en);
  ctx.closePath(); ctx.fill();
  /* güney yarısı */
  ctx.fillStyle = '#2F6FD0';
  ctx.beginPath();
  ctx.moveTo(x - ux * uc, y - uy * uc);
  ctx.lineTo(x + px * en, y + py * en);
  ctx.lineTo(x - px * en, y - py * en);
  ctx.closePath(); ctx.fill();

  ctx.fillStyle = '#4A5059';
  ctx.beginPath(); ctx.arc(x, y, r * 0.12, 0, 6.2832); ctx.fill();
  ctx.restore();
}

/* ---------------------------------------------------------- Optik */
/* 3. ünitenin tamamı bu yardımcılar üzerine kurulur: ışın, ayna, mercek,
   normal doğrultusu ve saydam ortam. Işınlar daima ok uçludur; öğrenci
   yönü kaybetmesin diye. */

/** Işın — düz çizgi + ortasında yön oku. */
function isin(ctx, x1, y1, x2, y2, renk = '#FFB020', kalinlik = 2, okla = true) {
  ctx.save();
  ctx.strokeStyle = renk; ctx.lineWidth = kalinlik; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();

  if (okla) {
    const dx = x2 - x1, dy = y2 - y1, d = Math.hypot(dx, dy) || 1;
    const ux = dx / d, uy = dy / d;
    const mx = x1 + dx * 0.55, my = y1 + dy * 0.55;
    ctx.fillStyle = renk;
    ctx.beginPath();
    ctx.moveTo(mx + ux * 7, my + uy * 7);
    ctx.lineTo(mx - uy * 4.2 - ux * 2, my + ux * 4.2 - uy * 2);
    ctx.lineTo(mx + uy * 4.2 - ux * 2, my - ux * 4.2 - uy * 2);
    ctx.closePath(); ctx.fill();
  }
  ctx.restore();
}

/** Kesikli ışın — sanal ışınlar (görüntünün arkasındaki uzantılar) için. */
function sanalIsin(ctx, x1, y1, x2, y2, renk = '#8FA8C8') {
  kesikliCizgi(ctx, x1, y1, x2, y2, renk, 1.6, [6, 5]);
}

/** Ampul — parlaklık 0..1 arası hâleyi büyütür. */
function ampul(ctx, x, y, r = 16, parlaklik = 1) {
  ctx.save();
  ctx.globalAlpha = 0.18 + parlaklik * 0.6;
  const g = ctx.createRadialGradient(x, y, r * 0.3, x, y, r * 3.2);
  g.addColorStop(0, '#FFE9A8'); g.addColorStop(1, 'rgba(255,210,74,0)');
  ctx.fillStyle = g;
  ctx.beginPath(); ctx.arc(x, y, r * 3.2, 0, 6.2832); ctx.fill();
  ctx.restore();

  ctx.save();
  ctx.fillStyle = '#FFD24A';
  ctx.beginPath(); ctx.arc(x, y, r, 0, 6.2832); ctx.fill();
  ctx.fillStyle = '#9AA5B1';
  ctx.fillRect(x - r * 0.42, y + r * 0.86, r * 0.84, r * 0.6);
  ctx.restore();
}

/**
 * Düzlem ayna. aci radyan (0 = dikey ayna).
 * Arkasına tarama çizilir — hangi yüzün yansıttığı belli olsun diye.
 */
function duzlemAyna(ctx, x, y, boy, aci = 0, renk = '#8FB6EC') {
  const ux = Math.sin(aci), uy = -Math.cos(aci);       // ayna doğrultusu
  const nx = Math.cos(aci), ny = Math.sin(aci);        // normal (arka yön)
  ctx.save();
  ctx.strokeStyle = renk; ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(x - ux * boy / 2, y - uy * boy / 2);
  ctx.lineTo(x + ux * boy / 2, y + uy * boy / 2);
  ctx.stroke();

  /* arka tarama */
  ctx.strokeStyle = 'rgba(120,150,200,.75)'; ctx.lineWidth = 1.6;
  const adet = Math.max(4, Math.round(boy / 12));
  for (let k = 0; k <= adet; k++) {
    const t = -boy / 2 + (k / adet) * boy;
    const bx = x + ux * t, by = y + uy * t;
    ctx.beginPath();
    ctx.moveTo(bx, by);
    ctx.lineTo(bx + nx * 9 + ux * 7, by + ny * 9 + uy * 7);
    ctx.stroke();
  }
  ctx.restore();
}

/**
 * Küresel ayna yayı.
 * tur: 'cukur' (çukur/konkav) ya da 'tumsek' (tümsek/konveks)
 * Tepe noktası (x, y), eğrilik yarıçapı R, açıklık yarım açısı yariAci.
 */
function kureselAyna(ctx, x, y, R, tur = 'cukur', yariAci = 0.6, renk = '#8FB6EC') {
  /* Işık SOLDAN gelir kabulüyle çizilir:
     çukur aynanın oyuğu sola bakar, eğrilik merkezi M aynanın ÖNÜNDEDİR;
     tümsek aynanın kamburu sola bakar, M aynanın ARKASINDADIR. */
  const cukur = tur === 'cukur';
  const cx = cukur ? x - R : x + R;                    // eğrilik merkezi
  const bas = cukur ? -yariAci : Math.PI - yariAci;
  const son = cukur ?  yariAci : Math.PI + yariAci;

  ctx.save();
  ctx.strokeStyle = renk; ctx.lineWidth = 4;
  ctx.beginPath(); ctx.arc(cx, y, R, bas, son); ctx.stroke();

  /* arka tarama */
  ctx.strokeStyle = 'rgba(120,150,200,.7)'; ctx.lineWidth = 1.4;
  for (let k = 0; k <= 10; k++) {
    const a = bas + (k / 10) * (son - bas);
    const px = cx + Math.cos(a) * R, py = y + Math.sin(a) * R;
    /* tarama daima SIRLI arka yüze düşmeli:
       çukurda merkezden UZAĞA, tümsekte merkeze DOĞRU */
    const dx = Math.cos(a) * (cukur ? 1 : -1), dy = Math.sin(a) * (cukur ? 1 : -1);
    ctx.beginPath();
    ctx.moveTo(px, py); ctx.lineTo(px + dx * 9, py + dy * 9);
    ctx.stroke();
  }
  ctx.restore();
  return cx;
}

/**
 * İnce mercek.
 * tur: 'ince' (yakınsak / dışbükey) ya da 'kalin' (ıraksak / içbükey)
 */
function mercek(ctx, x, y, boy, tur = 'ince', renk = '#7FD4E6') {
  const yarim = boy / 2, sismanlik = boy * 0.13;
  ctx.save();
  ctx.fillStyle = 'rgba(127,212,230,.20)';
  ctx.strokeStyle = renk; ctx.lineWidth = 2.6;
  ctx.beginPath();
  if (tur === 'ince') {
    ctx.moveTo(x, y - yarim);
    ctx.quadraticCurveTo(x + sismanlik, y, x, y + yarim);
    ctx.quadraticCurveTo(x - sismanlik, y, x, y - yarim);
  } else {
    ctx.moveTo(x - sismanlik * 0.7, y - yarim);
    ctx.quadraticCurveTo(x + sismanlik * 0.5, y, x - sismanlik * 0.7, y + yarim);
    ctx.lineTo(x + sismanlik * 0.7, y + yarim);
    ctx.quadraticCurveTo(x - sismanlik * 0.5, y, x + sismanlik * 0.7, y - yarim);
  }
  ctx.closePath(); ctx.fill(); ctx.stroke();

  /* mercek tipini gösteren uç okları */
  ctx.strokeStyle = renk; ctx.lineWidth = 2;
  const o = tur === 'ince' ? 1 : -1;
  [[y - yarim, -1], [y + yarim, 1]].forEach(([yy, s]) => {
    ctx.beginPath();
    ctx.moveTo(x - 6 * o, yy + s * 6 * o);
    ctx.lineTo(x, yy);
    ctx.lineTo(x + 6 * o, yy + s * 6 * o);
    ctx.stroke();
  });
  ctx.restore();
}

/** Saydam ortam bloğu — kırılma sahneleri için. */
function ortam(ctx, x, y, w, h, etiket, renk = 'rgba(80,150,200,.28)') {
  ctx.save();
  ctx.fillStyle = renk;
  ctx.fillRect(x, y, w, h);
  ctx.strokeStyle = 'rgba(127,212,230,.7)'; ctx.lineWidth = 1.6;
  ctx.strokeRect(x, y, w, h);
  ctx.restore();
  if (etiket)
    yaziAydinlik(ctx, etiket, x + 8, y + 16, '#1B3A52',
                 '700 12px system-ui, sans-serif', 'left');
}

/** Yüzey normali — kesikli, iki yöne uzanan doğrultu. */
function normalDogrultu(ctx, x, y, boy, aci = 0, renk = '#9AA5B1') {
  const ux = Math.cos(aci), uy = Math.sin(aci);
  kesikliCizgi(ctx, x - ux * boy, y - uy * boy, x + ux * boy, y + uy * boy,
               renk, 1.4, [5, 4]);
}

/** Nesne oku — optikte cisim daima yukarı bakan bir okla gösterilir. */
function nesneOku(ctx, x, tabanY, boy, renk = '#35C08A', etiket) {
  ctx.save();
  ctx.strokeStyle = renk; ctx.lineWidth = 3.4; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(x, tabanY); ctx.lineTo(x, tabanY - boy); ctx.stroke();
  ctx.fillStyle = renk;
  const yon = boy >= 0 ? 1 : -1;
  ctx.beginPath();
  ctx.moveTo(x, tabanY - boy);
  ctx.lineTo(x - 6, tabanY - boy + 11 * yon);
  ctx.lineTo(x + 6, tabanY - boy + 11 * yon);
  ctx.closePath(); ctx.fill();
  ctx.restore();
  if (etiket)
    yaziHaleli(ctx, etiket, x, tabanY - boy - 14 * (boy >= 0 ? 1 : -1), renk,
               '700 12px system-ui, sans-serif', 'center');
}

/* -------------------------------------------------------------- Yardımcı */

/** Tuvali kapsayıcıya göre boyutlar, DPR'ı 1.5'te sınırlar (eski makineler için). */
function tuvaliOlcekle(canvas, ctx) {
  const r = canvas.getBoundingClientRect();
  const d = Math.min(window.devicePixelRatio || 1, 1.5);
  const w = Math.max(1, Math.round(r.width));
  const h = Math.max(1, Math.round(r.height));
  if (canvas.width !== Math.round(w * d) || canvas.height !== Math.round(h * d)) {
    canvas.width = Math.round(w * d);
    canvas.height = Math.round(h * d);
  }
  ctx.setTransform(d, 0, 0, d, 0, 0);
  return { w, h };
}

/** Yuvarlatılmış dikdörtgen yolu açar (fill/stroke çağıran tarafta). */
function yuvarlakDik(ctx, x, y, w, h, r = 6) {
  const k = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + k, y);
  ctx.arcTo(x + w, y,     x + w, y + h, k);
  ctx.arcTo(x + w, y + h, x,     y + h, k);
  ctx.arcTo(x,     y + h, x,     y,     k);
  ctx.arcTo(x,     y,     x + w, y,     k);
  ctx.closePath();
}

/** Kesikli çizgi çizer ve kesik ayarını geri alır. */
function kesikliCizgi(ctx, x1, y1, x2, y2, renk, kalinlik = 1, desen = [3, 5]) {
  ctx.save();
  ctx.setLineDash(desen);
  ctx.strokeStyle = renk; ctx.lineWidth = kalinlik;
  ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
  ctx.restore();
}

/* ------------------------------------------------------------------- Ok */

/**
 * Ok çizer. Vektörlerin tek kaynağı — her simülasyon bunu kullanır,
 * böylece ok uçları her sahnede aynı görünür.
 */
function ok(ctx, x1, y1, x2, y2, renk, kalinlik = 2.4, ucBoy = 10) {
  const dx = x2 - x1, dy = y2 - y1;
  const boy = Math.hypot(dx, dy);
  if (boy < 0.6) return;
  const ux = dx / boy, uy = dy / boy;
  const gövde = Math.max(0, boy - ucBoy * 0.85);

  ctx.save();
  ctx.strokeStyle = renk; ctx.fillStyle = renk;
  ctx.lineWidth = kalinlik; ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x1 + ux * gövde, y1 + uy * gövde);
  ctx.stroke();

  const g = ucBoy * 0.46;
  ctx.beginPath();
  ctx.moveTo(x2, y2);
  ctx.lineTo(x2 - ux * ucBoy - uy * g, y2 - uy * ucBoy + ux * g);
  ctx.lineTo(x2 - ux * ucBoy + uy * g, y2 - uy * ucBoy - ux * g);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

/** Ok + ucuna etiket. Etiket okun sağına/soluna otomatik kaçar. */
function vektor(ctx, x1, y1, x2, y2, renk, etiket, opt = {}) {
  const { kalinlik = 2.4, ucBoy = 10, font = '600 13px system-ui, sans-serif' } = opt;
  ok(ctx, x1, y1, x2, y2, renk, kalinlik, ucBoy);
  if (!etiket) return;
  const dx = x2 - x1, dy = y2 - y1, boy = Math.hypot(dx, dy) || 1;
  const nx = -dy / boy, ny = dx / boy;           // dik yön
  const ox = x2 + nx * 13 + (dx / boy) * 6;
  const oy = y2 + ny * 13 + (dy / boy) * 6;
  yaziHaleli(ctx, etiket, ox, oy, renk, font, 'center');
}

/* ----------------------------------------------------------------- Yazı */

/**
 * Arkasına hafif hale koyarak yazı çizer — karmaşık sahnede okunurluk için.
 * hizala: 'left' | 'center' | 'right'
 */
function yaziHaleli(ctx, metin, x, y, renk, font = '13px system-ui, sans-serif',
                           hizala = 'left', haleRenk = null) {
  ctx.save();
  ctx.font = font;
  ctx.textAlign = hizala;
  ctx.textBaseline = 'middle';
  ctx.lineJoin = 'round';
  ctx.lineWidth = 3.5;
  ctx.strokeStyle = haleRenk || K.hale;
  ctx.strokeText(metin, x, y);
  ctx.fillStyle = renk;
  ctx.fillText(metin, x, y);
  ctx.restore();
}

/** Aydınlık sahnede kullanılacak hale (beyaz zemin üstü). */
function yaziAydinlik(ctx, metin, x, y, renk = R.mur,
                             font = '13px system-ui, sans-serif', hizala = 'left') {
  yaziHaleli(ctx, metin, x, y, renk, font, hizala, 'rgba(255,255,255,.8)');
}

/**
 * Küçük etiket rozeti.
 * ortala = true ise x, rozetin SOL kenarı değil MERKEZİ olarak yorumlanır.
 * Panel köşelerinde HTML etiketleriyle çakışmaması gereken rozetler için.
 */
function rozet(ctx, metin, x, y, zeminRenk, metinRenk,
               font = '600 12px system-ui, sans-serif', ortala = false) {
  ctx.save();
  ctx.font = font;
  const g = ctx.measureText(metin).width + 22;
  const sol = ortala ? Math.round(x - g / 2) : x;
  ctx.fillStyle = zeminRenk;
  yuvarlakDik(ctx, sol, y, g, 25, 12.5); ctx.fill();
  ctx.fillStyle = metinRenk;
  ctx.textBaseline = 'middle'; ctx.textAlign = 'left';
  ctx.fillText(metin, sol + 11, y + 13);
  ctx.restore();
  return g;
}

/* --------------------------------------------------------------- Sahne */

/** Gökyüzü + güneş + bulutlar. Gerçekçi panelin arka planı. */
function gokyuzu(ctx, w, h, ufuk, opt = {}) {
  const { gunes = true, bulutlar = true, gece = false } = opt;
  ctx.fillStyle = gece ? '#1B2A47' : R.gok;
  ctx.fillRect(0, 0, w, ufuk);
  if (!gece) {
    ctx.fillStyle = R.gokAlt;
    ctx.fillRect(0, ufuk - 46, w, 46);
  }
  if (gunes && !gece) {
    ctx.fillStyle = R.gunes;
    ctx.beginPath(); ctx.arc(w - 44, 34, 17, 0, 6.2832); ctx.fill();
    ctx.globalAlpha = .28;
    ctx.beginPath(); ctx.arc(w - 44, 34, 27, 0, 6.2832); ctx.fill();
    ctx.globalAlpha = 1;
  }
  if (bulutlar) { bulut(ctx, 26, 40, .85); bulut(ctx, w * .52, 26, .6); }
}

/** Tek bulut. */
function bulut(ctx, x, y, s = 1) {
  ctx.save();
  ctx.fillStyle = R.bulut;
  [[0, 0, 13], [14, -6, 17], [30, 0, 12], [15, 5, 15]].forEach(([a, b, r]) => {
    ctx.beginPath(); ctx.arc(x + a * s, y + b * s, r * s, 0, 6.2832); ctx.fill();
  });
  ctx.restore();
}

/** Uzaktaki tepeler — derinlik hissi verir, ucuzdur. */
function tepeler(ctx, w, ufuk) {
  ctx.fillStyle = R.tepe;
  ctx.beginPath();
  ctx.moveTo(0, ufuk);
  ctx.lineTo(w * .18, ufuk - 26); ctx.lineTo(w * .40, ufuk);
  ctx.lineTo(w * .52, ufuk); ctx.lineTo(w * .74, ufuk - 34); ctx.lineTo(w, ufuk);
  ctx.closePath(); ctx.fill();
}

/** Çim zemin + ot tutamları. */
function cimZemin(ctx, w, h, ufuk) {
  ctx.fillStyle = R.cim;
  ctx.fillRect(0, ufuk, w, h - ufuk);
  ctx.fillStyle = R.cimKoyu;
  for (let i = -6; i < w; i += 12) {
    ctx.beginPath();
    ctx.moveTo(i, h); ctx.lineTo(i + 4.5, ufuk + 1); ctx.lineTo(i + 9, h);
    ctx.closePath(); ctx.fill();
  }
}

/** Düz beton/asfalt zemin — laboratuvar tarzı sahneler için. */
function betonZemin(ctx, w, h, ufuk, renk = R.beton) {
  ctx.fillStyle = renk;
  ctx.fillRect(0, ufuk, w, h - ufuk);
  ctx.strokeStyle = 'rgba(0,0,0,.14)'; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(0, ufuk + .5); ctx.lineTo(w, ufuk + .5); ctx.stroke();
}

/** Taralı sabit zemin (klasik fizik çizimindeki duvar/yer gösterimi). */
function taramaliZemin(ctx, x1, x2, y, renk = K.eksen, aralik = 10, boy = 8) {
  ctx.save();
  ctx.strokeStyle = renk; ctx.lineWidth = 1.4;
  ctx.beginPath(); ctx.moveTo(x1, y); ctx.lineTo(x2, y); ctx.stroke();
  ctx.lineWidth = 1;
  for (let i = x1; i < x2; i += aralik) {
    ctx.beginPath(); ctx.moveTo(i + boy, y); ctx.lineTo(i, y + boy); ctx.stroke();
  }
  ctx.restore();
}

/* --------------------------------------------------------------- Yapı */

/** Tuğla kule/bina. Serbest düşme, atış, görünür yükseklik sahnelerinde. */
function tuglaKule(ctx, x, yUst, g, yAlt, opt = {}) {
  const { mazgal = true, pencere = true, kapi = true } = opt;
  const yuk = yAlt - yUst;

  ctx.save();
  ctx.fillStyle = R.tugla;
  ctx.fillRect(x, yUst, g, yuk);

  /* tuğla derzleri */
  ctx.strokeStyle = R.tuglaDrz; ctx.lineWidth = 1;
  const sira = 12;
  for (let r = yUst; r < yAlt; r += sira) {
    ctx.beginPath(); ctx.moveTo(x, r + .5); ctx.lineTo(x + g, r + .5); ctx.stroke();
    const kayma = (Math.round((r - yUst) / sira) % 2) ? 0 : g / 4;
    for (let c = kayma; c < g; c += g / 2) {
      ctx.beginPath();
      ctx.moveTo(x + c + .5, r); ctx.lineTo(x + c + .5, Math.min(r + sira, yAlt));
      ctx.stroke();
    }
  }

  /* üst saçak + mazgal */
  ctx.fillStyle = R.tuglaKoyu;
  ctx.fillRect(x - 5, yUst, g + 10, 7);
  if (mazgal) {
    const n = Math.max(3, Math.floor(g / 15));
    const mg = (g + 10) / (n * 2 - 1);
    for (let i = 0; i < n; i++) ctx.fillRect(x - 5 + i * mg * 2, yUst - 10, mg, 10);
  }

  /* pencereler */
  if (pencere) {
    for (let wy = yUst + 24; wy < yAlt - 34; wy += 42) {
      ctx.fillStyle = R.camCerc; yuvarlakDik(ctx, x + g / 2 - 9, wy, 18, 24, 8); ctx.fill();
      ctx.fillStyle = R.cam;     yuvarlakDik(ctx, x + g / 2 - 7, wy + 2, 14, 20, 7); ctx.fill();
    }
  }

  /* kapı */
  if (kapi) {
    ctx.fillStyle = R.tuglaKoyu;
    yuvarlakDik(ctx, x + g / 2 - 8, yAlt - 28, 16, 28, 7); ctx.fill();
  }
  ctx.restore();
}

/** Basit insan figürü (baş + gövde + kol). Ölçek: boy ~ 26*s piksel. */
function insan(ctx, x, yAyak, s = 1, renk = '#3C3489', kolAci = -0.5) {
  ctx.save();
  ctx.strokeStyle = renk; ctx.fillStyle = renk;
  ctx.lineWidth = 2.2 * s; ctx.lineCap = 'round';
  const bas = yAyak - 24 * s;
  ctx.beginPath(); ctx.arc(x, bas, 4 * s, 0, 6.2832); ctx.fill();
  ctx.beginPath(); ctx.moveTo(x, bas + 4 * s); ctx.lineTo(x, yAyak - 9 * s); ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x, yAyak - 9 * s); ctx.lineTo(x - 4 * s, yAyak);
  ctx.moveTo(x, yAyak - 9 * s); ctx.lineTo(x + 4 * s, yAyak);
  ctx.stroke();
  const kx = x + Math.cos(kolAci) * 9 * s, ky = bas + 7 * s + Math.sin(kolAci) * 9 * s;
  ctx.beginPath(); ctx.moveTo(x, bas + 7 * s); ctx.lineTo(kx, ky); ctx.stroke();
  ctx.restore();
  return { elX: kx, elY: ky };
}

/* ---------------------------------------------------------- Nesneler */

/** Küre/top — hafif ışık noktasıyla hacim hissi. */
function top(ctx, x, y, r, renk = R.top, isik = R.topIsik) {
  ctx.save();
  ctx.fillStyle = renk;
  ctx.beginPath(); ctx.arc(x, y, r, 0, 6.2832); ctx.fill();
  ctx.fillStyle = isik;
  ctx.beginPath(); ctx.arc(x - r * .32, y - r * .36, r * .33, 0, 6.2832); ctx.fill();
  ctx.restore();
}

/** Hareket izi — geçmiş konumlar soluklaşarak. */
function iz(ctx, noktalar, renk = R.top, r = 6) {
  ctx.save();
  const n = noktalar.length;
  noktalar.forEach((p, i) => {
    ctx.globalAlpha = .06 + .26 * (i / Math.max(1, n - 1));
    ctx.fillStyle = renk;
    ctx.beginPath(); ctx.arc(p.x, p.y, r, 0, 6.2832); ctx.fill();
  });
  ctx.restore();
}

/** Sandık/blok — sürtünme ve Newton sahnelerinde. */
function sandik(ctx, x, y, g, yuk, aci = 0) {
  ctx.save();
  ctx.translate(x, y); ctx.rotate(aci);
  ctx.fillStyle = R.ahsap;   ctx.fillRect(-g / 2, -yuk, g, yuk);
  ctx.strokeStyle = R.ahsapKoyu; ctx.lineWidth = 2;
  ctx.strokeRect(-g / 2, -yuk, g, yuk);
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  ctx.moveTo(-g / 2, -yuk); ctx.lineTo(g / 2, 0);
  ctx.moveTo(g / 2, -yuk);  ctx.lineTo(-g / 2, 0);
  ctx.stroke();
  ctx.restore();
}

/** Eğik düzlem (rampa). Tepe açısı sol altta. */
function egikDuzlem(ctx, x0, y0, taban, aciRad) {
  const yuk = taban * Math.tan(aciRad);
  ctx.save();
  ctx.fillStyle = R.ahsap;
  ctx.beginPath();
  ctx.moveTo(x0, y0); ctx.lineTo(x0 + taban, y0); ctx.lineTo(x0 + taban, y0 - yuk);
  ctx.closePath(); ctx.fill();
  ctx.strokeStyle = R.ahsapKoyu; ctx.lineWidth = 2; ctx.stroke();
  ctx.restore();
  return { yuk, tepeX: x0 + taban, tepeY: y0 - yuk };
}

/** Açı yayı + derece etiketi. */
function aciYayi(ctx, x, y, r, bas, son, renk = K.metin, etiket = '') {
  /* Yay DAİMA kısa yönden çizilmeli. ctx.arc saat yönünde (artan açı) çizdiği
     için son < bas verilirse yay çemberin uzun tarafını dolaşır. Uçları burada
     sıralayıp açıklığı bir tam turla sınırlıyoruz. */
  if (son < bas) { const g = bas; bas = son; son = g; }
  const TAM = Math.PI * 2;
  if (son - bas > TAM) son = bas + ((son - bas) % TAM);

  ctx.save();
  ctx.strokeStyle = renk; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.arc(x, y, r, bas, son); ctx.stroke();
  ctx.restore();
  if (etiket) {
    const o = (bas + son) / 2;
    yaziHaleli(ctx, etiket, x + Math.cos(o) * (r + 15), y + Math.sin(o) * (r + 15),
               renk, '600 12px system-ui, sans-serif', 'center');
  }
}

/** Ölçü çizgisi (iki ucu çentikli, ortasında etiket). Dikey veya yatay. */
function olcu(ctx, x1, y1, x2, y2, etiket, renk = K.metin2) {
  ctx.save();
  ctx.strokeStyle = renk; ctx.lineWidth = 1.2;
  ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
  const dx = x2 - x1, dy = y2 - y1, b = Math.hypot(dx, dy) || 1;
  const nx = -dy / b * 5, ny = dx / b * 5;
  ctx.beginPath(); ctx.moveTo(x1 - nx, y1 - ny); ctx.lineTo(x1 + nx, y1 + ny);
  ctx.moveTo(x2 - nx, y2 - ny); ctx.lineTo(x2 + nx, y2 + ny); ctx.stroke();
  ctx.restore();
  if (etiket) yaziHaleli(ctx, etiket, (x1 + x2) / 2 + nx * 2.6, (y1 + y2) / 2 + ny * 2.6,
                         renk, '600 12px system-ui, sans-serif', 'center');
}

/* ------------------------------------------------- Klasik fizik paneli */

/** Kareli arka plan ızgarası. */
function izgara(ctx, w, h, adim = 28, renk = K.izgara) {
  ctx.save();
  ctx.strokeStyle = renk; ctx.lineWidth = 1;
  ctx.beginPath();
  for (let x = adim; x < w; x += adim) { ctx.moveTo(x + .5, 0); ctx.lineTo(x + .5, h); }
  for (let y = adim; y < h; y += adim) { ctx.moveTo(0, y + .5); ctx.lineTo(w, y + .5); }
  ctx.stroke();
  ctx.restore();
}

/**
 * Koordinat ekseni çizer ve etiketler.
 * cfg: { ox, oy, xUzun, yUzun, xEtiket, yEtiket, xBol, yBol, xMax, yMax, yYukari }
 * yYukari=true ise y ekseni yukarı doğru pozitif (fizikteki alışkanlık).
 */
function eksen(ctx, cfg) {
  const {
    ox, oy, xUzun, yUzun,
    xEtiket = 'x', yEtiket = 'y',
    xBol = 0, yBol = 0, xMax = 0, yMax = 0,
    olcek = 0, xTik = 0, yTik = 0,
    yYukari = true, renk = K.eksen, yaziRenk = K.metin2,
    birimX = '', birimY = ''
  } = cfg;

  const yUc = yYukari ? oy - yUzun : oy + yUzun;
  ctx.save();
  ctx.strokeStyle = renk; ctx.lineWidth = 1.6; ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(ox, oy); ctx.lineTo(ox + xUzun, oy);      // x
  ctx.moveTo(ox, oy); ctx.lineTo(ox, yUc);             // y
  ctx.stroke();

  /* ok uçları */
  ok(ctx, ox + xUzun - 12, oy, ox + xUzun, oy, renk, 1.6, 9);
  ok(ctx, ox, yUc + (yYukari ? 12 : -12), ox, yUc, renk, 1.6, 9);
  ctx.restore();

  yaziHaleli(ctx, `${xEtiket}${birimX ? ' (' + birimX + ')' : ''}`,
             ox + xUzun - 4, oy + 20, yaziRenk, '600 12px system-ui, sans-serif', 'right');
  yaziHaleli(ctx, `${yEtiket}${birimY ? ' (' + birimY + ')' : ''}`,
             ox + 6, yUc - 12, yaziRenk, '600 12px system-ui, sans-serif', 'left');

  /* --- çentikler ---
     İki kullanım biçimi var:
       1) olcek verilirse (piksel/birim): çentikler YUVARLAK birim değerlerine
          konur (10, 20, 50 …). Ölçekli çizimlerde bunu kullan.
       2) xBol/xMax verilirse: eksen eşit parçaya bölünür. Ölçeğin anlamı
          olmayan şematik çizimler için. */
  ctx.save();
  ctx.strokeStyle = renk; ctx.lineWidth = 1;

  if (olcek > 0) {
    const xAdim = xTik || guzelAdim(xUzun / olcek);
    for (let m = xAdim; m * olcek <= xUzun - 6; m += xAdim) {
      const px = ox + m * olcek;
      ctx.beginPath(); ctx.moveTo(px, oy); ctx.lineTo(px, oy + 5); ctx.stroke();
      yaziHaleli(ctx, biçim(m), px, oy + 16, yaziRenk,
                 '11px system-ui, sans-serif', 'center');
    }
    const yAdim = yTik || guzelAdim(yUzun / olcek);
    for (let m = yAdim; m * olcek <= yUzun - 6; m += yAdim) {
      const py = yYukari ? oy - m * olcek : oy + m * olcek;
      ctx.beginPath(); ctx.moveTo(ox, py); ctx.lineTo(ox - 5, py); ctx.stroke();
      yaziHaleli(ctx, biçim(m), ox - 9, py, yaziRenk,
                 '11px system-ui, sans-serif', 'right');
    }
  } else {
    if (xBol > 0 && xMax > 0) {
      for (let i = 1; i <= xBol; i++) {
        const px = ox + xUzun * i / xBol;
        ctx.beginPath(); ctx.moveTo(px, oy); ctx.lineTo(px, oy + 5); ctx.stroke();
        yaziHaleli(ctx, biçim(xMax * i / xBol), px, oy + 16, yaziRenk,
                   '11px system-ui, sans-serif', 'center');
      }
    }
    if (yBol > 0 && yMax > 0) {
      for (let i = 1; i <= yBol; i++) {
        const py = yYukari ? oy - yUzun * i / yBol : oy + yUzun * i / yBol;
        ctx.beginPath(); ctx.moveTo(ox, py); ctx.lineTo(ox - 5, py); ctx.stroke();
        yaziHaleli(ctx, biçim(yMax * i / yBol), ox - 9, py, yaziRenk,
                   '11px system-ui, sans-serif', 'right');
      }
    }
  }
  ctx.restore();
}

/**
 * Bir aralığa yakışan "güzel" çentik adımı döndürür: 1, 2, 5 ve bunların
 * 10 katları. Eksen üzerinde 33,05 gibi değerler yerine 20, 50 gibi yuvarlak
 * sayılar görünsün diye — klasik fizik panelinin tahtadaki çizim gibi
 * okunması gerekiyor.
 */
function guzelAdim(aralik, hedefBolme = 5) {
  if (!(aralik > 0)) return 1;
  const ham = aralik / hedefBolme;
  const us = Math.pow(10, Math.floor(Math.log10(ham)));
  const n = ham / us;
  return (n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10) * us;
}

/** Bir değeri, güzel bir çentik adımının tam katına yukarı yuvarlar. */
function guzelUst(v, hedefBolme = 4) {
  if (!(v > 0)) return 1;
  const a = guzelAdim(v, hedefBolme);
  return Math.ceil(v / a) * a;
}

/** Bir değeri güzel bir alt sınıra aşağı yuvarlar (negatifler için). */
function guzelAlt(v, hedefBolme = 4) {
  if (!(v < 0)) return 0;
  return -guzelUst(-v, hedefBolme);
}

/** Sayıyı Türkçe biçimde ve gereksiz ondalık olmadan yazar. */
function biçim(v, basamak = null) {
  if (!isFinite(v)) return '—';
  let s;
  if (basamak !== null) s = v.toFixed(basamak);
  else if (Math.abs(v - Math.round(v)) < 1e-9) s = String(Math.round(v));
  else if (Math.abs(v) >= 100) s = v.toFixed(0);
  else if (Math.abs(v) >= 10) s = v.toFixed(1);
  else s = v.toFixed(2);
  return s.replace('.', ',');
}

/** Serbest cisim diyagramı için nokta-cisim. */
function noktaCisim(ctx, x, y, r = 12, renk = K.beyaz) {
  ctx.save();
  ctx.fillStyle = renk;
  ctx.beginPath(); ctx.arc(x, y, r, 0, 6.2832); ctx.fill();
  ctx.restore();
}

/** Çembersel yörünge (kesikli daire). */
function yorunge(ctx, x, y, r, renk = K.eksen) {
  ctx.save();
  ctx.setLineDash([4, 6]);
  ctx.strokeStyle = renk; ctx.lineWidth = 1.4;
  ctx.beginPath(); ctx.arc(x, y, r, 0, 6.2832); ctx.stroke();
  ctx.restore();
}


/* ------------------------------------------------------------- Grafik */

/**
 * Küçük çizgi grafiği. Fizikte grafik okumak formül kadar önemli olduğu için
 * bu fonksiyon tüm ünitelerde kullanılır (ϑ-t, y-t, a-t, F-x, I-B ...).
 *
 * cfg = {
 *   x, y, w, h,          çerçeve (ekran koordinatı)
 *   baslik,              üstte yazan ad, ör. "ϑ - t"
 *   birim,               y ekseni birimi, ör. "m/s"
 *   veri: [{t, v}, ...], zaman sıralı noktalar
 *   tMax,                x ekseni üst sınırı (s)
 *   vMin, vMax,          y ekseni sınırları
 *   renk,                çizgi rengi
 *   dolgu                true ise eğri altını hafifçe boyar (alan = yol vurgusu)
 * }
 * Sıfır çizgisi vMin < 0 < vMax ise ayrıca çizilir — işaret değişimi görünür.
 */
function miniGrafik(ctx, cfg) {
  const {
    x, y, w, h, baslik = '', birim = '', veri = [],
    tMax = 1, vMin = 0, vMax = 1, renk = K.metin, dolgu = false,
    tEtiket = 't (s)', sifirdanBasla = true, tMin = 0, imlec = null
  } = cfg;

  const solPay = 34, altPay = 18, ustPay = 18;
  const gx = x + solPay, gy = y + ustPay;
  const gw = Math.max(10, w - solPay - 8);
  const gh = Math.max(10, h - ustPay - altPay);

  /* Eksen sınırlarını yuvarlak sayılara oturt — 19,5 yerine 20 yazsın. */
  /* Eksen sınırları yuvarlak sayılara oturur. Veri sıfırdan uzak dar bir
     aralıkta geziniyorsa (örn. kırılma indisi 1,51–1,53) sıfırdan başlamak
     eğriyi düz bir çizgiye çevirir; o durumda sifirdanBasla:false verilir ve
     sınırlar mutlak değere değil VERİ ARALIĞINA göre yuvarlanır. */
  let yUst, yAlt;
  if (sifirdanBasla) {
    yUst = guzelUst(vMax, 3);
    yAlt = vMin < 0 ? guzelAlt(vMin, 3) : 0;
  } else {
    const ad = guzelAdim(Math.max(1e-12, vMax - vMin), 4);
    yAlt = Math.floor(vMin / ad) * ad;
    yUst = Math.ceil(vMax / ad) * ad;
    if (yUst - yAlt < 1e-12) yUst = yAlt + ad;
  }

  /* Yatay eksen varsayılan olarak 0'dan başlar. Veri 1,30–1,48 gibi dar ve
     sıfırdan uzak bir aralıktaysa tMin verilerek eğri panele yayılır. */
  const pX = t => gx + (tMax > tMin ? ((t - tMin) / (tMax - tMin)) * gw : 0);
  const pY = v => gy + gh - ((v - yAlt) / (yUst - yAlt || 1)) * gh;

  /* çerçeve */
  ctx.save();
  ctx.strokeStyle = K.izgara; ctx.lineWidth = 1;
  ctx.strokeRect(gx + .5, gy + .5, gw, gh);

  /* yatay kılavuzlar */
  ctx.beginPath();
  for (let i = 1; i < 4; i++) { const yy = gy + gh * i / 4; ctx.moveTo(gx, yy + .5); ctx.lineTo(gx + gw, yy + .5); }
  ctx.stroke();
  ctx.restore();

  /* sıfır çizgisi — işaret değiştiren büyüklüklerde kritik */
  if (yAlt < 0 && yUst > 0) {
    const s0 = pY(0);
    ctx.save();
    ctx.strokeStyle = K.eksen; ctx.lineWidth = 1.4;
    ctx.beginPath(); ctx.moveTo(gx, s0); ctx.lineTo(gx + gw, s0); ctx.stroke();
    ctx.restore();
  }

  /* eksen etiketleri */
  yaziHaleli(ctx, baslik, gx, y + 9, renk, '700 11px system-ui, sans-serif', 'left');
  if (birim) yaziHaleli(ctx, birim, gx + gw, y + 9, K.metin2, '10px system-ui, sans-serif', 'right');
  yaziHaleli(ctx, biçim(yUst), gx - 5, gy + 4, K.metin2, '10px system-ui, sans-serif', 'right');
  yaziHaleli(ctx, biçim(yAlt), gx - 5, gy + gh - 4, K.metin2, '10px system-ui, sans-serif', 'right');
  /* tMax değeri, etiketin SOLUNA konur. Sabit 32 px kullanılırsa "göz (cm)" gibi
     uzun etiketlerde sayının üstüne biner. */
  ctx.save(); ctx.font = '10px system-ui, sans-serif';
  const etGen = ctx.measureText(tEtiket).width;
  ctx.restore();
  yaziHaleli(ctx, tEtiket, gx + gw, gy + gh + 11, K.metin2, '10px system-ui, sans-serif', 'right');
  yaziHaleli(ctx, biçim(tMax, 1), gx + gw - etGen - 8, gy + gh + 11, K.metin2, '10px system-ui, sans-serif', 'right');
  if (tMin !== 0)
    yaziHaleli(ctx, biçim(tMin, 1), gx, gy + gh + 11, K.metin2, '10px system-ui, sans-serif', 'left');

  if (veri.length < 2) { return; }

  /* eğri altı dolgu */
  if (dolgu) {
    ctx.save();
    ctx.globalAlpha = .14; ctx.fillStyle = renk;
    ctx.beginPath();
    ctx.moveTo(pX(veri[0].t), pY(Math.max(yAlt, Math.min(yUst, 0))));
    for (const d of veri) ctx.lineTo(pX(d.t), pY(Math.max(yAlt, Math.min(yUst, d.v))));
    ctx.lineTo(pX(veri[veri.length - 1].t), pY(Math.max(yAlt, Math.min(yUst, 0))));
    ctx.closePath(); ctx.fill();
    ctx.restore();
  }

  /* eğri — çerçeveye KIRPILIR: ekseni aşan veri (ör. kayan pencerenin
     solunda kalan eski kayıtlar) komşu grafiğin üstüne taşmasın. */
  ctx.save();
  ctx.beginPath(); ctx.rect(gx - 1, gy - 5, gw + 6, gh + 10); ctx.clip();
  ctx.strokeStyle = renk; ctx.lineWidth = 2.2; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  ctx.beginPath();
  veri.forEach((d, i) => {
    const px = pX(d.t), py = pY(Math.max(yAlt, Math.min(yUst, d.v)));
    i ? ctx.lineTo(px, py) : ctx.moveTo(px, py);
  });
  ctx.stroke();

  /* Eğrinin son noktası */
  const son = veri[veri.length - 1];
  ctx.fillStyle = renk;
  ctx.beginPath();
  ctx.arc(pX(son.t), pY(Math.max(yAlt, Math.min(yUst, son.v))), 3.6, 0, 6.2832);
  ctx.fill();
  ctx.restore();

  /* ÇALIŞMA NOKTASI
     Parametre taraması yapan grafiklerde eğri tüm aralık için bir kez çizilir
     ve hiç değişmez; öğrenci o an eğrinin NERESİNDE olduğunu göremez. imlec
     verilirse o nokta eğri üzerinde işaretlenir ve eksenlere kılavuz iner —
     tarama oynatıldığında bu işaret eğri boyunca KAYAR. */
  if (imlec && isFinite(imlec.t) && isFinite(imlec.v)) {
    const ix = pX(Math.max(tMin, Math.min(tMax, imlec.t)));
    const iy = pY(Math.max(yAlt, Math.min(yUst, imlec.v)));
    ctx.save();
    /* eksenlere kılavuz */
    ctx.strokeStyle = renk; ctx.globalAlpha = 0.45; ctx.lineWidth = 1;
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(gx, iy); ctx.lineTo(ix, iy);
    ctx.moveTo(ix, iy); ctx.lineTo(ix, gy + gh);
    ctx.stroke();
    ctx.setLineDash([]);
    /* halka + dolu iç — eğrinin üstünde net dursun */
    ctx.globalAlpha = 1;
    ctx.fillStyle = K.grafikZemin;
    ctx.beginPath(); ctx.arc(ix, iy, 6.4, 0, 6.2832); ctx.fill();
    ctx.strokeStyle = renk; ctx.lineWidth = 2.4;
    ctx.beginPath(); ctx.arc(ix, iy, 5.2, 0, 6.2832); ctx.stroke();
    ctx.fillStyle = renk;
    ctx.beginPath(); ctx.arc(ix, iy, 2.2, 0, 6.2832); ctx.fill();
    ctx.restore();
  }
}

/* ------------------------------------------------- Arka plan önbelleği */

/**
 * Sabit arka planı (gökyüzü, kule, zemin) bir kez çizip saklar.
 * Her karede yeniden çizmek yerine tek bir drawImage yapılır.
 * Eski işlemcilerde kare hızını belirgin şekilde korur.
 */
class ArkaPlan {
  constructor(cizFn) {
    this.cizFn = cizFn;
    this.tuval = document.createElement('canvas');
    this.ctx = this.tuval.getContext('2d');
    this.anahtar = '';
  }
  /** anahtar değişmediyse yeniden çizmez. */
  ciz(hedefCtx, w, h, anahtar) {
    const d = Math.min(window.devicePixelRatio || 1, 1.5);
    const yeni = `${w}x${h}x${d}|${anahtar}`;
    if (yeni !== this.anahtar) {
      this.tuval.width = Math.round(w * d);
      this.tuval.height = Math.round(h * d);
      this.ctx.setTransform(d, 0, 0, d, 0, 0);
      this.ctx.clearRect(0, 0, w, h);
      this.cizFn(this.ctx, w, h);
      this.anahtar = yeni;
    }
    hedefCtx.drawImage(this.tuval, 0, 0, w, h);
  }
}



/* ==========================================================================
   Canlandırma yardımcıları
   --------------------------------------------------------------------------
   "Oynat"a basıldığında her simülasyonda gözle görülür bir şey olmalı.
   Bu iki yardımcı, durağan düzenekleri canlandırmak için ortak dili kurar:

     tarama(t, en, boy, periyot)  bir değeri iki uç arasında YUMUŞAK biçimde
                                  gidip getirir (kosinüs gidiş-geliş). Ölçüm
                                  taramalarında kullanılır: uzaklık değişirken
                                  büyüklüğün nasıl değiştiği canlı görünür.

     isinAkisi(...)               bir doğru parçası boyunca ilerleyen ışık
                                  paketleri çizer. Işığın AKTIĞINI gösterir;
                                  ışının kendisini değiştirmez.
   ========================================================================== */

/**
 * İki uç arasında yumuşak gidiş-geliş. t=0'da 'en', yarı periyotta 'boy'.
 * Kosinüs kullanıldığı için uçlarda yavaşlar — göz takip edebilir.
 */
function tarama(t, en, boy, periyot = 6) {
  const faz = (1 - Math.cos((2 * Math.PI * t) / Math.max(0.1, periyot))) / 2;
  return en + (boy - en) * faz;
}

/** Testere dişi: 0'dan 1'e çıkar, sıfırlanır. Akış animasyonları için. */
function akisFazi(t, periyot = 1) {
  const x = t / Math.max(0.01, periyot);
  return x - Math.floor(x);
}

/**
 * Bir doğru parçası boyunca ilerleyen ışık paketleri.
 * t: sahne zamanı, hiz: saniyede kaç paket boyu ilerlediği.
 * Işının kendisi ayrıca çizilmelidir; bu yalnızca akışı gösterir.
 */
function isinAkisi(ctx, x1, y1, x2, y2, t, renk = '#FFD24A', hiz = 0.9, adet = 4, r = 3) {
  const dx = x2 - x1, dy = y2 - y1;
  const uz = Math.hypot(dx, dy);
  if (!(uz > 1)) return;
  const faz = akisFazi(t * hiz, 1);
  ctx.save();
  for (let k = 0; k < adet; k++) {
    const s = (faz + k / adet) % 1;
    /* uçlarda soluklaşsın — paketler birden belirip kaybolmasın */
    const alfa = Math.sin(Math.PI * s);
    if (alfa < 0.06) continue;
    ctx.globalAlpha = alfa * 0.95;
    ctx.fillStyle = renk;
    ctx.beginPath();
    ctx.arc(x1 + dx * s, y1 + dy * s, r, 0, 6.2832);
    ctx.fill();
  }
  ctx.restore();
}

/** Kesikli bir çizgi boyunca akan kısa çizgiler — akım/alan yönü için. */
function akimAkisi(ctx, x1, y1, x2, y2, t, renk = '#B87333', hiz = 0.8, adet = 5) {
  const dx = x2 - x1, dy = y2 - y1;
  const uz = Math.hypot(dx, dy);
  if (!(uz > 1)) return;
  const ux = dx / uz, uy = dy / uz;
  const faz = akisFazi(t * hiz, 1);
  ctx.save();
  ctx.strokeStyle = renk; ctx.lineWidth = 3; ctx.lineCap = 'round';
  for (let k = 0; k < adet; k++) {
    const s = (faz + k / adet) % 1;
    const alfa = Math.sin(Math.PI * s);
    if (alfa < 0.08) continue;
    ctx.globalAlpha = alfa;
    const px = x1 + dx * s, py = y1 + dy * s;
    ctx.beginPath();
    ctx.moveTo(px - ux * 5, py - uy * 5);
    ctx.lineTo(px + ux * 5, py + uy * 5);
    ctx.stroke();
  }
  ctx.restore();
}

/* Varsayılan palet: KÂĞIT. Klasik fizik paneli ve grafikler açık zeminde,
   defterdeki çizim gibi görünür. 'pano' ile koyu palete dönülebilir. */
simTema('kagit');

Object.assign(window.F11, { R, K, simTema, alanDisari, alanIceri, alanBolgesi, miknatis, pusula,
  isin, sanalIsin, ampul, duzlemAyna, kureselAyna, mercek, ortam, normalDogrultu, nesneOku,
  tuvaliOlcekle, yuvarlakDik, kesikliCizgi, ok, vektor, yaziHaleli, yaziAydinlik, rozet, gokyuzu, bulut, tepeler, cimZemin, betonZemin, taramaliZemin, tuglaKule, insan, top, iz, sandik, egikDuzlem, aciYayi, olcu, izgara, eksen, miniGrafik, guzelAdim, guzelUst, guzelAlt, biçim, noktaCisim, yorunge, ArkaPlan,
  tarama, akisFazi, isinAkisi, akimAkisi });
})();
