import {
  WIDGET_PREVIEW_SCENES,
  getWidgetPreviewScenes,
} from '@/widget/preview/scenes.js';

export type WidgetPreviewRouteParams = {
  widgetId: string;
  scene: string;
};

export function getWidgetPreviewRouteParams(): WidgetPreviewRouteParams[] {
  return Object.keys(WIDGET_PREVIEW_SCENES).flatMap((widgetId) => (
    getWidgetPreviewScenes(widgetId).map((scene) => ({
      widgetId,
      scene: scene.id,
    }))
  ));
}

export function buildWidgetPreviewPath(widgetId: string, scene: string): string {
  return `/preview/${encodeURIComponent(widgetId)}/${encodeURIComponent(scene)}`;
}
