---
type: research
project: renuvex-product-reviews
status: active
created: 2026-05-18
updated: 2026-05-18
last_verified: 2026-05-18
confidence: high
tags:
  - research
  - widget
  - phase-3
  - storefront-script
  - cache
  - lifecycle
related:
  - "[[ADR_0013_Modular_Widget_Loader_Architecture]]"
  - "[[Yotpo_Style_Widget_Modular_Architecture]]"
  - "[[Phase_1_Widget_Runtime_Audit]]"
  - "[[Phase_2_Widget_Module_Split_Plan]]"
  - "[[Ikas_Storefront_Script_Capabilities]]"
  - "[[Caching_And_Performance]]"
  - "[[ADR_0015_Canonical_Product_Identity]]"
source_files:
  - "src/lib/storefront-scripts.ts"
  - "src/lib/reconcile-storefront-scripts.ts"
  - "src/lib/storefront-widget-url.ts"
  - "src/app/api/admin/daily-maintenance/route.ts"
  - "src/app/api/admin/reconcile-storefront-scripts/route.ts"
  - "src/app/api/admin/inject-scripts/route.ts"
  - "src/app/api/oauth/callback/ikas/route.ts"
  - "scripts/build-widget.mjs"
  - "src/widget/listing-badges/inject.js"
  - "public/widget-runtime/build-manifest.json"
  - "vercel.json"
---

# Phase 3 Widget Lifecycle Hardening

## Summary

This page is the closeout record for [[ADR_0013_Modular_Widget_Loader_Architecture]]
Phase 3 — cache, versioning, and ikas StorefrontJSScript lifecycle hardening. It is
the Phase 3 equivalent of [[Phase_1_Widget_Runtime_Audit]] (audit record) and
[[Phase_2_Widget_Module_Split_Plan]] (plan + verification record).

Phase 3 source landed in commit `1700d789` (`feat(widget): harden storefront
script lifecycle`, 2026-05-17). Live dev-store verification on the Ozy theme
passed on 2026-05-18. Phase 3 is **closed** with two residual operational items
(see "Residual Items").

## Problem Statement

After Phase 2 the storefront widget was physically split, but three durability
risks remained open as ADR_0013 Phase 3 work:

1. **Destructive script lifecycle.** A zero-argument `deleteStorefrontJSScript`
   existed in the codegen/MCP contract. Calling it risked deleting StorefrontJSScript
   records belonging to other apps, and the public-docs/MCP/generated-client schemas
   disagreed on delete semantics.
2. **No cache contract for split runtime.** The Phase 2 output (`widget.js` loader
   plus `widget-runtime/*` chunks) had no deliberate cache headers — a stale cached
   `widget.js` could 404 against rotated runtime hashes.
3. **Listing badge false positives.** Hidden/passive theme DOM containers (e.g. the
   hidden Ozy `passive` search-results container) could receive injected badges.

## Fixes Implemented (commit `1700d789`)

### Non-destructive StorefrontJSScript lifecycle

- `deleteStorefrontJSScript` removed from source and codegen. Confirmed:
  `git grep deleteStorefrontJSScript -- src/ scripts/` returns no matches.
- OAuth install, manual inject, daily maintenance cron, and the explicit reconcile
  endpoint all share one helper — `ensureStorefrontScripts()` in
  [storefront-scripts.ts](src/lib/storefront-scripts.ts) — using create/update only.
- Update failure does **not** blindly create a new script. It recreates only when
  the failure message matches a missing/deleted pattern
  (`canRecreateAfterUpdateFailure`); other failures return `failed` without a
  duplicate.
- `cron` mode skips a storefront when the DB script map is completely empty
  (`skipped_empty_map`) to avoid blind duplicate creation; manual re-inject is the
  explicit repair path.
- All script-record writes build the `<script src>` through
  `buildStorefrontWidgetScript()` in [storefront-widget-url.ts](src/lib/storefront-widget-url.ts).

### Cron consolidation

Vercel cron count kept at 2 ([vercel.json](vercel.json)):

- `/api/admin/daily-maintenance` (`0 3 * * *`) — runs pending-upload cleanup +
  storefront-script reconcile.
- `/api/admin/cleanup-images` (`0 4 1 * *`) — monthly image-cleanup fallback.

`/api/admin/reconcile-storefront-scripts` remains an explicit ops endpoint sharing
the same `reconcileStorefrontScripts()` helper. New storefronts created after
install are picked up by the daily reconcile when the merchant already has at
least one tracked script id.

### Deterministic hashed runtime + cache headers

- Production widget builds emit a content-hashed `runtime-*.js`; old hashed assets
  are not deleted, so a cached `widget.js` referencing an older hash does not 404.
- `vercel.json` `headers`:
  - `/widget.js` → `public, max-age=0, must-revalidate` (updated 2026-06-02)
  - `/widget-runtime/runtime.js` (compatibility shim) → `public, max-age=0, must-revalidate` (updated 2026-06-02)
  - `/widget-runtime/runtime-:hash.js` → `public, max-age=31536000, immutable`
  - `/widget-runtime/chunks/:path*` → `public, max-age=31536000, immutable`

