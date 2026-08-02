---
type: context
project: renuvex-product-reviews
status: active
created: 2026-05-13
updated: 2026-08-03
last_verified: 2026-08-03
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
- 2026-08-03: Product lifecycle Release A is source-only: tombstones, bounded
  reconciliation and safe slug resolution are implemented. Release B remains
  blocked by deploy-time expanded and readiness verification.
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
- 2026-07-23: Least-privilege review-email access hardening is live; approval
  windows are closed and temporary Administrator config is removed. See
  [[AWS_Setup_And_Access]].
- 2026-07-20: Current ikas consent, immutable delivery evidence, package-line
  grouping, and all four shipping methods are deployed but disabled; all 59
  migrations are applied and lifecycle rows remain zero.

## Current Risks / Open Questions
- Storefront is Turkish-first; future EN/DE needs real i18n, not only merchant copy.
- Keep post-deploy smoke after runtime widget changes.
- Worker V2 read origin: `widget.renuvex.app`; write/upload/video/lazy-sync origin: `app.renuvex.app`.
- Supabase RLS/default-grants closure was live-verified for the then-deployed
  migration set: every public table had RLS, the verifier reported zero
  grant/default-ACL drift, and the unused hosted Data API was disabled. Release
  A's new lifecycle table must independently pass the same expanded-schema gate
  after deployment; source validation is not live evidence.
- Theme adapters depend on `listStorefront.themes[].isMainTheme`; no ikas theme webhook exists.
- Deferred gaps: unsupported-theme warning UI, authenticated dashboard smoke, Sentry post-deploy health.
- Review-email V5/V3.2 backend is deployed but disabled. Activation still needs
  a managed Supabase backup plus verified restore window, journal gates, SES
  sender/DNS/sandbox evidence, product/legal gates, and live acceptance. Signed
  app-deleted delivery and safe stale-run closure are proven; journal
  activation is not.
- Product lifecycle Release A still needs CI, additive migration/backend deploy,
  `verify:product-lifecycle --expect=expanded`, bounded reconciliation convergence,
  and `--expect=ready`. Public/media/email/admin consumer enforcement in Release
  B must not deploy before that readiness gate passes.

## Read Next
- [[Current_Status]]
- [[Test_Strategy]]
- [[ADR_0036_Review_Request_Email_Architecture]]
