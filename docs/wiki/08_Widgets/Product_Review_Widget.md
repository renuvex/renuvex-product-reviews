---
type: widget
project: renuvex-product-reviews
status: active
created: 2026-05-05
updated: 2026-06-24
last_verified: 2026-06-24
confidence: high
tags:
  - widget
  - reviews
related:
  - "[[Index]]"
  - "[[Storefront_Widget_Overview]]"
  - "[[Widget_Architecture]]"
  - "[[Photo_Strip]]"
  - "[[ADR_0006_Trusted_Review_Image_URL_Policy]]"
  - "[[ADR_0007_Photo_Strip_Cap_And_Rotation]]"
  - "[[ADR_0026_Product_Review_Summary_Read_Model]]"
  - "[[ADR_0029_Review_Media_Metadata]]"
  - "[[ADR_0032_Review_Video_On_Mux]]"
  - "[[Bug_Review_Wizard_Focus_Trap_Accessibility]]"
  - "[[Bug_Review_Wizard_Photo_Upload_Lifecycle]]"
source_files:
  - "src/components/home-page/widgets/widgetDefs.ts"
  - "src/widget/reviews-section/bootstrap.js"
  - "src/widget/reviews-section/render.js"
  - "src/widget/reviews-section/render/theme-vars.js"
  - "src/widget/reviews-section/render/size-presets.js"
  - "src/widget/reviews-section/render/states.js"
  - "src/widget/reviews-section/styles/states.js"
  - "src/widget/reviews-section/styles/review-primitives.js"
  - "src/widget/reviews-section/render/pagination.js"
  - "src/widget/reviews-section/render/handlers.js"
  - "src/widget/reviews-section/reviews-api.js"
  - "src/widget/reviews-section/media-thumbnail.js"
  - "src/widget/reviews-section/video-playback.js"
  - "src/widget/reviews-section/styles/lightbox.js"
  - "src/lib/mux-player/review-player-theme.ts"
  - "src/lib/mux-player/review-player-i18n.ts"
  - "src/lib/mux-player/review-player-locale.ts"
  - "src/components/home-page/AdminMuxPlayerPreview.tsx"
  - "src/widget/core/review-media.js"
  - "src/widget/reviews-section/review-form-modal/styles.js"
  - "src/widget/reviews-section/review-form-modal/steps/step-photos.js"
  - "src/widget/reviews-section/review-form-modal/steps/step-media.js"
  - "src/widget/reviews-section/review-form-modal/media/video-upload.js"
  - "src/widget/reviews-section/review-form-modal/media/video-capability.js"
  - "src/widget/summary-layouts/shared/write-action.js"
  - "src/app/api/public/reviews/route.ts"
  - "src/app/api/public/ratings/route.ts"
  - "src/app/api/public/ratings-by-slug/route.ts"
  - "src/lib/review-media.ts"
  - "src/lib/review-summary.ts"
---

# Product Review Widget

## Summary
The full review block on a product detail page: rating summary (with bar chart for distribution), filter/sort controls, the review list, photo gallery strip, a "Write a Review" CTA that opens a multi-step submission modal, and a separate photo review detail lightbox. Composed of swappable summary and review layouts.

## Settings (`reviews` widgetId)
Source: [widgetDefs.ts](src/components/home-page/widgets/widgetDefs.ts).

Recurring categories:
- General — show/hide widget title, photo/media gallery title, etc.
- Layout — `summaryLayout` (`classic` / `compact` / `hero` / `minimal` / `split`) and `reviewLayout` (`card` / `gallery` / `list`)
- Pagination — `paginationMode` (`loadMore` button — default — vs `numbered` `1 2 3 …` control)
- Form — modal wizard fields/colors, auto-approve mode, and gated video-review capability (`videoReviewsEnabled` only works when the server global flag and store quota are also open)
- Colors (basic + advanced tier)
- Icons — review icon (star / heart), filter icon (Sliders / Funnel)
- Ranges — sizes, gaps
- Auto-approve — `manual` / `4plus` / `5stars` / `all` (and legacy boolean for back-compat)

