-- AlterTable
ALTER TABLE "public"."Review" ADD COLUMN     "helpfulCount" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "public"."StoreSettings" ADD COLUMN     "showHelpful" BOOLEAN NOT NULL DEFAULT true;

-- CreateTable
CREATE TABLE "public"."ReviewHelpful" (
    "id" TEXT NOT NULL,
    "reviewId" TEXT NOT NULL,
    "ip" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ReviewHelpful_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ReviewHelpful_reviewId_idx" ON "public"."ReviewHelpful"("reviewId");

-- CreateIndex
CREATE UNIQUE INDEX "ReviewHelpful_reviewId_ip_key" ON "public"."ReviewHelpful"("reviewId", "ip");

-- AddForeignKey
ALTER TABLE "public"."ReviewHelpful" ADD CONSTRAINT "ReviewHelpful_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "public"."Review"("id") ON DELETE CASCADE ON UPDATE CASCADE;
