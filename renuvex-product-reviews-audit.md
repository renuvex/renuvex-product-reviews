# Renuvex Product Reviews — Read-Only Analysis, Verification, and Architecture Comparison

> **Amaç:** Bu doküman, ikas Review App projesini mevcut kodbase, resmî ikas dokümantasyonu, ikas MCP/API yetenekleri, browser smoke testleri, network/console çıktıları ve rakip widget davranışlarıyla karşılaştırmak için hazırlanmış read-only referans dokümanıdır.
>
> **Kritik sınır:** Bu dosya doğrudan uygulama başlatma talimatı değildir. AI agent bu dosyayı okuyarak analiz, kıyaslama, doğrulama, risk tespiti ve mimari öneri raporu üretmelidir. Kullanıcı açıkça istemedikçe kod yazmamalı, dosya değiştirmemeli, paket kurmamalı, migration çalıştırmamalı, deploy almamalı, veritabanı işlemi yapmamalı, ikas panelinde değişiklik yapmamalı ve MCP üzerinden write/mutation işlemi başlatmamalıdır.

---

## 0. Kullanım Modu: Read-Only Analysis Only

Bu dokümanın varsayılan çalışma modu **A seçeneğidir**:

> AI agent mevcut projeyi inceler, bu dokümanla karşılaştırır, resmî ikas dokümantasyonunu doğrular, gerekirse ikas MCP/API ve browser testleriyle kanıt toplar; ancak kullanıcı açıkça onay vermedikçe hiçbir değişiklik yapmaz.

### 0.1 Yapılabilecekler

AI agent aşağıdaki işleri yapabilir:

- Mevcut proje dosyalarını okuyabilir.
- Widget loader, storefront injection, API, database, admin panel ve test mantığını analiz edebilir.
- Resmî ikas dokümanlarını kontrol edebilir.
- ikas MCP varsa read/list/get seviyesinde kontroller yapabilir.
- Gerekirse browser/Playwright ile gerçek mağaza üzerinde smoke test yapabilir.
- Console log, network request, DOM snapshot, selector sonucu, script load sırası ve cache header bilgilerini inceleyebilir.
- Mevcut mimariyi bu dokümandaki beklentilerle karşılaştırabilir.
- Eksik, riskli, hatalı, geçici çözüm/hack veya yama gibi görünen alanları raporlayabilir.
- Kalıcı ve doğru mimari önerileri sunabilir.

### 0.2 Yapılmaması Gerekenler

Kullanıcı açıkça istemedikçe AI agent şunları yapmamalıdır:

- Kod yazmamalı veya değiştirmemeli.
- Dosya oluşturmamalı, silmemeli veya taşımamalı.
- Paket kurmamalı.
- Migration çalıştırmamalı.
- Database verisi değiştirmemeli.
- Deploy, build veya production işlem başlatmamalı.
- ikas panelinde script ekleme/silme/güncelleme yapmamalı.
- MCP üzerinden mutation/write işlemi çalıştırmamalı.
- “Hızlı çözüm”, “geçici hack”, “yama”, “selector uydurma” gibi kalıcı olmayan yaklaşımlar önermemeli.

### 0.3 Temel Kalite İlkesi

Mevcut projedeki mantık yanlışsa veya düzeltilmesi gerekiyorsa amaç sadece sorunu susturmak değildir. Amaç:

- resmî ikas dokümanlarıyla uyumlu,
- tema değişikliklerine dayanıklı,
- test edilebilir,
- izlenebilir,
- idempotent,
- ölçeklenebilir,
- uzun vadede sürdürülebilir

bir mimari önermektir.

Hack/yama yaklaşımı kabul edilmez. Eğer mevcut çözüm geçici görünüyorsa raporda açıkça **“geçici/hack riski”** olarak işaretlenmelidir.

### 0.4 No Patch / No Hack Principle

Bu dokümanın en önemli mimari ilkesi şudur:

> Sorun yanlış mimariden kaynaklanıyorsa geçici selector yaması, hardcoded class ekleme, sadece belirli tema için çalışan hızlı düzeltme veya “şimdilik çalışsın” yaklaşımı önerilmemelidir.

Agent her bulguda şu ayrımı yapmalıdır:

- **Kalıcı mimari ihtiyacı:** Sistematik çözüm gerektirir; örneğin theme adapter, config schema, widget registry, idempotent mount sistemi, cache/versioning veya test altyapısı.
- **Geçici yama riski:** Tek tema/class/DOM sırasına bağımlı, tekrar kırılma ihtimali yüksek çözümler.
- **Kabul edilebilir küçük düzeltme:** Mevcut doğru mimarinin içinde kalan, test edilebilir ve tekrar kırılma riski düşük düzeltmeler.

Eğer mevcut projedeki mantık yanlışsa agent sadece “şunu değiştir” dememeli; yanlışlığın kök nedenini, kalıcı mimari karşılığını ve test kanıtını birlikte raporlamalıdır.

### 0.5 Kanıt Seviyesi Standardı

Agent her önemli bulguyu aşağıdaki kanıt seviyelerinden biriyle etiketlemelidir:

| Kanıt Seviyesi | Anlamı |
|---|---|
| Official docs verified | Resmî ikas dokümantasyonu ile doğrulandı |
| MCP verified | ikas MCP read-only çıktısıyla doğrulandı |
| API verified | Resmî API/read endpoint sonucu ile doğrulandı |
| Browser verified | Gerçek browser/Playwright testi ile doğrulandı |
| Network verified | Network request/response/header çıktılarıyla doğrulandı |
| Console verified | Console log/error/warning çıktılarıyla doğrulandı |
| Codebase verified | Mevcut proje dosyalarında doğrulandı |
| Benchmark observed | Yotpo/Judge.me/Okendo gibi rakip gözleminden çıkarıldı |
| Assumption | Henüz doğrulanmadı, varsayım |
| Risk / needs confirmation | Riskli veya doğrulanması gereken konu |

