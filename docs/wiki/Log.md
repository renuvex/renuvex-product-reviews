---
type: log
project: ikas-review-app
status: active
created: 2026-05-13
updated: 2026-05-18
last_verified: 2026-05-18
confidence: high
tags:
  - log
  - project-memory
related:
  - "[[Index]]"
  - "[[Hot_Context]]"
source_files:
  - "AGENTS.md"
  - "docs/wiki/Index.md"
  - "scripts/wiki-audit.mjs"
---

# Project Log

## 2026-05-18 - security | Harden public review submit/read contract
- Summary: `POST /api/public/reviews` now verifies the submitted target against installed `StoreSettings` and `(storeId, productId)` in `ProductSnapshot`, ignores public `slug`/`productName`/`email`, and stores slug/name snapshots from the server-side product read model.
- Reason: The public storefront is CORS-open and browser-controlled, so product identity and response fields must not be trusted from client payloads.
- Key source changes: `src/app/api/public/reviews/route.ts` target verification, public response whitelist, minimal create response.
- Verification: `pnpm exec prisma validate` and `pnpm exec tsc --noEmit`.
- Updated wiki: [[Backend_API_Map]], [[Important_Files]], [[Security_And_Rate_Limits]], [[Hot_Context]]

## 2026-05-17 - docs | Migration safety (expand/contract) rule
- Summary: Documented the deploy-window migration rule — `prisma migrate deploy` runs during the Vercel build while the old deployment still serves, so breaking schema changes (drop/rename column, add `NOT NULL`, etc.) must use expand/contract across two deploys; additive changes stay single-deploy.
- Reason: A single-deploy breaking migration causes a ~1-3 min window where the new schema and old code mismatch. Harmless at one test store, but a real risk under live multi-merchant traffic.
- Changes: `### Migration safety` subsection in [[Database_Map]]. Local generated `AGENTS.md` + `CLAUDE.md` were edited too, but they are gitignored Ruler outputs and are not repository-durable. Follow-up code hardening also made slug fallback ordering fully deterministic and clears snapshots if ikas ever returns `deleted: true` products.

## 2026-05-17 - cleanup | Remove dead ProductSnapshot.deleted field
- Summary: Removed the unused `ProductSnapshot.deleted` column and `[storeId, slug, deleted]` index, and made the `ratings-by-slug` slug→productId resolution deterministic.
- Reason: ikas exposes no `store/product/deleted` webhook scope and `listProduct` excludes deleted products, so `deleted` was always false (prod: 0 of 32 rows true) and `[storeId, slug]` was a redundant prefix index. The fallback's `slugToProductId` map used non-deterministic first-write-wins when a slug mapped to multiple snapshots.
- Key source changes: `prisma/schema.prisma`, migration `20260517160000_remove_product_snapshot_deleted`, `src/lib/product-snapshots.ts`, `src/app/api/public/ratings-by-slug/route.ts` (drop `deleted` filter, add `orderBy: { lastSyncedAt: 'desc' }`).
- Verification: `pnpm prisma:generate`, `pnpm exec prisma validate`, `pnpm exec tsc --noEmit` passed.
- Updated wiki: [[Database_Schema]], [[Hot_Context]]

## 2026-05-17 - fix | Non-blocking OAuth install product backfill
- Summary: The OAuth callback no longer blocks the install redirect on the full product backfill. `syncAllProductsForStore` now runs inside Next.js `after()` (post-response); product webhook registration stays awaited (a single `saveWebhooks` mutation).
- Reason: `await syncAllProductsForStore` ran on the callback's critical path before JWT issue + 302 redirect. For a large catalog the sequential paginated sync could exceed the serverless function timeout and abort the whole install (no JWT, no redirect) — the surrounding `try/catch` cannot catch a platform-level timeout.
- Key source change: `src/app/api/oauth/callback/ikas/route.ts` — `after` import plus wrapping the backfill call.
- Verification: `pnpm exec tsc --noEmit` passed.
- Effect: install latency is now independent of catalog size; an interrupted backfill is recovered by product webhooks or `POST /api/admin/sync-products`.
- Updated wiki: [[Auth_And_Installation_Flow]], [[ADR_0015_Canonical_Product_Identity]], [[Backend_API_Map]], [[Hot_Context]]

## 2026-05-17 - implementation | ProductSnapshot webhook/backfill layer
- Summary: Implemented the ADR_0015 completeness layer. Added `ProductSnapshot`, ikas product webhook registration/receiver, install-time and manual backfill, and snapshot-backed slug fallback.
- Key source changes: `src/lib/product-snapshots.ts`, `/api/webhooks/ikas/products`, `/api/admin/sync-products`, OAuth callback webhook/backfill hook, `ratings-by-slug` snapshot resolution, `listProductsForSync` and `saveProductWebhooks` GraphQL operations/codegen, and Prisma migration `20260517133000_add_product_snapshot`.
- Verification: `pnpm codegen`, `pnpm prisma:generate`, `pnpm exec prisma validate`, `pnpm exec tsc --noEmit`, scoped ESLint, and `pnpm build:widget` passed.

