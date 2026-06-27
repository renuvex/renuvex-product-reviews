-- Add exact filtered media+rating counts to the product review summary read model.
-- This keeps the public "photos and videos" filter on the summary-backed hot path
-- instead of raw Review.count() as video reviews scale.
ALTER TABLE "ProductReviewSummary"
  ADD COLUMN "mediaReviewCount" INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN "mediaRating1Count" INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN "mediaRating2Count" INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN "mediaRating3Count" INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN "mediaRating4Count" INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN "mediaRating5Count" INTEGER NOT NULL DEFAULT 0;

WITH media_rating_counts AS (
  SELECT
    "storeId",
    "productId",
    COUNT(*)::INTEGER AS "mediaReviewCount",
    COUNT(*) FILTER (WHERE "rating" = 1)::INTEGER AS "mediaRating1Count",
    COUNT(*) FILTER (WHERE "rating" = 2)::INTEGER AS "mediaRating2Count",
    COUNT(*) FILTER (WHERE "rating" = 3)::INTEGER AS "mediaRating3Count",
    COUNT(*) FILTER (WHERE "rating" = 4)::INTEGER AS "mediaRating4Count",
    COUNT(*) FILTER (WHERE "rating" = 5)::INTEGER AS "mediaRating5Count"
  FROM "Review"
  WHERE "status" = 'approved'
    AND ("hasImages" = TRUE OR "hasVideo" = TRUE)
  GROUP BY "storeId", "productId"
)
UPDATE "ProductReviewSummary" AS summary
SET
  "mediaReviewCount" = media_rating_counts."mediaReviewCount",
  "mediaRating1Count" = media_rating_counts."mediaRating1Count",
  "mediaRating2Count" = media_rating_counts."mediaRating2Count",
  "mediaRating3Count" = media_rating_counts."mediaRating3Count",
  "mediaRating4Count" = media_rating_counts."mediaRating4Count",
  "mediaRating5Count" = media_rating_counts."mediaRating5Count"
FROM media_rating_counts
WHERE summary."storeId" = media_rating_counts."storeId"
  AND summary."productId" = media_rating_counts."productId";

CREATE INDEX "Review_approved_video_newest_cursor_idx"
ON "Review"("storeId", "productId", "createdAt" DESC, "id" DESC)
WHERE "status" = 'approved' AND "hasVideo" = true;
