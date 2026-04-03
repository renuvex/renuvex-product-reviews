-- DropIndex
DROP INDEX "public"."Review_status_createdAt_idx";

-- CreateIndex
CREATE INDEX "Review_storeId_productId_idx" ON "public"."Review"("storeId", "productId");
