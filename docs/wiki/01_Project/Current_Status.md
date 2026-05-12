---
type: status
project: ikas-review-app
status: active
created: 2026-05-05
updated: 2026-05-12
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
  - Trusted review image policy: cloud name is a single build-time constant injected by the widget build script ([[ADR_0008_Cloud_Name_Build_Time_Only]]); settings response no longer carries `imagePolicy`
  - Review image load failures degrade gracefully: thumbnails hide broken assets, lightbox main image shows a neutral placeholder, and failures log with `console.warn`
  - Product review widget can self-mount on PDP when a theme-provided `#ikas-reviews-anchor` is missing, preserving both the review block and product-title badge
  - Photo review lightbox traps keyboard focus, exposes dialog semantics, and uses desktop/tablet/mobile responsive shells with mobile viewport-unit fallbacks
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
- Theme variant build: `pnpm build:widget --theme=new-theme` produces a separate bundle (`widget-new-theme.js`)
- Sentry observability on the panel (Node + Edge + browser): error capture, masked Session Replay, traces (prod 10%), server log ingestion, source map upload via Vercel-Sentry integration. PII auto-attach disabled to prevent ikas OAuth/JWT leakage. See [[Sentry_Operations]] and [[ADR_0009_Sentry_Observability_Strategy]].
- Widget-side uncaught errors forwarded to Sentry via a 637-byte (gzip) in-widget reporter and a rate-limited public endpoint (`/api/public/widget-error`). No SDK shipped to the widget bundle; storefront customer privacy and Core Web Vitals preserved. See [[ADR_0010_Widget_Error_Forwarding]].

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

## Important Decisions
- [[ADR_0001_Project_Stack]] — Next.js 16 App Router + Prisma + Postgres (Supabase)
- [[ADR_0002_Widget_Injection_Strategy]] — single bundled widget.js injected via ikas StorefrontJSScript
- [[ADR_0003_Review_Data_Model]] — denormalized Review table; storeId = merchantId; slug + status indexes
- [[ADR_0004_Ikas_Integration_Strategy]] — OAuth via @ikas/admin-api-client + Codegen GraphQL operations
- [[ADR_0006_Trusted_Review_Image_URL_Policy]] — review image URLs must be trusted Cloudinary assets before storage or storefront render
- [[ADR_0009_Sentry_Observability_Strategy]] — `@sentry/nextjs` on the panel, env-based DSN, `sendDefaultPii: false`, prod-only sample rates, masked Replay; widget bundle excluded
- [[ADR_0010_Widget_Error_Forwarding]] — tiny widget-side reporter forwards uncaught widget errors via `/api/public/widget-error` so the visibility gap from ADR_0009 is closed without adding a second SDK to the storefront bundle

## Next Recommended Steps
1. Add JSON-LD structured-data injection on product pages (Google rich snippets) — see [[Structured_Data_And_Rich_Snippets]]
2. Implement review-request email flow (post-purchase delay + token-gated submit URL)
3. Decide and document Q&A widget scope before adding fields to schema (see [[Open_Questions]])
4. Add CSV import/export for reviews
5. Build a minimal analytics view in admin (counts, average rating trend)
6. Consider tests for the public submission endpoint (highest blast-radius surface)

## Last Updated
2026-05-12

