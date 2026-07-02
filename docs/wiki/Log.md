---
type: log
project: renuvex-product-reviews
status: active
created: 2026-05-13
updated: 2026-07-02
last_verified: 2026-07-02
confidence: high
tags:
  - log
  - project-memory
related:
  - "[[Index]]"
  - "[[Hot_Context]]"
  - "[[AWS_Setup_And_Access]]"
  - "[[ADR_0032_Review_Video_On_Mux]]"
  - "[[ADR_0033_Cloudflare_Worker_Widget_Asset_Delivery]]"
  - "[[Competitor_Pricing_And_Plans]]"
  - "[[Storefront_CDN_Performance_Benchmark]]"
source_files:
  - "AGENTS.md"
  - "docs/wiki/Index.md"
  - "docs/wiki/03_Architecture/AWS_Setup_And_Access.md"
  - "docs/wiki/10_Research/Storefront_CDN_Performance_Benchmark.md"
  - "scripts/wiki-audit.mjs"
---

# Project Log

## 2026-07-02 - fix | Make review wizard video capability non-blocking
- Changed the storefront `Yorum Yap` CTA contract so the review wizard opens immediately instead of waiting for the no-store video capability probe.
- If cached settings enable video, Step 2 starts with `Video Ekle` pending/disabled until capability resolves; proven capability failures fall back to photo-only, while admin-disabled video skips the probe entirely.
- This keeps Mux/session/quota work behind an enabled video action and avoids first-interaction latency after mobile browser resume or cold network wake-up.

## 2026-07-02 - fix | Harden offline SVG icon sizing fallback
- Fixed an offline refresh / partial-load path where sprite-based rating stars could render huge if widget CSS was missing or delayed.
- Star and generic icon use-site SVG output now carries intrinsic `1em` fallback dimensions plus `focusable="false"`; normal CSS preset sizing remains the source of truth when styles load.
- Added [[Bug_Offline_Refresh_Unstyled_SVG_Star]] and updated [[Render_Output_Contract]] / [[ADR_0019_Icon_Sprite_Rendering]] so future widget icons use the shared helpers instead of raw `<svg><use>` output.

## 2026-07-02 - decision | Close AWS CDN cutover as active issue
- Closed the AWS CloudFront/S3 storefront widget CDN question as an active migration track for the current MVP.
- Evidence remains in [[Storefront_CDN_Performance_Benchmark]] and [[Storefront_CDN_Cost_Model]]: AWS was slightly faster in the local Turkey canary, but the gain does not justify the higher cost and operational cutover work now.
- Production default remains Cloudflare Worker V2. AWS stays as an archived, reproducible canary option that can be reopened only if real merchant traffic shows unacceptable Cloudflare p95 latency, availability, or regional routing.

## 2026-07-01 - performance | Split public settings read from lazy theme sync
- Refactored `GET /api/public/settings` into a pure public read that returns the existing widget settings/runtime shape plus additive `runtime.themeSyncDue`; it no longer imports auth-token or storefront-theme sync code and no longer schedules `after()` work.
- Added `POST /api/public/storefront-theme/lazy-sync` as the rate-limited backend/control-plane path. It returns `204` without token access when the stored theme state is fresh, and only stale requests schedule `syncStorefrontThemeForToken(..., { reason: 'lazy_storefront', persistUnchangedCheck: true })` through Next.js `after()`.
- Updated the widget to fetch settings from `READ_API_BASE` and to send lazy sync as a best-effort non-blocking POST to `API_BASE`, preserving preview mode and keeping upload/submit/video/error paths off the Worker read cache.
- Extended the Worker read-cache allowlist to include `GET /api/public/settings?publicApiKey=...`; lazy-sync and every write/upload/video route remain fail-closed on the Worker.

## 2026-07-01 - performance | Add viewport-gated listing badge hydration
- Added viewport-aware lazy hydration for below-the-fold listing/product-slider badges. Far below-the-fold product-card candidates now wait behind `core/listing-viewport-gate.js` before loading the `listing-badges-*` chunk or sending the bulk ratings request.
- Critical PDP surfaces remain eager: product title badge, structured data, explicit review widget, and visible review/media rendering are not delayed.
- Local network smoke coverage verifies no early listing chunk/API for below-the-fold candidates, scroll-triggered hydration with one bulk ratings read, no-`IntersectionObserver` eager fallback, fail-closed disabled/unsupported theme paths, and duplicate navigation guards.
- Scope note: this reduces Renuvex JS/API cost for unviewed lower product sliders; it does not address ikas/theme CLS or Cloudflare TR-to-FRA routing.

