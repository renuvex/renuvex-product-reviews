---
type: bug
project: renuvex-product-reviews
status: active
created: 2026-05-11
updated: 2026-05-11
tags:
  - bug
  - widget
  - storefront
  - deployment
  - reliability
related:
  - "[[Bug_Index]]"
  - "[[Solved_Issues]]"
  - "[[Widget_Files_Map]]"
  - "[[Product_Review_Widget]]"
  - "[[Product_Rating_Badge]]"
---

# Bug - Widget CSS Template Backtick Crash

## Date
2026-05-11

## Status
Fixed on 2026-05-11

## Area
Storefront widget, product detail page, bundled CSS, deployment

## Symptoms
The injected storefront script loaded successfully, but the product review area and product-title rating badge did not render.

Live console error:

```text
widget.js?publicApiKey=02786d4b-a09b-4b36-ad8c-56e6d396f6fd:257 Uncaught ReferenceError: modal is not defined
```

## Scenario
1. `https://dev-mertcopper.ikas.shop/premium-shorts` loads the injected script from `https://new-ikas-app.vercel.app/widget.js?publicApiKey=02786d4b-a09b-4b36-ad8c-56e6d396f6fd`.
2. The script request returns `200 OK`.
3. Public settings and reviews endpoints return valid data for the same `publicApiKey` and product.
4. Before the widget can subscribe to `IkasEvents`, bootstrap, or render, the browser parses a broken bundle and throws `ReferenceError: modal is not defined`.
5. Because the bundle fails during evaluation, neither `#ikas-reviews` nor `#renuvex-pr-rating-badge` is created.

## Root Cause
[styles.js](src/widget/themes/ozy/styles.js) exports widget CSS through a JavaScript template literal. A CSS comment inside that template literal contained raw backticks around `.renuvex-pr-modal-left`.

When esbuild bundled the widget, those backticks prematurely closed the JavaScript template literal. The following CSS text was then parsed as JavaScript, causing the browser to look for a `modal` variable and throw before widget initialization.

## Fix
Removed the raw backticks from the CSS comment in [styles.js](src/widget/themes/ozy/styles.js), then rebuilt [public/widget.js](public/widget.js).

The source now contains only the template literal opener and closer backticks for `CLASSIC_CSS`, and `node --check public/widget.js` passes.

## Verification
- `pnpm build:widget` passed and regenerated [public/widget.js](public/widget.js).
- `node --check public/widget.js` passed.
- `pnpm exec tsc --noEmit` passed.
- `pnpm exec eslint src/widget/themes/ozy/styles.js src/widget/product-widget/review-modal.js` passed.
- Live `widget.js` changed from the old build timestamp `2026-05-11T16:37:01.138Z` to the rebuilt timestamp `2026-05-11T16:57:25.370Z`.
- Live API checks returned valid data:
  - `/api/public/settings?publicApiKey=02786d4b-a09b-4b36-ad8c-56e6d396f6fd` returned `200`.
  - `/api/public/reviews?...productId=37fb6e3d-6085-4ac1-b0eb-7aaa63ada934` returned `200`, `totalCount=22`, `avgRating=4.4`.
- User browser verification on `https://dev-mertcopper.ikas.shop/premium-shorts` confirmed the storefront issue was fixed after deploy.

## Critical Diagnostic Notes
- When the injected script request is `200 OK` and `publicApiKey` matches an existing store, check the browser console before assuming an ikas injection or theme selector problem.
- A top-level bundle exception prevents all downstream widget behavior: `IkasEvents` subscription, product bootstrap, review render, and product-title badge injection.
- `#ikas-reviews` / `#renuvex-pr-rating-badge` both missing together can mean the render path never started, not just that the mount anchor or title selector failed.
- CSS stored in JavaScript template literals must not include raw backticks in comments or strings. This is especially important for `src/widget/themes/ozy/styles.js`.

## Files Changed
- [src/widget/themes/ozy/styles.js](src/widget/themes/ozy/styles.js)
- [public/widget.js](public/widget.js)

## Prevention
- Do not place unescaped raw backticks inside widget CSS template literals.
- After editing `styles.js`, run `pnpm build:widget` and `node --check public/widget.js`.
- Search `styles.js` for raw backticks; only the `CLASSIC_CSS` opener and closer should remain unless a backtick is intentionally escaped.

## Related Notes
- [[Widget_Files_Map]]
- [[Product_Review_Widget]]
- [[Product_Rating_Badge]]
- [[Bug_Index]]

## Change Log
- 2026-05-11: Fixed the deployed widget crash caused by raw backticks inside the CSS template literal.
- 2026-05-11: Added live verification notes after user confirmed the storefront review area and product-title badge render correctly in browser.
