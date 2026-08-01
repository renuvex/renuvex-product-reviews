---
type: bug
project: renuvex-product-reviews
status: active
created: 2026-06-01
updated: 2026-06-01
tags:
  - bug
  - widget
  - photo-strip
  - settings-contract
related:
  - "[[Bug_Index]]"
  - "[[Photo_Strip]]"
  - "[[Widget_Architecture]]"
  - "[[CSS_Variable_Surface]]"
---

# Bug - Photo Strip Thumbnail Size Contract (P3)

## Date
2026-06-01

## Status
Fixed on 2026-06-01

## Area
Widget, Storefront UX, Admin settings contract

## Symptoms
Before the fix:
- The admin setting `thumbnailSize` is labeled "Fotoğraf Galeri Boyutu" and is visible for list and gallery review layouts.
- In list/gallery layouts, choosing `thumbnailSize: large` did not enlarge the top "Fotoğraflı Yorumlar" photo strip when `size: small` was selected.
- The strip thumbnail width stayed at 80px because `render.js` overwrote the photo strip thumbnail size with the review layout's item-photo width.

After the fix:
- The top photo strip thumbnail size always follows `thumbnailSize` (`small` / `medium` / `large` -> 80 / 110 / 140 px).
- List/gallery review item photos still follow the general widget `size` through layout-local item-photo variables; list owns a fixed 3:4 width/height pair, while gallery owns its photo column width.
- The strip aspect ratio remains layout-aware: card is 1:1; list/gallery are 3:4.

## Proof
The new runtime regression test failed before the source fix:

- `list` layout: `size: small`, `thumbnailSize: large` produced an 80px strip thumbnail instead of 140px.
- `gallery` layout: same settings produced the same 80px strip thumbnail.

After removing the override and rebuilding the widget runtime, both cases passed.

## Root Cause
- [src/widget/reviews-section/render.js](src/widget/reviews-section/render.js) read `THUMBNAIL_PRESETS[settings.thumbnailSize]`, then for list/gallery layouts overwrote `thumbPx` with the layout item-photo width from `meta.sizeOverrides`.
- [src/lib/widgets/catalog.ts](src/lib/widgets/catalog.ts) exposes the field as "Fotoğraf Galeri Boyutu", so the runtime behavior contradicted the visible admin contract.

## Fix
- [src/widget/reviews-section/render.js](src/widget/reviews-section/render.js) now leaves `--renuvex-pr-thumbnail-size` tied to `thumbnailSize`.
- [src/widget/review-layouts/list/index.js](src/widget/review-layouts/list/index.js) and [src/widget/review-layouts/gallery/index.js](src/widget/review-layouts/gallery/index.js) comments now clarify that layout item photos follow widget `size`, while the top strip follows `thumbnailSize`.
- [tests/widget-runtime-smoke.spec.ts](tests/widget-runtime-smoke.spec.ts) pins list and gallery behavior with `size: small` plus `thumbnailSize: large`: strip thumbnail must be ~140px, while the layout item photo remains ~80px.

## Prevention
- Do not couple the top photo strip thumbnail size to review-layout item photo columns.
- Keep `thumbnailSize` as the single source for `.renuvex-pr-photo-strip-thumb` display size.
- If a future layout does not support the top strip size setting, hide the admin field via the layout `meta.supports` contract instead of silently ignoring it.

## Related Notes
- [[Photo_Strip]]
- [[CSS_Variable_Surface]]
- [[Bug_Index]]

## Change Log
- 2026-06-01: Fixed P3. Removed list/gallery override of `--renuvex-pr-thumbnail-size` and added browser regression coverage.