## 2026-07-01 - performance | Close post-deploy startup and CLS baseline
- Measured the live dev ikas PDP 10 times after the layout-reservation and Worker deploy. Review widget visible median was `2267 ms`; first-render median was `18 ms`; visible-from-render median was `16 ms`.
- Automatic startup classification was `CDN/client-to-edge` for 9 runs and `injection/discovery` for 1 run. Read APIs, DB, Redis, QStash, Mux, and Supabase were not supported as first-load bottlenecks by this evidence.
- Chrome DevTools trace still reported CLS `0.55`, with the worst cluster tied to an unsized ikas `Visa.svg`; third-party main-thread time was about `1296 ms` for `myikas.com` and `101 ms` for `renuvex.app`.
- Decision: keep Cloudflare Worker V2 live; if more Renuvex source work is needed, scope it to below-the-fold listing/product-slider lazy hydration rather than moving write/upload/video paths to the edge.

## 2026-06-30 - research | Compare AWS and Cloudflare image CDN costs
- Added [[Review_Image_CDN_Cost_Model]] with the focused AWS S3/CloudFront vs Cloudflare Images/R2/Image Transformations cost model for review images.
- Used official Cloudflare Images/R2 pricing pages and AWS S3/CloudFront public pricing plus AWS Price List API SKU evidence; arithmetic was generated by script, not manually.
- Decision note: keep Cloudinary as the implemented image provider for now; if cost drives an image migration later, prototype Cloudflare R2 plus Image Transformations first and verify real Cloudinary bytes/request counts before approving a provider migration.

## 2026-06-30 - performance | Add storefront widget startup timeline
- Added opt-in browser-local startup markers for the storefront widget loader/runtime/API/render path.
- Extended `scripts/measure-storefront-waterfall.mjs` to enable `renuvexPerf=1`, report widget timeline markers, classify the dominant delay bucket, and summarize repeated runs.
- No Cloudflare, Vercel, AWS, ikas, database, Mux, QStash, or DNS mutation was performed in this phase.

## 2026-06-29 - research | Compare multi-provider storefront widget delivery
- Used Chrome DevTools MCP read-only against Cozy Earth/Okendo, CurlMix/Yotpo, HiQ/Judge.me, Paen/ikas native, Petzzshop/ikas native, plus selected home/category pages.
- Recorded the detailed evidence in [[Storefront_CDN_Performance_Benchmark]]: mature storefronts separate long-cache static/versioned widget assets from dynamic review APIs, and dynamic review APIs are often `no-cache`, `no-store`, POST GraphQL, or otherwise not immutable edge data.
- Recorded that fast product pages did not require every review API to be edge-cached; the common pattern is that full review/media/lightbox work does not block first product render.
- Product/category implication: optimize Renuvex source sequencing and first-render isolation before adding KV, moving write/upload paths to the edge, or changing CDN provider only from one-off script timing comparisons.

## 2026-06-29 - research | Compare Yotpo home and category storefront paths
- Used Chrome DevTools MCP read-only against `https://proteinocean.com/` and `https://proteinocean.com/protein`.
- Recorded that the reference Yotpo home/category paths use lightweight rating/star surfaces and carousel data instead of the full PDP review/media API path.
- Added the header/cache evidence to [[Storefront_CDN_Performance_Benchmark]]: Yotpo loader and `staticw2` widget shell were TTL-0 in the sampled category trace, while versioned star-rating assets used `max-age=31536000` from Amazon S3.
- Product/category implication: keep Renuvex listing/category/home surfaces on lightweight bulk ratings and keep full review/media/Mux surfaces behind explicit PDP mounts or future explicit widgets.

