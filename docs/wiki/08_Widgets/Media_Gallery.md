---
type: widget
project: renuvex-product-reviews
status: active
created: 2026-06-25
updated: 2026-06-25
last_verified: 2026-06-25
confidence: high
tags:
  - widget
  - reviews
  - media-gallery
related:
  - "[[Index]]"
  - "[[Product_Review_Widget]]"
  - "[[Product_Review_Lightbox]]"
  - "[[Widget_Architecture]]"
  - "[[ADR_0007_Photo_Strip_Cap_And_Rotation]]"
  - "[[ADR_0006_Trusted_Review_Image_URL_Policy]]"
  - "[[ADR_0029_Review_Media_Metadata]]"
  - "[[ADR_0032_Review_Video_On_Mux]]"
source_files:
  - "src/widget/reviews-section/render/media-gallery.js"
  - "src/widget/reviews-section/styles/media-gallery.js"
  - "src/widget/reviews-section/reviews-api.js"
  - "src/widget/reviews-section/bootstrap.js"
  - "src/widget/core/state.js"
  - "src/widget/core/helpers.js"
  - "src/components/home-page/widgets/widgetDefs.ts"
  - "src/lib/widget-settings.ts"
  - "scripts/migrate-widget-settings-media-gallery-keys.mjs"
---

# Media Gallery

## Summary
The Media Gallery is the horizontal media rail above the review list. It keeps the original independent "photo strip" behavior, but the product language and active settings now describe the surface as media because approved videos can appear beside review images when video reviews are enabled.

Default storefront title: `Müşteri Görselleri`.

## Runtime Contract
- The gallery is fetched once during `reviews-section/bootstrap.js`, only after the explicit review mount exists.
- Image-only stores use `fetchImageMediaGalleryReviews(productId)` with `hasImages=true&limit=15&orderBy=newest`.
- Video-enabled stores use `fetchMixedMediaGalleryReviews(productId)` with `hasMedia=true&limit=15&orderBy=newest`, so approved video posters can appear in the same gallery without changing the public photo filter.
- The response is stored in `state.mediaStripReviews`.
- Sort, rating filter, photo filter, retry, and load-more interactions do not re-fetch the gallery.
- When the public photo filter is active (`currentHasImages === true`), the media gallery hides so the filtered review list owns the media focus.
- The cap is fixed at 15 and intentionally has no admin setting. The historical decision is still [[ADR_0007_Photo_Strip_Cap_And_Rotation]].

## Settings Contract
Canonical settings keys:
- `showMediaGallery`
- `showMediaGalleryTitle`
- `mediaGalleryTitle`
- `mediaGalleryTitleColor`
- `mediaGalleryArrowBgColor`
- `mediaGalleryArrowTextColor`

`thumbnailSize` controls the top media-gallery thumbnail display size (`small` / `medium` / `large`). Review item media size stays controlled by the selected review layout and general widget size.

Legacy keys are still accepted at the API boundary and normalized in [src/lib/widget-settings.ts](src/lib/widget-settings.ts):
- `showPhotoGallery` -> `showMediaGallery`
- `showPhotoGalleryTitle` -> `showMediaGalleryTitle`
- `photoGalleryTitle` -> `mediaGalleryTitle`
- `photoTitleColor` -> `mediaGalleryTitleColor`
- `photoArrowBgColor` -> `mediaGalleryArrowBgColor`
- `photoArrowTextColor` -> `mediaGalleryArrowTextColor`

If both a legacy key and its canonical key exist, the canonical key wins.

## DOM and CSS Contract
Active classes:
- `.renuvex-pr-media-gallery-section`
- `.renuvex-pr-media-gallery-title`
- `.renuvex-pr-media-gallery-strip-wrap`
- `.renuvex-pr-media-gallery-strip`
- `.renuvex-pr-media-gallery-thumb`
- `.renuvex-pr-media-gallery-arrow`
- `.renuvex-pr-media-gallery-arrow-prev`
- `.renuvex-pr-media-gallery-arrow-next`

Active CSS variables:
- `--renuvex-pr-media-gallery-title-size`
- `--renuvex-pr-media-gallery-title`
- `--renuvex-pr-media-gallery-arrow-bg`
- `--renuvex-pr-media-gallery-arrow-border`
- `--renuvex-pr-media-gallery-arrow-text`
- `--renuvex-pr-media-gallery-image-border`
- `--renuvex-pr-media-gallery-thumb-aspect`
- `--renuvex-pr-thumbnail-size`

The gallery opens [[Product_Review_Lightbox]] through the shared lightbox trigger contract, the same as card/list/gallery review media.

## Data and Migration
No Prisma schema migration is required for the rename. Existing `WidgetSettings.settings` JSON can be migrated with:

```bash
pnpm settings:media-gallery:migrate
```

The script is dry-run by default. It prints which stores would change and never writes unless `--write` is passed. Write mode is a DB mutation and requires explicit approval before execution.

The public `hasImages` filter remains image-specific by design. The media gallery may use `hasMedia` internally when video reviews are enabled, but the shopper-facing photo filter is still `hasImages=true`.

## Related Source Files
- [src/widget/reviews-section/render/media-gallery.js](src/widget/reviews-section/render/media-gallery.js)
- [src/widget/reviews-section/styles/media-gallery.js](src/widget/reviews-section/styles/media-gallery.js)
- [src/widget/reviews-section/reviews-api.js](src/widget/reviews-section/reviews-api.js)
- [src/widget/reviews-section/bootstrap.js](src/widget/reviews-section/bootstrap.js)
- [src/widget/core/state.js](src/widget/core/state.js)
- [src/widget/core/helpers.js](src/widget/core/helpers.js)
- [src/components/home-page/widgets/widgetDefs.ts](src/components/home-page/widgets/widgetDefs.ts)
- [src/lib/widget-settings.ts](src/lib/widget-settings.ts)
- [scripts/migrate-widget-settings-media-gallery-keys.mjs](scripts/migrate-widget-settings-media-gallery-keys.mjs)

## Change Log
- 2026-06-25: Renamed the active storefront surface from photo strip to media gallery. The old photo-strip behavior remains as the underlying historical decision, while active settings, DOM classes, CSS variables, source files, and docs now use media-gallery terminology.
