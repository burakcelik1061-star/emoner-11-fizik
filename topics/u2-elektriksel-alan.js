(function () {
"use strict";
const F = window.F11;

/* ==========================================================================
   topics/u2-elektriksel-alan.js
   Konu 2.2 · Elektriksel alan
   ========================================================================== */

F.konuKaydet('u2-elektriksel-alan', {

ozet: `Coulomb yasası “iki yük birbirine kuvvet uygular” der ama bir soru bırakır: yükler
birbirine <em>değmiyorken</em> bu kuvveti nasıl iletiyorlar? Cevap
<strong>alan</strong>dır: yük, çevresindeki uzayı değiştirir. Oraya başka bir yük
gelirse kuvveti hisseder. Alan, yük gelmese bile <strong>oradadır</strong>.`,

/* ------------------------------------------------------------- Kavram */
kavram: `
<p>Bir yükün çevresindeki her noktaya bir <strong>vektör</strong> iliştirdiğimizi düşün:
“buraya <strong>+1 C</strong>&rsquo;luk bir yük koysaydım, ona şu yönde şu büyüklükte
kuvvet etkirdi.” İşte bu vektör alanı, <strong>elektriksel alan</strong>dır.</p>

<div class="formul" style="max-width:300px;margin:14px 0;border-top-color:var(--accent)">
  <div class="fm" style="color:var(--accent)">E = F / q₀</div>
  <div class="fm-ad">Birim yüke düşen kuvvet · birimi N/C</div>
</div>

<div class="kutu dikkat" style="margin:16px 0">
  <div class="kutu-bas"><span class="ikon">⚠</span><span>Bu konunun bir numaralı tuzağı</span></div>
  <p style="margin:0"><strong>E, test yüküne bağlı değildir.</strong> Formülde q₀ paydada
  görünüyor diye “q₀ büyürse E küçülür” sanma. q₀ büyüyünce F de aynı oranda büyür,
  bölüm değişmez. Alanı yaratan <strong>kaynak yüktür</strong>; test yükü onu yalnızca
  <em>ölçmeye</em> yarar. Simülasyonda q₀ kaydırıcısını oynat: <strong>E sabit kalır,
  yalnız F değişir.</strong></p>
</div>

<h3 style="margin-top:22px">Nokta yükün alanı</h3>
<p>Coulomb yasasını tanımda yerine koyarsak test yükü sadeleşir:</p>
<div class="formul" style="max-width:320px;margin:14px 0">
  <div class="fm">E = k · |q| / d²</div>
  <div class="fm-ad">Alan da ters kare ile azalır</div>
</div>
<p>Yönü: <strong>pozitif</strong> kaynak yükten <strong>dışa</strong>, <strong>negatif</strong>
kaynak yüke <strong>içe</strong> doğrudur. Bunu hatırlamanın kolay yolu: alanın yönü, oraya
konan <em>pozitif</em> bir yükün itileceği yöndür.</p>

<h3 style="margin-top:22px">Alan çizgileri</h3>
<p>Alan görünmez olduğu için onu <strong>çizgilerle</strong> resmederiz. Kuralları katıdır:</p>
<ul>
  <li>Pozitif yükten <strong>çıkar</strong>, negatif yüke <strong>girer</strong></li>
  <li><strong>Asla kesişmezler</strong> — kesişselerdi o noktada alanın iki yönü olurdu, bu imkânsızdır</li>
  <li><strong>Sıklıkları</strong> alanın şiddetini gösterir: çizgiler sıksa alan güçlüdür</li>
  <li>İletken yüzeye daima <strong>dik</strong> çıkarlar</li>
  <li>Bir noktadaki alan vektörü, çizgiye o noktada <strong>teğettir</strong></li>
</ul>

<h3 style="margin-top:22px">Birden çok yük: süperpozisyon</h3>
<p>Her yük kendi alanını yaratır; toplam alan bunların <strong>vektörel toplamıdır</strong>.
Sayısal toplama değil — yönler önemlidir.</p>
<table class="degisken-tablo">
  <thead><tr><th>Durum</th><th>Tam ortada alan</th><th>Sebep</th></tr></thead>
  <tbody>
    <tr><td>Aynı işaretli iki eşit yük</td><td class="sembol">E = 0</td><td>alanlar zıt yönde, eşit büyüklükte</td></tr>
    <tr><td>Zıt işaretli iki eşit yük</td><td class="sembol">E = 2E₁</td><td>alanlar aynı yönde, toplanır</td></tr>
  </tbody>
</table>
<p style="margin-top:10px;color:var(--text-2)">Dikkat: <strong>kuvvet</strong> için nötr nokta
aynı işaretlilerde <em>arada</em>, zıt işaretlilerde <em>dışarıdaydı</em>. <strong>Alan</strong>
için de kural birebir aynıdır — çünkü alan zaten kuvvetin yüke bölünmüşüdür.</p>

<h3 style="margin-top:22px">Düzgün alan: paralel levhalar</h3>
<p>Zıt yüklü iki paralel levha arasında alan, kenarlar hariç <strong>her noktada aynıdır</strong>:
aynı büyüklük, aynı yön. Çizgiler eşit aralıklı ve paraleldir.</p>
<div class="formul" style="max-width:280px;margin:14px 0;border-top-color:var(--accent)">
  <div class="fm" style="color:var(--accent)">E = V / d</div>
  <div class="fm-ad">V: levhalar arası gerilim · d: aralık</div>
</div>
<p>Bu formül alanın ikinci birimini de verir: <code>N/C = V/m</code>. İkisi aynı şeydir,
soruda hangisi geçerse geçsin aynı büyüklüktür.</p>

<div class="kutu puf" style="margin:16px 0">
  <div class="kutu-bas"><span class="ikon">🔗</span><span>1. ünite buraya bağlanıyor</span></div>
  <p style="margin:0">Düzgün alana yatay giren yüklü bir zerre <strong>parabol</strong> çizer.
  Sebep basit: kuvvet sabit ⟹ ivme sabit ⟹ bu, <strong>yatay atışın birebir aynısıdır</strong>.
  Tek fark, <code>g</code> yerine <code>a = qE/m</code> olmasıdır. Formülleri yeniden
  öğrenmene gerek yok:</p>
  <div class="formul" style="max-width:300px;margin:12px 0">
    <div class="fm">x = ϑ₀·t &nbsp;&nbsp; y = ½·a·t²</div>
  </div>
  <p style="margin:0">Simülasyonda üçüncü düzeneği seç ve sağdaki paneli izle — aynı parabol.</p>
</div>

<h3 style="margin-top:22px">İletkenin içinde alan sıfırdır</h3>
<p>Bir iletkene yük verilirse, yükler birbirini iterek <strong>dış yüzeye</strong> kaçar ve
denge kurulunca <strong>iletkenin içinde alan sıfır olur</strong>. Bu sonuç bir sonraki
konunun (Faraday kafesi) tamamıdır.</p>`,

/* ---------------------------------------------------------- Formüller */
formuller: {
  liste: [
    { fm: 'E = F / q₀',        aciklama: 'Tanım — birim yüke düşen kuvvet' },
    { fm: 'F = q · E',         aciklama: 'Alandaki yüke etkiyen kuvvet' },
    { fm: 'E = k · |q| / d²',  aciklama: 'Nokta yükün alanı — ters kare' },
    { fm: 'E = V / d',         aciklama: 'Paralel levhalar arasında düzgün alan' },
    { fm: 'N/C = V/m',         aciklama: 'Alanın iki eşdeğer birimi' },
    { fm: 'a = q·E / m',       aciklama: 'Düzgün alandaki yüklü zerrenin ivmesi — sabittir' }
  ],
  degiskenler: [
    { sembol: 'E',  ad: 'Elektriksel alan',   birim: 'N/C = V/m' },
    { sembol: 'F',  ad: 'Kuvvet',             birim: 'N' },
    { sembol: 'q₀', ad: 'Test yükü',          birim: 'C' },
    { sembol: 'q',  ad: 'Kaynak yük',         birim: 'C' },
    { sembol: 'V',  ad: 'Levhalar arası gerilim', birim: 'V' },
    { sembol: 'd',  ad: 'Uzaklık / levha aralığı', birim: 'm' }
  ]
},

/* ------------------------------------------------------------ Türetim */
turetim: {
  yollar: [
    {
      ad: 'Alan kavramı neden gerekli?',
      adimlar: [
        { baslik: 'Sorunu gör',
          html: `<p>Coulomb yasası kuvveti verir ama kuvvet <strong>iki yüke birden</strong>
                 bağlıdır. “Şu noktada ne var?” diye sorduğunda cevap veremezsin — çünkü
                 oraya hangi yükü koyacağını bilmiyorsun.</p>` },

        { baslik: 'Test yükünden kurtul',
          html: `<p>Oraya bir <strong>q₀</strong> koy, kuvveti ölç, sonra q₀&rsquo;a böl:</p>
                 <div class="formul" style="max-width:220px"><div class="fm">E = F / q₀</div></div>
                 <p>q₀&rsquo;ı iki katına çıkarırsan F de iki katına çıkar; bölüm
                 <strong>değişmez</strong>. Elde kalan şey artık test yükünden bağımsızdır.</p>` },

        { baslik: 'Nokta yük için açık hâlini bul',
          html: `<p>Coulomb kuvvetini yerine koy:</p>
                 <p>E = (k·q·q₀ / d²) / q₀</p>
                 <div class="formul" style="max-width:240px;border-top-color:var(--accent)">
                   <div class="fm" style="color:var(--accent)">E = k·q / d²</div>
                 </div>
                 <p>q₀ sadeleşti. Bu, alanın <strong>yalnızca kaynağa ait</strong> olduğunun
                 cebirsel kanıtıdır.</p>` }
      ]
    },
    {
      ad: 'Düzgün alanda E = V/d',
      adimlar: [
        { baslik: 'Yükü bir levhadan diğerine taşı',
          html: `<p>q yükünü, aralığı d olan levhalar arasında sabit E alanına karşı taşıyalım.
                 Alan sabit olduğu için kuvvet de sabittir:</p>
                 <div class="formul" style="max-width:200px"><div class="fm">F = q·E</div></div>` },

        { baslik: 'Yapılan işi yaz',
          html: `<p>Sabit kuvvetle d yolu boyunca yapılan iş:</p>
                 <div class="formul" style="max-width:240px"><div class="fm">W = F·d = q·E·d</div></div>` },

        { baslik: 'Gerilimin tanımını kullan',
          html: `<p>Gerilim, birim yükü taşımak için yapılan iştir:</p>
                 <div class="formul" style="max-width:200px"><div class="fm">V = W / q</div></div>
                 <p>Buradan <code>W = q·V</code>.</p>` },

        { baslik: 'İki ifadeyi eşitle',
          html: `<p>q·V = q·E·d &nbsp;⟹&nbsp; q sadeleşir:</p>
                 <div class="formul" style="max-width:220px;border-top-color:var(--accent)">
                   <div class="fm" style="color:var(--accent)">V = E·d &nbsp;⟹&nbsp; E = V/d</div>
                 </div>
                 <p>Birimlerin neden hem N/C hem V/m olduğu da buradan görülür.</p>` }
      ]
    },
    {
      ad: 'Levhalar arasında parabol',
      adimlar: [
        { baslik: 'Kuvveti bul',
          html: `<p>Zerre levhalar arasına <strong>yatay</strong> girsin. Üzerine tek kuvvet
                 etkir ve bu kuvvet <strong>sabittir</strong>:</p>
                 <div class="formul" style="max-width:240px"><div class="fm">F = q·E = q·V/d</div></div>
                 <p>(Zerrenin ağırlığı bu ölçekte genelde ihmal edilir.)</p>` },

        { baslik: 'İvmeyi bul',
          html: `<p>Newton II:</p>
                 <div class="formul" style="max-width:240px"><div class="fm">a = F/m = q·E / m</div></div>
                 <p>Sabit kuvvet ⟹ <strong>sabit ivme</strong>. Bu cümle her şeyi çözer.</p>` },

        { baslik: 'Hareketi ikiye ayır',
          html: `<p>Yatayda kuvvet yok ⟹ sabit hız. Düşeyde sabit ivme:</p>
                 <div class="formul" style="max-width:300px"><div class="fm">x = ϑ₀·t &nbsp;&nbsp; y = ½·a·t²</div></div>
                 <p><strong>Bu, 1. ünitedeki yatay atışın aynısıdır.</strong></p>` },

        { baslik: 'Sapmayı tek formülde topla',
          html: `<p>Levha uzunluğu L ise zerre içeride <code>t = L/ϑ₀</code> kadar kalır.
                 Yerine koy:</p>
                 <div class="formul" style="max-width:320px;border-top-color:var(--accent)">
                   <div class="fm" style="color:var(--accent)">y = ½ · (qV/md) · (L/ϑ₀)²</div>
                 </div>
                 <p>Sonuç: hızlı giren zerre <strong>az</strong> sapar (ϑ₀ karede), gerilim
                 artınca sapma <strong>doğru orantılı</strong> artar.</p>` }
      ]
    }
  ]
},

/* -------------------------------------------------------- Simülasyon */
sim: F.simler['elektriksel-alan'],

/* ------------------------------------------------------- Püf noktası */
puf: {
  html: `
    <p><strong>1 · “E mi F mi?” sorusunu en başta sor.</strong> Soruda test yükü
    değiştiriliyorsa:</p>
    <table class="degisken-tablo" style="margin-top:8px">
      <thead><tr><th>Değişen</th><th>E</th><th>F</th></tr></thead>
      <tbody>
        <tr><td>q₀ → 2q₀</td><td class="sembol">aynı</td><td class="sembol">2F</td></tr>
        <tr><td>Kaynak q → 2q</td><td class="sembol">2E</td><td class="sembol">2F</td></tr>
        <tr><td>d → 2d</td><td class="sembol">E/4</td><td class="sembol">F/4</td></tr>
        <tr><td>d → d/2</td><td class="sembol">4E</td><td class="sembol">4F</td></tr>
      </tbody>
    </table>

    <p style="margin-top:14px"><strong>2 · Düzgün alanda uzaklık işe yaramaz.</strong>
    <code>E = V/d</code>&rsquo;deki d, <strong>levha aralığıdır</strong> — zerrenin levhaya
    uzaklığı değil. Levhalar arasında nereye gidersen git alan aynıdır. Bu, ters kare
    alışkanlığından gelen en sık hatadır.</p>

    <p><strong>3 · N/C ile V/m aynıdır.</strong> Soru birini verip diğerini isterse çevirme
    yapma, doğrudan kullan.</p>

    <p><strong>4 · Alan çizgileri kesişmez.</strong> Şekilli sorularda çeldirici şıklardan
    biri hemen hemen her zaman kesişen çizgiler içerir; onu bakar bakmaz ele.</p>

    <p><strong>5 · Levhalar arası soru gelince refleksin YATAY ATIŞ olsun.</strong>
    Yeni formül arama:</p>
    <div class="formul" style="max-width:300px;margin:10px 0">
      <div class="fm">t = L/ϑ₀ &nbsp;→&nbsp; y = ½·a·t²</div>
    </div>
    <p>Üç adım: <strong>E = V/d</strong> bul, <strong>a = qE/m</strong> bul, sonra yatay atış.</p>

    <p><strong>6 · Nötr nokta kuralı Coulomb ile aynı.</strong> Aynı işaretli yüklerde
    <em>arada</em>, zıt işaretlilerde <em>dışarıda ve küçük yükün yanında</em>. Alanı
    ayrıca ezberleme.</p>

    <p><strong>7 · Ağırlığı ne zaman hesaba katmalı?</strong> Elektron, iyon, toz zerresi gibi
    çok hafif cisimlerde elektriksel kuvvet ağırlığı ezer, ağırlık ihmal edilir. Soru
    “ağırlığı ihmal ediniz” demiyorsa ve kütle verilmişse, <strong>karşılaştır</strong>.</p>

    <div class="kutu puf" style="margin-top:14px">
      <div class="kutu-bas"><span class="ikon">⚡</span><span>Aklında kalsın</span></div>
      <p style="margin:0">Kuru havanın <strong>delinme dayanımı ≈ 3·10⁶ V/m</strong>&rsquo;dir.
      Alan bunu aşınca hava iletken olur ve <strong>kıvılcım</strong> atlar. Bir önceki konudaki
      kapı kolu olayının sayısal eşiği budur.</p>
    </div>`
},

/* ----------------------------------------------------- Zorlayıcı sorular */
osym: [
  {
    baslik: 'E mi değişti, F mi?',
    kaynak: 'Kavram tuzağı',
    govde: `
      <p>Bir <strong>q</strong> nokta yükünden <strong>d</strong> uzaklıktaki P noktasına
      <strong>q₀</strong> test yükü konulduğunda alan <strong>E</strong>, kuvvet
      <strong>F</strong> olarak ölçülüyor.</p>
      <p>Şimdi test yükü <strong>2q₀</strong> yapılıyor ve <strong>kaynağa d/2 uzaklıktaki</strong>
      bir noktaya konuluyor.</p>
      <p>Yeni alan ve yeni kuvvet ne olur?</p>`,
    secenekler: [
      'E′ = 4E &nbsp;·&nbsp; F′ = 8F',
      'E′ = 8E &nbsp;·&nbsp; F′ = 8F',
      'E′ = 2E &nbsp;·&nbsp; F′ = 4F',
      'E′ = 4E &nbsp;·&nbsp; F′ = 4F',
      'E′ = E &nbsp;·&nbsp; F′ = 2F'
    ],
    dogru: 0,
    cozum: `
      <p><strong>Alanı önce, ayrı düşün.</strong> Alan yalnızca kaynağa ve uzaklığa bağlıdır;
      test yükü onu hiç etkilemez:</p>
      <div class="formul" style="max-width:260px;margin:10px 0">
        <div class="fm">E = k·q / d² &nbsp;⟹&nbsp; d → d/2 &nbsp;⟹&nbsp; E′ = 4E</div>
      </div>
      <p><strong>Sonra kuvvete geç:</strong></p>
      <div class="formul" style="max-width:300px;margin:10px 0">
        <div class="fm">F = q₀·E &nbsp;⟹&nbsp; F′ = (2q₀)(4E) = 8F</div>
      </div>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>D şıkkı</strong> test yükünün katlanmasını kuvvete
        yansıtmayanlar için.
        <br><strong>B şıkkı</strong> test yükünü alana da katanlar için — en sık hata budur.
        <strong>Test yükü alanı değiştirmez.</strong>
        <br><strong>E şıkkı</strong> uzaklık değişimini tümden atlayanlar için.
        <br>Simülasyonda birinci düzeneği aç, q₀ kaydırıcısını sonuna kadar kaydır:
        <strong>E okuması kıpırdamaz</strong>, yalnız F büyür.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: A</strong></p>`
  },
  {
    baslik: 'Levhalar arasında sapma',
    kaynak: 'Yatay atış bağlantısı',
    govde: `
      <p>Aralarındaki uzaklık <strong>d = 5 cm</strong>, uzunlukları <strong>L = 30 cm</strong>
      olan paralel levhalara <strong>V = 1000 V</strong> gerilim uygulanıyor.</p>
      <p>Yükü <strong>q = 10 nC</strong>, kütlesi <strong>m = 5 mg</strong> olan bir zerre,
      levhalara tam ortadan ve <strong>ϑ₀ = 10 m/s</strong> hızla <strong>yatay</strong>
      giriyor. Ağırlık ihmal ediliyor.</p>
      <p>Zerre levhalardan çıkarken ne kadar <strong>sapmış</strong> olur?</p>`,
    gorsel: `
      <svg viewBox="0 0 520 200" xmlns="http://www.w3.org/2000/svg" role="img"
           aria-label="Paralel levhalar arasına yatay giren yüklü zerrenin parabolik sapması">
        <rect width="520" height="200" fill="#0E1726"/>
        <rect x="90" y="52" width="340" height="8" fill="#E2483F"/>
        <rect x="90" y="140" width="340" height="8" fill="#2F6FD0"/>
        <text x="72" y="60" fill="#E2483F" font-size="15" font-family="system-ui" text-anchor="middle">+</text>
        <text x="72" y="150" fill="#2F6FD0" font-size="15" font-family="system-ui" text-anchor="middle">−</text>
        <g stroke="#7896C8" stroke-width="1.1">
          <path d="M130 60 V140 M180 60 V140 M230 60 V140 M280 60 V140 M330 60 V140 M380 60 V140"/>
        </g>
        <path d="M50 96 H90" stroke="#35C08A" stroke-width="2.4"/>
        <path d="M94 96 L84 91 L84 101 Z" fill="#35C08A"/>
        <text x="56" y="86" fill="#35C08A" font-size="11" font-family="system-ui">ϑ₀</text>
        <path d="M90 96 Q 300 100 430 128" stroke="#4DA3FF" stroke-width="2.6" fill="none"/>
        <circle cx="430" cy="128" r="6" fill="#FFB020"/>
        <path d="M446 96 V128" stroke="#6F84A8" stroke-width="1" stroke-dasharray="3 4"/>
        <path d="M430 96 H460" stroke="#6F84A8" stroke-width="1" stroke-dasharray="3 4"/>
        <text x="472" y="116" fill="#FFB020" font-size="12" font-family="system-ui">y = ?</text>
        <text x="260" y="176" fill="#6F84A8" font-size="11" font-family="system-ui" text-anchor="middle">L = 30 cm</text>
        <text x="455" y="60" fill="#6F84A8" font-size="11" font-family="system-ui">d = 5 cm</text>
      </svg>`,
    secenekler: [
      '1,8 cm',
      '0,9 cm',
      '3,6 cm',
      '2,5 cm — levhaya çarpar',
      '18 cm'
    ],
    dogru: 0,
    cozum: `
      <p><strong>Adım 1 — Alan.</strong> Düzgün alanda uzaklık, levha aralığıdır:</p>
      <p>E = V/d = 1000 / 0,05 = <strong>20 000 N/C</strong></p>
      <p><strong>Adım 2 — Kuvvet.</strong></p>
      <p>F = q·E = 10·10⁻⁹ · 20 000 = <strong>2·10⁻⁴ N</strong></p>
      <p><strong>Adım 3 — İvme.</strong> 5 mg = 5·10⁻⁶ kg:</p>
      <p>a = F/m = 2·10⁻⁴ / 5·10⁻⁶ = <strong>40 m/s²</strong></p>
      <p><strong>Adım 4 — Artık bu bir yatay atış.</strong></p>
      <p>t = L/ϑ₀ = 0,30 / 10 = <strong>0,03 s</strong></p>
      <div class="formul" style="max-width:320px;margin:10px 0;border-top-color:var(--accent)">
        <div class="fm" style="color:var(--accent)">y = ½·a·t² = ½·40·(0,03)² = 0,018 m</div>
      </div>
      <p><strong>y = 1,8 cm</strong></p>
      <p><strong>Kontrol:</strong> Levha aralığı 5 cm, zerre ortadan girdi ⟹ çarpmadan önce
      en fazla 2,5 cm sapabilir. 1,8 &lt; 2,5 ✓ zerre çıkabilir.</p>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>E şıkkı (18 cm)</strong> metre–santimetre çevriminde
        onluk kaçıranlar için.
        <br><strong>B şıkkı</strong> <code>y = ½at²</code> yerine <code>y = at²</code> ya da
        yarıyı unutanlar için.
        <br><strong>D şıkkı</strong> zerrenin mutlaka çarpacağını varsayanlar için —
        her zaman sapmayı <em>yarı aralıkla</em> karşılaştır.
        <br>Simülasyonda bu değerleri gir ve sağdaki panelde 1,8 cm&rsquo;yi kendin gör.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: A</strong></p>`
  }
],

/* --------------------------------------------- Bağlam temelli sorular */
baglam: [
  {
    baslik: 'Mürekkep püskürtmeli yazıcı harfleri nasıl çiziyor?',
    govde: `
      <p>Mürekkep püskürtmeli (inkjet) yazıcılar saniyede binlerce mürekkep damlası fırlatır.
      Her damla önce <strong>yüklenir</strong>, sonra <strong>paralel levhalar</strong> arasından
      geçirilir. Levhalara uygulanan gerilim <em>o anda</em> ne kadarsa damla o kadar sapar ve
      kâğıdın farklı bir noktasına düşer. Harfler işte bu sapma farklarıyla çizilir.</p>
      <p>Bir yazıcıda:</p>
      <ul>
        <li>Levha aralığı: <strong>d = 2 mm</strong></li>
        <li>Levha uzunluğu: <strong>L = 1,6 cm</strong></li>
        <li>Damlanın yükü: <strong>q = 2·10⁻¹² C</strong></li>
        <li>Damlanın kütlesi: <strong>m = 1·10⁻¹¹ kg</strong></li>
        <li>Giriş hızı: <strong>ϑ₀ = 20 m/s</strong></li>
        <li>Levha gerilimi: <strong>V = 1000 V</strong></li>
      </ul>
      <p><strong>Damla levhalardan çıkarken kaç mm sapar? Gerilim yarıya indirilirse sapma
      ne olur?</strong></p>`,
    gorsel: `
      <svg viewBox="0 0 520 210" xmlns="http://www.w3.org/2000/svg" role="img"
           aria-label="Inkjet yazıcıda yüklenen mürekkep damlasının levhalar arasında sapıp kâğıda düşmesi">
        <rect width="520" height="210" fill="#17223A"/>
        <rect x="20" y="92" width="46" height="26" rx="5" fill="#5F6B78"/>
        <text x="43" y="84" fill="#6F84A8" font-size="10" font-family="system-ui" text-anchor="middle">püskürtücü</text>
        <rect x="110" y="76" width="30" height="8" fill="#9AA5B1"/>
        <rect x="110" y="126" width="30" height="8" fill="#9AA5B1"/>
        <text x="125" y="68" fill="#6F84A8" font-size="9" font-family="system-ui" text-anchor="middle">yükleme</text>
        <rect x="190" y="70" width="150" height="8" fill="#E2483F"/>
        <rect x="190" y="132" width="150" height="8" fill="#2F6FD0"/>
        <g stroke="#7896C8" stroke-width="1">
          <path d="M215 78 V132 M250 78 V132 M285 78 V132 M320 78 V132"/>
        </g>
        <text x="265" y="158" fill="#6F84A8" font-size="10" font-family="system-ui" text-anchor="middle">L = 1,6 cm</text>
        <text x="356" y="78" fill="#6F84A8" font-size="10" font-family="system-ui">d = 2 mm</text>
        <path d="M66 105 H190" stroke="#4DA3FF" stroke-width="2"/>
        <path d="M190 105 Q 280 107 340 118" stroke="#4DA3FF" stroke-width="2.4" fill="none"/>
        <path d="M340 118 L440 132" stroke="#4DA3FF" stroke-width="2" stroke-dasharray="4 4"/>
        <rect x="444" y="40" width="10" height="150" fill="#E6E9EF"/>
        <text x="470" y="120" fill="#EAF0FA" font-size="11" font-family="system-ui">kâğıt</text>
        <circle cx="340" cy="118" r="5" fill="#FFB020"/>
      </svg>`,
    adimlar: [
      { bas: 'Olayı tanı',
        metin: 'Karmaşık bir makine gibi görünse de bu, <strong>levhalar arasına yatay giren yüklü zerre</strong> problemidir. Üç adımlık refleksi uygula.' },
      { bas: 'Alanı bul',
        metin: 'd = 2 mm = 2·10⁻³ m<br>E = V/d = 1000 / 2·10⁻³ = <strong>5·10⁵ N/C</strong>' },
      { bas: 'İvmeyi bul',
        metin: 'F = q·E = 2·10⁻¹² · 5·10⁵ = <strong>1·10⁻⁶ N</strong><br>a = F/m = 1·10⁻⁶ / 1·10⁻¹¹ = <strong>1·10⁵ m/s²</strong>' },
      { bas: 'Yatay atışa çevir',
        metin: 't = L/ϑ₀ = 0,016 / 20 = <strong>8·10⁻⁴ s</strong><br>y = ½·a·t² = ½ · 10⁵ · (8·10⁻⁴)² = ½ · 10⁵ · 6,4·10⁻⁷ = <strong>0,032 m = 3,2 cm</strong>' },
      { bas: 'Sonucu sorgula',
        metin: 'Levha aralığı yalnızca 2 mm! Hesaplanan 32 mm sapma <strong>imkânsızdır</strong> — damla daha yolun başında levhaya çarpar. Gerçek yazıcılarda ya gerilim çok daha düşüktür ya da damla çok daha hızlıdır. <strong>Sonucu fizikle sınamak, hesabı yapmak kadar önemlidir.</strong>' },
      { bas: 'Gerilimi yarıya indir',
        metin: 'y ∝ V olduğu için sapma da <strong>yarıya</strong> iner: 1,6 cm. Hâlâ 1 mm’lik yarı aralıktan büyük. Bu yazıcının çalışması için gerilimin yaklaşık <strong>30 kat</strong> düşürülmesi gerekir.' }
    ],
    secenekler: [
      '3,2 cm çıkar; bu aralıktan büyük olduğu için damla levhaya çarpar — gerilim düşürülmeli',
      '3,2 cm çıkar ve damla sorunsuz kâğıda ulaşır',
      '0,32 mm çıkar; gerilim yarıya inince 0,16 mm olur',
      '1 mm çıkar; damla tam sınırda geçer',
      'Sapma hesaplanamaz çünkü kâğıdın uzaklığı verilmemiş'
    ],
    dogru: 0,
    cozum: `
      <p>Hesap <strong>y = 3,2 cm</strong> verir, ama levha aralığı <strong>2 mm</strong>&rsquo;dir.
      Damla ortadan girdiğine göre en fazla <strong>1 mm</strong> sapabilir.</p>
      <div class="formul" style="max-width:320px;margin:10px 0;border-top-color:var(--accent)">
        <div class="fm" style="color:var(--accent)">3,2 cm ≫ 0,1 cm ⟹ çarpar</div>
      </div>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>Bu sorunun asıl öğrettiği şey hesap değil, denetim.</strong>
        Sayıyı bulduktan sonra “bu fiziksel olarak mümkün mü?” diye sormak gerekir.
        Sınavda da aynı refleks işe yarar: levhalar arası sapma <em>her zaman</em> yarı
        aralıkla karşılaştırılmalıdır.
        <br><strong>B şıkkı</strong> hesabı doğru yapıp denetlemeyenler için.
        <br><strong>E şıkkı</strong> ise gereksiz veri arayanlar için — sapma yalnızca levhalar
        arasında oluşur, kâğıdın uzaklığı yalnızca <em>kâğıttaki</em> izin yerini etkiler.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: A</strong></p>`
  },
  {
    baslik: 'Kıvılcım kaç voltta atlar?',
    govde: `
      <p>Bir önceki konuda kapı koluna çarpılmayı incelemiştik. Şimdi olayın
      <strong>eşiğini</strong> bulalım.</p>
      <p>Kuru hava yalıtkandır, ama alan belli bir değeri aşarsa hava moleküllerinden
      elektron koparılır ve hava <strong>iletken</strong> hâle gelir. Buna havanın
      <strong>delinme dayanımı</strong> denir:</p>
      <div class="formul" style="max-width:280px;margin:12px 0">
        <div class="fm">E<sub>delinme</sub> ≈ 3 · 10⁶ V/m</div>
      </div>
      <p>Parmağın kapı koluna <strong>1 mm</strong> yaklaştığında kıvılcım atlıyor.</p>
      <p><strong>Vücudunda kaç voltluk bir gerilim birikmiş olmalı? Bir yıldırımda bulut ile
      yer arası 1 km ise, oradaki gerilim ne mertebededir?</strong></p>`,
    gorsel: `
      <svg viewBox="0 0 520 200" xmlns="http://www.w3.org/2000/svg" role="img"
           aria-label="Parmak ile kapı kolu arasındaki bir milimetrelik aralıkta oluşan kıvılcım">
        <rect width="520" height="200" fill="#17223A"/>
        <ellipse cx="150" cy="100" rx="60" ry="26" fill="#E8C9A8"/>
        <text x="110" y="146" fill="#EAF0FA" font-size="12" font-family="system-ui">parmak</text>
        <ellipse cx="380" cy="100" rx="34" ry="30" fill="#9AA5B1"/>
        <text x="380" y="152" fill="#EAF0FA" font-size="12" font-family="system-ui" text-anchor="middle">kapı kolu</text>
        <path d="M212 100 L232 92 L224 104 L246 96" stroke="#FFB020" stroke-width="3" fill="none" stroke-linejoin="round"/>
        <path d="M246 96 L262 108 L254 98 L276 102" stroke="#FFB020" stroke-width="3" fill="none" stroke-linejoin="round"/>
        <path d="M276 102 L296 94 L288 106 L346 100" stroke="#FFB020" stroke-width="3" fill="none" stroke-linejoin="round"/>
        <path d="M212 66 H346" stroke="#6F84A8" stroke-width="1" stroke-dasharray="3 4"/>
        <text x="279" y="58" fill="#6F84A8" font-size="11" font-family="system-ui" text-anchor="middle">d = 1 mm</text>
        <text x="279" y="180" fill="#FFB020" font-size="12" font-family="system-ui" text-anchor="middle" font-weight="700">E ≥ 3·10⁶ V/m ⟹ kıvılcım</text>
      </svg>`,
    adimlar: [
      { bas: 'Hangi formül?',
        metin: 'Parmak ve kapı kolu, aralarında küçük bir boşluk olan iki iletken — yaklaşık olarak <strong>paralel levha</strong> gibi davranırlar. Düzgün alan formülü uygundur: <strong>E = V/d</strong>' },
      { bas: 'Bilinmeyeni yalnız bırak',
        metin: 'V = E · d' },
      { bas: 'Değerleri yerine koy',
        metin: 'd = 1 mm = 10⁻³ m<br>V = 3·10⁶ · 10⁻³ = <strong>3000 V</strong>' },
      { bas: 'Sonucu yorumla',
        metin: 'Üç bin volt kulağa korkunç gelir ama <strong>tehlikeli değildir</strong>, çünkü biriken <em>yük</em> çok azdır. Tehlikeli olan gerilim değil, <strong>akımın büyüklüğü ve süresi</strong>dir. Bu yüzden statik çarpılma canını yakar ama zarar vermez.' },
      { bas: 'Yıldırıma ölçekle',
        metin: 'Aynı formül, d = 1000 m için:<br>V = 3·10⁶ · 10³ = <strong>3·10⁹ V</strong> — üç milyar volt mertebesinde. Gerçek yıldırımlarda hava nemli ve iyonize olduğu için eşik daha düşüktür, ölçülen değerler <strong>10⁸ V</strong> civarındadır.' }
    ],
    secenekler: [
      '3000 V; yıldırımda 10⁹ V mertebesinde — yüksek gerilim tek başına tehlike demek değildir',
      '3000 V; yıldırımda da 3000 V — gerilim uzaklıktan bağımsızdır',
      '3·10⁶ V; kıvılcım için bu kadar gerilim gerekir',
      '300 V; bu yüzden statik elektrik zararsızdır',
      '3 V; kıvılcım aslında gerilimle değil nemle ilgilidir'
    ],
    dogru: 0,
    cozum: `
      <p><strong>V = E·d = 3·10⁶ · 10⁻³ = 3000 V</strong></p>
      <p>1 km&rsquo;lik bulut-yer aralığı için aynı hesap <strong>3·10⁹ V</strong> mertebesi verir.</p>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>C şıkkı</strong> alanı doğrudan gerilim sanıyor — birimler
        farklıdır: E birimi V/<strong>m</strong>, V birimi V.
        <br><strong>B şıkkı</strong> <code>V = E·d</code>&rsquo;deki d&rsquo;yi görmezden geliyor.
        <br><strong>Kalıcı ders:</strong> Gerilim tek başına tehlikeyi ölçmez. Statik çarpılmada
        gerilim binlerce volt ama yük mikrocoulomb mertebesindedir; prizde gerilim 220 V ama
        arkasında sınırsız yük vardır. Tehlikeli olan <strong>akımdır</strong>.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: A</strong></p>`
  }
]

});
})();
