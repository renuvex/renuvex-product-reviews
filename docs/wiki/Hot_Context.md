---
type: context
project: renuvex-product-reviews
status: active
created: 2026-05-13
updated: 2026-06-15
last_verified: 2026-06-15
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
  - "prisma/schema.prisma"
  - "playwright.widget.config.ts"
  - "vitest.config.ts"
  - "scripts/rebuild-product-review-summaries.mjs"
  - "scripts/audit-legacy-review-media.mjs"
  - "scripts/reconcile-legacy-review-media.mjs"
  - "tests/widget-harness.ts"
  - "tests/widget-network-smoke.spec.ts"
  - "tests/widget-runtime-smoke.spec.ts"
  - "tests/widget-interaction-smoke.spec.ts"
  - "tests/admin-preview-smoke.spec.ts"
  - "tests/unit/public-api-routes.test.ts"
  - "tests/unit/review-summary.test.ts"
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
  - "src/widget/core/registry.js"
  - "src/widget/core/state.js"
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
  - "src/widget/reviews-section/styles/states.js"
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
  - "src/lib/review-summary.ts"
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
- 2026-05-25 to 2026-06-01: Review section became explicit-mount, Shadow DOM isolated, lifecycle-gated, structured-data aware, and backed by layered widget tests.
- 2026-06-01: Widget CSS ownership is split: classic/card layout styles own layout visuals; `reviews-section/styles.js` aggregates shared CSS modules.
- 2026-06-01: `PAGE_VIEW` dedupe is semantic (`pageType + pathname/search`), so distinct fast transitions still run.
- 2026-06-01: Listing badge sibling mount is the default contract. The temporary publicApiKey rollout gate and legacy in-title branch were removed; adapter overrides are the only exception path.
- 2026-06-01: `reviews-section/render.js` uses pure `render/*.js` builders + DI handlers; load-more stays inline for incremental DOM insert.
- 2026-06-01: Wizard close color derives from `formBgColor`; summary popovers, bar a11y/counts, hover gating, and mobile tap shields are pinned by tests.
- 2026-06-06: Review wizard step copy is merchant-editable under `Metin > Yorum Formu`; nested settings stay flat saved keys.
- 2026-06-06: ikas confirmed Storefront Events are not DOM-ready signals and `VIEW_LISTING.productDetails[]` is usable. PDP reviews stay deterministic by replaying only late `reviews-main` mounts and product/path-guarding stale bootstraps.
- 2026-06-06: Public rating/summary aggregates use `ProductReviewSummary`; raw `Review` stays source of truth and `pnpm reviews:summaries:rebuild` repairs it. See [[ADR_0026_Product_Review_Summary_Read_Model]].

- 2026-06-08: Photo reads use `Review.hasImages` + `ReviewMedia`; legacy media reconciliation copied 10 available assets, dropped 30 missing source URLs, and left zero global legacy URLs. See [[Legacy_Review_Media_Reconciliation]].
- 2026-06-08: Review list load-more uses signed cursor/keyset pagination via `data.nextCursor`; legacy `page/limit` remains for compatibility and future numbered pagination. Cursor requests do not use Prisma `skip`; tampered/unsigned/context-mismatched cursors return `400`. `REVIEW_CURSOR_SECRET` is required in server env. See [[ADR_0028_Review_Cursor_Pagination]].
- 2026-06-08: Review-list exact `totalCount` / `totalPages` now come from `ProductReviewSummary` buckets, including `photoRating*Count` for rating+photo filters. `/api/public/reviews` no longer calls raw `Review.count()` on the public read path.
- 2026-06-08: Review media metadata is now staged in `PendingReviewImage` and committed to `ReviewMedia` after signed Cloudinary upload-response verification. Public `images` remains the compatibility contract; additive `media[]` exposes dimensions/format/bytes/thumbnail URL for future layouts. See [[ADR_0029_Review_Media_Metadata]].
- 2026-06-15: Review Video V1 reliability hardening adds transactionally scheduled Stream reconciliation and upload-session expiry jobs, stable mobile preview DOM, adaptive processing polling, and durable offline cancellation intent. The change requires post-deploy Android/iPhone interruption retests before a new 72-hour canary `T0`. See [[ADR_0031_Review_Media_V2_Provider_Agnostic_Video]] and [[Review_Video_Canary_Runbook]].

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
