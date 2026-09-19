(function () {
"use strict";
const F = window.F11;

/* ==========================================================================
   topics/u2-akim-makarasi.js
   Konu 2.2.3 · Akım makarasının manyetik alanı  (MEB 11, s.207-212)
   ========================================================================== */

F.konuKaydet('u2-akim-makarasi', {

ozet: `Düz telin alanı zayıftır. Ama teli <strong>bükersen</strong> her parçasının katkısı
merkezde <strong>aynı yöne</strong> bakar ve toplanır. Üst üste sarınca alan daha da güçlenir.
Böylece elde ettiğin şey, bir düğmeyle <strong>açıp kapatabildiğin bir mıknatıstır</strong>.`,

/* ------------------------------------------------------------- Kavram */
kavram: `
<h3>Bir halka, bükülmüş bir düz teldir</h3>
<p>Düz telde alan çizgileri iç içe çemberlerdi. Teli bir halka hâline getirince ne olur?
Halkanın <strong>her küçük parçası</strong> merkezde bir alan üretir — ve bu katkıların
hepsi <strong>aynı yöne</strong> bakar. Zıt yönlü katkı yoktur, hepsi toplanır.</p>

<div class="formul" style="max-width:320px;margin:14px 0;border-top-color:var(--accent)">
  <div class="fm" style="color:var(--accent)">B = μ₀ · N · i / (2r)</div>
  <div class="fm-ad">N sarımlı düz halkanın MERKEZİNDEKİ alan</div>
</div>

<p>Bu, aynı akımın düz telde ürettiği alandan çok daha büyüktür. Ne kadar? İki formülü
oranlarsak <strong>şaşırtıcı derecede temiz</strong> bir sonuç çıkar:</p>
<div class="formul" style="max-width:300px;margin:14px 0">
  <div class="fm">B<sub>halka</sub> / B<sub>tel</sub> = N · π</div>
</div>
<p style="color:var(--text-2)">Tek sarımlı bir halka bile, aynı uzaklıktaki düz telden
<strong>π ≈ 3,14 kat</strong> güçlüdür. 100 sarımda bu oran 314&rsquo;e çıkar.
Simülasyonda bu oran doğrudan okunuyor.</p>

<h3 style="margin-top:22px">Sağ el kuralının halka hâli</h3>
<p>Düz telde başparmak akımı, parmaklar alanı gösteriyordu. Halkada
<strong>roller yer değiştirir</strong>:</p>

<div class="kutu puf" style="margin:16px 0">
  <div class="kutu-bas"><span class="ikon">✋</span><span>İki kural, karıştırma</span></div>
  <table class="degisken-tablo" style="margin:8px 0 0">
    <thead><tr><th></th><th>Başparmak</th><th>Dört parmak</th></tr></thead>
    <tbody>
      <tr><td><strong>Düz tel</strong></td><td>akım</td><td>alan (sarılır)</td></tr>
      <tr><td><strong>Halka / makara</strong></td><td><strong>alan</strong></td><td><strong>akım</strong> (sarılır)</td></tr>
    </tbody>
  </table>
  <p style="margin:8px 0 0">Mantık aynı: <em>sarılan şey çember olandır</em>. Düz telde
  alan çemberdir, halkada akım çemberdir.</p>
</div>

<h3 style="margin-top:22px">Solenoid: halkaları yan yana diz</h3>
<p>Çok sayıda halkayı bir silindir üzerine yan yana sararsan <strong>solenoid</strong>
(akım makarası) elde edersin. İçeride alan artık noktadan noktaya değişmez —
<strong>düzgün</strong> hâle gelir:</p>

<div class="formul" style="max-width:300px;margin:14px 0;border-top-color:var(--accent)">
  <div class="fm" style="color:var(--accent)">B = μ₀ · n · i</div>
  <div class="fm-ad">n = N / L · birim uzunluktaki sarım sayısı</div>
</div>

<div class="kutu dikkat" style="margin:16px 0">
  <div class="kutu-bas"><span class="ikon">⚠</span><span>Solenoidde yarıçap YOKTUR</span></div>
  <p style="margin:0">Formüle iyi bak: <strong>r yok</strong>. Solenoidin kalın ya da ince
  olması içerideki alanı değiştirmez. Ayrıca içeride <em>her nokta</em> aynı alanı görür —
  eksende de, kenara yakın da. Bu, paralel levhalar arasındaki elektrik alanla
  <strong>birebir aynı durumdur</strong>.</p>
  <p style="margin:8px 0 0">Halkada <code>r</code> vardı ve ters orantılıydı; solenoidde yok.
  İkisini karıştırmak bu konudaki en sık hatadır.</p>
</div>

<h3 style="margin-top:22px">Solenoid bir çubuk mıknatıstır</h3>
<p>Dışarıdan bakınca solenoidin alan çizgileri, bir <strong>çubuk mıknatısınkinin
aynısıdır</strong>: bir uçtan çıkar, dolanır, diğer uçtan girer. Yani solenoidin de bir
<strong>N</strong> ve bir <strong>S</strong> ucu vardır.</p>
<p>Hangi ucun N olduğunu sağ el kuralıyla bulursun: parmaklar akım yönünde sarılır,
<strong>başparmağın gösterdiği uç N kutbudur</strong>.</p>

<div class="kutu nott" style="margin:16px 0">
  <div class="kutu-bas"><span class="ikon">🔌</span><span>Kalıcı mıknatıstan farkı</span></div>
  <p style="margin:0">Çubuk mıknatısı kapatamazsın. Solenoidi <strong>kapatabilirsin</strong>.
  Akımı artırınca güçlenir, yönünü değiştirince kutupları yer değiştirir. Bu üç özellik
  (açılıp kapanma, şiddet ayarı, kutup değiştirme) elektromıknatısı teknolojinin temel
  parçası yapar — bir sonraki konu tamamen bununla ilgili.</p>
</div>`,

/* ---------------------------------------------------------- Formüller */
formuller: {
  liste: [
    { fm: 'B = μ₀·N·i / (2r)', aciklama: 'N sarımlı düz halkanın merkezinde' },
    { fm: 'B = μ₀ · n · i',    aciklama: 'Uzun solenoidin içinde — düzgün alan' },
    { fm: 'n = N / L',         aciklama: 'Birim uzunluktaki sarım sayısı (sarım/m)' },
    { fm: 'B<sub>halka</sub>/B<sub>tel</sub> = N·π', aciklama: 'Bükmenin kazancı' },
    { fm: 'μ₀ = 4π·10⁻⁷ T·m/A', aciklama: 'Her iki formülde de aynı sabit' }
  ],
  degiskenler: [
    { sembol: 'B', ad: 'Manyetik alan',          birim: 'T' },
    { sembol: 'N', ad: 'Sarım sayısı',           birim: 'tane' },
    { sembol: 'n', ad: 'Birim uzunlukta sarım',  birim: 'sarım/m' },
    { sembol: 'i', ad: 'Akım',                   birim: 'A' },
    { sembol: 'r', ad: 'Halka yarıçapı',         birim: 'm' },
    { sembol: 'L', ad: 'Solenoid uzunluğu',      birim: 'm' }
  ]
},

/* ------------------------------------------------------------ Türetim */
turetim: {
  yollar: [
    {
      ad: 'Bükmek neden alanı güçlendirir?',
      adimlar: [
        { baslik: 'Düz telde ne oluyordu?',
          html: `<p>Düz telin bir parçası, uzaydaki bir noktada alan üretir. Ama telin
                 <strong>başka bir parçası</strong>, aynı noktada <em>başka yönde</em> bir alan
                 üretir. Katkılar birbirini kısmen götürür.</p>` },

        { baslik: 'Şimdi teli halka yap',
          html: `<p>Halkanın merkezini seç. Halkanın <strong>her parçası</strong> merkezden
                 <strong>aynı uzaklıkta</strong> (r) ve merkeze göre <strong>aynı geometride</strong>
                 duruyor.</p>` },

        { baslik: 'Katkıların yönüne bak',
          html: `<p>Sağ el kuralını halkanın her parçası için ayrı ayrı uygula: hepsi merkezde
                 <strong>halkanın eksenine paralel, aynı yönde</strong> alan üretir.
                 Hiçbiri diğerini götürmez.</p>
                 <div class="formul" style="max-width:280px"><div class="fm">tüm katkılar toplanır</div></div>` },

        { baslik: 'Sarım ekle',
          html: `<p>Aynı yere N tane halka sararsan her biri aynı katkıyı verir:</p>
                 <div class="formul" style="max-width:260px;border-top-color:var(--accent)">
                   <div class="fm" style="color:var(--accent)">B = μ₀·N·i / (2r)</div>
                 </div>
                 <p>Yani <strong>alanı artırmanın iki yolu</strong> var: akımı büyütmek
                 (ısınma sınırı) ya da sarım eklemek (ucuz ve kolay). Pratikte ikincisi seçilir.</p>` }
      ]
    },
    {
      ad: 'Solenoid formülü nereden geliyor?',
      adimlar: [
        { baslik: 'Halkaları yan yana diz',
          html: `<p>L uzunluğuna N sarım sığdır. Artık her noktada
                 <strong>birçok halkanın</strong> katkısı toplanıyor.</p>` },

        { baslik: 'Hangi sayı önemli?',
          html: `<p>Toplam sarım sayısı tek başına yetmez. 100 sarımı <strong>10 cm</strong>&rsquo;ye
                 sıkıştırmakla <strong>1 m</strong>&rsquo;ye yaymak aynı şey değildir. Önemli olan
                 <strong>sarım sıklığıdır</strong>:</p>
                 <div class="formul" style="max-width:200px"><div class="fm">n = N / L</div></div>` },

        { baslik: 'Sonucu yaz',
          html: `<p>Uzun bir solenoidin içinde:</p>
                 <div class="formul" style="max-width:240px;border-top-color:var(--accent)">
                   <div class="fm" style="color:var(--accent)">B = μ₀ · n · i</div>
                 </div>
                 <p>Yarıçap kayboldu. Sebebi şu: yarıçapı büyütünce her halka merkezden
                 uzaklaşır (alan azalır) ama halkanın <em>uzunluğu</em> da artar (katkı artar).
                 İki etki tam olarak birbirini götürür.</p>` },

        { baslik: 'Sınırını söyle',
          html: `<p>Formül <strong>uzun</strong> solenoid içindir (L ≫ r) ve
                 <strong>uçlardan uzakta</strong> geçerlidir. Tam uçta alan yaklaşık
                 <strong>yarıya</strong> düşer, çünkü orada yalnızca bir taraftan katkı gelir.</p>` }
      ]
    },
    {
      ad: 'Hangi uç N kutbu?',
      adimlar: [
        { baslik: 'Akımın dolanma yönünü bul',
          html: `<p>Solenoide bir uçtan bak. Akım sana göre <strong>saat yönünde mi</strong>
                 yoksa <strong>tersine mi</strong> dolanıyor?</p>` },

        { baslik: 'Sağ eli uygula',
          html: `<p>Dört parmağını akımın dolandığı yönde sar. <strong>Başparmağın gösterdiği
                 uç N kutbudur.</strong></p>` },

        { baslik: 'Kestirme kural',
          html: `<p>Bir uçtan baktığında akım <strong>saat yönünün tersine</strong> dolanıyorsa,
                 baktığın uç <strong>N</strong>&rsquo;dir. Saat yönündeyse <strong>S</strong>&rsquo;dir.</p>
                 <p>Harflerin şekliyle hatırlayabilirsin: <strong>N</strong>&rsquo;in çizgileri
                 saat tersi, <strong>S</strong>&rsquo;in kıvrımı saat yönü gibidir.</p>` },

        { baslik: 'Akımı ters çevir',
          html: `<p>Pilin uçlarını değiştirirsen akım ters döner ve <strong>kutuplar yer
                 değiştirir</strong>. Kalıcı mıknatısta bunu yapamazsın — elektromıknatısın
                 asıl üstünlüğü budur.</p>` }
      ]
    }
  ]
},

/* -------------------------------------------------------- Simülasyon */
sim: F.simler['akim-makarasi'],

/* ------------------------------------------------------- Püf noktası */
puf: {
  html: `
    <p><strong>1 · Önce “halka mı solenoid mi?” diye sor.</strong> İki formül tamamen
    farklıdır ve karıştırılırsa sonuç yanlış çıkar:</p>
    <table class="degisken-tablo" style="margin-top:8px">
      <thead><tr><th></th><th>Formül</th><th>r var mı?</th><th>Alan</th></tr></thead>
      <tbody>
        <tr><td>Düz halka</td><td class="sembol">μ₀Ni/2r</td><td>VAR (ters orantı)</td><td>yalnız merkezde</td></tr>
        <tr><td>Solenoid</td><td class="sembol">μ₀ni</td><td><strong>YOK</strong></td><td>içeride her yerde</td></tr>
      </tbody>
    </table>

    <p style="margin-top:14px"><strong>2 · Solenoidde N tek başına anlamsızdır.</strong>
    Soruda “sarım sayısı 2 katına çıkarıldı” deniyorsa <strong>uzunluğa ne olduğunu</strong>
    ara. L de 2 katına çıktıysa n değişmez, <strong>B aynı kalır</strong>.</p>

    <p><strong>3 · Oranlar:</strong></p>
    <table class="degisken-tablo" style="margin-top:8px">
      <thead><tr><th>Değişiklik</th><th>Halka</th><th>Solenoid</th></tr></thead>
      <tbody>
        <tr><td>i → 2i</td><td class="sembol">2B</td><td class="sembol">2B</td></tr>
        <tr><td>N → 2N</td><td class="sembol">2B</td><td class="sembol">2B</td></tr>
        <tr><td>r → 2r</td><td class="sembol">B/2</td><td class="sembol">B (değişmez)</td></tr>
        <tr><td>L → 2L (N sabit)</td><td>—</td><td class="sembol">B/2</td></tr>
      </tbody>
    </table>

    <p style="margin-top:14px"><strong>4 · İki sağ el kuralını ayır.</strong> Düz telde
    başparmak <em>akım</em>, halkada başparmak <em>alan</em>. Aklında kalsın:
    <strong>sarılan şey her zaman çember olandır.</strong></p>

    <p><strong>5 · Kutup bulma kestirmesi:</strong> Baktığın uçtan akım saat yönünün
    <strong>tersine</strong> dolanıyorsa o uç <strong>N</strong>&rsquo;dir.</p>

    <p><strong>6 · Solenoidin ucunda alan yarıya iner.</strong> Soru “tam uçta” diyorsa
    <code>B = μ₀ni/2</code> kullanılır. Bu ayrıntı sorulursa çoğu öğrenci kaçırır.</p>

    <p><strong>7 · İçine demir çekirdek konursa alan katlanır.</strong> Kaç kat? Demirin
    <strong>bağıl geçirgenliği</strong> kadar — yüzlerce, bazen binlerce kat. Bir sonraki
    konunun konusu tam olarak budur.</p>`
},

/* ----------------------------------------------------- Zorlayıcı sorular */
osym: [
  {
    baslik: 'Sarımı da uzunluğu da iki katına çıkarmak',
    kaynak: 'Oran tuzağı',
    govde: `
      <p>Uzunluğu <strong>L</strong>, sarım sayısı <strong>N</strong> olan bir solenoidden
      <strong>i</strong> akımı geçmektedir ve içindeki manyetik alan <strong>B</strong>&rsquo;dir.</p>
      <p>Aynı telle, <strong>sarım sayısı 2N</strong> ve <strong>uzunluğu 2L</strong> olan yeni bir
      solenoid sarılıyor ve içinden yine <strong>i</strong> akımı geçiriliyor.</p>
      <p>Yeni solenoidin içindeki alan nedir?</p>`,
    secenekler: [
      'B (değişmez)',
      '2B',
      '4B',
      'B / 2',
      'B / 4'
    ],
    dogru: 0,
    cozum: `
      <p>Solenoidde alanı belirleyen şey N değil, <strong>n = N/L</strong> oranıdır:</p>
      <div class="formul" style="max-width:300px;margin:10px 0">
        <div class="fm">n′ = 2N / 2L = N / L = n</div>
      </div>
      <p>Sarım sıklığı <strong>değişmedi</strong>. Akım da aynı olduğuna göre:</p>
      <div class="formul" style="max-width:240px;margin:10px 0;border-top-color:var(--accent)">
        <div class="fm" style="color:var(--accent)">B′ = μ₀·n·i = B</div>
      </div>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>B şıkkı</strong> yalnızca N&rsquo;ye bakanlar için —
        bu konudaki bir numaralı hatadır. Solenoidde <em>toplam</em> sarım sayısı tek başına
        hiçbir şey söylemez.
        <br><strong>Sezgisel açıklama:</strong> Teli iki kat uzun bir silindire sardın;
        her santimetreye düşen sarım sayısı aynı kaldı. İçerideki bir nokta çevresinde
        <em>aynı sıklıkta</em> tel görüyor, dolayısıyla aynı alanı hissediyor.
        <br><strong>Karşılaştır:</strong> Bu bir <em>halka</em> olsaydı, N iki katına çıktığı
        için alan da iki katına çıkardı — orada uzunluk diye bir kavram yok.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: A</strong></p>`
  },
  {
    baslik: 'Halka mı, solenoid mi?',
    kaynak: 'Formül seçimi',
    govde: `
      <p>Aşağıdaki iki düzenek de <strong>aynı telden</strong>, <strong>aynı akımla</strong>
      çalışıyor:</p>
      <ul>
        <li><strong>I.</strong> Yarıçapı <strong>10 cm</strong> olan, <strong>100 sarımlı</strong> düz halka</li>
        <li><strong>II.</strong> Uzunluğu <strong>40 cm</strong> olan, <strong>100 sarımlı</strong> solenoid</li>
      </ul>
      <p>Akım her ikisinde de <strong>2 A</strong>&rsquo;dir. Merkezlerindeki manyetik alanların
      oranı <strong>B<sub>I</sub> / B<sub>II</sub></strong> kaçtır?
      (μ₀ = 4π·10⁻⁷ T·m/A)</p>`,
    secenekler: [
      '2',
      '1',
      '0,5',
      '4',
      '0,25'
    ],
    dogru: 0,
    cozum: `
      <p><strong>I — Halka:</strong></p>
      <p>B₁ = μ₀·N·i/(2r) = (4π·10⁻⁷ · 100 · 2) / (2 · 0,10)</p>
      <p>Pay: 4π·10⁻⁷ · 200 = 2,51·10⁻⁴ &nbsp;·&nbsp; Payda: 0,20</p>
      <p>B₁ = <strong>1,26·10⁻³ T = 1257 μT</strong></p>

      <p style="margin-top:12px"><strong>II — Solenoid:</strong></p>
      <p>n = N/L = 100 / 0,40 = <strong>250 sarım/m</strong></p>
      <p>B₂ = μ₀·n·i = 4π·10⁻⁷ · 250 · 2 = <strong>6,28·10⁻⁴ T = 628 μT</strong></p>

      <div class="formul" style="max-width:280px;margin:12px 0;border-top-color:var(--accent)">
        <div class="fm" style="color:var(--accent)">B₁ / B₂ = 1257 / 628 = 2</div>
      </div>

      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>Oranı formülden de görebilirsin:</strong>
        <br><code>B₁/B₂ = [μ₀Ni/2r] / [μ₀(N/L)i] = L / (2r) = 0,40 / 0,20 = 2</code>
        <br>N, i ve μ₀ sadeleşti — geriye yalnızca <strong>L/(2r)</strong> kaldı.
        Sayı koymadan da çözülebilirdi.
        <br><strong>D şıkkı</strong> solenoidde de r kullananlar için.
        <br><strong>B şıkkı</strong> “ikisi de 100 sarım, o hâlde aynı” diyenler için.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: A</strong></p>`
  }
],

/* --------------------------------------------- Bağlam temelli sorular */
baglam: [
  {
    baslik: 'MR cihazının mıknatısı',
    govde: `
      <p>Hastanelerdeki MR (manyetik rezonans) cihazının kalbi, hastanın içine girdiği
      <strong>dev bir solenoiddir</strong>. Görüntü kalitesi için çok güçlü ve çok
      <strong>düzgün</strong> bir manyetik alan gerekir.</p>
      <p>Tipik bir cihazda:</p>
      <ul>
        <li>İstenen alan: <strong>B = 1,5 T</strong></li>
        <li>Solenoid uzunluğu: <strong>L = 1,6 m</strong></li>
        <li>Akım: <strong>i = 200 A</strong></li>
      </ul>
      <p>Bu alanı elde etmek için kaç sarım gerekir? Sonucu yorumla: neden
      <strong>süper iletken</strong> tel kullanılmak zorunda?</p>
      <p>(μ₀ = 4π·10⁻⁷ T·m/A, π ≈ 3,14)</p>`,
    gorsel: `
      <svg viewBox="0 0 520 200" xmlns="http://www.w3.org/2000/svg" role="img"
           aria-label="MR cihazının silindirik solenoidi ve içindeki düzgün manyetik alan">
        <rect width="520" height="200" fill="#17223A"/>
        <rect x="90" y="40" width="340" height="120" rx="18" fill="#2E3D57"/>
        <rect x="120" y="66" width="280" height="68" rx="12" fill="#0E1726"/>
        <g stroke="#B87333" stroke-width="4">
          <path d="M120 40 V160 M160 40 V160 M200 40 V160 M240 40 V160 M280 40 V160 M320 40 V160 M360 40 V160 M400 40 V160"/>
        </g>
        <rect x="120" y="66" width="280" height="68" rx="12" fill="#0E1726"/>
        <g stroke="#38D6E0" stroke-width="2">
          <path d="M140 84 H380 M140 100 H380 M140 116 H380"/>
        </g>
        <g fill="#38D6E0">
          <path d="M386 84 l-10 -5 l0 10 z"/><path d="M386 100 l-10 -5 l0 10 z"/><path d="M386 116 l-10 -5 l0 10 z"/>
        </g>
        <ellipse cx="250" cy="100" rx="40" ry="11" fill="#C9A9A0"/>
        <text x="250" y="180" fill="#EAF0FA" font-size="12" font-family="system-ui" text-anchor="middle">L = 1,6 m · B = 1,5 T</text>
        <text x="454" y="100" fill="#38D6E0" font-size="12" font-family="system-ui">B</text>
      </svg>`,
    adimlar: [
      { bas: 'Doğru formülü seç',
        metin: 'Hasta solenoidin <strong>içinde</strong>, alan düzgün olmalı ⟹ <strong>B = μ₀·n·i</strong>' },
      { bas: 'n’i yalnız bırak',
        metin: 'n = B / (μ₀·i) = 1,5 / (4π·10⁻⁷ · 200)' },
      { bas: 'Paydayı hesapla',
        metin: '4π·10⁻⁷ ≈ 1,256·10⁻⁶<br>1,256·10⁻⁶ · 200 = <strong>2,51·10⁻⁴</strong>' },
      { bas: 'n’i bul',
        metin: 'n = 1,5 / 2,51·10⁻⁴ ≈ <strong>5970 sarım/m</strong>' },
      { bas: 'Toplam sarıma çevir',
        metin: 'N = n · L = 5970 · 1,6 ≈ <strong>9550 sarım</strong>' },
      { bas: 'Süper iletken sorusunu cevapla',
        metin: 'Yaklaşık on bin sarımdan <strong>200 A</strong> geçecek. Sıradan bakır telde bu akım muazzam ısı üretir (P = i²R) ve tel erir. Süper iletken telin direnci <strong>sıfırdır</strong>: ısı üretmez, bir kez akım başlatılınca sürekli döner. Bunun bedeli, bobinin sıvı helyumla <strong>−269 °C</strong> civarına soğutulmasıdır. MR cihazlarının pahalı ve gürültülü olmasının sebebi budur.' }
    ],
    secenekler: [
      'n ≈ 5970 sarım/m, N ≈ 9550 sarım; bakır telde i²R ısısı eritir, bu yüzden direnci sıfır olan süper iletken gerekir',
      'n ≈ 5970 sarım/m, N ≈ 9550 sarım; süper iletken yalnızca maliyeti düşürmek için kullanılır',
      'n ≈ 597 sarım/m, N ≈ 955 sarım; bakır tel de yeterlidir',
      'N hesaplanamaz çünkü solenoidin yarıçapı verilmemiş',
      'n ≈ 59 700 sarım/m, N ≈ 95 500 sarım; alan çok güçlü olduğu için'
    ],
    dogru: 0,
    cozum: `
      <p><strong>n = B/(μ₀i) ≈ 5970 sarım/m</strong> &nbsp;·&nbsp;
      <strong>N = n·L ≈ 9550 sarım</strong></p>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>D şıkkı</strong> önemli bir sınamadır: solenoid
        formülünde <strong>yarıçap yoktur</strong>, o yüzden verilmemesi eksiklik değildir.
        Soruyu çözemeyeceğini sanıp atlayan öğrenci bu tuzağa düşer.
        <br><strong>Ölçek duygusu:</strong> 1,5 T, Dünya&rsquo;nın alanının
        (50 μT) <strong>30 000 katıdır</strong>. Bu yüzden MR odasına metal eşya sokmak
        ciddi tehlikedir — alan, sandalyeyi bile fırlatabilir.
        <br><strong>Bağlantı:</strong> Faraday kafesi elektriksel alanı durduruyordu ama
        <em>statik manyetik alanı durdurmaz</em>. MR odaları bu yüzden ayrıca özel
        manyetik ekranlamayla korunur.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: A</strong></p>`
  },
  {
    baslik: 'Dünya’nın alanını iptal eden oda',
    govde: `
      <p>Bazı hassas deneylerde (beyin sinyallerinin ölçümü, kuantum deneyleri, uzay aracı
      parçalarının testi) ortamda <strong>hiç manyetik alan olmaması</strong> gerekir.
      Ama Dünya&rsquo;nın alanı her yerdedir: yaklaşık <strong>50 μT</strong>.</p>
      <p>Faraday kafesi burada işe yaramaz — o <strong>elektriksel</strong> alanı durdurur,
      statik manyetik alanı değil. Çözüm, odayı büyük bir <strong>solenoidin içine</strong>
      almak ve Dünya&rsquo;nın alanına <strong>tam ters yönde</strong> aynı büyüklükte bir
      alan üretmektir.</p>
      <p><strong>Solenoid 1 metrede 400 sarım içeriyorsa, Dünya&rsquo;nın alanını iptal etmek
      için kaç amperlik akım gerekir? Bu akım büyük mü?</strong>
      (μ₀ = 4π·10⁻⁷ T·m/A)</p>`,
    gorsel: `
      <svg viewBox="0 0 520 200" xmlns="http://www.w3.org/2000/svg" role="img"
           aria-label="Dünyanın manyetik alanını ters yönde alan üreterek iptal eden solenoid oda">
        <rect width="520" height="200" fill="#17223A"/>
        <g stroke="#5AA9E6" stroke-width="2">
          <path d="M20 44 H130 M20 100 H130 M20 156 H130"/>
        </g>
        <g fill="#5AA9E6">
          <path d="M136 44 l-10 -5 l0 10 z"/><path d="M136 100 l-10 -5 l0 10 z"/><path d="M136 156 l-10 -5 l0 10 z"/>
        </g>
        <text x="24" y="28" fill="#5AA9E6" font-size="11" font-family="system-ui">Dünya · 50 μT</text>
        <rect x="170" y="36" width="260" height="128" rx="10" fill="#0E1726" stroke="#2E3D57" stroke-width="2"/>
        <g stroke="#B87333" stroke-width="4">
          <path d="M190 36 V164 M230 36 V164 M270 36 V164 M310 36 V164 M350 36 V164 M390 36 V164"/>
        </g>
        <rect x="196" y="58" width="196" height="84" fill="#0E1726"/>
        <g stroke="#FF6B6B" stroke-width="2">
          <path d="M370 72 H216 M370 100 H216 M370 128 H216"/>
        </g>
        <g fill="#FF6B6B">
          <path d="M210 72 l10 -5 l0 10 z"/><path d="M210 100 l10 -5 l0 10 z"/><path d="M210 128 l10 -5 l0 10 z"/>
        </g>
        <text x="300" y="186" fill="#FF6B6B" font-size="11" font-family="system-ui" text-anchor="middle">solenoid · ters yönde 50 μT</text>
        <circle cx="300" cy="100" r="7" fill="#35C08A"/>
        <text x="452" y="104" fill="#35C08A" font-size="12" font-family="system-ui">B = 0</text>
      </svg>`,
    adimlar: [
      { bas: 'Hedefi yaz',
        metin: 'Solenoidin ürettiği alan, Dünya’nınkine <strong>eşit büyüklükte</strong> olmalı: B = 50 μT = <strong>5·10⁻⁵ T</strong>' },
      { bas: 'Formülü kur',
        metin: 'B = μ₀·n·i ⟹ i = B / (μ₀·n)' },
      { bas: 'Değerleri yerine koy',
        metin: 'i = 5·10⁻⁵ / (4π·10⁻⁷ · 400)<br>Payda: 1,256·10⁻⁶ · 400 = <strong>5,03·10⁻⁴</strong>' },
      { bas: 'Akımı bul',
        metin: 'i = 5·10⁻⁵ / 5,03·10⁻⁴ ≈ <strong>0,1 A = 100 mA</strong>' },
      { bas: 'Yorumla',
        metin: 'Yalnızca <strong>yüzde bir amper</strong> mertebesinde bir akım! Bir LED’in çektiği akım kadar. Dünya’nın alanı her yerde olsa da <strong>çok zayıftır</strong>; iptal etmek şaşırtıcı derecede kolaydır.' },
      { bas: 'Zor kısmı söyle',
        metin: 'Asıl zorluk büyüklük değil, <strong>kararlılık ve düzgünlük</strong>: akımın çok kararlı olması, solenoidin çok düzgün sarılması ve odanın yöneliminin sabit kalması gerekir. Ayrıca Dünya’nın alanı zamanla biraz değişir, bu yüzden sistem <strong>sürekli ölçüp düzeltir</strong>.' }
    ],
    secenekler: [
      'i ≈ 0,1 A; çok küçük bir akım — zor olan büyüklük değil, alanın kararlılığı ve düzgünlüğü',
      'i ≈ 10 A; büyük bir akım gerekir çünkü Dünya’nın alanı güçlüdür',
      'i ≈ 100 A; bu yüzden böyle odalar süper iletken kullanır',
      'Mümkün değildir; manyetik alan iptal edilemez',
      'Faraday kafesi yeterlidir, solenoide gerek yoktur'
    ],
    dogru: 0,
    cozum: `
      <p><strong>i = B/(μ₀n) = 5·10⁻⁵ / (4π·10⁻⁷ · 400) ≈ 0,1 A</strong></p>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>E şıkkı</strong> bu konunun en öğretici ayrımını
        yokluyor: <strong>Faraday kafesi manyetik alanı durdurmaz.</strong> İletkendeki
        yükler elektriksel alana karşı yeniden dizilebilir, ama durgun bir manyetik alana
        karşı yapabilecekleri bir şey yoktur. Manyetik ekranlama ya <em>aktif iptal</em>
        (bu soru) ya da <em>yüksek geçirgenlikli malzeme</em> (mumetal) ile yapılır.
        <br><strong>Ölçek:</strong> MR cihazı 1,5 T üretiyordu, burada iptal edilen 0,00005 T.
        Aradaki fark <strong>30 000 kat</strong> — aynı formül, çok farklı mertebeler.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: A</strong></p>`
  }
]

});
})();
