-- Drop the unused ProductSnapshot.deleted column and its index.
-- ikas exposes no product-delete webhook scope and listProduct excludes
-- deleted products, so this column was always false. See ADR_0015.

-- DropIndex
DROP INDEX "ProductSnapshot_storeId_slug_deleted_idx";

-- AlterTable
ALTER TABLE "ProductSnapshot" DROP COLUMN "deleted";
