---
type: context
project: renuvex-product-reviews
status: active
created: 2026-05-13
updated: 2026-08-09
last_verified: 2026-08-09
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
  - "[[Theme_Adapter_Playbook]]"
  - "[[Test_Strategy]]"
source_files:
  - "package.json"
  - "prisma/schema.prisma"
  - "src/widget/loader.js"
  - "src/widget/reviews-section/bootstrap.js"
  - "src/app/api/public/reviews/route.ts"
  - "src/app/api/public/upload/sign/route.ts"
  - "src/lib/review-email/eligibility.ts"
  - "src/lib/review-email/settings.ts"
  - "src/lib/review-email/ikas-orders.ts"
  - "src/lib/review-email/ikas-send-preflight.ts"
  - "src/lib/review-email/erasure.ts"
  - "src/lib/review-email/erasure-dispatcher.ts"
  - "src/app/api/internal/review-email/store-erasure/route.ts"
  - "src/app/api/internal/email-events/ses/route.ts"
  - "infra/aws/review-email-foundation.cloudformation.json"
  - "config/review-email-copy-register.json"
  - "src/lib/media/providers/aws-review-image.ts"
  - "workers/widget-delivery/src/index.ts"
  - "scripts/build-widget.mjs"
  - "src/lib/product-reconciliation.ts"
---

# Hot Context

## Current Focus
- ikas review/rating app: admin, storefront widget, badges, uploads, moderation, Mux video.

## Must Know
- Source/config/tests/runtime win; wiki routes.
- Prompt procedures live in `09_Prompts`; do not create `08_Prompts`.
- Never document secrets.
- `package.json` pins Next.js `16.2.1`; older Next.js 15 notes are stale unless re-verified.
- No deploy, migration apply, env write, provider write, or teardown without explicit stop/go approval.

## Recent Important Changes
- 2026-08-09: Product-lifecycle closure PR #30 and all 64 migrations are
  deployed. Two-slot absence, bounded sweeps, changed-only snapshots, transient
  observations, 42-day retention, lifecycle erasure, and QStash flow control
  are live. PostgreSQL 16/17 and the local 5,000 x 500 benchmark pass.
  Production `expanded` and RLS/default-grants checks pass; `ready` awaits fresh
  coverage for one active installation. Worker, convergence, managed scale,
  conflict operations, and Release B remain gated.
- 2026-07-28: Store erasure retries are installation-fenced; the stale live run
  closed without deleting current review/media data. See [[Maintenance_Runbook]].
- 2026-07-28: Strict JWT admin auth requires the exact active installation/token
  pair and final writes repeat the generation fence.
- 2026-07-28: OAuth state is browser-bound, single-use and fail-closed; the
  bounded dashboard compatibility restart never exchanges an unbound code.
- 2026-07-28: Supabase CLI and Dashboard confirm Free plan, no managed backup,
  and PITR off. Journal rollout remains blocked: upgrade to Pro, observe the
  first backup, verify its live window, then update the copy register and rerun
  preflight. The expected `7` days is not yet verified.
- 2026-07-24: Foundation is `CREATE_COMPLETE` with nine resources, effective
  stack policy, and termination protection. Full `foundation-no-dns`
  verification passes; sending and sandbox gates remain closed, DNS is pending,
  and sender/subscription/tenant surfaces are absent.

## Current Risks / Open Questions
- Storefront is Turkish-first; future EN/DE needs real i18n, not only merchant copy.
- Keep post-deploy smoke after runtime widget changes.
- Worker V2 read origin: `widget.renuvex.app`; write/upload/video/lazy-sync origin: `app.renuvex.app`.
- Supabase RLS/default grants remain live-verified through all 64 migrations:
  every public table has RLS, grant/default-ACL drift is zero, and the unused
  hosted Data API is disabled.
- The 2026-08-09 ikas v1/v2 `Storefront` schema removed the theme fields.
  Script management uses `id/name`; automatic placement is fail-closed, legacy
  evidence is unverifiable, and explicit review mounts remain available.
- Deferred gaps: unsupported-theme warning UI, authenticated dashboard smoke, Sentry post-deploy health.
- Review-email V5/V3.2 backend is deployed but disabled. Activation still needs
  a managed Supabase backup plus verified restore window, journal gates, SES
  sender/DNS/sandbox evidence, product/legal gates, and live acceptance. Signed
  app-deleted delivery and safe stale-run closure are proven; journal
  activation is not.
- Product lifecycle closure source now includes truthful dispatch, bounded
  discovery, changed-only snapshots, evidence/scan/retry hardening, lifecycle
  erasure, retention, and initial flow control. It has local/disposable evidence
  only. Never direct-SQL-clean lifecycle rows or call it live: PR CI, production
  migrations, Worker no-store, QStash convergence/readiness, managed 5K/provider
  quotas, conflict operations, dev-store smoke, and Release B are still open.
  No 100,000-store capacity claim exists. See
  [[Product_Lifecycle_Scale_And_Retention_Audit_2026-08-03]].

## Read Next
- [[Current_Status]]
- [[Test_Strategy]]
- [[ADR_0036_Review_Request_Email_Architecture]]
- [[Product_Lifecycle_Scale_And_Retention_Audit_2026-08-03]]
