---
type: context
project: ikas-review-app
status: active
created: 2026-05-13
updated: 2026-05-18
last_verified: 2026-05-18
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
  - "src/lib/storefront-scripts.ts"
  - "src/app/api/admin/daily-maintenance/route.ts"
---

# Hot Context

## Current Focus
- ikas review/rating app: merchant admin, storefront widget, review submission, image upload, moderation, settings preview.
- Current focus: ADR_0013 Phase 3 source hardening is implemented; post-deploy storefront/Sentry verification and broader product gaps remain.

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
- 2026-05-17: Storefront script URL generation uses `STOREFRONT_WIDGET_BASE_URL` via [storefront-widget-url.ts](src/lib/storefront-widget-url.ts); `NEXT_PUBLIC_DEPLOY_URL` stays the app/OAuth URL.
- 2026-05-17: [[ADR_0015_Canonical_Product_Identity]] accepted and implemented. Listing/search badges map `productDetails[].id` to slugs and call `/api/public/ratings?productIds=...`; `ratings-by-slug` is DOM-only fallback. Added `ProductSnapshot` read model, ikas product webhook + install/manual backfill, and the `[storeId, productId, status]` index.
- 2026-05-17: OAuth install no longer blocks on product backfill — `syncAllProductsForStore` runs via Next.js `after()` post-response (webhook registration stays awaited). See [[Auth_And_Installation_Flow]].
- 2026-05-17: Removed dead `ProductSnapshot.deleted` column + index; `ratings-by-slug` slug→productId resolution is now deterministic (freshest snapshot wins).
- 2026-05-17: ADR_0013 Phase 3 source hardening landed: script lifecycle is non-destructive create/update only (no zero-argument `deleteStorefrontJSScript`), daily maintenance now runs storefront-script reconcile, production widget builds use a deterministic hashed `runtime-*.js` with `runtime.js` kept as a short-cache compatibility shim, and hidden listing links are filtered before badge injection.
- 2026-05-18: Public review API hardening landed: `POST /api/public/reviews` verifies installed store + `(storeId, productId)` in `ProductSnapshot`, ignores client `slug`/`productName`/`email`, and `GET /api/public/reviews` returns a public whitelist instead of raw Review rows.
- 2026-05-18: O3 settings cache hardening: widget-side stale settings tolerance dropped from 7 days to 24 hours; transient outages still use same-tab stale fallback, but merchant setting changes cannot remain masked for a week.
- 2026-05-18: O1/O8 listing badge hardening landed: scoped DOM link discovery now starts from theme product containers/main content instead of every document link, and invisible badge placeholders reserve vertical space while ratings load.
- Context7 is useful for current Playwright/Sentry/Next.js docs that affect test method or fixes. ikas contracts still require ikas docs/MCP and live storefront evidence.

## Current Risks / Open Questions
- ADR_0013 Phase 1 runtime audit is recorded in [[Phase_1_Widget_Runtime_Audit]]; A/B/C/G ran on 2026-05-17 and gates passed.
- Remaining Phase 3 follow-ups: verify the new lifecycle/cache behavior after deploy, re-measure deployed widget transfer size, and document merchant onboarding for disabling the theme's native review block. `listStorefrontJSScript` remains an ikas contract watch item; source intentionally avoids destructive cleanup while MCP/docs disagree.
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
