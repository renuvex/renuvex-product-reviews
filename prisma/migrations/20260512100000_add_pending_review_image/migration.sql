-- CreateTable
CREATE TABLE "public"."PendingReviewImage" (
    "publicId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ipHash" TEXT,

    CONSTRAINT "PendingReviewImage_pkey" PRIMARY KEY ("publicId")
);

-- CreateIndex
CREATE INDEX "PendingReviewImage_createdAt_idx" ON "public"."PendingReviewImage"("createdAt");
