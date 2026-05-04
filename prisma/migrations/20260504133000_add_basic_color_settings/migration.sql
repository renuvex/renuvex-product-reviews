-- Seed Start-package basic color controls from the current advanced colors.
-- Basic controls are an admin-layer shortcut; widget runtime keeps using advanced keys.
UPDATE "public"."WidgetSettings"
SET "settings" = jsonb_set(
  jsonb_set(
    jsonb_set(
      jsonb_set(
        jsonb_set(
          "settings",
          '{basicBrandColor}',
          COALESCE("settings" -> 'basicBrandColor', "settings" -> 'btnBgColor', '"#111111"'::jsonb),
          true
        ),
        '{basicTextColor}',
        COALESCE("settings" -> 'basicTextColor', "settings" -> 'reviewBodyColor', "settings" -> 'headerTitleColor', '"#111111"'::jsonb),
        true
      ),
      '{basicSurfaceColor}',
      COALESCE("settings" -> 'basicSurfaceColor', "settings" -> 'formBgColor', '"#ffffff"'::jsonb),
      true
    ),
    '{basicStarColor}',
    COALESCE("settings" -> 'basicStarColor', "settings" -> 'reviewStarColor', '"#f59e0b"'::jsonb),
    true
  ),
  '{basicPassiveColor}',
  COALESCE("settings" -> 'basicPassiveColor', "settings" -> 'starEmptyColor', "settings" -> 'barTrackColor', '"#e5e7eb"'::jsonb),
  true
)
WHERE "widgetId" = 'reviews';
