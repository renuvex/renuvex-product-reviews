---
type: maintenance
project: renuvex-product-reviews
status: active
created: 2026-06-29
updated: 2026-07-03
last_verified: 2026-07-03
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
  - "scripts/prepare-widget-aws-canary-assets.mjs"
  - "scripts/deploy-widget-aws-canary-assets.mjs"
  - "scripts/validate-widget-aws-canary-template.mjs"
  - "scripts/validate-review-images-aws-template.mjs"
  - ".agents/skills/aws-iam/SKILL.md"
  - ".agents/skills/securing-s3-buckets/SKILL.md"
  - ".agents/skills/routing-traffic-with-route53-and-cloudfront/SKILL.md"
---

# AWS Setup And Access

## Purpose

This page records the AWS access model used by this repository so future agents
do not re-create the same Identity Center, CLI, S3, CloudFront, and skill-source
decisions from memory.

AWS is currently used only for a non-invasive storefront widget CDN canary. The
production storefront delivery path remains Cloudflare Worker unless a later
decision explicitly changes it.

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
records, Vercel env, Supabase, Mux, Cloudinary, or QStash.

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
| ACM certificates in `us-east-1` | `renuvex-review-images` can list certificates; no existing certificates and no `media.renuvex.app` certificate found |
| `media.renuvex.app` public DNS | no public record from `1.1.1.1` or `8.8.8.8`; local resolver returned `192.168.1.1`, so local DNS is not proof of public configuration |

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
- No Vercel env, DB, Cloudflare Worker/DNS, Cloudinary, provider activation, or
  production traffic changes were made in this retry step.

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
  `review-images/v1/public/*` and private admin preview variant paths. It does
  not grant CloudFront read access to private originals.
- CloudFront OAC uses SigV4 with `SigningBehavior: always`.
- CloudFront cache policy forwards no viewer headers, cookies, or query strings
  to S3, and uses one-year immutable TTLs.
- CloudFront response headers include `nosniff`, HSTS, referrer policy, and
  frame denial.
- CloudFront default behavior is signed-key-group protected for private preview
  paths; the public variants behavior for `review-images/v1/public/*` is not
  key-group protected and permits `GET`/`HEAD` only.
- The review-image operator role now includes `s3:GetBucketPolicyStatus`; the
  bucket policy status was read successfully and reports `IsPublic=false`.
  The bucket policy and Public Access Block were also read and verified
  directly.
- No Vercel env, DB, Cloudflare Worker/DNS, Cloudinary, provider activation, or
  production traffic changes were made in this execute step.

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

Run this local guard before any approved review-image stack change set:

```powershell
pnpm aws:review-images:validate-template
```

## Operational Rules

- Root credentials are not an operational path.
- Use `renuvex-readonly` for audits by default.
- Use `renuvex-widget-canary` only for the AWS widget canary stack and asset
  sync.
- Any CloudFormation deploy, S3 object deletion, CloudFront distribution update,
  invalidation, DNS change, or production cutover requires explicit approval.
- Never record AWS access keys, SSO tokens, session credentials, or secret values
  in the wiki.
- Keep canary code deployable but non-invasive: no DB, Mux, QStash, Cloudinary,
  or ikas write paths belong in the AWS canary.

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
