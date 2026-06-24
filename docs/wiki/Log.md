---
type: log
project: renuvex-product-reviews
status: active
created: 2026-05-13
updated: 2026-06-24
last_verified: 2026-06-24
confidence: high
tags:
  - log
  - project-memory
related:
  - "[[Index]]"
  - "[[Hot_Context]]"
  - "[[ADR_0032_Review_Video_On_Mux]]"
  - "[[Competitor_Pricing_And_Plans]]"
source_files:
  - "AGENTS.md"
  - "docs/wiki/Index.md"
  - "scripts/wiki-audit.mjs"
---

# Project Log

## 2026-06-24 - refactor | Separate Mux Player theme boundaries
- Split review-video Mux Player theming into explicit storefront and admin exports. The storefront lightbox now uses a storefront theme, while the admin moderation preview uses a fixed admin theme.
- This keeps future widget/player customization scoped to shopper-facing surfaces and prevents merchant storefront settings from changing the admin preview player.
- Added explicit dark menu colors for Mux quality and playback-rate menus so white player controls do not create white-on-white admin/player menus under the Gerwig theme.
- Added a local Turkish Media Chrome translation module for Mux Player controls. The review-player theme clone sets its internal `media-controller` to `lang="tr"`, while admin and storefront `<mux-player>` hosts also carry `lang="tr"`. This translates UI labels such as Quality, Playback rate, Settings, and fullscreen tooltips without changing Mux upload, playback, webhook, DB, or cost behavior.
- Follow-up localization hardening now registers Media Chrome's public custom elements before Gerwig and activates the Turkish registry up front. This prevents Gerwig's bundled Media Chrome fallback from leaving quality and playback-rate menu labels in English.

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
- After a photo is pending or uploaded in the media step, the primary media actions hide and the embedded photo strip owns the visible thumbnail plus compact `+` add tile. Removing a selected video resets the step to the empty media-selection actions.
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
