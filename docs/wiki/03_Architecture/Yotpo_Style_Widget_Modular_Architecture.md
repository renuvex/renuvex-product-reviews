---
type: architecture
project: ikas-review-app
status: active
created: 2026-05-15
updated: 2026-05-17
last_verified: 2026-05-17
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
  - "[[Phase_1_Widget_Runtime_Audit]]"
  - "[[Widget_Performance]]"
source_files:
  - "src/app/api/public/settings/route.ts"
  - "src/app/api/public/reviews/route.ts"
  - "src/app/api/public/ratings-by-slug/route.ts"
  - "scripts/build-widget.mjs"
  - "src/widget/classic-loader.js"
  - "src/widget/index.js"
  - "src/widget/core/config.js"
  - "src/widget/core/lazy-modules.js"
  - "src/widget/core/settings.js"
  - "src/widget/product-widget/bootstrap.js"
  - "src/widget/listing-badges/index.js"
  - "src/widget/themes/ozy/adapter.js"
  - "public/widget.js"
  - "public/widget-runtime/build-manifest.json"
---

# Yotpo-Style Widget Modular Architecture

## Summary

The target storefront architecture for this project should be a single ikas-injected loader plus multiple lazy widget modules. This matches the Yotpo-style pattern observed on Protein Ocean while keeping the implementation appropriate for ikas and this app's current codebase.

Protein Ocean is a **read-only benchmark**, not a normative implementation contract. It is one ikas storefront with a mature Yotpo installation and may include one-off merchant/theme/customization choices. Use it to identify useful patterns and questions before Phase 2, but use official ikas docs, ikas MCP introspection, direct ikas developer feedback, and this app's dev-store verification as the sources of truth for product architecture.

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

The current Ozy listing badge allowlist/blocklist is an old safety net, not a
stable cross-theme contract. Phase 2 should treat it as adapter seed material only.
The adapter must make false-positive prevention explicit: menu, footer, cart,
hero/banner, editorial, and merchant-added sections with product-like links should
not receive badges unless they are intentionally product-card surfaces. It must
also keep false negatives visible: new valid product sliders or lazy-loaded
sections may need adapter coverage.

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

## Phased Rollout

The migration is split into three phases. The authoritative phase record is
[[ADR_0013_Modular_Widget_Loader_Architecture]] → "Phased Rollout Status".

Official-alignment note: the plan is directionally aligned with ikas docs and the
2026-05-16 ikas developer answer, but it is not allowed to assume undocumented
runtime details. Runtime Storefront Events payloads and StorefrontJSScript mutation
shape remain explicit gates before later phases. Use
[[Phase_1_Widget_Runtime_Audit]] as the Phase 1 -> Phase 2 evidence checklist.
Context7 may be used for current third-party library docs that shape the test
method or implementation mechanics (Playwright, Sentry, Next.js, build tooling),
but not as the source of truth for ikas event/schema/theme contracts.

### Phase 1 — Internal separation — ✅ Implemented (2026-05-16)

Internal loader + surface registry + single Storefront Events context module. The
build output stays one IIFE `widget.js` — no ESM, no code-splitting, no behavior
change. This makes the physical split (Phase 2) mechanical and low-risk.

Delivered: `src/widget/loader.js`, `core/storefront-context.js`, `core/registry.js`,
`surfaces/*`; `index.js` thinned to a side-effect entry; `events.js` drained to the
SPA history patch + modal badge plumbing; `getProductFromPage` removed from
`bootstrap.js`. Open item: live storefront verification + confirming the real
`VIEW_LISTING` runtime event type ([[Ikas_Storefront_Events]]). Phase 1 should not
be considered fully closed until a dev-store run records the real `PAGE_VIEW`,
`PRODUCT_VIEW`, category listing, and search listing payloads.

