---
type: status
project: renuvex-product-reviews
status: active
created: 2026-05-05
updated: 2026-07-28
last_verified: 2026-07-28
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

# Current Status - Renuvex Product Reviews

## Agent Brief
Use this page only for a fast project-state snapshot. It is intentionally not a
deep implementation source; when details matter, follow links to the relevant
ADR, architecture page, or source file. Current truth: the project is
pre-public-launch; AWS review images, Mux video, Cloudflare Worker widget
delivery, QStash maintenance scheduling, and public read-cache paths are live.
Remaining public-launch blockers are mainly security hardening, operational
observability, authenticated dashboard smoke, and product polish.
The review-request email V5 plus Multi-Product Batch/Envelope V3.2 packages are
deployed as a disabled backend and schema; all 60 Production migrations are
applied, customer/request/job/attempt lifecycle rows remain zero, and
`REVIEW_EMAIL_ENABLED` remains absent. Report-mode maintenance has produced
only successful, error-free `ReviewEmailPurgeRun` audit rows.
Production sender resources and live email behavior do not exist. Source adds
delivery-group batching,
independent product review rights, provider-neutral attempts/events,
host-isolated review-center sessions, install-generation fencing, exact-subject
DSR, reversible analytics, bounded retention, and separately gated immutable
erasure-journal IaC. Journal/AWS rollout, review-domain DNS, outbound dispatch,
merchant UI, and live email acceptance remain future approved work.

## Current Phase
Active development on the production test store. Core review, image, Mux video, moderation, storefront widget, Cloudflare Worker delivery, and public read-cache paths are implemented and live. The project is still pre-public-launch; remaining work is product polish, security hardening, operational smoke coverage, and future feature expansion rather than a pending Mux/Worker migration.

## Working Features
- OAuth install flow for ikas merchants — browser-bound state, optional
  code-signature validation, provider token exchange, active installation/token
  persistence, and installation session. The embedded admin JWT is obtained
  from ikas AppBridge after the iframe opens; the callback neither creates nor
  transports that bearer credential.
- Auto-injection of widget script into every merchant storefront on install
- Manual re-injection via `/api/admin/inject-scripts` (button in admin)
- Storefront widget runtime (`/public/widget.js` classic loader + `/public/widget-runtime/*` ESM chunks locally; deployed pre-Phase-2 response measured `177763` bytes on 2026-05-15) with:
  - Product review widget (modal submission + listing) with multiple review-layouts (card, gallery, list) and summary-layouts (classic, compact, hero, minimal, split)
  - Media gallery above review list — dedicated newest-first fetch, cap 15, independent of sort/filter/load-more (see [[Media_Gallery]], [[ADR_0007_Photo_Strip_Cap_And_Rotation]])
  - Review fetch failures render a retryable error state instead of the normal empty-review state
  - Trusted review image policy is AWS-only for new images: storefront renders structured `media[]` descriptors whose image URLs must be under `https://media.renuvex.app/reviews/<assetId>/<variant>.<format>`; settings response no longer carries `imagePolicy`.
  - Review image load failures degrade gracefully: thumbnails hide broken assets, lightbox main image shows a neutral placeholder, and failures log with `console.warn`
  - Product review section is opt-in on PDP via `<div data-renuvex-widget="reviews"></div>`; missing mount means no review section, while PDP title badge and listing badges remain independent and are controlled by the `badge` widget toggle
  - Photo review lightbox traps keyboard focus, exposes dialog semantics, and uses desktop/tablet/mobile responsive shells with mobile viewport-unit fallbacks
  - Photo review lightbox live preview keeps an already-open right pane synchronized with setting changes such as review icon and merchant reply label
  - Review submission wizard traps keyboard focus, focuses the active step on open/step change, restores previous focus on close, and provides visible keyboard focus states
  - Review summary filter menu is keyboard-operable: options are buttons with menuitem semantics, the trigger exposes menu state via `aria-haspopup` / `aria-expanded`, focus moves in and out predictably, and tabbing away closes the menu
  - Widget-scope tap-feedback contract ([[ADR_0011_Widget_Touch_Feedback_And_Focus_Modality]]): tarayıcı tap-highlight devre dışı, deterministik `:active` opacity dip, `:focus-visible` ile sadece klavye odak halkası, ve global "son giriş modalitesi" izleyicisi popover/modal kapanışında `restoreFocus` kararını yönetir
  - Product rating badge (small inline star+count)
  - Listing-page rating badges (auto-discovers product cards on collection/search pages; Storefront Events path now reads by canonical ikas product id)
  - Mutation observer for SPA-style theme navigation
  - Route- and identity-aware review reset on SPA product transitions, so stale review cards clear into the existing reserved shell while the new product loads
  - Below-the-fold listing/product-slider badge hydration through `IntersectionObserver`, while critical PDP surfaces stay eager
  - Offline/partial-load hardening: shared icon/media fallbacks and Shadow DOM style gates prevent raw unstyled review surfaces from breaking the host page if CSS/runtime chunks are missing
