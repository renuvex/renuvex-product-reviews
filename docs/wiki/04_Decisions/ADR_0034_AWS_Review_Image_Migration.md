---
type: decision
project: renuvex-product-reviews
status: draft
created: 2026-07-02
updated: 2026-07-03
last_verified: 2026-07-03
confidence: high
tags:
  - adr
  - media
  - images
  - cloudinary
  - aws
  - migration
  - cleanup
related:
  - "[[Decision_Index]]"
  - "[[ADR_0012_Pending_Upload_Registry]]"
  - "[[ADR_0027_Review_Media_Read_Model]]"
  - "[[ADR_0029_Review_Media_Metadata]]"
  - "[[ADR_0030_Cleanup_Hardening]]"
source_files:
  - "AGENTS.md"
  - ".env.example"
  - "package.json"
  - "next.config.js"
  - ".github/workflows/widget-smoke.yml"
  - ".github/workflows/media-cross-browser.yml"
  - "prisma/schema.prisma"
  - "src/lib/review-images.ts"
  - "src/lib/review-media.ts"
  - "src/lib/review-media-metadata.ts"
  - "src/lib/review-media-metadata-backfill.ts"
  - "src/lib/review-summary.ts"
  - "src/lib/cleanup-pending-uploads.ts"
  - "src/lib/cleanup-orphan-images.ts"
  - "src/lib/media/jobs.ts"
  - "src/lib/media/providers/cloudinary-image.ts"
  - "src/lib/media/providers/aws-review-image.ts"
  - "src/app/api/public/upload/sign/route.ts"
  - "src/app/api/public/upload/register/route.ts"
  - "src/app/api/public/reviews/route.ts"
  - "src/app/api/public/settings/route.ts"
  - "src/app/api/admin/reviews/route.ts"
  - "src/app/api/admin/reviews/image-preview/route.ts"
  - "src/app/api/admin/cleanup-images/route.ts"
  - "src/components/home-page/types.ts"
  - "src/components/home-page/ReviewRow.tsx"
  - "src/components/home-page/index.tsx"
  - "src/widget/core/helpers.js"
  - "src/widget/core/review-media.js"
  - "src/widget/review-layouts/card/index.js"
  - "src/widget/review-layouts/list/index.js"
  - "src/widget/review-layouts/gallery/index.js"
  - "src/widget/reviews-section/render.js"
  - "src/widget/reviews-section/render/size-presets.js"
  - "src/widget/reviews-section/render/media-gallery.js"
  - "src/widget/reviews-section/media-thumbnail.js"
  - "src/widget/reviews-section/review-modal.js"
  - "src/widget/reviews-section/review-form-modal/steps/step-photos.js"
  - "infra/aws/review-images.cloudformation.json"
  - "prisma/migrations/20260703090000_add_aws_review_image_fields/migration.sql"
  - "scripts/validate-review-images-aws-template.mjs"
  - "scripts/build-widget.mjs"
  - "scripts/backfill-review-media.mjs"
  - "scripts/backfill-review-media-metadata.mjs"
  - "scripts/audit-legacy-review-media.mjs"
  - "scripts/reconcile-legacy-review-media.mjs"
  - "scripts/rebuild-product-review-summaries.mjs"
  - "scripts/review-media-reconciliation-lib.mjs"
  - "tests/widget-harness.ts"
  - "tests/widget-interaction-smoke.spec.ts"
  - "tests/widget-runtime-smoke.spec.ts"
  - "tests/widget-network-smoke.spec.ts"
  - "tests/widget-media-cross-browser.spec.ts"
  - "tests/unit/public-api-routes.test.ts"
  - "tests/unit/review-media-metadata.test.ts"
  - "tests/unit/review-media-metadata-backfill.test.ts"
  - "tests/unit/review-media-reconciliation.test.ts"
  - "tests/unit/review-summary.test.ts"
  - "tests/unit/cleanup-pending-uploads.test.ts"
  - "tests/unit/cleanup-orphan-images.test.ts"
  - "tests/unit/media-jobs.test.ts"
  - "tests/unit/widget-media-thumbnail.test.ts"
---

# ADR_0034 - AWS Review Image Migration

## Status
Draft. This page records verified Cloudinary state and the image-provider boundary decision. It does not approve concrete AWS infrastructure, data migration, deploy, env write, DB write, provider mutation, or teardown.

## Implementation Progress

Implementation work started on branch `codex/aws-review-images-migration` on 2026-07-03. PR #2 was squash-merged to `main`, the production app and Cloudflare Worker were deployed through separate approved gates, and Vercel production now sets `REVIEW_IMAGE_PROVIDER=aws_s3`. AWS review-image infrastructure, ACM validation, CloudFront aliasing, the final `media.renuvex.app` DNS record, runtime IAM/OIDC, Vercel AWS runtime env additions, and the additive Prisma production migration were created or applied only through separate approved mutation gates. Cloudinary teardown and provider deletes are still not approved by this ADR alone.

Implemented so far on the migration branch:

- Additive Prisma schema and production migration for AWS image checksum, upload TTL/register evidence, variant lifecycle state, and variant manifests.
- AWS review-image provider module for Vercel OIDC-backed S3 access, presigned POST upload intents, S3 object/head/tag/checksum validation, Sharp private variant generation, public variant publish/revoke, family cleanup, and CloudFront signed admin preview URLs.
- Upload sign/register routes with `REVIEW_IMAGE_PROVIDER=aws_s3` branch while preserving Cloudinary rollback code paths.
- Public review submit/read path that accepts AWS image refs, rejects unready/cross-store/expired refs, publishes variants before public visibility for auto-approved image reviews, and returns provider-neutral public variants.
- Admin list/preview/moderation changes for AWS image state, signed private preview endpoint, approval publish, rejection revoke, and review-delete family cleanup jobs.
- Storefront widget trust/render changes for `media.renuvex.app` public variants, plus AWS S3 POST upload/register flow in the photo wizard.
- Pending and orphan cleanup extensions for AWS image object families, including DB used-set evidence, S3 family scanning, quarantine reuse, and idempotent family delete.
- Review-image CloudFormation source template and local template validation script.
- Live AWS review-image stack, ACM certificate, CloudFront alias, and
  `media.renuvex.app` DNS are created and verified. Production provider
  activation is live after the Vercel production redeploy that includes
  `REVIEW_IMAGE_PROVIDER=aws_s3`.
- Hardening pass for direct-upload CORS, CloudFront S3 read scope, CloudFront invalidation on public variant revocation, and publish-then-DB-failure compensation. The template validator now checks these infrastructure contracts instead of only checking resource presence.

Still not done in this implementation pass: Cloudinary teardown and removal of Cloudinary dependency/build constants. Those remain separate approved gates.

Cutover/live acceptance status on 2026-07-03:

- Vercel production deployment `dpl_5f1tYG7WDvDY5gxpfxuAWwme96Cx` is `Ready`
  and aliased to `app.renuvex.app` after PR #3
  (`fix(media): preserve public image cache metadata`) was squash-merged to
  `main` as `12a70a369e97ac9263b61147ee86eadf51ec2efc`. Production env includes
  `REVIEW_IMAGE_PROVIDER` and the AWS review-image runtime keys. The prior
  rollback deployment for this rollout was `dpl_E96wKnrsukyHPhba8h7uNkc2MtqG`.
- Read-only DB checks found one `aws_s3` image `ReviewMedia` row with
  `variantStatus = "public_ready"`, `processingStatus = "ready"`,
  `visible = true`, and an approved parent review. Public reads for the product
  return one `media.renuvex.app` image with `thumbnailUrl` and 14 variants while
  legacy Cloudinary test media remains visible for older reviews.
- S3 read-only checks found the AWS object family under both private and public
  prefixes: private original plus generated private variants, and public
  variants for CloudFront delivery.
- Acceptance first found a cache-header contract issue: public variant responses
  were still returning `Cache-Control: private, max-age=0, no-store`. Source
  analysis showed public publish used S3 `CopyObject` with
  `MetadataDirective: "COPY"`. AWS CopyObject requires replacing metadata when
  provided metadata should take effect. PR #3 changed public publish to
  `MetadataDirective: "REPLACE"` while explicitly preserving Renuvex
  store/asset/variant metadata and added a unit test for the CopyObject
  contract.
- Post-fix live acceptance created and approved a new AWS image review
  (`Review.id = ea3ca472-0f2b-4aaa-9ddb-29b6ab1db391`,
  `ReviewMedia.id = 2bdc4d8e-ab52-48b9-9368-41928cc691b0`,
  `providerAssetId = 8eb79e51-115f-4438-8c8f-2899f0b7c4e2`) for store
  `02786d4b-a09b-4b36-ad8c-56e6d396f6fd` and product
  `37fb6e3d-6085-4ac1-b0eb-7aaa63ada934`. DB checks show
  `variantStatus = "public_ready"`, `processingStatus = "ready"`, and
  `visible = true`; public reads return `media.renuvex.app` URL,
  `thumbnailUrl`, 14 variants, and no private leak markers. The public variant
  HEAD response is `200 image/jpeg` with
  `Cache-Control: public, max-age=31536000, immutable`.

Runtime cutover preflight on 2026-07-03 showed:

- Vercel OIDC is enabled with team issuer mode for team `renuvex`; production
  claims are `iss=https://oidc.vercel.com/renuvex`,
  `aud=https://vercel.com/renuvex`, and
  `sub=owner:renuvex:project:renuvex-product-reviews:environment:production`.
- Vercel production env contains the eight AWS review-image runtime keys
  (`AWS_REVIEW_IMAGES_REGION`, `AWS_REVIEW_IMAGES_BUCKET`,
  `AWS_REVIEW_IMAGES_PUBLIC_BASE_URL`, `AWS_REVIEW_IMAGES_ROLE_ARN`,
  `AWS_REVIEW_IMAGES_OIDC_AUDIENCE`,
  `AWS_REVIEW_IMAGES_CLOUDFRONT_DISTRIBUTION_ID`,
  `AWS_REVIEW_IMAGES_CLOUDFRONT_KEY_PAIR_ID`, and
  `AWS_REVIEW_IMAGES_CLOUDFRONT_PRIVATE_KEY_B64`). They are scoped to
  production only. Preview does not list them, matching the production-only IAM
  trust policy. `REVIEW_IMAGE_PROVIDER` is still unset in Vercel, so runtime
  remains on the Cloudinary default until the separate cutover gate.
- Production DB applied `20260703090000_add_aws_review_image_fields` after
  explicit approval. `prisma migrate status` reports the schema is up to date.
  Read-only catalog checks confirmed the new nullable checksum, upload,
  variant timestamp/error/manifest columns plus non-null
  `variantStatus DEFAULT 'pending'` on `PendingReviewImage` and `ReviewMedia`,
  and the four provider/status indexes exist.
- The current AWS review-image operator can read STS identity and IAM OIDC
  state. The target OIDC provider, target runtime role, and runtime IAM
  CloudFormation stack exist and were verified by the post-checks below.
- Runtime OIDC will use the Vercel team issuer
  `https://oidc.vercel.com/renuvex`, custom audience `sts.amazonaws.com`, and
  exact production subject
  `owner:renuvex:project:renuvex-product-reviews:environment:production`.
  Source, `.env.example`, and the runtime IAM template use the same audience
  string to avoid trust-policy/token mismatch.
- The runtime IAM CloudFormation change set
  `renuvex-review-images-runtime-iam-create-20260703` was executed after
  explicit approval. Stack `renuvex-review-images-runtime-iam` is
  `CREATE_COMPLETE` and created only the Vercel team OIDC provider plus the
  `renuvex-review-images-vercel-runtime` role. Post-checks confirmed exact
  production trust conditions, OIDC audiences, review-image-prefix S3 runtime
  access, exact CloudFront invalidation access for distribution `E1205OOLPZDB00`,
  and implicit denies for unrelated S3 prefixes, unrelated CloudFront
  distributions, bucket-policy admin, CloudFront distribution update,
  `iam:PassRole`, and CloudFormation stack creation.

## Documentation Scope
This ADR is allowed to exceed the wiki audit 1200-word advisory while the Cloudinary-to-AWS image migration is being designed. Do not compress away migration-critical context, edge cases, rollback details, cleanup rules, or test requirements for word count alone. Prune after the migration is complete and verified.

## Context / Current State

Renuvex Product Reviews uses Cloudinary as the review-photo provider. Cloudinary is not only an upload detail; it is part of the persisted data contract, URL trust policy, storefront rendering, metadata reconciliation, cleanup jobs, tests, and runtime config.

### Runtime Inventory

The 2026-07-02 read-only DB inventory showed:

- `Review`: 92 rows.
- `Review.images IS NOT NULL`: 78 rows; most are empty JSON arrays from the legacy mirror.
- `Review.hasImages = true`: 8 rows.
- `ReviewMedia`: 18 rows total: 12 `cloudinary` image rows and 6 `mux` video rows. All Cloudinary image rows are `ready`, `visible = true`, and `metadataStatus = complete`.
- `PendingReviewImage`: 6 rows, all `cloudinary` images, all older than the 24-hour pending TTL.
- `MediaProviderJob`: only 1 Cloudinary `cleanup_image` job exists, and it is `succeeded`.
- `OrphanImageQuarantine`: 26 rows.
- Latest `MediaCleanupRun`: `2026-07-01T04:00:28.398Z`, status `ok`, scanned 48 Cloudinary assets, used 12, found 28 candidates, added 26 new quarantine rows, deleted 2.

The live system has active Cloudinary review media plus expired pending uploads with no current cleanup job.

### Test Data Migration Scope

The project is pre-public/test. Existing DB image/pending/quarantine rows and Cloudinary assets are not customer data and need no AWS copy. Optimize future production contract, not this inventory. Cleanup/deletion still requires approval.

### Data Model

Review photos use two layers. `Review.images` is the legacy JSON URL mirror. `ReviewMedia` is the normalized read model and stores URL, unique `publicId`, provider fields, metadata, `position`, and `visible`; image rows default to Cloudinary. `PendingReviewImage` is provider-agnostic by shape but defaults to Cloudinary for images. The Cloudinary-specific model history also exists in migrations that introduced store-scoped pending uploads and later video-provider foundations. `MediaProviderJob` owns provider mutations. `MediaCleanupRun` and `OrphanImageQuarantine` record monthly orphan cleanup state.

### Runtime Config, Dependency, And Build Contract

Cloudinary is present in runtime configuration, dependencies, and build output:

- `.env.example` defines `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET`.
- `package.json` depends on the `cloudinary` SDK; `pnpm-lock.yaml` pins it.
- `next.config.js` allows Next/Image remote patterns under `res.cloudinary.com/<cloud>/image/upload/**`.
- `next.config.js` and `scripts/build-widget.mjs` inject `__RENUVEX_PR_DEFAULT_CLOUDINARY_CLOUD_NAME__`.
- GitHub widget smoke and media cross-browser workflows set `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=renuvex`.
- `/api/public/settings` intentionally does not return `imagePolicy.cloudName`; the widget cloud name is build-time only.

### Cloudinary URL Trust Policy

The server trusts a review image URL only if it is HTTPS, uses host `res.cloudinary.com`, matches the configured cloud name, has path `/<cloud>/image/upload/v<version>/review_images/stores/<storeId>/...`, has no credentials/port/query/hash, does not include encoded slash/backslash or `.` / `..`, and ends with an allowed image extension. Max accepted image count is 3. The same helper derives Cloudinary `publicId` and builds Cloudinary thumbnails.

### Storefront Widget Upload Flow

The review wizard tracks `images`, `pendingImages`, `videoUpload`, and file `fingerprints`. The photo step allows up to 3 photos, creates `blob:` previews, rejects duplicates, calls `/api/public/upload/sign`, then uploads directly to `https://api.cloudinary.com/v1_1/<cloud>/image/upload`. A returned `secure_url` is accepted only if it passes widget-side Cloudinary trust. Accepted uploads move from `pendingImages` to `images`, then fire-and-forget `/api/public/upload/register`. Removed in-flight images are ignored on success. Failed uploads keep an error. Submit is disabled while photos are pending. Preview mode simulates image selection locally.

### Upload Signing Endpoint

`/api/public/upload/sign` rate-limits by IP, validates `storeId`, requires `StoreSettings`, requires Cloudinary cloud name/API key/API secret, signs only `timestamp` and folder `review_images/stores/<storeId>`, and returns `signature`, `timestamp`, `cloud_name`, `api_key`, and `folder`. Missing Cloudinary config returns 500.

### Upload Register Endpoint

`/api/public/upload/register` rate-limits by IP, validates `storeId`, requires `StoreSettings`, validates `secureUrl`, extracts `publicId`, normalizes optional metadata, and upserts `PendingReviewImage` without resetting `createdAt`. It stores an IP hash. Register is best-effort; if it fails, submit can still accept a trusted URL, but abandoned unregistered uploads are only caught by monthly orphan cleanup.

### Review Submit Flow

`/api/public/reviews` validates and deduplicates `images`, requires Cloudinary cloud name when images are present, rejects invalid image URLs, rejects photo+video on the same review, verifies store/product, and chooses initial status from auto-approve settings; videos always start pending. The transaction creates `Review` with `images` mirror and `hasImages`, reads matching pending metadata, creates `ReviewMedia` image rows with `visible = true` only for initially approved reviews, deletes consumed pending image rows for the same store/public IDs, and updates `ProductReviewSummary`. If an image was never registered, submit can still create a `ReviewMedia` row from the trusted URL, but metadata may be missing until backfill.

### Public Review Read Flow

The public reviews API returns approved reviews only. It selects visible, ready `ReviewMedia` rows and formats public media with this precedence:

1. Use normalized `ReviewMedia` when present.
2. For image media, accept only `provider = "cloudinary"` and a trusted Cloudinary URL.
3. For video media, accept only the Mux provider and trusted Mux delivery URLs.
4. If no normalized media survives validation, fall back to trusted URLs parsed from legacy `Review.images`.

`hasImages=true` filters by `Review.hasImages`; `hasMedia=true` filters by `Review.hasImages OR Review.hasVideo`. They cannot be combined.

