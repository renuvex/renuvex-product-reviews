---
type: research
project: renuvex-product-reviews
status: active
created: 2026-06-09
updated: 2026-06-09
last_verified: 2026-06-09
confidence: medium
tags:
  - research
  - media
  - cloudinary
  - moderation
  - scale
  - deferred
related:
  - "[[ADR_0029_Review_Media_Metadata]]"
  - "[[Competitor_Feature_Matrix]]"
  - "[[Yotpo]]"
  - "[[Roadmap]]"
  - "[[Open_Questions]]"
  - "[[Future_Feature_Ideas]]"
source_files:
  - "src/lib/review-media-metadata.ts"
  - "src/lib/review-media-metadata-backfill.ts"
  - "src/app/api/admin/daily-maintenance/route.ts"
  - "src/app/api/public/upload/register/route.ts"
  - "prisma/schema.prisma"
---

# Async Media Pipeline — Analysis & Deferral

## Status
**Deferred — analysis only, no build decision yet (2026-06-09).** This is NOT an ADR: an ADR
records an *accepted* architectural decision, and we have deliberately chosen to defer building
this. When we decide to build (queue + moderation choice), this becomes `ADR_00XX_Async_Media_Pipeline`.

## What it is
A **queue + background workers** that process uploaded review media *after* the user's upload
request returns: authoritative metadata, image moderation, variant generation, and (future) video.
"Async" = the heavy work runs off the upload hot path, not while the shopper waits.

## Why — benefits (most → least important)
1. **Image moderation (the primary reason).** Hold/check a review photo *before* it shows publicly.
   Example: a 5-star review attaches an offensive / wrong-product / competitor-logo image — without
   moderation it goes live on the merchant storefront instantly (brand + legal risk); with the
   pipeline it is held until it passes (AI flag or human queue).
2. **Spike resilience.** A flash sale produces a flood of photo reviews; the queue absorbs the spike
   and workers drain it steadily, instead of inline work timing out uploads.
3. **Retry / durability.** If a step fails (Cloudinary hiccup, moderation API down), the job stays
   queued and retries — nothing is silently lost.
4. **Foundation for video + AI tagging** (transcoding, auto-tag, quality scoring need background time).

## Does it slow uploads? No — the opposite
The whole point of "async" is to move heavy work *off* the upload request. The upload stays fast
(file → Cloudinary). The trade-off is **eventual processing** — a short "pending" window before the
media is fully processed/moderated — not a slower upload. A synchronous moderation step would make
the shopper wait; async avoids that.

## Mechanism (on our stack)
```
1) Shopper uploads photo → directly to Cloudinary (signed)        [fast; only file transfer]
2) Cloudinary → webhook (notification_url) → backend: "done + authoritative metadata"
3) Backend enqueues a job ("process media X"); the upload request returns immediately
4) A WORKER (Vercel cron polling the queue, or a QStash/event-triggered function) runs the heavy work:
   authoritative metadata · moderation (pass/flag) · variants · update DB (metadataStatus, moderationStatus)
5) When it passes, the media is marked ready/approved → shows publicly
```
- **Queue** options: a Postgres `jobs` table, Upstash Redis (already in use), or Upstash QStash.
- **Worker** options: Vercel cron poll, or an event-triggered serverless function.

## Cost
- **Plumbing (queue + workers): ~$0 extra at our scale** — reuse Upstash Redis + Vercel cron +
  Postgres. QStash has a free tier.
- **Cloudinary eager/async transforms + webhook: native (~$0).**
- **Genuinely paid: image moderation only** — either an AI moderation add-on (per-image, ~$1/1000
  order of magnitude) or **manual** admin moderation ($0 infra + human time).

## Competitive position (evidence)
- Per [[Competitor_Feature_Matrix]]: we are **❌ on AI moderation AND ❌ on video reviews**;
  competitors are mostly ✅ (Yotpo AI moderation ✅ — see [[Yotpo]]; Loox/Judge.me are photo/video apps).
- Those features **require background processing**, so mature competitors run an async media pipeline
  (or a managed equivalent). It is table-stakes at that product tier.
- **Honest position:** our *foundation* (metadata read-model, CLS-safe responsive rendering with
  `f_auto`/`q_auto`/srcset, durable backfill, signature-verified upload — [[ADR_0029_Review_Media_Metadata]])
  is on-par/modern; the **moderation + video layer is the gap**. This pipeline is the bridge to that
  parity — we are not "more advanced", but not naively behind on the base either.
- **Distinct from** the existing Roadmap *"AI moderation summary"* item, which is review-**text**
  summarization — this is **image/video** moderation + processing.

## Current state (mini version already exists)
We already run a lightweight async-ish flow: signed direct upload + `/upload/register` (sync metadata
via signature) + the daily-maintenance **cron backfill** ([[ADR_0029_Review_Media_Metadata]]).
Sufficient at current scale; a full pipeline formalizes it with a real queue + per-event workers +
moderation.

## Trigger — when to build
Build when **any** of: (a) we want **image moderation before public display**, (b) we add **video
reviews**, (c) upload volume outgrows the daily-cron cadence / inline processing.

## Recommended approach (when triggered)
1. Cheapest infra first: Postgres/Upstash queue + Vercel-cron/QStash workers; Cloudinary webhook for
   authoritative metadata (also closes the [[ADR_0029_Review_Media_Metadata]] "Scale Evolution" item).
2. Add moderation as a worker step (AI add-on or manual queue) with **publish-gating** (review stays
   `pending` until media passes).
3. Promote to a managed queue (QStash/Inngest) only if volume demands it.
4. Then write `ADR_00XX` with the chosen queue + moderation provider + gating policy.

## Open decisions
See [[Open_Questions]] — build trigger threshold, queue choice, moderation provider/cost,
publish-gating policy, worker model.

## Obsidian Links
- [[ADR_0029_Review_Media_Metadata]]
- [[Competitor_Feature_Matrix]]
- [[Roadmap]]
- [[Open_Questions]]
