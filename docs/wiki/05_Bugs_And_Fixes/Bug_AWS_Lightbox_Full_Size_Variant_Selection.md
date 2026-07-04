---
type: bug
project: renuvex-product-reviews
status: active
created: 2026-07-04
updated: 2026-07-04
last_verified: 2026-07-04
confidence: high
tags:
  - bug
  - widget
  - lightbox
  - aws-images
related:
  - "[[Bug_Index]]"
  - "[[ADR_0034_AWS_Review_Image_Migration]]"
  - "[[Product_Review_Lightbox]]"
source_files:
  - "src/widget/core/helpers.js"
  - "src/widget/reviews-section/review-modal.js"
  - "tests/unit/widget-review-image-attrs.test.ts"
  - "tests/unit/widget-media-thumbnail.test.ts"
---

# Bug - AWS Lightbox Full-Size Variant Selection

## Date
2026-07-04

## Status
Fixed locally on 2026-07-04; live storefront verification requires widget deploy.

## Area
Storefront widget, review image lightbox, AWS image variants.

## Symptoms
The storefront thumbnail opened a lightbox whose main image used the portrait thumbnail object instead of the full-size review image variant:

```html
<img class="renuvex-pr-modal-main-img"
  src="https://media.renuvex.app/reviews/<assetId>/thumb_640x854.webp"
  width="1200"
  height="1600"
  alt="Yorum fotoğrafı">
```

The public API was correct: `media[].url` pointed at `w1200.jpeg` and the variant manifest included `w1200.webp`, `w1200.jpeg`, and thumbnail variants.

## Root Cause
`buildReviewImageAttrs()` selected image variants by numeric `width`. For small uploaded originals, generated `w300`, `w400`, `w600`, `w1200`, and `thumb_*` variants can all report the same output width because the processor does not upscale the source. In that tie case, the generic picker could fall through to the last WebP variant, `thumb_640x854.webp`.

That was acceptable for thumbnail surfaces but wrong for the modal main image, which should prefer the full-size `w*` variant family.

## Fix
- `buildReviewImageAttrs()` now supports a `preferFullSize` option.
- Lightbox main images call `buildReviewImageAttrs(currentMedia, LIGHTBOX_MAIN_WIDTH, { preferFullSize: true })`.
- Variant tie-breaking is deterministic by known variant id.
- Duplicate density `srcset` values are suppressed when 1x and 2x resolve to the same immutable AWS URL.

## Acceptance
- Unit coverage pins the small-original tie case so lightbox source selection returns `w1200.webp`, not `thumb_640x854.webp`.
- Thumbnail fallback behavior remains unchanged for non-lightbox thumbnail surfaces.
- `pnpm exec vitest run tests/unit/widget-review-image-attrs.test.ts tests/unit/widget-media-thumbnail.test.ts` passes.
- `pnpm build:widget`, `pnpm budget:widget`, `pnpm check:widget-js`, and `pnpm exec tsc --noEmit` pass.