Rapor, sadece tahminlerden oluşmamalıdır. Her kritik iddia mümkünse kaynak, dosya yolu, doküman linki, MCP çıktısı, network kaydı veya browser test bulgusuyla desteklenmelidir.

### 0.6 Test Mağazası URL ve Hedef Bilgiler

Browser/Playwright smoke test yapılacaksa kullanıcı test mağazasının URL’sini açıkça vermelidir. URL verilmezse agent test yapmaya çalışmamalı; raporda “test target URL missing” olarak belirtmelidir.

Önerilen prompt alanı:

```text
Test mağazası URL: https://dev-mertcopper.ikas.shop/
Test edilecek ortam: development / staging / production
Widget script URL: https://widget.renuvex.app/widget.js?publicApiKey=...
Test kapsamı: home, category/listing, product detail, mobile, SPA back/forward, lazy load
```

Notlar:

- Test mağazası URL’si verilmesi **değişiklik izni anlamına gelmez**.
- Agent URL üzerinde sadece read-only browser testi, console/network gözlemi ve DOM incelemesi yapmalıdır.
- Public API key gibi public client identifier’lar test bağlamında görülebilir; ancak private token, admin token, secret, access token veya kişisel veri paylaşılmamalıdır.
- Eğer production mağaza test edilecekse agent daha dikkatli olmalı; form submit, review submit, order/customer değişikliği veya gerçek kullanıcı davranışı simülasyonu yapmamalıdır.

---

## 1. Resmî Doküman Doğrulama Kapsamı

Her analizde önce resmî ikas kaynakları kontrol edilmelidir. Bu dokümandaki linkler başlangıç listesidir; ancak agent yalnızca bu linklerle sınırlı kalmamalıdır. `builders.ikas.com`, `ikas.dev`, ikas Dashboard/Theme/Partner dokümanları ve varsa MCP dokümanları da taranmalıdır.

### 1.1 Öncelikli Resmî Kaynaklar

| Kaynak | URL | Neden Önemli |
|---|---|---|
| Storefront Events Overview | https://builders.ikas.com/docs/storefront-events | Storefront event yapısının genel mantığı |
| Storefront Events Quick Start | https://builders.ikas.com/docs/storefront-events/quick-start | `window.IkasEvents` ile event aboneliği |
| Storefront Events Event Types | https://builders.ikas.com/docs/storefront-events/events | PageView, ViewContent, AddToCart, Purchase vb. olaylar |
| Storefront Events JavaScript Example | https://builders.ikas.com/docs/storefront-events/example-file | Script örneği ve handler mantığı |
| Storefront Events Hosting | https://builders.ikas.com/docs/storefront-events/hosting | Script barındırma ve yükleme stratejisi |
| Storefront Events Support | https://builders.ikas.com/docs/storefront-events/support | Kontrol listesi ve destek akışı |
| ikas Admin MCP Capabilities | https://builders.ikas.com/docs/ikas-ai/mcp-capabilities | MCP yetenekleri, özellikle script yönetimi ve admin kontrolleri |
| API Introduction | https://ikas.dev/docs/intro | Admin API genel bilgi ve scope mantığı |
| Authentication | https://ikas.dev/docs/api/getting-started/authentication | Private App ve access token mantığı |
| Storefronts | https://ikas.dev/docs/api/admin-api/storefronts | Storefront bilgileri ve script yönetimi |
| Webhooks | https://ikas.dev/docs/api/admin-api/webhooks | Webhook kayıt/listeme/silme, event push mantığı |
| Products | https://ikas.dev/docs/api/admin-api/products | Review-product eşleştirme, ürün ID, varyant ve kategori ilişkileri |
| Orders | https://ikas.dev/docs/api/admin-api/orders | Verified review, satın alma doğrulaması ve review request senaryoları |
| Customers | https://ikas.dev/docs/api/admin-api/customers | Müşteri eşleştirme, e-posta, sipariş geçmişi ve hesap durumu |
| Categories | https://ikas.dev/docs/api/admin-api/categories | Kategori sayfalarında badge/summary görünürlüğü |
| Sales Channels | https://ikas.dev/docs/api/admin-api/sales-channels | Çoklu kanal/storefront ayrımı |
| Merchant | https://ikas.dev/docs/api/admin-api/merchant | Mağaza kimliği ve hesap bağlamı |
| API Reference | https://ikas.dev/docs/api-reference | Şema ve endpoint doğrulama |

### 1.2 Resmî Kaynak Öncelik Kuralı

- Yeni geliştirme kararlarında öncelik `builders.ikas.com` ve güncel ikas MCP/Builder dokümanlarında olmalıdır.
- `ikas.dev` üzerindeki v1 Admin API dokümanları hâlâ ürün, müşteri, sipariş, storefront ve webhook doğrulaması için kullanılabilir.
- Resmî dokümanla doğrulanmayan her bilgi raporda **“varsayım”** veya **“doğrulanması gereken konu”** olarak işaretlenmelidir.
- Rakip uygulama gözlemleri, örneğin Yotpo network çıktıları, sadece benchmark ve mimari fikir kaynağıdır. Resmî ikas davranışı yerine geçmez.

---

## 2. MCP Kullanım Kuralları

ikas MCP kurulumu mevcutsa agent bunu doğrulama amacıyla kullanabilir.

