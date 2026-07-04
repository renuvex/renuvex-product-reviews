---
type: decision
project: renuvex-product-reviews
status: active
created: 2026-07-02
updated: 2026-07-04
last_verified: 2026-07-04
confidence: high
tags:
  - adr
  - media
  - images
  - aws
  - cleanup
related:
  - "[[Decision_Index]]"
  - "[[ADR_0012_Pending_Upload_Registry]]"
  - "[[ADR_0027_Review_Media_Read_Model]]"
  - "[[ADR_0029_Review_Media_Metadata]]"
  - "[[ADR_0030_Cleanup_Hardening]]"
  - "[[AWS_Setup_And_Access]]"
source_files:
  - "AGENTS.md"
  - ".env.example"
  - "package.json"
  - "next.config.js"
  - "prisma/schema.prisma"
  - "src/lib/cleanup-pending-uploads.ts"
  - "src/lib/cleanup-orphan-images.ts"
  - "src/lib/media/jobs.ts"
  - "src/lib/media/providers/aws-review-image.ts"
  - "src/app/api/public/upload/sign/route.ts"
  - "src/app/api/public/upload/register/route.ts"
  - "src/app/api/public/reviews/route.ts"
  - "src/app/api/admin/reviews/route.ts"
  - "src/app/api/admin/reviews/image-preview/route.ts"
  - "src/widget/core/helpers.js"
  - "infra/aws/review-images.cloudformation.json"
  - "infra/aws/review-images-runtime-iam.cloudformation.json"
  - "scripts/validate-review-images-aws-template.mjs"
  - "scripts/validate-review-images-runtime-iam-template.mjs"
  - "tests/unit/aws-review-image-provider.test.ts"
  - "tests/unit/public-api-routes.test.ts"
  - "tests/unit/widget-review-image-trust.test.ts"
  - "tests/widget-interaction-smoke.spec.ts"
  - "tests/widget-runtime-smoke.spec.ts"
---

# ADR_0034 - AWS Review Image Migration

## Status

Accepted and implemented for the current test/pre-public environment.

This ADR was intentionally pruned on 2026-07-04 after the AWS-only cutover. The old long version was useful while the migration was being designed; the durable record now keeps the final contracts and operational guardrails. Historical rollout details remain in git history and related wiki pages.

This ADR does not approve future infrastructure changes, deploys, env writes, DB writes, provider deletes, or Cloudflare Worker deploys. Those still require a separate scope, risk, rollback note, and explicit approval.

## Decision

Review images use an AWS-only path:

- Browser uploads go to a private S3 bucket through short-lived, server-issued upload contracts.
- The backend validates uploaded objects, generates finite image variants with `sharp`, and stores variant metadata in the database.
- Approved public variants are copied to public CloudFront keys and served through `https://media.renuvex.app`.
- Pending, rejected, and admin-preview images remain private and are viewed only through authenticated short-lived signed preview URLs.
- New production image paths do not depend on Cloudinary. Existing pre-public Cloudinary test data is not migrated.

Final public URL contract:

```text
https://media.renuvex.app/reviews/{assetId}/{variant}.{format}
```

Example:

```text
https://media.renuvex.app/reviews/afa4073e-4486-4275-8ade-bccb6583ca91/thumb_640x854.webp
```

`assetId` is the existing UUID generated for the uploaded image. Supported public formats are `webp` and `jpeg`. Supported variants are:

- `w200`
- `w300`
- `w400`
- `w600`
- `w1200`
- `thumb_320x427`
- `thumb_640x854`

## Context

Cloudinary was appropriate for early development, but it made the app dependent on a third-party image pipeline before public launch. The migration goal was lower long-term cost, explicit storage ownership, and stable CDN behavior for a global SaaS review product.

The project was still pre-public, so existing Cloudinary test media did not need to be copied to AWS. The correct migration was a clean AWS-only path for new review images plus a controlled retirement of legacy test rows/assets.

