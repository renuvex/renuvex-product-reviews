import { Loader2 } from 'lucide-react';

export default function WidgetEditorLoading() {
  return (
    <div
      className="flex h-full min-h-[560px] items-center justify-center rounded-lg border bg-background"
      role="status"
      aria-label="Widget editörü yükleniyor"
    >
      <Loader2 className="size-11 animate-spin text-primary" aria-hidden="true" />
    </div>
  );
}
