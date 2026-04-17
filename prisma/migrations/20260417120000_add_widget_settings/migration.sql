-- CreateTable
CREATE TABLE IF NOT EXISTS "public"."WidgetSettings" (
    "id" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,
    "widgetId" TEXT NOT NULL,
    "settings" JSONB NOT NULL DEFAULT '{}',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WidgetSettings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "WidgetSettings_storeId_widgetId_key" ON "public"."WidgetSettings"("storeId", "widgetId");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "WidgetSettings_storeId_idx" ON "public"."WidgetSettings"("storeId");
