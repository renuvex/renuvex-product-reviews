---
type: architecture
project: renuvex-product-reviews
status: active
created: 2026-06-15
updated: 2026-06-15
last_verified: 2026-06-15
confidence: high
tags:
  - video
  - physical-device
  - canary
  - acceptance
related:
  - "[[ADR_0031_Review_Media_V2_Provider_Agnostic_Video]]"
  - "[[Review_Video_Canary_Runbook]]"
  - "[[Test_Strategy]]"
source_files:
  - "src/app/api/public/upload/video/initiate/route.ts"
  - "src/components/home-page/index.tsx"
  - "src/components/home-page/MediaPreviewState.ts"
  - "src/app/api/webhooks/cloudflare-stream/route.ts"
  - "src/lib/media/jobs.ts"
  - "src/lib/media/reconciliation.ts"
  - "src/lib/media/sessions.ts"
  - "src/widget/reviews-section/review-form-modal/media/video-upload.js"
  - "src/widget/reviews-section/review-form-modal/steps/step-media.js"
  - "tests/unit/admin-video-preview-contract.test.ts"
  - "tests/unit/media-route-contracts.test.ts"
  - "tests/widget-interaction-smoke.spec.ts"
  - "tests/widget-media-cross-browser.spec.ts"
  - "scripts/verify-video-infrastructure.mjs"
  - "scripts/video-canary-ops.mjs"
---

# Review Video Physical Device Acceptance - June 2026

## Status

In progress. This report is not a production-readiness approval. Post-hardening physical Android Chrome and iPhone Safari checks passed interruption/retry, offline removal, processing-to-ready, moderation, storefront playback, fullscreen/audio/back/modal-close, and desktop Chrome playback. A storefront lightbox transition polish fix is still awaiting deploy verification, and the 72-hour retained-review window has not started.

## Verified Preflight

Verified on 2026-06-15 at approximately 00:00 TRT:

- Vercel Production deployment `88e1041b` is `READY` and serves `app.renuvex.app` plus `widget.renuvex.app`.
- The private master and transient ingest R2 buckets are isolated and accessible.
- An arbitrary merchant-origin CORS preflight succeeded for multipart `PUT`.
- A temporary presigned multipart part upload returned a readable `ETag`; the multipart upload was aborted and cleaned.
- The public ingest custom domain was reachable.
- Cloudflare Stream API access and the account webhook configuration succeeded.
- QStash had ten media-worker deliveries; retrying messages eventually reached `DELIVERED`.
- One intentional invalid-job DLQ probe from earlier testing was identified by its all-zero job id, deleted, and the media-worker DLQ was rechecked as empty.
- Unsigned access to `/api/internal/media-jobs` returned `401`.
- Sentry had no production `source=media-job` events and no video-route error events in the preceding 24 hours.
- Vercel had no matching production error logs for the `video` query in the preceding 24 hours.

## Durable Provider Evidence Before Phase 6

The internal store has quota `5` and merchant video toggle enabled. Current DB evidence is:

- quota: `reserved=0`, `consumed=2`
- sessions: `aborted=2`, `consumed=1`
- provider jobs: `succeeded=9`, `superseded=1`
- provider job actions: `cleanup_ingest=3`, `cleanup_video=3`, `prepare_stream=3`, `publish_stream=1`
- retained video reviews: `0`
- retained video `ReviewMedia`: `0`
- retained pending media: `0`

Deletion does not refund consumed quota because provider processing cost has already occurred.

## Activation State

Commit `9f20cdc9` deployed successfully to Vercel Production as deployment `dpl_JBK7wZ69ZLBNcFjoHJwqrccRUYdB`. The deployment is `READY`, serves `app.renuvex.app` and `widget.renuvex.app`, and contains the pending-admin preview hardening.

After deployment:

- the live internal-store public settings response returned `videoReviewsEnabled=false`
- the R2 multipart write/abort, Stream token, and Stream webhook preflight passed again
- unsigned access to the media-job worker returned `401`
- the QStash media-worker DLQ was empty
- the latest ten media-worker deliveries reached `DELIVERED`, including messages that exercised retry
- Sentry reported zero matching production media-path errors in the preceding hour

Physical-device acceptance must start only after Vercel Production `VIDEO_REVIEWS_ENABLED=true` is set deliberately and redeployed. Preview remains without production Cloudflare and QStash credentials.

## Controlled Reactivation

Verified on 2026-06-15 at approximately 00:52 TRT:

