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
  - images
  - cloudflare
  - aws
  - cloudfront
  - r2
related:
  - "[[Review_App_Monthly_Cost_Model]]"
  - "[[Storefront_CDN_Cost_Model]]"
  - "[[ADR_0006_Trusted_Review_Image_URL_Policy]]"
  - "[[ADR_0029_Review_Media_Metadata]]"
source_files:
  - "docs/wiki/10_Research/Review_App_Monthly_Cost_Model.md"
  - "docs/wiki/10_Research/Storefront_CDN_Cost_Model.md"
  - "src/lib/review-images.ts"
  - "src/widget/core/helpers.js"
---

# Review Image CDN Cost Model

This page records the June 30, 2026 evidence-backed image CDN/storage cost
comparison for a future review-image provider decision. It compares AWS
S3/CloudFront against Cloudflare Images and Cloudflare R2 plus Cloudflare Image
Transformations.

This is **not** a migration decision. The current implemented provider remains
Cloudinary until a separate image-provider migration is approved.

## Scope

Compared surfaces: AWS S3 Standard plus CloudFront, the public AWS CloudFront
flat-rate plan table where allowances fit, Cloudflare Images hosted
storage/delivery, and Cloudflare R2 plus Image Transformations.

Excluded: taxes, VAT, ikas commission, enterprise discounts, support plans,
abuse/bot traffic, WAF add-ons, logs, analytics exports, migration labor, and
current Cloudinary plan cost. Real invoices still depend on actual bytes, cache
hit ratio, variant count, browser cache, and provider discounts.

## Official Pricing Inputs

All pricing sources below were checked on June 30, 2026. Recheck before public
pricing, annual planning, or a production image-provider migration.

| Source slug | Provider | Official source | Values used |
|---|---|---|---|
| `cloudflare-images-pricing` | Cloudflare Images | `https://developers.cloudflare.com/images/pricing/` | Paid plan: first `5,000` Images Transformed included, then `$0.50 / 1,000`; hosted Images Stored `$5 / 100,000 images`; hosted Images Delivered `$1 / 100,000 images` |
| `cloudflare-r2-pricing` | Cloudflare R2 | `https://developers.cloudflare.com/r2/pricing/` | Standard storage `$0.015 / GB-month`; Class A `$4.50 / million`; Class B `$0.36 / million`; internet egress has no R2 egress charge |
| `aws-s3-pricing` | AWS S3 | `https://aws.amazon.com/s3/pricing/` and AWS Price List API | Frankfurt S3 Standard storage `$0.0245 / GB-month`; PUT/COPY/POST/LIST `$5.40 / million`; GET and other requests `$0.43 / million` |
| `aws-cloudfront-pricing` | AWS CloudFront | `https://aws.amazon.com/cloudfront/pricing/` and AWS Price List API | EU HTTPS requests `$1.20 / million`; EU data transfer out first `10 TB` `$0.085 / GB`, next `40 TB` `$0.080 / GB`, then lower public tiers |
| `aws-cloudfront-plans` | AWS CloudFront | `https://aws.amazon.com/cloudfront/pricing/` | Public Free/Pro/Business/Premium plan table used as a flat-rate candidate where traffic fits the listed allowance |

AWS Price List API evidence used:

| AWS service | SKU | Usage type | Price used |
|---|---|---|---:|
| CloudFront | `YA5QZD7XG45UGHCH` | `EU-Requests-Tier2-HTTPS` | `$0.0000012/request` |
| CloudFront | `VU3485RNDU6HBQF6` | `EU-DataTransfer-Out-Bytes` | `$0.085/GB` first `10 TB`, `$0.080/GB` next `40 TB`, then lower tiers |
| S3 | `NRYRNCXF5TWHB476` | `EUC1-TimedStorage-ByteHrs` | `$0.0245/GB-month` |
| S3 | `F5832W93RMW27RD7` | `EUC1-Requests-Tier1` | `$0.0000054/request` |
| S3 | `TUSXZSTYY6YJH244` | `EUC1-Requests-Tier2` | `$0.00000043/request` |

## Model Inputs

The scenario is intentionally high-volume:

| Input | Value |
|---|---:|
| Storefront pageviews per store per month | `100,000` |
| Review images rendered per pageview | `6` |
| Optimized delivered image size | `80 KB` |
| Stored review images per store | `10,000` |
| New image uploads per store per month | `500` |
| Cloudflare R2 source object size | `1.0 MB/image` |
| AWS S3 stored footprint | `1.4 MB/image` |
| Active popular image variants per store/month | `1,000 images * 3 variants` |
| Active wide image variants per store/month | `10,000 images * 3 variants` |

