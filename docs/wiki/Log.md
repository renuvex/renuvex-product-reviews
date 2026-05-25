---
type: log
project: ikas-review-app
status: active
created: 2026-05-13
updated: 2026-05-24
last_verified: 2026-05-24
confidence: high
tags:
  - log
  - project-memory
related:
  - "[[Index]]"
  - "[[Hot_Context]]"
source_files:
  - "AGENTS.md"
  - "docs/wiki/Index.md"
  - "scripts/wiki-audit.mjs"
---

# Project Log

## 2026-05-25 - refactor | Public mount contract -> data-renuvex-widget scheme
- Summary: Renamed the review widget's public mount point and internal section ids off the ad-hoc `ikas-reviews*` naming. Mount is now `<div data-renuvex-widget="reviews"></div>` (scalable per-widget attribute; a future carousel uses `data-renuvex-widget="carousel"`). Internal ids `#ikas-reviews`→`#renuvex-reviews`, `#ikas-reviews-widget`→`#renuvex-reviews-widget`; PDP badge scroll target + IkasEvents subscribe id updated. Auto-mount preserved.
- Reason: Establish one professional, branded, multi-widget public-mount convention before adding more widgets; `ikas-reviews*` was neither old-brand nor Renuvex.
- Verification: `pnpm build:widget` (active bundle has `data-renuvex-widget` + `renuvex-reviews-widget`, 0 `ikas-reviews`), `tsc --noEmit` 0, `pnpm lint` 0, `node --check`, live re-test on dev store.
- Updated wiki: [[ADR_0020_Renuvex_Product_Reviews_Namespace_Migration]], [[Product_Review_Widget]], [[Log]]

## 2026-05-25 - refactor | Renuvex namespace contract phase (legacy ikr removed)
- Summary: Completed the hard rename — removed every legacy `ikr-*`, `data-ikr-*`, `IKR_*`, `--ikr-*`, `#ikr-*`, and `yorum-paneli` identifier from source. The canonical Renuvex namespace is now the only namespace in DOM/CSS/events/cache/build. `core/namespace.js` is reduced to single-namespace preview helpers (runtime class-mirror observer + CSS expand layer removed).
- Reason: Only the dev store is installed (no real merchant installs), so the expand/contract overlap window is unnecessary; a clean single-namespace codebase is safe.
- Key source changes: mechanical `ikr-`→`renuvex-pr-` and `data-ikr-`→`data-renuvex-` across 43 widget files; camelCase `ikrStepEnter`/`ikrModal` → `renuvexPr*`; namespace.js simplified; storefront matcher dropped legacy name/marker tiers (the still-legacy live record is adopted via the `publicApiKey` fallback and rewritten on next reconcile, no duplicate); storefront-widget-url tag emits Renuvex markers only. External service/repo rename still deferred.
- Verification: `pnpm build:widget` (active bundle ikr-free, renuvex-native), `node --check` on built bundles, `pnpm exec tsc --noEmit`, `pnpm lint`, `git diff --check`, live storefront re-test on dev store (home + PDP + listing render, 200s, 0 console errors, no Sentry/runtime errors).
- Updated wiki: [[ADR_0020_Renuvex_Product_Reviews_Namespace_Migration]], [[Log]]

## 2026-05-24 - refactor | Renuvex Product Reviews namespace expand phase
- Summary: Migrated canonical identity from Yorum Paneli / `ikr` to Renuvex Product Reviews without removing legacy public aliases. New canonical keys are `product-reviews`, `renuvex-pr`, `renuvex_pr`, and `renuvex-product-reviews-widget`.
- Reason: The app is now part of the Renuvex brand family, but storefront scripts and cached widget chunks can outlive a deploy. Expand/contract keeps old installations and CDN/browser cache windows safe while making the new identity canonical.
- Key source changes: `storefront-scripts.ts` writes the canonical ikas script name and prefers Renuvex markers while adopting legacy records; `core/namespace.js` mirrors `ikr-*` class state to `renuvex-pr-*` and expands injected CSS; preview events now use `RENUVEX_PR_*` with `IKR_*` aliases; public cache/rate-limit keys moved to `renuvex_pr_*`; Sentry project config is env-driven.
- Verification: `pnpm build:widget`, `node --check public/widget.js`, `pnpm exec tsc --noEmit`, `pnpm lint`, `git diff --check`, and `node scripts/wiki-audit.mjs --changed-source-check` passed. Wiki audit remains Yellow because of pre-existing warnings, with 0 errors.
- Updated wiki: [[ADR_0020_Renuvex_Product_Reviews_Namespace_Migration]], [[Decision_Index]], [[Project_Overview]], [[Ikas_Widget_Injection_Notes]], [[Widget_Architecture]], [[Config_And_Env_Map]], [[Sentry_Operations]], [[Security_And_Rate_Limits]], [[Hot_Context]], [[Log]]

## 2026-05-24 - hardening | Safe wizard error DOM and sprite id guard
- Summary: Removed the two remaining dynamic widget-wizard error `innerHTML` sinks from photo upload and review submit errors, and strengthened one-off SVG sprite ids with a length + double-hash key.
- Reason: The SVG sprite refactor was correct, but production widget HTML generation should keep dynamic messages out of HTML string concatenation. The sprite helper also now avoids silent symbol reuse if a future local icon source collides with an existing content id.
- Key source changes: `step-photos.js` and `step-author.js` now render dynamic error messages with `createElement` + `textContent`; `icons/star-sprite.js` uses `symbolKey()` for generic one-off icons and stores `data-ikr-symbol-key`; [[ADR_0019_Icon_Sprite_Rendering]] now reflects that the interactive picker has been converted.
- Verification: `pnpm build:widget`, `node --check` on changed widget files plus built loader/runtime, `pnpm exec tsc --noEmit`, `pnpm lint`, `git diff --check`, and `node scripts/wiki-audit.mjs --changed-source-check` passed. Wiki audit remains Yellow because of pre-existing metadata/length warnings.
- Updated wiki: [[ADR_0019_Icon_Sprite_Rendering]], [[Log]]

