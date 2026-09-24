(function () {
"use strict";
const F = window.F11;

/* ==========================================================================
   topics/u3-duzlem-ayna.js
   Konu 3.2 · Düzlem aynalar  (MEB 11, s.312-322)
   ========================================================================== */

F.konuKaydet('u3-duzlem-ayna', {

ozet: `Optiğin tamamı <strong>tek bir yasaya</strong> dayanır: gelme açısı yansıma açısına
eşittir. Bu konuda o yasayı düz bir yüzeye uygulayıp aynadaki görüntünün nerede oluştuğunu,
neden ters göründüğünü ve kendini boydan boya görmek için <strong>ne kadar ayna</strong>
gerektiğini çıkaracağız.`,

/* ------------------------------------------------------------- Kavram */
kavram: `
<h3>Yansıma yasası</h3>
<p>Bir ışın düzgün bir yüzeye çarptığında yansır. Yansımayı yöneten iki kural vardır:</p>
<ul>
  <li><strong>Gelme açısı = yansıma açısı</strong></li>
  <li>Gelen ışın, yansıyan ışın ve <strong>normal</strong> aynı düzlemdedir</li>
</ul>

<div class="kutu dikkat" style="margin:16px 0">
  <div class="kutu-bas"><span class="ikon">⚠</span><span>Açılar NORMALDEN ölçülür</span></div>
  <p style="margin:0">Yüzeyle yapılan açı değil, <strong>yüzeye dik doğrultuyla</strong>
  (normalle) yapılan açı kullanılır. Soru “ışın aynayla 30° açı yapıyor” diyorsa gelme
  açısı <strong>60°</strong>&rsquo;dir.</p>
  <p style="margin:8px 0 0">Bu, 2. ünitedeki manyetik akıda ve 3.1&rsquo;deki kosinüs
  yasasında karşılaştığın <em>aynı</em> tuzaktır.</p>
</div>

<h3 style="margin-top:22px">İki tür yansıma</h3>
<table class="degisken-tablo">
  <thead><tr><th>Tür</th><th>Yüzey</th><th>Sonuç</th></tr></thead>
  <tbody>
    <tr><td><strong>Düzgün yansıma</strong></td><td>pürüzsüz (ayna, durgun su)</td><td>görüntü oluşur</td></tr>
    <tr><td><strong>Dağınık yansıma</strong></td><td>pürüzlü (duvar, kâğıt)</td><td>görüntü oluşmaz, cisim görünür</td></tr>
  </tbody>
</table>
<p style="margin-top:10px;color:var(--text-2)">Her iki durumda da yansıma yasası
<strong>geçerlidir</strong>. Fark yüzeyin pürüzünde: dağınık yansımada her küçük parçanın
normali farklı yöne baktığı için ışınlar dağılır. Bu sayede bu yazıyı okuyabiliyorsun —
kâğıt ışığı her yöne dağıtıyor.</p>

<h3 style="margin-top:22px">Düzlem aynada görüntü</h3>
<p>Aynaya bakınca arkasında bir görüntü görürsün. Bu görüntünün dört özelliği vardır:</p>
<table class="degisken-tablo">
  <thead><tr><th>Özellik</th><th>Değer</th></tr></thead>
  <tbody>
    <tr><td>Yeri</td><td>aynanın <strong>arkasında</strong>, cisimle <strong>eşit uzaklıkta</strong></td></tr>
    <tr><td>Boyu</td><td>cisimle <strong>aynı</strong></td></tr>
    <tr><td>Yönü</td><td><strong>düz</strong> (ters değil)</td></tr>
    <tr><td>Cinsi</td><td><strong>sanal</strong> — perdeye düşmez</td></tr>
  </tbody>
</table>

<div class="kutu puf" style="margin:16px 0">
  <div class="kutu-bas"><span class="ikon">🪞</span><span>Ayna neden sağ-solu ters gösterir?</span></div>
  <p style="margin:0">Aslında <strong>göstermiyor</strong>. Ayna sağ ile solu değil,
  <strong>önü ile arkayı</strong> ters çevirir. Sen aynaya bakarken sağ elini kaldırırsan,
  görüntündeki el de <em>aynı taraftadır</em> — ama karşındaki bir insan gibi düşündüğün
  için onu “sol el” sanarsın.</p>
  <p style="margin:8px 0 0">Kanıt: Aynaya bir yazı tut. Harfler sağa sola değil,
  <strong>içten dışa</strong> dönmüş görünür.</p>
</div>

<h3 style="margin-top:22px">Kendini boydan boya görmek</h3>
<p>Bu, konunun en meşhur sonucudur:</p>
<div class="formul" style="max-width:340px;margin:14px 0;border-top-color:var(--accent)">
  <div class="fm" style="color:var(--accent)">Gereken en küçük ayna = boyun YARISI</div>
  <div class="fm-ad">Ve bu sonuç aynaya uzaklığından BAĞIMSIZDIR</div>
</div>
<p>170 cm boyundaysan <strong>85 cm</strong>&rsquo;lik bir ayna yeter. Aynaya 30 cm de
yaklaşsan, 3 m de uzaklaşsan bu değişmez. Simülasyonda uzaklık kaydırıcısını oynat ve
“gereken ayna” okumasının kıpırdamadığını gör.</p>

<h3 style="margin-top:22px">Aynayı döndürmek</h3>
<div class="formul" style="max-width:300px;margin:14px 0">
  <div class="fm">Ayna θ dönerse ışın 2θ döner</div>
</div>
<p>Çünkü ayna dönünce <strong>normal de döner</strong>; hem gelme hem yansıma açısı
değişir ve etki ikiye katlanır. Hassas ölçüm aletlerinde (eski galvanometrelerde,
lazer tarayıcılarda) bu “iki kat” özelliği <strong>bilerek</strong> kullanılır.</p>

<h3 style="margin-top:22px">İki ayna arasında</h3>
<p>Aralarında α açısı bulunan iki düzlem ayna arasına konan cismin görüntüleri birbirini
yansıtır ve çoğalır:</p>
<div class="formul" style="max-width:280px;margin:14px 0">
  <div class="fm">n = 360/α − 1</div>
  <div class="fm-ad">bölme tam sayı ise</div>
</div>
<table class="degisken-tablo">
  <thead><tr><th>α</th><th>360/α</th><th>Görüntü</th></tr></thead>
  <tbody>
    <tr><td>90°</td><td class="sembol">4</td><td class="sembol">3</td></tr>
    <tr><td>60°</td><td class="sembol">6</td><td class="sembol">5</td></tr>
    <tr><td>45°</td><td class="sembol">8</td><td class="sembol">7</td></tr>
    <tr><td>0° (paralel)</td><td class="sembol">∞</td><td class="sembol">sonsuz</td></tr>
  </tbody>
</table>
<p style="margin-top:10px;color:var(--text-2)">Berberdeki karşılıklı aynalarda görüntünün
tükenmemesinin sebebi budur. Pratikte her yansımada bir miktar ışık kaybolduğu için
görüntüler giderek soluklaşır ve kaybolur.</p>`,

/* ---------------------------------------------------------- Formüller */
formuller: {
  liste: [
    { fm: 'i = r',                aciklama: 'Gelme açısı = yansıma açısı (normalden)' },
    { fm: 'ayna θ ⟹ ışın 2θ',     aciklama: 'Ayna döndürme kuralı' },
    { fm: 'ayna boyu = boy / 2',  aciklama: 'Boydan boya görmek için en küçük ayna' },
    { fm: 'n = 360/α − 1',        aciklama: 'İki ayna arasındaki görüntü sayısı' },
    { fm: 'd<sub>görüntü</sub> = d<sub>cisim</sub>', aciklama: 'Görüntü aynanın arkasında, eşit uzaklıkta' }
  ],
  degiskenler: [
    { sembol: 'i', ad: 'Gelme açısı',   birim: '°' },
    { sembol: 'r', ad: 'Yansıma açısı', birim: '°' },
    { sembol: 'α', ad: 'İki ayna arası açı', birim: '°' },
    { sembol: 'n', ad: 'Görüntü sayısı', birim: 'tane' }
  ]
},

/* ------------------------------------------------------------ Türetim */
turetim: {
  yollar: [
    {
      ad: 'Ayna boyu neden boyun yarısı?',
      adimlar: [
        { baslik: 'Hangi iki ışın önemli?',
          html: `<p>Kendini tamamen görmek için <strong>başından</strong> ve
                 <strong>ayağından</strong> çıkan ışınların aynadan yansıyıp
                 <strong>gözüne</strong> ulaşması gerekir. Arada kalan her nokta zaten
                 bu ikisinin arasındadır.</p>` },

        { baslik: 'Baş ışınını izle',
          html: `<p>Baştan çıkan ışın aynaya çarpıp göze gelir. Gelme = yansıma olduğuna göre,
                 aynaya çarptığı nokta <strong>baş ile gözün tam ortası</strong>
                 hizasındadır.</p>
                 <p>Yani aynanın üst sınırı: <code>(baş − göz)/2</code></p>` },

        { baslik: 'Ayak ışınını izle',
          html: `<p>Aynı mantık: ayaktan çıkan ışın, aynaya <strong>ayak ile gözün
                 ortasında</strong> çarpar.</p>
                 <p>Aynanın alt sınırı: <code>(göz − ayak)/2</code></p>` },

        { baslik: 'Topla',
          html: `<p>Gereken ayna boyu bu iki parçanın toplamıdır:</p>
                 <div class="formul" style="max-width:340px">
                   <div class="fm">(baş−göz)/2 + (göz−ayak)/2 = (baş−ayak)/2</div>
                 </div>
                 <div class="formul" style="max-width:240px;border-top-color:var(--accent)">
                   <div class="fm" style="color:var(--accent)">= boy / 2</div>
                 </div>` },

        { baslik: 'Uzaklık neden yok?',
          html: `<p>Türetimin hiçbir adımında <strong>aynaya uzaklık kullanılmadı</strong>.
                 Uzaklaşınca ışınlar daha dar açıyla gelir ama aynadaki çarpma noktaları
                 <em>aynı hizada</em> kalır.</p>
                 <p>Uzaklaşınca görüntün küçülmez de — çünkü görüntü de seninle birlikte
                 uzaklaşır. Gözünde oluşan görüntü küçülür, ama aynadaki görüntünün
                 <strong>boyu</strong> hep senin boyun kadardır.</p>` }
      ]
    },
    {
      ad: 'Ayna θ dönerse ışın neden 2θ döner?',
      adimlar: [
        { baslik: 'Başlangıç durumu',
          html: `<p>Işın aynaya i açısıyla gelsin, i açısıyla yansısın. Gelen ile yansıyan
                 arasındaki açı <code>2i</code>&rsquo;dir.</p>` },

        { baslik: 'Aynayı θ döndür',
          html: `<p>Ayna dönünce <strong>normal de θ döner</strong>. Gelen ışın sabit
                 kaldığına göre yeni gelme açısı <code>i + θ</code> olur.</p>` },

        { baslik: 'Yeni açıyı yaz',
          html: `<p>Yeni yansıma açısı da <code>i + θ</code>&rsquo;dır. Gelen ile yansıyan
                 arasındaki yeni açı:</p>
                 <div class="formul" style="max-width:240px"><div class="fm">2(i + θ) = 2i + 2θ</div></div>` },

        { baslik: 'Farkı al',
          html: `<p>Yansıyan ışının döndüğü açı:</p>
                 <div class="formul" style="max-width:280px;border-top-color:var(--accent)">
                   <div class="fm" style="color:var(--accent)">(2i + 2θ) − 2i = 2θ</div>
                 </div>
                 <p>Sebep açık: <strong>hem gelme hem yansıma açısı</strong> θ kadar değişti,
                 etki ikiye katlandı.</p>` }
      ]
    },
    {
      ad: 'Görüntü sayısı formülü',
      adimlar: [
        { baslik: 'Tek aynayla başla',
          html: `<p>Düz bir aynada tek görüntü oluşur. İkinci bir ayna eklersek, birinci
                 aynadaki görüntü ikinci ayna için <strong>cisim gibi</strong> davranır.</p>` },

        { baslik: 'Zincir başlıyor',
          html: `<p>İkinci aynadaki görüntü, birinci ayna için yeni bir cisim olur ve bu
                 zincir sürer. Görüntüler <strong>birbirini yansıtır</strong>.</p>` },

        { baslik: 'Ne zaman biter?',
          html: `<p>Görüntüler, iki aynanın kesişme noktası etrafında <strong>eşit açılarla
                 dizilir</strong>. Tam bir çember (360°) tamamlanınca zincir kapanır.</p>
                 <p>Her adım α kadar döndüğüne göre toplam adım sayısı <code>360/α</code>&rsquo;dır.</p>` },

        { baslik: 'Biri cismin kendisi',
          html: `<p>O <code>360/α</code> konumdan <strong>biri cismin kendisidir</strong>,
                 görüntü değil. Bu yüzden bir çıkarılır:</p>
                 <div class="formul" style="max-width:240px;border-top-color:var(--accent)">
                   <div class="fm" style="color:var(--accent)">n = 360/α − 1</div>
                 </div>
                 <p>Bölme tam sayı değilse (örneğin α = 50°) zincir çemberi tam kapatmaz ve
                 görüntü sayısı <strong>cismin iki ayna arasındaki yerine bağlı</strong> olur;
                 bu formül o durumda kullanılmaz. Simülasyon her açıda görüntüleri ardışık
                 yansımalarla tek tek bulur.</p>` }
      ]
    }
  ]
},

/* -------------------------------------------------------- Simülasyon */
sim: F.simler['duzlem-ayna'],

/* ------------------------------------------------------- Püf noktası */
puf: {
  html: `
    <p><strong>1 · Açı normalden mi yüzeyden mi?</strong> Soru “ışın <em>aynayla</em> 30°
    açı yapıyor” diyorsa gelme açısı <strong>60°</strong>&rsquo;dir. “Normalle 30°” diyorsa
    zaten 30°&rsquo;dir. Bu ayrımı yapmayan soruyu kaybeder.</p>

    <p><strong>2 · Ayna boyu = boy/2, uzaklıktan bağımsız.</strong> Soruda uzaklık
    verilmişse bu bir <strong>çeldiricidir</strong>. Hesaba katma.</p>

    <p><strong>3 · Ayna kaç cm yukarıda olmalı?</strong> Bu da sorulur: aynanın alt kenarı,
    <strong>göz ile ayak arasının yarısı</strong> kadar yüksekte olmalıdır.</p>

    <p><strong>4 · Ayna θ döner, ışın 2θ.</strong> Tersi de sorulur: ışının 40° dönmesi
    isteniyorsa ayna <strong>20°</strong> döndürülür.</p>

    <p><strong>5 · Görüntü sayısı tablosu ezber:</strong></p>
    <table class="degisken-tablo" style="margin-top:8px">
      <thead><tr><th>α</th><th>n</th></tr></thead>
      <tbody>
        <tr><td>180° (aynı düzlem)</td><td class="sembol">1</td></tr>
        <tr><td>120°</td><td class="sembol">2</td></tr>
        <tr><td>90°</td><td class="sembol">3</td></tr>
        <tr><td>72°</td><td class="sembol">4</td></tr>
        <tr><td>60°</td><td class="sembol">5</td></tr>
        <tr><td>45°</td><td class="sembol">7</td></tr>
      </tbody>
    </table>

    <p style="margin-top:14px"><strong>6 · Görüntü SANALDIR.</strong> Perdeye düşürülemez.
    “Aynanın arkasına perde koyarsak görüntü düşer mi?” sorusunun cevabı
    <strong>hayır</strong>&rsquo;dır — orada gerçek ışık yoktur, ışınların uzantıları vardır.</p>

    <p><strong>7 · Cisim aynaya ϑ hızıyla yaklaşırsa</strong>, görüntü de ϑ hızıyla yaklaşır.
    Aralarındaki uzaklık <strong>2ϑ</strong> hızıyla azalır. Bu, sık sorulan bir ayrıntıdır.</p>

    <p><strong>8 · Dağınık yansımada da yasa geçerlidir.</strong> “Pürüzlü yüzeyde yansıma
    yasası bozulur” diyen şık yanlıştır. Bozulan bir şey yok; yalnızca her noktanın normali
    farklı yöne bakıyor.</p>`
},

/* ----------------------------------------------------- Zorlayıcı sorular */
osym: [
  {
    baslik: 'Ayna boyu ve uzaklık',
    kaynak: 'Çeldirici veri',
    govde: `
      <p>Boyu <strong>180 cm</strong> olan bir kişi, düz bir duvar aynasında kendini
      <strong>boydan boya</strong> görmek istiyor. Göz hizası yerden
      <strong>170 cm</strong> yükseklikte.</p>
      <p>Kişi aynaya <strong>2 m</strong> uzaklıkta duruyor.</p>
      <p>Buna göre <strong>aynanın en az boyu</strong> ve <strong>alt kenarının yerden
      yüksekliği</strong> kaç cm olmalıdır?</p>`,
    gorsel: `
      <svg viewBox="0 0 520 200" xmlns="http://www.w3.org/2000/svg" role="img"
           aria-label="Aynada boydan boya görmek için gereken ayna boyu ve alt kenar yüksekliği">
        <rect width="520" height="200" fill="#0E1726"/>
        <rect x="0" y="176" width="520" height="24" fill="#5A5245"/>
        <circle cx="150" cy="44" r="12" fill="#E8C9A8"/>
        <path d="M150 56 V132" stroke="#3C3489" stroke-width="6"/>
        <path d="M150 132 L134 176 M150 132 L166 176" stroke="#3C3489" stroke-width="5"/>
        <text x="106" y="40" fill="#EAF0FA" font-size="11" font-family="system-ui" text-anchor="end">baş 180</text>
        <text x="106" y="56" fill="#35C08A" font-size="11" font-family="system-ui" text-anchor="end">göz 170</text>
        <text x="106" y="180" fill="#EAF0FA" font-size="11" font-family="system-ui" text-anchor="end">ayak 0</text>
        <rect x="360" y="40" width="7" height="136" fill="rgba(143,182,236,.35)"/>
        <path d="M363 52 V130" stroke="#8FB6EC" stroke-width="5"/>
        <path d="M150 32 L363 52" stroke="#FFB020" stroke-width="1.8"/>
        <path d="M363 52 L150 48" stroke="#E24B4A" stroke-width="1.8"/>
        <path d="M150 176 L363 130" stroke="#FFB020" stroke-width="1.8"/>
        <path d="M363 130 L150 48" stroke="#E24B4A" stroke-width="1.8"/>
        <text x="392" y="56" fill="#8FB6EC" font-size="11" font-family="system-ui">üst</text>
        <text x="392" y="134" fill="#8FB6EC" font-size="11" font-family="system-ui">alt</text>
        <text x="256" y="194" fill="#6F84A8" font-size="11" font-family="system-ui" text-anchor="middle">2 m</text>
      </svg>`,
    secenekler: [
      'Ayna boyu 90 cm · alt kenar 85 cm',
      'Ayna boyu 90 cm · alt kenar 90 cm',
      'Ayna boyu 180 cm · alt kenar 0 cm',
      'Ayna boyu 45 cm · alt kenar 85 cm',
      'Uzaklık verilmeden hesaplanamaz'
    ],
    dogru: 0,
    cozum: `
      <p><strong>Ayna boyu:</strong> Boyun yarısı:</p>
      <div class="formul" style="max-width:240px;margin:10px 0">
        <div class="fm">180 / 2 = <strong>90 cm</strong></div>
      </div>

      <p><strong>Alt kenarın yüksekliği:</strong> Ayaktan çıkan ışın, aynaya
      <em>ayak ile gözün ortasında</em> çarpar:</p>
      <div class="formul" style="max-width:280px;margin:10px 0;border-top-color:var(--accent)">
        <div class="fm" style="color:var(--accent)">(170 + 0)/2 = <strong>85 cm</strong></div>
      </div>

      <p><strong>Kontrol — üst kenar:</strong> Baş ile gözün ortası:
      <code>(180 + 170)/2 = 175 cm</code>.
      Ayna 85&rsquo;ten 175&rsquo;e kadar ⟹ boyu <code>175 − 85 = 90 cm</code> ✓
      İki yoldan da aynı sonuç.</p>

      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>E şıkkı</strong> tam da sınanan noktadır: <strong>2 m
        uzaklık çeldiricidir.</strong> Ne ayna boyunu ne de alt kenar yüksekliğini etkiler.
        <br><strong>B şıkkı</strong> alt kenarı boyun yarısı sanıyor — hayır, alt kenar
        <em>göz yüksekliğinin</em> yarısıdır.
        <br><strong>D şıkkı</strong> boyu dörtte bir alıyor.
        <br><strong>Uygulama:</strong> Evdeki boy aynasını ölç. Muhtemelen boyunun yarısından
        uzundur — çünkü üreticiler herkese uysun diye pay bırakır.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: A</strong></p>`
  },
  {
    baslik: 'Aynaya yaklaşan cisim',
    kaynak: 'Bağıl hız',
    govde: `
      <p>Bir kişi düzlem bir aynaya doğru <strong>2 m/s</strong> sabit hızla yürüyor.</p>
      <p>Buna göre:</p>
      <ol style="margin-left:.2em">
        <li>Görüntü aynaya <strong>2 m/s</strong> ile yaklaşır.</li>
        <li>Görüntü kişiye <strong>4 m/s</strong> ile yaklaşır.</li>
        <li>Görüntünün boyu büyür.</li>
        <li>Kişi 1 m yaklaşınca, kendisiyle görüntüsü arasındaki uzaklık 2 m azalır.</li>
      </ol>
      <p>Yargılardan hangileri <strong>doğrudur</strong>?</p>`,
    secenekler: [
      'I, II ve IV',
      'I ve III',
      'Yalnız I',
      'II ve III',
      'Hepsi'
    ],
    dogru: 0,
    cozum: `
      <ol>
        <li><strong>Doğru.</strong> Görüntü daima aynanın arkasında, cisimle eşit uzaklıkta
        olur. Cisim 2 m/s yaklaşıyorsa görüntü de 2 m/s yaklaşır.</li>
        <li><strong>Doğru.</strong> İkisi de birbirine 2&rsquo;şer m/s ile yaklaştığına göre
        aralarındaki uzaklık <strong>4 m/s</strong> hızla azalır.</li>
        <li><strong>Yanlış.</strong> Düzlem aynada görüntünün boyu <strong>her zaman</strong>
        cisme eşittir. Daha büyük <em>görünmesi</em>, göze daha büyük açıyla gelmesindendir —
        görüntünün gerçek boyu değişmez.</li>
        <li><strong>Doğru.</strong> Kişi 1 m yaklaşırsa görüntü de 1 m yaklaşır, toplam
        <strong>2 m</strong>.</li>
      </ol>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>III. yargı bu sorunun ayırt edici noktası.</strong>
        “Aynaya yaklaşınca görüntü büyüyor” hissi gerçektir ama görüntünün <em>boyu</em>
        değişmiyor; <strong>görme açın</strong> büyüyor. Aynı şey uzaktaki bir arabaya
        yaklaşırken de olur — araba büyümüyor.
        <br><strong>Sağlama:</strong> Aynaya burnunu değdirsen bile görüntünün boyu
        senin boyun kadardır. Ama artık kendini ancak burnun kadar bir alanda görürsün.
        <br><strong>Bağıl hız hatırlatması:</strong> Bu, 1. ünitedeki bağıl hız mantığının
        aynısı — zıt yönde yaklaşan iki cismin bağıl hızı toplanır.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: A</strong></p>`
  }
],

/* --------------------------------------------- Bağlam temelli sorular */
baglam: [
  {
    baslik: 'Periskop nasıl çalışıyor?',
    govde: `
      <p>Denizaltılar su altındayken yüzeyi görmek için <strong>periskop</strong> kullanır.
      Periskop, uzun bir borunun iki ucuna <strong>45°</strong> eğimle yerleştirilmiş
      <strong>iki düzlem aynadan</strong> oluşur.</p>
      <p>Aynı düzeneği kalabalıkta öndekilerin arkasından bakmak için de kullanabilirsin —
      kutu ve iki ayna parçasıyla evde yapılabilir.</p>
      <p><strong>Işının izlediği yolu adım adım çıkar. Görüntü ters mi düz mü olur?
      Aynalar 45° yerine 40° olsaydı ne olurdu?</strong></p>`,
    gorsel: `
      <svg viewBox="0 0 520 210" xmlns="http://www.w3.org/2000/svg" role="img"
           aria-label="Periskopta iki kırk beş derecelik aynanın ışını iki kez doksan derece çevirmesi">
        <rect width="520" height="210" fill="#17223A"/>
        <rect x="200" y="20" width="70" height="170" rx="6" fill="#2E3D57" stroke="#4A5F86" stroke-width="2"/>
        <path d="M208 60 L262 28" stroke="#8FB6EC" stroke-width="5"/>
        <path d="M208 182 L262 150" stroke="#8FB6EC" stroke-width="5"/>
        <text x="286" y="40" fill="#8FB6EC" font-size="11" font-family="system-ui">45°</text>
        <text x="286" y="166" fill="#8FB6EC" font-size="11" font-family="system-ui">45°</text>
        <path d="M60 44 H228" stroke="#FFB020" stroke-width="2.6"/>
        <path d="M234 44 L222 38 L222 50 Z" fill="#FFB020"/>
        <path d="M234 48 V160" stroke="#FFB020" stroke-width="2.6"/>
        <path d="M234 166 L228 154 L240 154 Z" fill="#FFB020"/>
        <path d="M240 166 H420" stroke="#E24B4A" stroke-width="2.6"/>
        <path d="M426 166 L414 160 L414 172 Z" fill="#E24B4A"/>
        <circle cx="40" cy="44" r="14" fill="#35C08A"/>
        <text x="40" y="22" fill="#35C08A" font-size="11" font-family="system-ui" text-anchor="middle">cisim</text>
        <circle cx="452" cy="166" r="12" fill="#E8C9A8"/>
        <text x="452" y="196" fill="#EAF0FA" font-size="11" font-family="system-ui" text-anchor="middle">göz</text>
      </svg>`,
    adimlar: [
      { bas: 'Birinci aynaya gelen ışın',
        metin: 'Cisimden gelen ışın <strong>yatay</strong> ilerler ve üstteki aynaya çarpar. Ayna 45° eğimli olduğu için normal de 45° eğimlidir ⟹ <strong>gelme açısı 45°</strong>.' },
      { bas: 'Birinci yansıma',
        metin: 'Yansıma açısı da 45° olur. Gelen ile yansıyan arasındaki açı <strong>90°</strong> ⟹ ışın <strong>dikey</strong> olarak aşağı döner.' },
      { bas: 'İkinci aynaya varış',
        metin: 'Aşağı inen ışın alttaki aynaya yine <strong>45°</strong> ile çarpar.' },
      { bas: 'İkinci yansıma',
        metin: 'Yine 90° döner ve <strong>yatay</strong> olarak göze ulaşır. Toplam dönme: 90° + 90° = <strong>180°</strong>, ama iki ayrı düzlemde olduğu için ışın ters yöne değil, <em>paralel kaydırılmış</em> olarak çıkar.' },
      { bas: 'Görüntü ters mi düz mü?',
        metin: '<strong>Düz.</strong> Her ayna görüntüyü bir kez ters çevirir; <strong>iki ters = düz</strong>. Tek aynalı bir düzenekte görüntü ters olurdu.' },
      { bas: '40° olsaydı?',
        metin: 'Işın her aynada 2×40° = <strong>80°</strong> dönerdi, 90° değil. Üstteki aynadan çıkan ışın dikey inmez, eğik inerdi; alttaki aynaya yanlış açıyla varır ve göze <strong>ulaşmazdı</strong>. Periskopun çalışması için 45° <strong>zorunludur</strong>.' }
    ],
    secenekler: [
      'Her aynada ışın 90° döner, iki dönüş görüntüyü düz bırakır; 40°’de ışın göze ulaşmaz çünkü 45° zorunludur',
      'Her aynada ışın 45° döner, görüntü ters olur',
      'Görüntü ters olur çünkü iki kez yansıma vardır',
      '40° de çalışır, yalnızca görüntü biraz küçülür',
      'Periskop yansımayla değil kırılmayla çalışır'
    ],
    dogru: 0,
    cozum: `
      <p>45°&rsquo;lik ayna, ışını <strong>tam 90°</strong> çevirir (çünkü gelme + yansıma
      = 45 + 45). İki ayna ⟹ ışın aşağı iner ve yine yatay çıkar.</p>
      <div class="formul" style="max-width:320px;margin:10px 0;border-top-color:var(--accent)">
        <div class="fm" style="color:var(--accent)">iki ters çevirme = düz görüntü</div>
      </div>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>C şıkkı</strong> “iki kez yansıma ⟹ ters” diye
        düşünüyor — tam tersi doğru: <em>tek</em> yansıma ters çevirir, <em>çift</em> sayıda
        yansıma düze döndürür.
        <br><strong>D şıkkı</strong> açının kritikliğini küçümsüyor. Aynaların açısı
        birbirine tam paralel değilse ışın borudan hiç çıkamaz.
        <br><strong>Kendin yap:</strong> Bir karton kutu, iki küçük ayna ve bir cetvelle
        periskop yapılabilir. Aynaları 45°&rsquo;ye ayarlamak işin en zor kısmıdır —
        ve bu sorunun cevabını elinle hissedersin.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: A</strong></p>`
  },
  {
    baslik: 'Ambulansın önündeki ters yazı',
    govde: `
      <p>Ambulansların ön kısmında <strong>ters yazılmış</strong> bir yazı vardır. Öndeki
      araçların sürücüsü dikiz aynasından baktığında bu yazıyı <strong>düz</strong> okur.</p>
      <p>Bir öğrenci soruyor: <em>“Ayna zaten her şeyi ters gösteriyorsa, neden sadece
      soldan sağa ters yazıyorlar? Alt üst de ters yazsalar ya?”</em></p>
      <p><strong>Aynanın gerçekte neyi ters çevirdiğini açıkla. Yazı neden yalnızca yatayda
      ters yazılıyor?</strong></p>`,
    gorsel: `
      <svg viewBox="0 0 520 200" xmlns="http://www.w3.org/2000/svg" role="img"
           aria-label="Ambulansın önündeki ters yazının dikiz aynasında düz görünmesi">
        <rect width="520" height="200" fill="#17223A"/>
        <rect x="30" y="70" width="180" height="80" rx="8" fill="#E6E9EF"/>
        <rect x="46" y="84" width="148" height="30" fill="#2E3D57"/>
        <text x="120" y="106" fill="#FFFFFF" font-size="17" font-family="system-ui" text-anchor="middle" transform="scale(-1,1) translate(-240,0)" font-weight="700">AMBULANS</text>
        <circle cx="70" cy="152" r="12" fill="#23272E"/><circle cx="176" cy="152" r="12" fill="#23272E"/>
        <text x="120" y="184" fill="#6F84A8" font-size="11" font-family="system-ui" text-anchor="middle">ön cam · ters yazı</text>
        <rect x="300" y="60" width="16" height="100" fill="rgba(143,182,236,.35)"/>
        <path d="M308 60 V160" stroke="#8FB6EC" stroke-width="4"/>
        <text x="308" y="48" fill="#8FB6EC" font-size="11" font-family="system-ui" text-anchor="middle">dikiz aynası</text>
        <rect x="360" y="84" width="140" height="30" fill="#2E3D57"/>
        <text x="430" y="106" fill="#FFFFFF" font-size="17" font-family="system-ui" text-anchor="middle" font-weight="700">AMBULANS</text>
        <text x="430" y="134" fill="#35C08A" font-size="11" font-family="system-ui" text-anchor="middle">aynada DÜZ okunur</text>
      </svg>`,
    adimlar: [
      { bas: 'Yaygın yanlışı düzelt',
        metin: 'Ayna sağ ile solu <strong>ters çevirmez</strong>. Ayna, <strong>önü ile arkayı</strong> ters çevirir — yani sana doğru olan yön, görüntüde senden uzağa doğru olur.' },
      { bas: 'Peki neden ters görünüyor?',
        metin: 'Yazıyı aynada görmek için <strong>aynaya doğru çevirmen</strong> gerekir. O çevirme işlemini <em>sen</em> yaparsın ve yazının sağ-sol ekseni tersine döner. Ayna değil, <strong>senin çevirmen</strong> ters gösterir.' },
      { bas: 'Neden yalnızca yatayda?',
        metin: 'Yazıyı çevirirken onu <strong>düşey eksen etrafında</strong> döndürürsün (kapı gibi). Bu yüzden yalnızca <strong>sağ-sol</strong> tersine döner, alt-üst dönmez.' },
      { bas: 'Denemesi kolay',
        metin: 'Bir yazıyı aynaya <strong>alt üst</strong> çevirerek tut (takla attırarak). Bu kez aynada yazı <strong>baş aşağı</strong> ama harfleri düz görünür. Yani ters çevrilen eksen, <em>senin hangi eksende döndürdüğüne</em> bağlı.' },
      { bas: 'Ambulansa dön',
        metin: 'Sürücü dikiz aynasından bakarken görüntü yatayda tersine döner. Bu yüzden yazı araca <strong>yatayda ters</strong> yazılır — iki ters çevirme birbirini götürür ve yazı düz okunur.' },
      { bas: 'Gerçek hayatta',
        metin: 'Ambulans ve itfaiye araçlarında bu uygulama zorunludur. Aynı mantık, tıraş aynasına yapıştırılan uyarı yazılarında ve bazı yarış arabalarının önündeki numaralarda da kullanılır.' }
    ],
    secenekler: [
      'Ayna sağ-solu değil ön-arkayı ters çevirir; yazıyı düşey eksende çevirdiğimiz için sağ-sol tersine döner, bu yüzden yazı yatayda ters yazılır',
      'Ayna her zaman sağ-solu ters çevirir, alt-üstü çevirmez',
      'Ayna hem sağ-solu hem alt-üstü çevirir ama göz alt-üstü düzeltir',
      'Yazı ters değil, yalnızca farklı bir yazı tipiyle yazılmıştır',
      'Dikiz aynası özel yapımdır, normal aynadan farklı çalışır'
    ],
    dogru: 0,
    cozum: `
      <p>Ayna <strong>ön-arka</strong> eksenini ters çevirir. Sağ-sol dönmesi, cismi aynaya
      doğru çevirirken <em>bizim</em> yaptığımız döndürmeden gelir.</p>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>B şıkkı</strong> en yaygın inanış ve tam olarak
        yanlış olan. Test etmesi kolay: yazıyı alt üst çevirerek aynaya tut, bu sefer
        alt-üst ters görünür.
        <br><strong>Fizik notu:</strong> Ayna görüntüsü aslında bir <em>ayna simetrisidir</em>:
        aynaya dik eksen ters çevrilir, diğer ikisi olduğu gibi kalır. “Sağ-sol tersliği”
        bir fizik olayı değil, bizim yorumumuz.
        <br><strong>Sağ el testi:</strong> Aynaya bak, sağ elini kaldır. Görüntündeki el
        senin sağ elinin karşısındadır — gerçekten “sol el” olsaydı çapraz olurdu.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: A</strong></p>`
  }
]

});
})();
