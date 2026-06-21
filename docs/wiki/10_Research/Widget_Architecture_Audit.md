---
type: research
project: renuvex-product-reviews
status: active
created: 2026-05-18
updated: 2026-05-18
last_verified: 2026-05-18
confidence: high
tags:
  - research
  - audit
  - widget
  - storefront
  - performance
  - security
related:
  - "[[ADR_0013_Modular_Widget_Loader_Architecture]]"
  - "[[Yotpo_Style_Widget_Modular_Architecture]]"
  - "[[Phase_1_Widget_Runtime_Audit]]"
  - "[[Phase_3_Widget_Lifecycle_Hardening]]"
  - "[[Ikas_Storefront_Events]]"
  - "[[Ikas_Storefront_Script_Capabilities]]"
  - "[[Security_And_Rate_Limits]]"
source_files:
  - "src/widget/loader.js"
  - "src/widget/core/registry.js"
  - "src/widget/core/storefront-context.js"
  - "src/widget/core/settings.js"
  - "src/widget/observer.js"
  - "src/widget/events.js"
  - "src/widget/listing-badges/inject.js"
  - "src/widget/listing-badges/collect.js"
  - "src/widget/reviews-section/bootstrap.js"
  - "src/widget/review-layouts/list/index.js"
  - "src/widget/review-layouts/card/index.js"
  - "src/widget/themes/current-adapter.js"
  - "src/app/api/public/reviews/route.ts"
  - "src/app/api/public/settings/route.ts"
  - "src/app/api/public/widget-error/route.ts"
  - "src/app/api/public/upload/sign/route.ts"
  - "src/lib/storefront-scripts.ts"
  - "src/lib/cors.ts"
  - "prisma/schema.prisma"
  - "public/widget-runtime/build-manifest.json"
  - "vercel.json"
---

# Widget Architecture Audit — 2026-05-18

Objective, evidence-based audit of the modular storefront widget injection
architecture (ADR_0013). Method: static code review + ikas MCP introspection +
official-doc comparison + static build/typecheck checks + live Playwright tests on
the dev store. No source/schema/config was modified. Scope: storefront widget only
(loader, registry, mount, public widget endpoints, script injection, cache);
backend/DB/admin examined only where they touch the widget.

## Genel Sonuç

- **Stabil mi:** Evet. Statik kontroller (`codegen`, `build:widget`, `tsc`,
  `prisma validate`, `git diff --check`) temiz. Canlı dev-store testlerinde PDP,
  kategori ve SPA navigasyonunda widget kaynaklı 0 console hatası, tek-instance
  render, bayat-eleman temizliği doğrulandı.
- **Endüstri standardına yakın mı:** Evet. Tek classic loader + hash'li immutable
  ESM runtime/chunk + lazy surface registry + Storefront Events bağlamı — Yotpo
  benzeri modüler bir mimari. Fiziksel lazy-split canlı ağ kanıtıyla çalışıyor.
