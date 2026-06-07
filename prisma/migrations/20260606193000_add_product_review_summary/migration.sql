-- Product-level read model for public rating/review summary surfaces.
CREATE TABLE "ProductReviewSummary" (
    "id" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "approvedCount" INTEGER NOT NULL DEFAULT 0,
    "ratingSum" INTEGER NOT NULL DEFAULT 0,
    "averageRating" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "rating1Count" INTEGER NOT NULL DEFAULT 0,
    "rating2Count" INTEGER NOT NULL DEFAULT 0,
    "rating3Count" INTEGER NOT NULL DEFAULT 0,
    "rating4Count" INTEGER NOT NULL DEFAULT 0,
    "rating5Count" INTEGER NOT NULL DEFAULT 0,
    "photoReviewCount" INTEGER NOT NULL DEFAULT 0,
    "lastReviewAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductReviewSummary_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "ProductReviewSummary_storeId_productId_key"
ON "ProductReviewSummary"("storeId", "productId");

-- Initial additive backfill keeps existing approved review counts visible when
-- the public read paths move from Review.groupBy to ProductReviewSummary.
INSERT INTO "ProductReviewSummary" (
    "id",
    "storeId",
    "productId",
    "approvedCount",
    "ratingSum",
    "averageRating",
    "rating1Count",
    "rating2Count",
    "rating3Count",
    "rating4Count",
    "rating5Count",
    "photoReviewCount",
    "lastReviewAt",
    "createdAt",
    "updatedAt"
)
SELECT
    md5("storeId" || ':' || "productId") AS "id",
    "storeId",
    "productId",
    COUNT(*)::INTEGER AS "approvedCount",
    COALESCE(SUM("rating"), 0)::INTEGER AS "ratingSum",
    COALESCE(AVG("rating"), 0)::DOUBLE PRECISION AS "averageRating",
    COUNT(*) FILTER (WHERE "rating" = 1)::INTEGER AS "rating1Count",
    COUNT(*) FILTER (WHERE "rating" = 2)::INTEGER AS "rating2Count",
    COUNT(*) FILTER (WHERE "rating" = 3)::INTEGER AS "rating3Count",
    COUNT(*) FILTER (WHERE "rating" = 4)::INTEGER AS "rating4Count",
    COUNT(*) FILTER (WHERE "rating" = 5)::INTEGER AS "rating5Count",
    COUNT(*) FILTER (WHERE "images" IS NOT NULL AND "images" <> '' AND "images" <> '[]')::INTEGER AS "photoReviewCount",
    MAX("createdAt") AS "lastReviewAt",
    CURRENT_TIMESTAMP AS "createdAt",
    CURRENT_TIMESTAMP AS "updatedAt"
FROM "Review"
WHERE "status" = 'approved'
GROUP BY "storeId", "productId";
