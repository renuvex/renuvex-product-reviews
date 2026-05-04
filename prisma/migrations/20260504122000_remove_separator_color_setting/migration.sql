-- Remove deprecated Widget Alanı separator color setting.
-- Review separators are controlled by reviewBorderColor under Yorum İçeriği.
UPDATE "public"."WidgetSettings"
SET "settings" = "settings" - 'separatorColor'
WHERE "widgetId" = 'reviews'
  AND "settings" ? 'separatorColor';
