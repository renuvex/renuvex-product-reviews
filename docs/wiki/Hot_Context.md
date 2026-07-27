---
type: context
project: renuvex-product-reviews
status: active
created: 2026-05-13
updated: 2026-07-28
last_verified: 2026-07-28
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
  - "src/app/api/internal/email-events/ses/route.ts"
  - "infra/aws/review-email-deployment-access.cloudformation.json"
  - "infra/aws/review-email-foundation.cloudformation.json"
  - "config/review-email-copy-register.json"
  - "scripts/calculate-review-email-journal-retention.mjs"
  - "scripts/verify-review-email-foundation-live.mjs"
  - "src/lib/media/providers/aws-review-image.ts"
  - "workers/widget-delivery/src/index.ts"
  - "scripts/build-widget.mjs"
  - "config/widget-performance-budget.json"
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
- 2026-07-28: OAuth state is mandatory, browser-bound, Redis-backed for ten
  minutes, and atomically consumed. Redis failure is fail-closed; signature and
  PKCE remain separate provider decisions.
- 2026-07-28: Supabase CLI and Dashboard confirm Free plan, no managed backup,
  and PITR off. Journal rollout remains blocked: upgrade to Pro, observe the
  first backup, verify its live window, then update the copy register and rerun
  preflight. The expected `7` days is not yet verified.
- 2026-07-24: Foundation is `CREATE_COMPLETE` with nine resources, effective
  stack policy, and termination protection. Full `deployed-pending-dns`
  verification passes; sending and sandbox gates remain closed, DNS is pending,
  and sender/subscription/tenant surfaces are absent.
- 2026-07-23: Least-privilege review-email access hardening is live; approval
  windows are closed and temporary Administrator config is removed. See
  [[AWS_Setup_And_Access]].
- 2026-07-20: Current ikas consent, immutable delivery evidence, package-line
  grouping, and all four shipping methods are deployed but disabled; all 59
  migrations are applied and lifecycle rows remain zero.
- 2026-07-15: Disabled review-email Multi-Product Batch / Envelope V3.2 source
  adds one initial and at most one reminder per delivery group, independent
  product requests, guarded attempts/events, review-center access, and
  V5-compatible DSR/retention. Live rollout remains gated. See
  [[ADR_0036_Review_Request_Email_Architecture]].
- 2026-07-04: Wiki low-token routing is active: hot-path pages stay short; long critical pages use `## Agent Brief`.
- 2026-07-04: QStash maintenance scheduler is active; health gate is delivery logs/DLQ plus `ScheduledJobRunLock`, not `nextScheduleTime`.
- 2026-07-04: AWS review images are production path: `media.renuvex.app/reviews/...`, immutable public variants, private signed admin previews, public-only orphan scan.
- 2026-07-08: CloudFront standard logging v2 is deployed for `media.renuvex.app`; logs deliver to the EU log bucket under `AWSLogs/989086371563/CloudFront/cloudfront/media/` with 14-day lifecycle and no query/cookie fields. See [[AWS_Setup_And_Access]].
- 2026-07-02: Cloudflare Worker remains widget asset/read-cache delivery; AWS widget CDN canary is closed.
- 2026-06-21/23: Mux video upload/playback/cleanup is live; Mux Data tracking/cookies stay disabled. See [[ADR_0032_Review_Video_On_Mux]].

## Current Risks / Open Questions
- Storefront is Turkish-first; future EN/DE needs real i18n, not only merchant copy.
- Keep post-deploy smoke after runtime widget changes.
- Worker V2 read origin: `widget.renuvex.app`; write/upload/video/lazy-sync origin: `app.renuvex.app`.
- Supabase RLS/default-grants hardening is a public-launch blocker.
- Theme adapters depend on `listStorefront.themes[].isMainTheme`; no ikas theme webhook exists.
- Deferred gaps: unsupported-theme warning UI, authenticated dashboard smoke, Sentry post-deploy health.
- Review-email V5/V3.2 backend is deployed but disabled. Activation still needs
  a managed Supabase backup plus verified restore window, app-deleted checks,
  journal gates, SES sender/DNS/sandbox evidence, merchant UI, legal review,
  media controls, and live acceptance. Supabase Pro upgrade is pending; it is
  not yet applied or verified.

## Read Next
- [[Current_Status]]
- [[Test_Strategy]]
- [[ADR_0033_Cloudflare_Worker_Widget_Asset_Delivery]]
- [[ADR_0032_Review_Video_On_Mux]]
- [[Storefront_CDN_Performance_Benchmark]]
