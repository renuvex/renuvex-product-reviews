---
type: maintenance
project: renuvex-product-reviews
status: active
created: 2026-06-29
updated: 2026-07-23
last_verified: 2026-07-23
confidence: high
tags:
  - aws
  - iam
  - identity-center
  - cli
  - cloudfront
  - s3
  - skills
related:
  - "[[AWS_CloudFront_Widget_Canary_Runbook]]"
  - "[[ADR_0034_AWS_Review_Image_Migration]]"
  - "[[Storefront_CDN_Performance_Benchmark]]"
  - "[[Deployment_Notes]]"
  - "[[Caching_And_Performance]]"
source_files:
  - "docs/wiki/04_Decisions/ADR_0034_AWS_Review_Image_Migration.md"
  - "infra/aws/widget-cdn-canary.cloudformation.json"
  - "infra/aws/widget-canary-operator-policy.example.json"
  - "infra/aws/review-images.cloudformation.json"
  - "infra/aws/media-observability.cloudformation.json"
  - "infra/aws/media-access-logs-bucket.cloudformation.json"
  - "infra/aws/media-access-logs-delivery.cloudformation.json"
  - "infra/aws/review-email-deployment-access.cloudformation.json"
  - "infra/aws/review-email-foundation.cloudformation.json"
  - "infra/aws/review-email-foundation.stack-policy.json"
  - "scripts/prepare-widget-aws-canary-assets.mjs"
  - "scripts/deploy-widget-aws-canary-assets.mjs"
  - "scripts/validate-widget-aws-canary-template.mjs"
  - "scripts/validate-review-images-aws-template.mjs"
  - "scripts/validate-media-observability-template.mjs"
  - "scripts/validate-media-access-logs-bucket-template.mjs"
  - "scripts/validate-media-access-logs-delivery-template.mjs"
  - "scripts/validate-review-email-deployment-access-template.mjs"
  - "scripts/verify-review-email-deployment-access-live.mjs"
  - "scripts/lib/review-email-cloudformation-contract.mjs"
  - "scripts/test-review-email-cloudformation-contract.mjs"
  - "scripts/simulate-review-email-deployment-access-policy.mjs"
  - "scripts/validate-review-email-aws-policies.mjs"
  - "scripts/create-review-email-access-hardening-change-set.mjs"
  - "scripts/verify-review-email-access-hardening-change-set.mjs"
  - "scripts/create-review-email-foundation-change-set.mjs"
  - "scripts/verify-review-email-foundation-change-set.mjs"
  - "scripts/set-review-email-foundation-execution-approval.mjs"
  - "scripts/execute-review-email-foundation-change-set.mjs"
  - "scripts/finalize-review-email-foundation-stack.mjs"
  - "scripts/verify-review-email-foundation-live.mjs"
  - ".agents/skills/aws-iam/SKILL.md"
  - ".agents/skills/aws-messaging-and-streaming/SKILL.md"
  - ".agents/skills/aws-serverless/SKILL.md"
  - ".agents/skills/creating-secrets-using-best-practices/SKILL.md"
  - ".agents/skills/securing-s3-buckets/SKILL.md"
  - ".agents/skills/routing-traffic-with-route53-and-cloudfront/SKILL.md"
---

# AWS Setup And Access

## Agent Brief
Use this page for AWS access, Identity Center profiles, review-image S3 and
CloudFront resources, runtime IAM, ACM/DNS history, cost guardrails, and AWS
skill/documentation sources. Current production AWS use is review-image storage
and delivery through private S3 plus CloudFront OAC on `media.renuvex.app`;
Cloudflare Worker remains the widget delivery path. Use `renuvex-readonly` for
audits by default. Any AWS stack, DNS, logging, alarm, S3 delete, invalidation,
or provider mutation still requires explicit scope, risk, rollback, and
approval before execution.

## Purpose

This page records the AWS access model used by this repository so future agents
do not re-create the same Identity Center, CLI, S3, CloudFront, and skill-source
decisions from memory.

AWS is currently used for review-image storage and delivery. The older widget
CDN canary remains documented for history, but production storefront widget
delivery stays on the Cloudflare Worker path.

## Verified Local Tooling

Verified on 2026-06-29:

```powershell
& 'C:\Program Files\Amazon\AWSCLIV2\aws.exe' --version
```

Expected baseline:

```text
aws-cli/2.35.11
```

Project baseline: AWS CLI v2, `2.35.0+`.

Do not depend on a default AWS profile for this project. Use named profiles so
the intended permission boundary is explicit:

```powershell
aws sts get-caller-identity --profile renuvex-readonly
aws sts get-caller-identity --profile renuvex-widget-canary
```

## Identity Model

Current AWS account:

| Field | Value |
|---|---|
| Account name | `renuvex` |
| Account ID | `989086371563` |
| Primary operating region | `eu-central-1` |

Profiles:

| Profile | Purpose |
|---|---|
| `renuvex-readonly` | Read-only evidence gathering and audits. |
| `renuvex-widget-canary` | Limited CloudFront/S3/CloudFormation operator for the widget CDN canary. |
| `renuvex-review-images` | Limited review-image AWS migration/operator profile. Use only for approved review-image infrastructure work; read-only checks are allowed. |
| `renuvex-review-email` | Live review-email operator profile. Its current live policy predates the pending author/operator split; foundation mutation remains blocked until the access stack is updated and re-verified. |
| `renuvex-review-email-author` | Planned change-set author profile. Source policy exists, but its permission set, group, assignment, and local profile are not live. |

The `AdministratorAccess` permission set exists for manual emergency or console
operations, but it is not the normal automation profile and should not be made
the default CLI profile.

The limited canary role is:

```text
arn:aws:iam::989086371563:role/aws-reserved/sso.amazonaws.com/eu-central-1/AWSReservedSSO_RenuvexWidgetCanaryOperator_18c9a9d7b13068e9
```

The review-image migration role is:

```text
arn:aws:iam::989086371563:role/aws-reserved/sso.amazonaws.com/eu-central-1/AWSReservedSSO_RenuvexReviewImageAccess_1c1689a6660b1865
```

The permission policy source of truth is
[infra/aws/widget-canary-operator-policy.example.json](../../../infra/aws/widget-canary-operator-policy.example.json).

## Current Canary Resources

Verified on 2026-06-29:

| Resource | Value |
|---|---|
| CloudFormation stack | `renuvex-widget-cdn-canary` |
| Stack status | `UPDATE_COMPLETE` |
| CloudFront distribution ID | `E2IGB2R73IV6SE` |
| CloudFront default hostname | `https://d34tylxlzkmua8.cloudfront.net` |
| S3 bucket | `renuvex-widget-canary-989086371563-eu-central-1` |
| Distribution status | `Deployed` |
| Uploaded object count | `446` |

The canary does not own `widget.renuvex.app`, `app.renuvex.app`, ikas script
records, Vercel env, Supabase, Mux, review-image provider accounts, or QStash.

## Review Image Migration Preflight

