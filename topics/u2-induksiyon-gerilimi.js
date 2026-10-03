(function () {
"use strict";
const F = window.F11;

/* ==========================================================================
   topics/u2-induksiyon-gerilimi.js
   Konu 2.3.2 · İndüksiyon gerilimi  (MEB 11, s.242-252)
   ========================================================================== */

F.konuKaydet('u2-induksiyon-gerilimi', {

ozet: `Bu ünitenin en önemli konusu. <strong>Değişen manyetik akı, gerilim üretir.</strong>
Dünyadaki elektriğin neredeyse tamamı bu tek cümleyle üretiliyor: santralde ne yakılırsa
yakılsın (kömür, su, rüzgâr, uranyum) yapılan iş aynıdır — bir bobini bir mıknatısın
içinde döndürmek.`,

/* ------------------------------------------------------------- Kavram */
kavram: `
<p>1831&rsquo;de Michael Faraday basit bir deney yaptı: bir mıknatısı bobinin içine soktu
ve bobine bağlı galvanometrenin ibresinin <strong>saptığını</strong> gördü. Mıknatısı
çıkarınca ibre <strong>ters yöne</strong> saptı. Mıknatıs bobinin içinde
<strong>hareketsiz dururken ise hiçbir şey olmadı</strong>.</p>

<div class="kutu dikkat" style="margin:16px 0">
  <div class="kutu-bas"><span class="ikon">⚠</span><span>Konunun tamamı bu tek ayrımda</span></div>
  <p style="margin:0">Gerilimi üreten şey <strong>akının kendisi değil, akının
  DEĞİŞİMİDİR</strong>. Dünyanın en güçlü mıknatısının içinde hareketsiz duran bir bobin
  <strong>hiç elektrik üretmez</strong>.</p>
  <p style="margin:8px 0 0">Simülasyonda hızı sıfıra indir: akı hâlâ var ama
  <code>ε = 0</code>.</p>
</div>

<h3 style="margin-top:22px">Faraday yasası</h3>
<div class="formul" style="max-width:320px;margin:14px 0;border-top-color:var(--accent)">
  <div class="fm" style="color:var(--accent)">ε = −N · ΔΦ / Δt</div>
  <div class="fm-ad">N: sarım sayısı · ΔΦ/Δt: akının değişim hızı</div>
</div>

<p>Bu formül, bir önceki konudaki üç değişkenin <strong>hangisi değişirse değişsin</strong>
geçerlidir: B değişebilir, A değişebilir, θ değişebilir — sonuç aynı.</p>

<p><strong>ΔΦ/Δt</strong>, akı-zaman grafiğinin <strong>eğimidir</strong>. Bu yüzden önceki
konuda grafiğin eğimine bakmanı istemiştik: <strong>o eğim, ürettiğin gerilimdir</strong>.</p>

<h3 style="margin-top:22px">Eksi işareti: Lenz yasası</h3>
<p>Formülün başındaki eksi, unutulmuş bir ayrıntı değil; <strong>ayrı bir yasadır</strong>:</p>

<div class="formul" style="max-width:420px;margin:14px 0;border-top-color:var(--b5)">
  <div class="fm" style="color:var(--b5);font-size:1.1em">İndüklenen akım, kendisini doğuran değişime KARŞI KOYAR</div>
</div>

<table class="degisken-tablo">
  <thead><tr><th>Olan</th><th>İndüklenen akımın tepkisi</th></tr></thead>
  <tbody>
    <tr><td>Akı <strong>artıyor</strong></td><td>artışa karşı — <em>zıt yönde</em> alan üretir</td></tr>
    <tr><td>Akı <strong>azalıyor</strong></td><td>azalmaya karşı — <em>aynı yönde</em> alan üretir</td></tr>
    <tr><td>Mıknatıs <strong>yaklaşıyor</strong></td><td>bobin onu <em>iter</em></td></tr>
    <tr><td>Mıknatıs <strong>uzaklaşıyor</strong></td><td>bobin onu <em>çeker</em></td></tr>
  </tbody>
</table>

<div class="kutu puf" style="margin:16px 0">
  <div class="kutu-bas"><span class="ikon">⚖</span><span>Lenz aslında enerji korunumudur</span></div>
  <p style="margin:0">Lenz yasası tersine işleseydi ne olurdu? Mıknatısı bobine
  yaklaştırdığında bobin onu <em>çekerdi</em>; mıknatıs kendiliğinden hızlanır, üstelik
  elektrik de üretirdi. <strong>Hiçbir şey vermeden sınırsız enerji</strong> elde
  edilirdi — imkânsız.</p>
  <p style="margin:8px 0 0">Bu yüzden doğa değişime direnir: elektrik enerjisi elde etmek
  için <strong>mutlaka iş yapman</strong> gerekir.</p>
</div>

<h3 style="margin-top:22px">Hareket emk’sı: ε = B·L·ϑ</h3>
<p>Raylar üzerinde kayan bir tel için formül çok sadeleşir. Tel ϑ hızıyla giderse
çevrelenen alan büyür, akı artar ve:</p>
<div class="formul" style="max-width:300px;margin:14px 0">
  <div class="fm">ε = B · L · ϑ</div>
  <div class="fm-ad">N sarım varsa ε = N·B·L·ϑ</div>
</div>

<p>Burada Lenz yasası çok somut görünür: indüklenen akım, telin hareketine
<strong>karşı koyan</strong> bir kuvvet doğurur. Yani teli çekmeye devam etmek için
<strong>sürekli kuvvet uygulaman</strong> gerekir. Yaptığın iş, üretilen elektrik
enerjisine dönüşür — hiçbir şey bedava değildir.</p>

<h3 style="margin-top:22px">Jeneratör: dönen çerçeve</h3>
<p>Çerçeve ω açısal hızıyla dönerse:</p>
<div class="formul" style="max-width:340px;margin:14px 0">
  <div class="fm">Φ = B·A·cos(ω·t) &nbsp;⟹&nbsp; ε = N·B·A·ω·sin(ω·t)</div>
</div>

<p><strong>Akı kosinüs, gerilim sinüstür.</strong> Bunun iki önemli sonucu var:</p>
<ul>
  <li>Gerilim <strong>sürekli yön değiştirir</strong> ⟹ üretilen şey
  <strong>alternatif akımdır</strong> (sonraki konu)</li>
  <li>Akı <strong>sıfırken</strong> gerilim <strong>en büyüktür</strong> — çünkü orada
  akı en hızlı değişiyor</li>
</ul>

<div class="formul" style="max-width:280px;margin:14px 0;border-top-color:var(--accent)">
  <div class="fm" style="color:var(--accent)">ε<sub>maks</sub> = N·B·A·ω</div>
</div>

<h3 style="margin-top:22px">Aynı düzenek, iki iş</h3>
<p>Bir önceki konudaki motor ile buradaki jeneratör <strong>aynı makinedir</strong>:</p>
<table class="degisken-tablo">
  <thead><tr><th></th><th>Verilen</th><th>Alınan</th></tr></thead>
  <tbody>
    <tr><td><strong>Motor</strong></td><td>elektrik</td><td>dönme</td></tr>
    <tr><td><strong>Jeneratör</strong></td><td>dönme</td><td>elektrik</td></tr>
  </tbody>
</table>`,

/* ---------------------------------------------------------- Formüller */
formuller: {
  liste: [
    { fm: 'ε = −N · ΔΦ / Δt',       aciklama: 'Faraday yasası — eksi işareti Lenz’dir' },
    { fm: 'ε = B · L · ϑ',          aciklama: 'Hareket emk’sı — raylar üzerinde kayan tel' },
    { fm: 'ε = N·B·A·ω·sin(ωt)',    aciklama: 'Dönen çerçeve — jeneratör' },
    { fm: 'ε<sub>maks</sub> = N·B·A·ω', aciklama: 'Jeneratörün tepe gerilimi' },
    { fm: 'i = ε / R',              aciklama: 'İndüklenen akım — devre direnci R' },
    { fm: 'F = i·B·L',              aciklama: 'İndüklenen akımın harekete karşı koyduğu kuvvet' }
  ],
  degiskenler: [
    { sembol: 'ε',  ad: 'İndüksiyon gerilimi (emk)', birim: 'V' },
    { sembol: 'Φ',  ad: 'Manyetik akı',    birim: 'Wb' },
    { sembol: 'Δt', ad: 'Değişim süresi',  birim: 's' },
    { sembol: 'N',  ad: 'Sarım sayısı',    birim: 'tane' },
    { sembol: 'ϑ',  ad: 'Telin hızı',      birim: 'm/s' },
    { sembol: 'ω',  ad: 'Açısal hız',      birim: 'rad/s' }
  ]
},

/* ------------------------------------------------------------ Türetim */
turetim: {
  yollar: [
    {
      ad: 'ε = B·L·ϑ nereden geliyor?',
      adimlar: [
        { baslik: 'Çevrelenen alanı yaz',
          html: `<p>Raylar arası uzaklık <strong>L</strong>, telin kapaktan uzaklığı
                 <strong>x</strong> ise devrenin çevrelediği alan:</p>
                 <div class="formul" style="max-width:180px"><div class="fm">A = L · x</div></div>` },

        { baslik: 'Akıyı yaz',
          html: `<p>Alan yüzeye dik (θ = 0) olduğuna göre:</p>
                 <div class="formul" style="max-width:240px"><div class="fm">Φ = B·A = B·L·x</div></div>` },

        { baslik: 'Değişimi al',
          html: `<p>B ve L sabit, değişen yalnızca x:</p>
                 <div class="formul" style="max-width:260px"><div class="fm">ΔΦ = B·L·Δx</div></div>
                 <p>Zamana bölelim:</p>
                 <div class="formul" style="max-width:280px"><div class="fm">ΔΦ/Δt = B·L·(Δx/Δt)</div></div>` },

        { baslik: 'Hızı tanı',
          html: `<p><code>Δx/Δt</code> zaten <strong>hızdır</strong>:</p>
                 <div class="formul" style="max-width:240px;border-top-color:var(--accent)">
                   <div class="fm" style="color:var(--accent)">ε = B·L·ϑ</div>
                 </div>
                 <p>Üç çarpan da somut: alan ne kadar güçlü, tel ne kadar uzun, ne kadar
                 hızlı çekiyorsun.</p>` }
      ]
    },
    {
      ad: 'Lenz yasası neden zorunlu?',
      adimlar: [
        { baslik: 'Tersini varsay',
          html: `<p>Diyelim ki indüklenen akım, değişimi <strong>desteklesin</strong>.
                 Mıknatısı bobine yaklaştırdığında bobin onu <strong>çeksin</strong>.</p>` },

        { baslik: 'Sonucu izle',
          html: `<p>Mıknatıs daha hızlı yaklaşır ⟹ akı daha hızlı değişir ⟹ daha çok akım
                 ⟹ daha çok çekim ⟹ <strong>daha da hızlanır</strong>.</p>` },

        { baslik: 'Çelişkiyi gör',
          html: `<p>Hem hareket kendiliğinden hızlanıyor hem de elektrik üretiliyor.
                 <strong>Hiçbir şey harcamadan sınırsız enerji</strong> elde edilmiş olurdu.
                 Bu, enerjinin korunumuna aykırıdır.</p>` },

        { baslik: 'Doğru yönü belirle',
          html: `<p>Demek ki indüklenen akım <strong>değişime karşı koymak zorundadır</strong>:</p>
                 <div class="formul" style="max-width:300px;border-top-color:var(--accent)">
                   <div class="fm" style="color:var(--accent)">ε = −N·ΔΦ/Δt</div>
                 </div>
                 <p>Eksi işareti bir hesap ayrıntısı değil, <strong>enerji korunumunun
                 formüldeki izidir</strong>.</p>` }
      ]
    },
    {
      ad: 'Jeneratör neden sinüs üretir?',
      adimlar: [
        { baslik: 'Akıyı yaz',
          html: `<p>Çerçeve sabit ω ile dönerse θ = ωt olur:</p>
                 <div class="formul" style="max-width:240px"><div class="fm">Φ = B·A·cos(ωt)</div></div>` },

        { baslik: 'Değişim hızını düşün',
          html: `<p>Gerilim, bu eğrinin <strong>eğimidir</strong>. Kosinüs eğrisinin eğimi
                 nerede en büyük? Eksenden geçtiği yerlerde. Nerede sıfır? Tepe ve dipte.</p>` },

        { baslik: 'Eğimi yaz',
          html: `<p>Kosinüsün değişim hızı <strong>sinüs</strong> biçimindedir:</p>
                 <div class="formul" style="max-width:300px;border-top-color:var(--accent)">
                   <div class="fm" style="color:var(--accent)">ε = N·B·A·ω·sin(ωt)</div>
                 </div>` },

        { baslik: 'İki sonucu oku',
          html: `<p><strong>1.</strong> Gerilim yön değiştirir ⟹ <strong>alternatif akım</strong>.</p>
                 <p><strong>2.</strong> ω formülde çarpan olarak var ⟹ <strong>daha hızlı
                 döndür, daha çok gerilim</strong>. Bu yüzden santrallerde türbinler
                 sabit ve yüksek devirde döndürülür.</p>
                 <p>Simülasyonda ω&rsquo;yı değiştir: Φ grafiğinin <em>tepe değeri
                 değişmez</em> ama ε grafiğinin tepe değeri <strong>büyür</strong>.</p>` }
      ]
    }
  ]
},

/* -------------------------------------------------------- Simülasyon */
sim: F.simler['induksiyon-gerilimi'],

/* ------------------------------------------------------- Püf noktası */
puf: {
  html: `
    <p><strong>1 · “Hareketsiz” kelimesini gördüğün an cevap sıfırdır.</strong>
    Mıknatıs bobinin içinde duruyorsa, çerçeve alanda sabitse, hız sıfırsa ⟹
    <strong>ε = 0</strong>. Akının büyüklüğü hiç önemli değil.</p>

    <p><strong>2 · Grafik sorusu = eğim sorusu.</strong> Φ−t grafiği verilip “hangi aralıkta
    gerilim en büyüktür?” diye soruluyorsa cevap <strong>en dik aralıktır</strong>.
    Yatay aralıkta gerilim sıfırdır.</p>

    <p><strong>3 · Lenz’i iki adımda uygula:</strong></p>
    <ul>
      <li>Akı artıyor mu azalıyor mu? (yaklaşıyor mu uzaklaşıyor mu)</li>
      <li>İndüklenen akım <strong>bunun tersini</strong> yapmaya çalışır</li>
    </ul>
    <p>Yaklaşan mıknatıs <em>itilir</em>, uzaklaşan mıknatıs <em>çekilir</em>. Bu iki cümle
    çoğu soruyu çözer.</p>

    <p><strong>4 · Oranlar:</strong></p>
    <table class="degisken-tablo" style="margin-top:8px">
      <thead><tr><th>Değişiklik</th><th>ε</th></tr></thead>
      <tbody>
        <tr><td>ϑ → 2ϑ</td><td class="sembol">2ε</td></tr>
        <tr><td>N → 2N</td><td class="sembol">2ε</td></tr>
        <tr><td>B → 2B</td><td class="sembol">2ε</td></tr>
        <tr><td>ω → 2ω</td><td class="sembol">2ε</td></tr>
        <tr><td>Δt → 2Δt (aynı ΔΦ)</td><td class="sembol">ε/2</td></tr>
      </tbody>
    </table>

    <p style="margin-top:14px"><strong>5 · Jeneratörde akı ve gerilim ters fazdadır.</strong>
    Akı en büyükken gerilim <strong>sıfır</strong>, akı sıfırken gerilim
    <strong>en büyük</strong>. Şıklarda “ikisi birlikte en büyük olur” diyen seçenek
    her zaman yanlıştır.</p>

    <p><strong>6 · Karşı kuvveti unutma.</strong> “Teli sabit hızda çekmek için gereken
    kuvvet nedir?” sorusunun cevabı <code>F = i·B·L</code>&rsquo;dir (sürtünme yoksa).
    Sabit hız demek net kuvvet sıfır demektir; çektiğin kuvvet, indüklenen akımın karşı
    kuvvetine eşittir.</p>

    <p><strong>7 · Enerji hesabı:</strong> Yaptığın mekanik iş, devrede açığa çıkan
    elektrik enerjisine eşittir. <code>P = F·ϑ = ε·i</code>. Bu eşitlik, Lenz yasasının
    sayısal karşılığıdır.</p>

    <div class="kutu puf" style="margin-top:14px">
      <div class="kutu-bas"><span class="ikon">🏭</span><span>Bütün santraller aynı şeyi yapar</span></div>
      <p style="margin:0">Termik, hidroelektrik, rüzgâr, nükleer — hepsinde son adım
      <strong>bir bobini döndürmektir</strong>. Değişen tek şey türbini neyin döndürdüğüdür:
      buhar, su, rüzgâr ya da nükleer ısıyla üretilen buhar. Güneş panelleri ise
      <em>istisnadır</em>; orada dönen bir parça yoktur.</p>
    </div>`
},

/* ----------------------------------------------------- Zorlayıcı sorular */
osym: [
  {
    baslik: 'Mıknatıs bobinin içinde dururken',
    kaynak: 'Bir numaralı kavram tuzağı',
    govde: `
      <p>Güçlü bir çubuk mıknatıs, <strong>500 sarımlı</strong> bir bobinin tam ortasına
      yerleştirilmiş ve <strong>hareketsiz</strong> tutulmaktadır. Bobin uçlarına bir
      galvanometre bağlıdır.</p>
      <p>Bu durumda aşağıdakilerden hangisi <strong>doğrudur</strong>?</p>`,
    secenekler: [
      'Bobinden geçen akı büyüktür ama indüksiyon gerilimi sıfırdır',
      'Akı da gerilim de büyüktür',
      'Akı sıfırdır, bu yüzden gerilim de sıfırdır',
      'Sarım sayısı 500 olduğu için gerilim çok büyüktür',
      'Galvanometre sabit bir değer gösterir'
    ],
    dogru: 0,
    cozum: `
      <p><strong>Akı büyüktür</strong> — mıknatıs güçlü ve tam içeride, çizgiler bobini
      bolca deliyor.</p>
      <p><strong>Ama gerilim sıfırdır</strong> — çünkü akı <strong>değişmiyor</strong>:</p>
      <div class="formul" style="max-width:300px;margin:10px 0;border-top-color:var(--accent)">
        <div class="fm" style="color:var(--accent)">ΔΦ = 0 ⟹ ε = −N·(0)/Δt = 0</div>
      </div>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>C şıkkı</strong> akıyı sıfır sanıyor — hayır, akı var
        ve büyük.
        <br><strong>D şıkkı</strong> N&rsquo;ye bakıp karar veriyor. N bir <em>çarpandır</em>;
        çarpılan şey sıfırsa sonuç yine sıfırdır.
        <br><strong>E şıkkı</strong> ilginç bir yanılgı: galvanometre sıfır <em>gösterir</em>,
        yani ibre sapmaz. “Sabit bir değer” ifadesi sıfırdan farklı bir okuma çağrıştırıyor.
        <br><strong>Deneyi yap:</strong> Simülasyonda hız kaydırıcısını 0&rsquo;a çek.
        Akı okuması sıfırdan farklı kalır, gerilim <strong>0,000 V</strong> olur.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: A</strong></p>`
  },
  {
    baslik: 'Teli çekmek için gereken kuvvet',
    kaynak: 'Lenz + enerji',
    govde: `
      <p>Aralarındaki uzaklık <strong>30 cm</strong> olan sürtünmesiz raylar,
      <strong>0,8 T</strong>&rsquo;lık düzgün manyetik alanın içindedir. Devrenin toplam
      direnci <strong>2 Ω</strong>&rsquo;dur.</p>
      <p>Raylar üzerindeki tel <strong>sabit 1,5 m/s</strong> hızla çekilmektedir.
      (Tek sarım, N = 1)</p>
      <p>Buna göre <strong>indüklenen gerilim</strong>, <strong>akım</strong> ve teli sabit
      hızda çekmek için gereken <strong>kuvvet</strong> nedir?</p>`,
    gorsel: `
      <svg viewBox="0 0 520 190" xmlns="http://www.w3.org/2000/svg" role="img"
           aria-label="Raylar üzerinde sabit hızla çekilen tel ve indüklenen akımın karşı kuvveti">
        <rect width="520" height="190" fill="#0E1726"/>
        <rect x="50" y="34" width="430" height="120" fill="rgba(56,150,200,.10)"/>
        <g stroke="#2F6FD0" stroke-width="1.4">
          <circle cx="110" cy="64" r="6" fill="none"/><circle cx="190" cy="64" r="6" fill="none"/>
          <circle cx="270" cy="64" r="6" fill="none"/><circle cx="350" cy="64" r="6" fill="none"/>
          <circle cx="430" cy="64" r="6" fill="none"/>
          <circle cx="110" cy="124" r="6" fill="none"/><circle cx="190" cy="124" r="6" fill="none"/>
          <circle cx="270" cy="124" r="6" fill="none"/><circle cx="350" cy="124" r="6" fill="none"/>
          <circle cx="430" cy="124" r="6" fill="none"/>
        </g>
        <g stroke="#2F6FD0" stroke-width="1.4">
          <path d="M106 60 l8 8 M114 60 l-8 8 M186 60 l8 8 M194 60 l-8 8"/>
          <path d="M266 60 l8 8 M274 60 l-8 8 M346 60 l8 8 M354 60 l-8 8 M426 60 l8 8 M434 60 l-8 8"/>
          <path d="M106 120 l8 8 M114 120 l-8 8 M186 120 l8 8 M194 120 l-8 8"/>
          <path d="M266 120 l8 8 M274 120 l-8 8 M346 120 l8 8 M354 120 l-8 8 M426 120 l8 8 M434 120 l-8 8"/>
        </g>
        <path d="M60 44 H470 M60 144 H470" stroke="#9AA5B1" stroke-width="5"/>
        <path d="M60 44 V144" stroke="#9AA5B1" stroke-width="5"/>
        <path d="M300 44 V144" stroke="#B87333" stroke-width="8"/>
        <path d="M312 94 H370" stroke="#35C08A" stroke-width="3"/>
        <path d="M376 94 L364 88 L364 100 Z" fill="#35C08A"/>
        <text x="345" y="82" fill="#35C08A" font-size="12" font-family="system-ui">ϑ = 1,5 m/s</text>
        <path d="M288 110 H236" stroke="#FF6B6B" stroke-width="3"/>
        <path d="M230 110 L242 104 L242 116 Z" fill="#FF6B6B"/>
        <text x="200" y="128" fill="#FF6B6B" font-size="12" font-family="system-ui">F</text>
        <text x="86" y="176" fill="#EAF0FA" font-size="11" font-family="system-ui">R = 2 Ω · L = 30 cm · B = 0,8 T</text>
      </svg>`,
    secenekler: [
      'ε = 0,36 V · i = 0,18 A · F = 0,043 N',
      'ε = 0,36 V · i = 0,18 A · F = 0,36 N',
      'ε = 3,6 V · i = 1,8 A · F = 0,43 N',
      'ε = 0,36 V · i = 0,72 A · F = 0,17 N',
      'Sürtünme sıfır olduğu için kuvvet gerekmez'
    ],
    dogru: 0,
    cozum: `
      <p><strong>Adım 1 — Gerilim.</strong></p>
      <p>ε = B·L·ϑ = 0,8 · 0,30 · 1,5 = <strong>0,36 V</strong></p>

      <p><strong>Adım 2 — Akım.</strong></p>
      <p>i = ε/R = 0,36 / 2 = <strong>0,18 A</strong></p>

      <p><strong>Adım 3 — Kuvvet.</strong> Akım taşıyan tel alanın içinde ⟹ bir önceki
      konunun formülü:</p>
      <p>F = i·B·L = 0,18 · 0,8 · 0,30 = <strong>0,043 N</strong></p>

      <div class="kutu dikkat" style="margin-top:12px">
        <div class="kutu-bas"><span class="ikon">⚠</span><span>E şıkkı neden çok cazip ve neden yanlış?</span></div>
        <p style="margin:0">Sürtünme gerçekten sıfır. Ama <strong>sürtünme dışında bir
        direnç daha var</strong>: indüklenen akımın oluşturduğu <em>karşı kuvvet</em>.
        Teli bırakırsan yavaşlar ve durur. Sabit hızda tutmak için sürekli
        <strong>0,043 N</strong> uygulaman gerekir.</p>
      </div>

      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>Enerji kontrolü — çözümün sağlaması:</strong>
        <br>Mekanik güç: <code>P = F·ϑ = 0,043 · 1,5 = 0,065 W</code>
        <br>Elektriksel güç: <code>P = ε·i = 0,36 · 0,18 = 0,065 W</code>
        <br><strong>Birebir eşit.</strong> Yaptığın mekanik iş, elektrik enerjisine
        dönüşüyor. Bu eşitlik tutmasaydı enerji korunumu bozulurdu — yani bu kontrol,
        çözümün doğruluğunu bağımsız olarak kanıtlıyor.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: A</strong></p>`
  }
],

/* --------------------------------------------- Bağlam temelli sorular */
baglam: [
  {
    baslik: 'Bisiklet dinamosu neden pedalı zorlaştırıyor?',
    govde: `
      <p>Eski bisikletlerde lastiğe değen küçük bir <strong>dinamo</strong> vardır. Tekerlek
      döndükçe dinamo döner, far yanar.</p>
      <p>Bisikletçiler şunu bilir: <strong>dinamoyu lastiğe değdirdiğin an pedal
      ağırlaşır.</strong> Farı söndürdüğünde (devreyi kestiğinde) ise dinamo lastiğe değmeye
      devam etse bile pedal <strong>hafifler</strong>.</p>
      <p>Bir öğrenci soruyor: <em>“Dinamo zaten dönüyor. Ampulü açmak niye pedalı
      zorlaştırsın? Ampul dinamoya bağlı bir şey, tekerleğe değil.”</em></p>
      <p><strong>Olayı Lenz yasasıyla açıkla. Devre açıkken neden zorlanmıyorsun?</strong></p>`,
    gorsel: `
      <svg viewBox="0 0 520 200" xmlns="http://www.w3.org/2000/svg" role="img"
           aria-label="Bisiklet dinamosunun lastiğe değmesi ve devre kapalıyken karşı kuvvet oluşması">
        <rect width="520" height="200" fill="#17223A"/>
        <circle cx="160" cy="100" r="74" fill="none" stroke="#3A4049" stroke-width="10"/>
        <circle cx="160" cy="100" r="10" fill="#7D8A99"/>
        <g stroke="#5F6B78" stroke-width="2">
          <path d="M160 100 L160 28 M160 100 L232 100 M160 100 L160 172 M160 100 L88 100"/>
        </g>
        <path d="M160 100 L 246 68" stroke="#FFB020" stroke-width="2" stroke-dasharray="4 4"/>
        <text x="200" y="60" fill="#FFB020" font-size="11" font-family="system-ui">dönme</text>
        <rect x="238" y="86" width="40" height="30" rx="5" fill="#5F6B78"/>
        <text x="258" y="134" fill="#EAF0FA" font-size="11" font-family="system-ui" text-anchor="middle">dinamo</text>
        <path d="M278 94 H360" stroke="#B87333" stroke-width="2.4"/>
        <path d="M278 110 H360" stroke="#B87333" stroke-width="2.4"/>
        <circle cx="386" cy="102" r="22" fill="#FFD24A"/>
        <g stroke="#FFD24A" stroke-width="2">
          <path d="M386 68 V56 M416 102 H430 M410 78 L420 68 M410 126 L420 136"/>
        </g>
        <text x="386" y="152" fill="#EAF0FA" font-size="11" font-family="system-ui" text-anchor="middle">far</text>
        <path d="M232 128 H196" stroke="#FF6B6B" stroke-width="3"/>
        <path d="M190 128 L202 122 L202 134 Z" fill="#FF6B6B"/>
        <text x="182" y="150" fill="#FF6B6B" font-size="11" font-family="system-ui">karşı kuvvet</text>
      </svg>`,
    adimlar: [
      { bas: 'Devre AÇIKKEN ne oluyor?',
        metin: 'Dinamo döner, bobinde <strong>gerilim indüklenir</strong> — ama devre açık olduğu için <strong>akım akmaz</strong>.' },
      { bas: 'Akım yoksa kuvvet de yok',
        metin: 'Karşı kuvvet <code>F = i·B·L</code> ile akıma bağlıdır. i = 0 ise <strong>F = 0</strong>. Bu yüzden yalnızca dinamonun kendi sürtünmesini hissedersin — hafiftir.' },
      { bas: 'Farı yakınca',
        metin: 'Devre kapanır, <strong>akım akmaya başlar</strong>. Lenz yasası devreye girer: indüklenen akım, kendisini doğuran dönmeye <strong>karşı koyan</strong> bir kuvvet üretir.' },
      { bas: 'Pedal neden ağırlaşıyor?',
        metin: 'O karşı kuvveti yenmek için <strong>sen ek iş yapmak zorundasın</strong>. Pedala bastığın fazladan kuvvet, farın ışığına dönüşüyor.' },
      { bas: 'Enerji akışını yaz',
        metin: 'bacak kası → pedal → tekerlek → dinamo → elektrik → ışık. <strong>Işık bedava değil</strong>; bacağından çıkıyor.' },
      { bas: 'Sayıyla',
        metin: 'Tipik bir dinamo 3 W üretir. <code>P = F·ϑ</code> olduğuna göre 5 m/s hızda ek kuvvet <code>F = 3/5 = 0,6 N</code> kadardır. Küçük ama hissedilir — özellikle yokuşta.' }
    ],
    secenekler: [
      'Devre kapanınca akım akar; Lenz gereği bu akım dönmeye karşı kuvvet üretir ve o kuvveti yenmek için ek iş yaparsın',
      'Ampul dinamodan akım çektiği için dinamo ısınır ve sürtünme artar',
      'Devre açıkken de aynı kuvvet vardır, fark hayalidir',
      'Ampulün ağırlığı bisikleti yavaşlatır',
      'Dinamo lastiği daha çok sıktığı için sürtünme artar'
    ],
    dogru: 0,
    cozum: `
      <p>Devre <strong>açıkken</strong>: gerilim var, akım yok ⟹ karşı kuvvet yok.
      Devre <strong>kapalıyken</strong>: akım var ⟹ Lenz gereği karşı kuvvet var.</p>
      <div class="formul" style="max-width:320px;margin:10px 0;border-top-color:var(--accent)">
        <div class="fm" style="color:var(--accent)">i = 0 ⟹ F = 0 &nbsp;·&nbsp; i ≠ 0 ⟹ F = i·B·L</div>
      </div>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>C şıkkı</strong> ölçülebilir bir farkı yok sayıyor —
        bisiklete binen herkes bu farkı hisseder.
        <br><strong>Aynı olgunun başka yerleri:</strong> Elektrikli araçlarda
        <em>rejeneratif fren</em>, spor salonundaki kondisyon bisikletlerinin direnç ayarı
        (bir mıknatısı volana yaklaştırırlar), trenlerdeki girdap akımlı frenler.
        Hepsi aynı cümlenin uygulaması: <strong>elektrik üretmek, harekete direnç
        demektir</strong>.
        <br><strong>Simülasyonda gör:</strong> İkinci düzenekte devre direncini (R)
        küçült — akım büyür, karşı kuvvet de büyür.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: A</strong></p>`
  },
  {
    baslik: 'Rüzgâr türbini ne kadar elektrik üretir?',
    govde: `
      <p>Türkiye&rsquo;de rüzgâr enerjisi hızla büyüyor. Bir rüzgâr türbininin kulesinin
      tepesinde, kanatların döndürdüğü bir <strong>jeneratör</strong> vardır.</p>
      <p>Bir öğrenci soruyor: <em>“Kanatlar zaten dönüyor. Rüzgâr daha hızlı eserse jeneratör
      daha hızlı döner, daha çok elektrik üretir. Peki neden çok şiddetli fırtınada
      türbinler durduruluyor?”</em></p>
      <p>Bir model jeneratörde:</p>
      <ul>
        <li>Sarım sayısı: <strong>N = 200</strong></li>
        <li>Çerçeve alanı: <strong>A = 0,5 m²</strong></li>
        <li>Manyetik alan: <strong>B = 0,6 T</strong></li>
        <li>Dönme hızı: <strong>ω = 20 rad/s</strong></li>
      </ul>
      <p><strong>Tepe gerilimini hesapla. Dönme hızı iki katına çıkarsa ne olur? Fırtınada
      neden durduruluyor?</strong></p>`,
    gorsel: `
      <svg viewBox="0 0 520 200" xmlns="http://www.w3.org/2000/svg" role="img"
           aria-label="Rüzgâr türbini kanatları, jeneratör ve üretilen sinüs biçimli gerilim">
        <rect width="520" height="200" fill="#17223A"/>
        <rect x="0" y="176" width="520" height="24" fill="#3B5323"/>
        <path d="M130 176 L138 60 L154 60 L162 176 Z" fill="#9AA5B1"/>
        <circle cx="146" cy="58" r="9" fill="#5F6B78"/>
        <g stroke="#C9D4E2" stroke-width="7" stroke-linecap="round">
          <path d="M146 58 L146 6"/>
          <path d="M146 58 L192 86"/>
          <path d="M146 58 L100 86"/>
        </g>
        <g stroke="#8FB6EC" stroke-width="2" fill="none">
          <path d="M20 40 q 16 -10 32 0 q 16 10 32 0"/>
          <path d="M20 70 q 16 -10 32 0 q 16 10 32 0"/>
        </g>
        <text x="52" y="26" fill="#8FB6EC" font-size="11" font-family="system-ui" text-anchor="middle">rüzgâr</text>
        <path d="M250 110 h 30 q 10 -46 20 0 q 10 46 20 0 q 10 -46 20 0 q 10 46 20 0 q 10 -46 20 0 h 30"
              stroke="#35C08A" stroke-width="2.6" fill="none"/>
        <text x="370" y="150" fill="#35C08A" font-size="12" font-family="system-ui" text-anchor="middle">ε = N·B·A·ω·sin(ωt)</text>
        <text x="220" y="76" fill="#EAF0FA" font-size="11" font-family="system-ui">jeneratör</text>
      </svg>`,
    adimlar: [
      { bas: 'Tepe gerilimini hesapla',
        metin: 'ε_maks = N·B·A·ω = 200 · 0,6 · 0,5 · 20<br>= 200 · 0,6 = 120 ⟹ 120 · 0,5 = 60 ⟹ 60 · 20 = <strong>1200 V</strong>' },
      { bas: 'Hızı iki katına çıkar',
        metin: 'ω formülde <strong>birinci dereceden</strong> çarpan olduğu için gerilim de iki katına çıkar: <strong>2400 V</strong>' },
      { bas: 'Ama güç dört katına çıkar',
        metin: 'Güç <code>P = ε²/R</code> ile gerilimin <strong>karesine</strong> bağlıdır. Gerilim 2 katına çıkarsa güç <strong>4 katına</strong> çıkar. Yalıtım, kablolar ve elektronik bu artışa dayanmak zorundadır.' },
      { bas: 'Fırtınada ne olur?',
        metin: 'Çok yüksek ω ⟹ çok yüksek gerilim ⟹ yalıtım delinebilir, jeneratör sargıları ve güç elektroniği <strong>zarar görür</strong>. Ayrıca kanatlardaki mekanik yükler de tehlikeli düzeye çıkar.' },
      { bas: 'Çözüm ne?',
        metin: 'Türbinler belirli bir rüzgâr hızının üstünde <strong>kanatlarını rüzgâra paralel çevirip</strong> (pitch kontrolü) dönmeyi keser. Bu sınıra <strong>kesme hızı</strong> denir ve tipik olarak saniyede 25 metre civarındadır.' },
      { bas: 'Öğrencinin varsayımını düzelt',
        metin: '“Daha hızlı = daha iyi” doğru <em>değil</em>. Her makinenin bir <strong>tasarım aralığı</strong> vardır; o aralığın dışında daha fazla üretim değil, <strong>hasar</strong> vardır.' }
    ],
    secenekler: [
      'ε_maks = 1200 V; hız iki katına çıkarsa 2400 V olur; fırtınada gerilim ve mekanik yükler güvenli sınırı aştığı için türbin durdurulur',
      'ε_maks = 1200 V; hız iki katına çıkarsa 4800 V olur',
      'ε_maks = 120 V; fırtınada sorun yaşanmaz',
      'ε_maks = 2400 V; hız arttıkça gerilim değişmez',
      'Gerilim rüzgâr hızından bağımsızdır, yalnızca mıknatısa bağlıdır'
    ],
    dogru: 0,
    cozum: `
      <p><strong>ε_maks = N·B·A·ω = 200 · 0,6 · 0,5 · 20 = 1200 V</strong></p>
      <div class="formul" style="max-width:340px;margin:10px 0;border-top-color:var(--accent)">
        <div class="fm" style="color:var(--accent)">ε ∝ ω &nbsp;·&nbsp; P ∝ ε² ∝ ω²</div>
      </div>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>B şıkkı</strong> ω&rsquo;nın karesini alıyor — gerilim
        ω ile <em>doğru orantılıdır</em>, kare olan <em>güçtür</em>. Bu ayrım sık karıştırılır.
        <br><strong>E şıkkı</strong> konunun temel cümlesini reddediyor: değişimin
        <em>hızı</em> gerilimi belirler.
        <br><strong>Türkiye bağlamı:</strong> Ülkemizde rüzgâr santrallerinin kurulu gücü
        11 000 MW&rsquo;ı aşmış durumda ve elektrik üretiminin yaklaşık onda birini
        karşılıyor. Hepsinin kalbinde bu konunun tek formülü var:
        <strong>ε = −N·ΔΦ/Δt</strong>.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: A</strong></p>`
  }
]

});
})();