- Public review submission API:
  - Profanity filter (TR + EN)
  - IP-based rate limit (3 reviews / 10 min via Upstash Redis)
  - Image upload via AWS S3 presigned POST intent/register flow (10 uploads / 10 min limit), with SHA-256 checksum, size/type validation, private variant generation, and public CloudFront variants only after approval.
  - Trusted review image URL policy rejects third-party/data/private/signed image URLs before storage and storefront render.
  - Auto-approve modes: `manual` / `4plus` / `5stars` / `all`
  - Author masking on output (`Mert W.`)
- Admin dashboard:
  - Review list with status filter, pagination, replies, delete
  - Pending/private AWS review images use authenticated short-lived preview URLs for both moderation thumbnails and full-size image modal previews; signed responses stay `private, no-store` and are not stored in list API data.
  - Widget editor with per-widget settings panel and build-time generated live iframe previews at `/preview/<widgetId>/<scene>`
  - Settings persistence in `WidgetSettings` (one row per `(storeId, widgetId)`)
- Caching: public GETs use `s-maxage=60, stale-while-revalidate=300` at the edge
- QStash maintenance schedules: daily full maintenance at 03:00 UTC plus monthly AWS image orphan cleanup at day 1 04:00 UTC through signed `/api/internal/scheduled-jobs`; the admin `GET` routes remain manual `CRON_SECRET`-gated ops entrypoints.
- Cloudflare Worker delivery for `widget.renuvex.app` static assets plus V2 read-cache for `settings`, `ratings`, `ratings-by-slug`, and `reviews`; write/upload/video/lazy-sync paths stay on `app.renuvex.app`
- Mux review-video upload, webhook/reconcile, admin signed preview, public Mux Player playback, quota cleanup, abandoned-upload cleanup, approve/reject/delete, and retry UX are live and covered by tests/manual canary evidence
- Widget artifact budget gate: `pnpm budget:widget` enforces local bundle size/request-budget guardrails after `pnpm build:widget`
- AWS-only review-image source pass is merged and deployed: production code/tests/scripts/config no longer depend on the legacy image provider, the SDK dependency is removed from `package.json`/lockfile, the current Worker-served widget manifest graph contains no legacy provider references, and live AWS-only image acceptance passed through sign, S3 POST, register, submit, admin approve, and public render. Legacy pre-public DB alignment, Vercel env removal, and local secret cleanup are complete; provider account assets are out of app scope.
- Theme variant build is not a reliable current gate: the stale `--theme=new-theme` alias is tracked as Phase 3 cleanup in [[ADR_0013_Modular_Widget_Loader_Architecture]].
- Sentry observability on the panel (Node + Edge + browser): error capture, masked Session Replay, traces (prod 10%), server log ingestion, source map upload via Vercel-Sentry integration. PII auto-attach disabled to prevent ikas OAuth/JWT leakage. See [[Sentry_Operations]] and [[ADR_0009_Sentry_Observability_Strategy]].
- Widget-side uncaught errors forwarded to Sentry via a 637-byte (gzip) in-widget reporter and a rate-limited public endpoint (`/api/public/widget-error`). No SDK shipped to the widget bundle; storefront customer privacy and Core Web Vitals preserved. See [[ADR_0010_Widget_Error_Forwarding]].

## In Progress / Active Follow-Ups
- Preview compatibility cleanup: after the first production deployment proves
  normal editor traffic uses only canonical static preview paths, confirm the
  legacy `/preview?widget=&scene=` redirect has no current app callers and
  remove that bounded compatibility route in a separate cleanup.
- Supabase Data API/RLS/default-grants closure is complete. Production has all
  60 migrations applied, zero public tables without RLS, zero effective Data
  API-role/default-ACL drift, and the unused hosted Data API is disabled. Keep
  `pnpm verify:supabase-data-api-surface` as a read-only release/audit gate.
