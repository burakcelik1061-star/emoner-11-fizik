(function () {
"use strict";
const F = window.F11;

/* ==========================================================================
   topics/u3-fiber-optik.js
   Konu 3.6 · Fiber optik  (MEB 11, s.361-366)
   ========================================================================== */

F.konuKaydet('u3-fiber-optik', {

ozet: `Bu sayfayı okuman için gereken veri, büyük ihtimalle bir <strong>cam telin</strong>
içinden geçti. Fiber optik, 3.5&rsquo;te öğrendiğimiz <strong>tam yansımanın</strong>
doğrudan uygulamasıdır: ışık saç teli inceliğindeki bir cam çubuğun içine hapsedilir ve
kilometrelerce yol alır.`,

/* ------------------------------------------------------------- Kavram */
kavram: `
<h3>Fiberin yapısı</h3>
<p>Fiber optik kablo kitapta (Şekil 3.27) üç kısımdan oluşur:</p>
<table class="degisken-tablo">
  <thead><tr><th>Kısım</th><th>İndis</th><th>Tipik çap</th><th>Görevi</th></tr></thead>
  <tbody>
    <tr><td><strong>Çekirdek</strong> (merkez)</td><td class="sembol">n<sub>ç</sub> ≈ 1,48</td><td>8–62 µm</td><td>ışığı yansımalarla taşır</td></tr>
    <tr><td><strong>Cam örtü</strong></td><td class="sembol">n<sub>ö</sub> ≈ 1,46</td><td>125 µm</td><td>indisi çekirdekten küçük ⟹ tam yansımayı sağlar</td></tr>
    <tr><td><strong>Kılıf</strong> (plastik)</td><td>—</td><td>250 µm ve üstü</td><td>nem ve darbeye karşı korur</td></tr>
  </tbody>
</table>
<p style="margin-top:10px">Kritik koşul tek bir eşitsizliktir: <strong>n<sub>ç</sub> &gt;
n<sub>ö</sub></strong>. Çekirdek daha kırıcı olmasaydı tam yansıma olmaz, ışık ilk
santimetrede kaçardı.</p>

<h3 style="margin-top:22px">Işık nasıl hapsoluyor?</h3>
<p>Çekirdek–cam örtü sınırındaki sınır açısı:</p>
<div class="formul" style="max-width:260px;margin:14px 0;border-top-color:var(--accent)">
  <div class="fm" style="color:var(--accent)">sin θ<sub>s</sub> = n<sub>ö</sub> / n<sub>ç</sub></div>
</div>
<p>n<sub>ç</sub> = 1,48 ve n<sub>ö</sub> = 1,46 için <code>θ_s = 80,57°</code>. Çok büyük bir
açı — yani ışının duvara neredeyse <strong>yalayarak</strong> çarpması gerekir. Işın fiber
ekseninden fazla sapmamalıdır.</p>

<div class="kutu puf" style="margin:16px 0">
  <div class="kutu-bas"><span class="ikon">💡</span><span>Neden indisler birbirine bu kadar yakın?</span></div>
  <p style="margin:0">İlk bakışta “fark büyük olsa daha iyi tutar” diye düşünülür ve
  <em>tutma</em> açısından bu doğrudur. Ama fark büyüdükçe ışının izleyebileceği
  <strong>farklı yolların sayısı</strong> ve bu yollar arasındaki zaman farkı artar; sinyal
  bozulur. Modern fiberlerde indis farkı bilerek <strong>%1&rsquo;in altında</strong>
  tutulur.</p>
</div>

<h3 style="margin-top:22px">Sayısal açıklık (NA)</h3>
<p>Fiberin ucuna her açıdan ışık tutamazsın. Yalnızca belli bir <strong>koninin
içinden</strong> girenler tutunur:</p>
<div class="formul" style="max-width:340px;margin:14px 0;border-top-color:var(--accent)">
  <div class="fm" style="color:var(--accent)">NA = sin θ<sub>kabul</sub> = √(n<sub>ç</sub>² − n<sub>ö</sub>²)</div>
</div>
<p>Örnek fiberde <code>NA = √(1,48² − 1,46²) = 0,2425</code> ⟹ kabul açısı
<strong>14,03°</strong>. Koninin tam açıklığı 28°&rsquo;dir. Bu yüzden fiber uçlarının
hizalanması hassas bir iştir; birkaç mikronluk kayma sinyali yok edebilir.</p>

<h3 style="margin-top:22px">Mod dağılımı — fiberin sınırı</h3>
<p>Eksen boyunca giden ışın en kısa yolu izler. Sınır açısında zikzak çizen ışın ise
<code>n<sub>ç</sub>/n<sub>ö</sub></code> kat daha uzun yol alır. Aynı anda gönderilen bu iki
ışın hedefe <strong>farklı zamanlarda</strong> varır:</p>
<div class="formul" style="max-width:340px;margin:14px 0">
  <div class="fm">Δt = (L·n<sub>ç</sub>/c)·(n<sub>ç</sub>/n<sub>ö</sub> − 1)</div>
</div>
<p>Bu gecikme <strong>çok modlu</strong> fiberin sorunudur. Örnek fiberde <strong>67,6 ns/km</strong>. 10 km&rsquo;de 676 ns — keskin bir ışık
darbesi bu kadar <strong>yayılır</strong>. Darbeler birbirine karışmadan en fazla
<strong>0,74 Mb/s</strong> veri gönderilebilir.</p>
<p style="color:var(--text-2)">Gerçek internet omurgası bunun milyonlarca katı hızda
çalışır. Çözüm, çekirdeği o kadar inceltmektir ki (≈ 9 µm) tek bir yol kalsın:
<strong>tek modlu fiber</strong>. Böylece mod dağılımı tamamen ortadan kalkar.</p>

<h3 style="margin-top:22px">Tek modlu ve çok modlu fiber</h3>
<table class="degisken-tablo">
  <thead><tr><th></th><th>Tek modlu</th><th>Çok modlu</th></tr></thead>
  <tbody>
    <tr><td>Çekirdek</td><td>çok ince (≈ 9 µm)</td><td>daha kalın (50–62 µm)</td></tr>
    <tr><td>Işığın yolu</td><td>tek yol (mod)</td><td>birden fazla yol, daha çok yansıma</td></tr>
    <tr><td>Kayıp</td><td>uzun mesafede daha az</td><td>daha fazla</td></tr>
    <tr><td>Kullanım (kitap)</td><td>şehirler ve kıtalar arası genel ağ</td><td>binalar arası, kampüs içi</td></tr>
  </tbody>
</table>
<p style="margin-top:10px;color:var(--text-2)">Simülasyonun 3. düzeneğinde iki fiberde de ışık
darbeleri akar; çok modludaki eğik ışının darbesi geride kalır.</p>

<h3 style="margin-top:22px">Işık fiberden nasıl çıkar?</h3>
<p>Kitaptaki örnekte (s.365) ışın havadan çekirdeğe girerken normale yaklaşarak kırılır,
çekirdekte tam yansımalarla ilerler, sonda havaya çıkarken <strong>normalden uzaklaşarak</strong>
kırılır. İki uç yüzey paralel olduğundan ışık fiberden <strong>girdiği açıyla</strong> çıkar.
Uca dik giren ışın ise hiç kırılmadan geçer. Simülasyonun 1. düzeneği bunu gösterir.</p>

<h3 style="margin-top:22px">Bükülme kaybı ve su dolu şişe</h3>
<p>Fiber kıvrılsa da ışık onu izler, ama <strong>keskin</strong> bir kıvrımda dış duvara gelme
açısı küçülür. Sınır açısının altına inince ışık dışarı kaçar; bu, fiberde veri kaybının
sebeplerinden biridir. Kitaptaki Alıştırma 22&rsquo;de su dolu şişenin deliğinden akan su, içine
gönderilen lazer ışığını aynı ilkeyle taşır (su için sınır açısı ≈ 48°).</p>
<p style="color:var(--text-2)">Simülasyonun 4. düzeneğinde ışınlar bükülen bir su (ya da
pleksiglas) çubukta tam olarak izlenir. Su çubukta, bükülme yarıçapı çubuğun yarı
kalınlığının yaklaşık 8 katından küçülünce ışık kaçmaya başlar.</p>

<h3 style="margin-top:22px">Bilgi nasıl taşınır?</h3>
<ul>
  <li>Vericide ses, veri ya da görüntü elektrik sinyaline çevrilir.</li>
  <li>Gigabit arayüz çevirici elektrik sinyalini ışığa çevirir.</li>
  <li>Işık, fiberde alıcıdaki foto detektöre kadar ilerler.</li>
  <li>Foto detektör ışığı yeniden elektrik sinyaline, o da bilgiye çevrilir.</li>
</ul>

<h3 style="margin-top:22px">Neden bakır tel değil?</h3>
<table class="degisken-tablo">
  <thead><tr><th></th><th>Fiber optik</th><th>Bakır kablo</th></tr></thead>
  <tbody>
    <tr><td>Kayıp</td><td>~0,2 dB/km</td><td>yüksek</td></tr>
    <tr><td>Bant genişliği</td><td>Tb/s mertebesi</td><td>Gb/s</td></tr>
    <tr><td>Elektromanyetik girişim</td><td><strong>etkilenmez</strong></td><td>etkilenir</td></tr>
    <tr><td>Ağırlık</td><td>çok hafif</td><td>ağır</td></tr>
    <tr><td>Dinlenme (güvenlik)</td><td>çok zor</td><td>görece kolay</td></tr>
  </tbody>
</table>
<p style="margin-top:10px;color:var(--text-2)">Fiber elektromanyetik girişimden
etkilenmez, çünkü taşıdığı şey akım değil <strong>ışıktır</strong>. 2. ünitede öğrendiğin
indüksiyon, bir cam telde sinyal üretemez.</p>

<h3 style="margin-top:22px">Nerede kullanılır?</h3>
<ul>
  <li><strong>İnternet ve telefon:</strong> kıtalararası denizaltı kabloları</li>
  <li><strong>Tıp:</strong> endoskop — vücudun içine ışık götürür, görüntüyü geri getirir</li>
  <li><strong>Sensörler:</strong> köprü ve barajlarda gerilme ölçümü</li>
  <li><strong>Aydınlatma ve süs:</strong> fiber optik lambalar</li>
</ul>`,

/* ---------------------------------------------------------- Formüller */
formuller: {
  liste: [
    { fm: 'n<sub>ç</sub> > n<sub>ö</sub>',           aciklama: 'Fiberin çalışma koşulu' },
    { fm: 'sin θ<sub>s</sub> = n<sub>ö</sub>/n<sub>ç</sub>', aciklama: 'Çekirdek–cam örtü sınır açısı' },
    { fm: 'NA = √(n<sub>ç</sub>² − n<sub>ö</sub>²)',  aciklama: 'Sayısal açıklık' },
    { fm: 'sin θ<sub>kabul</sub> = NA',               aciklama: 'En büyük giriş açısı' },
    { fm: 'sin θ₀ = n<sub>ç</sub>·sin θ<sub>r</sub>', aciklama: 'Uç yüzeyde kırılma' },
    { fm: 'Δt = (L·n<sub>ç</sub>/c)(n<sub>ç</sub>/n<sub>ö</sub> − 1)', aciklama: 'Mod dağılımı gecikmesi' }
  ],
  degiskenler: [
    { sembol: 'n<sub>ç</sub>', ad: 'Çekirdek indisi', birim: '—' },
    { sembol: 'n<sub>ö</sub>', ad: 'Cam örtü indisi',    birim: '—' },
    { sembol: 'NA', ad: 'Sayısal açıklık',            birim: '—' },
    { sembol: 'θ₀', ad: 'Giriş açısı',                birim: '°' },
    { sembol: 'L',  ad: 'Fiber uzunluğu',             birim: 'km' },
    { sembol: 'Δt', ad: 'Gecikme',                    birim: 'ns' }
  ]
},

/* ------------------------------------------------------------ Türetim */
turetim: {
  yollar: [
    {
      ad: 'Sayısal açıklık NA nereden geliyor?',
      adimlar: [
        { baslik: 'Uç yüzeyde kırılma',
          html: `<p>Işın havadan fiberin düz ucuna θ₀ açısıyla girer ve içeride θ_r
                 açısıyla ilerler:</p>
                 <div class="formul" style="max-width:260px">
                   <div class="fm">1 · sin θ₀ = n<sub>ç</sub> · sin θ<sub>r</sub></div>
                 </div>` },

        { baslik: 'Duvara çarpma açısı',
          html: `<p>Çekirdek duvarının normali <strong>eksene diktir</strong>. Işın eksenle
                 θ_r yapıyorsa duvarın normaliyle:</p>
                 <div class="formul" style="max-width:240px">
                   <div class="fm">θ<sub>duvar</sub> = 90° − θ<sub>r</sub></div>
                 </div>` },

        { baslik: 'Tam yansıma koşulu',
          html: `<div class="formul" style="max-width:280px">
                   <div class="fm">90° − θ<sub>r</sub> ≥ θ<sub>s</sub> ⟹ θ<sub>r</sub> ≤ 90° − θ<sub>s</sub></div>
                 </div>
                 <p>En büyük giriş açısı, bu eşitliğin sınırında oluşur.</p>` },

        { baslik: 'Snell’e geri koy',
          html: `<div class="formul" style="max-width:380px">
                   <div class="fm">sin θ₀(maks) = n<sub>ç</sub>·sin(90° − θ<sub>s</sub>) = n<sub>ç</sub>·cos θ<sub>s</sub></div>
                 </div>` },

        { baslik: 'cos θ_s’yi indislerle yaz',
          html: `<p><code>sin θ_s = n_ö/n_ç</code> olduğuna göre:</p>
                 <div class="formul" style="max-width:380px">
                   <div class="fm">cos θ<sub>s</sub> = √(1 − (n<sub>ö</sub>/n<sub>ç</sub>)²) = √(n<sub>ç</sub>² − n<sub>ö</sub>²) / n<sub>ç</sub></div>
                 </div>` },

        { baslik: 'Sadeleşti',
          html: `<div class="formul" style="max-width:340px;border-top-color:var(--accent)">
                   <div class="fm" style="color:var(--accent)">NA = sin θ₀(maks) = √(n<sub>ç</sub>² − n<sub>ö</sub>²)</div>
                 </div>
                 <p>n<sub>ç</sub> sadeleşti — <strong>NA yalnızca iki indisin farkına
                 bağlı</strong>, fiberin kalınlığından bağımsız.</p>
                 <p>Sayısal: <code>√(1,48² − 1,46²) = √0,0588 = 0,2425</code> ⟹
                 θ<sub>kabul</sub> = <strong>14,03°</strong></p>` }
      ]
    },
    {
      ad: 'Mod dağılımı gecikmesi',
      adimlar: [
        { baslik: 'En kısa yol',
          html: `<p>Eksen boyunca giden ışın tam <code>L</code> kadar yol alır. Fiberdeki
                 hız <code>v = c/n_ç</code>:</p>
                 <div class="formul" style="max-width:240px">
                   <div class="fm">t<sub>kısa</sub> = L·n<sub>ç</sub> / c</div>
                 </div>` },

        { baslik: 'En uzun yol',
          html: `<p>Sınır açısında zikzak çizen ışının eksenle yaptığı açı
                 <code>90° − θ_s</code>. Bu ışının kat ettiği yol:</p>
                 <div class="formul" style="max-width:320px">
                   <div class="fm">s = L / cos(90° − θ<sub>s</sub>) = L / sin θ<sub>s</sub> = L·n<sub>ç</sub>/n<sub>ö</sub></div>
                 </div>` },

        { baslik: 'Süresini yaz',
          html: `<div class="formul" style="max-width:300px">
                   <div class="fm">t<sub>uzun</sub> = s·n<sub>ç</sub>/c = L·n<sub>ç</sub>² / (n<sub>ö</sub>·c)</div>
                 </div>` },

        { baslik: 'Farkı al',
          html: `<div class="formul" style="max-width:380px;border-top-color:var(--accent)">
                   <div class="fm" style="color:var(--accent)">Δt = (L·n<sub>ç</sub>/c)·(n<sub>ç</sub>/n<sub>ö</sub> − 1)</div>
                 </div>` },

        { baslik: 'Sayısal',
          html: `<p>L = 10 km, n<sub>ç</sub> = 1,48, n<sub>ö</sub> = 1,46:</p>
                 <table class="degisken-tablo">
                   <thead><tr><th></th><th>Değer</th></tr></thead>
                   <tbody>
                     <tr><td>Eksen ışını</td><td>49,3333 µs</td></tr>
                     <tr><td>En eğik ışın</td><td>50,0091 µs</td></tr>
                     <tr><td><strong>Δt</strong></td><td><strong>675,8 ns</strong></td></tr>
                     <tr><td>Birim uzunlukta</td><td>67,58 ns/km</td></tr>
                   </tbody>
                 </table>
                 <p style="margin-top:10px">Darbeler ayırt edilebilmesi için aralarında en az
                 Δt kadar boşluk olmalı ⟹ en yüksek veri hızı yaklaşık
                 <code>1/(2Δt) = <strong>0,74 Mb/s</strong></code>. Basamak indisli çok modlu
                 fiberin sınırı budur.</p>` }
      ]
    },
    {
      ad: 'Kaç kez yansıyor?',
      adimlar: [
        { baslik: 'Bir zikzak ne kadar sürüyor?',
          html: `<p>Çapı d olan çekirdekte, eksenle θ_r açısı yapan ışın her
                 <code>d/tan θ_r</code> uzunlukta bir kez duvara çarpar.</p>` },

        { baslik: 'Birim uzunluktaki sayı',
          html: `<div class="formul" style="max-width:260px">
                   <div class="fm">N = tan θ<sub>r</sub> / d</div>
                 </div>` },

        { baslik: 'Sayısal',
          html: `<p>d = 50 µm, θ_r = 5,40° (8° ile girmiş ışın):</p>
                 <div class="formul" style="max-width:400px">
                   <div class="fm">N = tan(5,40°)/(50×10⁻⁶) = 0,0945/0,00005 ≈ 1890 /m</div>
                 </div>
                 <p>1 km&rsquo;de yaklaşık <strong>1,9 milyon</strong> yansıma. En eğik
                 ışın için bu sayı <strong>3,3 milyon</strong>&rsquo;a çıkar.</p>` },

        { baslik: 'Neden ışık bitmiyor?',
          html: `<p>Sıradan bir aynada 1,9 milyon yansımadan sonra ışıktan eser kalmazdı
                 (%95&rsquo;lik bir ayna bile <code>0,95^1.900.000 ≈ 0</code> verir).</p>
                 <p><strong>Tam yansımada kayıp yoktur</strong> — ışığın %100&rsquo;ü geri
                 döner. Fiberdeki asıl kayıp yansımalardan değil, camın içindeki
                 <strong>soğurma ve saçılmadan</strong> gelir: yaklaşık
                 <strong>0,2 dB/km</strong>.</p>
                 <p>Bu şu demek: 100 km sonra bile ışığın yaklaşık <strong>%1</strong>&rsquo;i
                 hâlâ ayakta. Bu yüzden denizaltı kablolarında yükselticiler yüzlerce km
                 arayla konur.</p>` }
      ]
    }
  ]
},

/* -------------------------------------------------------- Simülasyon */
sim: F.simler['fiber-optik'],

/* ------------------------------------------------------- Püf noktası */
puf: {
  html: `
    <p><strong>1 · İki farklı açı var, karıştırma.</strong> <em>Sınır açısı</em> (θ_s)
    çekirdek–cam örtü duvarında, <strong>normalden</strong> ölçülür ve büyüktür (~80°).
    <em>Kabul açısı</em> fiberin ucunda, <strong>eksenden</strong> ölçülür ve küçüktür
    (~14°). Sorunun hangisini istediğini ilk cümlede belirle.</p>

    <p><strong>2 · NA fiberin kalınlığından bağımsızdır.</strong> Türetimde n<sub>ç</sub>
    sadeleşiyor. “Kalın fiberin NA&rsquo;sı büyüktür” diyen şık yanlıştır.</p>

    <p><strong>3 · NA formülü fark değil, KARELERİN farkı.</strong>
    <code>√(n_ç² − n_ö²)</code>, <code>n_ç − n_ö</code> değil. Bu, en sık yapılan işlem
    hatasıdır.</p>

    <p><strong>4 · n_ç ≤ n_ö ise fiber çalışmaz.</strong> Sınır açısı yoktur, tam yansıma
    olmaz. Soruda indisler ters verilmişse cevap “ışık tutunmaz”dır.</p>

    <p><strong>5 · Duvara çarpma açısı = 90° − eksenle yapılan açı.</strong> Bu tek
    dönüşüm, fiber sorularının yarısını çözer.</p>

    <p><strong>6 · Tam yansımada kayıp yoktur.</strong> Fiberdeki kayıp soğurma ve
    saçılmadandır, yansımalardan değil. “Milyonlarca yansıma yüzünden ışık zayıflar” diyen
    şık yanlıştır.</p>

    <p><strong>7 · İndisler yakınlaşırsa NA küçülür, gecikme azalır.</strong> İkisi
    <strong>zıt yönde</strong> değişir; fiber tasarımı bu ikisi arasındaki dengedir.</p>

    <p><strong>8 · Fiber elektromanyetik girişimden etkilenmez</strong>, çünkü taşınan şey
    akım değil ışıktır. 2. ünitedeki indüksiyon burada işlemez.</p>`
},

/* ----------------------------------------------------- Zorlayıcı sorular */
osym: [
  {
    baslik: 'Sınır açısı mı kabul açısı mı?',
    kaynak: 'Kavram ayrımı',
    govde: `
      <p>Bir optik fiberin çekirdek indisi <strong>1,50</strong>, cam örtü indisi
      <strong>1,20</strong>&rsquo;dir. Fiber <strong>havada</strong> bulunmaktadır.</p>
      <p>Buna göre:</p>
      <ol style="margin-left:.2em">
        <li>Çekirdek–cam örtü sınır açısı kaç derecedir?</li>
        <li>Fiberin sayısal açıklığı (NA) kaçtır?</li>
        <li>En büyük kabul açısı kaç derecedir?</li>
      </ol>`,
    gorsel: `
      <svg viewBox="0 0 520 200" xmlns="http://www.w3.org/2000/svg" role="img"
           aria-label="Fiberin kabul konisi ve çekirdek duvarındaki sınır açısı">
        <rect width="520" height="200" fill="#0E1726"/>
        <rect x="200" y="62"  width="320" height="76" fill="rgba(60,140,205,.30)"/>
        <rect x="200" y="46"  width="320" height="16" fill="rgba(60,140,205,.14)"/>
        <rect x="200" y="138" width="320" height="16" fill="rgba(60,140,205,.14)"/>
        <line x1="200" y1="62"  x2="520" y2="62"  stroke="#7FD4E6" stroke-width="2"/>
        <line x1="200" y1="138" x2="520" y2="138" stroke="#7FD4E6" stroke-width="2"/>
        <text x="330" y="84"  fill="#EAF0FA" font-size="11" font-family="system-ui">çekirdek n = 1,50</text>
        <text x="330" y="152" fill="#8FB6EC" font-size="11" font-family="system-ui">cam örtü n = 1,20</text>
        <line x1="60" y1="100" x2="520" y2="100" stroke="#4A5F86" stroke-width="1.2" stroke-dasharray="6 5"/>
        <path d="M200 100 L64 54 L64 146 Z" fill="rgba(53,192,138,.18)"/>
        <path d="M64 54 L200 100 M64 146 L200 100" stroke="#35C08A" stroke-width="1.8" stroke-dasharray="6 4"/>
        <text x="110" y="44" fill="#35C08A" font-size="11" font-family="system-ui">kabul konisi</text>
        <path d="M200 100 L280 62" stroke="#FFB020" stroke-width="2.2"/>
        <path d="M280 62 L360 100" stroke="#FFB020" stroke-width="2.2"/>
        <line x1="280" y1="40" x2="280" y2="86" stroke="#4A5F86" stroke-width="1.2" stroke-dasharray="4 4"/>
        <text x="296" y="50" fill="#FFB020" font-size="11" font-family="system-ui">θ_s</text>
      </svg>`,
    secenekler: [
      'θ_s = 53,13° · NA = 0,90 · kabul = 64,16°',
      'θ_s = 53,13° · NA = 0,30 · kabul = 17,46°',
      'θ_s = 36,87° · NA = 0,90 · kabul = 64,16°',
      'θ_s = 53,13° · NA = 0,90 · kabul = 90°',
      'θ_s = 48,59° · NA = 0,75 · kabul = 48,59°'
    ],
    dogru: 0,
    cozum: `
      <p><strong>1. Sınır açısı</strong> — çekirdek–cam örtü sınırında:</p>
      <div class="formul" style="max-width:340px;margin:10px 0">
        <div class="fm">sin θ_s = n_ö/n_ç = 1,20/1,50 = 0,80 ⟹ θ_s = <strong>53,13°</strong></div>
      </div>

      <p><strong>2. Sayısal açıklık:</strong></p>
      <div class="formul" style="max-width:420px;margin:10px 0">
        <div class="fm">NA = √(1,50² − 1,20²) = √(2,25 − 1,44) = √0,81 = <strong>0,90</strong></div>
      </div>

      <p><strong>3. Kabul açısı:</strong></p>
      <div class="formul" style="max-width:320px;margin:10px 0;border-top-color:var(--accent)">
        <div class="fm" style="color:var(--accent)">sin θ_kabul = 0,90 ⟹ θ_kabul = <strong>64,16°</strong></div>
      </div>

      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>B şıkkı</strong> NA&rsquo;yı <code>1,50 − 1,20 = 0,30</code>
        diye hesaplıyor — <strong>kareler farkının kökü</strong> alınmalı.
        <br><strong>C şıkkı</strong> sınır açısını <code>asin(n_ç/n_ö)</code> diye ters
        kuruyor (ve 36,87° tümleyeni veriyor).
        <br><strong>Dikkat edilecek nokta:</strong> Bu fiberin indis farkı gerçek
        fiberlerden çok büyük (0,30 yerine 0,02). Bu yüzden kabul açısı 64° gibi devasa
        çıkıyor. Gerçek telekom fiberinde bu açı 14° civarındadır.
        <br><strong>Kontrol:</strong> NA ≤ 1 olmalıdır — yoksa fiber <em>her açıdan</em>
        ışığı kabul eder demektir ki bu, <code>n_ç² − n_ö² ≥ 1</code> gerektirir. 0,90 ≤ 1 ✓
        <br><strong>Simülasyonda:</strong> n_ç = 1,50, n_ö = 1,20 yap; okumalarda tam bu üç
        sayıyı göreceksin.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: A</strong></p>`
  },
  {
    baslik: 'Fiber hakkında yargılar',
    kaynak: 'Kavram',
    govde: `
      <p>Optik fiberlerle ilgili aşağıdaki yargıları inceleyiniz:</p>
      <ol style="margin-left:.2em">
        <li>Çekirdeğin kırılma indisi cam örtününkinden büyük olmak zorundadır.</li>
        <li>Fiberdeki ışık kaybının başlıca sebebi, milyonlarca kez yansımada
        oluşan enerji kaybıdır.</li>
        <li>Fiber kıvrıldığında ışık dışarı sızmaz, çünkü tam yansıma koşulu her
        noktada sağlanmaya devam eder.</li>
        <li>Sayısal açıklık fiberin çekirdek çapına bağlıdır.</li>
      </ol>
      <p>Hangileri <strong>doğrudur</strong>?</p>`,
    secenekler: [
      'Yalnız I',
      'I ve III',
      'I, II ve III',
      'I ve IV',
      'III ve IV'
    ],
    dogru: 0,
    cozum: `
      <ol>
        <li><strong>Doğru.</strong> n_ç ≤ n_ö olsaydı sınır açısı bulunamaz, tam yansıma
        gerçekleşmezdi.</li>
        <li><strong>Yanlış.</strong> Tam yansımada <strong>hiç kayıp yoktur</strong>;
        ışığın %100&rsquo;ü geri döner. Fiberdeki kayıp camın içindeki
        <strong>soğurma ve saçılmadan</strong> kaynaklanır (~0,2 dB/km).</li>
        <li><strong>Yanlış.</strong> Bu, sınavlarda en çok atlanan ayrıntıdır. Fiber
        <strong>çok keskin</strong> kıvrılırsa duvara çarpma açısı sınır açısının altına
        düşer ve ışık <strong>gerçekten sızar</strong>. Bu yüzden her fiberin bir
        <em>en küçük bükülme yarıçapı</em> vardır (tipik olarak 3 cm). Kablo bu değerin
        altında kıvrılırsa bağlantı zayıflar ya da kopar.</li>
        <li><strong>Yanlış.</strong> Türetimde n_ç sadeleşiyor:
        <code>NA = √(n_ç² − n_ö²)</code>. Çap hiç yok. Çap, NA&rsquo;yı değil taşınabilecek
        <strong>mod sayısını</strong> etkiler.</li>
      </ol>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>III. yargı</strong> bilerek “doğru gibi” yazıldı —
        pek çok kaynak “fiber kıvrılsa da ışık kaçmaz” der. Bu, <em>makul
        kıvrımlar</em> için doğru, <em>keskin</em> kıvrımlar için yanlıştır.
        <br><strong>Kendin gözle:</strong> Bir fiber optik lambanın tellerinden birini
        keskin bir açıyla kıvır — kıvrımın olduğu noktada telin <strong>parladığını</strong>
        görürsün. Kaçan ışık odur.
        <br><strong>Uygulamada:</strong> Bu sızıntı bir kusur olduğu kadar bir
        <em>ölçüm aracıdır</em> da: teknisyenler fiberi hafifçe bükerek sinyalin
        varlığını kabloyu kesmeden test eder.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: A</strong></p>`
  }
],

/* --------------------------------------------- Bağlam temelli sorular */
baglam: [
  {
    baslik: 'İstanbul–New York kablosu',
    govde: `
      <p>Kıtalararası internet, okyanus tabanına döşenen <strong>denizaltı fiber optik
      kablolarıyla</strong> taşınır. İstanbul ile New York arası kablo uzunluğu yaklaşık
      <strong>9000 km</strong>&rsquo;dir.</p>
      <p>Kabloda kullanılan tek modlu fiberin çekirdek indisi <strong>1,468</strong>&rsquo;dir.</p>
      <p><strong>Sinyalin tek yön gecikmesi kaç milisaniyedir? Neden uydu yerine kablo
      tercih ediliyor? Işık boşlukta gitseydi ne kadar sürerdi?</strong></p>`,
    gorsel: `
      <svg viewBox="0 0 520 200" xmlns="http://www.w3.org/2000/svg" role="img"
           aria-label="Denizaltı fiber kablosuyla uydu bağlantısının yol uzunluğu karşılaştırması">
        <rect width="520" height="200" fill="#0E1726"/>
        <path d="M0 140 Q 260 120 520 140 L520 200 L0 200 Z" fill="#14324C"/>
        <path d="M0 140 Q 260 120 520 140" stroke="#7FD4E6" stroke-width="2" fill="none"/>
        <rect x="30" y="118" width="46" height="24" fill="#8A6A44"/>
        <rect x="444" y="118" width="46" height="24" fill="#8A6A44"/>
        <text x="53" y="112" fill="#EAF0FA" font-size="11" font-family="system-ui" text-anchor="middle">İstanbul</text>
        <text x="467" y="112" fill="#EAF0FA" font-size="11" font-family="system-ui" text-anchor="middle">New York</text>
        <path d="M60 148 Q 260 178 460 148" stroke="#35C08A" stroke-width="3" fill="none"/>
        <text x="260" y="194" fill="#35C08A" font-size="11" font-family="system-ui" text-anchor="middle">fiber · 9000 km · ~44 ms</text>
        <circle cx="260" cy="24" r="10" fill="#B8B2A8"/>
        <text x="260" y="14" fill="#B8B2A8" font-size="10" font-family="system-ui" text-anchor="middle">uydu</text>
        <path d="M60 118 L252 30 M268 30 L460 118" stroke="#FF6B6B" stroke-width="1.8" stroke-dasharray="6 4"/>
        <text x="260" y="58" fill="#FF6B6B" font-size="11" font-family="system-ui" text-anchor="middle">GEO uydu · ~240 ms</text>
      </svg>`,
    adimlar: [
      { bas: 'Fiberdeki hızı bul',
        metin: '<code>v = c/n = 3×10⁸ / 1,468 = <strong>2,0436×10⁸ m/s</strong></code>. Işık camda boşluktakinin yaklaşık <strong>üçte ikisi</strong> hızla gider.' },
      { bas: 'Süreyi hesapla',
        metin: '<code>t = 9×10⁶ m / 2,0436×10⁸ = <strong>0,04404 s ≈ 44,0 ms</strong></code>' },
      { bas: 'Gidiş-dönüş',
        metin: 'Bir web isteği gidip gelir: <code>2 × 44 = <strong>88 ms</strong></code>. Gerçek ölçümlerde 90–110 ms çıkar; aradaki fark yönlendiriciler ve kablonun düz olmayan güzergâhıdır.' },
      { bas: 'Boşlukta olsaydı?',
        metin: '<code>9×10⁶ / 3×10⁸ = <strong>30 ms</strong></code>. Fiber, sırf camın içinde olmaktan dolayı <strong>%47 daha yavaş</strong>.' },
      { bas: 'Uydu neden daha kötü?',
        metin: 'Sabit yörünge uydusu (GEO) 36 000 km yükseklikte. Gidiş-dönüş <code>4 × 36 000 km = 144 000 km</code> ⟹ <code>0,48 s</code>. Kabloya göre <strong>beş kat</strong> gecikme. Bu yüzden borsa ve oyun trafiği daima kabloyla taşınır.' },
      { bas: 'Peki neden hâlâ uydu var?',
        metin: 'Kablonun ulaşamadığı yerler: okyanus ortası gemiler, uçaklar, seyrek nüfuslu bölgeler. Ayrıca alçak yörünge (LEO) uyduları 550 km&rsquo;de olduğu için gecikmeleri çok daha düşüktür (~25 ms).' },
      { bas: 'İlginç sonuç',
        metin: 'Boşluktaki ışık, camdaki ışıktan hızlıdır. Bu yüzden bazı finans şirketleri, kısa mesafelerde fiber yerine <strong>havadan mikrodalga</strong> kullanır — hava neredeyse boşluk gibi davrandığı için sinyal birkaç milisaniye önce varır.' }
    ],
    secenekler: [
      'Tek yön ~44 ms; boşlukta 30 ms sürerdi; GEO uydu ~480 ms gidiş-dönüş verdiği için kablo tercih edilir',
      'Tek yön 30 ms; fiberde ışık boşluktaki hızıyla gider',
      'Tek yön 66 ms; uydu her zaman daha hızlıdır',
      'Tek yön 9 ms; mesafenin etkisi yoktur',
      'Hesaplanamaz, çünkü fiberde ışık hızı sabit değildir'
    ],
    dogru: 0,
    cozum: `
      <div class="formul" style="max-width:380px;margin:10px 0;border-top-color:var(--accent)">
        <div class="fm" style="color:var(--accent)">t = L·n/c = (9×10⁶ × 1,468)/(3×10⁸) = 44,0 ms</div>
      </div>
      <p>Bu formülü <code>t = L/v</code> ve <code>v = c/n</code> adımlarından tek satırda
      çıkarabilirsin.</p>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>B şıkkı</strong> kırılma indisini yok sayıyor — fiberdeki
        ışık boşluktakinden <strong>yavaştır</strong>, bu konunun temel bilgisi.
        <br><strong>E şıkkı</strong> yanlış: fiberdeki hız sabittir (v = c/n), değişen şey
        farklı <em>yolların</em> uzunluğudur.
        <br><strong>Kendin ölç:</strong> Bilgisayarda <code>ping</code> komutuyla bir sunucuya
        gidiş-dönüş süresini ölçebilirsin. Yurt dışı bir sunucuya ping atarsan gördüğün
        milisaniyelerin büyük kısmı, tam olarak burada hesapladığımız şeydir — ışığın cam
        içinde geçirdiği süre.
        <br><strong>Fiziksel sınır:</strong> Bu gecikme daha iyi teknolojiyle azaltılamaz;
        ışık hızı bir üst sınırdır. Ancak <em>daha kısa güzergâh</em> döşenerek azaltılabilir —
        yeni kablo projelerinin asıl satış noktası budur.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: A</strong></p>`
  },
  {
    baslik: 'Endoskop: vücudun içini görmek',
    govde: `
      <p>Endoskop, mideyi ya da bağırsağı ameliyatsız incelemeye yarayan esnek bir
      cihazdır. İçinde <strong>iki ayrı fiber demeti</strong> bulunur:</p>
      <ul style="margin-left:.2em">
        <li><strong>Aydınlatma demeti:</strong> dışarıdan içeriye ışık taşır — fiberler
        rastgele dizilebilir</li>
        <li><strong>Görüntü demeti:</strong> içerideki görüntüyü dışarı taşır — fiberler
        <strong>iki uçta da aynı düzende</strong> olmak zorundadır</li>
      </ul>
      <p><strong>Görüntü demetindeki fiberlerin neden düzenli olması gerektiğini açıkla.
      Cihaz kıvrıldığında görüntü neden bozulmuyor?</strong></p>`,
    gorsel: `
      <svg viewBox="0 0 520 200" xmlns="http://www.w3.org/2000/svg" role="img"
           aria-label="Endoskopta düzenli görüntü demeti ile rastgele aydınlatma demetinin karşılaştırılması">
        <rect width="520" height="200" fill="#17223A"/>
        <text x="130" y="24" fill="#35C08A" font-size="12" font-family="system-ui" text-anchor="middle" font-weight="700">DÜZENLİ · görüntü demeti</text>
        <g fill="#35C08A">
          <circle cx="70" cy="60" r="6"/><circle cx="90" cy="60" r="6"/><circle cx="110" cy="60" r="6"/>
          <circle cx="70" cy="80" r="6"/><circle cx="90" cy="80" r="6"/><circle cx="110" cy="80" r="6"/>
          <circle cx="70" cy="100" r="6"/><circle cx="90" cy="100" r="6"/><circle cx="110" cy="100" r="6"/>
        </g>
        <path d="M126 80 Q 170 80 190 80" stroke="#35C08A" stroke-width="2" fill="none"/>
        <g fill="#35C08A">
          <circle cx="206" cy="60" r="6"/><circle cx="226" cy="60" r="6"/><circle cx="246" cy="60" r="6"/>
          <circle cx="206" cy="80" r="6"/><circle cx="226" cy="80" r="6"/><circle cx="246" cy="80" r="6"/>
          <circle cx="206" cy="100" r="6"/><circle cx="226" cy="100" r="6"/><circle cx="246" cy="100" r="6"/>
        </g>
        <text x="158" y="128" fill="#35C08A" font-size="11" font-family="system-ui" text-anchor="middle">aynı düzen ⟹ görüntü korunur</text>
        <line x1="286" y1="14" x2="286" y2="186" stroke="#2E3C57" stroke-width="1.6"/>
        <text x="400" y="24" fill="#FFB020" font-size="12" font-family="system-ui" text-anchor="middle" font-weight="700">RASTGELE · aydınlatma</text>
        <g fill="#FFB020">
          <circle cx="330" cy="60" r="6"/><circle cx="352" cy="74" r="6"/><circle cx="372" cy="58" r="6"/>
          <circle cx="336" cy="88" r="6"/><circle cx="358" cy="100" r="6"/><circle cx="378" cy="84" r="6"/>
        </g>
        <path d="M394 80 Q 430 80 448 80" stroke="#FFB020" stroke-width="2" fill="none"/>
        <circle cx="478" cy="80" r="26" fill="rgba(255,176,32,.35)"/>
        <text x="400" y="140" fill="#FFB020" font-size="11" font-family="system-ui" text-anchor="middle">düzen gerekmez · yalnız ışık taşır</text>
      </svg>`,
    adimlar: [
      { bas: 'Her fiber bir piksel',
        metin: 'Görüntü demetindeki her bir fiber, görüntünün <strong>tek bir noktasını</strong> taşır. Demette 30 000 fiber varsa görüntü 30 000 pikseldir.' },
      { bas: 'Düzen neden şart?',
        metin: 'Bir fiber giriş ucunda sol üstteki noktayı alıyorsa, çıkış ucunda da <strong>sol üstte</strong> olmalıdır. Fiberler karışırsa görüntü karışır — anlamsız bir nokta bulutu çıkar.' },
      { bas: 'Aydınlatmada neden gerekmiyor?',
        metin: 'Aydınlatma demetinin taşıdığı bilgi yok, yalnızca <strong>enerji</strong> var. Işığın hangi fiberden geldiğinin önemi yoktur; bu yüzden ucuz ve rastgele dizilebilir.' },
      { bas: 'Kıvrılınca ne oluyor?',
        metin: 'Her fiber kendi içinde tam yansımayla çalışır ve <strong>komşusundan bağımsızdır</strong>. Demet kıvrıldığında fiberlerin uzunlukları biraz değişir ama <strong>sıraları değişmez</strong> — görüntü korunur.' },
      { bas: 'Sınır nerede?',
        metin: 'Çok keskin kıvrımda duvara çarpma açısı sınır açısının altına düşer ve ışık sızar. Bu yüzden endoskopların en küçük bükülme yarıçapı vardır ve hekimler cihazı zorlamaz.' },
      { bas: 'Çözünürlük sınırı',
        metin: 'Görüntünün netliği fiber sayısıyla sınırlıdır. Daha ince fiber ⟹ daha çok piksel; ama fiber çapı ışığın dalga boyuna (≈0,5 µm) yaklaşınca tam yansıma bozulur. Bu yüzden modern endoskoplarda fiber demeti yerine uca yerleştirilen <strong>minik kamera</strong> tercih edilir.' }
    ],
    secenekler: [
      'Her fiber görüntünün bir noktasını taşıdığı için iki uçta aynı düzende olmalıdır; kıvrılmada fiberlerin sırası değişmediğinden görüntü bozulmaz',
      'Fiberler düzenli olmasa da olur, görüntü nasılsa birleşir',
      'Görüntü demeti kıvrılınca bozulur, bu yüzden endoskoplar esnek değildir',
      'Aydınlatma demetinin düzenli, görüntü demetinin rastgele olması gerekir',
      'İki demet arasında fark yoktur'
    ],
    dogru: 0,
    cozum: `
      <p>Anahtar fikir: <strong>bilgi taşıyan demet düzenli, enerji taşıyan demet rastgele
      olabilir.</strong></p>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>D şıkkı</strong> ikisini yer değiştirmiş — mantığı test
        eden şık budur: bilgi hangi demette taşınıyor?
        <br><strong>Üretim zorluğu:</strong> Düzenli demet üretmek çok daha pahalıdır;
        binlerce fiber ısıtılıp <em>tek parça hâlinde</em> çekilerek sıraları korunur.
        Bir endoskobun fiyatının önemli kısmı bu demettir.
        <br><strong>Fizik bağlantısı:</strong> Her fiberin bağımsız çalışması, tam
        yansımanın <em>yerel</em> bir olay olmasından gelir — ışık yalnızca kendi
        çekirdeğinin duvarını görür, komşu fiberi değil. Cam örtü tam da bunun için vardır:
        fiberler yan yana dizilse ve cam örtü olmasaydı, ışık komşuya sızar ve görüntü
        bulanıklaşırdı.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: A</strong></p>`
  }
]

});
})();
