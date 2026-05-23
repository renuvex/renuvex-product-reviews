---
type: context
project: ikas-review-app
status: active
created: 2026-05-13
updated: 2026-05-23
last_verified: 2026-05-23
confidence: high
tags:
  - hot-context
  - project-memory
related:
  - "[[Index]]"
  - "[[Current_Status]]"
  - "[[Project_Overview]]"
  - "[[ADR_0015_Canonical_Product_Identity]]"
  - "[[ADR_0016_Rating_Visual_System]]"
  - "[[ADR_0017_Badge_Architecture]]"
source_files:
  - "package.json"
  - "prisma/schema.prisma"
  - "src/widget/index.js"
  - "src/widget/observer.js"
  - "src/widget/core/link-scope.js"
  - "src/app/api/public/reviews/route.ts"
  - "src/app/api/public/upload/sign/route.ts"
  - "src/app/api/public/upload/register/route.ts"
  - "src/app/api/public/widget-error/route.ts"
  - "src/lib/review-images.ts"
  - "src/app/api/public/ratings/route.ts"
  - "src/app/api/public/ratings-by-slug/route.ts"
  - "src/components/home-page/widgets/widgetDefs.ts"
  - "src/lib/storefront-widget-url.ts"
  - "src/lib/storefront-scripts.ts"
  - "src/lib/storefront-theme.ts"
  - "src/lib/storefront-theme-sync.ts"
  - "src/app/api/admin/storefront-theme/sync/route.ts"
  - "src/app/api/admin/daily-maintenance/route.ts"
  - "src/widget/core/badge.js"
  - "src/widget/core/health.js"
  - "src/widget/themes/current-adapter.js"
  - "src/widget/themes/generic/adapter.js"
  - "src/widget/core/rollout.js"
  - "src/widget/listing-badges/inject.js"
  - "src/widget/product-widget/rating-badge.js"
---

# Hot Context

## Current Focus
- ikas review/rating app: merchant admin, storefront widget, review submission, image upload, moderation, settings preview.
- Current focus: post-deploy storefront/Sentry verification and broader product gaps.

## Must Know
- Source/config/tests/runtime are the source of truth; wiki is routing and memory.
- Prompt procedures live in `09_Prompts`; do not create `08_Prompts`.
- Do not document secrets or real env values. Env names and purposes are acceptable.
- `package.json` pins Next.js `16.2.1`; older generated docs saying Next.js 15 are stale unless re-verified.

## Recent Important Changes
- Widget hardening reference chain: [[Yotpo_Style_Widget_Modular_Architecture]], [[ADR_0013_Modular_Widget_Loader_Architecture]], [[Phase_1_Widget_Runtime_Audit]], [[Phase_2_Widget_Module_Split_Plan]], [[Ikas_Storefront_Events]], [[Ikas_Storefront_Script_Capabilities]].
- 2026-05-17/18: Widget module split, canonical product identity, install backfill via `after()`, non-destructive script lifecycle, public review hardening, rating read rate limits, and live storefront retests landed.
- 2026-05-19: [[ADR_0016_Rating_Visual_System]] implemented. Star icon + color are single-sourced from the `reviews` widget and used by every rating surface.
- 2026-05-20: [[ADR_0017_Badge_Architecture]] shipped. Class-first DOM (`.ikr-rating-badge`, `data-ikr-*`) for all stores; sibling-of-title mount remains dev-store gated. Sizing uses `.ikr-rating-badge` CSS vars from `ensureBadgeTokens`; schema adds mobile/alignment/count controls.
- 2026-05-23: Storefront script records now carry `data-ikr-*` markers, v1 reconciliation reports match/duplicate diagnostics, and badge render paths emit health telemetry plus one-shot self-heal for DOM removal.
- 2026-05-23: Active theme selection uses Admin API `listStorefront.themes[].isMainTheme` plus `mainStorefrontThemeId` fallback. `StoreSettings.storefrontTheme` stores non-sensitive metadata; public settings expose only `runtime.themeAdapterKey/source`. Adapter matching uses stable `themeId` first; merchant-editable theme names are diagnostic/fallback only.
- 2026-05-23: Theme sync is split from script injection. Dashboard/settings now call lightweight `syncStorefrontTheme`; install/manual script repair still updates scripts and theme metadata; cron verifies pending theme changes in batches before promoting them to stable.

## Current Risks / Open Questions
- Phase 3 follow-ups: verify deploy lifecycle/cache, re-measure widget size, and document disabling native theme reviews.
- Theme adapter selection now uses Admin API `listStorefront.themes[].isMainTheme`; no runtime DOM mount-point contract exists yet.
- The 5-minute theme sync cron assumes the Vercel plan supports sub-daily cron frequency; on lower plans, pending verification falls back to the next allowed cron run.
- Structured data injection, review-request emails, CSV import/export, analytics, localization, and test coverage remain documented gaps.

## Read Next
- [[Current_Status]]
- [[Project_Overview]]
- [[Open_Questions]]
- [[Agent_Rules]]
- [[Wiki_Maintenance_Prompt]]
- [[ADR_0015_Canonical_Product_Identity]]
