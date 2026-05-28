---
type: bug
project: renuvex-product-reviews
status: active
created: 2026-05-25
updated: 2026-05-25
last_verified: 2026-05-25
confidence: high
tags:
  - bug
  - widget
  - sentry
  - listing-badge
related:
  - "[[Bug_Index]]"
  - "[[Widget_Architecture]]"
  - "[[Sentry_Operations]]"
  - "[[ADR_0010_Widget_Error_Forwarding]]"
source_files:
  - "src/widget/core/health.js"
  - "src/widget/listing-badges/inject.js"
  - "src/widget/rating-badge/inject.js"
  - "src/widget/reviews-section/render.js"
---

# Bug — Listing badge "missing_after_render" false positive

## Symptom
Sentry issue `RENUVEX-PRODUCT-REVIEWS-6` ("Error: Widget node missing after render") accrued ~93 events in ~26h, dominated by `widgetEventType=dom-conflict`, `reason=missing_after_render`, `surface=listing-badge`, `path=/clothing`, all from the dev store. It is a `handled` health-telemetry event forwarded via `/api/public/widget-error`, not a crash.

## Root cause (proven, not guessed)
The storefront theme (ikas/React hydration) removes the freshly injected badge ~120ms after injection — a **child removal from a surviving parent** (`targetConnected=true`), not a parent-subtree replacement. The bounded one-shot self-heal and/or the widget's re-injection then mounts a **new** badge element, so the badge ends up visually present. But `probeWidgetVisibility` was scheduled at injection time holding a reference to the **original (now-removed)** element; at its 350ms check that stale element is disconnected, so it reports `missing_after_render` even though a healthy badge exists.

Mount mode is irrelevant: an A/B test with `window.RENUVEX_PR_BADGE_MOUNT_LEGACY=true` reproduced the identical remove→re-add cycle and false report under legacy (inside-title) mount, exonerating the ADR_0017 sibling-mount rollout.

User impact: negligible — a sub-frame flicker; the badge renders and stays. The 93 events were almost entirely false-positive telemetry noise.

## Fix
`probeWidgetVisibility` ([src/widget/core/health.js](src/widget/core/health.js)) takes an optional `resolveCurrent()` and evaluates the **live owned node** at probe time, not the captured reference. Every call site passes a resolver (listing badge, listing modal badge, PDP badge, reviews-widget). If a healthy owned node exists, the probe stays quiet; a genuine, un-healed absence still reports. The intentional bounded one-shot self-heal (see [[Widget_Architecture]] — "do not loop against aggressive third-party scripts") was deliberately left unchanged.

## Verification
Playwright against the live dev store with the local build served via request interception (the `window.__RENUVEX_PRODUCT_REVIEWS__` version marker confirmed the local bundle loaded): `missing_after_render` reports dropped from 1/session to **0 across 3 fresh sessions**, with badges still rendering. Before the fix the same harness produced exactly 1 false report per fresh session.

## Not done / follow-up
Reclassifying handled widget health telemetry from `captureException` (error level) to warning-level / per-`reason` fingerprint is a separate Sentry-contract decision — [[ADR_0010_Widget_Error_Forwarding]] notes that added telemetry should ideally get its own endpoint/treatment. Candidate for a future ADR; intentionally not bundled with this fix.