## 2026-05-17 - implementation | ADR_0015 canonical product identity
- Summary: Implemented product-id listing/search badge reads for the Storefront Events path. The widget now maps listing/search `productDetails[].id` to visible slugs and calls `/api/public/ratings?productIds=...`; `/api/public/ratings-by-slug` remains a DOM-only fallback.
- Key source changes: new `src/app/api/public/ratings/route.ts`, `ikrProductMap` in widget state/context, product target collection in `listing-badges/collect.js`, product-id-first fetch logic in `listing-badges/ratings.js`, rebuilt `public/widget.js` and ESM chunks, plus the `[storeId, productId, status]` Prisma index/migration.
- Verification: `pnpm build:widget`, scoped `pnpm exec eslint <changed files>`, `pnpm exec tsc --noEmit`, and `pnpm exec prisma validate` passed. `pnpm prisma:generate` hit a Windows DLL rename `EPERM` while a Node/Next process held Prisma's query engine; schema-only index change does not require generated type changes, but retry after stopping dev processes.
- Follow-up: Completed by the ProductSnapshot webhook/backfill layer later on 2026-05-17.

## 2026-05-17 - implementation | ADR_0013 Phase 2 module split
- Summary: Started the Phase 2 physical module split without changing the ikas script contract. `public/widget.js` is now a small classic compatibility loader and `public/widget-runtime/*` contains the ESM runtime/chunks.
- Key source changes: `scripts/build-widget.mjs`, `src/widget/classic-loader.js`, `src/widget/core/lazy-modules.js`, `src/widget/core/settings.js`, async registry mounts, lazy `reviews-main` / `listing-badge` surfaces, `VIEW_SEARCH_RESULTS` listing handling, Ozy fallback adapter, and regenerated `public/widget-runtime/build-manifest.json`.
- Verification so far: `pnpm build:widget` passed; manifest boundary assertion passed; `git diff --check` passed; scoped `pnpm exec eslint <changed widget/build files>` passed. `pnpm lint` is not currently a valid gate because `next lint` fails under the repo's Next.js 16 setup.
- Not closed yet: live dev-store browser/network verification and Sentry post-test checks from [[Phase_2_Widget_Module_Split_Plan]] are still required before Phase 2 is marked done.

## 2026-05-17 - planning | ADR_0013 Phase 2 module split plan
- Summary: Added the durable Phase 2 implementation and verification checklist for moving from the Phase 1 in-bundle registry to real lazy-loaded widget modules.
- New wiki page: [[Phase_2_Widget_Module_Split_Plan]]
- Key decisions: keep `widget.js?publicApiKey=...` backward-compatible; use a classic loader plus ESM runtime/chunks unless ikas `type="module"` script loading is proven; add `VIEW_SEARCH_RESULTS` handling; move Ozy selectors into an explicit theme adapter/fallback contract.
- Context7 note: checked `/evanw/esbuild`; code splitting requires `format: "esm"`, `splitting: true`, and `outdir`, and dynamic `import()` creates lazy chunks.
- No application source code changed.

## 2026-05-17 - verification + bugfix | ADR_0013 Phase 1 runtime verification
- Summary: Ran the Phase 1 widget runtime audit on the live dev store (`dev-mertcopper.ikas.shop`) — F.3–F.6 plus audits A/B/C/G from [[Phase_1_Widget_Runtime_Audit]]. Method: Playwright + read-only `IkasEvents` probe + Sentry post-test check.
- Result: PDP render, SPA-nav cleanup, listing badges, MutationObserver re-mount, and badge placement all passed; no double render; Sentry clean (0 new issues). `VIEW_LISTING` confirmed a real runtime event carrying `productDetails[]` — the ADR_0013 open item is resolved, no code change. Search pages emit `VIEW_SEARCH_RESULTS` (same shape) which the widget does not yet handle — logged as a Phase 2 item.
- Bug fixed: [[Bug_Listing_Badge_Stars_Direct_Load]] — listing badge stars rendered 0×0 on cold direct entry to home/category/search because `#ikr-styles` (carrying the `.ikr-star` display rule) was injected only by the PDP `render.js` path. Fix: extracted `PARTIAL_STARS_CSS` as one source of truth and added `ensureBadgeStyles()` so the badge factory self-injects `#ikr-badge-styles`. Pre-existing bug, not an ADR_0013 regression.
- Changed source files: `src/widget/core/helpers.js`, `src/widget/themes/ozy/styles.js`, `src/widget/core/badge.js`, `public/widget.js` (rebuilt via `pnpm build:widget`).
- Updated wiki pages: [[Bug_Listing_Badge_Stars_Direct_Load]], [[Bug_Index]], [[Phase_1_Widget_Runtime_Audit]], [[Ikas_Storefront_Events]], [[ADR_0013_Modular_Widget_Loader_Architecture]], [[Listing_Rating_Widget]], [[Hot_Context]]

