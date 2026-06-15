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

In progress. This report is not a production-readiness approval. Physical iPhone Safari, physical Android Chrome, and the 72-hour retained-review window are still pending.

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

## Physical Device Matrix

| Device | File | Selection / metadata | Resume | Processing / ready | Pending admin preview | Storefront HLS | Cleanup | Result |
|---|---|---|---|---|---|---|---|---|
| iPhone Safari | 1080p MOV, 30-80 MiB, 2-60 s | Pass | Pending | Pass | Pass | Published | Pending | Partial pass; quota UX fix awaits deploy verification |
| Android Chrome | 1080p MP4, 30-80 MiB, 2-60 s | Pending | Pending | Pending | Pending | Pending | Pending | Pending |

Record the physical device model, OS version, browser version, timestamps, and pass/fail result. Do not record customer media, upload tokens, signed playback URLs, R2 keys, or provider credentials.

## Canary Checkpoints

The 72-hour clock starts only after the Android review is approved and storefront playback is verified.

| Checkpoint | DB / jobs | Sentry | QStash / DLQ | Vercel 5xx | Ingest empty | Retained master + Stream | Other stores gated | Result |
|---|---|---|---|---|---|---|---|---|
| T0 | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending |
| T+1h | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending |
| T+24h | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending |
| T+48h | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending |
| T+72h | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending |

## Completion Gate

ADR_0031 remains draft until both physical devices pass, the retained Android review completes 72 hours without lifecycle or observability failures, final deletion removes Stream and R2 assets, and all acceptance evidence is recorded here.
