---
type: research
project: renuvex-product-reviews
status: active
created: 2026-06-30
updated: 2026-06-30
last_verified: 2026-06-30
confidence: medium
tags:
  - storefront
  - cdn
  - cloudflare
  - aws
  - cloudfront
  - cost
related:
  - "[[Storefront_CDN_Performance_Benchmark]]"
  - "[[Review_App_Monthly_Cost_Model]]"
  - "[[AWS_CloudFront_Widget_Canary_Runbook]]"
  - "[[ADR_0033_Cloudflare_Worker_Widget_Asset_Delivery]]"
source_files:
  - "docs/wiki/10_Research/Storefront_CDN_Performance_Benchmark.md"
  - "workers/widget-delivery/src/index.ts"
  - "scripts/measure-deployed-widget-network.mjs"
---

# Storefront CDN Cost Model

This page records the June 30, 2026 cost model for the storefront widget CDN
decision. It compares the current Cloudflare Worker V2 delivery shape against
the AWS CloudFront/S3 canary shape using current official public pricing and
measured Renuvex widget transfer data.

This is a decision model, not a final invoice estimate. It excludes taxes, VAT,
enterprise/private discounts, AWS Support, Cloudflare plan add-ons, observability
exports, invalidation charges, and S3 origin costs that require a measured
CloudFront cache-miss ratio.

## Official Pricing Inputs

Cloudflare official sources checked on June 30, 2026:

- Cloudflare Workers pricing:
  `https://developers.cloudflare.com/workers/platform/pricing/`
- Cloudflare Static Assets billing:
  `https://developers.cloudflare.com/workers/static-assets/billing-and-limitations/`

Cloudflare inputs used by this model:

| Item | Official public value used |
|---|---:|
| Workers Paid account base | `$5/month` |
| Included Worker requests | `10,000,000/month` |
| Additional Worker requests | `$0.30 / 1,000,000` |
| Included CPU | `30,000,000 CPU ms/month` |
| Additional CPU | `$0.02 / 1,000,000 CPU ms` |
| Static Assets requests | free and unlimited |
| Static Assets storage | no additional cost |

AWS official sources checked on June 30, 2026:

- AWS CloudFront pricing page: `https://aws.amazon.com/cloudfront/pricing/`
- AWS CloudFront free-tier expansion announcement:
  `https://aws.amazon.com/about-aws/whats-new/2021/11/aws-price-reduction-data-transfers-internet/`
- Amazon CloudFront Developer Guide introduction:
  `https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html`
- AWS official Price List API CloudFront offer file:
  `https://pricing.us-east-1.amazonaws.com/offers/v1.0/aws/AmazonCloudFront/current/index.json`

AWS CloudFront Price List SKUs used by this model:

| SKU | Usage type | Official public value used |
|---|---|---:|
| `YA5QZD7XG45UGHCH` | `EU-Requests-Tier2-HTTPS` | `$0.0120 / 10,000 HTTPS GET/HEAD requests` |
| `VU3485RNDU6HBQF6` | `EU-DataTransfer-Out-Bytes` | tiered Europe edge data transfer |

AWS Europe edge data transfer tiers used:

| Monthly data transfer out tier | Price |
|---:|---:|
| first `10 TB` | `$0.085/GB` |
| next `40 TB` | `$0.080/GB` |
| next `100 TB` | `$0.060/GB` |
| next `350 TB` | `$0.040/GB` |
| next `524 TB` | `$0.030/GB` |
| next `4 PB` | `$0.025/GB` |
| over `5 PB` | `$0.020/GB` |

The AWS model applies the CloudFront always-free allowance of `10,000,000`
requests/month and `1 TB` data transfer out/month before pay-as-you-go charges.

Additional provider source slugs checked on June 30, 2026:

| Source slug | Provider | Official source | Public value used |
|---|---|---|---|
| `cloudflare-workers-pricing` | Cloudflare | `https://developers.cloudflare.com/workers/platform/pricing/` | Workers Paid base, included requests, overage request/CPU pricing |
| `cloudflare-static-assets-billing` | Cloudflare | `https://developers.cloudflare.com/workers/static-assets/billing-and-limitations/` | Static asset requests free/unlimited; no additional asset storage cost |
| `aws-cloudfront-pricing` | AWS CloudFront | `https://aws.amazon.com/cloudfront/pricing/` | CloudFront public pricing page |
| `aws-cloudfront-price-list-api` | AWS CloudFront | `https://pricing.us-east-1.amazonaws.com/offers/v1.0/aws/AmazonCloudFront/current/index.json` | Europe HTTPS request and data-transfer SKUs |
| `vercel-cdn-usage` | Vercel | `https://vercel.com/docs/manage-cdn-usage` | Edge Requests and Fast Data Transfer usage pricing |
| `vercel-pricing` | Vercel | `https://vercel.com/pricing` | Pro included usage and overage references |
| `bunny-cdn-pricing` | Bunny CDN | `https://bunny.net/pricing/cdn/` | Europe/North America bandwidth and no-request-fee model |
| `keycdn-pricing` | KeyCDN | `https://www.keycdn.com/pricing` | Europe/North America bandwidth tiers, no request charges, minimum usage |
| `fastly-pricing` | Fastly | `https://www.fastly.com/pricing` | Europe bandwidth and request tiers; public table only covers the displayed request tiers |
| `google-cloud-cdn-pricing` | Google Cloud CDN | `https://cloud.google.com/cdn/pricing` | Europe cache egress and HTTP/HTTPS cache lookup request pricing |
| `azure-front-door-pricing` | Azure Front Door | `https://azure.microsoft.com/en-us/pricing/details/frontdoor/` | Standard base fee, Europe data transfer, request pricing; public table switches to Contact Us after listed request tiers |
| `azure-front-door-billing` | Azure Front Door | `https://learn.microsoft.com/en-us/azure/frontdoor/billing` | Billing dimensions: base fee, requests, data transfer |
| `cdn77-pricing` | CDN77 | `https://www.cdn77.com/pricing` | Growth plan: 250 TB/month for `$990/month` |

## Renuvex Model Inputs

The traffic scenario is intentionally high-volume:

- `100,000` storefront widget pageviews per store per month.
- Store counts: `100`, `200`, `300`, `400`, `500`, `1000`, `2000`.

Measured Renuvex widget inputs from [[Storefront_CDN_Performance_Benchmark]]:

| Input | Value | Evidence |
|---|---:|---|
| Static script requests per mount-present pageview | `20` | AWS/Cloudflare controlled Playwright network measurement |
| AWS encoded static bytes per mount-present pageview | `89,675 bytes` | AWS CloudFront canary measurement |
| Current Cloudflare V2 Worker read API requests per pageview | `3` | `ratings:1`, `reviews:2`; `settings` stays backend |

Important scope distinction:

- AWS canary scope in this model is static asset CDN delivery only. Read/write
  APIs still use the Vercel backend origin.
- Current Cloudflare V2 scope is static asset delivery plus selected public read
  API Worker cache. Write, upload, Mux, QStash, Cloudinary, admin, OAuth, and DB
  mutation paths stay on `app.renuvex.app`.

## Monthly Cost Table

The table below was generated with a local Node.js calculation script. Arithmetic
was not done manually.

| Stores | Pageviews/mo | AWS static requests/mo | AWS static GB/mo | AWS request cost | AWS data cost | AWS CloudFront PAYG static total | Cloudflare read Worker requests/mo | Cloudflare current V2 estimate |
|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| 100 | 10,000,000 | 200,000,000 | 835 | $228.00 | $0.00 | $228.00 | 30,000,000 | $11.00 |
| 200 | 20,000,000 | 400,000,000 | 1,670 | $468.00 | $54.94 | $522.94 | 60,000,000 | $20.00 |
| 300 | 30,000,000 | 600,000,000 | 2,505 | $708.00 | $125.93 | $833.93 | 90,000,000 | $29.00 |
| 400 | 40,000,000 | 800,000,000 | 3,341 | $948.00 | $196.92 | $1,144.92 | 120,000,000 | $38.00 |
| 500 | 50,000,000 | 1,000,000,000 | 4,176 | $1,188.00 | $267.90 | $1,455.90 | 150,000,000 | $47.00 |
| 1,000 | 100,000,000 | 2,000,000,000 | 8,352 | $2,388.00 | $622.85 | $3,010.85 | 300,000,000 | $92.00 |
| 2,000 | 200,000,000 | 4,000,000,000 | 16,703 | $4,788.00 | $1,305.54 | $6,093.54 | 600,000,000 | $182.00 |

Relative difference:

| Stores | AWS / Cloudflare multiple | Cloudflare lower by |
|---:|---:|---:|
| 100 | 20.7x | 95.2% |
| 200 | 26.1x | 96.2% |
| 300 | 28.8x | 96.5% |
| 400 | 30.1x | 96.7% |
| 500 | 31.0x | 96.8% |
| 1,000 | 32.7x | 96.9% |
| 2,000 | 33.5x | 97.0% |

## Broader Provider Comparison

This table uses the same traffic and widget inputs. It is deliberately stricter
than a marketing comparison:

- `Cloudflare V2` includes static asset delivery plus selected read Worker cache.
- `Bunny`, `KeyCDN`, `AWS`, `Vercel`, `Google`, `Fastly`, `Azure`, and `CDN77`
  are modeled as storefront static asset CDN delivery only unless noted.