### 2.1 MCP ile Yapılabilecek Read-Only Kontroller

- Mevcut mağaza/storefront bilgilerini listeleme.
- Yüklü scriptleri listeleme.
- Script placement ve aktif/pasif durumunu kontrol etme.
- Storefront event ve admin capability alanlarını doğrulama.
- Mevcut entegrasyonun gerçekten ikas tarafına nasıl bağlandığını inceleme.
- Projedeki varsayımların MCP sonuçlarıyla uyuşup uyuşmadığını kontrol etme.

### 2.2 MCP ile Yapılmaması Gerekenler

Kullanıcı açıkça onay vermedikçe:

- Script oluşturma.
- Script silme.
- Script güncelleme.
- Storefront ayarı değiştirme.
- Webhook ekleme/silme.
- Ürün/müşteri/sipariş verisi değiştirme.
- Admin mutation/write işlemi çalıştırma.

### 2.3 MCP Kanıt Standardı

MCP sonucu rapora şu formatta yazılmalıdır:

| Kontrol | MCP Sonucu | Projedeki Varsayım | Uyum | Risk | Not |
|---|---|---|---|---|---|

MCP ile browser sonucu çelişirse otomatik düzeltme yapılmaz. Çelişki raporlanır.

---

## 3. Browser / Playwright Gerçek Doğrulama Kapsamı

Agent gerekli gördüğünde gerçek browser testi yapmalıdır. Amaç kod değiştirmek değil, mevcut davranışı kanıt toplamaktır.

### 3.0 Test Ön Koşulları

Browser/Playwright testi için agent önce hedefleri netleştirmelidir:

| Alan | Gerekli mi? | Açıklama |
|---|---:|---|
| Test mağazası URL | Evet | Örn. `https://dev-mertcopper.ikas.shop/` |
| Widget script URL | Tercihen evet | Hangi scriptin yüklendiği network üzerinden de doğrulanabilir |
| Test ortamı | Evet | development/staging/production ayrımı |
| Test edilecek sayfalar | Evet | Home, kategori, ürün detay, arama vb. |
| Public tenant identifier | Opsiyonel | `publicApiKey`, `merchantId` gibi public identifier’lar |
| Private token/secret | Hayır | Asla istenmemeli veya kullanılmamalı |

Agent test başlamadan önce hedef URL’nin gerçekten erişilebilir olduğunu, mağazanın test/staging olup olmadığını ve yapılacak testlerin read-only kalacağını raporda belirtmelidir.


### 3.1 Test Edilecek Sayfalar

- Home page ürün gridleri
- Kategori/listing sayfaları
- Arama sonuçları sayfası
- Ürün detay sayfası
- Related/recommended products alanları
- Mini cart/drawer gibi badge gösterilmemesi gereken alanlar
- Mobil görünüm
- Desktop görünüm
- Dil veya locale değişimi varsa TR/EN görünümler
- Lazy load veya infinite scroll alanları

### 3.2 Toplanacak Kanıtlar

- Console error/warning çıktıları
- Network request listesi
- Script load sırası
- Response status kodları
- Cache-Control, ETag, Last-Modified, Age, CDN cache, Vercel cache, server-timing gibi header bilgileri
- Widget JS boyutu, content-encoding, content-type ve compression türü
- `widget.js`, loader, initializer, analytics, config endpoint ve widget asset URL ayrımı
- `publicApiKey`, `merchantId`, `guid`, `languageCode` gibi public parametrelerin nasıl kullanıldığı
- DOM selector sonuçları
- Duplicate badge sayısı
- Badge icon + count aynı anda geliyor mu
- Layout shift / CLS riski
- SPA route geçişinde widget yeniden render oluyor mu
- Back/forward navigasyonunda badge kayboluyor mu
- Script iki kez yüklenirse idempotency korunuyor mu

### 3.3 Minimum Smoke Test Senaryoları

| Test | Beklenen Sonuç |
|---|---|
| İlk sayfa açılışı | Widget script 200 döner, console error yoktur |
| Ürün kartı badge | Her üründe en fazla bir badge vardır |
| Product page widget | Star rating ve main review alanı doğru yerde görünür |
| Lazy load | Yeni gelen ürünlerde badge yeniden yerleşir |
| SPA route change | Sayfa geçişinden sonra widget yeniden init olur |
| Browser back | Geri dönünce badge kaybolmaz |
| Mobile viewport | Badge taşma/kesilme yapmaz |
| Network failure simülasyonu | Widget tüm sayfayı bozmaz, fallback çalışır |
| Duplicate script | İkinci yüklemede duplicate DOM oluşmaz |

### 3.4 Console ve Network İnceleme Formatı

Agent console/network bulgularını serbest metinle değil, mümkünse aşağıdaki formatla raporlamalıdır:

| Alan | Örnek / Beklenen Kontrol |
|---|---|
| Page URL | Test edilen sayfanın tam URL’si |
| Script URL | Yüklenen widget/loader script URL’si |
| Status | 200/304/4xx/5xx |
| Cache | `HIT`, `MISS`, `no-store`, `max-age`, `must-revalidate` vb. |
| Size | JS transfer size ve encoded size |
| Load order | Loader → config → widget asset → analytics sırası |
| Console | Error/warning var mı? Stack trace hangi dosyada? |
| Network errors | Failed request, CORS, timeout, 401/403/404/500 var mı? |
| DOM result | Kaç widget/badge mount edildi? Duplicate var mı? |
| Runtime state | init/refresh/idempotency çalışıyor mu? |
| Evidence level | Browser verified / Network verified / Console verified |

Özellikle şu karşılaştırma yapılmalıdır:

