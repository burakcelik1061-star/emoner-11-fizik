(function () {
"use strict";
const F = window.F11;

/* ==========================================================================
   topics/u2-manyetik-aki.js
   Konu 2.3.1 · Manyetik akı  (MEB 11, s.236-241)
   ========================================================================== */

F.konuKaydet('u2-manyetik-aki', {

ozet: `Manyetik akı, bir yüzeyi <strong>kaç tane alan çizgisinin deldiğinin</strong> ölçüsüdür.
Tek başına pek bir işe yaramaz — ama bir sonraki konuda göreceğin gibi,
<strong>akının değişmesi elektrik üretir</strong>. Bütün elektrik santralleri bu tek cümle
üzerine kuruludur, o yüzden önce akıyı iyi tanımak gerekir.`,

/* ------------------------------------------------------------- Kavram */
kavram: `
<p>Bir tel çerçeveyi manyetik alanın içine koy. Alan çizgilerinden bir kısmı çerçevenin
içinden <strong>geçer</strong>, yani onu “deler”. İşte bu geçen çizgi miktarının ölçüsüne
<strong>manyetik akı</strong> denir ve <strong>Φ</strong> (fi) ile gösterilir.</p>

<div class="formul" style="max-width:320px;margin:14px 0;border-top-color:var(--accent)">
  <div class="fm" style="color:var(--accent)">Φ = B · A · cosθ</div>
  <div class="fm-ad">Birimi weber (Wb) · 1 Wb = 1 T·m²</div>
</div>

<h3 style="margin-top:22px">Üç değişken, üç ayrı yol</h3>
<p>Akıyı değiştirmenin <strong>üç</strong> yolu vardır ve hepsi ayrı ayrı önemlidir:</p>
<table class="degisken-tablo">
  <thead><tr><th>Değişen</th><th>Nasıl?</th><th>Örnek</th></tr></thead>
  <tbody>
    <tr><td><strong>B</strong></td><td>alanı güçlendir/zayıflat</td><td>mıknatısı yaklaştır</td></tr>
    <tr><td><strong>A</strong></td><td>çerçeveyi büyüt/küçült</td><td>çerçeveyi ez, alandan çıkar</td></tr>
    <tr><td><strong>θ</strong></td><td>çerçeveyi döndür</td><td>jeneratörün yaptığı iş</td></tr>
  </tbody>
</table>
<p style="margin-top:10px;color:var(--text-2)">Simülasyonda üç düzenek tam olarak bu üç
yolu ayrı ayrı gösterir.</p>

<div class="kutu dikkat" style="margin:16px 0">
  <div class="kutu-bas"><span class="ikon">⚠</span><span>θ neyin arasındaki açı?</span></div>
  <p style="margin:0">θ, yüzeyin <strong>NORMALİ</strong> (yüzeye dik doğrultu) ile manyetik
  alan arasındaki açıdır. Yüzeyin <em>kendisiyle</em> alan arasındaki açı değildir.</p>
  <ul style="margin:8px 0 0">
    <li>Alan yüzeye <strong>dik</strong> geçiyorsa normal ile alan aynı yönde ⟹
    θ = 0° ⟹ <strong>Φ en büyük</strong></li>
    <li>Alan yüzeye <strong>teğet</strong> ise (yüzeyi hiç delmiyor) ⟹
    θ = 90° ⟹ <strong>Φ = 0</strong></li>
  </ul>
  <p style="margin:8px 0 0">Bir önceki konudaki motor formülünde (τ = BiANcosθ) θ,
  <em>çerçeve düzlemi</em> ile alan arasındaydı. Tanımlar farklı — hangisini
  kullandığına dikkat et.</p>
</div>

<h3 style="margin-top:22px">Akı bir sayıdır, vektör değil</h3>
<p>B bir vektördü, A yönlü bir büyüklük gibi düşünülebilir — ama Φ
<strong>skalerdir</strong>. Yalnızca bir sayıdır ve <strong>işaretli</strong> olabilir:
çizgiler yüzeyi bir yönden deliyorsa pozitif, ters yönden deliyorsa negatif sayılır.</p>
<p>Bir çerçeve tam bir tur dönerken akı <code>+Φ<sub>maks</sub></code> ile
<code>−Φ<sub>maks</sub></code> arasında <strong>kosinüs eğrisi</strong> çizer. Simülasyondaki
Φ−θ grafiği tam olarak budur.</p>

<h3 style="margin-top:22px">Neden bu kadar önemli?</h3>
<div class="kutu puf" style="margin:16px 0">
  <div class="kutu-bas"><span class="ikon">⚡</span><span>Asıl mesele akının DEĞİŞİMİ</span></div>
  <p style="margin:0">Sabit bir akı hiçbir şey yapmaz. Çerçeveyi güçlü bir mıknatısın içinde
  kıpırdatmadan tutarsan, akı büyük olsa bile <strong>hiçbir akım üretilmez</strong>.</p>
  <p style="margin:8px 0 0">Elektrik üreten şey <strong>akının zamanla değişmesidir</strong>.
  Simülasyondaki <strong>Φ−t grafiğinin eğimi</strong>, bir sonraki konuda üreteceğin
  gerilimin ta kendisidir. Şimdilik o eğime dikkatle bak.</p>
</div>

<p>N sarımlı bir bobinde her sarım aynı akıyı görür; toplam etki
<strong>N·Φ</strong> olur. Buna <strong>akı halkalanması</strong> denir ve sonraki
konudaki formülde karşına çıkacak.</p>`,

/* ---------------------------------------------------------- Formüller */
formuller: {
  liste: [
    { fm: 'Φ = B·A·cosθ',      aciklama: 'Manyetik akı — yüzeyi delen çizgi miktarı' },
    { fm: 'Φ<sub>maks</sub> = B·A', aciklama: 'θ = 0° · alan yüzeye dik geçerken' },
    { fm: 'Φ = 0',             aciklama: 'θ = 90° · alan yüzeye teğetken' },
    { fm: '1 Wb = 1 T·m²',     aciklama: 'Weber ile tesla arasındaki bağ' },
    { fm: 'N·Φ',               aciklama: 'N sarımlı bobinde toplam akı halkalanması' }
  ],
  degiskenler: [
    { sembol: 'Φ', ad: 'Manyetik akı',   birim: 'Wb' },
    { sembol: 'B', ad: 'Manyetik alan',  birim: 'T' },
    { sembol: 'A', ad: 'Yüzey alanı',    birim: 'm²' },
    { sembol: 'θ', ad: 'Normal–alan açısı', birim: '°' },
    { sembol: 'N', ad: 'Sarım sayısı',   birim: 'tane' }
  ]
},

/* ------------------------------------------------------------ Türetim */
turetim: {
  yollar: [
    {
      ad: 'Neden cosθ?',
      adimlar: [
        { baslik: 'Dik durumdan başla',
          html: `<p>Alan yüzeye tam dik geçiyorsa bütün çizgiler yüzeyi deler:</p>
                 <div class="formul" style="max-width:200px"><div class="fm">Φ = B·A</div></div>` },

        { baslik: 'Yüzeyi eğ',
          html: `<p>Yüzeyi eğdiğinde, alan doğrultusundan bakınca yüzey
                 <strong>daha küçük görünür</strong>. Çizgilerin bir kısmı artık
                 kenardan kaçar.</p>` },

        { baslik: 'Görünen alanı hesapla',
          html: `<p>Alan doğrultusuna dik izdüşümü:</p>
                 <div class="formul" style="max-width:240px"><div class="fm">A<sub>etkin</sub> = A·cosθ</div></div>
                 <p>Bu, gölge uzunluğu hesabıyla aynı geometridir.</p>` },

        { baslik: 'Birleştir ve sına',
          html: `<div class="formul" style="max-width:260px;border-top-color:var(--accent)">
                   <div class="fm" style="color:var(--accent)">Φ = B·A·cosθ</div>
                 </div>
                 <p>θ = 0 ⟹ cos = 1 ⟹ Φ = BA ✓<br>
                 θ = 90° ⟹ cos = 0 ⟹ Φ = 0 ✓ (yüzey “kenarından” duruyor, hiç çizgi delmiyor)</p>` }
      ]
    },
    {
      ad: 'Dönen çerçevede akı',
      adimlar: [
        { baslik: 'Açıyı zamana bağla',
          html: `<p>Çerçeve ω açısal hızıyla dönüyorsa açı zamanla artar:</p>
                 <div class="formul" style="max-width:200px"><div class="fm">θ = ω·t</div></div>` },

        { baslik: 'Akıyı yaz',
          html: `<div class="formul" style="max-width:280px;border-top-color:var(--accent)">
                   <div class="fm" style="color:var(--accent)">Φ = B·A·cos(ω·t)</div>
                 </div>
                 <p>Akı artık zamanın <strong>kosinüs fonksiyonudur</strong>.</p>` },

        { baslik: 'Grafiği oku',
          html: `<p>Bir tam turda akı şu değerlerden geçer:</p>
                 <table class="degisken-tablo">
                   <thead><tr><th>θ</th><th>Φ</th></tr></thead>
                   <tbody>
                     <tr><td>0°</td><td class="sembol">+BA</td></tr>
                     <tr><td>90°</td><td class="sembol">0</td></tr>
                     <tr><td>180°</td><td class="sembol">−BA</td></tr>
                     <tr><td>270°</td><td class="sembol">0</td></tr>
                     <tr><td>360°</td><td class="sembol">+BA</td></tr>
                   </tbody>
                 </table>` },

        { baslik: 'Eğime dikkat et',
          html: `<p>Akı <strong>en hızlı</strong> nerede değişiyor? Grafiğin en dik olduğu
                 yerde: <strong>θ = 90° ve 270°</strong>. Tam da akının <em>sıfır</em>
                 olduğu noktalarda!</p>
                 <p>Akının <strong>en büyük</strong> olduğu yerlerde (0° ve 180°) ise eğim
                 <strong>sıfırdır</strong> — akı bir an için hiç değişmez.</p>
                 <p>Bu ters ilişki, sonraki konudaki jeneratörün neden akı sıfırken en çok
                 gerilim ürettiğini açıklayacak.</p>` }
      ]
    },
    {
      ad: 'Akıyı değiştirmenin üç yolu',
      adimlar: [
        { baslik: 'Alanı değiştir',
          html: `<p>Mıknatısı bobine yaklaştırıp uzaklaştırmak B&rsquo;yi değiştirir.
                 Elektromıknatısın akımını değiştirmek de aynı işi yapar — hareketli parça
                 bile gerekmez.</p>` },

        { baslik: 'Yüzeyi değiştir',
          html: `<p>Çerçeveyi alandan dışarı çekmek, ezmek ya da genişletmek A&rsquo;yı
                 değiştirir. Raylı tel düzeneğinde tel kayarken çevrelenen alan büyür
                 ya da küçülür.</p>` },

        { baslik: 'Açıyı değiştir',
          html: `<p>Çerçeveyi döndürmek θ&rsquo;yı değiştirir. <strong>Bütün elektrik
                 santralleri bu yolu kullanır</strong>: türbin bobini döndürür, akı değişir,
                 elektrik üretilir.</p>` },

        { baslik: 'Hangisi olursa olsun',
          html: `<p>Üçünden <strong>hangisi değişirse değişsin</strong> sonuç aynıdır:
                 akı değişir ve gerilim doğar. Sonraki konunun formülü bu üç yolu da tek
                 ifadede toplar:</p>
                 <div class="formul" style="max-width:240px;border-top-color:var(--accent)">
                   <div class="fm" style="color:var(--accent)">ε = −N · ΔΦ / Δt</div>
                 </div>` }
      ]
    }
  ]
},

/* -------------------------------------------------------- Simülasyon */
sim: F.simler['manyetik-aki'],

/* ------------------------------------------------------- Püf noktası */
puf: {
  html: `
    <p><strong>1 · θ, NORMAL ile alan arasındadır.</strong> Soru “çerçeve düzlemi alanla 30°
    açı yapıyor” diyorsa, normal ile alan arasındaki açı <strong>60°</strong>&rsquo;dir.
    Doğrudan 30° yazmak en sık yapılan hatadır:</p>
    <div class="formul" style="max-width:280px;margin:10px 0">
      <div class="fm">θ<sub>normal</sub> = 90° − (düzlem açısı)</div>
    </div>

    <p><strong>2 · Φ skalerdir.</strong> “Akı vektörünün yönü nedir?” diye soran şık
    yanlıştır. Akının yönü yoktur, <strong>işareti</strong> vardır.</p>

    <p><strong>3 · Sabit akı hiçbir şey üretmez.</strong> “Bobin güçlü bir alanın içinde
    duruyor, ne kadar akım üretir?” sorusunun cevabı <strong>sıfırdır</strong>.
    Değişim yoksa gerilim yoktur.</p>

    <p><strong>4 · Oranlar:</strong></p>
    <table class="degisken-tablo" style="margin-top:8px">
      <thead><tr><th>Değişiklik</th><th>Φ</th></tr></thead>
      <tbody>
        <tr><td>B → 2B</td><td class="sembol">2Φ</td></tr>
        <tr><td>A → 2A</td><td class="sembol">2Φ</td></tr>
        <tr><td>Yarıçap → 2r (dairesel)</td><td class="sembol">4Φ</td></tr>
        <tr><td>θ: 0° → 60°</td><td class="sembol">Φ/2</td></tr>
        <tr><td>θ: 0° → 90°</td><td class="sembol">0</td></tr>
      </tbody>
    </table>
    <p style="margin-top:8px">Üçüncü satıra dikkat: yarıçap iki katına çıkarsa
    <strong>alan dört katına</strong> çıkar (A = πr²), akı da dört katına.</p>

    <p style="margin-top:14px"><strong>5 · Birim çevrimi:</strong> 1 Wb = 1 T·m². Alan cm²
    verilmişse <code>10⁻⁴</code> ile çarpmayı unutma. 100 cm² = 0,01 m².</p>

    <p><strong>6 · Grafik okuma refleksi:</strong> Φ−t grafiğinde <strong>eğim</strong>
    sorulacak. En dik yerde gerilim en büyük, yatay yerde gerilim sıfır. Bu, bir sonraki
    konunun tamamıdır — şimdiden alışmaya başla.</p>

    <p><strong>7 · Kapalı yüzey için Φ = 0.</strong> Bir küreyi ya da kapalı bir kutuyu
    tamamen saran yüzeyden geçen net akı <strong>daima sıfırdır</strong>, çünkü manyetik
    çizgiler kapalıdır: giren her çizgi mutlaka çıkar. Elektrikte bu böyle değildi
    (orada içeride yük olabilirdi).</p>`
},

/* ----------------------------------------------------- Zorlayıcı sorular */
osym: [
  {
    baslik: 'Düzlem açısı mı, normal açısı mı?',
    kaynak: 'Bir numaralı tuzak',
    govde: `
      <p>Alanı <strong>200 cm²</strong> olan dikdörtgen bir çerçeve, <strong>0,4 T</strong>
      şiddetindeki düzgün bir manyetik alanın içine yerleştirilmiştir.</p>
      <p><strong>Çerçevenin düzlemi</strong>, manyetik alanla <strong>30°</strong>&rsquo;lik açı
      yapmaktadır.</p>
      <p>Çerçeveden geçen manyetik akı kaç Wb&rsquo;dir?</p>`,
    gorsel: `
      <svg viewBox="0 0 520 180" xmlns="http://www.w3.org/2000/svg" role="img"
           aria-label="Manyetik alanla otuz derece açı yapan çerçeve ve yüzey normali">
        <rect width="520" height="180" fill="#0E1726"/>
        <g stroke="#2F6FD0" stroke-width="1.6">
          <path d="M40 52 H480 M40 90 H480 M40 128 H480"/>
        </g>
        <g fill="#2F6FD0">
          <path d="M486 52 l-10 -5 l0 10 z"/><path d="M486 90 l-10 -5 l0 10 z"/>
          <path d="M486 128 l-10 -5 l0 10 z"/>
        </g>
        <path d="M180 132 L300 62" stroke="#B87333" stroke-width="7" stroke-linecap="round"/>
        <text x="200" y="158" fill="#EAF0FA" font-size="12" font-family="system-ui">çerçeve düzlemi</text>
        <path d="M240 97 L282 170" stroke="#35C08A" stroke-width="3"/>
        <path d="M285 176 L277 162 L291 160 Z" fill="#35C08A"/>
        <text x="300" y="150" fill="#35C08A" font-size="12" font-family="system-ui">normal (n)</text>
        <path d="M240 97 A 40 40 0 0 0 278 84" fill="none" stroke="#FFB020" stroke-width="2"/>
        <text x="296" y="98" fill="#FFB020" font-size="12" font-family="system-ui">30°</text>
        <text x="60" y="34" fill="#38D6E0" font-size="12" font-family="system-ui">B = 0,4 T</text>
      </svg>`,
    secenekler: [
      '0,004 Wb',
      '0,0069 Wb',
      '0,008 Wb',
      '0,4 Wb',
      '0,08 Wb'
    ],
    dogru: 0,
    cozum: `
      <p><strong>Tuzak burada:</strong> Soru <em>çerçeve düzlemi</em> ile alan arasındaki açıyı
      veriyor. Formüldeki θ ise <em>normal</em> ile alan arasındaki açıdır:</p>
      <div class="formul" style="max-width:300px;margin:10px 0">
        <div class="fm">θ = 90° − 30° = <strong>60°</strong></div>
      </div>
      <p><strong>Birim çevrimi:</strong> 200 cm² = 200 · 10⁻⁴ = <strong>0,02 m²</strong></p>
      <p><strong>Hesap:</strong></p>
      <div class="formul" style="max-width:340px;margin:10px 0;border-top-color:var(--accent)">
        <div class="fm" style="color:var(--accent)">Φ = 0,4 · 0,02 · cos60° = 0,4 · 0,02 · 0,5</div>
      </div>
      <p><strong>Φ = 0,004 Wb</strong></p>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>B şıkkı (0,0069)</strong> açıyı doğrudan 30° alanlar için:
        <code>0,4·0,02·cos30° = 0,4·0,02·0,866 = 0,0069</code>. En kalabalık yanlış budur.
        <br><strong>C şıkkı (0,008)</strong> açıyı tamamen unutup <code>B·A</code> yazanlar için.
        <br><strong>E şıkkı (0,08)</strong> cm² → m² çevrimini atlayanlar için.
        <br><strong>Kontrol alışkanlığı:</strong> Bulduğun akı, <code>B·A = 0,008</code>
        değerinden <em>küçük</em> olmalı (çünkü cosθ ≤ 1). 0,004 &lt; 0,008 ✓</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: A</strong></p>`
  },
  {
    baslik: 'Akı grafiğinin eğimi',
    kaynak: 'Sonraki konuya hazırlık',
    govde: `
      <p>Düzgün bir manyetik alanda sabit hızla dönen bir çerçevenin akı-zaman grafiği
      <strong>kosinüs eğrisi</strong> biçimindedir.</p>
      <p>Buna göre, akının <strong>en hızlı değiştiği</strong> anlar hangileridir?</p>`,
    gorsel: `
      <svg viewBox="0 0 520 190" xmlns="http://www.w3.org/2000/svg" role="img"
           aria-label="Dönen çerçevenin akı-zaman kosinüs grafiği ve eğimin en dik olduğu noktalar">
        <rect width="520" height="190" fill="#0E1726"/>
        <path d="M40 95 H490" stroke="#4A5F86" stroke-width="1.6"/>
        <path d="M50 20 V172" stroke="#4A5F86" stroke-width="1.6"/>
        <path d="M50 30 C 100 30, 120 160, 170 160 C 220 160, 240 30, 290 30 C 340 30, 360 160, 410 160 C 450 160, 465 60, 478 40"
              stroke="#38D6E0" stroke-width="2.8" fill="none"/>
        <circle cx="110" cy="95" r="6" fill="#FF6B6B"/>
        <circle cx="230" cy="95" r="6" fill="#FF6B6B"/>
        <circle cx="350" cy="95" r="6" fill="#FF6B6B"/>
        <circle cx="50" cy="30" r="6" fill="#35C08A"/>
        <circle cx="170" cy="160" r="6" fill="#35C08A"/>
        <circle cx="290" cy="30" r="6" fill="#35C08A"/>
        <text x="28" y="26" fill="#6F84A8" font-size="11" font-family="system-ui">Φ</text>
        <text x="492" y="112" fill="#6F84A8" font-size="11" font-family="system-ui">t</text>
        <text x="110" y="82" fill="#FF6B6B" font-size="11" font-family="system-ui" text-anchor="middle">?</text>
        <text x="330" y="182" fill="#35C08A" font-size="11" font-family="system-ui">yeşil: Φ en büyük/küçük</text>
        <text x="120" y="182" fill="#FF6B6B" font-size="11" font-family="system-ui">kırmızı: Φ = 0</text>
      </svg>`,
    secenekler: [
      'Akının sıfır olduğu anlar (kırmızı noktalar)',
      'Akının en büyük olduğu anlar (yeşil noktalar)',
      'Akı her an aynı hızla değişir',
      'Akının en küçük olduğu anlar',
      'Grafikten çıkarılamaz'
    ],
    dogru: 0,
    cozum: `
      <p>“En hızlı değişim” demek, grafiğin <strong>eğiminin en büyük olduğu</strong> yer
      demektir. Kosinüs eğrisine bak:</p>
      <table class="degisken-tablo">
        <thead><tr><th>Nokta</th><th>Φ</th><th>Eğim</th><th>Değişim hızı</th></tr></thead>
        <tbody>
          <tr><td>Tepe ve dip (yeşil)</td><td class="sembol">±Φ<sub>maks</sub></td><td>yatay</td><td><strong>SIFIR</strong></td></tr>
          <tr><td>Eksen kesişimi (kırmızı)</td><td class="sembol">0</td><td>en dik</td><td><strong>EN BÜYÜK</strong></td></tr>
        </tbody>
      </table>
      <p style="margin-top:10px">Sezgiye aykırı görünür ama doğrudur: akı <strong>sıfırken</strong>
      en hızlı değişiyor, akı <strong>en büyükken</strong> hiç değişmiyor.</p>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>Günlük benzetme:</strong> Salıncakta en yüksek noktadasın —
        hızın sıfır, bir an duruyorsun. En alçak noktada ise en hızlısın. Konum ile hız
        arasındaki ilişki, burada akı ile gerilim arasındaki ilişkinin aynısı.
        <br><strong>Neden önemli?</strong> Bir sonraki konuda göreceksin ki üretilen gerilim
        tam olarak bu eğime eşittir. Yani <strong>jeneratör, akının sıfır olduğu anda en çok
        gerilim üretir</strong>. Bu cümle şimdi tuhaf geliyorsa, grafiğe bir daha bak —
        aslında zaten kanıtladın.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: A</strong></p>`
  }
],

/* --------------------------------------------- Bağlam temelli sorular */
baglam: [
  {
    baslik: 'Güvenlik kapısı seni nasıl yakalıyor?',
    govde: `
      <p>Havaalanlarındaki ve alışveriş merkezlerindeki güvenlik kapılarından geçerken üzerinde
      metal varsa alarm çalar. Kapının içinde <strong>büyük bobinler</strong> vardır: bir
      tarafta alan üreten, diğer tarafta o alanı ölçen bobinler.</p>
      <p>Normalde ölçen bobinden geçen akı sabittir. Arasından <strong>metal bir cisim</strong>
      geçtiğinde bu akı <strong>bozulur</strong> ve sistem bunu algılar.</p>
      <p>Bir öğrenci soruyor: <em>“Alan sabit, bobin sabit. Ben yürüyünce akı neden
      değişiyor? Hem neden plastik bıçak alarm vermiyor da metal anahtar veriyor?”</em></p>
      <p><strong>Akının hangi değişkeni etkileniyor? Plastik ile metalin farkı ne?</strong></p>`,
    gorsel: `
      <svg viewBox="0 0 520 200" xmlns="http://www.w3.org/2000/svg" role="img"
           aria-label="Güvenlik kapısındaki bobinler ve aradan geçen metal cismin akıyı bozması">
        <rect width="520" height="200" fill="#17223A"/>
        <rect x="90" y="20" width="34" height="164" rx="5" fill="#2E3D57"/>
        <rect x="396" y="20" width="34" height="164" rx="5" fill="#2E3D57"/>
        <g stroke="#B87333" stroke-width="3">
          <path d="M96 48 H118 M96 72 H118 M96 96 H118 M96 120 H118 M96 144 H118"/>
          <path d="M402 48 H424 M402 72 H424 M402 96 H424 M402 120 H424 M402 144 H424"/>
        </g>
        <text x="107" y="196" fill="#8FB6EC" font-size="10" font-family="system-ui" text-anchor="middle">üretici</text>
        <text x="413" y="196" fill="#8FB6EC" font-size="10" font-family="system-ui" text-anchor="middle">algılayıcı</text>
        <g stroke="#38D6E0" stroke-width="1.8">
          <path d="M128 60 H392 M128 96 H392 M128 132 H392"/>
        </g>
        <g fill="#38D6E0">
          <path d="M392 60 l-10 -5 l0 10 z"/><path d="M392 96 l-10 -5 l0 10 z"/>
          <path d="M392 132 l-10 -5 l0 10 z"/>
        </g>
        <circle cx="250" cy="70" r="16" fill="#E8C9A8"/>
        <path d="M250 86 V132" stroke="#E8C9A8" stroke-width="12"/>
        <rect x="262" y="96" width="22" height="9" rx="2" fill="#9AA5B1"/>
        <text x="300" y="104" fill="#FFB020" font-size="11" font-family="system-ui">metal</text>
        <text x="250" y="176" fill="#EAF0FA" font-size="11" font-family="system-ui" text-anchor="middle">geçen kişi</text>
      </svg>`,
    adimlar: [
      { bas: 'Hangi değişken etkileniyor?',
        metin: 'Bobin de kapı da yerinde duruyor, yani <strong>A ve θ değişmiyor</strong>. Değişen tek şey <strong>B</strong> olabilir — ve gerçekten öyle oluyor.' },
      { bas: 'Metal alanı nasıl bozuyor?',
        metin: 'Değişen manyetik alan, iletken metalin içinde <strong>dolambaçlı akımlar</strong> (girdap akımları) oluşturur. Bu akımlar da kendi manyetik alanlarını üretir ve asıl alana <strong>eklenir</strong>. Algılayıcı bobinin gördüğü B değişir.' },
      { bas: 'Plastik neden vermiyor?',
        metin: 'Plastik <strong>yalıtkandır</strong>: içinde serbest yük yoktur, girdap akımı oluşamaz. Alanı hiç bozmaz, akı değişmez, alarm çalmaz.' },
      { bas: 'Akı formülüyle özetle',
        metin: 'Φ = B·A·cosθ ifadesinde A ve cosθ sabit; <strong>B değiştiği için Φ değişiyor</strong>. Sistem Φ’nin değişimini ölçüyor.' },
      { bas: 'Neden bazı metaller daha çok yakalanıyor?',
        metin: 'Girdap akımları <strong>iletkenlikle</strong> artar. Bakır ve alüminyum çok iyi yakalanır. Paslanmaz çelik daha az iletkendir, bazı modellerde daha zor algılanır.' },
      { bas: 'Sınırı söyle',
        metin: 'Bu yüzden seramik bıçak, karbon fiber ya da plastik parçalar bu kapılardan <strong>geçebilir</strong>. Havaalanlarında ayrıca X-ışını tarayıcı kullanılmasının sebeplerinden biri budur.' }
    ],
    secenekler: [
      'A ve θ sabit; metalde oluşan girdap akımları B’yi değiştirdiği için Φ değişir — plastikte serbest yük olmadığı için bu olmaz',
      'Kişi yürüdüğü için çerçeve alanı A değişir',
      'Metal mıknatıslandığı için θ değişir; plastik mıknatıslanmaz',
      'Alarmı bozan şey metalin ağırlığıdır',
      'Metal alanı tamamen keser, bu yüzden Φ sıfırlanır'
    ],
    dogru: 0,
    cozum: `
      <p>Kapıda <strong>A ve θ sabittir</strong>; değişen <strong>B</strong>&rsquo;dir.
      Metalde oluşan girdap akımları kendi alanlarını üretip toplam alanı bozar.</p>
      <div class="formul" style="max-width:320px;margin:10px 0;border-top-color:var(--accent)">
        <div class="fm" style="color:var(--accent)">A, θ sabit &nbsp;·&nbsp; B değişir ⟹ Φ değişir</div>
      </div>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>E şıkkı</strong> abartılı: metal alanı tamamen kesmez,
        yalnızca bozar. Zaten tamamen kesseydi sistem metalin <em>ne kadar</em> olduğunu
        ayırt edemezdi.
        <br><strong>Aynı olgunun başka kullanımları:</strong> indüksiyonlu ocaklar
        (tencerede girdap akımı ısı üretir), metal dedektörler, bozuk para ayırıcılar,
        hatta trenlerdeki girdap akımlı frenler.
        <br><strong>Not:</strong> Girdap akımlarının nasıl doğduğunu bir sonraki konuda
        (indüksiyon) tam olarak öğreneceksin. Şimdilik bilmen gereken: bunların kaynağı
        <em>akının değişmesidir</em>.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: A</strong></p>`
  },
  {
    baslik: 'Kredi kartının manyetik şeridi',
    govde: `
      <p>Eski kredi kartlarının arkasındaki <strong>siyah şerit</strong>, üzerine bilgi
      yazılmış çok sayıda minik mıknatıstan oluşur. Kartı POS cihazından
      <strong>kaydırdığında</strong> bilgi okunur.</p>
      <p>Okuma kafası, içinde küçük bir <strong>bobin</strong> bulunan basit bir düzenektir.
      Kart hareket ettikçe bobinden geçen manyetik akı değişir ve bobinde
      <strong>sinyal</strong> doğar.</p>
      <p>Bir öğrenci soruyor: <em>“Neden kartı yavaş çekince okumuyor da hızlı çekince
      okuyor? Hem kartı cihazın üstünde hareketsiz tutsam neden hiçbir şey olmuyor?”</em></p>
      <p><strong>Akı kavramıyla açıkla.</strong></p>`,
    gorsel: `
      <svg viewBox="0 0 520 190" xmlns="http://www.w3.org/2000/svg" role="img"
           aria-label="Manyetik şeritli kartın okuma kafasından geçerken akı değişimi oluşturması">
        <rect width="520" height="190" fill="#17223A"/>
        <rect x="60" y="50" width="300" height="60" rx="6" fill="#2F6FD0"/>
        <rect x="60" y="72" width="300" height="20" fill="#23272E"/>
        <g fill="#E2483F" font-size="12" font-family="system-ui">
          <text x="80" y="87">N</text><text x="120" y="87">S</text><text x="160" y="87">N</text>
          <text x="200" y="87">S</text><text x="240" y="87">S</text><text x="280" y="87">N</text>
          <text x="320" y="87">S</text>
        </g>
        <path d="M380 82 H430" stroke="#FFB020" stroke-width="3"/>
        <path d="M436 82 L424 76 L424 88 Z" fill="#FFB020"/>
        <text x="405" y="66" fill="#FFB020" font-size="11" font-family="system-ui" text-anchor="middle">kaydır</text>
        <rect x="200" y="122" width="54" height="40" rx="4" fill="#5F6B78"/>
        <g stroke="#B87333" stroke-width="3">
          <path d="M208 132 H246 M208 142 H246 M208 152 H246"/>
        </g>
        <text x="227" y="180" fill="#EAF0FA" font-size="11" font-family="system-ui" text-anchor="middle">okuma kafası</text>
        <path d="M227 122 V100" stroke="#38D6E0" stroke-width="2" stroke-dasharray="4 4"/>
      </svg>`,
    adimlar: [
      { bas: 'Hareketsizken ne oluyor?',
        metin: 'Kart duruyorsa şeritteki mıknatıslar da duruyor. Bobinden geçen akı <strong>sabit</strong>. Sabit akı <strong>hiçbir şey üretmez</strong> — bu yüzden hiç sinyal yok.' },
      { bas: 'Kaydırınca ne değişiyor?',
        metin: 'Kafanın önünden sırayla N, S, N, S kutupları geçer. Bobinin gördüğü <strong>B sürekli değişir</strong> ⟹ akı değişir ⟹ sinyal doğar.' },
      { bas: 'Hız neden önemli?',
        metin: 'Sinyalin büyüklüğü akının <strong>ne kadar hızlı</strong> değiştiğine bağlıdır. Yavaş çekersen aynı akı değişimi <strong>daha uzun sürede</strong> gerçekleşir; değişim hızı küçülür, sinyal zayıflar ve gürültünün altında kalır.' },
      { bas: 'Formülle söyle',
        metin: 'Üretilen sinyal ΔΦ/Δt ile orantılıdır. ΔΦ aynı kalsa bile Δt büyürse <strong>oran küçülür</strong>.' },
      { bas: 'Çok hızlı olursa?',
        metin: 'Aşırı hızda da sorun çıkar: elektronik devrenin örnekleme hızı yetişemez ve bitler karışır. Bu yüzden POS cihazları <strong>belirli bir hız aralığında</strong> güvenilir okur — çok yavaş da çok hızlı da olmaz.' },
      { bas: 'Neden çipe geçildi?',
        metin: 'Manyetik şerit kopyalanması kolay ve yıpranmaya açıktır (mıknatısa yaklaştırmak bilgiyi siler). Çipli kartlar bu iki sorunu da çözdüğü için manyetik şerit büyük ölçüde terk edildi.' }
    ],
    secenekler: [
      'Sabit akı sinyal üretmez; sinyal ΔΦ/Δt ile orantılı olduğu için yavaş kaydırmada oran küçülür ve sinyal zayıflar',
      'Yavaş kaydırınca mıknatıslar yeterince ısınmaz',
      'Kartın hızı sürtünmeyi artırdığı için sinyal güçlenir',
      'Hareketsizken de sinyal vardır ama cihaz onu yok sayar',
      'Sinyalin büyüklüğü yalnızca mıknatısların gücüne bağlıdır, hız önemsizdir'
    ],
    dogru: 0,
    cozum: `
      <p><strong>Akının kendisi değil, değişim hızı</strong> sinyal üretir:</p>
      <div class="formul" style="max-width:280px;margin:10px 0;border-top-color:var(--accent)">
        <div class="fm" style="color:var(--accent)">sinyal ∝ ΔΦ / Δt</div>
      </div>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>D ve E şıkları</strong> aynı temel yanılgıyı paylaşıyor:
        akının <em>büyüklüğünün</em> yeterli olduğunu sanmak. Bu konunun en önemli cümlesi
        tam da bunun tersidir.
        <br><strong>Kendin dene:</strong> Simülasyonda dönme hızını (ω) değiştir ve Φ−t
        grafiğine bak. Akının <em>tepe değeri değişmiyor</em>, yalnızca eğri
        <strong>sıklaşıyor</strong> — yani eğim dikleşiyor. Üretilen gerilimi belirleyen şey
        işte o eğimdir.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: A</strong></p>`
  }
]

});
})();
