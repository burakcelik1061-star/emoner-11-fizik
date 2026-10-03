(function () {
"use strict";
const F = window.F11;

/* ==========================================================================
   topics/u1-cembersel-degiskenler.js
   Konu 1.6.2 · Çembersel hareketin değişkenleri  (MEB 11, s. 101-119)
   Ünite 1’in son konusu.
   ========================================================================== */

F.konuKaydet('u1-cembersel-degiskenler', {

ozet: `Çembersel hareketin altı değişkeni var: <strong>T, f, ω, ϑ, a<sub>m</sub>, F<sub>m</sub></strong>.
İyi haber şu — hepsi birbirine bağlı. Birini bilirsen zincirleme diğerlerine ulaşırsın.
Bu konunun tamamı o zinciri kurmaktan ibaret.`,

/* ------------------------------------------------------------- Kavram */
kavram: `
<h3>Altı değişken, tek zincir</h3>
<p>Değişkenleri ezberlemek yerine aralarındaki geçişleri kur. Zincir şöyle işler:</p>

<div style="background:var(--surface-0);border:1px solid var(--border);border-radius:var(--r-sm);padding:16px;margin:14px 0">
  <p style="margin:0 0 10px;font-family:var(--font-mono);font-size:1.05em;color:#fff;line-height:2">
    T &nbsp;→&nbsp; f = 1/T &nbsp;→&nbsp; ω = 2πf &nbsp;→&nbsp; ϑ = ω·r
    &nbsp;→&nbsp; a<sub>m</sub> = ϑ²/r &nbsp;→&nbsp; F<sub>m</sub> = m·a<sub>m</sub>
  </p>
  <p style="margin:0;font-size:.88em;color:var(--text-3)">
    Soruda hangisi verilirse zincirin o halkasından başla, istenene kadar ilerle.
  </p>
</div>

<table class="degisken-tablo">
  <thead><tr><th>Büyüklük</th><th>Tanım</th><th>Formül</th><th>Birim</th></tr></thead>
  <tbody>
    <tr><td class="sembol">T</td><td>Periyot — bir tur süresi</td><td class="sembol">T = t/n</td><td class="birim">s</td></tr>
    <tr><td class="sembol">f</td><td>Frekans — saniyedeki tur sayısı</td><td class="sembol">f = 1/T</td><td class="birim">Hz</td></tr>
    <tr><td class="sembol">ω</td><td>Açısal hız — saniyedeki açı</td><td class="sembol">ω = 2π/T = 2πf</td><td class="birim">rad/s</td></tr>
    <tr><td class="sembol">ϑ</td><td>Çizgisel hız — teğetsel sürat</td><td class="sembol">ϑ = ω·r = 2πr/T</td><td class="birim">m/s</td></tr>
    <tr><td class="sembol">a<sub>m</sub></td><td>Merkezcil ivme</td><td class="sembol">a<sub>m</sub> = ϑ²/r = ω²r</td><td class="birim">m/s²</td></tr>
    <tr><td class="sembol">F<sub>m</sub></td><td>Merkezcil kuvvet</td><td class="sembol">F<sub>m</sub> = m·ϑ²/r</td><td class="birim">N</td></tr>
  </tbody>
</table>

<h3 style="margin-top:22px">Merkezcil kuvvet yeni bir kuvvet değildir</h3>
<div class="kutu dikkat" style="margin:14px 0">
  <div class="kutu-bas"><span class="ikon">⚠</span>Bu konunun en kritik cümlesi</div>
  <p style="margin:0">Serbest cisim diyagramına <strong>"merkezcil kuvvet" diye ayrı bir ok
  çizilmez.</strong> Merkezcil kuvvet, zaten var olan bir kuvvetin merkeze doğru olan
  bileşenine verilen <em>isimdir</em> — kuvvetin kendisi değil, <strong>görevidir</strong>.</p>
</div>

<table class="degisken-tablo">
  <thead><tr><th>Durum</th><th>Merkezcil kuvveti kim sağlıyor?</th></tr></thead>
  <tbody>
    <tr><td>İpe bağlı taş</td><td>İp gerilmesi (T)</td></tr>
    <tr><td>Virajı dönen araba</td><td>Yol ile lastik arasındaki sürtünme</td></tr>
    <tr><td>Dünya etrafındaki uydu</td><td>Yer çekimi kuvveti</td></tr>
    <tr><td>Çamaşır makinesinin tamburu</td><td>Tamburun duvarının uyguladığı normal kuvvet</td></tr>
    <tr><td>Düşey düzlemde dönen kova (en üstte)</td><td>Ağırlık + ip gerilmesi birlikte</td></tr>
  </tbody>
</table>

<h3 style="margin-top:22px">Merkezcil ivme neden merkeze doğru?</h3>
<p>Hızın <strong>büyüklüğü</strong> değişmiyor, yalnızca <strong>yönü</strong> değişiyor.
Yalnızca yönü değiştiren bir ivme, hıza <strong>dik</strong> olmak zorundadır — çünkü hız
doğrultusunda bir bileşeni olsaydı sürati de değiştirirdi.</p>
<p>Hız teğet olduğuna göre, ona dik olan doğrultu <strong>yarıçap doğrultusudur</strong>.
İki seçenek kalır: merkeze doğru ya da merkezden dışarı. Cisim merkez etrafında
<em>kaldığına</em> göre ivme <strong>merkeze</strong> doğrudur.</p>

<h3 style="margin-top:22px">Viraj: kütle neden önemsiz?</h3>
<p>Virajı dönen bir araçta merkezcil kuvveti sürtünme sağlar. Savrulmamak için:</p>
<div class="formul" style="max-width:340px;margin:12px 0">
  <div class="fm">m·ϑ²/r ≤ μ<sub>s</sub>·m·g</div>
</div>
<p>Her iki tarafta da m var, <strong>sadeleşir</strong>:</p>
<div class="formul" style="max-width:280px;margin:12px 0;border-top-color:var(--accent)">
  <div class="fm" style="color:var(--accent)">ϑ<sub>maks</sub> = √(μ<sub>s</sub>·g·r)</div>
</div>
<div class="kutu puf" style="margin:14px 0">
  <div class="kutu-bas"><span class="ikon">🎯</span><span>Neden μ<sub>s</sub>, neden μ<sub>k</sub> değil?</span></div>
  <p style="margin:0 0 8px">Buradaki sürtünme <strong>statik</strong> sürtünmedir. Sebebi şu:
  lastik viraj boyunca <strong>yana doğru kaymaz</strong> — yuvarlanarak ilerler, yolla temas
  eden noktası o an yola göre durgundur. Kinetik sürtünmeye geçtiği an araç zaten
  <strong>savrulmuş</strong>tur; artık "güvenli sürat" diye bir şey kalmamıştır.</p>
  <p style="margin:0">Bunun pratik sonucu var: μ<sub>s</sub> &gt; μ<sub>k</sub> olduğu için
  <strong>kaymadan önceki tutunma, kaydıktan sonrakinden daha güçlüdür</strong>. Araç bir kez
  savrulmaya başlayınca toparlanması zorlaşır — ABS’in varlık sebebi de budur (1.4.1).</p>
  <p style="margin:8px 0 0;color:var(--text-2);font-size:.94em">Sorularda çoğu zaman yalnızca
  “sürtünme katsayısı μ” diye verilir. Viraj sorusuysa <strong>onu μ<sub>s</sub> olarak al</strong>,
  formül değişmez.</p>
</div>

<p>Yani <strong>güvenli sürat sınırı aracın kütlesine bağlı değildir</strong>. Yüklü bir kamyon
da küçük bir otomobil de aynı virajı aynı azami süratle dönebilir. Trafik levhalarındaki
hız sınırının araç tipine göre değişmemesinin fizik sebebi budur.</p>`,

/* ---------------------------------------------------------- Formüller */
formuller: {
  liste: [
    { fm: 'f = 1 / T',                         aciklama: 'Frekans, periyodun tersi' },
    { fm: 'ω = 2π / T = 2π·f',                 aciklama: 'Açısal hız' },
    { fm: 'ϑ = ω · r = 2π·r / T',              aciklama: 'Çizgisel (teğetsel) hız' },
    { fm: 'a<sub>m</sub> = ϑ² / r = ω²·r',     aciklama: 'Merkezcil ivme — merkeze doğru' },
    { fm: 'F<sub>m</sub> = m·ϑ² / r = m·ω²·r', aciklama: 'Merkezcil kuvvet' },
    { fm: 'ϑ<sub>maks</sub> = √(μ<sub>s</sub>·g·r)',       aciklama: 'Yatay virajda güvenli sürat' }
  ],
  degiskenler: [
    { sembol: 'T',              ad: 'Periyot',          birim: 's' },
    { sembol: 'f',              ad: 'Frekans',          birim: 'Hz (1/s)' },
    { sembol: 'ω',              ad: 'Açısal hız',       birim: 'rad/s' },
    { sembol: 'ϑ',              ad: 'Çizgisel hız',     birim: 'm/s' },
    { sembol: 'a<sub>m</sub>',  ad: 'Merkezcil ivme',   birim: 'm/s²' },
    { sembol: 'F<sub>m</sub>',  ad: 'Merkezcil kuvvet', birim: 'N' },
    { sembol: 'μ<sub>s</sub>',  ad: 'Statik sürtünme katsayısı', birim: '—' }
  ]
},

/* ------------------------------------------------------------ Türetim */
turetim: {
  yollar: [
    {
      ad: 'Zinciri kur',
      adimlar: [
        { baslik: 'Periyot ve frekans',
          html: `<p><strong>Periyot (T):</strong> Bir tam turun süresi.
                 <strong>Frekans (f):</strong> Bir saniyedeki tur sayısı.</p>
                 <p>Tanımları gereği birbirinin tersidir:</p>
                 <div class="formul" style="max-width:200px"><div class="fm">f = 1 / T</div></div>
                 <p style="margin-top:10px;color:var(--text-2)">Bir tur 4 saniyede tamamlanıyorsa
                 saniyede 1/4 tur atılır. Frekansın birimi <strong>hertz</strong>tir (Hz).</p>` },

        { baslik: 'Açısal hız',
          html: `<p>Bir tam tur <strong>2π radyan</strong>lık bir açıdır. Bu açı T sürede
                 taranıyorsa saniyede taranan açı:</p>
                 <div class="formul" style="max-width:240px"><div class="fm">ω = 2π / T = 2π·f</div></div>
                 <p style="margin-top:10px">ω, cismin <em>ne kadar hızlı döndüğünü</em> anlatır —
                 yarıçaptan tamamen bağımsızdır.</p>` },

        { baslik: 'Çizgisel hız',
          html: `<p>Bir turda alınan yol çemberin çevresidir: <strong>2πr</strong>.
                 Bu yol T sürede alınırsa:</p>
                 <div class="formul" style="max-width:240px"><div class="fm">ϑ = 2π·r / T</div></div>
                 <p style="margin-top:10px">Sağ tarafta 2π/T zaten ω’dır. Yerine yazalım:</p>
                 <div class="formul" style="max-width:200px;border-top-color:var(--accent)">
                   <div class="fm" style="color:var(--accent)">ϑ = ω · r</div>
                 </div>
                 <div class="kutu puf" style="margin-top:12px">
                   <p style="margin:0">Bu formül dönen sistemlerdeki her şeyi açıklar:
                   <strong>ω herkes için aynı, ϑ yarıçapla büyür.</strong> Plakta dış kenar
                   daha hızlı, dönme dolapta dış kabin daha hızlı.</p>
                 </div>` },

        { baslik: 'Merkezcil ivme',
          html: `<p>Hızın yönü sürekli değiştiği için ivme vardır. Bu ivmenin büyüklüğü:</p>
                 <div class="formul-serit">
                   <div class="formul"><div class="fm">a<sub>m</sub> = ϑ² / r</div></div>
                   <div class="formul"><div class="fm">a<sub>m</sub> = ω² · r</div></div>
                 </div>
                 <p style="margin-top:10px;color:var(--text-2)">İkisi aynı şeydir:
                 ϑ = ω·r yazıp yerine koyarsan biri diğerine dönüşür. Soruda hangisi
                 verilmişse onu kullan.</p>
                 <p><strong>Yönü daima merkeze doğrudur.</strong></p>` },

        { baslik: 'Merkezcil kuvvet',
          html: `<p>Newton II’yi bu ivmeye uygula:</p>
                 <div class="formul" style="max-width:300px;border-top-color:var(--accent)">
                   <div class="fm" style="color:var(--accent)">F<sub>m</sub> = m·a<sub>m</sub> = m·ϑ²/r</div>
                 </div>
                 <p style="margin-top:12px">Zincir tamamlandı. Artık T’den başlayıp
                 F<sub>m</sub>’ye kadar her şeyi bulabilirsin.</p>
                 <div class="kutu dikkat" style="margin-top:12px">
                   <p style="margin:0">Ama unutma: bu kuvvet <strong>yeni bir kuvvet değil</strong>.
                   Bu, ip gerilmesinin / sürtünmenin / yer çekiminin ne kadar olması
                   <em>gerektiğini</em> söyleyen bir denklemdir.</p>
                 </div>` }
      ]
    },
    {
      ad: 'Merkezcil ivme neden ϑ²/r?',
      adimlar: [
        { baslik: 'İki andaki hız vektörlerini al',
          html: `<p>Cisim çember üzerinde küçük bir Δθ açısı kadar ilerlesin. Başlangıçtaki
                 hız ϑ₁, sonraki hız ϑ₂ olsun. <strong>Büyüklükleri eşit</strong>
                 (|ϑ₁| = |ϑ₂| = ϑ) ama yönleri Δθ kadar farklı.</p>` },

        { baslik: 'Hız değişimini çiz',
          html: `<p>Δϑ = ϑ₂ − ϑ₁ vektörel farkını çizersek, ikizkenar bir üçgen oluşur:
                 iki kenarı ϑ uzunluğunda, tepe açısı Δθ.</p>
                 <p>Çok küçük açılar için bu üçgenin tabanı yaklaşık bir yay gibi davranır:</p>
                 <div class="formul" style="max-width:200px"><div class="fm">|Δϑ| ≈ ϑ · Δθ</div></div>` },

        { baslik: 'İvmeyi yaz',
          html: `<p>a = |Δϑ| / Δt = ϑ · Δθ / Δt</p>
                 <p>Burada Δθ/Δt zaten <strong>açısal hızdır</strong> (ω):</p>
                 <div class="formul" style="max-width:200px"><div class="fm">a<sub>m</sub> = ϑ · ω</div></div>
                 <p style="margin-top:10px">ω = ϑ/r yazıp yerine koyalım:</p>
                 <div class="formul" style="max-width:240px;border-top-color:var(--accent)">
                   <div class="fm" style="color:var(--accent)">a<sub>m</sub> = ϑ²/r</div>
                 </div>` },

        { baslik: 'Yönünü belirle',
          html: `<p>Δθ sıfıra giderken Δϑ vektörünün yönü, ϑ’ya <strong>dik</strong> hâle gelir
                 ve <strong>merkeze</strong> bakar.</p>
                 <p>Bunu şöyle de görebilirsin: ivmenin hız doğrultusunda bir bileşeni olsaydı
                 sürat değişirdi. Sürat sabit olduğuna göre ivme hıza tam dik olmalıdır —
                 o da yarıçap doğrultusudur.</p>
                 <div class="kutu puf" style="margin-top:12px">
                   <p style="margin:0"><strong>ϑ²/r formülünün söylediği:</strong> Hız iki katına
                   çıkarsa merkezcil ivme <strong>dört katına</strong> çıkar. Virajı iki kat hızlı
                   dönmek dört kat sürtünme ister — bu yüzden hız sınırları bu kadar önemlidir.</p>
                 </div>` }
      ]
    },
    {
      ad: 'Virajda güvenli sürat',
      adimlar: [
        { baslik: 'Aracı çembere kim sokuyor?',
          html: `<p>Yatay bir virajda araç çembersel hareket yapar. Onu çembere sokan merkezcil
                 kuvveti sağlayan tek şey <strong>lastik-yol sürtünmesidir</strong>.</p>
                 <p>Direksiyon tekerleri çevirir, ama aracı çeviren kuvvet sürtünmedir.
                 Buzda direksiyon çevirmek işe yaramaz, sebebi budur.</p>` },

        { baslik: 'Gereken ile mevcudu karşılaştır',
          html: `<p><strong>Gereken merkezcil kuvvet:</strong> F<sub>m</sub> = m·ϑ²/r</p>
                 <p><strong>Sürtünmenin sağlayabileceği en fazla:</strong>
                 f<sub>s,maks</sub> = μ<sub>s</sub>·N = μ<sub>s</sub>·m·g</p>
                 <p>Savrulmamak için gereken, mevcudu aşmamalı:</p>
                 <div class="formul" style="max-width:280px"><div class="fm">m·ϑ²/r ≤ μ<sub>s</sub>·m·g</div></div>` },

        { baslik: 'Kütleyi sadeleştir',
          html: `<p>Her iki tarafta m var:</p>
                 <p>ϑ²/r ≤ μ<sub>s</sub>·g ⟹ ϑ² ≤ μ<sub>s</sub>·g·r</p>
                 <div class="formul" style="max-width:260px;border-top-color:var(--accent)">
                   <div class="fm" style="color:var(--accent)">ϑ<sub>maks</sub> = √(μ<sub>s</sub>·g·r)</div>
                 </div>
                 <p style="margin-top:12px"><strong>Kütle formülde yok.</strong> Kitabın s.102’de
                 sorduğu sorunun cevabı budur: güvenli sürat sınırı araç kütlesine bağlı değildir.</p>` },

        { baslik: 'Formülü yorumla',
          html: `<p>ϑ<sub>maks</sub> = √(μ<sub>s</sub>·g·r) üç şey söylüyor:</p>
                 <ul>
                   <li><strong>Yarıçap büyükse</strong> daha hızlı dönebilirsin — geniş virajlar
                   bu yüzden daha güvenlidir</li>
                   <li><strong>Yol ıslaksa</strong> μ<sub>s</sub> düşer ⟹ güvenli hız düşer. μ<sub>s</sub> dörtte birine
                   inerse hız yarıya iner</li>
                   <li><strong>Karekök var</strong> ⟹ yarıçapı 4 katına çıkarmak hızı ancak
                   2 katına çıkarır</li>
                 </ul>
                 <div class="kutu puf" style="margin-top:12px">
                   <p style="margin:0">Virajları <strong>eğimli</strong> (banked) yapmak
                   güvenli hızı daha da artırır: eğim, normal kuvvetin bir bileşenini merkeze
                   yönlendirir ve sürtünmeye yardım eder. Yarış pistlerindeki eğimli virajların
                   sebebi budur.</p>
                 </div>` }
      ]
    }
  ]
},

/* -------------------------------------------------------- Simülasyon */
sim: F.simler['cembersel-degiskenler'],

/* ------------------------------------------------------- Püf noktası */
puf: {
  html: `
    <p><strong>1 · Aynı katı cisim ⟹ T, f, ω aynı; ϑ yarıçapla orantılı.</strong>
    Plak, çark, pervane, dönme dolap — hepsinde geçerli. <code>ϑ ∝ r</code></p>

    <p><strong>2 · Kayış/dişli ile bağlıysa tam tersi:</strong> temas noktasındaki
    <strong>çizgisel hızlar eşittir</strong>, açısal hızlar yarıçapla ters orantılıdır.
    <code>ω ∝ 1/r</code>. Bisiklet dişlileri böyle çalışır.</p>

    <p><strong>3 · Merkezcil kuvvet diyagrama ayrı ok olarak çizilmez.</strong>
    Soruda "cisme etki eden kuvvetler" isteniyorsa ip gerilmesi, sürtünme, ağırlık yaz —
    merkezcil kuvvet yazma.</p>

    <p><strong>4 · Kare ve karekök orantılarını ezberle:</strong></p>
    <ul>
      <li>Hız 2 katına → a<sub>m</sub> ve F<sub>m</sub> <strong>4 katına</strong></li>
      <li>Yarıçap 2 katına (ϑ sabit) → a<sub>m</sub> <strong>yarıya</strong></li>
      <li>Periyot 2 katına → ϑ yarıya, a<sub>m</sub> <strong>dörtte bire</strong></li>
    </ul>

    <p><strong>5 · “Sabit” kelimesi tuzaktır — neyin sabit olduğuna bak.</strong>
    Öncülde <em>“düzgün çembersel harekette merkezcil ivme sabittir”</em> ya da
    <em>“merkezcil kuvvet sabittir”</em> yazıyorsa bu <strong>yanlıştır</strong>: ikisi de
    <strong>vektördür</strong> ve yönleri her an merkeze döndüğü için sürekli değişir.
    Sabit olan yalnızca <strong>büyüklükleridir</strong>.</p>

    <div style="background:var(--surface-0);border-radius:var(--r-sm);padding:14px;margin:12px 0">
      <table class="degisken-tablo" style="margin:0">
        <thead><tr><th>Nicelik</th><th>Büyüklüğü</th><th>Yönü</th><th>Kendisi sabit mi?</th></tr></thead>
        <tbody>
          <tr><td>Sürat (ϑ)</td><td>sabit</td><td>—<span style="color:var(--text-3)"> (skaler)</span></td><td class="sembol" style="color:var(--basari)">SABİT</td></tr>
          <tr><td>Hız vektörü</td><td>sabit</td><td>değişir</td><td class="sembol" style="color:var(--uyari)">DEĞİL</td></tr>
          <tr><td>Merkezcil ivme a<sub>m</sub></td><td>sabit</td><td>değişir</td><td class="sembol" style="color:var(--uyari)">DEĞİL</td></tr>
          <tr><td>Merkezcil kuvvet F<sub>m</sub></td><td>sabit</td><td>değişir</td><td class="sembol" style="color:var(--uyari)">DEĞİL</td></tr>
          <tr><td>Açısal hız ω</td><td>sabit</td><td>—<span style="color:var(--text-3)"> (dönme ekseni sabit)</span></td><td class="sembol" style="color:var(--basari)">SABİT</td></tr>
        </tbody>
      </table>
      <p style="margin:10px 0 0;font-size:.94em;color:var(--text-2)">Düzgün çembersel harekette
      <strong>gerçekten sabit olan tek vektörel nicelik ω’dır</strong>. Bu yüzden iki noktayı
      karşılaştıran sorularda ω üzerinden gitmek her zaman güvenlidir.</p>
    </div>

    <p><strong>6 · Virajda kütle sadeleşir:</strong> <code>ϑ<sub>maks</sub> = √(μ<sub>s</sub>·g·r)</code>.
    Soruda araç kütlesi verilmişse büyük ihtimalle tuzaktır.</p>

    <p><strong>7 · Düşey düzlemde dönme — en üst ve en alt nokta.</strong>
    Merkezcil kuvvet her zaman <strong>merkeze doğru</strong>dur; ağırlık ise her zaman
    <strong>aşağı</strong>. İkisinin yönü tepede aynı, dipte zıttır — gerilmenin
    farklı çıkmasının tek sebebi budur.</p>

    <div style="display:grid;gap:10px;margin:12px 0">
      <div style="background:var(--surface-0);border:1px solid var(--border);border-left:3px solid var(--b1);border-radius:var(--r-sm);padding:12px 14px">
        <strong style="color:var(--b1)">🔺 EN ÜST</strong> — merkez <em>aşağıdadır</em>, ağırlık da aşağı:
        <div class="formul" style="max-width:340px;margin:8px 0 0">
          <div class="fm">T<sub>üst</sub> + mg = F<sub>m,üst</sub> &nbsp;⟹&nbsp; T<sub>üst</sub> = F<sub>m,üst</sub> − mg</div>
        </div>
        <p style="margin:8px 0 0">Ağırlık merkezcil kuvvete <em>yardım eder</em> ⟹ ipe daha az iş düşer ⟹ <strong>gerilme en küçük</strong>.</p>
      </div>
      <div style="background:var(--surface-0);border:1px solid var(--border);border-left:3px solid var(--b7);border-radius:var(--r-sm);padding:12px 14px">
        <strong style="color:var(--b7)">🔻 EN ALT</strong> — merkez <em>yukarıdadır</em>, ağırlık aşağı:
        <div class="formul" style="max-width:340px;margin:8px 0 0">
          <div class="fm">T<sub>alt</sub> − mg = F<sub>m,alt</sub> &nbsp;⟹&nbsp; T<sub>alt</sub> = F<sub>m,alt</sub> + mg</div>
        </div>
        <p style="margin:8px 0 0">İp hem cismi çembere sokmalı <em>hem de</em> ağırlığı yenmeli ⟹ <strong>gerilme en büyük</strong>.</p>
      </div>
    </div>

    <div class="kutu dikkat" style="margin:12px 0">
      <div class="kutu-bas"><span class="ikon">⚠</span><span>Buradaki asıl tuzak: F<sub>m</sub> iki noktada aynı değildir</span></div>
      <p>Çok yaygın bir hata, iki denklemi aynı F<sub>m</sub> ile yazıp
      <code>T<sub>alt</sub> − T<sub>üst</sub> = 2mg</code> sonucuna varmaktır. Bu
      <strong>yanlıştır</strong> — çünkü düşey düzlemdeki dönme
      <strong>düzgün çembersel hareket değildir</strong>: cisim inerken hızlanır, çıkarken yavaşlar.
      Dolayısıyla <code>ϑ<sub>alt</sub> &gt; ϑ<sub>üst</sub></code> ve
      <code>F<sub>m,alt</sub> &gt; F<sub>m,üst</sub></code>.</p>
      <p>Serbestçe dönen bir ipte enerji korunumu iki noktayı bağlar (yükseklik farkı 2r):</p>
      <div class="formul" style="max-width:300px;margin:10px 0">
        <div class="fm">ϑ<sub>alt</sub>² = ϑ<sub>üst</sub>² + 4g·r</div>
      </div>
      <p>Bunu yerine koyunca gerçek sonuç çıkar:</p>
      <div class="formul" style="max-width:300px;margin:10px 0;border-top-color:var(--accent)">
        <div class="fm" style="color:var(--accent)">T<sub>alt</sub> − T<sub>üst</sub> = 6mg</div>
      </div>
      <p style="margin:0"><code>2mg</code> sonucu yalnızca cisim bir <strong>motorla sabit süratte</strong>
      döndürülüyorsa (çubuk, çark) doğrudur. İpe bağlı serbest dönmede doğru cevap
      <strong>6mg</strong>’dir.</p>
    </div>

    <p><strong>Tepe noktasının sınır hızı:</strong> Suyun dökülmemesi (ya da ipin gevşememesi)
    için en üstte en az <code>ϑ = √(g·r)</code> gerekir — bu hızda
    <code>T<sub>üst</sub> = 0</code> olur ve merkezcil kuvveti tek başına ağırlık sağlar.
    Bu durumda dipte <code>ϑ<sub>alt</sub>² = 5g·r</code> ve
    <code>T<sub>alt</sub> = 6mg</code> çıkar — yukarıdaki sonucun kontrolü.</p>

    <div style="background:var(--surface-0);border-radius:var(--r-sm);padding:14px;margin:14px 0">
      <p style="margin:0 0 8px;font-weight:600">8 · Hangi formülden başlamalı?</p>
      <table class="degisken-tablo" style="margin:0">
        <thead><tr><th>Soruda verilen</th><th>Başlangıç formülü</th></tr></thead>
        <tbody>
          <tr><td>Periyot T</td><td class="sembol">ω = 2π/T</td></tr>
          <tr><td>Frekans f (veya devir/dakika)</td><td class="sembol">ω = 2πf</td></tr>
          <tr><td>Çizgisel hız ϑ</td><td class="sembol">a<sub>m</sub> = ϑ²/r</td></tr>
          <tr><td>Açısal hız ω</td><td class="sembol">a<sub>m</sub> = ω²r</td></tr>
          <tr><td>Statik sürtünme katsayısı μ<sub>s</sub></td><td class="sembol">ϑ<sub>maks</sub> = √(μ<sub>s</sub>gr)</td></tr>
        </tbody>
      </table>
      <p style="margin:10px 0 0;font-size:.86em;color:var(--text-3)">
        Devir/dakika verilmişse önce 60’a böl, Hz’e çevir.
      </p>
    </div>`,

  ornekler: [
    {
      soru: `<p>Yarıçapı 2 m olan çemberde dönen 3 kg’lık bir cismin periyodu 4 s’dir.
             Merkezcil kuvvet kaç N’dır? (π ≈ 3)</p>`,
      taktikle: `<p>Zinciri takip et: ϑ = 2πr/T = (2·3·2)/4 = 3 m/s</p>
                 <p>a<sub>m</sub> = ϑ²/r = 9/2 = 4,5 m/s²</p>
                 <p style="margin-bottom:0">F<sub>m</sub> = m·a<sub>m</sub> = 3 · 4,5 = <strong>13,5 N</strong></p>`,
      uzun: `<p>ω = 2π/T = 6/4 = 1,5 rad/s</p>
             <p>ϑ = ω·r = 1,5·2 = 3 m/s</p>
             <p>F<sub>m</sub> = m·ϑ²/r = 3·9/2 = 13,5 N</p>`
    },
    {
      soru: `<p>Yarıçapı 40 m olan yatay bir virajda, lastik-yol statik sürtünme katsayısı
             μ<sub>s</sub> = 0,4’tür. Bir aracın savrulmadan dönebileceği en büyük sürat kaç m/s’dir?
             (g = 10 m/s²)</p>`,
      taktikle: `<p>Kütleye hiç bakma, formülde yok:</p>
                 <p style="margin-bottom:0">ϑ<sub>maks</sub> = √(μ<sub>s</sub>·g·r) = √(0,4·10·40) = √160 ≈ <strong>12,6 m/s</strong></p>`,
      uzun: `<p>m·ϑ²/r ≤ μ<sub>s</sub>·m·g ⟹ ϑ² ≤ μ·g·r = 160 ⟹ ϑ ≤ 12,6 m/s (≈ 45 km/s)</p>
             <p style="color:var(--text-3)">Yol ıslanıp μ<sub>s</sub> = 0,1’e düşerse: ϑ = √40 ≈ 6,3 m/s.
             Yani güvenli hız yarıya iner.</p>`
    },
    {
      soru: `<p>Bir cismin çizgisel hızı <strong>3 katına</strong> çıkarılırsa (yarıçap sabit),
             merkezcil ivmesi kaç katına çıkar?</p>`,
      taktikle: `<p>a<sub>m</sub> = ϑ²/r ⟹ <strong>a ∝ ϑ²</strong></p>
                 <p style="margin-bottom:0">3² = <strong>9 katına</strong></p>`,
      uzun: `<p>a₂/a₁ = (3ϑ)²/ϑ² = 9</p>
             <p style="color:var(--text-3)">"3 katına" diyenler kareyi almayı unutmuştur.
             Bu konuda kare/karekök hataları en sık puan kaybettiren yerdir.</p>`
    }
  ]
},

/* ------------------------------------------------------ Zorlayıcı sorular */
osym: [
  {
    baslik: 'Aynı cisim üzerindeki noktalar',
    kaynak: 'Çok adımlı',
    govde: `
      <p>Düzgün dönen bir disk üzerinde, merkeze uzaklıkları <strong>r</strong> ve
      <strong>3r</strong> olan K ve L noktaları bulunuyor.</p>
      <p>Buna göre K ve L noktaları için aşağıdakilerden hangisi <strong>yanlıştır</strong>?</p>`,
    gorsel: `
      <svg viewBox="0 0 520 200" xmlns="http://www.w3.org/2000/svg" role="img"
           aria-label="Dönen disk üzerinde merkeze r ve 3r uzaklıktaki K ve L noktaları">
        <rect width="520" height="200" fill="#0E1726"/>
        <circle cx="260" cy="100" r="82" fill="#1C2740" stroke="#4A5F86" stroke-width="2"/>
        <circle cx="260" cy="100" r="6" fill="#9AA5B1"/>
        <circle cx="260" cy="100" r="27" fill="none" stroke="#3A4E76" stroke-width="1" stroke-dasharray="4 4"/>
        <line x1="260" y1="100" x2="342" y2="100" stroke="#3A4E76" stroke-width="1.2"/>
        <circle cx="287" cy="100" r="7" fill="#4DA3FF"/>
        <text x="287" y="124" fill="#4DA3FF" font-size="13" font-family="system-ui" text-anchor="middle">K</text>
        <circle cx="342" cy="100" r="7" fill="#FFB020"/>
        <text x="342" y="124" fill="#FFB020" font-size="13" font-family="system-ui" text-anchor="middle">L</text>
        <path d="M287 92 L287 66" stroke="#35C08A" stroke-width="2.4"/>
        <path d="M287 58 L281 72 L293 72 Z" fill="#35C08A"/>
        <path d="M342 92 L342 38" stroke="#35C08A" stroke-width="2.4"/>
        <path d="M342 30 L336 44 L348 44 Z" fill="#35C08A"/>
        <text x="300" y="70" fill="#35C08A" font-size="12" font-family="system-ui">ϑ_K</text>
        <text x="356" y="44" fill="#35C08A" font-size="12" font-family="system-ui">ϑ_L</text>
        <text x="270" y="152" fill="#6F84A8" font-size="12" font-family="system-ui">r</text>
        <text x="306" y="152" fill="#6F84A8" font-size="12" font-family="system-ui">3r</text>
      </svg>`,
    secenekler: [
      'Periyotları eşittir',
      'Açısal hızları eşittir',
      'L’nin çizgisel hızı K’nınkinin 3 katıdır',
      'L’nin merkezcil ivmesi K’nınkinin 3 katıdır',
      'L’nin merkezcil ivmesi K’nınkinin 9 katıdır'
    ],
    dogru: 4,
    cozum: `
      <p>Aynı katı cisim üzerindeki noktalar <strong>aynı sürede bir tur</strong> atar:
      T ve ω eşittir. (A ve B doğru)</p>
      <p><strong>Çizgisel hız:</strong> ϑ = ω·r, ω eşit ⟹ ϑ ∝ r ⟹ ϑ<sub>L</sub> = 3·ϑ<sub>K</sub> ✓ (C doğru)</p>
      <p><strong>Merkezcil ivme:</strong> Burada dikkat! ω eşit olduğu için
      <strong>a<sub>m</sub> = ω²·r</strong> formülünü kullanmak gerekir:</p>
      <p>a<sub>m</sub> ∝ r ⟹ a<sub>L</sub> = <strong>3</strong>·a<sub>K</sub></p>
      <p>Yani <strong>D doğru, E yanlıştır</strong>.</p>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>E şıkkı çok cazip bir tuzaktır.</strong> "Hız 3 katıysa
        ivme 9 katıdır" diye düşünen öğrenci a = ϑ²/r formülünü kullanıyor — ama <em>r de
        değişiyor</em>! Doğru hesap: a = ϑ²/r = (3ϑ)²/(3r) = 9ϑ²/3r = <strong>3</strong>·(ϑ²/r).
        <br><strong>Kural:</strong> Aynı cisim üzerindeki noktaları karşılaştırırken
        <strong>ω sabittir</strong>, o yüzden <code>a = ω²r</code> formülünü seç.
        <code>a = ϑ²/r</code> seçersen iki değişken birden değiştiği için hata yaparsın.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: E</strong></p>`
  },
  {
    baslik: 'Virajda savrulma',
    kaynak: 'Kavram tuzağı',
    govde: `
      <p>Yatay bir virajı savrulmadan dönen bir otomobil için, aşağıdaki değişikliklerden
      hangisi <strong>güvenli azami sürati artırır</strong>?</p>`,
    secenekler: [
      'Aracın kütlesini azaltmak',
      'Aracın kütlesini artırmak',
      'Virajın yarıçapını artırmak',
      'Yolu ıslatmak',
      'Aracın lastiklerini genişletmek'
    ],
    dogru: 2,
    cozum: `
      <p>Güvenli azami sürat: <strong>ϑ<sub>maks</sub> = √(μ<sub>s</sub>·g·r)</strong></p>
      <p>Formülde yalnızca <strong>μ<sub>s</sub></strong>, <strong>g</strong> ve <strong>r</strong> var.</p>
      <ul>
        <li><strong>A ve B · Kütle:</strong> Formülde <em>yok</em> — sadeleşti. Değiştirmez.</li>
        <li><strong>C · Yarıçap:</strong> r artarsa ϑ<sub>maks</sub> <strong>artar</strong> ✓</li>
        <li><strong>D · Yolu ıslatmak:</strong> μ<sub>s</sub> <em>düşer</em> ⟹ güvenli sürat <em>azalır</em>.</li>
        <li><strong>E · Lastik genişletmek:</strong> Sürtünme temas alanına bağlı değildir
        (1.4.2). μ<sub>s</sub> değişmez ⟹ etkisi yok.</li>
      </ul>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>Bu soru üç konuyu birden yokluyor:</strong> merkezcil kuvvet,
        sürtünme modeli ve alan bağımsızlığı. E şıkkı özellikle 1.4.2’yi hatırlamayanları hedefler.
        <br><strong>Pratik karşılığı:</strong> Karayollarında keskin virajlar genişletilerek
        (r artırılarak) güvenli hız yükseltilir. Kütle değiştirmek işe yaramaz, çünkü ağır aracın
        hem gereken kuvveti hem de sürtünmesi aynı oranda artar.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: C</strong></p>`
  }
],

/* --------------------------------------------- Bağlam temelli sorular */
baglam: [
  {
    baslik: 'Otoyol mühendisinin viraj kararı',
    govde: `
      <p>Bir otoyolda sık kaza olan bir viraj var. Yarıçapı <strong>50 m</strong>,
      kuru asfaltta lastik-yol statik sürtünme katsayısı <strong>μ<sub>s</sub> = 0,8</strong>.
      Levhadaki hız sınırı <strong>72 km/s</strong>.</p>
      <p>Karayolları ekibi iki seçenek tartışıyor:</p>
      <ul>
        <li><strong>A planı:</strong> Virajı genişleterek yarıçapı 100 m’ye çıkarmak</li>
        <li><strong>B planı:</strong> Hız sınırını 54 km/s’ye düşürmek</li>
      </ul>
      <p><strong>Mevcut sınır güvenli mi? Yağmurda (μ<sub>s</sub> = 0,2) ne olur?</strong>
      (g = 10 m/s²)</p>`,
    gorsel: `
      <svg viewBox="0 0 520 210" xmlns="http://www.w3.org/2000/svg" role="img"
           aria-label="Otoyol virajında kuru ve ıslak zeminde güvenli hız karşılaştırması">
        <rect width="520" height="210" fill="#17223A"/>
        <path d="M30 186 Q 150 186 210 120 Q 262 56 400 56 L 490 56" stroke="#55555A" stroke-width="40" fill="none"/>
        <path d="M30 186 Q 150 186 210 120 Q 262 56 400 56 L 490 56" stroke="#E8C547" stroke-width="2" fill="none" stroke-dasharray="14 12"/>
        <g transform="translate(232,92) rotate(-42)">
          <rect x="-11" y="-18" width="22" height="36" rx="4" fill="#2E5C8A"/>
          <rect x="-8" y="-12" width="16" height="11" rx="2" fill="#9FC8E8"/>
        </g>
        <path d="M232 92 L300 148" stroke="#FF7A45" stroke-width="2.4" stroke-dasharray="4 4"/>
        <circle cx="304" cy="152" r="4" fill="#FF7A45"/>
        <text x="312" y="156" fill="#FF7A45" font-size="11" font-family="system-ui">merkez</text>
        <path d="M232 92 L188 48" stroke="#A78BFA" stroke-width="2.6"/>
        <path d="M180 40 L196 46 L188 56 Z" fill="#A78BFA"/>
        <text x="150" y="40" fill="#A78BFA" font-size="12" font-family="system-ui">sürtünme</text>
        <rect x="360" y="110" width="118" height="62" rx="6" fill="#1C2740" stroke="#4A5F86" stroke-width="1.4"/>
        <text x="419" y="132" fill="#A7B8D4" font-size="12" font-family="system-ui" text-anchor="middle">r = 50 m</text>
        <text x="419" y="150" fill="#35C08A" font-size="12" font-family="system-ui" text-anchor="middle">kuru: μs = 0,8</text>
        <text x="419" y="166" fill="#FF6B6B" font-size="12" font-family="system-ui" text-anchor="middle">yağmur: μs = 0,2</text>
        <text x="16" y="28" fill="#6F84A8" font-size="12" font-family="system-ui">levha: 72 km/s</text>
      </svg>`,
    adimlar: [
      { bas: 'Birimleri çevir',
        metin: 'Formüller m/s ister. 72 km/s = 72/3,6 = <strong>20 m/s</strong>. 54 km/s = <strong>15 m/s</strong>. Bu çevrimi atlamak en sık yapılan hatadır.' },
      { bas: 'Olayı fiziksel modele çevir',
        metin: 'Araç virajda çembersel hareket yapıyor. Merkezcil kuvveti <strong>sürtünme</strong> sağlıyor. Savrulmama koşulu: gereken ≤ sürtünmenin sunabileceği.' },
      { bas: 'Formülü sen çıkar',
        metin: 'm·ϑ²/r ≤ μ<sub>s</sub>·m·g ⟹ kütle sadeleşir ⟹ <strong>ϑ<sub>maks</sub> = √(μ<sub>s</sub>·g·r)</strong>' },
      { bas: 'Kuru zemini hesapla',
        metin: 'ϑ<sub>maks</sub> = √(0,8 · 10 · 50) = √400 = <strong>20 m/s</strong> = 72 km/s.<br>Levhadaki sınıra <strong>tam olarak eşit</strong> — güvenlik payı sıfır.' },
      { bas: 'Yağmuru hesapla',
        metin: 'ϑ<sub>maks</sub> = √(0,2 · 10 · 50) = √100 = <strong>10 m/s</strong> = 36 km/s.<br>Yani yağmurda güvenli hız <strong>yarıya</strong> iniyor — levhadaki 72 km/s son derece tehlikeli.' },
      { bas: 'İki planı karşılaştır',
        metin: '<strong>A planı</strong> (r = 100 m): kuruda √(0,8·10·100) = 28,3 m/s (102 km/s), yağmurda 14,1 m/s (51 km/s).<br><strong>B planı</strong> (sınır 15 m/s): yağmurdaki 10 m/s sınırının hâlâ üstünde.' },
      { bas: 'Karar ver ve yorumla',
        metin: 'Tek başına hiçbiri yetmiyor. Asıl sorun <strong>yağmur</strong>. Doğru çözüm: virajı genişletmek <em>ve</em> yağmurlu havada değişken hız sınırı uygulamak. Karayollarında elektronik levhaların olmasının sebebi budur.' }
    ],
    secenekler: [
      'Kuruda tam sınırda (20 m/s), yağmurda güvenli hız 10 m/s’ye düşer',
      'Kuruda da yağmurda da güvenli, değişiklik gerekmez',
      'Kuruda 40 m/s’ye kadar güvenli',
      'Güvenli hız araç kütlesine bağlı olduğu için hesaplanamaz',
      'Yağmurda güvenli hız 5 m/s’ye düşer'
    ],
    dogru: 0,
    cozum: `
      <p>ϑ<sub>maks</sub> = √(μ<sub>s</sub>·g·r)</p>
      <p><strong>Kuru:</strong> √(0,8·10·50) = √400 = <strong>20 m/s</strong> = 72 km/s —
      levhadaki sınıra tam eşit, güvenlik payı yok.</p>
      <p><strong>Yağmurlu:</strong> √(0,2·10·50) = √100 = <strong>10 m/s</strong> = 36 km/s —
      güvenli hız yarıya iner.</p>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>Karekökün anlamı:</strong> μ<sub>s</sub> dörtte birine (0,8 → 0,2) indi,
        ama hız yarıya (20 → 10) indi — çünkü karekök içinde. Bu, ıslak yolda neden bu kadar
        dikkatli olunması gerektiğini gösterir: sürtünme az değil <em>çok</em> düşer, hız sınırı ise
        sezgisel olarak sandığından fazla düşmelidir.
        <br><strong>D şıkkı</strong> kütle tuzağıdır — formülde kütle yok, sadeleşti.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: A</strong></p>`
  },
  {
    baslik: 'Suyu dökülmeyen kova',
    govde: `
      <p>Bir öğrenci, içi su dolu kovayı ipe bağlayıp <strong>düşey düzlemde</strong>
      hızlıca döndürüyor. Kova tam tepedeyken bile su dökülmüyor.</p>
      <p>Arkadaşı şaşırıyor: "Kova ters dönmüşken su neden düşmüyor? Yer çekimi çalışmıyor mu?"</p>
      <p>İpin uzunluğu <strong>1 m</strong>’dir.</p>
      <p><strong>Suyun dökülmemesi için tepe noktasındaki en küçük hız kaç m/s olmalıdır
      ve olayın açıklaması nedir?</strong> (g = 10 m/s²)</p>`,
    gorsel: `
      <svg viewBox="0 0 520 220" xmlns="http://www.w3.org/2000/svg" role="img"
           aria-label="Düşey düzlemde döndürülen kovanın tepe noktasındaki kuvvetleri">
        <rect width="520" height="220" fill="#17223A"/>
        <circle cx="260" cy="118" r="80" fill="none" stroke="#4A5F86" stroke-width="1.6" stroke-dasharray="5 6"/>
        <circle cx="260" cy="118" r="5" fill="#9AA5B1"/>
        <path d="M260 118 L260 42" stroke="#8A6A3A" stroke-width="2.2"/>
        <g transform="translate(260,38)">
          <path d="M-20 0 L20 0 L15 -26 L-15 -26 Z" fill="#7D8A99"/>
          <path d="M-14 -3 L14 -3 L11 -22 L-11 -22 Z" fill="#4DA3FF"/>
        </g>
        <path d="M300 26 L300 62" stroke="#FF8FA3" stroke-width="2.6"/>
        <path d="M300 70 L294 56 L306 56 Z" fill="#FF8FA3"/>
        <text x="312" y="48" fill="#FF8FA3" font-size="13" font-family="system-ui">G</text>
        <path d="M222 26 L222 62" stroke="#FF6B6B" stroke-width="2.6"/>
        <path d="M222 70 L216 56 L228 56 Z" fill="#FF6B6B"/>
        <text x="196" y="48" fill="#FF6B6B" font-size="13" font-family="system-ui">T</text>
        <text x="260" y="14" fill="#6F84A8" font-size="12" font-family="system-ui" text-anchor="middle">tepe noktası · ikisi de AŞAĞI</text>
        <path d="M180 118 L260 118" stroke="#4DA3FF" stroke-width="1.6"/>
        <text x="216" y="138" fill="#4DA3FF" font-size="12" font-family="system-ui" text-anchor="middle">r = 1 m</text>
        <path d="M334 96 A 80 80 0 0 1 320 152" stroke="#35C08A" stroke-width="2" fill="none"/>
        <path d="M316 160 L330 148 L334 158 Z" fill="#35C08A"/>
      </svg>`,
    adimlar: [
      { bas: 'Yanılgıyı adlandır',
        metin: '"Yer çekimi çalışmıyor" fikri yanlış. Yer çekimi her an çalışıyor ve su gerçekten <strong>düşüyor</strong> — ama kova da aynı hızla düştüğü için su kovadan ayrılamıyor.' },

      { bas: 'Tepe noktasındaki kuvvetleri yaz',
        metin: 'Kova tepedeyken merkez <strong>aşağıdadır</strong>. Suya etki eden iki kuvvet de aşağı doğrudur: <strong>ağırlık G</strong> ve <strong>kovanın tabanının uyguladığı N</strong>. İkisi birlikte merkezcil kuvveti sağlar.' },
      { bas: 'Denklemi kur',
        metin: 'Merkeze (aşağı) doğru pozitif alalım:<br><strong>G + N = m·ϑ²/r</strong>' },
      { bas: 'En küçük hız koşulunu bul',
        metin: 'N hiçbir zaman negatif olamaz (kova suyu çekemez, sadece itebilir). En küçük hız, <strong>N = 0</strong> olduğu andır — o anda merkezcil kuvveti tek başına ağırlık sağlar.' },
      { bas: 'Hesapla',
        metin: 'N = 0 ⟹ m·g = m·ϑ²/r ⟹ kütle sadeleşir ⟹ <strong>ϑ = √(g·r)</strong><br>ϑ = √(10 · 1) = <strong>3,16 m/s</strong>' },
      { bas: 'Gerçek açıklamayı ver',
        metin: 'Su dökülmüyor çünkü <strong>zaten düşüyor</strong> — ama düşerken izlediği eğri, kovanın izlediği çemberden daha "dışta" kalıyor. Yani kova suyun altından kaçmıyor, suyu yakalamaya devam ediyor. Bu hızın altına inersen su gerçekten dökülür.' }
    ],
    secenekler: [
      'ϑ ≥ 3,16 m/s; su düşüyor ama kova da aynı ivmeyle düştüğü için ayrılamıyor',
      'ϑ ≥ 10 m/s; merkezkaç kuvveti suyu dışarı ittiği için dökülmüyor',
      'ϑ ≥ 1 m/s; yer çekimi tepe noktasında etkisiz kalıyor',
      'Herhangi bir hızda dökülmez',
      'ϑ ≥ 3,16 m/s; merkezkaç kuvveti ağırlığı dengeliyor'
    ],
    dogru: 0,
    cozum: `
      <p>Tepe noktada hem ağırlık hem de kovanın uyguladığı kuvvet <strong>merkeze (aşağı)</strong>
      doğrudur:</p>
      <div class="formul" style="max-width:260px"><div class="fm">G + N = m·ϑ²/r</div></div>
      <p>En küçük hız N = 0 olduğunda: m·g = m·ϑ²/r ⟹ <strong>ϑ = √(g·r) = √10 ≈ 3,16 m/s</strong></p>
      <div class="kutu puf" style="margin-top:12px">
        <p style="margin:0"><strong>B ve E şıkları "merkezkaç kuvveti" uyduruyor</strong> —
        böyle bir kuvvet yoktur ve zaten olsaydı su dökülürdü, çünkü dışa doğru bir kuvvet
        suyu kovadan çıkarırdı.
        <br><strong>Doğru açıklama:</strong> Su gerçekten düşüyor. Ama serbest düşme yörüngesi,
        kovanın çembersel yörüngesinin <em>dışında</em> kaldığı için kova suyu yakalamaya
        devam ediyor. ϑ = √(gr) tam olarak bu ikisinin çakıştığı sınır hızdır.
        <br>Aynı fizik, uzay istasyonunun neden Dünya’ya düşmediğini de açıklar: düşüyor,
        ama yatay hızı yeterince büyük olduğu için sürekli Dünya’yı ıskalıyor.</p>
      </div>
      <p style="margin-bottom:0"><strong>Cevap: A</strong></p>`
  }
]

});
})();
