(function () {
"use strict";
const F = window.F11;

/* ==========================================================================
   topics/u2-transformator.js
   Konu 2.3.4 · Transformatör  (MEB 11, s.263-272)
   ========================================================================== */

F.konuKaydet('u2-transformator', {

ozet: `Bir önceki konu, elektriği uzağa taşımak için gerilimi <strong>yükseltip sonra
düşürmek</strong> gerektiğini gösterdi. Bunu yapan cihaz transformatördür ve içinde
hareketli tek bir parça yoktur. Tek yaptığı şey, bu ünitede öğrendiğin
<strong>indüksiyonu</strong> kullanmaktır.`,

/* ------------------------------------------------------------- Kavram */
kavram: `
<p>Transformatör basit bir cihazdır: bir <strong>demir çekirdek</strong> ve üzerine
sarılmış <strong>iki ayrı bobin</strong>. İki bobin arasında <strong>elektriksel bağlantı
yoktur</strong>; aralarındaki tek bağ <strong>manyetik akıdır</strong>.</p>

<h3 style="margin-top:22px">Nasıl çalışıyor?</h3>
<ol>
  <li>Birincil (giriş) bobinden <strong>alternatif akım</strong> geçer</li>
  <li>Akım değiştiği için çekirdekteki <strong>akı da değişir</strong></li>
  <li>Demir çekirdek bu akıyı ikincil bobine <strong>taşır</strong></li>
  <li>Değişen akı ikincil bobinde <strong>gerilim indükler</strong> (Faraday)</li>
</ol>

<div class="formul" style="max-width:320px;margin:14px 0;border-top-color:var(--accent)">
  <div class="fm" style="color:var(--accent)">V₂ / V₁ = N₂ / N₁</div>
  <div class="fm-ad">Gerilim, sarım sayısıyla DOĞRU orantılı</div>
</div>

<p>Her iki bobin de <strong>aynı akıyı</strong> görür. Faraday yasasına göre indüklenen
gerilim sarım sayısıyla orantılıdır — bu yüzden oran doğrudan sarım oranına eşittir.</p>

<table class="degisken-tablo">
  <thead><tr><th>Durum</th><th>Tür</th><th>Sonuç</th></tr></thead>
  <tbody>
    <tr><td>N₂ &gt; N₁</td><td><strong>Yükseltici</strong></td><td>gerilim artar, akım azalır</td></tr>
    <tr><td>N₂ &lt; N₁</td><td><strong>Düşürücü</strong></td><td>gerilim azalır, akım artar</td></tr>
    <tr><td>N₂ = N₁</td><td>Ayırıcı (1:1)</td><td>gerilim aynı, devreler yalıtılır</td></tr>
  </tbody>
</table>

<h3 style="margin-top:22px">Akım neden ters orantılı?</h3>
<div class="kutu puf" style="margin:16px 0">
  <div class="kutu-bas"><span class="ikon">⚖</span><span>Bedava enerji yok</span></div>
  <p style="margin:0">İdeal bir transformatörde <strong>güç korunur</strong>:</p>
  <div class="formul" style="max-width:280px;margin:10px 0">
    <div class="fm">P₁ = P₂ ⟹ V₁·i₁ = V₂·i₂</div>
  </div>
  <p style="margin:0">Gerilimi 10 kat büyütürsen akım <strong>10 kat küçülür</strong>.
  Transformatör enerji üretmez, yalnızca <strong>gerilim ile akım arasında takas</strong>
  yapar.</p>
</div>

<div class="formul" style="max-width:300px;margin:14px 0">
  <div class="fm">i₂ / i₁ = N₁ / N₂</div>
  <div class="fm-ad">Akım, sarım sayısıyla TERS orantılı — dikkat, ters çevrik</div>
</div>

<h3 style="margin-top:22px">Neden doğru akımda çalışmaz?</h3>
<div class="kutu dikkat" style="margin:16px 0">
  <div class="kutu-bas"><span class="ikon">⚠</span><span>Bu ünitenin bütün konularını bağlayan soru</span></div>
  <p style="margin:0">Doğru akım <strong>sabittir</strong>. Sabit akım sabit manyetik alan
  üretir, sabit alan da <strong>sabit akı</strong> demektir. Faraday yasasına dönelim:</p>
  <div class="formul" style="max-width:300px;margin:10px 0">
    <div class="fm">ΔΦ = 0 ⟹ ε = −N·(0)/Δt = <strong>0</strong></div>
  </div>
  <p style="margin:0">Yani ikincil bobinde <strong>hiçbir gerilim doğmaz</strong>.
  Transformatör pile bağlanırsa çıkışta sıfır volt ölçülür — üstelik birincil sargı
  düşük dirençli olduğu için <strong>yanabilir</strong>.</p>
  <p style="margin:8px 0 0">Simülasyonda kaynağı DC yap ve bütün okumaların sıfırlandığını gör.</p>
</div>

<h3 style="margin-top:22px">Gerçek transformatörde kayıplar</h3>
<p>Verim %100 değildir. İki ana kayıp vardır:</p>
<table class="degisken-tablo">
  <thead><tr><th>Kayıp</th><th>Nedeni</th><th>Çözümü</th></tr></thead>
  <tbody>
    <tr><td><strong>Bakır kaybı</strong></td><td>sargı direncinde i²R ısısı</td><td>daha kalın tel</td></tr>
    <tr><td><strong>Girdap akımı</strong></td><td>çekirdekte dolanan akımlar</td><td>yalıtılmış ince saclar</td></tr>
    <tr><td><strong>Histerezis</strong></td><td>demirin sürekli mıknatıslanması</td><td>özel silisli çelik</td></tr>
  </tbody>
</table>
<p style="margin-top:10px;color:var(--text-2)">Güç transformatörlerinin verimi
<strong>%95-99</strong> arasındadır — makineler arasında en verimli olanlardandır,
çünkü hareketli parçası yoktur. Yine de büyük trafolar soğutma yağıyla soğutulur;
o uğultu sesi ve radyatör benzeri kanatlar bu yüzdendir.</p>

<h3 style="margin-top:22px">Nerede karşımıza çıkıyor?</h3>
<ul>
  <li><strong>Santral çıkışı:</strong> 15 kV → 400 kV (yükseltici)</li>
  <li><strong>Şehir girişi:</strong> 400 kV → 34,5 kV (düşürücü)</li>
  <li><strong>Mahalle trafosu:</strong> 34,5 kV → 400/230 V (düşürücü)</li>
  <li><strong>Telefon şarj aleti:</strong> 230 V → 5 V (düşürücü)</li>
  <li><strong>Kaynak makinesi:</strong> az sarım, çok kalın tel → çok yüksek akım</li>
</ul>`,

/* ---------------------------------------------------------- Formüller */
formuller: {
  liste: [
    { fm: 'V₂/V₁ = N₂/N₁',    aciklama: 'Gerilim sarımla doğru orantılı' },
    { fm: 'i₂/i₁ = N₁/N₂',    aciklama: 'Akım sarımla TERS orantılı' },
    { fm: 'V₁·i₁ = V₂·i₂',    aciklama: 'İdeal transformatörde güç korunur' },
    { fm: 'verim = P₂/P₁',    aciklama: 'Gerçekte %95-99' },
    { fm: 'ΔΦ = 0 ⟹ ε = 0',   aciklama: 'DC’de neden çalışmadığının sebebi' }
  ],
  degiskenler: [
    { sembol: 'N₁', ad: 'Birincil sarım sayısı', birim: 'tane' },
    { sembol: 'N₂', ad: 'İkincil sarım sayısı',  birim: 'tane' },
    { sembol: 'V₁', ad: 'Giriş gerilimi',        birim: 'V' },
    { sembol: 'V₂', ad: 'Çıkış gerilimi',        birim: 'V' },
    { sembol: 'i₁', ad: 'Giriş akımı',           birim: 'A' },
    { sembol: 'i₂', ad: 'Çıkış akımı',           birim: 'A' }
  ]
},

/* ------------------------------------------------------------ Türetim */
turetim: {
  yollar: [
    {
      ad: 'Gerilim oranı nereden geliyor?',
      adimlar: [
        { baslik: 'Her iki bobin aynı akıyı görüyor',
          html: `<p>Demir çekirdek akıyı neredeyse kayıpsız taşır. Bir sarımdan geçen akı
                 <strong>Φ</strong> ise, bu iki bobinde de aynıdır.</p>` },

        { baslik: 'Faraday’ı iki bobine ayrı ayrı uygula',
          html: `<div class="formul" style="max-width:300px">
                   <div class="fm">V₁ = N₁·ΔΦ/Δt &nbsp;&nbsp; V₂ = N₂·ΔΦ/Δt</div>
                 </div>` },

        { baslik: 'Oranla',
          html: `<p>İki ifadeyi bölelim; <code>ΔΦ/Δt</code> ortaktır ve sadeleşir:</p>
                 <div class="formul" style="max-width:240px;border-top-color:var(--accent)">
                   <div class="fm" style="color:var(--accent)">V₂/V₁ = N₂/N₁</div>
                 </div>
                 <p>Formül bu kadar basit çünkü <strong>tek ortak şey akıdır</strong>.</p>` },

        { baslik: 'Kritik noktayı fark et',
          html: `<p>Türetimin tamamı <code>ΔΦ/Δt</code> üzerine kuruldu. Bu terim
                 <strong>sıfırsa</strong> — yani akı değişmiyorsa — hiçbir gerilim doğmaz.
                 <strong>Transformatörün DC’de çalışmamasının kanıtı, kendi
                 türetiminin içindedir.</strong></p>` }
      ]
    },
    {
      ad: 'Akım neden ters orantılı?',
      adimlar: [
        { baslik: 'Enerji korunumundan başla',
          html: `<p>Transformatör enerji üretmez. İdeal durumda giren güç çıkan güce eşittir:</p>
                 <div class="formul" style="max-width:240px"><div class="fm">P₁ = P₂</div></div>` },

        { baslik: 'Gücü aç',
          html: `<div class="formul" style="max-width:240px"><div class="fm">V₁·i₁ = V₂·i₂</div></div>` },

        { baslik: 'Akım oranını yalnız bırak',
          html: `<div class="formul" style="max-width:240px"><div class="fm">i₂/i₁ = V₁/V₂</div></div>
                 <p>Gerilim oranı yerine sarım oranını koyalım:</p>
                 <div class="formul" style="max-width:240px;border-top-color:var(--accent)">
                   <div class="fm" style="color:var(--accent)">i₂/i₁ = N₁/N₂</div>
                 </div>` },

        { baslik: 'Ters çevrik olduğuna dikkat',
          html: `<p>Gerilimde <strong>N₂/N₁</strong>, akımda <strong>N₁/N₂</strong>.
                 İndisler yer değiştirdi. Bu, sınavda en çok hata yapılan noktadır.</p>
                 <p><strong>Kontrol yolu:</strong> Gerilim büyüdüyse akım
                 <em>küçülmüş</em> olmalı. Sonucun bu mantığa uyup uymadığına her zaman bak.</p>` }
      ]
    },
    {
      ad: 'Kaynak makinesi neden böyle yapılır?',
      adimlar: [
        { baslik: 'Kaynak ne ister?',
          html: `<p>Metali eritmek için <strong>çok yüksek akım</strong> gerekir —
                 yüzlerce amper. Yüksek gerilime ise ihtiyaç yoktur, hatta tehlikelidir.</p>` },

        { baslik: 'Hangi tür transformatör?',
          html: `<p>Akımı büyütmek için <strong>gerilimi düşürmek</strong> gerekir:</p>
                 <div class="formul" style="max-width:200px"><div class="fm">N₂ ≪ N₁</div></div>
                 <p>Yani ikincil sargıda çok az sarım vardır.</p>` },

        { baslik: 'Teli kalınlaştır',
          html: `<p>İkincil sargıdan yüzlerce amper geçecek. İnce tel bu akımda erir; bu
                 yüzden ikincil sargı <strong>parmak kalınlığında</strong> birkaç sarımdan
                 oluşur.</p>` },

        { baslik: 'Sayıyla',
          html: `<p>220 V girişten 2 V çıkış isteniyorsa oran 1/110&rsquo;dur.
                 Giriş akımı 20 A ise çıkış akımı:</p>
                 <div class="formul" style="max-width:280px">
                   <div class="fm">i₂ = 20 · 110 = <strong>2200 A</strong></div>
                 </div>
                 <p>Bu yüzden kaynak makineleri ağırdır ve kısa süreli çalıştırılır —
                 bakır kaybı (i²R) çok büyüktür.</p>` }
      ]
    }
  ]
},

/* -------------------------------------------------------- Simülasyon */
sim: F.simler['transformator'],

/* ------------------------------------------------------- Püf noktası */
puf: {
  html: `
    <p><strong>1 · Gerilim düz, akım ters.</strong> Tek cümlede konunun yarısı:</p>
    <div class="formul" style="max-width:320px;margin:10px 0">
      <div class="fm">V₂/V₁ = N₂/N₁ &nbsp;·&nbsp; i₂/i₁ = N₁/N₂</div>
    </div>
    <p>Karıştırdığını düşünüyorsan mantıkla kontrol et: <em>gerilim arttıysa akım
    azalmalı</em>.</p>

    <p><strong>2 · DC sorusu geldiğinde cevap hazır:</strong> çıkış <strong>sıfırdır</strong>.
    Sebebi: ΔΦ = 0 ⟹ ε = 0. Bu, ünitenin en sık sorulan kavram sorusudur.</p>

    <p><strong>3 · Güç korunur, gerilim korunmaz.</strong> “Transformatör gücü artırır”
    diyen şık her zaman yanlıştır. Artan tek şey gerilim ya da akımdır — ikisi birden asla.</p>

    <p><strong>4 · Verim sorularında yön:</strong> <code>P₂ = verim · P₁</code>.
    Çıkan güç girenden <strong>küçüktür</strong>. Ters yazarsan enerji üretmiş olursun.</p>

    <p><strong>5 · Oran tablosu:</strong></p>
    <table class="degisken-tablo" style="margin-top:8px">
      <thead><tr><th>N₂/N₁</th><th>V₂</th><th>i₂</th><th>Tür</th></tr></thead>
      <tbody>
        <tr><td>2</td><td class="sembol">2V₁</td><td class="sembol">i₁/2</td><td>yükseltici</td></tr>
        <tr><td>1/2</td><td class="sembol">V₁/2</td><td class="sembol">2i₁</td><td>düşürücü</td></tr>
        <tr><td>1/10</td><td class="sembol">V₁/10</td><td class="sembol">10i₁</td><td>düşürücü</td></tr>
      </tbody>
    </table>

    <p style="margin-top:14px"><strong>6 · Kalın tel = yüksek akım tarafı.</strong> Şekilli
    sorularda hangi sargının ikincil olduğu tel kalınlığından anlaşılır. Kaynak makinesinde
    kalın olan <em>çıkış</em>, yüksek gerilim trafosunda kalın olan <em>giriş</em> tarafıdır.</p>

    <p><strong>7 · İki devre elektriksel olarak AYRIDIR.</strong> Aralarında yalnızca
    manyetik bağ vardır. 1:1 transformatörler sırf bu yalıtım için kullanılır —
    gerilimi değiştirmezler, yalnızca devreleri birbirinden ayırırlar.</p>

    <div class="kutu puf" style="margin-top:14px">
      <div class="kutu-bas"><span class="ikon">🔗</span><span>Ünitenin özeti tek zincirde</span></div>
      <p style="margin:0">Akım manyetik alan üretir (2.2.2) → bobin alanı güçlendirir (2.2.3)
      → değişen akı gerilim doğurur (2.3.2) → jeneratör alternatif akım üretir (2.3.3)
      → transformatör onu taşınabilir hâle getirir (2.3.4).
      <strong>Elektrik şebekesinin tamamı bu beş adımdır.</strong></p>
    </div>`
},

/* ----------------------------------------------------- Zorlayıcı sorular */
osym: [
  {
    baslik: 'Pile bağlanan transformatör',
    kaynak: 'Ünitenin en sık sorusu',
    govde: `
      <p>Birincil sargısı <strong>1000</strong>, ikincil sargısı <strong>200</strong> sarımlı
      bir transformatörün girişine <strong>220 V</strong>&rsquo;luk bir <strong>pil</strong>
      (doğru akım kaynağı) bağlanıyor.</p>
      <p>İkincil sargıda ölçülen gerilim kaç V&rsquo;dir?</p>`,
    secenekler: [
      '0 V',
      '44 V',
      '220 V',
      '1100 V',
      '176 V'
    ],
    dogru: 0,
    cozum: `
      <p>Sarım oranından hesap yapmak <strong>yanlış yola sapmaktır</strong>. Önce şunu sor:
      <em>akı değişiyor mu?</em></p>
      <table class="degisken-tablo">
        <thead><tr><th>Adım</th><th>Sonuç</th></tr></thead>
        <tbody>
          <tr><td>Pil ⟹ akım</td><td>sabit</td></tr>
          <tr><td>Sabit akım ⟹ manyetik alan</td><td>sabit</td></tr>
          <tr><td>Sabit alan ⟹ akı</td><td>sabit</td></tr>
          <tr><td>Sabit akı ⟹ ΔΦ</td><td class="sembol">0</td></tr>
        </tbody>
      </table>
      <div class="formul" style="max-width:300px;margin:12px 0;border-top-color:var(--accent)">
        <div class="fm" style="color:var(--accent)">ε = −N·ΔΦ/Δt = −N·(0)/Δt = 0</div>
      </div>
      <div class="kutu dikkat" style="margin-top:12px">
        <div class="kutu-bas"><span class="ikon">⚠</span><span>B şıkkı neden bu kadar cazip?</span></div>
        <p style="margin:0">44 V, sarım oranından çıkan sayıdır: <code>220 · 200/1000 = 44</code>.
        Formülü doğru uygulamış ama <strong>formülün geçerlilik koşulunu</strong>
        atlamıştır. Transformatör formülleri yalnızca <em>alternatif akımda</em> geçerlidir.</p>
      </div>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>Gerçekte ne olur?</strong> Anahtarı kapattığın
        <em>ilk anda</em> akım sıfırdan bir değere çıkarken kısa bir akı değişimi olur ve
        ikincilde <strong>anlık bir gerilim darbesi</strong> görünür. Sonra akı sabitlenir
        ve gerilim sıfırlanır. Üstelik birincil sargının direnci çok düşük olduğu için
        pilden büyük akım çeker ve <strong>sargı ısınıp yanabilir</strong>.
        <br><strong>Simülasyonda dene:</strong> Kaynağı DC yap, bütün okumalar sıfırlanır
        ve ekranda sebebi yazar.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: A</strong></p>`
  },
  {
    baslik: 'Verimli olmayan transformatör',
    kaynak: 'Gerçekçilik',
    govde: `
      <p>Bir transformatörün birincil devresine <strong>220 V</strong> gerilim uygulanıyor ve
      <strong>5 A</strong> akım çekiyor. İkincil devrede gerilim <strong>44 V</strong>,
      akım ise <strong>24 A</strong> ölçülüyor.</p>
      <p>Bu transformatörün <strong>verimi</strong> yüzde kaçtır? Aradaki fark nereye gidiyor?</p>`,
    secenekler: [
      '%96 · fark ısıya dönüşüyor',
      '%100 · kayıp yoktur',
      '%104 · transformatör güç üretiyor',
      '%80 · fark ışığa dönüşüyor',
      'Hesaplanamaz, sarım sayıları verilmemiş'
    ],
    dogru: 0,
    cozum: `
      <p><strong>Giren güç:</strong> P₁ = V₁·i₁ = 220 · 5 = <strong>1100 W</strong></p>
      <p><strong>Çıkan güç:</strong> P₂ = V₂·i₂ = 44 · 24 = <strong>1056 W</strong></p>
      <div class="formul" style="max-width:320px;margin:10px 0;border-top-color:var(--accent)">
        <div class="fm" style="color:var(--accent)">verim = 1056/1100 = 0,96 ⟹ %96</div>
      </div>
      <p><strong>Kayıp:</strong> 1100 − 1056 = <strong>44 W</strong>, tamamı
      <strong>ısıya</strong> dönüşür:</p>
      <ul>
        <li>Sargı tellerinin direncinde (bakır kaybı)</li>
        <li>Demir çekirdekteki girdap akımları ve histerezis (demir kaybı)</li>
      </ul>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>E şıkkı</strong> gereksiz veri arıyor — verim için
        sarım sayılarına <em>gerek yok</em>, yalnızca giren ve çıkan güç yeterli.
        <br><strong>C şıkkı</strong> bir sağlama noktasıdır: verim <strong>asla
        %100&rsquo;ü geçemez</strong>. Böyle bir sonuç bulursan hesabında hata var demektir.
        <br><strong>İdeal hesapla karşılaştır:</strong> İdealde i₂ = i₁·(V₁/V₂) = 5·5 = 25 A
        olurdu. Ölçülen 24 A. Aradaki 1 A&rsquo;lik fark, kayıpların somut karşılığıdır.
        <br><strong>Pratik:</strong> 44 W sürekli ısı demektir; bu yüzden büyük trafolar
        yağla soğutulur ve yanlarında radyatör benzeri kanatlar bulunur.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: A</strong></p>`
  }
],

/* --------------------------------------------- Bağlam temelli sorular */
baglam: [
  {
    baslik: 'Şarj aletin neden ısınıyor?',
    govde: `
      <p>Telefon şarj aleti prizdeki <strong>230 V</strong>&rsquo;u telefonun istediği
      <strong>5 V</strong>&rsquo;a düşürür. Uzun süre takılı kalınca <strong>ısınır</strong>.</p>
      <p>Bir şarj aleti <strong>10 W</strong> güç veriyor ve verimi <strong>%85</strong>.</p>
      <p>Bir öğrenci soruyor: <em>“Şarj aleti sadece gerilimi düşürüyor. Neden ısınsın ki?
      Hem prizden ne kadar güç çekiyor?”</em></p>
      <p><strong>Prizden çekilen gücü, kayıp gücü hesapla ve ısınmanın sebebini açıkla.</strong></p>`,
    gorsel: `
      <svg viewBox="0 0 520 190" xmlns="http://www.w3.org/2000/svg" role="img"
           aria-label="Şarj aletinde giren güç, çıkan güç ve ısıya giden kayıp">
        <rect width="520" height="190" fill="#17223A"/>
        <rect x="30" y="66" width="70" height="58" rx="6" fill="#E6E9EF"/>
        <g fill="#23272E">
          <circle cx="52" cy="88" r="5"/><circle cx="78" cy="88" r="5"/>
        </g>
        <text x="65" y="142" fill="#EAF0FA" font-size="11" font-family="system-ui" text-anchor="middle">priz 230 V</text>
        <path d="M100 95 H160" stroke="#FFB020" stroke-width="4"/>
        <path d="M166 95 L154 89 L154 101 Z" fill="#FFB020"/>
        <text x="132" y="82" fill="#FFB020" font-size="11" font-family="system-ui" text-anchor="middle">P₁ = ?</text>
        <rect x="168" y="56" width="110" height="78" rx="8" fill="#5F6B78"/>
        <text x="223" y="92" fill="#FFFFFF" font-size="12" font-family="system-ui" text-anchor="middle">şarj aleti</text>
        <text x="223" y="110" fill="#FFD24A" font-size="11" font-family="system-ui" text-anchor="middle">verim %85</text>
        <path d="M278 82 H350" stroke="#35C08A" stroke-width="4"/>
        <path d="M356 82 L344 76 L344 88 Z" fill="#35C08A"/>
        <text x="316" y="70" fill="#35C08A" font-size="11" font-family="system-ui" text-anchor="middle">10 W · 5 V</text>
        <path d="M223 134 V168" stroke="#FF6B6B" stroke-width="4"/>
        <path d="M223 174 L217 162 L229 162 Z" fill="#FF6B6B"/>
        <text x="270" y="170" fill="#FF6B6B" font-size="11" font-family="system-ui">ısı = kayıp</text>
        <rect x="360" y="60" width="52" height="72" rx="8" fill="#2E3D57"/>
        <rect x="368" y="68" width="36" height="52" rx="3" fill="#0E1726"/>
        <text x="386" y="150" fill="#EAF0FA" font-size="11" font-family="system-ui" text-anchor="middle">telefon</text>
      </svg>`,
    adimlar: [
      { bas: 'Çıkan gücü yaz',
        metin: 'P₂ = <strong>10 W</strong> (telefona giden faydalı güç)' },
      { bas: 'Giren gücü bul',
        metin: 'verim = P₂/P₁ ⟹ P₁ = P₂/verim = 10 / 0,85 ≈ <strong>11,8 W</strong>' },
      { bas: 'Kaybı hesapla',
        metin: 'P_kayıp = 11,8 − 10 = <strong>1,8 W</strong>' },
      { bas: 'Kayıp nereye gidiyor?',
        metin: 'Tamamı <strong>ısıya</strong>: sargı tellerinin direncinde, çekirdekteki girdap akımlarında ve şarj aletinin elektronik devrelerinde. Enerji yok olmaz — biçim değiştirir.' },
      { bas: 'Neden hissedilir kadar ısınıyor?',
        metin: '1,8 W küçük bir sayı gibi görünür ama <strong>çok küçük bir hacimde</strong> ve sürekli açığa çıkıyor. Kıyas: aynı güç, küçük bir LED lambanın tükettiği güce yakındır ve o da elle tutulamayacak kadar ısınır.' },
      { bas: 'Telefon dolduktan sonra',
        metin: 'Şarj aleti prizde kalmaya devam ederse çok az da olsa güç çekmeyi sürdürür (boşta tüketim). Yeni cihazlarda bu tüketim çok düşürüldü ama sıfır değildir.' }
    ],
    secenekler: [
      'P₁ ≈ 11,8 W · kayıp ≈ 1,8 W; kayıp tamamen ısıya dönüşür, küçük hacimde açığa çıktığı için hissedilir',
      'P₁ = 10 W · kayıp yoktur; ısınma prizden gelir',
      'P₁ ≈ 8,5 W · kayıp ≈ 1,5 W; giren güç çıkandan küçüktür',
      'P₁ ≈ 11,8 W; kayıp ışığa dönüşür',
      'Gerilim düştüğü için güç de düşer, ısınma olmaz'
    ],
    dogru: 0,
    cozum: `
      <p><strong>P₁ = P₂/verim = 10/0,85 ≈ 11,8 W</strong> &nbsp;·&nbsp;
      <strong>kayıp ≈ 1,8 W</strong></p>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>C şıkkı</strong> önemli bir mantık hatası içeriyor:
        giren güç çıkandan <em>büyük</em> olmak zorundadır. Küçük çıkarsa enerji üretmiş
        olursun.
        <br><strong>Ölçek duygusu:</strong> %85 verim, güç elektroniği için normaldir.
        Transformatörün kendisi %95-99 verimlidir ama şarj aletinde ayrıca doğrultucu,
        filtre ve regülatör devreleri vardır; kayıp onlarda birikir.
        <br><strong>Ülke ölçeğinde:</strong> Türkiye’de on milyonlarca şarj aleti var.
        Her birinin boşta birkaç yüz miliwatt tüketmesi, toplamda santral ölçeğinde
        bir güce karşılık gelir — enerji verimliliği düzenlemelerinin bu tür cihazları
        hedeflemesinin sebebi budur.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: A</strong></p>`
  },
  {
    baslik: 'Mahalle trafosundan evine',
    govde: `
      <p>Sokak başındaki gri kutu ya da direk üstündeki silindirik cihaz bir
      <strong>dağıtım transformatörüdür</strong>. Girişinde <strong>34 500 V</strong>,
      çıkışında <strong>400 V</strong> vardır (evine gelen 230 V, bu üç fazlı sistemin
      bir fazıdır).</p>
      <p>Bu trafo bir mahalleye <strong>250 kW</strong> güç dağıtıyor.</p>
      <p><strong>Sarım oranını, giriş ve çıkış akımlarını hesapla. Neden giriş kablosu
      ince, çıkış kabloları kalın?</strong></p>`,
    gorsel: `
      <svg viewBox="0 0 520 200" xmlns="http://www.w3.org/2000/svg" role="img"
           aria-label="Dağıtım transformatöründe yüksek gerilimli ince giriş ve düşük gerilimli kalın çıkış kabloları">
        <rect width="520" height="200" fill="#17223A"/>
        <rect x="0" y="172" width="520" height="28" fill="#3B5323"/>
        <path d="M60 172 V40" stroke="#9AA5B1" stroke-width="8"/>
        <path d="M34 48 H86" stroke="#9AA5B1" stroke-width="5"/>
        <path d="M44 52 Q 140 76 196 88" stroke="#B87333" stroke-width="2" fill="none"/>
        <text x="120" y="60" fill="#FFB020" font-size="11" font-family="system-ui">34 500 V · ince</text>
        <rect x="196" y="70" width="96" height="86" rx="8" fill="#5F6B78"/>
        <rect x="204" y="80" width="80" height="66" rx="4" fill="#3A4049"/>
        <text x="244" y="118" fill="#EAF0FA" font-size="11" font-family="system-ui" text-anchor="middle">trafo</text>
        <g stroke="#B87333" stroke-width="6" fill="none">
          <path d="M292 92 Q 380 100 460 112"/>
          <path d="M292 108 Q 380 118 460 130"/>
          <path d="M292 124 Q 380 136 460 148"/>
        </g>
        <text x="400" y="92" fill="#35C08A" font-size="11" font-family="system-ui">400 V · kalın</text>
        <rect x="446" y="112" width="60" height="60" fill="#2E3D57"/>
        <rect x="458" y="128" width="16" height="16" fill="#FFD24A"/>
        <text x="476" y="192" fill="#EAF0FA" font-size="11" font-family="system-ui" text-anchor="middle">evler</text>
      </svg>`,
    adimlar: [
      { bas: 'Sarım oranını bul',
        metin: 'N₂/N₁ = V₂/V₁ = 400 / 34 500 ≈ <strong>1/86</strong><br>Yani ikincilde, birincilin 86’da biri kadar sarım var.' },
      { bas: 'Çıkış akımını hesapla',
        metin: 'i₂ = P/V₂ = 250 000 / 400 = <strong>625 A</strong>' },
      { bas: 'Giriş akımını hesapla',
        metin: 'i₁ = P/V₁ = 250 000 / 34 500 ≈ <strong>7,2 A</strong>' },
      { bas: 'Oranı kontrol et',
        metin: '625 / 7,2 ≈ 86 ✓ — akım oranı, sarım oranının <strong>tersi</strong>. Gerilim 86 kat düştü, akım 86 kat arttı.' },
      { bas: 'Kablo kalınlığını açıkla',
        metin: 'Kablo kalınlığını belirleyen şey gerilim değil <strong>akımdır</strong>. Giriş 7,2 A taşır — ince tel yeter. Çıkış 625 A taşır — çok kalın iletken gerekir, yoksa <code>i²R</code> ısısıyla erir.' },
      { bas: 'Yalıtımı da ekle',
        metin: 'Kalınlığı akım, <strong>yalıtım kalınlığını</strong> ise gerilim belirler. 34 500 V’luk ince kablonun yalıtımı çok kalındır; 400 V’luk kalın kablonunki incedir. İki farklı tasarım ölçütü.' }
    ],
    secenekler: [
      'N₂/N₁ ≈ 1/86 · i₁ ≈ 7,2 A · i₂ = 625 A; kalınlığı akım belirler, bu yüzden çıkış kabloları kalındır',
      'N₂/N₁ ≈ 86 · i₁ = 625 A · i₂ ≈ 7,2 A; giriş kabloları kalın olmalıdır',
      'İki taraftan da aynı akım geçer; kalınlık farkı yalıtım içindir',
      'N₂/N₁ ≈ 1/86 · i₁ = i₂ = 625 A; güç korunduğu için akımlar eşittir',
      'Kalınlığı gerilim belirler, yüksek gerilim tarafı kalın olmalıdır'
    ],
    dogru: 0,
    cozum: `
      <table class="degisken-tablo">
        <thead><tr><th></th><th>Gerilim</th><th>Akım</th><th>Kablo</th></tr></thead>
        <tbody>
          <tr><td>Giriş</td><td class="sembol">34 500 V</td><td class="sembol">7,2 A</td><td>ince tel, <strong>kalın yalıtım</strong></td></tr>
          <tr><td>Çıkış</td><td class="sembol">400 V</td><td class="sembol">625 A</td><td><strong>kalın tel</strong>, ince yalıtım</td></tr>
        </tbody>
      </table>
      <div class="formul" style="max-width:300px;margin:12px 0;border-top-color:var(--accent)">
        <div class="fm" style="color:var(--accent)">V ÷86 ⟹ i ×86 &nbsp;·&nbsp; P sabit</div>
      </div>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>D şıkkı</strong> gücün korunmasını akımın korunması
        sanıyor — korunan <em>çarpımdır</em>, çarpanlar değil.
        <br><strong>C şıkkı</strong> ise kalınlığın sebebini yalıtıma bağlıyor; ikisi
        ayrı ölçüttür ve soru bunu ayırt edebilmeyi istiyor.
        <br><strong>Bu soru ünitenin özeti:</strong> Coulomb’dan başlayıp buraya geldik.
        Sokak başındaki o gri kutunun içinde, bu ünitede öğrendiğin her şey var —
        akım, manyetik alan, akı ve indüksiyon.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: A</strong></p>`
  }
]

});
})();