- Operational smoke gates: authenticated dashboard smoke and Sentry post-deploy health checks should be run after meaningful admin/runtime deploys.
- Video operations: the Mux path is live and stable; periodic Mux asset reconciliation dry-run/reporting remains a deferred ops hardening item.
- Image operations: source/runtime is AWS-only for new review images. Legacy provider DB targets are zero after the approved apply; temporary alignment scripts were removed after completion. Existing provider account assets were not copied to AWS and are outside the app runtime.
- Product readiness gaps: real i18n/aria localization, unsupported-theme warning UI, and non-Ozy theme adapter coverage remain separate product/platform work.
- ADR_0013 source hardening remains live: non-destructive StorefrontJSScript create/update lifecycle, daily script reconcile through daily maintenance, hashed runtime entry with stable shim, and canonical product identity via [[ADR_0015_Canonical_Product_Identity]].

## Known Issues / Gaps
- Structured-data injection exists in the widget runtime, but it is currently coupled to the rating badge/review-count path and still needs SEO validation and a clearer server/client strategy. See [[Structured_Data_And_Rich_Snippets]] and [[Yotpo_Style_Widget_Modular_Architecture]].
- No live review-request emails / post-purchase sending. The disabled V5 plus
  Multi-Product Batch/Envelope V3.2 schema/backend is deployed but remains
  globally disabled: one physical initial and at most one reminder per delivery
  group, independent product submit/skip, review-center session/media ownership,
  restore replay, and journal-first bounded uninstall. Read-only checks confirm
  the production Supabase project is currently Free with no managed backup and
  PITR disabled. A signed `store/app/deleted` delivery has been observed, but
  its generation-5 erasure run stopped at `journal_not_configured`; a later
  reinstall is generation 6. Production release `d6f0f4f` now fences every
  retry/journal/batch against the exact installation generation. One
  QStash-signed continuation closed the old run as `stale_ignored`; the active
  installation/token and review/media counts were unchanged, and no journal or
  cleanup work was created. Pro upgrade, first managed-backup evidence, live
  restore-window verification, journal stack/genesis, AWS
  EventBridge/SQS/Lambda/SES dispatch, `reviews.renuvex.app`, merchant settings
  UI, review-center media controls, and live ikas acceptance remain open.
- No CSV import/export of reviews
- No analytics dashboard (review volume over time, conversion lift, etc.)
- No multi-language storefront UI yet. The widget is Turkish-first; source still has hardcoded Turkish visible text, `tr-TR` formatting, and Turkish accessibility labels. Scope: [[Roadmap]] and [[Open_Questions]].
- Q&A widget (`qa` id in `WidgetDef`) is registered but implementation status unconfirmed — flag in [[Open_Questions]]
- Carousel/popup widgets similar — registered IDs but implementation depth unknown without further read
- Real-device video acceptance is not fully automated. CI covers Chromium, Firefox, WebKit, Pixel emulation, iPhone WebKit emulation, and the Ubuntu GitHub Actions iPhone WebKit matrix; final public launch should still include manual iOS/Android spot checks for video and widget flows.
- Current script injection relies on DB-tracked script ids because active MCP still does not expose `listStorefrontJSScript`; source intentionally avoids destructive cleanup while ikas docs/MCP disagree. See [[Ikas_Storefront_Script_Capabilities]].
- Large new storefront surfaces should use the Phase 2 loader/module split pattern and must not be statically imported into the always-loaded runtime. See [[Yotpo_Style_Widget_Modular_Architecture]].
- DOM-only listing badge fallback now resolves current slugs through `ProductSnapshot` before reading reviews by product id. If a snapshot is missing, the old slug query remains as a last-resort compatibility path; run `/api/admin/sync-products` to repair drift.

## Important Decisions
- [[ADR_0001_Project_Stack]] — Next.js 16 App Router + Prisma + Postgres (Supabase)
- [[ADR_0002_Widget_Injection_Strategy]] — single bundled widget.js injected via ikas StorefrontJSScript
- [[ADR_0003_Review_Data_Model]] — denormalized Review table; storeId = merchantId; slug + status indexes
- [[ADR_0004_Ikas_Integration_Strategy]] — OAuth via @ikas/admin-api-client + Codegen GraphQL operations
- [[ADR_0034_AWS_Review_Image_Migration]] — review image upload, delivery, trust, variants, admin preview, and cleanup target AWS S3/CloudFront for new images.
- [[ADR_0009_Sentry_Observability_Strategy]] — `@sentry/nextjs` on the panel, env-based DSN, `sendDefaultPii: false`, prod-only sample rates, masked Replay; widget bundle excluded
- [[ADR_0010_Widget_Error_Forwarding]] — tiny widget-side reporter forwards uncaught widget errors via `/api/public/widget-error` so the visibility gap from ADR_0009 is closed without adding a second SDK to the storefront bundle
- [[ADR_0015_Canonical_Product_Identity]] — `(storeId, productId)` is the canonical review product identity; slug/name are display snapshots and slug reads are fallback-only

