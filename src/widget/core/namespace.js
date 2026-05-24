export var RENUVEX_PR_PREFIX = 'renuvex-pr';
export var LEGACY_IKR_PREFIX = 'ikr';

export var RENUVEX_PR_WIDGET_READY = 'RENUVEX_PR_WIDGET_READY';
export var LEGACY_IKR_WIDGET_READY = 'IKR_WIDGET_READY';
export var RENUVEX_PR_SETTINGS_UPDATE = 'RENUVEX_PR_SETTINGS_UPDATE';
export var LEGACY_IKR_SETTINGS_UPDATE = 'IKR_SETTINGS_UPDATE';
export var RENUVEX_PR_SETTINGS_UPDATED_PREVIEW = 'RENUVEX_PR_SETTINGS_UPDATED_PREVIEW';
export var LEGACY_IKR_SETTINGS_UPDATED_PREVIEW = 'IKR_SETTINGS_UPDATED_PREVIEW';

export var RENUVEX_PR_PREVIEW_SETTINGS_KEY = 'renuvex_pr_preview_settings';
export var LEGACY_IKR_PREVIEW_SETTINGS_KEY = 'ikr_preview_settings';

var CLASS_ALIASES_ATTR = 'data-renuvex-pr-class-aliases';
var CSS_VAR_ALIASES_ATTR = 'data-renuvex-pr-css-var-aliases';
var namespaceObserver = null;

export function isPreviewSettingsUpdateMessage(data) {
  return Boolean(data && (data.type === RENUVEX_PR_SETTINGS_UPDATE || data.type === LEGACY_IKR_SETTINGS_UPDATE));
}

export function dispatchPreviewSettingsUpdated(settings) {
  var detail = { settings: settings };
  window.dispatchEvent(new CustomEvent(RENUVEX_PR_SETTINGS_UPDATED_PREVIEW, { detail: detail }));
  window.dispatchEvent(new CustomEvent(LEGACY_IKR_SETTINGS_UPDATED_PREVIEW, { detail: detail }));
}

export function postPreviewWidgetReady(targetWindow) {
  if (!targetWindow) return;
  targetWindow.postMessage({ type: RENUVEX_PR_WIDGET_READY }, '*');
  targetWindow.postMessage({ type: LEGACY_IKR_WIDGET_READY }, '*');
}

export function getPreviewSettingsStorage() {
  try {
    return (
      window.__renuvexProductReviewsPreviewSettings ||
      window.__ikasPreviewSettings ||
      sessionStorage.getItem(RENUVEX_PR_PREVIEW_SETTINGS_KEY) ||
      sessionStorage.getItem(LEGACY_IKR_PREVIEW_SETTINGS_KEY) ||
      ''
    );
  } catch (e) {
    return window.__renuvexProductReviewsPreviewSettings || window.__ikasPreviewSettings || '';
  }
}

export function expandRenuvexCss(css) {
  if (typeof css !== 'string' || css.indexOf(LEGACY_IKR_PREFIX + '-') === -1) return css || '';
  var canonical = css
    .replace(/\.ikr-/g, '.renuvex-pr-')
    .replace(/\[data-ikr-/g, '[data-renuvex-')
    .replace(/data-ikr-/g, 'data-renuvex-')
    .replace(/--ikr-/g, '--renuvex-pr-');
  return canonical === css ? css : css + '\n' + canonical;
}

function aliasClassName(className) {
  if (!className || className.indexOf(LEGACY_IKR_PREFIX + '-') !== 0) return '';
  return RENUVEX_PR_PREFIX + '-' + className.slice((LEGACY_IKR_PREFIX + '-').length);
}

function syncClassAliases(el) {
  if (!el || !el.classList) return;

  var previous = (el.getAttribute(CLASS_ALIASES_ATTR) || '').split(/\s+/).filter(Boolean);
  var next = [];

  previous.forEach(function (alias) {
    var suffix = alias.slice((RENUVEX_PR_PREFIX + '-').length);
    var legacyClass = LEGACY_IKR_PREFIX + '-' + suffix;
    if (!el.classList.contains(legacyClass)) {
      el.classList.remove(alias);
    }
  });

  Array.prototype.slice.call(el.classList).forEach(function (className) {
    var alias = aliasClassName(className);
    if (!alias) return;
    if (!el.classList.contains(alias)) {
      el.classList.add(alias);
    }
    next.push(alias);
  });

  if (next.length) {
    var nextValue = Array.from(new Set(next)).join(' ');
    if (el.getAttribute(CLASS_ALIASES_ATTR) !== nextValue) el.setAttribute(CLASS_ALIASES_ATTR, nextValue);
  } else if (el.hasAttribute(CLASS_ALIASES_ATTR)) {
    el.removeAttribute(CLASS_ALIASES_ATTR);
  }
}

function aliasCssVariable(propName) {
  if (!propName || propName.indexOf('--' + LEGACY_IKR_PREFIX + '-') !== 0) return '';
  return '--' + RENUVEX_PR_PREFIX + '-' + propName.slice(('--' + LEGACY_IKR_PREFIX + '-').length);
}

function syncCssVariableAliases(el) {
  if (!el || !el.style || !el.style.length) return;

  var aliases = [];
  for (var i = 0; i < el.style.length; i += 1) {
    var propName = el.style[i];
    var alias = aliasCssVariable(propName);
    if (!alias) continue;
    var value = el.style.getPropertyValue(propName);
    var priority = el.style.getPropertyPriority(propName);
    if (el.style.getPropertyValue(alias) !== value || el.style.getPropertyPriority(alias) !== priority) {
      el.style.setProperty(alias, value, priority);
    }
    aliases.push(alias);
  }

  if (aliases.length) {
    var nextValue = Array.from(new Set(aliases)).join(' ');
    if (el.getAttribute(CSS_VAR_ALIASES_ATTR) !== nextValue) el.setAttribute(CSS_VAR_ALIASES_ATTR, nextValue);
  }
}

function syncElement(el) {
  syncClassAliases(el);
  syncCssVariableAliases(el);
}

function syncTree(root) {
  if (!root || root.nodeType !== 1) return;
  syncElement(root);
  if (!root.querySelectorAll) return;
  root.querySelectorAll('[class*="ikr-"],[style*="--ikr-"]').forEach(syncElement);
}

export function startNamespaceAliasObserver() {
  if (namespaceObserver || typeof MutationObserver === 'undefined') {
    syncTree(document.documentElement);
    return;
  }

  syncTree(document.documentElement);
  namespaceObserver = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (mutation.type === 'attributes') {
        syncElement(mutation.target);
        return;
      }
      mutation.addedNodes.forEach(function (node) {
        syncTree(node);
      });
    });
  });

  namespaceObserver.observe(document.documentElement, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['class', 'style'],
  });
}