## Change Log
- 2026-05-12: Tuned review submission wizard focus management — step transitions no longer auto-focus into the new step (was popping mobile keyboard on steps 3/4 and flashing a heavy focus ring on every transition). Initial modal-open focus is still managed by the shell. Input/textarea `:focus-visible` outline removed; native caret indicates focus. Buttons keep their outline. Updated note: [[Bug_Review_Wizard_Focus_Trap_Accessibility]].
- 2026-05-12: Review submission wizard photo step now allows parallel uploads. The add button stays enabled while existing uploads are in flight — previously the button silently no-op'd, which felt broken when users returned to the photo step after the auto-jump to step 3. Auto-jump narrowed to the truly first photo action only. Submit step still blocks with "fotoğraflar yükleniyor" until every pending upload resolves. Source: [step-photos.js](src/widget/product-widget/review-form-modal/steps/step-photos.js).
- 2026-05-12: Adopted widget-scope touch-feedback contract — single `src/widget/shared/` directory with `base-reset.js` (tap-highlight off, `:active` opacity dip, `touch-action: manipulation`, `.ikr-press-dim` / `.ikr-press-scale` utilities) and `input-modality.js` (global last-input-modality tracker). Filter dropdown and wizard modal now route `restoreFocus` through the tracker so pointer/touch opens no longer leave sticky focus rings on mobile. Decision: [[ADR_0011_Widget_Touch_Feedback_And_Focus_Modality]].
- 2026-05-12: Added review summary filter menu accessibility fix to working widget status. Filter options are now keyboard-activatable buttons with menu semantics, focus moves in on open and back to the trigger on close, and tabbing out auto-closes. Related bug: [[Bug_Filter_Menu_Keyboard_Accessibility]].
- 2026-05-12: Added review submission wizard accessibility fix to working widget status. The multi-step wizard now traps focus, restores opening focus on close, and keeps photo upload keyboard-accessible. Related bug: [[Bug_Review_Wizard_Focus_Trap_Accessibility]].
- 2026-05-11: Added widget-side error forwarding. A 637-byte (gzip) reporter in `widget.js` catches `error`/`unhandledrejection` events filtered to `widget.js` only, throttles them, and POSTs to `/api/public/widget-error` where the panel Sentry SDK records them tagged `source: widget`. No SDK in the widget bundle. Decision in [[ADR_0010_Widget_Error_Forwarding]].
- 2026-05-11: Added Sentry SDK observability layer to the panel (Node + Edge + browser runtimes). DSN read from env, `sendDefaultPii: false` to block ikas OAuth header leak, prod `tracesSampleRate: 0.1`, masked Session Replay with prod 5% / on-error 100%, server log ingestion. Vercel-Sentry integration installed; source maps upload during Vercel build. Widget bundle deliberately excluded. Recorded decision in [[ADR_0009_Sentry_Observability_Strategy]]; operational reference in [[Sentry_Operations]].
- 2026-05-11: Fixed PDP review widget mount fallback so missing theme anchors no longer hide both the review block and product-title badge. Related bug: [[Bug_Product_Widget_Missing_Auto_Mount]].
- 2026-05-11: Closed K2 image error fallback. Review thumbnails now hide broken assets, lightbox main image shows a neutral placeholder, and failures log via `console.warn`. Related bug: [[Bug_Review_Image_Error_Fallback]].
- 2026-05-11: Structurally closed silent review image loss by removing the runtime image-policy contract entirely. Cloud name is now build-time-only ([[ADR_0008_Cloud_Name_Build_Time_Only]]). Settings response field, widget runtime cache, setter, and warn helper all removed (~90 lines). Related bug: [[Bug_Cloud_Name_Silent_Image_Filter]].
- 2026-05-11: Added the photo lightbox responsive shell update: desktop two-column at `801px+`, stacked tablet/landscape at `641px-800px`, and fullscreen mobile with `vh` / `svh` / `dvh` fallbacks. Related bug: [[Bug_Lightbox_Tablet_Viewport_And_Scroll]].
- 2026-05-11: Added photo review lightbox focus trap and dialog semantics so `Tab` no longer reaches storefront controls while the modal is open. Related bug: [[Bug_Lightbox_Focus_Trap_Accessibility]].
- 2026-05-11: Added retryable storefront review fetch error state so API/network failures are no longer rendered as empty review lists. Related bug: [[Bug_Review_Fetch_Error_Empty_State]].
- 2026-05-11: Removed the remaining lightbox navigation known issue after card/list/gallery modal handlers were switched to one canonical loaded review collection. Related bug: [[Bug_Review_Detail_Lightbox_Risks]].
- 2026-05-11: Updated lightbox known issues after fixing body scroll restoration and removing unconditional `history.go(-1)` from normal modal close. At that point, the remaining lightbox risk was canonical loaded-review navigation for card/list/gallery.
- 2026-05-11: Updated status after closing photo thumbnail P2 performance work: responsive `srcset`, lazy/eager policy, async decoding, and explicit dimensions across strip/layout/lightbox mini thumbnails. Related bug: [[Bug_Photo_Strip_Lazy_Loading_And_Srcset]].
- 2026-05-10: Updated current status after fixing review image URL allowlisting for public review submission and widget rendering. Related ADR: [[ADR_0006_Trusted_Review_Image_URL_Policy]].
- 2026-05-10: Updated review detail lightbox known issues after fixing the photo-less gallery read-more path; remaining risks stay tracked in [[Bug_Review_Detail_Lightbox_Risks]].
- 2026-05-10: Added open review detail lightbox audit risks to known issues. Related notes: [[Product_Review_Lightbox]], [[Bug_Review_Detail_Lightbox_Risks]].
