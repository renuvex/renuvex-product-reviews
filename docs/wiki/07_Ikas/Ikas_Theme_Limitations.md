---
type: ikas
project: renuvex-product-reviews
status: active
created: 2026-05-05
updated: 2026-07-01
last_verified: 2026-07-01
confidence: high
tags:
  - ikas
  - theme
related:
  - "[[Index]]"
  - "[[Ikas_Widget_Injection_Notes]]"
  - "[[Ikas_Storefront_Script_Capabilities]]"
  - "[[Widget_Architecture]]"
  - "[[Theme_Adapter_Playbook]]"
source_files:
  - "src/lib/ikas-client/graphql-requests.ts"
  - "src/lib/storefront-theme.ts"
  - "src/lib/storefront-theme-lazy-sync.ts"
  - "src/lib/storefront-theme-sync.ts"
  - "src/app/api/admin/storefront-theme/sync/route.ts"
  - "src/app/api/public/settings/route.ts"
  - "src/app/api/public/storefront-theme/lazy-sync/route.ts"
  - "src/widget/themes/"
  - "src/widget/core/settings.js"
  - "src/widget/core/product-title.js"
  - "src/widget/listing-badges/collect.js"
  - "src/widget/themes/current-adapter.js"
  - "src/widget/reviews-section/styles.js"
---

# ikas Theme Limitations

## Summary
The widget runs inside arbitrary merchant themes. ikas does not expose a browser-runtime theme detector or stable DOM mount points today, so the widget still needs Storefront Events for page/product context plus DOM heuristics or adapters for placement. ikas developer feedback on 2026-05-23 says Admin API `listStorefront` can identify the published theme by checking `themes[].isMainTheme: true`. Direct ikas feedback also says standard `data-*` storefront attributes are planned for ikas Studio, but are too early and too sparsely deployed to rely on today.

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
- [src/widget/themes/ozy/](src/widget/themes/ozy/) - Ozy selectors, adapter behavior, and optional Ozy-specific style overrides.
- [src/widget/themes/generic/](src/widget/themes/generic/) - conservative fallback adapter for unknown active themes.
- [src/lib/storefront-theme.ts](src/lib/storefront-theme.ts) - resolves Admin API storefront/theme metadata into public runtime adapter metadata.
- [src/widget/core/product-title.js](src/widget/core/product-title.js) - generic heuristic to locate product title.
- [src/widget/reviews-section/bootstrap.js](src/widget/reviews-section/bootstrap.js) - product detection fallback.
- [src/widget/listing-badges/collect.js](src/widget/listing-badges/collect.js) - listing card discovery.
- [src/widget/reviews-section/styles.js](src/widget/reviews-section/styles.js) - shared Renuvex review widget CSS aggregator; owned shared modules live under `src/widget/reviews-section/styles/` and remain intentionally outside theme adapter folders.

## Known Constraints / TODO
- No structured theme widget surface or stable DOM mount point from ikas is confirmed today.
- Multi-storefront-per-merchant settings are merchant-global today; ikas allows per-storefront variants. See [[Open_Questions]].
- Theme variants in build: `pnpm build:widget --theme=new-theme` exists, but runtime selection of which bundle to load is unclear.
- ~~`generic_unknown` is an adapter selector, not a visibility policy~~ — **RESOLVED 2026-05-27** by [[ADR_0022_Placement_Allowlist_And_Lazy_Resync]]. The public runtime now carries `autoPlacementEnabled` (gates badges; false unless `adapterMatchedBy === 'theme_id'` AND adapter key is non-generic) and `reviewsMountEnabled` (gates the explicit-mount review section; true whenever active-theme metadata exists). Unknown themes silently skip auto-placement.
- ~~The review section is not isolated against host-theme `!important` CSS~~ — **RESOLVED 2026-05-26** by [[ADR_0021_Shadow_DOM_Isolation_Of_Review_Surfaces]]. The review section, photo lightbox, and review-form wizard now render inside their own open Shadow DOM roots; selector-targeted host rules (the `img{width:100%!important}` class of breakage) cannot cross the boundary. Theme typography still flows in via `:host { …: inherit }` so supported-theme parity is preserved.