`ProductReviewSummary` photo/media counts also depend on image truth. The summary path treats `Review.hasImages = true` as authoritative and otherwise falls back to parsing legacy Cloudinary URLs from `Review.images`. The summary rebuild script duplicates the Cloudinary trust policy and warns that missing cloud-name config can rebuild photo counts as zero.

### Admin Moderation And Deletion

Admin list sanitizes legacy `Review.images` through the Cloudinary parser. For image reviews, approval shows media, rejection hides media, and rejection does not delete assets. Deleting a review cascades `ReviewMedia`, but does not enqueue immediate image cleanup; those images become monthly orphan candidates. Video moderation/delete uses the separate Mux lifecycle.

### Metadata Flow

Cloudinary upload metadata is accepted only after normalization. The backend verifies Cloudinary upload response signatures using `public_id`, `version`, and `CLOUDINARY_API_SECRET`. Metadata can end in:

- `complete`: signature valid and image metadata complete.
- `partial`: signature valid but dimensions, bytes, format, or resource type are incomplete.
- `pending`: public ID/version/signature/secret are missing or not usable.
- `invalid_signature`: signature does not match.

Daily maintenance also uses Cloudinary Admin API to backfill incomplete `ReviewMedia` metadata for `provider = "cloudinary"` and `resourceType = "image"` rows whose metadata is not `complete` or terminal `missing_asset`.

### Pending Upload Cleanup

`cleanupPendingUploads` applies a 24-hour TTL. Expired Cloudinary `PendingReviewImage` rows become cleanup candidates. Public IDs are sorted, chunked by Cloudinary's 100-delete batch size, enqueued as `MediaProviderJob` records with provider `cloudinary`, action `cleanup_image`, resource type `image`, and payload `{ publicIds }`, then dispatched. The job processor deletes Cloudinary assets and matching pending rows. The scheduler only reports queued jobs/assets.

The provider job processor imports the Cloudinary image adapter directly. `cleanup_image` currently means Cloudinary image cleanup, and the adapter configures Cloudinary credentials before calling Admin API `delete_resources`.

### Monthly Orphan Image Cleanup

Monthly orphan cleanup is a Cloudinary Admin API scan with two-phase mark/sweep. It requires Cloudinary credentials, lists `review_images/`, builds the used set from Cloudinary image `ReviewMedia` rows plus trusted legacy `Review.images` public IDs, marks old unused assets into `OrphanImageQuarantine`, releases rows that become used again, sweeps rows that remain orphaned past the grace window, and writes `MediaCleanupRun`. Breakers are G1 empty used set while media rows exist, G2 high orphan ratio, and G3 excessive sweep count. Defaults are 30-day age guard, 7-day grace, 30% ratio after at least 50 scanned assets, and max 200 hard deletes.

### Storefront Rendering And Image Optimization

The widget embeds the trusted Cloudinary cloud name at build time; runtime settings no longer carry image policy cloud name. It fails closed when that value is missing, trusts only tenant-scoped Cloudinary URLs using `PUBLIC_API_KEY` as store ID, allows `placehold.co` only in preview mode, inserts Cloudinary `q_auto/f_auto/c_scale,w_<width>` transforms, and builds 1x/2x `srcset`. Generic optimization helpers no-op non-Cloudinary URLs, but review image trust still rejects non-Cloudinary review media.

### Test And Local Contract

The test contract is Cloudinary-shaped: unit tests use Cloudinary URLs, public IDs, and response signatures; widget smoke tests mock upload sign, Cloudinary upload, and register; the widget harness routes `https://res.cloudinary.com/**`; thumbnail and cleanup tests assert Cloudinary behavior.

Test coverage spans more than one layer: public API route tests, metadata tests, metadata-backfill tests, reconciliation tests, review-summary tests, pending cleanup tests, orphan cleanup tests, media-job tests, widget thumbnail tests, widget runtime/network/interaction smoke tests, and cross-browser media tests all contain Cloudinary-shaped fixtures or assertions.

### Legacy Scripts And Tooling

Several maintenance and investigation scripts are Cloudinary-specific:

- `scripts/backfill-review-media.mjs` backfills `ReviewMedia` from legacy Cloudinary URLs.
- `scripts/backfill-review-media-metadata.mjs` fetches Cloudinary Admin API metadata.
- `scripts/audit-legacy-review-media.mjs` audits Cloudinary image trust and media rows.
- `scripts/reconcile-legacy-review-media.mjs` can copy old global Cloudinary paths into tenant-scoped Cloudinary paths.
- `scripts/review-media-reconciliation-lib.mjs` contains Cloudinary URL classification helpers and Cloudinary credential validation.
- `scripts/rebuild-product-review-summaries.mjs` parses trusted Cloudinary URLs for photo counts.
- deployed-widget/network measurement scripts classify or fixture Cloudinary image URLs.

These scripts are part of the current operational surface even if the pre-public test data does not need to be copied to AWS.

### Current Operational Implications

Cloudinary is required for image upload signing, direct storefront upload, trusted URL validation, thumbnails/srcset, metadata verification/backfill, pending cleanup, monthly orphan cleanup, public image rendering, summary rebuilds, legacy reconciliation scripts, CI/test fixtures, and dependency/build config. A full AWS migration must replace the provider contract end to end, not only upload.

## Problem

Renuvex Product Reviews is intended to become a global MVP. Keeping review photos on Cloudinary creates a long-term provider cost and ownership risk before public launch because image upload, delivery, transformations, metadata, cleanup, tests, and operational scripts are all tied to Cloudinary-specific contracts.

The main driver is cost control at global scale. The project already expects media-heavy storefront usage: review images are uploaded by shoppers, rendered on product/list/gallery surfaces, transformed into thumbnails/srcsets, and retained until cleanup policies remove abandoned or orphaned assets. If this path stays Cloudinary-specific, future growth keeps the most frequently rendered image surface on a third-party image provider whose pricing and transformation model are outside the AWS account already being prepared for Renuvex infrastructure.

Because the project is pre-public/test, the migration can prioritize the future production contract instead of preserving existing Cloudinary test data. This creates a window to remove Cloudinary from the image path before customer data depends on it.

The problem is not solved by replacing `/api/public/upload/sign` alone. Cloudinary is also embedded in URL trust, widget rendering, metadata verification, cleanup jobs, summary rebuilds, CI fixtures, and legacy scripts. Any plan that leaves these contracts active would still leave the project operationally dependent on Cloudinary.

## AWS Architecture Evidence

