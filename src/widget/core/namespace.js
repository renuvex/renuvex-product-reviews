import {
  PREVIEW_PROTOCOL_VERSION,
  isWidgetPreviewScene,
} from '../preview/scenes.js';

export var RENUVEX_PR_WIDGET_READY = 'RENUVEX_PR_WIDGET_READY';
export var RENUVEX_PR_PREVIEW_RENDER = 'RENUVEX_PR_PREVIEW_RENDER';
export var RENUVEX_PR_PREVIEW_RENDERED = 'RENUVEX_PR_PREVIEW_RENDERED';
export var RENUVEX_PR_PREVIEW_ERROR = 'RENUVEX_PR_PREVIEW_ERROR';
export var RENUVEX_PR_PREVIEW_RESET_SCROLL = 'RENUVEX_PR_PREVIEW_RESET_SCROLL';
export var RENUVEX_PR_SETTINGS_UPDATED_PREVIEW = 'RENUVEX_PR_SETTINGS_UPDATED_PREVIEW';

var previewSettingsPayload = null;
var previewReviewsPages = {};

function isRecord(value) {
  return Boolean(value && typeof value === 'object' && !Array.isArray(value));
}

function hasValidPreviewContext(data) {
  return Boolean(
    isRecord(data) &&
    data.version === PREVIEW_PROTOCOL_VERSION &&
    typeof data.widgetId === 'string' &&
    typeof data.scene === 'string' &&
    isWidgetPreviewScene(data.widgetId, data.scene),
  );
}

export function isPreviewContext(value) {
  return hasValidPreviewContext(value);
}

export function isPreviewRenderMessage(data) {
  return Boolean(
    hasValidPreviewContext(data) &&
    data.type === RENUVEX_PR_PREVIEW_RENDER &&
    isRecord(data.widgets),
  );
}

export function isPreviewResetScrollMessage(data) {
  return Boolean(
    hasValidPreviewContext(data) &&
    data.type === RENUVEX_PR_PREVIEW_RESET_SCROLL,
  );
}

export function dispatchPreviewSettingsUpdated(settings) {
  window.dispatchEvent(new CustomEvent(RENUVEX_PR_SETTINGS_UPDATED_PREVIEW, {
    detail: { settings: settings },
  }));
}

export function postPreviewWidgetReady(targetWindow, targetOrigin, context) {
  if (!targetWindow || !targetOrigin || !hasValidPreviewContext(context)) return;
  targetWindow.postMessage({
    version: PREVIEW_PROTOCOL_VERSION,
    type: RENUVEX_PR_WIDGET_READY,
    widgetId: context.widgetId,
    scene: context.scene,
  }, targetOrigin);
}

export function postPreviewRendered(targetWindow, targetOrigin, context) {
  if (!targetWindow || !targetOrigin || !hasValidPreviewContext(context)) return;
  targetWindow.postMessage({
    version: PREVIEW_PROTOCOL_VERSION,
    type: RENUVEX_PR_PREVIEW_RENDERED,
    widgetId: context.widgetId,
    scene: context.scene,
  }, targetOrigin);
}

export function postPreviewError(targetWindow, targetOrigin, context) {
  if (!targetWindow || !targetOrigin || !hasValidPreviewContext(context)) return;
  targetWindow.postMessage({
    version: PREVIEW_PROTOCOL_VERSION,
    type: RENUVEX_PR_PREVIEW_ERROR,
    widgetId: context.widgetId,
    scene: context.scene,
    code: 'preview_render_failed',
  }, targetOrigin);
}

export function setPreviewSettingsPayload(payload) {
  previewSettingsPayload = isRecord(payload) ? payload : null;
}

export function getPreviewSettingsPayload() {
  return previewSettingsPayload;
}

export function setPreviewReviewsPages(pages) {
  previewReviewsPages = isRecord(pages) ? pages : {};
}

export function getPreviewReviewsPage(page) {
  var pageNumber = Number(page) || 1;
  return previewReviewsPages[pageNumber] || previewReviewsPages[String(pageNumber)] || null;
}
