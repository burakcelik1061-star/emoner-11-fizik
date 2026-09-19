(function () {
"use strict";
const F = window.F11;

/* ==========================================================================
   topics/u1-serbest-cisim-diyagrami.js
   Konu 1.3.2 · Serbest cisim diyagramı   (MEB 11, s. 53-64)
   ========================================================================== */

F.konuKaydet('u1-serbest-cisim-diyagrami', {

ozet: `Serbest cisim diyagramı, bir fizik probleminin <strong>çözümü değil, kurulumudur</strong>.
Cismi bir noktaya indirger ve üzerine <em>yalnızca ona etki eden</em> kuvvetleri çizersin.
Doğru çizilmiş bir diyagram, problemin yarısını halleder.`,

/* ------------------------------------------------------------- Kavram */
kavram: `
<p>Bir cismin hareketini çözümlerken cismin şekli, rengi, neden yapıldığı önemsizdir.
Önemli olan <strong>üzerine hangi kuvvetlerin etki ettiğidir</strong>. Bu yüzden cisim
bir <strong>parçacığa</strong> indirgenir ve kuvvetler o noktadan çıkan oklarla gösterilir.
Bu çizime <strong>serbest cisim diyagramı</strong> denir.</p>

<p>"Serbest" kelimesi buradaki anahtardır: cisim çevresinden <em>koparılır</em>,
masa, ip, zemin çizilmez. Onların etkisi yalnızca birer <strong>ok</strong> olarak kalır.</p>

<h3 style="margin-top:22px">Diyagrama hangi kuvvetler girer?</h3>
<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:12px;margin:14px 0">
  <div style="background:var(--green-soft);border:1px solid #1F6B4F;border-radius:var(--r-sm);padding:14px 16px">
    <div style="color:var(--green);font-weight:700;font-size:.85em;margin-bottom:8px">✓ GİRER</div>
    <ul style="margin:0;padding-left:1.1em">
      <li>Ağırlık (G) — her zaman, istisnasız</li>
      <li>Normal kuvvet (N) — yüzeye değiyorsa</li>
      <li>İp gerilmesi (T) — ip bağlıysa</li>
      <li>Uygulanan kuvvet (F) — biri itiyor/çekiyorsa</li>
      <li>Sürtünme (f) — 1.4’te gelecek</li>
    </ul>
  </div>
  <div style="background:var(--red-soft);border:1px solid #6B2B33;border-radius:var(--r-sm);padding:14px 16px">
    <div style="color:var(--red);font-weight:700;font-size:.85em;margin-bottom:8px">✗ GİRMEZ</div>
    <ul style="margin:0;padding-left:1.1em">
      <li><strong>"Hareket kuvveti"</strong> — böyle bir kuvvet yoktur</li>
      <li>Cismin <em>başkasına</em> uyguladığı kuvvetler</li>
      <li>Başka cisimlere etki eden kuvvetler</li>
      <li>İvme (o bir kuvvet değil, sonuçtur)</li>
      <li>"Merkezkaç kuvveti" — gerçek bir kuvvet değil</li>
    </ul>
  </div>
</div>

<div class="kutu dikkat" style="margin:14px 0">
  <div class="kutu-bas"><span class="ikon">⚠</span>Tek kural yeter</div>
  <p style="margin:0">Diyagrama bir ok çizmeden önce sor: <strong>"Bu kuvveti hangi cisim,
  hangi cisme uyguluyor?"</strong> Cevap "…<em>bizim cismimize</em>" ile bitmiyorsa o ok
  diyagrama girmez.</p>
</div>

<h3 style="margin-top:22px">Beş adımda çizim</h3>
<ol>
  <li><strong>Cismi seç.</strong> Birden fazla cisim varsa her biri için ayrı diyagram çizilir.</li>
  <li><strong>Cismi bir kutu/nokta olarak çiz.</strong> Çevresini silin.</li>
  <li><strong>Ağırlığı çiz</strong> — daima aşağı, daima var.</li>
  <li><strong>Temas ettiği her şeyi tara.</strong> Değdiği her yüzey bir N, bağlı her ip bir T verir.</li>
  <li><strong>Eksenleri seç.</strong> Genelde birini ivme yönünde seçmek hesabı kolaylaştırır.</li>
</ol>

<h3 style="margin-top:22px">Eğik düzlemde eksenler neden döner?</h3>
<p>Eğik düzlemde cisim <strong>eğim boyunca</strong> hareket eder. Eksenleri yatay-düşey
bırakırsak hareket iki eksene birden yayılır ve hesap zorlaşır. Bunun yerine eksenleri
eğime göre döndürürüz:</p>
<ul>
  <li><strong>x ekseni eğim boyunca</strong> — hareket sadece bu eksende olur</li>
  <li><strong>y ekseni eğime dik</strong> — bu eksende her zaman denge vardır</li>
</ul>
<p>Bu seçimde <code>N</code> zaten y ekseninde durur, sadece <strong>ağırlığı ayırmak</strong>
kalır. Simülasyonda 5. senaryoyu seçip açıyı değiştirerek bunu izleyebilirsin.</p>`,

/* ---------------------------------------------------------- Formüller */
formuller: {
  liste: [
    { fm: 'ΣF<sub>x</sub> = m·a<sub>x</sub>', aciklama: 'Her eksen için ayrı Newton II yazılır' },
    { fm: 'ΣF<sub>y</sub> = m·a<sub>y</sub>', aciklama: 'Hareket olmayan eksende sağ taraf sıfırdır' },
    { fm: 'G∥ = G·sin α', aciklama: 'Eğik düzlemde ağırlığın eğim boyunca bileşeni' },
    { fm: 'G⊥ = G·cos α', aciklama: 'Eğime dik bileşen — normal kuvvet bunu dengeler' },
    { fm: 'a = g·sin α',  aciklama: 'Sürtünmesiz eğik düzlemde ivme — kütleden bağımsız' },
    { fm: 'N = m(g ± a)', aciklama: 'Asansörde: yukarı ivmede +, aşağı ivmede −' }
  ],
  degiskenler: [
    { sembol: 'G', ad: 'Ağırlık',                 birim: 'N' },
    { sembol: 'N', ad: 'Normal kuvvet',           birim: 'N' },
    { sembol: 'T', ad: 'İp gerilmesi',            birim: 'N' },
    { sembol: 'α', ad: 'Eğik düzlemin açısı',     birim: '°' },
    { sembol: 'a', ad: 'İvme',                    birim: 'm/s²' }
  ]
},

/* ------------------------------------------------------------ Türetim */
turetim: {
  yollar: [
    {
      ad: 'Diyagram nasıl çizilir',
      adimlar: [
        { baslik: 'Hangi cismi inceliyorsun?',
          html: `<p>Bu soruyu atlama. Bir problemde birden fazla cisim varsa
                 <strong>her biri için ayrı diyagram</strong> çizilir.</p>
                 <p>Örnek: İple bağlı iki blok varsa, blok A’nın diyagramı ile blok B’nin
                 diyagramı farklıdır — ipteki gerilme her ikisine <em>zıt yönlerde</em> etkir.</p>
                 <div class="kutu puf" style="margin-top:10px">
                   <p style="margin:0">Cismi seçtiğin an, dünyanın geri kalanı senin için
                   sadece "kuvvet uygulayan şeyler" listesine dönüşür.</p>
                 </div>` },

        { baslik: 'Cismi kopar, kutuya indirge',
          html: `<p>Masa, ip, zemin, eğik düzlem — hiçbirini çizme. Cismi tek başına,
                 boş bir alanda bir <strong>kutu</strong> olarak çiz.</p>
                 <p>Kitap s.53’teki ifadeyle: <em>"cismin bir parçacık gibi davrandığı
                 kabul edilir"</em>. Kovanın kova, kitabın kitap olması hiçbir şeyi değiştirmez.</p>
                 <p style="color:var(--text-2)">Simülasyonda dikkat et: altı senaryonun
                 sahneleri bambaşka, ama sağdaki diyagramda hepsi <strong>aynı kutu</strong>.</p>` },

        { baslik: 'Önce ağırlığı çiz',
          html: `<p>Ağırlık <strong>her zaman vardır</strong> ve <strong>her zaman düşey
                 aşağı doğrudur</strong> — cisim eğik düzlemde de olsa, havada da olsa,
                 asansörde de olsa.</p>
                 <div class="formul" style="max-width:200px"><div class="fm">G = m·g</div></div>
                 <div class="kutu dikkat" style="margin-top:10px">
                   <p style="margin:0">Eğik düzlemde ağırlığı eğime paralel çizmek çok yaygın
                   bir hatadır. <strong>Ağırlık eğimi umursamaz</strong>, yerin merkezine
                   doğrudur. Eğime göre <em>ayrıştırılan</em> şey ağırlığın kendisi değil,
                   bileşenleridir.</p>
                 </div>` },

        { baslik: 'Temas listesini çıkar',
          html: `<p>Cismin <strong>dokunduğu her şeyi</strong> say. Her temas en az bir kuvvet demektir:</p>
                 <ul>
                   <li>Bir yüzeye değiyorsa → <strong>N</strong> (yüzeye dik, yüzeyden dışarı)</li>
                   <li>Bir ip bağlıysa → <strong>T</strong> (ip boyunca, cisimden dışarı)</li>
                   <li>Biri itiyor/çekiyorsa → <strong>F</strong></li>
                 </ul>
                 <p><strong>Değmiyorsa yoktur.</strong> Simülasyondaki 3. senaryoda (asılı kova)
                 ve 6. senaryoda (serbest düşme) cisim hiçbir yüzeye değmez —
                 bu yüzden o diyagramlarda <strong>N kuvveti yoktur</strong>.</p>` },

        { baslik: 'Eksenleri akıllıca seç',
          html: `<p>Eksen seçimi serbesttir ama <strong>bir ekseni ivme yönünde seçmek</strong>
                 hesabı ciddi biçimde kısaltır. Çünkü o zaman diğer eksende sağ taraf sıfır olur:</p>
                 <p>ΣF<sub>y</sub> = m·a<sub>y</sub> = 0</p>
                 <p>Her eksen için ayrı ayrı Newton II yaz:</p>
                 <div class="formul-serit">
                   <div class="formul"><div class="fm">ΣF<sub>x</sub> = m·a<sub>x</sub></div></div>
                   <div class="formul"><div class="fm">ΣF<sub>y</sub> = m·a<sub>y</sub></div></div>
                 </div>
                 <p style="margin-top:12px;color:var(--text-2)">Diyagram doğruysa bundan
                 sonrası sadece cebirdir.</p>` }
      ]
    },
    {
      ad: 'Eğik düzlemde ağırlığı ayırmak',
      adimlar: [
        { baslik: 'Sorunu gör',
          html: `<p>Eğik düzlemde <strong>N</strong> eğime diktir, <strong>hareket</strong>
                 eğim boyuncadır — ikisi düzgün duruyor. Ama <strong>G düşeydir</strong>,
                 yani ikisine de uymaz.</p>
                 <p>Çözüm: N’yi döndürmek yerine <strong>G’yi iki bileşene ayırmak</strong>.</p>` },

        { baslik: 'Açının nereye taşındığını bul',
          html: `<p>Eğik düzlemin açısı α ise, <strong>ağırlık vektörü ile eğime dik doğrultu
                 arasındaki açı da α’dır.</strong></p>
                 <p>Sebep: eğim yataydan α kadar dönmüşse, eğimin normali de düşeyden
                 α kadar dönmüştür. İki doğru dönünce aralarındaki açı korunur.</p>
                 <p style="color:var(--text-2)">Bu adım öğrencilerin en çok takıldığı yerdir.
                 Bir kez kavrandığında eğik düzlem sorularının tamamı açılır.</p>` },

        { baslik: 'Bileşenleri yaz',
          html: `<p>G’yi hipotenüs kabul eden bir dik üçgen kurulur:</p>
                 <div class="formul-serit">
                   <div class="formul">
                     <div class="fm">G∥ = G·sin α</div>
                     <div class="aciklama">eğim boyunca aşağı · hareketi yaratan</div>
                   </div>
                   <div class="formul">
                     <div class="fm">G⊥ = G·cos α</div>
                     <div class="aciklama">eğime dik · N bunu dengeler</div>
                   </div>
                 </div>
                 <div class="kutu puf" style="margin-top:12px">
                   <p style="margin:0"><strong>sin mi cos mu?</strong> Şu kontrolü yap:
                   α = 0 (düz zemin) olsaydı cisim kaymamalı. sin0° = 0 olduğundan
                   G∥ = 0 çıkar — doğru. Karıştırdığında bu testi uygula, hangisinin
                   hangisi olduğunu 3 saniyede bulursun.</p>
                 </div>` },

        { baslik: 'İvmeyi bul',
          html: `<p>Eğime dik eksende hareket yok, denge var:</p>
                 <p>N = G·cos α = m·g·cos α</p>
                 <p>Eğim boyunca tek kuvvet G∥ (sürtünme ihmal):</p>
                 <p>m·a = m·g·sin α</p>
                 <div class="formul" style="max-width:220px;border-top-color:var(--accent)">
                   <div class="fm" style="color:var(--accent)">a = g·sin α</div>
                 </div>
                 <p style="margin-top:12px"><strong>Kütle sadeleşti.</strong> Sürtünmesiz eğik
                 düzlemde 1 kg’lık da 100 kg’lık da aynı ivmeyle kayar — tıpkı serbest düşmedeki
                 gibi. Zaten α = 90° koyarsan a = g çıkar: eğik düzlem dikleşince serbest düşmeye
                 dönüşür.</p>` }
      ]
    },
    {
      ad: 'Asansör · hissedilen ağırlık',
      adimlar: [
        { baslik: 'Tartı neyi ölçer?',
          html: `<p>Tartı senin ağırlığını <strong>ölçmez</strong>. Tartının ölçtüğü şey,
                 <strong>sana uyguladığı normal kuvvettir</strong> (N).</p>
                 <p>Yerde dururken N = G olduğu için tartı ağırlığını gösteriyormuş gibi görünür.
                 Ama ikisi farklı şeylerdir ve asansörde ayrışırlar.</p>` },

        { baslik: 'Newton II’yi kişiye uygula',
          html: `<p>Kişiye etki eden iki kuvvet: N (yukarı) ve G (aşağı).
                 Yukarı yönü pozitif alalım:</p>
                 <div class="formul" style="max-width:220px"><div class="fm">N − G = m·a</div></div>
                 <div class="formul" style="max-width:260px;margin-top:8px">
                   <div class="fm">N = m·g + m·a = m(g + a)</div>
                 </div>` },

        { baslik: 'Üç durumu oku',
          html: `<table class="degisken-tablo">
                   <thead><tr><th>Asansör</th><th>N</th><th>Hissedilen</th></tr></thead>
                   <tbody>
                     <tr><td>Yukarı ivmeli</td><td class="sembol">m(g+a)</td><td>Ağır</td></tr>
                     <tr><td>Sabit hız / duruyor</td><td class="sembol">m·g</td><td>Normal</td></tr>
                     <tr><td>Aşağı ivmeli</td><td class="sembol">m(g−a)</td><td>Hafif</td></tr>
                     <tr><td>Halat koptu (a = g)</td><td class="sembol">0</td><td>Ağırlıksız</td></tr>
                   </tbody>
                 </table>
                 <div class="kutu puf" style="margin-top:12px">
                   <p style="margin:0"><strong>Belirleyici olan hız değil, ivmedir.</strong>
                   Asansör yukarı <em>sabit hızla</em> çıkarken hiçbir şey hissetmezsin;
                   ağırlaşma sadece <em>hızlanırken</em> olur. Bu yüzden asansöre binerken
                   sadece kalkış ve duruş anlarında o hissi yaşarsın.</p>
                 </div>
                 <p style="margin-top:12px">Son satır uzay istasyonundaki ağırlıksızlığın da
                 açıklamasıdır: astronotlar yer çekiminden kurtulmuş değildir, sürekli
                 <strong>serbest düşüştedirler</strong>. Yer çekimi orada da vardır, ama
                 onları taşıyan bir zemin (N) yoktur.</p>` }
      ]
    }
  ]
},

/* -------------------------------------------------------- Simülasyon */
sim: F.simler['serbest-cisim-diyagrami'],

/* ------------------------------------------------------- Püf noktası */
puf: {
  html: `
    <p><strong>1 · "Hareket kuvveti" diye bir kuvvet yoktur.</strong> Cisim hareket ediyor
    diye hareket yönünde bir ok çizme. Sabit hızla giden bir cisme hareket yönünde
    hiçbir kuvvet etki etmiyor olabilir — Newton I bunu söylüyor.</p>

    <p><strong>2 · Değmiyorsa N yoktur.</strong> Havadaki, ipte asılı, serbest düşen cisimlerde
    normal kuvvet <em>yoktur</em>. Öğrenciler alışkanlıkla her diyagrama N çizer.</p>

    <p><strong>3 · Ağırlık daima düşeydir.</strong> Eğik düzlemde bile. Eğime paralel çizilen
    şey ağırlık değil, ağırlığın <strong>bileşenidir</strong>.</p>

    <p><strong>4 · Ok sayısı = temas sayısı + 1.</strong> Hızlı kontrol: ağırlık (hep 1) +
    dokunduğu her şey. 3’ten fazla ok çıktıysa muhtemelen olmayan bir kuvvet uydurdun.</p>

    <p><strong>5 · Eksenleri ivme yönüne göre seç.</strong> Eğik düzlemde eksenleri döndür,
    asansörde düşey al. Diğer eksende sağ taraf sıfır olur, tek denklemle çözersin.</p>

    <div style="background:var(--surface-0);border-radius:var(--r-sm);padding:14px;margin:14px 0">
      <p style="margin:0 0 8px;font-weight:600">Ezberlenecek üç sonuç</p>
      <table class="degisken-tablo" style="margin:0">
        <thead><tr><th>Durum</th><th>Sonuç</th></tr></thead>
        <tbody>
          <tr><td>Sürtünmesiz eğik düzlem</td><td class="sembol">a = g·sin α</td></tr>
          <tr><td>Eğik düzlemde normal kuvvet</td><td class="sembol">N = m·g·cos α</td></tr>
          <tr><td>Asansörde tartı değeri</td><td class="sembol">N = m(g ± a)</td></tr>
        </tbody>
      </table>
    </div>

    <p style="margin-bottom:0"><strong>6 · İpin iki ucu zıt yönlüdür.</strong> Bir ip iki cismi
    bağlıyorsa gerilme her iki cisme de <em>ipin merkezine doğru</em> etkir. Bir cisme sağa
    çekiyorsa diğerine sola çeker — ama <strong>büyüklüğü aynıdır</strong> (ip esnemez ve
    kütlesiz kabul edilir).</p>`,

  ornekler: [
    {
      soru: `<p>30° eğimli sürtünmesiz bir düzlemde bırakılan 20 kg’lık sandığın ivmesi ve
             düzlemin uyguladığı normal kuvvet kaçtır? (g = 10 m/s², sin30° = 0,5; cos30° = 0,87)</p>`,
      taktikle: `<p>İki formülü doğrudan uygula, kütleyi ivmede hiç kullanma:</p>
                 <p>a = g·sin30° = 10 · 0,5 = <strong>5 m/s²</strong></p>
                 <p style="margin-bottom:0">N = m·g·cos30° = 20 · 10 · 0,87 = <strong>174 N</strong></p>`,
      uzun: `<p>Eğim boyunca: m·a = m·g·sinα ⟹ a = g·sinα = 5 m/s²</p>
             <p>Eğime dik: N − m·g·cosα = 0 ⟹ N = 174 N</p>
             <p style="color:var(--text-3)">İvmede kütle sadeleşir; normal kuvvette sadeleşmez.</p>`
    },
    {
      soru: `<p>Bir kişi 50 kg’lık bir sandığı ip yardımıyla <strong>sabit hızla</strong>
             yukarı çekiyor. İpteki gerilme kaç N’dır? (g = 10 m/s²)</p>`,
      taktikle: `<p>"Sabit hız" gördüğün an <strong>a = 0</strong> yaz. O zaman denge var:</p>
                 <p style="margin-bottom:0">T = G = 50 · 10 = <strong>500 N</strong></p>`,
      uzun: `<p>T − G = m·a = 0 ⟹ T = G = 500 N</p>
             <p style="color:var(--text-3)">Yukarı çıkıyor olması T’yi büyütmez. Büyüten şey
             hız değil, ivmedir.</p>`
    },
    {
      soru: `<p>Aşağı doğru 3 m/s² ivmeyle inen bir asansörde 60 kg’lık bir kişi tartıya
             çıkıyor. Tartı kaç N gösterir? (g = 10 m/s²)</p>`,
      taktikle: `<p>İvme aşağı ⟹ kişi <strong>hafif</strong> hisseder ⟹ N &lt; G.</p>
                 <p style="margin-bottom:0">N = m(g − a) = 60 · (10 − 3) = <strong>420 N</strong></p>`,
      uzun: `<p>Aşağı pozitif alalım: G − N = m·a ⟹ N = m(g − a) = 60·7 = 420 N</p>
             <p style="color:var(--text-3)">a = 10 olsaydı N = 0 çıkardı — serbest düşüş,
             yani tam ağırlıksızlık.</p>`
    }
  ]
},

/* ------------------------------------------------------ Zorlayıcı sorular */
osym: [
  {
    baslik: 'Eksik ve fazla oklar',
    kaynak: 'Kavram tuzağı',
    govde: `
      <p>Sürtünmesiz yatay bir buz pistinde bir kızak, <strong>sabit hızla</strong>
      sağa doğru kaymaktadır. Kızağa hiçbir ip bağlı değildir ve kimse itmemektedir.</p>
      <p>Kızağın serbest cisim diyagramında <strong>kaç tane kuvvet oku</strong> bulunur?</p>`,
    gorsel: `
      <svg viewBox="0 0 520 170" xmlns="http://www.w3.org/2000/svg" role="img"
           aria-label="Buz pistinde sabit hızla kayan kızak">
        <rect width="520" height="170" fill="#0E1726"/>
        <rect x="0" y="120" width="520" height="50" fill="#BFD8E8"/>
        <path d="M0 120 H520" stroke="#8FB0C8" stroke-width="1.5"/>
        <g transform="translate(200,96)">
          <path d="M-42 0 L42 0 L42 10 L-42 10 Z" fill="#8A5A28"/>
          <path d="M-46 14 L46 14 L50 22 L-50 22 Z" fill="#7D8A99"/>
          <path d="M-20 0 L-20 -16 L20 -16 L20 0" stroke="#8A5A28" stroke-width="5" fill="none"/>
        </g>
        <path d="M262 106 L318 106" stroke="#35C08A" stroke-width="2.6"/>
        <path d="M328 106 L312 99 L312 113 Z" fill="#35C08A"/>
        <text x="336" y="110" fill="#35C08A" font-size="12" font-family="system-ui">sabit hız</text>
        <text x="16" y="150" fill="#4A6076" font-size="12" font-family="system-ui">sürtünmesiz buz</text>
      </svg>`,
    secenekler: ['1 tane', '2 tane', '3 tane', '4 tane', 'Hiç yok'],
    dogru: 1,
    cozum: `
      <p>Temas listesini çıkaralım:</p>
      <ul>
        <li><strong>Ağırlık (G)</strong> — her zaman var ✓</li>
        <li><strong>Normal kuvvet (N)</strong> — buza değiyor ✓</li>
        <li>İp yok ⟹ T yok</li>
        <li>İten kimse yok ⟹ F yok</li>
        <li>Sürtünmesiz ⟹ f yok</li>
      </ul>
      <p>Toplam <strong>2 ok</strong>: G (aşağı) ve N (yukarı). İkisi eşit olduğu için
      bileşke sıfırdır ve kızak Newton I gereği sabit hızla kaymaya devam eder.</p>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>C şıkkı (3 tane)</strong> bu sorudaki asıl tuzaktır:
        kızak hareket ettiği için sağa doğru bir "hareket kuvveti" çizenler oraya düşer.
        <strong>Böyle bir kuvvet yoktur.</strong> Hareket, kuvvetin sonucu değil —
        kuvvet olmadan da süren bir durumdur.
        <br>Kendine sor: sağa doğru bu kuvveti <em>hangi cisim</em> uyguluyor? Cevap yoksa ok da yoktur.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: B) 2 tane</strong></p>`
  },
  {
    baslik: 'Eğik düzlemde normal kuvvet',
    kaynak: 'Orantı',
    govde: `
      <p>Sürtünmesiz eğik düzlemde bırakılan bir cismin <strong>eğim açısı artırılırsa</strong>
      aşağıdaki niceliklerden hangisi <strong>azalır</strong>?</p>
      <p style="font-size:.9em;color:var(--text-3)">(Cismin kütlesi ve g sabittir, açı 0° ile 90° arasındadır.)</p>`,
    secenekler: [
      'Cismin ivmesi',
      'Ağırlığın eğim boyunca bileşeni',
      'Düzlemin uyguladığı normal kuvvet',
      'Cismin ağırlığı',
      'Cismin kütlesi'
    ],
    dogru: 2,
    cozum: `
      <p>Açı arttıkça sin α <strong>artar</strong>, cos α <strong>azalır</strong>. Bu tek cümle
      soruyu çözer.</p>
      <ul>
        <li><strong>A · İvme:</strong> a = g·sin α ⟹ <span style="color:var(--green)">artar</span></li>
        <li><strong>B · G∥:</strong> m·g·sin α ⟹ <span style="color:var(--green)">artar</span></li>
        <li><strong>C · Normal kuvvet:</strong> N = m·g·cos α ⟹ <span style="color:var(--red)">azalır</span> ✓</li>
        <li><strong>D · Ağırlık:</strong> G = m·g — açıyla hiç ilgisi yok, <strong>değişmez</strong></li>
        <li><strong>E · Kütle:</strong> Madde miktarı, değişmez</li>
      </ul>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>D şıkkı ciddi bir kavram tuzağıdır.</strong> Açı arttıkça
        cismin <em>ağırlığı</em> değişmez — değişen şey ağırlığın <strong>bileşenleridir</strong>.
        G hep m·g’dir ve hep düşey aşağı doğrudur.
        <br><strong>Sağlama:</strong> α = 90° koy. Düzlem dikey olur, cisim serbest düşer:
        N = m·g·cos90° = 0 (düzlem artık cisme değmiyor), a = g·sin90° = g. İkisi de doğru.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: C</strong></p>`
  }
],

/* --------------------------------------------- Bağlam temelli sorular */
baglam: [
  {
    baslik: 'Kayak pistinin eğimi',
    govde: `
      <p>Bir kayak merkezi, yeni açılacak acemi pisti için eğim kararı veriyor. Güvenlik
      uzmanı şu kuralı koyuyor: <strong>"Acemi pistinde kayakçının ivmesi 3 m/s²’yi geçmemeli."</strong></p>
      <p>Mühendis, iki farklı eğim seçeneğini değerlendiriyor: <strong>20°</strong> ve <strong>37°</strong>.
      Ayrıca yönetim, "ağır kayakçılar daha hızlı ivmelenir, onlar için ayrı pist gerekir mi?"
      diye soruyor.</p>
      <p><strong>Hangi eğim uygundur ve kütlenin bir etkisi var mıdır?</strong>
      (g = 10 m/s², sürtünme ihmal ediliyor, sin20° = 0,34; sin37° = 0,6)</p>`,
    gorsel: `
      <svg viewBox="0 0 520 200" xmlns="http://www.w3.org/2000/svg" role="img"
           aria-label="İki farklı eğimli kayak pisti ve üzerinde kayan kayakçı">
        <rect width="520" height="200" fill="#17223A"/>
        <rect x="0" y="176" width="520" height="24" fill="#E8F1F7"/>
        <path d="M30 176 L30 96 L250 176 Z" fill="#DCE9F2"/>
        <path d="M30 96 L250 176" stroke="#A8C2D6" stroke-width="2.4"/>
        <path d="M58 168 A 34 34 0 0 0 46 152" stroke="#4A5F86" stroke-width="1.4" fill="none"/>
        <text x="74" y="166" fill="#A7B8D4" font-size="12" font-family="system-ui">20°</text>
        <g transform="translate(140,134) rotate(20)">
          <circle cx="0" cy="-16" r="5" fill="#3C3489"/>
          <path d="M0 -11 L0 0 M0 0 L-5 8 M0 0 L5 8 M0 -8 L9 -13" stroke="#3C3489" stroke-width="2.4" stroke-linecap="round"/>
          <path d="M-12 10 L14 10" stroke="#E24B4A" stroke-width="3"/>
        </g>
        <path d="M300 176 L300 64 L448 176 Z" fill="#DCE9F2"/>
        <path d="M300 64 L448 176" stroke="#A8C2D6" stroke-width="2.4"/>
        <path d="M330 168 A 32 32 0 0 0 312 146" stroke="#4A5F86" stroke-width="1.4" fill="none"/>
        <text x="344" y="166" fill="#A7B8D4" font-size="12" font-family="system-ui">37°</text>
        <g transform="translate(372,122) rotate(37)">
          <circle cx="0" cy="-16" r="5" fill="#993C1D"/>
          <path d="M0 -11 L0 0 M0 0 L-5 8 M0 0 L5 8 M0 -8 L9 -13" stroke="#993C1D" stroke-width="2.4" stroke-linecap="round"/>
          <path d="M-12 10 L14 10" stroke="#E24B4A" stroke-width="3"/>
        </g>
        <text x="16" y="34" fill="#6F84A8" font-size="12" font-family="system-ui">sınır: a ≤ 3 m/s²</text>
      </svg>`,
    adimlar: [
      { bas: 'Verilenleri ayıkla',
        metin: 'İki açı (20° ve 37°), sınır ivme 3 m/s², g = 10 m/s². Kayakçının kütlesi <strong>verilmemiş</strong> — bu tesadüf değil, sorunun bir parçası.' },
      { bas: 'Olayı fiziksel modele çevir',
        metin: 'Kayakçı sürtünmesiz eğik düzlemde kayan bir cisimdir. Serbest cisim diyagramında iki kuvvet var: <strong>G (düşey)</strong> ve <strong>N (eğime dik)</strong>.' },
      { bas: 'Formülü sen çıkar',
        metin: 'Eğim boyunca tek etkili kuvvet G∥ = m·g·sin α:<br>m·a = m·g·sin α ⟹ <strong>a = g·sin α</strong>' },
      { bas: 'İki eğimi hesapla',
        metin: '20° için: a = 10 · 0,34 = <strong>3,4 m/s²</strong> → sınırı aşıyor<br>37° için: a = 10 · 0,6 = <strong>6 m/s²</strong> → sınırı katbekat aşıyor' },
      { bas: 'Kütle sorusunu yanıtla',
        metin: 'a = g·sin α ifadesinde <strong>kütle yok</strong> — çünkü m·a = m·g·sin α denkleminde sadeleşti. Ağır kayakçıya daha büyük kuvvet etki eder ama eylemsizliği de aynı oranda büyüktür. <strong>Ayrı piste gerek yok.</strong>' },
      { bas: 'Yorumla',
        metin: 'Her iki eğim de sınırı aşıyor. Kural a ≤ 3 m/s² ise gereken açı: sin α ≤ 0,3 ⟹ <strong>α ≤ 17,5°</strong>. Gerçek pistlerde kar sürtünmesi ivmeyi düşürdüğü için sınır biraz daha esnektir — ama sürtünmesiz hesap her zaman <em>en kötü durumu</em> verir, güvenlikte doğru yaklaşım budur.' }
    ],
    secenekler: [
      'Sadece 20° uygun; kütle ivmeyi etkilemez',
      'İkisi de uygun değil; kütle ivmeyi etkilemez',
      'İkisi de uygun değil; ağır kayakçı daha hızlı ivmelenir',
      'Sadece 20° uygun; ağır kayakçı daha hızlı ivmelenir',
      'İkisi de uygun; kütle önemsizdir'
    ],
    dogru: 1,
    cozum: `
      <p>Sürtünmesiz eğik düzlemde: <strong>a = g·sin α</strong></p>
      <p>20° → a = 10 · 0,34 = <strong>3,4 m/s²</strong> (sınır 3’ü aşıyor)</p>
      <p>37° → a = 10 · 0,6 = <strong>6 m/s²</strong> (çok aşıyor)</p>
      <p><strong>İkisi de uygun değil.</strong> Ayrıca formülde kütle bulunmadığından
      ağır kayakçı da hafif kayakçı da aynı ivmeyle kayar.</p>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>C ve D şıkları</strong> "ağır olan daha hızlı kayar"
        sezgisine oynuyor — bu, 1.1’de kırdığımız Aristoteles yanılgısının eğik düzlem hâli.
        <br><strong>A şıkkı</strong> ise 3,4 ile 3 arasındaki farkı gözden kaçıranlar için.
        Sınır değerine yakın sonuçlarda <em>küçük farkı görmezden gelmek</em> mühendislikte
        en pahalı hatalardan biridir.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: B</strong></p>`
  },
  {
    baslik: 'Asansördeki valiz',
    govde: `
      <p>Bir havalimanında, bagaj görevlisi asansörle bagaj taşırken elindeki valizin
      <strong>ağırlaştığını</strong> hissediyor. Valizi hiç bırakmadığı hâlde, asansör hareket
      ederken elinde farklı bir yük hissettiğini söylüyor.</p>
      <p>Görevli <strong>20 kg</strong>’lık valizi elinde tutuyor. Asansör bazı anlarda
      <strong>yukarı doğru 2 m/s² ivmeyle</strong> hızlanıyor, bazı anlarda
      <strong>sabit hızla</strong> gidiyor, bazı anlarda <strong>aşağı doğru 2 m/s² ivmeyle</strong>
      hızlanıyor.</p>
      <p><strong>Görevlinin valizi tutmak için uyguladığı kuvvet bu üç durumda kaçar N olur?</strong>
      (g = 10 m/s²)</p>`,
    gorsel: `
      <svg viewBox="0 0 520 210" xmlns="http://www.w3.org/2000/svg" role="img"
           aria-label="Asansörün yukarı ivmeli, sabit hızlı ve aşağı ivmeli üç durumunda valiz">
        <rect width="520" height="210" fill="#17223A"/>
        ${[0, 1, 2].map(i => `
        <g transform="translate(${60 + i * 165},0)">
          <rect x="0" y="34" width="120" height="140" rx="5" fill="#25324A" stroke="#4A5F86" stroke-width="1.6"/>
          <path d="M60 34 L60 12" stroke="#9AA5B1" stroke-width="3"/>
          <g transform="translate(46,120)">
            <circle cx="0" cy="-30" r="6" fill="#E8EDF5"/>
            <path d="M0 -24 L0 -8 M0 -8 L-6 4 M0 -8 L6 4 M0 -20 L16 -14" stroke="#E8EDF5" stroke-width="2.4" stroke-linecap="round"/>
          </g>
          <rect x="62" y="98" width="30" height="24" rx="3" fill="#C98B4B"/>
          <path d="M70 98 L70 92 L84 92 L84 98" stroke="#8A5A28" stroke-width="2.4" fill="none"/>
        </g>`).join('')}
        <text x="120" y="194" fill="#35C08A" font-size="12" font-family="system-ui" text-anchor="middle">yukarı ivmeli</text>
        <text x="285" y="194" fill="#A7B8D4" font-size="12" font-family="system-ui" text-anchor="middle">sabit hız</text>
        <text x="450" y="194" fill="#FF8FA3" font-size="12" font-family="system-ui" text-anchor="middle">aşağı ivmeli</text>
        <path d="M160 96 L160 62" stroke="#35C08A" stroke-width="2.4"/><path d="M160 54 L154 68 L166 68 Z" fill="#35C08A"/>
        <path d="M490 62 L490 96" stroke="#FF8FA3" stroke-width="2.4"/><path d="M490 104 L484 90 L496 90 Z" fill="#FF8FA3"/>
        <text x="16" y="26" fill="#6F84A8" font-size="12" font-family="system-ui">20 kg valiz · a = 2 m/s²</text>
      </svg>`,
    adimlar: [
      { bas: 'İncelenecek cismi seç',
        metin: 'Görevli değil, <strong>valiz</strong>. Valizin serbest cisim diyagramını çizeceğiz. Bu seçim yapılmadan hesap kurulamaz.' },
      { bas: 'Kuvvetleri belirle',
        metin: 'Valize etki eden iki kuvvet: <strong>G = m·g = 200 N (aşağı)</strong> ve görevlinin elinin uyguladığı <strong>F (yukarı)</strong>. Valiz zemine değmiyor, o yüzden N yok.' },
      { bas: 'Yönü seç ve Newton II yaz',
        metin: 'Yukarı pozitif: <strong>F − G = m·a</strong> ⟹ <strong>F = m(g + a)</strong>' },
      { bas: 'Üç durumu hesapla',
        metin: 'Yukarı ivmeli (a = +2): F = 20·(10+2) = <strong>240 N</strong><br>Sabit hız (a = 0): F = 20·10 = <strong>200 N</strong><br>Aşağı ivmeli (a = −2): F = 20·(10−2) = <strong>160 N</strong>' },
      { bas: 'Görevlinin hissini açıkla',
        metin: 'Valizin ağırlığı üç durumda da <strong>200 N</strong>, hiç değişmedi. Değişen şey görevlinin <em>uygulamak zorunda kaldığı kuvvet</em>. "Ağırlaştı" dediği şey aslında kendi kas kuvvetidir.' },
      { bas: 'Yorumla',
        metin: 'Bu yüzden asansörde hissettiğin ağırlaşma/hafifleme sadece <strong>kalkış ve duruş anlarında</strong> olur — yani ivmenin olduğu anlarda. Yolculuğun sabit hızlı kısmında hiçbir şey hissetmezsin.' }
    ],
    secenekler: [
      '240 N · 200 N · 160 N',
      '200 N · 200 N · 200 N',
      '240 N · 240 N · 160 N',
      '220 N · 200 N · 180 N',
      '400 N · 200 N · 0 N'
    ],
    dogru: 0,
    cozum: `
      <p>Valize etki eden kuvvetler: F (el, yukarı) ve G = 200 N (aşağı).
      Yukarı pozitif alarak <strong>F = m(g + a)</strong>:</p>
      <ul>
        <li>Yukarı ivmeli (a = +2): F = 20 · 12 = <strong>240 N</strong></li>
        <li>Sabit hız (a = 0): F = 20 · 10 = <strong>200 N</strong></li>
        <li>Aşağı ivmeli (a = −2): F = 20 · 8 = <strong>160 N</strong></li>
      </ul>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>B şıkkı</strong> "ağırlık değişmez, o hâlde kuvvet de
        değişmez" diyenler için. Ağırlık gerçekten değişmiyor — ama <em>uygulanan kuvvet</em>
        ağırlık değil.
        <br><strong>Ayrım cümlesi:</strong> Asansörde <strong>ağırlığın değişmez, hissettiğin
        değişir.</strong> Hissettiğin şey seni taşıyan kuvvettir (elin, zeminin, tartının),
        ağırlığın değil. Bu cümle asansör sorularının tamamını açar.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: A</strong></p>`
  }
]

});
})();
