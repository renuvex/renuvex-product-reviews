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
  - "src/components/home-page/index.tsx"
  - "src/components/home-page/MediaPreviewState.ts"
  - "tests/unit/admin-video-preview-contract.test.ts"
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

## Activation Safety Hold

The local operations environment reports `VIDEO_REVIEWS_ENABLED=false`, but the live public settings response currently reports `videoReviewsEnabled=true` for the internal store and `false` for the other store. Production activation is therefore already effective for the internal store.

Before physical-device acceptance starts:

1. Set Vercel Production `VIDEO_REVIEWS_ENABLED=false` and redeploy.
2. Verify the live internal-store public settings response returns `videoReviewsEnabled=false`.
3. Deploy the pending-admin preview hardening.
4. Re-run the full automated and infrastructure gates.
5. Set the Production flag to `true` only for the controlled acceptance window.

Preview must remain without production Cloudflare and QStash credentials.

## Physical Device Matrix

| Device | File | Selection / metadata | Resume | Processing / ready | Pending admin preview | Storefront HLS | Cleanup | Result |
|---|---|---|---|---|---|---|---|---|
| iPhone Safari | 1080p MOV, 30-80 MiB, 2-60 s | Pending | Pending | Pending | Pending | Pending | Pending | Pending |
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