- Rakipteki Yotpo benzeri yapı: loader + initializer + modüler widget asset + analytics + config/customization.
- Mevcut yapı: tek `widget.js?publicApiKey=...` mi, yoksa ayrık loader/config/asset mimarisi mi?
- Cache açısından: statik asset uzun cache alıyor mu, config kısa cache alıyor mu, dinamik JS gereksiz `no-store` veya `must-revalidate` ile mi geliyor?

---

## 4. Badge Injection Mantığı ve Uygulama Stratejileri

Bu bölüm, ikas dokümantasyonunda doğrudan bulunmayan ancak review widget'ının farklı temalarda daha stabil çalışması için uygulanması gereken stratejileri içerir.

### 4.1 Badge Injection Mantığı

- **Idempotent yerleştirme:** Badge her ürün kartına yalnızca bir kez yerleştirilmelidir. Eksik veya yarım render edilmiş bir badge algılanırsa yeniden render edilerek tamamlanmalıdır.
- **Atomic render:** İkon, rating ve count aynı render akışında üretilmelidir. “Sayı var, ikon yok” gibi yarım durumlar kabul edilmemelidir.
- **Inline SVG veya güvenilir asset stratejisi:** İkon için font/sprite bağımlılığı azaltılmalıdır.
- **Placeholder:** Veri gelene kadar kontrollü skeleton/placeholder gösterilebilir.
- **Fail-safe davranış:** Review API veya widget config başarısız olursa ürün kartı layout’u bozulmamalıdır.

### 4.2 Selector Discovery ve Tema Dayanıklılığı

ikas temalarında class isimleri değişebileceği için tek selector’a bağımlı kalınmamalıdır.

Önerilen sırayla discovery:

1. Resmî/kararlı `data-*` attribute’ları
2. Product ID / variant ID / product slug içeren attribute veya URL sinyalleri
3. Ürün kartı wrapper’ları
4. Product title container
5. Heading etiketleri (`h2`, `h3`, `h4`)
6. Product link (`a[href*="/products/"]`, tema yapısına göre değişebilir)
7. İçerik eşleşmesi
8. Tema profili fallback’i

### 4.3 Tema Profili / Theme Adapter Fikri

Eğer ikas temalarında class isimleri çok değişiyorsa projeye tema seçme veya otomatik tema profili tespit özelliği eklenmesi değerlendirilebilir.

Önerilen yaklaşım:

- Global default selector strategy
- Tema bazlı override/adapters
- Admin panelde “Tema Profili” seçimi
- Auto-detect modu
- Debug modda bulunan selector raporu
- Storefront bazlı selector config
- Merchant bazlı custom selector override
- Fallback başarısız olduğunda görünür debug raporu

Bu özellik hack değildir; doğru tasarlanırsa kalıcı mimari parçasıdır.

### 4.4 Kara Liste / Beyaz Liste

Badge gösterilmemesi gereken alanlar:

- Mini cart
- Drawer
- Quick view modal
- Header search suggest
- Slider/karusel kopyaları
- Hidden template node’ları
- Admin preview alanları

Badge gösterilmesi gereken alanlar:

- Product listing grid
- Category listing
- Search result listing
- Product detail star summary
- Product detail reviews main widget

---

## 5. Widget Loader Mimarisi

### 5.1 Mevcut Basit Model

Mevcut örnekte widget şu yapıdadır:

```txt
https://widget.renuvex.app/widget.js?publicApiKey=...
```

Bu model MVP için kabul edilebilir. Public API key ile tenant/merchant tespiti yapılabilir. Ancak kalıcı mimaride tek dosyaya her şeyi yüklemek yerine daha modüler bir loader mimarisi değerlendirilmelidir.

### 5.2 Rakip Benchmark: Yotpo Benzeri Ayrıştırılmış Loader Modeli

Yotpo örneğinde gözlenen yapı:

- Merchant/app guid ile loader çağrısı
- Birden fazla widget instance’ı
- Her widget için `instanceId`
- Her widget için `templateAssetUrl`
- Ayrı initializer script
- Ayrı analytics/pixel bundle
- Widget bazlı config/customization
- Feature flag mantığı
- Refresh/init fonksiyonları
- Cache edilebilir versiyonlu assetler
- Dil kodu parametresi
- Star ratings, main reviews, reviews tab, Q&A, carousel, SEO page gibi çoklu widget ayrımı

Bu doğrudan kopyalanmamalıdır; ancak mimari ders olarak kullanılabilir.

### 5.3 Önerilen Kalıcı Loader Mimarisi

Önerilen yapı:

```txt
/v1/loader/{publicApiKey}?storefrontId=...&languageCode=...
```

Loader’ın görevi:

- Merchant config almak
- Storefront/theme config almak
- Gerekli widget modüllerini belirlemek
- Versioned JS/CSS assetleri yüklemek
- Global init/refresh API sağlamak
- Duplicate load guard çalıştırmak
- Debug mode desteklemek

Önerilen asset yapısı:

```txt
/v1/assets/widget-core.{version}.js
/v1/assets/badge-widget.{version}.js
/v1/assets/main-widget.{version}.js
/v1/assets/styles.{version}.css
/v1/config/{publicApiKey}.json
```

### 5.4 Cache Stratejisi

Loader ve asset cache ayrılmalıdır:

| Dosya | Cache Stratejisi |
|---|---|
| Loader JS | Kısa cache veya must-revalidate |
| Versioned asset JS/CSS | Uzun cache, immutable |
| Merchant config | Kısa cache veya stale-while-revalidate |
| Review count endpoint | Kısa cache |
| Review list endpoint | Sayfalama + cache |
| Admin preview | Cache devre dışı veya düşük cache |