## 2026-05-24 - refactor | Guard listing badge slot positions
- Summary: Extended the PDP owned-slot position guard standard to listing badges, which covers category, home product blocks, search results, and blog product blocks through the shared listing module.
- Reason: If a third-party app or late theme script inserts into the same product-card parent after Renuvex renders, the listing badge should keep its own slot at the adapter-selected mount point without moving or deleting the third-party node.
- Key source changes: `src/widget/listing-badges/inject.js` now places placeholders and rendered badges with `core/slot-position.js`, adds bounded position observers, and scopes duplicate checks to owned slot markers plus slug context; `src/widget/core/badge.js` adds slug/product context to listing placeholders.
- Verification: `pnpm build:widget`, `node --check` on changed widget files and `public/widget.js`, `pnpm exec tsc --noEmit`, `pnpm lint`, and `git diff --check` passed. Local-build browser verification on the live dev storefront passed for `/clothing`, `/`, `/search?q=premium`, and `/premium-shortsg`: listing/search badges reanchored after simulated third-party insertion and remounted once after removal; PDP badge/review block still rendered under the product title. WebKit PDP only showed external Cloudinary image SSL resource noise, not widget-originated errors.
- Updated wiki: [[ADR_0018_Widget_Ownership_And_Placement_Resilience]], [[Hot_Context]], [[Log]]

## 2026-05-24 - refactor | Unify ALL widget icons into the SVG sprite (ADR 0019 follow-up)
- Summary: Extended the sprite from rating-stars-only to a single unified widget icon system. The interactive wizard rating picker, the filter funnel, the compact chevron, and the review-form modal chrome (close ×, back arrow, photo-upload/plus icons) now reference the shared `#ikr-icon-sprite` via `<use>` instead of inline SVG.
- Reason: Follow-through on "make the whole icon system global/consistent". One-off icons give ~no DOM win (single instances) but the unified mechanism is cleaner; the wizard rating stars are genuine rating stars and now match every other star surface.
- Key source changes: `icons/star-sprite.js` generalized — added `iconUseSvg(svgString)` (content-hashed `<symbol>`, injected once, preserves viewBox/width/height/stroke) and made symbol injection per-symbol (no-clobber) so a live-preview star swap no longer wipes other icons. Converted `step-rating.js` (wizard stars → `starUseSvg`), `summary-layouts/shared/actions-block.js` (funnel), `summary-layouts/compact/index.js` (chevron), `review-form-modal/modal-shell.js` (close), `review-form-modal/progress-bar.js` (back arrow), `review-form-modal/steps/step-photos.js` (upload/photo/plus). The wizard's WebKit-hardened tap logic was NOT touched (only icon markup). The widget-disabled empty-state icon in `render.js` stays inline (admin-only, never customer-facing).
- Verification: `pnpm build:widget` + `pnpm lint` clean. Real-browser check of `iconUseSvg` with a stroke icon (close ×, viewBox 0 0 24 24, width preserved) and a fill icon (funnel) — both render via `<use>` (getBBox > 0), 0 inline paths. Live modal/funnel re-check pending this commit's deploy.
- Updated wiki: [[ADR_0019_Icon_Sprite_Rendering]], [[Log]]

## 2026-05-24 - refactor | Sprite the review-summary + bar-chart stars (ADR 0019 follow-up)
- Summary: Completed the SVG sprite migration for the review area. The summary average star (classic/split/compact layouts) and the shared rating-distribution bar chart (25 inline stars per chart) still used inline `<path>`; they now emit `<use>` like the rest.
- Reason: The first pass converted `partialStarsHTML`/`starsHTML`/`renderStarRow`, but the classic/split/compact avg star and `bar-chart.js` render stars through their own inline `iconPair.filled`/`empty` path — they were the ~20 KB of remaining inline star path data measured on the live PDP review area.
- Key source changes: `summary-layouts/shared/bar-chart.js`, `summary-layouts/classic/index.js`, `summary-layouts/split/index.js`, `summary-layouts/compact/index.js` now call `ensureStarSprite` and emit `starUseSvg('full'|'outline')`. Sizing/color unchanged (`.ikr-icon > svg`, `.ikr-avg-star`/`.ikr-bar-star` container sizes, currentColor). Interactive form picker + non-star UI chrome (filter funnel, chevron) stay inline.
- Verification: `pnpm build:widget` + `pnpm lint` clean. Live re-measure pending the deploy of this commit.
- Updated wiki: [[ADR_0019_Icon_Sprite_Rendering]], [[Log]]

