(function () {
"use strict";
const F = window.F11;

/* ==========================================================================
   topics/u2-duz-tel-manyetik.js
   Konu 2.2.2 · Üzerinden akım geçen düz telin manyetik alanı
                                                    (MEB 11, s.198-206)
   ========================================================================== */

F.konuKaydet('u2-duz-tel-manyetik', {

ozet: `1820&rsquo;de Oersted, akım geçen bir telin yanındaki pusula iğnesinin saptığını
gördü. Bu kaza eseri gözlem fiziği ikiye böldü: <strong>elektrik ve manyetizma ayrı iki
konu değil, aynı olayın iki yüzüdür.</strong> Mıknatısı olmadan da manyetik alan
üretebilirsin — tek gereken <strong>hareket eden yük</strong>, yani akımdır.`,

/* ------------------------------------------------------------- Kavram */
kavram: `
<p>Hans Christian Oersted, dersinde bir pilin devresini kapatıp açarken masadaki pusula
iğnesinin kıpırdadığını fark etti. O güne kadar elektrik ve manyetizma birbirinden bağımsız
sanılıyordu. Oersted&rsquo;in gözlemi tek bir şey söylüyordu:</p>

<div class="formul" style="max-width:380px;margin:14px 0;border-top-color:var(--accent)">
  <div class="fm" style="color:var(--accent)">Akım, çevresinde manyetik alan üretir</div>
  <div class="fm-ad">Manyetizmanın kaynağı hareketli yüklerdir</div>
</div>

<h3 style="margin-top:22px">Alanın büyüklüğü</h3>
<div class="formul" style="max-width:320px;margin:14px 0">
  <div class="fm">B = μ₀ · i / (2π · d)</div>
  <div class="fm-ad">μ₀ = 4π · 10⁻⁷ T·m/A (boşluğun manyetik geçirgenliği)</div>
</div>

<p>μ₀&rsquo;daki 4π ile paydadaki 2π sadeleşince işlem çok kısalır. Sınavda kullanacağın hâli:</p>
<div class="formul" style="max-width:300px;margin:14px 0;border-top-color:var(--b5)">
  <div class="fm" style="color:var(--b5)">B = 2 · 10⁻⁷ · i / d</div>
  <div class="fm-ad">i amper, d metre, B tesla</div>
</div>

<div class="kutu dikkat" style="margin:16px 0">
  <div class="kutu-bas"><span class="ikon">⚠</span><span>Ters orantı — ters KARE değil</span></div>
  <p style="margin:0">Coulomb ve elektriksel alan <code>1/d²</code> ile azalıyordu. Düz telin
  alanı <strong><code>1/d</code></strong> ile azalır. Uzaklık iki katına çıkarsa alan
  <strong>dörtte bire değil, yarıya</strong> iner. Sebebi geometridir: nokta yükün etkisi
  küreye yayılırken, sonsuz uzun telin etkisi <strong>silindire</strong> yayılır.</p>
</div>

<h3 style="margin-top:22px">Alanın yönü: sağ el kuralı</h3>
<p>Sağ elinin <strong>başparmağı akım yönünü</strong> gösterecek şekilde teli kavra.
Diğer dört parmağının sarılma yönü, <strong>alan çizgilerinin yönüdür</strong>.</p>

<p>Bu, alan çizgilerinin şekli hakkında da bilgi verir: çizgiler teli
<strong>çevreleyen iç içe çemberlerdir</strong>.</p>
<ul>
  <li>Mıknatısta çizgiler N&rsquo;den çıkıp S&rsquo;ye giriyordu</li>
  <li>Telde ise çizgilerin <strong>çıktığı ya da girdiği bir uç yoktur</strong> — sadece dönerler</li>
  <li>Yine de kural bozulmaz: çizgiler <strong>kapalıdır</strong> ve <strong>kesişmezler</strong></li>
</ul>

<div class="kutu puf" style="margin:16px 0">
  <div class="kutu-bas"><span class="ikon">⊙⊗</span><span>Sayfa düzlemine dik yönler</span></div>
  <p style="margin:0">Üç boyutlu bir olayı kâğıda çizmek için iki simge kullanılır:</p>
  <ul style="margin:8px 0 0">
    <li><strong>⊙</strong> — okun <em>ucu</em>: sayfadan <strong>dışarı</strong>, sana doğru</li>
    <li><strong>⊗</strong> — okun <em>tüyü</em>: sayfanın <strong>içine</strong>, senden uzağa</li>
  </ul>
  <p style="margin:8px 0 0">Bu iki simge ünitenin sonuna kadar her şekilde karşına çıkacak.</p>
</div>

<h3 style="margin-top:22px">İki paralel tel birbirine ne yapar?</h3>
<p>Her tel kendi alanını üretir ve <strong>diğerinin alanı içinde kaldığı için</strong>
kuvvet görür. Sonuç şaşırtıcıdır:</p>

<table class="degisken-tablo">
  <thead><tr><th>Durum</th><th>Teller</th></tr></thead>
  <tbody>
    <tr><td>Akımlar <strong>aynı</strong> yönlü</td><td class="sembol" style="color:var(--b1)">ÇEKER</td></tr>
    <tr><td>Akımlar <strong>zıt</strong> yönlü</td><td class="sembol" style="color:var(--red)">İTER</td></tr>
  </tbody>
</table>

<div class="kutu dikkat" style="margin:16px 0">
  <div class="kutu-bas"><span class="ikon">⚠</span><span>Yüklerin TAM TERSİ</span></div>
  <p style="margin:0">Yüklerde <em>aynı</em> işaret iterdi. Akımlarda <em>aynı</em> yön
  <strong>çeker</strong>. Bu ikisi sürekli karıştırılır. Aklında kalması için:
  <strong>“aynı yöne akan iki ırmak birbirine yaklaşır.”</strong></p>
</div>

<p>Birim uzunluk başına kuvvet:</p>
<div class="formul" style="max-width:340px;margin:14px 0">
  <div class="fm">F / L = μ₀ · i₁ · i₂ / (2π · d) = 2·10⁻⁷ · i₁·i₂ / d</div>
</div>
<p style="color:var(--text-2)">Bu ifade o kadar temeldir ki <strong>amperin tanımı</strong>
uzun süre bunun üzerinden yapılmıştır: boşlukta 1 m aralıklı iki sonsuz telden geçen ve
metre başına 2·10⁻⁷ N kuvvet oluşturan akım, 1 amperdir.</p>`,

/* ---------------------------------------------------------- Formüller */
formuller: {
  liste: [
    { fm: 'B = μ₀·i / (2π·d)',        aciklama: 'Düz telin manyetik alanı' },
    { fm: 'B = 2·10⁻⁷ · i / d',       aciklama: 'Sadeleşmiş hâli — sınavda bunu kullan' },
    { fm: 'μ₀ = 4π·10⁻⁷ T·m/A',       aciklama: 'Boşluğun manyetik geçirgenliği' },
    { fm: 'F/L = 2·10⁻⁷ · i₁·i₂ / d', aciklama: 'İki paralel tel arasındaki kuvvet' },
    { fm: 'B ∝ i  ·  B ∝ 1/d',        aciklama: 'Akımla doğru, uzaklıkla TERS orantı' }
  ],
  degiskenler: [
    { sembol: 'B',  ad: 'Manyetik alan',   birim: 'T' },
    { sembol: 'i',  ad: 'Akım şiddeti',    birim: 'A' },
    { sembol: 'd',  ad: 'Telden uzaklık',  birim: 'm' },
    { sembol: 'μ₀', ad: 'Manyetik geçirgenlik', birim: 'T·m/A' },
    { sembol: 'L',  ad: 'Tel uzunluğu',    birim: 'm' }
  ]
},

/* ------------------------------------------------------------ Türetim */
turetim: {
  yollar: [
    {
      ad: 'Neden 1/d, 1/d² değil?',
      adimlar: [
        { baslik: 'Nokta yükü hatırla',
          html: `<p>Nokta yükün etkisi her yöne yayılır ve d uzaklıkta bir
                 <strong>küre</strong> yüzeyine dağılır:</p>
                 <div class="formul" style="max-width:200px"><div class="fm">A = 4π·d²</div></div>
                 <p>Alan d² ile büyüdüğü için etki <code>1/d²</code> ile azalır.</p>` },

        { baslik: 'Şimdi teli düşün',
          html: `<p>Sonsuz uzun bir telin etkisi her yöne değil, telin
                 <strong>çevresine</strong> yayılır. d uzaklıktaki yüzey bir küre değil,
                 <strong>silindirdir</strong>:</p>
                 <div class="formul" style="max-width:220px"><div class="fm">A = 2π·d·L</div></div>` },

        { baslik: 'Üsse bak',
          html: `<p>Silindirin yan yüzeyi d ile <strong>birinci dereceden</strong> büyür,
                 d² ile değil. Dolayısıyla:</p>
                 <div class="formul" style="max-width:220px;border-top-color:var(--accent)">
                   <div class="fm" style="color:var(--accent)">B ∝ 1/d</div>
                 </div>` },

        { baslik: 'Kuralı genelle',
          html: `<p>Kaynağın <strong>şekli</strong> üssü belirler:</p>
                 <ul>
                   <li>Nokta kaynak → küre → <code>1/d²</code></li>
                   <li>Çizgi kaynak → silindir → <code>1/d</code></li>
                   <li>Düzlem kaynak (paralel levha) → yayılma yok → <strong>sabit</strong></li>
                 </ul>
                 <p>Üçünü de bu ünitede gördün.</p>` }
      ]
    },
    {
      ad: 'Sağ el kuralı nasıl uygulanır?',
      adimlar: [
        { baslik: 'Eli doğru tut',
          html: `<p><strong>Sağ</strong> elini kullan (sol el başka bir kural içindir).
                 Başparmağını <strong>akımın aktığı yöne</strong> çevir.</p>` },

        { baslik: 'Teli kavra',
          html: `<p>Dört parmağını telin etrafına sar. Parmakların sarılma yönü
                 <strong>alan çizgilerinin dönme yönüdür</strong>.</p>` },

        { baslik: 'Kesit görünümüne çevir',
          html: `<p>Akım sayfadan <strong>dışarı</strong> (⊙) ise çizgiler
                 <strong>saat yönünün tersine</strong> döner.<br>
                 Akım sayfanın <strong>içine</strong> (⊗) ise çizgiler
                 <strong>saat yönünde</strong> döner.</p>
                 <p>Bu iki cümleyi ezberlersen kesit soruları saniyeler sürer.</p>` },

        { baslik: 'Bir noktadaki yönü oku',
          html: `<p>Alan vektörü, o noktadan geçen çembere <strong>teğettir</strong> —
                 asla telin üzerine doğru ya da telden dışa doğru değildir.
                 Pusula iğnesi de bu teğet doğrultuya yerleşir.</p>` }
      ]
    },
    {
      ad: 'İki tel birbirini neden çeker?',
      adimlar: [
        { baslik: 'Birinci telin alanını bul',
          html: `<p>1. tel, 2. telin bulunduğu yerde bir <strong>B₁</strong> alanı üretir.
                 Sağ el kuralıyla yönünü belirle.</p>` },

        { baslik: 'İkinci teli o alanın içinde düşün',
          html: `<p>2. tel artık <strong>manyetik alan içinde akım taşıyan bir teldir</strong>.
                 Böyle bir tele kuvvet etki eder — ayrıntısını 2.2.5&rsquo;te göreceğiz,
                 burada sonucu kullanıyoruz.</p>` },

        { baslik: 'Yönü çıkar',
          html: `<p>Akımlar <strong>aynı</strong> yönlüyse, ortaya çıkan kuvvet her iki teli de
                 <strong>içeri</strong>, birbirine doğru iter ⟹ <strong>çekme</strong>.
                 Zıt yönlüyse tersi olur ⟹ <strong>itme</strong>.</p>` },

        { baslik: 'Büyüklüğü yaz',
          html: `<p>B₁ = 2·10⁻⁷·i₁/d ifadesini kuvvet bağıntısında kullanınca:</p>
                 <div class="formul" style="max-width:280px;border-top-color:var(--accent)">
                   <div class="fm" style="color:var(--accent)">F/L = 2·10⁻⁷ · i₁·i₂ / d</div>
                 </div>
                 <p>İfade <strong>simetriktir</strong>: i₁ ile i₂ yer değiştirse sonuç aynıdır.
                 Yani iki tele etkiyen kuvvetler eşit büyüklüktedir — Newton III yine geçerli.</p>` }
      ]
    }
  ]
},

/* -------------------------------------------------------- Simülasyon */
sim: F.simler['duz-tel-manyetik'],

/* ------------------------------------------------------- Püf noktası */
puf: {
  html: `
    <p><strong>1 · <code>2·10⁻⁷</code> katsayısını ezberle.</strong> μ₀/2π işlemiyle
    uğraşma; <code>B = 2·10⁻⁷·i/d</code> doğrudan sonucu verir. Örnek: 10 A, 20 cm →
    <code>2·10⁻⁷·10/0,2 = 10⁻⁵ T = 10 μT</code>.</p>

    <p><strong>2 · Oran sorularında üs 1&rsquo;dir.</strong></p>
    <table class="degisken-tablo" style="margin-top:8px">
      <thead><tr><th>Değişiklik</th><th>B</th></tr></thead>
      <tbody>
        <tr><td>i → 2i</td><td class="sembol">2B</td></tr>
        <tr><td>d → 2d</td><td class="sembol">B/2</td></tr>
        <tr><td>d → d/2</td><td class="sembol">2B</td></tr>
        <tr><td>i → 2i ve d → 2d</td><td class="sembol">B (değişmez)</td></tr>
      </tbody>
    </table>
    <p style="margin-top:8px">Son satır çok sorulur: ikisi de iki katına çıkarsa alan
    <strong>aynı kalır</strong>. Ters karede olsaydı yarıya inerdi.</p>

    <p style="margin-top:14px"><strong>3 · Aynı yön ÇEKER.</strong> Yüklerdeki kuralın tersi.
    Şıklarda “aynı yönlü akımlar iter” görürsen ele.</p>

    <p><strong>4 · Kesit kuralı iki cümle:</strong>
    <br>⊙ (dışarı) ⟹ çizgiler <strong>saat yönünün tersine</strong>
    <br>⊗ (içeri) ⟹ çizgiler <strong>saat yönünde</strong></p>

    <p><strong>5 · İki telin ortasındaki alan.</strong> Alanların
    <strong>yönlerini önce çiz</strong>, sonra topla:</p>
    <ul>
      <li><strong>Aynı yönlü</strong> akımlarda ortadaki alanlar <strong>zıt</strong> ⟹ çıkarılır</li>
      <li><strong>Zıt yönlü</strong> akımlarda ortadaki alanlar <strong>aynı</strong> ⟹ toplanır</li>
    </ul>
    <p>Bu, kuvvet kuralının tam tersi gibi görünür ama çelişki yoktur: biri
    <em>tellere etkiyen kuvvet</em>, diğeri <em>aradaki alan</em>dır.</p>

    <p><strong>6 · B = 0 noktası: karekök YOK.</strong> Coulomb&rsquo;da
    <code>√q₁/x = √q₂/(d−x)</code> yazıyorduk. Burada üs 1 olduğu için doğrudan:</p>
    <div class="formul" style="max-width:260px;margin:10px 0">
      <div class="fm">i₁ / x = i₂ / (d − x)</div>
    </div>
    <p>Karekök almaya kalkma — bu, iki konuyu karıştıranların düştüğü tuzaktır.</p>

    <p><strong>7 · Alan vektörü teğettir.</strong> Şekilli sorularda B&rsquo;yi telden dışa
    doğru (ışınsal) çizen şık daima yanlıştır.</p>`
},

/* ----------------------------------------------------- Zorlayıcı sorular */
osym: [
  {
    baslik: 'İki telin ortasındaki alan',
    kaynak: 'Süperpozisyon',
    govde: `
      <p>Birbirine paralel iki uzun tel, aralarındaki uzaklık <strong>20 cm</strong> olacak
      şekilde duruyor. Her iki telden de akım <strong>sayfa düzleminden dışarı (⊙)</strong>
      doğru geçiyor:</p>
      <ul>
        <li>i₁ = <strong>6 A</strong></li>
        <li>i₂ = <strong>8 A</strong></li>
      </ul>
      <p>Tellerin tam <strong>ortasındaki</strong> noktada bileşke manyetik alanın büyüklüğü
      kaç μT&rsquo;dır?</p>`,
    gorsel: `
      <svg viewBox="0 0 520 190" xmlns="http://www.w3.org/2000/svg" role="img"
           aria-label="Aynı yönde akım taşıyan iki paralel telin ortasındaki bileşke manyetik alan">
        <rect width="520" height="190" fill="#0E1726"/>
        <circle cx="130" cy="95" r="15" fill="none" stroke="#FFB020" stroke-width="2"/>
        <circle cx="130" cy="95" r="4" fill="#FFB020"/>
        <circle cx="390" cy="95" r="15" fill="none" stroke="#FFB020" stroke-width="2"/>
        <circle cx="390" cy="95" r="4" fill="#FFB020"/>
        <text x="130" y="140" fill="#EAF0FA" font-size="12" font-family="system-ui" text-anchor="middle">i₁ = 6 A ⊙</text>
        <text x="390" y="140" fill="#EAF0FA" font-size="12" font-family="system-ui" text-anchor="middle">i₂ = 8 A ⊙</text>
        <circle cx="260" cy="95" r="5" fill="#35C08A"/>
        <text x="260" y="70" fill="#35C08A" font-size="12" font-family="system-ui" text-anchor="middle">orta nokta</text>
        <path d="M260 95 L260 52" stroke="#38D6E0" stroke-width="2.4"/>
        <path d="M260 48 L255 58 L265 58 Z" fill="#38D6E0"/>
        <text x="286" y="56" fill="#38D6E0" font-size="11" font-family="system-ui">B₁</text>
        <path d="M244 95 L244 130" stroke="#4DA3FF" stroke-width="2.4"/>
        <path d="M244 134 L239 124 L249 124 Z" fill="#4DA3FF"/>
        <text x="214" y="128" fill="#4DA3FF" font-size="11" font-family="system-ui">B₂</text>
        <path d="M130 165 H390" stroke="#6F84A8" stroke-width="1" stroke-dasharray="4 5"/>
        <text x="260" y="182" fill="#6F84A8" font-size="11" font-family="system-ui" text-anchor="middle">20 cm</text>
      </svg>`,
    secenekler: [
      '4 μT',
      '28 μT',
      '14 μT',
      '2 μT',
      '0'
    ],
    dogru: 0,
    cozum: `
      <p><strong>Adım 1 — Uzaklıklar.</strong> Orta nokta her iki telden de
      <strong>10 cm = 0,1 m</strong> uzaklıktadır.</p>
      <p><strong>Adım 2 — Büyüklükler.</strong></p>
      <p>B₁ = 2·10⁻⁷ · 6 / 0,1 = 1,2·10⁻⁵ T = <strong>12 μT</strong></p>
      <p>B₂ = 2·10⁻⁷ · 8 / 0,1 = 1,6·10⁻⁵ T = <strong>16 μT</strong></p>
      <p><strong>Adım 3 — Yönler (asıl iş burada).</strong> İkisi de ⊙ olduğu için, sağ el
      kuralıyla her ikisinin çizgileri de <strong>saat yönünün tersine</strong> döner.
      Orta noktada:</p>
      <ul>
        <li>Soldaki telin alanı <strong>yukarı</strong></li>
        <li>Sağdaki telin alanı <strong>aşağı</strong></li>
      </ul>
      <p>Yani <strong>zıt yönlüler</strong> — çıkarılır:</p>
      <div class="formul" style="max-width:280px;margin:10px 0;border-top-color:var(--accent)">
        <div class="fm" style="color:var(--accent)">B = 16 − 12 = 4 μT</div>
      </div>
      <p>Yönü, büyük olanın yönündedir: <strong>aşağı</strong>.</p>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>B şıkkı (28 μT)</strong> yönlere bakmadan toplayanlar için —
        en sık yapılan hata budur.
        <br><strong>E şıkkı (0)</strong> “aynı yönlü akımlar ortada alanı götürür” diye
        ezberleyenler için. Bu ancak akımlar <em>eşit</em> olsaydı doğru olurdu.
        <br><strong>Uyarı:</strong> Akımlar aynı yönlü olduğu için teller birbirini
        <em>çeker</em>, ama aradaki <em>alanlar</em> zıt yönlüdür. Bu ikisini karıştırma.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: A</strong></p>`
  },
  {
    baslik: 'Alanın sıfırlandığı nokta',
    kaynak: 'Coulomb ile karşılaştırma',
    govde: `
      <p>Aralarındaki uzaklık <strong>30 cm</strong> olan iki uzun paralel telden
      <strong>aynı yönde</strong> akım geçiyor:</p>
      <ul>
        <li>i₁ = <strong>2 A</strong></li>
        <li>i₂ = <strong>8 A</strong></li>
      </ul>
      <p>Teller arasındaki hangi noktada bileşke manyetik alan <strong>sıfırdır</strong>?</p>`,
    secenekler: [
      'i₁’den 6 cm uzakta',
      'i₁’den 10 cm uzakta',
      'i₁’den 15 cm uzakta',
      'i₂’den 6 cm uzakta',
      'Teller arasında böyle bir nokta yoktur'
    ],
    dogru: 0,
    cozum: `
      <p>Akımlar aynı yönlü olduğu için aradaki alanlar <strong>zıt yönlüdür</strong> —
      demek ki arada bir sıfır noktası vardır. Nokta i₁&rsquo;den x uzaklıkta olsun:</p>
      <div class="formul" style="max-width:300px;margin:10px 0">
        <div class="fm">2·10⁻⁷ · 2 / x = 2·10⁻⁷ · 8 / (30 − x)</div>
      </div>
      <p>Katsayılar sadeleşir:</p>
      <div class="formul" style="max-width:240px;margin:10px 0">
        <div class="fm">2 / x = 8 / (30 − x)</div>
      </div>
      <p><code>2(30 − x) = 8x ⟹ 60 = 10x ⟹ <strong>x = 6 cm</strong></code></p>
      <p><strong>Kontrol:</strong> 2/6 = 0,333 &nbsp;ve&nbsp; 8/24 = 0,333 ✓</p>
      <div class="kutu dikkat" style="margin-top:12px">
        <div class="kutu-bas"><span class="ikon">⚠</span><span>Coulomb’la karıştırma</span></div>
        <p style="margin:0">Elektrikte denge noktası için <strong>karekök</strong> alıyorduk
        (<code>√q₁/x = √q₂/(d−x)</code>), çünkü orada üs <strong>2</strong>&rsquo;ydi.
        Burada üs <strong>1</strong> olduğu için karekök <strong>yoktur</strong>.
        Karekök alsaydın <code>√2/x = √8/(30−x)</code> çıkar ve x ≈ 10 cm bulurdun —
        <strong>B şıkkı</strong> tam olarak bu hatayı yapanlar için konmuştur.</p>
      </div>
      <p style="margin-top:10px"><strong>Sağlama:</strong> Nokta, <em>küçük akıma</em> yakın
      çıktı (6 cm &lt; 24 cm). Bu her zaman böyledir.</p>
      <p style="margin-bottom:0"><strong>Cevap: A</strong></p>`
  }
],

/* --------------------------------------------- Bağlam temelli sorular */
baglam: [
  {
    baslik: 'Oersted’in dersinde olan kaza',
    govde: `
      <p>Nisan 1820&rsquo;de Kopenhag Üniversitesi&rsquo;nde Hans Christian Oersted, öğrencilerine
      elektrik akımını gösteriyordu. Masasında, başka bir deney için bırakılmış bir
      <strong>pusula</strong> duruyordu.</p>
      <p>Oersted devreyi kapattığında pusula iğnesi <strong>saptı</strong>. Devreyi açtığında
      iğne eski yerine döndü. O güne kadar elektrik ve manyetizma birbirinden tamamen
      bağımsız iki konu sayılıyordu.</p>
      <p>Oersted ayrıca şunu da gözledi: pusulayı telin <strong>üstüne</strong> koyduğunda iğne
      bir yöne, <strong>altına</strong> koyduğunda <strong>ters</strong> yöne sapıyordu.</p>
      <p><strong>Bu iki gözlem birlikte ne söylüyor? Alan çizgileri neden başka türlü
      olamaz?</strong></p>`,
    gorsel: `
      <svg viewBox="0 0 520 210" xmlns="http://www.w3.org/2000/svg" role="img"
           aria-label="Akım taşıyan telin üstündeki ve altındaki pusula iğnelerinin ters yönlerde sapması">
        <rect width="520" height="210" fill="#17223A"/>
        <rect x="40" y="100" width="440" height="7" fill="#B87333"/>
        <path d="M300 104 L340 104" stroke="#FFB020" stroke-width="3"/>
        <path d="M346 104 L334 98 L334 110 Z" fill="#FFB020"/>
        <text x="360" y="96" fill="#FFB020" font-size="12" font-family="system-ui">akım i</text>
        <circle cx="180" cy="58" r="24" fill="#FFF" stroke="#7D8A99" stroke-width="2"/>
        <path d="M180 58 L204 58" stroke="#E2483F" stroke-width="5"/>
        <path d="M180 58 L156 58" stroke="#2F6FD0" stroke-width="5"/>
        <text x="180" y="26" fill="#EAF0FA" font-size="11" font-family="system-ui" text-anchor="middle">telin ÜSTÜNDE</text>
        <circle cx="180" cy="150" r="24" fill="#FFF" stroke="#7D8A99" stroke-width="2"/>
        <path d="M180 150 L156 150" stroke="#E2483F" stroke-width="5"/>
        <path d="M180 150 L204 150" stroke="#2F6FD0" stroke-width="5"/>
        <text x="180" y="192" fill="#EAF0FA" font-size="11" font-family="system-ui" text-anchor="middle">telin ALTINDA</text>
        <g stroke="#38D6E0" stroke-width="1.4" fill="none">
          <ellipse cx="180" cy="103" rx="46" ry="46"/>
          <ellipse cx="180" cy="103" rx="70" ry="70"/>
        </g>
      </svg>`,
    adimlar: [
      { bas: 'Birinci gözlemi oku',
        metin: 'Pusula sapıyorsa orada <strong>manyetik alan vardır</strong>. Ortada mıknatıs olmadığına göre alanı üreten şey <strong>akımdır</strong>.' },
      { bas: 'İkinci gözlem kritik',
        metin: 'Üstte ve altta sapmaların <strong>ters</strong> olması, alanın telin iki yanında <strong>zıt yönlü</strong> olduğunu söyler.' },
      { bas: 'Hangi şekil buna uyar?',
        metin: 'Alan telden dışa doğru ışınsal olsaydı üstte yukarı, altta aşağı olurdu — <em>ters</em> değil, <em>dışa</em>. Alan tele paralel olsaydı iki yanda da aynı olurdu. Tek uygun şekil: teli <strong>çevreleyen çemberler</strong>.' },
      { bas: 'Çemberi kontrol et',
        metin: 'Bir çemberde üst nokta ile alt noktanın teğetleri birbirine <strong>zıttır</strong>. Gözlemle birebir uyuşuyor.' },
      { bas: 'Sonucu genelle',
        metin: 'Böylece hem alanın <strong>varlığı</strong> hem de <strong>şekli</strong> tek bir masa üstü gözlemden çıkarılmış olur. Oersted’in bu bulgusu elektromanyetizmanın başlangıcıdır ve beş yıl içinde elektromıknatısın, kırk yıl içinde elektrik motorunun önünü açmıştır.' }
    ],
    secenekler: [
      'Akım manyetik alan üretir ve alan çizgileri teli çevreleyen çemberlerdir — çemberin üst ve alt teğetleri zıt olduğu için sapmalar ters çıkar',
      'Akım manyetik alan üretir ve çizgiler telden dışa doğru ışınsaldır',
      'Pusula telin ısınmasından etkilenmiştir, manyetik alanla ilgisi yoktur',
      'Alan yalnızca telin üstünde oluşur, alttaki sapma yansımadır',
      'Çizgiler tele paraleldir; sapma farkı pusulanın uzaklığından kaynaklanır'
    ],
    dogru: 0,
    cozum: `
      <p>İki gözlem birlikte <strong>hem varlığı hem geometriyi</strong> belirler:
      alan vardır ve <strong>çemberseldir</strong>.</p>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>B şıkkı</strong> ışınsal alan öneriyor — o durumda üstte
        ve altta sapmalar <em>ters değil</em>, ikisi de telden uzağa doğru olurdu.
        <br><strong>E şıkkı</strong> tele paralel alan öneriyor — o durumda iki pusula
        <em>aynı</em> yöne saparaydı.
        <br><strong>Yöntem notu:</strong> Burada yapılan şey fiziğin özüdür — bir gözlemle
        uyumlu olmayan bütün modeller elenir, geriye kalan tek model kabul edilir.
        Simülasyondaki iki pusulayı karşılaştırarak aynı akıl yürütmeyi kendin tekrarlayabilirsin.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: A</strong></p>`
  },
  {
    baslik: 'Yüksek gerilim hattının altında',
    govde: `
      <p>Şehirlerarası yüksek gerilim hatlarının altından geçerken bazı insanlar
      “manyetik alan zararlı mı?” diye sorar. Bir ölçüm yapalım.</p>
      <p>Tipik bir iletim hattında:</p>
      <ul>
        <li>Taşınan akım: <strong>i = 500 A</strong></li>
        <li>Hattın yerden yüksekliği: <strong>d = 10 m</strong></li>
      </ul>
      <p>Karşılaştırma için: Dünya&rsquo;nın manyetik alanı <strong>≈ 50 μT</strong>,
      bir buzdolabı mıknatısı <strong>≈ 5 mT</strong>&rsquo;dır.</p>
      <p><strong>Hattın tam altında, yer seviyesindeki manyetik alanı hesapla ve bu iki
      değerle karşılaştır. Hattın yüksekliği iki katına çıkarılsa alan ne olur?</strong></p>`,
    gorsel: `
      <svg viewBox="0 0 520 210" xmlns="http://www.w3.org/2000/svg" role="img"
           aria-label="Yüksek gerilim hattının altında ölçülen manyetik alan ve karşılaştırma">
        <rect width="520" height="210" fill="#17223A"/>
        <rect x="0" y="176" width="520" height="34" fill="#3B5323"/>
        <path d="M110 176 L110 44 M410 176 L410 44" stroke="#7D8A99" stroke-width="6"/>
        <path d="M84 56 H136 M384 56 H436" stroke="#7D8A99" stroke-width="5"/>
        <path d="M96 60 Q 260 96 424 60" stroke="#B87333" stroke-width="3" fill="none"/>
        <path d="M124 60 Q 260 92 396 60" stroke="#B87333" stroke-width="3" fill="none"/>
        <text x="260" y="44" fill="#FFB020" font-size="12" font-family="system-ui" text-anchor="middle">i = 500 A</text>
        <path d="M260 88 L260 172" stroke="#6F84A8" stroke-width="1.2" stroke-dasharray="4 5"/>
        <text x="286" y="136" fill="#6F84A8" font-size="11" font-family="system-ui">d = 10 m</text>
        <circle cx="260" cy="172" r="5" fill="#38D6E0"/>
        <text x="260" y="200" fill="#38D6E0" font-size="11" font-family="system-ui" text-anchor="middle">B = ?</text>
      </svg>`,
    adimlar: [
      { bas: 'Formülü seç',
        metin: 'Hat uzun ve düz bir tel gibi davranır: <strong>B = 2·10⁻⁷ · i / d</strong>' },
      { bas: 'Hesapla',
        metin: 'B = 2·10⁻⁷ · 500 / 10 = 1·10⁻⁴ / 10 = <strong>1·10⁻⁵ T = 10 μT</strong>' },
      { bas: 'Dünya ile karşılaştır',
        metin: '10 μT, Dünya’nın alanının (50 μT) yaklaşık <strong>beşte biridir</strong>. Yani pusulanı bozacak kadar bile güçlü değil.' },
      { bas: 'Mıknatısla karşılaştır',
        metin: '5 mT = 5000 μT. Buzdolabı mıknatısı hattın altındaki alandan <strong>500 kat</strong> güçlüdür. Elini buzdolabına her dayadığında bundan çok daha büyük bir alana giriyorsun.' },
      { bas: 'Yüksekliği iki katına çıkar',
        metin: 'B ∝ 1/d olduğu için alan <strong>yarıya</strong> iner: 5 μT. (Ters kare olsaydı dörtte bire inerdi — bu konudaki temel ayrım.)' },
      { bas: 'Dürüst yorum',
        metin: 'Bu hesap yalnızca <em>manyetik alanın büyüklüğünü</em> söyler. Sağlık tartışması ayrı ve karmaşık bir konudur; fizik burada yalnızca mertebeyi verir: hattın altındaki alan, günlük hayatta karşılaştığın birçok alandan <strong>küçüktür</strong>.' }
    ],
    secenekler: [
      '10 μT; Dünya’nın alanının beşte biri, buzdolabı mıknatısının 500’de biri. Yükseklik iki katına çıkarsa 5 μT olur',
      '10 μT; yükseklik iki katına çıkarsa 2,5 μT olur',
      '100 μT; Dünya’nın alanından büyüktür',
      '1 μT; ölçülemeyecek kadar küçüktür',
      '10 mT; buzdolabı mıknatısından güçlüdür'
    ],
    dogru: 0,
    cozum: `
      <p><strong>B = 2·10⁻⁷ · 500 / 10 = 10⁻⁵ T = 10 μT</strong></p>
      <table class="degisken-tablo">
        <thead><tr><th>Kaynak</th><th>B</th><th>Oran</th></tr></thead>
        <tbody>
          <tr><td>Hattın altı</td><td class="sembol">10 μT</td><td>1×</td></tr>
          <tr><td>Dünya</td><td class="sembol">50 μT</td><td>5×</td></tr>
          <tr><td>Buzdolabı mıknatısı</td><td class="sembol">5000 μT</td><td>500×</td></tr>
        </tbody>
      </table>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>B şıkkı</strong> ters kare uygulayanlar için — düz telde
        alan <code>1/d</code> ile azalır, <code>1/d²</code> ile değil. Bu, konunun
        <em>tek numaralı</em> ayrımıdır ve çeldirici hep buradan kurulur.
        <br><strong>Mühendislik notu:</strong> Gerçek hatlarda üç fazlı akım vardır ve fazların
        alanları büyük ölçüde birbirini götürür; bu yüzden ölçülen değerler genellikle
        bu tek tel hesabından da <strong>düşüktür</strong>.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: A</strong></p>`
  }
]

});
})();
