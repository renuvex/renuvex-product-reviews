---
type: bug
project: ikas-review-app
status: active
created: 2026-05-10
updated: 2026-05-11
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
Fixed - all known audit risks closed on 2026-05-11

## Area
Widget, Public API, Storefront UX

## Symptoms
Fixed in the 2026-05-10 widget pass:
- Gallery long-text "read more" no longer opens the photo detail lightbox for reviews without a valid image.
- `openReviewModal` no longer creates a modal when the selected review has no valid image.
- Public review POST now rejects untrusted third-party or `data:image` review image URLs.
- Public/admin read paths and widget render paths now filter legacy review images through the trusted Cloudinary URL policy.

Fixed in the 2026-05-11 lightbox pass:
- Body scroll lock now restores the previous inline `overflow` and `padding-right` values, including inline priority.
- Normal modal close no longer calls `history.go(-1)`. It closes locally and only replaces the widget-owned modal history state when that state is still the current entry.
- Card/list/gallery previous/next navigation now uses one canonical loaded review collection for the active sort/filter state instead of the caller's current page slice.

## Root Cause
- Fixed root cause: [gallery/index.js](src/widget/review-layouts/gallery/index.js) opened the detail lightbox for "read more" even when the review had no valid image.
- Fixed root cause: [review-modal.js](src/widget/product-widget/review-modal.js) assumed the caller was opening a photo-backed review and did not guard an empty image list before creating the main image.
- Fixed root cause: [route.ts](src/app/api/public/reviews/route.ts) persisted `images` arrays without host allowlisting or normalizing them to known Cloudinary assets.
- Fixed root cause: widget image display used ad hoc URL prefix checks instead of a single trusted review image helper.
- Fixed root cause: [render.js](src/widget/product-widget/render.js) passed the current `reviews` page or `moreData.data.reviews` page slice to lightbox calls instead of one canonical loaded collection.
- Fixed root cause: [review-modal.js](src/widget/product-widget/review-modal.js) directly cleared body inline styles on close instead of restoring captured previous values.
- Fixed root cause: [review-modal.js](src/widget/product-widget/review-modal.js) unconditionally called `history.go(-1)` on modal close.

## Fix
Fixed:
- [gallery/index.js](src/widget/review-layouts/gallery/index.js) now derives `hasMedia` from the first valid image URL, opens the lightbox only for photo-backed reviews, and uses inline expand/collapse for photo-less long comments and replies.
- [review-modal.js](src/widget/product-widget/review-modal.js) now centralizes valid image filtering, returns early when the review has no valid image, and normalizes missing `clickedUrl` to photo index `0`.
- [src/lib/review-images.ts](src/lib/review-images.ts) defines the server-side trusted Cloudinary URL policy for review images.
- [route.ts](src/app/api/public/reviews/route.ts) rejects untrusted image payloads on POST and filters legacy stored images on GET.
- [helpers.js](src/widget/core/helpers.js) exposes `getTrustedReviewImages()` and `getFirstTrustedReviewImage()` so all storefront renderers share the same policy.
- [review-modal.js](src/widget/product-widget/review-modal.js) now snapshots and restores body inline scroll styles before and after modal lock.
- [review-modal.js](src/widget/product-widget/review-modal.js) now separates browser-back close from UI close: back consumes the modal popstate, while UI close avoids `history.go(-1)` and only replaces a still-current widget-owned modal state.
- [state.js](src/widget/core/state.js) now stores `loadedLightboxReviews` as a stable array reference with reset/append helpers.
- [render.js](src/widget/product-widget/render.js) resets `loadedLightboxReviews` on full render and appends load-more results before rendering new cards, so all existing and new card/list/gallery handlers receive the same loaded collection.
- [review-layouts/index.js](src/widget/review-layouts/index.js) documents the layout contract as the active sort/filter loaded collection instead of the active page slice.
- [public/widget.js](public/widget.js) was regenerated with `pnpm build:widget`.

## Files Changed
- [gallery/index.js](src/widget/review-layouts/gallery/index.js)
- [review-modal.js](src/widget/product-widget/review-modal.js)
- [state.js](src/widget/core/state.js)
- [render.js](src/widget/product-widget/render.js)
- [review-layouts/index.js](src/widget/review-layouts/index.js)
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
- 2026-05-11: Closed the remaining canonical loaded-review navigation risk for card/list/gallery by adding `loadedLightboxReviews` state and passing the stable loaded collection to review layout modal handlers.
- 2026-05-11: Fixed body scroll restoration and hardened modal history handling. At that point, canonical loaded-review navigation for card/list/gallery entry points was still open.
- 2026-05-10: Fixed the review image URL trust boundary by rejecting third-party/data image URLs on public POST and filtering read/widget render paths through the trusted Cloudinary policy. Related ADR: [[ADR_0006_Trusted_Review_Image_URL_Policy]].
- 2026-05-10: Partially fixed the photo-less gallery read-more path and added an empty-image guard to the photo detail lightbox. Remaining risks at that point were paged navigation, image URL allowlisting, body scroll restoration, and history-state handling.

## Related Notes
- [[Product_Review_Lightbox]]
- [[Security_And_Rate_Limits]]
- [[Debugging_Notes]]
- [[Bug_Index]]