## 2026-05-24 - refactor | Rating stars render via SVG sprite (ADR 0019)
- Summary: Read-only rating stars (PDP badge, listing badge, summary layouts, review cards, modal) now reference a single injected SVG `<symbol>` sprite via `<use>` instead of inlining the full `<path>` per star. Added Yotpo-style sr-only + `aria-labelledby` accessibility and fixed three PDP-badge correctness issues.
- Reason: Inlining the ~765-byte star `<path>` per star bloated the live DOM — measured ~76 KB of duplicated path data on a busy PDP (10 reviews) and ~4.6 KB per listing badge (linear in catalog size). The geometry is identical everywhere, so it should be defined once (industry-standard SVG symbol sprite, like Loox).
- Key source changes: `src/widget/icons/star-sprite.js` (new) derives two `<symbol>`s from the active `ICONS` strings and injects one hidden sprite (DOMParser, idempotent, keyed by icon); `partialStarsHTML`/`starsHTML` (`core/helpers.js`) and `renderStarRow` (`icons/review-icons.js`) call `ensureStarSprite` and emit `starUseSvg`; `buildRatingA11yLabel` + `.ikr-sr-only` added; `rating-badge.js` drops `role="figure"`/static `id`/inline `justify-content` (now `aria-labelledby` + `data-ikr-align`); `core/badge.js` listing badge gets the same a11y/align treatment. `ICONS` strings unchanged (admin preview still consumes them). Interactive form picker (`renderStars`, `step-rating.js`) left inline by design.
- Verification: `pnpm build:widget` + `pnpm lint` clean; new tokens present in built chunks. Real-browser check (playwright, real Phosphor geometry): sprite parses, 2 symbols / 2 paths defined once, a 4.3 badge renders 4 full + 1 half via 6 `<use>` with 0 inline paths, half-star `clip-path` intact, `<use>` geometry paints. Live path-byte re-measure pending deploy.
- Updated wiki: [[ADR_0019_Icon_Sprite_Rendering]], [[Decision_Index]], [[ADR_0016_Rating_Visual_System]], [[ADR_0017_Badge_Architecture]], [[Widget_Files_Map]], [[Widget_Performance]], [[Product_Rating_Badge]], [[Listing_Rating_Widget]], [[Hot_Context]], [[Log]]

## 2026-05-24 - refactor | Move PDP badge guard behind theme adapters
- Summary: Refactored PDP badge placement so title discovery and mount decisions belong to the active theme adapter, while the bounded owned-slot position guard lives in shared core infrastructure.
- Reason: Different ikas themes can rename PDP title classes. The durable boundary is not theme-specific guard code; it is a shared guard protecting an adapter-provided mount point for Renuvex's own slot.
- Key source changes: `src/widget/core/slot-position.js` adds shared owned-slot placement/guard helpers; `src/widget/product-widget/title-finder.js` asks the active adapter before generic fallback; Ozy now declares PDP title selectors and product badge mount behavior; `rating-badge.js` consumes the adapter mount point.
- Verification: `pnpm build:widget` passed. Local-build browser verification on the live dev storefront passed in Chromium desktop and WebKit iPhone 13: the PDP badge mounted under the Ozy title selector, reanchored after a simulated late third-party insert, and remounted once after slot removal with no widget-originated console errors.
- Updated wiki: [[ADR_0018_Widget_Ownership_And_Placement_Resilience]], [[Hot_Context]], [[Log]]

## 2026-05-24 - fix | Harden review wizard rating taps on WebKit
- Summary: Made the first review-wizard rating step pointer/touch-safe and removed the one-shot `canNavigate()` drop that could leave slower WebKit devices waiting on step 1 after a star tap.
- Reason: A physical iPhone 11 Safari test showed the wizard could select a rating but not auto-advance, while newer iPhone Safari tests worked. The source risk was a delayed click path that only attempted navigation once after 400 ms.
- Key source changes: `src/widget/product-widget/review-form-modal/steps/step-rating.js` now activates on pointer/touch/mouse down with keyboard and click fallbacks, stores rating immediately, and lets the parent wizard state machine queue the step transition.
- Verification: `node --check src/widget/product-widget/review-form-modal/steps/step-rating.js` and `pnpm build:widget` passed. Local-build browser verification on the live dev storefront passed for WebKit iPhone 11, WebKit iPhone 13, and Android Chromium / Pixel 5: tapping the fifth star moved step 1 to step 2 with no widget-originated console errors.
- Updated wiki: [[Bug_Review_Wizard_WebKit_Rating_Advance]], [[Bug_Index]], [[Hot_Context]], [[Log]]

## 2026-05-24 - fix | Stabilize WebKit filter taps and PDP badge position
- Summary: Fixed the iOS/WebKit summary-layout filter menu so real taps activate rating/sort/photo filters before focus light-dismiss closes the menu. Added a bounded PDP badge position guard so the owned Renuvex slot stays directly under the product title when another app inserts into the same parent after runtime load, and made widget-error CORS echo the requesting storefront origin when credentials are involved.
- Reason: Live iPhone/WebKit testing showed filter menu taps closed the menu without changing the active filter or sending a new reviews request, while Android worked. Separate live/fixture checks showed the PDP badge is currently visible with the X app, but late sibling insertion can move the Renuvex slot below a third-party widget unless our own slot position is reanchored.
- Key source changes: `src/widget/summary-layouts/shared/actions-block.js` activates options on pointer/touch/mouse down with keyboard and click fallbacks; `src/widget/product-widget/render.js` fetches reviews with explicit next filter state; `src/widget/product-widget/rating-badge.js` adds a 15-second bounded position observer for the owned slot; `src/lib/cors.ts` and `/api/public/widget-error` return origin-aware CORS headers.
- Verification: `pnpm build:widget`, `node --check public/widget.js`, `pnpm exec tsc --noEmit`, `pnpm lint`, and local CORS route checks passed. A local-build browser test injected the new widget into the live dev storefront with the X app installed: Android and WebKit/iPhone both changed review lists for highest, lowest, and photo filters; the PDP badge remained title -> Renuvex -> X after a simulated late third-party insert.
- Updated wiki: [[Bug_Filter_Menu_WebKit_Tap_Activation]], [[ADR_0018_Widget_Ownership_And_Placement_Resilience]], [[ADR_0010_Widget_Error_Forwarding]], [[Hot_Context]], [[Log]]

