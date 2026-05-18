-- Track the tenant that owns each pending Cloudinary upload.
-- Nullable for existing rows; new writes always set storeId.
ALTER TABLE "PendingReviewImage" ADD COLUMN "storeId" TEXT;

CREATE INDEX "PendingReviewImage_storeId_createdAt_idx"
ON "PendingReviewImage"("storeId", "createdAt");
