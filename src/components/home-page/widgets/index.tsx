import React, { useState } from 'react';
import { colors, typography } from '@/lib/design-tokens';
import { WidgetSettingsMap } from '../types';
import { WIDGETS, WidgetDef } from './widgetDefs';
import { WidgetCard } from './WidgetCard';
import { ReviewsPreview } from './previews/ReviewsPreview';
import { BadgePreview } from './previews/BadgePreview';
import { WidgetEditor } from './editor/WidgetEditor';

interface WidgetsContainerProps {
  settings: WidgetSettingsMap;
  onChange: (s: WidgetSettingsMap) => void;
  onSave: (widgetId: string, widgetSettings: Record<string, unknown>) => Promise<void>;
}

// Test amaçlı placeholder preview
function PlaceholderPreview() {
  return (
    <svg viewBox="0 0 280 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <rect x="16" y="10" width="248" height="180" rx="8" fill="white" opacity="0.2" />
      <rect x="40" y="40" width="200" height="12" rx="6" fill="white" opacity="0.5" />
      <rect x="40" y="62" width="160" height="8" rx="4" fill="white" opacity="0.35" />
      <rect x="40" y="80" width="180" height="8" rx="4" fill="white" opacity="0.25" />
      <rect x="40" y="110" width="120" height="40" rx="8" fill="white" opacity="0.2" />
      <rect x="40" y="160" width="80" height="10" rx="5" fill="white" opacity="0.3" />
    </svg>
  );
}

const CARD_PREVIEWS: Record<string, React.ReactNode> = {
  reviews:  <ReviewsPreview />,
  badge:    <BadgePreview />,
  carousel: <PlaceholderPreview />,
  popup:    <PlaceholderPreview />,
  qa:       <PlaceholderPreview />,
  summary:  <PlaceholderPreview />,
};

function getEnabled(settings: WidgetSettingsMap, id: WidgetDef['id']): boolean {
  if (id === 'reviews') return (settings.reviews?.enabled) ?? true;
  if (id === 'badge')   return (settings.badge?.enabled)   ?? true;
  return false;
}

export function WidgetsContainer({ settings, onChange, onSave }: WidgetsContainerProps) {
  const [editingId, setEditingId] = useState<WidgetDef['id'] | null>(null);
  const [saving, setSaving] = useState(false);

  const editingWidget = editingId ? WIDGETS.find(w => w.id === editingId) ?? null : null;

  // Editing widget'ın mevcut ayarlarını al
  const editingWidgetSettings = editingId ? (settings[editingId] ?? {}) as Record<string, unknown> : {};

  // onCommit: draft'ı DB'ye yazar, sonra parent state günceller
  const handleCommit = async (widgetId: string, committed: Record<string, unknown>) => {
    setSaving(true);
    try {
      await onSave(widgetId, committed);
      onChange({ ...settings, [widgetId]: committed });
      setEditingId(null);
    } finally {
      setSaving(false);
    }
  };

  if (editingWidget) {
    return (
      <WidgetEditor
        widget={editingWidget}
        savedSettings={editingWidgetSettings}
        saving={saving}
        onCommit={(committed) => handleCommit(editingWidget.id, committed)}
        onBack={() => setEditingId(null)}
      />
    );
  }

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: typography.fontSize.xl, fontWeight: typography.fontWeight.medium, color: colors.textPrimary }}>
          Widgetlar
        </h2>
        <p style={{ fontSize: typography.fontSize.base, color: colors.textSecondary, marginTop: 4 }}>
          Mağazanızda gösterilecek widget&apos;ları özelleştirin ve yönetin.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
        {WIDGETS.map((widget) => (
          <WidgetCard
            key={widget.id}
            widget={widget}
            enabled={getEnabled(settings, widget.id)}
            preview={CARD_PREVIEWS[widget.id]}
            onCustomize={() => setEditingId(widget.id)}
          />
        ))}
      </div>
    </div>
  );
}
