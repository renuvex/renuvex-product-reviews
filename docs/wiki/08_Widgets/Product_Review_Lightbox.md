---
type: widget
project: ikas-review-app
status: active
created: 2026-05-10
updated: 2026-05-11
tags:
  - widget
  - reviews
  - lightbox
related:
  - "[[Index]]"
  - "[[Product_Review_Widget]]"
  - "[[Widget_Architecture]]"
  - "[[Bug_Review_Detail_Lightbox_Risks]]"
  - "[[ADR_0006_Trusted_Review_Image_URL_Policy]]"
---

# Product Review Lightbox

## Summary
The product review lightbox is the photo review detail modal opened from review images and the photo strip. It is separate from the review submission wizard. The lightbox shows the selected review image, thumbnails for the current review, previous/next navigation across photo reviews, review metadata, full comment text, and merchant reply.

## Related Source Files
- [review-modal.js](src/widget/product-widget/review-modal.js) - photo review detail lightbox.
- [styles.js](src/widget/themes/ozy/styles.js) - `.ikr-modal-*` layout, desktop/mobile responsive behavior, scroll containers, and modal controls.
- [render.js](src/widget/product-widget/render.js) - review layout and photo strip entry points that call `openReviewModal`.
- [state.js](src/widget/core/state.js) - canonical loaded review collection used by review layout lightbox navigation.
- [gallery/index.js](src/widget/review-layouts/gallery/index.js) - gallery layout entry points for images and long-text "read more" behavior.
- [helpers.js](src/widget/core/helpers.js) - trusted review image helpers used before rendering or opening the lightbox.

## Obsidian Links
- [[Product_Review_Widget]]
- [[Widget_Architecture]]
- [[Widget_Files_Map]]
- [[Security_And_Rate_Limits]]
- [[Bug_Review_Detail_Lightbox_Risks]]
- [[ADR_0006_Trusted_Review_Image_URL_Policy]]

## Notes
- This lightbox is not the multi-step review submission modal. The submission wizard lives under [review-form-modal/](src/widget/product-widget/review-form-modal/).
- The lightbox contract is photo-only. `openReviewModal` must no-op when the selected review has no valid image; text-only review detail should be handled by inline expansion or a separate text detail component.
- In the gallery layout, long photo-backed reviews still open this lightbox so the user sees the image, full comment, thumbnails, and merchant reply together. Long photo-less reviews expand inline inside the gallery card instead of opening a blank photo shell.
- Card, list, and gallery review layouts receive one canonical loaded review collection for the active sort/filter state. Initial render resets that collection; load-more appends to the same stable array reference so existing card click handlers can navigate across all currently loaded photo-backed reviews.
- The lightbox does not fetch additional review pages by itself. Previous/next navigation is intentionally scoped to reviews already loaded into the storefront widget for the current sort/filter state.
- Review text fields are written with `textContent`, which protects comment/title/reply rendering from direct HTML injection in this component.
- Image URLs are not accepted by generic prefixes. The lightbox uses `getTrustedReviewImages()`, which accepts only app-owned Cloudinary URLs from the configured cloud and `review_images` folder. This mirrors the server-side policy in [[ADR_0006_Trusted_Review_Image_URL_Policy]].
- Body scroll locking snapshots previous inline `overflow` and `padding-right` values, including inline priority, before locking body scroll. Close restores the exact previous inline values.
- Browser back support uses a widget-owned modal history state. Browser back closes the modal through `popstate`; normal UI close does not call `history.go(-1)` and only replaces the widget-owned state when it is still current.
- Mobile layout uses a full-height modal shell and page-level scrolling through `.ikr-modal-wrap`; desktop scroll is contained in `.ikr-modal-right`.

## Change Log
- 2026-05-11: Closed the card/list/gallery page-slice navigation risk by documenting the canonical loaded review collection in [state.js](src/widget/core/state.js) and [render.js](src/widget/product-widget/render.js). Related bug note: [[Bug_Review_Detail_Lightbox_Risks]].
- 2026-05-11: Updated body scroll lock and history handling notes after hardening [review-modal.js](src/widget/product-widget/review-modal.js). Related bug note: [[Bug_Review_Detail_Lightbox_Risks]].
- 2026-05-10: Updated the lightbox image trust contract after implementing the shared trusted Cloudinary URL policy. Related ADR: [[ADR_0006_Trusted_Review_Image_URL_Policy]].
- 2026-05-10: Documented the photo-only lightbox contract after fixing the gallery photo-less read-more path and adding an empty-image guard in [review-modal.js](src/widget/product-widget/review-modal.js). Related bug note: [[Bug_Review_Detail_Lightbox_Risks]].
- 2026-05-10: Created this page to document the existing photo review detail lightbox separately from the review submission wizard after a technical audit found the two were conflated in the wiki. Related source: [review-modal.js](src/widget/product-widget/review-modal.js), [styles.js](src/widget/themes/ozy/styles.js), related bug note: [[Bug_Review_Detail_Lightbox_Risks]].
