-- Remove deprecated review form outer border color setting.
-- Form shells are borderless; field borders use inputBorderColor.
UPDATE "public"."WidgetSettings"
SET "settings" = "settings" - 'formBorderColor'
WHERE "widgetId" = 'reviews'
  AND "settings" ? 'formBorderColor';
