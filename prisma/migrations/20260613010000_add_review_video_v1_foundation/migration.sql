-- Review video V1 foundation. This migration is additive so the previous
-- deployment remains compatible while prisma migrate deploy runs.

ALTER TABLE "Review"
ADD COLUMN "hasVideo" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN "moderationVersion" INTEGER NOT NULL DEFAULT 0;

CREATE INDEX "Review_storeId_productId_status_hasVideo_idx"
ON "Review"("storeId", "productId", "status", "hasVideo");

ALTER TABLE "ReviewMedia"
ADD COLUMN "provider" VARCHAR(64) NOT NULL DEFAULT 'cloudinary',
ADD COLUMN "providerAssetId" VARCHAR(512),
ADD COLUMN "posterUrl" VARCHAR(2048),
ADD COLUMN "durationMs" INTEGER,
ADD COLUMN "processingStatus" VARCHAR(32) NOT NULL DEFAULT 'ready',
ADD COLUMN "sourceProvider" VARCHAR(64),
ADD COLUMN "sourceAssetId" VARCHAR(1024);

CREATE INDEX "ReviewMedia_provider_providerAssetId_idx"
ON "ReviewMedia"("provider", "providerAssetId");

CREATE INDEX "ReviewMedia_processingStatus_createdAt_idx"
ON "ReviewMedia"("processingStatus", "createdAt");

ALTER TABLE "StoreSettings"
ADD COLUMN "videoMonthlyLimit" INTEGER NOT NULL DEFAULT 0;

ALTER TABLE "PendingReviewImage"
ADD COLUMN "productId" TEXT,
ADD COLUMN "uploadSessionId" TEXT,
ADD COLUMN "url" VARCHAR(2048),
ADD COLUMN "provider" VARCHAR(64) NOT NULL DEFAULT 'cloudinary',
ADD COLUMN "providerAssetId" VARCHAR(512),
ADD COLUMN "posterUrl" VARCHAR(2048),
ADD COLUMN "durationMs" INTEGER,
ADD COLUMN "processingStatus" VARCHAR(32) NOT NULL DEFAULT 'ready',
ADD COLUMN "sourceProvider" VARCHAR(64),
ADD COLUMN "sourceAssetId" VARCHAR(1024);

CREATE UNIQUE INDEX "PendingReviewImage_uploadSessionId_key"
ON "PendingReviewImage"("uploadSessionId");

CREATE INDEX "PendingReviewImage_provider_providerAssetId_idx"
ON "PendingReviewImage"("provider", "providerAssetId");

CREATE INDEX "PendingReviewImage_processingStatus_createdAt_idx"
ON "PendingReviewImage"("processingStatus", "createdAt");

CREATE TABLE "VideoUploadSession" (
  "id" TEXT NOT NULL,
  "tokenHash" VARCHAR(64) NOT NULL,
  "storeId" TEXT NOT NULL,
  "productId" TEXT NOT NULL,
  "status" VARCHAR(32) NOT NULL DEFAULT 'initiated',
  "mimeType" VARCHAR(128) NOT NULL,
  "bytes" INTEGER NOT NULL,
  "fileFingerprint" VARCHAR(128),
  "r2UploadId" VARCHAR(1024),
  "masterObjectKey" VARCHAR(1024) NOT NULL,
  "ingestObjectKey" VARCHAR(1024),
  "streamUid" VARCHAR(128),
  "publicId" VARCHAR(512),
  "playbackUrl" VARCHAR(2048),
  "posterUrl" VARCHAR(2048),
  "durationMs" INTEGER,
  "reservedMonth" DATE NOT NULL,
  "expiresAt" TIMESTAMP(3) NOT NULL,
  "consumedAt" TIMESTAMP(3),
  "errorCode" VARCHAR(128),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "VideoUploadSession_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "VideoUploadSession_tokenHash_key" ON "VideoUploadSession"("tokenHash");
CREATE UNIQUE INDEX "VideoUploadSession_masterObjectKey_key" ON "VideoUploadSession"("masterObjectKey");
CREATE UNIQUE INDEX "VideoUploadSession_ingestObjectKey_key" ON "VideoUploadSession"("ingestObjectKey");
CREATE UNIQUE INDEX "VideoUploadSession_streamUid_key" ON "VideoUploadSession"("streamUid");
CREATE UNIQUE INDEX "VideoUploadSession_publicId_key" ON "VideoUploadSession"("publicId");
CREATE INDEX "VideoUploadSession_storeId_productId_status_idx" ON "VideoUploadSession"("storeId", "productId", "status");
CREATE INDEX "VideoUploadSession_status_expiresAt_idx" ON "VideoUploadSession"("status", "expiresAt");
CREATE INDEX "VideoUploadSession_createdAt_idx" ON "VideoUploadSession"("createdAt");

CREATE TABLE "StoreVideoUsage" (
  "storeId" TEXT NOT NULL,
  "month" DATE NOT NULL,
  "reservedCount" INTEGER NOT NULL DEFAULT 0,
  "consumedCount" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "StoreVideoUsage_pkey" PRIMARY KEY ("storeId", "month")
);

CREATE INDEX "StoreVideoUsage_month_idx" ON "StoreVideoUsage"("month");

CREATE TABLE "MediaProviderJob" (
  "id" TEXT NOT NULL,
  "dedupeKey" VARCHAR(256) NOT NULL,
  "storeId" TEXT,
  "reviewId" TEXT,
  "mediaId" TEXT,
  "uploadSessionId" TEXT,
  "provider" VARCHAR(64) NOT NULL,
  "action" VARCHAR(64) NOT NULL,
  "resourceType" VARCHAR(32) NOT NULL,
  "payload" JSONB NOT NULL,
  "status" VARCHAR(32) NOT NULL DEFAULT 'pending',
  "attempts" INTEGER NOT NULL DEFAULT 0,
  "maxAttempts" INTEGER NOT NULL DEFAULT 8,
  "availableAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "lockedAt" TIMESTAMP(3),
  "completedAt" TIMESTAMP(3),
  "lastErrorCode" VARCHAR(128),
  "lastErrorAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "MediaProviderJob_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "MediaProviderJob_dedupeKey_key" ON "MediaProviderJob"("dedupeKey");
CREATE INDEX "MediaProviderJob_status_availableAt_idx" ON "MediaProviderJob"("status", "availableAt");
CREATE INDEX "MediaProviderJob_provider_action_createdAt_idx" ON "MediaProviderJob"("provider", "action", "createdAt");
CREATE INDEX "MediaProviderJob_uploadSessionId_idx" ON "MediaProviderJob"("uploadSessionId");
CREATE INDEX "MediaProviderJob_reviewId_idx" ON "MediaProviderJob"("reviewId");
