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
  - shadow-dom
related:
  - "[[Bug_Icon_Sprite_Inner_Dimension_Strip]]"
  - "[[Bug_Icon_Use_Node_Blank_Glyphs]]"
  - "[[ADR_0019_Icon_Sprite_Rendering]]"
  - "[[Render_Output_Contract]]"
source_files:
  - "src/widget/core/shadow.js"
  - "src/widget/icons/star-sprite.js"
  - "src/widget/reviews-section/media-thumbnail.js"
  - "src/widget/reviews-section/render.js"
  - "src/widget/reviews-section/review-modal.js"
  - "src/widget/reviews-section/review-form-modal/modal-shell.js"
  - "src/widget/review-layouts/card/index.js"
  - "src/widget/review-layouts/list/index.js"
  - "src/widget/review-layouts/gallery/index.js"
  - "src/widget/reviews-section/render/media-gallery.js"
  - "tests/unit/widget-shadow-style-gate.test.ts"
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

Follow-up Android Chrome offline screenshots after the primitive fix showed that stars and thumbnails were now bounded, but the review section could still appear as raw unstyled HTML: stacked text, native gray buttons, and default browser flow. That proved the first fix was necessary but not sufficient; the remaining class was a Shadow DOM no-style visibility problem.

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

### Shadow content style gate

The later screenshots showed a second contract gap: review content was appended into the shadow root as soon as data/rendering was ready, and `injectShadowStyles()` also appended a `<style data-renuvex-shadow-style>` into that root. In a normal online path the style is present, so the widget renders correctly.

In offline refresh / partial-load snapshots, however, the browser can retain or run enough JavaScript/data to create DOM while the shadow CSS is missing or not applied. Since `[data-renuvex-shadow-content]` and overlay roots were visible by default, shoppers could see the raw DOM before the widget design contract existed.

This is the third-party widget variant of FOUC: content is present without its component stylesheet. The correct behavior is fail-quiet: CSS-ready content is visible; CSS-missing content stays hidden inside the reserved shell.

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
- Shadow section content now uses a style gate:
  - `getOrCreateShadowContent()` applies inline `display:none; visibility:hidden` fallback to `[data-renuvex-shadow-content]`.
  - `HOST_RESET_CSS` reveals the wrapper with `display:block!important; visibility:visible!important` only when the shadow stylesheet is present.
- Body-level overlay surfaces now use the same contract:
  - lightbox and review-form wizard overlays are appended through `appendGatedShadowOverlay()`;
  - they are hidden by inline fallback and revealed by `HOST_RESET_CSS` with `display:flex!important; visibility:visible!important`.

CSS remains the primary sizing system during normal operation. Intrinsic SVG and image fallback dimensions exist only to keep degraded/offline/unstyled renders bounded until CSS is available.

The style gate intentionally does not duplicate the whole widget stylesheet inline. If the shadow stylesheet is missing, the safer behavior is a quiet reserved shell or hidden overlay, not a partially styled storefront widget.

## Prevention

Do not create raw widget-owned `<svg><use></use></svg>` markup outside shared icon helpers. New widget icons must go through `starUseSvg()`, `iconUseSvg()`, or `iconUseNode()` so every use-site SVG carries a bounded intrinsic size fallback.

Do not pass CDN/source quality dimensions as HTML display fallback dimensions. New media thumbnails must go through `createMediaThumbnail()` and pass `sourceWidth/sourceHeight` separately from `displayWidth/displayHeight`. If a new layout adds a different visible thumbnail size, add an explicit display fallback for that surface instead of reusing Cloudinary/Mux quality widths.

Regression coverage:
- Unit tests pin `starUseSvg()` and generic icon fallback dimensions.
- Unit tests pin image/video thumbnail source-vs-display dimension separation.
- Unit tests pin the shadow style-gate contract and the `HOST_RESET_CSS` reveal rules.
- Runtime smoke tests verify summary, review-row, and badge star SVGs carry the fallback attributes while the styled average star remains in the expected preset range.
- Runtime smoke tests remove the shadow stylesheet after render and verify the review content and lightbox overlay hide instead of showing raw HTML.
