// config.js - PUBLIC_API_KEY, ASSET_BASE, API_BASE, and READ_API_BASE extraction.
// These values are imported by all storefront widget modules.
//
// SSR-safe guard: when module-level document is unavailable (Next.js dashboard
// prerender can import this module transitively), this module exits with empty
// values. In the browser, values are computed from the widget script tag plus
// the optional build-time API origins.

import { getWidgetApiBaseUrl, getWidgetAssetBaseUrl, getWidgetReadApiBaseUrl } from './origins.js';
import { findRenuvexWidgetScript, getPublicApiKeyFromScript } from './script-identity.js';

const scriptTag = findRenuvexWidgetScript();

export const PUBLIC_API_KEY = getPublicApiKeyFromScript(scriptTag);
export const ASSET_BASE = getWidgetAssetBaseUrl(scriptTag);
export const API_BASE = getWidgetApiBaseUrl(scriptTag);
export const READ_API_BASE = getWidgetReadApiBaseUrl(scriptTag);
