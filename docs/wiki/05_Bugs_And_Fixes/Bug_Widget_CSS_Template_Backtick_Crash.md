---
type: bug
project: ikas-review-app
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
5. Because the bundle fails during evaluation, neither `#ikas-reviews` nor `#ikr-rating-badge` is created.

## Root Cause
[styles.js](src/widget/themes/ozy/styles.js) exports widget CSS through a JavaScript template literal. A CSS comment inside that template literal contained raw backticks around `.ikr-modal-left`.

When esbuild bundled the widget, those backticks prematurely closed the JavaScript template literal. The following CSS text was then parsed as JavaScript, causing the browser to look for a `modal` variable and throw before widget initialization.

## Fix
Removed the raw backticks from the CSS comment in [styles.js](src/widget/themes/ozy/styles.js), then rebuilt [public/widget.js](public/widget.js).

The source now contains only the template literal opener and closer backticks for `CLASSIC_CSS`, and `node --check public/widget.js` passes.

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