The system also had to preserve the parts that were already correct:

- maximum 3 review images
- checksum and type validation
- local blob preview during upload
- pending upload cleanup
- two-phase orphan quarantine
- admin moderation before public exposure
- public API field whitelisting
- storefront fail-closed image trust
- DB-driven public reads with no provider call on the hot path

## AWS Resource Contract

The review image stack is `renuvex-review-images-prod` in `eu-central-1`.

The storage and delivery model is:

- S3 bucket `renuvex-review-images-prod-989086371563-eu-central-1`.
- S3 Block Public Access enabled.
- Bucket owner enforced object ownership.
- SSE-S3 encryption.
- Versioning enabled.
- HTTPS-only bucket policy.
- CloudFront distribution with S3 Origin Access Control.
- Custom public delivery domain `media.renuvex.app`.
- ACM certificate in `us-east-1` for the CloudFront alias.
- CloudFront public behavior for `reviews/*`.
- CloudFront signed private preview behavior for private variant paths.

The transitional legacy public behavior for `review-images/v1/public/*` exists only to support pre-public old-path cleanup/overlap. It should be removed through a separate approved CloudFormation cleanup after new-path live acceptance.

## Object Key Contract

Private/internal keys stay store-scoped:

```text
review-images/v1/private/stores/{storeId}/assets/{assetId}/original.{ext}
review-images/v1/private/stores/{storeId}/assets/{assetId}/variants/{variant}.{format}
```

Public keys are intentionally shorter and do not expose `storeId`:

```text
reviews/{assetId}/{variant}.{format}
```

The database remains the tenant boundary. Store isolation is enforced during upload intent creation, register validation, submit, moderation, and public read formatting. The public URL is not used as the tenant authority.

`providerAssetId` is the generated `assetId`. `publicId` remains an internal family id:

```text
aws_s3:{storeId}:{assetId}
```

`sourceAssetId` stores the private original S3 key.

## Upload, Register, And Submit Contract

`POST /api/public/upload/sign` creates an upload intent before returning browser upload instructions. It validates store context, file name, content type, byte size, and SHA-256 checksum. The response is AWS-shaped and must not expose AWS credentials, public URLs, private keys, or original filename persistence.

The widget:

- keeps local `blob:` previews while uploads are pending
- computes SHA-256 with Web Crypto
- uploads directly to S3 using the server-issued POST fields
- treats S3 `204` as direct-upload success
- calls `/api/public/upload/register` with the returned image ref
- ignores successful in-flight uploads that were removed locally

`POST /api/public/upload/register` is server authoritative. It verifies upload intent, store scope, object key prefix, object existence, byte size, content type, checksum, metadata, and tags with S3 APIs. It decodes the image with direct `sharp`, strips metadata, normalizes orientation/sRGB, generates required private variants, and marks the pending row ready only after the required private variants are verified.

`POST /api/public/reviews` accepts only same-store AWS image refs that are unexpired, registered, deduplicated, and `private_ready`. It rejects cross-store refs, duplicate refs, unready refs, expired refs, more than 3 images, and photo+video combinations.

## Variant And Public Media Contract

Variants are finite and pre-generated. There is no query-string transform service, CloudFront Function, Lambda image optimizer, or dynamic width/quality model.

Public descriptors are provider-neutral:

```json
{
  "type": "image",
  "url": "https://media.renuvex.app/reviews/11111111-1111-4111-8111-111111111111/w1200.jpeg",
  "thumbnailUrl": "https://media.renuvex.app/reviews/11111111-1111-4111-8111-111111111111/thumb_320x427.webp",
  "width": 1200,
  "height": 1600,
  "variants": [
    {
      "id": "w1200",
      "format": "webp",
      "width": 1200,
      "height": 1600,
      "url": "https://media.renuvex.app/reviews/11111111-1111-4111-8111-111111111111/w1200.webp"
    }
  ]
}
```

