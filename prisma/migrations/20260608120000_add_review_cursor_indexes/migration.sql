-- Cursor/keyset support for public review list pagination.
-- These partial indexes match the approved storefront query shapes and keep
-- offset-free load-more reads on index order as review volume grows.

CREATE INDEX "Review_approved_product_newest_cursor_idx"
ON "Review"("storeId", "productId", "createdAt" DESC, "id" DESC)
WHERE "status" = 'approved';

CREATE INDEX "Review_approved_product_rating_desc_cursor_idx"
ON "Review"("storeId", "productId", "rating" DESC, "createdAt" DESC, "id" DESC)
WHERE "status" = 'approved';

CREATE INDEX "Review_approved_product_rating_asc_cursor_idx"
ON "Review"("storeId", "productId", "rating" ASC, "createdAt" DESC, "id" DESC)
WHERE "status" = 'approved';

CREATE INDEX "Review_approved_photo_newest_cursor_idx"
ON "Review"("storeId", "productId", "createdAt" DESC, "id" DESC)
WHERE "status" = 'approved' AND "hasImages" = true;
