(function () {
"use strict";
window.F11 = window.F11 || {};

/* ==========================================================================
   blok.js · Konu sayfası bloklarını HTML'e çeviren oluşturucular
   --------------------------------------------------------------------------
   Her konu modülü saf veri döndürür; görünümü burası kurar. Böylece konu
   yazarken tek satır HTML/CSS düşünülmez, sadece içerik yazılır.

   SEMBOL NOTU
   -----------
   MEB 11. sınıf fizik kitabı hız için "v" değil "ϑ" (vartheta) kullanır.
   Sistem boyunca kitapla birebir aynı sembol kullanılır ki öğretmen tahtada
   anlatırken ekran farklı bir dil konuşmasın.
   ========================================================================== */

const { SimKoşucu, ikon, ikonlariCevir } = window.F11;

/* Basit HTML kaçışı: konu metinleri güvenilir ama sayı/etiket araya girerse diye. */
const kac = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

/* ----------------------------------------------------- Blok türleri
   Her blok kendi rengini (--bN) yalnız başlık ikonunda ve kendi kutusunda
   taşır. Numara yok: sıra bilgi taşımıyor, ikon ve ad yeterli. */
const BLOKLAR = {
  kavram:  { ad: 'Kavram',                      kisa: 'Kavram',      ikon: 'book-open-text', b: 1 },
  formul:  { ad: 'Formüller',                   kisa: 'Formüller',   ikon: 'function',       b: 2 },
  turetim: { ad: 'Formül nereden geliyor?',     kisa: 'Türetim',     ikon: 'path',           b: 3 },
  sim:     { ad: 'Simülasyon',                  kisa: 'Simülasyon',  ikon: 'atom',           b: 4 },
  puf:     { ad: 'Püf noktası ve test taktiği', kisa: 'Püf noktası', ikon: 'lightbulb',      b: 5 },
  osym:    { ad: 'Zorlayıcı sorular',           kisa: 'Sorular',     ikon: 'target',         b: 6 },
  baglam:  { ad: 'Bağlam temelli sorular',      kisa: 'Sorular',     ikon: 'compass',        b: 7 }
};

/** Bloğun açılış etiketi ve başlığı. Kapanış </section> çağıranda. */
function blokAc(tur, ek = '') {
  const t = BLOKLAR[tur];
  return `<section class="blok" id="bolum-${tur}" data-bolum="${tur}" ${ek}
             style="--b:var(--b${t.b});--bs:var(--b${t.b}s)">
    ${blokBasligi(tur)}`;
}

function blokBasligi(tur) {
  const t = BLOKLAR[tur];
  return `<h2 class="blok-bas"><span class="blok-ikon">${ikon(t.ikon)}</span>${kac(t.ad)}</h2>`;
}

/* ------------------------------------------------------- Bölüm çubuğu
   Konu başlığının altında yapışkan durur; öğretmen uzun sayfada
   simülasyona ya da sorulara tek dokunuşla iner. Yalnız sayfada olan
   bloklar listelenir. İki soru bloğu tek "Sorular" düğmesinde birleşir. */
function bolumCubugu(mod) {
  const l = [];
  if (mod.kavram)    l.push(['kavram', 'kavram']);
  if (mod.formuller) l.push(['formul', 'formul']);
  if (mod.turetim)   l.push(['turetim', 'turetim']);
  if (mod.sim)       l.push(['sim', 'sim']);
  if (mod.puf)       l.push(['puf', 'puf']);
  const soru = mod.osym && mod.osym.length ? 'osym' : mod.baglam && mod.baglam.length ? 'baglam' : null;
  if (soru) l.push([soru, 'soru']);
  if (l.length < 2) return '';
  return `<nav class="bolum-cubuk" aria-label="Bu sayfadaki bölümler">
    <div class="bolum-liste">${l.map(([hedef, grup]) => `
      <button type="button" class="bolum-dgm${grup === 'sim' ? ' sim' : ''}" data-hedef="${hedef}" data-grup="${grup}">
        ${grup === 'sim' ? ikon('atom') : ''}<span>${BLOKLAR[hedef].kisa}</span>
      </button>`).join('')}
    </div>
  </nav>`;
}

/** Bölüm çubuğunu canlandırır. Kaydırma dinleyicisi yok: hangi bölümde
    olunduğunu IntersectionObserver söyler. Geri dönen fonksiyon gözcüyü söker. */
function bolumBagla(kok, kaydirici) {
  const cubuk = kok.querySelector('.bolum-cubuk');
  if (!cubuk) return () => {};
  const dgmler = [...cubuk.querySelectorAll('[data-hedef]')];
  const grupOf = tur => (tur === 'osym' || tur === 'baglam') ? 'soru' : tur;

  /* scrollIntoView kullanılmaz: taşması gizli gövdeyi de kaydırıp üst barı
     ekrandan çıkarıyordu. Yalnız içerik alanı kaydırılır; başlık çubuğun
     altında kalsın diye scroll-margin-top kadar pay bırakılır. */
  dgmler.forEach(d => d.addEventListener('click', () => {
    const hedef = kok.querySelector('#bolum-' + d.dataset.hedef);
    if (!hedef || !kaydirici) return;
    const pay = parseFloat(getComputedStyle(hedef).scrollMarginTop) || 0;
    const ust = hedef.getBoundingClientRect().top - kaydirici.getBoundingClientRect().top
              + kaydirici.scrollTop - pay;
    kaydirici.scrollTo({ top: Math.max(0, ust) });
  }));

  const isaretle = grup => dgmler.forEach(d => {
    const etkin = d.dataset.grup === grup;
    d.classList.toggle('etkin', etkin);
    if (etkin) d.setAttribute('aria-current', 'true'); else d.removeAttribute('aria-current');
  });

  if (!('IntersectionObserver' in window)) return () => {};
  const bolumler = [...kok.querySelectorAll('.blok[data-bolum]')];
  const gorunen = new Set();
  /* Çubuğun hemen altındaki ince bant: başı bu banda giren bölüm "şu an"dır. */
  const gozcu = new IntersectionObserver(girisler => {
    girisler.forEach(g => g.isIntersecting ? gorunen.add(g.target) : gorunen.delete(g.target));
    const ilk = bolumler.find(b => gorunen.has(b));
    if (ilk) isaretle(grupOf(ilk.dataset.bolum));
  }, { root: kaydirici, rootMargin: '-80px 0px -60% 0px' });
  bolumler.forEach(b => gozcu.observe(b));
  return () => gozcu.disconnect();
}

/* ------------------------------------------------------------- Kavram */

function kavramBloku(html) {
  return `${blokAc('kavram')}
    <div class="kavram">${html}</div>
  </section>`;
}

/* ----------------------------------------------------------- Formüller */

function formulBloku({ liste = [], degiskenler = [] }) {
  /* Formül adı kartın üstünde küçük bir başlık şeridi; formül altında. */
  const serit = liste.map(f => `
    <div class="formul">
      ${f.aciklama ? `<div class="formul-ad">${kac(f.aciklama)}</div>` : ''}
      <div class="fm">${f.fm}</div>
    </div>`).join('');

  const tablo = degiskenler.length ? `
    <table class="degisken-tablo">
      <thead><tr><th>Sembol</th><th>Büyüklük</th><th>Birim</th></tr></thead>
      <tbody>${degiskenler.map(d => `
        <tr>
          <td class="sembol">${d.sembol}</td>
          <td>${kac(d.ad)}</td>
          <td class="birim">${d.birim || '-'}</td>
        </tr>`).join('')}
      </tbody>
    </table>` : '';

  return `${blokAc('formul')}
    <div class="formul-serit">${serit}</div>
    ${tablo}
  </section>`;
}

/* ------------------------------------------------------------ Türetim */

/**
 * Formülün nereden geldiğini adım adım gösterir.
 * Birden fazla "yol" olabilir (ör. grafik alanından / tanımdan / integralle);
 * öğretmen sınıfta hangisini anlatacaksa onu seçer.
 */
function turetimBloku(turetim, kimlik) {
  if (!turetim || !turetim.yollar?.length) return '';
  const yollar = turetim.yollar;

  const ust = yollar.length > 1
    ? `<div class="sekmeler" role="tablist" aria-label="Türetim yolu">${yollar.map((y, i) =>
        `<button type="button" class="sekme" role="tab" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}"
                 aria-controls="turetim-govde-${kimlik}" data-yol="${i}">${kac(y.ad)}</button>`
      ).join('')}</div>`
    : `<p class="turetim-tek">${kac(yollar[0].ad)}</p>`;

  return `${blokAc('turetim', `data-turetim="${kimlik}"`)}
    <div class="turetim">
      ${ust}
      <div class="turetim-govde" id="turetim-govde-${kimlik}" data-rol="turetim-govde" aria-live="polite"
           ${yollar.length > 1 ? 'role="tabpanel"' : ''}></div>
      <div class="turetim-alt">
        <button type="button" class="dgm" data-rol="t-geri">${ikon('arrow-left')}<span>Geri</span></button>
        <span class="adim-say" data-rol="t-say"></span>
        <div class="adim-cizgi" data-rol="t-cizgi" aria-hidden="true"></div>
        <button type="button" class="dgm birincil" data-rol="t-ileri"></button>
      </div>
    </div>
  </section>`;
}

/** Türetim bloğunu canlandırır (sekme + ileri/geri). */
function turetimBagla(kok, turetim) {
  const sar = kok.querySelector('[data-turetim]');
  if (!sar) return;
  const govde = sar.querySelector('[data-rol="turetim-govde"]');
  const say   = sar.querySelector('[data-rol="t-say"]');
  const cizgi = sar.querySelector('[data-rol="t-cizgi"]');
  const geri  = sar.querySelector('[data-rol="t-geri"]');
  const ileri = sar.querySelector('[data-rol="t-ileri"]');

  let yolNo = 0, adimNo = 0;

  /* İmza hareket: "İleri"ye basılınca yeni adım 8px aşağıdan yerine oturur,
     tahtaya bir satır daha yazılmış gibi. Başka hiçbir yerde giriş hareketi yok. */
  function ciz(hareket) {
    const yol = turetim.yollar[yolNo];
    const n = yol.adimlar.length;
    adimNo = Math.max(0, Math.min(adimNo, n - 1));
    const a = yol.adimlar[adimNo];

    govde.innerHTML = `
      <div class="adim-icerik${hareket ? ' gir' : ''}">
        ${a.baslik ? `<h3 class="adim-baslik">${kac(a.baslik)}</h3>` : ''}
        <div>${a.html}</div>
      </div>`;
    ikonlariCevir(govde);
    say.textContent = `${adimNo + 1} / ${n}`;
    cizgi.innerHTML = Array.from({ length: n }, (_, i) =>
      `<span class="adim-nokta ${i <= adimNo ? 'gecti' : ''}"></span>`).join('');
    geri.disabled = adimNo === 0;
    const son = adimNo === n - 1;
    ileri.disabled = son;
    ileri.classList.toggle('tamam', son);
    ileri.innerHTML = son ? `${ikon('check')}<span>Türetim tamam</span>`
                          : `<span>İleri</span>${ikon('arrow-right')}`;
  }

  const sekmeler = [...sar.querySelectorAll('[data-yol]')];
  const sekmeSec = b => {
    sekmeler.forEach(x => { x.setAttribute('aria-selected', 'false'); x.tabIndex = -1; });
    b.setAttribute('aria-selected', 'true'); b.tabIndex = 0;
    yolNo = +b.dataset.yol; adimNo = 0; ciz(false);
  };
  sekmeler.forEach(b => b.addEventListener('click', () => sekmeSec(b)));
  /* Sekme listesi deseni: ← → ile sekmeler arasında gezilir. */
  sar.querySelector('[role="tablist"]')?.addEventListener('keydown', e => {
    const i = sekmeler.indexOf(document.activeElement);
    if (i < 0 || (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft')) return;
    e.preventDefault();
    const yeni = sekmeler[(i + (e.key === 'ArrowRight' ? 1 : -1) + sekmeler.length) % sekmeler.length];
    yeni.focus(); sekmeSec(yeni);
  });
  geri.addEventListener('click',  () => { adimNo--; ciz(true); });
  ileri.addEventListener('click', () => { adimNo++; ciz(true); });

  ciz(false);
}

/* --------------------------------------------------------- Simülasyon */

function simBloku() {
  return `${blokAc('sim', 'data-genis="1"')}
    <div data-rol="sim-kap"></div>
    <p class="sim-ipucu"><kbd>Boşluk</kbd> oynatır ya da duraklatır, <kbd>R</kbd> sıfırlar.
    Değerleri değiştirince simülasyon başa döner.</p>
  </section>`;
}

function simBagla(kok, simTanim) {
  const kap = kok.querySelector('[data-rol="sim-kap"]');
  if (!kap || !simTanim) return null;
  return new SimKoşucu(kap, simTanim);
}

/* --------------------------------------------------------- Püf noktası */

function pufBloku({ html, ornekler = [] }) {
  /* Örnekler iç içe kart değil: aynı kutuda ayraçla ayrılmış alt bölümler. */
  const orn = ornekler.map((o, i) => `
    <div class="puf-ornek">
      <h3 class="puf-ornek-bas">Taktikle çözüm ${ornekler.length > 1 ? i + 1 : ''}</h3>
      <div class="puf-soru">${o.soru}</div>
      <p class="cozum-bas">Taktikle</p>
      ${o.taktikle}
      ${o.uzun ? `<div class="puf-uzun"><p class="cozum-bas soluk">Formülle (kontrol)</p>${o.uzun}</div>` : ''}
    </div>`).join('');

  return `${blokAc('puf')}
    <div class="puf-kutu">
      <div class="kutu-bas"><span class="ikon">${ikon('lightbulb')}</span>Taktik</div>
      ${html}
      ${orn}
    </div>
  </section>`;
}

/* --------------------------------------------------------------- Soru */

/** Çoktan seçmeli soru kartı. kaynak varsa küçük bir çip olarak gösterilir. */
function soruKarti(s, i) {
  const harfler = ['A', 'B', 'C', 'D', 'E'];
  return `
    <div class="soru" data-soru="${i}" data-dogru="${s.dogru}">
      <div class="soru-ust">
        <span class="soru-no">${i + 1}</span>
        ${s.baslik ? `<span class="soru-baslik">${kac(s.baslik)}</span>` : ''}
        ${s.kaynak ? `<span class="soru-kaynak">${kac(s.kaynak)}</span>` : ''}
      </div>
      <div class="soru-govde">${s.govde}</div>
      ${s.gorsel ? `<div class="soru-gorsel">${s.gorsel}</div>` : ''}
      ${s.adimlar ? `<div class="baglam-adimlar">${s.adimlar.map(a => `
        <div class="baglam-adim">
          <div><div class="ba-bas">${kac(a.bas)}</div><div class="ba-metin">${a.metin}</div></div>
        </div>`).join('')}</div>` : ''}
      ${s.secenekler ? `<div class="secenekler">${s.secenekler.map((o, j) => `
        <button type="button" class="secenek" data-sec="${j}">
          <span class="harf">${harfler[j]}</span><span class="secenek-metin">${o}</span>
        </button>`).join('')}</div>` : ''}
      <div data-rol="uyari"></div>
      <div class="cozum" hidden data-rol="cozum">
        <p class="cozum-bas">${ikon('check')}Çözüm</p>
        ${s.cozum}
      </div>
      <button type="button" class="dgm cozum-dgm" data-rol="cozum-dgm">Çözümü göster</button>
    </div>`;
}

function osymBloku(sorular = []) {
  if (!sorular.length) return '';
  return `${blokAc('osym', 'data-soru-grup="osym"')}
    <div class="kutu osym kutu-giris">
      <div class="kutu-bas"><span class="ikon">${ikon('target')}</span>Burada formül yetmez</div>
      <p>Bu sorular tek bir formülü değil, kavramı anladığını ölçer.
      Çeldiriciler rastgele değil: her biri sık yapılan <strong>belirli bir hataya</strong> karşılık gelir.
      Yanlış bir şık seçtiğinde çözümde o hatanın adı yazıyor.</p>
    </div>
    ${sorular.map((s, i) => soruKarti(s, i)).join('')}
  </section>`;
}

function baglamBloku(sorular = []) {
  if (!sorular.length) return '';
  return `${blokAc('baglam', 'data-soru-grup="baglam"')}
    <div class="kutu baglam kutu-giris">
      <div class="kutu-bas"><span class="ikon">${ikon('compass')}</span>Önce metni fiziğe çevir</div>
      <p>Bu sorularda formül hazır verilmez. Önce hikâyeden verilenleri ayıklarsın, olayı fiziksel modele çevirirsin, sonra formülü sen seçersin.</p>
    </div>
    ${sorular.map((s, i) => soruKarti(s, i)).join('')}
  </section>`;
}

/** Soru kartlarını canlandırır: seçenek işaretleme + çözüm açma.
    Doğru/yanlış renkle birlikte ikonla da gösterilir: renk tek başına anlam taşımaz. */
function sorulariBagla(kok) {
  kok.querySelectorAll('.soru[data-dogru]').forEach(kart => {
    const dogru = +kart.dataset.dogru;
    const cozum = kart.querySelector('[data-rol="cozum"]');
    const dgm   = kart.querySelector('[data-rol="cozum-dgm"]');
    const uyari = kart.querySelector('[data-rol="uyari"]');
    let secildi = false;

    const isaretle = (b, dogruMu) => {
      b.classList.add(dogruMu ? 'dogru' : 'yanlis');
      b.insertAdjacentHTML('beforeend',
        `<span class="secenek-durum">${ikon(dogruMu ? 'check' : 'x')}<span class="sr">${dogruMu ? 'doğru' : 'yanlış'}</span></span>`);
    };

    kart.querySelectorAll('[data-sec]').forEach(b => b.addEventListener('click', () => {
      if (secildi) return;
      secildi = true;
      uyari.innerHTML = '';
      const j = +b.dataset.sec;
      isaretle(b, j === dogru);
      if (j !== dogru) {
        const d = kart.querySelector(`[data-sec="${dogru}"]`);
        if (d) isaretle(d, true);
      }
      cozum.hidden = false;
      dgm.hidden = true;
    }));

    dgm?.addEventListener('click', () => {
      /* Seçenekli soruda önce cevap istenir: öğrenci doğrudan çözüme atlamasın. */
      if (kart.querySelector('[data-sec]') && !secildi) {
        uyari.innerHTML = '<p class="uyari-metin">Önce bir seçenek işaretle.</p>';
        return;
      }
      cozum.hidden = false;
      dgm.hidden = true;
    });
  });
}


Object.assign(window.F11, {
  blokBasligi, bolumCubugu, bolumBagla,
  kavramBloku, formulBloku, turetimBloku, turetimBagla, simBloku, simBagla,
  pufBloku, osymBloku, baglamBloku, sorulariBagla
});
})();
