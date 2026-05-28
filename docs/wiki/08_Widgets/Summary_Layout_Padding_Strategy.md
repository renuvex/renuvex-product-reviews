---
type: architecture
project: renuvex-product-reviews
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
4. **Mobile/desktop ayrimi**: Tek breakpoint (`600px`) uzerinden. Mobile'da `var(--renuvex-pr-pad-summary-mobile)` kullanilir.

## Padding Reference Table

### Desktop (>= 601px)

| Layout | `.renuvex-pr-summary` Padding | Panel/Inner Padding | Baslik Hizasi | Not |
|---|---|---|---|---|
| `classic` | `16px 28px 24px` | — (summary = panel) | sol | Base layout, en fazla padding |
| `compact` | `0 16px` | `16px 28px 24px` (panel) | sol | Header+trigger padding `0`, summary yan padding `16px` |
| `hero` | `12px 8px` | — | sol | 2026-05-07: yan padding `0` -> `16px` -> `8px` |
| `minimal` | `8px` | — | sol | 2026-05-07: yan padding `0` -> `16px` -> `8px` |
| `split` | `16px 8px` | — | sol | 2026-05-07: yan padding `0` -> `16px` -> `8px` |

### Mobile (<= 600px / 768px)

| Layout | `.renuvex-pr-summary` Padding | Baslik Hizasi | Gap (Vertical) |
|---|---|---|---|
| `classic` | `16px 16px` | ortada | `20px` |
| `compact` | `16px 16px` | sol | `20px` (header-to-panel) |
| `hero` | `16px 16px` | sol | `12px` |
| `minimal` | `16px 16px` | sol | `12px` |
| `split` | `16px 16px` | sol | `20px` |

## CSS Variables

| Variable | Default | Kullanim Yeri |
|---|---|---|
| `--renuvex-pr-pad-summary-mobile` | `16px` | Tum summary layout'larin mobile yan padding'i |
| `--renuvex-pr-pad-review-mobile` | `16px` | Review item'larin (card/list/gallery) mobile yan padding'i |
| `--renuvex-pr-col-gap` | `20px` | Summary block'lar arasi dikey bosluk (Classic/Split Mobile) |

Tanim yeri: [src/widget/reviews-section/styles.js](src/widget/reviews-section/styles.js).

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

Layout-spesifik baslik override'lari (hepsi `text-align: left`):
- `.renuvex-pr-title-compact` — [compact/styles.js](src/widget/summary-layouts/compact/styles.js)
- `.renuvex-pr-title-hero` — [hero/styles.js](src/widget/summary-layouts/hero/styles.js)
- `.renuvex-pr-title-minimal` — [minimal/styles.js](src/widget/summary-layouts/minimal/styles.js)
- `.renuvex-pr-title-split` — [split/styles.js](src/widget/summary-layouts/split/styles.js)

## Breakpoint

Sistemde iki ana breakpoint yaklasimi vardir:

1. **Genel Breakpoint (`600px`)**: Coğu layout (Classic, Hero, Minimal, Compact) 600px'de mobile gecer.
2. **Split Layout Breakpoint (`768px`)**: Split layout, tabletleri de mobil dikey dizilimde tutmak icin 768px breakpoint'ini kullanir.

```css
@media(max-width:600px) { /* Standart mobile */ }
@media(max-width:768px) { /* Split layout mobile/tablet */ }
```

## Source Files

- [src/widget/reviews-section/styles.js](src/widget/reviews-section/styles.js) — base `.renuvex-pr-summary`, `.renuvex-pr-title`, mobile block
- [src/widget/summary-layouts/classic/index.js](src/widget/summary-layouts/classic/index.js) — classic render
- [src/widget/summary-layouts/compact/styles.js](src/widget/summary-layouts/compact/styles.js) — compact header + panel padding
- [src/widget/summary-layouts/hero/styles.js](src/widget/summary-layouts/hero/styles.js) — hero padding
- [src/widget/summary-layouts/minimal/styles.js](src/widget/summary-layouts/minimal/styles.js) — minimal padding
- [src/widget/summary-layouts/split/styles.js](src/widget/summary-layouts/split/styles.js) — split padding + 768px breakpoint

## Change Log

- **2026-05-07**: Spacing ve Hizalama Guncellemesi.
  - Summary block'lar arasi dikey bosluk (gap) `12px` -> `20px` yapildi (Classic ve Split Mobile).
  - Split layout tablet breakpoint'i `601px` -> `769px` yapildi (Tablette dikey dizilim icin).
  - Compact layout mobil sızıntısı giderildi, panel ici bosluk `20px` yapildi.
  - Filtre butonu "Yorum Yap" butonu ile dikeyde esitlendi (`align-items: stretch`).
- **2026-05-07**: Desktop yan padding birligi saglandi. `hero`, `minimal`, `split` layout'larina `8px` yan padding eklendi.
- **2026-05-07**: Baslik hizalama birligi saglandi. Base `.renuvex-pr-title` `text-align: center` -> `left`.
- **2026-05-07**: Ikas temasi padding analizi yapildi. `--renuvex-pr-pad-summary-mobile` `16px`, `--renuvex-pr-pad-review-mobile` `16px` yapildi.
