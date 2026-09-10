---
type: status
project: renuvex-product-reviews
status: active
created: 2026-05-05
updated: 2026-09-10
last_verified: 2026-09-10
confidence: high
source_files:
  - "public/widget-runtime/build-manifest.json"
  - "src/widget/placement/capability.js"
  - "src/app/api/public/ratings-by-slug/route.ts"
  - "src/lib/product-lifecycle.ts"
  - "src/lib/review-email/config.ts"
  - "src/lib/scheduled-jobs.ts"
  - "workers/widget-delivery/src/index.ts"
tags:
  - status
related:
  - "[[Index]]"
  - "[[Project_Overview]]"
  - "[[Roadmap]]"
  - "[[Open_Questions]]"
  - "[[ADR_0037_Product_Lifecycle_Evidence_And_Tombstones]]"
  - "[[ADR_0038_Runtime_Attested_Storefront_Placement]]"
  - "[[Badge_Product_ID_Closeout_Acceptance_2026-09-09]]"
  - "[[Product_Lifecycle_Scale_And_Retention_Audit_2026-08-03]]"
  - "[[Sentry_Operations]]"
---

# Current Status - Renuvex Product Reviews

## Agent Brief

Use this page for a fast project-state snapshot. Verify implementation details
in the listed source files and follow the linked ADR, operations, and acceptance
pages for evidence. The application is still pre-public-launch, but its core
review, moderation, AWS image, Mux video, storefront widget, Cloudflare Worker,
QStash, and Product Lifecycle Release A paths are deployed.

Storefront placement uses canonical `(storeId, productId)` identity. Slug is
allowed only as a one-time discovery input when an Ikas listing event lacks a
Product ID; it is not a review query key, cache key, or visible badge identity.
Strict Ozy placement and the quick-view lifetime fix passed the first production
canary. Badge closeout is still open until one natural lifecycle reconciliation,
a second canary, and the separately approved Sentry alert-delivery test pass.

Do not infer production migration counts from the repository. Do not describe
review-request email as live: its backend and schema are deployed but globally
disabled, and no production sender or outbound acceptance exists.

## Current Phase

Active production-store validation before public launch. Most remaining work is
acceptance, operations, security, localization, theme coverage, and product
scope rather than foundational review-widget implementation.

## Production Snapshot

| Area | State | Current truth |
|---|---|---|
| Reviews and moderation | Live | Public submission/read, validation, rate limits, approval modes, merchant replies, deletion, and author masking are implemented. |
| Review images | Live | New image uploads use private AWS S3 intake, processed variants, authenticated moderation previews, and trusted CloudFront storefront delivery. |
| Review video | Live | Mux upload, readiness, moderation, signed admin preview, public playback, reconciliation, and cleanup paths are implemented. |
| Storefront runtime | Live | The stable loader resolves the content-hashed runtime manifest; PDP reviews, rating badges, media, SPA recovery, lazy listing hydration, and accessibility behavior are active. |
| Product ID badge placement | Live; closeout open | PDP, listing, search, homepage, slider, and quick-view badges use Product ID-backed proofs. Strict Ozy placement and Canary 1 passed; final gates remain below. |
| Product Lifecycle Release A | Live | Snapshot evidence, reconciliation, tombstones, retention, installation fencing, and fail-closed identity resolution are deployed. Release B consumer enforcement and managed-scale claims remain separate work. |
| Edge delivery and scheduling | Live | Cloudflare Worker serves widget assets and endpoint-specific read caching. `ratings-by-slug` bypasses cache with `no-store`. QStash drives signed maintenance; there is no Vercel Cron dependency. |
| Sentry | Live; badge alerts pending | Panel and bounded widget-error ingestion are active. Product ID/placement event contracts exist, but external alert rules and controlled delivery verification were owner-deferred. |
| Structured data | Implemented; validation pending | The runtime can emit Product `aggregateRating` JSON-LD for eligible visible review/rating surfaces. Public-search validation and the longer-term server/client ownership decision remain open. |
| Review-request email | Disabled | The backend and schema are deployed behind `REVIEW_EMAIL_ENABLED`. Sender infrastructure, merchant UI, domain/DNS, journal rollout, and live outbound acceptance do not exist yet. |
| Theme and localization coverage | Partial | Automatic placement is verified only for the Ozy adapter and fails closed elsewhere. Storefront copy remains Turkish-first; a complete locale layer is not implemented. |

## Open Acceptance Gates

### Badge Product ID closeout

The implementation and first production canary are complete. Closure requires
all of the following:

1. One natural daily Product Lifecycle reconciliation completes without
   identity drift or conflict.
2. The same fresh desktop/mobile PDP, category, homepage, search, slider, and
   quick-view canary passes again.
3. Sentry sends the approved `identity-conflict` first-event alert and the
   combined placement/resolution threshold alert to the maintainer.

The third item is an external Sentry mutation and controlled production-event
test. It requires fresh explicit approval before execution. Until all three
items pass, describe the runtime as deployed and Canary 1 accepted, not as fully
production-closed. Exact hashes, deployments, test observations, and rollback
boundaries live in [[Badge_Product_ID_Closeout_Acceptance_2026-09-09]].

### Product Lifecycle expansion

Release A supports the current identity resolver. Managed PostgreSQL/provider
quota evidence, controlled identity-conflict operations, delete/recreate
acceptance, and Release B consumers remain gated. Do not claim 5,000-store
production readiness from local benchmark evidence. See
[[Product_Lifecycle_Scale_And_Retention_Audit_2026-08-03]].

### Public-launch readiness

Authenticated dashboard smoke and Sentry post-deploy health checks should run
after meaningful admin/runtime deployments. Structured-data SEO needs public
PDP validation. Real i18n, additional verified theme adapters, and remaining
product-polish decisions are tracked in [[Roadmap]] and [[Open_Questions]].

Review-request email activation is a separate release program, not a remaining
step in the badge or Product Lifecycle Release A closeout.

## Immediate Next Actions

1. Observe the next natural Product Lifecycle run using read-only evidence and
   verify that identity drift/conflict remains zero.
2. Repeat the documented Badge Product ID production canary in fresh desktop and
   mobile sessions.
3. After fresh owner approval, create and test the two Sentry badge alert paths;
   otherwise keep this gate explicitly deferred.
4. Run authenticated dashboard smoke and post-deploy Sentry health after the
   next meaningful application deployment.
5. Validate emitted structured data on a public PDP, then resolve the remaining
   product-scope decisions in [[Open_Questions]] before starting new surfaces or
   Release B.

## Canonical Detail

- Badge identity, placement, rollout evidence, and rollback:
  [[Badge_Product_ID_Closeout_Acceptance_2026-09-09]]
- Product lifecycle readiness, scale limits, and Release B gates:
  [[Product_Lifecycle_Scale_And_Retention_Audit_2026-08-03]]
- Current Sentry configuration and deferred alert operation:
  [[Sentry_Operations]]
- Product scope and ordering: [[Roadmap]] and [[Feature_Map]]
- Stable architecture and operational routing: [[Index]]
