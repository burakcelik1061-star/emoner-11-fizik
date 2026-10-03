(function () {
"use strict";
const F = window.F11;

/* ==========================================================================
   topics/u1-iki-boyutta-hareket.js
   Konu 1.2 · İki boyutta sabit ivmeli hareket   (MEB 11, s. 30-39)
   ========================================================================== */

F.konuKaydet('u1-iki-boyutta-hareket', {

ozet: `Eğrisel yörünge karmaşık görünür ama aslında değildir. Çünkü bu hareket,
<strong>birbirinden tamamen bağımsız iki basit hareketin toplamıdır</strong>:
yatayda sabit hızlı hareket, düşeyde serbest düşme. İkisini ayrı ayrı çözer,
sonucu birleştirirsin.`,

/* ------------------------------------------------------------- Kavram */
kavram: `
<p>Bir top fırlattığında top eğri bir yol izler. Bu eğriyi tek parça olarak çözmeye
çalışmak zordur. Fizikçilerin çözümü şu: <strong>hareketi iki eksene ayır</strong>.</p>

<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:12px;margin:16px 0">
  <div style="background:var(--surface-0);border:1px solid var(--border);border-top:2px solid #FF7A45;border-radius:var(--r-sm);padding:14px 16px">
    <div style="color:#FF7A45;font-weight:700;font-size:.85em;margin-bottom:6px">YATAY EKSEN (x)</div>
    <p style="margin:0 0 6px"><strong>Hiçbir kuvvet yok</strong> (hava direnci ihmal).</p>
    <p style="margin:0">İvme sıfır ⟹ hız hiç değişmez ⟹ <strong>sabit hızlı hareket</strong></p>
    <p style="margin:8px 0 0;font-family:var(--font-mono);color:#fff">x = ϑ₀x · t</p>
  </div>
  <div style="background:var(--surface-0);border:1px solid var(--border);border-top:2px solid #35C08A;border-radius:var(--r-sm);padding:14px 16px">
    <div style="color:#35C08A;font-weight:700;font-size:.85em;margin-bottom:6px">DÜŞEY EKSEN (y)</div>
    <p style="margin:0 0 6px">Yalnızca <strong>yer çekimi</strong> etki eder.</p>
    <p style="margin:0">İvme = g ⟹ <strong>serbest düşme</strong> — 1.1'de öğrendiğin hareketin aynısı</p>
    <p style="margin:8px 0 0;font-family:var(--font-mono);color:#fff">y = h₀ + ϑ₀y·t − ½g·t²</p>
  </div>
</div>

<h3 style="margin-top:20px">Bağımsızlık ne demek?</h3>
<p>İki eksendeki hareketler <strong>birbirini hiç etkilemez</strong>. Bu soyut bir iddia değil,
deneyle gösterilebilir bir gerçektir:</p>

<div class="kutu puf" style="margin:14px 0">
  <div class="kutu-bas"><span class="ikon">🎯</span>Kitabın Görsel 1.6'sı</div>
  <p style="margin:0">Aynı yükseklikten biri <strong>yatay fırlatılan</strong>, diğeri
  <strong>ilk hızsız bırakılan</strong> iki top <strong>aynı anda yere iner</strong>.
  Fırlatılan top yatayda metrelerce yol alır, ama düşeydeki hikâyesi diğeriyle
  birebir aynıdır.</p>
  <p style="margin:8px 0 0">Aşağıdaki simülasyonda yeşil top bu karşılaştırma topudur.
  Aralarındaki yeşil kesikli çizgi hep yataydır — yani ikisi hep aynı yüksekliktedir.
  Açıyı 0° yaparsan kitaptaki görselin birebir aynısını elde edersin.</p>
</div>

<p><strong>Pratik sonucu:</strong> Yatay hızı artırmak cismin havada kalma süresini
<em>değiştirmez</em>. Sadece daha uzağa düşer. Süreyi belirleyen tek şey düşey harekettir.</p>

<h3 style="margin-top:20px">İlk hızı bileşenlere ayırmak</h3>
<p>Cisim yatayla α açısıyla ϑ₀ hızında fırlatılıyorsa, bu hızın eksenlerdeki gölgeleri:</p>
<div class="formul-serit" style="margin:12px 0">
  <div class="formul"><div class="fm">ϑ₀x = ϑ₀ · cos α</div><div class="aciklama">yatay bileşen — sabit kalır</div></div>
  <div class="formul"><div class="fm">ϑ₀y = ϑ₀ · sin α</div><div class="aciklama">düşey bileşen — g ile azalır</div></div>
</div>
<p style="color:var(--text-2)">Sınavda α genellikle <strong>37°, 45° veya 53°</strong> verilir
ve sin/cos değerleri soruda yazar: sin37° = cos53° = 0,6 · cos37° = sin53° = 0,8 ·
sin45° = cos45° = √2/2</p>`,

/* ---------------------------------------------------------- Formüller */
formuller: {
  liste: [
    { fm: 'ϑ₀x = ϑ₀·cos α',    aciklama: 'Yatay bileşen, hareket boyunca değişmez' },
    { fm: 'ϑ₀y = ϑ₀·sin α',    aciklama: 'Düşey bileşen, serbest düşme kurallarına uyar' },
    { fm: 'x = ϑ₀x · t',        aciklama: 'Yatayda sabit hız' },
    { fm: 'ϑy = ϑ₀y − g·t',     aciklama: 'Düşey hız zamanla azalır, sonra negatifleşir' },
    { fm: 'h_max = ϑ₀y² / (2g)', aciklama: 'Çıkılan en yüksek nokta (atış seviyesinden)' },
    { fm: 'ϑ = √(ϑx² + ϑy²)',   aciklama: 'Herhangi bir andaki bileşke hız' }
  ],
  degiskenler: [
    { sembol: 'ϑ₀',  ad: 'İlk hızın büyüklüğü',      birim: 'm/s' },
    { sembol: 'α',   ad: 'Yatayla yapılan açı',      birim: '°' },
    { sembol: 'ϑ₀x', ad: 'İlk hızın yatay bileşeni', birim: 'm/s' },
    { sembol: 'ϑ₀y', ad: 'İlk hızın düşey bileşeni', birim: 'm/s' },
    { sembol: 'x',   ad: 'Yatay yer değiştirme',     birim: 'm' },
    { sembol: 't',   ad: 'Uçuş süresi',              birim: 's' }
  ]
},

/* ------------------------------------------------------------ Türetim */
turetim: {
  yollar: [
    {
      ad: 'Bileşenlere ayırma',
      adimlar: [
        { baslik: 'İlk hızı iki gölgeye ayır',
          html: `<p>ϑ₀ hızı yatayla α açısı yapıyorsa, bir dik üçgenin hipotenüsü gibidir.
                 Dik kenarları bileşenlerdir:</p>
                 <div class="formul-serit">
                   <div class="formul"><div class="fm">ϑ₀x = ϑ₀·cos α</div></div>
                   <div class="formul"><div class="fm">ϑ₀y = ϑ₀·sin α</div></div>
                 </div>
                 <p style="margin-top:10px;color:var(--text-2)">Buradan sonra ϑ₀'ı ve α'yı
                 <strong>tamamen unut</strong>. Artık elinde iki ayrı, çok basit hareket var.</p>` },

        { baslik: 'Yatay eksende ne oluyor?',
          html: `<p>Hava direnci ihmal edildiğine göre yatayda cisme <strong>hiçbir kuvvet
                 etki etmiyor</strong>. Kuvvet yoksa ivme yoktur:</p>
                 <p>a<sub>x</sub> = 0 ⟹ ϑx sabit ⟹ <strong>ϑx = ϑ₀x (hep)</strong></p>
                 <div class="formul" style="max-width:220px"><div class="fm">x = ϑ₀x · t</div></div>
                 <p style="margin-top:10px">Yatay hareket, 9. sınıfta öğrendiğin
                 <strong>düzgün doğrusal hareketin</strong> ta kendisi.</p>` },

        { baslik: 'Düşey eksende ne oluyor?',
          html: `<p>Düşeyde tek kuvvet ağırlık, tek ivme g. Bu <strong>tam olarak 1.1'de
                 çalıştığın serbest düşmedir</strong> — sadece ilk hız ϑ₀y:</p>
                 <div class="formul-serit">
                   <div class="formul"><div class="fm">y = h₀ + ϑ₀y·t − ½g·t²</div></div>
                   <div class="formul"><div class="fm">ϑy = ϑ₀y − g·t</div></div>
                 </div>
                 <p style="margin-top:10px;color:var(--text-2)">Yeni formül yok. 1.1'in
                 formüllerini ϑ₀ yerine ϑ₀y ile kullanıyorsun.</p>` },

        { baslik: 'İkisini zamanla birleştir',
          html: `<p>İki hareketin <strong>tek ortak noktası zamandır</strong>. Aynı saat
                 ikisi için de işler. Bu yüzden çözüm hep şu sırayla gider:</p>
                 <ol>
                   <li><strong>Düşey hareketten süreyi bul.</strong> (Uçuş süresi, tepeye çıkış süresi…)</li>
                   <li><strong>O süreyi yatay harekette kullan.</strong> x = ϑ₀x · t</li>
                 </ol>
                 <div class="kutu puf" style="margin-top:12px">
                   <p style="margin:0">Atış sorularının <strong>%90'ı</strong> bu iki adımla çözülür.
                   Takıldığında kendine sor: "Süreyi hangi eksenden bulabilirim?" Cevap
                   neredeyse her zaman <strong>düşey eksendir</strong>.</p>
                 </div>` }
      ]
    },
    {
      ad: 'Menzil formülünü çıkar',
      adimlar: [
        { baslik: 'Uçuş süresini bul (aynı seviyeye iniş)',
          html: `<p>Cisim yerden atılıp yine yere iniyorsa (h₀ = 0), düşey yer değiştirme
                 sıfırdır:</p>
                 <p>0 = ϑ₀y·t − ½g·t² ⟹ t·(ϑ₀y − ½g·t) = 0</p>
                 <p>t = 0 başlangıç anı; diğer kök uçuş süresidir:</p>
                 <div class="formul" style="max-width:220px"><div class="fm">t<sub>uçuş</sub> = 2ϑ₀y / g</div></div>
                 <p style="margin-top:10px;color:var(--text-2)">Dikkat: bu süre yalnızca
                 <strong>düşey bileşene</strong> bağlı. Yatay hızın süreye hiçbir etkisi yok.</p>` },

        { baslik: 'Yatay yolu yaz',
          html: `<p>Yatayda sabit hız olduğuna göre menzil = hız × süre:</p>
                 <p>x = ϑ₀x · t<sub>uçuş</sub> = (ϑ₀·cos α) · (2·ϑ₀·sin α / g)</p>
                 <div class="formul" style="max-width:300px"><div class="fm">x = 2ϑ₀²·sin α·cos α / g</div></div>` },

        { baslik: 'Trigonometrik özdeşliği kullan',
          html: `<p>Matematikten: <strong>2·sin α·cos α = sin 2α</strong></p>
                 <div class="formul" style="max-width:280px;border-top-color:var(--accent)">
                   <div class="fm" style="color:var(--accent)">x<sub>menzil</sub> = ϑ₀²·sin 2α / g</div>
                 </div>
                 <p style="margin-top:12px;color:var(--text-2)">Bu formül müfredatta zorunlu
                 değil, ama iki sonucu <strong>anında</strong> verdiği için bilmeye değer.</p>` },

        { baslik: 'Formülün söylediği iki şey',
          html: `<p><strong>1 · Menzil en fazla 45°'de olur.</strong> Çünkü sin2α en büyük değerini
                 (1) 2α = 90°, yani α = 45° iken alır.</p>
                 <p><strong>2 · Tümler açılar aynı menzili verir.</strong> sin2α = sin(180°−2α)
                 olduğundan α ile (90°−α) aynı sonucu verir:</p>
                 <ul>
                   <li>30° ve 60° → aynı menzil</li>
                   <li>37° ve 53° → aynı menzil</li>
                   <li>40° ve 50° → aynı menzil</li>
                 </ul>
                 <div class="kutu puf" style="margin-top:12px">
                   <p style="margin:0">Simülasyonda ϑ₀'ı sabit tutup açıyı 37° ve 53° yap.
                   Menzil aynı çıkar — ama yörünge şekli ve uçuş süresi farklıdır.
                   Büyük açı daha yükseğe çıkar ve havada daha uzun kalır.</p>
                 </div>` }
      ]
    },
    {
      ad: 'Yatay atış · özel hâl',
      adimlar: [
        { baslik: 'α = 0 koy, ne kalıyor?',
          html: `<p>Cisim yatay olarak fırlatılıyorsa α = 0'dır:</p>
                 <p>ϑ₀x = ϑ₀·cos0° = <strong>ϑ₀</strong> &nbsp;&nbsp;·&nbsp;&nbsp;
                    ϑ₀y = ϑ₀·sin0° = <strong>0</strong></p>
                 <p>Yani <strong>düşeydeki ilk hız sıfırdır</strong>. Düşey hareket, ilk hızsız
                 serbest düşmenin ta kendisine dönüşür.</p>` },

        { baslik: 'Süreyi yalnızca yükseklik belirler',
          html: `<p>Düşeyde ϑ₀y = 0 olduğuna göre h yüksekliğinden düşme süresi:</p>
                 <p>h = ½·g·t² ⟹</p>
                 <div class="formul" style="max-width:220px;border-top-color:var(--accent)">
                   <div class="fm" style="color:var(--accent)">t = √(2h / g)</div>
                 </div>
                 <p style="margin-top:12px"><strong>Bu ifadede ϑ₀ yok.</strong> Topu ne kadar
                 hızlı fırlatırsan fırlat, yere iniş süresi değişmez.</p>
                 <div class="kutu dikkat" style="margin-top:12px">
                   <p style="margin:0">Kitabın Görsel 1.6'sının matematiksel ispatı tam olarak budur.
                   Bırakılan topun süresi de √(2h/g), fırlatılan topunki de. Eşit.</p>
                 </div>` },

        { baslik: 'Yatay uzaklığı bul',
          html: `<p>Süreyi yatay harekette kullan:</p>
                 <div class="formul" style="max-width:300px;border-top-color:var(--accent)">
                   <div class="fm" style="color:var(--accent)">x = ϑ₀ · √(2h / g)</div>
                 </div>
                 <p style="margin-top:12px">Yatay atışta sorulacak her şey bu iki formülde:
                 süre yükseklikten, uzaklık süreden gelir.</p>
                 <p style="color:var(--text-2)">Yere çarpma hızı gerekirse:
                 ϑ = √(ϑ₀² + (g·t)²) — iki bileşenin Pisagor'u.</p>` }
      ]
    }
  ]
},

/* -------------------------------------------------------- Simülasyon */
sim: F.simler['atislar'],

/* ------------------------------------------------------- Püf noktası */
puf: {
  html: `
    <p><strong>1 · Tepe noktada hız SIFIR DEĞİLDİR.</strong> Bu konunun en çok puan kaybettiren
    tuzağı. Tepede yalnızca <em>düşey</em> bileşen sıfırlanır; yatay bileşen hiç kaybolmaz.</p>
    <p style="margin-left:1.2em;color:var(--text-2)">Tepede: ϑy = 0, ama <strong>ϑ = ϑx = ϑ₀·cos α</strong>.
    Hız sıfır olsaydı cisim orada asılı kalırdı.</p>

    <p><strong>2 · Süreyi hep düşeyden bul.</strong> Yatay hız süreyi asla etkilemez.
    "Daha hızlı fırlatırsam daha uzun havada kalır" yanlıştır — sadece daha uzağa düşer.</p>

    <p><strong>3 · Tümler açılar aynı menzili verir.</strong> 37° ile 53°, 30° ile 60°,
    40° ile 50° aynı yere düşer. Ama büyük açı daha yükseğe çıkar ve daha uzun havada kalır.</p>

    <p><strong>4 · En büyük menzil 45°'dedir.</strong> Soruda "en uzağa nasıl atarım" geçiyorsa
    cevap 45°'dir.</p>

    <p><strong>5 · Simetri kuralı.</strong> Aynı seviyeye inen atışta:
    çıkış süresi = iniş süresi, atış açısı = iniş açısı, atış hızı = iniş hızı.</p>

    <div style="background:var(--surface-0);border-radius:var(--r-sm);padding:14px;margin:14px 0">
      <p style="margin:0 0 8px;font-weight:600">37° − 53° üçgeni ezberi</p>
      <table class="degisken-tablo" style="margin:0">
        <thead><tr><th>Açı</th><th>sin</th><th>cos</th></tr></thead>
        <tbody>
          <tr><td>37°</td><td class="sembol">0,6</td><td class="sembol">0,8</td></tr>
          <tr><td>45°</td><td class="sembol">√2/2</td><td class="sembol">√2/2</td></tr>
          <tr><td>53°</td><td class="sembol">0,8</td><td class="sembol">0,6</td></tr>
        </tbody>
      </table>
      <p style="margin:10px 0 0;font-size:.86em;color:var(--text-3)">
        37° ile 53° birbirinin tümleyeni: birinin sinüsü diğerinin kosinüsüdür.
        Sınavda ϑ₀ genellikle 5'in katı verilir ki 0,6 ve 0,8 ile çarpım tam sayı çıksın.
      </p>
    </div>

    <p style="margin-bottom:0"><strong>6 · Yatay atışta süre = √(2h/g).</strong> İçinde ϑ₀ yok.
    Soruda "kaç saniyede yere iner" geçiyorsa yatay hıza hiç bakma.</p>`,

  ornekler: [
    {
      soru: `<p>Bir top yerden <strong>50 m/s</strong> hızla, yatayla <strong>53°</strong> açı
             yapacak şekilde atılıyor. Topun <strong>tepe noktasındaki hızı</strong> kaç m/s'dir?
             (sin53° = 0,8; cos53° = 0,6)</p>`,
      taktikle: `<p>Tepede sadece ϑy sıfırlanır. Geriye ϑx kalır:</p>
                 <p style="margin-bottom:0"><strong>ϑ = ϑ₀·cos53° = 50 · 0,6 = 30 m/s</strong></p>`,
      uzun: `<p>ϑx = 50·cos53° = 30 m/s (hiç değişmez), ϑy = 50·sin53° = 40 m/s.</p>
             <p>Tepede ϑy = 0 olur. Bileşke: ϑ = √(30² + 0²) = <strong>30 m/s</strong></p>
             <p style="color:var(--text-3)">"0 m/s" diyenler ϑ ile ϑy'yi karıştırmıştır.</p>`
    },
    {
      soru: `<p>Aynı hızla <strong>37°</strong> ve <strong>53°</strong> açılarla atılan iki topun
             menzilleri ve havada kalma süreleri nasıl karşılaştırılır?</p>`,
      taktikle: `<p>37 + 53 = 90 ⟹ <strong>tümler açılar ⟹ menziller EŞİT.</strong></p>
                 <p style="margin-bottom:0">Süre düşey bileşene bağlı. sin53° (0,8) > sin37° (0,6)
                 olduğundan <strong>53°'lik top daha uzun havada kalır</strong> ve daha yükseğe çıkar.</p>`,
      uzun: `<p>x = ϑ₀²·sin2α/g. sin(2·37°) = sin74°, sin(2·53°) = sin106° = sin74°. Eşit.</p>
             <p>t = 2ϑ₀·sinα/g ⟹ t₅₃/t₃₇ = 0,8/0,6 = 4/3</p>`
    },
    {
      soru: `<p>80 m yükseklikteki bir uçaktan yatay olarak <strong>60 m/s</strong> hızla bir paket
             bırakılıyor. Paket yere kaç saniyede ve kaç metre uzağa düşer? (g = 10 m/s²)</p>`,
      taktikle: `<p><strong>Süre için yatay hıza hiç bakma.</strong> t = √(2h/g) = √(160/10) = √16 = <strong>4 s</strong></p>
                 <p style="margin-bottom:0">Uzaklık: x = 60 · 4 = <strong>240 m</strong></p>`,
      uzun: `<p>Düşey: 80 = ½·10·t² ⟹ t² = 16 ⟹ t = 4 s</p>
             <p>Yatay: x = ϑ₀·t = 60·4 = 240 m</p>
             <p style="color:var(--text-3)">Aynı anda dikey olarak bırakılan bir paket de 4 saniyede inerdi.</p>`
    }
  ]
},

/* ------------------------------------------------------ Zorlayıcı sorular */
osym: [
  {
    baslik: 'Bağımsızlık ilkesi',
    kaynak: 'Kavram tuzağı',
    govde: `
      <p>Şekildeki gibi h yüksekliğinden <strong>K</strong> topu ilk hızsız bırakılıyor,
      <strong>L</strong> topu ise aynı anda ve aynı noktadan yatay doğrultuda ϑ hızıyla fırlatılıyor.</p>
      <p>Buna göre aşağıdakilerden hangisi <strong>doğrudur</strong>?</p>
      <p style="font-size:.9em;color:var(--text-3)">(Hava direnci ihmal ediliyor.)</p>`,
    gorsel: `
      <svg viewBox="0 0 520 210" xmlns="http://www.w3.org/2000/svg" role="img"
           aria-label="Aynı yükseklikten biri bırakılan biri yatay fırlatılan iki topun yörüngeleri">
        <rect width="520" height="210" fill="#0E1726"/>
        <rect x="0" y="178" width="520" height="32" fill="#2A3A20"/>
        <rect x="40" y="40" width="70" height="138" fill="#3A4E76" opacity=".35"/>
        <circle cx="120" cy="46" r="7" fill="#4DA3FF"/>
        <text x="106" y="34" fill="#4DA3FF" font-size="13" font-family="system-ui">K</text>
        <path d="M120 60 L120 170" stroke="#4DA3FF" stroke-width="1.6" stroke-dasharray="4 5"/>
        <circle cx="120" cy="46" r="7" fill="none"/>
        <circle cx="120" cy="46" r="7" fill="#FF7A45" transform="translate(14,0)"/>
        <text x="146" y="34" fill="#FF7A45" font-size="13" font-family="system-ui">L</text>
        <path d="M134 46 Q 260 60 400 174" stroke="#FF7A45" stroke-width="1.8" fill="none" stroke-dasharray="4 5"/>
        <path d="M150 46 L186 46" stroke="#35C08A" stroke-width="2.2"/>
        <path d="M194 46 L182 41 L182 51 Z" fill="#35C08A"/>
        <text x="200" y="50" fill="#35C08A" font-size="12" font-family="system-ui">ϑ</text>
        <path d="M28 46 L28 178" stroke="#6F84A8" stroke-width="1.2"/>
        <path d="M23 46 H33 M23 178 H33" stroke="#6F84A8" stroke-width="1.2"/>
        <text x="16" y="116" fill="#A7B8D4" font-size="14" font-family="system-ui" text-anchor="end">h</text>
        <circle cx="120" cy="174" r="6" fill="#4DA3FF" opacity=".5"/>
        <circle cx="400" cy="174" r="6" fill="#FF7A45" opacity=".5"/>
      </svg>`,
    secenekler: [
      'K topu L topundan önce yere iner',
      'L topu K topundan önce yere iner',
      'İkisi aynı anda yere iner, yere çarpma hızları da eşittir',
      'İkisi aynı anda yere iner, ama L daha büyük hızla çarpar',
      'Hangisinin önce ineceği ϑ değerine bağlıdır'
    ],
    dogru: 3,
    cozum: `
      <p><strong>Süre:</strong> Yatay hareket düşey hareketi etkilemez. İkisinin de düşey
      hikâyesi aynı: h yüksekliğinden ϑ₀y = 0 ile serbest düşme.</p>
      <p>t = √(2h/g) — bu ifadede yatay hız yok. <strong>İkisi aynı anda iner.</strong>
      Bu, A, B ve E'yi eler.</p>
      <p><strong>Hız:</strong> Yere çarparken ikisinin de düşey hızı aynıdır: ϑy = g·t.
      Ama L'nin bir de yatay bileşeni var:</p>
      <ul>
        <li>K: ϑ<sub>K</sub> = ϑy</li>
        <li>L: ϑ<sub>L</sub> = √(ϑ² + ϑy²) &nbsp;→&nbsp; <strong>ϑy'den büyük</strong></li>
      </ul>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>C şıkkı neden en çekici tuzak?</strong> "Aynı anda iner"
        kısmı doğru olduğu için öğrenci cümlenin devamını okumadan işaretliyor.
        Aynı anda inmek <em>aynı hızla çarpmak</em> demek değildir — süreleri eşit,
        <strong>hızları eşit değil</strong>. L'nin fazladan bir yatay bileşeni var ve o
        bileşen hiç kaybolmadı.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: D</strong></p>`
  },
  {
    baslik: 'Açı ve menzil',
    kaynak: 'Orantı',
    govde: `
      <p>Bir top yerden ϑ₀ hızıyla, yatayla α açısı yapacak şekilde atılıyor ve yine
      aynı yatay düzleme iniyor.</p>
      <p>Yalnızca <strong>α açısı 30°'den 60°'ye çıkarılırsa</strong> (ϑ₀ değişmiyor),
      aşağıdakilerden hangisi <strong>değişmez</strong>?</p>
      <p style="font-size:.9em;color:var(--text-3)">(Hava direnci ihmal ediliyor, g sabittir.)</p>`,
    secenekler: [
      'Havada kalma süresi',
      'Maksimum yükseklik',
      'Yatay menzil',
      'Tepe noktadaki hız',
      'Yere çarpma anındaki düşey hız'
    ],
    dogru: 2,
    cozum: `
      <p>30° ve 60° <strong>tümler açılardır</strong> (toplamları 90°). Menzil formülünden:</p>
      <div class="formul" style="max-width:260px"><div class="fm">x = ϑ₀²·sin2α / g</div></div>
      <p>sin(2·30°) = sin60° &nbsp;ve&nbsp; sin(2·60°) = sin120° = sin60°. <strong>Eşit</strong> ⟹ menzil değişmez.</p>
      <p>Diğerleri neden değişir?</p>
      <ul>
        <li><strong>A · Süre:</strong> t = 2ϑ₀·sinα/g. sin60° > sin30° ⟹ süre artar.</li>
        <li><strong>B · Yükseklik:</strong> h = ϑ₀²sin²α/(2g) ⟹ artar.</li>
        <li><strong>D · Tepedeki hız:</strong> ϑx = ϑ₀·cosα. cos60° < cos30° ⟹ azalır.</li>
        <li><strong>E · İniş düşey hızı:</strong> büyüklükçe ϑ₀·sinα'ya eşittir ⟹ artar.</li>
      </ul>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>Tümler açı çiftlerini ezberle:</strong> 30-60, 37-53, 40-50, 15-75.
        Bunlardan biri soruda görünüyorsa aklına ilk gelen şey "menziller eşit" olmalı.
        Ama <strong>yalnızca menzil</strong> eşittir — süre, yükseklik ve yörünge şekli farklıdır.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: C</strong></p>`
  },
  {
    baslik: 'Duvardan sekme',
    kaynak: 'Çok adımlı',
    govde: `
      <p>Bir top, <strong>80 m</strong> yükseklikteki bir binanın çatısından
      <strong>yatay olarak 20 m/s</strong> hızla atılıyor. Binanın <strong>60 m</strong>
      ilerisinde düşey bir duvar var.</p>
      <p>Top duvara çarpıyor ve <strong>yatay hızının yarısıyla geri sekiyor</strong>.
      Çarpışmada düşey hızı hiç değişmiyor.</p>
      <p><strong>Top yere, binanın dibinden kaç metre uzağa düşer?</strong>
      (g = 10 m/s², hava direnci ihmal ediliyor)</p>`,
    gorsel: `
      <svg viewBox="0 0 520 230" xmlns="http://www.w3.org/2000/svg" role="img"
           aria-label="Binadan yatay atılan topun duvara çarpıp geri sekerek yere düşmesi">
        <rect width="520" height="230" fill="#0E1726"/>
        <rect x="0" y="198" width="520" height="32" fill="#2E3D22"/>
        <rect x="20" y="44" width="56" height="154" fill="#D85A30" opacity=".45"/>
        <rect x="16" y="38" width="64" height="8" fill="#993C1D"/>
        <rect x="372" y="60" width="16" height="138" fill="#D85A30"/>
        <rect x="368" y="54" width="24" height="8" fill="#993C1D"/>
        <text x="380" y="44" fill="#FF8A5C" font-size="12" font-family="system-ui" text-anchor="middle">duvar</text>
        <circle cx="80" cy="44" r="7" fill="#E24B4A"/>
        <path d="M92 44 L140 44" stroke="#FF7A45" stroke-width="2.6"/>
        <path d="M150 44 L134 37 L134 51 Z" fill="#FF7A45"/>
        <text x="158" y="40" fill="#FF7A45" font-size="12" font-family="system-ui">20 m/s</text>
        <path d="M80 44 Q 240 60 370 132" stroke="#4DA3FF" stroke-width="2" fill="none" stroke-dasharray="5 5"/>
        <circle cx="370" cy="132" r="5" fill="#FFB020"/>
        <path d="M366 140 Q 300 158 250 196" stroke="#35C08A" stroke-width="2" fill="none" stroke-dasharray="5 5"/>
        <circle cx="248" cy="196" r="6" fill="#35C08A"/>
        <path d="M80 212 H248" stroke="#6F84A8" stroke-width="1.2"/>
        <path d="M80 207 V217 M248 207 V217" stroke="#6F84A8" stroke-width="1.2"/>
        <text x="164" y="226" fill="#A7B8D4" font-size="13" font-family="system-ui" text-anchor="middle">x = ?</text>
        <path d="M96 44 V198" stroke="#6F84A8" stroke-width="1"/>
        <text x="106" y="124" fill="#A7B8D4" font-size="13" font-family="system-ui">80 m</text>
      </svg>`,
    secenekler: ['50 m', '60 m', '70 m', '40 m', '30 m'],
    dogru: 0,
    cozum: `
      <p><strong>Adım 1 — Toplam uçuş süresini bul.</strong> Buradaki anahtar fikir şu:
      duvar <strong>yalnızca yatay hızı</strong> değiştirir, düşey harekete hiç dokunmaz.
      Yani top, duvar olsa da olmasa da <strong>aynı anda</strong> yere iner.</p>
      <p>Yatay atış ⟹ ϑ₀y = 0:</p>
      <p>80 = ½ · 10 · t² ⟹ t² = 16 ⟹ <strong>t = 4 s</strong></p>

      <p><strong>Adım 2 — Duvara varış anı.</strong></p>
      <p>t₁ = 60 / 20 = <strong>3 s</strong></p>

      <p><strong>Adım 3 — Sekmeden sonra kalan süre ve yol.</strong></p>
      <p>Kalan süre: 4 − 3 = <strong>1 s</strong>. Yeni yatay hız: 20/2 = <strong>10 m/s</strong> (geri yönde)</p>
      <p>Geri gidilen yol: 10 · 1 = <strong>10 m</strong></p>

      <p><strong>Adım 4 — İniş noktası.</strong></p>
      <p>60 − 10 = <strong>50 m</strong></p>

      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>Bu soru bağımsızlık ilkesinin en güzel sınavıdır.</strong>
        Çarpışma korkutucu görünür ama düşey hareketi hiç bozmaz — süre baştan bellidir.
        Yatay eksende ise iki ayrı sabit hızlı hareket vardır: önce +20, sonra −10.
        <br><strong>Çeldiriciler:</strong> <strong>B (60 m)</strong> sekmeyi hiç hesaba
        katmayanlar için. <strong>C (70 m)</strong> geri değil ileri gittiğini sananlar için.
        <strong>D (40 m)</strong> kalan süreyi 2 s sananlar için.
        <br><strong>Simülasyonla gör:</strong> ϑ₀ = 20, α = 0°, h₀ = 80, duvar = 60 yap.
        Duvarı kaldırıp tekrar dene — <em>uçuş süresinin değişmediğini</em> göreceksin.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: A) 50 m</strong></p>`
  }
],

/* --------------------------------------------- Bağlam temelli sorular */
baglam: [
  {
    baslik: 'Yangın söndürme uçağı',
    govde: `
      <p>Orman yangınına müdahale eden bir söndürme uçağı, yerden <strong>180 m</strong>
      yükseklikte, yere paralel olarak <strong>80 m/s</strong> sabit hızla uçuyor.</p>
      <p>Pilot, suyu tam olarak yangının üzerine boşaltmak istiyor. Ancak su bırakıldıktan
      sonra hemen düşmüyor — havada bir süre yol alıyor.</p>
      <p><strong>Pilot suyu, yangına yatay olarak kaç metre kala bırakmalıdır?</strong>
      (g = 10 m/s², hava direnci ihmal ediliyor)</p>`,
    gorsel: `
      <svg viewBox="0 0 520 220" xmlns="http://www.w3.org/2000/svg" role="img"
           aria-label="180 metre yükseklikte uçan söndürme uçağından bırakılan suyun eğrisel yörüngesi">
        <rect width="520" height="220" fill="#17223A"/>
        <rect x="0" y="188" width="520" height="32" fill="#2E3D22"/>
        <g transform="translate(90,44)">
          <path d="M-26 0 L24 0 L34 5 L24 11 L-26 11 Z" fill="#9AA5B1"/>
          <path d="M-6 0 L6 -13 L14 -13 L6 0 Z" fill="#7D8A99"/>
          <path d="M-20 11 L-10 20 L0 11 Z" fill="#7D8A99"/>
        </g>
        <path d="M118 46 L162 46" stroke="#FF7A45" stroke-width="2.4"/>
        <path d="M170 46 L158 41 L158 51 Z" fill="#FF7A45"/>
        <text x="176" y="50" fill="#FF7A45" font-size="12" font-family="system-ui">80 m/s</text>
        <path d="M92 58 Q 210 76 344 186" stroke="#38D6E0" stroke-width="2" fill="none" stroke-dasharray="5 5"/>
        <circle cx="92" cy="58" r="5" fill="#38D6E0"/>
        <g transform="translate(344,178)">
          <path d="M0 -14 Q 8 -6 4 0 Q 10 -4 12 4 Q 14 -8 4 -18 Q 2 -16 0 -14 Z" fill="#FF6B6B"/>
          <path d="M-10 -10 Q -4 -4 -7 0 Q -1 -3 0 4 Q 2 -6 -6 -13 Q -8 -12 -10 -10 Z" fill="#FFB020"/>
        </g>
        <path d="M60 58 V188" stroke="#6F84A8" stroke-width="1.2"/>
        <path d="M55 58 H65 M55 188 H65" stroke="#6F84A8" stroke-width="1.2"/>
        <text x="50" y="128" fill="#A7B8D4" font-size="14" font-family="system-ui" text-anchor="end">180 m</text>
        <path d="M92 202 H344" stroke="#6F84A8" stroke-width="1.2"/>
        <path d="M92 197 V207 M344 197 V207" stroke="#6F84A8" stroke-width="1.2"/>
        <text x="218" y="216" fill="#A7B8D4" font-size="14" font-family="system-ui" text-anchor="middle">x = ?</text>
      </svg>`,
    adimlar: [
      { bas: 'Verilenleri ayıkla',
        metin: 'h = 180 m, ϑ₀ = 80 m/s <strong>yatay</strong>, g = 10 m/s². "Orman yangını", "pilot" sahneyi kurar.' },
      { bas: 'Olayı fiziksel modele çevir',
        metin: 'Uçak <strong>yere paralel</strong> uçuyor, yani su yatay olarak bırakılıyor: bu bir <strong>yatay atıştır</strong>. Düşeydeki ilk hız sıfır (ϑ₀y = 0), yatay hız uçağın hızına eşit (ϑ₀x = 80 m/s).' },
      { bas: 'Hangi eksenden başlayacağını seç',
        metin: 'Süre bilinmiyor. Süreyi <strong>düşey eksen</strong> verir çünkü orada yükseklik biliniyor: h = ½·g·t²' },
      { bas: 'Süreyi hesapla',
        metin: '180 = ½ · 10 · t² ⟹ t² = 36 ⟹ <strong>t = 6 s</strong>' },
      { bas: 'Yatay uzaklığı bul',
        metin: 'x = ϑ₀x · t = 80 · 6 = <strong>480 m</strong>' },
      { bas: 'Yorumla',
        metin: 'Pilot yangını görüp tam üstünde bırakırsa su 480 m ileriye düşer. Yaklaşık yarım kilometre — bu yüzden gerçek müdahalede pilotlar hedefe epey önceden nişan alır. Uçak daha alçaktan uçarsa hem süre hem sapma azalır.' }
    ],
    secenekler: ['240 m', '480 m', '360 m', '600 m', '1440 m'],
    dogru: 1,
    cozum: `
      <p>Yatay atış: düşeydeki ilk hız sıfırdır.</p>
      <p><strong>Süre (düşeyden):</strong> 180 = ½·10·t² ⟹ t = <strong>6 s</strong></p>
      <p><strong>Uzaklık (yataydan):</strong> x = 80 · 6 = <strong>480 m</strong></p>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>E şıkkı (1440 m)</strong> x = ϑ₀ · h / g gibi uydurma bir
        işlem yapanlar için. <strong>A şıkkı (240 m)</strong> süreyi 3 s bulanlar için —
        √(2h/g) yerine √(h/g) hesaplayınca çıkar.
        <br>Kontrol alışkanlığı edin: 6 saniye boyunca 80 m/s ile gidilen yol elbette
        480 m olmalı. Sonuç mantıklı mı diye sormak çoğu hatayı yakalar.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: B) 480 m</strong></p>`
  },
  {
    baslik: 'Basketbolcunun açısı',
    govde: `
      <p>Bir basketbolcu serbest atış yapıyor. Topu <strong>2 m</strong> yükseklikten,
      yatayla <strong>53°</strong> açıyla ve <strong>10 m/s</strong> hızla atıyor.
      Pota çemberi yerden <strong>3,05 m</strong> yükseklikte.</p>
      <p>Antrenör, topun <strong>tepe noktasına</strong> ne kadar sürede ulaştığını ve
      o anda yerden ne kadar yüksekte olduğunu bilmek istiyor — çünkü topun çemberden
      yüksekte olması gerekiyor.</p>
      <p><strong>Top tepe noktasına kaç saniyede ulaşır ve o noktada yerden kaç metre yüksektedir?</strong>
      (g = 10 m/s², sin53° = 0,8; cos53° = 0,6)</p>`,
    gorsel: `
      <svg viewBox="0 0 520 210" xmlns="http://www.w3.org/2000/svg" role="img"
           aria-label="Basketbolcunun 53 derece açıyla attığı topun yörüngesi ve pota">
        <rect width="520" height="210" fill="#17223A"/>
        <rect x="0" y="182" width="520" height="28" fill="#6B4A2E"/>
        <rect x="430" y="40" width="7" height="142" fill="#7D8A99"/>
        <rect x="392" y="52" width="40" height="30" rx="2" fill="#9AA5B1" opacity=".5"/>
        <path d="M382 84 H412" stroke="#E24B4A" stroke-width="3.4"/>
        <path d="M382 84 L386 98 M412 84 L408 98 M392 84 L394 99 M402 84 L400 99" stroke="#D0D6E0" stroke-width="1.2"/>
        <g transform="translate(96,150)">
          <circle cx="0" cy="-26" r="6" fill="#3C3489"/>
          <path d="M0 -20 L0 -6 M0 -6 L-6 8 M0 -6 L6 8 M0 -16 L12 -30" stroke="#3C3489" stroke-width="2.6" stroke-linecap="round"/>
        </g>
        <path d="M112 118 Q 250 46 402 86" stroke="#E24B4A" stroke-width="2" fill="none" stroke-dasharray="5 5"/>
        <circle cx="112" cy="118" r="7" fill="#E24B4A"/>
        <circle cx="252" cy="70" r="4" fill="#FFB020"/>
        <text x="252" y="56" fill="#FFB020" font-size="11" font-family="system-ui" text-anchor="middle">tepe · ϑy = 0</text>
        <path d="M130 118 L166 100" stroke="#35C08A" stroke-width="2.2"/>
        <path d="M174 96 L160 96 L166 106 Z" fill="#35C08A"/>
        <text x="150" y="132" fill="#35C08A" font-size="11" font-family="system-ui">10 m/s</text>
        <path d="M128 118 A 20 20 0 0 0 134 106" stroke="#A7B8D4" stroke-width="1.2" fill="none"/>
        <text x="146" y="116" fill="#A7B8D4" font-size="11" font-family="system-ui">53°</text>
        <path d="M60 118 V182" stroke="#6F84A8" stroke-width="1.2"/>
        <path d="M55 118 H65 M55 182 H65" stroke="#6F84A8" stroke-width="1.2"/>
        <text x="50" y="154" fill="#A7B8D4" font-size="12" font-family="system-ui" text-anchor="end">2 m</text>
        <text x="448" y="88" fill="#A7B8D4" font-size="12" font-family="system-ui">3,05 m</text>
      </svg>`,
    adimlar: [
      { bas: 'Verilenleri ayıkla',
        metin: 'ϑ₀ = 10 m/s, α = 53°, atış yüksekliği h₀ = 2 m, g = 10 m/s². Çember yüksekliği 3,05 m sonucu yorumlamak için verilmiş, hesapta kullanılmıyor.' },
      { bas: 'İlk hızı bileşenlere ayır',
        metin: 'ϑ₀x = 10 · cos53° = 10 · 0,6 = <strong>6 m/s</strong><br>ϑ₀y = 10 · sin53° = 10 · 0,8 = <strong>8 m/s</strong>' },
      { bas: 'Tepe noktasını fiziksel olarak tanımla',
        metin: 'Tepe noktası, <strong>düşey hızın sıfırlandığı</strong> andır. Dikkat: top orada durmuyor — yatay olarak hâlâ 6 m/s ile ilerliyor.' },
      { bas: 'Süre için formülü seç',
        metin: 'ϑy = ϑ₀y − g·t ifadesinde ϑy = 0 koy: 0 = 8 − 10·t ⟹ <strong>t = 0,8 s</strong>' },
      { bas: 'Yüksekliği bul',
        metin: 'Atış seviyesinden çıkılan yükseklik: h = ϑ₀y²/(2g) = 64/20 = 3,2 m<br>Yerden yükseklik: 2 + 3,2 = <strong>5,2 m</strong>' },
      { bas: 'Yorumla',
        metin: 'Top tepede 5,2 m’de — çemberden (3,05 m) yaklaşık 2,15 m yüksekte. Bu normaldir: basketbolda top potaya yukarıdan aşağı düşerek girer, çünkü bu açıyla çemberin etkin açıklığı en geniş görünür.' }
    ],
    secenekler: [
      't = 0,8 s · yerden 5,2 m',
      't = 0,8 s · yerden 3,2 m',
      't = 0,6 s · yerden 4,8 m',
      't = 1,0 s · yerden 5,0 m',
      't = 1,6 s · yerden 5,2 m'
    ],
    dogru: 0,
    cozum: `
      <p>ϑ₀y = 10·sin53° = <strong>8 m/s</strong>, ϑ₀x = 10·cos53° = 6 m/s</p>
      <p><strong>Tepeye çıkış süresi:</strong> 0 = 8 − 10·t ⟹ <strong>t = 0,8 s</strong></p>
      <p><strong>Çıkılan yükseklik:</strong> h = ϑ₀y²/(2g) = 8²/20 = 3,2 m</p>
      <p><strong>Yerden yükseklik:</strong> 2 + 3,2 = <strong>5,2 m</strong></p>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>B şıkkı</strong> atış yüksekliğini (2 m) eklemeyi unutanlar için —
        en sık yapılan hata budur. Soru "<em>yerden</em> yüksekliği" diyorsa h₀'ı eklemeyi unutma.
        <br><strong>E şıkkı (1,6 s)</strong> ise <em>toplam</em> uçuş süresini verir, tepeye çıkış
        süresini değil. Tepeye çıkış, simetrik atışta toplam sürenin yarısıdır.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: A</strong></p>`
  }
]

});
})();
