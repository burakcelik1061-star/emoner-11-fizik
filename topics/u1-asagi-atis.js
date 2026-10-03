(function () {
"use strict";
const F = window.F11;

/* ==========================================================================
   topics/u1-asagi-atis.js
   Konu 1.1 ek · Yukarıdan aşağıya atış   (kitapta 1.1.2 içinde geçer)

   Bu sayfanın asıl hedefi BAĞIL HIZ'dır. "Aşağı atmak" basit bir durum gibi
   görünür, ama cisim HAREKETLİ bir taşıyıcıdan atıldığında konu birden
   zorlaşır ve öğrencilerin çoğu burada hata yapar.
   ========================================================================== */

F.konuKaydet('u1-asagi-atis', {

ozet: `İlk hızı sıfırdan farklı olmak şartıyla <strong>aşağı doğru</strong> atılan cisimlerin
hareketidir. İlk bakışta en kolay durumdur: ilk hız harekete eklenir, cisim sürekli
hızlanır, tek fazlıdır. Ama bir püf noktası var — cisim <strong>hareketli bir taşıyıcıdan</strong>
atılıyorsa (balon, asansör, helikopter) <strong>bağıl hız</strong> devreye girer ve
"aşağı atılan" cisim yere göre <em>yukarı</em> gidiyor olabilir.`,

/* ------------------------------------------------------------- Kavram */
kavram: `
<h3>Tanım</h3>
<p><strong>Yukarıdan aşağıya atış:</strong> Bir cisme <strong>sıfırdan farklı</strong> bir ilk
hız <strong>aşağı yönde</strong> verilerek yapılan düşey harekettir. Cisim bırakılmaz,
<strong>aşağı doğru atılır</strong>. İlk hız sıfır olsaydı hareket serbest düşme olurdu.</p>

<div class="formul" style="max-width:360px;margin:14px 0;border-top-color:var(--b3)">
  <div class="fm" style="color:var(--b3)">ϑ₀ ≠ 0 &nbsp;ve&nbsp; aşağı yönlü</div>
  <div class="fm-ad">Yukarıdan aşağıya atışın şartı</div>
</div>

<table class="degisken-tablo">
  <thead><tr><th>Hareket tipi</th><th>İlk hız</th><th>Başlangıçta ne oluyor?</th><th>Hareketin yapısı</th></tr></thead>
  <tbody>
    <tr><td>Serbest düşme</td><td class="sembol">ϑ₀ = 0</td><td>Yok — cisim yalnızca <strong>bırakılır</strong></td><td>Tek fazlı, hızlanır</td></tr>
    <tr style="background:var(--surface-2)"><td><strong>Yukarıdan aşağıya atış</strong></td><td class="sembol">ϑ₀ ≠ 0, aşağı</td><td>Var — cisim <strong>aşağı doğru atılır</strong></td><td>Tek fazlı, hızlanır</td></tr>
    <tr><td>Aşağıdan yukarıya atış</td><td class="sembol">ϑ₀ ≠ 0, yukarı</td><td>Var — cisim <strong>yukarı doğru atılır</strong></td><td>İki fazlı: yavaşlar, durur, hızlanır</td></tr>
  </tbody>
</table>
<p style="margin-top:10px;color:var(--text-2)">Üçünün de <strong>ivmesi aynıdır: a = g, aşağı doğru.</strong>
Aralarındaki tek fark <strong>ilk hızdır</strong> — hareketi birbirinden ayıran şey budur.</p>

<h3 style="margin-top:22px">Basit durum: sabit bir noktadan aşağı atış</h3>
<p>Yukarı yönü pozitif seçtiğimizde aşağı atışta <strong>ϑ₀ negatiftir</strong>.
Hız ve ivme aynı yönde (ikisi de aşağı) olduğu için cisim <strong>baştan sona hızlanır</strong>.
Tek fazlı, en basit durumdur.</p>

<p>Aynı yükseklikten yapılan üç atışı karşılaştıralım:</p>
<table class="degisken-tablo">
  <thead><tr><th>Atış</th><th>İniş süresi</th><th>Çarpma hızı</th></tr></thead>
  <tbody>
    <tr><td>Aşağı (ϑ₀ = −10)</td><td>En kısa</td><td class="sembol">büyük</td></tr>
    <tr><td>Bırakma (ϑ₀ = 0)</td><td>Orta</td><td class="sembol">EN KÜÇÜK</td></tr>
    <tr><td>Yukarı (ϑ₀ = +10)</td><td>En uzun</td><td class="sembol">büyük — aşağıyla EŞİT</td></tr>
  </tbody>
</table>
<p style="margin-top:10px;color:var(--text-2)">Son satır şaşırtıcıdır: yukarı ve aşağı atışın
çarpma hızları <strong>eşittir</strong>, yalnızca süreleri farklıdır. Sebebi
ϑ² = ϑ₀² + 2gh formülünde ϑ₀’ın <strong>kareli</strong> girmesi — işareti kayboluyor.</p>

<h3 style="margin-top:22px">Zor durum: hareketli taşıyıcıdan atış</h3>
<div class="kutu dikkat" style="margin:14px 0">
  <div class="kutu-bas"><span class="ikon">⚠</span>Bu sayfanın asıl konusu</div>
  <p style="margin:0">Bir cisim hareketli bir taşıyıcıdan (balon, asansör, uçak, araba)
  atıldığında <strong>taşıyıcının hızını da yanında götürür</strong>:</p>
  <div class="formul" style="max-width:420px;margin:12px 0">
    <div class="fm">ϑ₀ (yere göre) = ϑ (taşıyıcı) + ϑ (taşıyıcıya göre)</div>
  </div>
  <p style="margin:0">Soruda verilen hız genellikle <strong>taşıyıcıya göredir</strong>.
  Onu doğrudan formüle sokarsan yanlış sonuç alırsın.</p>
</div>

<p><strong>Şaşırtıcı sonuç:</strong> Yukarı çıkan bir balondan taş "aşağı doğru" atıldığında
taş, yere göre hâlâ <strong>yukarı</strong> gidiyor olabilir. Balon +20 m/s ile çıkarken
taş balona göre 10 m/s aşağı atılırsa:</p>
<div class="formul" style="max-width:360px;margin:12px 0;border-top-color:var(--accent)">
  <div class="fm" style="color:var(--accent)">ϑ₀ = (+20) + (−10) = <strong>+10 m/s</strong></div>
</div>
<p>Taş yavaşladı ama <strong>yön değiştirmedi</strong>. Bir süre daha yükselir, sonra iner.</p>

<table class="degisken-tablo" style="margin-top:14px">
  <thead><tr><th>Balon +20 m/s · atış (balona göre)</th><th>ϑ₀ (yere göre)</th><th>Taş ne yapar?</th></tr></thead>
  <tbody>
    <tr><td>Serbest bırakılır (0)</td><td class="sembol">+20</td><td>Yukarı çıkmaya devam eder</td></tr>
    <tr><td>10 m/s aşağı</td><td class="sembol">+10</td><td>Daha yavaş yükselir</td></tr>
    <tr><td>20 m/s aşağı</td><td class="sembol">0</td><td>Bir an asılı kalır, sonra düşer</td></tr>
    <tr><td>30 m/s aşağı</td><td class="sembol">−10</td><td>Doğrudan aşağı gider</td></tr>
  </tbody>
</table>
<p style="margin-top:10px;color:var(--text-2)">Simülasyonda <strong>Atış (platforma göre)</strong>
kaydıracını −30’dan +30’a kaydır ve sağ paneldeki vektör toplamını izle. Dördüncü satıra
gelene kadar taş hep yukarı gidiyor.</p>`,

/* ---------------------------------------------------------- Formüller */
formuller: {
  liste: [
    { fm: 'ϑ₀ = ϑ<sub>taşıyıcı</sub> + ϑ<sub>bağıl</sub>', aciklama: 'Hareketli platformdan atışta ilk hız' },
    { fm: 'y = h₀ + ϑ₀·t − ½g·t²', aciklama: 'Konum (yukarı pozitif)' },
    { fm: 'h = ϑ₀·t + ½g·t²',      aciklama: 'Aşağı pozitif seçilirse — işaretsiz ve kolay' },
    { fm: 'ϑ = ϑ₀ + g·t',          aciklama: 'Aşağı pozitif seçimiyle hız' },
    { fm: 'ϑ² = ϑ₀² + 2g·h',       aciklama: 'Zaman geçmeyen ifade — ϑ₀ kareli girer' }
  ],
  degiskenler: [
    { sembol: 'ϑ₀',                     ad: 'Yere göre ilk hız',     birim: 'm/s' },
    { sembol: 'ϑ<sub>bağıl</sub>',      ad: 'Taşıyıcıya göre hız',   birim: 'm/s' },
    { sembol: 'ϑ<sub>taşıyıcı</sub>',   ad: 'Taşıyıcının yere göre hızı', birim: 'm/s' },
    { sembol: 'h₀',                     ad: 'Atış yüksekliği',       birim: 'm' }
  ]
},

/* ------------------------------------------------------------ Türetim */
turetim: {
  yollar: [
    {
      ad: 'Bağıl hız · hareketli platform',
      adimlar: [
        { baslik: 'Eylemsizliği hatırla',
          html: `<p>Yukarı çıkan bir balonun sepetindeki taş, balonla birlikte
                 <strong>20 m/s ile yukarı gidiyordur</strong>. Bu taşın <em>kendi hızıdır</em> —
                 balon onu taşıdığı için değil.</p>
                 <p>Newton I gereği taş, serbest kaldığı anda bu hızı korumaya çalışır.</p>` },

        { baslik: '"Aşağı atmak" ne demek?',
          html: `<p>Kişi taşı balona göre 10 m/s aşağı atıyorsa, taşın hızını
                 <strong>10 m/s azaltıyor</strong> demektir — sıfırlamıyor.</p>
                 <p>Taşın yere göre hızı, iki hızın <strong>vektörel toplamıdır</strong>:</p>
                 <div class="formul" style="max-width:400px">
                   <div class="fm">ϑ₀ = ϑ<sub>taşıyıcı</sub> + ϑ<sub>bağıl</sub></div>
                 </div>` },

        { baslik: 'İşaretlerle hesapla',
          html: `<p>Yukarı pozitif: balon +20, atış −10 (aşağı doğru).</p>
                 <div class="formul" style="max-width:340px;border-top-color:var(--accent)">
                   <div class="fm" style="color:var(--accent)">ϑ₀ = (+20) + (−10) = +10 m/s</div>
                 </div>
                 <p style="margin-top:12px"><strong>Sonuç pozitif</strong> — taş
                 "aşağı atılmasına rağmen" yere göre <strong>hâlâ yukarı gidiyor</strong>.</p>
                 <p style="color:var(--text-2)">Yön değiştirmesi için balona göre
                 20 m/s’den <em>hızlı</em> atılması gerekirdi.</p>` },

        { baslik: 'Kuralı genelleştir',
          html: `<div class="formul" style="max-width:440px;border-top-color:var(--accent)">
                   <div class="fm" style="color:var(--accent);font-size:.98em">
                     Taşıyıcıdan ayrılan cisim, taşıyıcının hızıyla yola çıkar
                   </div>
                 </div>
                 <p style="margin-top:14px">Bu kural her yerde işler:</p>
                 <ul>
                   <li>Uçaktan bırakılan paket, uçağın <strong>yatay</strong> hızını alır (1.2’de göreceğiz)</li>
                   <li>Yükselen asansörden düşen vida, asansörün <strong>yukarı</strong> hızını alır</li>
                   <li>Hareketli arabadan yukarı atılan top, tekrar arabaya düşer</li>
                   <li>Yürüyen bantta düşürülen eşya, bandın hızıyla ileri gider</li>
                 </ul>` }
      ]
    },
    {
      ad: 'İşaret seçimini kolaylaştır',
      adimlar: [
        { baslik: 'Sorun nerede?',
          html: `<p>Yukarı pozitif seçtiğinde aşağı atışta her şey negatif olur:
                 ϑ₀ negatif, g negatif, yer değiştirme negatif. Eksi işaretleriyle
                 boğuşmak hata kaynağıdır.</p>` },

        { baslik: 'Yönü hareketin lehine seç',
          html: `<p>Cisim <strong>baştan sona aşağı</strong> gidiyorsa
                 <strong>aşağıyı pozitif seç</strong>. O zaman hiçbir şey negatif olmaz:</p>
                 <div class="formul-serit">
                   <div class="formul"><div class="fm">h = ϑ₀·t + ½g·t²</div></div>
                   <div class="formul"><div class="fm">ϑ = ϑ₀ + g·t</div></div>
                 </div>
                 <p style="margin-top:10px;color:var(--text-2)">Formüllerdeki bütün işaretler
                 <strong>artı</strong>. İşlem gözle görülür biçimde kolaylaşır.</p>` },

        { baslik: 'Ne zaman kullanamazsın?',
          html: `<p>Cisim <strong>yön değiştiriyorsa</strong> (yukarı çıkıp sonra iniyorsa)
                 bu kısayol işe yaramaz — o zaman yukarıyı pozitif seçip tek denklemle çözmek
                 daha güvenlidir.</p>
                 <div class="kutu puf" style="margin-top:12px">
                   <p style="margin:0"><strong>Karar kuralı:</strong> Hareket tek yönlüyse
                   o yönü pozitif seç. Yön değişiyorsa yukarıyı pozitif seç ve tek denklem kur.
                   <br>İşaret seçimi <em>serbesttir</em> — işini kolaylaştıranı seç,
                   ama <strong>seçtikten sonra sonuna kadar sadık kal</strong>.</p>
                 </div>` },

        { baslik: 'Örnek üzerinde gör',
          html: `<p>80 m yükseklikten 10 m/s ile aşağı atılan taş yere kaç saniyede iner?</p>
                 <p><strong>Aşağı pozitif</strong> seçelim:</p>
                 <p>80 = 10t + 5t² ⟹ 5’e böl ⟹ t² + 2t − 16 = 0</p>
                 <p>t = (−2 + √(4 + 64))/2 = (−2 + √68)/2 ≈ <strong>3,12 s</strong></p>
                 <p style="color:var(--text-2)">Yukarı pozitif seçseydik aynı sonuca ulaşırdık
                 ama denklem 0 = 80 − 10t − 5t² olurdu ve üç eksi işaretiyle uğraşırdık.</p>` }
      ]
    }
  ]
},

/* -------------------------------------------------------- Simülasyon */
sim: F.simler['asagi-atis'],

/* ------------------------------------------------------- Püf noktası */
puf: {
  html: `
    <p><strong>1 · "Taşıyıcıya göre" ifadesini gördüğün an dur.</strong> Verilen hızı doğrudan
    formüle sokma. Önce yere göre ilk hızı bul:
    <code>ϑ₀ = ϑ<sub>taşıyıcı</sub> + ϑ<sub>bağıl</sub></code></p>

    <p><strong>2 · "Serbest bırakıldı" ≠ "ilk hız sıfır".</strong> Hareketli bir taşıyıcıdan
    serbest bırakılan cismin <em>taşıyıcıya göre</em> hızı sıfırdır, ama
    <strong>yere göre</strong> hızı taşıyıcının hızına eşittir.</p>

    <p><strong>3 · Aşağı hareket tek yönlüyse aşağıyı pozitif seç.</strong> Bütün işaretler
    artı olur: <code>h = ϑ₀t + ½gt²</code></p>

    <p><strong>4 · Saniye kuralı (g = 10):</strong> Aşağı atışta ilk saniyede alınan yol
    <strong>ϑ₀ + 5</strong>, sonra 10’ar 10’ar artar:</p>
    <div style="background:var(--surface-0);border-radius:var(--r-sm);padding:14px;margin:12px 0">
      <table class="degisken-tablo" style="margin:0">
        <thead><tr><th>ϑ₀ = 10 m/s aşağı</th><th>1. sn</th><th>2. sn</th><th>3. sn</th><th>4. sn</th></tr></thead>
        <tbody>
          <tr><td>O saniyedeki yol (m)</td><td class="sembol">15</td><td class="sembol">25</td><td class="sembol">35</td><td class="sembol">45</td></tr>
          <tr><td>Toplam yol (m)</td><td class="sembol">15</td><td class="sembol">40</td><td class="sembol">75</td><td class="sembol">120</td></tr>
        </tbody>
      </table>
      <p style="margin:10px 0 0;font-size:.86em;color:var(--text-3)">
        Seçeneklerde tam sayı varsa bu tabloyla soruyu formül kurmadan bitirebilirsin.
      </p>
    </div>

    <p><strong>5 · Yukarı ve aşağı atışın çarpma hızları eşittir.</strong> ϑ² = ϑ₀² + 2gh
    ifadesinde ϑ₀ kareli girdiği için işaret kaybolur. <strong>Süreler farklı, hızlar aynı.</strong></p>

    <p style="margin-bottom:0"><strong>6 · Bağıl hız işaretini tabloyla kontrol et.</strong>
    Taşıyıcı yukarı + , aşağı − ; atış yukarı + , aşağı − . İkisini <em>topla</em>, çıkarma.
    Çıkarma yapmak en sık yapılan hatadır.</p>`,

  ornekler: [
    {
      soru: `<p>80 m yükseklikten aşağı doğru 10 m/s hızla atılan bir taş yere kaç saniyede
             çarpar ve hangi hızla? (g = 10 m/s²)</p>`,
      taktikle: `<p>Saniye tablosunu kullan: 15, 40, 75, 120… 80 m, 3 ile 4 saniye arasında.</p>
                 <p>Kesin değer için aşağı pozitif seç: 80 = 10t + 5t² ⟹ t² + 2t − 16 = 0 ⟹
                 <strong>t ≈ 3,12 s</strong></p>
                 <p style="margin-bottom:0">Hız: ϑ² = 100 + 2·10·80 = 1700 ⟹ <strong>ϑ ≈ 41,2 m/s</strong></p>`,
      uzun: `<p>t = (−2 + √68)/2 ≈ 3,12 s</p>
             <p>ϑ = 10 + 10·3,12 ≈ 41,2 m/s</p>`
    },
    {
      soru: `<p>Yukarı doğru <strong>15 m/s</strong> hızla çıkan bir asansörün tavanından
             bir vida <strong>serbest kalıyor</strong>. Vidanın yere göre ilk hızı nedir?</p>`,
      taktikle: `<p>"Serbest kalma" ⟹ asansöre göre hız sıfır ⟹ ϑ<sub>bağıl</sub> = 0</p>
                 <p style="margin-bottom:0">ϑ₀ = 15 + 0 = <strong>+15 m/s (yukarı)</strong></p>`,
      uzun: `<p>Vida asansörle birlikte 15 m/s ile yukarı gidiyordu. Serbest kaldığında
             Newton I gereği bu hızı korur — yani bir süre daha <em>yükselir</em>,
             sonra düşmeye başlar.</p>
             <p style="color:var(--text-3)">"0" diyenler eylemsizliği hesaba katmamıştır;
             bu, bağıl hız konusunun en temel hatasıdır.</p>`
    },
    {
      soru: `<p>Aşağı doğru <strong>8 m/s</strong> hızla inen bir balondan, balona göre
             <strong>12 m/s yukarı</strong> bir taş atılıyor. Taşın yere göre ilk hızı nedir?</p>`,
      taktikle: `<p>Yukarı pozitif: balon <strong>−8</strong>, atış <strong>+12</strong></p>
                 <p style="margin-bottom:0">ϑ₀ = (−8) + (+12) = <strong>+4 m/s (yukarı)</strong></p>`,
      uzun: `<p>Balon aşağı indiği için hızı negatif. Taş balona göre yukarı atıldığı için pozitif.</p>
             <p>Toplam +4 m/s ⟹ taş yere göre yukarı gidiyor, ama sadece 4 m/s ile —
             balonun aşağı hareketi atışın çoğunu yemiş.</p>`
    }
  ]
},

/* ---------------------------------------------------- Zorlayıcı sorular */
osym: [
  {
    baslik: 'Balondan atılan taş',
    kaynak: 'Bağıl hız',
    govde: `
      <p>Bir sıcak hava balonu, yerden <strong>75 m</strong> yükseklikteyken
      <strong>20 m/s sabit hızla yukarı</strong> çıkmaktadır.</p>
      <p>Balondaki bir kişi, elindeki taşı <strong>balona göre 10 m/s hızla aşağı doğru</strong>
      atıyor.</p>
      <p>Buna göre taşın <strong>yere çarpma süresi</strong> ve <strong>çarpma hızı</strong>
      nedir? (g = 10 m/s², hava direnci ihmal ediliyor)</p>`,
    gorsel: `
      <svg viewBox="0 0 520 240" xmlns="http://www.w3.org/2000/svg" role="img"
           aria-label="75 metre yükseklikte 20 m/s ile çıkan balondan balona göre 10 m/s aşağı atılan taş">
        <rect width="520" height="240" fill="#17223A"/>
        <rect x="0" y="210" width="520" height="30" fill="#3B5323"/>
        <g transform="translate(150,70)">
          <ellipse cx="0" cy="0" rx="30" ry="36" fill="#D85A30"/>
          <ellipse cx="0" cy="0" rx="10" ry="36" fill="#E8C547"/>
          <path d="M-16 26 L-9 40 M16 26 L9 40" stroke="#8A5A28" stroke-width="1.4"/>
          <rect x="-13" y="40" width="26" height="17" rx="2" fill="#8A5A28"/>
          <circle cx="0" cy="34" r="5" fill="#FFD9B0"/>
        </g>
        <path d="M104 96 L104 46" stroke="#FF8FA3" stroke-width="2.8"/>
        <path d="M104 36 L97 52 L111 52 Z" fill="#FF8FA3"/>
        <text x="56" y="76" fill="#FF8FA3" font-size="13" font-family="system-ui">20 m/s ↑</text>
        <circle cx="196" cy="122" r="7" fill="#E24B4A"/>
        <path d="M196 132 L196 168" stroke="#A78BFA" stroke-width="2.6"/>
        <path d="M196 178 L189 162 L203 162 Z" fill="#A78BFA"/>
        <text x="212" y="156" fill="#A78BFA" font-size="13" font-family="system-ui">balona göre 10 m/s ↓</text>
        <path d="M330 126 V210" stroke="#6F84A8" stroke-width="1.2"/>
        <path d="M325 126 H335 M325 210 H335" stroke="#6F84A8" stroke-width="1.2"/>
        <text x="344" y="172" fill="#A7B8D4" font-size="14" font-family="system-ui">75 m</text>
        <path d="M150 126 H330" stroke="#4DA3FF" stroke-width="1.2" stroke-dasharray="5 5"/>
        <text x="500" y="34" fill="#FFB020" font-size="13" font-family="system-ui" text-anchor="end">ϑ₀ = ?</text>
      </svg>`,
    secenekler: [
      't = 5 s · çarpma hızı 40 m/s',
      't = 3 s · çarpma hızı 40 m/s',
      't = 5 s · çarpma hızı 50 m/s',
      't = 4 s · çarpma hızı 30 m/s',
      't = 2,5 s · çarpma hızı 35 m/s'
    ],
    dogru: 0,
    cozum: `
      <p><strong>Adım 1 — Yere göre ilk hızı bul.</strong> Bu sorunun tamamı burada düğümleniyor.</p>
      <p>Taş, atılmadan önce balonla birlikte <strong>+20 m/s</strong> ile yukarı gidiyordu.
      Balona göre 10 m/s aşağı atılması, hızını 10 azaltır — sıfırlamaz:</p>
      <div class="formul" style="max-width:340px">
        <div class="fm">ϑ₀ = (+20) + (−10) = <strong>+10 m/s</strong></div>
      </div>
      <p style="margin-top:10px"><strong>Taş "aşağı atılmasına rağmen" yukarı gidiyor.</strong>
      Önce 5 m daha yükselip 80 m’de tepe yapar, sonra iner.</p>

      <p><strong>Adım 2 — Yere iniş süresi.</strong> Yukarı pozitif, sıfır zeminde:</p>
      <p>0 = 75 + 10t − 5t² ⟹ 5’e böl ⟹ t² − 2t − 15 = 0 ⟹ (t−5)(t+3) = 0 ⟹
      <strong>t = 5 s</strong></p>

      <p><strong>Adım 3 — Çarpma hızı.</strong></p>
      <p>ϑ = ϑ₀ − g·t = 10 − 10·5 = <strong>−40 m/s</strong> (büyüklük 40 m/s, aşağı)</p>

      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>Çeldiricilerin her biri belirli bir hatayı yakalıyor:</strong></p>
        <ul style="margin:8px 0 0">
          <li><strong>B (t = 3 s):</strong> ϑ₀’ı <strong>−10 m/s</strong> alanlar. "Aşağı atıldı,
          öyleyse aşağı gidiyor" diye düşünenler buraya düşer. <em>En yaygın hata budur.</em></li>
          <li><strong>C (50 m/s):</strong> İki hızı toplarken işareti karıştırıp ϑ₀ = −30 alanlar.</li>
          <li><strong>D (t = 4 s):</strong> Balonun hızını tamamen yok sayıp serbest bırakma sananlar.</li>
        </ul>
        <p style="margin:8px 0 0"><strong>Sağlama:</strong> Simülasyonun varsayılan değerleri
        tam olarak bu sorudur. <strong>Oynat</strong>’a bas — taşın önce <em>yükseldiğini</em>,
        80 m’de tepe yaptığını, sonra 5. saniyede 40 m/s ile yere çarptığını göreceksin.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: A</strong></p>`
  },
  {
    baslik: 'Hangi durumda taş aşağı gider?',
    kaynak: 'Bağıl hız',
    govde: `
      <p>Bir balon <strong>yukarı doğru 20 m/s</strong> hızla çıkarken içindeki kişi bir taşı
      balona göre <strong>ϑ<sub>b</sub></strong> hızıyla <strong>aşağı</strong> doğru atıyor.</p>
      <p>Taşın <strong>atıldığı andan itibaren hiç yükselmeden</strong> doğrudan aşağı
      gitmesi için ϑ<sub>b</sub> en az kaç m/s olmalıdır?</p>`,
    secenekler: [
      '10 m/s', '20 m/s', '30 m/s', '40 m/s', 'Hiçbir değerde mümkün değildir'
    ],
    dogru: 1,
    cozum: `
      <p>Taşın yere göre ilk hızı (yukarı pozitif):</p>
      <div class="formul" style="max-width:300px"><div class="fm">ϑ₀ = (+20) + (−ϑ<sub>b</sub>)</div></div>
      <p>Taşın <strong>hiç yükselmemesi</strong> için ϑ₀ ≤ 0 olmalı:</p>
      <p>20 − ϑ<sub>b</sub> ≤ 0 ⟹ <strong>ϑ<sub>b</sub> ≥ 20 m/s</strong></p>
      <p>En küçük değer <strong>20 m/s</strong>’dir. Tam 20 m/s’de ϑ₀ = 0 olur — taş bir an
      havada asılı kalır (yere göre hızı sıfırdır), sonra düşmeye başlar.</p>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>Bu soru bağıl hızın "eşik" hâlidir.</strong> Taşın yön
        değiştirmesi için atış hızının, taşıyıcının hızını <strong>yenmesi</strong> gerekir.
        <br><strong>A şıkkı (10 m/s)</strong> bir önceki soruda gördüğümüz durumdur — orada taş
        hâlâ +10 m/s ile yukarı gidiyordu.
        <br><strong>Simülasyonla dene:</strong> Platform hızını 20, atış hızını sırayla
        −10, −20, −25 yap. Rozetteki "Taş YUKARI / AŞAĞI" bilgisinin tam 20’de değiştiğini gör.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: B) 20 m/s</strong></p>`
  }
],

/* --------------------------------------------- Bağlam temelli sorular */
baglam: [
  {
    baslik: 'Helikopterden bırakılan yardım paketi',
    govde: `
      <p>Bir arama kurtarma helikopteri, dağda mahsur kalan gruba yardım paketi bırakacak.
      Helikopter <strong>yerden 80 m</strong> yükseklikte ve <strong>yukarı doğru 5 m/s</strong>
      hızla yükselirken pilot paketi <strong>serbest bırakıyor</strong> (aşağı doğru itmiyor).</p>
      <p>Yerdeki ekip, paketi karşılamak için kaç saniyeleri olduğunu bilmek istiyor.</p>
      <p><strong>Paket yere kaç saniyede ulaşır? Serbest bırakılmasına rağmen paket
      önce yükselir mi?</strong> (g = 10 m/s²)</p>`,
    gorsel: `
      <svg viewBox="0 0 520 230" xmlns="http://www.w3.org/2000/svg" role="img"
           aria-label="Yükselen helikopterden serbest bırakılan paketin önce yükselip sonra düşmesi">
        <rect width="520" height="230" fill="#17223A"/>
        <rect x="0" y="200" width="520" height="30" fill="#4A5230"/>
        <g transform="translate(150,52)">
          <ellipse cx="0" cy="0" rx="34" ry="16" fill="#3A4E76"/>
          <path d="M26 2 L74 8 L74 16 L26 12 Z" fill="#3A4E76"/>
          <path d="M-46 -20 H46" stroke="#9AA5B1" stroke-width="3"/>
          <path d="M0 -20 V-12" stroke="#7D8A99" stroke-width="3"/>
          <path d="M-20 16 H20" stroke="#7D8A99" stroke-width="3"/>
        </g>
        <path d="M96 60 L96 24" stroke="#FF8FA3" stroke-width="2.6"/>
        <path d="M96 16 L90 30 L102 30 Z" fill="#FF8FA3"/>
        <text x="56" y="50" fill="#FF8FA3" font-size="12" font-family="system-ui">5 m/s ↑</text>
        <rect x="186" y="66" width="26" height="20" rx="3" fill="#C98B4B"/>
        <path d="M199 62 L199 40" stroke="#35C08A" stroke-width="2.4" stroke-dasharray="3 4"/>
        <path d="M199 32 L193 46 L205 46 Z" fill="#35C08A"/>
        <text x="214" y="42" fill="#35C08A" font-size="11" font-family="system-ui">önce yükselir</text>
        <path d="M199 92 L199 180" stroke="#E24B4A" stroke-width="2.4" stroke-dasharray="4 5"/>
        <path d="M199 192 L192 176 L206 176 Z" fill="#E24B4A"/>
        <text x="214" y="146" fill="#E24B4A" font-size="11" font-family="system-ui">sonra düşer</text>
        <path d="M340 76 V200" stroke="#6F84A8" stroke-width="1.2"/>
        <path d="M335 76 H345 M335 200 H345" stroke="#6F84A8" stroke-width="1.2"/>
        <text x="354" y="142" fill="#A7B8D4" font-size="14" font-family="system-ui">80 m</text>
      </svg>`,
    adimlar: [
      { bas: 'Kritik kelimeyi yakala',
        metin: '"<strong>Serbest bırakıyor</strong>" — yani helikoptere göre ilk hız <strong>sıfır</strong>. Ama bu, yere göre ilk hızın sıfır olduğu anlamına <em>gelmez</em>.' },
      { bas: 'Bağıl hızı topla',
        metin: 'ϑ₀ = ϑ<sub>helikopter</sub> + ϑ<sub>bağıl</sub> = (+5) + 0 = <strong>+5 m/s (yukarı)</strong><br>Paket helikopterle birlikte yükseliyordu ve eylemsizlik gereği o hızı koruyor.' },
      { bas: 'Sorunun ikinci kısmını cevapla',
        metin: 'ϑ₀ pozitif olduğuna göre <strong>evet, paket önce yükselir</strong>. Tepeye çıkış: t = 5/10 = 0,5 s. Çıktığı ek yükseklik: 5²/(2·10) = 1,25 m ⟹ tepe 81,25 m.' },
      { bas: 'İniş denklemini kur',
        metin: 'Yukarı pozitif, sıfır zeminde:<br>0 = 80 + 5t − 5t² ⟹ 5’e böl ⟹ <strong>t² − t − 16 = 0</strong>' },
      { bas: 'Çöz',
        metin: 't = (1 + √(1 + 64))/2 = (1 + √65)/2 ≈ (1 + 8,06)/2 ≈ <strong>4,53 s</strong>' },
      { bas: 'Yorumla',
        metin: 'Helikopter dursaydı süre √(2·80/10) = 4 s olurdu. Yükseliyor olması ekibe yarım saniyeden fazla ek süre kazandırdı. Helikopter <em>alçalıyor</em> olsaydı süre 4 saniyenin altına inerdi — bu yüzden bırakma anındaki düşey hız, operasyonun bir parçasıdır.' }
    ],
    secenekler: [
      'Yükselmez; t = 4,00 s',
      'Önce 1,25 m yükselir; t ≈ 4,53 s',
      'Önce yükselir; t = 5,00 s',
      'Yükselmez; t ≈ 3,50 s',
      'Önce 5 m yükselir; t = 4,00 s'
    ],
    dogru: 1,
    cozum: `
      <p>"Serbest bırakma" helikoptere göre ilk hızın sıfır olmasıdır — yere göre değil.</p>
      <p>ϑ₀ = +5 + 0 = <strong>+5 m/s (yukarı)</strong> ⟹ paket önce yükselir.</p>
      <p><strong>Ek yükseklik:</strong> ϑ₀²/(2g) = 25/20 = <strong>1,25 m</strong></p>
      <p><strong>İniş süresi:</strong> 0 = 80 + 5t − 5t² ⟹ t² − t − 16 = 0 ⟹
      t = (1 + √65)/2 ≈ <strong>4,53 s</strong></p>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>A şıkkı (4,00 s)</strong> helikopterin hızını yok sayanlar için —
        bu sorudaki asıl tuzak odur. "Serbest bırakıldı" ifadesi ϑ₀ = 0 gibi okunuyor,
        oysa o sıfır <em>helikoptere göredir</em>.
        <br><strong>Genel kural:</strong> Hareketli bir taşıyıcıdan bırakılan her cisim,
        taşıyıcının hızıyla yola çıkar.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: B</strong></p>`
  },
  {
    baslik: 'Kuyuya atılan iki taş',
    govde: `
      <p>Bir jeoloji ekibi, kurumuş bir kuyunun derinliğini ölçmek istiyor. Ellerinde
      kronometre var ama metre yok.</p>
      <p>İlk denemede taşı <strong>serbest bırakıyorlar</strong> ve dibe çarpma sesini
      <strong>3 saniye</strong> sonra duyuyorlar.</p>
      <p>Bir ekip üyesi şunu öneriyor: <em>"Taşı aşağı doğru 10 m/s ile atsaydık daha çabuk
      inerdi, ölçüm daha hassas olurdu."</em></p>
      <p><strong>Kuyunun derinliği nedir ve ikinci yöntemde süre ne olurdu?</strong>
      (g = 10 m/s², sesin yayılma süresi ihmal ediliyor)</p>`,
    gorsel: `
      <svg viewBox="0 0 520 230" xmlns="http://www.w3.org/2000/svg" role="img"
           aria-label="Kuyuya serbest bırakılan ve aşağı atılan iki taşın karşılaştırması">
        <rect width="520" height="230" fill="#17223A"/>
        <rect x="0" y="40" width="520" height="190" fill="#5A4632"/>
        <rect x="150" y="40" width="90" height="190" fill="#0E1726"/>
        <rect x="300" y="40" width="90" height="190" fill="#0E1726"/>
        <rect x="142" y="32" width="106" height="12" rx="4" fill="#8A6B4A"/>
        <rect x="292" y="32" width="106" height="12" rx="4" fill="#8A6B4A"/>
        <circle cx="195" cy="58" r="7" fill="#E24B4A"/>
        <path d="M195 72 L195 186" stroke="#4DA3FF" stroke-width="2" stroke-dasharray="4 5"/>
        <path d="M195 198 L188 182 L202 182 Z" fill="#4DA3FF"/>
        <text x="195" y="22" fill="#4DA3FF" font-size="12" font-family="system-ui" text-anchor="middle">bırakma · ϑ₀ = 0</text>
        <circle cx="345" cy="58" r="7" fill="#E24B4A"/>
        <path d="M345 50 L345 30" stroke="#A78BFA" stroke-width="2.4"/>
        <path d="M345 66 L345 186" stroke="#A78BFA" stroke-width="2" stroke-dasharray="4 5"/>
        <path d="M345 198 L338 182 L352 182 Z" fill="#A78BFA"/>
        <text x="345" y="22" fill="#A78BFA" font-size="12" font-family="system-ui" text-anchor="middle">atış · ϑ₀ = 10 ↓</text>
        <rect x="150" y="206" width="90" height="24" fill="#1D3A52"/>
        <rect x="300" y="206" width="90" height="24" fill="#1D3A52"/>
        <text x="444" y="124" fill="#A7B8D4" font-size="14" font-family="system-ui">h = ?</text>
        <text x="40" y="124" fill="#6F84A8" font-size="12" font-family="system-ui">t₁ = 3 s</text>
      </svg>`,
    adimlar: [
      { bas: 'Birinci deneyden derinliği bul',
        metin: 'Serbest bırakma ⟹ ϑ₀ = 0 ⟹ h = ½·g·t² = ½ · 10 · 3² = <strong>45 m</strong>' },
      { bas: 'İkinci yöntemi modelle',
        metin: 'Aynı kuyu (h = 45 m), ama ϑ₀ = 10 m/s aşağı. Hareket tek yönlü olduğu için <strong>aşağı yönü pozitif</strong> seçelim: 45 = 10t + 5t²' },
      { bas: 'Denklemi düzenle',
        metin: '5t² + 10t − 45 = 0 ⟹ 5’e böl ⟹ <strong>t² + 2t − 9 = 0</strong>' },
      { bas: 'Çöz',
        metin: 't = (−2 + √(4 + 36))/2 = (−2 + √40)/2 ≈ (−2 + 6,32)/2 ≈ <strong>2,16 s</strong>' },
      { bas: 'Öneriyi değerlendir',
        metin: 'Süre 3 s’den 2,16 s’ye düşüyor — ekip üyesi <strong>süre konusunda haklı</strong>. Ama ölçüm <em>hassasiyeti</em> açısından haksız: kısa süreyi kronometreyle ölçmek daha zordur ve atış hızını tam 10 m/s tutturmak neredeyse imkânsızdır.' },
      { bas: 'Daha iyi öneriyi çıkar',
        metin: 'Serbest bırakma yöntemi <strong>daha güvenilirdir</strong>, çünkü tek bilinmeyen süredir ve ϑ₀ = 0 kesindir. İyi ölçüm, az sayıda ve kontrol edilebilir değişkenle yapılandır.' }
    ],
    secenekler: [
      'h = 45 m · ikinci yöntemde t ≈ 2,16 s',
      'h = 45 m · ikinci yöntemde t = 1,50 s',
      'h = 90 m · ikinci yöntemde t ≈ 3,00 s',
      'h = 45 m · ikinci yöntemde t ≈ 2,50 s',
      'h = 15 m · ikinci yöntemde t ≈ 1,00 s'
    ],
    dogru: 0,
    cozum: `
      <p><strong>Derinlik:</strong> h = ½·g·t² = ½ · 10 · 9 = <strong>45 m</strong></p>
      <p><strong>İkinci yöntem</strong> (aşağı pozitif): 45 = 10t + 5t² ⟹ t² + 2t − 9 = 0</p>
      <p>t = (−2 + √40)/2 ≈ <strong>2,16 s</strong></p>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>B şıkkı (1,50 s)</strong> "hız iki katına çıktı, süre yarıya
        indi" diye düşünenler için. Serbest düşmede böyle bir doğrusal ilişki yoktur —
        yol süreyle değil <strong>sürenin karesiyle</strong> ilişkilidir.
        <br><strong>İşaret ipucu:</strong> Cisim baştan sona aşağı gidiyorsa <strong>aşağı yönü
        pozitif</strong> seçmek denklemi sadeleştirir; hiç eksi işaretle uğraşmazsın.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: A</strong></p>`
  }
]

});
})();
