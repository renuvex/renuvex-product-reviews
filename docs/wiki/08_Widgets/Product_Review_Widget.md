---
type: widget
project: renuvex-product-reviews
status: active
created: 2026-05-05
updated: 2026-05-27
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
  - "[[Bug_Review_Wizard_Focus_Trap_Accessibility]]"
---

# Product Review Widget

## Summary
The full review block on a product detail page: rating summary (with bar chart for distribution), filter/sort controls, the review list, photo gallery strip, a "Write a Review" CTA that opens a multi-step submission modal, and a separate photo review detail lightbox. Composed of swappable summary and review layouts.

## Settings (`reviews` widgetId)
Source: [widgetDefs.ts](src/components/home-page/widgets/widgetDefs.ts).

Recurring categories:
- General — show/hide widget title, photo gallery title, etc.
- Layout — `summaryLayout` (`classic` / `compact` / `hero` / `minimal` / `split`) and `reviewLayout` (`card` / `gallery` / `list`)
- Form — modal wizard fields/colors and auto-approve mode
- Colors (basic + advanced tier)
- Icons — review icon (star / heart), filter icon (Sliders / Funnel)
- Ranges — sizes, gaps
- Auto-approve — `manual` / `4plus` / `5stars` / `all` (and legacy boolean for back-compat)

## Render path
1. `bootstrap.js` runs only from the `reviews-main` product surface and verifies the explicit review mount before heavy work.
2. Fetches `/api/public/settings` (cached), then calls `reviews-api.js` for `/api/public/reviews` and photoStrip fetches (cached; stale reviews are preferred on failures).
3. Reads layout choice from settings → looks up registry in [summary-layouts/index.js](src/widget/summary-layouts/index.js) and [review-layouts/index.js](src/widget/review-layouts/index.js).
4. `render.js` composes summary + reviews + CTA. Review fetch errors render a retryable error state and do not reuse the empty-review UI. State stored in [core/state.js](src/widget/core/state.js).
5. CTA opens the multi-step submission wizard.

Mount behavior: [render.js](src/widget/reviews-section/render.js) prefers a merchant/theme-provided mount point `<div data-renuvex-widget="reviews"></div>`. If the mount is missing, the review section does **not** render — placement is opt-in (no auto-create). The PDP rating badge is a separate "badge" feature: it auto-places on the product title and is gated only by the badge widget toggle, so it shows independently of the review-section mount. The review section root is `#renuvex-reviews-widget` (inner container `#renuvex-reviews`); the PDP badge scroll target is `#renuvex-reviews`. `data-renuvex-widget="<type>"` is the canonical public mount scheme for all widgets (e.g. a future carousel uses `data-renuvex-widget="carousel"`). Related bug: [[Bug_Product_Widget_Missing_Auto_Mount]].

## Photo review detail lightbox
- Detail lightbox source: [review-modal.js](src/widget/reviews-section/review-modal.js). Full note: [[Product_Review_Lightbox]].
- Entry points include review images inside card/list/gallery layouts and the top photo strip rendered by [render.js](src/widget/reviews-section/render.js).
- All photo entry points use trusted image helpers; third-party `https://` URLs and `data:image` payloads are not rendered on storefronts.
- In gallery layout, long photo-backed reviews can use the lightbox for full detail; long photo-less reviews expand inline and must not open the photo-only lightbox.
- This lightbox is separate from the submission wizard under [review-form-modal/](src/widget/reviews-section/review-form-modal/).
- Open audit risks are tracked in [[Bug_Review_Detail_Lightbox_Risks]].

## Submission flow (modal)
- Steps managed in [reviews-section/review-form-modal/wizard-state.js](src/widget/reviews-section/review-form-modal/wizard-state.js).
- The wizard shell exposes modal dialog semantics and traps keyboard focus while open. Focus moves into the active step on open/step change and returns to the opening control on close. Related bug: [[Bug_Review_Wizard_Focus_Trap_Accessibility]].
- Photos uploaded via `/api/public/upload/sign` → direct to Cloudinary under `review_images/stores/<storeId>`.
- Photo step allows **parallel uploads** — the add button stays enabled while existing uploads are in flight. Each pending upload is tracked independently in `pendingImages`. The submission step blocks submit with a "fotoğraflar yükleniyor" message until every pending upload resolves. Upper bound `MAX_PHOTOS=3` is enforced across completed + pending so parallel selection never exceeds the cap.
- Auto-jump to the next step fires only on the user's first real photo action (no completed, no pending). Returning to the photo step to add more keeps the user on that step.
- On submit → `POST /api/public/reviews`; image URLs are validated against the trusted Cloudinary policy before storage, then status is set by auto-approve mode.
- The legacy inline/page form was removed; all review CTAs open the multi-step modal.

## Pagination, filtering, sorting
- Pagination: 10 per page (server-side); `limit` query param clamped 1-30 for ad-hoc fetches (photo strip uses 15).
- Sort: `newest` / `highest` / `lowest`.
- Filter: by rating (1..5), by `hasImages=true`.
- Bar chart in summary uses `ratingCounts` returned by `/api/public/reviews` (filter-independent).

## Photo strip
- Dedicated horizontal strip above the review list, populated by a separate `hasImages=true&limit=15&orderBy=newest` fetch, independent of sort/filter/load-more.
- Cap fixed at 15 (no admin setting), newest-first rotation.
- Full doc: [[Photo_Strip]]. Decision: [[ADR_0007_Photo_Strip_Cap_And_Rotation]].

## Related Source Files
- [src/widget/reviews-section/](src/widget/reviews-section/)
- [src/widget/summary-layouts/](src/widget/summary-layouts/)
- [src/widget/review-layouts/](src/widget/review-layouts/)
- [src/app/api/public/reviews/route.ts](src/app/api/public/reviews/route.ts)
- [src/app/api/public/upload/sign/route.ts](src/app/api/public/upload/sign/route.ts)
- [src/lib/review-images.ts](src/lib/review-images.ts)

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
- [[Bug_Product_Widget_Missing_Auto_Mount]]
- [[Bug_Review_Wizard_Focus_Trap_Accessibility]]

## Change Log
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
