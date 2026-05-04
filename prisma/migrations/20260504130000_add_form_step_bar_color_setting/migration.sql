-- Seed the wizard step bar color from the current button background color.
-- Runtime still falls back to btnBgColor when this key is absent.
UPDATE "public"."WidgetSettings"
SET "settings" = jsonb_set(
  "settings",
  '{formStepBarColor}',
  COALESCE("settings" -> 'btnBgColor', '"#111111"'::jsonb),
  true
)
WHERE "widgetId" = 'reviews'
  AND NOT ("settings" ? 'formStepBarColor');
