-- AlterTable: enforce 2000-char limit on Review.comment (defense-in-depth)
ALTER TABLE "Review" ALTER COLUMN "comment" SET DATA TYPE VARCHAR(2000);
