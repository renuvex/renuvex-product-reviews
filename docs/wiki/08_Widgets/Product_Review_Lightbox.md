---
type: widget
project: renuvex-product-reviews
status: active
created: 2026-05-10
updated: 2026-06-24
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

## Summary
The product review lightbox is the media detail modal opened from trusted review images, video posters, and the media strip. It is separate from the review submission wizard. The lightbox shows the selected image or video, current-review thumbnails, previous/next navigation across media-backed reviews, review metadata, full comment text, and merchant reply.

## Related Source Files
- [review-modal.js](src/widget/reviews-section/review-modal.js) - image/video review detail lightbox.
- [video-playback.js](src/widget/reviews-section/video-playback.js) - official Mux Player creation, trusted playback ID fallback, lazy module loading, and deterministic player cleanup.
- [review-player-theme.ts](src/lib/mux-player/review-player-theme.ts) - storefront/admin Mux Player theme cloning, control color contract, and internal `media-controller` locale wiring.
- [review-player-i18n.ts](src/lib/mux-player/review-player-i18n.ts) - local Turkish Media Chrome translation registration for Mux Player controls.
- [review-player-locale.ts](src/lib/mux-player/review-player-locale.ts) - shared review-player locale constant.
- [media-thumbnail.js](src/widget/reviews-section/media-thumbnail.js) - poster-first video thumbnail, play badge, and duration badge.
- [review-media.js](src/widget/core/review-media.js) - trusted provider-aware media normalization.
- [lightbox-trigger.js](src/widget/reviews-section/lightbox-trigger.js) - shared click/keyboard/ARIA wiring for media elements that open the lightbox.
- [styles/lightbox.js](src/widget/reviews-section/styles/lightbox.js) - `.renuvex-pr-modal-*` layout, desktop/mobile responsive behavior, scroll containers, and modal controls.
- [styles.js](src/widget/reviews-section/styles.js) - `CLASSIC_CSS` aggregator injected into the lightbox shadow root.
- [render.js](src/widget/reviews-section/render.js) - review layout and photo strip entry points that call `openReviewModal`.
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
- Review text fields are written with `textContent`, which protects comment/title/reply rendering from direct HTML injection in this component.
- Media URLs are not accepted by generic prefixes. `getTrustedReviewMedia()` retains the tenant-scoped Cloudinary image policy and accepts video playback/poster URLs only from approved Mux delivery hosts.
- If the active main image fails to load after passing the trusted URL policy, the `<img>` is hidden and a neutral in-modal placeholder is shown. Mini thumbnails use the standard thumbnail fallback and hide failed assets. Related bug: [[Bug_Review_Image_Error_Fallback]].
- The main lightbox image uses `object-fit:contain` on a dark media background so customer photos are not cropped. Thumbnail, card, list, gallery, and mini-thumb render paths keep `cover` because those are fixed-format previews.
- Video list/card/gallery surfaces are poster-first. They render an image poster plus play/duration badges and do not create a `<video>` or `<mux-player>` element before lightbox open.
- Lightbox video uses the official `<mux-player>` web component with a public playback ID, `playsinline`, `preload="metadata"`, `stream-type="on-demand"`, a trusted poster, and no autoplay. Mux Data tracking and cookies are disabled in this phase.
- Closing, browser-back navigation, or switching from video to another media item pauses the player and removes playback/token/poster attributes before the lightbox media node is replaced.
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

