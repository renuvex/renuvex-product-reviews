import React from 'react';
import { AlertCircle, ArrowLeft, RefreshCw } from 'lucide-react';
import { colors, componentStyles, radii, shadows, typography } from '@/lib/design-tokens';
import type { ConfigurableWidgetDefinition } from '@/lib/widgets/catalog';

interface EditorSettingsErrorProps {
  widget: ConfigurableWidgetDefinition;
  onBack: () => void;
  onRetry: () => void;
}

export function EditorSettingsError({ widget, onBack, onRetry }: EditorSettingsErrorProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0 }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 20,
        marginBottom: 20,
        borderBottom: `1px solid ${colors.borderDefault}`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={onBack} style={{ ...componentStyles.btnSm, display: 'flex', alignItems: 'center', gap: 6, color: colors.textSecondary }}>
            <ArrowLeft size={14} />
            Geri
          </button>
          <div>
            <h2 style={{ fontSize: typography.fontSize.xl, fontWeight: typography.fontWeight.medium, color: colors.textPrimary, lineHeight: 1.2 }}>
              {widget.name}
            </h2>
            <p style={{ fontSize: typography.fontSize.sm, color: colors.textSecondary, marginTop: 2 }}>
              {widget.description}
            </p>
          </div>
        </div>
      </div>

      <div style={{
        flex: 1,
        minHeight: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.bgPage,
        border: `1px solid ${colors.borderDefault}`,
        borderRadius: radii.lg,
        padding: 24,
      }}>
        <div
          role="alert"
          style={{
            width: '100%',
            maxWidth: 460,
            backgroundColor: colors.bgWhite,
            border: `1px solid ${colors.errorBorder}`,
            borderRadius: radii.lg,
            boxShadow: shadows.antCard,
            padding: 24,
            textAlign: 'center',
          }}
        >
          <AlertCircle size={32} color={colors.error} style={{ margin: '0 auto 12px' }} />
          <h3 style={{ fontSize: typography.fontSize.lg, fontWeight: typography.fontWeight.medium, color: colors.textPrimary, marginBottom: 8 }}>
            Ayarlar yüklenemedi
          </h3>
          <p style={{ fontSize: typography.fontSize.base, color: colors.textSecondary, lineHeight: typography.lineHeight.normal, marginBottom: 20 }}>
            Kayıtlı widget ayarlarına ulaşılamadığı için özelleştirme ekranı açılmadı. Tekrar deneyin veya geri dönün.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 8, flexWrap: 'wrap' }}>
            <button onClick={onBack} style={componentStyles.btnDefault}>
              Geri
            </button>
            <button onClick={onRetry} style={{ ...componentStyles.btnPrimary, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <RefreshCw size={14} />
              Tekrar Dene
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
