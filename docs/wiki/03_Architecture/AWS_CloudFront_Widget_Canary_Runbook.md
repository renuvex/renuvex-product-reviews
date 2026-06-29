---
type: maintenance
project: renuvex-product-reviews
status: active
created: 2026-06-29
updated: 2026-06-29
last_verified: 2026-06-29
confidence: high
tags:
  - aws
  - cloudfront
  - s3
  - widget
  - performance
related:
  - "[[AWS_Setup_And_Access]]"
  - "[[Storefront_CDN_Performance_Benchmark]]"
  - "[[ADR_0033_Cloudflare_Worker_Widget_Asset_Delivery]]"
  - "[[Caching_And_Performance]]"
  - "[[Widget_Performance]]"
source_files:
  - "infra/aws/widget-cdn-canary.cloudformation.json"
  - "scripts/prepare-widget-aws-canary-assets.mjs"
  - "scripts/deploy-widget-aws-canary-assets.mjs"
  - "scripts/prepare-widget-worker-assets.mjs"
  - "scripts/measure-deployed-widget-network.mjs"
  - "public/widget-runtime/build-manifest.json"
---

# AWS CloudFront Widget Canary Runbook

## Purpose

This runbook defines the non-invasive AWS CloudFront/S3 canary for storefront
widget static assets. It exists only to compare CDN behavior against the live
Cloudflare Worker and Vercel surfaces before making any final CDN decision.

The canary must not change `widget.renuvex.app`, `app.renuvex.app`, ikas
`StorefrontJSScript` records, Vercel settings, Supabase, Mux, Cloudinary,
QStash, or review data.

## Identity Model

Use IAM Identity Center named profiles, not root/default credentials:

```powershell
aws sts get-caller-identity --profile renuvex-readonly
aws sts get-caller-identity --profile renuvex-widget-canary
```

`renuvex-widget-canary` owns the canary stack and asset upload. Admin/root
credentials are not the normal operational path.

See [[AWS_Setup_And_Access]] for the current AWS CLI baseline, Identity Center
profiles, permission-set model, and AWS skill-source policy.

## Infrastructure Shape

The canary stack is defined in
[infra/aws/widget-cdn-canary.cloudformation.json](infra/aws/widget-cdn-canary.cloudformation.json).

It creates:

- a private `renuvex-widget-*` S3 bucket;
- S3 block public access, versioning, AES256 encryption, bucket-owner-enforced object ownership, and a CORS rule for `GET`/`HEAD` widget asset reads;
- CloudFront Origin Access Control for private S3 access;
- a custom CloudFront cache policy that uses S3 `Cache-Control` headers without
  forwarding viewer `Host`, cookies, or query strings to the S3 origin;
- a CloudFront response headers policy with CORS `*`, `Cross-Origin-Resource-Policy: cross-origin`, and `nosniff`;
- a CloudFront distribution using the custom cache policy above;
- a bucket policy that denies insecure transport and grants read access only to the canary CloudFront distribution.

The first benchmark uses the CloudFront default distribution domain. A custom
`*.renuvex.app` canary hostname is a later optional phase and requires separate
Cloudflare DNS/ACM approval.

## Current Canary Evidence

Verified on 2026-06-29:

| Item | Value |
|---|---|
| Stack | `renuvex-widget-cdn-canary` |
| CloudFront distribution | `E2IGB2R73IV6SE` |
| CloudFront hostname | `https://d34tylxlzkmua8.cloudfront.net` |
| S3 bucket | `renuvex-widget-canary-989086371563-eu-central-1` |
| Uploaded objects | `446` |
| Distribution status | `Deployed` |

Smoke results:

- `/widget.js`: `200`, `public, max-age=0, must-revalidate`, simple CORS `*`.
- `/widget-runtime/chunks/render-7V4G6VZN.js`: `200`, `public, max-age=31536000, immutable`, CloudFront `Hit`.
- `/__health`: `200`, `no-store`.
- `pnpm measure:deployed-widget` passed for the canary origin.

## Asset Packaging

The AWS asset pack reuses the existing Worker asset preparation logic so both
CDNs serve the same widget artifact surface:

```powershell
pnpm aws:widget:prepare-assets
```

This creates `.tmp/widget-aws-canary-assets` and
`.tmp/widget-aws-canary-upload-plan.json`.

| Path | Cache-Control |
|---|---|
| `/widget.js` | `public, max-age=0, must-revalidate` |
| `/widget-runtime/runtime.js` | `public, max-age=0, must-revalidate` |
| `/widget-runtime/build-manifest.json` | `public, max-age=0, must-revalidate` |
| `/widget-runtime/runtime-*.js` | `public, max-age=31536000, immutable` |
| `/widget-runtime/chunks/*.js` | `public, max-age=31536000, immutable` |
| `/__health` | `no-store` |

