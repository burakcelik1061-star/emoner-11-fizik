(function () {
"use strict";
const F = window.F11;

/* ==========================================================================
   topics/u1-yukari-atis.js
   Konu 1.1 ek · Aşağıdan yukarıya atış   (kitapta 1.1.2 içinde geçer)

   Kitap düşey atışları "serbest düşme" başlığı altında toplar — fizik olarak
   doğrudur. Ancak yukarı atış PROBLEM ÇÖZME açısından ayrı bir beceridir:
   iki fazlı hareket, simetri ve uçuş süresi hesabı. Bu yüzden kendi sayfası var.
   ========================================================================== */

F.konuKaydet('u1-yukari-atis', {

ozet: `İlk hızı sıfırdan farklı olmak şartıyla <strong>yukarı doğru</strong> atılan cisimlerin
hareketidir. Cisim <strong>iki fazlı</strong> bir hareket yapar: önce yavaşlayarak
çıkar, bir an durur, sonra hızlanarak iner. Bu hareketin en güçlü özelliği
<strong>simetrik</strong> olmasıdır — çıkışta ne yaşandıysa inişte aynısı tersten yaşanır.
Bu simetriyi kullanan, soruların yarısını hiç hesap yapmadan çözer.`,

/* ------------------------------------------------------------- Kavram */
kavram: `
<div class="kutu nott" style="margin-bottom:16px">
  <div class="kutu-bas"><span class="ikon">📖</span>Bu sayfa neden var?</div>
  <p style="margin:0">Ders kitabı atışları 1.1.2’nin içinde anlatır ve haklıdır:
  havayı terk eden her cisim serbest düşer. Ama sınav soruları yukarı atışı ve aşağı
  atışı <strong>ayrı ayrı</strong> sorar; her birinin kendi tuzağı var. Bu yüzden
  iki ayrı sayfa açtık.</p>
</div>

<h3>Tanım</h3>
<p><strong>Aşağıdan yukarıya atış:</strong> Bir cisme <strong>sıfırdan farklı</strong> bir ilk
hız <strong>yukarı yönde</strong> verilerek yapılan düşey harekettir. İlk hız sıfır olsaydı
hareket serbest düşme olurdu; ilk hız aşağı yönlü olsaydı yukarıdan aşağıya atış olurdu.</p>

<div class="formul" style="max-width:360px;margin:14px 0;border-top-color:var(--b4)">
  <div class="fm" style="color:var(--b4)">ϑ₀ ≠ 0 &nbsp;ve&nbsp; yukarı yönlü</div>
  <div class="fm-ad">Aşağıdan yukarıya atışın şartı</div>
</div>

<table class="degisken-tablo">
  <thead><tr><th>Hareket tipi</th><th>İlk hız</th><th>Başlangıçta ne oluyor?</th><th>Hareketin yapısı</th></tr></thead>
  <tbody>
    <tr><td>Serbest düşme</td><td class="sembol">ϑ₀ = 0</td><td>Yok — cisim yalnızca <strong>bırakılır</strong></td><td>Tek fazlı, hızlanır</td></tr>
    <tr><td>Yukarıdan aşağıya atış</td><td class="sembol">ϑ₀ ≠ 0, aşağı</td><td>Var — cisim <strong>aşağı doğru atılır</strong></td><td>Tek fazlı, hızlanır</td></tr>
    <tr style="background:var(--surface-2)"><td><strong>Aşağıdan yukarıya atış</strong></td><td class="sembol">ϑ₀ ≠ 0, yukarı</td><td>Var — cisim <strong>yukarı doğru atılır</strong></td><td>İki fazlı: yavaşlar, durur, hızlanır</td></tr>
  </tbody>
</table>
<p style="margin-top:10px;color:var(--text-2)">Üçünün de <strong>ivmesi aynıdır: a = g, aşağı doğru.</strong>
Aralarındaki tek fark <strong>ilk hızdır</strong> — hareketi birbirinden ayıran şey budur.</p>

<h3 style="margin-top:22px">Hareketin iki fazı</h3>
<p>Cisme etki eden tek kuvvet ağırlıktır ve <strong>daima aşağı doğrudur</strong> —
cisim yukarı çıkarken de. Bu yüzden:</p>
<ul>
  <li><strong>Çıkış fazı:</strong> Hız yukarı, ivme aşağı ⟹ cisim <strong>yavaşlar</strong></li>
  <li><strong>Tepe noktası:</strong> ϑ = 0, ama <strong>a = g</strong> (sıfır değil!)</li>
  <li><strong>İniş fazı:</strong> Hız aşağı, ivme aşağı ⟹ cisim <strong>hızlanır</strong></li>
</ul>

<div class="kutu dikkat" style="margin:14px 0">
  <div class="kutu-bas"><span class="ikon">⚠</span>Tepe noktası tuzağı</div>
  <p style="margin:0">Tepede cisim bir an <em>duruyor gibi</em> görünür. Hızı gerçekten
  sıfırdır — ama <strong>ivmesi sıfır değildir</strong>. İvme sıfır olsaydı cisim orada
  havada asılı kalırdı. Cisim havada olduğu sürece ivmesi g’dir.</p>
</div>

<h3 style="margin-top:22px">Simetri — bu konunun en güçlü aracı</h3>
<p>Cisim atıldığı seviyeye döndüğünde hareket <strong>tam simetriktir</strong>:</p>

<div style="display:grid;gap:10px;margin:14px 0">
  <div style="display:flex;gap:12px;background:var(--surface-0);border:1px solid var(--border);border-left:3px solid var(--b4);border-radius:var(--r-sm);padding:12px 14px">
    <strong style="color:var(--b4);flex:0 0 auto;min-width:64px">SÜRE</strong>
    <div>Çıkış süresi = iniş süresi = <strong>ϑ₀/g</strong><br>
    Toplam uçuş süresi: <strong>t<sub>uçuş</sub> = 2ϑ₀/g</strong></div>
  </div>
  <div style="display:flex;gap:12px;background:var(--surface-0);border:1px solid var(--border);border-left:3px solid var(--b1);border-radius:var(--r-sm);padding:12px 14px">
    <strong style="color:var(--b1);flex:0 0 auto;min-width:64px">HIZ</strong>
    <div>Aynı seviyede hız <strong>büyüklükleri eşit</strong>, yönleri zıttır.<br>
    Çıkarken 20 m/s ile geçtiğin noktadan inerken yine 20 m/s ile geçersin.</div>
  </div>
  <div style="display:flex;gap:12px;background:var(--surface-0);border:1px solid var(--border);border-left:3px solid var(--b3);border-radius:var(--r-sm);padding:12px 14px">
    <strong style="color:var(--b3);flex:0 0 auto;min-width:64px">GEÇİŞ</strong>
    <div>Cisim her yükseklikten <strong>iki kez</strong> geçer — biri çıkarken,
    biri inerken. Bu yüzden "kaçıncı saniyede" soruları <strong>iki cevaplıdır</strong>.</div>
  </div>
</div>

<h3 style="margin-top:22px">Uçuş süresi hangisi?</h3>
<p><strong>Dikkat:</strong> "Uçuş süresi" iki farklı şey olabilir. Soruyu dikkatli oku:</p>
<ul>
  <li><strong>Aynı seviyeye dönüş:</strong> t = 2ϑ₀/g. Atış yüksekliği (h₀) hiç girmez.</li>
  <li><strong>Yere iniş:</strong> h₀’dan atıldıysa cisim aynı seviyeyi geçip daha da iner.
  Bunun için ikinci dereceden denklem çözmek gerekir.</li>
</ul>
<p style="color:var(--text-2)">Simülasyonda atış yüksekliğini 0 yaparsan iki süre çakışır;
yükseltirsen ayrışır. İkisini karşılaştırarak farkı gör.</p>`,

/* ---------------------------------------------------------- Formüller */
formuller: {
  liste: [
    { fm: 'ϑ = ϑ₀ − g·t',                aciklama: 'Hız — işaret değiştirdiği an tepe noktasıdır' },
    { fm: 't<sub>tepe</sub> = ϑ₀ / g',   aciklama: 'Tepeye çıkış süresi' },
    { fm: 'h<sub>maks</sub> = ϑ₀² / 2g', aciklama: 'Atış seviyesinden çıkılan yükseklik' },
    { fm: 't<sub>uçuş</sub> = 2ϑ₀ / g',  aciklama: 'Aynı seviyeye dönüş süresi (simetri)' },
    { fm: 'y = h₀ + ϑ₀·t − ½g·t²',       aciklama: 'Konum — her iki fazı birden kapsar' },
    { fm: 'ϑ² = ϑ₀² − 2g·h',             aciklama: 'Zaman geçmeyen ifade' }
  ],
  degiskenler: [
    { sembol: 'ϑ₀',                    ad: 'İlk hız (yukarı)',        birim: 'm/s' },
    { sembol: 'h₀',                    ad: 'Atış yüksekliği',         birim: 'm' },
    { sembol: 'h<sub>maks</sub>',      ad: 'Çıkılan ek yükseklik',    birim: 'm' },
    { sembol: 't<sub>uçuş</sub>',      ad: 'Uçuş süresi',             birim: 's' }
  ]
},

/* ------------------------------------------------------------ Türetim */
turetim: {
  yollar: [
    {
      ad: 'Simetri nereden geliyor?',
      adimlar: [
        { baslik: 'Tepeye çıkış süresini bul',
          html: `<p>Tepe noktası, <strong>hızın sıfırlandığı</strong> andır:</p>
                 <p>0 = ϑ₀ − g·t ⟹</p>
                 <div class="formul" style="max-width:200px"><div class="fm">t<sub>tepe</sub> = ϑ₀ / g</div></div>
                 <p style="margin-top:10px;color:var(--text-2)">20 m/s ile atılan cisim
                 g = 10 iken tepeye <strong>2 saniyede</strong> çıkar.</p>` },

        { baslik: 'Çıkılan yüksekliği bul',
          html: `<p>Zamandan bağımsız ifadeyi kullanalım (tepede ϑ = 0):</p>
                 <p>0 = ϑ₀² − 2g·h ⟹</p>
                 <div class="formul" style="max-width:220px"><div class="fm">h<sub>maks</sub> = ϑ₀² / 2g</div></div>
                 <p style="margin-top:10px;color:var(--text-2)">20 m/s için: 400/20 = <strong>20 m</strong>.</p>` },

        { baslik: 'İniş süresini AYRI hesapla',
          html: `<p>Tepede cisim duruyor ve h<sub>maks</sub> yüksekliğinde. Oradan
                 <strong>ilk hızsız serbest düşme</strong> yapar:</p>
                 <p>h<sub>maks</sub> = ½·g·t′² ⟹ t′ = √(2h<sub>maks</sub>/g)</p>
                 <p>h<sub>maks</sub> = ϑ₀²/(2g) yerine koyalım:</p>
                 <p>t′ = √(2 · ϑ₀²/(2g) / g) = √(ϑ₀²/g²) = <strong>ϑ₀/g</strong></p>` },

        { baslik: 'İkisini karşılaştır',
          html: `<div class="formul" style="max-width:320px;border-top-color:var(--accent)">
                   <div class="fm" style="color:var(--accent)">t<sub>çıkış</sub> = t<sub>iniş</sub> = ϑ₀/g</div>
                 </div>
                 <p style="margin-top:12px"><strong>Tam olarak eşit çıktı.</strong> Bu tesadüf değil:
                 yukarı çıkarken g cismi ne kadar yavaşlattıysa, inerken aynı g aynı miktarda
                 hızlandırır. Hareket zamanda simetriktir.</p>
                 <div class="formul" style="max-width:240px;border-top-color:var(--accent);margin-top:12px">
                   <div class="fm" style="color:var(--accent)">t<sub>uçuş</sub> = 2ϑ₀ / g</div>
                 </div>` },

        { baslik: 'Hız simetrisini de çıkar',
          html: `<p>ϑ² = ϑ₀² − 2g·h denkleminde belirli bir h yüksekliği alalım.
                 Bu denklem ϑ için <strong>iki kök</strong> verir: <strong>+ϑ</strong> ve
                 <strong>−ϑ</strong>.</p>
                 <p>Yani cisim o yükseklikten iki kez geçer — biri çıkarken, biri inerken —
                 ve <strong>hız büyüklükleri eşittir</strong>.</p>
                 <div class="kutu puf" style="margin-top:12px">
                   <p style="margin:0">Pratik sonucu: "Cisim atıldığı seviyeye hangi hızla döner?"
                   sorusunun cevabı her zaman <strong>ϑ₀</strong>’dır. Hiç hesap yapmana gerek yok.</p>
                 </div>` }
      ]
    },
    {
      ad: 'Tek denklemle çözmek',
      adimlar: [
        { baslik: 'İki fazı bölmek şart mı?',
          html: `<p>Çoğu öğrenci çıkış ve iniş fazlarını ayrı ayrı hesaplar — doğru ama
                 <strong>uzun</strong> yoldur ve hata payı yüksektir.</p>
                 <p>Aslında tek bir denklem her iki fazı birden kapsar.</p>` },

        { baslik: 'Konum denklemini kur',
          html: `<p>Yukarı pozitif, sıfır zeminde:</p>
                 <div class="formul" style="max-width:300px"><div class="fm">y = h₀ + ϑ₀·t − ½g·t²</div></div>
                 <p style="margin-top:10px">Bu denklem cismin <strong>her anki</strong> yüksekliğini
                 verir — çıkarken de, tepedeyken de, inerken de. Faz ayrımına gerek yok.</p>` },

        { baslik: 'Aranan koşulu denkleme çevir',
          html: `<ul>
                   <li><strong>Yere iner:</strong> y = 0 koy</li>
                   <li><strong>Belirli bir yükseklikten geçer:</strong> y = o değer</li>
                   <li><strong>Tepede:</strong> ϑ = 0 koy (konum denklemini kullanma)</li>
                 </ul>
                 <p>Elde ettiğin ikinci dereceden denklemin <strong>pozitif kökünü</strong> al.
                 Negatif kök, hareketin başlamadan önceki "sanal" geçmişidir.</p>` },

        { baslik: 'Örnek üzerinde uygula',
          html: `<p>h₀ = 45 m, ϑ₀ = +20 m/s, g = 10. Yere kaç saniyede iner?</p>
                 <p>0 = 45 + 20t − 5t² ⟹ 5’e böl ⟹ <strong>t² − 4t − 9 = 0</strong></p>
                 <p>t = (4 + √(16 + 36))/2 = (4 + √52)/2 ≈ <strong>5,61 s</strong></p>
                 <div class="kutu puf" style="margin-top:12px">
                   <p style="margin:0">İki faza bölerek de aynı sonuca ulaşırsın (2 s çıkış +
                   3,61 s iniş), ama tek denklem daha hızlıdır.
                   <strong>Sayıları sadeleştirmeyi unutma</strong> — 5’e böldüğümüzde
                   işlem gözle görülür biçimde kolaylaştı.</p>
                 </div>` }
      ]
    }
  ]
},

/* -------------------------------------------------------- Simülasyon */
sim: F.simler['yukari-atis'],

/* ------------------------------------------------------- Püf noktası */
puf: {
  html: `
    <p><strong>1 · Simetri kuralları (aynı seviyeye dönüşte):</strong></p>
    <ul>
      <li>Çıkış süresi = iniş süresi = <code>ϑ₀/g</code></li>
      <li><code>t<sub>uçuş</sub> = 2ϑ₀/g</code></li>
      <li>Dönüş hızı = atış hızı (büyüklükçe)</li>
      <li>Aynı seviyede hızlar eşit büyüklükte, zıt yönde</li>
    </ul>

    <p><strong>2 · Tepede ϑ = 0 ama a = g.</strong> Bu konunun en çok sorulan tuzağı.</p>

    <p><strong>3 · Saniye kuralı burada da işler</strong> (g = 10 için). Yukarı atışta
    ilk saniyede alınan yol <strong>ϑ₀ − 5</strong>, sonra 10’ar 10’ar azalır.
    Negatife düştüğü saniye, cismin artık indiği saniyedir:</p>
    <div style="background:var(--surface-0);border-radius:var(--r-sm);padding:14px;margin:12px 0">
      <table class="degisken-tablo" style="margin:0">
        <thead><tr><th>ϑ₀ = 25 m/s</th><th>1. sn</th><th>2. sn</th><th>3. sn</th><th>4. sn</th></tr></thead>
        <tbody>
          <tr><td>O saniyedeki yol</td><td class="sembol">20</td><td class="sembol">10</td><td class="sembol">0</td><td class="sembol">−10</td></tr>
        </tbody>
      </table>
      <p style="margin:10px 0 0;font-size:.86em;color:var(--text-3)">
        3. saniyede yol sıfır — yani cisim o saniyenin başında ve sonunda aynı yükseklikte.
        Tepe noktası tam o saniyenin ortasında (t = 2,5 s = ϑ₀/g).
      </p>
    </div>

    <p><strong>4 · "Kaçıncı saniyede şu yükseklikte olur?" ⟹ İKİ cevap.</strong>
    İkinci dereceden denklem iki kök verir ve <strong>ikisi de geçerlidir</strong>.
    Kökler tepe noktasına göre simetriktir.</p>

    <p><strong>5 · Uçuş süresinin hangisi sorulduğuna dikkat et.</strong> "Aynı seviyeye
    dönüş" ise 2ϑ₀/g; "yere iniş" ise atış yüksekliği de hesaba girer ve denklem çözmek gerekir.</p>

    <p style="margin-bottom:0"><strong>6 · Süre sorulmuyorsa ϑ² = ϑ₀² − 2gh’ye git.</strong>
    Tepe yüksekliği, belirli bir seviyedeki hız gibi sorularda zamanı hiç hesaplamazsın.</p>`,

  ornekler: [
    {
      soru: `<p>Bir cisim 30 m/s hızla düşey yukarı atılıyor. Kaç metre yükselir ve
             atıldığı seviyeye kaç saniyede döner? (g = 10 m/s²)</p>`,
      taktikle: `<p>İki formülü doğrudan uygula:</p>
                 <p>h<sub>maks</sub> = ϑ₀²/2g = 900/20 = <strong>45 m</strong></p>
                 <p style="margin-bottom:0">t<sub>uçuş</sub> = 2ϑ₀/g = 60/10 = <strong>6 s</strong></p>`,
      uzun: `<p>Tepede ϑ = 0: 0 = 900 − 20h ⟹ h = 45 m</p>
             <p>t<sub>tepe</sub> = 30/10 = 3 s ⟹ toplam 6 s</p>`
    },
    {
      soru: `<p>Yukarı atılan bir cisim <strong>5. saniyede</strong> atıldığı seviyeye dönüyor.
             İlk hızı ve çıktığı en yüksek nokta nedir? (g = 10 m/s²)</p>`,
      taktikle: `<p>Simetriden geriye git: t<sub>uçuş</sub> = 2ϑ₀/g ⟹ 5 = 2ϑ₀/10 ⟹
                 <strong>ϑ₀ = 25 m/s</strong></p>
                 <p style="margin-bottom:0">h<sub>maks</sub> = 625/20 = <strong>31,25 m</strong></p>`,
      uzun: `<p>Tepeye çıkış süresi toplam sürenin yarısı: 2,5 s</p>
             <p>ϑ₀ = g·t<sub>tepe</sub> = 10 · 2,5 = 25 m/s</p>
             <p>h = ½·g·t² = ½·10·2,5² = 31,25 m</p>`
    },
    {
      soru: `<p>40 m/s ile yukarı atılan bir cisim, <strong>60 m yükseklikten</strong>
             kaçıncı saniyelerde geçer? (g = 10 m/s²)</p>`,
      taktikle: `<p>İki cevap olacağını baştan bil.</p>
                 <p>60 = 40t − 5t² ⟹ t² − 8t + 12 = 0 ⟹ (t−2)(t−6) = 0</p>
                 <p style="margin-bottom:0"><strong>t = 2 s (çıkarken)</strong> ve
                 <strong>t = 6 s (inerken)</strong></p>`,
      uzun: `<p>Tepe noktası t = 40/10 = 4 s’de. Kökler tepeye göre simetrik: 4∓2.</p>
             <p style="color:var(--text-3)">Tek kök bulup durmak bu konudaki en yaygın hatadır.</p>`
    }
  ]
},

/* ---------------------------------------------------- Zorlayıcı sorular */
osym: [
  {
    baslik: 'Hangisi daha hızlı çarpar?',
    kaynak: 'Kavram tuzağı',
    govde: `
      <p>Aynı yükseklikteki bir binanın çatısından, aynı anda, <strong>aynı büyüklükte
      20 m/s hızla</strong> üç taş bırakılıyor:</p>
      <ul style="margin-left:.2em">
        <li><strong>K:</strong> düşey <strong>yukarı</strong> atılıyor</li>
        <li><strong>L:</strong> düşey <strong>aşağı</strong> atılıyor</li>
        <li><strong>M:</strong> ilk hızsız <strong>serbest bırakılıyor</strong></li>
      </ul>
      <p>Taşların <strong>yere çarpma hızları</strong> nasıl karşılaştırılır?
      (Hava direnci ihmal ediliyor.)</p>`,
    gorsel: `
      <svg viewBox="0 0 520 210" xmlns="http://www.w3.org/2000/svg" role="img"
           aria-label="Çatıdan yukarı atılan, aşağı atılan ve bırakılan üç taşın karşılaştırması">
        <rect width="520" height="210" fill="#0E1726"/>
        <rect x="0" y="182" width="520" height="28" fill="#3B5323"/>
        <rect x="40" y="60" width="440" height="10" fill="#8A5A28"/>
        <rect x="40" y="70" width="440" height="112" fill="#D85A30" opacity=".22"/>
        <circle cx="130" cy="50" r="8" fill="#35C08A"/>
        <text x="130" y="30" fill="#35C08A" font-size="14" font-family="system-ui" text-anchor="middle">K</text>
        <path d="M130 40 L130 16" stroke="#35C08A" stroke-width="2.6"/>
        <path d="M130 8 L124 22 L136 22 Z" fill="#35C08A"/>
        <circle cx="260" cy="50" r="8" fill="#4DA3FF"/>
        <text x="260" y="30" fill="#4DA3FF" font-size="14" font-family="system-ui" text-anchor="middle">M</text>
        <text x="282" y="52" fill="#6F84A8" font-size="11" font-family="system-ui">ϑ₀ = 0</text>
        <circle cx="390" cy="50" r="8" fill="#FF7A45"/>
        <text x="390" y="30" fill="#FF7A45" font-size="14" font-family="system-ui" text-anchor="middle">L</text>
        <path d="M390 60 L390 92" stroke="#FF7A45" stroke-width="2.6"/>
        <path d="M390 100 L384 86 L396 86 Z" fill="#FF7A45"/>
        <text x="16" y="130" fill="#6F84A8" font-size="12" font-family="system-ui">hepsi 20 m/s</text>
      </svg>`,
    secenekler: [
      'ϑ_L > ϑ_K > ϑ_M',
      'ϑ_K > ϑ_L > ϑ_M',
      'ϑ_K = ϑ_L > ϑ_M',
      'Üçü de eşittir',
      'ϑ_M > ϑ_K = ϑ_L'
    ],
    dogru: 2,
    cozum: `
      <p>Zamandan bağımsız formülü kullan: <strong>ϑ² = ϑ₀² + 2g·h</strong></p>
      <p>Burada ϑ₀ <strong>kareli</strong> girdiği için <strong>işareti kaybolur</strong>:</p>
      <ul>
        <li><strong>K (yukarı, +20):</strong> ϑ₀² = 400</li>
        <li><strong>L (aşağı, −20):</strong> ϑ₀² = 400 — <strong>aynı</strong></li>
        <li><strong>M (bırakma, 0):</strong> ϑ₀² = 0 — <strong>en küçük</strong></li>
      </ul>
      <p>Yani <strong>K ve L aynı hızla çarpar</strong>, M daha yavaş.</p>
      <p><strong>Neden böyle?</strong> Simetri gereği K, atıldığı seviyeye döndüğünde
      tam olarak <strong>20 m/s aşağı</strong> hıza sahiptir. Yani o andan itibaren
      L ile <em>tamamen aynı</em> hareketi yapar. Aralarındaki tek fark, K’nin yukarı çıkıp
      inmek için harcadığı <strong>fazladan süredir</strong>.</p>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>A şıkkı en çekici çeldiricidir:</strong> "aşağı atılan daha
        hızlı çarpar" sezgisi güçlüdür ama yanlıştır. O sezgi <em>süre</em> için doğrudur,
        <em>hız</em> için değil.
        <br><strong>Ayrım cümlesi:</strong> <strong>Süreler farklı, çarpma hızları eşit.</strong>
        L en önce, M ortada, K en son iner — ama K ile L aynı hızla çarpar.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: C</strong></p>`
  },
  {
    baslik: 'İki taş havada karşılaşıyor',
    kaynak: 'Çok adımlı',
    govde: `
      <p>Yerden <strong>80 m</strong> yükseklikteki bir noktadan bir taş
      <strong>ilk hızsız bırakılıyor</strong>. Tam aynı anda, tam altındaki yerden
      ikinci bir taş <strong>40 m/s hızla düşey yukarı</strong> atılıyor.</p>
      <p>İki taş <strong>kaçıncı saniyede</strong> ve <strong>yerden kaç metre
      yükseklikte</strong> karşılaşır? (g = 10 m/s²)</p>`,
    secenekler: [
      't = 2 s · yerden 60 m',
      't = 2 s · yerden 20 m',
      't = 4 s · yerden 40 m',
      't = 1 s · yerden 75 m',
      't = 2,5 s · yerden 50 m'
    ],
    dogru: 0,
    cozum: `
      <p>İki taşın konumlarını <strong>aynı zaman değişkeniyle</strong> yazalım
      (yukarı pozitif, sıfır zeminde):</p>
      <ul>
        <li><strong>Üstteki (bırakılan):</strong> y₁ = 80 − 5t²</li>
        <li><strong>Alttaki (atılan):</strong> y₂ = 40t − 5t²</li>
      </ul>
      <p>Karşılaşma anında <strong>y₁ = y₂</strong>:</p>
      <p>80 − 5t² = 40t − 5t²</p>
      <p><strong>−5t² terimleri sadeleşir!</strong> Geriye kalır: 80 = 40t ⟹ <strong>t = 2 s</strong></p>
      <p>Yükseklik: y = 80 − 5·4 = <strong>60 m</strong></p>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>Bu sorunun güzelliği sadeleşmede.</strong> İki taş da
        <em>aynı g ile</em> düştüğü için −5t² terimleri birbirini götürür. Geriye
        <strong>sabit hızlı yaklaşma</strong> kalır: aradaki 80 m’lik mesafe 40 m/s’lik bağıl
        hızla kapanır ⟹ t = 80/40 = 2 s.
        <br><strong>Genel kural:</strong> Aynı anda bırakılan iki cismin <em>aralarındaki uzaklık</em>
        sadece bağıl hızla değişir — yer çekimi ikisini de eşit etkilediği için hesaptan düşer.
        Bu kısayolu bilirsen bu tip soruları tek satırda çözersin.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: A</strong></p>`
  }
],

/* --------------------------------------------- Bağlam temelli sorular */
baglam: [
  {
    baslik: 'Voleybolcunun servis kararı',
    govde: `
      <p>Bir voleybol antrenörü, smaç servisi çalıştırıyor. Oyuncu topu havaya atıp
      <strong>en yüksek noktada</strong> vurmalı — çünkü orada top bir an "asılı kalır"
      ve zamanlama en kolaydır.</p>
      <p>Oyuncu topu <strong>2 m</strong> yükseklikten, <strong>düşey yukarı 6 m/s</strong>
      hızla atıyor.</p>
      <p><strong>Oyuncunun vuruş için kaç saniyesi var ve top hangi yükseklikte olacak?</strong>
      (g = 10 m/s²)</p>`,
    gorsel: `
      <svg viewBox="0 0 520 220" xmlns="http://www.w3.org/2000/svg" role="img"
           aria-label="Voleybolcunun yukarı attığı topun tepe noktası">
        <rect width="520" height="220" fill="#17223A"/>
        <rect x="0" y="190" width="520" height="30" fill="#8A6B4A"/>
        <g transform="translate(150,190)">
          <circle cx="0" cy="-58" r="10" fill="#3C3489"/>
          <path d="M0 -48 L0 -20 M0 -20 L-10 0 M0 -20 L10 0 M0 -42 L22 -62" stroke="#3C3489" stroke-width="3.4" stroke-linecap="round"/>
        </g>
        <circle cx="180" cy="130" r="10" fill="#E8C547" stroke="#B89020" stroke-width="1.6"/>
        <path d="M180 118 L180 78" stroke="#35C08A" stroke-width="2.6" stroke-dasharray="4 4"/>
        <circle cx="180" cy="66" r="10" fill="#E8C547" opacity=".45"/>
        <text x="200" y="62" fill="#FFB020" font-size="12" font-family="system-ui">tepe · ϑ = 0</text>
        <path d="M300 66 H196" stroke="#FFB020" stroke-width="1.4" stroke-dasharray="5 4"/>
        <path d="M340 66 V190" stroke="#6F84A8" stroke-width="1.2"/>
        <path d="M335 66 H345 M335 190 H345" stroke="#6F84A8" stroke-width="1.2"/>
        <text x="354" y="132" fill="#A7B8D4" font-size="14" font-family="system-ui">h = ?</text>
        <path d="M110 130 H166" stroke="#4DA3FF" stroke-width="1.2" stroke-dasharray="4 4"/>
        <text x="104" y="134" fill="#4DA3FF" font-size="12" font-family="system-ui" text-anchor="end">2 m</text>
        <text x="200" y="146" fill="#35C08A" font-size="12" font-family="system-ui">6 m/s ↑</text>
      </svg>`,
    adimlar: [
      { bas: 'Verilenleri ayıkla',
        metin: 'h₀ = 2 m (atış yüksekliği), ϑ₀ = +6 m/s, g = 10 m/s². "Smaç servisi", "antrenör" sahne unsuru.' },
      { bas: 'Kritik ifadeyi fiziğe çevir',
        metin: '"En yüksek nokta" ⟹ <strong>ϑ = 0</strong>. Bu, metinde sayı olarak verilmeyen ama sorunun çözümü için şart olan veridir.' },
      { bas: 'Süre için formülü seç',
        metin: 'ϑ ve ϑ₀ biliniyor, t isteniyor ⟹ <strong>ϑ = ϑ₀ − g·t</strong>' },
      { bas: 'Süreyi hesapla',
        metin: '0 = 6 − 10·t ⟹ <strong>t = 0,6 s</strong>' },
      { bas: 'Yüksekliği hesapla',
        metin: 'Çıkılan ek yükseklik: h = ϑ₀²/(2g) = 36/20 = 1,8 m<br>Yerden yükseklik: 2 + 1,8 = <strong>3,8 m</strong>' },
      { bas: 'Yorumla',
        metin: '0,6 saniye çok kısa görünür ama top tepe noktasının <em>yakınında</em> çok daha uzun süre kalır — çünkü orada hızı çok küçüktür. Tepeden 10 cm aşağıda geçirdiği süre yaklaşık 0,3 saniyedir. "Asılı kalıyor" hissinin sebebi budur; topun gerçekten durduğu tek an t = 0,6 s’dir.' }
    ],
    secenekler: [
      't = 0,6 s · yerden 3,8 m',
      't = 0,6 s · yerden 1,8 m',
      't = 1,2 s · yerden 3,8 m',
      't = 0,3 s · yerden 2,9 m',
      't = 0,6 s · yerden 6,0 m'
    ],
    dogru: 0,
    cozum: `
      <p>"En yüksek nokta" ⟹ ϑ = 0.</p>
      <p><strong>Süre:</strong> 0 = 6 − 10t ⟹ <strong>t = 0,6 s</strong></p>
      <p><strong>Çıkılan yükseklik:</strong> ϑ₀²/(2g) = 36/20 = 1,8 m</p>
      <p><strong>Yerden yükseklik:</strong> 2 + 1,8 = <strong>3,8 m</strong></p>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>B şıkkı</strong> atış yüksekliğini (2 m) eklemeyi
        unutanlar için — soru "<em>yerden</em> yükseklik" diyorsa h₀’ı eklemeyi unutma.
        <br><strong>C şıkkı (1,2 s)</strong> ise <em>toplam uçuş</em> süresini verir,
        tepeye çıkış süresini değil. Tepeye çıkış, simetrik atışta toplam sürenin yarısıdır.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: A</strong></p>`
  },
  {
    baslik: 'Havai fişek gösterisi',
    govde: `
      <p>Bir belediye yeni yıl gösterisi planlıyor. Güvenlik uzmanı kuralı koyuyor:
      <strong>fişek en yüksek noktada patlamalı</strong> — çünkü orada hızı sıfırdır ve
      parçalar en simetrik dağılır.</p>
      <p>Fişek yerden <strong>40 m/s</strong> hızla düşey olarak fırlatılıyor. Teknisyen,
      fitilin kaç saniyede yanıp biteceğini ayarlamalı.</p>
      <p><strong>Fitil kaç saniyede yanmalı, patlama yerden kaç metre yükseklikte olur
      ve fişek fırlatıldıktan kaç saniye sonra yere dönerdi?</strong> (g = 10 m/s²)</p>`,
    gorsel: `
      <svg viewBox="0 0 520 230" xmlns="http://www.w3.org/2000/svg" role="img"
           aria-label="Havai fişeğin en yüksek noktada patlaması ve uçuş süresi">
        <rect width="520" height="230" fill="#0B1020"/>
        <g fill="#FFFFFF" opacity=".5">
          <rect x="60" y="30" width="2" height="2"/><rect x="150" y="62" width="2" height="2"/>
          <rect x="440" y="44" width="2" height="2"/><rect x="390" y="96" width="2" height="2"/>
          <rect x="100" y="120" width="2" height="2"/><rect x="470" y="140" width="2" height="2"/>
        </g>
        <rect x="0" y="202" width="520" height="28" fill="#1C2A1A"/>
        <g transform="translate(240,56)">
          <g stroke="#FFB020" stroke-width="2.4" stroke-linecap="round">
            <path d="M0 0 L0 -22"/><path d="M0 0 L20 -14"/><path d="M0 0 L-20 -14"/>
            <path d="M0 0 L26 4"/><path d="M0 0 L-26 4"/>
            <path d="M0 0 L16 20"/><path d="M0 0 L-16 20"/>
          </g>
          <circle cx="0" cy="0" r="7" fill="#FFD98A"/>
        </g>
        <path d="M240 190 L240 76" stroke="#FF6B6B" stroke-width="2" stroke-dasharray="5 5"/>
        <path d="M230 190 L250 190 L245 202 L235 202 Z" fill="#7D8A99"/>
        <path d="M330 76 V202" stroke="#6F84A8" stroke-width="1.2"/>
        <path d="M325 76 H335 M325 202 H335" stroke="#6F84A8" stroke-width="1.2"/>
        <text x="344" y="144" fill="#A7B8D4" font-size="14" font-family="system-ui">h = ?</text>
        <text x="150" y="178" fill="#35C08A" font-size="13" font-family="system-ui">ϑ₀ = 40 m/s</text>
        <text x="270" y="40" fill="#FFB020" font-size="13" font-family="system-ui">ϑ = 0 · patlama</text>
      </svg>`,
    adimlar: [
      { bas: 'Verilenleri ayıkla',
        metin: 'ϑ₀ = 40 m/s (yukarı), g = 10 m/s². Fişek yerden fırlatıldığı için h₀ = 0.' },
      { bas: 'Gizli veriyi bul',
        metin: '"En yüksek noktada patlamalı" ⟹ <strong>ϑ = 0</strong>. Metinde sayı yok, çıkarım senden bekleniyor.' },
      { bas: 'Fitil süresini hesapla',
        metin: 'ϑ = ϑ₀ − g·t ⟹ 0 = 40 − 10t ⟹ <strong>t = 4 s</strong>' },
      { bas: 'Patlama yüksekliğini hesapla',
        metin: 'ϑ² = ϑ₀² − 2gh ⟹ 0 = 1600 − 20h ⟹ <strong>h = 80 m</strong>' },
      { bas: 'Uçuş süresini bul',
        metin: 'Patlamasaydı simetri gereği yere dönerdi: <strong>t<sub>uçuş</sub> = 2ϑ₀/g = 8 s</strong> — yani fitil süresinin tam iki katı.' },
      { bas: 'Yorumla',
        metin: '80 m ≈ 25 katlı bina. Fitil erken yanarsa fişek hâlâ yükselirken patlar ve parçalar yukarı savrulur; geç yanarsa düşerken patlar ve parçalar yere doğru gider. İkisi de tehlikelidir — bu yüzden fitil süresi milisaniye hassasiyetinde ayarlanır.' }
    ],
    secenekler: [
      't_fitil = 4 s · h = 80 m · t_uçuş = 8 s',
      't_fitil = 4 s · h = 160 m · t_uçuş = 8 s',
      't_fitil = 8 s · h = 80 m · t_uçuş = 16 s',
      't_fitil = 2 s · h = 40 m · t_uçuş = 4 s',
      't_fitil = 4 s · h = 80 m · t_uçuş = 4 s'
    ],
    dogru: 0,
    cozum: `
      <p>"En yüksek nokta" ⟹ ϑ = 0.</p>
      <p><strong>Fitil süresi:</strong> 0 = 40 − 10t ⟹ <strong>t = 4 s</strong></p>
      <p><strong>Yükseklik:</strong> 0 = 1600 − 20h ⟹ <strong>h = 80 m</strong></p>
      <p><strong>Uçuş süresi:</strong> t<sub>uçuş</sub> = 2ϑ₀/g = <strong>8 s</strong></p>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>B şıkkı (160 m)</strong> h = ϑ₀·t = 40·4 diyenler için.
        Ama hız sabit değil ki — ortalama hız (40+0)/2 = 20 m/s, dolayısıyla h = 20·4 = 80 m.
        <br><strong>E şıkkı</strong> uçuş süresini fitil süresine eşitliyor; oysa simetri gereği
        uçuş süresi tepeye çıkış süresinin <strong>iki katıdır</strong>.
        <br><strong>Hatırlatma:</strong> t<sub>uçuş</sub> = 2·t<sub>tepe</sub> — bu ilişki
        yukarı atış sorularının yarısını tek başına çözer.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: A</strong></p>`
  }
]

});
})();