## ikas Webhook Scopes (introspected 2026-05-27)
The Admin API `saveWebhooks` mutation accepts exactly 10 scopes:
- `store/order/created`, `store/order/updated`
- `store/product/created`, `store/product/updated`
- `store/customer/created`, `store/customer/updated`
- `store/customerFavoriteProducts/created`, `store/customerFavoriteProducts/updated`
- `store/stock/created`, `store/stock/updated`

**There is no `store/theme/*` (or storefront/script) webhook scope.** The Admin API exposes 55 total operations; storefront theme events are not among them. The merchant-facing "Bildirim Adresi" panel covers billing notifications and the app-uninstall notification only — not theme changes. Shopify's equivalent `THEMES_PUBLISH` webhook does not have an ikas counterpart. A feature request to ikas is parallel work; in the meantime [[ADR_0022_Placement_Allowlist_And_Lazy_Resync]] uses public settings as a freshness signal and `POST /api/public/storefront-theme/lazy-sync` as the non-blocking sync trigger (`reason: 'lazy_storefront'`) to keep `StoreSettings.storefrontTheme` fresh between dashboard opens / daily cron without putting ikas Admin API work in the cacheable read path.

## Unknown-theme behavior and CSS isolation (verified 2026-05-25 → 2026-05-29)
- **Identity tracking is correct.** Adapter selection follows the stable `themeId`, not the
  editable theme name. Renames (`Siva` → `Siva test` on 2026-05-25, `Ares` → `dsfdf` on
  2026-05-27) did not change the resolved adapter because `themeId` and the rest of the
  `metadataIdentity` fields were unchanged. Switching to a brand-new theme writes the new
  metadata as `pending_verification` and keeps the previous stable adapter until the
  verification window promotes it.
- **`themeId` is a cross-merchant catalog id.** 2026-05-27 cross-merchant test — Ares on two
  independent merchants returned identical `activeThemeId: 98c72ebc-aa2f-4fb7-9b36-3570e94394da`
  and identical `activeThemeVersionId: fcfdf2b5-2894-4aac-94ce-5e09603fe88b`. Per-merchant
  fields `activeStorefrontThemeId` and `mainStorefrontThemeId` differed as expected. The Ozy
  entry in `THEME_ADAPTER_BY_THEME_ID` resolved cleanly on the second merchant install with
  `adapterSource: 'auto'` + `adapterMatchedBy: 'theme_id'`, confirming the lookup works
  across stores. A single allowlist entry per supported theme covers every merchant using
  that theme.
- **Theme version upgrades preserve `activeThemeId`.** 2026-05-27 controlled test — upgrading
  Ares on Merchant A flipped only `activeThemeVersionId` (`3ba12649...` → `fcfdf2b5...`);
  `activeThemeId`, `activeStorefrontThemeId`, and `mainStorefrontThemeId` all stable. The
  rename tracer ("dsfdf") survived the upgrade, confirming ikas did not replace the record.
- **Theme clone preserves `activeThemeId` + `activeThemeVersionId`.** 2026-05-29 controlled
  test — cloning Ozy to "Ozy 2" on Merchant A (dev-mertcopper) left `activeThemeId`
  (`57225e07-aa38-4d38-9688-f6730ee16143`) and `activeThemeVersionId`
  (`5ecd7d44-3748-41b3-82e2-b3d3e54955bd`) identical, so the adapter still resolved to `ozy`
  via `adapterMatchedBy: 'theme_id'` and `autoPlacementEnabled` stayed `true`. Only
  `activeThemeName`, `activeStorefrontThemeId`, and `mainStorefrontThemeId`
  (`ed18b5f8-...` → `2c972e10-...`) changed — a clone mints a new per-merchant
  storefront-theme instance, not a new catalog theme id. Keying the allowlist on
  `activeStorefrontThemeId` would have dropped Ozy support after the clone; keying on
  `activeThemeId` does not.
