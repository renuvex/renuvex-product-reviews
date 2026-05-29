---
type: decision
project: renuvex-product-reviews
status: active
created: 2026-05-27
updated: 2026-05-29
last_verified: 2026-05-29
confidence: high
tags:
  - adr
  - widget
  - lifecycle
  - lazy-loading
  - contract
related:
  - "[[Decision_Index]]"
  - "[[ADR_0013_Modular_Widget_Loader_Architecture]]"
  - "[[ADR_0017_Badge_Architecture]]"
  - "[[ADR_0021_Shadow_DOM_Isolation_Of_Review_Surfaces]]"
  - "[[ADR_0022_Placement_Allowlist_And_Lazy_Resync]]"
  - "[[Widget_Architecture]]"
  - "[[CSS_Variable_Surface]]"
  - "[[Test_Strategy]]"
source_files:
  - "src/widget/index.js"
  - "src/widget/loader.js"
  - "src/widget/core/registry.js"
  - "src/widget/core/lazy-modules.js"
  - "src/widget/surfaces/index.js"
  - "src/widget/surfaces/rating-badge.surface.js"
  - "src/widget/surfaces/structured-data.surface.js"
  - "src/widget/surfaces/reviews-main.surface.js"
  - "src/widget/surfaces/listing-badge.surface.js"
  - "src/widget/rating-badge/index.js"
  - "src/widget/rating-badge/inject.js"
  - "src/widget/structured-data/index.js"
  - "src/widget/structured-data/jsonld.js"
  - "src/widget/core/rating-summary.js"
  - "src/widget/reviews-section/bootstrap.js"
  - "src/widget/reviews-section/render.js"
  - "src/widget/listing-badges/index.js"
  - "src/widget/listing-badges/inject.js"
  - "src/widget/themes/current-adapter.js"
  - "tests/widget-network-smoke.spec.ts"
  - "tests/widget-runtime-smoke.spec.ts"
  - "tests/widget-interaction-smoke.spec.ts"
  - "tests/admin-preview-smoke.spec.ts"
  - "tests/unit/storefront-theme.test.ts"
  - "playwright.widget.config.ts"
  - "vitest.config.ts"
  - ".github/workflows/widget-smoke.yml"
---

# ADR 0023: Widget Lifecycle Gating Contract

## Status
Accepted (2026-05-27).

## Context
The widget today supports two storefront surface concerns: the review section (PDP) and the rating badges (PDP + listing + modal). The roadmap adds at least four more: FAQ, carousel, popup, and Q&A (already scaffolded as `WidgetDef` ids). Each new widget will face the same questions:

- When does its lazy chunk get downloaded?
- What stops it from running when the merchant disabled it in admin?
- What stops it from running on a theme we have not adapted yet (ADR_0022)?
- What stops it from rendering when the merchant has not placed a mount point?
- Where do enable / disable telemetry and observability live?

Today the answers are scattered across `bootstrap.js`, `render.js`, `rating-badge.js`, `listing-badges/index.js`, and `surfaces/*.surface.js`. Each new widget could re-invent gating differently, drift from the established pattern, or skip a layer. Without a written contract, the cost of inconsistency grows linearly with widget count.

[[ADR_0013_Modular_Widget_Loader_Architecture]] established the loader / surface registry / lazy-module split in Phase 2 but did not specify gating semantics. [[ADR_0022_Placement_Allowlist_And_Lazy_Resync]] added the `autoPlacementEnabled` / `reviewsMountEnabled` runtime flags but only wired them into the two existing badge / review code paths. This ADR codifies the gating contract so the next widget (FAQ, carousel, …) is a straightforward checklist exercise, not an architectural rediscovery.

## Decision

Every widget surface follows the same three-layer gating model. The layers are ordered from "always runs" to "actually renders":

### Layer 1 — Always-load bootstrap
- `widget.js` (2.4 KB loader) is injected via ikas `StorefrontJSScript` on every storefront page. It cannot be conditional — there is no per-page server-side decision available to ikas.
- The ESM runtime chunk (`runtime-*.js`, ~10 KB) loads after `widget.js` and contains: surface registry (`core/registry.js`), the lazy-module dispatcher (`core/lazy-modules.js`), Storefront Events context (`core/storefront-context.js`), the always-on mutation observer (`observer.js`), settings fetch + caching (`core/settings.js`), and the theme adapter dispatcher (`themes/current-adapter.js`).
- These two together are the **minimum cost of having Renuvex installed**: ~12 KB transferred (gzipped, cached aggressively after first load). They run on every page regardless of widget enable state or theme support.

