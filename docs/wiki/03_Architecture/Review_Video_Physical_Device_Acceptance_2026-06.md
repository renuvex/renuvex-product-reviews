---
type: architecture
project: renuvex-product-reviews
status: superseded
created: 2026-06-15
updated: 2026-06-20
last_verified: 2026-06-20
confidence: high
tags:
  - video
  - acceptance
  - superseded
related:
  - "[[ADR_0032_Review_Video_On_Mux]]"
  - "[[Review_Video_Canary_Runbook]]"
source_files:
  - "src/lib/media/providers/mux.ts"
  - "src/widget/reviews-section/review-form-modal/media/video-upload.js"
  - "tests/widget-media-cross-browser.spec.ts"
---

# Review Video Physical Device Acceptance - Superseded

The earlier physical-device acceptance ledger has been superseded by the Mux-only review-video canary path in [[ADR_0032_Review_Video_On_Mux]] and [[Review_Video_Canary_Runbook]].

Keep this file as a stable wiki target for older links. New evidence must be recorded against the Mux canary:
- Preview upload through Mux direct upload.
- Mux asset readiness through webhook or bounded reconcile.
- Pending admin playback through server-generated signed playback URLs.
- Approval creating/converging one public playback ID.
- Storefront playback through public Mux delivery URLs only after approval.
- Rejection/delete/cancel/expiry cleanup through idempotent provider jobs.

Physical iPhone Safari and Android Chrome checks remain release gates, but their provider-specific evidence belongs in the current Mux canary runbook.
