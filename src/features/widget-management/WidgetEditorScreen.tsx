'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { resolveConfigurableWidget, type WidgetId } from '@/lib/widgets/catalog';

import { EditorSettingsError } from './components/editor/EditorSettingsError';
import { EditorSkeleton } from './components/editor/EditorSkeleton';
import { WidgetEditor } from './components/editor/WidgetEditor';
import { useWidgetSettings } from './WidgetSettingsProvider';

export function WidgetEditorScreen({ widgetId }: { widgetId: WidgetId }) {
  const router = useRouter();
  const resolution = resolveConfigurableWidget(widgetId);
  const { settings, meta, status, ensureSettingsLoaded, retrySettings, saveWidgetSettings } = useWidgetSettings();
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (status === 'idle') void ensureSettingsLoaded();
  }, [ensureSettingsLoaded, status]);

  if (!resolution.ok) return null;
  const widget = resolution.widget;

  if (status === 'error') {
    return <EditorSettingsError widget={widget} onBack={() => router.push('/dashboard/widgets')} onRetry={() => void retrySettings()} />;
  }

  if (status !== 'loaded') {
    return <EditorSkeleton widget={widget} onBack={() => router.push('/dashboard/widgets')} />;
  }

  return (
    <div className="h-full min-h-0 overflow-hidden rounded-lg bg-background">
      <WidgetEditor
        widget={widget}
        savedSettings={(settings[widget.id] ?? {}) as Record<string, unknown>}
        allSettings={settings}
        settingsMeta={meta}
        saving={saving}
        onCommit={async (committed) => {
          setSaving(true);
          try {
            await saveWidgetSettings(widget.id, committed);
          } finally {
            setSaving(false);
          }
        }}
      />
    </div>
  );
}
