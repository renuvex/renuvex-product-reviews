---
type: widget
project: renuvex-product-reviews
status: active
created: 2026-05-11
updated: 2026-06-01
tags:
  - widget
  - reviews
  - photo-strip
related:
  - "[[Index]]"
  - "[[Product_Review_Widget]]"
  - "[[Product_Review_Lightbox]]"
  - "[[Widget_Architecture]]"
  - "[[ADR_0007_Photo_Strip_Cap_And_Rotation]]"
  - "[[ADR_0006_Trusted_Review_Image_URL_Policy]]"
  - "[[Bug_Cloud_Name_Silent_Image_Filter]]"
  - "[[Bug_Review_Image_Error_Fallback]]"
---

# Photo Strip (Fotoğraf Şeridi)

## Summary
Ürün yorumları widget'ının review summary altında, yorum kartlarının üstünde gösterilen yatay scroll'lu fotoğraf galerisi. Mağazaya yüklenmiş en yeni 15 fotoğraflı yorumdan birer thumbnail gösterir; tıklanınca [[Product_Review_Lightbox]] açılır ve şerit dataset'i içinde gezilebilir.

## Davranış
- **Cap: 15 fotoğraflı yorum** (sabit, admin ayarı yok). Bkz [[ADR_0007_Photo_Strip_Cap_And_Rotation]].
- **Sıralama: newest-first rotation.** Yeni onaylı fotoğraflı yorum geldiğinde 1 dakikalık `REVIEWS_CACHE_TTL` sonrası strip başına eklenir; en eski düşer.
- **Bağımsızlık:** Sort/filter (newest/highest/lowest/rating) ve "Daha Fazla Göster" değişikliklerinde strip re-fetch yapmaz. Yalnızca explicit review mount varsa `bootstrap.js` başlangıçta `reviews-api.js` helper'ını çağırır ve strip tek seferlik doldurulur.
- **Filter görünürlüğü:** Kullanıcı "Fotoğraflı" filtresini aktif ederse (`currentHasImages === true`) strip gizlenir — odak filtrelenmiş listeye verilir.
- **Gallery layout:** `:has(.renuvex-pr-review-gallery)` CSS selector keeps the strip outside the masonry column flow as a full-width row ([gallery/styles.js](src/widget/review-layouts/gallery/styles.js)).
- **Layout uyumu:** Card layout'ta thumbnail aspect 1:1, list/gallery'de 3:4 — `--renuvex-pr-photo-thumb-aspect` CSS değişkeniyle render anında set edilir.

## Veri akışı
1. `bootstrap.js` explicit review mount'u doğruladıktan sonra `reviews-api.js` üzerinden ürün sayfasında iki paralel istek atar:
   - Ana liste: `/api/public/reviews?orderBy=newest&page=1`
   - Photo strip: `/api/public/reviews?hasImages=true&orderBy=newest&limit=15`
2. Strip yanıtı `state.photoStripReviews` global state'e yazılır.
3. `render.js` strip'i bu state'ten okur, `getTrustedReviewImages` ile her review'dan ilk güvenilir görseli alır.
4. Thumbnail'e tıklanınca `openReviewModal(review, url, stripReviews)` — lightbox sadece strip dataset'i içinde navigate eder.

## Görsel ve CSS
- DOM yapısı:
  - `.renuvex-pr-photo-section` — bölüm wrapper
  - `.renuvex-pr-photo-title` — başlık (`settings.photoGalleryTitle`, default "Fotoğraflı Yorumlar")
  - `.renuvex-pr-photo-strip-wrap` — relative pozisyonlama
  - `.renuvex-pr-photo-strip` — yatay flex container, `overflow-x:auto`
  - `.renuvex-pr-photo-strip-thumb` — tek thumbnail (`<img>`)
  - `.renuvex-pr-photo-strip-arrow-prev` / `.renuvex-pr-photo-strip-arrow-next` — desktop ok butonları
- CSS dosyası: [reviews-section/styles/photo-strip.js](src/widget/reviews-section/styles/photo-strip.js), exported through [reviews-section/styles.js](src/widget/reviews-section/styles.js)
- Mobile (`@media max-width:600px`) — arrow butonları `display:none`; sadece touch swipe.

