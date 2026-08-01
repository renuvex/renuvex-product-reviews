import type { ReactNode } from 'react';

import { AdminWorkspaceShell } from '@/features/admin-shell/AdminWorkspaceShell';

export default function ReviewsLayout({ children }: { children: ReactNode }) {
  return <AdminWorkspaceShell>{children}</AdminWorkspaceShell>;
}
