---
type: widget
project: renuvex-product-reviews
status: active
created: 2026-05-05
updated: 2026-09-10
last_verified: 2026-09-10
confidence: high
tags:
  - widget
  - listing
related:
  - "[[Index]]"
  - "[[Storefront_Widget_Overview]]"
  - "[[Widget_Architecture]]"
  - "[[Bug_Listing_Badge_Stars_Direct_Load]]"
  - "[[Phase_1_Widget_Runtime_Audit]]"
  - "[[Phase_2_Widget_Module_Split_Plan]]"
  - "[[ADR_0015_Canonical_Product_Identity]]"
  - "[[ADR_0016_Rating_Visual_System]]"
  - "[[ADR_0017_Badge_Architecture]]"
  - "[[ADR_0019_Icon_Sprite_Rendering]]"
  - "[[ADR_0038_Runtime_Attested_Storefront_Placement]]"
source_files:
  - "src/widget/listing-badges/index.js"
  - "src/widget/listing-badges/ratings.js"
  - "src/widget/listing-badges/inject.js"
  - "src/widget/listing-badges/strict-inject.js"
  - "src/widget/core/badge.js"
  - "src/widget/core/helpers.js"
  - "src/widget/core/listing-viewport-gate.js"
  - "src/widget/core/context-epoch.js"
  - "src/widget/placement/capability.js"
  - "src/widget/observer.js"
  - "src/widget/core/storefront-context.js"
  - "src/app/api/public/ratings/route.ts"
  - "src/app/api/public/ratings-by-slug/route.ts"
  - "src/widget/surfaces/listing-badge.surface.js"
  - "src/widget/themes/current-adapter.js"
  - "src/widget/themes/ozy/adapter.js"
  - "src/widget/themes/ozy/theme.js"
  - "tests/widget-network-smoke.spec.ts"
  - "tests/widget-placement-capability.spec.ts"
  - "tests/widget-harness.ts"
---

# Listing Rating Widget

## Agent Brief

Production listing badges are strict Ozy placement plus canonical Product ID
identity. Storefront Events provide the ID when possible; an ID-less strict card
may use its slug only to obtain a Product ID from lifecycle evidence. A visible
badge never uses slug identity: its immutable proof, owned slot, inner badge,
dedupe marker, request, and session cache all resolve to Product ID. Any
ambiguity fails closed.

## Summary
Star+count badge injected into strictly attested product cards on collection, search, homepage, and slider surfaces. It is lazy-loaded through the surface registry. ADR 0038 separates product identity from DOM placement: policy selects a placement provider, then that provider must return an exact card/title/mount proof before any ratings request.

## Components
| File | Role |
|---|---|
| [index.js](src/widget/listing-badges/index.js) | Collect strict proofs, batch rating reads, revalidate proofs, and inject |
| [placement/capability.js](src/widget/placement/capability.js) | Select the permitted adapter and produce exact, ephemeral card/link/title/mount proofs |
| [ratings.js](src/widget/listing-badges/ratings.js) | Bulk Product ID rating reads plus one-shot lifecycle-safe slug-to-ID discovery; Product ID-only v3 cache |
| [strict-inject.js](src/widget/listing-badges/strict-inject.js) | Production insertion from a still-current proof; never rediscovers a generic target |
| [inject.js](src/widget/listing-badges/inject.js) | Preview-only fixture insertion helper |
| [listing-badge.surface.js](src/widget/surfaces/listing-badge.surface.js) | Lazy surface descriptor for page/listing/search contexts |
| [core/listing-viewport-gate.js](src/widget/core/listing-viewport-gate.js) | Near-viewport gate for below-the-fold listing/product-slider badge hydration |
| [themes/ozy/adapter.js](src/widget/themes/ozy/adapter.js) | Explicitly runtime-detectable Ozy adapter with bounded strict selectors |

## API
- Primary endpoint: `GET /api/public/ratings?storeId=<id>&productIds=a,b,c` ([src/app/api/public/ratings/route.ts](src/app/api/public/ratings/route.ts)).
- Discovery endpoint: `GET /api/public/ratings-by-slug?storeId=<id>&slugs=a,b,c` ([src/app/api/public/ratings-by-slug/route.ts](src/app/api/public/ratings-by-slug/route.ts)) only for strict DOM candidates where Ikas Events did not provide Product IDs. A slug resolves only through exactly one fresh, current-generation `active_verified` snapshot with no unknown, stale, tombstone, or conflict ambiguity; historical `Review.slug` is never queried as identity.
- Server groups approved reviews by `productId`, returns `{ productId: { avg: '4.5', count: 12 } }` on the primary path.
- The discovery path returns `{ slug: { productId: '...', avg: '4.5', count: 12 } }`. A safely resolved zero-review product returns its Product ID with `avg: '0.0', count: 0`; an unsafe or unresolved slug is omitted.
- Bulk fetch (one request per batch) instead of per-card requests.
- Max 100 ids/slugs per request — server-side cap.