- Vercel Production deployment `dpl_2ASH38BDDDg632wjipyGquHQ5h7q` is `READY`.
- The deployment commit is `681ef9647aa198e3bd9af1e8554f7e4475afab45`.
- The live internal-store public settings response returned `videoReviewsEnabled=true`.
- The second store returned no reviews widget settings and no video capability.
- Unsigned access to `/api/internal/media-jobs` returned `401`.
- QStash media-worker DLQ returned zero messages.
- Sentry reported zero matching production media-path errors in the preceding hour.
- Vercel production error logs for the `video` query returned no entries in the preceding hour.

The two-device physical acceptance can start. The 72-hour canary clock has not started yet; it starts only after the Android review is approved and storefront playback is verified.

Preview must remain without production Cloudflare and QStash credentials.

## iOS Safari Blocker And Fix

Verified on 2026-06-15 during the first physical iOS Safari attempt:

- iOS upload reached Cloudflare Stream successfully, but the shopper UI stayed in `processing`.
- DB/provider evidence showed the Stream asset was already `readyToStream=true`, `status.state='ready'`, `pctComplete=100`, with HLS and thumbnail available, while `VideoUploadSession.status` stayed `processing` and `PendingReviewImage.processingStatus` stayed `pending`.
- The root cause was the webhook route applying the signed webhook payload directly. A webhook payload can be insufficient for the final delivery fields the DB readiness contract requires, so the route now fetches the canonical Stream video record before applying readiness.
- The video-card remove button also stayed visible after cancellation because the media step only re-rendered while `videoUpload` existed. The state listener now clears the video card when a previous video is removed, and the remove button handles both `pointerdown` and `click` for iOS tap reliability.
- Contract coverage was added for canonical Stream hydration and pending video-card removal.

The 72-hour canary clock remains not started. Physical-device acceptance must restart from a deployment that includes this fix.

## iOS Safari Pass And Quota-Limit Observation

Verified on 2026-06-15 after deploying commit `64dfc5a7`:

- The physical iOS Safari flow passed the corrected critical path: video upload reached ready, review submit succeeded, admin preview/review worked, admin approval succeeded, and the approved video review became visible on the storefront.
- The video-card remove button worked correctly after the pointer/click-safe removal fix.
- A second immediate video selection showed the generic widget message `Video yuklenemedi. Tekrar deneyin.`
- This was not evidence of a Stream processing failure. Production logs for the period showed repeated `POST /api/public/upload/video/initiate` responses with HTTP `429`.
- DB evidence for the internal canary store at the same point showed monthly video usage at `consumed=4`, `reserved=1`, with the canary quota set to `5`. Therefore `consumed + reserved = 5/5`, so a new upload could be rejected by the quota gate. Repeated retries can also trip the initiate rate limiter, which returns the same HTTP class.
- Product decision: quota is not only a test-stage guard. It is a permanent cost-control and abuse-control layer for video UGC. The canary uses a deliberately small quota to keep provider spend and cleanup blast radius bounded.
- UX follow-up implemented locally: every real wizard open now queries a no-store capability endpoint. A full quota opens the wizard photo-only, while race/cache cases are still enforced by initiate and map `video_quota_exceeded`, `rate_limited`, disabled, and provider-unavailable codes to specific copy and retry policy. This remains unverified in production until the change is deployed.
- After deployment, only the internal canary quota will be raised from `5` to `20` through the dry-run-first operations command. This is a Phase 6 test value, not the general merchant default.

The 72-hour canary clock still does not start from the iOS review. It starts only after the Android review is approved and storefront playback is verified.

## Quota-Aware Capability Deployment

Verified on 2026-06-15 after deploying commit `84276d8b` as Vercel Production deployment `dpl_AjWAf29bnLSQWxA8ceQ8gdLBQQiz`:

- The deployment was `READY` and matched the intended commit.
- Before mutation, the fresh capability endpoint returned `quota_exceeded` for the internal store with usage `reserved=1`, `consumed=4`, limit `5`.
- Dry-run showed only the internal store changing from quota `5` to `20`; the merchant toggle remained enabled.
- Exact-store apply set the internal limit to `20`, leaving current usage at `5` and remaining capacity at `15`.
- The second store remained quota `0`, toggle disabled.
- Live no-store capability returned `enabled=true` / `enabled` for the internal store and `enabled=false` / `merchant_disabled` for the second store.
- Vercel runtime logs showed the capability requests as HTTP `200` and no matching capability errors.
- One upload session remains legitimately reserved until `2026-06-15T22:36:07Z`; it is not yet expired under the 24-hour session contract and must be released by the existing expiration cleanup rather than manual counter editing.

Android physical-device acceptance can now continue. The 72-hour clock has not started.

## iOS Review Deletion Cleanup

Verified on 2026-06-15 after deleting the published iOS review from the admin panel:

