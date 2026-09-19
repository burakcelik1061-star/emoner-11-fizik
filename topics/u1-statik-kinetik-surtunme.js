(function () {
"use strict";
const F = window.F11;

/* ==========================================================================
   topics/u1-statik-kinetik-surtunme.js
   Konu 1.4.1 · Statik ve kinetik sürtünme kuvvetleri   (MEB 11, s. 65-70)
   ========================================================================== */

F.konuKaydet('u1-statik-kinetik-surtunme', {

ozet: `Buraya kadar sürtünmeyi hep ihmal ettik; artık asıl konu o. Sürtünmenin
kafa karıştıran yanı şu: <strong>iki farklı türü var</strong> ve bunlardan biri
sabit bir sayı değil, <em>uygulanan kuvvete göre kendini ayarlayan</em> bir kuvvettir.`,

/* ------------------------------------------------------------- Kavram */
kavram: `
<p>Temas hâlindeki yüzeyler ne kadar düzgün görünürse görünsün <strong>mikro ölçekte
pürüzlüdür</strong>. Bu pürüzler birbirine takılır, ayrıca yüzeyler arasında zayıf
kimyasal bağlar kurulur. Sürtünme kuvveti bu ikisinin sonucudur ve temelde
<strong>elektriksel bir etkileşimdir</strong>.</p>

<p>Sürtünme kuvveti daima <strong>harekete (veya hareket eğilimine) zıt yöndedir</strong>
ve yüzeye paraleldir.</p>

<h3 style="margin-top:22px">İki tür sürtünme</h3>
<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:12px;margin:14px 0">
  <div style="background:var(--violet-soft);border:1px solid #453A72;border-radius:var(--r-sm);padding:14px 16px">
    <div style="color:var(--violet);font-weight:700;font-size:.9em;margin-bottom:8px">
      STATİK  f<sub>s</sub></div>
    <p style="margin:0 0 6px">Cisim <strong>durgunken</strong> etki eder.</p>
    <p style="margin:0 0 6px"><strong>Sabit bir sayı değildir!</strong> Uygulanan kuvvete
    eşit olacak şekilde kendini ayarlar.</p>
    <p style="margin:0;font-family:var(--font-mono);color:#fff">f<sub>s</sub> = F &nbsp;(F ≤ f<sub>s,maks</sub> iken)</p>
  </div>
  <div style="background:var(--amber-soft);border:1px solid #6B4A12;border-radius:var(--r-sm);padding:14px 16px">
    <div style="color:var(--amber);font-weight:700;font-size:.9em;margin-bottom:8px">
      KİNETİK  f<sub>k</sub></div>
    <p style="margin:0 0 6px">Cisim <strong>kayarken</strong> etki eder.</p>
    <p style="margin:0 0 6px"><strong>Sabittir.</strong> Uygulanan kuvvetten ve hızdan
    bağımsızdır.</p>
    <p style="margin:0;font-family:var(--font-mono);color:#fff">f<sub>k</sub> = sabit &nbsp;(&lt; f<sub>s,maks</sub>)</p>
  </div>
</div>

<h3 style="margin-top:22px">Statik sürtünme neden "kendini ayarlar"?</h3>
<p>Duran bir dolabı parmağınla it. Kıpırdamaz. Demek ki bileşke kuvvet sıfır — yani
sürtünme senin uyguladığın kuvvete <strong>tam olarak eşit</strong> bir tepki verdi.</p>
<p>Şimdi biraz daha kuvvetle it. Yine kıpırdamıyor. Sürtünme yine seninle eşitlendi.</p>
<p>Bu, sürtünmenin "hazır bir sayı" olmadığını gösterir. Statik sürtünme
<strong>0 ile f<sub>s,maks</sub> arasında herhangi bir değer alabilir</strong> —
hangisi gerekiyorsa onu alır. Ancak bir sınırı vardır; o sınırı aşınca cisim kopar.</p>

<div class="kutu puf" style="margin:14px 0">
  <div class="kutu-bas"><span class="ikon">🔬</span>Kitaptaki Elif deneyi (s.68)</div>
  <p style="margin:0">Elif bloka bağlı kuvvetölçeri yavaş yavaş çekiyor.
  <strong>41 N</strong>’da blok harekete geçiyor. Bu andan sonra <strong>35 N</strong>
  hareketi sürdürmeye yetiyor.</p>
  <p style="margin:8px 0 0">Yani f<sub>s,maks</sub> = 41 N, f<sub>k</sub> = 35 N.
  Aşağıdaki simülasyon bu deneyin aynısıdır ve varsayılan değerleri de bunlardır.</p>
</div>

<h3 style="margin-top:22px">Kopma anı</h3>
<p>Uygulanan kuvvet f<sub>s,maks</sub>’ı aştığı anda iki şey birden olur:</p>
<ol>
  <li>Cisim harekete geçer</li>
  <li>Sürtünme <strong>aniden düşer</strong> (f<sub>s,maks</sub> → f<sub>k</sub>)</li>
</ol>
<p>İşte bu yüzden ağır bir dolabı <em>yerinden oynatmak</em>, oynattıktan sonra
<em>itmeye devam etmekten</em> daha zordur. Simülasyonda f − F grafiğinde bu düşüşü
açıkça göreceksin: önce 45°’lik bir doğru, sonra ani bir düşüş, sonra yatay bir doğru.</p>

<h3 style="margin-top:22px">Sürtünme her zaman hareketi engellemez</h3>
<p>Yaygın sanının aksine sürtünme bazen <strong>hareketi başlatan kuvvettir</strong>.
Kitabın bisiklet örneği (s.68):</p>
<ul>
  <li><strong>Kalkışta:</strong> Arka tekerlek geriye doğru iter, yer de tekerleği
  <em>ileriye</em> iter. Sürtünme hareket yönündedir — onsuz kalkış imkânsızdır.</li>
  <li><strong>Sabit hızda (pedal çevrilmiyorsa):</strong> Sürtünme yok sayılırsa bileşke sıfırdır.</li>
  <li><strong>Frende:</strong> Sürtünme hareketi yavaşlatacak şekilde ters yöne döner.</li>
</ul>
<p style="color:var(--text-2)">Buzda yürüyememenin sebebi de budur: sürtünme olmadığı
için ayağın yeri itemez, dolayısıyla yer de seni itemez.</p>`,

/* ---------------------------------------------------------- Formüller */
formuller: {
  liste: [
    { fm: 'f<sub>s</sub> = F', aciklama: 'Cisim durgunken, F ≤ f<sub>s,maks</sub> olduğu sürece' },
    { fm: 'f<sub>s</sub> ≤ f<sub>s,maks</sub>', aciklama: 'Statik sürtünmenin bir üst sınırı vardır' },
    { fm: 'f<sub>k</sub> = sabit', aciklama: 'Cisim kayarken — F’den ve hızdan bağımsız' },
    { fm: 'f<sub>k</sub> &lt; f<sub>s,maks</sub>', aciklama: 'Kinetik sürtünme daima daha küçüktür' },
    { fm: 'F<sub>net</sub> = F − f<sub>k</sub>', aciklama: 'Hareket başladıktan sonraki bileşke' }
  ],
  degiskenler: [
    { sembol: 'F',             ad: 'Uygulanan kuvvet',            birim: 'N' },
    { sembol: 'f<sub>s</sub>', ad: 'Statik sürtünme kuvveti',     birim: 'N' },
    { sembol: 'f<sub>k</sub>', ad: 'Kinetik sürtünme kuvveti',    birim: 'N' },
    { sembol: 'N',             ad: 'Normal kuvvet',               birim: 'N' }
  ]
},

/* ------------------------------------------------------------ Türetim */
turetim: {
  yollar: [
    {
      ad: 'Deneyi adım adım oku',
      adimlar: [
        { baslik: 'F = 0 · hiç kuvvet yok',
          html: `<p>Blok duruyor, kimse çekmiyor. Yatayda hiçbir kuvvet yok, dolayısıyla
                 <strong>sürtünme de yoktur</strong>.</p>
                 <div class="formul" style="max-width:200px"><div class="fm">f<sub>s</sub> = 0</div></div>
                 <p style="margin-top:10px;color:var(--text-2)">Sürtünme "her zaman var olan"
                 bir kuvvet değildir. Ortada dengelenecek bir şey yoksa sürtünme de ortaya çıkmaz.</p>` },

        { baslik: 'F = 15 N · blok hâlâ duruyor',
          html: `<p>Çekiyoruz ama blok kıpırdamıyor. Blok durgun olduğuna göre ivmesi sıfır,
                 dolayısıyla <strong>bileşke kuvvet de sıfır olmalı</strong>:</p>
                 <p>F − f<sub>s</sub> = 0 ⟹ <strong>f<sub>s</sub> = 15 N</strong></p>
                 <p>Sürtünme tam olarak 15 N ile karşılık verdi. Ne bir eksik, ne bir fazla.</p>` },

        { baslik: 'F = 30 N · yine duruyor',
          html: `<p>Aynı akıl yürütme: <strong>f<sub>s</sub> = 30 N</strong>.</p>
                 <p>Sürtünme kuvveti değişti. Yüzeyler aynı, blok aynı, ama sürtünme farklı.</p>
                 <div class="kutu puf" style="margin-top:12px">
                   <p style="margin:0">Bu adım konunun anahtarıdır: <strong>statik sürtünme
                   kuvvetinin tek bir değeri yoktur.</strong> Ne kadar gerekiyorsa o kadar olur.
                   "Bu yüzeyin sürtünme kuvveti kaç N?" sorusu, cisim hareket etmiyorsa
                   eksik bir sorudur.</p>
                 </div>` },

        { baslik: 'F = 41 N · kopma anı',
          html: `<p>Blok tam bu değerde harekete geçiyor. Demek ki statik sürtünme
                 41 N’ı geçemiyordu:</p>
                 <div class="formul" style="max-width:240px;border-top-color:var(--accent)">
                   <div class="fm" style="color:var(--accent)">f<sub>s,maks</sub> = 41 N</div>
                 </div>
                 <p style="margin-top:12px">Bu, statik sürtünmenin <strong>üst sınırıdır</strong>.
                 41 N’a kadar istenen her değeri alabiliyordu; ötesini veremedi ve blok kurtuldu.</p>` },

        { baslik: 'Hareket başladı · sürtünme düştü',
          html: `<p>Blok hareket ederken <strong>35 N</strong> onu sabit hızda tutmaya yetiyor.
                 Sabit hız demek a = 0, yani denge demek:</p>
                 <p>F − f<sub>k</sub> = 0 ⟹ <strong>f<sub>k</sub> = 35 N</strong></p>
                 <div class="formul-serit" style="margin-top:12px">
                   <div class="formul"><div class="fm">f<sub>s,maks</sub> = 41 N</div></div>
                   <div class="formul"><div class="fm">f<sub>k</sub> = 35 N</div></div>
                 </div>
                 <p style="margin-top:12px"><strong>f<sub>k</sub> &lt; f<sub>s,maks</sub></strong> —
                 bu her zaman böyledir. Hareket hâlindeki yüzeylerin pürüzleri birbirine
                 kilitlenmeye fırsat bulamaz.</p>` },

        { baslik: 'Grafiği oku',
          html: `<p>Şimdi f − F grafiğini kur. İki bölge var:</p>
                 <ul>
                   <li><strong>F ≤ 41 N:</strong> f = F ⟹ eğimi 1 olan bir <strong>45°’lik doğru</strong></li>
                   <li><strong>F &gt; 41 N:</strong> f = 35 N ⟹ <strong>yatay doğru</strong></li>
                 </ul>
                 <p>Aradaki geçişte grafik <strong>41’den 35’e düşer</strong>. Bu düşüş,
                 dolabı yerinden oynattığın andaki o "birden hafifledi" hissinin ta kendisidir.</p>
                 <div class="kutu puf" style="margin-top:12px">
                   <p style="margin:0">Simülasyonu çalıştır ve soldaki f − F grafiğini izle.
                   Grafik kendiliğinden çizilecek: önce yükselen doğru, sonra düşüş, sonra düzlük.</p>
                 </div>` }
      ]
    },
    {
      ad: 'Sürtünme nereden geliyor?',
      adimlar: [
        { baslik: 'Hiçbir yüzey gerçekten düz değildir',
          html: `<p>Cilalanmış mermer bile mikro ölçekte dağ silsilesi gibidir. İki yüzey
                 üst üste geldiğinde bu tümsekler birbirine <strong>geçer</strong>.</p>
                 <p>Cismi kaydırmak için bu tümseklerin ya kırılması ya da birbirinin üstüne
                 tırmanması gerekir — işte bu direnç sürtünmenin bir bölümüdür.</p>` },

        { baslik: 'Temas noktalarında bağ kurulur',
          html: `<p>İki yüzey birbirine dokunduğunda temas noktalarındaki atomlar arasında
                 <strong>zayıf kimyasal bağlar</strong> oluşur. Cismi hareket ettirmek bu
                 bağları koparmayı gerektirir.</p>
                 <p>Kitabın ifadesiyle (s.70): sürtünme kuvveti temelde
                 <strong>atom ve moleküller arasındaki elektriksel etkileşimleri içerir</strong>.</p>` },

        { baslik: 'Statik ile kinetik farkı bu bağlarda',
          html: `<p>Cisim <strong>durgunken</strong> bağların kurulmaya bol bol vakti vardır;
                 temas noktaları birbirine iyice kilitlenir. Bu yüzden ilk hareketi başlatmak zordur.</p>
                 <p>Cisim <strong>kayarken</strong> yüzeyler sürekli yer değiştirir; bağlar
                 kurulur kurulmaz kopar, tam oturamaz.</p>
                 <div class="formul" style="max-width:260px;border-top-color:var(--accent)">
                   <div class="fm" style="color:var(--accent)">f<sub>k</sub> &lt; f<sub>s,maks</sub></div>
                 </div>
                 <p style="margin-top:12px;color:var(--text-2)">Bu eşitsizliğin fiziksel sebebi
                 budur — ezberlenecek bir kural değil, anlaşılabilir bir sonuç.</p>` }
      ]
    }
  ]
},

/* -------------------------------------------------------- Simülasyon */
sim: F.simler['statik-kinetik-surtunme'],

/* ------------------------------------------------------- Püf noktası */
puf: {
  html: `
    <p><strong>1 · Cisim duruyorsa sürtünme, uygulanan kuvvete EŞİTTİR.</strong>
    Soruda "f<sub>s,maks</sub> = 50 N olan yüzeyde duran cisme 20 N kuvvet uygulanıyor,
    sürtünme kaç N?" diye sorulursa cevap <strong>50 değil, 20 N’dır</strong>.
    Bu, bu konunun en çok puan kaybettiren sorusudur.</p>

    <p><strong>2 · Cisim kayıyorsa sürtünme SABİTTİR.</strong> Uygulanan kuvveti iki katına
    çıkarsan bile f<sub>k</sub> değişmez — değişen şey bileşke kuvvet ve ivmedir.</p>

    <p><strong>3 · Hareket edip etmediğini önce kontrol et.</strong> Her sürtünme sorusu
    tek bir soruyla başlar: <em>F &gt; f<sub>s,maks</sub> mı?</em></p>
    <ul>
      <li><strong>Hayır</strong> → cisim duruyor, f = F, a = 0</li>
      <li><strong>Evet</strong> → cisim kayıyor, f = f<sub>k</sub>, a = (F − f<sub>k</sub>)/m</li>
    </ul>

    <p><strong>4 · f<sub>k</sub> her zaman f<sub>s,maks</sub>’tan küçüktür.</strong>
    Bir soruda tersi verilmişse ya soru hatalıdır ya da sen değerleri karıştırmışsındır.</p>

    <p><strong>5 · Sürtünme hareketi engellemek zorunda değildir.</strong> Yürürken,
    bisiklet sürerken, araba kalkarken sürtünme <em>hareket yönündedir</em> ve hareketi
    o başlatır.</p>

    <div style="background:var(--surface-0);border-radius:var(--r-sm);padding:14px;margin:14px 0">
      <p style="margin:0 0 8px;font-weight:600">Elif deneyinin tablosu (f<sub>s,maks</sub> = 41 N, f<sub>k</sub> = 35 N)</p>
      <table class="degisken-tablo" style="margin:0">
        <thead><tr><th>Uygulanan F</th><th>Sürtünme f</th><th>Tür</th><th>Durum</th></tr></thead>
        <tbody>
          <tr><td class="sembol">0</td><td class="sembol">0</td><td>Statik</td><td>Duruyor</td></tr>
          <tr><td class="sembol">15</td><td class="sembol">15</td><td>Statik</td><td>Duruyor</td></tr>
          <tr><td class="sembol">30</td><td class="sembol">30</td><td>Statik</td><td>Duruyor</td></tr>
          <tr><td class="sembol">40</td><td class="sembol">40</td><td>Statik</td><td>Duruyor</td></tr>
          <tr><td class="sembol">45</td><td class="sembol">35</td><td>Kinetik</td><td>Kayıyor</td></tr>
          <tr><td class="sembol">35</td><td class="sembol">35</td><td>Kinetik</td><td>Sabit hız</td></tr>
        </tbody>
      </table>
      <p style="margin:10px 0 0;font-size:.86em;color:var(--text-3)">
        Son iki satıra dikkat: F = 45 iken de F = 35 iken de sürtünme aynı (35 N).
        Kinetik sürtünme uygulanan kuvveti umursamaz.
      </p>
    </div>

    <p style="margin-bottom:0"><strong>6 · "Sabit hızla çekiliyor" = denge.</strong>
    Bu ifadeyi gördüğün an F = f<sub>k</sub> yaz. Sınavda kinetik sürtünmeyi bulmanın
    en kısa yolu budur.</p>`,

  ornekler: [
    {
      soru: `<p>Yatay zeminde duran bir cisim için f<sub>s,maks</sub> = 60 N,
             f<sub>k</sub> = 45 N’dır. Cisme yatay doğrultuda <strong>40 N</strong>
             kuvvet uygulanıyor. Sürtünme kuvveti kaç N’dır?</p>`,
      taktikle: `<p>Önce kontrol: 40 &lt; 60 ⟹ cisim <strong>hareket etmiyor</strong>.</p>
                 <p style="margin-bottom:0">Durgunsa sürtünme uygulanan kuvvete eşittir:
                 <strong>f = 40 N</strong></p>`,
      uzun: `<p>Cisim durgun ⟹ a = 0 ⟹ F<sub>net</sub> = 0 ⟹ F − f = 0 ⟹ f = 40 N</p>
             <p style="color:var(--text-3)">"60 N" diyenler f<sub>s,maks</sub>’ı sürtünmenin
             kendisi sanmıştır; "45 N" diyenler ise cismin hareket ettiğini varsaymıştır.</p>`
    },
    {
      soru: `<p>Aynı cisme bu kez <strong>80 N</strong> uygulanıyor. Cismin ivmesi kaç m/s²’dir?
             (m = 5 kg, f<sub>s,maks</sub> = 60 N, f<sub>k</sub> = 45 N)</p>`,
      taktikle: `<p>Kontrol: 80 &gt; 60 ⟹ cisim <strong>kayıyor</strong> ⟹ f = f<sub>k</sub> = 45 N.</p>
                 <p style="margin-bottom:0">F<sub>net</sub> = 80 − 45 = 35 N ⟹
                 a = 35/5 = <strong>7 m/s²</strong></p>`,
      uzun: `<p>F &gt; f<sub>s,maks</sub> olduğundan hareket başlar ve kinetik sürtünmeye geçilir.</p>
             <p>F<sub>net</sub> = F − f<sub>k</sub> = 35 N ⟹ a = F<sub>net</sub>/m = 7 m/s²</p>
             <p style="color:var(--text-3)">80 − 60 = 20 ⟹ a = 4 diyenler kopma değerini
             hareket sırasında da kullanmıştır. Hareket başladıktan sonra
             f<sub>s,maks</sub>’ın hiçbir rolü kalmaz.</p>`
    },
    {
      soru: `<p>Bir sandık yatay zeminde <strong>sabit hızla</strong> 24 N’lık kuvvetle
             çekiliyor. Kinetik sürtünme kuvveti kaç N’dır?</p>`,
      taktikle: `<p>"Sabit hız" ⟹ a = 0 ⟹ denge ⟹ <strong>f<sub>k</sub> = F = 24 N</strong></p>
                 <p style="margin-bottom:0">Tek satır, hiç işlem yok.</p>`,
      uzun: `<p>a = 0 ⟹ F<sub>net</sub> = 0 ⟹ F − f<sub>k</sub> = 0 ⟹ f<sub>k</sub> = 24 N</p>`
    }
  ]
},

/* ------------------------------------------------------ Zorlayıcı sorular */
osym: [
  {
    baslik: 'f − F grafiği',
    kaynak: 'Grafik okuma',
    govde: `
      <p>Yatay bir zeminde duran cisme uygulanan yatay kuvvet <strong>sıfırdan başlayarak
      düzgün biçimde artırılıyor</strong>. Cisme etki eden sürtünme kuvvetinin, uygulanan
      kuvvete bağlı değişimi aşağıdaki grafikte verilmiştir.</p>
      <p>Buna göre aşağıdakilerden hangisi <strong>yanlıştır</strong>?</p>`,
    gorsel: `
      <svg viewBox="0 0 520 210" xmlns="http://www.w3.org/2000/svg" role="img"
           aria-label="Sürtünme kuvvetinin uygulanan kuvvete bağlı grafiği: 40 newtona kadar yükselen doğru, sonra 30 newtonda yatay doğru">
        <rect width="520" height="210" fill="#0E1726"/>
        <g stroke="#223150" stroke-width="1">
          <path d="M90 50 H450 M90 90 H450 M90 130 H450"/>
          <path d="M190 30 V170 M290 30 V170 M390 30 V170"/>
        </g>
        <path d="M90 30 V170 M78 170 H460" stroke="#4A5F86" stroke-width="1.6"/>
        <path d="M90 170 L250 50" stroke="#A78BFA" stroke-width="2.8"/>
        <path d="M250 90 L450 90" stroke="#FFB020" stroke-width="2.8"/>
        <path d="M250 50 L250 90" stroke="#FF6B6B" stroke-width="2" stroke-dasharray="4 4"/>
        <circle cx="250" cy="50" r="4" fill="#A78BFA"/>
        <circle cx="250" cy="90" r="4" fill="#FFB020"/>
        <text x="80" y="54" fill="#6F84A8" font-size="12" font-family="system-ui" text-anchor="end">40</text>
        <text x="80" y="94" fill="#6F84A8" font-size="12" font-family="system-ui" text-anchor="end">30</text>
        <text x="80" y="174" fill="#6F84A8" font-size="12" font-family="system-ui" text-anchor="end">0</text>
        <text x="250" y="188" fill="#6F84A8" font-size="12" font-family="system-ui" text-anchor="middle">40</text>
        <text x="390" y="188" fill="#6F84A8" font-size="12" font-family="system-ui" text-anchor="middle">70</text>
        <text x="470" y="174" fill="#A7B8D4" font-size="13" font-family="system-ui">F (N)</text>
        <text x="96" y="24" fill="#A7B8D4" font-size="13" font-family="system-ui">f (N)</text>
      </svg>`,
    secenekler: [
      'Maksimum statik sürtünme kuvveti 40 N’dır',
      'Kinetik sürtünme kuvveti 30 N’dır',
      'F = 25 N iken cisim hareketsizdir',
      'F = 70 N iken sürtünme kuvveti 70 N’dır',
      'F = 50 N iken cismin ivmesi sıfırdan büyüktür'
    ],
    dogru: 3,
    cozum: `
      <p>Grafiğin iki bölgesi var:</p>
      <ul>
        <li><strong>F ≤ 40 N:</strong> f = F (45°’lik doğru) — cisim durgun, statik sürtünme</li>
        <li><strong>F &gt; 40 N:</strong> f = 30 N sabit — cisim kayıyor, kinetik sürtünme</li>
      </ul>
      <ol>
        <li><strong>Doğru.</strong> Doğrunun bittiği nokta f<sub>s,maks</sub> = 40 N.</li>
        <li><strong>Doğru.</strong> Yatay doğrunun değeri f<sub>k</sub> = 30 N.</li>
        <li><strong>Doğru.</strong> 25 &lt; 40 olduğundan cisim henüz kopmamıştır.</li>
        <li><strong>YANLIŞ — aranan cevap bu.</strong> F = 70 N’da cisim çoktan kayıyor,
        dolayısıyla sürtünme <strong>30 N’dır</strong>, 70 N değil. Kinetik sürtünme
        uygulanan kuvvetle birlikte artmaz. Grafik de zaten orada yatay.</li>
        <li><strong>Doğru.</strong> F = 50 N ⟹ F<sub>net</sub> = 50 − 30 = 20 N ⟹ a &gt; 0.</li>
      </ol>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>D şıkkı, 45°’lik doğruyu grafiğin tamamı sanan
        öğrenciyi hedefler.</strong> "f = F" ilişkisi <em>yalnızca</em> kopmadan önce geçerlidir.
        Grafikte yatay bölgeye geçildiği an bu ilişki biter.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: D</strong></p>`
  },
  {
    baslik: 'Sürtünmenin yönü',
    kaynak: 'Kavram tuzağı',
    govde: `
      <p>Bir bisikletli durgun hâlden pedal çevirerek harekete geçiyor ve hızlanıyor.
      Bu sırada <strong>arka (çeker) tekerleğe</strong> yerin uyguladığı sürtünme kuvvetinin
      yönü için ne söylenebilir?</p>
      <p style="font-size:.9em;color:var(--text-3)">(Hava direnci ve tekerlek deformasyonu ihmal ediliyor.)</p>`,
    secenekler: [
      'Hareket yönüne zıttır, çünkü sürtünme her zaman hareketi engeller',
      'Hareket yönüyle aynıdır, bisikleti ileri iten kuvvet budur',
      'Sıfırdır, çünkü tekerlek kaymadan yuvarlanır',
      'Düşey doğrultudadır',
      'Bisikletlinin kütlesine bağlı olarak yön değiştirir'
    ],
    dogru: 1,
    cozum: `
      <p>Pedal çevrildiğinde arka tekerlek yere <strong>geriye doğru</strong> bir kuvvet uygular.
      Newton III gereği yer de tekerleğe <strong>ileriye doğru</strong> eşit büyüklükte bir
      kuvvet uygular. İşte bisikleti öne götüren kuvvet budur.</p>
      <p>Yani kalkışta arka tekerleğe etki eden sürtünme <strong>hareket yönüyle aynıdır</strong>.</p>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>A şıkkı ezberlenmiş yanlış bir kuraldır.</strong>
        Sürtünme hareketi değil, <strong>yüzeyler arasındaki göreli kaymayı</strong> engeller.
        Tekerleğin yere değen noktası geriye kaymaya çalışır; sürtünme bunu engellemek için
        ileri yönlüdür.
        <br><strong>Sağlaması:</strong> Buzda bisiklet kalkamaz. Sürtünme hareketi engelleseydi
        buzda daha kolay kalkman gerekirdi — oysa tam tersi olur. Yürümek, koşmak, araba
        kalkışı hep aynı mekanizmayla çalışır.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: B</strong></p>`
  }
],

/* --------------------------------------------- Bağlam temelli sorular */
baglam: [
  {
    baslik: 'Dolabı oynatamayan öğrenci',
    govde: `
      <p>Bir öğrenci sınıftaki dolabı yerinden oynatmak istiyor. Önce hafifçe itiyor,
      kıpırdamıyor. Daha kuvvetli itiyor, yine kıpırdamıyor. Bir arkadaşı yardıma geliyor
      ve dolap <strong>birden</strong> hareket ediyor. Öğrenci şaşırıyor: dolap hareket
      ettikten sonra <strong>tek başına</strong> itmeye devam edebiliyor.</p>
      <p>Öğrenci soruyor: <strong>"Neden başlangıçta iki kişi gerekti ama sonra ben tek
      başıma yetebiliyorum? Dolap hafifledi mi?"</strong></p>
      <p><strong>Öğrencinin gözlemini fiziksel olarak açıkla.</strong></p>`,
    gorsel: `
      <svg viewBox="0 0 520 200" xmlns="http://www.w3.org/2000/svg" role="img"
           aria-label="Dolabı iten öğrenci: önce iki kişi gerekiyor, hareket başlayınca tek kişi yetiyor">
        <rect width="520" height="200" fill="#17223A"/>
        <rect x="0" y="164" width="520" height="36" fill="#9C8468"/>
        <path d="M0 164 H520" stroke="#7A6550" stroke-width="1.4"/>
        <rect x="120" y="70" width="86" height="94" fill="#C98B4B" stroke="#8A5A28" stroke-width="2"/>
        <path d="M163 70 V164" stroke="#8A5A28" stroke-width="1.6"/>
        <circle cx="156" cy="118" r="3" fill="#8A5A28"/><circle cx="170" cy="118" r="3" fill="#8A5A28"/>
        <g transform="translate(240,164)">
          <circle cx="0" cy="-42" r="7" fill="#3C3489"/>
          <path d="M0 -35 L0 -16 M0 -16 L-7 0 M0 -16 L7 0 M0 -30 L-18 -26" stroke="#3C3489" stroke-width="2.8" stroke-linecap="round"/>
        </g>
        <g transform="translate(276,164)" opacity=".55">
          <circle cx="0" cy="-42" r="7" fill="#4C3A8A"/>
          <path d="M0 -35 L0 -16 M0 -16 L-7 0 M0 -16 L7 0 M0 -30 L-18 -26" stroke="#4C3A8A" stroke-width="2.8" stroke-linecap="round"/>
        </g>
        <path d="M216 122 L212 122" stroke="#FF6B6B" stroke-width="3"/>
        <path d="M204 122 L218 115 L218 129 Z" fill="#FF6B6B"/>
        <text x="300" y="104" fill="#FF6B6B" font-size="12" font-family="system-ui">itme kuvveti F</text>
        <path d="M112 142 L88 142" stroke="#A78BFA" stroke-width="3"/>
        <path d="M78 142 L92 135 L92 149 Z" fill="#A78BFA"/>
        <text x="72" y="128" fill="#A78BFA" font-size="12" font-family="system-ui" text-anchor="end">sürtünme f</text>
        <text x="300" y="132" fill="#6F84A8" font-size="11" font-family="system-ui">ikinci kişi: solgun</text>
      </svg>`,
    adimlar: [
      { bas: 'İddiayı incele',
        metin: '"Dolap hafifledi mi?" Hayır — dolabın kütlesi de ağırlığı da hiç değişmedi. Öyleyse değişen başka bir şey var.' },
      { bas: 'İlk aşamayı modelle',
        metin: 'Dolap durgunken sürtünme <strong>statiktir</strong> ve uygulanan kuvvete eşit büyür. Öğrenci kuvveti artırdıkça sürtünme de artıyor; denge hiç bozulmuyor, dolap kıpırdamıyor.' },
      { bas: 'Kopma eşiğini bul',
        metin: 'Statik sürtünmenin bir <strong>üst sınırı</strong> var: f<sub>s,maks</sub>. Tek kişinin kuvveti bu sınırın altında kaldığı sürece hiçbir şey olmaz. İki kişi olunca toplam kuvvet sınırı aştı ve dolap koptu.' },
      { bas: 'Kopma anında ne değişti?',
        metin: 'Dolap hareket etmeye başladığı anda sürtünme türü değişti: <strong>statikten kinetiğe</strong> geçti. Ve f<sub>k</sub> &lt; f<sub>s,maks</sub> olduğu için sürtünme <strong>aniden düştü</strong>.' },
      { bas: 'Sonucu çıkar',
        metin: 'Artık aşılması gereken direnç daha küçük. Tek kişinin kuvveti f<sub>k</sub>’yı aşmaya yettiği için öğrenci tek başına devam edebiliyor.' },
      { bas: 'Yorumla',
        metin: 'Hafifleyen şey dolap değil, <strong>sürtünme kuvveti</strong>. Aynı sebeple ağır bir valizi çekmeye başlamak, çekmeye devam etmekten zordur. Arabayı iterken de ilk kopuş en zor andır.' }
    ],
    secenekler: [
      'Dolabın ağırlığı hareket sırasında azalır',
      'Hareket başlayınca sürtünme statikten kinetiğe geçer ve f_k < f_s,maks olduğu için azalır',
      'Hareket başlayınca normal kuvvet azalır',
      'İkinci kişi dolabın kütlesini azaltmıştır',
      'Hareket sırasında sürtünme tamamen ortadan kalkar'
    ],
    dogru: 1,
    cozum: `
      <p>Dolabın kütlesi, ağırlığı ve normal kuvveti hiç değişmedi. Değişen tek şey
      <strong>sürtünmenin türü</strong>.</p>
      <ul>
        <li><strong>Hareketten önce:</strong> statik sürtünme, uygulanan kuvvete eşit büyüyor,
        üst sınırı f<sub>s,maks</sub></li>
        <li><strong>Hareketten sonra:</strong> kinetik sürtünme, sabit ve
        <strong>f<sub>k</sub> &lt; f<sub>s,maks</sub></strong></li>
      </ul>
      <p>Kopma anında sürtünme f<sub>s,maks</sub>’tan f<sub>k</sub>’ya <strong>düşer</strong>.
      Bu yüzden devam etmek başlamaktan kolaydır.</p>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>E şıkkı</strong> "hareket varsa sürtünme yok" gibi bir
        yanılgıya oynuyor — sürtünme kaybolmuyor, sadece küçülüyor. Kaybolsaydı dolap
        itmeyi bıraktığın anda durmaz, kaymaya devam ederdi.
        <br><strong>Günlük hayattaki eşleri:</strong> valizi çekmeye başlamak, kavanoz kapağını
        ilk kez çevirmek, arabayı iterek çalıştırmak. Hepsinde ilk kopuş en zor andır.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: B</strong></p>`
  },
  {
    baslik: 'ABS neden var?',
    govde: `
      <p>Otomobillerde <strong>ABS</strong> (kilitlenme önleyici fren sistemi) bulunur.
      Ani frende ABS, tekerlekleri tamamen kilitlemek yerine saniyede onlarca kez
      <strong>bırakıp tekrar sıkar</strong>. Böylece tekerlekler <em>kaymak yerine
      dönmeye devam eder</em>.</p>
      <p>Bir öğrenci itiraz ediyor: "Frende tekerleği tamamen kilitlesek daha çok sürtünme
      olur, araç daha çabuk durur."</p>
      <p><strong>Öğrenci haklı mı? ABS neden tekerleğin dönmesini sağlar?</strong></p>`,
    gorsel: `
      <svg viewBox="0 0 520 190" xmlns="http://www.w3.org/2000/svg" role="img"
           aria-label="Kilitlenen tekerlek kayarak kinetik sürtünme, dönen tekerlek statik sürtünme kullanır">
        <rect width="520" height="190" fill="#17223A"/>
        <rect x="0" y="150" width="520" height="40" fill="#3C3C3A"/>
        <g transform="translate(130,110)">
          <circle r="34" fill="#23262B" stroke="#7D8A99" stroke-width="3"/>
          <circle r="12" fill="#5F6B78"/>
          <path d="M-24 -24 L24 24 M24 -24 L-24 24" stroke="#FF6B6B" stroke-width="3"/>
          <path d="M-44 44 L44 44" stroke="#FF6B6B" stroke-width="3" stroke-dasharray="6 5"/>
        </g>
        <text x="130" y="42" fill="#FF6B6B" font-size="13" font-family="system-ui" text-anchor="middle">kilitli · KAYIYOR</text>
        <text x="130" y="60" fill="#6F84A8" font-size="11" font-family="system-ui" text-anchor="middle">kinetik sürtünme (küçük)</text>
        <g transform="translate(380,110)">
          <circle r="34" fill="#23262B" stroke="#7D8A99" stroke-width="3"/>
          <circle r="12" fill="#5F6B78"/>
          <path d="M0 -26 L0 -14 M22 -14 L13 -8 M-22 -14 L-13 -8 M0 26 L0 14" stroke="#35C08A" stroke-width="3"/>
          <path d="M28 -22 A 36 36 0 0 1 34 -4" stroke="#35C08A" stroke-width="2.4" fill="none"/>
          <path d="M34 4 L28 -8 L40 -8 Z" fill="#35C08A"/>
        </g>
        <text x="380" y="42" fill="#35C08A" font-size="13" font-family="system-ui" text-anchor="middle">ABS · DÖNÜYOR</text>
        <text x="380" y="60" fill="#6F84A8" font-size="11" font-family="system-ui" text-anchor="middle">statik sürtünme (büyük)</text>
      </svg>`,
    adimlar: [
      { bas: 'İki durumu ayır',
        metin: 'Tekerlek <strong>kilitlenirse</strong> lastik asfaltın üzerinde <em>kayar</em>. Tekerlek <strong>dönmeye devam ederse</strong> lastiğin yere değen noktası yere göre kaymaz — sadece temas eder ve kalkar.' },
      { bas: 'Her duruma doğru sürtünmeyi ata',
        metin: 'Kayma varsa <strong>kinetik sürtünme</strong> etki eder. Kayma yoksa yüzeyler arasında hâlâ <strong>statik sürtünme</strong> geçerlidir — çünkü temas noktası anlık olarak duruyordur.' },
      { bas: 'Hangisi büyük?',
        metin: 'Bu konunun temel sonucu: <strong>f<sub>k</sub> &lt; f<sub>s,maks</sub></strong>. Yani dönen tekerlek, kilitli tekerlekten <em>daha büyük</em> bir sürtünme kuvvetinden yararlanabilir.' },
      { bas: 'Öğrencinin iddiasını değerlendir',
        metin: 'Öğrenci <strong>yanılıyor</strong>. Kilitlemek sürtünmeyi artırmaz, tam tersine büyük olan statik sürtünmeyi kaybedip küçük olan kinetiğe düşürür. Fren mesafesi <em>uzar</em>.' },
      { bas: 'İkinci faydayı da gör',
        metin: 'Kayan tekerlek <strong>yönlendirilemez</strong> — direksiyonu çevirsen de araç düz kayar. ABS tekerleği döndürdüğü için sürücü frende bile manevra yapabilir. Bu, can güvenliği açısından fren mesafesi kadar önemlidir.' }
    ],
    secenekler: [
      'Öğrenci haklı, kilitli tekerlek daha çok sürtünme sağlar',
      'Öğrenci yanılıyor; dönen tekerlek statik sürtünmeden yararlanır ve statik sürtünme daha büyüktür',
      'İkisi de aynıdır, ABS sadece konfor içindir',
      'Kilitli tekerlekte sürtünme tamamen kaybolur',
      'ABS sürtünmeyi azaltarak lastik ömrünü uzatır'
    ],
    dogru: 1,
    cozum: `
      <p>Kilitli tekerlek asfaltta <strong>kayar</strong> ⟹ kinetik sürtünme (küçük).<br>
      Dönen tekerleğin temas noktası kaymaz ⟹ <strong>statik sürtünme</strong> (büyük).</p>
      <p>f<sub>k</sub> &lt; f<sub>s,maks</sub> olduğundan ABS’li araç <strong>daha kısa
      mesafede durur</strong>. Üstelik dönen tekerlek yönlendirilebilir; kayan tekerlek
      direksiyona tepki vermez.</p>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0">Bu soru "sürtünme kötüdür, azaltmak gerekir" ezberini kırar.
        Frende <strong>sürtünmeyi en büyük tutmak</strong> istersin — ABS tam olarak bunu yapar.
        <br>Aynı mantık kışın zincir takmakta, yarış lastiklerinin geniş olmasında,
        spor ayakkabı tabanlarında da işler.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: B</strong></p>`
  }
]

});
})();