Mevcut Vercel örneğinde `cache-control: public, max-age=0, must-revalidate` MVP için güvenli olabilir; ancak performans için versioned assetlerde uzun cache tercih edilmelidir.

### 5.5 Widget Mantığı Doğru mu?

Basit `widget.js?publicApiKey=...` mantığı tamamen yanlış değildir. Başlangıç için anlaşılır ve yönetilebilir bir bootstrap modelidir. Ancak uzun vadede:

- Çoklu widget,
- tema profili,
- dil desteği,
- merchant bazlı config,
- versioning,
- cache optimizasyonu,
- refresh/init API,
- debug mode,
- idempotent reload,
- widget instance ayrımı

gerekiyorsa tek dosyalı basit yapı yetersiz kalabilir.

Bu nedenle öneri:

> MVP: `widget.js?publicApiKey=...` kabul edilebilir.  
> Kalıcı mimari: loader + config + versioned asset + widget registry + init/refresh API modeline evrilmelidir.

---

## 6. Yotpo Benchmark Notları

Bu bölüm sadece benchmark içindir. Yotpo kodu, tasarımı veya assetleri kopyalanmamalıdır.

### 6.1 Gözlenen Network Örnekleri

Yotpo tarafında gözlenen örnekler:

```txt
https://staticw2.yotpo.com/{guid}/widget.js
https://cdn-widgetsrepository.yotpo.com/v1/loader/{guid}?languageCode=...
https://staticw2.yotpo.com/widget-assets/yotpo-pixel/{date}/bundle.js
```

Bizim örnek:

```txt
https://widget.renuvex.app/widget.js?publicApiKey=...
```

### 6.2 Yotpo’dan Alınabilecek Mimari Dersler

- Loader tek başına bütün işi yapmıyor; bağımlılıkları yüklüyor.
- Widgetlar instance bazlı ayrılmış.
- Main reviews, star rating, carousel, Q&A, SEO page gibi farklı widget türleri var.
- Assetler versiyonlu dosyalarla geliyor.
- Analytics/pixel ayrı bundle olarak yükleniyor.
- Feature flag ve customization alanları config içinde tutuluyor.
- Init/refresh fonksiyonları mevcut.
- Cache stratejisi loader ve asset bazında ayrışıyor.
- Dil/localization parametresi dikkate alınıyor.

### 6.3 Bizim Projede Kıyaslanacak Başlıklar

| Başlık | Mevcut Projede Kontrol Edilecek |
|---|---|
| Loader | Tek dosya mı, yoksa config/asset ayrımı var mı? |
| Public key | Merchant lookup güvenli mi? |
| Widget registry | Badge, main review, carousel gibi widgetlar ayrılmış mı? |
| Theme config | Tema bazlı selector config var mı? |
| Init/refresh | SPA geçişinde yeniden init edilebiliyor mu? |
| Duplicate guard | Aynı script iki kez yüklenince DOM bozuluyor mu? |
| Cache | Loader ve asset cache ayrılmış mı? |
| Localization | Dil kodu ve metinler config üzerinden geliyor mu? |
| Debug mode | Selector/network/render raporu alınabiliyor mu? |
| Error handling | Widget hatası mağaza sayfasını bozuyor mu? |

---

### 6.4 Yotpo vs Mevcut Yapı: Mimari Olgunluk Karşılaştırması

Bu bölüm, başka bir LLM raporundan gelen önemli mimari çıkarımların bu dokümana entegre edilmiş hâlidir. Amaç Yotpo'yu birebir kopyalamak değil; olgun bir widget platformunun hangi katmanlarla çalıştığını anlamak ve mevcut projenin hangi noktalarda kalıcı mimariye evrilmesi gerektiğini tespit etmektir.

#### Yotpo tarafında gözlenen genel mantık

- **Loader + initializer + modüler widget asset** yapısı vardır.
- Tek script içinde her şeyi taşımak yerine farklı sorumluluklar ayrılmıştır.
- Widget'lar ayrı ayrı yönetilir: star rating, main reviews, carousel, Q&A, SEO page, reviews tab, promoted products vb.
- Merchant config, feature flag, çeviri, stil, font, CSS override, analytics ve runtime init katmanları ayrıdır.
- Yotpo daha çok tek bir yorum widget'ı değil, **UGC widget platformu/runtime sistemi** gibi çalışır.

#### Mevcut proje tarafında kontrol edilmesi gereken olası yapı

- Yapı hâlâ **tek embed script** mantığına yakın olabilir.
- `publicApiKey` veya `merchantId` ile tenant/merchant çözülüyor olabilir.
- Script yüklendiğinde config alma, veri çekme ve render işlemleri tek akışta ilerliyor olabilir.
- Bu yaklaşım MVP için kabul edilebilir; ancak Yotpo kadar katmanlı, cache dostu ve genişletilebilir olmayabilir.

Agent bu farkı incelerken kesin hüküm vermemeli; mevcut kodbase, network çıktısı, build çıktısı ve browser davranışıyla kanıt toplamalıdır.

### 6.5 En Büyük Mimari Farklar

