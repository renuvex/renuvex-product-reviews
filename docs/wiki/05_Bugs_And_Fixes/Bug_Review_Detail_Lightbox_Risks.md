---
type: bug
project: ikas-review-app
status: active
created: 2026-05-10
updated: 2026-05-10
tags:
  - bug
  - widget
  - lightbox
  - security
related:
  - "[[Bug_Index]]"
  - "[[Product_Review_Lightbox]]"
  - "[[Security_And_Rate_Limits]]"
---

# Bug - Review Detail Lightbox Risks

## Date
2026-05-10

## Status
Open - partial fix applied on 2026-05-10

## Area
Widget, Public API, Storefront UX

## Symptoms
Fixed in the 2026-05-10 widget pass:
- Gallery long-text "read more" no longer opens the photo detail lightbox for reviews without a valid image.
- `openReviewModal` no longer creates a modal when the selected review has no valid image.
- Public review POST now rejects untrusted third-party or `data:image` review image URLs.
- Public/admin read paths and widget render paths now filter legacy review images through the trusted Cloudinary URL policy.

Still open:
- Lightbox previous/next navigation is limited to the review slice passed by the caller, not a full loaded review collection.
- Body scroll lock overwrites inline `body.style.overflow` and `body.style.paddingRight` without restoring previous inline values.
- Modal open/close pushes a fake history state and closes with `history.go(-1)`, which can conflict with storefront SPA history behavior.

## Root Cause
- Fixed root cause: [gallery/index.js](src/widget/review-layouts/gallery/index.js) opened the detail lightbox for "read more" even when the review had no valid image.
- Fixed root cause: [review-modal.js](src/widget/product-widget/review-modal.js) assumed the caller was opening a photo-backed review and did not guard an empty image list before creating the main image.
- Fixed root cause: [route.ts](src/app/api/public/reviews/route.ts) persisted `images` arrays without host allowlisting or normalizing them to known Cloudinary assets.
- Fixed root cause: widget image display used ad hoc URL prefix checks instead of a single trusted review image helper.
- [render.js](src/widget/product-widget/render.js) passes the current `reviews` page or `moreData.data.reviews` page slice to lightbox calls.
- [review-modal.js](src/widget/product-widget/review-modal.js) directly clears body inline styles on close instead of restoring captured previous values.

## Fix
Partially fixed:
- [gallery/index.js](src/widget/review-layouts/gallery/index.js) now derives `hasMedia` from the first valid image URL, opens the lightbox only for photo-backed reviews, and uses inline expand/collapse for photo-less long comments and replies.
- [review-modal.js](src/widget/product-widget/review-modal.js) now centralizes valid image filtering, returns early when the review has no valid image, and normalizes missing `clickedUrl` to photo index `0`.
- [src/lib/review-images.ts](src/lib/review-images.ts) defines the server-side trusted Cloudinary URL policy for review images.
- [route.ts](src/app/api/public/reviews/route.ts) rejects untrusted image payloads on POST and filters legacy stored images on GET.
- [helpers.js](src/widget/core/helpers.js) exposes `getTrustedReviewImages()` and `getFirstTrustedReviewImage()` so all storefront renderers share the same policy.
- [public/widget.js](public/widget.js) was regenerated with `pnpm build:widget`.

Remaining recommended direction:
- Pass a canonical loaded-review collection to all lightbox entry points, including load-more additions.
- Snapshot and restore previous inline body scroll styles.
- Replace or harden history-state handling so close behavior does not trigger unintended storefront navigation.

## Files Changed
- [gallery/index.js](src/widget/review-layouts/gallery/index.js)
- [review-modal.js](src/widget/product-widget/review-modal.js)
- [review-images.ts](src/lib/review-images.ts)
- [route.ts](src/app/api/public/reviews/route.ts)
- [helpers.js](src/widget/core/helpers.js)
- [widget.js](public/widget.js)
- Documentation updates under `docs/wiki`.

## Prevention
- Add widget preview/manual test cases for gallery long-text reviews with no images, load-more photo navigation, and nested storefront scroll locks.
- Add API validation tests for `images` payloads that include third-party HTTPS URLs and data URLs.
- Keep [[Product_Review_Lightbox]] distinct from the review submission wizard in docs and code review checklists.

## Change Log
- 2026-05-10: Fixed the review image URL trust boundary by rejecting third-party/data image URLs on public POST and filtering read/widget render paths through the trusted Cloudinary policy. Related ADR: [[ADR_0006_Trusted_Review_Image_URL_Policy]].
- 2026-05-10: Partially fixed the photo-less gallery read-more path and added an empty-image guard to the photo detail lightbox. Remaining risks at that point were paged navigation, image URL allowlisting, body scroll restoration, and history-state handling.

## Related Notes
- [[Product_Review_Lightbox]]
- [[Security_And_Rate_Limits]]
- [[Debugging_Notes]]
- [[Bug_Index]]
