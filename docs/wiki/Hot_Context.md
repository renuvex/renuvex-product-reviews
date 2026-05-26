---
type: context
project: renuvex-product-reviews
status: active
created: 2026-05-13
updated: 2026-05-27
last_verified: 2026-05-27
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
  - "[[Theme_Adapter_Playbook]]"
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
  - "src/widget/icons/star-sprite.js"
  - "src/widget/icons/review-icons.js"
  - "src/widget/core/health.js"
  - "src/widget/core/slot.js"
  - "src/widget/core/slot-position.js"
  - "src/widget/core/namespace.js"
  - "src/widget/product-widget/title-finder.js"
  - "src/widget/product-widget/render.js"
  - "src/widget/product-widget/styles.js"
  - "src/widget/product-widget/review-form-modal/steps/step-rating.js"
  - "src/widget/themes/current-adapter.js"
  - "src/widget/themes/generic/adapter.js"
  - "src/widget/core/rollout.js"
  - "src/widget/listing-badges/inject.js"
  - "src/widget/product-widget/rating-badge.js"
  - "src/widget/product-widget/render.js"
  - "src/widget/themes/current-adapter.js"
  - "src/widget/core/settings.js"
  - "src/models/auth-token/manager.ts"
---

# Hot Context

## Current Focus
- ikas review/rating app: admin, storefront widget, badges, reviews, uploads, moderation, settings preview.
- Current focus: storefront resilience, theme adapters, and external rename follow-through.

## Must Know
- Source/config/tests/runtime are source of truth; wiki is routing.
- Prompt procedures live in `09_Prompts`; do not create `08_Prompts`.
- Do not document secrets; env names/purposes are acceptable.
- `package.json` pins Next.js `16.2.1`; older Next.js 15 docs are stale unless re-verified.

## Recent Important Changes
- 2026-05-19/24: Rating visuals, badge architecture, X-app resilience, owned-slot guards, WebKit fixes, and SVG star sprite are covered by ADRs 0016-0019.
- 2026-05-23: Script reconciliation reports remote match/duplicate diagnostics; theme sync is split from script injection and uses `listStorefront.themes[].isMainTheme` plus stable `themeId`.
- 2026-05-23/24: Current Vercel plan rejected 5-minute cron; daily 03:00 UTC is restored. Pro/Enterprise or QStash can shorten pending theme verification.
- 2026-05-24/25: Renuvex hard-rename completed. Active source/generated widget assets use `Renuvex Product Reviews` / `product-reviews` / `renuvex-pr`; old names are historical docs only.
- 2026-05-25: Review section is opt-in through `<div data-renuvex-widget="reviews"></div>`; PDP/listing badges stay independent and use the `badge` widget toggle.
- 2026-05-25: External rename started. GitHub/Vercel project and Sentry org/project use Renuvex names; production widget domain remains `new-ikas-app.vercel.app` until a custom domain is added.
- 2026-05-25: [[Theme_Adapter_Playbook]] records the Ozy selector spec. Shared review CSS moved to `product-widget/styles.js`; Ozy selectors stay unchanged until fixture/live evidence proves a false placement.
- 2026-05-26: [[ADR_0021_Shadow_DOM_Isolation_Of_Review_Surfaces]] — review section / lightbox / form wizard render inside open Shadow DOM roots; CSS isolation gap closed.
- 2026-05-27: [[ADR_0022_Placement_Allowlist_And_Lazy_Resync]] — `runtime.autoPlacementEnabled` + `runtime.reviewsMountEnabled` flags gate badge / review-section surfaces; only themes matched by stable `themeId` unlock auto-placement. `/api/public/settings` adds Next.js `after()` lazy theme resync (30 min stale threshold) since ikas has no `store/theme/*` webhook. Cross-merchant `themeId` stability empirically verified (Ares identical across two stores; version upgrade preserves `themeId`).

## Current Risks / Open Questions
- Verify deploy/cache, re-measure widget size, and document disabling native theme reviews.
- Theme adapters use Admin API `listStorefront.themes[].isMainTheme`; no runtime DOM mount-point contract exists.
- ikas Studio `data-*` anchors are planned but not reliable/broadly deployed yet, so adapters remain the placement fallback layer.
- Daily cron can delay pending theme verification unless sub-daily cron or a delayed queue is added (post-ADR_0022 the public settings lazy resync softens this for any merchant with storefront traffic).
- ikas has no `store/theme/*` webhook scope; lazy resync is the workaround. Open a feature request to ikas; if shipped, layer it as a third sync trigger.
- First storefront visitor after a theme change can still see one stale-cache cycle of badge state; documented as accepted trade-off in [[ADR_0022_Placement_Allowlist_And_Lazy_Resync]].
- Admin warning UI for unsupported themes deferred; the runtime signal exists, the dashboard surface does not.
- Structured data, review-request emails, CSV import/export, analytics, localization, and test coverage remain gaps.

## Read Next
- [[Current_Status]]
- [[Project_Overview]]
- [[Open_Questions]]
- [[Agent_Rules]]
- [[Wiki_Maintenance_Prompt]]
- [[ADR_0015_Canonical_Product_Identity]]
