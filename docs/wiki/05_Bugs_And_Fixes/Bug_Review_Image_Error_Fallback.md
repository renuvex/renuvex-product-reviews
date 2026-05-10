---
type: bug
project: ikas-review-app
status: active
created: 2026-05-11
updated: 2026-05-11
tags:
  - bug
  - widget
  - photo-strip
  - reliability
related:
  - "[[Bug_Index]]"
  - "[[Photo_Strip]]"
  - "[[Product_Review_Lightbox]]"
  - "[[ADR_0006_Trusted_Review_Image_URL_Policy]]"
---

# Bug — Review Image Error Fallback Eksik (K2)

## Date
2026-05-11

## Status
Open

## Area
Widget, Storefront UX, Reliability

## Symptoms
- Strip, kart, liste, gallery, lightbox tüm thumbnail / görsel `<img>` etiketlerinde `onerror` handler yok.
- Cloudinary asset 404 dönerse tarayıcı default kırık-resim ikonu basar.
- Hata sessiz: telemetri/log yok, admin fark etmez.

## Sahnelendirme (örnek senaryo)
1. Admin 6 ay önce yüklenmiş bir test fotoğrafını Cloudinary konsolundan manuel siler. DB'deki `review.images` URL'si kalır.
2. Haftalık `cleanup-images` cron'u bir sonraki Pazartesi 03:00 UTC'ye kadar çalışmaz ([Current_Status.md](docs/wiki/01_Project/Current_Status.md): "Weekly Cloudinary cleanup cron").
3. Bu pencere boyunca (1-7 gün) ürün sayfasını ziyaret eden müşteriler strip'in ortasında kırık-image ikonu görür.
4. Strip thumbnail'ine tıklanırsa lightbox açılıyor ama ana görsel de 404 — boş / kırık modal.
5. 100 K impression varsa = 100 K kötü ilk izlenim, monitor "her şey normal" der.

İkinci senaryo: Cloudinary asset rename — URL pattern değişir, DB'deki referans bozulur.

Üçüncü senaryo: Network/CDN flaky — bazı bölgelerde geçici 502/503; mevcut davranışta retry yok, kırık ikon kalır.

## Root Cause
- [render.js:498-505](src/widget/product-widget/render.js) — strip thumbnail `<img>` oluşturulurken `onerror` yok.
- [review-modal.js:104-109](src/widget/product-widget/review-modal.js) — lightbox ana görsel `mainImg` da aynı şekilde.
- [card/index.js:99-107](src/widget/review-layouts/card/index.js), [list/index.js:113-122](src/widget/review-layouts/list/index.js), [gallery/index.js:111-117](src/widget/review-layouts/gallery/index.js) — diğer layout'lar da.
- `getTrustedReviewImages()` ([helpers.js](src/widget/core/helpers.js)) URL **pattern** doğruluyor ama **asset varlığını** doğrulayamaz — bunun için ya HEAD request ya da `<img>` `onload`/`onerror` callback gerekir.

## Önerilen düzeltme yönü
1. **Thumbnail seviyesinde graceful hide:**
   ```js
   thumb.onerror = function() {
     thumb.style.display = 'none';
     // Telemetri (örn. Sentry breadcrumb veya minimal fetch beacon)
   };
   ```
2. **Lightbox seviyesinde placeholder:** ana görsel 404 verirse "Görsel yüklenemedi" mesajı + close butonu.
3. **Telemetri:** her 404 için merkezi log endpoint'e (örn. yeni `/api/public/widget-telemetry`) düşük frekanslı POST. Cleanup cron schedule'ı bu telemetri ile tetiklenebilir hale gelir (Q3 — Open_Questions).
4. **Kırık görsel review'ı admin'e flag etme:** üst eşik aşılırsa (örn. aynı review'da 3+ 404) admin'e bildirim.

## Etkilenecek dosyalar
- [src/widget/product-widget/render.js](src/widget/product-widget/render.js) — strip thumbnail
- [src/widget/product-widget/review-modal.js](src/widget/product-widget/review-modal.js) — lightbox ana + mini şerit + preload
- [src/widget/review-layouts/card/index.js](src/widget/review-layouts/card/index.js)
- [src/widget/review-layouts/list/index.js](src/widget/review-layouts/list/index.js)
- [src/widget/review-layouts/gallery/index.js](src/widget/review-layouts/gallery/index.js)
- (Opsiyonel) yeni `src/app/api/public/widget-telemetry/route.ts` — minimal 404 beacon endpoint
- [src/widget/core/helpers.js](src/widget/core/helpers.js) — opsiyonel `attachImageErrorHandler(img)` helper

## Etki
- Storefront görsel kalite riski (premium tema için marka algısı).
- Cleanup cron + Cloudinary arası 1-7 günlük orphan penceresi kullanıcıya yansır.
- Sessiz outage tespit edilemez (telemetri yok).

## Prevention
- Cron schedule'ı kısa tut (haftalık → günlük); ek olarak 404 telemetrisi tetikleyici olarak çalışsın.
- E2E test: bir review.images URL'sini bilinçli olarak kırık yap, widget render path'ini smoke-test et.
- Cloudinary webhook (asset.delete event) ile DB'yi proaktif temizleme.

## Related Notes
- [[Photo_Strip]]
- [[Product_Review_Lightbox]]
- [[ADR_0006_Trusted_Review_Image_URL_Policy]]
- [[Bug_Index]]
- [[Open_Questions]] (Q3 — cleanup cron sıklığı)

## Change Log
- 2026-05-11: Sayfa oluşturuldu. Photo strip cap 15 + per-display-size width düzeltmeleriyle birlikte yapılan analiz sonucu açık bulgu olarak kayıt altına alındı.
