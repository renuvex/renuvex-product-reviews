'use client';

import { useEffect, useState, useCallback } from 'react';
import { TokenHelpers } from '@/helpers/token-helpers';
import { ApiRequests } from '@/lib/api-requests';
import { colors, typography } from '@/lib/design-tokens';
import HomePage from '../../components/home-page';

type DashboardAuthenticationState =
  | { status: 'loading' }
  | { status: 'authentication_required' }
  | { status: 'ready'; token: string };

export default function DashboardPage() {
  const [authentication, setAuthentication] = useState<DashboardAuthenticationState>({ status: 'loading' });
  const [storeName, setStoreName] = useState('');

  /**
   * Fetches and sets the store name using the provided token.
   */
  const fetchStoreName = useCallback(async (currentToken: string) => {
    try {
      const res = await ApiRequests.ikas.getMerchant(currentToken);
      if (res.status === 200 && res.data?.data?.merchantInfo?.storeName) {
        setStoreName(res.data.data.merchantInfo.storeName);
      }
    } catch (error) {
      console.error('Error fetching store name:', error);
    }
  }, []);

  /**
   * Initializes the dashboard by fetching the token and store name.
   */
  const initializeDashboard = useCallback(async () => {
    try {
      const fetchedToken = await TokenHelpers.getTokenForIframeApp();
      if (!fetchedToken) {
        setAuthentication({ status: 'authentication_required' });
        return;
      }

      setAuthentication({ status: 'ready', token: fetchedToken });
      await fetchStoreName(fetchedToken);
      ApiRequests.ikas.syncStorefrontTheme(fetchedToken, 'dashboard_open').catch(() => {});
    } catch (error) {
      console.error('Error initializing dashboard:', error);
      setAuthentication({ status: 'authentication_required' });
    }
  }, [fetchStoreName]);

  // Close the loader shown by ikas platform when opening the iframe
  useEffect(() => {
    const { AppBridgeHelper } = require('@ikas/app-helpers');
    AppBridgeHelper.closeLoader();
  }, []);

  // Run initialization on mount
  useEffect(() => {
    initializeDashboard();
  }, [initializeDashboard]);

  if (authentication.status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background" role="status" aria-live="polite">
        <p style={{ fontSize: typography.fontSize.base, color: colors.textMuted }}>Kimlik doğrulanıyor...</p>
      </div>
    );
  }

  if (authentication.status === 'authentication_required') {
    return (
      <div className="max-w-[1200px] mx-auto p-6 bg-background min-h-[100vh]">
        <div className="text-center p-20 bg-muted rounded-xl border border-dashed">
          <h3 className="mb-2" style={{ fontSize: typography.fontSize.lg, fontWeight: typography.fontWeight.medium, color: colors.textPrimary }}>Authentication Required</h3>
          <p style={{ fontSize: typography.fontSize.base, color: colors.textMuted }}>Please authenticate to access the Review Dashboard.</p>
        </div>
      </div>
    );
  }

  return <HomePage token={authentication.token} storeName={storeName || 'Test Mağaza'} />;
}
