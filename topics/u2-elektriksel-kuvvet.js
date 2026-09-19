(function () {
"use strict";
const F = window.F11;

/* ==========================================================================
   topics/u2-elektriksel-kuvvet.js
   Konu 2.1 · Elektriksel kuvvet (Coulomb yasası)
   ========================================================================== */

F.konuKaydet('u2-elektriksel-kuvvet', {

ozet: `İki nokta yük birbirine kuvvet uygular: aynı işaretliler iter, zıt işaretliler çeker.
Bu kuvvetin büyüklüğü <strong>yüklerin çarpımıyla doğru</strong>, <strong>aralarındaki
uzaklığın karesiyle ters</strong> orantılıdır. Ünitenin geri kalanı bu tek cümlenin
üzerine kurulur.`,

/* ------------------------------------------------------------- Kavram */
kavram: `
<p>Maddenin temel yapı taşlarından ikisi yüklüdür: <strong>proton (+)</strong> ve
<strong>elektron (−)</strong>. Bir cismin yüklenmesi, proton üretmesi değil
<strong>elektron alıp vermesi</strong> demektir. Elektron veren cisim
<em>pozitif</em>, elektron alan cisim <em>negatif</em> yüklenir.</p>

<p>Yükün birimi <strong>coulomb (C)</strong>&rsquo;dur. Bir elektronun yükü çok küçüktür:</p>

<div class="formul" style="max-width:340px;margin:14px 0">
  <div class="fm">e = 1,6 · 10⁻¹⁹ C</div>
  <div class="fm-ad">Elektronun yük büyüklüğü — yükün en küçük birimi</div>
</div>

<p>Bu yüzden günlük ölçekte <strong>mikrocoulomb</strong> kullanılır:
<code>1 μC = 10⁻⁶ C</code>. Yük, e&rsquo;nin tam katları hâlinde bulunur; buna
<strong>yükün kesikliği</strong> denir: <code>q = n · e</code></p>

<h3 style="margin-top:22px">Coulomb yasası</h3>
<p>1785&rsquo;te Charles-Augustin de Coulomb, burulma terazisi adı verilen çok hassas bir
düzenekle yüklü küreler arasındaki kuvveti ölçtü ve şu sonuca vardı:</p>

<div class="formul" style="max-width:380px;margin:14px 0;border-top-color:var(--accent)">
  <div class="fm" style="color:var(--accent)">F = k · |q₁ · q₂| / d²</div>
  <div class="fm-ad">k = 9 · 10⁹ N·m²/C² (boşlukta ve yaklaşık olarak havada)</div>
</div>

<ul>
  <li><strong>Yüklerle doğru orantılı:</strong> yüklerden biri 2 katına çıkarsa kuvvet de 2 katına çıkar</li>
  <li><strong>Uzaklığın karesiyle ters orantılı:</strong> uzaklık 2 katına çıkarsa kuvvet <strong>dörtte bire</strong> iner</li>
  <li><strong>Kütleye bağlı değildir.</strong> Yüklerin kütlesi formülde yoktur</li>
</ul>

<div class="kutu dikkat" style="margin:16px 0">
  <div class="kutu-bas"><span class="ikon">⚠</span><span>İşaretleri formüle sokma</span></div>
  <p style="margin:0">Formüldeki mutlak değer önemlidir. Yüklerin işaretlerini formüle
  koyup <em>eksi kuvvet</em> bulmaya çalışma. Doğru yöntem: <strong>önce büyüklüğü hesapla</strong>,
  sonra işaretlere bakıp <strong>yönü kendin söyle</strong> — aynı ise itme, zıt ise çekme.</p>
</div>

<h3 style="margin-top:22px">Kuvvet bir vektördür</h3>
<p>Coulomb kuvveti daima <strong>iki yükü birleştiren doğru boyunca</strong>dır. İkiden fazla
yük varsa her biri ayrı ayrı kuvvet uygular ve bunlar <strong>vektörel olarak</strong> toplanır.
Buna <strong>üst üste binme (süperpozisyon)</strong> ilkesi denir.</p>

<div class="kutu nott" style="margin:16px 0">
  <div class="kutu-bas"><span class="ikon">⚖</span><span>Newton III burada da geçerli</span></div>
  <p style="margin:0">q₁ yükü q₂&rsquo;ye ne kadar kuvvet uygularsa, q₂ de q₁&rsquo;e
  <strong>tam olarak o kadar</strong> kuvvet uygular; yönleri zıttır. Yüklerden biri
  diğerinin beş katı olsa bile bu değişmez — formülde ikisinin
  <strong>çarpımı</strong> vardır, o da tek bir sayıdır. Simülasyonda iki oku
  karşılaştır: boyları hep eşittir.</p>
</div>

<h3 style="margin-top:22px">Kütle çekimiyle karşılaştırma</h3>
<p>İki yasa şaşırtıcı derecede benzerdir; ikisi de ters karedir. Ama iki temel fark vardır:</p>
<table class="degisken-tablo">
  <thead><tr><th></th><th>Kütle çekimi</th><th>Elektriksel kuvvet</th></tr></thead>
  <tbody>
    <tr><td>Kaynak</td><td>kütle</td><td>yük</td></tr>
    <tr><td>Yön</td><td>daima <strong>çekme</strong></td><td>çekme <em>veya</em> itme</td></tr>
    <tr><td>Şiddet</td><td>çok zayıf</td><td class="sembol">≈ 10³⁶ kat daha güçlü</td></tr>
  </tbody>
</table>
<p style="margin-top:10px;color:var(--text-2)">İki elektron arasındaki elektriksel itme,
kütle çekimlerinden yaklaşık 10³⁶ kat büyüktür. Gezegenleri kütle çekimi tutar çünkü
gök cisimleri <strong>nötrdür</strong> — artı ve eksi yükleri birbirini götürür.</p>`,

/* ---------------------------------------------------------- Formüller */
formuller: {
  liste: [
    { fm: 'F = k · |q₁·q₂| / d²', aciklama: 'Coulomb yasası — iki nokta yük arasındaki kuvvet' },
    { fm: 'k = 9 · 10⁹ N·m²/C²',  aciklama: 'Coulomb sabiti (boşluk ve hava)' },
    { fm: 'q = n · e',            aciklama: 'Yük kesiklidir; e = 1,6·10⁻¹⁹ C' },
    { fm: '1 μC = 10⁻⁶ C',        aciklama: 'Soruların çoğu μC verir, SI’ye çevir' },
    { fm: 'q′ = (q₁ + q₂) / 2',   aciklama: 'ÖZDEŞ küreler dokundurulup ayrılırsa yükler eşitlenir' }
  ],
  degiskenler: [
    { sembol: 'F', ad: 'Elektriksel kuvvet', birim: 'N' },
    { sembol: 'q', ad: 'Yük',                birim: 'C' },
    { sembol: 'd', ad: 'Yükler arası uzaklık', birim: 'm' },
    { sembol: 'k', ad: 'Coulomb sabiti',     birim: 'N·m²/C²' },
    { sembol: 'e', ad: 'Elektronun yükü',    birim: 'C' },
    { sembol: 'n', ad: 'Elektron sayısı',    birim: 'tane' }
  ]
},

/* ------------------------------------------------------------ Türetim */
turetim: {
  yollar: [
    {
      ad: 'Ters kare nereden geliyor?',
      adimlar: [
        { baslik: 'Etkinin yayıldığını düşün',
          html: `<p>Bir yükün çevresine olan etkisini, merkezden her yöne eşit olarak yayılan
                 bir şey gibi düşün. Bu etki uzaklaştıkça yok olmaz, ama
                 <strong>daha geniş bir yüzeye dağılır</strong>.</p>` },

        { baslik: 'Yüzeyin ne kadar büyüdüğüne bak',
          html: `<p>Merkezden d uzaklıktaki küresel yüzeyin alanı:</p>
                 <div class="formul" style="max-width:220px"><div class="fm">A = 4π·d²</div></div>
                 <p>Uzaklık <strong>2 katına</strong> çıkınca alan <strong>4 katına</strong> çıkar.
                 Aynı etki 4 kat geniş yüzeye dağılır.</p>` },

        { baslik: 'Sonucu oku',
          html: `<p>Birim alana düşen etki, alanla ters orantılıdır:</p>
                 <div class="formul" style="max-width:260px;border-top-color:var(--accent)">
                   <div class="fm" style="color:var(--accent)">etki ∝ 1 / d²</div>
                 </div>
                 <p>Ters kare yasası buradan gelir. Aynı geometri ışık şiddeti (3. ünite) ve
                 kütle çekimi için de geçerlidir — üçü de noktadan her yöne yayılır.</p>` },

        { baslik: 'Yüklerin çarpımını ekle',
          html: `<p>q₁ iki katına çıkarsa etki iki katına, q₂ iki katına çıkarsa yine iki katına
                 çıkar. İkisi birden çarpan olarak girer:</p>
                 <div class="formul" style="max-width:300px"><div class="fm">F ∝ q₁·q₂ / d²</div></div>
                 <p>Orantıyı eşitliğe çeviren sabit <strong>k</strong>&rsquo;dir:</p>
                 <div class="formul" style="max-width:300px"><div class="fm">F = k·q₁·q₂ / d²</div></div>` }
      ]
    },
    {
      ad: 'Üç yükte bileşke kuvvet',
      adimlar: [
        { baslik: 'Her yükü ayrı ayrı ele al',
          html: `<p>Üzerindeki kuvveti aradığın yükü seç. Diğer yüklerin her biri ona
                 <strong>tek başınaymış gibi</strong> kuvvet uygular. Bu süperpozisyon ilkesidir:
                 yükler birbirinin etkisini bozmaz.</p>` },

        { baslik: 'Yönleri çiz, sonra hesapla',
          html: `<p>Önce okları çiz — çekme mi itme mi, buna işaretlerden karar ver.
                 <strong>Sonra</strong> büyüklükleri hesapla. Tersini yaparsan işaret hatası
                 yaparsın.</p>` },

        { baslik: 'Aynı doğrultudaysa cebirsel topla',
          html: `<p>Üç yük aynı doğru üzerindeyse iş kolaydır: bir yönü pozitif seç, kuvvetleri
                 işaretleriyle topla.</p>
                 <div class="formul" style="max-width:280px"><div class="fm">F<sub>net</sub> = F₁ ± F₂</div></div>` },

        { baslik: 'Açılıysa bileşenlere ayır',
          html: `<p>Kuvvetler açı yapıyorsa 1. ünitedeki yöntem aynen geçerlidir: x ve y
                 bileşenlerine ayır, ayrı ayrı topla, sonra birleştir.</p>
                 <div class="formul" style="max-width:300px"><div class="fm">F = √(F<sub>x</sub>² + F<sub>y</sub>²)</div></div>
                 <p>Dik iki kuvvet için bu, doğrudan Pisagor&rsquo;dur.</p>` }
      ]
    },
    {
      ad: 'Denge noktası',
      adimlar: [
        { baslik: 'Soruyu anla',
          html: `<p>İki yükün yakınına konan üçüncü bir yükün <strong>hiç kuvvet hissetmediği</strong>
                 nokta aranıyor. Orada iki kuvvet birbirini götürmelidir.</p>` },

        { baslik: 'Nerede olacağını önce KESTIR',
          html: `<ul>
                   <li><strong>Aynı işaretli yükler:</strong> denge noktası <strong>aralarındadır</strong></li>
                   <li><strong>Zıt işaretli yükler:</strong> denge noktası <strong>dışarıdadır</strong>,
                   üstelik <strong>küçük yükün dış tarafında</strong></li>
                 </ul>
                 <p>Her iki durumda da nokta <strong>küçük yüke daha yakındır</strong> — çünkü
                 büyük yükün etkisini dengelemek için ona uzaklaşmak gerekir.</p>` },

        { baslik: 'Denklemi kur',
          html: `<p>Üçüncü yük q₁&rsquo;den x uzaklıkta olsun, yükler arası uzaklık d ise:</p>
                 <div class="formul" style="max-width:320px">
                   <div class="fm">k·q₁·q / x² = k·q₂·q / (d − x)²</div>
                 </div>
                 <p>k ve q sadeleşir — <strong>üçüncü yükün değeri sonucu etkilemez</strong>:</p>
                 <div class="formul" style="max-width:260px;border-top-color:var(--accent)">
                   <div class="fm" style="color:var(--accent)">q₁ / x² = q₂ / (d − x)²</div>
                 </div>` },

        { baslik: 'Karekök alarak çöz',
          html: `<p>İki tarafın da karekökünü al, işlem çok kısalır:</p>
                 <div class="formul" style="max-width:240px"><div class="fm">√q₁ / x = √q₂ / (d − x)</div></div>
                 <p>Buradan tek bilinmeyenli basit bir denklem çıkar. Karekök almayı atlayan
                 öğrenci ikinci dereceden denklemle uğraşır ve zaman kaybeder.</p>` }
      ]
    }
  ]
},

/* -------------------------------------------------------- Simülasyon */
sim: F.simler['elektriksel-kuvvet'],

/* ------------------------------------------------------- Püf noktası */
puf: {
  html: `
    <p><strong>1 · Kat hesabını formülsüz yap.</strong> Soru “kaç katına çıkar” diyorsa
    sayı koyma, oranla git:</p>
    <table class="degisken-tablo" style="margin-top:8px">
      <thead><tr><th>Değişiklik</th><th>Kuvvet</th></tr></thead>
      <tbody>
        <tr><td>d → 2d</td><td class="sembol">F / 4</td></tr>
        <tr><td>d → 3d</td><td class="sembol">F / 9</td></tr>
        <tr><td>d → d/2</td><td class="sembol">4F</td></tr>
        <tr><td>q₁ → 2q₁</td><td class="sembol">2F</td></tr>
        <tr><td>q₁ → 2q₁ ve d → 2d</td><td class="sembol">F / 2</td></tr>
      </tbody>
    </table>

    <p style="margin-top:14px"><strong>2 · Özdeş küreler dokundurulursa yükler EŞİTLENİR.</strong>
    Bu, en çok sorulan tuzaktır:</p>
    <div class="formul" style="max-width:260px;margin:10px 0">
      <div class="fm">q′ = (q₁ + q₂) / 2</div>
    </div>
    <p>Toplam alınırken <strong>işaretler korunur</strong>. +8 ve −2 dokunursa her biri
    <code>(+8 − 2)/2 = +3</code> olur. Dikkat: dokunmadan önce çekme varsa, dokunduktan sonra
    <strong>mutlaka itme</strong> olur — çünkü ikisi de aynı işarete gelir.</p>

    <p style="margin-top:14px"><strong>3 · Kütle çeldiricidir.</strong> Soruda küre kütleleri
    verilmişse ve sorulan yalnızca Coulomb kuvvetiyse, kütleler işe yaramaz. Formülde kütle yoktur.</p>

    <p><strong>4 · Denge noktasında karekök al.</strong> <code>q₁/x² = q₂/(d−x)²</code>
    denklemini açma; karekökünü alıp <code>√q₁/x = √q₂/(d−x)</code> yaz. Yükler 9 ve 4 ise
    kökleri 3 ve 2&rsquo;dir, oran anında çıkar.</p>

    <p><strong>5 · Denge noktasının yeri ezber:</strong> aynı işaretliler → <em>arada</em>,
    zıt işaretliler → <em>dışarıda ve küçük yükün yanında</em>. Her durumda
    <strong>küçük yüke yakın</strong>.</p>

    <p><strong>6 · μC → C çevrimini en başta yap.</strong> <code>10⁻⁶</code> çarpanları
    karesi alınırken <code>10⁻¹²</code> verir. Bu adımı atlayan öğrenci sonucu
    milyon kat yanlış bulur.</p>

    <div class="kutu puf" style="margin-top:14px">
      <div class="kutu-bas"><span class="ikon">⚡</span><span>Hızlı hesap kısayolu</span></div>
      <p style="margin:0">Yükler <strong>μC</strong>, uzaklık <strong>cm</strong> cinsindense:</p>
      <div class="formul" style="max-width:240px;margin:10px 0">
        <div class="fm">F = 90 · q₁·q₂ / d²</div>
      </div>
      <p style="margin:0">Örnek: 2 μC ve 3 μC, 30 cm → <code>90·6/900 = 0,6 N</code>.
      Simülasyondaki değerlerle karşılaştırarak kendin doğrula.</p>
    </div>`
},

/* ----------------------------------------------------- Zorlayıcı sorular */
osym: [
  {
    baslik: 'Dokundurup ayırma',
    kaynak: 'Klasik tuzak',
    govde: `
      <p><strong>Özdeş</strong> iki iletken küre, aralarındaki uzaklık d olacak şekilde
      sabitlenmiştir. Yükleri <strong>q₁ = +8 μC</strong> ve <strong>q₂ = −2 μC</strong>&rsquo;dir
      ve aralarındaki kuvvetin büyüklüğü <strong>F</strong>&rsquo;dir.</p>
      <p>Küreler bir iletken telle kısa süre dokundurulup ayrılıyor ve
      <strong>tam olarak eski yerlerine</strong> konuyor.</p>
      <p>Yeni kuvvetin büyüklüğü ve türü nedir?</p>`,
    secenekler: [
      '(9/16)·F · itme',
      '(9/16)·F · çekme',
      '(16/9)·F · itme',
      'F · itme',
      '(3/4)·F · çekme'
    ],
    dogru: 0,
    cozum: `
      <p><strong>Önce dokunmadan:</strong></p>
      <p>F = k·(8)(2)/d² = <strong>16k/d²</strong> — zıt işaretli, <em>çekme</em>.</p>
      <p><strong>Dokunma anında:</strong> Küreler özdeş olduğu için toplam yük ikiye eşit bölünür:</p>
      <div class="formul" style="max-width:280px;margin:10px 0">
        <div class="fm">q′ = (+8 − 2)/2 = +3 μC</div>
      </div>
      <p>Her iki küre de <strong>+3 μC</strong> olur.</p>
      <p><strong>Sonra:</strong> F′ = k·(3)(3)/d² = <strong>9k/d²</strong></p>
      <div class="formul" style="max-width:220px;margin:10px 0;border-top-color:var(--accent)">
        <div class="fm" style="color:var(--accent)">F′/F = 9/16</div>
      </div>
      <p>Uzaklık değişmediği için d² sadeleşti.</p>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>İki ayrı tuzak var:</strong>
        <br><strong>B şıkkı</strong> büyüklüğü doğru bulup <em>türü</em> güncellemeyenler için.
        Dokunduktan sonra ikisi de artı olduğuna göre kuvvet <strong>itmeye</strong> döner.
        <br><strong>C şıkkı</strong> oranı ters yazanlar için.
        <br><strong>D şıkkı</strong> ise “toplam yük korunuyor, o hâlde kuvvet de aynı kalır”
        diye düşünenler için — yük korunur ama <em>çarpımları</em> korunmaz: 16 → 9.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: A</strong></p>`
  },
  {
    baslik: 'Denge noktası',
    kaynak: 'Türetim uygulaması',
    govde: `
      <p>Yatay bir doğru üzerinde <strong>q₁ = +9 μC</strong> yükü <strong>x = 0</strong>
      noktasında, <strong>q₂ = +4 μC</strong> yükü <strong>x = 50 cm</strong> noktasında
      sabittir.</p>
      <p>Bu doğru üzerine konulan üçüncü bir yükün <strong>bileşke kuvveti sıfır</strong>
      olması için hangi noktaya konulmalıdır?</p>`,
    gorsel: `
      <svg viewBox="0 0 520 150" xmlns="http://www.w3.org/2000/svg" role="img"
           aria-label="Yatay doğru üzerinde artı dokuz ve artı dört mikrocoulomb yükleri ve aralarındaki denge noktası">
        <rect width="520" height="150" fill="#17223A"/>
        <path d="M40 92 H480" stroke="#4A5F86" stroke-width="1.6"/>
        <circle cx="90" cy="92" r="13" fill="#E2483F"/>
        <text x="90" y="97" fill="#FFFFFF" font-size="14" font-family="system-ui" text-anchor="middle" font-weight="700">+</text>
        <text x="90" y="126" fill="#EAF0FA" font-size="12" font-family="system-ui" text-anchor="middle">q₁ = +9 μC</text>
        <text x="90" y="66" fill="#6F84A8" font-size="11" font-family="system-ui" text-anchor="middle">x = 0</text>
        <circle cx="410" cy="92" r="10" fill="#E2483F"/>
        <text x="410" y="97" fill="#FFFFFF" font-size="12" font-family="system-ui" text-anchor="middle" font-weight="700">+</text>
        <text x="410" y="126" fill="#EAF0FA" font-size="12" font-family="system-ui" text-anchor="middle">q₂ = +4 μC</text>
        <text x="410" y="66" fill="#6F84A8" font-size="11" font-family="system-ui" text-anchor="middle">x = 50 cm</text>
        <path d="M90 46 H410" stroke="#6F84A8" stroke-width="1" stroke-dasharray="4 5"/>
        <text x="250" y="40" fill="#6F84A8" font-size="11" font-family="system-ui" text-anchor="middle">d = 50 cm</text>
        <text x="250" y="97" fill="#FFB020" font-size="13" font-family="system-ui" text-anchor="middle" font-weight="700">? </text>
      </svg>`,
    secenekler: [
      'q₁’den 30 cm uzakta',
      'q₁’den 25 cm uzakta',
      'q₁’den 20 cm uzakta',
      'q₂’den 30 cm uzakta',
      'İki yükün dışında, q₂’nin sağında'
    ],
    dogru: 0,
    cozum: `
      <p>Yükler <strong>aynı işaretli</strong> olduğu için denge noktası
      <strong>aralarındadır</strong>. Nokta q₁&rsquo;den x uzaklıkta olsun:</p>
      <div class="formul" style="max-width:300px;margin:10px 0">
        <div class="fm">9 / x² = 4 / (50 − x)²</div>
      </div>
      <p><strong>Karekök al</strong> — bu adım işlemi ikinci dereceden denklemden kurtarır:</p>
      <div class="formul" style="max-width:260px;margin:10px 0">
        <div class="fm">3 / x = 2 / (50 − x)</div>
      </div>
      <p>İçler dışlar çarpımı: <code>3(50 − x) = 2x ⟹ 150 = 5x ⟹ x = 30 cm</code></p>
      <p><strong>Kontrol:</strong> 9/30² = 9/900 = 0,01 &nbsp;ve&nbsp; 4/20² = 4/400 = 0,01 ✓</p>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0">Nokta, <strong>küçük yüke (q₂) daha yakın</strong> çıktı: 20 cm.
        Bu her zaman böyledir ve cevabı kontrol etmenin en hızlı yoludur.
        <br><strong>E şıkkı</strong> zıt işaretli yükler için doğru olurdu — burada ikisi de artı.
        <br><strong>B şıkkı</strong> yükleri 9 ve 4 yerine oranlayıp yarıya bölenler için.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: A</strong></p>`
  }
],

/* --------------------------------------------- Bağlam temelli sorular */
baglam: [
  {
    baslik: 'Lazer yazıcı tozu kâğıda nasıl yapıştırıyor?',
    govde: `
      <p>Lazer yazıcıda görüntü, <strong>toner</strong> denen çok ince plastik tozla oluşturulur.
      Yazıcı önce kâğıdı elektriksel olarak yükler, sonra zıt yüklü toner zerrelerini
      kâğıdın üzerine bırakır. Toner, ısıyla eritilip kalıcı hâle getirilene kadar
      <strong>yalnızca elektriksel kuvvetle</strong> kâğıtta durur.</p>
      <p>Bir toner zerresi için:</p>
      <ul>
        <li>Zerrenin yükü: <strong>q₁ = 1 · 10⁻¹³ C</strong></li>
        <li>Kâğıttaki karşı yük: <strong>q₂ = 1 · 10⁻¹³ C</strong></li>
        <li>Aralarındaki uzaklık: <strong>d = 0,2 mm</strong></li>
        <li>Zerrenin kütlesi: <strong>m = 1,2 · 10⁻¹¹ kg</strong></li>
      </ul>
      <p><strong>Elektriksel kuvvet, zerrenin ağırlığının kaç katıdır? Kâğıdı ters çevirsek
      toner dökülür mü?</strong> (k = 9·10⁹ N·m²/C², g = 10 m/s²)</p>`,
    gorsel: `
      <svg viewBox="0 0 520 210" xmlns="http://www.w3.org/2000/svg" role="img"
           aria-label="Kâğıt yüzeyine elektriksel kuvvetle tutunan toner zerresi ve ağırlık vektörü">
        <rect width="520" height="210" fill="#17223A"/>
        <rect x="60" y="60" width="400" height="30" fill="#E6E9EF"/>
        <text x="260" y="80" fill="#2C3850" font-size="12" font-family="system-ui" text-anchor="middle">kâğıt</text>
        <g>
          <text x="120" y="104" fill="#2F6FD0" font-size="13" font-family="system-ui" text-anchor="middle">−</text>
          <text x="200" y="104" fill="#2F6FD0" font-size="13" font-family="system-ui" text-anchor="middle">−</text>
          <text x="320" y="104" fill="#2F6FD0" font-size="13" font-family="system-ui" text-anchor="middle">−</text>
          <text x="400" y="104" fill="#2F6FD0" font-size="13" font-family="system-ui" text-anchor="middle">−</text>
        </g>
        <circle cx="260" cy="128" r="14" fill="#E2483F"/>
        <text x="260" y="133" fill="#FFFFFF" font-size="14" font-family="system-ui" text-anchor="middle" font-weight="700">+</text>
        <text x="260" y="162" fill="#EAF0FA" font-size="12" font-family="system-ui" text-anchor="middle">toner zerresi</text>
        <path d="M260 110 V96" stroke="#FF6B6B" stroke-width="3"/>
        <path d="M260 92 L255 102 L265 102 Z" fill="#FF6B6B"/>
        <text x="296" y="104" fill="#FF6B6B" font-size="12" font-family="system-ui" font-weight="700">F</text>
        <path d="M260 146 V176" stroke="#FF8FA3" stroke-width="3"/>
        <path d="M260 180 L255 170 L265 170 Z" fill="#FF8FA3"/>
        <text x="288" y="176" fill="#FF8FA3" font-size="12" font-family="system-ui" font-weight="700">G</text>
        <text x="120" y="42" fill="#6F84A8" font-size="11" font-family="system-ui">d = 0,2 mm</text>
      </svg>`,
    adimlar: [
      { bas: 'Birimleri SI’ye çevir',
        metin: 'Uzaklık milimetre verilmiş: <strong>0,2 mm = 2·10⁻⁴ m</strong>. Bu adımı atlarsan sonuç milyonlarca kat yanlış çıkar.' },
      { bas: 'Elektriksel kuvveti hesapla',
        metin: 'F = k·q₁·q₂/d² = 9·10⁹ · (10⁻¹³)(10⁻¹³) / (2·10⁻⁴)²<br>Pay: 9·10⁹ · 10⁻²⁶ = <strong>9·10⁻¹⁷</strong><br>Payda: 4·10⁻⁸<br>F = <strong>2,25 · 10⁻⁹ N</strong>' },
      { bas: 'Ağırlığı hesapla',
        metin: 'G = m·g = 1,2·10⁻¹¹ · 10 = <strong>1,2 · 10⁻¹⁰ N</strong>' },
      { bas: 'Oranla',
        metin: 'F/G = 2,25·10⁻⁹ / 1,2·10⁻¹⁰ = <strong>≈ 19</strong>' },
      { bas: 'Yorumla',
        metin: 'Elektriksel kuvvet ağırlığın yaklaşık <strong>19 katı</strong>. Kâğıdı ters çevirsen bile toner düşmez. Küçük ölçekte elektriksel kuvvet yer çekimini ezer — bu, tozun ekrana ve giysiye yapışmasının da sebebidir.' }
    ],
    secenekler: [
      'Yaklaşık 19 katı; kâğıt ters çevrilse de toner dökülmez',
      'Yaklaşık 19 katı; yine de dökülür çünkü yer çekimi süreklidir',
      'Yaklaşık 2 katı; ancak yatay tutulursa durur',
      'Ağırlıktan küçüktür; toner ancak ısıtılınca tutunur',
      'Yaklaşık 190 katı; toner hiçbir koşulda ayrılmaz'
    ],
    dogru: 0,
    cozum: `
      <p><strong>F = 2,25·10⁻⁹ N</strong> &nbsp;·&nbsp; <strong>G = 1,2·10⁻¹⁰ N</strong>
      &nbsp;⟹&nbsp; <strong>F/G ≈ 19</strong></p>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>Ölçek meselesi:</strong> Kütle çekimi kütleyle büyür,
        elektriksel kuvvet ise uzaklık küçüldükçe hızla büyür. Toz, saç, toner gibi çok küçük
        ve çok yakın nesnelerde elektriksel kuvvet baskındır. Gezegen ölçeğinde ise tersi olur —
        çünkü büyük cisimler nötrdür.
        <br><strong>E şıkkı</strong> 10⁻⁹/10⁻¹⁰ bölmesini 190 bulanlar için: üs farkı 1&rsquo;dir,
        2,25/1,2 ≈ 1,9 ile çarpılınca 19 çıkar.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: A</strong></p>`
  },
  {
    baslik: 'Kapı koluna çarpılma',
    govde: `
      <p>Kışın, halı kaplı bir odada yürüyüp metal kapı koluna uzandığında küçük bir
      elektrik çarpması hissedersin. Yürürken ayakkabın halıdan <strong>elektron kopardığı</strong>
      için vücudun yüklenir; elin kola yaklaşınca kolda <strong>zıt yük toplanır</strong>.</p>
      <p>Bir ölçümde şu değerler bulunuyor:</p>
      <ul>
        <li>Elde biriken yük: <strong>q₁ = 1 · 10⁻⁷ C</strong></li>
        <li>Kapı kolunda toplanan zıt yük: <strong>q₂ = 1 · 10⁻⁷ C</strong></li>
        <li>El ile kol arası: <strong>d = 1 cm</strong></li>
      </ul>
      <p><strong>Aradaki kuvvet kaç N’dir? El 5 kat daha yaklaşırsa kuvvet ne olur?
      Yazın neden daha az çarpılırsın?</strong> (k = 9·10⁹ N·m²/C²)</p>`,
    gorsel: `
      <svg viewBox="0 0 520 200" xmlns="http://www.w3.org/2000/svg" role="img"
           aria-label="Yüklü el ile kapı kolu arasındaki uzaklık ve çekim kuvveti">
        <rect width="520" height="200" fill="#17223A"/>
        <rect x="0" y="150" width="520" height="50" fill="#3A2E22"/>
        <text x="40" y="180" fill="#8A6838" font-size="11" font-family="system-ui">halı</text>
        <rect x="360" y="40" width="26" height="120" fill="#6E7684"/>
        <ellipse cx="344" cy="96" rx="22" ry="16" fill="#9AA5B1"/>
        <text x="373" y="34" fill="#6F84A8" font-size="11" font-family="system-ui" text-anchor="middle">kapı</text>
        <g fill="#2F6FD0" font-size="13" font-family="system-ui" text-anchor="middle">
          <text x="332" y="82">−</text><text x="332" y="104">−</text><text x="340" y="118">−</text>
        </g>
        <ellipse cx="250" cy="96" rx="34" ry="20" fill="#E8C9A8"/>
        <rect x="150" y="86" width="100" height="20" rx="8" fill="#E8C9A8"/>
        <g fill="#E2483F" font-size="13" font-family="system-ui" text-anchor="middle">
          <text x="268" y="84">+</text><text x="268" y="106">+</text><text x="258" y="120">+</text>
        </g>
        <path d="M286 96 H310" stroke="#6F84A8" stroke-width="1" stroke-dasharray="3 4"/>
        <text x="298" y="86" fill="#6F84A8" font-size="11" font-family="system-ui" text-anchor="middle">d</text>
        <text x="180" y="150" fill="#EAF0FA" font-size="12" font-family="system-ui">el</text>
      </svg>`,
    adimlar: [
      { bas: 'Olayı modele çevir',
        metin: 'Karmaşık görünen olay aslında <strong>iki nokta yük</strong> problemidir: el ve kapı kolu. Coulomb yasası doğrudan uygulanır.' },
      { bas: 'Birimi çevir',
        metin: 'd = 1 cm = <strong>10⁻² m</strong> ⟹ d² = <strong>10⁻⁴ m²</strong>' },
      { bas: 'Kuvveti hesapla',
        metin: 'F = 9·10⁹ · (10⁻⁷)(10⁻⁷) / 10⁻⁴ = 9·10⁹ · 10⁻¹⁴ / 10⁻⁴ = 9·10⁻⁵ / 10⁻⁴ = <strong>0,9 N</strong>' },
      { bas: '5 kat yaklaşmayı oranla',
        metin: 'Formüle geri dönme. d beşte birine inerse F <strong>5² = 25 katına</strong> çıkar: 0,9 · 25 = <strong>22,5 N</strong>. Kuvvet bu kadar büyüyünce aradaki hava yalıtkanlığını kaybeder ve <strong>kıvılcım</strong> atlar.' },
      { bas: 'Mevsimi açıkla',
        metin: 'Yazın hava <strong>nemlidir</strong>. Su molekülleri iletken bir yol oluşturup biriken yükü sürekli boşaltır, yük hiç birikemez. Kışın kuru havada yük birikir ve tek seferde boşalır. Yani fark havada, sende değil.' }
    ],
    secenekler: [
      '0,9 N; 5 kat yaklaşınca 22,5 N olur; yazın nem yükü boşalttığı için çarpılmazsın',
      '0,9 N; 5 kat yaklaşınca 4,5 N olur; yazın ter iletkenliği azaltır',
      '9 N; 5 kat yaklaşınca 45 N olur; yazın sıcaklık yükü yok eder',
      '0,09 N; 5 kat yaklaşınca 2,25 N olur; mevsimin etkisi yoktur',
      '0,9 N; uzaklık değişimi kuvveti etkilemez; olay tamamen nemle ilgilidir'
    ],
    dogru: 0,
    cozum: `
      <p><strong>F = 0,9 N</strong> &nbsp;·&nbsp; d beşte birine inince
      <strong>F → 25F = 22,5 N</strong></p>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>B şıkkı</strong> ters kareyi ters orantı sanıp 5&rsquo;e
        bölenler için — en sık yapılan hata budur.
        <br><strong>E şıkkı</strong> uzaklığın etkisini tümden yok sayıyor.
        <br><strong>Fizik notu:</strong> Kıvılcımın atlaması için havanın <em>delinme
        dayanımının</em> aşılması gerekir; kuru hava için bu yaklaşık 3·10⁶ V/m&rsquo;dir.
        Bir sonraki konuda (elektriksel alan) bu eşiği sayıyla göreceksin.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: A</strong></p>`
  }
]

});
})();
