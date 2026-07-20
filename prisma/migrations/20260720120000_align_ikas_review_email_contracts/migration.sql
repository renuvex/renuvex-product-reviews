-- Align review-email consent and delivery evidence with the ikas Admin API
-- contract. Expand-only: existing rows remain readable during deployment
-- overlap and no historical delivery evidence is inferred.

ALTER TABLE "IkasOrderLineSnapshot"
ADD COLUMN "firstDeliveredAt" TIMESTAMP(3);

ALTER TABLE "ReviewEmailAttempt"
ADD COLUMN "consentSource" VARCHAR(64),
ADD COLUMN "consentStatus" VARCHAR(64),
ADD COLUMN "consentStatusUpdatedAt" TIMESTAMP(3),
ADD COLUMN "consentCheckedAt" TIMESTAMP(3);

ALTER TABLE "ReviewEmailSettings"
ALTER COLUMN "consentMode" SET DEFAULT 'current_customer_subscription';

ALTER TABLE "ReviewRequest"
ALTER COLUMN "consentModeSnapshot" SET DEFAULT 'current_customer_subscription';
