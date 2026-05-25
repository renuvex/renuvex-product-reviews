---
type: bug
project: renuvex-product-reviews
status: active
created: 2026-05-11
updated: 2026-05-11
tags:
  - bug
  - widget
  - reliability
  - observability
related:
  - "[[Bug_Index]]"
  - "[[Photo_Strip]]"
  - "[[ADR_0006_Trusted_Review_Image_URL_Policy]]"
  - "[[Caching_And_Performance]]"
---

# Bug - cloudName Silent Image Filter (K3)

## Date
2026-05-11

## Status
Fixed (hardened on 2026-05-11; structurally closed on 2026-05-11 by [[ADR_0008_Cloud_Name_Build_Time_Only]])

## Area
Widget, Reliability, Review Images, Public Settings

## Symptoms
The storefront widget accepts review image URLs only when they match the trusted Cloudinary image policy. Before the fix, that policy depended on `/api/public/settings` returning `imagePolicy.cloudName` during the current session.

If `imagePolicy.cloudName` was missing or invalid, `getTrustedReviewImages()` returned an empty array for every review image. Review text could still render, but the photo strip, card/list/gallery thumbnails, and photo lightbox entry points disappeared.

There is one important nuance: if `/api/public/settings` returned no response at all and no stale settings existed, product review widget bootstrap could return early. In that case the impact was broader than photo loss. The pure K3 image-loss scenario is a settings response that still contains usable widget settings but lacks a valid image policy.

## Example Before
1. `/api/public/settings` returns `200` with widget settings but `imagePolicy.cloudName: null`.
2. `/api/public/reviews` returns approved reviews with valid app-owned Cloudinary URLs.
3. `helpers.js` has no trusted cloud name, so `isTrustedReviewImageUrl()` rejects every image URL.
4. Product reviews still show text, ratings, dates, and replies.
5. All review images silently disappear from strip, cards, list/gallery layouts, and the lightbox.

## Root Cause
- [helpers.js](src/widget/core/helpers.js) initialized the trusted review image cloud name as `null` and accepted only runtime settings as the source of truth.
- [bootstrap.js](src/widget/product-widget/bootstrap.js) kept settings in a short-lived cache and did not keep image policy as a separate durable contract.
- Expired stale settings were cleared before a network retry finished, weakening outage tolerance.
- [settings/route.ts](src/app/api/public/settings/route.ts) returned `imagePolicy.cloudName` but did not log when the server-side Cloudinary cloud config was missing.

## Fix
- [scripts/build-widget.mjs](scripts/build-widget.mjs) now injects the public Cloudinary cloud name into the widget bundle at build time. This value is not a secret; the public settings endpoint already exposes it as part of the image allowlist contract.
- [helpers.js](src/widget/core/helpers.js) initializes trusted image policy from the build-time fallback, preserves the last valid cloud name when a later invalid value arrives, and emits a one-time explicit error if no policy is available.
- [helpers.js](src/widget/core/helpers.js) keeps the build-time public Cloudinary cloud name as the durable fallback and tolerates transient settings outages without a legacy image-policy cache.
- [settings/route.ts](src/app/api/public/settings/route.ts) logs a one-time server error when the configured Cloudinary cloud name is missing and adds `stale-if-error=604800` to the public settings cache header.
- [public/widget.js](public/widget.js) was regenerated with `pnpm build:widget`.

## Example After
1. `/api/public/settings` returns widget settings but `imagePolicy.cloudName: null`.
2. The widget keeps using the build-time public cloud name or the last valid cached image policy.
3. App-owned Cloudinary review images still render.
4. Third-party image URLs are still rejected; the fix does not fail open.
5. If no trusted policy exists anywhere, the widget hides images fail-closed and logs an explicit one-time error instead of silently losing images.

## Files Changed
- [scripts/build-widget.mjs](scripts/build-widget.mjs)
- [helpers.js](src/widget/core/helpers.js)
- [bootstrap.js](src/widget/product-widget/bootstrap.js)
- [settings/route.ts](src/app/api/public/settings/route.ts)
- [widget.js](public/widget.js)
- Documentation updates under `docs/wiki`.

## Verification
- Ran widget build after injecting the policy fallback.
- Ran headless Chrome smoke test with a fake storefront where settings returned `imagePolicy.cloudName: null` and reviews returned a valid app Cloudinary URL. The widget rendered and the trusted review image appeared.

## Prevention
- Keep review image URL checks fail-closed. Never bypass `getTrustedReviewImages()` to recover images.
- Treat `imagePolicy.cloudName` as a durable runtime contract: build-time fallback, last-valid widget cache, and settings response can all provide it, but invalid or third-party values must not be accepted.
- Add synthetic storefront monitoring for at least one product with a trusted review image.

## Related Notes
- [[Photo_Strip]]
- [[ADR_0006_Trusted_Review_Image_URL_Policy]]
- [[Caching_And_Performance]]
- [[Bug_Index]]

## Change Log
- 2026-05-11: **Structurally closed** by [[ADR_0008_Cloud_Name_Build_Time_Only]]. The runtime sources that could fail (`imagePolicy.cloudName` settings field, per-store localStorage cache, `setTrustedReviewImageCloudName` setter, `warnMissingReviewImagePolicy` runtime helper) were all removed. Cloud name now has a single build-time source. K3 cannot recur as long as the widget bundle is built with a valid `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` — verified at build time and at module load.
- 2026-05-11: Initial fix added build-time public cloud fallback, durable widget-side image policy cache, one-time missing-policy logging, 7-day stale settings tolerance, and public settings `stale-if-error`. (Superseded later the same day by ADR_0008 — defensive runtime layers became redundant once cloud name became build-time-only.)
- 2026-05-11: Page created during photo strip refactor analysis for a silent image filtering failure category.
