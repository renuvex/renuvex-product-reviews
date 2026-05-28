---
type: status
project: renuvex-product-reviews
status: active
created: 2026-05-05
updated: 2026-05-28
last_verified: 2026-05-28
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
  - "[[Widget_Architecture_Audit]]"
source_files: []
---

# Open Questions

> Anything uncertain about scope, architecture, or implementation. Resolve and either delete or convert to an ADR.

## Wiki prompt folder numbering
The second-brain setup template names reusable agent procedures under `08_Prompts`, but this repo already uses `08_Widgets` for widget domain memory and `09_Prompts` for AI workflows. The migration kept `09_Prompts` canonical to avoid duplicating or moving existing pages. Decide later whether a deliberate folder renumbering cleanup is worth the churn.

## Q&A widget scope
The `qa` widget id is registered in `WidgetDef`, but the storefront and submission flow are unclear from the codebase scan. **Before adding any DB tables**, decide: separate `Question` model, or reuse `Review` with a `kind` column? Will customers answer or only the merchant?

## Carousel / Popup widgets
`carousel` and `popup` widget ids exist in `WidgetDef`. Need to confirm whether they ship today or are scaffolds. Read [src/widget/reviews-section/](src/widget/reviews-section/) and [src/widget/listing-badges/](src/widget/listing-badges/) before extending.

## Yotpo-style modular loader decisions
The 2026-05-15 Protein Ocean/Yotpo research supports a one-loader/many-widget-modules architecture. Before implementing it, decide:
- Should the existing `widget.js` remain a compatibility alias while new installs receive `loader.js`?
- Which widgets are first-class modules: rating badge, reviews main, listing badge, media gallery, Q&A, review form, schema?
- What is the stable placeholder contract for `data-renuvex-widget` and `data-renuvex-product-id`?
- Should theme adapter selection be explicit merchant config, automatic runtime detection, or both?

Reference: [[Yotpo_Style_Widget_Modular_Architecture]]

## Theme adapter coverage - partially resolved, ongoing per-theme work
The old "Ozy hard-coded" audit risk is superseded. Current code resolves the active
theme server-side with `listStorefront.themes[].isMainTheme`, persists stable/pending
state in `StoreSettings.storefrontTheme`, and exposes only public
`runtime.themeAdapterKey/source` to the widget. `themes/current-adapter.js` then selects
`ozy` or `generic`.

Still open: each supported non-Ozy theme needs a stable `themeId` mapping, adapter files,
selector spec, and smoke test. ikas still does not expose official public DOM slots, and
planned ikas Studio `data-*` attributes are not broad enough to rely on today.

Detail: [[Theme_Adapter_Playbook]], [[Ikas_Theme_Limitations]],
[[Ikas_Storefront_Script_Capabilities]].

## Unknown-theme widget visibility policy — RESOLVED 2026-05-27
**Resolved by [[ADR_0022_Placement_Allowlist_And_Lazy_Resync]].** The two-layer policy
shipped exactly as proposed: `autoPlacementEnabled` gates PDP / listing / modal badges
on `adapterMatchedBy === 'theme_id'` AND non-generic adapter; `reviewsMountEnabled`
acts as a backend kill-switch for the explicit-mount review section (true whenever
active-theme metadata exists). Both flags are emitted by `buildPublicThemeRuntime`,
consumed by the widget through `themes/current-adapter.js`, and gating points live in
`rating-badge.js`, `listing-badges/inject.js`, and `render.js findReviewsMount`. The
admin warning UI for unsupported themes is **deferred** as a follow-up — the runtime
signal is already in place (`adapterSource === 'generic_unknown'`), it just needs a
dashboard surface.

## ikas storefront theme webhook (parallel feature request)
ikas Admin API has no `store/theme/*` webhook scope (introspected 2026-05-27 — only 10
scopes exist, all under `store/order/*`, `store/product/*`, `store/customer/*`,
`store/customerFavoriteProducts/*`, `store/stock/*`). Shopify offers `THEMES_PUBLISH`
which the global review-app ecosystem keys off; ikas's gap forced [[ADR_0022_Placement_Allowlist_And_Lazy_Resync]]
to use a pull-model lazy resync instead. Open a feature request to ikas; if a theme
webhook ships, layer it as a third sync trigger (`reason: 'webhook'`) alongside the
existing lazy resync path.

## `VIEW_LISTING` undocumented ikas event — ikas-blocked (audit finding O6)
`core/storefront-context.js` depends on the `VIEW_LISTING` Storefront Event for
category-page product arrays. `VIEW_LISTING` is **runtime-verified** (Phase 1 audit) but is
**not in the official Storefront Events docs** (which list `VIEW_CATEGORY` /
`VIEW_SEARCH_RESULTS`, not `VIEW_LISTING`).
- **Risk:** it works today, but it is not a documented contract — ikas could rename/remove
  it without notice; category listing badges would then stop populating from events
  (the DOM-slug fallback only partially covers this).
- **To unblock — ask ikas:** is `VIEW_LISTING` a supported, stable event? If not, what is
  the documented way to read the category product array? If ikas will not guarantee it,
  harden the `VIEW_CATEGORY` + DOM fallback path.
- Detail: [[Widget_Architecture_Audit]] (O6), [[Ikas_Storefront_Events]].

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

## Test coverage - partially resolved, ongoing by feature
The old "no tests visible" gap is superseded by [[Test_Strategy]]. Current automation covers widget network/chunk contracts, layout/runtime smoke, lightbox + review wizard flows, admin preview/settings behavior, public API route branches, and storefront theme-state helpers.

Still open: real authenticated ikas dashboard iframe smoke, live post-deploy dev-store smoke, Sentry post-deploy health checks, transfer-size budgets, and new-feature-specific coverage for future carousel/FAQ/Q&A/popup surfaces.

## Theme variant strategy
`pnpm build:widget --theme=new-theme` produces a separate bundle. How is the right theme bundle picked at runtime? Is `widget-new-theme.js` ever auto-injected, or is it manual? See [scripts/build-widget.mjs](scripts/build-widget.mjs).

## Image lifecycle
- Upload happens via Cloudinary signed direct upload from widget.
- Cleanup runs daily through `/api/admin/daily-maintenance`, with monthly `/api/admin/cleanup-images` fallback for assets that bypassed the registry.
- Question: what if a review is rejected before approval — does its uploaded image get cleaned up? Is the cleanup safe-listing only `approved` review images, or all linked images?
- Question (2026-05-11): cleanup cron'un tetiklenme mekanizması (Vercel cron / external scheduler / manuel)? [[Bug_Review_Image_Error_Fallback]] içindeki 1-7 günlük orphan penceresi bu cevaba bağlı; daha sık tetiklenirse storefront kırık-image riski azalır.

## CORS
`Access-Control-Allow-Origin: *` on public APIs. Reasonable for read; for POST `/api/public/reviews` consider whether request-origin allowlisting (per merchant configured storefront domains) would meaningfully improve abuse resistance.

## Stale references in pre-existing docs (Needs Verification)
Discovered while reconciling existing AI rule files (see [[Existing_AI_Rules_And_Ikas_CLI_Instructions]]):

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
