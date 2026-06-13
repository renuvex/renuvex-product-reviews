-- Additive hardening for quota transitions and provider mutation ordering.

ALTER TABLE "VideoUploadSession"
ADD COLUMN "quotaState" VARCHAR(32) NOT NULL DEFAULT 'reserved';

CREATE TABLE "MediaProviderLease" (
  "key" VARCHAR(256) NOT NULL,
  "ownerJobId" TEXT NOT NULL,
  "leaseVersion" INTEGER NOT NULL DEFAULT 1,
  "lockedUntil" TIMESTAMP(3) NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "MediaProviderLease_pkey" PRIMARY KEY ("key")
);

CREATE INDEX "MediaProviderLease_lockedUntil_idx"
ON "MediaProviderLease"("lockedUntil");
