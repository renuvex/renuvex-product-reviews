---
type: bug
project: ikas-review-app
status: active
created: 2026-05-05
updated: 2026-05-05
tags:
  - bugs
  - patterns
related:
  - "[[Index]]"
  - "[[Bug_Index]]"
  - "[[Debugging_Notes]]"
---

# Recurring Problems

> Patterns that come back. Add when you fix the same class of bug twice.

## Patterns to watch

### Settings drift between admin schema and DB
**Signal:** widget renders unexpected default for a setting after a recent change to `widgetDefs.ts`.
**Cause:** `WidgetSettings.settings` rows persist old keys that no longer exist in the schema, OR a new field was added without a `default`.
**Mitigation:**
- `sanitizeSettings` filters unknown keys at read time (no migration needed for removals).
- Always set `default` on new fields. Existing rows are merged with defaults at read.

### "Widget doesn't appear on theme X"
**Signal:** widget shows on theme A but not on theme B.
**Cause:** product detection or title-finder heuristics fail on the new theme's DOM structure.
**Mitigation:**
- Inspect [src/widget/product-widget/bootstrap.js](src/widget/product-widget/bootstrap.js) and [title-finder.js](src/widget/product-widget/title-finder.js).
- Add the theme's quirks via the `themes/` system rather than scattering selectors.

### "Reviews don't show on storefront immediately"
**Signal:** merchant approves a review but it doesn't appear for ~60 seconds.
**Cause:** Vercel edge cache `s-maxage=60`. By design.
**Mitigation:** explain to merchant; or revisit cache TTL if this becomes a UX complaint.

### Re-install duplicates / orphan scripts
**Signal:** multiple `<script src="…/widget.js">` tags on storefront after re-install.
**Cause:** `StoreSettings.storefrontScripts` was wiped or never persisted; injection ran without ids.
**Mitigation:** the OAuth callback handles fresh-install case via `deleteStorefrontJSScript()` (no args) — but this is a blanket delete. Check that `storefrontScripts` JSON is intact in DB.

### Token refresh failures (silent)
**Signal:** ikas API calls return empty/failed for a merchant; no obvious server log.
**Cause:** `onCheckToken` returns `accessToken: undefined` on refresh failure; downstream call fails without clear surfaced error.
**Mitigation:** add structured logging in `onCheckToken` ([src/helpers/api-helpers.ts](src/helpers/api-helpers.ts)). Improve UX surface in admin.

### Profanity bypass via unicode
**Signal:** review with disguised profanity (l33t-speak, unicode replacements) gets accepted.
**Cause:** filter normalizes lowercase + ASCII fold but doesn't handle full unicode confusables.
**Mitigation:** known limitation (see [[Security_And_Rate_Limits]]). Plan: stronger normalization or per-merchant blocklists.

### Stale `productName` after product rename
**Signal:** review shows old product name in admin/storefront after merchant renamed the product.
**Cause:** `Review.productName` is a snapshot at submit time; never re-synced.
**Mitigation:** future webhook-driven sync, or a "refresh names" admin job.

## Obsidian Links
- [[Bug_Index]]
- [[Solved_Issues]]
- [[Debugging_Notes]]
- [[Open_Questions]]
