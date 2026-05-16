---
type: architecture
project: ikas-review-app
status: active
created: 2026-05-15
updated: 2026-05-16
last_verified: 2026-05-16
confidence: high
tags:
  - architecture
  - widget
  - storefront
  - yotpo
  - ikas
related:
  - "[[Widget_Architecture]]"
  - "[[Storefront_Widget_Overview]]"
  - "[[Yotpo_Protein_Ocean_Widget_Research]]"
  - "[[Ikas_Storefront_Script_Capabilities]]"
  - "[[Widget_Performance]]"
source_files:
  - "src/widget/index.js"
  - "src/widget/core/config.js"
  - "src/widget/product-widget/bootstrap.js"
  - "src/widget/listing-badges/index.js"
  - "src/app/api/public/settings/route.ts"
  - "src/app/api/public/reviews/route.ts"
  - "src/app/api/public/ratings-by-slug/route.ts"
  - "scripts/build-widget.mjs"
  - "public/widget.js"
---

# Yotpo-Style Widget Modular Architecture

## Summary

The target storefront architecture for this project should be a single ikas-injected loader plus multiple lazy widget modules. This matches the Yotpo-style pattern observed on Protein Ocean while keeping the implementation appropriate for ikas and this app's current codebase.

The key decision: ikas can store multiple JavaScript script records, but this project should still own only one storefront loader record per storefront.

## Current Project Baseline

As of the 2026-05-15 audit:

- The project ships one bundled `public/widget.js`.
- The deployed widget response length observed from Vercel was `177763` bytes.
- The deployed widget header was `Cache-Control: public, max-age=0, must-revalidate`.
- The widget parses `publicApiKey` from its own script URL.
- The widget uses `IkasEvents` for `VIEW_LISTING`, `PRODUCT_VIEW`, and `PAGE_VIEW`.
- The widget uses MutationObserver and history patches for SPA-style storefront navigation.
- Product pages and listing badges work on the tested dev store.
- Q&A, popup, carousel, verified buyer, review request emails, CSV, analytics, and localization are not production-complete surfaces.

Current source entry points:

- [src/widget/index.js](src/widget/index.js)
- [src/widget/core/config.js](src/widget/core/config.js)
- [src/widget/product-widget/bootstrap.js](src/widget/product-widget/bootstrap.js)
- [src/widget/listing-badges/index.js](src/widget/listing-badges/index.js)

## Why Change

The current single bundle has accumulated too many responsibilities:

- PDP review widget
- title rating badge
- listing badges
- photo strip
- modal review form
- photo lightbox
- preview mode
- settings cache
- reviews cache
- error forwarding
- theme heuristics

This is still workable, but adding Q&A, gallery, carousel, verified badges, rich snippets, analytics, and review request flows into the same initial bundle would make every storefront page pay for code it may not use.

## Target Runtime Shape

```text
ikas StorefrontJSScript
  -> <script src="https://app.example.com/loader.js?publicApiKey=..." async></script>
      -> load public config
      -> detect page context and placeholders
      -> resolve product identity
      -> register ikas storefront events
      -> mount or lazy-load widget modules
```

## Loader Responsibilities

The loader should stay small and stable:

- parse `publicApiKey` and `API_BASE`
- fetch `/api/public/settings`
- subscribe to `window.IkasEvents`
- patch SPA navigation only as needed
- detect product and listing contexts
- discover declarative placeholders
- load widget modules by registry key
- expose a small debug surface in development/staging only
- report loader-level failures to the existing widget error endpoint

It should not contain full review rendering, Q&A rendering, gallery rendering, large icon registries, or modal implementations.

## Widget Registry

Initial registry candidates:

| Registry key | Purpose | Current equivalent |
|---|---|---|
| `rating-badge` | PDP title rating summary | `product-widget/rating-badge.js` |
| `reviews-main` | PDP summary, filters, reviews, write CTA | `product-widget/render.js` |
| `listing-badge` | collection/search product cards | `listing-badges/*` |
| `review-form` | multi-step review submission modal | `review-form-modal/*` |
| `media-gallery` | photo strip and photo lightbox | `Photo_Strip`, `Product_Review_Lightbox` |
| `questions-answers` | product Q&A | not production-complete |
| `schema` | Product/AggregateRating JSON-LD | `rating-badge.js` today |

## Placeholder Contract

Preferred long-term mount contract:

```html
<div data-ikr-widget="rating-badge" data-ikr-product-id="..."></div>
<div data-ikr-widget="reviews-main" data-ikr-product-id="..."></div>
<div data-ikr-widget="questions-answers" data-ikr-product-id="..."></div>
```

The loader should support placeholders first. If placeholders are absent, it may fall back to theme adapters and heuristics.

## Theme Adapter Contract

Theme adapters should replace scattered selector heuristics with a structured contract:

