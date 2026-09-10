---
type: widget
project: renuvex-product-reviews
status: active
created: 2026-05-10
updated: 2026-09-10
last_verified: 2026-06-24
confidence: high
tags:
  - widget
  - reviews
  - lightbox
  - video
  - mux-player
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
  - "[[ADR_0032_Review_Video_On_Mux]]"
source_files:
  - "src/widget/reviews-section/review-modal.js"
  - "src/widget/reviews-section/video-playback.js"
  - "src/widget/reviews-section/media-thumbnail.js"
  - "src/widget/core/review-media.js"
  - "src/widget/reviews-section/lightbox-trigger.js"
  - "src/widget/reviews-section/styles/lightbox.js"
  - "tests/widget-media-cross-browser.spec.ts"
---

# Product Review Lightbox

## Agent Brief

This page owns the storefront review-media detail dialog, separate from the
review-submission wizard. Entry points share keyboard/click wiring and focus
return; images must pass the trusted AWS URL policy and video uses lazy Mux
Player with storefront-scoped controls/tokens. Preserve body scroll restoration,
loaded-collection navigation, media cleanup, responsive containment, and
Shadow DOM style gating in interaction tests.

## Summary
The product review lightbox is the media detail modal opened from trusted review images, video posters, and the media strip. It is separate from the review submission wizard. The lightbox shows the selected image or video, current-review thumbnails, previous/next navigation across media-backed reviews, review metadata, full comment text, and merchant reply.

## Related Source Files
- [review-modal.js](src/widget/reviews-section/review-modal.js) - image/video review detail lightbox.
- [video-playback.js](src/widget/reviews-section/video-playback.js) - official Mux Player creation, trusted playback ID fallback, lazy module loading, and deterministic player cleanup.
- [review-player-theme.ts](src/lib/mux-player/review-player-theme.ts) - storefront/admin Mux Player theme cloning, control color contract, and internal `media-controller` locale wiring.
- [review-player-i18n.ts](src/lib/mux-player/review-player-i18n.ts) - local Turkish Media Chrome translation registration for Mux Player controls.
- [review-player-locale.ts](src/lib/mux-player/review-player-locale.ts) - shared review-player locale constant.
- [media-thumbnail.js](src/widget/reviews-section/media-thumbnail.js) - poster-first video thumbnail and play badge.
- [review-media.js](src/widget/core/review-media.js) - trusted provider-aware media normalization.
- [lightbox-trigger.js](src/widget/reviews-section/lightbox-trigger.js) - shared click/keyboard/ARIA wiring for media elements that open the lightbox.
- [styles/lightbox.js](src/widget/reviews-section/styles/lightbox.js) - `.renuvex-pr-modal-*` layout, desktop/mobile responsive behavior, scroll containers, and modal controls.
- [styles.js](src/widget/reviews-section/styles.js) - `CLASSIC_CSS` aggregator injected into the lightbox shadow root.
- [render.js](src/widget/reviews-section/render.js) - review layout and media-gallery entry points that call `openReviewModal`.
- [state.js](src/widget/core/state.js) - canonical loaded review collection used by review layout lightbox navigation.
- [gallery/index.js](src/widget/review-layouts/gallery/index.js) - gallery layout entry points for images and long-text "read more" behavior.
- [helpers.js](src/widget/core/helpers.js) - shared image trust and responsive delivery helpers.
- [widget-media-cross-browser.spec.ts](tests/widget-media-cross-browser.spec.ts) - Chromium, Firefox, WebKit, Android, and iPhone media contracts.

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
- [[ADR_0032_Review_Video_On_Mux]]