## 2026-06-29 - research | Verify AWS CloudFront widget canary
- Deployed the non-invasive AWS CloudFront/S3 widget canary on the default CloudFront hostname `d34tylxlzkmua8.cloudfront.net`; no live DNS, ikas script, Vercel, DB, Mux, Cloudinary, QStash, or Cloudflare Worker production state was changed.
- Fixed the canary's private S3 origin behavior by replacing AWS managed `UseOriginCacheControlHeaders` with a stack-owned CloudFront cache policy that does not forward viewer `Host` to S3.
- Verified stable loader, runtime, immutable chunk, health endpoint, simple CORS `GET` behavior, CloudFront cache HIT for immutable chunks, and the deployed-widget Playwright network contract.
- Added [[AWS_Setup_And_Access]] to preserve the AWS CLI baseline, IAM Identity Center profile model, canary resource inventory, approval rules, and AWS skill/GitHub source references.
- Recorded the first AWS vs Cloudflare measurement in [[Storefront_CDN_Performance_Benchmark]]. AWS was modestly faster from the local Turkey path, but the result is not yet broad enough to justify production cutover.

## 2026-06-29 - infra | Prepare AWS CloudFront widget canary tooling
- Added [[AWS_CloudFront_Widget_Canary_Runbook]] for the non-invasive CloudFront/S3 widget CDN benchmark path.
- Prepared local AWS canary asset packaging and dry-run upload tooling that reuses the current widget asset graph and preserves the stable/immutable cache contract.
- Drafted the CloudFormation canary stack for a private S3 bucket, CloudFront OAC, response headers policy, and distribution using origin cache-control headers.
- Verified AWS read-only preflight: no existing S3 buckets, CloudFront distributions, CloudFront OACs, or ACM certificates; budget `Renuvex AWS Monthly Guardrail` exists at `10 USD` monthly. CloudFormation validation is pending a permission update for `RenuvexWidgetCanaryOperator`.

## 2026-06-28 - research | Record storefront CDN performance snapshot
- Added [[Storefront_CDN_Performance_Benchmark]] with the Cloudflare Worker, Vercel, and Yotpo reference measurements taken from the local Turkey client path.
- Recorded the key routing evidence: `widget.renuvex.app` traced to Cloudflare `FRA` for the measured Turkey client, while the tiny Worker health response still had a median TTFB around 269 ms.
- Decision note: keep the functionally correct Cloudflare Worker V2 split live, but require a non-invasive AWS CloudFront/S3 canary benchmark before making a final storefront CDN performance decision.

## 2026-06-28 - deploy | Complete Cloudflare Worker V2 public-read cutover
- Deployed Worker `renuvex-widget-assets` version `e82bfd0a-1868-4171-b20c-5496c5d41bed` with current widget assets and allowlisted read proxy support.
- Committed widget runtime `runtime-DOJW3JHM.js` for the Worker asset graph and verified live `widget.renuvex.app` serves it from Cloudflare.
- Verified `GET /api/public/ratings` and `GET /api/public/reviews` return `X-Renuvex-Edge-Cache: MISS` then `HIT` on repeat requests, while `GET /api/public/settings` and video upload capability stay fail-closed on the Worker.
- Updated deployed-widget measurement to support separate read API origin; the live measurement passed with assets/read from `https://widget.renuvex.app` and backend/write from `https://app.renuvex.app`.
- Added a build-time fallback so unset `STOREFRONT_WIDGET_READ_API_BASE_URL` uses `STOREFRONT_WIDGET_BASE_URL` before runtime falls back to the backend API origin.

## 2026-06-28 - build | Prepare Cloudflare Worker V2 public-read cache
- Added source support for `STOREFRONT_WIDGET_READ_API_BASE_URL` so storefront ratings/reviews reads can use a separate read origin while settings, upload, submit, video, metrics, and widget-error stay on the backend API origin.
- Extended Worker `renuvex-widget-assets` with a fail-closed allowlist for `GET /api/public/ratings`, `GET /api/public/ratings-by-slug`, and `GET /api/public/reviews`, using 60 second edge caching only for safe 200 JSON responses.
- No external mutation was performed in this phase. Worker redeploy and Vercel `STOREFRONT_WIDGET_READ_API_BASE_URL=https://widget.renuvex.app` cutover remain separate explicit stop/go gates.