## Render path
1. `bootstrap.js` runs only from the `reviews-main` product surface and verifies the explicit review mount before heavy work.
2. Fetches `/api/public/settings` (cached), then calls `reviews-api.js` for `/api/public/reviews` and the strip fetch (cached; image-only stores use `hasImages=true`, video-enabled stores use `hasMedia=true`; stale reviews are preferred on failures).
3. Reads layout choice from settings → looks up registry in [summary-layouts/index.js](src/widget/summary-layouts/index.js) and [review-layouts/index.js](src/widget/review-layouts/index.js).
4. `render.js` composes summary + reviews + CTA. Review fetch errors render a retryable error state and do not reuse the empty-review UI. A true product-empty state (`allCount === 0`) is built by `buildEmptyReviewsState()` in [render/states.js](src/widget/reviews-section/render/states.js), with its own left-aligned semantic `h3` title, 5 empty review icons, explanatory status text, and the write-review CTA. On desktop the CTA sits to the right of the copy; on mobile it becomes a centered full-width button. Filtered-empty state (`allCount > 0` and visible `reviews.length === 0`) stays minimal: summary remains, no write-review CTA is added, and `buildFilteredEmptyReviewsState()` renders a polite status message for assistive technology. State stored in [core/state.js](src/widget/core/state.js).
5. Every real storefront CTA performs a fresh `no-store` video capability check before opening the multi-step submission wizard. Concurrent clicks share one request and the clicked CTA is temporarily disabled with `aria-busy=true`. Proven capability failures with an HTTP status, such as rate limit, provider unavailable, quota closed, or unknown store, fail closed to the photo-only wizard. Browser/network failures without an HTTP status are treated as capability-unproven: if cached merchant settings enable video, the media wizard still opens and `/api/public/upload/video/initiate` remains the authoritative gate. Admin preview skips the real endpoint and uses the deterministic draft setting.

Mount behavior: [render.js](src/widget/reviews-section/render.js) prefers a merchant/theme-provided mount point `<div data-renuvex-widget="reviews"></div>`. If the mount is missing, the review section does **not** render — placement is opt-in (no auto-create). The PDP rating badge is a separate "badge" feature: it auto-places on the product title and is gated only by the badge widget toggle, so it shows independently of the review-section mount. The review section root is `#renuvex-reviews-widget` (inner container `#renuvex-reviews`); the PDP badge scroll target is `#renuvex-reviews`. `data-renuvex-widget="<type>"` is the canonical public mount scheme for all widgets (e.g. a future carousel uses `data-renuvex-widget="carousel"`). Related bug: [[Bug_Product_Widget_Missing_Auto_Mount]].

## Media review detail lightbox
- Detail lightbox source: [review-modal.js](src/widget/reviews-section/review-modal.js). Full note: [[Product_Review_Lightbox]].
- Entry points include review media inside card/list/gallery layouts and the top strip rendered by [render.js](src/widget/reviews-section/render.js). All media lightbox entry points use [lightbox-trigger.js](src/widget/reviews-section/lightbox-trigger.js) so click, `Enter` / `Space`, `role="button"`, `tabindex="0"`, label, and focus-return behavior stay consistent.
- All photo entry points use trusted image helpers; third-party `https://` URLs and `data:image` payloads are not rendered on storefronts.
- Video entry points use [core/review-media.js](src/widget/core/review-media.js): storefront renders only trusted Mux playback IDs plus trusted Mux delivery/poster URLs from normalized `media[]`; provider ids never reach the widget. Cards/lists/gallery/strip show poster + play badge + optional duration, not autoplaying `<video>` or `<mux-player>` elements.
- Video poster surfaces derive Mux Image thumbnail variants from the trusted `posterUrl`: fixed thumbnails use sized `width`/`height`/`fit_mode=crop` variants with `srcset`, while the lightbox uses a higher-quality `fit_mode=preserve` poster. The base `posterUrl` remains the source of truth.
- The lightbox lazy-loads the official `@mux/mux-player` web component only when a video opens. It renders `<mux-player playback-id>` with `preload="metadata"`, `stream-type="on-demand"`, `playsinline`, no autoplay, `disable-tracking`, and `disable-cookies`. The review lightbox hides extra controls such as seek forward/back, PiP, cast, AirPlay, playback rate, rendition, and audio-track menus through Mux Player CSS variables. Closing/navigating pauses the player and removes playback/token/poster attributes before replacing the lightbox media node.
- Storefront and admin Mux Player themes are intentionally separate. Storefront review playback uses `STOREFRONT_REVIEW_MUX_PLAYER_THEME` / `STOREFRONT_REVIEW_PLAYER_COLORS`; the admin moderation preview uses `ADMIN_REVIEW_MUX_PLAYER_THEME` / `ADMIN_REVIEW_PLAYER_COLORS`. Both themes keep player controls high-contrast and explicitly force Mux quality/playback-rate menus to dark backgrounds with light text so Gerwig's `primary-color` menu default cannot regress into white-on-white controls. Storefront review lightbox player colors are merchant-editable through the `Video Oynatıcı` color group: play icon, progress color, and progress track color. The center play button background and hover background stay transparent and are not merchant-editable. The keys are intentionally scoped as `reviewLightboxVideo*` so future story/carousel players can use separate contracts. Both surfaces also load the local Turkish Media Chrome translation module, set the cloned theme's internal `media-controller` to `lang="tr"`, and define Media Chrome's public custom elements before loading Gerwig so menu labels such as Quality and Playback rate use the Turkish registry instead of Gerwig's bundled English fallback. The admin moderation preview intentionally hides nonessential controls: Picture-in-Picture, Cast, seek backward/forward, audio-track menu, captions/subtitles, and playback-rate. Future widget/player customization must flow through storefront-scoped tokens or presets, not the admin preview surface.
- In gallery layout, long photo-backed reviews can use the lightbox for full detail; long photo-less reviews expand inline and must not open the photo-only lightbox.
- This lightbox is separate from the submission wizard under [review-form-modal/](src/widget/reviews-section/review-form-modal/).
- Open audit risks are tracked in [[Bug_Review_Detail_Lightbox_Risks]].

