-- Local read model for ikas product identity snapshots.
CREATE TABLE "ProductSnapshot" (
    "id" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "slug" TEXT,
    "name" TEXT,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "ikasUpdatedAt" TIMESTAMP(3),
    "lastSyncedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductSnapshot_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "ProductSnapshot_storeId_productId_key" ON "ProductSnapshot"("storeId", "productId");
CREATE INDEX "ProductSnapshot_storeId_slug_idx" ON "ProductSnapshot"("storeId", "slug");
CREATE INDEX "ProductSnapshot_storeId_slug_deleted_idx" ON "ProductSnapshot"("storeId", "slug", "deleted");