## 2026-06-28 - deploy | Cut over widget assets to Cloudflare Worker
- Deployed Worker `renuvex-widget-assets` with `pnpm worker:widget:deploy` and attached `widget.renuvex.app` as its Cloudflare Worker Custom Domain.
- Removed only the old `widget.renuvex.app` Vercel DNS-only CNAME (`2d886046bc2da89b.vercel-dns-017.com`, TTL `600`, proxied `false`). Cloudflare created the read-only proxied Worker `AAAA 100::` record.
- Verified live Worker delivery: `/__health` returned OK, `widget.js` and `runtime.js` kept the revalidate cache policy, hashed runtime/chunks kept immutable caching, and `/api/public/settings` returned `404`.
- Ran `pnpm measure:deployed-widget` with separate origins: assets from `https://widget.renuvex.app`, API from `https://app.renuvex.app`; all four controlled scenarios completed with `widgetError: 0`.
- `app.renuvex.app`, Vercel backend, Supabase, Mux, QStash, ikas script URL, KV, R2, and Stream were not changed.

## 2026-06-28 - build | Prepare Cloudflare Worker widget asset delivery
- Added the local Worker Static Assets delivery layer for the storefront widget. The Worker serves only widget assets and `/__health`, applies the existing loader/runtime/chunk cache contract, and fails closed for `/api/*`.
- Split the widget runtime origin model: `STOREFRONT_WIDGET_BASE_URL` remains the script/static asset origin, while `STOREFRONT_WIDGET_API_BASE_URL` embeds the backend/API origin into the widget build. If unset, the runtime falls back to the script origin for rollback/local compatibility.
- Added Wrangler tooling, Worker type generation, a manifest-aware asset preparation script, unit contract tests, deployed-widget measurement support for separate asset/API origins, and ADR_0033.
- No external mutation was performed in this phase. Vercel env/redeploy, Cloudflare Worker deploy/custom-domain/DNS cutover, and ikas script writes remain separate explicit stop/go gates.

## 2026-06-27 - fix | Decouple existing video display from upload capability
- `videoReviewsEnabled` now controls new video upload/wizard capability only. Existing approved videos remain visible on storefront media surfaces after uploads are disabled.
- `/api/public/reviews` exposes additive `photoReviewCount` and `mediaReviewCount` read-model counts. The media gallery skips its deferred `hasMedia=true` read when the first response proves `mediaReviewCount === 0`; otherwise it still uses `hasMedia=true`, while the filter label/query uses the count comparison to keep photo-only products on `Fotoğraflı` / `hasImages=true`.

## 2026-06-25 - refactor | Make public media filtering read-model backed
- Replaced the review summary filter's photo-only boolean state with an explicit `currentMediaFilter` mode (`none | images | media`).
- The public filter gained an explicit media mode (`Fotoğraf ve Video` / `hasMedia=true`) alongside the legacy photo mode (`Fotoğraflı` / `hasImages=true`), matching the media gallery's mixed image/video model when a product has approved video media.
- Expanded `ProductReviewSummary` with media count/rating buckets so public `hasMedia=true` totals stay on the summary read model rather than raw `Review.count()`.
- The top Media Gallery remains bootstrap-owned and hides when the public photo/media facet is active, so the filtered review list owns the media focus.

## 2026-06-24 - refactor | Separate Mux Player theme boundaries
- Split review-video Mux Player theming into explicit storefront and admin exports. The storefront lightbox now uses a storefront theme, while the admin moderation preview uses a fixed admin theme.
- This keeps future widget/player customization scoped to shopper-facing surfaces and prevents merchant storefront settings from changing the admin preview player.
- Added explicit dark menu colors for Mux quality and playback-rate menus so white player controls do not create white-on-white admin/player menus under the Gerwig theme.
- Added a local Turkish Media Chrome translation module for Mux Player controls. The review-player theme clone sets its internal `media-controller` to `lang="tr"`, while admin and storefront `<mux-player>` hosts also carry `lang="tr"`. This translates UI labels such as Quality, Playback rate, Settings, and fullscreen tooltips without changing Mux upload, playback, webhook, DB, or cost behavior.
- Follow-up localization hardening now registers Media Chrome's public custom elements before Gerwig and activates the Turkish registry up front. This prevents Gerwig's bundled Media Chrome fallback from leaving quality and playback-rate menu labels in English.
- Admin moderation preview now hides nonessential Mux Player controls: Picture-in-Picture, Cast, seek backward/forward, audio-track, captions/subtitles, and playback-rate. Core playback, volume, timeline, fullscreen, and quality selection remain available.
- Storefront review lightbox playback now has three merchant-editable `Video Oynatıcı` colors: play icon, progress color, and progress track color. The center play button background and hover background are intentionally transparent, not merchant-editable. The keys are scoped to `reviewLightboxVideo*`, so admin moderation and future story/carousel players remain isolated.
- Storefront video lightbox gestures now reserve the lower Mux Player control band for player controls. Timeline scrubbing no longer triggers previous/next review navigation, while swipes from the main video area still keep the lightbox review-navigation gesture.