### Layer 2 — Context-driven entry chunks
- Each widget registers a lightweight surface descriptor in `core/registry.js` via `surfaces/<surface>.surface.js`. The descriptor has `detect(ctx)` (sync) and `mount(ctx)` (returns a promise).
- `detect(ctx)` answers: "did the right Storefront Event fire for me?" (e.g. `ctx.trigger === 'product'` for review section, `ctx.trigger === 'page' || ctx.trigger === 'listing-products'` for listing badges).
- `mount(ctx)` calls `loadXxxModule()` from `core/lazy-modules.js`, which dynamic-imports the entry chunk (e.g. `bootstrap.js` for review section, `listing-badges/index.js` for listing badges).
- **The entry chunk download happens here, regardless of widget enable state.** Surface descriptors deliberately do not check `widgets.<id>.enabled` because settings would have to be pre-fetched at init time, and that trades one network request (settings) for another (chunk) without saving anything on the enabled path. ~10-15 KB per entry chunk is the accepted cost.

### Layer 3 — Settings + capability gates at chunk entry
- Once the entry chunk loads, the FIRST async step inside the entry function is `await fetchSettings()` (cached in browser).
- After settings are in hand, the entry function checks gates in this order:
  1. `widgets.<id>.enabled === false` → early return. No heavy work, no further chunk loads, no API calls.
  2. `isAutoPlacementEnabled()` (ADR_0022) → early return if this widget needs DOM-heuristic placement. Reviews section is opt-in via `<div data-renuvex-widget="reviews">` so it does not gate here; badges and any future auto-placed surface MUST gate here.
  3. `isReviewsMountEnabled()` / explicit mount selector → for opt-in surfaces, this is the final "is there a place to render?" gate. Reviews use `findReviewsMount()` (defended by `isReviewsMountEnabled()`); future opt-in widgets follow the same pattern.

### What gets saved by each layer

| Surface | Disabled in admin (`enabled=false`) | Unsupported theme (`autoPlacementEnabled=false`) | No mount (opt-in surfaces only) |
|---|---|---|---|
| Review section (PDP) | render.js chunk, BIG content chunk (~158 KB), `/api/public/reviews` request, Shadow DOM creation | n/a (review section is opt-in, not auto-placed) | bootstrap returns before reviews/photoStrip fetch and render chunk load |
| PDP rating badge | `/api/public/ratings` request, title selector queries, badge mount | Same as disabled (ADR_0022 gate is at the rating-badge entry and inject layers) | n/a (auto-placed) |
| Structured data | `/api/public/ratings` request, JSON-LD inject, visible-surface wait | Can still render if an explicit review mount renders visible rating content; without a visible/expected rating surface it returns early | no JSON-LD unless another visible/expected rating surface exists |
| Listing badges | `/api/public/ratings` request, `collectProductTargets()` DOM walk, all badge placeholders + slots | Same as disabled (ADR_0022 top-level gate added 2026-05-27) | n/a (auto-placed) |
| Modal badge (quick-view) | Same path as listing badge | Same | n/a |

The "wasted" cost when a widget is disabled is the Layer 2 entry chunk download (~10-15 KB), which is small and cached. The big wins — BIG content chunk, API calls, DOM probes — all live in Layer 3 and are reliably gated.

### Telemetry contract
- Each chunk entry function logs **once on enable check** (info or warn level) with the gate decision, e.g. `console.warn('[renuvex-pr] reviews surface gated: enabled=false')`. Sentry captures these as breadcrumbs (zero quota cost, only sent on errors).
- ADR_0022 already added theme-level telemetry (`generic_unknown` log on state transitions). Per-widget enable telemetry follows the same pattern: structured payload, breadcrumb-grade, no event quota.

### Implementation contract for new widgets (FAQ / carousel / popup / Q&A)

When adding a new widget surface, follow this checklist:

1. **Add a lazy-module entry** in `src/widget/core/lazy-modules.js`:
   ```js
   var faqPromise = null;
   export function loadFaqModule() {
     if (!faqPromise) faqPromise = import('../faq/index.js');
     return faqPromise;
   }
   ```

2. **Create a surface descriptor** in `src/widget/surfaces/faq.surface.js`:
   ```js
   import { loadFaqModule } from '../core/lazy-modules.js';
   export var faqSurface = {
     key: 'faq',
     detect: function (ctx) { return ctx.trigger === 'product'; }, // or whatever triggers it
     mount: function (ctx) {
       return loadFaqModule().then(function (mod) { mod.renderFaq(ctx); });
     },
   };
   ```

3. **Register the surface** in `src/widget/surfaces/index.js`:
   ```js
   import { faqSurface } from './faq.surface.js';
   export function registerCoreSurfaces() {
     register(reviewsMainSurface);
     register(listingBadgeSurface);
     register(faqSurface); // <-- new line
   }
   ```

