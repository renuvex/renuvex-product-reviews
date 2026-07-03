-- Expand-only migration for ADR_0034 AWS review image provider.
-- No drops, renames, non-null constraints, or provider cutover are applied here.

ALTER TABLE "ReviewMedia"
  ADD COLUMN "sourceChecksumAlgorithm" VARCHAR(16),
  ADD COLUMN "sourceChecksumSha256" VARCHAR(128),
  ADD COLUMN "variantStatus" VARCHAR(32) NOT NULL DEFAULT 'pending',
  ADD COLUMN "variantGeneratedAt" TIMESTAMP(3),
  ADD COLUMN "variantPublishedAt" TIMESTAMP(3),
  ADD COLUMN "variantRevokedAt" TIMESTAMP(3),
  ADD COLUMN "variantErrorCode" VARCHAR(128),
  ADD COLUMN "variantManifest" JSONB;

ALTER TABLE "PendingReviewImage"
  ADD COLUMN "sourceChecksumAlgorithm" VARCHAR(16),
  ADD COLUMN "sourceChecksumSha256" VARCHAR(128),
  ADD COLUMN "variantStatus" VARCHAR(32) NOT NULL DEFAULT 'pending',
  ADD COLUMN "variantGeneratedAt" TIMESTAMP(3),
  ADD COLUMN "variantErrorCode" VARCHAR(128),
  ADD COLUMN "variantManifest" JSONB,
  ADD COLUMN "uploadExpiresAt" TIMESTAMP(3),
  ADD COLUMN "uploadRegisteredAt" TIMESTAMP(3);

CREATE INDEX "ReviewMedia_provider_storeId_providerAssetId_idx"
  ON "ReviewMedia"("provider", "storeId", "providerAssetId");

CREATE INDEX "ReviewMedia_provider_resourceType_variantStatus_createdAt_idx"
  ON "ReviewMedia"("provider", "resourceType", "variantStatus", "createdAt");

CREATE INDEX "PendingReviewImage_provider_storeId_providerAssetId_idx"
  ON "PendingReviewImage"("provider", "storeId", "providerAssetId");

CREATE INDEX "PendingReviewImage_provider_variantStatus_createdAt_idx"
  ON "PendingReviewImage"("provider", "variantStatus", "createdAt");
