(function () {
"use strict";
const F = window.F11;

/* ==========================================================================
   topics/u2-alternatif-akim.js
   Konu 2.3.3 · Alternatif akım  (MEB 11, s.253-262)
   ========================================================================== */

F.konuKaydet('u2-alternatif-akim', {

ozet: `Jeneratör sinüs biçiminde gerilim üretiyordu — yani <strong>sürekli yön değiştiren</strong>
bir akım. Prizden gelen elektrik budur. Peki sürekli değişen bir şeye nasıl
“220 volt” diyoruz? Cevap <strong>etkin değer</strong> kavramında ve bu konunun tamamı
onun üzerine kurulu.`,

/* ------------------------------------------------------------- Kavram */
kavram: `
<p>Pilden gelen akım hep aynı yöndedir; buna <strong>doğru akım (DC)</strong> denir.
Jeneratörden gelen akım ise saniyede onlarca kez yön değiştirir; buna
<strong>alternatif akım (AC)</strong> denir.</p>

<div class="formul" style="max-width:340px;margin:14px 0;border-top-color:var(--accent)">
  <div class="fm" style="color:var(--accent)">V(t) = V<sub>maks</sub> · sin(2π·f·t)</div>
  <div class="fm-ad">f: frekans (Hz) · T = 1/f: periyot</div>
</div>

<p>Türkiye şebekesi <strong>50 Hz</strong>&rsquo;dir: gerilim saniyede <strong>50 kez</strong>
tam bir çevrim yapar, yani <strong>100 kez</strong> sıfırdan geçer. Periyot
<code>T = 1/50 = 0,02 s</code>&rsquo;dir.</p>

<h3 style="margin-top:22px">“220 V” neyin değeri?</h3>
<p>Gerilim sürekli değişiyorsa hangi sayıyı yazacağız? Ortalamasını alsak
<strong>sıfır çıkar</strong> — yarısı pozitif, yarısı negatif. Tepe değerini yazsak,
gerilim zamanın çoğunda ondan küçük olduğu için yanıltıcı olur.</p>

<div class="kutu puf" style="margin:16px 0">
  <div class="kutu-bas"><span class="ikon">💡</span><span>Çözüm: ısıtma gücünden tanımla</span></div>
  <p style="margin:0">Şu soruyu sor: <em>“Bu alternatif akım, bir direnci ne kadar
  ısıtıyor? Aynı ısıtmayı yapan DOĞRU akım kaç volt olurdu?”</em>
  İşte o değere <strong>etkin değer</strong> (RMS) denir.</p>
</div>

<div class="formul" style="max-width:320px;margin:14px 0;border-top-color:var(--b5)">
  <div class="fm" style="color:var(--b5)">V<sub>etkin</sub> = V<sub>maks</sub> / √2</div>
  <div class="fm-ad">≈ 0,707 · V<sub>maks</sub></div>
</div>

<table class="degisken-tablo">
  <thead><tr><th>Büyüklük</th><th>Değer</th></tr></thead>
  <tbody>
    <tr><td>Etkin gerilim (yazılan)</td><td class="sembol">220 V</td></tr>
    <tr><td>Tepe gerilim (gerçek en büyük)</td><td class="sembol">220·√2 ≈ 311 V</td></tr>
    <tr><td>Tepeden tepeye</td><td class="sembol">≈ 622 V</td></tr>
  </tbody>
</table>
<p style="margin-top:10px;color:var(--text-2)">Prizdeki gerilim aslında saniyede 100 kez
<strong>311 volta</strong> çıkıyor. Cihazların yalıtımı bu tepe değere göre tasarlanır,
220&rsquo;ye göre değil.</p>

<h3 style="margin-top:22px">Neden √2?</h3>
<p>Isıtma gücü akımın <strong>karesiyle</strong> orantılıdır (<code>P = i²R</code>).
Kare alınınca negatif değerler de pozitife döner — bu yüzden ortalama sıfır çıkmaz.
Sinüsün karesinin ortalaması <strong>tam olarak yarısıdır</strong>. Karekökünü alınca
<code>1/√2</code> çıkar. Adı da buradan gelir: <strong>karekök-ortalama-kare</strong>
(root-mean-square, RMS).</p>

<h3 style="margin-top:22px">Güç hep pozitiftir</h3>
<p>Gerilim ve akım negatif olabilir ama <strong>güç olamaz</strong>:</p>
<div class="formul" style="max-width:260px;margin:14px 0">
  <div class="fm">P = i²·R ≥ 0</div>
</div>
<p>Akım ters yöne aksa da direnç yine ısınır. Simülasyondaki P−t grafiğine bak:
sıfırın altına hiç inmiyor ve <strong>frekansı gerilimin iki katı</strong>. Ampul de
bu yüzden saniyede <strong>100 kez</strong> parlayıp sönüyor — gözümüz bu kadar hızlı
değişimi ayırt edemediği için sabit görünüyor.</p>

<div class="formul" style="max-width:320px;margin:14px 0">
  <div class="fm">P<sub>ort</sub> = V<sub>etkin</sub> · i<sub>etkin</sub></div>
</div>

<h3 style="margin-top:22px">Neden AC kullanıyoruz?</h3>
<p>19. yüzyılın sonunda Edison doğru akımı, Tesla ve Westinghouse alternatif akımı
savundu. AC kazandı ve sebebi tek bir cümleyle özetlenebilir:</p>
<div class="kutu nott" style="margin:16px 0">
  <p style="margin:0"><strong>Alternatif akımın gerilimi transformatörle kolayca
  değiştirilebilir.</strong> Doğru akımda bu mümkün değildir — çünkü transformatör
  <em>değişen</em> akıya ihtiyaç duyar. Bir sonraki konu tamamen budur.</p>
</div>`,

/* ---------------------------------------------------------- Formüller */
formuller: {
  liste: [
    { fm: 'V = V<sub>maks</sub>·sin(2πft)', aciklama: 'Alternatif gerilimin zamana bağlı ifadesi' },
    { fm: 'V<sub>etkin</sub> = V<sub>maks</sub>/√2', aciklama: 'Etkin (RMS) gerilim' },
    { fm: 'i<sub>etkin</sub> = i<sub>maks</sub>/√2', aciklama: 'Etkin akım' },
    { fm: 'T = 1/f',                   aciklama: 'Periyot ile frekans ilişkisi' },
    { fm: 'P<sub>ort</sub> = V<sub>etkin</sub>·i<sub>etkin</sub>', aciklama: 'Ortalama güç' },
    { fm: 'P = i²·R ≥ 0',              aciklama: 'Güç her zaman pozitiftir' }
  ],
  degiskenler: [
    { sembol: 'V<sub>maks</sub>', ad: 'Tepe gerilim', birim: 'V' },
    { sembol: 'V<sub>etkin</sub>', ad: 'Etkin gerilim', birim: 'V' },
    { sembol: 'f', ad: 'Frekans',   birim: 'Hz' },
    { sembol: 'T', ad: 'Periyot',   birim: 's' },
    { sembol: 'P', ad: 'Güç',       birim: 'W' }
  ]
},

/* ------------------------------------------------------------ Türetim */
turetim: {
  yollar: [
    {
      ad: 'Etkin değer neden V/√2?',
      adimlar: [
        { baslik: 'Ortalama gerilim işe yaramaz',
          html: `<p>Sinüsün bir periyottaki ortalaması <strong>sıfırdır</strong>: pozitif
                 yarım ile negatif yarım birbirini götürür. Ama ampul yanıyor, ısıtıcı
                 ısıtıyor — demek ki sıfır doğru ölçüt değil.</p>` },

        { baslik: 'Güce bak, karesi var',
          html: `<p>Isıtma gücü <code>P = i²R</code>&rsquo;dir. <strong>Kare</strong> alındığı
                 için negatif değerler de pozitife döner ve hiçbir şey birbirini götürmez.</p>` },

        { baslik: 'Karenin ortalamasını al',
          html: `<p>Sinüsün karesinin bir periyottaki ortalaması <strong>tam olarak 1/2</strong>
                 çıkar:</p>
                 <div class="formul" style="max-width:260px"><div class="fm">ort(i²) = i²<sub>maks</sub> / 2</div></div>` },

        { baslik: 'Karekök al',
          html: `<p>Akım birimine geri dönmek için karekök alınır:</p>
                 <div class="formul" style="max-width:280px;border-top-color:var(--accent)">
                   <div class="fm" style="color:var(--accent)">i<sub>etkin</sub> = i<sub>maks</sub>/√2</div>
                 </div>
                 <p>Adım adım yaptığımız işlem: <strong>kare al → ortalamasını al →
                 karekökünü al</strong>. Kısaltması RMS.</p>` }
      ]
    },
    {
      ad: 'Güç neden iki kat hızlı titriyor?',
      adimlar: [
        { baslik: 'Gerilimi izle',
          html: `<p>Bir periyotta gerilim: 0 → +tepe → 0 → −tepe → 0.
                 <strong>Bir kez</strong> tam çevrim yapar.</p>` },

        { baslik: 'Gücü izle',
          html: `<p>P = i²R. Akım pozitif tepedeyken güç en büyük. Akım sıfırken güç sıfır.
                 Akım <strong>negatif</strong> tepedeyken güç <strong>yine en büyük</strong> —
                 çünkü kare alınıyor.</p>` },

        { baslik: 'Say',
          html: `<p>Bir gerilim periyodunda güç <strong>iki kez</strong> tepe yapıyor:</p>
                 <div class="formul" style="max-width:240px;border-top-color:var(--accent)">
                   <div class="fm" style="color:var(--accent)">f<sub>güç</sub> = 2 · f<sub>gerilim</sub></div>
                 </div>` },

        { baslik: 'Gerçek hayatta',
          html: `<p>50 Hz şebekede lambaya giden güç saniyede <strong>100 kez</strong> sıfıra iner.
                 Akkor ampulün teli bu kısa sürede soğuyamadığı için ışığı yalnızca birkaç yüzde
                 titrer; zaten gözümüz yaklaşık 25 Hz üstünü ayırt edemez.</p>
                 <p>Ama kamerayla çekersen bu titreşimi görürsün — eski floresan lambaların
                 videolarda titremesinin sebebi budur.</p>` }
      ]
    },
    {
      ad: 'Neden AC kazandı?',
      adimlar: [
        { baslik: 'İletim kaybını yaz',
          html: `<p>Kablolarda kaybedilen güç:</p>
                 <div class="formul" style="max-width:200px"><div class="fm">P<sub>kayıp</sub> = i²·R<sub>kablo</sub></div></div>
                 <p>Kaybı azaltmanın en etkili yolu <strong>akımı küçültmektir</strong> —
                 çünkü karesi alınıyor.</p>` },

        { baslik: 'Akımı nasıl küçültürsün?',
          html: `<p>Taşınan güç <code>P = V·i</code> sabit kalmalı. Akımı küçültmek için
                 <strong>gerilimi büyütmek</strong> gerekir:</p>
                 <div class="formul" style="max-width:260px"><div class="fm">V ↑ 100 kat ⟹ i ↓ 100 kat ⟹ kayıp ↓ 10 000 kat</div></div>` },

        { baslik: 'Ama evde 220 V lazım',
          html: `<p>İletim hattında 400 000 V, evde 220 V olmalı. Yani gerilimi
                 <strong>yükseltip sonra düşürebilmek</strong> gerekiyor.</p>` },

        { baslik: 'İşte AC’nin üstünlüğü',
          html: `<p>Transformatör bunu kolayca yapar — ama yalnızca <strong>değişen</strong>
                 akıyla çalışır. Doğru akımda akı sabittir, transformatör çalışmaz.</p>
                 <div class="formul" style="max-width:320px;border-top-color:var(--accent)">
                   <div class="fm" style="color:var(--accent)">AC ⟹ gerilim değiştirilebilir ⟹ uzağa taşınabilir</div>
                 </div>
                 <p>Edison&rsquo;un DC savaşını kaybetmesinin sebebi tam olarak budur.</p>` }
      ]
    }
  ]
},

/* -------------------------------------------------------- Simülasyon */
sim: F.simler['alternatif-akim'],

/* ------------------------------------------------------- Püf noktası */
puf: {
  html: `
    <p><strong>1 · Verilen değer etkin mi tepe mi?</strong> Soruda “220 V&rsquo;luk şebeke”
    geçiyorsa bu <strong>etkindir</strong>. “Tepe değeri 311 V” denmişse tepedir. Karıştırma:</p>
    <div class="formul" style="max-width:300px;margin:10px 0">
      <div class="fm">V<sub>maks</sub> = V<sub>etkin</sub> · √2 &nbsp;·&nbsp; √2 ≈ 1,41</div>
    </div>

    <p><strong>2 · Güç hesabında DAİMA etkin değer kullan.</strong>
    <code>P = V<sub>etkin</sub>·i<sub>etkin</sub></code>. Tepe değerlerle çarparsan sonucu
    <strong>iki kat</strong> büyük bulursun.</p>

    <p><strong>3 · Ortalama gerilim sıfırdır, ortalama güç sıfır DEĞİLDİR.</strong>
    Bu ikisini ayırt etmek sorulan en temel kavramdır.</p>

    <p><strong>4 · Güç frekansı iki katıdır.</strong> 50 Hz gerilim ⟹ 100 Hz güç ⟹ ampul
    saniyede 100 kez parlar.</p>

    <p><strong>5 · T = 1/f refleks olsun.</strong> 50 Hz ⟹ 0,02 s. 100 Hz ⟹ 0,01 s.
    Grafikten periyot okunup frekans istenebilir.</p>

    <p><strong>6 · AC ile DC’nin farkını sayabil:</strong></p>
    <table class="degisken-tablo" style="margin-top:8px">
      <thead><tr><th></th><th>DC (pil)</th><th>AC (priz)</th></tr></thead>
      <tbody>
        <tr><td>Yön</td><td>sabit</td><td>değişken</td></tr>
        <tr><td>Gerilim</td><td>sabit</td><td>sinüs</td></tr>
        <tr><td>Transformatör</td><td class="sembol">çalışmaz</td><td class="sembol">çalışır</td></tr>
        <tr><td>Uzağa taşıma</td><td>zor</td><td>kolay</td></tr>
      </tbody>
    </table>

    <p style="margin-top:14px"><strong>7 · Isıtıcı, ampul, fırın gibi cihazlarda AC ile DC
    farkı yoktur</strong> — ikisi de aynı ısıyı verir (etkin değer eşitse). Fark, motor ve
    elektronik cihazlarda ortaya çıkar.</p>`
},

/* ----------------------------------------------------- Zorlayıcı sorular */
osym: [
  {
    baslik: 'Etkin mi, tepe mi?',
    kaynak: 'Bir numaralı tuzak',
    govde: `
      <p><strong>220 V</strong>&rsquo;luk şebekeye, direnci <strong>44 Ω</strong> olan bir
      ısıtıcı bağlanıyor.</p>
      <p>Buna göre ısıtıcıdan geçen <strong>etkin akım</strong> ve harcanan
      <strong>ortalama güç</strong> nedir? (√2 ≈ 1,41)</p>`,
    secenekler: [
      'i = 5 A · P = 1100 W',
      'i = 7,05 A · P = 2200 W',
      'i = 5 A · P = 1555 W',
      'i = 7,05 A · P = 1100 W',
      'i = 3,54 A · P = 778 W'
    ],
    dogru: 0,
    cozum: `
      <p><strong>Adım 1 — Verilen değer hangisi?</strong> “220 V&rsquo;luk şebeke” ifadesi
      <strong>etkin</strong> değeri gösterir. Ekstra bir çevrim yapmaya gerek yok.</p>
      <p><strong>Adım 2 — Etkin akım.</strong> Ohm yasası etkin değerlerle doğrudan çalışır:</p>
      <div class="formul" style="max-width:280px;margin:10px 0">
        <div class="fm">i<sub>etkin</sub> = V<sub>etkin</sub>/R = 220/44 = <strong>5 A</strong></div>
      </div>
      <p><strong>Adım 3 — Ortalama güç.</strong></p>
      <div class="formul" style="max-width:320px;margin:10px 0;border-top-color:var(--accent)">
        <div class="fm" style="color:var(--accent)">P = V<sub>etkin</sub>·i<sub>etkin</sub> = 220 · 5 = 1100 W</div>
      </div>
      <p><strong>Sağlama:</strong> P = V²/R = 48 400/44 = 1100 W ✓</p>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>B şıkkı</strong> 220&rsquo;yi tepe sanıp √2 ile
        <em>çarpanlar</em> için: 311/44 = 7,05 ve güç iki katı. En kalabalık yanlış budur.
        <br><strong>E şıkkı</strong> ise 220&rsquo;yi tepe sanıp √2&rsquo;ye <em>bölenler</em> için.
        <br><strong>Kalıcı kural:</strong> Şebeke değerleri <strong>her zaman etkindir</strong>.
        Cihaz etiketlerindeki “230 V, 2000 W” gibi bilgiler de etkin değerlerdir.
        Ohm yasası ve güç formülleri etkin değerlerle <em>doğrudan</em> çalışır.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: A</strong></p>`
  },
  {
    baslik: 'Grafikten okuma',
    kaynak: 'Grafik yorumu',
    govde: `
      <p>Bir alternatif gerilim kaynağının gerilim-zaman grafiği aşağıda verilmiştir.</p>
      <p>Buna göre kaynağın <strong>frekansı</strong> ve <strong>etkin gerilimi</strong>
      nedir? (√2 ≈ 1,41)</p>`,
    gorsel: `
      <svg viewBox="0 0 520 210" xmlns="http://www.w3.org/2000/svg" role="img"
           aria-label="Tepe değeri yüz kırk bir volt ve periyodu kırk milisaniye olan sinüs gerilim grafiği">
        <rect width="520" height="210" fill="#0E1726"/>
        <path d="M60 105 H490" stroke="#4A5F86" stroke-width="1.6"/>
        <path d="M60 24 V186" stroke="#4A5F86" stroke-width="1.6"/>
        <path d="M60 105 q 27 -70 54 0 q 27 70 54 0 q 27 -70 54 0 q 27 70 54 0 q 27 -70 54 0 q 27 70 54 0"
              stroke="#38D6E0" stroke-width="2.8" fill="none"/>
        <path d="M60 39 H490" stroke="#FFB020" stroke-width="1" stroke-dasharray="4 5"/>
        <path d="M60 171 H490" stroke="#FFB020" stroke-width="1" stroke-dasharray="4 5"/>
        <text x="50" y="43" fill="#FFB020" font-size="12" font-family="system-ui" text-anchor="end">+141</text>
        <text x="50" y="175" fill="#FFB020" font-size="12" font-family="system-ui" text-anchor="end">−141</text>
        <text x="46" y="109" fill="#6F84A8" font-size="11" font-family="system-ui" text-anchor="end">0</text>
        <path d="M60 196 H168" stroke="#35C08A" stroke-width="1.6"/>
        <path d="M60 192 V200 M168 192 V200" stroke="#35C08A" stroke-width="1.6"/>
        <text x="114" y="190" fill="#35C08A" font-size="11" font-family="system-ui" text-anchor="middle">T = 40 ms</text>
        <text x="500" y="120" fill="#6F84A8" font-size="11" font-family="system-ui">t</text>
        <text x="66" y="20" fill="#6F84A8" font-size="11" font-family="system-ui">V (volt)</text>
      </svg>`,
    secenekler: [
      'f = 25 Hz · V_etkin = 100 V',
      'f = 40 Hz · V_etkin = 100 V',
      'f = 25 Hz · V_etkin = 141 V',
      'f = 25 Hz · V_etkin = 199 V',
      'f = 50 Hz · V_etkin = 100 V'
    ],
    dogru: 0,
    cozum: `
      <p><strong>Frekans:</strong> Grafikten periyot okunuyor:</p>
      <p>T = 40 ms = 0,040 s</p>
      <div class="formul" style="max-width:260px;margin:10px 0">
        <div class="fm">f = 1/T = 1/0,040 = <strong>25 Hz</strong></div>
      </div>
      <p><strong>Etkin gerilim:</strong> Grafikteki 141 V <strong>tepe</strong> değeridir
      (eğrinin en üst noktası):</p>
      <div class="formul" style="max-width:300px;margin:10px 0;border-top-color:var(--accent)">
        <div class="fm" style="color:var(--accent)">V<sub>etkin</sub> = 141 / 1,41 = 100 V</div>
      </div>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>B şıkkı</strong> periyodu milisaniye cinsinden bırakıp
        40&rsquo;ı doğrudan frekans sanıyor.
        <br><strong>C şıkkı</strong> tepe değerini etkin sanıyor.
        <br><strong>D şıkkı</strong> √2 ile bölmek yerine <em>çarpıyor</em> (141·1,41 = 199).
        <br><strong>Grafik okuma kuralı:</strong> Eğrinin <strong>tepesi V_maks</strong>&rsquo;tır,
        etkin değer grafikte <em>görünmez</em> — hesaplanır. Periyot, eğrinin kendini
        tekrarladığı en kısa süredir; iki tepe arası ya da üç ardışık sıfırdan geçiş.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: A</strong></p>`
  }
],

/* --------------------------------------------- Bağlam temelli sorular */
baglam: [
  {
    baslik: 'Kamerada neden titriyor?',
    govde: `
      <p>Telefonunla eski bir floresan lambayı ya da bazı LED aydınlatmaları çekersen
      görüntüde <strong>titreme veya bantlar</strong> oluşur. Gözünle baktığında ise
      lamba <strong>sabit</strong> yanıyor gibi görünür.</p>
      <p>Aynı şekilde, televizyonda dönen bir tekerlek bazen <strong>geri dönüyormuş</strong>
      gibi görünür.</p>
      <p>Bir öğrenci soruyor: <em>“Lamba ya yanar ya söner. Gözüm görmediği bir şeyi kamera
      nasıl görüyor?”</em></p>
      <p><strong>50 Hz şebekede ampul saniyede kaç kez parlar? Gözün neden fark etmiyor?</strong></p>`,
    gorsel: `
      <svg viewBox="0 0 520 200" xmlns="http://www.w3.org/2000/svg" role="img"
           aria-label="Gerilim sinüsü ve gücün iki kat frekansla titreşmesi">
        <rect width="520" height="200" fill="#17223A"/>
        <text x="20" y="28" fill="#38D6E0" font-size="12" font-family="system-ui">V — 50 Hz</text>
        <path d="M20 60 q 25 -30 50 0 q 25 30 50 0 q 25 -30 50 0 q 25 30 50 0 q 25 -30 50 0 q 25 30 50 0"
              stroke="#38D6E0" stroke-width="2.4" fill="none"/>
        <path d="M20 60 H500" stroke="#4A5F86" stroke-width="1"/>
        <text x="20" y="116" fill="#FF6B6B" font-size="12" font-family="system-ui">P — 100 Hz (hep pozitif)</text>
        <path d="M20 170 q 12 -40 25 0 q 12 40 25 0 q 12 -40 25 0 q 12 40 25 0 q 12 -40 25 0 q 12 40 25 0 q 12 -40 25 0 q 12 40 25 0 q 12 -40 25 0 q 12 40 25 0 q 12 -40 25 0 q 12 40 25 0"
              stroke="#FF6B6B" stroke-width="2.4" fill="none"/>
        <path d="M20 170 H500" stroke="#4A5F86" stroke-width="1"/>
        <g fill="#FFD24A">
          <circle cx="45" cy="186" r="5"/><circle cx="95" cy="186" r="5"/>
          <circle cx="145" cy="186" r="5"/><circle cx="195" cy="186" r="5"/>
        </g>
        <text x="300" y="192" fill="#FFD24A" font-size="11" font-family="system-ui">her tepe = bir parlama</text>
      </svg>`,
    adimlar: [
      { bas: 'Gerilimin frekansı',
        metin: 'Şebeke 50 Hz: gerilim saniyede <strong>50 tam çevrim</strong> yapar.' },
      { bas: 'Gücün frekansı',
        metin: 'Güç <code>P = i²R</code> ile kare alındığı için negatif yarım da pozitife döner. Bir gerilim çevriminde güç <strong>iki kez</strong> tepe yapar ⟹ <strong>100 Hz</strong>.' },
      { bas: 'Parlama sayısı',
        metin: 'Lambaya giden güç saniyede <strong>100 kez</strong> sıfıra iner. (Akkor ampullerde tel ısısını koruduğu için ışıktaki titreşim çok zayıftır; floresan ve bazı LED’lerde belirgindir.)' },
      { bas: 'Göz neden görmüyor?',
        metin: 'İnsan gözü yaklaşık <strong>25 Hz</strong>’in üstündeki değişimleri ayrı ayrı algılayamaz; gördüğünü <strong>ortalar</strong>. 100 Hz bu sınırın çok üstünde olduğu için lamba sabit görünür.' },
      { bas: 'Kamera neden görüyor?',
        metin: 'Kamera saniyede belirli sayıda (örneğin 30 ya da 60) kare çeker. Kare hızı ile 100 Hz titreşim <strong>uyuşmazsa</strong>, her kare parlamanın farklı bir anına denk gelir ve görüntüde titreme oluşur.' },
      { bas: 'Tekerlek neden geri dönüyor?',
        metin: 'Aynı olgu: buna <strong>stroboskobik etki</strong> denir. Tekerlek her karede bir öncekinden biraz <em>geride</em> görünecek kadar dönmüşse, göz onu geriye dönüyor sanır.' }
    ],
    secenekler: [
      'Saniyede 100 kez parlar; göz 25 Hz üstünü ortaladığı için sabit görür, kamera ise kare hızı uyuşmadığından titremeyi yakalar',
      'Saniyede 50 kez parlar; kamera daha hassas olduğu için görür',
      'Lamba hiç sönmez; titreme kameranın kusurudur',
      'Saniyede 100 kez parlar; göz de aslında görür ama beyin yok sayar',
      'Titreme lambanın bozuk olmasından kaynaklanır'
    ],
    dogru: 0,
    cozum: `
      <p><strong>f_güç = 2 · f_gerilim = 100 Hz</strong> ⟹ saniyede 100 parlama.</p>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>B şıkkı</strong> gücün frekansının iki kat olduğunu
        kaçırıyor — bu konunun en ayırt edici ayrıntısıdır.
        <br><strong>Pratik sonuç:</strong> Sinema ve televizyon çekimlerinde bu yüzden
        <em>flicker-free</em> aydınlatma kullanılır. Ayrıca sanayide dönen makinelerin
        yanında floresan aydınlatma <strong>tehlikelidir</strong>: stroboskobik etki
        yüzünden hızla dönen bir mil <em>duruyormuş</em> gibi görünebilir.
        <br><strong>Simülasyonda gör:</strong> P−t grafiğinin V−t grafiğinden iki kat sık
        olduğunu ve sıfırın altına hiç inmediğini incele.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: A</strong></p>`
  },
  {
    baslik: 'Neden yüksek gerilimle taşınıyor?',
    govde: `
      <p>Şehirlerarası elektrik hatlarında gerilim <strong>154 000 V</strong> ya da
      <strong>400 000 V</strong>&rsquo;tur. Evine gelen ise <strong>220 V</strong>.
      Elektrik neden bu kadar yüksek gerilimle taşınıyor?</p>
      <p>Bir santral <strong>1 MW</strong> (1 000 000 W) güç göndersin. Hattın toplam direnci
      <strong>10 Ω</strong> olsun. İki seçeneği karşılaştıralım:</p>
      <ul>
        <li><strong>A:</strong> 1000 V ile taşımak</li>
        <li><strong>B:</strong> 100 000 V ile taşımak</li>
      </ul>
      <p><strong>Her iki durumda kabloda kaybedilen gücü hesapla ve yorumla.</strong></p>`,
      gorsel: `
      <svg viewBox="0 0 520 200" xmlns="http://www.w3.org/2000/svg" role="img"
           aria-label="Aynı gücün düşük ve yüksek gerilimle taşınmasında kablo kayıplarının karşılaştırması">
        <rect width="520" height="200" fill="#17223A"/>
        <rect x="14" y="60" width="60" height="80" rx="6" fill="#5F6B78"/>
        <text x="44" y="156" fill="#EAF0FA" font-size="11" font-family="system-ui" text-anchor="middle">santral</text>
        <path d="M74 84 H446" stroke="#B87333" stroke-width="4"/>
        <path d="M74 116 H446" stroke="#B87333" stroke-width="4"/>
        <rect x="446" y="60" width="60" height="80" rx="6" fill="#2E3D57"/>
        <text x="476" y="156" fill="#EAF0FA" font-size="11" font-family="system-ui" text-anchor="middle">şehir</text>
        <text x="260" y="44" fill="#FF6B6B" font-size="12" font-family="system-ui" text-anchor="middle">A · 1000 V ⟹ i = 1000 A ⟹ kayıp 10 MW (!)</text>
        <text x="260" y="182" fill="#35C08A" font-size="12" font-family="system-ui" text-anchor="middle">B · 100 000 V ⟹ i = 10 A ⟹ kayıp 1000 W</text>
        <text x="260" y="106" fill="#6F84A8" font-size="11" font-family="system-ui" text-anchor="middle">R_kablo = 10 Ω</text>
      </svg>`,
    adimlar: [
      { bas: 'Akımı bul — A seçeneği',
        metin: 'P = V·i ⟹ i = P/V = 1 000 000 / 1000 = <strong>1000 A</strong>' },
      { bas: 'Kaybı hesapla — A',
        metin: 'P_kayıp = i²·R = 1000² · 10 = 1 000 000 · 10 = <strong>10 000 000 W = 10 MW</strong><br>Gönderilen güç 1 MW, kayıp 10 MW. <strong>İmkânsız</strong> — enerji zaten hatta yetmiyor, kablo erirdi.' },
      { bas: 'Akımı bul — B seçeneği',
        metin: 'i = 1 000 000 / 100 000 = <strong>10 A</strong>' },
      { bas: 'Kaybı hesapla — B',
        metin: 'P_kayıp = 10² · 10 = <strong>1000 W</strong><br>Yani gönderilen gücün yalnızca <strong>binde biri</strong>.' },
      { bas: 'Oranı yorumla',
        metin: 'Gerilim <strong>100 kat</strong> arttı ⟹ akım <strong>100 kat</strong> azaldı ⟹ kayıp <strong>10 000 kat</strong> azaldı. Çünkü kayıp akımın <strong>karesiyle</strong> orantılı.' },
      { bas: 'Peki neden eve 220 V geliyor?',
        metin: '100 000 V evde ölümcül ve kullanılamaz olurdu. Bu yüzden gerilim şehir girişinde ve mahalle trafolarında kademeli olarak düşürülür. Yükseltip sonra düşürebilmek, <strong>alternatif akım sayesinde</strong> mümkündür — bir sonraki konunun tamamı budur.' }
    ],
    secenekler: [
      'A’da kayıp 10 MW (taşınamaz), B’de 1000 W; kayıp i² ile orantılı olduğu için gerilim yükseltilir',
      'A’da kayıp 1000 W, B’de 10 MW; düşük gerilim daha verimlidir',
      'İki durumda da kayıp aynıdır, gerilim yalnızca güvenlik için değiştirilir',
      'A’da kayıp 100 kat fazladır',
      'Kayıp gerilimle doğru orantılıdır, bu yüzden düşük gerilim tercih edilir'
    ],
    dogru: 0,
    cozum: `
      <table class="degisken-tablo">
        <thead><tr><th></th><th>Gerilim</th><th>Akım</th><th>Kayıp (i²R)</th></tr></thead>
        <tbody>
          <tr><td>A</td><td class="sembol">1 000 V</td><td class="sembol">1000 A</td><td class="sembol" style="color:var(--red)">10 MW</td></tr>
          <tr><td>B</td><td class="sembol">100 000 V</td><td class="sembol">10 A</td><td class="sembol" style="color:var(--green)">1000 W</td></tr>
        </tbody>
      </table>
      <div class="formul" style="max-width:320px;margin:12px 0;border-top-color:var(--accent)">
        <div class="fm" style="color:var(--accent)">V ×100 ⟹ i ÷100 ⟹ kayıp ÷10 000</div>
      </div>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>D şıkkı</strong> oranı doğrusal sanıyor — kaybı belirleyen
        akımın <em>karesidir</em>, bu yüzden 100 değil <strong>10 000</strong> kat fark var.
        <br><strong>Türkiye’de:</strong> İletim hatları 154 kV ve 400 kV, dağıtım 34,5 kV,
        mahalle trafosundan çıkış 400/230 V. Her kademede bir transformatör var.
        <br><strong>Bu soru aslında bir sonraki konunun gerekçesidir:</strong> Gerilimi
        yükseltip düşürebilmek zorunluluktur — ve bunu yapan cihaz transformatördür.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: A</strong></p>`
  }
]

});
})();
