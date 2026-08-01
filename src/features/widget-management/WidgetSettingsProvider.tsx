'use client';

import axios from 'axios';
import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from 'react';
import { toast } from 'sonner';

import { useAdminShell } from '@/features/admin-shell/AdminShellContext';

import {
  INITIAL_WIDGET_SETTINGS_LOAD_STATE,
  reduceWidgetSettingsLoadState,
  type WidgetSettingsLoadState,
} from './WidgetSettingsLoadState';
import type { WidgetSettingsMap } from './types';

type WidgetSettingsContextValue = WidgetSettingsLoadState & {
  ensureSettingsLoaded: () => Promise<void>;
  retrySettings: () => Promise<void>;
  saveWidgetSettings: (widgetId: string, settings: Record<string, unknown>) => Promise<void>;
};

const WidgetSettingsContext = createContext<WidgetSettingsContextValue | null>(null);

export function WidgetSettingsProvider({ children }: { children: ReactNode }) {
  const { getAuthHeader, handleApiAuthenticationFailure } = useAdminShell();
  const [state, setState] = useState<WidgetSettingsLoadState>(INITIAL_WIDGET_SETTINGS_LOAD_STATE);
  const inFlightRef = useRef<Promise<void> | null>(null);

  const loadSettings = useCallback((force: boolean) => {
    if (!force && state.status === 'loaded') return Promise.resolve();
    if (inFlightRef.current) return inFlightRef.current;

    setState((current) => reduceWidgetSettingsLoadState(current, { type: 'start' }));
    const load = (async () => {
      try {
        const response = await axios.get('/api/admin/settings', { headers: await getAuthHeader() });
        setState((current) => reduceWidgetSettingsLoadState(current, {
          type: 'success',
          settings: response.data?.data,
          meta: response.data?.meta,
        }));
      } catch (error) {
        handleApiAuthenticationFailure(error);
        setState((current) => reduceWidgetSettingsLoadState(current, { type: 'failure' }));
      } finally {
        inFlightRef.current = null;
      }
    })();
    inFlightRef.current = load;
    return load;
  }, [getAuthHeader, handleApiAuthenticationFailure, state.status]);

  const ensureSettingsLoaded = useCallback(() => loadSettings(false), [loadSettings]);
  const retrySettings = useCallback(() => loadSettings(true), [loadSettings]);

  const saveWidgetSettings = useCallback(async (widgetId: string, widgetSettings: Record<string, unknown>) => {
    try {
      await axios.put('/api/admin/settings', { widgetId, settings: widgetSettings }, { headers: await getAuthHeader() });
      setState((current) => ({
        ...current,
        settings: { ...current.settings, [widgetId]: widgetSettings } as WidgetSettingsMap,
      }));
      toast.success('Kaydetme başarılı! Değişiklikleriniz sitenize birkaç dakika içinde yansıtılacaktır.');
    } catch (error) {
      if (!handleApiAuthenticationFailure(error)) toast.error('Ayarlar kaydedilirken bir hata oluştu.');
      throw new Error('widget_settings_save_failed');
    }
  }, [getAuthHeader, handleApiAuthenticationFailure]);

  const value = useMemo<WidgetSettingsContextValue>(() => ({
    ...state,
    ensureSettingsLoaded,
    retrySettings,
    saveWidgetSettings,
  }), [ensureSettingsLoaded, retrySettings, saveWidgetSettings, state]);

  return <WidgetSettingsContext.Provider value={value}>{children}</WidgetSettingsContext.Provider>;
}

export function useWidgetSettings() {
  const context = useContext(WidgetSettingsContext);
  if (!context) throw new Error('useWidgetSettings must be used within WidgetSettingsProvider');
  return context;
}
