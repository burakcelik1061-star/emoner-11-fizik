(function () {
"use strict";
const F = window.F11;

/* ==========================================================================
   topics/u3-kirilma.js
   Konu 3.5 · Işığın kırılması
   ========================================================================== */

F.konuKaydet('u3-kirilma', {

ozet: `Işık bir ortamdan başka bir ortama geçerken <strong>hız değiştirir</strong> ve bu
yüzden <strong>yön değiştirir</strong>. Kırılmanın tek sebebi budur. Bu konuda Snell
yasasını, kırılma indisini, sınır açısını ve tam yansımayı kuruyoruz — 3.6, 3.7 ve
3.8&rsquo;in tamamı buraya dayanacak.`,

/* ------------------------------------------------------------- Kavram */
kavram: `
<h3>Kırılma neden olur?</h3>
<p>Işığın hızı boşlukta <strong>c = 3×10⁸ m/s</strong>&rsquo;dir. Bir maddenin içinde ise
daha yavaştır. Bu yavaşlamanın ölçüsüne <strong>kırılma indisi</strong> denir:</p>
<div class="formul" style="max-width:260px;margin:14px 0;border-top-color:var(--accent)">
  <div class="fm" style="color:var(--accent)">n = c / v</div>
  <div class="fm-ad">n her zaman 1 veya daha büyüktür</div>
</div>
<table class="degisken-tablo">
  <thead><tr><th>Ortam</th><th>n</th><th>Işık hızı (×10⁸ m/s)</th></tr></thead>
  <tbody>
    <tr><td>Boşluk / hava</td><td class="sembol">1,00</td><td>3,00</td></tr>
    <tr><td>Buz</td><td class="sembol">1,31</td><td>2,29</td></tr>
    <tr><td>Su</td><td class="sembol">1,33</td><td>2,26</td></tr>
    <tr><td>Cam</td><td class="sembol">1,50</td><td>2,00</td></tr>
    <tr><td>Elmas</td><td class="sembol">2,42</td><td>1,24</td></tr>
  </tbody>
</table>

<h3 style="margin-top:22px">Snell yasası</h3>
<div class="formul" style="max-width:300px;margin:14px 0;border-top-color:var(--accent)">
  <div class="fm" style="color:var(--accent)">n₁ · sin θ₁ = n₂ · sin θ₂</div>
  <div class="fm-ad">açılar NORMALDEN ölçülür</div>
</div>
<table class="degisken-tablo">
  <thead><tr><th>Geçiş</th><th>Hız</th><th>Işın</th></tr></thead>
  <tbody>
    <tr><td>Az kırıcıdan çok kırıcıya (n₂ &gt; n₁)</td><td>yavaşlar</td><td>normale <strong>yaklaşır</strong></td></tr>
    <tr><td>Çok kırıcıdan az kırıcıya (n₂ &lt; n₁)</td><td>hızlanır</td><td>normalden <strong>uzaklaşır</strong></td></tr>
    <tr><td>Dik geliş (θ₁ = 0)</td><td>değişir</td><td><strong>sapmaz</strong></td></tr>
  </tbody>
</table>

<div class="kutu dikkat" style="margin:16px 0">
  <div class="kutu-bas"><span class="ikon">⚠</span><span>Ne değişir, ne değişmez?</span></div>
  <table class="degisken-tablo" style="margin-top:8px">
    <thead><tr><th>Büyüklük</th><th>Kırılmada</th></tr></thead>
    <tbody>
      <tr><td>Hız (v)</td><td><strong>DEĞİŞİR</strong> · v = c/n</td></tr>
      <tr><td>Dalga boyu (λ)</td><td><strong>DEĞİŞİR</strong> · λ = λ₀/n</td></tr>
      <tr><td>Frekans (f)</td><td><strong>DEĞİŞMEZ</strong></td></tr>
      <tr><td>Renk</td><td><strong>DEĞİŞMEZ</strong> (rengi frekans belirler)</td></tr>
    </tbody>
  </table>
  <p style="margin:8px 0 0">Frekans kaynağın özelliğidir; ortam onu değiştiremez. Suya
  giren kırmızı ışık suyun içinde de kırmızıdır — dalga boyu kısalmış olsa bile.</p>
</div>

<h3 style="margin-top:22px">Sınır açısı ve tam yansıma</h3>
<p>Çok kırıcı ortamdan az kırıcıya geçerken ışın normalden uzaklaşır. Gelme açısını
büyütürsen kırılma açısı daha da büyür ve bir noktada <strong>90°</strong>&rsquo;ye ulaşır.
O gelme açısına <strong>sınır açısı</strong> denir:</p>
<div class="formul" style="max-width:280px;margin:14px 0;border-top-color:var(--accent)">
  <div class="fm" style="color:var(--accent)">sin θ<sub>sınır</sub> = n₂ / n₁</div>
  <div class="fm-ad">yalnızca n₁ &gt; n₂ iken vardır</div>
</div>
<p>Gelme açısı sınır açısını <strong>geçerse</strong> ışık ikinci ortama hiç geçemez,
<strong>tamamı yansır</strong>. Buna <strong>tam yansıma</strong> denir.</p>
<table class="degisken-tablo">
  <thead><tr><th>Geçiş</th><th>Sınır açısı</th></tr></thead>
  <tbody>
    <tr><td>Su → hava</td><td class="sembol">48,8°</td></tr>
    <tr><td>Cam → hava</td><td class="sembol">41,8°</td></tr>
    <tr><td>Elmas → hava</td><td class="sembol">24,4°</td></tr>
  </tbody>
</table>
<p style="margin-top:10px;color:var(--text-2)">Elmasın sınır açısı çok küçük olduğu için
içine giren ışık kolay kolay dışarı çıkamaz, defalarca tam yansımaya uğrar ve sonunda
belli yönlerden güçlü biçimde çıkar. Elmasın “parlaklığı” budur.</p>

<h3 style="margin-top:22px">Kırılırken bir kısmı da yansır</h3>
<p>Ders kitaplarında genellikle söylenmez ama gerçekte ışık bir sınıra geldiğinde
<strong>hem kırılır hem yansır</strong>. Yansıyan oran <strong>Fresnel bağıntılarıyla</strong>
hesaplanır ve simülasyonda gerçek değeriyle gösterilir:</p>
<table class="degisken-tablo">
  <thead><tr><th>Sınır (dik geliş)</th><th>Yansıyan</th></tr></thead>
  <tbody>
    <tr><td>Hava → su</td><td class="sembol">%2,0</td></tr>
    <tr><td>Hava → cam</td><td class="sembol">%4,0</td></tr>
    <tr><td>Hava → elmas</td><td class="sembol">%17,2</td></tr>
  </tbody>
</table>
<p style="margin-top:10px;color:var(--text-2)">Camdan kendi yansımanı görebilmenin sebebi
bu %4&rsquo;tür. Gelme açısı büyüdükçe oran artar; suya çok eğik bakınca dibi değil
<strong>gökyüzünü</strong> görmenin sebebi de budur.</p>`,

/* ---------------------------------------------------------- Formüller */
formuller: {
  liste: [
    { fm: 'n = c / v',                  aciklama: 'Kırılma indisi' },
    { fm: 'n₁·sin θ₁ = n₂·sin θ₂',      aciklama: 'Snell yasası' },
    { fm: 'λ = λ₀ / n',                 aciklama: 'Ortamdaki dalga boyu' },
    { fm: 'f = sabit',                  aciklama: 'Frekans kırılmada değişmez' },
    { fm: 'sin θ<sub>s</sub> = n₂ / n₁', aciklama: 'Sınır açısı (n₁ > n₂ iken)' },
    { fm: 'v₁/v₂ = n₂/n₁ = sin θ₁/sin θ₂', aciklama: 'Hız, indis ve açı üçlüsü' }
  ],
  degiskenler: [
    { sembol: 'n',  ad: 'Kırılma indisi',   birim: '—' },
    { sembol: 'c',  ad: 'Boşlukta ışık hızı', birim: '3×10⁸ m/s' },
    { sembol: 'v',  ad: 'Ortamdaki hız',    birim: 'm/s' },
    { sembol: 'θ₁', ad: 'Gelme açısı',      birim: '°' },
    { sembol: 'θ₂', ad: 'Kırılma açısı',    birim: '°' },
    { sembol: 'λ',  ad: 'Dalga boyu',       birim: 'nm' }
  ]
},

/* ------------------------------------------------------------ Türetim */
turetim: {
  yollar: [
    {
      ad: 'Snell yasası dalga cephelerinden',
      adimlar: [
        { baslik: 'Cepheleri düşün',
          html: `<p>Işığı bir ışın değil, birbirine paralel <strong>dalga cepheleri</strong>
                 olarak düşün. Cepheler ışına diktir ve aralarındaki uzaklık dalga boyudur.
                 (Simülasyonda 3. düzenek tam olarak bunu çiziyor.)</p>` },

        { baslik: 'Cephe sınıra eğik geliyor',
          html: `<p>Cephenin bir ucu sınıra diğerinden <strong>önce</strong> varır. Varan uç
                 ikinci ortamda <code>v₂</code> hızıyla ilerlemeye başlarken diğer uç hâlâ
                 birinci ortamda <code>v₁</code> hızıyla gider.</p>` },

        { baslik: 'Aynı sürede farklı yollar',
          html: `<p>Bir Δt süresinde iki uç farklı yol alır:</p>
                 <div class="formul" style="max-width:260px">
                   <div class="fm">x₁ = v₁·Δt &nbsp;&nbsp; x₂ = v₂·Δt</div>
                 </div>
                 <p>Bu, cephenin <strong>dönmesine</strong> — yani ışının sapmasına — yol açar.</p>` },

        { baslik: 'Geometriyi yaz',
          html: `<p>Sınır üzerinde ortak bir <code>L</code> uzunluğu alırsak:</p>
                 <div class="formul" style="max-width:300px">
                   <div class="fm">sin θ₁ = x₁ / L &nbsp;&nbsp; sin θ₂ = x₂ / L</div>
                 </div>` },

        { baslik: 'Oranla',
          html: `<div class="formul" style="max-width:300px">
                   <div class="fm">sin θ₁ / sin θ₂ = x₁/x₂ = v₁ / v₂</div>
                 </div>
                 <p><code>v = c/n</code> yerine konursa <code>v₁/v₂ = n₂/n₁</code>:</p>
                 <div class="formul" style="max-width:280px;border-top-color:var(--accent)">
                   <div class="fm" style="color:var(--accent)">n₁·sin θ₁ = n₂·sin θ₂</div>
                 </div>` }
      ]
    },
    {
      ad: 'Sınır açısı',
      adimlar: [
        { baslik: 'Sınır durumu nedir?',
          html: `<p>Kırılan ışının en fazla sapabileceği durum, <strong>yüzey boyunca</strong>
                 gitmesidir: <code>θ₂ = 90°</code>.</p>` },

        { baslik: 'Snell’e koy',
          html: `<div class="formul" style="max-width:320px">
                   <div class="fm">n₁·sin θ<sub>s</sub> = n₂·sin 90° = n₂·1</div>
                 </div>` },

        { baslik: 'Çöz',
          html: `<div class="formul" style="max-width:240px;border-top-color:var(--accent)">
                   <div class="fm" style="color:var(--accent)">sin θ<sub>s</sub> = n₂ / n₁</div>
                 </div>` },

        { baslik: 'Ne zaman vardır?',
          html: `<p>Sinüs en fazla 1 olabilir, yani <code>n₂/n₁ ≤ 1</code> ⟹
                 <strong>n₁ ≥ n₂</strong> olmalı.</p>
                 <p>Az kırıcıdan çok kırıcıya geçerken (hava→su) sınır açısı
                 <strong>yoktur</strong>; tam yansıma imkânsızdır. Bu, sorularda sık sorulan
                 bir ayrıntıdır.</p>` },

        { baslik: 'Sayısal örnek',
          html: `<p>Su → hava:</p>
                 <div class="formul" style="max-width:340px">
                   <div class="fm">sin θ<sub>s</sub> = 1,00/1,33 = 0,752 ⟹ θ<sub>s</sub> = <strong>48,8°</strong></div>
                 </div>
                 <p>Havuzun dibinden 48,8°&rsquo;den eğik bakarsan yüzeyi ayna gibi
                 görürsün — üstünü değil, havuzun tabanını.</p>` }
      ]
    },
    {
      ad: 'Dalga boyu neden kısalır?',
      adimlar: [
        { baslik: 'Dalga bağıntısı',
          html: `<div class="formul" style="max-width:200px"><div class="fm">v = λ · f</div></div>` },

        { baslik: 'Frekans sabit',
          html: `<p>Sınırda birim zamanda gelen dalga sayısı ile giden dalga sayısı
                 <strong>eşit olmak zorundadır</strong> — yoksa sınırda dalga birikirdi.
                 Dolayısıyla <strong>f değişmez</strong>.</p>` },

        { baslik: 'Sonuç',
          html: `<p>f sabitse λ, v ile <strong>doğru orantılıdır</strong>:</p>
                 <div class="formul" style="max-width:280px">
                   <div class="fm">λ₂/λ₁ = v₂/v₁ = n₁/n₂</div>
                 </div>
                 <div class="formul" style="max-width:220px;border-top-color:var(--accent)">
                   <div class="fm" style="color:var(--accent)">λ = λ₀ / n</div>
                 </div>` },

        { baslik: 'Sayısal',
          html: `<p>Boşlukta 550 nm olan yeşil ışık suda (n = 1,33):</p>
                 <div class="formul" style="max-width:300px">
                   <div class="fm">λ = 550/1,33 = <strong>413,5 nm</strong></div>
                 </div>
                 <p>Frekans ise her iki ortamda da <code>545 THz</code> — bu yüzden ışık
                 hâlâ yeşildir.</p>` }
      ]
    }
  ]
},

/* -------------------------------------------------------- Simülasyon */
sim: F.simler['kirilma'],

/* ------------------------------------------------------- Püf noktası */
puf: {
  html: `
    <p><strong>1 · Açı normalden.</strong> “Işın yüzeyle 30° açı yapıyor” ⟹ gelme açısı
    <strong>60°</strong>. Optiğin her konusunda aynı tuzak.</p>

    <p><strong>2 · Yön kuralını iki kelimeyle tut.</strong> <em>Yavaşlarsa yaklaşır,
    hızlanırsa uzaklaşır</em> (normale göre). n ve v ters orantılı olduğu için bu,
    “n büyür ⟹ yaklaşır” ile aynı şey.</p>

    <p><strong>3 · Sınır açısı yalnızca yoğundan seyreğe.</strong> Soru hava→cam geçişinde
    sınır açısı soruyorsa cevap “<strong>yoktur</strong>”. Bu, en sevilen çeldiricilerden
    biridir.</p>

    <p><strong>4 · Dik gelişte sapma yok ama hız değişir.</strong> “Dik gelen ışık
    kırılmaz” ifadesi <em>sapmaz</em> anlamında doğru, <em>hızı değişmez</em> anlamında
    yanlıştır.</p>

    <p><strong>5 · Frekans değişmez — ezberin en kârlısı.</strong> “Suya girince ışığın
    frekansı azalır” diyen şık daima yanlıştır.</p>

    <p><strong>6 · n &lt; 1 olamaz.</strong> Hiçbir maddede ışık boşluktakinden hızlı
    gitmez. Soruda n = 0,8 gibi bir değer varsa ya birimler farklıdır ya da o şık yanlıştır.</p>

    <p><strong>7 · Oranları zincir gibi kullan.</strong>
    <code>v₁/v₂ = n₂/n₁ = λ₁/λ₂ = sin θ₁/sin θ₂</code> — dördü birbirine eşittir.
    Soruda hangisi verilmişse zincirin öbür ucundan çekersin.</p>

    <p><strong>8 · sin 90° = 1.</strong> Sınır açısı sorularının tamamı bu tek bilgiye
    dayanır; formülü ezberlemek yerine 90°&rsquo;yi Snell&rsquo;e koymayı öğren.</p>

    <p><strong>9 · Tam yansımada ışık kaybı yoktur.</strong> Sıradan bir aynada ışığın bir
    kısmı yutulur; tam yansımada <strong>%100</strong>&rsquo;ü geri döner. Fiber optiğin
    çalışma sebebi tam olarak budur.</p>`
},

/* ----------------------------------------------------- Zorlayıcı sorular */
osym: [
  {
    baslik: 'Üç ortam, tek zincir',
    kaynak: 'Oran kurma',
    govde: `
      <p>Bir ışık ışını, birbirine paralel yüzeylerle ayrılmış üç ortamdan geçiyor.
      Ortamlardaki ışık hızları:</p>
      <p style="text-align:center"><strong>v₁ = 3,0×10⁸ m/s &nbsp;·&nbsp;
      v₂ = 2,0×10⁸ m/s &nbsp;·&nbsp; v₃ = 2,4×10⁸ m/s</strong></p>
      <p>Işın 1. ortamdan 2. ortama <strong>30°</strong> gelme açısıyla giriyor.</p>
      <p>Buna göre ışının 3. ortamdaki <strong>kırılma açısının sinüsü</strong> kaçtır?</p>`,
    gorsel: `
      <svg viewBox="0 0 520 220" xmlns="http://www.w3.org/2000/svg" role="img"
           aria-label="Üç paralel ortamda ışının ardışık kırılması">
        <rect width="520" height="220" fill="#0E1726"/>
        <rect x="0" y="0"   width="520" height="72" fill="rgba(60,140,205,.10)"/>
        <rect x="0" y="72"  width="520" height="72" fill="rgba(60,140,205,.30)"/>
        <rect x="0" y="144" width="520" height="76" fill="rgba(60,140,205,.20)"/>
        <line x1="0" y1="72"  x2="520" y2="72"  stroke="#7FD4E6" stroke-width="1.6"/>
        <line x1="0" y1="144" x2="520" y2="144" stroke="#7FD4E6" stroke-width="1.6"/>
        <text x="14" y="22" fill="#EAF0FA" font-size="12" font-family="system-ui">1. ortam · v₁ = 3,0×10⁸</text>
        <text x="14" y="94" fill="#EAF0FA" font-size="12" font-family="system-ui">2. ortam · v₂ = 2,0×10⁸</text>
        <text x="14" y="166" fill="#EAF0FA" font-size="12" font-family="system-ui">3. ortam · v₃ = 2,4×10⁸</text>
        <line x1="260" y1="6" x2="260" y2="214" stroke="#4A5F86" stroke-width="1.2" stroke-dasharray="6 5"/>
        <path d="M224 10 L260 72" stroke="#FFB020" stroke-width="2.4"/>
        <path d="M260 72 L281 144" stroke="#FF6B6B" stroke-width="2.4"/>
        <path d="M281 144 L318 214" stroke="#35C08A" stroke-width="2.4"/>
        <text x="216" y="44" fill="#FFB020" font-size="12" font-family="system-ui" text-anchor="end">30°</text>
        <text x="296" y="112" fill="#FF6B6B" font-size="12" font-family="system-ui">θ₂</text>
        <text x="330" y="186" fill="#35C08A" font-size="12" font-family="system-ui">θ₃</text>
      </svg>`,
    secenekler: [
      '0,40',
      '0,50',
      '0,33',
      '0,60',
      '0,25'
    ],
    dogru: 0,
    cozum: `
      <p><strong>Yol 1 — indislerle.</strong> <code>n = c/v</code>:</p>
      <div class="formul" style="max-width:420px;margin:10px 0">
        <div class="fm">n₁ = 3/3 = 1,00 &nbsp; n₂ = 3/2 = 1,50 &nbsp; n₃ = 3/2,4 = 1,25</div>
      </div>
      <p>Paralel yüzeylerde Snell zinciri boyunca <code>n·sin θ</code>
      <strong>sabittir</strong>:</p>
      <div class="formul" style="max-width:380px;margin:10px 0">
        <div class="fm">n₁ sin θ₁ = n₃ sin θ₃ ⟹ 1,00 · sin30° = 1,25 · sin θ₃</div>
      </div>
      <div class="formul" style="max-width:300px;margin:10px 0;border-top-color:var(--accent)">
        <div class="fm" style="color:var(--accent)">sin θ₃ = 0,50 / 1,25 = <strong>0,40</strong></div>
      </div>

      <p><strong>Yol 2 — doğrudan hızlarla.</strong>
      <code>sin θ₁ / sin θ₃ = v₁ / v₃</code>:</p>
      <div class="formul" style="max-width:340px;margin:10px 0">
        <div class="fm">sin θ₃ = sin30° · (v₃/v₁) = 0,5 · (2,4/3,0) = <strong>0,40</strong></div>
      </div>

      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>Asıl kazanç:</strong> 2. ortamı hiç hesaplamadık.
        Paralel yüzeylerde <code>n·sin θ</code> <strong>her ortamda aynı</strong> kaldığı
        için aradaki katmanlar cevabı değiştirmez; yalnızca ışının <em>yanal kaymasını</em>
        etkilerler.
        <br><strong>B şıkkı (0,50)</strong> aradaki ortamları yok sayıp “açı değişmez”
        diyor — ilk ve son ortamın <em>indisleri eşit olsaydı</em> doğru olurdu.
        <br><strong>D şıkkı (0,60)</strong> oranı ters kuruyor: <code>0,5·(3,0/2,4)</code>.
        <br><strong>Kontrol:</strong> n₃ (1,25) &gt; n₁ (1,00) olduğuna göre ışın normale
        yaklaşmalı ⟹ sin θ₃ &lt; sin θ₁ = 0,5 ✓ 0,40 bu koşulu sağlıyor, 0,60 sağlamıyor.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: A</strong></p>`
  },
  {
    baslik: 'Sınır açısı var mı yok mu?',
    kaynak: 'Koşul tuzağı',
    govde: `
      <p>Kırılma indisi <strong>1,5</strong> olan camdan yapılmış bir blok, kırılma indisi
      <strong>1,33</strong> olan suyun içine batırılıyor.</p>
      <p>Aşağıdaki yargıları inceleyiniz:</p>
      <ol style="margin-left:.2em">
        <li>Camdan suya geçişte sınır açısı yaklaşık <strong>62,5°</strong>&rsquo;dir.</li>
        <li>Sudan cama geçişte de bir sınır açısı vardır.</li>
        <li>Blok sudan çıkarılıp havaya konursa sınır açısı <strong>küçülür</strong>.</li>
        <li>Tam yansıma sırasında ışığın bir kısmı ikinci ortama geçer.</li>
      </ol>
      <p>Hangileri <strong>doğrudur</strong>?</p>`,
    secenekler: [
      'I ve III',
      'I, II ve III',
      'Yalnız I',
      'II ve IV',
      'I, III ve IV'
    ],
    dogru: 0,
    cozum: `
      <ol>
        <li><strong>Doğru.</strong> <code>sin θ_s = n₂/n₁ = 1,33/1,50 = 0,8867</code> ⟹
        <code>θ_s = 62,46°</code> ✓</li>
        <li><strong>Yanlış.</strong> Sudan cama geçişte <code>n₁ = 1,33 &lt; n₂ = 1,50</code>.
        Sınır açısı yalnızca <strong>çok kırıcıdan az kırıcıya</strong> geçişte vardır.
        Işın normale yaklaşır, asla 90°&rsquo;ye ulaşamaz.</li>
        <li><strong>Doğru.</strong> Havada <code>n₂ = 1,00</code>:
        <code>sin θ_s = 1,00/1,50 = 0,667</code> ⟹ <code>θ_s = 41,8°</code>.
        62,5° &gt; 41,8° olduğuna göre sınır açısı gerçekten <strong>küçüldü</strong>.</li>
        <li><strong>Yanlış.</strong> Tam yansımada ışığın <strong>tamamı</strong> yansır —
        adı zaten bu. İkinci ortama geçen ışık yoktur.</li>
      </ol>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>III. yargının mantığı:</strong> İki ortamın indisleri
        birbirine ne kadar <em>yakınsa</em> sınır açısı o kadar <strong>büyüktür</strong>
        (90°&rsquo;ye yaklaşır). Aradaki fark açıldıkça sınır açısı küçülür. Elmas–hava
        çiftinde fark en büyük olduğu için sınır açısı en küçüktür: 24,4°.
        <br><strong>Pratik sonuç:</strong> Elmas suyun içine batırılırsa sınır açısı
        24,4°&rsquo;den 33,3°&rsquo;ye çıkar ve taş gözle görülür biçimde <em>sönükleşir</em>.
        Kuyumcular sahte taş ayırt etmek için bu yöntemi kullanır.
        <br><strong>Simülasyonda:</strong> 2. düzenekte n₁ = 1,50, n₂ = 1,33 yap;
        okumalarda 62,46° göreceksin. Sonra n₂&rsquo;yi 1,00 yap; 41,81°&rsquo;ye düşecek.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: A</strong></p>`
  }
],

/* --------------------------------------------- Bağlam temelli sorular */
baglam: [
  {
    baslik: 'Havuzun dibinden yukarı bakmak',
    govde: `
      <p>Bir dalgıç havuzun dibinden yukarı bakıyor. Suyun kırılma indisi
      <strong>1,33</strong>, havanınki <strong>1,00</strong>.</p>
      <p>Dalgıç, tam tepesine baktığında yüzeyin ötesini net görüyor. Ama bakış açısını
      yana doğru kaydırdıkça bir noktadan sonra yüzey <strong>ayna gibi</strong> oluyor ve
      havuzun tabanını yansıtıyor.</p>
      <p><strong>Bu geçişin hangi açıda olduğunu hesapla. Dalgıcın gördüğü “ışık
      dairesinin” neden sınırlı olduğunu açıkla.</strong></p>`,
    gorsel: `
      <svg viewBox="0 0 520 220" xmlns="http://www.w3.org/2000/svg" role="img"
           aria-label="Su altından bakan dalgıcın gördüğü Snell konisi ve sınır açısının dışında tam yansıma">
        <rect width="520" height="220" fill="#0E1726"/>
        <rect x="0" y="60" width="520" height="160" fill="rgba(60,140,205,.28)"/>
        <line x1="0" y1="60" x2="520" y2="60" stroke="#7FD4E6" stroke-width="2"/>
        <text x="14" y="34" fill="#EAF0FA" font-size="12" font-family="system-ui">hava · n = 1,00</text>
        <text x="14" y="84" fill="#EAF0FA" font-size="12" font-family="system-ui">su · n = 1,33</text>
        <circle cx="260" cy="182" r="13" fill="#E8C9A8"/>
        <text x="260" y="212" fill="#EAF0FA" font-size="11" font-family="system-ui" text-anchor="middle">dalgıç</text>
        <path d="M260 169 L120 60 M260 169 L400 60" stroke="#FFB020" stroke-width="2"/>
        <path d="M120 60 L54 22 M400 60 L466 22" stroke="#FFB020" stroke-width="1.6"/>
        <path d="M260 169 L260 60 M260 60 L260 22" stroke="#FFB020" stroke-width="2"/>
        <text x="260" y="46" fill="#FFB020" font-size="11" font-family="system-ui" text-anchor="middle">Snell konisi · 97,5° açıklık</text>
        <path d="M260 169 L60 106" stroke="#FF6B6B" stroke-width="2"/>
        <path d="M60 106 L260 169" stroke="#FF6B6B" stroke-width="0"/>
        <path d="M60 106 L36 128" stroke="#FF6B6B" stroke-width="1.4" stroke-dasharray="4 3"/>
        <text x="96" y="130" fill="#FF6B6B" font-size="11" font-family="system-ui">48,8°’den eğik ⟹ TAM YANSIMA</text>
      </svg>`,
    adimlar: [
      { bas: 'Hangi yönde geçiş?',
        metin: 'Işık <strong>sudan havaya</strong> çıkıyor: <code>n₁ = 1,33 &gt; n₂ = 1,00</code>. Çok kırıcıdan az kırıcıya ⟹ sınır açısı <strong>vardır</strong>.' },
      { bas: 'Sınır açısını hesapla',
        metin: '<code>sin θ_s = n₂/n₁ = 1,00/1,33 = 0,752</code> ⟹ <code>θ_s = <strong>48,8°</strong></code>' },
      { bas: 'Neyi görür?',
        metin: 'Dikeyden <strong>48,8°</strong>&rsquo;ye kadar olan koni içinde dışarıyı görür. Bu koniye <strong>Snell konisi</strong> denir; tam açıklığı <code>2 × 48,75 = 97,5°</code>&rsquo;dir.' },
      { bas: 'Koninin dışında ne olur?',
        metin: '48,8°&rsquo;den daha eğik yönlerden gelen ışık yüzeyden <strong>tam yansımaya</strong> uğrar. Dalgıç o yönlerde havayı değil, havuzun <strong>tabanının yansımasını</strong> görür.' },
      { bas: 'Dışarısı nasıl görünür?',
        metin: 'Ufuktan tepeye kadar <strong>180°</strong>&rsquo;lik tüm dış dünya, o 97,5°&rsquo;lik koninin içine <strong>sıkışır</strong>. Bu yüzden dışarıdaki her şey dairenin kenarına doğru giderek ezilmiş görünür — balık gözü objektifi etkisi.' },
      { bas: 'Derinlikle değişir mi?',
        metin: '<strong>Açı değişmez</strong> — sınır açısı yalnızca indislere bağlıdır. Ama dalgıç derinleştikçe koninin yüzeydeki <strong>çapı</strong> büyür: <code>çap = 2·h·tan48,8° = 2,28·h</code>. 3 m derinde yaklaşık 6,8 m çapında bir pencere.' }
    ],
    secenekler: [
      '48,8°; bu açıdan eğik bakışlarda tam yansıma olur ve tüm dış dünya 97,5°’lik bir koniye sıkışır',
      '41,8°; koninin açıklığı 83,6°’dir',
      'Sınır açısı yoktur çünkü su havadan daha kırıcıdır',
      '48,8°; ama koninin çapı derinlikten bağımsızdır',
      '24,4°; su elmasla aynı davranır'
    ],
    dogru: 0,
    cozum: `
      <div class="formul" style="max-width:340px;margin:10px 0;border-top-color:var(--accent)">
        <div class="fm" style="color:var(--accent)">sin θ_s = 1,00/1,33 = 0,752 ⟹ 48,8°</div>
      </div>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>B şıkkı</strong> cam–hava sınır açısını (41,8°) su için
        kullanıyor.
        <br><strong>C şıkkı</strong> koşulu tersten okuyor: sınır açısı tam da
        <em>kırıcıdan az kırıcıya</em> geçişte vardır.
        <br><strong>D şıkkı</strong> açı ile çapı karıştırıyor: açı sabit, <strong>çap
        derinlikle büyür</strong>.
        <br><strong>Gözlem:</strong> Havuzda bir kez dalıp yukarı bakmak bu konuyu ders
        anlatımından daha iyi öğretir. Başının tam üstünde net bir daire, kenarlarında
        parlak gümüş bir yüzey görürsün.
        <br><strong>Doğada:</strong> Balıklar dünyayı hep bu koniden görür; su kuşları da
        avlanırken bu daireden faydalanır.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: A</strong></p>`
  },
  {
    baslik: 'Serap neden görünür?',
    govde: `
      <p>Sıcak bir yaz günü asfaltta ilerlerken ileride <strong>su birikintisi</strong>
      varmış gibi görünür, yaklaşınca kaybolur. Çölde de aynı şey olur.</p>
      <p>Asfaltın hemen üzerindeki hava çok ısınır ve <strong>genleşir</strong>; yoğunluğu
      düşer. Havanın kırılma indisi yoğunlukla birlikte azalır: sıcak hava tabakasının
      indisi, üstteki serin havanınkinden <strong>küçüktür</strong>.</p>
      <p><strong>Gökyüzünden gelen ışığın gözümüze nasıl ulaştığını açıkla. Neden “su”
      görüyoruz?</strong></p>`,
    gorsel: `
      <svg viewBox="0 0 520 210" xmlns="http://www.w3.org/2000/svg" role="img"
           aria-label="Sıcak hava tabakasında ışığın kademeli kırılarak tam yansımaya uğraması ve serap oluşumu">
        <rect width="520" height="210" fill="#0E1726"/>
        <rect x="0" y="0"   width="520" height="120" fill="rgba(60,140,205,.10)"/>
        <rect x="0" y="120" width="520" height="24" fill="rgba(60,140,205,.16)"/>
        <rect x="0" y="144" width="520" height="22" fill="rgba(60,140,205,.10)"/>
        <rect x="0" y="166" width="520" height="20" fill="rgba(255,176,32,.10)"/>
        <rect x="0" y="186" width="520" height="24" fill="#3A3733"/>
        <text x="14" y="30" fill="#8FB6EC" font-size="11" font-family="system-ui">serin hava · n büyük</text>
        <text x="14" y="180" fill="#FFB020" font-size="11" font-family="system-ui">çok sıcak hava · n küçük</text>
        <text x="460" y="204" fill="#B8B2A8" font-size="11" font-family="system-ui" text-anchor="end">asfalt</text>
        <path d="M40 24 Q 210 140 300 176 Q 360 190 420 132" fill="none" stroke="#FFB020" stroke-width="2.4"/>
        <path d="M420 132 L470 96" stroke="#FFB020" stroke-width="2.4"/>
        <circle cx="486" cy="88" r="12" fill="#E8C9A8"/>
        <text x="486" y="70" fill="#EAF0FA" font-size="11" font-family="system-ui" text-anchor="middle">göz</text>
        <path d="M470 96 L330 178" stroke="#35C08A" stroke-width="1.6" stroke-dasharray="5 4"/>
        <text x="330" y="196" fill="#35C08A" font-size="11" font-family="system-ui" text-anchor="middle">gökyüzü burada sanılır</text>
        <circle cx="34" cy="20" r="11" fill="#FAC775"/>
      </svg>`,
    adimlar: [
      { bas: 'Hava tabakalara ayrılıyor',
        metin: 'Asfalta yaklaştıkça hava ısınır, seyrekleşir ve <strong>n küçülür</strong>. Yani yukarıdan aşağıya doğru <strong>çok kırıcıdan az kırıcıya</strong> giden bir dizi tabaka var.' },
      { bas: 'Işın kademe kademe kırılıyor',
        metin: 'Gökyüzünden eğik gelen ışın her tabaka geçişinde normalden biraz daha <strong>uzaklaşır</strong>. Yüzeyler yatay olduğu için normal düşeydir; ışın giderek <strong>yatıklaşır</strong>.' },
      { bas: 'Sınır açısı aşılıyor',
        metin: 'Bir tabakada gelme açısı sınır açısını geçer ve ışın <strong>tam yansımaya</strong> uğrar. Artık aşağı inmez, <strong>yukarı doğru kıvrılır</strong>.' },
      { bas: 'Göze yukarıdan geliyor',
        metin: 'Işın gözümüze <strong>aşağıdan yukarı</strong> doğru gelir. Beynimiz ışığın daima düz gittiğini varsaydığı için kaynağı <strong>yerde</strong> sanır.' },
      { bas: 'Neden “su” gibi?',
        metin: 'Yerde gördüğümüz şey <strong>gökyüzünün görüntüsüdür</strong> — mavi, parlak ve titrek. Yerde mavi parlak bir yüzey görünce beyin bunu <strong>su</strong> diye yorumlar. Titreklik, hava tabakalarının sürekli hareket etmesindendir.' },
      { bas: 'Yaklaşınca neden kaybolur?',
        metin: 'Yaklaştıkça bakış açın <strong>dikleşir</strong>; gelme açısı sınır açısının altına iner ve tam yansıma sona erer. Serap hep “biraz ileride” kalır.' },
      { bas: 'Ters serap',
        metin: 'Kutuplarda tersi olur: buz üstündeki hava alttan <strong>soğuk</strong>tur, n aşağıda büyüktür. Bu kez ışın aşağı kıvrılır ve ufkun ötesindeki gemiler <strong>havada asılı</strong> görünür. Buna “fata morgana” denir.' }
    ],
    secenekler: [
      'Sıcak havada n küçüldüğü için ışın kademeli kırılıp tam yansımaya uğrar, göze aşağıdan gelir ve gökyüzünün görüntüsü yerde su sanılır',
      'Asfalt ıslak olduğu için gerçekten yansıma yapar',
      'Sıcak hava ışığı soğurur, bu yüzden karanlık bir leke görünür',
      'Işık sıcak havada hızlandığı için renk değiştirir ve mavi görünür',
      'Serap yalnızca gözün yorulmasından kaynaklanan bir yanılsamadır'
    ],
    dogru: 0,
    cozum: `
      <p>Serap bir <strong>göz yanılması değil</strong>, gerçek bir optik olaydır —
      fotoğrafı bile çekilebilir. Sebebi tam yansımadır.</p>
      <div class="formul" style="max-width:400px;margin:10px 0;border-top-color:var(--accent)">
        <div class="fm" style="color:var(--accent)">sıcak hava ⟹ seyrek ⟹ n küçük ⟹ ışın normalden uzaklaşır</div>
      </div>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>E şıkkı</strong> en yaygın yanlış inanış. Serap
        kameraya da girer; “yanılsama” olsaydı giremezdi.
        <br><strong>D şıkkı</strong> rengi hızla açıklamaya çalışıyor; oysa mavilik
        <em>gökyüzünün</em> rengidir, kırılmanın değil.
        <br><strong>Bağlantı:</strong> Burada tabakalar arasında <em>keskin</em> bir sınır
        yok, n sürekli değişiyor. Bu yüzden ışının yolu kırık bir çizgi değil,
        <strong>eğri</strong>dir. Snell yasası bu durumda da geçerlidir — yalnızca sonsuz
        ince tabakalara uygulanır.
        <br><strong>Aynı olay:</strong> Gün batımında Güneş&rsquo;i ufkun altına indikten
        sonra bile birkaç dakika görmemizin sebebi de atmosferdeki kademeli kırılmadır.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: A</strong></p>`
  }
]

});
})();
