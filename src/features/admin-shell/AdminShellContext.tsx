'use client';

import { createContext, useCallback, useContext, useMemo, useRef, type ReactNode } from 'react';

export type AdminNavigationBlocker = (href: string) => boolean;

type AdminShellContextValue = {
  token: string;
  getAuthHeader: () => Promise<{ Authorization: string }>;
  handleApiAuthenticationFailure: (error: unknown) => boolean;
  registerNavigationBlocker: (blocker: AdminNavigationBlocker) => () => void;
  tryBlockNavigation: (href: string) => boolean;
};

const AdminShellContext = createContext<AdminShellContextValue | null>(null);

type AdminShellProviderProps = {
  children: ReactNode;
  token: string;
  getAuthHeader: AdminShellContextValue['getAuthHeader'];
  handleApiAuthenticationFailure: AdminShellContextValue['handleApiAuthenticationFailure'];
};

export function AdminShellProvider({
  children,
  token,
  getAuthHeader,
  handleApiAuthenticationFailure,
}: AdminShellProviderProps) {
  const navigationBlockerRef = useRef<AdminNavigationBlocker | null>(null);

  const registerNavigationBlocker = useCallback((blocker: AdminNavigationBlocker) => {
    navigationBlockerRef.current = blocker;
    return () => {
      if (navigationBlockerRef.current === blocker) {
        navigationBlockerRef.current = null;
      }
    };
  }, []);

  const tryBlockNavigation = useCallback((href: string) => {
    return navigationBlockerRef.current?.(href) ?? false;
  }, []);

  const value = useMemo<AdminShellContextValue>(() => ({
    token,
    getAuthHeader,
    handleApiAuthenticationFailure,
    registerNavigationBlocker,
    tryBlockNavigation,
  }), [
    getAuthHeader,
    handleApiAuthenticationFailure,
    registerNavigationBlocker,
    token,
    tryBlockNavigation,
  ]);

  return <AdminShellContext.Provider value={value}>{children}</AdminShellContext.Provider>;
}

export function useAdminShell() {
  const context = useContext(AdminShellContext);
  if (!context) {
    throw new Error('useAdminShell must be used within AdminShellProvider');
  }
  return context;
}
