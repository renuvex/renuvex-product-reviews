---
type: bug
project: renuvex-product-reviews
status: active
created: 2026-07-29
updated: 2026-07-29
last_verified: 2026-07-29
confidence: high
tags:
  - bug
  - widget
  - spa
  - observability
related:
  - "[[Bug_Index]]"
  - "[[Widget_Architecture]]"
  - "[[Sentry_Operations]]"
  - "[[Bug_Listing_Badge_Missing_After_Render]]"
source_files:
  - "src/widget/core/health.js"
  - "src/widget/events.js"
  - "src/widget/reviews-section/render.js"
  - "tests/unit/widget-health.test.ts"
  - "tests/widget-network-smoke.spec.ts"
---

# Bug - Review widget SPA health probe false positive

## Agent Brief

The review widget is intentionally removed when an SPA route changes before the
next product event arrives. A visibility probe scheduled for the previous
product could run during that bounded transition and report
`reviews-widget / missing_after_render`. The product transition itself was
healthy; only the telemetry was wrong.

## Evidence

The full local CI browser pack failed intermittently in
`history route change clears rendered stale reviews before product event
arrives`. Playwright trace evidence identified the failed request as:

```text
POST /api/public/widget-error
message = Widget node missing after render
surface = reviews-widget
reason = missing_after_render
productId = old-product
path = /new-product-route
```

The same test's functional assertions passed: the old review disappeared and
the new product review rendered. The test failed only because the intentional
old-product retirement emitted health telemetry.

The race reproduced both with parallel workers and with one worker. This
separates it from generic browser concurrency noise.

## Root Cause

`cleanupStaleReviewSection()` clears the old review content and marks the
container `data-renuvex-transitioning=true` as soon as the pathname changes.
`probeWidgetVisibility()` runs 350 ms after the old render. Its live-node
resolver can distinguish a replaced element from a stale reference, but it
could not distinguish an unexpected removal from an intentionally retired
product lifecycle.

If the next product rendered before the timer fired, the resolver found a live
widget and stayed quiet. If the timer fired while the transition was still
empty, it sent a false `missing_after_render` report.

## Fix

`probeWidgetVisibility()` now accepts an optional lifecycle-relevance
predicate. The review surface uses it to stop only probes that belong to:

- an active route transition, or
- a previous product after a different product widget has become current.

The shared health module does not contain review-specific route logic. Listing
and PDP badge probes keep their existing contract. A relevant probe with no
live widget still reports `missing_after_render`, so the fix does not silence
genuine DOM removal.

## Verification

- Unit coverage proves an intentionally retired probe sends no beacon.
- Unit coverage also proves a relevant, unexpectedly missing widget still
  sends `missing_after_render`.
- The SPA route regression keeps the transition empty beyond the 350 ms probe
  window and asserts that `/api/public/widget-error` is not called.
- The focused browser scenario passed 20 consecutive runs with one worker.

The generated widget loader and content-hashed runtime artifacts were rebuilt
from the corrected source. Live production/Sentry verification remains a
post-deploy acceptance step; this source-only fix is not yet evidence of live
effectiveness.
