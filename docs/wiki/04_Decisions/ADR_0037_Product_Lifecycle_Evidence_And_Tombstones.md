---
type: decision
project: renuvex-product-reviews
status: active
created: 2026-08-03
updated: 2026-08-08
last_verified: 2026-08-08
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
  - "src/app/api/internal/product-reconciliation/route.ts"
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

Release A's database/backend is merged, deployed, and ready for the current
active installation. End-to-end storefront rollout remains open because the
live Worker still caches `ratings-by-slug`; current source already bypasses
that cache but has not been deployed. Release B consumer enforcement is not
implemented or deployed. Readiness proves current convergence, not 5,000- or
100,000-store capacity. Follow the canonical closure matrix in
[[Product_Lifecycle_Scale_And_Retention_Audit_2026-08-03]].

## Status

Accepted architecture; rollout closure remains conditional. Release A's
database/backend was merged and deployed at commit
`6e6414989b45dd443058e252948585a34f30ed2e`; the additive 62nd migration,
`--expect=expanded`, bounded reconciliation, and `--expect=ready` all passed on
2026-08-03 for one active installation. A 2026-08-08 read-only edge check still
observed a Worker `MISS` followed by `HIT` for `ratings-by-slug`, and the newest
serving Worker deployment predates the merge. Release B is intentionally
separate and remains unimplemented. The open gates do not invalidate the
evidence model; they prevent claiming full live cutover or scale readiness.

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
- `unavailable_verified`: a complete scan plus exact lookup, or an exact
  webhook-triggered lookup, confirmed absence/deletion;
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

Daily maintenance creates or resumes one bounded `ProductReconciliationRun` per
active installation. A signed QStash continuation accepts only an opaque run id.
Each invocation performs at most one 200-item catalog page or one 50-id exact
verification batch. Missing `hasNext`, malformed pagination, provider failure,
or partial scans retry without producing unavailable evidence.

After the final scan page, references missing from an older hard-delete are
reconstructed as `unknown` from review, summary, request, pending image, and
video session product ids. Only candidates not seen in the complete scan are
verified exactly. Installation generation changes atomically close older runs
as `stale_ignored`.

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

The 2026-08-03 read-only audit found four limits outside the original Release A
acceptance gate:

- store erasure does not yet delete `ProductSnapshot` or
  `ProductReconciliationRun`; 31 unreferenced unknown rows remained for a store
  with no installation;
- completed daily reconciliation runs have no bounded retention policy;
- active-installation discovery pages through every store in one maintenance
  invocation even though each individual continuation is bounded;
- active verification executes one row write per product and changes indexed
  evidence fields.

These findings do not invalidate canonical identity or tombstones. They make the
current orchestration/write path NO-GO for a 5,000- or 100,000-store capacity
claim. See [[Product_Lifecycle_Scale_And_Retention_Audit_2026-08-03]] for the
measured footprint, projections, and closure matrix.

The independent audit also made the rollout sequence explicit:

- deploy and prove the current Worker no-store behavior;
- make manual sync return `202` only after QStash publish succeeds;
- put Worker dry-run and unit checks in a required Worker-change CI gate;
- add lifecycle-table erasure and bounded terminal-run retention;
- before Release B, close provider-absence consistency, whole-scan integrity,
  delayed retry, conflict operations, and every consumer/media/email/admin
  lifecycle gate;
- before 5,000 stores, persist global discovery progress, add backpressure,
  reduce measured write amplification, and load-test under provider quotas.

These are closure gates, not permission to add a new scheduler, cache, database,
or provider without separate evidence.

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
- Release A adds one migration and QStash work, but no new scheduler, vendor, or
  environment variable.
- The current small footprint is accepted, but daily run retention and
  per-product updates must not be treated as an unbounded production design.
- No direct SQL cleanup is authorized for lifecycle rows discovered outside an
  installation; recovery follows the source-owned erasure workflow.
- A successful source/DB verifier cannot substitute for live edge headers,
  QStash delivery evidence, conflict operations, or scale measurements.

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
