-- Durable per-run evidence prevents cross-page duplication from being treated
-- as a complete catalog scan. Current-generation coverage carries freshness
-- without rewriting every unchanged ProductSnapshot each day.
ALTER TABLE "ProductReconciliationRun"
  ADD COLUMN "snapshotCreatedCount" INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN "snapshotUpdatedCount" INTEGER NOT NULL DEFAULT 0;

ALTER TABLE "ProductReconciliationRun"
  DROP CONSTRAINT "ProductReconciliationRun_nonnegative_check",
  ADD CONSTRAINT "ProductReconciliationRun_nonnegative_check"
  CHECK (
    "installationGeneration" > 0 AND
    "installationStateVersion" > 0 AND
    "nextPage" > 0 AND
    "scannedCount" >= 0 AND
    "verifiedCount" >= 0 AND
    "activeCount" >= 0 AND
    "unavailableCount" >= 0 AND
    "conflictCount" >= 0 AND
    "reconstructedCount" >= 0 AND
    "snapshotCreatedCount" >= 0 AND
    "snapshotUpdatedCount" >= 0 AND
    "attempts" >= 0
  );

CREATE TABLE "ProductReconciliationObservation" (
  "runId" TEXT NOT NULL,
  "storeId" TEXT NOT NULL,
  "productId" TEXT NOT NULL,
  "evidence" VARCHAR(16) NOT NULL,
  "observedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "ProductReconciliationObservation_pkey" PRIMARY KEY ("runId", "productId"),
  CONSTRAINT "ProductReconciliationObservation_evidence_check"
    CHECK ("evidence" IN ('present', 'deleted', 'absent')),
  CONSTRAINT "ProductReconciliationObservation_identity_check"
    CHECK (btrim("runId") <> '' AND btrim("storeId") <> '' AND btrim("productId") <> '')
);

CREATE INDEX "ProductReconciliationObservation_storeId_runId_productId_idx"
  ON "ProductReconciliationObservation"("storeId", "runId", "productId");

ALTER TABLE "ProductReconciliationObservation"
  ADD CONSTRAINT "ProductReconciliationObservation_runId_fkey"
  FOREIGN KEY ("runId") REFERENCES "ProductReconciliationRun"("id")
  ON DELETE CASCADE ON UPDATE CASCADE;

CREATE TABLE "ProductCatalogCoverage" (
  "storeId" TEXT NOT NULL,
  "authorizedAppId" VARCHAR(128) NOT NULL,
  "installationGeneration" INTEGER NOT NULL,
  "installationStateVersion" INTEGER NOT NULL,
  "reconciliationRunId" TEXT,
  "productCount" INTEGER NOT NULL,
  "completedAt" TIMESTAMP(3) NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "ProductCatalogCoverage_pkey" PRIMARY KEY ("storeId"),
  CONSTRAINT "ProductCatalogCoverage_nonnegative_check"
    CHECK (
      "installationGeneration" > 0 AND
      "installationStateVersion" > 0 AND
      "productCount" >= 0
    )
);

CREATE UNIQUE INDEX "ProductCatalogCoverage_reconciliationRunId_key"
  ON "ProductCatalogCoverage"("reconciliationRunId");

ALTER TABLE "ProductCatalogCoverage"
  ADD CONSTRAINT "ProductCatalogCoverage_reconciliationRunId_fkey"
  FOREIGN KEY ("reconciliationRunId") REFERENCES "ProductReconciliationRun"("id")
  ON DELETE SET NULL ON UPDATE CASCADE;

CREATE TABLE "ProductReconciliationSweep" (
  "id" TEXT NOT NULL,
  "scheduleSlot" VARCHAR(32) NOT NULL,
  "status" VARCHAR(32) NOT NULL DEFAULT 'pending',
  "phase" VARCHAR(32) NOT NULL DEFAULT 'discover',
  "cursorStoreId" TEXT,
  "discoveredCount" INTEGER NOT NULL DEFAULT 0,
  "dispatchedCount" INTEGER NOT NULL DEFAULT 0,
  "dispatchFailedCount" INTEGER NOT NULL DEFAULT 0,
  "retainedRunCount" INTEGER NOT NULL DEFAULT 0,
  "retainedSweepCount" INTEGER NOT NULL DEFAULT 0,
  "attempts" INTEGER NOT NULL DEFAULT 0,
  "leaseOwner" VARCHAR(64),
  "leaseExpiresAt" TIMESTAMP(3),
  "nextRetryAt" TIMESTAMP(3),
  "lastErrorCode" VARCHAR(128),
  "startedAt" TIMESTAMP(3),
  "finishedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "ProductReconciliationSweep_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "ProductReconciliationSweep_status_check"
    CHECK ("status" IN ('pending', 'scanning', 'completed', 'error', 'exhausted')),
  CONSTRAINT "ProductReconciliationSweep_phase_check"
    CHECK ("phase" IN ('discover', 'retain_runs', 'retain_sweeps', 'complete')),
  CONSTRAINT "ProductReconciliationSweep_schedule_slot_check"
    CHECK ("scheduleSlot" ~ '^[0-9]{4}-[0-9]{2}-[0-9]{2}$'),
  CONSTRAINT "ProductReconciliationSweep_nonnegative_check"
    CHECK (
      "discoveredCount" >= 0 AND
      "dispatchedCount" >= 0 AND
      "dispatchFailedCount" >= 0 AND
      "retainedRunCount" >= 0 AND
      "retainedSweepCount" >= 0 AND
      "attempts" >= 0
    )
);

CREATE UNIQUE INDEX "ProductReconciliationSweep_scheduleSlot_key"
  ON "ProductReconciliationSweep"("scheduleSlot");
CREATE INDEX "ProductReconciliationSweep_status_nextRetryAt_createdAt_idx"
  ON "ProductReconciliationSweep"("status", "nextRetryAt", "createdAt");
CREATE INDEX "ProductReconciliationSweep_leaseExpiresAt_idx"
  ON "ProductReconciliationSweep"("leaseExpiresAt");
CREATE INDEX "ProductReconciliationSweep_finishedAt_idx"
  ON "ProductReconciliationSweep"("finishedAt");
CREATE UNIQUE INDEX "ProductReconciliationSweep_single_nonterminal_idx"
  ON "ProductReconciliationSweep" ((1))
  WHERE "status" IN ('pending', 'scanning', 'error');

ALTER TABLE "ProductReconciliationObservation" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ProductCatalogCoverage" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ProductReconciliationSweep" ENABLE ROW LEVEL SECURITY;

REVOKE ALL PRIVILEGES ON TABLE "ProductReconciliationObservation" FROM PUBLIC;
REVOKE ALL PRIVILEGES ON TABLE "ProductCatalogCoverage" FROM PUBLIC;
REVOKE ALL PRIVILEGES ON TABLE "ProductReconciliationSweep" FROM PUBLIC;

DO $$
DECLARE
  role_name TEXT;
BEGIN
  FOREACH role_name IN ARRAY ARRAY['anon', 'authenticated', 'service_role']
  LOOP
    IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = role_name) THEN
      EXECUTE format('REVOKE ALL PRIVILEGES ON TABLE "ProductReconciliationObservation" FROM %I', role_name);
      EXECUTE format('REVOKE ALL PRIVILEGES ON TABLE "ProductCatalogCoverage" FROM %I', role_name);
      EXECUTE format('REVOKE ALL PRIVILEGES ON TABLE "ProductReconciliationSweep" FROM %I', role_name);
    END IF;
  END LOOP;
END
$$;