The 2026-06-29 local dry-run produced:

```text
files=446
stable=3
immutable=442
health/no-store=1
```

The high file count is intentional because the widget runtime retention contract
keeps committed hash files so older cached loaders do not 404.

## Preflight Evidence

Read-only checks before AWS mutation:

```powershell
aws s3api list-buckets --profile renuvex-readonly
aws cloudfront list-distributions --profile renuvex-readonly
aws cloudfront list-origin-access-controls --profile renuvex-readonly
aws budgets describe-budgets --account-id 989086371563 --region us-east-1 --profile renuvex-readonly
```

Evidence from 2026-06-29:

- no existing S3 buckets;
- no existing CloudFront distributions;
- no existing CloudFront OACs;
- budget `Renuvex AWS Monthly Guardrail`, monthly `10 USD`, exists.

## Permission Model

`renuvex-widget-canary` authenticates through IAM Identity Center and the
`RenuvexWidgetCanaryOperator` permission set.

Use [widget-canary-operator-policy.example.json](../../../infra/aws/widget-canary-operator-policy.example.json)
as the target-policy source if the permission set needs to be recreated or
audited. It includes CloudFormation change-set lifecycle permissions because
`aws cloudformation deploy` uses change sets, and it keeps S3 access limited to
`renuvex-widget-*` buckets. Because the canary bucket has versioning enabled,
rollback cleanup also needs `s3:ListBucketVersions` and `s3:DeleteObjectVersion`;
deleting only the current object key is not enough for a versioned bucket.

The canary uses a stack-owned CloudFront cache policy. Do not use the managed
`UseOriginCacheControlHeaders` policy for the private S3 origin: that managed
policy forwards the viewer `Host` header, which makes CloudFront ask S3 for the
wrong virtual-hosted bucket and returns S3 `404 NotFound` even when the object
exists. The stack-owned policy keeps the same origin-cache-control intent
without forwarding `Host`.

The canary intentionally supports simple CORS for static widget asset `GET` and
`HEAD` requests only. Widget script/module/chunk loads do not send custom
request headers or credentials, so they do not need browser preflight. If a
future AWS-hosted asset surface needs preflight, handle `OPTIONS` explicitly at
CloudFront with a viewer-request function instead of forwarding it to the
private S3 origin.

Verify permissions after permission-set changes:

```powershell
pnpm aws:widget:validate-template
```

## Deployment Commands

Only run after explicit approval.

```powershell
$bucket = "renuvex-widget-canary-989086371563-eu-central-1"

aws cloudformation deploy `
  --profile renuvex-widget-canary `
  --region eu-central-1 `
  --stack-name renuvex-widget-cdn-canary `
  --template-file infra/aws/widget-cdn-canary.cloudformation.json `
  --parameter-overrides BucketName=$bucket EnvironmentName=canary `
  --tags Project=renuvex-product-reviews Component=storefront-widget-cdn-canary Environment=canary
```

Get stack outputs:

```powershell
aws cloudformation describe-stacks `
  --profile renuvex-widget-canary `
  --region eu-central-1 `
  --stack-name renuvex-widget-cdn-canary `
  --query "Stacks[0].Outputs" `
  --output json
```

Upload assets only after the bucket exists:

```powershell
pnpm aws:widget:deploy-assets -- --bucket=$bucket
```

If an upload is interrupted, resume without writing duplicate versions for
already uploaded keys:

```powershell
pnpm aws:widget:deploy-assets -- --bucket=$bucket --skip-existing
```

Wait for CloudFront deployment:

```powershell
aws cloudfront wait distribution-deployed --profile renuvex-widget-canary --id <distribution-id>
```

## Benchmark Commands

Use the CloudFront output domain as `MEASURE_WIDGET_ORIGIN`.

```powershell
$env:MEASURE_WIDGET_ORIGIN = "https://<distribution-domain>"
$env:MEASURE_WIDGET_API_ORIGIN = "https://app.renuvex.app"
$env:MEASURE_WIDGET_READ_API_ORIGIN = "https://widget.renuvex.app"
pnpm measure:deployed-widget
```

Also compare direct static timings using the same curl method from
[[Storefront_CDN_Performance_Benchmark]].

## Rollback

Canary rollback does not touch live storefronts:

1. stop using the CloudFront distribution domain in measurements;
2. delete uploaded S3 objects if stack deletion requires an empty bucket;
3. delete the CloudFormation stack;
4. verify S3 bucket, CloudFront distribution, OAC, and response headers policy are gone.

No ikas script rewrite or production DNS rollback is involved in this first
phase.

## Obsidian Links

- [[Storefront_CDN_Performance_Benchmark]]
- [[ADR_0033_Cloudflare_Worker_Widget_Asset_Delivery]]
- [[Caching_And_Performance]]
- [[Widget_Performance]]
