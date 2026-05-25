---
type: context
project: renuvex-product-reviews
status: active
created: 2026-05-13
updated: 2026-05-25
last_verified: 2026-05-25
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
  - "src/widget/product-widget/title-finder.js"
  - "src/widget/product-widget/render.js"
  - "src/widget/product-widget/review-form-modal/steps/step-rating.js"
  - "src/widget/themes/current-adapter.js"
  - "src/widget/themes/generic/adapter.js"
  - "src/widget/core/rollout.js"
  - "src/widget/listing-badges/inject.js"
  - "src/widget/product-widget/rating-badge.js"
---

# Hot Context

## Current Focus
- ikas review/rating app: admin, storefront widget, badges, reviews, uploads, moderation, settings preview.
- Current focus: external rename and storefront resilience.

## Must Know
- Source/config/tests/runtime are source of truth; wiki is routing.
- Prompt procedures live in `09_Prompts`; do not create `08_Prompts`.
- Do not document secrets; env names/purposes are acceptable.
- `package.json` pins Next.js `16.2.1`; older Next.js 15 docs are stale unless re-verified.

## Recent Important Changes
- Widget hardening refs: [[ADR_0013_Modular_Widget_Loader_Architecture]], [[Phase_2_Widget_Module_Split_Plan]], [[Ikas_Storefront_Script_Capabilities]].
- 2026-05-19: [[ADR_0016_Rating_Visual_System]] implemented. Star icon + color are single-sourced from the `reviews` widget and used by every rating surface.
- 2026-05-20: [[ADR_0017_Badge_Architecture]] shipped the badge model; current code has since hard-renamed the public DOM/CSS contract to `renuvex-pr-*` / `data-renuvex-*`. Sibling-of-title mount remains dev-store gated unless rollout flags change.
- 2026-05-23: Storefront script reconciliation gained remote match/duplicate diagnostics, and badge render paths emit health telemetry plus one-shot self-heal for DOM removal.
- 2026-05-23: Active theme selection uses Admin API `listStorefront.themes[].isMainTheme` plus `mainStorefrontThemeId`; adapter matching uses stable `themeId` before merchant-editable names.
- 2026-05-23: Theme sync is split from script injection; dashboard/settings use lightweight `syncStorefrontTheme`.
- 2026-05-23/24: Current Vercel plan rejected 5-minute cron; daily 03:00 UTC is restored. Pro/Enterprise or QStash can shorten pending theme verification.
- 2026-05-24: [[ADR_0018_Widget_Ownership_And_Placement_Resilience]] records the X-app/Serpingo conflict. Runtime discovery is marker-first + `publicApiKey`-required; ikas has no official slot/conflict mechanism, and script order is not guaranteed.
- 2026-05-24: PDP badge position guard is shared core infrastructure; theme adapters own PDP title/mount selectors.
- 2026-05-24: Listing/home/search badges now use the same bounded owned-slot position guard as PDP, without flipping the sibling-mount rollout gate.
- 2026-05-24: WebKit tap bugs fixed; custom controls need pointer-safe activation plus click/keyboard fallback.
- 2026-05-24: [[ADR_0019_Icon_Sprite_Rendering]] shipped. Read-only rating stars use one injected SVG `<symbol>` sprite + `<use>` (not inline `<path>` per star). Half-star clip + `ICONS` source unchanged. Adds sr-only/`aria-labelledby` a11y; PDP badge now a link + `data-renuvex-align` (no `role=figure`/static `id`).
- 2026-05-24/25: [[ADR_0020_Renuvex_Product_Reviews_Namespace_Migration]] shipped and then completed its hard-rename contract because there are no real merchant installs yet. Current source and active generated widget assets use `Renuvex Product Reviews` / `product-reviews` / `renuvex-pr` only; legacy `ikr-*`, `data-ikr-*`, `IKR_*`, and `yorum-paneli-widget` remain historical documentation only.
- 2026-05-25: Review section placement is opt-in through `<div data-renuvex-widget="reviews"></div>`. Missing mount means no review section; PDP title badge and listing badges stay independent and are controlled by the `badge` widget toggle.
- 2026-05-25: External rename started. GitHub/Vercel project and Sentry org/project use Renuvex names; production domain remains `new-ikas-app.vercel.app`, so keep `STOREFRONT_WIDGET_BASE_URL` there until a custom domain serves `widget.js`.

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
