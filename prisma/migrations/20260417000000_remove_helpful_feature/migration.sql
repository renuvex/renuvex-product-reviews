-- DropColumn
ALTER TABLE "public"."Review" DROP COLUMN IF EXISTS "helpfulCount";

-- DropColumn (if it still exists from older deployments where it was added)
ALTER TABLE "public"."StoreSettings" DROP COLUMN IF EXISTS "showHelpful";