- `Google Cloud CDN hit-only` excludes cache fill/origin costs.
- `Fastly public` and `Azure Front Door Standard public` become lower bounds
  where the official public pricing table switches to `Contact us`.
- Fixed account/team subscription costs are excluded except where the CDN product
  itself has a mandatory base fee or minimum.

The table below was generated with the same local Node.js calculation script.

| Stores | Pageviews/mo | Cloudflare V2 | Bunny CDN Standard | KeyCDN | AWS CloudFront | Vercel CDN usage | Google Cloud CDN hit-only | CDN77 Growth | Fastly public | Azure Front Door Standard public |
|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| 100 | 10,000,000 | $11.00 | $8.35 | $33.41 | $228.00 | $380.00 | $216.81 | $990.00 | $282.22 | $284.32 |
| 200 | 20,000,000 | $20.00 | $16.70 | $66.81 | $522.94 | $876.95 | $433.63 | $990.00 | >= $382.44 | >= $398.64 |
| 300 | 30,000,000 | $29.00 | $25.05 | $100.22 | $833.93 | $1,402.22 | $650.44 | $990.00 | >= $482.66 | >= $467.96 |
| 400 | 40,000,000 | $38.00 | $33.41 | $133.63 | $1,144.92 | $1,927.50 | $867.25 | $990.00 | >= $582.88 | >= $537.27 |
| 500 | 50,000,000 | $47.00 | $41.76 | $167.03 | $1,455.90 | $2,452.77 | $1,084.07 | $990.00 | >= $683.10 | >= $606.59 |
| 1,000 | 100,000,000 | $92.00 | $83.52 | $334.07 | $3,010.85 | $5,079.15 | $2,168.13 | $990.00 | >= $1,184.20 | >= $953.19 |
| 2,000 | 200,000,000 | $182.00 | $167.03 | $603.50 | $6,093.54 | $10,331.89 | $4,174.68 | $990.00 | >= $1,927.86 | >= $1,536.50 |

Provider interpretation:

- Bunny is the cheapest public static-only CDN in this model, but it does not
  replace the Cloudflare Worker read-cache layer by itself.
- Cloudflare remains the best fit for the current Renuvex architecture because
  it combines free static assets with the selected public read API Worker cache.
- KeyCDN is materially cheaper than AWS/Vercel/Google/Fastly/Azure in this
  request-heavy widget shape, but it is still a static-only CDN option.
- AWS, Vercel, Google, Fastly, and Azure are structurally more expensive here
  because this widget graph creates many small HTTPS requests.
- CDN77 Growth is simple and can become interesting only at much higher
  bandwidth-oriented volume. At these static-script volumes it is not the cost
  leader.

## Interpretation

For the current Renuvex widget shape, Cloudflare remains the cost-efficient
architecture default. Bunny is slightly cheaper for static assets alone, but
Cloudflare also covers the selected public read Worker cache in the current V2
split. The reason is structural: Cloudflare Static Assets makes the static script
request and bandwidth surface free, while most hyperscaler CDNs charge for the
many small HTTPS GET/HEAD requests generated by the widget runtime asset graph.

AWS CloudFront/S3 remains useful as a performance canary. The measured local
Turkey path showed AWS slightly faster than the live Cloudflare Worker route for
the same static widget assets, but the performance gain was not large enough to
override this cost difference without broader-region p50/p95 evidence.

The CloudFront request count dominates AWS cost more than bandwidth in this
model. If AWS becomes a production candidate later, reduce static request count
first through runtime graph optimization or bundling strategy. That optimization
also benefits Cloudflare performance.

## What This Model Does Not Prove

- It does not prove the exact future production bill. Real invoices depend on
  actual pageviews, browser cache reuse, repeat visitors, bot traffic, request
  mix, regional traffic split, and provider-specific discounts.
- It does not include Cloudflare Worker CPU overage because the current read
  proxy CPU usage has not been measured as a monthly CPU-ms total.
- It does not include S3 storage or origin request cost because the CloudFront
  cache-miss ratio was not measured. For immutable widget assets this should be
  checked, not guessed.
- It does not include public write/upload API traffic, because those paths remain
  on `app.renuvex.app` in both architectures.

## Decision

Keep Cloudflare Worker V2 as the production cost default for storefront widget
delivery. Keep AWS CloudFront/S3 as a controlled performance canary only.

Before any AWS production cutover decision, require:

1. Broader-region p50/p95 measurements.
2. A script-request-count reduction review.
3. A CloudFront/S3 origin-miss cost measurement.
4. A rollback rehearsal for `widget.renuvex.app`.

## Obsidian Links

- [[Storefront_CDN_Performance_Benchmark]]
- [[Review_App_Monthly_Cost_Model]]
- [[AWS_CloudFront_Widget_Canary_Runbook]]
- [[Caching_And_Performance]]
- [[Widget_Performance]]