## Identity Contract
- Canonical review product identity is `(storeId, productId)`; see [[ADR_0015_Canonical_Product_Identity]].
- `core/storefront-context.js` atomically replaces current-epoch `VIEW_LISTING` and `VIEW_SEARCH_RESULTS` maps for every event generation. Same slug/same ID duplicates are valid; same slug/different or malformed IDs block direct reads and discovery.
- The runtime first creates a strict DOM candidate. A current event match supplies canonical identity; otherwise the slug is only a discovery input. The response must promote that exact still-current candidate to an immutable Product ID proof before insertion.
- Epoch, event generation, adapter, container, exact link and href slug, title, and mount point are checked again after asynchronous work and immediately before DOM mutation.
- Quick-view uses the clicked exact attested link and one bound modal/title/token. It seals Product ID from a valid proof or current event identity. A same-route listing generation may rebind only the exact unchanged target to a valid proof with that same sealed Product ID; an unsealed or different ID fails closed. The 10-second timeout limits only pre-bind modal discovery. Once bound, elapsed time and a non-link interaction inside the exact modal do not revoke identity; a disconnected/changed source, outside attestation break, hidden, closed, replaced, retitled, or duplicate modal retires the context and removes its old slot.

## Performance notes
- Requests are bulked in groups of 50. Event-ID and slug-discovery candidates use separate endpoint batches; there is never a request per card.
- Exact product-id ratings may use the normal public read cache. The slug-only
  discovery response is `no-store` in backend/Worker source. Resolved rating
  summaries may enter `renuvex_pr_ratings_v3_<storeId>` only under Product ID,
  with an independent five-minute timestamp per entry. Slug-to-ID mappings are
  never persisted, and the v2 slug cache is not read or migrated.
  Live Worker no-store acceptance remains a separate deployment gate.
- Production discovery is bounded to strict containers exposed by explicitly runtime-detectable adapters. There is no `main/[role=main]`, class-substring, whole-document link, or title-text placement fallback.
- The existing MutationObserver remains the single debounced coordinator. It triggers re-attestation for lazy cards; it is not itself placement authority.
- The coordinator records only proof-scoped request state in a `WeakMap`: an
  exact card candidate can be `in_flight`; a successful zero result is `empty`
  and a safe resolver miss is `unresolved` for five minutes on that same DOM
  identity. Carousel/style mutations therefore cannot queue the same discovery
  repeatedly. Network/HTTP/429/5xx/malformed failures are retryable, while a
  recycled link, changed Product ID or event generation, replaced title/mount,
  or new epoch invalidates the state.
- Below-the-fold listing/product-slider candidates are registered with `IntersectionObserver` through [core/listing-viewport-gate.js](src/widget/core/listing-viewport-gate.js). The default `rootMargin` is `400px 0px`: near/above-viewport cards hydrate at current speed, while far below-the-fold cards do not load the `listing-badges-*` chunk or call `/api/public/ratings*` until the shopper scrolls near them. A passive scroll/resize check exists only as a non-polling safety fallback if the observer callback does not fire.
- Invisible badge placeholders may reserve layout before Product ID resolution,
  but are not ratings/badges and are removed after settlement. Every visible
  slot and its inner badge carry matching `data-renuvex-product-id` values.
- Listing badge slots mount as siblings immediately after product title elements by default. There is no publicApiKey allowlist or legacy in-title branch; supported theme exceptions must use the adapter mount-point override.

## Settings
Listing badges have no dedicated `widgetId`. Visibility is gated by the `badge`
widget's `enabled` toggle ([index.js](src/widget/listing-badges/index.js)). The
star **icon** and **color** come from the global rating visual system — the
`reviews` widget's `reviewIcon` / `reviewStarColor` — which `index.js` resolves
(`getIconFromSettings`) and applies via the single `--renuvex-pr-review-star-color`
CSS variable before injecting badges. Badge stars are no longer hardcoded to
`star:classic`. See [[ADR_0016_Rating_Visual_System]].

## Notes
- Strict signatures vary by adapter. Themes that lazy-load cards are handled by the existing MutationObserver, but an unsupported or ambiguous signature remains a no-op.
- If a card moves (e.g., theme reflows), the badge may end up in a stale position. Watch for re-injection logic.
- DOM-only fallback is fail-closed and snapshot-backed. Missing, stale,
  unknown, conflicting, or ambiguous lifecycle evidence produces no badge; it
  never falls back to historical slug rows.
