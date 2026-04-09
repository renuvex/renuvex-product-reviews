'use client';

import React, { Suspense, lazy, useState, useCallback, useEffect } from 'react';
import { ArrowLeft, Save } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { colors, componentStyles, radii, typography, opacity } from '@/lib/design-tokens';
import { WidgetDef } from '../widgetDefs';
import { SettingsPanel } from './SettingsPanel';

// widgetDef'teki default değerlerden başlangıç ayarlarını üret,
// DB'den gelen savedSettings ile override et (eksik key'ler default'tan gelir)
function mergeWithDefaults(widget: WidgetDef, savedSettings: WidgetSettingsDraft): WidgetSettingsDraft {
  const defaults: WidgetSettingsDraft = {};
  for (const group of widget.settings) {
    for (const field of group.fields) {
      defaults[field.key] = field.default;
    }
  }
  return { ...defaults, ...savedSettings };
}

// ─── Lazy preview map ────────────────────────────────────────────────────────
// Yeni widget eklenince buraya 1 satır ekle, başka hiçbir şeye dokunma.

const PREVIEW_MAP: Record<string, React.LazyExoticComponent<React.ComponentType<PreviewProps>>> = {
  reviews: lazy(() => import('../widget-previews/ReviewsWidgetPreview').then(m => ({ default: m.ReviewsWidgetPreview }))),
  badge:   lazy(() => import('../widget-previews/BadgeWidgetPreview').then(m => ({ default: m.BadgeWidgetPreview }))),
};

// ─── Types ───────────────────────────────────────────────────────────────────

export type WidgetSettingsDraft = Record<string, unknown>;

export interface PreviewProps {
  settings: WidgetSettingsDraft;
}

