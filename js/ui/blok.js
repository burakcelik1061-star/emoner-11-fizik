(function () {
"use strict";
window.F11 = window.F11 || {};

/* ==========================================================================
   blok.js — Konu sayfası bloklarını HTML'e çeviren oluşturucular
   --------------------------------------------------------------------------
   Her konu modülü saf veri döndürür; görünümü burası kurar. Böylece konu
   yazarken tek satır HTML/CSS düşünülmez, sadece içerik yazılır.

   SEMBOL NOTU
   -----------
   MEB 11. sınıf fizik kitabı hız için "v" değil "ϑ" (vartheta) kullanır.
   Sistem boyunca kitapla birebir aynı sembol kullanılır ki öğretmen tahtada
   anlatırken ekran farklı bir dil konuşmasın.
   ========================================================================== */

const { SimKoşucu } = window.F11;

/* Basit HTML kaçışı — konu metinleri güvenilir ama sayı/etiket araya girerse diye. */
const kac = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

/* -------------------------------------------------------------- Başlık */

function blokBasligi(no, ad) {
  return `<div class="blok-bas">
    <span class="hap"><span class="no">${no}</span>${kac(ad)}</span>
  </div>`;
}

/* ------------------------------------------------------------- Kavram */

function kavramBloku(html) {
  return `<section class="blok" style="--b:var(--b1);--bs:var(--b1s)">
    ${blokBasligi(1, 'Kavram')}
    <div class="kart">${html}</div>
  </section>`;
}

/* ----------------------------------------------------------- Formüller */

function formulBloku({ liste = [], degiskenler = [] }) {
  const serit = liste.map(f => `
    <div class="formul">
      <div class="fm">${f.fm}</div>
      ${f.aciklama ? `<div class="aciklama">${kac(f.aciklama)}</div>` : ''}
    </div>`).join('');

  const tablo = degiskenler.length ? `
    <table class="degisken-tablo">
      <thead><tr><th>Sembol</th><th>Büyüklük</th><th>Birim</th></tr></thead>
      <tbody>${degiskenler.map(d => `
        <tr>
          <td class="sembol">${d.sembol}</td>
          <td>${kac(d.ad)}</td>
          <td class="birim">${d.birim || '—'}</td>
        </tr>`).join('')}
      </tbody>
    </table>` : '';

  return `<section class="blok" style="--b:var(--b2);--bs:var(--b2s)">
    ${blokBasligi(2, 'Formüller')}
    <div class="kart">
      <div class="formul-serit">${serit}</div>
      ${tablo}
    </div>
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

  const sekmeler = yollar.length > 1
    ? `<div class="turetim-yol">${yollar.map((y, i) =>
        `<button class="dgm yol-dgm ${i === 0 ? 'etkin' : ''}" data-yol="${i}">${kac(y.ad)}</button>`
      ).join('')}</div>`
    : `<strong style="font-size:.95em">${kac(yollar[0].ad)}</strong>`;

  return `<section class="blok" data-turetim="${kimlik}" style="--b:var(--b3);--bs:var(--b3s)">
    ${blokBasligi(3, 'Formül nereden geliyor?')}
    <div class="turetim">
      <div class="turetim-ust">${sekmeler}</div>
      <div class="turetim-govde" data-rol="turetim-govde"></div>
      <div class="turetim-alt">
        <button class="dgm" data-rol="t-geri">← Geri</button>
        <span class="adim-say" data-rol="t-say"></span>
        <div class="adim-cizgi" data-rol="t-cizgi"></div>
        <button class="dgm birincil" data-rol="t-ileri">İleri →</button>
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

  function ciz() {
    const yol = turetim.yollar[yolNo];
    const n = yol.adimlar.length;
    adimNo = Math.max(0, Math.min(adimNo, n - 1));
    const a = yol.adimlar[adimNo];

    govde.innerHTML = `
      ${a.baslik ? `<h3 style="margin-bottom:10px">${kac(a.baslik)}</h3>` : ''}
      <div>${a.html}</div>`;
    say.textContent = `${adimNo + 1} / ${n}`;
    cizgi.innerHTML = Array.from({ length: n }, (_, i) =>
      `<span class="adim-nokta ${i <= adimNo ? 'gecti' : ''}"></span>`).join('');
    geri.disabled = adimNo === 0;
    ileri.disabled = adimNo === n - 1;
    ileri.textContent = adimNo === n - 1 ? 'Türetim tamam ✓' : 'İleri →';
  }

  sar.querySelectorAll('[data-yol]').forEach(b => b.addEventListener('click', () => {
    sar.querySelectorAll('[data-yol]').forEach(x => x.classList.remove('etkin'));
    b.classList.add('etkin');
    yolNo = +b.dataset.yol; adimNo = 0; ciz();
  }));
  geri.addEventListener('click',  () => { adimNo--; ciz(); });
  ileri.addEventListener('click', () => { adimNo++; ciz(); });

  ciz();
}

/* --------------------------------------------------------- Simülasyon */

function simBloku() {
  return `<section class="blok genis" style="--b:var(--b4);--bs:var(--b4s)">
    ${blokBasligi(4, 'Simülasyon')}
    <div data-rol="sim-kap"></div>
    <p style="font-size:.85em;color:var(--text-3);margin-top:10px">
      Boşluk tuşu oynatır/duraklatır, <kbd>R</kbd> sıfırlar. Değerleri değiştirince simülasyon başa döner.
    </p>
  </section>`;
}

function simBagla(kok, simTanim) {
  const kap = kok.querySelector('[data-rol="sim-kap"]');
  if (!kap || !simTanim) return null;
  return new SimKoşucu(kap, simTanim);
}

/* --------------------------------------------------------- Püf noktası */

function pufBloku({ html, ornekler = [] }) {
  const orn = ornekler.map((o, i) => `
    <div class="soru" style="margin-top:12px">
      <div class="soru-ust"><span class="soru-no">${i + 1}</span>Taktikle çözüm</div>
      <div class="soru-govde">${o.soru}</div>
      <div class="cozum">
        <div class="cozum-bas">Taktikle</div>
        ${o.taktikle}
        ${o.uzun ? `<div style="margin-top:10px;padding-top:10px;border-top:1px solid var(--border)">
          <div class="cozum-bas" style="color:var(--text-3)">Formülle (kontrol)</div>${o.uzun}</div>` : ''}
      </div>
    </div>`).join('');

  return `<section class="blok" style="--b:var(--b5);--bs:var(--b5s)">
    ${blokBasligi(5, 'Püf noktası · test taktiği')}
    <div class="kutu puf">
      <div class="kutu-bas"><span class="ikon">💡</span>Taktik</div>
      ${html}
    </div>
    ${orn}
  </section>`;
}

/* --------------------------------------------------------------- Soru */

/** Çoktan seçmeli soru kartı. kaynak varsa rozet olarak gösterilir. */
function soruKarti(s, i, sinif = '') {
  const harfler = ['A', 'B', 'C', 'D', 'E'];
  return `
    <div class="soru ${sinif}" data-soru="${i}" data-dogru="${s.dogru}">
      <div class="soru-ust">
        <span class="soru-no">${i + 1}</span>
        ${s.baslik ? kac(s.baslik) : ''}
        ${s.kaynak ? `<span class="soru-kaynak">${kac(s.kaynak)}</span>` : ''}
      </div>
      <div class="soru-govde">${s.govde}</div>
      ${s.gorsel ? `<div class="soru-gorsel">${s.gorsel}</div>` : ''}
      ${s.adimlar ? `<div class="baglam-adimlar">${s.adimlar.map(a => `
        <div class="baglam-adim">
          <div><div class="ba-bas">${kac(a.bas)}</div><div class="ba-metin">${a.metin}</div></div>
        </div>`).join('')}</div>` : ''}
      ${s.secenekler ? `<div class="secenekler" style="margin-top:14px">${s.secenekler.map((o, j) => `
        <button class="secenek" data-sec="${j}">
          <span class="harf">${harfler[j]}</span><span>${o}</span>
        </button>`).join('')}</div>` : ''}
      <div data-rol="uyari"></div>
      <div class="cozum" hidden data-rol="cozum">
        <div class="cozum-bas">Çözüm</div>
        ${s.cozum}
      </div>
      <button class="dgm" data-rol="cozum-dgm" style="margin-top:12px">Çözümü göster</button>
    </div>`;
}

function osymBloku(sorular = []) {
  if (!sorular.length) return '';
  return `<section class="blok" data-soru-grup="osym" style="--b:var(--b6);--bs:var(--b6s)">
    ${blokBasligi(6, 'Zorlayıcı sorular')}
    <div class="kutu osym" style="margin-bottom:14px">
      <div class="kutu-bas"><span class="ikon">🎯</span>Burada formül yetmez</div>
      <p style="margin:0">Bu sorular tek bir formülü değil, kavramı anladığını ölçer.
      Çeldiriciler rastgele değil — her biri sık yapılan <strong>belirli bir hataya</strong> karşılık gelir.
      Yanlış bir şık seçtiğinde çözümde o hatanın adı yazıyor.</p>
    </div>
    ${sorular.map((s, i) => soruKarti(s, i)).join('')}
  </section>`;
}

function baglamBloku(sorular = []) {
  if (!sorular.length) return '';
  return `<section class="blok" data-soru-grup="baglam" style="--b:var(--b7);--bs:var(--b7s)">
    ${blokBasligi(7, 'Bağlam temelli sorular')}
    <div class="kutu baglam" style="margin-bottom:14px">
      <div class="kutu-bas"><span class="ikon">🧭</span>Önce metni fiziğe çevir</div>
      <p style="margin:0">Bu sorularda formül hazır verilmez. Önce hikâyeden verilenleri ayıklarsın, olayı fiziksel modele çevirirsin, sonra formülü sen seçersin.</p>
    </div>
    ${sorular.map((s, i) => soruKarti(s, i)).join('')}
  </section>`;
}

/** Soru kartlarını canlandırır: seçenek işaretleme + çözüm açma. */
function sorulariBagla(kok) {
  kok.querySelectorAll('.soru[data-dogru]').forEach(kart => {
    const dogru = +kart.dataset.dogru;
    const cozum = kart.querySelector('[data-rol="cozum"]');
    const dgm   = kart.querySelector('[data-rol="cozum-dgm"]');
    const uyari = kart.querySelector('[data-rol="uyari"]');
    let secildi = false;

    kart.querySelectorAll('[data-sec]').forEach(b => b.addEventListener('click', () => {
      if (secildi) return;
      secildi = true;
      uyari.innerHTML = '';
      const j = +b.dataset.sec;
      b.classList.add(j === dogru ? 'dogru' : 'yanlis');
      if (j !== dogru) kart.querySelector(`[data-sec="${dogru}"]`)?.classList.add('dogru');
      cozum.hidden = false;
      dgm.hidden = true;
    }));

    dgm?.addEventListener('click', () => {
      /* Seçenekli soruda önce cevap istenir — öğrenci doğrudan çözüme atlamasın. */
      if (kart.querySelector('[data-sec]') && !secildi) {
        uyari.innerHTML = '<p class="uyari-metin">Önce bir seçenek işaretle.</p>';
        return;
      }
      cozum.hidden = false;
      dgm.hidden = true;
    });
  });
}


Object.assign(window.F11, { blokBasligi, kavramBloku, formulBloku, turetimBloku, turetimBagla, simBloku, simBagla, pufBloku, osymBloku, baglamBloku, sorulariBagla });
})();
