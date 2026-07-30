export var PREVIEW_PROTOCOL_VERSION = 1;

export var WIDGET_PREVIEW_SCENES = {
  reviews: [
    { id: 'reviews', label: 'Yorumlar' },
  ],
  badge: [
    { id: 'pdp', label: 'Ürün' },
    { id: 'listing', label: 'Liste' },
  ],
};

export function getWidgetPreviewScenes(widgetId) {
  var scenes = WIDGET_PREVIEW_SCENES[widgetId];
  return Array.isArray(scenes) ? scenes.slice() : [];
}

export function getDefaultWidgetPreviewScene(widgetId) {
  var scenes = getWidgetPreviewScenes(widgetId);
  return scenes.length ? scenes[0].id : '';
}

export function isWidgetPreviewScene(widgetId, sceneId) {
  return getWidgetPreviewScenes(widgetId).some(function (scene) {
    return scene.id === sceneId;
  });
}