- Cold direct entry to home/category/search pages once rendered listing badges as `avg (count)` text without star icons. Root cause: the shared star CSS was injected only by the PDP `render.js` path. Fixed 2026-05-17: `core/badge.js` self-injects badge styles via `ensureBadgeStyles()`, independent of the PDP path. See [[Bug_Listing_Badge_Stars_Direct_Load]].
- The full Phase 1 listing audit checklist lives in [[Phase_1_Widget_Runtime_Audit]].

## Placement Safety Contract

- A public `placementPolicy` selects `provider_verified`, `runtime_attestation`, or `disabled`; it does not carry a second adapter key.
- Both enabled modes require the same strict target proof. Provider evidence selects an adapter; it does not authorize generic DOM fallback.
- Ozy is currently the only runtime-detectable adapter. Generic is never a detector, multiple matches are ambiguous, and either case produces no request or mutation.
- A proof carries the exact card, product link, title, mount point, identity, and context epoch. Injection revalidates those fields after the asynchronous rating response.
- Slot discovery, link markers, dedupe, stale retirement, and one-shot self-heal compare Product ID rather than slug.
- A new adapter needs a bounded signature, cross-theme negative fixtures, browser availability tests, and an explicit registry opt-in. It does not join runtime scanning merely by existing.

## Related Source Files
- [src/widget/listing-badges/](src/widget/listing-badges/)
- [src/widget/surfaces/listing-badge.surface.js](src/widget/surfaces/listing-badge.surface.js)
- [src/widget/core/listing-viewport-gate.js](src/widget/core/listing-viewport-gate.js)
- [src/widget/themes/ozy/adapter.js](src/widget/themes/ozy/adapter.js)
- [src/app/api/public/ratings/route.ts](src/app/api/public/ratings/route.ts)
- [src/app/api/public/ratings-by-slug/route.ts](src/app/api/public/ratings-by-slug/route.ts)

## Obsidian Links
- [[Storefront_Widget_Overview]]
- [[Widget_Architecture]]
- [[Caching_And_Performance]]
- [[Ikas_Theme_Limitations]]
- [[Bug_Listing_Badge_Stars_Direct_Load]]
- [[Phase_1_Widget_Runtime_Audit]]
- [[Phase_2_Widget_Module_Split_Plan]]
- [[ADR_0015_Canonical_Product_Identity]]

## Change Log
- 2026-09-10: PR #40/main `559a7d4b`, exact Vercel deployment, and approved
  Worker version `b7e942eb-c638-422f-8e8b-51afffaba4ba` deployed the bound-modal
  lifetime fix. Desktop and `412x915` Canary 1 passed PDP, category, homepage
  scroll/slider/infinite-scroll, search, and quick-view. Event-backed category
  cards used one Product ID batch; ID-less homepage cards used one bulk slug
  discovery request and every visible result was promoted to Product ID.
- 2026-09-10: PR #39's generation fix was merged and deployed. Production then
  showed the correct quick-view Product ID badge disappearing at about
  `14.48 s` while the modal/title nodes stayed identical. Commit `0705f819`
  narrows the 10-second timeout to pre-bind discovery, preserves interactions
  inside the exact bound modal, and keeps disconnected or changed targets
  fail-closed. Local placement `49/49` and five-browser `20/20` passed before
  the PR #40 rollout recorded above.
- 2026-09-09: The first live Product ID runtime canary found that Ozy emitted a
  same-route listing generation after card click, replacing the exact link's
  attestation and leaving quick-view safely blank. The source fix preserves
  quick-view only when the exact target is unchanged and the replacement proof
  equals the sealed clicked Product ID; different or unsealed identity remains
  fail-closed. Local placement and five-browser regressions passed; the later
  production follow-up and live acceptance are recorded above.
- 2026-09-09: Closed the source Product ID propagation gap for ID-less strict
  cards. The slug API now returns the lifecycle-resolved Product ID, candidates
  are promoted only after full revalidation, visible slot/inner badge ownership
  is Product ID-stamped, v3 cache keys are Product ID-only, event conflicts fail
  closed, and quick-view binds one exact modal instance. The first rollout and
  canary now pass; lifecycle continuity and Canary 2 remain separately gated.
- 2026-09-08: Bound listing request coordination to the exact placement proof.
  Repeated carousel/style mutations no longer fan out duplicate slug reads
  while a batch is in flight or after a successful empty response; failed
  requests remain retryable and lifecycle-safe slug results remain uncached.