- **ikas uyumu:** Yüksek ama %100 değil. `createStorefrontJSScript` /
  `updateStorefrontJSScript` girdileri canlı ikas MCP şemasıyla birebir eşleşiyor;
  script lifecycle non-destructive. Tek istisna: widget `VIEW_LISTING` event'ine
  bağımlı, bu event resmi Storefront Events dokümanında **listelenmiyor**
  (runtime'da doğrulanmış ama dokümante kontrat değil).
- **Production hazır mı:** Bkz. "Remediation Durumu" ve güncellenmiş "Nihai Karar".

## Remediation Durumu — 2026-05-18 (denetim sonrası yeniden doğrulama)

Denetim sonrası remediation commit'leri (`78595421`..`66a32d81`, `4eff23b2`) main'e
indi ve bu denetimin sahibi tarafından **gerçek kodla yeniden doğrulandı** (iddia
kabul edilmedi, dosya:satır okundu). `tsc --noEmit` + `build:widget` temiz.

### Kapanan bulgular — 12 madde, doğrulandı

| Madde | Commit | Doğrulama (dosya:satır) |
|---|---|---|
| **Y1** Review POST doğrulaması | `78595421` | `verifyReviewTarget()` `StoreSettings` + `ProductSnapshot`'ı kontrol ediyor (`reviews/route.ts:87-100`); doğrulanamayan storeId/productId → 400 (`:271-274`). `slug`/`productName` doğrulanmış snapshot'tan (`:310-311`), `email` hardcoded `''` (`:316`). **Kapandı.** Not: doğrulama `ProductSnapshot` tazeliğine bağlı; POST rate limit 3/10dk/IP olarak değişmedi (asıl düzeltme doğrulama). |
| **D1** GET ham satır `...r` spread | `78595421` | `PUBLIC_REVIEW_SELECT` whitelist + `formatPublicReview` (`reviews/route.ts:20-29,102-113,193`); `email`/`storeId`/`status` artık dönmüyor. **Kapandı.** |
| **O1** Listing badge CLS | `f1e7fef6` | `reserveBadgeSlots()` ratings fetch'inden önce placeholder yerleştiriyor, `replacePlaceholderOrAppend()` yerinde swap (`inject.js:60-112`). **Kapandı** — CLS azaltıldı (boş-rating placeholder'ları `clearBadgePlaceholders()` ile collapse eder, sıfır değil). |
| **O3** 7-gün bayat ayar | `a6ff5803` | `settings.js:13` stale TTL `24*60*60*1000` (24 saat). **Kapandı.** |
| **O8** Tüm-doküman selector taraması | `d8a6b356` | `collect.js` + `observer.js` artık `link-scope.js`/`dom.js` ile `main,[role=main]`'e scoped tarama yapıyor (body fallback, header/nav/footer eleniyor). **Kapandı.** |
| **D4** ratings rate limit yok | `66a32d81` | `ratings` + `ratings-by-slug` ortak `checkFixedWindowRateLimit` ile 300/dk/IP, paylaşılan `renuvex_pr_ratings_rl:` bucket. **Kapandı.** |
| **O4** Observer/listener idempotency | `4eff23b2` | `observer.js` `startMutationObserver()`'a idempotency guard + instance modül kapsamında saklanıyor + `!document.body` koruması; `events.js` `history.pushState`/`replaceState` wrapper'larına fonksiyon-seviyesi `__ikrPatched` etiketi → çift-sarma engellendi. Build temiz, runtime'da `__ikrPatched` ×4. Deploy edilip dev-store'da canlı doğrulandı: SPA nav'da bayat badge/JSON-LD temizliği, badge render, tek-instance mount, 0 widget console hatası. **Kapandı.** Not: tüketici (page-ömürlü widget) bir teardown çağırmadığı için `stopMutationObserver` eklenmedi — esbuild tree-shake ettiği için ölü export olurdu. |
| **O7** widget-error Sentry kota tavanı | — (Sentry config) | ikas MCP `tags[source]:widget` sorgusu: tek issue (`YORUM-PANELI-3`, resolved smoke test, 1 event) → widget-error hacmi ~sıfır. Sentry **Spike Protection açık** (panelde doğrulandı) → issue çeşitliliğini bozmadan flood'u sınırlıyor. Kör global cap riski yerine native koruma kullanılıyor; kod gerekmedi. **Kapandı.** |
| **D5** Eski runtime chunk birikimi | `da2f9f98` | `build-widget.mjs`'e `pruneOldRuntimeFiles()` eklendi — current build'de referans verilmeyen + 7 günden eski hash'li runtime/chunk dosyaları budanıyor; current build dosyaları her zaman korunuyor. mtime-tabanlı; git checkout mtime'ı yalnızca "şimdi"ye çeker (asla daha eski) → yanlış okuma budamayı yalnızca geciktirir, asla gerekli dosyayı silmez. Deterministik test geçti: 10g yaşlı+unreferenced 2 dosya silindi, 2g'lik + canlı dosyalar korundu. **Kapandı** — "eski hash'i tut" doğruydu, "sonsuza dek tut" endüstri standardı değildi; sınırlı-retention eklendi. |
| **O5** PDP 147KB shared chunk | — (ölçüm) | Deploy edilmiş asset'ler legacy pre-custom-domain Vercel alias üzerinden ölçüldü (build `runtime-5EYUMT6S`). 147KB *ham* `chunk-RDZDCQ76.js` → brotli ile telde **~40KB**. Sayfa toplam tel transferi (manifest import grafiğinden): PDP **~53KB**, listing **~16,5KB**. Hepsi `max-age=31536000, immutable` cache'li; `widget.js` `async` + chunk'lar dinamik `import()` → ilk render'ı bloklamıyor. Tam-özellikli review widget'ı için makul/yalın bütçe. **Kapandı** — ölçüldü, kabul edilebilir; kod aksiyonu gerekmiyor. O5'in "Orta" notu ölçülmemiş ham figüre dayanıyordu. Opsiyonel mikro-iyileştirme (yorum-formu modal'ını ayrı lazy chunk'a almak, ~4-5KB tel) gerekçesiz bulundu. |
| **D2** Redundant Review index | migration `20260518130000` | `20260518130000_drop_redundant_review_indexes` — `DROP INDEX IF EXISTS Review_storeId_productId_idx` + `Review_storeId_slug_idx`. `schema.prisma` Review modeli artık 3 index; geniş composite'ler (`[storeId,productId,status]`, `[storeId,slug,status]`) aynı leftmost-prefix'i kapsıyor. DROP INDEX backwards-compatible → tek-deploy güvenli. **Kapandı** (kullanıcı tamamladı, migration + şema kodla doğrulandı). |
| **D3** Cloudinary upload tenant-scope | migration `20260518143000` + kod | `review-images.ts` `getReviewImageFolder()` → `review_images/stores/<storeId>` per-store klasör; `isTrustedReviewImageUrl` URL path'inde storeId klasörünü zorunlu kılıyor → mağaza A, mağaza B klasörüne URL gönderemez. `upload/sign` store doğrulaması + per-store imzalı klasör. `reviews/route.ts` POST/GET/hasImages-filtre/pending-cleanup hepsi `storeId` geçiriyor — tutarlı (görseller kırılmıyor). `PendingReviewImage.storeId` eklendi (`20260518143000`, additive). **Kapandı** (kullanıcı tamamladı, kodla doğrulandı). |

