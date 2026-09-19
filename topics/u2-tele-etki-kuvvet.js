(function () {
"use strict";
const F = window.F11;

/* ==========================================================================
   topics/u2-tele-etki-kuvvet.js
   Konu 2.2.5 · Manyetik alanda akım geçen düz tele etki eden kuvvet
                                                    (MEB 11, s.218-228)
   ========================================================================== */

F.konuKaydet('u2-tele-etki-kuvvet', {

ozet: `Akım manyetik alan <em>üretiyordu</em>. Şimdi tersini soruyoruz: hazır bir manyetik
alanın içine akımlı bir tel koyarsak ne olur? <strong>Tel kuvvet görür.</strong> Bu tek
olgudan elektrik motoru, hoparlör ve analog ölçü aletleri doğar.`,

/* ------------------------------------------------------------- Kavram */
kavram: `
<p>Manyetik alan, içindeki <strong>hareketli yüklere</strong> kuvvet uygular. Bir telden
akım geçiyorsa telin içinde milyarlarca hareketli yük var demektir; her birine etkiyen
küçük kuvvetlerin toplamı <strong>telin tamamına etkiyen bir kuvvet</strong> olarak görünür.</p>

<div class="formul" style="max-width:340px;margin:14px 0;border-top-color:var(--accent)">
  <div class="fm" style="color:var(--accent)">F = B · i · L · sinα</div>
  <div class="fm-ad">α: akım ile manyetik alan arasındaki açı</div>
</div>

<h3 style="margin-top:22px">Açı neden bu kadar önemli?</h3>
<table class="degisken-tablo">
  <thead><tr><th>α</th><th>sinα</th><th>Kuvvet</th></tr></thead>
  <tbody>
    <tr><td>90° (tel alana dik)</td><td class="sembol">1</td><td><strong>EN BÜYÜK</strong> · F = BiL</td></tr>
    <tr><td>53°</td><td class="sembol">0,8</td><td>0,8·BiL</td></tr>
    <tr><td>37°</td><td class="sembol">0,6</td><td>0,6·BiL</td></tr>
    <tr><td>30°</td><td class="sembol">0,5</td><td>yarısı</td></tr>
    <tr><td>0° (tel alana paralel)</td><td class="sembol">0</td><td><strong>SIFIR</strong></td></tr>
  </tbody>
</table>

<div class="kutu dikkat" style="margin:16px 0">
  <div class="kutu-bas"><span class="ikon">⚠</span><span>Alana paralel tel kuvvet görmez</span></div>
  <p style="margin:0">Bu, sezgiye aykırı gelir: alan var, akım var, ama kuvvet
  <strong>yok</strong>. Sebep sinüs: α = 0 ise sin0 = 0. Simülasyonda açıyı 90°&rsquo;den
  0&rsquo;a indirerek kuvvetin nasıl eridiğini izle.</p>
</div>

<h3 style="margin-top:22px">Kuvvetin yönü: sol el kuralı</h3>
<p><strong>Sol elini</strong> aç. Parmakların <strong>manyetik alanı</strong>, başparmağın
<strong>akımı</strong> gösterecek şekilde tut. <strong>Avuç içinin baktığı yön kuvvetin
yönüdür.</strong></p>

<div class="kutu puf" style="margin:16px 0">
  <div class="kutu-bas"><span class="ikon">✋</span><span>Sağ el mi, sol el mi?</span></div>
  <table class="degisken-tablo" style="margin:8px 0 0">
    <thead><tr><th>Ne arıyorsun?</th><th>El</th></tr></thead>
    <tbody>
      <tr><td>Akımın <strong>ürettiği</strong> alanın yönü</td><td class="sembol">SAĞ el</td></tr>
      <tr><td>Alanın tele <strong>uyguladığı</strong> kuvvetin yönü</td><td class="sembol">SOL el</td></tr>
    </tbody>
  </table>
  <p style="margin:8px 0 0">Ayırt etmenin kolay yolu: <em>üretiyorsan sağ, kuvvet
  arıyorsan sol.</em></p>
</div>

<h3 style="margin-top:22px">Kuvvet her zaman DİKTİR</h3>
<p>Kuvvet hem akıma hem alana <strong>diktir</strong>. Bu, alışık olduğumuz kuvvetlerden
çok farklıdır: yer çekimi cismin üzerine doğru, Coulomb kuvveti yükleri birleştiren doğru
boyuncaydı. Burada kuvvet <strong>üçüncü bir doğrultudadır</strong>.</p>

<p>Pratik sonucu şudur: alan ve akım sayfa düzlemindeyse <strong>kuvvet sayfaya diktir</strong>
(⊙ ya da ⊗). Alan sayfaya dikse (⊗) ve akım sayfa düzlemindeyse, <strong>kuvvet sayfa
düzlemindedir</strong>. Simülasyondaki iki düzenek tam olarak bu iki durumu gösterir.</p>

<h3 style="margin-top:22px">Nerede kullanılıyor?</h3>
<ul>
  <li><strong>Elektrik motoru:</strong> çerçeveye etkiyen kuvvetler onu döndürür (sonraki konu)</li>
  <li><strong>Hoparlör:</strong> akım yön değiştirdikçe bobin ileri geri gider, hava titreşir</li>
  <li><strong>Analog ölçü aletleri:</strong> ibrenin sapması akımla orantılıdır</li>
  <li><strong>Maglev trenleri:</strong> itme ve kaldırma kuvvetleri</li>
  <li><strong>Kütle spektrometresi:</strong> yüklü parçacıkların ayrıştırılması</li>
</ul>`,

/* ---------------------------------------------------------- Formüller */
formuller: {
  liste: [
    { fm: 'F = B·i·L·sinα', aciklama: 'Manyetik alandaki akımlı tele etkiyen kuvvet' },
    { fm: 'F = B·i·L',      aciklama: 'α = 90° ise (tel alana dik) — en büyük değer' },
    { fm: 'F = 0',          aciklama: 'α = 0° ise (tel alana paralel)' },
    { fm: 'a = F / m',      aciklama: 'Serbest tel için Newton II — sabit kuvvet, sabit ivme' },
    { fm: 'F ⊥ i  ·  F ⊥ B', aciklama: 'Kuvvet her ikisine de diktir' }
  ],
  degiskenler: [
    { sembol: 'F', ad: 'Kuvvet',          birim: 'N' },
    { sembol: 'B', ad: 'Manyetik alan',   birim: 'T' },
    { sembol: 'i', ad: 'Akım',            birim: 'A' },
    { sembol: 'L', ad: 'Telin alan içindeki uzunluğu', birim: 'm' },
    { sembol: 'α', ad: 'Akım-alan açısı', birim: '°' }
  ]
},

/* ------------------------------------------------------------ Türetim */
turetim: {
  yollar: [
    {
      ad: 'Formüldeki sinα nereden geliyor?',
      adimlar: [
        { baslik: 'Akımı ikiye ayır',
          html: `<p>Tel alanla α açısı yapıyorsa, akımı iki bileşene ayırabiliriz:</p>
                 <ul>
                   <li>Alana <strong>dik</strong> bileşen: <code>i·sinα</code></li>
                   <li>Alana <strong>paralel</strong> bileşen: <code>i·cosα</code></li>
                 </ul>` },

        { baslik: 'Hangisi kuvvet üretir?',
          html: `<p>Alana <strong>paralel</strong> hareket eden yükler kuvvet görmez —
                 bu deneysel bir gerçektir. Kuvveti üreten yalnızca <strong>dik</strong>
                 bileşendir.</p>` },

        { baslik: 'Yalnız dik bileşeni kullan',
          html: `<p>Dik bileşen için kuvvet <code>B·(i sinα)·L</code>&rsquo;dir:</p>
                 <div class="formul" style="max-width:280px;border-top-color:var(--accent)">
                   <div class="fm" style="color:var(--accent)">F = B·i·L·sinα</div>
                 </div>` },

        { baslik: 'Uç durumları sına',
          html: `<p>α = 90° ⟹ akımın tamamı dik ⟹ <code>F = BiL</code> (en büyük)<br>
                 α = 0° ⟹ dik bileşen yok ⟹ <code>F = 0</code></p>
                 <p>Formül iki uçta da doğru davranıyor. Bir formülü sınamanın en hızlı
                 yolu budur.</p>` }
      ]
    },
    {
      ad: 'Raylı telde hareket',
      adimlar: [
        { baslik: 'Düzeneği kur',
          html: `<p>İki iletken ray üzerinde serbestçe kayabilen bir tel var. Raylardan akım
                 geçiyor ve bölgede sayfaya dik bir <strong>B</strong> alanı var.</p>` },

        { baslik: 'Kuvveti bul',
          html: `<p>Tel alana dik olduğu için α = 90°:</p>
                 <div class="formul" style="max-width:220px"><div class="fm">F = B·i·L</div></div>
                 <p>Yönünü sol el kuralıyla belirle — raylar boyuncadır.</p>` },

        { baslik: 'Newton II’yi uygula',
          html: `<p>Tel serbest olduğuna göre hızlanır:</p>
                 <div class="formul" style="max-width:240px;border-top-color:var(--accent)">
                   <div class="fm" style="color:var(--accent)">a = F/m = B·i·L / m</div>
                 </div>` },

        { baslik: '1. üniteye bağla',
          html: `<p>B, i ve L sabitse <strong>kuvvet sabittir</strong> ⟹
                 <strong>ivme sabittir</strong>. Yani bu, 1. ünitedeki sabit ivmeli hareketin
                 aynısıdır:</p>
                 <div class="formul" style="max-width:300px">
                   <div class="fm">ϑ = a·t &nbsp;&nbsp; x = ½·a·t²</div>
                 </div>
                 <p>Yeni formül öğrenmene gerek yok; yalnızca ivmeyi bu konudan alıyorsun.</p>` }
      ]
    },
    {
      ad: 'Hoparlör nasıl ses üretiyor?',
      adimlar: [
        { baslik: 'Düzeneği tanı',
          html: `<p>Bir kalıcı mıknatısın boşluğunda, kâğıt koniye bağlı bir
                 <strong>bobin</strong> vardır. Bobinden müzik sinyali (değişken akım) geçer.</p>` },

        { baslik: 'Kuvveti yaz',
          html: `<p>Bobin manyetik alanın içinde ve akım taşıyor ⟹ kuvvet görüyor:</p>
                 <div class="formul" style="max-width:220px"><div class="fm">F = B·i·L</div></div>
                 <p>B ve L sabit olduğuna göre <strong>F ∝ i</strong>.</p>` },

        { baslik: 'Akım değişince ne olur?',
          html: `<p>Müzik sinyali saniyede binlerce kez <strong>yön değiştirir</strong>.
                 Akım yön değiştirince <strong>kuvvet de yön değiştirir</strong> ⟹ bobin
                 ileri geri gider.</p>` },

        { baslik: 'Sesi üret',
          html: `<p>Bobine bağlı koni havayı <strong>iter ve çeker</strong>; bu basınç
                 dalgaları kulağa <strong>ses</strong> olarak ulaşır.</p>
                 <ul>
                   <li>Akımın <strong>frekansı</strong> → sesin <strong>tizliği</strong></li>
                   <li>Akımın <strong>şiddeti</strong> → sesin <strong>yüksekliği</strong></li>
                 </ul>
                 <p>Yani hoparlör, elektrik sinyalini mekanik titreşime çeviren bir
                 <strong>F = BiL makinesidir</strong>.</p>` }
      ]
    }
  ]
},

/* -------------------------------------------------------- Simülasyon */
sim: F.simler['tele-etki-kuvvet'],

/* ------------------------------------------------------- Püf noktası */
puf: {
  html: `
    <p><strong>1 · Önce açıyı kontrol et.</strong> Soru “tel alana paralel” diyorsa cevap
    hesap yapmadan <strong>F = 0</strong>&rsquo;dır. Bu, en hızlı kazanılan sorudur.</p>

    <p><strong>2 · Sınav açıları:</strong> sin30° = 0,5 · sin37° = 0,6 · sin45° = √2/2 ·
    sin53° = 0,8 · sin60° = √3/2 · sin90° = 1. Bu tablo 1. üniteden tanıdık.</p>

    <p><strong>3 · İki eli karıştırma.</strong> Alanı <em>üreten</em> akımsa sağ el,
    alanın <em>ittiği</em> telse sol el. Soruda “kuvvetin yönü” geçiyorsa <strong>sol
    el</strong>.</p>

    <p><strong>4 · L, telin alan İÇİNDEKİ uzunluğudur.</strong> Tel 1 m olsa bile alan
    bölgesinin genişliği 20 cm ise <code>L = 0,2 m</code> alınır. Bu ayrıntı çok atlanır.</p>

    <p><strong>5 · Oranlar:</strong></p>
    <table class="degisken-tablo" style="margin-top:8px">
      <thead><tr><th>Değişiklik</th><th>F</th></tr></thead>
      <tbody>
        <tr><td>i → 2i</td><td class="sembol">2F</td></tr>
        <tr><td>B → 2B</td><td class="sembol">2F</td></tr>
        <tr><td>L → 2L</td><td class="sembol">2F</td></tr>
        <tr><td>α: 90° → 30°</td><td class="sembol">F/2</td></tr>
        <tr><td>α: 90° → 0°</td><td class="sembol">0</td></tr>
      </tbody>
    </table>

    <p style="margin-top:14px"><strong>6 · Kuvvet üçüncü doğrultudadır.</strong> Alan ve akım
    sayfa düzlemindeyse kuvvet <strong>sayfaya diktir</strong> (⊙/⊗). Şıklarda kuvveti
    sayfa düzleminde gösteren seçenek yanlıştır.</p>

    <p><strong>7 · Serbest tel sorusu iki konuyu birleştirir.</strong> Önce
    <code>F = BiL</code> ile kuvveti bul, sonra <code>a = F/m</code> ile ivmeyi, sonra
    1. ünitenin sabit ivme formüllerini kullan. Üç adım, üç ünite.</p>

    <p><strong>8 · Akımı ters çevirmek kuvveti ters çevirir</strong>, alanı ters çevirmek de.
    <strong>İkisini birden</strong> ters çevirirsen kuvvet <em>aynı kalır</em>. Bu, motor
    konusundaki komütatörün varlık sebebidir.</p>`
},

/* ----------------------------------------------------- Zorlayıcı sorular */
osym: [
  {
    baslik: 'Açı ve alan içindeki uzunluk',
    kaynak: 'İki tuzak bir arada',
    govde: `
      <p>Genişliği <strong>20 cm</strong> olan bir bölgede, sayfa düzleminde soldan sağa doğru
      <strong>B = 0,5 T</strong>&rsquo;lık düzgün bir manyetik alan vardır.</p>
      <p>Uzunluğu <strong>80 cm</strong> olan bir telden <strong>6 A</strong> akım geçmektedir
      ve tel, alanla <strong>30°</strong>&rsquo;lik açı yapacak biçimde yerleştirilmiştir.</p>
      <p>Tele etki eden kuvvetin büyüklüğü kaç N&rsquo;dir?</p>`,
    gorsel: `
      <svg viewBox="0 0 520 190" xmlns="http://www.w3.org/2000/svg" role="img"
           aria-label="Yirmi santimetre genişliğindeki alan bölgesinden otuz derece açıyla geçen tel">
        <rect width="520" height="190" fill="#0E1726"/>
        <rect x="190" y="26" width="140" height="138" fill="rgba(56,150,200,.12)" stroke="#38D6E0" stroke-width="1.4"/>
        <g stroke="#2F6FD0" stroke-width="1.6">
          <path d="M198 54 H322 M198 82 H322 M198 110 H322 M198 138 H322"/>
        </g>
        <g fill="#2F6FD0">
          <path d="M328 54 l-10 -5 l0 10 z"/><path d="M328 82 l-10 -5 l0 10 z"/>
          <path d="M328 110 l-10 -5 l0 10 z"/><path d="M328 138 l-10 -5 l0 10 z"/>
        </g>
        <path d="M70 150 L450 38" stroke="#B87333" stroke-width="7" stroke-linecap="round"/>
        <text x="96" y="176" fill="#EAF0FA" font-size="12" font-family="system-ui">tel · 80 cm · i = 6 A</text>
        <text x="260" y="20" fill="#38D6E0" font-size="12" font-family="system-ui" text-anchor="middle">B = 0,5 T · genişlik 20 cm</text>
        <path d="M250 110 A 34 34 0 0 0 274 96" fill="none" stroke="#FFB020" stroke-width="2"/>
        <text x="292" y="112" fill="#FFB020" font-size="12" font-family="system-ui">30°</text>
      </svg>`,
    secenekler: [
      '0,3 N',
      '1,2 N',
      '0,6 N',
      '2,4 N',
      '0,15 N'
    ],
    dogru: 0,
    cozum: `
      <p><strong>Tuzak 1 — Hangi uzunluk?</strong> Telin boyu 80 cm ama alan bölgesinin
      genişliği yalnızca <strong>20 cm</strong>. Kuvvet, telin <em>yalnızca alan içinde
      kalan kısmına</em> etki eder:</p>
      <div class="formul" style="max-width:260px;margin:10px 0">
        <div class="fm">L = 0,20 m &nbsp;(0,80 değil)</div>
      </div>
      <p><strong>Tuzak 2 — Açıyı unutma.</strong> sin30° = 0,5</p>
      <p><strong>Hesap:</strong></p>
      <div class="formul" style="max-width:320px;margin:10px 0;border-top-color:var(--accent)">
        <div class="fm" style="color:var(--accent)">F = 0,5 · 6 · 0,20 · 0,5 = 0,3 N</div>
      </div>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>B şıkkı (1,2 N)</strong> telin tam boyunu (0,80 m)
        kullanıp açıyı da unutanlar için — iki hatayı birden yapanlar buraya düşer.
        <br><strong>C şıkkı (0,6 N)</strong> açıyı unutanlar için.
        <br><strong>D şıkkı (2,4 N)</strong> hem 0,80 m hem açısız.
        <br><strong>Not:</strong> Gerçekte tel eğik olduğu için alan içinde kalan
        <em>tel parçası</em> 20 cm&rsquo;den uzundur; ancak formüldeki L, alanın
        <strong>akım doğrultusundaki</strong> etkin uzunluğudur ve bölge genişliği
        üzerinden alınır. Sınav sorularında istenen budur.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: A</strong></p>`
  },
  {
    baslik: 'Raylı telin hızı',
    kaynak: 'Üç üniteyi birleştiren soru',
    govde: `
      <p>Sürtünmesiz iki iletken ray arasındaki uzaklık <strong>40 cm</strong>&rsquo;dir.
      Bölgede, sayfanın içine doğru <strong>B = 0,5 T</strong>&rsquo;lık düzgün manyetik alan
      vardır.</p>
      <p>Raylar üzerinde serbestçe kayabilen, kütlesi <strong>40 g</strong> olan bir telden
      <strong>6 A</strong> akım geçiriliyor.</p>
      <p>Tel <strong>durgun hâlden</strong> harekete başladığına göre, <strong>0,5 m</strong>
      yol aldığında hızı kaç m/s olur?</p>`,
    secenekler: [
      '5,5 m/s',
      '30 m/s',
      '15 m/s',
      '2,7 m/s',
      '7,7 m/s'
    ],
    dogru: 0,
    cozum: `
      <p><strong>Adım 1 — Kuvvet.</strong> Tel alana dik (α = 90°):</p>
      <p>F = B·i·L = 0,5 · 6 · 0,40 = <strong>1,2 N</strong></p>

      <p><strong>Adım 2 — İvme.</strong> 40 g = 0,040 kg:</p>
      <p>a = F/m = 1,2 / 0,040 = <strong>30 m/s²</strong></p>

      <p><strong>Adım 3 — Artık bu 1. ünite.</strong> Sabit kuvvet ⟹ sabit ivme.
      Süre verilmediği için <strong>zamansız formülü</strong> seç:</p>
      <div class="formul" style="max-width:280px;margin:10px 0">
        <div class="fm">ϑ² = ϑ₀² + 2·a·x</div>
      </div>
      <p>ϑ² = 0 + 2 · 30 · 0,5 = 30 &nbsp;⟹&nbsp; ϑ = √30 ≈ <strong>5,5 m/s</strong></p>

      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>B şıkkı (30)</strong> ivmeyi hız sanıyor — birim kontrolü
        bunu hemen yakalar: 30 m/s² bir <em>ivmedir</em>.
        <br><strong>Yöntem notu:</strong> Süre sorulmamış ve verilmemişse
        <code>ϑ² = ϑ₀² + 2ax</code> her zaman en kısa yoldur. 1. ünitedeki püf noktası
        burada da geçerli.
        <br><strong>Simülasyonda doğrula:</strong> İkinci düzeneği seç, aynı değerleri gir;
        tel 0,5 m yol aldığında duruyor ve hız okuması <strong>5,50 m/s</strong> gösteriyor.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: A</strong></p>`
  }
],

/* --------------------------------------------- Bağlam temelli sorular */
baglam: [
  {
    baslik: 'Kulaklığın içinde ne var?',
    govde: `
      <p>Kulaklığı söküp içine bakarsan üç şey görürsün: küçük bir <strong>kalıcı
      mıknatıs</strong>, ona geçirilmiş ince bir <strong>bobin</strong> ve bobine yapıştırılmış
      bir <strong>plastik zar</strong>.</p>
      <p>Telefondan gelen müzik sinyali, saniyede binlerce kez yön değiştiren bir
      <strong>elektrik akımıdır</strong>.</p>
      <p>Bir öğrenci soruyor: <em>“Mıknatıs sabit, bobin de yerinde duruyor. Ses nereden
      çıkıyor? Üstelik nasıl oluyor da hem bas hem tiz sesler aynı bobinden çıkabiliyor?”</em></p>
      <p><strong>Olayı F = B·i·L ile açıkla. Sesin tizliğini ve yüksekliğini akımın hangi
      özellikleri belirler?</strong></p>`,
    gorsel: `
      <svg viewBox="0 0 520 200" xmlns="http://www.w3.org/2000/svg" role="img"
           aria-label="Kulaklık içindeki kalıcı mıknatıs, bobin ve titreşen zar">
        <rect width="520" height="200" fill="#17223A"/>
        <rect x="70" y="52" width="40" height="96" rx="4" fill="#5F6B78"/>
        <rect x="70" y="52" width="40" height="22" fill="#E2483F"/>
        <rect x="70" y="126" width="40" height="22" fill="#2F6FD0"/>
        <text x="90" y="170" fill="#EAF0FA" font-size="11" font-family="system-ui" text-anchor="middle">mıknatıs</text>
        <g stroke="#B87333" stroke-width="4">
          <ellipse cx="140" cy="100" rx="6" ry="30" fill="none"/>
          <ellipse cx="152" cy="100" rx="6" ry="30" fill="none"/>
          <ellipse cx="164" cy="100" rx="6" ry="30" fill="none"/>
        </g>
        <text x="152" y="170" fill="#EAF0FA" font-size="11" font-family="system-ui" text-anchor="middle">bobin</text>
        <path d="M172 70 L240 44 L240 156 L172 130 Z" fill="rgba(200,180,150,.85)" stroke="#8A7B62" stroke-width="2"/>
        <text x="212" y="180" fill="#EAF0FA" font-size="11" font-family="system-ui" text-anchor="middle">zar</text>
        <g stroke="#35C08A" stroke-width="2" fill="none">
          <path d="M256 70 A 46 46 0 0 1 256 130"/>
          <path d="M278 56 A 66 66 0 0 1 278 144"/>
          <path d="M300 42 A 86 86 0 0 1 300 158"/>
        </g>
        <text x="330" y="104" fill="#35C08A" font-size="12" font-family="system-ui">ses dalgaları</text>
        <path d="M20 100 q 12 -20 24 0 q 12 20 24 0" stroke="#FFB020" stroke-width="2.4" fill="none"/>
        <text x="40" y="82" fill="#FFB020" font-size="11" font-family="system-ui" text-anchor="middle">i(t)</text>
      </svg>`,
    adimlar: [
      { bas: 'Yanlış varsayımı düzelt',
        metin: 'Bobin <strong>yerinde durmuyor</strong>. Manyetik alanın içinde akım taşıdığı için kuvvet görüyor ve hareket ediyor — hareket çok küçük olduğu için gözle fark edilmiyor.' },
      { bas: 'Kuvveti yaz',
        metin: 'F = B·i·L. Mıknatıs sabit olduğu için <strong>B sabit</strong>, bobin sabit olduğu için <strong>L sabit</strong>. Geriye tek değişken kalıyor: <strong>F ∝ i</strong>' },
      { bas: 'Akım yön değiştirince',
        metin: 'Akım ters yöne dönünce <strong>kuvvet de ters yöne</strong> döner. Bobin bir ileri bir geri gider. Zar da onunla birlikte havayı iter ve çeker.' },
      { bas: 'Tizliği belirle',
        metin: 'Akım saniyede kaç kez yön değiştiriyorsa zar da o kadar titreşir. Yani <strong>akımın frekansı = sesin frekansı</strong> = tizlik. 440 Hz’lik akım, 440 Hz’lik la notası verir.' },
      { bas: 'Yüksekliği belirle',
        metin: 'Akım büyükse kuvvet büyük olur, zar <strong>daha çok</strong> hareket eder, hava daha çok sıkışır. Yani <strong>akımın şiddeti = sesin yüksekliği</strong>. Ses düğmesi aslında akımı ayarlıyor.' },
      { bas: 'İki soruyu birleştir',
        metin: 'Bas ve tiz aynı bobinden çıkabilir çünkü ikisi de <em>aynı</em> akımın içinde, farklı frekanslarda üst üste biner. Bobin bu karmaşık akımın toplamını takip eder — tek bir zar, bütün bir orkestrayı üretebilir.' }
    ],
    secenekler: [
      'F = B·i·L ile bobin hareket eder; frekans tizliği, akım şiddeti ses yüksekliğini belirler',
      'Mıknatıs titreşerek ses üretir; bobinin görevi yalnızca akımı taşımaktır',
      'Zar ısınıp genleşerek havayı iter; frekans sıcaklıkla belirlenir',
      'Ses, akımın telde ürettiği manyetik alandan doğar; bobin hareket etmez',
      'Bobin sabittir; ses tamamen elektroniksel olarak üretilip zara aktarılır'
    ],
    dogru: 0,
    cozum: `
      <p>Kulaklık bir <strong>F = B·i·L makinesidir</strong>: elektrik sinyalini mekanik
      titreşime, o da ses dalgasına dönüşür.</p>
      <div class="formul" style="max-width:360px;margin:10px 0;border-top-color:var(--accent)">
        <div class="fm" style="color:var(--accent)">akımın frekansı → tizlik &nbsp;·&nbsp; akımın şiddeti → yükseklik</div>
      </div>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>D şıkkı</strong> iki konuyu karıştırıyor: akım gerçekten
        kendi alanını üretir (2.2.2), ama buradaki hareketi sağlayan o değil,
        <em>kalıcı mıknatısın alanının bobine uyguladığı kuvvettir</em>.
        <br><strong>Tersine çalıştırırsan mikrofon olur:</strong> Zarı ses dalgasıyla
        titreştirirsen bobin mıknatısın alanında hareket eder ve <strong>akım üretir</strong>.
        Bunun nasıl olduğunu 2.3.2&rsquo;de (indüksiyon) göreceksin. Aynı düzenek,
        iki yönde çalışıyor.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: A</strong></p>`
  },
  {
    baslik: 'Analog ampermetrenin ibresi',
    govde: `
      <p>Dijital ekranlardan önce bütün ölçü aletleri <strong>ibreliydi</strong>. Bir analog
      ampermetrenin içinde şunlar vardır: bir <strong>kalıcı mıknatıs</strong>, mıknatısın
      boşluğunda dönebilen bir <strong>bobin</strong>, bobine bağlı bir <strong>ibre</strong>
      ve ibreyi sıfıra çeken bir <strong>yay</strong>.</p>
      <p>Ölçülecek akım bobinden geçer. Bobin döner, ibre sapar, yay onu geri çeker. İbre,
      <strong>iki etkinin dengelendiği</strong> yerde durur.</p>
      <p><strong>İbrenin sapması neden akımla orantılıdır? Ölçeğin eşit aralıklı olabilmesi
      için ne gerekir? Aletin yönü ters bağlanırsa ne olur?</strong></p>`,
    gorsel: `
      <svg viewBox="0 0 520 200" xmlns="http://www.w3.org/2000/svg" role="img"
           aria-label="Analog ampermetrede mıknatıs, dönen bobin, ibre ve yay">
        <rect width="520" height="200" fill="#17223A"/>
        <path d="M110 170 A 140 140 0 0 1 410 170" fill="none" stroke="#2E3D57" stroke-width="2"/>
        <g stroke="#6F84A8" stroke-width="2">
          <path d="M120 162 L128 152"/><path d="M180 124 L186 134"/>
          <path d="M260 110 L260 122"/><path d="M340 124 L334 134"/>
          <path d="M400 162 L392 152"/>
        </g>
        <g fill="#8FB6EC" font-size="11" font-family="system-ui" text-anchor="middle">
          <text x="120" y="186">0</text><text x="186" y="118">1</text>
          <text x="260" y="104">2</text><text x="334" y="118">3</text><text x="400" y="186">4</text>
        </g>
        <path d="M260 170 L206 122" stroke="#E2483F" stroke-width="4" stroke-linecap="round"/>
        <circle cx="260" cy="170" r="7" fill="#9AA5B1"/>
        <rect x="222" y="140" width="24" height="26" rx="3" fill="#5F6B78"/>
        <rect x="274" y="140" width="24" height="26" rx="3" fill="#5F6B78"/>
        <text x="60" y="60" fill="#EAF0FA" font-size="12" font-family="system-ui">bobin dönünce</text>
        <text x="60" y="78" fill="#EAF0FA" font-size="12" font-family="system-ui">ibre sapar</text>
        <text x="420" y="60" fill="#FFB020" font-size="12" font-family="system-ui">yay geri çeker</text>
      </svg>`,
    adimlar: [
      { bas: 'Döndüren etkiyi yaz',
        metin: 'Bobin manyetik alanda akım taşıyor ⟹ <strong>F = B·i·L</strong> kuvveti etkir. B ve L sabit olduğu için döndüren etki <strong>akımla doğru orantılıdır</strong>.' },
      { bas: 'Geri çeken etkiyi yaz',
        metin: 'Yayın geri çekme etkisi, <strong>sapma açısıyla orantılıdır</strong> (yay ne kadar bükülürse o kadar çok geri çeker).' },
      { bas: 'Dengeyi kur',
        metin: 'İbre, ikisinin eşitlendiği yerde durur:<br><strong>(akımla orantılı etki) = (açıyla orantılı etki)</strong><br>⟹ <strong>açı ∝ akım</strong>' },
      { bas: 'Eşit aralıklı ölçek koşulu',
        metin: 'Açı akımla <em>doğru</em> orantılı olduğu için ölçek eşit aralıklı olabilir. Ama bu ancak bobin döndüğü her konumda <strong>B’nin aynı kalması</strong> hâlinde geçerlidir. Bu yüzden mıknatısın kutupları <strong>silindirik oyuklu</strong> yapılır — bobin nereye dönerse dönsün alanı aynı görsün diye.' },
      { bas: 'Ters bağlarsan',
        metin: 'Akım ters yönde geçer ⟹ kuvvet ters yöne döner ⟹ ibre <strong>sıfırın soluna</strong>, yani ölçeğin dışına vurur. Bu yüzden analog aletlerde <strong>+ ve − uçlara dikkat edilir</strong>; dijital aletler ise eksi işaretiyle gösterir.' }
    ],
    secenekler: [
      'Döndüren etki akımla, geri çeken yay etkisi açıyla orantılı olduğu için açı ∝ akım; eşit ölçek için B her konumda aynı olmalı; ters bağlanırsa ibre ters yöne vurur',
      'İbre akımın karesiyle sapar; bu yüzden ölçek eşit aralıklı olamaz',
      'Sapmayı bobinin ısınması sağlar; ters bağlamanın etkisi olmaz',
      'İbre yalnızca yay tarafından hareket ettirilir; akımın rolü yoktur',
      'Sapma akımın frekansına bağlıdır; doğru akımda ibre sapmaz'
    ],
    dogru: 0,
    cozum: `
      <p><strong>Döndüren etki ∝ i</strong> (F = BiL) &nbsp;·&nbsp;
      <strong>geri çeken etki ∝ açı</strong> (yay) &nbsp;⟹&nbsp;
      <strong>açı ∝ i</strong></p>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>Tasarım ayrıntısı:</strong> Eşit aralıklı ölçek
        kendiliğinden gelmez. Bobin dönerken alanı değişseydi sapma akımla orantılı
        olmaz, ölçek sıkışık ve seyrek bölgeler içerirdi. Mühendisler bu yüzden kutupları
        oyuk yapıp bobinin her açıda aynı B&rsquo;yi görmesini sağlar —
        <strong>fizik bilgisi doğrudan tasarıma dönüşür</strong>.
        <br><strong>E şıkkı</strong> ilginç bir noktaya değiniyor: bu tip aletler
        <em>alternatif akımda</em> gerçekten düzgün çalışmaz, çünkü kuvvet sürekli yön
        değiştirir ve ibre titrer. AC ölçmek için doğrultucu eklenir ya da farklı tip
        alet kullanılır. Ama doğru akımda ibre gayet güzel sapar.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: A</strong></p>`
  }
]

});
})();