## Admin ayarları
Aşağıdaki ayarlar `widgetDefs.ts`'ten gelir ve strip'i etkiler:
- `showPhotoGallery` (bool, default `true`) — strip'i tamamen aç/kapa
- `showPhotoGalleryTitle` (bool, default `true`) — başlığı aç/kapa
- `photoGalleryTitle` (string) — başlık metni
- `photoTitleColor`, `photoTitleSize` — başlık tipografisi
- `photoArrowBg`, `photoArrowText`, `photoArrowBorder` — arrow buton görünümü
- `photoImageBorder` — thumbnail kenarı
- `thumbnailSize` (`small` / `medium` / `large` -> 80/110/140 px) - top photo strip thumbnail display size in every review layout
- `reviewLayout` — aspect ratio'yu dolaylı belirler

> Cap (15) admin tarafından değiştirilemez. Bu bilinçli bir karardır; bkz [[ADR_0007_Photo_Strip_Cap_And_Rotation]].

## Image optimization (Cloudinary transformation widths)
`optimizeImageUrl(url, width)` parametrelidir — her çağrı yeri kendi display boyutuna uygun width geçer. Lightbox dışı çağrılar 200-600 px aralığında küçük varyant ister; lightbox ana görsel + preload default 1200 px kullanır. Sabitler [helpers.js](src/widget/core/helpers.js)'te export edilmiştir, çağrı yerleri isimlendirilmiş sabit import eder (magic number yok).

| Sabit | Değer | Kullanım |
|---|---|---|
| `PHOTO_STRIP_THUMB_WIDTH` | 300 | Photo strip thumbnail (90-140 px display) + kart + liste |
| `GALLERY_TILE_WIDTH` | 600 | Gallery masonry tile (200-400 px display) |
| `LIGHTBOX_MINI_THUMB_WIDTH` | 200 | Lightbox altı mini şerit (60-80 px display) |
| `LIGHTBOX_MAIN_WIDTH` | 1200 | Lightbox ana görsel + preload (parametresiz default) |

Tasarruf: 1200 px tek varyant → çağrı yerine göre 200-600 px varyantları. Strip thumbnail başına ~%85 transfer azalması, lightbox ana görsel kalitesi değişmez.

Responsive delivery: [helpers.js](src/widget/core/helpers.js) içindeki `buildResponsiveImgAttrs(url, width)` her thumbnail için `src` + `1x, 2x` `srcset` çiftini üretir. Photo strip ilk 3 thumbnail'i eager yükler; kalan strip thumbnail'leri, card/list/gallery thumbnail'leri ve lightbox mini thumbnail'leri `loading="lazy"` + `decoding="async"` kullanır. Tüm thumbnail render path'leri explicit `width`/`height` attribute'u set eder. Lightbox ana görsel tıklama ile açıldığı için lazy değildir; kaliteyi korumak için 1200 px default Cloudinary varyantı ve explicit 4:3 boyut rezervi kullanır.

Image failure behavior: thumbnail render paths use `hideOnImageError(img)` from [helpers.js](src/widget/core/helpers.js), so Cloudinary 404 / CDN / network failures do not show the browser broken-image icon in the strip or review cards. The lightbox main image uses a separate placeholder pattern documented in [[Product_Review_Lightbox]]. Related bug: [[Bug_Review_Image_Error_Fallback]].

## Bilinen sınırlamalar (açık iyileştirme alanları)
Her bir kritik bulgu için ayrı bug detay sayfası açıldı — kanıt, senaryo ve dosya:satır referansları orada.

- **U2:** Mağazada 15'ten fazla fotoğraflı yorum varsa "+N daha" göstergesi yok (rakipler genelde göstermiyor; opsiyonel).
- **U3:** Arrow scroll mesafesi sabit 200px; thumbnail boyutuna göre dinamik değil.
- **U4:** Arrow butonları başta/sonda `disabled` durumuna geçmiyor.

## Related Source Files
- [src/widget/reviews-section/render.js](src/widget/reviews-section/render.js) — strip render bloğu
- [src/widget/reviews-section/bootstrap.js](src/widget/reviews-section/bootstrap.js) — explicit mount gate + initial parallel fetch orchestration
- [src/widget/reviews-section/reviews-api.js](src/widget/reviews-section/reviews-api.js) — `fetchPhotoStripReviews`, `PHOTO_STRIP_LIMIT`
- [src/widget/core/state.js](src/widget/core/state.js) — `photoStripReviews` state
- [src/widget/reviews-section/review-modal.js](src/widget/reviews-section/review-modal.js) — lightbox navigation
- [src/widget/core/helpers.js](src/widget/core/helpers.js) — `getTrustedReviewImages`, `optimizeImageUrl`, `buildResponsiveImgAttrs`
- [src/widget/reviews-section/styles/photo-strip.js](src/widget/reviews-section/styles/photo-strip.js) — strip CSS
- [src/widget/reviews-section/styles.js](src/widget/reviews-section/styles.js) — `CLASSIC_CSS` aggregator that exports the strip CSS
- [src/app/api/public/reviews/route.ts](src/app/api/public/reviews/route.ts) — `limit` query param (1-30 clamp)
- [src/components/home-page/widgets/widgetDefs.ts](src/components/home-page/widgets/widgetDefs.ts) — admin settings