## 2026-05-24 - fix | Harden widget ownership against third-party widget.js conflicts
- Summary: Recorded and implemented the Renuvex Product Reviews storefront resilience decision. A third-party app can also load a `widget.js` file, so this app's loader/runtime now treats owned markers and `publicApiKey` as the script identity boundary rather than relying on `/widget.js` alone.
- Reason: Live dev-store testing with the Serpingo/X app showed our `widget.js` and runtime chunks loaded with `200 OK`, but no public settings/reviews calls happened because runtime ownership could select the third-party script.
- Key source changes: `src/lib/storefront-widget-url.ts` adds Renuvex markers to ikas `StorefrontJSScript` content; `src/widget/core/script-identity.js`, `classic-loader.js`, and `core/config.js` harden script discovery; owned slot wrappers cover PDP badges, listing badges, and review block mounting.
- Verification: `pnpm build:widget`, `node --check public/widget.js`, `pnpm exec tsc --noEmit`, `pnpm lint`, `git diff --check`, and `node scripts/wiki-audit.mjs --changed-source-check` passed. A local-build browser smoke test injected the new widget into the live dev storefront with the Serpingo/X app present: `/premium-shorts` loaded settings/reviews/ratings, set `window.__RENUVEX_PRODUCT_REVIEWS__`, rendered one PDP badge slot and one review slot; `/clothing` rendered two listing badge slots with no duplicate slugs.
- Updated wiki: [[ADR_0018_Widget_Ownership_And_Placement_Resilience]], [[Bug_Widget_Script_Ownership_Conflict]], [[Ikas_Storefront_Script_Capabilities]], [[Ikas_Widget_Injection_Notes]], [[Hot_Context]], [[Log]]

## 2026-05-24 - docs | Record cron upgrade and QStash decision
- Summary: Documented the Vercel Pro cron upgrade path and clarified that Upstash Redis is already used for rate limiting, while QStash should stay optional until delayed per-merchant verification or queue retry semantics are required.
- Reason: The failed 5-minute cron deployment was caused by the current Vercel plan, not by the theme sync code. Future agents need a clean playbook for revisiting this after a Pro upgrade without installing unnecessary infrastructure.
- Updated wiki: [[Hot_Context]], [[Deployment_Notes]], [[Log]]

## 2026-05-23 - fix | Restore Vercel-compatible cron schedule
- Summary: Changed `/api/admin/daily-maintenance` back to the daily 03:00 UTC Vercel cron schedule after the attempted 5-minute schedule failed deployment on the current Vercel cron plan.
- Reason: Vercel Hobby cron accepts daily schedules only; sub-daily cron expressions fail deployment before the app code builds. The theme sync lifecycle remains intact, but fast delayed verification now requires Pro/Enterprise cron or an external delayed queue such as QStash.
- Key source changes: `vercel.json`; wiki deployment/API/theme notes.
- Verification: `pnpm exec tsc --noEmit`, `pnpm lint`, `git diff --check`, `node scripts/wiki-audit.mjs --changed-source-check` (warnings only).
- Updated wiki: [[Hot_Context]], [[Deployment_Notes]], [[Backend_API_Map]], [[Config_And_Env_Map]], [[System_Architecture]], [[Ikas_Theme_Limitations]], [[Log]]

## 2026-05-23 - hardening | Split theme sync from script injection
- Summary: Added a lightweight storefront theme sync lifecycle with stable/pending state, dashboard/settings triggers, and batched cron verification. Public settings keep serving the stable adapter while a newly observed theme is pending verification.
- Reason: ikas has no confirmed theme-publish webhook/event, and dashboard load was previously calling full script injection just to refresh theme metadata. The new path avoids unnecessary StorefrontJSScript reconciliation and handles ikas theme "preparing" delay with delayed confirmation.
- Key source changes: `src/lib/storefront-theme.ts`, `src/lib/storefront-theme-sync.ts`, `/api/admin/storefront-theme/sync`, `/api/admin/daily-maintenance`, dashboard initialization, and settings save post-response sync.
- Verification: `pnpm exec tsc --noEmit`, `pnpm lint`.
- Updated wiki: [[Ikas_Theme_Limitations]], [[Backend_API_Map]], [[Config_And_Env_Map]], [[Database_Map]], [[Database_Schema]], [[Deployment_Notes]], [[System_Architecture]], [[Hot_Context]], [[Log]]

## 2026-05-23 - fix | Prefer stable theme ids for adapter matching
- Summary: Hardened active theme adapter matching so merchant-editable theme names cannot misclassify a storefront. Known adapters now match by stable ikas `themeId` first; theme-name matching is only a fallback when `themeId` is unavailable.
- Reason: Merchants can rename themes in the ikas admin panel. A renamed Kombos/IZO theme should not become Ozy just because the display name contains "Ozy", and a renamed Ozy theme should still resolve to the Ozy adapter by id.
- Key source changes: `src/lib/storefront-theme.ts`.
- Verification: `pnpm exec tsc --noEmit`, `pnpm lint`, `node scripts/wiki-audit.mjs --changed-source-check`.
- Updated wiki: [[Ikas_Theme_Limitations]], [[Hot_Context]], [[Log]]

## 2026-05-23 - feature | Add active theme adapter metadata
- Summary: Implemented active theme metadata capture from ikas `listStorefront.themes[].isMainTheme` plus `mainStorefrontThemeId` fallback, persisted it in nullable `StoreSettings.storefrontTheme`, and exposed only `runtime.themeAdapterKey/source` through public settings.
- Reason: ikas confirmed there is no browser-runtime theme detector. Backend Admin API theme metadata is the cleanest available selector for a theme adapter, while DOM placement still requires Storefront Events plus heuristics.
- Key source changes: `src/lib/storefront-theme.ts` resolves Ozy vs generic adapter metadata; `src/lib/storefront-scripts.ts` writes it during install/manual/cron reconciliation; `src/widget/core/settings.js` applies it before listing discovery; `src/widget/themes/generic/adapter.js` adds a conservative fallback for unknown themes.
- Verification: `pnpm codegen`, `pnpm prisma:generate`, `pnpm exec prisma validate`, `pnpm exec tsc --noEmit`, `pnpm build:widget`.
- Updated wiki: [[Ikas_Theme_Limitations]], [[Ikas_Storefront_Script_Capabilities]], [[Widget_Architecture]], [[Database_Map]], [[Database_Schema]], [[Hot_Context]], [[Log]]

