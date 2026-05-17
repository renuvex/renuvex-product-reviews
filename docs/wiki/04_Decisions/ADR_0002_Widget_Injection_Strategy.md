---
type: decision
project: ikas-review-app
status: active
created: 2026-05-05
updated: 2026-05-17
tags:
  - adr
  - widget
related:
  - "[[Decision_Index]]"
  - "[[Widget_Architecture]]"
  - "[[Ikas_Widget_Injection_Notes]]"
---

# ADR_0002 — Widget Injection Strategy

## Status
Accepted

## Date
2026-05-05 (documenting inherited decision)

## Context
We need a way to render reviews on every product page of every merchant's storefront, across themes we can't pre-test on. ikas exposes a `StorefrontJSScript` API that injects a `<script>` into all storefront pages.

Options:
1. **Single bundled `widget.js` + ikas `StorefrontJSScript` injection** (one script, all use cases)
2. **Multiple smaller bundles** (badge.js, reviews.js, listing.js, ...) loaded per page
3. **Theme app extensions** (if ikas has a structured theme widget API)
4. **Manual snippet** (merchants paste a `<script>` into theme settings)

## Decision
Choose option 1: a single bundled `widget.js` injected via ikas `StorefrontJSScript` mutations. Auto-inject on OAuth install + manual re-inject button in admin.

The script src is `<STOREFRONT_WIDGET_BASE_URL>/widget.js?publicApiKey=<merchantId>` so the bundle reads tenancy from its own URL. `STOREFRONT_WIDGET_BASE_URL` is separate from the app/OAuth URL to keep local admin development from overwriting real storefronts with localhost script URLs.

## Reasoning
- **Zero merchant friction**: install the app → reviews appear. No theme edits required.
- **Single bundle simplifies caching, build, and deployment.** No per-page conditional includes.
- **Tenant identity from script src** — works on any storefront without injecting a global JS variable.
- **Mutation observer in the bundle** handles SPA-style theme nav without re-loading.
- **Idempotent install**: `StoreSettings.storefrontScripts: Json` tracks ikas script ids per storefront so re-installs/updates patch in place.

## Alternatives Considered
- **Multiple bundles** — would reduce per-page bytes but add complexity. Listing pages already use the same bundle and bail out fast if no product cards detected. Defer until measured size becomes a problem.
- **Manual theme snippet** — terrible adoption story; merchants won't reliably edit themes.
- **Theme app extensions** — would be ideal if ikas provides a structured theme widget surface (research [[Ikas_Theme_Limitations]]). Not the current path.
- **CDN-hosted widget** — would improve cache TTL and allow cache-busting via filename versioning. Practical concern: serving from `public/` keeps the deploy simple. Revisit if traffic grows.

## Consequences
- The bundle is in the critical path of every storefront page. **Bundle size matters.** Adding heavy features (lottie, large image libs) is costly.
- Public widget API is a **stable contract** — old `widget.js` versions may persist on storefronts if cache TTLs are long.
- The OAuth callback installs scripts. If ikas API is slow at install, the install still succeeds (try/catch). Merchants may need to use the manual re-inject button.
- DB-tracked script ids (`storefrontScripts`) are required for idempotency. Wiping the table without a cleanup plan could lead to duplicate scripts on storefronts.
- Source no longer calls zero-argument `deleteStorefrontJSScript()`; lifecycle is non-destructive create/update only while ikas public docs and active MCP disagree on delete/list semantics.

## Related Source Files
- [src/widget/index.js](src/widget/index.js)
- [scripts/build-widget.mjs](scripts/build-widget.mjs)
- [public/widget.js](public/widget.js)
- [src/app/api/oauth/callback/ikas/route.ts](src/app/api/oauth/callback/ikas/route.ts)
- [src/app/api/admin/inject-scripts/route.ts](src/app/api/admin/inject-scripts/route.ts)
- [src/lib/storefront-widget-url.ts](src/lib/storefront-widget-url.ts)

## Related Notes
- [[Widget_Architecture]]
- [[Storefront_Widget_Overview]]
- [[Ikas_Widget_Injection_Notes]]
- [[Ikas_Theme_Limitations]]
- [[Caching_And_Performance]]
