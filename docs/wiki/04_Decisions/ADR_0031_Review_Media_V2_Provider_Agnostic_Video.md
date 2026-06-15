---
type: decision
project: renuvex-product-reviews
status: draft
created: 2026-06-12
updated: 2026-06-15
last_verified: 2026-06-15
confidence: medium
tags:
  - adr
  - media
  - video
  - cloudflare-stream
  - cloudinary
  - r2
  - cost
  - performance
  - provider-agnostic
related:
  - "[[Decision_Index]]"
  - "[[ADR_0027_Review_Media_Read_Model]]"
  - "[[ADR_0029_Review_Media_Metadata]]"
  - "[[ADR_0030_Cleanup_Hardening]]"
  - "[[ADR_0012_Pending_Upload_Registry]]"
  - "[[ADR_0006_Trusted_Review_Image_URL_Policy]]"
  - "[[ADR_0008_Cloud_Name_Build_Time_Only]]"
  - "[[Async_Media_Pipeline]]"
  - "[[Competitor_Feature_Matrix]]"
  - "[[Database_Schema]]"
  - "[[Backend_API_Map]]"
  - "[[Roadmap]]"
  - "[[Open_Questions]]"
source_files:
  - "prisma/schema.prisma"
  - "src/lib/review-media.ts"
  - "src/lib/review-media-metadata.ts"
  - "src/lib/review-images.ts"
  - "src/app/api/public/upload/sign/route.ts"
  - "src/app/api/public/upload/register/route.ts"
  - "src/app/api/public/reviews/route.ts"
  - "src/lib/cleanup-orphan-images.ts"
  - "src/lib/cleanup-pending-uploads.ts"
  - "src/lib/media/outbox.ts"
  - "src/lib/media/dispatcher.ts"
  - "src/lib/media/lifecycle.ts"
  - "src/lib/media/jobs.ts"
  - "src/lib/media/reconciliation.ts"
  - "src/lib/media/sessions.ts"
  - "src/widget/reviews-section/review-form-modal/steps/step-photos.js"
  - "src/widget/reviews-section/review-form-modal/steps/step-media.js"
  - "src/widget/reviews-section/review-form-modal/media/video-upload.js"
  - "src/widget/reviews-section/review-modal.js"
  - "src/widget/reviews-section/video-playback.js"
  - "src/widget/reviews-section/media-thumbnail.js"
  - "src/widget/reviews-section/render/photo-strip.js"
  - "src/widget/core/helpers.js"
  - "src/components/home-page/widgets/widgetDefs.ts"
  - "src/lib/widget-settings.ts"
  - "playwright.media.config.ts"
  - "tests/widget-media-cross-browser.spec.ts"
  - ".github/workflows/media-cross-browser.yml"
  - "scripts/video-canary-ops.mjs"
  - "scripts/video-canary-ops-lib.mjs"
  - "tests/unit/video-canary-ops.test.ts"
---

# ADR_0031 — Review Media v2: Provider-Agnostic Model + Video on Cloudflare Stream

## Status
Draft - implemented behind disabled rollout gates; production acceptance is still pending. This decision supersedes the image-only assumptions of [[ADR_0027_Review_Media_Read_Model]] and [[ADR_0029_Review_Media_Metadata]] by generalizing them to multi-provider media.

