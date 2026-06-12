'use client';

import React, { Suspense, lazy, useState, useCallback, useEffect, useLayoutEffect, useMemo, useReducer, useRef } from 'react';
import { AlertCircle, ArrowLeft, Loader2, RefreshCw, Save, Smartphone, Tablet, Monitor } from 'lucide-react';
import { InfoTooltip } from './InfoTooltip';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { colors, componentStyles, radii, typography, opacity, shadows } from '@/lib/design-tokens';
import type { WidgetDef } from '../widgetDefs';
import { SettingsPanel } from './SettingsPanel';
import { ColorPickerField } from './ColorPickerField';
import {
  mergeWithDefaults,
  sameSettingsDraft,
  shouldSyncDraftFromSaved,
  type WidgetSettingsDraft,
} from './WidgetEditorState';
import {
  INITIAL_WIDGET_PREVIEW_LOAD_STATE,
  reduceWidgetPreviewLoadState,
  shouldShowPreviewOverlay,
  type WidgetPreviewStatus,
} from './WidgetPreviewLoadState';

// Widgets that support iframe preview (real widget.js)
const IFRAME_PREVIEW_WIDGETS = ['reviews'];
const RENUVEX_PR_WIDGET_READY = 'RENUVEX_PR_WIDGET_READY';
const RENUVEX_PR_SETTINGS_UPDATE = 'RENUVEX_PR_SETTINGS_UPDATE';
const RENUVEX_PR_PREVIEW_SETTINGS_KEY = 'renuvex_pr_preview_settings';
const PREVIEW_SLOW_TIMEOUT_MS = 2500;
const PREVIEW_ERROR_TIMEOUT_MS = 15000;

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

// ─── Lazy preview map ────────────────────────────────────────────────────────
// Yeni widget eklenince buraya 1 satır ekle, başka hiçbir şeye dokunma.

const PREVIEW_MAP: Record<string, React.LazyExoticComponent<React.ComponentType<PreviewProps>>> = {
  reviews: lazy(() => import('../widget-previews/ReviewsWidgetPreview').then(m => ({ default: m.ReviewsWidgetPreview }))),
  badge:   lazy(() => import('../widget-previews/BadgeWidgetPreview').then(m => ({ default: m.BadgeWidgetPreview }))),
};

// ─── Types ───────────────────────────────────────────────────────────────────

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
  return !sameSettingsDraft(a, b);
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

function hasRenderedIframePreview(targetWindow: Window | null): boolean {
  try {
    const mount = targetWindow?.document.querySelector('[data-renuvex-widget="reviews"]');
    return Boolean(mount?.shadowRoot?.childNodes.length);
  } catch {
    return false;
  }
}

function PreviewLoadOverlay({ status, onRetry }: { status: WidgetPreviewStatus; onRetry: () => void }) {
  const isError = status === 'error';
  const title = isError
    ? 'Önizleme yüklenemedi'
    : status === 'slow'
      ? 'Önizleme normalden uzun sürüyor...'
      : 'Önizleme yükleniyor...';
  const description = isError
    ? 'Widget önizlemesi hazır olmadı. Ayarları düzenlemeye devam edebilir veya önizlemeyi tekrar deneyebilirsiniz.'
    : status === 'slow'
      ? 'Widget dosyaları veya önizleme verileri yavaş yükleniyor. Ayar panelini kullanmaya devam edebilirsiniz.'
      : 'Widget önizlemesi hazırlanıyor.';

  return (
    <div
      role={isError ? 'alert' : 'status'}
      aria-live={isError ? 'assertive' : 'polite'}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        backgroundColor: 'rgba(255, 255, 255, 0.92)',
        color: colors.textPrimary,
        textAlign: 'center',
      }}
    >
      <div
        style={{
          maxWidth: 360,
          backgroundColor: colors.bgWhite,
          border: `1px solid ${isError ? colors.errorBorder : colors.borderDefault}`,
          borderRadius: radii.lg,
          boxShadow: shadows.antCard,
          padding: 20,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 10 }}>
          {isError ? (
            <AlertCircle size={24} color={colors.error} />
          ) : (
            <Loader2 size={24} color={colors.primary} />
          )}
        </div>
        <div style={{ fontSize: typography.fontSize.base, fontWeight: typography.fontWeight.medium, marginBottom: 6 }}>
          {title}
        </div>
        <p style={{ fontSize: typography.fontSize.sm, color: colors.textSecondary, lineHeight: typography.lineHeight.normal, marginBottom: isError ? 14 : 0 }}>
          {description}
        </p>
        {isError && (
          <button
            type="button"
            onClick={onRetry}
            style={{ ...componentStyles.btnPrimary, display: 'inline-flex', alignItems: 'center', gap: 6 }}
          >
            <RefreshCw size={14} />
            Tekrar Dene
          </button>
        )}
      </div>
    </div>
  );
}

// ─── Component ───────────────────────────────────────────────────────────────

