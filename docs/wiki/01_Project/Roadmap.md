---
type: roadmap
project: renuvex-product-reviews
status: draft
created: 2026-05-05
updated: 2026-09-10
last_verified: 2026-09-10
confidence: medium
tags:
  - roadmap
related:
  - "[[Index]]"
  - "[[Current_Status]]"
  - "[[Future_Feature_Ideas]]"
  - "[[Competitor_Pricing_And_Plans]]"
  - "[[ADR_0032_Review_Video_On_Mux]]"
  - "[[Review_Video_Canary_Runbook]]"
source_files:
  - "src/lib/widgets/catalog.ts"
  - "src/widget/structured-data/index.js"
  - "src/lib/review-email/config.ts"
  - "src/lib/product-lifecycle.ts"
  - "scripts/build-widget.mjs"
---

# Roadmap

## Agent Brief

This page contains planned work, not current-state history. Items have no
committed date unless a separate release plan says otherwise. Use
[[Current_Status]] for live state, [[Open_Questions]] for unresolved product or
architecture choices, and [[Future_Feature_Ideas]] for uncommitted ideas.

## Priority 0 - Release Acceptance

- Complete the Badge Product ID closeout after one natural Product Lifecycle
  reconciliation: verify identity health, repeat Canary 2, and update the
  acceptance record. Badge-specific Sentry alert creation and controlled
  delivery remain owner-deferred and require fresh approval.
- Run authenticated ikas dashboard smoke and Sentry post-deploy health checks
  after the next meaningful admin or runtime deployment.
- Validate the existing Product `aggregateRating` JSON-LD on a public PDP with
  approved reviews. The client-side surface already exists; decide on a
  server/native alternative only if measured search-engine behavior requires it.

## Priority 1 - Product Work

- Activate review-request email only through the gates in
  [[ADR_0036_Review_Request_Email_Architecture]]. The backend and schema already
  exist but are disabled. Sender infrastructure, review-domain DNS, legal/IYS
  acceptance, merchant controls, journal readiness, and live delivery evidence
  remain separate work.
- Build a real widget localization layer covering visible copy, formatting, and
  accessible names. Decide locale ownership with the multi-storefront model
  before changing the settings schema.
- Decide the Q&A product scope before adding tables or public endpoints.
- Add CSV review import/export with validation, tenant isolation, and an audit
  trail.
- Add a minimal admin analytics view for review volume, rating trend, and
  merchant response rate. Conversion claims require separate storefront
  analytics evidence.

## Platform And Scale

- Close managed PostgreSQL/provider-capacity, sustained backlog, erasure,
  retention, and identity-conflict operations before any large-scale readiness
  claim or Product Lifecycle Release B rollout.
- Expand automatic placement beyond Ozy only through the bounded adapter
  acceptance in [[Theme_Adapter_Playbook]]. Add an unsupported-theme admin
  warning without weakening fail-closed storefront behavior.
- Decide whether `WidgetSettings` remains merchant-wide or becomes storefront
  and locale aware.

## Deferred Or Trigger-Based

- Carousel and popup remain catalog-only planned scaffolds until their product
  behavior and placement contracts are approved.
- Merchant notification email for new pending reviews is separate from shopper
  review-request email.
- Decide whether historical `Review.productName` remains an immutable submit
  snapshot or follows current Ikas product names. Product Lifecycle already
  synchronizes identity snapshots; it must not rewrite review ownership.
- Add a dry-run Mux asset ownership reconciliation report only when operations
  need recurring orphan/stuck-session evidence. QStash or a manual backend job
  is the scheduler boundary; the public Worker stays secret-free.
- Add S3 Inventory/S3 Metadata as an audit layer only when image scale justifies
  it. Keep current AWS metadata and variants out of the storefront hot path.
- Move profanity policy to merchant/config storage and add a per-merchant
  anonymous-Origin allowlist only when product or abuse evidence justifies them.
- Image moderation, loyalty, verified-buyer, and AI summary ideas remain in
  [[Future_Feature_Ideas]] until selected.

## Tooling Debt

- Remove or implement the stale `--theme=new-theme` build scaffold; there is no
  matching runtime-selection contract or `themes/new-theme` implementation.
- Verify whether `pnpm apply:ai-rules` still has an owner. The script exists,
  `.ruler` does not, and tracked `CLAUDE.md` declares `AGENTS.md` as its source.

## Completed, Not Roadmap

The structured-data runtime, review lightbox/lazy media behavior, normalized
`ReviewMedia` model, and broad `/api/public/reviews` tests already exist. Their
remaining acceptance or maintenance work is tracked above or in their canonical
pages; do not re-add them as unimplemented features.

## Obsidian Links

- [[Current_Status]]
- [[Open_Questions]]
- [[Future_Feature_Ideas]]
- [[Competitor_Pricing_And_Plans]]
- [[Structured_Data_And_Rich_Snippets]]
- [[ADR_0037_Product_Lifecycle_Evidence_And_Tombstones]]