4. **Implement the entry function** in `src/widget/faq/index.js` with the gating order:
   ```js
   import { fetchSettings } from '../core/settings.js';
   import { isAutoPlacementEnabled } from '../themes/current-adapter.js';

   export async function renderFaq(ctx) {
     var response = await fetchSettings();
     if (!response) return;
     var faqSettings = (response.widgets && response.widgets.faq) || {};
     if (faqSettings.enabled === false) return;                     // Settings gate
     if (!isAutoPlacementEnabled()) return;                          // Capability gate (auto-placed widgets only)
     // ... rest of render
   }
   ```

5. **Add the widget id to backend `WidgetDef`** (admin surface registry) and to `getWidgetDefaults` / `sanitizeSettings` in `src/lib/widget-settings.ts` so admin can toggle enable + per-widget options. The `runtime.autoPlacementEnabled` flag is automatically propagated by `buildPublicThemeRuntime` (no per-widget runtime flag needed unless the widget has bespoke capability requirements).

6. **Use Shadow DOM for self-contained surfaces** (review-section-style isolated UI per ADR_0021) or light DOM for inline surfaces (badge-style typography-inheriting per ADR_0017). Decide based on whether the surface needs theme typography inherit or full CSS isolation.

7. **Document new CSS variables** in [[CSS_Variable_Surface]] following the playbook there.

8. **Add a new theme adapter method** to the adapter contract in `themes/current-adapter.js ADAPTER_DEFAULTS` IF this widget needs theme-specific selectors. Update Ozy and generic adapters.

## Reasoning
- **Three-layer model matches what every major review app does** (Yotpo, Okendo, Loox, Stamped, Judge.me): single bootstrap, lazy chunks per surface, settings-driven gating inside. We are converging on the industry pattern, not innovating away from it.
- **The Layer 2 entry chunk download is the right trade-off.** Pre-fetching settings at init to make Layer 2 conditional would: (a) add settings latency to every page even when no widget surface is triggered, (b) require restructuring `loader.js initWidget` to be async, (c) introduce a chicken-and-egg between adapter selection and surface detection. The 10-15 KB per disabled widget per page is paid only on first load (subsequent loads are cached).
- **Layer 3 is where the meaningful savings live.** A disabled review widget saves ~158 KB of content chunk + the `/api/public/reviews` request + Shadow DOM construction. That is where engineering effort should focus.
- **Surface descriptor and entry function are intentionally separate.** The descriptor is light and sync (matches the registry contract); the entry function does all the async / settings / heavy work. New widget authors only have to think about one of the two at a time.
- **Capability gate (ADR_0022) belongs in the entry function, not the descriptor.** Otherwise an enabled-but-unsupported widget would silently not load its chunk and the telemetry signal would never fire. We want the chunk to load, the settings check to pass, and then the capability gate to log "skipped: theme not supported" — that is how unsupported themes get into the telemetry stream.

## Alternatives Considered

- **Pre-fetch settings at init, gate Layer 2 on enable.** Rejected: trades a probably-needed network request (settings is cached) for an avoidable one (chunk is also cached). Adds init complexity. Saves at most ~15 KB on the disabled path while costing latency on the enabled path.
- **Conditional script tag injection at ikas script-tag level.** Not possible: ikas `StorefrontJSScript` is a static script src; there is no server-side per-page rendering hook for us to make per-page decisions.
- **Single monolithic chunk (current widget.js style of the pre-Phase-2 era).** Rejected: was the pre-[[ADR_0013_Modular_Widget_Loader_Architecture]] architecture. Pulled all widget code into every page regardless of need. Phase 2 specifically broke this up; reverting would undo that work.
- **Per-widget runtime flag (`runtime.faqEnabled` etc.).** Considered, deferred. For now `widgets.<id>.enabled` is the universal enable flag (consumed inside the entry function), and `autoPlacementEnabled` covers placement capability for any DOM-heuristic surface. Per-widget runtime flags become necessary only if a widget has bespoke capability requirements (e.g. carousel needs slider container detection).
- **CSS-based hiding (`display: none` on disabled surfaces).** Rejected: wastes JS / network / DOM / API. The whole point is to not pay these costs when the widget is off.

