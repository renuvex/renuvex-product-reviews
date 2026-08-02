'use client';

import { useCallback, useRef, type ReactNode } from 'react';
import { Settings2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { colors, componentStyles, radii, shadows, typography } from '@/lib/design-tokens';
import type { WidgetDefinition } from '@/lib/widgets/catalog';

interface WidgetCardProps {
  widget: WidgetDefinition;
  enabled?: boolean;
  preview: ReactNode;
  customizeHref?: string;
}

export function WidgetCard({ widget, enabled, preview, customizeHref }: WidgetCardProps) {
  const router = useRouter();
  const prefetchedHrefRef = useRef<string | null>(null);
  const prefetchEditor = useCallback(() => {
    if (!customizeHref || prefetchedHrefRef.current === customizeHref) return;
    prefetchedHrefRef.current = customizeHref;
    router.prefetch(customizeHref);
  }, [customizeHref, router]);

  return (
    <div style={{
      backgroundColor: colors.bgWhite,
      border: `1px solid ${colors.borderDefault}`,
      borderRadius: radii.lg,
      boxShadow: shadows.antCard,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Önizleme alanı */}
      <div className="widget-preview-area" style={{
        backgroundColor: widget.previewBg,
        aspectRatio: '4 / 3',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
      }}>
        <div style={{ width: '100%', height: '100%' }}>
          {preview}
        </div>
      </div>

      {/* İçerik */}
      <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
          <div style={{ fontSize: typography.fontSize.base, fontWeight: typography.fontWeight.medium, color: colors.textPrimary }}>
            {widget.name}
          </div>
          {widget.releaseStatus === 'planned' ? (
            <div style={{
              backgroundColor: colors.warningBg,
              border: `1px solid ${colors.warningBorder}`,
              borderRadius: radii.full,
              padding: '2px 10px',
              fontSize: typography.fontSize.xs,
              fontWeight: typography.fontWeight.medium,
              color: colors.warningText,
              flexShrink: 0,
            }}>
              Yakında
            </div>
          ) : enabled !== undefined ? (
            <div style={{
              backgroundColor: enabled ? colors.successBg : colors.bgPage,
              border: `1px solid ${enabled ? colors.successBorder : colors.borderDefault}`,
              borderRadius: radii.full,
              padding: '2px 10px',
              fontSize: typography.fontSize.xs,
              fontWeight: typography.fontWeight.medium,
              color: enabled ? colors.successText : colors.textMuted,
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              flexShrink: 0,
            }}>
              <span style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                backgroundColor: enabled ? colors.success : colors.textMuted,
                display: 'inline-block',
              }} />
              {enabled ? 'Aktif' : 'Pasif'}
            </div>
          ) : null}
        </div>
        <div style={{ fontSize: typography.fontSize.base, color: colors.textSecondary, lineHeight: '1.6', flex: 1 }}>
          {widget.description}
        </div>

        {/* Butonlar */}
        {customizeHref ? (
          <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
            <Link
              href={customizeHref}
              prefetch={false}
              onFocus={prefetchEditor}
              onMouseEnter={prefetchEditor}
              onTouchStart={prefetchEditor}
              style={{ ...componentStyles.btnSm, display: 'flex', alignItems: 'center', gap: 6 }}
            >
              <Settings2 size={14} />
              Özelleştir
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
}
