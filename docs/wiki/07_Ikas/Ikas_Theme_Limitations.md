---
type: ikas
project: ikas-review-app
status: draft
created: 2026-05-05
updated: 2026-05-05
tags:
  - ikas
  - theme
related:
  - "[[Index]]"
  - "[[Ikas_Widget_Injection_Notes]]"
  - "[[Widget_Architecture]]"
---

# ikas Theme Limitations

## Summary
The widget runs inside arbitrary merchant themes. We have no formal theme app extension API today, so the widget relies on DOM heuristics. Document quirks here as you discover them.

## What we control
- A single `<script>` per storefront via `StorefrontJSScript`.
- Anchors we create at runtime (e.g. `#ikas-reviews-anchor`) — we own these once injected.
- CSS we ship inline / via stylesheet from the bundle.

## What we don't control
- Where the merchant's theme renders the product title, price, gallery.
- SPA-style theme nav (whether the theme replaces page state or full-loads).
- Custom themes with non-standard product detail markup.
- Theme-level CSS specificity wars (our styles can be overridden).

## Theme integration points (today)
- [src/widget/themes/ozy/](src/widget/themes/ozy/) — selectors and styles for the default theme.
- [src/widget/product-widget/title-finder.js](src/widget/product-widget/title-finder.js) — generic heuristic to locate product title.
- [src/widget/product-widget/bootstrap.js](src/widget/product-widget/bootstrap.js) — product detection (URL → meta → DOM).
- [src/widget/listing-badges/collect.js](src/widget/listing-badges/collect.js) — listing card discovery.

## Known constraints / TODO
- ❓ No structured theme widget surface from ikas — confirm with ikas docs whether one exists or is planned.
- ❓ Multi-storefront-per-merchant — settings are merchant-global today, ikas allows per-storefront variants. See [[Open_Questions]].
- ❓ Theme variants in build — `pnpm build:widget --theme=new-theme` exists but runtime selection of which bundle to load is unclear.

## Workarounds we use
- MutationObserver in [src/widget/observer.js](src/widget/observer.js) to handle SPA-style nav.
- Defensive selectors in `themes/ozy/`. New theme support = add a sibling folder with its own selectors and styles, then wire via the theme alias in [scripts/build-widget.mjs](scripts/build-widget.mjs).

## Notes
- When a merchant reports "widget doesn't show", it's usually one of: (a) script not injected, (b) product detection fails, (c) title-finder fails. Walk through these in order.
- Document new theme quirks as they're encountered — pattern: theme name + symptom + selector workaround.

## Related Source Files
- [src/widget/themes/](src/widget/themes/)
- [src/widget/product-widget/bootstrap.js](src/widget/product-widget/bootstrap.js)
- [src/widget/product-widget/title-finder.js](src/widget/product-widget/title-finder.js)
- [src/widget/observer.js](src/widget/observer.js)

## Obsidian Links
- [[Ikas_Widget_Injection_Notes]]
- [[Widget_Architecture]]
- [[Open_Questions]]