Protein Ocean/Yotpo can be re-inspected during Phase 1 closeout as a read-only
benchmark for Phase 2 design, but it must not replace the dev-store Phase 1 test.
Any new observations should be recorded in [[Yotpo_Protein_Ocean_Widget_Research]]
and compared here as "applicable", "not applicable", or "needs ikas confirmation".
If the Phase 1 test method depends on Playwright or Sentry behavior, confirm the
relevant current docs through Context7 and record the checked library id/topic in
[[Phase_1_Widget_Runtime_Audit]].

### Phase 2 — Physical module split — Implemented & verified (2026-05-17)

Detailed implementation and verification checklist: [[Phase_2_Widget_Module_Split_Plan]].

Implemented so far: `public/widget.js` is now the backward-compatible classic
loader and `public/widget-runtime/runtime.js` + `chunks/*` are ESM split outputs.
The runtime keeps one ikas StorefrontJSScript record and lazy-loads
`reviews-main`, `listing-badge`, and preview render through `core/lazy-modules.js`.
`VIEW_SEARCH_RESULTS` is handled beside verified `VIEW_LISTING`. Ozy listing
selectors moved behind `themes/ozy/adapter.js` as fallback seed data.

Phase 2 live dev-store browser verification, network proof of intended lazy chunk
loading, and Sentry post-test checks passed on 2026-05-17. `rating-badge`
remains inside the PDP review/render path until a shared aggregate
data service exists; making it independent now would duplicate fetches or add a
race.

### Phase 3 — Cache, versioning, ikas script lifecycle — Implemented & verified (2026-05-18)

Closeout record: [[Phase_3_Widget_Lifecycle_Hardening]].

Implemented by 2026-05-17 (commit `1700d789`): short-cache loader/shim, immutable
hashed runtime and chunks, non-destructive create/update-only StorefrontJSScript
lifecycle, daily script reconcile for storefronts created after install, stale
`--theme` alias cleanup, and canonical product identity via
[[ADR_0015_Canonical_Product_Identity]]. Active MCP still lacks
`listStorefrontJSScript`, so source intentionally avoids destructive cleanup while
public docs and generated/MCP contracts disagree.

Live dev-store verification on the Ozy theme passed 2026-05-18: `/widget.js` and
hashed runtime cache headers correct, home/category/PDP badge flow working,
`daily-maintenance` cron auth guard verified. Residual operational items:
authenticated cron run after `CRON_SECRET` is set, and deployed transfer-size
re-measurement against the `177763`-byte pre-split baseline.

## Non-Goals

- Do not clone Yotpo's enterprise feature scope.
- Do not treat Protein Ocean's Yotpo setup as a universal ikas app blueprint; it is
  one storefront implementation and may not generalize across merchants.
- Do not introduce a frontend framework into storefront runtime without a separate ADR.
- Do not require merchants to edit theme code for the first usable version.
- Do not use multiple ikas script records as the primary widget module mechanism.

## Open Questions

> 2026-05-16/23 ikas developer feedback partly answers the theme/anchor questions: ikas has **no official stable ids or `data-*` attributes today** for page areas, and **Storefront Events is the supported source of page/product context**. For active theme detection, there is no browser-runtime detector, but Admin API `listStorefront` with nested `themes[].isMainTheme: true` can identify the published theme/storefront context. See [[Ikas_Storefront_Script_Capabilities]] and [[Ikas_Theme_Limitations]].

- Resolved direction: do not treat theme adapters as the primary mechanism — use Storefront Events for context, keep theme-class selectors as a temporary fallback only.
- Active theme adapter selection now uses backend `listStorefront.themes[].isMainTheme` plus `mainStorefrontThemeId` fallback; runtime placement still needs heuristics/placeholders because this is not a DOM mount-point contract.
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

- [[ADR_0013_Modular_Widget_Loader_Architecture]]
- [[Widget_Architecture]]
- [[Storefront_Widget_Overview]]
- [[Widget_Performance]]
- [[Ikas_Widget_Injection_Notes]]
- [[Ikas_Storefront_Events]]
- [[Phase_1_Widget_Runtime_Audit]]
- [[Phase_2_Widget_Module_Split_Plan]]
- [[Phase_3_Widget_Lifecycle_Hardening]]
- [[Yotpo]]
