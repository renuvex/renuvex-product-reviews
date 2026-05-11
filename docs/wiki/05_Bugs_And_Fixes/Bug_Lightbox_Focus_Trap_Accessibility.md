---
type: bug
project: ikas-review-app
status: active
created: 2026-05-11
updated: 2026-05-11
tags:
  - bug
  - widget
  - lightbox
  - accessibility
related:
  - "[[Bug_Index]]"
  - "[[Product_Review_Lightbox]]"
  - "[[Widget_Architecture]]"
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
- [review-modal.js](src/widget/product-widget/review-modal.js) listened for `Escape` but did not trap `Tab` / `Shift+Tab`.
- The modal container did not expose dialog semantics (`role="dialog"`, `aria-modal`) to assistive technologies.
- Opening the modal did not move focus into the modal, and closing did not restore the previous focused element.

## Fix
- [review-modal.js](src/widget/product-widget/review-modal.js) now captures the previously focused element before opening, focuses the first visible modal control after mount, traps `Tab` and `Shift+Tab` inside the overlay, and restores focus on close.
- The lightbox wrapper now exposes `role="dialog"`, `aria-modal="true"`, and an accessible label.
- Lightbox thumbnails are keyboard reachable with `tabIndex=0`, `role="button"`, `Enter`, and `Space` activation.
- [styles.js](src/widget/themes/ozy/styles.js) adds visible focus outlines for modal controls.
- [public/widget.js](public/widget.js) was regenerated with `pnpm build:widget`.

## Files Changed
- [review-modal.js](src/widget/product-widget/review-modal.js)
- [styles.js](src/widget/themes/ozy/styles.js)
- [widget.js](public/widget.js)
- Documentation updates under `docs/wiki`.

## Prevention
- Add browser smoke coverage that opens the lightbox, presses `Tab` repeatedly, and asserts focus remains inside `.ikr-modal-overlay`.
- Include ARIA and focus management in the lightbox review checklist.

## Related Notes
- [[Product_Review_Lightbox]]
- [[Widget_Architecture]]
- [[Bug_Index]]
