-- Remove legacy inline page-form selection from saved widget settings.
-- The storefront review form is modal-only; old JSON rows no longer need this key.
UPDATE "public"."WidgetSettings"
SET "settings" = "settings" - 'reviewFormStyle'
WHERE "widgetId" = 'reviews'
  AND "settings" ? 'reviewFormStyle';
