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
  - "[[Bug_Lightbox_Mobile_Pull_To_Refresh]]"
---

# Bug - Lightbox Mobile Review Switch Scroll State

## Date
2026-05-12

## Status
Fixed

## Area
Widget, Storefront UX, Mobile Lightbox, Scroll State

## Symptoms
After scrolling a long-comment photo review inside the mobile lightbox, switching to a short-comment review can feel locked in Chrome mobile. The short review does not have enough content to create an internal scroll range, so the browser chrome state left by the previous long-review scroll has no obvious gesture path to normalize.

Example: a customer opens a long photo review, scrolls the modal content, then taps next/previous to a short photo review. The short modal content fits the viewport, so dragging vertically does not move the modal and Chrome's URL bar may remain hidden. Switching back to a long review gives the user a scroll range again, and upward scrolling can make the URL bar visible.

## Root Cause
[review-modal.js](src/widget/reviews-section/review-modal.js) reset only `.renuvex-pr-modal-wrap.scrollTop` when switching between reviews. That was too narrow for the three responsive shells:

- mobile/tablet scroll on `.renuvex-pr-modal-wrap`
- desktop text scroll on `.renuvex-pr-modal-right`
- content replacement can settle after the immediate DOM mutation because the left image column and right text panel are rebuilt/updated together

The previous mobile body lock also applied fixed-body locking to all touch/mobile viewports. Android Chrome has native `overscroll-behavior` support, so fixed-body locking there can make browser chrome state feel more static than necessary. iOS/WebKit still needs the fixed-body strategy.

## Fix
[review-modal.js](src/widget/reviews-section/review-modal.js) now normalizes review-switch scroll state through one helper:

- resets `.renuvex-pr-modal-wrap`
- resets `.renuvex-pr-modal-right`
- resets `.renuvex-pr-modal-scroll-content`
- moves focus back to the dialog wrapper with `preventScroll`
- repeats the reset after layout settles via `requestAnimationFrame`

The body lock strategy is also platform-aware:

- Android/modern Chrome keeps root/body overflow and `overscroll-behavior-y:none` locking without fixed-body positioning
- iOS/WebKit keeps fixed-body locking with scroll-position restore, because that platform still needs it for reliable background scroll containment

This keeps short reviews non-scrollable when they genuinely fit, while avoiding stale scroll state from a previous long review.

## Files Changed
- [review-modal.js](src/widget/reviews-section/review-modal.js)
- [widget.js](public/widget.js)
- [Product_Review_Lightbox.md](docs/wiki/08_Widgets/Product_Review_Lightbox.md)
- [Bug_Index.md](docs/wiki/05_Bugs_And_Fixes/Bug_Index.md)
- [Solved_Issues.md](docs/wiki/05_Bugs_And_Fixes/Solved_Issues.md)

## Prevention
- Mobile lightbox QA should switch long-comment to short-comment and short-comment to long-comment without closing the modal.
- Review-switch handlers should normalize every active scroll container, not only the container used by one breakpoint.
- Android Chrome and iOS Safari should be tested separately because their root overscroll and browser chrome behavior differ.

## Related Notes
- [[Product_Review_Lightbox]]
- [[Bug_Lightbox_Mobile_Pull_To_Refresh]]
- [[Bug_Lightbox_Tablet_Viewport_And_Scroll]]
- [[Bug_Index]]