## 2026-06-23 - migration | Move review playback to Mux Player
- Replaced the storefront lightbox's custom native `<video>` + direct `hls.js` orchestration with official `@mux/mux-player`.
- Public approved video media now returns additive `playbackId`; the widget prefers that ID, keeps trusted Mux `.m3u8` parsing only as rollout fallback, and does not expose provider ids, signed/private playback ids, tokens, or upload URLs.
- Admin pending/rejected video preview now uses signed Mux Player attributes (`playbackId`, `playbackToken`, `thumbnailToken`) from `/api/admin/reviews/video-playback`; legacy signed URL fields remain temporarily for deployment overlap.
- Mux Data tracking/cookies stay disabled in this first playback phase. Player theming, Mux Data analytics, and custom Media Chrome surfaces remain separate product work.

## 2026-06-23 - fix | Make stalled video upload retry manual
- Physical mobile retesting showed the automatic reconnect path could still leave the wizard on `Video Yükleniyor` while the DB session stayed `uploading` and the Mux direct upload stayed `waiting`.
- The widget now fails closed for direct-upload offline/stall cases: it aborts the active PUT, records the technical failure code for metrics, and shows only the themed `Tekrar dene` action for retryable failures. No network-specific or red error copy is shown in the storefront retry card.
- Manual retry preserves the selected file and reuses the existing upload session when server status says it is still valid. It does not return to the initial photo/video choices and does not auto-retry after browser `online` events.
- Follow-up hardening keeps UpChunk automatic retry only for transient HTTP statuses (`408`, `502`, `503`, `504`). Response-less attempt failures now immediately surface the manual retry state, preventing the media step from sitting indefinitely on `Video Yükleniyor` after mobile connectivity changes.
- Follow-up guard rails ignore late callbacks from superseded/aborted upload attempts, so browser reconnect/progress events cannot flip a failed retry state back to `Video Yükleniyor`. Capability check network failures keep the video action available when cached merchant settings already enable video; proven HTTP capability failures still fail closed to photo-only.

## 2026-06-22 - fix | Re-arm stalled video uploads after reconnect
- Physical mobile testing found the prior Mux direct-upload watchdog was not sufficient: after Wi-Fi was disabled and re-enabled, the wizard could stay on `Video yÃ¼kleniyor` while the DB session remained `uploading`, quota stayed `reserved`, and Mux direct upload stayed `waiting` with no asset.
- Production/runtime evidence showed the new widget build was deployed, so the root issue was client-side recovery, not Mux webhook/backend processing. This automatic reconnect approach was superseded on 2026-06-23 after physical retesting proved it could still leave the shopper waiting indefinitely.
- The retained lesson is that exhausted UpChunk chunk attempts and stalled direct uploads should surface only `Tekrar dene` in the storefront retry card, preserving the manual retry contract.
- Gates passed: `pnpm build:widget`, targeted offline/stall/chunk-exhaustion interaction tests, `pnpm test:widget-interactions`, `pnpm check:widget-js`, `pnpm exec tsc --noEmit`, and `pnpm lint`.

## 2026-06-22 - ui | Auto-advance video review uploads
- Simplified video upload recovery copy without losing state-machine detail: upload/retry/processing display `Video Yükleniyor`, and retryable failures expose one themed `Tekrar dene` action with no remove icon. Network-specific and red error copy was removed in the 2026-06-23 manual-retry follow-up.
- Video selection in the review wizard now mirrors the photo first-selection behavior: step 2 writes `videoUpload` state and advances to the comment step while Mux direct upload, complete, and processing polling continue in the background.
- The direct-upload path has an activity watchdog. As of the 2026-06-23 follow-up, the watchdog feeds the manual retry failure state instead of automatic same-session reupload.
- Returning to the media step during upload/retry/processing shows a single black `Video Yükleniyor` status control without a remove button; returning after readiness shows one photo-sized video thumbnail with remove only, no play icon and no extra `+` video tile.
- Step 4 remains backend-safe: submit stays blocked with the same dot animation pattern and `Video Hazırlanıyor` label until the video session is `ready`, failed video uploads show a terminal disabled state instead of a misleading endless "preparing" label, and submit still sends only the ready opaque video token.
- Gates passed: `pnpm build:widget`, targeted stalled-upload interaction tests, `pnpm check:widget-js`, `pnpm exec tsc --noEmit`, `pnpm lint`, `pnpm test:unit`, `pnpm test:widget-interactions`, `pnpm test:widget-media:chromium`, `node --env-file=.env.local .\node_modules\prisma\build\index.js validate`, `pnpm verify:video-infrastructure:post-webhook -- --json`, and `node scripts/wiki-audit.mjs --changed-source-check` (0 errors; existing wiki-health warnings remain).