## Implementation Status
- 2026-06-14: Provider contract hardening is implemented in source. QStash signature failures are classified as `401`, malformed signed payloads as `400`, and Stream copy requests use the documented `url` field with the V1 size/duration limits.
- 2026-06-14: Production env isolation is verified: Cloudflare, Stream, QStash, and the global video flag are Production-only in Vercel. The deployed commit is `ebe82a2c`.
- 2026-06-14: Master bucket CORS was corrected for merchant storefront origins. Live verification passed both arbitrary-origin preflight and a temporary presigned multipart `PUT`; the response exposed a readable `ETag`, and the probe upload was aborted successfully.
- 2026-06-14: Phase 4 cross-browser media coverage is implemented. The official Playwright 1.60 Linux image passed the five-project matrix (Chromium desktop, Firefox desktop, WebKit desktop, Pixel 7 emulation, and iPhone 15 WebKit emulation): 30 passed and 5 intentional platform-scope skips. The suite pins poster-first rendering, native HLS and `hls.js` branches, browser-back/source cleanup, multipart wizard submit, and video-to-image navigation cleanup.
- 2026-06-14: Phase 5 operational preparation is implemented. The dry-run-first `video:canary:ops` command reports all three gates and per-store lifecycle evidence; apply mode is single-store scoped, requires an exact confirmation id, preserves unrelated widget settings, and blocks accidental live activation while the global flag is already true. The real provider canary is still pending.
- 2026-06-15: The controlled provider path is no longer pending: DB evidence records two consumed quota units, nine succeeded jobs, one superseded job, and no retained video review/media rows after cleanup. R2 multipart write/abort, Stream API/webhook, QStash signed delivery/retry, empty media-worker DLQ, and production observability preflight were re-verified. Pending-admin preview now starts muted and visibly labels unapproved UGC. Physical iPhone Safari, physical Android Chrome, and the 72-hour retained-review window are still pending.
- 2026-06-15: Upload reliability hardening is implemented in source. Stream webhook delivery remains the fast path, while a transactionally-created `reconcile_stream` outbox job polls canonical Stream state on a bounded 10-second-to-10-minute schedule. Upload reservation and `expire_upload_session` are committed in the same serializable transaction; QStash only wakes durable DB records. The widget keeps one video preview node across progress updates, retries transient status failures without creating a new session, and persists offline cancel intent until a terminal server response. Physical Android/iPhone interruption tests must be repeated after deployment; the 72-hour clock remains not started.
- 2026-06-16: Stream readiness now follows Cloudflare's playable contract instead of waiting for every rendition to finish. A video becomes ready only when `readyToStream=true`, `status.state='ready'`, trusted HLS and poster URLs are present, and V1 duration/size limits pass. `pctComplete` remains diagnostic provider data and is not a readiness gate. Webhook, reconciliation, ingest cleanup, and maintenance pass explicit provenance into the single terminal transition; the first terminal writer keeps quota consumption and metadata provenance idempotent.
- Production acceptance is still open. The ADR remains draft until the physical-device and 72-hour canary gates pass.

## Date
2026-06-12

## Context
Photo reviews are first-class today: signed direct upload to Cloudinary → `/upload/register` pending registry ([[ADR_0012_Pending_Upload_Registry]]) → `ReviewMedia` read model ([[ADR_0027_Review_Media_Read_Model]]) with verified metadata ([[ADR_0029_Review_Media_Metadata]]) → poster-strip + image lightbox render. **Video reviews are the next gap** — the [[Competitor_Feature_Matrix]] shows Loox/Yotpo/Okendo at ✅ and us at ❌, and [[Async_Media_Pipeline]] already named "we add video reviews" as an explicit trigger to formalize background media processing + moderation.

The whole existing media path is **image-first and Cloudinary-locked**:
- `isTrustedReviewImageUrl` hardcodes `/image/upload/` and an image extension allowlist ([src/lib/review-images.ts](src/lib/review-images.ts), [src/widget/core/helpers.js](src/widget/core/helpers.js)).
- `review-media-metadata.ts` `ALLOWED_RESOURCE_TYPES = ['image']` and image-only formats/mime.
- Render surfaces build `<img>` only ([photo-strip](src/widget/reviews-section/render/photo-strip.js), [review-modal lightbox](src/widget/reviews-section/review-modal.js)).
- Cleanup crons call Cloudinary without `resource_type` (defaults to `image`) ([src/lib/cleanup-orphan-images.ts](src/lib/cleanup-orphan-images.ts)).

Two findings reframed the provider decision (full analysis: [[Async_Media_Pipeline]] + session research, 2026-06):
1. **Cost.** Cloudinary's credit model meters video **bandwidth per GB** (Free: 1 GB = 1 credit) and couples it to the image budget. For video delivery, that coupling makes cost isolation and forecasting harder than a dedicated streaming surface. Cloudflare Stream exposes separate stored-minute and delivered-minute pricing with native zero-config ABR. Large-scale sustainability (for example, thousands of merchants or millions of video assets) must still be validated from production usage, storage, delivery, and support data; it is not proven by the architecture alone.
2. **Latency to Turkey + experience.** The product's primary market is Turkey/EU; the real requirement is **low-latency edge near Turkey + fast video start**, not legal data residency. Cloudflare has an Istanbul PoP (since 2018) on the densest Anycast edge, automatic ABR (fast start, no buffering on TR mobile), and delivered-minute pricing (bandwidth/egress included, no separate egress fee), decoupled from the image credit pool.

Cloudinary remains excellent for **images** (transformation DX, already integrated, [[ADR_0006_Trusted_Review_Image_URL_Policy]] / [[ADR_0008_Cloud_Name_Build_Time_Only]] stand). We do not want a "video button bolted onto Cloudinary"; we want a media layer where the **provider is swappable** so the vendor choice is never a one-way door.

