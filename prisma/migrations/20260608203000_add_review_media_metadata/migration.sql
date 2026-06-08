-- Additive media metadata read model fields.
-- Existing ReviewMedia/PendingReviewImage rows remain valid; metadata is
-- populated by new write paths and the repair/backfill script.

ALTER TABLE "ReviewMedia"
ADD COLUMN "assetId" VARCHAR(128),
ADD COLUMN "version" VARCHAR(64),
ADD COLUMN "resourceType" VARCHAR(32) NOT NULL DEFAULT 'image',
ADD COLUMN "format" VARCHAR(32),
ADD COLUMN "mimeType" VARCHAR(128),
ADD COLUMN "width" INTEGER,
ADD COLUMN "height" INTEGER,
ADD COLUMN "bytes" INTEGER,
ADD COLUMN "metadataSource" VARCHAR(64) NOT NULL DEFAULT 'unknown',
ADD COLUMN "metadataStatus" VARCHAR(64) NOT NULL DEFAULT 'pending',
ADD COLUMN "metadataFetchedAt" TIMESTAMP(3);

ALTER TABLE "PendingReviewImage"
ADD COLUMN "assetId" VARCHAR(128),
ADD COLUMN "version" VARCHAR(64),
ADD COLUMN "resourceType" VARCHAR(32) NOT NULL DEFAULT 'image',
ADD COLUMN "format" VARCHAR(32),
ADD COLUMN "mimeType" VARCHAR(128),
ADD COLUMN "width" INTEGER,
ADD COLUMN "height" INTEGER,
ADD COLUMN "bytes" INTEGER,
ADD COLUMN "metadataSource" VARCHAR(64) NOT NULL DEFAULT 'unknown',
ADD COLUMN "metadataStatus" VARCHAR(64) NOT NULL DEFAULT 'pending',
ADD COLUMN "metadataFetchedAt" TIMESTAMP(3);

CREATE INDEX "ReviewMedia_metadataStatus_createdAt_idx"
ON "ReviewMedia"("metadataStatus", "createdAt");

CREATE INDEX "PendingReviewImage_metadataStatus_createdAt_idx"
ON "PendingReviewImage"("metadataStatus", "createdAt");
