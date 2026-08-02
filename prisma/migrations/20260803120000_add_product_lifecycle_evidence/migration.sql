-- Product identity remains (storeId, productId). These additive fields record
-- provider evidence without rewriting or deleting historical review ownership.
ALTER TABLE "ProductSnapshot"
  ADD COLUMN "lifecycleState" VARCHAR(32) NOT NULL DEFAULT 'unknown',
  ADD COLUMN "providerCreatedAt" TIMESTAMP(3),
  ADD COLUMN "lastVerifiedAt" TIMESTAMP(3),
  ADD COLUMN "unavailableAt" TIMESTAMP(3),
  ADD COLUMN "conflictDetectedAt" TIMESTAMP(3),
  ADD COLUMN "lastEvidenceSource" VARCHAR(32),
  ADD COLUMN "lastSeenReconciliationRunId" TEXT;

ALTER TABLE "ProductSnapshot"
  ADD CONSTRAINT "ProductSnapshot_lifecycleState_check"
  CHECK ("lifecycleState" IN ('unknown', 'active_verified', 'unavailable_verified', 'identity_conflict'));

CREATE INDEX "ProductSnapshot_storeId_lifecycleState_lastVerifiedAt_idx"
  ON "ProductSnapshot"("storeId", "lifecycleState", "lastVerifiedAt");

CREATE INDEX "ProductSnapshot_storeId_lastSeenReconciliationRunId_product_idx"
  ON "ProductSnapshot"("storeId", "lastSeenReconciliationRunId", "productId");

CREATE TABLE "ProductReconciliationRun" (
  "id" TEXT NOT NULL,
  "storeId" TEXT NOT NULL,
  "authorizedAppId" VARCHAR(128) NOT NULL,
  "installationGeneration" INTEGER NOT NULL,
  "installationStateVersion" INTEGER NOT NULL,
  "trigger" VARCHAR(32) NOT NULL,
  "scheduleSlot" VARCHAR(32),
  "status" VARCHAR(32) NOT NULL DEFAULT 'pending',
  "phase" VARCHAR(32) NOT NULL DEFAULT 'scan',
  "nextPage" INTEGER NOT NULL DEFAULT 1,
  "candidateCursor" TEXT,
  "scannedCount" INTEGER NOT NULL DEFAULT 0,
  "verifiedCount" INTEGER NOT NULL DEFAULT 0,
  "activeCount" INTEGER NOT NULL DEFAULT 0,
  "unavailableCount" INTEGER NOT NULL DEFAULT 0,
  "conflictCount" INTEGER NOT NULL DEFAULT 0,
  "reconstructedCount" INTEGER NOT NULL DEFAULT 0,
  "attempts" INTEGER NOT NULL DEFAULT 0,
  "leaseOwner" VARCHAR(64),
  "leaseExpiresAt" TIMESTAMP(3),
  "nextRetryAt" TIMESTAMP(3),
  "lastErrorCode" VARCHAR(128),
  "startedAt" TIMESTAMP(3),
  "finishedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "ProductReconciliationRun_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "ProductReconciliationRun_trigger_check"
    CHECK ("trigger" IN ('install', 'daily', 'manual')),
  CONSTRAINT "ProductReconciliationRun_status_check"
    CHECK ("status" IN ('pending', 'scanning', 'verifying', 'completed', 'error', 'exhausted', 'stale_ignored')),
  CONSTRAINT "ProductReconciliationRun_phase_check"
    CHECK ("phase" IN ('scan', 'verify', 'complete')),
  CONSTRAINT "ProductReconciliationRun_nonnegative_check"
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
      "attempts" >= 0
    )
);

CREATE INDEX "ProductReconciliationRun_status_nextRetryAt_createdAt_idx"
  ON "ProductReconciliationRun"("status", "nextRetryAt", "createdAt");

CREATE INDEX "ProductReconciliationRun_leaseExpiresAt_idx"
  ON "ProductReconciliationRun"("leaseExpiresAt");

CREATE INDEX "ProductReconciliationRun_storeId_createdAt_idx"
  ON "ProductReconciliationRun"("storeId", "createdAt");

CREATE INDEX "ProductReconciliationRun_storeId_installationGeneration_sta_idx"
  ON "ProductReconciliationRun"("storeId", "installationGeneration", "status");

CREATE UNIQUE INDEX "ProductReconciliationRun_storeId_installationGeneration_tri_key"
  ON "ProductReconciliationRun"("storeId", "installationGeneration", "trigger", "scheduleSlot");

ALTER TABLE "ProductReconciliationRun" ENABLE ROW LEVEL SECURITY;

REVOKE ALL PRIVILEGES ON TABLE "ProductReconciliationRun" FROM PUBLIC;

DO $$
DECLARE
  role_name TEXT;
BEGIN
  FOREACH role_name IN ARRAY ARRAY['anon', 'authenticated', 'service_role']
  LOOP
    IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = role_name) THEN
      EXECUTE format('REVOKE ALL PRIVILEGES ON TABLE "ProductReconciliationRun" FROM %I', role_name);
    END IF;
  END LOOP;
END
$$;
