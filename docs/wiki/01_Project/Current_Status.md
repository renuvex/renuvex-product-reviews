---
type: status
project: ikas-review-app
status: active
created: 2026-05-05
updated: 2026-05-05
tags:
  - status
related:
  - "[[Index]]"
  - "[[Project_Overview]]"
  - "[[Roadmap]]"
  - "[[Open_Questions]]"
---

# Current Status — ikas Review App

## Current Phase
Active development. Core feature set is functional end-to-end: OAuth install, widget injection, public review submission with moderation, admin dashboard, widget customization with live preview. Recent work has focused on **widget customization controls** — color settings (basic/advanced tiers), brand presets, layout-aware setting visibility, form step bar color. See recent commits.

## Working Features
- OAuth install flow for ikas merchants — code-signature validation, token exchange, JWT issuance, session cookie
- Auto-injection of widget script into every merchant storefront on install
- Manual re-injection via `/api/admin/inject-scripts` (button in admin)
- Storefront widget bundle (`/public/widget.js`, ~165 KB) with:
  - Product review widget (form + listing) with multiple review-layouts (card, gallery, list) and summary-layouts (classic, compact, hero, minimal, split)
  - Product rating badge (small inline star+count)
  - Listing-page rating badges (auto-discovers product cards on collection pages)
  - Mutation observer for SPA-style theme navigation
- Public review submission API:
  - Profanity filter (TR + EN)
  - IP-based rate limit (3 reviews / 10 min via Upstash Redis)
  - Image upload via Cloudinary signed direct-upload (10 uploads / 10 min limit)
  - Auto-approve modes: `manual` / `4plus` / `5stars` / `all`
  - Author masking on output (`Mert W.`)
- Admin dashboard:
  - Review list with status filter, pagination, replies, delete
  - Widget editor with per-widget settings panel and live iframe preview at `/preview`
  - Settings persistence in `WidgetSettings` (one row per `(storeId, widgetId)`)
- Caching: public GETs use `s-maxage=60, stale-while-revalidate=300` at the edge
- Weekly Cloudinary cleanup cron (`/api/admin/cleanup-images`, Mondays 03:00 UTC)
- Theme variant build: `pnpm build:widget --theme=new-theme` produces a separate bundle (`widget-new-theme.js`)

## In Progress
- Widget color settings refinement — basic vs advanced tiers, brand presets (recent commits 346dd3e, 2e18390, 724fa2a)
- Form-step bar color (commit 55db39c)
- Load-more button border consistency (commit 9e03713)

## Known Issues / Gaps
- No structured-data (JSON-LD) injection yet — see [[Structured_Data_And_Rich_Snippets]] and [[Open_Questions]]
- No review-request emails / post-purchase triggers
- No CSV import/export of reviews
- No analytics dashboard (review volume over time, conversion lift, etc.)
- No multi-language storefront UI (widget is Turkish-only; settings labels Turkish)
- Q&A widget (`qa` id in `WidgetDef`) is registered but implementation status unconfirmed — flag in [[Open_Questions]]
- Carousel/popup widgets similar — registered IDs but implementation depth unknown without further read
- No automated tests visible in repo (no `__tests__` / `test/` / vitest config found at top level) — flag for [[Open_Questions]]

## Important Decisions
- [[ADR_0001_Project_Stack]] — Next.js 16 App Router + Prisma + Postgres (Supabase)
- [[ADR_0002_Widget_Injection_Strategy]] — single bundled widget.js injected via ikas StorefrontJSScript
- [[ADR_0003_Review_Data_Model]] — denormalized Review table; storeId = merchantId; slug + status indexes
- [[ADR_0004_Ikas_Integration_Strategy]] — OAuth via @ikas/admin-api-client + Codegen GraphQL operations

## Next Recommended Steps
1. Add JSON-LD structured-data injection on product pages (Google rich snippets) — see [[Structured_Data_And_Rich_Snippets]]
2. Implement review-request email flow (post-purchase delay + token-gated submit URL)
3. Decide and document Q&A widget scope before adding fields to schema (see [[Open_Questions]])
4. Add CSV import/export for reviews
5. Build a minimal analytics view in admin (counts, average rating trend)
6. Consider tests for the public submission endpoint (highest blast-radius surface)

## Last Updated
2026-05-05
