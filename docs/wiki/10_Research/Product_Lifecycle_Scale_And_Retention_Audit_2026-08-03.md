---
type: research
project: renuvex-product-reviews
status: active
created: 2026-08-03
updated: 2026-08-08
last_verified: 2026-08-08
confidence: high
tags:
  - product-lifecycle
  - reconciliation
  - postgres
  - retention
  - scalability
related:
  - "[[ADR_0037_Product_Lifecycle_Evidence_And_Tombstones]]"
  - "[[Maintenance_Runbook]]"
  - "[[Database_Map]]"
  - "[[Database_Schema]]"
  - "[[Current_Status]]"
source_files:
  - "prisma/models/product-lifecycle.prisma"
  - "src/lib/product-lifecycle.ts"
  - "src/lib/product-snapshots.ts"
  - "src/lib/product-reconciliation.ts"
  - "src/lib/product-reconciliation-dispatcher.ts"
  - "src/app/api/admin/sync-products/route.ts"
  - "src/app/api/internal/product-reconciliation/route.ts"
  - "src/app/api/public/upload/sign/route.ts"
  - "src/lib/review-email/erasure.ts"
  - "workers/widget-delivery/src/index.ts"
  - ".github/workflows/widget-smoke.yml"
  - "scripts/verify-product-lifecycle.ts"
---

# Product Lifecycle Scale And Retention Audit - 2026-08-03

## Agent Brief

Use this page before changing product lifecycle retention, reconciliation
cadence, store erasure, storefront slug resolution, or making a merchant-scale
claim. Release A's database/backend is merged, deployed, and ready for the
current active installation. The end-to-end storefront cutover is not closed:
the live Cloudflare Worker still caches `ratings-by-slug` even though current
source bypasses that cache. The tombstone/evidence model remains a valid
durability boundary, but the current global discovery loop, per-product write
pattern, terminal-run retention, and uninstall coverage are not approved for
5,000 or 100,000 stores.

This page separates measured Production evidence from arithmetic projections.
It does not authorize SQL cleanup, provider mutation, Release B deployment, or
a scale claim.

## Evidence Boundary

- Repository baseline: `main = origin/main = 6e6414989b45dd443058e252948585a34f30ed2e`.
- Release A migration count: 62; the additive lifecycle migration is applied.
- Read-only verifier result: `expanded=true`, `ready=true`, one active
  installation, zero active-installation missing/unknown/stale snapshots, and
  zero unavailable/conflict snapshots for that active installation.
- Database measurements below were taken in explicit read-only PostgreSQL
  transactions and contain aggregate counts only. No store id, product id,
  slug, token, or PII is recorded here.
- Measurements describe the 2026-08-03 test-store footprint. They are not a
  future capacity guarantee.
- A 2026-08-08 read-only edge recheck returned `MISS` and then `HIT` for two
  consecutive `widget.renuvex.app/api/public/ratings-by-slug` requests, with
  `Cache-Control: public, max-age=0, must-revalidate`. Wrangler reported the
  newest serving deployment as 2026-07-04, before the Release A merge. Current
  Worker source uses `forceNoStore`; source and live edge are therefore not yet
  equivalent.
- No Worker deploy, database write, QStash publish, or provider mutation was
  performed by this audit.

## Architecture Verdict

The core database/backend pattern is appropriate, not a patch:

- `(storeId, productId)` is the ownership key.
- Provider absence becomes evidence/tombstone instead of deleting historical
  review ownership.
- Signed webhooks are wakeups; exact provider reads establish current evidence.
- Periodic reconciliation covers missed, duplicated, delayed, or out-of-order
  webhook delivery.
- Unknown, stale, or conflicting evidence fails closed.

This is consistent with webhook reconciliation practice, but indefinite
retention of every tombstone and every completed run is not an industry
standard. Retention and workload bounds are application policies that must be
defined and enforced separately.

`Review.productId`, `productName`, and `slug` are historical review snapshots.
They cannot prove whether a product currently exists, cover products with zero
reviews, resolve the current slug safely, or record deletion/conflict evidence.
`ProductSnapshot` therefore has a concrete role and is not duplicate review
data.

## Measured Production Footprint

### Product snapshots

