---
type: decision
project: renuvex-product-reviews
status: active
created: 2026-05-05
updated: 2026-05-26
tags:
  - adr
  - decisions
related:
  - "[[Index]]"
---

# Decision Index

> Architectural Decision Records (ADRs). When a decision changes, **create a new ADR** that supersedes the old one — never silently rewrite history.

## Active

| ID | Title | Status |
|---|---|---|
| [[ADR_0001_Project_Stack]] | Next.js 16 + Prisma + Postgres + Tailwind + shadcn | Accepted |
| [[ADR_0002_Widget_Injection_Strategy]] | Single bundled `widget.js` injected via ikas StorefrontJSScript | Accepted |
| [[ADR_0003_Review_Data_Model]] | Single denormalized `Review` table; `storeId === merchantId`; status as string literals | Accepted |
| [[ADR_0004_Ikas_Integration_Strategy]] | OAuth via `@ikas/admin-api-client` + GraphQL Codegen for typed operations | Accepted |
| [[ADR_0006_Trusted_Review_Image_URL_Policy]] | Review images must be app-owned Cloudinary URLs before storage or storefront render | Accepted |
| [[ADR_0007_Photo_Strip_Cap_And_Rotation]] | Photo strip fixed cap 15, newest-first rotation, dedicated fetch independent of main list | Accepted |
| [[ADR_0008_Cloud_Name_Build_Time_Only]] | Cloudinary cloud name is a build-time constant; removed from settings response and widget runtime cache | Accepted |
| [[ADR_0009_Sentry_Observability_Strategy]] | `@sentry/nextjs` on the panel with env-based DSN, `sendDefaultPii: false`, prod `tracesSampleRate: 0.1`, masked Replay; widget bundle stays out | Accepted |
| [[ADR_0010_Widget_Error_Forwarding]] | Widget-side `error`/`unhandledrejection` listener POSTs to `/api/public/widget-error`; server forwards to Sentry tagged `source: widget`. +637 bytes gzip; no SDK in widget. | Accepted |
| [[ADR_0011_Widget_Touch_Feedback_And_Focus_Modality]] | Widget-scoped tap-highlight reset + controlled `:active` feedback + `:focus-visible` only + global input-modality tracker driving `restoreFocus`. New `src/widget/shared/` directory. | Accepted |
| [[ADR_0012_Pending_Upload_Registry]] | DB-tracked `PendingReviewImage` registry replaces Cloudinary scan-and-diff. Atomic submit transaction + daily cleanup + monthly fallback. No more 500-asset cap, no in-flight race. | Accepted |
| [[ADR_0013_Modular_Widget_Loader_Architecture]] | Internal loader + surface registry + single Storefront Events context module. Bundle stays one IIFE — no ESM/splitting/lazy-load in Phase 1. Extends ADR_0002. | Accepted |
| [[ADR_0014_Public_API_Response_Caching]] | Redis read-through cache between the public widget read endpoints and Postgres; `ratings-by-slug` first with per-slug keys, TTL-only v1 | Proposed — draft |
| [[ADR_0015_Canonical_Product_Identity]] | `(storeId, productId)` is the canonical review product identity; slug/name are display snapshots and slug reads are fallback-only. | Accepted |
| [[ADR_0016_Rating_Visual_System]] | Star icon + color are one global rating visual system, single-sourced from the `reviews` widget; the `badge` widget is layout-only; theme adapters stay mount/selector-only. | Accepted |
| [[ADR_0017_Badge_Architecture]] | Listing badge mounts as title sibling (not inside `<h2>`), class-first styling, component-scope CSS variables for sizing, opt-in mobile preset at 640px. Allowlist-gated rollout. | Accepted |
| [[ADR_0018_Widget_Ownership_And_Placement_Resilience]] | Widget loader ownership is marker-first and `publicApiKey`-required; storefront surfaces render inside Renuvex/legacy owned slots; placement conflicts are measured and fixed through theme adapters, not script order. | Accepted |
| [[ADR_0019_Icon_Sprite_Rendering]] | Read-only rating stars render via one injected SVG `<symbol>` sprite + `<use>` (geometry defined once) instead of inlining `<path>` per star; adds Yotpo-style sr-only/`aria-labelledby` a11y; refines ADR_0017 PDP-badge contract (link role, no static id, `data-renuvex-align`). | Accepted |
| [[ADR_0020_Renuvex_Product_Reviews_Namespace_Migration]] | Canonical identity is now Renuvex Product Reviews (`product-reviews`, `renuvex-pr`, `renuvex-product-reviews-widget`); because there are no real merchant installs yet, the hard namespace cleanup removed legacy public aliases from source and active generated assets. | Accepted |
| [[ADR_0021_Shadow_DOM_Isolation_Of_Review_Surfaces]] | Three self-contained review surfaces (review section, photo lightbox, review-form wizard) render inside their own open Shadow DOM roots; CSS rules are injected per root, the global icon sprite is mirrored into each root via a MutationObserver, `:host` re-admits inherited typography for Ozy parity. Closes the CSS isolation gap from [[Ikas_Theme_Limitations]]. Badges and JSON-LD stay in light DOM. Single commit, git revert is the safety net. | Accepted |

