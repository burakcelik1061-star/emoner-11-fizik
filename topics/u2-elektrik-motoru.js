(function () {
"use strict";
const F = window.F11;

/* ==========================================================================
   topics/u2-elektrik-motoru.js
   Konu 2.2.6 · Manyetik alanda akım geçen dikdörtgen çerçeve — elektrik motoru
                                                    (MEB 11, s.229-235)
   ========================================================================== */

F.konuKaydet('u2-elektrik-motoru', {

ozet: `Bir önceki konuda düz tele etkiyen kuvveti gördük. Şimdi teli
<strong>dikdörtgen bir çerçeve</strong> hâline getiriyoruz. Karşılıklı kenarlardaki
akımlar zıt yönlü olduğu için kuvvetler de zıt yönlü olur: çerçeveyi
<strong>öteleyemezler ama döndürürler</strong>. Elektrik motoru tam olarak budur.`,

/* ------------------------------------------------------------- Kavram */
kavram: `
<h3>Neden dönüyor da kaymıyor?</h3>
<p>Dikdörtgen çerçevenin karşılıklı iki kenarını düşün. Akım çerçeve boyunca dolandığı
için bu iki kenarda <strong>zıt yönlerde</strong> akar. Aynı manyetik alanın içindeler,
dolayısıyla sağ el kuralı ikisi için de <strong>zıt yönlü kuvvet</strong> verir.</p>

<ul>
  <li>Kuvvetlerin <strong>toplamı sıfırdır</strong> ⟹ çerçeve bir yere <em>ötelenmez</em></li>
  <li>Ama <strong>aynı doğru üzerinde değillerdir</strong> ⟹ çerçeveyi <em>döndürürler</em></li>
</ul>

<p>Bu türden, toplamı sıfır olan ama döndürme etkisi yaratan kuvvet ikilisine
<strong>kuvvet çifti</strong> denir.</p>

<div class="formul" style="max-width:340px;margin:14px 0;border-top-color:var(--accent)">
  <div class="fm" style="color:var(--accent)">τ = B · i · A · N · cosθ</div>
  <div class="fm-ad">A: çerçeve alanı · N: sarım sayısı · θ: çerçeve düzlemi–alan açısı</div>
</div>

<table class="degisken-tablo">
  <thead><tr><th>Çerçevenin konumu</th><th>θ</th><th>Döndürme etkisi</th></tr></thead>
  <tbody>
    <tr><td>Düzlemi alana <strong>paralel</strong></td><td class="sembol">0°</td><td><strong>EN BÜYÜK</strong></td></tr>
    <tr><td>Ara konum</td><td class="sembol">45°</td><td>τ_maks · 0,71</td></tr>
    <tr><td>Düzlemi alana <strong>dik</strong></td><td class="sembol">90°</td><td><strong>SIFIR</strong></td></tr>
  </tbody>
</table>

<h3 style="margin-top:22px">Asıl sorun: yarım turdan sonra ne olacak?</h3>
<p>Çerçeve 90°&rsquo;yi geçtiğinde kenarların konumu yer değişir. Kuvvetler hâlâ aynı
yönlerdedir ama artık çerçeveyi <strong>geri döndürmeye</strong> çalışırlar. Sonuç:
çerçeve dönmez, <strong>90° civarında salınıp durur</strong>.</p>

<div class="kutu dikkat" style="margin:16px 0">
  <div class="kutu-bas"><span class="ikon">⚠</span><span>Bunu kendin gör</span></div>
  <p style="margin:0">Simülasyonda düzenek olarak <strong>“Komütatörsüz çerçeve”</strong> seç
  ve oynat. Çerçeve hızlanır, 90°&rsquo;ye gelir, geçer, yavaşlar, geri döner ve birkaç
  salınımdan sonra <strong>90°&rsquo;de durur</strong>. Okumalar <code>ω = 0</code>,
  <code>tam tur = 0</code> gösterir. Motor olmadı.</p>
</div>

<h3 style="margin-top:22px">Çözüm: komütatör</h3>
<p><strong>Komütatör</strong> (yarım halkalı toplayıcı), çerçeve tam kritik açıya
geldiğinde akımın yönünü <strong>tersine çevirir</strong>. Akım ters dönünce kuvvetler de
ters döner ve döndürme etkisi <strong>yine aynı yönde</strong> olur.</p>

<div class="kutu puf" style="margin:16px 0">
  <div class="kutu-bas"><span class="ikon">🔄</span><span>Ne zaman çevirir?</span></div>
  <p style="margin:0">Tam olarak <strong>torkun sıfırlandığı anda</strong>, yani
  θ = 90° ve 270°&rsquo;de. O anda zaten döndürme etkisi yoktur; çerçeve
  <strong>eylemsizliğiyle</strong> o noktayı geçer ve akım ters dönmüş olarak yeniden
  ivmelenmeye başlar.</p>
  <p style="margin:8px 0 0">“Motor (komütatörlü)” düzeneğinde aynı çerçeve sürekli döner:
  hızı artar ve ortalama tork yük frenine eşit olunca yaklaşık <strong>300 dev/dk</strong>
  ortalama hızda dalgalanarak döner (tek çerçevede tork sürekli değiştiği için).</p>
</div>

<h3 style="margin-top:22px">Gerçek motorlar neden çok çerçeveli?</h3>
<p>Tek çerçeveli motorun bir kusuru vardır: θ = 90° ve 270°&rsquo;de tork
<strong>sıfırdır</strong>. Motor tam orada duracak kadar yavaşlarsa bir daha
<strong>kalkamaz</strong>. Buna <strong>ölü nokta</strong> denir.</p>
<p>Gerçek motorlarda bu yüzden <strong>üç ya da daha fazla çerçeve</strong>, aralarında açı
olacak şekilde yerleştirilir. Biri ölü noktadayken diğerleri tork üretmeye devam eder.
Motor hem hiç durmaz hem de daha düzgün döner.</p>
<p style="color:var(--text-2)">Simülasyonda yükü sonuna kadar artırırsan motorun ölü
noktada takıldığını görebilirsin — bu bir hata değil, tek çerçeveli tasarımın
gerçek davranışıdır.</p>

<h3 style="margin-top:22px">Motorun gücünü ne belirler?</h3>
<p>Formüldeki her çarpan bir tasarım kararıdır:</p>
<ul>
  <li><strong>B</strong> — daha güçlü mıknatıs (ya da elektromıknatıs)</li>
  <li><strong>i</strong> — daha çok akım (ısınma sınırı var)</li>
  <li><strong>A</strong> — daha büyük çerçeve (yer sınırı var)</li>
  <li><strong>N</strong> — daha çok sarım (<em>en ucuz yol budur</em>)</li>
</ul>`,

/* ---------------------------------------------------------- Formüller */
formuller: {
  liste: [
    { fm: 'τ = B·i·A·N·cosθ', aciklama: 'Çerçeveye etkiyen döndürme etkisi (tork)' },
    { fm: 'τ<sub>maks</sub> = B·i·A·N', aciklama: 'θ = 0° · çerçeve düzlemi alana paralelken' },
    { fm: 'τ = 0',            aciklama: 'θ = 90° · çerçeve düzlemi alana dikken' },
    { fm: 'F = B·i·L',        aciklama: 'Her bir yan kenara etkiyen kuvvet' },
    { fm: 'A = a · b',        aciklama: 'Dikdörtgen çerçevenin alanı' }
  ],
  degiskenler: [
    { sembol: 'τ', ad: 'Döndürme etkisi (tork)', birim: 'N·m' },
    { sembol: 'A', ad: 'Çerçeve alanı',   birim: 'm²' },
    { sembol: 'N', ad: 'Sarım sayısı',    birim: 'tane' },
    { sembol: 'θ', ad: 'Çerçeve–alan açısı', birim: '°' },
    { sembol: 'ω', ad: 'Açısal hız',      birim: 'rad/s' }
  ]
},

/* ------------------------------------------------------------ Türetim */
turetim: {
  yollar: [
    {
      ad: 'Kuvvet çiftinden torka',
      adimlar: [
        { baslik: 'İki kenardaki kuvveti yaz',
          html: `<p>Çerçevenin boyu <strong>b</strong> olan iki kenarı alana dik
                 olsun. Her birine:</p>
                 <div class="formul" style="max-width:200px"><div class="fm">F = B·i·b</div></div>
                 <p>Akımlar zıt yönlü olduğu için kuvvetler de zıt yönlüdür.</p>` },

        { baslik: 'Toplamı kontrol et',
          html: `<p>F + (−F) = <strong>0</strong>. Çerçeve hiçbir yere ötelenmez.
                 Ama iş bitmedi — kuvvetler <em>aynı doğru üzerinde değil</em>.</p>` },

        { baslik: 'Döndürme etkisini hesapla',
          html: `<p>Her kuvvet, dönme ekseninden <strong>a/2</strong> uzaklıkta. İkisinin
                 döndürme etkisi toplanır:</p>
                 <div class="formul" style="max-width:300px">
                   <div class="fm">τ = F·(a/2) + F·(a/2) = F·a</div>
                 </div>` },

        { baslik: 'Yerine koy ve genelle',
          html: `<p>τ = (B·i·b)·a = B·i·(a·b) = <strong>B·i·A</strong></p>
                 <p>N sarım varsa her sarım aynı katkıyı verir, açı da hesaba katılırsa:</p>
                 <div class="formul" style="max-width:280px;border-top-color:var(--accent)">
                   <div class="fm" style="color:var(--accent)">τ = B·i·A·N·cosθ</div>
                 </div>
                 <p>Çerçevenin <strong>şekli</strong> formüle girmez, yalnızca
                 <strong>alanı</strong> girer. Kare, dikdörtgen ya da daire — alan aynıysa
                 tork da aynıdır.</p>` }
      ]
    },
    {
      ad: 'Komütatör neden şart?',
      adimlar: [
        { baslik: 'Komütatörsüz çalıştır',
          html: `<p>Çerçeve θ = 0&rsquo;dan başlar, tork en büyüktür, hızlanır.
                 90°&rsquo;ye yaklaşırken tork azalır ve <strong>90°&rsquo;de sıfırlanır</strong>.</p>` },

        { baslik: '90°’yi geçince ne olur?',
          html: `<p>cosθ artık <strong>negatiftir</strong>. Tork ters yöne döner ve çerçeveyi
                 <strong>yavaşlatmaya</strong> başlar.</p>` },

        { baslik: 'Sonucu gör',
          html: `<p>Çerçeve bir miktar geçer, durur, geri döner. Sürtünme de varsa sonunda
                 <strong>90°&rsquo;de sabitlenir</strong>. Elde ettiğin şey bir motor değil,
                 bir <strong>sarkaçtır</strong>.</p>` },

        { baslik: 'Akımı ters çevir',
          html: `<p>Tam 90°&rsquo;de akımın yönünü tersine çevirirsen, cosθ negatif olsa da
                 akım da negatif olur ve <strong>çarpımları yine pozitif</strong> çıkar:</p>
                 <div class="formul" style="max-width:300px;border-top-color:var(--accent)">
                   <div class="fm" style="color:var(--accent)">τ = B·|i|·A·N·|cosθ| &gt; 0</div>
                 </div>
                 <p>Tork artık <strong>hep aynı yönde</strong>. Dönme kesintisiz sürer.
                 Bu ters çevirme işini yapan mekanik parça <strong>komütatördür</strong>.</p>` }
      ]
    },
    {
      ad: 'Motor ne kadar hızlı döner?',
      adimlar: [
        { baslik: 'Dönme için Newton II',
          html: `<p>Öteleme hareketinde <code>a = F/m</code> idi. Dönmede karşılığı:</p>
                 <div class="formul" style="max-width:220px"><div class="fm">açısal ivme = τ / I</div></div>
                 <p><strong>I</strong>, cismin dönmeye karşı direncidir (eylemsizlik momenti).</p>` },

        { baslik: 'Yükü ekle',
          html: `<p>Gerçek motor boşta çalışmaz; bir yükü döndürür. Yük ve sürtünme,
                 <strong>hıza bağlı</strong> bir direnç oluşturur: motor hızlandıkça
                 direnç artar.</p>` },

        { baslik: 'Denge hızını bul',
          html: `<p>Direnç, döndürme etkisine <strong>eşitlenince</strong> hızlanma durur
                 ve motor sabit hızda döner:</p>
                 <div class="formul" style="max-width:260px;border-top-color:var(--accent)">
                   <div class="fm" style="color:var(--accent)">τ<sub>motor</sub> = τ<sub>yük</sub> ⟹ ω sabit</div>
                 </div>
                 <p>Bu, 1. ünitedeki <strong>limit hız</strong> mantığının birebir aynısıdır:
                 orada hava direnci ağırlığa eşitleniyordu, burada yük torku motor torkuna.</p>` },

        { baslik: 'Yükü artırırsan',
          html: `<p>Denge daha düşük bir hızda kurulur — motor yavaşlar. Yük çok büyükse
                 motor hiç kalkamaz; buna <strong>stall (takılma)</strong> denir.
                 Simülasyonda yükü sonuna kadar artırıp bunu görebilirsin.</p>` }
      ]
    }
  ]
},

/* -------------------------------------------------------- Simülasyon */
sim: F.simler['elektrik-motoru'],

/* ------------------------------------------------------- Püf noktası */
puf: {
  html: `
    <p><strong>1 · Çerçevenin şekli değil ALANI önemlidir.</strong> Kare, dikdörtgen,
    daire — alanları eşitse torkları da eşittir. “Hangi şekil daha çok döndürür?” sorusunun
    cevabı <em>alanı büyük olan</em>dır.</p>

    <p><strong>2 · Açı tanımına dikkat.</strong> Bu konuda θ, <strong>çerçeve düzlemi ile
    alan</strong> arasındaki açıdır ve formülde <strong>cos</strong> vardır. Bir önceki
    konuda α, <em>akım ile alan</em> arasındaydı ve <strong>sin</strong> vardı. İkisi
    karıştırılır:</p>
    <table class="degisken-tablo" style="margin-top:8px">
      <thead><tr><th>Konu</th><th>Açı neyin arası</th><th>Formül</th><th>En büyük</th></tr></thead>
      <tbody>
        <tr><td>Düz tel</td><td>akım–alan</td><td class="sembol">sinα</td><td>α = 90°</td></tr>
        <tr><td>Çerçeve</td><td>düzlem–alan</td><td class="sembol">cosθ</td><td>θ = 0°</td></tr>
      </tbody>
    </table>

    <p style="margin-top:14px"><strong>3 · Toplam kuvvet sıfır, tork sıfır değil.</strong>
    “Çerçeveye etkiyen bileşke kuvvet kaçtır?” sorusunun cevabı <strong>sıfırdır</strong>.
    Ama “döndürme etkisi kaçtır?” sorusunun cevabı sıfır değildir. Bu ayrım sık sorulur.</p>

    <p><strong>4 · Komütatör sorusu üç adımlıdır:</strong> ne yapar (akımı çevirir),
    ne zaman yapar (tork sıfırlanınca, θ = 90°), neden gerekir (yoksa çerçeve salınır).</p>

    <p><strong>5 · Oranlar:</strong> τ ∝ B, τ ∝ i, τ ∝ A, τ ∝ N. Hepsi <strong>birinci
    dereceden</strong>. Karesi alınan bir şey yok — bir önceki konudaki
    <code>F ∝ B²</code> ile karıştırma (o kaldırma kuvvetiydi).</p>

    <p><strong>6 · Motor mu, jeneratör mü?</strong> Aynı düzenek iki yönde çalışır:</p>
    <ul>
      <li><strong>Akım verirsen</strong> → çerçeve döner = <strong>motor</strong></li>
      <li><strong>Çerçeveyi döndürürsen</strong> → akım üretir = <strong>jeneratör</strong></li>
    </ul>
    <p>İkincisini 2.3.2&rsquo;de (indüksiyon) göreceksin.</p>

    <p><strong>7 · Ölü nokta ayrıntısı:</strong> Tek çerçeveli motor θ = 90°&rsquo;de tam
    durursa kalkamaz. Gerçek motorlar bu yüzden çok çerçevelidir. Bu ayrıntı, konuyu
    ezberleyenle anlayanı ayırır.</p>`
},

/* ----------------------------------------------------- Zorlayıcı sorular */
osym: [
  {
    baslik: 'Bileşke kuvvet mi, tork mu?',
    kaynak: 'Kavram ayrımı',
    govde: `
      <p>Düzgün bir manyetik alan içinde, düzlemi alana <strong>paralel</strong> olan
      dikdörtgen bir çerçeveden akım geçmektedir.</p>
      <p>Buna göre aşağıdaki yargılardan hangileri <strong>doğrudur</strong>?</p>
      <ol style="margin-left:.2em">
        <li>Çerçeveye etkiyen bileşke kuvvet sıfırdır.</li>
        <li>Çerçeveye etkiyen döndürme etkisi sıfırdır.</li>
        <li>Çerçeve bu konumda en büyük torku hisseder.</li>
        <li>Karşılıklı kenarlardaki kuvvetler eşit büyüklükte ve zıt yönlüdür.</li>
      </ol>`,
    gorsel: `
      <svg viewBox="0 0 520 190" xmlns="http://www.w3.org/2000/svg" role="img"
           aria-label="Alana paralel duran dikdörtgen çerçeve ve karşılıklı kenarlardaki zıt kuvvetler">
        <rect width="520" height="190" fill="#0E1726"/>
        <g stroke="#2F6FD0" stroke-width="1.6">
          <path d="M40 40 H480 M40 76 H480 M40 112 H480 M40 148 H480"/>
        </g>
        <g fill="#2F6FD0">
          <path d="M486 40 l-10 -5 l0 10 z"/><path d="M486 76 l-10 -5 l0 10 z"/>
          <path d="M486 112 l-10 -5 l0 10 z"/><path d="M486 148 l-10 -5 l0 10 z"/>
        </g>
        <rect x="200" y="52" width="120" height="86" fill="none" stroke="#B87333" stroke-width="5"/>
        <circle cx="200" cy="95" r="12" fill="none" stroke="#7A4A10" stroke-width="2"/>
        <circle cx="200" cy="95" r="4" fill="#7A4A10"/>
        <circle cx="320" cy="95" r="12" fill="none" stroke="#7A4A10" stroke-width="2"/>
        <path d="M313 88 L327 102 M327 88 L313 102" stroke="#7A4A10" stroke-width="2"/>
        <path d="M200 83 V50" stroke="#FF6B6B" stroke-width="3.4"/>
        <path d="M200 44 L194 56 L206 56 Z" fill="#FF6B6B"/>
        <path d="M320 107 V140" stroke="#FF6B6B" stroke-width="3.4"/>
        <path d="M320 146 L314 134 L326 134 Z" fill="#FF6B6B"/>
        <text x="168" y="40" fill="#FF6B6B" font-size="12" font-family="system-ui">F</text>
        <text x="338" y="156" fill="#FF6B6B" font-size="12" font-family="system-ui">F</text>
        <text x="60" y="26" fill="#38D6E0" font-size="12" font-family="system-ui">B</text>
      </svg>`,
    secenekler: [
      'I, III ve IV',
      'I ve II',
      'Yalnız III',
      'II ve IV',
      'Hepsi'
    ],
    dogru: 0,
    cozum: `
      <ol>
        <li><strong>Doğru.</strong> İki kuvvet eşit ve zıt olduğu için toplamları sıfırdır;
        çerçeve bir yere ötelenmez.</li>
        <li><strong>Yanlış.</strong> Toplam kuvvetin sıfır olması, döndürme etkisinin
        sıfır olduğu anlamına <em>gelmez</em>. Kuvvetler aynı doğru üzerinde değildir.</li>
        <li><strong>Doğru.</strong> Çerçeve düzlemi alana paralel ⟹ θ = 0° ⟹
        cos0° = 1 ⟹ <strong>τ en büyük</strong>.</li>
        <li><strong>Doğru.</strong> Aynı alan, aynı uzunluk, zıt akım yönleri ⟹
        eşit büyüklükte zıt kuvvetler.</li>
      </ol>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>Bu sorunun tamamı tek bir ayrıma dayanıyor:</strong>
        <em>bileşke kuvvet</em> ile <em>döndürme etkisi</em> aynı şey değildir. Toplamı sıfır
        olan iki kuvvet, aynı doğru üzerinde değilse pekâlâ döndürebilir. Buna
        <strong>kuvvet çifti</strong> denir.
        <br><strong>Günlük örnek:</strong> Direksiyonu iki elinle ters yönde çevirirsin.
        Ellerinin uyguladığı kuvvetlerin toplamı sıfırdır — araba yerinden oynamaz —
        ama direksiyon döner.
        <br><strong>B şıkkı</strong> bu ayrımı yapamayanlar için konmuştur.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: A</strong></p>`
  },
  {
    baslik: 'Komütatörü sökersek',
    kaynak: 'Simülasyondan doğrulanabilir',
    govde: `
      <p>Doğru akımla çalışan tek çerçeveli bir motorun <strong>komütatörü sökülüyor</strong>
      ve çerçevenin uçları doğrudan kaynağa sabitleniyor. Akım, alan ve çerçeve aynı kalıyor.</p>
      <p>Motor θ = 0° konumundan serbest bırakıldığında ne olur?</p>`,
    secenekler: [
      'Hızlanıp 90°’yi geçer, yavaşlar, geri döner ve sürtünmeyle birlikte 90°’de durur',
      'Aynı hızda dönmeye devam eder, komütatörün etkisi yoktur',
      'Hiç hareket etmez çünkü tork sıfırdır',
      'Ters yönde dönmeye başlar',
      'Giderek hızlanır ve hiç durmaz'
    ],
    dogru: 0,
    cozum: `
      <p>Adım adım izleyelim:</p>
      <table class="degisken-tablo">
        <thead><tr><th>Konum</th><th>cosθ</th><th>Tork</th><th>Hareket</th></tr></thead>
        <tbody>
          <tr><td>θ = 0°</td><td class="sembol">+1</td><td>en büyük</td><td>hızlanır</td></tr>
          <tr><td>θ = 45°</td><td class="sembol">+0,71</td><td>azalır</td><td>hâlâ hızlanır</td></tr>
          <tr><td>θ = 90°</td><td class="sembol">0</td><td><strong>sıfır</strong></td><td>en hızlı an</td></tr>
          <tr><td>θ = 135°</td><td class="sembol">−0,71</td><td><strong>ters</strong></td><td>yavaşlar</td></tr>
          <tr><td>θ = 180°</td><td class="sembol">−1</td><td>ters, en büyük</td><td>durur, geri döner</td></tr>
        </tbody>
      </table>
      <p style="margin-top:10px">Çerçeve eylemsizliğiyle 90°&rsquo;yi geçer ama ötesinde tork
      onu <strong>geri çekmeye</strong> başlar. Sürtünme de enerji götürdüğü için salınım
      giderek söner ve çerçeve <strong>θ = 90°&rsquo;de sabitlenir</strong> — torkun sıfır
      olduğu denge konumunda.</p>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>Elde edilen şey bir motor değil, bir sarkaçtır.</strong>
        Salınım hareketi, yayın ucundaki cismin ya da ipe asılı bir topun hareketine benzer.
        <br><strong>E şıkkı</strong> enerji korunumuna aykırıdır: sürekli hızlanan bir düzenek
        sınırsız enerji üretiyor olurdu.
        <br><strong>Simülasyonda doğrula:</strong> Komütatörü kapat, oynat. Beş saniye sonra
        okumalar <code>ω = 0</code>, <code>açı = 90°</code>, <code>tam tur = 0</code>
        gösteriyor. Sonra komütatörü aç: aynı sürede <strong>25 tam tur</strong>.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: A</strong></p>`
  }
],

/* --------------------------------------------- Bağlam temelli sorular */
baglam: [
  {
    baslik: 'Oyuncak arabanın motoru neden zorlanınca duruyor?',
    govde: `
      <p>Pilli bir oyuncak araba düz zeminde hızla gidiyor. Onu <strong>halının üstüne</strong>
      koyduğunda yavaşlıyor; elinle tekerleğini <strong>tutarsan</strong> motor tamamen
      duruyor ama <strong>pilden akım geçmeye devam ediyor</strong> ve motor
      <strong>ısınıyor</strong>.</p>
      <p>Bir öğrenci soruyor: <em>“Motor durduysa neden hâlâ elektrik harcıyor? Hatta neden
      normalden daha çok ısınıyor?”</em></p>
      <p><strong>Olayı tork dengesiyle açıkla. Motor dururken neden daha çok ısınıyor?</strong></p>`,
    gorsel: `
      <svg viewBox="0 0 520 190" xmlns="http://www.w3.org/2000/svg" role="img"
           aria-label="Oyuncak arabanın motor torku ile yük torkunun dengesi">
        <rect width="520" height="190" fill="#17223A"/>
        <rect x="0" y="150" width="260" height="40" fill="#4A5059"/>
        <rect x="260" y="150" width="260" height="40" fill="#7A5A3A"/>
        <text x="120" y="176" fill="#9AA5B1" font-size="11" font-family="system-ui" text-anchor="middle">düz zemin</text>
        <text x="390" y="176" fill="#C9A24B" font-size="11" font-family="system-ui" text-anchor="middle">halı</text>
        <rect x="60" y="104" width="86" height="34" rx="6" fill="#2F6FD0"/>
        <circle cx="80" cy="144" r="11" fill="#23272E"/><circle cx="128" cy="144" r="11" fill="#23272E"/>
        <text x="103" y="92" fill="#35C08A" font-size="11" font-family="system-ui" text-anchor="middle">hızlı</text>
        <rect x="330" y="104" width="86" height="34" rx="6" fill="#2F6FD0"/>
        <circle cx="350" cy="144" r="11" fill="#23272E"/><circle cx="398" cy="144" r="11" fill="#23272E"/>
        <text x="373" y="92" fill="#FF6B6B" font-size="11" font-family="system-ui" text-anchor="middle">yavaş</text>
        <path d="M200 60 H300" stroke="#6F84A8" stroke-width="1.4" stroke-dasharray="5 4"/>
        <text x="250" y="52" fill="#EAF0FA" font-size="12" font-family="system-ui" text-anchor="middle">yük ↑  ⟹  hız ↓</text>
        <text x="60" y="34" fill="#FFB020" font-size="12" font-family="system-ui">τ_motor = τ_yük ⟹ sabit hız</text>
      </svg>`,
    adimlar: [
      { bas: 'Sabit hızın anlamını yaz',
        metin: 'Motor sabit hızda dönüyorsa açısal ivmesi sıfırdır ⟹ <strong>τ_motor = τ_yük</strong>. Denge kurulmuştur.' },
      { bas: 'Halıya çıkınca',
        metin: 'Yük torku <strong>artar</strong>. Denge bozulur, motor yavaşlar. Yavaşladıkça denge yeni ve <strong>daha düşük</strong> bir hızda yeniden kurulur.' },
      { bas: 'Tekerleği tutunca',
        metin: 'Yük torku motorun üretebileceği en büyük torku <strong>aşar</strong>. Motor hiç dönemez — buna <strong>takılma (stall)</strong> denir.' },
      { bas: 'Akım neden hâlâ geçiyor?',
        metin: 'Devre kapalı olduğu sürece akım geçer. Dönme durdu diye devre açılmaz; bobin hâlâ pile bağlıdır.' },
      { bas: 'Neden DAHA ÇOK ısınıyor?',
        metin: 'Dönen bir motor, dönerken kendi içinde akımı <strong>azaltan</strong> bir etki üretir (bunu 2.3.2’de göreceksin). Motor durunca bu etki kaybolur ve akım <strong>en büyük değerine</strong> çıkar. Isı <code>P = i²R</code> ile arttığı için motor takılıyken en çok ısınır.' },
      { bas: 'Pratik sonucu söyle',
        metin: 'Takılı bir motor birkaç saniye içinde sargılarını yakabilir. Bu yüzden gerçek cihazlarda <strong>termik koruma</strong> ya da sigorta bulunur. Oyuncakta pil çabuk biter ve motor ısınır — ikisi de aynı sebebin sonucudur.' }
    ],
    secenekler: [
      'Yük torku motor torkunu aşınca motor takılır; dönme durunca akımı sınırlayan etki kaybolduğu için akım ve ısınma artar',
      'Motor durunca devre açılır, akım kesilir ve ısınma yalnızca artık ısıdandır',
      'Isınmanın sebebi sürtünmedir, akımla ilgisi yoktur',
      'Motor durunca akım azalır ama gerilim arttığı için ısınır',
      'Halı, motorun manyetik alanını zayıflattığı için motor yavaşlar'
    ],
    dogru: 0,
    cozum: `
      <p><strong>τ_motor = τ_yük</strong> dengesi hızın nerede kurulacağını belirler.
      Yük çok büyükse denge kurulamaz ve motor <strong>takılır</strong>.</p>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>B şıkkı</strong> yaygın bir yanılgı: dönmenin durması
        devreyi <em>açmaz</em>. Aksine, en tehlikeli durum budur.
        <br><strong>Limit hızla bağlantı:</strong> 1. ünitedeki paraşütçü de hava direnci
        ağırlığa eşitlenince sabit hıza ulaşıyordu. Burada da yük torku motor torkuna
        eşitlenince sabit hız kuruluyor. <strong>Aynı denge mantığı, farklı büyüklükler.</strong>
        <br><strong>Elektrikli araçlarda</strong> bu yüzden yokuş yukarı çıkarken motor akımı
        ve sıcaklığı izlenir; sürekli takılma bölgesinde çalışmak sargıları yakar.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: A</strong></p>`
  },
  {
    baslik: 'Aynı makine, iki iş',
    govde: `
      <p>Elektrikli bisikletlerde ilginç bir özellik vardır: yokuş aşağı inerken pedal
      çevirmeden gitsen bile <strong>pil doluyor</strong>. Üstelik bunu yapan, tekerleği
      döndüren <strong>aynı motordur</strong>.</p>
      <p>Aynı şey trenlerde, asansörlerde ve elektrikli otomobillerde de kullanılır; buna
      <strong>rejeneratif frenleme</strong> denir.</p>
      <p>Bir öğrenci soruyor: <em>“Bir makine hem elektriği harekete, hem hareketi elektriğe
      çeviriyor. Bu nasıl mümkün? Bedava enerji mi elde ediliyor?”</em></p>
      <p><strong>Düzeneğin iki yönde nasıl çalıştığını açıkla. Enerji korunumu ihlal ediliyor mu?</strong></p>`,
    gorsel: `
      <svg viewBox="0 0 520 200" xmlns="http://www.w3.org/2000/svg" role="img"
           aria-label="Aynı düzeneğin motor ve jeneratör olarak iki yönde çalışması">
        <rect width="520" height="200" fill="#17223A"/>
        <rect x="190" y="66" width="140" height="70" rx="8" fill="#2E3D57" stroke="#4A5F86" stroke-width="2"/>
        <text x="260" y="98" fill="#EAF0FA" font-size="13" font-family="system-ui" text-anchor="middle" font-weight="700">çerçeve +</text>
        <text x="260" y="118" fill="#EAF0FA" font-size="13" font-family="system-ui" text-anchor="middle" font-weight="700">mıknatıs</text>
        <path d="M60 80 H186" stroke="#FFB020" stroke-width="3"/>
        <path d="M192 80 L180 74 L180 86 Z" fill="#FFB020"/>
        <text x="120" y="68" fill="#FFB020" font-size="12" font-family="system-ui" text-anchor="middle">akım ver</text>
        <path d="M334 80 H460" stroke="#35C08A" stroke-width="3"/>
        <path d="M466 80 L454 74 L454 86 Z" fill="#35C08A"/>
        <text x="400" y="68" fill="#35C08A" font-size="12" font-family="system-ui" text-anchor="middle">dönme al</text>
        <text x="400" y="100" fill="#35C08A" font-size="11" font-family="system-ui" text-anchor="middle">MOTOR</text>
        <path d="M460 150 H334" stroke="#4DA3FF" stroke-width="3"/>
        <path d="M328 150 L340 144 L340 156 Z" fill="#4DA3FF"/>
        <text x="400" y="140" fill="#4DA3FF" font-size="12" font-family="system-ui" text-anchor="middle">döndür</text>
        <path d="M186 150 H60" stroke="#A78BFA" stroke-width="3"/>
        <path d="M54 150 L66 144 L66 156 Z" fill="#A78BFA"/>
        <text x="120" y="140" fill="#A78BFA" font-size="12" font-family="system-ui" text-anchor="middle">akım al</text>
        <text x="120" y="172" fill="#A78BFA" font-size="11" font-family="system-ui" text-anchor="middle">JENERATÖR</text>
      </svg>`,
    adimlar: [
      { bas: 'Motor yönünü yaz',
        metin: 'Çerçeveye <strong>akım verirsen</strong>, manyetik alan ona tork uygular ve çerçeve <strong>döner</strong>. Elektrik enerjisi → hareket enerjisi.' },
      { bas: 'Ters yönü düşün',
        metin: 'Çerçeveyi <strong>dışarıdan döndürürsen</strong> ne olur? Bobin manyetik alan içinde hareket eder ve uçlarında <strong>gerilim doğar</strong>. Hareket enerjisi → elektrik enerjisi.' },
      { bas: 'Aynı parçalar',
        metin: 'Her iki durumda da düzenek aynıdır: bir mıknatıs, bir çerçeve. Değişen tek şey <strong>enerjinin hangi yönde aktığıdır</strong>.' },
      { bas: 'Bisiklette ne oluyor?',
        metin: 'Yokuş aşağı inerken tekerlek motoru döndürür ⟹ motor <strong>jeneratöre</strong> dönüşür ⟹ pil dolar. Üstelik üretilen akım, harekete karşı koyan bir tork yarattığı için <strong>fren görevi de görür</strong>.' },
      { bas: 'Bedava enerji mi?',
        metin: '<strong>Hayır.</strong> Pile giden enerji, bisikletin <strong>yükseklik enerjisinden</strong> gelir. Yokuşu çıkarken harcadığın enerjinin bir kısmını geri alıyorsun. Üstelik sürtünme ve direnç kayıpları yüzünden <strong>hepsini değil</strong> — tipik olarak yarısından azını.' },
      { bas: 'Sınırı da söyle',
        metin: 'Rejeneratif fren tek başına yetmez; acil durumda ve düşük hızda klasik fren gerekir. Ayrıca pil doluysa üretilen enerjinin gidecek yeri kalmaz ve sistem devreden çıkar.' }
    ],
    secenekler: [
      'Akım verilirse motor, döndürülürse jeneratör olur; enerji korunur çünkü pile giden enerji bisikletin yükseklik enerjisinden gelir',
      'Bedava enerji elde edilir; bu yüzden elektrikli araçlar şarj gerektirmez',
      'Motor ve jeneratör farklı cihazlardır, bisiklette ikisi birden bulunur',
      'Yokuş aşağı inerken sürtünme elektriğe dönüşür',
      'Pil yalnızca fren yaparken dolar, yokuş aşağı inmenin etkisi yoktur'
    ],
    dogru: 0,
    cozum: `
      <p>Aynı düzenek iki yönde çalışır. Enerji korunumu <strong>ihlal edilmez</strong>;
      geri kazanılan enerjinin kaynağı bisikletin <strong>yükseklik enerjisidir</strong>.</p>
      <div class="formul" style="max-width:380px;margin:10px 0;border-top-color:var(--accent)">
        <div class="fm" style="color:var(--accent)">akım → dönme (motor) &nbsp;·&nbsp; dönme → akım (jeneratör)</div>
      </div>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>B şıkkı</strong> sürekli hareket makinesi iddiasıdır ve
        enerji korunumuna aykırıdır. Geri kazanım her zaman <em>daha önce harcanan</em>
        enerjinin bir kısmıdır.
        <br><strong>Sıradaki konuya köprü:</strong> “Çerçeveyi döndürünce neden gerilim
        doğuyor?” sorusunun cevabı <strong>indüksiyon</strong>dur ve 2.3.2&rsquo;nin
        konusudur. Bu ünitenin son üç konusu tamamen o soruyu cevaplar.
        <br><strong>Tarihsel not:</strong> Motorun jeneratör olarak da çalışabileceği
        1870&rsquo;lerde tesadüfen keşfedildi — bir sergide iki motor yanlışlıkla birbirine
        bağlanınca biri diğerini döndürdü.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: A</strong></p>`
  }
]

});
})();
