(function () {
"use strict";
window.F11 = window.F11 || {};

/* ==========================================================================
   curriculum.js — 11. sınıf fizik müfredat ağacı
   --------------------------------------------------------------------------
   Kaynak: Türkiye Yüzyılı Maarif Modeli, MEB 11. sınıf fizik ders kitabı
           içindekiler + tymm.meb.gov.tr güncel kazanım listesi.

   Not: "Madde ve Doğası" ünitesi (yarı iletken / süper iletken) 2024 tarihli
   basılı programda vardı, güncel revizyonda 11. sınıftan çıkarıldı.
   Bu yüzden ağaçta 3 ünite var.

   Her konunun "modul" alanı topics/ altındaki dosya adıdır; router bu dosyayı
   ancak konuya girildiğinde yükler (lazy import) — açılış hızlı kalır.
   ========================================================================== */

const MUFREDAT = [
  {
    no: 1,
    id: 'kuvvet-hareket',
    ad: 'Kuvvet ve hareket',
    saat: 54,
    konular: [
      { id: 'serbest-dusen-cisimler',   kitap: '1.1.1', sayfa: 16,
        ad: 'Serbest düşen cisimler',            kod: 'FİZ.11.1.1', modul: 'u1-serbest-dusen-cisimler' },
      { id: 'serbest-dusme-veriler',    kitap: '1.1.2', sayfa: 20,
        ad: 'Serbest düşme ile ilgili veriler',  kod: 'FİZ.11.1.2', modul: 'u1-serbest-dusme-veriler' },
      { id: 'yukari-atis',              kitap: '1.1 ek', sayfa: 26,
        ad: 'Aşağıdan yukarıya atış',            kod: 'FİZ.11.1.2', modul: 'u1-yukari-atis' },
      { id: 'asagi-atis',               kitap: '1.1 ek', sayfa: 26,
        ad: 'Yukarıdan aşağıya atış',            kod: 'FİZ.11.1.2', modul: 'u1-asagi-atis' },
      { id: 'iki-boyutta-hareket',      kitap: '1.2',   sayfa: 30,
        ad: 'İki boyutta sabit ivmeli hareket',  kod: 'FİZ.11.1.3', modul: 'u1-iki-boyutta-hareket' },
      { id: 'bileske-kuvvet',           kitap: '1.3.1', sayfa: 40,
        ad: 'Bileşke kuvvet ve hareket ilişkisi',kod: 'FİZ.11.1.4', modul: 'u1-bileske-kuvvet' },
      { id: 'serbest-cisim-diyagrami',  kitap: '1.3.2', sayfa: 53,
        ad: 'Serbest cisim diyagramı',           kod: 'FİZ.11.1.5', modul: 'u1-serbest-cisim-diyagrami' },
      { id: 'statik-kinetik-surtunme',  kitap: '1.4.1', sayfa: 65,
        ad: 'Statik ve kinetik sürtünme',        kod: 'FİZ.11.1.6', modul: 'u1-statik-kinetik-surtunme' },
      { id: 'surtunme-degiskenler',     kitap: '1.4.2', sayfa: 70,
        ad: 'Sürtünmenin bağlı olduğu değişkenler', kod: 'FİZ.11.1.7', modul: 'u1-surtunme-degiskenler' },
      { id: 'limit-hiz',                kitap: '1.5',   sayfa: 86,
        ad: 'Limit hız',                         kod: 'FİZ.11.1.8', modul: 'u1-limit-hiz' },
      { id: 'cembersel-yorunge-hiz',    kitap: '1.6.1', sayfa: 95,
        ad: 'Çembersel harekette yörünge ve hız',kod: 'FİZ.11.1.9', modul: 'u1-cembersel-yorunge-hiz' },
      { id: 'cembersel-degiskenler',    kitap: '1.6.2', sayfa: 101,
        ad: 'Çembersel hareketin değişkenleri',  kod: 'FİZ.11.1.10', modul: 'u1-cembersel-degiskenler' }
    ]
  },
  {
    no: 2,
    id: 'elektrik-manyetizma',
    ad: 'Elektrik ve manyetizma',
    saat: 48,
    konular: [
      { id: 'elektriksel-kuvvet', kitap: '2.1.1', sayfa: 155,  ad: 'Elektriksel kuvvet (Coulomb)', kod: 'FİZ.11.2.1',  modul: 'u2-elektriksel-kuvvet' },
      { id: 'elektriksel-alan', kitap: '2.1.2', sayfa: 166,    ad: 'Elektriksel alan',             kod: 'FİZ.11.2.2',  modul: 'u2-elektriksel-alan' },
      { id: 'faraday-kafesi', kitap: '2.1.3', sayfa: 178,      ad: 'Faraday kafesi',               kod: 'FİZ.11.2.3',  modul: 'u2-faraday-kafesi' },
      { id: 'miknatislar', kitap: '2.2.1', sayfa: 186,         ad: 'Mıknatısların etkileşimi',     kod: 'FİZ.11.2.4',  modul: 'u2-miknatislar' },
      { id: 'duz-tel-manyetik', kitap: '2.2.2', sayfa: 198,    ad: 'Düz telin manyetik alanı',     kod: 'FİZ.11.2.5',  modul: 'u2-duz-tel-manyetik' },
      { id: 'akim-makarasi', kitap: '2.2.3', sayfa: 207,       ad: 'Akım makarasının manyetik alanı', kod: 'FİZ.11.2.6', modul: 'u2-akim-makarasi' },
      { id: 'elektromiknatis', kitap: '2.2.4', sayfa: 213,     ad: 'Elektromıknatıslar',           kod: 'FİZ.11.2.7',  modul: 'u2-elektromiknatis' },
      { id: 'tele-etki-kuvvet', kitap: '2.2.5', sayfa: 218,    ad: 'Akım geçen tele etki eden kuvvet', kod: 'FİZ.11.2.8', modul: 'u2-tele-etki-kuvvet' },
      { id: 'elektrik-motoru', kitap: '2.2.6', sayfa: 229,     ad: 'Elektrik motorunun çalışması', kod: 'FİZ.11.2.9',  modul: 'u2-elektrik-motoru' },
      { id: 'manyetik-aki', kitap: '2.3.1', sayfa: 236,        ad: 'Manyetik akı',                 kod: 'FİZ.11.2.10', modul: 'u2-manyetik-aki' },
      { id: 'induksiyon-gerilimi', kitap: '2.3.2', sayfa: 242, ad: 'İndüksiyon gerilimi',          kod: 'FİZ.11.2.11', modul: 'u2-induksiyon-gerilimi' },
      { id: 'alternatif-akim', kitap: '2.3.3', sayfa: 253,     ad: 'Alternatif akım',              kod: 'FİZ.11.2.12', modul: 'u2-alternatif-akim' },
      { id: 'transformator', kitap: '2.4',   sayfa: 263,       ad: 'Transformatör',                kod: 'FİZ.11.2.13', modul: 'u2-transformator' }
    ]
  },
  {
    no: 3,
    id: 'optik',
    ad: 'Optik',
    saat: 36,
    konular: [
      { id: 'aydinlanma', kitap: '3.1', sayfa: 302,        ad: 'Işık şiddeti, ışık akısı, aydınlanma', kod: 'FİZ.11.3.1',  modul: 'u3-aydinlanma' },
      { id: 'duzlem-ayna', kitap: '3.2', sayfa: 312,       ad: 'Düzlem aynalar',                 kod: 'FİZ.11.3.2',  modul: 'u3-duzlem-ayna' },
      { id: 'kuresel-ayna', kitap: '3.3.1', sayfa: 323,      ad: 'Küresel aynaların özellikleri',  kod: 'FİZ.11.3.3',  modul: 'u3-kuresel-ayna' },
      { id: 'kuresel-goruntu', kitap: '3.3.2', sayfa: 333,   ad: 'Küresel aynalarda görüntü',      kod: 'FİZ.11.3.4',  modul: 'u3-kuresel-goruntu' },
      { id: 'kirilma', kitap: '3.4', sayfa: 343,           ad: 'Işığın kırılması',               kod: 'FİZ.11.3.5',  modul: 'u3-kirilma' },
      { id: 'gorunur-derinlik', kitap: '3.5', sayfa: 354,  ad: 'Görünür derinlik',               kod: 'FİZ.11.3.6',  modul: 'u3-gorunur-derinlik' },
      { id: 'fiber-optik', kitap: '3.6', sayfa: 361,       ad: 'Fiber optik',                    kod: 'FİZ.11.3.7',  modul: 'u3-fiber-optik' },
      { id: 'prizmalar', kitap: '3.7', sayfa: 367,         ad: 'Prizmalar',                      kod: 'FİZ.11.3.8',  modul: 'u3-prizmalar' },
      { id: 'mercekler', kitap: '3.8.1', sayfa: 373,         ad: 'Merceklerin özellikleri',        kod: 'FİZ.11.3.9',  modul: 'u3-mercekler' },
      { id: 'mercek-goruntu', kitap: '3.8.2', sayfa: 381,    ad: 'Merceklerde görüntü',            kod: 'FİZ.11.3.10', modul: 'u3-mercek-goruntu' }
    ]
  }
];

/** Düz liste — router ve "önceki/sonraki" gezinmesi için. */
const DUZ_KONULAR = MUFREDAT.flatMap(u =>
  u.konular.map(k => ({ ...k, uniteNo: u.no, uniteId: u.id, uniteAd: u.ad }))
);

/** yol: "unite-id/konu-id" → konu nesnesi */
function konuBul(uniteId, konuId) {
  return DUZ_KONULAR.find(k => k.uniteId === uniteId && k.id === konuId) || null;
}

/** Sıradaki / önceki konu (ünite sınırını aşarak devam eder). */
function komsuKonular(konu) {
  const i = DUZ_KONULAR.findIndex(k => k.uniteId === konu.uniteId && k.id === konu.id);
  return { onceki: DUZ_KONULAR[i - 1] || null, sonraki: DUZ_KONULAR[i + 1] || null };
}


Object.assign(window.F11, { MUFREDAT, DUZ_KONULAR, konuBul, komsuKonular });
})();