## Submission flow (modal)
- The wizard close (X) control is not a primary-text color consumer. [theme-vars.js](src/widget/reviews-section/render/theme-vars.js) derives `--renuvex-pr-fwizard-close-text` and `--renuvex-pr-fwizard-close-hover-bg` from `formBgColor` so the close control stays readable on light or dark form backgrounds.
- Steps managed in [reviews-section/review-form-modal/wizard-state.js](src/widget/reviews-section/review-form-modal/wizard-state.js).
- The wizard shell exposes modal dialog semantics and traps keyboard focus while open. Open focuses the dialog container, first `Tab` enters the active step, step changes do not auto-focus inputs, and close returns focus to the opening control for keyboard opens. Related bug: [[Bug_Review_Wizard_Focus_Trap_Accessibility]] and [[Bug_Wizard_Rating_Radiogroup_And_Focus_Return]].
- Photos uploaded via `/api/public/upload/sign` → direct to Cloudinary under `review_images/stores/<storeId>`.
- Video V1 is opt-in and gated by global flag + merchant setting + provider configuration + the current UTC month's `reservedCount + consumedCount < monthlyLimit`. The cached settings response expresses merchant intent; the fresh capability endpoint expresses current upload availability. When effective, step 2 becomes a media step ([step-media.js](src/widget/reviews-section/review-form-modal/steps/step-media.js)): users can add **3 photos OR 1 video**, never mixed media in v1. The media step starts with two stacked primary actions, `Fotoğraf Ekle` and `Video Ekle`, inside one media card. The photo path reuses [step-photos.js](src/widget/reviews-section/review-form-modal/steps/step-photos.js) in embedded mode so thumbnails and upload lifecycle stay shared. The embedded picker keeps its own add control hidden before media exists; after a photo is pending or uploaded, the outer media actions hide and the embedded photo strip shows the selected thumbnail(s) plus the compact `+` tile. Empty embedded media content stays hidden until actual media exists, so opening the native photo or video picker without selecting media does not shift the action buttons. Removing a selected video resets step 2 to the empty media-selection state.
- Videos upload through [media/video-upload.js](src/widget/reviews-section/review-form-modal/media/video-upload.js): client validates MP4/MOV and <=150MB immediately, then auto-advances to the comment step while duration validation, Mux direct upload, complete, and processing polling continue in the shared wizard state. Returning to step 2 during upload/retry/processing shows a single black `Video Yükleniyor` status control without a remove button. If the direct-upload path loses connection evidence or stops emitting activity for the watchdog window, the client aborts the active PUT and surfaces the same generic retryable failure state instead of waiting for automatic online recovery. UpChunk automatic retry is kept only for transient HTTP retry statuses (`408`, `502`, `503`, `504`); response-less mobile network failures fail closed to manual retry so the wizard cannot remain indefinitely on `Video Yükleniyor`. Retry is manual: the selected file is preserved, the existing upload session is reused when server status says it is still valid, and only expired, failed, aborted, or missing sessions are discarded before a new session is created. Late callbacks from superseded or aborted direct-upload attempts are ignored, so browser `online`/progress events cannot overwrite a terminal retry state with a false busy state. Once ready, step 2 shows one photo-sized video thumbnail with only the remove button, no play icon and no extra `+` video tile. The app stores only the opaque session token in widget state; Mux upload URL is not exposed in public API responses. Server-side Mux asset/webhook/reconcile state remains authoritative; client validation is only fast feedback.
- Upload failures keep detailed server error codes in state/metrics, but the storefront retry card exposes only one themed `Tekrar dene` action for retryable failures. It does not show network-specific or red error copy to shoppers. Non-retryable failures show no retry action. Busy states show no buttons or remove icon.
- Preview mode never calls Mux. The wizard simulates upload/progress/processing/ready states deterministically.
- Photo step allows **parallel uploads** — the add button stays enabled while existing uploads are in flight. Each pending upload is tracked independently in `pendingImages`. The submission step blocks submit with a "fotoğraflar yükleniyor" message until every pending upload resolves. Upper bound `MAX_PHOTOS=3` is enforced across completed + pending so parallel selection never exceeds the cap.
- Local preview `blob:` URLs are owned by the modal lifecycle: pending, completed-preview-map, and preview-mode blobs are revoked on close. Removing a photo updates wizard state before revoking the local URL, and deleting one pending upload skips only that upload's state update instead of aborting the rest of the selected batch. Related bug: [[Bug_Review_Wizard_Photo_Upload_Lifecycle]].
- Auto-jump to the next step fires on the user's first real photo action (no completed, no pending) and on video selection. Returning to the media step after video selection does not reopen the initial add choices; it renders the current video status or thumbnail. Returning to the photo step to add more photos keeps the user on that step.
- On submit → `POST /api/public/reviews`; image URLs are validated against the trusted Cloudinary policy before storage. A ready video token is validated against store/product/session ownership, consumes the pending video, forces `Review.status='pending'`, and waits for admin moderation before public visibility.
- The legacy inline/page form was removed; all review CTAs open the multi-step modal.

