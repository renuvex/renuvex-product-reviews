---
type: context
project: renuvex-product-reviews
status: active
created: 2026-05-13
updated: 2026-07-08
last_verified: 2026-07-08
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
  - "[[Theme_Adapter_Playbook]]"
  - "[[Test_Strategy]]"
source_files:
  - "package.json"
  - "prisma/schema.prisma"
  - "src/widget/loader.js"
  - "src/widget/reviews-section/bootstrap.js"
  - "src/widget/reviews-section/render/media-gallery.js"
  - "src/app/api/public/reviews/route.ts"
  - "src/app/api/public/upload/sign/route.ts"
  - "src/app/api/public/upload/register/route.ts"
  - "src/app/api/internal/scheduled-jobs/route.ts"
  - "src/lib/scheduled-jobs.ts"
  - "src/lib/media/providers/aws-review-image.ts"
  - "src/lib/media/jobs.ts"
  - "src/lib/media/lifecycle.ts"
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
- 2026-07-04: Wiki low-token routing is active: hot-path pages stay short; long critical pages use `## Agent Brief`.
- 2026-07-04: QStash maintenance scheduler is active; health gate is delivery logs/DLQ plus `ScheduledJobRunLock`, not `nextScheduleTime`.
- 2026-07-04: AWS review images are production path: `media.renuvex.app/reviews/...`, immutable public variants, private signed admin previews, public-only orphan scan.
- 2026-07-04: Cloudinary code/env/runtime cleanup is complete; old provider assets are out of app scope.
- 2026-07-04: AWS public-scale guardrails are documented; add minimal CloudFront alarms/logs before public launch. See [[AWS_Setup_And_Access]].
- 2026-07-08: CloudFront standard logging v2 bucket/delivery stacks are created and first S3 log object was delivered; final cleanup is a bucket stack update so lifecycle targets AWS's effective `AWSLogs/{account-id}/CloudFront/cloudfront/media/` prefix while preserving CloudWatch Logs' `AWSLogs/{account-id}/CloudFront/*` write policy. See [[AWS_Setup_And_Access]].
- 2026-07-02: Cloudflare Worker remains widget asset/read-cache delivery; AWS widget CDN canary is closed.
- 2026-06-21/23: Mux video upload/playback/cleanup is live; Mux Data tracking/cookies stay disabled. See [[ADR_0032_Review_Video_On_Mux]].

## Current Risks / Open Questions
- Storefront is Turkish-first; future EN/DE needs real i18n, not only merchant copy.
- Keep post-deploy smoke after runtime widget changes.
- Worker V2 read origin: `widget.renuvex.app`; write/upload/video/lazy-sync origin: `app.renuvex.app`.
- Supabase RLS/default-grants hardening is a public-launch blocker.
- Theme adapters depend on `listStorefront.themes[].isMainTheme`; no ikas theme webhook exists.
- Deferred gaps: unsupported-theme warning UI, authenticated dashboard smoke, Sentry post-deploy health.

## Read Next
- [[Current_Status]]
- [[Test_Strategy]]
- [[ADR_0033_Cloudflare_Worker_Widget_Asset_Delivery]]
- [[ADR_0032_Review_Video_On_Mux]]
- [[Storefront_CDN_Performance_Benchmark]]