Verified on 2026-07-03 with read-only commands:

| Check | Result |
|---|---|
| `aws --version` | `aws-cli/2.35.11` |
| `renuvex-review-images` identity | Account `989086371563`, role `RenuvexReviewImageAccess`, region `eu-central-1` |
| Existing S3 buckets via `renuvex-readonly` | Only `renuvex-widget-canary-989086371563-eu-central-1` |
| Existing CloudFront distributions | Only canary distribution `E2IGB2R73IV6SE` |
| Existing CloudFormation stacks in `eu-central-1` | Only `renuvex-widget-cdn-canary` |
| Candidate review-image buckets | `renuvex-review-images-989086371563-eu-central-1` and `renuvex-review-images-prod-989086371563-eu-central-1` returned S3 `404` on `head-bucket` |
| ACM certificates in `us-east-1` | `media.renuvex.app` certificate is `ISSUED` after Cloudflare DNS validation |
| `media.renuvex.app` public DNS | Initially absent during preflight; later created and verified in the "Cloudflare final media DNS result" section below. |

The target review-image resource contract is recorded in [[ADR_0034_AWS_Review_Image_Migration]]. No AWS resource creation, DNS change, env write, deploy, provider deletion, or git push is approved by this preflight.

The review-image stack has not been executed. A 2026-07-03 create change set
attempt failed AWS early property validation because the S3 lifecycle rule used
an unsupported `Filter` property. After read-only `cloudformation:DescribeEvents`
was added, the validation path was confirmed as
`/Resources/ReviewImagesBucket/Properties/LifecycleConfiguration/Rules/2`. The
template now uses CloudFormation's supported `Prefix` plus `TagFilters` syntax.

The failed change set and its empty `REVIEW_IN_PROGRESS` placeholder stack were
deleted after explicit approval. A replacement change set was then created:

- Change set: `review-images-initial-fixed-20260703063044`.
- Initial status: `CREATE_COMPLETE`, `ExecutionStatus: AVAILABLE`.
- Validation events: `CREATE_CHANGESET` succeeded; no validation error events.
- Planned resources: S3 bucket, bucket policy, CloudFront cache policy,
  response headers policy, OAC, public key, key group, and distribution.
- The change set was explicitly executed and then rolled back. Current stack
  status is `ROLLBACK_COMPLETE`.
- Root cause: `ReviewImagesPreviewPublicKey`
  (`AWS::CloudFront::PublicKey`) failed with
  `Access denied for operation 'AWS::CloudFront::PublicKey'`.
- Cascade failures for the bucket, cache policy, response headers policy, and
  OAC were rollback side effects. The stack event listed the S3 bucket as
  `DELETE_SKIPPED`, but a post-rollback `head-bucket` returned S3 `404`, so the
  target bucket is not currently readable as an existing bucket through the
  `renuvex-review-images` profile.
- CloudTrail correlation was attempted in `eu-central-1` and `us-east-1`, but
  the role currently lacks `cloudtrail:LookupEvents`. This is not required for
  stack creation, but it limits deeper read-only failure correlation.
- Before retrying, the review-image operator permission set must include
  CloudFront public-key and key-group lifecycle actions used by the template:
  `cloudfront:CreatePublicKey`, `cloudfront:GetPublicKey`,
  `cloudfront:GetPublicKeyConfig`, `cloudfront:UpdatePublicKey`,
  `cloudfront:DeletePublicKey`, `cloudfront:ListPublicKeys`,
  `cloudfront:CreateKeyGroup`, `cloudfront:GetKeyGroup`,
  `cloudfront:GetKeyGroupConfig`, `cloudfront:UpdateKeyGroup`,
  `cloudfront:DeleteKeyGroup`, and `cloudfront:ListKeyGroups`.
- Because the stack is now `ROLLBACK_COMPLETE`, a retry requires an explicitly
  approved cleanup of the failed stack placeholder before creating a new change
  set.

After the CloudFront public-key/key-group permissions were added, the
`ROLLBACK_COMPLETE` placeholder stack was deleted after explicit approval and a
fresh create change set was opened:

- Change set: `review-images-initial-retry-20260703065740`.
- Change set ARN:
  `arn:aws:cloudformation:eu-central-1:989086371563:changeSet/review-images-initial-retry-20260703065740/b528f8f1-cd2e-475e-bb61-3c5b6683abd0`.
- Status: `CREATE_COMPLETE`, `ExecutionStatus: AVAILABLE`.
- Validation events: `CREATE_CHANGESET` succeeded; no validation error events.
- Planned resources: S3 bucket, bucket policy, CloudFront cache policy,
  response headers policy, OAC, public key, key group, and distribution.
- Current stack status is `REVIEW_IN_PROGRESS`; stack resource list is empty
  and the target bucket still returns S3 `404`, because the change set has not
  been executed yet.
- No Vercel env, DB, Cloudflare Worker/DNS, review-image provider account,
  provider activation, or production traffic changes were made in this retry
  step.

The retry change set was then executed after explicit approval and the stack
reached `CREATE_COMPLETE`.

Created stack outputs and resource ids:

- Bucket: `renuvex-review-images-prod-989086371563-eu-central-1`.
- Distribution id: `E1205OOLPZDB00`.
- Distribution domain: `d2vvn9hb97q5dv.cloudfront.net`.
- Preview key group id: `1ba37813-d720-41fd-a807-3b7a3abe4bbb`.
- Preview public key id: `K1MR82PBYWDEFH`.

Post-create read-only checks:

- S3 Public Access Block has all four controls enabled.
- S3 encryption is SSE-S3 (`AES256`), with SSE-C blocked.
- S3 versioning is enabled.
- S3 ownership controls are `BucketOwnerEnforced`.
- S3 CORS allows browser presigned `POST` uploads only, with `ETag` and
  `x-amz-checksum-sha256` exposed.
- S3 lifecycle has incomplete multipart abort after 1 day, noncurrent version
  expiration after 7 days, and pending private object expiration after 2 days
  for `review-images/v1/private/` objects tagged `renuvex_state=pending`.
- Bucket policy denies insecure transport and allows CloudFront service
  `s3:GetObject` only from distribution `E1205OOLPZDB00`, scoped to
  `reviews/*`, transitional `review-images/v1/public/*`, and private admin
  preview variant paths. It does not grant CloudFront read access to private
  originals.
- CloudFront OAC uses SigV4 with `SigningBehavior: always`.
- CloudFront cache policy forwards no viewer headers, cookies, or query strings
  to S3, and uses one-year immutable TTLs.
- CloudFront response headers include `nosniff`, HSTS, referrer policy, and
  frame denial.
- CloudFront default behavior is signed-key-group protected for private preview
  paths; the public review image behavior for `reviews/*` is not key-group
  protected and permits `GET`/`HEAD` only. The older
  `review-images/v1/public/*` behavior is transitional for pre-public test
  objects until the separate post-acceptance cleanup gate removes it.
