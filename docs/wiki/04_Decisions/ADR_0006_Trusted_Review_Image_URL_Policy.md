---
type: decision
project: ikas-review-app
status: active
created: 2026-05-10
updated: 2026-05-18
tags:
  - adr
  - security
  - widget
  - images
related:
  - "[[Decision_Index]]"
  - "[[Security_And_Rate_Limits]]"
  - "[[Product_Review_Lightbox]]"
  - "[[ADR_0008_Cloud_Name_Build_Time_Only]]"
  - "[[Bug_Cloud_Name_Silent_Image_Filter]]"
---

# ADR_0006 - Trusted Review Image URL Policy

## Status
Accepted

## Date
2026-05-10

## Context
Review images are submitted from the storefront through a public API. Before this decision, the public review POST accepted any `images` array and the widget display layer accepted broad URL prefixes such as `https://` and `data:image/`. With auto-approve enabled, a malicious review could make storefront visitors load a third-party tracking image.

## Decision
Review image URLs are trusted only when they match the configured Cloudinary cloud and the signed upload output shape:

- HTTPS only.
- Host exactly `res.cloudinary.com`.
- Cloud name exactly from `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` or `CLOUDINARY_CLOUD_NAME`.
- Path under `/<cloudName>/image/upload/v<digits>/review_images/stores/<storeId>/...`.
- Raster extension in `jpg`, `jpeg`, `png`, `webp`, `gif`, or `avif`.
- No credentials, port, query string, hash, or encoded slash/backslash.
- Maximum 3 URLs per review.

The server rejects untrusted image URLs on public review submission and filters legacy stored image data before public or admin responses. The widget receives the trusted cloud name as a build-time constant injected by [scripts/build-widget.mjs](scripts/build-widget.mjs) (see [[ADR_0008_Cloud_Name_Build_Time_Only]]) and uses the same allowlist before rendering review photos or opening the photo lightbox. The cloud name is no longer threaded through the settings response, an `imagePolicy` field, or any runtime cache; ADR_0008 supersedes that portion of the runtime contract.

Preview fixtures may use `placehold.co` images only when `window.__ikasPreviewMode === true`; this exception is not active on storefronts.

## Reasoning
The durable boundary must be server-side because public storefront clients are not trusted. The widget-side filter is still needed as defense in depth and to protect cached or legacy rows. Restricting to the app-owned, tenant-scoped Cloudinary upload folder removes the third-party tracking-image class and prevents cross-tenant storage mixing without changing the direct-upload architecture.

## Alternatives Considered
- **Keep prefix checks and rely on moderation** - rejected because auto-approve can publish a tracking image before a moderator sees it.
- **Proxy all review images through the app server** - rejected for now because it adds bandwidth, caching, and latency costs while Cloudinary already provides an image CDN.
- **Store Cloudinary public IDs instead of URLs immediately** - stronger long-term model, but requires a data migration and admin/UI contract changes. The accepted policy keeps the current `Review.images` storage shape while strictly validating URLs.

## Consequences
- Storefronts no longer render third-party review image URLs or `data:image` payloads.
- If Cloudinary cloud config is missing everywhere, no-image reviews still work and image rendering fails closed with an explicit error log. If settings alone omits the cloud name, the widget can keep rendering app-owned images from the build-time public fallback or the last-valid cached policy.
- Legacy DB rows with invalid image URLs are silently exposed as `images: []` in read APIs.
- Any future review-image feature must use [src/lib/review-images.ts](src/lib/review-images.ts) and widget `getTrustedReviewImages()` instead of ad hoc URL prefix checks.

## Related Source Files
- [src/lib/review-images.ts](src/lib/review-images.ts)
- [src/app/api/public/reviews/route.ts](src/app/api/public/reviews/route.ts)
- [src/app/api/public/settings/route.ts](src/app/api/public/settings/route.ts)
- [src/app/api/public/upload/sign/route.ts](src/app/api/public/upload/sign/route.ts)
- [src/widget/core/helpers.js](src/widget/core/helpers.js)
- [src/widget/product-widget/review-form-modal/steps/step-photos.js](src/widget/product-widget/review-form-modal/steps/step-photos.js)
- [src/widget/product-widget/review-modal.js](src/widget/product-widget/review-modal.js)
- [next.config.js](next.config.js)

## Related Notes
- [[Decision_Index]]
- [[Security_And_Rate_Limits]]
- [[API_Design]]
- [[Product_Review_Lightbox]]
- [[Bug_Review_Detail_Lightbox_Risks]]
- [[Bug_Cloud_Name_Silent_Image_Filter]]
- [[ADR_0008_Cloud_Name_Build_Time_Only]]

## Change Log
- 2026-05-18: D3 tightened the trusted image URL shape from global `review_images/...` to tenant-scoped `review_images/stores/<storeId>/...`. `/api/public/upload/sign`, `/api/public/upload/register`, public review submit/read paths, admin read paths, and widget-side filtering now all validate the tenant folder.
- 2026-05-11: Runtime portion of the cloud-name contract superseded by [[ADR_0008_Cloud_Name_Build_Time_Only]]. The widget no longer reads `imagePolicy.cloudName` from settings or any per-store cache; it consumes a build-time injected constant only. The trust boundary (allowlist shape, max URLs, etc.) is unchanged.
- 2026-05-11: Documented build-time public cloud fallback and last-valid widget image policy cache as resilience sources for the accepted allowlist. Related bug: [[Bug_Cloud_Name_Silent_Image_Filter]]. (Superseded the same day by ADR_0008 — runtime cache + setter + settings field all removed in favor of a single build-time source.)
