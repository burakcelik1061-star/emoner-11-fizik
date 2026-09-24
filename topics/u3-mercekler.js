(function () {
"use strict";
const F = window.F11;

/* ==========================================================================
   topics/u3-mercekler.js
   Konu 3.8.1 · Merceklerin özellikleri  (MEB 11, s.373-380)
   ========================================================================== */

F.konuKaydet('u3-mercekler', {

ozet: `Mercek, iki yüzeyi de eğri olan saydam bir cisimdir. Aynadan tek farkı, ışığı
<strong>yansıtmak yerine kırmasıdır</strong> — ama sonuç şaşırtıcı derecede benzer: ince
kenarlı mercek ışığı toplar (çukur ayna gibi), kalın kenarlı mercek dağıtır (tümsek ayna
gibi). Gözlüğün, kameranın, mikroskobun ve gözünün temeli budur.`,

/* ------------------------------------------------------------- Kavram */
kavram: `
<h3>İki tür mercek</h3>
<table class="degisken-tablo">
  <thead><tr><th>Tür</th><th>Biçim</th><th>Işığa etkisi</th><th>f</th><th>Diğer adı</th></tr></thead>
  <tbody>
    <tr><td><strong>İnce kenarlı</strong></td><td>ortası kalın</td><td><strong>toplar</strong></td><td>f &gt; 0</td><td>yakınsak, dışbükey</td></tr>
    <tr><td><strong>Kalın kenarlı</strong></td><td>ortası ince</td><td><strong>dağıtır</strong></td><td>f &lt; 0</td><td>ıraksak, içbükey</td></tr>
  </tbody>
</table>
<p style="margin-top:10px;color:var(--text-2)">Adı kenarına göre verilir: “ince kenarlı”
merceğin <em>kenarı</em> incedir, ortası kalındır. Karıştırmamak için biçimine bak —
ortası şişkinse toplar.</p>

<h3 style="margin-top:22px">Merceğin iki odağı vardır</h3>
<p>Aynada tek odak vardı; mercekte <strong>iki</strong> vardır ve merkeze
<strong>eşit uzaklıktadırlar</strong>. Sebebi basit: ışık merceğin iki yüzünden de
girebilir ve mercek her iki yönde aynı davranır.</p>
<ul>
  <li><strong>F</strong> — ışığın çıktığı taraftaki odak (görüntü odağı)</li>
  <li><strong>F′</strong> — ışığın geldiği taraftaki odak (cisim odağı)</li>
</ul>

<h3 style="margin-top:22px">Mercek yapıcı denklemi</h3>
<p>Bir merceğin odak uzaklığı üç şeye bağlıdır: camın <strong>indisi</strong> ve iki
yüzeyin <strong>eğrilik yarıçapları</strong>.</p>
<div class="formul" style="max-width:340px;margin:14px 0;border-top-color:var(--accent)">
  <div class="fm" style="color:var(--accent)">1/f = (n − 1)·(1/R₁ − 1/R₂)</div>
</div>
<table class="degisken-tablo">
  <thead><tr><th>Durum</th><th>İşaret</th></tr></thead>
  <tbody>
    <tr><td>Eğrilik merkezi merceğin <strong>arkasında</strong> (sağda)</td><td>R &gt; 0</td></tr>
    <tr><td>Eğrilik merkezi merceğin <strong>önünde</strong> (solda)</td><td>R &lt; 0</td></tr>
    <tr><td>Yüzey <strong>düz</strong></td><td>R = ∞ ⟹ 1/R = 0</td></tr>
  </tbody>
</table>
<p style="margin-top:10px">İki yüzü de dışbükey bir mercekte <code>R₁ &gt; 0</code> ve
<code>R₂ &lt; 0</code> olur; bu yüzden iki terim <strong>toplanır</strong> ve mercek güçlü
bir toplayıcı olur.</p>

<table class="degisken-tablo" style="margin-top:12px">
  <thead><tr><th>Mercek (n = 1,5)</th><th>R₁</th><th>R₂</th><th>f</th><th>D</th></tr></thead>
  <tbody>
    <tr><td>Çift dışbükey</td><td>+20</td><td>−20</td><td>+20 cm</td><td>+5,0</td></tr>
    <tr><td>Düzlem–dışbükey</td><td>+20</td><td>düz</td><td>+40 cm</td><td>+2,5</td></tr>
    <tr><td>Çift içbükey</td><td>−20</td><td>+20</td><td>−20 cm</td><td>−5,0</td></tr>
    <tr><td>Daha bükey</td><td>+10</td><td>−10</td><td>+10 cm</td><td>+10,0</td></tr>
  </tbody>
</table>

<div class="kutu puf" style="margin:16px 0">
  <div class="kutu-bas"><span class="ikon">👓</span><span>Dioptri = gözlük numarası</span></div>
  <div class="formul" style="max-width:240px;margin:10px 0">
    <div class="fm">D = 1/f &nbsp;&nbsp;(f METRE)</div>
  </div>
  <p style="margin:0"><strong>+2 numara</strong> gözlük = odak uzaklığı
  <code>1/2 = 0,50 m = 50 cm</code> olan <strong>ince kenarlı</strong> mercek
  (hipermetrop düzeltmesi).<br>
  <strong>−3 numara</strong> = odak uzaklığı <code>−0,33 m</code> olan
  <strong>kalın kenarlı</strong> mercek (miyop düzeltmesi).</p>
  <p style="margin:8px 0 0">Numaranın işareti merceğin türünü, büyüklüğü ise gücünü
  söyler. Büyük numara = kısa odak = güçlü mercek.</p>
</div>

<h3 style="margin-top:22px">Mercek sistemleri</h3>
<p>Birbirine değen ince mercekler için <strong>dioptriler toplanır</strong>:</p>
<div class="formul" style="max-width:300px;margin:14px 0">
  <div class="fm">D = D₁ + D₂ &nbsp;&nbsp;⟺&nbsp;&nbsp; 1/f = 1/f₁ + 1/f₂</div>
</div>
<p>Dioptri biriminin icat sebebi tam da budur: odak uzaklıkları toplanmaz ama
<strong>dioptriler toplanır</strong>. Optikçinin işi böylece basit toplama işlemine iner.</p>

<h3 style="margin-top:22px">Üç özel ışın</h3>
<table class="degisken-tablo">
  <thead><tr><th>#</th><th>Nasıl gelir</th><th>Nasıl çıkar</th></tr></thead>
  <tbody>
    <tr><td class="sembol">1</td><td>eksene <strong>paralel</strong></td><td><strong>odaktan</strong> geçerek</td></tr>
    <tr><td class="sembol">2</td><td><strong>merkezden</strong> (O)</td><td><strong>sapmadan</strong> devam eder</td></tr>
    <tr><td class="sembol">3</td><td><strong>ön odaktan</strong> geçerek</td><td>eksene <strong>paralel</strong></td></tr>
  </tbody>
</table>
<p style="margin-top:10px"><strong>2. ışın neden sapmaz?</strong> Merceğin tam ortasında iki
yüzey birbirine <strong>paraleldir</strong>. Yani orası ince bir cam levha gibi davranır —
3.6&rsquo;da gördüğümüz gibi levhadan geçen ışın <strong>sapmaz</strong>, yalnızca kayar.
Mercek ince kabul edildiği için kayma da ihmal edilir.</p>`,

/* ---------------------------------------------------------- Formüller */
formuller: {
  liste: [
    { fm: '1/f = (n−1)(1/R₁ − 1/R₂)', aciklama: 'Mercek yapıcı denklemi' },
    { fm: 'D = 1/f',                  aciklama: 'Dioptri (f metre cinsinden)' },
    { fm: 'D = D₁ + D₂',              aciklama: 'Değen mercekler' },
    { fm: 'f > 0 · ince kenarlı',     aciklama: 'Toplayıcı, odak gerçek' },
    { fm: 'f < 0 · kalın kenarlı',    aciklama: 'Dağıtıcı, odak sanal' }
  ],
  degiskenler: [
    { sembol: 'f',  ad: 'Odak uzaklığı',     birim: 'cm veya m' },
    { sembol: 'n',  ad: 'Cam indisi',        birim: '—' },
    { sembol: 'R₁', ad: '1. yüzeyin yarıçapı', birim: 'cm' },
    { sembol: 'R₂', ad: '2. yüzeyin yarıçapı', birim: 'cm' },
    { sembol: 'D',  ad: 'Dioptri',           birim: '1/m' }
  ]
},

/* ------------------------------------------------------------ Türetim */
turetim: {
  yollar: [
    {
      ad: 'Mercek neden ışığı topluyor?',
      adimlar: [
        { baslik: 'Merceği prizmalara böl',
          html: `<p>İnce kenarlı bir merceği düşey olarak dilimlere ayır. Her dilim, küçük
                 bir <strong>prizmaya</strong> benzer — ve prizmalar tabanlarına doğru saptırır.</p>` },

        { baslik: 'Prizmaların yönüne bak',
          html: `<p>Merceğin <strong>üst</strong> yarısındaki dilimlerin tabanı
                 <strong>aşağıya</strong>, <strong>alt</strong> yarısındakilerin tabanı
                 <strong>yukarıya</strong> bakar.</p>` },

        { baslik: 'Hepsi eksene doğru sapar',
          html: `<p>Prizma tabana doğru saptırdığı için, üstteki ışınlar <strong>aşağı</strong>,
                 alttakiler <strong>yukarı</strong> saptırılır. Yani hepsi
                 <strong>eksene doğru</strong> toplanır.</p>` },

        { baslik: 'Neden tek noktada?',
          html: `<p>Kenara gidildikçe dilimlerin tepe açısı büyür ⟹ sapma da büyür. Eğrilik
                 doğru seçilirse tam da bu artış, uzak ışınları aynı noktaya getirir.</p>
                 <p>Kalın kenarlı mercekte prizmaların tabanları <strong>dışarı</strong>
                 baktığı için ışınlar eksenden uzaklaşır — mercek dağıtır.</p>` },

        { baslik: 'Küresel sapma burada da var',
          html: `<p>3.3&rsquo;teki gibi, küresel yüzeyli merceklerde kenar ışınlar tam olarak
                 odakta buluşmaz. Fotoğraf objektiflerinde bu yüzden <strong>birden çok
                 mercek</strong> kullanılır; her biri diğerinin kusurunu düzeltir.</p>` }
      ]
    },
    {
      ad: 'Dioptriler neden toplanıyor?',
      adimlar: [
        { baslik: 'Birinci mercekten çıkanı izle',
          html: `<p>Sonsuzdan gelen paralel ışın, birinci mercekten sonra
                 <code>f₁</code> uzaklıktaki noktaya doğru yönelir.</p>` },

        { baslik: 'İkinci mercek için bu bir cisim',
          html: `<p>Mercekler birbirine değdiği için, ikinci mercek bu noktayı
                 <strong>sanal cisim</strong> olarak görür: <code>a₂ = −f₁</code>.</p>` },

        { baslik: 'Mercek denklemini uygula',
          html: `<div class="formul" style="max-width:300px">
                   <div class="fm">1/f₂ = 1/a₂ + 1/b = −1/f₁ + 1/b</div>
                 </div>` },

        { baslik: 'b’yi çek',
          html: `<div class="formul" style="max-width:260px">
                   <div class="fm">1/b = 1/f₁ + 1/f₂</div>
                 </div>
                 <p>Sonsuzdan gelen paralel ışının toplandığı yer, sistemin
                 <strong>odağıdır</strong>: <code>b = f_sistem</code>.</p>` },

        { baslik: 'Sonuç',
          html: `<div class="formul" style="max-width:280px;border-top-color:var(--accent)">
                   <div class="fm" style="color:var(--accent)">1/f = 1/f₁ + 1/f₂ ⟺ D = D₁ + D₂</div>
                 </div>
                 <p>Örnek: +5 D ile −2 D değen mercekler ⟹ D = +3 D ⟹
                 <code>f = 100/3 = 33,3 cm</code>.</p>` }
      ]
    },
    {
      ad: 'Yapıcı denklem nasıl okunur?',
      adimlar: [
        { baslik: 'n − 1 çarpanı',
          html: `<p>Mercek havadayken <code>n − 1</code> çarpanı, camın havadan ne kadar
                 farklı olduğunu ölçer. n = 1 olsaydı (cam yok gibi) <code>1/f = 0</code>,
                 yani mercek hiç kırmazdı.</p>` },

        { baslik: 'Su altındaki mercek',
          html: `<p>Mercek suya batırılırsa formüldeki 1 yerine suyun indisi gelir:</p>
                 <div class="formul" style="max-width:340px">
                   <div class="fm">1/f = (n<sub>cam</sub>/n<sub>su</sub> − 1)(1/R₁ − 1/R₂)</div>
                 </div>
                 <p>n_cam = 1,5 ve n_su = 1,33 için çarpan <code>0,128</code>&rsquo;e düşer;
                 aynı mercek suda yaklaşık <strong>4 kat zayıf</strong> olur. Suyun altında
                 net göremememizin sebebi tam olarak budur — gözümüzün merceği suda işini
                 yapamaz.</p>` },

        { baslik: 'Dalış maskesi neden işe yarıyor?',
          html: `<p>Maske, gözle su arasına bir <strong>hava</strong> tabakası koyar. Böylece
                 göz yine havaya bakar ve merceği normal gücünde çalışır.</p>` },

        { baslik: 'R’ler ne söylüyor?',
          html: `<p>R küçük ⟹ yüzey daha bükey ⟹ <code>1/R</code> büyük ⟹ f küçük ⟹ mercek
                 güçlü. Kalın camlı gözlüklerin yüzeyi bu yüzden daha bükeydir.</p>
                 <p>Yüksek indisli cam kullanılırsa aynı güç daha <strong>düz</strong> bir
                 yüzeyle elde edilir; “inceltilmiş cam” denilen gözlükler böyle yapılır.</p>` }
      ]
    }
  ]
},

/* -------------------------------------------------------- Simülasyon */
sim: F.simler['mercekler'],

/* ------------------------------------------------------- Püf noktası */
puf: {
  html: `
    <p><strong>1 · Adına değil biçimine bak.</strong> “İnce kenarlı” merceğin
    <em>ortası kalındır</em> ve ışığı <strong>toplar</strong>. Bu ikisini karıştırmak
    bütün soruyu ters çevirir.</p>

    <p><strong>2 · f &gt; 0 toplar, f &lt; 0 dağıtır.</strong> Aynadaki kuralın aynısı;
    formülleri iki kez öğrenmene gerek yok.</p>

    <p><strong>3 · Dioptride f METRE olmalı.</strong> f = 25 cm ⟹ D = 1/0,25 = 4 D.
    Santimetreyle bölersen 100 kat hata yaparsın. Kısayol: <code>D = 100/f(cm)</code>.</p>

    <p><strong>4 · Dioptriler toplanır, odak uzaklıkları toplanmaz.</strong>
    20 cm + 20 cm mercekler 40 cm değil, <strong>10 cm</strong> odaklı bir sistem verir
    (5 + 5 = 10 D).</p>

    <p><strong>5 · Yapıcı denklemde işaretler.</strong> Çift dışbükeyde R₁ &gt; 0 ve
    R₂ &lt; 0&rsquo;dır; <code>1/R₁ − 1/R₂</code> ifadesinde iki eksi çarpılıp
    <strong>toplama</strong> olur. İşareti unutmak f&rsquo;yi sıfır çıkarır.</p>

    <p><strong>6 · Merkezden geçen ışın sapmaz.</strong> Bunu bilirsen görüntü çizimi
    kolaylaşır; genelde 1. ve 2. ışın yeterlidir.</p>

    <p><strong>7 · Mercekte iki odak var.</strong> “Merceğin odağı” denince hangisi
    olduğunu soruya bakarak anla; ikisi de merkeze eşit uzaklıktadır.</p>

    <p><strong>8 · Mercek suya batırılırsa zayıflar.</strong> “Mercek suda daha güçlü olur”
    diyen şık yanlıştır. Ortam ile cam arasındaki fark azaldıkça mercek zayıflar.</p>

    <p><strong>9 · Mercekte görüntü cismin ÖTE tarafında oluşur</strong> (gerçekse), aynada
    ise cismin tarafında. Işık mercekte <em>geçer</em>, aynada <em>döner</em>.</p>`
},

/* ----------------------------------------------------- Zorlayıcı sorular */
osym: [
  {
    baslik: 'Yapıcı denklem ve dioptri',
    kaynak: 'Çok adımlı',
    govde: `
      <p>Kırılma indisi <strong>1,60</strong> olan camdan, iki yüzü de dışbükey bir mercek
      yapılıyor. Yüzeylerin eğrilik yarıçapları <strong>12 cm</strong> ve
      <strong>24 cm</strong>&rsquo;dir.</p>
      <p>Buna göre merceğin <strong>odak uzaklığı</strong> ve <strong>dioptrisi</strong>
      kaçtır?</p>`,
    gorsel: `
      <svg viewBox="0 0 520 200" xmlns="http://www.w3.org/2000/svg" role="img"
           aria-label="İki yüzü dışbükey merceğin eğrilik yarıçapları ve odak noktası">
        <rect width="520" height="200" fill="#0E1726"/>
        <path d="M30 100 H500" stroke="#4A5F86" stroke-width="1.4" stroke-dasharray="7 5"/>
        <path d="M250 28 Q 288 100 250 172 Q 212 100 250 28 Z"
              fill="rgba(127,212,230,.22)" stroke="#7FD4E6" stroke-width="2.4"/>
        <text x="250" y="20" fill="#7FD4E6" font-size="11" font-family="system-ui" text-anchor="middle">n = 1,60</text>
        <text x="180" y="60" fill="#FFB020" font-size="11" font-family="system-ui" text-anchor="end">R₁ = +12 cm</text>
        <text x="320" y="60" fill="#FF6B6B" font-size="11" font-family="system-ui">R₂ = −24 cm</text>
        <path d="M40 60 H236 M40 100 H236 M40 140 H236" stroke="#FFB020" stroke-width="1.8"/>
        <path d="M264 60 L400 100 M264 100 L400 100 M264 140 L400 100" stroke="#FFB020" stroke-width="1.8"/>
        <circle cx="400" cy="100" r="4" fill="#35C08A"/>
        <text x="400" y="88" fill="#35C08A" font-size="12" font-family="system-ui" text-anchor="middle" font-weight="700">F</text>
        <text x="330" y="180" fill="#35C08A" font-size="11" font-family="system-ui" text-anchor="middle">f = ?</text>
      </svg>`,
    secenekler: [
      'f = 13,33 cm · D = +7,5',
      'f = 8 cm · D = +12,5',
      'f = 20 cm · D = +5,0',
      'f = 13,33 cm · D = +0,075',
      'f = 26,67 cm · D = +3,75'
    ],
    dogru: 0,
    cozum: `
      <p><strong>1. İşaretleri belirle.</strong> Işık soldan gelir. İki yüzü de dışbükey bir
      mercekte:</p>
      <div class="formul" style="max-width:300px;margin:10px 0">
        <div class="fm">R₁ = +12 cm &nbsp;·&nbsp; R₂ = −24 cm</div>
      </div>

      <p><strong>2. Yapıcı denkleme koy.</strong></p>
      <div class="formul" style="max-width:420px;margin:10px 0">
        <div class="fm">1/f = (1,60 − 1)·(1/12 − 1/(−24)) = 0,60·(1/12 + 1/24)</div>
      </div>
      <div class="formul" style="max-width:380px;margin:10px 0">
        <div class="fm">1/12 + 1/24 = 2/24 + 1/24 = 3/24 = 0,125</div>
      </div>
      <div class="formul" style="max-width:340px;margin:10px 0">
        <div class="fm">1/f = 0,60 × 0,125 = 0,075 &nbsp;(1/cm)</div>
      </div>
      <div class="formul" style="max-width:300px;margin:10px 0;border-top-color:var(--accent)">
        <div class="fm" style="color:var(--accent)">f = 1/0,075 = <strong>13,33 cm</strong></div>
      </div>

      <p><strong>3. Dioptri — f METRE olmalı.</strong></p>
      <div class="formul" style="max-width:340px;margin:10px 0">
        <div class="fm">D = 1/0,1333 m = <strong>+7,5 dioptri</strong></div>
      </div>

      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>D şıkkı</strong> bu sorunun asıl tuzağı: <code>1/f =
        0,075</code> ara sonucunu dioptri sanıyor. Ama o değer <strong>1/cm</strong>
        birimindedir; dioptri <strong>1/m</strong>&rsquo;dir. Aradaki çarpan
        <strong>100</strong>&rsquo;dür.
        <br><strong>B şıkkı</strong> R₂&rsquo;yi de pozitif alıyor:
        <code>0,6·(1/12 − 1/24) = 0,025 ⟹ f = 40</code> — bu da tutmuyor; B aslında
        yarıçapları toplayanların bulduğu değer.
        <br><strong>Hızlı kontrol:</strong> <code>D = 100/f(cm) = 100/13,33 = 7,5</code> ✓
        Bu kısayolu kullanırsan birim hatası yapmazsın.
        <br><strong>Simülasyonda:</strong> 2. düzenekte n = 1,60, R₁ = 12, R₂ = −24 yap;
        okumalarda 13,33 cm ve 7,5 D göreceksin.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: A</strong></p>`
  },
  {
    baslik: 'Mercek yargıları',
    kaynak: 'Kavram',
    govde: `
      <p>Merceklerle ilgili aşağıdaki yargıları inceleyiniz:</p>
      <ol style="margin-left:.2em">
        <li>Odak uzaklıkları 20 cm ve 20 cm olan iki ince kenarlı mercek birbirine
        değdirilirse sistemin odak uzaklığı 40 cm olur.</li>
        <li>Merceğin merkezinden geçen ışın sapmaz, çünkü orada iki yüzey birbirine
        paraleldir.</li>
        <li>Aynı mercek suya batırılırsa odak uzaklığı büyür.</li>
        <li>Kalın kenarlı merceğin dioptrisi negatiftir.</li>
      </ol>
      <p>Hangileri <strong>doğrudur</strong>?</p>`,
    secenekler: [
      'II, III ve IV',
      'I, II ve IV',
      'Yalnız II',
      'II ve IV',
      'Hepsi'
    ],
    dogru: 0,
    cozum: `
      <ol>
        <li><strong>Yanlış.</strong> Odak uzaklıkları toplanmaz, <strong>dioptriler</strong>
        toplanır:
        <code>D = 5 + 5 = 10 D ⟹ f = 100/10 = <strong>10 cm</strong></code>.
        Sistem tek merceğin <em>iki katı güçlü</em> olur, yarısı değil.</li>
        <li><strong>Doğru.</strong> Merkezde yüzeyler paralel olduğu için orası ince bir
        levha gibidir; levhadan geçen ışın sapmaz (3.5).</li>
        <li><strong>Doğru.</strong> Yapıcı denklemdeki çarpan <code>(n_cam/n_ortam − 1)</code>
        olur. Havada <code>1,5 − 1 = 0,5</code>, suda <code>1,5/1,33 − 1 = 0,128</code>.
        Çarpan küçüldüğü için <strong>f büyür</strong> — mercek zayıflar.</li>
        <li><strong>Doğru.</strong> <code>f &lt; 0 ⟹ D = 1/f &lt; 0</code>. Miyop
        gözlüklerinin numarası bu yüzden eksilidir.</li>
      </ol>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>I. yargı</strong> en sık yapılan hata. “Uzaklıklar
        toplanır” refleksi direnç ve kondansatör konularından gelir ama burada geçerli
        değil. Dioptri birimi tam olarak bu toplamayı kolaylaştırmak için icat edilmiştir.
        <br><strong>III. yargının sonucu:</strong> Gözünün merceği de suda zayıflar; bu
        yüzden su altında çıplak gözle bulanık görürüz. Dalış maskesi gözle su arasına
        <strong>hava</strong> koyarak merceğin gücünü geri verir.
        <br><strong>Sayısal his:</strong> 0,5 / 0,128 ≈ <strong>3,9</strong> ⟹ mercek suda
        yaklaşık <strong>4 kat</strong> zayıflar. Bu yüzden 20 cm odaklı bir mercek suda
        yaklaşık 78 cm odaklı hâle gelir.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: A</strong></p>`
  }
],

/* --------------------------------------------- Bağlam temelli sorular */
baglam: [
  {
    baslik: 'Gözlük numarası ne anlama geliyor?',
    govde: `
      <p>Bir öğrencinin gözlük reçetesinde <strong>−2,50</strong> yazıyor. Arkadaşınınkinde
      ise <strong>+1,75</strong>.</p>
      <p>Optikçi, iki numarayı aynı çerçeveye takmak için mercekleri arka arkaya
      değdirerek deniyor.</p>
      <p><strong>Her iki merceğin türünü ve odak uzaklığını bul. İkisi birlikte
      kullanılırsa ortaya çıkan sistemin numarası ve odak uzaklığı ne olur?</strong></p>`,
    gorsel: `
      <svg viewBox="0 0 520 200" xmlns="http://www.w3.org/2000/svg" role="img"
           aria-label="Eksi ve artı numaralı gözlük camlarının biçimi ve birleştirilmesi">
        <rect width="520" height="200" fill="#17223A"/>
        <text x="110" y="28" fill="#FF6B6B" font-size="12" font-family="system-ui" text-anchor="middle" font-weight="700">−2,50 · miyop</text>
        <path d="M92 52 Q 110 100 92 148 L128 148 Q 110 100 128 52 Z"
              fill="rgba(127,212,230,.20)" stroke="#7FD4E6" stroke-width="2.2"/>
        <text x="110" y="174" fill="#FF6B6B" font-size="11" font-family="system-ui" text-anchor="middle">kalın kenarlı · f = −40 cm</text>
        <text x="300" y="28" fill="#35C08A" font-size="12" font-family="system-ui" text-anchor="middle" font-weight="700">+1,75 · hipermetrop</text>
        <path d="M300 52 Q 326 100 300 148 Q 274 100 300 52 Z"
              fill="rgba(127,212,230,.20)" stroke="#7FD4E6" stroke-width="2.2"/>
        <text x="300" y="174" fill="#35C08A" font-size="11" font-family="system-ui" text-anchor="middle">ince kenarlı · f = 57,1 cm</text>
        <text x="380" y="100" fill="#EAF0FA" font-size="20" font-family="system-ui" text-anchor="middle">=</text>
        <text x="452" y="94" fill="#FFB020" font-size="13" font-family="system-ui" text-anchor="middle" font-weight="700">−0,75 D</text>
        <text x="452" y="114" fill="#FFB020" font-size="12" font-family="system-ui" text-anchor="middle">f = −133 cm</text>
      </svg>`,
    adimlar: [
      { bas: '−2,50 numara nedir?',
        metin: 'Negatif dioptri ⟹ <strong>kalın kenarlı</strong> (ıraksak) mercek. <code>f = 1/(−2,50) = <strong>−0,40 m = −40 cm</strong></code>. Miyopluk düzeltmesidir: göz çok güçlü odakladığı için önüne zayıflatıcı bir mercek konur.' },
      { bas: '+1,75 numara nedir?',
        metin: 'Pozitif dioptri ⟹ <strong>ince kenarlı</strong> (yakınsak) mercek. <code>f = 1/1,75 = <strong>0,571 m = 57,1 cm</strong></code>. Hipermetrop düzeltmesidir.' },
      { bas: 'İkisi birleşirse',
        metin: 'Değen mercekler için dioptriler <strong>toplanır</strong>: <code>D = −2,50 + 1,75 = <strong>−0,75 D</strong></code>' },
      { bas: 'Sistemin odak uzaklığı',
        metin: '<code>f = 1/(−0,75) = <strong>−1,33 m = −133 cm</strong></code>. Sistem hâlâ <strong>kalın kenarlı</strong> davranır ama çok daha zayıftır.' },
      { bas: 'Odak uzaklıklarını toplasaydık?',
        metin: '<code>−40 + 57,1 = 17,1 cm</code> çıkardı — <strong>tamamen yanlış</strong>, hem işaret hem büyüklük tutmaz. Odak uzaklıkları toplanmaz.' },
      { bas: 'Pratikte ne işe yarar?',
        metin: 'Optikçiler numara değişikliğini bu toplamayla hesaplar. Ayrıca <strong>deneme çerçevelerinde</strong> küçük mercekler üst üste takılarak istenen numara elde edilir — her eklenen cam, dioptriyi toplar.' },
      { bas: 'Kontakt lens farkı',
        metin: 'Kontakt lens göze <em>değdiği</em> için, aynı düzeltme biraz farklı numara gerektirir. Yüksek numaralarda gözlük ile lens numarası 0,25–0,50 D ayrışır; sebebi merceğin gözden uzaklığıdır.' }
    ],
    secenekler: [
      '−2,50 kalın kenarlı (f = −40 cm), +1,75 ince kenarlı (f = 57,1 cm); birlikte −0,75 D ve f = −133 cm',
      '−2,50 ince kenarlı, +1,75 kalın kenarlı; birlikte +4,25 D',
      'Birlikte kullanılamaz, mercekler birbirini yok eder',
      'Birlikte f = 17,1 cm olur',
      'İkisi de ince kenarlıdır, yalnızca kalınlıkları farklıdır'
    ],
    dogru: 0,
    cozum: `
      <div class="formul" style="max-width:340px;margin:10px 0;border-top-color:var(--accent)">
        <div class="fm" style="color:var(--accent)">D = −2,50 + 1,75 = −0,75 ⟹ f = −1,33 m</div>
      </div>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>D şıkkı</strong> odak uzaklıklarını topluyor — bu
        konunun en önemli uyarısı.
        <br><strong>C şıkkı</strong> yanlış: mercekler birbirini yok etmez, dioptrileri
        toplanır. Tam olarak yok olmaları için numaraların birbirinin <em>tersi</em> olması
        gerekirdi (−2,50 ve +2,50), o zaman D = 0 ⟹ düz cam gibi davranırdı.
        <br><strong>Kendin gözle:</strong> Miyop bir arkadaşının gözlüğüne bakarsan
        arkadaki nesneleri <em>küçük</em> görürsün (kalın kenarlı). Hipermetrop gözlüğü ise
        <em>büyütür</em> (ince kenarlı). Numarayı bilmeden de türü böyle ayırt edebilirsin.
        <br><strong>Bir uyarı:</strong> Gözlük camının <em>kenar kalınlığı</em> her zaman
        güvenilir bir gösterge değildir; günümüzde yüksek indisli camlarla ince görünen
        güçlü mercekler yapılıyor. Kesin ayrım, merceğin büyütüp küçültmesine bakmakla
        yapılır.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: A</strong></p>`
  },
  {
    baslik: 'Suyun altında neden bulanık görüyoruz?',
    govde: `
      <p>Havuza girip gözlerini suyun altında açtığında her şey <strong>bulanık</strong>
      görünür. Ama dalış maskesi taktığında görüntü <strong>net</strong> olur.</p>
      <p>Gözün en güçlü kırıcı yüzeyi aslında göz merceği değil, <strong>kornea</strong>
      (gözün ön saydam tabakası) &rsquo;dır. Korneanın indisi yaklaşık
      <strong>1,376</strong>&rsquo;dır.</p>
      <p><strong>Suda korneanın neden işe yaramaz hâle geldiğini açıkla. Maske neyi
      değiştiriyor?</strong></p>`,
    gorsel: `
      <svg viewBox="0 0 520 200" xmlns="http://www.w3.org/2000/svg" role="img"
           aria-label="Havada güçlü kıran korneanın suda etkisiz kalması ve maskenin hava tabakası eklemesi">
        <rect width="520" height="200" fill="#17223A"/>
        <line x1="260" y1="14" x2="260" y2="186" stroke="#2E3C57" stroke-width="1.4"/>
        <text x="128" y="28" fill="#35C08A" font-size="12" font-family="system-ui" text-anchor="middle" font-weight="700">HAVADA · n fark 0,376</text>
        <rect x="24" y="40" width="216" height="130" fill="rgba(60,140,205,.06)"/>
        <ellipse cx="150" cy="104" rx="46" ry="42" fill="rgba(232,201,168,.22)" stroke="#E8C9A8" stroke-width="2"/>
        <path d="M104 104 Q 118 76 132 104 Q 118 132 104 104 Z" fill="rgba(127,212,230,.35)" stroke="#7FD4E6" stroke-width="2"/>
        <path d="M24 74 L104 96 M24 104 L104 104 M24 134 L104 112" stroke="#FFB020" stroke-width="1.8"/>
        <path d="M104 96 L182 104 M104 104 L182 104 M104 112 L182 104" stroke="#FFB020" stroke-width="1.8"/>
        <circle cx="182" cy="104" r="4" fill="#35C08A"/>
        <text x="128" y="182" fill="#35C08A" font-size="11" font-family="system-ui" text-anchor="middle">retinada NET</text>
        <text x="392" y="28" fill="#FF6B6B" font-size="12" font-family="system-ui" text-anchor="middle" font-weight="700">SUDA · n fark 0,046</text>
        <rect x="286" y="40" width="216" height="130" fill="rgba(60,140,205,.30)"/>
        <ellipse cx="410" cy="104" rx="46" ry="42" fill="rgba(232,201,168,.22)" stroke="#E8C9A8" stroke-width="2"/>
        <path d="M364 104 Q 378 76 392 104 Q 378 132 364 104 Z" fill="rgba(127,212,230,.35)" stroke="#7FD4E6" stroke-width="2"/>
        <path d="M286 74 L364 98 M286 104 L364 104 M286 134 L364 110" stroke="#FFB020" stroke-width="1.8"/>
        <path d="M364 98 L490 90 M364 104 L490 104 M364 110 L490 118" stroke="#FFB020" stroke-width="1.8"/>
        <text x="392" y="182" fill="#FF6B6B" font-size="11" font-family="system-ui" text-anchor="middle">retinanın ARKASINDA · bulanık</text>
      </svg>`,
    adimlar: [
      { bas: 'Kırılma farka bağlıdır',
        metin: 'Bir yüzeyin kırma gücü, <strong>iki ortamın indis farkıyla</strong> orantılıdır. Kornea için önemli olan, korneanın indisi değil, <strong>korneanın önündeki ortamla arasındaki fark</strong>tır.' },
      { bas: 'Havada',
        metin: 'Hava n = 1,00, kornea n = 1,376. Fark <code>1,376 − 1,00 = <strong>0,376</strong></code>. Kornea gözün toplam kırma gücünün yaklaşık <strong>üçte ikisini</strong> tek başına sağlar (~43 dioptri).' },
      { bas: 'Suda',
        metin: 'Su n = 1,33, kornea n = 1,376. Fark <code>1,376 − 1,33 = <strong>0,046</strong></code>. Fark yaklaşık <strong>8 kat</strong> azaldı ⟹ kornea neredeyse hiç kırmıyor.' },
      { bas: 'Sonuç ne oluyor?',
        metin: 'Gözün toplam gücü ciddi biçimde düşer, ışınlar retinaya varmadan odaklanamaz; odak <strong>retinanın arkasına</strong> düşer. Bu, aşırı hipermetropluk gibidir — görüntü bulanıktır.' },
      { bas: 'Göz merceği kurtaramaz mı?',
        metin: 'Hayır. Göz merceği uyum yaparak gücünü ancak birkaç dioptri artırabilir; oysa kaybedilen güç onlarca dioptridir. Açık kalan kayıp çok büyüktür.' },
      { bas: 'Maske ne yapıyor?',
        metin: 'Maske gözün önüne düz bir cam ve arkasına <strong>hava</strong> koyar. Kornea yine <strong>havayla</strong> temas ettiği için fark yeniden 0,376 olur ve göz normal çalışır.' },
      { bas: 'Bir yan etki',
        metin: 'Maskenin düz camında su–cam–hava geçişleri olduğu için cisimler yaklaşık <strong>%33 büyük</strong> ve <strong>%25 yakın</strong> görünür. Dalgıçlar mesafe tahminini buna göre düzeltmeyi öğrenir — 3.6&rsquo;daki görünür derinlik konusunun doğrudan uygulamasıdır.' },
      { bas: 'Doğada',
        metin: 'Karabatak gibi hem havada hem suda avlanan kuşların göz merceği <strong>çok esnektir</strong> ve suya girince şekil değiştirerek kaybedilen gücü telafi eder.' }
    ],
    secenekler: [
      'Korneanın kırma gücü önündeki ortamla arasındaki indis farkına bağlıdır; suda fark 0,376’dan 0,046’ya düşer, maske korneanın önüne yeniden hava koyar',
      'Su gözü tahriş ettiği için bulanık görürüz',
      'Suyun içinde ışık hızı sıfıra yaklaşır',
      'Göz merceği suda şekil değiştirir ve bozulur',
      'Maske yalnızca gözü korur, görüşe etkisi yoktur'
    ],
    dogru: 0,
    cozum: `
      <div class="formul" style="max-width:380px;margin:10px 0">
        <div class="fm">Havada fark 0,376 &nbsp;→&nbsp; Suda fark 0,046 &nbsp;(≈ 8 kat az)</div>
      </div>
      <p>Aynı mantık mercek yapıcı denkleminde de görünür: çarpan
      <code>(n_cam/n_ortam − 1)</code>&rsquo;dir. Ortam camın indisine yaklaştıkça mercek
      zayıflar.</p>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>B şıkkı</strong> yaygın bir sanı: bulanıklık tahrişten
        değil, <strong>optik</strong> bir sebeptendir. Tuzlu suda da, tatlı suda da, gözün
        hiç yanmadığı serumda da aynı bulanıklık olur.
        <br><strong>C şıkkı</strong> abartılı: suda ışık hızı yalnızca %25 azalır.
        <br><strong>Düşünme egzersizi:</strong> Cam bir küreyi suya batırırsan da benzer
        şey olur — kürenin kırma gücü azalır. Buzu suya koyarsan (n = 1,31 ile 1,33)
        neredeyse <strong>görünmez</strong> hâle gelir; bazı canlıların saydam olmasının
        sırrı da vücut indislerini suya yaklaştırmalarıdır.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: A</strong></p>`
  }
]

});
})();
