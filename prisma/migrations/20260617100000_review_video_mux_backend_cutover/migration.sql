-- ADR_0032 backend cutover: Mux direct-upload sessions no longer need a
-- previous provider object key.
ALTER TABLE "VideoUploadSession" ALTER COLUMN "masterObjectKey" DROP NOT NULL;
