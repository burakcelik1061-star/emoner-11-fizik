(function () {
"use strict";
window.F11 = window.F11 || {};

/* ==========================================================================
   kunye.js — Hazırlayan bilgisi
   --------------------------------------------------------------------------
   Sistemin tek künye kaynağı burasıdır. Aşağıdaki değerleri değiştirmen
   yeterli; ad hem üst barda hem de her sayfanın altında otomatik güncellenir.
   Başka hiçbir dosyaya dokunma.

   Boş bırakılan alan hiç gösterilmez — ör. okul yazmak istemiyorsan
   okul: '' bırak, satır kendiliğinden kaybolur.
   ========================================================================== */

const KUNYE = {
  hazirlayan: 'Burak ÇELİK',
  okul:       '',      // ör. 'Cumhuriyet Anadolu Lisesi'  (boşsa gösterilmez)
  yil:        '2026',
  not:        'Türkiye Yüzyılı Maarif Modeli 11. sınıf fizik müfredatına göre hazırlanmıştır.'
};

/** Üst barda görünen kısa biçim. */
function kunyeKisa() {
  return KUNYE.hazirlayan;
}

/** Sayfa altında görünen tam künye bloğu. */
function kunyeHtml() {
  return `
    <footer class="kunye">
      <p class="kunye-ad">
        <strong>${KUNYE.hazirlayan}</strong> tarafından hazırlanmıştır
        ${KUNYE.okul ? `<span class="kunye-alt">${KUNYE.okul}</span>` : ''}
      </p>
      <p class="kunye-not">${KUNYE.not} © ${KUNYE.yil}</p>
    </footer>`;
}

Object.assign(window.F11, { KUNYE, kunyeKisa, kunyeHtml });
})();
