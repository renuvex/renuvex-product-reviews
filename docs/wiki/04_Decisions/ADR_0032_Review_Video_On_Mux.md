---
type: decision
project: renuvex-product-reviews
status: active
created: 2026-06-17
updated: 2026-07-30
last_verified: 2026-07-30
confidence: high
supersedes: "[[ADR_0031_Review_Media_V2_Provider_Agnostic_Video]]"
tags:
  - adr
  - media
  - video
  - mux
  - migration
  - provider-agnostic
related:
  - "[[Decision_Index]]"
  - "[[ADR_0031_Review_Media_V2_Provider_Agnostic_Video]]"
  - "[[ADR_0012_Pending_Upload_Registry]]"
  - "[[ADR_0027_Review_Media_Read_Model]]"
  - "[[ADR_0029_Review_Media_Metadata]]"
  - "[[Review_Video_Canary_Runbook]]"
  - "[[Hot_Context]]"
source_files:
  - "prisma/models/reviews.prisma"
  - "prisma/models/media.prisma"
  - "prisma/migrations/20260617090000_review_video_mux_additive/migration.sql"
  - "prisma/migrations/20260617100000_review_video_mux_backend_cutover/migration.sql"
  - "prisma/migrations/20260620190000_add_video_upload_performance_sample/migration.sql"
  - "prisma/migrations/20260621003000_review_video_mux_contract_drop_legacy_columns/migration.sql"
  - "src/lib/media/config.ts"
  - "src/lib/media/sessions.ts"
  - "src/lib/media/jobs.ts"
  - "src/lib/media/reconciliation.ts"
  - "src/lib/media/lifecycle.ts"
  - "src/lib/media/moderation.ts"
  - "src/lib/media/video-processing.ts"
  - "src/lib/media/access.ts"
  - "src/lib/media/providers/mux.ts"
  - "src/app/api/public/upload/video/initiate/route.ts"
  - "src/app/api/public/upload/video/complete/route.ts"
  - "src/app/api/public/upload/video/status/route.ts"
  - "src/app/api/public/upload/video/metrics/route.ts"
  - "src/app/api/webhooks/mux/route.ts"
  - "src/app/api/admin/reviews/video-thumbnail/route.ts"
  - "src/app/api/admin/reviews/video-playback/route.ts"
  - "src/lib/media/admin-video-access.ts"
  - "src/lib/media/admin-review-media.ts"
  - "src/widget/reviews-section/review-form-modal/media/video-upload.js"
  - "src/widget/core/review-media.js"
  - "tests/unit/media-jobs.test.ts"
  - "tests/unit/media-route-contracts.test.ts"
---

# ADR_0032 - Review Video on Mux

## Status
Accepted. This supersedes [[ADR_0031_Review_Media_V2_Provider_Agnostic_Video]] for the video provider only. The provider-agnostic media model, quota reservation, moderation gate, transactional outbox, lease fencing, reconciliation, and cleanup lifecycle are retained.

This ADR describes the target architecture and the code/migration state. Deploy, migration apply, env writes, Mux writes, external provider teardown, and credential revoke remain stop/go-gated operations.

## Current Evidence
- The latest read-only DB inventory before implementation showed zero video reviews, review-media videos, pending video rows, upload sessions, and video usage. The older "6 reviews / 39 sessions" purge manifest is historical only and must not be executed against current data.
- Main/production now contains the Mux dependency, additive provider columns, `WebhookEvent`, Mux provider adapter, Mux upload/status/webhook/admin playback routes, widget UpChunk upload, and tests.
- The 2026-06-21 read-only closeout showed zero active video review/media/pending rows, zero active upload sessions, zero failed/dead video jobs, and zero rows with legacy `r2UploadId`, `ingestObjectKey`, `masterObjectKey`, or `streamUid` values.
- The legacy provider-column contract migration `20260621003000_review_video_mux_contract_drop_legacy_columns` was applied in production and verified on 2026-06-21: the old Cloudflare Stream/R2 upload columns are absent from `VideoUploadSession`.
- External closeout evidence on 2026-06-21 showed Mux production assets at 0 after canary deletion cleanup, Cloudflare Stream/R2 videos/buckets/storage at 0, no active video provider jobs, and no Cloudflare video env keys in Vercel.
- Mux environments stay separated:
  - `Renuvex - Products Review (Preview)` is for local/Preview validation, test upload, Preview webhook, and canary.
  - `Renuvex - Products Review` is for the production gate only.
- Mux webhook resources are created after a deployed `/api/webhooks/mux` endpoint exists. No webhook secret should be created or written before that endpoint is live in the matching environment.

