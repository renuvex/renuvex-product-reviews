-- The activation cutoff is nullable for expand-only compatibility. Application
-- code fails closed when an enabled store does not yet have a cutoff.
ALTER TABLE "ReviewEmailSettings"
ADD COLUMN "eligibilityStartsAt" TIMESTAMP(3);

ALTER TABLE "ReviewEmailBatch"
ADD COLUMN "eligibilityStartsAtSnapshot" TIMESTAMP(3);
