import { notFound } from 'next/navigation';

import { WidgetEditorScreen } from '@/features/widget-management/WidgetEditorScreen';
import { resolveConfigurableWidget, resolveWidgetDefinition } from '@/lib/widgets/catalog';

export default async function WidgetEditorPage({ params }: { params: Promise<{ widgetId: string }> }) {
  const { widgetId } = await params;
  const widget = resolveWidgetDefinition(widgetId);
  if (!widget) notFound();

  const configurable = resolveConfigurableWidget(widget.id);
  if (!configurable.ok) {
    return (
      <div className="rounded-lg border border-dashed bg-muted/30 p-10 text-center">
        <h2 className="text-lg font-semibold">{widget.name}</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {widget.releaseStatus === 'planned' ? 'Bu widget yakında kullanıma açılacak.' : 'Bu widget için özelleştirme bulunmuyor.'}
        </p>
      </div>
    );
  }

  return <WidgetEditorScreen widgetId={configurable.widget.id} />;
}
