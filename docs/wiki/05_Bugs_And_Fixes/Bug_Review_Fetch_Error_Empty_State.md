---
type: bug
project: ikas-review-app
status: active
created: 2026-05-11
updated: 2026-05-11
tags:
  - bug
  - widget
  - reviews
  - error-state
related:
  - "[[Bug_Index]]"
  - "[[Product_Review_Widget]]"
  - "[[Widget_Architecture]]"
---

# Bug - Review Fetch Error Rendered As Empty State

## Date
2026-05-11

## Status
Fixed

## Area
Widget, Public API integration, Storefront UX

## Symptoms
When `/api/public/reviews` or `/api/preview/reviews` failed and no stale cache entry existed, the storefront widget could show the normal empty state (`Henüz yorum yok.`) instead of a loading/error failure.

Load-more failures could also remove the button, making a transient API/network problem look like the end of the review list.

## Root Cause
- [bootstrap.js](src/widget/product-widget/bootstrap.js) returned `null` from `fetchReviews()` for fetch failures when no stale cache existed.
- [render.js](src/widget/product-widget/render.js) normalized `null` to `{}` and then derived `reviews = []`, which is the same branch used for a real empty review list.
- Load-more treated malformed/null review data as terminal and removed the button.

## Fix
- [bootstrap.js](src/widget/product-widget/bootstrap.js) now returns an explicit review fetch error result when fresh and stale review data are both unavailable.
- [render.js](src/widget/product-widget/render.js) detects the error result and renders a retryable error state instead of the empty review state.
- Load-more keeps the button available and changes it to `Tekrar Dene` when the next page fetch fails.
- [styles.js](src/widget/themes/ozy/styles.js) includes dedicated error/retry state styles.
- [public/widget.js](public/widget.js) was regenerated with `pnpm build:widget`.

## Files Changed
- [bootstrap.js](src/widget/product-widget/bootstrap.js)
- [render.js](src/widget/product-widget/render.js)
- [styles.js](src/widget/themes/ozy/styles.js)
- [widget.js](public/widget.js)
- Documentation updates under `docs/wiki`.

## Prevention
- Keep transport/API failure distinct from valid empty-data responses in widget fetch contracts.
- Add a widget smoke test that blocks `/api/public/reviews` or `/api/preview/reviews` and asserts the retryable error state.

## Related Notes
- [[Product_Review_Widget]]
- [[Widget_Architecture]]
- [[Bug_Index]]
