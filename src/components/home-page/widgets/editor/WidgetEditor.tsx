'use client';

import React, { Suspense, lazy, useState, useCallback, useEffect, useRef } from 'react';
import { ArrowLeft, Save, Smartphone, Tablet, Monitor } from 'lucide-react';
import { InfoTooltip } from './InfoTooltip';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { colors, componentStyles, radii, typography, opacity, shadows } from '@/lib/design-tokens';
import { WidgetDef, collectSettingFields } from '../widgetDefs';
import { SettingsPanel } from './SettingsPanel';
import { ColorPickerField } from './ColorPickerField';

// Widgets that support iframe preview (real widget.js)
const IFRAME_PREVIEW_WIDGETS = ['reviews'];
const RENUVEX_PR_WIDGET_READY = 'RENUVEX_PR_WIDGET_READY';
const RENUVEX_PR_SETTINGS_UPDATE = 'RENUVEX_PR_SETTINGS_UPDATE';
const RENUVEX_PR_PREVIEW_SETTINGS_KEY = 'renuvex_pr_preview_settings';

const VIEWPORT_PRESETS = [
  { key: 'mobile',  label: 'Mobil',   icon: Smartphone, width: 390  },
  { key: 'tablet',  label: 'Tablet',  icon: Tablet,     width: 768  },
  { key: 'desktop', label: 'Masaüstü', icon: Monitor,   width: '100%' },
] as const;

const DEFAULT_PREVIEW_BG = '#FFFFFF';
const OPAQUE_HEX_COLOR_RE = /^#[0-9A-Fa-f]{6}$/;

function PreviewBackgroundInfo() {
  return (
    <InfoTooltip
      label="Önizleme arka planı"
      message="Bu renk sadece admin önizleme zeminini değiştirir. Mağazadaki widget arka planı şeffaf kalır."
    />
  );
}

