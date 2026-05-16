---
type: log
project: ikas-review-app
status: active
created: 2026-05-13
updated: 2026-05-17
last_verified: 2026-05-17
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
