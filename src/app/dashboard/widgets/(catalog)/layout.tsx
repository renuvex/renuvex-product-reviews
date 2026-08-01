import type { ReactNode } from 'react';

import { AdminWorkspaceShell } from '@/features/admin-shell/AdminWorkspaceShell';

export default function WidgetCatalogLayout({ children }: { children: ReactNode }) {
  return <AdminWorkspaceShell>{children}</AdminWorkspaceShell>;
}
