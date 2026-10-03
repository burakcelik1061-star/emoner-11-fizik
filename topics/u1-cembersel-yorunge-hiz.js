(function () {
"use strict";
const F = window.F11;

/* ==========================================================================
   topics/u1-cembersel-yorunge-hiz.js
   Konu 1.6.1 · Çembersel harekette yörünge ve hız  (MEB 11, s. 95-100)
   ========================================================================== */

F.konuKaydet('u1-cembersel-yorunge-hiz', {

ozet: `Bir cisim sabit süratle çember çiziyorsa hızı değişiyor mudur? Cevap
<strong>evet</strong> — çünkü hız bir vektördür ve <strong>yönü sürekli değişir</strong>.
Bu tek cümle, düzgün çembersel hareketin neden ivmeli bir hareket olduğunu açıklar.`,

/* ------------------------------------------------------------- Kavram */
kavram: `
<p>Uydular, dönme dolap kabinleri, çamaşır makinesinin tamburu, pikaptaki plak,
rüzgâr türbini kanatları, ipe bağlı sallanan taş… Hepsi <strong>çembersel yörüngede</strong>
hareket eder.</p>

<p>Bu hareketi tanımlayan iki vektör vardır:</p>
<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:12px;margin:14px 0">
  <div style="background:var(--surface-0);border:1px solid var(--border);border-top:2px solid var(--b1);border-radius:var(--r-sm);padding:14px 16px">
    <div style="color:var(--b1);font-weight:700;font-size:.85em;margin-bottom:6px">YARIÇAP VEKTÖRÜ</div>
    <p style="margin:0">Merkezden cisme doğrudur. Büyüklüğü <strong>sabittir</strong> (r),
    yönü cisimle birlikte döner.</p>
  </div>
  <div style="background:var(--surface-0);border:1px solid var(--border);border-top:2px solid var(--b4);border-radius:var(--r-sm);padding:14px 16px">
    <div style="color:var(--b4);font-weight:700;font-size:.85em;margin-bottom:6px">HIZ VEKTÖRÜ</div>
    <p style="margin:0">Yörüngeye <strong>teğettir</strong>, yani yarıçapa
    <strong>diktir</strong> (90°). Büyüklüğü sabit, yönü sürekli değişir.</p>
  </div>
</div>

<h3 style="margin-top:22px">Sürat sabit ama hız değişiyor</h3>
<p>Günlük dilde "hız" ve "sürat" aynı anlamda kullanılır, fizikte değil:</p>
<ul>
  <li><strong>Sürat</strong> skalerdir — sadece bir sayı. Düzgün çembersel harekette sabittir.</li>
  <li><strong>Hız</strong> vektörel — sayı <em>ve</em> yön. Yön değiştiği için hız değişir.</li>
</ul>
<p>Hız değişiyorsa ivme vardır. Bu yüzden <strong>düzgün çembersel hareket ivmeli bir
harekettir</strong> — "düzgün" kelimesi yalnızca süratin sabit olduğunu anlatır.</p>

<div class="kutu puf" style="margin:14px 0">
  <div class="kutu-bas"><span class="ikon">🧭</span>Hız vektörünü çizmenin kesin yolu</div>
  <p style="margin:0">Cismin bulunduğu noktadan yarıçapa <strong>dik</strong> bir doğru çiz,
  sonra <strong>dönme yönünü</strong> göster. Bitti. Hız vektörü asla merkeze doğru ya da
  merkezden dışarı bakmaz.</p>
</div>

<h3 style="margin-top:22px">İp koparsa cisim nereye gider?</h3>
<p>Bu, konunun en önemli sorusudur ve öğrencilerin çoğu <strong>yanlış</strong> cevaplar.
Yaygın sanı: cisim merkezden <em>dışarı doğru</em> fırlar.</p>

<p><strong>Doğrusu:</strong> İp koptuğu anda cisme merkeze doğru çeken kuvvet ortadan kalkar.
Newton I gereği cisim, o andaki <strong>hızını korur</strong> — yani
<strong>teğet doğrultuda düz bir çizgi boyunca</strong> gider.</p>

<p>Simülasyonda <strong>İp kopsun</strong> seçeneğini kullan: doğru yol yeşille, yanlış sanılan
yol kırmızı kesikli çizgiyle birlikte çizilir. İkisini yan yana gör.</p>

<div class="kutu dikkat" style="margin:14px 0">
  <div class="kutu-bas"><span class="ikon">⚠</span>"Merkezkaç kuvveti" diye bir kuvvet yoktur</div>
  <p style="margin:0">Virajı dönerken kapıya doğru savrulduğunu hissedersin, ama seni oraya
  iten bir kuvvet yoktur. Sen <strong>düz gitmek istiyorsun</strong> (eylemsizlik),
  araba ise sana çarparak seni çevirmeye çalışıyor. Hissettiğin şey kapının sana uyguladığı
  <em>içe doğru</em> kuvvettir.</p>
</div>`,

/* ---------------------------------------------------------- Formüller */
formuller: {
  liste: [
    { fm: 'ϑ ⊥ r',              aciklama: 'Hız vektörü yarıçapa daima diktir' },
    { fm: 'ϑ = 2π·r / T',       aciklama: 'Bir turda 2πr yol, T sürede' },
    { fm: '|ϑ| = sabit',        aciklama: 'Düzgün çembersel harekette sürat değişmez' },
    { fm: 'yön değişir ⟹ a ≠ 0', aciklama: 'Bu yüzden hareket ivmelidir' }
  ],
  degiskenler: [
    { sembol: 'r', ad: 'Yörünge yarıçapı',       birim: 'm' },
    { sembol: 'ϑ', ad: 'Çizgisel hız (teğetsel)', birim: 'm/s' },
    { sembol: 'T', ad: 'Periyot — bir tur süresi', birim: 's' }
  ]
},

/* ------------------------------------------------------------ Türetim */
turetim: {
  yollar: [
    {
      ad: 'Hız neden teğet?',
      adimlar: [
        { baslik: 'Hızın tanımına dön',
          html: `<p>Hız, <strong>yer değiştirmenin zamana oranıdır</strong>. Yani cismin
                 <em>bir sonraki an nereye gideceğini</em> gösterir.</p>
                 <p>Çember üzerinde çok kısa bir zaman aralığı alalım: cisim A noktasından
                 B noktasına gitsin. Yer değiştirme vektörü A’dan B’ye doğrudur — yani
                 çemberin bir <strong>kirişi</strong> boyuncadır.</p>` },

        { baslik: 'Zaman aralığını küçült',
          html: `<p>Şimdi B’yi A’ya yaklaştıralım. Kiriş kısalır ve yönü değişir.</p>
                 <p>B, A’ya sonsuz yaklaştığında kiriş <strong>teğete dönüşür</strong>.
                 Geometrinin klasik sonucudur: bir çemberin bir noktasındaki teğet,
                 o noktadan geçen kirişlerin limit durumudur.</p>
                 <div class="formul" style="max-width:300px;border-top-color:var(--accent)">
                   <div class="fm" style="color:var(--accent)">Anlık hız ⟹ teğet doğrultu</div>
                 </div>` },

        { baslik: 'Diklik sonucunu çıkar',
          html: `<p>Geometriden: <strong>bir çembere değdiği noktadaki teğet, o noktanın
                 yarıçapına diktir.</strong></p>
                 <p>Hız teğet doğrultuda olduğuna göre:</p>
                 <div class="formul" style="max-width:200px;border-top-color:var(--accent)">
                   <div class="fm" style="color:var(--accent)">ϑ ⊥ r  (90°)</div>
                 </div>
                 <p style="margin-top:12px;color:var(--text-2)">Bu diklik, sonraki konuda
                 merkezcil ivmeyi bulmanın anahtarı olacak.</p>` }
      ]
    },
    {
      ad: 'Neden ivmeli hareket?',
      adimlar: [
        { baslik: 'İvmenin tanımını hatırla',
          html: `<p>İvme, <strong>hızdaki değişimin</strong> zamana oranıdır:</p>
                 <div class="formul" style="max-width:200px"><div class="fm">a = Δϑ / Δt</div></div>
                 <p style="margin-top:10px">Buradaki <strong>Δϑ vektörel bir farktır</strong>.
                 Yani sadece büyüklük değil, <em>yön</em> değişimi de sayılır.</p>` },

        { baslik: 'İki konumdaki hızları karşılaştır',
          html: `<p>Cisim çemberin sağındayken hız yukarı, solundayken aşağı doğrudur.
                 İkisinin büyüklüğü aynı ama <strong>yönleri tam zıt</strong>.</p>
                 <p>Vektörel fark: Δϑ = ϑ<sub>son</sub> − ϑ<sub>ilk</sub> ≠ 0</p>
                 <p>Sıfırdan farklı bir hız değişimi var demektir.</p>` },

        { baslik: 'Sonucu yaz',
          html: `<p>Δϑ ≠ 0 ve Δt sonlu olduğuna göre:</p>
                 <div class="formul" style="max-width:260px;border-top-color:var(--accent)">
                   <div class="fm" style="color:var(--accent)">a ≠ 0</div>
                 </div>
                 <p style="margin-top:12px"><strong>Düzgün çembersel hareket ivmelidir</strong>,
                 sürat hiç değişmese bile.</p>
                 <div class="kutu puf" style="margin-top:12px">
                   <p style="margin:0">Bu ivmenin yönünü ve büyüklüğünü bir sonraki konuda
                   bulacağız: merkeze doğrudur ve a<sub>m</sub> = ϑ²/r kadardır.
                   Şimdilik <strong>var olduğunu</strong> bilmek yeterli.</p>
                 </div>` }
      ]
    },
    {
      ad: 'İp koparsa · Newton I',
      adimlar: [
        { baslik: 'Kopmadan önceki durumu yaz',
          html: `<p>Cisim çember çiziyorsa ona <strong>merkeze doğru</strong> bir kuvvet
                 etki ediyordur. Bu kuvveti ip sağlar.</p>
                 <p>Bu kuvvet cismi sürekli "yoldan saptırır" — düz gitmesini engeller.</p>` },

        { baslik: 'Kopma anında ne kayboluyor?',
          html: `<p>İp koptuğunda <strong>merkeze doğru olan kuvvet ortadan kalkar.</strong></p>
                 <p>Cisme etki eden yatay kuvvet kalmaz (masa üstünde sürtünme de ihmal ediliyor).
                 Bileşke kuvvet sıfırdır.</p>` },

        { baslik: 'Newton I’i uygula',
          html: `<p>Bileşke kuvvet sıfırsa cisim <strong>hızını korur</strong> —
                 hem büyüklüğünü hem yönünü.</p>
                 <p>Kopma anındaki hız <strong>teğet doğrultudaydı</strong>. Demek ki cisim
                 o doğrultuda, aynı süratle, <strong>düz bir çizgi</strong> boyunca gider.</p>
                 <div class="formul" style="max-width:340px;border-top-color:var(--accent)">
                   <div class="fm" style="color:var(--accent);font-size:1em">
                     Teğet doğrultuda düz hareket
                   </div>
                 </div>` },

        { baslik: 'Yanlış cevabı da anla',
          html: `<p>"Merkezden dışarı fırlar" diyen öğrenci, aslında <strong>var olmayan
                 bir kuvvet</strong> varsayıyor: dışa doğru iten bir şey.</p>
                 <p>Ama kuvvet iki cisim arasındaki etkileşimdir. İp koptuktan sonra cisme
                 dışarı doğru kuvvet uygulayan <em>hiçbir şey yoktur</em>.</p>
                 <div class="kutu puf" style="margin-top:12px">
                   <p style="margin:0"><strong>Günlük kanıt:</strong> Çamaşır makinesinin
                   sıkma programında su, tamburun deliklerinden <em>teğet</em> doğrultuda fırlar.
                   Çim biçme makinesinden fırlayan taşlar da öyle. Hatta bir çekiç atma
                   sporcusunun bıraktığı çekiç de teğet gider — bu yüzden atletler
                   bırakma anını çok dikkatli seçer.</p>
                 </div>` }
      ]
    }
  ]
},

/* -------------------------------------------------------- Simülasyon */
sim: F.simler['cembersel-yorunge-hiz'],

/* ------------------------------------------------------- Püf noktası */
puf: {
  html: `
    <p><strong>1 · Hız vektörü her zaman teğettir.</strong> Soruda "hız vektörünü çiziniz"
    diyorsa: yarıçapa dik çiz, dönme yönünü göster. Başka seçenek yok.</p>

    <p><strong>2 · "Düzgün" = sürat sabit, hız değişken.</strong> Bu hareket ivmelidir.
    "Sabit süratli hareketin ivmesi olmaz" ifadesi <strong>yanlıştır</strong>.</p>

    <p><strong>3 · İp koparsa TEĞET gider, dışarı değil.</strong> Bu konudaki
    bir numaralı soru tipidir.</p>

    <p><strong>4 · Merkezkaç kuvveti yoktur.</strong> Diyagrama böyle bir ok çizersen puan
    kaybedersin. Hissedilen savrulma, eylemsizliğin sonucudur.</p>

    <p><strong>5 · Dönen bir cismin farklı noktaları:</strong> Aynı katı cisim üzerindeki
    bütün noktaların <strong>periyodu ve açısal hızı aynıdır</strong>, ama merkeze uzak
    noktaların <strong>çizgisel hızı daha büyüktür</strong> (ϑ = ω·r).</p>

    <div style="background:var(--surface-0);border-radius:var(--r-sm);padding:14px;margin:14px 0">
      <p style="margin:0 0 8px;font-weight:600">Vektörlerin yönleri — ezber kartı</p>
      <table class="degisken-tablo" style="margin:0">
        <thead><tr><th>Büyüklük</th><th>Yönü</th></tr></thead>
        <tbody>
          <tr><td>Yarıçap vektörü</td><td>Merkezden cisme doğru</td></tr>
          <tr><td>Hız (ϑ)</td><td><strong>Teğet</strong> — yarıçapa dik</td></tr>
          <tr><td>Merkezcil ivme (a<sub>m</sub>)</td><td><strong>Merkeze</strong> doğru</td></tr>
          <tr><td>Merkezcil kuvvet (F<sub>m</sub>)</td><td><strong>Merkeze</strong> doğru</td></tr>
          <tr><td>İp koptuktan sonraki hareket</td><td><strong>Teğet</strong> doğrultuda düz</td></tr>
        </tbody>
      </table>
    </div>

    <p style="margin-bottom:0"><strong>6 · Bir tur = 2πr yol.</strong> Çizgisel hızı bulmanın
    en hızlı yolu: <code>ϑ = 2πr / T</code>. Periyot verilmişse başka formüle gerek yok.</p>`,

  ornekler: [
    {
      soru: `<p>Yarıçapı 2 m olan çember üzerinde düzgün çembersel hareket yapan bir cisim
             bir turu 4 saniyede tamamlıyor. Çizgisel hızı kaç m/s’dir? (π ≈ 3)</p>`,
      taktikle: `<p>Bir turda alınan yol çemberin çevresidir: 2πr = 2·3·2 = 12 m</p>
                 <p style="margin-bottom:0">ϑ = yol/süre = 12/4 = <strong>3 m/s</strong></p>`,
      uzun: `<p>ϑ = 2πr/T = (2·3·2)/4 = 3 m/s</p>`
    },
    {
      soru: `<p>Bir taş ipe bağlanıp yatay düzlemde döndürülürken ip <strong>tam en üst
             noktada</strong> kopuyor. Taş bundan sonra hangi doğrultuda hareket eder?</p>
             <p style="color:var(--text-3);font-size:.9em">(Yukarıdan bakış, sürtünme ihmal)</p>`,
      taktikle: `<p>Teğet doğrultu = yarıçapa dik doğrultu. En üst noktada yarıçap düşey
                 olduğuna göre teğet <strong>yatay</strong>dır.</p>
                 <p style="margin-bottom:0">Taş, dönme yönüne göre <strong>sağa veya sola
                 doğru yatay bir doğru</strong> boyunca gider — merkezden dışarı değil.</p>`,
      uzun: `<p>Newton I: kuvvet kalmayınca cisim hızını korur. Kopma anındaki hız teğet
             doğrultudaydı ⟹ hareket o doğrultuda devam eder.</p>`
    },
    {
      soru: `<p>Dönen bir plağın merkezine <strong>5 cm</strong> ve <strong>15 cm</strong>
             uzaklıktaki iki nokta için periyot, açısal hız ve çizgisel hız nasıl karşılaştırılır?</p>`,
      taktikle: `<p>Aynı katı cisim ⟹ <strong>T eşit, ω eşit</strong>.</p>
                 <p style="margin-bottom:0">ϑ = ω·r olduğundan çizgisel hızlar r ile orantılıdır:
                 <strong>ϑ₂/ϑ₁ = 15/5 = 3</strong>. Dış nokta 3 kat hızlı.</p>`,
      uzun: `<p>Her iki nokta da aynı sürede bir tur atar ⟹ T₁ = T₂ ⟹ ω₁ = ω₂</p>
             <p>ϑ = ω·r ⟹ ϑ ∝ r ⟹ ϑ₂ = 3·ϑ₁</p>`
    }
  ]
},

/* ------------------------------------------------------ Zorlayıcı sorular */
osym: [
  {
    baslik: 'İpin kopması',
    kaynak: 'Kavram tuzağı',
    govde: `
      <p>Yatay bir masa üzerinde ipe bağlı bir taş, şekildeki gibi <strong>saat yönünün
      tersinde</strong> düzgün çembersel hareket yapmaktadır. Taş <strong>K noktasından</strong>
      geçerken ip kopuyor.</p>
      <p>Buna göre taş bundan sonra hangi yolu izler?</p>
      <p style="font-size:.9em;color:var(--text-3)">(Yukarıdan bakış, sürtünmeler ihmal ediliyor.)</p>`,
    gorsel: `
      <svg viewBox="0 0 520 220" xmlns="http://www.w3.org/2000/svg" role="img"
           aria-label="Çembersel hareket yapan taşın K noktasında ip koptuktan sonraki olası yolları">
        <rect width="520" height="220" fill="#0E1726"/>
        <circle cx="200" cy="112" r="70" fill="none" stroke="#4A5F86" stroke-width="1.6" stroke-dasharray="5 6"/>
        <circle cx="200" cy="112" r="5" fill="#6F84A8"/>
        <path d="M200 112 L270 112" stroke="#8A6A3A" stroke-width="2.2"/>
        <circle cx="270" cy="112" r="8" fill="#E24B4A"/>
        <text x="270" y="136" fill="#EAF0FA" font-size="13" font-family="system-ui" text-anchor="middle">K</text>
        <path d="M244 56 A 70 70 0 0 0 200 42" stroke="#35C08A" stroke-width="2" fill="none"/>
        <path d="M196 34 L208 46 L198 50 Z" fill="#35C08A"/>
        <text x="150" y="36" fill="#35C08A" font-size="12" font-family="system-ui">dönme yönü</text>
        <path d="M270 104 L270 40" stroke="#35C08A" stroke-width="2.6"/>
        <path d="M270 30 L263 46 L277 46 Z" fill="#35C08A"/>
        <text x="286" y="44" fill="#35C08A" font-size="13" font-family="system-ui">I</text>
        <path d="M280 112 L400 112" stroke="#FF6B6B" stroke-width="2.2" stroke-dasharray="5 5"/>
        <path d="M410 112 L394 105 L394 119 Z" fill="#FF6B6B"/>
        <text x="418" y="116" fill="#FF6B6B" font-size="13" font-family="system-ui">II</text>
        <path d="M278 120 L360 190" stroke="#A78BFA" stroke-width="2.2" stroke-dasharray="5 5"/>
        <path d="M368 197 L352 190 L360 180 Z" fill="#A78BFA"/>
        <text x="380" y="198" fill="#A78BFA" font-size="13" font-family="system-ui">III</text>
      </svg>`,
    secenekler: [
      'I — teğet doğrultuda, dönme yönünde düz gider',
      'II — merkezden dışarı doğru düz gider',
      'III — eğri bir yol izleyerek uzaklaşır',
      'Çembersel harekete devam eder',
      'Olduğu yerde durur'
    ],
    dogru: 0,
    cozum: `
      <p>İp koptuğu anda taşa etki eden yatay kuvvet kalmaz. Newton I gereği taş
      <strong>o andaki hızını korur</strong>.</p>
      <p>Kopma anındaki hız <strong>teğet doğrultudaydı</strong> ve dönme yönündeydi.
      K noktasında yarıçap yatay olduğuna göre teğet <strong>düşeydir</strong> ve
      saat yönünün tersine dönüldüğü için <strong>yukarı</strong> yönlüdür. Bu, I numaralı yoldur.</p>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>II şıkkı bu konunun klasik yanılgısıdır</strong> —
        "merkezkaç kuvveti dışarı fırlatır" sanısı. Böyle bir kuvvet yoktur; ip koptuktan sonra
        taşa dışarı doğru kuvvet uygulayan hiçbir şey kalmaz.
        <br><strong>III şıkkı</strong> ise kuvvet olmadan eğri yörünge çizilebileceğini varsayar.
        Eğri yörünge için <em>sürekli bir kuvvet</em> gerekir — o da artık yok.
        <br><strong>Hızlı kontrol:</strong> Çamaşır makinesi sıkarken su delikten teğet fırlar,
        dışarı doğru değil.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: A) I</strong></p>`
  },
  {
    baslik: 'Sabit sürat, değişen hız',
    kaynak: 'Kavram tuzağı',
    govde: `
      <p>Düzgün çembersel hareket yapan bir cisim için aşağıdaki yargılardan hangileri
      <strong>doğrudur</strong>?</p>
      <ol style="margin-left:.2em">
        <li>Cismin sürati sabittir.</li>
        <li>Cismin hızı sabittir.</li>
        <li>Cismin ivmesi sıfırdır.</li>
        <li>Cisme etki eden bileşke kuvvet sıfırdan farklıdır.</li>
      </ol>`,
    secenekler: ['Yalnız I', 'I ve IV', 'I, II ve III', 'II ve III', 'I, III ve IV'],
    dogru: 1,
    cozum: `
      <ol>
        <li><strong>Doğru.</strong> "Düzgün" kelimesi tam olarak bunu ifade eder: sürat sabittir.</li>
        <li><strong>Yanlış.</strong> Hız <em>vektörel</em>dir. Büyüklüğü sabit olsa da
        <strong>yönü sürekli değişiyor</strong> ⟹ hız sabit değildir.</li>
        <li><strong>Yanlış.</strong> Hız değiştiğine göre ivme vardır. İvme merkeze doğrudur.</li>
        <li><strong>Doğru.</strong> a ≠ 0 ise F<sub>net</sub> = m·a ≠ 0. Bileşke kuvvet
        merkeze doğrudur ve cismi yörüngede tutan şey odur.</li>
      </ol>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>Bu soru tek bir ayrımı ölçüyor: sürat skaler, hız vektörel.</strong>
        Türkçede iki kelime günlük dilde aynı anlamda kullanıldığı için bu ayrım sürekli sorulur.
        <br>Kural: <strong>yön değişimi de bir hız değişimidir.</strong> Bu cümleyi ezberle,
        bu konudaki kavram sorularının çoğu açılır.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: B) I ve IV</strong></p>`
  }
],

/* --------------------------------------------- Bağlam temelli sorular */
baglam: [
  {
    baslik: 'Çim biçme makinesinin uyarısı',
    govde: `
      <p>Çim biçme makinelerinin kullanım kılavuzunda şu uyarı bulunur:
      <strong>"Makineyi çalıştırmadan önce çevredeki taş ve sert cisimleri temizleyin.
      Çalışma sırasında makinenin önünde ve yanlarında kimse bulunmamalıdır."</strong></p>
      <p>Bir öğrenci merak ediyor: "Bıçak dönüyorsa taş her yöne saçılır, neden özellikle
      <em>ön ve yan</em> deniyor?"</p>
      <p><strong>Fırlayan taşın izleyeceği yolu fizikle açıkla.</strong></p>`,
    gorsel: `
      <svg viewBox="0 0 520 220" xmlns="http://www.w3.org/2000/svg" role="img"
           aria-label="Dönen bıçaktan teğet doğrultuda fırlayan taşların yolu">
        <rect width="520" height="220" fill="#17223A"/>
        <rect x="0" y="186" width="520" height="34" fill="#3B5323"/>
        <circle cx="200" cy="106" r="76" fill="#1E2B42" stroke="#4A5F86" stroke-width="1.6"/>
        <rect x="128" y="100" width="144" height="12" rx="4" fill="#9AA5B1"/>
        <circle cx="200" cy="106" r="10" fill="#5F6B78"/>
        <path d="M244 46 A 76 76 0 0 0 176 30" stroke="#35C08A" stroke-width="2" fill="none"/>
        <path d="M170 24 L184 34 L173 40 Z" fill="#35C08A"/>
        <text x="130" y="26" fill="#35C08A" font-size="12" font-family="system-ui">bıçak dönüyor</text>
        <circle cx="272" cy="106" r="6" fill="#E24B4A"/>
        <path d="M272 98 L272 40" stroke="#E24B4A" stroke-width="2.6"/>
        <path d="M272 30 L265 46 L279 46 Z" fill="#E24B4A"/>
        <circle cx="128" cy="106" r="6" fill="#E24B4A"/>
        <path d="M128 114 L128 172" stroke="#E24B4A" stroke-width="2.6"/>
        <path d="M128 182 L121 166 L135 166 Z" fill="#E24B4A"/>
        <text x="300" y="60" fill="#E24B4A" font-size="12" font-family="system-ui">teğet doğrultu</text>
        <text x="300" y="78" fill="#6F84A8" font-size="11" font-family="system-ui">taş buradan fırlar</text>
        <text x="16" y="30" fill="#6F84A8" font-size="12" font-family="system-ui">yukarıdan bakış</text>
      </svg>`,
    adimlar: [
      { bas: 'Olayı fiziksel modele çevir',
        metin: 'Bıçağın ucundaki taş, bıçakla birlikte <strong>çembersel hareket</strong> yapıyor. Onu çemberde tutan şey bıçağın ona uyguladığı kuvvettir.' },
      { bas: 'Taşın ayrıldığı anı düşün',
        metin: 'Taş bıçaktan ayrıldığı anda üzerine etki eden kuvvet <strong>ortadan kalkar</strong>. Bu, ipin kopmasıyla birebir aynı durumdur.' },
      { bas: 'Newton I’i uygula',
        metin: 'Kuvvet yoksa taş <strong>hızını korur</strong>. Ayrılma anındaki hız teğet doğrultudaydı ⟹ taş <strong>teğet doğrultuda düz</strong> fırlar.' },
      { bas: 'Teğet doğrultunun nereye baktığını bul',
        metin: 'Bıçak yatay düzlemde döndüğü için teğet doğrultular da <strong>yataydır</strong> ve makinenin <strong>yan taraflarına</strong> bakar. Taş yukarı değil, yana doğru fırlar.' },
      { bas: 'Uyarıyı açıkla',
        metin: 'Bu yüzden tehlikeli bölge makinenin <strong>önü ve yanlarıdır</strong>. Ayrıca bıçak ucundaki çizgisel hız çok yüksektir (ϑ = ω·r, r büyük) — taş mermi gibi hızla fırlar.' },
      { bas: 'Genelle',
        metin: 'Aynı fizik: çamaşır makinesinin sıkma programında suyun teğet fırlaması, çekiç atma sporcusunun bırakma anını dikkatle seçmesi, virajda savrulan aracın <em>yoldan teğet çıkması</em>.' }
    ],
    secenekler: [
      'Taş merkezden dışarı, yani her yöne eşit dağılır',
      'Taş bıçaktan ayrıldığı anki teğet doğrultuda düz fırlar; bu doğrultular yatay olduğu için tehlike ön ve yanlardadır',
      'Taş yukarı doğru fırlar, bu yüzden baş koruması gerekir',
      'Taş bıçağa yapışır ve hiç fırlamaz',
      'Taşın yolu kütlesine bağlı olarak değişir'
    ],
    dogru: 1,
    cozum: `
      <p>Taş bıçaktan ayrıldığı anda üzerine kuvvet kalmaz. Newton I gereği hızını korur ve
      <strong>teğet doğrultuda düz</strong> gider.</p>
      <p>Bıçak yatay düzlemde döndüğü için teğetler de yataydır — taşlar makinenin
      <strong>yanlarına ve önüne</strong> doğru fırlar, yukarı değil.</p>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>E şıkkı:</strong> Yolun <em>doğrultusu</em> kütleye bağlı değildir —
        teğet doğrultu geometriden gelir. Kütle sadece taşın <em>ne kadar uzağa</em> gideceğini
        (hava direnci ve ağırlık etkisiyle) belirler, hangi yöne gideceğini değil.
        <br><strong>Sayısal fikir:</strong> Tipik bir çim biçme bıçağı r = 0,25 m yarıçapta
        saniyede 50 tur atar. ϑ = 2πr·f ≈ 78 m/s — yani 280 km/s. Uyarı ciddi.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: B</strong></p>`
  },
  {
    baslik: 'Dönme dolabın kabinleri',
    govde: `
      <p>Bir lunaparkta dönme dolap sabit hızla dönüyor. Dolabın yarıçapı <strong>12 m</strong>
      ve bir turu <strong>60 saniyede</strong> tamamlıyor.</p>
      <p>Bir ziyaretçi, dolabın <strong>dış çemberindeki kabin</strong> ile
      <strong>merkeze daha yakın bir bakım platformu</strong> (r = 4 m) arasında bir fark
      olup olmadığını merak ediyor.</p>
      <p><strong>İkisinin periyodu, açısal hızı ve çizgisel hızı nasıl karşılaştırılır?</strong>
      (π ≈ 3)</p>`,
    gorsel: `
      <svg viewBox="0 0 520 220" xmlns="http://www.w3.org/2000/svg" role="img"
           aria-label="Dönme dolabın dış kabini ve iç platformunun yarıçap karşılaştırması">
        <rect width="520" height="220" fill="#17223A"/>
        <rect x="0" y="196" width="520" height="24" fill="#3B5323"/>
        <path d="M240 196 L260 110 L280 196" stroke="#7D8A99" stroke-width="5" fill="none"/>
        <circle cx="260" cy="104" r="84" fill="none" stroke="#4A5F86" stroke-width="2"/>
        <circle cx="260" cy="104" r="28" fill="none" stroke="#6F84A8" stroke-width="1.6" stroke-dasharray="4 4"/>
        <circle cx="260" cy="104" r="7" fill="#9AA5B1"/>
        ${[0,45,90,135,180,225,270,315].map(d => {
          const a = d * Math.PI / 180;
          const x = 260 + 84 * Math.cos(a), y = 104 + 84 * Math.sin(a);
          return `<line x1="260" y1="104" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" stroke="#3A4E76" stroke-width="1.2"/>
                  <rect x="${(x-9).toFixed(1)}" y="${(y-7).toFixed(1)}" width="18" height="14" rx="3" fill="#E24B4A"/>`;
        }).join('')}
        <circle cx="288" cy="104" r="6" fill="#35C08A"/>
        <path d="M260 104 L344 104" stroke="#4DA3FF" stroke-width="2"/>
        <text x="306" y="96" fill="#4DA3FF" font-size="12" font-family="system-ui">r = 12 m</text>
        <path d="M260 118 L288 118" stroke="#35C08A" stroke-width="2"/>
        <text x="274" y="136" fill="#35C08A" font-size="12" font-family="system-ui" text-anchor="middle">r = 4 m</text>
        <text x="16" y="28" fill="#6F84A8" font-size="12" font-family="system-ui">T = 60 s</text>
      </svg>`,
    adimlar: [
      { bas: 'Verilenleri ayıkla',
        metin: 'r₁ = 12 m (dış kabin), r₂ = 4 m (iç platform), T = 60 s. İkisi <strong>aynı katı cisme</strong> bağlı.' },
      { bas: 'Kritik gözlemi yap',
        metin: 'Her ikisi de <strong>aynı sürede bir tur</strong> atar — çünkü aynı yapıya bağlılar. Demek ki <strong>periyotları eşittir</strong>: T₁ = T₂ = 60 s.' },
      { bas: 'Açısal hızı karşılaştır',
        metin: 'ω = 2π/T ifadesinde yalnızca T var, r yok. Periyotlar eşitse <strong>açısal hızlar da eşittir</strong>: ω = 2·3/60 = 0,1 rad/s.' },
      { bas: 'Çizgisel hızı karşılaştır',
        metin: 'ϑ = ω·r ifadesinde r <em>var</em>. ω aynı olduğuna göre <strong>ϑ ∝ r</strong>.' },
      { bas: 'Hesapla',
        metin: 'ϑ₁ = 0,1 · 12 = <strong>1,2 m/s</strong><br>ϑ₂ = 0,1 · 4 = <strong>0,4 m/s</strong><br>Oran: ϑ₁/ϑ₂ = 12/4 = <strong>3</strong>' },
      { bas: 'Yorumla',
        metin: 'Dış kabin 3 kat hızlı gidiyor ama aynı sürede tur atıyor — çünkü 3 kat uzun bir yol kat ediyor. Bu yüzden lunaparklarda heyecan hep <strong>dış çemberde</strong>dir. Aynı sebeple bir plakta iğne dışa kaydıkça altındaki şerit hızlanır.' }
    ],
    secenekler: [
      'Periyot ve açısal hız eşit, dış kabinin çizgisel hızı 3 kat büyük',
      'Üçü de eşit',
      'Periyot eşit, açısal hız 3 kat, çizgisel hız eşit',
      'Dış kabinin periyodu 3 kat büyük',
      'Dış kabinin açısal hızı 3 kat büyük, çizgisel hız eşit'
    ],
    dogru: 0,
    cozum: `
      <p>İkisi de aynı katı cisme bağlı olduğundan <strong>aynı sürede bir tur</strong> atar:
      T₁ = T₂ = 60 s ⟹ ω₁ = ω₂ = 2π/T = <strong>0,1 rad/s</strong></p>
      <p>ϑ = ω·r olduğundan çizgisel hız yarıçapla orantılıdır:</p>
      <p>ϑ₁ = 0,1·12 = <strong>1,2 m/s</strong> · ϑ₂ = 0,1·4 = <strong>0,4 m/s</strong> ⟹ oran <strong>3</strong></p>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>Ezberlenecek kural:</strong> Aynı katı cisim üzerindeki
        bütün noktaların <strong>T, f ve ω’sı aynıdır</strong>; <strong>ϑ ise yarıçapla
        orantılıdır</strong>. Dönen her sistemde (plak, çark, pervane, dünya) bu böyledir.
        <br>Kayışla/dişliyle bağlı sistemler farklıdır — orada <em>çizgisel hızlar</em> eşit,
        açısal hızlar yarıçapla ters orantılı olur. Hangi tür bağlantı olduğuna dikkat et.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: A</strong></p>`
  }
]

});
})();
