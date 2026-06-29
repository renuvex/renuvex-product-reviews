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
  - iam
  - identity-center
  - cli
  - cloudfront
  - s3
  - skills
related:
  - "[[AWS_CloudFront_Widget_Canary_Runbook]]"
  - "[[Storefront_CDN_Performance_Benchmark]]"
  - "[[Deployment_Notes]]"
  - "[[Caching_And_Performance]]"
source_files:
  - "infra/aws/widget-cdn-canary.cloudformation.json"
  - "infra/aws/widget-canary-operator-policy.example.json"
  - "scripts/prepare-widget-aws-canary-assets.mjs"
  - "scripts/deploy-widget-aws-canary-assets.mjs"
  - "scripts/validate-widget-aws-canary-template.mjs"
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

The `AdministratorAccess` permission set exists for manual emergency or console
operations, but it is not the normal automation profile and should not be made
the default CLI profile.

The limited canary role is:

```text
arn:aws:iam::989086371563:role/aws-reserved/sso.amazonaws.com/eu-central-1/AWSReservedSSO_RenuvexWidgetCanaryOperator_18c9a9d7b13068e9
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
