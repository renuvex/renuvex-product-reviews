-- AlterTable: enforce 2000-char limit on merchantReply
ALTER TABLE "Review" ALTER COLUMN "merchantReply" SET DATA TYPE VARCHAR(2000);

-- Drop dead columns from StoreSettings (replaced by WidgetSettings.settings JSON)
ALTER TABLE "StoreSettings" DROP COLUMN IF EXISTS "autoApprove";
ALTER TABLE "StoreSettings" DROP COLUMN IF EXISTS "widgetColor";
ALTER TABLE "StoreSettings" DROP COLUMN IF EXISTS "widgetTitle";
