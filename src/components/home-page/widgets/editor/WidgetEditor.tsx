'use client';

import React, { useState, useCallback, useEffect, useLayoutEffect, useMemo, useReducer, useRef } from 'react';
import { AlertCircle, ArrowLeft, Loader2, RefreshCw, Save, Smartphone, Tablet, Monitor } from 'lucide-react';
import { InfoTooltip } from './InfoTooltip';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { colors, componentStyles, radii, typography, opacity } from '@/lib/design-tokens';
import type { ConfigurableWidgetDefinition } from '@/lib/widgets/catalog';
import type { WidgetSettingsMap } from '../../types';
import { SettingsPanel } from './SettingsPanel';
import { ColorPickerField } from './ColorPickerField';
import {
  buildWidgetPreviewSettings,
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
import type { WidgetSettingsMeta } from './WidgetSettingsLoadState';
import {
  RENUVEX_PR_PREVIEW_ERROR,
  RENUVEX_PR_PREVIEW_RENDER,
  RENUVEX_PR_PREVIEW_RENDERED,
  RENUVEX_PR_PREVIEW_RESET_SCROLL,
  RENUVEX_PR_WIDGET_READY,
} from '@/widget/core/namespace.js';
import {
  PREVIEW_PROTOCOL_VERSION,
  getDefaultWidgetPreviewScene,
  getWidgetPreviewScenes,
  isWidgetPreviewScene,
} from '@/widget/preview/scenes.js';

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

// ─── Types ───────────────────────────────────────────────────────────────────

interface WidgetEditorProps {
  widget: ConfigurableWidgetDefinition;
  savedSettings: WidgetSettingsDraft;
  allSettings: WidgetSettingsMap;
  settingsMeta: WidgetSettingsMeta;
  saving: boolean;
  onCommit: (committed: WidgetSettingsDraft) => Promise<void>;
  onBack: () => void;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function isDirty(a: WidgetSettingsDraft, b: WidgetSettingsDraft): boolean {
  return !sameSettingsDraft(a, b);
}

type PreviewMessage = {
  version?: unknown;
  type?: unknown;
  widgetId?: unknown;
  scene?: unknown;
};

function isMatchingPreviewMessage(
  event: MessageEvent,
  iframeWindow: Window | null | undefined,
  widgetId: string,
  scene: string,
): event is MessageEvent<PreviewMessage> {
  const data = event.data as PreviewMessage | null;
  return (
    event.origin === window.location.origin &&
    event.source === iframeWindow &&
    typeof data === 'object' &&
    data !== null &&
    data.version === PREVIEW_PROTOCOL_VERSION &&
    data.widgetId === widgetId &&
    data.scene === scene
  );
}

function postPreviewRender(
  targetWindow: Window,
  widgetId: string,
  scene: string,
  widgets: Record<string, WidgetSettingsDraft>,
) {
  targetWindow.postMessage({
    version: PREVIEW_PROTOCOL_VERSION,
    type: RENUVEX_PR_PREVIEW_RENDER,
    widgetId,
    scene,
    widgets,
  }, window.location.origin);
}

function postPreviewResetScroll(targetWindow: Window, widgetId: string, scene: string) {
  targetWindow.postMessage({
    version: PREVIEW_PROTOCOL_VERSION,
    type: RENUVEX_PR_PREVIEW_RESET_SCROLL,
    widgetId,
    scene,
  }, window.location.origin);
}

function PreviewLoadOverlay({ status, onRetry }: { status: WidgetPreviewStatus; onRetry: () => void }) {
  const isError = status === 'error';
  // loading -> sade spinner (metin/kart yok); slow & error -> tek satir mesaj.
  const message = isError
    ? 'Önizleme yüklenemedi'
    : status === 'slow'
      ? 'Önizleme normalden uzun sürüyor...'
      : '';

  return (
    <div
      role={isError ? 'alert' : 'status'}
      aria-live={isError ? 'assertive' : 'polite'}
      aria-label={status === 'loading' ? 'Önizleme yükleniyor' : undefined}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 14,
        padding: 24,
        backgroundColor: 'rgba(255, 255, 255, 0.92)',
        color: colors.textPrimary,
        textAlign: 'center',
      }}
    >
      {isError ? (
        <AlertCircle size={44} color={colors.error} />
      ) : (
        <Loader2 className="animate-spin" size={44} color={colors.primary} />
      )}
      {message && (
        <div style={{ maxWidth: 420, fontSize: typography.fontSize.lg, fontWeight: typography.fontWeight.medium }}>
          {message}
        </div>
      )}
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
  );
}

