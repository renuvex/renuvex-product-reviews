---
type: bug
project: renuvex-product-reviews
status: active
created: 2026-05-12
updated: 2026-05-12
tags:
  - bug
  - widget
  - lightbox
  - mobile
  - scroll
related:
  - "[[Bug_Index]]"
  - "[[Product_Review_Lightbox]]"
  - "[[Widget_Architecture]]"
---

# Bug - Lightbox Mobile Pull To Refresh

## Date
2026-05-12

## Status
Fixed

## Area
Widget, Storefront UX, Mobile Scroll Lock, Photo Review Lightbox

## Symptoms
On mobile Chrome, opening a photo-backed review with a short comment can feel like the lightbox is locked because the modal content does not exceed the viewport and therefore no internal scroll range exists. With a long comment, the lightbox does scroll, but pulling down at the top boundary can sometimes trigger the browser's page refresh gesture.

Example: a user opens a photo review on a product page. For a short comment, the fullscreen lightbox fits inside the viewport, so dragging vertically does not move anything and Chrome's address bar does not collapse or expand like normal page scroll. For a long comment, `.ikr-modal-wrap` becomes scrollable; when the user reaches the top and keeps pulling down, Chrome may route the gesture to the page-level overscroll/pull-to-refresh behavior.

## Root Cause
The short-comment behavior is expected: [styles.js](src/widget/themes/ozy/styles.js) makes the mobile `.ikr-modal-wrap` a fixed fullscreen scroll container. If its content is shorter than `100dvh`, there is nothing to scroll.

The long-comment pull-to-refresh behavior was a real containment gap. [review-modal.js](src/widget/product-widget/review-modal.js) locked only `document.body` with `overflow:hidden`. Mobile Chrome pull-to-refresh is rooted above the modal's internal overflow container, so body overflow alone is not always enough when a fixed modal scroll container reaches its top boundary.

## Fix
[review-modal.js](src/widget/product-widget/review-modal.js) now snapshots and restores a broader root scroll-lock state:

- previous `html` and `body` inline `overflow` / `overscroll-behavior-y`
- previous body `padding-right`
- previous body `position`, `top`, `left`, `right`, and `width`
- current page scroll position

While the lightbox is open:

- `html` and `body` get `overscroll-behavior-y:none`
- `html` and `body` overflow are locked
- iOS/WebKit viewports also use a fixed-body lock with `top:-scrollY`, then restore `window.scrollTo(scrollX, scrollY)` on close

This keeps short comments non-scrollable when they genuinely fit, keeps long comments scrollable inside `.ikr-modal-wrap`, and blocks the page-level pull-to-refresh channel while the lightbox is active.

Follow-up: Android Chrome browser chrome state during long-to-short review switching is tracked separately in [[Bug_Lightbox_Mobile_Review_Switch_Scroll_State]]. Android now relies on root `overscroll-behavior-y:none` without fixed-body positioning, while iOS/WebKit keeps fixed-body locking.

## Files Changed
- [review-modal.js](src/widget/product-widget/review-modal.js)
- [widget.js](public/widget.js)
- [Product_Review_Lightbox.md](docs/wiki/08_Widgets/Product_Review_Lightbox.md)
- [Bug_Index.md](docs/wiki/05_Bugs_And_Fixes/Bug_Index.md)
- [Solved_Issues.md](docs/wiki/05_Bugs_And_Fixes/Solved_Issues.md)

## Prevention
- Mobile lightbox checks should cover both short and long comment content.
- For scroll-lock work, verify that close restores pre-existing inline body/root styles and original scroll position.
- Physical Android Chrome or remote-device verification is still the strongest test for pull-to-refresh because desktop emulation cannot fully reproduce browser chrome gestures.

## Related Notes
- [[Product_Review_Lightbox]]
- [[Bug_Lightbox_Tablet_Viewport_And_Scroll]]
- [[Bug_Review_Detail_Lightbox_Risks]]
- [[Bug_Index]]
