---
type: context
project: renuvex-product-reviews
status: active
created: 2026-05-13
updated: 2026-06-06
last_verified: 2026-06-06
confidence: high
tags:
  - hot-context
  - project-memory
related:
  - "[[Index]]"
  - "[[Current_Status]]"
  - "[[Project_Overview]]"
  - "[[ADR_0021_Shadow_DOM_Isolation_Of_Review_Surfaces]]"
  - "[[ADR_0022_Placement_Allowlist_And_Lazy_Resync]]"
  - "[[ADR_0023_Widget_Lifecycle_Gating_Contract]]"
  - "[[ADR_0024_Badge_Review_Surface_Separation]]"
  - "[[Theme_Adapter_Playbook]]"
  - "[[Test_Strategy]]"
source_files:
  - "package.json"
  - "playwright.widget.config.ts"
  - "vitest.config.ts"
  - "tests/widget-harness.ts"
  - "tests/widget-network-smoke.spec.ts"
  - "tests/widget-runtime-smoke.spec.ts"
  - "tests/widget-interaction-smoke.spec.ts"
  - "tests/admin-preview-smoke.spec.ts"
  - "tests/unit/public-api-routes.test.ts"
  - "tests/unit/storefront-theme.test.ts"
  - "tests/unit/widget-surface-contracts.test.ts"
  - "tests/unit/widget-popover-registry.test.ts"
  - "tests/unit/widget-hover-gating.test.ts"
  - "tests/unit/widget-settings.test.ts"
  - "scripts/check-widget-runtime.mjs"
  - "scripts/measure-deployed-widget-network.mjs"
  - "scripts/verify-deployed-jsonld.mjs"
  - ".github/workflows/widget-smoke.yml"
  - "src/widget/loader.js"
  - "src/widget/observer.js"
  - "src/widget/surfaces/listing-badge.surface.js"
  - "src/widget/core/storefront-context.js"
  - "src/widget/listing-badges/fallback-candidates.js"
  - "src/widget/core/settings.js"
  - "src/widget/core/rating-summary.js"
  - "src/widget/core/product-title.js"
  - "src/widget/rating-badge/index.js"
  - "src/widget/rating-badge/inject.js"
  - "src/widget/structured-data/index.js"
  - "src/widget/structured-data/jsonld.js"
  - "src/widget/reviews-section/bootstrap.js"
  - "src/widget/reviews-section/reviews-api.js"
  - "src/widget/reviews-section/render.js"
  - "src/widget/reviews-section/render/theme-vars.js"
  - "src/widget/reviews-section/render/photo-strip.js"
  - "src/widget/reviews-section/render/handlers.js"
  - "src/widget/reviews-section/render/states.js"
  - "src/widget/reviews-section/render/request-token.js"
  - "src/widget/reviews-section/render/size-presets.js"
  - "src/widget/reviews-section/review-form-modal/copy.js"
  - "src/widget/reviews-section/lightbox-trigger.js"
  - "src/widget/reviews-section/styles.js"
  - "src/widget/reviews-section/styles/base.js"
  - "src/widget/reviews-section/styles/summary-controls.js"
  - "src/widget/reviews-section/styles/review-primitives.js"
  - "src/widget/reviews-section/styles/photo-strip.js"
  - "src/widget/reviews-section/styles/lightbox.js"
  - "src/widget/shared/base-reset.js"
  - "src/widget/summary-layouts/shared/bar-chart.js"
  - "src/widget/summary-layouts/shared/actions-block.js"
  - "src/widget/summary-layouts/shared/popover-registry.js"
  - "src/widget/summary-layouts/classic/styles.js"
  - "src/widget/themes/current-adapter.js"
  - "src/widget/themes/generic/adapter.js"
  - "src/lib/storefront-theme.ts"
  - "src/lib/storefront-theme-sync.ts"
  - "src/app/api/public/settings/route.ts"
  - "src/app/api/public/reviews/route.ts"
  - "src/app/api/public/ratings/route.ts"
  - "src/app/api/public/widget-error/route.ts"
  - "src/components/home-page/widgets/widgetDefs.ts"
  - "src/components/home-page/widgets/editor/SettingsPanel.tsx"
  - "src/lib/widget-settings.ts"
---

# Hot Context

## Current Focus
- ikas review/rating app: admin, storefront widget, badges, uploads, moderation.

