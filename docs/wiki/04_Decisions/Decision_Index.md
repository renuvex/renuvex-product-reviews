---
type: decision
project: renuvex-product-reviews
status: active
created: 2026-05-05
updated: 2026-09-10
last_verified: 2026-09-10
confidence: high
tags:
  - adr
  - decisions
related:
  - "[[Index]]"
source_files: []
---

# Decision Index

## Agent Brief

Use this page only as the ADR registry. The individual ADR is canonical for its
decision, scope, rollout evidence, and supersession details. Keep every ADR
discoverable here, but do not duplicate full decision history in navigation
pages.

> Architectural Decision Records (ADRs). When a decision changes, **create a new ADR** that supersedes the old one — never silently rewrite history.

## Active

| ID | Title | Status |
|---|---|---|
| [[ADR_0001_Project_Stack]] | Next.js 16 + Prisma + Postgres + Tailwind + shadcn | Accepted |
| [[ADR_0002_Widget_Injection_Strategy]] | Single bundled `widget.js` injected via ikas StorefrontJSScript | Accepted |
| [[ADR_0003_Review_Data_Model]] | Single denormalized `Review` table; `storeId === merchantId`; status as string literals | Accepted |
| [[ADR_0004_Ikas_Integration_Strategy]] | OAuth via `@ikas/admin-api-client` + GraphQL Codegen for typed operations | Accepted |
| [[ADR_0005_Summary_Layout_Visual_Consistency_Strategy]] | Shared spacing, action alignment, tablet breakpoint, and layout-shift rules for summary layouts | Accepted |
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
| [[ADR_0017_Badge_Architecture]] | Listing badge mounts as title sibling (not inside `<h2>`), class-first styling, component-scope CSS variables for sizing, opt-in mobile preset at 640px. Adapter override handles theme exceptions. | Accepted |
| [[ADR_0018_Widget_Ownership_And_Placement_Resilience]] | Widget loader ownership is marker-first and `publicApiKey`-required; storefront surfaces render inside Renuvex/legacy owned slots; placement conflicts are measured and fixed through theme adapters, not script order. | Accepted |
| [[ADR_0019_Icon_Sprite_Rendering]] | Read-only rating stars render via one injected SVG `<symbol>` sprite + `<use>` (geometry defined once) instead of inlining `<path>` per star; adds Yotpo-style sr-only/`aria-labelledby` a11y; refines ADR_0017 PDP-badge contract (link role, no static id, `data-renuvex-align`). | Accepted |
| [[ADR_0020_Renuvex_Product_Reviews_Namespace_Migration]] | Canonical identity is now Renuvex Product Reviews (`product-reviews`, `renuvex-pr`, `renuvex-product-reviews-widget`); because there are no real merchant installs yet, the hard namespace cleanup removed legacy public aliases from source and active generated assets. | Accepted |
| [[ADR_0021_Shadow_DOM_Isolation_Of_Review_Surfaces]] | Three self-contained review surfaces (review section, photo lightbox, review-form wizard) render inside their own open Shadow DOM roots; CSS rules are injected per root, the global icon sprite is mirrored into each root via a MutationObserver, `:host` re-admits inherited typography for Ozy parity. Closes the CSS isolation gap from [[Ikas_Theme_Limitations]]. Badges and JSON-LD stay in light DOM. Single commit, git revert is the safety net. | Accepted |
| [[ADR_0022_Placement_Allowlist_And_Lazy_Resync]] | Retains the pure cacheable settings read, explicit review-mount gate, `themeSyncDue` resync signal, and separate lazy-sync POST. Its legacy boolean automatic-placement authorization is superseded by ADR 0038 and now remains false for retained old runtimes. | Accepted in part; placement superseded by ADR 0038 |
| [[ADR_0023_Widget_Lifecycle_Gating_Contract]] | Three-layer widget gating: Layer 1 (always-load bootstrap, ~12 KB) carries `widget.js` + runtime; Layer 2 (context-driven entry chunks, ~10-15 KB each) loaded by surface descriptors when the matching Storefront Event fires; Layer 3 (settings + capability gates inside the entry function) early-returns on `widgets.<id>.enabled === false` / `!isAutoPlacementEnabled()` / missing opt-in mount. Codifies the pattern from [[ADR_0013_Modular_Widget_Loader_Architecture]] + [[ADR_0022_Placement_Allowlist_And_Lazy_Resync]] into an 8-step checklist for new widgets (FAQ, carousel, popup, Q&A). Adds the top-level `isAutoPlacementEnabled()` gate to `listing-badges/index.js renderListingBadges()` so DOM walk + `/api/public/ratings` skip on unsupported themes. | Accepted |
| [[ADR_0024_Badge_Review_Surface_Separation]] | PDP rating badge is its own product surface and lazy chunk. Review render no longer owns badge injection; badge-only PDPs skip review render/BIG chunks and review/photoStrip API calls when the explicit reviews mount is absent. Badge DOM cleanup belongs to the badge surface; Product JSON-LD later moved to the independent structured-data surface. | Accepted |
| [[ADR_0025_Overlay_Shared_Surface_Foundation]] | Cross-cutting overlay concerns (robust body scroll lock, focus trap, back-button history) extracted into shared modules — `core/body-scroll-lock.js` (ref-counted, locks `<html>`+`<body>` + iOS `position:fixed`), `shared/focus-trap.js`, `core/modal-history.js` — consumed by BOTH body-level overlays (photo lightbox, review-form wizard), enforced by a `widget-surface-contracts.test.ts` invariant. Fixes the wizard's weaker theme-dependent scroll lock (storefront scrolled behind the open wizard on `<html>`-scrolling/`!important` themes and on iOS). A `createOverlaySurface()` controller was considered and rejected as over-abstraction for two divergent overlays; shared modules + contract test deliver the "ortak/kişisel" separation and the anti-recurrence guarantee. | Accepted |
| [[ADR_0026_Product_Review_Summary_Read_Model]] | `ProductReviewSummary` is the product-level aggregate read model for public badge, structured-data, and review summary distribution reads. Raw `Review` remains source of truth; submit/moderation/delete paths update the summary in the same transaction, and a repair script can rebuild summaries from approved reviews. | Accepted |

