---
type: architecture
project: renuvex-product-reviews
status: active
created: 2026-06-14
updated: 2026-07-30
last_verified: 2026-06-21
confidence: high
tags:
  - video
  - canary
  - operations
  - mux
  - qstash
related:
  - "[[ADR_0032_Review_Video_On_Mux]]"
  - "[[Maintenance_Runbook]]"
  - "[[Review_Video_Manual_Repair_Runbook]]"
  - "[[Config_And_Env_Map]]"
  - "[[Test_Strategy]]"
  - "[[Review_Video_Physical_Device_Acceptance_2026-06]]"
source_files:
  - "src/lib/media/access.ts"
  - "src/lib/media/outbox.ts"
  - "src/lib/media/dispatcher.ts"
  - "src/lib/media/lifecycle.ts"
  - "src/lib/media/jobs.ts"
  - "src/lib/media/reconciliation.ts"
  - "src/lib/media/sessions.ts"
  - "src/lib/media/providers/mux.ts"
  - "src/app/api/public/upload/video/initiate/route.ts"
  - "src/app/api/public/upload/video/complete/route.ts"
  - "src/app/api/public/upload/video/metrics/route.ts"
  - "src/app/api/webhooks/mux/route.ts"
  - "src/widget/reviews-section/review-form-modal/media/video-upload.js"
  - "prisma/migrations/20260621003000_review_video_mux_contract_drop_legacy_columns/migration.sql"
  - "tests/unit/media-jobs.test.ts"
  - "tests/unit/video-upload-routes.test.ts"
  - "tests/unit/media-route-contracts.test.ts"
---

# Review Video Mux Canary Runbook

## Purpose
This runbook controls the Mux review-video canary. The first canary is Preview-only. Production activation is a later gate and must use the separate production Mux environment.

## Environment Separation
- Preview/local: Mux environment `Renuvex - Products Review (Preview)`.
- Production: Mux environment `Renuvex - Products Review`.
- Do not mix token IDs, token secrets, signing keys, or webhook secrets across environments.
- Do not create a Mux webhook resource until the matching deployed `/api/webhooks/mux` URL exists.
- Do not use `NEXT_PUBLIC_MUX_*`; Mux secrets are server-only.

## Capability Gate
The runtime video capability requires all gates below:

```text
VIDEO_REVIEWS_ENABLED=true
AND WidgetSettings(reviews).videoReviewsEnabled=true
AND StoreSettings.videoMonthlyLimit>0
AND current UTC month reservedCount+consumedCount<videoMonthlyLimit
AND MUX_TOKEN_ID/MUX_TOKEN_SECRET/MUX_VIDEO_QUALITY are valid
AND MUX_SIGNING_KEY_ID/MUX_SIGNING_KEY_PRIVATE are valid
AND QStash and MEDIA_JOB_BASE_URL are valid
```

`MUX_WEBHOOK_SECRET` is deliberately excluded from the upload/API capability gate. It is required only by `/api/webhooks/mux`, which returns `503` until the Mux webhook endpoint exists and the matching environment secret is written.

`MUX_VIDEO_QUALITY` is intentionally limited to `basic|plus`. Mux supports `premium`, but this product does not expose it until ADR/test updates say otherwise.

`VIDEO_UPLOAD_CHUNK_SIZE_KB` and `VIDEO_UPLOAD_CHUNK_ATTEMPTS` tune the browser-to-Mux UpChunk transfer only. Defaults are `8192` KB and `5` attempts. They are not evidence of Mux processing speed; processing must be measured from webhook/job/session timestamps.

## Stop/Go
Stop and get explicit approval before any migration apply, deploy, Vercel env mutation, Mux write, external resource delete/revoke, or destructive DB change. State scope, risk, rollback, and post-action verification.

## Preview Sequence
1. Read-only evidence freeze: Git branch/status, deployment target, DB video row counts, Mux Preview credentials presence, QStash, and Preview DB isolation. Run `pnpm verify:preview-db-isolation -- --json` before pushing a branch that can trigger Vercel Preview. This check must prove Preview `DATABASE_URL` and `DIRECT_URL` do not target the Production Supabase project.
2. Apply only approved local code/doc changes. Run `pnpm exec tsc --noEmit`, `pnpm lint`, `pnpm prisma:validate`, `pnpm test:unit`, `pnpm build:widget`, and `pnpm check:widget-js`.
3. After approval, apply migrations in the target DB:
   - `20260617090000_review_video_mux_additive`
   - `20260617100000_review_video_mux_backend_cutover`
4. Verify `pnpm verify:video-infrastructure -- --json --phase=pre-webhook` before webhook setup.
5. Deploy Preview with Preview Mux credentials except webhook secret if the webhook resource does not exist yet.
6. Create a Mux webhook endpoint in `Renuvex - Products Review (Preview)` pointing at the deployed Preview `/api/webhooks/mux` URL.
7. Write the resulting `MUX_WEBHOOK_SECRET` to the matching Preview environment only.
8. Redeploy Preview so the webhook route uses the real secret.
9. Verify `pnpm verify:video-infrastructure:post-webhook -- --json`.
10. Run the Preview functional canary.

## Contract Phase
After Preview/Production Mux canaries and the 2026-06-21 read-only closeout showed no active video reviews, pending video rows, active upload sessions, failed/dead video jobs, or non-empty legacy provider columns, the contract migration entered the active deploy path as `20260621003000_review_video_mux_contract_drop_legacy_columns`.

The migration was later verified as applied in production on 2026-06-21. The legacy columns are absent from the live `VideoUploadSession` schema; old Cloudflare provider jobs, if present, are historical succeeded/superseded audit rows and are not a purge target.

