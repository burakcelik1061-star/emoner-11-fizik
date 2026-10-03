(function () {
"use strict";
const F = window.F11;

/* ==========================================================================
   topics/u1-surtunme-degiskenler.js
   Konu 1.4.2 · Sürtünme kuvvetinin bağlı olduğu değişkenler (MEB 11, s.70-85)
   ========================================================================== */

F.konuKaydet('u1-surtunme-degiskenler', {

ozet: `Sürtünme kuvvetinin sayısal değeri neye bağlı? Cevap şaşırtıcı derecede kısa:
<strong>yalnızca iki şeye</strong> — yüzeylerin cinsine ve normal kuvvete.
Temas alanı, hız, cismin şekli… hiçbiri girmiyor.`,

/* ------------------------------------------------------------- Kavram */
kavram: `
<p>Deneyler sürtünme kuvvetinin <strong>normal kuvvetle doğru orantılı</strong> olduğunu
gösteriyor. Ağır bir kitabı kaydırmak hafif olandan zordur, çünkü ağır kitap yüzeye
daha kuvvetli bastırır ve mikro pürüzler birbirine daha çok geçer.</p>

<p>Bu orantı bir sabitle eşitlenerek matematiksel modele dönüşür:</p>
<div class="formul-serit" style="margin:14px 0">
  <div class="formul" style="border-top-color:var(--violet)">
    <div class="fm">f<sub>s,maks</sub> = μ<sub>s</sub> · N</div>
    <div class="aciklama">statik sürtünmenin ÜST SINIRI</div>
  </div>
  <div class="formul" style="border-top-color:var(--amber)">
    <div class="fm">f<sub>k</sub> = μ<sub>k</sub> · N</div>
    <div class="aciklama">kinetik sürtünme — doğrudan eşitlik</div>
  </div>
</div>

<div class="kutu nott" style="margin:14px 0">
  <div class="kutu-bas"><span class="ikon">📖</span>Sembol notu</div>
  <p style="margin:0">Ders kitabın sürtünme katsayısı için <strong>k</strong> harfini
  kullanıyor (k<sub>s</sub>, k<sub>k</sub>). Bu sistemde uluslararası standart olan
  <strong>μ</strong> (mü) kullanılıyor. <strong>Tamamen aynı şey</strong> — sadece harf farkı.
  Sınavda hangisi yazarsa yazsın aynı kavramdır.</p>
</div>

<h3 style="margin-top:22px">Neden statikte "≤", kinetikte "=" var?</h3>
<p>Bu küçük fark, bir önceki konunun tamamını özetliyor:</p>
<ul>
  <li><strong>Statik:</strong> f<sub>s</sub> ≤ μ<sub>s</sub>·N. Sürtünme gerektiği kadar olur.
  μ<sub>s</sub>·N onun <em>ulaşabileceği en büyük değerdir</em>, her zamanki değeri değil.</li>
  <li><strong>Kinetik:</strong> f<sub>k</sub> = μ<sub>k</sub>·N. Burada eşitlik vardır,
  çünkü cisim kayarken sürtünme hep aynı değerdedir.</li>
</ul>

<h3 style="margin-top:22px">Sürtünme katsayısı nedir?</h3>
<p>μ, iki yüzeyin <strong>birlikte</strong> ne kadar tuttuğunu anlatan
<strong>birimsiz</strong> bir sayıdır. Tek bir maddenin değil, <strong>yüzey çiftinin</strong>
özelliğidir — "lastiğin katsayısı" diye bir şey yoktur, "lastik-asfalt katsayısı" vardır.</p>

<table class="degisken-tablo">
  <thead><tr><th>Yüzey çifti</th><th>μ<sub>s</sub></th><th>μ<sub>k</sub></th></tr></thead>
  <tbody>
    <tr><td>Buz üzerinde buz</td><td class="sembol">0,10</td><td class="sembol">0,03</td></tr>
    <tr><td>Ahşap üzerinde ahşap</td><td class="sembol">0,50</td><td class="sembol">0,30</td></tr>
    <tr><td>Islak beton üzerinde lastik</td><td class="sembol">0,70</td><td class="sembol">0,50</td></tr>
    <tr><td>Kuru beton üzerinde lastik</td><td class="sembol">1,00</td><td class="sembol">0,70</td></tr>
  </tbody>
</table>
<p style="color:var(--text-2);font-size:.94em;margin-top:10px">Her satırda
μ<sub>s</sub> &gt; μ<sub>k</sub> olduğuna dikkat et — bu istisnasız bir kuraldır.</p>
<div class="kutu nott" style="margin-top:12px">
  <p style="margin:0"><strong>Bu sayılar kesin değildir.</strong> Sürtünme katsayısı yüzeyin
  pürüzlülüğüne, nemine, sıcaklığına ve temizliğine göre belirgin biçimde değişir; kaynaklarda
  aralık olarak verilir (ör. ahşap–ahşap için μ<sub>s</sub> = 0,25–0,50). Tablodaki değerler
  <strong>tipik</strong> değerlerdir. Sınavda katsayı her zaman soruda verilir — ezberlemen
  gerekmez, <em>büyüklük sırasını</em> bilmen yeter: buz &lt; ahşap &lt; beton &lt; lastik.</p>
</div>

<h3 style="margin-top:22px">Neye bağlı DEĞİL?</h3>
<div class="kutu dikkat" style="margin:14px 0">
  <div class="kutu-bas"><span class="ikon">⚠</span>Üç yaygın yanılgı</div>
  <ul style="margin:0">
    <li><strong>Temas alanına bağlı değildir.</strong> Bir tuğlayı yan yatırsan da dik koysan da
    sürtünme aynıdır. Alan büyürse birim alana düşen basınç azalır; ikisi birbirini götürür.</li>
    <li><strong>Hıza bağlı değildir.</strong> Kinetik sürtünme 1 m/s’de de 20 m/s’de de aynıdır.</li>
    <li><strong>Uygulanan kuvvete bağlı değildir</strong> (kinetikte). F’yi ikiye katlarsan
    f<sub>k</sub> değişmez, sadece bileşke kuvvet büyür.</li>
  </ul>
</div>
<p>Aşağıdaki simülasyonda <strong>Temas alanı</strong> seçeneğini değiştir: blok gözle görülür
biçimde yayılır ama sürtünme değeri <strong>kıpırdamaz</strong>.</p>`,

/* ---------------------------------------------------------- Formüller */
formuller: {
  liste: [
    { fm: 'f<sub>k</sub> = μ<sub>k</sub> · N',        aciklama: 'Kinetik sürtünme (cisim kayarken)' },
    { fm: 'f<sub>s</sub> ≤ μ<sub>s</sub> · N',        aciklama: 'Statik sürtünme (üst sınır)' },
    { fm: 'N = m · g',                                 aciklama: 'Yatay düzlemde, düşey kuvvet yoksa' },
    { fm: 'N = m·g·cos α',                             aciklama: 'Eğik düzlemde' },
    { fm: 'μ<sub>k</sub> &lt; μ<sub>s</sub>',          aciklama: 'Her yüzey çifti için geçerli' },
    { fm: 'a = g(sin α − μ<sub>k</sub>·cos α)',        aciklama: 'Sürtünmeli eğik düzlemde ivme' }
  ],
  degiskenler: [
    { sembol: 'μ<sub>s</sub>', ad: 'Statik sürtünme katsayısı',  birim: 'birimsiz' },
    { sembol: 'μ<sub>k</sub>', ad: 'Kinetik sürtünme katsayısı', birim: 'birimsiz' },
    { sembol: 'N',             ad: 'Normal kuvvet',              birim: 'N' },
    { sembol: 'f',             ad: 'Sürtünme kuvveti',           birim: 'N' }
  ]
},

/* ------------------------------------------------------------ Türetim */
turetim: {
  yollar: [
    {
      ad: 'Deneyden f = μ·N’ye',
      adimlar: [
        { baslik: 'Değişkeni tek tek değiştir',
          html: `<p>Bilimsel yöntemin temel kuralı: <strong>aynı anda tek bir değişkeni
                 değiştir</strong>, diğerlerini sabit tut. Sürtünmeyi etkileyebilecek adaylar:</p>
                 <ul>
                   <li>Normal kuvvet (cismin yüzeye bastırma kuvveti)</li>
                   <li>Yüzeylerin cinsi</li>
                   <li>Temas alanı</li>
                   <li>Hız</li>
                 </ul>
                 <p>Dördünü de sırayla sınayalım.</p>` },

        { baslik: 'Normal kuvveti değiştir',
          html: `<p>Bloğun üzerine 2 kg’lık ağırlıklar ekleyerek N’yi büyütelim ve her seferinde
                 kopma kuvvetini ölçelim. Ahşap yüzeyde tipik sonuçlar:</p>
                 <table class="degisken-tablo">
                   <thead><tr><th>N (N)</th><th>f<sub>s,maks</sub> (N)</th><th>f / N</th></tr></thead>
                   <tbody>
                     <tr><td class="sembol">40</td><td class="sembol">20</td><td class="sembol">0,50</td></tr>
                     <tr><td class="sembol">80</td><td class="sembol">40</td><td class="sembol">0,50</td></tr>
                     <tr><td class="sembol">120</td><td class="sembol">60</td><td class="sembol">0,50</td></tr>
                     <tr><td class="sembol">160</td><td class="sembol">80</td><td class="sembol">0,50</td></tr>
                   </tbody>
                 </table>
                 <p style="margin-top:10px">Son sütun <strong>hiç değişmiyor</strong>.
                 Bu bir orantının imzasıdır.</p>` },

        { baslik: 'Grafiğe dök',
          html: `<p>f − N grafiğini çizersen <strong>orijinden geçen bir doğru</strong> çıkar.
                 Bu doğrunun denklemi:</p>
                 <div class="formul" style="max-width:220px"><div class="fm">f = (eğim) · N</div></div>
                 <p style="margin-top:10px">Eğime bir isim verelim: <strong>sürtünme katsayısı μ</strong>.</p>
                 <div class="formul" style="max-width:220px;border-top-color:var(--accent)">
                   <div class="fm" style="color:var(--accent)">f = μ · N</div>
                 </div>
                 <div class="kutu puf" style="margin-top:12px">
                   <p style="margin:0">Simülasyonda ağırlıklar eklendikçe f − N grafiği
                   kendiliğinden bu doğruyu çiziyor. <strong>μ ezberlenen bir sayı değil,
                   grafikten okunan bir eğimdir.</strong></p>
                 </div>` },

        { baslik: 'Yüzeyi değiştir',
          html: `<p>Aynı deneyi buz, beton ve lastik üzerinde tekrarla. Her seferinde yine
                 <strong>doğru</strong> çıkar — ama <strong>eğimleri farklıdır</strong>.</p>
                 <p>Demek ki μ, deneyde ölçülen ve <strong>yüzey çiftine özgü</strong> bir sayıdır.
                 Formülde yüzeyin cinsi işte bu katsayıyla temsil edilir.</p>
                 <p style="color:var(--text-2)">Simülasyonda yüzeyi değiştir; grafiğin
                 eğiminin değiştiğini göreceksin.</p>` },

        { baslik: 'Alanı ve hızı sına',
          html: `<p>Aynı bloğu önce dik, sonra yan yatırarak temas alanını iki katına çıkar.
                 Kopma kuvveti ölçüldüğünde: <strong>hiç değişmez</strong>.</p>
                 <p>Neden? Alan iki katına çıkınca birim alana düşen baskı yarıya iner.
                 Toplam etki aynı kalır — ikisi birbirini tam olarak götürür.</p>
                 <p>Hız için de aynısı geçerlidir: kayan cismin hızını değiştirmek
                 f<sub>k</sub>’yı değiştirmez.</p>
                 <div class="formul" style="max-width:380px;border-top-color:var(--accent)">
                   <div class="fm" style="color:var(--accent);font-size:1em">
                     f yalnızca μ ve N’ye bağlıdır
                   </div>
                 </div>` }
      ]
    },
    {
      ad: 'Sürtünmeli eğik düzlem',
      adimlar: [
        { baslik: 'Önceki konuyu hatırla',
          html: `<p>1.3.2’de sürtünmesiz eğik düzlemi çözmüştük:</p>
                 <p>Eğim boyunca: G∥ = m·g·sin α &nbsp;·&nbsp; Eğime dik: N = m·g·cos α</p>
                 <p>Şimdi sürtünmeyi de ekleyeceğiz. <strong>Eğime dik denklem hiç değişmez</strong>
                 çünkü sürtünme yüzeye paraleldir.</p>` },

        { baslik: 'Sürtünmeyi yaz',
          html: `<p>Normal kuvveti zaten biliyoruz, doğrudan yerine koyalım:</p>
                 <div class="formul" style="max-width:300px">
                   <div class="fm">f<sub>k</sub> = μ<sub>k</sub> · N = μ<sub>k</sub> · m·g·cos α</div>
                 </div>
                 <p style="margin-top:10px;color:var(--text-2)">Dikkat: eğik düzlemde
                 N = m·g <strong>değildir</strong>. Buradaki cos α’yı unutmak bu konunun
                 en sık yapılan hatasıdır.</p>` },

        { baslik: 'Eğim boyunca Newton II',
          html: `<p>Cisim aşağı kayıyorsa sürtünme yukarı doğrudur (harekete zıt):</p>
                 <p>m·a = m·g·sin α − μ<sub>k</sub>·m·g·cos α</p>
                 <p>Her terimde m var, sadeleşir:</p>
                 <div class="formul" style="max-width:340px;border-top-color:var(--accent)">
                   <div class="fm" style="color:var(--accent)">a = g(sin α − μ<sub>k</sub>·cos α)</div>
                 </div>
                 <p style="margin-top:12px"><strong>Kütle yine sadeleşti.</strong> Sürtünme olsa da
                 olmasa da eğik düzlemde ivme kütleden bağımsızdır.</p>` },

        { baslik: 'Kayma koşulunu bul',
          html: `<p>Cismin kayabilmesi için ivmenin pozitif olması gerekir:</p>
                 <p>sin α − μ<sub>s</sub>·cos α &gt; 0 ⟹ <strong>tan α &gt; μ<sub>s</sub></strong></p>
                 <div class="formul" style="max-width:260px;border-top-color:var(--accent)">
                   <div class="fm" style="color:var(--accent)">tan α<sub>kritik</sub> = μ<sub>s</sub></div>
                 </div>
                 <div class="kutu puf" style="margin-top:12px">
                   <p style="margin:0">Bu çok kullanışlı bir sonuç: <strong>bir cismin kaymaya
                   başladığı açının tanjantı, statik sürtünme katsayısını verir.</strong>
                   Eğimli bir tahtaya cisim koyup yavaşça kaldırarak μ<sub>s</sub>’yi ölçebilirsin —
                   hiçbir kuvvetölçere gerek kalmadan.</p>
                 </div>` }
      ]
    }
  ]
},

/* -------------------------------------------------------- Simülasyon */
sim: F.simler['surtunme-degiskenler'],

/* ------------------------------------------------------- Püf noktası */
puf: {
  html: `
    <p><strong>1 · N her zaman m·g değildir.</strong> Bu, sürtünme sorularının bir numaralı
    tuzağıdır. Önce normal kuvveti doğru bul, sonra μ ile çarp:</p>
    <div style="background:var(--surface-0);border-radius:var(--r-sm);padding:14px;margin:12px 0">
      <table class="degisken-tablo" style="margin:0">
        <thead><tr><th>Durum</th><th>N</th></tr></thead>
        <tbody>
          <tr><td>Yatay düzlem, sadece ağırlık</td><td class="sembol">N = m·g</td></tr>
          <tr><td>Eğik düzlem (α)</td><td class="sembol">N = m·g·cos α</td></tr>
          <tr><td>Üstten F ile bastırılıyor</td><td class="sembol">N = m·g + F</td></tr>
          <tr><td>Yukarı doğru F ile çekiliyor</td><td class="sembol">N = m·g − F</td></tr>
          <tr><td>Eğik yukarı F (açı θ)</td><td class="sembol">N = m·g − F·sin θ</td></tr>
        </tbody>
      </table>
    </div>

    <p><strong>2 · μ birimsizdir.</strong> Cevabın birimi varsa yanlış hesaplamışsındır.
    Ayrıca μ genellikle 0 ile 1 arasındadır; 5 gibi bir sayı çıktıysa dön kontrol et.</p>

    <p><strong>3 · Temas alanı ve hız tuzaktır.</strong> Soruda "cismin yüzey alanı iki katına
    çıkarılırsa" ya da "hızı artırılırsa" geçiyorsa cevap büyük ihtimalle
    <strong>"değişmez"</strong>dir.</p>

    <p><strong>4 · Eğik düzlemde cos α’yı unutma.</strong> f = μ·m·g yazmak yaygın bir hatadır;
    doğrusu f = μ·m·g·<strong>cos α</strong>’dır.</p>

    <p><strong>5 · Kayma açısı kısayolu:</strong> <code>tan α = μ<sub>s</sub></code>.
    "Cisim kaç derecede kaymaya başlar" sorusunun tek satırlık cevabı.</p>

    <p style="margin-bottom:0"><strong>6 · Sürtünmeli eğik düzlemde ivme:</strong>
    <code>a = g(sin α − μ<sub>k</sub>cos α)</code>. Kütle yine yok — soruda kütle verilmişse
    ya normal kuvvet için gerekiyordur ya da tuzaktır.</p>`,

  ornekler: [
    {
      soru: `<p>Yatay zeminde duran 20 kg’lık bir cisim için μ<sub>s</sub> = 0,4’tür.
             Cismi harekete geçirmek için gereken en küçük yatay kuvvet kaç N’dır? (g = 10 m/s²)</p>`,
      taktikle: `<p>N = m·g = 200 N (yatay düzlem, başka düşey kuvvet yok)</p>
                 <p style="margin-bottom:0">f<sub>s,maks</sub> = 0,4 · 200 = <strong>80 N</strong></p>`,
      uzun: `<p>Cismin kayması için F &gt; f<sub>s,maks</sub> = μ<sub>s</sub>·N = 0,4·20·10 = 80 N</p>`
    },
    {
      soru: `<p>Aynı cisim, üzerine <strong>düşey aşağı doğru 100 N</strong> bastırılırken
             itiliyor. Harekete geçirmek için gereken kuvvet kaç N olur?</p>`,
      taktikle: `<p>N değişti! N = m·g + F<sub>bastırma</sub> = 200 + 100 = 300 N</p>
                 <p style="margin-bottom:0">f<sub>s,maks</sub> = 0,4 · 300 = <strong>120 N</strong></p>`,
      uzun: `<p>Düşey denge: N − m·g − 100 = 0 ⟹ N = 300 N</p>
             <p>f<sub>s,maks</sub> = μ<sub>s</sub>·N = 120 N</p>
             <p style="color:var(--text-3)">80 N diyenler N’yi güncellemeyi unutmuştur —
             en sık yapılan hata budur.</p>`
    },
    {
      soru: `<p>Bir cisim, eğimi yavaşça artırılan bir tahtanın üzerinde <strong>37°</strong>’de
             kaymaya başlıyor. Statik sürtünme katsayısı kaçtır?
             (tan37° = 0,75)</p>`,
      taktikle: `<p>Kayma açısı kısayolu: <strong>μ<sub>s</sub> = tan α</strong></p>
                 <p style="margin-bottom:0">μ<sub>s</sub> = tan37° = <strong>0,75</strong></p>`,
      uzun: `<p>Kayma sınırında: m·g·sin α = μ<sub>s</sub>·m·g·cos α</p>
             <p>m ve g sadeleşir: sin α = μ<sub>s</sub>·cos α ⟹ μ<sub>s</sub> = tan α = 0,75</p>
             <p style="color:var(--text-3)">Kütle, tahtanın uzunluğu, cismin şekli — hiçbiri gerekmedi.</p>`
    }
  ]
},

/* ------------------------------------------------------ Zorlayıcı sorular */
osym: [
  {
    baslik: 'Neye bağlı, neye bağlı değil',
    kaynak: 'Kavram tuzağı',
    govde: `
      <p>Yatay bir zeminde sabit hızla kaydırılan bir cisim için aşağıdaki değişiklikler
      ayrı ayrı yapılıyor:</p>
      <ol style="margin-left:.2em">
        <li>Cismin temas yüzeyi iki katına çıkarılıyor</li>
        <li>Cismin kayma hızı iki katına çıkarılıyor</li>
        <li>Cismin üzerine eşit kütleli bir cisim daha konuyor</li>
      </ol>
      <p>Bu işlemlerden hangileri <strong>kinetik sürtünme kuvvetini değiştirir</strong>?</p>`,
    secenekler: ['Yalnız I', 'Yalnız III', 'I ve II', 'II ve III', 'I, II ve III'],
    dogru: 1,
    cozum: `
      <p>Model: <strong>f<sub>k</sub> = μ<sub>k</sub> · N</strong>. Sadece bu iki çarpanı
      değiştiren işlem sonucu değiştirir.</p>
      <ol>
        <li><strong>Temas yüzeyi:</strong> Formülde alan <em>yok</em>. Değiştirmez.</li>
        <li><strong>Hız:</strong> Formülde hız <em>yok</em>. Değiştirmez.</li>
        <li><strong>Üzerine cisim konması:</strong> Toplam kütle iki katına çıkar ⟹
        N = m·g iki katına çıkar ⟹ <strong>f<sub>k</sub> de iki katına çıkar</strong> ✓</li>
      </ol>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>Bu üçlü neredeyse her sınavda karşına çıkar.</strong>
        Formülde bir büyüklük görünmüyorsa, o büyüklüğü değiştirmek sonucu etkilemez.
        Sürtünme formülünde yalnızca <strong>μ</strong> ve <strong>N</strong> var —
        gerisi hep tuzaktır.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: B) Yalnız III</strong></p>`
  },
  {
    baslik: 'Normal kuvveti doğru bulmak',
    kaynak: 'Çok adımlı',
    govde: `
      <p>Yatay zeminde duran m kütleli bir cisme, <strong>yatayla θ açısı yapacak şekilde
      yukarı doğru</strong> F kuvveti uygulanarak cisim çekiliyor.</p>
      <p>Buna göre cisme etki eden <strong>normal kuvvet</strong> için ne söylenebilir?</p>`,
    gorsel: `
      <svg viewBox="0 0 520 180" xmlns="http://www.w3.org/2000/svg" role="img"
           aria-label="Yatayla theta açısı yapan F kuvvetiyle yukarı eğik çekilen blok">
        <rect width="520" height="180" fill="#0E1726"/>
        <path d="M60 140 H460" stroke="#4A5F86" stroke-width="1.6"/>
        <g stroke="#4A5F86" stroke-width="1">
          ${Array.from({length: 20}, (_, i) => `<path d="M${64 + i * 20} 140 L${56 + i * 20} 150"/>`).join('')}
        </g>
        <rect x="200" y="100" width="70" height="40" rx="4" fill="#2E3D57" stroke="#6F84A8" stroke-width="1.6"/>
        <text x="235" y="124" fill="#EAF0FA" font-size="13" font-family="system-ui" text-anchor="middle">m</text>
        <path d="M270 110 L360 74" stroke="#FF6B6B" stroke-width="2.8"/>
        <path d="M370 70 L354 69 L360 82 Z" fill="#FF6B6B"/>
        <text x="372" y="66" fill="#FF6B6B" font-size="14" font-family="system-ui">F</text>
        <path d="M296 110 A 32 32 0 0 0 292 98" stroke="#A7B8D4" stroke-width="1.4" fill="none"/>
        <text x="308" y="106" fill="#A7B8D4" font-size="13" font-family="system-ui">θ</text>
        <path d="M270 110 H350" stroke="#6F84A8" stroke-width="1" stroke-dasharray="4 4"/>
        <path d="M170 100 L170 62" stroke="#38D6E0" stroke-width="2.4"/>
        <path d="M170 54 L164 68 L176 68 Z" fill="#38D6E0"/>
        <text x="152" y="76" fill="#38D6E0" font-size="14" font-family="system-ui">N</text>
        <path d="M170 140 L170 168" stroke="#FF8FA3" stroke-width="2.4"/>
        <text x="146" y="160" fill="#FF8FA3" font-size="14" font-family="system-ui">G</text>
      </svg>`,
    secenekler: [
      'N = m·g',
      'N = m·g + F·sin θ',
      'N = m·g − F·sin θ',
      'N = m·g − F·cos θ',
      'N = F·sin θ'
    ],
    dogru: 2,
    cozum: `
      <p>F kuvvetini bileşenlerine ayıralım:</p>
      <ul>
        <li><strong>Yatay bileşen:</strong> F·cos θ — cismi ileri çeker, sürtünmeyle yarışır</li>
        <li><strong>Düşey bileşen:</strong> F·sin θ — cismi <strong>yukarı kaldırmaya çalışır</strong></li>
      </ul>
      <p>Düşeyde hareket yok, denge var. Yukarı pozitif:</p>
      <p>N + F·sin θ − m·g = 0 ⟹ <strong>N = m·g − F·sin θ</strong></p>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>Pratik sonucu:</strong> Bir valizi <em>eğik yukarı</em> çekmek,
        yatay itmekten kolaydır — çünkü düşey bileşen zemine binen yükü azaltır, dolayısıyla
        sürtünme de azalır. Bavul saplarının neden yukarı doğru tasarlandığının fizik cevabı budur.
        <br><strong>B şıkkı</strong> ise kuvvet <em>aşağı</em> eğik uygulansaydı doğru olurdu.
        Vektörün yönüne dikkat etmeyenler oraya düşer.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: C</strong></p>`
  }
],

/* --------------------------------------------- Bağlam temelli sorular */
baglam: [
  {
    baslik: 'Yarış lastikleri neden geniş?',
    govde: `
      <p>Formula 1 araçlarının lastikleri normal otomobil lastiklerinden çok daha geniştir.
      Bir öğrenci fizik dersinde öğrendiğini hatırlayıp itiraz ediyor:</p>
      <p><strong>"Sürtünme temas alanına bağlı değil ki! Öyleyse geniş lastik neden
      kullanılıyor? Fizik yanlış mı?"</strong></p>
      <p><strong>Öğrencinin öğrendiği kural doğru mu, geniş lastik neden kullanılıyor?</strong></p>`,
    gorsel: `
      <svg viewBox="0 0 520 190" xmlns="http://www.w3.org/2000/svg" role="img"
           aria-label="Dar normal lastik ile geniş yarış lastiğinin temas alanı karşılaştırması">
        <rect width="520" height="190" fill="#17223A"/>
        <rect x="0" y="146" width="520" height="44" fill="#3C3C3A"/>
        <g transform="translate(140,104)">
          <ellipse cx="0" cy="0" rx="18" ry="40" fill="#23262B" stroke="#7D8A99" stroke-width="2"/>
          <ellipse cx="0" cy="0" rx="7" ry="16" fill="#5F6B78"/>
          <path d="M-18 42 H18" stroke="#35C08A" stroke-width="4"/>
        </g>
        <text x="140" y="42" fill="#A7B8D4" font-size="13" font-family="system-ui" text-anchor="middle">normal lastik</text>
        <text x="140" y="176" fill="#35C08A" font-size="11" font-family="system-ui" text-anchor="middle">dar temas</text>
        <g transform="translate(380,104)">
          <ellipse cx="0" cy="0" rx="40" ry="40" fill="#23262B" stroke="#7D8A99" stroke-width="2"/>
          <ellipse cx="0" cy="0" rx="15" ry="16" fill="#5F6B78"/>
          <path d="M-40 42 H40" stroke="#35C08A" stroke-width="4"/>
        </g>
        <text x="380" y="42" fill="#A7B8D4" font-size="13" font-family="system-ui" text-anchor="middle">yarış lastiği</text>
        <text x="380" y="176" fill="#35C08A" font-size="11" font-family="system-ui" text-anchor="middle">geniş temas</text>
        <text x="16" y="24" fill="#6F84A8" font-size="12" font-family="system-ui">aynı araç ağırlığı</text>
      </svg>`,
    adimlar: [
      { bas: 'Kuralı doğru ifade et',
        metin: 'f = μ·N modelinde alan yok. Bu model <strong>idealleştirilmiş, sert ve şekil değiştirmeyen yüzeyler</strong> için kurulmuştur. Öğrencinin öğrendiği kural, bu varsayımlar altında doğrudur.' },
      { bas: 'Varsayımın nerede bozulduğunu bul',
        metin: 'Lastik <strong>sert değildir</strong>. Yol yüzeyine bastırıldığında ezilir, şekil değiştirir ve asfaltın pürüzlerinin arasına girer. Bu, basit modelin kapsamadığı bir durumdur.' },
      { bas: 'Ek mekanizmaları say',
        metin: 'Geniş lastikte: (a) daha fazla kauçuk asfaltla moleküler bağ kurar, (b) birim alana düşen basınç azaldığı için lastik daha az ezilip daha az ısınır, (c) ısınan lastiğin tutuşu düşer — geniş lastik bunu geciktirir.' },
      { bas: 'İki cevabı birden ver',
        metin: 'Öğrenci <strong>haklı</strong> — ders kapsamında f = μ·N geçerlidir ve alan sonucu değiştirmez. Ama <strong>fizik yanlış değil</strong>: model belirli varsayımlar altında kurulmuştur, lastik o varsayımları karşılamaz.' },
      { bas: 'Genel dersi çıkar',
        metin: 'Her fiziksel model bir <strong>geçerlilik alanına</strong> sahiptir. Model yanlış değildir; kullanıldığı yer yanlış olabilir. Bu, sınav sorularıyla gerçek hayat arasındaki farkı anlamanın anahtarıdır.' }
    ],
    secenekler: [
      'Öğrenci yanılıyor, sürtünme her zaman alana bağlıdır',
      'Öğrenci haklı; f = μ·N modelinde alan yoktur, ancak lastik şekil değiştirdiği için model bu duruma tam uymaz',
      'Geniş lastik sürtünmeyi azaltır, bu yüzden kullanılır',
      'Geniş lastik normal kuvveti artırır',
      'Yarış lastikleri sadece görünüş için geniştir'
    ],
    dogru: 1,
    cozum: `
      <p>Öğrencinin öğrendiği kural <strong>doğrudur</strong>: f = μ·N modelinde temas alanı
      bulunmaz ve bu model sert cisimler için geçerlidir.</p>
      <p>Lastik ise <strong>şekil değiştiren</strong> bir malzemedir. Asfaltla arasında
      moleküler yapışma kurulur, ezilme ve ısınma devreye girer. Bunlar basit modelin
      kapsamadığı ek mekanizmalardır.</p>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>Sınavda hangisini yazacaksın?</strong> Soru "sürtünme
        temas alanına bağlı mıdır" diye sorarsa cevap kesinlikle <strong>hayır</strong>dır.
        Ders kapsamı f = μ·N modelidir.
        <br>Buradaki asıl ders şu: <strong>bir modelin geçerlilik alanı vardır.</strong>
        Fizikte "yanlış model" değil, "yanlış yerde kullanılan model" vardır.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: B</strong></p>`
  },
  {
    baslik: 'Kamyonun yükü kayar mı?',
    govde: `
      <p>Bir nakliye firması, açık kasalı kamyonla <strong>800 kg</strong>’lık bir makine
      taşıyacak. Makine kasaya bağlanmayacak, sadece kasanın üzerinde duracak.</p>
      <p>Kasa zemini ile makine arasındaki statik sürtünme katsayısı
      <strong>μ<sub>s</sub> = 0,5</strong>’tir.</p>
      <p>Şoför, kırmızı ışıkta fren yaparken aracın <strong>6 m/s²</strong> ivmeyle
      yavaşlayacağını biliyor.</p>
      <p><strong>Makine kasada kayar mı?</strong> (g = 10 m/s²)</p>`,
    gorsel: `
      <svg viewBox="0 0 520 190" xmlns="http://www.w3.org/2000/svg" role="img"
           aria-label="Fren yapan kamyonun açık kasasındaki makineye etki eden sürtünme kuvveti">
        <rect width="520" height="190" fill="#17223A"/>
        <rect x="0" y="152" width="520" height="38" fill="#3C3C3A"/>
        <g transform="translate(110,60)">
          <path d="M0 40 L0 6 L36 6 L54 -18 L100 -18 L100 40 Z" fill="#2E5C8A"/>
          <path d="M44 4 L58 -12 L84 -12 L84 4 Z" fill="#9FC8E8"/>
        </g>
        <rect x="210" y="70" width="190" height="6" fill="#5F6B78"/>
        <rect x="204" y="76" width="8" height="34" fill="#5F6B78"/>
        <rect x="398" y="76" width="8" height="34" fill="#5F6B78"/>
        <rect x="248" y="34" width="110" height="36" rx="3" fill="#C98B4B" stroke="#8A5A28" stroke-width="2"/>
        <text x="303" y="57" fill="#4A2E10" font-size="13" font-family="system-ui" text-anchor="middle" font-weight="700">800 kg</text>
        <circle cx="160" cy="132" r="18" fill="#23262B"/><circle cx="160" cy="132" r="7" fill="#7D8A99"/>
        <circle cx="250" cy="132" r="18" fill="#23262B"/><circle cx="250" cy="132" r="7" fill="#7D8A99"/>
        <circle cx="370" cy="132" r="18" fill="#23262B"/><circle cx="370" cy="132" r="7" fill="#7D8A99"/>
        <path d="M100 104 L64 104" stroke="#FFB020" stroke-width="3"/>
        <path d="M54 104 L70 97 L70 111 Z" fill="#FFB020"/>
        <text x="86" y="92" fill="#FFB020" font-size="12" font-family="system-ui" text-anchor="middle">a = 6 m/s²</text>
        <path d="M303 26 L262 26" stroke="#A78BFA" stroke-width="3"/>
        <path d="M252 26 L268 19 L268 33 Z" fill="#A78BFA"/>
        <text x="330" y="22" fill="#A78BFA" font-size="12" font-family="system-ui">f = ?</text>
      </svg>`,
    adimlar: [
      { bas: 'İncelenecek cismi seç',
        metin: 'Kamyon değil, <strong>makine</strong>. Makinenin serbest cisim diyagramını kuracağız.' },
      { bas: 'Makineyi ne yavaşlatıyor?',
        metin: 'Makine kasaya bağlı değil. Onu kamyonla birlikte yavaşlatabilecek <strong>tek yatay kuvvet sürtünmedir</strong>. Başka hiçbir şey ona dokunmuyor.' },
      { bas: 'Gereken kuvveti hesapla',
        metin: 'Makinenin de 6 m/s² ile yavaşlaması için gereken kuvvet:<br>F<sub>gerekli</sub> = m·a = 800 · 6 = <strong>4800 N</strong>' },
      { bas: 'Sürtünmenin verebileceği en fazla kuvveti bul',
        metin: 'N = m·g = 800 · 10 = 8000 N<br>f<sub>s,maks</sub> = μ<sub>s</sub> · N = 0,5 · 8000 = <strong>4000 N</strong>' },
      { bas: 'Karşılaştır',
        metin: 'Gereken 4800 N, sürtünmenin verebileceği en fazla 4000 N. <strong>4800 &gt; 4000</strong> ⟹ sürtünme yetmez ⟹ <strong>makine kayar</strong> ve öne doğru kasada ilerler.' },
      { bas: 'Güvenli sınırı hesapla',
        metin: 'Kaymaması için: m·a ≤ μ<sub>s</sub>·m·g ⟹ <strong>a ≤ μ<sub>s</sub>·g = 5 m/s²</strong>. Kütle sadeleşti — <strong>yükün ne kadar ağır olduğu fark etmez</strong>. Şoför ya daha yumuşak fren yapmalı ya da yükü bağlamalıdır.' }
    ],
    secenekler: [
      'Kaymaz, sürtünme 8000 N’a kadar dayanır',
      'Kayar; gereken 4800 N, sürtünmenin verebileceği en fazla 4000 N',
      'Kaymaz, çünkü makine çok ağırdır',
      'Kayar; ancak yük daha hafif olsaydı kaymazdı',
      'Sürtünme kuvveti 4800 N olur ve makine kaymaz'
    ],
    dogru: 1,
    cozum: `
      <p><strong>Gereken kuvvet:</strong> F = m·a = 800 · 6 = <strong>4800 N</strong></p>
      <p><strong>Sürtünmenin sunabileceği en fazla:</strong>
      f<sub>s,maks</sub> = μ<sub>s</sub>·m·g = 0,5 · 8000 = <strong>4000 N</strong></p>
      <p>4800 &gt; 4000 olduğundan sürtünme yetersiz kalır ve <strong>makine kayar</strong>.</p>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>C ve D şıkları kütleye oynuyor</strong>, ama kayma koşulunu
        yazdığımızda kütle sadeleşiyor: <strong>a ≤ μ<sub>s</sub>·g</strong>.
        Bu sınır yalnızca katsayıya ve g’ye bağlıdır; 80 kg da olsa 8000 kg da olsa aynı ivmede kayar.
        <br>Aynı formül virajda savrulma, ıslak yolda fren mesafesi ve halının üzerinde
        koşan çocuğun kayması için de geçerlidir.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: B</strong></p>`
  }
]

});
})();
