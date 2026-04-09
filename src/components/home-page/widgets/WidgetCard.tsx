import React from 'react';
import { Settings2 } from 'lucide-react';
import { colors, componentStyles, radii, shadows, typography } from '@/lib/design-tokens';
import { WidgetDef } from './widgetDefs';

interface WidgetCardProps {
  widget: WidgetDef;
  enabled: boolean;
  preview: React.ReactNode;
  onCustomize: () => void;
}

export function WidgetCard({ widget, enabled, preview, onCustomize }: WidgetCardProps) {
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
          {/* Aktif/Pasif badge */}
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
        </div>
        <div style={{ fontSize: typography.fontSize.base, color: colors.textSecondary, lineHeight: '1.6', flex: 1 }}>
          {widget.description}
        </div>

        {/* Butonlar */}
        <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
          <button
            style={{ ...componentStyles.btnSm, display: 'flex', alignItems: 'center', gap: 6 }}
            onClick={onCustomize}
          >
            <Settings2 size={14} />
            Özelleştir
          </button>
        </div>
      </div>
    </div>
  );
}