### Hidden/passive listing DOM filter

[listing-badges/inject.js](src/widget/listing-badges/inject.js) filters invisible
links before injecting badges, so hidden/passive theme containers are not decorated.

## Pre-Deploy Checks (Codex, 2026-05-17)

- `pnpm codegen`
- `pnpm build:widget`
- `pnpm exec prisma validate`
- `pnpm exec tsc --noEmit`
- `git diff --check`
- Source check: no `deleteStorefrontJSScript` remaining
- Targeted `rg` checks for stale Phase 2 / cron wiki phrasing

## Live Verification — Ozy theme, 2026-05-18

Dev store `dev-mertcopper.ikas.shop`. Result: widget injection and badge flow
work; no blocking widget error observed.

### Home `/`

- `widget.js` loaded; `runtime-QGZWMKY2.js` loaded.
- Listing badges rendered, e.g. `4.3 (26)`, `4.0 (1)`.
- No widget-originated console exception.

### Category `/clothing`

- Page opens with `?o=3&page=1`.
- `VIEW_LISTING` event received; payload carries `productDetails[]` with ikas
  product ids.
- Main path worked: `/api/public/ratings?productIds=...` → `200`.
- Badges shown: `4.3 (26)`, `4.0 (1)`.
- A `ratings-by-slug?slugs=clothing` fallback call also fired — this is not the
  product-badge main path; harmless.

### PDP `/premium-shorts`

- PDP rating badge shown: `4.3 (26 yorum)`.
- `#ikas-reviews` review block created with summary content.
- `/api/public/reviews?...productId=37fb...` → `200`.
- Related/listing `ratings?productIds=...` → `200`.
- No widget-originated console exception.

### Mobile + cache + cron

- Mobile viewport: `/clothing` and `/premium-shorts` retested — badges rendered,
  widget API calls `200`.
- Cache headers verified live on 2026-05-18 and matched `vercel.json` at that time
  (stable entrypoint TTL changed later on 2026-06-02):
  - `/widget.js` → `public, max-age=300, must-revalidate`
  - `/widget-runtime/runtime.js` → `public, max-age=300, must-revalidate`
  - hashed runtime/chunk → `public, max-age=31536000, immutable`
- `/api/admin/daily-maintenance` returns `401` without a valid bearer — the auth
  guard works. The full authenticated cron run was not executed (see Residual Items).

### Non-widget observations (not Phase 3 defects)

- `favicon.ico` 404.
- ikas CDN theme image `image_180.webp` 404.
- `dev-mertcopper.ikas.shop/0/sendEventV2` `net::ERR_ABORTED` — ikas/theme
  analytics, not widget-originated.
- Mobile horizontal overflow exists; source is Ozy/theme elements
  (`swiper-wrapper`, `slick-track`, footer/long product name), not the widget —
  inspected elements reported `isIkr: false`.

## Residual Items

Phase 3 is closed for source and dev-store behavior. Two operational items remain
and are intentionally tracked, not blockers:

1. **Authenticated cron run.** `CRON_SECRET` must be set in the Vercel project.
   After that, run `/api/admin/daily-maintenance` and
   `/api/admin/reconcile-storefront-scripts` authenticated and confirm the
   reconcile summary end-to-end. The endpoint auth guard is already verified
   (`401` without bearer).
2. **Deployed transfer-size re-measurement.** The `177763`-byte 2026-05-15
   pre-split baseline (see [[Yotpo_Style_Widget_Modular_Architecture]]) has not
   yet been re-measured against the deployed hashed runtime. Do this before
   claiming a live performance win.

Non-code follow-up carried from ADR_0013: a merchant onboarding instruction to
disable the storefront theme's native review block, which otherwise renders empty
next to the app widget.

## New Themes — Architecture Verdict

The core architecture is correct and durable, not a hack: one `widget.js` loader,
Storefront Events as the primary context source, `productId` as canonical identity
([[ADR_0015_Canonical_Product_Identity]]), and theme differences isolated in the
adapter/fallback layer.

Adding a new theme is not zero-effort. Each new theme needs a separate smoke test:

- Do ikas Storefront Events fire?
- Does the listing/search event payload carry `productDetails[].id`?
- Is the product-card anchor/title structure similar to Ozy?
- Does the theme's native review block collide with the badge?
- Is a DOM-fallback theme adapter needed?

## Related Notes

- [[ADR_0013_Modular_Widget_Loader_Architecture]]
- [[Yotpo_Style_Widget_Modular_Architecture]]
- [[Phase_1_Widget_Runtime_Audit]]
- [[Phase_2_Widget_Module_Split_Plan]]
- [[Ikas_Storefront_Script_Capabilities]]
- [[Caching_And_Performance]]
- [[ADR_0015_Canonical_Product_Identity]]
