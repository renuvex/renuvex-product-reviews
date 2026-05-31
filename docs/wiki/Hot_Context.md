---
type: context
project: renuvex-product-reviews
status: active
created: 2026-05-13
updated: 2026-05-31
last_verified: 2026-05-31
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
  - "src/widget/reviews-section/lightbox-trigger.js"
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
- ikas review/rating app: admin, storefront widget, badges, reviews, uploads, moderation.

## Must Know
- Source/config/tests/runtime win; wiki routes.
- Prompt procedures live in `09_Prompts`; do not create `08_Prompts`.
- Never document secrets.
- `package.json` pins Next.js `16.2.1`; older Next.js 15 docs are stale unless re-verified.

## Recent Important Changes
- 2026-05-25: Review section is opt-in via `<div data-renuvex-widget="reviews">`; shared review CSS lives in `reviews-section/styles.js`.
- 2026-05-26: [[ADR_0021_Shadow_DOM_Isolation_Of_Review_Surfaces]] moved review/lightbox/wizard UI into open Shadow DOM.
- 2026-05-27: ADRs 0022-0024 added placement allowlist, lifecycle gating, independent `rating-badge-*`, review/photoStrip helper split, stricter listing fallback, and script/chunk error forwarding.
- 2026-05-28: [[Test_Strategy]] defines `pnpm test:ci`: widget network, runtime, interactions, admin preview, and unit layers. GitHub Actions workflow is `Quality Gate`.
- 2026-05-29: Production evidence guardrails: `pnpm measure:deployed-widget`, `pnpm verify:deployed-jsonld`, listing fallback candidates, and widget surface contracts.
- 2026-05-29: Product `AggregateRating` JSON-LD moved out of `rating-badge` into an independent `structured-data` surface. `Ürün Yorumları` now has `SEO` → `Google Rich Snippets` (`richSnippetsEnabled`, default `true`); badge disabled no longer disables JSON-LD when the explicit review section is visible.
- 2026-05-30: Overlay shared-surface foundation ([[ADR_0025_Overlay_Shared_Surface_Foundation]]). Lightbox/wizard share ref-counted scroll lock, focus trap, modal history, and tap-highlight reset; a surface-contract invariant prevents drift.
- 2026-05-30: Widget icons fully on Phosphor (`icons/ui-icons.js`); no off-family widget glyph remains. `iconUseNode` must HTML-parse (not `image/svg+xml`+`importNode`) or `<use>` icons paint blank in shadow trees ([[Bug_Icon_Use_Node_Blank_Glyphs]]).
- 2026-05-30: Wizard/lightbox a11y — overlays focus the dialog on open, not a control (wizard first Tab → star 1, close button last; lightbox no nav-arrow ring); stars navigable by Tab + ←/→; `close()` moves focus out immediately ([[Bug_Wizard_Rating_Radiogroup_And_Focus_Return]]).

- 2026-05-31: Initial `Shift+Tab` now stays trapped in wizard/lightbox; `focus-trap.js` handles non-tabbable dialog focus and interaction smoke pins both.
- 2026-05-31: Photo-strip thumbnails now share `wireLightboxTrigger()` with card/list/gallery review images, so all lightbox photo triggers expose keyboard/ARIA semantics and focus restore.
- 2026-05-31: Review read lifecycle audit fixed stale storefront responses: sort/filter/load-more now use request-token + state-snapshot guards, and load-more inserts only new ids. Runtime smoke pins stale overwrite/page skip, duplicate DOM insertion, retry recovery, strip independence, and trusted image rendering.
- 2026-05-31: Widget loader lifecycle audit fixed synchronous listing/search replay via `latestListing`; network smoke pins event ordering, PDP side-effect boundaries, and fail-closed listing gates.
- 2026-05-31: Clean PDP `PAGE_VIEW` now skips the listing-badges entry chunk. Listing `PAGE_VIEW` detection is page-type gated, and observer/fallback probes ignore widget-owned hash/query links.

## Current Risks / Open Questions
- Keep live post-deploy smoke after runtime widget changes; deployed measurement scripts are evidence, not a merchant-flow replacement.
- Theme adapters depend on Admin API `listStorefront.themes[].isMainTheme`; ikas has no theme webhook, so lazy resync remains the workaround.
- Admin warning UI for unsupported themes is deferred; the runtime signal exists, the dashboard surface does not.
- Gaps: authenticated ikas dashboard smoke, Sentry post-deploy health, hard transfer budgets, manual Google Rich Results checks.

## Read Next
- [[Current_Status]]
- [[Project_Overview]]
- [[Open_Questions]]
- [[Test_Strategy]]
- [[ADR_0024_Badge_Review_Surface_Separation]]
