'use client';

import { useEffect } from 'react';

import { colors, typography } from '@/lib/design-tokens';
import { WIDGETS, isConfigurableWidgetDefinition, type WidgetId } from '@/lib/widgets/catalog';

import { WidgetCard } from './components/WidgetCard';
import { BadgePreview } from './components/previews/BadgePreview';
import { ReviewsPreview } from './components/previews/ReviewsPreview';
import { useWidgetSettings } from './WidgetSettingsProvider';
import type { WidgetSettingsMap } from './types';

function PlaceholderPreview() {
  return (
    <svg viewBox="0 0 280 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }} aria-hidden="true">
      <rect x="16" y="10" width="248" height="180" rx="8" fill="white" opacity="0.2" />
      <rect x="40" y="40" width="200" height="12" rx="6" fill="white" opacity="0.5" />
      <rect x="40" y="62" width="160" height="8" rx="4" fill="white" opacity="0.35" />
      <rect x="40" y="80" width="180" height="8" rx="4" fill="white" opacity="0.25" />
      <rect x="40" y="110" width="120" height="40" rx="8" fill="white" opacity="0.2" />
      <rect x="40" y="160" width="80" height="10" rx="5" fill="white" opacity="0.3" />
    </svg>
  );
}

const CARD_PREVIEWS = {
  reviews: <ReviewsPreview />,
  badge: <BadgePreview />,
  carousel: <PlaceholderPreview />,
  popup: <PlaceholderPreview />,
  qa: <PlaceholderPreview />,
  summary: <PlaceholderPreview />,
} satisfies Record<WidgetId, React.ReactNode>;

function getEnabled(settings: WidgetSettingsMap, id: WidgetId): boolean | undefined {
  if (id === 'reviews') return settings.reviews?.enabled ?? true;
  if (id === 'badge') return settings.badge?.enabled ?? true;
  return undefined;
}

export function WidgetCatalogScreen() {
  const { settings, status, ensureSettingsLoaded, retrySettings } = useWidgetSettings();

  useEffect(() => {
    if (status === 'idle') void ensureSettingsLoaded();
  }, [ensureSettingsLoaded, status]);

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: typography.fontSize.xl, fontWeight: typography.fontWeight.medium, color: colors.textPrimary }}>Widgetlar</h2>
        <p style={{ fontSize: typography.fontSize.base, color: colors.textSecondary, marginTop: 4 }}>
          Mağazanızda gösterilecek widget&apos;ları özelleştirin ve yönetin.
        </p>
      </div>

      {status === 'error' ? (
        <div role="alert" className="mb-4 flex items-center justify-between rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm">
          <span>Widget ayarları yüklenemedi.</span>
          <button type="button" onClick={() => void retrySettings()} className="rounded border px-3 py-1.5">Tekrar Dene</button>
        </div>
      ) : null}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 24 }}>
        {WIDGETS.map((widget) => (
          <WidgetCard
            key={widget.id}
            widget={widget}
            enabled={getEnabled(settings, widget.id)}
            preview={CARD_PREVIEWS[widget.id]}
            customizeHref={isConfigurableWidgetDefinition(widget) ? `/dashboard/widgets/${widget.id}` : undefined}
          />
        ))}
      </div>
    </div>
  );
}
