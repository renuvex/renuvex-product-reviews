-- Review-email retention, analytics, DSR, and immutable-journal evidence.
-- This migration is expand-only so it can overlap with the disabled V3 source
-- and the previous production deployment.

ALTER TABLE "Review"
  ADD COLUMN "reviewRequestReceiptId" TEXT;

CREATE UNIQUE INDEX "Review_reviewRequestReceiptId_key"
  ON "Review"("reviewRequestReceiptId");

ALTER TABLE "IkasOrderSnapshot"
  ADD COLUMN "customerEmailFoldedHash" VARCHAR(128),
  ADD COLUMN "customerEmailHashKeyVersion" INTEGER,
  ADD COLUMN "customerEmailNormalizationVersion" INTEGER NOT NULL DEFAULT 1;

CREATE INDEX "IkasOrderSnapshot_storeId_customerEmailFoldedHash_idx"
  ON "IkasOrderSnapshot"("storeId", "customerEmailFoldedHash");

ALTER TABLE "ReviewRequest"
  ADD COLUMN "receiptId" TEXT,
  ADD COLUMN "recipientEmailFoldedHash" VARCHAR(128),
  ADD COLUMN "recipientEmailHashKeyVersion" INTEGER,
  ADD COLUMN "recipientEmailNormalizationVersion" INTEGER NOT NULL DEFAULT 1;

CREATE UNIQUE INDEX "ReviewRequest_receiptId_key"
  ON "ReviewRequest"("receiptId");

ALTER TABLE "ReviewEmailEvent"
  ADD COLUMN "ignoredReason" VARCHAR(128);

ALTER TABLE "ReviewEmailSuppression"
  ADD COLUMN "emailHashKeyVersion" INTEGER,
  ADD COLUMN "emailNormalizationVersion" INTEGER NOT NULL DEFAULT 1;

