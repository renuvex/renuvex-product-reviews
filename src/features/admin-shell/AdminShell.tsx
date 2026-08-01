'use client';

import { AppBridgeHelper } from '@ikas/app-helpers';
import axios from 'axios';
import { CheckCircle2, MessageSquare, RefreshCw, Settings } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';

import { TokenHelpers } from '@/helpers/token-helpers';
import { ApiRequests } from '@/lib/api-requests';
import { colors, componentStyles, typography } from '@/lib/design-tokens';

import { AdminShellProvider, useAdminShell } from './AdminShellContext';

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

function AdminNavigation() {
  const pathname = usePathname();
  const { tryBlockNavigation } = useAdminShell();
  const items = [
    { href: '/dashboard/reviews', label: 'Yorumlar', icon: MessageSquare },
    { href: '/dashboard/widgets', label: 'Widgetlar', icon: Settings },
  ] as const;

  return (
    <nav className="h-fit w-44 shrink-0 rounded-xl border border-border/50 bg-muted/30 p-1.5" aria-label="Yönetim alanları">
      {items.map(({ href, label, icon: Icon }) => {
        const active = pathname === href || pathname.startsWith(`${href}/`);
        return (
          <Link
            key={href}
            href={href}
            prefetch={false}
            onNavigate={(event) => {
              if (tryBlockNavigation(href)) event.preventDefault();
            }}
            className={`mb-1 flex min-h-9 items-center rounded-lg px-3 py-2 last:mb-0 ${active ? 'bg-background text-primary shadow-sm' : 'text-muted-foreground hover:bg-background/70 hover:text-foreground'}`}
            aria-current={active ? 'page' : undefined}
            style={{ fontSize: typography.fontSize.base, fontWeight: typography.fontWeight.medium }}
          >
            <Icon size={15} className="mr-1.5 shrink-0" aria-hidden="true" />
            <span className="truncate">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

function ShellContent({ children, storeName, storeLoadFailed, onRetryStore }: {
  children: ReactNode;
  storeName: string;
  storeLoadFailed: boolean;
  onRetryStore: () => void;
}) {
  return (
    <div className="min-h-screen w-full bg-background p-4">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 style={{ fontSize: typography.fontSize['2xl'], fontWeight: typography.fontWeight.bold, color: colors.textPrimary }}>
            Değerlendirmeler
          </h1>
          <p className="mt-1" style={{ fontSize: typography.fontSize.base, color: colors.textMuted }}>
            <span style={{ fontWeight: typography.fontWeight.medium, color: colors.textPrimary }}>{storeName}</span> mağazanızın müşteri yorumlarını yönetin.
          </p>
          {storeLoadFailed ? (
            <button type="button" onClick={onRetryStore} className="mt-1 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
              <RefreshCw size={13} aria-hidden="true" /> Mağaza bilgisini tekrar dene
            </button>
          ) : null}
        </div>
        <span style={{ ...componentStyles.badgeApproved, fontSize: typography.fontSize.sm, padding: '4px 12px' }}>
          <CheckCircle2 size={14} style={{ marginRight: 4, display: 'inline' }} /> İkas&apos;a Bağlı
        </span>
      </div>
      <div className="flex gap-4">
        <AdminNavigation />
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}

export function AdminShell({ children }: { children: ReactNode }) {
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

  const token = authentication.token;

  return (
    <AdminShellProvider
      token={token}
      getAuthHeader={getAuthHeader}
      handleApiAuthenticationFailure={handleApiAuthenticationFailure}
    >
      <ShellContent
        storeName={storeName}
        storeLoadFailed={storeLoadFailed}
        onRetryStore={() => void fetchStoreName(token)}
      >
        {children}
      </ShellContent>
    </AdminShellProvider>
  );
}