- The review-image operator role now includes `s3:GetBucketPolicyStatus`; the
  bucket policy status was read successfully and reports `IsPublic=false`.
  The bucket policy and Public Access Block were also read and verified
  directly.
- No Vercel env, DB, Cloudflare Worker/DNS, review-image provider account,
  provider activation, or production traffic changes were made in this execute
  step.

ACM custom-domain certificate step:

- Certificate request was approved and created in `us-east-1`.
- Certificate ARN:
  `arn:aws:acm:us-east-1:989086371563:certificate/c4b05b95-3384-43b9-a0dc-518472fbc03e`.
- Domain: `media.renuvex.app`.
- Status: `PENDING_VALIDATION`.
- Type: `AMAZON_ISSUED`.
- Key algorithm: `RSA-2048`.
- In use by: empty; the certificate is not attached to CloudFront yet.
- DNS validation CNAME:
  - Name:
    `_e919e0e40f3d814f0810f6fa8fd87910.media.renuvex.app.`
  - Value:
    `_b93788e2f31d953784a45bf3926af915.jkddzztszm.acm-validations.aws.`
- No Cloudflare DNS, CloudFront alias, Vercel env, DB, review-image provider
  account, provider activation, or production traffic changes were made in this
  certificate request step.

ACM DNS validation result:

- The validation CNAME was added in Cloudflare DNS after approval.
- Public DNS resolvers `1.1.1.1` and `8.8.8.8` resolve
  `_e919e0e40f3d814f0810f6fa8fd87910.media.renuvex.app` to
  `_b93788e2f31d953784a45bf3926af915.jkddzztszm.acm-validations.aws`.
- ACM status is now `ISSUED`; domain validation status is `SUCCESS`.
- Issued at: `2026-07-03T13:06:44.215000+03:00`.
- In use by: empty; the certificate is still not attached to CloudFront.
- No CloudFront alias, media CNAME, Vercel env, DB, review-image provider
  account, provider activation, or production traffic changes were made in this
  validation step.

CloudFront custom-domain update change set:

- Change set was created after explicit approval but not executed.
- Change set: `review-images-custom-domain-20260703130911`.
- Change set ARN:
  `arn:aws:cloudformation:eu-central-1:989086371563:changeSet/review-images-custom-domain-20260703130911/310e4129-ec20-490e-877f-e26de796776f`.
- Status: `CREATE_COMPLETE`, `ExecutionStatus: AVAILABLE`.
- Parameters:
  - `MediaDomainName=media.renuvex.app`.
  - `AcmCertificateArn=arn:aws:acm:us-east-1:989086371563:certificate/c4b05b95-3384-43b9-a0dc-518472fbc03e`.
  - `BucketName` and `CloudFrontPublicKeyEncoded` keep the previous stack
    values.
- Planned change: `ReviewImagesDistribution`
  (`AWS::CloudFront::Distribution`) `Modify`, `Replacement=False`.
- Validation events: `CREATE_CHANGESET` succeeded; no validation error events.
- Current live stack is still `CREATE_COMPLETE` with `AcmCertificateArn=""`;
  live CloudFront distribution still has no aliases and still uses the default
  CloudFront certificate, because the change set has not been executed yet.
- No media CNAME, Vercel env, DB, review-image provider account, provider
  activation, or production traffic changes were made in this change-set step.

CloudFront custom-domain update execution:

- The custom-domain change set was executed after explicit approval.
- Stack status: `UPDATE_COMPLETE`.
- Failed CloudFormation events: none.
- CloudFront distribution `E1205OOLPZDB00` status: `Deployed`.
- CloudFront aliases now include `media.renuvex.app`.
- Viewer certificate now uses ACM certificate
  `arn:aws:acm:us-east-1:989086371563:certificate/c4b05b95-3384-43b9-a0dc-518472fbc03e`.
- CloudFront certificate config is `sni-only` with minimum protocol version
  `TLSv1.2_2021`; the distribution no longer uses the default CloudFront
  certificate for the configured alias.
- ACM certificate `InUseBy` now includes
  `arn:aws:cloudfront::989086371563:distribution/E1205OOLPZDB00`.
- Public DNS resolvers still do not have a `media.renuvex.app` CNAME to the
  distribution because the final Cloudflare media CNAME has not been created
  yet.
- No Vercel env, DB, review-image provider account, provider activation, or
  production traffic changes were made in this execution step.

Cloudflare final media DNS result:

- The final `media` CNAME was added in Cloudflare DNS after approval.
- Public resolver `1.1.1.1` resolves `media.renuvex.app` to
  `d2vvn9hb97q5dv.cloudfront.net`, and then to CloudFront edge A records.
- Public resolver `8.8.8.8` resolves the CNAME to
  `d2vvn9hb97q5dv.cloudfront.net`; A-record propagation may lag by resolver
  cache, but the CNAME target is correct.
- `https://media.renuvex.app/reviews/__healthcheck__` reaches
  CloudFront over TLS and returns expected `403 Forbidden` because no test
  object exists at that path.
- TLS SNI validation for `media.renuvex.app` is authorized. The presented
  certificate subject/SAN is `media.renuvex.app`, issued by Amazon RSA 2048 M01.
- No Vercel env, DB, review-image provider account, provider activation, or
  production traffic changes were made in this DNS verification step.

Runtime cutover preflight:

- Vercel CLI `50.28.0` is authenticated as `mert-copper`.
- Local project link points at Vercel project `renuvex-product-reviews` under
  team `renuvex`.
- Vercel project OIDC is enabled with team issuer mode.
- Latest production OIDC claims observed through Vercel project metadata:
  - `iss=https://oidc.vercel.com/renuvex`
  - `aud=https://vercel.com/renuvex`
  - `sub=owner:renuvex:project:renuvex-product-reviews:environment:production`
- Vercel production env now includes the eight AWS review-image runtime keys:
  `AWS_REVIEW_IMAGES_REGION`, `AWS_REVIEW_IMAGES_BUCKET`,
  `AWS_REVIEW_IMAGES_PUBLIC_BASE_URL`, `AWS_REVIEW_IMAGES_ROLE_ARN`,
  `AWS_REVIEW_IMAGES_OIDC_AUDIENCE`,
  `AWS_REVIEW_IMAGES_CLOUDFRONT_DISTRIBUTION_ID`,
  `AWS_REVIEW_IMAGES_CLOUDFRONT_KEY_PAIR_ID`, and
  `AWS_REVIEW_IMAGES_CLOUDFRONT_PRIVATE_KEY_B64`.
- The AWS review-image env keys are production-only; preview does not list them,
  which matches the production-only runtime IAM trust policy.
- 2026-07-04 cutover follow-up: Vercel production sets
  `REVIEW_IMAGE_PROVIDER=aws_s3`, the review-image runtime is AWS-only, and the
  production env list no longer contains legacy image-provider key names.
- Local `.env.local` no longer contains legacy image-provider key names. It may
  still omit production-only AWS review-image keys and `VERCEL_OIDC_TOKEN`.
