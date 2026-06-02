---
type: bug
project: renuvex-product-reviews
status: active
created: 2026-06-02
updated: 2026-06-02
last_verified: 2026-06-02
confidence: high
tags:
  - bug
  - widget
  - review-layout
  - list-layout
  - images
related:
  - "[[Bug_Index]]"
  - "[[CSS_Variable_Surface]]"
  - "[[Test_Strategy]]"
source_files:
  - "src/widget/review-layouts/list/index.js"
  - "src/widget/review-layouts/list/styles.js"
  - "tests/widget-runtime-smoke.spec.ts"
---

# Bug - List Review Photo Height Stretch

## Date
2026-06-02

## Status
Fixed on 2026-06-02.

## Area
Widget, storefront review list layout, review item images

## Symptoms
In the list review layout, a customer review image could render as `110 x 400px` at the default medium widget size. The intended medium list item photo box is `110 x 146.67px` (3:4 portrait).

The top "Fotografli Yorumlar" photo strip was not the broken surface. This bug was specific to the review item image in `.renuvex-pr-review-list-media img`.

## Proof
The focused browser regression failed before the fix:

- `pnpm exec playwright test --config=playwright.widget.config.ts tests/widget-runtime-smoke.spec.ts -g "list review item photo keeps the medium 3:4 portrait box"`
- Expected height: `< 152`
- Received height: `400`

After the source fix and `pnpm build:widget`, the same test passed.

## Root Cause
- [src/widget/review-layouts/list/index.js](src/widget/review-layouts/list/index.js) emitted image dimensions for responsive loading and CLS reservation (`width=300`, `height=400`).
- [src/widget/review-layouts/list/styles.js](src/widget/review-layouts/list/styles.js) set the rendered width through `--renuvex-pr-list-photo-w`, but did not own the rendered height.
- Because the list layout did not explicitly set a display height, the HTML `height=400` dimension could remain as the rendered image height when CSS narrowed the image to the medium 110px column.

## Fix
- Added layout-local list photo height variables:
  - `--renuvex-pr-list-photo-h`
  - `--renuvex-pr-list-photo-h-mobile`
- The list layout now sets both width and height for review item images, preserving the existing 3:4 portrait contract.
- Added runtime smoke coverage for a tall list row so future changes cannot regress to the 400px rendered height.

## Prevention
- Treat list review item photo dimensions as a pair: width and height belong to the list layout's `sizeOverrides`.
- Do not rely on image HTML `width` / `height` attributes to define the final display box; those attributes are for loading/CLS metadata.
- Keep the top photo strip controlled by `thumbnailSize`; keep list review item photos controlled by widget `size`.

## Change Log
- 2026-06-02: Fixed P3 visual layout bug. Medium list item photos now render around `110 x 146.67px` instead of `110 x 400px`.