CREATE TABLE "ReviewEmailSubjectBlock" (
  "id" TEXT NOT NULL,
  "storeId" TEXT NOT NULL,
  "installationGeneration" INTEGER NOT NULL,
  "foldedSubjectHash" VARCHAR(128) NOT NULL,
  "foldedHashKeyVersion" INTEGER NOT NULL,
  "normalizationVersion" INTEGER NOT NULL DEFAULT 2,
  "reason" VARCHAR(64) NOT NULL DEFAULT 'subject_erasure',
  "sourceRunId" VARCHAR(64),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "ReviewEmailSubjectBlock_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "ReviewEmailSubjectBlock_subject_key"
  ON "ReviewEmailSubjectBlock"("storeId", "installationGeneration", "foldedSubjectHash");
CREATE INDEX "ReviewEmailSubjectBlock_store_generation_created_idx"
  ON "ReviewEmailSubjectBlock"("storeId", "installationGeneration", "createdAt");

CREATE TABLE "ReviewRequestReceipt" (
  "id" TEXT NOT NULL,
  "storeId" TEXT NOT NULL,
  "installationGeneration" INTEGER NOT NULL,
  "orderProductFingerprint" VARCHAR(128) NOT NULL,
  "fingerprintKeyVersion" INTEGER NOT NULL,
  "normalizationVersion" INTEGER NOT NULL DEFAULT 2,
  "exactSubjectHash" VARCHAR(128),
  "exactSubjectKeyVersion" INTEGER,
  "analyticsManifest" JSONB,
  "analyticsClosedAt" TIMESTAMP(3),
  "analyticsCloseReason" VARCHAR(64),
  "metricsReversedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "ReviewRequestReceipt_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "ReviewRequestReceipt_order_product_key"
  ON "ReviewRequestReceipt"("storeId", "installationGeneration", "orderProductFingerprint");
CREATE INDEX "ReviewRequestReceipt_subject_idx"
  ON "ReviewRequestReceipt"("storeId", "installationGeneration", "exactSubjectHash");
CREATE INDEX "ReviewRequestReceipt_storeId_analyticsClosedAt_updatedAt_idx"
  ON "ReviewRequestReceipt"("storeId", "analyticsClosedAt", "updatedAt");

CREATE TABLE "ReviewEmailDataSubjectRun" (
  "id" TEXT NOT NULL,
  "storeId" TEXT NOT NULL,
  "installationGeneration" INTEGER NOT NULL,
  "action" VARCHAR(32) NOT NULL DEFAULT 'erase',
  "normalizationVersion" INTEGER NOT NULL DEFAULT 2,
  "exactSubjectHash" VARCHAR(128),
  "exactSubjectKeyVersion" INTEGER,
  "foldedSubjectHash" VARCHAR(128),
  "foldedSubjectKeyVersion" INTEGER,
  "idempotencyKeyHash" VARCHAR(64) NOT NULL,
  "requestDigest" VARCHAR(64) NOT NULL,
  "requestDigestKeyVersion" INTEGER,
  "journalKey" VARCHAR(1024),
  "journalPayloadSha256" VARCHAR(64),
  "journalVersionId" VARCHAR(1024),
  "journalEtag" VARCHAR(128),
  "journalChecksumSha256" VARCHAR(128),
  "journalRetentionBaseAt" TIMESTAMP(3),
  "journalObjectLockRetainUntil" TIMESTAMP(3),
  "journalStatus" VARCHAR(32) NOT NULL DEFAULT 'pending',
  "status" VARCHAR(32) NOT NULL DEFAULT 'pending',
  "attempts" INTEGER NOT NULL DEFAULT 0,
  "nextRetryAt" TIMESTAMP(3),
  "rowCounts" JSONB,
  "progress" JSONB,
  "sanitizedErrorCode" VARCHAR(128),
  "subjectHashesClearedAt" TIMESTAMP(3),
  "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "finishedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "ReviewEmailDataSubjectRun_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "ReviewEmailDataSubjectRun_storeId_idempotencyKeyHash_key"
  ON "ReviewEmailDataSubjectRun"("storeId", "idempotencyKeyHash");
CREATE INDEX "ReviewEmailDSR_store_generation_created_idx"
  ON "ReviewEmailDataSubjectRun"("storeId", "installationGeneration", "createdAt");
CREATE INDEX "ReviewEmailDataSubjectRun_storeId_exactSubjectHash_idx"
  ON "ReviewEmailDataSubjectRun"("storeId", "exactSubjectHash");
CREATE INDEX "ReviewEmailDataSubjectRun_status_nextRetryAt_idx"
  ON "ReviewEmailDataSubjectRun"("status", "nextRetryAt");
CREATE INDEX "ReviewEmailDataSubjectRun_journalStatus_createdAt_idx"
  ON "ReviewEmailDataSubjectRun"("journalStatus", "createdAt");

ALTER TABLE "StoreDataErasureRun"
  ADD COLUMN "journalKey" VARCHAR(1024),
  ADD COLUMN "journalPayloadSha256" VARCHAR(64),
  ADD COLUMN "journalVersionId" VARCHAR(1024),
  ADD COLUMN "journalEtag" VARCHAR(128),
  ADD COLUMN "journalChecksumSha256" VARCHAR(128),
  ADD COLUMN "journalRetentionBaseAt" TIMESTAMP(3),
  ADD COLUMN "journalRetainUntil" TIMESTAMP(3),
  ADD COLUMN "journalStatus" VARCHAR(32) NOT NULL DEFAULT 'pending';

CREATE INDEX "StoreDataErasureRun_journalStatus_startedAt_idx"
  ON "StoreDataErasureRun"("journalStatus", "startedAt");

CREATE TABLE "ReviewEmailDailyMetric" (
  "id" TEXT NOT NULL,
  "storeId" TEXT NOT NULL,
  "installationGeneration" INTEGER NOT NULL,
  "metricDate" TIMESTAMP(3) NOT NULL,
  "kind" VARCHAR(32) NOT NULL,
  "templateVersion" VARCHAR(64) NOT NULL,
  "locale" VARCHAR(16) NOT NULL,
  "accepted" INTEGER NOT NULL DEFAULT 0,
  "delivered" INTEGER NOT NULL DEFAULT 0,
  "delayed" INTEGER NOT NULL DEFAULT 0,
  "bounced" INTEGER NOT NULL DEFAULT 0,
  "complained" INTEGER NOT NULL DEFAULT 0,
  "rejected" INTEGER NOT NULL DEFAULT 0,
  "failed" INTEGER NOT NULL DEFAULT 0,
  "outcomeUnknown" INTEGER NOT NULL DEFAULT 0,
  "skipped" INTEGER NOT NULL DEFAULT 0,
  "reviewedRequests" INTEGER NOT NULL DEFAULT 0,
  "reviewsViaReminder" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "ReviewEmailDailyMetric_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "ReviewEmailDailyMetric_dimensions_key"
  ON "ReviewEmailDailyMetric"("storeId", "installationGeneration", "metricDate", "kind", "templateVersion", "locale");
CREATE INDEX "ReviewEmailDailyMetric_store_generation_date_idx"
  ON "ReviewEmailDailyMetric"("storeId", "installationGeneration", "metricDate");

CREATE TABLE "ReviewEmailMetricContribution" (
  "id" TEXT NOT NULL,
  "receiptId" TEXT,
  "storeId" TEXT NOT NULL,
  "installationGeneration" INTEGER NOT NULL,
  "exactSubjectHash" VARCHAR(128),
  "dedupeKey" VARCHAR(256) NOT NULL,
  "metricDate" TIMESTAMP(3) NOT NULL,
  "kind" VARCHAR(32) NOT NULL,
  "templateVersion" VARCHAR(64) NOT NULL,
  "locale" VARCHAR(16) NOT NULL,
  "metric" VARCHAR(64) NOT NULL,
  "delta" INTEGER NOT NULL,
  "reversedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "ReviewEmailMetricContribution_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "ReviewEmailMetricContribution_dedupeKey_key"
  ON "ReviewEmailMetricContribution"("dedupeKey");
CREATE INDEX "ReviewEmailMetricContribution_receiptId_createdAt_idx"
  ON "ReviewEmailMetricContribution"("receiptId", "createdAt");
CREATE INDEX "ReviewEmailContribution_subject_created_idx"
  ON "ReviewEmailMetricContribution"("storeId", "exactSubjectHash", "createdAt");
CREATE INDEX "ReviewEmailMetricContribution_reversedAt_createdAt_idx"
  ON "ReviewEmailMetricContribution"("reversedAt", "createdAt");

CREATE TABLE "ReviewEmailPurgeRun" (
  "id" TEXT NOT NULL,
  "mode" VARCHAR(16) NOT NULL,
  "status" VARCHAR(32) NOT NULL DEFAULT 'running',
  "batchSize" INTEGER NOT NULL DEFAULT 100,
  "batchesProcessed" INTEGER NOT NULL DEFAULT 0,
  "candidates" JSONB,
  "deleted" JSONB,
  "elapsedMs" INTEGER NOT NULL DEFAULT 0,
  "sanitizedErrorCode" VARCHAR(128),
  "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "finishedAt" TIMESTAMP(3),
  CONSTRAINT "ReviewEmailPurgeRun_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "ReviewEmailPurgeRun_status_startedAt_idx"
  ON "ReviewEmailPurgeRun"("status", "startedAt");
CREATE INDEX "ReviewEmailPurgeRun_mode_startedAt_idx"
  ON "ReviewEmailPurgeRun"("mode", "startedAt");

CREATE TABLE "ReviewEmailJournalCoverageCheck" (
  "id" TEXT NOT NULL,
  "status" VARCHAR(32) NOT NULL DEFAULT 'running',
  "restoreTargetAt" TIMESTAMP(3),
  "coverageStartAt" TIMESTAMP(3),
  "earliestSafeRestoreAt" TIMESTAMP(3),
  "checkedObjects" INTEGER NOT NULL DEFAULT 0,
  "missingIntents" INTEGER NOT NULL DEFAULT 0,
  "conflictingObjects" INTEGER NOT NULL DEFAULT 0,
  "orphanIntents" INTEGER NOT NULL DEFAULT 0,
  "details" JSONB,
  "sanitizedErrorCode" VARCHAR(128),
  "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "finishedAt" TIMESTAMP(3),
  CONSTRAINT "ReviewEmailJournalCoverageCheck_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "ReviewEmailJournalCoverageCheck_status_startedAt_idx"
  ON "ReviewEmailJournalCoverageCheck"("status", "startedAt");

ALTER TABLE "Review"
  ADD CONSTRAINT "Review_reviewRequestReceiptId_fkey"
  FOREIGN KEY ("reviewRequestReceiptId") REFERENCES "ReviewRequestReceipt"("id") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "ReviewRequest"
  ADD CONSTRAINT "ReviewRequest_receiptId_fkey"
  FOREIGN KEY ("receiptId") REFERENCES "ReviewRequestReceipt"("id") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "ReviewEmailMetricContribution"
  ADD CONSTRAINT "ReviewEmailMetricContribution_receiptId_fkey"
  FOREIGN KEY ("receiptId") REFERENCES "ReviewRequestReceipt"("id") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "ReviewEmailSubjectBlock" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ReviewRequestReceipt" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ReviewEmailDataSubjectRun" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ReviewEmailDailyMetric" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ReviewEmailMetricContribution" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ReviewEmailPurgeRun" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ReviewEmailJournalCoverageCheck" ENABLE ROW LEVEL SECURITY;

DO $$
DECLARE
  role_name TEXT;
  table_list TEXT := '"ReviewEmailSubjectBlock", "ReviewRequestReceipt", "ReviewEmailDataSubjectRun", "ReviewEmailDailyMetric", "ReviewEmailMetricContribution", "ReviewEmailPurgeRun", "ReviewEmailJournalCoverageCheck"';
BEGIN
  FOREACH role_name IN ARRAY ARRAY['anon', 'authenticated']
  LOOP
    IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = role_name) THEN
      EXECUTE format('REVOKE ALL PRIVILEGES ON TABLE %s FROM %I', table_list, role_name);
    END IF;
  END LOOP;
END
$$;
