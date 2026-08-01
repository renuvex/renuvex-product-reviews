import type { ReactNode } from 'react';

export default function WidgetEditorLayout({ children }: { children: ReactNode }) {
  return <main className="h-screen min-h-[620px] w-full overflow-hidden bg-background p-4 sm:p-6">{children}</main>;
}
