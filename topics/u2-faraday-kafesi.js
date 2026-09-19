(function () {
"use strict";
const F = window.F11;

/* ==========================================================================
   topics/u2-faraday-kafesi.js
   Konu 2.1.3 · Faraday kafesi   (MEB 11, s.178-185)
   ========================================================================== */

F.konuKaydet('u2-faraday-kafesi', {

ozet: `Dengeye gelmiş bir iletkenin <strong>içinde elektriksel alan sıfırdır</strong>. Bu tek
cümle, uçağa yıldırım çarpmasına rağmen yolcuların hiçbir şey hissetmemesini, asansörde
telefonun çekmemesini ve hassas laboratuvarların neden metalle kaplandığını birlikte
açıklar.`,

/* ------------------------------------------------------------- Kavram */
kavram: `
<h3>Önce yükler nereye gider?</h3>
<p>Bir iletkene yük verirsek, yükler <strong>serbestçe hareket edebildikleri</strong> için
birbirini iter ve <strong>birbirinden olabildiğince uzaklaşır</strong>. Bir cismin
içinde birbirinden en uzak durabilecekleri yer neresidir? <strong>Dış yüzey.</strong></p>

<div class="formul" style="max-width:340px;margin:14px 0;border-top-color:var(--accent)">
  <div class="fm" style="color:var(--accent)">Fazla yük daima DIŞ YÜZEYDE toplanır</div>
  <div class="fm-ad">İletkenin içinde net yük kalmaz</div>
</div>

<p>İçeride yük kalmadığına göre içeride alan da yoktur. Bu, iletkenin
<strong>kendi</strong> yükü için geçerli. Peki dışarıdan bir alan uygulanırsa?</p>

<h3 style="margin-top:22px">Dış alan geldiğinde: aktif dengeleme</h3>
<p>İletken düzgün bir dış alanın içine konunca serbest elektronlar alanın tersi yönde
kayar. Bir yüzde <strong>eksi</strong>, karşı yüzde <strong>artı</strong> yük birikir.
Bu ayrışan yükler <strong>kendi alanlarını</strong> yaratır ve bu alan dış alanın
<strong>tam tersi</strong> yöndedir.</p>

<div class="formul" style="max-width:380px;margin:14px 0">
  <div class="fm">E<sub>iç</sub> = E<sub>dış</sub> + E<sub>ind</sub> = 0</div>
  <div class="fm-ad">Yük ayrışması, dış alanı tam olarak götürecek kadar sürer</div>
</div>

<div class="kutu dikkat" style="margin:16px 0">
  <div class="kutu-bas"><span class="ikon">⚠</span><span>En sık yanlış anlaşılan nokta</span></div>
  <p style="margin:0">Kafes dış alanı <strong>durdurmaz veya emmez</strong>. Dış alan
  olduğu gibi oradadır. Olan şey şudur: iletken, dış alanı <strong>tam olarak
  götürecek kadar</strong> kendi alanını üretir ve toplam sıfırlanır. Yani kalkan pasif
  bir duvar değil, <strong>aktif bir dengelemedir</strong>. Simülasyonda sağdaki panelde
  üç oku birlikte izle: E_dış sabit kalır, E_ind büyür, E_iç sıfıra iner.</p>
</div>

<p>Bu dengeleme <strong>inanılmaz hızlıdır</strong> — bakır gibi iyi bir iletkende
mertebesi <code>10⁻¹⁹ s</code>&rsquo;dir. Simülasyonda görebilmen için yavaşlatıldı.</p>

<h3 style="margin-top:22px">Kafesin delikli olması sorun değil</h3>
<p>Faraday kafesi <strong>kapalı bir kutu olmak zorunda değildir</strong>; tel örgü de
işe yarar. Koşul şudur: <strong>göz aralığı, engellenecek dalganın boyundan çok küçük
olmalıdır.</strong></p>
<table class="degisken-tablo">
  <thead><tr><th>Dalga</th><th>Dalga boyu λ</th><th>Gereken göz</th></tr></thead>
  <tbody>
    <tr><td>Cep telefonu (900 MHz)</td><td class="sembol">33 cm</td><td>birkaç cm yeter</td></tr>
    <tr><td>Mikrodalga fırın (2450 MHz)</td><td class="sembol">12 cm</td><td>1 mm delikler yeter</td></tr>
    <tr><td>Görünür ışık</td><td class="sembol">≈ 0,0005 mm</td><td>engellenemez — bu yüzden içeriyi görürsün</td></tr>
  </tbody>
</table>
<p style="margin-top:10px;color:var(--text-2)">Mikrodalga fırının kapağındaki delikli metal
levhanın sırrı budur: mikrodalgayı tutar, ışığı geçirir.</p>

<h3 style="margin-top:22px">Nerede karşımıza çıkıyor?</h3>
<ul>
  <li><strong>Uçak ve otomobil:</strong> yıldırım çarpsa bile yük gövdenin dış yüzeyinden akar</li>
  <li><strong>Asansör:</strong> metal kabin sinyali kestiği için telefon çekmez</li>
  <li><strong>MR odaları ve hassas laboratuvarlar:</strong> dış elektriksel gürültüden yalıtılır</li>
  <li><strong>Ekranlı (shield) kablolar:</strong> sinyal kablosunun etrafındaki metal örgü</li>
  <li><strong>Yüksek gerilim bakım kıyafetleri:</strong> ilettken iplikli tulumlar</li>
</ul>

<div class="kutu puf" style="margin:16px 0">
  <div class="kutu-bas"><span class="ikon">🚗</span><span>Yaygın yanılgı: lastikler korumaz</span></div>
  <p style="margin:0">“Arabada güvendesin çünkü lastikler yalıtkan” cümlesi
  <strong>yanlıştır</strong>. Yıldırım kilometrelerce havayı delip gelmiştir; birkaç
  santim lastik onu durduramaz. Seni koruyan şey <strong>metal gövdedir</strong> —
  yük dış yüzeyden akar, içeride alan sıfır kalır. Bu yüzden
  <strong>üstü açık araçlar ve motosikletler korumaz</strong>.</p>
</div>`,

/* ---------------------------------------------------------- Formüller */
formuller: {
  liste: [
    { fm: 'E<sub>iç</sub> = 0',                 aciklama: 'Dengedeki iletkenin içinde alan yoktur' },
    { fm: 'E<sub>iç</sub> = E<sub>dış</sub> + E<sub>ind</sub>', aciklama: 'Süperpozisyon — ikisi birbirini götürür' },
    { fm: 'q<sub>iç yüzey</sub> = −q<sub>boşluktaki</sub>', aciklama: 'Oyuk iletkende iç yüzey, boşluktaki yükün tersini toplar' },
    { fm: 'λ = c / f',                          aciklama: 'Ekranlanacak dalganın boyu (c = 3·10⁸ m/s)' },
    { fm: 'göz ≪ λ',                            aciklama: 'Kafesin dalgayı tutma koşulu' }
  ],
  degiskenler: [
    { sembol: 'E<sub>dış</sub>', ad: 'Dışarıdan uygulanan alan', birim: 'N/C' },
    { sembol: 'E<sub>ind</sub>', ad: 'Ayrışan yüklerin alanı',   birim: 'N/C' },
    { sembol: 'λ',  ad: 'Dalga boyu',        birim: 'm' },
    { sembol: 'f',  ad: 'Frekans',           birim: 'Hz' },
    { sembol: 'c',  ad: 'Işık hızı',         birim: 'm/s' }
  ]
},

/* ------------------------------------------------------------ Türetim */
turetim: {
  yollar: [
    {
      ad: 'Yükler neden dış yüzeye kaçar?',
      adimlar: [
        { baslik: 'İletkende yükler serbesttir',
          html: `<p>İletkeni yalıtkandan ayıran tek şey budur: içindeki elektronlar
                 <strong>hareket edebilir</strong>. Yalıtkanda yük verdiğin yerde kalır,
                 iletkende kalmaz.</p>` },

        { baslik: 'Aynı yükler birbirini iter',
          html: `<p>Coulomb yasasından biliyoruz. Serbest oldukları için bu itme
                 <strong>hareketi başlatır</strong>: her yük diğerlerinden uzaklaşmaya çalışır.</p>` },

        { baslik: 'Hareket ne zaman durur?',
          html: `<p>Yükler ancak <strong>daha fazla uzaklaşamayacakları</strong> yere
                 vardıklarında durur. O yer <strong>dış yüzeydir</strong>. Cismi terk edemezler
                 (dışarısı yalıtkan hava), ama yüzeye dağılabilirler.</p>` },

        { baslik: 'Sonucu oku',
          html: `<p>Denge kurulduğunda iletkenin içinde <strong>net yük kalmaz</strong>:</p>
                 <div class="formul" style="max-width:260px;border-top-color:var(--accent)">
                   <div class="fm" style="color:var(--accent)">iç bölge: q = 0 ⟹ E = 0</div>
                 </div>
                 <p>Hâlâ hareket eden bir yük olsaydı, denge kurulmamış demektir —
                 yani içeride bir alan kalmış olurdu. Denge tanımı gereği alan sıfırdır.</p>` }
      ]
    },
    {
      ad: 'Dış alan neden içeri giremiyor?',
      adimlar: [
        { baslik: 'Alanı uygula',
          html: `<p>İletkeni soldan sağa doğru <strong>E_dış</strong> alanına koyalım.
                 İlk anda bu alan iletkenin içinde de vardır.</p>` },

        { baslik: 'Serbest elektronları takip et',
          html: `<p>Elektronlar negatiftir, alana <strong>ters</strong> yönde kuvvet görürler
                 ve sola kayarlar. Sonuç:</p>
                 <ul>
                   <li>Sol yüzey: <strong>elektron fazlası ⟹ negatif</strong></li>
                   <li>Sağ yüzey: <strong>elektron eksikliği ⟹ pozitif</strong></li>
                 </ul>` },

        { baslik: 'Ayrışan yüklerin alanını yaz',
          html: `<p>Solda −, sağda + olan bir dizilim, tıpkı paralel levhalar gibi,
                 <strong>sağdan sola</strong> bir alan üretir. Yani dış alana
                 <strong>zıt</strong> yöndedir:</p>
                 <div class="formul" style="max-width:240px"><div class="fm">E<sub>ind</sub> ↑↓ E<sub>dış</sub></div></div>` },

        { baslik: 'Ne zaman durur?',
          html: `<p>Ayrışma, elektronları iten net kuvvet <strong>sıfırlanana kadar</strong>
                 sürer. Net kuvvet sıfır demek, içerideki toplam alanın sıfır olması demektir:</p>
                 <div class="formul" style="max-width:300px;border-top-color:var(--accent)">
                   <div class="fm" style="color:var(--accent)">|E<sub>ind</sub>| = |E<sub>dış</sub>| ⟹ E<sub>iç</sub> = 0</div>
                 </div>
                 <p>Sistem bunu <strong>kendiliğinden</strong> yapar; ne kadar ayrışma gerektiğini
                 kimse hesaplamaz. Fazla ayrışsa geri iter, az ayrışsa daha çok kayar.</p>` }
      ]
    },
    {
      ad: 'Delikli kafes neden yeterli?',
      adimlar: [
        { baslik: 'Dalga boyunu hesapla',
          html: `<p>Engellenecek dalganın boyu:</p>
                 <div class="formul" style="max-width:200px"><div class="fm">λ = c / f</div></div>
                 <p>900 MHz&rsquo;lik telefon sinyali için:</p>
                 <p>λ = 3·10⁸ / 9·10⁸ = <strong>0,33 m = 33 cm</strong></p>` },

        { baslik: 'Göz aralığıyla karşılaştır',
          html: `<p>Dalga, kendi boyundan <strong>çok küçük</strong> bir delikten geçemez —
                 delik ona “yokmuş” gibi gelir, örgü kesintisiz bir metal levha gibi davranır.</p>
                 <div class="formul" style="max-width:220px"><div class="fm">göz ≪ λ ⟹ geçemez</div></div>` },

        { baslik: 'Sayıyla gör',
          html: `<p>2 cm&rsquo;lik göz, 33 cm&rsquo;lik dalga için:</p>
                 <p>göz/λ = 2/33 ≈ <strong>0,06</strong> — dalga boyunun yalnızca %6&rsquo;sı.
                 Sinyal geçemez, asansörde telefon çekmez.</p>` },

        { baslik: 'Işık neden geçiyor?',
          html: `<p>Görünür ışığın dalga boyu <code>≈ 5·10⁻⁷ m</code>&rsquo;dir. 2 cm&rsquo;lik
                 göz, bu dalga boyunun <strong>40 000 katıdır</strong> — ışık için orası
                 kocaman bir kapıdır. Bu yüzden kafesin içini <strong>görürsün</strong> ama
                 telefonun çekmez.</p>` }
      ]
    }
  ]
},

/* -------------------------------------------------------- Simülasyon */
sim: F.simler['faraday-kafesi'],

/* ------------------------------------------------------- Püf noktası */
puf: {
  html: `
    <p><strong>1 · “İletkenin içinde” ifadesini görünce cevap hazır.</strong> Dengedeki
    iletkenin <em>madde kısmında</em> ve <em>içindeki boşlukta</em> (boşlukta yük yoksa)
    alan sıfırdır. Bu, soruyu okumadan yarısını çözer.</p>

    <p><strong>2 · Oyuk iletken sorusunun kalıbı:</strong> Nötr, oyuk bir iletkenin iç
    boşluğuna <code>+q</code> konursa:</p>
    <table class="degisken-tablo" style="margin-top:8px">
      <thead><tr><th>Yer</th><th>Yük</th></tr></thead>
      <tbody>
        <tr><td>Boşlukta</td><td class="sembol">+q</td></tr>
        <tr><td>İç yüzey</td><td class="sembol">−q</td></tr>
        <tr><td>Dış yüzey</td><td class="sembol">+q</td></tr>
        <tr><td>İletken maddesi</td><td class="sembol">E = 0</td></tr>
      </tbody>
    </table>
    <p style="margin-top:8px">İç yüzey daima boşluktaki yükün <strong>tersini</strong> toplar;
    iletken nötrse dış yüzeyde aynısı belirir. <strong>Topraklanırsa</strong> dış yüzeydeki
    yük toprağa akar ve dışarıda alan kalmaz.</p>

    <p style="margin-top:14px"><strong>3 · Kalkan “emmez”, dengeler.</strong> Şık içinde
    “kafes dış alanı yok eder / soğurur” geçiyorsa o şık yanlıştır. Doğru ifade:
    <em>iletken, dış alanı götüren bir karşı alan üretir</em>.</p>

    <p><strong>4 · Kafes tam kapalı olmak zorunda değil.</strong> “Delik varsa kalkan
    çalışmaz” diyen şıkkı ele. Ölçüt <code>göz ≪ λ</code>&rsquo;dır.</p>

    <p><strong>5 · λ = c/f hesabını üslerle yap.</strong> <code>f</code> MHz verilirse
    <code>10⁶</code> ile çarpmayı unutma. 900 MHz = 9·10⁸ Hz ⟹ λ = 3·10⁸/9·10⁸ = 1/3 m.</p>

    <p><strong>6 · Yıldırımda koruyan şey gövdedir, lastik değil.</strong> Bu, hem fizik
    hem de bağlam sorularında sık kullanılan bir çeldiricidir.</p>

    <div class="kutu puf" style="margin-top:14px">
      <div class="kutu-bas"><span class="ikon">🔗</span><span>Bir önceki konuyla bağ</span></div>
      <p style="margin:0">Bu konu aslında elektriksel alanın bir <strong>sonucudur</strong>,
      yeni bir yasa değildir. Elinde yalnızca iki şey var: <em>süperpozisyon</em> ve
      <em>iletkende yüklerin serbest olması</em>. Faraday kafesi bu ikisinin
      kaçınılmaz sonucudur.</p>
    </div>`
},

/* ----------------------------------------------------- Zorlayıcı sorular */
osym: [
  {
    baslik: 'Oyuk iletken küre',
    kaynak: 'Klasik kalıp',
    govde: `
      <p><strong>Nötr</strong> ve <strong>oyuk</strong> bir iletken kürenin tam
      merkezindeki boşluğa <strong>+4q</strong> yükü yerleştiriliyor ve denge bekleniyor.</p>
      <p>Buna göre; kürenin <strong>iç yüzeyindeki</strong> yük, <strong>dış yüzeyindeki</strong>
      yük ve <strong>iletken maddesi içindeki</strong> alan sırasıyla nedir?</p>`,
    gorsel: `
      <svg viewBox="0 0 520 210" xmlns="http://www.w3.org/2000/svg" role="img"
           aria-label="Oyuk iletken kürenin merkezinde artı dört q yükü ve yüzeylerde ayrışan yükler">
        <rect width="520" height="210" fill="#17223A"/>
        <circle cx="260" cy="105" r="86" fill="none" stroke="#9AA5B1" stroke-width="16"/>
        <circle cx="260" cy="105" r="78" fill="#111A2B"/>
        <circle cx="260" cy="105" r="14" fill="#E2483F"/>
        <text x="260" y="110" fill="#FFFFFF" font-size="13" font-family="system-ui" text-anchor="middle" font-weight="700">+4q</text>
        <g fill="#2F6FD0" font-size="14" font-family="system-ui" text-anchor="middle" font-weight="700">
          <text x="260" y="40">−</text><text x="196" y="112">−</text>
          <text x="324" y="112">−</text><text x="260" y="182">−</text>
        </g>
        <g fill="#E2483F" font-size="14" font-family="system-ui" text-anchor="middle" font-weight="700">
          <text x="260" y="14">+</text><text x="170" y="112">+</text>
          <text x="350" y="112">+</text><text x="260" y="206">+</text>
        </g>
        <text x="60" y="30" fill="#6F84A8" font-size="11" font-family="system-ui">iç yüzey: ?</text>
        <text x="60" y="48" fill="#6F84A8" font-size="11" font-family="system-ui">dış yüzey: ?</text>
        <text x="60" y="66" fill="#6F84A8" font-size="11" font-family="system-ui">madde içinde E: ?</text>
      </svg>`,
    secenekler: [
      '−4q &nbsp;·&nbsp; +4q &nbsp;·&nbsp; E = 0',
      '+4q &nbsp;·&nbsp; −4q &nbsp;·&nbsp; E = 0',
      '−4q &nbsp;·&nbsp; 0 &nbsp;·&nbsp; E = 0',
      '0 &nbsp;·&nbsp; +4q &nbsp;·&nbsp; E ≠ 0',
      '−2q &nbsp;·&nbsp; +2q &nbsp;·&nbsp; E = 0'
    ],
    dogru: 0,
    cozum: `
      <p><strong>İç yüzey:</strong> Boşluktaki +4q, iletkenin serbest elektronlarını
      <em>kendine doğru</em> çeker. İç yüzeyde <strong>−4q</strong> toplanır.</p>
      <p><strong>Dış yüzey:</strong> Küre başlangıçta <strong>nötrdü</strong>, toplam yükü
      sıfırdı. İçeriye −4q gittiyse dışarıda <strong>+4q</strong> kalmak zorundadır —
      yük korunumu.</p>
      <div class="formul" style="max-width:300px;margin:10px 0">
        <div class="fm">(−4q) + (+4q) = 0 ✓ küre hâlâ nötr</div>
      </div>
      <p><strong>Madde içinde alan:</strong> Dengedeki iletkenin maddesinde
      <strong>her zaman E = 0</strong>&rsquo;dır. İç yüzeydeki −4q ile boşluktaki +4q&rsquo;nun
      alanları maddede tam olarak birbirini götürür.</p>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>C şıkkı</strong> yük korunumunu atlıyor — içeri −4q
        gittiyse o yük bir yerden geldi.
        <br><strong>B şıkkı</strong> işaretleri ters çeviriyor: iç yüzey daima boşluktaki
        yükün <em>tersini</em> toplar.
        <br><strong>D şıkkı</strong> ise konunun temel sonucunu reddediyor.
        <br><strong>Ek soru:</strong> Küre <em>topraklanırsa</em> ne olur? Dış yüzeydeki +4q
        toprağa akar, dışarıda alan <strong>sıfırlanır</strong>. İç yüzeydeki −4q ise
        boşluktaki yükün tuttuğu yerde kalır.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: A</strong></p>`
  },
  {
    baslik: 'Hangi kafes hangi dalgayı tutar?',
    kaynak: 'Ölçüt uygulaması',
    govde: `
      <p>Göz aralığı <strong>3 cm</strong> olan metal bir tel örgüyle yapılmış bir kafes var.</p>
      <p>Aşağıdaki dalgalardan hangileri bu kafesin içine <strong>giremez</strong>?
      (c = 3·10⁸ m/s)</p>
      <ol style="margin-left:.2em">
        <li>FM radyo · <strong>100 MHz</strong></li>
        <li>Cep telefonu · <strong>1800 MHz</strong></li>
        <li>Mikrodalga fırın · <strong>2450 MHz</strong></li>
        <li>Görünür ışık · <strong>6·10¹⁴ Hz</strong></li>
      </ol>`,
    secenekler: [
      'I, II ve III',
      'Yalnız I',
      'I ve II',
      'II, III ve IV',
      'Hepsi'
    ],
    dogru: 0,
    cozum: `
      <p>Her biri için <code>λ = c/f</code> hesapla, sonra 3 cm ile karşılaştır:</p>
      <table class="degisken-tablo">
        <thead><tr><th>Dalga</th><th>λ</th><th>göz/λ</th><th>Sonuç</th></tr></thead>
        <tbody>
          <tr><td>I · 100 MHz</td><td class="sembol">3 m</td><td class="sembol">0,01</td><td>giremez</td></tr>
          <tr><td>II · 1800 MHz</td><td class="sembol">16,7 cm</td><td class="sembol">0,18</td><td>giremez</td></tr>
          <tr><td>III · 2450 MHz</td><td class="sembol">12,2 cm</td><td class="sembol">0,25</td><td>giremez</td></tr>
          <tr><td>IV · ışık</td><td class="sembol">5·10⁻⁷ m</td><td class="sembol">60 000</td><td><strong>girer</strong></td></tr>
        </tbody>
      </table>
      <p style="margin-top:10px">İlk üçünde göz aralığı dalga boyundan çok küçük — örgü onlara
      <strong>kesintisiz levha</strong> gibi görünür. Işıkta ise durum tersine döner: göz,
      dalga boyunun altmış bin katıdır.</p>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>E şıkkı</strong> “metal her şeyi keser” diye düşünenler için.
        Kesse kafesin içini göremezdin.
        <br><strong>Sağlama:</strong> Frekans <em>büyüdükçe</em> dalga boyu küçülür ve geçme
        ihtimali artar. Sıralaman bu mantıkla tutarlı olmalı.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: A</strong></p>`
  }
],

/* --------------------------------------------- Bağlam temelli sorular */
baglam: [
  {
    baslik: 'Uçağa yıldırım çarparsa',
    govde: `
      <p>Ticari bir yolcu uçağına yıldırım çarpma ihtimali sanıldığından yüksektir:
      istatistiklere göre her uçak <strong>ortalama yılda bir kez</strong> yıldırım alır.
      Buna rağmen yolcular çoğu zaman olayı fark etmez bile.</p>
      <p>Uçağın gövdesi <strong>alüminyum</strong> alaşımdan yapılmıştır. Yıldırım genellikle
      burun ya da kanat ucundan girer, gövde boyunca ilerler ve kuyruktan çıkar.</p>
      <p>Bir öğrenci soruyor: <em>“Uçak havada, topraklanmış değil. Yük nereye gidiyor?
      İçerideki insanlar ve elektronik cihazlar neden etkilenmiyor?”</em></p>
      <p><strong>Olayı Faraday kafesiyle açıkla. Uçağın topraklanmamış olması kalkanı
      bozar mı?</strong></p>`,
    gorsel: `
      <svg viewBox="0 0 520 210" xmlns="http://www.w3.org/2000/svg" role="img"
           aria-label="Uçağın burnundan giren yıldırımın gövde yüzeyinden akıp kuyruktan çıkması">
        <rect width="520" height="210" fill="#17223A"/>
        <ellipse cx="260" cy="120" rx="170" ry="30" fill="#C9D4E2"/>
        <path d="M120 120 L90 108 L120 100 Z" fill="#C9D4E2"/>
        <path d="M400 120 L452 84 L446 112 Z" fill="#C9D4E2"/>
        <path d="M250 120 L300 62 L330 66 L292 120 Z" fill="#9AA5B1"/>
        <path d="M250 120 L300 178 L330 174 L292 120 Z" fill="#9AA5B1"/>
        <g fill="#2F6FD0">
          <circle cx="200" cy="116" r="4"/><circle cx="228" cy="116" r="4"/>
          <circle cx="256" cy="116" r="4"/><circle cx="284" cy="116" r="4"/>
        </g>
        <path d="M60 14 L84 44 L70 48 L96 84" stroke="#FFD24A" stroke-width="4" fill="none" stroke-linejoin="round"/>
        <path d="M96 84 L112 96 L100 100 L118 110" stroke="#FFD24A" stroke-width="4" fill="none" stroke-linejoin="round"/>
        <path d="M120 100 Q 260 78 400 108" stroke="#FFD24A" stroke-width="3" fill="none" stroke-dasharray="7 5"/>
        <path d="M446 112 L474 132 L462 136 L488 158" stroke="#FFD24A" stroke-width="4" fill="none" stroke-linejoin="round"/>
        <text x="150" y="70" fill="#FFD24A" font-size="11" font-family="system-ui">giriş</text>
        <text x="452" y="176" fill="#FFD24A" font-size="11" font-family="system-ui">çıkış</text>
        <text x="260" y="152" fill="#2F6FD0" font-size="11" font-family="system-ui" text-anchor="middle">yolcular · E = 0</text>
      </svg>`,
    adimlar: [
      { bas: 'Gövdeyi tanı',
        metin: 'Alüminyum gövde <strong>kapalı bir iletken kabuktur</strong>. Yani uçak, uçan bir Faraday kafesidir.' },
      { bas: 'Yük nerede akıyor?',
        metin: 'Yükler birbirini iter ve <strong>dış yüzeye</strong> kaçar. Yıldırım akımı gövdenin <em>dışından</em> geçip gider; kabinin içine girmez.' },
      { bas: 'İçerideki alanı yaz',
        metin: 'İç boşlukta net yük yoktur ⟹ <strong>E_iç = 0</strong>. Yolcular ve aviyonik cihazlar alan görmez.' },
      { bas: 'Topraklama sorusunu cevapla',
        metin: 'Kalkan etkisi <strong>topraklamaya bağlı değildir</strong>. Gereken tek şey, yüklerin dış yüzeyde serbestçe dağılabilmesidir. Topraklama yalnızca yükü <em>boşaltmaya</em> yarar; havada yük gövdeden geçip diğer uçtan çıkar.' },
      { bas: 'Sınırı da söyle',
        metin: 'Kalkan mükemmel değildir: kompozit gövdeli modern uçaklara <strong>iletken tel örgü</strong> gömülür, yakıt tankları ve yakıt ikmali özel olarak korunur. Yani mühendislik, kafes etkisini <em>bilerek</em> inşa eder.' }
    ],
    secenekler: [
      'Metal gövde Faraday kafesi gibi davranır; yük dış yüzeyden akar, E_iç = 0 olur ve topraklama gerekmez',
      'Uçak topraklanmadığı için kalkan çalışmaz; yolcuları koltukların yalıtkanlığı korur',
      'Yıldırım havada enerjisini kaybettiği için uçağa zarar vermez',
      'Gövde yükü soğurup yok eder, bu yüzden içeride alan kalmaz',
      'Kalkan yalnızca uçak yere indiğinde, topraklandığında çalışır'
    ],
    dogru: 0,
    cozum: `
      <p>Uçak <strong>kapalı bir iletken kabuktur</strong>. Yük dış yüzeyden akar, iç boşlukta
      net yük kalmaz, dolayısıyla <strong>E_iç = 0</strong>&rsquo;dır.</p>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>B ve E şıkları</strong> topraklamayı zorunlu sanıyor.
        Kafes etkisi için gereken tek şey <em>yüklerin serbestçe dağılabilmesi</em>dir;
        toprak bağlantısı değil.
        <br><strong>D şıkkı</strong> konunun en sık yapılan kavram hatası: kafes yükü
        <em>soğurmaz</em>, alanı <em>dengeler</em>.
        <br><strong>Hayatta karşılığı:</strong> Aynı sebeple yıldırımlı havada arabada
        kalmak güvenlidir — ama üstü açık araçta ve motosiklette değil.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: A</strong></p>`
  },
  {
    baslik: 'Mikrodalga fırının kapağı',
    govde: `
      <p>Mikrodalga fırının camına yakından bakarsan, içinde <strong>küçük delikli metal bir
      levha</strong> görürsün. Delik çapları yaklaşık <strong>1 mm</strong>&rsquo;dir.</p>
      <p>Bu levha ilginç bir iş yapar: <strong>mikrodalgayı dışarı bırakmaz</strong>, ama
      <strong>ışığı geçirir</strong> — yemeğin piştiğini görebilirsin.</p>
      <p>Mikrodalga fırınlar <strong>2450 MHz</strong> frekansında çalışır. Görünür ışığın
      dalga boyu ise yaklaşık <strong>5·10⁻⁷ m</strong>&rsquo;dir.</p>
      <p><strong>İki durumu da sayıyla göster ve levhanın nasıl hem tuttuğunu hem
      geçirdiğini açıkla.</strong> (c = 3·10⁸ m/s)</p>`,
    gorsel: `
      <svg viewBox="0 0 520 210" xmlns="http://www.w3.org/2000/svg" role="img"
           aria-label="Mikrodalga fırın kapağındaki delikli metal levhanın mikrodalgayı tutup ışığı geçirmesi">
        <rect width="520" height="210" fill="#17223A"/>
        <rect x="40" y="30" width="250" height="150" rx="8" fill="#2E3D57"/>
        <rect x="58" y="48" width="214" height="114" fill="#3A2E22"/>
        <rect x="300" y="30" width="16" height="150" fill="#9AA5B1"/>
        <g fill="#17223A">
          <circle cx="308" cy="52" r="3"/><circle cx="308" cy="70" r="3"/>
          <circle cx="308" cy="88" r="3"/><circle cx="308" cy="106" r="3"/>
          <circle cx="308" cy="124" r="3"/><circle cx="308" cy="142" r="3"/>
          <circle cx="308" cy="160" r="3"/>
        </g>
        <text x="308" y="200" fill="#6F84A8" font-size="10" font-family="system-ui" text-anchor="middle">delik ≈ 1 mm</text>
        <path d="M110 80 Q 130 62 150 80 T 190 80 T 230 80 T 270 80" stroke="#FF6B6B" stroke-width="2.6" fill="none"/>
        <path d="M280 80 L296 80" stroke="#FF6B6B" stroke-width="2.6"/>
        <circle cx="300" cy="80" r="9" fill="none" stroke="#FF6B6B" stroke-width="2.4"/>
        <path d="M294 74 L306 86 M306 74 L294 86" stroke="#FF6B6B" stroke-width="2.4"/>
        <text x="180" y="64" fill="#FF6B6B" font-size="11" font-family="system-ui" text-anchor="middle">mikrodalga · λ = 12,2 cm</text>
        <path d="M160 130 L470 130" stroke="#FFD24A" stroke-width="2.4" stroke-dasharray="6 4"/>
        <path d="M470 130 L458 124 L458 136 Z" fill="#FFD24A"/>
        <text x="400" y="118" fill="#FFD24A" font-size="11" font-family="system-ui" text-anchor="middle">ışık geçer</text>
      </svg>`,
    adimlar: [
      { bas: 'Mikrodalganın boyunu bul',
        metin: 'f = 2450 MHz = 2,45·10⁹ Hz<br>λ = c/f = 3·10⁸ / 2,45·10⁹ = <strong>0,122 m = 12,2 cm</strong>' },
      { bas: 'Delikle karşılaştır',
        metin: 'Delik 1 mm = 0,1 cm.<br>delik/λ = 0,1 / 12,2 ≈ <strong>0,008</strong><br>Delik, dalga boyunun binde sekizi. Mikrodalga için levha <strong>kesintisiz metal</strong> gibidir — geçemez.' },
      { bas: 'Işık için aynı hesabı yap',
        metin: 'Işığın dalga boyu 5·10⁻⁷ m = 0,00005 cm.<br>delik/λ = 0,1 / 0,00005 = <strong>2000</strong><br>Delik, ışığın dalga boyunun iki bin katı — ışık için orası kocaman bir pencere.' },
      { bas: 'Tek cümlede topla',
        metin: 'Aynı delik, <strong>büyük dalga boyu</strong> için yok hükmünde, <strong>küçük dalga boyu</strong> için kapı. Ölçüt deliğin mutlak boyu değil, <strong>dalga boyuna oranı</strong>dır.' },
      { bas: 'Güvenlik notunu ekle',
        metin: 'Kapı contası bozulur ya da levha delinirse kalkan zayıflar. Bu yüzden mikrodalga fırınların kapağı hasarlıysa kullanılmamalıdır.' }
    ],
    secenekler: [
      'λ_mikrodalga = 12,2 cm ≫ 1 mm olduğu için tutulur; ışığın λ’sı delikten çok küçük olduğu için geçer',
      'Metal ışığı da keser; içeriyi ampul sayesinde görürüz',
      'Delikler mikrodalgayı soğurup ısıya çevirir',
      'λ_mikrodalga = 1,22 cm olduğundan delikten zar zor geçer',
      'Mikrodalga metalden geçer ama camdan geçemez'
    ],
    dogru: 0,
    cozum: `
      <p><strong>λ = c/f = 3·10⁸ / 2,45·10⁹ = 12,2 cm</strong></p>
      <div class="formul" style="max-width:340px;margin:10px 0;border-top-color:var(--accent)">
        <div class="fm" style="color:var(--accent)">1 mm ≪ 12,2 cm &nbsp;·&nbsp; 1 mm ≫ 5·10⁻⁷ m</div>
      </div>
      <p>Aynı delik, iki dalga için tamamen farklı davranır. Belirleyici olan
      <strong>delik/λ oranıdır</strong>.</p>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>C şıkkı</strong> yine “soğurma” yanılgısı — kafes soğurmaz,
        yansıtır ve dengeler.
        <br><strong>D şıkkı</strong> 10⁸/10⁹ bölmesini 10⁻¹ yerine 10⁻² alanlar için.
        <br><strong>Bağlantı:</strong> Bu soru aslında 3. ünitenin (Optik) kapısını aralıyor.
        Işığın da bir dalga olduğunu ve dalga boyunun her şeyi belirlediğini burada görüyorsun.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: A</strong></p>`
  }
]

});
})();
