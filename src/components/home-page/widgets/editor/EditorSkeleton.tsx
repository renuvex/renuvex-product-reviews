import React from 'react';
import { ArrowLeft, Loader2, Save } from 'lucide-react';
import { colors, componentStyles, radii, typography, opacity } from '@/lib/design-tokens';
import type { WidgetDef } from '../widgetDefs';

// Ayarlar (savedSettings) async yüklenirken WidgetEditor yerine gösterilir.
// Editörün layout iskeletini birebir aynalar — başlık + split-pane — ki gerçek
// editöre geçişte sıçrama olmasın. Yalnız ilk fetch sırasında görünür; ayar
// gelince WidgetsContainer bunu gerçek WidgetEditor ile değiştirir.

interface EditorSkeletonProps {
  widget: WidgetDef;
  onBack: () => void;
}

const PULSE = 'renuvex-pr-skeleton-pulse';

function Bar({ width, height = 12 }: { width: number | string; height?: number }) {
  return (
    <div
      className={PULSE}
      style={{ width, height, backgroundColor: colors.borderLight, borderRadius: radii.default }}
    />
  );
}

export function EditorSkeleton({ widget, onBack }: EditorSkeletonProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0 }}>
      <style>{`@keyframes ${PULSE}{0%,100%{opacity:1}50%{opacity:.5}} .${PULSE}{animation:${PULSE} 1.4s ease-in-out infinite}`}</style>

      {/* Header — gerçek editörle aynı yapı (geri butonu + widget adı anında görünür) */}
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
        <button
          disabled
          style={{ ...componentStyles.btnPrimary, display: 'flex', alignItems: 'center', gap: 6, opacity: opacity.disabled, cursor: 'not-allowed' }}
        >
          <Save size={14} />
          Kaydet
        </button>
      </div>

      {/* Body — split-pane iskeleti (gerçek editörle aynı ölçüler) */}
      <div style={{ display: 'flex', gap: 24, flex: 1, minHeight: 0, overflow: 'hidden' }}>
        {/* Sol — ayar paneli skeleton */}
        <div style={{ width: '380px', flexShrink: 0, height: '100%', paddingRight: 8, paddingLeft: 16, display: 'flex', flexDirection: 'column', gap: 20 }}>
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <Bar width={`${90 + (i % 3) * 20}px`} />
              <Bar width="100%" height={40} />
            </div>
          ))}
        </div>

        {/* Sağ — önizleme alanı: WidgetEditor önizleme overlay'iyle AYNI spinner.
            Böylece ayar yüklenirken (skeleton) ve önizleme yüklenirken (gerçek
            editör) sağ taraf kesintisiz aynı görünür — çift loading hissi olmaz. */}
        <div
          role="status"
          aria-label="Ayarlar yükleniyor"
          style={{
            flex: 1,
            backgroundColor: colors.bgPage,
            borderRadius: radii.lg,
            border: `1px solid ${colors.borderDefault}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Loader2 className="animate-spin" size={44} color={colors.primary} />
        </div>
      </div>
    </div>
  );
}
