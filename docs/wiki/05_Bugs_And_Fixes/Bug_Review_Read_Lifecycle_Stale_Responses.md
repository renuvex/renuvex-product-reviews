---
type: bug
project: renuvex-product-reviews
status: active
created: 2026-05-31
updated: 2026-05-31
last_verified: 2026-05-31
confidence: high
tags:
  - bug
  - widget
  - reviews
  - lifecycle
related:
  - "[[Bug_Index]]"
  - "[[Product_Review_Widget]]"
  - "[[Widget_Architecture]]"
  - "[[Test_Strategy]]"
source_files:
  - "src/widget/reviews-section/render.js"
  - "src/widget/core/state.js"
  - "tests/widget-runtime-smoke.spec.ts"
  - "tests/widget-harness.ts"
---

# Bug - Review Read Lifecycle Stale Responses

## Date
2026-05-31

## Status
Fixed

## Area
Storefront widget review read lifecycle: sort, filter, load-more, retry, and active lightbox dataset.

## Symptoms
The audit found three real storefront read-path regressions:

- A slower sort/filter response could render after a newer user selection and overwrite the visible review list.
- A pending load-more request could finish after the user changed sort/filter state and advance `currentPage` for the new active list, so the next load-more skipped page 2 and requested page 3.
- If a load-more response overlapped an already rendered review id, the DOM rendered a duplicate card even though `loadedLightboxReviews` deduped the lightbox dataset.

The same audit also confirmed these paths were already correct:

- Initial review fetch failures render the retryable error state and recover on retry.
- Photo strip data remains independent from sort/filter/load-more and hides when the photo filter is active.
- Card/list/gallery review layouts render only tenant-trusted Cloudinary image URLs.

## Root Cause
- `render.js` async handlers awaited `fetchReviews()` and then mutated state/rendered without proving their response still matched the active user selection.
- Load-more used the current global page before the request, but a stale completion could still call `setCurrentPage(nextPage)` after a later sort/filter had reset the page.
- `state.js` deduped the lightbox dataset, but `render.js` inserted every review returned by the load-more response into the DOM.

## Fix
- Added a module-local monotonically increasing request token in `render.js`. Sort, rating filter, photo filter, retry, and load-more interactions begin a new token and check product/order/page/rating/photo-filter snapshots before rendering or mutating state.
- Added `getNewLoadedLightboxReviews()` in `state.js` so load-more can insert only new ids into the DOM while keeping the canonical loaded lightbox dataset deduped.
- Extended `tests/widget-harness.ts` with a test-only `reviewsGetHandler` for deterministic delayed/error/overlap review responses.
- Added runtime smoke coverage for stale sort responses, stale load-more completion, duplicate load-more ids, retry recovery, photo strip independence, and trusted image rendering across card/list/gallery layouts.

## Verification
Targeted regression command:

```bash
pnpm exec playwright test --config=playwright.widget.config.ts tests/widget-runtime-smoke.spec.ts -g "sort responses|stale load-more|load-more ignores|initial review fetch|photo strip remains|trusted tenant"
```

Result after fix: 8 passed.

## Prevention
- Any future async review read interaction must either reuse the request-token guard or prove it cannot outlive a newer active selection.
- Do not insert load-more response rows directly into DOM without comparing them against the active loaded review collection.
- Keep photo strip as a separate bootstrap dataset; do not couple it back to active list pagination.