### Hâlâ açık

- **O2** — Ozy dışı tema otomatik desteklenmiyor; ikas aktif-tema tespiti cevabı bekleniyor.
- **O6** — `VIEW_LISTING` runtime'da doğrulandı ama resmi dokümanda kontrat değil; ikas cevabı bekleniyor.

> Kod-aksiyonu gerektiren tüm denetim maddeleri kapandı. Kalan 2 madde yalnızca ikas
> tema/event kontrat cevabına bağlı — bu app tarafında yapılabilecek bir şey yok.

## Kapsam Notu

İncelenen: widget runtime (loader/registry/storefront-context/surfaces/observer/
events), listing-badge ve reviews-section render yolu, public widget endpoint'leri
(`settings`, `reviews`, `ratings`, `ratings-by-slug`, `widget-error`, `upload/*`),
ikas StorefrontJSScript injection, widget-ilişkili Prisma modelleri, cache/deploy
header'ları. Kapsam dışı: admin panel UX, auth/mail/lisans sistemleri, widget'la
ilişkisiz route'lar, tüm DB modeli. `CRON_SECRET`'e bağlı authenticated cron testi
kapsam dışı (Phase 3 artığı). ESLint çalıştırılamadı (`next lint` Next.js 16'da
kırık); `tsc --noEmit` temiz geçti.

## Kullanılan Denetim Turları

