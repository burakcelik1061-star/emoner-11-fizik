(function () {
"use strict";
window.F11 = window.F11 || {};

/* ==========================================================================
   app.js — Uygulama kabuğu, kenar çubuğu ve yönlendirici
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
  simBloku, simBagla, pufBloku, osymBloku, baglamBloku, sorulariBagla
} = window.F11;

/* Konu kayıt defteri — topics/*.js dosyaları buraya yazar. */
const KONULAR = {};
function konuKaydet(ad, tanim) { KONULAR[ad] = tanim; }

let icerik, kenarListe;
let etkinSim = null;          // o an ekrandaki simülasyon koşucusu

/* ------------------------------------------------------- Kenar çubuğu */

function kenariKur() {
  kenarListe.innerHTML = MUFREDAT.map(u => `
    <div class="unite-grup" data-unite="${u.id}"
         style="--u:var(--u${u.no});--us:var(--u${u.no}s)">
      <button class="unite-bas" data-unite-dgm="${u.id}" aria-expanded="false">
        <span class="unite-no">${u.no}</span>
        <span>${u.ad}</span>
        <span class="unite-ok" aria-hidden="true">›</span>
      </button>
      <div class="unite-konular">
        ${u.konular.map(k => `
          <a class="konu-bag" href="#/${u.id}/${k.id}" data-konu="${u.id}/${k.id}">
            <span>${k.ad}</span>
            ${k.kitap ? `<span class="konu-rozet">${k.kitap}</span>` : ''}
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

function karsilamaCiz() {
  const toplam = MUFREDAT.reduce((s, u) => s + u.konular.length, 0);
  const hazir = MUFREDAT.reduce((s, u) =>
    s + u.konular.filter(k => KONULAR[k.modul]).length, 0);

  icerik.innerHTML = `
    <div class="sayfa">
      <h1 class="sayfa-baslik">11. sınıf fizik</h1>
      <p class="sayfa-ozet">
        Türkiye Yüzyılı Maarif Modeli müfredatına göre ${MUFREDAT.length} ünite, ${toplam} konu.
        Her konuda kısa anlatım, formülün adım adım türetimi, çalışan simülasyon,
        test taktiği ve bağlam temelli sorular var.
      </p>

      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:14px;margin-top:26px">
        ${MUFREDAT.map(u => {
          const h = u.konular.filter(k => KONULAR[k.modul]).length;
          return `
          <a href="#/${u.id}/${u.konular[0].id}" class="kart"
             style="display:block;text-decoration:none;color:inherit;--b:var(--u${u.no});--u:var(--u${u.no})">
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px">
              <span class="unite-no">${u.no}</span>
              <strong>${u.ad}</strong>
            </div>
            <p style="color:var(--text-2);font-size:.92em;margin:0 0 10px">
              ${u.konular.length} konu · ${u.saat} ders saati
            </p>
            <div style="height:5px;border-radius:3px;background:var(--surface-3);overflow:hidden">
              <div style="height:100%;width:${Math.round(h / u.konular.length * 100)}%;background:var(--u${u.no})"></div>
            </div>
            <p style="color:var(--text-3);font-size:.82em;margin:8px 0 0">${h} / ${u.konular.length} hazır</p>
          </a>`;
        }).join('')}
      </div>

      <div class="kutu nott" style="margin-top:26px">
        <div class="kutu-bas"><span class="ikon">⌨</span>Akıllı tahta kısayolları</div>
        <p style="margin:0"><kbd>Boşluk</kbd> simülasyonu oynatır/duraklatır ·
        <kbd>R</kbd> sıfırlar · <kbd>F11</kbd> tam ekran ·
        üst sağdaki <strong>Sunum modu</strong> yazıları büyütür.</p>
      </div>

      <p style="color:var(--text-3);font-size:.85em;margin-top:20px">
        Toplam ${hazir} / ${toplam} konu hazır.
      </p>

      ${window.F11.kunyeHtml()}
    </div>`;
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
          <p style="margin:0;font-size:.9em;color:var(--text-2)">Beklenen dosya: <code>topics/${konu.modul}.js</code></p>
        </div>
      </div>`;
    kenariIsaretle(uniteId, konuId);
    document.title = `${konu.ad} · Fizik 11`;
    return;
  }

  const k = komsuKonular(konu);

  icerik.innerHTML = `
    <div class="sayfa" style="--u:var(--u${konu.uniteNo});--us:var(--u${konu.uniteNo}s)">
      <header class="konu-hero">
        <div class="hero-ust">
          <span class="hero-unite"><span class="nokta"></span>Ünite ${konu.uniteNo} · ${konu.uniteAd}</span>
          ${konu.kitap ? `<span class="hero-kitap">${konu.kitap}</span>` : ''}
          <span class="hero-kod">${konu.kod}</span>
        </div>
        <h1 class="sayfa-baslik">${konu.ad}</h1>
        <p class="sayfa-ozet">${mod.ozet}</p>
      </header>

      ${mod.kavram    ? kavramBloku(mod.kavram) : ''}
      ${mod.formuller ? formulBloku(mod.formuller) : ''}
      ${mod.turetim   ? turetimBloku(mod.turetim, konu.id) : ''}
      ${mod.sim       ? simBloku() : ''}
      ${mod.puf       ? pufBloku(mod.puf) : ''}
      ${mod.osym      ? osymBloku(mod.osym) : ''}
      ${mod.baglam    ? baglamBloku(mod.baglam) : ''}

      <nav style="display:flex;gap:12px;margin-top:40px;padding-top:24px;border-top:1px solid var(--border)">
        ${k.onceki ? `<a class="dgm" href="#/${k.onceki.uniteId}/${k.onceki.id}">← ${k.onceki.ad}</a>` : '<span></span>'}
        <span style="flex:1"></span>
        ${k.sonraki ? `<a class="dgm birincil" href="#/${k.sonraki.uniteId}/${k.sonraki.id}">${k.sonraki.ad} →</a>` : ''}
      </nav>

      ${window.F11.kunyeHtml()}
    </div>`;

  if (mod.turetim) turetimBagla(icerik, mod.turetim);
  etkinSim = mod.sim ? simBagla(icerik, mod.sim) : null;
  sorulariBagla(icerik);

  kenariIsaretle(uniteId, konuId);
  document.title = `${konu.ad} · Fizik 11`;
  icerik.scrollTop = 0;
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

  const yol = location.hash.replace(/^#\/?/, '').split('/').filter(Boolean);
  if (yol.length < 2) {
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

  document.getElementById('kenar-dgm').addEventListener('click', kenariDegistir);

  /* --- Açık / koyu tema ---
     Seçim localStorage'da tutulur; index.html'deki küçük betik sayfa açılırken
     onu okuyup ilk boyamadan önce uygular. Simülasyon tuvalleri temadan
     etkilenmez, kendi görünümlerini korur. */
  const temaDgm = document.getElementById('tema-dgm');
  const temaTazele = () => {
    const acik = document.documentElement.dataset.tema === 'acik';
    temaDgm.textContent = acik ? '☾' : '☀';
    temaDgm.title = acik ? 'Koyu temaya geç' : 'Açık temaya geç';
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
    const acik = document.documentElement.dataset.tema === 'acik';
    const yeni = acik ? 'koyu' : 'acik';
    document.documentElement.dataset.tema = yeni;
    try { localStorage.setItem('fizik11-tema', yeni); } catch (e) { /* file:// kısıtı */ }
    temaTazele();
  });

  document.getElementById('sunum-dgm').addEventListener('click', e => {
    const acik = document.documentElement.dataset.sunum === '1';
    document.documentElement.dataset.sunum = acik ? '0' : '1';
    e.currentTarget.setAttribute('aria-pressed', String(!acik));
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
