---
type: decision
project: renuvex-product-reviews
status: active
created: 2026-08-10
updated: 2026-09-09
last_verified: 2026-09-09
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
  - "[[Badge_Product_ID_Closeout_Acceptance_2026-09-09]]"
  - "[[Bug_Quick_View_Badge_Listing_Generation_Rollover]]"
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
where placement is safe. A visible badge additionally requires an immutable
Product ID proof, and both its owned slot and inner badge carry that Product ID.
Unknown policy versions, ambiguous adapters, unresolved/conflicting identity,
broad selectors, stale context, and stale settings all fail closed. The
explicit Shadow DOM review mount and admin preview remain separate contracts.

## Status

Accepted on 2026-08-10. PR #35 established the strict placement baseline, PR
#36 bound duplicate-request suppression to the exact candidate, and PR #37
merged Product ID propagation. PR #38 restored deterministic browser CI; main
Quality Gate `34389119540` passed. The Product ID backend and first approved
Worker runtime are live. Its first canary passed PDP/category/home placement but
exposed a quick-view availability regression during same-route listing event
replacement. The strict fix is local on `codex/badge-quick-view-closeout`; this
closeout is not Production-accepted until the follow-up rollout and all gates in
this ADR pass.
This ADR supersedes only the automatic-placement authorization and
legacy-runtime portions of [[ADR_0022_Placement_Allowlist_And_Lazy_Resync]].
ADR 0022's pure settings read, `themeSyncDue`, lazy sync, and explicit
review-mount decisions remain active.

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

Storefront Events remain the preferred identity source. Each category/search
event atomically replaces the slug-to-ID map and advances a listing generation.
Repeated rows with the same slug and Product ID are valid; different or
malformed IDs for one slug mark the generation conflicted and block both direct
reads and slug discovery. Ikas has not guaranteed that every future
infinite-scroll or lazy card appears in a refreshed event payload, so a strict
ID-less card may use the lifecycle-safe slug resolver exactly once. DOM text
and slug are never canonical product identity.

Listing work is split into two types. A candidate is a strict, current DOM
placement attestation and may carry an event Product ID or a slug discovery
input. A resolved proof is immutable and always carries a Product ID. The slug
endpoint must return `{ productId, avg, count }`; the runtime revalidates the
candidate before promotion. A Product ID-less legacy response, unexpected key,
malformed rating/ID, stale proof, or resolver miss cannot produce a visible
badge. A zero-review response may prove identity but produces no badge.

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

Listing request coordination is bound to the exact ephemeral candidate. A
`WeakMap` suppresses duplicate work while its bulk request is in flight and for
five minutes after a successful empty or unresolved result. HTTP/network
failures remain retryable, and any link, identity, target, event generation, or
epoch change invalidates the match. The separate session rating cache is
`renuvex_pr_ratings_v3_<storeId>`, uses Product ID keys and per-entry five-minute
TTLs, never reads the v2 slug cache, and never stores slug-to-ID mappings.

Quick-view context preserves the exact clicked attested link. It may wait for
that link's resolver promotion, but it binds at most one exact visible
modal/title instance for a bounded token. Closing, hiding, replacing, retitling,
or multiplying the modal retires the context and removes its old badge slot, so
a recycled modal cannot retain or reuse another Product ID.

The clicked Product ID is sealed from a valid proof or current event identity.
A later listing generation may replace the candidate only when the exact
adapter/epoch/container/card/link/href/slug/title/mount target is unchanged and
the current valid proof has the same sealed Product ID. A generation rollover
without a sealed ID, a different ID, or any changed target remains a no-op. This
permits Ozy's same-route event enrichment without weakening card-recycling or
wrong-product defenses.

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
2. Deploy the backend first. Verify the Product ID-bearing slug response at the
   Vercel origin, including a safely resolved zero-review product and
   `Cache-Control: no-store`; retained old runtime behavior must stay valid.
3. Verify the same slug response through the Worker read origin with
   `X-Renuvex-Edge-Cache: BYPASS` and no cached body.
4. Deploy the Worker only after separate mutation approval.
5. In a fresh browser context, verify the manifest/runtime hash, strict Ozy PDP,
   listing/home/search/slider, modal, SPA behavior, Product ID attributes, and
   negative surfaces.
6. Let one natural daily Product Lifecycle reconciliation complete, then repeat
   the same canary before declaring the closeout Production-verified.

Rollback depends on the failure:

| Failure | Recovery |
|---|---|
| Runtime detector/observer/injection regression | Keep the new backend and roll the Worker back; fresh old runtimes remain safe-disabled. |
| Product ID slug API or backend policy regression | Roll back the Vercel backend; a Worker rollback cannot repair the origin body. |
| Legacy boolean regression | Emergency backend fix/rollback; do not rely on Worker rollback. |
| Stale edge policy | Compare origin and edge, then use an explicitly approved purge only if required. |
| Runtime closeout regression | Roll the Worker only to the known-safe PR #35/#36 runtime; never restore the pre-PR #35 broad selector runtime. |
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
  recycled card/modal, identity conflict, and stale async responses are no-ops;
- quick-view survives same-target listing-generation enrichment only for an
  already sealed identical Product ID; changed/unsealed identity is a no-op;
- slow valid DOM can mount while the context remains current;
- every visible PDP/listing/modal badge and its owned slot carry the same
  non-empty Product ID;
- old runtime plus new API ignores the additive Product ID field, while new
  runtime plus old Product ID-less slug response stays fail-closed;
- v2 rating cache data is ignored and the Worker never caches slug discovery;
- one listing observer coordinates debounced strict re-attestation;
- explicit reviews mount and preview remain unchanged;
- Worker origin/edge bodies, manifest/runtime hash, Sentry identity alerting,
  two live canaries, and fresh-browser behavior are verified independently.
