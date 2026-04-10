'use client';

import React, { Suspense, lazy, useState, useCallback, useEffect, useRef } from 'react';
import { ArrowLeft, Save, Smartphone, Tablet, Monitor } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { colors, componentStyles, radii, typography, opacity } from '@/lib/design-tokens';
import { WidgetDef } from '../widgetDefs';
import { SettingsPanel } from './SettingsPanel';

// Widgets that support iframe preview (real widget.js)
const IFRAME_PREVIEW_WIDGETS = ['reviews'];

const VIEWPORT_PRESETS = [
  { key: 'mobile',  label: 'Mobil',   icon: Smartphone, width: 390  },
  { key: 'tablet',  label: 'Tablet',  icon: Tablet,     width: 768  },
  { key: 'desktop', label: 'Masaüstü', icon: Monitor,   width: 1100 },
] as const;

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
  const [viewport, setViewport] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const widgetReadyRef = useRef(false);
  const draftRef = useRef<WidgetSettingsDraft>({});
  const useIframe = IFRAME_PREVIEW_WIDGETS.includes(widget.id);

  // Widget değişince (başka widgeta geçilirse) draft sıfırla
  useEffect(() => {
    setDraft(mergeWithDefaults(widget, savedSettings));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [widget.id]);

  // draft'ı ref'te tut — ready event geldiğinde stale closure olmasın
  useEffect(() => {
    draftRef.current = draft;
  }, [draft]);

  // Widget iframe'i hazır olduğunu bildirdiğinde (IKR_WIDGET_READY) mevcut draft'ı gönder
  useEffect(() => {
    if (!useIframe) return;
    function onMessage(event: MessageEvent) {
      if (event.data?.type !== 'IKR_WIDGET_READY') return;
      widgetReadyRef.current = true;
      if (iframeRef.current?.contentWindow) {
        iframeRef.current.contentWindow.postMessage(
          { type: 'IKR_SETTINGS_UPDATE', settings: draftRef.current },
          '*'
        );
      }
    }
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [useIframe]);

  // Draft değişince iframe'e postMessage gönder — debounced (slider spam koruması)
  useEffect(() => {
    if (!useIframe) return;
    if (!widgetReadyRef.current) return;
    const timer = setTimeout(() => {
      if (iframeRef.current?.contentWindow) {
        iframeRef.current.contentWindow.postMessage(
          { type: 'IKR_SETTINGS_UPDATE', settings: draft },
          '*'
        );
      }
    }, 50);
    return () => clearTimeout(timer);
  }, [draft, useIframe]);

  const dirty = isDirty(draft, mergeWithDefaults(widget, savedSettings));

  const PreviewComponent = PREVIEW_MAP[widget.id] ?? null;
  const viewportWidth = VIEWPORT_PRESETS.find(v => v.key === viewport)?.width ?? 1100;

  // iframe src — draft ayarlarını sessionStorage'a yaz, flash önlemek için
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('ikr_preview_settings', JSON.stringify(draft));
  }
  const iframeSrc = '/preview';

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
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle style={componentStyles.dialogTitle}>Kaydedilmemiş Değişiklikler</DialogTitle>
          </DialogHeader>
          <p style={{ fontSize: typography.fontSize.base, color: colors.textSecondary }}>
            Yaptığınız değişiklikler kaydedilmedi. Ne yapmak istersiniz?
          </p>
          <div style={{ display: 'flex', flexDirection: 'row', gap: 8, justifyContent: 'center', flexWrap: 'nowrap', paddingTop: 8 }}>
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
        <div style={{ display: 'flex', gap: 24, flex: 1, minHeight: 0, overflow: 'hidden' }}>

          {/* Sol — Ayarlar */}
          <div className="ikr-settings-scroll" style={{ width: '380px', flexShrink: 0, overflowY: 'auto', overflowX: 'hidden', height: '100%', scrollbarGutter: 'stable' as React.CSSProperties['scrollbarGutter'], paddingRight: 8, paddingLeft: 16 }}>
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
              padding: '10px 16px',
              borderBottom: `1px solid ${colors.borderDefault}`,
              backgroundColor: colors.bgWhite,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 8,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: 'rgb(239,68,68)' }} />
                <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: 'rgb(245,158,11)' }} />
                <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: 'rgb(34,197,94)' }} />
                <span style={{ marginLeft: 8, fontSize: typography.fontSize.xs, color: colors.textMuted, fontWeight: typography.fontWeight.medium }}>
                  Canlı Önizleme
                </span>
              </div>

              {/* Viewport toolbar — sadece iframe preview için */}
              {useIframe && (
                <div style={{ display: 'flex', gap: 4 }}>
                  {VIEWPORT_PRESETS.map(({ key, label, icon: Icon }) => (
                    <button
                      key={key}
                      title={label}
                      onClick={() => setViewport(key as typeof viewport)}
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        width: 32, height: 32, borderRadius: radii.default, border: 'none',
                        cursor: 'pointer',
                        backgroundColor: viewport === key ? colors.primaryBg : 'transparent',
                        color: viewport === key ? colors.primary : colors.textMuted,
                      }}
                    >
                      <Icon size={16} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Preview content */}
            <div style={{ flex: 1, overflow: 'auto', display: 'flex', justifyContent: 'center', backgroundColor: colors.bgPage, padding: useIframe ? 16 : 32 }}>
              {useIframe ? (
                <div style={{
                  width: viewportWidth,
                  maxWidth: '100%',
                  transition: 'width 0.25s ease',
                  border: `1px solid ${colors.borderDefault}`,
                  borderRadius: radii.lg,
                  overflow: 'hidden',
                  backgroundColor: '#fff',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                }}>
                  <iframe
                    ref={iframeRef}
                    src={iframeSrc}
                    style={{ width: '100%', height: '600px', border: 'none', display: 'block' }}
                    title="Widget Önizleme"
                    onLoad={() => {
                      widgetReadyRef.current = false;
                      // IKR_WIDGET_READY zaten geldiyse veya gelmezse 100ms sonra fallback gönder
                      setTimeout(() => {
                        if (iframeRef.current?.contentWindow) {
                          widgetReadyRef.current = true;
                          iframeRef.current.contentWindow.postMessage(
                            { type: 'IKR_SETTINGS_UPDATE', settings: draftRef.current },
                            '*'
                          );
                        }
                      }, 100);
                    }}
                  />
                </div>
              ) : PreviewComponent ? (
                <Suspense fallback={
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: colors.textMuted }}>
                    Yükleniyor...
                  </div>
                }>
                  <PreviewComponent settings={draft} />
                </Suspense>
              ) : (
                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  height: '200px', color: colors.textMuted, fontSize: typography.fontSize.base,
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
