---
type: decision
project: renuvex-product-reviews
status: active
created: 2026-05-24
updated: 2026-06-01
last_verified: 2026-06-01
confidence: high
tags:
  - adr
  - widget
  - ikas
  - storefront
  - script-ownership
  - placement
  - resilience
related:
  - "[[Decision_Index]]"
  - "[[ADR_0002_Widget_Injection_Strategy]]"
  - "[[ADR_0013_Modular_Widget_Loader_Architecture]]"
  - "[[ADR_0017_Badge_Architecture]]"
  - "[[Ikas_Storefront_Script_Capabilities]]"
  - "[[Ikas_Widget_Injection_Notes]]"
  - "[[Bug_Widget_Script_Ownership_Conflict]]"
source_files:
  - "src/lib/storefront-widget-url.ts"
  - "src/lib/storefront-scripts.ts"
  - "src/widget/classic-loader.js"
  - "src/widget/core/config.js"
  - "src/widget/core/script-identity.js"
  - "src/widget/core/storefront-context.js"
  - "src/widget/core/health.js"
  - "src/widget/core/slot.js"
  - "src/widget/core/slot-position.js"
  - "src/widget/core/badge.js"
  - "src/widget/core/product-title.js"
  - "src/widget/rating-badge/inject.js"
  - "src/widget/reviews-section/render.js"
  - "src/widget/listing-badges/inject.js"
---

# ADR_0018 - Widget Ownership and Placement Resilience

## Status
Accepted

## Date
2026-05-24

## Context
The dev storefront reproduced a third-party app conflict where this app's
`widget.js` and runtime chunks loaded with `200 OK`, but no review widget or
badge rendered. Browser inspection showed another app loading
`https://social.serpingo.com/widget.js?...` after this app's loader. The
classic loader and runtime config only searched for the last script whose URL
contained `/widget.js`, so they could treat the third-party script as this
app's script, lose `publicApiKey`, and never start the widget.

ikas developer feedback also set the platform boundary:

- uninstall does not currently delete an app's `StorefrontJSScript` records,
  but this is on the roadmap;
- if a previously stored `scriptId` no longer exists, the correct recovery is
  create a new script and update the DB map;
- `isHighPriority` / `order` do not provide a cross-app hard ordering
  guarantee;
- ikas does not currently provide an official storefront slot/conflict
  mechanism for multiple apps rendering under the same product title.

## Decision
Renuvex Product Reviews owns its script and DOM surfaces explicitly.

- The injected script content carries Renuvex ownership markers:
  `data-renuvex-app="product-reviews"` and
  `data-renuvex-store-id="<merchantId>"`.
- The classic loader and ESM runtime only identify this app's script by an
  owned marker or a `widget.js` URL that contains `publicApiKey`. A generic
  `/widget.js` match is not enough.
- `isHighPriority` / `order` are not used as the conflict solution. Runtime
  behavior must be correct regardless of script order.
- Product identity still prefers ikas Storefront Events, but the runtime also
  reads the DOM `#__NEXT_DATA__` script when globals are absent.
- Every rendered storefront surface gets an owned slot wrapper using
  `renuvex-pr-*` classes and `data-renuvex-*` markers.
- The PDP rating badge owns only its own slot position. If another app inserts
  a node between the product title and the Renuvex badge shortly after render,
  the runtime may move the Renuvex slot back directly under the title. It does
  not delete, edit, or move the third-party node.
- Listing surfaces use the same bounded owned-slot position guard. Category,
  home, search, and blog product-block badges go through the shared listing
  module, so a late sibling insert can reanchor only the matching
  Renuvex-owned listing slot.
- PDP title discovery and badge mount decisions are theme-adapter concerns.
  The bounded guard is shared infrastructure; Ozy/Kombos/other themes should
  only provide selectors or a mount point, not copy positioning logic.
- The default conflict policy is "keep and measure": do not delete, move, or
  overwrite another app's DOM. If a theme or third-party widget causes a real
  visual problem, fix placement in the theme adapter or merchant support path.

