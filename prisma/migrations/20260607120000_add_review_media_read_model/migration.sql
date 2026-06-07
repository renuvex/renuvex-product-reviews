-- Normalize review media for indexed public photo-review reads.
ALTER TABLE "Review"
ADD COLUMN "hasImages" BOOLEAN NOT NULL DEFAULT false;

CREATE TABLE "ReviewMedia" (
    "id" TEXT NOT NULL,
    "reviewId" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "url" VARCHAR(2048) NOT NULL,
    "publicId" VARCHAR(512) NOT NULL,
    "position" INTEGER NOT NULL,
    "visible" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ReviewMedia_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "ReviewMedia_publicId_key"
ON "ReviewMedia"("publicId");

CREATE UNIQUE INDEX "ReviewMedia_reviewId_position_key"
ON "ReviewMedia"("reviewId", "position");

CREATE INDEX "ReviewMedia_reviewId_position_idx"
ON "ReviewMedia"("reviewId", "position");

CREATE INDEX "ReviewMedia_storeId_productId_visible_createdAt_idx"
ON "ReviewMedia"("storeId", "productId", "visible", "createdAt");

CREATE INDEX "Review_approved_hasImages_product_createdAt_idx"
ON "Review"("storeId", "productId", "createdAt" DESC)
WHERE "status" = 'approved' AND "hasImages" = true;

ALTER TABLE "ReviewMedia"
ADD CONSTRAINT "ReviewMedia_reviewId_fkey"
FOREIGN KEY ("reviewId") REFERENCES "Review"("id") ON DELETE CASCADE ON UPDATE CASCADE;