| Alan | Yotpo'da Gözlenen Yaklaşım | Mevcut Projede Kontrol Edilecek Risk |
|---|---|---|
| Mimari katman sayısı | Loader, initializer, analytics, widget assetleri, config/customization, CSS override, feature flags | Embed script + config + render tek akışta mı? |
| Modülerlik | Her widget ayrı asset veya instance olarak yönetiliyor | Tüm layout ve ikonlar tek `widget.js` içine mi giriyor? |
| Konfigürasyon | Metin, renk, font, locale, feature flag, CSS override ve widget ayarları veriyle yönetiliyor | Davranışlar config yerine kod içine gömülü mü? |
| Feature flags | Media, sorting, summary, translation, search, rich snippet vb. aç/kapat yapılabiliyor | Feature yönetimi manuel veya kod tabanlı mı? |
| Asset yükleme | Loader gerekli initializer/analytics/widget bundle'larını sonradan yüklüyor | İlk script gereğinden fazla büyük mü? |
| Cache/dağıtım | CDN, versioned bundle URL'leri ve ayrık cache stratejisi var | Dinamik JS üretimi, `no-store`, `MISS`, `max-age=0` gibi zayıf cache sinyalleri var mı? |
| Çok dillilik | `languageCode`, locale bazlı metinler ve config var | Dil desteği merkezi config ile mi yönetiliyor? |
| Stil izolasyonu | Widget bazlı CSS override, customization CSS, font yükleme ve namespace mantığı var | Global CSS veya tema CSS'i widget'ı bozabiliyor mu? |
| Genişleme kabiliyeti | Aynı altyapıdan birçok widget türü çıkıyor | Sistem sadece tek reviews akışına mı bağlı? |

### 6.6 Mevcut Sistemi Güçlendirmek İçin İncelenecek Mimari Hedefler

Bu maddeler doğrudan uygulanacak görev değildir. Agent yalnızca mevcut projede bu ihtiyaçların olup olmadığını analiz etmeli ve raporlamalıdır.

1. **Tek dosya mantığından çıkma ihtiyacı**
   - `loader.js`
   - `initializer.js`
   - `reviews-main.js`
   - `star-rating.js`
   - `reviews-carousel.js`
   - `write-review.js`
   - `widget.css`

2. **Script ile config'i ayırma**
   - Her merchant için farklı dinamik JS üretmek yerine statik, cache'lenebilir loader tercih edilmelidir.
   - Merchant/storefront/product bazlı ayarlar ayrı config endpointinden okunmalıdır.
   - Örnek hedef mantık:
     - `/widget/loader.js`
     - `/api/public/widget-config?merchantId=...&storefrontId=...&productId=...&locale=...`

3. **Widget bazlı modüler yapı**
   - Listing star badge
   - PDP review summary
   - Main reviews list
   - Write review form
   - Review carousel
   - Q&A
   - SEO/crawlable reviews section

4. **Feature flag sistemi**
   - Medya yükleme
   - Puana göre filtre
   - Sıralama
   - Doğrulanmış alıcı rozeti
   - Yorum özeti / AI summary
   - Çeviri
   - Schema/rich snippet
   - Review form alanları
   - Plan/merchant bazlı özellik açma-kapama

5. **CSS izolasyonu**
   - Tüm class'lar namespace'lenmelidir.
   - Global reset kullanılmamalıdır.
   - Stiller widget container içine scoped olmalıdır.
   - Tema CSS'inden minimum etkilenmelidir.
   - Gerekirse belirli alt widgetlarda Shadow DOM değerlendirilebilir.

6. **Public config şeması**
   - `locale`
   - `colors`
   - `typography`
   - `iconStyle`
   - `featureFlags`
   - `texts`
   - `placementRules`
   - `themeProfile`
   - `reviewSettings`
   - `seoSettings`

7. **DOM mount sistemi**
   - Primary selector
   - Fallback selector
   - Retry
   - MutationObserver
   - SPA route refresh
   - Duplicate guard
   - Debug output

8. **Asset loading stratejisi**
   - İlk yüklenen loader küçük olmalıdır.
   - Listing sayfalarında sadece star/badge bundle yüklenmelidir.
   - PDP'de main reviews ve write-review bundle'ları gerektiğinde yüklenmelidir.
   - Carousel, Q&A, SEO page gibi modüller ihtiyaç oldukça lazy load edilmelidir.

9. **Cache/versioning stratejisi**
   - Loader uzun cache alabilir ama güvenli invalidation stratejisi olmalıdır.
   - Widget bundle'ları versioned URL ile yayınlanmalıdır.
   - Config endpoint kısa süreli cache almalıdır.
   - Review data API düzeyinde cachelenmeli ve stale/fallback davranışı tanımlanmalıdır.

10. **Analytics ve error handling**
    - Widget init başarısı
    - Mount başarısızlığı
    - Selector bulunamadı
    - Review fetch başarısız
    - Submit hata oranı
    - Render süresi
    - Duplicate widget tespiti
    - Network timeout

11. **Rich snippet / SEO katmanı**
    - Product + AggregateRating JSON-LD
    - Review schema
    - Crawlable review content
    - SEO page mantığı
    - Schema'nın Google yönergeleri ve ikas ürün sayfası çıktısıyla çakışıp çakışmadığı

12. **Merchant panelini veri odaklı kurma**
    - Yıldız rengi
    - Badge text
    - Review form alanları
    - Medya açık/kapalı
    - Doğrulanmış alıcı gösterimi
    - Widget başlıkları
    - Buton metinleri
    - Tema profili / custom selector override

### 6.7 Mevcut Proje İçin Olası Eksi Puan Kontrol Listesi

Aşağıdaki maddeler kesin bulgu değildir; mevcut projede doğrulanması gereken risk başlıklarıdır. Agent bunları kodbase, API, network, browser ve test çıktılarıyla kanıtlamadan kesin sonuç gibi yazmamalıdır.

