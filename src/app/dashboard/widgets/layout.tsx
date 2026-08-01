import type { ReactNode } from 'react';

import { WidgetSettingsProvider } from '@/features/widget-management/WidgetSettingsProvider';

export default function WidgetsLayout({ children }: { children: ReactNode }) {
  return <WidgetSettingsProvider>{children}</WidgetSettingsProvider>;
}
