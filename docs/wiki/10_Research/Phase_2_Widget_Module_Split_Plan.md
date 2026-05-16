---
type: research
project: ikas-review-app
status: active
created: 2026-05-17
updated: 2026-05-17
last_verified: 2026-05-17
confidence: medium
tags:
  - research
  - widget
  - phase-2
  - module-split
  - storefront-events
related:
  - "[[ADR_0013_Modular_Widget_Loader_Architecture]]"
  - "[[Phase_1_Widget_Runtime_Audit]]"
  - "[[Yotpo_Style_Widget_Modular_Architecture]]"
  - "[[Ikas_Storefront_Events]]"
  - "[[Listing_Rating_Widget]]"
source_files:
  - "scripts/build-widget.mjs"
  - "src/widget/index.js"
  - "src/widget/loader.js"
  - "src/widget/core/registry.js"
  - "src/widget/core/storefront-context.js"
  - "src/widget/core/state.js"
  - "src/widget/surfaces/index.js"
  - "src/widget/surfaces/reviews-main.surface.js"
  - "src/widget/surfaces/listing-badge.surface.js"
  - "src/widget/product-widget/render.js"
  - "src/widget/product-widget/rating-badge.js"
  - "src/widget/listing-badges/index.js"
  - "src/widget/listing-badges/inject.js"
  - "src/widget/themes/ozy/theme.js"
---

# Phase 2 Widget Module Split Plan

## Goal

Phase 2 turns the Phase 1 in-bundle surface registry into real lazy-loaded
widget modules without breaking the existing ikas script integration.

The current storefront script path, `widget.js?publicApiKey=...`, must remain
compatible. Because esbuild code splitting requires ESM output, Phase 2 should
not simply replace `public/widget.js` with an ESM file unless the ikas injected
script is also proven to load it with `type="module"`. The safer direction is a
small classic compatibility loader at `widget.js` that reads the current script
URL/config and loads the ESM runtime entry/chunks.

Context7 check, 2026-05-17: `/evanw/esbuild` confirms `splitting: true` works
with `format: "esm"` and `outdir`; dynamic `import()` creates lazy chunks.
`outfile`/IIFE is not the physical split path.

## Required Work

1. Build and output model:
- Keep `public/widget.js` as the backward-compatible storefront entry.
- Add an ESM runtime entry and chunk output directory for lazy modules.
- Use esbuild `format: "esm"`, `splitting: true`, and `outdir` for the ESM build.
- Add a metafile or equivalent build report so initial loader size, chunk files,
  and shared chunks are visible during review.
- Keep `publicApiKey` and API base derivation compatible with the existing URL.

2. Runtime module boundaries:
- Keep storefront context, error reporter, config, and route/surface orchestration
  in the always-loaded loader path.
- Lazy-load `reviews-main` only for product-detail contexts.
- Lazy-load `listing-badge` only for listing/search/home surfaces that need it.
- Add `VIEW_SEARCH_RESULTS` handling alongside the verified `VIEW_LISTING`
  payload path; both carry `productDetails[]`.
- Do not make module detection depend on future ikas Studio `data-*` attributes.

3. Surface and state contracts:
- Make the registry capable of async module loading and guarded mount failures.
- Keep shared state explicit; no lazy module should secretly create a second copy
  of `state.js`, caches, config, icon registries, or style injectors.
- Decouple `rating-badge` from the full `render.js` pass before making it an
  independent surface. If aggregate data is still only produced by `render.js`,
  keep it inside `reviews-main` until a shared data service exists.
- Ensure CSS injection remains idempotent per module. The Phase 1
  `#ikr-badge-styles` fix must not regress.

4. Theme adapter fallback:
- Move Ozy listing placement logic into an explicit adapter/fallback contract,
  such as `findListingContainers`, `findListingTitle`, and `ignoreContainers`.
- Treat current allowlist/blocklist rules as verified Ozy seed data, not as an
  ikas-wide theme contract.
- Keep false-positive protection for header/nav/footer/hero/banner/cart/editorial
  and merchant-added sections.

## Phase 2 Done Criteria

Phase 2 is not done until all of these are recorded:

- Build passes and generated files are committed.
- The classic `widget.js?publicApiKey=...` entry still works on the dev store.
- Network inspection proves product pages do not load listing-only code, and
  listing/search pages do not load the full review widget before needed.
- PDP review block, title rating badge, JSON-LD, listing badges, search badges,
  lazy-loaded product sliders, and SPA navigation all pass browser verification.
- No duplicate mounts, duplicate JSON-LD, duplicate rating badges, or stale PDP
  badges after navigation.
- No badge injection in header/nav/footer/hero/banner/cart/editorial or unrelated
  merchant-added sections.
- Browser console and network are clean for `widget.js`, ESM chunks, and
  `/api/public/*` calls.
- Sentry post-test check is clean or any new issue is linked to a bug note.
- The wiki records final module boundaries, chunk files, known limitations, and
  any deferred Phase 3 work.

## Verification Checklist

Run after implementation on `https://dev-mertcopper.ikas.shop/`:

- Cold home entry.
- Cold category entry, including `VIEW_LISTING`.
- Cold search entry, including `VIEW_SEARCH_RESULTS`.
- PDP direct entry.
- PDP -> home/category/search SPA navigation.
- Home/category/search -> PDP SPA navigation.
- Lazy product slider or dynamically inserted product-list node.
- Mobile and desktop viewport spot checks.
- Sentry post-test check for `tags[source]:widget`, `widget.js`, ESM chunk errors,
  `/api/public/widget-error`, and `/api/public/*`.

## Non-Goals

- Do not change ikas StorefrontJSScript lifecycle or destructive cleanup; that is
  Phase 3.
- Do not require merchants to edit theme code.
- Do not add multiple ikas script records per widget module.
- Do not treat Protein Ocean/Yotpo observations as a normative contract.
