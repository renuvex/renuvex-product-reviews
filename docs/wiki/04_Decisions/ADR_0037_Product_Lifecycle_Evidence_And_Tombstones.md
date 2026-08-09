---
type: decision
project: renuvex-product-reviews
status: active
created: 2026-08-03
updated: 2026-08-09
last_verified: 2026-08-09
confidence: high
tags:
  - adr
  - product-identity
  - reconciliation
  - tombstone
  - ikas
related:
  - "[[Decision_Index]]"
  - "[[ADR_0015_Canonical_Product_Identity]]"
  - "[[ADR_0035_QStash_Scheduler_For_Maintenance]]"
  - "[[Database_Map]]"
  - "[[Maintenance_Runbook]]"
  - "[[Product_Lifecycle_Scale_And_Retention_Audit_2026-08-03]]"
source_files:
  - "prisma/models/product-lifecycle.prisma"
  - "prisma/migrations/20260803120000_add_product_lifecycle_evidence/migration.sql"
  - "src/lib/product-lifecycle.ts"
  - "src/lib/product-snapshots.ts"
  - "src/lib/product-reconciliation.ts"
  - "src/lib/product-reconciliation-dispatcher.ts"
  - "src/lib/product-reconciliation-sweep.ts"
  - "src/lib/product-lifecycle-retention.ts"
  - "src/app/api/internal/product-reconciliation/route.ts"
  - "src/app/api/internal/product-reconciliation-sweep/route.ts"
  - "src/app/api/public/ratings-by-slug/route.ts"
  - "scripts/verify-product-lifecycle.ts"
---

# ADR_0037 - Product Lifecycle Evidence And Tombstones

## Agent Brief

Use this ADR for ikas product deletion, recreation, slug fallback, product
snapshot synchronization, and future review ownership decisions. The canonical
identity remains `(storeId, productId)`. A slug, name, SKU, URL, image, or
provider timestamp is not ownership evidence. Product absence becomes a
tombstone, not a hard delete. A tombstoned id that later reappears becomes a
sticky identity conflict and is never reactivated automatically. The current
verifier exposes only aggregate conflict counts; alerting and an audited
operator-resolution path remain a Release B gate.

The original Release A database/backend is merged and deployed for the current
test installation. PR #30 merged the 2026-08-09 closure source and Production
now includes two-step absence
evidence, bounded global discovery, changed-only snapshot persistence,
generation-fenced erasure, and 42-day terminal run/sweep retention. End-to-end
storefront rollout still
remains open because the live Worker still caches `ratings-by-slug`. Release B
consumer enforcement is not implemented or deployed. Local scale evidence is
not production or provider-capacity evidence. Follow the canonical closure
matrix in [[Product_Lifecycle_Scale_And_Retention_Audit_2026-08-03]].

## Status

Accepted architecture; rollout closure remains conditional. The original
Release A database/backend was merged and deployed at commit
`6e6414989b45dd443058e252948585a34f30ed2e`; the additive 62nd migration,
`--expect=expanded`, bounded reconciliation, and `--expect=ready` all passed on
2026-08-03 for one active installation. A 2026-08-08 read-only edge check still
observed a Worker `MISS` followed by `HIT` for `ratings-by-slug`, and the newest
serving Worker deployment predates the merge.

PR #30 merged the closure implementation at
`37ed06d5182fe6c66b3cf162ac46604bca49b9ce`. Vercel Production deployment
`dpl_DL7H2XEMnnvZVD6qg8rzbhhrotoH` applied migrations 63 and 64. Production
`--expect=expanded` and the RLS/default-grant audit pass. The initial
`--expect=ready` baseline is false because the one active installation has no
fresh current-generation coverage; every reported snapshot, observation,
conflict, and stuck-work drift count is zero. The local PostgreSQL 17 benchmark
passed the 5,000-installation by 500-product model, but representative managed
PostgreSQL, live QStash/provider quotas, convergence, and Worker acceptance
remain unproven. Release B remains separate and unimplemented. These boundaries
prevent a full live or Tam GO claim.

## Context