- `prisma migrate deploy`, with `.env.local` loaded into the process without
  printing values, applied `20260703090000_add_aws_review_image_fields` after
  explicit approval. Follow-up `prisma migrate status` reports the database
  schema is up to date.
- Read-only catalog checks confirmed the new AWS review-image columns exist on
  `PendingReviewImage` and `ReviewMedia`, including nullable checksum/upload/
  variant evidence fields and non-null `variantStatus DEFAULT 'pending'`.
- Read-only `pg_indexes` checks confirmed the four provider/status indexes:
  `ReviewMedia_provider_storeId_providerAssetId_idx`,
  `ReviewMedia_provider_resourceType_variantStatus_createdAt_idx`,
  `PendingReviewImage_provider_storeId_providerAssetId_idx`, and
  `PendingReviewImage_provider_variantStatus_createdAt_idx`.
- `prisma validate`, with `.env.local` loaded, passes.
- The `renuvex-review-images` AWS profile can read STS identity and IAM OIDC
  state. `iam:ListOpenIDConnectProviders` currently returns no OIDC providers.
- The target Vercel OIDC provider
  `arn:aws:iam::989086371563:oidc-provider/oidc.vercel.com/renuvex`, target role
  `renuvex-review-images-vercel-runtime`, and target CloudFormation stack
  `renuvex-review-images-runtime-iam` do not exist yet.
- The next live mutation gate must create the runtime IAM/OIDC stack before
  Vercel env activation. Static AWS access keys are not the planned fallback.

Runtime IAM stack status:

- On 2026-07-03, change set
  `renuvex-review-images-runtime-iam-create-20260703` was created for stack
  `renuvex-review-images-runtime-iam` in `eu-central-1`.
- The change set was executed after explicit approval and the stack reached
  `CREATE_COMPLETE`.
- Created resources are exactly two:
  `ReviewImagesVercelRuntimeRole` (`AWS::IAM::Role`) and
  `VercelOidcProvider` (`AWS::IAM::OIDCProvider`).
- OIDC provider ARN:
  `arn:aws:iam::989086371563:oidc-provider/oidc.vercel.com/renuvex`.
- Runtime role ARN:
  `arn:aws:iam::989086371563:role/renuvex-review-images-vercel-runtime`.
- OIDC provider audiences are `https://vercel.com/renuvex` and
  `sts.amazonaws.com`.
- Runtime role trust policy allows only
  `sts:AssumeRoleWithWebIdentity` from the Vercel team OIDC provider with
  `aud=sts.amazonaws.com` and
  `sub=owner:renuvex:project:renuvex-product-reviews:environment:production`.
- Runtime inline policy simulator checks:
  - allowed: review-image private-prefix S3 object read/write/tag/delete,
    prefix-scoped `s3:ListBucket`, and `cloudfront:CreateInvalidation` only on
    distribution `E1205OOLPZDB00`.
  - denied: unrelated S3 object prefix, unrelated S3 list prefix, unrelated
    CloudFront distribution invalidation, `s3:PutBucketPolicy`,
    `cloudfront:UpdateDistribution`, `iam:PassRole`, and
    `cloudformation:CreateStack`.
- `iam:GetContextKeysForPrincipalPolicy` is not granted to the operator profile;
  this only blocked an extra read-only introspection command, not the runtime
  role verification.

Review-image local template contracts:

- S3 bucket remains private with Block Public Access, Bucket Owner Enforced
  ownership, SSE-S3, versioning, retain policies, lifecycle backstops, and
  HTTPS-only bucket policy.
- Browser direct upload CORS is `POST` only with wildcard origin/header for the
  MVP because merchant storefront origins are not yet enumerated. Authorization
  remains the presigned POST policy plus backend register validation, not CORS.
- CloudFront OAC uses `SigningBehavior: always`.
- CloudFront S3 read policy is scoped to public variants and private admin
  preview variants only. It must not grant CloudFront read access to private
  originals.
- Public variant revoke/delete paths require exact CloudFront invalidation for
  previously public variant paths. The runtime env therefore needs
  `AWS_REVIEW_IMAGES_CLOUDFRONT_DISTRIBUTION_ID` in addition to the bucket,
  region, OIDC role ARN, public base URL, and signed-preview key settings.
- The stack must output the bucket name, distribution id, distribution domain,
  preview key group id, and preview public key id. The private signing key is
  not a stack output and must never be written to the wiki.
- The runtime IAM stack lives separately at
  `infra/aws/review-images-runtime-iam.cloudformation.json`. It creates only the
  Vercel team-scoped OIDC provider and the
  `renuvex-review-images-vercel-runtime` role.
- The runtime role trust policy is production-only and exact-match:
  `iss=https://oidc.vercel.com/renuvex`,
  `aud=sts.amazonaws.com`, and
  `sub=owner:renuvex:project:renuvex-product-reviews:environment:production`.
  The OIDC provider also includes the default Vercel team audience
  `https://vercel.com/renuvex` for provider completeness, but the runtime role
  trust allows only the custom AWS audience. This follows the current Vercel AWS
  OIDC guide's custom-audience contract.
- Runtime permissions are limited to review-image private/public S3 object
  prefixes, prefix-scoped `s3:ListBucket`, and exact CloudFront invalidation for
  distribution `E1205OOLPZDB00`. The role must not include `iam:PassRole`,
  CloudFormation permissions, bucket policy/admin permissions, or CloudFront
  distribution lifecycle permissions.

Run this local guard before any approved review-image stack change set:

```powershell
pnpm aws:lint-templates
pnpm aws:review-images:validate-template
pnpm aws:review-images:validate-runtime-iam-template
```

## Public-Scale Cost And Observability Guardrails

Status snapshot on 2026-07-05:

- `renuvex-readonly` can verify billing and observability state; the narrower
  `renuvex-review-images` operator is not the right audit profile for billing
  and CloudWatch inventory.
- AWS Budget `Renuvex AWS Monthly Guardrail` exists, is healthy, and currently
  has a `10 USD` monthly limit. Cost Anomaly Detection monitor
  `Default-Services-Monitor` exists.
- Minimal media CloudWatch alarming is active in `us-east-1` through stack
  `renuvex-media-observability-prod`.
- S3 Storage Lens default account dashboard is active with free metrics.
- CloudFront standard logging is disabled for the media distribution
  `E1205OOLPZDB00` (`media.renuvex.app`) and the widget canary distribution.
- CloudTrail trails are not configured; only normal Event History is available.
- S3 server access logging and S3 Metadata are not configured for the review
  image bucket.

The image object multiplier is intentional but important for scale planning.
Each uploaded review-image asset keeps a private original plus 14 private
variants. Approved assets also publish 14 public variants. Therefore, at
`100,000,000` asset families:

| Approved share | Approximate S3 object count |
|---:|---:|
| 25% | 1.85B |
| 50% | 2.2B |
| 100% | 2.9B |

Public-launch guardrails and current status:

