-- Support canonical product-id rating lookups for listing badges.
CREATE INDEX "Review_storeId_productId_status_idx" ON "Review"("storeId", "productId", "status");