## Decision

### 1. Split media class by provider
- **Images → Cloudinary** (unchanged). All existing image ADRs stand.
- **Video → Cloudflare Stream** — signed direct-creator uploads, HLS/ABR delivery, automatic poster/thumbnail, Istanbul edge, delivered-minute pricing (bandwidth/egress included, no separate egress fee), decoupled from the image credit pool.
- **Original video master → Cloudflare R2 (V1: included)** — archived so Stream holds only *regenerable derivatives*; the master bucket is the portability guarantee. R2 is **egress-free but not cost-free** (storage + Class A/B operations billed) and offers an **EU-jurisdiction** option (`jurisdiction: 'eu'`). Accessed from Next.js via the **S3-compatible API** (no Worker bindings, decision A).
  - **Upload:** shopper uploads the master to R2 via **S3 presigned PUT**. Multipart is **strongly recommended** (not API-required — 150 MB is far under R2's single-PUT limit) for the 150 MB mobile case, because a single PUT **cannot resume** a dropped connection. Without multipart, a lower cap (≤100 MB) only lowers the failure rate — it does not add resumability. On the R2-first path the shopper does **not** upload to Stream, so Stream's 200 MB basic-POST limit does not apply here.
  - **Ingest correction (evidence-based, 2026-06-12):** Stream fetches the master via an **unguessable-key (UUID) public R2 URL** (public/custom-domain bucket), **not a presigned GET**. Reason: **Stream copy requires the source URL to be publicly routable and to support HTTP HEAD + HTTP GET range requests** (verified — Cloudflare docs; the fetcher does a HEAD + ranged GET to determine file size). S3/R2 **presigned GET URLs are method-specific and 403 on HEAD**, so a presigned GET cannot satisfy that HEAD requirement; Cloudflare's own copy-from-URL examples fetch from **public R2 URLs**. **Production note:** the public ingest URL must come from a **dedicated R2 custom domain — `r2.dev` is rate-limited and dev/test-only** (verified, Cloudflare); only a custom domain is production-grade. **Master stays private (security):** R2 public access is **bucket-level, not per-object** (verified — making a bucket public exposes *every* object), and Stream cannot be verified to fetch a private/auth'd source. So the **permanent master lives in a private R2 bucket**, and only a **short-lived copy in a *separate* public ingest bucket** (custom domain, unguessable key) is exposed for the Stream fetch. **After the Stream `ready` webhook, that transient public ingest object is deleted** — it must never persist, else the raw master would be publicly readable indefinitely and the moderation gate (signed Stream playback) would be undermined. *(If Stream copy is later confirmed to accept a presigned GET (GET-only) or an auth header, the transient public copy can be dropped and the master fetched privately; the hybrid is the fully-private alternative.)*
  - **Fully-private alternative (= the hybrid fallback):** keep the master private, skip copy-from-URL — upload **direct-to-Stream (native TUS)** and archive the Stream master to R2 **async**. Same data model; see Consequences.

### 2. Provider-agnostic `ReviewMedia` (additive, backwards-compatible)
- `ReviewMedia.resourceType` already exists → use the `'video'` value.
- **Add columns:**
  - `provider String @default("cloudinary")` — existing rows backfill to `cloudinary` automatically.
  - `providerAssetId String?` — the provider's **raw** asset id for ergonomic adapter access (Cloudflare Stream `uid`; for image rows, the Cloudinary publicId).
  - **`publicId` stays NOT NULL + unique and becomes the provider-scoped canonical asset key** (decided 2026-06-12). Image rows keep their **raw Cloudinary publicId unchanged — no migration**; video rows use **`publicId = "cloudflare_stream:<uid>"`**. This is decisive because **[`PendingReviewImage.publicId` is the `@id` primary key](prisma/schema.prisma:147)**: a pending **video** row needs a non-null unique key, which a provider-scoped publicId provides cleanly (a nullable publicId cannot serve as that PK). Only the video path writes the prefix, so existing image rows + the Cloudinary cleanup/trust paths are untouched — **but provider-aware branching is mandatory: a `cloudflare_stream:` publicId must never be handed to the Cloudinary Admin API.** (The earlier nullable + `@@unique([provider, providerAssetId])` variant is recorded under Alternatives.)
  - `posterUrl String? @db.VarChar(2048)` — video poster (nullable; image posters are derived as today).
  - `durationMs Int?` — video length.
  - `processingStatus String @default("ready")` — image = `ready`; video = `pending` → `ready`/`failed` (transcode/poster readiness; distinct from moderation).
- **Reuse, do NOT duplicate, the existing moderation publish-gate:** `ReviewMedia.visible` (public reads filter `where: { visible: true }`, [reviews route](src/app/api/public/reviews/route.ts)) + `Review.status`. No new `moderationStatus` column.
- `PendingReviewImage` gains `provider` + `providerAssetId` + processing fields so orphan cleanup is per-provider. **The DB table name stays legacy (no breaking rename); new code wraps it as a provider-agnostic "pending media registry"** — a rename via expand/contract is deferred, not required.
- `Review.hasVideo Boolean @default(false)` — indexed facet parallel to `hasImages` for a future "videolu yorumlar" filter.
- All changes are additive (new nullable columns / columns with defaults) → **single safe deploy** per the project migration policy.

### 3. Video upload flow (mirrors the existing pipeline shape)
```
Widget "Video Ekle"
  → client validation (≤150MB, ≤60s via loadedmetadata, mp4/mov)
  → POST /api/public/upload/video-token   (Next.js: S3 presigned PUT URLs for R2 — multipart for resumability; tenant in metadata)
  → master uploaded to R2 PRIVATE bucket via S3 PUT (multipart = resumable; single PUT works ≤R2 limit but cannot resume)
  → backend exposes a TRANSIENT public ingest copy (separate public/custom-domain bucket, unguessable key) → Stream copy-from-URL fetches it (NOT a presigned GET — §1)
  → on Stream ready: the transient public ingest copy is DELETED (private master remains the source of truth)
     (hybrid fallback: direct-to-Stream native TUS + async Stream→R2 archive)
  → Stream webhook → POST /api/webhooks/stream   (signed S2S: uid, poster, duration, ready)
  → upsert ReviewMedia(provider='cloudflare_stream', processingStatus, visible=false)
  → review submit links media → Review.status forced 'pending'
  → admin moderation → visible=true → public
```
- Server-side validation stays **authoritative**; the Stream webhook is the trusted S2S source (this realizes the "(C) webhook = primary authoritative" target already documented in [[ADR_0029_Review_Media_Metadata]] "Scale Evolution").
- The Cloudinary `/upload/sign` route is unchanged for images; video gets its own token route + per-type policy (allowed formats, folder/namespace, size/duration, rate limit).

### 4. Render: poster-first + ABR lightbox
- **Strip / list / card:** poster image + play badge + duration badge. **No autoplay, no `<video>` element, and no video preload in list/card** — only the poster `<img>` (~tens of KB, edge-cached near TR) loads; the player is created only on lightbox open. This is the primary delivery-cost control.
- **Lightbox:** native `<video controls playsinline preload="metadata" poster>` + **lazy-loaded `hls.js`** (only on lightbox open) for HLS/ABR on non-Safari; Safari/iOS play HLS natively. No heavyweight vendor player in the widget bundle (Shadow-DOM friendly, [[ADR_0021_Shadow_DOM_Isolation_Of_Review_Surfaces]]).
- The shared **trusted-helper + lightbox layer is generalized to media-aware** (branch image vs video on `resourceType`); the trust/responsive logic is NOT duplicated into a parallel module.

### 5. Moderation
- Any review carrying a video is forced to `status='pending'` (bypasses the star-based auto-approval in [reviews route](src/app/api/public/reviews/route.ts)); media stays `visible=false` until an admin approves. v1 = **manual admin queue**; AI video moderation (Stream / add-on) is a later phase.
- **Admin moderation UI is in v1 scope (not optional):** because video is publish-gated, the feature does not function without an admin path to clear the queue. v1 must extend the existing admin reviews surface to **preview the pending video, approve (→ `Review.status='approved'` + `ReviewMedia.visible=true`), and reject / hide / delete** — hide/delete runs through provider-aware adapter cleanup. "Just add the widget upload" is insufficient.

### 6. v1 scope & limits (grounded production policy)
- **v1 policy:** **3 photos OR 1 video** per review. The data model is mixed-media-capable; the mixed (photos + video together) UI is deferred to keep v1 render simple.
- **Limits:** 1 video / review; formats `mp4`, `mov`; duration ~2s–**60s** (within Yotpo's 15–60s UGC band); upload **≤150MB** — within R2's single-PUT limit (primary R2-first path) and under Stream's **200 MB basic-POST limit** (direct-to-Stream fallback), so **no resumable protocol is API-mandated at 150 MB** (verified — 150 MB ≪ R2's single-PUT limit); *conditional on a solid mobile upload UX (progress + timeout, ideally resumable/multipart — Cloudflare recommends TUS even below 200 MB on weak connections) — fall back to **≤100MB** if v1 ships without resumable*; **adaptive HD playback up to 1080p** (ABR drops to 360p/480p/720p on weak networks; no 4K requirement); no autoplay.

### 7. Rollout
- **Global feature flag** (env) + **per-merchant `WidgetSettings.videoReviewsEnabled`** + **per-merchant quota** (e.g. videos/month) — public exposure only behind flag + quota + moderation.

### 8. Media lifecycle contract (video follows the image discipline)
Video reuses the same durable media lifecycle as review images ([[ADR_0012_Pending_Upload_Registry]] / [[ADR_0027_Review_Media_Read_Model]] / [[ADR_0029_Review_Media_Metadata]] / [[ADR_0030_Cleanup_Hardening]]):
1. Upload-token creation reserves a **pending media identity**.
2. Provider upload completion is recorded in the **pending media registry** (legacy `PendingReviewImage` table, wrapped as provider-agnostic).
3. Review submit links **only** pending media owned by the same `store` / `product` / session.
4. A video-bearing submission forces `Review.status='pending'`.
5. Public reads expose media only when `Review.status='approved'` **and** `ReviewMedia.visible=true`.
6. Abandoned pending video assets are deleted by pending cleanup.
7. Deleted/hidden review media is cleaned through **provider-specific adapter cleanup** and queued provider jobs.
8. Cleanup is **idempotent and provider-aware**: Cloudinary image, Cloudflare Stream `uid`, and the R2 master object are each removed through separate adapter operations; the **transient public R2 ingest copy is deleted immediately after the Stream `ready` webhook** and must never persist (else the raw master would be publicly readable — §1).
   Expired Cloudinary pending-image cleanup also uses the shared `MediaProviderJob` outbox, so provider identity is retained until deletion succeeds or reaches manual-review/dead-letter state.
9. Storefront read paths **never** call provider Admin APIs (read-model only).
10. Session failure/cancel state and its cleanup `MediaProviderJob` are written in the **same DB transaction**. QStash only wakes the durable DB outbox; it is not the lifecycle source of truth.
11. Stream publication mutations are serialized per provider asset with an expiring DB lease and fencing version. A stale approve/reject job re-reads the latest DB-visible intent and converges Stream before it can become the final provider state.
12. Quota accounting uses an explicit `reserved -> released|consumed` state transition. Failed, aborted, or expired unfinished uploads release once; a successfully processed video remains consumed even if moderation later rejects it because provider cost has already occurred.
13. The transient public ingest key and a deadline cleanup job are persisted before the public copy is created. Cleanup checks Stream state after 60 minutes, defers while Stream is still fetching, and enforces a 23-hour application deadline; the bucket's 24-hour lifecycle is only the final backstop.
14. Stream webhook delivery is the low-latency path, not the only readiness path. When a Stream UID is committed, the same transaction creates one deduped `reconcile_stream` job. QStash checks at `T+10s`, `20s`, `30s`, `45s`, `60s`, `90s`, `120s`, `180s`, `300s`, and `600s`; terminal sessions supersede the job without provider access, and ready/error results use the same `applyStreamVideoState()` transition as the webhook.
15. Stream readiness is a delivery contract, not a rendition-progress contract. `readyToStream=true` and `status.state='ready'` are necessary but not sufficient: trusted HLS/poster delivery URLs and valid V1 duration/size metadata must also be present. `pctComplete` is retained for diagnostics only. The readiness transition records the actual source (`stream_webhook`, `stream_reconcile`, `stream_ingest_cleanup`, or `stream_maintenance`) and only the first terminal transition may consume quota or establish metadata provenance.
16. Upload reservation and `expire_upload_session` are written in the same serializable transaction. The job defers to the authoritative `expiresAt`, releases abandoned reserved quota once, removes ready-but-unsubmitted assets without refunding consumed usage, and never deletes a review-consumed session. Daily maintenance backfills missing lifecycle jobs for pre-deploy rows.
17. Shopper cancellation is optimistic in the UI but durable in intent. If the browser is offline, the opaque cancel token stays in same-tab `sessionStorage` and is retried on reconnect, wizard reopen, or before a new upload. Only `2xx`, `404`, or terminal `409` clears the intent; network/5xx retains it and server expiry remains the final backstop.

### 9. Admin & widget UX contract
Video is a **vertical feature** — admin setting + wizard + moderation UI + public render ship together, not backend-only.
- **Gating:** global feature flag + per-merchant `WidgetSettings.videoReviewsEnabled`. The merchant setting lives in the **Reviews-widget behavior/settings area — not the visual/styling accordion** (it changes capability, not appearance).
- **Wizard:** the existing photo step ([step-photos.js](src/widget/reviews-section/review-form-modal/steps/step-photos.js)) **evolves into a media step** (generalized/renamed in place, *not* a parallel duplicate). With video enabled it shows photo + video affordances in the **same media step**, reusing the photo modal's design language (validation message, progress, retry/remove, toast errors). v1 policy `3 photos OR 1 video` (§6).
- **Upload stability:** one selected file owns one stable `<video>` preview node. Progress/status/error changes update separate DOM nodes and do not recreate the media element. Status polling backs off from roughly 2s to 5s and then 10s, tolerates three consecutive transient failures, shows a slower-processing message after 30s, and after 10m offers retry against the same session instead of uploading the file again.
- **Admin moderation minimum:** poster preview · **play in an admin-safe preview** (muted by default, explicit "unmoderated UGC" warning, no autoplay) · approve (→ `approved` + `visible`) · reject · hide/remove video media · delete review — hide/remove run through provider-aware adapter cleanup (§8).
- **Unapproved-video playback security (decision):** a video is uploaded to Stream with **`requireSignedURLs: true` while `pending`** (only the admin surface gets a signed token); **on approval it is flipped to public** by updating the Stream video metadata to `requireSignedURLs: false`. Cloudflare documents `requireSignedURLs` as the supported way to protect Stream videos and documents video metadata updates that include this field; the implementation still verifies the post-update manifest before treating publication as complete. The storefront then plays the approved video with no per-view token on the hot read path. This enforces the moderation gate **at the CDN** — an unapproved/offensive video is never publicly playable even if its `uid` leaks.
- **Public render:** a video shows only when `Review.status='approved'` **and** `ReviewMedia.visible=true`; poster-first, playback on interaction (§4).
- **Verification scope (detail → implementation plan):** video upload + playback must be verified across **desktop browsers, Android Chrome, iOS Safari/WebKit, and slow mobile networks**, plus the widget's **touch / focus / modal / back-button** behavior ([[ADR_0021_Shadow_DOM_Isolation_Of_Review_Surfaces]] / [[ADR_0025_Overlay_Shared_Surface_Foundation]]). Exact file/accordion placement, button states, copy strings, progress/retry UI, admin list/detail render, and test selectors (unit + Playwright runtime/interaction + admin-preview) are detailed in the implementation plan, not this ADR.

## Reasoning
- **Provider-agnostic model is the real foundation**, not the vendor pick: with `provider` + `providerAssetId` + `posterUrl` stored per row and a media-aware render contract, the streaming vendor becomes a swappable layer (see Migration Strategy).
- **Cloudflare Stream for video** wins on the actual requirement (TR-latency + fast start + predictable cost): Istanbul edge, automatic ABR, delivered-minute pricing (bandwidth/egress included, no separate egress fee), decoupled from the image credit pool. It was only ever held back by data-residency control — which is **not** the requirement here.
- **Cloudinary stays for images** because its transformation/optimization DX is genuinely strong and already integrated; images are small and poster-first, so the credit-model cost is not the video problem.
- **R2 master** makes "switch provider, nothing breaks" literally true and decouples us from both Cloudinary and Cloudflare simultaneously; egress-free reads make re-ingest cheap (only R2 storage + operations, no egress fee).
- **Reuse `visible`/`status`** keeps moderation in the existing, tested gate instead of a parallel status field.
- **Native `<video>` + lazy hls.js** keeps the widget bundle light and Shadow-DOM-safe; a full vendor player (e.g. `cloudinary-video-player`/`mux-player`) would bloat the bundle and lock the player to one vendor.
- **Why the v1 limits don't inflate cost (grounded):** Cloudflare Stream bills **per duration-minute stored + per delivered-minute, independent of file size and resolution** (verified: *"file size does not matter"*; a 1080p and a 720p clip of equal length cost the same). So the **1080p delivery cap adds zero Stream cost** and doesn't change R2 (the master is stored regardless of delivery resolution). The only real Stream cost levers are **duration** (60s ≈ 2× the per-video minutes of 30s) and **views**, both bounded by poster-first / no-autoplay / no-list-preload + per-merchant quota + moderation. **Non-Stream effects of the larger limits — real, not free:** the ≤150 MB master raises **R2 storage** (per-GB; cheap + TTL-able) and the shopper's **upload time/reliability** (the multipart concern, §1/§6); higher delivery resolution uses more **viewer bandwidth** on good connections (ABR adapts down on weak networks). Net: 150 MB/1080p/60s carries **no Stream-billing penalty**, with modest, bounded R2/upload/viewer-bandwidth trade-offs.

## Alternatives Considered
- **Video on Cloudinary (single vendor):** rejected — but **not** for lack of adaptive streaming: Cloudinary **does** support automatic HLS/DASH ABR (`sp_auto`). The real reasons are cost-coupling — its credit model meters video bandwidth + storage + per-rendition transformations out of the **same pool shared with images**, so video economics are poorly isolated and unpredictable at scale — plus the existing Renuvex integration being image-first. Keeps integration simplest but ties video cost to the image budget.
- **Mux for video:** strong alternative, kept as the documented fallback. Best-in-class DX, multi-CDN reliability, analytics, EU residency, and 100k free delivery-min/mo. Chosen against for v1 because Cloudflare Stream's Istanbul edge + delivered-minute pricing fit the TR-latency + cost-predictability goal more directly; the provider-agnostic model makes a later switch low-risk.
- **Bunny Stream for video:** cheapest + Istanbul edge, but its shared `b-cdn.net` domain has a documented history of being **blocked in Turkey** (thousands of sites affected). For a TR-primary product this is a real delivery risk; only viable via a custom-domain (CNAME) setup. Rejected as v1 default.
- **YouTube/Vimeo unlisted-link model (Judge.me-style):** offloads hosting entirely. Rejected for shopper UGC (high upload friction, brand/control loss); kept as a possible future merchant-tier option.
- **Self-host (R2/S3 + MediaConvert + own CDN):** maximum control, rejected for the ops burden — a managed streaming provider behind our abstraction gives the same portability without running an encoding pipeline.
- **Add a parallel `moderationStatus` column:** rejected — `visible` + `Review.status` already gate publication.
- **Nullable `publicId` + `@@unique([provider, providerAssetId])` for asset identity:** considered and rejected for v1 — `PendingReviewImage.publicId` is the `@id` primary key, so a pending video row still needs a non-null key; the provider-scoped `publicId` (only video prefixed) solves the PK cleanly and needs no image-row migration. The composite-unique remains available as an optional secondary index for lookups.

## Consequences
- **Provider cleanup outbox:** video cleanup and expired Cloudinary pending-image cleanup both run through `MediaProviderJob`. Failed provider deletes keep their DB identity for retry/reconciliation instead of deleting registry rows first.
- **Schema:** additive migration (new nullable/defaulted columns on `ReviewMedia` + `PendingReviewImage`, `Review.hasVideo`); one safe deploy. `Review.images` legacy mirror and the public `images[]` contract are untouched ([[ADR_0027_Review_Media_Read_Model]] / [[ADR_0029_Review_Media_Metadata]]).
- **New code:** provider-specific modules isolate R2 storage, Cloudflare Stream delivery, and Cloudinary image cleanup (`src/lib/media/providers/r2.ts`, `cloudflare-stream.ts`, `cloudinary-image.ts`) behind the DB outbox/job lifecycle. V1 does **not** yet expose a single generic runtime `MediaProvider` interface; the provider columns, provider-scoped asset identity, outbox job contract, and media-aware render surface keep the migration path open. Introduce a shared interface/registry when adding a second video provider or when duplication appears across provider modules.
- **Runtime (decision A):** R2 + Stream are integrated from the existing Next.js/Vercel API routes over HTTP — R2 via the S3-compatible API + presigned URLs, Stream via REST + signed webhook. No Cloudflare Worker, Wrangler, or R2/Stream bindings are introduced (those are Worker-only and unnecessary here).
- **Stream webhook is one-per-account:** Cloudflare Stream allows a **single webhook notification URL per account**. Multi-tenant routing + prod/dev separation are handled via the upload's `meta`/`creator` field and separate Stream environments — not multiple subscriptions; the `/api/webhooks/stream` handler dispatches by `meta`. **Signature verification is mandatory and must run on the RAW request body** (read the raw bytes and compute HMAC before any JSON parse — verifying a re-serialized/parsed body will fail or be forgeable).
- **Cleanup:** orphan/pending cleanup extends to **Stream uids** (delete via Stream API in the adapter). The existing Cloudinary cleanup stays image-only — correct, because video is **not** on Cloudinary, so the `resource_type:'video'` Cloudinary gotcha is avoided by construction.
- **V1 upload = R2-first (master) → Stream (playback), a two-asset lifecycle.** This is the chosen V1 (provider-agnostic, own-your-master). Honest cost vs direct-to-Stream: **two assets per video** to track + clean (extra orphan cases — R2-without-Stream, Stream-without-R2), R2 multipart client work, and the unguessable-URL ingest nuance. **Documented fallback if V1 risk must shrink — hybrid staged:** Phase 1 ships **direct-to-Stream (native TUS resumability, single asset)** on this *same* provider-agnostic schema/adapter/lifecycle; Phase 2 fast-follow adds the R2 master archive additively (async Stream→R2). Both paths share the identical data model, so the choice stays reversible and Phase 1 never blocks R2. **Open implementation-plan decision:** ship **S3 multipart (resumable)** to support 150 MB reliably on mobile, or **cap ≤100 MB** if multipart is deferred (§1/§6).
- **Structured data:** a future `VideoObject` JSON-LD on the independent structured-data surface ([[ADR_0024_Badge_Review_Surface_Separation]]) can expose video for rich results (deferred).
- **Observability/cost:** add per-merchant video quota metering + Stream usage to the maintenance/observability surface before public rollout.
- **Deferred:** mixed-media UI, AI video moderation, `ProductReviewSummary.videoReviewCount`, HLS analytics, and the full async media pipeline queue ([[Async_Media_Pipeline]]) remain separate phases.

## Provider Migration Strategy (why the vendor choice is reversible)
A later switch (e.g. Cloudflare Stream → Mux) is a **managed backfill, not a rewrite** — and seamless for shoppers/merchants (no downtime):
1. **New uploads:** flip the provider config → new videos go to the new provider. Instant, zero migration.
2. **Old videos keep playing** from their original provider — each row carries its own `provider`/`playbackUrl`/`posterUrl`; old + new coexist indefinitely. Reversible.
3. **Optional backfill:** a resumable, idempotent job re-ingests old videos into the new provider and updates rows transactionally (poster + playback together, only after verifying the new manifest returns 200). The repo already has this pattern ([[ADR_0029_Review_Media_Metadata]] backfill, daily-maintenance cron).
4. **Grounded feasibility:** both Mux and Cloudflare are HLS (player largely portable); Cloudflare Stream ingests from a URL; Mux exposes the master via `master_access`/static MP4 renditions; Mux even ships an OSS cross-platform migration tool ("Truckload"). **Owning the master in R2 removes even the egress/retrieval dependency** — re-ingest from your own bucket, lossless and egress-free (only R2 storage + operations cost).
5. **Honest gotchas to handle:** atomic poster+playback row update; cache + `VideoObject` SEO re-emit; signed-token re-issue if private playback is ever used; egress/time of pulling masters at millions-of-assets scale (eliminated by R2 master).
- **Design discipline that keeps this cheap:** store URLs/ids per row (no hardcoded vendor URL building at call sites); use a generic HLS player (hls.js) not a vendor-locked player component; keep upload/webhook/cleanup behind provider-isolated modules and the DB outbox. A generic adapter interface is deferred until a second video provider or meaningful provider-module duplication makes it valuable.

## Related Source Files
- [prisma/schema.prisma](prisma/schema.prisma)
- [src/lib/review-media.ts](src/lib/review-media.ts)
- [src/lib/review-media-metadata.ts](src/lib/review-media-metadata.ts)
- [src/lib/review-images.ts](src/lib/review-images.ts)
- [src/app/api/public/upload/sign/route.ts](src/app/api/public/upload/sign/route.ts)
- [src/app/api/public/upload/register/route.ts](src/app/api/public/upload/register/route.ts)
- [src/app/api/public/reviews/route.ts](src/app/api/public/reviews/route.ts)
- [src/lib/cleanup-orphan-images.ts](src/lib/cleanup-orphan-images.ts)
- [src/lib/cleanup-pending-uploads.ts](src/lib/cleanup-pending-uploads.ts)
- [src/widget/reviews-section/review-form-modal/steps/step-photos.js](src/widget/reviews-section/review-form-modal/steps/step-photos.js)
- [src/widget/reviews-section/review-modal.js](src/widget/reviews-section/review-modal.js)
- [src/widget/reviews-section/render/photo-strip.js](src/widget/reviews-section/render/photo-strip.js)
- [src/widget/core/helpers.js](src/widget/core/helpers.js)

## Related Notes
- [[Decision_Index]]
- [[Async_Media_Pipeline]] — the queue + moderation phase this unblocks
- [[ADR_0027_Review_Media_Read_Model]] · [[ADR_0029_Review_Media_Metadata]] · [[ADR_0012_Pending_Upload_Registry]]
- [[Competitor_Feature_Matrix]] · [[Roadmap]] · [[Open_Questions]]
