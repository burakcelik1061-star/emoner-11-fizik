(function () {
"use strict";
const F = window.F11;

/* ==========================================================================
   topics/u1-limit-hiz.js
   Konu 1.5 · Limit hız   (MEB 11, s. 86-94)
   ========================================================================== */

F.konuKaydet('u1-limit-hiz', {

ozet: `Şimdiye kadar hava direncini hep ihmal ettik. Bu konuda onu hesaba katıyoruz ve
şaşırtıcı bir sonuç çıkıyor: <strong>düşen bir cisim sonsuza kadar hızlanmaz.</strong>
Belli bir hıza ulaşıp orada sabitlenir. Bu hıza <strong>limit hız</strong> denir.`,

/* ------------------------------------------------------------- Kavram */
kavram: `
<p>Bir akışkan (hava, su) içinde hareket eden cisme, hareketine <strong>zıt yönde</strong>
akışkan tarafından bir kuvvet uygulanır. Buna <strong>direnç kuvveti</strong> veya
<strong>sürüklenme kuvveti</strong> denir ve F<sub>d</sub> ile gösterilir.</p>

<p>Bu kuvvetin en kritik özelliği şudur: <strong>hız arttıkça büyür.</strong> Serbest
düşmedeki sabit yer çekimi kuvvetinden temel farkı budur.</p>

<h3 style="margin-top:22px">Paraşütçünün hikâyesi — dört aşama</h3>
<div style="display:grid;gap:10px;margin:14px 0">
  <div style="display:flex;gap:12px;background:var(--surface-0);border:1px solid var(--border);border-left:3px solid var(--b1);border-radius:var(--r-sm);padding:12px 14px">
    <strong style="color:var(--b1);flex:0 0 auto">1</strong>
    <div><strong>Atlayış anı:</strong> ϑ = 0 olduğu için F<sub>d</sub> = 0.
    Cisme etki eden tek kuvvet ağırlık ⟹ <strong>a = g</strong>. Tam serbest düşme.</div>
  </div>
  <div style="display:flex;gap:12px;background:var(--surface-0);border:1px solid var(--border);border-left:3px solid var(--b5);border-radius:var(--r-sm);padding:12px 14px">
    <strong style="color:var(--b5);flex:0 0 auto">2</strong>
    <div><strong>Hızlanma:</strong> Hız arttıkça F<sub>d</sub> büyür, net kuvvet küçülür.
    Cisim <em>hâlâ hızlanıyor</em> ama <strong>gittikçe daha yavaş hızlanıyor</strong>.</div>
  </div>
  <div style="display:flex;gap:12px;background:var(--surface-0);border:1px solid var(--border);border-left:3px solid var(--b4);border-radius:var(--r-sm);padding:12px 14px">
    <strong style="color:var(--b4);flex:0 0 auto">3</strong>
    <div><strong>Limit hız:</strong> F<sub>d</sub> = G olduğu an net kuvvet sıfırlanır ⟹
    <strong>a = 0</strong>. Hız artık değişmez, cisim <strong>sabit hızla</strong> düşer.</div>
  </div>
  <div style="display:flex;gap:12px;background:var(--surface-0);border:1px solid var(--border);border-left:3px solid var(--b7);border-radius:var(--r-sm);padding:12px 14px">
    <strong style="color:var(--b7);flex:0 0 auto">4</strong>
    <div><strong>Paraşüt açılınca:</strong> Kesit alanı aniden büyür ⟹ F<sub>d</sub> fırlar ⟹
    net kuvvet <em>yukarı</em> döner ⟹ cisim <strong>yavaşlar</strong> ve
    çok daha küçük yeni bir limit hızda sabitlenir.</div>
  </div>
</div>

<div class="kutu dikkat" style="margin:14px 0">
  <div class="kutu-bas"><span class="ikon">⚠</span>2. aşamadaki incelik</div>
  <p style="margin:0">"İvme azalıyor" ile "hız azalıyor" aynı şey <strong>değildir</strong>.
  İkinci aşamada ivme küçülür ama hâlâ pozitiftir — yani cisim hızlanmaya devam eder,
  sadece daha isteksizce. Hız ancak paraşüt açıldığında (4. aşama) gerçekten azalır.</p>
</div>

<h3 style="margin-top:22px">Direnç kuvveti neye bağlı?</h3>
<p>Kitabın Tablo 1.2’sine göre üç değişkene:</p>
<table class="degisken-tablo">
  <thead><tr><th>Değişken</th><th>Açıklama</th><th>Etkisi</th></tr></thead>
  <tbody>
    <tr><td class="sembol">k</td><td>Cisim ile akışkan arasındaki sürtünme katsayısı (birimsiz)</td><td>Büyükse direnç büyür</td></tr>
    <tr><td class="sembol">A</td><td>Hareket doğrultusuna dik en büyük kesit alanı</td><td>Büyükse direnç büyür</td></tr>
    <tr><td class="sembol">ϑ</td><td>Cismin akışkana göre hız büyüklüğü</td><td>Karesiyle etkiler</td></tr>
  </tbody>
</table>
<p style="margin-top:10px">Bu üçü birleştirilerek yazılır. Hesap kolaylığı için k ve A’yı tek
bir <strong>D</strong> katsayısında toplarsak:</p>
<div class="formul" style="max-width:220px;margin:12px 0">
  <div class="fm">F<sub>d</sub> = D · ϑ²</div>
</div>

<h3 style="margin-top:22px">Rekorlar ne anlatıyor?</h3>
<p>Felix Baumgartner 2012’de yaklaşık <strong>39 km</strong> yükseklikten atladı ve
<strong>1357,6 km/s</strong> hıza ulaşarak ses hızını serbest düşüşle aşan ilk insan oldu.</p>
<p>Peki neden bu kadar hızlanabildi? Çünkü 39 km’de <strong>hava neredeyse yok</strong>.
Hava yoksa direnç de yok, dolayısıyla limit hız çok yüksek. Alçaldıkça hava yoğunlaştı,
direnç büyüdü ve <em>yavaşlamaya</em> başladı — paraşütünü açmadan önce bile.</p>
<p style="color:var(--text-2)">Aynı sebeple Ay’da limit hız diye bir şey yoktur:
atmosfer olmadığı için cisimler sonsuza kadar hızlanır.</p>`,

/* ---------------------------------------------------------- Formüller */
formuller: {
  liste: [
    { fm: 'F<sub>d</sub> = D · ϑ²',            aciklama: 'Direnç kuvveti — hızın karesiyle büyür' },
    { fm: 'F<sub>net</sub> = G − F<sub>d</sub>', aciklama: 'Düşerken net kuvvet' },
    { fm: 'a = g − (D/m)·ϑ²',                  aciklama: 'Anlık ivme' },
    { fm: 'F<sub>d</sub> = G ⟹ a = 0',         aciklama: 'Limit hız koşulu' },
    { fm: 'ϑ<sub>L</sub> = √(m·g / D)',        aciklama: 'Limit hızın değeri' }
  ],
  degiskenler: [
    { sembol: 'F<sub>d</sub>', ad: 'Direnç (sürüklenme) kuvveti', birim: 'N' },
    { sembol: 'D',             ad: 'Sürüklenme katsayısı (k·A)',  birim: 'kg/m' },
    { sembol: 'ϑ<sub>L</sub>', ad: 'Limit hız',                   birim: 'm/s' },
    { sembol: 'A',             ad: 'Kesit alanı',                 birim: 'm²' },
    { sembol: 'm',             ad: 'Kütle',                       birim: 'kg' }
  ]
},

/* ------------------------------------------------------------ Türetim */
turetim: {
  yollar: [
    {
      ad: 'Limit hız formülü',
      adimlar: [
        { baslik: 'Serbest cisim diyagramını kur',
          html: `<p>Düşen paraşütçüye <strong>iki</strong> kuvvet etki eder:</p>
                 <ul>
                   <li><strong>Ağırlık G = m·g</strong> — aşağı, <em>sabit</em></li>
                   <li><strong>Direnç F<sub>d</sub> = D·ϑ²</strong> — yukarı, <em>hızla büyüyen</em></li>
                 </ul>
                 <p>Aşağı yönü pozitif alalım:</p>
                 <div class="formul" style="max-width:260px"><div class="fm">F<sub>net</sub> = G − F<sub>d</sub></div></div>` },

        { baslik: 'Newton II’yi yaz',
          html: `<p>m·a = m·g − D·ϑ²</p>
                 <p>Her iki tarafı m’ye bölelim:</p>
                 <div class="formul" style="max-width:280px"><div class="fm">a = g − (D/m)·ϑ²</div></div>
                 <p style="margin-top:10px">Bu ifade her şeyi anlatıyor: ϑ = 0 iken a = g
                 (serbest düşme), ϑ büyüdükçe çıkarılan terim büyüyor ve a küçülüyor.</p>` },

        { baslik: 'Limit hız koşulunu koy',
          html: `<p>"Limit hız" ne demek? <strong>Hızın artık değişmediği</strong> durum,
                 yani <strong>a = 0</strong>.</p>
                 <p>0 = g − (D/m)·ϑ<sub>L</sub>²</p>
                 <p>Bu, aynı zamanda <strong>F<sub>d</sub> = G</strong> demektir —
                 direnç ağırlığa yetişmiştir.</p>` },

        { baslik: 'ϑ_L’yi çek',
          html: `<p>(D/m)·ϑ<sub>L</sub>² = g ⟹ ϑ<sub>L</sub>² = m·g / D</p>
                 <div class="formul" style="max-width:240px;border-top-color:var(--accent)">
                   <div class="fm" style="color:var(--accent)">ϑ<sub>L</sub> = √(m·g / D)</div>
                 </div>
                 <p style="margin-top:12px">Formülün söyledikleri:</p>
                 <ul>
                   <li><strong>Kütle artarsa</strong> limit hız <em>artar</em> — ağır cisim daha hızlı düşer</li>
                   <li><strong>Kesit alanı artarsa</strong> (D büyür) limit hız <em>azalır</em></li>
                 </ul>
                 <div class="kutu puf" style="margin-top:12px">
                   <p style="margin:0">Dikkat: burada kütlenin önemi var! Serbest düşmede kütle
                   sadeleşiyordu, <strong>hava direnci varken sadeleşmiyor</strong>. Tüy ile taşın
                   farklı hızlarda düşmesinin nedeni tam olarak budur — 1.1’deki cevabın
                   matematiksel hâli.</p>
                 </div>` }
      ]
    },
    {
      ad: 'Kütle mi, alan mı?',
      adimlar: [
        { baslik: 'Soruyu net koy',
          html: `<p>İki A4 kâğıdı düşünelim. Biri düz, diğeri buruşturulmuş top hâlinde.
                 <strong>Kütleleri tamamen aynı.</strong> Aynı yükseklikten bırakırsak
                 hangisi önce yere iner?</p>
                 <p style="color:var(--text-2)">Deneyi yapmadan tahmin et, sonra formüle sor.</p>` },

        { baslik: 'Formüle sor',
          html: `<p>ϑ<sub>L</sub> = √(m·g / D) ifadesinde m ikisi için de aynı.
                 Fark yalnızca <strong>D</strong>’de, yani <strong>kesit alanında</strong>.</p>
                 <ul>
                   <li>Düz kâğıt: kesit alanı büyük ⟹ D büyük ⟹ ϑ<sub>L</sub> <strong>küçük</strong></li>
                   <li>Buruşuk kâğıt: kesit alanı küçük ⟹ D küçük ⟹ ϑ<sub>L</sub> <strong>büyük</strong></li>
                 </ul>
                 <p><strong>Buruşuk kâğıt önce iner</strong> — kütlesi aynı olmasına rağmen.</p>` },

        { baslik: 'Şimdi kütleyi değiştir',
          html: `<p>Aynı büyüklükte iki paraşütçü, biri 60 kg diğeri 90 kg, aynı duruşta atlasın.
                 D ikisi için aynı, m farklı:</p>
                 <p>ϑ<sub>L</sub> ∝ √m ⟹ ağır olan <strong>√(90/60) = 1,22 kat</strong> daha hızlı düşer.</p>
                 <div class="kutu puf" style="margin-top:12px">
                   <p style="margin:0">Bu yüzden paraşütle grup atlayışlarında ağır atlayıcılar
                   daha "yayılarak", hafifler daha "dik" durarak hızlarını eşitler.
                   Duruş değiştirerek D’yi ayarlarlar.</p>
                 </div>` },

        { baslik: 'Genel kuralı yaz',
          html: `<div class="formul" style="max-width:420px;border-top-color:var(--accent)">
                   <div class="fm" style="color:var(--accent);font-size:1em">
                     Ağır + ince ⟹ hızlı düşer &nbsp;·&nbsp; Hafif + geniş ⟹ yavaş düşer
                   </div>
                 </div>
                 <p style="margin-top:14px">Bu kural doğadaki pek çok şeyi açıklar:
                 kar tanesi neden yavaş iner (hafif ve geniş), dolu tanesi neden hızlı düşer
                 (ağır ve küçük), kedilerin neden yüksekten düşüp sağ kalabildiği
                 (küçük kütle, düşerken yayılarak D’yi büyütme).</p>` }
      ]
    }
  ]
},

/* -------------------------------------------------------- Simülasyon */
sim: F.simler['limit-hiz'],

/* ------------------------------------------------------- Püf noktası */
puf: {
  html: `
    <p><strong>1 · "Limit hız" = "a = 0" demektir.</strong> Bu ifadeyi gördüğün an
    <strong>F<sub>d</sub> = G</strong> yaz. Sorunun çoğu burada biter.</p>

    <p><strong>2 · İvme azalır ≠ hız azalır.</strong> Limit hıza yaklaşırken ivme küçülür
    ama hız <em>hâlâ artıyordur</em>. Hız ancak direnç ağırlığı <strong>aşarsa</strong> azalır —
    bu da ancak paraşüt açılınca olur.</p>

    <p><strong>3 · Hava direnci varken kütle sadeleşmez.</strong> Serbest düşmede
    "kütle önemsiz" derdik; burada tam tersi. ϑ<sub>L</sub> ∝ √m.</p>

    <p><strong>4 · Karekök orantısını ezberle:</strong></p>
    <ul>
      <li>Kütle 4 katına → limit hız <strong>2 katına</strong></li>
      <li>D (kesit alanı) 4 katına → limit hız <strong>yarıya</strong></li>
      <li>Kütle ve D birlikte 2 katına → limit hız <strong>değişmez</strong></li>
    </ul>

    <p><strong>5 · Paraşüt açıldığı an hız DÜŞMEZ, düşmeye BAŞLAR.</strong> Hız sürekli
    bir büyüklüktür, anında sıçramaz. O anda değişen şey ivmedir: aniden yukarı yönlü ve
    çok büyük olur.</p>

    <p style="margin-bottom:0"><strong>6 · Grafik imzaları:</strong>
    ϑ − t grafiği <strong>yatay asimptot</strong> yapar (limit hız). a − t grafiği
    <strong>sıfıra iner</strong>. F<sub>d</sub> − t grafiği <strong>G değerine yaklaşır</strong>.
    Bu üç grafiği tanırsan soru okumadan yorumlarsın.</p>`,

  ornekler: [
    {
      soru: `<p>Bir paraşütçü limit hızla düşerken kendisine etki eden hava direnci kuvveti
             kaç N’dır? (m = 70 kg, g = 10 m/s²)</p>`,
      taktikle: `<p>"Limit hız" ⟹ a = 0 ⟹ denge ⟹ <strong>F<sub>d</sub> = G</strong></p>
                 <p style="margin-bottom:0">F<sub>d</sub> = 70 · 10 = <strong>700 N</strong></p>`,
      uzun: `<p>a = 0 ⟹ F<sub>net</sub> = 0 ⟹ G − F<sub>d</sub> = 0 ⟹ F<sub>d</sub> = m·g = 700 N</p>
             <p style="color:var(--text-3)">D katsayısı, hız, kesit alanı — hiçbiri gerekmedi.</p>`
    },
    {
      soru: `<p>Bir cismin limit hızı 40 m/s’dir. Aynı şekle sahip ama kütlesi
             <strong>4 katı</strong> olan bir cismin limit hızı kaç m/s olur?</p>`,
      taktikle: `<p>ϑ<sub>L</sub> ∝ √m. Kütle 4 katına çıkarsa hız <strong>√4 = 2 katına</strong> çıkar.</p>
                 <p style="margin-bottom:0">40 · 2 = <strong>80 m/s</strong></p>`,
      uzun: `<p>ϑ<sub>L</sub> = √(mg/D). D aynı (şekil aynı), m → 4m:</p>
             <p>ϑ<sub>L</sub>′ = √(4mg/D) = 2·√(mg/D) = 2·40 = 80 m/s</p>
             <p style="color:var(--text-3)">"160 m/s" diyenler karekökü almayı unutmuştur.</p>`
    },
    {
      soru: `<p>Limit hızla düşmekte olan bir paraşütçünün <strong>ivmesi</strong> ve
             <strong>hızı</strong> için ne söylenebilir?</p>`,
      taktikle: `<p><strong>İvme sıfırdır</strong> (tanım gereği), <strong>hız sıfırdan farklı
                 ve sabittir.</strong></p>
                 <p style="margin-bottom:0">Bu, Newton I’in düşen bir cisimdeki hâlidir:
                 bileşke kuvvet sıfır, hız değişmiyor.</p>`,
      uzun: `<p>F<sub>d</sub> = G ⟹ F<sub>net</sub> = 0 ⟹ a = 0. Hız sabit kalır (ϑ<sub>L</sub>).</p>
             <p style="color:var(--text-3)">"İvme sıfırsa hız da sıfırdır" en klasik yanılgıdır —
             1.3.1’de de aynı tuzağı görmüştük.</p>`
    }
  ]
},

/* ------------------------------------------------------ Zorlayıcı sorular */
osym: [
  {
    baslik: 'Hız-zaman grafiği yorumu',
    kaynak: 'Grafik okuma',
    govde: `
      <p>Bir paraşütçünün atlayıştan itibaren hız-zaman grafiği aşağıda verilmiştir.
      <strong>t₁</strong> anında paraşüt açılmıştır.</p>
      <p>Buna göre aşağıdakilerden hangisi <strong>yanlıştır</strong>?</p>`,
    gorsel: `
      <svg viewBox="0 0 520 210" xmlns="http://www.w3.org/2000/svg" role="img"
           aria-label="Paraşütçünün hız-zaman grafiği: önce artıp sabitlenen, t1 sonrası düşüp yeni sabit değere oturan eğri">
        <rect width="520" height="210" fill="#0E1726"/>
        <g stroke="#223150" stroke-width="1">
          <path d="M70 46 H470 M70 90 H470 M70 134 H470"/>
        </g>
        <path d="M70 26 V174 M58 174 H480" stroke="#4A5F86" stroke-width="1.6"/>
        <path d="M70 174 C 110 174, 130 52, 200 46 L 250 46" stroke="#35C08A" stroke-width="2.8" fill="none"/>
        <path d="M250 46 C 268 46, 276 130, 300 134 L 440 134" stroke="#35C08A" stroke-width="2.8" fill="none"/>
        <path d="M250 26 V174" stroke="#FF6B6B" stroke-width="1.6" stroke-dasharray="5 4"/>
        <text x="250" y="20" fill="#FF6B6B" font-size="12" font-family="system-ui" text-anchor="middle">t₁ · paraşüt açıldı</text>
        <text x="62" y="50" fill="#6F84A8" font-size="12" font-family="system-ui" text-anchor="end">ϑ₁</text>
        <text x="62" y="138" fill="#6F84A8" font-size="12" font-family="system-ui" text-anchor="end">ϑ₂</text>
        <text x="62" y="178" fill="#6F84A8" font-size="12" font-family="system-ui" text-anchor="end">0</text>
        <text x="490" y="178" fill="#A7B8D4" font-size="13" font-family="system-ui">t</text>
        <text x="76" y="20" fill="#A7B8D4" font-size="13" font-family="system-ui">ϑ</text>
      </svg>`,
    secenekler: [
      'Atlayışın hemen başında ivme g’ye eşittir',
      'ϑ₁’e ulaşıldığında hava direnci ağırlığa eşittir',
      't₁ ile paraşütün tam açıldığı an arasında ivme yukarı yönlüdür',
      'ϑ₁ bölgesinde paraşütçüye etki eden bileşke kuvvet sıfırdır',
      'ϑ₂ bölgesinde paraşütçünün ivmesi g’dir'
    ],
    dogru: 4,
    cozum: `
      <p>Grafiğin üç bölgesi var:</p>
      <ul>
        <li><strong>Başlangıç:</strong> Eğim en dik ⟹ ivme en büyük. ϑ = 0 olduğu için
        F<sub>d</sub> = 0 ⟹ a = g ✓ (A doğru)</li>
        <li><strong>ϑ₁ düzlüğü:</strong> Eğim sıfır ⟹ a = 0 ⟹ F<sub>net</sub> = 0 ⟹
        F<sub>d</sub> = G ✓ (B ve D doğru)</li>
        <li><strong>t₁ sonrası düşüş:</strong> Hız azalıyor ⟹ ivme hareketin tersine,
        yani <em>yukarı</em> ✓ (C doğru)</li>
      </ul>
      <p><strong>E YANLIŞ — aranan cevap bu.</strong> ϑ₂ bölgesi yine bir <em>düzlüktür</em>;
      eğim sıfır olduğuna göre ivme de <strong>sıfırdır</strong>, g değil. Burası paraşüt
      açıkken ulaşılan <strong>yeni limit hızdır</strong>.</p>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>Grafik okuma refleksi:</strong> ϑ − t grafiğinde
        <strong>eğim = ivme</strong>. Yatay bölge gördüğün her yerde ivme sıfırdır —
        cisim ister dursun, ister 5 m/s ile, ister 50 m/s ile gitsin.
        <br>a = g olan tek yer grafiğin <em>başlangıcındaki</em> en dik noktadır,
        çünkü yalnızca orada hava direnci sıfırdır.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: E</strong></p>`
  },
  {
    baslik: 'İki cismin limit hızı',
    kaynak: 'Orantı',
    govde: `
      <p>K ve L cisimleri aynı yükseklikten aynı anda bırakılıyor. Cisimler
      <strong>aynı şekle ve büyüklüğe</strong> sahiptir (yani D katsayıları eşittir),
      ancak <strong>K’nin kütlesi L’nin 9 katıdır</strong>.</p>
      <p>Buna göre K ve L’nin limit hızlarının oranı ϑ<sub>K</sub>/ϑ<sub>L</sub> kaçtır?</p>`,
    secenekler: ['9', '3', '1', '1/3', '81'],
    dogru: 1,
    cozum: `
      <p>ϑ<sub>L</sub> = √(m·g / D). D ve g her ikisi için aynı olduğundan
      <strong>ϑ<sub>L</sub> ∝ √m</strong>.</p>
      <p>ϑ<sub>K</sub>/ϑ<sub>L</sub> = √(m<sub>K</sub>/m<sub>L</sub>) = √9 = <strong>3</strong></p>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>A şıkkı (9)</strong> karekökü almayı unutanlar için —
        bu sorunun tek amacı odur. <strong>C şıkkı (1)</strong> ise "serbest düşmede kütle
        önemsizdir" ezberini buraya taşıyanlar için.
        <br><strong>Ayrım cümlesi:</strong> Hava direnci <em>yokken</em> kütle sadeleşir;
        hava direnci <em>varken</em> sadeleşmez. Soruda "hava direnci ihmal ediliyor" yazıp
        yazmadığına her zaman bak — bu tek cümle cevabı tamamen değiştirir.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: B) 3</strong></p>`
  }
],

/* --------------------------------------------- Bağlam temelli sorular */
baglam: [
  {
    baslik: 'Kedi neden sağ kalıyor?',
    govde: `
      <p>Veteriner literatüründe ilginç bir gözlem vardır: yüksek katlardan düşen kedilerde
      <strong>7. kattan sonra yaralanma oranı artmaz, hatta azalır</strong>. 5. kattan düşen
      bir kedi, 15. kattan düşenden daha ağır yaralanabilmektedir.</p>
      <p>Bir öğrenci bunu duyunca şaşırıyor: "Daha yüksekten düşen daha hızlı çarpar,
      bu nasıl olur?"</p>
      <p><strong>Olayı limit hız kavramıyla açıkla.</strong></p>`,
    gorsel: `
      <svg viewBox="0 0 520 220" xmlns="http://www.w3.org/2000/svg" role="img"
           aria-label="Alçak ve yüksek kattan düşen kedinin hız değişimi karşılaştırması">
        <rect width="520" height="220" fill="#17223A"/>
        <rect x="0" y="196" width="520" height="24" fill="#3B5323"/>
        <rect x="40" y="96" width="70" height="100" fill="#3A4E76" opacity=".5"/>
        <rect x="290" y="26" width="70" height="170" fill="#3A4E76" opacity=".5"/>
        <text x="75" y="88" fill="#A7B8D4" font-size="12" font-family="system-ui" text-anchor="middle">5. kat</text>
        <text x="325" y="18" fill="#A7B8D4" font-size="12" font-family="system-ui" text-anchor="middle">15. kat</text>
        <path d="M140 96 L140 186" stroke="#FFB020" stroke-width="2.6"/>
        <path d="M140 196 L133 180 L147 180 Z" fill="#FFB020"/>
        <text x="156" y="146" fill="#FFB020" font-size="12" font-family="system-ui">hâlâ hızlanıyor</text>
        <text x="156" y="164" fill="#6F84A8" font-size="11" font-family="system-ui">gergin, ayaklar aşağı</text>
        <path d="M390 26 L390 96" stroke="#FFB020" stroke-width="2.6"/>
        <path d="M390 100 L390 186" stroke="#35C08A" stroke-width="2.6"/>
        <path d="M390 196 L383 180 L397 180 Z" fill="#35C08A"/>
        <text x="406" y="70" fill="#FFB020" font-size="12" font-family="system-ui">hızlanma</text>
        <text x="406" y="140" fill="#35C08A" font-size="12" font-family="system-ui">limit hız · sabit</text>
        <text x="406" y="158" fill="#6F84A8" font-size="11" font-family="system-ui">gevşer, yayılır</text>
        <circle cx="140" cy="96" r="7" fill="#C98B4B"/>
        <circle cx="390" cy="26" r="7" fill="#C98B4B"/>
      </svg>`,
    adimlar: [
      { bas: 'Yanılgıyı adlandır',
        metin: 'Öğrenci "yükseklik artarsa çarpma hızı hep artar" varsayıyor. Bu <strong>yalnızca hava direnci yokken</strong> doğrudur (ϑ = √(2gh)). Hava varken bu formül geçerliliğini yitirir.' },
      { bas: 'Limit hızı hatırla',
        metin: 'Hava direnci varsa cisim sonsuza kadar hızlanmaz. Belli bir yükseklikten sonra kedi <strong>limit hızına</strong> ulaşır ve daha fazla hızlanmaz. Kedi için bu hız yaklaşık 27 m/s’dir (≈ 60 mil/saat).' },
      { bas: 'Kritik yüksekliği bul',
        metin: 'Kedi limit hıza yaklaşık <strong>5-7 kat</strong> (15-20 m) sonunda ulaşır. Bundan sonra 10. kat da 20. kat da <strong>aynı hızla</strong> çarpar — yükseklik artık fark etmez.' },
      { bas: 'Asıl sürprizi açıkla',
        metin: 'Peki neden yüksekten düşen <em>daha az</em> yaralanıyor? Çünkü kedi hızlanırken (ivme varken) korkup <strong>kasılır</strong>. Limit hıza ulaşıp ivme sıfırlanınca serbest düşme hissi biter, kedi <strong>gevşer ve yayılır</strong>.' },
      { bas: 'Yayılmanın iki etkisi',
        metin: 'Yayılmak kesit alanını büyütür ⟹ D artar ⟹ limit hız <strong>daha da düşer</strong>. Ayrıca çarpma anında kuvvet dört bacağa ve gövdeye dağılır, tek noktaya binmez.' },
      { bas: 'Yorumla',
        metin: 'Yani öğrencinin varsayımı hava direncini ihmal eden bir modelden geliyor. Gerçek dünyada <strong>limit hız bir tavan koyuyor</strong> ve o tavana ulaşmak hayvanın davranışını da değiştiriyor.' }
    ],
    secenekler: [
      'Kedi limit hıza ulaştıktan sonra daha fazla hızlanmaz; ayrıca gevşeyip yayılarak limit hızını daha da düşürür',
      'Yüksekten düşen kedinin kütlesi azalır',
      'Hava direnci yüksekte daha azdır, bu yüzden kedi yavaş düşer',
      'Kedinin ağırlığı düşerken azalır',
      'Yükseklik arttıkça yer çekimi ivmesi belirgin biçimde azalır'
    ],
    dogru: 0,
    cozum: `
      <p>Hava direnci nedeniyle kedi belli bir yükseklikten sonra <strong>limit hıza</strong>
      ulaşır (≈ 27 m/s) ve daha fazla hızlanmaz. 7. kattan sonra ek yükseklik çarpma hızını
      değiştirmez.</p>
      <p>Üstelik ivme sıfırlanınca kedi serbest düşme refleksinden çıkıp <strong>gevşer ve
      yayılır</strong>. Yayılmak kesit alanını büyütür ⟹ D artar ⟹
      ϑ<sub>L</sub> = √(mg/D) <strong>azalır</strong>.</p>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>E şıkkı sinsi bir tuzaktır:</strong> yer çekimi ivmesi
        gerçekten yükseklikle azalır — ama bu etki ancak <em>yüzlerce kilometrede</em> anlamlı olur.
        50 metrede g’deki değişim milyonda birler mertebesindedir, tamamen ihmal edilir.
        <br>Sınavda "yükseklikle g azalır" gerekçesi neredeyse her zaman yanlış cevaptır.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: A</strong></p>`
  },
  {
    baslik: 'Yardım paketinin paraşütü',
    govde: `
      <p>Bir yardım kuruluşu, afet bölgesine uçaktan <strong>120 kg</strong>’lık gıda paketleri
      atacak. Paketlerin zarar görmemesi için <strong>yere çarpma hızının en fazla
      6 m/s</strong> olması gerekiyor.</p>
      <p>Mühendis, paraşüt seçerken şu ilişkiyi kullanıyor: paraşüt açıkken
      <strong>D = 40 kg/m</strong> olan bir model elde var.</p>
      <p><strong>Bu paraşüt yeterli mi? Değilse ne yapılmalı?</strong> (g = 10 m/s²)</p>`,
    gorsel: `
      <svg viewBox="0 0 520 210" xmlns="http://www.w3.org/2000/svg" role="img"
           aria-label="Paraşütle inen yardım paketine etki eden ağırlık ve hava direnci">
        <rect width="520" height="210" fill="#17223A"/>
        <rect x="0" y="182" width="520" height="28" fill="#3B5323"/>
        <path d="M200 74 A 60 60 0 0 1 320 74 Z" fill="#E24B4A"/>
        <path d="M200 74 A 60 60 0 0 1 320 74" stroke="#A32D2D" stroke-width="2" fill="none"/>
        <path d="M206 74 L252 118 M248 76 L256 118 M272 76 L264 118 M314 74 L268 118" stroke="#8A6A3A" stroke-width="1.2"/>
        <rect x="236" y="118" width="48" height="36" rx="3" fill="#C98B4B" stroke="#8A5A28" stroke-width="2"/>
        <text x="260" y="141" fill="#4A2E10" font-size="12" font-family="system-ui" text-anchor="middle" font-weight="700">120 kg</text>
        <path d="M350 136 L350 90" stroke="#38D6E0" stroke-width="2.6"/>
        <path d="M350 82 L344 96 L356 96 Z" fill="#38D6E0"/>
        <text x="362" y="116" fill="#38D6E0" font-size="13" font-family="system-ui">F_d</text>
        <path d="M172 118 L172 166" stroke="#FF8FA3" stroke-width="2.6"/>
        <path d="M172 174 L166 160 L178 160 Z" fill="#FF8FA3"/>
        <text x="146" y="146" fill="#FF8FA3" font-size="13" font-family="system-ui">G</text>
        <text x="16" y="30" fill="#6F84A8" font-size="12" font-family="system-ui">hedef: ϑ ≤ 6 m/s</text>
      </svg>`,
    adimlar: [
      { bas: 'Verilenleri ayıkla',
        metin: 'm = 120 kg, D = 40 kg/m, g = 10 m/s², hedef ϑ ≤ 6 m/s. "Afet bölgesi", "gıda" sahne unsuru.' },
      { bas: 'Olayı fiziksel modele çevir',
        metin: 'Paket paraşütle yeterince uzun süre inerse <strong>limit hıza</strong> ulaşır ve o hızla çarpar. Yani hesaplanacak şey limit hızdır.' },
      { bas: 'Formülü sen seç',
        metin: 'Limit hız koşulu F<sub>d</sub> = G’den: <strong>ϑ<sub>L</sub> = √(m·g / D)</strong>' },
      { bas: 'Hesapla',
        metin: 'ϑ<sub>L</sub> = √(120 · 10 / 40) = √30 ≈ <strong>5,48 m/s</strong>' },
      { bas: 'Karşılaştır',
        metin: '5,48 &lt; 6 ⟹ <strong>paraşüt yeterlidir</strong>, üstelik küçük bir güvenlik payı da var.' },
      { bas: 'Sınırı da bul',
        metin: 'Hangi kütleye kadar güvenli? 6 = √(m·10/40) ⟹ 36 = m/4 ⟹ <strong>m ≤ 144 kg</strong>. Paket 144 kg’ı aşarsa daha büyük paraşüt gerekir.' }
    ],
    secenekler: [
      'Yeterli; limit hız ≈ 5,48 m/s',
      'Yetersiz; limit hız ≈ 30 m/s',
      'Yetersiz; limit hız ≈ 12 m/s',
      'Yeterli; limit hız ≈ 3 m/s',
      'Kütle bilinmeden hesaplanamaz'
    ],
    dogru: 0,
    cozum: `
      <p>Limit hız koşulu: F<sub>d</sub> = G ⟹ D·ϑ<sub>L</sub>² = m·g</p>
      <div class="formul" style="max-width:260px"><div class="fm">ϑ<sub>L</sub> = √(m·g / D)</div></div>
      <p>ϑ<sub>L</sub> = √(120 · 10 / 40) = √30 ≈ <strong>5,48 m/s</strong> ≤ 6 m/s ⟹ <strong>yeterli</strong></p>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>B şıkkı (30 m/s)</strong> karekökü almayı unutanlar için —
        √30 yerine 30 yazmak bu konudaki bir numaralı işlem hatasıdır.
        <br><strong>Tasarım mantığı:</strong> Güvenli kütle sınırı m ≤ ϑ<sub>hedef</sub>²·D/g
        = 36·40/10 = 144 kg. Paraşüt seçimi hep böyle yapılır: önce kabul edilebilir çarpma
        hızı belirlenir, sonra ona uyan D hesaplanır.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: A</strong></p>`
  }
]

});
})();
