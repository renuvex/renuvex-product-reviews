---
type: decision
project: renuvex-product-reviews
status: active
created: 2026-06-08
updated: 2026-06-09
last_verified: 2026-06-09
confidence: high
tags:
  - adr
  - database
  - media
  - cloudinary
related:
  - "[[Decision_Index]]"
  - "[[ADR_0006_Trusted_Review_Image_URL_Policy]]"
  - "[[ADR_0012_Pending_Upload_Registry]]"
  - "[[ADR_0027_Review_Media_Read_Model]]"
  - "[[Database_Schema]]"
  - "[[Backend_API_Map]]"
source_files:
  - "prisma/schema.prisma"
  - "prisma/migrations/20260608203000_add_review_media_metadata/migration.sql"
  - "src/lib/review-media-metadata.ts"
  - "src/lib/review-media.ts"
  - "src/lib/review-images.ts"
  - "src/app/api/public/upload/register/route.ts"
  - "src/app/api/public/reviews/route.ts"
  - "src/widget/reviews-section/review-form-modal/steps/step-photos.js"
  - "scripts/backfill-review-media-metadata.mjs"
  - "src/lib/review-media-metadata-backfill.ts"
  - "src/app/api/admin/daily-maintenance/route.ts"
  - "tests/unit/review-media-metadata-backfill.test.ts"
---

# ADR_0029 - Review Media Metadata

## Status
Accepted

## Context
[[ADR_0027_Review_Media_Read_Model]] normalized review image ownership into `ReviewMedia`, but the row still only carried URL/publicId/position/visibility. That was enough for indexed `hasImages=true` reads, but not enough for media-heavy storefront design work: future photo strip/gallery/lightbox variants need durable dimensions, format, bytes, and version metadata without calling Cloudinary on every public read.

Cloudinary upload responses include signed asset metadata. Public read paths should not call Cloudinary Admin API, and browser-provided metadata must not be trusted unless the upload response signature is verified server-side.

## Decision
- Extend `ReviewMedia` with additive metadata columns: `assetId`, `version`, `resourceType`, `format`, `mimeType`, `width`, `height`, `bytes`, `metadataSource`, `metadataStatus`, and `metadataFetchedAt`.
- Extend `PendingReviewImage` with the same metadata fields so upload metadata can survive the upload -> pending -> review-submit lifecycle.
- The widget still submits only `images: string[]` to `/api/public/reviews`. It additionally sends Cloudinary upload response metadata to `/api/public/upload/register`.
- `/api/public/upload/register` remains backwards compatible with `{storeId, secureUrl}`. If `metadata` is present, the server verifies the Cloudinary upload response signature before persisting dimensions/format/bytes. The verifier accepts Cloudinary's documented SHA-1 default and SHA-256 response-signature variants.
- `/api/public/reviews` POST copies trusted pending metadata into `ReviewMedia` inside the same transaction that creates `Review`, writes the legacy `Review.images` mirror, deletes pending rows, and updates the summary read model.
- Public `GET /api/public/reviews` keeps `images: string[]` and adds additive `media[]` objects containing URL, thumbnail URL, position, and nullable metadata. Existing widget consumers can ignore the new field.
- `scripts/backfill-review-media-metadata.mjs` repairs existing `ReviewMedia` rows from Cloudinary Admin API. It is dry-run by default and requires `--apply` for writes (on-demand/local ops).
- Existing/legacy rows are also healed **durably and automatically in production**: the daily-maintenance cron calls `runReviewMediaMetadataBackfill` (`src/lib/review-media-metadata-backfill.ts`), which backfills a bounded batch (default 200/run) of non-`complete` rows via the Cloudinary Admin API using the production credentials (same config as `cleanup-images`). This removes the dependency on a manual local script + valid local key. The core loop is dependency-injected and unit-tested; transport/auth errors (e.g. a stale api_key returning 401) are counted but never corrupt a row, and the cron treats `complete`/`missing_asset` as terminal so absent assets are not re-fetched indefinitely.

## Reasoning
- Metadata belongs in the application read model, not in public widget runtime calls to Cloudinary. This keeps storefront latency and Cloudinary Admin API rate exposure out of hot reads.
- Capturing metadata at upload time avoids a second network call for new media.
- `PendingReviewImage` is the correct bridge because uploads can succeed minutes before the review is submitted.
- Signature verification prevents malicious clients from forging width/height/bytes while still keeping the upload flow resilient: invalid or missing metadata leaves the media row in a repairable `pending`/`invalid_signature` state.
- Additive public `media[]` lets future UI consume dimensions without breaking the existing `images` contract.

