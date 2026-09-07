---
type: decision
project: renuvex-product-reviews
status: active
created: 2026-08-10
updated: 2026-08-10
last_verified: 2026-08-10
confidence: high
tags:
  - adr
  - widget
  - placement
  - theme-adapter
  - storefront-events
related:
  - "[[Decision_Index]]"
  - "[[ADR_0015_Canonical_Product_Identity]]"
  - "[[ADR_0017_Badge_Architecture]]"
  - "[[ADR_0022_Placement_Allowlist_And_Lazy_Resync]]"
  - "[[ADR_0033_Cloudflare_Worker_Widget_Asset_Delivery]]"
  - "[[Theme_Adapter_Playbook]]"
  - "[[Ikas_Storefront_Events]]"
  - "[[Ikas_Storefront_Script_Capabilities]]"
source_files:
  - "src/lib/storefront-theme.ts"
  - "src/widget/core/settings.js"
  - "src/widget/core/context-epoch.js"
  - "src/widget/core/storefront-context.js"
  - "src/widget/themes/current-adapter.js"
  - "src/widget/themes/ozy/adapter.js"
  - "src/widget/placement/capability.js"
  - "src/widget/rating-badge/index.js"
  - "src/widget/listing-badges/index.js"
  - "src/widget/listing-badges/strict-inject.js"
  - "src/widget/structured-data/index.js"
  - "src/widget/observer.js"
  - "workers/widget-delivery/src/index.ts"
  - "tests/widget-placement-capability.spec.ts"
  - "tests/unit/widget-placement-boundaries.test.ts"
---

# ADR 0038: Runtime-Attested Storefront Placement

## Agent Brief

Use this ADR for automatic PDP, listing, and quick-view rating-badge
placement. `placementPolicy` is the only production placement authority for
the current runtime. The retained `autoPlacementEnabled` field is a migration
field and is always `false`; old runtimes therefore stop auto-placement. A
policy authorizes an adapter-selection strategy, not a DOM target. Every
production path must still obtain a strict, ephemeral target proof before a
rating request and revalidate the same proof before mutation.

Product identity and placement proof are separate. Ikas Storefront Events are
the preferred product/page context. Strict theme DOM evidence answers only
where placement is safe. Unknown policy versions, ambiguous adapters, broad
selectors, stale context, and stale settings all fail closed. The explicit
Shadow DOM review mount and admin preview remain separate contracts.

## Status

Accepted for source implementation on 2026-08-10. Production backend and
Cloudflare Worker rollout require separate acceptance. This ADR supersedes
only the automatic-placement authorization and legacy-runtime portions of
[[ADR_0022_Placement_Allowlist_And_Lazy_Resync]]. ADR 0022's pure settings read,
`themeSyncDue`, lazy sync, and explicit review-mount decisions remain active.

## Context

Ikas Storefront Events provide supported page and product context, but direct
Ikas feedback does not guarantee that destination DOM is committed when an
event fires. Ikas also does not currently provide a universal stable placement
slot, page-ready callback, or router subscription beyond those events. The
active-theme fields used by the original provider allowlist were no longer
present in the live generated schema when rechecked on 2026-08-09.

The old runtime combined an `autoPlacementEnabled` boolean with broad DOM
fallbacks. An unknown adapter could resolve to Ozy; PDP placement could fall
back to generic title/H1 text matching; listing placement could use broad
class-substring containers and title matching. Keeping that boolean true for a
retained old runtime during migration was therefore not fail-closed.

## Decision

### Public policy

The public runtime exposes one versioned policy:

```ts
type PlacementPolicy =
  | { version: 1; mode: "provider_verified" }
  | { version: 1; mode: "runtime_attestation" }
  | { version: 1; mode: "disabled" };
```

- `provider_verified`: stable current provider evidence selected a known
  non-generic adapter by exact theme id.
- `runtime_attestation`: provider identity cannot authorize an adapter, but an
  explicitly runtime-detectable adapter may prove a supported surface.
- `disabled`: no automatic placement path may run.

`themeAdapterKey` remains the single provider-selected adapter key.
`placementPolicy` never carries a second adapter key. `themeSyncDue` is only an
operational lazy-resync signal and does not grant or revoke placement. A
`pending_verification` theme state cannot use stable provider identity to
authorize placement; it uses runtime attestation.

Missing, malformed, or unknown policy versions are `disabled`. For every v1
policy mode, the backend emits `autoPlacementEnabled: false`. The legacy field
is not canonical and exists only so retained old runtimes fail closed. The
explicit `reviewsMountEnabled` contract is unchanged.

### Placement proof

Both provider-selected and runtime-detected adapters use the same strict target
pipeline:

```text
policy
  -> bounded adapter selection
  -> exact surface proof
  -> rating request
  -> epoch, identity, href, selector, and mount revalidation
  -> DOM injection
```

A proof carries only ephemeral DOM references and context required for the
current operation. It is never serialized or cached. Injection cannot return
to generic discovery after attestation.

- PDP requires exactly one visible strict title outside listing/modal/nav
  surfaces and its exact mount point.
- Listing requires an exact allowlisted container, exact title, one
  same-origin product link for the card, and an exact mount point. Media is not
  required because valid lazy and text-oriented Ozy cards may not have mounted
  media yet.
