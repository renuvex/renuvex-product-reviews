-- Close the legacy review-image schema default after the AWS-only cutover.
-- This is an additive-safe default change: existing rows are not rewritten.

ALTER TABLE "ReviewMedia"
  ALTER COLUMN "provider" SET DEFAULT 'aws_s3';

ALTER TABLE "PendingReviewImage"
  ALTER COLUMN "provider" SET DEFAULT 'aws_s3';