| Tur | Kontrol | Ana dosyalar | Sonuç |
|---|---|---|---|
| Widget runtime & loader | Mount/unmount, duplicate guard, listener leak, fail-safe, CSS | `src/widget/**` | Sağlam; 1 Orta (listener/observer cleanup yok) |
| ikas entegrasyon | Storefront Events, script injection, tema bağımsızlık | `storefront-context.js`, `storefront-scripts.ts`, MCP introspect | Şema uyumlu; `VIEW_LISTING` dokümante değil; tema adapter Ozy-bağımlı |
| Public API & kontrat | Tenant izolasyon, CORS, rate limit, cache, response şekli | `src/app/api/public/**` | GET tenant izolasyonu güvenli; POST yazma yolu zayıf |
| Veri modeli | Index, unique, JSON, migration | `prisma/schema.prisma`, `migrations/` | Sağlam; 2 redundant index; 1 destructive migration doğrulama gerektiriyor |
| Performans | Bundle, lazy-load, CLS, tekrarlı fetch | `build-manifest.json`, `listing-badges/**` | Lazy-split gerçek; PDP'de 147KB chunk; listing CLS riski |
| Güvenlik | XSS, secret sızıntı, abuse, sanitize | `reviews/route.ts`, render katmanı, `upload/sign` | XSS yok; secret sızıntısı yok; yazma yolu abuse'a açık |
| Canlı runtime | Playwright — dev-store gerçek davranış | `dev-mertcopper.ikas.shop` | Tüm çekirdek testler geçti |

## Kontrol Edilen Resmi Kaynaklar

| Kaynak | Neden | Sonuç |
|---|---|---|
| ikas Admin GraphQL (MCP introspect) | StorefrontJSScript create/update girdi şeması | Uyumlu — kod girdileri şemayla eşleşiyor; `order` create girdisinde yok, kod doğru şekilde set etmiyor |
| ikas Storefront Events docs (builders.ikas.com) | Widget'ın dinlediği event adları | Kısmen uyumsuz — `PAGE_VIEW`/`PRODUCT_VIEW`/`VIEW_CATEGORY`/`VIEW_SEARCH_RESULTS` var, **`VIEW_LISTING` yok**; payload alanları dokümante değil |
| Next.js App Router route handler caching (Context7) | Public endpoint cache semantiği | Uyumlu — Next 15+ route handler GET default cache'siz; manuel `Cache-Control` header pattern doğru |
| Vercel cache header davranışı | `vercel.json` immutable/short-cache | Uyumlu — canlı header'lar `vercel.json` ile birebir |

## Kanıta Dayalı Bulgular

### Y1 — Review POST'ta merchant/ürün doğrulaması yok (Risk: Yüksek)
- **Kanıt:** `src/app/api/public/reviews/route.ts:168-259`. POST `storeId`, `productId`,
  `slug`, `productName` değerlerini istek gövdesinden alıp doğrudan
  `prisma.review.create`'e yazıyor. `storeId`'nin kurulu bir merchant olduğu veya
  `productId`'nin o mağazaya ait olduğu hiç doğrulanmıyor. `publicApiKey` (= storeId)
  zaten her storefront'ta herkese açık. Rate limit yalnızca 3/10dk/IP
  (`route.ts:18-19`), CAPTCHA/origin/imza yok.
- **Etki:** `autoApprove` `'all'`/`'4plus'`/`'5stars'` modundaki bir mağazada
  saldırgan sahte yorum/puanı doğrudan storefront'a yayınlayabilir; her modda
  rastgele storeId'lere DB kirliliği yazılabilir. Bir review uygulaması için yazma
  yolu bütünlüğü çekirdek üründür.
- **Önerilen çözüm:** `storeId`'yi kurulu merchant'a karşı doğrula; `productId`'yi
  `ProductSnapshot` ile teyit et; rate limit'i sıkılaştır + bot koruması ekle.
- **Durum:** Doğrulandı (kod).