- 2026-08-10: ADR 0038 replaced broad production listing discovery with strict proof-carrying placement, current-epoch event identity plus lifecycle-safe slug fallback, and safety-first legacy runtime cutover. The existing observer remains the only listing coordinator; preview keeps a separate fixture helper.
- 2026-08-09: Corrected the lifecycle identity/cache contract. Slug-only reads
  require one fresh unambiguous active snapshot, never query historical
  `Review.slug`, and remain outside edge/session caches. Live Worker acceptance
  remains separately gated.
- 2026-07-01: Added viewport-aware lazy hydration for below-the-fold listing/product-slider badge candidates. Far below-the-fold candidates now wait behind an `IntersectionObserver` gate before loading the listing badge chunk or sending the bulk ratings read; above/near-viewport cards and the no-`IntersectionObserver` fallback keep the previous eager behavior. Network smoke covers no early `listing-badges-*` chunk, scroll-triggered hydration, one bulk ratings request, disabled/unsupported theme fail-closed behavior, and duplicate navigation guards.
- 2026-06-01: Completed ADR_0017 listing mount rollout cleanup. Removed the temporary publicApiKey gate and legacy in-`<h2>` mount branch; browser coverage now pins that listing badge slots mount as title siblings and keep one bulk ratings request.
- 2026-05-24/25: Listing badge stars now render via the shared SVG `<symbol>` sprite (`<use>`) instead of inline `<path>` (~4.6 KB/badge of duplicated path data removed); the badge is labelled via an sr-only `aria-labelledby` span and aligned via `data-renuvex-align`. See [[ADR_0019_Icon_Sprite_Rendering]].
- 2026-05-19: Listing badge star icon + color are now single-sourced from the `reviews` widget (`reviewIcon`/`reviewStarColor`) instead of a hardcoded `star:classic` and the dead `badge.color`. `index.js` parses the icon and sets the star color CSS variables on the listing path itself, so cold listing entry shows the correct icon/color without depending on the PDP `render.js`. `iconPair` is threaded through `injectBadges` → `createBadgeEl`. See [[ADR_0016_Rating_Visual_System]].
- 2026-05-18: Post-deploy live retest on `dev-mertcopper.ikas.shop` confirmed `runtime-2RGD2H4S.js`, visible listing badges on `/clothing` desktop/mobile, and zero widget-sourced `document.querySelectorAll('a[href]')` calls.
- 2026-05-18: Follow-up O8 live test found the MutationObserver still calling whole-document `document.querySelectorAll('a[href]')` from the runtime. Fixed by sharing scoped link discovery through `core/link-scope.js`; active generated runtime now avoids that scan.
- 2026-05-28: `pnpm test:widget-smoke` now covers both sides of the fallback contract: generic/external/system link pages must not load `listing-badges-*`, while product-like listing DOM must load the fallback chunk and call the slug ratings endpoint.
- 2026-05-18: Reduced listing badge layout shift and DOM scan cost. `dom.js` now scopes candidate link discovery to theme product containers/main content, and `index.js`/`inject.js` reserve invisible badge slots while ratings are in flight before replacing them with real badges.
- 2026-05-17: Listing/search badges now prefer canonical product-id rating reads via `/api/public/ratings?productIds=...`. `ratings-by-slug` remains only as DOM fallback. Related: [[ADR_0015_Canonical_Product_Identity]].
- 2026-05-17: DOM fallback now uses `ProductSnapshot` before legacy slug reads, backed by ikas product webhooks/backfill.
- 2026-05-17: Phase 2 implementation and live verification closed: listing badges lazy-load through `listing-badge.surface.js` and `core/lazy-modules.js`; `VIEW_SEARCH_RESULTS` product arrays are handled beside verified `VIEW_LISTING`; Ozy allowlist/blocklist rules moved into `themes/ozy/adapter.js`.
- 2026-05-17: Cold-entry missing-star bug fixed — the badge factory (`core/badge.js`) now self-injects its star CSS via `ensureBadgeStyles()`, no longer depending on the PDP-only full styles path. Live placement audit on home/category/search/clothing found no false positives. See [[Bug_Listing_Badge_Stars_Direct_Load]], [[Phase_1_Widget_Runtime_Audit]].
- 2026-05-17: Documented the old Ozy selector allowlist/blocklist risk. Phase 1 must test false positives/negatives across menus, footer, banners, sliders, category/search grids, and merchant-added sections; Phase 2 should move this into a structured adapter/fallback layer.
- 2026-05-17: Added Phase 1 cold-entry verification note for listing badges missing star icons on direct home/category/listing entry. Related bug: [[Bug_Listing_Badge_Stars_Direct_Load]].
