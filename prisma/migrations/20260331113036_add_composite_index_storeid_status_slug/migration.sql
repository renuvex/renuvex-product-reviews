-- CreateIndex
CREATE INDEX "Review_storeId_status_slug_idx" ON "public"."Review"("storeId", "status", "slug");
