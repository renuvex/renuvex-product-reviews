-- Cleanup hardening (ADR_0030) — two additive tables. Both are
-- backwards-compatible: existing code paths are unaffected, so this is a safe
-- single-deploy migration (no expand/contract needed).
--
--   MediaCleanupRun:        audit log, one row per cleanup-images cron run.
--   OrphanImageQuarantine:  two-phase orphan deletion (mark now, sweep later).

CREATE TABLE "MediaCleanupRun" (
    "id" TEXT NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "finishedAt" TIMESTAMP(3),
    "status" VARCHAR(32) NOT NULL DEFAULT 'ok',
    "trigger" VARCHAR(32) NOT NULL DEFAULT 'cron',
    "scanned" INTEGER NOT NULL DEFAULT 0,
    "usedCount" INTEGER NOT NULL DEFAULT 0,
    "candidates" INTEGER NOT NULL DEFAULT 0,
    "quarantinedNew" INTEGER NOT NULL DEFAULT 0,
    "released" INTEGER NOT NULL DEFAULT 0,
    "deleted" INTEGER NOT NULL DEFAULT 0,
    "breakerTripped" BOOLEAN NOT NULL DEFAULT false,
    "breakerReason" VARCHAR(128),
    "forced" BOOLEAN NOT NULL DEFAULT false,
    "sampleDeleted" JSONB,
    "error" VARCHAR(512),
    "durationMs" INTEGER,

    CONSTRAINT "MediaCleanupRun_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "OrphanImageQuarantine" (
    "publicId" VARCHAR(512) NOT NULL,
    "storeId" TEXT,
    "reason" VARCHAR(64) NOT NULL DEFAULT 'orphan_scan',
    "quarantinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastSeenAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "scanCount" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "OrphanImageQuarantine_pkey" PRIMARY KEY ("publicId")
);

CREATE INDEX "MediaCleanupRun_startedAt_idx" ON "MediaCleanupRun"("startedAt");

CREATE INDEX "MediaCleanupRun_status_startedAt_idx" ON "MediaCleanupRun"("status", "startedAt");

CREATE INDEX "OrphanImageQuarantine_quarantinedAt_idx" ON "OrphanImageQuarantine"("quarantinedAt");

CREATE INDEX "OrphanImageQuarantine_storeId_idx" ON "OrphanImageQuarantine"("storeId");
