---
type: research
project: renuvex-product-reviews
status: active
created: 2026-06-09
updated: 2026-07-03
last_verified: 2026-07-03
confidence: medium
tags:
  - research
  - media
  - aws
  - moderation
  - scale
  - deferred
related:
  - "[[ADR_0029_Review_Media_Metadata]]"
  - "[[ADR_0032_Review_Video_On_Mux]]"
  - "[[Competitor_Pricing_And_Plans]]"
  - "[[Roadmap]]"
  - "[[Open_Questions]]"
  - "[[Future_Feature_Ideas]]"
source_files:
  - "src/lib/media/jobs.ts"
  - "src/app/api/public/upload/register/route.ts"
  - "prisma/schema.prisma"
---

# Async Media Pipeline - Analysis & Deferral

## Status
Deferred - analysis only, no accepted build decision yet. When the project decides to build a general queue plus media-moderation pipeline, record that as a new ADR.

## Current Video Context
Review video is implemented locally through [[ADR_0032_Review_Video_On_Mux]]. The active contract keeps provider-agnostic `ReviewMedia`, uses Mux for video, uses AWS S3/CloudFront for review images, and routes durable provider work through `MediaProviderJob` plus QStash.

This page is about the broader future media pipeline: image/video moderation, authoritative metadata, variant generation, AI tagging, and scale-oriented background processing beyond the current review-video lifecycle.

## Why Build It Later
1. Image moderation before public display.
2. Spike resilience when many shoppers upload media.
3. Retry durability for provider or moderation outages.
4. Future AI tagging, quality scoring, and richer media workflows.

## Current Mini-Version
The app already has lightweight async pieces:
- AWS S3 presigned upload plus `/api/public/upload/register` for images.
- Durable AWS image variants and provider-neutral media rows for review media.
- Mux video jobs for upload resolution, reconcile, publish/protect, cleanup, and expiry.
- QStash as a wakeup layer for idempotent DB-owned provider work.

## Trigger To Promote
Build a full media pipeline when any of these become product requirements:
- Pre-public image moderation.
- Higher media volume than cron/backfill and the current provider jobs can comfortably handle.
- AI media tagging or quality scoring.
- A merchant-facing moderation queue beyond manual review approval.

## Recommended Shape
Start with existing primitives: Postgres job rows, QStash delivery, provider-specific adapters behind provider-neutral job actions, and explicit publish gates. Promote to a dedicated workflow engine only when volume or operational evidence justifies it.
