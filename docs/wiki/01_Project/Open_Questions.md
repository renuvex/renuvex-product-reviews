---
type: status
project: ikas-review-app
status: active
created: 2026-05-05
updated: 2026-05-15
last_verified: 2026-05-15
confidence: medium
tags:
  - questions
  - uncertainty
related:
  - "[[Index]]"
  - "[[Current_Status]]"
  - "[[Roadmap]]"
  - "[[Yotpo_Style_Widget_Modular_Architecture]]"
  - "[[Ikas_Storefront_Script_Capabilities]]"
source_files: []
---

# Open Questions

> Anything uncertain about scope, architecture, or implementation. Resolve and either delete or convert to an ADR.

## Wiki prompt folder numbering
The second-brain setup template names reusable agent procedures under `08_Prompts`, but this repo already uses `08_Widgets` for widget domain memory and `09_Prompts` for AI workflows. The migration kept `09_Prompts` canonical to avoid duplicating or moving existing pages. Decide later whether a deliberate folder renumbering cleanup is worth the churn.

## Q&A widget scope
The `qa` widget id is registered in `WidgetDef`, but the storefront and submission flow are unclear from the codebase scan. **Before adding any DB tables**, decide: separate `Question` model, or reuse `Review` with a `kind` column? Will customers answer or only the merchant?

## Carousel / Popup widgets
`carousel` and `popup` widget ids exist in `WidgetDef`. Need to confirm whether they ship today or are scaffolds. Read [src/widget/product-widget/](src/widget/product-widget/) and [src/widget/listing-badges/](src/widget/listing-badges/) before extending.

## Yotpo-style modular loader decisions
The 2026-05-15 Protein Ocean/Yotpo research supports a one-loader/many-widget-modules architecture. Before implementing it, decide:
- Should the existing `widget.js` remain a compatibility alias while new installs receive `loader.js`?
- Which widgets are first-class modules: rating badge, reviews main, listing badge, media gallery, Q&A, review form, schema?
- What is the stable placeholder contract for `data-ikr-widget` and `data-ikr-product-id`?
- Should theme adapter selection be explicit merchant config, automatic runtime detection, or both?

Reference: [[Yotpo_Style_Widget_Modular_Architecture]]

## ikas storefront script reconciliation
Official ikas docs expose listable Storefront JS scripts, but the current project does not define `listStorefrontJSScript`. Current install logic relies on DB-tracked script ids and has risky cleanup behavior when the DB script map is empty. Decide the safe reconciliation flow before changing script lifecycle code.

Reference: [[Ikas_Storefront_Script_Capabilities]]

## Structured data injection mechanism
Two approaches for JSON-LD aggregateRating:
1. Widget.js writes a `<script type="application/ld+json">` into the product DOM. Pro: zero theme changes. Con: bots might not execute JS / late.
2. Server-rendered include — merchant adds an ikas theme snippet that fetches our endpoint server-side. Pro: SEO-friendly. Con: requires merchant theme edit.
Need to test which Google actually reads on ikas storefronts.

## Multi-storefront settings
ikas merchants can have multiple storefronts (e.g. locale variants). Today, `WidgetSettings` is keyed by `(storeId, widgetId)` only, not by storefrontId. The widget script DOES carry `storefrontScripts: Json` per storefront. Decide whether settings should fork per storefront or stay global.

## Token storage TTL
`AuthToken` rows are upserted on install; `expiresIn` honored via `onCheckToken` refresh. Is there a cleanup for stale tokens (uninstalled apps)? `prisma.authToken.deleteMany({ where: { merchantId } })` runs on re-install, but what about merchants who simply uninstall? Need an ikas-side webhook or cron sweep.

## OAuth scope correctness
Current scope: `read_orders,write_orders,read_products,read_inventories,write_inventories`. Why does a review app need `write_orders` / `write_inventories`? Likely starter-template inheritance. Tightening scope reduces install friction and audit risk.

## Profanity filter
Hard-coded list in [src/app/api/public/reviews/route.ts](src/app/api/public/reviews/route.ts). Maintainable? Move to config or Redis? Add per-merchant blocklist?

