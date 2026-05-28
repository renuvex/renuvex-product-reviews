---
type: decision
project: renuvex-product-reviews
status: active
created: 2026-05-12
updated: 2026-05-18
tags:
  - adr
  - storage
  - cloudinary
  - data-lifecycle
  - cron
related:
  - "[[Decision_Index]]"
  - "[[ADR_0006_Trusted_Review_Image_URL_Policy]]"
  - "[[ADR_0008_Cloud_Name_Build_Time_Only]]"
  - "[[Database_Schema]]"
  - "[[Backend_API_Map]]"
---

# ADR_0012 — Pending Upload Registry for Orphan Cleanup

## Status
Accepted

## Date
2026-05-12

## Context
Reviewers can attach photos. The widget signs an upload at `/api/public/upload/sign`, posts the file directly to Cloudinary, then optionally submits the review at `/api/public/reviews`. Many uploads never reach submission — the user abandons the wizard, closes the tab, or removes a photo before submitting. Those Cloudinary assets become orphans.

The previous design ran a weekly cron at `/api/admin/cleanup-images` that listed Cloudinary's `review_images/` folder and diff'd it against `Review.images` in the database. Three real weaknesses:

1. **500-asset cap.** `cloudinary.api.resources({ max_results: 500 })` was called without `next_cursor` pagination, so once the folder exceeded 500 assets the cleanup stopped seeing the rest.
2. **In-flight race.** The diff treats anything not in the DB as an orphan. A user who uploaded an image but hadn't yet submitted the review could have it deleted moments before the submit handler ran, leaving the saved review pointing at a 404.
3. **Reactive cadence.** Weekly cleanup means orphans live up to 7 days in Cloudinary storage. As the widget grows, that storage cost grows linearly.

The whole pattern — scan an external store and diff against our DB — is fundamentally fragile. It treats the upstream service as the source of truth for "what exists," which it never is for our domain.

## Decision
Invert the source of truth. Track uploads in our own database the moment they happen, and let cleanup walk that registry instead of Cloudinary.

### Model
```prisma
model PendingReviewImage {
  publicId  String   @id
  storeId   String?
  createdAt DateTime @default(now())
  ipHash    String?

  @@index([createdAt])
  @@index([storeId, createdAt])
}
```

### Lifecycle
As of D3 (2026-05-18), upload signatures and registered assets are tenant-scoped:
the widget sends `{storeId}` to `/api/public/upload/sign`, uploads to the returned
`folder=review_images/stores/<storeId>`, and registers `{storeId, secureUrl}`.
`/api/public/reviews` deletes pending rows by both `publicId` and `storeId`.

1. **Sign.** Widget calls `/api/public/upload/sign` with `{storeId}`. The endpoint verifies `StoreSettings` and signs only `folder=review_images/stores/<storeId>`.
2. **Upload.** Widget posts the file directly to Cloudinary using the signed tenant folder returned by the sign endpoint.
3. **Register.** On successful upload, widget posts `{storeId, secureUrl}` to `/api/public/upload/register`. The endpoint validates the URL against the tenant-scoped trusted Cloudinary policy ([[ADR_0006_Trusted_Review_Image_URL_Policy]]), derives the `publicId`, and upserts a `PendingReviewImage` row with `storeId`. Idempotent on retry — `createdAt` is not reset on conflict.
4. **Commit on submit.** `/api/public/reviews` POST runs the review insert and `PendingReviewImage.deleteMany({ publicId: { in: ... }, storeId })` inside a single `prisma.$transaction`. Either both succeed or neither does.
5. **Expire abandoned rows.** `/api/admin/daily-maintenance` runs the pending-upload cleanup helper daily. The explicit `/api/admin/cleanup-pending-uploads` endpoint runs the same helper on demand. It selects rows where `createdAt < now - 24h`, deletes the matching Cloudinary assets in batches of 100, then deletes the rows.
6. **Monthly fallback scan.** `/api/admin/cleanup-images` keeps running monthly. Now uses cursor pagination, only considers assets older than 30 days, and exists solely to catch uploads that bypassed the registry (failed register, legacy data, ops uploads).

### Why a 24-hour TTL eliminates the race
Cleanup deletes only rows whose `createdAt` is older than 24 hours. A user's submission flow completes in seconds — there is no realistic case where a registered upload is still uncommitted 24 hours later and also about to be submitted. The race window is gone, regardless of how often the cron runs.

### Fire-and-forget registration is acceptable
The widget posts to `/api/public/upload/register` after the Cloudinary upload resolves. If that call fails (network blip, server transient error), the upload still works and the submit still works — only the registry entry is missing. The monthly fallback scan catches those orphans within 30 days. Hard-failing the upload on a register error would degrade the user experience for a downstream housekeeping concern.

