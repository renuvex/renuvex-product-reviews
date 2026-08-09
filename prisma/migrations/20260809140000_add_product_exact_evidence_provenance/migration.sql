-- Point-exact evidence is valid only for the installation generation that
-- produced it. Legacy rows remain tuple-less and therefore fail closed as
-- exact evidence until a current fenced read succeeds.
ALTER TABLE "ProductSnapshot"
  ADD COLUMN "exactEvidenceAuthorizedAppId" VARCHAR(128),
  ADD COLUMN "exactEvidenceGeneration" INTEGER,
  ADD COLUMN "exactEvidenceStateVersion" INTEGER;

ALTER TABLE "ProductSnapshot"
  ADD CONSTRAINT "ProductSnapshot_exact_evidence_provenance_check"
  CHECK (
    (
      "exactEvidenceAuthorizedAppId" IS NULL AND
      "exactEvidenceGeneration" IS NULL AND
      "exactEvidenceStateVersion" IS NULL
    ) OR
    (
      "exactEvidenceAuthorizedAppId" IS NOT NULL AND
      "exactEvidenceGeneration" IS NOT NULL AND
      "exactEvidenceStateVersion" IS NOT NULL
    )
  );