The two Cloudflare R2 plus Transformations rows model different reuse patterns:
`popular` means a smaller active image set receives most traffic; `wide` means
many unique images are transformed in the same billing period. This distinction
matters because transformation cost is driven by unique transformed variants,
while hosted Cloudflare Images is driven by delivered image count.

## Monthly Cost Table

The table below was generated with a local Python calculation script. Arithmetic
was not done manually.

| Stores | Image deliveries/mo | Delivered data/mo | Stored images | Cloudflare Images hosted | Cloudflare R2 + Images popular | Cloudflare R2 + Images wide | AWS S3 + CloudFront PAYG | AWS CloudFront flat-rate candidate |
|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| `100` | `60M` | `4.8 TB` | `1.0M` | `$650.00` | `$162.35` | `$1,512.35` | `$415.53` | `$209.21 (Business)` |
| `200` | `120M` | `9.6 TB` | `2.0M` | `$1,300.00` | `$327.35` | `$3,027.35` | `$930.10` | `$243.51 (Business)` |
| `300` | `180M` | `14.4 TB` | `3.0M` | `$1,950.00` | `$492.35` | `$4,542.35` | `$1,428.99` | `$1,000.00 (Premium)` |
| `400` | `240M` | `19.2 TB` | `4.0M` | `$2,600.00` | `$657.35` | `$6,058.07` | `$1,919.56` | `$1,011.76 (Premium)` |
| `500` | `300M` | `24.0 TB` | `5.0M` | `$3,250.00` | `$822.35` | `$7,574.15` | `$2,410.13` | `$1,046.06 (Premium)` |
| `1,000` | `600M` | `48.0 TB` | `10.0M` | `$6,500.00` | `$1,647.35` | `$15,154.55` | `$4,742.66` | `Custom / over public allowance` |
| `2,000` | `1.2B` | `96.0 TB` | `20.0M` | `$13,000.00` | `$3,297.35` | `$30,315.35` | `$8,688.36` | `Custom / over public allowance` |

## Interpretation

There is no single universal winner. The answer depends on the product shape.

### Provider Notes

- **Cloudflare Images hosted** is operationally simple, but expensive at high
  delivery volume because delivery is priced directly. In this model it costs
  `$10` per `1M` image deliveries before storage effects.
- **Cloudflare R2 plus Image Transformations** is the strongest cost candidate
  when the same variants are reused many times. The model's break-even is about
  `50` deliveries per transformed variant per month versus hosted Images
  delivery pricing. The `wide` row shows the opposite risk: broad-catalog
  monthly transformations can become expensive.
- **AWS S3 plus CloudFront PAYG** is cheaper than hosted Cloudflare Images here,
  but more expensive than R2 plus Transformations in the `popular` reuse case.
  For `1M` deliveries at `80 KB`, before free-tier effects, modeled EU delivery
  is about `$8.00`: `$1.20` HTTPS requests plus `$6.80` data transfer.
- **AWS CloudFront flat-rate plans** can be very competitive when traffic fits
  the public allowance. Treat them as candidate pricing until purchase terms,
  custom pricing, and bundled security/storage details are verified.

## Decision Guidance

Current recommendation:

1. Do not migrate image storage/CDN only from this model. The current production
   image provider remains Cloudinary until a separate migration is approved.
2. Before any migration, measure real Cloudinary image delivery bytes, request
   count, variant count, and active-image reuse from production-like traffic.
3. If cost is the primary driver, prototype Cloudflare R2 plus Image
   Transformations first because it is the best fit for repeated review-image
   variants.
4. Keep AWS S3 plus CloudFront as a valid alternative, especially if the
   CloudFront flat-rate plan fits the final traffic shape.
5. Avoid Cloudflare Images hosted as the default high-volume design unless its
   operational simplicity matters more than delivery cost.

## Product Packaging Implication

Competitor evidence does not support small visible photo-count limits as the
main product lever. Keep photo reviews as base value; control cost through
optimized variants, lazy loading, provider choice, cache reuse, abuse controls,
and fair-use language. Put hard visible limits on video/email before ordinary
photo reviews.

## Open Questions

1. Measure real current Cloudinary image delivery bytes and request counts.
2. Estimate real active-image reuse: how many unique review images are actually
   transformed/viewed per store per month?
3. Decide whether Renuvex needs a custom image pipeline before public launch or
   whether Cloudinary remains acceptable until real usage proves otherwise.
4. If AWS remains a candidate, verify flat-rate plan contract details before
   assuming the public table maps directly to Renuvex production traffic.

## Obsidian Links

- [[Review_App_Monthly_Cost_Model]]
- [[Storefront_CDN_Cost_Model]]
- [[ADR_0006_Trusted_Review_Image_URL_Policy]]
- [[ADR_0029_Review_Media_Metadata]]