The migration drops only the old Cloudflare Stream/R2 upload columns on `VideoUploadSession` and their legacy unique indexes:

```sql
DROP INDEX IF EXISTS "VideoUploadSession_masterObjectKey_key";
DROP INDEX IF EXISTS "VideoUploadSession_ingestObjectKey_key";
DROP INDEX IF EXISTS "VideoUploadSession_streamUid_key";

ALTER TABLE "VideoUploadSession"
  DROP COLUMN IF EXISTS "r2UploadId",
  DROP COLUMN IF EXISTS "masterObjectKey",
  DROP COLUMN IF EXISTS "ingestObjectKey",
  DROP COLUMN IF EXISTS "streamUid";
```

Do not pair this migration with any Cloudflare zone, DNS, or future Worker cleanup. The 2026-06-21 external inventory showed Cloudflare Stream videos/storage and R2 buckets at zero, but Cloudflare DNS/zone and future Worker delivery infrastructure remain separate scope.

## Preview Functional Canary
Use a controlled MP4/MOV between 2 and 60 seconds, no larger than 150 MiB. Record ids and timestamps only; never paste tokens, upload URLs, signed URLs, secrets, or customer media into docs/tickets.

Verify in order:
1. Widget capability opens video mode only for the intended test store.
2. Initiate returns a token and Mux direct-upload URL; response does not expose Mux token secret, signing key, provider upload ID, provider asset ID, or playback IDs.
3. UpChunk uploads to the Mux URL and progress/cancel/retry behavior stays on the same upload session.
4. Complete returns `processing` and enqueues `resolve_video_asset`.
5. Mux upload resolves to an asset via webhook or bounded reconcile.
6. Asset `ready` creates a ready `VideoUploadSession` with `provider='mux'`, `providerAssetId`, `signedPlaybackId`, and no public playback ID yet.
7. Quota moves from reserved to consumed exactly once.
8. Review submission consumes the ready token, creates a pending video review, and keeps `ReviewMedia.visible=false`.
9. Admin preview obtains a short-lived signed video JWT and a separate thumbnail JWT through `/api/admin/reviews/video-playback`.
10. Approval enqueues `publish_video`; the job creates/converges one public playback ID and only then makes the review/media public.
11. Storefront uses tokenless public Mux URLs (`stream.mux.com`, `image.mux.com`) only after approval.
12. Rejection/hide enqueues `protect_video` and removes public playback IDs.
13. Delete/cancel/expiry cleanup is idempotent and deletes/cancels Mux upload/assets without refunding consumed quota for ready-but-unsubmitted sessions. Mux direct upload cancel only covers uploads that are still waiting; cleanup must also retrieve the Mux upload by `providerUploadId` and delete a recovered `asset_id` if the asset was created before `providerAssetId` was persisted. A late `video.upload.asset_created` webhook for an `aborted` or `failed` session should enqueue asset-scoped `cleanup_video`, not normal resolve/reconcile work.

## Upload Performance Evidence
For physical canary uploads, compare these surfaces before making product or provider conclusions:
- `VideoUploadPerformanceSample.directUploadMs`: browser-to-Mux transfer time, including UpChunk retries.
- `VideoUploadPerformanceSample.completeMs`: public complete route latency.
- `VideoUploadPerformanceSample.processingPollMs`: client-visible waiting after complete until session readiness.
- `WebhookEvent.providerEventCreatedAt` and `receivedAt`: provider event timing and delivery delay.
- `VideoUploadSession.createdAt`, `updatedAt`, `status`, and `errorCode`: DB lifecycle convergence.

Acceptance for the first hardening pass: run at least three uploads with the same physical phone, internet, and video. The visible `% -> retry` error should not appear for transient PUT failures that fit inside `VIDEO_UPLOAD_CHUNK_ATTEMPTS`. If direct upload remains the dominant delay after this, continue with Mux dashboard/API/support timing evidence; do not tune processing or webhook code to hide a transfer-path bottleneck.

## Production Gate
Production requires separate proof:
- Production Mux token, signing key, and webhook secret belong to `Renuvex - Products Review`.
- Global flag stays off until test-store quota/toggle isolation is verified.
- Only the intended test store can upload.
- No provider secrets, signed URLs, upload URLs, or provider IDs leak through browser bundle, public APIs, or logs.
- Preview evidence cannot be reused as production credential evidence.

## Rollback
Rollback closes exposure before teardown:
1. Set `VIDEO_REVIEWS_ENABLED=false` and redeploy the affected environment.
2. Set the canary store toggle off and quota to `0`.
3. Keep Mux credentials/webhook/QStash configured until outstanding sessions and jobs are terminal.
4. Verify no reserved quota, stuck session, failed/dead job, orphan pending video row, or public playback ID remains for rejected/deleted media.

Do not revoke provider credentials or delete webhook/resources while cleanup work is pending.

## Exit Criteria
- No `uploading`, `uploaded`, or `processing` session is stuck beyond the expected reconcile window.
- No provider job remains `failed`, stale `processing`, or `dead`.
- Any exceptional manual repair follows [[Review_Video_Manual_Repair_Runbook]] and leaves DB, Mux, quota, public API, and job state converged.
- Reserved quota returns to zero; consumed quota matches completed uploads.
- Public review APIs expose normalized media only, never private playback IDs or provider credentials.
- Mux environment used by canary matches the intended Preview or Production gate.
- No external credential revoke or provider resource deletion happens until inventory is proven and the contract/teardown phase is approved.

## Physical Device Follow-Up
Playwright emulation is not physical-device acceptance. Before production rollout, repeat upload, interruption/resume, cancel/offline, processing, admin preview, Mux Player playback, fullscreen/audio/pause, browser back, modal close, and public storefront playback on real iPhone Safari and real Android Chrome devices.
