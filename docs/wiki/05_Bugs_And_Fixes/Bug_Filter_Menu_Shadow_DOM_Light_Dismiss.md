---
type: bug
project: renuvex-product-reviews
status: active
created: 2026-05-30
updated: 2026-05-30
last_verified: 2026-05-30
confidence: high
tags:
  - bug
  - widget
  - filter-menu
  - shadow-dom
  - light-dismiss
related:
  - "[[Bug_Index]]"
  - "[[Bug_Filter_Menu_WebKit_Tap_Activation]]"
  - "[[ADR_0021_Shadow_DOM_Isolation_Of_Review_Surfaces]]"
  - "[[ADR_0025_Overlay_Shared_Surface_Foundation]]"
source_files:
  - "src/widget/summary-layouts/shared/popover-registry.js"
  - "src/widget/summary-layouts/shared/actions-block.js"
  - "tests/widget-interaction-smoke.spec.ts"
---

# Bug - Filter Menu Shadow DOM Light Dismiss

## Status
Fixed (2026-05-30).

## Area
Review summary filter dropdown (`summary-layouts/shared/`), after the review section moved
into an open Shadow DOM ([[ADR_0021_Shadow_DOM_Isolation_Of_Review_Surfaces]]).

## Symptoms
Reported on the classic review summary, where the filter dropdown opens over the photo strip
("Fotoğraflı Yorumlar"):

1. **Toggle stuck open** — tapping the filter button again did not close the menu.
2. **Click-through** — interacting with / dismissing the open filter menu over the photo strip
   opened a photo-strip thumbnail's lightbox.

Both started after the Shadow DOM isolation work.

## Root Cause
`popover-registry.js` implements light-dismiss with a single `document`-level capture click
listener that decided "inside vs outside" with `event.target`:

```js
if (p.trigger.contains(e.target)) continue;
if (p.element.contains(e.target)) continue;
p.close();
```

The filter button + menu now live inside the review-section **shadow root**. For an event
that originates inside an open shadow root, the document-level `event.target` is
**retargeted to the shadow host** (`#renuvex-reviews`). So `filterWrap.contains(host)` and
`filterMenu.contains(host)` are **always false** → every click (including the trigger and
clicks inside the menu) read as "outside" → `close()` ran on every click.

- **Symptom 1:** re-tapping the trigger → the capture document listener closed the menu, then
  the trigger's own `onclick` (bubble, fires later) saw a closed menu and reopened it → stuck
  open.
- **Symptom 2:** the dismiss/activation click was never swallowed. The filter menu activates
  options on `pointerdown` (deliberately — see [[Bug_Filter_Menu_WebKit_Tap_Activation]]) and
  closes immediately; the trailing `click` then landed on the `.renuvex-pr-photo-strip-thumb`
  underneath → `thumb.onclick` → lightbox. A light-dismiss tap onto a thumbnail did the same.

This is the same class as the other isolation asymmetries (tap-highlight, scroll lock): a
**document-level handler that is not Shadow-DOM aware**.

## Fix
`popover-registry.js`:
- Detect trigger/element membership with **`event.composedPath()`** (which crosses the shadow
  boundary and lists the real inner nodes) instead of `event.target`. Fixes symptom 1.
- **Swallow the dismiss click**: when an outside click closes an *open* popover, call
  `preventDefault()` + `stopPropagation()` so the tap only dismisses and does not also activate
  the element under it. `close()` now returns `wasOpen` so this only fires for a real dismiss.
- **One-shot swallow for pointer activation**: `swallowNextDismissClick()` is armed by
  `actions-block.js` `activateOption` on pointer/touch selection (which closes on
  `pointerdown`), so the trailing `click` cannot fall through to a thumbnail. Auto-disarms
  after 700 ms if no click follows.

`actions-block.js`: `closeFilter()` returns `wasOpen`; `activateOption` calls
`swallowNextDismissClick()` for pointer activations (not keyboard, which has no trailing click).

## Files Changed
- `src/widget/summary-layouts/shared/popover-registry.js`
- `src/widget/summary-layouts/shared/actions-block.js`
- `tests/widget-interaction-smoke.spec.ts` (regression: classic filter toggles on re-tap; an
  outside tap on a photo thumbnail dismisses the menu without opening the lightbox)
- Rebuilt `public/widget.js` + `public/widget-runtime/*`

## Verification
- `pnpm build:widget`, `pnpm test:widget-interactions` (5/5, incl. the new filter test),
  `pnpm test:widget-runtime` (8/8, compact filter unaffected), `pnpm test:unit`,
  `pnpm exec tsc --noEmit`, `pnpm lint`.
- Manual on the live dev storefront: classic summary filter opens over the photo strip,
  re-tap closes, and tapping the photo strip while open only dismisses (no lightbox).

## Prevention
- **Any `document`/`window`-level event handler that targets Shadow-DOM-hosted UI must use
  `event.composedPath()`, never `event.target`** (which retargets to the host). The
  pre-existing focus traps already learned this via `getActiveElementWithin`; light-dismiss is
  the popover analogue.
- Light-dismiss should swallow the dismiss click so it does not double-activate the element
  underneath (especially heavy actions like opening the lightbox).
