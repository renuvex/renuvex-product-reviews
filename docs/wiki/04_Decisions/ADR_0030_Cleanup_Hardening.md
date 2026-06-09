---
type: decision
project: renuvex-product-reviews
status: active
created: 2026-06-09
updated: 2026-06-09
last_verified: 2026-06-09
confidence: high
tags:
  - adr
  - cleanup
  - cloudinary
  - safety
  - cron
related:
  - "[[Decision_Index]]"
  - "[[ADR_0012_Pending_Upload_Registry]]"
  - "[[ADR_0029_Review_Media_Metadata]]"
  - "[[Maintenance_Runbook]]"
  - "[[Database_Map]]"
  - "[[Sentry_Operations]]"
source_files:
  - "prisma/schema.prisma"
  - "prisma/migrations/20260609120000_add_cleanup_hardening/migration.sql"
  - "src/lib/cleanup-orphan-images.ts"
  - "src/app/api/admin/cleanup-images/route.ts"
  - "src/lib/cron-observability.ts"
  - "tests/unit/cleanup-orphan-images.test.ts"
  - "vercel.json"
---

# ADR_0030 - Orphan Image Cleanup Hardening (Circuit-Breaker + Two-Phase Quarantine)

## Status
Accepted

## Context
`cleanup-images` (monthly cron, `0 4 1 * *`, ADR_0012 fallback path) reclaims Cloudinary
storage by diffing the entire `review_images/` folder against the in-use set (`ReviewMedia.publicId`
+ legacy `Review.images`) and **hard-deleting** every unused asset older than 30 days.

