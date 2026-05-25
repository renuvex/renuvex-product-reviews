---
type: bug
project: renuvex-product-reviews
status: active
created: 2026-05-11
updated: 2026-05-11
tags:
  - bug
  - widget
  - performance
  - photo-strip
related:
  - "[[Bug_Index]]"
  - "[[Photo_Strip]]"
  - "[[Widget_Performance]]"
  - "[[ADR_0007_Photo_Strip_Cap_And_Rotation]]"
---

# Bug - Photo Strip Lazy Loading + srcset Eksik (P2)

## Date
2026-05-11

## Status
Fixed on 2026-05-11

## Area
Widget, Performance, Storefront UX

## Symptoms
Before the fix:
- Photo strip and card/list thumbnails were missing `loading="lazy"`, `decoding="async"`, responsive `srcset`, and explicit `width`/`height`.
- Most thumbnails could enter the network queue before the user reached the review block.
- Retina screens received only the 1x Cloudinary variant in several thumbnail paths.
- CSS aspect-ratio helped, but explicit image dimensions were still missing for stronger CLS prevention.

After the fix:
- Photo strip, card, list, gallery, and lightbox mini thumbnails now use responsive image attributes.
- Photo strip keeps only the first 3 thumbnails eager; the rest are lazy.
- Lightbox main image remains eager because it is user-initiated, but now has explicit intrinsic dimensions.

## Example Scenario
Storefront has 15 photo reviews. A mobile visitor opens a product page on a slow connection.

Before:
- The strip rendered below the first viewport, but every thumbnail could start loading.
- Product hero and review thumbnails competed for bandwidth.
- High-DPR devices could show softer thumbnails in larger gallery/list surfaces.

After:
- Only the first 3 strip thumbnails are eager; offscreen thumbnails wait for native lazy loading.
- Browser picks 1x or 2x Cloudinary variants from `srcset`.
- `width`/`height` gives the browser a stable box before the image decodes.

## Root Cause
- [render.js](src/widget/product-widget/render.js) created photo strip images without responsive image metadata.
- [card/index.js](src/widget/review-layouts/card/index.js) and [list/index.js](src/widget/review-layouts/list/index.js) had the same gap.
- [gallery/index.js](src/widget/review-layouts/gallery/index.js) had `loading="lazy"` but no `srcset` or explicit dimensions.
- [review-modal.js](src/widget/product-widget/review-modal.js) optimized mini thumbnails but did not provide responsive attrs or dimensions.
- [helpers.js](src/widget/core/helpers.js) had width-specific Cloudinary optimization but no helper for producing a matched `src` + `srcset` pair.

## Fix
- [helpers.js](src/widget/core/helpers.js) now exposes `buildResponsiveImgAttrs(url, width)`, returning `src` plus a `1x, 2x` Cloudinary `srcset`.
- [render.js](src/widget/product-widget/render.js) applies `srcset`, `decoding`, and explicit dimensions to strip thumbnails; first 3 are eager, the rest lazy.
- [card/index.js](src/widget/review-layouts/card/index.js), [list/index.js](src/widget/review-layouts/list/index.js), and [gallery/index.js](src/widget/review-layouts/gallery/index.js) apply lazy loading, async decoding, `srcset`, and dimensions to review thumbnails.
- [review-modal.js](src/widget/product-widget/review-modal.js) applies responsive attrs to lightbox mini thumbnails and explicit dimensions to the main image. Main image is not lazy-loaded.
- [public/widget.js](public/widget.js) was regenerated with `pnpm build:widget`.

## Files Changed
- [src/widget/core/helpers.js](src/widget/core/helpers.js)
- [src/widget/product-widget/render.js](src/widget/product-widget/render.js)
- [src/widget/review-layouts/card/index.js](src/widget/review-layouts/card/index.js)
- [src/widget/review-layouts/list/index.js](src/widget/review-layouts/list/index.js)
- [src/widget/review-layouts/gallery/index.js](src/widget/review-layouts/gallery/index.js)
- [src/widget/product-widget/review-modal.js](src/widget/product-widget/review-modal.js)
- [public/widget.js](public/widget.js)

## Expected Gain
- Less early network contention for offscreen review photos.
- Sharper thumbnails on 2x/retina displays.
- Lower CLS risk for image-heavy review blocks.

## Prevention
- Keep review image render paths on `buildResponsiveImgAttrs()`.
- During widget review, check thumbnail `<img>` elements for `srcset`, `decoding`, and dimensions.
- Lighthouse or browser smoke tests should include card, list, gallery, and modal photo paths.

## Related Notes
- [[Photo_Strip]]
- [[Widget_Performance]]
- [[Bug_Index]]
- [[ADR_0007_Photo_Strip_Cap_And_Rotation]]

## Change Log
- 2026-05-11: Fixed P2. Added responsive `srcset`, native lazy loading, async decoding, and explicit dimensions across photo strip, review layouts, and lightbox thumbnails.
- 2026-05-11: Page created after P1 + M3 closed Cloudinary transformation width issues and left P2 as the next performance follow-up.