- Minimal CloudWatch alarm set for the media CloudFront distribution uses
  `us-east-1` because CloudFront global metrics are reported there. Start with
  `5xxErrorRate`; do not use high-resolution or custom metrics for this first
  set. Local IaC for this first alarm lives in
  `infra/aws/media-observability.cloudformation.json`.
  Alarm notifications use SNS with a customer managed KMS key, not
  `alias/aws/sns`, because CloudWatch service publishing to encrypted SNS topics
  needs an explicit KMS key policy for `cloudwatch.amazonaws.com`. Key rotation
  stays disabled by default because alarm messages do not carry secrets and KMS
  rotation can increase long-term cost.
- 2026-07-05: A create change set was prepared for stack
  `renuvex-media-observability-prod` in `us-east-1`
  (`media-observability-create-20260705-004613`). It is not executed. The
  change set contains `AWS::KMS::Key`, `AWS::KMS::Alias`, `AWS::SNS::Topic`,
  `AWS::SNS::TopicPolicy`, `AWS::SNS::Subscription`, and
  `AWS::CloudWatch::Alarm`. CloudFormation pre-deploy events showed the
  `renuvex-review-images` operator cannot run full validation for these
  resources yet: missing `sns:GetTopicAttributes`,
  `cloudwatch:DescribeAlarms`, and `kms:ListAliases`. Do not execute until the
  observability operator permissions are explicitly expanded and rechecked.
- 2026-07-08: The observability permissions were rechecked through read-only
  AWS CLI calls. `cloudwatch:DescribeAlarms`, `sns:ListTopics`, and
  `kms:ListAliases` now succeed through `renuvex-review-images`; exact
  not-yet-created resource probes return `NotFound` instead of `AccessDenied`.
  The 2026-07-05 change set keeps stale validation events and should not be used
  as current evidence. A fresh change set
  `media-observability-create-20260708-041420` was created and not executed.
  Status is `CREATE_COMPLETE`, `ExecutionStatus: AVAILABLE`; `describe-events`
  returns only `CREATE_CHANGESET` `IN_PROGRESS` and `SUCCEEDED` stack events,
  with no `VALIDATION_ERROR` events. Planned resources remain limited to
  `AWS::KMS::Key`, `AWS::KMS::Alias`, `AWS::SNS::Topic`,
  `AWS::SNS::TopicPolicy`, `AWS::SNS::Subscription`, and
  `AWS::CloudWatch::Alarm`. Stack status remains `REVIEW_IN_PROGRESS` until an
  explicitly approved execute gate.
- 2026-07-08: The fresh media observability change set was executed after
  explicit approval and stack `renuvex-media-observability-prod` reached
  `CREATE_COMPLETE`. Change set execution status is `EXECUTE_COMPLETE`.
  Created resources:
  - CloudWatch alarm: `renuvex-media-cloudfront-5xx-error-rate`.
  - SNS topic:
    `arn:aws:sns:us-east-1:989086371563:renuvex-media-observability-prod-notifications`.
  - KMS key:
    `arn:aws:kms:us-east-1:989086371563:key/fd4c140d-c85b-4e6e-a6e8-03fb21934ae0`.
  - KMS alias: `alias/renuvex-media-observability`.
  - Email subscription resource:
    `arn:aws:sns:us-east-1:989086371563:renuvex-media-observability-prod-notifications:1b306dc7-31e5-419f-94f3-6f16b885b2b9`.
  Post-checks: alarm state is `OK`, actions are enabled, alarm and OK actions
  both target the encrypted SNS topic, dimensions are `DistributionId=E1205OOLPZDB00`
  and `Region=Global`, threshold is `5xxErrorRate > 1%` for `5/5` one-minute
  periods, `TreatMissingData=notBreaching`, SNS topic uses the customer managed
  KMS key, KMS key is enabled and customer managed, KMS rotation is disabled by
  design, and the key policy allows `cloudwatch.amazonaws.com` only for
  `renuvex-media-cloudfront-*` alarms in account `989086371563`.
  The email subscription was confirmed on 2026-07-08; `list-subscriptions-by-topic`
  returns the subscription ARN instead of `PendingConfirmation`, so the SNS email
  delivery path is no longer blocked by subscription state. No alarm test via
  `SetAlarmState` was run because it is a separate provider mutation and needs
  explicit approval. The previous minor IAM gap is resolved: `cloudformation:ListChangeSets`
  now succeeds through `renuvex-review-images` for this stack.
- `TotalErrorRate` should not be created as a raw alarm during the test/low
  traffic phase. Live read-only checks showed `5xxErrorRate=0` while
  `TotalErrorRate` was frequently high because it includes 4xx responses and
  low-volume test requests. If needed after public traffic begins, implement it
  only as a gated warning alarm with request-volume guardrails.
- CloudFront standard logs for the media distribution only, delivered to an S3
  log bucket/prefix with a short `7` or `14` day lifecycle. Do not route logs to
  CloudWatch Logs, Firehose, or Parquet conversion unless a later incident or
  analytics requirement justifies the extra system and cost.
- 2026-07-08: CloudFront standard logging v2 is deployed for the media
  distribution. Bucket stack `renuvex-media-access-logs-bucket-prod` is
  `UPDATE_COMPLETE` in `eu-central-1` and owns bucket
  `renuvex-review-images-logs-prod-989086371563-euc1`; delivery stack
  `renuvex-media-access-logs-delivery-prod` is `CREATE_COMPLETE` in `us-east-1`
  and owns delivery `arn:aws:logs:us-east-1:989086371563:delivery:izOPizvP6vARqkaL`
  for distribution `E1205OOLPZDB00`. The selected fields intentionally exclude
  `cs-uri-query` and `cs(Cookie)` so signed admin preview query strings and
  cookies are not written to durable logs. During the first delivery post-check,
  AWS reported the effective S3 suffix as
  `AWSLogs/{account-id}/CloudFront/cloudfront/media/{DistributionId}/{yyyy}/{MM}/{dd}/{HH}/`;
  the lifecycle now targets `AWSLogs/989086371563/CloudFront/cloudfront/media/`
  with 14-day current and noncurrent expiration. The bucket policy allows
  `delivery.logs.amazonaws.com` `s3:PutObject` only under
  `AWSLogs/989086371563/CloudFront/*`, scoped to source account `989086371563`,
  required ACL `bucket-owner-full-control`, and delivery source
  `renuvex-media-cf-access-logs`. Legacy CloudFront logging remains disabled.
  First log object proof:
  `AWSLogs/989086371563/CloudFront/cloudfront/media/E1205OOLPZDB00/2026/07/08/06/E1205OOLPZDB00.2026-07-08-06.a718d770.gz`.

Growth-stage guardrails:

- Move large cleanup/orphan/cost audits from raw S3 listing toward S3 Inventory
  or S3 Metadata Tables plus Athena before object counts make raw list scans
  operationally expensive. The application cleanup model still stays two-phase:
  quarantine first, then delete only after grace period and breakers.
