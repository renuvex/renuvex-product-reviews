---
type: widget
project: ikas-review-app
status: active
created: 2026-05-05
updated: 2026-05-11
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
1. `bootstrap.js` decides this is a PDP, finds productId, calls `core/fetch.js`.
2. Fetches `/api/public/settings` (cached) and `/api/public/reviews` (cached; stale reviews are preferred on failures).
3. Reads layout choice from settings → looks up registry in [summary-layouts/index.js](src/widget/summary-layouts/index.js) and [review-layouts/index.js](src/widget/review-layouts/index.js).
4. `render.js` composes summary + reviews + CTA. Review fetch errors render a retryable error state and do not reuse the empty-review UI. State stored in [core/state.js](src/widget/core/state.js).
5. CTA opens the multi-step submission wizard.

Mount behavior: [render.js](src/widget/product-widget/render.js) prefers a merchant/theme-provided `#ikas-reviews-anchor`. If the anchor is missing, it creates one after the theme product container and falls back to `main` / `body`. This keeps the auto-injected widget independent from manual theme anchor drift. Related bug: [[Bug_Product_Widget_Missing_Auto_Mount]].

## Photo review detail lightbox
- Detail lightbox source: [review-modal.js](src/widget/product-widget/review-modal.js). Full note: [[Product_Review_Lightbox]].
- Entry points include review images inside card/list/gallery layouts and the top photo strip rendered by [render.js](src/widget/product-widget/render.js).
- All photo entry points use trusted image helpers; third-party `https://` URLs and `data:image` payloads are not rendered on storefronts.
- In gallery layout, long photo-backed reviews can use the lightbox for full detail; long photo-less reviews expand inline and must not open the photo-only lightbox.
- This lightbox is separate from the submission wizard under [review-form-modal/](src/widget/product-widget/review-form-modal/).
- Open audit risks are tracked in [[Bug_Review_Detail_Lightbox_Risks]].

## Submission flow (modal)
- Steps managed in [product-widget/review-form-modal/wizard-state.js](src/widget/product-widget/review-form-modal/wizard-state.js).
- Photos uploaded via `/api/public/upload/sign` → direct to Cloudinary.
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
- [src/widget/product-widget/](src/widget/product-widget/)
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

## Change Log
- 2026-05-11: Documented self-mounting PDP review anchor fallback after fixing deploy/theme cases where missing `#ikas-reviews-anchor` hid both the review block and product-title badge. Related bug: [[Bug_Product_Widget_Missing_Auto_Mount]].
- 2026-05-11: Documented retryable review fetch error state after separating API/network failures from valid empty review lists. Related bug: [[Bug_Review_Fetch_Error_Empty_State]].
- 2026-05-11: Photo strip decoupled from main reviews fetch — dedicated `hasImages=true&limit=15&orderBy=newest` call, cap 15, newest-first rotation. Lightbox now navigates strip dataset, closing the paged-slice navigation risk. Related ADR: [[ADR_0007_Photo_Strip_Cap_And_Rotation]]. Related note: [[Photo_Strip]]. Source: [bootstrap.js](src/widget/product-widget/bootstrap.js), [render.js](src/widget/product-widget/render.js), [state.js](src/widget/core/state.js), [route.ts](src/app/api/public/reviews/route.ts).
- 2026-05-10: Documented the trusted review image URL policy in the product review widget submission and display flow. Related ADR: [[ADR_0006_Trusted_Review_Image_URL_Policy]].
- 2026-05-05: Documented modal-only review submission after removing the legacy inline/page form and `reviewFormStyle` setting.
- 2026-05-10: Updated gallery long-text behavior documentation after fixing photo-less reviews to expand inline instead of opening the photo-only lightbox. Related bug: [[Bug_Review_Detail_Lightbox_Risks]].
- 2026-05-10: Split documentation for the photo review detail lightbox from the multi-step review submission modal and linked open audit risks. Related source: [review-modal.js](src/widget/product-widget/review-modal.js), related note: [[Product_Review_Lightbox]].