- The review and its `ReviewMedia` row were removed, and no pending-media row remained for the consumed upload session.
- The review deletion transaction created one `cleanup_video` outbox job carrying the Stream UID and R2 master key.
- QStash delivered the worker request, the job succeeded on its first attempt, and no matching DLQ message was present.
- Direct provider reads confirmed the Stream asset returned HTTP `404` and the R2 master object returned `not_found`.
- No failed, dead, or processing media job remained, and Sentry had no matching media-job/admin-delete error during the verification window.
- Consumed monthly quota remained consumed, as designed; deleting a published video does not refund monthly usage.

The iOS cleanup criterion passes. The physical iOS interruption/resume criterion remains pending until a real iPhone is available again.

## Android Physical Attempt And Resume Finding

Verified on 2026-06-15 during the physical Android Chrome attempt:

- Video selection, upload completion, Stream readiness, review submission, admin signed preview, approval, storefront playback, and review deletion all completed.
- Deletion cleanup passed: the review/media/pending rows were absent, the `cleanup_video` job succeeded on its first QStash delivery, Stream returned HTTP `404`, R2 master returned `not_found`, the DLQ was empty, and no matching Sentry error was present.
- The interrupted upload exposed a client resume bug. A transient `/status` failure caused the widget to delete its stored opaque session token and call `/initiate` again. DB evidence showed the abandoned session still `uploading/reserved` and a second session for the same file size completing successfully.
- The backend multipart contract was not the cause: `/parts` remains server-authoritative through R2 `ListParts` and does not re-sign completed parts.
- The widget now discards a stored session only after an explicit `404 upload_not_found` or `404 invalid_or_expired_upload`. Transient network/5xx status failures retain the token and are retried before resuming missing parts.
- Regression coverage pins that a transient status failure does not create a second initiate request and every subsequent parts request uses the original token.

Because the Android review was deleted immediately, this attempt validates cleanup but does not start the 72-hour retained-review window. Android interruption/resume must be repeated after deployment of the fix.

## Android Resume Retest And Retained Review

Verified on 2026-06-15 after deploying the resume fix:

- The second physical Android Chrome test passed the corrected flow: video selection, upload, retry/resume, Stream readiness, review submit, admin signed preview, approval, and storefront playback.
- The retained review remains in the production DB and was not deleted after the retest:
  - `Review.id=0f87eb64-40d1-4497-9933-8f142d7981e8`
  - `Review.status=approved`
  - `Review.hasVideo=true`
  - `Review.moderationVersion=2`
- The attached video media remains ready and visible:
  - `ReviewMedia.id=9b837155-dfd0-49e4-a0fc-ae49ac1cf946`
  - `resourceType=video`
  - `provider=cloudflare_stream`
  - `providerAssetId=1f38e9db682fe3df9dd27702549541d7`
  - `processingStatus=ready`
  - `visible=true`
  - `sourceProvider=cloudflare_r2`
  - `sourceAssetId=review-videos/stores/02786d4b-a09b-4b36-ad8c-56e6d396f6fd/b26699f1-387c-4cf8-b8e7-6a2fa49b8acd/master`
  - `bytes=102476472`
  - `durationMs=23000`
- The consumed upload session is `VideoUploadSession.id=b26699f1-387c-4cf8-b8e7-6a2fa49b8acd`, with status `consumed`, quota state `consumed`, Stream UID `1f38e9db682fe3df9dd27702549541d7`, and no stored error code.
- The production canary ops snapshot showed one approved video review, one ready `ReviewMedia` row, and one ready pending-media row for the internal canary store.

This corrects the earlier Android row that said resume was still pending. The 72-hour canary clock still has not started; it must be started explicitly and recorded as `T0` before checkpoint tracking begins.

## Reliability Hardening Before Canary T0

Implemented locally on 2026-06-15 after the physical observations:

- Stream readiness no longer depends on webhook delivery alone. A deduped DB outbox job checks canonical Stream status at 10/20/30/45/60/90/120/180/300/600 seconds and applies the same state transition as the webhook.
- Session reservation and exact `expiresAt` cleanup are committed in one serializable transaction. Ready-but-unsubmitted video is cleaned at expiry, consumed review sessions are protected, and daily maintenance backfills lifecycle jobs for pre-deploy sessions.
- The media step preserves one `<video>` preview element across progress/status updates, avoiding the mobile preview flash caused by repeated element recreation.
- Retry retains the original opaque upload session and already-read metadata. Completed multipart parts remain server-authoritative and contribute to resumed progress.
- Offline X/removal clears the UI immediately but stores the cancellation intent in same-tab `sessionStorage`; reconnect, wizard reopen, or a new upload flushes it. `2xx`, `404`, and terminal `409` clear the intent; network/5xx retains it.
- Processing polling backs off from roughly 2s to 5s and then 10s, tolerates three consecutive transient failures, shows slower-processing copy after 30s, and after 10 minutes retries the same session instead of re-uploading.