## 2026-05-23 - docs | Record ikas active-theme detection feedback
- Summary: Added ikas developer feedback that there is no dedicated runtime active-theme detector; schema verification later showed the usable signal is nested `listStorefront.themes[].isMainTheme`, not `Storefront.isMainTheme`.
- Updated wiki: [[Ikas_Theme_Limitations]], [[Ikas_Storefront_Script_Capabilities]], [[Yotpo_Style_Widget_Modular_Architecture]], [[Hot_Context]]

## 2026-05-23 - hardening | Add storefront script diagnostics and widget conflict telemetry
- Summary: Strengthened StorefrontJSScript reconciliation with `data-ikr-*` script markers, remote match diagnostics, duplicate reporting, runtime widget health markers, badge visibility probes, and bounded one-shot self-heal for DOM removal.
- Reason: Third-party storefront apps should not overwrite this app's ikas script record under the normal platform model, but stale/deleted script records and aggressive browser-side DOM/CSS changes need clearer detection and safer recovery without creating duplicate scripts.
- Key source changes: `src/lib/storefront-widget-url.ts` adds script markers; `src/lib/storefront-scripts.ts` and `src/lib/reconcile-storefront-scripts.ts` return remote diagnostics; `src/widget/core/health.js`, `src/widget/product-widget/rating-badge.js`, and `src/widget/listing-badges/inject.js` add health telemetry and one-shot remount; `scripts/build-widget.mjs` injects a widget version marker.
- Verification: `pnpm build:widget`, `pnpm exec tsc --noEmit`, and `pnpm lint` passed locally before this log entry. Live ikas/CDN verification is still required after deploy.
- Updated wiki: [[Hot_Context]], [[Widget_Architecture]], [[Ikas_Widget_Injection_Notes]], [[Ikas_Storefront_Script_Capabilities]], [[Log]]

## 2026-05-22 - hardening | Reconcile storefront scripts with v1 list adoption
- Summary: Fixed StorefrontJSScript recovery when ikas returns `error_messages.theme.storefront_sf_script_not_found` for a DB-tracked script id that no longer exists remotely, then added read-only v1 script listing to adopt live remote app scripts before creating new ones.
- Reason: The non-destructive script lifecycle introduced in `1700d789` already intended to recreate missing/deleted scripts, but the matcher only handled space-separated `not found`; ikas returns underscore-separated `not_found`, so reinstall/manual inject could fail without recreating the loader. A stronger path also needs DB-lost/live-remote reconciliation to avoid duplicate scripts.
- Key source changes: `src/lib/storefront-scripts.ts` now accepts space, dash, and underscore separators in missing-script error phrases and uses v1 `listStorefrontJSScript` as read-only evidence. `src/lib/ikas-client/v1-graphql-requests.ts` and `generated/v1-graphql.ts` provide the typed v1 query client.
- Verification: Refreshed the dev-store OAuth token, confirmed v1 `listStorefrontJSScript` returned zero scripts while `StoreSettings.storefrontScripts` held a stale id, reproduced the v2 update error, recreated the script, updated the DB map, then verified ikas reports one active non-deleted `yorum-paneli-widget` script with the expected widget URL. Browser retest showed `/premium-shorts` and `/clothing` load the widget and render `ikr-*` nodes with no widget console errors; `/` still did not publish the script in-browser during the retest despite the active global script record, so home-route ikas/CDN publication remains an external follow-up.
- Updated wiki: [[Hot_Context]], [[Ikas_Widget_Injection_Notes]], [[Log]]

## 2026-05-18 - security | Scope review image uploads by tenant
- Summary: Review image uploads now use tenant-scoped Cloudinary folders: `review_images/stores/<storeId>`.
- Reason: The old global `review_images/` folder mixed all merchants' uploads, weakening quota, cleanup, support, and future tenant export/delete operations.
- Key source changes: `/api/public/upload/sign` verifies `StoreSettings` and signs the tenant folder; the widget uploads to the returned folder and registers `{storeId, secureUrl}`; `review-images.ts`, public review POST/GET, admin review reads, and cleanup compare against the tenant-scoped trusted URL policy; `PendingReviewImage.storeId` was added.
- Verification: `pnpm prisma:generate`; `pnpm exec prisma validate`; `pnpm exec tsc --noEmit`; `pnpm build:widget`.
- Updated wiki: [[ADR_0006_Trusted_Review_Image_URL_Policy]], [[ADR_0012_Pending_Upload_Registry]], [[Security_And_Rate_Limits]], [[Backend_API_Map]], [[Database_Schema]], [[Hot_Context]]

## 2026-05-18 - database | Drop redundant Review prefix indexes
- Summary: Removed redundant Review indexes `[storeId, productId]` and `[storeId, slug]`.
- Reason: Current query paths use `storeId + productId + status` or `storeId + slug + status`; PostgreSQL can use the retained wider composite indexes for the old leftmost prefixes, so the standalone prefix indexes only added write amplification.
- Key source changes: `prisma/schema.prisma`; migration `20260518130000_drop_redundant_review_indexes`.
- Verification: `pnpm exec prisma validate`; `pnpm exec tsc --noEmit`.
- Updated wiki: [[Database_Map]], [[Database_Schema]], [[Hot_Context]]

