(function () {
"use strict";
const F = window.F11;

/* ==========================================================================
   topics/u3-mercek-goruntu.js
   Konu 3.10 · Merceklerde görüntü
   ========================================================================== */

F.konuKaydet('u3-mercek-goruntu', {

ozet: `İyi haber: mercek denklemi, 3.4&rsquo;te öğrendiğin ayna denkleminin
<strong>birebir aynısıdır</strong>. Beş durum da aynı. Tek fark, gerçek görüntünün
<strong>nerede</strong> oluştuğu: aynada cismin tarafında, mercekte cismin
<strong>öte</strong> tarafında. Bu konuyla birlikte fotoğraf makinesinden gözüne kadar
bütün optik aletleri çözebileceksin.`,

/* ------------------------------------------------------------- Kavram */
kavram: `
<h3>Mercek denklemi</h3>
<div class="formul" style="max-width:300px;margin:14px 0;border-top-color:var(--accent)">
  <div class="fm" style="color:var(--accent)">1/f = 1/a + 1/b</div>
  <div class="fm-ad">b = a·f / (a − f) &nbsp;·&nbsp; Büyütme = |b/a|</div>
</div>
<table class="degisken-tablo">
  <thead><tr><th>Simge</th><th>Anlamı</th><th>İşaret</th></tr></thead>
  <tbody>
    <tr><td class="sembol">a</td><td>Cismin merceğe uzaklığı</td><td>daima +</td></tr>
    <tr><td class="sembol">b</td><td>Görüntünün uzaklığı</td><td>+ ⟹ öte tarafta, <strong>gerçek</strong><br>− ⟹ cisim tarafında, <strong>sanal</strong></td></tr>
    <tr><td class="sembol">f</td><td>Odak uzaklığı</td><td>+ ⟹ <strong>ince kenarlı</strong><br>− ⟹ <strong>kalın kenarlı</strong></td></tr>
  </tbody>
</table>

<div class="kutu dikkat" style="margin:16px 0">
  <div class="kutu-bas"><span class="ikon">⚠</span><span>Ayna ile mercek: tek fark</span></div>
  <table class="degisken-tablo" style="margin-top:8px">
    <thead><tr><th></th><th>Çukur ayna</th><th>İnce kenarlı mercek</th></tr></thead>
    <tbody>
      <tr><td>Denklem</td><td>1/f = 1/a + 1/b</td><td><strong>aynı</strong></td></tr>
      <tr><td>Beş durum</td><td>var</td><td><strong>aynı</strong></td></tr>
      <tr><td>Işık ne yapar?</td><td>yansır (geri döner)</td><td>kırılır (<strong>geçer</strong>)</td></tr>
      <tr><td>Gerçek görüntü nerede?</td><td>cismin <strong>tarafında</strong></td><td>cismin <strong>öte tarafında</strong></td></tr>
    </tbody>
  </table>
  <p style="margin:8px 0 0">Yani hesap aynı, <strong>çizim</strong> farklı. Görüntünün
  hangi tarafa düşeceğini karıştırmamak için “ışık geçiyor mu, dönüyor mu?” diye sor.</p>
</div>

<h3 style="margin-top:22px">İnce kenarlı mercekte beş durum</h3>
<table class="degisken-tablo">
  <thead><tr><th>Cismin yeri</th><th>Görüntünün yeri</th><th>Cins</th><th>Yön</th><th>Boy</th><th>Kullanım</th></tr></thead>
  <tbody>
    <tr><td>Sonsuzda</td><td>F&rsquo;de</td><td>gerçek</td><td>ters</td><td>nokta</td><td>teleskop</td></tr>
    <tr><td>2F&rsquo;nin dışında</td><td>F ile 2F arasında</td><td>gerçek</td><td>ters</td><td>küçük</td><td><strong>fotoğraf makinesi</strong></td></tr>
    <tr><td><strong>2F&rsquo;de</strong></td><td><strong>2F&rsquo;de</strong></td><td>gerçek</td><td>ters</td><td><strong>eşit</strong></td><td>fotokopi (1:1)</td></tr>
    <tr><td>F ile 2F arasında</td><td>2F&rsquo;nin dışında</td><td>gerçek</td><td>ters</td><td>büyük</td><td><strong>projeksiyon</strong></td></tr>
    <tr><td><strong>F&rsquo;de</strong></td><td>sonsuzda</td><td colspan="3"><strong>görüntü oluşmaz</strong></td><td>el feneri</td></tr>
    <tr><td>F ile mercek arasında</td><td>cisimle aynı tarafta</td><td>sanal</td><td>düz</td><td>büyük</td><td><strong>büyüteç</strong></td></tr>
  </tbody>
</table>

<h3 style="margin-top:22px">Kalın kenarlı mercekte tek durum</h3>
<p>f negatif olduğu için <code>a − f = a + |f|</code> daima a&rsquo;dan büyüktür:</p>
<div class="formul" style="max-width:340px;margin:14px 0">
  <div class="fm">|b| = a·|f| / (a + |f|) &lt; |f| &lt; a</div>
</div>
<p>Yani b her zaman negatif ve küçüktür ⟹ görüntü <strong>sanal · düz · küçük</strong>.
Cisim nerede olursa olsun değişmez. (Tümsek aynanın mercek karşılığıdır.)</p>

<h3 style="margin-top:22px">Optik aletler</h3>
<table class="degisken-tablo">
  <thead><tr><th>Alet</th><th>f</th><th>a</th><th>b</th><th>Büyütme</th><th>Görüntü</th></tr></thead>
  <tbody>
    <tr><td>Fotoğraf makinesi</td><td>5 cm</td><td>200 cm</td><td>5,13 cm</td><td>0,026</td><td>gerçek · ters · küçük</td></tr>
    <tr><td>Projeksiyon</td><td>10 cm</td><td>10,5 cm</td><td>210 cm</td><td><strong>20</strong></td><td>gerçek · ters · büyük</td></tr>
    <tr><td>Büyüteç</td><td>10 cm</td><td>6 cm</td><td>−15 cm</td><td>2,5</td><td>sanal · düz · büyük</td></tr>
  </tbody>
</table>
<p style="margin-top:10px;color:var(--text-2)">Projeksiyon cihazında görüntü
<strong>ters</strong> oluştuğu için slayt ya da panel makineye <strong>baş aşağı</strong>
yerleştirilir. Fotoğraf makinesinde de görüntü sensöre ters düşer; düzeltmeyi
<strong>yazılım</strong> yapar.</p>

<div class="kutu puf" style="margin:16px 0">
  <div class="kutu-bas"><span class="ikon">👁</span><span>Gözün kendisi bir mercek sistemi</span></div>
  <p style="margin:0">İnsan gözü, cismi <strong>daima 2F&rsquo;nin dışında</strong> tutan bir
  fotoğraf makinesidir: görüntü retinada <strong>gerçek, ters ve küçük</strong> oluşur.
  Dünyayı düz görmemizin sebebi optik değil, <strong>beynin</strong> görüntüyü
  çevirmesidir.</p>
  <p style="margin:8px 0 0">Fark şu: fotoğraf makinesi netlemek için <em>merceği
  kaydırır</em> (b değişir), göz ise merceğin <strong>şeklini değiştirir</strong>
  (f değişir). Buna <strong>uyum (akomodasyon)</strong> denir. Retina sabit olduğu için
  gözün b&rsquo;si hep aynıdır.</p>
</div>`,

/* ---------------------------------------------------------- Formüller */
formuller: {
  liste: [
    { fm: '1/f = 1/a + 1/b',       aciklama: 'Mercek denklemi (ayna ile aynı)' },
    { fm: 'b = a·f / (a − f)',     aciklama: 'b için çözülmüş hâli' },
    { fm: 'Büyütme = |b/a|',       aciklama: 'Görüntü boyu / cisim boyu' },
    { fm: 'D = 1/f',               aciklama: 'Dioptri (f metre)' },
    { fm: 'b > 0 ⟹ öte tarafta',   aciklama: 'Gerçek · ters · perdeye düşer' },
    { fm: 'b < 0 ⟹ aynı tarafta',  aciklama: 'Sanal · düz · perdeye düşmez' }
  ],
  degiskenler: [
    { sembol: 'a', ad: 'Cisim uzaklığı',   birim: 'cm' },
    { sembol: 'b', ad: 'Görüntü uzaklığı', birim: 'cm' },
    { sembol: 'f', ad: 'Odak uzaklığı',    birim: 'cm' },
    { sembol: 'D', ad: 'Dioptri',          birim: '1/m' }
  ]
},

/* ------------------------------------------------------------ Türetim */
turetim: {
  yollar: [
    {
      ad: 'Mercek denkleminin çıkarılışı',
      adimlar: [
        { baslik: 'İki özel ışın seç',
          html: `<p>Cismin tepesinden iki ışın gönder: biri <strong>eksene paralel</strong>
                 (odaktan geçer), biri <strong>merkezden</strong> (sapmaz).</p>` },

        { baslik: 'Merkez ışınından benzerlik',
          html: `<p>Merkezden geçen ışın düz gittiği için, cisim üçgeni ile görüntü üçgeni
                 <strong>benzerdir</strong>:</p>
                 <div class="formul" style="max-width:220px">
                   <div class="fm">h′ / h = b / a</div>
                 </div>
                 <p>Büyütme formülü buradan gelir.</p>` },

        { baslik: 'Paralel ışınından benzerlik',
          html: `<p>Paralel gelip odaktan geçen ışın için, odağın iki yanındaki üçgenler
                 benzerdir:</p>
                 <div class="formul" style="max-width:260px">
                   <div class="fm">h′ / h = (b − f) / f</div>
                 </div>` },

        { baslik: 'Eşitle ve düzenle',
          html: `<div class="formul" style="max-width:300px">
                   <div class="fm">b/a = (b−f)/f ⟹ b·f = a·b − a·f</div>
                 </div>
                 <p>Her iki yanı <code>a·b·f</code>&rsquo;ye böl:</p>
                 <div class="formul" style="max-width:260px;border-top-color:var(--accent)">
                   <div class="fm" style="color:var(--accent)">1/f = 1/a + 1/b</div>
                 </div>` },

        { baslik: 'Aynayla aynı çıktı',
          html: `<p>3.4&rsquo;teki türetimle karşılaştır — <strong>adımlar neredeyse
                 birebir aynı</strong>. Sebebi, her iki durumda da aynı iki benzerliğin
                 kurulması. Bu yüzden beş durum tablosu da aynıdır.</p>` }
      ]
    },
    {
      ad: 'Büyüteç neden büyütüyor?',
      adimlar: [
        { baslik: 'Cismi odağın içine koy',
          html: `<p><code>a &lt; f</code> ⟹ <code>a − f &lt; 0</code> ⟹ <code>b &lt; 0</code>:
                 görüntü <strong>sanal ve düz</strong>.</p>` },

        { baslik: 'Büyütmeyi yaz',
          html: `<div class="formul" style="max-width:300px">
                   <div class="fm">|b/a| = |f/(a−f)| = f / (f − a)</div>
                 </div>
                 <p><code>a &lt; f</code> olduğu için payda <code>f</code>&rsquo;den küçük ⟹
                 <strong>büyütme daima 1&rsquo;den büyük</strong>.</p>` },

        { baslik: 'a, f’ye yaklaşırsa',
          html: `<p>Payda sıfıra gider, büyütme <strong>hızla artar</strong>:</p>
                 <table class="degisken-tablo">
                   <thead><tr><th>a (f = 10 cm)</th><th>b</th><th>Büyütme</th></tr></thead>
                   <tbody>
                     <tr><td>2 cm</td><td>−2,5 cm</td><td>1,25</td></tr>
                     <tr><td>6 cm</td><td>−15 cm</td><td>2,5</td></tr>
                     <tr><td>8 cm</td><td>−40 cm</td><td>5</td></tr>
                     <tr><td>9 cm</td><td>−90 cm</td><td>10</td></tr>
                   </tbody>
                 </table>` },

        { baslik: 'Sınır nerede?',
          html: `<p>Teorik olarak sınırsız görünüyor ama pratikte değil: büyütme arttıkça
                 görüntü <strong>uzaklaşır</strong> (b büyür) ve gözün bakabileceği
                 mesafeyi aşar. Ayrıca küresel sapma ve renk sapması görüntüyü bozar.</p>
                 <p>Bu yüzden tek mercekli büyüteçlerde pratik sınır yaklaşık
                 <strong>10 kat</strong>tır. Daha fazlası için <strong>mikroskop</strong>
                 gerekir: iki mercek arka arkaya kullanılır, birinin görüntüsü diğerine
                 cisim olur ve büyütmeler <strong>çarpılır</strong>.</p>` }
      ]
    },
    {
      ad: 'Fotoğraf makinesi nasıl netliyor?',
      adimlar: [
        { baslik: 'Sensör sabit',
          html: `<p>Fotoğraf makinesinde sensörün yeri sabit değildir; mercek ileri geri
                 kaydırılarak <code>b</code> ayarlanır. Odak uzaklığı f sabittir.</p>` },

        { baslik: 'Uzak cisim',
          html: `<p>a = ∞ ⟹ <code>b = f</code>. Mercek sensöre <strong>en yakın</strong>
                 konumdadır.</p>` },

        { baslik: 'Yakın cisim',
          html: `<p>f = 5 cm, a = 200 cm:</p>
                 <div class="formul" style="max-width:340px">
                   <div class="fm">b = 200·5/(200−5) = 1000/195 = <strong>5,13 cm</strong></div>
                 </div>
                 <p>Mercek sensörden yalnızca <strong>1,3 mm</strong> uzaklaşmış oldu.
                 Netleme mekanizmasının bu kadar hassas olmasının sebebi budur.</p>` },

        { baslik: 'Makro çekim',
          html: `<p>a = 6 cm olsaydı: <code>b = 6·5/1 = 30 cm</code>. Mercek sensörden
                 <strong>25 cm</strong> uzaklaşmalıydı — normal bir objektifte bu mümkün
                 değildir. Makro objektiflerin uzun ve pahalı olmasının sebebi budur.</p>` },

        { baslik: 'Büyütmeyi kontrol et',
          html: `<p>a = 200, b = 5,13 ⟹ <code>m = 0,0256</code>. Yani 1,7 m boyundaki bir
                 insan sensöre <code>170 × 0,0256 = <strong>4,4 cm</strong></code> olarak
                 düşer. Tam boy fotoğraf için sensörün en az bu kadar büyük olması gerekir —
                 ya da daha uzaktan çekilmelidir.</p>` }
      ]
    }
  ]
},

/* -------------------------------------------------------- Simülasyon */
sim: F.simler['mercek-goruntu'],

/* ------------------------------------------------------- Püf noktası */
puf: {
  html: `
    <p><strong>1 · Ayna ile aynı denklem.</strong> Yeni formül ezberleme;
    <code>1/f = 1/a + 1/b</code> ikisinde de geçerli. Değişen tek şey görüntünün
    <em>hangi tarafta</em> çizildiği.</p>

    <p><strong>2 · İşareti f&rsquo;ye yükle.</strong> Kalın kenarlı mercekte f negatif.
    Böylece tek denklemle her durumu çözersin.</p>

    <p><strong>3 · b&rsquo;nin işareti her şeyi söyler.</strong>
    <code>b &gt; 0</code> ⟹ gerçek + ters + perdeye düşer.
    <code>b &lt; 0</code> ⟹ sanal + düz + düşmez.</p>

    <p><strong>4 · Sınırları ezberle:</strong> “eşit boyda görüntü” ⟹ a = 2f.
    “görüntü oluşmadı” ⟹ a = f. “perdede görüntü var” ⟹ gerçek ⟹ ters ⟹
    <strong>ince kenarlı</strong> mercek.</p>

    <p><strong>5 · Kalın kenarlı mercek kısayolu.</strong> Görür görmez cevabı biliyorsun:
    <strong>sanal · düz · küçük</strong>. “Kalın kenarlı mercekte gerçek görüntü” diyen şık
    her zaman yanlıştır.</p>

    <p><strong>6 · Büyütme verilmişse iki durumu da dene.</strong> “3 kat büyük” ⟹
    <code>b = 3a</code> (gerçek) veya <code>b = −3a</code> (sanal). Her ikisi de bir çözüm
    verir; soru ters/düz demiyorsa ikisi de geçerlidir.</p>

    <p><strong>7 · Optik aletleri konumlarıyla hatırla:</strong>
    fotoğraf makinesi <em>2F dışı</em>, projeksiyon <em>F–2F arası</em>, büyüteç
    <em>F içi</em>. Bu üçlü, beş durumun üç kullanışlı olanıdır.</p>

    <p><strong>8 · Projeksiyon görüntüsü ters olduğu için slayt baş aşağı konur.</strong>
    Bu, sorularda “neden ters koyulur?” diye sorulur; cevabı gerçek görüntünün daima ters
    olmasıdır.</p>

    <p><strong>9 · Gözde b sabit, f değişir.</strong> Fotoğraf makinesinde ise f sabit,
    b değişir. Bu ayrım karşılaştırma sorularının tamamıdır.</p>`
},

/* ----------------------------------------------------- Zorlayıcı sorular */
osym: [
  {
    baslik: 'Perde ile mercek arası',
    kaynak: 'Çok adımlı',
    govde: `
      <p>Bir cisim, odak uzaklığı <strong>12 cm</strong> olan ince kenarlı bir mercekten
      <strong>36 cm</strong> uzağa konuluyor. Görüntü bir perdede net olarak elde ediliyor.</p>
      <p>Buna göre:</p>
      <ol style="margin-left:.2em">
        <li>Perde mercekten kaç cm uzakta olmalıdır?</li>
        <li>Görüntünün boyu cismin boyunun kaç katıdır?</li>
        <li>Cisimle perde arası kaç cm&rsquo;dir?</li>
      </ol>`,
    gorsel: `
      <svg viewBox="0 0 520 200" xmlns="http://www.w3.org/2000/svg" role="img"
           aria-label="İnce kenarlı mercekte cisim, mercek ve perdenin konumları">
        <rect width="520" height="200" fill="#0E1726"/>
        <path d="M20 100 H500" stroke="#4A5F86" stroke-width="1.4" stroke-dasharray="7 5"/>
        <path d="M260 40 Q 286 100 260 160 Q 234 100 260 40 Z"
              fill="rgba(127,212,230,.22)" stroke="#7FD4E6" stroke-width="2.4"/>
        <text x="260" y="32" fill="#7FD4E6" font-size="11" font-family="system-ui" text-anchor="middle">f = 12 cm</text>
        <circle cx="308" cy="100" r="3.5" fill="#FFB020"/>
        <text x="308" y="90" fill="#FFB020" font-size="11" font-family="system-ui" text-anchor="middle">F</text>
        <circle cx="356" cy="100" r="3.5" fill="#FF6B6B"/>
        <text x="356" y="90" fill="#FF6B6B" font-size="11" font-family="system-ui" text-anchor="middle">2F</text>
        <path d="M116 100 V64" stroke="#35C08A" stroke-width="3.4"/>
        <path d="M116 60 l-5 11 h10 Z" fill="#35C08A"/>
        <text x="116" y="122" fill="#35C08A" font-size="11" font-family="system-ui" text-anchor="middle">cisim · a = 36</text>
        <rect x="402" y="30" width="5" height="140" fill="#5A5245"/>
        <path d="M404 100 V136" stroke="#FF6B6B" stroke-width="3.4"/>
        <path d="M404 140 l-5 -11 h10 Z" fill="#FF6B6B"/>
        <text x="404" y="24" fill="#FF6B6B" font-size="11" font-family="system-ui" text-anchor="middle">perde</text>
        <path d="M116 182 H404" stroke="#A78BFA" stroke-width="1.2"/>
        <text x="260" y="194" fill="#A78BFA" font-size="11" font-family="system-ui" text-anchor="middle">cisim–perde arası = ?</text>
      </svg>`,
    secenekler: [
      '18 cm · 0,5 kat · 54 cm',
      '18 cm · 2 kat · 54 cm',
      '24 cm · 0,5 kat · 60 cm',
      '18 cm · 0,5 kat · 18 cm',
      '36 cm · 1 kat · 72 cm'
    ],
    dogru: 0,
    cozum: `
      <p><strong>1. Görüntü uzaklığı:</strong></p>
      <div class="formul" style="max-width:380px;margin:10px 0">
        <div class="fm">b = a·f/(a−f) = 36·12/(36−12) = 432/24 = <strong>18 cm</strong></div>
      </div>
      <p>b &gt; 0 ⟹ görüntü merceğin <strong>öte tarafında</strong>, gerçek ve ters ✓
      (perdede elde edilmesi bunu doğruluyor)</p>

      <p><strong>2. Büyütme:</strong></p>
      <div class="formul" style="max-width:300px;margin:10px 0">
        <div class="fm">|b/a| = 18/36 = <strong>0,5 kat</strong></div>
      </div>
      <p>Kontrol: a = 36, 2f = 24 ⟹ cisim 2F&rsquo;nin <strong>dışında</strong> ⟹ görüntü
      küçük olmalı ✓</p>

      <p><strong>3. Cisim–perde arası:</strong> Mercekte görüntü cismin
      <strong>öte tarafında</strong> olduğu için uzaklıklar <strong>toplanır</strong>:</p>
      <div class="formul" style="max-width:340px;margin:10px 0;border-top-color:var(--accent)">
        <div class="fm" style="color:var(--accent)">a + b = 36 + 18 = <strong>54 cm</strong></div>
      </div>

      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>D şıkkı</strong> bu sorunun asıl tuzağı: a ile b&rsquo;yi
        <em>çıkarıyor</em> (36 − 18 = 18). Bu, <strong>aynada</strong> doğru olurdu — orada
        görüntü cismin tarafındadır. Mercekte ışık geçtiği için toplanır.
        <br><strong>B şıkkı</strong> büyütmeyi ters alıyor (a/b yerine b/a).
        <br><strong>Genel kural:</strong> İnce kenarlı mercekte gerçek görüntü için
        <code>a + b</code> en az <strong>4f</strong>&rsquo;dir. Burada 4f = 48 ≤ 54 ✓
        Bu eşitsizlik hızlı bir sağlama aracıdır: cisim ile perde arası 4f&rsquo;den küçükse
        o mercekle net görüntü <em>hiç</em> elde edilemez.
        <br><strong>Simülasyonda:</strong> f = 12, a = 36 yap; okumalarda b = 18 ve
        büyütme 0,5 göreceksin.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: A</strong></p>`
  },
  {
    baslik: 'Hangi alet hangi konumda?',
    kaynak: 'Kavram',
    govde: `
      <p>İnce kenarlı bir mercek ve bir cisim kullanılarak farklı düzenekler kuruluyor.
      Aşağıdaki eşleştirmeleri inceleyiniz:</p>
      <ol style="margin-left:.2em">
        <li>Cisim 2F&rsquo;nin dışında ⟹ fotoğraf makinesi düzeneği</li>
        <li>Cisim F ile 2F arasında ⟹ projeksiyon düzeneği</li>
        <li>Cisim F ile mercek arasında ⟹ büyüteç düzeneği</li>
        <li>Cisim tam F&rsquo;de ⟹ perdede çok büyük bir görüntü oluşur</li>
      </ol>
      <p>Hangileri <strong>doğrudur</strong>?</p>`,
    secenekler: [
      'I, II ve III',
      'I ve III',
      'II, III ve IV',
      'Yalnız III',
      'Hepsi'
    ],
    dogru: 0,
    cozum: `
      <ol>
        <li><strong>Doğru.</strong> a &gt; 2f ⟹ gerçek, ters, <strong>küçük</strong>.
        Büyük bir manzarayı küçük sensöre sığdırmak tam olarak budur.</li>
        <li><strong>Doğru.</strong> f &lt; a &lt; 2f ⟹ gerçek, ters, <strong>büyük</strong>.
        Küçük bir slaydı büyük perdeye yansıtmak budur.</li>
        <li><strong>Doğru.</strong> a &lt; f ⟹ sanal, düz, büyük. Büyüteçle bakarken
        görüntünün <strong>düz</strong> olması şarttır — ters olsaydı kullanılamazdı.</li>
        <li><strong>Yanlış.</strong> a = f ⟹ çıkan ışınlar <strong>paraleldir</strong>,
        hiçbir yerde kesişmez ⟹ <strong>görüntü oluşmaz</strong>. Perdeye hiçbir şey
        düşmez; perdeyi ne kadar uzağa koyarsan koy bulanık bir aydınlık görürsün.</li>
      </ol>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>IV. yargı</strong> “a, f&rsquo;ye yaklaşınca görüntü
        büyüyor, o hâlde tam f&rsquo;de en büyük olur” diye düşünmekten geliyor. Ama limit
        <em>ulaşılmaz</em>: görüntü hem sonsuz büyür hem sonsuz uzaklaşır, yani
        <strong>hiçbir yerde oluşmaz</strong>.
        <br><strong>Tersten düşün:</strong> a = f durumu <em>paralel ışın üretmek</em> için
        kullanılır. El feneri, projektör ve far tam olarak böyle çalışır: ampul odağa konur,
        çıkan ışık demeti paralel olur ve uzağa gider.
        <br><strong>Simülasyonda:</strong> “Otomatik tur”u çalıştır; cisim F&rsquo;den
        geçerken görüntünün önce sonsuza kaçıp sonra <em>öbür taraftan</em> sanal olarak
        geri geldiğini izle. Bu geçiş, konunun en öğretici anıdır.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: A</strong></p>`
  }
],

/* --------------------------------------------- Bağlam temelli sorular */
baglam: [
  {
    baslik: 'Projeksiyon cihazını ayarlamak',
    govde: `
      <p>Sınıftaki projeksiyon cihazının merceğinin odak uzaklığı <strong>12 cm</strong>.
      Cihazın içindeki panelin (slayt) boyu <strong>4 cm</strong>.</p>
      <p>Öğretmen, perdede <strong>200 cm</strong> boyunda bir görüntü istiyor.</p>
      <p><strong>Perde cihazdan ne kadar uzağa konulmalı? Panel mercekten kaç cm uzakta
      olmalı? Görüntü neden ters oluyor ve bu nasıl düzeltiliyor?</strong></p>`,
    gorsel: `
      <svg viewBox="0 0 520 200" xmlns="http://www.w3.org/2000/svg" role="img"
           aria-label="Projeksiyon cihazında küçük panelin büyük ve ters görüntüsü">
        <rect width="520" height="200" fill="#0E1726"/>
        <path d="M20 96 H500" stroke="#4A5F86" stroke-width="1.4" stroke-dasharray="7 5"/>
        <rect x="40" y="52" width="70" height="88" rx="6" fill="#2E3D57" stroke="#4A5F86" stroke-width="2"/>
        <path d="M86 96 V74" stroke="#35C08A" stroke-width="3"/>
        <path d="M86 70 l-4 9 h8 Z" fill="#35C08A"/>
        <text x="75" y="156" fill="#35C08A" font-size="11" font-family="system-ui" text-anchor="middle">panel 4 cm</text>
        <path d="M150 44 Q 176 96 150 148 Q 124 96 150 44 Z"
              fill="rgba(127,212,230,.22)" stroke="#7FD4E6" stroke-width="2.4"/>
        <text x="150" y="36" fill="#7FD4E6" font-size="11" font-family="system-ui" text-anchor="middle">f = 12 cm</text>
        <path d="M86 74 L150 74 L440 168" stroke="#FFB020" stroke-width="1.8"/>
        <path d="M86 74 L150 96 L440 168" stroke="#A78BFA" stroke-width="1.6"/>
        <rect x="436" y="16" width="6" height="170" fill="#5A5245"/>
        <path d="M439 96 V166" stroke="#FF6B6B" stroke-width="3.4"/>
        <path d="M439 170 l-5 -11 h10 Z" fill="#FF6B6B"/>
        <text x="470" y="100" fill="#FF6B6B" font-size="11" font-family="system-ui">200 cm · TERS</text>
      </svg>`,
    adimlar: [
      { bas: 'Büyütmeyi bul',
        metin: 'İstenen görüntü 200 cm, panel 4 cm ⟹ <code>büyütme = 200/4 = <strong>50</strong></code>' },
      { bas: 'b ile a arasındaki bağı yaz',
        metin: '<code>|b/a| = 50</code> ve görüntü perdede olacağına göre <strong>gerçek</strong> ⟹ <code>b = 50a</code>' },
      { bas: 'Mercek denklemine koy',
        metin: '<code>1/12 = 1/a + 1/(50a) = (50 + 1)/(50a) = 51/(50a)</code>' },
      { bas: 'a’yı çek',
        metin: '<code>50a = 51 × 12 = 612 ⟹ a = <strong>12,24 cm</strong></code>. Panel, odaktan yalnızca <strong>2,4 mm</strong> daha uzakta!' },
      { bas: 'b’yi bul',
        metin: '<code>b = 50 × 12,24 = <strong>612 cm = 6,12 m</strong></code>. Perde cihazdan 6,12 m uzakta olmalı.' },
      { bas: 'Neden bu kadar hassas?',
        metin: 'Panel odağa çok yakın olduğu için <code>a − f</code> minicik bir sayıdır. Birkaç milimetrelik kayma görüntüyü metrelerce oynatır. Projeksiyon cihazlarındaki netleme halkasının çok yavaş dönmesinin sebebi budur.' },
      { bas: 'Görüntü neden ters?',
        metin: '<code>b &gt; 0</code> ⟹ görüntü <strong>gerçek</strong>, gerçek görüntü ise <strong>daima terstir</strong>. Bu optik bir zorunluluktur, kusur değil.' },
      { bas: 'Nasıl düzeltiliyor?',
        metin: 'Panel cihazın içine <strong>baş aşağı</strong> yerleştirilir; iki ters birbirini götürür. Modern cihazlarda bu, görüntüyü elektronik olarak çevirerek yapılır — “tavana montaj” ayarı tam olarak bu çevirmeyi açıp kapatır.' }
    ],
    secenekler: [
      'a = 12,24 cm, b = 6,12 m; görüntü gerçek olduğu için ters oluşur ve panel baş aşağı yerleştirilerek düzeltilir',
      'a = 24 cm, b = 12 m; görüntü düz oluşur',
      'a = 600 cm, b = 12,24 cm',
      'a = 12 cm, b sonsuz; perdede görüntü oluşmaz',
      'Bu büyütme tek mercekle elde edilemez'
    ],
    dogru: 0,
    cozum: `
      <div class="formul" style="max-width:380px;margin:10px 0">
        <div class="fm">1/12 = 1/a + 1/(50a) ⟹ a = 12·51/50 = 12,24 cm</div>
      </div>
      <div class="formul" style="max-width:320px;margin:10px 0;border-top-color:var(--accent)">
        <div class="fm" style="color:var(--accent)">b = 50a = 612 cm</div>
      </div>
      <p>Genel bağıntı: <code>a = f·(m+1)/m</code> ve <code>b = f·(m+1)</code>. Büyütme
      büyüdükçe a, f&rsquo;ye yaklaşır ve b neredeyse <code>m·f</code> olur.</p>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>C şıkkı</strong> a ile b&rsquo;yi yer değiştirmiş —
        bu aslında <em>tersinirlik</em> nedeniyle geçerli bir düzenektir ama o zaman görüntü
        büyük değil <strong>küçük</strong> olur (fotoğraf makinesi durumu).
        <br><strong>D şıkkı</strong> a = f durumunu seçiyor; o zaman gerçekten görüntü
        oluşmaz — ama biz 12,24 cm bulduk, tam f değil.
        <br><strong>Sınıfta dene:</strong> Projeksiyon cihazını perdeye yaklaştırıp
        uzaklaştırırken her seferinde yeniden netlemek zorunda kalırsın. Sebebi:
        <code>b</code> değişince <code>a</code>&rsquo;nın da değişmesi gerekir. Cihazın
        netleme halkası tam olarak <code>a</code>&rsquo;yı ayarlar.
        <br><strong>Sağlama:</strong> <code>a + b = 12,24 + 612 = 624,24 cm</code>.
        4f = 48 cm&rsquo;den çok büyük ✓ (gerçek görüntü koşulu)</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: A</strong></p>`
  },
  {
    baslik: 'Gözün uyumu ve yaşla değişimi',
    govde: `
      <p>İnsan gözünde retina sabittir: mercek ile retina arası yaklaşık
      <strong>2,2 cm</strong>&rsquo;dir ve değişmez. Yani <code>b</code>
      <strong>sabittir</strong>.</p>
      <p>Göz, farklı uzaklıklara bakarken merceğin <strong>şeklini</strong> değiştirerek
      <code>f</code>&rsquo;yi ayarlar. Buna <strong>uyum</strong> denir.</p>
      <p><strong>Çok uzağa ve 25 cm yakına bakarken gereken odak uzaklıklarını hesapla.
      Yaşla birlikte neden yakını göremez oluruz?</strong></p>`,
    gorsel: `
      <svg viewBox="0 0 520 200" xmlns="http://www.w3.org/2000/svg" role="img"
           aria-label="Gözün uzağa ve yakına bakarken mercek şeklini değiştirmesi">
        <rect width="520" height="200" fill="#17223A"/>
        <line x1="260" y1="14" x2="260" y2="186" stroke="#2E3C57" stroke-width="1.4"/>
        <text x="128" y="28" fill="#8FB6EC" font-size="12" font-family="system-ui" text-anchor="middle" font-weight="700">UZAĞA · gevşek mercek</text>
        <ellipse cx="150" cy="104" rx="52" ry="44" fill="rgba(232,201,168,.18)" stroke="#E8C9A8" stroke-width="2"/>
        <path d="M112 84 Q 126 104 112 124 Q 98 104 112 84 Z" fill="rgba(127,212,230,.35)" stroke="#7FD4E6" stroke-width="2"/>
        <path d="M22 84 L104 100 M22 104 L104 104 M22 124 L104 108" stroke="#FFB020" stroke-width="1.6"/>
        <path d="M120 100 L198 104 M120 104 L198 104 M120 108 L198 104" stroke="#FFB020" stroke-width="1.6"/>
        <circle cx="198" cy="104" r="4" fill="#35C08A"/>
        <text x="128" y="180" fill="#8FB6EC" font-size="11" font-family="system-ui" text-anchor="middle">f ≈ 2,20 cm · ince</text>
        <text x="392" y="28" fill="#35C08A" font-size="12" font-family="system-ui" text-anchor="middle" font-weight="700">YAKINA · şişkin mercek</text>
        <ellipse cx="410" cy="104" rx="52" ry="44" fill="rgba(232,201,168,.18)" stroke="#E8C9A8" stroke-width="2"/>
        <path d="M372 80 Q 396 104 372 128 Q 350 104 372 80 Z" fill="rgba(127,212,230,.45)" stroke="#7FD4E6" stroke-width="2"/>
        <path d="M290 62 L360 96 M290 104 L360 104 M290 146 L360 112" stroke="#35C08A" stroke-width="1.6"/>
        <path d="M384 96 L458 104 M384 104 L458 104 M384 112 L458 104" stroke="#35C08A" stroke-width="1.6"/>
        <circle cx="458" cy="104" r="4" fill="#35C08A"/>
        <text x="392" y="180" fill="#35C08A" font-size="11" font-family="system-ui" text-anchor="middle">f ≈ 2,02 cm · kalın</text>
      </svg>`,
    adimlar: [
      { bas: 'Uzağa bakarken',
        metin: '<code>a = ∞ ⟹ 1/a = 0 ⟹ 1/f = 1/b</code> ⟹ <code>f = b = <strong>2,20 cm</strong></code>. Göz merceği en <strong>gevşek</strong>, en ince hâlindedir — bu, gözün dinlenme konumudur.' },
      { bas: 'Yakına bakarken',
        metin: '<code>a = 25 cm, b = 2,2 cm</code>: <code>1/f = 1/25 + 1/2,2 = 0,04 + 0,4545 = 0,4945</code> ⟹ <code>f = <strong>2,022 cm</strong></code>' },
      { bas: 'Ne kadar değişti?',
        metin: 'Odak uzaklığı 2,20&rsquo;den 2,02 cm&rsquo;ye indi — yalnızca <strong>1,8 mm</strong>. Ama dioptri olarak <code>45,5 D</code>&rsquo;den <code>49,5 D</code>&rsquo;ye çıktı: <strong>4 dioptrilik</strong> bir güç artışı.' },
      { bas: 'Bu gücü ne sağlıyor?',
        metin: 'Kirpiksi kas mercek etrafındaki bağları gevşetir; mercek kendi esnekliğiyle <strong>şişer</strong>, yüzeylerin R&rsquo;si küçülür ve mercek yapıcı denklemi gereği f küçülür (3.9).' },
      { bas: 'Yaşla ne oluyor?',
        metin: 'Mercek yaşla birlikte <strong>sertleşir</strong> ve şişemez hâle gelir. Uyum gücü 10 yaşında ~14 D iken 50 yaşında ~2 D&rsquo;ye düşer. Buna <strong>presbiyopi</strong> (yaşa bağlı yakını görememe) denir.' },
      { bas: 'Nasıl düzeltilir?',
        metin: 'Eksik kalan gücü <strong>dışarıdan</strong> eklemek gerekir: <strong>ince kenarlı</strong> (+ numaralı) okuma gözlüğü. Eksik güç 2 D ise +2,00 numara yazılır. (3.9&rsquo;daki dioptri toplamı: D_toplam = D_göz + D_gözlük)' },
      { bas: 'Neden 25 cm?',
        metin: '25 cm, sağlıklı bir gözün zorlanmadan netleyebildiği <strong>en yakın uzaklıktır</strong> ve “net görme uzaklığı” diye adlandırılır. Kitabı bu mesafede tutmamız tesadüf değil.' }
    ],
    secenekler: [
      'Uzağa bakarken f = 2,20 cm, 25 cm’ye bakarken f = 2,02 cm; yaşla mercek sertleşip şişemediği için uyum gücü azalır ve + numaralı okuma gözlüğü gerekir',
      'Uzağa bakarken f = 2,02 cm, yakına bakarken f = 2,20 cm',
      'Göz merceğin şeklini değil, retinanın yerini değiştirir',
      'Yaşla birlikte retina öne kayar, bu yüzden − numaralı gözlük gerekir',
      'Gözde f sabittir, a değişir'
    ],
    dogru: 0,
    cozum: `
      <div class="formul" style="max-width:380px;margin:10px 0">
        <div class="fm">a = ∞ ⟹ f = b = 2,20 cm &nbsp;·&nbsp; a = 25 ⟹ f = 2,022 cm</div>
      </div>
      <div class="formul" style="max-width:340px;margin:10px 0;border-top-color:var(--accent)">
        <div class="fm" style="color:var(--accent)">45,5 D → 49,5 D &nbsp;(4 D uyum)</div>
      </div>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>B şıkkı</strong> ters: yakına bakarken mercek
        <strong>güçlenmeli</strong>, yani f <em>küçülmeli</em>. a küçüldükçe f de küçülür.
        <br><strong>C ve E şıkları</strong> mekanizmayı karıştırıyor: gözde b (retina
        uzaklığı) sabittir, değişen <strong>f</strong>&rsquo;dir. Fotoğraf makinesinde ise
        tam tersi — f sabit, b değişir. Bu ayrım, bu konunun en çok sorulan
        karşılaştırmasıdır.
        <br><strong>Kendin gözlemle:</strong> Parmağını burnuna yaklaştırıp odaklanmaya
        çalış. Bir noktadan sonra netleyemezsin — orası senin “en yakın net görme
        noktan”dır. Yaş ilerledikçe bu nokta uzaklaşır; 45 yaş civarında kitap kol
        mesafesine gitmeye başlar.
        <br><strong>Ünite bağlantısı:</strong> Bu soru 3.9&rsquo;daki yapıcı denklemi
        (merceğin şekli f&rsquo;yi belirler), 3.10&rsquo;daki mercek denklemini ve dioptri
        toplamını bir arada kullanıyor.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: A</strong></p>`
  }
]

});
})();