These changes are not yet physical-device evidence. After deployment, repeat Android Chrome and iPhone Safari interruption, resume, offline cancel, processing, X/removal, submit, moderation, and playback. Only then record a new retained Android review and explicit canary `T0`.

## Post-Hardening Physical Retest

User-reported physical acceptance on 2026-06-15 after deployment:

- Android Chrome and iPhone Safari both passed network interruption followed by retry/resume.
- X/removal cleared the media UI correctly.
- Stream processing reached `ready`; longer source videos took approximately one to two minutes. Cloudflare exposes canonical `readyToStream` and processing status/progress but does not publish a fixed completion-time SLA, so this remains within the product's existing 10-minute delayed-processing threshold rather than being classified as a stuck job.
- Admin signed preview, approval, storefront HLS playback, fullscreen, audio, browser back, and modal close passed.
- Desktop Chrome repeated the playback flow without a functional failure.
- Storefront video-to-video lightbox navigation exposed a visual-only regression: the browser-native center play control moved horizontally because the directional slide animation was applied to the `<video>` element itself. The source now uses a video-specific opacity transition so native controls remain centered. This fix requires deploy verification before canary `T0`.

## Stream Readiness Latency Diagnosis

Verified from the controlled approximately `100 MiB` / 4K source test and current source on 2026-06-16:

- Browser upload completion to the R2 master was separate from provider readiness.
- R2-to-Stream preparation took approximately `14s`; Stream processing to a playable provider state took approximately `32s`.
- The prior backend contract still required `pctComplete=100`, even though Cloudflare documents `readyToStream=true` as the playable signal. That could keep the shopper in `processing` while remaining rendition work continued.
- The prior missed-webhook fallback also had a `45s -> 105s` gap. The revised schedule checks at `10/20/30/45/60/90/120/180/300/600s`.
- The new terminal contract requires `readyToStream=true`, provider `state='ready'`, trusted HLS and poster URLs, and valid V1 duration/size metadata. `pctComplete` is retained only as provider diagnostics.
- The actual terminal source is recorded as webhook, reconciliation, ingest cleanup, or maintenance. Concurrent terminal attempts consume quota once and preserve the first winning provenance.

This is implementation evidence, not renewed physical-device acceptance. After deployment, repeat one small-video and one approximately `100 MiB` / high-resolution timing measurement and record provider-ready -> DB-ready -> widget-ready latency before canary `T0`.

Production DB evidence at the time of the report contained four approved, ready, visible video reviews and one pending, ready, hidden video review. File names are not required for lifecycle identity; the canary must select and record one retained `Review.id` explicitly before `T0`.

## Physical Device Matrix

| Device | File | Selection / metadata | Resume | Processing / ready | Pending admin preview | Storefront HLS | Cleanup | Result |
|---|---|---|---|---|---|---|---|---|
| iPhone Safari | Controlled video within V1 policy | Pass | Pass after reliability deploy | Pass; longer input observed at ~1-2 min | Pass | Pass | X/removal pass | Functional pass; device/OS/browser versions still need recording |
| Android Chrome | Controlled video within V1 policy | Pass | Pass after reliability deploy | Pass; longer input observed at ~1-2 min | Pass | Pass | X/removal pass | Functional pass; lightbox transition fix requires deploy recheck and device versions still need recording |
| Desktop Chrome | Controlled video within V1 policy | Pass | Not a physical-network acceptance target | Pass | Pass | Pass | Not exercised in this report | Supplemental pass |

Record the physical device model, OS version, browser version, timestamps, and pass/fail result. Do not record customer media, upload tokens, signed playback URLs, R2 keys, or provider credentials.

## Canary Checkpoints

The 72-hour clock starts only after the Android review is approved and storefront playback is verified.

As of the Android retest update above, an approved retained Android video review exists, but the 72-hour clock is intentionally not started yet. Record an explicit `T0` before changing checkpoint rows from `Pending`.

| Checkpoint | DB / jobs | Sentry | QStash / DLQ | Vercel 5xx | Ingest empty | Retained master + Stream | Other stores gated | Result |
|---|---|---|---|---|---|---|---|---|
| T0 | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending |
| T+1h | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending |
| T+24h | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending |
| T+48h | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending |
| T+72h | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending |

## Completion Gate

ADR_0031 remains draft until both physical devices pass, the retained Android review completes 72 hours without lifecycle or observability failures, final deletion removes Stream and R2 assets, and all acceptance evidence is recorded here.