- Quick-view placement requires context captured from an already attested card
  link, exactly one visible strict modal, and an exact matching modal title.
  Generic clicks and title text alone cannot establish identity.

Ozy is the only runtime-detectable adapter in v1. Generic is never a detector.
Multiple matching runtime detectors are ambiguous and produce no placement.
New adapters opt in only with bounded exact signatures, cross-theme negative
fixtures, browser coverage, and a documented live canary.

### Identity and lifecycle

Storefront Events remain the preferred identity source. Category/search event
maps provide exact product ids when the card slug is present in the current
event generation. Ikas has not guaranteed that every future infinite-scroll or
lazy card appears in a refreshed event payload, so strict cards without event
membership may use the lifecycle-safe slug resolver. DOM text is never a
canonical product id.

A single monotonic storefront context epoch owns route/product invalidation.
A pathname transition invalidates once; the following product event fills the
new identity without a second invalidation. A same-path canonical product-id
change invalidates. Query-only variant changes do not invalidate product-level
review ownership. Every async proof and response is tied to the epoch.

The existing listing `MutationObserver` remains the one coordinator. It
debounces relevant mutations and reruns strict attestation; it does not reuse
legacy broad discovery. PDP late-DOM observation is one generation-bound
observer, cancelled by context invalidation or a resource-safety watchdog. The
watchdog is not an Ikas DOM-ready guarantee.

JSON-LD is emitted only after a real visible eligible Renuvex rating/review
surface exists. Placement policy alone is insufficient.

### Preview isolation

Admin preview uses explicit fixture DOM and an explicit preview opt-in. Its
preview-only discovery helper may use fixture selectors, but it is excluded
from the production listing import graph. Production strict capability code
does not import preview helpers or generic title discovery.

### Cache and cutover

The current runtime uses `renuvex_pr_settings_v2_<publicKey>`. A valid v1 policy
removes the old `renuvex_pr_settings_<publicKey>` key once in the same tab.
Settings are fresh for five minutes. During the 5-minute to 24-hour stale
window, a failed network fetch may preserve non-placement settings but forces
placement to `disabled`. Older entries are rejected.

An already running old JavaScript context cannot be revoked remotely. Its
in-memory legacy `true` remains effective until that runtime reinitializes or
the context ends; the TTL alone does not schedule a refetch or undo existing
DOM. On reinitialization, a failed fetch can reuse a 5-minute-to-24-hour legacy
session entry, and reload in the same tab does not necessarily clear
`sessionStorage`. This is a bounded rollout limitation, not a claim of instant
cutover.

The Worker stores eligible settings reads in `caches.default` for 60 seconds
and returns `max-age=0, must-revalidate` to browsers with
`X-Renuvex-Edge-Cache: HIT|MISS`. Cloudflare Cache API entries are data-center
local, and Cache API `put`/`match` do not implement origin
`stale-while-revalidate` or `stale-if-error`. Origin body, edge body, manifest,
runtime hash, and browser behavior are therefore separate rollout evidence.

## Rollout and rollback

1. Build backend and runtime from the same commit.
2. Deploy backend first and verify a v1 policy plus legacy `false` at origin.
3. Verify the same body and cache diagnostic through the Worker read origin.
4. Deploy the Worker only after separate mutation approval.
5. In a fresh browser context, verify the manifest/runtime hash, strict Ozy PDP,
   listing, modal, SPA behavior, and negative surfaces.

Rollback depends on the failure:

| Failure | Recovery |
|---|---|
| Runtime detector/observer/injection regression | Keep the new backend and roll the Worker back; fresh old runtimes remain safe-disabled. |
| Backend policy serialization or precedence regression | Roll back or fix the backend; a Worker rollback cannot repair the body. |
| Legacy boolean regression | Emergency backend fix/rollback; do not rely on Worker rollback. |
| Stale edge policy | Compare origin and edge, then use an explicitly approved purge only if required. |
| Full old backend plus old Worker | Not an automatic rollback because it restores the broad legacy placement baseline. |

## Consequences

- A backend-first cutover temporarily hides auto-placed badges for old runtime
  consumers. This availability loss is accepted over wrong-product or wrong-DOM
  placement.
- Provider evidence selects an adapter more strongly, but never weakens target
  proof requirements.
- Runtime attestation is a compatibility provider for the current Ikas platform
  gap, not the product identity layer. A future official Ikas mount primitive
  can replace this provider without rewriting ratings, lifecycle, rendering, or
  surface orchestration.
- No database migration, provider request on the storefront hot path, polling
  loop, second listing observer, or merchant-specific hardcode is introduced.

## Acceptance

Source and browser gates must prove:

- all v1 modes emit legacy `false`;
- new runtime plus missing/malformed/unknown/stale policy is fail-closed;
- retained old runtime plus new backend performs no rating request or automatic
  mutation;
- provider-verified and runtime-attested Ozy both require exact targets;
- broad H1, class-substring, banner, unrelated title, untrusted modal click,
  recycled card, and stale async responses are no-ops;
- slow valid DOM can mount while the context remains current;
- one listing observer coordinates debounced strict re-attestation;
- explicit reviews mount and preview remain unchanged;
- Worker origin/edge bodies, manifest/runtime hash, and fresh-browser behavior
  are verified independently.