## 2026-05-18 - security | Rate-limit public rating reads
- Summary: Added a shared Upstash fixed-window rate limit for `/api/public/ratings` and `/api/public/ratings-by-slug`.
- Reason: Rating badge endpoints are CORS-open and can be abused with many query variants to bypass CDN cache and create unnecessary function/Postgres load.
- Key source changes: new `src/lib/public-rate-limit.ts`; `ratings` and `ratings-by-slug` now check `ikr_ratings_rl:<ip>` at 300 requests/minute before hitting Prisma.
- Verification: `pnpm exec tsc --noEmit`; direct route-level burst test should be run after deploy if the live Redis env is present.
- Updated wiki: [[Security_And_Rate_Limits]], [[Backend_API_Map]], [[Config_And_Env_Map]], [[Hot_Context]]

## 2026-05-18 - hardening | Scope listing observer re-render checks
- Summary: The MutationObserver re-render gate now uses the same scoped listing link discovery as listing badge injection instead of `document.querySelectorAll('a[href]')`.
- Reason: Live Chrome/CDP verification on `dev-mertcopper.ikas.shop` showed the listing inject path was scoped, but the always-loaded runtime still performed whole-document link scans from the observer gate.
- Key source changes: new `src/widget/core/link-scope.js`, updated `src/widget/observer.js` and `src/widget/listing-badges/dom.js`; regenerated public widget runtime output.
- Verification: `pnpm build:widget`, `pnpm exec tsc --noEmit`, active generated runtime search confirmed no `document.querySelectorAll('a[href]')` in `runtime-2RGD2H4S.js` / `listing-badges-W6CSI53A.js`. Post-deploy Chrome/CDP retest on `/`, `/clothing`, `/premium-shorts`, and mobile `/clothing` confirmed the live site loads `runtime-2RGD2H4S.js`, has visible listing/PDP badges, reports no console/runtime errors, and records zero widget-sourced `document.querySelectorAll('a[href]')` calls.
- Updated wiki: [[Listing_Rating_Widget]], [[Widget_Architecture]], [[Widget_Files_Map]], [[Hot_Context]]

## 2026-05-18 - hardening | Reduce listing badge CLS and DOM scan cost
- Summary: Listing badge discovery now uses scoped link collection from theme product containers/main content instead of whole-document link scans, and reserves invisible badge slots while ratings load before replacing them in place.
- Reason: Late badge insertion could create small listing-card layout shifts, and whole-document `a[href]` scans did unnecessary work across header/footer/navigation.
- Key source changes: `src/widget/listing-badges/dom.js`, `collect.js`, `index.js`, `inject.js`, and `src/widget/core/badge.js`; regenerated public widget runtime output.
- Verification: `pnpm build:widget`, `pnpm exec tsc --noEmit`, and `git diff --check`.
- Updated wiki: [[Listing_Rating_Widget]], [[Widget_Architecture]], [[Widget_Files_Map]], [[Hot_Context]]

## 2026-05-18 - hardening | Reduce widget settings stale TTL
- Summary: Reduced widget-side stale settings tolerance from 7 days to 24 hours.
- Reason: A merchant setting change, including disabling a widget surface, should not remain hidden behind a week-long stale same-tab cache during transient settings fetch failures.
- Key source changes: `src/widget/core/settings.js`, regenerated public widget runtime output.
- Verification: `pnpm build:widget`, `pnpm exec tsc --noEmit`, and `git diff --check`.
- Updated wiki: [[Caching_And_Performance]], [[Widget_Architecture]], [[Hot_Context]]

## 2026-05-18 - security | Harden public review submit/read contract
- Summary: `POST /api/public/reviews` now verifies the submitted target against installed `StoreSettings` and `(storeId, productId)` in `ProductSnapshot`, ignores public `slug`/`productName`/`email`, and stores slug/name snapshots from the server-side product read model.
- Reason: The public storefront is CORS-open and browser-controlled, so product identity and response fields must not be trusted from client payloads.
- Key source changes: `src/app/api/public/reviews/route.ts` target verification, public response whitelist, minimal create response.
- Verification: `pnpm exec prisma validate` and `pnpm exec tsc --noEmit`.
- Updated wiki: [[Backend_API_Map]], [[Important_Files]], [[Security_And_Rate_Limits]], [[Hot_Context]]

## 2026-05-17 - docs | Migration safety (expand/contract) rule
- Summary: Documented the deploy-window migration rule — `prisma migrate deploy` runs during the Vercel build while the old deployment still serves, so breaking schema changes (drop/rename column, add `NOT NULL`, etc.) must use expand/contract across two deploys; additive changes stay single-deploy.
- Reason: A single-deploy breaking migration causes a ~1-3 min window where the new schema and old code mismatch. Harmless at one test store, but a real risk under live multi-merchant traffic.
- Changes: `### Migration safety` subsection in [[Database_Map]]. Local generated `AGENTS.md` + `CLAUDE.md` were edited too, but they are gitignored Ruler outputs and are not repository-durable. Follow-up code hardening also made slug fallback ordering fully deterministic and clears snapshots if ikas ever returns `deleted: true` products.

## 2026-05-17 - cleanup | Remove dead ProductSnapshot.deleted field
- Summary: Removed the unused `ProductSnapshot.deleted` column and `[storeId, slug, deleted]` index, and made the `ratings-by-slug` slug→productId resolution deterministic.
- Reason: ikas exposes no `store/product/deleted` webhook scope and `listProduct` excludes deleted products, so `deleted` was always false (prod: 0 of 32 rows true) and `[storeId, slug]` was a redundant prefix index. The fallback's `slugToProductId` map used non-deterministic first-write-wins when a slug mapped to multiple snapshots.
- Key source changes: `prisma/schema.prisma`, migration `20260517160000_remove_product_snapshot_deleted`, `src/lib/product-snapshots.ts`, `src/app/api/public/ratings-by-slug/route.ts` (drop `deleted` filter, add `orderBy: { lastSyncedAt: 'desc' }`).
- Verification: `pnpm prisma:generate`, `pnpm exec prisma validate`, `pnpm exec tsc --noEmit` passed.
- Updated wiki: [[Database_Schema]], [[Hot_Context]]