| Measurement | Value |
|---|---:|
| Rows | 64 |
| Average row payload (`pg_column_size`) | 271.02 bytes |
| Maximum row payload | 361 bytes |
| Table bytes | 32 KiB |
| Index bytes | 104 KiB |
| Total relation bytes | 176 KiB |
| `active_verified` rows | 33 |
| Global `unknown` rows | 31 |

The 33 active rows belong to the active installation and pass the ready gate.
The 31 global unknown rows belong to a store with no matching installation and
have zero review/summary/request/media references. This does not invalidate the
active-installation-scoped verifier; it proves a separate uninstall-retention
gap.

### Reconciliation runs and update behavior

| Measurement | Value |
|---|---:|
| `ProductReconciliationRun` rows | 1 completed run |
| Run row payload | 256 bytes |
| Run relation including minimum table/index pages | about 112 KiB |
| Snapshot updates recorded by `pg_stat_user_tables` | 401 |
| Dead tuples at audit time | 46 |
| Historical HOT updates | 301 |

`applyExactProductEvidenceBatch()` reads existing rows in one query but then
executes one `update` or `create` per product. Daily active verification changes
`lastVerifiedAt`, `lastSeenReconciliationRunId`, `lastSyncedAt`, and Prisma's
`updatedAt`. The first two fields participate in indexes. PostgreSQL HOT is not
available when an update changes an indexed column, so the new daily evidence
writes should be treated as normal heap/index/WAL work even though historical
statistics include HOT updates from earlier write shapes.

The static tombstone bytes are currently negligible. The material long-term
cost is repeated provider scanning plus row-version, index, WAL, vacuum, and
QStash work.

## Scale Projection

These values use the measured 271-byte average row payload. They exclude
indexes, page overhead, dead tuples, WAL, backups, replicas, network traffic,
and provider/API pricing. They are planning arithmetic, not a benchmark.

| Stores | Average products/store | Snapshot rows | Raw row payload | Current daily row writes |
|---:|---:|---:|---:|---:|
| 5,000 | 100 | 500,000 | about 129 MiB | 500,000/day |
| 5,000 | 1,000 | 5,000,000 | about 1.26 GiB | 5,000,000/day |
| 5,000 | 5,000 | 25,000,000 | about 6.31 GiB | 25,000,000/day |
| 100,000 | 100 | 10,000,000 | about 2.52 GiB | 10,000,000/day |
| 100,000 | 1,000 | 100,000,000 | about 25.24 GiB | 100,000,000/day |

At 5,000 stores with 1,000 products each, a full daily 200-item scan implies
about 25,000 catalog pages and 5,000 reconciliation runs per day. Keeping one
256-byte run payload per store per day would produce 1,825,000 run rows and
about 446 MiB raw payload per year before indexes.

At 100,000 stores with 1,000 products each, the same shape implies about
500,000 catalog pages, 100,000 runs, and 100,000,000 snapshot writes per day.
This workload has not been provider-quota-tested or load-tested.

## Verified Scale Limits

Individual continuation work is bounded to one 200-product scan page or one
50-id verification batch. Global daily discovery is not bounded across
invocations: `runProductReconciliationMaintenance()` pages through every active
installation in one function call and creates/dispatches each daily run before
returning.

Therefore:

- current backend/DB footprint: conditional GO; end-to-end Release A remains
  open until all `A0-*` gates close;
- Release B rollout: NO-GO until all `A0-*`, `A1-*`, and `B-*` gates close;
- 5,000-store production claim: NO-GO on the current orchestration/write path;
- 100,000-store production claim: NO-GO without a new measured capacity model,
  provider quota contract, backpressure, and representative load tests.

The evidence/tombstone data model can remain. The orchestration and write
strategy must change before a large-scale claim.

## Canonical Closure Matrix

This is the single authoritative action list. Short status pages should link to
this table instead of inventing a second sequence.