## Notes
- This lightbox is not the multi-step review submission modal. The submission wizard lives under [review-form-modal/](src/widget/reviews-section/review-form-modal/).
- `openReviewModal` accepts only normalized trusted image/video media. It no-ops when the selected review has no valid media; text-only review detail remains inline expansion or a separate text detail concern.
- In the gallery layout, long photo-backed reviews still open this lightbox so the user sees the image, full comment, thumbnails, and merchant reply together. Long photo-less reviews expand inline inside the gallery card instead of opening a blank photo shell.
- Card, list, and gallery review layouts receive one canonical loaded review collection for the active sort/filter state. Initial render resets that collection; load-more appends to the same stable array reference so existing card click handlers can navigate across all currently loaded photo-backed reviews.
- The lightbox does not fetch additional review pages by itself. Previous/next navigation is intentionally scoped to reviews already loaded into the storefront widget for the current sort/filter state.
- The lightbox has two media scopes. Review-card/list/gallery opens use the active review's full trusted media list for the mini thumbnail strip. Media-gallery opens use the gallery dataset and show one representative thumbnail per media-backed review, matching the top `Müşteri Görselleri` strip instead of flattening multi-media reviews.
- When the active lightbox media is a video, the bottom thumbnail rail is visible before playback starts, then stays hidden after playback starts until the video ends or a new media item is opened. This keeps Mux Player controls readable while the video is paused because Media Chrome can keep its control bar visible after pause.
- Review text fields are written with `textContent`, which protects comment/title/reply rendering from direct HTML injection in this component.
- Media URLs are not accepted by generic prefixes. `getTrustedReviewMedia()` accepts only AWS public review-image descriptors under the approved media host plus video playback/poster URLs from approved Mux delivery hosts.
- If the active main image fails to load after passing the trusted URL policy, the `<img>` is hidden and a neutral in-modal placeholder is shown. Mini thumbnails use the standard thumbnail fallback and hide failed assets. Related bug: [[Bug_Review_Image_Error_Fallback]].
- The main lightbox image uses `object-fit:contain` on a dark media background so customer photos are not cropped. Thumbnail, card, list, gallery, and mini-thumb render paths keep `cover` because those are fixed-format previews.
- Video list/card/gallery surfaces are poster-first. They render an image poster plus a play badge and do not create a `<video>` or `<mux-player>` element before lightbox open.
- Video thumbnail surfaces keep duration metadata in the review media model, but storefront thumbnails do not render visible duration badges. The visual contract is poster + play affordance only, including the media-gallery lightbox rail.
- Lightbox video uses the official `<mux-player>` web component with a public playback ID, `playsinline`, `preload="metadata"`, `stream-type="on-demand"`, a trusted poster, no autoplay, and muted startup. Mux Data tracking and cookies are disabled in this phase.
- Closing, browser-back navigation, or switching from video to another media item pauses the player and removes playback/token/poster attributes before the lightbox media node is replaced.
- Video and thumbnail-rail gestures are isolated from lightbox swipe navigation. Horizontal swipes still move between media-backed reviews when they start in the main media area, but touches that start in the lower video control band belong to Mux Player controls, and touches that start in the bottom rail belong to horizontal rail scrolling/thumbnail selection.
- Body scroll locking snapshots previous inline `html` / `body` scroll containment styles, body fixed-position fields, padding compensation, and scroll position before locking. Close restores the previous inline values and scroll position. Android/modern Chrome relies on root overflow plus `overscroll-behavior-y:none`; iOS/WebKit keeps fixed-body locking because that platform needs stronger background-scroll containment.
- Browser back support uses a widget-owned modal history state. Browser back closes the modal through `popstate`; normal UI close does not call `history.go(-1)` and only replaces the widget-owned state when it is still current.
- The lightbox wrapper exposes dialog semantics (`role="dialog"`, `aria-modal="true"`), moves focus into the modal on open, traps `Tab` / `Shift+Tab` inside the overlay, and restores previous focus on close.
- All storefront media elements that open the lightbox use the shared trigger contract: strip thumbnails and card/list/gallery media expose button semantics, a shared accessible label, and keyboard activation where applicable. This prevents a click-only trigger from bypassing the modal's keyboard contract.
- Responsive layout is split by modal readability, not only by a generic mobile breakpoint: `801px+` keeps the desktop two-column shell with the 438 px media column, `641px-800px` uses a stacked tablet/landscape shell with capped media height and full-width text, and `640px` and below keeps the fullscreen mobile shell.
- Mobile height uses a `100vh` fallback followed by `100svh` and `100dvh` so modern Android and iOS browsers can size the fullscreen shell against small/dynamic viewport units when browser chrome is visible or changing.
- Scroll containment is explicit on the overlay, desktop right panel, tablet wrapper, and mobile wrapper. While the modal is open, root `html` / `body` also receive `overscroll-behavior-y:none`; iOS/WebKit uses fixed-body locking so long-comment top-boundary pulls do not leak into page refresh.
- Mobile uses `overflow-y:scroll` on `.renuvex-pr-modal-wrap` so the fullscreen lightbox remains a consistent scroll container even when a short review does not exceed the viewport.
- Switching between different reviews normalizes every lightbox scroll layer (`.renuvex-pr-modal-wrap`, `.renuvex-pr-modal-right`, and `.renuvex-pr-modal-scroll-content`) immediately and again after layout settles. This prevents stale long-review scroll state from carrying into a short-review lightbox view.
- In preview mode, an already-open lightbox keeps its active review in `openReviewModal` closure state. The `RENUVEX_PR_SETTINGS_UPDATED_PREVIEW` event carries merged settings. The lightbox re-renders its full right pane through `updateRight` so icon and merchant reply label changes apply without closing the modal.
- `tests/widget-media-cross-browser.spec.ts` covers poster-first card/list/gallery rendering and cleanup on Chromium, Firefox, desktop WebKit, Pixel emulation, and iPhone WebKit emulation. Emulation is not a replacement for the physical-device release gate in [[ADR_0032_Review_Video_On_Mux]].
- Video posters are not raw, one-size URLs at render time. `review-media.js` derives trusted Mux Image thumbnail variants for the current surface: card/list/gallery/strip use sized crop variants and the lightbox uses a larger `1280x720 fit=preserve` poster.
- Mux Player controls are Mux/Media Chrome-owned in this phase. The storefront hides unnecessary controls through Mux Player CSS variables, and the shared review-player theme layer loads a local Turkish Media Chrome translation module because Turkish is not bundled by Media Chrome. The theme loader registers the public Media Chrome custom elements before loading Gerwig so menu tooltip labels such as Quality and Playback rate use the Turkish registry rather than Gerwig's bundled English fallback. Admin-controlled player theming, Mux Data analytics, and deeper custom Media Chrome themes are separate future phases.

- Storefront fullscreen binds the Mux MediaController `fullscreenElement` property directly to the current `.renuvex-pr-modal-left` media panel. Do not replace this with the Mux `fullscreen-element` attribute unless the lightbox leaves its shadow-root isolation, because Mux resolves that attribute through a document-level ID lookup.
