---
type: context
project: renuvex-product-reviews
status: active
created: 2026-05-13
updated: 2026-07-04
last_verified: 2026-07-04
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
  - "[[ADR_0032_Review_Video_On_Mux]]"
  - "[[ADR_0033_Cloudflare_Worker_Widget_Asset_Delivery]]"
  - "[[ADR_0034_AWS_Review_Image_Migration]]"
  - "[[ADR_0035_QStash_Scheduler_For_Maintenance]]"
  - "[[Theme_Adapter_Playbook]]"
  - "[[Test_Strategy]]"
source_files:
  - "package.json"
  - "prisma/schema.prisma"
  - "playwright.widget.config.ts"
  - "vitest.config.ts"
  - "scripts/rebuild-product-review-summaries.mjs"
  - "tests/widget-harness.ts"
  - "tests/widget-network-smoke.spec.ts"
  - "tests/widget-runtime-smoke.spec.ts"
  - "tests/widget-interaction-smoke.spec.ts"
  - "tests/admin-preview-smoke.spec.ts"
  - "tests/unit/public-api-routes.test.ts"
  - "tests/unit/video-upload-routes.test.ts"
  - "tests/unit/media-jobs.test.ts"
  - "tests/unit/media-route-contracts.test.ts"
  - "tests/unit/review-summary.test.ts"
  - "tests/unit/storefront-theme.test.ts"
  - "tests/unit/widget-surface-contracts.test.ts"
  - "tests/unit/widget-popover-registry.test.ts"
  - "tests/unit/widget-hover-gating.test.ts"
  - "tests/unit/widget-settings.test.ts"
  - "scripts/check-widget-runtime.mjs"
  - "scripts/check-widget-performance-budget.mjs"
  - "scripts/prepare-widget-worker-assets.mjs"
  - "scripts/measure-deployed-widget-network.mjs"
  - "scripts/verify-deployed-jsonld.mjs"
  - ".github/workflows/widget-smoke.yml"
  - "src/widget/events.js"
  - "src/widget/loader.js"
  - "src/widget/core/origins.js"
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
  - "src/widget/reviews-section/reservation.js"
  - "src/widget/reviews-section/reviews-api.js"
  - "src/widget/reviews-section/render.js"
  - "src/widget/reviews-section/render/theme-vars.js"
  - "src/widget/reviews-section/render/media-gallery.js"
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
  - "src/widget/reviews-section/styles/media-gallery.js"
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
  - "src/app/api/public/storefront-theme/lazy-sync/route.ts"
  - "src/app/api/public/reviews/route.ts"
  - "src/app/api/public/ratings/route.ts"
  - "src/app/api/public/widget-error/route.ts"
  - "src/components/home-page/widgets/widgetDefs.ts"
  - "src/components/home-page/widgets/editor/SettingsPanel.tsx"
  - "src/lib/widget-settings.ts"
  - "src/lib/review-summary.ts"
  - "src/lib/media/jobs.ts"
  - "src/lib/media/lifecycle.ts"
  - "src/lib/media/sessions.ts"
  - "workers/widget-delivery/src/index.ts"
  - "wrangler.widget.jsonc"
  - "config/widget-performance-budget.json"
  - "docs/wiki/10_Research/Storefront_CDN_Performance_Benchmark.md"
---

# Hot Context

## Current Focus
- ikas review/rating app: admin, storefront widget, badges, uploads, moderation, Mux video.

## Must Know
- Source/config/tests/runtime win; wiki routes.
- Prompt procedures live in `09_Prompts`; do not create `08_Prompts`.
- Never document secrets.
- `package.json` pins Next.js `16.2.1`; older Next.js 15 notes are stale unless re-verified.
- No deploy, migration apply, env write, provider write, or teardown without explicit stop/go approval.

## Recent Important Changes
- 2026-07-04: AWS public-scale guardrail decision is documented: add minimal CloudFront CloudWatch alarms and short-retention CloudFront standard logs before public launch; defer S3 Inventory/Metadata until growth; do not enable broad S3 data events or S3 server access logging by default. See [[AWS_Setup_And_Access]].
- 2026-07-04: QStash maintenance scheduler cutover is active: signed internal endpoint, explicit task bodies, `ScheduledJobRunLock`, and QStash schedules replace Vercel Cron.
- 2026-07-04: QStash `nextScheduleTime` is not a health gate; use delivery logs/DLQ plus `ScheduledJobRunLock` runtime evidence.
- 2026-07-04: AWS image orphan scan includes public-only `reviews/{assetId}/` synthetic quarantine ids.
- 2026-07-04: AWS image lightbox/full-size and admin thumbnail fixes are live; public URLs use `https://media.renuvex.app/reviews/<assetId>/<variant>.<format>`.
- 2026-07-04: Legacy image-provider DB alignment completed; AWS-only image source pass is merged/deployed and live acceptance passed without private leak markers.
- 2026-07-03: AWS image provider is active; live test proved `media.renuvex.app` delivery, 14 variants, no public leak markers, and immutable cache headers.
- 2026-07-02: PDP review widget clears stale shadow content during SPA product transitions; manual dev-storefront acceptance confirmed the neutral shell instead of stale review cards.
- 2026-07-02: Worker-cached `GET /api/public/settings` is live. A read-only check returned `200` from Cloudflare with `X-Renuvex-Edge-Cache: MISS` and then `HIT`; `POST /api/public/storefront-theme/lazy-sync` remains on `app.renuvex.app`.
- 2026-07-01: `pnpm budget:widget` is hard local artifact budget gate after `pnpm build:widget`; network budget stays warn-only.
- 2026-06-30: Upstash audit: Redis measured `0` recent commands/bandwidth; QStash has no DLQ/schedules. See [[Upstash_Redis_QStash_Cost_Audit]].
- 2026-06-28/2026-07-02: Worker asset delivery is live for `widget.renuvex.app`; Worker V2 read cache is live for settings, ratings, ratings-by-slug, and reviews. `app.renuvex.app` remains backend/write/upload/video/Mux/QStash.
- 2026-07-02: AWS widget CDN canary is closed; Cloudflare Worker V2 stays production delivery.
- 2026-06-23: Review Video playback uses official Mux Player; Mux Data tracking/cookies stay disabled.
- 2026-06-21: Mux cutover and cleanup are live; see [[ADR_0032_Review_Video_On_Mux]].

## Current Risks / Open Questions
- Storefront is Turkish-first; future EN/DE needs real i18n, not only merchant copy.
- Keep post-deploy smoke after runtime widget changes.
- Worker V2 read origin: `widget.renuvex.app`; write/upload/video/lazy-sync origin: `app.renuvex.app`.
- Old video-provider cleanup gates are closed; preserve Cloudflare DNS/zone and Worker delivery infrastructure.
- Supabase RLS/default-grants hardening is a public-launch blocker.
- AWS-only image runtime, legacy DB alignment, Vercel env cleanup, and local env cleanup are complete. Provider account assets are out of app scope.
- Theme adapters depend on `listStorefront.themes[].isMainTheme`; no ikas theme webhook exists.
- Deferred gaps: unsupported-theme warning UI, authenticated dashboard smoke, Sentry post-deploy health.

## Read Next
- [[Current_Status]]
- [[Test_Strategy]]
- [[ADR_0033_Cloudflare_Worker_Widget_Asset_Delivery]]
- [[ADR_0032_Review_Video_On_Mux]]
- [[Review_Video_Canary_Runbook]]
- [[Review_Video_Manual_Repair_Runbook]]
- [[Storefront_CDN_Performance_Benchmark]]
