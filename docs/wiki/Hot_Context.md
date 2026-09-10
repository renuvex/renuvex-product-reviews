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
  - "[[Project_Overview]]"
  - "[[ADR_0021_Shadow_DOM_Isolation_Of_Review_Surfaces]]"
  - "[[ADR_0022_Placement_Allowlist_And_Lazy_Resync]]"
  - "[[ADR_0023_Widget_Lifecycle_Gating_Contract]]"
  - "[[ADR_0024_Badge_Review_Surface_Separation]]"
  - "[[ADR_0032_Review_Video_On_Mux]]"
  - "[[ADR_0033_Cloudflare_Worker_Widget_Asset_Delivery]]"
  - "[[ADR_0034_AWS_Review_Image_Migration]]"
  - "[[ADR_0035_QStash_Scheduler_For_Maintenance]]"
  - "[[ADR_0036_Review_Request_Email_Architecture]]"
  - "[[ADR_0037_Product_Lifecycle_Evidence_And_Tombstones]]"
  - "[[Product_Lifecycle_Scale_And_Retention_Audit_2026-08-03]]"
  - "[[ADR_0038_Runtime_Attested_Storefront_Placement]]"
  - "[[Badge_Product_ID_Closeout_Acceptance_2026-09-09]]"
  - "[[Theme_Adapter_Playbook]]"
  - "[[Test_Strategy]]"
source_files:
  - "package.json"
  - "prisma/schema.prisma"
  - "src/widget/loader.js"
  - "src/widget/reviews-section/bootstrap.js"
  - "src/app/api/public/reviews/route.ts"
  - "src/app/api/public/upload/sign/route.ts"
  - "src/lib/media/providers/aws-review-image.ts"
  - "workers/widget-delivery/src/index.ts"
  - "scripts/build-widget.mjs"
  - "src/lib/product-reconciliation.ts"
  - "src/app/api/public/ratings-by-slug/route.ts"
  - "src/widget/placement/capability.js"
  - "src/widget/listing-badges/ratings.js"
---

# Hot Context

## Current Focus
- ikas review/rating app: admin, storefront widget, badges, uploads, moderation, Mux video.

## Must Know
- Source wins; wiki routes.
- Prompt procedures live in `09_Prompts`; do not create `08_Prompts`.
- Never document secrets.
- `package.json` pins Next.js `16.2.1`; older Next.js 15 notes are stale.
- No deploy, migration apply, env write, provider write, or teardown without explicit stop/go approval.

## Recent Important Changes
- 2026-09-10: PR #39 merged/deployed the strict quick-view generation fix
  through main `81068849`, passing CI, Vercel, and approved Worker version
  `fcb63b3a-eeab-4c19-ad7f-5112b3c95f08`. PDP/category passed; real quick-view
  rendered the correct Product ID badge, then removed it while still open.
- 2026-09-10: Instrumentation kept identical modal/title nodes, saw the badge
  at `~460 ms`, and removal at `~14.48 s`: the 10-second discovery TTL wrongly
  continued after bind. Commit `0705f819` makes TTL pre-bind only. Placement
  `49/49`, five-browser `20/20`, unit `822/822`, build, and Worker dry-run pass;
  PR/rollout and Canary 1 remain open.
- 2026-09-09: Badge Product ID closeout PR #37 and CI runner recovery PR #38
  merged the Product ID-bearing API/runtime baseline. Slug remains only
  one-shot discovery; every visible badge requires Product ID.
- 2026-09-08: PR #35 strict Ozy runtime placement and PR #36 proof-scoped
  request dedupe are merged; live Ozy PDP/category/home placement was verified.
- 2026-08-09: Product-lifecycle closure PR #30 and all 64 migrations are
  deployed. Worker `A0-EDGE` acceptance now returns repeated
  `no-store/DYNAMIC/BYPASS`, and the manual QStash run completed 33/33 products
  with no retries, conflicts, unavailable rows, or unchanged snapshot writes.
  Production `expanded`, RLS/default-grants, and `ready` checks pass. Managed
  scale/provider quotas, live retry/retention/erasure evidence, conflict
  operations, delete/recreate smoke, and Release B remain gated.
- Review-email erasure/auth/OAuth fencing is documented in
  [[Maintenance_Runbook]] and [[Current_Status]]. Sending remains disabled.

## Current Risks / Open Questions
- Storefront is Turkish-first; future EN/DE needs real i18n, not only merchant copy.
- Keep post-deploy smoke after runtime widget changes.
- Worker V2 read origin: `widget.renuvex.app`; write/upload/video/lazy-sync origin: `app.renuvex.app`.
- Supabase RLS/default grants remain live-verified through all 64 migrations:
  every public table has RLS, grant/default-ACL drift is zero, and the unused
  hosted Data API is disabled.
- The 2026-08-09 Ikas `Storefront` schema removed active-theme fields. PR #35
  replaced that unavailable provider evidence with a strict runtime-attested
  Ozy adapter. Unknown or ambiguous themes remain fail-closed; explicit review
  mounts remain independent.
- The remaining badge closeout risk is the bound quick-view lifetime follow-up,
  not a return to slug identity. PR/CI, automatic backend verification, a
  separately approved replacement Worker rollout, a complete fresh
  desktop/mobile/search canary, one natural lifecycle reconciliation, a second
  canary, and Sentry alert verification remain open. The slug endpoint must
  remain `no-store/BYPASS`.
- Deferred: unsupported-theme UI, authenticated dashboard smoke, Sentry health.
- Review-email V5/V3.2 is deployed but disabled; backup/restore, journal,
  SES/DNS, product/legal, and live acceptance gates remain open.
- Product Lifecycle Release A, Worker no-store, one QStash completion, and the
  Production ready gate passed. Managed scale/quotas, sustained operations,
  conflict workflows, delete/recreate smoke, and Release B remain separate.
  Never direct-SQL-clean lifecycle rows.

## Read Next
- [[Current_Status]]
- [[Test_Strategy]]
- [[ADR_0036_Review_Request_Email_Architecture]]
- [[Product_Lifecycle_Scale_And_Retention_Audit_2026-08-03]]