## 2026-05-17 - fix | Non-blocking OAuth install product backfill
- Summary: The OAuth callback no longer blocks the install redirect on the full product backfill. `syncAllProductsForStore` now runs inside Next.js `after()` (post-response); product webhook registration stays awaited (a single `saveWebhooks` mutation).
- Reason: `await syncAllProductsForStore` ran on the callback's critical path before JWT issue + 302 redirect. For a large catalog the sequential paginated sync could exceed the serverless function timeout and abort the whole install (no JWT, no redirect) — the surrounding `try/catch` cannot catch a platform-level timeout.
- Key source change: `src/app/api/oauth/callback/ikas/route.ts` — `after` import plus wrapping the backfill call.
- Verification: `pnpm exec tsc --noEmit` passed.
- Effect: install latency is now independent of catalog size; an interrupted backfill is recovered by product webhooks or `POST /api/admin/sync-products`.
- Updated wiki: [[Auth_And_Installation_Flow]], [[ADR_0015_Canonical_Product_Identity]], [[Backend_API_Map]], [[Hot_Context]]

## 2026-05-17 - implementation | ProductSnapshot webhook/backfill layer
- Summary: Implemented the ADR_0015 completeness layer. Added `ProductSnapshot`, ikas product webhook registration/receiver, install-time and manual backfill, and snapshot-backed slug fallback.
- Key source changes: `src/lib/product-snapshots.ts`, `/api/webhooks/ikas/products`, `/api/admin/sync-products`, OAuth callback webhook/backfill hook, `ratings-by-slug` snapshot resolution, `listProductsForSync` and `saveProductWebhooks` GraphQL operations/codegen, and Prisma migration `20260517133000_add_product_snapshot`.
- Verification: `pnpm codegen`, `pnpm prisma:generate`, `pnpm exec prisma validate`, `pnpm exec tsc --noEmit`, scoped ESLint, and `pnpm build:widget` passed.

## 2026-05-17 - implementation | ADR_0015 canonical product identity
- Summary: Implemented product-id listing/search badge reads for the Storefront Events path. The widget now maps listing/search `productDetails[].id` to visible slugs and calls `/api/public/ratings?productIds=...`; `/api/public/ratings-by-slug` remains a DOM-only fallback.
- Key source changes: new `src/app/api/public/ratings/route.ts`, `ikrProductMap` in widget state/context, product target collection in `listing-badges/collect.js`, product-id-first fetch logic in `listing-badges/ratings.js`, rebuilt `public/widget.js` and ESM chunks, plus the `[storeId, productId, status]` Prisma index/migration.
- Verification: `pnpm build:widget`, scoped `pnpm exec eslint <changed files>`, `pnpm exec tsc --noEmit`, and `pnpm exec prisma validate` passed. `pnpm prisma:generate` hit a Windows DLL rename `EPERM` while a Node/Next process held Prisma's query engine; schema-only index change does not require generated type changes, but retry after stopping dev processes.
- Follow-up: Completed by the ProductSnapshot webhook/backfill layer later on 2026-05-17.

## 2026-05-17 - implementation | ADR_0013 Phase 2 module split
- Summary: Started the Phase 2 physical module split without changing the ikas script contract. `public/widget.js` is now a small classic compatibility loader and `public/widget-runtime/*` contains the ESM runtime/chunks.
- Key source changes: `scripts/build-widget.mjs`, `src/widget/classic-loader.js`, `src/widget/core/lazy-modules.js`, `src/widget/core/settings.js`, async registry mounts, lazy `reviews-main` / `listing-badge` surfaces, `VIEW_SEARCH_RESULTS` listing handling, Ozy fallback adapter, and regenerated `public/widget-runtime/build-manifest.json`.
- Verification so far: `pnpm build:widget` passed; manifest boundary assertion passed; `git diff --check` passed; scoped `pnpm exec eslint <changed widget/build files>` passed. `pnpm lint` is not currently a valid gate because `next lint` fails under the repo's Next.js 16 setup.
- Not closed yet: live dev-store browser/network verification and Sentry post-test checks from [[Phase_2_Widget_Module_Split_Plan]] are still required before Phase 2 is marked done.

## 2026-05-17 - planning | ADR_0013 Phase 2 module split plan
- Summary: Added the durable Phase 2 implementation and verification checklist for moving from the Phase 1 in-bundle registry to real lazy-loaded widget modules.
- New wiki page: [[Phase_2_Widget_Module_Split_Plan]]
- Key decisions: keep `widget.js?publicApiKey=...` backward-compatible; use a classic loader plus ESM runtime/chunks unless ikas `type="module"` script loading is proven; add `VIEW_SEARCH_RESULTS` handling; move Ozy selectors into an explicit theme adapter/fallback contract.
- Context7 note: checked `/evanw/esbuild`; code splitting requires `format: "esm"`, `splitting: true`, and `outdir`, and dynamic `import()` creates lazy chunks.
- No application source code changed.

