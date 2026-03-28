-- CreateIndex
CREATE INDEX "Review_storeId_status_idx" ON "public"."Review"("storeId", "status");

-- CreateIndex
CREATE INDEX "Review_status_createdAt_idx" ON "public"."Review"("status", "createdAt");
