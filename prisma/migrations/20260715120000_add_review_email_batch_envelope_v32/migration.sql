-- Review Email Multi-Product Batch / Envelope V3.2.
-- Expand-only: legacy request-scoped rows remain readable during deployment overlap.

CREATE TABLE "ReviewEmailBatch" (
  "id" TEXT NOT NULL,
  "storeId" TEXT NOT NULL,
  "installationGeneration" INTEGER NOT NULL,
  "orderSnapshotId" TEXT,
  "deliveryGroupKey" VARCHAR(256) NOT NULL,
  "deliveryGroupMode" VARCHAR(32) NOT NULL,
  "groupingVersion" INTEGER NOT NULL DEFAULT 1,
  "groupingFrozenAt" TIMESTAMP(3),
  "membershipVersion" INTEGER NOT NULL DEFAULT 1,
  "batchFingerprint" VARCHAR(128) NOT NULL,
  "fingerprintKeyVersion" INTEGER NOT NULL,
  "recipientEmailHash" VARCHAR(128),
  "recipientEmailFoldedHash" VARCHAR(128),
  "recipientEmailHashKeyVersion" INTEGER,
  "recipientEmailNormalizationVersion" INTEGER NOT NULL DEFAULT 2,
  "recipientEmailEncrypted" TEXT,
  "recipientVersion" INTEGER NOT NULL DEFAULT 1,
  "recipientFrozenAt" TIMESTAMP(3),
  "firstDelayDaysSnapshot" INTEGER NOT NULL DEFAULT 1,
  "reminderDelayDaysSnapshot" INTEGER NOT NULL DEFAULT 1,
  "maxReminderCountSnapshot" INTEGER NOT NULL DEFAULT 1,
  "templateVersionSnapshot" VARCHAR(64) NOT NULL DEFAULT 'default_v1',
  "localeSnapshot" VARCHAR(16) NOT NULL DEFAULT 'tr',
  "status" VARCHAR(32) NOT NULL DEFAULT 'scheduled',
  "emailAccessStatus" VARCHAR(32) NOT NULL DEFAULT 'allowed',
  "eligibleAt" TIMESTAMP(3),
  "sendAfter" TIMESTAMP(3),
  "firstSentAt" TIMESTAMP(3),
  "firstDeliveredAt" TIMESTAMP(3),
  "lastReminderSentAt" TIMESTAMP(3),
  "reminderCount" INTEGER NOT NULL DEFAULT 0,
  "completedAt" TIMESTAMP(3),
  "expiresAt" TIMESTAMP(3),
  "cancelledAt" TIMESTAMP(3),
  "cancellationReason" VARCHAR(128),
  "recipientChangedAt" TIMESTAMP(3),
  "analyticsManifest" JSONB,
  "analyticsClosedAt" TIMESTAMP(3),
  "analyticsCloseReason" VARCHAR(64),
  "metricsReversedAt" TIMESTAMP(3),
  "piiScrubbedAt" TIMESTAMP(3),
  "detailPurgedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "ReviewEmailBatch_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "ReviewEmailBatch_detail_requires_order_check"
    CHECK ("detailPurgedAt" IS NOT NULL OR "orderSnapshotId" IS NOT NULL)
);

CREATE UNIQUE INDEX "ReviewEmailBatch_fingerprint_key"
  ON "ReviewEmailBatch"("storeId", "installationGeneration", "batchFingerprint");
CREATE UNIQUE INDEX "ReviewEmailBatch_id_store_key"
  ON "ReviewEmailBatch"("id", "storeId");
CREATE UNIQUE INDEX "IkasOrderSnapshot_id_store_key"
  ON "IkasOrderSnapshot"("id", "storeId");
CREATE UNIQUE INDEX "ReviewEmailBatch_live_delivery_group_key"
  ON "ReviewEmailBatch"("storeId", "installationGeneration", "orderSnapshotId", "deliveryGroupKey")
  WHERE "orderSnapshotId" IS NOT NULL;
CREATE INDEX "ReviewEmailBatch_orderSnapshotId_idx" ON "ReviewEmailBatch"("orderSnapshotId");
CREATE INDEX "ReviewEmailBatch_store_generation_status_send_idx"
  ON "ReviewEmailBatch"("storeId", "installationGeneration", "status", "sendAfter");
CREATE INDEX "ReviewEmailBatch_recipient_created_idx"
  ON "ReviewEmailBatch"("storeId", "recipientEmailFoldedHash", "createdAt");