## 2026-05-17 - verification + bugfix | ADR_0013 Phase 1 runtime verification
- Summary: Ran the Phase 1 widget runtime audit on the live dev store (`dev-mertcopper.ikas.shop`) — F.3–F.6 plus audits A/B/C/G from [[Phase_1_Widget_Runtime_Audit]]. Method: Playwright + read-only `IkasEvents` probe + Sentry post-test check.
- Result: PDP render, SPA-nav cleanup, listing badges, MutationObserver re-mount, and badge placement all passed; no double render; Sentry clean (0 new issues). `VIEW_LISTING` confirmed a real runtime event carrying `productDetails[]` — the ADR_0013 open item is resolved, no code change. Search pages emit `VIEW_SEARCH_RESULTS` (same shape) which the widget does not yet handle — logged as a Phase 2 item.
- Bug fixed: [[Bug_Listing_Badge_Stars_Direct_Load]] — listing badge stars rendered 0×0 on cold direct entry to home/category/search because `#ikr-styles` (carrying the `.ikr-star` display rule) was injected only by the PDP `render.js` path. Fix: extracted `PARTIAL_STARS_CSS` as one source of truth and added `ensureBadgeStyles()` so the badge factory self-injects `#ikr-badge-styles`. Pre-existing bug, not an ADR_0013 regression.
- Changed source files: `src/widget/core/helpers.js`, `src/widget/themes/ozy/styles.js`, `src/widget/core/badge.js`, `public/widget.js` (rebuilt via `pnpm build:widget`).
- Updated wiki pages: [[Bug_Listing_Badge_Stars_Direct_Load]], [[Bug_Index]], [[Phase_1_Widget_Runtime_Audit]], [[Ikas_Storefront_Events]], [[ADR_0013_Modular_Widget_Loader_Architecture]], [[Listing_Rating_Widget]], [[Hot_Context]]

## 2026-05-17 - research | Phase 1 widget runtime audit checklist
- Summary: Added an evidence checklist for closing ADR_0013 Phase 1 before Phase 2. It separates confirmed ikas docs/MCP facts from runtime behavior that still needs dev-store verification.
- New wiki page: [[Phase_1_Widget_Runtime_Audit]]
- Updated wiki pages: [[ADR_0013_Modular_Widget_Loader_Architecture]], [[Yotpo_Style_Widget_Modular_Architecture]], [[Ikas_Storefront_Events]], [[Ikas_Storefront_Script_Capabilities]], [[Index]], [[Hot_Context]]
- Key uncertainty: official Storefront API docs and current ikas MCP expose different StorefrontJSScript operation shapes; runtime `VIEW_LISTING` remains unproven against official `VIEW_CATEGORY` / `VIEW_SEARCH_RESULTS` docs.
- Context7 note: checked `/microsoft/playwright` and `/getsentry/sentry-javascript` for current Phase 1 test/triage practices. Context7 should support Playwright/Sentry/Next.js mechanics, not replace ikas docs/MCP/runtime evidence.
- No application source code changed.

## 2026-05-16 - reference | ikas Storefront Events official docs captured
- Summary: Saved the official ikas Storefront Events documentation (event types, page types, payload shapes, JS example, query-param usage) as a wiki reference page.
- New wiki page: [[Ikas_Storefront_Events]]
- Updated wiki pages: [[Index]]
- Source: <https://builders.ikas.com/docs/storefront-events/events>
- Note: flagged that current code uses `VIEW_LISTING` while official docs list `VIEW_CATEGORY` / `VIEW_SEARCH_RESULTS` — needs runtime verification.

## 2026-05-16 - research | ikas developer feedback on storefront script integration
- Summary: Recorded a direct ikas developer answer about single-loader architecture, theme selectors, and script ordering.
- Key takeaways: single loader + multiple modules is an accepted ikas pattern; no official stable ids / `data-*` attributes for page areas today; Storefront Events is the supported page/product context mechanism; standard `data-*` attributes are planned (ikas Studio) but not yet broadly available; `isHighPriority` + `order` control load order relative to Facebook/Google scripts.
- Updated wiki pages: [[Ikas_Storefront_Script_Capabilities]] (new "ikas Developer Feedback — 2026-05-16" section), [[Yotpo_Style_Widget_Modular_Architecture]] (Open Questions)
- Decision direction: use Storefront Events for context; treat theme-class selectors as a temporary fallback only, not the architecture; plan migration to ikas `data-*` attributes when broadly available.
- No application source code changed.

## 2026-05-15 - research | Yotpo-style widget architecture on ikas
- Summary: Added read-only research and architecture notes from Protein Ocean's Yotpo installation on an ikas storefront, plus ikas StorefrontJSScript capability notes.
- Updated wiki pages: [[Index]], [[Hot_Context]], [[Yotpo]], [[Ikas_Widget_Injection_Notes]], [[Widget_Architecture]], [[Storefront_Widget_Overview]], [[Widget_Performance]]
- New wiki pages: [[Yotpo_Protein_Ocean_Widget_Research]], [[Ikas_Storefront_Script_Capabilities]], [[Yotpo_Style_Widget_Modular_Architecture]]
- Key takeaway: ikas can support a Yotpo-like model, but this project should use one ikas-injected loader per storefront and lazy-load widget modules from its own runtime.
- Related files: `src/widget/*`, `scripts/build-widget.mjs`, `src/lib/ikas-client/graphql-requests.ts`, `src/app/api/admin/inject-scripts/route.ts`, `src/app/api/oauth/callback/ikas/route.ts`

## 2026-05-13 - maintenance | Second-brain setup migration
- Summary: Migrated the existing wiki memory system to the second-brain setup without moving or deleting existing docs.
- Updated wiki pages: [[Hot_Context]], [[Index]], [[Open_Questions]], [[Agent_Rules]], [[Documentation_Update_Prompt]], [[Wiki_Maintenance_Prompt]]
- Related files: `AGENTS.md`, `scripts/wiki-audit.mjs`, `scripts/wiki-secret-scan.py`, `scripts/wiki-prune-report.py`
- Related decision/bug/feature/problem: none
