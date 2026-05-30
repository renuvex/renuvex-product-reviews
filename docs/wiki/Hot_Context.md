---
type: context
project: renuvex-product-reviews
status: active
created: 2026-05-13
updated: 2026-05-30
last_verified: 2026-05-30
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
  - "tests/unit/widget-surface-contracts.test.ts"
  - "scripts/check-widget-runtime.mjs"
  - "scripts/measure-deployed-widget-network.mjs"
  - "scripts/verify-deployed-jsonld.mjs"
  - ".github/workflows/widget-smoke.yml"
  - "src/widget/loader.js"
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
- 2026-05-28: Review API tests now cover validation, profanity, rate-limit, image policy, target verification, approval modes, GET filters, and cache behavior. Widget network smoke also records local transfer evidence and tests both negative and positive listing fallback paths.
- 2026-05-29: Production evidence guardrails added: `pnpm measure:deployed-widget`, `pnpm verify:deployed-jsonld`, `listing-badges/fallback-candidates.js`, and `tests/unit/widget-surface-contracts.test.ts`. Evidence notes live in [[Widget_Transfer_Measurement_2026-05-29]] and [[Structured_Data_Verification_2026-05-29]].
- 2026-05-29: Product `AggregateRating` JSON-LD moved out of `rating-badge` into an independent `structured-data` surface. `Ürün Yorumları` now has `SEO` → `Google Rich Snippets` (`richSnippetsEnabled`, default `true`); badge disabled no longer disables JSON-LD when the explicit review section is visible.
- 2026-05-30: Overlay shared-surface foundation ([[ADR_0025_Overlay_Shared_Surface_Foundation]]). The two body-level overlays (photo lightbox, review-form wizard) now share `core/body-scroll-lock.js` (robust, ref-counted), `shared/focus-trap.js`, and `core/modal-history.js`; tap-highlight reset moved to `HOST_RESET_CSS`. Fixes the wizard's weaker `body`-only scroll lock that let the storefront scroll behind it on `<html>`-scrolling / `!important` themes and on iOS. A `widget-surface-contracts.test.ts` invariant + an interaction scroll-lock regression prevent recurrence. The approved `createOverlaySurface()` controller was rejected during implementation as over-abstraction for two divergent overlays.
- 2026-05-30: Widget icons fully on Phosphor (`icons/ui-icons.js`); no off-family widget glyph remains. `iconUseNode` must HTML-parse (not `image/svg+xml`+`importNode`) or `<use>` icons paint blank in shadow trees ([[Bug_Icon_Use_Node_Blank_Glyphs]]).

## Current Risks / Open Questions
- Keep doing live post-deploy smoke on the dev storefront after runtime-affecting widget changes; deployed measurement scripts are evidence, not a full merchant-flow replacement.
- Production transfer evidence shows the current deployed PDP `PAGE_VIEW` path still loads `listing-badges-*`; the fallback timer is deterministic/tested, but page-type routing optimization is a separate future decision.
- Theme adapters depend on Admin API `listStorefront.themes[].isMainTheme`; ikas has no theme webhook, so lazy resync remains the workaround.
- Admin warning UI for unsupported themes is deferred; the runtime signal exists, the dashboard surface does not.
- CI covers mockable widget/admin/API/theme contracts; real authenticated ikas dashboard smoke, Sentry post-deploy health, hard transfer-size budgets, and manual Google Rich Results URL verification remain gaps.
- Review-request emails, CSV import/export, analytics, and localization remain roadmap gaps.

## Read Next
- [[Current_Status]]
- [[Project_Overview]]
- [[Open_Questions]]
- [[Test_Strategy]]
- [[ADR_0024_Badge_Review_Surface_Separation]]
