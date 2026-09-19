(function () {
"use strict";
const F = window.F11;

/* ==========================================================================
   topics/u1-bileske-kuvvet.js
   Konu 1.3.1 · Bileşke kuvvet ve hareket ilişkisi  (MEB 11, s. 40-52)
   Not: Türkçe metinlerde daima tipografik kesme işareti (’) kullanılır;
        düz apostrof (') JavaScript dizgisini kapatıp dosyayı bozar.
   ========================================================================== */

F.konuKaydet('u1-bileske-kuvvet', {

ozet: `Kuvvet cismi hareket ettirmez — <strong>hızını değiştirir</strong>. Bu ayrım
Newton’ın üç yasasının tamamının özüdür. Cisme etki eden kuvvetlerin vektörel toplamı
olan <strong>bileşke kuvvet</strong> sıfırsa hız hiç değişmez; sıfırdan farklıysa
cisim ivmelenir.`,

/* ------------------------------------------------------------- Kavram */
kavram: `
<p>Bir cisme aynı anda birden fazla kuvvet etki edebilir. Bunların vektörel toplamına
<strong>bileşke kuvvet</strong> (veya net kuvvet) denir ve cismin ne yapacağını
belirleyen tek şey budur. Tek tek kuvvetlerin büyüklüğü değil, <strong>toplamları</strong> önemlidir.</p>

<p>Kuvvetler ikiye ayrılır:</p>
<ul>
  <li><strong>Temas kuvvetleri:</strong> İtme, çekme, sürtünme, yay kuvveti — dokunmak gerekir.</li>
  <li><strong>Alan kuvvetleri:</strong> Yer çekimi, manyetik kuvvet, elektriksel kuvvet —
  uzaktan etki eder, dokunmaya gerek yoktur.</li>
</ul>

<h3 style="margin-top:22px">Newton’ın I. Hareket Yasası · Eylemsizlik</h3>
<p>Bir cisim, bir kuvvet tarafından zorlanmadıkça <strong>durgunsa durgun kalır,
hareketliyse sabit hızla yoluna devam eder.</strong></p>

<div class="kutu dikkat" style="margin:14px 0">
  <div class="kutu-bas"><span class="ikon">⚠</span>En yaygın yanılgı</div>
  <p style="margin:0">"Kuvvet yoksa cisim durur" <strong>yanlıştır</strong>. Kuvvet yoksa
  <em>hız değişmez</em>. Duruyorsa durmaya, gidiyorsa aynı hızla gitmeye devam eder.</p>
  <p style="margin:8px 0 0">Bunu simülasyonda kendin gör: F₁ ile F₂’yi eşitle (bileşke sıfır olsun),
  sonra ilk hıza bir değer ver. Cisim üzerinde net kuvvet olmamasına rağmen sabit hızla
  ilerlemeye devam edecek.</p>
</div>

<p>Cismin hızındaki değişime direnme eğilimine <strong>eylemsizlik</strong> denir ve
ölçüsü <strong>kütledir</strong>. Ani fren yapan serviste öğrencilerin öne savrulması,
masa örtüsü hızla çekildiğinde tabakların yerinde kalması hep eylemsizliktir.</p>

<h3 style="margin-top:22px">Newton’ın II. Hareket Yasası · Dinamiğin temel yasası</h3>
<p>Bileşke kuvvet sıfırdan farklıysa cisim ivmelenir. İvme, bileşke kuvvetle
<strong>doğru</strong>, kütleyle <strong>ters</strong> orantılıdır:</p>
<div class="formul" style="max-width:200px;margin:12px 0">
  <div class="fm" style="color:var(--accent)">F = m · a</div>
</div>
<p>İvme her zaman <strong>bileşke kuvvetle aynı yönlüdür</strong> — hızla aynı yönlü olmak
zorunda değildir. Frende kuvvet geriye, hız ileriye doğrudur.</p>

<h3 style="margin-top:22px">Newton’ın III. Hareket Yasası · Etki-tepki</h3>
<p>Bir cisim diğerine kuvvet uygularsa, diğeri de ona <strong>eşit büyüklükte ve zıt yönde</strong>
kuvvet uygular. Kuvvetler daima çiftler hâlinde bulunur.</p>

<div class="kutu dikkat" style="margin:14px 0">
  <div class="kutu-bas"><span class="ikon">⚠</span>Bu konunun en kritik ayrıntısı</div>
  <p style="margin:0">Etki ve tepki kuvvetleri <strong>farklı cisimlere</strong> etki eder.
  Bu yüzden birbirlerini <strong>asla götürmezler</strong>.</p>
  <p style="margin:8px 0 0">Sen duvarı itersin, duvar da seni iter — ama senin kuvvetin
  <em>duvara</em>, duvarınki <em>sana</em> etkir. Bileşke kuvvet hesaplanırken yalnızca
  <strong>tek bir cisme etki eden</strong> kuvvetler toplanır. Etki-tepki çifti hiçbir zaman
  aynı serbest cisim diyagramında yer almaz.</p>
</div>

<h3 style="margin-top:22px">Kütle ve ağırlık aynı şey değil</h3>
<table class="degisken-tablo">
  <thead><tr><th></th><th>Kütle (m)</th><th>Ağırlık (G)</th></tr></thead>
  <tbody>
    <tr><td>Nedir</td><td>Madde miktarı, eylemsizliğin ölçüsü</td><td>Yer çekimi kuvveti</td></tr>
    <tr><td>Birim</td><td class="birim">kg</td><td class="birim">N</td></tr>
    <tr><td>Türü</td><td>Skaler</td><td>Vektörel (yere doğru)</td></tr>
    <tr><td>Ay’da</td><td>Aynı kalır</td><td>Altıda birine düşer</td></tr>
  </tbody>
</table>`,

/* ---------------------------------------------------------- Formüller */
formuller: {
  liste: [
    { fm: 'F<sub>net</sub> = ΣF',  aciklama: 'Kuvvetlerin vektörel toplamı' },
    { fm: 'F = m · a',              aciklama: 'Newton II — dinamiğin temel yasası' },
    { fm: 'G = m · g',              aciklama: 'Ağırlık, Newton II’nin serbest düşmeye uygulanmış hâli' },
    { fm: 'F<sub>net</sub> = 0 ⟹ a = 0', aciklama: 'Denge: hız değişmez (durur ya da sabit hızla gider)' }
  ],
  degiskenler: [
    { sembol: 'F', ad: 'Bileşke (net) kuvvet', birim: 'N' },
    { sembol: 'm', ad: 'Kütle',                birim: 'kg' },
    { sembol: 'a', ad: 'İvme',                 birim: 'm/s²' },
    { sembol: 'G', ad: 'Ağırlık',              birim: 'N' },
    { sembol: 'N', ad: 'Normal (tepki) kuvveti', birim: 'N' }
  ]
},

/* ------------------------------------------------------------ Türetim */
turetim: {
  yollar: [
    {
      ad: 'Deneyden F = m·a’ya',
      adimlar: [
        { baslik: 'Kuvveti iki katına çıkar',
          html: `<p>Sürtünmesiz zeminde m kütleli bir alışveriş arabasını F kuvvetiyle itiyoruz,
                 araba <strong>a</strong> ivmesi kazanıyor.</p>
                 <p>Aynı arabayı <strong>2F</strong> ile itersek ivmesi <strong>2a</strong> oluyor.
                 3F ile itersek 3a…</p>
                 <div class="formul" style="max-width:220px"><div class="fm">a ∝ F</div></div>
                 <p style="margin-top:10px;color:var(--text-2)">Kütle sabitken ivme, kuvvetle
                 <strong>doğru orantılı</strong>.</p>` },

        { baslik: 'Kütleyi iki katına çıkar',
          html: `<p>Şimdi kuvveti F’de sabit tutalım ama arabayı doldurup kütlesini
                 <strong>2m</strong> yapalım. İvme <strong>a/2</strong>’ye düşüyor.
                 3m yaparsak a/3…</p>
                 <div class="formul" style="max-width:220px"><div class="fm">a ∝ 1/m</div></div>
                 <p style="margin-top:10px;color:var(--text-2)">Kuvvet sabitken ivme, kütleyle
                 <strong>ters orantılı</strong>.</p>` },

        { baslik: 'İki orantıyı birleştir',
          html: `<p>İvme hem F ile doğru hem m ile ters orantılıysa:</p>
                 <div class="formul" style="max-width:200px"><div class="fm">a = k · F / m</div></div>
                 <p style="margin-top:10px">Birimler öyle seçilmiştir ki <strong>k = 1</strong> olur:
                 1 kg’lık cisme 1 N kuvvet uygulandığında 1 m/s² ivme kazanır. Bu, newton’un
                 tanımıdır.</p>
                 <div class="formul" style="max-width:200px;border-top-color:var(--accent)">
                   <div class="fm" style="color:var(--accent)">F = m · a</div>
                 </div>` },

        { baslik: 'Yasayı doğru oku',
          html: `<p>Formüldeki F, cisme etki eden <strong>tek bir kuvvet değil, bileşke kuvvettir</strong>.
                 Simülasyondaki halat çekme düzeneğinde:</p>
                 <p>F<sub>net</sub> = F₁ − F₂ &nbsp;⟹&nbsp; a = (F₁ − F₂) / m</p>
                 <div class="kutu puf" style="margin-top:12px">
                   <p style="margin:0">Soruda birden çok kuvvet varsa <strong>önce bileşkeyi bul</strong>,
                   sonra F = m·a uygula. Tek tek kuvvetleri formüle sokmak en sık yapılan hatadır.</p>
                 </div>` }
      ]
    },
    {
      ad: 'Ağırlık formülü G = m·g',
      adimlar: [
        { baslik: 'Serbest düşen cisme bak',
          html: `<p>Hava direnci yokken serbest düşen bir cisme etki eden tek kuvvet
                 <strong>ağırlığıdır</strong>. Yani bileşke kuvvet ağırlığa eşittir:</p>
                 <div class="formul" style="max-width:220px"><div class="fm">F<sub>net</sub> = G</div></div>` },

        { baslik: 'İvmesinin g olduğunu biliyoruz',
          html: `<p>1.1’de gördük: serbest düşen her cismin ivmesi <strong>g</strong>’dir,
                 kütlesinden bağımsız olarak.</p>
                 <p>Newton II’yi bu cisme uygulayalım:</p>
                 <div class="formul" style="max-width:240px"><div class="fm">F<sub>net</sub> = m · a ⟹ G = m · g</div></div>` },

        { baslik: 'Bu neyi açıklıyor?',
          html: `<p>Ağırlık ayrı bir yasa değil — <strong>Newton II’nin yer çekimine
                 uygulanmış hâli.</strong></p>
                 <p>Ayrıca 1.1’deki "kütle neden sadeleşiyor" sorusunun cevabı da burada:</p>
                 <p>a = F/m = (m·g)/m = g</p>
                 <div class="kutu puf" style="margin-top:12px">
                   <p style="margin:0">Ağır cisme daha büyük çekim kuvveti etki eder,
                   ama aynı oranda daha büyük eylemsizliği vardır. İkisi tam olarak birbirini
                   götürür — bu yüzden herkes aynı ivmeyle düşer.</p>
                 </div>` }
      ]
    },
    {
      ad: 'Etki-tepki neden götürmez?',
      adimlar: [
        { baslik: 'Soruyu net koy',
          html: `<p>Newton III’e göre at arabayı çekerken araba da atı geriye eşit kuvvetle çeker.</p>
                 <p><strong>Öyleyse araba nasıl hareket ediyor?</strong> Kuvvetler eşit ve zıtsa
                 toplamları sıfır olmalı, hiçbir şey hareket etmemeli.</p>
                 <p style="color:var(--text-2)">Bu soru yüzyıllarca tartışıldı. Cevabı tek bir
                 kelimede: <strong>hangi cisim?</strong></p>` },

        { baslik: 'Kuvvetlerin uygulandığı cisimleri ayır',
          html: `<p>Etki-tepki çiftinin iki kuvveti <strong>farklı cisimlere</strong> etki eder:</p>
                 <ul>
                   <li>Atın çekme kuvveti → <strong>arabaya</strong> etki eder</li>
                   <li>Arabanın tepki kuvveti → <strong>ata</strong> etki eder</li>
                 </ul>
                 <p>Bileşke kuvvet hesaplanırken <strong>yalnızca tek bir cisme etki eden</strong>
                 kuvvetler toplanır. Farklı cisimlere etki eden kuvvetler aynı toplamda yer alamaz.</p>` },

        { baslik: 'Arabanın serbest cisim diyagramını çiz',
          html: `<p>Sadece arabaya bakalım. Arabaya etki eden yatay kuvvetler:</p>
                 <ul>
                   <li>Atın çekme kuvveti (ileri)</li>
                   <li>Yerle olan sürtünme kuvveti (geri)</li>
                 </ul>
                 <p>Arabanın ata uyguladığı tepki bu listede <strong>yoktur</strong> — çünkü
                 o kuvvet arabaya değil, ata etki eder.</p>
                 <p>Atın çekmesi sürtünmeden büyükse bileşke ileri doğrudur ve araba ivmelenir.</p>` },

        { baslik: 'Kuralı ezberle',
          html: `<div class="formul" style="max-width:420px;border-top-color:var(--accent)">
                   <div class="fm" style="color:var(--accent);font-size:1.05em">
                     Etki-tepki çifti asla aynı diyagramda olmaz
                   </div>
                 </div>
                 <p style="margin-top:14px">İki kuvvetin etki-tepki çifti olup olmadığını
                 anlamanın kesin yolu: <strong>aynı cisme mi etki ediyorlar?</strong>
                 Evetse etki-tepki değildir.</p>
                 <p>Örnek: Masadaki kitaba etki eden ağırlık (G) ve normal kuvvet (N) eşit ve zıttır
                 ama <strong>etki-tepki çifti değildir</strong> — ikisi de aynı cisme, kitaba etki eder.
                 Bunlar sadece birbirini <em>dengeleyen</em> kuvvetlerdir.</p>` }
      ]
    }
  ]
},

/* -------------------------------------------------------- Simülasyon */
sim: F.simler['bileske-kuvvet'],

/* ------------------------------------------------------- Püf noktası */
puf: {
  html: `
    <p><strong>1 · "Bileşke sıfır" demek "duruyor" demek değildir.</strong> Hızın
    <em>değişmediği</em> anlamına gelir. Cisim sabit hızla gidiyor olabilir. Soru
    "bileşke kuvvet sıfırdır" diyorsa aklına gelmesi gereken şey <strong>a = 0</strong>’dır,
    <strong>ϑ = 0</strong> değil.</p>

    <p><strong>2 · İvme kuvvetle aynı yönlüdür, hızla değil.</strong> Fren yapan araçta
    hız ileri, ivme geridir. "Cisim sağa gidiyorsa kuvvet de sağadır" varsayımı yanlıştır.</p>

    <p><strong>3 · Etki-tepki çifti aynı cisme etki etmez</strong> ⟹ birbirini götürmez.
    İki kuvvet eşit-zıt görünüyorsa önce sor: <em>aynı cisme mi etki ediyorlar?</em>
    Evetse bunlar dengeleyen kuvvetlerdir, etki-tepki değil.</p>

    <p><strong>4 · Orantı sorularında formül kurma, oran kur.</strong> F = m·a olduğuna göre:</p>
    <ul>
      <li>Kuvvet 2 katına, kütle sabit → ivme <strong>2 katına</strong></li>
      <li>Kütle 2 katına, kuvvet sabit → ivme <strong>yarıya</strong></li>
      <li>İkisi de 2 katına → ivme <strong>değişmez</strong></li>
    </ul>

    <p><strong>5 · Ağırlık N, kütle kg.</strong> Soruda "kütlesi 600 N olan cisim" gibi bir
    ifade görürsen bu bir tuzaktır — N ağırlığın birimidir. g = 10 iken kütle 60 kg’dır.</p>

    <p style="margin-bottom:0"><strong>6 · Asansör soruları için tek cümle:</strong>
    İvme yukarıysa cisim kendini <strong>ağır</strong> hisseder (N > G),
    ivme aşağıysa <strong>hafif</strong> hisseder (N &lt; G).
    Serbest düşüşte N = 0 — ağırlıksızlık budur.</p>`,

  ornekler: [
    {
      soru: `<p>Sürtünmesiz yatay düzlemde duran 4 kg’lık cisme sağa doğru 30 N,
             sola doğru 10 N kuvvet uygulanıyor. Cismin ivmesi kaç m/s²’dir?</p>`,
      taktikle: `<p>Önce bileşke: 30 − 10 = <strong>20 N</strong> (sağa).</p>
                 <p style="margin-bottom:0">a = 20/4 = <strong>5 m/s²</strong>, sağa doğru.</p>`,
      uzun: `<p>F<sub>net</sub> = ΣF = 30 − 10 = 20 N</p>
             <p>F = m·a ⟹ 20 = 4·a ⟹ a = 5 m/s²</p>
             <p style="color:var(--text-3)">30/4 = 7,5 diyenler bileşkeyi almayı unutmuştur.</p>`
    },
    {
      soru: `<p>Bir cisme F kuvveti uygulandığında a ivmesi kazanıyor. Aynı cisme
             <strong>3F</strong> kuvveti uygulanır ve kütlesi <strong>2 katına</strong>
             çıkarılırsa yeni ivmesi kaç a olur?</p>`,
      taktikle: `<p>Formül kurma, <strong>oran kur</strong>: a = F/m</p>
                 <p style="margin-bottom:0">Yeni a = 3F/2m = <strong>1,5a</strong></p>`,
      uzun: `<p>a₁ = F/m, a₂ = 3F/(2m) = (3/2)·(F/m) = 1,5·a₁</p>`
    },
    {
      soru: `<p>Bir kişi asansörde tartıya çıkıyor. Asansör <strong>yukarı doğru
             2 m/s² ivmeyle</strong> hareket ederken tartı 60 kg’lık kişi için kaç N gösterir?
             (g = 10 m/s²)</p>`,
      taktikle: `<p>İvme yukarı ⟹ kişi kendini <strong>ağır</strong> hisseder ⟹ N > G.</p>
                 <p style="margin-bottom:0">N = m(g + a) = 60 · (10 + 2) = <strong>720 N</strong></p>`,
      uzun: `<p>Kişiye etki eden kuvvetler: N (yukarı), G = 600 N (aşağı).</p>
             <p>Newton II (yukarı pozitif): N − G = m·a ⟹ N = 600 + 60·2 = 720 N</p>
             <p style="color:var(--text-3)">Asansör aşağı ivmelenseydi: N = 60·(10−2) = 480 N.</p>`
    }
  ]
},

/* ------------------------------------------------------ Zorlayıcı sorular */
osym: [
  {
    baslik: 'Etki-tepki',
    kaynak: 'Kavram tuzağı',
    govde: `
      <p>Bir kitap yatay bir masanın üzerinde durmaktadır. Kitaba etki eden
      <strong>ağırlık (G)</strong> ile masanın kitaba uyguladığı
      <strong>normal kuvvet (N)</strong> için aşağıdakilerden hangisi <strong>doğrudur</strong>?</p>`,
    gorsel: `
      <svg viewBox="0 0 520 190" xmlns="http://www.w3.org/2000/svg" role="img"
           aria-label="Masa üzerindeki kitaba etki eden normal kuvvet ve ağırlık vektörleri">
        <rect width="520" height="190" fill="#0E1726"/>
        <rect x="120" y="120" width="280" height="10" fill="#8A5A28"/>
        <rect x="140" y="130" width="12" height="46" fill="#8A5A28"/>
        <rect x="368" y="130" width="12" height="46" fill="#8A5A28"/>
        <rect x="228" y="98" width="64" height="22" rx="3" fill="#2E3D57" stroke="#4A5F86"/>
        <text x="260" y="114" fill="#EAF0FA" font-size="12" font-family="system-ui" text-anchor="middle">kitap</text>
        <path d="M260 96 L260 48" stroke="#38D6E0" stroke-width="2.6"/>
        <path d="M260 38 L253 52 L267 52 Z" fill="#38D6E0"/>
        <text x="272" y="60" fill="#38D6E0" font-size="14" font-family="system-ui">N</text>
        <path d="M260 122 L260 166" stroke="#FF8FA3" stroke-width="2.6"/>
        <path d="M260 176 L253 162 L267 162 Z" fill="#FF8FA3"/>
        <text x="272" y="156" fill="#FF8FA3" font-size="14" font-family="system-ui">G</text>
      </svg>`,
    secenekler: [
      'Etki-tepki çiftidirler',
      'Eşit büyüklüktedirler ama etki-tepki çifti değildirler',
      'N her zaman G’den büyüktür',
      'İkisi de masaya etki eder',
      'Bileşkeleri sıfırdan farklıdır'
    ],
    dogru: 1,
    cozum: `
      <p>Kitap durduğuna göre ivmesi sıfırdır, dolayısıyla bileşke kuvvet de sıfırdır:
      <strong>N = G</strong>. Bu E’yi eler, C’yi de eler.</p>
      <p>Ama <strong>etki-tepki çifti değildirler.</strong> Sebep: ikisi de
      <strong>aynı cisme</strong> — kitaba — etki eder. Etki-tepki çiftinin iki kuvveti
      daima farklı cisimlere etkir.</p>
      <p>Bu iki kuvvetin gerçek tepkileri şunlardır:</p>
      <ul>
        <li><strong>G’nin tepkisi:</strong> Kitabın <em>Dünya’ya</em> uyguladığı çekim kuvveti</li>
        <li><strong>N’nin tepkisi:</strong> Kitabın <em>masaya</em> uyguladığı basma kuvveti</li>
      </ul>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>A şıkkı bu konudaki en yaygın hatadır.</strong> "Eşit ve zıt"
        olmak etki-tepki için yeterli değildir. Testi şu: <em>aynı cisme mi etki ediyorlar?</em>
        Evetse dengeleyen kuvvetlerdir. Farklı cisimlereyse etki-tepki çiftidir.
        <br>D şıkkı ise okun nereden çıktığına bakmadan cevap verenleri toplar — her iki ok da
        kitaptan çıkıyor, masadan değil.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: B</strong></p>`
  },
  {
    baslik: 'Bileşke kuvvet ve hız',
    kaynak: 'Kavram tuzağı',
    govde: `
      <p>Sürtünmesiz yatay düzlemde <strong>sağa doğru 10 m/s sabit hızla</strong> hareket eden
      bir cisme, hareket yönüne <strong>zıt yönde</strong> sabit bir F kuvveti uygulanmaya başlıyor.</p>
      <p>Kuvvet uygulanmaya başladıktan sonraki hareket için aşağıdakilerden hangisi
      <strong>yanlıştır</strong>?</p>`,
    secenekler: [
      'Cisim önce yavaşlar',
      'Cismin ivmesi sola doğrudur',
      'Cisim bir an durur, sonra sola doğru hızlanır',
      'Cisim durduğu anda ivmesi de sıfır olur',
      'İvmenin büyüklüğü hareket boyunca sabittir'
    ],
    dogru: 3,
    cozum: `
      <p>Kuvvet sola, hız sağa. İvme daima kuvvetle aynı yönlü olduğundan
      <strong>ivme sola doğrudur</strong> ve sabit F için sabit kalır.</p>
      <ol>
        <li><strong>Doğru.</strong> İvme hıza zıt olduğu için cisim yavaşlar.</li>
        <li><strong>Doğru.</strong> a = F/m, F sola ⟹ a sola.</li>
        <li><strong>Doğru.</strong> Yavaşlar, sıfırlanır, sonra sola doğru hızlanır —
        tıpkı yukarı atılan taşın hikâyesi gibi.</li>
        <li><strong>YANLIŞ — aranan cevap bu.</strong> Cisim durduğu anda <em>hızı</em> sıfırdır,
        <em>ivmesi</em> değil. Kuvvet hâlâ etki ettiği için ivme hâlâ F/m’dir. İvme sıfır olsaydı
        cisim orada kalırdı.</li>
        <li><strong>Doğru.</strong> F ve m sabit ⟹ a sabit.</li>
      </ol>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0">Bu, <strong>1.1’deki "tepede ivme sıfır mı" sorusunun ikizidir.</strong>
        Aynı yanılgı farklı kılıklarda tekrar tekrar karşına çıkar: <strong>hızın sıfır olduğu an,
        ivmenin sıfır olduğu an değildir.</strong> Bu cümleyi ezberle, iki farklı konuda birden
        işine yarar.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: D</strong></p>`
  }
],

/* --------------------------------------------- Bağlam temelli sorular */
baglam: [
  {
    baslik: 'Emniyet kemeri neden zorunlu?',
    govde: `
      <p>Bir trafik güvenliği kampanyasında şu veri paylaşılıyor: "Şehir içi hızda (50 km/s)
      çarpışmada emniyet kemeri takmayan bir yolcu, <strong>çarpışma anında</strong> öne doğru
      fırlar ve ön cama çarpar."</p>
      <p>Kampanyayı hazırlayan ekip, bunun fiziksel açıklamasını yapmak istiyor.
      Bir öğrenci şöyle diyor: "Çarpışmada araca arkadan bir kuvvet uygulanıyor,
      o kuvvet yolcuyu öne itiyor."</p>
      <p><strong>Öğrencinin açıklaması doğru mudur? Olayın gerçek sebebi nedir?</strong></p>`,
    gorsel: `
      <svg viewBox="0 0 520 190" xmlns="http://www.w3.org/2000/svg" role="img"
           aria-label="Ani duran araçta yolcunun eylemsizlik nedeniyle öne doğru hareketi">
        <rect width="520" height="190" fill="#17223A"/>
        <rect x="0" y="152" width="520" height="38" fill="#3C3C3A"/>
        <path d="M20 152 H500" stroke="#FFB020" stroke-width="2" stroke-dasharray="18 14"/>
        <g transform="translate(150,96)">
          <path d="M-70 40 L-70 6 L-40 6 L-22 -18 L34 -18 L48 6 L70 6 L70 40 Z" fill="#2E5C8A"/>
          <path d="M-36 4 L-20 -14 L6 -14 L6 4 Z" fill="#9FC8E8"/>
          <path d="M12 4 L12 -14 L32 -14 L44 4 Z" fill="#9FC8E8"/>
          <circle cx="-40" cy="42" r="13" fill="#23262B"/><circle cx="-40" cy="42" r="5" fill="#7D8A99"/>
          <circle cx="42" cy="42" r="13" fill="#23262B"/><circle cx="42" cy="42" r="5" fill="#7D8A99"/>
          <circle cx="-4" cy="-4" r="7" fill="#FFD9B0"/>
          <path d="M-4 3 L-4 18" stroke="#E0E4EA" stroke-width="5" stroke-linecap="round"/>
        </g>
        <path d="M74 118 L40 118" stroke="#FF6B6B" stroke-width="3"/>
        <path d="M30 118 L46 111 L46 125 Z" fill="#FF6B6B"/>
        <text x="46" y="104" fill="#FF6B6B" font-size="12" font-family="system-ui" text-anchor="middle">araç durur</text>
        <path d="M168 84 L232 84" stroke="#35C08A" stroke-width="3"/>
        <path d="M242 84 L226 77 L226 91 Z" fill="#35C08A"/>
        <text x="258" y="80" fill="#35C08A" font-size="12" font-family="system-ui">yolcu devam eder</text>
        <text x="258" y="98" fill="#6F84A8" font-size="11" font-family="system-ui">(hiçbir kuvvet onu durdurmuyor)</text>
      </svg>`,
    adimlar: [
      { bas: 'İddiayı incele',
        metin: 'Öğrenci "yolcuyu öne iten bir kuvvet var" diyor. Fizikte bir iddiayı sınamanın yolu: <strong>o kuvveti kim uyguluyor?</strong> Kuvvet iki cisim arasındaki etkileşimdir — uygulayıcısı olmayan kuvvet olmaz.' },
      { bas: 'Uygulayıcıyı ara',
        metin: 'Yolcuya öne doğru kuvvet uygulayan bir cisim yok. Koltuk arkadan itemez (temas kopuyor), hava itemez. <strong>Öne doğru bir kuvvet yoktur</strong> — öğrencinin açıklaması yanlıştır.' },
      { bas: 'Olayı Newton I ile kur',
        metin: 'Çarpışmadan önce araç ve yolcu <strong>birlikte</strong> 50 km/s ile gidiyordu. Çarpışmada <em>araca</em> büyük bir kuvvet etki edip onu durdurdu. Ama <strong>yolcuya hiçbir kuvvet etki etmedi</strong>.' },
      { bas: 'Sonucu çıkar',
        metin: 'Newton I gereği, üzerine kuvvet etki etmeyen yolcu <strong>hızını korur</strong> — yani 50 km/s ile ileri gitmeye devam eder. Araç durduğu için yolcu araca göre öne gidiyormuş gibi görünür. Aslında yolcu hareketini sürdürüyor, araç onun altından çekiliyor.' },
      { bas: 'Kemerin işlevini açıkla',
        metin: 'Emniyet kemeri, yolcuya <strong>geriye doğru bir kuvvet uygulayarak</strong> onu araçla birlikte yavaşlatır. Yani kemer "tutmaz", <strong>ivmelendirir</strong> — eksik olan kuvveti sağlar.' }
    ],
    secenekler: [
      'Öğrenci haklı, araca uygulanan kuvvet yolcuyu da öne iter',
      'Öğrenci yanılıyor; yolcu eylemsizlik nedeniyle hızını korur, ona öne doğru kuvvet etki etmez',
      'Öğrenci haklı, ama kuvvetin adı merkezkaç kuvvetidir',
      'Yolcu öne gider çünkü ağırlığı öne doğrudur',
      'Yolcunun kütlesi araçtan küçük olduğu için öne fırlar'
    ],
    dogru: 1,
    cozum: `
      <p>Yolcuyu öne iten <strong>hiçbir kuvvet yoktur</strong>. Olayın sebebi kuvvetin
      varlığı değil, <strong>yokluğudur</strong>.</p>
      <p>Çarpışmada araç bir kuvvetle durdurulur; yolcuya böyle bir kuvvet etki etmediği için
      Newton I gereği <strong>hızını korur</strong> ve ileri gitmeye devam eder.</p>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>C şıkkındaki "merkezkaç kuvveti"</strong> gerçek bir kuvvet
        değildir; hareketli bir gözlem çerçevesinde ortaya çıkan görünür bir etkidir ve zaten
        doğrusal harekette adı bile geçmez.
        <br><strong>E şıkkı</strong> ise eylemsizliği yanlış kullanır — kütlenin küçük olması
        yolcuyu fırlatmaz. Kütle ne olursa olsun, kuvvet uygulanmayan her cisim hızını korur.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: B</strong></p>`
  },
  {
    baslik: 'Kargo asansörünün halatı',
    govde: `
      <p>Bir depoda kargo asansörü kullanılıyor. Asansörün halatı, üreticinin belirttiğine göre
      en fazla <strong>6000 N</strong> gerilime dayanabiliyor.</p>
      <p>Depo sorumlusu, asansöre <strong>500 kg</strong> yük koyup yukarı çıkarmak istiyor.
      Asansör hareketine başlarken <strong>yukarı doğru 2 m/s² ivmeyle</strong> hızlanıyor.</p>
      <p><strong>Halat bu yükü güvenle taşır mı?</strong> (g = 10 m/s², asansör kabininin
      kütlesi ihmal ediliyor)</p>`,
    gorsel: `
      <svg viewBox="0 0 520 210" xmlns="http://www.w3.org/2000/svg" role="img"
           aria-label="Halatla yukarı ivmelenen asansör kabinine etki eden gerilme ve ağırlık kuvvetleri">
        <rect width="520" height="210" fill="#17223A"/>
        <rect x="150" y="16" width="220" height="10" fill="#5F5E5A"/>
        <path d="M260 26 L260 74" stroke="#9AA5B1" stroke-width="4"/>
        <rect x="204" y="74" width="112" height="86" rx="4" fill="#3A4E76" stroke="#6F84A8" stroke-width="1.6"/>
        <rect x="222" y="96" width="76" height="46" rx="3" fill="#C98B4B"/>
        <text x="260" y="124" fill="#4A2E10" font-size="13" font-family="system-ui" text-anchor="middle" font-weight="700">500 kg</text>
        <path d="M340 120 L340 74" stroke="#38D6E0" stroke-width="2.6"/>
        <path d="M340 64 L333 78 L347 78 Z" fill="#38D6E0"/>
        <text x="352" y="96" fill="#38D6E0" font-size="14" font-family="system-ui">T = ?</text>
        <path d="M180 120 L180 172" stroke="#FF8FA3" stroke-width="2.6"/>
        <path d="M180 182 L173 168 L187 168 Z" fill="#FF8FA3"/>
        <text x="140" y="150" fill="#FF8FA3" font-size="14" font-family="system-ui">G</text>
        <path d="M414 150 L414 104" stroke="#FFB020" stroke-width="2.6"/>
        <path d="M414 94 L407 108 L421 108 Z" fill="#FFB020"/>
        <text x="426" y="132" fill="#FFB020" font-size="13" font-family="system-ui">a = 2 m/s²</text>
      </svg>`,
    adimlar: [
      { bas: 'Verilenleri ayıkla',
        metin: 'm = 500 kg, a = 2 m/s² yukarı, g = 10 m/s², halat sınırı 6000 N. Depo, kargo gibi ayrıntılar sahne unsuru.' },
      { bas: 'Yanılgıyı fark et',
        metin: 'İlk akla gelen G = 500 · 10 = 5000 N < 6000 N, "taşır" demek. <strong>Bu eksik bir hesaptır</strong> — asansör duruyor olsaydı doğru olurdu. Ama asansör <em>ivmeleniyor</em>.' },
      { bas: 'Serbest cisim diyagramını çiz',
        metin: 'Kabine etki eden iki kuvvet: halatın gerilmesi <strong>T (yukarı)</strong> ve ağırlık <strong>G = 5000 N (aşağı)</strong>. İvme yukarı olduğuna göre T, G’den büyük olmalı.' },
      { bas: 'Newton II’yi uygula',
        metin: 'Yukarı yönü pozitif alalım:<br><strong>T − G = m·a</strong>' },
      { bas: 'Hesapla',
        metin: 'T = G + m·a = 5000 + 500·2 = 5000 + 1000 = <strong>6000 N</strong>' },
      { bas: 'Yorumla',
        metin: 'Gerilme tam olarak halatın sınırına eşit — <strong>hiç güvenlik payı yok</strong>. Mühendislikte kabul edilemez. Çözüm: yükü azaltmak ya da daha yavaş ivmelenmek. İvme 1 m/s² olsaydı T = 5500 N olurdu.' }
    ],
    secenekler: [
      'Evet, gerilme 5000 N olur',
      'Hayır, gerilme 7000 N olur',
      'Tam sınırda: gerilme 6000 N olur, güvenlik payı kalmaz',
      'Evet, gerilme 4000 N olur',
      'Gerilme kütleye bağlı değildir'
    ],
    dogru: 2,
    cozum: `
      <p>Kabine etki eden kuvvetler: T (yukarı), G = m·g = 5000 N (aşağı).</p>
      <p>İvme yukarı olduğundan, yukarı pozitif alarak:</p>
      <div class="formul" style="max-width:260px"><div class="fm">T − G = m · a</div></div>
      <p>T = 5000 + 500·2 = <strong>6000 N</strong></p>
      <p>Halatın sınırına <em>tam olarak</em> eşit. Teknik olarak kopmaz ama
      <strong>güvenlik payı sıfırdır</strong> — kabul edilemez.</p>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>A şıkkı (5000 N)</strong> ivmeyi hesaba katmayanlar için —
        bu sorudaki asıl tuzak odur. Cisim ivmeleniyorsa gerilme ağırlığa eşit değildir.
        <br><strong>Ezberlenecek üç durum:</strong> yukarı ivmeli → T = m(g+a) · aşağı ivmeli →
        T = m(g−a) · sabit hız veya duruyor → T = m·g. Asansör sorularının tamamı bu üç satırda.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: C</strong></p>`
  }
]

});
})();
