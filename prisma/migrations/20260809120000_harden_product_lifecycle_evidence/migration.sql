-- A single transient exact-empty response is not deletion evidence. These
-- additive fields retain distinct daily absence observations until the
-- application has enough evidence to create a tombstone.
ALTER TABLE "ProductSnapshot"
  ADD COLUMN "absenceFirstObservedAt" TIMESTAMP(3),
  ADD COLUMN "absenceLastObservedAt" TIMESTAMP(3),
  ADD COLUMN "absenceObservationCount" INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN "absenceLastScheduleSlot" VARCHAR(32);

ALTER TABLE "ProductSnapshot"
  ADD CONSTRAINT "ProductSnapshot_absence_evidence_check"
  CHECK (
    "absenceObservationCount" >= 0 AND
    (
      (
        "absenceObservationCount" = 0 AND
        "absenceFirstObservedAt" IS NULL AND
        "absenceLastObservedAt" IS NULL AND
        "absenceLastScheduleSlot" IS NULL
      ) OR
      (
        "absenceObservationCount" > 0 AND
        "absenceFirstObservedAt" IS NOT NULL AND
        "absenceLastObservedAt" IS NOT NULL AND
        "absenceLastScheduleSlot" IS NOT NULL AND
        "absenceLastObservedAt" >= "absenceFirstObservedAt"
      )
    )
  );

ALTER TABLE "ProductReconciliationRun"
  ADD COLUMN "expectedProductCount" INTEGER;

ALTER TABLE "ProductReconciliationRun"
  ADD CONSTRAINT "ProductReconciliationRun_expected_count_check"
  CHECK ("expectedProductCount" IS NULL OR "expectedProductCount" >= 0),
  ADD CONSTRAINT "ProductReconciliationRun_schedule_slot_check"
  CHECK (
    (
      "trigger" = 'daily' AND
      "scheduleSlot" IS NOT NULL AND
      "scheduleSlot" ~ '^[0-9]{4}-[0-9]{2}-[0-9]{2}$'
    ) OR
    ("trigger" IN ('install', 'manual') AND "scheduleSlot" IS NULL)
  );
