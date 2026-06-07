---
type: bug
project: renuvex-product-reviews
status: active
created: 2026-06-06
updated: 2026-06-06
last_verified: 2026-06-06
confidence: high
tags:
  - widget
  - storefront
  - lifecycle
  - spa-navigation
source_files:
  - "src/widget/loader.js"
  - "src/widget/core/registry.js"
  - "src/widget/core/state.js"
  - "src/widget/core/storefront-context.js"
  - "src/widget/reviews-section/bootstrap.js"
  - "tests/widget-harness.ts"
  - "tests/widget-network-smoke.spec.ts"
related:
  - "[[Bug_Index]]"
  - "[[Widget_Architecture]]"
  - "[[Test_Strategy]]"
  - "[[ADR_0024_Badge_Review_Surface_Separation]]"
  - "[[Ikas_Lifecycle_Mount_Questions]]"
---

# Bug: PDP Review Lifecycle SPA Race

## Status
Fixed on 2026-06-06.

## Symptoms
- On SPA navigation from a storefront home/hero CTA to a PDP, the title rating badge could show approved reviews while the review section below did not render.
- In another timing shape, the review section rendered a write button, a photo strip, and "Henuz yorum yok." even though the current product had reviews.
- A full page refresh recovered because the explicit review mount was already present before the widget product bootstrap ran.

## Root Cause
The review section used a one-shot event-driven mount path. `PRODUCT_VIEW` triggered `reviews-main`, and `reviews-section/bootstrap.js` synchronously checked for `[data-renuvex-widget="reviews"]`. If the SPA committed the product context before the PDP body inserted that explicit mount, bootstrap returned before review/photo-strip fetches and no later code replayed the product context for the newly inserted mount.

A second race existed in the initial bootstrap path. Sort/filter/load-more requests already had stale-response guards, but the initial product bootstrap did not. A slower previous product bootstrap could finish after the current product and write `photoStripReviews` plus call `render(...)`, overwriting the current PDP review widget with stale product data.

## Fix
- `core/registry.js` now exposes a key-targeted surface mount helper so the loader can replay only `reviews-main`.
- `loader.js` watches newly inserted explicit review mounts and replays the latest product context only for `reviews-main`, preserving the lightweight badge-only path.
- `reviews-section/bootstrap.js` uses a module-local bootstrap token plus pathname/current-product guard after every async boundary before state writes or render.
- `core/state.js` exposes a per-product review state reset used only by the current bootstrap.
- The dead base-key review cache write in `storefront-context.js` was removed because it did not match the real suffix-bearing review cache keys.

## Platform Confirmation
Direct ikas developer feedback on 2026-06-06 confirmed this was not a guaranteed platform ordering
case the widget could rely on. Storefront Events are analytics-oriented; `PRODUCT_VIEW` /
`PAGE_VIEW` do not guarantee destination DOM readiness or merchant custom HTML block readiness during
SPA navigation, and there is no official router subscription beyond those events. `VIEW_LISTING` +
`productDetails[]` was confirmed usable for listing pages. See [[Ikas_Lifecycle_Mount_Questions]].

Therefore the defensive architecture used here is still required: product context comes from
Storefront Events, while review injection waits for the explicit mount and stale async bootstrap
results are ignored.

## Prevention
- `tests/widget-network-smoke.spec.ts` now covers late review mount replay, stale product bootstrap overwrite prevention, and the unchanged mount-absent badge-only contract.
- `tests/widget-harness.ts` supports `reviewsMountDelayMs` so SPA mount timing can be reproduced without changing public runtime APIs.
