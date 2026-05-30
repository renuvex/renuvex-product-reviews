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
  - "[[ADR_0021_Shadow_DOM_Isolation_Of_Review_Surfaces]]"
source_files:
  - "src/widget/icons/star-sprite.js"
  - "src/widget/reviews-section/review-form-modal/steps/step-photos.js"
  - "tests/unit/widget-icon-sprite.test.ts"
---

# Bug - Icon Sprite Inner Dimension Strip

## Status
Fixed (2026-05-30).

## Area
Widget icon sprite (`icons/star-sprite.js` `svgStringToSymbol`). Affects any icon whose
geometry is drawn with an inner element that carries `width`/`height` (`<rect>`, `<image>`,
nested `<use>`). In practice the only such icon was the review-form wizard's photo step
"Fotoğraf Ekle" button icon ([src/widget/reviews-section/review-form-modal/steps/step-photos.js](src/widget/reviews-section/review-form-modal/steps/step-photos.js)).

## Symptoms
The "Fotoğraf Ekle" icon rendered **without its square frame** — only the inner lens circle
and the diagonal "mountain" line showed; the rounded rectangle border was missing. Latent
since the unified `<symbol>`/`<use>` sprite was introduced; never noticed because every other
widget icon (stars, filter, close, back-arrow, chevron) is drawn with `<path>`/`<circle>`/
`<line>`, none of which use `width`/`height` attributes.

Discovered while swapping the wizard photo/plus icons to Phosphor (256-grid `image` + `plus`)
to match the badge/filter icon family: the Phosphor `image` frame is **also** a
`<rect width height>`, so it would have rendered frameless too.

## Root Cause
`svgStringToSymbol` converts a trusted SVG string into a `<symbol>` and removed the root
`<svg>`'s presentation attrs with **global** regexes:

```js
.replace(/\s+width="[^"]*"/g, '')   // intended: strip the ROOT <svg width>
.replace(/\s+height="[^"]*"/g, '')  // intended: strip the ROOT <svg height>
```

The `/g` flag matched **every** ` width="…"` / ` height="…"` in the string, not just the root
tag. For the image icon the frame is `<rect x="40" y="40" width="176" height="176" …>`, so the
strip turned it into `<rect x="40" y="40" …>`. An SVG `<rect>` with no `width`/`height`
computes to a 0×0 box and **renders nothing** → the frame vanished.

(`stroke-width="16"` was always safe: the regex requires whitespace before `width`, and
`stroke-width` has a hyphen — so it was never matched, by old or new code.)

This is the same family as the other sprite/shadow-DOM assumptions: a transform written for
the common case (path-only icons) that breaks the moment an icon uses a different primitive.

## Fix
Scope the attr strip to the **root `<svg>` opening tag only**: capture the opening tag's
attributes, clean `xmlns`/`aria-hidden`/`width`/`height` **within that capture**, and rebuild
it as `<symbol id="…" …>`. Inner geometry is never touched.

```js
.replace(/^\s*<svg\b([^>]*)>/, function (_match, rootAttrs) {
  var cleaned = rootAttrs
    .replace(/\s+xmlns="[^"]*"/g, '')
    .replace(/\s+aria-hidden="[^"]*"/g, '')
    .replace(/\s+width="[^"]*"/g, '')
    .replace(/\s+height="[^"]*"/g, '');
  return '<symbol id="' + symbolId + '"' + cleaned + '>';
})
```

Path/circle/line icons (stars, filter) carry no inner `width`/`height`, so their symbol output
is **byte-identical** before and after (asserted in the unit test). `svgStringToSymbol` is now
exported so it can be unit-tested as a pure function (vitest runs in a `node` env where
`iconUseSvg` would otherwise short-circuit to the raw string).

Alongside the fix, the wizard photo/plus icons were swapped to Phosphor (`PHOTO_ICON` /
`PLUS_ICON`, 256-grid, inline path data — no icon package) and de-duplicated: the icon/label
markup now has a single source of truth in `updateAddButton()` (the redundant initial
`innerHTML` render at element-creation time was removed; `syncUI()` invokes `updateAddButton()`
synchronously before the element is shown).

## Files Changed
- `src/widget/icons/star-sprite.js` (root-only attr strip; `export svgStringToSymbol`)
- `src/widget/reviews-section/review-form-modal/steps/step-photos.js` (Phosphor `image`/`plus`,
  module-scope `PHOTO_ICON`/`PLUS_ICON`, removed duplicate initial render)
- `tests/unit/widget-icon-sprite.test.ts` (new — inner `<rect width height>` preserved; root
  attrs stripped; path-icon output unchanged)
- Rebuilt `public/widget.js` + `public/widget-runtime/*`

## Verification
- `pnpm build:widget`, `pnpm check:widget-js` (18/18 `node --check`).
- `pnpm test:unit` (51/51, incl. the new sprite regression), `pnpm exec tsc --noEmit` (clean),
  `pnpm lint` (clean), `pnpm test:widget-interactions` (5/5, incl. the review wizard flow).
- Confirmed the rebuilt render chunk contains the Phosphor `image`/`plus` path data and no
  longer contains the old Lucide `image` polyline.

## Prevention
- Sprite/symbol transforms must scope attribute edits to the **root tag**, never operate
  globally across inner geometry. The unit test pins this: an inner `<rect width height>` must
  survive conversion, and path/circle/line icons must stay byte-identical.
- When adding an icon, prefer the family's existing primitive set, but the sprite must not
  assume path-only geometry — `<rect>`-framed icons (image/camera) are now first-class.
