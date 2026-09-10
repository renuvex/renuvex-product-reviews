---
type: architecture
project: renuvex-product-reviews
status: active
created: 2026-05-07
updated: 2026-09-10
last_verified: 2026-09-10
confidence: high
source_files:
  - "src/widget/reviews-section/styles.js"
  - "src/widget/reviews-section/styles/base.js"
  - "src/widget/reviews-section/styles/summary-controls.js"
  - "src/widget/summary-layouts/classic/styles.js"
  - "src/widget/summary-layouts/classic/index.js"
  - "src/widget/summary-layouts/compact/styles.js"
  - "src/widget/summary-layouts/hero/styles.js"
  - "src/widget/summary-layouts/minimal/styles.js"
  - "src/widget/summary-layouts/split/styles.js"
tags:
  - widget
  - layout
  - css
  - padding
  - responsive
related:
  - "[[Widget_Customization]]"
  - "[[Storefront_Widget_Overview]]"
  - "[[Widget_Files_Map]]"
---

# Summary Layout Padding Strategy

## Agent Brief

This page owns spacing and title-alignment rules shared by classic, compact,
hero, minimal, and split review summaries. Shared defaults live in
`summary-layouts/shared/summary-base.js` and review-section base styles;
layout-specific files override only their composition. Keep the 600px general
breakpoint and 768px split breakpoint synchronized with source and responsive
tests rather than duplicating magic values elsewhere.

## Summary

Spacing, margin, and title-alignment strategy for all summary layouts
(`classic`, `compact`, `hero`, `minimal`, `split`). The values below were
rechecked against the focused source files on 2026-09-10.

Classic/default summary root CSS now lives in `summary-layouts/classic/styles.js`. Shared child CSS such as bar rows, action rows, and filters lives in `reviews-section/styles/summary-controls.js`; shared root/mobile tokens live in `reviews-section/styles/base.js`. `reviews-section/styles.js` keeps the stable `CLASSIC_CSS` aggregation contract.

## Design Principles

1. **Consistency**: layouts share spacing tokens and common rules instead of
   duplicating unexplained values.
2. **Desktop gutters**: narrow containers and merchant themes must not pin
   content to an edge.
3. **Title alignment**: classic is centered; compact, hero, minimal, and split
   use layout-local left alignment on desktop.
4. **Responsive ownership**: the general mobile breakpoint is `600px`; split
   uses `768px` for its stacked tablet/mobile composition.

## Padding Reference Table

### Desktop (>= 601px)

| Layout | `.renuvex-pr-summary` Padding | Panel/Inner Padding | Baslik Hizasi | Not |
|---|---|---|---|---|
| `classic` | `16px 28px 24px` | — (summary = panel) | ortada | Base/default layout, en fazla padding |
| `compact` | `0 16px` | `16px 28px 24px` (panel) | sol | Header+trigger padding `0`, summary yan padding `16px` |
| `hero` | `12px 8px` | — | sol | 2026-05-07: yan padding `0` -> `16px` -> `8px` |
| `minimal` | `8px` | — | sol | 2026-05-07: yan padding `0` -> `16px` -> `8px` |
| `split` | `16px 8px` | — | sol | 2026-05-07: yan padding `0` -> `16px` -> `8px` |

### Mobile (<= 600px / 768px)

| Layout | `.renuvex-pr-summary` Padding | Baslik Hizasi | Gap (Vertical) |
|---|---|---|---|
| `classic` | `16px 16px` | ortada | `14px` |
| `compact` | `16px 16px` | sol | `20px` (header-to-panel) |
| `hero` | `16px 16px` | sol | `12px` |
| `minimal` | `16px 16px` | sol | `12px` |
| `split` | `16px 16px` | sol | `20px` |

## CSS Variables

| Variable | Default | Kullanim Yeri |
|---|---|---|
| `--renuvex-pr-pad-summary-mobile` | `16px` | Tum summary layout'larin mobile yan padding'i |
| `--renuvex-pr-pad-review-mobile` | `16px` | Review item'larin (card/list/gallery) mobile yan padding'i |
| `--renuvex-pr-col-gap` | `4px` | Bar/action column gap for the default summary; split can override through its own layout CSS. |

Default summary root variables live in [src/widget/summary-layouts/classic/styles.js](src/widget/summary-layouts/classic/styles.js). Shared widget/mobile padding tokens live in [src/widget/reviews-section/styles/base.js](src/widget/reviews-section/styles/base.js).

## Baslik Hizalama

Base `.renuvex-pr-title` rule:
```css
.renuvex-pr-title {
  text-align: left;  /* 2026-05-07: center -> left */
}
```

Mobile override:
```css
@media(max-width:600px) {
  .renuvex-pr-title {
    text-align: center;  /* mobile'da ortali */
  }
}
```

Layout-spesifik baslik override'lari:
- `.renuvex-pr-title-classic` — [classic/styles.js](src/widget/summary-layouts/classic/styles.js), centered default/classic title.
- `.renuvex-pr-title-compact` — [compact/styles.js](src/widget/summary-layouts/compact/styles.js), left aligned.
- `.renuvex-pr-title-hero` — [hero/styles.js](src/widget/summary-layouts/hero/styles.js), left aligned.
- `.renuvex-pr-title-minimal` — [minimal/styles.js](src/widget/summary-layouts/minimal/styles.js), left aligned.
- `.renuvex-pr-title-split` — [split/styles.js](src/widget/summary-layouts/split/styles.js), left aligned on desktop and centered at its split mobile breakpoint.

## Breakpoint

Sistemde iki ana breakpoint yaklasimi vardir:

1. **Genel Breakpoint (`600px`)**: Coğu layout (Classic, Hero, Minimal, Compact) 600px'de mobile gecer.
2. **Split Layout Breakpoint (`768px`)**: Split layout, tabletleri de mobil dikey dizilimde tutmak icin 768px breakpoint'ini kullanir.

```css
@media(max-width:600px) { /* Standart mobile */ }
@media(max-width:768px) { /* Split layout mobile/tablet */ }
```

## Source Files

- [src/widget/reviews-section/styles.js](src/widget/reviews-section/styles.js) — stable `CLASSIC_CSS` aggregator
- [src/widget/reviews-section/styles/base.js](src/widget/reviews-section/styles/base.js) — base `.renuvex-pr-title`, widget root tokens, mobile review/title padding
- [src/widget/reviews-section/styles/summary-controls.js](src/widget/reviews-section/styles/summary-controls.js) — shared bar chart, action row, and filter menu CSS
- [src/widget/summary-layouts/classic/styles.js](src/widget/summary-layouts/classic/styles.js) — classic/default summary root, title, avg/count/recommend styles
- [src/widget/summary-layouts/classic/index.js](src/widget/summary-layouts/classic/index.js) — classic render
- [src/widget/summary-layouts/compact/styles.js](src/widget/summary-layouts/compact/styles.js) — compact header + panel padding
- [src/widget/summary-layouts/hero/styles.js](src/widget/summary-layouts/hero/styles.js) — hero padding
- [src/widget/summary-layouts/minimal/styles.js](src/widget/summary-layouts/minimal/styles.js) — minimal padding
- [src/widget/summary-layouts/split/styles.js](src/widget/summary-layouts/split/styles.js) — split padding + 768px breakpoint