### O1 — Listing badge enjeksiyonu CLS üretiyor (Risk: Orta)
- **Kanıt:** `listing-badges/inject.js` badge elemanını ürün kartı başlığına
  `settings` + `ratings` ağ turundan sonra ekliyor; `core/badge.js` badge'e önceden
  yer ayırmıyor (genişlik/yükseklik rezervi yok). Foto strip (`render.js`) ise
  width/height set ederek yer ayırıyor — teknik biliniyor, listing'e uygulanmamış.
- **Etki:** Kategori/ana sayfada her ürün kartında küçük layout shift; Core Web
  Vitals CLS metriğini etkiler.
- **Önerilen çözüm:** Badge için `min-height` rezerve et veya başlık satırına
  placeholder yerleştir.
- **Durum:** Doğrulandı (kod + manifest).

### O2 — Ozy dışı temalarda listing badge enjeksiyonu sessizce başarısız (Risk: Orta)
- **Kanıt:** `themes/current-adapter.js:9` `getThemeAdapter()` her zaman Ozy
  adapter'ı döndürüyor, tema yönlendirmesi yok. `inject.js`
  `adapter.findListingContainers()` Ozy-spesifik CSS selector kullanıyor; başka
  temada boş döner → badge enjekte edilmez.
- **Etki:** Event-tabanlı ürün bağlamı (PDP) tema-bağımsız çalışır; ama listing
  badge mount'u Ozy-selector'a bağlı. Ozy dışı bir temada storefront badge'leri
  görünmez — sessiz başarısızlık.
- **Not:** Bu, wiki/Phase kayıtlarında "tema adapter yalnızca fallback, çok-tema
  ertelendi" diye zaten kabul edilmiş bilinen bir sınır. Yeni tema ekleyen her
  merchant için ayrı smoke test gerekir.
- **Durum:** Doğrulandı (kod) — bilinen/dokümante sınır.

### O3 — Ağ hatasında 7 güne kadar bayat ayar (Risk: Orta)
- **Kanıt:** `core/settings.js:12-13` — 5 dk taze, **7 gün** stale TTL,
  sessionStorage. `settings.js:93` ağ hatasında `staleEntry` döner.