## Next Recommended Steps
1. Run authenticated dashboard smoke and Sentry post-deploy health after the next meaningful deploy.
2. Add a periodic Mux asset reconciliation dry-run/report if video ops needs automated orphan evidence.
3. Validate structured-data SEO on a public PDP with approved reviews.
4. Keep the deployed V3.2 backend feature-disabled while the AWS
   dispatcher/sender, SES/DNS/env, merchant UI, journal, and live-acceptance
   packages proceed through separate gates.
6. Decide and document Q&A widget scope before adding fields to schema (see [[Open_Questions]]).
7. Add CSV import/export for reviews.
8. Build a minimal analytics view in admin (counts, average rating trend).

## Last Updated
2026-07-20

## Change Log
- 2026-07-20: PR #8 deployed the disabled review-email backend and all 59
  migrations. PR #9 (`7e89a6dd`) deployed the flag-first fix-forward through
  Vercel deployment `dpl_5KHmYepsDxhVbKoHMN9JPRA2g82s`; all six disabled
  public-route checks now return deterministic `404 not_found`. Customer
  lifecycle rows remain zero, nine report-mode purge audits succeeded without
  errors, and AWS/SES/DNS plus outbound sending remain gated.
- 2026-07-15: Added the disabled Multi-Product Batch / Envelope V3.2 source
  status. No production migration, AWS/DNS/env mutation, deploy, or email send
  occurred.