| ID | Required correction | Acceptance evidence | Blocks |
|---|---|---|---|
| `A0-EDGE` | Deploy the already-merged Worker and widget runtime through a separately approved mutation. Do not change DNS, zone ownership, or unrelated Worker infrastructure. | The serving deployment is newer than the Release A merge. Two consecutive slug requests return `Cache-Control: no-store`, never `CF-Cache-Status: HIT`, and never `X-Renuvex-Edge-Cache: HIT`; then wait the existing five-minute old-runtime session-cache window and repeat storefront acceptance. | End-to-end Release A closure and Release B |
| `A0-DISPATCH` | Make `POST /api/admin/sync-products` check `dispatchProductReconciliationRun()`. A failed publish must return a fixed retryable `503` instead of claiming accepted `202`; the DB-owned pending run remains recoverable by maintenance. | Unit route tests cover publish success/failure, no dynamic error leak, and no false `202`; a dev-store manual sync proves a delivered QStash message and completed run. | Operational Release A acceptance |
| `A0-CI` | Promote the existing Worker unit tests plus `pnpm worker:widget:deploy:dry-run` into a required Worker-change CI gate. | A Worker-source/config PR cannot merge when unit tests, prepared assets, binding types, or Wrangler dry-run fail. This gate does not deploy. | Future Worker mutations |
| `A1-ERASURE` | Add `ProductSnapshot` and `ProductReconciliationRun` to the existing store-scoped, generation-fenced erasure inventory and destructive phases. Preserve lock order and immutable-journal prerequisite; never direct-SQL-delete the measured orphan rows. | PostgreSQL 16/17 races prove reinstall data is protected, exact-store rows are removed only after journal evidence, row counts are audited, and stale generations no-op. | Release B |
| `A1-RUN-RETENTION` | Define an explicit terminal-run retention interval and bounded maintenance deletion. Preserve the latest successful evidence per active installation plus a bounded diagnostic/error history. Do not guess the interval: record the chosen incident/restore rationale before implementation. | Retention tests cover completed, stale, exhausted, recent-error, active/nonterminal, and latest-success cases; cleanup is bounded and tenant-scoped. | Sustained multi-merchant operation and Release B |
| `B-EVIDENCE` | Close the undocumented Ikas absence-consistency boundary. A transient single exact-empty response must not become consumer-visible unavailability unless Ikas supplies a suitable contract or Renuvex adds a tested multi-step confirmation policy. | ADR records the evidence rule; delayed visibility and transient empty provider responses cannot produce a false tombstone. | Release B |
| `B-SCAN` | Strengthen page-scan integrity. Require a provider snapshot/ordering contract or add deterministic ordering and whole-run detection for cross-page duplicate/drift conditions before absence candidates are trusted. | Tests cover concurrent catalog mutation, cross-page duplicate IDs, changing count/page contents, malformed pagination, and partial scans; uncertainty remains fail-closed. | Release B |
| `B-RETRY` | Schedule a delayed continuation for `busy`, `deferred`, auth-temporary, and retryable processing outcomes using the persisted lease/`nextRetryAt`. Daily maintenance remains a disaster-recovery fallback, not the normal retry clock. | QStash tests prove delay calculation, duplicate safety, publish failure visibility, and recovery before the next daily schedule. | Release B operations |
| `B-CONFLICT-OPS` | Add aggregate alerting and an audited operator workflow for `identity_conflict`. Direct SQL remains forbidden. The conflict stays sticky unless a later ADR defines sufficient provider evidence and a fenced resolution transition; fresh visibility alone is not enough. An admin UI is optional, but observability and a controlled command/runbook are not. | A synthetic conflict raises the expected signal and remains consumer-blocking. Any future state change requires the separately approved evidence rule, audit record, and installation fence; no automatic reactivation exists. | Release B |
| `B-CONSUMERS` | Implement the separately approved Release B lifecycle resolver across public ratings/reviews, review submit, image/video initiation and registration, review email, review center, and admin availability. Exact product ID must be checked before provider upload intent or local mutation. | Full route, PostgreSQL, widget, review-center, admin, and email lifecycle matrix passes after `--expect=ready`; no unknown/stale/conflict request starts provider or DB write work. | Release B deployment |
| `SCALE-DISCOVERY` | Persist a global installation-discovery cursor and continue work across bounded QStash invocations. | Every invocation has a fixed store/time bound, progress survives timeout/retry, and 5,000-store discovery completes under measured quotas. | 5,000+ store claim |
| `SCALE-WRITES` | Replace one unconditional row write per active product with measured set-based or changed-only evidence persistence without weakening per-product identity/freshness. | Representative PostgreSQL plans and load tests report rows written, WAL, dead tuples, autovacuum, duration, and correctness under retries. | 5,000+ store claim |
| `SCALE-FLOW` | Configure measured QStash backpressure/flow control and alert on run age, dispatch failures, exhausted runs, DLQ, conflict counts, provider failures, DB/WAL pressure, and autovacuum lag. | Provider quota, QStash volume, Vercel concurrency, and PostgreSQL capacity tests pass at the stated merchant/product model. | 5,000/100,000 store claim |