## Reasoning
This is the durable boundary available on ikas today. Storefront script records
are separate server-side records, but browser runtime conflicts happen after all
apps are loaded into the same page. Because ikas has no official slot contract
and does not guarantee cross-app script order, this app must not depend on
global script names, broad DOM selectors, or load sequencing.

The chosen model matches common ecommerce app practice: own the app loader,
keep app DOM namespaced, avoid editing theme source directly, and make missing
or hidden widgets observable. BigCommerce's Scripts API and Shopify's theme app
extension model both reinforce the same broad direction: apps manage their own
scripts/assets and should avoid fragile theme-code edits when platform-native
slots are not available.

## Alternatives Considered
- **Use script order/high priority to run before X apps** - rejected because
  ikas does not guarantee deterministic ordering across equal-priority app
  scripts, and script order does not solve DOM/CSS conflicts.
- **Automatically move our badge when another app appears under the title** -
  rejected for v1 because false positives would make layout unpredictable.
  Theme adapters can still choose a better slot for a specific theme.
- **Remove or move the other app's DOM** - rejected. It is hostile behavior and
  creates more support risk than it removes.
- **Switch badges to Shadow DOM immediately** - rejected for inline product and
  listing badges because they should inherit theme typography/layout. Shadow DOM
  remains a future option for modal or overlay surfaces.

## Consequences
- A third-party file named `widget.js` can no longer prevent this app from
  reading its own `publicApiKey`.
- Duplicate guards should operate on owned slot markers plus product id/slug,
  not only on broad badge classes.
- The PDP badge has a bounded post-render position guard. This handles normal
  async script timing without creating a permanent DOM fight with another app.
  - Listing/home/search badge placeholders and rendered badges carry slug
    context and use the same bounded guard. Listing placement remains governed
    by [[ADR_0017_Badge_Architecture]]; theme-specific exceptions belong in
    adapter mount-point overrides.
- New PDP theme support should add `findProductTitle()` and, when needed,
  `getProductBadgeMountPoint()` to the adapter. The shared guard then protects
  the returned mount point for the app-owned slot.
- Widget health telemetry distinguishes script ownership failure, DOM removal,
  and visibility/CSS conflicts.
- Theme adapters remain placement-only. Visual tokens and review data logic stay
  outside adapters.
- Branding migration is implemented in [[ADR_0020_Renuvex_Product_Reviews_Namespace_Migration]]:
  Renuvex is the only active namespace; legacy `yorum-paneli` / `ikr-*`
  aliases were removed after the contract phase because there were no real
  merchant installs.

## Related Source Files
- [src/lib/storefront-widget-url.ts](src/lib/storefront-widget-url.ts)
- [src/lib/storefront-scripts.ts](src/lib/storefront-scripts.ts)
- [src/widget/classic-loader.js](src/widget/classic-loader.js)
- [src/widget/core/config.js](src/widget/core/config.js)
- [src/widget/core/script-identity.js](src/widget/core/script-identity.js)
- [src/widget/core/storefront-context.js](src/widget/core/storefront-context.js)
- [src/widget/core/health.js](src/widget/core/health.js)
- [src/widget/core/slot.js](src/widget/core/slot.js)
- [src/widget/core/slot-position.js](src/widget/core/slot-position.js)
- [src/widget/core/badge.js](src/widget/core/badge.js)
- [src/widget/core/product-title.js](src/widget/core/product-title.js)
- [src/widget/rating-badge/inject.js](src/widget/rating-badge/inject.js)
- [src/widget/reviews-section/render.js](src/widget/reviews-section/render.js)
- [src/widget/listing-badges/inject.js](src/widget/listing-badges/inject.js)

## Related Notes
- [[Decision_Index]]
- [[Ikas_Storefront_Script_Capabilities]]
- [[Ikas_Widget_Injection_Notes]]
- [[Bug_Widget_Script_Ownership_Conflict]]