## 2026-06-22 - ui | Refine review wizard media actions
- After a photo is pending or uploaded in the media step, the primary media actions hide and the embedded photo thumbnail rail owns the visible thumbnail plus compact `+` add tile. Removing a selected video resets the step to the empty media-selection actions.
- The video-enabled wizard media step now uses two stacked primary action buttons for photo and video, matching the established black `Fotoğraf Ekle` control instead of the old side-by-side outline choices.
- The media step embeds the existing photo picker in a no-add-button mode, so clicking photo no longer shows a second duplicate `Fotoğraf Ekle` button while preserving the shared thumbnail/upload lifecycle.
- Empty embedded media content stays hidden until a real photo/video selection exists, so opening and dismissing the native picker does not move the media action buttons.
- The video action uses the Phosphor regular outline play icon through the shared widget icon registry.

## 2026-06-21 - fix | Harden abandoned Mux upload cleanup
- Fixed the Mux direct-upload cancel/asset-created race for review videos: `cleanup_video` now retrieves upload state before cancel, deletes known or recovered Mux asset IDs even when cancel is no longer valid, and only uses direct-upload cancel while the upload is still waiting.
- Expanded video quota release from reserved-only to abandoned consumed sessions that never reached review submit (`consumedAt` is null), while preserving review-consumed sessions.
- Gates passed: targeted media unit tests, `pnpm exec prisma validate` with `.env.local` loaded, `pnpm exec tsc --noEmit`, `pnpm lint`, `pnpm test:unit`, and `pnpm verify:video-infrastructure:post-webhook -- --json`.

## 2026-06-21 - docs | Record Turkish-first localization boundary
- Documented that the current storefront widget is Turkish-first and has no i18n layer, locale resolver, or per-locale settings model.
- Linked future English/German support to [[Roadmap]], [[Open_Questions]], [[Storefront_Widget_Overview]], [[Widget_Customization]], and [[Feature_Map]].
- Decision note: merchant-editable copy fields are not localization; future multi-language support must include visible text, date/number formatting, and accessibility strings.

## 2026-06-21 - research | Preserve competitor pricing snapshots
- Replaced multiple competitor comparison pages with the single canonical [[Competitor_Pricing_And_Plans]] page.
- Browser-verified Loox, Yotpo, Okendo, and Judge.me plan snapshots against official pages, then folded the durable plan details into [[Competitor_Pricing_And_Plans]] and the individual competitor pages.
- The comparison page is an English wiki snapshot for packaging work; verify official competitor pages again before final pricing decisions or public claims.

## 2026-06-21 - operations | Add Mux video manual repair runbook
- Added [[Review_Video_Manual_Repair_Runbook]] as the operator path for rare Mux review-video lifecycle failures after webhook, reconciliation, expiry, and media-job retry paths have not converged.
- The runbook documents evidence-first handling for `VideoUploadSession`, `MediaProviderJob`, `WebhookEvent`, Mux upload/asset state, quota counters, pending registry rows, and public API leak checks.
- Repair guidance keeps Mux direct-upload cancel limited to `waiting` uploads, uses asset deletion once an `asset_id` exists, protects review-consumed sessions from abandoned-upload refunds, and requires explicit approval before DB/provider mutation.

