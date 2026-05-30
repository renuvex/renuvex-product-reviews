---
type: bug
project: renuvex-product-reviews
status: active
created: 2026-05-30
updated: 2026-05-30
last_verified: 2026-05-30
confidence: high
tags:
  - bug
  - widget
  - icons
  - sprite
  - shadow-dom
related:
  - "[[Bug_Index]]"
  - "[[Bug_Icon_Sprite_Inner_Dimension_Strip]]"
  - "[[ADR_0021_Shadow_DOM_Isolation_Of_Review_Surfaces]]"
source_files:
  - "src/widget/icons/star-sprite.js"
  - "tests/widget-interaction-smoke.spec.ts"
---

# Bug - iconUseNode Blank Glyphs (`<use>` via image/svg+xml)

## Status
Fixed (2026-05-30).

## Area
Widget icon sprite `iconUseNode()` (`icons/star-sprite.js`). Affects every icon inserted with
`appendChild(iconUseNode(...))`: lightbox close (desktop + mobile) and prev/next, photo-strip
prev/next, review-wizard close, and the photo thumbnail-remove `✕`.

## Symptoms
After the Phosphor unification, the caret (`‹ › ⌄`) and X icons rendered as **blank buttons** —
the button box was present and clickable, but no glyph painted. User report: "eklediğin oklar
görünmüyor" (the arrows don't show). The filter `lines` icon, compact chevron, rating stars,
and wizard back arrow rendered fine, which made it look polyline-specific at first.

## Root Cause
`iconUseNode()` built the `<svg><use href="#sym"/></svg>` node via
`new DOMParser().parseFromString(markup, 'image/svg+xml')` + `document.importNode()`.

A `<use>` element created through `image/svg+xml` + `importNode` does **not instance its
referenced `<symbol>`** once the node is moved into a live (shadow) tree — its use-element
shadow tree never builds. The icon therefore has a normal bounding **rect** (the `<svg>` box is
sized by CSS) but an **empty `getBBox()`** (no rendered content) → blank paint.

The icons that worked were all built by **HTML parsing**: `iconUseSvg()` returns a string set
via `innerHTML` (filter button, compact chevron, wizard back), and HTML-parsed `<use>` elements
resolve correctly. Filled icons (stars, `fill="currentColor"` paths) were unaffected because the
distinction is about `<use>`-instancing, not stroke vs fill.

**Why every existing test passed:** the widget network / runtime / interaction smokes assert
*behavior and presence* (the buttons still exist and still click), never *rendered geometry*. A
blank-but-clickable button is invisible to them.

## Diagnosis (how it was proven)
Playwright + real Chromium, against the local build:
- Screenshots of the open lightbox + photo strip showed blank caret/X buttons.
- `getComputedStyle` + `getBBox()`: broken caret `getBBox()` was **null/empty** while the working
  filter line and an injected control swatch had real bboxes.
- A controlled swatch proved the **same** symbol `<use>` paints when HTML-parsed
  (`insertAdjacentHTML`) but is blank when built via `image/svg+xml` + `importNode`.

## Fix
`iconUseNode()` now parses the icon markup as **HTML** (detached `<div>` +
`insertAdjacentHTML`, return `firstElementChild`) instead of `image/svg+xml` + `importNode`, so
the `<use>` resolves on insertion exactly like an `innerHTML`-set icon.

## Files Changed
- `src/widget/icons/star-sprite.js` — `iconUseNode()` HTML parsing.
- `tests/widget-interaction-smoke.spec.ts` — regression: after opening the lightbox, assert the
  photo-strip caret and lightbox close `svg.getBBox().width > 0` (fails on the old code, passes now).
- Rebuilt `public/widget.js` + `public/widget-runtime/*`.

## Verification
- `pnpm build:widget`, `pnpm check:widget-js` (18/18), `pnpm test:unit` (54/54),
  `pnpm exec tsc --noEmit`, `pnpm lint`, `pnpm test:widget-interactions` (6/6 incl. the new
  geometry regression), `pnpm test:widget-runtime` (8/8).
- Visual: lightbox close `✕` + nav `‹ ›`, photo-strip `‹ ›`, wizard close `✕`, and compact `⌄`
  all paint in screenshots.

## Related / known latent
- `iconUseSvg()`'s `getAttr(svg, 'width')` regex `\bwidth="..."` also matches `stroke-width="16"`,
  so stroke icons get a stray `width="16"` (no `height`) on the outer `<svg>`. It is harmless
  today (CSS `svg{width;height}` rules override it for sized icons; the filter button is sized by
  that 16px), so it was left as-is — but a future `getAttr` fix must add explicit filter-icon CSS
  sizing or the filter glyph will lose its size.

## Prevention
- An SVG `<use>` that references a sprite `<symbol>` and will be inserted into a (shadow) tree
  must be created by **HTML parsing**, never `DOMParser('image/svg+xml')` + `importNode`.
- Icon tests must assert **rendered geometry** (`getBBox()`), not only presence/clickability.