- `detectProductPage()`
- `getProductId()`
- `getProductName()`
- `getProductSlug()`
- `findTitleMount()`
- `findReviewsMount()`
- `findListingContainers()`
- `findListingTitle(card)`
- `ignoreContainers()`

Adapters can be selected by:

- explicit merchant setting
- known ikas theme id if available
- runtime heuristic fallback

The current Ozy selectors should become one adapter, not the default architecture for every storefront.

## Product Identity Contract

The Protein Ocean Yotpo inspection showed different product identifiers between widget placeholders and raw Product JSON-LD. This project needs a canonical identity contract before building verified review or cross-widget aggregation.

Recommended internal identity fields:

- `storeId`
- `ikasProductId`
- `ikasVariantId`
- `slug`
- `canonicalUrl`
- `externalWidgetProductKey` only if needed for migration or import compatibility

The public write path should not blindly trust client-supplied `productId`, `slug`, or `productName`. It should verify or reconcile these through server-side product data when possible.

## Public API Shape

The target API surface should separate dynamic and static concerns:

- `/api/public/config?publicApiKey=...`
- `/api/public/ratings?storeId=...&productIds=...`
- `/api/public/reviews?storeId=...&productId=...`
- `/api/public/reviews/media?storeId=...&productId=...`
- `/api/public/questions?storeId=...&productId=...`
- `/api/public/schema?storeId=...&productId=...`
- `/api/public/widget-error`

The current endpoints already cover settings, reviews, ratings by slug, upload signing, and widget error forwarding. They need stronger identity, verified review, and anti-abuse contracts before becoming Yotpo-like.

## Cache Strategy

Target cache split:

| Resource | Target cache |
|---|---|
| `loader.js` | short cache or versioned URL during rollout |
| versioned widget modules | long immutable cache |
| public config | short edge cache with stale fallback |
| ratings summary | short edge cache |
| reviews list | short edge cache; moderation-aware invalidation later |
| write endpoints | no-store |
| error endpoint | no-store |

This mirrors the observed Yotpo separation: long-cache static modules, no-store dynamic review APIs.

## ikas Integration

Use one `StorefrontJSScript` per storefront:

```html
<script src="<DEPLOY_URL>/loader.js?publicApiKey=<merchantId>" async></script>
```

Do not create separate ikas script records for `reviews-main`, `rating-badge`, `qa`, and `media-gallery`. ikas can hold multiple script records, but using one loader gives this app one lifecycle owner.

Reference: [[Ikas_Storefront_Script_Capabilities]]

## Migration Path

1. Introduce a loader build alongside the current `widget.js`.
2. Move settings fetch, event subscription, product detection, and module registry into the loader.
3. Split current widget code into modules behind stable registry keys.
4. Keep the current `widget.js` path as a compatibility alias until existing installs are migrated.
5. Add `listStorefrontJSScript` reconciliation before changing destructive script behavior.
6. Add integration smoke checks for listing, PDP, API responses, console, and network.
7. Add product identity verification before marking reviews as verified.

## Non-Goals

- Do not clone Yotpo's enterprise feature scope.
- Do not introduce a frontend framework into storefront runtime without a separate ADR.
- Do not require merchants to edit theme code for the first usable version.
- Do not use multiple ikas script records as the primary widget module mechanism.

## Open Questions

> 2026-05-16 ikas developer feedback partly answers the theme/anchor questions: ikas has **no official stable ids or `data-*` attributes today** for page areas, and **Storefront Events is the supported source of page/product context**. Standard `data-*` attributes are planned (ikas Studio) but not yet broadly available. See [[Ikas_Storefront_Script_Capabilities]] → "ikas Developer Feedback — 2026-05-16".

- Resolved direction: do not treat theme adapters as the primary mechanism — use Storefront Events for context, keep theme-class selectors as a temporary fallback only.
- Can ikas expose a stable storefront theme id at runtime for adapter selection? (No stable mechanism today; revisit when ikas Studio `data-*` attributes ship.)
- Should public config include a `themeAdapter` setting managed from admin?
- Should product identity be normalized on first review submission, on storefront render, or through a background sync?
- How should verified review invitations be sent: webhook-driven order sync, scheduled order scan, or manual merchant action?
- Should AggregateRating JSON-LD be generated server-side, client-side, or both?

## References

- [[Yotpo_Protein_Ocean_Widget_Research]]
- [[Ikas_Storefront_Script_Capabilities]]
- Official ikas Storefronts API: [Storefronts](https://ikas.dev/docs/api/admin-api/storefronts)
- Official ikas Storefront Events docs: [Quick Start](https://builders.ikas.com/docs/storefront-events/quick-start)

## Obsidian Links

- [[Widget_Architecture]]
- [[Storefront_Widget_Overview]]
- [[Widget_Performance]]
- [[Ikas_Widget_Injection_Notes]]
- [[Yotpo]]