## 2026-05-17 - research | Phase 1 widget runtime audit checklist
- Summary: Added an evidence checklist for closing ADR_0013 Phase 1 before Phase 2. It separates confirmed ikas docs/MCP facts from runtime behavior that still needs dev-store verification.
- New wiki page: [[Phase_1_Widget_Runtime_Audit]]
- Updated wiki pages: [[ADR_0013_Modular_Widget_Loader_Architecture]], [[Yotpo_Style_Widget_Modular_Architecture]], [[Ikas_Storefront_Events]], [[Ikas_Storefront_Script_Capabilities]], [[Index]], [[Hot_Context]]
- Key uncertainty: official Storefront API docs and current ikas MCP expose different StorefrontJSScript operation shapes; runtime `VIEW_LISTING` remains unproven against official `VIEW_CATEGORY` / `VIEW_SEARCH_RESULTS` docs.
- Context7 note: checked `/microsoft/playwright` and `/getsentry/sentry-javascript` for current Phase 1 test/triage practices. Context7 should support Playwright/Sentry/Next.js mechanics, not replace ikas docs/MCP/runtime evidence.
- No application source code changed.

## 2026-05-16 - reference | ikas Storefront Events official docs captured
- Summary: Saved the official ikas Storefront Events documentation (event types, page types, payload shapes, JS example, query-param usage) as a wiki reference page.
- New wiki page: [[Ikas_Storefront_Events]]
- Updated wiki pages: [[Index]]
- Source: <https://builders.ikas.com/docs/storefront-events/events>
- Note: flagged that current code uses `VIEW_LISTING` while official docs list `VIEW_CATEGORY` / `VIEW_SEARCH_RESULTS` — needs runtime verification.

## 2026-05-16 - research | ikas developer feedback on storefront script integration
- Summary: Recorded a direct ikas developer answer about single-loader architecture, theme selectors, and script ordering.
- Key takeaways: single loader + multiple modules is an accepted ikas pattern; no official stable ids / `data-*` attributes for page areas today; Storefront Events is the supported page/product context mechanism; standard `data-*` attributes are planned (ikas Studio) but not yet broadly available; `isHighPriority` + `order` control load order relative to Facebook/Google scripts.
- Updated wiki pages: [[Ikas_Storefront_Script_Capabilities]] (new "ikas Developer Feedback — 2026-05-16" section), [[Yotpo_Style_Widget_Modular_Architecture]] (Open Questions)
- Decision direction: use Storefront Events for context; treat theme-class selectors as a temporary fallback only, not the architecture; plan migration to ikas `data-*` attributes when broadly available.
- No application source code changed.

## 2026-05-15 - research | Yotpo-style widget architecture on ikas
- Summary: Added read-only research and architecture notes from Protein Ocean's Yotpo installation on an ikas storefront, plus ikas StorefrontJSScript capability notes.
- Updated wiki pages: [[Index]], [[Hot_Context]], [[Yotpo]], [[Ikas_Widget_Injection_Notes]], [[Widget_Architecture]], [[Storefront_Widget_Overview]], [[Widget_Performance]]
- New wiki pages: [[Yotpo_Protein_Ocean_Widget_Research]], [[Ikas_Storefront_Script_Capabilities]], [[Yotpo_Style_Widget_Modular_Architecture]]
- Key takeaway: ikas can support a Yotpo-like model, but this project should use one ikas-injected loader per storefront and lazy-load widget modules from its own runtime.
- Related files: `src/widget/*`, `scripts/build-widget.mjs`, `src/lib/ikas-client/graphql-requests.ts`, `src/app/api/admin/inject-scripts/route.ts`, `src/app/api/oauth/callback/ikas/route.ts`

## 2026-05-13 - maintenance | Second-brain setup migration
- Summary: Migrated the existing wiki memory system to the second-brain setup without moving or deleting existing docs.
- Updated wiki pages: [[Hot_Context]], [[Index]], [[Open_Questions]], [[Agent_Rules]], [[Documentation_Update_Prompt]], [[Wiki_Maintenance_Prompt]]
- Related files: `AGENTS.md`, `scripts/wiki-audit.mjs`, `scripts/wiki-secret-scan.py`, `scripts/wiki-prune-report.py`
- Related decision/bug/feature/problem: none