## 2026-07-01 - performance | Tighten listing badge viewport gate
- Reduced the listing/product-slider badge near-viewport margin from `900px` to `400px` in `src/widget/core/listing-viewport-gate.js`.
- This keeps critical PDP surfaces eager while delaying far below-the-fold product sliders so they do not download the `listing-badges-*` chunk or call the bulk ratings API unless the shopper scrolls near them.
- Local 1366x768 harness evidence: offset `1100` hydrated, while offset `1200` waited; targeted listing badge network smoke tests passed with the new threshold.

## 2026-06-21 - security | Record Supabase RLS launch gate
- Read-only RLS audit found no browser Supabase client usage and no `NEXT_PUBLIC_SUPABASE_*` env surface in the repo; runtime DB access is server-side Prisma.
- Supabase MCP still flags RLS disabled on most public app tables. Direct SQL checks did not show `anon`, `authenticated`, or `service_role` table privileges, and public schema has no views/functions/publication tables.
- Decision: do not enforce RLS during active schema development. Treat Data API exposure, default grants, explicit grants, and RLS enablement as a public-launch security hardening gate.

## 2026-06-21 - closeout | Verify Mux video migration cleanup
- Verified the Mux review-video closeout without mutating platform state: Git/Vercel are on `main` only, old preview/new-ikas/mertcopper Vercel aliases are absent, and production Mux/QStash env keys are present without Cloudflare video env keys.
- Production DB has applied additive, backend-cutover, performance-sample, and contract migrations. `VideoUploadSession` no longer has `r2UploadId`, `masterObjectKey`, `ingestObjectKey`, or `streamUid`; active video jobs are empty; old Cloudflare provider jobs remain only as succeeded/superseded audit history.
- Mux production asset list is empty after canary delete cleanup. Historical direct-upload records remain in Mux as 8 `asset_created` and 1 `cancelled` uploads. Cloudflare Stream/R2 inventory is empty for videos, storage minutes, buckets, live inputs, watermarks, Workers scripts, and KV namespaces.
- Current widget manifest files are Mux-only. Older hash-named `render-*` chunks can still contain previous Cloudflare host strings as retained deployment artifacts; keep them under the `scripts/build-widget.mjs` retention policy instead of deleting by hand.
- Gates passed: `pnpm exec prisma validate`, `pnpm exec tsc --noEmit`, `pnpm lint`, `pnpm test:unit`, `pnpm check:widget-js`, `node --env-file=.env.local scripts/verify-mux-infrastructure.mjs --phase=post-webhook --json`, and `pnpm test:ci`.
- Separate security follow-up: Supabase MCP reports RLS disabled on most public tables. This is outside the Mux migration closeout and needs policy design before any enablement.

## 2026-06-21 - migration | Start Mux contract cleanup
- Added `20260621003000_review_video_mux_contract_drop_legacy_columns` to drop only old Cloudflare Stream/R2 `VideoUploadSession` columns and legacy indexes after read-only evidence showed no active video rows/jobs and no data in those legacy columns.
- Vercel cleanup scope is limited to old Cloudflare Stream/R2 video env vars. Cloudflare DNS/zone and future Worker-based widget/script delivery remain out of teardown scope.
- Retained old hash-named widget runtime chunks after import-chain proof showed older cached `runtime-*` / `bootstrap-*` files can still reference them. Active `build-manifest.json` points to the Mux-only `render-*` chunk; manual cleanup must preserve the retained import graph until the runtime retention window expires.

## 2026-06-20 - performance | Harden Mux upload measurement and retry UX
- Replaced the fixed 30 MB UpChunk setting with server-configured defaults (`8192` KB chunks, `5` attempts) and returned `chunkAttempts` from video initiate.
- Added sanitized `VideoUploadPerformanceSample` metrics via `/api/public/upload/video/metrics` so direct-upload, complete, and processing-poll durations can be separated from Mux webhook/job lifecycle evidence.
- Widget retry now distinguishes same-session retry from expired/missing-session restart and keeps progress monotonic within the same session.

## 2026-06-20 - migration | Make review video Mux-only locally
- Review Video local source now targets Mux direct upload, Mux webhook audit/dedupe, provider-neutral media jobs, admin signed playback, and public playback IDs after approval.
- Previous video-provider adapters, app-signed upload-parts route, S3 SDK dependencies, and retained provider-specific widget runtime chunks were removed from the local repo state.
- The Mux contract remains stop/go-gated for DB migration apply, Preview deploy, Mux webhook creation/env write, Preview canary, production credential proof, and external credential/resource teardown.
- Updated wiki: [[ADR_0032_Review_Video_On_Mux]], [[Review_Video_Canary_Runbook]], [[Backend_API_Map]], [[Database_Map]], [[Config_And_Env_Map]], [[Product_Review_Widget]], [[Product_Review_Lightbox]], [[Current_Status]], [[Async_Media_Pipeline]].

