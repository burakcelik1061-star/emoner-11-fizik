(function () {
"use strict";
const F = window.F11;

/* ==========================================================================
   topics/u3-gorunur-derinlik.js
   Konu 3.5 · Görünür derinlik  (MEB 11, s.354-360)
   ========================================================================== */

F.konuKaydet('u3-gorunur-derinlik', {

ozet: `Havuzun dibi olduğundan <strong>sığ</strong>, suya batırılan çubuk
<strong>kırık</strong>, suyun içindeki balık olduğundan <strong>yukarıda</strong> görünür.
Üçünün de tek bir sebebi var: kırılan ışınlar göze <strong>farklı bir doğrultudan</strong>
geliyor, beynimiz ise ışığın düz geldiğini varsayıyor.`,

/* ------------------------------------------------------------- Kavram */
kavram: `
<h3>Neden sığ görünüyor?</h3>
<p>Havuzun dibindeki bir taştan çıkan ışınlar su yüzeyinde kırılır ve
<strong>normalden uzaklaşır</strong> (sudan havaya çıkıyorlar). Göze artık daha
<em>yatık</em> bir doğrultudan gelirler.</p>
<p>Beynimiz bu ışınları <strong>geriye doğru düz</strong> uzatır. Uzantıların kesiştiği
nokta gerçek taştan <strong>daha yukarıdadır</strong>. Gördüğümüz şey bir
<strong>sanal görüntüdür</strong>.</p>

<div class="formul" style="max-width:320px;margin:16px 0;border-top-color:var(--accent)">
  <div class="fm" style="color:var(--accent)">h′ / h = n<sub>göz</sub> / n<sub>cisim</sub></div>
  <div class="fm-ad">h′ görünür, h gerçek derinlik</div>
</div>

<table class="degisken-tablo">
  <thead><tr><th>Durum</th><th>Bağıntı</th><th>Sonuç</th></tr></thead>
  <tbody>
    <tr><td>Cisim <strong>suda</strong>, göz havada</td><td>h′ = h / n</td><td><strong>sığ</strong> görünür</td></tr>
    <tr><td>Cisim <strong>havada</strong>, göz suda</td><td>h′ = h · n</td><td><strong>yüksek</strong> görünür</td></tr>
  </tbody>
</table>

<div class="formul" style="max-width:300px;margin:16px 0">
  <div class="fm">Kalkma = h − h′ = h·(1 − 1/n)</div>
  <div class="fm-ad">cismin “yükselmiş” göründüğü miktar</div>
</div>
<p>Su için (n = 1,33): kalkma <code>h·0,248</code>, yani derinliğin yaklaşık
<strong>dörtte biri</strong>. 2 m derinlikteki bir taş 1,50 m&rsquo;de görünür.</p>

<div class="kutu dikkat" style="margin:16px 0">
  <div class="kutu-bas"><span class="ikon">⚠</span><span>Bu bağıntı DİK bakış içindir</span></div>
  <p style="margin:0"><code>h′ = h/n</code> yalnızca cisme <strong>tam yukarıdan</strong>
  (eksene yakın açılarla) bakıldığında geçerlidir. Eğik bakıldığında tam bağıntı:</p>
  <div class="formul" style="max-width:280px;margin:10px 0">
    <div class="fm">h′ = h · tan θ₁ / tan θ₂</div>
    <div class="fm-ad">θ₁ cismin ortamındaki, θ₂ gözün ortamındaki açı</div>
  </div>
  <p style="margin:0">Simülasyonda bakış açısını büyüt: suda 100 cm derinlikteki bir cisim dik
  bakışta 75,2 cm&rsquo;de, 30° eğik bakışta 70,3 cm&rsquo;de, 45°&rsquo;de 62,8 cm&rsquo;de,
  60°&rsquo;de 49,5 cm&rsquo;de görünür. Havuz kenarından bakınca dibin “kalkmasının”
  sebebi budur.</p>
  <p style="margin:8px 0 0">Sınav sorularında daima <strong>dik bakış</strong> varsayılır;
  yani <code>h′ = h/n</code> kullanılır.</p>
</div>

<h3 style="margin-top:22px">Görünür derinlik neye bağlıdır?</h3>
<p>Kitap (s.357) üç değişken sayar:</p>
<table class="degisken-tablo">
  <thead><tr><th>Değişken</th><th>Etkisi</th></tr></thead>
  <tbody>
    <tr><td>Cismin ayırıcı yüzeye uzaklığı (h)</td><td>h büyüdükçe h′ de <strong>doğru orantılı</strong> büyür</td></tr>
    <tr><td>Ortamların kırıcılık indisi farkı</td><td>fark büyüdükçe görüntü yüzeye daha çok yaklaşır (ya da uzaklaşır)</td></tr>
    <tr><td>Işığın rengi</td><td>n renge bağlıdır: suda 1 m derindeki cisim kırmızı ışıkla 75,09 cm&rsquo;de, mor ışıkla 74,46 cm&rsquo;de görünür</td></tr>
    <tr><td>Gözlemcinin yüzeye uzaklığı</td><td><strong>bağlı değildir</strong> (yalnızca bakış doğrultusu önemlidir)</td></tr>
  </tbody>
</table>

<h3 style="margin-top:22px">Bardaktaki para (6. Etkinlik)</h3>
<p>Porselen bardağın dibindeki parayı, bardağın kenarı görüşü kapatacak kadar
uzaklaştırıp bakarsın: para <strong>görünmez</strong>. Bardağa yavaş yavaş su eklersin; bir
yükseklikte para <strong>birden görünür</strong>. Paradan çıkan ışın yüzeyde normalden
uzaklaşarak kırılır, kenarın üstünden aşıp göze ulaşır. Para da gerçek yerinden
<strong>yukarıda</strong> görünür.</p>
<p>Simülasyonun 4. düzeneği bu deneyi tam Snell hesabıyla yapar. 8 cm genişliğinde, 10 cm
yüksekliğindeki bardakta para su ile <strong>5,49 cm</strong>&rsquo;de, sıvı yağ (n = 1,47)
ile <strong>4,32 cm</strong>&rsquo;de görünmeye başlar. Kırıcılık indisi büyük olan sıvı parayı
<strong>daha az sıvıyla</strong> gösterir. Bu eşik gözün bardaktan uzaklığına da bağlı
değildir.</p>

<h3 style="margin-top:22px">Suya batırılan çubuk neden kırık görünür?</h3>
<p>Çubuğun <strong>sudaki</strong> kısmından gelen ışınlar kırılır, <strong>havadaki</strong>
kısmından gelenler kırılmaz. Suyun içindeki bölüm olduğundan yukarıda görünür, dışarıdaki
bölüm yerinde kalır. İki parça arasında bir <strong>kırık</strong> oluşur.</p>
<p style="color:var(--text-2)">Çubuk gerçekte bükülmüyor; yalnızca iki parçasının
<em>görüntüsü</em> farklı yerlerde oluşuyor.</p>

<h3 style="margin-top:22px">Ek bilgi: paralel yüzlü levhada yanal kayma</h3>
<p style="color:var(--text-2)">Kitabın bu bölümünde yer almaz; kitaptaki Düzenek III&rsquo;te
(paranın üstüne cam konması) ve 3.7 prizmalar konusunda işe yarar.</p>
<p>Bir cam levhaya eğik giren ışın, levhanın içinde normale yaklaşır, çıkarken normalden
uzaklaşır. İki yüzey <strong>paralel</strong> olduğu için çıkan ışın gelen ışına
<strong>paraleldir</strong> — yalnızca <strong>yana kaymıştır</strong>.</p>
<div class="formul" style="max-width:320px;margin:14px 0;border-top-color:var(--accent)">
  <div class="fm" style="color:var(--accent)">d = t · sin(θ₁ − θ₂) / cos θ₂</div>
</div>
<ul>
  <li>θ₁ = 0 ⟹ d = 0 (dik girişte kayma yok)</li>
  <li>t büyüdükçe d <strong>doğru orantılı</strong> büyür</li>
  <li>n büyüdükçe θ₂ küçülür, d büyür</li>
</ul>
<p style="color:var(--text-2)">Kalın bir cam masa üstünden bir yazıya eğik bakınca yazının
biraz kaymış görünmesi bu etkidir.</p>`,

/* ---------------------------------------------------------- Formüller */
formuller: {
  liste: [
    { fm: 'h′ / h = n<sub>göz</sub> / n<sub>cisim</sub>', aciklama: 'Genel bağıntı' },
    { fm: 'h′ = h / n',              aciklama: 'Cisim suda, göz havada' },
    { fm: 'h′ = h · n',              aciklama: 'Cisim havada, göz suda' },
    { fm: 'Kalkma = h·(1 − 1/n)',    aciklama: 'Görünür yükselme miktarı' },
    { fm: 'h′ = h·tanθ₁/tanθ₂',      aciklama: 'Eğik bakışta tam bağıntı' },
    { fm: 'd = t·sin(θ₁−θ₂)/cosθ₂',  aciklama: 'Paralel yüzlü levhada yanal kayma' }
  ],
  degiskenler: [
    { sembol: 'h',  ad: 'Gerçek derinlik',  birim: 'cm' },
    { sembol: 'h′', ad: 'Görünür derinlik', birim: 'cm' },
    { sembol: 'n',  ad: 'Kırılma indisi',   birim: '—' },
    { sembol: 't',  ad: 'Levha kalınlığı',  birim: 'cm' },
    { sembol: 'd',  ad: 'Yanal kayma',      birim: 'cm' }
  ]
},

/* ------------------------------------------------------------ Türetim */
turetim: {
  yollar: [
    {
      ad: 'Görünür derinlik bağıntısı',
      adimlar: [
        { baslik: 'İki ışın gönder',
          html: `<p>Derinliği h olan bir cisimden iki ışın çıksın: biri <strong>düşey</strong>
                 (kırılmadan geçer), biri küçük bir θ₁ açısıyla.</p>` },

        { baslik: 'Eğik ışın kırılır',
          html: `<p>Eğik ışın yüzeye <code>x = h·tan θ₁</code> uzaklıkta çarpar ve
                 <code>θ₂</code> açısıyla kırılır (<code>n₁sinθ₁ = n₂sinθ₂</code>).</p>` },

        { baslik: 'Geriye uzat',
          html: `<p>Gözlemci kırılan ışını düz sanır ve geriye uzatır. Bu uzantı, düşey
                 ışınla <code>h′</code> derinliğinde kesişir:</p>
                 <div class="formul" style="max-width:260px">
                   <div class="fm">x = h′ · tan θ₂</div>
                 </div>` },

        { baslik: 'İki ifadeyi eşitle',
          html: `<div class="formul" style="max-width:320px">
                   <div class="fm">h·tan θ₁ = h′·tan θ₂ ⟹ h′ = h·tanθ₁/tanθ₂</div>
                 </div>
                 <p>Bu <strong>tam</strong> sonuçtur — simülasyonun kullandığı bağıntı.</p>` },

        { baslik: 'Küçük açı yaklaşıklığı',
          html: `<p>Dik bakışta açılar küçüktür; küçük açılarda
                 <code>tan θ ≈ sin θ</code>:</p>
                 <div class="formul" style="max-width:300px">
                   <div class="fm">h′ ≈ h·sinθ₁/sinθ₂</div>
                 </div>
                 <p>Snell&rsquo;den <code>sinθ₁/sinθ₂ = n₂/n₁</code>:</p>
                 <div class="formul" style="max-width:300px;border-top-color:var(--accent)">
                   <div class="fm" style="color:var(--accent)">h′ = h · n₂/n₁ = h · n<sub>göz</sub>/n<sub>cisim</sub></div>
                 </div>` },

        { baslik: 'Suya uygula',
          html: `<p>Cisim suda (n₁ = 1,33), göz havada (n₂ = 1,00):</p>
                 <div class="formul" style="max-width:240px">
                   <div class="fm">h′ = h/1,33 = 0,752·h</div>
                 </div>
                 <p>Derinliğin yaklaşık <strong>dörtte biri kadar sığ</strong> görünür.</p>` }
      ]
    },
    {
      ad: 'Yanal kayma',
      adimlar: [
        { baslik: 'Levhanın içindeki yol',
          html: `<p>Kalınlığı t olan levhaya θ₁ ile giren ışın içeride θ₂ ile ilerler.
                 Levhanın içinde katettiği yol:</p>
                 <div class="formul" style="max-width:220px">
                   <div class="fm">AB = t / cos θ₂</div>
                 </div>` },

        { baslik: 'Sapmasaydı nerede olurdu?',
          html: `<p>Işın hiç kırılmasaydı aynı doğrultuda devam ederdi. Gerçek yol ile bu
                 doğrultu arasındaki açı <code>θ₁ − θ₂</code>&rsquo;dir.</p>` },

        { baslik: 'Dik uzaklığı al',
          html: `<p>Yanal kayma, gerçek yolun ucunun bu doğrultuya olan
                 <strong>dik</strong> uzaklığıdır:</p>
                 <div class="formul" style="max-width:300px">
                   <div class="fm">d = AB · sin(θ₁ − θ₂)</div>
                 </div>` },

        { baslik: 'Birleştir',
          html: `<div class="formul" style="max-width:300px;border-top-color:var(--accent)">
                   <div class="fm" style="color:var(--accent)">d = t · sin(θ₁ − θ₂) / cos θ₂</div>
                 </div>
                 <p>Kontrol: θ₁ = 0 ⟹ θ₂ = 0 ⟹ <code>d = 0</code> ✓</p>` },

        { baslik: 'Sayısal',
          html: `<p>t = 10 cm, n = 1,50, θ₁ = 45°:</p>
                 <p><code>sin θ₂ = sin45°/1,5 = 0,4714 ⟹ θ₂ = 28,13°</code></p>
                 <div class="formul" style="max-width:380px">
                   <div class="fm">d = 10·sin(16,87°)/cos(28,13°) = 10·0,2902/0,8820 = <strong>3,29 cm</strong></div>
                 </div>` }
      ]
    },
    {
      ad: 'Çıkan ışın neden gelen ışına paralel?',
      adimlar: [
        { baslik: 'Üst yüzey',
          html: `<div class="formul" style="max-width:240px">
                   <div class="fm">1 · sin θ₁ = n · sin θ₂</div>
                 </div>` },

        { baslik: 'Alt yüzey',
          html: `<p>İki yüzey paralel olduğu için alt yüzeydeki gelme açısı da
                 <strong>θ₂</strong>&rsquo;dir (iç ters açılar):</p>
                 <div class="formul" style="max-width:240px">
                   <div class="fm">n · sin θ₂ = 1 · sin θ₃</div>
                 </div>` },

        { baslik: 'İkisini birleştir',
          html: `<div class="formul" style="max-width:300px;border-top-color:var(--accent)">
                   <div class="fm" style="color:var(--accent)">sin θ₁ = sin θ₃ ⟹ θ₃ = θ₁</div>
                 </div>
                 <p>Çıkan ışın gelen ışına <strong>paraleldir</strong>. Yönü aynı, yalnızca
                 konumu kaymıştır.</p>` },

        { baslik: 'Prizmayla farkı',
          html: `<p>Prizmada yüzeyler <strong>paralel değildir</strong>; bu yüzden orada
                 <code>θ₃ ≠ θ₁</code> olur ve ışın gerçekten <strong>sapar</strong>.
                 3.8&rsquo;de bunu göreceğiz.</p>` }
      ]
    }
  ]
},

/* -------------------------------------------------------- Simülasyon */
sim: F.simler['gorunur-derinlik'],

/* ------------------------------------------------------- Püf noktası */
puf: {
  html: `
    <p><strong>1 · Hangi ortamdayım, nereye bakıyorum?</strong> Formülü ezberlemek yerine
    <code>h′/h = n_göz/n_cisim</code> kalıbını kullan; paya <em>gözün</em> ortamı, paydaya
    <em>cismin</em> ortamı gelir. Karışıklık böyle biter.</p>

    <p><strong>2 · Sudaki cisim SIĞ, havadaki cisim YÜKSEK görünür.</strong> Yön
    hatırlanamıyorsa mantık şu: ışık <em>hangi ortamda hızlıysa</em> oraya doğru
    “toplanmış” görünür.</p>

    <p><strong>3 · Kalkma ≠ görünür derinlik.</strong> Soru “kaç cm yükselmiş görünür”
    diyorsa cevap <code>h − h′</code>, “hangi derinlikte görünür” diyorsa <code>h′</code>.
    En sık yapılan hata budur.</p>

    <p><strong>4 · Su için pratik sayı.</strong> <code>1/1,33 = 0,752</code> ⟹ görünür
    derinlik gerçeğin yaklaşık <strong>¾</strong>&rsquo;ü, kalkma ise <strong>¼</strong>&rsquo;ü.
    Kafadan tahmin için yeterli.</p>

    <p><strong>5 · İki sıvı üst üsteyse katmanları ayrı ayrı hesapla.</strong> Her katman
    için <code>h_i/n_i</code> bul, sonra topla. Tek bir ortalama indis kullanmak yanlış
    sonuç verir.</p>

    <p><strong>6 · Cismin boyu değişmez.</strong> Görünür derinlik cismin
    <em>konumunu</em> değiştirir, boyunu değil. “Su içindeki cisim büyük görünür” ifadesi
    düz yüzeyli su için yanlıştır; büyüme ancak yüzey eğriyse (bardak, damla) olur.</p>

    <p><strong>7 · Levhada kayma var, sapma yok.</strong> “Paralel yüzlü levhadan geçen
    ışın sapar” diyen şık yanlıştır — <strong>kayar</strong>, sapmaz.</p>

    <p><strong>8 · Dik geliş ⟹ kayma sıfır.</strong> Levha sorularında θ₁ = 0 verilmişse
    cevap doğrudan 0&rsquo;dır, formül yazmaya gerek yok.</p>`
},

/* ----------------------------------------------------- Zorlayıcı sorular */
osym: [
  {
    baslik: 'İki katmanlı sıvı',
    kaynak: 'Katman ayrımı',
    govde: `
      <p>Bir kapta üst üste iki sıvı bulunuyor:</p>
      <ul style="margin-left:.2em">
        <li>Üstte kalınlığı <strong>20 cm</strong>, indisi <strong>1,25</strong> olan sıvı</li>
        <li>Altta kalınlığı <strong>30 cm</strong>, indisi <strong>1,50</strong> olan sıvı</li>
      </ul>
      <p>Kabın dibindeki bir cisme <strong>tam yukarıdan</strong> bakılıyor.</p>
      <p>Cisim yüzeyden kaç cm derinlikte görünür?</p>`,
    gorsel: `
      <svg viewBox="0 0 520 220" xmlns="http://www.w3.org/2000/svg" role="img"
           aria-label="İki katmanlı sıvıda her katmanın ayrı ayrı görünür derinliğe katkısı">
        <rect width="520" height="220" fill="#0E1726"/>
        <rect x="120" y="40" width="200" height="72"  fill="rgba(60,140,205,.20)"/>
        <rect x="120" y="112" width="200" height="82" fill="rgba(60,140,205,.38)"/>
        <rect x="118" y="38" width="204" height="158" fill="none" stroke="#7FD4E6" stroke-width="2"/>
        <text x="330" y="82"  fill="#EAF0FA" font-size="12" font-family="system-ui">20 cm · n = 1,25</text>
        <text x="330" y="158" fill="#EAF0FA" font-size="12" font-family="system-ui">30 cm · n = 1,50</text>
        <circle cx="220" cy="190" r="7" fill="#35C08A"/>
        <text x="220" y="212" fill="#35C08A" font-size="11" font-family="system-ui" text-anchor="middle">gerçek cisim</text>
        <circle cx="220" cy="154" r="7" fill="#FF6B6B" opacity=".8"/>
        <text x="118" y="150" fill="#FF6B6B" font-size="11" font-family="system-ui" text-anchor="end">görünen</text>
        <circle cx="220" cy="16" r="10" fill="#E8C9A8"/>
        <path d="M220 28 V38" stroke="#FFB020" stroke-width="2"/>
      </svg>`,
    secenekler: [
      '36 cm',
      '40 cm',
      '50 cm',
      '33,3 cm',
      '37,5 cm'
    ],
    dogru: 0,
    cozum: `
      <p>Her katmanın görünür kalınlığını <strong>ayrı ayrı</strong> hesaplayıp toplarız —
      çünkü her katmanda kırılma indisi farklıdır.</p>

      <div class="formul" style="max-width:300px;margin:10px 0">
        <div class="fm">Üst katman: 20 / 1,25 = <strong>16 cm</strong></div>
      </div>
      <div class="formul" style="max-width:300px;margin:10px 0">
        <div class="fm">Alt katman: 30 / 1,50 = <strong>20 cm</strong></div>
      </div>
      <div class="formul" style="max-width:300px;margin:10px 0;border-top-color:var(--accent)">
        <div class="fm" style="color:var(--accent)">h′ = 16 + 20 = <strong>36 cm</strong></div>
      </div>

      <p>Gerçek derinlik 50 cm, görünen 36 cm ⟹ cisim <strong>14 cm</strong> yükselmiş
      görünür.</p>

      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>C şıkkı (50 cm)</strong> gerçek derinliktir, görünen
        değil.
        <br><strong>D şıkkı (33,3)</strong> toplam 50 cm&rsquo;yi tek bir n = 1,50 ile
        bölüyor.
        <br><strong>E şıkkı (37,5)</strong> ortalama indis <code>(1,25+1,50)/2 = 1,375</code>
        alıp <code>50/1,375 = 36,4</code>&rsquo;e yakın bir hesap yapıyor — <strong>ortalama
        indis almak yanlıştır</strong>, katmanlar ayrı hesaplanmalıdır.
        <br><strong>Genel kural:</strong> <code>h′ = Σ (h_i / n_i)</code>
        <br><strong>Sağlama:</strong> Her katman kendi payını verir; kalın ve çok kırıcı
        katman daha çok “kısalır”. Alt katman 30&rsquo;dan 20&rsquo;ye (10 cm kayıp), üst
        katman 20&rsquo;den 16&rsquo;ya (4 cm kayıp) ⟹ toplam 14 cm ✓</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: A</strong></p>`
  },
  {
    baslik: 'Levhada kayma mı sapma mı?',
    kaynak: 'Kavram + hesap',
    govde: `
      <p>Kalınlığı <strong>12 cm</strong>, kırılma indisi <strong>1,5</strong> olan paralel
      yüzlü bir cam levhaya, ışık <strong>30°</strong> gelme açısıyla giriyor.</p>
      <p>Aşağıdaki yargıları inceleyiniz:</p>
      <ol style="margin-left:.2em">
        <li>Levhadan çıkan ışın, gelen ışına paraleldir.</li>
        <li>Levha içindeki kırılma açısı yaklaşık <strong>19,5°</strong>&rsquo;dir.</li>
        <li>Yanal kayma yaklaşık <strong>2,3 cm</strong>&rsquo;dir.</li>
        <li>Levha kalınlığı iki katına çıkarılırsa yanal kayma da iki katına çıkar.</li>
      </ol>
      <p>Hangileri <strong>doğrudur</strong>?</p>`,
    secenekler: [
      'Hepsi',
      'I, II ve III',
      'I ve IV',
      'II ve III',
      'Yalnız I'
    ],
    dogru: 0,
    cozum: `
      <ol>
        <li><strong>Doğru.</strong> İki yüzey paralel olduğu için <code>θ₃ = θ₁</code>.</li>
        <li><strong>Doğru.</strong> <code>sin θ₂ = sin30°/1,5 = 0,5/1,5 = 0,3333</code> ⟹
        <code>θ₂ = 19,47°</code> ✓</li>
        <li><strong>Doğru.</strong>
        <code>d = 12·sin(30° − 19,47°)/cos(19,47°) = 12·sin(10,53°)/0,9428</code>
        <code>= 12·0,1828/0,9428 = <strong>2,33 cm</strong></code> ✓</li>
        <li><strong>Doğru.</strong> Formülde t bir <strong>çarpan</strong>dır; θ₁ ve θ₂
        değişmediğine göre d, t ile <strong>doğru orantılıdır</strong>. 24 cm&rsquo;de
        kayma 4,65 cm olur.</li>
      </ol>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>IV. yargı</strong> bu sorunun asıl öğrettiği yer:
        yanal kayma kalınlıkla <strong>doğru orantılı</strong>, ama gelme açısıyla
        <strong>doğrusal değil</strong>. Açı 0&rsquo;dan büyürken kayma önce yavaş, sonra
        hızla artar ve 90°&rsquo;ye yaklaşırken t&rsquo;ye yaklaşır.
        <br><strong>Sağlama:</strong> Kayma hiçbir zaman kalınlıktan büyük olamaz —
        <code>d &lt; t</code>. 2,33 &lt; 12 ✓ Bu, cevabı hızlı elemek için iyi bir kontroldür.
        <br><strong>Simülasyonda:</strong> 3. düzenekte t = 12, n = 1,5, θ₁ = 30° yap;
        grafik panelinde kaymanın kalınlıkla düz bir doğru çizdiğini gör.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: A</strong></p>`
  }
],

/* --------------------------------------------- Bağlam temelli sorular */
baglam: [
  {
    baslik: 'Zıpkınla balık avlamak',
    govde: `
      <p>Zıpkınla balık avlayanlar, gördükleri balığın <strong>biraz altına</strong>
      nişan alır. Yeni başlayanlar tam gördükleri yere attıkları için sürekli ıskalar.</p>
      <p>Bir dalgıç, kayığından suya bakıyor. Balık gerçekte <strong>1,2 m</strong>
      derinlikte. Suyun kırılma indisi <strong>1,33</strong>.</p>
      <p><strong>Balık kaç metre derinlikte görünür? Neden altına nişan almak gerekiyor?
      Peki suyun altındaki bir dalgıç, kıyıdaki bir kuşa nişan alsa ne yapmalı?</strong></p>`,
    gorsel: `
      <svg viewBox="0 0 520 220" xmlns="http://www.w3.org/2000/svg" role="img"
           aria-label="Sudaki balığın gerçek ve görünen konumu, zıpkının gerçek konuma nişan alması">
        <rect width="520" height="220" fill="#0E1726"/>
        <rect x="0" y="70" width="520" height="150" fill="rgba(60,140,205,.28)"/>
        <line x1="0" y1="70" x2="520" y2="70" stroke="#7FD4E6" stroke-width="2"/>
        <text x="14" y="40" fill="#8FB6EC" font-size="11" font-family="system-ui">hava · n = 1,00</text>
        <text x="14" y="92" fill="#8FB6EC" font-size="11" font-family="system-ui">su · n = 1,33</text>
        <circle cx="420" cy="34" r="12" fill="#E8C9A8"/>
        <text x="420" y="18" fill="#EAF0FA" font-size="11" font-family="system-ui" text-anchor="middle">göz</text>
        <ellipse cx="180" cy="186" rx="26" ry="12" fill="#35C08A"/>
        <path d="M206 186 l16 -9 v18 Z" fill="#35C08A"/>
        <text x="180" y="212" fill="#35C08A" font-size="11" font-family="system-ui" text-anchor="middle">gerçek · 1,20 m</text>
        <ellipse cx="180" cy="157" rx="26" ry="12" fill="#FF6B6B" opacity=".55"/>
        <text x="132" y="140" fill="#FF6B6B" font-size="11" font-family="system-ui" text-anchor="end">görünen · 0,90 m</text>
        <path d="M180 186 L262 70" stroke="#FFB020" stroke-width="2"/>
        <path d="M262 70 L410 40" stroke="#FFB020" stroke-width="2"/>
        <path d="M262 70 L180 157" stroke="#FF6B6B" stroke-width="1.6" stroke-dasharray="5 4"/>
      </svg>`,
    adimlar: [
      { bas: 'Hangi yön?',
        metin: 'Balık <strong>suda</strong>, göz <strong>havada</strong> ⟹ <code>h′ = h/n</code>. Balık olduğundan <strong>sığ</strong> görünecek.' },
      { bas: 'Hesapla',
        metin: '<code>h′ = 1,20 / 1,33 = <strong>0,902 m ≈ 0,90 m</strong></code>' },
      { bas: 'Ne kadar yanılıyoruz?',
        metin: 'Kalkma <code>1,20 − 0,90 = 0,30 m</code>. Balık gerçekte olduğundan <strong>30 cm daha yukarıda</strong> görünüyor.' },
      { bas: 'Nişan nereye?',
        metin: 'Gördüğün yere atarsan zıpkın balığın <strong>üstünden</strong> geçer. Bu yüzden <strong>gördüğünün altına</strong> nişan alınır.' },
      { bas: 'Eğik bakış işi büyütür',
        metin: 'Tepeden bakmıyorsan hata daha da büyür. 30° eğik bakışta 1,20 m&rsquo;deki balık 0,78 m&rsquo;de görünür — sapma 30 değil <strong>42 cm</strong>. Bu yüzden deneyimli avcılar balığın <em>tam üstüne</em> gelmeye çalışır.' },
      { bas: 'Tersi durumda ne olur?',
        metin: 'Sudaki bir dalgıç kıyıdaki kuşa bakarsa <code>h′ = h·n</code> olur: kuş olduğundan <strong>yüksekte</strong> görünür. Bu kez <strong>gördüğünün altına</strong> değil, yine <strong>altına</strong> nişan alması gerekir — çünkü kuş göründüğünden alçaktadır.' },
      { bas: 'Doğada bir örnek',
        metin: 'Okçu balık (<em>Toxotes</em>) sudan ağzıyla su püskürterek dal üstündeki böcekleri düşürür. Bu balıklar kırılmayı <strong>telafi etmeyi</strong> öğrenir; çoğu zaman böceğin tam altına nişan alarak vururlar.' }
    ],
    secenekler: [
      '0,90 m derinlikte görünür; 30 cm yukarıda göründüğü için gördüğünün altına nişan alınmalıdır',
      '1,60 m derinlikte görünür; üstüne nişan alınmalıdır',
      '1,20 m, kırılma derinliği etkilemez',
      '0,90 m görünür ama tam gördüğü yere nişan almalıdır',
      '0,60 m görünür; iki kat sığ görünür'
    ],
    dogru: 0,
    cozum: `
      <div class="formul" style="max-width:300px;margin:10px 0;border-top-color:var(--accent)">
        <div class="fm" style="color:var(--accent)">h′ = 1,20/1,33 = 0,902 m</div>
      </div>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>B şıkkı</strong> bağıntıyı ters kuruyor
        (<code>h·n = 1,60</code>) — bu, <em>sudan havaya bakan</em> gözlemcinin durumudur,
        tersi değil.
        <br><strong>E şıkkı</strong> ikiye bölüyor; doğru bölen 1,33.
        <br><strong>Dikkat:</strong> Bu soruların hepsinde <em>hangi ortamda göz, hangi
        ortamda cisim</em> sorusunu ilk olarak sormak gerekir. Formülü değil, bu soruyu
        ezberle.
        <br><strong>Kendin dene:</strong> Bir bardağa su doldur, dibine bir madenî para
        koy. Yukarıdan bak: para dibe değil, biraz yukarıda duruyormuş gibi görünür.
        Parmağını yandan sokup paraya dokunmaya çalış — ilk denemede ıskalarsın.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: A</strong></p>`
  },
  {
    baslik: 'Buzul altındaki derinlik ölçümü',
    govde: `
      <p>Bir araştırma ekibi, donmuş bir gölün buz tabakasının altındaki su derinliğini
      ölçmek istiyor. Buzun kalınlığı <strong>40 cm</strong> (n = <strong>1,31</strong>),
      altındaki su tabakasının derinliği ise bilinmiyor (n = <strong>1,33</strong>).</p>
      <p>Buzun üzerinden tam yukarıdan bakıldığında, göl tabanındaki bir işaret
      <strong>1,55 m</strong> derinlikte görünüyor.</p>
      <p><strong>Su tabakasının gerçek derinliğini bul. Toplam gerçek derinlik nedir?</strong></p>`,
    gorsel: `
      <svg viewBox="0 0 520 220" xmlns="http://www.w3.org/2000/svg" role="img"
           aria-label="Buz ve su katmanlarının ayrı ayrı görünür derinlik hesabı">
        <rect width="520" height="220" fill="#0E1726"/>
        <rect x="90" y="44" width="260" height="46"  fill="rgba(180,220,245,.30)"/>
        <rect x="90" y="90" width="260" height="110" fill="rgba(60,140,205,.34)"/>
        <rect x="88" y="42" width="264" height="160" fill="none" stroke="#7FD4E6" stroke-width="2"/>
        <text x="364" y="72"  fill="#EAF0FA" font-size="12" font-family="system-ui">buz · 40 cm · n = 1,31</text>
        <text x="364" y="150" fill="#EAF0FA" font-size="12" font-family="system-ui">su · h = ? · n = 1,33</text>
        <path d="M90 200 H350" stroke="#5A5245" stroke-width="5"/>
        <path d="M212 200 l0 -10" stroke="#35C08A" stroke-width="3"/>
        <circle cx="212" cy="196" r="6" fill="#35C08A"/>
        <text x="212" y="216" fill="#35C08A" font-size="11" font-family="system-ui" text-anchor="middle">taban işareti</text>
        <circle cx="212" cy="20" r="10" fill="#E8C9A8"/>
        <path d="M212 32 V42" stroke="#FFB020" stroke-width="2"/>
        <text x="80" y="128" fill="#FF6B6B" font-size="11" font-family="system-ui" text-anchor="end">görünen: 1,55 m</text>
      </svg>`,
    adimlar: [
      { bas: 'Katmanları ayır',
        metin: 'Görünür derinlik her katmanın katkısının toplamıdır: <code>h′ = h_buz/n_buz + h_su/n_su</code>' },
      { bas: 'Buzun katkısı',
        metin: '<code>40 / 1,31 = <strong>30,53 cm</strong></code>' },
      { bas: 'Suyun katkısı',
        metin: 'Toplam görünen 155 cm olduğuna göre: <code>155 − 30,53 = <strong>124,47 cm</strong></code>' },
      { bas: 'Suyun gerçek derinliği',
        metin: '<code>h_su = 124,47 × 1,33 = <strong>165,5 cm ≈ 1,66 m</strong></code>' },
      { bas: 'Toplam gerçek derinlik',
        metin: '<code>40 + 165,5 = <strong>205,5 cm ≈ 2,06 m</strong></code>' },
      { bas: 'Hata payı ne kadar?',
        metin: 'Görünen 1,55 m, gerçek 2,06 m. Kırılma hesaba katılmasaydı derinlik <strong>%25 eksik</strong> ölçülürdü — buzda çalışan bir ekip için ciddi bir fark.' },
      { bas: 'Gerçek yöntemler',
        metin: 'Bilimsel ölçümlerde optik yerine <strong>sonar</strong> (ses) veya <strong>radar</strong> kullanılır; bunların da kendi hız düzeltmeleri vardır. Prensip aynı: dalganın ortamdaki hızını bilmeden derinlik hesaplanamaz.' }
    ],
    secenekler: [
      'Su 1,66 m, toplam gerçek derinlik 2,06 m',
      'Su 1,24 m, toplam 1,64 m',
      'Su 1,55 m, toplam 1,95 m',
      'Su 2,06 m, toplam 2,46 m',
      'Buz saydam olduğu için hesaba katılmaz'
    ],
    dogru: 0,
    cozum: `
      <div class="formul" style="max-width:420px;margin:10px 0">
        <div class="fm">155 = 40/1,31 + h/1,33 = 30,53 + h/1,33</div>
      </div>
      <div class="formul" style="max-width:340px;margin:10px 0;border-top-color:var(--accent)">
        <div class="fm" style="color:var(--accent)">h = 124,47 × 1,33 = 165,5 cm</div>
      </div>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>B şıkkı</strong> 124,47&rsquo;yi gerçek derinlik sanıyor —
        oysa o, suyun <em>görünen</em> kalınlığıdır; 1,33 ile çarpmak gerekir.
        <br><strong>E şıkkı</strong> saydamlığı kırılmasızlıkla karıştırıyor: buz saydamdır
        <em>ve</em> kırıcıdır (n = 1,31). Saydam olmak kırmamak demek değildir — aksine,
        kırılmayı görebilmek için saydam olması gerekir.
        <br><strong>Yönü kontrol et:</strong> Görünen derinlik daima gerçekten
        <strong>küçüktür</strong> (sudan havaya bakışta). 1,55 &lt; 2,06 ✓ Eğer cevabın
        görünenden küçük çıktıysa bir yerde ters bölme yapmışsındır.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: A</strong></p>`
  }
]

});
})();