CREATE INDEX "ReviewEmailBatch_status_expiresAt_idx" ON "ReviewEmailBatch"("status", "expiresAt");

ALTER TABLE "ReviewEmailBatch"
  ADD CONSTRAINT "ReviewEmailBatch_orderSnapshotId_storeId_fkey"
  FOREIGN KEY ("orderSnapshotId", "storeId") REFERENCES "IkasOrderSnapshot"("id", "storeId") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "PendingReviewImage"
  ADD COLUMN "reviewRequestId" TEXT,
  ADD COLUMN "reviewRequestSessionId" TEXT;
CREATE INDEX "PendingReviewImage_reviewRequestId_createdAt_idx"
  ON "PendingReviewImage"("reviewRequestId", "createdAt");
CREATE INDEX "PendingReviewImage_reviewRequestSessionId_createdAt_idx"
  ON "PendingReviewImage"("reviewRequestSessionId", "createdAt");
ALTER TABLE "PendingReviewImage"
  ADD CONSTRAINT "PendingReviewImage_reviewRequestId_fkey"
    FOREIGN KEY ("reviewRequestId") REFERENCES "ReviewRequest"("id") ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT "PendingReviewImage_reviewRequestSessionId_fkey"
    FOREIGN KEY ("reviewRequestSessionId") REFERENCES "ReviewRequestSession"("id") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "VideoUploadSession"
  ADD COLUMN "reviewRequestId" TEXT,
  ADD COLUMN "reviewRequestSessionId" TEXT;
CREATE INDEX "VideoUploadSession_reviewRequestId_createdAt_idx"
  ON "VideoUploadSession"("reviewRequestId", "createdAt");
CREATE INDEX "VideoUploadSession_reviewRequestSessionId_createdAt_idx"
  ON "VideoUploadSession"("reviewRequestSessionId", "createdAt");
ALTER TABLE "VideoUploadSession"
  ADD CONSTRAINT "VideoUploadSession_reviewRequestId_fkey"
    FOREIGN KEY ("reviewRequestId") REFERENCES "ReviewRequest"("id") ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT "VideoUploadSession_reviewRequestSessionId_fkey"
    FOREIGN KEY ("reviewRequestSessionId") REFERENCES "ReviewRequestSession"("id") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "ReviewRequest"
  ADD COLUMN "batchId" TEXT,
  ADD COLUMN "batchPosition" INTEGER,
  ADD COLUMN "membershipVersion" INTEGER NOT NULL DEFAULT 1,
  ADD COLUMN "sourceLineItemIds" JSONB,
  ADD COLUMN "skippedAt" TIMESTAMP(3),
  ADD COLUMN "skipReason" VARCHAR(128);
CREATE INDEX "ReviewRequest_batchId_batchPosition_idx" ON "ReviewRequest"("batchId", "batchPosition");
CREATE UNIQUE INDEX "ReviewRequest_batch_product_key"
  ON "ReviewRequest"("batchId", "productId") WHERE "batchId" IS NOT NULL;
ALTER TABLE "ReviewRequest"
  ADD CONSTRAINT "ReviewRequest_batchId_storeId_fkey"
  FOREIGN KEY ("batchId", "storeId") REFERENCES "ReviewEmailBatch"("id", "storeId") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "ReviewEmailJob"
  ALTER COLUMN "requestId" DROP NOT NULL,
  ALTER COLUMN "productId" DROP NOT NULL,
  ADD COLUMN "batchId" TEXT,
  ADD COLUMN "leaseVersion" INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN "expiresAt" TIMESTAMP(3);
CREATE INDEX "ReviewEmailJob_batchId_kind_idx" ON "ReviewEmailJob"("batchId", "kind");
CREATE UNIQUE INDEX "ReviewEmailJob_batch_kind_sequence_key"
  ON "ReviewEmailJob"("batchId", "kind", "sequence") WHERE "batchId" IS NOT NULL;
ALTER TABLE "ReviewEmailJob"
  ADD CONSTRAINT "ReviewEmailJob_batchId_storeId_fkey"
  FOREIGN KEY ("batchId", "storeId") REFERENCES "ReviewEmailBatch"("id", "storeId") ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT "ReviewEmailJob_target_xor_check"
  CHECK (("requestId" IS NOT NULL) <> ("batchId" IS NOT NULL));

ALTER TABLE "ReviewRequestToken"
  ALTER COLUMN "requestId" DROP NOT NULL,
  ADD COLUMN "batchId" TEXT;
