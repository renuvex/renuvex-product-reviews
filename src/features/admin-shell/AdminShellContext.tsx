'use client';

import { createContext, useContext, useMemo, type ReactNode } from 'react';

type AdminShellContextValue = {
  token: string;
  getAuthHeader: () => Promise<{ Authorization: string }>;
  handleApiAuthenticationFailure: (error: unknown) => boolean;
  storeName: string;
  storeLoadFailed: boolean;
  retryStore: () => void;
};

const AdminShellContext = createContext<AdminShellContextValue | null>(null);

type AdminShellProviderProps = {
  children: ReactNode;
  token: string;
  getAuthHeader: AdminShellContextValue['getAuthHeader'];
  handleApiAuthenticationFailure: AdminShellContextValue['handleApiAuthenticationFailure'];
  storeName: string;
  storeLoadFailed: boolean;
  retryStore: AdminShellContextValue['retryStore'];
};

export function AdminShellProvider({
  children,
  token,
  getAuthHeader,
  handleApiAuthenticationFailure,
  storeName,
  storeLoadFailed,
  retryStore,
}: AdminShellProviderProps) {
  const value = useMemo<AdminShellContextValue>(() => ({
    token,
    getAuthHeader,
    handleApiAuthenticationFailure,
    storeName,
    storeLoadFailed,
    retryStore,
  }), [
    getAuthHeader,
    handleApiAuthenticationFailure,
    retryStore,
    storeLoadFailed,
    storeName,
    token,
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