- Keep S3 Storage Lens on free metrics for now. Consider Advanced metrics only
  when storage growth needs prefix-level or recommendation detail that the free
  account dashboard cannot answer.

Do not enable by default:

- Broad CloudTrail S3 data events, especially `GetObject` read events for
  public media. They can become expensive at global CDN traffic scale. If audit
  depth is needed, prefer a short-lived, scoped write/delete audit.
- S3 server access logging for the review-image bucket. Public traffic is
  served through CloudFront, so CloudFront standard logs are the first useful
  log source. S3 server logging is best-effort and still creates S3 storage and
  request cost.
- CloudFront real-time logs, high-resolution CloudWatch metrics, custom metrics,
  or Firehose/Parquet log pipelines until there is a concrete operational need.

Any alarm, log bucket, log delivery, trail, Inventory, Metadata, Athena, or
Storage Lens Advanced change is an AWS provider mutation. Before applying it,
write the exact scope, risk, and rollback plan and wait for explicit approval.

References:

- [CloudFront metrics in CloudWatch](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/monitoring-using-cloudwatch.html)
- [CloudFront standard logging](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/standard-logging.html)
- [S3 Inventory](https://docs.aws.amazon.com/AmazonS3/latest/userguide/configure-inventory.html)
- [S3 Metadata tables](https://docs.aws.amazon.com/AmazonS3/latest/userguide/metadata-tables-overview.html)
- [S3 Storage Lens pricing](https://aws.amazon.com/s3/storage-lens/)
- [CloudTrail pricing](https://aws.amazon.com/cloudtrail/pricing/)
- [CloudFront real-time logs](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/real-time-logs.html)

## Review-Request Email SES Source Package

Application checkpoint on 2026-07-15: Multi-Product Batch / Envelope V3.2 is
implemented only as disabled application/database source. Its provider-neutral
envelope, single-recipient attempt, opaque transport-event ids,
`sendCommittedAt` ambiguity boundary, and suppression/unsubscribe contracts are
the inputs for a future sender package. They do not mean SQS, Lambda,
EventBridge, SES tenants, configuration-set associations, DNS, or outbound
email are deployed.

### Review-email deployment access bootstrap

The first deployment-access checkpoint was prepared on 2026-07-21 in
`infra/aws/review-email-deployment-access.cloudformation.json`. On 2026-07-23,
an explicitly approved Administrator change set created
`renuvex-review-email-access-prod` with the source commit
`67a5babd3b37b97700b27764332a90a42ef00d68`. The reviewed change set contained
exactly seven `Add` operations and only `CAPABILITY_NAMED_IAM`; it had no nested
stack or bootstrap service role. The stack reached `CREATE_COMPLETE` and has
termination protection enabled.

Live acceptance found one `RenuvexReviewEmailOperators` group with the approved
operator membership, one provisioned `RenuvexReviewEmailOperator` permission
set, one account assignment, and the three expected CloudFormation service
roles. On 2026-07-23, a separately approved Administrator update applied the
author/operator hardening from pushed source commit
`b957375c74f7b475c12fc1af5b8079d31db1a5c6`. The stack returned to
`UPDATE_COMPLETE` at `2026-07-23T20:42:14Z`, retained termination protection,
and then passed the source-equality live verifier with two groups, two
memberships, two permission sets, two assignments, three service roles, and
eleven stack resources.

No foundation, journal, or journal-IAM downstream stack was created. The local
`renuvex-review-email` and `renuvex-review-email-author` SSO profiles resolve to
the provisioned execute-only and create-only roles respectively. No persistent
Administrator profile was added to the normal AWS config; the temporary
bootstrap config was removed after acceptance. Identity Center instance,
identity-store, and user IDs remain deployment parameters and must never be
committed.

The live hardened access contract is:

- `RenuvexReviewEmailOperators` is a dedicated Identity Center group assigned
  to account `989086371563` through the `RenuvexReviewEmailOperator` permission
  set with a two-hour session.
- The author can create, inspect, and describe only the administrator-staged
  exact change-set name for `renuvex-review-email-foundation-prod`,
  `renuvex-review-email-erasure-journal-prod`, or
  `renuvex-review-email-erasure-journal-iam-prod`. It cannot execute or delete
  a change set.
- Each `CreateChangeSet` path requires its matching CloudFormation service role;
  `iam:PassRole` is limited to those three exact role ARNs and
  `cloudformation.amazonaws.com`. IMPORT change sets are denied.
- The operator can inspect and execute only the administrator-staged exact
  change-set name before its bounded approval deadline. It cannot create or
  delete change sets and has no `iam:PassRole`.
- Direct `CreateStack`, `UpdateStack`, `DeleteStack`, SES send, service control
  plane, general IAM mutation, managed policy, and broad pass-role permissions
  are absent from both human permission sets.
- `renuvex-review-email-foundation-cfn` manages only the existing SES/KMS/SNS/SQS
  foundation resource surface and has no send or IAM permission.
- SES create operations and the legacy configuration-set describe action do not
  provide a usable resource-level authorization path in IAM simulation. Those
  exact actions alone use `Resource: "*"` inside the foundation service role;
  create calls require the locked region plus project/purpose request tags, and
  no SES send action is present. Other supported SES operations remain scoped
  to the exact identity or configuration-set ARN.
- `renuvex-review-email-journal-cfn` manages only the exact journal bucket's
  configuration and policy. It cannot write/delete objects, change object
  retention, or bypass governance retention.
- `renuvex-review-email-journal-iam-cfn` manages only the four existing
  `renuvex-review-email-journal-*` roles, inline policies, tags, and trust
  policies. It cannot attach managed policies, create users/access keys, or
  pass roles.
- The three service roles use `DeletionPolicy: Retain` and
  `UpdateReplacePolicy: Retain`; their retirement requires a separate
  decommission decision. Permission set, group, membership, and assignment use
  normal CloudFormation lifecycle.

Source validation is:

```powershell
pnpm aws:review-email:validate-access-template
pnpm aws:review-email:validate-templates
pnpm aws:lint-templates:eu-central-1
pnpm aws:review-email:verify-access-live -- --expect=ready --profile=renuvex-readonly --region=eu-central-1 --json
```

The live verifier is read-only and fail-closed. It compares stack inventory,
group membership, account assignment, permission-set policy, service-role
trust/inline policies, managed-policy absence, and termination protection with
the source contract without printing identity IDs or policy bodies.

Effective-policy simulation on 2026-07-23 allowed only the exact approved
change-set and matching CloudFormation `PassRole` paths. Wrong stack, service
role, region, import request, direct stack delete, SES send, journal object or
retention mutation, access-key creation, and managed-policy attachment were
all denied.

### Review-email foundation pre-mutation hardening

Source hardening prepared on 2026-07-23 supersedes the original operator
execution model. The separately approved access-stack update is now live and
the read-only verifier confirms source equality. This closes the access-drift
`NO-GO`; it does not authorize or deploy the foundation stack.

The live source contract is:

- An administrator first stages one exact stack-specific change-set name while
  execute approval remains expired. A dedicated author may create that exact
  change set but cannot execute or delete it. The operator may inspect and
  execute the exact staged name before expiry but cannot create, delete, or
  pass a service role. The disabled sentinel cannot satisfy either
  stack-specific name prefix.
- Foundation and non-IAM journal `CreateChangeSet` requests must include the
  complete declared `ResourceTypes` allowlist. `Null=false` prevents omission;
  `ForAllValues:StringEquals` rejects unapproved types. The conditional
  `AWS::SNS::Subscription` remains in the declared allowlist even while
  `FeedbackEndpointUrl=""` makes it absent from the effective change set.
- The journal-IAM stack cannot combine `ResourceTypes` with
  `CAPABILITY_NAMED_IAM`; its create request must omit `ResourceTypes`, and its
  exact service role plus canonical-template approval remains the authority
  boundary.
- Create requests require exact project/purpose/environment tags plus bounded
  40-character source-commit and 64-character template-digest values.
  Foundation requests additionally require the canonical 64-character
  `StackPolicyDigest`.
- Neither author nor operator has `DeleteChangeSet`. This closes the
  delete-and-recreate race after an administrator verifies a staged name.
- `ExecuteChangeSet` is split into three exact stack statements. Each requires
  the administrator-staged exact name and an `aws:CurrentTime` value before its
  explicit UTC expiry. Steady state is `approval-disabled` plus
  `1970-01-01T00:00:00Z`.
- IAM cannot bind `TemplateBody` to a content hash. The account-level boundary
  therefore splits create from execute: the author can submit only the staged
  name/resource types/tags/service role and cannot execute; the operator can
  execute but cannot submit or replace a template. A read-only verifier compares
  local source, change-set `Original`, and eventual stack `Original` canonical
  SHA-256 values before an administrator opens a maximum 15-minute execute
  window. Both permission sets are assigned to the same approved user, so this
  is capability separation rather than independent-person approval; verifier
  evidence and the separate administrator gate remain mandatory.
- Local IaC is decoded as strict UTF-8 JSON. Duplicate keys, unpaired Unicode
  surrogates, trailing commas, and non-canonical numeric/escape spellings are
  rejected. Canonicalization then recursively sorts object keys and removes
  insignificant whitespace. Raw file hashes or CloudFormation serialization
  are not used. Any template or stack-policy digest mismatch is a stop
  condition.
- The execution wrapper sends `RetainExceptOnCreate=true`, never sends
  `DisableRollback`, and accepts only a CREATE change set with
  `OnStackFailure=ROLLBACK`. Approval closure runs in `finally`; if cleanup
  itself fails, the IAM expiry still closes authorization automatically.
- First-create rollback permissions cover the exact KMS alias, SNS topic,
  optional subscription, SQS queue, SES configuration set, SES event
  destination, and SES identity. KMS deletion is limited to a key in the
  locked account/region with all three exact resource tags and a seven-day
  pending-deletion window.
- The SNS topic uses the KMS key **ARN**, not the mutable alias. The stack policy
  still protects all ten declared logical resources, including the alias and
  SES event destination, against `Update:Delete` and `Update:Replace` while
  allowing in-place updates.
- Stack policy is not attached to the `REVIEW_IN_PROGRESS` placeholder.
  Finalization first proves `CREATE_COMPLETE`, canonical stack-template and
  resource inventory equality, then applies and reads back the canonical stack
  policy, and finally enables termination protection.
- `DescribeChangeSet` does not return the `ChangeSetType` request field. The
  verifier therefore proves an access-stack update from the existing stable
  stack ID, absent `OnStackFailure`, and absence of import actions. A foundation
  create is proved separately by its `REVIEW_IN_PROGRESS` placeholder,
  `OnStackFailure=ROLLBACK`, and all-`Add` inventory.
- Updating an `AWS::SSO::PermissionSet` can make CloudFormation report its
  unchanged `AWS::SSO::Assignment` dependency as `Modify/Conditional`, because
  `PermissionSetArn` is a dynamic resource attribute whose assignment property
  requires replacement if the ARN changes. The verifier accepts only that exact
  dependency signature, requires the assignment definition to be unchanged,
  and requires the permission set itself to remain an in-place update. Every
  other conditional replacement remains a stop condition.

The foundation template is fail-closed at this stage:

- `SendingOptions.SendingEnabled=false`.
- No sender role, Lambda, Scheduler, SES send permission, tenant, HTTPS
  subscription, DNS mutation, or Vercel environment mutation exists.
- Configuration-set suppression override is absent; tenant/account/provider
  suppression semantics remain a sender-stage contract.
- KMS automatic rotation is enabled with a 365-day period.
- SES event destination is exactly `SEND`, `REJECT`, `BOUNCE`, `COMPLAINT`,
  `DELIVERY`, `DELIVERY_DELAY`, and `RENDERING_FAILURE`; open/click tracking is
  absent.
- The event destination waits for the SES-scoped SNS topic policy, and the
  optional HTTPS subscription waits for its DLQ policy.

Source validation and read-only evidence:

```powershell
pnpm aws:review-email:validate-templates
pnpm aws:review-email:simulate-access-policy -- --profile=renuvex-readonly --region=eu-central-1
pnpm aws:review-email:validate-aws-policies -- --profile=renuvex-readonly --region=eu-central-1
pnpm aws:review-email:foundation:verify-live -- --expect=absent --profile=renuvex-readonly --region=eu-central-1 --json
```

The source IAM simulator passes 33 positive and negative cases, including
author/operator separation, exact create/execute, missing or wrong resource
types, malformed provenance, wrong account/region/name/stack/role, expired
approval, delete-change-set denial, stack-policy/termination-protection denial,
exact rollback cleanup, KMS tag/window checks, and SES send denial. IAM Access
Analyzer reports no blocking finding for the author, operator, foundation
service role, KMS, SNS, or SQS policies. The live foundation verifier reports
zero foundation and sender resources.

Checkpoint status and required next order:

1. Source hardening was committed, pushed, and passed the GitHub quality gate.
2. The access-hardening change set was read-only verified before execution. It
   modified only `ReviewEmailOperatorPermissionSet` and
   `ReviewEmailFoundationCloudFormationRole` in place, added only the author
   group, membership, permission set, and assignment, and contained the exact
   dependency-only operator-assignment row described above.
3. The operator was denied access-stack execution as designed; the separately
   approved temporary Administrator session executed the bootstrap-owned
   update.
4. Both provisioned permission sets, both local least-privilege profiles, every
   live access policy, and closed approval parameters passed read-only
   acceptance. The temporary Administrator config was removed.
5. The next AWS mutation is a separate gate: stage the exact foundation
   change-set name, create it with the author profile, verify its template and
   effective changes read-only, obtain separate execution approval, and only
   then execute it with the operator profile.

No command in this section authorizes an AWS mutation by itself. Each
`--apply`, change-set execution, stack-policy write, or termination-protection
write remains a separate stop/go approval.

Deferred acceptance gates remain separate:

- AWS sender package: queue/worker/scheduler IAM, tenant/configuration mapping,
  provider suppression reconciliation, DLQ, alarms, and ambiguous-attempt
  operator workflow.
- SES sandbox/provider contract: real DKIM coverage for custom
  `List-Unsubscribe` headers, verified-recipient send, and duplicate/out-of-order
  delivery, delay, bounce, and complaint evidence.
- Production canary: identity/custom MAIL FROM DNS, production access,
  deliverability monitoring, legal copy approval, rollback, and bounded merchant
  enablement.

Status snapshot on 2026-07-09:

- SES `eu-central-1` is healthy but still in sandbox:
  `ProductionAccessEnabled=false`, quota `200` messages per 24 hours and
  `1` message per second.
- No SES email identities or configuration sets existed during the read-only
  preflight.
- The source-only foundation template is
  `infra/aws/review-email-foundation.cloudformation.json`; its local validator
  is `scripts/validate-review-email-foundation-template.mjs`.
- Package guard:

```powershell
pnpm aws:review-email:validate-templates
pnpm aws:lint-templates
```

- AWS read-only `cloudformation validate-template` passed for the foundation
  template in `eu-central-1` through the `renuvex-review-images` profile.
- No SES stack, DNS record, production-access request, Vercel env value, DB
  migration, QStash job, deploy, or real email send exists from this source
  package checkpoint.

Template contract:

- Foundation stack target name for a future mutation plan:
  `renuvex-review-email-foundation-prod`.
- Sender domain: `reviews.renuvex.app`.
- Visible sender address: `requests@reviews.renuvex.app`.
- Custom MAIL FROM domain: `bounce.reviews.renuvex.app`.
- Configuration set: `renuvex-review-requests-prod`.
- SNS feedback topic uses `SignatureVersion=2`; selected event types are
  `SEND`, `REJECT`, `BOUNCE`, `COMPLAINT`, `DELIVERY`, `DELIVERY_DELAY`, and
  `RENDERING_FAILURE`. `OPEN` and `CLICK` tracking remain disabled.
- HTTPS feedback subscription is conditional and defaults off until the endpoint
  rollout/confirmation process is approved.
- The earlier source-only direct Vercel `ses:SendEmail` runtime-role template
  was removed in lifecycle V3. The accepted high-volume architecture sends
  through a future SQS/Lambda worker, so sender IAM belongs to that worker's
  separately reviewed IaC package. Vercel must not receive direct SES send
  permission merely because the foundation stack exists.

Before any SES mutation, write the exact scope, risk, rollback, expected DNS
records, sandbox/production-access implications, and approval gate. Do not
infer that the source templates mean the resources are already deployed.

## Operational Rules

- Root credentials are not an operational path.
- Use `renuvex-readonly` for audits by default.
- Use `renuvex-widget-canary` only for the AWS widget canary stack and asset
  sync.
- Any CloudFormation deploy, S3 object deletion, CloudFront distribution update,
  invalidation, DNS change, or production cutover requires explicit approval.
- Never record AWS access keys, SSO tokens, session credentials, or secret values
  in the wiki.
- Keep canary code deployable but non-invasive: no DB, Mux, QStash,
  review-image provider account, or ikas write paths belong in the AWS canary.

## Skill And Documentation Sources

Installed local AWS skills live under `.agents/skills`. Load only the skill that
matches the task.

| Skill | Use |
|---|---|
| `aws-iam` | Identity Center, IAM policy, role, STS, and permission-boundary work. |
| `securing-s3-buckets` | S3 bucket security, encryption, CORS, block public access, and bucket-policy audits. |
| `routing-traffic-with-route53-and-cloudfront` | Route 53, ACM, CloudFront alternate domain names, and custom-domain routing. |
| `aws-billing-and-cost-management` | Budgets, cost review, cost anomalies, and spend controls. |
| `querying-aws-s3` | S3 object inventory, metadata, and future asset audits. |
| `aws-ses` | Future Amazon SES outbound email work. |
| `aws-mail-manager` | Future Amazon SES Mail Manager inbound/routing work. |
| `aws-messaging-and-streaming` | Future SQS, SNS, and EventBridge queue/scheduler architecture for review-request email jobs. |
| `aws-serverless` | Future Lambda, EventBridge Scheduler, and SQS event-source implementation work for AWS-native email dispatch. |
| `creating-secrets-using-best-practices` | Future AWS Secrets Manager setup for Lambda/runtime secrets if the email worker needs AWS-side DB/API credentials. |
| `aws-observability` | CloudWatch logs, metrics, traces, and operational visibility. |
| `setting-up-cloudwatch-alarm-notifications` | CloudWatch alarm notification channels. |
| `aws-sdk-js-v3-usage` | JavaScript/TypeScript AWS SDK v3 code if the app later introduces AWS runtime calls. |

Before adding a missing AWS skill, check the current upstream source instead of
guessing:

- [AWS Agent Toolkit for AWS](https://github.com/aws/agent-toolkit-for-aws) -
  official AWS-supported MCP servers, skills, and plugins. The repository
  documents installing skills with `npx skills add aws/agent-toolkit-for-aws/skills`.
- [AWS Labs MCP](https://github.com/awslabs/mcp) - older/open-source AWS MCP
  server repository. AWS now points new agent work toward the Agent Toolkit.
- [Amazon SES skills](https://github.com/amazon-ses/skills) - SES-specific skill
  source to check before future mail implementation.

Do not keep unrelated AWS skills installed just because they may exist upstream.
For example, Aurora/RDS skills are not needed until this project actually plans
an AWS database phase.

## Lessons From The Canary

- The managed CloudFront cache policy `UseOriginCacheControlHeaders` forwards the
  viewer `Host` header. With a private S3 origin and OAC, that caused S3
  `404 NotFound` even when the object existed. The canary now uses a stack-owned
  CloudFront cache policy that forwards no headers, cookies, or query strings
  while preserving S3 `Cache-Control` TTL behavior.
- Static widget assets only need simple `GET`/`HEAD` CORS. Forwarding `OPTIONS`
  to the private S3 origin produced `403`. A future preflight requirement should
  be handled at CloudFront viewer-request/response policy level, not by exposing
  S3 directly.
- Correct IAM actions for S3 CORS are `s3:GetBucketCORS` and `s3:PutBucketCORS`.
  Do not invent non-existent IAM actions such as `s3:DeleteBucketCors`.

## Verification Commands

Template validation:

```powershell
pnpm aws:widget:validate-template
pnpm aws:review-images:validate-template
```

Asset dry-run:

```powershell
pnpm aws:widget:deploy-assets:dry-run -- --bucket=renuvex-widget-canary-989086371563-eu-central-1 --summary
```

Widget measurement:

```powershell
$env:MEASURE_WIDGET_ORIGIN='https://d34tylxlzkmua8.cloudfront.net'
pnpm measure:deployed-widget
```

Wiki verification:

```powershell
node scripts/wiki-audit.mjs --changed-source-check
```
