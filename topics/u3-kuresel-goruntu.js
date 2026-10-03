(function () {
"use strict";
const F = window.F11;

/* ==========================================================================
   topics/u3-kuresel-goruntu.js
   Konu 3.3.2 · Küresel aynalarda görüntü  (MEB 11, s.333-342)
   ========================================================================== */

F.konuKaydet('u3-kuresel-goruntu', {

ozet: `Bir önceki konuda aynanın <em>elemanlarını</em> tanıdık. Şimdi asıl soruyu
soruyoruz: cismi şuraya koyarsam görüntü <strong>nerede</strong>, <strong>ne
büyüklükte</strong> ve <strong>nasıl</strong> olur? Cevabın tamamı tek bir denklemde:
<strong>1/f = 1/a + 1/b</strong>.`,

/* ------------------------------------------------------------- Kavram */
kavram: `
<h3>Ayna denklemi</h3>
<div class="formul" style="max-width:300px;margin:14px 0;border-top-color:var(--accent)">
  <div class="fm" style="color:var(--accent)">1/f = 1/a + 1/b</div>
  <div class="fm-ad">b = a·f / (a − f)</div>
</div>
<table class="degisken-tablo">
  <thead><tr><th>Simge</th><th>Anlamı</th><th>İşaret kuralı</th></tr></thead>
  <tbody>
    <tr><td class="sembol">a</td><td>Cismin aynaya uzaklığı</td><td><strong>daima +</strong></td></tr>
    <tr><td class="sembol">b</td><td>Görüntünün aynaya uzaklığı</td><td>+ ⟹ önde, <strong>gerçek</strong><br>− ⟹ arkada, <strong>sanal</strong></td></tr>
    <tr><td class="sembol">f</td><td>Odak uzaklığı</td><td>+ ⟹ <strong>çukur</strong><br>− ⟹ <strong>tümsek</strong></td></tr>
  </tbody>
</table>

<h3 style="margin-top:22px">Büyütme</h3>
<div class="formul" style="max-width:280px;margin:14px 0">
  <div class="fm">Büyütme = |b / a| = görüntü boyu / cisim boyu</div>
</div>
<p>Büyütme 1&rsquo;den büyükse görüntü büyük, küçükse küçük, tam 1 ise eşittir.</p>

<div class="kutu puf" style="margin:16px 0">
  <div class="kutu-bas"><span class="ikon">🔑</span><span>Tek cümlelik kural</span></div>
  <p style="margin:0"><strong>Gerçek görüntü daima TERS, sanal görüntü daima DÜZDÜR.</strong>
  Bunu bilirsen “ters mi düz mü?” sorusunu ayrı hesaplamana gerek kalmaz — b&rsquo;nin
  işaretine bakman yeter.</p>
</div>

<h3 style="margin-top:22px">Çukur aynada beş durum</h3>
<p>Aşağıdaki tablo bu konunun <strong>tamamıdır</strong>. Simülasyonda “Otomatik tur”
düzeneğini çalıştır; cisim uzaktan yaklaşırken bu beş satırı sırayla göreceksin.</p>
<table class="degisken-tablo">
  <thead><tr><th>Cismin yeri</th><th>Görüntünün yeri</th><th>Cins</th><th>Yön</th><th>Boy</th></tr></thead>
  <tbody>
    <tr><td>Sonsuzda</td><td>F&rsquo;de</td><td>gerçek</td><td>ters</td><td>nokta</td></tr>
    <tr><td>M&rsquo;nin dışında</td><td>F ile M arasında</td><td>gerçek</td><td>ters</td><td>küçük</td></tr>
    <tr><td><strong>M&rsquo;de</strong></td><td><strong>M&rsquo;de</strong></td><td>gerçek</td><td>ters</td><td><strong>eşit</strong></td></tr>
    <tr><td>F ile M arasında</td><td>M&rsquo;nin dışında</td><td>gerçek</td><td>ters</td><td>büyük</td></tr>
    <tr><td><strong>F&rsquo;de</strong></td><td>sonsuzda</td><td colspan="3"><strong>görüntü oluşmaz</strong></td></tr>
    <tr><td>F ile ayna arasında</td><td>aynanın arkasında</td><td>sanal</td><td>düz</td><td>büyük</td></tr>
  </tbody>
</table>

<div class="kutu dikkat" style="margin:16px 0">
  <div class="kutu-bas"><span class="ikon">⚠</span><span>Cisim ve görüntü yer değiştirir</span></div>
  <p style="margin:0">Tabloya dikkatli bak: cisim M&rsquo;nin dışındayken görüntü F–M arasında,
  cisim F–M arasındayken görüntü M&rsquo;nin dışında. Bu bir tesadüf değil —
  <strong>a ile b denklemde simetriktir</strong>. Cismi görüntünün yerine koyarsan
  görüntü cismin yerine gelir. Buna <strong>eşlenik noktalar</strong> denir.</p>
</div>

<h3 style="margin-top:22px">Tümsek aynada tek durum</h3>
<p>Tümsek aynada f negatiftir. O zaman <code>a − f = a + |f|</code> daima
<strong>a&rsquo;dan büyüktür</strong>, dolayısıyla:</p>
<div class="formul" style="max-width:360px;margin:14px 0">
  <div class="fm">|b| = a·|f| / (a + |f|) &lt; |f| &lt; a</div>
</div>
<p>Yani b <strong>her zaman negatif</strong> ve <strong>a&rsquo;dan küçük</strong>.
Sonuç: cisim nerede olursa olsun görüntü <strong>sanal · düz · küçük</strong>.
Tümsek ayna beş durumu olmayan, tek davranışlı bir aynadır.</p>`,

/* ---------------------------------------------------------- Formüller */
formuller: {
  liste: [
    { fm: '1/f = 1/a + 1/b',       aciklama: 'Ayna denklemi' },
    { fm: 'b = a·f / (a − f)',     aciklama: 'b için çözülmüş hâli' },
    { fm: 'Büyütme = |b/a|',       aciklama: 'Görüntü boyu / cisim boyu' },
    { fm: 'f = R/2',               aciklama: 'Odak uzaklığı' },
    { fm: 'b > 0 ⟹ gerçek · ters', aciklama: 'Görüntü aynanın önünde' },
    { fm: 'b < 0 ⟹ sanal · düz',   aciklama: 'Görüntü aynanın arkasında' }
  ],
  degiskenler: [
    { sembol: 'a', ad: 'Cisim uzaklığı',    birim: 'cm' },
    { sembol: 'b', ad: 'Görüntü uzaklığı',  birim: 'cm' },
    { sembol: 'f', ad: 'Odak uzaklığı',     birim: 'cm' },
    { sembol: 'R', ad: 'Eğrilik yarıçapı',  birim: 'cm' }
  ]
},

/* ------------------------------------------------------------ Türetim */
turetim: {
  yollar: [
    {
      ad: 'Ayna denkleminin çıkarılışı',
      adimlar: [
        { baslik: 'İki özel ışın çiz',
          html: `<p>Cismin tepesinden iki ışın gönderelim: biri <strong>eksene paralel</strong>
                 (odaktan geçerek yansır), biri <strong>tepe noktasına</strong>
                 (eksene göre simetrik yansır).</p>` },

        { baslik: 'Birinci benzerlik',
          html: `<p>Tepe noktasına gelen ışın, aynada eksenle eşit açı yapar. Cisim üçgeni
                 ile görüntü üçgeni <strong>benzerdir</strong>:</p>
                 <div class="formul" style="max-width:240px">
                   <div class="fm">h′ / h = b / a</div>
                 </div>
                 <p>İşte <strong>büyütme</strong> formülü buradan gelir.</p>` },

        { baslik: 'İkinci benzerlik',
          html: `<p>Eksene paralel gelip odaktan geçen ışın için, odak civarındaki iki üçgen
                 de benzerdir:</p>
                 <div class="formul" style="max-width:280px">
                   <div class="fm">h′ / h = (b − f) / f</div>
                 </div>` },

        { baslik: 'İkisini eşitle',
          html: `<div class="formul" style="max-width:280px">
                   <div class="fm">b / a = (b − f) / f</div>
                 </div>
                 <p>İçler dışlar çarpımı:</p>
                 <div class="formul" style="max-width:240px">
                   <div class="fm">b·f = a·b − a·f</div>
                 </div>` },

        { baslik: 'Düzenle',
          html: `<p>Her iki yanı <code>a·b·f</code>&rsquo;ye bölelim:</p>
                 <div class="formul" style="max-width:260px">
                   <div class="fm">1/a = 1/f − 1/b</div>
                 </div>
                 <div class="formul" style="max-width:260px;border-top-color:var(--accent)">
                   <div class="fm" style="color:var(--accent)">1/f = 1/a + 1/b</div>
                 </div>` }
      ]
    },
    {
      ad: 'Tümsek ayna neden hep küçültür?',
      adimlar: [
        { baslik: 'f’yi negatif yaz',
          html: `<p>Tümsek aynada odak arkadadır, yani <code>f = −|f|</code>. Denklemde
                 yerine koyalım:</p>
                 <div class="formul" style="max-width:320px">
                   <div class="fm">b = a·(−|f|) / (a − (−|f|)) = −a|f| / (a + |f|)</div>
                 </div>` },

        { baslik: 'İşarete bak',
          html: `<p>Pay negatif, payda pozitif (a ve |f| daima pozitif) ⟹
                 <strong>b daima negatiftir</strong>.</p>
                 <p>b &lt; 0 ⟹ görüntü <strong>sanal ve düz</strong>. Cismin yeri hiç
                 fark etmiyor.</p>` },

        { baslik: 'Büyüklüğe bak',
          html: `<div class="formul" style="max-width:300px">
                   <div class="fm">|b| / a = |f| / (a + |f|)</div>
                 </div>
                 <p>Payda <code>a + |f|</code>, paydan <code>|f|</code> daima büyüktür
                 (çünkü a &gt; 0):</p>
                 <div class="formul" style="max-width:240px;border-top-color:var(--accent)">
                   <div class="fm" style="color:var(--accent)">Büyütme &lt; 1 · daima</div>
                 </div>` },

        { baslik: 'Sınır durumları',
          html: `<p>a → 0 ise büyütme → 1 (aynaya yapıştırınca gerçek boyuta yaklaşır).
                 <br>a → ∞ ise büyütme → 0 ve <code>b → −|f|</code>: çok uzaktaki
                 cisimlerin görüntüsü sanal odakta, nokta gibi oluşur.</p>
                 <p>Bu yüzden otopark aynasında uzaktaki araba minicik görünür ama
                 <strong>görüş alanı devasadır</strong>.</p>` }
      ]
    },
    {
      ad: 'a = 2f ise neden b = 2f?',
      adimlar: [
        { baslik: 'Yerine koy',
          html: `<div class="formul" style="max-width:320px">
                   <div class="fm">b = a·f/(a−f) = 2f·f/(2f−f) = 2f²/f = 2f</div>
                 </div>` },

        { baslik: 'Anlamı',
          html: `<p>Cisim M&rsquo;deyse görüntü de M&rsquo;de oluşur. Büyütme
                 <code>|2f/2f| = 1</code> ⟹ <strong>boylar eşit</strong>.</p>` },

        { baslik: 'Neden önemli?',
          html: `<p>Bu, çukur aynanın <strong>tek</strong> eşit-boy noktasıdır ve beş
                 durumu ikiye ayıran sınırdır:</p>
                 <ul>
                   <li>a &gt; 2f ⟹ görüntü <strong>küçük</strong></li>
                   <li>a = 2f ⟹ görüntü <strong>eşit</strong></li>
                   <li>f &lt; a &lt; 2f ⟹ görüntü <strong>büyük</strong></li>
                 </ul>
                 <p>Soruda “görüntü cisimle aynı boyda” deniyorsa cisim M&rsquo;dedir;
                 başka hesaba gerek yok.</p>` }
      ]
    }
  ]
},

/* -------------------------------------------------------- Simülasyon */
sim: F.simler['kuresel-goruntu'],

/* ------------------------------------------------------- Püf noktası */
puf: {
  html: `
    <p><strong>1 · İşareti f&rsquo;ye yükle.</strong> Tek bir denklem ezberle
    (<code>1/f = 1/a + 1/b</code>), tümsek aynada f&rsquo;yi negatif koy. Ayrı formül
    ezberlemeye gerek yok, işaretler her şeyi halleder.</p>

    <p><strong>2 · b&rsquo;nin işareti = görüntünün cinsi.</strong>
    <code>b &gt; 0</code> ⟹ gerçek + ters. <code>b &lt; 0</code> ⟹ sanal + düz.
    Bu ikisi ayrılmaz, biri diğerini getirir.</p>

    <p><strong>3 · Sınırları ezberle, ara değerleri hesaplama.</strong>
    “Görüntü cisimle eşit boyda” ⟹ a = 2f = R. “Görüntü oluşmadı” ⟹ a = f.
    Bu iki cümle çoğu soruyu tek satırda bitirir.</p>

    <p><strong>4 · Tümsek ayna kısayolu.</strong> Sorunun tümsek ayna olduğunu görür görmez
    cevabı biliyorsun: <strong>sanal · düz · küçük</strong>. Geriye sadece sayı hesabı
    kalır.</p>

    <p><strong>5 · Büyütme verilmişse b&rsquo;yi oradan çek.</strong> “Görüntü 3 kat büyük”
    ⟹ <code>|b| = 3a</code>. Gerçekse b = 3a, sanalsa b = −3a. İki durumu da dene;
    genelde biri tutarsız çıkar.</p>

    <p><strong>6 · Paydaya dikkat.</strong> <code>b = af/(a−f)</code> formülünde payda
    <code>a − f</code>&rsquo;dir, <code>f − a</code> değil. İşaret hatası en çok burada
    yapılır.</p>

    <p><strong>7 · Eşlenik noktalar.</strong> a ile b denklemde yer değiştirebilir.
    “Cisim 30 cm&rsquo;de, görüntü 60 cm&rsquo;de” ise, cismi 60&rsquo;a koyunca görüntü
    30&rsquo;da oluşur. Bu, iki bilinmeyenli sorularda zaman kazandırır.</p>

    <p><strong>8 · Gerçek görüntü perdeye düşer, sanal düşmez.</strong> Soruda “perdede
    görüntü elde edildi” deniyorsa görüntü <strong>gerçek</strong>, dolayısıyla
    <strong>ters</strong> ve ayna <strong>çukur</strong>dur. Üç bilgi tek cümleden.</p>`
},

/* ----------------------------------------------------- Zorlayıcı sorular */
osym: [
  {
    baslik: 'Perdedeki görüntü',
    kaynak: 'Çok adımlı',
    govde: `
      <p>Bir çukur ayna önüne konan cismin görüntüsü, aynadan <strong>60 cm</strong>
      uzaktaki bir perdede <strong>net</strong> olarak elde ediliyor. Görüntünün boyu
      cismin boyunun <strong>2 katıdır</strong>.</p>
      <p>Buna göre aynanın <strong>eğrilik yarıçapı</strong> kaç cm&rsquo;dir?</p>`,
    gorsel: `
      <svg viewBox="0 0 520 210" xmlns="http://www.w3.org/2000/svg" role="img"
           aria-label="Çukur ayna, cisim ve perdede oluşan iki kat büyük ters görüntü">
        <rect width="520" height="210" fill="#0E1726"/>
        <path d="M20 110 H500" stroke="#4A5F86" stroke-width="1.4" stroke-dasharray="7 5"/>
        <path d="M452 34 A 170 170 0 0 0 452 186" fill="none" stroke="#8FB6EC" stroke-width="4"/>
        <circle cx="452" cy="110" r="4" fill="#EAF0FA"/>
        <text x="452" y="99" fill="#EAF0FA" font-size="12" font-family="system-ui" text-anchor="middle" font-weight="700">T</text>
        <path d="M362 110 V78" stroke="#35C08A" stroke-width="3.4"/>
        <path d="M362 74 l-5 11 h10 Z" fill="#35C08A"/>
        <text x="362" y="128" fill="#35C08A" font-size="11" font-family="system-ui" text-anchor="middle">cisim (h)</text>
        <rect x="176" y="34" width="6" height="150" fill="#5A5245"/>
        <path d="M179 110 V174" stroke="#FF6B6B" stroke-width="3.4"/>
        <path d="M179 178 l-5 -11 h10 Z" fill="#FF6B6B"/>
        <text x="179" y="26" fill="#FF6B6B" font-size="11" font-family="system-ui" text-anchor="middle">perde · görüntü 2h · TERS</text>
        <path d="M179 194 H452" stroke="#FF6B6B" stroke-width="1.2"/>
        <text x="315" y="206" fill="#FF6B6B" font-size="11" font-family="system-ui" text-anchor="middle">b = 60 cm</text>
      </svg>`,
    secenekler: [
      '40 cm',
      '20 cm',
      '60 cm',
      '80 cm',
      '30 cm'
    ],
    dogru: 0,
    cozum: `
      <p><strong>1. Perde bilgisini oku.</strong> Görüntü perdede elde edildiyse
      <strong>gerçektir</strong> ⟹ <code>b = +60 cm</code> (ve görüntü terstir).</p>

      <p><strong>2. Büyütmeden a&rsquo;yı bul.</strong></p>
      <div class="formul" style="max-width:300px;margin:10px 0">
        <div class="fm">|b/a| = 2 ⟹ a = b/2 = 60/2 = <strong>30 cm</strong></div>
      </div>

      <p><strong>3. Ayna denklemine koy.</strong></p>
      <div class="formul" style="max-width:340px;margin:10px 0">
        <div class="fm">1/f = 1/30 + 1/60 = 2/60 + 1/60 = 3/60 = 1/20</div>
      </div>
      <div class="formul" style="max-width:220px;margin:10px 0">
        <div class="fm">f = <strong>20 cm</strong></div>
      </div>

      <p><strong>4. Soru f&rsquo;yi değil R&rsquo;yi istiyor.</strong></p>
      <div class="formul" style="max-width:280px;margin:10px 0;border-top-color:var(--accent)">
        <div class="fm" style="color:var(--accent)">R = 2f = <strong>40 cm</strong></div>
      </div>

      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>B şıkkı (20 cm)</strong> tam da bu sorunun kurduğu tuzak:
        f&rsquo;yi doğru buluyorsun ve orada duruyorsun. Soru <strong>eğrilik yarıçapını</strong>
        istiyor. Son satırı okumayan bu soruyu kaybeder.
        <br><strong>Tutarlılık kontrolü:</strong> a = 30, f = 20 ⟹ cisim F (20) ile M (40)
        arasında ⟹ görüntü gerçek, ters, büyük olmalı ✓ Soru “2 kat büyük” diyor, uyuyor.
        <br><strong>Simülasyonda:</strong> f = 20, a = 30 yap; okumalarda b = 60 ve
        büyütme = 2 çıkacak.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: A</strong></p>`
  },
  {
    baslik: 'İki çözümlü büyütme',
    kaynak: 'İşaret ayrımı',
    govde: `
      <p>Odak uzaklığı <strong>15 cm</strong> olan bir çukur ayna önüne konan bir cismin
      görüntüsü, cismin boyunun <strong>3 katı</strong> büyüklüktedir.</p>
      <p>Cismin aynaya uzaklığı kaç cm olabilir?</p>`,
    secenekler: [
      '10 cm veya 20 cm',
      'Yalnız 20 cm',
      'Yalnız 10 cm',
      '5 cm veya 45 cm',
      '20 cm veya 45 cm'
    ],
    dogru: 0,
    cozum: `
      <p>“3 kat büyük” demek <code>|b| = 3a</code> demektir. Görüntü <strong>gerçek</strong>
      da olabilir, <strong>sanal</strong> da — ikisini de denemek gerekir.</p>

      <p><strong>Durum 1 — gerçek görüntü (b = +3a, ters):</strong></p>
      <div class="formul" style="max-width:360px;margin:10px 0">
        <div class="fm">1/15 = 1/a + 1/(3a) = 4/(3a) ⟹ 3a = 60 ⟹ a = <strong>20 cm</strong></div>
      </div>
      <p>Kontrol: a = 20, f = 15 ⟹ F (15) ile M (30) arasında ⟹ gerçek, ters, büyük ✓
      b = 3·20 = 60 cm.</p>

      <p><strong>Durum 2 — sanal görüntü (b = −3a, düz):</strong></p>
      <div class="formul" style="max-width:380px;margin:10px 0">
        <div class="fm">1/15 = 1/a − 1/(3a) = 2/(3a) ⟹ 3a = 30 ⟹ a = <strong>10 cm</strong></div>
      </div>
      <p>Kontrol: a = 10 &lt; f = 15 ⟹ cisim F ile ayna arasında ⟹ sanal, düz, büyük ✓
      b = −30 cm.</p>

      <div class="formul" style="max-width:280px;margin:12px 0;border-top-color:var(--accent)">
        <div class="fm" style="color:var(--accent)">a = 10 cm veya a = 20 cm</div>
      </div>

      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>Bu sorunun tamamı tek bir kelimede saklı:</strong>
        “3 kat büyük” denmiş ama <em>ters mi düz mü</em> denmemiş. Söylenmediğine göre
        <strong>iki durum da geçerlidir</strong>. Soru “3 kat büyük ve ters” deseydi cevap
        yalnız 20, “3 kat büyük ve düz” deseydi yalnız 10 olurdu.
        <br><strong>Genel kural:</strong> Çukur aynada belli bir büyütme değeri
        <strong>iki</strong> cisim konumundan elde edilir — biri F&rsquo;nin içinde
        (sanal), biri F ile M arasında (gerçek).
        <br><strong>Simülasyonda:</strong> f = 15 sabit tutup a&rsquo;yı 10 ve 20 yap;
        büyütme okumasının her ikisinde de 3,000 olduğunu gör.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: A</strong></p>`
  }
],

/* --------------------------------------------- Bağlam temelli sorular */
baglam: [
  {
    baslik: 'Makyaj aynası neden büyütüyor?',
    govde: `
      <p>Makyaj ve tıraş aynaları yüzü <strong>büyük ve düz</strong> gösterir. Bu aynalar
      <strong>çukurdur</strong> ve tipik olarak odak uzaklıkları <strong>25–40 cm</strong>
      arasındadır.</p>
      <p>Bir öğrenci evdeki makyaj aynasıyla deney yapıyor: aynayı yüzünden yavaşça
      uzaklaştırdığında görüntü önce büyüyor, sonra <strong>bulanıklaşıp kayboluyor</strong>,
      daha da uzaklaştırınca <strong>baş aşağı</strong> geri geliyor.</p>
      <p><strong>Üç aşamayı da açıkla. Odak uzaklığı 30 cm ise yüz hangi uzaklıkta
      olmalı?</strong></p>`,
    gorsel: `
      <svg viewBox="0 0 520 220" xmlns="http://www.w3.org/2000/svg" role="img"
           aria-label="Çukur aynada yüz odak içindeyken büyük düz, odakta kaybolan, odak dışında ters görüntü">
        <rect width="520" height="220" fill="#17223A"/>
        <line x1="173" y1="14" x2="173" y2="206" stroke="#2E3C57" stroke-width="1.4"/>
        <line x1="347" y1="14" x2="347" y2="206" stroke="#2E3C57" stroke-width="1.4"/>
        <text x="87" y="28" fill="#35C08A" font-size="11" font-family="system-ui" text-anchor="middle" font-weight="700">a &lt; f</text>
        <text x="260" y="28" fill="#FFB020" font-size="11" font-family="system-ui" text-anchor="middle" font-weight="700">a = f</text>
        <text x="434" y="28" fill="#FF6B6B" font-size="11" font-family="system-ui" text-anchor="middle" font-weight="700">a &gt; f</text>
        <path d="M30 60 A 60 60 0 0 1 30 150" fill="none" stroke="#8FB6EC" stroke-width="3.4"/>
        <circle cx="110" cy="105" r="11" fill="#E8C9A8"/>
        <circle cx="146" cy="105" r="19" fill="#E8C9A8" opacity=".55"/>
        <text x="87" y="190" fill="#35C08A" font-size="11" font-family="system-ui" text-anchor="middle">sanal · düz · BÜYÜK</text>
        <path d="M204 60 A 60 60 0 0 1 204 150" fill="none" stroke="#8FB6EC" stroke-width="3.4"/>
        <circle cx="284" cy="105" r="11" fill="#E8C9A8"/>
        <path d="M300 82 H330 M300 105 H330 M300 128 H330" stroke="#FFB020" stroke-width="1.8"/>
        <text x="260" y="190" fill="#FFB020" font-size="11" font-family="system-ui" text-anchor="middle">ışınlar paralel · görüntü yok</text>
        <path d="M378 60 A 60 60 0 0 1 378 150" fill="none" stroke="#8FB6EC" stroke-width="3.4"/>
        <circle cx="474" cy="105" r="11" fill="#E8C9A8"/>
        <circle cx="428" cy="105" r="8" fill="#FF6B6B" opacity=".75"/>
        <path d="M428 97 V113" stroke="#FF6B6B" stroke-width="2"/>
        <text x="434" y="190" fill="#FF6B6B" font-size="11" font-family="system-ui" text-anchor="middle">gerçek · TERS</text>
      </svg>`,
    adimlar: [
      { bas: 'Aşama 1 — yüz odağın içinde',
        metin: '<code>a &lt; f</code> ⟹ <code>a − f &lt; 0</code> ⟹ <code>b &lt; 0</code>: görüntü <strong>sanal, düz ve büyük</strong>. Makyaj aynasının kullanıldığı bölge burasıdır.' },
      { bas: 'Uzaklaştıkça neden büyüyor?',
        metin: 'Büyütme <code>|b/a| = f/(f−a)</code>. a, f&rsquo;ye yaklaştıkça payda küçülür ve büyütme <strong>hızla artar</strong>. a = 20, f = 30 için 3 kat; a = 25 için 6 kat.' },
      { bas: 'Aşama 2 — yüz tam odakta',
        metin: '<code>a = f</code> ⟹ payda sıfır. Yansıyan ışınlar <strong>paralel</strong> çıkar, hiçbir yerde kesişmez ⟹ <strong>görüntü oluşmaz</strong>. Öğrencinin gördüğü “bulanıklaşıp kaybolma” tam olarak budur.' },
      { bas: 'Aşama 3 — yüz odağın dışında',
        metin: '<code>a &gt; f</code> ⟹ <code>b &gt; 0</code>: görüntü <strong>gerçek ve ters</strong>. Baş aşağı görünmesinin sebebi budur — gerçek görüntü daima terstir.' },
      { bas: 'Sayı: f = 30 cm',
        metin: 'Yüz aynaya <strong>30 cm&rsquo;den yakın</strong> olmalı. 20 cm&rsquo;de: <code>b = 20·30/(20−30) = −60 cm</code>, büyütme <code>60/20 = 3 kat</code>, sanal ve düz ✓' },
      { bas: 'Tasarım sonucu',
        metin: 'Bu yüzden makyaj aynalarının odak uzaklığı <strong>kullanım mesafesinden büyük</strong> seçilir. f küçük olsaydı (çok bükey ayna) yüz sürekli odağın dışında kalır, görüntü ters gelirdi.' }
    ],
    secenekler: [
      'a < f sanal-düz-büyük, a = f görüntü oluşmaz, a > f gerçek-ters; f = 30 cm ise yüz 30 cm’den yakın olmalı',
      'Her üç durumda da görüntü sanaldır, yalnızca boyu değişir',
      'a < f ters, a > f düz görüntü oluşur; uzaklığın önemi yoktur',
      'Görüntünün kaybolması aynanın kirlenmesindendir',
      'Makyaj aynası tümsektir, bu yüzden büyütür'
    ],
    dogru: 0,
    cozum: `
      <div class="formul" style="max-width:340px;margin:10px 0;border-top-color:var(--accent)">
        <div class="fm" style="color:var(--accent)">a = 20, f = 30 ⟹ b = −60 cm, büyütme 3×</div>
      </div>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>E şıkkı</strong> sık görülen bir karışıklık: tümsek ayna
        <em>asla</em> büyütmez. Büyüten tek küresel ayna, cismi odağının içinde tutan
        <strong>çukur</strong> aynadır.
        <br><strong>Kendin dene:</strong> Bir çelik kaşığın iç yüzüne bak ve yavaşça
        uzaklaştır. Görüntü büyür, kaybolur, ters döner — üç aşamayı da 20 saniyede
        görürsün. Kaşığın odak uzaklığı birkaç cm olduğu için geçişler çok hızlıdır.
        <br><strong>Simülasyonda:</strong> “Otomatik tur” düzeneğini çalıştır; cisim
        uzaktan yaklaşırken bu üç aşamayı ters sırada izleyeceksin.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: A</strong></p>`
  },
  {
    baslik: 'Newton teleskobu ve gökyüzü',
    govde: `
      <p>Bir amatör astronom, <strong>çukur aynalı</strong> (Newton tipi) teleskopla
      Ay&rsquo;ı gözlüyor. Teleskobun ana aynasının odak uzaklığı <strong>120 cm</strong>.</p>
      <p>Ay, Dünya&rsquo;dan yaklaşık <strong>384 000 km</strong> uzakta.</p>
      <p><strong>Ay&rsquo;ın görüntüsü aynadan kaç cm uzakta oluşur? Görüntü gerçek mi
      sanal mı, düz mü ters? Neden bu görüntüye doğrudan bakılmaz da bir mercekle
      büyütülür?</strong></p>`,
    gorsel: `
      <svg viewBox="0 0 520 210" xmlns="http://www.w3.org/2000/svg" role="img"
           aria-label="Newton teleskobunda çukur ana aynanın Ay görüntüsünü odakta oluşturması">
        <rect width="520" height="210" fill="#0E1726"/>
        <path d="M20 108 H500" stroke="#4A5F86" stroke-width="1.4" stroke-dasharray="7 5"/>
        <path d="M458 26 A 190 190 0 0 0 458 190" fill="none" stroke="#8FB6EC" stroke-width="5"/>
        <text x="472" y="204" fill="#8FB6EC" font-size="11" font-family="system-ui" text-anchor="end">ana ayna</text>
        <path d="M30 44 H452 M30 76 H448 M30 108 H446 M30 140 H448 M30 172 H452"
              stroke="#FFB020" stroke-width="1.6"/>
        <path d="M452 44 L268 108 M448 76 L268 108 M446 108 L268 108 M448 140 L268 108 M452 172 L268 108"
              stroke="#FFB020" stroke-width="1.6"/>
        <circle cx="268" cy="108" r="10" fill="#FFE9A8" opacity=".3"/>
        <circle cx="268" cy="108" r="4" fill="#FF6B6B"/>
        <text x="268" y="94" fill="#FF6B6B" font-size="12" font-family="system-ui" text-anchor="middle" font-weight="700">F</text>
        <text x="268" y="132" fill="#FF6B6B" font-size="11" font-family="system-ui" text-anchor="middle">gerçek · ters · küçük</text>
        <circle cx="48" cy="26" r="13" fill="#D8DEE8"/>
        <text x="48" y="54" fill="#D8DEE8" font-size="11" font-family="system-ui" text-anchor="middle">Ay</text>
      </svg>`,
    adimlar: [
      { bas: 'a ne kadar büyük?',
        metin: '<code>a = 384 000 km = 3,84×10<sup>10</sup> cm</code>. Odak uzaklığı ise sadece 120 cm. Yani <code>a</code>, <code>f</code>&rsquo;den <strong>300 milyon kat</strong> büyük.' },
      { bas: 'Denklemi sadeleştir',
        metin: '<code>1/b = 1/f − 1/a</code>. Burada <code>1/a</code> öyle küçük ki (<code>2,6×10<sup>−11</sup></code>) <code>1/f</code> (<code>0,00833</code>) yanında <strong>tamamen ihmal edilir</strong>.' },
      { bas: 'Sonuç',
        metin: '<code>b ≈ f = <strong>120 cm</strong></code>. Sonsuzdaki cismin görüntüsü <strong>odakta</strong> oluşur. Tam hesap 120,0000004 cm verir — fark bir mikronun altında.' },
      { bas: 'Görüntünün cinsi',
        metin: '<code>b &gt; 0</code> ⟹ <strong>gerçek</strong> ve <strong>ters</strong>. Astronomik teleskoplarda görüntünün ters olması sorun değildir; gökyüzünde “yukarı” diye bir yön yok.' },
      { bas: 'Boyu ne kadar?',
        metin: 'Büyütme <code>|b/a| = 120/3,84×10<sup>10</sup> ≈ 3,1×10<sup>−9</sup></code>. Ay&rsquo;ın 3474 km çapı bu oranla <code>≈ 1,1 cm</code>&rsquo;lik bir görüntüye iner.' },
      { bas: 'Neden mercek gerekiyor?',
        metin: 'Odakta oluşan bu görüntü <strong>1 cm</strong> civarında ve gözün en yakın net görme uzaklığı 25 cm. Çıplak gözle bakınca ayrıntı seçilmez. Bu yüzden odağa bir <strong>göz merceği</strong> yerleştirilir ve gerçek görüntü bir büyüteç gibi büyütülerek incelenir.' }
    ],
    secenekler: [
      'b ≈ 120 cm (odakta), gerçek ve ters; görüntü yaklaşık 1 cm olduğu için göz merceğiyle büyütülür',
      'b sonsuzdadır, görüntü oluşmaz',
      'b ≈ 240 cm, sanal ve düz',
      'b ≈ 60 cm, gerçek ve düz',
      'Ay çok uzakta olduğu için ayna denklemi uygulanamaz'
    ],
    dogru: 0,
    cozum: `
      <div class="formul" style="max-width:360px;margin:10px 0">
        <div class="fm">a → ∞ ⟹ 1/a → 0 ⟹ 1/b = 1/f ⟹ <strong>b = f</strong></div>
      </div>
      <p>Bu, “sonsuzdaki cismin görüntüsü odaktadır” kuralının ta kendisidir — 3.3&rsquo;te
      güneş fırınında kullandığımız kuralın aynısı.</p>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>C şıkkı (240 cm)</strong> b = 2f = R sanıyor; bu
        yalnızca cisim M&rsquo;deyken doğrudur, sonsuzda değil.
        <br><strong>E şıkkı</strong> yanlış: denklem her uzaklıkta geçerlidir, yalnızca
        <code>1/a</code> terimi ihmal edilebilir hâle gelir.
        <br><strong>Newton neden ayna kullandı?</strong> Mercekli teleskoplarda renkler
        farklı kırıldığı için görüntünün kenarları renklenir (renk sapması). Ayna,
        <em>tüm</em> renkleri aynı açıyla yansıtır — bu sorun aynada <strong>hiç
        yoktur</strong>. Bu yüzden büyük teleskopların hepsi aynalıdır.
        <br><strong>Ölçek duygusu:</strong> James Webb Uzay Teleskobu&rsquo;nun ana aynası
        6,5 m çapında ve odak uzaklığı yaklaşık 131,4 m&rsquo;dir — aynı denklem, aynı
        mantık.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: A</strong></p>`
  }
]

});
})();
