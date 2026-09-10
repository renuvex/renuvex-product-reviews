---
type: context
project: renuvex-product-reviews
status: active
created: 2026-05-13
updated: 2026-09-10
last_verified: 2026-09-10
confidence: high
tags:
  - hot-context
  - project-memory
related:
  - "[[Index]]"
  - "[[Current_Status]]"
  - "[[ADR_0037_Product_Lifecycle_Evidence_And_Tombstones]]"
  - "[[ADR_0038_Runtime_Attested_Storefront_Placement]]"
  - "[[Badge_Product_ID_Closeout_Acceptance_2026-09-09]]"
  - "[[Test_Strategy]]"
source_files:
  - "package.json"
  - "src/lib/product-reconciliation.ts"
  - "src/app/api/public/ratings-by-slug/route.ts"
  - "src/widget/placement/capability.js"
  - "public/widget-runtime/build-manifest.json"
---

# Hot Context

## Current Focus
- Production ikas review app: admin, storefront reviews, Product ID badges,
  AWS images, Mux video, moderation, and lifecycle maintenance.

## Must Know
- Source wins; wiki routes.
- `(storeId, productId)` is review and visible badge identity. Slug is one-shot
  discovery only when an Ikas listing event lacks Product ID.
- Ozy is the only runtime-attested automatic placement adapter. Unknown or
  ambiguous themes fail closed; explicit review mounts stay independent.
- Never document secrets.
- No deploy, migration apply, env write, provider write, or teardown without explicit stop/go approval.

## Recent Important Changes
- Strict Ozy placement, Product ID propagation, proof-scoped dedupe, and the
  quick-view lifetime fix are deployed. The first desktop/mobile production
  canary passed; exact rollout evidence lives in the dated acceptance record.
- Product Lifecycle Release A is live. Release B and managed-scale claims remain
  separately gated.
- Cloudflare serves widget assets and allowlisted reads, QStash schedules
  maintenance, AWS owns review images, and Mux owns review video.

## Current Risks / Open Questions
- Badge closeout still needs one natural lifecycle reconciliation and Canary 2.
  Sentry badge alert creation/delivery was owner-deferred and needs fresh
  approval.
- Review-request email is deployed but disabled; infrastructure, product/legal,
  and live-delivery gates remain open.
- Public structured-data validation, unsupported-theme UX, authenticated admin
  smoke, broader adapter coverage, and real localization remain open.
- Never direct-SQL-clean lifecycle rows or infer production state from repository
  migration count.

## Read Next
- [[Current_Status]]
- [[Test_Strategy]]
- [[ADR_0038_Runtime_Attested_Storefront_Placement]]
- [[Badge_Product_ID_Closeout_Acceptance_2026-09-09]]