## Pagination, filtering, sorting
- Pagination: 10 per page (server-side); `limit` query param clamped 1-30 for ad-hoc fetches (photo strip uses 15).
- Sort: `newest` / `highest` / `lowest`.
- Filter: by rating (1..5), by `hasImages=true`. Backend uses indexed `Review.hasImages`; it must not scan legacy `Review.images` text. Internal media-strip fetch can use `hasMedia=true` (`hasImages OR hasVideo`) when video is effectively enabled; this is separate from the public photo filter UI. The rating filter is driven by the summary bar chart ([summary-layouts/shared/bar-chart.js](src/widget/summary-layouts/shared/bar-chart.js)); a bar with **zero reviews is not interactive** (no `role="button"`, not focusable, no hover, `cursor:default`), so a click can't land on an empty "Henüz yorum yok" result — only bars that actually have reviews filter (Looox-style).
- Bar chart in summary uses filter-independent `ratingCounts` returned by `/api/public/reviews`. Aggregate fields (`allCount`, `avgRating`, `ratingCounts`) and exact `totalCount` / `totalPages` for rating/photo filters come from the backend `ProductReviewSummary` read model; only the visible review rows come from `Review`. See [[ADR_0026_Product_Review_Summary_Read_Model]].
- Review response `images` is still a string array for widget compatibility and remains image-only. The widget now prefers additive `media[]` for media-aware layouts and falls back to legacy `images[]` for images. Video entries expose only normalized `playbackId`, playback URL, poster, duration, and display fields, never provider ids. See [[ADR_0027_Review_Media_Read_Model]], [[ADR_0029_Review_Media_Metadata]], and [[ADR_0032_Review_Video_On_Mux]].
- Load-more: the first page uses the legacy `page=1` request and stores `data.nextCursor`; subsequent "Daha Fazla Goster" requests use `cursor` when available and fall back to `page + 1` only for backwards compatibility. Sort/filter/retry/product changes reset the cursor. See [[ADR_0028_Review_Cursor_Pagination]].
- **Pagination mode (merchant-selectable, `paginationMode`):** the Tasarım accordion offers `loadMore` (default — the cursor-append "Daha Fazla" button above) or `numbered`. Numbered uses the **offset** path (`page=N`, no cursor) via [render/pagination.js](src/widget/reviews-section/render/pagination.js): `buildPageList` is a pure windowed/ellipsis builder (all pages if `totalPages ≤ 7`, else first/last + current ±1 with `…`); `onPageChange` (in [render/handlers.js](src/widget/reviews-section/render/handlers.js)) re-fetches page N and **replaces** the list (not append), then scrolls the section to top. The control hides when `totalPages ≤ 1`, sits in document flow under the list (not sticky), and sort/filter reset it to page 1. Activating a page disables the whole control (`aria-busy` + dimmed) until the new render replaces it; after render, focus is restored to the new active page button (`preventScroll`, since the full re-render would otherwise drop focus to `<body>`) and a persistent shadow-root live region politely announces "Sayfa N". The scroll-to-top honors `prefers-reduced-motion`. The **active page is a filled box** with its own explicit colors — `paginationActiveBgColor` (fill, default `#111111`) and `paginationActiveTextColor` (number, default `#ffffff`) — independent of the passive `paginationBgColor` / `paginationTextColor`. Every pagination color is an explicit setting (no auto-derivation). Font weight matches the other buttons (the fill is the sole distinction). Colors live in the "Sayfalama" color group (`showWhen paginationMode === 'numbered'`); load-more colors are gated to `loadMore`. Honest trade-off: numbered re-introduces offset cost at deep pages (`totalPages` itself stays cheap from `ProductReviewSummary`). See [[Widget_Customization]] and [[ADR_0028_Review_Cursor_Pagination]].
- `Widget Boyutu` (`size`) is also the single source for list-pagination control sizing. Desktop load-more and numbered pagination use compact boxes. Mobile/coarse-pointer layouts use the same visible box as the clickable target, so there is no invisible hit area around dense page numbers; the mobile targets still scale by size and remain above the WCAG 2.2 24px minimum. No separate pagination-size admin setting exists, and centered wrap behavior stays unchanged.

