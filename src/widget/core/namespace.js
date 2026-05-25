export var RENUVEX_PR_WIDGET_READY = 'RENUVEX_PR_WIDGET_READY';
export var RENUVEX_PR_SETTINGS_UPDATE = 'RENUVEX_PR_SETTINGS_UPDATE';
export var RENUVEX_PR_SETTINGS_UPDATED_PREVIEW = 'RENUVEX_PR_SETTINGS_UPDATED_PREVIEW';
export var RENUVEX_PR_PREVIEW_SETTINGS_KEY = 'renuvex_pr_preview_settings';

export function isPreviewSettingsUpdateMessage(data) {
  return Boolean(data && data.type === RENUVEX_PR_SETTINGS_UPDATE);
}

export function dispatchPreviewSettingsUpdated(settings) {
  window.dispatchEvent(new CustomEvent(RENUVEX_PR_SETTINGS_UPDATED_PREVIEW, { detail: { settings: settings } }));
}

export function postPreviewWidgetReady(targetWindow) {
  if (!targetWindow) return;
  targetWindow.postMessage({ type: RENUVEX_PR_WIDGET_READY }, '*');
}

export function getPreviewSettingsStorage() {
  try {
    return (
      window.__renuvexProductReviewsPreviewSettings ||
      window.__ikasPreviewSettings ||
      sessionStorage.getItem(RENUVEX_PR_PREVIEW_SETTINGS_KEY) ||
      ''
    );
  } catch (e) {
    return window.__renuvexProductReviewsPreviewSettings || window.__ikasPreviewSettings || '';
  }
}
