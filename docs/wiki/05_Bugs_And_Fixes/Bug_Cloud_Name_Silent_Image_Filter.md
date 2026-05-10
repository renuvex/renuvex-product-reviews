---
type: bug
project: ikas-review-app
status: active
created: 2026-05-11
updated: 2026-05-11
tags:
  - bug
  - widget
  - reliability
  - observability
related:
  - "[[Bug_Index]]"
  - "[[Photo_Strip]]"
  - "[[ADR_0006_Trusted_Review_Image_URL_Policy]]"
  - "[[Caching_And_Performance]]"
---

# Bug — cloudName Silent Image Filter (K3)

## Date
2026-05-11

## Status
Open

## Area
Widget, Reliability, Observability

## Symptoms
- `/api/public/settings` endpoint geçici 404 / 5xx döndüğünde ve cache'de stale entry yoksa, widget `trustedReviewImageCloudName` değerini `undefined` olarak set ediyor.
- Bu durumda `isTrustedReviewImageUrl()` her URL için false döner → `getTrustedReviewImages()` boş dizi → fotoğraf şeridi **ve yorum kartlarındaki tüm fotoğraflar** sessizce kaybolur.
- Reviews endpoint çalışmaya devam ettiği için yorum metinleri görünür; sadece görsel kısmı kaybolur.
- Hiçbir `console.error`, hiçbir telemetri çağrısı yok — monitor "her şey normal" der.

## Sahnelendirme (örnek senaryo)
Cuma 18:00 deploy'da settings route regression — geçici 404 dönüyor. Cache'i 24 saatten eski olan tüm storefront ziyaretçilerinde (ve cache yok olan cold ziyaretçilerde):
1. `bootstrap.js:67-83` `/api/public/settings` 404 alır.
2. `bootstrap.js:72-73` — `staleEntry` yoksa `setTrustedReviewImageCloudName(undefined)` çağrılır.
3. `helpers.js:155-167` — `isTrustedReviewImageUrl` `parts[0] !== trustedReviewImageCloudName` (undefined) kontrolünde tüm URL'leri reddeder.
4. `render.js:466` (strip), `card/index.js:94`, `list/index.js:94`, `gallery/index.js` — `getTrustedReviewImages(r).length === 0` → görseller hiç render edilmez.
5. Pazartesi 09:00'a kadar admin fark etmez; 3 günlük conversion kaybı, alarm yok.

Diğer senaryolar:
- Yeni mağaza ilk install sonrası settings cache henüz dolmadıysa, network race condition'da aynı sessiz davranış.
- CDN edge'inde geçici 5xx ve Vercel function downtime.

## Root Cause
- [bootstrap.js:67-83](src/widget/product-widget/bootstrap.js) — settings 404/error path'lerinde fallback yok, log yok:
  ```js
  if (!res.ok) {
    if (res.status === 404) {
      cacheSet(SETTINGS_CACHE_KEY, JSON.stringify({ t: Date.now(), notFound: true }));
    }
    if (staleEntry) setTrustedReviewImageCloudName(staleEntry.imagePolicy && staleEntry.imagePolicy.cloudName);
    return staleEntry || null;
  }
  ```
  `staleEntry` yoksa `setTrustedReviewImageCloudName` hiç çağrılmaz; `trustedReviewImageCloudName` initial `undefined` kalır.

- [helpers.js:155-167](src/widget/core/helpers.js) — `isTrustedReviewImageUrl` sessizce false döner:
  ```js
  if (parts[0] !== trustedReviewImageCloudName || ...) return false;
  ```
  `cloudName === undefined` ise tüm URL'ler düşer. Log yok.

- **Etki K3'ten daha geniş**: aynı `getTrustedReviewImages` fonksiyonu kart/liste/gallery layout'larındaki review içi fotoğraflar için de kullanılıyor. K3 sadece strip'i değil tüm fotoğraf akışını öldürür.

## Önerilen düzeltme yönü
1. **Çevre değişkeni fallback:** Build-time `process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` widget bundle'a inject edilebilir; settings yüklenemese bile başlangıç değeri olur. Settings sonra geldiğinde override eder.
2. **Telemetri:** `setTrustedReviewImageCloudName(falsy)` çağrıldığında `console.error('[ikr] cloudName missing — image filtering inactive')` + (opsiyonel) Sentry breadcrumb / minimal fetch beacon.
3. **404 retry pencere:** mevcut `SETTINGS_404_TTL = 30 * 1000` — kısaltma veya kısa bir exponential backoff ile birkaç retry.
4. **Daha uzun stale-while-revalidate**: settings için 24 saat değil 7 gün stale tolerate; bu da büyük outage'larda davranışı korur. [settings/route.ts](src/app/api/public/settings/route.ts) cache header'ı.

## Etkilenecek dosyalar
- [src/widget/product-widget/bootstrap.js](src/widget/product-widget/bootstrap.js) — fallback + log
- [src/widget/core/helpers.js](src/widget/core/helpers.js) — `setTrustedReviewImageCloudName` falsy çağrılınca warn
- [src/app/api/public/settings/route.ts](src/app/api/public/settings/route.ts) — cache header (stale-while-revalidate uzatma)
- (Opsiyonel) yeni `src/app/api/public/widget-telemetry/route.ts` — error beacon
- Build pipeline (opsiyonel) — `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` inject

## Etki
- **K2'den daha geniş etki**: kırık görsel değil **hiç görsel yok** — kart/liste/gallery dahil.
- Tespit süresi: tesadüfe bağlı (admin manuel storefront ziyareti ile fark eder); günler-haftalar.
- Yeni yorum yazan müşteri kendi fotoğrafını görmediği için "yüklenemedi mi?" diye yeniden gönderir → DB orphan + müşteri frustration.

## Prevention
- E2E test: settings endpoint'i bilinçli mock 404 ile servis et, widget render path'ini smoke-test et.
- Production health check: settings endpoint 404 oranı için alarm.
- Synthetic monitoring (örn. Vercel Speed Insights / pingdom): görsel render path'i headless browser ile periyodik test.

## Related Notes
- [[Photo_Strip]]
- [[ADR_0006_Trusted_Review_Image_URL_Policy]]
- [[Caching_And_Performance]]
- [[Bug_Index]]
- [[Open_Questions]]

## Change Log
- 2026-05-11: Sayfa oluşturuldu. Photo strip refactor sırasında yapılan analizde tespit edilen sessiz hata kategorisi — fix henüz uygulanmadı.