## Alternatives Considered
- Trust browser-submitted dimensions directly: rejected because clients can forge metadata.
- Call Cloudinary Admin API during public `GET /api/public/reviews`: rejected because it puts external API latency and rate limits in the storefront hot path.
- Store only transformed thumbnail URLs: rejected as the source of truth. Variants can be derived from `publicId`/URL/version and transformation policy.
- Add AI moderation/video support in the same phase: rejected as a broader async media-pipeline feature, not required for image metadata ownership.

## Consequences
- New image writes should produce `ReviewMedia.metadataStatus='complete'` when the signed upload response contains complete image metadata.
- Existing rows are repaired automatically by the daily-maintenance cron (durable, self-healing, production Cloudinary creds); the manual `pnpm reviews:media:metadata:backfill --cloudName=<cloudinaryCloudName> --apply` remains for on-demand/local ops. Both paths share the same allowlists + integer bounds + `admin_api` provenance.
- The cron backfill's first production run is also the definitive proof of production Cloudinary api_key health: success advances rows to `complete`; a stale key surfaces as a counted error in the `daily-maintenance` `errors[]` response with zero row corruption.
- `Review.images` remains a legacy mirror; do not remove it until a later expand/contract cleanup proves no runtime or ops fallback still depends on it.
- Cleanup hardening, AI moderation, video support, and design consumption of metadata remain separate phases.

## Scale Evolution — Authoritative Metadata Source
Honest trade-off in the current write path: the Cloudinary upload-response **signature covers
`public_id`+`version`, not `width/height/bytes`**. A client could therefore replay a real asset's
signature with forged dimensions. Impact is **low and self-inflicted** — only that review's own
image box renders slightly wrong on the merchant's own storefront; values are clamped positive
INT32 and used as numeric attributes (no injection, no cross-tenant/security effect), and
`metadataSource` provenance records that the row is client-sourced. Acceptable at current scale.

At large scale (thousands of stores, 1M+ review images) the industry-standard target is
**authoritative metadata server-to-server**, with the client value treated as a discardable hint.
The three sources **compose** (not mutually exclusive):

| Source | Latency | Cost at scale | Trust | Role |
|---|---|---|---|---|
| (A) client upload-response | instant | ~zero | low (forgeable) | provisional hint |
| (B) Admin-API pull / cron | delayed (cron cadence) | **high** — 1 outbound call/image + Admin-API rate limits | high | reconciliation / legacy / safety-net |
| (C) webhook push (`notification_url`) | near-instant | **~zero** — inbound, no polling | high (signed, S2S) | **primary authoritative at scale** |

- Cost (cheap→expensive at scale): **C ≈ A < B.**
- Performance (fast + trusted): **C > A (untrusted) > B.**
- Hot path: all three are read-model writes → zero storefront-read latency.

**Mature target: (C) webhook = primary authoritative + (B) cron = pull safety-net for missed
webhooks/legacy + (A) optional instant hint.** Today we run A + B (B is both authoritative and
safety-net — sufficient now, but slow/API-heavy as the sole path at 1M+). Adding (C) and demoting
(B) to safety-net is the correct scale evolution. Cheap interim step (no webhook): extend
`reviewMediaMetadataBackfillWhere` to re-verify `metadataSource='upload_response'` rows once via the
Admin API (today it skips `complete` rows, so a forged-`complete` row is not auto-corrected).

Revisit when approaching scale; **not a launch blocker** (cosmetic, self-inflicted). See
[[Open_Questions]] and [[Roadmap]].

## Related Source Files
- [prisma/schema.prisma](prisma/schema.prisma)
- [prisma/migrations/20260608203000_add_review_media_metadata/migration.sql](prisma/migrations/20260608203000_add_review_media_metadata/migration.sql)
- [src/lib/review-media-metadata.ts](src/lib/review-media-metadata.ts)
- [src/lib/review-media.ts](src/lib/review-media.ts)
- [src/lib/review-images.ts](src/lib/review-images.ts)
- [src/app/api/public/upload/register/route.ts](src/app/api/public/upload/register/route.ts)
- [src/app/api/public/reviews/route.ts](src/app/api/public/reviews/route.ts)
- [src/widget/reviews-section/review-form-modal/steps/step-photos.js](src/widget/reviews-section/review-form-modal/steps/step-photos.js)
- [scripts/backfill-review-media-metadata.mjs](scripts/backfill-review-media-metadata.mjs)
- [src/lib/review-media-metadata-backfill.ts](src/lib/review-media-metadata-backfill.ts)
- [src/app/api/admin/daily-maintenance/route.ts](src/app/api/admin/daily-maintenance/route.ts)