## Superseded / Deprecated
*(none yet)*

## How to add an ADR
1. Copy [[Decision_Template]] → `04_Decisions/ADR_XXXX_short_title.md`
2. Increment number (latest in this index + 1)
3. Fill all sections: Context · Decision · Reasoning · Alternatives · Consequences · Related Source Files
4. Add a row to the Active table above
5. Link from related architecture pages so the ADR is discoverable

## Obsidian Links
- [[Decision_Template]]
- [[System_Architecture]]
- [[Open_Questions]]

## Change Log
- 2026-05-26: Added [[ADR_0021_Shadow_DOM_Isolation_Of_Review_Surfaces]] — review section, photo lightbox, and review-form wizard now render inside their own open Shadow DOM roots (host: existing `#renuvex-reviews` light element + two new body-level overlay hosts). Style rules are injected per root via a new `core/shadow.js` (`HOST_RESET_CSS + …`); custom properties on `:root` inherit in; SVG `<use>` icon sprite is mirrored into each shadow root via a MutationObserver on the global sprite container (`registerSpriteRoot` / `unregisterSpriteRoot`). Focus traps use `getActiveElementWithin`; `restoreFocus` switched to `el.isConnected`. Wizard's `document.querySelector('h1')` fallback dropped; dead `renderStars`/`ensureStarStyles`/`STAR_COLOR` removed from `core/helpers.js`. Closes the CSS isolation gap recorded on 2026-05-25 in [[Ikas_Theme_Limitations]]; placement allowlist remains pending in [[Open_Questions]]. Dev fixture committed at `public/widget-runtime/__fixtures__/ozy-hostile.html`.
- 2026-05-25: Updated [[ADR_0020_Renuvex_Product_Reviews_Namespace_Migration]] - hard cleanup is now the current contract. Source and active generated widget assets use only `renuvex-pr` / `renuvex_pr`; legacy namespace terms are historical notes only.
- 2026-05-24: Added [[ADR_0020_Renuvex_Product_Reviews_Namespace_Migration]] - canonical app identity moved to Renuvex Product Reviews. The first rollout was expand-only; it was superseded by the 2026-05-25 hard cleanup because there are no real merchant installs yet.
- 2026-05-24: Added [[ADR_0019_Icon_Sprite_Rendering]] — read-only rating stars now reference a single injected SVG sprite (`#renuvex-pr-sym-star-full`/`#renuvex-pr-sym-star-outline`) via `<use>` instead of inlining the full `<path>` per star (measured ~76 KB of duplicated path data on a busy PDP → ~2 KB; ~4.6 KB per listing badge). Clip-path half-star engine and the single `ICONS` source (ADR_0016) are unchanged; `ICONS` strings still feed both the sprite and the admin preview. Adds Yotpo-style sr-only + `aria-labelledby` a11y and refines the ADR_0017 PDP-badge contract (link role instead of `role=figure`, no static `id`, `data-renuvex-align` instead of inline justify-content). Interactive form picker left inline.
- 2026-05-24: Added [[ADR_0018_Widget_Ownership_And_Placement_Resilience]] after the Serpingo/X-app conflict showed that a third-party `widget.js` URL could be mistaken for this app's loader. The decision adds Renuvex-compatible markers, marker-first script discovery, owned slots, and the "keep and measure" placement policy.
- 2026-05-20: Added [[ADR_0017_Badge_Architecture]] — listing badge moved out of the `<h2>` and into the title's parent as a sibling; class-first styling (`.renuvex-pr-rating-badge` + `--pdp`/`--listing` modifiers, `role="figure"` + `aria-label`, `data-renuvex-*` debug attrs); sizing tokens are component-scope CSS variables (`--renuvex-pr-badge-icon-size`, `--renuvex-pr-badge-text-size`) on `.renuvex-pr-rating-badge`, with `:root` reserved for the brand-global `--renuvex-pr-review-star-color` (ADR_0016); opt-in mobile preset via `badge.mobileOverride` + `badge.mobileSize` writing a 640px `@media` block. Mount change shipped behind a publicApiKey allowlist gate in `core/rollout.js` for a phased rollout (dev store → default flip → cleanup).
- 2026-05-19: Added [[ADR_0016_Rating_Visual_System]] — star icon style + star color are one global rating visual system, single-sourced from the "Ürün Yorumları" (`reviews`) widget (`reviewIcon`/`reviewStarColor`). Removed the duplicate `badge.icon`/`badge.color` fields; all badge renderers (`rating-badge.js`, `core/badge.js`) now read the single source. Fixed the PDP-badge icon-parse bug (non-`star` icons silently fell back to star) and the dead `badge.color` setting; listing badges no longer hardcode `star:classic`. Theme adapters remain mount/selector-only.
- 2026-05-17: Added [[ADR_0015_Canonical_Product_Identity]] after implementing product-id listing/search rating reads. Existing review data already has `productId`; the slug endpoint remains as DOM-only fallback.
- 2026-05-17: Added [[ADR_0014_Public_API_Response_Caching]] (draft) — proposes a Redis read-through cache layer between the public widget read endpoints and Postgres, prioritising `ratings-by-slug` with per-slug keys and TTL-only invalidation. Upstash is already provisioned for rate-limiting; this expands it to read caching. Draft for discussion after [[ADR_0013_Modular_Widget_Loader_Architecture]] Phase 3.
- 2026-05-16: Added [[ADR_0013_Modular_Widget_Loader_Architecture]] — Phase 1 internal refactor of the storefront widget: a single Storefront Events context module, an in-bundle surface registry (`reviews-main` + `listing-badge`), and a thin loader. Bundle stays one IIFE; no ESM migration, code-splitting, or behavior change. Extends [[ADR_0002_Widget_Injection_Strategy]] (does not supersede it). `rating-badge` deferred to Phase 2.
- 2026-05-12: Added [[ADR_0012_Pending_Upload_Registry]] — DB-tracked `PendingReviewImage` registry replaces the Cloudinary scan-and-diff cleanup pattern. New `/api/public/upload/register` endpoint, atomic transaction in submit, daily cleanup cron, monthly fallback scan with cursor pagination + 30-day age filter. Eliminates the 500-asset cap and the in-flight race that the old design carried.
- 2026-05-12: Added [[ADR_0011_Widget_Touch_Feedback_And_Focus_Modality]] — widget-scope tap-highlight reset + controlled `:active` feedback + `:focus-visible` only + global last-input-modality tracker driving `restoreFocus` for popovers/modals. New `src/widget/shared/` directory; filter dropdown and review submission wizard refactored to use the tracker.
- 2026-05-11: Added [[ADR_0010_Widget_Error_Forwarding]] — fills the visibility gap left by [[ADR_0009_Sentry_Observability_Strategy]]. Tiny widget-side reporter (1.6 KB raw / 637 bytes gzipped) forwards uncaught errors filtered to `widget.js` only, throttled per session, rate-limited per IP. Server records via the existing panel Sentry SDK with `source: widget` tag.
- 2026-05-11: Added [[ADR_0009_Sentry_Observability_Strategy]] — `@sentry/nextjs` wired into the panel with env-based DSN, `sendDefaultPii: false` (ikas OAuth header leak prevention), prod-only `tracesSampleRate: 0.1`, masked Session Replay, Vercel-Sentry integration for source map upload. Widget bundle intentionally excluded.
- 2026-05-11: Added [[ADR_0008_Cloud_Name_Build_Time_Only]] — cloud name moved to a single build-time source; removes `imagePolicy` from settings response and ~90 lines of widget runtime image-policy machinery. Structurally closes [[Bug_Cloud_Name_Silent_Image_Filter]].
- 2026-05-11: Added [[ADR_0007_Photo_Strip_Cap_And_Rotation]] — photo strip dataset decoupled from main list, fixed cap 15, newest-first rotation.
- 2026-05-10: Added [[ADR_0006_Trusted_Review_Image_URL_Policy]] for review image URL trust boundaries.