Reviews already use `(storeId, productId)`, but the previous completeness layer
had three unsafe properties:

- product snapshots could be hard-deleted when a product disappeared;
- a signed product webhook payload could recreate a missing snapshot without a
  canonical provider read;
- the DOM-only badge fallback could query historical `Review.slug` rows when a
  current snapshot could not resolve the slug.

Ikas documents product create/update webhook scopes and exact `listProduct`
filters, but does not publish a product-id reuse guarantee or a dedicated
product-delete webhook. Therefore absence, missed delivery, deletion, and id
reappearance cannot safely be collapsed into one boolean.

## Decision

### Identity and state

The only review ownership key is `(storeId, productId)`. `ProductSnapshot`
records one of four evidence states:

- `unknown`: current provider identity has not been proven;
- `active_verified`: an exact provider result confirmed the id and is fresh;
- `unavailable_verified`: explicit provider `deleted=true`, or two daily
  exact-empty observations in distinct schedule slots at least 24 hours apart,
  confirmed unavailability;
- `identity_conflict`: a tombstoned id later appeared again.

`active_verified` evidence is fresh for 36 hours. This is a Renuvex operating
policy based on daily reconciliation plus retry tolerance, not an ikas SLA.
Provider `createdAt` is retained as audit evidence but cannot resolve an
identity conflict.

Review, ReviewMedia, and ProductReviewSummary rows survive product deletion.
Product names, variants, and slugs remain historical/display snapshots. A new
product id with the same slug starts with zero reviews.

### Evidence acquisition

Signed product webhooks are wakeups. Their payload may identify a product id,
but cannot create or reactivate product evidence. The backend performs an exact
`listProduct(id.eq)` read and writes evidence only after the active installation
generation is rechecked in the final transaction.

Daily maintenance creates or resumes a DB-backed global discovery sweep. Each
sweep continuation discovers at most 50 active installations and persists its
cursor before continuing. Per-installation continuations still accept only an
opaque run id and process at most one 200-item catalog page or one 50-id exact
verification batch. Missing `hasNext`, malformed pagination, duplicate product
ids anywhere in the run, provider failure, or partial scans retry without
producing unavailable evidence.

After the final scan page, references missing from an older hard-delete are
reconstructed as `unknown` from review, summary, request, pending image, and
video session product ids. Only candidates not seen in the complete scan are
verified exactly. A single daily exact-empty observation leaves the snapshot
`unknown`; install/manual empty results do not advance the daily absence count.
Installation generation changes atomically close older runs as
`stale_ignored`.

### Slug fallback

`ratings-by-slug` remains only for DOM paths without an ikas product id. A slug
resolves only when exactly one non-tombstone snapshot is fresh
`active_verified`, with no unknown, stale-active, or conflict candidate. Direct
`Review.slug` fallback and newest-snapshot-wins behavior are removed.

The backend endpoint and merged Cloudflare Worker source are `no-store`. The
widget source stores only exact-id rating results in its five-minute session
cache. Worker and widget deployment remain separate approved mutations; on
2026-08-08 the serving Worker still returned cacheable responses and a second
request hit edge cache. Therefore the source contract is not yet the live edge
contract.

### Scale and retention boundary

Tombstones are retained product-identity evidence, not a replacement copy of
`Review`. They cover current availability, products with zero reviews, safe
slug resolution, deletion, and sticky identity conflicts. Static storage is
not the current cost driver.

The 2026-08-03 audit found four concrete limits in the deployed Release A:
erasure omitted lifecycle rows, terminal runs had no retention, global tenant
discovery was one unbounded invocation, and unchanged products were rewritten
daily. The 2026-08-09 closure source addresses each limit without changing the
canonical identity or deleting tombstones:

- store erasure removes observations, runs, coverage, and snapshots in
  generation-fenced batches of at most 100;
- terminal runs and sweeps are retained for 42 days, while the latest successful
  run for every active installation and the latest successful global sweep are
  protected;
- global discovery persists a sweep cursor and processes at most 50
  installations per invocation;
