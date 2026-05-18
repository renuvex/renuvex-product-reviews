-- Drop redundant Review indexes.
-- The wider composite indexes keep the same leftmost prefixes:
--   Review_storeId_productId_status_idx covers (storeId, productId)
--   Review_storeId_slug_status_idx covers (storeId, slug)
DROP INDEX IF EXISTS "public"."Review_storeId_productId_idx";
DROP INDEX IF EXISTS "public"."Review_storeId_slug_idx";