## Test coverage
No tests visible in repo. Highest-risk surface is the public POST `/api/public/reviews`. At minimum, validation matrix + profanity + rate-limit happy path / 429 path.

## Theme variant strategy
`pnpm build:widget --theme=new-theme` produces a separate bundle. How is the right theme bundle picked at runtime? Is `widget-new-theme.js` ever auto-injected, or is it manual? See [scripts/build-widget.mjs](scripts/build-widget.mjs).

## Image lifecycle
- Upload happens via Cloudinary signed direct upload from widget.
- Cleanup runs weekly via `/api/admin/cleanup-images` to remove orphans.
- Question: what if a review is rejected before approval — does its uploaded image get cleaned up? Is the cleanup safe-listing only `approved` review images, or all linked images?
- Question (2026-05-11): cleanup cron'un tetiklenme mekanizması (Vercel cron / external scheduler / manuel)? [[Bug_Review_Image_Error_Fallback]] içindeki 1-7 günlük orphan penceresi bu cevaba bağlı; daha sık tetiklenirse storefront kırık-image riski azalır.

## CORS
`Access-Control-Allow-Origin: *` on public APIs. Reasonable for read; for POST `/api/public/reviews` consider whether request-origin allowlisting (per merchant configured storefront domains) would meaningfully improve abuse resistance.

## Stale references in pre-existing docs (Needs Verification)
Discovered while reconciling existing AI rule files (see [[Existing_AI_Rules_And_Ikas_CLI_Instructions]]):

- **Next.js version drift** — `package.json` is `next: 16.2.1`. `/AGENTS.md` was updated during the 2026-05-13 second-brain migration, but `README.md`, `/CLAUDE.md`, and any generated Cursor/Ruler outputs may still say "Next.js 15". Decision needed: should we run `pnpm apply:ai-rules` and update generated/local rule files in a separate rules-sync task?
- **Theme variant gap** — `scripts/build-widget.mjs` accepts `--theme=new-theme` and aliases imports to `themes/new-theme/...`, but **no `themes/new-theme/` directory exists**. `.proje-dokuman.md` references both `themes/default/` and `themes/new-theme/` as if they ship — they don't; only `themes/ozy/` is on disk. Was new-theme dropped, never built, or planned?
- **Helpful feature in `.proje-dokuman.md`** — the Turkish project doc still describes `helpfulCount`, `/api/public/reviews/[id]/helpful`, and a 24h/IP rate limit for it. The `helpful` feature was added then **removed** in migrations 20260408060000 + 20260417000000. The doc should be updated or marked deprecated.
- **Two CLAUDE.md files coexist** — `/CLAUDE.md` (Ruler-generated, gitignored) and the worktree-local `CLAUDE.md` created by this wiki seed (also gitignored). Decide a single source-of-truth strategy: (a) treat `/AGENTS.md` as source and let Ruler regenerate `CLAUDE.md`, then delete worktree CLAUDE.md, OR (b) ungitignore CLAUDE.md and merge into a tracked file. Affects all new contributors.

## Existing-rules verification needed
- **OAuth scope justification** — existing `/CLAUDE.md` doesn't justify the broad scope (`read_orders,write_orders,read_products,read_inventories,write_inventories`). For ikas App Store submission, we'll need to pare it down — see [[Ikas_App_Store_Requirements]].
- **`@ikas/admin-api-client` v2** — existing rules / docs assume v2 GraphQL client API (`ikasClient.queries.<name>()`). Pinned at `^2.0.11`. If a major version bump is published, the wrapper API may change.
- **`pnpm apply:ai-rules` workflow** — Ruler is configured but `.ruler/` only contains `ruler.toml` (no source `.md` file). The Ruler source appears to be `/AGENTS.md` (root). Confirm by reading Ruler docs or running `pnpm apply:ai-rules` and seeing what it does.

## Obsidian Links
- [[Current_Status]]
- [[Roadmap]]
- [[Decision_Index]]
- [[Existing_AI_Rules_And_Ikas_CLI_Instructions]]
