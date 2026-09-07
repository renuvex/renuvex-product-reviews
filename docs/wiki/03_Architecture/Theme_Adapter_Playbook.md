---
type: architecture
project: renuvex-product-reviews
status: active
created: 2026-05-25
updated: 2026-08-10
last_verified: 2026-08-10
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
  - "[[ADR_0022_Placement_Allowlist_And_Lazy_Resync]]"
  - "[[ADR_0038_Runtime_Attested_Storefront_Placement]]"
source_files:
  - "src/lib/storefront-theme.ts"
  - "src/lib/storefront-theme-sync.ts"
  - "src/app/api/public/settings/route.ts"
  - "src/widget/core/settings.js"
  - "src/widget/themes/current-adapter.js"
  - "src/widget/themes/ozy/adapter.js"
  - "src/widget/themes/ozy/theme.js"
  - "src/widget/placement/capability.js"
  - "src/widget/core/context-epoch.js"
  - "src/widget/themes/generic/adapter.js"
  - "src/widget/listing-badges/inject.js"
  - "src/widget/rating-badge/index.js"
  - "src/widget/rating-badge/inject.js"
  - "src/widget/reviews-section/styles.js"
  - "src/widget/reviews-section/render.js"
---

# Theme Adapter Playbook

## Summary
Theme adapters are placement providers for storefront DOM differences. They are
not the primary source of page or product identity. Product/page context should
come from ikas Storefront Events when available; adapters answer only whether a
specific surface and exact Renuvex-owned mount point can be proven.

ikas does not provide a reliable public DOM slot contract today. Direct ikas
feedback says standard `data-*` attributes are planned for ikas Studio, but
they are not a current dependency. Until that changes, each supported theme
needs a documented adapter, exact positive fixtures, cross-theme negative
fixtures, and a live smoke test.

## Adapter Boundary
- Common code owns rendering, icons, colors, review data, owned-slot wrappers, duplicate guards, self-heal, and position guards.
- Theme adapters own selectors, allowlists, blocklists, product-title lookup, listing-title lookup, quick-view lookup, and optional mount-point overrides.
- Theme-specific selectors must stay inside `themes/<key>/theme.js` and `themes/<key>/adapter.js`; do not move Ozy selectors into the generic adapter.
- Base review widget CSS is theme-agnostic and is exported from `reviews-section/styles.js`; owned shared modules live under `reviews-section/styles/`. Theme folders should contain only selector/adapter logic or real theme override styles.
- `placementPolicy` selects either the provider-verified adapter, the bounded
  runtime detector set, or no adapter. Adapter selection never authorizes a DOM
  target by itself.
- Production PDP/listing/modal injection consumes the exact proof returned by
  `placement/capability.js`; it must not return to broad selectors after proof.
- Runtime detection is explicit opt-in. `generic` is never detectable, and an
  ambiguous multi-adapter match is a no-op.

## Current Ozy Spec
- Theme name: Ozy.
- Stable ikas theme id: `57225e07-aa38-4d38-9688-f6730ee16143`.
- Adapter key: `ozy`.
- Active theme match: currently unavailable. The live ikas v1/v2 `Storefront`
  schema did not expose `themes` or `mainStorefrontThemeId` on 2026-08-09.
  Ozy can instead be selected by strict runtime attestation; historical stable
  provider evidence, when valid, selects the same adapter through
  `provider_verified`.
- PDP title selectors: `.product-name-main h1.product-name`, `.product-name-main h1`, `h1.product-name`.
- Listing title selector: `.product-name`.
- Strict listing containers: `.category-products-main`,
  `.products-slider-main`, `.infinite-scroll-component`,
  `.single-product-container-main`, `.product-block-container`.
- `[class*="product-list"]` is legacy-only and is not production placement
  authority.
- Listing blocklist areas: header/nav, cart/basket, banner/hero/slider/marquee, and non-title links inside the single-product section.
- PDP badge mount: after the adapter-selected product title.
- Listing badge mount: no Ozy-specific override today; common code mounts the badge as a title sibling, and real theme exceptions belong in `getListingBadgeMountPoint(titleEl)`.
- A listing proof also requires a visible `.product-name`, one same-origin
  product link for the card, an exact mount point, and a current context epoch.
  Media is intentionally not required because lazy/text-only cards are valid.

## New Theme Checklist
- Decide explicitly whether the adapter is provider-only or runtime-detectable.
  Runtime detection is not enabled merely because an adapter exists.
- Record theme name, stable `themeId`, `themeVersionId`, adapter key, and `adapterMatchedBy`.
- After ikas restores a verified active-theme contract, add the
  `themeId -> adapterKey` mapping in `storefront-theme.ts`
  (`THEME_ADAPTER_BY_THEME_ID`). Provider evidence selects the adapter, while
  strict target proof remains mandatory.
- Add `themes/<key>/theme.js` selector constants and `themes/<key>/adapter.js`.
- Register the adapter in `current-adapter.js`; unknown keys must continue to
  resolve to `generic`, never to a concrete theme.