The public API and widget should use `variants`/`srcset` first, then `thumbnailUrl`/`url` fallbacks. Public responses must not include S3 bucket hostnames, signed URLs, private keys, object metadata, provider credentials, `providerAssetId`, original filenames, or private object keys.

Public variant objects use:

```text
Cache-Control: public, max-age=31536000, immutable
```

## Public And Admin Visibility

The public storefront path is fail-closed:

- Only approved reviews can expose image media.
- Image media must be `visible = true`.
- `processingStatus` must be `ready`.
- `variantStatus` must be `public_ready`.
- Public image URLs must match `https://media.renuvex.app/reviews/{uuid}/{allowedVariant}.{webp|jpeg}`.
- Query strings, hashes, credentials, ports, encoded slashes/backslashes, private prefixes, S3 hostnames, old public paths, and unknown variants are rejected.

Pending/rejected/private images are not public. Admin preview uses:

```text
GET /api/admin/reviews/image-preview?mediaId={id}&variant={variant}
```

That route is authenticated with the existing admin/session pattern, checks merchant scope, returns a short-lived CloudFront signed URL for a private variant, and uses `Cache-Control: private, no-store`. Signed preview URLs are never stored in DB, public APIs, audit rows, wiki, or durable logs.

## Database Contract

The migration uses additive schema fields only. The relevant models are `PendingReviewImage` and `ReviewMedia`.

Important AWS image fields:

- `provider = "aws_s3"`
- `providerAssetId`
- `sourceAssetId`
- `sourceChecksumAlgorithm`
- `sourceChecksumSha256`
- `variantStatus`
- `variantGeneratedAt`
- `variantPublishedAt` / `variantRevokedAt` where applicable
- `variantErrorCode`
- `variantManifest`
- `uploadExpiresAt`
- `uploadRegisteredAt`

Indexes support provider/store/asset lookups and variant lifecycle scans:

- `[provider, providerAssetId]`
- `[provider, storeId, providerAssetId]`
- provider/resource/variant-status created-at scan indexes

`Review.images` is compatibility-only. AWS rendering should use `ReviewMedia` and `variantManifest` truth.

## Cleanup And Orphan Contract

The cleanup unit is an image family:

```text
storeId + assetId
```

A family cleanup covers:

- private original
- private variants
- public variants under `reviews/{assetId}/`
- transitional legacy public variants under `review-images/v1/public/stores/{storeId}/assets/{assetId}/`

Cleanup jobs must be idempotent. Missing AWS objects count as success. DB rows are deleted or retired only after provider cleanup succeeds or confirms absence.

The orphan model keeps the existing safety design:

- 24-hour pending TTL.
- Monthly two-phase orphan mark/sweep.
- `OrphanImageQuarantine`.
- `MediaCleanupRun`.
- G1 empty-used-set breaker.
- G2 orphan-ratio breaker.
- G3 absolute-delete cap.

The orphan scanned set is based on store-scoped private family evidence plus transitional legacy public evidence. The new public prefix `reviews/{assetId}/` intentionally omits `storeId`, so broad public-prefix delete loops are not allowed. Public variant deletion must come from DB/manifest/family truth.

S3 lifecycle is a backstop only. It must not replace DB evidence or expire committed public variants unless a separate retention policy is approved.

## Runtime Auth, Env, And IAM

Vercel runtime uses AWS OIDC, not static AWS access keys.

Required app env names:

- `REVIEW_IMAGE_PROVIDER=aws_s3`
- `AWS_REVIEW_IMAGES_REGION`
- `AWS_REVIEW_IMAGES_BUCKET`
- `AWS_REVIEW_IMAGES_PUBLIC_BASE_URL`
- `AWS_REVIEW_IMAGES_ROLE_ARN`
- `AWS_REVIEW_IMAGES_OIDC_AUDIENCE`
- `AWS_REVIEW_IMAGES_CLOUDFRONT_DISTRIBUTION_ID`
- `AWS_REVIEW_IMAGES_CLOUDFRONT_KEY_PAIR_ID`
- `AWS_REVIEW_IMAGES_CLOUDFRONT_PRIVATE_KEY_B64`

