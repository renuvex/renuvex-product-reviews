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
- 2026-09-10: PR #40 merged as main `559a7d4b`; PR/main CI and Vercel
  `dpl_gm1mn5TsUdvmJyvHitv3gnhoEuYh` passed. Approved Worker version
  `b7e942eb-c638-422f-8e8b-51afffaba4ba` serves `runtime-NTBNXPCD.js` at 100%.
- 2026-09-10: Canary 1 passed desktop and measured `412x915` PDP, category,
  homepage, search, and quick-view. Product IDs matched; the modal survived 94
  seconds desktop and the former TTL plus internal interaction on mobile;
  requests were bulk and no Renuvex widget error occurred.
- 2026-09-09/10: PR #35-#39 established strict Ozy placement, proof-scoped
  dedupe, Product ID propagation, deterministic CI, and same-ID generation
  continuity. Slug remains one-shot discovery only.
- 2026-08-09: Product Lifecycle Release A, 64 migrations, Worker
  `no-store/BYPASS`, one 33/33 QStash reconciliation, and Production readiness
  passed. Managed scale, conflict operations, and Release B remain separate.
- Review-email V5/V3.2 is deployed but disabled; see [[Current_Status]].

## Current Risks / Open Questions
- Storefront is Turkish-first; future EN/DE needs real i18n, not only merchant copy.
- Keep post-deploy smoke after runtime widget changes.
- Worker V2 read origin: `widget.renuvex.app`; write/upload/video/lazy-sync origin: `app.renuvex.app`.
- Supabase RLS/default grants pass through all 64 migrations; hosted Data API
  is disabled.
- The 2026-08-09 Ikas `Storefront` schema removed active-theme fields. PR #35
  uses strict runtime-attested Ozy instead. Unknown/ambiguous themes fail closed.
- The bound quick-view lifetime bug is resolved and Canary 1 passed. Badge
  Product ID closeout still requires one post-canary natural lifecycle
  reconciliation, Canary 2, and approved Sentry alert delivery verification.
  Slug discovery must stay `no-store/BYPASS`.
- Deferred: unsupported-theme UI, authenticated dashboard smoke, Sentry health.
- Review-email backup/journal, SES/DNS, product/legal, and acceptance remain open.
- Never direct-SQL-clean lifecycle rows; Release B is separately gated.

## Read Next
- [[Current_Status]]
- [[Test_Strategy]]
- [[ADR_0036_Review_Request_Email_Architecture]]
- [[Product_Lifecycle_Scale_And_Retention_Audit_2026-08-03]]