## Change Log
- 2026-06-24: Fixed storefront Mux Player fullscreen exit by binding MediaController fullscreen state to the active lightbox media panel and adding media tests that assert the binding survives video-to-video modal rebuilds.
- 2026-06-24: Hardened review-player localization so Media Chrome menu labels are translated from the active Turkish registry before Gerwig defines its bundled fallback elements. Browser media tests now assert the quality and playback-rate menu tooltip labels render as `Kalite` and `Oynatma hızı`.
- 2026-06-24: Review-video Mux Player controls now load a local Turkish Media Chrome translation module and set `lang="tr"` at the cloned theme controller boundary, so built-in labels such as Quality and Playback rate render in Turkish without changing playback infrastructure.
- 2026-06-23: Storefront review video lightbox moved to official Mux Player. The player receives a public `playback-id`, disables Mux Data tracking/cookies for now, hides nonessential controls through supported CSS variables, and keeps a trusted `.m3u8` parsing fallback only for rollout overlap.
- 2026-06-16: Improved video first-frame quality by deriving sized Mux poster variants and adding hls.js player-size capping plus a conservative start-level warm-start. Native controls remain unchanged and browser-owned.
- 2026-06-14: Documented the provider-aware image/video lightbox and Phase 4 cross-browser media suite. Native-HLS attributes, lazy `hls.js`, no-autoplay poster-first rendering, browser-back cleanup, and video-to-image navigation cleanup are now pinned across the five-project Playwright matrix.
- 2026-06-01: Lightbox CSS ownership moved into [styles/lightbox.js](src/widget/reviews-section/styles/lightbox.js) while `review-modal.js` continues to inject the stable `CLASSIC_CSS` aggregator.
- 2026-05-31: Added shared [lightbox-trigger.js](src/widget/reviews-section/lightbox-trigger.js) after an audit found photo-strip thumbnails were click-only images. Photo-strip and card/list/gallery lightbox triggers now share keyboard/ARIA wiring, and interaction smoke verifies keyboard open + focus restore from the photo strip. Related bug: [[Bug_Lightbox_Focus_Trap_Accessibility]].
- 2026-05-24/25: Updated preview-event wording for ADR_0020 namespace migration. `RENUVEX_PR_SETTINGS_UPDATED_PREVIEW` is the active preview event.
- 2026-05-12: Fixed preview settings synchronization for an already-open lightbox. The right pane now re-renders from closure state on the preview settings event, covering review icons, merchant reply labels, and future right-pane setting-dependent fields. Related bug: [[Bug_Lightbox_Preview_Settings_Sync]].
- 2026-05-12: Changed the main lightbox image from `cover` to `contain` on the existing dark media background so customer review photos are shown without crop; preview thumbnails remain `cover`.
- 2026-05-12: Changed mobile `.renuvex-pr-modal-wrap` from `overflow-y:auto` to `overflow-y:scroll` to keep the fullscreen lightbox's scroll-container behavior consistent in short-review cases.
- 2026-05-12: Added review-switch scroll normalization and made fixed-body locking platform-aware. Related bug: [[Bug_Lightbox_Mobile_Review_Switch_Scroll_State]].
- 2026-05-12: Hardened mobile pull-to-refresh containment. The lightbox now snapshots/restores root scroll styles and scroll position and applies root `overscroll-behavior-y:none`. Related bug: [[Bug_Lightbox_Mobile_Pull_To_Refresh]].
- 2026-05-11: Documented K2 image error fallback. Main lightbox image failures now show a neutral placeholder while mini thumbnail failures hide the failed thumbnail. Related bug: [[Bug_Review_Image_Error_Fallback]].
- 2026-05-11: Updated image policy notes after adding build-time public cloud fallback and last-valid widget policy cache. Related bug: [[Bug_Cloud_Name_Silent_Image_Filter]].
- 2026-05-11: Documented the responsive lightbox contract after adding the 641-800 px stacked tablet shell, mobile viewport-unit fallback chain, and scroll containment updates in [styles.js](src/widget/reviews-section/styles.js). Related bug: [[Bug_Lightbox_Tablet_Viewport_And_Scroll]].
- 2026-05-11: Documented lightbox accessibility hardening after adding dialog semantics, focus trap, thumbnail keyboard activation, and focus restore. Related bug: [[Bug_Lightbox_Focus_Trap_Accessibility]].
- 2026-05-11: Closed the card/list/gallery page-slice navigation risk by documenting the canonical loaded review collection in [state.js](src/widget/core/state.js) and [render.js](src/widget/reviews-section/render.js). Related bug note: [[Bug_Review_Detail_Lightbox_Risks]].
- 2026-05-11: Updated body scroll lock and history handling notes after hardening [review-modal.js](src/widget/reviews-section/review-modal.js). Related bug note: [[Bug_Review_Detail_Lightbox_Risks]].
- 2026-05-10: Updated the lightbox image trust contract after implementing the shared trusted Cloudinary URL policy. Related ADR: [[ADR_0006_Trusted_Review_Image_URL_Policy]].
- 2026-05-10: Documented the photo-only lightbox contract after fixing the gallery photo-less read-more path and adding an empty-image guard in [review-modal.js](src/widget/reviews-section/review-modal.js). Related bug note: [[Bug_Review_Detail_Lightbox_Risks]].
- 2026-05-10: Created this page to document the existing photo review detail lightbox separately from the review submission wizard after a technical audit found the two were conflated in the wiki. Related source: [review-modal.js](src/widget/reviews-section/review-modal.js), [styles.js](src/widget/reviews-section/styles.js), related bug note: [[Bug_Review_Detail_Lightbox_Risks]].
