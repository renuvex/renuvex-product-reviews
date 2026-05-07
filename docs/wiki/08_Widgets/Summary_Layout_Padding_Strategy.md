---
type: architecture
project: ikas-review-app
status: active
created: 2026-05-07
updated: 2026-05-07
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

## Summary

Tüm summary layout'lar (`classic`, `compact`, `hero`, `minimal`, `split`) icin padding, margin ve baslik hizalama stratejisi. Bu sayfa, 2026-05-07 tarihli duzeltmelerden sonra gecerli olan guncel durumu dokumante eder.

## Design Principles

1. **Tutarlilik**: Tum layout'lar ayni padding/margin dilini konusur. Magic number yerine token ve ortak kural.
2. **Desktop yan padding birligi**: Dar ekranlarda ve farkli temalarda icerik kenara yapismasin.
3. **Baslik hizalama birligi**: Tum layout'larda baslik sola yasli (mobile'da da).
4. **Mobile/desktop ayrimi**: Tek breakpoint (`600px`) uzerinden. Mobile'da `var(--ikr-pad-summary-mobile)` kullanilir.

## Padding Reference Table

### Desktop (>= 601px)

| Layout | `.ikr-summary` Padding | Panel/Inner Padding | Baslik Hizasi | Not |
|---|---|---|---|---|
| `classic` | `16px 28px 24px` | — (summary = panel) | sol | Base layout, en fazla padding |
| `compact` | `0 16px` | `16px 28px 24px` (panel) | sol | Header+trigger padding `0`, summary yan padding `16px` |
| `hero` | `12px 8px` | — | sol | 2026-05-07: yan padding `0` -> `16px` -> `8px` |
| `minimal` | `8px` | — | sol | 2026-05-07: yan padding `0` -> `16px` -> `8px` |
| `split` | `16px 8px` | — | sol | 2026-05-07: yan padding `0` -> `16px` -> `8px` |

### Mobile (<= 600px)

| Layout | `.ikr-summary` Padding | Baslik Hizasi |
|---|---|---|
| `classic` | `16px var(--ikr-pad-summary-mobile)` | sol |
| `compact` | `16px var(--ikr-pad-summary-mobile)` | sol |
| `hero` | `16px var(--ikr-pad-summary-mobile)` | sol |
| `minimal` | `16px var(--ikr-pad-summary-mobile)` | sol |
| `split` | `16px var(--ikr-pad-summary-mobile)` | sol |

## CSS Variables

| Variable | Default | Kullanim Yeri |
|---|---|---|
| `--ikr-pad-summary-mobile` | `8px` | Tum summary layout'larin mobile yan padding'i |
| `--ikr-pad-review-mobile` | `10px` | Review item'larin (card/list/gallery) mobile yan padding'i |

Tanim yeri: [src/widget/themes/ozy/styles.js](src/widget/themes/ozy/styles.js) (satir 47).

## Baslik Hizalama

Base `.ikr-title` rule:
```css
.ikr-title {
  text-align: left;  /* 2026-05-07: center -> left */
}
```

Mobile override:
```css
@media(max-width:600px) {
  .ikr-title {
    text-align: center;  /* mobile'da ortali */
  }
}
```

Layout-spesifik baslik override'lari (hepsi `text-align: left`):
- `.ikr-title-compact` — [compact/styles.js](src/widget/summary-layouts/compact/styles.js)
- `.ikr-title-hero` — [hero/styles.js](src/widget/summary-layouts/hero/styles.js)
- `.ikr-title-minimal` — [minimal/styles.js](src/widget/summary-layouts/minimal/styles.js)
- `.ikr-title-split` — [split/styles.js](src/widget/summary-layouts/split/styles.js)

## Breakpoint

Tek breakpoint: `600px`

```css
@media(max-width:600px) { /* mobile */ }
@media(min-width:601px)  { /* desktop */ }
```

Eski `768px` referansi (split yorumlarinda) 2026-05-07'de `600px`'ye cekildi.

## Source Files

- [src/widget/themes/ozy/styles.js](src/widget/themes/ozy/styles.js) — base `.ikr-summary`, `.ikr-title`, mobile block
- [src/widget/summary-layouts/classic/index.js](src/widget/summary-layouts/classic/index.js) — classic render (base padding burada tanimli degil, base'den gelir)
- [src/widget/summary-layouts/compact/styles.js](src/widget/summary-layouts/compact/styles.js) — compact header + panel padding
- [src/widget/summary-layouts/hero/styles.js](src/widget/summary-layouts/hero/styles.js) — hero padding
- [src/widget/summary-layouts/minimal/styles.js](src/widget/summary-layouts/minimal/styles.js) — minimal padding
- [src/widget/summary-layouts/split/styles.js](src/widget/summary-layouts/split/styles.js) — split padding + breakpoint

## Change Log

- **2026-05-07**: Desktop yan padding birligi saglandi. `hero`, `minimal`, `split` layout'larina `8px` yan padding eklendi (once `0`'di, sonra `16px` oldu, son olarak `8px` ile mobile ile tutarli hale getirildi). Related source: [hero/styles.js](src/widget/summary-layouts/hero/styles.js), [minimal/styles.js](src/widget/summary-layouts/minimal/styles.js), [split/styles.js](src/widget/summary-layouts/split/styles.js).
- **2026-05-07**: Baslik hizalama birligi saglandi. Base `.ikr-title` `text-align: center` -> `left`. Mobile'da `text-align: center` kalir. Tum layout-spesifik baslik override'lari guncellendi. Related source: [styles.js](src/widget/themes/ozy/styles.js), [compact/styles.js](src/widget/summary-layouts/compact/styles.js), [split/styles.js](src/widget/summary-layouts/split/styles.js).
- **2026-05-07**: Split layout yorum/kod uyuşmazligi duzeltildi. Yorumda `768px` -> `600px`, mobile baslik `center` -> `left`. Related source: [split/styles.js](src/widget/summary-layouts/split/styles.js).
- **2026-05-07**: Compact header fazla padding duzeltildi. `.ikr-compact-header` `padding: 8px 0` -> `0`, `.ikr-compact-trigger` `padding: 8px 0` -> `0`. Related source: [compact/styles.js](src/widget/summary-layouts/compact/styles.js).
- **2026-05-07**: Compact summary yan padding duzeltildi. `.ikr-summary-compact` `padding-top:0; padding-bottom:0` -> `padding:0 16px`. Base `.ikr-summary` rule'inin `28px` yan padding'ini devraliyordu; diger layout'larla (`hero`/`minimal`/`split`) tutarli `16px` yapildi. Related source: [compact/styles.js](src/widget/summary-layouts/compact/styles.js).