- For runtime detection, add bounded exact signatures and cross-theme negative
  fixtures. Do not add `main`, broad class-substring, generic heading, or title
  text as placement authority.
- Verify PDP title, listing cards, product sliders, home product sections, category grid, search results, blog product blocks, quick-view modal, header, footer, filters, hero/banner sections, and single-product blocks.
- Document tested URLs, false positives, false negatives, spacing quirks, and known risks on this page or a theme-specific note.
- After deploy, confirm the expected `placementPolicy`, runtime asset hash,
  exact targets, stale-response rejection, and no-op negative surfaces. The
  legacy `autoPlacementEnabled` value must remain `false`.

## Ozy Hardening Policy
Production placement uses exact Ozy selectors only. Legacy and preview helpers
do not authorize production placement. Change a strict selector only after a
fixture or live smoke test proves a false positive or false negative; every
expansion needs a corresponding negative fixture.

## Theme Smoke Test Log
Empirical results from live testing. Append observed behavior per theme here.

| Theme | themeId | Adapter / matchedBy | PDP badge | Listing badge | Review section | Notes |
|-------|---------|---------------------|-----------|---------------|----------------|-------|
| Ozy | `57225e07-aa38-4d38-9688-f6730ee16143` | `ozy` / `theme_id` | OK | OK | OK | Reference implementation. |
| Mine | `a7644737-8367-47f2-b4ab-dcfb2fa7d5f6` | `generic` / `none` (`generic_unknown`) | OFF (ADR_0022) | OFF (ADR_0022) | OK (shadow-isolated, opt-in mount) | Host rule `.hOHcRx img { width:100% !important }` no longer reaches into Shadow DOM (ADR_0021). Badges now silent on this theme (ADR_0022 placement allowlist). |
| Siva (renamed "Siva test") | stable across rename | `generic` / `none` (`generic_unknown`) | OFF (ADR_0022) | OFF (ADR_0022) | OK (110px thumbs) | Rename test proof: `themeId` unchanged → `metadataIdentity` matches → adapter stable. |
| Ares | `98c72ebc-aa2f-4fb7-9b36-3570e94394da` | `generic` / `none` (`generic_unknown`) | OFF (ADR_0022) | OFF (ADR_0022) | OK if explicit mount | Cross-merchant test 2026-05-27: identical `themeId` on two independent stores; version upgrade flipped `activeThemeVersionId` (`3ba12649...` → `fcfdf2b5...`) but kept `activeThemeId`. Adapter still pending. |
| The Nile | `ffddfc61-6363-4dea-9306-ca9c9bd807c0` | `generic` / `none` (`generic_unknown`) | OFF (ADR_0022) | OFF (ADR_0022) | OK if explicit mount | Used as the "switch + return" tracer for theme identity persistence; ids stable across switch-back. Adapter pending. |

Key takeaways:
- **2026-05-25:** `themeId`-based identity is correct; theme renames are safe.
- **2026-05-25:** Explicit `data-renuvex-widget="reviews"` mount is more robust than heuristic badges.
- **2026-05-26 ([[ADR_0021_Shadow_DOM_Isolation_Of_Review_Surfaces]]):** Review section / lightbox / form wizard render inside open Shadow DOM roots; host-theme selector rules (like the Mine `img` `!important` bleed) cannot reach inside.
- **2026-05-27 ([[ADR_0022_Placement_Allowlist_And_Lazy_Resync]]):** Auto-placed badges are now gated on `adapterMatchedBy === 'theme_id'`. Unknown themes are silent until an adapter ships. Empirical evidence: `activeThemeId` is a cross-merchant global catalog id, and theme version upgrades preserve it (only `activeThemeVersionId` changes).
- **2026-05-27 ([[ADR_0022_Placement_Allowlist_And_Lazy_Resync]]):** `/api/public/settings` triggers a lazy theme resync (`reason: 'lazy_storefront'`, threshold 30 minutes) so DB metadata refreshes between dashboard opens / cron without requiring merchant action. ikas does not expose a `store/theme/*` webhook scope (Admin API introspection 2026-05-27).
- **2026-08-10 ([[ADR_0038_Runtime_Attested_Storefront_Placement]]):**
  versioned policy replaces the legacy placement boolean; Ozy is the only
  runtime-detectable adapter, both provider/runtime selection use strict target
  proofs, and retained old runtimes are safety-first disabled.

## Related Source Files
- [src/lib/storefront-theme.ts](src/lib/storefront-theme.ts)
- [src/widget/themes/current-adapter.js](src/widget/themes/current-adapter.js)
- [src/widget/themes/ozy/adapter.js](src/widget/themes/ozy/adapter.js)
- [src/widget/themes/ozy/theme.js](src/widget/themes/ozy/theme.js)
- [src/widget/reviews-section/styles.js](src/widget/reviews-section/styles.js)

## Obsidian Links
- [[Ikas_Theme_Limitations]]
- [[Ikas_Storefront_Script_Capabilities]]
- [[Widget_Architecture]]
- [[Listing_Rating_Widget]]
