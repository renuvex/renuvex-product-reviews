---
type: bug
project: renuvex-product-reviews
status: active
created: 2026-06-01
updated: 2026-06-01
last_verified: 2026-06-01
confidence: high
tags:
  - bug
  - widget
  - lifecycle
  - listing
  - ikas-events
related:
  - "[[Bug_Index]]"
  - "[[Widget_Architecture]]"
  - "[[Widget_Performance]]"
  - "[[ADR_0023_Widget_Lifecycle_Gating_Contract]]"
  - "[[Test_Strategy]]"
source_files:
  - "src/widget/core/storefront-context.js"
  - "src/widget/core/state.js"
  - "tests/widget-network-smoke.spec.ts"
  - "tests/widget-harness.ts"
---

# Bug - Widget PAGE_VIEW Semantic Dedupe

## Date
2026-06-01

## Status
Fixed

## Area
Storefront widget loader lifecycle for ikas `PAGE_VIEW` events.

## Symptoms
The lifecycle follow-up proved a real event-deduplication defect:

- A listing-like page received `PAGE_VIEW PRODUCT` followed by `PAGE_VIEW CATEGORY` 20 ms later.
- The second event represented a different page context, but the widget dropped it because the previous implementation used a global 800 ms timestamp debounce.
- With no `VIEW_LISTING` event in the repro, the listing surface did not start before the 2-second DOM fallback path. The proof test expected one `/api/public/ratings-by-slug` call within 1.5 seconds and received zero.

This did not affect the already-fixed clean-PDP behavior: product pages still should not load the listing entry chunk. The defect was specifically that a real fast page transition could be treated as a duplicate solely because it happened inside the debounce window.

## Root Cause
`src/widget/core/storefront-context.js` stored `ls.lastPageView` in the listing badge state object and ignored any second `PAGE_VIEW` within 800 ms. The debounce key was only time, not page identity. That meant a different `pageType` or route could be suppressed together with true duplicate events.

The ownership was also imprecise: `lastPageView` belonged to storefront event context, not to listing badge render state.

## Fix
- Moved `PAGE_VIEW` dedupe state into `storefront-context.js` as module-local state.
- Built the dedupe key from normalized `pageType` plus the current `window.location.pathname + window.location.search`.
- Kept the 800 ms duplicate window only for the same semantic page key.
- Removed `lastPageView` from `core/state.js` listing badge state.
- Added browser smoke coverage for both sides of the contract:
  - distinct `PAGE_VIEW` transitions inside the debounce window still start listing lifecycle;
  - duplicate same-page `PAGE_VIEW` events inside the debounce window remain idempotent.

## Verification
Failing proof before the fix:

```bash
pnpm exec playwright test --config=playwright.widget.config.ts tests/widget-network-smoke.spec.ts -g "distinct PAGE_VIEW"
```

Before fix: expected one `/api/public/ratings-by-slug` request within the proof window, received zero.

After fix:

```bash
pnpm build:widget
pnpm exec playwright test --config=playwright.widget.config.ts tests/widget-network-smoke.spec.ts -g "distinct PAGE_VIEW|duplicate same-page PAGE_VIEW"
pnpm test:widget-smoke
pnpm test:widget-runtime
pnpm test:widget-interactions
pnpm test:admin-preview
pnpm test:unit
pnpm check:widget-js
pnpm exec tsc --noEmit
pnpm lint
git diff --check
node scripts/wiki-audit.mjs --changed-source-check
```

The targeted pair passed. The widget network smoke suite passed 24/24, runtime smoke passed 16/16, interaction smoke passed 12/12, admin preview smoke passed 2/2, unit tests passed 54/54, and static gates passed. Wiki audit completed with 0 errors and existing warnings only.

## Prevention
- Debounce storefront lifecycle events by semantic identity, not by time alone.
- Keep event-normalization state inside the event-context owner (`storefront-context.js`), not inside surface-specific render state.
- When changing ikas event handling, add paired tests: one for the duplicate that must be suppressed and one for the different context that must pass.