The delete is **irreversible** (past Cloudinary's backup retention). The whole operation rests on the
in-use set being *complete*. If that set is under-populated for any reason — a `cloudName`/`publicId`
regression, a partial DB read, a bad migration — live customer review photos are flagged as orphans
and mass-deleted. The 30-day age guard only protects *recent* uploads; a 2-year-old genuine photo is
not protected by age. Pre-hardening the job had **no upper bound and no audit trail**, so a
catastrophic mass-delete would be both unstoppable and invisible until a merchant noticed missing
photos.

Industry practice for unattended destructive jobs converges on the same controls:

| System | Guardrail | On breach |
|---|---|---|
| MS Entra Connect Sync | default **500** absolute deletes | stop **all**, email, manual approve |
| octoDNS | default **30%** delete ratio | require `--force` |
| Storage GC | two-phase mark/sweep + grace | "pending removal", recoverable |

## Decision
Two additive tables + a pure, unit-tested safety library, with the route reduced to auth + Sentry
error reporting + audit.

- **`OrphanImageQuarantine`** (two-phase state) and **`MediaCleanupRun`** (audit, one row/run).
- **Two-phase deletion** (`src/lib/cleanup-orphan-images.ts`):
  - *Phase 1 (mark):* current orphans (unused **and** older than `ageDays`=30) are written to
    quarantine, **not deleted**.
  - *Phase 2 (sweep):* a later run hard-deletes only quarantined assets still orphaned after
    `graceDays`=7. Assets that stop being orphans (re-found in use) are **auto-released** from
    quarantine and never deleted.
  - Consequence: the **first run after deploy marks only**; deletions begin one grace window later.
- **Circuit-breaker** (pure functions `evaluateScanTrust` + `evaluateSweepCap`):
  - **G1 empty-used-set** — `usedCount==0` while `ReviewMedia` has rows ⇒ abort (no mark, no sweep).
    **NOT force-overridable** (deleting the whole library is never intended).
  - **G2 ratio** — `currentOrphans/scanned > 0.30` on a scan ≥ 50 ⇒ abort before marking.
    Force-overridable.
  - **G3 absolute** — a sweep of **> 200** assets ⇒ abort the delete (quarantine kept).
    Force-overridable.
- **`?force=1`** (CRON_SECRET-authed) overrides **G2 + G3** after a human reviews the audit row; it
  **never** overrides G1.
- All thresholds are **env-tunable** (`CLEANUP_ORPHAN_AGE_DAYS`, `CLEANUP_QUARANTINE_GRACE_DAYS`,
  `CLEANUP_MAX_DELETE_RATIO`, `CLEANUP_MIN_SCAN_FOR_RATIO`, `CLEANUP_MAX_DELETE_ABSOLUTE`).
- A breaker trip raises a rich Sentry issue via `reportCronTaskError` (`Sentry.captureException`,
  tags `source:cron`, `task:breaker-tripped`, carrying the reason + scan stats) but returns
  **HTTP 200** (a controlled protective outcome, not a crash). Sentry cron **check-in monitors** were
  intentionally not adopted — the plan includes a single monitor and serverless check-ins were
  noisy/fragile; "did the job run at all" lives in the Vercel → Crons dashboard. See
  [[Maintenance_Runbook]].
- Every run persists a `MediaCleanupRun` row: `status` (`ok|tripped|error|skipped`), scan/quarantine/
  sweep counts, `breakerReason`, and `sampleDeleted` (≤ 50 publicIds for forensic recovery).

### Why 200 absolute (tighter than Entra's 500)
The **ratio** guard scales with library size — 30% of a large photo library is still a huge absolute
number — so for a photo-heavy store the **absolute cap is the real protection**, and it must be
small. 200 is a safe default that does not false-trip on normal monthly volume (abandoned uploads are
a tiny fraction) yet bounds worst-case unattended loss. MS Entra uses an absolute as its *primary*
guard for the same reason; we keep the ratio as the secondary guard so small libraries (where 200 is
a large fraction) are also covered.

## Reasoning
- Irreversible deletion in an unattended job must **fail safe**: stop and ask, not delete and hope.
- Two-phase + grace + auto-release means a transiently-misflagged asset (or one a later backfill
  re-attaches) is **never** deleted.
- The audit trail turns "a photo vanished" from unrecoverable into a forensic lookup
  (`MediaCleanupRun.sampleDeleted` + date) plus a Cloudinary restore within retention.
- Normal monthly volume is tiny, so tight thresholds do not false-trip in practice; they bite only on
  anomalies (good) or genuine bulk review deletions (rare, handled by `?force=1`).

## Alternatives Considered
- **Immediate hard-delete with only a threshold (no quarantine):** rejected — a wrong diff *under*
  the threshold still deletes real photos irreversibly, with no recovery window.
- **Percentage-only guard (octoDNS-style) as the sole control:** rejected — 30% of a large library is
  a large absolute number; insufficient for photo-heavy stores. Kept as the secondary guard.
- **Absolute-only guard (Entra-style):** kept as the *primary* guard, but paired with the ratio so
  small libraries (where 200 is a big fraction) are also protected.
- **Soft-delete to a Cloudinary "trash"/tag instead of DB quarantine:** rejected for now — adds
  Cloudinary-account-dependent state; DB quarantine + 30-day age guard + audit `sampleDeleted` +
  Cloudinary backup retention already provide a recoverable window. Revisit if managed trash/restore
  is adopted.
- **Extend the breaker to `cleanup-pending-uploads`:** rejected — that job deletes from a
  self-authored registry (`PendingReviewImage`), bounded and **not** diff-derived, so it lacks the
  catastrophic-diff risk this ADR addresses.

## Consequences
- The **first `cleanup-images` run after deploy MARKS ONLY** (zero deletions) until the grace window
  passes. Expected; documented in [[Maintenance_Runbook]].
- A breaker **trip** is intentional and alert-worthy: investigate the `MediaCleanupRun` row + the
  Sentry issue before re-running with `?force=1`.
- Deleting a review still (correctly) cascades its `ReviewMedia` away → the asset becomes an orphan →
  quarantined → swept after grace.
- Thresholds (200 / 30% / 7d grace / 30d age) are **starting points** — calibrate from real audit
  rows. Lowering is free safety; raising needs justification.
- AI moderation, video, and an async media pipeline remain separate phases (see
  [[Async_Media_Pipeline]]).

## Related Source Files
- [prisma/schema.prisma](prisma/schema.prisma)
- [prisma/migrations/20260609120000_add_cleanup_hardening/migration.sql](prisma/migrations/20260609120000_add_cleanup_hardening/migration.sql)
- [src/lib/cleanup-orphan-images.ts](src/lib/cleanup-orphan-images.ts)
- [src/app/api/admin/cleanup-images/route.ts](src/app/api/admin/cleanup-images/route.ts)
- [src/lib/cron-observability.ts](src/lib/cron-observability.ts)
- [tests/unit/cleanup-orphan-images.test.ts](tests/unit/cleanup-orphan-images.test.ts)
