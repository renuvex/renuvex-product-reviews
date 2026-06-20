-- Review Video Mux contract phase.
-- The app no longer reads/writes the previous Cloudflare Stream/R2 upload columns.
-- This migration removes only the legacy provider-specific columns and indexes.

DROP INDEX IF EXISTS "VideoUploadSession_masterObjectKey_key";
DROP INDEX IF EXISTS "VideoUploadSession_ingestObjectKey_key";
DROP INDEX IF EXISTS "VideoUploadSession_streamUid_key";

ALTER TABLE "VideoUploadSession"
  DROP COLUMN IF EXISTS "r2UploadId",
  DROP COLUMN IF EXISTS "masterObjectKey",
  DROP COLUMN IF EXISTS "ingestObjectKey",
  DROP COLUMN IF EXISTS "streamUid";
