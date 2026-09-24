(function () {
"use strict";
const F = window.F11;

/* ==========================================================================
   topics/u2-miknatislar.js
   Konu 2.2.1 · Mıknatısların etkileşimi ve manyetik alan  (MEB 11, s.186-197)
   ========================================================================== */

F.konuKaydet('u2-miknatislar', {

ozet: `Mıknatısın <strong>iki kutbu vardır ve bunlar ayrılamaz</strong>. Elektrikte artı ve
eksi yükü ayrı ayrı elde edebilirsin; mıknatısta bunun karşılığı yoktur. Bu tek fark,
manyetik alan çizgilerinin neden <strong>kapalı eğriler</strong> olduğunu ve konunun
geri kalanını belirler.`,

/* ------------------------------------------------------------- Kavram */
kavram: `
<p>Doğal mıknatıs, bir demir oksit bileşiği olan <strong>manyetit</strong>
(Fe₃O₄) taşıdır. Antik çağda bu taşın demiri çektiği biliniyordu. 1269&rsquo;da
<strong>Pierre de Maricourt</strong>, küresel bir doğal mıknatısın yüzeyine iğneler
yerleştirerek iğnelerin belirli iki noktaya yöneldiğini gördü ve bu noktalara
<strong>kutup</strong> adını verdi.</p>

<div class="kutu nott" style="margin:16px 0">
  <div class="kutu-bas"><span class="ikon">📍</span><span>Manisa adı buradan geliyor</span></div>
  <p style="margin:0">Mıknatıs taşı yataklarının bulunduğu antik <strong>Magnesia</strong>
  bölgesi, bugünkü <strong>Manisa</strong>&rsquo;dır. Avrupa dillerindeki
  <em>magnet</em> sözcüğü de aynı kökten gelir.</p>
</div>

<h3 style="margin-top:22px">Kutuplar ayrılamaz</h3>
<p>Bir çubuk mıknatısı tam ortasından ikiye bölersen elinde <strong>bir N ve bir S
parçası</strong> olmaz. İki parçanın <strong>her biri</strong> yeniden N ve S kutbuna
sahip, eksiksiz birer mıknatıs olur. Bölmeye devam etsen sonuç değişmez.</p>

<div class="formul" style="max-width:360px;margin:14px 0;border-top-color:var(--accent)">
  <div class="fm" style="color:var(--accent)">Manyetik tek kutup (monopol) yoktur</div>
  <div class="fm-ad">Elektrikten en temel farkı budur</div>
</div>

<h3 style="margin-top:22px">Manyetik alan ve çizgileri</h3>
<p>Mıknatısın çevresindeki etkiye <strong>manyetik alan</strong> denir,
<strong>B</strong> ile gösterilir ve birimi <strong>tesla (T)</strong>&rsquo;dır. Tesla
büyük bir birimdir; günlük değerler çok küçüktür:</p>
<table class="degisken-tablo">
  <thead><tr><th>Kaynak</th><th>B</th></tr></thead>
  <tbody>
    <tr><td>Dünya&rsquo;nın manyetik alanı</td><td class="sembol">≈ 50 μT</td></tr>
    <tr><td>Buzdolabı mıknatısı</td><td class="sembol">≈ 5 mT</td></tr>
    <tr><td>MR cihazı</td><td class="sembol">1,5 – 3 T</td></tr>
  </tbody>
</table>

<p style="margin-top:14px">Alan çizgilerinin kuralları, elektriksel alandakine çok benzer
ama <strong>bir tanesi farklıdır</strong>:</p>
<ul>
  <li>Mıknatısın <strong>dışında</strong> N&rsquo;den çıkar, S&rsquo;ye girer</li>
  <li>Mıknatısın <strong>içinde</strong> S&rsquo;den N&rsquo;ye devam eder</li>
  <li>Yani çizgiler <strong>kapalı eğrilerdir</strong> — başlangıcı ve sonu yoktur</li>
  <li>Asla <strong>kesişmezler</strong></li>
  <li><strong>Sıklıkları</strong> alanın şiddetini gösterir</li>
</ul>

<div class="kutu dikkat" style="margin:16px 0">
  <div class="kutu-bas"><span class="ikon">⚠</span><span>Elektrikle en kritik fark</span></div>
  <p style="margin:0">Elektriksel alan çizgileri <strong>açıktır</strong>: artı yükte
  <em>başlar</em>, eksi yükte <em>biter</em>. Manyetik alan çizgileri
  <strong>kapalıdır</strong>: hiçbir yerde başlamaz, hiçbir yerde bitmez.
  Sebebi tektir — <strong>manyetik tek kutup olmadığı için</strong> çizginin
  başlayacağı ya da biteceği bir “kaynak” yoktur.</p>
</div>

<h3 style="margin-top:22px">Pusula ve Dünya</h3>
<p>Pusula iğnesi küçük bir mıknatıstır ve bulunduğu noktadaki alana
<strong>teğet</strong> durur. İğnenin <strong>N ucu</strong> alanın yönünü gösterir.</p>

<div class="kutu puf" style="margin:16px 0">
  <div class="kutu-bas"><span class="ikon">🧭</span><span>Coğrafi kuzeyde manyetik GÜNEY kutbu var</span></div>
  <p style="margin:0">Pusulanın N ucu kuzeyi gösteriyorsa, oraya çeken şey bir
  <strong>S kutbu</strong> olmalıdır — çünkü zıt kutuplar çeker. Yani Dünya&rsquo;nın
  <strong>manyetik güney kutbu coğrafi kuzeyindedir</strong>. Bu, konunun en sık
  sorulan ayrıntısıdır.</p>
</div>

<p>İki kuzey tam olarak aynı yerde değildir. Aralarındaki açıya <strong>sapma
(deklinasyon) açısı</strong> denir ve Türkiye için yaklaşık <strong>5–6° doğu</strong>dur.
Ayrıca Dünya&rsquo;nın alanı yere paralel değildir; <strong>yatay</strong> ve
<strong>düşey</strong> bileşenleri vardır ve pusula yalnızca yatay bileşeni izler.</p>

<h3 style="margin-top:22px">Hangi maddeler mıknatıslanır?</h3>
<table class="degisken-tablo">
  <thead><tr><th>Tür</th><th>Davranış</th><th>Örnek</th></tr></thead>
  <tbody>
    <tr><td><strong>Ferromanyetik</strong></td><td>güçlü çekilir, mıknatıs kalabilir</td><td>demir, nikel, kobalt</td></tr>
    <tr><td>Paramanyetik</td><td>çok zayıf çekilir</td><td>alüminyum, platin</td></tr>
    <tr><td>Diamanyetik</td><td>çok zayıf <em>itilir</em></td><td>bakır, su, altın</td></tr>
  </tbody>
</table>
<p style="margin-top:10px;color:var(--text-2)">Ferromanyetik bir madde yeterince ısıtılırsa
mıknatıslığını kaybeder. Bu eşiğe <strong>Curie sıcaklığı</strong> denir; demir için
yaklaşık <strong>770 °C</strong>&rsquo;dir.</p>

<h3 style="margin-top:22px">Dünya&rsquo;nın alanı bir kalkandır</h3>
<p>Güneş&rsquo;ten gelen yüksek enerjili yüklü parçacıklar (güneş rüzgârı) Dünya&rsquo;nın
manyetik alanı tarafından saptırılır. Bir kısmı <strong>Van Allen radyasyon
kuşakları</strong>nda hapsolur. Kutuplara yakın bölgelerde alan çizgileri atmosfere
daldığı için parçacıklar oraya ulaşır ve <strong>kutup ışıklarını</strong> (auroralar)
oluşturur.</p>`,

/* ---------------------------------------------------------- Formüller */
formuller: {
  liste: [
    { fm: 'B — manyetik alan',      aciklama: 'Birimi tesla (T)' },
    { fm: '1 T = 10⁴ gauss',        aciklama: 'Eski birimle çevrim' },
    { fm: '1 μT = 10⁻⁶ T',          aciklama: 'Dünya’nın alanı bu mertebededir' },
    { fm: 'B<sub>Dünya</sub> ≈ 50 μT', aciklama: 'Ülkemizde ≈ 48 μT, yatay bileşeni ≈ 25 μT' },
    { fm: 'B<sub>top</sub>² = B<sub>yatay</sub>² + B<sub>düşey</sub>²', aciklama: 'Bileşenler dik — Pisagor' }
  ],
  degiskenler: [
    { sembol: 'B', ad: 'Manyetik alan',     birim: 'T' },
    { sembol: 'N', ad: 'Kuzey kutbu',       birim: '—' },
    { sembol: 'S', ad: 'Güney kutbu',       birim: '—' },
    { sembol: 'δ', ad: 'Sapma açısı',       birim: '°' }
  ]
},

/* ------------------------------------------------------------ Türetim */
turetim: {
  yollar: [
    {
      ad: 'Tek kutup neden yok?',
      adimlar: [
        { baslik: 'Deneyi yap',
          html: `<p>Bir çubuk mıknatısı tam ortasından kes. Beklenti şu olurdu: bir parçada
                 yalnız N, diğerinde yalnız S kalsın.</p>` },

        { baslik: 'Sonucu gözle',
          html: `<p>Olan bu değildir. Her iki parça da <strong>kendi N ve S kutbuna</strong>
                 sahip, tam birer mıknatıstır. Kesme noktasında yeni kutuplar belirir.</p>` },

        { baslik: 'Sebebini söyle',
          html: `<p>Mıknatıslık, maddenin içindeki <strong>her bir atomun</strong> küçük bir
                 mıknatıs gibi davranmasından gelir. Kestiğinde bu küçük mıknatısları
                 bölmüş olmazsın; yalnızca gruplarını ayırırsın.</p>` },

        { baslik: 'Alan çizgilerine bağla',
          html: `<p>Çizginin başlayabileceği tek bir kutup olmadığına göre çizgiler
                 <strong>hiçbir yerde başlamaz ve bitmez</strong>:</p>
                 <div class="formul" style="max-width:280px;border-top-color:var(--accent)">
                   <div class="fm" style="color:var(--accent)">manyetik çizgiler KAPALIDIR</div>
                 </div>
                 <p>Elektrikte çizgiler artı yükte başlayıp eksi yükte biter, çünkü orada
                 <strong>tek başına</strong> artı ya da eksi yük bulunabilir.</p>` }
      ]
    },
    {
      ad: 'Pusula neden kuzeyi gösterir?',
      adimlar: [
        { baslik: 'Gözlemi yaz',
          html: `<p>Serbestçe dönebilen bir mıknatısın <strong>N ucu</strong> her zaman
                 coğrafi kuzeye döner.</p>` },

        { baslik: 'Hangi kuvvet döndürüyor?',
          html: `<p>Bir şey o N ucunu kuzeye <strong>çekiyor</strong> olmalı. Kutuplar arası
                 kural nedir? <strong>Zıt kutuplar çeker.</strong></p>` },

        { baslik: 'Kaçınılmaz sonuca var',
          html: `<p>N ucunu çeken şey bir <strong>S kutbu</strong>dur:</p>
                 <div class="formul" style="max-width:340px;border-top-color:var(--accent)">
                   <div class="fm" style="color:var(--accent)">Coğrafi KUZEY = manyetik GÜNEY kutbu</div>
                 </div>
                 <p>İsimlendirme kafa karıştırıcıdır ama mantık tektir: pusula kuzeyi
                 gösteriyorsa, kuzeyde onu çeken zıt kutup vardır.</p>` },

        { baslik: 'Sapmayı ekle',
          html: `<p>Manyetik kutup coğrafi kutupla <strong>çakışmaz</strong>. Aradaki açı
                 <strong>sapma açısıdır</strong> ve bulunduğun yere göre değişir. Haritacılık
                 ve havacılıkta bu açı düzeltme olarak hesaba katılır.</p>` }
      ]
    },
    {
      ad: 'Nötr nokta nerede oluşur?',
      adimlar: [
        { baslik: 'Sorunun kalıbını tanı',
          html: `<p>İki mıknatısın alanlarının <strong>birbirini götürdüğü</strong> nokta
                 aranıyor. Orada pusula iğnesi kararsız kalır, yön göstermez.</p>` },

        { baslik: 'Yönleri çiz',
          html: `<p>Her mıknatısın o noktadaki alan yönünü ayrı ayrı çiz. Nötr nokta ancak
                 <strong>iki alan zıt yönlü</strong> olduğunda mümkündür.</p>` },

        { baslik: 'Hangi dizilimde olur?',
          html: `<ul>
                   <li><strong>Aynı kutuplar karşı karşıya</strong> (N-N ya da S-S):
                   aradaki alanlar zıt yönlüdür ⟹ <strong>ortada nötr nokta vardır</strong></li>
                   <li><strong>Zıt kutuplar karşı karşıya</strong> (N-S): aradaki alanlar
                   aynı yöndedir ⟹ <strong>aralarında nötr nokta yoktur</strong></li>
                 </ul>` },

        { baslik: 'Eşit güçte değillerse',
          html: `<p>Mıknatıslardan biri daha güçlüyse nokta tam ortada olmaz,
                 <strong>zayıf olana yaklaşır</strong>. Mantık Coulomb’daki denge noktasıyla
                 birebir aynıdır.</p>
                 <p>Simülasyonda iki mıknatısı da <em>çevrik</em> yapıp aradaki nötr noktayı gör.</p>` }
      ]
    }
  ]
},

/* -------------------------------------------------------- Simülasyon */
sim: F.simler['miknatislar'],

/* ------------------------------------------------------- Püf noktası */
puf: {
  html: `
    <p><strong>1 · Coğrafi kuzey = manyetik güney.</strong> Bu konudaki bir numaralı
    tuzaktır. Soruda “Dünya&rsquo;nın kuzeyinde hangi kutup vardır?” diye sorulursa cevap
    <strong>S</strong>&rsquo;dir.</p>

    <p><strong>2 · Manyetik çizgiler KAPALI, elektrikse AÇIK.</strong> Şık içinde
    “manyetik alan çizgileri N&rsquo;de başlar S&rsquo;de biter” geçiyorsa <strong>yanlıştır</strong> —
    doğrusu “dışarıda N&rsquo;den çıkar S&rsquo;ye girer, <em>içeride devam eder</em>”.</p>

    <p><strong>3 · Mıknatısı bölme sorusu.</strong> Kaç parçaya bölersen böl, her parça
    <strong>iki kutuplu</strong> kalır. “Tek kutuplu parça elde edilir” diyen şık daima
    yanlıştır.</p>

    <p><strong>4 · Nötr nokta ezberi:</strong></p>
    <table class="degisken-tablo" style="margin-top:8px">
      <thead><tr><th>Karşılaşan kutuplar</th><th>Aradaki alanlar</th><th>Nötr nokta</th></tr></thead>
      <tbody>
        <tr><td>Aynı (N-N, S-S)</td><td>zıt yönlü</td><td class="sembol">VAR</td></tr>
        <tr><td>Zıt (N-S)</td><td>aynı yönlü</td><td class="sembol">YOK</td></tr>
      </tbody>
    </table>

    <p style="margin-top:14px"><strong>5 · Pusula iğnesi çizgiye teğettir</strong>, çizgiyi
    kesmez. Şekilli sorularda iğneyi çizgiye dik çizen şık yanlıştır.</p>

    <p><strong>6 · Ferromanyetik üçlüyü ezberle:</strong> <strong>demir, nikel, kobalt</strong>.
    Alüminyum ve bakır bu listede <em>yoktur</em> — bakır elektriği iyi iletir ama
    mıknatısa yapışmaz. Bu ikisi karıştırılır.</p>

    <p><strong>7 · Isıtma mıknatıslığı bozar.</strong> Curie sıcaklığının üstünde
    (demir için 770 °C) düzenli yapı bozulur ve mıknatıslık kaybolur. Sert darbe ve
    çekiçleme de aynı sonucu verir.</p>

    <div class="kutu puf" style="margin-top:14px">
      <div class="kutu-bas"><span class="ikon">🔗</span><span>Sonraki konuya köprü</span></div>
      <p style="margin:0">Burada mıknatısın alanını gördük. Sıradaki konuda aynı alanın
      <strong>akım geçen bir telin</strong> çevresinde de oluştuğunu göreceğiz. O an
      manyetizmanın aslında <em>hareketli yüklerin</em> işi olduğu ortaya çıkar — kalıcı
      mıknatıs ile elektromıknatıs aynı olayın iki yüzüdür.</p>
    </div>`
},

/* ----------------------------------------------------- Zorlayıcı sorular */
osym: [
  {
    baslik: 'Mıknatısı bölmek',
    kaynak: 'Kavram tuzağı',
    govde: `
      <p>Bir çubuk mıknatıs, şekildeki gibi önce ortadan, sonra elde edilen parçalardan biri
      yine ortadan kesiliyor.</p>
      <p>Buna göre aşağıdaki yargılardan hangileri <strong>doğrudur</strong>?</p>
      <ol style="margin-left:.2em">
        <li>Elde edilen her parça iki kutupludur.</li>
        <li>Yalnızca N kutbu taşıyan bir parça elde edilebilir.</li>
        <li>Kesme noktalarında yeni kutuplar oluşur.</li>
        <li>Parçalar küçüldükçe kutup sayısı azalır.</li>
      </ol>`,
    gorsel: `
      <svg viewBox="0 0 520 170" xmlns="http://www.w3.org/2000/svg" role="img"
           aria-label="Çubuk mıknatısın ikiye ve dörde bölünmesi, her parçanın yine iki kutuplu olması">
        <rect width="520" height="170" fill="#17223A"/>
        <rect x="60" y="24" width="180" height="30" fill="#E2483F"/>
        <rect x="240" y="24" width="180" height="30" fill="#2F6FD0"/>
        <text x="150" y="44" fill="#FFF" font-size="15" font-family="system-ui" text-anchor="middle" font-weight="700">N</text>
        <text x="330" y="44" fill="#FFF" font-size="15" font-family="system-ui" text-anchor="middle" font-weight="700">S</text>
        <rect x="60" y="72" width="80" height="26" fill="#E2483F"/>
        <rect x="140" y="72" width="80" height="26" fill="#2F6FD0"/>
        <rect x="250" y="72" width="80" height="26" fill="#E2483F"/>
        <rect x="330" y="72" width="80" height="26" fill="#2F6FD0"/>
        <g fill="#FFF" font-size="12" font-family="system-ui" text-anchor="middle" font-weight="700">
          <text x="100" y="90">N</text><text x="180" y="90">S</text>
          <text x="290" y="90">N</text><text x="370" y="90">S</text>
        </g>
        <rect x="60" y="118" width="40" height="22" fill="#E2483F"/>
        <rect x="100" y="118" width="40" height="22" fill="#2F6FD0"/>
        <rect x="150" y="118" width="40" height="22" fill="#E2483F"/>
        <rect x="190" y="118" width="40" height="22" fill="#2F6FD0"/>
        <g fill="#FFF" font-size="10" font-family="system-ui" text-anchor="middle" font-weight="700">
          <text x="80" y="134">N</text><text x="120" y="134">S</text>
          <text x="170" y="134">N</text><text x="210" y="134">S</text>
        </g>
        <text x="450" y="90" fill="#6F84A8" font-size="11" font-family="system-ui">her parça</text>
        <text x="450" y="106" fill="#6F84A8" font-size="11" font-family="system-ui">iki kutuplu</text>
      </svg>`,
    secenekler: [
      'I ve III',
      'Yalnız I',
      'I, II ve III',
      'II ve IV',
      'I, III ve IV'
    ],
    dogru: 0,
    cozum: `
      <ol>
        <li><strong>Doğru.</strong> Kaç kez bölersen böl, her parça eksiksiz bir mıknatıstır.</li>
        <li><strong>Yanlış.</strong> Manyetik tek kutup <strong>yoktur</strong>. Bu, doğanın
        bilinen temel özelliklerinden biridir.</li>
        <li><strong>Doğru.</strong> Kesme yüzeyinde hemen yeni bir N ve karşısında yeni bir S
        belirir — mıknatıslık atom ölçeğinden gelir.</li>
        <li><strong>Yanlış.</strong> Kutup sayısı azalmaz; her parçada <strong>daima iki</strong> kutup vardır.</li>
      </ol>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>Neden böyle?</strong> Mıknatıslık, maddedeki her atomun
        küçük bir mıknatıs gibi davranmasından doğar. Bir mıknatısı kesmek, bu küçük
        mıknatısları <em>ikiye bölmek</em> değil, yalnızca <em>gruplarını ayırmak</em>tır.
        Elektrikte ise tek bir elektronu ayırabilirsin — işte bu yüzden orada tek kutup vardır.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: A</strong></p>`
  },
  {
    baslik: 'Pusula ve Dünya’nın kutupları',
    kaynak: 'Klasik ayrıntı',
    govde: `
      <p>Bir öğrenci pusulanın <strong>N ucunun coğrafi kuzeyi</strong> gösterdiğini
      gözlemliyor.</p>
      <p>Bu gözlemden çıkarılabilecek doğru sonuçlar hangileridir?</p>
      <ol style="margin-left:.2em">
        <li>Dünya&rsquo;nın coğrafi kuzeyinde manyetik <strong>S</strong> kutbu vardır.</li>
        <li>Pusula iğnesi, bulunduğu noktadaki alana teğettir.</li>
        <li>Coğrafi kuzey ile manyetik kuzey tam olarak çakışır.</li>
        <li>Pusula, Dünya alanının <strong>yatay</strong> bileşenini izler.</li>
      </ol>`,
    secenekler: [
      'I, II ve IV',
      'I ve III',
      'Yalnız I',
      'II, III ve IV',
      'Hepsi'
    ],
    dogru: 0,
    cozum: `
      <ol>
        <li><strong>Doğru.</strong> Zıt kutuplar çeker. İğnenin N ucunu kuzeye çeken şey
        bir <strong>S kutbu</strong> olmalıdır.</li>
        <li><strong>Doğru.</strong> Serbest bir mıknatıs, bulunduğu noktadaki alan
        doğrultusuna yerleşir.</li>
        <li><strong>Yanlış.</strong> İkisi çakışmaz; aradaki açı <strong>sapma
        (deklinasyon) açısıdır</strong> ve yere göre değişir. Türkiye&rsquo;de yaklaşık 5–6° doğudur.</li>
        <li><strong>Doğru.</strong> İğne yatay düzlemde döndüğü için yalnızca
        <strong>yatay bileşeni</strong> görür. Düşey bileşeni ölçmek için
        <em>eğim (inklinasyon) pusulası</em> gerekir.</li>
      </ol>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>Sayıyla:</strong> Ankara&rsquo;da toplam alan
        ≈ 48 μT, yatay bileşeni ≈ 25 μT&rsquo;dir (IGRF 2026). Pisagor&rsquo;dan düşey bileşen:
        √(48² − 25²) ≈ <strong>41 μT</strong>. Yani alan aslında oldukça <em>dik</em> iner —
        pusula bunun yalnızca küçük bir kısmını kullanır.
        <br><strong>E şıkkı</strong> III’ü de doğru sayanlar için konmuştur; sapma açısı
        olmasaydı haritacılıkta düzeltme yapmaya gerek kalmazdı.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: A</strong></p>`
  }
],

/* --------------------------------------------- Bağlam temelli sorular */
baglam: [
  {
    baslik: 'Göçmen kuşlar yönlerini nasıl buluyor?',
    govde: `
      <p>Türkiye, dünyanın önemli kuş göç yollarından birinin üzerindedir. Her yıl milyonlarca
      kuş, kışlama ve üreme alanları arasında binlerce kilometre yol alır ve
      <strong>haritasız, pusulasız</strong> hedefine varır.</p>
      <p>Araştırmalar, birçok göçmen kuşun gözünde ve gagasında manyetik alana duyarlı
      yapılar bulunduğunu gösteriyor. Kuşlar Dünya&rsquo;nın alanını bir çeşit
      <strong>pusula</strong> gibi kullanıyor.</p>
      <p>Bir öğrenci soruyor: <em>“Dünya&rsquo;nın alanı yalnızca 50 μT. Buzdolabı
      mıknatısı bunun 100 katı. Bu kadar zayıf bir alan nasıl yön bilgisi taşıyabilir?”</em></p>
      <p><strong>Zayıf alanın nasıl yeterli olduğunu ve kuşun alandan hangi iki bilgiyi
      okuyabileceğini açıkla.</strong></p>`,
    gorsel: `
      <svg viewBox="0 0 520 210" xmlns="http://www.w3.org/2000/svg" role="img"
           aria-label="Dünya üzerindeki manyetik alan çizgilerinin enleme göre eğimi ve göç eden kuşlar">
        <rect width="520" height="210" fill="#17223A"/>
        <circle cx="260" cy="120" r="78" fill="#1B4A78"/>
        <ellipse cx="240" cy="108" rx="34" ry="20" fill="#3E7A4A"/>
        <ellipse cx="288" cy="140" rx="22" ry="14" fill="#3E7A4A"/>
        <g stroke="#5AA9E6" stroke-width="1.6" fill="none">
          <path d="M260 34 C 380 50, 400 190, 260 198"/>
          <path d="M260 34 C 140 50, 120 190, 260 198"/>
          <path d="M260 34 C 440 70, 450 170, 260 198"/>
          <path d="M260 34 C 80 70, 70 170, 260 198"/>
        </g>
        <g fill="#EAF0FA" font-size="11" font-family="system-ui">
          <text x="262" y="26" text-anchor="middle">manyetik S</text>
          <text x="262" y="208" text-anchor="middle">manyetik N</text>
        </g>
        <g fill="#FFD24A">
          <path d="M120 60 l10 -6 l10 6 l-10 4 z"/>
          <path d="M150 48 l10 -6 l10 6 l-10 4 z"/>
          <path d="M96 78 l10 -6 l10 6 l-10 4 z"/>
        </g>
        <text x="60" y="40" fill="#FFD24A" font-size="11" font-family="system-ui">göç yönü</text>
        <text x="392" y="112" fill="#8FB6EC" font-size="11" font-family="system-ui">ekvatorda</text>
        <text x="392" y="128" fill="#8FB6EC" font-size="11" font-family="system-ui">çizgiler yatay</text>
      </svg>`,
    adimlar: [
      { bas: 'Zayıflık sorununu çöz',
        metin: 'Alanın <strong>şiddeti</strong> önemli değil, <strong>yönü</strong> önemli. Pusula iğnesini döndürmek için büyük kuvvet gerekmez; sürtünmesi çok az bir iğne, çok küçük bir alanda bile yönelir. Kuşun algı yapısı da aynı mantıkla çalışır.' },
      { bas: 'Birinci bilgi: yön',
        metin: 'Alan çizgilerinin <strong>yatay doğrultusu</strong> kuzey-güney eksenini verir. Bu, klasik pusula bilgisidir.' },
      { bas: 'İkinci bilgi: enlem',
        metin: 'Çizgilerin yerle yaptığı <strong>eğim açısı</strong> enleme göre değişir: ekvatorda çizgiler neredeyse <strong>yatay</strong>, kutuplara gidildikçe gittikçe <strong>dikleşir</strong>. Kuş bu eğimi okuyarak <em>ne kadar kuzeyde</em> olduğunu kestirebilir.' },
      { bas: 'İkisini birleştir',
        metin: 'Yön + eğim = kaba bir <strong>koordinat</strong>. Yani Dünya’nın alanı kuşa hem pusula hem de enlem bilgisi verir.' },
      { bas: 'Sınırını da söyle',
        metin: 'Bu sistem tek başına yetmez; kuşlar Güneş’in konumunu, yıldızları ve yer şekillerini de kullanır. Ayrıca manyetik kutuplar <strong>yavaşça yer değiştirir</strong>, bu yüzden alan tek başına kusursuz bir harita değildir.' }
    ],
    secenekler: [
      'Alanın şiddeti değil yönü önemlidir; kuş hem yatay doğrultudan yönü hem eğim açısından enlemi okuyabilir',
      'Kuşlar alanın şiddetini ölçer; 50 μT yalnızca kutuplara yakın yerlerde yeterlidir',
      'Zayıf alan yön bilgisi veremez; kuşlar yalnızca Güneş’i kullanır',
      'Kuşlar manyetik alanı değil, yer çekimi alanındaki değişimi algılar',
      'Alan her yerde aynı olduğu için yalnızca kuzey-güney ayrımı yapılabilir'
    ],
    dogru: 0,
    cozum: `
      <p>Bir alanın <strong>yön</strong> bilgisi taşıması için güçlü olması gerekmez.
      Pusula iğnesini döndürmek neredeyse hiç enerji istemez.</p>
      <div class="formul" style="max-width:360px;margin:10px 0;border-top-color:var(--accent)">
        <div class="fm" style="color:var(--accent)">yatay doğrultu → yön &nbsp;·&nbsp; eğim açısı → enlem</div>
      </div>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>E şıkkı</strong> önemli bir yanlış varsayım içeriyor:
        Dünya&rsquo;nın alanı her yerde aynı <em>değildir</em>. Hem şiddeti hem eğimi enleme
        göre değişir — zaten bilgi taşımasının sebebi de budur.
        <br><strong>Bağlantı:</strong> Çizgilerin kutuplarda dikleşmesi, kutup ışıklarının
        neden yalnızca kutup bölgelerinde görüldüğünü de açıklar: yüklü parçacıklar
        çizgileri izleyerek oralarda atmosfere dalar.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: A</strong></p>`
  },
  {
    baslik: 'Kutup ışıkları neden sadece kutuplarda?',
    govde: `
      <p>Güneş, sürekli olarak yüksek enerjili yüklü parçacıklar yayar; buna
      <strong>güneş rüzgârı</strong> denir. Bu parçacıklar Dünya&rsquo;ya ulaştığında
      manyetik alan tarafından saptırılır ve bir kısmı <strong>Van Allen radyasyon
      kuşakları</strong>nda hapsolur.</p>
      <p>Buna rağmen <strong>kutup ışıkları</strong> (auroralar) neredeyse yalnızca
      kutuplara yakın bölgelerde görülür: Norveç, İzlanda, Kanada, Antarktika.
      İstanbul&rsquo;dan ya da Ankara&rsquo;dan görülmesi son derece nadirdir.</p>
      <p><strong>Manyetik alan çizgilerinin şeklini kullanarak bunun sebebini açıkla.
      Dünya&rsquo;nın alanı olmasaydı ne olurdu?</strong></p>`,
    gorsel: `
      <svg viewBox="0 0 520 210" xmlns="http://www.w3.org/2000/svg" role="img"
           aria-label="Güneş rüzgârının manyetik alan çizgileri boyunca kutuplara yönelmesi">
        <rect width="520" height="210" fill="#0B1020"/>
        <circle cx="300" cy="105" r="62" fill="#1B4A78"/>
        <ellipse cx="286" cy="96" rx="26" ry="16" fill="#3E7A4A"/>
        <g stroke="#5AA9E6" stroke-width="1.5" fill="none">
          <path d="M300 43 C 400 56, 414 154, 300 167"/>
          <path d="M300 43 C 200 56, 186 154, 300 167"/>
          <path d="M300 43 C 452 72, 460 140, 300 167"/>
          <path d="M300 43 C 148 72, 140 140, 300 167"/>
        </g>
        <g stroke="#FFD24A" stroke-width="2" fill="none">
          <path d="M20 60 L120 68"/><path d="M20 90 L130 96"/><path d="M20 120 L128 120"/>
        </g>
        <g fill="#FFD24A">
          <path d="M124 68 l-9 -4 l0 8 z"/><path d="M134 96 l-9 -4 l0 8 z"/><path d="M132 120 l-9 -4 l0 8 z"/>
        </g>
        <text x="24" y="44" fill="#FFD24A" font-size="11" font-family="system-ui">güneş rüzgârı</text>
        <ellipse cx="300" cy="40" rx="34" ry="9" fill="#35C08A" opacity=".75"/>
        <ellipse cx="300" cy="170" rx="34" ry="9" fill="#35C08A" opacity=".75"/>
        <text x="392" y="36" fill="#35C08A" font-size="11" font-family="system-ui">aurora</text>
        <text x="392" y="182" fill="#35C08A" font-size="11" font-family="system-ui">aurora</text>
      </svg>`,
    adimlar: [
      { bas: 'Parçacıkların yolunu düşün',
        metin: 'Yüklü parçacıklar manyetik alanda serbestçe her yöne gidemez; <strong>alan çizgilerini izleyerek</strong> sarmal çizerler.' },
      { bas: 'Çizgilerin şekline bak',
        metin: 'Dünya’nın alan çizgileri ekvator üzerinde <strong>yatay</strong> geçer, yani atmosfere girmez — parçacıkları teğet geçirip uzaklaştırır.' },
      { bas: 'Kutuplarda ne değişiyor?',
        metin: 'Çizgiler kutuplara yaklaştıkça <strong>dikleşir ve atmosfere dalar</strong>. Parçacıklar da onları izleyerek üst atmosfere girer.' },
      { bas: 'Işık nereden geliyor?',
        metin: 'Giren parçacıklar atmosferdeki oksijen ve azot atomlarına çarpar, onları uyarır. Atomlar eski hâline dönerken <strong>ışık yayar</strong>. Yeşil renk oksijenden, kırmızı-mor azottan gelir.' },
      { bas: 'Alan olmasaydı',
        metin: 'Güneş rüzgârı doğrudan atmosfere çarpar, zamanla atmosferi aşındırırdı. <strong>Mars</strong>’ın küresel manyetik alanı yoktur ve atmosferini büyük ölçüde bu şekilde kaybettiği düşünülmektedir.' }
    ],
    secenekler: [
      'Alan çizgileri kutuplarda atmosfere daldığı için parçacıklar oraya yönlendirilir; alan olmasaydı atmosfer aşınırdı',
      'Kutuplar Güneş’e daha yakın olduğu için parçacıklar oraya çarpar',
      'Kutuplarda hava daha soğuk olduğu için ışıma görünür hâle gelir',
      'Manyetik alan yalnızca kutuplarda bulunur, ekvatorda yoktur',
      'Parçacıklar ekvatorda da girer ama gündüz olduğu için görülmez'
    ],
    dogru: 0,
    cozum: `
      <p>Belirleyici olan <strong>çizgilerin geometrisidir</strong>: ekvatorda yatay
      (parçacıkları teğet geçirir), kutuplarda dik (atmosfere sokar).</p>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>D şıkkı</strong> yaygın bir yanlış: alan
        <em>her yerde</em> vardır, kutuplarda yalnızca <em>yönü</em> değişir.
        <br><strong>B şıkkı</strong> ölçek hatası: Dünya’nın yarıçapı Güneş uzaklığının
        yanında ihmal edilebilir; kutupların “daha yakın” olması diye bir şey yoktur.
        <br><strong>Mars karşılaştırması</strong> bu konunun en çarpıcı sonucudur:
        manyetik alan yalnızca bir fizik ayrıntısı değil, bir gezegende
        <strong>atmosferin kalıcılığını</strong> belirleyen etkendir.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: A</strong></p>`
  }
]

});
})();