export function WidgetEditor({ widget, savedSettings, saving, onCommit, onBack }: WidgetEditorProps) {
  const [draft, setDraft] = useState<WidgetSettingsDraft>(() => mergeWithDefaults(widget, savedSettings));
  const [showUnsavedModal, setShowUnsavedModal] = useState(false);
  const [viewport, setViewport] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const [previewBgColor, setPreviewBgColor] = useState(DEFAULT_PREVIEW_BG);
  const [previewLoadState, dispatchPreviewLoadState] = useReducer(
    reduceWidgetPreviewLoadState,
    INITIAL_WIDGET_PREVIEW_LOAD_STATE,
  );
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const widgetReadyRef = useRef(false);
  const draftRef = useRef<WidgetSettingsDraft>({});
  const previewRequestKeyRef = useRef(previewLoadState.requestKey);
  const savedDraft = useMemo(() => mergeWithDefaults(widget, savedSettings), [widget, savedSettings]);
  const previousSavedDraftRef = useRef<WidgetSettingsDraft>(savedDraft);
  const previousWidgetIdRef = useRef(widget.id);
  const useIframe = IFRAME_PREVIEW_WIDGETS.includes(widget.id);

  // Sync late saved settings only while the local draft is still untouched.
  useLayoutEffect(() => {
    const previousSavedDraft = previousSavedDraftRef.current;
    const widgetChanged = previousWidgetIdRef.current !== widget.id;

    previousSavedDraftRef.current = savedDraft;
    previousWidgetIdRef.current = widget.id;

    setDraft((currentDraft) => {
      if (!shouldSyncDraftFromSaved(currentDraft, previousSavedDraft, widgetChanged)) return currentDraft;
      return sameSettingsDraft(currentDraft, savedDraft) ? currentDraft : savedDraft;
    });
  }, [savedDraft, widget.id]);

  // draft'ı ref'te tut — ready event geldiğinde stale closure olmasın
  useEffect(() => {
    draftRef.current = draft;
  }, [draft]);

  useEffect(() => {
    previewRequestKeyRef.current = previewLoadState.requestKey;
  }, [previewLoadState.requestKey]);

  useEffect(() => {
    if (!useIframe) return;
    const requestKey = previewLoadState.requestKey;

    widgetReadyRef.current = false;
    dispatchPreviewLoadState({ type: 'start', requestKey });

    const slowTimer = window.setTimeout(() => {
      dispatchPreviewLoadState({ type: 'slow', requestKey });
    }, PREVIEW_SLOW_TIMEOUT_MS);
    const errorTimer = window.setTimeout(() => {
      dispatchPreviewLoadState({ type: 'error', requestKey });
    }, PREVIEW_ERROR_TIMEOUT_MS);

    return () => {
      window.clearTimeout(slowTimer);
      window.clearTimeout(errorTimer);
    };
  }, [useIframe, previewLoadState.requestKey]);

  // Widget iframe'i hazır olduğunu bildirdiğinde mevcut draft'ı gönder.
  useEffect(() => {
    if (!useIframe) return;
    function onMessage(event: MessageEvent) {
      if (!isWidgetReadyMessage(event.data)) return;
      if (event.source !== iframeRef.current?.contentWindow) return;
      const requestKey = previewRequestKeyRef.current;
      dispatchPreviewLoadState({ type: 'ready', requestKey });
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

  const dirty = isDirty(draft, savedDraft);

  const PreviewComponent = PREVIEW_MAP[widget.id] ?? null;
  const viewportWidth = VIEWPORT_PRESETS.find(v => v.key === viewport)?.width ?? '100%';
  const isDesktopPreview = viewport === 'desktop';
  const previewBackground = OPAQUE_HEX_COLOR_RE.test(previewBgColor) ? previewBgColor : DEFAULT_PREVIEW_BG;

  const iframeSrc = '/preview';
  const handlePreviewRetry = useCallback(() => {
    widgetReadyRef.current = false;
    dispatchPreviewLoadState({ type: 'retry' });
  }, []);

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
                  position: 'relative',
                }}>
                  <iframe
                    key={previewLoadState.requestKey}
                    ref={iframeRef}
                    src={iframeSrc}
                    style={{ width: '100%', height: '100%', border: 'none', display: 'block', backgroundColor: 'transparent' }}
                    title="Widget Önizleme"
                    onLoad={(event) => {
                      const frameWindow = event.currentTarget.contentWindow;
                      // Ready event zaten geldiyse veya gelmezse 100ms sonra fallback gönder.
                      setTimeout(() => {
                        if (frameWindow && iframeRef.current?.contentWindow === frameWindow) {
                          widgetReadyRef.current = true;
                          postPreviewSettingsUpdate(frameWindow, draftRef.current);
                          if (hasRenderedIframePreview(frameWindow)) {
                            dispatchPreviewLoadState({ type: 'ready', requestKey: previewRequestKeyRef.current });
                          }
                        }
                      }, 100);
                    }}
                  />
                  {shouldShowPreviewOverlay(previewLoadState.status) && (
                    <PreviewLoadOverlay
                      status={previewLoadState.status}
                      onRetry={handlePreviewRetry}
                    />
                  )}
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