// widgetDef'teki default değerlerden başlangıç ayarlarını üret,
// DB'den gelen savedSettings ile override et (eksik key'ler default'tan gelir)
function mergeWithDefaults(widget: WidgetDef, savedSettings: WidgetSettingsDraft): WidgetSettingsDraft {
  const defaults: WidgetSettingsDraft = {};
  for (const field of collectSettingFields(widget.settings)) {
    defaults[field.key] = field.default;
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

function isWidgetReadyMessage(data: unknown): boolean {
  return (
    typeof data === 'object' &&
    data !== null &&
    'type' in data &&
    (data as { type?: unknown }).type === RENUVEX_PR_WIDGET_READY
  );
}

function postPreviewSettingsUpdate(targetWindow: Window, settings: WidgetSettingsDraft) {
  targetWindow.postMessage({ type: RENUVEX_PR_SETTINGS_UPDATE, settings }, '*');
}

// ─── Component ───────────────────────────────────────────────────────────────

export function WidgetEditor({ widget, savedSettings, saving, onCommit, onBack }: WidgetEditorProps) {
  const [draft, setDraft] = useState<WidgetSettingsDraft>(() => mergeWithDefaults(widget, savedSettings));
  const [showUnsavedModal, setShowUnsavedModal] = useState(false);
  const [viewport, setViewport] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const [previewBgColor, setPreviewBgColor] = useState(DEFAULT_PREVIEW_BG);
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

  // Widget iframe'i hazır olduğunu bildirdiğinde mevcut draft'ı gönder.
  useEffect(() => {
    if (!useIframe) return;
    function onMessage(event: MessageEvent) {
      if (!isWidgetReadyMessage(event.data)) return;
      if (widgetReadyRef.current) return;
      widgetReadyRef.current = true;
      if (iframeRef.current?.contentWindow) {
        postPreviewSettingsUpdate(iframeRef.current.contentWindow, draftRef.current);
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
        postPreviewSettingsUpdate(iframeRef.current.contentWindow, draft);
      }
    }, 50);
    return () => clearTimeout(timer);
  }, [draft, useIframe]);

  // draft değişince sessionStorage'a yaz — iframe flash önlemek için (effect içinde, render'da değil)
  useEffect(() => {
    sessionStorage.setItem(RENUVEX_PR_PREVIEW_SETTINGS_KEY, JSON.stringify(draft));
  }, [draft]);

  const dirty = isDirty(draft, mergeWithDefaults(widget, savedSettings));

  const PreviewComponent = PREVIEW_MAP[widget.id] ?? null;
  const viewportWidth = VIEWPORT_PRESETS.find(v => v.key === viewport)?.width ?? '100%';
  const isDesktopPreview = viewport === 'desktop';
  const previewBackground = OPAQUE_HEX_COLOR_RE.test(previewBgColor) ? previewBgColor : DEFAULT_PREVIEW_BG;

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
        <DialogContent className="sm:max-w-xl" aria-describedby={undefined}>
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
          <div className="renuvex-pr-settings-scroll" style={{ width: '380px', flexShrink: 0, overflowY: 'auto', overflowX: 'hidden', height: '100%', paddingRight: 8, paddingLeft: 16 }}>
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
              boxShadow: '0 3px 8px rgba(18, 25, 38, 0.10)',
              display: 'grid',
              gridTemplateColumns: useIframe ? '1fr auto 1fr' : '1fr',
              alignItems: 'center',
              gap: 12,
              minHeight: 48,
              position: 'relative',
              zIndex: 2,
            }}>
              {useIframe && (
                <>
                  <div aria-hidden />
                  <ColorPickerField
                    label="Önizleme Arka Planı"
                    value={previewBgColor}
                    onCommit={(value) => setPreviewBgColor(value)}
                    labelAddon={<PreviewBackgroundInfo />}
                    showValue
                    rowStyle={{ minWidth: 286, gap: 6 }}
                    labelStyle={{
                      fontSize: 14,
                      fontWeight: typography.fontWeight.medium,
                      color: colors.textPrimary,
                    }}
                    valueBoxStyle={{ borderColor: colors.textMuted }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 4 }}>
                    {VIEWPORT_PRESETS.map(({ key, label, icon: Icon }) => (
                      <button
                        key={key}
                        title={label}
                        onClick={() => setViewport(key as typeof viewport)}
                        style={{
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          width: 28, height: 28, borderRadius: radii.default, border: 'none',
                          cursor: 'pointer',
                          backgroundColor: viewport === key ? colors.primaryBg : 'transparent',
                          color: viewport === key ? colors.primary : colors.textMuted,
                        }}
                      >
                        <Icon size={18} />
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Preview content */}
            <div style={{ flex: 1, minHeight: 0, overflow: 'auto', display: 'flex', justifyContent: 'center', backgroundColor: useIframe ? previewBackground : colors.bgPage, padding: useIframe ? (isDesktopPreview ? 0 : 16) : 32 }}>
              {useIframe ? (
                <div style={{
                  width: viewportWidth,
                  maxWidth: '100%',
                  height: '100%',
                  minHeight: 0,
                  transition: 'width 0.25s ease',
                  borderRadius: isDesktopPreview ? 0 : radii.lg,
                  overflow: 'hidden',
                  backgroundColor: previewBackground,
                  boxShadow: isDesktopPreview ? 'none' : '0 2px 12px rgba(0,0,0,0.08)',
                }}>
                  <iframe
                    ref={iframeRef}
                    src={iframeSrc}
                    style={{ width: '100%', height: '100%', border: 'none', display: 'block', backgroundColor: 'transparent' }}
                    title="Widget Önizleme"
                    onLoad={() => {
                      widgetReadyRef.current = false;
                      // Ready event zaten geldiyse veya gelmezse 100ms sonra fallback gönder.
                      setTimeout(() => {
                        if (iframeRef.current?.contentWindow) {
                          widgetReadyRef.current = true;
                          postPreviewSettingsUpdate(iframeRef.current.contentWindow, draftRef.current);
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