## 2026-06-16 - fix | Improve video poster and startup quality
- Storefront video poster rendering derives sized Mux Image thumbnail variants for cards, lists, gallery, strip, and lightbox surfaces while keeping the stored `posterUrl` as source of truth.
- Non-native HLS browsers lazy-load `hls.js`, keep ABR enabled, cap to player size, and use a conservative start-level warm-start unless Data Saver or 2g is reported.
- Native video controls remain browser/OS-owned.

## 2026-06-15 - acceptance | Record physical-device gate as superseded
- Earlier physical-device video acceptance evidence is superseded by the Mux canary path.
- Future physical iPhone Safari and Android Chrome checks must be recorded against [[Review_Video_Canary_Runbook]].

## 2026-06-14 - operations | Prepare controlled Review Video canary
- Added `pnpm video:canary:ops`, a read-only-by-default command that reports global/merchant/quota gates plus per-store quota, session, outbox, review, and media evidence.
- Apply mode requires a single existing store, matching `--confirmStoreId`, explicit fields, and `--apply`.
- Added [[Review_Video_Canary_Runbook]] with preflight, activation order, provider evidence, exit criteria, rollback, and physical-device follow-up.

## 2026-06-14 - test | Add cross-browser review media gate
- Added a dedicated Playwright media suite for Chromium desktop, Firefox desktop, WebKit desktop, Pixel emulation, and iPhone WebKit emulation.
- Contracts cover poster-first card/list/gallery rendering, responsive media sizing, no pre-lightbox HLS requests, native HLS attributes, lazy `hls.js`, browser-back/source cleanup, Mux direct-upload wizard submit, and video-to-image navigation cleanup.

## 2026-06-08 - performance | Add review media metadata
- Added additive Cloudinary metadata fields to `ReviewMedia` and `PendingReviewImage`.
- Widget upload/register forwards signed Cloudinary upload-response metadata; the server verifies the response signature before staging metadata, and review submit carries pending metadata into committed `ReviewMedia` rows.
- Public contract: `images: string[]` remains unchanged; additive `media[]` supports media-aware layouts.

## 2026-06-08 - performance | Remove public review count scan
- Extended `ProductReviewSummary` with exact photo+rating buckets and moved `/api/public/reviews` filtered total derivation off raw `Review.count()`.

## 2026-06-08 - security | Sign public review cursors
- Hardened `GET /api/public/reviews` cursor pagination by wrapping cursor payloads in an HMAC-SHA256 signed envelope.

## 2026-06-08 - ops | Add legacy review media reconciliation audit
- Added read-only legacy media audit and copy-first reconciliation scripts for old global Cloudinary review image paths.
- The trusted storefront policy remains tenant-scoped; global image paths are not added to the public trusted-image allowlist.

## 2026-06-07 - performance | Normalize review media reads
- Moved public photo-review filtering away from legacy `Review.images` text matching.
- `Review.hasImages` is now the indexed public photo-review facet, and normalized `ReviewMedia` rows store trusted image URLs, publicIds, positions, and visibility.

## 2026-05-18 - security | Scope review image uploads by tenant
- Review image uploads use tenant-scoped Cloudinary folders: `review_images/stores/<storeId>`.
- Public upload signing verifies `StoreSettings`, and read/write paths reject cross-tenant Cloudinary paths.

## 2026-05-17 - implementation | ProductSnapshot webhook/backfill layer
- Added `ProductSnapshot`, ikas product webhook registration/receiver, install-time and manual backfill, and snapshot-backed slug fallback.

## 2026-05-17 - implementation | ADR_0013 module split
- Implemented the classic `public/widget.js` loader plus ESM `public/widget-runtime/*` chunks.
- Runtime manifest and retained hashed outputs are governed by `scripts/build-widget.mjs` and `public/widget-runtime/build-manifest.json`.

## 2026-05-13 - maintenance | Second-brain setup migration
- Migrated the wiki memory system to the second-brain setup without moving or deleting existing non-provider docs.
