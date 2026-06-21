---
type: architecture
project: renuvex-product-reviews
status: active
created: 2026-06-21
updated: 2026-06-21
last_verified: 2026-06-21
confidence: high
tags:
  - video
  - mux
  - operations
  - repair
  - qstash
related:
  - "[[ADR_0032_Review_Video_On_Mux]]"
  - "[[Review_Video_Canary_Runbook]]"
  - "[[Maintenance_Runbook]]"
  - "[[Async_Media_Pipeline]]"
  - "[[Sentry_Operations]]"
source_files:
  - "src/lib/media/jobs.ts"
  - "src/lib/media/lifecycle.ts"
  - "src/lib/media/sessions.ts"
  - "src/lib/media/outbox.ts"
  - "src/lib/media/dispatcher.ts"
  - "src/lib/media/reconciliation.ts"
  - "src/lib/media/video-processing.ts"
  - "src/lib/media/providers/mux.ts"
  - "src/app/api/webhooks/mux/route.ts"
  - "tests/unit/media-jobs.test.ts"
  - "tests/unit/media-route-contracts.test.ts"
---

# Review Video Manual Repair Runbook

## Purpose
Operator path for rare Mux review-video lifecycle failures after webhook, reconciliation, expiry, and `MediaProviderJob` retry paths have not converged. Manual repair is not a shortcut: `VideoUploadSession`, `ReviewMedia`, `PendingReviewImage`, `WebhookEvent`, `MediaProviderJob`, and Mux provider state must converge together.