CREATE INDEX "ReviewRequestToken_batchId_idx" ON "ReviewRequestToken"("batchId");
ALTER TABLE "ReviewRequestToken"
  ADD CONSTRAINT "ReviewRequestToken_batchId_fkey"
  FOREIGN KEY ("batchId") REFERENCES "ReviewEmailBatch"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT "ReviewRequestToken_target_xor_check"
  CHECK (("requestId" IS NOT NULL) <> ("batchId" IS NOT NULL));

ALTER TABLE "ReviewRequestSession"
  ALTER COLUMN "requestId" DROP NOT NULL,
  ADD COLUMN "batchId" TEXT;
CREATE INDEX "ReviewRequestSession_batchId_status_idx" ON "ReviewRequestSession"("batchId", "status");
ALTER TABLE "ReviewRequestSession"
  ADD CONSTRAINT "ReviewRequestSession_batchId_fkey"
  FOREIGN KEY ("batchId") REFERENCES "ReviewEmailBatch"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT "ReviewRequestSession_target_xor_check"
  CHECK (("requestId" IS NOT NULL) <> ("batchId" IS NOT NULL));

ALTER TABLE "ReviewEmailAttempt"
  ADD COLUMN "providerMessageIdHash" VARCHAR(128),
  ADD COLUMN "providerMessageIdHashKeyVersion" INTEGER,
  ADD COLUMN "recipientEmailFoldedHash" VARCHAR(128),
  ADD COLUMN "recipientEmailHashKeyVersion" INTEGER,
  ADD COLUMN "recipientEmailNormalizationVersion" INTEGER NOT NULL DEFAULT 2,
  ADD COLUMN "recipientEmailEncrypted" TEXT,
  ADD COLUMN "recipientVersion" INTEGER NOT NULL DEFAULT 1,
  ADD COLUMN "contentManifest" JSONB,
  ADD COLUMN "contentDigest" VARCHAR(64),
  ADD COLUMN "sendCommittedAt" TIMESTAMP(3),
  ADD COLUMN "confirmationDeadlineAt" TIMESTAMP(3),
  ADD COLUMN "firstDeliveryDelayedAt" TIMESTAMP(3),
  ADD COLUMN "lastDeliveryDelayedAt" TIMESTAMP(3),
  ADD COLUMN "deliveredAt" TIMESTAMP(3),
  ADD COLUMN "bouncedAt" TIMESTAMP(3),
  ADD COLUMN "complainedAt" TIMESTAMP(3),
  ADD COLUMN "rejectedAt" TIMESTAMP(3),
  ADD COLUMN "outcomeUnknownAt" TIMESTAMP(3),
  ADD COLUMN "analyticsClosedAt" TIMESTAMP(3),
  ADD COLUMN "piiScrubbedAt" TIMESTAMP(3);
CREATE INDEX "ReviewEmailAttempt_provider_providerMessageIdHash_idx"
  ON "ReviewEmailAttempt"("provider", "providerMessageIdHash");
CREATE INDEX "ReviewEmailAttempt_recipientEmailFoldedHash_sendCommittedAt_idx"
  ON "ReviewEmailAttempt"("recipientEmailFoldedHash", "sendCommittedAt");
ALTER TABLE "ReviewEmailAttempt"
  ADD CONSTRAINT "ReviewEmailAttempt_committed_recipient_check"
  CHECK (
    "sendCommittedAt" IS NULL OR "piiScrubbedAt" IS NOT NULL OR (
      "recipientEmailHash" IS NOT NULL AND
      "recipientEmailFoldedHash" IS NOT NULL AND
      "recipientEmailEncrypted" IS NOT NULL
    )
  );

ALTER TABLE "ReviewEmailEvent"
  ALTER COLUMN "snsMessageId" DROP NOT NULL,
  ADD COLUMN "transport" VARCHAR(32),
  ADD COLUMN "transportEventId" VARCHAR(256),
  ADD COLUMN "providerMessageIdHash" VARCHAR(128),
  ADD COLUMN "providerMessageIdHashKeyVersion" INTEGER;
UPDATE "ReviewEmailEvent"
SET "transport" = 'sns', "transportEventId" = "snsMessageId"
WHERE "snsMessageId" IS NOT NULL;
CREATE UNIQUE INDEX "ReviewEmailEvent_transport_event_key"
  ON "ReviewEmailEvent"("transport", "transportEventId")
  WHERE "transport" IS NOT NULL AND "transportEventId" IS NOT NULL;
