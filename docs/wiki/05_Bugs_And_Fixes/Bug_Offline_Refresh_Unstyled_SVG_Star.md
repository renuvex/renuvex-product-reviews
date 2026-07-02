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
  - "tests/unit/widget-icon-sprite.test.ts"
  - "tests/widget-runtime-smoke.spec.ts"
---

# Bug: Offline Refresh Unstyled SVG Star

## Symptom

An Android Chrome offline refresh / partial-load state could show the review summary rating star as a huge black SVG. The screenshot showed the review heading and summary text rendering while the star expanded far beyond the intended 48/58/68 px preset.

## Root Cause

The sprite migration correctly moved star geometry into `<symbol>` definitions and rendered stars through `<svg><use href="#..."></use></svg>`. However, `starUseSvg()` only emitted `viewBox` and relied on widget CSS classes such as `.renuvex-pr-avg-star`, `.renuvex-pr-icon > svg`, and `.renuvex-pr-star-svg` for sizing.

If the page was refreshed while offline, or CSS/style injection arrived after partial markup, the browser had no intrinsic width/height fallback on the use-site `<svg>`. That degraded path allowed the SVG viewport to grow according to default/auto layout instead of staying bounded.

The previous sprite fixes were still valid:
- [[Bug_Icon_Sprite_Inner_Dimension_Strip]] fixed root-only width/height stripping so symbol geometry was not erased.
- [[Bug_Icon_Use_Node_Blank_Glyphs]] fixed live shadow DOM glyph instancing.

This bug was a separate no-style sizing contract gap at the SVG use site.

## Fix

- `starUseSvg('full'|'outline')` now emits `width="1em" height="1em" focusable="false"` on the outer SVG.
- `iconUseSvg()` now adds the same `1em` fallback when the source SVG does not define explicit `width` and `height`.
- Source SVG dimensions are preserved when present.
- `svgStringToSymbol()` continues stripping root SVG dimensions from the symbol only; inner geometry dimensions remain untouched.

CSS remains the primary sizing system during normal operation. The intrinsic SVG fallback exists only to keep degraded/offline/unstyled renders bounded until CSS is available.

## Prevention

Do not create raw widget-owned `<svg><use></use></svg>` markup outside shared icon helpers. New widget icons must go through `starUseSvg()`, `iconUseSvg()`, or `iconUseNode()` so every use-site SVG carries a bounded intrinsic size fallback.

Regression coverage:
- Unit tests pin `starUseSvg()` and generic icon fallback dimensions.
- Runtime smoke tests verify summary, review-row, and badge star SVGs carry the fallback attributes while the styled average star remains in the expected preset range.
