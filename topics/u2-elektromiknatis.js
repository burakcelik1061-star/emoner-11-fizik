(function () {
"use strict";
const F = window.F11;

/* ==========================================================================
   topics/u2-elektromiknatis.js
   Konu 2.2.4 · Elektromıknatıslar ve kullanım alanları  (MEB 11, s.213-217)
   ========================================================================== */

F.konuKaydet('u2-elektromiknatis', {

ozet: `Bir makaranın içine demir çekirdek koyarsan alan <strong>yüzlerce kat</strong> güçlenir.
Ortaya çıkan şey, kalıcı mıknatısın yapamadığı üç şeyi yapabilen bir mıknatıstır:
<strong>açılıp kapanır, şiddeti ayarlanır, kutupları ters çevrilebilir.</strong>
Zilden hurda vincine, röleden MR cihazına kadar her yerde bu üç özellik kullanılır.`,

/* ------------------------------------------------------------- Kavram */
kavram: `
<h3>Çekirdek ne yapıyor?</h3>
<p>Ferromanyetik maddelerin içinde <strong>manyetik bölgeler</strong> (domainler) vardır:
her biri kendi içinde hizalanmış, küçük birer mıknatıs gibi davranan bölgeler. Normalde
bu bölgeler rastgele yönlenmiştir ve etkileri birbirini götürür.</p>

<p>Makaranın alanı bu bölgeleri <strong>hizalar</strong>. Hizalanan bölgeler kendi
alanlarını makaranın alanına <strong>ekler</strong> — ve bu katkı, makaranın kendi
alanından kat kat büyüktür.</p>

<div class="formul" style="max-width:320px;margin:14px 0;border-top-color:var(--accent)">
  <div class="fm" style="color:var(--accent)">B = μ₀ · μ<sub>r</sub> · n · i</div>
  <div class="fm-ad">μ<sub>r</sub>: bağıl manyetik geçirgenlik</div>
</div>

<table class="degisken-tablo">
  <thead><tr><th>Çekirdek</th><th>μ<sub>r</sub> (etkin)</th><th>Doyma alanı</th></tr></thead>
  <tbody>
    <tr><td>Hava (çekirdeksiz)</td><td class="sembol">1</td><td>—</td></tr>
    <tr><td>Nikel</td><td class="sembol">≈ 100</td><td>0,6 T</td></tr>
    <tr><td>Ferrit</td><td class="sembol">≈ 600</td><td>0,4 T</td></tr>
    <tr><td>Yumuşak demir</td><td class="sembol">≈ 1200</td><td>1,8 T</td></tr>
  </tbody>
</table>
<p style="margin-top:10px;color:var(--text-2)">Tablodaki değerler, hava aralığı bulunan
<strong>gerçek</strong> bir elektromıknatıstaki etkin değerlerdir. Kapalı bir demir halkada
μ<sub>r</sub> birkaç bine çıkabilir.</p>

<h3 style="margin-top:22px">Doyma: formülün bittiği yer</h3>
<div class="kutu dikkat" style="margin:16px 0">
  <div class="kutu-bas"><span class="ikon">⚠</span><span>Alan sonsuza kadar büyümez</span></div>
  <p style="margin:0">Formül “akımı 10 katına çıkar, alan 10 katına çıksın” der. Gerçekte
  bir yerden sonra <strong>bütün bölgeler hizalanır</strong> ve eklenecek bir şey kalmaz.
  Bu sınıra <strong>doyma</strong> denir. Yumuşak demirde yaklaşık
  <strong>1,8 T</strong>&rsquo;dır.</p>
  <p style="margin:8px 0 0">Simülasyonda demir çekirdek seçip akımı artır: önce alan
  akımla orantılı büyür, sonra eğri <strong>bükülür</strong> ve yatay bir çizgiye oturur.
  “Doyma olmasa” satırı formülün ne diyeceğini, “Gerçek B” satırı gerçekte ne olduğunu
  gösterir. 10 A&rsquo;de formül 15 T diyor, gerçek 1,8 T.</p>
</div>

<h3 style="margin-top:22px">Neden yumuşak demir?</h3>
<p>Çekirdek malzemesi seçimi kritiktir ve <strong>iki ayrı özellik</strong> ister:</p>
<ul>
  <li><strong>Yumuşak demir:</strong> kolay mıknatıslanır, akım kesilince mıknatıslığını
  <strong>hemen kaybeder</strong>. Elektromıknatısın çekirdeği budur.</li>
  <li><strong>Sert çelik:</strong> zor mıknatıslanır ama mıknatıslığını
  <strong>korur</strong>. Kalıcı mıknatıs yapımında kullanılır.</li>
</ul>
<p>Hurda vincinde sert çelik kullanılsaydı, akımı kestiğinde hurda
<strong>yapışık kalırdı</strong> — vincin hiçbir işe yaramazdı. İstenen özellik burada
<em>mıknatıslığı çabuk bırakmaktır</em>.</p>

<h3 style="margin-top:22px">Kaldırma kuvveti</h3>
<div class="formul" style="max-width:300px;margin:14px 0">
  <div class="fm">F = B² · A / (2μ₀)</div>
  <div class="fm-ad">A: kutup yüzeyinin alanı</div>
</div>
<p><strong>Kuvvet B&rsquo;nin karesiyle artar.</strong> Alanı iki katına çıkarırsan kaldırma
gücü <strong>dört katına</strong> çıkar. Bu yüzden doymaya yaklaşmak bu kadar değerlidir —
ve bu yüzden doymadan sonra akımı artırmanın hiçbir faydası yoktur.</p>

<div class="kutu puf" style="margin:16px 0">
  <div class="kutu-bas"><span class="ikon">🔧</span><span>Formül ideal bir üst sınırdır</span></div>
  <p style="margin:0">Bu formül, kutup yüzeyinin demire <strong>kusursuz</strong> yapıştığını
  varsayar. Gerçekte pas, boya, yüzey pürüzü ve hurdanın düz olmaması yüzünden temas
  kısmidir. Sanayi kataloglarındaki değerler ideal hesabın kabaca
  <strong>üçte biri ile yarısı</strong> arasındadır. Simülasyon bu çarpanı uyguluyor ve
  “ideal” ile “gerçek” değerleri yan yana gösteriyor.</p>
</div>

<h3 style="margin-top:22px">Nerede kullanılıyor?</h3>
<table class="degisken-tablo">
  <thead><tr><th>Uygulama</th><th>Kullanılan özellik</th></tr></thead>
  <tbody>
    <tr><td>Hurda vinci</td><td>açılıp kapanma</td></tr>
    <tr><td>Elektrikli zil</td><td>hızlı açılıp kapanma</td></tr>
    <tr><td>Röle</td><td>küçük akımla büyük akımı kontrol</td></tr>
    <tr><td>Hoparlör</td><td>akımla değişen kuvvet</td></tr>
    <tr><td>MR cihazı</td><td>çok güçlü ve düzgün alan</td></tr>
    <tr><td>Maglev treni</td><td>itme/çekme ile havada tutma</td></tr>
    <tr><td>Manyetik kilit</td><td>elektrik kesilince açılma</td></tr>
  </tbody>
</table>`,

/* ---------------------------------------------------------- Formüller */
formuller: {
  liste: [
    { fm: 'B = μ₀·μ<sub>r</sub>·n·i',  aciklama: 'Çekirdekli makaranın alanı' },
    { fm: 'B ≤ B<sub>doyma</sub>',     aciklama: 'Malzemenin aşılamayan sınırı' },
    { fm: 'F = B²·A / (2μ₀)',          aciklama: 'Kaldırma kuvveti — ideal üst sınır' },
    { fm: 'F ∝ B²',                    aciklama: 'Alan 2 katına → kuvvet 4 katına' },
    { fm: 'n = N / L',                 aciklama: 'Birim uzunluktaki sarım sayısı' }
  ],
  degiskenler: [
    { sembol: 'μ<sub>r</sub>', ad: 'Bağıl manyetik geçirgenlik', birim: '—' },
    { sembol: 'B', ad: 'Manyetik alan',    birim: 'T' },
    { sembol: 'A', ad: 'Kutup yüzey alanı', birim: 'm²' },
    { sembol: 'F', ad: 'Kaldırma kuvveti',  birim: 'N' },
    { sembol: 'i', ad: 'Akım',              birim: 'A' }
  ]
},

/* ------------------------------------------------------------ Türetim */
turetim: {
  yollar: [
    {
      ad: 'Çekirdek alanı neden katlıyor?',
      adimlar: [
        { baslik: 'Domainleri tanı',
          html: `<p>Demirin içi, her biri kendi içinde hizalanmış milyarlarca küçük
                 bölgeden oluşur. Her bölge küçük bir mıknatıstır.</p>` },

        { baslik: 'Normalde neden mıknatıs değil?',
          html: `<p>Bölgeler <strong>rastgele</strong> yönlenmiştir. Toplamları sıfırdır,
                 bu yüzden sıradan bir demir çubuk mıknatıs gibi davranmaz.</p>` },

        { baslik: 'Makaranın alanını uygula',
          html: `<p>Dışarıdan bir alan gelince bölgeler <strong>hizalanmaya</strong> başlar.
                 Hizalananların alanları artık birbirini götürmez, <strong>toplanır</strong>.</p>` },

        { baslik: 'Sonucu yaz',
          html: `<p>Toplam alan, makaranın kendi alanının μ<sub>r</sub> katı olur:</p>
                 <div class="formul" style="max-width:260px;border-top-color:var(--accent)">
                   <div class="fm" style="color:var(--accent)">B = μ₀·μ<sub>r</sub>·n·i</div>
                 </div>
                 <p>Yani alanın çoğunu üreten şey <strong>akım değil, demirdir</strong>.
                 Akım yalnızca demiri hizalamaya yarar.</p>` }
      ]
    },
    {
      ad: 'Doyma neden kaçınılmaz?',
      adimlar: [
        { baslik: 'Sonlu sayıda bölge var',
          html: `<p>Demirde belirli sayıda domain vardır. Akımı artırdıkça daha fazlası
                 hizalanır ve alan büyür.</p>` },

        { baslik: 'Hepsi hizalanınca ne olur?',
          html: `<p>Bir noktada <strong>hepsi</strong> hizalanmış olur. Artık eklenecek
                 yeni bir katkı yoktur.</p>` },

        { baslik: 'Formülü sınırla',
          html: `<p>Bu noktadan sonra akımı artırmak yalnızca μ₀·n·i kadarlık
                 <strong>çok küçük</strong> bir katkı ekler — yani çekirdek sanki yokmuş gibi:</p>
                 <div class="formul" style="max-width:280px;border-top-color:var(--accent)">
                   <div class="fm" style="color:var(--accent)">B → B<sub>doyma</sub></div>
                 </div>` },

        { baslik: 'Sonuçlarını gör',
          html: `<p>Doymuş bir elektromıknatısta akımı artırmak:</p>
                 <ul>
                   <li>Alanı <strong>neredeyse hiç</strong> artırmaz</li>
                   <li>Kaldırma gücünü <strong>artırmaz</strong> (F ∝ B²)</li>
                   <li>Ama ısınmayı <strong>artırır</strong> (P = i²R)</li>
                 </ul>
                 <p>Yani doymadan sonra akım artırmak yalnızca <strong>zarar</strong> verir.
                 Bu, mühendislikte tasarım sınırını belirleyen gerçek bir kısıttır.</p>` }
      ]
    },
    {
      ad: 'Zil kendi kendini nasıl kesiyor?',
      adimlar: [
        { baslik: 'Devre kapalı',
          html: `<p>Düğmeye basılır, devre tamamlanır, akım geçer ve elektromıknatıs
                 mıknatıslanır.</p>` },

        { baslik: 'Dil çekilir',
          html: `<p>Elektromıknatıs, yaya bağlı demir dili kendine çeker. Dilin ucundaki
                 tokmak çana <strong>vurur</strong>.</p>` },

        { baslik: 'İşin püf noktası',
          html: `<p>Dil hareket ederken <strong>devrenin kontağını da açar</strong>. Akım
                 kesilir ⟹ elektromıknatıs mıknatıslığını <strong>anında</strong> kaybeder.
                 (Burada yumuşak demir kullanılmasının sebebi budur.)</p>` },

        { baslik: 'Yay geri çeker, döngü kapanır',
          html: `<p>Çekim kalkınca yay dili geri çeker, kontak <strong>yeniden kapanır</strong>,
                 akım tekrar geçer. Döngü saniyede onlarca kez tekrarlanır ve zilin
                 karakteristik sesi çıkar.</p>
                 <p>Bu düzeneğe <strong>kesintili (kendinden kesmeli) devre</strong> denir ve
                 aynı fikir eski kapı zillerinden araç kornalarına kadar kullanılır.</p>` }
      ]
    }
  ]
},

/* -------------------------------------------------------- Simülasyon */
sim: F.simler['elektromiknatis'],

/* ------------------------------------------------------- Püf noktası */
puf: {
  html: `
    <p><strong>1 · Çekirdek çarpanı doğrudan μ<sub>r</sub>&rsquo;dir.</strong> “Havaya göre
    kaç kat güçlendi?” sorusunun cevabı, doyma yoksa <strong>μ<sub>r</sub></strong> kadardır.</p>

    <p><strong>2 · Doyma sorusunu tanı.</strong> Soru “akım 4 katına çıkarıldığında alan kaç
    katına çıkar?” diyorsa ve çekirdek <em>zaten doymuşsa</em> cevap <strong>1 kat
    (değişmez)</strong>&rsquo;dır. Doyma belirtilmemişse doğrusal davran.</p>

    <p><strong>3 · F ∝ B² olduğunu unutma.</strong></p>
    <table class="degisken-tablo" style="margin-top:8px">
      <thead><tr><th>Değişiklik</th><th>B</th><th>F</th></tr></thead>
      <tbody>
        <tr><td>i → 2i (doymamışsa)</td><td class="sembol">2B</td><td class="sembol">4F</td></tr>
        <tr><td>N → 2N (doymamışsa)</td><td class="sembol">2B</td><td class="sembol">4F</td></tr>
        <tr><td>A → 2A</td><td class="sembol">B</td><td class="sembol">2F</td></tr>
        <tr><td>i → 2i (doymuşsa)</td><td class="sembol">B</td><td class="sembol">F</td></tr>
      </tbody>
    </table>

    <p style="margin-top:14px"><strong>4 · Çekirdek malzemesi sorusu iki yönlüdür.</strong>
    Elektromıknatıs isteniyorsa <strong>yumuşak demir</strong> (mıknatıslığı bırakmalı),
    kalıcı mıknatıs isteniyorsa <strong>sert çelik</strong> (mıknatıslığı korumalı).
    Şıklarda ikisi de bulunur.</p>

    <p><strong>5 · Kutupları akımın yönü belirler.</strong> Pilin uçları değişirse N ve S
    yer değiştirir. Kalıcı mıknatısta bu imkânsızdır — sorularda ayırt edici özellik budur.</p>

    <p><strong>6 · Röle mantığı:</strong> küçük akımlı bir devre, elektromıknatıs aracılığıyla
    büyük akımlı bir devreyi <em>açıp kapatır</em>. İki devre birbirine
    <strong>elektriksel olarak bağlı değildir</strong> — yalnızca manyetik olarak etkileşir.</p>

    <p><strong>7 · Isınma sınırı gerçek bir kısıttır.</strong> “Akımı istediğin kadar artır”
    diyen şık yanlıştır: <code>P = i²R</code> ile üretilen ısı teli eritir. Bu yüzden MR gibi
    çok güçlü mıknatıslarda <strong>süper iletken</strong> tel kullanılır.</p>`
},

/* ----------------------------------------------------- Zorlayıcı sorular */
osym: [
  {
    baslik: 'Doymuş çekirdekte akımı artırmak',
    kaynak: 'Gerçekçilik tuzağı',
    govde: `
      <p>Yumuşak demir çekirdekli bir elektromıknatıs, <strong>doyma alanına ulaşmış</strong>
      durumda çalışmaktadır ve <strong>800 kg</strong>&rsquo;lık bir yükü kaldırmaktadır.</p>
      <p>Operatör daha ağır bir yük kaldırabilmek için <strong>akımı iki katına</strong>
      çıkarıyor.</p>
      <p>Buna göre aşağıdakilerden hangisi <strong>doğrudur</strong>?</p>`,
    secenekler: [
      'Kaldırma kapasitesi hemen hemen değişmez; yalnızca bobin daha çok ısınır',
      'Kaldırma kapasitesi iki katına çıkar (1600 kg)',
      'Kaldırma kapasitesi dört katına çıkar (3200 kg)',
      'Kaldırma kapasitesi yarıya iner',
      'Çekirdek kalıcı mıknatıs hâline gelir'
    ],
    dogru: 0,
    cozum: `
      <p><strong>Doyma, formülün bittiği yerdir.</strong> Bütün domainler zaten hizalanmış
      durumda; akımı artırmak hizalanacak yeni bölge bulamaz.</p>
      <div class="formul" style="max-width:280px;margin:10px 0">
        <div class="fm">B ≈ B<sub>doyma</sub> ⟹ değişmez</div>
      </div>
      <p>Kaldırma kuvveti <code>F = B²A/(2μ₀)</code> ile B&rsquo;ye bağlı olduğuna göre,
      B değişmediyse <strong>F de değişmez</strong>.</p>
      <p><strong>Ama bir şey değişir:</strong> bobinde açığa çıkan ısı</p>
      <div class="formul" style="max-width:240px;margin:10px 0;border-top-color:var(--red)">
        <div class="fm" style="color:var(--red)">P = i²·R ⟹ 4 katına çıkar</div>
      </div>
      <p>Yani akımı iki katına çıkarmak, hiçbir kazanç sağlamadan ısınmayı
      <strong>dört katına</strong> çıkarır — bobini yakabilir.</p>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>C şıkkı</strong> F ∝ B² ilişkisini doğru kurup doymayı
        gözden kaçıranlar için — en akla yatkın yanlış cevap budur.
        <br><strong>Doğru çözüm yolu:</strong> Daha ağır yük için akım değil,
        <strong>kutup yüzeyini büyütmek</strong> gerekir (F ∝ A). Simülasyonda “Kutup çapı”nı
        14&rsquo;ten 30 cm&rsquo;ye çıkar: kaldırma 794 kg&rsquo;dan 3645 kg&rsquo;a fırlar,
        üstelik akım hiç değişmeden.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: A</strong></p>`
  },
  {
    baslik: 'Hangi çekirdek, hangi iş?',
    kaynak: 'Malzeme seçimi',
    govde: `
      <p>Aşağıdaki üç iş için çekirdek malzemesi seçilecektir:</p>
      <ol style="margin-left:.2em">
        <li><strong>Hurda vincinin</strong> elektromıknatısı</li>
        <li><strong>Buzdolabı magnetinin</strong> mıknatısı</li>
        <li><strong>Kapı zilinin</strong> elektromıknatısı</li>
      </ol>
      <p>Hangi eşleştirme <strong>doğrudur</strong>?</p>`,
    secenekler: [
      'I → yumuşak demir · II → sert çelik · III → yumuşak demir',
      'I → sert çelik · II → sert çelik · III → sert çelik',
      'I → yumuşak demir · II → yumuşak demir · III → sert çelik',
      'I → sert çelik · II → yumuşak demir · III → yumuşak demir',
      'Üçünde de aynı malzeme kullanılır'
    ],
    dogru: 0,
    cozum: `
      <p>Ölçüt tek bir soru: <strong>mıknatıslığı korumalı mı, bırakmalı mı?</strong></p>
      <table class="degisken-tablo">
        <thead><tr><th>İş</th><th>İstenen</th><th>Malzeme</th></tr></thead>
        <tbody>
          <tr><td>Hurda vinci</td><td>akım kesilince <strong>bırakmalı</strong></td><td class="sembol">yumuşak demir</td></tr>
          <tr><td>Buzdolabı magneti</td><td>sürekli <strong>korumalı</strong></td><td class="sembol">sert çelik</td></tr>
          <tr><td>Kapı zili</td><td>saniyede onlarca kez <strong>bırakmalı</strong></td><td class="sembol">yumuşak demir</td></tr>
        </tbody>
      </table>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>Zil neden özellikle kritik?</strong> Zil saniyede onlarca
        kez mıknatıslanıp mıknatıssızlaşmalı. Sert çelik kullanılsaydı çekirdek ilk vuruştan
        sonra mıknatıslı kalır, dil geri dönmez ve <strong>zil tek ses çıkarıp susardı</strong>.
        <br><strong>Hurda vincinde</strong> ise sert çelik felaket olurdu: operatör akımı
        kesse bile hurda yapışık kalır, vinç işe yaramazdı.
        <br><strong>Genel kural:</strong> Elektromıknatıs çekirdeği <em>her zaman</em> yumuşak
        demirdir. Sert çelik yalnızca kalıcı mıknatıs yapımında kullanılır.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: A</strong></p>`
  }
],

/* --------------------------------------------- Bağlam temelli sorular */
baglam: [
  {
    baslik: 'Hurda sahasındaki vinç',
    govde: `
      <p>Hurda sahalarında vinçlerin ucunda büyük, yassı bir disk vardır. Operatör bir
      düğmeye basar, disk hurdayı <strong>çeker</strong>; kamyonun üstüne gelince düğmeyi
      bırakır ve hurda <strong>düşer</strong>.</p>
      <p>Bir öğrenci soruyor: <em>“Neden kalıcı mıknatıs kullanmıyorlar? Hem elektrik
      harcamazdı, hem de elektrik kesilse bile çalışırdı.”</em></p>
      <p>Bir de sayı: sahadaki vincin kutup çapı <strong>30 cm</strong> ve çekirdeği
      <strong>doymuş</strong> durumda (B = 1,8 T).</p>
      <p><strong>Öğrencinin sorusunu cevapla ve vincin kaldırabileceği kütleyi hesapla.</strong>
      (μ₀ = 4π·10⁻⁷, g = 10 m/s², gerçek temas verimi ≈ 0,40)</p>`,
    gorsel: `
      <svg viewBox="0 0 520 210" xmlns="http://www.w3.org/2000/svg" role="img"
           aria-label="Hurda vincinin elektromıknatısı ve kaldırdığı hurda yığını">
        <rect width="520" height="210" fill="#17223A"/>
        <rect x="0" y="182" width="520" height="28" fill="#5A5245"/>
        <path d="M60 182 V30 H300" stroke="#C9A24B" stroke-width="10" fill="none"/>
        <path d="M300 30 V64" stroke="#3A4049" stroke-width="3"/>
        <rect x="256" y="64" width="88" height="20" rx="4" fill="#6E7684"/>
        <rect x="262" y="84" width="76" height="12" rx="3" fill="#4A5059"/>
        <g stroke="#B87333" stroke-width="3">
          <path d="M262 70 H338 M262 76 H338"/>
        </g>
        <path d="M268 96 q 32 26 64 0" fill="#7D8A99"/>
        <circle cx="284" cy="106" r="13" fill="#7D8A99"/>
        <circle cx="308" cy="110" r="11" fill="#6E7684"/>
        <circle cx="296" cy="122" r="10" fill="#8A97A6"/>
        <text x="300" y="150" fill="#EAF0FA" font-size="12" font-family="system-ui" text-anchor="middle">hurda</text>
        <text x="410" y="76" fill="#38D6E0" font-size="12" font-family="system-ui">B = 1,8 T</text>
        <text x="410" y="94" fill="#6F84A8" font-size="11" font-family="system-ui">çap 30 cm</text>
        <rect x="80" y="150" width="90" height="32" rx="4" fill="#3A4049"/>
        <text x="125" y="170" fill="#8FB6EC" font-size="11" font-family="system-ui" text-anchor="middle">kamyon</text>
      </svg>`,
    adimlar: [
      { bas: 'Öğrencinin sorusunu ciddiye al',
        metin: 'Söyledikleri doğru: kalıcı mıknatıs elektrik harcamaz ve kesintiden etkilenmez. Ama <strong>bir sorunu vardır</strong>.' },
      { bas: 'Sorunu adlandır',
        metin: 'Kalıcı mıknatıs <strong>kapatılamaz</strong>. Hurdayı çeker ama <strong>bırakamaz</strong>. Vincin işi hurdayı taşımak <em>ve indirmek</em> olduğuna göre, bırakamayan bir mıknatıs işe yaramaz.' },
      { bas: 'Kutup alanını hesapla',
        metin: 'r = 15 cm = 0,15 m<br>A = πr² = 3,14 · 0,0225 = <strong>0,0707 m²</strong>' },
      { bas: 'İdeal kuvveti bul',
        metin: 'F = B²A/(2μ₀) = (1,8² · 0,0707) / (2 · 1,256·10⁻⁶)<br>Pay: 3,24 · 0,0707 = 0,229<br>Payda: 2,51·10⁻⁶<br>F<sub>ideal</sub> ≈ <strong>91 200 N</strong>' },
      { bas: 'Gerçek değere geç',
        metin: 'Temas kusursuz değil: F ≈ 91 200 · 0,40 ≈ <strong>36 500 N</strong><br>m = F/g = 36 500/10 ≈ <strong>3650 kg ≈ 3,6 ton</strong>' },
      { bas: 'Güvenlik notunu ekle',
        metin: 'Elektrik kesilirse hurda <strong>düşer</strong>. Bu yüzden gerçek vinçlerde yedek akü bulunur ve mıknatısın altından geçmek kesinlikle yasaktır. Yani öğrencinin “elektrik kesilse bile çalışırdı” itirazı haklı bir <em>riski</em> işaret ediyor — ama bu risk, bırakabilme yeteneği için ödenen bedeldir.' }
    ],
    secenekler: [
      'Kalıcı mıknatıs hurdayı bırakamaz; vinç ≈ 3,6 ton kaldırır',
      'Kalıcı mıknatıs yeterince güçlü değildir; vinç ≈ 3,6 ton kaldırır',
      'Kalıcı mıknatıs çok pahalıdır; vinç ≈ 9,1 ton kaldırır',
      'Kalıcı mıknatıs zamanla mıknatıslığını yitirir; vinç ≈ 360 kg kaldırır',
      'Kalıcı mıknatıs kullanılabilir, elektromıknatıs yalnızca alışkanlıktır'
    ],
    dogru: 0,
    cozum: `
      <p><strong>Asıl sebep bırakabilmektir.</strong> Vincin değeri çekmesinde değil,
      <strong>istediği anda bırakabilmesinde</strong>dir.</p>
      <div class="formul" style="max-width:340px;margin:10px 0;border-top-color:var(--accent)">
        <div class="fm" style="color:var(--accent)">F ≈ 91 200 × 0,40 ≈ 36 500 N ⟹ m ≈ 3,6 ton</div>
      </div>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>C şıkkı</strong> ideal formülü kullanıp temas verimini
        atlayanlar için — hesap doğru ama gerçeğin iki buçuk katı.
        <br><strong>B şıkkı</strong> güç sorunu olduğunu sanıyor; oysa neodim kalıcı
        mıknatıslar da 1 T üzerine çıkabilir. Sorun güç değil, <em>kontrol</em>.
        <br><strong>Mühendislik notu:</strong> Gerçekte bir ara çözüm de var:
        <em>elektro-kalıcı mıknatıslar</em>. Kısa bir akım darbesiyle açılıp yine bir
        darbeyle kapanırlar; arada elektrik harcamazlar. Elektrik kesilse yük düşmez.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: A</strong></p>`
  },
  {
    baslik: 'Arabanın marş rölesi',
    govde: `
      <p>Bir otomobilin marş motoru çalışırken <strong>200 A</strong> gibi çok büyük bir akım
      çeker. Bu akımı taşıyacak kablo, başparmak kalınlığındadır.</p>
      <p>Buna rağmen kontak anahtarına giden ince kablodan yalnızca <strong>0,5 A</strong>
      geçer. Anahtarı çevirdiğinde 200 A&rsquo;lik devreyi kapatan şey senin elin değildir.</p>
      <p>Aradaki eleman bir <strong>röledir</strong>: küçük akımla çalışan bir
      elektromıknatıs, büyük akımlı devrenin kontağını kapatır.</p>
      <p><strong>Röle olmasaydı ne olurdu? Rölenin iki devresi birbirine elektriksel olarak
      bağlı mıdır?</strong></p>`,
    gorsel: `
      <svg viewBox="0 0 520 210" xmlns="http://www.w3.org/2000/svg" role="img"
           aria-label="Rölede küçük akımlı kontrol devresi ve büyük akımlı marş devresi">
        <rect width="520" height="210" fill="#17223A"/>
        <rect x="20" y="30" width="230" height="150" rx="8" fill="#0E1726" stroke="#2E3D57"/>
        <text x="135" y="50" fill="#8FB6EC" font-size="12" font-family="system-ui" text-anchor="middle">kontrol devresi · 0,5 A</text>
        <circle cx="60" cy="110" r="16" fill="none" stroke="#9AA5B1" stroke-width="3"/>
        <text x="60" y="140" fill="#EAF0FA" font-size="10" font-family="system-ui" text-anchor="middle">anahtar</text>
        <rect x="150" y="90" width="20" height="44" fill="#6E7684"/>
        <g stroke="#B87333" stroke-width="3">
          <path d="M146 98 H174 M146 106 H174 M146 114 H174 M146 122 H174"/>
        </g>
        <text x="160" y="156" fill="#EAF0FA" font-size="10" font-family="system-ui" text-anchor="middle">elektromıknatıs</text>
        <path d="M76 110 H146" stroke="#8FB6EC" stroke-width="2"/>
        <rect x="270" y="30" width="230" height="150" rx="8" fill="#0E1726" stroke="#2E3D57"/>
        <text x="385" y="50" fill="#FF6B6B" font-size="12" font-family="system-ui" text-anchor="middle">marş devresi · 200 A</text>
        <path d="M290 110 H340" stroke="#FF6B6B" stroke-width="7"/>
        <path d="M360 110 H470" stroke="#FF6B6B" stroke-width="7"/>
        <path d="M340 110 L358 100" stroke="#FFB020" stroke-width="4"/>
        <text x="350" y="86" fill="#FFB020" font-size="10" font-family="system-ui" text-anchor="middle">kontak</text>
        <circle cx="470" cy="110" r="20" fill="#4A5059"/>
        <text x="470" y="150" fill="#EAF0FA" font-size="10" font-family="system-ui" text-anchor="middle">marş motoru</text>
        <path d="M186 110 L268 104" stroke="#6F84A8" stroke-width="1.6" stroke-dasharray="5 4"/>
        <text x="228" y="96" fill="#6F84A8" font-size="10" font-family="system-ui" text-anchor="middle">manyetik</text>
      </svg>`,
    adimlar: [
      { bas: 'Röle olmasaydı ne gerekirdi?',
        metin: 'Kontak anahtarından doğrudan <strong>200 A</strong> geçmesi gerekirdi. Bu, direksiyona kadar başparmak kalınlığında kablo çekmek demektir.' },
      { bas: 'Sorunları say',
        metin: 'Kablo <strong>ağır ve pahalı</strong> olurdu; anahtar kontakları her çevirmede <strong>kıvılcım çıkarıp yanardı</strong>; sürücünün eli yüksek akımlı bir devreye bu kadar yakın olurdu.' },

      { bas: 'Rölenin çözümü',
        metin: 'Kalın kablo yalnızca <strong>akü ile motor arasında</strong>, en kısa yoldan çekilir. Direksiyona giden ince kablo yalnızca elektromıknatısı besler.' },
      { bas: 'İki devre bağlı mı?',
        metin: '<strong>Hayır.</strong> Aralarında elektriksel bağlantı yoktur. Kontrol devresi bir <strong>manyetik alan</strong> üretir, o alan mekanik bir kontağı kapatır. Bu ayrıma <strong>yalıtım</strong> denir ve güvenliğin temelidir.' },
      { bas: 'Genelle',
        metin: 'Aynı fikir her yerde: klima kompresörü, elektrikli ısıtıcı, sanayi motorları, bilgisayar güç kaynakları. Küçük ve güvenli bir sinyal, büyük ve tehlikeli bir gücü kontrol eder.' }
    ],
    secenekler: [
      'Kalın kablo direksiyona kadar çekilir, anahtar kontakları yanardı; iki devre elektriksel olarak bağlı değildir, yalnızca manyetik etkileşir',
      'Hiçbir şey değişmezdi; röle yalnızca maliyeti düşürür',
      'Marş motoru çalışmazdı; iki devre aynı kablolarla bağlıdır',
      'Akü daha çabuk biterdi; iki devre elektriksel olarak bağlıdır',
      'Röle akımı 200 A’den 0,5 A’ye düşürür'
    ],
    dogru: 0,
    cozum: `
      <p>Rölenin iki kazancı var: <strong>kalın kabloyu kısaltmak</strong> ve
      <strong>iki devreyi birbirinden yalıtmak</strong>.</p>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>E şıkkı</strong> çok yaygın bir yanılgıdır: röle akımı
        <em>düşürmez</em>. Marş motoru yine 200 A çeker. Röle yalnızca o akımın
        <strong>nereden geçeceğini</strong> değiştirir.
        <br><strong>Elektromıknatısın hangi özelliği kullanılıyor?</strong> Tam olarak bu
        konunun başındaki üç özellikten biri: <strong>açılıp kapanabilmesi</strong>.
        Kalıcı mıknatısla röle yapılamaz.
        <br><strong>Ses ipucu:</strong> Kontağı çevirdiğinde duyduğun o “tak” sesi, rölenin
        demir dilinin çekilme sesidir. Akü zayıfsa röle çekip bırakır ve
        <em>tak-tak-tak</em> diye ses gelir — elektromıknatıs yeterli akımı bulamıyordur.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: A</strong></p>`
  }
]

});
})();