## Photo / media strip
- Dedicated horizontal strip above the review list, independent of sort/filter/load-more.
- Image-only stores keep the existing `hasImages=true&limit=15&orderBy=newest` fetch. Video-enabled stores use `hasMedia=true&limit=15&orderBy=newest` so approved video posters can appear in the same strip without changing the public photo filter.
- Cap fixed at 15 (no admin setting), newest-first rotation.
- Full doc: [[Photo_Strip]]. Decision: [[ADR_0007_Photo_Strip_Cap_And_Rotation]].

## Related Source Files
- [src/widget/reviews-section/](src/widget/reviews-section/)
- [src/widget/reviews-section/lightbox-trigger.js](src/widget/reviews-section/lightbox-trigger.js)
- [src/widget/summary-layouts/](src/widget/summary-layouts/)
- [src/widget/review-layouts/](src/widget/review-layouts/)
- [src/app/api/public/reviews/route.ts](src/app/api/public/reviews/route.ts)
- [src/app/api/public/ratings/route.ts](src/app/api/public/ratings/route.ts)
- [src/app/api/public/ratings-by-slug/route.ts](src/app/api/public/ratings-by-slug/route.ts)
- [src/app/api/public/upload/sign/route.ts](src/app/api/public/upload/sign/route.ts)
- [src/lib/review-images.ts](src/lib/review-images.ts)
- [src/lib/review-media.ts](src/lib/review-media.ts)
- [src/lib/review-summary.ts](src/lib/review-summary.ts)

## Obsidian Links
- [[Storefront_Widget_Overview]]
- [[Widget_Architecture]]
- [[Widget_Customization]]
- [[Product_Rating_Badge]]
- [[Product_Review_Lightbox]]
- [[Photo_Strip]]
- [[Listing_Rating_Widget]]
- [[ADR_0006_Trusted_Review_Image_URL_Policy]]
- [[ADR_0007_Photo_Strip_Cap_And_Rotation]]
- [[ADR_0026_Product_Review_Summary_Read_Model]]
- [[ADR_0027_Review_Media_Read_Model]]
- [[ADR_0029_Review_Media_Metadata]]
- [[Bug_Product_Widget_Missing_Auto_Mount]]
- [[Bug_Review_Wizard_Focus_Trap_Accessibility]]
- [[Bug_Review_Wizard_Photo_Upload_Lifecycle]]