## Official Mux Rules That Matter
Mux direct-upload cancel only succeeds while the upload is `waiting` ([cancel](https://www.mux.com/docs/api-reference/video/direct-uploads/cancel-direct-upload)). Retrieve upload before repair because it can return `status` and `asset_id` ([retrieve](https://www.mux.com/docs/api-reference/video/direct-uploads/get-direct-upload)). Once an asset exists, provider cleanup is asset deletion ([delete asset](https://www.mux.com/docs/api-reference/video/assets/delete-asset)). Webhooks should quickly update state or trigger async work, and Mux can retry timed-out attempts ([webhooks](https://www.mux.com/docs/core/listen-for-webhooks)). Signature verification uses the raw request body and endpoint secret ([signatures](https://www.mux.com/docs/core/verify-webhook-signatures)).

## Golden Rules
- Start read-only. Collect DB, job, webhook, and Mux evidence before choosing a repair.
- Never paste tokens, upload URLs, signed URLs, signing keys, webhook secrets, raw request bodies, or customer media into docs, tickets, logs, or chat.
- Do not mutate DB, Vercel, QStash, Mux, or Cloudflare without explicit approval with scope, risk, rollback, and verification.
- Do not edit provider state alone, delete DB rows to hide cleanup failure, or refund a review-consumed session.
- Do not revoke Mux credentials/webhooks while unresolved media jobs still reference Mux resources.
- Cloudflare DNS/zone and future Worker delivery infrastructure are outside this runbook.

## Evidence To Collect First
Collect only IDs, states, timestamps, and sanitized error codes.

| Surface | Evidence |
|---|---|
| `MediaProviderJob` | `id`, `provider`, `resourceType`, `action`, `status`, attempts, timing fields, `lastErrorCode`, `lastErrorAt`, and non-secret payload IDs. Active work is `pending`, `failed`, or stale `processing`; terminal failure is `dead`. |
| `VideoUploadSession` | `id`, `storeId`, `productId`, `status`, `quotaState`, `reservedMonth`, `consumedAt`, `providerUploadId`, `providerAssetId`, playback ID presence only, `publicId`, `errorCode`, `expiresAt`, `updatedAt`. Do not log playback URLs or signed URLs. |
| `Review` / `ReviewMedia` | review status, visibility, `moderationVersion`, media provider, `providerAssetId`, public playback ID presence, processing state, and public URL host. |
| `PendingReviewImage` | `publicId`, `provider`, `resourceType`, `storeId`, `productId`, `uploadSessionId`, `createdAt`; video `publicId` should be `mux:<assetId>`. |
| `WebhookEvent` | provider event ID/type, session/upload/asset IDs, status, provider-created/received/processed timestamps, sanitized `lastError`. Never paste raw payloads. |
| Quota | `StoreVideoUsage.reservedCount` and `consumedCount` for the store/month. Abandoned unsubmitted uploads may release quota; submitted/consumed reviews should stay consumed unless product policy changes. |
| Mux | direct-upload `status` and `asset_id`; asset existence/status; playback ID policy only. Use the matching Mux environment and do not paste signed URLs. |

## Failure Classification
| Symptom | Likely Class | Primary Repair Path |
|---|---|---|
| `cleanup_video` is `failed` or `dead` | Provider cleanup did not converge | Retrieve upload; delete known/recovered asset; retry or recreate cleanup through outbox |
| Cancel followed by `video.upload.asset_created` | Late asset after cancellation race | Webhook should enqueue asset-scoped `cleanup_video`; verify job and dispatch |
| Session is `ready` but no review was submitted and `expiresAt` passed | Abandoned ready upload | Expiry path should queue cleanup and release consumed quota when `consumedAt` is null |
| Session is `uploading`, `uploaded`, or `processing` beyond reconcile window | Delayed/missed webhook or Mux processing issue | Let `reconcile_video` run; inspect Mux asset before failing/deleting |
| Approved review has no public playback | Publish convergence failure | Retry/enqueue `publish_video` for latest `moderationVersion` |
| Rejected/hidden review has public playback | Protect convergence failure | Retry/enqueue `protect_video` for latest `moderationVersion` |
| Deleted review has a Mux asset | Delete cleanup failure | Verify review delete state, then retry/enqueue `cleanup_video` |
| Webhook row is `orphan` | Mux event could not map to a session | Use provider IDs to locate matching session/upload/asset before any mutation |

## Preferred Repair Order
1. Let the queued/scheduled path converge if a job is claimable and not past `maxAttempts`.
2. If a job exists, rerun it through `processMediaProviderJob(jobId)` from a controlled server-side/local script with the same environment configuration. Do not bypass the QStash signature gate on `/api/internal/media-jobs`.
3. If stale `processing`, confirm the lock is older than `MEDIA_JOB_STALE_LOCK_MS`; the worker can reclaim it.
4. If `dead`, prepare an approved one-off plan to reset the job to claimable state or enqueue a replacement.
5. If no job exists and evidence proves a missing outbox row, enqueue the narrowest provider-neutral job through `enqueueMediaProviderJob`, then dispatch it normally.
6. Verify provider, DB, quota, and public API state.

## Mux Cleanup Repair Detail
Use this when an asset may exist after cancel, modal close, expiry, reject, or delete.

Expected behavior:
- Start from known `providerAssetId`, then retrieve `providerUploadId` before cancel.
- If retrieve returns `asset_id`, delete that asset and treat asset deletion as the primary cleanup.
- If no asset exists and upload status is `waiting`, cancel the direct upload.
- If retrieve/cancel fails but a known asset ID exists, continue asset deletion.
- If no asset ID is known and retrieve/cancel fails, fail/retry the job instead of pretending cleanup succeeded.
- After success, delete the `PendingReviewImage` row for `pendingPublicId`, set a non-consumed session to `aborted`, release reserved quota once, and release consumed quota once only when `consumedAt` is null and the session is not `consumed`.

## Publish, Protect, And Webhook Repair
When moderation state and public playback IDs disagree, confirm the latest `moderationVersion`, then retry/enqueue `publish_video`, `protect_video`, or `cleanup_video`. Approved media should converge to one public playback ID before becoming public. Rejected, hidden, or deleted media must not keep public playback IDs.

Webhook repair is audit-first. Use `WebhookEvent` to prove delivery, signature/dedupe acceptance, session mapping, and intended job shape. Do not edit `WebhookEvent` as the retry engine; convergence belongs in `MediaProviderJob`.

## Verification Checklist
After a repair, verify:
- No active `pending`, `failed`, stale `processing`, or `dead` job remains for the same session/upload/asset/review unless intentionally deferred.
- Cleanup expected: Mux asset is gone; `PendingReviewImage` has no orphan video row.
- Public playback removed: no public playback ID remains and storefront does not expose a tokenless playable URL.
- Public playback created: storefront exposes only public Mux delivery URLs, never provider secrets, upload URLs, signed URLs, private playback IDs, or raw provider IDs.
- `VideoUploadSession.status`, `quotaState`, `consumedAt`, and `StoreVideoUsage` counters match ownership rules and cannot double-refund.
- `ReviewMedia` matches admin moderation state, and `WebhookEvent` remains audit/dedup only.

## Operator Checklist
1. Identify the session/upload/asset/review/media IDs.
2. Collect the evidence sections above without secrets.
3. Classify the failure.
4. Choose the narrowest repair path that reuses `MediaProviderJob`.
5. Ask for explicit approval before any mutation.
6. Execute one repair path only.
7. Verify DB, Mux, quota, public API, and job terminal state.
8. Add a short [[Log]] entry only if the incident reveals a durable lesson or architecture change.

## Obsidian Links
- [[ADR_0032_Review_Video_On_Mux]]
- [[Review_Video_Canary_Runbook]]
- [[Maintenance_Runbook]]
- [[Async_Media_Pipeline]]
- [[Sentry_Operations]]