- **Etki:** Merchant ayar değiştirirse (widget'ı kapatmak dahil), stale-cache'li
  bir tarayıcıda ağ arızası sürdükçe 7 güne kadar yansımayabilir — sessizce.
- **Önerilen çözüm:** Stale tavanını kısalt (örn. 24 saat) veya stale-iken görünür
  bir revalidate zorla.
- **Durum:** Doğrulandı (kod).

### O4 — Listener/observer hiç kaldırılmıyor (Risk: Orta)
- **Kanıt:** `observer.js:42` MutationObserver instance saklanmıyor →
  `disconnect()` imkânsız. `events.js:57-71` `history.pushState/replaceState`
  patch'i kalıcı ve geri alınamaz; `popstate`/`hashchange`/`error` listener'ları
  kaldırılmıyor.
- **Etki:** Sınırlı leak (sekme başına bir script yükü). Asıl risk: geri
  alınamayan `history` patch'i başka bir script ile karşılıklı patch çakışmasına
  açık; observer kapatılamadığı için yoğun DOM'lu storefront'ta sürekli çalışır.
- **Durum:** Doğrulandı (kod).

### O5 — Her PDP'de 147KB shared chunk (Risk: Orta)
- **Kanıt:** `build-manifest.json` — `chunk-RIX5KGVL.js` = 147.388 byte (gzip
  öncesi), her iki PDP lazy chunk'ı (`bootstrap`, `render`) tarafından statik
  import. Canlı testte PDP'de yüklendi (~176KB toplam PDP JS), ana sayfa/kategoride
  yüklenmedi (~37KB).
- **Etki:** Listing sayfaları hafif; PDP'de tek büyük chunk baskın parse maliyeti.
- **Önerilen çözüm:** `chunk-RIX5KGVL` içeriğini incele; PDP-only kod daha fazla
  bölünebilir mi değerlendir. Gzip sonrası gerçek transferi ölç.
- **Durum:** Doğrulandı (manifest + canlı ağ).

### O6 — `VIEW_LISTING` dokümante olmayan bir event (Risk: Orta)
- **Kanıt:** Resmi Storefront Events dokümanı `PAGE_VIEW`, `PRODUCT_VIEW`,
  `VIEW_CATEGORY`, `VIEW_SEARCH_RESULTS` listeliyor — **`VIEW_LISTING` yok**.
  `core/storefront-context.js` kategori sayfası ürün dizisi için `VIEW_LISTING`'e
  bağımlı. Phase 1 audit ve bu denetimin canlı testi runtime'da var olduğunu
  doğruladı.
- **Etki:** Dokümante kontrat olmadığı için ikas haber vermeden değiştirebilir.
- **Önerilen çözüm:** ikas'tan event'i doğrulat veya `VIEW_CATEGORY` payload'una
  dayan; çift-yol fallback bırak.
- **Durum:** Doğrulandı (resmi doküman vs kod).

### O7 — `widget-error` endpoint'inde global Sentry tavanı yok (Risk: Orta)
- **Kanıt:** `widget-error/route.ts:61` her geçerli istek için
  `Sentry.captureException` çağırıyor; rate limit 30/IP/dk ama global/mağaza
  tavanı yok.
- **Etki:** IP çeşitliliği yüksek bir flood Sentry kotasını dakikalar içinde
  tüketebilir.
- **Önerilen çözüm:** Global event tavanı / örnekleme ekle.
- **Durum:** Doğrulandı (kod).

### O8 — `collectProductTargets()` tüm dokümanda senkron selector taraması (Risk: Orta)
- **Kanıt:** `listing-badges/collect.js` `document.querySelectorAll('a[href]')`'ı
  tüm doküman üzerinde senkron çalıştırıyor.
- **Etki:** Yüzlerce kartlı büyük listing sayfasında ana iş parçacığı maliyeti.
- **Durum:** Doğrulandı (kod).

### D1 — GET `/api/public/reviews` ham satırı `...r` spread ile dönüyor (Risk: Düşük)
- **Kanıt:** `reviews/route.ts:131` — `{ ...r, ... }`; dahili `id`, `storeId`,
  `productId`, `merchantReply`, `status`, zaman damgaları ve `email` alanı dönüyor.
- **Etki:** `email` şu an her zaman boş (`step-author.js:6,172` — form e-postayı
  backend'e göndermiyor, faz 2'ye ertelenmiş), yani **aktif PII sızıntısı yok**.
  Ancak gizli (latent): "faz 2 verified buyer" e-postayı kaydetmeye başladığında bu
  endpoint değişmeden e-posta dışarı sızar.
- **Önerilen çözüm:** Şimdi açık alan whitelist'i uygula.
- **Durum:** Doğrulandı (kod).

### D2 — Review tablosunda redundant index (Risk: Düşük)
- **Kanıt:** `prisma/schema.prisma:42-46` — `[storeId, productId]`,
  `[storeId, slug]` index'leri sırasıyla `[storeId, productId, status]` ve
  `[storeId, slug, status]`'in prefix'i → gereksiz.
- **Etki:** En yüksek-yazımlı tabloda yazma amplifikasyonu + depolama.
- **Durum:** Doğrulandı (şema).

### D3 — `upload/sign` tenant-başına scope'lanmıyor (Risk: Düşük) — Closed 2026-05-18
- **Kanıt:** `upload/sign/route.ts:44` imzalı parametrelerde `storeId` yok;
  imza yalnızca `folder: 'review_images'`'a sabitli.
- **Etki:** Tüm tenant'lar aynı Cloudinary klasörünü paylaşır — tenant'lar arası
  depolama kirliliği mümkün. (api_key sızıntısı YOK — bu publishable anahtar;
  `CLOUDINARY_API_SECRET` istemciye hiç gitmiyor.)
- **Durum:** Kapandı. `/api/public/upload/sign` artık `storeId` doğrulayıp yalnızca `review_images/stores/<storeId>` için imza üretiyor; widget bu folder'ı kullanıyor, `/upload/register` ve review read/write yolları tenant folder dışını reddediyor.

### D4 — `ratings` / `ratings-by-slug` GET'lerinde rate limit yok (Risk: Düşük)
- **Kanıt:** Her iki route'ta rate limit çağrısı yok; CDN cache (`s-maxage=60`)
  kısmen koruyor.
- **Durum:** Doğrulandı (kod).

### D5 — `public/widget-runtime/` eski chunk biriktiriyor (Risk: Düşük)
- **Kanıt:** `scripts/build-widget.mjs` eski hash'li dosyaları kasıtlı koruyor
  (cache'li `widget.js` 404'e düşmesin diye); eviction yok.
- **Etki:** Deploy başına dizin sınırsız büyür. Bu Phase 3'ün bilinçli tercihi.
- **Durum:** Doğrulandı (kod) — bilinçli tercih.

## Artılar

| Artı | Kanıt | Etki |
|---|---|---|
| Stored XSS yok | Submitter alanları (`author`/`title`/`comment`) `textContent` ile basılıyor — `review-layouts/list/index.js:52,69,77`, `card/index.js:55,62,70`; `innerHTML` yalnızca kontrollü yıldız SVG'lerinde | Storefront'ta yorum kaynaklı XSS yok |
| ikas script injection şema-uyumlu | `createStorefrontJSScript` girdisi MCP şemasıyla eşleşiyor; `deleteStorefrontJSScript` kaynakta yok (non-destructive) | ikas entegrasyonu doğru |
| Gerçek lazy-loading | `build-manifest.json` + canlı ağ — 147KB chunk yalnızca PDP'de, ana sayfa/kategoride değil; listing ~37KB | Kategori sayfaları hafif |
| Cache stratejisi doğru & canlı doğrulandı | widget.js + runtime.js shim `max-age=300, must-revalidate`; hash'li runtime/chunk `max-age=31536000, immutable` — `vercel.json` ile birebir | Doğru immutable/short-cache ayrımı |
| Tenant izolasyonu (GET) | `settings`/`reviews`/`ratings`/`ratings-by-slug` tüm DB sorgularında `storeId` filtresi | Okuma yolunda tenant sızıntısı yok |
| Fail-safe izolasyon | `registry.js` her surface'in `detect`/`mount`'unu try/catch'liyor; `bootstrap.js` hata fallback'i; widget hatası host sayfayı çökertmiyor | Widget bozulsa mağaza sayfası ayakta |
| Duplicate-render guard | `ls.inProgress`/`ls.queued`, `bootstrapCache`; canlı SPA nav testinde her parça tek-instance + bayat temizliği | Çift render yok |
| Widget script `async` | Canlı doğrulandı — `<script ... async>` | Storefront ilk render'ını bloklamıyor |
| SSRF guard | `storefront-widget-url.ts` https-only, localhost/private IP reddi | Script URL üretimi güvenli |

## Eksiler / Riskler (öncelik sırası)

1. **Y1** — Review POST merchant/ürün doğrulaması yok → puan/yorum manipülasyonu. **Yüksek.**
2. **O1** — Listing badge CLS. **Orta.**
3. **O2** — Ozy dışı temalarda badge sessiz başarısız. **Orta.**
4. **O3** — 7 güne kadar bayat ayar. **Orta.**
5. **O4** — Listener/observer cleanup yok. **Orta.**
6. **O5** — PDP'de 147KB chunk. **Orta.**
7. **O6** — `VIEW_LISTING` dokümante değil. **Orta.**
8. **O7** — `widget-error` Sentry kota riski. **Orta.**
9. **O8** — Tüm-doküman selector taraması. **Orta.**
10. **D1-D5** — alan whitelist, redundant index, upload scope, rate limit, chunk birikimi. **Düşük.**

## Bilinmeyenler

- **Migration expand/contract:** `20260517160000_remove_product_snapshot_deleted`
  bir kolon düşürüyor (destructive). Kod-kaldırma ile kolon-düşürmenin iki ayrı
  deploy'a bölünüp bölünmediği repodan doğrulanamadı — aynı deploy ise eski kod
  1-3 dk overlap'te `ProductSnapshot` sorgularında hata verebilir. Deploy geçmişi
  doğrulaması gerekir.
- **Storefront Events payload şekilleri:** Resmi doküman event payload alanlarını
  vermiyor; yalnızca Phase 1 + bu denetimin canlı testiyle doğrulandı. Tam kontrat
  resmi dokümanda yok.
- **Çalıştırılmayan canlı testler:** arama sayfası (`VIEW_SEARCH_RESULTS`), mobil
  viewport, yavaş bağlantı, review-submit abuse. Dev-store yalnızca Ozy teması
  içeriyor → Ozy dışı tema davranışı canlı doğrulanamaz.
- **ESLint:** Çalıştırılmadı (`next lint` Next.js 16'da kırık); `tsc --noEmit`
  temiz geçti.
- **Canonical rating yolu:** Bu denetimin run'ında ana sayfa/PDP'de `ratings-by-slug`
  (fallback) gözlendi; `/clothing`'de canonical `ratings?productIds=` Phase 3
  kaydında dokümante ama bu run'da badge'ler cache'ten geldiği için tekrar
  yakalanamadı.

## Mutlaka Yapılması Gereken Testler

- ikas storefront script yükleme + `async` davranış testi (✓ bu denetimde geçti)
- Ürün detay sayfası widget mount + tek-render testi (✓ geçti)
- Kategori/koleksiyon sayfası badge testi (✓ geçti)
- Arama sayfası `VIEW_SEARCH_RESULTS` testi (✗ çalıştırılmadı)
- SPA navigation + bayat temizlik testi (✓ geçti)
- Duplicate render testi (✓ geçti)
- Ozy dışı en az bir ikas temasında smoke test (✗ — dev-store'da tema yok)
- Yavaş bağlantı / throttle testi (✗ çalıştırılmadı)
- Review submit abuse testi — sahte storeId/productId + IP rotasyonu (✗)
- Config cache invalidation testi — ayar değişikliği yansıma süresi (✗)
- `widget-error` flood / Sentry kota testi (✗)
- Admin preview ↔ canlı widget tutarlılık testi (✗)
- 0-yorumlu ürün rating-badge/JSON-LD davranışı (✓ geçti — doğru şekilde yok)

## Nihai Karar (2026-05-18 — remediation sonrası)

Denetimin tek **Yüksek** bulgusu (Y1) ve D1/D4 kapandı; Orta kümeden O1/O3/O8
kapandı ve hepsi gerçek kodla yeniden doğrulandı. **Açık kalan hiçbir madde Yüksek
değil.** Çekirdek widget runtime (loader, registry, mount, lazy-load, cache,
fail-safe izolasyon) production kalitesinde; stored XSS yok, tenant-arası okuma
sızıntısı yok, host-sayfa çökertme riski yok, ikas script şeması uyumlu.

- **Mevcut tek-merchant (Ozy teması) production dağıtımı için:** yazma-yolu
  bütünlük açığı kapandığı için widget artık **production ready**.
- **ikas App Store / çok-tema yaygınlaştırması için:** O2 ve O6 (ikas tema/event
  kontrat cevabına bağlı) çözülmeli; O4/O5/O7 önerilen hardening; D2/D3 kapandı, ayrı
  optimization. Hiçbiri mimari revizyon gerektirmiyor.

Önerilen sıra: ikas tema/event cevabı beklenirken O4 veya O7 yapılabilir; cevap
gelince O2/O6 stratejisi netleştirilir.