| [[ADR_0028_Review_Cursor_Pagination]] | Public review list load-more uses cursor/keyset pagination while preserving legacy `page/limit` response compatibility. | Accepted |
| [[ADR_0030_Cleanup_Hardening]] | `cleanup-images` orphan deletion is hardened with a circuit-breaker (G1 empty-used-set / G2 30% ratio / G3 200 absolute), two-phase quarantine (mark now, sweep after a grace window), a `MediaCleanupRun` audit log, and `source:cron` Sentry error alerts (failures + breaker trips). `?force=1` overrides G2/G3 but never G1. | Accepted |
| [[ADR_0032_Review_Video_On_Mux]] | Review video provider is **Mux** while retaining the provider-agnostic model and durable lifecycle. Active path uses Mux direct upload (UpChunk), Mux webhook dedup/audit, provider-neutral media jobs, signed admin playback, and public playback IDs after approval. Production Mux canary evidence allowed the contract migration to enter the active deploy path; external Cloudflare Stream/R2 teardown remains separately gated. | Accepted |
| [[ADR_0033_Cloudflare_Worker_Widget_Asset_Delivery]] | `widget.renuvex.app` is the Cloudflare Worker Static Assets origin and narrow public-read cache for settings/ratings/reviews, while `app.renuvex.app` remains the Vercel backend/API/upload/Mux/QStash/write origin. Worker fails closed for non-allowlisted `/api/*`; API and read origins are explicit widget build-time settings with rollback fallback. | Accepted |
| [[ADR_0034_AWS_Review_Image_Migration]] | AWS-only review image contract. New image uploads use S3/CloudFront, finite generated variants, `https://media.renuvex.app/reviews/<assetId>/<variant>.<format>` public URLs, signed private admin preview, DB-backed public reads, and breaker-guarded AWS object-family cleanup. | Accepted |
| [[ADR_0035_QStash_Scheduler_For_Maintenance]] | Maintenance scheduling moves to a staged QStash contract: a signed internal scheduler endpoint, explicit task bodies, DB slot locks for idempotency, and Vercel Cron removal only after QStash schedule acceptance. | Accepted |
| [[ADR_0036_Review_Request_Email_Architecture]] | Deployed-but-disabled review-request architecture with current ikas customer subscription authorization, immutable delivered-line evidence, stable package-line grouping, additive V5 lifecycle/DSR/retention, and Multi-Product Batch/Envelope V3.2. AWS sender, sandbox, review-domain DNS, IYS/privacy/legal acceptance, and activation remain separately gated. | Accepted |
| [[ADR_0037_Product_Lifecycle_Evidence_And_Tombstones]] | `(storeId, productId)` ownership is protected by explicit provider evidence, tombstones, bounded QStash reconciliation, fail-closed slug resolution, and a live ready gate before consumer enforcement. | Accepted; Release A backend, edge, and active-installation readiness passed. Managed scale, conflict operations, remaining lifecycle acceptance, and Release B remain separate. |
| [[ADR_0038_Runtime_Attested_Storefront_Placement]] | Versioned `placementPolicy` selects provider-verified, runtime-attested, or disabled placement. Every production badge path requires a strict ephemeral DOM proof before ratings and revalidates context before injection. Legacy auto-placement is safety-first disabled, Ozy is the only explicit runtime detector, and preview/review mounts remain separate. | Accepted; PR #40, Vercel/Worker rollout, and Canary 1 passed. Natural reconciliation, Canary 2, and owner-deferred Sentry alert delivery remain before Production closeout. |

## Superseded / Deprecated

| ID | Title | Status |
|---|---|---|
| [[ADR_0027_Review_Media_Read_Model]] | Normalized review-media read model | Accepted core; image-provider behavior superseded by [[ADR_0034_AWS_Review_Image_Migration]] |
| [[ADR_0029_Review_Media_Metadata]] | Review-media metadata contract | Accepted core; image-provider behavior superseded by [[ADR_0034_AWS_Review_Image_Migration]] |
| [[ADR_0031_Review_Media_V2_Provider_Agnostic_Video]] | Earlier provider-agnostic video foundation | Superseded by [[ADR_0032_Review_Video_On_Mux]] (2026-06-17) |

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
