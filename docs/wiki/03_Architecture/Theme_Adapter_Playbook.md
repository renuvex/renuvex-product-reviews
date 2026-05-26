---
type: architecture
project: renuvex-product-reviews
status: active
created: 2026-05-25
updated: 2026-05-25
last_verified: 2026-05-25
confidence: high
tags:
  - widget
  - theme-adapter
  - ikas
related:
  - "[[Ikas_Theme_Limitations]]"
  - "[[Ikas_Storefront_Script_Capabilities]]"
  - "[[Widget_Architecture]]"
  - "[[Listing_Rating_Widget]]"
  - "[[ADR_0017_Badge_Architecture]]"
  - "[[ADR_0018_Widget_Ownership_And_Placement_Resilience]]"
source_files:
  - "src/lib/storefront-theme.ts"
  - "src/lib/storefront-theme-sync.ts"
  - "src/widget/themes/current-adapter.js"
  - "src/widget/themes/ozy/adapter.js"
  - "src/widget/themes/ozy/theme.js"
  - "src/widget/themes/generic/adapter.js"
  - "src/widget/listing-badges/inject.js"
  - "src/widget/product-widget/rating-badge.js"
  - "src/widget/product-widget/styles.js"
---

# Theme Adapter Playbook

## Summary
Theme adapters are the fallback placement layer for storefront DOM differences. They are not the primary source of page or product identity. Product/page context should come from ikas Storefront Events when available; adapters answer only where a Renuvex-owned slot should mount and which theme links should be ignored.

ikas does not provide a reliable public DOM slot contract today. Direct ikas feedback says standard `data-*` attributes are planned for ikas Studio, but they are early and will not be broadly available immediately. Until that changes, each supported theme needs a documented adapter and smoke test.

## Adapter Boundary
- Common code owns rendering, icons, colors, review data, owned-slot wrappers, duplicate guards, self-heal, and position guards.
- Theme adapters own selectors, allowlists, blocklists, product-title lookup, listing-title lookup, quick-view lookup, and optional mount-point overrides.
- Theme-specific selectors must stay inside `themes/<key>/theme.js` and `themes/<key>/adapter.js`; do not move Ozy selectors into the generic adapter.
- Base review widget CSS is theme-agnostic and lives in `product-widget/styles.js`. Theme folders should contain only selector/adapter logic or real theme override styles.

## Current Ozy Spec
- Theme name: Ozy.
- Stable ikas theme id: `57225e07-aa38-4d38-9688-f6730ee16143`.
- Adapter key: `ozy`.
- Active theme match: `theme_id` through `listStorefront.themes[].isMainTheme`.
- PDP title selectors: `.product-name-main h1.product-name`, `.product-name-main h1`, `h1.product-name`.
- Listing title selector: `.product-name`.
- Listing allowlist containers: `.category-products-main`, `.products-slider-main`, `.infinite-scroll-component`, `[class*="product-list"]`, `.single-product-container-main`, `.product-block-container`.
- Listing blocklist areas: header/nav, cart/basket, banner/hero/slider/marquee, and non-title links inside the single-product section.
- PDP badge mount: after the adapter-selected product title.
- Listing badge mount: no Ozy-specific override today; the shared rollout gate decides sibling vs legacy mount.
- Known risks: broad `[class*="product-list"]`, old storefront markup can still contain `#ikas-reviews-anchor`, and new merchant sections may reuse product-like classes outside real product cards.

## New Theme Checklist
- Record theme name, stable `themeId`, `themeVersionId`, adapter key, and `adapterMatchedBy`.
- Add the `themeId -> adapterKey` mapping in `storefront-theme.ts`.
- Add `themes/<key>/theme.js` selector constants and `themes/<key>/adapter.js`.
- Register the adapter in `current-adapter.js` and widen accepted adapter keys where needed.
- Verify PDP title, listing cards, product sliders, home product sections, category grid, search results, blog product blocks, quick-view modal, header, footer, filters, hero/banner sections, and single-product blocks.
- Document tested URLs, false positives, false negatives, spacing quirks, and known risks on this page or a theme-specific note.

## Ozy Hardening Policy
Do not tighten Ozy selectors just because they look broad. Change selectors only after a fixture or live smoke test proves a false positive or false negative. The current safe order is documentation, fixture/live verification, then targeted selector changes.

## Theme Smoke Test Log
Empirical results from live testing. Append observed behavior per theme here.

| Theme | themeId | Adapter / matchedBy | PDP badge | Listing badge | Review section | Notes |
|-------|---------|---------------------|-----------|---------------|----------------|-------|
| Ozy | `57225e07-aa38-4d38-9688-f6730ee16143` | `ozy` / `theme_id` | OK | OK | OK | Reference implementation. |
| Mine | `a7644737-8367-47f2-b4ab-dcfb2fa7d5f6` | `generic` / `none` (`generic_unknown`) | shows | shows | renders but visually broken | Host rule `.hOHcRx img { width:100% !important }` overrides `.renuvex-pr-img`; needs CSS hardening, not a mount fix. |
| Siva (renamed "Siva test") | stable across rename | `generic` / `none` (`generic_unknown`) | shows | shows | OK (110px thumbs) | Renaming theme did not change adapter (themeId stable). No host `img` override. |

Key takeaways (2026-05-25):
- `themeId`-based identity is correct; theme renames are safe.
- `generic_unknown` does not hide surfaces today — badges still render on unknown themes via DOM heuristics.
- Explicit `data-renuvex-widget="reviews"` mount is more robust than heuristic badges.
- Review CSS needs host-theme `!important` hardening. See [[Ikas_Theme_Limitations]] and [[Open_Questions]] for the proposed two-layer visibility policy.

## Related Source Files
- [src/lib/storefront-theme.ts](src/lib/storefront-theme.ts)
- [src/widget/themes/current-adapter.js](src/widget/themes/current-adapter.js)
- [src/widget/themes/ozy/adapter.js](src/widget/themes/ozy/adapter.js)
- [src/widget/themes/ozy/theme.js](src/widget/themes/ozy/theme.js)
- [src/widget/product-widget/styles.js](src/widget/product-widget/styles.js)

## Obsidian Links
- [[Ikas_Theme_Limitations]]
- [[Ikas_Storefront_Script_Capabilities]]
- [[Widget_Architecture]]
- [[Listing_Rating_Widget]]
