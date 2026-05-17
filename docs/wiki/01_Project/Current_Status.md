---
type: status
project: ikas-review-app
status: active
created: 2026-05-05
updated: 2026-05-17
last_verified: 2026-05-17
confidence: high
source_files: []
tags:
  - status
related:
  - "[[Index]]"
  - "[[Project_Overview]]"
  - "[[Roadmap]]"
  - "[[Open_Questions]]"
  - "[[Yotpo_Style_Widget_Modular_Architecture]]"
  - "[[Yotpo_Protein_Ocean_Widget_Research]]"
---

# Current Status — ikas Review App

## Current Phase
Active development. Core feature set is functional end-to-end. Recent work has focused on widget UI/UX polish, storefront reliability, and architecture research for a Yotpo-style loader plus modular widget system. See [[Yotpo_Style_Widget_Modular_Architecture]] and [[Yotpo_Protein_Ocean_Widget_Research]] before large storefront widget changes.

## Working Features
- OAuth install flow for ikas merchants — code-signature validation, token exchange, JWT issuance, session cookie
- Auto-injection of widget script into every merchant storefront on install
- Manual re-injection via `/api/admin/inject-scripts` (button in admin)
- Storefront widget runtime (`/public/widget.js` classic loader + `/public/widget-runtime/*` ESM chunks locally; deployed pre-Phase-2 response measured `177763` bytes on 2026-05-15) with:
  - Product review widget (modal submission + listing) with multiple review-layouts (card, gallery, list) and summary-layouts (classic, compact, hero, minimal, split)
  - Photo strip above review list — dedicated newest-first fetch, cap 15, independent of sort/filter/load-more (see [[Photo_Strip]], [[ADR_0007_Photo_Strip_Cap_And_Rotation]])
  - Review fetch failures render a retryable error state instead of the normal empty-review state
  - Trusted review image policy: cloud name is a single build-time constant injected by the widget build script ([[ADR_0008_Cloud_Name_Build_Time_Only]]); settings response no longer carries `imagePolicy`
  - Review image load failures degrade gracefully: thumbnails hide broken assets, lightbox main image shows a neutral placeholder, and failures log with `console.warn`
  - Product review widget can self-mount on PDP when a theme-provided `#ikas-reviews-anchor` is missing, preserving both the review block and product-title badge
  - Photo review lightbox traps keyboard focus, exposes dialog semantics, and uses desktop/tablet/mobile responsive shells with mobile viewport-unit fallbacks
  - Photo review lightbox live preview keeps an already-open right pane synchronized with setting changes such as review icon and merchant reply label
  - Review submission wizard traps keyboard focus, focuses the active step on open/step change, restores previous focus on close, and provides visible keyboard focus states
  - Review summary filter menu is keyboard-operable: options are buttons with menuitem semantics, the trigger exposes menu state via `aria-haspopup` / `aria-expanded`, focus moves in and out predictably, and tabbing away closes the menu
  - Widget-scope tap-feedback contract ([[ADR_0011_Widget_Touch_Feedback_And_Focus_Modality]]): tarayıcı tap-highlight devre dışı, deterministik `:active` opacity dip, `:focus-visible` ile sadece klavye odak halkası, ve global "son giriş modalitesi" izleyicisi popover/modal kapanışında `restoreFocus` kararını yönetir
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
- Theme variant build is not a reliable current gate: the stale `--theme=new-theme` alias is tracked as Phase 3 cleanup in [[ADR_0013_Modular_Widget_Loader_Architecture]].
- Sentry observability on the panel (Node + Edge + browser): error capture, masked Session Replay, traces (prod 10%), server log ingestion, source map upload via Vercel-Sentry integration. PII auto-attach disabled to prevent ikas OAuth/JWT leakage. See [[Sentry_Operations]] and [[ADR_0009_Sentry_Observability_Strategy]].
- Widget-side uncaught errors forwarded to Sentry via a 637-byte (gzip) in-widget reporter and a rate-limited public endpoint (`/api/public/widget-error`). No SDK shipped to the widget bundle; storefront customer privacy and Core Web Vitals preserved. See [[ADR_0010_Widget_Error_Forwarding]].

## In Progress
- ADR_0013 Phase 2 module split: local build emits a small classic loader plus ESM runtime/chunks; `VIEW_SEARCH_RESULTS` and the Ozy fallback adapter are implemented. Live dev-store browser/network verification and Sentry post-test checks are still required before Phase 2 is closed.

