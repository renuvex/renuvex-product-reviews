---
type: context
project: ikas-review-app
status: active
created: 2026-05-13
updated: 2026-05-24
last_verified: 2026-05-24
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
  - "[[ADR_0018_Widget_Ownership_And_Placement_Resilience]]"
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
  - "src/widget/classic-loader.js"
  - "src/widget/core/config.js"
  - "src/widget/core/script-identity.js"
  - "src/widget/core/badge.js"
  - "src/widget/core/health.js"
  - "src/widget/core/slot.js"
  - "src/widget/themes/current-adapter.js"
  - "src/widget/themes/generic/adapter.js"
  - "src/widget/core/rollout.js"
  - "src/widget/listing-badges/inject.js"
  - "src/widget/product-widget/rating-badge.js"
---

# Hot Context

## Current Focus
- ikas review/rating app: merchant admin, storefront widget, review submission, image upload, moderation, settings preview.
- Current focus: post-deploy verification and product gaps.

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
- 2026-05-23: Active theme selection uses Admin API `listStorefront.themes[].isMainTheme` plus `mainStorefrontThemeId`; adapter matching uses stable `themeId` before merchant-editable names.
- 2026-05-23: Theme sync is split from script injection. Dashboard/settings call lightweight `syncStorefrontTheme`; install/manual script repair still updates scripts and theme metadata.
- 2026-05-23: Vercel rejected the attempted 5-minute cron on the current plan. `vercel.json` is back to daily 03:00 UTC; true 2-5 minute verification needs Pro/Enterprise cron or QStash.
- 2026-05-24: Vercel docs rechecked: Pro/Enterprise allow once-per-minute cron, Hobby is daily only. On Pro, set `/api/admin/daily-maintenance` back to `*/5 * * * *`; QStash is not required for Pro cron.
- 2026-05-24: [[ADR_0018_Widget_Ownership_And_Placement_Resilience]] records the X-app/Serpingo conflict. Runtime script discovery must be marker-first and `publicApiKey`-required; storefront surfaces use Renuvex/legacy owned slots. ikas has no official slot/conflict mechanism, and `isHighPriority` / `order` is not a hard cross-app ordering guarantee.

## Current Risks / Open Questions
- Phase 3 follow-ups: verify deploy lifecycle/cache, re-measure widget size, and document disabling native theme reviews.
- Theme adapter selection now uses Admin API `listStorefront.themes[].isMainTheme`; no runtime DOM mount-point contract exists yet.
- Current Vercel cron config is daily-compatible. Pending theme verification can lag until the next maintenance run unless the deploy plan supports sub-daily cron or a delayed queue is added.
- Redis already handles public API rate limits. QStash is not installed; add only for Hobby delayed verification or queue retry/dedup/flow-control needs.
- Structured data injection, review-request emails, CSV import/export, analytics, localization, and test coverage remain documented gaps.

## Read Next
- [[Current_Status]]
- [[Project_Overview]]
- [[Open_Questions]]
- [[Agent_Rules]]
- [[Wiki_Maintenance_Prompt]]
- [[ADR_0015_Canonical_Product_Identity]]