## Obsidian Links
- [[Product_Review_Widget]]
- [[Product_Review_Lightbox]]
- [[Widget_Architecture]]
- [[Storefront_Widget_Overview]]
- [[Widget_Customization]]
- [[ADR_0007_Photo_Strip_Cap_And_Rotation]]
- [[ADR_0006_Trusted_Review_Image_URL_Policy]]
- [[ADR_0008_Cloud_Name_Build_Time_Only]]
- [[Bug_Review_Detail_Lightbox_Risks]]
- [[Bug_Cloud_Name_Silent_Image_Filter]]
- [[Bug_Review_Image_Error_Fallback]]

## Change Log
- 2026-06-01: Fixed [[Bug_Photo_Strip_Thumbnail_Size_Contract]]. The top photo strip thumbnail width now always follows `thumbnailSize`; list/gallery review item photos remain tied to widget `size`.
- 2026-05-27: ADR_0024 follow-up moved `fetchPhotoStripReviews` and `PHOTO_STRIP_LIMIT` from `bootstrap.js` to `reviews-api.js`. `bootstrap.js` now only triggers the initial fetch after the explicit reviews mount exists; badge-only PDPs do not call photoStrip.
- 2026-05-11: K2 kapandi. Photo strip and review thumbnail render paths now use `hideOnImageError(img)` so broken image assets collapse instead of showing browser broken-image icons. Related bug: [[Bug_Review_Image_Error_Fallback]].
- 2026-05-11: K3 yapısal olarak kapandı ([[ADR_0008_Cloud_Name_Build_Time_Only]]). Cloud name widget'ta tek kaynak — build-time inject. Settings response'undan `imagePolicy` kaldırıldı, runtime cache + setter + warn helper silindi (~90 satır). Kaynak: [scripts/build-widget.mjs](scripts/build-widget.mjs), [helpers.js](src/widget/core/helpers.js), [bootstrap.js](src/widget/reviews-section/bootstrap.js), [settings/route.ts](src/app/api/public/settings/route.ts), [step-photos.js](src/widget/reviews-section/review-form-modal/steps/step-photos.js).
- 2026-05-11: K3 ilk fix. Trusted image policy build-time public cloud fallback, last-valid widget cache ve settings `stale-if-error` ile dayanıklı hale getirildi. (Aynı gün ADR_0008 ile değiştirildi — defansif runtime katmanları gereksiz hale geldi.) İlgili bug: [[Bug_Cloud_Name_Silent_Image_Filter]].
- 2026-05-11: P2 kapandı. Photo strip, card/list/gallery thumbnails ve lightbox mini thumbnail'leri responsive `srcset`, native lazy/eager policy, async decoding ve explicit dimensions kullanıyor. Lightbox ana görsel eager kaldı, 1200 px default Cloudinary varyantıyla explicit dimensions aldı. İlgili bug: [[Bug_Photo_Strip_Lazy_Loading_And_Srcset]].
- 2026-05-11: `optimizeImageUrl` parametreli imzaya geçirildi (`url, width`); her çağrı yeri display boyutuna uygun width geçiyor — strip 300, gallery tile 600, lightbox mini 200, lightbox ana 1200 (default). Strip thumbnail transferi ~%85 azaldı. P1 + M3 kapandı. İlgili kaynak: [helpers.js](src/widget/core/helpers.js), [render.js](src/widget/reviews-section/render.js), [card/index.js](src/widget/review-layouts/card/index.js), [list/index.js](src/widget/review-layouts/list/index.js), [gallery/index.js](src/widget/review-layouts/gallery/index.js), [review-modal.js](src/widget/reviews-section/review-modal.js).
- 2026-05-11: Sayfa oluşturuldu. Cap 15 + newest-first rotation kararıyla birlikte ([[ADR_0007_Photo_Strip_Cap_And_Rotation]]) strip ana liste'den bağımsızlaştırıldı; load-more sonrası stale state (K1) ve lightbox dead-end (K1.b) kapatıldı. İlgili kaynak: [bootstrap.js](src/widget/reviews-section/bootstrap.js), [render.js](src/widget/reviews-section/render.js), [state.js](src/widget/core/state.js).
