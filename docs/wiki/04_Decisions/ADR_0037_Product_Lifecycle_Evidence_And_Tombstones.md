---
type: decision
project: renuvex-product-reviews
status: active
created: 2026-08-03
updated: 2026-08-03
last_verified: 2026-08-03
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
tombstone, not a hard delete. A tombstoned id that later reappears becomes an
operator-visible identity conflict and is never reactivated automatically.

Release A is implemented in source but is not live merely because this ADR or
the migration exists. Release B consumer enforcement must not be deployed until
the live read-only verifier passes `--expect=ready`.

## Status

Accepted. Release A source implementation is pending CI, merge, deployment,
reconciliation convergence, and live verification. Release B is intentionally
not part of Release A and remains blocked by the ready gate.

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

The endpoint and Cloudflare pass-through are `no-store`. The widget stores only
exact-id rating results in its five-minute session cache. Worker and widget
deployment remain separate approved mutations; source changes do not alter the
currently deployed runtime.

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

## Consequences

- Product deletion no longer deletes historical review ownership evidence.
- Same-slug products cannot inherit old reviews.
- Provider uncertainty hides slug-only badges instead of guessing.
- Missed product webhooks converge through bounded reconciliation.
- Reappearing ids require a future explicit evidence/operator process.
- Release A adds one migration and QStash work, but no new scheduler, vendor, or
  environment variable.

## Rollback

Rollback is code-only. Additive columns, run rows, and tombstones remain.
Neither rollback nor operator recovery deletes reviews or resolves conflicts by
direct SQL. Worker/widget rollback is independent from the application
deployment.

## References

- [Ikas webhook scopes](https://builders.ikas.com/docs/app-development/ikas-sdk/webhooks)
- [Shopify webhook reconciliation guidance](https://shopify.dev/docs/apps/build/webhooks)
- [Google product review feed identifiers](https://developers.google.com/product-review-feeds/schema/)