CREATE INDEX "ReviewEmailEvent_transport_transportEventId_idx"
  ON "ReviewEmailEvent"("transport", "transportEventId");

ALTER TABLE "ReviewEmailSuppression"
  ADD COLUMN "category" VARCHAR(64) NOT NULL DEFAULT 'review_request',
  ADD COLUMN "recipientExactHash" VARCHAR(128),
  ADD COLUMN "recipientEmailEncrypted" TEXT,
  ADD COLUMN "installationGeneration" INTEGER,
  ADD COLUMN "status" VARCHAR(32) NOT NULL DEFAULT 'active',
  ADD COLUMN "bounceType" VARCHAR(64),
  ADD COLUMN "bounceSubType" VARCHAR(64);
CREATE INDEX "ReviewEmailSuppression_storeId_category_emailHash_status_idx"
  ON "ReviewEmailSuppression"("storeId", "category", "emailHash", "status");

CREATE TABLE "ReviewEmailUnsubscribeToken" (
  "id" TEXT NOT NULL,
  "storeId" TEXT NOT NULL,
  "category" VARCHAR(64) NOT NULL DEFAULT 'review_request',
  "recipientFoldedHash" VARCHAR(128) NOT NULL,
  "recipientExactHash" VARCHAR(128) NOT NULL,
  "recipientExactHashKeyVersion" INTEGER NOT NULL,
  "recipientEmailNormalizationVersion" INTEGER NOT NULL DEFAULT 2,
  "tokenHash" VARCHAR(64) NOT NULL,
  "tokenKeyVersion" INTEGER NOT NULL DEFAULT 1,
  "status" VARCHAR(32) NOT NULL DEFAULT 'active',
  "createdFromAttemptId" TEXT,
  "usedAt" TIMESTAMP(3),
  "revokedAt" TIMESTAMP(3),
  "expiresAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "ReviewEmailUnsubscribeToken_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "ReviewEmailUnsubscribeToken_tokenHash_key"
  ON "ReviewEmailUnsubscribeToken"("tokenHash");
CREATE INDEX "ReviewEmailUnsubscribeToken_scope_idx"
  ON "ReviewEmailUnsubscribeToken"("storeId", "category", "recipientFoldedHash", "status");
CREATE INDEX "ReviewEmailUnsubscribeToken_store_exact_idx"
  ON "ReviewEmailUnsubscribeToken"("storeId", "recipientExactHash");
CREATE UNIQUE INDEX "ReviewEmailUnsubscribeToken_createdFromAttemptId_key"
  ON "ReviewEmailUnsubscribeToken"("createdFromAttemptId");
CREATE INDEX "ReviewEmailUnsubscribeToken_status_expiresAt_idx"
  ON "ReviewEmailUnsubscribeToken"("status", "expiresAt");
ALTER TABLE "ReviewEmailUnsubscribeToken"
  ADD CONSTRAINT "ReviewEmailUnsubscribeToken_createdFromAttemptId_fkey"
  FOREIGN KEY ("createdFromAttemptId") REFERENCES "ReviewEmailAttempt"("id") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "ReviewEmailDailyMetric"
  ADD COLUMN "initialRequestsIncluded" INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN "reminderRequestsIncluded" INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN "batchesWithReview" INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN "completedBatches" INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN "skippedRequests" INTEGER NOT NULL DEFAULT 0;

ALTER TABLE "ReviewEmailMetricContribution"
  ADD COLUMN "batchId" TEXT;
CREATE INDEX "ReviewEmailMetricContribution_batchId_createdAt_idx"
  ON "ReviewEmailMetricContribution"("batchId", "createdAt");
ALTER TABLE "ReviewEmailMetricContribution"
  ADD CONSTRAINT "ReviewEmailMetricContribution_batchId_fkey"
  FOREIGN KEY ("batchId") REFERENCES "ReviewEmailBatch"("id") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "ReviewEmailBatch" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ReviewEmailUnsubscribeToken" ENABLE ROW LEVEL SECURITY;

DO $$
DECLARE
  role_name TEXT;
  table_list TEXT := '"ReviewEmailBatch", "ReviewEmailUnsubscribeToken"';
BEGIN
  FOREACH role_name IN ARRAY ARRAY['anon', 'authenticated']
  LOOP
    IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = role_name) THEN
      EXECUTE format('REVOKE ALL PRIVILEGES ON TABLE %s FROM %I', table_list, role_name);
    END IF;
  END LOOP;
END
$$;
