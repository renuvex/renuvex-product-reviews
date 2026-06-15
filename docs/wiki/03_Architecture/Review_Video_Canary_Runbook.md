---
type: architecture
project: renuvex-product-reviews
status: active
created: 2026-06-14
updated: 2026-06-15
last_verified: 2026-06-15
confidence: high
tags:
  - video
  - canary
  - operations
  - cloudflare
  - qstash
related:
  - "[[ADR_0031_Review_Media_V2_Provider_Agnostic_Video]]"
  - "[[Maintenance_Runbook]]"
  - "[[Config_And_Env_Map]]"
  - "[[Test_Strategy]]"
  - "[[Review_Video_Physical_Device_Acceptance_2026-06]]"
source_files:
  - "scripts/video-canary-ops.mjs"
  - "scripts/video-canary-ops-lib.mjs"
  - "scripts/verify-video-infrastructure.mjs"
  - "src/lib/media/access.ts"
  - "src/lib/media/jobs.ts"
  - "src/lib/media/sessions.ts"
  - "tests/unit/video-canary-ops.test.ts"
---

# Review Video Canary Runbook

## Purpose

This runbook controls the first real Review Video V1 production canary. The canary is limited to one internal store. It does not authorize a general merchant rollout.

The runtime capability requires all gates below:

```text
VIDEO_REVIEWS_ENABLED=true
AND WidgetSettings(reviews).videoReviewsEnabled=true
AND StoreSettings.videoMonthlyLimit>0
AND current UTC month reservedCount+consumedCount<videoMonthlyLimit
AND R2, Stream, QStash, and media-job configuration is available
```

The global flag is changed last. Preview and local-development deployments must not receive production provider credentials.

## Safe Operations Command

`pnpm video:canary:ops` is read-only by default. It reports each store's quota, merchant toggle, current-month reserved/consumed/remaining counts, provider configuration view, global flag view, and effective gate state.

```bash
# Report all store gates. No writes.
pnpm video:canary:ops

# Fail unless every DB gate and the loaded global flag are disabled.
pnpm video:canary:verify-disabled

# Report one store plus quota/session/job/review/media evidence. No writes.
pnpm video:canary:ops --storeId=<merchantId>

# Preview a mutation. Still no writes. Phase 6 continuation uses 20 only for the internal canary store.
pnpm video:canary:ops --storeId=<merchantId> --quota=20 --toggle=on

# Apply to one explicitly confirmed store.
pnpm video:canary:ops \
  --storeId=<merchantId> \
  --confirmStoreId=<merchantId> \
  --quota=20 \
  --toggle=on \
  --apply
```

Apply mode requires an existing `StoreSettings` row, an exact `confirmStoreId` match, and at least one explicit mutation. Unrelated review-widget settings are preserved. If the loaded global flag is already true and the mutation would newly activate a store, the command refuses unless `--allow-live-activation` is added deliberately.

The command reads `.env.local`. Before an apply operation, verify that its database URLs point to the intended environment. The command does not modify Vercel environment variables.

## Pre-Canary Gate

1. Confirm the intended production commit is deployed and healthy.
2. Run `pnpm video:canary:verify-disabled`.
3. Run the infrastructure verifier with a real temporary multipart write and webhook requirement:

```bash
node --env-file=.env.local scripts/verify-video-infrastructure.mjs \
  --expect-disabled \
  --require-webhook \
  --write-probe
```

4. Confirm the internal test store id from the actual ikas installation/DB record. Do not infer it from row order.
5. Dry-run the intended quota and toggle change and inspect the before/after plan. The initial canary used `5`; Phase 6 continuation raises only the verified internal store to `20` after this quota-aware UX deploy.
6. Apply quota and toggle with exact store confirmation.
7. Re-run the store report. Confirm usage, remaining quota, provider configuration, and effective state from the actual environment.

## Activation Order

1. Set the internal store quota to the approved canary value (`20` for the Phase 6 continuation; this is not a product default).
2. Enable the internal store's `videoReviewsEnabled` toggle.
3. Confirm every other store remains quota `0` and toggle `false`.
4. Set Vercel Production `VIDEO_REVIEWS_ENABLED=true` only after the DB gates are correct.
5. Redeploy Production and verify both the live no-store capability endpoint and the ops report are effective for only the internal store.

Do not add production provider variables to Preview. Do not enable multiple merchants during the first canary.

## Real Canary Scenario

Use a controlled MP4 larger than `10 MiB`, between `2` and `60` seconds, and no larger than `150 MiB`. Record timestamps and ids without copying tokens, signed URLs, secrets, or customer media into tickets/logs.

Verify in order:

1. Browser receives multipart URLs and uploads more than one R2 part.
2. Complete returns processing and creates one `prepare_stream` outbox job.
3. QStash delivers the signed job; the session progresses to Stream processing.
4. The real Stream webhook advances the session to ready and removes the ingest object.
5. Quota moves from reserved to consumed exactly once.
6. Review submission consumes the ready token and creates a pending video review.
7. Admin playback uses the short-lived signed endpoint; provider credentials and private playback data are not exposed by public status APIs.
8. Approval creates and completes one `publish_stream` job. Only then does the review become approved and its media visible.
9. Storefront renders a poster first and plays HLS only after lightbox open.
10. Review deletion creates cleanup work; Stream and R2 master assets are removed idempotently.

After each stage, run:

```bash
pnpm video:canary:ops --storeId=<merchantId>
```

The report includes current-month quota counts, recent sessions, provider-job status/action counts, video-review status counts, and pending/read-model processing counts. It is evidence, not a repair command.

## Exit Criteria

- No session is stuck in `uploading`, `completing`, or `processing` beyond its expected window.
- No provider job remains `failed`, stale `processing`, or `dead`.
- The transient ingest object is removed by application cleanup; the 24-hour bucket lifecycle is only a backstop.
- After review deletion, the Stream asset and R2 master object are absent.
- Reserved quota is zero; consumed quota reflects exactly the completed canary upload.
- No unexpected Sentry issue appears with `source=media-job` or video API routes.
- Public review APIs expose normalized media fields only, never provider credentials or private admin playback tokens.

## Rollback

Rollback closes exposure before removing infrastructure:

1. Set Vercel Production `VIDEO_REVIEWS_ENABLED=false` and redeploy.
2. Set the canary store toggle off and quota to `0` using the ops command.
3. Keep R2, Stream, webhook, QStash, and provider env configured until existing sessions and cleanup jobs reach terminal states.
4. Verify no reserved quota, stuck session, failed/dead job, or stale ingest object remains.

Do not delete provider credentials or webhook configuration while cleanup work is pending.

## Physical Device Follow-Up

Playwright emulation is not physical-device acceptance. Phase 6 must repeat selection, metadata, multipart upload, interruption/resume, processing, admin preview, HLS playback, fullscreen, audio, pause, browser back, and modal close on a real iPhone Safari device and a real Android Chrome device.

The dated evidence ledger is [[Review_Video_Physical_Device_Acceptance_2026-06]]. The 72-hour clock starts only after the retained Android review is approved and storefront playback is verified. If media-path code changes during the window, add the regression test, redeploy, and restart the clock; documentation-only changes do not restart it.
