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
  - "[[ADR_0015_Canonical_Product_Identity]]"
source_files:
  - "package.json"
  - "prisma/schema.prisma"
  - "src/widget/index.js"
  - "src/widget/observer.js"
  - "src/widget/core/link-scope.js"
  - "src/app/api/public/reviews/route.ts"
  - "src/app/api/public/upload/sign/route.ts"
  - "src/app/api/public/upload/register/route.ts"
  - "src/lib/review-images.ts"
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
- Widget hardening reference chain: [[Yotpo_Style_Widget_Modular_Architecture]], [[ADR_0013_Modular_Widget_Loader_Architecture]], [[Phase_1_Widget_Runtime_Audit]], [[Phase_2_Widget_Module_Split_Plan]], [[Ikas_Storefront_Events]], [[Ikas_Storefront_Script_Capabilities]].
- 2026-05-17: Phase 2 module split is closed. `public/widget.js` is now the small classic loader; hashed ESM chunks live under `public/widget-runtime/*`; `VIEW_SEARCH_RESULTS` is handled; Ozy listing placement is in the fallback adapter.
- 2026-05-17: [[ADR_0015_Canonical_Product_Identity]] implemented. Listing/search badges use `productDetails[].id` and `/api/public/ratings?productIds=...`; `ratings-by-slug` is DOM-only fallback. `ProductSnapshot` is maintained by install backfill, manual sync, and ikas product webhooks.
- 2026-05-17: OAuth install runs product backfill with Next.js `after()` post-response while webhook registration remains awaited. `ProductSnapshot.deleted` was removed; slug fallback chooses the freshest snapshot.
- 2026-05-17/18: ADR_0013 Phase 3 hardening landed: non-destructive storefront script create/update, daily script reconcile, deterministic hashed runtime, hidden-link filtering, observer cleanup, Sentry flood cap, and stale chunk pruning.
- 2026-05-18: Public review API hardening landed: `POST /api/public/reviews` verifies installed store + `(storeId, productId)` in `ProductSnapshot`, ignores client identity snapshots, and `GET /api/public/reviews` returns a public whitelist.
- 2026-05-18: Settings stale TTL is 24h; O1/O8 listing badge work scopes DOM discovery and reserves badge space; live retest on `dev-mertcopper.ikas.shop` passed `/`, `/clothing`, `/premium-shorts`, and mobile `/clothing`.
- 2026-05-18: D4 rating reads now use a shared Upstash fixed-window limit of 300 requests/min/IP.
- 2026-05-18: D2 removed redundant Review prefix indexes; D3 scopes new Cloudinary review images to `review_images/stores/<storeId>` across sign/register/validate/render/commit.
- Context7 helps for current Playwright/Sentry/Next.js docs. ikas contracts still require ikas docs/MCP and live storefront evidence.

## Current Risks / Open Questions
- Remaining Phase 3 follow-ups: verify lifecycle/cache behavior after deploy, re-measure deployed widget transfer size, and document merchant onboarding for disabling the theme's native review block.
- Ozy outside-theme placement remains adapter/admin-theme-selection work pending ikas theme detection answer.
- Structured data injection, review-request emails, CSV import/export, analytics, localization, and test coverage remain documented gaps.

## Read Next
- [[Current_Status]]
- [[Project_Overview]]
- [[Open_Questions]]
- [[Agent_Rules]]
- [[Wiki_Maintenance_Prompt]]
- [[ADR_0015_Canonical_Product_Identity]]
