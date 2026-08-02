CREATE INDEX "Review_admin_store_status_createdAt_id_idx"
ON "Review"("storeId", "status", "createdAt" DESC, "id" DESC);

CREATE INDEX "Review_admin_store_createdAt_id_idx"
ON "Review"("storeId", "createdAt" DESC, "id" DESC);