// ─── Component ───────────────────────────────────────────────────────────────

export function WidgetEditor({
  widget,
  savedSettings,
  allSettings,
  settingsMeta,
  saving,
  onCommit,
  onBack,
}: WidgetEditorProps) {
  const [draft, setDraft] = useState<WidgetSettingsDraft>(() => mergeWithDefaults(widget, savedSettings));
  const [showUnsavedModal, setShowUnsavedModal] = useState(false);
  const [viewport, setViewport] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const [previewBgColor, setPreviewBgColor] = useState(DEFAULT_PREVIEW_BG);
  const [previewLoadState, dispatchPreviewLoadState] = useReducer(
    reduceWidgetPreviewLoadState,
    INITIAL_WIDGET_PREVIEW_LOAD_STATE,
  );
  const previewScenes = useMemo(() => getWidgetPreviewScenes(widget.id), [widget.id]);
  const [previewScene, setPreviewScene] = useState(() => getDefaultWidgetPreviewScene(widget.id));
  const activePreviewScene = isWidgetPreviewScene(widget.id, previewScene)
    ? previewScene
    : getDefaultWidgetPreviewScene(widget.id);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const widgetReadyRef = useRef(false);
  const previewWidgets = useMemo(
    () => buildWidgetPreviewSettings(allSettings, widget, draft),
    [allSettings, draft, widget],
  );
  const previewWidgetsRef = useRef<Record<string, WidgetSettingsDraft>>(previewWidgets);
  const previewRequestKeyRef = useRef(previewLoadState.requestKey);
  const savedDraft = useMemo(() => mergeWithDefaults(widget, savedSettings), [widget, savedSettings]);
  const previousSavedDraftRef = useRef<WidgetSettingsDraft>(savedDraft);
  const previousWidgetIdRef = useRef(widget.id);
  const useIframe = previewScenes.length > 0;

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

  // Keep the complete widget map current so cross-widget dependencies (badge
  // icon/color from reviews) are never rendered from stale saved settings.
  useEffect(() => {
    previewWidgetsRef.current = previewWidgets;
  }, [previewWidgets]);

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
  }, [activePreviewScene, useIframe, previewLoadState.requestKey]);

  // The iframe protocol is exact-origin, exact-source and scene-bound.
  useEffect(() => {
    if (!useIframe) return;
    function onMessage(event: MessageEvent) {
      if (!isMatchingPreviewMessage(
        event,
        iframeRef.current?.contentWindow,
        widget.id,
        activePreviewScene,
      )) return;

      const requestKey = previewRequestKeyRef.current;
      if (event.data.type === RENUVEX_PR_WIDGET_READY) {
        widgetReadyRef.current = true;
        if (iframeRef.current?.contentWindow) {
          postPreviewRender(
            iframeRef.current.contentWindow,
            widget.id,
            activePreviewScene,
            previewWidgetsRef.current,
          );
        }
        return;
      }
      if (event.data.type === RENUVEX_PR_PREVIEW_RENDERED) {
        widgetReadyRef.current = true;
        dispatchPreviewLoadState({ type: 'ready', requestKey });
        return;
      }
      if (event.data.type === RENUVEX_PR_PREVIEW_ERROR) {
        dispatchPreviewLoadState({ type: 'error', requestKey });
      }
    }
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [activePreviewScene, useIframe, widget.id]);

  // Debounce slider/color updates while keeping one complete settings snapshot.
  useEffect(() => {
    if (!useIframe) return;
    if (!widgetReadyRef.current) return;
    const timer = setTimeout(() => {
      if (iframeRef.current?.contentWindow) {
        postPreviewRender(
          iframeRef.current.contentWindow,
          widget.id,
          activePreviewScene,
          previewWidgets,
        );
      }
    }, 50);
    return () => clearTimeout(timer);
  }, [activePreviewScene, previewWidgets, useIframe, widget.id]);

  const dirty = isDirty(draft, savedDraft);

  const viewportWidth = VIEWPORT_PRESETS.find(v => v.key === viewport)?.width ?? '100%';
  const isDesktopPreview = viewport === 'desktop';
  const previewBackground = OPAQUE_HEX_COLOR_RE.test(previewBgColor) ? previewBgColor : DEFAULT_PREVIEW_BG;

  const iframeSrc = `/preview?widget=${encodeURIComponent(widget.id)}&scene=${encodeURIComponent(activePreviewScene)}`;
  const handlePreviewRetry = useCallback(() => {
    widgetReadyRef.current = false;
    dispatchPreviewLoadState({ type: 'retry' });
  }, []);
  const handlePreviewSceneChange = useCallback((nextScene: string) => {
    if (nextScene === activePreviewScene) return;
    widgetReadyRef.current = false;
    setPreviewScene(nextScene);
    dispatchPreviewLoadState({ type: 'retry' });
  }, [activePreviewScene]);
  const handlePreviewReset = useCallback(() => {
    window.requestAnimationFrame(() => {
      const targetWindow = iframeRef.current?.contentWindow;
      if (targetWindow) {
        postPreviewResetScroll(targetWindow, widget.id, activePreviewScene);
      }
    });
  }, [activePreviewScene, widget.id]);

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
              groups={widget.configuration.groups}
              settings={draft}
              settingsMeta={settingsMeta}
              onChange={setDraft}
              onReset={handlePreviewReset}
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
                  {previewScenes.length > 1 ? (
                    <div
                      role="group"
                      aria-label="Önizleme sahnesi"
                      style={{
                        display: 'inline-flex',
                        width: 'fit-content',
                        padding: 2,
                        border: `1px solid ${colors.borderDefault}`,
                        borderRadius: radii.default,
                        backgroundColor: colors.bgPage,
                      }}
                    >
                      {previewScenes.map((scene) => {
                        const selected = scene.id === activePreviewScene;
                        return (
                          <button
                            key={scene.id}
                            type="button"
                            aria-pressed={selected}
                            onClick={() => handlePreviewSceneChange(scene.id)}
                            style={{
                              minWidth: 58,
                              height: 26,
                              padding: '0 9px',
                              border: 0,
                              borderRadius: radii.default,
                              backgroundColor: selected ? colors.bgWhite : 'transparent',
                              boxShadow: selected ? '0 1px 3px rgba(18, 25, 38, 0.12)' : 'none',
                              color: selected ? colors.textPrimary : colors.textMuted,
                              cursor: 'pointer',
                              fontSize: typography.fontSize.sm,
                              fontWeight: selected ? typography.fontWeight.medium : typography.fontWeight.regular,
                            }}
                          >
                            {scene.label}
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <div aria-hidden />
                  )}
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
                    key={`${widget.id}:${activePreviewScene}:${previewLoadState.requestKey}`}
                    ref={iframeRef}
                    src={iframeSrc}
                    style={{
                      width: '100%',
                      height: '100%',
                      border: 'none',
                      display: 'block',
                      backgroundColor: 'transparent',
                      // Radix modal scroll locking temporarily sets the app body to
                      // pointer-events:none. Keep that inherited transition off the
                      // nested frame so Chrome retains its wheel target after close.
                      pointerEvents: 'auto',
                    }}
                    title="Widget Önizleme"
                    onLoad={(event) => {
                      const frameWindow = event.currentTarget.contentWindow;
                      if (frameWindow && iframeRef.current?.contentWindow === frameWindow) {
                        postPreviewRender(
                          frameWindow,
                          widget.id,
                          activePreviewScene,
                          previewWidgetsRef.current,
                        );
                      }
                    }}
                  />
                  {shouldShowPreviewOverlay(previewLoadState.status) && (
                    <PreviewLoadOverlay
                      status={previewLoadState.status}
                      onRetry={handlePreviewRetry}
                    />
                  )}
                </div>
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
