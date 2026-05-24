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
  - "[[ADR_0020_Renuvex_Product_Reviews_Namespace_Migration]]"
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
  - "src/widget/summary-layouts/shared/actions-block.js"
  - "src/widget/product-widget/title-finder.js"
  - "src/widget/product-widget/review-form-modal/steps/step-rating.js"
  - "src/widget/themes/current-adapter.js"
  - "src/widget/themes/generic/adapter.js"
  - "src/widget/core/rollout.js"
  - "src/widget/listing-badges/inject.js"
  - "src/widget/product-widget/rating-badge.js"
---

# Hot Context

## Current Focus
- ikas review/rating app: merchant admin, storefront widget, review submission, image upload, moderation, settings preview.
- Current focus: Renuvex Product Reviews namespace migration and storefront widget resilience.

## Must Know
- Source/config/tests/runtime are source of truth; wiki is routing.
- Prompt procedures live in `09_Prompts`; do not create `08_Prompts`.
- Do not document secrets; env names/purposes are acceptable.
- `package.json` pins Next.js `16.2.1`; older Next.js 15 docs are stale unless re-verified.

## Recent Important Changes
- Widget hardening refs: [[ADR_0013_Modular_Widget_Loader_Architecture]], [[Phase_2_Widget_Module_Split_Plan]], [[Ikas_Storefront_Script_Capabilities]].
- 2026-05-17/18: Module split, canonical product identity, install backfill, non-destructive script lifecycle, public review hardening, rate limits, and live retests landed.
- 2026-05-19: [[ADR_0016_Rating_Visual_System]] implemented. Star icon + color are single-sourced from the `reviews` widget and used by every rating surface.
- 2026-05-20: [[ADR_0017_Badge_Architecture]] shipped. Class-first DOM (`.ikr-rating-badge`, `data-ikr-*`) for all stores; sibling-of-title mount remains dev-store gated. Sizing uses `.ikr-rating-badge` CSS vars from `ensureBadgeTokens`; schema adds mobile/alignment/count controls.
- 2026-05-23: Storefront script records now carry `data-ikr-*` markers, v1 reconciliation reports match/duplicate diagnostics, and badge render paths emit health telemetry plus one-shot self-heal for DOM removal.
- 2026-05-23: Active theme selection uses Admin API `listStorefront.themes[].isMainTheme` plus `mainStorefrontThemeId`; adapter matching uses stable `themeId` before merchant-editable names.
- 2026-05-23: Theme sync is split from script injection. Dashboard/settings call lightweight `syncStorefrontTheme`; install/manual script repair still updates scripts and theme metadata.
- 2026-05-23/24: Current Vercel plan rejected 5-minute cron; daily 03:00 UTC is restored. Pro/Enterprise or QStash can shorten pending theme verification.
- 2026-05-24: [[ADR_0018_Widget_Ownership_And_Placement_Resilience]] records the X-app/Serpingo conflict. Runtime script discovery must be marker-first and `publicApiKey`-required; storefront surfaces use Renuvex/legacy owned slots. ikas has no official slot/conflict mechanism, and `isHighPriority` / `order` is not a hard cross-app ordering guarantee.
- 2026-05-24: PDP badge position guard is shared core infrastructure; theme adapters own PDP title/mount selectors.
- 2026-05-24: Listing/home/search badges now use the same bounded owned-slot position guard as PDP, without flipping the sibling-mount rollout gate.
- 2026-05-24: [[Bug_Filter_Menu_WebKit_Tap_Activation]] + [[Bug_Review_Wizard_WebKit_Rating_Advance]] fixed iOS/WebKit tap bugs (filter menu + review wizard): custom widget controls need pointer-safe activation with click+keyboard fallback and no one-shot animation gates.
- 2026-05-24: [[ADR_0019_Icon_Sprite_Rendering]] shipped. Read-only rating stars use one injected SVG `<symbol>` sprite + `<use>` (not inline `<path>` per star). Half-star clip + `ICONS` source unchanged. Adds sr-only/`aria-labelledby` a11y; PDP badge now a link + `data-ikr-align` (no `role=figure`/static `id`).
- 2026-05-24: [[ADR_0020_Renuvex_Product_Reviews_Namespace_Migration]] shipped expand phase. Canonical identity is `Renuvex Product Reviews` / `product-reviews` / `renuvex-pr`; legacy `ikr-*`, `data-ikr-*`, `IKR_*`, and `yorum-paneli-widget` remain compatibility aliases until contract cleanup.

## Current Risks / Open Questions
- Verify deploy/cache, re-measure widget size, and document disabling native theme reviews.
- Theme adapters use Admin API `listStorefront.themes[].isMainTheme`; no runtime DOM mount-point contract exists.
- Daily cron can delay pending theme verification unless sub-daily cron or a delayed queue is added.
- Structured data, review-request emails, CSV import/export, analytics, localization, and test coverage remain gaps.

## Read Next
- [[Current_Status]]
- [[Project_Overview]]
- [[Open_Questions]]
- [[Agent_Rules]]
- [[Wiki_Maintenance_Prompt]]
- [[ADR_0015_Canonical_Product_Identity]]