- 2026-07-04: Fixed admin AWS private-image thumbnails after live acceptance exposed the text fallback in pending reviews. The list now lazy-loads the signed `thumb_320x427` variant through the authenticated image-preview endpoint, and the image modal loading state no longer uses video copy.
- 2026-07-04: Applied the approved pre-public legacy image DB alignment. The apply retired 12 legacy image `ReviewMedia` rows, 6 stale pending rows, 8 legacy image flags/mirrors, 26 quarantine rows, 1 old provider job, and rebuilt one affected product summary. Post-checks report zero remaining legacy image-provider DB targets; no provider assets were mutated.
- 2026-07-04: Recorded PR #5 production deployment and Cloudflare Worker deployment for AWS-only image source pass. Live AWS-only acceptance review `8962e9c8-7c7f-49db-9e16-cb68bbeff428` proved 14 variants, public `media.renuvex.app` delivery, immutable CloudFront cache headers, and no legacy-provider/private leak markers.
- 2026-07-03: Recorded local AWS-only image source pass: AWS-only image upload/render/cleanup code, dependency/config/script/test cleanup, and widget manifest graph verification. Env removal, DB data alignment, and Worker deploy remained approval-gated at that checkpoint.
- 2026-07-02: Refreshed status after Mux and Cloudflare Worker migrations moved from gated/pending to live. Current open work is security/ops/product readiness rather than Mux deploy or Worker rollout.
- 2026-06-14: Added dry-run-first Review Video V1 canary operations and a controlled activation/rollback runbook. No production merchant gate or global flag was enabled by this change.
- 2026-06-14: Recorded provider-agnostic video implementation and the Phase 4 five-project Playwright media matrix. Provider details are superseded by [[ADR_0032_Review_Video_On_Mux]].
- 2026-06-15: Corrected the production acceptance state from source/DB/provider evidence. Controlled provider uploads and cleanup completed; physical-device and 72-hour acceptance remain pending. Live settings showed the internal-store global gate effective before the pending-admin hardening deploy, so activation is held until the Production flag is disabled and re-verified.
- 2026-06-15: Deployed pending-admin preview hardening from `9f20cdc9` with the Production video capability disabled. Historical provider preflight details are superseded by the Mux canary path.
- 2026-06-15: Deliberately reactivated the Production global video gate for the internal-store acceptance window. Live settings showed the internal store enabled and the second store disabled; QStash DLQ, Sentry media-path errors, Vercel video logs, and unsigned worker access checks were clean.
- 2026-06-15: First physical iOS Safari attempt exposed a readiness sync blocker and video-card remove bug. The Mux migration supersedes the earlier provider-specific readiness path; the media step still clears a removed video card reliably.
- 2026-06-15: After deploying the iOS fixes, the iOS Safari video path passed through submit, admin approval, and storefront publication. A later immediate upload hit the canary quota/rate-limit boundary (`/api/public/upload/video/initiate` returned `429` while usage was `consumed=4`, `reserved=1`, quota `5`); specific quota/rate-limit shopper copy remains a follow-up polish item.
- 2026-06-15: Implemented the quota-aware capability and error-UX follow-up locally. Cached public settings remain merchant intent; a new no-store capability endpoint checks current usage/provider readiness, widget failures degrade to photo-only, initiate errors have explicit copy/retry policy, admin receives read-only usage metadata, and canary operations now include usage/provider state. Deploy and live canary quota adjustment remain pending.
- 2026-06-15: Deployed quota-aware capability commit `84276d8b` to Production (`dpl_AjWAf29bnLSQWxA8ceQ8gdLBQQiz`) and raised only the verified internal store quota from `5` to `20`. The no-store endpoint returned `enabled=true` for the internal store and `merchant_disabled` for the second store; capability requests were `200` with no matching production error logs. At that point, Android physical acceptance was next.
- 2026-06-15: Android Chrome post-fix physical retest passed and left a retained approved video review for the future canary window. The 72-hour canary clock is still not formally started; iPhone Safari interruption/resume remains pending, and ADR_0031 remains draft until the full Phase 6 gate passes.
- 2026-06-15: Implemented video upload reliability hardening locally: transactionally scheduled reconciliation and session expiry jobs, stable mobile preview DOM, adaptive processing polling, and durable offline cancel intent. The Mux migration keeps these durability contracts.
- 2026-06-16: Readiness is now documented under the Mux contract: asset `ready`, trusted Mux HLS/poster URLs, signed pending playback ID, and valid V1 media limits. Reconciliation checks ten times from `T+10s` through `T+600s`, and terminal provenance records the actual webhook/reconcile/cleanup path.
- 2026-05-25: Renuvex Product Reviews hard namespace cleanup and opt-in review mount contract are current. Source and active generated widget assets use `renuvex-pr` / `renuvex_pr`; historical `ikr` / `yorum-paneli` notes remain only in old ADRs/bug history.
- 2026-05-17: ADR_0013 Phase 3 source hardening implemented: non-destructive StorefrontJSScript lifecycle, daily maintenance reconcile, hashed runtime entry with stable shim, and hidden-link listing badge filter.
- 2026-05-17: Canonical product identity implemented for listing/search badge reads: widget maps Storefront Events product ids and public ratings can group by `productId`. Related: [[ADR_0015_Canonical_Product_Identity]].
- 2026-05-17: Added ProductSnapshot read model, ikas product webhook receiver, install/manual backfill, and snapshot-backed slug fallback.
- 2026-05-17: Phase 2 module split implemented and verified: classic `public/widget.js` loader + ESM `public/widget-runtime/*` chunks.
- 2026-05-15: Added current-state corrections from the read-only widget architecture audit: deployed `widget.js` measured `177763` bytes, JSON-LD exists but needs validation/decoupling, and future Yotpo-like surfaces should follow [[Yotpo_Style_Widget_Modular_Architecture]].
- 2026-05-12: **Pending Image Registry**: Replaced provider scan-and-diff with a robust DB-tracked `PendingReviewImage` registry. Eliminates 500-asset cap and race conditions. ([[ADR_0012_Pending_Upload_Registry]])
- 2026-05-12: **Accessibility & Touch**: Adopted widget-scope touch-feedback contract and standardized focus trapping for modally-presented UI (Lightbox, Filter Menu). ([[ADR_0011_Widget_Touch_Feedback_And_Focus_Modality]])
- 2026-05-11: **Observability Layer**: Deployed Sentry SDK on panel (Node+Edge+Browser) with PII masking, and implemented a tiny 637-byte custom reporter for the widget bundle to forward errors without shipping an SDK to storefronts. ([[ADR_0009_Sentry_Observability_Strategy]], [[ADR_0010_Widget_Error_Forwarding]])
- 2026-05-11: **Legacy Image Build-Time Migration**: Removed runtime image-policy contract. Cloud name is now a build-time constant. ([[ADR_0008_Cloud_Name_Build_Time_Only]])
- *(Note: Detailed bug fixes and minor operational updates are recorded in `05_Bugs_And_Fixes` and the repository commit log).*
