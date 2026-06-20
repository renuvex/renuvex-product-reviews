-- ADR_0032 Review video Mux additive migration.
-- Provider-agnostic columns on "VideoUploadSession" + a "WebhookEvent" table.
-- Previous provider-specific columns are dropped by the later contract migration,
-- so the previous deployment keeps working during the deploy overlap.

-- Provider-agnostic identity (nullable; "provider" is written explicitly by the app).
-- NOTE: the previous provider object key stays NOT NULL here; it is relaxed to
-- nullable in the later backend-cutover migration, so each deploy's previous
-- code keeps compiling.
ALTER TABLE "VideoUploadSession"
  ADD COLUMN "provider" VARCHAR(64),
  ADD COLUMN "providerUploadId" VARCHAR(256),
  ADD COLUMN "providerAssetId" VARCHAR(256),
  ADD COLUMN "signedPlaybackId" VARCHAR(256),
  ADD COLUMN "publicPlaybackId" VARCHAR(256);

-- Provider-scoped uniqueness (Postgres treats NULLs as distinct, so pre-asset
-- rows with NULL ids do not collide).
CREATE UNIQUE INDEX "VideoUploadSession_provider_providerUploadId_key" ON "VideoUploadSession"("provider", "providerUploadId");
CREATE UNIQUE INDEX "VideoUploadSession_provider_providerAssetId_key" ON "VideoUploadSession"("provider", "providerAssetId");

-- Webhook idempotency + audit (dedup/audit only; retry lives in MediaProviderJob).
CREATE TABLE "WebhookEvent" (
  "id" TEXT NOT NULL,
  "provider" VARCHAR(64) NOT NULL,
  "providerEventId" VARCHAR(256) NOT NULL,
  "eventType" VARCHAR(128) NOT NULL,
  "providerUploadId" VARCHAR(256),
  "providerAssetId" VARCHAR(256),
  "sessionId" TEXT,
  "providerEventCreatedAt" TIMESTAMP(3),
  "receivedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "processedAt" TIMESTAMP(3),
  "status" VARCHAR(32) NOT NULL DEFAULT 'received',
  "lastError" VARCHAR(512),
  "payloadDigest" VARCHAR(64),
  CONSTRAINT "WebhookEvent_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "WebhookEvent_provider_providerEventId_key" ON "WebhookEvent"("provider", "providerEventId");
CREATE INDEX "WebhookEvent_status_receivedAt_idx" ON "WebhookEvent"("status", "receivedAt");
