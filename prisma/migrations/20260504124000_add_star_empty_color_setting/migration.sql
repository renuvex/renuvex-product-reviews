-- Seed the new empty star color from the previous shared bar track color.
-- After this migration, barTrackColor controls only bars and starEmptyColor controls empty stars.
UPDATE "public"."WidgetSettings"
SET "settings" = jsonb_set(
  "settings",
  '{starEmptyColor}',
  COALESCE("settings" -> 'barTrackColor', '"#e5e7eb"'::jsonb),
  true
)
WHERE "widgetId" = 'reviews'
  AND NOT ("settings" ? 'starEmptyColor');