AWS Prescriptive Guidance documents the same boundary pattern as "hexagonal architecture" or "ports and adapters". AWS describes the intent as loosely coupling application components so they can be tested independently and changed over time with limited impact to business logic: [Hexagonal architecture pattern](https://docs.aws.amazon.com/prescriptive-guidance/latest/cloud-design-patterns/hexagonal-architecture.html).

AWS also describes the domain/application core as decoupled from databases, external APIs, and other infrastructure through ports and adapters: [Building hexagonal architectures on AWS - Overview](https://docs.aws.amazon.com/prescriptive-guidance/latest/hexagonal-architectures/overview.html). Its best-practice project layout separates `entrypoints`, `domain` / `ports`, and `adapters`: [Best practices](https://docs.aws.amazon.com/prescriptive-guidance/latest/hexagonal-architectures/best-practices.html).

This is not a mandate to abstract every dependency. AWS explicitly warns that adapter layers add maintenance overhead and can add latency. For this project, the boundary is justified only for the review image provider because provider change is an active business requirement before public launch and because images already touch upload, read, metadata, cleanup, and tests.

## Provider Boundary Decision

Use AWS as the production review-image provider, but keep the application code behind a narrow `ReviewImageProvider` boundary. AWS is the intended production path for new review images; the boundary exists to keep upload, trust, metadata, delivery, and cleanup rules in one provider-owned module instead of spreading provider assumptions across API routes, widget helpers, cleanup jobs, scripts, and tests.

This boundary is not a broad plugin framework and does not imply permanent multi-provider storage. It should have one production implementation after cutover: the AWS-backed image provider. A legacy Cloudinary implementation may exist only as a temporary migration/read compatibility path if needed by a future production-data migration. In the current pre-public migration, existing Cloudinary test data does not need to be copied to AWS.

## Integration Approach

The current data model is already close to provider-aware:

- `ReviewMedia` stores `provider`, `providerAssetId`, `publicId`, metadata, processing state, and visibility.
- `PendingReviewImage` stores the same provider-aware fields for uploads not yet attached to reviews.
- `MediaProviderJob` already routes provider mutations through an outbox.

The missing boundary is in the image code path. Today, `review-images.ts`, upload sign/register routes, `review-media.ts`, metadata backfill, cleanup jobs, widget helpers, scripts, and tests call Cloudinary-shaped logic directly.

The AWS migration should introduce a narrow `ReviewImageProvider` port for image-only operations, not a broad generic storage abstraction. The port should cover:

- create upload intent / presigned upload response
- validate uploaded asset and canonical key/URL
- parse asset key from trusted URL
- build public URL and thumbnail/srcset data
- normalize or fetch metadata
- delete assets
- list assets for orphan cleanup

The first production adapter will be AWS-backed. The existing Cloudinary logic can be treated as legacy/current-state code during migration, but the final public image path should not require Cloudinary runtime config, Cloudinary SDK, Cloudinary URL transforms, or Cloudinary tests.

Widget code cannot call a server-side adapter directly, so the adapter must expose a stable public contract through backend endpoints and a shared documented URL/key policy. Backend and widget trust policies must stay equivalent.

## Performance Constraints

The provider boundary must not add work to the storefront hot path. The widget should not perform provider discovery, per-image provider API calls, or extra backend calls to resolve thumbnails. Public review reads should return render-ready image data such as canonical URL, thumbnail URL, and future srcset/variant data. Storefront code should only validate/render the documented public contract.

Provider-specific work belongs on server-side upload/register, metadata, cleanup, maintenance, and build/test paths. CloudFront delivery should be cache-first, and image variant strategy must avoid serving large originals where thumbnails are expected. Dual-read, if ever needed for production data migration, must be time-boxed and should not make the widget fetch from multiple providers for the same image.

## Migration Impact Classification

This migration must distinguish behavior that is product-required from behavior that is only Cloudinary-shaped. The current source evidence is that image upload, trust, registration, review submit, public read formatting, metadata backfill, pending cleanup, orphan cleanup, widget rendering, scripts, and tests all contain Cloudinary-specific URL, public ID, signature, transform, SDK, or Admin API assumptions. The AWS design must preserve the product behavior while replacing those provider assumptions.

### Must Preserve In AWS

- Pending upload registry behavior must remain. Uploaded-but-unsubmitted images need a `PendingReviewImage` row or equivalent staging record so abandoned wizard uploads can be cleaned later.
- Review submit must remain atomic from the product's perspective: attach committed image media to `Review` / `ReviewMedia`, keep the legacy `Review.images` mirror valid until intentionally removed, delete matching pending rows for consumed images, reject unsupported media combinations, and update `ProductReviewSummary`.
- Public review reads must keep returning render-ready media. The storefront widget should receive canonical image URLs and thumbnail/variant data from the public API instead of doing provider discovery or per-image provider calls.
- Admin moderation semantics must remain: approval/rejection controls `ReviewMedia.visible`; rejecting a review should not silently delete image assets unless that policy is separately changed and tested.
- Provider deletions must remain job/adapter owned. Destructive image operations should flow through `MediaProviderJob` or a provider adapter path, not ad hoc deletes from UI routes.
- Cleanup safety must remain. The pending-upload TTL, monthly orphan mark/sweep/quarantine/audit model, G1/G2/G3 breakers, and `MediaCleanupRun` evidence are product safety behavior, even though the provider API used to list/delete assets must change.
- Test-environment scope must remain explicit: current pre-public Cloudinary rows/assets are test data and do not need to be copied to AWS.

### Must Change For AWS

- Cloudinary signed upload parameters must become an AWS upload intent, most likely an S3 presigned `PUT` or POST flow. AWS documents that presigned URLs can grant time-limited upload access to a specific S3 object without giving the browser AWS credentials, and that the upload is limited by the permissions of the principal that created the URL: [S3 presigned URLs](https://docs.aws.amazon.com/AmazonS3/latest/userguide/using-presigned-url.html), [Uploading objects with presigned URLs](https://docs.aws.amazon.com/AmazonS3/latest/userguide/PresignedUrlUploadObject.html).
- Browser direct upload requires an S3 CORS rule for the selected origin, method, and headers. AWS documents that S3 evaluates browser preflight requests against the bucket CORS configuration and requires the request origin to match an allowed origin: [S3 CORS](https://docs.aws.amazon.com/AmazonS3/latest/userguide/cors.html).
- URL trust must move from `res.cloudinary.com/<cloud>/image/upload/v.../review_images/stores/<storeId>/...` to a documented CloudFront host plus S3 object-key policy. The trusted key shape should include store scope and upload/session uniqueness so one store cannot register another store's object.
- Cloudinary `publicId` must become an AWS object key or stable asset key. Existing DB fields can store that value, but the name `publicId` should be treated as a legacy-compatible identifier, not a Cloudinary concept.
- Cloudinary transformation URLs must be replaced by an AWS delivery/variant strategy. CloudFront can cache and deliver, but it is not a drop-in replacement for Cloudinary transformations; thumbnails/srcset must be original-only, pre-generated, or produced by a separate image-processing path before storefront cutover.
- Metadata proof must change from Cloudinary upload-response signature validation to AWS object validation. The backend should validate the upload intent, key ownership, expected content type/size, and object existence/metadata using S3 APIs before registering or committing media.
- Cleanup operations must change from Cloudinary Admin API `resources` / `delete_resources` to S3 list/head/delete operations behind the image provider adapter.
- Runtime and build-time Cloudinary dependencies must be removed or replaced after cutover: Cloudinary SDK, Cloudinary env keys, `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`, widget build constant injection, Next/Image Cloudinary remote pattern, GitHub workflow Cloudinary env, and Cloudinary-shaped tests/scripts.

### Unnecessary In This Pre-public Migration

- Copying current Cloudinary test assets to AWS is unnecessary because the project is not public and these rows/assets are not customer data.
- Dual-read for current Cloudinary test data is unnecessary unless a later verification step proves real production data exists.
- Permanent Cloudinary plus AWS mirroring is unnecessary and would add ongoing storage/provider complexity without being a stated durability requirement.
- Running legacy Cloudinary reconciliation as part of the AWS cutover is unnecessary except as read-only evidence or reference for old data shapes.
- Building the full executable production-data copy workflow is unnecessary now; the ADR should preserve the rule for future production data, but current implementation should optimize for a clean AWS-first public launch.

### Extra Required On AWS

- Use a private S3 bucket for originals/variants and publish through CloudFront with Origin Access Control. AWS recommends OAC over legacy OAI for S3 origins and requires bucket policy permission for the CloudFront service principal scoped to the distribution: [Restrict access to an S3 origin](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-s3.html).
- Keep S3 Block Public Access and bucket policies aligned with least privilege. AWS S3 security best practices warn to keep buckets non-public unless explicitly required and to check bucket policies/ACLs for broad public access: [S3 security best practices](https://docs.aws.amazon.com/AmazonS3/latest/userguide/security-best-practices.html).
- Add S3 CORS only for the browser upload route and only for the required origins, methods, and headers.
- Define object-key prefixes for pending and committed review images, including store scope, upload session or generated asset ID, and allowed extensions/content types.
- Add IAM permissions for the application role/user that are limited to presign, `HeadObject`, `PutObject` through presigned intent, `ListBucket` on required prefixes, and delete operations used by cleanup jobs. Infrastructure lifecycle permissions should stay separate from application runtime permissions.
- Add explicit cleanup for staging/pending prefixes. S3 Lifecycle rules can expire objects by prefix or tag, and AWS notes that lifecycle actions are asynchronous and may complete later than the eligibility time: [S3 Lifecycle](https://docs.aws.amazon.com/AmazonS3/latest/userguide/how-to-set-lifecycle-configuration-intro.html). Therefore lifecycle can be a safety net, but DB-aware pending cleanup still needs to decide which app rows are expired and which objects are safe to delete.
- Define CloudFront cache behavior and invalidation rules before cutover. Public media URLs should be immutable or versioned so normal moderation/update flows do not depend on frequent invalidations.
- Add AWS-specific tests for presign response shape, CORS/upload mock behavior, URL/key trust policy, register validation, submit commit behavior, metadata normalization, pending cleanup, orphan cleanup, public read formatting, and widget rendering.

## Image Optimization And Variant Strategy

This is a required AWS migration decision, not an optional polish item. The current Cloudinary implementation is not only storing images; it is also doing delivery-time optimization.

Current source behavior:

- Server-side public media builds a Cloudinary `thumbnailUrl` with `c_fill,g_auto,w_320,h_427,q_auto,f_auto`.
- Widget helpers add `q_auto/f_auto/c_scale,w_<width>` to Cloudinary URLs and build 1x/2x `srcset` entries.
- Current source widths are `REVIEW_MEDIA_THUMB_WIDTH = 300`, `GALLERY_TILE_WIDTH = 600`, `LIGHTBOX_MINI_THUMB_WIDTH = 200`, and `LIGHTBOX_MAIN_WIDTH = 1200`.
- The widget helper no-ops non-Cloudinary URLs for optimization, but image trust still rejects non-Cloudinary review media until the AWS trust policy exists.

Cloudinary documentation confirms the current behavior is meaningful: `q_auto` analyzes images to select compression/encoding settings for a smaller file with acceptable visual quality, `f_auto` chooses an efficient browser-compatible format, and dynamic transformations can resize/crop/smart-crop images through delivery URLs. Those capabilities are currently used in code through URL transforms, not through a separate Renuvex image service.

Plain S3 plus CloudFront does not automatically replace Cloudinary transformations. AWS has official dynamic image transformation patterns, but they require an explicit image-processing layer. AWS's Dynamic Image Transformation for Amazon CloudFront solution uses CloudFront plus Lambda or ECS/Fargate with `sharp`, supports S3 origins, transformation policies, automatic format selection, quality optimization, and CloudFront caching. AWS's CloudFront + Lambda image optimization reference architecture makes the same point: image transformations require deciding what transformations are needed, where to decide them, where to execute them, and whether transformed images are cached/stored.

For the Renuvex public MVP, the preferred path is finite pre-generated variants, not fully dynamic arbitrary transforms:

- Store original upload in S3 as the canonical source object.
- Generate a small fixed set of review-image variants at register/commit time or through a background provider job before the image becomes publicly renderable.
- Store variants under deterministic, immutable S3 keys and serve them through CloudFront.
- Return render-ready variant URLs from the public API so storefront rendering does not call a provider or compute variants at runtime.
- Keep `ReviewMedia` metadata/response capable of carrying canonical `url`, `thumbnailUrl`, and future `srcset`/variant fields.
- Fail closed: if required variants are missing, do not expose an unoptimized multi-megabyte original as a thumbnail.

### Verified Variant Surface Matrix

The source contract is not the same as the visible CSS box. Admin settings can make a displayed image small, medium, or large, but the current Cloudinary source widths are deliberately larger for retina quality. AWS variants should therefore be derived from the current source-width contract, not only from the visible CSS dimensions.

| Surface | Admin sizing input | Current visible box | Current source behavior | AWS migration implication |
| --- | --- | --- | --- | --- |
| Public API `thumbnailUrl` | None | API field only | Server returns Cloudinary `c_fill,g_auto,w_320,h_427,q_auto,f_auto`. Unit tests assert this response shape. | Keep a render-ready `thumbnailUrl` or replace it with an explicit `variants` contract in the same API change. Do not leave it Cloudinary-shaped. |
| Card review item photos | `size` | Square: 80 / 110 / 140 px | Widget requests width-only Cloudinary sources at 300 and 600 via 1x/2x `srcset`; CSS `object-fit: cover` creates the square crop. | Need 300 and 600 optimized sources, or a deliberate square-crop replacement if visual behavior is intentionally changed. |
| List review item photos | `size` | 3:4 portrait: desktop 80 / 110 / 140 px; mobile 80 / 100 / 110 px | Widget requests width-only Cloudinary sources at 300 and 600; CSS `object-fit: cover` creates the portrait crop. | Need 300 and 600 optimized sources that remain safe for 3:4 object-fit cropping. |
| Top media gallery strip | `thumbnailSize` | Card uses square; list/gallery use 3:4. Desktop 80 / 110 / 140 px; list/gallery mobile 80 / 100 / 110 px. | Widget uses the same 300 and 600 Cloudinary source-width contract as card/list thumbnails. | Do not create one variant per admin size. Reuse the 300/600 preview sources and let CSS size the box. |
| Gallery review item photo | `size` | 3:4 portrait: desktop 80 / 110 / 140 px; mobile 80 / 100 / 110 px | Widget requests width-only Cloudinary sources at 600 and 1200 through `GALLERY_TILE_WIDTH`. | Need 600 and 1200 optimized sources for gallery tiles. |
| Lightbox mini rail | None | 52 x 52 px CSS box | Widget requests width-only Cloudinary sources at 200 and 400. | Need 200 and 400 optimized mini sources or reuse a broader preview variant if file size remains acceptable. |
| Lightbox main image | None | Contained in modal; desktop left pane is 438 px wide, mobile is full-width 3:4 area | Widget requests a width-only Cloudinary source at 1200. No 2x image `srcset` is currently generated for the main image. | Need a 1200 optimized source for main lightbox display. |
| Review wizard upload preview | Upload state only | Local preview tiles | Uses local `blob:` preview while upload is pending; after upload, the Cloudinary URL can be shown directly in wizard state. | Does not drive public variants. Variant generation can happen after upload/register/commit, but the wizard still needs a responsive local preview and safe uploaded-state behavior. |

### Target AWS Variant Contract

This closes the variant-contract decision for the migration plan. The AWS image path must use a finite pre-generated variant set for the public MVP, not arbitrary public transformation query parameters.

Evidence behind this decision:

- The current widget has a finite source-width contract: `200`, `300`, `400`, `600`, and `1200` px. It does not request arbitrary widths from user input.
- The current visual crop is mostly CSS-driven through `object-fit`; Cloudinary source requests are width-only except the server-side `thumbnailUrl`.
- Public API tests already assert a `thumbnailUrl` compatibility field, so removing it in the same migration would widen the rollout risk.
- AWS official image-transformation patterns require an explicit processing layer such as Lambda or ECS/Fargate behind CloudFront; plain S3 plus CloudFront does not replace Cloudinary `q_auto`, `f_auto`, resizing, or crop behavior by itself.
- The repository currently has `sharp` only as a transitive dependency through Next.js / Wrangler, not as a direct dependency. AWS image implementation must add and pin the chosen image processor directly, or choose an explicit alternative, before variant generation code lands. Sharp's official API supports reading common web image formats and producing optimized JPEG/WebP/AVIF/PNG outputs, so deterministic server-side variant generation remains a better MVP fit than a new public dynamic transformation service if the dependency is made explicit.

Decision:

- Preserve the current width-only source behavior for card, list, top media gallery, gallery layout, lightbox rail, and lightbox main image. CSS remains responsible for square or portrait display crops on those surfaces.
- Keep `thumbnailUrl` as a compatibility field during the AWS cutover. It must point to an AWS-generated public fallback thumbnail, not to Cloudinary.
- Add a provider-neutral `variants` contract to public image media. The widget should consume `variants` first and only use `url` / `thumbnailUrl` as compatibility fallbacks.
- Generate variants as WebP plus JPEG fallback for the MVP. WebP is the preferred modern source; JPEG is the conservative fallback for `src` and compatibility fields. AVIF is deferred until the public path has performance evidence and screenshot coverage.
- Strip metadata/EXIF, normalize orientation, use sRGB output, and never expose original filenames in public URLs.
- Do not enlarge beyond the uploaded source dimensions. If a required larger variant cannot be generated without upscaling, generate the largest safe variant and mark the exact available dimensions in metadata; public reads must still satisfy the required render contract before marking the media ready.
- Animated images are not supported by default for the first AWS cutover. If GIF/WebP/AVIF animation cannot be safely preserved across required variants, reject the upload with a sanitized unsupported-media error before it becomes submit-ready. Do not silently publish a first-frame still as if animation was supported.

Required public-render variants per committed image:

| Variant key | Geometry | Crop | Purpose |
| --- | --- | --- | --- |
| `w200` | width 200, proportional height | No | Lightbox mini rail 1x. |
| `w300` | width 300, proportional height | No | Card/list/top media gallery 1x. |
| `w400` | width 400, proportional height | No | Lightbox mini rail 2x. |
| `w600` | width 600, proportional height | No | Card/list/top media gallery 2x and gallery layout 1x. |
| `w1200` | width 1200, proportional height | No | Gallery layout 2x and lightbox main image. |
| `thumb_320x427` | 320 x 427 | Cover | Public API `thumbnailUrl`, compact/admin thumbnails, legacy compatibility. |
| `thumb_640x854` | 640 x 854 | Cover | 2x thumbnail source for future API/widget use. |

Each required variant is generated as `<variant>.webp` and `<variant>.jpg`, so the MVP creates fourteen public-render variant objects per committed static image. Earlier candidate names such as `preview_w300`, `gallery_w600`, `mini_w200`, and `lightbox_w1200` are semantic aliases only; object keys should use the deduplicated keys above.

Variant key contract:

- Private staging original: `review-images/v1/private/stores/<storeId>/assets/<assetId>/original/<filename-or-content-addressed-name>`.
- Private staging variants: `review-images/v1/private/stores/<storeId>/assets/<assetId>/variants/<variant>.<format>`.
- Public variants: `review-images/v1/public/stores/<storeId>/assets/<assetId>/variants/<variant>.<format>`.
- `assetId` must be generated by the application and must not reveal customer filenames, email addresses, product names, or review text.
- Public variant URLs are immutable and cacheable. Do not depend on CloudFront invalidations for normal review image updates or moderation changes.
- The cleanup object family is the full `<storeId>/<assetId>` prefix across private original, private variants, and public variants.

Public API render contract for AWS images:

- `url`: public JPEG fallback URL for `w1200`; it is a render-ready public object, not the private original.
- `thumbnailUrl`: public JPEG fallback URL for `thumb_320x427`.
- `variants`: provider-neutral render map used by the widget.
- Do not expose provider SDK details, S3 bucket names, private keys, signed admin URLs, private originals, checksums, or internal processing job IDs in public responses.
- `Review.images` may remain as a legacy mirror during the cutover, but for AWS-backed rows it must contain render-ready public fallback URLs only. After Cloudinary teardown, `ReviewMedia.variants` or deterministic variant derivation is the durable image contract; `Review.images` is compatibility-only.

Example public image media shape:

```json
{
  "type": "image",
  "url": "https://media.renuvex.app/review-images/v1/public/stores/store_123/assets/asset_456/variants/w1200.jpg",
  "thumbnailUrl": "https://media.renuvex.app/review-images/v1/public/stores/store_123/assets/asset_456/variants/thumb_320x427.jpg",
  "width": 1200,
  "height": 1600,
  "format": "jpeg",
  "mimeType": "image/jpeg",
  "bytes": 185432,
  "variants": {
    "mini": {
      "fallbackUrl": "https://media.renuvex.app/review-images/v1/public/stores/store_123/assets/asset_456/variants/w200.jpg",
      "fallbackSrcset": "https://media.renuvex.app/review-images/v1/public/stores/store_123/assets/asset_456/variants/w200.jpg 1x, https://media.renuvex.app/review-images/v1/public/stores/store_123/assets/asset_456/variants/w400.jpg 2x",
      "sources": [
        {
          "type": "image/webp",
          "srcset": "https://media.renuvex.app/review-images/v1/public/stores/store_123/assets/asset_456/variants/w200.webp 1x, https://media.renuvex.app/review-images/v1/public/stores/store_123/assets/asset_456/variants/w400.webp 2x"
        }
      ]
    },
    "preview": {
      "fallbackUrl": "https://media.renuvex.app/review-images/v1/public/stores/store_123/assets/asset_456/variants/w300.jpg",
      "fallbackSrcset": "https://media.renuvex.app/review-images/v1/public/stores/store_123/assets/asset_456/variants/w300.jpg 1x, https://media.renuvex.app/review-images/v1/public/stores/store_123/assets/asset_456/variants/w600.jpg 2x",
      "sources": [
        {
          "type": "image/webp",
          "srcset": "https://media.renuvex.app/review-images/v1/public/stores/store_123/assets/asset_456/variants/w300.webp 1x, https://media.renuvex.app/review-images/v1/public/stores/store_123/assets/asset_456/variants/w600.webp 2x"
        }
      ]
    },
    "gallery": {
      "fallbackUrl": "https://media.renuvex.app/review-images/v1/public/stores/store_123/assets/asset_456/variants/w600.jpg",
      "fallbackSrcset": "https://media.renuvex.app/review-images/v1/public/stores/store_123/assets/asset_456/variants/w600.jpg 1x, https://media.renuvex.app/review-images/v1/public/stores/store_123/assets/asset_456/variants/w1200.jpg 2x",
      "sources": [
        {
          "type": "image/webp",
          "srcset": "https://media.renuvex.app/review-images/v1/public/stores/store_123/assets/asset_456/variants/w600.webp 1x, https://media.renuvex.app/review-images/v1/public/stores/store_123/assets/asset_456/variants/w1200.webp 2x"
        }
      ]
    },
    "lightbox": {
      "fallbackUrl": "https://media.renuvex.app/review-images/v1/public/stores/store_123/assets/asset_456/variants/w1200.jpg",
      "sources": [
        {
          "type": "image/webp",
          "srcset": "https://media.renuvex.app/review-images/v1/public/stores/store_123/assets/asset_456/variants/w1200.webp 1x"
        }
      ]
    },
    "thumbnail": {
      "fallbackUrl": "https://media.renuvex.app/review-images/v1/public/stores/store_123/assets/asset_456/variants/thumb_320x427.jpg",
      "fallbackSrcset": "https://media.renuvex.app/review-images/v1/public/stores/store_123/assets/asset_456/variants/thumb_320x427.jpg 1x, https://media.renuvex.app/review-images/v1/public/stores/store_123/assets/asset_456/variants/thumb_640x854.jpg 2x",
      "sources": [
        {
          "type": "image/webp",
          "srcset": "https://media.renuvex.app/review-images/v1/public/stores/store_123/assets/asset_456/variants/thumb_320x427.webp 1x, https://media.renuvex.app/review-images/v1/public/stores/store_123/assets/asset_456/variants/thumb_640x854.webp 2x"
        }
      ]
    }
  }
}
```

Generation timing:

- Generate and verify required private variants after S3 upload/register validation and before the upload reference is considered submit-ready.
- `/api/public/upload/register` must not return a successful AWS image reference until the original object is decoded, metadata is validated, required private variants are generated, and variant metadata is recorded.
- The first implementation may do this synchronously inside register or through an awaited provider job. The client-facing contract is the same: no submit-ready upload reference without required variants.
- Do not generate variants inside the final review-submit database transaction. Submit should consume variant-ready upload refs, not perform expensive image processing while holding DB state.
- If a review is auto-approved, promotion/copy from private variants to public variants must finish before `ReviewMedia.processingStatus = "ready"` and `visible = true` make the image eligible for public reads.
- If a review is pending moderation, public promotion depends on the public/admin visibility contract. Pending or rejected images must not leak through the public reviews API.

Readiness and failure behavior:

- Public-ready requires: uploaded original validated, decoded static format accepted, metadata known, all required private variants generated, final public variants present for the current visibility state, and the `ReviewMedia` row marked `processingStatus = "ready"` only after those checks.
- Fail closed. Never expose the private original or unoptimized upload as a storefront thumbnail, gallery tile, or lightbox fallback.
- Use sanitized error codes such as `decode_failed`, `unsupported_animated_image`, `variant_generation_failed`, `variant_upload_failed`, and `variant_verification_failed`.
- Keep failed/pending media out of public reads. Cleanup and retry behavior is covered by the cleanup contract, but the variant contract requires all related objects to live under the same asset family prefix.

Variant acceptance tests required before code cutover:

- Public API returns AWS image media with `url`, `thumbnailUrl`, and `variants`, and does not expose private originals or provider internals.
- Widget renders `variants.preview` for card/list/top gallery thumbnails, `variants.gallery` for gallery layout, `variants.mini` for the lightbox rail, and `variants.lightbox` for the main lightbox image.
- `thumbnailUrl` remains compatible with existing public API expectations during rollout.
- AWS image trust accepts only the approved delivery host and `review-images/v1/public/stores/<storeId>/assets/<assetId>/variants/...` key shape.
- Missing required variants keep media out of public reads.
- Admin `small` / `medium` / `large` and `thumbnailSize` settings do not create additional AWS variant keys.
- JPEG fallback and WebP sources are emitted and consumed correctly.
- Metadata stripping, filename privacy, and no-private-original exposure are verified.
- Animated uploads are rejected or explicitly handled; no silent first-frame publishing.
- Cleanup tests cover private original, private variants, and public variants as one object family.

## Target Public/Admin Visibility Contract

This closes planning item 4. AWS review images use different visibility paths for storefront delivery and admin moderation.

Source evidence:

- The public reviews API selects only approved reviews and only media where `visible = true` and `processingStatus = "ready"`. Public formatting then rejects non-Cloudinary image providers until the AWS trust/render contract is implemented.
- Review submit sets image media `visible` only when the initial review status is approved. Manual review approval/rejection later toggles `ReviewMedia.visible` to match whether the review is approved.
- The admin reviews API is authenticated by the iframe JWT, can list pending/approved/rejected reviews for the merchant, and currently returns raw image `url` values to `ReviewRow`.
- Admin image previews currently open `media.url` directly. By contrast, unapproved video preview already uses an authenticated admin endpoint that returns short-lived signed playback tokens and `Cache-Control: private, no-store`. The AWS image path should follow that security shape instead of keeping pending/rejected images public-by-URL.

AWS evidence:

- AWS S3 security best practices say buckets should not be public unless explicitly required, and S3 Block Public Access centrally limits public access: [S3 security best practices](https://docs.aws.amazon.com/AmazonS3/latest/userguide/security-best-practices.html) and [S3 Block Public Access](https://docs.aws.amazon.com/AmazonS3/latest/userguide/access-control-block-public-access.html).
- CloudFront OAC is the recommended way to secure S3 origins and prevent direct public S3 access: [Restrict access to an S3 origin](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-s3.html).
- CloudFront private content uses signed URLs or signed cookies, with trusted key groups recommended as signers: [Serve private content](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/PrivateContent.html), [Use signed URLs](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-signed-urls.html), and [Specify signers](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-trusted-signers.html).
- CloudFront behavior path ordering is security-sensitive; AWS warns that an earlier unsigned behavior can unintentionally bypass a later signed behavior: [Cache behavior settings](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/DownloadDistValuesCacheBehavior.html).

Decision:

- Approved storefront images are public, immutable CloudFront variant URLs under `review-images/v1/public/stores/<storeId>/assets/<assetId>/variants/...`.
- Pending images, rejected images that were never public, private originals, and private variants are not delivered through normal unsigned public URLs.
- Admin access to pending/rejected image variants uses an authenticated backend route that returns short-lived CloudFront signed URLs for the private variant prefix.
- Use CloudFront signed URLs for admin image preview, not S3 presigned GET URLs, so the browser stays on the media delivery domain and cannot bypass CloudFront/OAC restrictions.
- Use CloudFront trusted key groups, not legacy AWS-account trusted signers. Store the signing private key only in provider runtime secrets; never store it in source, wiki, DB rows, logs, or public responses beyond the generated short-lived signed URL.
- Use signed URLs, not signed cookies, for the MVP admin image path. The admin UI previews individual thumbnails/full images; per-object signed URLs are simpler and avoid cookie scope mistakes.

Visibility state contract:

| Review/media state | S3 object location | Public reviews API | Admin list thumbnail | Admin full preview |
| --- | --- | --- | --- | --- |
| Upload registered, not submitted | Private original + private variants only | Not returned | Not applicable unless a future upload-debug UI exists | Not applicable |
| Submitted pending moderation | Private variants only | Not returned | Authenticated signed URL to private `thumb_320x427` or `w300` variant | Authenticated signed URL to private `w1200` variant |
| Approved and public-ready | Public variants copied/promoted; private originals/variants may remain for audit/rollback/cleanup | Returned with public `url`, `thumbnailUrl`, and `variants` | Public thumbnail URL is allowed | Public `w1200` URL is allowed |
| Rejected before ever being public | Private variants only | Not returned | Authenticated signed URL only | Authenticated signed URL only |
| Previously approved, later rejected/taken down | Public API hides immediately; public variants must be deleted or blocked through a revocation job; private variants may remain for admin/audit until cleanup | Not returned after DB status/visibility change | Authenticated signed URL to private variant after public revocation starts | Authenticated signed URL to private variant after public revocation starts |
| Review deleted | No public API exposure; all private/public object family members become cleanup candidates | Not returned | Not returned | Not returned |

Public storefront rules:

- Public API must return only public variant URLs for AWS-backed image media. It must never return private object keys, S3 bucket hostnames, S3 presigned GET URLs, signed admin CloudFront URLs, private originals, or internal provider job IDs.
- `Review.status = "approved"`, `ReviewMedia.visible = true`, and `ReviewMedia.processingStatus = "ready"` are all required before AWS image media can be formatted for public reads.
- Public URL trust must accept only `media.renuvex.app` and the public variant prefix shape. The widget must reject private prefixes even if a URL is signed.
- `Review.images` legacy mirror may contain AWS public fallback URLs only for public-ready approved images. It must not contain signed admin URLs or private-prefix URLs.
- Public variants are immutable and long-cacheable. Approval/publish should not require CloudFront invalidation because it creates new public keys.

Admin visibility rules:

- Admin review listing remains authenticated by the iframe JWT and scoped to `review.storeId = user.merchantId`.
- Admin API should not return raw private S3 keys or durable private URLs. For pending/rejected AWS images it may return either:
  - a short-lived signed thumbnail URL plus expiry for list rendering, or
  - a preview descriptor that the frontend exchanges through a separate authenticated preview endpoint.
- Full-size admin image preview should use a dedicated route, tentatively `GET /api/admin/reviews/image-preview?mediaId=<id>&variant=w1200`, that:
  - validates the iframe JWT with the existing `getUserFromRequest` pattern;
  - verifies `ReviewMedia.id`, `resourceType = "image"`, AWS provider, processing/variant readiness, and merchant ownership through the related review/store;
  - returns a signed CloudFront URL for pending/rejected private variants or a public URL for already-approved public media;
  - sets `Cache-Control: private, no-store`;
  - returns `expiresIn` / `expiresAt` so the UI can refresh expired previews;
  - does not persist signed URLs.
- Signed admin URL TTL should start at 15 minutes, matching the existing admin video preview pattern. A shorter 5-minute TTL is acceptable if UX remains stable; longer than 15 minutes needs an explicit reason.
- Admin thumbnails for private images should use generated variants, not originals. The list view should not load original uploads for `48x48` thumbnails.
- For signed/private admin image URLs, use a plain `<img>` or an explicitly unoptimized image path. Do not route short-lived signed URLs through Next/Image optimization unless the cache and query-string behavior is verified, because admin preview URLs must remain private and short-lived.

CloudFront behavior contract:

- The review-image distribution needs at least these path behaviors:
  - `review-images/v1/private/*`: requires signed URLs through `TrustedKeyGroups`; allowed methods `GET, HEAD`; origin is the private S3 bucket through OAC.
  - `review-images/v1/public/*`: unsigned public delivery; allowed methods `GET, HEAD`; origin is the same private S3 bucket through OAC.
  - default `*`: must not unintentionally expose objects outside the public/private contracts. Access should fail closed through bucket policy and behavior ordering.
- Private behavior must be ordered before any broader public/default behavior that could match the same object path.
- Bucket policy must allow the CloudFront distribution to `s3:GetObject` for the public variant prefix and for the private variant prefix required by signed admin preview. It must not allow CloudFront to read private originals.
- Do not expose S3 website hosting. Do not disable S3 Block Public Access to make image objects public.
- CloudFront signed URL query parameters are bearer access for their TTL. Do not log signed admin URLs in application logs, analytics payloads, Sentry breadcrumbs, wiki pages, or DB fields.

Moderation transition rules:

- Pending-to-approved image moderation must promote/copy required variants to the public prefix before setting image media `visible = true` and public-ready. If provider promotion is asynchronous, approval should return a processing state and complete visibility after the provider job succeeds, similar to the existing video approval pattern.
- Pending-to-rejected must keep the image out of the public prefix. Rejection does not need to delete private variants immediately; cleanup/quarantine decides lifecycle.
- Approved-to-rejected is a takedown path. Public API exposure stops immediately through DB status/visibility. Public variants that were already exposed should be queued for delete or access-block plus CloudFront invalidation of the exact public variant URLs. This cannot erase copies already downloaded or cached by browsers, but it is required for best-effort provider-side revocation.
- Review delete removes public API exposure immediately. Object-family deletion remains part of the cleanup contract and must include both private and public prefixes.

Public/admin visibility acceptance tests required before code cutover:

- Public API excludes pending, rejected, invisible, processing, and private-prefix AWS image media.
- Public API never returns signed admin URLs, S3 bucket URLs, private original URLs, or private variant URLs.
- Public API returns approved AWS images only from the public variant prefix and only after required variants exist.
- Widget trust rejects `review-images/v1/private/...` URLs even if the host is `media.renuvex.app`.
- Admin list can show pending/rejected AWS image thumbnails without public URLs and without loading originals.
- Admin full image preview uses an authenticated endpoint and short-lived signed CloudFront URLs for pending/rejected images.
- Admin signed preview responses use `Cache-Control: private, no-store` and do not persist signed URLs.
- Approving an image review does not mark media public-visible until public variants are promoted and verified.
- Rejecting a never-approved image creates no public variants.
- Rejecting an already-approved image hides it from public reads and enqueues provider-side revocation for public variants.
- CloudFront behavior ordering test or IaC assertion proves private path behavior requires trusted key groups before any broader unsigned behavior.

## Target Database And Schema Contract

This closes planning item 5. AWS review images use a hybrid schema contract: object keys and public URLs are deterministic, while public readiness, retry/reconcile state, and variant evidence are stored in additive database fields.

Source evidence:

- `ReviewMedia` and `PendingReviewImage` already have provider-aware fields: `provider`, `providerAssetId`, `sourceProvider`, `sourceAssetId`, metadata fields, `processingStatus`, and indexes for provider/status scans.
- Public review reads already use database gates before formatting media: `Review.status = "approved"`, `ReviewMedia.visible = true`, and `ReviewMedia.processingStatus = "ready"`.
- Public formatting currently rejects non-Cloudinary image providers, so AWS media needs an explicit trusted render contract rather than a provider-specific URL parser hidden in the widget.
- `Review.images` is a legacy JSON URL mirror. It must remain compatibility-only and must not become the durable source of AWS variant truth.
- `MediaProviderJob.payload` already uses JSON for provider operation data, but public query gates are typed columns. Keep that separation: job payloads can be flexible, public visibility state must be queryable and auditable.
- Existing migration history uses additive fields first, then later contract cleanup after old code no longer needs legacy fields. The AWS image schema must follow the same expand/contract deployment rule.

Decision:

- Do not store every public variant URL as authoritative DB state.
- Do not create a normalized `ReviewMediaVariant` table for the MVP.
- Do not rely on deterministic object keys alone.
- Use deterministic object-family keys for S3/CloudFront delivery and cleanup.
- Add typed lifecycle fields to `ReviewMedia` and `PendingReviewImage` so upload, submit, approval, retry, public reads, admin preview, cleanup, and reconciliation can prove image readiness without probing S3/CloudFront on the storefront hot path.
- Add a compact JSON manifest for variant evidence and render metadata, not for public visibility gates.

Field contract:

| Model | Field | Purpose |
| --- | --- | --- |
| `PendingReviewImage` | `variantStatus String @default("pending") @db.VarChar(32)` | Tracks upload-intent/private variant readiness before a review consumes the pending image. |
| `PendingReviewImage` | `variantGeneratedAt DateTime?` | Records when required private variants were generated and verified. |
| `PendingReviewImage` | `variantErrorCode String? @db.VarChar(128)` | Stores sanitized terminal or retryable error code, never raw provider responses or signed URLs. |
| `PendingReviewImage` | `variantManifest Json?` | Compact variant evidence for the private staged asset. |
| `ReviewMedia` | `variantStatus String @default("pending") @db.VarChar(32)` | Tracks committed media readiness, including public promotion/revocation state. |
| `ReviewMedia` | `variantGeneratedAt DateTime?` | Records when required variants were generated and verified for this committed media row. |
| `ReviewMedia` | `variantPublishedAt DateTime?` | Records when public variants were promoted and verified. |
| `ReviewMedia` | `variantRevokedAt DateTime?` | Records best-effort provider-side public variant revocation after takedown/rejection. |
| `ReviewMedia` | `variantErrorCode String? @db.VarChar(128)` | Stores sanitized error code for repair/reconcile and support diagnostics. |
| `ReviewMedia` | `variantManifest Json?` | Compact provider-neutral variant manifest used to build public/admin render descriptors. |

`providerAssetId` remains the stable AWS asset family id. `sourceAssetId` stores the private original object key. `publicId` remains the unique legacy-named media identifier; for AWS it is a stable internal media id and must not be treated as a Cloudinary `public_id`.

Variant status values are string states validated in application code, consistent with existing `processingStatus` and `metadataStatus` patterns. Initial AWS states should be:

- `pending`: upload intent or media row exists but required variant work has not completed.
- `generating`: private variant generation is in progress.
- `private_ready`: private variants exist and the image can be submitted or previewed by authenticated admin routes, but it is not public.
- `public_ready`: required public variants exist, public URLs can be returned, and the row may be visible when review status and `processingStatus` also allow it.
- `failed`: variant generation/promotion failed and needs retry or manual investigation.
- `revoking`: public variant revoke/delete is in progress after takedown.
- `revoked`: public variant revoke/delete completed or was confirmed not needed.

Public-read gate:

- AWS image media can be formatted for the storefront only when all of these are true:
  - `Review.status = "approved"`.
  - `ReviewMedia.visible = true`.
  - `ReviewMedia.processingStatus = "ready"`.
  - `ReviewMedia.variantStatus = "public_ready"`.
- `processingStatus = "ready"` remains necessary but is not sufficient for AWS images.
- Public reads must not call S3, CloudFront, AWS SDKs, or provider APIs to check whether variants exist.
- Missing, failed, private-only, revoked, or revoking variants fail closed and are omitted from public media.

Manifest contract:

`variantManifest` stores provider-neutral evidence that the required variant set exists. It may include:

- `schemaVersion`.
- `variantSetVersion`.
- `generatedAt`.
- per-variant names such as `w200`, `w300`, `w400`, `w600`, `w900`, `w1200`, and `thumb_320x427`.
- available formats such as `webp` and `jpg`.
- width, height, bytes, checksum/etag when available, and object-key suffixes or relative variant paths.

`variantManifest` must not include:

- AWS access keys, session tokens, signatures, presigned POST fields, signed admin URLs, S3 bucket hostnames, private original URLs, raw shopper filenames, emails, JWTs, or provider error payloads.
- Durable full public URLs as the source of truth. Public URLs are built from the approved media delivery domain, store id, `providerAssetId`, and deterministic variant names.

Indexing and migration contract:

- The schema migration must be additive: nullable JSON/timestamp/error fields plus defaulted string status fields. Do not drop/rename Cloudinary fields during the first AWS deployment.
- Use B-tree indexes only for fields that repair/reconcile jobs actually filter by. If the implementation includes scheduled scans by variant state, add targeted indexes such as `[provider, resourceType, variantStatus, createdAt]` on `ReviewMedia` and `[provider, variantStatus, createdAt]` on `PendingReviewImage`.
- Do not add a GIN index on `variantManifest` for the initial MVP. JSONB indexing is useful only if the app queries inside the manifest; the public hot path should use typed status fields and deterministic URL building instead.
- Do not use a Prisma/Postgres enum for `variantStatus` in the first migration. A constrained string is easier to evolve through the pre-public migration and matches current status-field patterns. If a database check constraint is added later, add it safely in a dedicated migration.

Why this is the durable choice:

- Pure deterministic derivation cannot prove whether variant generation, public promotion, admin preview, retry, or revocation succeeded.
- Full URL persistence couples DB rows to a domain/key version and makes future CloudFront/domain changes a data migration.
- A normalized variant table creates many rows per image and extra joins for a fixed finite variant set; it is only justified if variants become dynamic, user-configurable, or independently queryable.
- The hybrid contract keeps the storefront hot path render-ready, keeps public visibility auditable, keeps cleanup based on deterministic object-family prefixes, and leaves a future provider migration path without making the widget provider-aware.

Schema acceptance tests required before code cutover:

- Public API excludes AWS image rows unless `variantStatus = "public_ready"` in addition to the existing approved/visible/ready gates.
- Submit cannot consume a pending AWS image unless private variants are ready or the implementation deliberately routes the review into a processing state that prevents public exposure.
- Auto-approved image reviews do not become visible until public variants are promoted and verified.
- Admin preview for pending/rejected images requires private-ready variants and never stores signed URLs in DB.
- Failed variant generation stores a sanitized `variantErrorCode`, not a raw provider exception.
- Reconcile/repair tests can find failed or stuck AWS image rows through typed status fields.
- Cleanup tests can derive the whole object family from `storeId` plus `providerAssetId` without reading public URLs from `Review.images`.
- Legacy `Review.images` mirrors only public fallback URLs for AWS public-ready media and never stores private/signed URLs.

## Target Cleanup Contract

This closes planning item 6. AWS review-image cleanup keeps the existing DB-aware safety model and adds AWS-native guardrails as backstops. S3 Lifecycle is not the source of truth for customer media deletion.

Source evidence:

- `cleanupPendingUploads` runs daily through `/api/admin/daily-maintenance`, finds expired `PendingReviewImage` rows older than 24 hours, and queues provider cleanup through `MediaProviderJob`.
- `/api/admin/cleanup-images` runs monthly and is only a fallback orphan scan. It uses `OrphanImageQuarantine`, `MediaCleanupRun`, a 30-day age guard, 7-day grace, G1 empty-used-set breaker, G2 orphan-ratio breaker, and G3 absolute delete cap.
- Provider deletes already flow through the media outbox and adapter layer; UI routes should not gain arbitrary object-delete authority.
- The current admin/backend app runs on Vercel. The storefront Worker on Cloudflare is public delivery/cache infrastructure and must not hold AWS delete credentials or own DB-aware cleanup.
- The AWS object family is deterministic: private original, private variants, and public variants are all under `review-images/v1/{private,public}/stores/<storeId>/assets/<assetId>/...`.

AWS evidence:

- S3 Lifecycle can expire objects by prefix and/or tag, evaluates tag filters daily, and re-checks tags before expiration. AWS also documents that lifecycle actions are asynchronous and may happen after eligibility: [Expiring objects](https://docs.aws.amazon.com/AmazonS3/latest/userguide/lifecycle-expire-general-considerations.html), [Lifecycle filters](https://docs.aws.amazon.com/AmazonS3/latest/userguide/intro-lifecycle-filters.html).
- S3 Lifecycle cannot be blocked by bucket policy, even if a policy denies deletes. Therefore it must not target committed media broadly: [Object lifecycle management](https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lifecycle-mgmt.html).
- AWS recommends lifecycle `AbortIncompleteMultipartUpload` to minimize storage cost for unfinished multipart uploads; this action does not delete completed objects: [Abort incomplete multipart uploads](https://docs.aws.amazon.com/AmazonS3/latest/userguide/mpu-abort-incomplete-mpu-lifecycle-config.html).
- Object tags are supported for lifecycle, IAM/bucket policy, and cost allocation style categorization; S3 supports up to 10 tags per object: [Working with object metadata](https://docs.aws.amazon.com/AmazonS3/latest/userguide/UsingMetadata.html).
- S3 Inventory provides scheduled object lists as an alternative to synchronous list APIs, and S3 Metadata live inventory provides queryable object/tag state that is normally updated within about one hour after backfill: [S3 Inventory](https://docs.aws.amazon.com/AmazonS3/latest/userguide/configure-inventory.html), [S3 Metadata tables](https://docs.aws.amazon.com/AmazonS3/latest/userguide/metadata-tables-overview.html).
- EventBridge Scheduler is AWS's managed scheduler for cron/rate schedules and can target AWS services at scale, but using it for this app would require moving DB-aware cleanup code and secrets into AWS runtime: [EventBridge Scheduler](https://docs.aws.amazon.com/scheduler/latest/UserGuide/what-is-scheduler.html).

Decision:

- Keep DB-aware cleanup in the application backend for this migration. The current Vercel cron routes may continue to trigger cleanup while the admin/backend app stays on Vercel.
- Do not run cleanup from the Cloudflare storefront Worker. The Worker should keep serving widget/runtime/read-cache behavior and should not receive AWS delete permissions.
- Use AWS-native S3 Lifecycle only as a bounded safety net for pending/staging residue and incomplete multipart uploads.
- Use `MediaProviderJob` for destructive provider operations, including AWS image family cleanup, public-variant revocation, and any bulk cleanup that follows a DB decision.
- Keep `OrphanImageQuarantine` and `MediaCleanupRun` as durable app-level evidence. They are product safety controls, not Cloudinary-specific features.
- Use S3 Inventory or S3 Metadata live inventory for production-scale orphan scans before public/global scale. Direct paginated `ListObjectsV2` may be acceptable for local tests or an early empty bucket, but it must be scoped to the review-image prefixes and must not become the only large-scale scan strategy.
- Reserve S3 Batch Operations for exceptional reviewed bulk repair/cleanup work from a generated manifest. Do not make Batch Operations the normal unattended monthly cleanup path.

Object family and identity:

- The cleanup unit is an AWS review-image asset family, not an individual S3 object.
- The family id is `storeId + assetId`; in DB rows this maps to `storeId` plus `providerAssetId`.
- `sourceAssetId` stores the private original object key.
- `OrphanImageQuarantine.publicId` may store the stable AWS family identifier, for example `aws_s3:<storeId>:<assetId>`, until a later additive audit-schema improvement is justified. Do not create one quarantine row per variant object.
- `MediaCleanupRun.sampleDeleted` stores a sample of deleted family ids, not signed URLs, bucket URLs, or every variant key.

Object tags:

- On upload intent/private original: `renuvex-provider=aws-review-images`, `renuvex-state=pending`, `renuvex-store=<storeId>`, and `renuvex-asset=<assetId>` where tag length/character limits allow.
- On private variants generated before submit: same provider/store/asset tags and `renuvex-state=pending` until the image is committed to a review.
- On committed private originals/private variants: update to `renuvex-state=committed` during review submit or immediately after the provider job claims the asset for a review. This prevents pending lifecycle from deleting committed-but-not-public media.
- On public variants: `renuvex-state=committed`.
- On provider-side revocation/delete candidates, the app may add a short-lived `renuvex-state=delete_candidate` tag only as a diagnostic aid. It must not rely on tag-only lifecycle for normal committed-media deletion.

Pending cleanup:

- The sign endpoint should create a pending upload intent row before returning the S3 POST. If the browser exits before upload, the pending row still gives cleanup evidence.
- Daily pending cleanup keeps the current 24-hour TTL semantics for `PendingReviewImage`.
- For expired AWS pending rows, enqueue an idempotent AWS image cleanup job with a server-derived payload such as:

```json
{
  "families": [
    {
      "storeId": "<store-id>",
      "assetId": "<asset-id>",
      "uploadSessionId": "<upload-session-id>",
      "pendingPublicId": "aws_s3:<store-id>:<asset-id>"
    }
  ],
  "reason": "pending_expired",
  "deletePrivate": true,
  "deletePublic": false
}
```

- The provider adapter derives exact private original and private variant keys from `storeId`, `assetId`, and the variant contract. The client must never supply delete keys.
- Missing S3 objects are treated as idempotent success for cleanup.
- The pending DB row is deleted only after the provider cleanup job succeeds or confirms the objects are already absent.
- S3 Lifecycle also expires objects still tagged `renuvex-state=pending` after a short guard window, initially 2 days. This catches the rare case where the app job never ran, but it does not replace the DB job because lifecycle does not update `PendingReviewImage` or `MediaCleanupRun`.
- If multipart upload is ever used, configure `AbortIncompleteMultipartUpload` after 1 day. For the current direct POST single-object contract this is still a harmless bucket guardrail if future upload code switches to multipart.

Submit and moderation cleanup:

- Review submit consumes pending rows and moves the object family from pending to committed. The implementation must retag private originals and variants before the pending lifecycle window can expire them.
- Rejected reviews that still exist in DB are not orphans. Orphan scans must treat all AWS image `ReviewMedia` rows as used, regardless of `Review.status`, `visible`, or `variantStatus`.
- Rejection before public approval keeps only private committed objects and creates no public variants.
- Approved-to-rejected is a public takedown path. Public API exposure stops immediately through DB status/visibility; provider work then revokes public variants for the asset family. Private committed variants may remain for authenticated admin/audit until review deletion or a separately approved retention policy.
- Review deletion should enqueue an immediate best-effort AWS image cleanup job for associated image families before or inside the review delete transaction, matching the existing video cleanup direction. The monthly orphan scan remains the fallback if dispatch fails.

Orphan scan strategy:

- The used set comes from DB, primarily AWS `ReviewMedia` rows grouped by `storeId + providerAssetId`. Do not derive AWS used state from `Review.images`; that field is compatibility-only.
- The scanned set comes from AWS inventory/metadata filtered to `review-images/v1/private/stores/` and `review-images/v1/public/stores/`, grouped into asset families.
- A family is an orphan candidate only when no `ReviewMedia` row and no unexpired `PendingReviewImage` row references that `storeId + assetId`.
- The 30-day age guard applies at family level. Use the oldest safe family-created time from object metadata/inventory, not a client-provided timestamp.
- The first eligible run marks family ids into quarantine only. A later run sweeps only family ids still orphaned after the grace window.
- G1, G2, and G3 breakers remain:
  - G1: empty used set while media rows exist is never force-overridable.
  - G2: orphan ratio above threshold requires human review/force.
  - G3: sweep above absolute cap requires human review/force.
- A forced run is still authenticated by `CRON_SECRET` and must record `forced = true` in `MediaCleanupRun`.

Provider delete behavior:

- Delete exact known keys first: private original, private variants, public variants for the finite variant set.
- If the implementation needs to list, list only the two deterministic family prefixes for that `storeId + assetId`; never list or delete a whole store prefix or bucket prefix from a single family cleanup job.
- Use S3 multi-object delete in small bounded batches. Treat `NoSuchKey` as success.
- Public takedown may require CloudFront invalidation for exact public variant paths only when previously public URLs must be revoked quickly. Normal approval/publish should not depend on invalidation because public variant keys are immutable.
- Provider job payloads must store only family identifiers, store id, asset id, reason, and booleans for private/public deletion. Do not store signed URLs, raw S3 presigned requests, bucket hostnames, or client-supplied object keys.

Lifecycle and retention:

- Lifecycle rule 1: abort incomplete multipart uploads after 1 day.
- Lifecycle rule 2: expire `renuvex-state=pending` objects under `review-images/v1/private/` after 2 days.
- Lifecycle rule 3: retain noncurrent versions for a short recovery window, initially 7 days, then expire noncurrent versions/delete markers if versioning is enabled.
- No lifecycle rule may expire `renuvex-state=committed` objects or the `review-images/v1/public/` prefix unless a separate product retention policy is approved.
- Do not use S3 Object Lock for normal review images. It would make cleanup harder and is intended for retention/WORM requirements, not ordinary user-generated review media.

Scheduling contract:

- While the admin/backend app remains on Vercel, keep Vercel Cron as the app-level scheduler because it already invokes the production route and sends `CRON_SECRET` in the Authorization header when configured. Current schedules remain conceptually correct: daily pending cleanup and monthly orphan fallback.
- If the backend/runtime later moves into AWS, the equivalent AWS scheduler should be EventBridge Scheduler invoking Lambda or SQS with the same DB-aware logic and the same `MediaProviderJob` semantics.
- Do not add Cloudflare Cron for review-image cleanup unless the backend and secrets move there. Storefront Worker delivery should remain independent of destructive media maintenance.

Cleanup acceptance tests required before code cutover:

- Pending AWS cleanup deletes private original/private variants for expired pending rows and removes the pending row only after provider success or already-absent confirmation.
- Pending lifecycle test proves committed media is retagged away from `renuvex-state=pending` before the 2-day lifecycle backstop can delete it.
- Orphan scan groups S3 objects into asset families and never creates one quarantine row per variant object.
- Orphan scan treats rejected/pending-review `ReviewMedia` rows as used.
- Orphan scan trips G1/G2/G3 with AWS family ids and performs no mark/delete on G1.
- Review deletion enqueues AWS image family cleanup and monthly orphan cleanup catches missed jobs.
- Approved-to-rejected hides public API immediately and enqueues exact public variant revocation.
- Provider cleanup never accepts raw client-supplied delete keys and never deletes outside `review-images/v1/{private,public}/stores/<storeId>/assets/<assetId>/`.
- S3 lifecycle configuration is asserted in IaC/tests: abort incomplete multipart uploads, expire pending-tagged private objects only, no committed/public-prefix expiration.
- Inventory/metadata scan tests prove large-scale scans can filter/group by provider prefix/tags without bucket-wide destructive actions.

## Remaining Design Gaps Before Implementation

These sections separate closed design decisions from implementation-level work that still must be reflected in the migration plan. Open items are not blockers to the ADR draft, but they are blockers to a correct implementation plan.

### Admin Panel Behavior

Admin review rows currently receive media from `/api/admin/reviews` as `{ id, type, url, posterUrl, durationMs, width, height, position, processingStatus, visible }`. The admin API does not return `provider`, `providerAssetId`, `thumbnailUrl`, variant data, metadata status, or provider-specific readiness. `ReviewRow` renders image thumbnails through Next/Image with `src={item.url}` at `48x48`, and the full-screen image preview opens the same raw `media.url`.

The public/admin visibility decision is closed in "Target Public/Admin Visibility Contract". The implementation plan still must update the admin image contract to match it:

- Admin must still be able to inspect pending, approved, and rejected image reviews.
- Approved images can reuse public variant URLs.
- Pending/rejected images must use authenticated signed admin preview URLs, not normal unsigned public URLs.
- Next/Image configuration must allow the AWS delivery host, or admin image thumbnails must switch to a plain image path that does not depend on Next remote image optimization.
- Admin list should not load original-size uploads for `48x48` thumbnails.

### Storefront And Public API Behavior

The public reviews API selects only `visible` and `processingStatus = "ready"` media, then formats public media through `publicMediaFromMediaOrLegacy`. Image media currently passes only when `provider = "cloudinary"` or legacy Cloudinary URLs are trusted. The widget also trusts only Cloudinary review-image URLs and, for image thumbnails, uses `item.url` as the preview source; image `thumbnailUrl` is stored on the media object but is not the primary source used by `mediaPreviewUrl`.

The public/admin visibility decision and variant contract close the public image-rendering direction. AWS migration still must change the storefront contract as one unit:

- Public API must accept AWS-backed `ReviewMedia` rows instead of rejecting non-Cloudinary image providers.
- Widget image trust must validate the AWS delivery host/key contract, not Cloudinary cloud name.
- Public API should return the render-ready image contract (`url`, `thumbnailUrl`, and `variants`) so the widget does not generate provider-specific URLs.
- The widget should use the returned render contract for thumbnails, gallery, and lightbox instead of deriving Cloudinary transforms from `item.url`.
- `hasImages`, `photoReviewCount`, `mediaReviewCount`, filters, and media-gallery `hasMedia=true` reads must remain correct when images are AWS-backed.

### Database And Schema Contract

This decision is closed in "Target Database And Schema Contract". The implementation plan should use the hybrid contract: deterministic object-family keys plus additive typed lifecycle fields and compact `variantManifest` JSON on `ReviewMedia` and `PendingReviewImage`.

Open implementation work remains:

- Add the additive Prisma migration without dropping or renaming Cloudinary-era fields.
- Update public/admin API selects and serializers to include provider-neutral variant readiness/render data.
- Update submit, moderation, cleanup, reconcile, and repair paths so `variantStatus` transitions are consistent with `processingStatus`, `visible`, and `Review.status`.
- Decide exact repair/reconcile query shapes before adding optional variant-status indexes.

### Backend File Architecture And Provider Isolation

Cloudinary logic is currently spread across generic-sounding files and routes: `review-images.ts` owns URL trust, public ID parsing, and thumbnail construction; upload sign/register routes call Cloudinary-shaped helpers; `review-media.ts` rejects non-Cloudinary image providers; metadata backfill and cleanup modules call the Cloudinary SDK/Admin API directly; widget helpers contain a parallel Cloudinary trust/optimization contract.

AWS migration must introduce a clear image-provider boundary instead of replacing strings in place:

- Server-only provider adapter code should own AWS SDK/S3/CloudFront operations.
- Shared pure contract code should define the public image key/URL policy, allowed extensions/content types, max count, and public response shape without importing provider SDKs.
- Browser/widget code must not import AWS SDKs or server adapters.
- Cleanup and metadata jobs should call the provider boundary, not provider SDKs directly.
- Legacy Cloudinary compatibility, if kept temporarily, should be isolated as a legacy adapter/path and not remain mixed into the new AWS code path.

### Config, Build, And Test Contract

`next.config.js`, `scripts/build-widget.mjs`, GitHub workflows, and widget tests still contain Cloudinary build-time host/cloud assumptions. AWS cutover must replace these with an AWS delivery contract deliberately:

- Next/Image remote patterns or equivalent admin rendering behavior must cover the AWS delivery host.
- Widget build constants should no longer be Cloudinary cloud-name constants after cutover.
- Storefront tests need AWS URL/key fixtures, variant/srcset assertions, upload mock changes, and fail-closed trust tests.
- Public API tests need AWS provider rows and variant response expectations.
- Cleanup tests need object-family cleanup assertions for original plus variants.
- Admin tests need image thumbnail/preview coverage for AWS-backed image rows.

## Planning Readiness

This ADR is ready as the evidence baseline for the AWS migration plan. It captures the current Cloudinary implementation, product behavior that must survive, AWS-backed provider direction, provider-boundary shape, performance constraints, variant surface, public/admin visibility, schema contract, cleanup contract, rollout/rollback gates, acceptance criteria, security guardrails, cleanup safety, and pre-public no-data-copy scope.

It is not a final step-by-step implementation plan. All planning decisions are now closed; the implementation plan must map source changes, migrations, commands, and provider mutations to the contracts below:

1. Target AWS resource contract: closed in this ADR. Use the contract in "Target AWS Resource Contract".
2. Upload contract: closed in this ADR. Use the contract in "Upload Contract".
3. Variant contract: closed in this ADR. Use the contract in "Target AWS Variant Contract".
4. Public/admin visibility contract: closed in this ADR. Use the contract in "Target Public/Admin Visibility Contract".
5. Schema contract: closed in this ADR. Use the hybrid contract in "Target Database And Schema Contract".
6. Cleanup contract: closed in this ADR. Use the contract in "Target Cleanup Contract".
7. Rollout and rollback contract: closed in this ADR. Use the clean AWS-only cutover contract in "Target Rollout And Rollback Contract".
8. Acceptance criteria: closed in this ADR. Use the gates in "Target Acceptance Criteria".

Therefore the next document should be a migration plan or implementation design that sequences these closed contracts into code changes, migrations, tests, env changes, provider mutations, deploys, and teardown gates.

## Target AWS Resource Contract

Verified on 2026-07-03:

- AWS CLI is available locally as `aws-cli/2.35.11`.
- AWS account is `989086371563`, account name `renuvex`.
- Primary project AWS region remains `eu-central-1`, matching the existing AWS setup note and the Vercel `fra1` backend region.
- `renuvex-review-images` profile resolves to `arn:aws:sts::989086371563:assumed-role/AWSReservedSSO_RenuvexReviewImageAccess_1c1689a6660b1865/mert`, default region `eu-central-1`.
- `renuvex-readonly` profile resolves to `arn:aws:sts::989086371563:assumed-role/AWSReservedSSO_ReadOnlyAccess_81ded659d34c4a71/mert`, default region `eu-central-1`.
- Existing AWS resources are still only the widget CDN canary: CloudFormation stack `renuvex-widget-cdn-canary`, CloudFront distribution `E2IGB2R73IV6SE`, and bucket `renuvex-widget-canary-989086371563-eu-central-1`.
- No review-image bucket or stack exists yet. `head-bucket` for `renuvex-review-images-989086371563-eu-central-1` and `renuvex-review-images-prod-989086371563-eu-central-1` returned S3 `404`.
- No ACM certificate exists in `us-east-1`.
- Public DNS resolvers `1.1.1.1` and `8.8.8.8` returned no public record for `media.renuvex.app`. The local resolver returned `192.168.1.1`, so local DNS must not be used as proof that the public subdomain is configured.

### Account, Region, And Stack Ownership

Use account `989086371563` and region `eu-central-1` for the S3 bucket and CloudFormation stack. CloudFront remains a global service, but the owning infrastructure stack should be created from `eu-central-1` for consistency with existing AWS repository operations.

Stack naming:

- Main stack: `renuvex-review-images-prod`.
- Optional edge certificate stack, only if the custom domain is used through ACM: `renuvex-review-images-edge-cert` in `us-east-1`.

No existing widget canary stack, bucket, CloudFront distribution, or Cloudflare Worker delivery resource should be reused for review images. The review-image provider is a separate AWS surface with separate lifecycle and rollback.

### Delivery Domain

Target public image delivery domain: `media.renuvex.app`.

Reasoning:

- It is semantically separate from `app.renuvex.app` backend/API and `widget.renuvex.app` widget runtime delivery.
- Public DNS currently has no record for it, so there is no verified production conflict.
- A custom domain keeps persisted/public media URLs independent from a specific CloudFront default hostname.

Required future mutations, not approved by this ADR:

- Request or import an ACM certificate for `media.renuvex.app` in `us-east-1`. AWS documents that CloudFront viewer certificates from ACM must be in `us-east-1`.
- Add `media.renuvex.app` as a CloudFront alternate domain name. AWS documents that alternate domain names must be covered by the attached certificate and routed through DNS.
- Add the DNS record in the authoritative DNS provider after CloudFront and ACM are ready. Current project DNS appears to be Cloudflare-managed for `widget.renuvex.app`; any DNS mutation still requires explicit approval.

Before the custom domain is approved, testing may use the CloudFront default hostname only as a temporary verification URL. Do not persist the default CloudFront hostname into `ReviewMedia` as the final public URL contract.

### S3 Buckets

Use a dedicated private S3 general purpose bucket for review image objects:

- Preferred physical name: `renuvex-review-images-prod-989086371563-eu-central-1`.
- Logical role: `ReviewImageBucket`.
- Public access: S3 Block Public Access enabled.
- Object ownership: Bucket owner enforced; ACLs disabled.
- Encryption: default SSE-S3. SSE-C remains disabled. Do not introduce SSE-KMS unless a later compliance requirement justifies the key policy and CloudFront/OAC KMS permission complexity.
- Versioning: enabled, so accidental overwrites/deletes can be investigated and recovered during the migration window.
- Website hosting: disabled. CloudFront must use the regular S3 bucket origin, not the S3 website endpoint, because OAC does not support website endpoints.
- CloudFormation deletion behavior: retain bucket resources by default. Bucket deletion or emptying is a separate destructive teardown decision.

Use a separate log bucket if AWS-layer request logging is enabled:

- Preferred physical name: `renuvex-review-image-logs-prod-989086371563-eu-central-1`.
- Retention: short lifecycle retention, initially 30 days, unless cost/security review changes it.
- The log bucket must also be private, encrypted, ACL-disabled where supported by the selected logging feature, and retained on stack deletion.

### Object Key And Prefix Contract

Do not use shopper filenames in object keys. Object keys must be generated by the server from store scope plus an unguessable asset id.

Private upload/source prefix:

```text
review-images/v1/private/stores/<storeId>/assets/<assetId>/original.<ext>
review-images/v1/private/stores/<storeId>/assets/<assetId>/variants/<variant>.<ext>
```

Public delivery prefix:

```text
review-images/v1/public/stores/<storeId>/assets/<assetId>/variants/<variant>.<ext>
```

Rules:

- `storeId` is public scope, not a secret.
- `<assetId>` must be server-generated and unguessable, for example UUID or ULID with enough entropy.
- Originals remain in the private prefix and are not CloudFront-public.
- Public storefront URLs use only generated variants under the public prefix.
- Cleanup must treat both private and public prefixes for the same `<assetId>` as one object family.
- Future key-shape changes must create a new prefix version such as `review-images/v2/...`; do not mutate existing public keys in place.

### CloudFront Distribution

Use one dedicated CloudFront distribution for review-image public delivery.

Origin and access:

- Origin: the private S3 bucket's regional REST endpoint.
- Origin access: CloudFront Origin Access Control, not OAI.
- OAC signing behavior: always sign requests. AWS documents that OAC with S3 uses HTTPS to S3 when requests are always signed.
- Bucket policy: allow the CloudFront service principal `cloudfront.amazonaws.com` to `s3:GetObject` only for the public variant prefix and the private variant prefix required by signed admin preview, and only when `AWS:SourceArn` matches the review-image distribution ARN.
- Do not grant CloudFront read access to private originals.
- Do not grant CloudFront write access.

Viewer behavior:

- Viewer protocol policy: redirect HTTP to HTTPS.
- Allowed methods: `GET` and `HEAD` for public image delivery.
- Cache key: no cookies, no query strings, no viewer headers unless a later variant negotiation design explicitly needs them.
- Public variants should be immutable/versioned and served with long cache headers, for example `public, max-age=31536000, immutable`.
- Add a response headers policy with at least `X-Content-Type-Options: nosniff`. Public image CORS response headers may use `Access-Control-Allow-Origin: *` because these are non-credentialed public image assets.
- Invalidation should not be part of normal moderation or image update behavior. New variants should use new immutable keys instead.

### Browser Upload CORS

The current project source says public widget APIs are open to unknown storefront domains because `widget.js` can be called from any ikas storefront domain. `src/lib/cors.ts` reflects the request origin or uses `*`, and `Security_And_Rate_Limits.md` records that storefront domains are unknowable a priori.

For the AWS MVP, direct browser upload to S3 therefore cannot use a fixed exact-origin allowlist unless the product first adds verified per-merchant storefront-origin storage.

Target S3 CORS for direct upload:

- `AllowedOrigins`: `*` for MVP direct upload, with no credentialed browser access.
- `AllowedMethods`: `POST` only for browser uploads.
- `AllowedHeaders`: `*` for the MVP S3 POST route while merchant storefront origins are unknown and the exact browser preflight header set can vary. This is not an authorization grant; the presigned POST policy, object key, size/type/checksum constraints, server-side register validation, and cleanup controls remain the enforcement boundary. If a verified storefront-origin allowlist and stable header set are added later, narrow this rule.
- `ExposeHeaders`: `ETag` and selected checksum headers may be exposed, but register must not depend on browser-visible response headers because it validates the object server-side with S3.
- No S3 CORS rule should permit browser `GET` for private originals.

This is not an authorization relaxation. AWS documents that S3 bucket policies and ACLs still apply when CORS is enabled, and presigned URLs remain limited by the signing principal and object key. Abuse control must come from the sign endpoint, short URL TTL, strict key generation, rate limits, post-upload validation, object tags, and cleanup.

If a future StoreSettings origin allowlist is added, replace wildcard S3 upload CORS with generated exact origins.

### Lifecycle And Object Tags

S3 Lifecycle is a safety net, not the source of truth. The app database remains authoritative for pending uploads, committed media, and cleanup decisions.

Object tags should support lifecycle and investigation:

- `renuvex-state=pending` on newly uploaded originals.
- `renuvex-state=committed` on committed originals and public variants.
- `renuvex-provider=aws-review-images`.

Lifecycle target:

- Abort incomplete multipart uploads after 1 day if multipart upload is used.
- Expire objects tagged `renuvex-state=pending` after a short guard window, initially 2 days, as a backstop for failed register/cleanup.
- Retain noncurrent versions for a short recovery window, initially 7 days.
- Do not expire committed public variants by lifecycle unless a separate retention policy is approved.

The app-level pending cleanup and orphan cleanup must still run with the current quarantine/breaker model. Lifecycle must not replace `PendingReviewImage`, `MediaProviderJob`, `OrphanImageQuarantine`, or `MediaCleanupRun` evidence.

### Logging And Audit

Mandatory:

- Keep app-level audit rows: `MediaProviderJob`, `MediaCleanupRun`, and orphan quarantine rows. Do not store signed URLs or secrets.
- Keep S3/CloudFront resource tags on all AWS resources: project `renuvex-product-reviews`, service `review-images`, environment `prod`, owner `renuvex`.

AWS-layer target:

- Enable CloudFront access logging for public image delivery to the dedicated log bucket with short retention, unless a cost review explicitly rejects it before implementation.
- Enable S3 server access logging or an equivalent S3 audit path for bucket-level request investigation if supported by the final bucket/logging configuration.
- Rely on default CloudTrail management events for bucket, policy, CORS, lifecycle, CloudFront, IAM, and CloudFormation changes.
- Do not enable high-volume S3 CloudTrail data events by default for MVP. Revisit before public launch or if abuse/audit requirements require object-level CloudTrail despite cost.

### IAM Boundary

Separate infrastructure and runtime permissions:

- Infrastructure/operator identity: `RenuvexReviewImageAccess` can be used for approved CloudFormation/S3/CloudFront/IAM setup work. It is not a runtime application identity.
- Runtime identity: create a separate least-privilege principal, tentatively `RenuvexReviewImageRuntime`, for the Vercel backend to create upload intents, validate objects, generate/write variants, tag objects, and delete known object families.

Runtime allowlist shape:

- Bucket-level: `s3:ListBucket` only on the review-image bucket and only for `review-images/v1/*` prefixes required by cleanup.
- Object-level private/public prefixes: `s3:PutObject`, `s3:GetObject` / `HeadObject`, `s3:DeleteObject`, `s3:DeleteObjectVersion`, `s3:GetObjectTagging`, `s3:PutObjectTagging`, and any checksum/tagging action required by the chosen upload contract.
- No runtime `s3:PutBucketPolicy`, `s3:PutBucketCors`, `s3:PutLifecycleConfiguration`, `cloudfront:*`, `cloudformation:*`, `iam:*`, broad `s3:*`, or unrestricted `iam:PassRole`.

Credential delivery to Vercel is part of rollout/env planning, not approved here. Prefer a short-lived role/federated path if available and verified; otherwise any access-key env fallback must be explicitly approved, least-privilege, rotated, and stored only in provider env, never in source or wiki.

## Upload Contract

This closes planning item 2. The AWS image upload flow must use an S3 presigned POST, not a presigned PUT, for the public storefront widget.

Decision evidence:

- Current widget behavior already uses a browser `FormData` POST to Cloudinary. Keeping a POST-style browser upload keeps the UI flow close to the source code in `src/widget/reviews-section/review-form-modal/steps/step-photos.js`.
- AWS documents browser-based POST as a direct browser-to-S3 upload model where a POST policy specifies allowed conditions, then the browser uploads directly to S3 without AWS credentials.
- AWS POST policy supports `content-length-range`, exact field matches, `Content-Type`, `key`, and `x-amz-meta-*` conditions. This lets the backend enforce the existing 10 MB image limit at S3, not only in client-side JavaScript.
- AWS POST Object supports object tags, user metadata, success status `204`, and checksum form fields such as `x-amz-checksum-algorithm=SHA256` plus `x-amz-checksum-sha256`.
- AWS documents that S3 validates a supplied checksum before accepting the object, and `HeadObject` can later return `Content-Length`, `Content-Type`, checksum headers, version id, tag count, and metadata. Register can therefore validate the object before staging it.

Rejected alternative:

- Do not use presigned `PUT` for MVP review images. PUT can upload to an exact key and can sign headers, but it does not give the same browser-friendly POST policy contract for `content-length-range`. For this app, file-size abuse is a real account-cost and cleanup risk because the widget is public and store origins are unknown.

### Upload API Shape

Keep the existing public endpoints for rollout compatibility:

- `POST /api/public/upload/sign`
- `POST /api/public/upload/register`

The response shape changes for the AWS path. Cloudinary fields such as `cloud_name`, `api_key`, `timestamp`, `signature`, and `folder` must not be returned after the AWS cutover. The browser must never receive AWS credentials.

Sign request body:

```json
{
  "storeId": "<public-store-id>",
  "fileName": "customer-selected-name.jpg",
  "contentType": "image/jpeg",
  "bytes": 123456,
  "checksumAlgorithm": "SHA256",
  "checksumSha256": "<base64-sha256>"
}
```

Rules:

- `storeId` must pass the same normalization used today and must resolve to `StoreSettings`.
- `fileName` is used only to infer or cross-check the extension. Never persist or put the shopper filename into an object key, public URL, metadata, logs, or audit rows.
- `contentType` must be an exact allowlist value: `image/jpeg`, `image/png`, `image/webp`, `image/gif`, or `image/avif`. Do not use a broad `image/*` server-side rule.
- `bytes` must be an integer from 1 through `10 * 1024 * 1024`, matching the current widget limit.
- `checksumAlgorithm` must be `SHA256`.
- `checksumSha256` must be a valid base64-encoded SHA-256 digest of the file bytes. The widget should compute it with Web Crypto before requesting a sign response. If the browser cannot compute it, the AWS upload should fail closed with a normal upload error.

Sign response body:

```json
{
  "provider": "aws_s3",
  "uploadMethod": "post",
  "uploadUrl": "https://<bucket>.s3.<region>.amazonaws.com/",
  "fields": {
    "key": "review-images/v1/private/stores/<storeId>/assets/<assetId>/original.jpg",
    "Content-Type": "image/jpeg",
    "success_action_status": "204"
  },
  "assetId": "<server-generated-uuid-or-ulid>",
  "uploadSessionId": "<server-generated-uuid-or-ulid>",
  "objectKey": "review-images/v1/private/stores/<storeId>/assets/<assetId>/original.jpg",
  "expiresAt": "2026-07-03T00:00:00.000Z",
  "maxBytes": 10485760,
  "checksumAlgorithm": "SHA256",
  "publicUrl": null
}
```

`fields` must include every S3 POST form field returned by the signing library, including the SigV4 fields, policy, signature, exact key, exact `Content-Type`, checksum fields, metadata fields, tags, and `success_action_status`. The example above is intentionally incomplete so the ADR does not imply a hand-written SigV4 implementation.

The backend should generate both:

- `assetId`: stable provider asset id used in object keys and future `ReviewMedia.providerAssetId`.
- `uploadSessionId`: one-time upload intent id used by register/submit to bind the browser flow to the staging row.

### Upload Intent Persistence

The sign endpoint should create or reserve an upload intent before returning the S3 POST. The preferred durable implementation is to create a `PendingReviewImage` staging row at sign time with the server-generated ids, expected private object key, expected content type, expected byte size, expected checksum, provider `aws_s3`, and a pending/upload-intent status.

Current schema evidence: `PendingReviewImage` already has `publicId`, `storeId`, `uploadSessionId`, `url`, `assetId`, `provider`, `providerAssetId`, `sourceProvider`, `sourceAssetId`, `mimeType`, `bytes`, `metadataStatus`, and `processingStatus`. It does not yet have a dedicated checksum field or a generic upload-intent metadata JSON field. The schema contract must add those fields or define an equivalent deterministic storage rule before code changes start.

Reasoning:

- The current source already uses `PendingReviewImage` as the abandoned-upload cleanup registry.
- A sign-created intent gives cleanup evidence even if the browser uploads but register fails, or if the browser signs and then exits.
- Register can be idempotent against `uploadSessionId` and `assetId` rather than trusting a client-supplied URL.

If implementation later chooses an HMAC upload-intent token instead of a sign-time DB row, that is a schema/rollout decision and must still provide equivalent replay protection, cleanup evidence, and register validation. It must not leave register dependent on a client-provided public URL.

### S3 POST Policy

Create the presigned POST with the AWS SDK for JavaScript v3 `@aws-sdk/s3-presigned-post` helper or an equivalent SDK-supported SigV4 POST implementation. Do not hand-roll SigV4 unless the SDK route is proven blocked.

Expiry:

- Presigned POST expiration: 5 minutes.
- Bucket policy defense-in-depth: keep the `s3:signatureAge` guard from the target resource contract, initially 10 minutes maximum.

Required exact fields/conditions:

```text
bucket = <review-image-bucket>
key = review-images/v1/private/stores/<storeId>/assets/<assetId>/original.<ext>
Content-Type = <allowed exact content type>
success_action_status = 204
x-amz-checksum-algorithm = SHA256
x-amz-checksum-sha256 = <base64-sha256>
x-amz-meta-store-id = <storeId>
x-amz-meta-asset-id = <assetId>
x-amz-meta-upload-session-id = <uploadSessionId>
tagging = <Tagging><TagSet><Tag><Key>renuvex-state</Key><Value>pending</Value></Tag><Tag><Key>renuvex-provider</Key><Value>aws-review-images</Value></Tag></TagSet></Tagging>
content-length-range = 1..10485760
```

Do not include an ACL field. The target bucket uses Bucket Owner Enforced object ownership and disabled ACLs.

Do not include public-read, website redirect fields, original filename metadata, shopper identifiers, email addresses, JWTs, request tokens, signed URLs, or any value that would expose private data through object metadata, logs, or future diagnostics.

### Widget Upload Flow

The widget photo step should keep the existing product limits and state behavior:

- Maximum 3 images.
- Maximum 10 MB each.
- Local `blob:` preview while upload is pending.
- In-flight success ignored if the shopper removed that preview before upload completed.
- Submit disabled while image uploads are pending.
- Preview mode remains local-only.

AWS-specific browser sequence:

1. Validate count, size, and exact MIME allowlist before signing.
2. Compute base64 SHA-256 for the file bytes.
3. Call `/api/public/upload/sign` with file metadata and checksum.
4. Create `FormData`.
5. Append every returned S3 `fields` entry first.
6. Append the `file` field last. AWS documents that POST Object requires the file field to be last and only uploads one file per request.
7. POST the form to `uploadUrl`.
8. Treat only a successful S3 `204` as upload success.
9. Call `/api/public/upload/register` with the returned `assetId`, `uploadSessionId`, `objectKey`, expected size/type/checksum, and provider `aws_s3`.
10. Store an uploaded media reference in widget state. Do not store a public CloudFront URL for the original.

The widget must stop treating an image upload as a trusted public URL after the AWS cutover. Review submit should receive additive uploaded-image references, not raw Cloudinary-style URLs. The exact submit payload belongs to the schema/public API contract, but the upload contract requires it to identify images by server-generated upload refs (`assetId` and `uploadSessionId`) rather than by client-selected URLs.

### Register Validation

`/api/public/upload/register` must be server-authoritative. It must not trust a URL, object key, content type, size, checksum, or metadata only because the client sent it.

Register request body:

```json
{
  "storeId": "<public-store-id>",
  "provider": "aws_s3",
  "assetId": "<asset-id-from-sign>",
  "uploadSessionId": "<upload-session-id-from-sign>",
  "objectKey": "review-images/v1/private/stores/<storeId>/assets/<assetId>/original.jpg",
  "contentType": "image/jpeg",
  "bytes": 123456,
  "checksumAlgorithm": "SHA256",
  "checksumSha256": "<base64-sha256>"
}
```

Register must:

- Rate-limit by IP at least as strictly as today.
- Verify `storeId` and `StoreSettings`.
- Load the upload intent by `uploadSessionId` and/or `assetId`.
- Verify the intent is unexpired, unconsumed, same store, same provider, same private object key, same expected byte size, same expected content type, same expected checksum, and still in an upload-intent/pending state.
- Reject keys outside `review-images/v1/private/stores/<storeId>/assets/<assetId>/`.
- Call S3 `HeadObject` for the private original key with checksum mode enabled, because AWS documents that checksum retrieval requires `ChecksumMode=ENABLED`.
- Validate `ContentLength`, `ContentType`, `ChecksumSHA256`, version id when versioning is enabled, and user metadata values such as `store-id`, `asset-id`, and `upload-session-id`.
- Call `GetObjectTagging` or otherwise verify the expected pending/provider tags if the SDK path does not include tags in `HeadObject`.
- Mark the `PendingReviewImage` row as uploaded/staged only after S3 validation passes.
- Return a stable media reference, not a public URL.

Register response body:

```json
{
  "ok": true,
  "imageRef": {
    "provider": "aws_s3",
    "assetId": "<asset-id>",
    "uploadSessionId": "<upload-session-id>",
    "objectKey": "review-images/v1/private/stores/<storeId>/assets/<assetId>/original.jpg",
    "bytes": 123456,
    "contentType": "image/jpeg",
    "checksumAlgorithm": "SHA256",
    "checksumSha256": "<base64-sha256>"
  }
}
```

Width, height, final format, EXIF stripping, generated variants, thumbnail URL, and public CloudFront URL readiness are not proven by upload/register alone. They belong to the variant/metadata contract and must be validated before an image is public-ready.

### Submit Boundary

The AWS upload contract deliberately separates upload success from public readiness:

- Upload/register proves a private original exists in S3 and belongs to the current store/upload intent.
- Review submit attaches uploaded image refs to a review transaction and consumes matching pending rows.
- Variant generation/metadata validation decides when `ReviewMedia.processingStatus = "ready"` and `visible` can become true.
- Storefront APIs must not serve private original keys or unready variants.

For this pre-public clean cutover, AWS uploaded-image refs are the target review-submit path. `/api/public/reviews` may accept legacy Cloudinary `images` URLs only as a time-boxed rollback/old-widget compatibility guard while Cloudinary credentials are intentionally kept for the pre-acceptance rollback window. This is not a permanent dual-provider contract. After Cloudinary teardown, AWS refs are the only supported review-image submit path.

### Upload Test Requirements

Before implementation is considered ready, tests must cover:

- Sign rejects unknown store, disallowed MIME type, missing/invalid checksum, zero bytes, over 10 MB, and unsafe extensions.
- Sign creates a server-generated key that ignores the original filename and is scoped to store plus asset id.
- The POST policy includes exact key, exact `Content-Type`, checksum fields, `content-length-range`, metadata, tags, short expiration, and no ACL.
- Widget appends S3 POST fields before appending the file last.
- Register rejects missing intent, cross-store intent, expired intent, key mismatch, size mismatch, content-type mismatch, checksum mismatch, missing S3 object, and wrong object metadata/tags.
- Register is idempotent for the same uploaded object but does not extend the pending cleanup TTL.
- Submit cannot attach an AWS image ref that was not registered/staged for the same store.
- Signed URL and POST fields are not logged in errors, audit rows, analytics events, or test snapshots.

## Security And Leakage Requirements

Review images are user-generated content, and an AWS presigned upload URL must be treated as a sensitive bearer URL. The migration must prevent credential leaks, cross-tenant object registration, public-bucket exposure, unbounded upload cost, and accidental exposure of unapproved media.

### Operational Approval Guardrail

This ADR does not loosen `AGENTS.md`. It inherits the project rule that irreversible or destructive actions must stop first, state the exact command or provider action, explain why it is risky, and wait for explicit chat approval before execution. Read-only discovery is allowed; mutation is not.

For this migration, the approval gate applies at minimum to CloudFormation stack create/update/delete, S3 bucket/policy/CORS/lifecycle/public-access changes, CloudFront distribution/OAC/cache-policy changes, IAM policy/group/permission-set/pass-role changes, Vercel env/deploy changes, Prisma/DB schema or data writes, Cloudinary asset deletion, AWS object deletion, cleanup hard-delete jobs, provider teardown, and git push/force/reset operations.

Before any such action, the implementation plan must state scope, risk, rollback path, and post-change verification. For DB changes, use additive schema changes unless an expand/contract sequence is explicitly planned; never use `prisma db push` against production. For secrets and credentials, do not print, log, document, or commit real values in wiki, tests, scripts, terminal output, or provider audit payloads.

### Upload And Presigned URL Safety

The browser must never receive AWS access keys, long-lived credentials, or provider-admin credentials. The current Cloudinary upload flow returns a Cloudinary `api_key`, signed parameters, and a Cloudinary upload target; the AWS flow must instead return a server-created upload intent for one exact object key. AWS documents that a presigned URL can upload a specific object without giving the browser AWS credentials, but also warns that presigned URLs are bearer-token style capabilities and can be reused until they expire: [S3 presigned URLs](https://docs.aws.amazon.com/AmazonS3/latest/userguide/using-presigned-url.html).

AWS upload intents must therefore be short-lived, method-scoped, single-object, and tied to a server-generated key. The client should not choose bucket, prefix, tenant scope, or final key name. File name, MIME type, size, checksum, extension, and max-count rules must be validated before signing where possible and verified after upload before registration. The presign response, AWS authorization headers, and any signed query string must not be written to app logs, audit rows, analytics events, or client-visible error messages.

The existing sign/register endpoints already rate-limit by IP. AWS migration must keep or strengthen rate limits, because storage and transformation work become direct account cost. Register must not trust a client-supplied URL alone; it must validate the upload intent, store scope, expected key, object existence, object size, content type, checksum/ETag where useful, and required metadata/variant readiness before creating or committing `PendingReviewImage` / `ReviewMedia`.

### Bucket And CloudFront Access

The S3 bucket must remain private. Keep S3 Block Public Access enabled, keep ACLs disabled through Bucket Owner Enforced ownership, and do not add a public bucket policy. Public storefront delivery should happen through CloudFront with Origin Access Control, with the S3 bucket policy granting only the CloudFront service principal scoped to the intended distribution and read-only public/variant prefixes. AWS recommends Origin Access Control for S3 origins and documents a bucket-policy grant to the CloudFront service principal for this pattern: [Restrict access to an S3 origin](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-s3.html).

S3 transport must be HTTPS-only through a `DenyInsecureTransport` bucket policy. Default server-side encryption should remain enabled, and SSE-C should remain disabled unless a separate requirement explicitly justifies it. CORS must be method/header scoped to browser upload. Because the current widget runs on unknown merchant storefront origins, the MVP direct-upload CORS origin and headers are wildcarded for non-credentialed `POST` only until the product has a verified per-merchant origin allowlist; this must be compensated by short-lived presigned URLs, strict key generation, rate limits, and post-upload validation. AWS documents that S3 CORS rules match origin, method, and requested headers, and that ACLs and policies still apply after CORS is enabled; CORS is not an authorization replacement: [S3 CORS](https://docs.aws.amazon.com/AmazonS3/latest/userguide/cors.html), [S3 security best practices](https://docs.aws.amazon.com/AmazonS3/latest/userguide/security-best-practices.html).

CloudFront S3 read access must remain narrower than the whole review-image prefix. The bucket policy may allow the CloudFront distribution to read `review-images/v1/public/*` and private admin-preview variants under `review-images/v1/private/stores/*/assets/*/variants/*`; it must not allow CloudFront to read private originals such as `review-images/v1/private/stores/<storeId>/assets/<assetId>/original.<ext>`.

Public variant revocation is a provider-side takedown path. Revoke/delete jobs must remove the exact S3 public variant keys and create CloudFront invalidations for those exact public paths when the family may have been public. Pending-upload cleanup can skip invalidation because those families should never have been publicly exposed.

### Tenant Isolation

`storeId` / `PUBLIC_API_KEY` is visible to storefront code and is not a secret. It is useful for scoping, but it is not sufficient as an object secret. AWS object keys must include store scope plus an unguessable upload session or generated asset ID. Register, submit, cleanup, and public formatting must verify that an object belongs to the same store/product/upload session before accepting it. User-provided filenames must not be used as public keys, and object keys/metadata must not contain emails, names, tokens, raw request IDs, or other private data.

### Public Versus Admin Visibility

The current Cloudinary implementation stores public image URLs; unapproved or rejected images may still be accessible if the URL is known. AWS migration is an opportunity to make this boundary explicit. Storefront public APIs must continue returning only approved, visible, ready media. The admin panel must decide whether pending/rejected images use the same CloudFront public variant URLs or a separate authenticated/signed admin preview path. If admin-only preview is chosen, those URLs must be short-lived, not cached as public storefront assets, and not leaked into widget/public API responses.

### Content And Privacy Controls

The AWS provider must reject active-content formats such as SVG/HTML and must validate MIME type, extension, magic bytes or image decode, maximum bytes, maximum pixel dimensions, and allowed formats before an image becomes ready. Variant generation should strip EXIF/GPS and user-supplied metadata. Public variants should be served with safe content types, `nosniff` response headers, immutable cache headers for versioned keys, and no exposure of original filenames. Originals should not be used for thumbnails or storefront previews unless a deliberate fallback policy is approved and measured.

### IAM And Runtime Separation

Infrastructure deployment permissions and runtime application permissions must stay separate. The app/runtime identity should not have CloudFormation lifecycle permissions, broad `s3:*`, broad `iam:*`, unrestricted `iam:PassRole`, or administrator policies. Runtime needs only the exact S3 actions and prefixes required to create upload intents, validate objects, write/read generated variants if that work is in-app, and delete known object families through cleanup. AWS IAM guidance warns that `iam:PassRole` grants should be scoped to specific role ARNs and optionally constrained by the service that receives the role; this matters if CloudFormation, Lambda, ECS, or image-processing infrastructure is added later: [Grant permissions to pass a role](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_passrole.html).

Provider deletes must remain job/adapter owned. UI routes should not gain arbitrary object-delete capability. Cleanup jobs should receive server-generated asset family identifiers or deterministic key prefixes, not raw user-supplied paths.

### Observability And Audit

Keep app-level audit rows through `MediaProviderJob`, `MediaCleanupRun`, and quarantine tables, but do not store signed URLs or secrets in those rows. Store only provider, action, stable asset key/prefix, status, counts, and sanitized error codes. At the AWS layer, enable an audit approach before production cutover: S3/CloudFront access logging or equivalent, CloudTrail visibility for object mutations where cost-acceptable, and alerts for bucket policy, ACL, public-access, CORS, and lifecycle changes. AWS S3 security best practices call out CloudWatch metrics, server access logging, CloudTrail, and AWS Config as monitoring/auditing controls: [S3 monitoring and auditing best practices](https://docs.aws.amazon.com/AmazonS3/latest/userguide/security-best-practices.html#s3-monitoring-and-auditing-best-practices).

### Cleanup And Safe Deletion

Cleanup must address the whole object family: original plus every generated variant. Keys should be deterministic enough that pending cleanup, orphan cleanup, and review delete follow the same asset family without scanning unrelated tenant prefixes. Keep the current safety model: TTL for pending uploads, quarantine/grace before orphan sweep, empty-used-set breaker, orphan-ratio breaker, max-delete breaker, and run evidence. Do not add bucket-wide deletes or list/delete loops that are not constrained to the review-image prefixes and provider-owned key policy.

## Target Rollout And Rollback Contract

This closes planning item 7. Because Renuvex Product Reviews is still pre-public/test, the correct migration strategy is an AWS-only clean cutover, not a long-running Cloudinary/AWS dual-provider product mode.

Verified current rollout facts on 2026-07-03:

- Vercel MCP can read the `Renuvex` team and `renuvex-product-reviews` project. Production alias `app.renuvex.app` points to deployment `dpl_DNFyzg4ZXYJqtTeiZ8zzWKrWfrnm` from commit `20b382b02ccb68b247f494a8d2b191c5ea272990` (`docs(wiki): refresh live deployment status`).
- Vercel CLI works when scoped to the `renuvex` team. The previous CLI failure was a user/scope mismatch, not proof that Vercel is unavailable.
- Vercel env keeps the Cloudinary image keys (`NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`) for rollback. The AWS review-image runtime keys are present in production only, but `REVIEW_IMAGE_PROVIDER=aws_s3` is not set yet.
- Vercel runtime errors show only a Node `url.parse()` deprecation warning in the checked window. It is a technical debt item, not an AWS image migration blocker.
- The Cloudflare Worker remains widget asset/read-cache infrastructure. It does not own upload/register/review writes or cleanup. Those paths remain on the Vercel backend.
- `scripts/build-widget.mjs` keeps old content-hashed widget runtime/chunk files for `RUNTIME_RETENTION_DAYS = 7`, and the Worker asset preparation copies tracked old runtime assets. A deployed widget change can therefore overlap with old cached/open storefront runtimes for a short period.

Decision:

- Build and test the AWS review-image path as the only intended production path for new review images.
- Do not copy current Cloudinary test assets or DB rows to AWS.
- Do not design permanent dual-read, permanent dual-write, or permanent mirrored storage for this pre-public migration.
- Keep any Cloudinary compatibility only as a temporary rollback guard until the AWS cutover passes acceptance tests. Compatibility must be isolated and removed during Cloudinary teardown.
- Do not expose Cloudinary fields from the AWS upload contract after cutover. The widget must stop depending on `cloud_name`, `api_key`, `timestamp`, `signature`, `folder`, Cloudinary upload URLs, or Cloudinary transformation URLs.
- Add AWS env and infrastructure only through an explicitly approved mutation step. Env values must never be printed or documented.
- Deploy backend/admin/API and widget runtime as one coordinated cutover because upload/register behavior lives on Vercel while storefront upload code ships in the Cloudflare-served widget runtime.

Implementation order for the migration plan:

1. Add AWS infrastructure templates and runtime configuration definitions in code/docs without applying provider mutations.
2. Add additive DB schema fields only; do not drop or rename Cloudinary-era fields in the first migration.
3. Implement the AWS provider boundary, upload intent/register flow, variant generation, public/admin rendering, metadata, cleanup, and tests behind the new contract.
4. Update widget upload/render code to consume AWS upload/register and `variants` data.
5. Run local and preview acceptance checks without Cloudinary teardown.
6. After explicit approval, apply AWS infrastructure/env changes, deploy Vercel backend, build/deploy Cloudflare widget assets, and verify live upload/register/render/cleanup behavior.
7. Keep Cloudinary credentials and account access untouched until AWS acceptance passes. This keeps the old Vercel deployment and old Worker version usable if rollback is needed.
8. After acceptance, perform a separate approved Cloudinary teardown: remove Cloudinary env keys, SDK dependency, build constants, Next/Image Cloudinary remote pattern, Cloudinary-specific tests/scripts/cleanup paths, and remaining test data cleanup if desired.

Rollback gates:

- Pre-acceptance rollback may return to the previous Vercel production deployment and previous Cloudflare Worker/widget version while Cloudinary env and account access still exist. This is a controlled safety net, not a product requirement to keep Cloudinary.
- Do not invalidate, rotate away, or delete Cloudinary credentials before the pre-acceptance rollback window is closed. Vercel documents that old deployments keep using the environment available to that deployment and that env changes require redeploys; invalidating a third-party credential can break rollback candidates even if the deployment itself is restored: [Vercel rollback](https://vercel.com/docs/instant-rollback), [Vercel environment variables](https://vercel.com/docs/environment-variables/managing-environment-variables), [Vercel rotating secrets](https://vercel.com/docs/environment-variables/rotating-secrets).
- Cloudflare Worker rollback restores a previous Worker version, but it does not roll back connected provider resources or bindings. AWS resources, Vercel env, Cloudinary credentials, DB schema/data, and Cloudinary/AWS assets must therefore have their own rollback or forward-fix plan: [Cloudflare Worker rollbacks](https://developers.cloudflare.com/workers/configuration/versions-and-deployments/rollbacks/).
- Post-acceptance teardown intentionally closes Cloudinary rollback. After Cloudinary env/dependency/cleanup paths are removed, rollback target is the AWS-only architecture through forward-fix, AWS config revert, CloudFormation change set rollback/update, or a new Vercel/Worker deploy.
- Rollback must never delete AWS or Cloudinary assets blindly. Cleanup remains controlled by the DB-aware cleanup contract, provider jobs, quarantine, and explicit approval gates.

Cloudinary teardown gates:

- All AWS image acceptance tests pass locally and in the approved live cutover verification.
- New image upload/register/review submit works from the storefront widget without Cloudinary fields or endpoints.
- Public API returns AWS render-ready URLs/variants and hides pending/rejected/unready images.
- Admin can preview pending/rejected AWS images through authenticated signed preview paths.
- Pending cleanup, review-delete cleanup, and orphan fallback cleanup work on the AWS object family.
- Product summaries, filters, `hasMedia`, gallery, lightbox, and widget lazy hydration behave correctly with AWS image media.
- The Cloudflare Worker still serves widget static assets and cacheable read paths without gaining destructive AWS permissions.
- Vercel env no longer needs Cloudinary keys after teardown; AWS image env exists only in the approved environments.
- The project has an explicit rollback note that Cloudinary rollback is closed after teardown.

## Target Acceptance Criteria

This closes planning item 8. Acceptance is a staged, evidence-backed gate for the AWS review-image migration. No deploy, provider mutation, env write, DB write, Cloudflare/Vercel change, Cloudinary teardown, or destructive cleanup is acceptable only because one test is green. The migration is accepted only when the source, tests, wiki, provider configuration, and live behavior agree.

Evidence behind these criteria:

- The current source has Cloudinary in upload sign/register routes, public submit/read formatting, admin image rendering, cleanup jobs, metadata backfills, widget photo upload, widget media trust, Next image configuration, scripts, CI workflow env, and tests.
- AWS presigned uploads are bearer-style, time-limited credentials scoped by the signing principal. AWS documents that SigV4 presigned uploads can include checksum headers and that presigned URLs can be reused until expiration, so the app must bind uploads to a server-side intent and verify the final S3 object before register/submit: [S3 presigned URLs](https://docs.aws.amazon.com/AmazonS3/latest/userguide/using-presigned-url.html).
- S3 POST upload accepts policy-constrained form fields; the file field must be last, only one file is uploaded per POST, and successful POST status can be `200`, `201`, or `204`: [S3 POST Object](https://docs.aws.amazon.com/AmazonS3/latest/developerguide/RESTObjectPOST.html).
- S3 stores and validates checksum values for uploads, and `HeadObject` can return checksum metadata. The register path must verify S3 object metadata server-side instead of trusting browser-provided URLs or metadata: [S3 upload integrity](https://docs.aws.amazon.com/AmazonS3/latest/userguide/checking-object-integrity-upload.html), [HeadObject](https://docs.aws.amazon.com/AmazonS3/latest/API/API_HeadObject.html).
- S3 Lifecycle supports prefix/tag filters and is asynchronous provider cleanup. It can be a backstop, but it cannot update `PendingReviewImage`, `MediaProviderJob`, `OrphanImageQuarantine`, or `MediaCleanupRun`: [S3 Lifecycle examples](https://docs.aws.amazon.com/AmazonS3/latest/userguide/lifecycle-configuration-examples.html).
- S3 object tags are limited metadata useful for lifecycle, IAM, and cost allocation; POST/PUT can set tags, and lifecycle can filter by tags: [S3 object tagging](https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-tagging.html).
- CloudFront signed URLs are the correct model for private admin previews because CloudFront verifies the signature, policy, and expiration before serving the object. AWS recommends trusted key groups for signed URL verification: [CloudFront signed URLs](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-signed-urls.html).
- CloudFront OAC is the current S3-origin access model. It secures S3 origins, requires bucket-owner-enforced object ownership for S3 origins, and should use "always sign requests" for S3 origin access: [CloudFront OAC for S3](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-s3.html).
- S3 security best practices require non-public buckets unless public access is explicitly required, Block Public Access, careful wildcard-policy review, monitoring/auditing, and CloudTrail/Config/GuardDuty-style visibility where appropriate: [S3 security best practices](https://docs.aws.amazon.com/AmazonS3/latest/userguide/security-best-practices.html).
- Next/Image remote patterns match protocol, hostname, port, pathname, and search exactly; broad or omitted `search` can unintentionally allow optimizer abuse. Admin image rendering must either use a precise AWS public-preview host/path policy or avoid Next/Image for signed private query URLs: [Next Image remote patterns](https://nextjs.org/docs/app/api-reference/components/image#remotepatterns), [Next unconfigured host](https://nextjs.org/docs/messages/next-image-unconfigured-host).
- Vercel env changes only apply to new deployments, so cutover/rollback cannot assume an old deployment will pick up new AWS or removed Cloudinary env automatically: [Vercel environment variables](https://vercel.com/docs/environment-variables).
- Vercel Cron invokes production deployment paths and can include `Authorization: Bearer <CRON_SECRET>`, matching the current cron route pattern. Cleanup acceptance must verify the production cron paths remain authenticated: [Vercel Cron Jobs](https://vercel.com/docs/cron-jobs), [Managing Cron Jobs](https://vercel.com/docs/cron-jobs/manage-cron-jobs).
- Cloudflare Worker rollback changes the active Worker version but does not roll back connected resources or bindings. The Worker must remain widget static/read-cache infrastructure, not the owner of AWS image mutations: [Cloudflare Worker rollbacks](https://developers.cloudflare.com/workers/configuration/versions-and-deployments/rollbacks/), [Workers static assets binding](https://developers.cloudflare.com/workers/static-assets/binding/).
- At large scale, S3 Metadata, S3 Inventory, Storage Lens, and Batch Operations can support audit, inventory, cost analysis, and bulk repair. They are operational tools, not storefront hot-path dependencies and not required to make the MVP cleanup source of truth: [S3 Metadata](https://docs.aws.amazon.com/AmazonS3/latest/userguide/metadata-tables-overview.html), [S3 Inventory](https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-inventory.html), [S3 Storage Lens](https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage_lens_basics_metrics_recommendations.html), [S3 Batch Operations](https://docs.aws.amazon.com/AmazonS3/latest/userguide/batch-ops.html).

### Source And Configuration Gate

- `package.json` must no longer require Cloudinary for the production image path. If the implementation uses Sharp, `sharp` must be a direct pinned dependency, not only a transitive dependency through Next.js or Wrangler.
- `next.config.js` must remove Cloudinary build constants and remote patterns after teardown. Before teardown, any compatibility must be isolated and documented as rollback-only.
- AWS image env names must exist in `.env.example` or equivalent non-secret documentation with empty values only. Secrets must stay in `.env.local` / Vercel env and must never be printed in logs, tests, wiki, or snapshots.
- CI workflows must stop setting `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` for widget builds after cutover and must build/test against AWS-shaped fixtures.
- No browser bundle may contain AWS secret credentials, Cloudinary API secrets, private key material, S3 delete permissions, or provider admin tokens.
- `pnpm why sharp` or the equivalent dependency proof must show the image processor is owned directly by the app before variant generation code is accepted.

### Schema And Migration Gate

- The first Prisma migration must be additive only: nullable/defaulted fields, new indexes, or new tables. No drop, rename, narrowing, unique constraint on existing dirty data, or `NOT NULL` without safe default is allowed in the first migration.
- `ReviewMedia` and `PendingReviewImage` must carry enough lifecycle evidence to avoid S3/CloudFront probes on public reads: provider, stable object-family id, upload intent/session id, metadata status, processing status, variant status, variant timestamps, sanitized error code, and compact `variantManifest`.
- Public reads must require `Review.status = "approved"`, `ReviewMedia.visible = true`, `ReviewMedia.processingStatus = "ready"`, and `ReviewMedia.variantStatus = "public_ready"` for AWS image rows.
- Old Cloudinary-era fields may remain through the cutover for additive safety, but AWS-backed code must not rely on `Review.images` as source of truth. `Review.images` is compatibility-only and must contain render-ready public fallback URLs if populated.
- Migration tests must prove old deployment overlap safety: existing code tolerates additive fields, and new code tolerates existing Cloudinary test rows until teardown closes rollback.

### Upload, Register, And Submit Gate

- `/api/public/upload/sign` must require a valid store, existing `StoreSettings`, expected MIME type, byte size, client checksum, and image count/rate-limit context before issuing an AWS upload contract.
- The sign endpoint must create or reserve a server-side upload intent before returning S3 upload fields. This intent must include store id, asset id, upload session id, expected object key, expected size/type/checksum, TTL, and pending state.
- The returned S3 POST or PUT contract must scope the exact object key, content type, checksum, metadata/tags, expiration, and size limit. It must not allow `public-read`, arbitrary keys, arbitrary metadata, or multi-file uploads.
- Widget upload must compute the expected checksum before sign, append all S3 POST fields before the `file` field if POST is used, accept only the configured success status, preserve local `blob:` preview behavior, ignore success after the user removed an in-flight image, and keep submit disabled while uploads or register are pending.
- `/api/public/upload/register` must be server-authoritative. It must verify upload intent, store scope, key, object existence, content length, content type, checksum, metadata/tags, and idempotency with S3 APIs before marking the pending image uploaded/staged.
- Register success must not extend the original pending TTL in a way that lets abandoned uploads live forever.
- Register must not accept a public URL as proof of ownership. The client may send `assetId` / `uploadSessionId` / object key as references, but the server must validate them against the reserved intent and S3 state.
- `/api/public/reviews` submit must attach only same-store, staged AWS image references. It must reject cross-store references, expired sessions, missing variants, unready variant status, duplicate refs, more than 3 images, and photo+video combinations.
- Auto-approved image reviews must not become publicly readable until public variants are published and verified.

### Variant And Metadata Gate

- Variant generation must produce the finite MVP set required by the current storefront contract: 200, 300, 400, 600, and 1200 px equivalents, plus a `thumbnailUrl` compatibility fallback.
- The implementation must strip EXIF/metadata, normalize orientation, output sRGB, avoid upscaling, sanitize/ignore original filenames, reject unsupported/ambiguous formats, and record width, height, format, MIME type, bytes, and processor evidence.
- The public API must return provider-neutral image media with `url`, `thumbnailUrl`, and `variants` / `srcset` data. `variants` must contain stable public CloudFront URLs only, never signed URLs, private S3 URLs, bucket names that expose private structure, upload intents, or provider admin metadata.
- Missing or failed variants must fail closed: public API excludes the media, admin shows a repairable state, and cleanup still knows the object family.
- The widget must consume `variants` first and only use `url` / `thumbnailUrl` as compatibility fallbacks. Thumbnail, gallery, rail, and lightbox tests must assert AWS variant selection and `srcset` behavior.
- Performance acceptance must prove thumbnails do not load original uploads and that CloudFront cache headers/versioned immutable keys are used for public variants.

### Public API And Storefront Gate

- Public review GET must return only approved reviews and only visible/ready/public-ready AWS image media.
- Public review formatting must reject untrusted hosts, private prefixes, signed preview URLs, cross-store object keys, path traversal, period-only segments, unexpected query strings, and non-AWS/non-Mux providers after teardown.
- Storefront widget media trust must be AWS-shaped and must remove Cloudinary-only trust as production logic after teardown.
- Product summary counts, `hasImages`, `hasMedia`, rating filters, gallery, list/card layouts, media gallery strip, lightbox, keyboard interactions, and focus restore must behave with AWS image media.
- The offline/partial-load Shadow DOM style gate and viewport-aware lazy hydration must continue to hide broken/unstyled widget content and avoid eager below-the-fold media work.
- Storefront hot-path reads must not call S3, CloudFront signing, Cloudinary, or provider APIs per image. They must render from DB-backed public API data.
- Browser/network smoke tests must prove new image upload/render does not call `api.cloudinary.com`, `res.cloudinary.com`, or Cloudinary transformation URLs after teardown.

### Admin And Moderation Gate

- Admin list must return enough image media state to render thumbnail, processing state, variant state, and moderation actions without leaking private originals.
- Approved image previews may use public CloudFront variants. Pending or rejected image previews must use authenticated admin API routes and short-lived signed CloudFront URLs or an equivalent private-preview mechanism.
- Admin image preview signed URLs must be `no-store` at the API response layer, short-lived, scoped to the merchant's own review media, and must not be stored in DB, Sentry, audit rows, or client state beyond the modal session.
- Admin image preview tests must mirror the current admin video preview contract: the UI must call a signed preview endpoint for private image states, reject unauthorized merchant access, and avoid raw private S3 URLs.
- Approving a pending AWS image review must publish/copy required public variants, verify them, set `variantStatus = "public_ready"`, and then update `ReviewMedia.visible`.
- Rejecting or unapproving a review must hide media immediately in DB and revoke/delete public variants best-effort according to the cleanup contract without deleting private evidence needed for admin/support until cleanup policy says so.
- Deleting a review must enqueue AWS image object-family cleanup for all AWS image media owned by that review, while preserving Mux video cleanup behavior.

### Cleanup, Orphan, And Cost Gate

- Daily pending cleanup must keep the current 24-hour `PendingReviewImage` TTL semantics and queue AWS cleanup jobs for original plus private variants plus any mistakenly published variants in the same object family.
- Cleanup jobs must delete DB rows only after provider cleanup succeeds or after the object family is proven absent/idempotently gone.
- Cleanup payloads must be server-derived from DB object-family ids, not raw client-provided object keys.
- Orphan cleanup must remain two-phase mark/sweep with age guard, quarantine grace, G1 empty-used-set breaker, G2 orphan-ratio breaker, G3 max-delete breaker, and run evidence.
- AWS orphan used-set must come from DB `ReviewMedia` and unexpired `PendingReviewImage` grouped by store id plus provider asset id. Rejected/pending review media rows still count as used until the review/delete lifecycle makes them eligible for cleanup.
- S3 Lifecycle with `renuvex-state=pending` or equivalent tags may expire forgotten pending objects as a provider backstop, but lifecycle cannot be the source of truth because it does not update DB rows or audit tables.
- Large-scale inventory/audit may use S3 Metadata, S3 Inventory, Storage Lens, or Batch Operations in a separate ops document, but the MVP cleanup acceptance must pass without broad bucket scans in request paths.
- Cleanup tests must cover object-family deletion, variant deletion, missing-object idempotency, partial-delete retry, quarantine release when an asset becomes used again, and no bucket/store-wide delete commands.

### Security, Privacy, And IAM Gate

- S3 buckets must keep Block Public Access, bucket-owner-enforced object ownership, encryption, HTTPS-only bucket policy, no public ACL dependency, and CloudFront OAC for public delivery.
- CloudFront public paths must be read-only. Browser upload must go directly to S3 through constrained presigned POST/PUT, not through a public writable CloudFront distribution.
- IAM must be least-privilege for sign/register/head/copy/delete/tag operations on review-image prefixes. Avoid `iam:PassRole` broad wildcards and avoid provider policies that can mutate unrelated AWS resources.
- If SSE-KMS is used, the register/checksum path must include the documented KMS permissions needed for checksum retrieval. If those permissions are not approved, choose SSE-S3 for the MVP.
- Upload CORS must allow only required storefront origins, methods, and headers. It must expose only needed response headers and must not make register trust browser-visible response headers.
- Logs, Sentry events, audit rows, tests, and wiki must never include AWS secret keys, CloudFront private keys, signed URL query strings, Cloudinary secrets, raw env values, or customer image object names derived from original filenames.
- Object keys must be deterministic, tenant-scoped, and path-safe. Reject or avoid `.` / `..` path segments, encoded slashes, backslashes, raw original filenames, and PII in keys.
- Rate limits must stay at least as strict as the current sign/register flow and should consider image transformation cost, not only request count.
- Cloudflare Worker must not gain AWS destructive credentials or provider delete ability. It remains widget asset/read-cache infrastructure only.

### Infrastructure, Env, And Rollout Gate

- AWS infrastructure must be represented in reviewable IaC before provider mutation. CloudFormation templates must pass syntax/schema validation, security/compliance review, and change-set review before any stack create/update.
- Stateful AWS resources such as buckets must use retain-style protection unless an explicitly approved teardown plan says otherwise.
- The cutover plan must list exact AWS, Vercel, Cloudflare, Supabase/Prisma, and Cloudinary mutation commands separately with scope, risk, rollback, and evidence commands.
- Vercel AWS env must exist in the target environments before the AWS image deployment, and env changes must be followed by a new deployment because Vercel does not apply env edits to previous deployments.
- Cloudinary env and account access must remain untouched until pre-acceptance rollback is closed.
- Cloudflare Worker deployment must be coordinated with widget runtime manifest changes and old-runtime retention. Rollback candidate Worker version and Vercel deployment id must be recorded before cutover.
- Live cutover verification must include one real widget image upload, register, submit, moderation path, public storefront render, admin image preview, and cleanup dry-run/targeted verification. Use test assets only unless the user approves real data actions.
- Cloudinary teardown is a separate approved mutation after AWS acceptance. It removes Cloudinary env/dependency/build constants/scripts/tests and closes rollback to Cloudinary by design.

### Required Test And Audit Commands

The implementation plan may add focused tests, but these gates must be represented before cutover:

- `pnpm test:unit`
- `pnpm test:widget-runtime`
- `pnpm test:widget-smoke`
- `pnpm test:widget-interactions`
- `pnpm test:widget-media`
- `pnpm test:admin-preview`
- `pnpm exec playwright test --config=playwright.media.config.ts tests/widget-media-cross-browser.spec.ts --project=chromium-desktop`
- `pnpm exec playwright test --config=playwright.media.config.ts tests/widget-media-cross-browser.spec.ts --project=pixel-android`
- `pnpm exec playwright test --config=playwright.media.config.ts tests/widget-media-cross-browser.spec.ts --project=iphone-webkit`
- `pnpm build:widget`
- `pnpm budget:widget`
- `pnpm check:widget-js`
- `pnpm exec tsc --noEmit`
- `pnpm lint`
- `node scripts/wiki-audit.mjs`
- CloudFormation validation/check-set commands for the final template, selected from the approved infrastructure plan.
- Read-only provider verification commands for AWS, Vercel, Cloudflare, and Supabase before and after the approved cutover. Secrets must be compared by presence/fingerprint only, never printed.

### Final Acceptance Definition

The AWS review-image migration is accepted only when all of the following are true:

- New storefront image uploads complete without Cloudinary fields, Cloudinary endpoints, or Cloudinary transformation URLs.
- Submitted image reviews create AWS-backed `ReviewMedia` and clear consumed pending upload rows atomically.
- Public storefront reads render only AWS public-ready variants and never expose private originals.
- Admin can safely preview approved, pending, and rejected image media without public leakage.
- Pending cleanup, review-delete cleanup, orphan cleanup, and lifecycle backstop each have tested, scoped, and auditable behavior.
- CI, local tests, and wiki agree on AWS as the review-image provider.
- Rollback before acceptance is documented and possible because Cloudinary has not been torn down.
- After separate approved teardown, no production image runtime path requires Cloudinary.

## Goals

- Move review image upload, delivery, metadata, cleanup, and test contracts away from Cloudinary.
- Use AWS as the production review-image provider for future production data.
- Keep the `ReviewImageProvider` boundary narrow and image-specific.
- Keep provider-specific code out of storefront hot-path rendering.
- Reuse existing provider-aware tables and outbox concepts where they fit.
- Keep Mux video behavior unchanged.
- Keep Cloudflare Worker widget asset delivery unchanged.
- Preserve a future path for production data migration through dual-read and verified cutover.
- Avoid permanent duplicate storage unless a separate durability requirement is approved.
- Keep the public API/widget image contract stable enough that future provider changes do not require storefront rewrites.

## Non-goals

- Do not copy current pre-public Cloudinary test assets to AWS.
- Do not delete Cloudinary assets, env vars, or account resources as part of ADR drafting.
- Do not change Mux video architecture.
- Do not change Cloudflare Worker widget delivery.
- Do not add new review/media product features during the provider migration.
- Do not introduce a broad multi-provider framework beyond the review image provider boundary.
- Do not keep Cloudinary and AWS as permanent mirrors by default.
- Do not add storefront provider discovery or per-image provider resolution calls.
- Do not make adapter abstraction a reason to support non-AWS providers now.

## Future Production Data Migration Rule

If real customer data exists before a future provider change, migration must be treated as a data migration, not only a code change. The required pattern is:

1. Add the new provider adapter without removing the old one.
2. Support dual-read during the migration window.
3. Send new uploads to the target provider.
4. Inventory source assets and map them to DB rows.
5. Copy assets in batches and verify bytes/checksum/metadata where available.
6. Update DB rows in reversible batches.
7. Keep the source provider for a time-boxed rollback window.
8. Remove the old provider only after live reads, cleanup, summaries, and rollback evidence are verified.

This is temporary migration safety, not a requirement to keep every image permanently backed up in two providers.

## Adapter Lifecycle

After public launch, the adapter boundary should stay if it remains a thin single-provider module. If AWS remains the only production provider and the boundary becomes a pass-through layer with no value, it may be simplified later, but only after verifying that provider assumptions will not spread back into upload routes, public reads, cleanup, metadata, widget rendering, scripts, and tests. Public API response shape and cleanup safety must remain stable even if the internal adapter is simplified.
