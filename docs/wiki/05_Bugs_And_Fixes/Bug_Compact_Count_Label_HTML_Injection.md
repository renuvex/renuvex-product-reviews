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
  - "src/widget/summary-layouts/compact/index.js"
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
- Added runtime smoke coverage proving compact count labels remain literal text and do not create nested SVG/HTML elements.

## Prevention
- Merchant-editable text must be written with `textContent` or equivalent escaping.
- If a layout still needs `innerHTML` for trusted icon markup, keep merchant text out of the HTML string and set it on a separate DOM node.
- Keep the compact count-label regression in `tests/widget-runtime-smoke.spec.ts`.

## Change Log
- 2026-06-06: Fixed compact summary count label rendering so merchant-editable labels are text-only, matching the other summary layouts.
