---
type: decision
project: renuvex-product-reviews
status: superseded
created: 2026-06-12
updated: 2026-07-30
last_verified: 2026-07-30
confidence: high
tags:
  - adr
  - media
  - video
  - superseded
related:
  - "[[ADR_0032_Review_Video_On_Mux]]"
  - "[[Decision_Index]]"
  - "[[Review_Video_Canary_Runbook]]"
source_files:
  - "prisma/models/reviews.prisma"
  - "prisma/models/media.prisma"
  - "src/lib/media/providers/mux.ts"
  - "src/app/api/public/upload/video/initiate/route.ts"
  - "src/app/api/webhooks/mux/route.ts"
---

# ADR_0031 - Superseded Review Video Foundation

## Status
Superseded by [[ADR_0032_Review_Video_On_Mux]].

This document is intentionally reduced to a compatibility pointer. The original provider candidate and archive-path details are no longer part of the active project memory after the Mux-only contract cleanup. Keep links to this page so older notes still resolve, but use ADR_0032 for all current video-provider decisions.

## Retained Decisions
- The provider-agnostic `ReviewMedia` model remains the durable media read model.
- Video review visibility still uses `Review.status` plus `ReviewMedia.visible`.
- Upload quota reservation, terminal quota consumption, cancellation, expiry, and cleanup stay idempotent.
- Media-provider work remains DB-outbox owned through `MediaProviderJob`, QStash delivery, and provider leases.
- Storefront APIs expose normalized media fields only; provider ids and private playback ids are server-only.

## Superseding Decision
ADR_0032 makes Mux the only active video provider. Shopper uploads use Mux direct upload URLs, processing is resolved through Mux asset state, pending/admin playback uses signed playback tokens, and approved storefront playback uses public Mux playback IDs.

## Related
- [[ADR_0032_Review_Video_On_Mux]]
- [[Review_Video_Canary_Runbook]]
- [[Decision_Index]]
