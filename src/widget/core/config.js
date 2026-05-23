// config.js — Script tag'inden PUBLIC_API_KEY ve API_BASE çıkarma
// Bu değerler tüm modüller tarafından import edilir.
//
// SSR-safe guard: module-level'de document yoksa (Next.js dashboard
// prerender sırasında bu modül transitively import ediliyor) sessizce
// boş değerlerle çıkar. Browser'da gerçek değerler hesaplanır.

import { findRenuvexWidgetScript, getPublicApiKeyFromScript, getWidgetScriptBaseUrl } from './script-identity.js';

const scriptTag = findRenuvexWidgetScript();

export const PUBLIC_API_KEY = getPublicApiKeyFromScript(scriptTag);
export const API_BASE = getWidgetScriptBaseUrl(scriptTag);
