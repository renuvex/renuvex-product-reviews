-- CreateIndex
CREATE INDEX "Review_storeId_slug_status_idx" ON "public"."Review"("storeId", "slug", "status");