- **`generic_unknown` now hides auto-placement** (resolved 2026-05-27 by ADR_0022). PDP / listing /
  modal badges respect `runtime.autoPlacementEnabled`. The explicit-mount review section is
  unaffected — it continues to render on any theme via `data-renuvex-widget="reviews"` plus
  the shadow-isolation guarantee from ADR_0021.
- **Lazy resync replaces missing webhook.** `/api/public/settings` now reads the persisted
  `lastCheckedAt` and exposes only `runtime.themeSyncDue`. It does not read auth tokens,
  call ikas, or schedule `after()` work. When the flag is true, the widget sends a
  non-blocking `POST /api/public/storefront-theme/lazy-sync` to the backend origin.
  That route rate-limits first, returns `204` without token access when the theme is not
  stale, and only stale requests schedule `syncStorefrontThemeForToken(..., 'lazy_storefront')`
  via Next.js `after()`. Per-merchant debounce remains implicit:
  `persistUnchangedCheck: true` advances `lastCheckedAt` on every unchanged check, so
  subsequent requests within the threshold skip token access automatically. The
  30-minute threshold is v1; tuning signals and playbook are captured in
  [[ADR_0022_Placement_Allowlist_And_Lazy_Resync]] "Future Tuning Signals".
- **First visitor after a theme change** still sees the stale adapter for one storefront
  cache cycle (`s-maxage=60, stale-while-revalidate=300`). Under ADR_0022's fail-closed
  default this manifests as "missing badges" on a theme that was just switched off the
  allowlist, never as "badge in the wrong place" — a strictly safer regression than the
  pre-ADR generic-adapter heuristic behavior.

## Workarounds We Use
- MutationObserver in [src/widget/observer.js](src/widget/observer.js) to handle SPA-style navigation.
- Defensive selectors in `themes/ozy/`.
- A per-theme adapter checklist in [[Theme_Adapter_Playbook]], with Ozy as the current reference implementation.
- Storefront Events remain the primary context source. `listStorefront.themes[].isMainTheme` can only help select an adapter; it does not replace runtime placement checks.

## Notes
- When a merchant reports "widget doesn't show", check in order: script injection, public settings/API calls, Storefront Events/product context, then placement/product-title.
- Document new theme quirks as they are encountered: theme name, symptom, selector/adapter workaround, and verification URL.

## Related Source Files
- [src/lib/ikas-client/graphql-requests.ts](src/lib/ikas-client/graphql-requests.ts)
- [src/lib/storefront-theme.ts](src/lib/storefront-theme.ts)
- [src/lib/storefront-theme-lazy-sync.ts](src/lib/storefront-theme-lazy-sync.ts)
- [src/lib/storefront-theme-sync.ts](src/lib/storefront-theme-sync.ts)
- [src/app/api/admin/storefront-theme/sync/route.ts](src/app/api/admin/storefront-theme/sync/route.ts)
- [src/app/api/public/settings/route.ts](src/app/api/public/settings/route.ts)
- [src/app/api/public/storefront-theme/lazy-sync/route.ts](src/app/api/public/storefront-theme/lazy-sync/route.ts)
- [src/widget/themes/](src/widget/themes/)
- [src/widget/reviews-section/styles.js](src/widget/reviews-section/styles.js)
- [src/widget/reviews-section/bootstrap.js](src/widget/reviews-section/bootstrap.js)
- [src/widget/core/product-title.js](src/widget/core/product-title.js)
- [src/widget/observer.js](src/widget/observer.js)

## Obsidian Links
- [[Ikas_Widget_Injection_Notes]]
- [[Ikas_Storefront_Script_Capabilities]]
- [[Widget_Architecture]]
- [[Theme_Adapter_Playbook]]
- [[Open_Questions]]
