(function () {
"use strict";
const F = window.F11;

/* ==========================================================================
   topics/u1-serbest-dusme-veriler.js
   Konu 1.1.2 · Serbest düşme hareketi ile ilgili veriler  (MEB 11, s. 20-29)
   ========================================================================== */

F.konuKaydet('u1-serbest-dusme-veriler', {

ozet: `Serbest düşme, sabit ivmeli hareketin özel bir hâlidir. Bu yüzden yeni formül
ezberlemene gerek yok — <strong>bildiğin sabit ivmeli hareket formüllerinde <code>a</code>
yerine <code>g</code> yazıyorsun</strong>, hepsi bu. Bu konuda asıl mesele işaretleri
doğru kurmak ve grafikleri okuyabilmek.`,

/* ------------------------------------------------------------- Kavram */
kavram: `
<p>Serbest düşme terimi yalnızca "bırakılan" cisimler için kullanılmaz. Yukarı fırlatılan,
aşağı atılan ya da durgun hâlden bırakılan <strong>her cisim</strong>, havayı terk ettiği
andan itibaren serbest düşer. Üçünün de ivmesi aynıdır: <code>g</code>, ve daima aşağı doğru.</p>

<p>Aralarındaki tek fark <strong>ilk hız ϑ₀</strong>'dır:</p>
<ul>
  <li><strong>Bırakma:</strong> ϑ₀ = 0</li>
  <li><strong>Aşağı atma:</strong> ϑ₀ hareket yönünde, hız baştan büyük</li>
  <li><strong>Yukarı atma:</strong> ϑ₀ yukarı, ivme aşağı — cisim önce yavaşlar, durur, sonra iner</li>
</ul>

<h3 style="margin-top:20px">İşaretleri kurmak</h3>
<p>Bu konudaki hataların çoğu fizikten değil, <strong>işaretten</strong> kaynaklanır.
Kurtuluş şu iki adımda:</p>
<ol>
  <li><strong>Bir yön seç ve sonuna kadar ona sadık kal.</strong> Genelde yukarı (+) seçilir.
  O zaman <code>g = −10 m/s²</code> olur, çünkü ivme aşağı doğrudur.</li>
  <li><strong>Sıfırı nereye koyduğunu söyle.</strong> Ders kitabı sıfırı <em>cismin
  bırakıldığı noktaya</em> koyar. Cisim o seviyenin altına inince konum negatif olur.</li>
</ol>

<div class="kutu nott" style="margin:16px 0">
  <p style="margin:0">Sıfırı nereye koyduğun <strong>sonucu değiştirmez</strong>, sadece
  sayıların işaretini değiştirir. Aşağıdaki simülasyonda sol panel yerden yüksekliği,
  sağ panel atış noktasına göre konumu gösteriyor — aynı olay, iki farklı sıfır noktası.
  İkisini yan yana izle, bu fikir oturur.</p>
</div>

<h3 style="margin-top:20px">Grafiklerden ne okunur?</h3>
<ul>
  <li><strong>a − t:</strong> Sabit bir yatay doğru (−g). Serbest düşmede ivme asla değişmez —
  ne çıkarken, ne tepede, ne inerken.</li>
  <li><strong>ϑ − t:</strong> Eğimi <code>−g</code> olan bir doğru. Eğim sabittir.
  <strong>Doğrunun altında kalan alan yer değiştirmeyi verir.</strong></li>
  <li><strong>y − t:</strong> Parabol. Tepe noktası, hızın sıfır olduğu andır.</li>
</ul>`,

/* ---------------------------------------------------------- Formüller */
formuller: {
  liste: [
    { fm: 'h = ϑ₀·t ± ½·g·t²', aciklama: 'Yer değiştirmenin zamana bağlı ifadesi' },
    { fm: 'ϑ = ϑ₀ ± g·t',       aciklama: 'Hızın zamana bağlı ifadesi' },
    { fm: 'ϑ² = ϑ₀² ± 2·g·h',   aciklama: 'Hızın yer değiştirmeye bağlı ifadesi — zaman geçmez' }
  ],
  degiskenler: [
    { sembol: 'h',  ad: 'Yer değiştirme (atış noktasına göre)', birim: 'm' },
    { sembol: 'ϑ₀', ad: 'İlk hız',                              birim: 'm/s' },
    { sembol: 'ϑ',  ad: 't anındaki hız',                       birim: 'm/s' },
    { sembol: 'g',  ad: 'Yer çekimi ivmesi',                    birim: 'm/s²' },
    { sembol: 't',  ad: 'Zaman',                                birim: 's' }
  ]
},

/* ------------------------------------------------------------ Türetim */
turetim: {
  yollar: [
    {
      ad: 'Kitabın yolu · a yerine g',
      adimlar: [
        { baslik: 'Bildiğin formüllerle başla',
          html: `<p>10. sınıfta bir boyutta sabit ivmeli hareket için şu üç modeli öğrendin:</p>
                 <div class="formul-serit">
                   <div class="formul"><div class="fm">x = ϑ₀·t ± ½·a·t²</div></div>
                   <div class="formul"><div class="fm">ϑ = ϑ₀ ± a·t</div></div>
                   <div class="formul"><div class="fm">ϑ² = ϑ₀² ± 2·a·x</div></div>
                 </div>` },

        { baslik: 'Serbest düşmenin sabit ivmeli olduğunu fark et',
          html: `<p>Dünya yüzeyine yakın yerlerde <code>g</code> değişmez kabul edilir.
                 Serbest düşen cisme tek kuvvet ağırlığı etki ettiğine göre ivmesi de
                 <strong>sabittir</strong>.</p>
                 <p>Sabit ivme + doğrusal hareket = <strong>sabit ivmeli bir boyutta hareket</strong>.
                 Yani serbest düşme yeni bir hareket türü değil, bildiğin hareketin özel bir hâli.</p>` },

        { baslik: 'İki değişikliği yap',
          html: `<p>Formüller aynen geçerli, sadece iki şeyi güncelliyoruz:</p>
                 <ul>
                   <li><code>a</code> yerine <code>g</code> yazılır</li>
                   <li>Hareket yatay <code>x</code> değil, <strong>düşey <code>y</code> doğrultusundadır</strong>;
                   yer değiştirme <code>h</code> ile gösterilir</li>
                 </ul>
                 <div class="formul-serit" style="margin-top:12px">
                   <div class="formul" style="border-top-color:var(--accent)"><div class="fm">h = ϑ₀·t ± ½·g·t²</div></div>
                   <div class="formul" style="border-top-color:var(--accent)"><div class="fm">ϑ = ϑ₀ ± g·t</div></div>
                   <div class="formul" style="border-top-color:var(--accent)"><div class="fm">ϑ² = ϑ₀² ± 2·g·h</div></div>
                 </div>
                 <p style="margin-top:12px;color:var(--text-2)">Ezberlenecek yeni bir şey yok.
                 Bu konunun tüm formülleri, bildiğin üç formülün kılık değiştirmiş hâli.</p>` },

        { baslik: '± işareti ne zaman + ne zaman −?',
          html: `<p>Yukarıyı pozitif seçtiysen <code>g</code> aşağı olduğu için <strong>hep −</strong> alınır:</p>
                 <div class="formul" style="max-width:300px"><div class="fm">h = ϑ₀·t − ½·g·t²</div></div>
                 <p style="margin-top:10px">Bu tek formül üç durumu birden çözer:</p>
                 <ul>
                   <li>Bırakma → ϑ₀ = 0 yaz</li>
                   <li>Yukarı atış → ϑ₀ pozitif yaz</li>
                   <li>Aşağı atış → ϑ₀ <strong>negatif</strong> yaz</li>
                 </ul>
                 <div class="kutu puf" style="margin-top:12px">
                   <p style="margin:0">Üç ayrı formül ezberlemek yerine <strong>tek formül + doğru işaret</strong>
                   yaklaşımını benimse. Sınavda hata payın ciddi biçimde düşer.</p>
                 </div>` }
      ]
    },
    {
      ad: 'Grafik alanından',
      adimlar: [
        { baslik: 'Hız-zaman grafiğini çiz',
          html: `<p>Serbest düşmede ivme sabit olduğu için ϑ − t grafiği bir <strong>doğrudur</strong>.
                 <code>t = 0</code>'da ϑ₀'dan başlar, eğimi <code>−g</code>'dir.</p>
                 <p>Herhangi bir <code>t</code> anındaki hız:</p>
                 <div class="formul" style="max-width:220px"><div class="fm">ϑ = ϑ₀ − g·t</div></div>
                 <p style="margin-top:10px;color:var(--text-2)">Bu ilk formülü zaten bedavaya elde ettik —
                 doğrunun denklemi bu.</p>` },

        { baslik: 'Alanın yer değiştirme olduğunu hatırla',
          html: `<p>Hız-zaman grafiğinde <strong>eğri altında kalan alan yer değiştirmeye eşittir</strong>.
                 <code>0</code> ile <code>t</code> arasında kalan şekil bir <strong>yamuktur</strong>:</p>
                 <ul>
                   <li>Paralel kenarlar: ϑ₀ ve ϑ</li>
                   <li>Yükseklik: t</li>
                 </ul>
                 <div class="formul" style="max-width:300px">
                   <div class="fm">h = Alan = (ϑ₀ + ϑ)/2 · t</div>
                 </div>` },

        { baslik: 'ϑ yerine ϑ₀ − g·t koy',
          html: `<p>Yamuk alanında ϑ'yi birinci adımda bulduğumuz ifadeyle değiştirelim:</p>
                 <p>h = (ϑ₀ + ϑ₀ − g·t)/2 · t = (2ϑ₀ − g·t)/2 · t</p>
                 <div class="formul" style="max-width:300px;border-top-color:var(--accent)">
                   <div class="fm" style="color:var(--accent)">h = ϑ₀·t − ½·g·t²</div>
                 </div>
                 <p style="margin-top:12px">İkinci formül de çıktı — hem de ezber değil, sadece
                 bir yamuğun alanını hesaplayarak.</p>` },

        { baslik: 'Üçüncü formülü zamanı yok ederek bul',
          html: `<p>İlk formülden <code>t = (ϑ₀ − ϑ)/g</code> çekip yamuk alanında yerine koyalım:</p>
                 <p>h = (ϑ₀ + ϑ)/2 · (ϑ₀ − ϑ)/g</p>
                 <p>Payda <strong>iki kare farkı</strong> var:</p>
                 <p>h = (ϑ₀² − ϑ²) / (2g)</p>
                 <div class="formul" style="max-width:280px;border-top-color:var(--accent)">
                   <div class="fm" style="color:var(--accent)">ϑ² = ϑ₀² − 2·g·h</div>
                 </div>
                 <div class="kutu puf" style="margin-top:12px">
                   <p style="margin:0">Bu formülün içinde <strong>zaman yok</strong>. Soruda süre
                   verilmemiş ve sorulmamışsa doğrudan buna git — bir bilinmeyenden kurtulursun.</p>
                 </div>` }
      ]
    },
    {
      ad: 'Ortalama hızdan',
      adimlar: [
        { baslik: 'Sabit ivmede ortalama hız',
          html: `<p>İvme sabitse hız <strong>düzgün olarak</strong> değişir. Böyle bir harekette
                 ortalama hız, ilk ve son hızın aritmetik ortalamasıdır:</p>
                 <div class="formul" style="max-width:240px"><div class="fm">ϑ<sub>ort</sub> = (ϑ₀ + ϑ) / 2</div></div>
                 <p style="margin-top:10px;color:var(--text-2)">Dikkat: bu kısayol <strong>yalnızca
                 sabit ivmeli harekette</strong> geçerlidir. İvme değişiyorsa kullanılamaz.</p>` },

        { baslik: 'Yolu ortalama hızdan yaz',
          html: `<p>Ortalama hızın tanımı gereği:</p>
                 <div class="formul" style="max-width:240px"><div class="fm">h = ϑ<sub>ort</sub> · t</div></div>
                 <p style="margin-top:10px">Yerine koyarsak: h = (ϑ₀ + ϑ)/2 · t</p>
                 <p style="color:var(--text-2)">Grafik yolundaki yamuk alanının aynısına ulaştık.
                 İki farklı yol, aynı yere çıkıyor.</p>` },

        { baslik: 'Bu yolun asıl faydası',
          html: `<p>Bu bakış açısı bir soruyu anında çözer: <strong>ilk hızsız bırakılan cisim
                 ilk saniyede neden 10 m değil 5 m yol alır?</strong></p>
                 <p>Çünkü 1. saniyenin sonunda hız 10 m/s'dir, ama <strong>ortalama hız</strong>
                 (0 + 10)/2 = 5 m/s'dir. Yol ortalama hızla hesaplandığı için 5 m çıkar.</p>
                 <div class="formul" style="max-width:300px;border-top-color:var(--accent)">
                   <div class="fm" style="color:var(--accent)">h = 5 · 1 = 5 m</div>
                 </div>
                 <p style="margin-top:12px;color:var(--text-2)">Bu, konunun en sık yapılan
                 hatasıdır ve tek cümlelik bir açıklamayla kapanır.</p>` }
      ]
    }
  ]
},

/* -------------------------------------------------------- Simülasyon */
sim: F.simler['serbest-dusme-veriler'],

/* ------------------------------------------------------- Püf noktası */
puf: {
  html: `
    <p><strong>Saniye saniye yol kuralı (g = 10 m/s² için).</strong> Bu kural sınavda
    formül kurmadan sonuca gitmeni sağlar.</p>

    <p><strong>1. saniyede alınan yol, ilk hızın 5 fazlası veya 5 eksiğidir:</strong></p>
    <ul>
      <li><strong>Aşağı</strong> atılmışsa → ϑ₀ <strong>+ 5</strong></li>
      <li><strong>Yukarı</strong> atılmışsa → ϑ₀ <strong>− 5</strong></li>
      <li>Bırakılmışsa (ϑ₀ = 0) → <strong>5 m</strong></li>
    </ul>

    <p><strong>Sonraki her saniyede yol 10'ar 10'ar değişir</strong> — aşağı hareket
    ediyorsa artar, yukarı hareket ediyorsa azalır.</p>

    <div style="background:var(--surface-0);border-radius:var(--r-sm);padding:14px;margin:14px 0">
      <table class="degisken-tablo" style="margin:0">
        <thead><tr><th>Durum</th><th>1. sn</th><th>2. sn</th><th>3. sn</th><th>4. sn</th></tr></thead>
        <tbody>
          <tr><td>Bırakma (ϑ₀ = 0)</td><td class="sembol">5</td><td class="sembol">15</td><td class="sembol">25</td><td class="sembol">35</td></tr>
          <tr><td>Aşağı atış (ϑ₀ = 10)</td><td class="sembol">15</td><td class="sembol">25</td><td class="sembol">35</td><td class="sembol">45</td></tr>
          <tr><td>Yukarı atış (ϑ₀ = 20)</td><td class="sembol">15</td><td class="sembol">5</td><td class="sembol">−5</td><td class="sembol">−15</td></tr>
        </tbody>
      </table>
      <p style="margin:10px 0 0;font-size:.86em;color:var(--text-3)">
        Değerler metre cinsinden, o saniye içinde alınan yol. Negatif işaret cismin
        artık aşağı indiğini gösterir.
      </p>
    </div>

    <p style="margin-bottom:0"><strong>Üç kısayol daha:</strong></p>
    <ul style="margin-bottom:0">
      <li><strong>Çıkış süresi = iniş süresi.</strong> Yukarı atılan cisim aynı seviyeye
      dönerken tepeye çıktığı kadar süre harcar.</li>
      <li><strong>Aynı seviyede hızlar eşit büyüklükte, zıt yönde.</strong> Çıkarken 20 m/s
      ile geçtiğin noktadan inerken yine 20 m/s ile geçersin.</li>
      <li><strong>Soruda süre yoksa <code>ϑ² = ϑ₀² ± 2gh</code>'ye git.</strong> İçinde t
      olmadığı için bir bilinmeyenden kurtulursun.</li>
    </ul>`,

  ornekler: [
    {
      soru: `<p>İlk hızsız serbest bırakılan bir cisim <strong>3. saniyede</strong> kaç metre yol alır?
             (g = 10 m/s²)</p>
             <p style="color:var(--text-3);font-size:.9em">Dikkat: "3 saniyede" değil,
             "3. saniyede" — yani yalnızca 2. ve 3. saniye arasındaki yol.</p>`,
      taktikle: `<p>Diziyi say: <strong>5, 15, <u>25</u></strong>, 35…</p>
                 <p style="margin-bottom:0">Cevap: <strong>25 m</strong>. Hiç işlem yok.</p>`,
      uzun: `<p>h(3) = ½·10·3² = 45 m, h(2) = ½·10·2² = 20 m</p>
             <p>3. saniyedeki yol = 45 − 20 = <strong>25 m</strong></p>`
    },
    {
      soru: `<p>Bir taş yerden <strong>30 m/s</strong> hızla düşey yukarı atılıyor.
             Taş kaç saniye sonra atıldığı noktaya geri döner ve en fazla kaç metre yükselir?
             (g = 10 m/s²)</p>`,
      taktikle: `<p><strong>Çıkış süresi = ϑ₀/g = 30/10 = 3 s.</strong> İniş de aynı sürede
                 olacağından toplam <strong>6 s</strong>.</p>
                 <p style="margin-bottom:0">Yükseklik için saniye kuralını topla:
                 1. sn'de 30−5 = 25 m, 2. sn'de 15 m, 3. sn'de 5 m →
                 25 + 15 + 5 = <strong>45 m</strong></p>`,
      uzun: `<p>Tepede ϑ = 0 olur: 0 = 30 − 10·t ⟹ t = 3 s, toplam süre 6 s.</p>
             <p>ϑ² = ϑ₀² − 2gh ⟹ 0 = 900 − 2·10·h ⟹ h = <strong>45 m</strong></p>`
    },
    {
      soru: `<p>Bir cisim 80 m yükseklikteki bir binanın çatısından <strong>aşağı doğru</strong>
             10 m/s hızla atılıyor. Yere kaç saniyede çarpar? (g = 10 m/s²)</p>`,
      taktikle: `<p>Saniye saniye topla: 1. sn'de 10+5 = 15 m, 2. sn'de 25 m, 3. sn'de 35 m.</p>
                 <p>Toplam: 15 + 25 = 40 m (2 sn), +35 = 75 m (3 sn). 80 m'ye 5 m kaldı,
                 demek ki cevap 3 ile 4 saniye arasında — seçeneklerde tam sayı varsa
                 bu bilgi çoğu zaman yeter.</p>
                 <p style="margin-bottom:0">Kesin değer gerekiyorsa formüle geç.</p>`,
      uzun: `<p>80 = 10·t + ½·10·t² ⟹ 5t² + 10t − 80 = 0 ⟹ t² + 2t − 16 = 0</p>
             <p>t = (−2 + √(4+64))/2 = (−2 + √68)/2 ≈ <strong>3,12 s</strong></p>
             <p style="color:var(--text-3)">Taktikle bulduğumuz "3 ile 4 arası" aralığı tuttu.</p>`
    }
  ]
},

/* ------------------------------------------------------ Zorlayıcı sorular */
osym: [
  {
    baslik: 'Grafik okuma',
    kaynak: 'Grafik okuma',
    govde: `
      <p>Düşey doğrultuda yukarı atılan bir cismin <strong>hız-zaman grafiği</strong>
      aşağıda verilmiştir. (Yukarı yön pozitif, g = 10 m/s², hava direnci ihmal ediliyor.)</p>
      <p>Buna göre aşağıdakilerden hangisi <strong>yanlıştır</strong>?</p>`,
    gorsel: `
      <svg viewBox="0 0 520 210" xmlns="http://www.w3.org/2000/svg" role="img"
           aria-label="Yukarı atılan cismin hız-zaman grafiği: 20 m/s'den başlayıp 4 saniyede eksi 20 m/s'ye inen doğru">
        <rect width="520" height="210" fill="#0E1726"/>
        <g stroke="#223150" stroke-width="1">
          <path d="M120 40 H420 M120 75 H420 M120 145 H420 M120 180 H420"/>
          <path d="M195 30 V190 M270 30 V190 M345 30 V190"/>
        </g>
        <path d="M120 30 V190" stroke="#4A5F86" stroke-width="1.6"/>
        <path d="M105 110 H430" stroke="#4A5F86" stroke-width="1.6"/>
        <path d="M120 40 L420 180" stroke="#35C08A" stroke-width="2.6"/>
        <circle cx="270" cy="110" r="4.5" fill="#35C08A"/>
        <text x="112" y="45" fill="#6F84A8" font-size="12" font-family="system-ui" text-anchor="end">20</text>
        <text x="112" y="114" fill="#EAF0FA" font-size="12" font-family="system-ui" text-anchor="end">0</text>
        <text x="112" y="184" fill="#6F84A8" font-size="12" font-family="system-ui" text-anchor="end">−20</text>
        <text x="196" y="126" fill="#6F84A8" font-size="12" font-family="system-ui" text-anchor="middle">1</text>
        <text x="271" y="126" fill="#6F84A8" font-size="12" font-family="system-ui" text-anchor="middle">2</text>
        <text x="346" y="126" fill="#6F84A8" font-size="12" font-family="system-ui" text-anchor="middle">3</text>
        <text x="421" y="126" fill="#6F84A8" font-size="12" font-family="system-ui" text-anchor="middle">4</text>
        <text x="440" y="114" fill="#A7B8D4" font-size="13" font-family="system-ui">t (s)</text>
        <text x="126" y="24" fill="#A7B8D4" font-size="13" font-family="system-ui">ϑ (m/s)</text>
      </svg>`,
    secenekler: [
      'Cisim 2. saniyede en yüksek noktadadır',
      'Cismin ivmesi 2. saniyede sıfırdır',
      'Cisim 20 m yükselmiştir',
      'Cisim 4. saniyede atıldığı noktaya dönmüştür',
      'Grafiğin eğimi ivmeyi verir'
    ],
    dogru: 1,
    cozum: `
      <p>Grafik 20 m/s'den başlayıp 4. saniyede −20 m/s'ye iniyor. Eğim = (−20−20)/4 =
      <strong>−10 m/s²</strong>, yani g.</p>
      <ol>
        <li><strong>Doğru.</strong> Hız 2. saniyede sıfır oluyor. Hızın sıfır olduğu an tepe noktasıdır.</li>
        <li><strong>YANLIŞ — aranan cevap bu.</strong> Tepede <em>hız</em> sıfırdır, <em>ivme</em> değil.
        Grafiğin eğimi baştan sona sabit <strong>−10 m/s²</strong>'dir; hiçbir anda sıfır olmaz.
        Cisim havada olduğu sürece ivmesi g'dir.</li>
        <li><strong>Doğru.</strong> 0-2 s arası üçgenin alanı = ½·2·20 = <strong>20 m</strong>.</li>
        <li><strong>Doğru.</strong> 0-2 s'de +20 m, 2-4 s'de −20 m. Toplam yer değiştirme sıfır,
        yani cisim başladığı noktaya dönmüş.</li>
        <li><strong>Doğru.</strong> ϑ − t grafiğinde eğim tanım gereği ivmedir.</li>
      </ol>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>Klasik çeldirici:</strong> "tepede hız sıfır"
        bilgisini "tepede ivme sıfır" diye genişletmeni bekler. Bu iki cümle taban tabana zıttır —
        ivme sıfır olsaydı cisim tepede asılı kalırdı.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: B</strong></p>`
  },
  {
    baslik: 'İki cisim karşılaştırma',
    kaynak: 'Orantı',
    govde: `
      <p>K cismi <strong>h</strong> yüksekliğinden ilk hızsız bırakılıyor.
      L cismi ise <strong>4h</strong> yüksekliğinden ilk hızsız bırakılıyor.</p>
      <p>Buna göre L'nin yere çarpma süresi K'nınkinin kaç katı,
      yere çarpma hızı K'nınkinin kaç katıdır?</p>
      <p style="font-size:.9em;color:var(--text-3)">(Hava direnci ihmal ediliyor, g sabittir.)</p>`,
    secenekler: [
      'Süre 4 katı, hız 4 katı',
      'Süre 2 katı, hız 4 katı',
      'Süre 2 katı, hız 2 katı',
      'Süre 4 katı, hız 2 katı',
      'Süre 2 katı, hız √2 katı'
    ],
    dogru: 2,
    cozum: `
      <p><strong>Süre için:</strong> h = ½gt² ⟹ t = √(2h/g), yani <strong>t ∝ √h</strong>.</p>
      <p>Yükseklik 4 katına çıkarsa süre √4 = <strong>2 katına</strong> çıkar.</p>
      <p><strong>Hız için:</strong> ϑ² = 2gh ⟹ ϑ = √(2gh), yani <strong>ϑ ∝ √h</strong>.</p>
      <p>Yükseklik 4 katına çıkarsa hız da √4 = <strong>2 katına</strong> çıkar.</p>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>Ezberlenecek orantı:</strong> Serbest düşmede hem süre
        hem de son hız, <strong>yüksekliğin kareköküyle</strong> orantılıdır. Yükseklik
        4 katına → ikisi de 2 katına. Yükseklik 9 katına → ikisi de 3 katına.
        <br>A ve D şıkları "4 katı" diyerek karekökü almayı unutanları,
        E şıkkı ise sadece hızda karekök alıp sürede unutanları toplar.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: C</strong></p>`
  }
],

/* --------------------------------------------- Bağlam temelli sorular */
baglam: [
  {
    baslik: 'Hava topu atışı',
    govde: `
      <p>Bir belediye, yeni yıl kutlaması için havai fişek gösterisi planlıyor. Güvenlik
      uzmanı, fişeklerin <strong>en yüksek noktada patlaması</strong> gerektiğini söylüyor —
      çünkü orada hız sıfırdır ve parçalar en simetrik dağılır.</p>
      <p>Fişek yerden <strong>40 m/s</strong> hızla düşey olarak fırlatılıyor. Teknisyen,
      fitilin kaç saniyede yanıp bitmesi gerektiğini ayarlamalı.</p>
      <p><strong>Fitil kaç saniyede yanmalı ve patlama yerden kaç metre yükseklikte olur?</strong>
      (g = 10 m/s², hava direnci ihmal ediliyor)</p>`,
    gorsel: `
      <svg viewBox="0 0 520 220" xmlns="http://www.w3.org/2000/svg" role="img"
           aria-label="Havai fişek 40 metre bölü saniye hızla yukarı fırlatılıyor, en yüksek noktada patlıyor">
        <rect width="520" height="220" fill="#0B1020"/>
        <g fill="#FFFFFF" opacity=".5">
          <rect x="60" y="30" width="2" height="2"/><rect x="140" y="58" width="2" height="2"/>
          <rect x="430" y="40" width="2" height="2"/><rect x="380" y="86" width="2" height="2"/>
          <rect x="95" y="105" width="2" height="2"/><rect x="470" y="120" width="2" height="2"/>
        </g>
        <rect x="0" y="188" width="520" height="32" fill="#1C2A1A"/>
        <g transform="translate(260,52)">
          <g stroke="#FFB020" stroke-width="2.4" stroke-linecap="round">
            <path d="M0 0 L0 -20"/><path d="M0 0 L18 -12"/><path d="M0 0 L-18 -12"/>
            <path d="M0 0 L24 4"/><path d="M0 0 L-24 4"/>
            <path d="M0 0 L14 18"/><path d="M0 0 L-14 18"/>
          </g>
          <circle cx="0" cy="0" r="6" fill="#FFD98A"/>
        </g>
        <path d="M260 178 L260 70" stroke="#FF6B6B" stroke-width="2" stroke-dasharray="5 5"/>
        <path d="M250 178 L270 178 L265 188 L255 188 Z" fill="#7D8A99"/>
        <path d="M210 178 L210 92" stroke="#6F84A8" stroke-width="1.2"/>
        <path d="M205 178 H215 M205 92 H215" stroke="#6F84A8" stroke-width="1.2"/>
        <text x="200" y="138" fill="#A7B8D4" font-size="14" font-family="system-ui" text-anchor="end">h = ?</text>
        <text x="288" y="166" fill="#35C08A" font-size="13" font-family="system-ui">ϑ₀ = 40 m/s</text>
        <text x="288" y="62" fill="#FFB020" font-size="13" font-family="system-ui">ϑ = 0 · patlama</text>
      </svg>`,
    adimlar: [
      { bas: 'Verilenleri ayıkla',
        metin: 'ϑ₀ = 40 m/s (yukarı), g = 10 m/s². "Belediye", "yeni yıl", "güvenlik uzmanı" sahne kurar, hesaba girmez.' },
      { bas: 'Olayı fiziksel modele çevir',
        metin: 'Kritik cümle: "en yüksek noktada patlamalı". Fizikte en yüksek nokta demek <strong>ϑ = 0</strong> demektir. Sorunun gizli verisi budur — metinde sayı olarak verilmemiş, senin çıkarman gerekiyor.' },
      { bas: 'Süre için formülü seç',
        metin: 'ϑ ve ϑ₀ biliniyor, t isteniyor. Bunları bağlayan: <strong>ϑ = ϑ₀ − g·t</strong>' },
      { bas: 'Yükseklik için formülü seç',
        metin: 'Zamanı zaten bulduk ama zamandan bağımsız gitmek daha güvenli: <strong>ϑ² = ϑ₀² − 2·g·h</strong>' },
      { bas: 'Hesapla',
        metin: 'Süre: 0 = 40 − 10·t ⟹ <strong>t = 4 s</strong><br>Yükseklik: 0 = 40² − 2·10·h ⟹ 1600 = 20h ⟹ <strong>h = 80 m</strong>' },
      { bas: 'Yorumla',
        metin: '80 m ≈ 25 katlı bina. Fitil 4 saniyede yanmalı. Fitil erken yanarsa fişek hâlâ yükselirken patlar ve parçalar yukarı savrulur; geç yanarsa fişek düşerken patlar — ikisi de tehlikelidir.' }
    ],
    secenekler: [
      't = 4 s, h = 80 m',
      't = 4 s, h = 160 m',
      't = 8 s, h = 80 m',
      't = 2 s, h = 40 m',
      't = 8 s, h = 160 m'
    ],
    dogru: 0,
    cozum: `
      <p>"En yüksek nokta" ifadesi <strong>ϑ = 0</strong> demektir.</p>
      <p><strong>Süre:</strong> ϑ = ϑ₀ − g·t ⟹ 0 = 40 − 10·t ⟹ <strong>t = 4 s</strong></p>
      <p><strong>Yükseklik:</strong> ϑ² = ϑ₀² − 2gh ⟹ 0 = 1600 − 20h ⟹ <strong>h = 80 m</strong></p>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>C ve E neden tuzak?</strong> 8 s, fişeğin <em>yere geri düşme</em>
        süresidir — soru patlama anını soruyor, dönüş anını değil. Çıkış süresi toplam sürenin yarısıdır.
        <br><strong>B neden tuzak?</strong> h = ϑ₀·t = 40·4 = 160 diyenler için. Ama hız sabit değil ki;
        ortalama hız (40+0)/2 = 20 m/s, dolayısıyla h = 20·4 = 80 m.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: A</strong></p>`
  },
  {
    baslik: 'Vinç operatörünün kararı',
    govde: `
      <p>Bir inşaatta vinç operatörü, <strong>60 m</strong> yükseklikteki kata malzeme taşıyor.
      Vinç <strong>yukarı doğru 5 m/s sabit hızla</strong> yükselirken, <strong>20 m</strong>
      yüksekliğe geldiği anda sepetteki bir cıvata kenardan kayıp düşüyor.</p>
      <p>Yerdeki işçi, cıvatanın düşmeye başladığını görüyor ve kaçmak için kaç saniyesi
      olduğunu bilmek istiyor.</p>
      <p><strong>Cıvata yere kaç saniyede ulaşır?</strong> (g = 10 m/s², hava direnci ihmal ediliyor)</p>`,
    gorsel: `
      <svg viewBox="0 0 520 230" xmlns="http://www.w3.org/2000/svg" role="img"
           aria-label="Yukarı çıkan vinçten 20 metrede düşen cıvata, önce yükselip sonra yere iniyor">
        <rect width="520" height="230" fill="#17223A"/>
        <rect x="0" y="200" width="520" height="30" fill="#5F5E5A"/>
        <rect x="60" y="20" width="10" height="180" fill="#7D8A99"/>
        <rect x="60" y="20" width="170" height="8" fill="#7D8A99"/>
        <path d="M200 28 V96" stroke="#9AA5B1" stroke-width="1.6"/>
        <rect x="182" y="96" width="36" height="20" rx="3" fill="#C98B4B"/>
        <path d="M200 88 L200 56" stroke="#35C08A" stroke-width="2.4"/>
        <path d="M200 48 L194 60 L206 60 Z" fill="#35C08A"/>
        <text x="212" y="62" fill="#35C08A" font-size="12" font-family="system-ui">vinç 5 m/s ↑</text>
        <circle cx="232" cy="106" r="5" fill="#FF6B6B"/>
        <path d="M232 100 L232 78" stroke="#FF6B6B" stroke-width="2" stroke-dasharray="3 4"/>
        <path d="M232 112 L232 194" stroke="#FF6B6B" stroke-width="2" stroke-dasharray="3 4"/>
        <path d="M232 200 L226 188 L238 188 Z" fill="#FF6B6B"/>
        <text x="246" y="104" fill="#FF6B6B" font-size="12" font-family="system-ui">cıvata düşüyor</text>
        <path d="M300 106 V200" stroke="#6F84A8" stroke-width="1.2"/>
        <path d="M295 106 H305 M295 200 H305" stroke="#6F84A8" stroke-width="1.2"/>
        <text x="312" y="158" fill="#A7B8D4" font-size="14" font-family="system-ui">20 m</text>
        <text x="380" y="216" fill="#6F84A8" font-size="12" font-family="system-ui">zemin</text>
      </svg>`,
    adimlar: [
      { bas: 'Verilenleri ayıkla',
        metin: 'Düşme yüksekliği 20 m (60 m değil!), vincin hızı 5 m/s yukarı, g = 10 m/s². “60 m’deki kat” sadece sahnenin bir parçası, cıvata oradan düşmüyor.' },
      { bas: 'Tuzağı gör',
        metin: 'Cıvata <strong>ilk hızsız düşmüyor.</strong> Kaydığı ana kadar vinçle birlikte yukarı gidiyordu, yani ayrıldığı anda <strong>5 m/s yukarı</strong> hızı var. Eylemsizlik gereği o hızı koruyarak ayrılıyor.' },
      { bas: 'Yönleri ve sıfırı seç',
        metin: 'Yukarı pozitif, sıfır zeminde. Başlangıç: y₀ = +20 m, ϑ₀ = +5 m/s, a = −10 m/s². Cıvata önce biraz <em>yükselir</em>, sonra düşer.' },
      { bas: 'Denklemi kur',
        metin: 'Yere çarptığında y = 0:<br>0 = 20 + 5·t − ½·10·t² ⟹ <strong>5t² − 5t − 20 = 0</strong> ⟹ t² − t − 4 = 0' },
      { bas: 'Çöz',
        metin: 't = (1 + √(1+16))/2 = (1 + √17)/2 ≈ (1 + 4,12)/2 ≈ <strong>2,56 s</strong>' },
      { bas: 'Yorumla',
        metin: 'İlk hızsız düşseydi t = √(2·20/10) = 2 s olurdu. Yukarı hız cıvataya <strong>yarım saniyeden fazla ek süre</strong> kazandırdı — işçi için bu fark hayati olabilir. Vinç aşağı inseydi süre 2 saniyenin altına düşerdi.' }
    ],
    secenekler: ['2,00 s', '2,56 s', '3,00 s', '1,55 s', '4,00 s'],
    dogru: 1,
    cozum: `
      <p>Cıvata vinçten ayrılırken vincin hızını taşır: <strong>ϑ₀ = +5 m/s (yukarı)</strong>.</p>
      <p>Yukarı pozitif, sıfır zeminde: 0 = 20 + 5t − 5t²</p>
      <p>t² − t − 4 = 0 ⟹ t = (1 + √17)/2 ≈ <strong>2,56 s</strong></p>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>A şıkkı (2,00 s)</strong> ilk hızı sıfır sananlar için konmuştur —
        bu sorudaki asıl çeldirici odur. <strong>D şıkkı (1,55 s)</strong> ise ilk hızı <em>aşağı</em>
        yönde alanların bulacağı değerdir.
        <br>Kural: <strong>bir cisim hareketli bir taşıyıcıdan ayrılıyorsa, ayrıldığı andaki
        taşıyıcı hızıyla ayrılır.</strong> Uçaktan bırakılan paket, yürüyen bantta düşürülen
        eşya, hareketli arabadan atılan top — hepsinde aynı kural işler.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: B) 2,56 s</strong></p>`
  }
]

});
})();
