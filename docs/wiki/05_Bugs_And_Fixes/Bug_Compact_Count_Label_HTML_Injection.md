---
type: bug
project: renuvex-product-reviews
status: active
created: 2026-06-06
updated: 2026-06-06
last_verified: 2026-06-06
confidence: high
tags:
  - bug
  - widget
  - summary-layout
  - compact
  - security
related:
  - "[[Bug_Index]]"
  - "[[Test_Strategy]]"
source_files:
  - "src/widget/core/helpers.js"
  - "src/widget/summary-layouts/compact/index.js"
  - "src/widget/summary-layouts/shared/actions-block.js"
  - "src/widget/summary-layouts/shared/bar-chart.js"
  - "src/widget/review-layouts/_shared.js"
  - "src/widget/reviews-section/render.js"
  - "src/widget/reviews-section/render/photo-strip.js"
  - "src/widget/reviews-section/review-modal.js"
  - "tests/widget-runtime-smoke.spec.ts"
---

# Bug - Compact Count Label HTML Injection

## Date
2026-06-06

## Status
Fixed on 2026-06-06.

## Area
Widget, compact summary layout, merchant-editable count label.

## Symptoms
The compact summary trigger rendered the merchant-editable `settings.countLabel` inside a `trigger.innerHTML` template. Other summary layouts rendered the same label through `textContent`.

This was a low-severity authenticated merchant/admin-controlled stored HTML injection risk. It was not a public visitor input path, but a compromised or malicious merchant setting could be parsed as storefront HTML.

## Proof
- `countLabel` is a schema-driven text field with `maxLength: 20`.
- The compact layout previously interpolated `settings.countLabel` into the `.renuvex-pr-compact-trigger-text` HTML string.
- A 20-character markup payload such as `<svg data-x=x></svg>` fits the server-side max length and would be parsed as markup when placed inside `innerHTML`.

## Root Cause
The compact trigger needs trusted SVG markup for the rating stars and caret, so it uses `innerHTML` for those icon fragments. When `countLabel` changed from the static `Yorum` literal to a merchant-editable setting, the dynamic label remained in that HTML template instead of being written as text.

## Fix
- Kept the trusted star/caret SVG fragments in the existing `innerHTML` path.
- Changed the dynamic count label span to be populated through `textContent`.
- Added a shared `settingText(value, fallback)` helper for merchant-editable widget labels so whitespace-only values fall back consistently before being written to the DOM.
- Added runtime smoke coverage proving compact count labels remain literal text and do not create nested SVG/HTML elements.
- Added runtime smoke coverage proving whitespace-only merchant text settings fall back for the widget title, count label, write button, photo-strip title, merchant reply label, and rating-bar label.

## Prevention
- Merchant-editable text must be normalized with `settingText(...)` when it has a default fallback, then written with `textContent` or equivalent escaping.
- If a layout still needs `innerHTML` for trusted icon markup, keep merchant text out of the HTML string and set it on a separate DOM node.
- Keep the compact count-label and merchant-text fallback regressions in `tests/widget-runtime-smoke.spec.ts`.

## Change Log
- 2026-06-06: Fixed compact summary count label rendering so merchant-editable labels are text-only, matching the other summary layouts.
- 2026-06-06: Centralized merchant-text fallback normalization through `settingText(...)` so whitespace-only labels do not render as blank storefront copy.
