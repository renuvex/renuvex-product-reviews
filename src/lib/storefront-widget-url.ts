const LOCAL_HOSTNAMES = new Set(['localhost', '0.0.0.0', '::1']);
export const STOREFRONT_WIDGET_APP_MARKER = 'product-reviews';
export const LEGACY_STOREFRONT_WIDGET_APP_MARKER = 'yorum-paneli';

export class StorefrontWidgetUrlError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'StorefrontWidgetUrlError';
  }
}

function normalizeHostname(hostname: string) {
  return hostname.toLowerCase().replace(/^\[/, '').replace(/\]$/, '');
}

function isPrivateOrLocalIPv4(hostname: string) {
  const parts = hostname.split('.').map((part) => Number(part));
  if (parts.length !== 4 || parts.some((part) => !Number.isInteger(part) || part < 0 || part > 255)) {
    return false;
  }

  const [first, second] = parts;
  return first === 10 || first === 127 || (first === 172 && second >= 16 && second <= 31) || (first === 192 && second === 168);
}

function isLocalOrPrivateHost(hostname: string) {
  const normalized = normalizeHostname(hostname);
  return LOCAL_HOSTNAMES.has(normalized) || normalized.endsWith('.localhost') || isPrivateOrLocalIPv4(normalized);
}

function isLocalStorefrontWidgetUrlAllowed() {
  return process.env.ALLOW_LOCAL_STOREFRONT_WIDGET_URL === 'true';
}

function getConfiguredStorefrontWidgetBaseUrl() {
  return (process.env.STOREFRONT_WIDGET_BASE_URL || process.env.NEXT_PUBLIC_DEPLOY_URL || '').trim();
}

export function resolveStorefrontWidgetBaseUrl() {
  const rawBaseUrl = getConfiguredStorefrontWidgetBaseUrl();
  if (!rawBaseUrl) {
    throw new StorefrontWidgetUrlError('STOREFRONT_WIDGET_BASE_URL or NEXT_PUBLIC_DEPLOY_URL must be configured.');
  }

  let parsed: URL;
  try {
    parsed = new URL(rawBaseUrl);
  } catch {
    throw new StorefrontWidgetUrlError(`Invalid storefront widget base URL: ${rawBaseUrl}`);
  }

  const allowLocal = isLocalStorefrontWidgetUrlAllowed();
  if (!allowLocal && parsed.protocol !== 'https:') {
    throw new StorefrontWidgetUrlError('Storefront widget URL must use https unless ALLOW_LOCAL_STOREFRONT_WIDGET_URL=true.');
  }

  if (!allowLocal && isLocalOrPrivateHost(parsed.hostname)) {
    throw new StorefrontWidgetUrlError('Storefront widget URL must not point to localhost or a private network address.');
  }

  parsed.hash = '';
  parsed.search = '';
  return parsed.toString().replace(/\/$/, '');
}

export function buildStorefrontWidgetUrl(publicApiKey: string) {
  return `${resolveStorefrontWidgetBaseUrl()}/widget.js?publicApiKey=${encodeURIComponent(publicApiKey)}`;
}

function escapeHtmlAttribute(value: string) {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export function buildStorefrontWidgetScript(publicApiKey: string) {
  const escapedPublicApiKey = escapeHtmlAttribute(publicApiKey);
  return `<script src="${buildStorefrontWidgetUrl(publicApiKey)}" async data-renuvex-app="${STOREFRONT_WIDGET_APP_MARKER}" data-renuvex-store-id="${escapedPublicApiKey}" data-ikr-app="${LEGACY_STOREFRONT_WIDGET_APP_MARKER}" data-ikr-store-id="${escapedPublicApiKey}"></script>`;
}
