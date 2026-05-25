---
type: bug
project: renuvex-product-reviews
status: active
created: 2026-05-24
updated: 2026-05-24
last_verified: 2026-05-24
confidence: medium
tags:
  - bug
  - widget
  - review-wizard
  - webkit
  - ios
related:
  - "[[Bug_Index]]"
  - "[[Bug_Review_Wizard_Focus_Trap_Accessibility]]"
  - "[[ADR_0011_Widget_Touch_Feedback_And_Focus_Modality]]"
source_files:
  - "src/widget/product-widget/review-form-modal/steps/step-rating.js"
  - "src/widget/product-widget/review-form-modal/index.js"
  - "public/widget.js"
  - "public/widget-runtime/runtime.js"
---

# Bug - Review Wizard WebKit Rating Advance

## Status
Fixed in source. Deploy and real-device Safari retest are still required.

## Symptoms
On a real iPhone 11 Safari test, tapping the first-step review wizard stars could
leave the wizard waiting on the rating step instead of auto-advancing to the
photo step. The same flow was reported as working on newer iPhone 13 / iPhone 17
Safari tests.

## Root Cause
The rating step depended on a delayed `click` path and a one-shot
`canNavigate()` gate. If the 400 ms timer fired while the wizard transition
state was still busy on a slower WebKit device, the rating was selected but
`state.goNext()` was not retried.

The wizard state machine already queues step transitions while animations are
busy, so dropping the navigation request at the step component level was the
fragile part.

## Fix
- Activate rating selection on `pointerdown`, with `touchstart`, `mousedown`,
  keyboard, and `click` fallbacks.
- Store the selected rating immediately and update the star visuals.
- Call `state.goNext()` after a short visual delay without a one-shot
  `canNavigate()` drop. The parent wizard state machine handles queued
  transitions safely.
- Clear the pending advance timer when the step is destroyed.

## Verification
- `node --check src/widget/product-widget/review-form-modal/steps/step-rating.js`
- `pnpm build:widget`
- Local-build browser verification on the live dev storefront:
  - WebKit iPhone 11: tapping the fifth star changed step 1 to step 2.
  - WebKit iPhone 13: tapping the fifth star changed step 1 to step 2.
  - Android Chromium / Pixel 5: tapping the fifth star changed step 1 to step 2.

## Follow-Up
After deploy, repeat the same flow on a physical iPhone 11 Safari device because
headless WebKit did not reproduce the stuck state before the fix.