- per-run observations are a temporary nonterminal working set and are removed
  atomically on completion, stale closure, or exhaustion;
- unchanged active products receive no `ProductSnapshot` update; freshness is
  represented by current-generation `ProductCatalogCoverage`;
- QStash flow control starts at one message per second and parallelism four;
  deduplication includes the durable progress and lease/retry epoch so a crashed
  claim can schedule a distinct post-lease recovery message.

Tombstone and conflict snapshots do not use the 42-day operational-log policy.
They remain until generation-fenced store erasure. Observation deletion creates
dead tuples that PostgreSQL vacuum must reclaim; the implementation therefore
reduces durable growth but does not claim zero WAL or vacuum cost.

The local PostgreSQL 17 5,000 x 500 benchmark recorded 2.5 million snapshots,
20,103 stable-catalog messages, 5.584 hours at one message per second, zero
unchanged snapshot updates after executing the production changed-only helper
for every synthetic product, and zero observations after terminalization. The
helper pass took 130,609 ms; peak observations were 2.5 million and terminal
deletion left 2.5 million dead tuples for vacuum reuse. This is synthetic local
evidence. It excludes exact-candidate backlog, retries, provider quotas, and
managed-service effects, so the managed 5K Scale GO and any 100,000-store claim
remain open.

## Two-release gate

Release A expands evidence and reconciliation while existing consumers remain
backward compatible. `verify:product-lifecycle --expect=expanded` validates the
additive schema, constraints, indexes, RLS, and Data API default-deny surface.

Release B will gate public review/rating reads and writes, media initiation and
registration, review-email requests, review-center submission, and admin
availability labels through the shared lifecycle resolver. It may be prepared
only after every active installation has a fresh completed run, no referenced
product lacks a snapshot, and no active-installation snapshot remains unknown
or stale. `unavailable_verified` and `identity_conflict` are safe fail-closed
outcomes and do not block the ready gate.

The 2026-08-03 Production run passed both verifier modes for the current active
installation. That gate permits the architecture to proceed; it does not prove
the live Worker cutover, authorize Release B deployment, or establish
large-scale capacity. Every prerequisite in the canonical closure matrix must
close at its stated stage.

## Consequences

- Product deletion no longer deletes historical review ownership evidence.
- Same-slug products cannot inherit old reviews.
- Provider uncertainty hides slug-only badges instead of guessing.
- Missed product webhooks converge through bounded reconciliation.
- Reappearing ids require a future explicit evidence/operator process.
- The original Release A added one migration; the closure source adds two
  additive migrations and reuses QStash without a new scheduler, vendor, or
  environment variable.
- Cursor sweeps, changed-only persistence, transient observations, and bounded
  retention replace the measured unbounded discovery/write path.
- No direct SQL cleanup is authorized for lifecycle rows discovered outside an
  installation; recovery follows the source-owned erasure workflow.
- A successful source/DB verifier or local scale benchmark cannot substitute for
  live edge headers, QStash/provider delivery evidence, conflict operations,
  managed PostgreSQL measurements, or production convergence.

## Rollback

Rollback is code-only. Additive columns, run rows, and tombstones remain.
Neither rollback nor operator recovery deletes reviews or resolves conflicts by
direct SQL. Worker/widget rollback is independent from the application
deployment.

## References

- [Ikas webhook scopes](https://builders.ikas.com/docs/app-development/ikas-sdk/webhooks)
- [Shopify webhook reconciliation guidance](https://shopify.dev/docs/apps/build/webhooks)
- [Google product review feed identifiers](https://developers.google.com/product-review-feeds/schema/)
- [PostgreSQL HOT update requirements](https://www.postgresql.org/docs/current/storage-hot.html)
- [Supabase database size](https://supabase.com/docs/guides/platform/database-size)
- [Cloudflare Worker deployments](https://developers.cloudflare.com/workers/wrangler/commands/workers/#deployments)
- [Upstash QStash flow control](https://upstash.com/docs/qstash/features/flowcontrol)
- [[Product_Lifecycle_Scale_And_Retention_Audit_2026-08-03]]
