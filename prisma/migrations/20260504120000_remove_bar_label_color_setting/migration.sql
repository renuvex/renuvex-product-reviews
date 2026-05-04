-- Remove deprecated Puan Dağılımı color setting.
-- barLabelColor was removed from the admin UI because the visible row stars
-- are controlled by reviewStarColor and barTrackColor instead.
UPDATE "public"."WidgetSettings"
SET "settings" = "settings" - 'barLabelColor'
WHERE "widgetId" = 'reviews'
  AND "settings" ? 'barLabelColor';
