import type { ReactNode } from 'react';

import { AdminShell } from '@/features/admin-shell/AdminShell';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}
