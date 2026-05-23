import axios from 'axios';
import { GetMerchantApiResponse } from '../app/api/ikas/get-merchant/route';
import { ApiResponseType } from '../globals/constants';
import type { StorefrontScriptSummary } from './storefront-scripts';
import type { StorefrontThemeSyncResult } from './storefront-theme-sync';

export async function makePostRequest<T>({ url, data, token }: { url: string; data?: any; token?: string }) {
  return axios.post<ApiResponseType<T>>(url, data, {
    headers: token
      ? {
          Authorization: `JWT ${token}`,
        }
      : undefined,
  });
}

export async function makeGetRequest<T>({ url, data, token }: { url: string; data?: any; token?: string }) {
  return axios.get<ApiResponseType<T>>(url, {
    params: data,
    headers: token
      ? {
          Authorization: `JWT ${token}`,
        }
      : undefined,
  });
}

// API requests object - frontend-backend bridge
export const ApiRequests = {
  ikas: {
    getMerchant: (token: string) => makeGetRequest<GetMerchantApiResponse>({ url: '/api/ikas/get-merchant', token }),
    injectScripts: (token: string) => makePostRequest<StorefrontScriptSummary>({ url: '/api/admin/inject-scripts', token }),
    syncStorefrontTheme: (token: string, reason: 'dashboard_open' | 'settings_save' = 'dashboard_open') =>
      makePostRequest<StorefrontThemeSyncResult>({ url: '/api/admin/storefront-theme/sync', token, data: { reason } }),
  },
};
