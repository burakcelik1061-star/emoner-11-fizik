(function () {
"use strict";
const F = window.F11;

/* ==========================================================================
   topics/u3-aydinlanma.js
   Konu 3.1 · Işık şiddeti, ışık akısı ve aydınlanma  (MEB 11, s.302-314)
   ========================================================================== */

F.konuKaydet('u3-aydinlanma', {

ozet: `Optiğin ilk konusu üç kavramı birbirinden ayırmakla başlar:
<strong>ışık şiddeti</strong> kaynağın gücü, <strong>ışık akısı</strong> yaydığı toplam ışık,
<strong>aydınlanma</strong> ise bir yüzeye düşen miktardır. Ampul alırken baktığın “lümen”
değeri, bu üçlünün ortasındakidir.`,

/* ------------------------------------------------------------- Kavram */
kavram: `
<p>Işık kaynağından çıkan ışık, her yöne <strong>doğrusal</strong> olarak yayılır. Bu yayılmayı
çizerken <strong>ışın modeli</strong> kullanılır: ışığın izlediği yolu gösteren oklu doğrular.</p>

<h3 style="margin-top:22px">Üç kavram, üç birim</h3>
<table class="degisken-tablo">
  <thead><tr><th>Kavram</th><th>Sembol</th><th>Birim</th><th>Neyi ölçer?</th></tr></thead>
  <tbody>
    <tr><td>Işık şiddeti</td><td class="sembol">I</td><td class="sembol">kandela (cd)</td><td>kaynağın bir yöndeki gücü</td></tr>
    <tr><td>Işık akısı</td><td class="sembol">Φ</td><td class="sembol">lümen (lm)</td><td>yayılan toplam ışık</td></tr>
    <tr><td>Aydınlanma</td><td class="sembol">E</td><td class="sembol">lüks (lx)</td><td>yüzeye düşen ışık yoğunluğu</td></tr>
  </tbody>
</table>

<p style="margin-top:14px">Işık şiddeti SI&rsquo;da <strong>temel bir büyüklüktür</strong> —
metre, kilogram, saniye gibi. Diğer ikisi ondan türetilir.</p>

<div class="kutu puf" style="margin:16px 0">
  <div class="kutu-bas"><span class="ikon">💡</span><span>Lümen nasıl tanımlandı?</span></div>
  <p style="margin:0">Yarıçapı <strong>1 m</strong> olan içi boş bir kürenin merkezine,
  ışık şiddeti <strong>1 cd</strong> olan bir kaynak konur. Küre yüzeyindeki
  <strong>1 m²</strong>&rsquo;lik alana düşen ışık akısı <strong>1 lümendir</strong>.</p>
  <p style="margin:8px 0 0">Kürenin toplam yüzeyi <code>4πr² = 4π m²</code> olduğuna göre,
  1 cd&rsquo;lik kaynağın <strong>toplam</strong> akısı:</p>
  <div class="formul" style="max-width:280px;margin:10px 0">
    <div class="fm">Φ = 4π·I ≈ 12,6 lm</div>
  </div>
</div>

<h3 style="margin-top:22px">Aydınlanma</h3>
<p>Bir yüzeye düşen ışık akısının, yüzey alanına bölümüdür:</p>
<div class="formul" style="max-width:260px;margin:14px 0">
  <div class="fm">E = Φ / A</div>
</div>

<p>Noktasal bir kaynaktan <strong>d</strong> uzaklıktaki ve ışınlara <strong>dik</strong>
duran bir yüzey için:</p>
<div class="formul" style="max-width:260px;margin:14px 0;border-top-color:var(--accent)">
  <div class="fm" style="color:var(--accent)">E = I / d²</div>
</div>

<div class="kutu dikkat" style="margin:16px 0">
  <div class="kutu-bas"><span class="ikon">↺</span><span>Ters kare — üçüncü kez</span></div>
  <p style="margin:0">Bu formülü daha önce iki kez gördün: <strong>Coulomb kuvveti</strong>
  ve <strong>elektriksel alan</strong>. Sebep her üçünde de aynıdır: noktadan her yöne
  yayılan bir etki, d uzaklıkta <code>4πd²</code> alanlı bir küreye dağılır.
  Alan d² ile büyüdüğü için birim alana düşen pay <code>1/d²</code> ile azalır.</p>
  <p style="margin:8px 0 0">Aynı geometri, üç farklı fizik konusu. Formülü ezberlemene
  gerek yok — <strong>küre yüzeyini hatırla, yeter</strong>.</p>
</div>

<h3 style="margin-top:22px">Yüzey eğikse: kosinüs</h3>
<p>Yüzey ışınlara dik değilse, üzerine düşen ışık daha geniş bir alana yayılır ve
aydınlanma azalır:</p>
<div class="formul" style="max-width:300px;margin:14px 0">
  <div class="fm">E = I · cosα / d²</div>
  <div class="fm-ad">α: yüzey normali ile ışınlar arasındaki açı</div>
</div>
<p>α = 90° olursa (ışınlar yüzeye teğet) <strong>E = 0</strong> olur.</p>

<div class="kutu nott" style="margin:16px 0">
  <div class="kutu-bas"><span class="ikon">🌍</span><span>Mevsimler bu formülle açıklanır</span></div>
  <p style="margin:0">Kışın güneş ışınları yere <strong>eğik</strong> gelir (α büyük),
  yazın daha <strong>dik</strong> gelir (α küçük). Aynı ışık, kışın daha geniş bir alana
  yayıldığı için birim alana düşen enerji azalır. Mevsimlerin sebebi Dünya&rsquo;nın
  Güneş&rsquo;e uzaklığı değil, <strong>bu açıdır</strong>.</p>
</div>

<h3 style="margin-top:22px">Ampul seçerken neye bakmalı?</h3>
<p>Ampul kutusunda iki sayı vardır ve <strong>ikisi farklı şeyi ölçer</strong>:</p>
<table class="degisken-tablo">
  <thead><tr><th></th><th>Ne demek?</th></tr></thead>
  <tbody>
    <tr><td><strong>Watt (W)</strong></td><td>elektrik <em>tüketimi</em> — faturaya yansır</td></tr>
    <tr><td><strong>Lümen (lm)</strong></td><td>üretilen <em>ışık</em> — aydınlığı belirler</td></tr>
  </tbody>
</table>
<p style="margin-top:10px">Akkor ampullerde bu ikisi orantılıydı, bu yüzden eskiden
“100 W ampul” denirdi. LED&rsquo;lerde bağ koptu:</p>
<table class="degisken-tablo">
  <thead><tr><th>Tür</th><th>Güç</th><th>Işık akısı</th></tr></thead>
  <tbody>
    <tr><td>Akkor</td><td class="sembol">100 W</td><td class="sembol">≈ 1400 lm</td></tr>
    <tr><td>Floresan</td><td class="sembol">25 W</td><td class="sembol">≈ 1500 lm</td></tr>
    <tr><td>LED</td><td class="sembol">15 W</td><td class="sembol">≈ 1600 lm</td></tr>
  </tbody>
</table>
<p style="margin-top:10px;color:var(--text-2)">Aynı ışığı üretmek için LED, akkorun
<strong>yedide biri</strong> kadar elektrik harcar. Ampul alırken bakılacak sayı
<strong>lümendir</strong>.</p>`,

/* ---------------------------------------------------------- Formüller */
formuller: {
  liste: [
    { fm: 'E = Φ / A',        aciklama: 'Aydınlanma — yüzeye düşen akı yoğunluğu' },
    { fm: 'E = I / d²',       aciklama: 'Nokta kaynak, yüzey ışınlara dik' },
    { fm: 'E = I·cosα / d²',  aciklama: 'Yüzey eğikse — kosinüs yasası' },
    { fm: 'Φ = 4π·I',         aciklama: 'Nokta kaynağın toplam akısı' },
    { fm: '1 lx = 1 lm/m²',   aciklama: 'Lüks ile lümen arasındaki bağ' }
  ],
  degiskenler: [
    { sembol: 'I', ad: 'Işık şiddeti',  birim: 'cd' },
    { sembol: 'Φ', ad: 'Işık akısı',    birim: 'lm' },
    { sembol: 'E', ad: 'Aydınlanma',    birim: 'lx' },
    { sembol: 'A', ad: 'Yüzey alanı',   birim: 'm²' },
    { sembol: 'd', ad: 'Kaynağa uzaklık', birim: 'm' },
    { sembol: 'α', ad: 'Normal–ışın açısı', birim: '°' }
  ]
},

/* ------------------------------------------------------------ Türetim */
turetim: {
  yollar: [
    {
      ad: 'E = I/d² nereden geliyor?',
      adimlar: [
        { baslik: 'Kaynağın toplam akısını yaz',
          html: `<p>Nokta kaynak her yöne eşit yayar. Toplam akısı:</p>
                 <div class="formul" style="max-width:200px"><div class="fm">Φ = 4π·I</div></div>` },

        { baslik: 'Bu akı hangi yüzeye dağılıyor?',
          html: `<p>d uzaklıkta, kaynağı saran hayalî bir küre düşün. Bütün akı bu kürenin
                 yüzeyinden geçer:</p>
                 <div class="formul" style="max-width:200px"><div class="fm">A = 4π·d²</div></div>` },

        { baslik: 'Aydınlanma tanımını uygula',
          html: `<div class="formul" style="max-width:280px">
                   <div class="fm">E = Φ/A = 4π·I / (4π·d²)</div>
                 </div>` },

        { baslik: '4π sadeleşir',
          html: `<div class="formul" style="max-width:220px;border-top-color:var(--accent)">
                   <div class="fm" style="color:var(--accent)">E = I / d²</div>
                 </div>
                 <p>Formül bu kadar sade çünkü <strong>4π hem payda hem paydada</strong> var.
                 Kandela biriminin böyle tanımlanmış olmasının sebebi de budur.</p>` }
      ]
    },
    {
      ad: 'Kosinüs neden giriyor?',
      adimlar: [
        { baslik: 'Dik durumdan başla',
          html: `<p>Yüzey ışınlara dikse, A alanına düşen akının tamamı işe yarar:</p>
                 <div class="formul" style="max-width:180px"><div class="fm">E = Φ/A</div></div>` },

        { baslik: 'Yüzeyi eğ',
          html: `<p>Yüzeyi α kadar eğdiğinde, ışınların “gördüğü” alan
                 <strong>küçülür</strong> ama akı aynı kalır. Işınlar
                 <strong>daha geniş bir yüzeye</strong> yayılmış olur.</p>` },

        { baslik: 'Etkin alanı hesapla',
          html: `<p>Işın doğrultusuna dik izdüşüm:</p>
                 <div class="formul" style="max-width:240px"><div class="fm">A<sub>etkin</sub> = A·cosα</div></div>
                 <p>Bu, 2. ünitedeki manyetik akı türetimiyle <strong>birebir aynı
                 geometridir</strong> (orada da Φ = B·A·cosθ idi).</p>` },

        { baslik: 'Birleştir',
          html: `<div class="formul" style="max-width:280px;border-top-color:var(--accent)">
                   <div class="fm" style="color:var(--accent)">E = I·cosα / d²</div>
                 </div>
                 <p>α = 0 ⟹ cos = 1 ⟹ en büyük aydınlanma.<br>
                 α = 90° ⟹ cos = 0 ⟹ hiç aydınlanma yok.</p>` }
      ]
    },
    {
      ad: 'Bir odaya kaç ampul gerekir?',
      adimlar: [
        { baslik: 'Hedefi belirle',
          html: `<p>Ortamlara göre önerilen aydınlanma değerleri vardır:</p>
                 <table class="degisken-tablo">
                   <thead><tr><th>Ortam</th><th>E</th></tr></thead>
                   <tbody>
                     <tr><td>Koridor</td><td class="sembol">100 lx</td></tr>
                     <tr><td>Oturma odası</td><td class="sembol">150-200 lx</td></tr>
                     <tr><td>Sınıf / çalışma masası</td><td class="sembol">300-500 lx</td></tr>
                     <tr><td>Ameliyathane</td><td class="sembol">10 000 lx üstü</td></tr>
                   </tbody>
                 </table>` },

        { baslik: 'Gereken akıyı bul',
          html: `<p><code>E = Φ/A</code> ifadesinden Φ&rsquo;yi çekelim:</p>
                 <div class="formul" style="max-width:200px"><div class="fm">Φ = E · A</div></div>
                 <p>25 m²&rsquo;lik bir sınıf için 300 lx istiyorsak:</p>
                 <p>Φ = 300 · 25 = <strong>7500 lm</strong></p>` },

        { baslik: 'Ampule böl',
          html: `<p>Her LED ampul 1600 lm veriyorsa:</p>
                 <div class="formul" style="max-width:260px"><div class="fm">7500 / 1600 = 4,7</div></div>` },

        { baslik: 'YUKARI yuvarla',
          html: `<div class="formul" style="max-width:240px;border-top-color:var(--accent)">
                   <div class="fm" style="color:var(--accent)">5 ampul</div>
                 </div>
                 <p>4 ampul yetmez (6400 lm &lt; 7500). Aydınlatma hesaplarında sonuç
                 <strong>daima yukarı yuvarlanır</strong> — eksik ışık kabul edilmez.</p>
                 <p style="color:var(--text-2)">Gerçek projelerde ayrıca duvar yansımaları,
                 armatür verimi ve zamanla kirlenme için pay bırakılır.</p>` }
      ]
    }
  ]
},

/* -------------------------------------------------------- Simülasyon */
sim: F.simler['aydinlanma'],

/* ------------------------------------------------------- Püf noktası */
puf: {
  html: `
    <p><strong>1 · Ters kare oranları — üçüncü kez aynı tablo:</strong></p>
    <table class="degisken-tablo" style="margin-top:8px">
      <thead><tr><th>Değişiklik</th><th>E</th></tr></thead>
      <tbody>
        <tr><td>d → 2d</td><td class="sembol">E/4</td></tr>
        <tr><td>d → 3d</td><td class="sembol">E/9</td></tr>
        <tr><td>d → d/2</td><td class="sembol">4E</td></tr>
        <tr><td>I → 2I</td><td class="sembol">2E</td></tr>
        <tr><td>I → 2I ve d → 2d</td><td class="sembol">E/2</td></tr>
      </tbody>
    </table>

    <p style="margin-top:14px"><strong>2 · Birim çevrimini en başta yap.</strong> d santimetre
    verilmişse metreye çevir. <code>d = 50 cm = 0,5 m ⟹ d² = 0,25</code>. Çevirmezsen
    sonuç <strong>10 000 kat</strong> yanlış çıkar.</p>

    <p><strong>3 · Watt ile lümeni karıştırma.</strong> “Hangi ampul daha aydınlık?”
    sorusunun cevabı <strong>lümeni büyük olandır</strong>, watt&rsquo;ı büyük olan değil.
    Watt yalnızca tüketimi söyler.</p>

    <p><strong>4 · α hangi açı?</strong> Normal ile ışın arasındaki açıdır. Soru
    “ışınlar yüzeyle 30° açı yapıyor” diyorsa <strong>α = 60°</strong>&rsquo;dir. Manyetik
    akıdaki aynı tuzak.</p>

    <p><strong>5 · İki kaynak varsa aydınlanmalar TOPLANIR.</strong> Aydınlanma skalerdir;
    vektörel toplama yok, doğrudan cebirsel toplama:</p>
    <div class="formul" style="max-width:280px;margin:10px 0">
      <div class="fm">E<sub>top</sub> = I₁/d₁² + I₂/d₂²</div>
    </div>

    <p><strong>6 · Ampul sayısı daima yukarı yuvarlanır.</strong> 4,7 çıkarsa cevap
    <strong>5</strong>&rsquo;tir.</p>

    <p><strong>7 · Kaynak noktasal mı?</strong> Formüller <em>noktasal</em> kaynak içindir.
    Uzun bir floresan tüp ya da geniş bir pencere için ters kare tam geçerli değildir —
    ama sınav soruları hep noktasal kabul eder.</p>

    <div class="kutu puf" style="margin-top:14px">
      <div class="kutu-bas"><span class="ikon">🔗</span><span>Üç ünitede aynı geometri</span></div>
      <p style="margin:0">Coulomb (2.1.1), elektriksel alan (2.1.2) ve şimdi aydınlanma —
      üçü de <code>1/d²</code>. Sebep fizik değil <strong>geometridir</strong>: noktadan
      yayılan her şey küre yüzeyine dağılır. Bunu bir kez anlarsan üç konuda da formül
      ezberlemene gerek kalmaz.</p>
    </div>`
},

/* ----------------------------------------------------- Zorlayıcı sorular */
osym: [
  {
    baslik: 'İki kaynak arasındaki nokta',
    kaynak: 'Süperpozisyon',
    govde: `
      <p>Aralarındaki uzaklık <strong>3 m</strong> olan iki noktasal ışık kaynağı vardır:</p>
      <ul>
        <li>K₁: <strong>I₁ = 400 cd</strong></li>
        <li>K₂: <strong>I₂ = 100 cd</strong></li>
      </ul>
      <p>Aralarındaki doğru üzerinde, her iki kaynağın da ışınlarına <strong>dik</strong>
      duran küçük bir yüzey, <strong>K₁&rsquo;den 2 m</strong> uzaklığa konuluyor.</p>
      <p>Bu yüzeydeki toplam aydınlanma kaç lx&rsquo;tir?</p>`,
    gorsel: `
      <svg viewBox="0 0 520 170" xmlns="http://www.w3.org/2000/svg" role="img"
           aria-label="Üç metre aralıklı iki ışık kaynağı ve aralarındaki yüzey">
        <rect width="520" height="170" fill="#0E1726"/>
        <circle cx="80" cy="80" r="16" fill="#FFD24A"/>
        <text x="80" y="124" fill="#EAF0FA" font-size="12" font-family="system-ui" text-anchor="middle">K₁ = 400 cd</text>
        <circle cx="440" cy="80" r="12" fill="#FFD24A"/>
        <text x="440" y="124" fill="#EAF0FA" font-size="12" font-family="system-ui" text-anchor="middle">K₂ = 100 cd</text>
        <rect x="316" y="54" width="8" height="52" fill="#C9A06A"/>
        <text x="320" y="44" fill="#35C08A" font-size="12" font-family="system-ui" text-anchor="middle">yüzey</text>
        <path d="M80 148 H320" stroke="#6F84A8" stroke-width="1" stroke-dasharray="4 5"/>
        <text x="200" y="164" fill="#6F84A8" font-size="11" font-family="system-ui" text-anchor="middle">2 m</text>
        <path d="M320 148 H440" stroke="#6F84A8" stroke-width="1" stroke-dasharray="4 5"/>
        <text x="380" y="164" fill="#6F84A8" font-size="11" font-family="system-ui" text-anchor="middle">1 m</text>
        <g stroke="#FFC43C" stroke-width="1.4">
          <path d="M96 72 H310 M96 80 H310 M96 88 H310"/>
          <path d="M428 72 H330 M428 80 H330 M428 88 H330"/>
        </g>
      </svg>`,
    secenekler: [
      '200 lx',
      '125 lx',
      '500 lx',
      '100 lx',
      '300 lx'
    ],
    dogru: 0,
    cozum: `
      <p><strong>Adım 1 — Uzaklıklar.</strong> Yüzey K₁&rsquo;den 2 m uzakta, toplam aralık
      3 m ⟹ K₂&rsquo;den <strong>1 m</strong> uzakta.</p>
      <p><strong>Adım 2 — Her kaynağın katkısı.</strong></p>
      <p>E₁ = I₁/d₁² = 400 / 2² = 400/4 = <strong>100 lx</strong></p>
      <p>E₂ = I₂/d₂² = 100 / 1² = <strong>100 lx</strong></p>
      <p><strong>Adım 3 — Topla.</strong> Aydınlanma <strong>skalerdir</strong>, doğrudan
      toplanır:</p>
      <div class="formul" style="max-width:280px;margin:10px 0;border-top-color:var(--accent)">
        <div class="fm" style="color:var(--accent)">E = 100 + 100 = 200 lx</div>
      </div>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>İlginç sonuç:</strong> K₁ dört kat güçlü ama iki kat uzak.
        Ters kare yüzünden <code>4/2² = 1</code> — iki kaynağın katkısı <strong>tam
        eşit</strong> çıktı. Bu nokta aynı zamanda “eşit aydınlatma noktasıdır”.
        <br><strong>B şıkkı</strong> yalnızca uzaklıkların karesini alıp şiddeti unutanlar için.
        <br><strong>D şıkkı</strong> yalnız bir kaynağı hesaba katanlar için.
        <br><strong>Vektör tuzağı yok:</strong> Coulomb&rsquo;da alanları <em>vektörel</em>
        toplamak gerekiyordu. Burada aydınlanma skaler olduğu için yön diye bir dert yok —
        bu iki konunun en önemli farkı.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: A</strong></p>`
  },
  {
    baslik: 'Masa lambasını yaklaştırmak',
    kaynak: 'Oran ve açı birlikte',
    govde: `
      <p>Bir masa lambası, defterin üzerinde <strong>60 cm</strong> yükseklikte ve ışınlar
      deftere <strong>dik</strong> gelecek şekilde duruyor. Defterdeki aydınlanma
      <strong>E</strong>&rsquo;dir.</p>
      <p>Öğrenci lambayı <strong>30 cm</strong>&rsquo;ye indiriyor, ama aynı zamanda lamba
      kafası kayıyor ve ışınlar defter normaliyle <strong>60°</strong> açı yapıyor.</p>
      <p>Yeni aydınlanma, eskisinin kaç katıdır?</p>`,
    secenekler: [
      '2E',
      '4E',
      '8E',
      'E/2',
      'E'
    ],
    dogru: 0,
    cozum: `
      <p>İki etkiyi <strong>ayrı ayrı</strong> hesapla, sonra çarp.</p>
      <p><strong>Uzaklık etkisi:</strong> d yarıya indi ⟹ ters kare ⟹</p>
      <div class="formul" style="max-width:220px;margin:8px 0">
        <div class="fm">×4</div>
      </div>
      <p><strong>Açı etkisi:</strong> cos0° = 1 idi, cos60° = 0,5 oldu ⟹</p>
      <div class="formul" style="max-width:220px;margin:8px 0">
        <div class="fm">×0,5</div>
      </div>
      <p><strong>Birleştir:</strong></p>
      <div class="formul" style="max-width:280px;margin:10px 0;border-top-color:var(--accent)">
        <div class="fm" style="color:var(--accent)">4 × 0,5 = 2 ⟹ E′ = 2E</div>
      </div>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>B şıkkı</strong> açıyı unutanlar için — yalnızca uzaklığı
        hesaba katarsan 4E bulursun.
        <br><strong>Pratik ders:</strong> Lambayı yaklaştırmak çok işe yarar (kare ile),
        ama eğik tutmak kazancın <em>yarısını geri alır</em>. Çalışma masasında lambayı
        hem yakın hem de <strong>dik</strong> tutmak gerekir.
        <br><strong>Simülasyonda dene:</strong> d&rsquo;yi 100&rsquo;den 50 cm&rsquo;ye indir,
        E dört katına çıkıyor. Sonra α&rsquo;yı 60° yap, yarıya iniyor. Net kazanç iki kat.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: A</strong></p>`
  }
],

/* --------------------------------------------- Bağlam temelli sorular */
baglam: [
  {
    baslik: 'Market rafında ampul seçmek',
    govde: `
      <p>Markette ampul rafındasın. Kutuların üzerinde şu bilgiler var:</p>
      <table class="degisken-tablo">
        <thead><tr><th>Ampul</th><th>Güç</th><th>Işık akısı</th><th>Ömür</th><th>Fiyat</th></tr></thead>
        <tbody>
          <tr><td>A · Akkor</td><td>100 W</td><td>1400 lm</td><td>1 yıl</td><td>15 TL</td></tr>
          <tr><td>B · Tasarruflu</td><td>25 W</td><td>1500 lm</td><td>6 yıl</td><td>60 TL</td></tr>
          <tr><td>C · LED</td><td>15 W</td><td>1600 lm</td><td>20 yıl</td><td>90 TL</td></tr>
        </tbody>
      </table>
      <p>Bir arkadaşın diyor ki: <em>“100 W&rsquo;lık en güçlüsü, en aydınlık odur.
      Üstelik en ucuzu. Onu alalım.”</em></p>
      <p><strong>Arkadaşının iki hatasını bul. Günde 5 saat kullanımda, 1 yılda hangisi
      daha az elektrik harcar?</strong> (1 kWh = 3 TL varsayalım)</p>`,
    gorsel: `
      <svg viewBox="0 0 520 190" xmlns="http://www.w3.org/2000/svg" role="img"
           aria-label="Akkor, tasarruflu ve LED ampullerin güç ve ışık akısı karşılaştırması">
        <rect width="520" height="190" fill="#17223A"/>
        <g>
          <circle cx="110" cy="66" r="26" fill="#FFD24A"/>
          <rect x="99" y="92" width="22" height="16" fill="#9AA5B1"/>
          <text x="110" y="132" fill="#EAF0FA" font-size="12" font-family="system-ui" text-anchor="middle">Akkor</text>
          <text x="110" y="150" fill="#FF6B6B" font-size="12" font-family="system-ui" text-anchor="middle">100 W</text>
          <text x="110" y="168" fill="#35C08A" font-size="12" font-family="system-ui" text-anchor="middle">1400 lm</text>
        </g>
        <g>
          <circle cx="260" cy="66" r="26" fill="#FFE08A"/>
          <rect x="249" y="92" width="22" height="16" fill="#9AA5B1"/>
          <text x="260" y="132" fill="#EAF0FA" font-size="12" font-family="system-ui" text-anchor="middle">Tasarruflu</text>
          <text x="260" y="150" fill="#FFB020" font-size="12" font-family="system-ui" text-anchor="middle">25 W</text>
          <text x="260" y="168" fill="#35C08A" font-size="12" font-family="system-ui" text-anchor="middle">1500 lm</text>
        </g>
        <g>
          <circle cx="410" cy="66" r="26" fill="#FFF0B8"/>
          <rect x="399" y="92" width="22" height="16" fill="#9AA5B1"/>
          <text x="410" y="132" fill="#EAF0FA" font-size="12" font-family="system-ui" text-anchor="middle">LED</text>
          <text x="410" y="150" fill="#35C08A" font-size="12" font-family="system-ui" text-anchor="middle">15 W</text>
          <text x="410" y="168" fill="#35C08A" font-size="12" font-family="system-ui" text-anchor="middle">1600 lm</text>
        </g>
        <text x="26" y="40" fill="#6F84A8" font-size="11" font-family="system-ui">aynı ışık,</text>
        <text x="26" y="56" fill="#6F84A8" font-size="11" font-family="system-ui">farklı tüketim</text>
      </svg>`,
    adimlar: [
      { bas: 'Birinci hata: “en güçlü = en aydınlık”',
        metin: 'Aydınlığı belirleyen <strong>lümendir</strong>, watt değil. Tabloya bak: en çok ışığı <strong>LED (1600 lm)</strong> veriyor, üstelik en az güçle. Watt yalnızca <em>tüketimi</em> gösterir.' },
      { bas: 'İkinci hata: “en ucuz”',
        metin: 'Etiket fiyatı tek maliyet değil. <strong>Elektrik faturası</strong> ve <strong>ömür</strong> de maliyettir. Akkor 1 yılda değişecek, LED 20 yıl dayanacak.' },
      { bas: 'Yıllık tüketimi hesapla',
        metin: 'Günde 5 saat, yılda 1825 saat.<br>Akkor: 0,1 kW · 1825 = <strong>182,5 kWh</strong><br>Tasarruflu: 0,025 · 1825 = <strong>45,6 kWh</strong><br>LED: 0,015 · 1825 = <strong>27,4 kWh</strong>' },
      { bas: 'Yıllık elektrik maliyeti',
        metin: 'Akkor: 182,5 · 3 = <strong>548 TL</strong><br>Tasarruflu: 45,6 · 3 = <strong>137 TL</strong><br>LED: 27,4 · 3 = <strong>82 TL</strong>' },
      { bas: 'Toplam birinci yıl maliyeti',
        metin: 'Akkor: 15 + 548 = <strong>563 TL</strong><br>LED: 90 + 82 = <strong>172 TL</strong><br>LED, ilk yılda bile <strong>üç kattan fazla</strong> ucuz. Üstelik 20 yıl dayanıyor.' },
      { bas: 'Sonucu söyle',
        metin: 'Pahalı görünen LED, hem <strong>en aydınlık</strong> hem <strong>en ucuz</strong>. Ampulün fiyatı, toplam maliyetin küçük bir parçası — asıl para elektrikte gidiyor.' }
    ],
    secenekler: [
      'Aydınlığı watt değil lümen belirler ve LED hem en çok ışık verir hem yılda yalnızca 27,4 kWh harcar — toplamda en ucuzdur',
      'Arkadaşı haklı; 100 W en aydınlık ve en ucuz seçenektir',
      'Akkor ampul daha aydınlıktır ama LED daha uzun ömürlüdür',
      'Üçü de aynı ışığı verir, fark yalnızca ömürdedir',
      'Lümen değeri güçle doğru orantılıdır, bu yüzden 100 W en yüksek lümene sahiptir'
    ],
    dogru: 0,
    cozum: `
      <table class="degisken-tablo">
        <thead><tr><th></th><th>Işık</th><th>Yıllık kWh</th><th>1. yıl toplam</th></tr></thead>
        <tbody>
          <tr><td>Akkor</td><td class="sembol">1400 lm</td><td class="sembol">182,5</td><td class="sembol" style="color:var(--red)">563 TL</td></tr>
          <tr><td>Tasarruflu</td><td class="sembol">1500 lm</td><td class="sembol">45,6</td><td class="sembol">197 TL</td></tr>
          <tr><td>LED</td><td class="sembol">1600 lm</td><td class="sembol">27,4</td><td class="sembol" style="color:var(--green)">172 TL</td></tr>
        </tbody>
      </table>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>E şıkkı</strong> eski alışkanlığı yansıtıyor: akkor
        ampullerde lümen gerçekten watt ile orantılıydı, bu yüzden nesillerce “100 W ampul”
        denildi. LED&rsquo;de bu bağ <strong>koptu</strong>.
        <br><strong>Neden akkor bu kadar verimsiz?</strong> Enerjisinin yaklaşık
        <strong>%95&rsquo;ini ısıya</strong> çevirir, yalnızca %5&rsquo;i ışık olur.
        Yani akkor ampul aslında <em>zayıf ışık veren bir ısıtıcıdır</em>.
        <br><strong>Bu yüzden</strong> Türkiye dâhil birçok ülkede yüksek güçlü akkor
        ampullerin satışı kademeli olarak kaldırıldı.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: A</strong></p>`
  },
  {
    baslik: 'Sınıfın aydınlatması yeterli mi?',
    govde: `
      <p>Bir sınıfın boyutları <strong>8 m × 6 m</strong>&rsquo;dir. Tavanda
      <strong>6 adet</strong> floresan armatür vardır ve her biri <strong>2400 lm</strong>
      ışık akısı verir.</p>
      <p>Yönetmeliklere göre derslik aydınlanması en az <strong>300 lüks</strong> olmalıdır.</p>
      <p>Ayrıca bilinmesi gereken bir gerçek var: armatürlerden çıkan ışığın tamamı
      sıralara ulaşmaz. Duvar ve tavan yansımaları, armatür verimi ve zamanla kirlenme
      nedeniyle pratikte yaklaşık <strong>%60</strong>&rsquo;ı işe yarar.</p>
      <p><strong>İdeal ve gerçekçi hesabı ayrı ayrı yap. Sınıf yeterli mi? Değilse kaç
      armatür daha gerekir?</strong></p>`,
    gorsel: `
      <svg viewBox="0 0 520 200" xmlns="http://www.w3.org/2000/svg" role="img"
           aria-label="Sınıf tavanındaki altı armatür ve sıralara düşen aydınlanma">
        <rect width="520" height="200" fill="#17223A"/>
        <rect x="50" y="30" width="420" height="140" fill="#E8DCC8"/>
        <rect x="50" y="30" width="420" height="16" fill="#C9BCA2"/>
        <g fill="#FFE9A8">
          <rect x="86" y="46" width="52" height="8" rx="3"/>
          <rect x="178" y="46" width="52" height="8" rx="3"/>
          <rect x="270" y="46" width="52" height="8" rx="3"/>
          <rect x="362" y="46" width="52" height="8" rx="3"/>
          <rect x="132" y="70" width="52" height="8" rx="3"/>
          <rect x="316" y="70" width="52" height="8" rx="3"/>
        </g>
        <g fill="#8A7B62">
          <rect x="90" y="120" width="60" height="10"/><rect x="190" y="120" width="60" height="10"/>
          <rect x="290" y="120" width="60" height="10"/><rect x="390" y="120" width="60" height="10"/>
          <rect x="140" y="146" width="60" height="10"/><rect x="240" y="146" width="60" height="10"/>
          <rect x="340" y="146" width="60" height="10"/>
        </g>
        <text x="260" y="190" fill="#EAF0FA" font-size="12" font-family="system-ui" text-anchor="middle">8 m × 6 m · 6 armatür × 2400 lm</text>
        <text x="470" y="60" fill="#FFB020" font-size="11" font-family="system-ui" text-anchor="end">hedef 300 lx</text>
      </svg>`,
    adimlar: [
      { bas: 'Alanı bul',
        metin: 'A = 8 · 6 = <strong>48 m²</strong>' },
      { bas: 'Gereken akıyı hesapla',
        metin: 'Φ_gerekli = E · A = 300 · 48 = <strong>14 400 lm</strong>' },
      { bas: 'Mevcut akıyı hesapla',
        metin: 'Φ_mevcut = 6 · 2400 = <strong>14 400 lm</strong><br>İdeal hesapta <strong>tam sınırda</strong> — teorik olarak yeterli görünüyor.' },
      { bas: 'Gerçekçi hesaba geç',
        metin: 'Işığın yalnızca %60’ı sıralara ulaşıyor:<br>Φ_etkin = 14 400 · 0,60 = <strong>8640 lm</strong><br>E_gerçek = 8640 / 48 = <strong>180 lx</strong>' },
      { bas: 'Karşılaştır',
        metin: '180 lx &lt; 300 lx ⟹ sınıf <strong>YETERSİZ</strong>. Üstelik ideal hesap “tam yeterli” diyordu — aradaki fark tamamen verim kaybından.' },
      { bas: 'Kaç armatür gerekir?',
        metin: 'Gereken toplam akı: 14 400 / 0,60 = <strong>24 000 lm</strong><br>Armatür sayısı: 24 000 / 2400 = <strong>10 adet</strong><br>Yani <strong>4 armatür daha</strong> eklenmeli.' }
    ],
    secenekler: [
      'İdealde tam sınırda ama gerçekte 180 lx; yetersiz, 4 armatür daha gerekir (toplam 10)',
      'İdealde de gerçekte de 300 lx; sınıf yeterlidir',
      'Gerçekte 480 lx; fazlasıyla yeterlidir',
      'Yetersizdir ama 1 armatür eklemek yeterli olur',
      'Armatür sayısı değil, armatürlerin yeri önemlidir'
    ],
    dogru: 0,
    cozum: `
      <table class="degisken-tablo">
        <thead><tr><th>Hesap</th><th>Akı</th><th>E</th><th>Sonuç</th></tr></thead>
        <tbody>
          <tr><td>İdeal</td><td class="sembol">14 400 lm</td><td class="sembol">300 lx</td><td>tam sınırda</td></tr>
          <tr><td>Gerçekçi (%60)</td><td class="sembol">8 640 lm</td><td class="sembol">180 lx</td><td style="color:var(--red)"><strong>yetersiz</strong></td></tr>
          <tr><td>Gerekli</td><td class="sembol">24 000 lm</td><td class="sembol">300 lx</td><td>10 armatür</td></tr>
        </tbody>
      </table>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>Bu sorunun asıl öğrettiği:</strong> İdeal formül doğru
        cevabı verir ama <em>gerçek cevabı</em> vermez. Mühendislikte her hesaba bir
        <strong>verim katsayısı</strong> girer — tıpkı 2. ünitede elektromıknatısın temas
        verimi ve transformatörün kayıpları gibi.
        <br><strong>E şıkkı</strong> önemli bir doğruya işaret ediyor ama sorunun cevabı
        değil: armatürlerin yeri gerçekten önemlidir (köşelerde aydınlanma düşer), ancak
        toplam akı yetersizken yerleşimi değiştirmek sorunu çözmez.
        <br><strong>Kendi sınıfını ölç:</strong> Telefonundaki ışık ölçer uygulamalarıyla
        sıranın üzerindeki aydınlanmayı ölçüp 300 lx ile karşılaştırabilirsin.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: A</strong></p>`
  }
]

});
})();