## Change Log
- 2026-06-24: Revised the storefront review lightbox `Renkler > Video Oynatıcı` surface to three merchant-editable colors: play icon, progress color, and progress track color. The center play button background and hover background are transparent and no longer exposed as settings. The keys are scoped to `reviewLightboxVideo*`; admin moderation and future story/carousel players remain isolated.
- 2026-06-24: Split the Mux Player theme boundary into storefront and admin exports, including separate named color sets. Storefront review lightbox customization can now evolve through storefront-scoped player tokens/presets without changing the fixed admin moderation preview. The same color contract also pins Mux quality/playback-rate menus to dark background/light text to avoid Gerwig theme menu contrast regressions when control icons stay white.
- 2026-06-24: Simplified the admin moderation Mux Player controls by hiding Picture-in-Picture, Cast, seek backward/forward, audio-track, captions/subtitles, and playback-rate controls. Core playback, volume, timeline, fullscreen, and quality selection remain available for review moderation.
- 2026-06-24: Hardened review-player localization by loading Media Chrome's public elements before Gerwig and setting the local Turkish translation registry as active. This closes the case where Gerwig's bundled Media Chrome copy could leave Quality and Playback rate labels in English even though the player host and controller had `lang="tr"`.
- 2026-06-24: Added a local Turkish Media Chrome translation module for review-video Mux Player controls. Storefront and admin review players now keep `lang="tr"` at the host and cloned `media-controller` theme boundary, translating labels such as Quality, Playback rate, Settings, and fullscreen tooltips without changing Mux upload, playback, webhook, or DB behavior.
- 2026-06-23: Storefront review video playback moved from native `<video>` plus direct `hls.js` orchestration to official Mux Player. Public review media now includes additive `playbackId` for video items, the widget prefers that ID and keeps a trusted Mux `.m3u8` fallback for rollout overlap, and Mux Data tracking/cookies are disabled until analytics is explicitly productized.
- 2026-06-23: Physical mobile retesting showed automatic reconnect recovery could still leave the direct upload on `Video Yükleniyor` while the Mux direct upload remained `waiting`. The storefront now fails closed for direct-upload offline/stall/non-HTTP attempt-failure cases: it aborts the active PUT, shows only the themed `Tekrar dene` action for retryable failures, and does not show network-specific or red error copy to shoppers. Manual retry preserves the selected file and reuses the existing session only when server status proves it is still valid. Follow-up hardening ignores late callbacks from superseded upload attempts and keeps the video action visible when the capability check fails from a browser/network failure rather than a proven HTTP gate.
- 2026-06-22: The video-enabled submission wizard media step now auto-advances to the comment step after video selection while Mux upload/processing continues in shared state. Returning to step 2 shows a single black loading status during upload/retry/processing and a single photo-sized removable video thumbnail once ready. Step 4 blocks submit with the same dot animation pattern and `Video Hazırlanıyor` label while the video is not ready. Ready thumbnails have no play icon and no extra `+` video tile. The same date also replaced the old side-by-side media choices with two stacked primary actions, hid empty embedded media content to prevent layout shift, aligned the photo-selected media state so primary actions hide while the embedded thumbnail strip exposes the compact `+` add tile, and added the direct-upload activity watchdog that now feeds the manual retry path when the upload stalls.
- 2026-06-20: Video upload path uses Mux direct upload via UpChunk. Storefront video playback trusts Mux delivery hosts, admin pending playback is signed server-side, and public playback is exposed only after moderation creates a public playback ID. The previous provider adapters, app-signed upload-parts route, and S3 SDK dependencies are removed locally. Related: [[ADR_0032_Review_Video_On_Mux]].
- 2026-06-16: Video poster delivery now derives trusted Mux Image thumbnail variants for thumbnails and lightbox posters. The non-native hls.js path uses player-size capping and a conservative start-level warm-start without disabling ABR; native Safari/iOS controls remain browser-owned.
- 2026-06-15: Added a fresh quota-aware video capability check before every real storefront wizard open. Capability failure degrades to photo-only, preview stays deterministic, and structured quota/rate/disabled/provider errors now drive specific copy and retry policy.
- 2026-06-13: Began Review Video implementation behind closed gates. Added provider-agnostic storefront media normalization, poster/play/duration thumbnails for card/list/gallery/strip, video-aware lightbox playback with native iOS/Safari HLS + lazy hls.js, a wizard media step, and admin moderation/private playback plumbing. Public `images[]` remains image-only; `media[]` is the video-capable contract. Provider details are superseded by [[ADR_0032_Review_Video_On_Mux]].
- 2026-06-12: Review pagination sizing was revised again after mobile UX review: desktop load-more/numbered controls remain compact, while mobile now uses the visible control box as the clickable target instead of adding an invisible 44px halo around dense page numbers. Runtime smoke covers desktop size, mobile clickable/visible size, focus ring placement, and overflow.
- 2026-06-12: Load-more and numbered pagination physical control sizes now follow `Widget Boyutu` through shared root CSS variables. The existing `size` setting remains the only size control; mobile/coarse pointer layouts keep centered wrapping pagination and use compact visible targets rather than a separate invisible hit area. Runtime smoke covers load-more sizing, numbered pagination sizing, and mobile overflow.
- 2026-06-11: Product-empty review UI (`allCount === 0`) moved into `buildEmptyReviewsState()` in [render/states.js](src/widget/reviews-section/render/states.js), then upgraded to the empty-product design: left-aligned semantic `h3` title, 5 empty review icons, explanatory `role="status"` / `aria-live="polite"` text, and a hero/minimal-style CTA (right-aligned on desktop, centered full-width on mobile). Widget-runtime smoke pins the empty-state contract including custom `writeButtonText`, semantic title markup, and responsive CTA layout. The shared `partialStarsHTML()` helper falls back to the default star icon pair when called without an icon pair, so reusable state builders do not render blank decorative icons in standalone use.
- 2026-06-11: Review-section non-list state CSS moved into [styles/states.js](src/widget/reviews-section/styles/states.js). [styles.js](src/widget/reviews-section/styles.js) remains the `CLASSIC_CSS` aggregator; [styles/review-primitives.js](src/widget/reviews-section/styles/review-primitives.js) now owns only shared review/list primitives plus pagination/load-more primitives.
- 2026-06-11: Filtered-empty review results now render through `buildFilteredEmptyReviewsState()` with `role="status"` / `aria-live="polite"`. The state remains visually minimal and keeps the summary visible; widget-runtime smoke pins that the rich product-empty CTA does not appear for filter-empty results.
- 2026-06-09: Summary bar-chart rows with **zero reviews are no longer clickable/focusable** (no `role="button"`, no hover, `cursor:default`); only bars that have reviews trigger the rating filter, so a click can't land on an empty result. Matches Looox. Source: [summary-layouts/shared/bar-chart.js](src/widget/summary-layouts/shared/bar-chart.js).
- 2026-06-09: Pagination active page gained its own explicit colors — `paginationActiveBgColor` (fill, default `#111111`) and `paginationActiveTextColor` (number, default `#ffffff`) — decoupled from the passive `paginationTextColor`. Previously the active fill was the inverted number color, so changing "Numara Rengi" also moved the active box. Default look is unchanged.
- 2026-06-09: Numbered-pagination a11y/UX polish: `aria-busy` loading state on activation, focus restored to the new active page button after the re-render, polite "Sayfa N" live-region announcement (persistent shadow-root child), and `prefers-reduced-motion`-aware scroll. Also fixed gallery layout squeezing the control into a column (`column-span:all`).
- 2026-06-09: Added merchant-selectable **numbered pagination** (`paginationMode: loadMore | numbered`) in the Tasarım accordion + a "Sayfalama" color group. Numbered reuses the existing offset API (`page` / `totalPages`); new `render/pagination.js` builds the windowed/ellipsis control (≤7 → all pages, else first/last + current ±1 with `…`) and `render/handlers.js onPageChange` re-renders the page (replace, scroll-to-top). Active page = filled (inverted color vars), same font weight as the other buttons; no new active-color setting. Default `loadMore` preserves existing behavior. See [[Widget_Customization]].
- 2026-06-08: Exact public `totalCount` / `totalPages` for rating/photo filters now come from `ProductReviewSummary` buckets, including `photoRating*Count`; the widget response shape is unchanged and visible rows still come from `Review`.
- 2026-06-08: Public review responses now include additive `media[]` metadata entries after signed Cloudinary upload-response verification. `images: string[]` remains the widget compatibility contract. Related ADR: [[ADR_0029_Review_Media_Metadata]].
- 2026-06-07: Public `hasImages=true` filtering now uses indexed `Review.hasImages`, and response images read `ReviewMedia` first with legacy fallback. Widget response shape is unchanged. Related ADR: [[ADR_0027_Review_Media_Read_Model]].
- 2026-06-08: Review list load-more now uses cursor/keyset pagination when the API returns `nextCursor`; legacy page fallback remains. Related ADR: [[ADR_0028_Review_Cursor_Pagination]].
- 2026-06-06: Public summary aggregates (`allCount`, `avgRating`, `ratingCounts`) now read from `ProductReviewSummary`; review rows, filter/sort/load-more, and response shape remain unchanged. Related ADR: [[ADR_0026_Product_Review_Summary_Read_Model]].
- 2026-06-01: Review wizard close (X) color and hover background now derive from the form background color (`formBgColor`) instead of `formPrimaryTextColor`; interaction smoke pins the actual shadow-DOM color and hover result.
- 2026-05-31: Fixed review wizard photo upload lifecycle defects: closing during a pending upload now revokes local blob previews, removing a pending photo no longer aborts later selected uploads, and removal state is batched before blob revoke to avoid stale image loads. Related bug: [[Bug_Review_Wizard_Photo_Upload_Lifecycle]].
- 2026-05-31: Wizard/lightbox lifecycle audit found the photo-strip lightbox thumbnails were click-only images. Added shared `wireLightboxTrigger()` and moved card/list/gallery triggers to it; interaction smoke now verifies keyboard open and focus restore from the photo strip.
- 2026-05-27: ADR_0024 follow-up moved review/photoStrip fetch helpers into [reviews-api.js](src/widget/reviews-section/reviews-api.js). `bootstrap.js` is now review mount orchestration, while `render.js` uses the same fetch helper for retry/filter/sort/load-more interactions.
- 2026-05-25: Review-section placement became opt-in via `<div data-renuvex-widget="reviews"></div>`. Missing mount now means no review section; the PDP title badge remains independent and is controlled by the `badge` widget toggle.
- 2026-05-12: Photo step now allows parallel uploads — add button stays enabled while existing uploads are in flight (the previous silent block was confusing when users returned to step 2 after the auto-jump). Auto-jump narrowed to the truly first photo (no completed, no pending). MAX_PHOTOS=3 cap enforced across completed + pending. Source: [step-photos.js](src/widget/reviews-section/review-form-modal/steps/step-photos.js).
- 2026-05-12: Documented review submission wizard accessibility fix: focus trap, active-step focus reset, focus restore on close, keyboard-accessible photo upload trigger, and visible focus outlines. Related bug: [[Bug_Review_Wizard_Focus_Trap_Accessibility]].
- 2026-05-11: Documented the then-current self-mounting PDP review anchor fallback after fixing deploy/theme cases where missing `#ikas-reviews-anchor` hid both the review block and product-title badge. Superseded by the 2026-05-25 opt-in review mount contract. Related bug: [[Bug_Product_Widget_Missing_Auto_Mount]].
- 2026-05-11: Documented retryable review fetch error state after separating API/network failures from valid empty review lists. Related bug: [[Bug_Review_Fetch_Error_Empty_State]].
- 2026-05-11: Photo strip decoupled from main reviews fetch — dedicated `hasImages=true&limit=15&orderBy=newest` call, cap 15, newest-first rotation. Lightbox now navigates strip dataset, closing the paged-slice navigation risk. Related ADR: [[ADR_0007_Photo_Strip_Cap_And_Rotation]]. Related note: [[Photo_Strip]]. Source: [reviews-api.js](src/widget/reviews-section/reviews-api.js), [bootstrap.js](src/widget/reviews-section/bootstrap.js), [render.js](src/widget/reviews-section/render.js), [state.js](src/widget/core/state.js), [route.ts](src/app/api/public/reviews/route.ts).
- 2026-05-10: Documented the trusted review image URL policy in the product review widget submission and display flow. Related ADR: [[ADR_0006_Trusted_Review_Image_URL_Policy]].
- 2026-05-05: Documented modal-only review submission after removing the legacy inline/page form and `reviewFormStyle` setting.
- 2026-05-10: Updated gallery long-text behavior documentation after fixing photo-less reviews to expand inline instead of opening the photo-only lightbox. Related bug: [[Bug_Review_Detail_Lightbox_Risks]].
- 2026-05-10: Split documentation for the photo review detail lightbox from the multi-step review submission modal and linked open audit risks. Related source: [review-modal.js](src/widget/reviews-section/review-modal.js), related note: [[Product_Review_Lightbox]].
