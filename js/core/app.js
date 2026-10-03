(function () {
"use strict";
window.F11 = window.F11 || {};

/* ==========================================================================
   app.js · Uygulama kabuğu, kenar çubuğu ve yönlendirici
   --------------------------------------------------------------------------
   Neden ES modülü değil?
   Sistem akıllı tahtada sunucusuz, terminalsiz çalışacak: index.html'e çift
   tıklanıp açılacak. Tarayıcılar file:// üzerinden ES modülü ve fetch()
   engellediği için her şey klasik <script> ile yüklenir ve tek bir global
   ad alanında (window.F11) toplanır.

   Konu modülleri topics/ altında kendilerini şöyle kaydeder:
       F11.konuKaydet('u1-serbest-dusen-cisimler', { ... });
   ========================================================================== */

const { MUFREDAT, konuBul, komsuKonular } = window.F11;
const {
  kavramBloku, formulBloku, turetimBloku, turetimBagla,
  simBloku, simBagla, pufBloku, osymBloku, baglamBloku, sorulariBagla,
  bolumCubugu, bolumBagla, ikon, ikonlariCevir
} = window.F11;

/* Konu kayıt defteri — topics/*.js dosyaları buraya yazar. */
const KONULAR = {};
function konuKaydet(ad, tanim) { KONULAR[ad] = tanim; }

let icerik, kenarListe;
let etkinSim = null;          // o an ekrandaki simülasyon koşucusu
let bolumSok = null;          // bölüm çubuğu gözcüsünü söken fonksiyon

/* ------------------------------------------------------- Kenar çubuğu */

function kenariKur() {
  kenarListe.innerHTML = MUFREDAT.map(u => `
    <div class="unite-grup" data-unite="${u.id}"
         style="--u:var(--u${u.no});--us:var(--u${u.no}s)">
      <button class="unite-bas" data-unite-dgm="${u.id}" aria-expanded="false">
        <span class="unite-no">${u.no}</span>
        <span class="unite-ad">${u.ad}</span>
        <span class="unite-ok">${ikon('caret-right')}</span>
      </button>
      <div class="unite-konular">
        ${u.konular.map(k => `
          <a class="konu-bag" href="#/${u.id}/${k.id}" data-konu="${u.id}/${k.id}">
            <span class="konu-ad">${k.ad}</span>
            ${k.kitap ? `<span class="konu-no">${k.kitap}</span>` : ''}
          </a>`).join('')}
      </div>
    </div>`).join('');

  kenarListe.querySelectorAll('[data-unite-dgm]').forEach(b => {
    b.addEventListener('click', () => {
      const grup = b.closest('.unite-grup');
      const acik = grup.dataset.acik === '1';
      grup.dataset.acik = acik ? '0' : '1';
      b.setAttribute('aria-expanded', String(!acik));
    });
  });
}

function kenariIsaretle(uniteId, konuId) {
  kenarListe.querySelectorAll('.konu-bag').forEach(a => a.removeAttribute('aria-current'));
  const bag = kenarListe.querySelector(`[data-konu="${uniteId}/${konuId}"]`);
  if (!bag) return;
  bag.setAttribute('aria-current', 'page');
  const grup = bag.closest('.unite-grup');
  grup.dataset.acik = '1';
  grup.querySelector('.unite-bas').setAttribute('aria-expanded', 'true');
  bag.scrollIntoView({ block: 'nearest' });
}

/* --------------------------------------------------------- Karşılama */

/** Son açılan konu (öğretmen ertesi ders kaldığı yerden açar). file:// altında
    localStorage kapalı olabilir; o zaman sessizce ilk konuya düşülür. */
const SON_ANAHTAR = 'fizik11-son';
function sonKonu() {
  try {
    const [u, k] = (localStorage.getItem(SON_ANAHTAR) || '').split('/');
    return u && k ? konuBul(u, k) : null;
  } catch (e) { return null; }
}

function karsilamaCiz() {
  const toplam = MUFREDAT.reduce((s, u) => s + u.konular.length, 0);
  const son = sonKonu();
  const ilk = MUFREDAT[0].konular[0];
  const hedef = son
    ? { yol: `#/${son.uniteId}/${son.id}`, ust: 'Kaldığın yerden devam et', ad: son.ad }
    : { yol: `#/${MUFREDAT[0].id}/${ilk.id}`, ust: 'İlk konuyla başla', ad: ilk.ad };

  icerik.innerHTML = `
    <div class="sayfa">
      <header class="karsilama-bas">
        <h1 class="sayfa-baslik">11. sınıf fizik</h1>
        <p class="sayfa-ozet">Maarif Modeli müfredatına göre ${MUFREDAT.length} ünite, ${toplam} konu:
        anlatım, türetim, simülasyon ve sorular.</p>
        <a class="dgm birincil devam-dgm" href="${hedef.yol}">
          <span class="devam-ust">${hedef.ust}</span>
          <span class="devam-ad">${hedef.ad}${ikon('arrow-right')}</span>
        </a>
      </header>

      <section class="icindekiler" aria-label="İçindekiler">
        ${MUFREDAT.map(u => `
        <div class="ic-sutun" style="--u:var(--u${u.no})">
          <h2 class="ic-bas">
            <span class="unite-no">${u.no}</span>
            <span class="ic-baslik"><span class="ic-ad">${u.ad}</span>
            <span class="ic-alt">${u.konular.length} konu · ${u.saat} ders saati</span></span>
          </h2>
          <ol class="ic-liste">
            ${u.konular.map(k => `
            <li><a class="ic-konu" href="#/${u.id}/${k.id}">
              <span class="ic-no">${k.kitap || ''}</span>
              <span class="ic-konu-ad">${k.ad}</span>
              ${KONULAR[k.modul] ? '' : '<span class="ic-hazir">hazırlanıyor</span>'}
            </a></li>`).join('')}
          </ol>
        </div>`).join('')}
      </section>

      <p class="kisayol-serit">
        <span class="kisayol-ikon">${ikon('keyboard')}</span>
        <span><kbd>Boşluk</kbd> oynat / duraklat</span>
        <span><kbd>R</kbd> sıfırla</span>
        <span><kbd>→</kbd> yarım saniye ilerlet</span>
        <span><kbd>F11</kbd> tam ekran</span>
        <span><strong>Sunum modu</strong> yazıları büyütür</span>
      </p>

      ${window.F11.kunyeHtml()}
    </div>`;
  ikonlariCevir(icerik);
}

/* ------------------------------------------------------- Konu sayfası */

function konuCiz(uniteId, konuId) {
  const konu = konuBul(uniteId, konuId);
  if (!konu) { bulunamadi(); return; }

  const mod = KONULAR[konu.modul];
  if (!mod) {
    icerik.innerHTML = `
      <div class="sayfa">
        <div class="kirilma">
          <span>Ünite ${konu.uniteNo} · ${konu.uniteAd}</span>
          <span class="ayrac">›</span><span class="simdi">${konu.ad}</span>
          <span class="kazanim-kodu">${konu.kod}</span>
        </div>
        <div class="kutu dikkat">
          <div class="kutu-bas"><span class="ikon">⚠</span>Bu konu henüz hazır değil</div>
          <p><strong>${konu.ad}</strong> içeriği yazım aşamasında.</p>
          <p class="bos-not">Beklenen dosya: <code>topics/${konu.modul}.js</code></p>
        </div>
      </div>`;
    ikonlariCevir(icerik);
    uniteRengi(konu.uniteNo);
    kenariIsaretle(uniteId, konuId);
    document.title = `${konu.ad} · Fizik 11`;
    return;
  }

  const k = komsuKonular(konu);
  /* Meta satırı: öğretmen kitabı aynı sayfada açabilsin diye sayfa no da var. */
  const meta = [
    konu.kitap ? `Kitap ${konu.kitap}` : '',
    konu.sayfa ? `s. ${konu.sayfa}` : '',
    konu.kod || ''
  ].filter(Boolean).join(' · ');

  icerik.innerHTML = `
    <div class="sayfa" style="--u:var(--u${konu.uniteNo});--us:var(--u${konu.uniteNo}s)">
      <header class="konu-bas">
        <a class="konu-unite" href="#/"><span class="nokta" aria-hidden="true"></span>Ünite ${konu.uniteNo} · ${konu.uniteAd}</a>
        <h1 class="sayfa-baslik">${konu.ad}</h1>
        <p class="sayfa-ozet">${mod.ozet}</p>
        ${meta ? `<p class="konu-meta">${meta}</p>` : ''}
      </header>

      ${bolumCubugu(mod)}

      ${mod.kavram    ? kavramBloku(mod.kavram) : ''}
      ${mod.formuller ? formulBloku(mod.formuller) : ''}
      ${mod.turetim   ? turetimBloku(mod.turetim, konu.id) : ''}
      ${mod.sim       ? simBloku() : ''}
      ${mod.puf       ? pufBloku(mod.puf) : ''}
      ${mod.osym      ? osymBloku(mod.osym) : ''}
      ${mod.baglam    ? baglamBloku(mod.baglam) : ''}

      <nav class="konu-gecis" aria-label="Konular arası geçiş">
        ${k.onceki ? `<a class="gecis onceki" href="#/${k.onceki.uniteId}/${k.onceki.id}">
          <span class="gecis-ust">${ikon('arrow-left')}Önceki konu</span>
          <span class="gecis-ad">${k.onceki.ad}</span></a>` : '<span></span>'}
        ${k.sonraki ? `<a class="gecis sonraki" href="#/${k.sonraki.uniteId}/${k.sonraki.id}">
          <span class="gecis-ust">Sonraki konu${ikon('arrow-right')}</span>
          <span class="gecis-ad">${k.sonraki.ad}</span></a>` : ''}
      </nav>

      ${window.F11.kunyeHtml()}
    </div>`;

  ikonlariCevir(icerik);
  uniteRengi(konu.uniteNo);
  if (mod.turetim) turetimBagla(icerik, mod.turetim);
  etkinSim = mod.sim ? simBagla(icerik, mod.sim) : null;
  sorulariBagla(icerik);
  bolumSok = bolumBagla(icerik, icerik);

  kenariIsaretle(uniteId, konuId);
  document.title = `${konu.ad} · Fizik 11`;
  icerik.scrollTop = 0;
  try { localStorage.setItem(SON_ANAHTAR, `${uniteId}/${konuId}`); } catch (e) { /* file:// kısıtı */ }
}

/** Üst barın alt çizgisi o anki ünitenin rengini alır; ana sayfada nötr. */
function uniteRengi(no) {
  if (no) document.documentElement.dataset.unite = String(no);
  else delete document.documentElement.dataset.unite;
}

function bulunamadi() {
  icerik.innerHTML = `
    <div class="bos-durum">
      <div><h2>Konu bulunamadı</h2><p><a href="#/">Başa dön</a></p></div>
    </div>`;
}

/* ------------------------------------------------------ Yönlendirici */

function yonlendir() {
  if (etkinSim) { etkinSim.yikil(); etkinSim = null; }
  if (bolumSok) { bolumSok(); bolumSok = null; }

  const yol = location.hash.replace(/^#\/?/, '').split('/').filter(Boolean);
  if (yol.length < 2) {
    uniteRengi(null);
    karsilamaCiz();
    document.title = 'Fizik 11 · Maarif Modeli';
  } else {
    konuCiz(yol[0], yol[1]);
  }

  /* Dar ekranda konuya geçilince çekmece kapansın; masaüstündeki daraltma
     durumuna dokunulmaz. */
  document.documentElement.dataset.mobil = 'kapali';
}

/** Ekran genişliğine göre doğru paneli açar/kapatır. */
function kenariDegistir() {
  const kok = document.documentElement;
  if (window.matchMedia('(max-width: 900px)').matches) {
    kok.dataset.mobil = kok.dataset.mobil === 'acik' ? 'kapali' : 'acik';
  } else {
    kok.dataset.kenar = kok.dataset.kenar === 'kapali' ? 'acik' : 'kapali';
  }
}

/* ------------------------------------------------------------ Kurulum */

function basla() {
  icerik = document.getElementById('icerik');
  kenarListe = document.getElementById('kenar-liste');

  const kenarDgm = document.getElementById('kenar-dgm');
  kenarDgm.innerHTML = ikon('list');
  kenarDgm.addEventListener('click', kenariDegistir);

  /* --- Açık / koyu tema ---
     Seçim localStorage'da tutulur; index.html'deki küçük betik sayfa açılırken
     onu okuyup ilk boyamadan önce uygular. Simülasyon tuvalleri temadan
     etkilenmez, kendi görünümlerini korur. */
  const temaDgm = document.getElementById('tema-dgm');
  const temaTazele = () => {
    const acik = document.documentElement.dataset.tema === 'acik';
    temaDgm.innerHTML = ikon(acik ? 'moon' : 'sun');
    temaDgm.title = acik ? 'Koyu temaya geç' : 'Kâğıt temaya geç';
    temaDgm.setAttribute('aria-pressed', String(acik));

    /* Klasik fizik paneli sayfanın TERSİ olur: koyu sayfada kâğıt panel,
       açık sayfada koyu panel. Böylece simülasyon kartı hangi temada olursa
       olsun sayfadan ayrışır ve odak noktası olarak öne çıkar.
       Gerçekçi panel her iki durumda da aydınlıktır — o bir gündüz sahnesi. */
    window.F11.simTema(acik ? 'pano' : 'kagit');
    if (etkinSim) etkinSim.ciz();
  };
  temaTazele();
  temaDgm.addEventListener('click', () => {
    const kok = document.documentElement;
    const yeni = kok.dataset.tema === 'acik' ? 'koyu' : 'acik';
    /* Tema anında değişir: renk geçiş animasyonu tahtada yavaş ve bulanık
       görünür. Bir kare boyunca bütün geçişler kapatılır. */
    kok.dataset.anlik = '1';
    kok.dataset.tema = yeni;
    try { localStorage.setItem('fizik11-tema', yeni); } catch (e) { /* file:// kısıtı */ }
    temaTazele();
    void kok.offsetWidth;
    requestAnimationFrame(() => { delete kok.dataset.anlik; });
  });

  const sunumDgm = document.getElementById('sunum-dgm');
  sunumDgm.insertAdjacentHTML('afterbegin', ikon('presentation'));
  sunumDgm.addEventListener('click', () => {
    const acik = document.documentElement.dataset.sunum === '1';
    document.documentElement.dataset.sunum = acik ? '0' : '1';
    sunumDgm.setAttribute('aria-pressed', String(!acik));
    window.dispatchEvent(new Event('resize'));
  });

  /* Üst bardaki hazırlayan adı — data/kunye.js'ten gelir */
  const kunyeYeri = document.getElementById('ustbar-kunye');
  if (kunyeYeri) kunyeYeri.textContent = window.F11.kunyeKisa();

  window.F11.kisayollariBagla(() => etkinSim);
  kenariKur();
  window.addEventListener('hashchange', yonlendir);
  yonlendir();
}

Object.assign(window.F11, { konuKaydet, KONULAR, basla });
})();