## Consequences
- New widget addition has a single, written checklist. The cost of adding FAQ / carousel / popup / Q&A drops to "follow the checklist" instead of "rediscover the pattern."
- Disabled widgets save the BIG chunks and API requests (Layer 3); the small Layer 2 entry chunk waste is an accepted architectural cost.
- ADR_0022 (placement allowlist) is the canonical capability layer for auto-placed widgets. ADR_0023 ties it into the lifecycle.
- The listing badge surface is brought into compliance: a top-level `isAutoPlacementEnabled()` gate is added in `listing-badges/index.js renderListingBadges()` so the DOM walk + `/api/public/ratings` request do not fire on unsupported themes. Previously the gate was at `reserveBadgeSlots`/`injectBadges` only (inject.js), which let the heavy work run before the gate fired.
- Future widgets that use Shadow DOM (ADR_0021) get the full CSS isolation benefit for free; future light-DOM widgets follow the badge defensive-CSS playbook from the 2026-05-27 audit.
- Per-widget telemetry on gate decisions (planned breadcrumb) gives production visibility into which widgets are most often disabled or unsupported, informing roadmap.
- [[ADR_0024_Badge_Review_Surface_Separation]] retroactively applies this contract to the PDP badge: the badge is now a normal product surface descriptor instead of a special branch inside the review render path.

## Verification
- CI/browser contract: `pnpm test:widget-smoke` exercises the built public loader/runtime shape and asserts the Layer 2 / Layer 3 network outcomes for the main surfaces.
- Broader quality gate: `pnpm test:ci` adds layout/runtime, lightbox/wizard, admin preview/settings, and storefront theme-state tests around this ADR. New surfaces should update the relevant layer in [[Test_Strategy]].
- Manual smoke test per gate:
  - Disable review widget → confirm `render.js` chunk + BIG chunk not in network tab, `/api/public/reviews` not called.
  - Disable badge widget → confirm `/api/public/ratings` not called on category page, no DOM probe.
  - Unsupported theme (any non-Ozy) → confirm same as disabled badge, plus PDP review section still renders if `<div data-renuvex-widget="reviews">` exists.
- New widget addition follows the 8-step checklist above; reviewer sign-off checks against this ADR.
- Wiki audit: `node scripts/wiki-audit.mjs --changed-source-check` passes.
- Build/static: `pnpm build:widget`, `pnpm exec tsc --noEmit`, `pnpm lint`, `git diff --check` pass.

## Related Source Files
- [src/widget/index.js](src/widget/index.js) — entry point (Layer 1 init)
- [src/widget/loader.js](src/widget/loader.js) — `initWidget`, surface registration, event routing
- [src/widget/core/registry.js](src/widget/core/registry.js) — `register` / `mountMatching`
- [src/widget/core/lazy-modules.js](src/widget/core/lazy-modules.js) — `loadXxxModule` lazy dispatch
- [src/widget/surfaces/index.js](src/widget/surfaces/index.js) — `registerCoreSurfaces`
- [src/widget/surfaces/reviews-main.surface.js](src/widget/surfaces/reviews-main.surface.js) — reviews surface descriptor
- [src/widget/surfaces/listing-badge.surface.js](src/widget/surfaces/listing-badge.surface.js) — listing badge surface descriptor
- [src/widget/surfaces/structured-data.surface.js](src/widget/surfaces/structured-data.surface.js) — Product AggregateRating surface descriptor
- [src/widget/reviews-section/bootstrap.js](src/widget/reviews-section/bootstrap.js) — PDP entry function, settings + reviews-enabled gate
- [src/widget/reviews-section/render.js](src/widget/reviews-section/render.js) — review section render and opt-in mount gate
- [src/widget/surfaces/rating-badge.surface.js](src/widget/surfaces/rating-badge.surface.js) — PDP badge surface descriptor
- [src/widget/rating-badge/index.js](src/widget/rating-badge/index.js) — PDP badge entry function, settings/capability gates, ratings fetch
- [src/widget/rating-badge/inject.js](src/widget/rating-badge/inject.js) — PDP badge DOM injection and cleanup
- [src/widget/structured-data/index.js](src/widget/structured-data/index.js) — JSON-LD entry function, settings/visibility gates, rating summary fetch
- [src/widget/structured-data/jsonld.js](src/widget/structured-data/jsonld.js) — Product AggregateRating JSON-LD builder, injection, cleanup
- [src/widget/core/rating-summary.js](src/widget/core/rating-summary.js) — shared one-product rating summary fetch/cache
- [src/widget/listing-badges/index.js](src/widget/listing-badges/index.js) — listing entry function, all-gates
- [src/widget/listing-badges/inject.js](src/widget/listing-badges/inject.js) — defense-in-depth gates at injection points
- [src/widget/themes/current-adapter.js](src/widget/themes/current-adapter.js) — `isAutoPlacementEnabled` / `isReviewsMountEnabled` getters

## Obsidian Links
- [[Decision_Index]]
- [[ADR_0013_Modular_Widget_Loader_Architecture]]
- [[ADR_0017_Badge_Architecture]]
- [[ADR_0021_Shadow_DOM_Isolation_Of_Review_Surfaces]]
- [[ADR_0022_Placement_Allowlist_And_Lazy_Resync]]
- [[Widget_Architecture]]
- [[CSS_Variable_Surface]]
