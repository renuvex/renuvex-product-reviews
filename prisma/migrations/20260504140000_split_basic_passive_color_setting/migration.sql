-- Split the former basicPassiveColor shortcut into explicit empty-star and empty-bar controls.
UPDATE "public"."WidgetSettings"
SET "settings" = jsonb_set(
  jsonb_set(
    "settings",
    '{basicStarEmptyColor}',
    COALESCE("settings" -> 'basicStarEmptyColor', "settings" -> 'basicPassiveColor', "settings" -> 'starEmptyColor', '"#e5e7eb"'::jsonb),
    true
  ),
  '{basicBarTrackColor}',
  COALESCE("settings" -> 'basicBarTrackColor', "settings" -> 'basicPassiveColor', "settings" -> 'barTrackColor', '"#e5e7eb"'::jsonb),
  true
) - 'basicPassiveColor'
WHERE "widgetId" = 'reviews';
