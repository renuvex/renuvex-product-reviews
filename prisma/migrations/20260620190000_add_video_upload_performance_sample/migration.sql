-- Additive upload timing table for Mux performance diagnostics.
-- Stores sanitized one-row-per-session metrics only; no tokens, upload URLs,
-- signed URLs, provider playback IDs, raw user-agent, IP, or file names.
CREATE TABLE "VideoUploadPerformanceSample" (
    "id" TEXT NOT NULL,
    "uploadSessionId" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "provider" VARCHAR(64) NOT NULL,
    "fileBytes" INTEGER NOT NULL,
    "chunkSizeKb" INTEGER NOT NULL,
    "chunkAttempts" INTEGER NOT NULL,
    "retryClicks" INTEGER NOT NULL DEFAULT 0,
    "upchunkErrors" INTEGER NOT NULL DEFAULT 0,
    "firstErrorCode" VARCHAR(128),
    "directUploadMs" INTEGER,
    "completeMs" INTEGER,
    "processingPollMs" INTEGER,
    "totalClientMs" INTEGER,
    "finalStatus" VARCHAR(32) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VideoUploadPerformanceSample_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "VideoUploadPerformanceSample_uploadSessionId_key" ON "VideoUploadPerformanceSample"("uploadSessionId");
CREATE INDEX "VideoUploadPerformanceSample_storeId_productId_createdAt_idx" ON "VideoUploadPerformanceSample"("storeId", "productId", "createdAt");
CREATE INDEX "VideoUploadPerformanceSample_provider_finalStatus_createdAt_idx" ON "VideoUploadPerformanceSample"("provider", "finalStatus", "createdAt");
CREATE INDEX "VideoUploadPerformanceSample_createdAt_idx" ON "VideoUploadPerformanceSample"("createdAt");

ALTER TABLE "VideoUploadPerformanceSample"
  ADD CONSTRAINT "VideoUploadPerformanceSample_uploadSessionId_fkey"
  FOREIGN KEY ("uploadSessionId") REFERENCES "VideoUploadSession"("id")
  ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "VideoUploadPerformanceSample" ENABLE ROW LEVEL SECURITY;
