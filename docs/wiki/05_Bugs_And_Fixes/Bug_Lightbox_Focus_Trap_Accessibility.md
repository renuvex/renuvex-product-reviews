---
type: bug
project: renuvex-product-reviews
status: active
created: 2026-05-11
updated: 2026-05-31
last_verified: 2026-05-31
tags:
  - bug
  - widget
  - lightbox
  - accessibility
related:
  - "[[Bug_Index]]"
  - "[[Product_Review_Lightbox]]"
  - "[[Widget_Architecture]]"
source_files:
  - "src/widget/reviews-section/review-modal.js"
  - "src/widget/reviews-section/lightbox-trigger.js"
  - "src/widget/reviews-section/render.js"
  - "src/widget/review-layouts/card/index.js"
  - "src/widget/review-layouts/list/index.js"
  - "src/widget/review-layouts/gallery/index.js"
  - "src/widget/shared/focus-trap.js"
  - "tests/widget-interaction-smoke.spec.ts"
---

# Bug - Lightbox Focus Escaped To Storefront

## Date
2026-05-11

## Status
Fixed

## Area
Widget, Storefront UX, Accessibility

## Symptoms
When the photo review lightbox was open, pressing `Tab` could move keyboard focus to controls behind the modal in the storefront page.

Example: a user opens a review photo, presses `Tab`, and focus can move to product-page controls behind the overlay instead of staying on lightbox controls.

## Root Cause
- [review-modal.js](src/widget/reviews-section/review-modal.js) listened for `Escape` but did not trap `Tab` / `Shift+Tab`.
- The modal container did not expose dialog semantics (`role="dialog"`, `aria-modal`) to assistive technologies.
- Opening the modal did not move focus into the modal, and closing did not restore the previous focused element.

## Fix
- [review-modal.js](src/widget/reviews-section/review-modal.js) captures the previously focused element before opening, focuses the dialog wrapper after mount, traps `Tab` and `Shift+Tab` inside the overlay, and restores focus on close.
- The lightbox wrapper now exposes `role="dialog"`, `aria-modal="true"`, and an accessible label.
- Lightbox thumbnails are keyboard reachable with `tabIndex=0`, `role="button"`, `Enter`, and `Space` activation.
- [styles.js](src/widget/reviews-section/styles.js) adds visible focus outlines for modal controls.
- [public/widget.js](public/widget.js) was regenerated with `pnpm build:widget`.

## Follow-up (2026-05-31, photo-strip trigger keyboard access)
A wizard + lightbox lifecycle/accessibility audit found a real gap outside the modal shell:
photo-strip thumbnails were clickable `<img>` elements, but unlike card/list/gallery review
images they had no `role="button"`, no `tabindex="0"`, and no `Enter` / `Space` keyboard
activation. A keyboard user could therefore miss the photo-strip lightbox entry point even though
the modal itself trapped focus correctly.

Fix: `src/widget/reviews-section/lightbox-trigger.js` now owns lightbox trigger semantics for
photo elements. Photo-strip thumbnails and card/list/gallery review images all call the same
`wireLightboxTrigger()` helper, so click + keyboard activation, accessible label, and focus
restore use one contract instead of per-layout copies.

Regression test: `tests/widget-interaction-smoke.spec.ts` focuses a photo-strip thumbnail,
asserts `role="button"`, `tabIndex=0`, and the accessible label, opens the lightbox with
`Enter`, closes with `Escape`, and verifies focus returns to the thumbnail.

## Files Changed
- [review-modal.js](src/widget/reviews-section/review-modal.js)
- [lightbox-trigger.js](src/widget/reviews-section/lightbox-trigger.js)
- [render.js](src/widget/reviews-section/render.js)
- [card/index.js](src/widget/review-layouts/card/index.js)
- [list/index.js](src/widget/review-layouts/list/index.js)
- [gallery/index.js](src/widget/review-layouts/gallery/index.js)
- [styles.js](src/widget/reviews-section/styles.js)
- [widget.js](public/widget.js)
- Documentation updates under `docs/wiki`.

## Prevention
- Add browser smoke coverage that opens the lightbox, presses `Tab` repeatedly, and asserts focus remains inside `.renuvex-pr-modal-overlay`.
- Keep photo lightbox triggers wired through `wireLightboxTrigger()`; do not recreate click-only image triggers in individual layouts.
- Include ARIA and focus management in the lightbox review checklist.

## Related Notes
- [[Product_Review_Lightbox]]
- [[Widget_Architecture]]
- [[Bug_Index]]
