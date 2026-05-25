---
type: bug
project: renuvex-product-reviews
status: active
created: 2026-05-11
updated: 2026-05-11
tags:
  - bug
  - widget
  - lightbox
  - responsive
  - mobile
related:
  - "[[Bug_Index]]"
  - "[[Product_Review_Lightbox]]"
  - "[[Widget_Architecture]]"
---

# Bug - Lightbox Tablet Viewport And Scroll Containment

## Date
2026-05-11

## Status
Fixed

## Area
Widget, Storefront UX, Responsive Layout, Mobile Browser Compatibility

## Symptoms
The photo review lightbox used the desktop two-column layout above 640 px, while the left image column stayed fixed at 438 px. In the 641-800 px tablet and landscape-phone range, this could leave the text column too narrow.

Example: a 700 px wide tablet viewport opened a photo review. After 16 px overlay padding on each side, the modal content had about 668 px available. The fixed 438 px image column left roughly 230 px for rating, date, title, body text, and reply content, causing cramped text and unstable wrapping.

The mobile shell also used classic `100vh` as the only minimum height. On Android and iOS browsers with dynamic address bars, that unit can be based on a viewport larger than the visible area, so close controls or lower content can be harder to reach while browser chrome is visible.

## Root Cause
- [styles.js](src/widget/themes/ozy/styles.js) switched directly from full mobile layout at `max-width:640px` to desktop layout at `641px`.
- The desktop layout assumes `438px` media width plus a readable right panel; that assumption is not valid until the viewport is about 800 px wide.
- The mobile layout did not include `svh` / `dvh` viewport-unit fallbacks for modern mobile browser chrome behavior.
- Desktop scroll containment was only partial: mobile wrap had `overscroll-behavior: contain`, but desktop text scroll and overlay boundaries did not consistently declare it.

## Fix
- Added a tablet/landscape breakpoint for `641px-800px` in [styles.js](src/widget/themes/ozy/styles.js). This range now uses a stacked lightbox with a capped media area and a full-width text panel.
- Kept the original desktop two-column modal for `801px+`, where the fixed image column still leaves a readable text panel.
- Kept the existing mobile fullscreen shell for `640px` and below, but added `100vh` fallback plus `100svh` and `100dvh` declarations so modern Android and iOS browsers can size the modal against safer/dynamic viewport units.
- Added scroll containment and momentum scrolling declarations to the overlay, desktop right panel, tablet wrapper, and mobile wrapper.
- [public/widget.js](public/widget.js) must be regenerated with `pnpm build:widget` after the source change.

## Files Changed
- [styles.js](src/widget/themes/ozy/styles.js)
- [widget.js](public/widget.js)
- Documentation updates under `docs/wiki`.

## Prevention
- Browser smoke checks should cover at least desktop width, 700 px tablet/landscape width, and a mobile viewport.
- The desktop two-column breakpoint should be based on the modal's required readable content width, not only on a generic mobile threshold.
- Mobile fullscreen shells should use a fallback chain for viewport units when browser chrome can change the visible viewport.

## Related Notes
- [[Product_Review_Lightbox]]
- [[Widget_Architecture]]
- [[Bug_Index]]
