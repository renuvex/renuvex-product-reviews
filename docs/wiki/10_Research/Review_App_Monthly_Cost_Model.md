---
type: research
project: renuvex-product-reviews
status: active
created: 2026-06-30
updated: 2026-06-30
last_verified: 2026-06-30
confidence: medium
tags:
  - pricing
  - cost
  - packaging
  - competitors
  - video
  - media
related:
  - "[[Competitor_Pricing_And_Plans]]"
  - "[[Storefront_CDN_Cost_Model]]"
  - "[[Upstash_Redis_QStash_Cost_Audit]]"
  - "[[ADR_0032_Review_Video_On_Mux]]"
source_files:
  - "docs/wiki/10_Research/Competitor_Pricing_And_Plans.md"
  - "docs/wiki/10_Research/Storefront_CDN_Cost_Model.md"
  - "docs/wiki/10_Research/Upstash_Redis_QStash_Cost_Audit.md"
  - "prisma/schema.prisma"
  - "src/app/api/public/upload/video/initiate/route.ts"
  - "workers/widget-delivery/src/index.ts"
---

# Review App Monthly Cost Model

This page records the June 30, 2026 monthly cost model for a production
Renuvex Product Reviews deployment. It exists to support package design, not to
predict an exact invoice.

The model assumes the current target architecture:

- Cloudflare Worker V2 for storefront static assets and selected public read
  cache.
- Vercel for admin, OAuth, write APIs, upload APIs, settings side effects,
  Mux webhook/QStash receivers, and backend control plane.
- Supabase Postgres for the main database.
- Upstash Redis only for rate-limit/idempotency counters.
- Upstash QStash only for durable media-provider jobs.
- Mux for video.
- AWS SES for email.
- AWS S3 plus CloudFront as the future image-storage/CDN candidate in this
  model; Cloudinary remains the current implemented image provider until a
  separate migration is approved.
- Sentry for error/trace observability with controlled sampling.

## Official Source Slugs

These public sources were checked on June 30, 2026. Pricing is time-sensitive;
recheck before public package launch or annual financial planning.

| Source slug | Provider | Official source | Model use |
|---|---|---|---|
| `cloudflare-workers-pricing` | Cloudflare | `https://developers.cloudflare.com/workers/platform/pricing/` | Worker Paid base, request, and CPU model |
| `cloudflare-static-assets-billing` | Cloudflare | `https://developers.cloudflare.com/workers/static-assets/billing-and-limitations/` | Static asset requests and storage model |
| `vercel-pricing` | Vercel | `https://vercel.com/pricing` | Admin/backend platform baseline and overage awareness |
| `supabase-pricing` | Supabase | `https://supabase.com/pricing` | Pro base and compute/storage overage awareness |
| `upstash-redis-pricing` | Upstash Redis | `https://upstash.com/pricing/redis` | Rate-limit command cost model |
| `upstash-qstash-pricing` | Upstash QStash | `https://upstash.com/pricing/qstash` | Media job delivery-attempt cost model |
| `mux-pricing` | Mux | `https://www.mux.com/pricing` | Video input, storage, delivery, and resolution modifiers |
| `mux-pricing-docs` | Mux | `https://www.mux.com/docs/pricing/overview` | Pricing concepts and cost levers |
| `aws-ses-pricing` | AWS SES | `https://aws.amazon.com/ses/pricing/` | Outbound email send and attachment data price |
| `aws-s3-pricing` | AWS S3 | `https://aws.amazon.com/s3/pricing/` | Image object storage and request model |
| `aws-cloudfront-pricing` | AWS CloudFront | `https://aws.amazon.com/cloudfront/pricing/` | Image CDN delivery model |
| `sentry-pricing` | Sentry | `https://sentry.io/pricing/` | Plan baseline and data-volume cost awareness |
| `sentry-pricing-docs` | Sentry docs | `https://docs.sentry.io/pricing/` | Event/span/replay/log/attachment billing dimensions |

## Scenario Inputs

All scenarios assume `200` active stores.

| Scenario | Storefront pageviews/mo | Review-request emails/mo | Submitted reviews/mo | Image uploads/mo | Video uploads/mo |
|---|---:|---:|---:|---:|---:|
| Average | 10,000,000 | 400,000 | 20,000 | 10,000 | 2,000 |
| High | 20,000,000 | 2,000,000 | 100,000 | 50,000 | 10,000 |
| Ultra | 100,000,000 | 10,000,000 | 400,000 | 200,000 | 40,000 |
| Extreme | 200,000,000 | 20,000,000 | 1,000,000 | 500,000 | 100,000 |

Important boundaries:

