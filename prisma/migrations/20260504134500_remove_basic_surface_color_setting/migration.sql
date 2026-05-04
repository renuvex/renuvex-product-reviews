-- Arka plan is an advanced color decision, not a Start-package basic shortcut.
UPDATE "public"."WidgetSettings"
SET "settings" = "settings" - 'basicSurfaceColor'
WHERE "widgetId" = 'reviews'
  AND "settings" ? 'basicSurfaceColor';
