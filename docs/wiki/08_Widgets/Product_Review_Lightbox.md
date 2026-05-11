---
type: widget
project: ikas-review-app
status: active
created: 2026-05-10
updated: 2026-05-12
tags:
  - widget
  - reviews
  - lightbox
related:
  - "[[Index]]"
  - "[[Product_Review_Widget]]"
  - "[[Widget_Architecture]]"
  - "[[Bug_Review_Detail_Lightbox_Risks]]"
  - "[[Bug_Lightbox_Tablet_Viewport_And_Scroll]]"
  - "[[Bug_Cloud_Name_Silent_Image_Filter]]"
  - "[[Bug_Review_Image_Error_Fallback]]"
  - "[[Bug_Lightbox_Mobile_Pull_To_Refresh]]"
  - "[[Bug_Lightbox_Mobile_Review_Switch_Scroll_State]]"
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
- [[Bug_Lightbox_Tablet_Viewport_And_Scroll]]
- [[Bug_Cloud_Name_Silent_Image_Filter]]
- [[Bug_Review_Image_Error_Fallback]]
- [[Bug_Lightbox_Mobile_Pull_To_Refresh]]
- [[Bug_Lightbox_Mobile_Review_Switch_Scroll_State]]
- [[ADR_0006_Trusted_Review_Image_URL_Policy]]

## Notes
- This lightbox is not the multi-step review submission modal. The submission wizard lives under [review-form-modal/](src/widget/product-widget/review-form-modal/).
- The lightbox contract is photo-only. `openReviewModal` must no-op when the selected review has no valid image; text-only review detail should be handled by inline expansion or a separate text detail component.
- In the gallery layout, long photo-backed reviews still open this lightbox so the user sees the image, full comment, thumbnails, and merchant reply together. Long photo-less reviews expand inline inside the gallery card instead of opening a blank photo shell.
- Card, list, and gallery review layouts receive one canonical loaded review collection for the active sort/filter state. Initial render resets that collection; load-more appends to the same stable array reference so existing card click handlers can navigate across all currently loaded photo-backed reviews.
- The lightbox does not fetch additional review pages by itself. Previous/next navigation is intentionally scoped to reviews already loaded into the storefront widget for the current sort/filter state.
- Review text fields are written with `textContent`, which protects comment/title/reply rendering from direct HTML injection in this component.
- Image URLs are not accepted by generic prefixes. The lightbox uses `getTrustedReviewImages()`, which accepts only app-owned Cloudinary URLs from the configured cloud and `review_images` folder. The trusted cloud can come from `/api/public/settings`, the build-time public fallback, or the last-valid widget policy cache. This mirrors the server-side policy in [[ADR_0006_Trusted_Review_Image_URL_Policy]] and the reliability fix in [[Bug_Cloud_Name_Silent_Image_Filter]].
- If the active main image fails to load after passing the trusted URL policy, the `<img>` is hidden and a neutral in-modal placeholder is shown. Mini thumbnails use the standard thumbnail fallback and hide failed assets. Related bug: [[Bug_Review_Image_Error_Fallback]].
- Body scroll locking snapshots previous inline `html` / `body` scroll containment styles, body fixed-position fields, padding compensation, and scroll position before locking. Close restores the previous inline values and scroll position. Android/modern Chrome relies on root overflow plus `overscroll-behavior-y:none`; iOS/WebKit keeps fixed-body locking because that platform needs stronger background-scroll containment.
- Browser back support uses a widget-owned modal history state. Browser back closes the modal through `popstate`; normal UI close does not call `history.go(-1)` and only replaces the widget-owned state when it is still current.
- The lightbox wrapper exposes dialog semantics (`role="dialog"`, `aria-modal="true"`), moves focus into the modal on open, traps `Tab` / `Shift+Tab` inside the overlay, and restores previous focus on close.
- Responsive layout is split by modal readability, not only by a generic mobile breakpoint: `801px+` keeps the desktop two-column shell with the 438 px media column, `641px-800px` uses a stacked tablet/landscape shell with capped media height and full-width text, and `640px` and below keeps the fullscreen mobile shell.
- Mobile height uses a `100vh` fallback followed by `100svh` and `100dvh` so modern Android and iOS browsers can size the fullscreen shell against small/dynamic viewport units when browser chrome is visible or changing.
- Scroll containment is explicit on the overlay, desktop right panel, tablet wrapper, and mobile wrapper. While the modal is open, root `html` / `body` also receive `overscroll-behavior-y:none`; iOS/WebKit uses fixed-body locking so long-comment top-boundary pulls do not leak into page refresh.
- Switching between different reviews normalizes every lightbox scroll layer (`.ikr-modal-wrap`, `.ikr-modal-right`, and `.ikr-modal-scroll-content`) immediately and again after layout settles. This prevents stale long-review scroll state from carrying into a short-review lightbox view.

## Change Log
- 2026-05-12: Added review-switch scroll normalization and made fixed-body locking platform-aware. Related bug: [[Bug_Lightbox_Mobile_Review_Switch_Scroll_State]].
- 2026-05-12: Hardened mobile pull-to-refresh containment. The lightbox now snapshots/restores root scroll styles and scroll position and applies root `overscroll-behavior-y:none`. Related bug: [[Bug_Lightbox_Mobile_Pull_To_Refresh]].
- 2026-05-11: Documented K2 image error fallback. Main lightbox image failures now show a neutral placeholder while mini thumbnail failures hide the failed thumbnail. Related bug: [[Bug_Review_Image_Error_Fallback]].
- 2026-05-11: Updated image policy notes after adding build-time public cloud fallback and last-valid widget policy cache. Related bug: [[Bug_Cloud_Name_Silent_Image_Filter]].
- 2026-05-11: Documented the responsive lightbox contract after adding the 641-800 px stacked tablet shell, mobile viewport-unit fallback chain, and scroll containment updates in [styles.js](src/widget/themes/ozy/styles.js). Related bug: [[Bug_Lightbox_Tablet_Viewport_And_Scroll]].
- 2026-05-11: Documented lightbox accessibility hardening after adding dialog semantics, focus trap, thumbnail keyboard activation, and focus restore. Related bug: [[Bug_Lightbox_Focus_Trap_Accessibility]].
- 2026-05-11: Closed the card/list/gallery page-slice navigation risk by documenting the canonical loaded review collection in [state.js](src/widget/core/state.js) and [render.js](src/widget/product-widget/render.js). Related bug note: [[Bug_Review_Detail_Lightbox_Risks]].
- 2026-05-11: Updated body scroll lock and history handling notes after hardening [review-modal.js](src/widget/product-widget/review-modal.js). Related bug note: [[Bug_Review_Detail_Lightbox_Risks]].
- 2026-05-10: Updated the lightbox image trust contract after implementing the shared trusted Cloudinary URL policy. Related ADR: [[ADR_0006_Trusted_Review_Image_URL_Policy]].
- 2026-05-10: Documented the photo-only lightbox contract after fixing the gallery photo-less read-more path and adding an empty-image guard in [review-modal.js](src/widget/product-widget/review-modal.js). Related bug note: [[Bug_Review_Detail_Lightbox_Risks]].
- 2026-05-10: Created this page to document the existing photo review detail lightbox separately from the review submission wizard after a technical audit found the two were conflated in the wiki. Related source: [review-modal.js](src/widget/product-widget/review-modal.js), [styles.js](src/widget/themes/ozy/styles.js), related bug note: [[Bug_Review_Detail_Lightbox_Risks]].