- These are model inputs, not current production usage.
- Media costs depend heavily on encoded bytes, CDN cache hit ratio, image
  variant policy, video minutes, and playback minutes.
- Video cost should be modeled from Mux minutes, not raw upload count alone.
- Email cost should be modeled per recipient, not per campaign.
- Taxes, VAT, ikas commission, support labor, enterprise discounts, abuse
  spikes, and payment processor fees are excluded here.

## No-Quota Monthly Model

This version assumes no product-level caps for email, video upload, or video
playback beyond platform/provider safeguards.

| Scenario | Estimated monthly platform cost |
|---|---:|
| Average | `$146.54` |
| High | `$545.82` |
| Ultra | `$3,902.42` |
| Extreme | `$10,126.54` |

Interpretation:

- Average and high usage remain manageable under the current architecture.
- Ultra and extreme usage are dominated by media and high-volume delivery, not
  by Redis or QStash.
- Without package limits, a small number of high-volume stores can distort
  gross margin even when the widget CDN layer itself is cheap.

## Quota-Governed Monthly Model

Quota profiles below are product-packaging examples, not current product
commitments.

| Profile | Email allowance | Video upload allowance | Video playback allowance |
|---|---:|---:|---:|
| Strict | 2,000 emails/store/mo | 20 videos/store/mo | 200 video playback min/store/mo |
| Balanced | 5,000 emails/store/mo | 50 videos/store/mo | 500 video playback min/store/mo |
| Generous | 10,000 emails/store/mo | 100 videos/store/mo | 1,000 video playback min/store/mo |

| Scenario | Strict | Balanced | Generous |
|---|---:|---:|---:|
| Average | `$146.54` | `$146.54` | `$146.54` |
| High | `$351.26` | `$445.82` | `$545.82` |
| Ultra | `$2,455.06` | `$2,549.62` | `$2,787.22` |
| Extreme | `$6,733.58` | `$6,828.14` | `$7,065.74` |

Interpretation:

- Email and video allowances materially reduce high-volume exposure.
- Image and storefront CDN costs do not drop just because video/email are
  capped. Image cost needs image-specific controls: optimized variants, lazy
  loading, CDN/provider choice, bot protection, and fair-use language.
- The current Cloudflare Worker V2 storefront split remains the right default
  for script/read delivery cost. AWS CloudFront/S3 is useful for image CDN
  modeling and canary work, but it is not automatically cheaper for the current
  widget script graph.

## Competitor Media-Limit Interpretation

The canonical competitor page already records the public plan evidence:

- Judge.me's verified Shopify listing states unlimited product/store reviews
  and unlimited visual reviews.
- Loox does not primarily expose a public photo-count limit in the current wiki
  evidence; it gates by review request emails, order tiers, video availability,
  referrals/upsells, and plan level.
- Yotpo and Okendo also lean on order-tier, plan-tier, and enterprise/custom
  packaging rather than small visible per-photo caps.

Decision for Renuvex:

- Do not introduce small visible photo-count limits as the main cost-control
  mechanism. That would feel weaker than the competitor market and could hurt
  product positioning.
- Treat photo reviews as part of the base review value, controlled by technical
  media optimization and fair-use/abuse policy.
- Keep explicit quotas for cost-heavy or abuse-sensitive surfaces: review
  request email volume, video uploads, video playback minutes, and possibly
  very high media-gallery delivery at enterprise scale.
- Never market unlimited video without a Mux cost model and package-level
  guardrails.

## Product Packaging Direction

Recommended direction from this model:

1. Starter can include photo reviews without a small public photo-count cap.
2. Growth should expose practical email and video allowances because these map
   directly to provider cost.
3. Pro should use larger allowances, priority support, and advanced display
   modules rather than promising unlimited high-cost video.
4. Enterprise/custom should cover unusual image/video volume, high traffic,
   dedicated onboarding, and fair-use exceptions.

This mirrors competitor economics more closely than a naive "everything
unlimited" promise: make the visible package simple, avoid tiny photo caps, and
reserve hard limits for the features that create direct variable cost.

## Open Questions Before Public Pricing

1. Measure real image CDN bytes after moving images away from Cloudinary, if
   that migration is approved.
2. Measure Mux playback minutes per approved video review after real storefront
   traffic starts.
3. Decide whether email is bundled per plan, sold as an overage, or both.
4. Decide whether media fair-use language is enough for photos, or whether very
   high-volume stores need custom contracts.
5. Recheck competitor pricing pages before publishing comparison copy.

## Obsidian Links

- [[Competitor_Pricing_And_Plans]]
- [[Storefront_CDN_Cost_Model]]
- [[Upstash_Redis_QStash_Cost_Audit]]
- [[ADR_0032_Review_Video_On_Mux]]
