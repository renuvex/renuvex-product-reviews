---
type: bug
project: renuvex-product-reviews
status: active
created: 2026-05-30
updated: 2026-06-11
last_verified: 2026-06-11
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
  - "src/widget/shared/base-reset.js"
  - "src/widget/summary-layouts/shared/bar-chart.js"
  - "src/widget/reviews-section/styles/summary-controls.js"
  - "vercel.json"
  - "tests/unit/widget-popover-registry.test.ts"
  - "tests/unit/widget-asset-cache.test.ts"
  - "tests/widget-interaction-smoke.spec.ts"
  - "tests/widget-runtime-smoke.spec.ts"
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
- **Touch/pen gesture swallow**: `actions-block.js` activates touch/pen selection on
  `pointerdown`, then arms `swallowNextDismissGesture(scope)` so the trailing compat `click`
  cannot fall through to a thumbnail or write button. Auto-disarms after 700 ms if no click
  follows.
- **2026-06-01 follow-up for physical mobile:** the same touch/pen option activation now
  arms `swallowNextDismissGesture(scope)`. Besides swallowing the trailing click, it scopes a
  short-lived `[data-renuvex-pr-dismiss-gesture]` shield to the review shadow content wrapper.
  `base-reset.js` uses that scoped attribute to temporarily neutralize pointer/active state on
  controls exposed under the dismissed menu. This preserves normal ADR_0011 `:active` feedback
  for real taps on "Yorum Yap"; it only blocks same-gesture compat events leaking from the
  filter option tap.
- **2026-06-02 follow-up for compact mobile rating bars:** the gesture shield's pointer block
  stays broad, but the forced `opacity:1!important` reset is no longer applied to
  `.renuvex-pr-bar-row`. Rating bar rows are stateful controls: when a rating filter is active,
  inactive rows intentionally render at `opacity:0.35`. Physical mobile testing showed the
  broader opacity reset made those inactive rows flash back to full opacity while choosing a
  filter option. The shield still blocks pointer/click-through on the rows; it just preserves
  their selected-filter visual state.
- **2026-06-02 deployment follow-up:** Vercel confirmed production was serving commit
  `142707d8` and the new content-hashed runtime, so the remaining post-deploy report was not a
  missed Git/Vercel deployment. Two durable hardening steps were added: inactive filtered bar
  rows now use the explicit `.renuvex-pr-bar-dimmed` CSS state class (`opacity:0.35!important`)
  instead of inline opacity, and stable widget entrypoints (`/widget.js`, `/widget-runtime/runtime.js`)
  revalidate on every reload (`max-age=0, must-revalidate`) while hashed runtime/chunks remain
  immutable. This removes the 5-minute stable-loader client-cache window that could keep an old
  buggy loader/runtime path visible immediately after a bugfix deploy.
- **2026-06-02 desktop follow-up:** desktop mouse option selection no longer activates on
  `pointerdown`. The browser-native mouse path now activates on the normal `click` event, so
  there is no post-render trailing click/shield window that can leave the shared filter button
  temporarily at `pointer-events:none`. Touch and pen keep the `pointerdown` path for WebKit /
  physical-mobile reliability.

`actions-block.js`: `closeFilter()` returns `wasOpen`; `activateOption` calls
`swallowNextDismissGesture()` only for touch/pen pointer activations (not keyboard or desktop
mouse click activation).

## Files Changed
- `src/widget/summary-layouts/shared/popover-registry.js`
- `src/widget/summary-layouts/shared/actions-block.js`
- `src/widget/shared/base-reset.js`
- `tests/unit/widget-popover-registry.test.ts`
- `tests/widget-interaction-smoke.spec.ts` (regression: classic filter toggles on re-tap; an
  outside tap on a photo thumbnail dismisses the menu without opening the lightbox; pointer
  option activation shields the write button from same-gesture press-through)
- `tests/widget-runtime-smoke.spec.ts` (regression: compact mobile rating filter + filter
  option activation keeps inactive bar rows dim while the gesture shield blocks pointers;
  all summary layouts keep desktop mouse filter options on click activation and can reopen the
  filter immediately after a sort render)
- Rebuilt `public/widget.js` + `public/widget-runtime/*`

## Verification
- `pnpm build:widget`, `pnpm test:widget-interactions` (5/5, incl. the new filter test),
  `pnpm test:widget-runtime` (8/8, compact filter unaffected), `pnpm test:unit`,
  `pnpm exec tsc --noEmit`, `pnpm lint`.
- 2026-06-02 compact-mobile follow-up: targeted runtime proof failed before the fix with
  inactive bar row `opacity: 1` while the dismiss shield was armed, then passed after narrowing
  the shield opacity reset (`opacity: 0.35`, `pointer-events: none`).
- 2026-06-11 runtime-test follow-up: the compact-mobile sort-after-rating proof now mirrors the
  real shield lifecycle. It still asserts the armed touch/pen shield keeps dimmed rows at
  `opacity:0.35` and `pointer-events:none`, then dispatches the swallowed trailing click and
  asserts the rows return to `pointer-events:auto` after the shield clears.
- 2026-06-02 deployment follow-up: Vercel MCP showed production deployment
  `dpl_Bn5P63cq5gqR51GZBs9SZjKFVknM` on commit `142707d8` was `READY`; live
  `/widget.js` imported `runtime-P3VKNO5E.js`, and live runtime chunks contained the bar-row
  exclusion. Runtime smoke now also requires dimmed rows to carry `.renuvex-pr-bar-dimmed` and
  computed `opacity:0.35`; unit tests pin the stable-loader no-cache/revalidate contract.
- 2026-06-02 desktop follow-up: the new runtime matrix failed before the source/build update
  across classic, compact, hero, minimal, and split with `shielded:true` and
  `pointer-events:none` after a mouse `pointerdown` on a filter item. After changing mouse
  selection to normal `click` activation and rebuilding the widget, all five layout cases pass
  and can reopen the filter immediately after the sort render.
- Manual on the live dev storefront: classic summary filter opens over the photo strip,
  re-tap closes, and tapping the photo strip while open only dismisses (no lightbox).

## Prevention
- **Any `document`/`window`-level event handler that targets Shadow-DOM-hosted UI must use
  `event.composedPath()`, never `event.target`** (which retargets to the host). The
  pre-existing focus traps already learned this via `getActiveElementWithin`; light-dismiss is
  the popover analogue.
- Light-dismiss should swallow the dismiss click so it does not double-activate the element
  underneath (especially heavy actions like opening the lightbox).
