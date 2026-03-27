-- AlterTable
ALTER TABLE "public"."Review" ADD COLUMN     "slug" TEXT;

-- CreateIndex
CREATE INDEX "Review_storeId_slug_idx" ON "public"."Review"("storeId", "slug");