## Must Know
- Source/config/tests/runtime win; wiki routes.
- Prompt procedures live in `09_Prompts`; do not create `08_Prompts`.
- Never document secrets.
- `package.json` pins Next.js `16.2.1`; older Next.js 15 docs are stale unless re-verified.

## Recent Important Changes
- 2026-05-25 to 2026-05-29: Review section became explicit-mount, Shadow DOM isolated, lifecycle-gated, independently structured-data aware, and covered by layered widget tests plus post-deploy evidence scripts.
- 2026-05-30: Lightbox/wizard share overlay primitives; widget icons are Phosphor, `iconUseNode` must HTML-parse, and dialog/rating focus behavior is pinned.
- 2026-05-31: Widget audits fixed initial `Shift+Tab`, keyboard photo-strip lightbox triggers, stale review responses, duplicate load-more ids, synchronous listing replay, and clean-PDP listing chunk waste.
- 2026-05-31: Classic/default summary CSS moved to `summary-layouts/classic/styles.js`; card/default review CSS moved to `review-layouts/card/styles.js`.
- 2026-06-01: `reviews-section/styles.js` remains the `CLASSIC_CSS` aggregator; shared CSS ownership moved to `styles/{base,summary-controls,review-primitives,photo-strip,lightbox}.js`.
- 2026-06-01: `PAGE_VIEW` debounce is semantic, not global time-only. `storefront-context.js` dedupes same `pageType + pathname/search` events within 800 ms but lets distinct fast transitions such as `PRODUCT -> CATEGORY` start listing lifecycle immediately.
- 2026-06-01: Listing badge sibling mount is the default contract. The temporary publicApiKey rollout gate and legacy in-title branch were removed; adapter overrides are the only exception path.
- 2026-06-01: `reviews-section/render.js` split into `render/*.js`. Phase 1 extracted pure builders (`theme-vars,size-presets,states,photo-strip,request-token`); Phase 2 extracted the render-rerunning handlers (retry/filter/sort) into `render/handlers.js` `createReviewHandlers({render})` — render injected via DI so no circular import; state read stays live via ESM bindings. render.js 832→407 lines. Load-more stays inline (incremental DOM insert, not a re-render). Behavior-preserving; full widget suite unchanged.

- 2026-06-01: Review wizard close (X) color is derived from `formBgColor`, not `formPrimaryTextColor`. `theme-vars.js` chooses `#111111` or `#ffffff` by contrast and derives hover background from that safe control color; interaction smoke pins the real shadow-DOM close/hover styles.
- 2026-06-01: Summary interaction contract hardened. `popover-registry.js` now returns `{ unregister, notifyOpening }` handles, purges disconnected entries after summary re-renders, and requires registered `close()` functions to return `wasOpen`; bar chart rows expose button semantics (`role=button`, `aria-pressed`, Enter/Space) and bar counts use tabular numbers plus an elastic minimum count column. Unit/runtime/interaction tests pin popover lifecycle, keyboard rating filters, badge/summary isolation, and large localized count rendering.

- 2026-06-01: Decorative review-surface hovers now require `(hover:hover) and (pointer:fine)`; fixes compact-mobile sticky hover on "Yorum Yap". Guard: `tests/unit/widget-hover-gating.test.ts`.
- 2026-06-01: Physical-mobile filter tap follow-up: scoped shield prevents same-gesture compat events pressing exposed "Yorum Yap"; normal ADR_0011 `:active` remains.
- 2026-06-06: Review wizard step copy is merchant-editable under `Metin > Yorum Formu`. `SettingsGroup.subGroups` remains flat saved keys, traversal goes through `collectSettingFields(...)`, and storefront copy uses `review-form-modal/copy.js` + `textContent` with whitespace fallback.

## Current Risks / Open Questions
- Keep live post-deploy smoke after runtime widget changes.
- Theme adapters still depend on Admin API `listStorefront.themes[].isMainTheme`; no ikas theme webhook exists.
- Deferred gaps: unsupported-theme admin warning UI, authenticated ikas dashboard smoke, Sentry post-deploy health.

## Read Next
- [[Current_Status]]
- [[Project_Overview]]
- [[Open_Questions]]
- [[Test_Strategy]]
- [[ADR_0024_Badge_Review_Surface_Separation]]
