---
type: widget
project: ikas-review-app
status: active
created: 2026-05-05
updated: 2026-05-10
tags:
  - widget
  - reviews
related:
  - "[[Index]]"
  - "[[Storefront_Widget_Overview]]"
  - "[[Widget_Architecture]]"
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
2. Fetches `/api/public/settings` (cached) and `/api/public/reviews` (cached).
3. Reads layout choice from settings → looks up registry in [summary-layouts/index.js](src/widget/summary-layouts/index.js) and [review-layouts/index.js](src/widget/review-layouts/index.js).
4. `render.js` composes summary + reviews + CTA. State stored in [core/state.js](src/widget/core/state.js).
5. CTA opens the multi-step submission wizard.

## Photo review detail lightbox
- Detail lightbox source: [review-modal.js](src/widget/product-widget/review-modal.js). Full note: [[Product_Review_Lightbox]].
- Entry points include review images inside card/list/gallery layouts and the top photo strip rendered by [render.js](src/widget/product-widget/render.js).
- In gallery layout, long photo-backed reviews can use the lightbox for full detail; long photo-less reviews expand inline and must not open the photo-only lightbox.
- This lightbox is separate from the submission wizard under [review-form-modal/](src/widget/product-widget/review-form-modal/).
- Open audit risks are tracked in [[Bug_Review_Detail_Lightbox_Risks]].

## Submission flow (modal)
- Steps managed in [product-widget/review-form-modal/wizard-state.js](src/widget/product-widget/review-form-modal/wizard-state.js).
- Photos uploaded via `/api/public/upload/sign` → direct to Cloudinary.
- On submit → `POST /api/public/reviews` → status set by auto-approve mode.
- The legacy inline/page form was removed; all review CTAs open the multi-step modal.

## Pagination, filtering, sorting
- Pagination: 10 per page (server-side).
- Sort: `newest` / `highest` / `lowest`.
- Filter: by rating (1..5), by `hasImages=true`.
- Bar chart in summary uses `ratingCounts` returned by `/api/public/reviews` (filter-independent).

## Related Source Files
- [src/widget/product-widget/](src/widget/product-widget/)
- [src/widget/summary-layouts/](src/widget/summary-layouts/)
- [src/widget/review-layouts/](src/widget/review-layouts/)
- [src/app/api/public/reviews/route.ts](src/app/api/public/reviews/route.ts)
- [src/app/api/public/upload/sign/route.ts](src/app/api/public/upload/sign/route.ts)

## Obsidian Links
- [[Storefront_Widget_Overview]]
- [[Widget_Architecture]]
- [[Widget_Customization]]
- [[Product_Rating_Badge]]
- [[Product_Review_Lightbox]]
- [[Listing_Rating_Widget]]

## Change Log
- 2026-05-05: Documented modal-only review submission after removing the legacy inline/page form and `reviewFormStyle` setting.
- 2026-05-10: Updated gallery long-text behavior documentation after fixing photo-less reviews to expand inline instead of opening the photo-only lightbox. Related bug: [[Bug_Review_Detail_Lightbox_Risks]].
- 2026-05-10: Split documentation for the photo review detail lightbox from the multi-step review submission modal and linked open audit risks. Related source: [review-modal.js](src/widget/product-widget/review-modal.js), related note: [[Product_Review_Lightbox]].