| Risk Başlığı | Neden Önemli? | Kanıt Nasıl Toplanır? |
|---|---|---|
| Sıfır otomatik test | Public POST ve widget render yüzeylerinde regresyon riski yaratır | Repo test dosyaları, package scripts, CI çıktısı |
| Public POST validasyon eksikleri | Review submit, rate limit, spam, CORS ve payload güvenliği etkilenir | API route kodu, schema validation, negative tests |
| `Access-Control-Allow-Origin: *` | Public endpointlerde kötüye kullanım ve veri sızıntısı riski doğurabilir | Network header, API middleware, route response |
| Gereksiz geniş OAuth scope | `write_orders` / `write_inventories` gibi review app için gereksiz yetkiler güvenlik riskidir | OAuth config, ikas app scopes, install flow |
| Hardcoded profanity/filter logic | Çok dillilik, bakım ve tenant bazlı yönetimi zorlaştırır | Kod içinde inline filter listesi/config ayrımı |
| Widget DOM heuristic bağımlılığı | “X temada widget görünmüyor” hatalarını artırır | Selector kodu, browser DOM snapshot, tema testleri |
| Monolitik bundle | Tüm layout/ikonların her sayfada yüklenmesi performansı düşürür | Bundle size, coverage, network waterfall |
| Eksik JSON-LD/rich snippet | SEO ve Google rich results fırsatı kaçabilir | Page source, schema validator, product page DOM |
| Cache zayıflığı | Her sayfada dinamik JS üretimi veya `no-store` performansı düşürür | Network headers, CDN HIT/MISS, Vercel cache header |
| Error observability eksikliği | Merchant bazlı hatalar görünmez kalır | Sentry/logging, widget error eventleri, console çıktısı |

### 6.8 Öncelikli Mimari İyileştirme Sıralaması

Agent rapor üretirken öncelikleri şu sırayla değerlendirmelidir:

1. Statik loader + ayrı config endpoint
2. Widget'ları modüllere bölme
3. CSS izolasyonu ve namespace standardı
4. Selector/fallback/MutationObserver/theme adapter sistemi
5. Feature flag ve merchant config şeması
6. Cache/versioning stratejisi
7. Schema/rich snippet + analytics + hata izleme
8. Public endpoint güvenliği, rate limit ve validasyon testleri
9. OAuth scope minimizasyonu
10. Browser smoke test ve otomatik test altyapısı

### 6.9 Kısa Karşılaştırma Özeti

#### Yotpo şu anda benchmark olarak

- Daha modülerdir.
- Daha veri odaklıdır.
- Daha ölçeklenebilirdir.
- Daha cache dostudur.
- Daha feature-rich çalışır.
- Daha çok widget platformu gibi davranır.

#### Mevcut sistem için olası durum

- Daha basit olabilir.
- Daha hızlı geliştirilebilir olabilir.
- MVP için uygun olabilir.
- Ancak büyüdükçe dağılma, monolitikleşme ve tema bağımlılığı riski oluşabilir.
- Modülerleştirme, config ayrımı, cache stratejisi, theme adapter ve test altyapısı kritik hâle gelir.

### 6.10 Önemli Karar Kuralı

Yotpo benzeri her özellik hemen eklenmemelidir. Ama mevcut proje şu sorulara net cevap verebilmelidir:

- Bu özellik kodla mı, config ile mi yönetiliyor?
- Bu widget tüm sayfalarda mı, yalnızca gerektiği yerde mi yükleniyor?
- Bu davranış merchant/storefront/theme/locale bazında değiştirilebilir mi?
- Bu selector ikas temasındaki class değişimlerine dayanıklı mı?
- Bu JS dosyası CDN/cache açısından sürdürülebilir mi?
- Bu endpoint public yüzeyde güvenli mi?
- Bu davranış smoke test ve otomatik testle doğrulanabiliyor mu?

Bu sorulara verilen cevaplar zayıfsa çözüm hack/yama ile değil, kalıcı mimariyle ele alınmalıdır.

---

## 7. API ve Veri Modeli Kontrol Kapsamı

### 7.1 Product Mapping

Review verisi ürünle eşleşirken şu alanlar kontrol edilmelidir:

- ikas product ID
- variant ID
- product slug
- product name
- storefront/sales channel ID
- language/translation ilişkisi
- deleted/hidden product davranışı

### 7.2 Verified Review

Verified review için şu sorular cevaplanmalıdır:

- Sipariş API veya webhook üzerinden satın alma doğrulanıyor mu?
- Customer e-postası review e-postasıyla güvenli şekilde eşleşiyor mu?
- Sipariş tamamlanmadan review request tetikleniyor mu?
- İade/iptal durumları dikkate alınıyor mu?
- KVKK/GDPR ve izin mantığı raporlanıyor mu?

### 7.3 Webhook Kapsamı

Kontrol edilecek olası akışlar:

- Order created
- Order fulfilled/delivered
- Order cancelled/refunded
- Customer created/updated
- Product updated/deleted
- Storefront changes

Webhook endpointleri idempotent olmalıdır. Aynı event iki kez gelirse duplicate review request oluşmamalıdır.

---

## 8. Mevcut Proje Kıyaslama Rapor Formatı

Agent raporu şu formatla üretmelidir:

| Alan | Mevcut Proje Durumu | Resmî Doküman / MD Beklentisi | Uyum | Risk | Kanıt | Öneri |
|---|---|---|---|---|---|---|

Her öneri şu kategorilerden biriyle etiketlenmelidir:

- `OK`
- `Eksik`
- `Riskli`
- `Yanlış Mimari`
- `Geçici/Hack`
- `Doğrulanmalı`
- `İyileştirme`
- `Kritik`

### 8.1 Öneri Kalite Standardı

Öneriler:

- kalıcı mimariye hizmet etmeli,
- resmî ikas dokümanıyla çelişmemeli,
- tema bağımsız çalışmayı hedeflemeli,
- test edilebilir olmalı,
- kullanıcı onayı olmadan uygulanmamalı.

---

## 9. Uygulama Öncelikleri

Bu bölüm yapılacak iş listesi değil, analizde bakılacak öncelik listesidir.

1. Resmî ikas dokümanlarını doğrula.
2. MCP varsa read-only kontrolleri yap.
3. Projede script injection alanını tespit et.
4. Widget loader mimarisini incele.
5. Product/customer/order/webhook eşleştirme mantığını incele.
6. Badge injection ve selector discovery yapısını incele.
7. Tema farklılıklarına karşı adapter/config ihtiyacını değerlendir.
8. Browser smoke test ile gerçek davranışı doğrula.
9. Network/console/DOM kanıtlarını topla.
10. Yotpo benchmark gözlemleriyle mimari farkları raporla.
11. Tek embed script, monolitik bundle, zayıf cache, eksik feature flag, eksik schema, zayıf CSS izolasyonu ve selector heuristic risklerini ayrıca değerlendir.
12. Public endpoint güvenliği, CORS, rate limit, validasyon, OAuth scope ve test kapsamını kontrol et.
13. Hack/yama görünen alanları kalıcı mimari önerisine çevir.
14. Hiçbir değişiklik yapmadan analiz raporunu teslim et.

---

## 10. Agent İçin Kullanım Promptu

Bu doküman başka bir LLM/AI IDE/agent’a verilirken aşağıdaki görev talimatı da eklenmelidir. Test mağazası URL’si biliniyorsa prompt içinde mutlaka verilmelidir.

```text
Bu Markdown dosyasını dikkatlice oku ve mevcut ikas Review App projemle karşılaştır.

Önemli: Bu görev sadece read-only analiz, doğrulama ve raporlama görevidir. Kullanıcı açıkça istemedikçe hiçbir dosya değiştirme, kod yazma, paket kurma, migration çalıştırma, deploy alma, veritabanı işlemi yapma, ikas panelinde değişiklik yapma veya MCP write/mutation işlemi başlatma.

Test mağazası URL: [BURAYA TEST URL YAZ]
Örnek: https://dev-mertcopper.ikas.shop/
Widget script URL: [BİLİNİYORSA BURAYA YAZ]
Test ortamı: development / staging / production

Yapmanı istediğim şey:
- Mevcut projedeki ilgili alanları tespit et.
- Resmî ikas dokümanlarına göre doğrula.
- Gerekirse ikas MCP/API üzerinden sadece read-only kontroller yap.
- Gerekirse browser/Playwright smoke test ile DOM, console, network, widget render, selector, lazy load, cache header ve SPA geçişlerini doğrula.
- Yotpo benchmark mantığıyla mevcut widget mimarisini karşılaştır.
- Hack, geçici yama, hardcoded selector veya tek temaya bağımlı çözüm önerme.
- Yanlış veya zayıf mimari varsa kalıcı, ölçeklenebilir ve doğru mimari öner.
- Her kritik bulguya kanıt seviyesi ekle: Official docs verified, MCP verified, API verified, Browser verified, Network verified, Console verified, Codebase verified, Benchmark observed, Assumption veya Risk / needs confirmation.
- Sonuçları kanıt, risk, öneri ve öncelik sırasıyla raporla.

Çıktıyı şu formatta ver:
1. Kısa yönetici özeti
2. Test hedefleri ve kullanılan URL’ler
3. Mevcut proje bulguları
4. Resmî ikas dokümanlarına göre uyum/uyumsuzluk
5. MCP/API ile doğrulananlar ve doğrulanması gerekenler
6. Browser/Playwright smoke test sonuçları veya önerilen test planı
7. Console/network bulguları
8. Yotpo benchmark karşılaştırması
9. Mimari riskler
10. No Patch / No Hack ilkesine göre kalıcı mimari öneriler
11. Öncelikli aksiyon planı
12. Hiçbir işlem başlatmadan önce kullanıcıdan onay gerektiren noktalar
```

Kısa prompt alternatifi:

```text
Bu MD’yi sadece read-only analiz rehberi olarak kullan. Mevcut ikas Review App projesini bu dokümana göre incele; resmî ikas dokümanları, MCP/API ve gerekirse verilen test mağazası URL’si üzerinde browser smoke testleriyle doğrula. Hiçbir dosya değiştirme, kod yazma, kurulum, deploy, migration, veritabanı işlemi veya MCP write/mutation işlemi başlatma. Hack/yama önermeden yalnızca bulgu, risk, kanıt, uyumsuzluk ve kalıcı mimari öneri raporu üret.
```

---

## 11. Kısa Sonuç

Bu doküman artık yalnızca kaynak listesi değildir. Mevcut ikas Review App projesinin doğru mimariyle ilerleyip ilerlemediğini anlamak için kapsamlı bir read-only analiz ve doğrulama rehberidir.

Temel hedef:

- resmî ikas dokümanlarına bağlı kalmak,
- MCP/API/browser testleriyle gerçek davranışı doğrulamak,
- widget mantığını Yotpo gibi olgun örneklerle kıyaslamak,
- tek embed script yaklaşımından loader/config/modüler widget runtime mimarisine geçiş ihtiyacını değerlendirmek,
- cache/versioning, feature flag, CSS izolasyonu, rich snippet, analytics, error handling ve test kapsamını kontrol etmek,
- tema farklılıklarına dayanıklı kalıcı mimari önermek,
- hack/yama yerine sürdürülebilir yapı tasarlamak,
- kullanıcı açıkça istemedikçe hiçbir işlem başlatmamaktır.