## Decision
1. **Mux is the video provider.** Shopper upload uses Mux direct uploads. The previous app-signed multipart/upload-parts route and previous video-provider adapter files are removed from the active codebase.
2. **Browser gets only the Mux direct-upload URL.** Mux API tokens, signing keys, webhook secret, and provider identifiers are server-side only. No `NEXT_PUBLIC_MUX_*` variables are used.
3. **Provider identity is explicit.** `VideoUploadSession.provider` is written by the app as `mux`; there is no DB default. Mux fields stay nullable: `providerUploadId`, `providerAssetId`, `signedPlaybackId`, and `publicPlaybackId`.
4. **The contract migration is an approved contract step.** The Prisma schema no longer includes previous provider-specific upload/archive columns. The active contract migration drops only the old `VideoUploadSession` Cloudflare Stream/R2 columns and legacy unique indexes after the code has already stopped depending on them.
5. **Playback separation is fixed.** Pending/admin playback uses a signed playback ID plus short-lived JWT generated on demand. Approved/storefront playback uses a public playback ID and tokenless Mux delivery URLs. Public upload status APIs do not expose signed playback IDs or tokenless signed-playback URLs.
6. **Webhook audit is not a retry engine.** `WebhookEvent` stores normalized ids, timestamps, status, and `payloadDigest`; it never stores payloads, tokens, signed URLs, or upload URLs. Actual work/retry remains in `MediaProviderJob`.
7. **Retry policy is per operation.** Mux reads/deletes may retry through the SDK. `uploads.create` and `assets.createPlaybackId` use `maxRetries:0` because Mux has no idempotency key for those creates. Duplicate public playback IDs are reconciled by list/keep/delete convergence.
8. **Quality policy is explicit.** Product config currently permits `basic|plus`. Mux also supports `premium`; excluding it is a deliberate product policy until changed by ADR/test updates.
9. **Upload performance evidence is separate from provider lifecycle.** Browser-to-Mux direct upload timing is measured with sanitized `VideoUploadPerformanceSample` rows. `WebhookEvent`, `MediaProviderJob`, and `VideoUploadSession` remain the lifecycle source of truth; performance samples do not store tokens, upload URLs, signed URLs, playback IDs, raw user-agent, IP, or file names.
10. **Cleanup recovers late Mux asset ids.** Direct upload cancel is not the only cleanup mechanism because Mux cancel only applies while an upload is still waiting. `cleanup_video` retrieves the Mux upload by `providerUploadId` before cancel, recovers `asset_id`, and deletes known or recovered assets even when `VideoUploadSession.providerAssetId` was not persisted yet or direct-upload cancel is no longer valid. A late `video.upload.asset_created` webhook for an `aborted` or `failed` session is routed to an asset-scoped cleanup job instead of normal resolve/reconcile work. Abandoned ready sessions that never reached review submit can release consumed quota when `consumedAt` is still null; review-consumed sessions are never refunded by abandoned-upload cleanup.
11. **Playback uses official Mux Player.** Approved storefront playback exposes an additive public `playbackId` and trusted Mux delivery/poster URLs; provider ids, private/signed playback ids, upload URLs, and tokens stay server-side. The widget lazy-loads `@mux/mux-player`, disables Mux Data tracking/cookies for this phase, and keeps a trusted `.m3u8` parsing fallback only for rollout overlap. Pending/admin preview returns short-lived `playbackToken` and `thumbnailToken` attributes for Mux Player while retaining legacy signed URL fields temporarily for deploy overlap.
12. **Admin list thumbnails have less authority than full playback.** The review-list response does not expose raw Mux provider identifiers or a tokenless poster derived from a signed playback ID. A tenant-scoped admin endpoint resolves the exact ready media/session pair and issues only a short-lived thumbnail JWT; the full playback endpoint remains a separate modal-only capability. Thumbnail failure degrades to a visible fallback without disabling moderation or the authenticated full-preview action.

## Migration Plan
The migration remains expand/contract:

1. Read-only evidence freeze: Git, deployment, DB, Mux Preview, and QStash. Any external legacy provider inventory is teardown evidence only; do not infer it.
2. ADR/wiki alignment.
3. Local 7A/7B preparation review: schema, config, adapter, retry/idempotency, and tests. No migration/env/provider writes.
4. Additive migration gate: provider columns and `WebhookEvent`.
5. Backend/API/widget cutover: Mux direct upload, Mux asset reconciliation, Mux webhook route, admin signed playback, public Mux playback after approval, UpChunk widget upload.
6. Preview deploy with only additive and backend-cutover migrations active.
7. Preview Mux webhook creation and Preview env secret write, followed by Preview redeploy.
8. Preview functional canary: upload -> Mux processing -> webhook/reconcile -> pending admin preview -> approve public playback -> reject/delete cleanup.
9. Production gate: separate production Mux token/signing key/webhook secret, isolated test-store toggle/quota, and global flag only after proof.
10. Contract/teardown: the approved contract migration has been applied and verified. Legacy Vercel video env vars are absent and Cloudflare Stream/R2 video inventory is empty. Cloudflare DNS/zone and future Worker delivery infrastructure remain outside video-provider teardown.

## Stop/Go Rules
Stop and ask before: deploy, migration apply, Vercel env mutation, Mux write, external resource delete/revoke, destructive DB change, or credential teardown. The request must include scope, risk, rollback, and evidence needed after the operation.

## Consequences
- Images remain on Cloudinary.
- Admin UI stays provider-agnostic; backend routes own provider behavior.
- `ReviewMedia` public responses expose normalized media only, never provider credentials or private playback ids.
- Mux Player visual customization, Mux Data analytics, and custom Media Chrome themes remain separate product phases; this ADR only moves playback plumbing to official Mux Player with tracking disabled by default.
- `MediaProviderJob` action names are provider-neutral: `resolve_video_asset`, `reconcile_video`, `publish_video`, `protect_video`, `cleanup_video`, `cleanup_image`, and `expire_upload_session`.
- The active local codebase is Mux-only for review video. Previous provider adapters, upload-parts route, and S3 SDK dependencies are removed from runtime source and package metadata.

## Related Notes
- [[Review_Video_Canary_Runbook]]
- [[ADR_0031_Review_Media_V2_Provider_Agnostic_Video]]
- [[ADR_0012_Pending_Upload_Registry]]
- [[ADR_0027_Review_Media_Read_Model]]
- [[ADR_0029_Review_Media_Metadata]]
