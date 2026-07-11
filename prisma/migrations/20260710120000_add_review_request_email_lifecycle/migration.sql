-- Additive review-request email lifecycle schema (ADR_0036).
-- This migration is intentionally expand-only so the previous application
-- deployment can continue serving while the new code is rolled out.

ALTER TABLE "Review"
  ADD COLUMN "reviewRequestId" TEXT,
  ADD COLUMN "verifiedBuyer" BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN "verifiedAt" TIMESTAMP(3),
  ADD COLUMN "verificationSource" VARCHAR(64);

CREATE UNIQUE INDEX "Review_reviewRequestId_key" ON "Review"("reviewRequestId");
CREATE INDEX "Review_storeId_verifiedBuyer_createdAt_idx" ON "Review"("storeId", "verifiedBuyer", "createdAt");

CREATE TABLE "ReviewEmailSettings" (
  "id" TEXT NOT NULL,
  "storeId" TEXT NOT NULL,
  "enabled" BOOLEAN NOT NULL DEFAULT false,
  "triggerMode" VARCHAR(32) NOT NULL DEFAULT 'delivery',
  "consentMode" VARCHAR(64) NOT NULL DEFAULT 'strict_notifications_accepted',
  "firstDelayDays" INTEGER NOT NULL DEFAULT 1,
  "reminderEnabled" BOOLEAN NOT NULL DEFAULT true,
  "reminderDelayDays" INTEGER NOT NULL DEFAULT 1,
  "maxReminderCount" INTEGER NOT NULL DEFAULT 1,
  "senderDisplayName" VARCHAR(128),
  "replyToEmailHash" VARCHAR(128),
  "replyToEmailEncrypted" TEXT,
  "replyToName" VARCHAR(128),
  "logoUrl" VARCHAR(2048),
  "buttonColor" VARCHAR(32),
  "locale" VARCHAR(16) NOT NULL DEFAULT 'tr',
  "templateVersion" VARCHAR(64) NOT NULL DEFAULT 'default_v1',
  "orderWebhookStatus" VARCHAR(32) NOT NULL DEFAULT 'unregistered',
  "orderWebhookVerifiedAt" TIMESTAMP(3),
  "orderWebhookLastErrorCode" VARCHAR(128),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "ReviewEmailSettings_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "ReviewEmailSettings_storeId_key" ON "ReviewEmailSettings"("storeId");
CREATE INDEX "ReviewEmailSettings_enabled_updatedAt_idx" ON "ReviewEmailSettings"("enabled", "updatedAt");

CREATE TABLE "IkasOrderWebhookEvent" (
  "id" TEXT NOT NULL,
  "providerEventId" VARCHAR(256) NOT NULL,
  "scope" VARCHAR(128) NOT NULL,
  "storeId" VARCHAR(128) NOT NULL,
  "authorizedAppId" VARCHAR(128) NOT NULL,
  "ikasOrderId" VARCHAR(128),
  "payloadDigest" VARCHAR(64),
  "status" VARCHAR(32) NOT NULL DEFAULT 'received',
  "receivedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "processedAt" TIMESTAMP(3),
  "lastErrorCode" VARCHAR(128),
  CONSTRAINT "IkasOrderWebhookEvent_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "IkasOrderWebhookEvent_providerEventId_key" ON "IkasOrderWebhookEvent"("providerEventId");
CREATE INDEX "IkasOrderWebhookEvent_storeId_receivedAt_idx" ON "IkasOrderWebhookEvent"("storeId", "receivedAt");
CREATE INDEX "IkasOrderWebhookEvent_status_receivedAt_idx" ON "IkasOrderWebhookEvent"("status", "receivedAt");
CREATE INDEX "IkasOrderWebhookEvent_ikasOrderId_idx" ON "IkasOrderWebhookEvent"("ikasOrderId");

CREATE TABLE "IkasOrderSnapshot" (
  "id" TEXT NOT NULL,
  "storeId" TEXT NOT NULL,
  "authorizedAppId" VARCHAR(128) NOT NULL,
  "ikasOrderId" VARCHAR(128) NOT NULL,
  "orderNumber" VARCHAR(128),
  "shippingMethod" VARCHAR(64) NOT NULL,
  "orderStatus" VARCHAR(64) NOT NULL,
  "orderPackageStatus" VARCHAR(64),
  "orderPaymentStatus" VARCHAR(64),
  "orderedAt" TIMESTAMP(3),
  "ikasUpdatedAt" TIMESTAMP(3),
  "notificationsAccepted" BOOLEAN,
  "guestCheckout" BOOLEAN,
  "customerId" VARCHAR(128),
  "customerEmailHash" VARCHAR(128),
  "customerEmailEncrypted" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "IkasOrderSnapshot_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "IkasOrderSnapshot_storeId_ikasOrderId_key" ON "IkasOrderSnapshot"("storeId", "ikasOrderId");
CREATE INDEX "IkasOrderSnapshot_storeId_ikasUpdatedAt_idx" ON "IkasOrderSnapshot"("storeId", "ikasUpdatedAt");
CREATE INDEX "IkasOrderSnapshot_storeId_customerEmailHash_idx" ON "IkasOrderSnapshot"("storeId", "customerEmailHash");
CREATE INDEX "IkasOrderSnapshot_orderPackageStatus_ikasUpdatedAt_idx" ON "IkasOrderSnapshot"("orderPackageStatus", "ikasUpdatedAt");

CREATE TABLE "IkasOrderLineSnapshot" (
  "id" TEXT NOT NULL,
  "storeId" TEXT NOT NULL,
  "orderSnapshotId" TEXT NOT NULL,
  "ikasOrderId" VARCHAR(128) NOT NULL,
  "ikasOrderLineItemId" VARCHAR(128) NOT NULL,
  "productId" VARCHAR(128) NOT NULL,
  "variantId" VARCHAR(128),
  "lineStatus" VARCHAR(64) NOT NULL,
  "lineStatusUpdatedAt" TIMESTAMP(3),
  "quantity" DOUBLE PRECISION,
  "productName" VARCHAR(512),
  "variantName" VARCHAR(512),
  "packageId" VARCHAR(128),
  "packageStatus" VARCHAR(64),
  "eligibleAt" TIMESTAMP(3),
  "ineligibleReason" VARCHAR(128),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "IkasOrderLineSnapshot_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "IkasOrderLineSnapshot_storeId_ikasOrderLineItemId_key" ON "IkasOrderLineSnapshot"("storeId", "ikasOrderLineItemId");
CREATE INDEX "IkasOrderLineSnapshot_orderSnapshotId_idx" ON "IkasOrderLineSnapshot"("orderSnapshotId");
CREATE INDEX "IkasOrderLineSnapshot_storeId_productId_idx" ON "IkasOrderLineSnapshot"("storeId", "productId");
CREATE INDEX "IkasOrderLineSnapshot_storeId_eligibleAt_idx" ON "IkasOrderLineSnapshot"("storeId", "eligibleAt");
CREATE INDEX "IkasOrderLineSnapshot_lineStatus_eligibleAt_idx" ON "IkasOrderLineSnapshot"("lineStatus", "eligibleAt");

CREATE TABLE "ReviewRequest" (
  "id" TEXT NOT NULL,
  "storeId" TEXT NOT NULL,
  "productId" VARCHAR(128) NOT NULL,
  "orderSnapshotId" TEXT NOT NULL,
  "orderLineSnapshotId" TEXT NOT NULL,
  "status" VARCHAR(32) NOT NULL DEFAULT 'scheduled',
  "eligibleAt" TIMESTAMP(3),
  "sendAfter" TIMESTAMP(3),
  "firstDelayDaysSnapshot" INTEGER NOT NULL DEFAULT 1,
  "reminderDelayDaysSnapshot" INTEGER NOT NULL DEFAULT 1,
  "maxReminderCountSnapshot" INTEGER NOT NULL DEFAULT 1,
  "triggerModeSnapshot" VARCHAR(32) NOT NULL DEFAULT 'delivery',
  "consentModeSnapshot" VARCHAR(64) NOT NULL DEFAULT 'strict_notifications_accepted',
  "notificationsAcceptedSnapshot" BOOLEAN,
  "templateVersionSnapshot" VARCHAR(64) NOT NULL DEFAULT 'default_v1',
  "localeSnapshot" VARCHAR(16) NOT NULL DEFAULT 'tr',
  "recipientEmailHash" VARCHAR(128),
  "recipientEmailEncrypted" TEXT,
  "firstSentAt" TIMESTAMP(3),
  "lastReminderSentAt" TIMESTAMP(3),
  "reminderCount" INTEGER NOT NULL DEFAULT 0,
  "submittedAt" TIMESTAMP(3),
  "expiresAt" TIMESTAMP(3),
  "cancelledAt" TIMESTAMP(3),
  "cancellationReason" VARCHAR(128),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "ReviewRequest_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "ReviewRequest_storeId_orderLineSnapshotId_key" ON "ReviewRequest"("storeId", "orderLineSnapshotId");
CREATE INDEX "ReviewRequest_orderSnapshotId_idx" ON "ReviewRequest"("orderSnapshotId");
CREATE INDEX "ReviewRequest_orderLineSnapshotId_idx" ON "ReviewRequest"("orderLineSnapshotId");
CREATE INDEX "ReviewRequest_status_sendAfter_idx" ON "ReviewRequest"("status", "sendAfter");
CREATE INDEX "ReviewRequest_storeId_status_sendAfter_idx" ON "ReviewRequest"("storeId", "status", "sendAfter");
CREATE INDEX "ReviewRequest_storeId_productId_status_idx" ON "ReviewRequest"("storeId", "productId", "status");

CREATE TABLE "ReviewEmailJob" (
  "id" TEXT NOT NULL,
  "requestId" TEXT NOT NULL,
  "storeId" TEXT NOT NULL,
  "productId" VARCHAR(128) NOT NULL,
  "kind" VARCHAR(32) NOT NULL,
  "sequence" INTEGER NOT NULL DEFAULT 0,
  "status" VARCHAR(32) NOT NULL DEFAULT 'pending',
  "sendAfter" TIMESTAMP(3) NOT NULL,
  "dedupeKey" VARCHAR(256) NOT NULL,
  "leaseOwner" VARCHAR(128),
  "leaseExpiresAt" TIMESTAMP(3),
  "dispatchedAt" TIMESTAMP(3),
  "queueMessageId" VARCHAR(256),
  "completedAt" TIMESTAMP(3),
  "dispatchAttempts" INTEGER NOT NULL DEFAULT 0,
  "lastErrorCode" VARCHAR(128),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "ReviewEmailJob_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "ReviewEmailJob_dedupeKey_key" ON "ReviewEmailJob"("dedupeKey");
CREATE UNIQUE INDEX "ReviewEmailJob_requestId_kind_sequence_key" ON "ReviewEmailJob"("requestId", "kind", "sequence");
CREATE INDEX "ReviewEmailJob_requestId_kind_idx" ON "ReviewEmailJob"("requestId", "kind");
CREATE INDEX "ReviewEmailJob_storeId_status_sendAfter_idx" ON "ReviewEmailJob"("storeId", "status", "sendAfter");
CREATE INDEX "ReviewEmailJob_kind_status_sendAfter_idx" ON "ReviewEmailJob"("kind", "status", "sendAfter");
CREATE INDEX "ReviewEmailJob_leaseExpiresAt_idx" ON "ReviewEmailJob"("leaseExpiresAt");

CREATE TABLE "ReviewEmailAttempt" (
  "id" TEXT NOT NULL,
  "jobId" TEXT NOT NULL,
  "attemptNumber" INTEGER NOT NULL,
  "correlationId" VARCHAR(64) NOT NULL,
  "provider" VARCHAR(64) NOT NULL DEFAULT 'ses',
  "providerMessageId" VARCHAR(256),
  "recipientEmailHash" VARCHAR(128),
  "templateVersion" VARCHAR(64) NOT NULL DEFAULT 'default_v1',
  "locale" VARCHAR(16) NOT NULL DEFAULT 'tr',
  "status" VARCHAR(32) NOT NULL DEFAULT 'prepared',
  "sendInitiatedAt" TIMESTAMP(3),
  "acceptedAt" TIMESTAMP(3),
  "deliveryConfirmedAt" TIMESTAMP(3),
  "completedAt" TIMESTAMP(3),
  "errorCode" VARCHAR(128),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "ReviewEmailAttempt_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "ReviewEmailAttempt_correlationId_key" ON "ReviewEmailAttempt"("correlationId");
CREATE UNIQUE INDEX "ReviewEmailAttempt_jobId_attemptNumber_key" ON "ReviewEmailAttempt"("jobId", "attemptNumber");
CREATE INDEX "ReviewEmailAttempt_jobId_idx" ON "ReviewEmailAttempt"("jobId");
CREATE INDEX "ReviewEmailAttempt_provider_providerMessageId_idx" ON "ReviewEmailAttempt"("provider", "providerMessageId");
CREATE INDEX "ReviewEmailAttempt_status_createdAt_idx" ON "ReviewEmailAttempt"("status", "createdAt");

CREATE TABLE "ReviewRequestToken" (
  "id" TEXT NOT NULL,
  "requestId" TEXT NOT NULL,
  "attemptId" TEXT NOT NULL,
  "tokenHash" VARCHAR(64) NOT NULL,
  "tokenKeyVersion" INTEGER NOT NULL DEFAULT 1,
  "status" VARCHAR(32) NOT NULL DEFAULT 'prepared',
  "expiresAt" TIMESTAMP(3),
  "consumedAt" TIMESTAMP(3),
  "revokedAt" TIMESTAMP(3),
  "revocationReason" VARCHAR(128),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "ReviewRequestToken_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "ReviewRequestToken_attemptId_key" ON "ReviewRequestToken"("attemptId");
CREATE UNIQUE INDEX "ReviewRequestToken_tokenHash_key" ON "ReviewRequestToken"("tokenHash");
CREATE INDEX "ReviewRequestToken_requestId_idx" ON "ReviewRequestToken"("requestId");
CREATE INDEX "ReviewRequestToken_status_expiresAt_idx" ON "ReviewRequestToken"("status", "expiresAt");

CREATE TABLE "ReviewRequestSession" (
  "id" TEXT NOT NULL,
  "requestId" TEXT NOT NULL,
  "tokenId" TEXT NOT NULL,
  "sessionHash" VARCHAR(64) NOT NULL,
  "status" VARCHAR(32) NOT NULL DEFAULT 'active',
  "expiresAt" TIMESTAMP(3) NOT NULL,
  "consumedAt" TIMESTAMP(3),
  "revokedAt" TIMESTAMP(3),
  "revocationReason" VARCHAR(128),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "ReviewRequestSession_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "ReviewRequestSession_sessionHash_key" ON "ReviewRequestSession"("sessionHash");
CREATE INDEX "ReviewRequestSession_requestId_status_idx" ON "ReviewRequestSession"("requestId", "status");
CREATE INDEX "ReviewRequestSession_tokenId_idx" ON "ReviewRequestSession"("tokenId");
CREATE INDEX "ReviewRequestSession_status_expiresAt_idx" ON "ReviewRequestSession"("status", "expiresAt");

CREATE TABLE "ReviewEmailEvent" (
  "id" TEXT NOT NULL,
  "snsMessageId" VARCHAR(256) NOT NULL,
  "providerMessageId" VARCHAR(256),
  "eventType" VARCHAR(64),
  "attemptId" TEXT,
  "status" VARCHAR(32) NOT NULL DEFAULT 'received',
  "payloadDigest" VARCHAR(64),
  "bounceType" VARCHAR(64),
  "bounceSubType" VARCHAR(64),
  "complaintFeedbackType" VARCHAR(64),
  "providerTimestamp" TIMESTAMP(3),
  "receivedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "processedAt" TIMESTAMP(3),
  CONSTRAINT "ReviewEmailEvent_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "ReviewEmailEvent_snsMessageId_key" ON "ReviewEmailEvent"("snsMessageId");
CREATE INDEX "ReviewEmailEvent_attemptId_idx" ON "ReviewEmailEvent"("attemptId");
CREATE INDEX "ReviewEmailEvent_providerMessageId_idx" ON "ReviewEmailEvent"("providerMessageId");
CREATE INDEX "ReviewEmailEvent_eventType_receivedAt_idx" ON "ReviewEmailEvent"("eventType", "receivedAt");
CREATE INDEX "ReviewEmailEvent_status_receivedAt_idx" ON "ReviewEmailEvent"("status", "receivedAt");

CREATE TABLE "ReviewEmailSuppression" (
  "id" TEXT NOT NULL,
  "storeId" TEXT NOT NULL,
  "emailHash" VARCHAR(128) NOT NULL,
  "reason" VARCHAR(64) NOT NULL,
  "source" VARCHAR(64) NOT NULL,
  "providerEventId" VARCHAR(256),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "expiresAt" TIMESTAMP(3),
  "releasedAt" TIMESTAMP(3),
  CONSTRAINT "ReviewEmailSuppression_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "ReviewEmailSuppression_storeId_emailHash_reason_key" ON "ReviewEmailSuppression"("storeId", "emailHash", "reason");
CREATE INDEX "ReviewEmailSuppression_storeId_emailHash_idx" ON "ReviewEmailSuppression"("storeId", "emailHash");
CREATE INDEX "ReviewEmailSuppression_reason_createdAt_idx" ON "ReviewEmailSuppression"("reason", "createdAt");

CREATE TABLE "IkasOrderReconciliationCursor" (
  "storeId" TEXT NOT NULL,
  "authorizedAppId" VARCHAR(128),
  "lastCheckpointAt" TIMESTAMP(3),
  "overlapMinutes" INTEGER NOT NULL DEFAULT 15,
  "leaseOwner" VARCHAR(128),
  "leaseExpiresAt" TIMESTAMP(3),
  "leaseVersion" INTEGER NOT NULL DEFAULT 0,
  "windowStart" TIMESTAMP(3),
  "windowEnd" TIMESTAMP(3),
  "nextPage" INTEGER NOT NULL DEFAULT 1,
  "status" VARCHAR(32) NOT NULL DEFAULT 'idle',
  "lastSuccessAt" TIMESTAMP(3),
  "lastErrorAt" TIMESTAMP(3),
  "lastErrorCode" VARCHAR(128),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "IkasOrderReconciliationCursor_pkey" PRIMARY KEY ("storeId")
);

CREATE INDEX "IkasOrderReconciliationCursor_status_updatedAt_idx" ON "IkasOrderReconciliationCursor"("status", "updatedAt");

CREATE TABLE "StoreDataErasureRun" (
  "id" TEXT NOT NULL,
  "storeId" TEXT NOT NULL,
  "triggerSource" VARCHAR(64) NOT NULL,
  "status" VARCHAR(32) NOT NULL DEFAULT 'processing',
  "attempts" INTEGER NOT NULL DEFAULT 0,
  "nextRetryAt" TIMESTAMP(3),
  "rowCounts" JSONB,
  "progress" JSONB,
  "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "finishedAt" TIMESTAMP(3),
  "sanitizedErrorCode" VARCHAR(128),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "StoreDataErasureRun_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "StoreDataErasureRun_storeId_startedAt_idx" ON "StoreDataErasureRun"("storeId", "startedAt");
CREATE INDEX "StoreDataErasureRun_status_startedAt_idx" ON "StoreDataErasureRun"("status", "startedAt");
CREATE INDEX "StoreDataErasureRun_status_nextRetryAt_idx" ON "StoreDataErasureRun"("status", "nextRetryAt");

ALTER TABLE "Review"
  ADD CONSTRAINT "Review_reviewRequestId_fkey"
  FOREIGN KEY ("reviewRequestId") REFERENCES "ReviewRequest"("id") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "IkasOrderLineSnapshot"
  ADD CONSTRAINT "IkasOrderLineSnapshot_orderSnapshotId_fkey"
  FOREIGN KEY ("orderSnapshotId") REFERENCES "IkasOrderSnapshot"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "ReviewRequest"
  ADD CONSTRAINT "ReviewRequest_orderSnapshotId_fkey"
  FOREIGN KEY ("orderSnapshotId") REFERENCES "IkasOrderSnapshot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "ReviewRequest"
  ADD CONSTRAINT "ReviewRequest_orderLineSnapshotId_fkey"
  FOREIGN KEY ("orderLineSnapshotId") REFERENCES "IkasOrderLineSnapshot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "ReviewEmailJob"
  ADD CONSTRAINT "ReviewEmailJob_requestId_fkey"
  FOREIGN KEY ("requestId") REFERENCES "ReviewRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "ReviewEmailAttempt"
  ADD CONSTRAINT "ReviewEmailAttempt_jobId_fkey"
  FOREIGN KEY ("jobId") REFERENCES "ReviewEmailJob"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "ReviewRequestToken"
  ADD CONSTRAINT "ReviewRequestToken_requestId_fkey"
  FOREIGN KEY ("requestId") REFERENCES "ReviewRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "ReviewRequestToken"
  ADD CONSTRAINT "ReviewRequestToken_attemptId_fkey"
  FOREIGN KEY ("attemptId") REFERENCES "ReviewEmailAttempt"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "ReviewRequestSession"
  ADD CONSTRAINT "ReviewRequestSession_requestId_fkey"
  FOREIGN KEY ("requestId") REFERENCES "ReviewRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "ReviewRequestSession"
  ADD CONSTRAINT "ReviewRequestSession_tokenId_fkey"
  FOREIGN KEY ("tokenId") REFERENCES "ReviewRequestToken"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "ReviewEmailEvent"
  ADD CONSTRAINT "ReviewEmailEvent_attemptId_fkey"
  FOREIGN KEY ("attemptId") REFERENCES "ReviewEmailAttempt"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- These tables contain tenant settings, order/customer evidence, token hashes,
-- encrypted email addresses, delivery attempts, and erasure evidence. They are
-- server-only and intentionally have no browser-facing RLS policies.
ALTER TABLE "ReviewEmailSettings" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "IkasOrderWebhookEvent" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "IkasOrderSnapshot" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "IkasOrderLineSnapshot" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ReviewRequest" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ReviewRequestToken" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ReviewRequestSession" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ReviewEmailJob" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ReviewEmailAttempt" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ReviewEmailEvent" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ReviewEmailSuppression" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "IkasOrderReconciliationCursor" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "StoreDataErasureRun" ENABLE ROW LEVEL SECURITY;

-- Supabase exposes anon/authenticated roles, while the disposable local
-- PostgreSQL migration test does not. Revoke only when each role exists.
DO $$
DECLARE
  role_name TEXT;
  table_list TEXT := '"ReviewEmailSettings", "IkasOrderWebhookEvent", "IkasOrderSnapshot", "IkasOrderLineSnapshot", "ReviewRequest", "ReviewRequestToken", "ReviewRequestSession", "ReviewEmailJob", "ReviewEmailAttempt", "ReviewEmailEvent", "ReviewEmailSuppression", "IkasOrderReconciliationCursor", "StoreDataErasureRun"';
BEGIN
  FOREACH role_name IN ARRAY ARRAY['anon', 'authenticated']
  LOOP
    IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = role_name) THEN
      EXECUTE format('REVOKE ALL PRIVILEGES ON TABLE %s FROM %I', table_list, role_name);
    END IF;
  END LOOP;
END
$$;
