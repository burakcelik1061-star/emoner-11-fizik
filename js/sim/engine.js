(function () {
"use strict";
window.F11 = window.F11 || {};

/* ==========================================================================
   engine.js — Simülasyon motoru
   --------------------------------------------------------------------------
   Her simülasyon aynı "tanım nesnesi" sözleşmesini uygular; motor arayüzü,
   döngüyü, klavyeyi ve ölçeklemeyi üstlenir. Simülasyon yazarken sadece
   fizik ve çizim yazılır.

   TANIM NESNESİ
   -------------
   {
     id, baslik,
     ciftPanel: true,                     // sol gerçekçi + sağ klasik
     oran: 0.52,                          // sol panelin genişlik payı
     parametreler: [
       { anahtar:'h0', etiket:'Yükseklik', min:20, max:200, adim:5,
         deger:125, birim:'m', tur:'kaydirac' },
       { anahtar:'g', etiket:'g', tur:'secim', deger:10,
         secenekler:[{d:10,e:'10 m/s² (Dünya)'},{d:1.6,e:'1,6 m/s² (Ay)'}] }
     ],
     durum(p)            -> { ... }       // başlangıç durumu
     adim(st, dt, p)     -> void          // SABİT dt ile çağrılır (1/240 s)
     bitti(st, p)        -> boolean       // true dönerse oynatma durur
     cizGercek(ctx,w,h,st,p) -> void      // aydınlık, renkli sahne
     cizKlasik(ctx,w,h,st,p) -> void      // koyu, koordinat düzlemi
     okumalar(st,p)      -> [{et,dg,birim}]

     grafikPanel: true,                   // iki panelin ALTINA tam genişlikte
     grafikYukseklik: 190,                // grafik şeridi ekler
     cizGrafik(ctx,w,h,st,p) -> void      // y-t, ϑ-t, a-t gibi grafikler
     turetim: [ { ad:'...', adimlar:[{baslik, html, uygula(st,p)}] } ]
   }

   SABİT ADIM
   ----------
   Fizik her zaman 1/240 s'lik sabit adımlarla ilerler. Kare hızı düşse de
   (eski işlemci, akıllı tahta) sonuç birebir aynı çıkar — öğretmen tahtada
   "5. saniyede 125 m" dediğinde ekran da tam onu gösterir.
   ========================================================================== */

const { tuvaliOlcekle, biçim, K } = window.F11;

const SABIT_DT = 1 / 240;
const EN_COK_BIRIKME = 0.25;   // sekme arkaplandayken sıçramayı önler

class SimKoşucu {
  /**
   * @param {HTMLElement} kap  simülasyonun yerleşeceği boş kapsayıcı
   * @param {object} tanim     yukarıdaki sözleşmeye uyan simülasyon tanımı
   */
  constructor(kap, tanim) {
    this.kap = kap;
    this.t = tanim;
    this.p = {};
    this.oynuyor = false;
    this.hizCarpani = 1;
    this.birikim = 0;
    this.sonZaman = 0;
    this.rafId = 0;
    this.turetimYol = 0;
    this.turetimAdim = -1;

    for (const pr of (tanim.parametreler || [])) this.p[pr.anahtar] = pr.deger;
    this.st = tanim.durum(this.p);

    this.#arayuzKur();
    this.#olaylariBagla();
    this.ciz();
  }

  /* ------------------------------------------------------------ Arayüz */

  #arayuzKur() {
    const t = this.t;
    const cift = t.ciftPanel !== false;

    this.kap.innerHTML = `
      <div class="sim-kutu" data-oynuyor="0" data-basladi="0">
        <div class="sim-ust">
          <span class="sim-ad">${t.baslik || 'Simülasyon'}</span>
          <span class="sim-canli"><span class="isik"></span><span data-rol="canli-yazi">hazır</span></span>
        </div>
        <div class="sim-tuval-sar ${cift ? '' : 'tek'}" style="--sim-h:${t.yukseklik || 340}px">
          <div class="sim-panel gercek">
            <span class="sim-etiket">gerçekçi görünüm</span>
            <canvas data-panel="gercek"></canvas>
          </div>
          ${cift ? `
          <div class="sim-panel">
            <span class="sim-etiket">klasik fizik görünümü</span>
            <canvas data-panel="klasik"></canvas>
          </div>` : ''}
        </div>

        ${t.grafikPanel ? `
        <div class="sim-panel grafik" style="--grafik-h:${t.grafikYukseklik || 190}px;border-top:1px solid var(--border)">
          <canvas data-panel="grafik"></canvas>
        </div>` : ''}

        <div class="sim-kontrol">
          <button class="dgm birincil" data-rol="oynat" style="min-width:132px">
            <span data-rol="oynat-ikon">▶</span><span data-rol="oynat-yazi">Oynat</span>
          </button>
          <button class="dgm ikon" data-rol="sifirla" title="Sıfırla (R)" aria-label="Sıfırla">⟲</button>
          <button class="dgm" data-rol="atla" title="Yarım saniye ilerlet (→ tuşu)"
                  style="min-width:0;padding:0 14px">+0,5 s</button>
          <label class="sr" for="hiz-${t.id}">Oynatma hızı</label>
          <select id="hiz-${t.id}" data-rol="hiz" style="width:104px">
            <option value="0.25">0,25×</option>
            <option value="0.5">0,5×</option>
            <option value="1" selected>1×</option>
            <option value="2">2×</option>
          </select>
          <div data-rol="parametreler" style="display:flex;gap:16px;flex-wrap:wrap;flex:1"></div>
        </div>

        <div class="sim-okuma" data-rol="okumalar"></div>
      </div>`;

    this.tuvaller = {};
    this.kap.querySelectorAll('canvas[data-panel]').forEach(c => {
      this.tuvaller[c.dataset.panel] = { el: c, ctx: c.getContext('2d', { alpha: false }) };
    });

    this.dgmOynat   = this.kap.querySelector('[data-rol="oynat"]');
    this.oynatIkon  = this.kap.querySelector('[data-rol="oynat-ikon"]');
    this.oynatYazi  = this.kap.querySelector('[data-rol="oynat-yazi"]');
    this.okumaKap   = this.kap.querySelector('[data-rol="okumalar"]');
    this.simKutu    = this.kap.querySelector('.sim-kutu');
    this.canliYazi  = this.kap.querySelector('[data-rol="canli-yazi"]');

    this.#parametreleriKur();
    this.#okumalariKur();
  }

  #parametreleriKur() {
    const kap = this.kap.querySelector('[data-rol="parametreler"]');
    this.pDeger = {};
    for (const pr of (this.t.parametreler || [])) {
      const sar = document.createElement('div');
      sar.className = 'parametre';
      const id = `p-${this.t.id}-${pr.anahtar}`;

      if (pr.tur === 'secim') {
        sar.innerHTML = `
          <label for="${id}">${pr.etiket}</label>
          <select id="${id}" data-p="${pr.anahtar}" style="flex:1">
            ${pr.secenekler.map(s =>
              `<option value="${s.d}" ${s.d === pr.deger ? 'selected' : ''}>${s.e}</option>`).join('')}
          </select>`;
      } else {
        /* Kaydıracın iki yanındaki −/+ düğmeleri: akıllı tahtada parmakla
           hassas değer tutturmak zor olduğu için tek dokunuşla adım adım
           değiştirme şart. Düğmeler kaydıracın adım değerini kullanır. */
        sar.innerHTML = `
          <label for="${id}">${pr.etiket}</label>
          <button class="dgm adim" data-padim="${pr.anahtar}" data-yon="-1"
                  aria-label="${pr.etiket} azalt" tabindex="-1">−</button>
          <input type="range" id="${id}" data-p="${pr.anahtar}"
                 min="${pr.min}" max="${pr.max}" step="${pr.adim}" value="${pr.deger}">
          <button class="dgm adim" data-padim="${pr.anahtar}" data-yon="1"
                  aria-label="${pr.etiket} artır" tabindex="-1">+</button>
          <span class="deger" data-pd="${pr.anahtar}">${biçim(pr.deger)} ${pr.birim || ''}</span>`;
        this.pDeger[pr.anahtar] = sar.querySelector('[data-pd]');
      }
      kap.appendChild(sar);
    }
  }

  #okumalariKur(hazir) {
    const o = hazir || this.t.okumalar(this.st, this.p);
    /* Etiket imzası: düzenek (mod) değişince okuma listesi de değişir. */
    this.okumaImza = o.map(r => r.et).join('|');
    this.okumaKap.innerHTML = o.map((r, i) => `
      <div class="okuma">
        <div class="et">${r.et}</div>
        <div class="dg" data-okuma="${i}">${r.dg}<small>${r.birim || ''}</small></div>
      </div>`).join('');
    this.okumaAlan = [...this.okumaKap.querySelectorAll('[data-okuma]')];
  }

  #okumalariTazele() {
    const o = this.t.okumalar(this.st, this.p);
    /* Düzenek değiştiyse etiketler ve kutu sayısı da değişmiştir; yalnızca
       değerleri yazmak eski düzeneğin etiketlerini yerinde bırakırdı. */
    if (o.map(r => r.et).join('|') !== this.okumaImza) { this.#okumalariKur(o); return; }
    for (let i = 0; i < this.okumaAlan.length; i++) {
      if (!o[i]) continue;
      this.okumaAlan[i].innerHTML = `${o[i].dg}<small>${o[i].birim || ''}</small>`;
    }
  }

  /* ------------------------------------------------------------ Olaylar */

  #olaylariBagla() {
    this.dgmOynat.addEventListener('click', () => this.degistir());
    this.kap.querySelector('[data-rol="sifirla"]').addEventListener('click', () => this.sifirla());
    this.kap.querySelector('[data-rol="atla"]').addEventListener('click', () => this.ileriAtla(0.5));
    this.kap.querySelector('[data-rol="hiz"]').addEventListener('change', e => {
      this.hizCarpani = parseFloat(e.target.value);
    });

    /* −/+ düğmeleri kaydıracı bir adım oynatır ve normal input olayını tetikler */
    this.kap.addEventListener('click', e => {
      const dgm = e.target.closest('[data-padim]');
      if (!dgm) return;
      const el = this.kap.querySelector(`input[data-p="${dgm.dataset.padim}"]`);
      if (!el) return;
      const adim = parseFloat(el.step) || 1;
      const yeni = parseFloat(el.value) + adim * parseFloat(dgm.dataset.yon);
      el.value = Math.max(parseFloat(el.min), Math.min(parseFloat(el.max), yeni));
      el.dispatchEvent(new Event('input', { bubbles: true }));
    });

    this.kap.addEventListener('input', e => {
      const a = e.target.dataset.p;
      if (!a) return;
      this.p[a] = parseFloat(e.target.value);
      if (this.pDeger[a]) {
        const pr = this.t.parametreler.find(x => x.anahtar === a);
        this.pDeger[a].textContent = `${biçim(this.p[a])} ${pr.birim || ''}`;
      }
      this.sifirla();
    });
    this.kap.addEventListener('change', e => {
      if (e.target.dataset.p) { this.p[e.target.dataset.p] = parseFloat(e.target.value); this.sifirla(); }
    });

    /* Yeniden boyutlanma: akıllı tahtada tam ekrana geçince tuval ölçeklenmeli */
    this.gozlemci = new ResizeObserver(() => this.ciz());
    this.gozlemci.observe(this.kap);

    /* Sekme gizlendiğinde duraklat — boşuna işlemci yakmasın */
    this.gorunurluk = () => { if (document.hidden && this.oynuyor) this.duraklat(); };
    document.addEventListener('visibilitychange', this.gorunurluk);
  }

  /* ------------------------------------------------------------- Döngü */

  oynat() {
    if (this.oynuyor) return;
    if (this.t.bitti && this.t.bitti(this.st, this.p)) this.sifirla();
    this.oynuyor = true;
    this.sonZaman = 0;
    this.birikim = 0;
    this.oynatIkon.textContent = '❚❚';
    this.oynatYazi.textContent = 'Duraklat';
    this.simKutu.dataset.oynuyor = '1';
    this.simKutu.dataset.basladi = '1';
    this.canliYazi.textContent = 'çalışıyor';
    this.rafId = requestAnimationFrame(ts => this.#kare(ts));
  }

  duraklat() {
    this.oynuyor = false;
    this.oynatIkon.textContent = '▶';
    this.oynatYazi.textContent = 'Oynat';
    this.simKutu.dataset.oynuyor = '0';
    this.canliYazi.textContent = 'duraklatıldı';
    cancelAnimationFrame(this.rafId);
  }

  degistir() { this.oynuyor ? this.duraklat() : this.oynat(); }

  sifirla() {
    this.duraklat();
    this.simKutu.dataset.basladi = '0';
    this.st = this.t.durum(this.p);
    if (this.turetimAdim >= 0) this.#turetimUygula();
    this.ciz();
    this.#okumalariTazele();
  }

  /**
   * Simülasyonu TAM olarak `sure` kadar ilerletir ve duraklatır.
   * Sabit adım 1/240 s olduğu için 0,5 s = tam 120 adımdır; sonuç
   * yuvarlama hatası taşımaz. Öğretmen tahtada "2. saniyede şu olur"
   * derken ekranı tam o ana getirebilsin diye var.
   */
  ileriAtla(sure = 0.5) {
    this.duraklat();
    if (this.t.bitti && this.t.bitti(this.st, this.p)) return;
    this.simKutu.dataset.basladi = '1';
    const n = Math.round(sure / SABIT_DT);
    for (let i = 0; i < n; i++) {
      this.t.adim(this.st, SABIT_DT, this.p);
      if (this.t.bitti && this.t.bitti(this.st, this.p)) break;
    }
    this.ciz();
    this.#okumalariTazele();
  }

  #kare(ts) {
    if (!this.oynuyor) return;
    if (!this.sonZaman) this.sonZaman = ts;
    let dt = (ts - this.sonZaman) / 1000;
    this.sonZaman = ts;
    if (dt > 0.1) dt = 0.1;                       // sekme dönüşünde sıçramayı kes
    this.birikim = Math.min(this.birikim + dt * this.hizCarpani, EN_COK_BIRIKME);

    while (this.birikim >= SABIT_DT) {
      this.t.adim(this.st, SABIT_DT, this.p);
      this.birikim -= SABIT_DT;
      if (this.t.bitti && this.t.bitti(this.st, this.p)) { this.birikim = 0; break; }
    }

    this.ciz();
    this.#okumalariTazele();

    if (this.t.bitti && this.t.bitti(this.st, this.p)) { this.duraklat(); return; }
    this.rafId = requestAnimationFrame(t2 => this.#kare(t2));
  }

  ciz() {
    for (const ad in this.tuvaller) {
      const { el, ctx } = this.tuvaller[ad];
      const { w, h } = tuvaliOlcekle(el, ctx);
      ctx.save();
      if (ad === 'gercek') {
        ctx.fillStyle = '#EAF4FC'; ctx.fillRect(0, 0, w, h);
        this.t.cizGercek(ctx, w, h, this.st, this.p);
      } else if (ad === 'grafik') {
        ctx.fillStyle = K.grafikZemin; ctx.fillRect(0, 0, w, h);
        this.t.cizGrafik(ctx, w, h, this.st, this.p);
      } else {
        ctx.fillStyle = K.klasikZemin; ctx.fillRect(0, 0, w, h);
        this.t.cizKlasik(ctx, w, h, this.st, this.p);
      }
      ctx.restore();
    }
  }

  /* ---------------------------------------------------------- Türetim */

  /** Türetim adımına atlar; adım kendi durumunu simülasyona uygulayabilir. */
  turetimeGit(yol, adim) {
    this.turetimYol = yol;
    this.turetimAdim = adim;
    this.#turetimUygula();
    this.ciz();
    this.#okumalariTazele();
  }

  #turetimUygula() {
    const yol = (this.t.turetim || [])[this.turetimYol];
    if (!yol) return;
    const a = yol.adimlar[this.turetimAdim];
    if (a && a.uygula) { a.uygula(this.st, this.p); }
  }

  yikil() {
    this.duraklat();
    this.gozlemci?.disconnect();
    document.removeEventListener('visibilitychange', this.gorunurluk);
  }
}

/* ----------------------------------------------------------- Kısayollar */

/**
 * Sayfadaki etkin simülasyona klavye kısayolu bağlar.
 * Akıllı tahtada uzaktan kumanda / klavye ile kontrol için.
 *   Boşluk → oynat-duraklat      R → sıfırla
 *   ← →    → türetim adımı
 */
function kisayollariBagla(kosucuGetir) {
  document.addEventListener('keydown', e => {
    const k = kosucuGetir();
    if (!k) return;
    const hedef = e.target;
    if (hedef.matches('input, select, textarea, button')) return;

    if (e.code === 'Space')       { e.preventDefault(); k.degistir(); }
    else if (e.key === 'ArrowRight') { e.preventDefault(); k.ileriAtla(0.5); }
    else if (e.key === 'r' || e.key === 'R') { e.preventDefault(); k.sifirla(); }
  });
}


Object.assign(window.F11, { SimKoşucu, kisayollariBagla });
})();
