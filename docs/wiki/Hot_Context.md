---
type: context
project: ikas-review-app
status: active
created: 2026-05-13
updated: 2026-05-17
last_verified: 2026-05-17
confidence: high
tags:
  - hot-context
  - project-memory
related:
  - "[[Index]]"
  - "[[Current_Status]]"
  - "[[Project_Overview]]"
  - "[[Phase_1_Widget_Runtime_Audit]]"
  - "[[Phase_2_Widget_Module_Split_Plan]]"
  - "[[ADR_0015_Canonical_Product_Identity]]"
source_files:
  - "package.json"
  - "prisma/schema.prisma"
  - "src/widget/index.js"
  - "src/app/api/public/reviews/route.ts"
  - "src/app/api/public/ratings/route.ts"
  - "src/app/api/public/ratings-by-slug/route.ts"
  - "src/components/home-page/widgets/widgetDefs.ts"
  - "src/lib/storefront-widget-url.ts"
---

# Hot Context

## Current Focus
- ikas review/rating app: merchant admin, storefront widget, review submission, image upload, moderation, settings preview.
- Current focus: ADR_0013 Phase 3 / Stage 2 hardening around canonical product identity for listing/search badges.

## Must Know
- Source code, config, migrations, tests, and runtime behavior are the source of truth; wiki pages are routing and memory.
- Prompt procedures live in `09_Prompts`; do not create `08_Prompts`.
- Do not document secrets or real env values. Env names and purposes are acceptable.
- `package.json` pins Next.js `16.2.1`; older generated docs saying Next.js 15 are stale unless re-verified.

## Recent Important Changes
- Start large storefront-widget work with [[Yotpo_Style_Widget_Modular_Architecture]], [[Phase_1_Widget_Runtime_Audit]], [[Ikas_Storefront_Events]], and [[Ikas_Storefront_Script_Capabilities]].
- 2026-05-16: [[ADR_0013_Modular_Widget_Loader_Architecture]] Phase 1 landed: internal loader, surface registry, and one Storefront Events context module. Output remains one IIFE `widget.js`.
- 2026-05-17: [[Phase_1_Widget_Runtime_Audit]] records dev-store runtime verification. `VIEW_LISTING` is confirmed as a real runtime event carrying `productDetails[]`; search pages emit `VIEW_SEARCH_RESULTS` and are Phase 2 work.
- 2026-05-17: [[Bug_Listing_Badge_Stars_Direct_Load]] fixed. Cold listing stars were 0x0 because `#ikr-styles` was PDP-only; `src/widget/core/badge.js` now self-injects `#ikr-badge-styles`.
- 2026-05-17: [[Phase_2_Widget_Module_Split_Plan]] defines the Phase 2 work and done criteria. Keep `widget.js?publicApiKey=...` compatible; use a classic loader plus ESM chunks unless ikas module script loading is proven.
- 2026-05-17: Phase 2 (module split) implemented. Local build emits a small classic `public/widget.js` loader plus ESM `public/widget-runtime/*` chunks; `VIEW_SEARCH_RESULTS` is handled; Ozy listing placement moved into a fallback adapter.
- 2026-05-17: [[Phase_2_Widget_Module_Split_Plan]] verified live on the dev store — PDP/category/search cold entries, PDP↔PDP SPA navigation, and a mobile spot check passed; Sentry post-test clean. Phase 2 is closed. `core/settings.js` now de-dupes the in-flight settings request shared by the reviews-main and listing-badge surfaces.
- 2026-05-17: Storefront script URL generation now uses `STOREFRONT_WIDGET_BASE_URL` through [src/lib/storefront-widget-url.ts](src/lib/storefront-widget-url.ts). `NEXT_PUBLIC_DEPLOY_URL` remains the app/OAuth URL; real ikas storefront script records must load the stable public HTTPS widget host.
- 2026-05-17: [[ADR_0015_Canonical_Product_Identity]] accepted and implemented for the dominant Storefront Events path. Listing/search badges now map `productDetails[].id` to slugs and call `/api/public/ratings?productIds=...`; `/api/public/ratings-by-slug` remains fallback-only for DOM-only contexts. Added the `[storeId, productId, status]` review index.
- Context7 is useful for current Playwright/Sentry/Next.js docs that affect test method or fixes. ikas contracts still require ikas docs/MCP and live storefront evidence.

## Current Risks / Open Questions
- ADR_0013 Phase 1 runtime audit is recorded in [[Phase_1_Widget_Runtime_Audit]]; A/B/C/G ran on 2026-05-17 and gates passed.
- Remaining Phase 3 items: Product read-model/webhook/backfill for DOM-only slug fallback and fresh product names, StorefrontJSScript schema reconciliation, loader/module cache headers and versioning, and script lifecycle hardening. Plus two deferred Phase 2 polish items: a visibility filter for the hidden `passive` search-container badge, and a merchant onboarding note for the theme's native review block.
- Structured data injection, review-request emails, CSV import/export, analytics, localization, and test coverage remain documented gaps.

## Read Next
- [[Current_Status]]
- [[Project_Overview]]
- [[Open_Questions]]
- [[Agent_Rules]]
- [[Wiki_Maintenance_Prompt]]
- [[Yotpo_Style_Widget_Modular_Architecture]]
- [[Phase_1_Widget_Runtime_Audit]]
- [[Phase_2_Widget_Module_Split_Plan]]
- [[ADR_0015_Canonical_Product_Identity]]
