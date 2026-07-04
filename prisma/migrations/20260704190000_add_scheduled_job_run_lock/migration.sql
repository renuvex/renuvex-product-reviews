CREATE TABLE "ScheduledJobRunLock" (
  "task" VARCHAR(64) NOT NULL,
  "scheduleSlot" VARCHAR(32) NOT NULL,
  "status" VARCHAR(32) NOT NULL DEFAULT 'processing',
  "attempts" INTEGER NOT NULL DEFAULT 1,
  "lockedUntil" TIMESTAMP(3),
  "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "completedAt" TIMESTAMP(3),
  "lastError" VARCHAR(512),
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "ScheduledJobRunLock_pkey" PRIMARY KEY ("task", "scheduleSlot")
);

CREATE INDEX "ScheduledJobRunLock_startedAt_idx" ON "ScheduledJobRunLock"("startedAt");
CREATE INDEX "ScheduledJobRunLock_status_startedAt_idx" ON "ScheduledJobRunLock"("status", "startedAt");