## Known Issues / Gaps
- Structured-data injection exists in the widget runtime, but it is currently coupled to the rating badge/review-count path and still needs SEO validation and a clearer server/client strategy. See [[Structured_Data_And_Rich_Snippets]] and [[Yotpo_Style_Widget_Modular_Architecture]].
- No review-request emails / post-purchase triggers
- No CSV import/export of reviews
- No analytics dashboard (review volume over time, conversion lift, etc.)
- No multi-language storefront UI (widget is Turkish-only; settings labels Turkish)
- Q&A widget (`qa` id in `WidgetDef`) is registered but implementation status unconfirmed — flag in [[Open_Questions]]
- Carousel/popup widgets similar — registered IDs but implementation depth unknown without further read
- No automated tests visible in repo (no `__tests__` / `test/` / vitest config found at top level) — flag for [[Open_Questions]]
- Current script injection relies on DB-tracked script ids and does not define `listStorefrontJSScript`; reconciliation and delete semantics need review before changing install cleanup. See [[Ikas_Storefront_Script_Capabilities]].
- Large new storefront surfaces should use the Phase 2 loader/module split pattern and must not be statically imported into the always-loaded runtime. See [[Yotpo_Style_Widget_Modular_Architecture]].

## Important Decisions
- [[ADR_0001_Project_Stack]] — Next.js 16 App Router + Prisma + Postgres (Supabase)
- [[ADR_0002_Widget_Injection_Strategy]] — single bundled widget.js injected via ikas StorefrontJSScript
- [[ADR_0003_Review_Data_Model]] — denormalized Review table; storeId = merchantId; slug + status indexes
- [[ADR_0004_Ikas_Integration_Strategy]] — OAuth via @ikas/admin-api-client + Codegen GraphQL operations
- [[ADR_0006_Trusted_Review_Image_URL_Policy]] — review image URLs must be trusted Cloudinary assets before storage or storefront render
- [[ADR_0009_Sentry_Observability_Strategy]] — `@sentry/nextjs` on the panel, env-based DSN, `sendDefaultPii: false`, prod-only sample rates, masked Replay; widget bundle excluded
- [[ADR_0010_Widget_Error_Forwarding]] — tiny widget-side reporter forwards uncaught widget errors via `/api/public/widget-error` so the visibility gap from ADR_0009 is closed without adding a second SDK to the storefront bundle

## Next Recommended Steps
1. Complete ADR_0013 Phase 2 dev-store browser/network verification and Sentry post-test checks.
2. Add script reconciliation before changing ikas script cleanup or delete behavior; see [[Ikas_Storefront_Script_Capabilities]].
3. Clarify structured-data strategy and validate Google rich snippet behavior.
4. Implement review-request email flow (post-purchase delay + token-gated submit URL).
5. Decide and document Q&A widget scope before adding fields to schema (see [[Open_Questions]]).
6. Add CSV import/export for reviews.
7. Build a minimal analytics view in admin (counts, average rating trend).
8. Consider tests for the public submission endpoint (highest blast-radius surface).

## Last Updated
2026-05-17

## Change Log
- 2026-05-17: Phase 2 module split implementation started: classic `public/widget.js` loader + ESM `public/widget-runtime/*` chunks locally, with live verification still pending.
- 2026-05-15: Added current-state corrections from the read-only widget architecture audit: deployed `widget.js` measured `177763` bytes, JSON-LD exists but needs validation/decoupling, and future Yotpo-like surfaces should follow [[Yotpo_Style_Widget_Modular_Architecture]].
- 2026-05-12: **Pending Image Registry**: Replaced Cloudinary scan-and-diff with a robust DB-tracked `PendingReviewImage` registry. Eliminates 500-asset cap and race conditions. ([[ADR_0012_Pending_Upload_Registry]])
- 2026-05-12: **Accessibility & Touch**: Adopted widget-scope touch-feedback contract and standardized focus trapping for modally-presented UI (Lightbox, Filter Menu). ([[ADR_0011_Widget_Touch_Feedback_And_Focus_Modality]])
- 2026-05-11: **Observability Layer**: Deployed Sentry SDK on panel (Node+Edge+Browser) with PII masking, and implemented a tiny 637-byte custom reporter for the widget bundle to forward errors without shipping an SDK to storefronts. ([[ADR_0009_Sentry_Observability_Strategy]], [[ADR_0010_Widget_Error_Forwarding]])
- 2026-05-11: **Cloudinary Build-Time Migration**: Removed runtime image-policy contract. Cloud name is now a build-time constant. ([[ADR_0008_Cloud_Name_Build_Time_Only]])
- *(Note: Detailed bug fixes and minor operational updates are recorded in `05_Bugs_And_Fixes` and the repository commit log).*
