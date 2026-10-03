(function () {
"use strict";
const F = window.F11;

/* ==========================================================================
   topics/u3-kuresel-ayna.js
   Konu 3.3.1 · Küresel aynaların özellikleri  (MEB 11, s.323-332)
   ========================================================================== */

F.konuKaydet('u3-kuresel-ayna', {

ozet: `Bir kürenin iç yüzü sırlanırsa <strong>çukur</strong>, dış yüzü sırlanırsa
<strong>tümsek</strong> ayna olur. Bu tek fark, aynanın ışığı <em>toplamasına</em> ya da
<em>dağıtmasına</em> yol açar. Bu konuda T, M, F noktalarını, <strong>f = R/2</strong>
bağıntısını ve görüntüyü çizmeye yarayan <strong>üç özel ışını</strong> kuruyoruz.`,

/* ------------------------------------------------------------- Kavram */
kavram: `
<h3>Küresel ayna nedir?</h3>
<p>Bir küreden kesilmiş bir parçanın yüzeyi sırlanırsa küresel ayna elde edilir. Hangi
yüzün sırlandığına göre iki tür vardır:</p>
<table class="degisken-tablo">
  <thead><tr><th>Tür</th><th>Sırlanan yüz</th><th>Işığa etkisi</th><th>Diğer adı</th></tr></thead>
  <tbody>
    <tr><td><strong>Çukur</strong></td><td>dış yüz (oyuk taraf yansıtır)</td><td><strong>toplar</strong></td><td>konkav</td></tr>
    <tr><td><strong>Tümsek</strong></td><td>iç yüz (kambur taraf yansıtır)</td><td><strong>dağıtır</strong></td><td>konveks</td></tr>
  </tbody>
</table>

<h3 style="margin-top:22px">Dört temel eleman</h3>
<table class="degisken-tablo">
  <thead><tr><th>Simge</th><th>Adı</th><th>Tanımı</th></tr></thead>
  <tbody>
    <tr><td class="sembol">T</td><td>Tepe noktası</td><td>Aynanın asal eksenle kesiştiği nokta</td></tr>
    <tr><td class="sembol">M</td><td>Eğrilik merkezi</td><td>Ayna hangi kürenin parçasıysa o kürenin merkezi</td></tr>
    <tr><td class="sembol">F</td><td>Odak noktası</td><td>Eksene paralel ışınların toplandığı nokta</td></tr>
    <tr><td class="sembol">R</td><td>Eğrilik yarıçapı</td><td>TM uzaklığı, yani kürenin yarıçapı</td></tr>
  </tbody>
</table>

<div class="formul" style="max-width:280px;margin:16px 0;border-top-color:var(--accent)">
  <div class="fm" style="color:var(--accent)">f = R / 2</div>
  <div class="fm-ad">Odak, M ile T&rsquo;nin tam ortasındadır</div>
</div>

<div class="kutu dikkat" style="margin:16px 0">
  <div class="kutu-bas"><span class="ikon">⚠</span><span>M ve F nerede?</span></div>
  <p style="margin:0"><strong>Çukur aynada</strong> M ve F aynanın <strong>önündedir</strong>
  — ışığın geldiği tarafta. Işınlar orada <em>gerçekten</em> kesişir, oraya bir kâğıt tutsan
  parlak bir nokta görürsün. Odak <strong>gerçektir</strong>.</p>
  <p style="margin:8px 0 0"><strong>Tümsek aynada</strong> M ve F aynanın
  <strong>arkasındadır</strong>. Yansıyan ışınlar ıraksar, hiçbir yerde kesişmez;
  yalnızca <em>uzantıları</em> F&rsquo;de birleşir. Odak <strong>sanaldır</strong>.</p>
</div>

<h3 style="margin-top:22px">Üç özel ışın</h3>
<p>Bir cismin görüntüsünü çizmek için bu üç ışından <strong>ikisi</strong> yeterlidir:</p>
<table class="degisken-tablo">
  <thead><tr><th>#</th><th>Nasıl gelir</th><th>Nasıl yansır</th></tr></thead>
  <tbody>
    <tr><td class="sembol">1</td><td>asal eksene <strong>paralel</strong></td><td><strong>odaktan</strong> geçerek</td></tr>
    <tr><td class="sembol">2</td><td><strong>odaktan</strong> geçerek</td><td>asal eksene <strong>paralel</strong></td></tr>
    <tr><td class="sembol">3</td><td><strong>merkezden</strong> geçerek</td><td>geldiği yoldan <strong>geri</strong></td></tr>
  </tbody>
</table>
<p style="margin-top:10px;color:var(--text-2)">1 ile 2&rsquo;nin birbirinin tersi olması
tesadüf değil: ışığın yolu <strong>tersinirdir</strong>. Bir ışın A&rsquo;dan B&rsquo;ye
gidebiliyorsa, B&rsquo;den A&rsquo;ya da aynı yoldan gidebilir.</p>
<p style="color:var(--text-2)">3. ışın merkezden geçtiği için aynaya <strong>dik</strong>
çarpar (yarıçap daima yüzeye diktir) ⟹ gelme açısı 0° ⟹ geri döner.</p>

<h3 style="margin-top:22px">Neden küresel sapma var?</h3>
<p>Simülasyonun 3. düzeneğini aç. Açıklık açısını büyüttükçe kenardan gelen ışınların
odağı, eksene yakın ışınlarınkiyle <strong>aynı yerde olmadığını</strong> göreceksin.</p>
<div class="formul" style="max-width:340px;margin:14px 0">
  <div class="fm">Δ = (R/2)·(sec θ − 1)</div>
  <div class="fm-ad">kenar ışınla paraksiyel odak arasındaki kayma</div>
</div>
<p>Yani <strong>f = R/2 bir yaklaşıklıktır</strong> — yalnızca eksene yakın (paraksiyel)
ışınlar için tam doğrudur. Gerçek aynalarda kenar ışınlar odaktan öne kayar ve tek bir
nokta yerine <strong>kostik</strong> denen bir eğri oluşur.</p>
<p>Bu yüzden teleskop aynaları küresel değil <strong>paraboliktir</strong>: parabol,
eksene paralel <em>tüm</em> ışınları açıklık ne olursa olsun tek bir noktada toplar.
Hubble Uzay Teleskobu&rsquo;nun 1990&rsquo;daki ünlü arızası da tam olarak bu aynanın
birkaç mikron yanlış taşlanmasıydı.</p>`,

/* ---------------------------------------------------------- Formüller */
formuller: {
  liste: [
    { fm: 'f = R / 2',              aciklama: 'Odak uzaklığı, eğrilik yarıçapının yarısı' },
    { fm: 'f > 0 · çukur',          aciklama: 'M ve F aynanın önünde, odak gerçek' },
    { fm: 'f < 0 · tümsek',         aciklama: 'M ve F aynanın arkasında, odak sanal' },
    { fm: 'd(θ) = R − R/(2cos θ)',  aciklama: 'Kenar ışınların gerçek kesişme uzaklığı' },
    { fm: 'Δ = (R/2)(sec θ − 1)',   aciklama: 'Küresel sapma' }
  ],
  degiskenler: [
    { sembol: 'R', ad: 'Eğrilik yarıçapı', birim: 'cm' },
    { sembol: 'f', ad: 'Odak uzaklığı',    birim: 'cm' },
    { sembol: 'θ', ad: 'Açıklık yarı açısı', birim: '°' },
    { sembol: 'Δ', ad: 'Küresel sapma',    birim: 'cm' }
  ]
},

/* ------------------------------------------------------------ Türetim */
turetim: {
  yollar: [
    {
      ad: 'f = R/2 nereden geliyor?',
      adimlar: [
        { baslik: 'Paralel bir ışın gönder',
          html: `<p>Asal eksene paralel, eksenden küçük bir <code>u</code> uzaklığında bir
                 ışın gönderelim. Ayna, merkezi M olan bir kürenin parçası olduğuna göre
                 ışının çarptığı noktaya çizilen <strong>yarıçap</strong> aynı zamanda
                 <strong>yüzeyin normalidir</strong>.</p>` },

        { baslik: 'Gelme açısını bul',
          html: `<p>Gelen ışın eksene paralel, normal ise M&rsquo;den geçiyor. İkisi arasındaki
                 açı θ olsun. Geometriden:</p>
                 <div class="formul" style="max-width:200px"><div class="fm">sin θ = u / R</div></div>` },

        { baslik: 'Yansıma yasasını uygula',
          html: `<p>Yansıma açısı da θ&rsquo;dır. Gelen ışın eksene paralel olduğu için
                 <strong>iç ters açılar</strong> eşittir: yansıyan ışının ekseni kestiği
                 noktaya K dersek, <strong>MK üçgeni ikizkenardır</strong> —
                 <code>MK = KT'</code>.</p>` },

        { baslik: 'Kesişme uzaklığını yaz',
          html: `<p>İkizkenar üçgenden kesişme noktasının tepeye uzaklığı:</p>
                 <div class="formul" style="max-width:280px">
                   <div class="fm">d(θ) = R − R/(2·cos θ)</div>
                 </div>
                 <p>Bu <strong>tam</strong> sonuçtur, hiçbir yaklaşıklık yok.</p>` },

        { baslik: 'Eksene yaklaş',
          html: `<p>Işın eksene çok yakınsa θ → 0 ve <code>cos θ → 1</code>:</p>
                 <div class="formul" style="max-width:300px;border-top-color:var(--accent)">
                   <div class="fm" style="color:var(--accent)">d = R − R/2 = R/2 = f</div>
                 </div>
                 <p>İşte f = R/2 buradan gelir — ve <strong>neden yaklaşık olduğu</strong>
                 da buradan görülür.</p>` }
      ]
    },
    {
      ad: 'Küresel sapmanın büyüklüğü',
      adimlar: [
        { baslik: 'İki odağı karşılaştır',
          html: `<p>Paraksiyel ışınların odağı <code>R/2</code>, θ açısıyla gelen kenar
                 ışınınki <code>R − R/(2cos θ)</code>.</p>` },

        { baslik: 'Farkı al',
          html: `<div class="formul" style="max-width:420px">
                   <div class="fm">Δ = R/2 − [R − R/(2cos θ)] = R/(2cos θ) − R/2</div>
                 </div>` },

        { baslik: 'Sadeleştir',
          html: `<div class="formul" style="max-width:300px;border-top-color:var(--accent)">
                   <div class="fm" style="color:var(--accent)">Δ = (R/2)·(sec θ − 1)</div>
                 </div>
                 <p>θ = 0 için Δ = 0 ✓ &nbsp;·&nbsp; θ büyüdükçe Δ hızla büyür.</p>` },

        { baslik: 'Sayısal kontrol',
          html: `<p>R = 60 cm için:</p>
                 <table class="degisken-tablo">
                   <thead><tr><th>θ</th><th>Kenar odağı</th><th>Δ</th></tr></thead>
                   <tbody>
                     <tr><td>5°</td><td>29,89 cm</td><td>0,11 cm</td></tr>
                     <tr><td>14°</td><td>29,08 cm</td><td>0,92 cm</td></tr>
                     <tr><td>30°</td><td>25,36 cm</td><td>4,64 cm</td></tr>
                     <tr><td>45°</td><td>17,57 cm</td><td>12,43 cm</td></tr>
                   </tbody>
                 </table>
                 <p style="margin-top:10px">Küçük açılarda sapma <strong>ihmal edilebilir</strong>;
                 45°&rsquo;de odak uzaklığının <strong>%41</strong>&rsquo;i kadar. Bu yüzden
                 optik derslerinde “ince ayna” denilen küçük açıklıklı aynalar kullanılır.</p>` }
      ]
    },
    {
      ad: '3. özel ışın neden geri döner?',
      adimlar: [
        { baslik: 'Merkezden geçen ışını izle',
          html: `<p>Işın M&rsquo;den geçerek aynaya gidiyorsa, izlediği doğru
                 <strong>kürenin bir yarıçapıdır</strong>.</p>` },

        { baslik: 'Yarıçap = normal',
          html: `<p>Bir kürenin herhangi bir noktasındaki yarıçap, o noktadaki yüzeye
                 <strong>diktir</strong>. Yani bu ışın tam olarak <strong>normal
                 doğrultusunda</strong> geliyor.</p>` },

        { baslik: 'Açıyı yaz',
          html: `<p>Normalle yaptığı açı sıfır ⟹ gelme açısı 0°:</p>
                 <div class="formul" style="max-width:200px"><div class="fm">i = 0° ⟹ r = 0°</div></div>` },

        { baslik: 'Sonuç',
          html: `<p>Yansıma açısı da sıfır olduğuna göre ışın <strong>geldiği yoldan
                 aynen geri döner</strong>.</p>
                 <p>Ek olarak: bu ışın <strong>hiçbir yaklaşıklık içermez</strong>. Açıklık
                 ne kadar büyük olursa olsun, merkezden geçen ışın her zaman tam olarak
                 geri döner. Küresel sapmadan etkilenmeyen tek özel ışındır.</p>` }
      ]
    }
  ]
},

/* -------------------------------------------------------- Simülasyon */
sim: F.simler['kuresel-ayna'],

/* ------------------------------------------------------- Püf noktası */
puf: {
  html: `
    <p><strong>1 · R mi f mi verilmiş?</strong> Soru “eğrilik yarıçapı 40 cm” diyorsa
    f = 20 cm&rsquo;dir. “Odak uzaklığı 40 cm” diyorsa R = 80 cm. Bu ikisini karıştırmak
    en sık yapılan hatadır.</p>

    <p><strong>2 · İşaret kuralı.</strong> Çukurda <strong>f &gt; 0</strong>, tümsekte
    <strong>f &lt; 0</strong>. Formülü her zaman aynı yazıp işareti f&rsquo;ye yüklersen
    ayrı ayrı kural ezberlemen gerekmez.</p>

    <p><strong>3 · Tümsek ayna asla büyütmez.</strong> Tümsek aynada görüntü
    <strong>her zaman</strong> sanal, düz ve küçüktür — cisim nerede olursa olsun.
    “Tümsek aynada büyük görüntü” diyen şık her zaman yanlıştır.</p>

    <p><strong>4 · Üç ışından ikisi yeter.</strong> Sınavda hepsini çizmek zaman kaybı.
    En kolayı 1 (paralel → odak) ile 3 (merkezden → geri) ikilisidir.</p>

    <p><strong>5 · Merkezden geçen ışın dik çarpar.</strong> Bunu bilirsen 3. ışını
    ezberlemene gerek kalmaz, kendin çıkarırsın.</p>

    <p><strong>6 · f = R/2 yaklaşıktır.</strong> Ders düzeyinde her zaman kullanılır ama
    “her açıklıkta tam doğrudur” diyen şık yanlıştır. Doğrusu: <em>eksene yakın ışınlar
    için</em>.</p>

    <p><strong>7 · Çukur ayna = toplaç, tümsek ayna = dağıtaç.</strong> Bu ikiliyi
    hatırlarsan hangisinin gerçek görüntü verebileceğini de hatırlarsın: yalnızca
    <strong>çukur</strong>.</p>

    <p><strong>8 · Cisim tam odaktaysa görüntü oluşmaz.</strong> Yansıyan ışınlar paralel
    çıkar, hiçbir yerde kesişmez. “Görüntü sonsuzda” denir. Simülasyonda a = f yaparak gör.</p>`
},

/* ----------------------------------------------------- Zorlayıcı sorular */
osym: [
  {
    baslik: 'R ile f karışıklığı',
    kaynak: 'Tanım tuzağı',
    govde: `
      <p>Bir çukur aynanın <strong>eğrilik yarıçapı 48 cm</strong>&rsquo;dir.</p>
      <p>Asal eksene paralel gelen ve eksene <strong>çok yakın</strong> olan bir ışın
      yansıdıktan sonra ekseni tepe noktasından kaç cm uzakta keser?</p>
      <p>Aynı ayna için, eksenden <strong>24 cm</strong> uzaklıkta paralel gelen bir ışın
      ekseni tepe noktasından kaç cm uzakta keser?</p>`,
    gorsel: `
      <svg viewBox="0 0 520 210" xmlns="http://www.w3.org/2000/svg" role="img"
           aria-label="Çukur aynada eksene yakın ve kenar ışının farklı noktalarda kesişmesi">
        <rect width="520" height="210" fill="#0E1726"/>
        <path d="M30 105 H500" stroke="#4A5F86" stroke-width="1.4" stroke-dasharray="7 5"/>
        <path d="M430 25 A 200 200 0 0 0 430 185" fill="none" stroke="#8FB6EC" stroke-width="4"/>
        <circle cx="255" cy="105" r="4" fill="#FF6B6B"/>
        <text x="255" y="94" fill="#FF6B6B" font-size="12" font-family="system-ui" text-anchor="middle" font-weight="700">M</text>
        <circle cx="342" cy="105" r="4" fill="#FFB020"/>
        <text x="342" y="94" fill="#FFB020" font-size="12" font-family="system-ui" text-anchor="middle" font-weight="700">F</text>
        <circle cx="430" cy="105" r="4" fill="#EAF0FA"/>
        <text x="430" y="94" fill="#EAF0FA" font-size="12" font-family="system-ui" text-anchor="middle" font-weight="700">T</text>
        <path d="M40 95 H428" stroke="#FFB020" stroke-width="2"/>
        <path d="M428 95 L300 105" stroke="#FFB020" stroke-width="2"/>
        <path d="M40 40 H408" stroke="#FF6B6B" stroke-width="2"/>
        <path d="M408 40 L300 105" stroke="#FF6B6B" stroke-width="2"/>
        <text x="60" y="34" fill="#FF6B6B" font-size="11" font-family="system-ui">kenar ışın</text>
        <text x="60" y="89" fill="#FFB020" font-size="11" font-family="system-ui">eksene yakın ışın</text>
        <text x="265" y="200" fill="#6F84A8" font-size="11" font-family="system-ui" text-anchor="middle">R = 48 cm</text>
      </svg>`,
    secenekler: [
      '24 cm · 20,3 cm',
      '24 cm · 24 cm',
      '48 cm · 24 cm',
      '12 cm · 10,2 cm',
      '24 cm · 27,7 cm'
    ],
    dogru: 0,
    cozum: `
      <p><strong>Eksene yakın ışın (paraksiyel):</strong></p>
      <div class="formul" style="max-width:260px;margin:10px 0">
        <div class="fm">f = R/2 = 48/2 = <strong>24 cm</strong></div>
      </div>

      <p><strong>Kenar ışın:</strong> Önce açıyı bul:</p>
      <div class="formul" style="max-width:300px;margin:10px 0">
        <div class="fm">sin θ = u/R = 24/48 = 0,5 ⟹ θ = <strong>30°</strong></div>
      </div>
      <p>Sonra tam formülü uygula:</p>
      <div class="formul" style="max-width:420px;margin:10px 0;border-top-color:var(--accent)">
        <div class="fm" style="color:var(--accent)">d = R − R/(2cos30°) = 48 − 48/(2·0,866) = 48 − 27,7 = <strong>20,3 cm</strong></div>
      </div>

      <p><strong>Küresel sapma:</strong> <code>24 − 20,3 = 3,7 cm</code> — odak uzaklığının
      yaklaşık <strong>%15</strong>&rsquo;i. Hiç de ihmal edilebilir değil.</p>

      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>B şıkkı</strong> “bütün ışınlar odakta toplanır”
        varsayımını yapıyor — ders düzeyinde öğretilen ama <em>tam</em> olmayan cevap.
        <br><strong>C şıkkı</strong> R ile f&rsquo;yi karıştırıyor.
        <br><strong>E şıkkı</strong> <code>R/(2cos θ) = 27,7</code> ara sonucunu cevap
        sanıyor — bu, kesişme noktasının <em>merkeze</em> uzaklığı, tepeye değil.
        <br><strong>Simülasyonda:</strong> 3. düzenekte R = 48, açıklık 30° yap; okumalarda
        tam bu iki sayıyı göreceksin.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: A</strong></p>`
  },
  {
    baslik: 'Özel ışınların gerekçesi',
    kaynak: 'Kavram',
    govde: `
      <p>Küresel aynalarla ilgili aşağıdaki yargıları inceleyiniz:</p>
      <ol style="margin-left:.2em">
        <li>Merkezden geçen ışın, aynaya dik çarptığı için geldiği yoldan geri döner.</li>
        <li>Odaktan geçerek gelen ışının eksene paralel yansıması, ışığın tersinirliğinin
        bir sonucudur.</li>
        <li>Tümsek aynada odak sanaldır, çünkü yansıyan ışınlar değil uzantıları kesişir.</li>
        <li>Tümsek aynada da cisim odakla ayna arasına konursa gerçek görüntü elde edilir.</li>
      </ol>
      <p>Hangileri <strong>doğrudur</strong>?</p>`,
    secenekler: [
      'I, II ve III',
      'I ve III',
      'II, III ve IV',
      'Yalnız I',
      'Hepsi'
    ],
    dogru: 0,
    cozum: `
      <ol>
        <li><strong>Doğru.</strong> Merkezden geçen ışın yarıçap doğrultusundadır; yarıçap
        yüzeye diktir ⟹ i = 0° ⟹ r = 0° ⟹ geri döner.</li>
        <li><strong>Doğru.</strong> 1. özel ışın “paralel gelir, odaktan geçer” der.
        Işığın yolu tersinir olduğundan aynı yol ters yönde de geçerlidir: “odaktan gelir,
        paralel yansır”. İki kural aslında <em>tek</em> kuraldır.</li>
        <li><strong>Doğru.</strong> Tümsek aynada yansıyan ışınlar ıraksar, hiçbir noktada
        gerçekten kesişmez. Yalnızca geriye doğru uzantıları aynanın arkasındaki F&rsquo;de
        birleşir ⟹ <strong>sanal odak</strong>.</li>
        <li><strong>Yanlış.</strong> Tümsek ayna <strong>hiçbir koşulda</strong> gerçek
        görüntü veremez. Cisim nerede olursa olsun görüntü sanal, düz ve küçüktür.</li>
      </ol>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>IV. yargı</strong> çukur aynanın davranışını tümseğe
        uyarlama hatasıdır. Çukur aynada “cisim odakla ayna arasında ⟹ sanal, düz, büyük”
        doğrudur; tümsekte böyle bir durum yoktur.
        <br><strong>Hızlı sağlama:</strong> Tümsek ayna ışığı <em>dağıtır</em>. Dağılan
        ışınlar bir noktada buluşamaz; buluşamayan ışın gerçek görüntü veremez.
        <br><strong>Nerede görürsün:</strong> Market ve otopark güvenlik aynaları, araç
        sağ dikiz aynası — hepsi tümsektir, çünkü <em>geniş alanı küçülterek</em> gösterirler.
        Aynanın üzerindeki “cisimler göründüğünden daha yakındır” uyarısı da tam bu yüzden
        vardır.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: A</strong></p>`
  }
],

/* --------------------------------------------- Bağlam temelli sorular */
baglam: [
  {
    baslik: 'Güneş fırını neden çukur ayna?',
    govde: `
      <p>Fransa&rsquo;daki Odeillo Güneş Fırını, dev bir <strong>çukur ayna</strong> ile
      güneş ışığını tek noktada toplayarak <strong>3000 °C</strong>&rsquo;nin üzerine
      çıkabiliyor. Aynı ilke, kamp malzemesi olarak satılan küçük güneş ocaklarında da
      kullanılıyor.</p>
      <p>Bir öğrenci deney için <strong>eğrilik yarıçapı 80 cm</strong> olan bir çukur ayna
      alıyor ve güneşe doğrultuyor.</p>
      <p><strong>Kâğıdı aynadan kaç cm uzağa tutmalı? Ayna neden tümsek olamaz? Aynanın
      açıklığını çok büyütürse ne olur?</strong></p>`,
    gorsel: `
      <svg viewBox="0 0 520 220" xmlns="http://www.w3.org/2000/svg" role="img"
           aria-label="Çukur aynanın güneş ışınlarını odakta toplaması">
        <rect width="520" height="220" fill="#0E1726"/>
        <path d="M30 110 H500" stroke="#4A5F86" stroke-width="1.4" stroke-dasharray="7 5"/>
        <path d="M440 22 A 210 210 0 0 0 440 198" fill="none" stroke="#8FB6EC" stroke-width="5"/>
        <path d="M30 40 H436 M30 62 H430 M30 84 H428 M30 110 H428 M30 136 H428 M30 158 H430 M30 180 H436"
              stroke="#FFB020" stroke-width="1.8"/>
        <path d="M436 40 L352 110 M430 62 L352 110 M428 84 L352 110 M428 110 L352 110 M428 136 L352 110 M430 158 L352 110 M436 180 L352 110"
              stroke="#FFB020" stroke-width="1.8"/>
        <circle cx="352" cy="110" r="9" fill="#FFE9A8" opacity=".35"/>
        <circle cx="352" cy="110" r="4" fill="#FF6B6B"/>
        <text x="352" y="98" fill="#FF6B6B" font-size="12" font-family="system-ui" text-anchor="middle" font-weight="700">F</text>
        <circle cx="46" cy="24" r="16" fill="#FAC775"/>
        <text x="46" y="56" fill="#FAC775" font-size="11" font-family="system-ui" text-anchor="middle">Güneş</text>
        <text x="392" y="212" fill="#6F84A8" font-size="11" font-family="system-ui" text-anchor="middle">f = R/2</text>
      </svg>`,
    adimlar: [
      { bas: 'Güneş ışınları neden paralel?',
        metin: 'Güneş 150 milyon km uzakta. Bu kadar uzaktan gelen ışınlar birbirine pratik olarak <strong>paraleldir</strong> — yani asal eksene paralel gelen 1. özel ışın durumundayız.' },
      { bas: 'Nerede toplanırlar?',
        metin: 'Eksene paralel gelen ışınlar <strong>odakta</strong> toplanır. Optikte buna “sonsuzdaki cismin görüntüsü odaktadır” denir: <code>a = ∞ ⟹ b = f</code>.' },
      { bas: 'Kâğıdın yeri',
        metin: '<code>f = R/2 = 80/2 = <strong>40 cm</strong></code>. Kâğıt aynanın <strong>40 cm</strong> önüne tutulmalı.' },
      { bas: 'Neden tümsek olamaz?',
        metin: 'Tümsek ayna ışığı <strong>dağıtır</strong>. Odağı sanaldır — ışınlar aynanın arkasındaki bir noktadan <em>geliyormuş gibi</em> yayılır ama oraya gerçek enerji ulaşmaz. Kâğıdı oraya tutamazsın bile, ayna orada.' },
      { bas: 'Açıklık çok büyürse',
        metin: 'Küresel sapma devreye girer. Kenar ışınlar odaktan <strong>öne</strong> kayar; enerji tek bir noktaya değil bir <strong>lekeye</strong> yayılır, sıcaklık düşer. <code>Δ = (R/2)(sec θ − 1)</code> ile hesaplanır: 80 cm&rsquo;lik aynada θ = 30° için Δ = 6,2 cm.' },
      { bas: 'Gerçek çözüm',
        metin: 'Odeillo gibi tesislerde ayna <strong>parabolik</strong>tir. Parabol, açıklık ne olursa olsun paralel ışınların <em>tamamını</em> tek noktada toplar — küresel sapma sıfırdır.' }
    ],
    secenekler: [
      '40 cm; tümsek ayna ışığı dağıtır ve odağı sanaldır; açıklık büyürse küresel sapma yüzünden ışık lekeye yayılır',
      '80 cm; tümsek ayna da kullanılabilir; açıklık büyürse daha çok ısı toplanır',
      '40 cm; tümsek ayna da kullanılabilir ama daha zayıftır; açıklığın etkisi yoktur',
      '20 cm; tümsek ayna kullanılamaz; açıklık büyürse odak keskinleşir',
      '160 cm; ayna türü fark etmez'
    ],
    dogru: 0,
    cozum: `
      <div class="formul" style="max-width:280px;margin:10px 0;border-top-color:var(--accent)">
        <div class="fm" style="color:var(--accent)">f = R/2 = 80/2 = 40 cm</div>
      </div>
      <p>Sonsuzdaki cismin (Güneş) görüntüsü odakta oluşur.</p>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>B şıkkı</strong> R ile f&rsquo;yi karıştırıyor
        <em>ve</em> tümsek aynayı kabul ediyor — iki hata birden.
        <br><strong>D şıkkı</strong> f&rsquo;yi R/4 sanıyor ve açıklık büyüyünce odağın
        keskinleşeceğini söylüyor; gerçekte tam tersi olur.
        <br><strong>Güvenlik notu:</strong> Bu deneyi yapacaksan <strong>odak noktasına
        çıplak elle dokunma</strong> ve aynayı asla güneşten yansıyan ışık bir insana ya da
        yanıcı maddeye gelecek şekilde bırakma. 20 cm&rsquo;lik bir ayna bile kâğıdı
        saniyeler içinde tutuşturabilir.
        <br><strong>İlgili tarih:</strong> Arşimet&rsquo;in Roma gemilerini aynalarla
        yaktığı anlatısı da bu ilkeye dayanır; modern denemeler bunun pratikte çok zor
        olduğunu gösterdi — çünkü açıklık büyüdükçe sapma da büyüyor.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: A</strong></p>`
  },
  {
    baslik: 'Otopark aynası ve diş hekimi aynası',
    govde: `
      <p>Otoparkların köşesine takılan geniş açılı güvenlik aynaları <strong>tümsektir</strong>.
      Diş hekimlerinin ağız içine tuttuğu küçük ayna ise <strong>çukurdur</strong>.</p>
      <p>Bir öğrenci “ikisi de ayna, neden farklı türde?” diye soruyor.</p>
      <p><strong>Her birinin neden o türde seçildiğini, görüntü özellikleriyle açıkla.</strong></p>`,
      gorsel: `
      <svg viewBox="0 0 520 210" xmlns="http://www.w3.org/2000/svg" role="img"
           aria-label="Tümsek güvenlik aynası geniş alanı küçük gösterir, çukur diş aynası yakın cismi büyütür">
        <rect width="520" height="210" fill="#0E1726"/>
        <line x1="260" y1="16" x2="260" y2="194" stroke="#2E3C57" stroke-width="1.6"/>
        <text x="128" y="28" fill="#8FB6EC" font-size="12" font-family="system-ui" text-anchor="middle" font-weight="700">TÜMSEK · güvenlik</text>
        <path d="M78 60 A 90 90 0 0 1 78 160" fill="none" stroke="#8FB6EC" stroke-width="4"/>
        <path d="M78 110 L200 56 M78 110 L206 110 M78 110 L200 164"
              stroke="#FFB020" stroke-width="1.8"/>
        <text x="150" y="190" fill="#35C08A" font-size="11" font-family="system-ui" text-anchor="middle">geniş görüş · küçük görüntü</text>
        <text x="388" y="28" fill="#8FB6EC" font-size="12" font-family="system-ui" text-anchor="middle" font-weight="700">ÇUKUR · diş</text>
        <path d="M450 62 A 90 90 0 0 0 450 158" fill="none" stroke="#8FB6EC" stroke-width="4"/>
        <path d="M318 110 h96" stroke="#4A5F86" stroke-width="1.4" stroke-dasharray="6 4"/>
        <circle cx="404" cy="110" r="5" fill="#35C08A"/>
        <text x="404" y="98" fill="#35C08A" font-size="11" font-family="system-ui" text-anchor="middle">diş</text>
        <path d="M330 78 L330 142" stroke="#FF6B6B" stroke-width="4"/>
        <text x="368" y="190" fill="#FF6B6B" font-size="11" font-family="system-ui" text-anchor="middle">yakın cisim · büyük görüntü</text>
      </svg>`,
    adimlar: [
      { bas: 'Güvenlik aynasının işi',
        metin: 'Amaç, <strong>mümkün olduğunca geniş bir alanı</strong> tek bakışta görmek. Büyütme değil, <strong>görüş açısı</strong> önemli.' },
      { bas: 'Tümsek ayna neden uygun?',
        metin: 'Tümsek ayna ışığı dağıttığı için çok geniş bir alandan gelen ışınları küçük bir görüntüye sıkıştırır. Görüntü daima <strong>sanal, düz ve küçüktür</strong> — “düz” olması önemli, ters görüntü sürücüyü yanıltırdı.' },
      { bas: 'Bedeli ne?',
        metin: 'Cisimler <strong>olduğundan küçük</strong> göründüğü için beyin onları <em>uzak</em> sanar. Araç dikiz aynalarındaki “cisimler göründüğünden daha yakındır” uyarısı tam bu yüzden yazılıdır.' },
      { bas: 'Diş aynasının işi',
        metin: 'Amaç tam tersi: <strong>çok yakındaki küçük bir cismi büyük</strong> görmek.' },
      { bas: 'Çukur ayna neden uygun?',
        metin: 'Çukur aynada cisim <strong>odakla ayna arasına</strong> konursa görüntü <strong>sanal, düz ve büyük</strong> olur. Hekim dişi aynaya yeterince yaklaştırdığında büyütülmüş ve düz bir görüntü elde eder.' },
      { bas: 'Kritik koşul',
        metin: 'Diş, <strong>odaktan uzağa</strong> giderse görüntü gerçek ve <strong>ters</strong> olur — kullanılamaz. Bu yüzden diş aynalarının odak uzaklığı, kullanım mesafesinden <strong>büyük</strong> olacak şekilde seçilir (küçük R, az bükey).' }
    ],
    secenekler: [
      'Güvenlik aynası tümsektir çünkü geniş alanı sanal-düz-küçük gösterir; diş aynası çukurdur ve diş odak içine konularak sanal-düz-büyük görüntü elde edilir',
      'İkisi de aynı türdedir, yalnızca boyutları farklıdır',
      'Güvenlik aynası çukur, diş aynası tümsektir',
      'Güvenlik aynası tümsektir çünkü büyütür; diş aynası çukurdur çünkü küçültür',
      'Fark aynanın türünden değil, sırlama kalınlığından gelir'
    ],
    dogru: 0,
    cozum: `
      <table class="degisken-tablo">
        <thead><tr><th></th><th>Güvenlik aynası</th><th>Diş aynası</th></tr></thead>
        <tbody>
          <tr><td>Tür</td><td>Tümsek</td><td>Çukur</td></tr>
          <tr><td>Cismin yeri</td><td>fark etmez</td><td>odakla ayna arasında</td></tr>
          <tr><td>Görüntü</td><td>sanal · düz · küçük</td><td>sanal · düz · büyük</td></tr>
          <tr><td>Amaç</td><td>geniş görüş açısı</td><td>büyütme</td></tr>
        </tbody>
      </table>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>D şıkkı</strong> iki tanımı da ters çevirmiş — ama
        sonucu doğru türlerle eşleştirdiği için hızlı okumada kaçabilir. Şıkları
        <em>gerekçesiyle</em> okumak gerekiyor.
        <br><strong>Ortak nokta:</strong> Her iki ayna da <strong>sanal ve düz</strong>
        görüntü verir. İnsanın doğrudan baktığı aynalar hep böyledir; ters görüntü
        kullanışsız olurdu.
        <br><strong>Kendin gör:</strong> Bir çelik kaşığın <em>iç</em> yüzüne bak
        (çukur) — yakınken düz ve büyük, uzaklaştırınca ters döner. <em>Dış</em> yüzüne
        bak (tümsek) — ne yaparsan yap hep düz ve küçük. Tek bir kaşıkla bu konunun
        tamamı test edilebilir.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: A</strong></p>`
  }
]

});
})();
