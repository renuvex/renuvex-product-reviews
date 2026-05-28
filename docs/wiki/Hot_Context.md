---
type: context
project: renuvex-product-reviews
status: active
created: 2026-05-13
updated: 2026-05-28
last_verified: 2026-05-28
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
  - "[[ADR_0020_Renuvex_Product_Reviews_Namespace_Migration]]"
  - "[[ADR_0021_Shadow_DOM_Isolation_Of_Review_Surfaces]]"
  - "[[ADR_0022_Placement_Allowlist_And_Lazy_Resync]]"
  - "[[ADR_0023_Widget_Lifecycle_Gating_Contract]]"
  - "[[ADR_0024_Badge_Review_Surface_Separation]]"
  - "[[Theme_Adapter_Playbook]]"
source_files:
  - "package.json"
  - "playwright.widget.config.ts"
  - "tests/widget-network-smoke.spec.ts"
  - ".github/workflows/widget-smoke.yml"
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
  - "src/widget/loader.js"
  - "src/widget/core/error-reporter.js"
  - "src/widget/core/config.js"
  - "src/widget/core/script-identity.js"
  - "src/widget/core/badge.js"
  - "src/widget/icons/star-sprite.js"
  - "src/widget/icons/review-icons.js"
  - "src/widget/core/health.js"
  - "src/widget/core/slot.js"
  - "src/widget/core/slot-position.js"
  - "src/widget/core/namespace.js"
  - "src/widget/core/product-title.js"
  - "src/widget/rating-badge/index.js"
  - "src/widget/rating-badge/inject.js"
  - "src/widget/surfaces/rating-badge.surface.js"
  - "src/widget/reviews-section/bootstrap.js"
  - "src/widget/reviews-section/reviews-api.js"
  - "src/widget/reviews-section/render.js"
  - "src/widget/reviews-section/styles.js"
  - "src/widget/reviews-section/review-form-modal/steps/step-rating.js"
  - "src/widget/themes/current-adapter.js"
  - "src/widget/themes/generic/adapter.js"
  - "src/widget/core/rollout.js"
  - "src/widget/listing-badges/inject.js"
  - "src/widget/reviews-section/render.js"
  - "src/widget/themes/current-adapter.js"
  - "src/widget/core/settings.js"
  - "src/models/auth-token/manager.ts"
---

# Hot Context

## Current Focus
- ikas review/rating app: admin, storefront widget, badges, reviews, uploads, moderation, settings preview.
- Current focus: storefront resilience, theme adapters, and widget CI coverage.

## Must Know
- Source/config/tests/runtime win; wiki routes.
- Prompt procedures live in `09_Prompts`; do not create `08_Prompts`.
- Do not document secrets; env names/purposes are acceptable.
- `package.json` pins Next.js `16.2.1`; older Next.js 15 docs are stale unless re-verified.

## Recent Important Changes
- 2026-05-19/24: Rating visuals + badge architecture + X-app resilience + owned-slot guards + SVG sprite (ADRs 0016-0019).
- 2026-05-23: Theme sync split from script injection; uses `listStorefront.themes[].isMainTheme` + stable `themeId`. Vercel cron daily 03:00 UTC.
- 2026-05-25: Review section opt-in via `<div data-renuvex-widget="reviews">`. [[Theme_Adapter_Playbook]] records Ozy spec; shared review CSS in `reviews-section/styles.js`.
- 2026-05-26: [[ADR_0021_Shadow_DOM_Isolation_Of_Review_Surfaces]] — review/lightbox/wizard in open Shadow DOM; host-theme CSS bleed closed.
- 2026-05-27: [[ADR_0022_Placement_Allowlist_And_Lazy_Resync]] — `autoPlacementEnabled` / `reviewsMountEnabled` runtime flags gate badge + review surfaces; only stable `themeId` matches unlock auto-placement. `/api/public/settings` lazy theme resync (30 min stale, Next.js `after()`); ikas has no theme webhook. Cross-merchant `themeId` stability empirically verified.
- 2026-05-27: [[ADR_0023_Widget_Lifecycle_Gating_Contract]] — three-layer gating model (always-load bootstrap / context-driven chunks / settings+capability gates) formalized with 8-step new-widget checklist. listing-badges top-level `isAutoPlacementEnabled()` gate fix.
- 2026-05-27: [[ADR_0024_Badge_Review_Surface_Separation]] - PDP badge is now an independent product surface + `rating-badge-*` lazy chunk; badge-only PDPs skip review render/BIG chunks and review/photoStrip APIs when the explicit reviews mount is absent.
- 2026-05-27: ADR_0024 follow-up hardened boundaries: review/photoStrip fetch helpers moved to `reviews-section/reviews-api.js`, the legacy listing fallback now probes product-card-like candidates instead of any link, and widget error forwarding now captures script/chunk resource-load failures with route/visibility/online context.
- 2026-05-28: Review-section implementation now lives under `src/widget/reviews-section/`; shared PDP title placement helper moved to `src/widget/core/product-title.js`. Public script URL, review mount contract, settings schema, backend APIs, and ikas integration are unchanged.
- 2026-05-28: `pnpm test:widget-smoke` + `Widget Smoke` GitHub Actions workflow now protect the widget network/chunk contract in CI using built public widget assets, not source imports.

## Current Risks / Open Questions
- Verify deploy/cache, re-measure widget size, and document disabling native theme reviews.
- Theme adapters use Admin API `listStorefront.themes[].isMainTheme`; no runtime DOM mount-point contract exists.
- ikas Studio `data-*` anchors are planned but not reliable/broadly deployed yet, so adapters remain the placement fallback layer.
- Daily cron can delay pending theme verification; public settings lazy resync softens this for merchants with storefront traffic.
- ikas has no `store/theme/*` webhook; lazy resync is the workaround.
- First visitor after a theme change can see one stale-cache cycle of badge state; accepted in [[ADR_0022_Placement_Allowlist_And_Lazy_Resync]].
- Admin warning UI for unsupported themes deferred; the runtime signal exists, the dashboard surface does not.
- Widget smoke CI now covers the main network/chunk contract, but it does not replace live post-deploy smoke on the dev storefront after runtime-affecting widget changes.
- Structured data, review-request emails, CSV import/export, analytics, localization, and broader tests remain gaps.

## Read Next
- [[Current_Status]]
- [[Project_Overview]]
- [[Open_Questions]]
- [[Agent_Rules]]
- [[Wiki_Maintenance_Prompt]]
- [[ADR_0015_Canonical_Product_Identity]]
