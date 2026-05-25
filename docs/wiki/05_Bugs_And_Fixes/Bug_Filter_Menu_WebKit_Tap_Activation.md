---
type: bug
project: renuvex-product-reviews
status: active
created: 2026-05-24
updated: 2026-05-24
last_verified: 2026-05-24
confidence: high
tags:
  - bug
  - widget
  - filter-menu
  - webkit
  - ios
related:
  - "[[Bug_Index]]"
  - "[[Bug_Filter_Menu_Keyboard_Accessibility]]"
  - "[[ADR_0011_Widget_Touch_Feedback_And_Focus_Modality]]"
  - "[[Product_Review_Widget]]"
source_files:
  - "src/widget/summary-layouts/shared/actions-block.js"
  - "src/widget/product-widget/render.js"
  - "public/widget.js"
  - "public/widget-runtime/runtime.js"
---

# Bug - Filter Menu WebKit Tap Activation

## Status
Fixed.

## Symptoms
On iOS Safari / WebKit, tapping a review summary filter option closed the menu
but did not change the review list. Android Chrome changed the list correctly.

Reproduced on the dev product page with the X/Serpingo app installed:

- Android Chromium: tapping `En Yüksek Puan` sent
  `/api/public/reviews?...&orderBy=highest&page=1` and changed the reviews.
- WebKit iPhone emulation: tapping `En Yüksek Puan` closed the menu, but no
  `orderBy=highest` request was sent and the active filter stayed `En Yeni`.
- Dispatching a programmatic `click` on the same WebKit menu item worked, which
  bounded the bug to real tap/focus event ordering rather than review API or
  render logic.

## Root Cause
The filter menu relied on `item.onclick`. The menu also closes on
`.ikr-filter-wrap` `focusout`. On mobile WebKit, tapping a focused menu item can
blur/close the menu before the synthesized `click` reaches the option, so the
visual menu closes but `onSortChange` never runs.

## Fix
- Add a single `activateOption()` path for filter options.
- Activate pointer/touch selection on `pointerdown`, with `touchstart` fallback
  for older engines and `click` as a fallback.
- Keep keyboard activation on `Enter` and `Space`.
- Ignore focusout while an option activation is already in progress.
- Use explicit next state values for sort/filter fetches instead of relying on
  imported live state after setter calls.

## Verification
- `pnpm build:widget`
- `node --check public/widget.js`
- `pnpm exec tsc --noEmit`
- `pnpm lint`
- Live dev-store test with local widget build intercepted over the production
  widget URL:
  - Android Chromium: `En Yüksek Puan`, `En Düşük Puan`, and `Fotoğraflı`
    all sent the expected review requests and changed the rendered list.
  - WebKit iPhone emulation: the same three options sent expected review
    requests and changed the rendered list.

## Prevention
- Treat Android and iOS/WebKit as separate storefront quality gates for custom
  controls.
- For custom menus, do not rely on `click` alone. Use pointer-safe activation,
  keyboard activation, and focusout/light-dismiss guards.
