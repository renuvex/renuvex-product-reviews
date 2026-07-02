---
type: bug
project: renuvex-product-reviews
status: active
created: 2026-07-02
updated: 2026-07-02
last_verified: 2026-07-02
confidence: high
tags:
  - widget
  - svg
  - media
  - offline
  - cls
  - sprite
related:
  - "[[Bug_Icon_Sprite_Inner_Dimension_Strip]]"
  - "[[Bug_Icon_Use_Node_Blank_Glyphs]]"
  - "[[ADR_0019_Icon_Sprite_Rendering]]"
  - "[[Render_Output_Contract]]"
source_files:
  - "src/widget/icons/star-sprite.js"
  - "src/widget/reviews-section/media-thumbnail.js"
  - "src/widget/review-layouts/card/index.js"
  - "src/widget/review-layouts/list/index.js"
  - "src/widget/review-layouts/gallery/index.js"
  - "src/widget/reviews-section/render/media-gallery.js"
  - "tests/unit/widget-icon-sprite.test.ts"
  - "tests/unit/widget-media-thumbnail.test.ts"
  - "tests/widget-runtime-smoke.spec.ts"
---

# Bug: Offline / Partial-Load Unstyled Widget Fallback

## Symptom

Android Chrome offline refresh / partial-load states could show widget-owned primitives at browser fallback sizes instead of the intended widget sizes:

- summary and review rating stars could become huge black SVGs;
- review action/filter controls could appear as native gray buttons when CSS was missing;
- review media thumbnails and media-gallery video posters could render near their source quality dimensions instead of the visible thumbnail dimensions.

This is a degraded-state hardening bug, not a normal online styling bug. The widget is not expected to fully work offline, but partial markup must not expand enough to break the merchant page.

## Root Cause

The root cause was two related primitive-level contract gaps.

### SVG icons

The sprite migration correctly moved star geometry into `<symbol>` definitions and rendered stars through `<svg><use href="#..."></use></svg>`. However, `starUseSvg()` only emitted `viewBox` and relied on widget CSS classes such as `.renuvex-pr-avg-star`, `.renuvex-pr-icon > svg`, and `.renuvex-pr-star-svg` for sizing.

If the page was refreshed while offline, or CSS/style injection arrived after partial markup, the browser had no intrinsic width/height fallback on the use-site `<svg>`. That degraded path allowed the SVG viewport to grow according to default/auto layout instead of staying bounded.

### Media thumbnails

`createMediaThumbnail()` accepted a single `width`/`height` contract and callers passed source-quality constants such as `REVIEW_MEDIA_THUMB_WIDTH = 300` and `GALLERY_TILE_WIDTH = 600`. Those values are correct for Cloudinary/Mux transform quality and `srcset`, but they are too large as HTML `img.width` / `img.height` fallback dimensions when CSS is absent.

In normal styled mode, CSS variables still displayed these thumbnails at 80/110/140 px preset sizes. In partial/no-style mode, the HTML attributes could expose the 300/600 px source-quality contract directly.

The previous sprite fixes were still valid:
- [[Bug_Icon_Sprite_Inner_Dimension_Strip]] fixed root-only width/height stripping so symbol geometry was not erased.
- [[Bug_Icon_Use_Node_Blank_Glyphs]] fixed live shadow DOM glyph instancing.

This bug was a broader no-style sizing contract gap at shared render primitives.

## Fix

- `starUseSvg('full'|'outline')` now emits `width="1em" height="1em" focusable="false"` on the outer SVG.
- `iconUseSvg()` now adds the same `1em` fallback when the source SVG does not define explicit `width` and `height`.
- Source SVG dimensions are preserved when present.
- `svgStringToSymbol()` continues stripping root SVG dimensions from the symbol only; inner geometry dimensions remain untouched.
- `createMediaThumbnail()` now separates:
  - `sourceWidth` / `sourceHeight`: Cloudinary and Mux transform quality plus responsive `srcset`;
  - `displayWidth` / `displayHeight`: small HTML intrinsic fallback dimensions for degraded/no-style rendering.
- Review card media uses a 110x110 fallback.
- List/gallery review media and portrait media-gallery tiles use a 110x147 fallback.
- Existing source-quality constants stay unchanged, so styled retina quality is not reduced.

CSS remains the primary sizing system during normal operation. Intrinsic SVG and image fallback dimensions exist only to keep degraded/offline/unstyled renders bounded until CSS is available.

## Prevention

Do not create raw widget-owned `<svg><use></use></svg>` markup outside shared icon helpers. New widget icons must go through `starUseSvg()`, `iconUseSvg()`, or `iconUseNode()` so every use-site SVG carries a bounded intrinsic size fallback.

Do not pass CDN/source quality dimensions as HTML display fallback dimensions. New media thumbnails must go through `createMediaThumbnail()` and pass `sourceWidth/sourceHeight` separately from `displayWidth/displayHeight`. If a new layout adds a different visible thumbnail size, add an explicit display fallback for that surface instead of reusing Cloudinary/Mux quality widths.

Regression coverage:
- Unit tests pin `starUseSvg()` and generic icon fallback dimensions.
- Unit tests pin image/video thumbnail source-vs-display dimension separation.
- Runtime smoke tests verify summary, review-row, and badge star SVGs carry the fallback attributes while the styled average star remains in the expected preset range.
