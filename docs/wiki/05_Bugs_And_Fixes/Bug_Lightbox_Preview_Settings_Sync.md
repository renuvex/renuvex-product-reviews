---
type: bug
project: ikas-review-app
status: active
created: 2026-05-12
updated: 2026-05-12
tags:
  - bug
  - widget
  - lightbox
  - preview
related:
  - "[[Bug_Index]]"
  - "[[Solved_Issues]]"
  - "[[Product_Review_Lightbox]]"
  - "[[Widget_Architecture]]"
---

# Bug - Lightbox Preview Settings Sync

## Date
2026-05-12

## Status
Fixed

## Area
Widget, Preview, Lightbox

## Symptoms
When the admin preview lightbox was open, changing the review icon setting did not reliably update the visible modal icon. The previous targeted fix only re-rendered `.ikr-modal-stars` from a `data-rating` attribute, so other setting-dependent right-pane fields such as `merchantReplyLabel` could still stay stale while the lightbox remained open.

## Root Cause
The photo review lightbox sits outside the normal widget render tree. Preview mode re-rendered the main widget and emitted `IKR_SETTINGS_UPDATED_PREVIEW`, but the open lightbox tried to reconstruct state from DOM attributes instead of keeping the active review in closure state. The event also did not carry the merged settings payload, so listeners could observe stale settings when a render was queued.

## Fix
- [src/widget/index.js](src/widget/index.js) now includes the merged settings in `IKR_SETTINGS_UPDATED_PREVIEW` event detail.
- [src/widget/product-widget/review-modal.js](src/widget/product-widget/review-modal.js) now keeps the active review and active settings in the `openReviewModal` closure. Review/photo navigation threads that state through `rebuildModal`, and settings updates re-render the full right pane through `updateRight`.
- [src/widget/product-widget/review-modal.js](src/widget/product-widget/review-modal.js) updates both stars and `merchantReplyLabel` through `updateRight`, removing the `data-rating` DOM-as-state workaround.
- [src/widget/product-widget/review-form-modal/steps/step-rating.js](src/widget/product-widget/review-form-modal/steps/step-rating.js) also consumes the event detail settings payload to avoid the same stale-settings risk in the submission wizard rating step.

## Files Changed
- [src/widget/index.js](src/widget/index.js)
- [src/widget/product-widget/review-modal.js](src/widget/product-widget/review-modal.js)
- [src/widget/product-widget/review-form-modal/steps/step-rating.js](src/widget/product-widget/review-form-modal/steps/step-rating.js)
- [public/widget.js](public/widget.js)

## Prevention
- Manual preview QA should include: open a photo review lightbox, change review icon, change merchant reply label, navigate to the next review, and repeat a setting change without closing the lightbox.
- Keep open overlay surfaces synchronized from closure state and explicit render/update functions, not DOM attributes.

## Related Notes
- [[Product_Review_Lightbox]]
- [[Widget_Architecture]]
- [[Bug_Index]]
