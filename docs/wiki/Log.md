---
type: log
project: renuvex-product-reviews
status: archived
created: 2026-05-13
updated: 2026-09-10
last_verified: 2026-09-10
confidence: high
tags:
  - history
  - project-memory
related:
  - "[[Index]]"
  - "[[Current_Status]]"
  - "[[Decision_Index]]"
  - "[[Bug_Index]]"
  - "[[Research_Index]]"
source_files:
  - "docs/wiki/01_Project/Current_Status.md"
  - "docs/wiki/04_Decisions/Decision_Index.md"
  - "docs/wiki/05_Bugs_And_Fixes/Bug_Index.md"
  - "docs/wiki/10_Research/Research_Index.md"
---

# Project History Router

## Agent Brief

This is a compact historical map, not a current-state source or an append-only
activity log. Use [[Current_Status]] for production truth, [[Roadmap]] for future
work, [[Decision_Index]] for architectural decisions, [[Bug_Index]] for failures
and fixes, and dated acceptance records under `10_Research` for rollout evidence.
Git history owns detailed chronology.

## Milestones

| Period | Durable outcome | Canonical records |
|---|---|---|
| May 2026 | Established the project wiki, split storefront responsibilities into loader/surfaces, standardized review layouts and accessibility, and adopted canonical product identity. | [[ADR_0013_Modular_Widget_Loader_Architecture]], [[ADR_0015_Canonical_Product_Identity]], [[Widget_Architecture]], [[Bug_Index]] |
| June 2026 | Hardened widget lifecycle and placement, introduced read models and cursor pagination, migrated review video to Mux, and separated stable loaders from immutable ESM runtime assets. | [[ADR_0022_Placement_Allowlist_And_Lazy_Resync]], [[ADR_0023_Widget_Lifecycle_Gating_Contract]], [[ADR_0026_Product_Review_Summary_Read_Model]], [[ADR_0032_Review_Video_On_Mux]] |
| July 2026 | Made Cloudflare Worker the storefront asset/read edge, moved review images to AWS, adopted QStash maintenance, and built the disabled review-request email foundation behind explicit rollout gates. | [[ADR_0033_Cloudflare_Worker_Widget_Asset_Delivery]], [[ADR_0034_AWS_Review_Image_Migration]], [[ADR_0035_QStash_Scheduler_For_Maintenance]], [[ADR_0036_Review_Request_Email_Architecture]] |
| August 2026 | Completed Product Lifecycle Release A evidence, reconciliation, tombstone, and installation-generation controls. Release B remained a separate scale/operations track. | [[ADR_0037_Product_Lifecycle_Evidence_And_Tombstones]], [[Product_Lifecycle_Scale_And_Retention_Audit_2026-08-03]], [[Current_Status]] |
| September 2026 | Closed the strict Ozy badge/Product ID implementation and first live canary. Product ID is canonical; slug is bounded discovery only. Natural reconciliation, Canary 2, and the owner-deferred Sentry alert mutation remain acceptance gates. | [[ADR_0038_Runtime_Attested_Storefront_Placement]], [[Badge_Product_ID_Closeout_Acceptance_2026-09-09]], [[Product_Rating_Badge]], [[Roadmap]] |

## Usage Rule

Do not add routine entries here. Record new durable facts in their owning
current-state, ADR, bug, runbook, or acceptance page. Add a milestone row only
when a project phase materially changes the map above.

## Obsidian Links

- [[Current_Status]]
- [[Roadmap]]
- [[Decision_Index]]
- [[Bug_Index]]
- [[Research_Index]]
