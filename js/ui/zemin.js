/* ==========================================================================
   zemin.js: Hareketli arka plan ve sürüm seçici
   --------------------------------------------------------------------------
   Üst bardaki "Arka plan" düğmesi küçük bir panel açar:
     · üç sürüm: Derin gece, Nebula, Kara tahta  → <html data-zemin>
     · "Hareketli arka plan" anahtarı             → <html data-hareket>
   Seçim localStorage'da tutulur; index.html'deki küçük betik ilk boyamadan
   önce uygular. Simülasyon oynarken arka plan durur (data-simoynuyor).
   ========================================================================== */
(function () {
  const kok = document.documentElement;

  function kaydet(anahtar, deger) {
    try { localStorage.setItem(anahtar, deger); } catch (e) { /* file:// kısıtı */ }
  }

  /* Işık hâleleri + yıldız katmanı. Görsel süs: ekran okuyucudan gizli. */
  function katmanKur() {
    if (document.getElementById('zemin')) return;
    const z = document.createElement('div');
    z.id = 'zemin';
    z.setAttribute('aria-hidden', 'true');
    z.innerHTML = '<i class="z1"></i><i class="z2"></i><i class="z3"></i><b class="z-yildiz"></b>';
    document.body.prepend(z);
  }

  function panelKur() {
    const dgm = document.getElementById('zemin-dgm');
    const panel = document.getElementById('zemin-panel');
    const anahtar = document.getElementById('hareket-dgm');
    if (!dgm || !panel) return;

    const tazele = () => {
      panel.querySelectorAll('[data-zemin]').forEach(b =>
        b.setAttribute('aria-pressed', String(b.dataset.zemin === kok.dataset.zemin)));
      anahtar.setAttribute('aria-checked', String(kok.dataset.hareket !== '0'));
    };
    const ac = durum => {
      panel.hidden = !durum;
      dgm.setAttribute('aria-expanded', String(durum));
      if (durum) tazele();
    };

    dgm.addEventListener('click', e => { e.stopPropagation(); ac(panel.hidden); });
    panel.addEventListener('click', e => e.stopPropagation());
    document.addEventListener('click', () => { if (!panel.hidden) ac(false); });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && !panel.hidden) { ac(false); dgm.focus(); }
    });

    panel.querySelectorAll('[data-zemin]').forEach(b => b.addEventListener('click', () => {
      kok.dataset.zemin = b.dataset.zemin;
      kaydet('fizik11-zemin', b.dataset.zemin);
      tazele();
    }));
    anahtar.addEventListener('click', () => {
      const yeni = kok.dataset.hareket === '0' ? '1' : '0';
      kok.dataset.hareket = yeni;
      kaydet('fizik11-hareket', yeni);
      tazele();
    });
    tazele();
  }

  /* Simülasyon oynarken arka plan süzülmesi durur: zayıf bilgisayarda
     işlemcinin tamamı simülasyona kalsın. */
  function simIzle() {
    const icerik = document.getElementById('icerik');
    if (!icerik || !window.MutationObserver) return;
    const bak = () => {
      kok.dataset.simoynuyor = icerik.querySelector('.sim-kutu[data-oynuyor="1"]') ? '1' : '0';
    };
    /* Yalnız data-oynuyor izlenir (okuma metinleri her karede değiştiği için
       childList izlemek pahalı olurdu); konu değişince sim zaten silinir. */
    new MutationObserver(bak).observe(icerik, {
      subtree: true, attributes: true, attributeFilter: ['data-oynuyor']
    });
    window.addEventListener('hashchange', () => setTimeout(bak, 0));
  }

  function basla() { katmanKur(); panelKur(); simIzle(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', basla);
  else basla();
})();
