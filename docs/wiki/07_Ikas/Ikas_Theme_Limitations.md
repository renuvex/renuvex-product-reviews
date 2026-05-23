---
type: ikas
project: ikas-review-app
status: active
created: 2026-05-05
updated: 2026-05-23
last_verified: 2026-05-23
confidence: high
tags:
  - ikas
  - theme
related:
  - "[[Index]]"
  - "[[Ikas_Widget_Injection_Notes]]"
  - "[[Ikas_Storefront_Script_Capabilities]]"
  - "[[Widget_Architecture]]"
source_files:
  - "src/lib/ikas-client/graphql-requests.ts"
  - "src/lib/storefront-theme.ts"
  - "src/lib/storefront-theme-sync.ts"
  - "src/app/api/admin/storefront-theme/sync/route.ts"
  - "src/app/api/public/settings/route.ts"
  - "src/widget/themes/"
  - "src/widget/core/settings.js"
  - "src/widget/product-widget/title-finder.js"
  - "src/widget/listing-badges/collect.js"
  - "src/widget/themes/current-adapter.js"
---

# ikas Theme Limitations

## Summary
The widget runs inside arbitrary merchant themes. ikas does not expose a browser-runtime theme detector or stable DOM mount points today, so the widget still needs Storefront Events for page/product context plus DOM heuristics or adapters for placement. ikas developer feedback on 2026-05-23 says Admin API `listStorefront` can identify the published theme by checking `themes[].isMainTheme: true`.

## What we control
- A single `<script>` per storefront via `StorefrontJSScript`.
- Anchors we create at runtime, for example `#ikas-reviews-anchor`.
- CSS we ship inline / via stylesheet from the bundle.

## What we don't control
- Where the merchant's theme renders product title, price, gallery, and cards.
- SPA-style theme navigation.
- Custom themes with non-standard product detail markup.
- Theme-level CSS specificity conflicts.

## Active Theme Detection
- Direct ikas developer feedback on 2026-05-23: there is no dedicated active-theme detector, but calling `listStorefront` and selecting the nested theme record with `themes[].isMainTheme: true` identifies the theme currently published.
- Schema verification on 2026-05-23 confirmed `isMainTheme` is on `StorefrontTheme`, not directly on `Storefront`. The current query requests `mainStorefrontThemeId` plus `themes { id name themeId themeVersionId isMainTheme deleted }`.
- This is an Admin/API-side signal, not a storefront browser global. The storefront widget cannot safely read it by itself without backend/public-settings plumbing.
- The app stores non-sensitive resolved metadata in `StoreSettings.storefrontTheme`, then exposes only `runtime.themeAdapterKey/source` from public settings. Adapter selection uses stable ikas `themeId` first because merchant-facing theme names are editable. Ozy maps by known theme id; unknown active theme ids use the generic adapter; no active theme signal falls back to Ozy for backwards compatibility.
- `StoreSettings.storefrontTheme` now uses a v2 JSON state: `{ syncStatus, stable, pending, lastCheckedAt, verificationDueAt, verifiedAt }`. Public settings read the stable theme while a newly observed theme is pending.
- This helps choose an adapter automatically, but it does not provide stable DOM anchors for product title, product card, or review block placement.

## Theme Sync Lifecycle
- Install and manual script repair still call the script lifecycle, and that path also updates theme metadata using the same `listStorefront` response.
- Admin dashboard open calls `POST /api/admin/storefront-theme/sync`, which only reads `listStorefront` and updates theme metadata. It does not create or update StorefrontJSScript records.
- Settings save schedules the same lightweight sync with Next.js `after()`, so widget setting writes are not blocked by ikas Admin API latency.
- When a sync observes a different active `themeId` from the current stable state, it writes the new metadata as `pending_verification` and keeps the previous stable adapter in public settings.
- Cron verifies pending themes after the delay window when maintenance runs. If the same pending theme is still active, it promotes it to stable; if ikas reports the old theme again, pending is cleared. Current Vercel config runs this daily for plan compatibility; true 2-5 minute verification needs Pro/Enterprise cron or a delayed queue such as QStash.
- The public storefront widget never calls ikas Admin APIs. Theme detection stays server-side to avoid exposing tokens, storefront latency, and rate-limit risk.

## Theme Integration Points Today
- [src/widget/themes/ozy/](src/widget/themes/ozy/) - selectors and styles for the default theme.
- [src/widget/themes/generic/](src/widget/themes/generic/) - conservative fallback adapter for unknown active themes.
- [src/lib/storefront-theme.ts](src/lib/storefront-theme.ts) - resolves Admin API storefront/theme metadata into public runtime adapter metadata.
- [src/widget/product-widget/title-finder.js](src/widget/product-widget/title-finder.js) - generic heuristic to locate product title.
- [src/widget/product-widget/bootstrap.js](src/widget/product-widget/bootstrap.js) - product detection fallback.
- [src/widget/listing-badges/collect.js](src/widget/listing-badges/collect.js) - listing card discovery.

## Known Constraints / TODO
- No structured theme widget surface or stable DOM mount point from ikas is confirmed today.
- Multi-storefront-per-merchant settings are merchant-global today; ikas allows per-storefront variants. See [[Open_Questions]].
- Theme variants in build: `pnpm build:widget --theme=new-theme` exists, but runtime selection of which bundle to load is unclear.

## Workarounds We Use
- MutationObserver in [src/widget/observer.js](src/widget/observer.js) to handle SPA-style navigation.
- Defensive selectors in `themes/ozy/`.
- Storefront Events remain the primary context source. `listStorefront.themes[].isMainTheme` can only help select an adapter; it does not replace runtime placement checks.

## Notes
- When a merchant reports "widget doesn't show", check in order: script injection, public settings/API calls, Storefront Events/product context, then placement/title-finder.
- Document new theme quirks as they are encountered: theme name, symptom, selector/adapter workaround, and verification URL.

## Related Source Files
- [src/lib/ikas-client/graphql-requests.ts](src/lib/ikas-client/graphql-requests.ts)
- [src/lib/storefront-theme.ts](src/lib/storefront-theme.ts)
- [src/lib/storefront-theme-sync.ts](src/lib/storefront-theme-sync.ts)
- [src/app/api/admin/storefront-theme/sync/route.ts](src/app/api/admin/storefront-theme/sync/route.ts)
- [src/widget/themes/](src/widget/themes/)
- [src/widget/product-widget/bootstrap.js](src/widget/product-widget/bootstrap.js)
- [src/widget/product-widget/title-finder.js](src/widget/product-widget/title-finder.js)
- [src/widget/observer.js](src/widget/observer.js)

## Obsidian Links
- [[Ikas_Widget_Injection_Notes]]
- [[Ikas_Storefront_Script_Capabilities]]
- [[Widget_Architecture]]
- [[Open_Questions]]