### Gate ordering

1. Close `A0-EDGE`, `A0-DISPATCH`, and `A0-CI` before calling Release A
   end-to-end complete.
2. Close `A1-ERASURE` and `A1-RUN-RETENTION` before Release B rollout.
3. Close every `B-*` item before enabling consumer enforcement. Source-only
   implementation is not deployment evidence.
4. Close every `SCALE-*` item before a 5,000-store claim. A 100,000-store claim
   additionally needs its own measured capacity model and provider quota proof.

No gate authorizes direct SQL cleanup, hard-deleting referenced tombstones,
weakening `(storeId, productId)`, accepting webhook payload as canonical
evidence, or treating an old installation's task as current.

Partitioning, sharding, a second database, or a new queue provider are not
approved by this audit. Add them only if measured plans and workload evidence
show that bounded batching and changed-only writes are insufficient.

## Retention Rules

- Keep snapshots/tombstones while an active store has historical references.
- Keep `identity_conflict` until an explicit evidence/operator process resolves
  it; never resolve it by direct SQL.
- Remove lifecycle rows for an erased/missing installation through the same
  store-scoped, generation-fenced erasure workflow as the rest of tenant data.
- Do not add a second `missingSince`/`deletedAt` field now. `unavailableAt`
  already records the first verified unavailable transition.
- A bounded policy for active-store, unreferenced tombstones may be designed
  later, but only with an explicit grace period and proof that it does not
  remove identity-conflict protection.
- Do not delete the 31 measured orphan rows ad hoc. First fix source ownership,
  then use an approved, auditable recovery path.

## Cost Interpretation

Supabase paid database billing is based on provisioned disk, not a separate
per-row charge. The measured 176 KiB relation does not create a meaningful bill
by itself. At scale, provisioned storage still includes indexes, WAL pressure,
dead-row/bloat headroom, and backup/replica effects. Operational monitoring must
therefore track database size, IOPS, WAL, dead tuples, autovacuum, provider calls,
QStash deliveries/DLQ, and reconciliation completion age rather than only row
count.

## Official References

- [Ikas webhook scopes](https://builders.ikas.com/docs/app-development/ikas-sdk/webhooks)
- [Shopify webhook reconciliation guidance](https://shopify.dev/docs/apps/build/webhooks)
- [PostgreSQL HOT update requirements](https://www.postgresql.org/docs/current/storage-hot.html)
- [PostgreSQL routine vacuuming](https://www.postgresql.org/docs/current/routine-vacuuming.html)
- [Supabase database and disk size](https://supabase.com/docs/guides/platform/database-size)
- [Supabase provisioned disk usage](https://supabase.com/docs/guides/platform/manage-your-usage/disk-size)
- [Supabase reports and database monitoring](https://supabase.com/docs/guides/monitoring-and-debugging/reports)
- [Cloudflare Wrangler deployments](https://developers.cloudflare.com/workers/wrangler/commands/workers/#deployments)
- [Upstash QStash publish, retries, delay and deduplication](https://upstash.com/docs/qstash/api-reference/messages/publish-a-message)
- [Upstash QStash flow control](https://upstash.com/docs/qstash/features/flowcontrol)

## Change Log

- 2026-08-08: Added the independent re-audit closure matrix. Corrected the
  backend/DB-ready versus live-Worker distinction, recorded the false-`202`
  manual dispatch gap, and separated immediate, Release B, and 5,000+ store
  gates.
- 2026-08-03: Recorded the initial measured footprint, scale arithmetic,
  erasure/retention gaps, and the decision to preserve the evidence/tombstone
  model.