interface WidgetEditorProps {
  widget: WidgetDef;
  savedSettings: WidgetSettingsDraft;
  saving: boolean;
  onCommit: (committed: WidgetSettingsDraft) => Promise<void>;
  onBack: () => void;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function isDirty(a: WidgetSettingsDraft, b: WidgetSettingsDraft): boolean {
  return JSON.stringify(a) !== JSON.stringify(b);
}

// ─── Component ───────────────────────────────────────────────────────────────

export function WidgetEditor({ widget, savedSettings, saving, onCommit, onBack }: WidgetEditorProps) {
  const mergedSaved = mergeWithDefaults(widget, savedSettings);
  const [draft, setDraft] = useState<WidgetSettingsDraft>(() => mergedSaved);
  const [showUnsavedModal, setShowUnsavedModal] = useState(false);

  // Widget değişince (başka widgeta geçilirse) draft sıfırla
  useEffect(() => {
    setDraft(mergeWithDefaults(widget, savedSettings));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [widget.id]);

  const dirty = isDirty(draft, mergeWithDefaults(widget, savedSettings));

  const PreviewComponent = PREVIEW_MAP[widget.id] ?? null;

  // Kaydet: draft'ı commit et → parent + DB güncellenir
  const handleSave = useCallback(async () => {
    await onCommit(draft);
  }, [onCommit, draft]);

  // Geri: dirty varsa modal aç, yoksa direkt çık
  const handleBack = useCallback(() => {
    if (dirty) {
      setShowUnsavedModal(true);
    } else {
      onBack();
    }
  }, [dirty, onBack]);

  // Modal: kaydet ve çık
  const handleSaveAndExit = useCallback(async () => {
    setShowUnsavedModal(false);
    await onCommit(draft);
  }, [onCommit, draft]);

  // Modal: kaydetmeden çık — draft at, parent dokunulmaz
  const handleDiscardAndExit = useCallback(() => {
    setShowUnsavedModal(false);
    onBack();
  }, [onBack]);

  return (
    <>
      {/* Unsaved changes modal */}
      <Dialog open={showUnsavedModal} onOpenChange={(o) => { if (!o) setShowUnsavedModal(false); }}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle style={componentStyles.dialogTitle}>Kaydedilmemiş Değişiklikler</DialogTitle>
          </DialogHeader>
          <p style={{ fontSize: typography.fontSize.base, color: colors.textSecondary }}>
            Yaptığınız değişiklikler kaydedilmedi. Ne yapmak istersiniz?
          </p>
          <DialogFooter style={{ flexDirection: 'column', gap: 8 }}>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <button style={componentStyles.btnDefault} onClick={() => setShowUnsavedModal(false)}>
                Düzenlemeye Devam Et
              </button>
              <button style={componentStyles.btnOutlineDanger} onClick={handleDiscardAndExit}>
                Kaydetmeden Çık
              </button>
              <button
                style={{ ...componentStyles.btnPrimary, opacity: saving ? opacity.disabled : opacity.full }}
                disabled={saving}
                onClick={handleSaveAndExit}
              >
                {saving ? 'Kaydediliyor...' : 'Kaydet ve Çık'}
              </button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0 }}>

        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingBottom: 20,
          marginBottom: 20,
          borderBottom: `1px solid ${colors.borderDefault}`,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button
              onClick={handleBack}
              style={{
                ...componentStyles.btnSm,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                color: colors.textSecondary,
              }}
            >
              <ArrowLeft size={14} />
              Geri
            </button>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <h2 style={{
                  fontSize: typography.fontSize.xl,
                  fontWeight: typography.fontWeight.medium,
                  color: colors.textPrimary,
                  lineHeight: 1.2,
                }}>
                  {widget.name}
                </h2>
                {dirty && (
                  <span style={{
                    fontSize: typography.fontSize.xs,
                    color: colors.textMuted,
                    backgroundColor: colors.bgPage,
                    border: `1px solid ${colors.borderDefault}`,
                    borderRadius: radii.full,
                    padding: '2px 8px',
                  }}>
                    Kaydedilmemiş değişiklik
                  </span>
                )}
              </div>
              <p style={{ fontSize: typography.fontSize.sm, color: colors.textSecondary, marginTop: 2 }}>
                {widget.description}
              </p>
            </div>
          </div>

          <button
            onClick={handleSave}
            disabled={saving || !dirty}
            style={{
              ...componentStyles.btnPrimary,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              opacity: (saving || !dirty) ? opacity.disabled : opacity.full,
              cursor: (saving || !dirty) ? 'not-allowed' : 'pointer',
            }}
          >
            <Save size={14} />
            {saving ? 'Kaydediliyor...' : 'Kaydet'}
          </button>
        </div>

        {/* Split-pane body */}
        <div style={{ display: 'flex', gap: 24, flex: 1, minHeight: 0 }}>

          {/* Sol — Ayarlar */}
          <div style={{ width: '380px', flexShrink: 0, overflowY: 'auto' }}>
            <SettingsPanel
              groups={widget.settings}
              settings={draft}
              onChange={setDraft}
            />
          </div>

          {/* Sağ — Önizleme */}
          <div style={{
            flex: 1,
            backgroundColor: colors.bgPage,
            borderRadius: radii.lg,
            border: `1px solid ${colors.borderDefault}`,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}>
            {/* Preview header */}
            <div style={{
              padding: '12px 20px',
              borderBottom: `1px solid ${colors.borderDefault}`,
              backgroundColor: colors.bgWhite,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: 'rgb(239,68,68)' }} />
              <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: 'rgb(245,158,11)' }} />
              <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: 'rgb(34,197,94)' }} />
              <span style={{
                marginLeft: 8,
                fontSize: typography.fontSize.xs,
                color: colors.textMuted,
                fontWeight: typography.fontWeight.medium,
              }}>
                Canlı Önizleme
              </span>
            </div>

            {/* Preview content */}
            <div style={{ flex: 1, overflowY: 'auto', padding: 32 }}>
              {PreviewComponent ? (
                <Suspense fallback={
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: colors.textMuted }}>
                    Yükleniyor...
                  </div>
                }>
                  <PreviewComponent settings={draft} />
                </Suspense>
              ) : (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '200px',
                  color: colors.textMuted,
                  fontSize: typography.fontSize.base,
                }}>
                  Bu widget için önizleme henüz hazır değil.
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
