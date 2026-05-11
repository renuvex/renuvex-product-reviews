---
type: status
project: ikas-review-app
status: active
created: 2026-05-05
updated: 2026-05-11
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
Active development. Core feature set is functional end-to-end. Recent work has focused on **UI/UX Polish and Visual Consistency**: synchronized button behaviors (align-items: stretch), standardized 20px vertical spacing (ferahlık), and refined tablet breakpoints (768px for Split layout). Most premium design details from industry leaders have been integrated into the Ozy theme. See recent commits.

## Working Features
- OAuth install flow for ikas merchants — code-signature validation, token exchange, JWT issuance, session cookie
- Auto-injection of widget script into every merchant storefront on install
- Manual re-injection via `/api/admin/inject-scripts` (button in admin)
- Storefront widget bundle (`/public/widget.js`, ~150 KB) with:
  - Product review widget (modal submission + listing) with multiple review-layouts (card, gallery, list) and summary-layouts (classic, compact, hero, minimal, split)
  - Photo strip above review list — dedicated newest-first fetch, cap 15, independent of sort/filter/load-more (see [[Photo_Strip]], [[ADR_0007_Photo_Strip_Cap_And_Rotation]])
  - Review fetch failures render a retryable error state instead of the normal empty-review state
  - Trusted review image policy has build-time fallback and last-valid widget cache so missing settings `cloudName` does not silently remove app-owned images
  - Photo review lightbox traps keyboard focus, exposes dialog semantics, and uses desktop/tablet/mobile responsive shells with mobile viewport-unit fallbacks
  - Product rating badge (small inline star+count)
  - Listing-page rating badges (auto-discovers product cards on collection pages)
  - Mutation observer for SPA-style theme navigation
- Public review submission API:
  - Profanity filter (TR + EN)
  - IP-based rate limit (3 reviews / 10 min via Upstash Redis)
  - Image upload via Cloudinary signed direct-upload (10 uploads / 10 min limit)
  - Trusted review image URL policy rejects third-party/data image URLs before storage and storefront render
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
- Legacy theme token cleanup — removed `bgColor`/`textColor`/`primaryColor`/`primaryTextColor` cascade from widget bundle; flattened CSS fallback chains in `styles.js` (commit aebbbbe)

## Known Issues / Gaps
- No structured-data (JSON-LD) injection yet — see [[Structured_Data_And_Rich_Snippets]] and [[Open_Questions]]
- No review-request emails / post-purchase triggers
- No CSV import/export of reviews
- No analytics dashboard (review volume over time, conversion lift, etc.)
- No multi-language storefront UI (widget is Turkish-only; settings labels Turkish)
- Q&A widget (`qa` id in `WidgetDef`) is registered but implementation status unconfirmed — flag in [[Open_Questions]]
- Carousel/popup widgets similar — registered IDs but implementation depth unknown without further read
- No automated tests visible in repo (no `__tests__` / `test/` / vitest config found at top level) — flag for [[Open_Questions]]
- Photo strip image render is now per-display-size optimized and P2 is closed: thumbnails use responsive `srcset`, native lazy/eager policy, async decoding, and explicit dimensions. Image error fallback (K2) is still tracked separately.

## Important Decisions
- [[ADR_0001_Project_Stack]] — Next.js 16 App Router + Prisma + Postgres (Supabase)
- [[ADR_0002_Widget_Injection_Strategy]] — single bundled widget.js injected via ikas StorefrontJSScript
- [[ADR_0003_Review_Data_Model]] — denormalized Review table; storeId = merchantId; slug + status indexes
- [[ADR_0004_Ikas_Integration_Strategy]] — OAuth via @ikas/admin-api-client + Codegen GraphQL operations
- [[ADR_0006_Trusted_Review_Image_URL_Policy]] — review image URLs must be trusted Cloudinary assets before storage or storefront render

## Next Recommended Steps
1. Add JSON-LD structured-data injection on product pages (Google rich snippets) — see [[Structured_Data_And_Rich_Snippets]]
2. Implement review-request email flow (post-purchase delay + token-gated submit URL)
3. Decide and document Q&A widget scope before adding fields to schema (see [[Open_Questions]])
4. Add CSV import/export for reviews
5. Build a minimal analytics view in admin (counts, average rating trend)
6. Consider tests for the public submission endpoint (highest blast-radius surface)

## Last Updated
2026-05-11

## Change Log
- 2026-05-11: Fixed silent review image loss when settings `imagePolicy.cloudName` is missing by adding a build-time public cloud fallback, last-valid widget image policy cache, and explicit fail-closed logging. Related bug: [[Bug_Cloud_Name_Silent_Image_Filter]].
- 2026-05-11: Added the photo lightbox responsive shell update: desktop two-column at `801px+`, stacked tablet/landscape at `641px-800px`, and fullscreen mobile with `vh` / `svh` / `dvh` fallbacks. Related bug: [[Bug_Lightbox_Tablet_Viewport_And_Scroll]].
- 2026-05-11: Added photo review lightbox focus trap and dialog semantics so `Tab` no longer reaches storefront controls while the modal is open. Related bug: [[Bug_Lightbox_Focus_Trap_Accessibility]].
- 2026-05-11: Added retryable storefront review fetch error state so API/network failures are no longer rendered as empty review lists. Related bug: [[Bug_Review_Fetch_Error_Empty_State]].
- 2026-05-11: Removed the remaining lightbox navigation known issue after card/list/gallery modal handlers were switched to one canonical loaded review collection. Related bug: [[Bug_Review_Detail_Lightbox_Risks]].
- 2026-05-11: Updated lightbox known issues after fixing body scroll restoration and removing unconditional `history.go(-1)` from normal modal close. At that point, the remaining lightbox risk was canonical loaded-review navigation for card/list/gallery.
- 2026-05-11: Updated status after closing photo thumbnail P2 performance work: responsive `srcset`, lazy/eager policy, async decoding, and explicit dimensions across strip/layout/lightbox mini thumbnails. Related bug: [[Bug_Photo_Strip_Lazy_Loading_And_Srcset]].
- 2026-05-10: Updated current status after fixing review image URL allowlisting for public review submission and widget rendering. Related ADR: [[ADR_0006_Trusted_Review_Image_URL_Policy]].
- 2026-05-10: Updated review detail lightbox known issues after fixing the photo-less gallery read-more path; remaining risks stay tracked in [[Bug_Review_Detail_Lightbox_Risks]].
- 2026-05-10: Added open review detail lightbox audit risks to known issues. Related notes: [[Product_Review_Lightbox]], [[Bug_Review_Detail_Lightbox_Risks]].
