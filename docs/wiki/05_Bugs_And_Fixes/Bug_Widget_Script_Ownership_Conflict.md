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
  - storefront
  - script-ownership
  - ikas
  - third-party-conflict
related:
  - "[[Bug_Index]]"
  - "[[ADR_0018_Widget_Ownership_And_Placement_Resilience]]"
  - "[[Ikas_Widget_Injection_Notes]]"
source_files:
  - "src/widget/classic-loader.js"
  - "src/widget/core/config.js"
  - "src/widget/core/script-identity.js"
  - "src/widget/core/storefront-context.js"
  - "src/widget/rating-badge/inject.js"
  - "src/widget/listing-badges/inject.js"
---

# Bug - Widget Script Ownership Conflict

## Date
2026-05-24

## Status
Fixed in source; live deploy verification required.

## Area
Widget | ikas API | Storefront

## Symptoms
On `https://dev-mertcopper.ikas.shop/premium-shorts`, a third-party app rendered
its social proof badge below the product title while Renuvex Product Reviews
did not render the PDP rating badge or review widget. Network evidence showed
this app's `widget.js` and ESM runtime chunks loading with `200 OK`, but no
`/api/public/settings`, `/api/public/reviews`, or `/api/public/ratings` calls
from the runtime.

The page also loaded a third-party script named
`https://social.serpingo.com/widget.js?...`.

## Root Cause
The classic loader and runtime config identified the app's script by scanning
for a script URL containing `/widget.js`. When `document.currentScript` was not
available in the ESM runtime path, the scan could pick the third-party
`social.serpingo.com/widget.js` script instead of this app's
`new-ikas-app.vercel.app/widget.js?publicApiKey=<merchantId>` script.

That made `publicApiKey` resolve to `null` and prevented widget startup. This
was not a stale ikas script injection record and not proof that the third-party
app deleted this app's DOM.

## Fix
Script ownership is now explicit:

- injected script content includes both `data-renuvex-*` and legacy
  `data-renuvex-*` markers;
- loader/config script discovery requires an owned marker or
  `publicApiKey=...`;
- product context fallback reads DOM `#__NEXT_DATA__` when ikas Storefront
  Events/globals are absent;
- PDP/listing/review surfaces render inside owned slot wrappers with duplicate
  guards and one-shot self-heal telemetry.

## Files Changed
- [src/lib/storefront-widget-url.ts](src/lib/storefront-widget-url.ts)
- [src/lib/storefront-scripts.ts](src/lib/storefront-scripts.ts)
- [src/widget/classic-loader.js](src/widget/classic-loader.js)
- [src/widget/core/config.js](src/widget/core/config.js)
- [src/widget/core/script-identity.js](src/widget/core/script-identity.js)
- [src/widget/core/storefront-context.js](src/widget/core/storefront-context.js)
- [src/widget/core/health.js](src/widget/core/health.js)
- [src/widget/core/slot.js](src/widget/core/slot.js)
- [src/widget/rating-badge/inject.js](src/widget/rating-badge/inject.js)
- [src/widget/listing-badges/inject.js](src/widget/listing-badges/inject.js)

## Prevention
- Add static fixture checks for two `widget.js` scripts where the third-party
  script appears before and after this app's script.
- Keep script discovery marker-first and `publicApiKey`-required.
- Treat "script 200 but no public settings call" as a runtime ownership/config
  failure before assuming ikas script injection or theme selectors.

## Verification
- Static fixture: with this app's `widget.js?publicApiKey=...` before and after
  `social.serpingo.com/widget.js?m=...`, script discovery selects this app's
  script and rejects the X script alone.
- Build/checks: `pnpm build:widget`, `node --check public/widget.js`,
  `pnpm exec tsc --noEmit`, `pnpm lint`, `git diff --check`, and
  `node scripts/wiki-audit.mjs --changed-source-check`.
- Browser smoke: local build injected into the live dev storefront while the
  Serpingo/X script was present. PDP rendered one owned product badge slot and
  one owned review slot; category rendered owned listing badge slots without
  duplicate slugs.

## Related Notes
- [[Debugging_Notes]]
- [[Recurring_Problems]]
- [[Bug_Index]]
- [[ADR_0018_Widget_Ownership_And_Placement_Resilience]]
