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
  - "src/widget/classic-loader.js"
  - "src/widget/index.js"
  - "src/widget/loader.js"
  - "src/widget/core/lazy-modules.js"
  - "src/widget/core/registry.js"
  - "src/widget/core/settings.js"
  - "src/widget/core/storefront-context.js"
  - "src/widget/core/state.js"
  - "src/widget/surfaces/index.js"
  - "src/widget/surfaces/reviews-main.surface.js"
  - "src/widget/surfaces/listing-badge.surface.js"
  - "src/widget/product-widget/render.js"
  - "src/widget/product-widget/rating-badge.js"
  - "src/widget/listing-badges/index.js"
  - "src/widget/listing-badges/inject.js"
  - "src/widget/themes/current-adapter.js"
  - "src/widget/themes/ozy/adapter.js"
  - "src/widget/themes/ozy/theme.js"
  - "public/widget.js"
  - "public/widget-runtime/build-manifest.json"
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

## Implementation Snapshot - 2026-05-17

Status: implementation started; build/static module-boundary checks passed.
Phase 2 is still not complete until the live dev-store browser and Sentry checks
in the done criteria pass.

Implemented:
- `public/widget.js` is now a small classic compatibility loader built from
  `src/widget/classic-loader.js`; it keeps the existing
  `widget.js?publicApiKey=...` ikas script URL and imports the ESM runtime from
  the same origin.
- `scripts/build-widget.mjs` now builds both the classic loader and an ESM
  runtime with esbuild `format: "esm"`, `splitting: true`, and `outdir`.
  `public/widget-runtime/build-manifest.json` records output bytes and import
  kinds (`import-statement` vs `dynamic-import`).
- `src/widget/core/lazy-modules.js` is the only lazy-load boundary owner for
  `reviews-main`, `listing-badge`, and preview render.
- `core/registry.js` now accepts async `mount()` results and isolates rejected
  lazy imports per surface.
- `core/storefront-context.js` now emits listing callbacks for both verified
  `VIEW_LISTING` and search `VIEW_SEARCH_RESULTS` product arrays.
- Settings fetch/cache moved to `core/settings.js` so the listing badge chunk can
  fetch settings without pulling in the full PDP review widget.
- Ozy listing placement rules moved behind `themes/ozy/adapter.js` and
  `themes/current-adapter.js`; this is still a fallback adapter, not an ikas-wide
  DOM contract.
- Runtime error reporting now recognizes `/widget-runtime/` chunk failures.

Build evidence from `pnpm build:widget`:
- Classic loader: `public/widget.js`, about 1.6 KB.
- ESM runtime entry: `public/widget-runtime/runtime.js`, about 9.6 KB.
- Runtime manifest has 2 static imports and 3 dynamic imports from the runtime
  entry: product bootstrap, listing badges, and preview/product render.
- Listing badge chunk imports only shared core/theme chunks; it does not import
  the product-widget bootstrap/render entry chunks.

Checks run:
- `pnpm build:widget` passed.
- Manifest assertion script passed: runtime entry, listing chunk, bootstrap chunk,
  render chunk, and dynamic import boundaries present.
- `git diff --check` passed.
- `pnpm lint` is currently not usable with this repo's Next.js 16 script because
  `next lint` treats `lint` as a project directory. Scoped fallback
  `pnpm exec eslint <changed widget/build files>` passed.

Still required before marking Phase 2 done:
- Deploy/use the new `public/widget.js` and chunks on `https://dev-mertcopper.ikas.shop/`.
- Run the full browser checklist below, including network proof that pages load
  only the expected lazy chunks.
- Run the Sentry post-test check for `source:widget`, `widget.js`,
  `/widget-runtime/`, `/api/public/widget-error`, and `/api/public/*`.

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
