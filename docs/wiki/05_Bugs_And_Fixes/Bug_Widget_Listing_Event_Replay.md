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
  - listing
  - lifecycle
  - ikas-events
related:
  - "[[Bug_Index]]"
  - "[[Widget_Architecture]]"
  - "[[ADR_0023_Widget_Lifecycle_Gating_Contract]]"
  - "[[Test_Strategy]]"
source_files:
  - "src/widget/core/storefront-context.js"
  - "tests/widget-network-smoke.spec.ts"
  - "tests/widget-harness.ts"
---

# Bug - Widget Listing Event Replay

## Date
2026-05-31

## Status
Fixed

## Area
Storefront widget loader lifecycle for ikas `VIEW_LISTING` / `VIEW_SEARCH_RESULTS` events.

## Symptoms
The lifecycle audit proved one real event-ordering defect:

- If `window.IkasEvents.subscribe()` synchronously emitted a listing/search event before `loader.js` registered `onListingView()`, the listing product context was mapped but no listing surface mount was triggered.
- Product and page contexts already had late-subscriber replay, so synchronous `PRODUCT_VIEW` and `PAGE_VIEW` were safe. Listing/search was the only context without the same protection.
- On a listing page with no later `PAGE_VIEW`, badges waited for the 2-second DOM fallback and could fall back to `/api/public/ratings-by-slug` instead of the canonical product-id `/api/public/ratings` path.

The same audit confirmed these related paths were already correct:

- Duplicate product contexts stay idempotent across PDP badge, review section, and structured-data surfaces.
- Product-page `PAGE_VIEW` may load the listing entry chunk, but it does not call `/api/public/ratings-by-slug` or insert listing DOM on PDP markup.
- Listing event ordering remains DOM-idempotent when product data arrives before or after `PAGE_VIEW`.
- Unsupported-theme and badge-disabled listing flows stop before rating fetches and DOM insertion.

## Root Cause
`src/widget/core/storefront-context.js` stored `latestProduct` and `latestPage` and replayed them to late subscribers, but `onListingView()` only appended the callback. Synchronous listing/search events emitted during `initStorefrontContext()` could therefore run before the loader subscribed and be lost as a mount trigger.

## Fix
- Added `latestListing` to `storefront-context.js`.
- `emitListingView()` now stores the latest listing/search context.
- `onListingView()` now replays that context to late subscribers, matching the product/page contract.
- Extended the widget harness with test-only ikas event sequencing controls, including synchronous subscribe delivery.
- Added network smoke coverage for listing replay, PDP/listing side-effect boundaries, duplicate product idempotency, listing event ordering, and fail-closed listing gates.

## Verification
Failing proof before the fix:

```bash
pnpm exec playwright test --config=playwright.widget.config.ts tests/widget-network-smoke.spec.ts -g "synchronous listing event"
```

Before fix: expected one product-id rating request, received zero within the replay window.

After fix, the lifecycle audit group passed:

```bash
pnpm exec playwright test --config=playwright.widget.config.ts tests/widget-network-smoke.spec.ts -g "duplicate product contexts|product page PAGE_VIEW|synchronous listing event|listing page stays idempotent|unsupported theme listing|badge-disabled listing"
```

Result after fix: 7 passed.

## Prevention
- Storefront context event types that can be emitted before loader subscription must have late-subscriber replay or an explicit reason why replay is unsafe.
- New ikas event sources should be covered with synchronous and delayed delivery tests in the widget network harness.
- Keep product-id listing ratings as the preferred path; slug ratings remain DOM-only fallback.
