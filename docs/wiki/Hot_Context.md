---
type: context
project: renuvex-product-reviews
status: active
created: 2026-05-13
updated: 2026-06-21
last_verified: 2026-06-21
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
- ikas review/rating app: admin, storefront widget, badges, uploads, moderation, and the Mux review-video cutover.

## Must Know
- Source/config/tests/runtime win; wiki routes.
- Prompt procedures live in `09_Prompts`; do not create `08_Prompts`.
- Never document secrets.
- `package.json` pins Next.js `16.2.1`; older Next.js 15 docs are stale unless re-verified.
- For video work, no deploy, migration apply, env write, provider write, or teardown happens without explicit stop/go approval.

## Recent Important Changes
- 2026-06-08: Public review reads now use `ProductReviewSummary`, cursor/keyset pagination, indexed `Review.hasImages`, and `ReviewMedia`/`PendingReviewImage` metadata. See [[ADR_0026_Product_Review_Summary_Read_Model]], [[ADR_0028_Review_Cursor_Pagination]], and [[ADR_0029_Review_Media_Metadata]].
- 2026-06-21: Review Video provider cutover is live on Mux. Production DB has applied `20260621003000_review_video_mux_contract_drop_legacy_columns`; old Cloudflare Stream/R2 `VideoUploadSession` columns are absent, Mux assets are cleaned up after canary deletion, Vercel has no Cloudflare video env vars, and Cloudflare Stream/R2 inventory is empty. See [[ADR_0032_Review_Video_On_Mux]] and [[Review_Video_Canary_Runbook]].
- 2026-06-21: Mux cleanup lifecycle now handles the cancel/asset-created race: `cleanup_video` recovers `asset_id` from `providerUploadId`, and late `video.upload.asset_created` webhooks for `aborted`/`failed` sessions route to asset-scoped cleanup.
- 2026-06-20: Mux upload performance hardening measures browser-to-Mux transfer separately from processing/webhooks via sanitized `VideoUploadPerformanceSample` rows and keeps same-session retry progress monotonic.
- 2026-06-20: The older `6 reviews / 39 sessions` purge manifest is historical only; latest DB evidence before implementation showed zero video surfaces. Preview and production Mux environments are separate, and webhook resource/secret creation waits for a deployed `/api/webhooks/mux` URL.

## Current Risks / Open Questions
- Keep live post-deploy smoke after runtime widget changes.
- Mux cleanup gates closed for the old video provider: contract migration verified, old Vercel Cloudflare video env vars absent, and Cloudflare Stream/R2 video inventory empty. Cloudflare DNS/zone and future Worker delivery infrastructure stay out of this cleanup scope.
- Supabase RLS audit: repo uses server-side Prisma and no browser Supabase client; SQL privilege checks did not show `anon`/`authenticated` table access, but most public app tables still have RLS disabled. Treat RLS/default-grants hardening as a public-launch blocker; do not enable blindly during active schema churn.
- Theme adapters still depend on Admin API `listStorefront.themes[].isMainTheme`; no ikas theme webhook exists.
- Deferred gaps: unsupported-theme admin warning UI, authenticated ikas dashboard smoke, Sentry post-deploy health.

## Read Next
- [[Current_Status]]
- [[Test_Strategy]]
- [[ADR_0032_Review_Video_On_Mux]]
- [[Review_Video_Canary_Runbook]]
