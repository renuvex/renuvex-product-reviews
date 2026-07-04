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
  - "[[Storefront_CDN_Performance_Benchmark]]"
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
- 2026-07-04: Legacy image-provider DB alignment completed: 12 media, 6 pending, 8 image flags/mirrors, 26 quarantine rows, 1 job retired, 1 summary rebuilt. Local env and repo-local provider docs are cleaned.
- 2026-07-04: AWS-only image source pass is merged/deployed. PR #5 is `244b0997`, Vercel production is `dpl_4Cqv9KsYsMJhuaAmrGSmZiGnJqga`, Worker version is `29571b47-2f2b-449f-8bbc-ce15d14c0832`, and live acceptance passed without private leak markers.
- 2026-07-03: AWS image provider is active. PR #3 deployed as `dpl_5f1tYG7WDvDY5gxpfxuAWwme96Cx`; a live test review proved `media.renuvex.app` delivery, 14 variants, no public leak markers, and immutable cache headers.
- 2026-07-02: PDP review widget clears stale shadow content during SPA product transitions; manual dev-storefront acceptance confirmed the neutral shell instead of stale review cards.
- 2026-07-02: Worker-cached `GET /api/public/settings` is live. A read-only check returned `200` from Cloudflare with `X-Renuvex-Edge-Cache: MISS` and then `HIT`; `POST /api/public/storefront-theme/lazy-sync` remains on `app.renuvex.app`.
- 2026-07-01: `pnpm budget:widget` is hard local artifact budget gate after `pnpm build:widget`; network budget stays warn-only.
- 2026-06-30: Upstash audit: Redis measured `0` recent commands/bandwidth; QStash has no DLQ/schedules. See [[Upstash_Redis_QStash_Cost_Audit]].
- 2026-06-28/2026-07-02: Worker asset delivery is live for `widget.renuvex.app`; Worker V2 read cache is live for settings, ratings, ratings-by-slug, and reviews. `app.renuvex.app` remains backend/write/upload/video/Mux/QStash.
- 2026-07-02: AWS CloudFront/S3 widget CDN cutover is closed as an active issue for the current MVP. The canary remains documented and reproducible, but Cloudflare Worker V2 stays the production delivery layer because AWS was only slightly faster and materially more expensive.
- 2026-06-23: Review Video playback uses official Mux Player; Mux Data tracking/cookies stay disabled.
- 2026-06-08: Public review reads now use `ProductReviewSummary`, cursor/keyset pagination, indexed `Review.hasImages`, and `ReviewMedia`/`PendingReviewImage` metadata. See [[ADR_0026_Product_Review_Summary_Read_Model]], [[ADR_0028_Review_Cursor_Pagination]], and [[ADR_0029_Review_Media_Metadata]].
- 2026-06-21: Mux cutover and cleanup are live; see [[ADR_0032_Review_Video_On_Mux]].

## Current Risks / Open Questions
- Storefront is Turkish-first; future EN/DE needs real i18n, not only merchant copy.
- Keep post-deploy smoke after runtime widget changes.
- Worker V2 read origin: `widget.renuvex.app`; backend/write/upload/video/lazy-sync origin: `app.renuvex.app`.
- Worker rollback: restore `widget.renuvex.app CNAME 2d886046bc2da89b.vercel-dns-017.com`, TTL `600`, DNS-only.
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
