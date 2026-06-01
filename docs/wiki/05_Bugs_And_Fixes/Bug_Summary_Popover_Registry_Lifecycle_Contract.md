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
  - summary
  - popover
  - lifecycle
related:
  - "[[Bug_Index]]"
  - "[[Bug_Filter_Menu_Shadow_DOM_Light_Dismiss]]"
  - "[[Widget_Architecture]]"
source_files:
  - "src/widget/summary-layouts/shared/popover-registry.js"
  - "src/widget/summary-layouts/shared/actions-block.js"
  - "src/widget/summary-layouts/compact/index.js"
  - "tests/unit/widget-popover-registry.test.ts"
  - "tests/widget-interaction-smoke.spec.ts"
---

# Bug - Summary Popover Registry Lifecycle Contract

## Status
Fixed (2026-06-01).

## Area
Review summary popovers: the shared filter menu and the compact summary panel.

## Symptoms
The issue was a lifecycle/contract bug rather than a frequent visible storefront failure:

1. `actions-block.js` registers a filter popover every full summary re-render but has no
   owner-level teardown point, so detached filter-menu entries could remain in the module-local
   registry after `render.js` replaced the old shadow content.
2. `notifyOpening()` compared entries by registry object identity, but callers passed the
   unregister function returned by `registerPopover()`. The "do not close myself" contract was
   therefore impossible to satisfy by type.
3. `popover-registry.js` expected `close()` to return `true` only when an open popover was
   actually closed. The filter menu did this; the compact panel returned `undefined`, so
   dismiss-swallow decisions were inconsistent.

## Root Cause
`registerPopover()` returned a bare unregister function while `notifyOpening(self)` expected an
internal registry entry object. That split identity model made correct one-at-a-time behavior
implicit and easy to misuse. The filter menu also has no natural teardown callback because
`buildActionsBlock()` is a one-shot DOM producer rebuilt by `render()`; unregistering on dismiss
would remove the still-mounted popover and break future light-dismiss.

## Fix
- `registerPopover()` now returns a handle `{ unregister, notifyOpening }`.
- `handle.notifyOpening()` closes every other live entry by closure-held entry identity, so
  callers no longer pass identity arguments.
- Registry passes purge entries whose popover element is disconnected from the DOM.
- `close()` return semantics are documented and normalized: return `true` only when the call
  closed an open popover.
- The compact summary uses `handle.unregister()` only at its real media-query teardown point.
- The shared filter menu intentionally does not unregister on dismiss; stale entries are
  reclaimed centrally once their DOM is disconnected.

## Verification
- Unit contract coverage in `tests/unit/widget-popover-registry.test.ts` proves
  `notifyOpening()` does not close the active popover and disconnected entries are purged before
  dismiss passes.
- Interaction coverage in `tests/widget-interaction-smoke.spec.ts` proves the filter light-dismiss
  remains correct after a sort-driven summary re-render.

## Prevention
- New summary popovers must use the handle API: `registration.notifyOpening()` on open and
  `registration.unregister()` only at a real teardown point.
- `close()` functions registered with the popover registry must return the `wasOpen` boolean.
- Do not export registry internals for tests; prefer contract/unit tests and behavior-level
  browser tests.
