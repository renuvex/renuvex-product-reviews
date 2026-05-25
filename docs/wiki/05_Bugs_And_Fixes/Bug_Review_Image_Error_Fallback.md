---
type: bug
project: renuvex-product-reviews
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
Fixed on 2026-05-11

## Area
Widget, Storefront UX, Reliability

## Symptoms
Before the fix:
- Strip, kart, liste, gallery, lightbox tüm thumbnail / görsel `<img>` etiketlerinde `onerror` handler yoktu.
- Cloudinary asset 404 dönerse tarayıcı default kırık-resim ikonu basıyordu.
- Hata sessiz: telemetri/log yok, admin fark etmiyordu.

After the fix:
- Strip + card/list/gallery thumbnails + lightbox mini thumbs: `hideOnImageError(img)` — kırık görsel DOM'da gizlenir, flex/grid container'da boşluk otomatik kapanır.
- Lightbox ana görsel: `attachImageErrorHandler` ile özel placeholder — "Bu görsel şu anda yüklenemiyor." mesajı koyu zeminde gösterilir; prev/next/swipe navigasyon çalışmaya devam eder.
- Tüm fail vakaları `console.warn('[ikr] image failed to load:', src)` ile loglanır → DevTools'tan görünür; ileride Sentry kurulursa otomatik yakalanır.

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

## Fix
- [helpers.js](src/widget/core/helpers.js) — iki yeni export:
  - `attachImageErrorHandler(img, onFail)` — `<img>` error event'inde caller'ın callback'ini bir kez (`{ once: true }`) çalıştırır, ayrıca `console.warn` ile log basar.
  - `hideOnImageError(img)` — convenience: kırık görseli `display:none` ile gizler. Thumbnail bağlamında uygun.
- [render.js](src/widget/product-widget/render.js) — strip thumbnail için `hideOnImageError`.
- [card/index.js](src/widget/review-layouts/card/index.js), [list/index.js](src/widget/review-layouts/list/index.js), [gallery/index.js](src/widget/review-layouts/gallery/index.js) — review thumbnail'leri için `hideOnImageError`.
- [review-modal.js](src/widget/product-widget/review-modal.js):
  - Mini şerit thumbnail'leri: `hideOnImageError`.
  - Ana görsel: `attachImageErrorHandler` ile özel callback — `mainImg` gizlenir, yerine `.ikr-modal-img-error` placeholder eklenir; lightbox navigasyonu (prev/next/swipe/thumbnail row) etkilenmez.
- [themes/ozy/styles.js](src/widget/themes/ozy/styles.js) — `.ikr-modal-img-error` CSS: koyu zemin, ortalanmış metin.
- Preload `new Image()` (review-modal.js:212) — dokunulmadı; `new Image().src` zaten DOM'a eklenmediği için sessiz fail eder, UI etkisi yok.
- [public/widget.js](public/widget.js) `pnpm build:widget` ile yeniden üretildi.

## Files Changed
- [src/widget/core/helpers.js](src/widget/core/helpers.js) — `attachImageErrorHandler` + `hideOnImageError`
- [src/widget/product-widget/render.js](src/widget/product-widget/render.js)
- [src/widget/review-layouts/card/index.js](src/widget/review-layouts/card/index.js)
- [src/widget/review-layouts/list/index.js](src/widget/review-layouts/list/index.js)
- [src/widget/review-layouts/gallery/index.js](src/widget/review-layouts/gallery/index.js)
- [src/widget/product-widget/review-modal.js](src/widget/product-widget/review-modal.js)
- [src/widget/themes/ozy/styles.js](src/widget/themes/ozy/styles.js) — `.ikr-modal-img-error`
- [public/widget.js](public/widget.js)

## Etki (düzeltme sonrası)
- Kırık-image ikonu hiçbir storefront thumbnail render path'inde görünmez.
- Cleanup cron + Cloudinary arası orphan penceresi kullanıcıya yansımaz — silently gizlenir.
- Lightbox ana görsel 404 olsa bile modal kapanmaz; placeholder + navigasyon çalışmaya devam eder.
- DevTools açıkken `console.warn` ile gözlemlenebilir; production'da sessiz ama ileride Sentry kurulursa otomatik yakalanır.

## Prevention
- `hideOnImageError`/`attachImageErrorHandler` her yeni `<img>` render path'inde standart pattern olarak kullanılmalı (kod review checklist).
- Cron schedule'ı (haftalık) — `console.warn` log volume'u yüksek seyrederse cron sıklaştırılmalı veya proaktif Cloudinary webhook eklenmeli (Q3 — [[Open_Questions]]).
- E2E test: bir `review.images` URL'sini bilinçli olarak kırık yap, widget'ın placeholder'a düştüğünü doğrula.

## Related Notes
- [[Photo_Strip]]
- [[Product_Review_Lightbox]]
- [[ADR_0006_Trusted_Review_Image_URL_Policy]]
- [[Bug_Index]]
- [[Open_Questions]] (Q3 — cleanup cron sıklığı)

## Change Log
- 2026-05-11: Fixed. `attachImageErrorHandler` + `hideOnImageError` helper'ları eklendi; tüm trusted image render path'leri (strip, card, list, gallery, lightbox mini) `hide` davranışına bağlandı. Lightbox ana görsel için özel placeholder eklendi (`.ikr-modal-img-error` koyu zemin + metin). Tüm fail durumları `console.warn` ile loglanıyor.
- 2026-05-11: Sayfa oluşturuldu. Photo strip cap 15 + per-display-size width düzeltmeleriyle birlikte yapılan analiz sonucu açık bulgu olarak kayıt altına alındı.
