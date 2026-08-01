'use client';

import { AppBridgeHelper } from '@ikas/app-helpers';
import axios from 'axios';
import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';

import { TokenHelpers } from '@/helpers/token-helpers';
import { ApiRequests } from '@/lib/api-requests';
import { colors, typography } from '@/lib/design-tokens';

import { AdminShellProvider } from './AdminShellContext';

type DashboardAuthenticationState =
  | { status: 'loading' }
  | { status: 'authentication_required' }
  | { status: 'ready'; token: string };

function isAuthenticationBoundaryFailure(error: unknown): boolean {
  if (!axios.isAxiosError(error)) return false;
  const status = error.response?.status;
  const data = error.response?.data as { error?: unknown } | undefined;
  return status === 401 || data?.error === 'reauthorization_required';
}

export function AdminAuthBoundary({ children }: { children: ReactNode }) {
  const [authentication, setAuthentication] = useState<DashboardAuthenticationState>({ status: 'loading' });
  const [storeName, setStoreName] = useState('Mağaza');
  const [storeLoadFailed, setStoreLoadFailed] = useState(false);
  const loaderClosedRef = useRef(false);

  const handleApiAuthenticationFailure = useCallback((error: unknown) => {
    if (!isAuthenticationBoundaryFailure(error)) return false;
    setAuthentication({ status: 'authentication_required' });
    return true;
  }, []);

  const fetchStoreName = useCallback(async (token: string) => {
    setStoreLoadFailed(false);
    try {
      const response = await ApiRequests.ikas.getMerchant(token);
      const nextStoreName = response.data?.data?.merchantInfo?.storeName;
      if (response.status === 200 && typeof nextStoreName === 'string' && nextStoreName.trim()) {
        setStoreName(nextStoreName);
      }
    } catch (error) {
      if (!handleApiAuthenticationFailure(error)) setStoreLoadFailed(true);
    }
  }, [handleApiAuthenticationFailure]);

  useEffect(() => {
    if (loaderClosedRef.current) return;
    loaderClosedRef.current = true;
    AppBridgeHelper.closeLoader();
  }, []);

  useEffect(() => {
    let cancelled = false;
    void TokenHelpers.getTokenForIframeApp()
      .then((token) => {
        if (cancelled) return;
        if (!token) {
          setAuthentication({ status: 'authentication_required' });
          return;
        }
        setAuthentication({ status: 'ready', token });
        void fetchStoreName(token);
        void ApiRequests.ikas.syncStorefrontTheme(token, 'dashboard_open').catch((error) => {
          handleApiAuthenticationFailure(error);
        });
      })
      .catch(() => {
        if (!cancelled) setAuthentication({ status: 'authentication_required' });
      });
    return () => {
      cancelled = true;
    };
  }, [fetchStoreName, handleApiAuthenticationFailure]);

  const activeToken = authentication.status === 'ready' ? authentication.token : null;
  const getAuthHeader = useCallback(async () => {
    if (!activeToken) throw new Error('authentication_required');
    const freshToken = await TokenHelpers.getTokenForIframeApp();
    return { Authorization: `JWT ${freshToken || activeToken}` };
  }, [activeToken]);

  const retryStore = useCallback(() => {
    if (activeToken) void fetchStoreName(activeToken);
  }, [activeToken, fetchStoreName]);

  if (authentication.status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background" role="status" aria-live="polite">
        <p style={{ fontSize: typography.fontSize.base, color: colors.textMuted }}>Kimlik doğrulanıyor...</p>
      </div>
    );
  }

  if (authentication.status === 'authentication_required') {
    return (
      <div className="min-h-screen max-w-[1200px] bg-background p-6">
        <div className="rounded-xl border border-dashed bg-muted p-20 text-center">
          <h3 className="mb-2" style={{ fontSize: typography.fontSize.lg, fontWeight: typography.fontWeight.medium, color: colors.textPrimary }}>
            Authentication Required
          </h3>
          <p style={{ fontSize: typography.fontSize.base, color: colors.textMuted }}>Please authenticate to access the Review Dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    <AdminShellProvider
      token={authentication.token}
      getAuthHeader={getAuthHeader}
      handleApiAuthenticationFailure={handleApiAuthenticationFailure}
      storeName={storeName}
      storeLoadFailed={storeLoadFailed}
      retryStore={retryStore}
    >
      {children}
    </AdminShellProvider>
  );
}