Runtime IAM is scoped to the review-image bucket prefixes and exact CloudFront distribution needs. It must not include broad account admin, `iam:PassRole`, or CloudFormation lifecycle permissions.

Cloudflare Worker remains widget asset/read-cache infrastructure. It must not receive AWS destructive credentials and does not own upload/register/review writes or cleanup.

## Rollback And Legacy State

Cloudinary is no longer a production review-image runtime dependency. Recovery after Cloudinary teardown is AWS forward-fix, source revert, Vercel rollback to an AWS-safe deployment, or Worker rollback where relevant.

The migration deliberately did not copy old pre-public Cloudinary image data to AWS. Old provider test rows/assets were cleaned from app runtime scope. Cloudinary account or provider asset deletion is outside this ADR and requires a separate provider-delete approval if ever needed.

The only intentional legacy overlap left in AWS is the old public S3/CloudFront path:

```text
review-images/v1/public/*
```

That path is transitional. Removing it requires a separate approved CloudFormation/IAM cleanup after live acceptance of the simplified `reviews/*` path.

## Acceptance And Maintenance Gates

Required local gates for meaningful changes in this area:

```text
pnpm test:unit
pnpm test:widget-runtime
pnpm test:widget-smoke
pnpm test:widget-interactions
pnpm test:widget-media
pnpm test:admin-preview
pnpm build:widget
pnpm budget:widget
pnpm check:widget-js
pnpm exec tsc --noEmit
pnpm lint
node scripts/wiki-audit.mjs --changed-source-check
```

Required infra validation before any AWS change set:

```text
pnpm aws:review-images:validate-template
pnpm aws:review-images:validate-runtime-iam-template
aws cloudformation validate-template --template-body file://infra/aws/review-images.cloudformation.json --region eu-central-1 --profile renuvex-review-images
aws cloudformation validate-template --template-body file://infra/aws/review-images-runtime-iam.cloudformation.json --region eu-central-1 --profile renuvex-review-images
```

Live acceptance for public image changes:

- upload a new review image
- register validates S3 evidence and generates private variants
- submit succeeds with AWS image refs
- admin preview works through signed private preview
- approve publishes public variants before public visibility
- public API returns only `https://media.renuvex.app/reviews/...`
- image response has immutable cache metadata
- storefront thumbnail and lightbox render
- no S3 bucket hostname, signed URL, private key, original filename, storeId, or legacy public prefix appears in public responses

## Consequences

Positive:

- Review images are AWS-owned, cheaper to operate at MVP scale, and independent from Cloudinary runtime APIs.
- Storefront delivery is static CDN delivery with finite immutable variants.
- Public hot path stays DB-only and does not call S3 or CloudFront signing.
- Admin private preview remains short-lived and authenticated.
- Cleanup remains evidence-based and breaker-guarded.

Tradeoffs:

- The app owns image validation, variant generation, cleanup, and CDN path discipline.
- AWS infra changes require CloudFormation review and explicit approval.
- Dynamic transforms are intentionally not supported; adding new sizes requires adding finite variants and regenerating/publishing them.
- The provider boundary should stay thin. If AWS remains the only provider after public launch, it can be simplified later only if upload, register, cleanup, public API, admin preview, widget rendering, scripts, and tests remain isolated from provider assumptions.

## Evidence

This decision follows these stable provider constraints:

- S3 object keys are application-defined and support logical path prefixes.
- S3 buckets should stay private with Block Public Access and CloudFront OAC.
- CloudFront cache efficiency is better with finite path-based immutable variants than query-string transforms for this architecture.
- CloudFront signed URLs are appropriate for short-lived private admin previews.
- Public responsive images should use finite variants and `srcset`, not private originals.

Current implementation evidence is in the `source_files` list above.
