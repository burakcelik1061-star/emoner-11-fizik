(function () {
"use strict";
const F = window.F11;

/* ==========================================================================
   topics/u1-serbest-dusen-cisimler.js
   Konu 1.1.1 · Serbest düşen cisimler   (MEB 11 fizik, s. 16-19)
   ========================================================================== */

F.konuKaydet('u1-serbest-dusen-cisimler', {

ozet: `Serbest düşme, <strong>başlangıç hızı olmayan</strong> düşme tipidir: cisim atılmaz,
itilmez — yalnızca <strong>bırakılır</strong> (ϑ₀ = 0) ve düşüşünü sadece yer çekimi belirler.
Konunun büyük fikri şu: <strong>serbest düşen bütün cisimler, kütlelerinden bağımsız olarak
aynı ivmeyle düşer.</strong>`,

/* ------------------------------------------------------------- Kavram */
kavram: `
<p><strong>Serbest düşme:</strong> Sürtünmesiz ortamda yalnızca yer çekimi kuvvetinin
etkisi altında gerçekleşen harekettir. Bu ivmeye <strong>yer çekimi ivmesi</strong> denir,
<code>g</code> ile gösterilir ve daima <strong>aşağı doğrudur</strong>.</p>

<div class="formul" style="max-width:300px;margin:16px 0;border-top-color:var(--b1)">
  <div class="fm" style="color:var(--b1)">ϑ₀ = 0</div>
  <div class="fm-ad">Serbest düşmenin şartı</div>
</div>

<p>Serbest düşmeyi diğer düşey hareketlerden ayıran şey <strong>ilk hızının sıfır
olmasıdır</strong>. Cisme başlangıçta hiçbir hız verilmez; eliniz açılır ve cisim
<strong>bırakılır</strong>. Cisme bir ilk hız verilmişse artık o bir
<strong>atış</strong>tır — sonraki iki konunun konusudur.</p>

<table class="degisken-tablo">
  <thead><tr><th>Hareket tipi</th><th>İlk hız</th><th>Başlangıçta ne oluyor?</th><th>Hareketin yapısı</th></tr></thead>
  <tbody>
    <tr style="background:var(--surface-2)"><td><strong>Serbest düşme</strong></td><td class="sembol">ϑ₀ = 0</td><td>Yok — cisim yalnızca <strong>bırakılır</strong></td><td>Tek fazlı, hızlanır</td></tr>
    <tr><td>Yukarıdan aşağıya atış</td><td class="sembol">ϑ₀ ≠ 0, aşağı</td><td>Var — cisim <strong>aşağı doğru atılır</strong></td><td>Tek fazlı, hızlanır</td></tr>
    <tr><td>Aşağıdan yukarıya atış</td><td class="sembol">ϑ₀ ≠ 0, yukarı</td><td>Var — cisim <strong>yukarı doğru atılır</strong></td><td>İki fazlı: yavaşlar, durur, hızlanır</td></tr>
  </tbody>
</table>
<p style="margin-top:10px;color:var(--text-2)">Üçünün de <strong>ivmesi aynıdır: a = g, aşağı doğru.</strong>
Aralarındaki tek fark <strong>ilk hızdır</strong> — hareketi birbirinden ayıran şey budur.</p>

<p>Dünya yüzeyine yakın yerlerde <code>g ≈ 9,8 m/s²</code>'dir; sorularda işlem kolaylığı için
genellikle <code>g = 10 m/s²</code> alınır. Ay'da bu değer yaklaşık <code>1,6 m/s²</code>,
yani Dünya'nın altıda biri kadardır.</p>

<div class="kutu dikkat" style="margin:16px 0">
  <div class="kutu-bas"><span class="ikon">⚠</span>“Serbest düşme”nin iki anlamı</div>
  <p>Bu terim iki farklı genişlikte kullanılır; ikisini de bilmek gerekir:</p>
  <ul style="margin:0">
    <li><strong>Dar anlamı (soru dili):</strong> ϑ₀ = 0 olan düşme. “Cisim serbest
    bırakıldı” denince kastedilen budur; bu konunun konusu odur.</li>
    <li><strong>Geniş anlamı (fizik tanımı):</strong> üzerine yalnızca yer çekimi etki eden
    her hareket. Bu anlamda yukarı fırlatılan top da, aşağı atılan taş da
    <strong>havayı terk ettiği andan itibaren serbest düşer</strong> — yukarı çıkarken bile
    ivmesi aşağı doğrudur.</li>
  </ul>
  <p style="margin:10px 0 0">Bu yüzden atışların formülleri ayrı değildir: hepsi aynı
  <code>a = g</code> hareketidir, yalnızca ϑ₀ farklıdır.</p>
</div>

<p>Havada düşen bir yaprak ile bir taşın farklı hızlarda inmesinin sebebi kütleleri değil,
<strong>hava direncidir</strong>. Havası alınmış bir ortamda ikisi aynı anda yere iner.
Bu, 2 Ağustos 1971'de Apollo 15 astronotu David Scott tarafından Ay yüzeyinde
bir şahin tüyü ve jeolog çekici bırakılarak canlı yayında gösterilmiştir.</p>

<p style="color:var(--text-2);font-size:.94em">Bu konudan sonraki tüm hesaplarda hava
direnci ihmal edilir. Hava direnci, nicel olarak yalnızca <strong>1.5 Limit hız</strong>
konusunda ele alınacaktır.</p>`,

/* ---------------------------------------------------------- Formüller */
formuller: {
  liste: [
    { fm: 'a = g', aciklama: 'Serbest düşen her cismin ivmesi g’dir — kütleye bağlı değildir.' },
    { fm: 'G = m · g', aciklama: 'Cisme etki eden tek kuvvet: ağırlık.' },
    { fm: 'g<sub>Dünya</sub> ≈ 10 m/s²', aciklama: 'Ay’da ≈ 1,6 m/s², yaklaşık altıda biri.' }
  ],
  degiskenler: [
    { sembol: 'g', ad: 'Yer çekimi ivmesi', birim: 'm/s²' },
    { sembol: 'a', ad: 'İvme',              birim: 'm/s²' },
    { sembol: 'G', ad: 'Ağırlık',           birim: 'N' },
    { sembol: 'm', ad: 'Kütle',             birim: 'kg' },
    { sembol: 'ϑ', ad: 'Hız',               birim: 'm/s' }
  ]
},

/* ------------------------------------------------------------ Türetim */
turetim: {
  yollar: [
    {
      ad: 'Newton yasasından',
      adimlar: [
        { baslik: 'Cisme etki eden kuvveti yaz',
          html: `<p>Hava direnci yoksa serbest düşen cisme etki eden <strong>tek kuvvet
                 ağırlığıdır</strong>:</p>
                 <div class="formul" style="max-width:220px"><div class="fm">F<sub>net</sub> = G = m · g</div></div>
                 <p style="margin-top:10px;color:var(--text-2)">Burada <code>m</code> cismin
                 kütlesi, <code>g</code> ise yer çekimi ivmesidir.</p>` },

        { baslik: 'Newton’ın 2. yasasını uygula',
          html: `<p>Bir cismin ivmesi, üzerine etki eden net kuvvetle doğru, kütlesiyle ters orantılıdır:</p>
                 <div class="formul" style="max-width:220px"><div class="fm">F<sub>net</sub> = m · a</div></div>
                 <p style="margin-top:10px">İki ifadeyi eşitleyelim:</p>
                 <div class="formul" style="max-width:260px"><div class="fm">m · a = m · g</div></div>` },

        { baslik: 'Kütleyi sadeleştir',
          html: `<p>Her iki tarafta da <code>m</code> var. Kütle <strong>sıfırdan farklı</strong>
                 olduğu için sadeleşir:</p>
                 <div class="formul" style="max-width:220px;border-color:var(--accent)">
                   <div class="fm" style="color:var(--accent)">a = g</div>
                 </div>
                 <p style="margin-top:12px"><strong>Sonuç:</strong> İvme ifadesinde kütle
                 kalmadı. Bu yüzden 1 kg’lık taş da 100 kg’lık kaya da aynı ivmeyle düşer.</p>
                 <div class="kutu nott" style="margin-top:12px">
                   <p style="margin:0">Ağır cisme daha büyük kuvvet etki eder — ama o cismin
                   hızlanmaya karşı direnci (eylemsizliği) de aynı oranda büyüktür.
                   İkisi birbirini tam olarak götürür.</p>
                 </div>` }
      ]
    },
    {
      ad: 'Galileo’nun düşünce deneyi',
      adimlar: [
        { baslik: 'Aristoteles’in iddiasını kabul edelim',
          html: `<p>Diyelim ki <strong>ağır cisimler hafif cisimlerden daha hızlı düşüyor</strong>.
                 Elimizde ağır bir taş (A) ve hafif bir taş (B) olsun. Bu iddiaya göre
                 A tek başına B’den hızlı düşer.</p>` },

        { baslik: 'İki taşı birbirine bağlayalım',
          html: `<p>Şimdi A ile B’yi bir iple bağlayıp birlikte bırakalım. Aynı iddiadan
                 <strong>iki farklı sonuç</strong> çıkıyor:</p>
                 <ul>
                   <li><strong>Birinci sonuç:</strong> Yavaş olan B, hızlı olan A’yı geriye çeker.
                   Yani ikili, A’dan <em>yavaş</em> düşer.</li>
                   <li><strong>İkinci sonuç:</strong> Bağlanmış ikili, A’dan daha ağırdır.
                   Yani A’dan <em>hızlı</em> düşmelidir.</li>
                 </ul>` },

        { baslik: 'Çelişkiyi gör',
          html: `<p>Aynı varsayım hem "daha yavaş" hem "daha hızlı" diyor. Bu bir
                 <strong>çelişkidir</strong> — demek ki başlangıçtaki varsayım yanlıştır.</p>
                 <div class="formul" style="max-width:340px;border-color:var(--accent)">
                   <div class="fm" style="color:var(--accent);font-size:1.05em">
                     Düşme hızı kütleye bağlı olamaz
                   </div>
                 </div>
                 <p style="margin-top:12px;color:var(--text-2)">Galileo bu sonuca tek bir deney
                 yapmadan, sadece akıl yürüterek ulaştı. Fizikte buna
                 <strong>olmayana ergi</strong> (çelişki ile ispat) denir.</p>` }
      ]
    },
    {
      ad: 'Deneysel kanıt',
      adimlar: [
        { baslik: 'Vakum tüpü deneyi',
          html: `<p>Uzun bir cam tüpün içine bir madenî para ve bir tüy konur. Tüp havayla
                 doluyken ters çevrildiğinde para hemen düşer, tüy yavaşça süzülür.</p>
                 <p>Ardından tüpün havası bir vakum pompasıyla boşaltılır ve deney tekrarlanır:
                 <strong>para ve tüy aynı anda dibe ulaşır.</strong></p>
                 <p style="color:var(--text-2)">Değişen tek şey hava oldu. Demek ki farkı
                 yaratan kütle değil, hava direnciydi.</p>` },

        { baslik: 'Apollo 15 · Ay yüzeyi',
          html: `<p>2 Ağustos 1971’de astronot David Scott, Ay’da 0,03 kg’lık bir şahin tüyü
                 ile 1,32 kg’lık jeolog çekicini aynı yükseklikten aynı anda bıraktı.
                 Kütleleri arasında <strong>44 kat</strong> fark olmasına rağmen ikisi
                 aynı anda yüzeye ulaştı.</p>
                 <p>Ay’ın atmosferi yoktur — yani doğal bir vakum odasıdır. Galileo’nun
                 350 yıl önceki hipotezi böylece Dünya dışında doğrulanmış oldu.</p>
                 <div class="kutu puf" style="margin-top:12px">
                   <p style="margin:0">Aşağıdaki simülasyonda <strong>Ortam</strong>'ı
                   "Ay" yaparsan bu deneyi birebir tekrarlayabilirsin.</p>
                 </div>` }
      ]
    }
  ]
},

/* -------------------------------------------------------- Simülasyon */
sim: F.simler['serbest-dusen-cisimler'],

/* ------------------------------------------------------- Püf noktası */
puf: {
  html: `
    <p><strong>Kütle, yoğunluk, hacim, şekil — hepsi tuzaktır.</strong> Serbest düşme
    sorusunda cismin neyden yapıldığı, kaç kg olduğu asla sonucu değiştirmez.
    Soruda "kütlesi 2m olan cisim" görürsen, o bilgi çoğu zaman <em>sadece seni
    oyalamak için</em> konmuştur.</p>

    <p style="margin-bottom:0"><strong>Serbest düşmede sonucu belirleyen yalnızca üç şey var:</strong>
    yükseklik (h), yer çekimi ivmesi (g) ve ilk hız (ϑ₀). Soruda bunlardan biri
    değişmiyorsa, o büyüklük de değişmez.</p>`,

  ornekler: [
    {
      soru: `<p>Aynı yükseklikten, aynı anda, ilk hızsız bırakılan 1 kg’lık demir bilye ile
             4 kg’lık kurşun bilyenin yere çarpma süreleri arasındaki ilişki nedir?
             (Hava direnci ihmal ediliyor.)</p>`,
      taktikle: `<p>Kütle yazıyorsa <strong>üstünü çiz</strong>. Geriye aynı h ve aynı g kalır.
                 İkisi de <strong>aynı anda</strong> yere iner. İşlem yapmaya gerek yok.</p>`,
      uzun: `<p>h = ½·g·t² ⟹ t = √(2h/g). İfadede m yok, dolayısıyla t<sub>1</sub> = t<sub>2</sub>.</p>`
    },
    {
      soru: `<p>Bir cisim Dünya'da h yüksekliğinden ilk hızsız bırakıldığında t sürede yere iniyor.
             Aynı cisim Ay'da (g<sub>Ay</sub> = g/6) aynı yükseklikten bırakılırsa iniş süresi
             kaç t olur?</p>`,
      taktikle: `<p>t ∝ 1/√g olduğunu ezberle. <strong>g altıda birine düşerse, süre √6 katına çıkar.</strong></p>
                 <p style="margin-bottom:0">Cevap: <strong>√6 · t ≈ 2,45 t</strong></p>`,
      uzun: `<p>t = √(2h/g) ⟹ t<sub>Ay</sub> = √(2h/(g/6)) = √6 · √(2h/g) = √6 · t</p>`
    },
    {
      soru: `<p>Yukarı doğru fırlatılan bir topun <strong>en yüksek noktadaki</strong> hızı ve
             ivmesi için ne söylenebilir?</p>`,
      taktikle: `<p>Klasik tuzak. <strong>Hız sıfırdır ama ivme sıfır değildir.</strong>
                 Top havada olduğu sürece ivmesi hep g’dir ve hep aşağı doğrudur —
                 çıkarken de, tepedeyken de, inerken de.</p>`,
      uzun: `<p>Tepe noktada ϑ = 0. Ancak cisme hâlâ yalnızca ağırlık etki eder:
             F<sub>net</sub> = m·g ⟹ a = g (aşağı yönde).</p>`
    }
  ]
},

/* ------------------------------------------------------------- Sorular */
osym: [
  {
    baslik: 'Tepki süresi deneyi',
    kaynak: 'MEB ders kitabı · Ünite 1 · S.1',
    govde: `
      <p>Elif bir cetveli üst kısmından tutuyor, Ali de elini cetvelin <strong>0 cm</strong>
      hizasında konumlandırıyor. Elif haber vermeden cetveli bırakıyor ve Ali yakalamaya
      çalışıyor. Ali'nin parmaklarını birleştirerek cetveli yakalama süresine
      <strong>tepki süresi</strong> deniyor. Ali cetveli <strong>6 cm</strong> hizasında yakalıyor.</p>

      <p>Ali'nin cetveli yakaladığı noktada yazan değerin <strong>8 cm</strong> olması için</p>
      <ol style="margin-left:.2em">
        <li>Ali'nin tepki süresinin artmasını sağlamak,</li>
        <li>deneyde kütlesi daha fazla olan bir cetvel kullanmak,</li>
        <li>yer çekimi ivmesinin daha az olduğu bir yerde deneyi tekrarlamak</li>
      </ol>
      <p>işlemlerinden hangileri <strong>ayrı ayrı</strong> yapılabilir?</p>
      <p style="font-size:.9em;color:var(--text-3)">(Hava direncini ihmal ediniz.
      Elif ve Ali'nin ellerinin yüksekliklerini sabit kabul ediniz.)</p>`,
    secenekler: ['Yalnız I', 'Yalnız II', 'I ve II', 'I ve III', 'I, II ve III'],
    dogru: 0,
    cozum: `
      <p>Cetvel ilk hızsız serbest düşüyor, dolayısıyla düştüğü mesafe:</p>
      <div class="formul" style="max-width:200px"><div class="fm">h = ½ · g · t²</div></div>
      <p>Yakalanan değerin 6 cm'den 8 cm'ye çıkması demek, <strong>cetvelin daha fazla
      yol alması</strong> demektir. Yani h artmalı.</p>
      <ol>
        <li><strong>Doğru.</strong> Tepki süresi t artarsa, h = ½gt² gereği h artar.
        t karesiyle etkilediği için küçük bir gecikme bile fark yaratır.</li>
        <li><strong>Yanlış.</strong> Formülde kütle yok. Serbest düşmede kütle sonucu
        değiştirmez — bu seçenek klasik tuzaktır.</li>
        <li><strong>Yanlış.</strong> g <em>azalırsa</em> h de <em>azalır</em>.
        Cetvel 6 cm'den daha az yol alırdı, 8 cm'ye çıkmazdı. Yön ters.</li>
      </ol>
      <p style="margin-bottom:0"><strong>Cevap: A) Yalnız I</strong></p>`
  },
  {
    baslik: 'Kule atlama',
    kaynak: 'MEB ders kitabı · Ünite 1 · S.3 (uyarlama)',
    govde: `
      <p>Kule atlama sporcuları Önder ve Şeref, havuzdan sırasıyla <strong>9h</strong> ve
      <strong>8h</strong> yükseklikteki platformların ucunda duruyor.</p>
      <p>Önder ilk hızsız kendini bıraktıktan <strong>t</strong> süre sonra K seviyesinden
      geçiyor. Önder K'den geçtiği anda Şeref de ilk hızsız kendini bırakıyor.</p>
      <p>Her ikisi de havadayken, <strong>aralarındaki düşey uzaklık</strong> zamanla nasıl değişir?</p>
      <p style="font-size:.9em;color:var(--text-3)">(Hava direncini ihmal ediniz, g sabittir.)</p>`,
    secenekler: [
      'Sürekli artar',
      'Sürekli azalır',
      'Önce artar sonra azalır',
      'Değişmez, sabit kalır',
      'Kütlelerine bağlıdır'
    ],
    dogru: 0,
    cozum: `
      <p>İkisi de aynı g ivmesiyle düşüyor, ama <strong>farklı anlarda</strong> başladılar.
      Önder t süre önce başladığı için her an Şeref'ten daha hızlıdır.</p>
      <p>Önder'in hızı: ϑ<sub>Ö</sub> = g·(t + t′), Şeref'inki: ϑ<sub>Ş</sub> = g·t′</p>
      <p>Aradaki hız farkı: ϑ<sub>Ö</sub> − ϑ<sub>Ş</sub> = <strong>g·t</strong> — yani sabit
      ve sıfırdan büyük bir fark. Önder her an Şeref'ten g·t kadar hızlı olduğuna göre
      aralarındaki mesafe sürekli <strong>açılır</strong>.</p>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>Karıştırma:</strong> Eğer ikisi <em>aynı anda</em>
        bıraksaydı, hızları her an eşit olurdu ve aradaki uzaklık <strong>değişmezdi</strong>.
        Farkı yaratan kütleleri veya yükseklikleri değil, <strong>başlama anlarının farklı
        olmasıdır</strong>.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: A) Sürekli artar</strong></p>`
  }
],

/* --------------------------------------------- Bağlam temelli sorular */
baglam: [
  {
    baslik: 'Kuyunun derinliği',
    govde: `
      <p>Bir köy muhtarı, kurumuş bir su kuyusunun ne kadar derin olduğunu merak ediyor.
      Elinde metre yok, ama telefonunun kronometresi var. Kuyunun ağzından küçük bir taş
      bırakıyor ve taşın dibe çarpma sesini duyduğu ana kadar geçen süreyi ölçüyor:
      <strong>2 saniye</strong>.</p>
      <p>Muhtar, sesin havada anında yayıldığını varsayarak hesap yapmak istiyor.
      <strong>g = 10 m/s²</strong> alındığına göre kuyunun derinliği yaklaşık kaç metredir?</p>`,
    gorsel: `
      <svg viewBox="0 0 520 190" xmlns="http://www.w3.org/2000/svg" role="img"
           aria-label="Kuyu kesiti: ağzından taş bırakılıyor, derinlik soru işareti">
        <rect width="520" height="190" fill="#17223A"/>
        <rect x="0" y="52" width="520" height="138" fill="#5A4632"/>
        <rect x="205" y="52" width="110" height="138" fill="#0E1726"/>
        <rect x="197" y="44" width="126" height="12" rx="4" fill="#8A6B4A"/>
        <circle cx="260" cy="78" r="7" fill="#E24B4A"/>
        <circle cx="257" cy="75" r="2.4" fill="#F09595"/>
        <path d="M260 92 L260 150" stroke="#35C08A" stroke-width="2.2" stroke-dasharray="4 5"/>
        <path d="M260 160 L254 148 L266 148 Z" fill="#35C08A"/>
        <text x="340" y="112" fill="#A7B8D4" font-size="15" font-family="system-ui">h = ?</text>
        <text x="340" y="134" fill="#6F84A8" font-size="13" font-family="system-ui">t = 2 s</text>
        <text x="20" y="34" fill="#6F84A8" font-size="13" font-family="system-ui">kuyu ağzı</text>
        <rect x="205" y="168" width="110" height="22" fill="#1D3A52"/>
      </svg>`,
    adimlar: [
      { bas: 'Verilenleri ayıkla',
        metin: 'Hikâyede ölçülen tek şey <strong>süre</strong>: t = 2 s. Bir de g = 10 m/s² verilmiş. "Muhtar", "telefon", "kurumuş kuyu" birer sahne unsuru — fiziksel veri değil.' },
      { bas: 'Olayı fiziksel modele çevir',
        metin: 'Taş elden <em>bırakılıyor</em>, atılmıyor. Demek ki <strong>ϑ₀ = 0</strong> ile serbest düşme. Ses anında duyuluyor kabul edildiği için 2 s’nin tamamı düşme süresidir.' },
      { bas: 'Formülü sen seç',
        metin: 'Elimizde t var, h isteniyor. Bu ikisini bağlayan ifade: <strong>h = ϑ₀·t + ½·g·t²</strong>. ϑ₀ = 0 olduğundan <strong>h = ½·g·t²</strong>.' },
      { bas: 'Hesapla',
        metin: 'h = ½ · 10 · 2² = ½ · 10 · 4 = <strong>20 m</strong>' },
      { bas: 'Yorumla',
        metin: 'Yaklaşık 6 katlı bir bina yüksekliği. Gerçekte ses de yol aldığı için ölçülen 2 s’nin bir kısmı sesin dönüşüne gider — yani gerçek derinlik 20 m’den biraz <em>azdır</em>.' }
    ],
    secenekler: ['10 m', '20 m', '40 m', '5 m', '100 m'],
    dogru: 1,
    cozum: `
      <p>Taş ilk hızsız bırakıldığı için ϑ₀ = 0:</p>
      <div class="formul" style="max-width:260px"><div class="fm">h = ½ · g · t²</div></div>
      <p>h = ½ · 10 · (2)² = <strong>20 m</strong></p>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>Neden 2 ile çarpmak yanlış?</strong> Öğrenciler sıklıkla
        "1 saniyede 5 m düşüyorsa 2 saniyede 10 m düşer" diyor. Ama serbest düşmede yol
        süreyle değil, <strong>sürenin karesiyle</strong> artar. Süre 2 katına çıkarsa yol
        4 katına çıkar: 5 → 20 m.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: B) 20 m</strong></p>`
  },
  {
    baslik: 'Kargo dronu',
    govde: `
      <p>Bir kargo şirketi, dağ köylerine ilaç ulaştırmak için drone kullanıyor. Drone,
      köyün üzerinde <strong>45 m</strong> yükseklikte <strong>havada sabit asılı</strong>
      dururken paketi serbest bırakıyor. Paket küçük bir paraşütle iniyor, ancak
      paraşüt ancak bırakıldıktan 1 saniye sonra açılıyor.</p>
      <p>Mühendis, paraşüt açılana kadar geçen sürede paketin <strong>ne kadar düştüğünü</strong>
      ve <strong>o andaki hızını</strong> bilmek istiyor. (g = 10 m/s², paraşüt açılana kadar
      hava direnci ihmal ediliyor.)</p>`,
    gorsel: `
      <svg viewBox="0 0 520 210" xmlns="http://www.w3.org/2000/svg" role="img"
           aria-label="45 metrede asılı drone paket bırakıyor, 1 saniye sonraki konum">
        <rect width="520" height="210" fill="#17223A"/>
        <rect x="0" y="186" width="520" height="24" fill="#3B5323"/>
        <g transform="translate(180,30)">
          <rect x="-34" y="-4" width="68" height="8" rx="3" fill="#7D8A99"/>
          <circle cx="-34" cy="-4" r="9" fill="none" stroke="#9AA5B1" stroke-width="2.4"/>
          <circle cx="34" cy="-4" r="9" fill="none" stroke="#9AA5B1" stroke-width="2.4"/>
          <rect x="-13" y="2" width="26" height="14" rx="4" fill="#4A5F86"/>
        </g>
        <rect x="168" y="50" width="24" height="18" rx="3" fill="#C98B4B"/>
        <path d="M180 74 L180 106" stroke="#35C08A" stroke-width="2.2" stroke-dasharray="4 5"/>
        <path d="M180 116 L174 104 L186 104 Z" fill="#35C08A"/>
        <rect x="168" y="118" width="24" height="18" rx="3" fill="#C98B4B" opacity=".55"/>
        <path d="M232 46 L232 186" stroke="#6F84A8" stroke-width="1.2"/>
        <path d="M228 46 L236 46 M228 186 L236 186" stroke="#6F84A8" stroke-width="1.2"/>
        <text x="244" y="120" fill="#A7B8D4" font-size="14" font-family="system-ui">45 m</text>
        <text x="300" y="72" fill="#6F84A8" font-size="13" font-family="system-ui">t = 0 · bırakma</text>
        <text x="300" y="134" fill="#6F84A8" font-size="13" font-family="system-ui">t = 1 s · paraşüt açılıyor</text>
      </svg>`,
    adimlar: [
      { bas: 'Verilenleri ayıkla',
        metin: 'Yükseklik 45 m, serbest düşme süresi 1 s, g = 10 m/s². Paketin kütlesi, ilacın ne olduğu, köyün adı — hiçbiri hesaba girmez.' },
      { bas: 'Olayı fiziksel modele çevir',
        metin: 'Drone <strong>havada sabit asılı</strong> duruyor. Bu çok önemli: paketin ilk hızı sıfırdır (<strong>ϑ₀ = 0</strong>). Eğer drone hareket hâlinde olsaydı paket o hızla fırlatılmış sayılırdı.' },
      { bas: 'Formülleri sen seç',
        metin: 'Düşülen yol için <strong>h = ½·g·t²</strong>, o andaki hız için <strong>ϑ = g·t</strong>.' },
      { bas: 'Hesapla',
        metin: 'h = ½ · 10 · 1² = <strong>5 m</strong> düştü. ϑ = 10 · 1 = <strong>10 m/s</strong> hıza ulaştı. Yerden yüksekliği: 45 − 5 = <strong>40 m</strong>.' },
      { bas: 'Yorumla',
        metin: 'Sadece 1 saniyede paket 10 m/s’ye, yani 36 km/s hıza ulaşmış. Paraşütün bu kadar erken açılması tesadüf değil — geç açılsaydı hız çok daha yüksek olacaktı.' }
    ],
    secenekler: [
      '5 m düşer, hızı 10 m/s olur',
      '10 m düşer, hızı 10 m/s olur',
      '5 m düşer, hızı 5 m/s olur',
      '10 m düşer, hızı 20 m/s olur',
      '45 m düşer, hızı 30 m/s olur'
    ],
    dogru: 0,
    cozum: `
      <p>Drone sabit asılı olduğu için paketin ilk hızı sıfırdır.</p>
      <p><strong>Düşülen yol:</strong> h = ½·g·t² = ½ · 10 · 1² = <strong>5 m</strong></p>
      <p><strong>Ulaşılan hız:</strong> ϑ = g·t = 10 · 1 = <strong>10 m/s</strong></p>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>Püf:</strong> g = 10 m/s² iken ilk saniyede cisim
        <strong>5 m</strong> yol alır ama hızı <strong>10 m/s</strong> olur. Bu ikisi
        sürekli karıştırılır. Sebep: yol ortalama hızla hesaplanır — ilk saniyede
        ortalama hız (0 + 10)/2 = 5 m/s’dir, bu yüzden 5 m yol alınır.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: A) 5 m düşer, hızı 10 m/s olur</strong></p>`
  }
]

});
})();