### Vercel Hobby plan compatibility
Two cron slots, both daily-or-slower: daily maintenance (`0 3 * * *`, pending cleanup plus storefront script reconcile) and monthly fallback (`0 4 1 * *`). No Pro upgrade required for the architecture.

## Alternatives Considered
- **Cloudinary webhook (`notification_url`) instead of client register (rejected for now).** A Cloudinary webhook would make registration impossible to bypass and remove the trust-but-verify aspect. Costs: requires a public webhook URL, webhook delivery delay (1–5 s) which slightly widens the race window vs. immediate client register, retry/dead-letter handling for webhook failures, signature verification. The fire-and-forget client register + monthly fallback already gives the same effective coverage with materially less complexity. We can revisit this if abuse becomes a real signal.
- **Adding pagination to the existing cleanup-images and keeping the diff pattern (rejected).** Solves the 500-asset cap but leaves the in-flight race and the reactive 7-day window. Patches a leak; doesn't redesign the bucket.
- **Tagging uploads with `pending` in Cloudinary context metadata and querying Cloudinary for those tags (rejected).** Keeps the source of truth in Cloudinary, costs admin API calls for every commit, and runs into Cloudinary Search API limits. Same brittleness we're trying to leave behind.
- **Letting Cloudinary auto-expire via upload preset TTL (rejected).** Cloudinary's auto-delete is `Plus`-plan-only and cannot conditionally exclude committed assets — every committed photo would also expire.

## Consequences

**Positive**
- No more 500-asset blindness; cleanup walks our own DB, paginated naturally.
- 24-hour TTL eliminates the in-flight race by construction.
- Daily cadence shortens orphan storage life from up to 7 days to up to 48 hours.
- Pattern generalizes: any future feature (Q&A photos, profile uploads) drops in by reusing the registry and the same lifecycle.
- Bundle growth: ~80 bytes (one fetch call in [step-photos.js](src/widget/reviews-section/review-form-modal/steps/step-photos.js)).
- Free-tier compatible across Vercel Hobby, Supabase free, and Cloudinary free.

**Negative / accepted trade-offs**
- One extra HTTP request per uploaded image (widget → `/api/public/upload/register`). Fire-and-forget, ~kilobytes of payload, no UX impact.
- Adds a DB write per upload. The new index is tiny and `PendingReviewImage` rows are short-lived; storage steady-state is negligible.
- If the register call silently fails for a successful upload, that asset is unknown to the registry until the monthly fallback scan picks it up. Acceptable: the monthly job is exactly the safety net for this case.

## Source files
- [schema.prisma](prisma/schema.prisma)
- [20260512100000_add_pending_review_image/migration.sql](prisma/migrations/20260512100000_add_pending_review_image/migration.sql)
- [api/public/upload/register/route.ts](src/app/api/public/upload/register/route.ts)
- [api/public/upload/sign/route.ts](src/app/api/public/upload/sign/route.ts)
- [api/public/reviews/route.ts](src/app/api/public/reviews/route.ts)
- [api/admin/cleanup-pending-uploads/route.ts](src/app/api/admin/cleanup-pending-uploads/route.ts)
- [api/admin/daily-maintenance/route.ts](src/app/api/admin/daily-maintenance/route.ts)
- [cleanup-pending-uploads.ts](src/lib/cleanup-pending-uploads.ts)
- [api/admin/cleanup-images/route.ts](src/app/api/admin/cleanup-images/route.ts)
- [step-photos.js](src/widget/reviews-section/review-form-modal/steps/step-photos.js)
- [vercel.json](vercel.json)

## Obsidian Links
- [[Database_Schema]]
- [[Backend_API_Map]]
- [[ADR_0006_Trusted_Review_Image_URL_Policy]]
- [[ADR_0008_Cloud_Name_Build_Time_Only]]
- [[Current_Status]]

## Notes — Deployment checklist
Change log:
- 2026-05-18: D3 added tenant scope to pending uploads. New Cloudinary uploads are signed and trusted only under `review_images/stores/<storeId>`, `/api/public/upload/register` records `storeId`, and review submit removes pending rows by `publicId + storeId`.

1. Run `pnpm prisma migrate deploy` (or `migrate dev` locally) to apply `20260512100000_add_pending_review_image` and `20260518143000_scope_pending_uploads_by_store`.
2. Confirm `CRON_SECRET`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`, and `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` / `CLOUDINARY_CLOUD_NAME` are present in the Vercel environment.
3. Verify the daily cron path `/api/admin/daily-maintenance` appears under Vercel → Settings → Cron Jobs after deploy.
4. First production run of the daily cleanup should report `deleted: 0` (no expired pending rows yet); the first non-zero run lands ~24 hours after the first abandoned upload.
