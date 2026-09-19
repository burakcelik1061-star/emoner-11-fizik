(function () {
"use strict";
const F = window.F11;

/* ==========================================================================
   topics/u3-prizmalar.js
   Konu 3.8 · Prizmalar
   ========================================================================== */

F.konuKaydet('u3-prizmalar', {

ozet: `Prizma, yüzeyleri <strong>paralel olmayan</strong> saydam bir cisimdir. Bu tek fark,
3.6&rsquo;daki levhadan ayrılmasına yeter: levha ışını <em>kaydırır</em>, prizma
<strong>saptırır</strong>. Üstelik her rengi <strong>farklı</strong> saptırır — gökkuşağının
ve beyaz ışığın ayrışmasının sebebi budur.`,

/* ------------------------------------------------------------- Kavram */
kavram: `
<h3>Prizmada sapma</h3>
<p>Işın prizmaya girerken bir kez, çıkarken bir kez kırılır. İki kırılma
<strong>aynı yöne</strong> olur — çünkü yüzeyler paralel değil, birbirine A açısıyla
eğiktir. Toplam sapma:</p>
<div class="formul" style="max-width:280px;margin:14px 0;border-top-color:var(--accent)">
  <div class="fm" style="color:var(--accent)">δ = θ₁ + θ₄ − A</div>
  <div class="fm-ad">A: tepe açısı</div>
</div>
<p>Hesap zinciri dört adımdır:</p>
<table class="degisken-tablo">
  <thead><tr><th>Adım</th><th>Bağıntı</th></tr></thead>
  <tbody>
    <tr><td>1. yüzeyde kırılma</td><td>sin θ₁ = n · sin θ₂</td></tr>
    <tr><td>Prizma geometrisi</td><td><strong>θ₃ = A − θ₂</strong></td></tr>
    <tr><td>2. yüzeyde kırılma</td><td>n · sin θ₃ = sin θ₄</td></tr>
    <tr><td>Toplam sapma</td><td>δ = θ₁ + θ₄ − A</td></tr>
  </tbody>
</table>
<p style="margin-top:10px;color:var(--text-2)"><code>θ₃ = A − θ₂</code> bağıntısı prizma
sorularının kilididir; geri kalanı yalnızca Snell yasasıdır.</p>

<div class="kutu dikkat" style="margin:16px 0">
  <div class="kutu-bas"><span class="ikon">⚠</span><span>Işın her zaman çıkamaz</span></div>
  <p style="margin:0">θ₃ prizmanın sınır açısını aşarsa ışın ikinci yüzeyden
  <strong>çıkamaz</strong>, içeride tam yansımaya uğrar. Tepe açısı büyütülünce ya da giriş
  açısı küçültülünce bu durum ortaya çıkar. Simülasyonda A&rsquo;yı 75°&rsquo;ye çıkarıp
  dene.</p>
</div>

<h3 style="margin-top:22px">En küçük sapma</h3>
<p>Giriş açısını 5°&rsquo;den 85°&rsquo;ye değiştirirsen sapma önce azalır, bir en küçük
değere iner, sonra tekrar artar. Bu en küçük değer, ışının prizmadan
<strong>simetrik</strong> geçtiği yerdedir: <code>θ₁ = θ₄</code> ve
<code>θ₂ = θ₃ = A/2</code>.</p>
<div class="formul" style="max-width:340px;margin:14px 0;border-top-color:var(--accent)">
  <div class="fm" style="color:var(--accent)">δ<sub>min</sub> = 2·arcsin(n·sin(A/2)) − A</div>
</div>
<p>Bu bağıntı ters çevrilirse bir camın kırılma indisini <strong>ölçmenin</strong> klasik
yolu elde edilir:</p>
<div class="formul" style="max-width:320px;margin:14px 0">
  <div class="fm">n = sin((A + δ<sub>min</sub>)/2) / sin(A/2)</div>
</div>
<p>Laboratuvarda yapılan tek iş, prizmayı yavaşça döndürüp sapmanın en küçük olduğu açıyı
bulmak ve ölçmektir. Bu yönteme <strong>spektrometre yöntemi</strong> denir.</p>

<h3 style="margin-top:22px">Dispersiyon — beyaz ışığın ayrılması</h3>
<p>Kırılma indisi aslında <strong>sabit bir sayı değildir</strong>; dalga boyuna bağlıdır.
Yaklaşık olarak:</p>
<div class="formul" style="max-width:260px;margin:14px 0">
  <div class="fm">n(λ) = n₀ + B / λ²</div>
</div>
<p>λ <strong>küçüldükçe</strong> n <strong>büyür</strong>. Taç camı (BK7) için gerçek
değerler:</p>
<table class="degisken-tablo">
  <thead><tr><th>Renk</th><th>λ (nm)</th><th>n</th><th>Sapma (A = 60°, θ₁ = 50°)</th></tr></thead>
  <tbody>
    <tr><td>Mor</td><td>400</td><td>1,5311</td><td><strong>39,92°</strong></td></tr>
    <tr><td>Mavi</td><td>486</td><td>1,5227</td><td>39,17°</td></tr>
    <tr><td>Sarı</td><td>589</td><td>1,5170</td><td>38,67°</td></tr>
    <tr><td>Kırmızı</td><td>700</td><td>1,5135</td><td><strong>38,36°</strong></td></tr>
  </tbody>
</table>
<div class="formul" style="max-width:340px;margin:14px 0;border-top-color:var(--accent)">
  <div class="fm" style="color:var(--accent)">Açısal ayrım = 39,92 − 38,36 = <strong>1,56°</strong></div>
</div>
<p>Yalnızca 1,5 derece — ama bu kadarı, 1 m ötede renkleri <strong>2,7 cm</strong> ayırmaya
yeter. Bu yüzden prizma deneyinde perde yeterince uzağa konur.</p>

<div class="kutu puf" style="margin:16px 0">
  <div class="kutu-bas"><span class="ikon">🌈</span><span>Sıra nasıl ezberlenir?</span></div>
  <p style="margin:0">Prizmadan çıkan renklerin sırası:
  <strong>mor – mavi – yeşil – sarı – turuncu – kırmızı</strong> (en çok sapandan en az
  sapana). Dalga boyu küçükten büyüğe doğru gider.</p>
  <p style="margin:8px 0 0">Tersi de doğru: <strong>kırmızı en az sapar</strong> çünkü dalga
  boyu en büyük, indisi en küçüktür.</p>
</div>

<h3 style="margin-top:22px">Tam yansıma prizmaları</h3>
<p>45°–45°–90° prizmasında dik kenardan giren ışın hipotenüse <strong>45°</strong> ile
çarpar. Camın sınır açısı 41,2° olduğuna göre 45° &gt; 41,2° ⟹ <strong>tam
yansıma</strong>. Işın 90° döner.</p>
<div class="formul" style="max-width:300px;margin:14px 0">
  <div class="fm">Koşul: 45° ≥ θ<sub>s</sub> ⟹ n ≥ 1/sin45° = <strong>1,414</strong></div>
</div>
<p>Dürbün, periskop ve SLR fotoğraf makinelerinde <strong>ayna yerine bu prizmalar</strong>
kullanılır. Sebebi: sırlı aynada her yansımada %5–10 ışık kaybolurken, tam yansımada
<strong>hiç kayıp yoktur</strong>. Üstelik prizma sırlanmaya gerek duymaz, kararmaz ve
darbeye dayanıklıdır.</p>`,

/* ---------------------------------------------------------- Formüller */
formuller: {
  liste: [
    { fm: 'θ₃ = A − θ₂',                       aciklama: 'Prizma geometrisinin temel bağıntısı' },
    { fm: 'δ = θ₁ + θ₄ − A',                   aciklama: 'Toplam sapma açısı' },
    { fm: 'δ<sub>min</sub> = 2arcsin(n·sin(A/2)) − A', aciklama: 'En küçük sapma' },
    { fm: 'n = sin((A+δ<sub>min</sub>)/2)/sin(A/2)',   aciklama: 'İndis ölçme bağıntısı' },
    { fm: 'n(λ) = n₀ + B/λ²',                  aciklama: 'Cauchy — dispersiyon' },
    { fm: 'n ≥ 1/sin45° = 1,414',              aciklama: '45° prizmasında tam yansıma koşulu' }
  ],
  degiskenler: [
    { sembol: 'A',  ad: 'Tepe açısı',       birim: '°' },
    { sembol: 'δ',  ad: 'Sapma açısı',      birim: '°' },
    { sembol: 'θ₁', ad: 'Giriş açısı',      birim: '°' },
    { sembol: 'θ₄', ad: 'Çıkış açısı',      birim: '°' },
    { sembol: 'λ',  ad: 'Dalga boyu',       birim: 'nm' },
    { sembol: 'n',  ad: 'Kırılma indisi',   birim: '—' }
  ]
},

/* ------------------------------------------------------------ Türetim */
turetim: {
  yollar: [
    {
      ad: 'θ₃ = A − θ₂ neden?',
      adimlar: [
        { baslik: 'Normalleri çiz',
          html: `<p>İki yüzeyin normallerini, ışının çarptığı noktalardan içeri doğru
                 uzat. Bu iki normal prizmanın içinde bir noktada kesişir.</p>` },

        { baslik: 'Dörtgeni kur',
          html: `<p>Tepe noktası, iki çarpma noktası ve normallerin kesiştiği nokta bir
                 <strong>dörtgen</strong> oluşturur. Normaller yüzeylere dik olduğu için
                 bu dörtgenin iki açısı <strong>90°</strong>&rsquo;dir.</p>` },

        { baslik: 'Açılar toplamı',
          html: `<p>Dörtgenin iç açıları toplamı 360°:</p>
                 <div class="formul" style="max-width:300px">
                   <div class="fm">A + 90° + 90° + φ = 360° ⟹ φ = 180° − A</div>
                 </div>
                 <p>φ, normallerin kesiştiği noktadaki açıdır.</p>` },

        { baslik: 'Üçgeni kullan',
          html: `<p>İki çarpma noktası ve kesişme noktasının oluşturduğu üçgende açılar
                 θ₂, θ₃ ve φ&rsquo;dir:</p>
                 <div class="formul" style="max-width:300px">
                   <div class="fm">θ₂ + θ₃ + (180° − A) = 180°</div>
                 </div>` },

        { baslik: 'Sonuç',
          html: `<div class="formul" style="max-width:240px;border-top-color:var(--accent)">
                   <div class="fm" style="color:var(--accent)">θ₂ + θ₃ = A ⟹ θ₃ = A − θ₂</div>
                 </div>
                 <p>Bu bağıntı <strong>ışının açısından bağımsızdır</strong> — yalnızca
                 prizmanın geometrisine bağlıdır.</p>` }
      ]
    },
    {
      ad: 'Sapma açısı δ = θ₁ + θ₄ − A',
      adimlar: [
        { baslik: 'Her yüzeydeki sapmayı ayrı yaz',
          html: `<p>1. yüzeyde ışın <code>θ₁ − θ₂</code> kadar saptı.
                 2. yüzeyde <code>θ₄ − θ₃</code> kadar saptı.</p>` },

        { baslik: 'Aynı yöne saparlar',
          html: `<p>Yüzeyler birbirine eğik olduğu için iki sapma <strong>toplanır</strong>
                 (levhada olduğu gibi birbirini götürmez):</p>
                 <div class="formul" style="max-width:300px">
                   <div class="fm">δ = (θ₁ − θ₂) + (θ₄ − θ₃)</div>
                 </div>` },

        { baslik: 'θ₂ + θ₃ = A koy',
          html: `<div class="formul" style="max-width:320px">
                   <div class="fm">δ = θ₁ + θ₄ − (θ₂ + θ₃) = θ₁ + θ₄ − A</div>
                 </div>` },

        { baslik: 'Sayısal',
          html: `<p>A = 60°, n = 1,517, θ₁ = 50°:</p>
                 <table class="degisken-tablo">
                   <thead><tr><th>Adım</th><th>Sonuç</th></tr></thead>
                   <tbody>
                     <tr><td>θ₂ = arcsin(sin50°/1,517)</td><td>30,33°</td></tr>
                     <tr><td>θ₃ = 60° − 30,33°</td><td>29,67°</td></tr>
                     <tr><td>θ₄ = arcsin(1,517·sin29,67°)</td><td>48,67°</td></tr>
                     <tr><td><strong>δ = 50 + 48,67 − 60</strong></td><td><strong>38,67°</strong></td></tr>
                   </tbody>
                 </table>` }
      ]
    },
    {
      ad: 'En küçük sapma neden simetrikte?',
      adimlar: [
        { baslik: 'Tersinirliği kullan',
          html: `<p>Işığın yolu tersinirdir: bir ışın θ₁ ile girip θ₄ ile çıkıyorsa, θ₄ ile
                 girip θ₁ ile de çıkabilir. İki farklı giriş açısı <strong>aynı</strong>
                 sapmayı verir.</p>` },

        { baslik: 'Eğri simetrik',
          html: `<p>Yani δ–θ₁ eğrisinde her δ değerine <strong>iki</strong> θ₁ karşılık gelir
                 — biri küçük, biri büyük. Grafik panelinde bu U biçimini görebilirsin.</p>` },

        { baslik: 'Tek çözüm nerede?',
          html: `<p>İki çözümün birbirine eşit olduğu <strong>tek</strong> nokta, eğrinin en
                 alt noktasıdır. Orada <code>θ₁ = θ₄</code>, dolayısıyla
                 <code>θ₂ = θ₃ = A/2</code>.</p>` },

        { baslik: 'Formülü çıkar',
          html: `<p><code>θ₂ = A/2</code> için Snell:</p>
                 <div class="formul" style="max-width:280px">
                   <div class="fm">sin θ₁ = n·sin(A/2)</div>
                 </div>
                 <p><code>δ = θ₁ + θ₄ − A = 2θ₁ − A</code> olduğundan:</p>
                 <div class="formul" style="max-width:340px;border-top-color:var(--accent)">
                   <div class="fm" style="color:var(--accent)">δ<sub>min</sub> = 2·arcsin(n·sin(A/2)) − A</div>
                 </div>` },

        { baslik: 'Sayısal doğrulama',
          html: `<p>A = 60°, n = 1,517:</p>
                 <div class="formul" style="max-width:400px">
                   <div class="fm">δ_min = 2·arcsin(1,517 × 0,5) − 60 = 2 × 49,332 − 60 = <strong>38,66°</strong></div>
                 </div>
                 <p>Simetrik giriş açısı <code>θ₁ = (60 + 38,66)/2 = 49,33°</code>.
                 Yukarıdaki 50° hesabı 38,67° vermişti — neredeyse aynı, çünkü 50°
                 minimuma çok yakın. Eğri dip noktasında <strong>çok düzdür</strong>;
                 ölçümü kolaylaştıran da budur.</p>` }
      ]
    }
  ]
},

/* -------------------------------------------------------- Simülasyon */
sim: F.simler['prizmalar'],

/* ------------------------------------------------------- Püf noktası */
puf: {
  html: `
    <p><strong>1 · θ₃ = A − θ₂ kilidi aç.</strong> Prizma sorularının tamamı bu tek
    bağıntıya dayanır. Gerisi iki kez Snell.</p>

    <p><strong>2 · δ = θ₁ + θ₄ − A.</strong> Dört harften üçü verilirse dördüncüsü çıkar.
    Soru genelde δ&rsquo;yi verip θ₄&rsquo;ü sorar.</p>

    <p><strong>3 · “En küçük sapma” duyduğun anda simetriyi yaz:</strong>
    <code>θ₁ = θ₄</code> ve <code>θ₂ = θ₃ = A/2</code>. Hesap anında yarıya iner.</p>

    <p><strong>4 · Levha kaydırır, prizma saptırır.</strong> Paralel yüzlü levhada
    <code>θ₄ = θ₁</code> ve sapma sıfırdır. Prizmada yüzeyler paralel olmadığı için sapma
    vardır. Bu ayrım sık sorulur.</p>

    <p><strong>5 · Mor en çok, kırmızı en az sapar.</strong> Sebebi: λ küçük ⟹ n büyük ⟹
    daha çok kırılır. Ters yazan şık yanlıştır.</p>

    <p><strong>6 · Frekans hâlâ değişmiyor.</strong> Prizmada renkler ayrışır ama her rengin
    frekansı sabittir; değişen n, v ve λ&rsquo;dır.</p>

    <p><strong>7 · Işın prizmadan çıkamayabilir.</strong> θ₃ &gt; θ_s ise ikinci yüzeyde tam
    yansıma olur. Büyük A ve küçük θ₁ bu durumu getirir.</p>

    <p><strong>8 · 45° prizmasında n &gt; 1,414 olmalı.</strong> Bu sayıyı ezberle;
    <code>1/sin45° = √2</code>&rsquo;dir. Sıradan camın (1,5) bu koşulu sağlaması
    tesadüf değil — prizmalar bu yüzden camdan yapılır.</p>

    <p><strong>9 · Tam yansıma prizması AYNA DEĞİLDİR.</strong> “Prizmanın arkası
    sırlanmıştır” diyen şık yanlıştır; sırlama olmadan, sadece tam yansımayla çalışır.</p>`
},

/* ----------------------------------------------------- Zorlayıcı sorular */
osym: [
  {
    baslik: 'En küçük sapmadan indis',
    kaynak: 'Ölçme yöntemi',
    govde: `
      <p>Tepe açısı <strong>60°</strong> olan bir cam prizma yavaşça döndürülüyor. Sapma
      açısının en küçük değeri <strong>30°</strong> olarak ölçülüyor.</p>
      <p>Buna göre:</p>
      <ol style="margin-left:.2em">
        <li>Prizmanın kırılma indisi kaçtır?</li>
        <li>Bu durumda giriş açısı kaç derecedir?</li>
        <li>Prizmanın içindeki sınır açısı kaç derecedir?</li>
      </ol>`,
    gorsel: `
      <svg viewBox="0 0 520 210" xmlns="http://www.w3.org/2000/svg" role="img"
           aria-label="Prizmada en küçük sapma durumunda ışının simetrik geçişi">
        <rect width="520" height="210" fill="#0E1726"/>
        <path d="M260 34 L180 172 L340 172 Z" fill="rgba(127,212,230,.20)" stroke="#7FD4E6" stroke-width="2.4"/>
        <text x="260" y="26" fill="#7FD4E6" font-size="12" font-family="system-ui" text-anchor="middle" font-weight="700">A = 60°</text>
        <path d="M60 62 L220 103" stroke="#FFB020" stroke-width="2.6"/>
        <path d="M220 103 L300 103" stroke="#FF6B6B" stroke-width="2.6"/>
        <path d="M300 103 L460 144" stroke="#FFB020" stroke-width="2.6"/>
        <path d="M220 103 L400 149" stroke="#A78BFA" stroke-width="1.6" stroke-dasharray="6 4"/>
        <text x="100" y="52" fill="#FFB020" font-size="11" font-family="system-ui">θ₁</text>
        <text x="258" y="94" fill="#FF6B6B" font-size="11" font-family="system-ui" text-anchor="middle">θ₂ = θ₃ = 30°</text>
        <text x="424" y="140" fill="#FFB020" font-size="11" font-family="system-ui">θ₄ = θ₁</text>
        <text x="396" y="176" fill="#A78BFA" font-size="11" font-family="system-ui">δ_min = 30°</text>
      </svg>`,
    secenekler: [
      'n = 1,414 · θ₁ = 45° · θ_s = 45°',
      'n = 1,500 · θ₁ = 45° · θ_s = 41,8°',
      'n = 1,414 · θ₁ = 30° · θ_s = 45°',
      'n = 2,000 · θ₁ = 60° · θ_s = 30°',
      'n = 1,732 · θ₁ = 45° · θ_s = 35,3°'
    ],
    dogru: 0,
    cozum: `
      <p><strong>1. İndis:</strong></p>
      <div class="formul" style="max-width:420px;margin:10px 0">
        <div class="fm">n = sin((A + δ_min)/2) / sin(A/2) = sin(45°) / sin(30°)</div>
      </div>
      <div class="formul" style="max-width:340px;margin:10px 0;border-top-color:var(--accent)">
        <div class="fm" style="color:var(--accent)">n = 0,7071 / 0,5 = <strong>1,414 = √2</strong></div>
      </div>

      <p><strong>2. Giriş açısı:</strong> En küçük sapmada geçiş simetriktir:</p>
      <div class="formul" style="max-width:340px;margin:10px 0">
        <div class="fm">θ₁ = (A + δ_min)/2 = (60 + 30)/2 = <strong>45°</strong></div>
      </div>
      <p>Kontrol: <code>θ₂ = arcsin(sin45°/√2) = arcsin(0,5) = 30° = A/2</code> ✓</p>

      <p><strong>3. Sınır açısı:</strong></p>
      <div class="formul" style="max-width:340px;margin:10px 0">
        <div class="fm">sin θ_s = 1/n = 1/√2 = 0,7071 ⟹ θ_s = <strong>45°</strong></div>
      </div>

      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>Bu prizma özel bir durum:</strong> n = √2 olduğu için
        sınır açısı tam 45°&rsquo;dir. Yani bu prizmadan yapılmış bir 45° prizması
        <strong>tam sınırda</strong> çalışırdı — en ufak bir sapmada ışık kaçardı. Gerçek
        optik prizmalar bu yüzden n = 1,5 ve üstü camdan yapılır.
        <br><strong>B şıkkı</strong> sık görülen bir refleks: “cam ⟹ n = 1,5”. Ama soru
        ölçüm verisi veriyor; ölçüme uymak gerekir.
        <br><strong>D şıkkı</strong> <code>sin45/sin30</code> yerine <code>45/30 · ...</code>
        gibi oran hataları yapanların düştüğü yer.
        <br><strong>Simülasyonda:</strong> A = 60, n = 1,415 yap; δ_min okumasının
        30,0°&rsquo;ye oturduğunu gör.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: A</strong></p>`
  },
  {
    baslik: 'Prizma mı levha mı?',
    kaynak: 'Kavram ayrımı',
    govde: `
      <p>Aşağıdaki yargıları inceleyiniz:</p>
      <ol style="margin-left:.2em">
        <li>Paralel yüzlü cam levhadan geçen beyaz ışık renklere ayrılmaz.</li>
        <li>Prizmada kırmızı ışık mor ışıktan daha az sapar.</li>
        <li>Prizmadan geçen ışığın frekansı değişir.</li>
        <li>Tam yansıma prizmalarının arka yüzeyi sırlanmıştır.</li>
      </ol>
      <p>Hangileri <strong>doğrudur</strong>?</p>`,
    secenekler: [
      'I ve II',
      'Yalnız II',
      'I, II ve III',
      'II ve IV',
      'Hepsi'
    ],
    dogru: 0,
    cozum: `
      <ol>
        <li><strong>Doğru</strong> — ama gerekçesi ince. Levhada da her renk
        <em>farklı açıyla</em> kırılır, yani levhanın içinde renkler ayrılır. Ancak ikinci
        yüzeyde her renk <strong>tam ters yönde</strong> aynı kadar kırılır ve
        <strong>hepsi yeniden paralel</strong> hâle gelir. Çıkışta renkler birleşir, ayrım
        görünmez. (Çok kalın bir levhada, çok dikkatli bakılırsa kenarlarda renk
        görülebilir.)</li>
        <li><strong>Doğru.</strong> Kırmızının dalga boyu büyük ⟹ n küçük ⟹ az kırılır ⟹
        az sapar.</li>
        <li><strong>Yanlış.</strong> Frekans ortam değiştirirken <strong>asla</strong>
        değişmez. Değişen n, v ve λ&rsquo;dır. Rengi belirleyen frekans olduğu için ışık
        prizmadan çıkınca eski rengindedir.</li>
        <li><strong>Yanlış.</strong> Tam yansıma prizmaları <strong>sırlanmaz</strong>.
        Zaten bütün avantajları budur: sırlı ayna ışığın bir kısmını yutar, tam yansıma
        yutmaz.</li>
      </ol>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>I. yargının gerekçesi bu sorunun asıl öğrettiği şey.</strong>
        “Levhada renkler hiç ayrılmaz” demek tam doğru değil; doğrusu “ayrılır ama çıkışta
        <em>yeniden birleşir</em>”. Prizmayı özel kılan, ikinci yüzeyin birinciyi
        <strong>geri almamasıdır</strong>.
        <br><strong>Sağlama:</strong> İki prizmayı ters çevirip birbirine yapıştırırsan bir
        paralel levha elde edersin — ve renkler yine birleşir. Newton bu deneyi yapmış,
        böylece rengin camdan değil <em>ışığın kendisinden</em> geldiğini kanıtlamıştır.
        <br><strong>IV. yargı için:</strong> Bir dürbünü ışığa tutup içine bakarsan
        prizmaların tamamen saydam olduğunu görürsün — hiçbir sırlı yüzey yoktur.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: A</strong></p>`
  }
],

/* --------------------------------------------- Bağlam temelli sorular */
baglam: [
  {
    baslik: 'Gökkuşağı nasıl oluşuyor?',
    govde: `
      <p>Yağmurdan sonra güneş açtığında, <strong>güneşin ters yönüne</strong> baktığında
      gökkuşağı görünür. Her zaman aynı sırayla: dışta <strong>kırmızı</strong>, içte
      <strong>mor</strong>.</p>
      <p>Bir su damlasına giren ışık: (1) damlaya girerken <strong>kırılır</strong>,
      (2) damlanın arka yüzünden <strong>yansır</strong>, (3) çıkarken tekrar
      <strong>kırılır</strong>.</p>
      <p><strong>Renklerin neden ayrıldığını, kırmızının neden dışta olduğunu ve
      gökkuşağını neden hep 42° civarında gördüğümüzü açıkla.</strong></p>`,
    gorsel: `
      <svg viewBox="0 0 520 220" xmlns="http://www.w3.org/2000/svg" role="img"
           aria-label="Su damlasında iki kırılma ve bir yansımayla renklerin ayrılması">
        <rect width="520" height="220" fill="#0E1726"/>
        <circle cx="300" cy="104" r="72" fill="rgba(60,140,205,.26)" stroke="#7FD4E6" stroke-width="2.4"/>
        <text x="300" y="196" fill="#7FD4E6" font-size="11" font-family="system-ui" text-anchor="middle">yağmur damlası</text>
        <path d="M40 58 L242 70" stroke="#FFFFFF" stroke-width="3"/>
        <text x="80" y="48" fill="#EAF0FA" font-size="11" font-family="system-ui">beyaz güneş ışığı</text>
        <path d="M242 70 L352 148 L150 150" stroke="#FF3B30" stroke-width="2"/>
        <path d="M242 70 L356 142 L152 166" stroke="#9B5CF6" stroke-width="2"/>
        <text x="130" y="146" fill="#FF3B30" font-size="11" font-family="system-ui" text-anchor="end">kırmızı 42°</text>
        <text x="132" y="172" fill="#9B5CF6" font-size="11" font-family="system-ui" text-anchor="end">mor 40°</text>
        <circle cx="242" cy="70" r="4" fill="#FFB020"/>
        <circle cx="354" cy="145" r="4" fill="#FFB020"/>
        <text x="380" y="140" fill="#FFB020" font-size="11" font-family="system-ui">arka yüzde yansıma</text>
      </svg>`,
    adimlar: [
      { bas: 'Damla bir prizma gibi davranıyor',
        metin: 'Işık damlaya girerken kırılır. Kırılma indisi renge bağlı olduğu için renkler <strong>daha bu ilk adımda</strong> ayrılmaya başlar.' },
      { bas: 'Arka yüzde yansıma',
        metin: 'Işın damlanın arka iç yüzeyine çarpar. Buradaki açı sınır açısından küçük olduğu için <strong>tam yansıma değil</strong>, kısmî yansıma olur — ışığın bir kısmı damlanın arkasından çıkıp gider, bir kısmı geri döner.' },
      { bas: 'Çıkışta ikinci kırılma',
        metin: 'Geri dönen ışın damladan çıkarken tekrar kırılır ve renk ayrımı <strong>iki katına</strong> çıkar. Levhadan farklı olarak burada ikinci kırılma birinciyi geri almaz.' },
      { bas: 'Neden 42°?',
        metin: 'Damlaya farklı yüksekliklerden giren ışınlar farklı açılarla çıkar. Ama çıkış açısının bir <strong>en büyük değeri</strong> vardır (yaklaşık 42°) ve o açı civarında ışınlar <strong>yığılır</strong>. Bu yığılma açısında parlaklık en yüksektir — gördüğümüz gökkuşağı odur.' },
      { bas: 'Renk sırası',
        metin: 'Kırmızı için bu açı <strong>42,4°</strong>, mor için <strong>40,7°</strong>. Kırmızının açısı büyük olduğu için gökkuşağının <strong>dış</strong> kenarında, mor <strong>iç</strong> kenarında görünür.' },
      { bas: 'Neden yay biçiminde?',
        metin: 'Gözünle güneşin ters yönü arasındaki eksenden 42° açı yapan <strong>tüm</strong> yönler bir koni oluşturur. Yerle kesişince yay görünür. Uçaktan bakarsan gökkuşağını <strong>tam daire</strong> olarak görürsün.' },
      { bas: 'İkincil gökkuşağı',
        metin: 'Bazen dışarıda daha soluk ikinci bir yay olur. O, damla içinde <strong>iki kez</strong> yansıyan ışıktan gelir; açısı 51° ve renk sırası <strong>terstir</strong> (dışta mor). İki yansıma daha çok ışık kaybettirdiği için daha soluktur.' }
    ],
    secenekler: [
      'Damla prizma gibi davranır, iki kırılma renkleri ayırır; kırmızının çıkış açısı (42,4°) mordan (40,7°) büyük olduğu için dışta görünür',
      'Renkler damlanın içinde yansırken oluşur, kırılmanın etkisi yoktur',
      'Mor dışta, kırmızı içtedir',
      'Gökkuşağı güneşe doğru bakınca görülür',
      'Her damla tek bir renk üretir, renkler damlaların büyüklüğünden gelir'
    ],
    dogru: 0,
    cozum: `
      <p>Gökkuşağı, <strong>dispersiyon + yansıma</strong> birlikteliğidir. Damla içinde iki
      kırılma ve bir yansıma vardır.</p>
      <div class="formul" style="max-width:360px;margin:10px 0;border-top-color:var(--accent)">
        <div class="fm" style="color:var(--accent)">kırmızı 42,4° &nbsp;·&nbsp; mor 40,7° &nbsp;⟹&nbsp; kırmızı DIŞTA</div>
      </div>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>C şıkkı</strong> sık yapılan hatadır ve “mor en çok
        sapar, o hâlde dışta olur” diye düşünmekten gelir. Ama burada ölçtüğümüz açı
        <em>sapma</em> değil, <strong>gözümüze gelen ışının yönüdür</strong>; iki farklı şey.
        <br><strong>D şıkkı</strong> yönü ters söylüyor: gökkuşağı daima güneşin
        <strong>ters</strong> yönündedir. Sabah gökkuşağı batıda, ikindi gökkuşağı doğuda
        görünür.
        <br><strong>E şıkkı</strong> yanlış: her damla tüm renkleri üretir, ama senin gözüne
        her damladan yalnızca <em>tek bir renk</em> ulaşır. Gökkuşağının farklı
        yüksekliklerindeki renkler <strong>farklı damlalardan</strong> gelir.
        <br><strong>Kendin yap:</strong> Sırtın güneşe dönük, hortumla ince su serpersen
        gökkuşağını kendin oluşturabilirsin. Kolunu uzatıp açıyı ölçersen 42°&rsquo;ye
        yakın bulursun.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: A</strong></p>`
  },
  {
    baslik: 'Dürbünde neden prizma var?',
    govde: `
      <p>Bir dürbünü sallarsan içinde ağır parçaların olduğunu hissedersin. Bunlar
      <strong>cam prizmalardır</strong>. Dürbünün objektifi gerçek ve <strong>ters</strong>
      bir görüntü oluşturur; prizmalar bu görüntüyü düzeltir.</p>
      <p>Tasarımcı, prizma yerine <strong>sırlı ayna</strong> da kullanabilirdi. Aynalar
      daha hafif ve daha ucuz olurdu.</p>
      <p><strong>Neden yine de prizma tercih ediliyor? Dört yansımada kayıp farkını
      hesapla. Bir de dürbünün neden bu kadar "şişman" olduğunu açıkla.</strong></p>`,
    gorsel: `
      <svg viewBox="0 0 520 210" xmlns="http://www.w3.org/2000/svg" role="img"
           aria-label="Dürbünde iki adet kırk beş derece prizmanın görüntüyü düzeltmesi">
        <rect width="520" height="210" fill="#17223A"/>
        <rect x="26" y="78" width="70" height="54" rx="6" fill="#2E3D57" stroke="#4A5F86" stroke-width="2"/>
        <text x="61" y="70" fill="#8FB6EC" font-size="11" font-family="system-ui" text-anchor="middle">objektif</text>
        <path d="M96 105 H196" stroke="#FFB020" stroke-width="2.6"/>
        <path d="M196 62 L250 62 L196 116 Z" fill="rgba(127,212,230,.22)" stroke="#7FD4E6" stroke-width="2"/>
        <path d="M196 105 L222 105 L222 62" stroke="#FFB020" stroke-width="2.6" fill="none"/>
        <path d="M222 62 L300 62" stroke="#FFB020" stroke-width="2.6"/>
        <path d="M300 34 L354 88 L300 88 Z" fill="rgba(127,212,230,.22)" stroke="#7FD4E6" stroke-width="2"/>
        <path d="M300 62 L326 62 L326 130" stroke="#FFB020" stroke-width="2.6" fill="none"/>
        <path d="M326 130 H430" stroke="#FFB020" stroke-width="2.6"/>
        <rect x="430" y="108" width="56" height="44" rx="6" fill="#2E3D57" stroke="#4A5F86" stroke-width="2"/>
        <text x="458" y="170" fill="#8FB6EC" font-size="11" font-family="system-ui" text-anchor="middle">göz merceği</text>
        <text x="266" y="196" fill="#35C08A" font-size="11" font-family="system-ui" text-anchor="middle">iki prizma · dört tam yansıma · görüntü düzelir, yol uzar</text>
      </svg>`,
    adimlar: [
      { bas: 'Görüntü neden ters?',
        metin: 'Objektif bir çukur ayna ya da yakınsak mercek gibi davranır ve <strong>gerçek</strong> görüntü oluşturur. 3.4&rsquo;te öğrendiğimiz gibi gerçek görüntü <strong>daima terstir</strong>.' },
      { bas: 'Prizmalar ne yapıyor?',
        metin: 'İki prizma, ışını dört kez tam yansıtır. Her yansıma görüntüyü bir eksende çevirir; <strong>dört yansıma</strong> hem sağ-solu hem alt-üstü düzeltir.' },
      { bas: 'Ayna kullanılsaydı — kayıp',
        metin: 'İyi bir alüminyum ayna yaklaşık <strong>%90</strong> yansıtır. Dört yansımada: <code>0,90⁴ = <strong>0,656</strong></code> ⟹ ışığın yalnızca <strong>%66</strong>&rsquo;sı kalır.' },
      { bas: 'Prizmayla kayıp',
        metin: 'Tam yansımada kayıp <strong>sıfırdır</strong>. Geriye yalnızca dört hava–cam yüzeyindeki Fresnel yansımaları kalır: yüzey başına %4, yani <code>0,96⁴ = 0,849</code> ⟹ <strong>%85</strong>. Kaplama yapılırsa %99&rsquo;a çıkar.' },
      { bas: 'Fark ne kadar?',
        metin: '%85&rsquo;e karşı %66. Prizma, aynaya göre yaklaşık <strong>%29 daha fazla</strong> ışık geçirir. Alacakaranlıkta kullanılan bir dürbün için bu çok büyük bir farktır.' },
      { bas: 'Neden şişman?',
        metin: 'Prizmalar ışının yolunu <strong>katlayarak uzatır</strong>. Böylece objektif ile göz merceği arasındaki uzun optik yol, kısa bir gövdeye sığar. Dürbünün geniş omuzlu görünmesinin sebebi budur — içinde prizmalar var.' },
      { bas: 'Başka avantajlar',
        metin: 'Prizma sırlanmadığı için <strong>kararmaz</strong> ve zamanla matlaşmaz. Ayrıca tek parça cam olduğu için darbeye ve titreşime aynadan çok daha dayanıklıdır.' }
    ],
    secenekler: [
      'Tam yansımada kayıp olmadığı için: dört aynada %66, dört prizma yansımasında ~%85 ışık kalır; prizmalar ayrıca yolu katlayarak gövdeyi kısaltır',
      'Prizmalar aynadan daha ucuz olduğu için',
      'Prizmalar görüntüyü büyüttüğü için',
      'Ayna kullanılsa görüntü düzelmezdi',
      'Prizmalar ışığı renklerine ayırıp daha canlı görüntü verir'
    ],
    dogru: 0,
    cozum: `
      <div class="formul" style="max-width:360px;margin:10px 0">
        <div class="fm">Ayna: 0,90⁴ = 0,656 ⟹ %66</div>
      </div>
      <div class="formul" style="max-width:360px;margin:10px 0;border-top-color:var(--accent)">
        <div class="fm" style="color:var(--accent)">Prizma: 0,96⁴ = 0,849 ⟹ %85</div>
      </div>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>E şıkkı</strong> tam tersi: dürbün prizmalarında renk
        ayrımı <strong>istenmez</strong>. Işın yüzeylere dik ya da dike yakın girdiği için
        kırılma ve dolayısıyla dispersiyon en aza indirilir. Dispersiyon burada bir
        <em>kusur</em>dur.
        <br><strong>C şıkkı</strong> yanlış: büyütmeyi mercekler yapar, prizmaların
        büyütmeye katkısı yoktur.
        <br><strong>Bağlantı:</strong> Bu soru üç konuyu birleştiriyor — 3.4 (gerçek görüntü
        terstir), 3.2 (çift yansıma görüntüyü düzeltir), 3.5/3.8 (tam yansımada kayıp yok).
        <br><strong>Kendin bak:</strong> Dürbünün objektifine ışık tutup içine bakarsan
        prizmaların parıltısını görürsün. Ucuz dürbünlerde prizma yerine küçük ayna
        kullanılır — bu modeller alacakaranlıkta gözle görülür biçimde daha karanlıktır.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: A</strong></p>`
  }
]

});
})();
