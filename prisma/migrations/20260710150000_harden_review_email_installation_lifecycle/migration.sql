-- Review-email install fencing and erasure evidence are additive so the
-- disabled V3 source can overlap safely with the previous deployment.
CREATE INDEX "AuthToken_merchantId_updatedAt_idx"
  ON "AuthToken"("merchantId", "updatedAt");

CREATE TABLE "IkasStoreInstallation" (
  "storeId" TEXT NOT NULL,
  "authorizedAppId" VARCHAR(128) NOT NULL,
  "generation" INTEGER NOT NULL DEFAULT 1,
  "stateVersion" INTEGER NOT NULL DEFAULT 1,
  "status" VARCHAR(32) NOT NULL DEFAULT 'active',
  "activatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "erasureStartedAt" TIMESTAMP(3),
  "erasedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "IkasStoreInstallation_pkey" PRIMARY KEY ("storeId")
);

CREATE UNIQUE INDEX "IkasStoreInstallation_authorizedAppId_key"
  ON "IkasStoreInstallation"("authorizedAppId");
CREATE INDEX "IkasStoreInstallation_status_updatedAt_idx"
  ON "IkasStoreInstallation"("status", "updatedAt");

ALTER TABLE "StoreDataErasureRun"
  ADD COLUMN "authorizedAppId" VARCHAR(128),
  ADD COLUMN "installationGeneration" INTEGER;

ALTER TABLE "IkasStoreInstallation" ENABLE ROW LEVEL SECURITY;
