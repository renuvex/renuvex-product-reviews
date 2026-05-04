-- Remove deprecated Puan Dağılımı hover color setting.
-- Hover and active row backgrounds are now derived from barFillColor at runtime.
UPDATE "public"."WidgetSettings"
SET "settings" = "settings" - 'barHoverBgColor'
WHERE "widgetId" = 'reviews'
  AND "settings" ? 'barHoverBgColor';
