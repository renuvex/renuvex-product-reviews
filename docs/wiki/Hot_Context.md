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
  - "[[ADR_0021_Shadow_DOM_Isolation_Of_Review_Surfaces]]"
  - "[[ADR_0022_Placement_Allowlist_And_Lazy_Resync]]"
  - "[[ADR_0023_Widget_Lifecycle_Gating_Contract]]"
  - "[[ADR_0024_Badge_Review_Surface_Separation]]"
  - "[[Theme_Adapter_Playbook]]"
  - "[[Test_Strategy]]"
source_files:
  - "package.json"
  - "playwright.widget.config.ts"
  - "vitest.config.ts"
  - "tests/widget-harness.ts"
  - "tests/widget-network-smoke.spec.ts"
  - "tests/widget-runtime-smoke.spec.ts"
  - "tests/widget-interaction-smoke.spec.ts"
  - "tests/admin-preview-smoke.spec.ts"
  - "tests/unit/public-api-routes.test.ts"
  - "tests/unit/storefront-theme.test.ts"
  - "scripts/check-widget-runtime.mjs"
  - ".github/workflows/widget-smoke.yml"
  - "src/widget/loader.js"
  - "src/widget/core/settings.js"
  - "src/widget/core/product-title.js"
  - "src/widget/rating-badge/index.js"
  - "src/widget/rating-badge/inject.js"
  - "src/widget/reviews-section/bootstrap.js"
  - "src/widget/reviews-section/reviews-api.js"
  - "src/widget/reviews-section/render.js"
  - "src/widget/reviews-section/styles.js"
  - "src/widget/themes/current-adapter.js"
  - "src/widget/themes/generic/adapter.js"
  - "src/lib/storefront-theme.ts"
  - "src/lib/storefront-theme-sync.ts"
  - "src/app/api/public/settings/route.ts"
  - "src/app/api/public/reviews/route.ts"
  - "src/app/api/public/ratings/route.ts"
  - "src/app/api/public/widget-error/route.ts"
  - "src/components/home-page/widgets/widgetDefs.ts"
---

# Hot Context

## Current Focus
- ikas review/rating app: admin, storefront widget, badges, reviews, uploads, moderation, settings preview.
- Current focus: storefront resilience, theme adapters, and automated quality gates.

## Must Know
- Source/config/tests/runtime win; wiki routes.
- Prompt procedures live in `09_Prompts`; do not create `08_Prompts`.
- Never document secrets.
- `package.json` pins Next.js `16.2.1`; older Next.js 15 docs are stale unless re-verified.

## Recent Important Changes
- 2026-05-25: Review section is opt-in via `<div data-renuvex-widget="reviews">`; shared review CSS lives in `reviews-section/styles.js`.
- 2026-05-26: [[ADR_0021_Shadow_DOM_Isolation_Of_Review_Surfaces]] moved review/lightbox/wizard UI into open Shadow DOM.
- 2026-05-27: ADRs 0022-0024 added placement allowlist, lifecycle gating, independent `rating-badge-*`, review/photoStrip helper split, stricter listing fallback, and script/chunk error forwarding.
- 2026-05-28: Review-section implementation moved to `src/widget/reviews-section/`; shared PDP title helper moved to `src/widget/core/product-title.js`.
- 2026-05-28: [[Test_Strategy]] now defines `pnpm test:ci`: widget network, runtime layouts, lightbox/wizard, admin preview/settings, and public API/theme-state unit tests. GitHub Actions workflow is `Quality Gate`.

## Current Risks / Open Questions
- Re-measure deployed widget size and keep doing live post-deploy smoke on the dev storefront after runtime-affecting widget changes.
- Theme adapters depend on Admin API `listStorefront.themes[].isMainTheme`; ikas has no theme webhook, so lazy resync remains the workaround.
- Admin warning UI for unsupported themes is deferred; the runtime signal exists, the dashboard surface does not.
- CI covers mockable widget/admin/API/theme contracts; real authenticated ikas dashboard smoke, Sentry post-deploy health, and transfer-size budgets remain gaps.
- Structured data, review-request emails, CSV import/export, analytics, and localization remain roadmap gaps.

## Read Next
- [[Current_Status]]
- [[Project_Overview]]
- [[Open_Questions]]
- [[Test_Strategy]]
- [[ADR_0024_Badge_Review_Surface_Separation]]
