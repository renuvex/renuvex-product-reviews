---
type: log
project: renuvex-product-reviews
status: active
created: 2026-05-13
updated: 2026-06-21
last_verified: 2026-06-21
confidence: high
tags:
  - log
  - project-memory
related:
  - "[[Index]]"
  - "[[Hot_Context]]"
  - "[[ADR_0032_Review_Video_On_Mux]]"
source_files:
  - "AGENTS.md"
  - "docs/wiki/Index.md"
  - "scripts/wiki-audit.mjs"
---

# Project Log

## 2026-06-21 - migration | Start Mux contract cleanup
- Added `20260621003000_review_video_mux_contract_drop_legacy_columns` to drop only old Cloudflare Stream/R2 `VideoUploadSession` columns and legacy indexes after read-only evidence showed no active video rows/jobs and no data in those legacy columns.
- Vercel cleanup scope is limited to old Cloudflare Stream/R2 video env vars. Cloudflare DNS/zone and future Worker-based widget/script delivery remain out of teardown scope.

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
