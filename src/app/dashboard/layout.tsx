import type { ReactNode } from 'react';

import { AdminAuthBoundary } from '@/features/admin-shell/AdminAuthBoundary';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return <AdminAuthBoundary>{children}</AdminAuthBoundary>;
}
