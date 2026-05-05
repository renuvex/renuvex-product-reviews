---
type: widget
project: ikas-review-app
status: active
created: 2026-05-05
updated: 2026-05-05
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
The full review block on a product detail page: rating summary (with bar chart for distribution), filter/sort controls, the review list, photo gallery strip, and a "Write a Review" CTA that opens a multi-step modal. Composed of swappable summary and review layouts.

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
5. CTA opens modal (multi-step wizard).

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
- [[Listing_Rating_Widget]]

## Change Log
- 2026-05-05: Documented modal-only review submission after removing the legacy inline/page form and `reviewFormStyle` setting.
