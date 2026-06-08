-- Add exact filtered photo+rating counts to the product review summary read model.
ALTER TABLE "ProductReviewSummary"
  ADD COLUMN "photoRating1Count" INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN "photoRating2Count" INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN "photoRating3Count" INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN "photoRating4Count" INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN "photoRating5Count" INTEGER NOT NULL DEFAULT 0;

WITH photo_rating_counts AS (
  SELECT
    "storeId",
    "productId",
    COUNT(*) FILTER (WHERE "rating" = 1)::INTEGER AS "photoRating1Count",
    COUNT(*) FILTER (WHERE "rating" = 2)::INTEGER AS "photoRating2Count",
    COUNT(*) FILTER (WHERE "rating" = 3)::INTEGER AS "photoRating3Count",
    COUNT(*) FILTER (WHERE "rating" = 4)::INTEGER AS "photoRating4Count",
    COUNT(*) FILTER (WHERE "rating" = 5)::INTEGER AS "photoRating5Count"
  FROM "Review"
  WHERE "status" = 'approved'
    AND "hasImages" = TRUE
  GROUP BY "storeId", "productId"
)
UPDATE "ProductReviewSummary" AS summary
SET
  "photoRating1Count" = photo_rating_counts."photoRating1Count",
  "photoRating2Count" = photo_rating_counts."photoRating2Count",
  "photoRating3Count" = photo_rating_counts."photoRating3Count",
  "photoRating4Count" = photo_rating_counts."photoRating4Count",
  "photoRating5Count" = photo_rating_counts."photoRating5Count"
FROM photo_rating_counts
WHERE summary."storeId" = photo_rating_counts."storeId"
  AND summary."productId" = photo_rating_counts."productId";
