'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { HexAlphaColorPicker, HexColorInput } from 'react-colorful';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Slider } from '@/components/ui/slider';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { colors, componentStyles, typography, radii, sp } from '@/lib/design-tokens';
import { SettingsGroup, SettingField } from '../widgetDefs';
import { applyBasicColorChange } from '../colorMappings';
import { WidgetSettingsDraft } from './WidgetEditor';
import { IconSelect } from './IconSelect';
// Layout registry'leri — meta.supports okumak için.
// Bkz: src/widget/{summary,review}-layouts/index.js (supports sözleşmesi).
import { LAYOUTS as SUMMARY_LAYOUTS } from '@/widget/summary-layouts/index.js';
import { LAYOUTS as REVIEW_LAYOUTS } from '@/widget/review-layouts/index.js';

type LayoutMeta = { supports?: Record<string, boolean> };
type LayoutModule = { meta?: LayoutMeta };
const LAYOUT_REGISTRIES: Record<'summaryLayout' | 'reviewLayout', Record<string, LayoutModule>> = {
  summaryLayout: SUMMARY_LAYOUTS as Record<string, LayoutModule>,
  reviewLayout: REVIEW_LAYOUTS as Record<string, LayoutModule>,
};
function layoutSupports(layoutKey: 'summaryLayout' | 'reviewLayout', activeId: unknown, capability: string): boolean {
  const registry = LAYOUT_REGISTRIES[layoutKey];
  const layout = registry[String(activeId)];
  const supports = layout?.meta?.supports;
  // Varsayılan: layout deklare etmediyse destekliyor say.
  return supports?.[capability] !== false;
}

interface SettingsPanelProps {
  groups: SettingsGroup[];
  settings: WidgetSettingsDraft;
  onChange: (s: WidgetSettingsDraft) => void;
}

// View modes: ana panel ya da "Renkler" alt paneli.
type PanelView = 'main' | 'colors';

export function SettingsPanel({ groups, settings, onChange }: SettingsPanelProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [view, setView] = useState<PanelView>('main');

  if (groups.length === 0) {
    return (
      <div style={{ color: colors.textMuted, fontSize: typography.fontSize.base, padding: `${sp[4]}px 0` }}>
        Bu widget için henüz ayar tanımlanmamış.
      </div>
    );
  }

  // Grupları ayır:
  //   - isColor=true → "Renkler" alt menüsü
  //   - title === 'Ayarlar' → ana panelin EN SONUNA, "Renkler" geçişinden sonra
  //   - diğerleri → ana panelin başında
  const colorGroups = groups.filter((g) => g.isColor);
  const basicColorGroups = colorGroups.filter((g) => g.colorTier === 'basic');
  const advancedColorGroups = colorGroups.filter((g) => g.colorTier !== 'basic');
  const settingsGroup = groups.find((g) => !g.isColor && g.title === 'Ayarlar');
  const mainGroups = groups.filter((g) => !g.isColor && g.title !== 'Ayarlar');
  const hasColorGroups = colorGroups.length > 0;

  const handleResetClick = () => {
    setShowConfirm(true);
  };

  const executeReset = () => {
    const defaults: WidgetSettingsDraft = {};
    groups.forEach(group => {
      group.fields.forEach(field => {
        if (field.default !== undefined) {
          defaults[field.key] = field.default;
        }
      });
    });

    onChange({ ...settings, ...defaults });
    setShowConfirm(false);
  };

  const isFieldVisible = (field: SettingField) => {
    if (!field.showWhen) return true;

    if ('layoutKey' in field.showWhen) {
      const activeId = settings[field.showWhen.layoutKey];
      return layoutSupports(field.showWhen.layoutKey, activeId, field.showWhen.supports);
    }

    const dep = settings[field.showWhen.key];
    if ('equals' in field.showWhen) {
      return dep === field.showWhen.equals;
    }

    return !field.showWhen.notIn.includes(dep as string | number | boolean);
  };

  // Render edilen akordiyon listesi — hem ana hem renk view'ları için tek helper.
  // defaultValue=[] — hiçbir accordion otomatik açık değil, kullanıcı seçer.
  const renderAccordion = (list: SettingsGroup[]) => {
    const visibleGroups = list
      .map(group => ({ ...group, fields: group.fields.filter(isFieldVisible) }))
      .filter(group => group.fields.length > 0);

    if (visibleGroups.length === 0) return null;

    return (
      <Accordion type="multiple" defaultValue={[]} className="w-full">
        {visibleGroups.map((group, i) => (
          <AccordionItem key={`group-${i}`} value={`group-${i}`} style={{ borderBottom: `1px solid ${colors.borderDefault}`, marginBottom: sp[2] }}>
            <AccordionTrigger style={{
              fontSize: typography.fontSize.base,
              fontWeight: typography.fontWeight.medium,
              color: colors.textPrimary,
            }}>
              {group.title}
            </AccordionTrigger>
            <AccordionContent>
              {/* Tüm padding'ler accordion.tsx default'undan gelir (pt-4 pb-6 px-3).
                  Burada sadece field'lar arası iç gap. */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: sp[6] }}>
                {group.fields.map((field) => (
                  <FieldRenderer
                    key={field.key}
                    field={field}
                    settings={settings}
                    onChange={onChange}
                  />
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    );
  };

  const renderAdvancedColorAccordion = (list: SettingsGroup[]) => {
    const visibleGroups = list
      .map(group => ({ ...group, fields: group.fields.filter(isFieldVisible) }))
      .filter(group => group.fields.length > 0);

    if (visibleGroups.length === 0) return null;

    return (
      <Accordion type="multiple" defaultValue={[]} className="w-full">
        <AccordionItem value="advanced-colors" style={{ borderBottom: `1px solid ${colors.borderDefault}`, marginBottom: sp[2] }}>
          <AccordionTrigger style={{
            fontSize: typography.fontSize.base,
            fontWeight: typography.fontWeight.medium,
            color: colors.textPrimary,
          }}>
            Gelişmiş Renkler
          </AccordionTrigger>
          <AccordionContent>
            {renderAccordion(visibleGroups)}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  };

  return (
    <>
      {view === 'main' ? (
        <>
          {renderAccordion(mainGroups)}

          {/* "Renkler" kategori butonu — alt panele geçiş */}
          {hasColorGroups && (
            <button
              onClick={() => setView('colors')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                padding: `${sp[4]}px ${sp[3]}px`,
                background: 'transparent',
                border: 'none',
                borderBottom: `1px solid ${colors.borderDefault}`,
                cursor: 'pointer',
                fontSize: typography.fontSize.base,
                fontWeight: typography.fontWeight.medium,
                color: colors.textPrimary,
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center' }}>
                Renkler
              </span>
              <ChevronRight size={16} style={{ color: colors.textMuted }} />
            </button>
          )}

          {/* Ayarlar accordion — Renkler'den sonra, en sonda */}
          {settingsGroup && renderAccordion([settingsGroup])}

          {/* Varsayılanlara Sıfırla Butonu */}
          <div style={{ padding: `${sp[6]}px 0`, marginTop: sp[4] }}>
            <button
              onClick={handleResetClick}
              style={{
                ...componentStyles.btnDefault,
                width: '100%',
                backgroundColor: 'transparent',
                border: `1px dashed ${colors.borderDefault}`,
                color: colors.textSecondary,
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = colors.errorText;
                e.currentTarget.style.borderColor = colors.errorBorder;
                e.currentTarget.style.borderStyle = 'solid';
                e.currentTarget.style.backgroundColor = colors.bgWhite;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = colors.textSecondary;
                e.currentTarget.style.borderColor = colors.borderDefault;
                e.currentTarget.style.borderStyle = 'dashed';
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              Varsayılanlara Sıfırla
            </button>
          </div>
        </>
      ) : (
        <>
          {/* Renk alt paneli başlığı — geri butonu + "Renkler" */}
          <button
            onClick={() => setView('main')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: sp[2],
              padding: '14px 0',
              backgroundColor: colors.bgWhite || '#ffffff', // Alttaki içerik görünmesin diye arka plan şart
              border: 'none',
              borderBottom: `1px solid ${colors.borderDefault}`,
              cursor: 'pointer',
              fontSize: typography.fontSize.base,
              fontWeight: typography.fontWeight.medium,
              color: colors.textPrimary,
              width: '100%',
              textAlign: 'left',
              position: 'sticky',
              top: 0,
              zIndex: 10,
            }}
          >
            <ArrowLeft size={16} style={{ color: colors.textSecondary }} />
            <span>Renkler</span>
          </button>

          {renderAccordion(basicColorGroups)}
          {renderAdvancedColorAccordion(advancedColorGroups)}
        </>
      )}

      {/* Sipariş Modal / Dialog */}
      <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle style={{ fontSize: typography.fontSize.lg, color: colors.textPrimary }}>Varsayılanlara Sıfırla</DialogTitle>
          </DialogHeader>
          <div style={{ padding: `${sp[4]}px 0`, color: colors.textSecondary, fontSize: typography.fontSize.base }}>
            Tüm tasarım değişiklikleriniz silinecek ve widget varsayılan tasarıma dönecektir. Bu işlem geri alınamaz, onaylıyor musunuz?
          </div>
          <DialogFooter style={{ display: 'flex', gap: sp[2], justifyContent: 'flex-end', paddingTop: sp[2] }}>
            <button
              onClick={() => setShowConfirm(false)}
              style={componentStyles.btnDefault}
            >
              Vazgeç
            </button>
            <button
              onClick={executeReset}
              style={componentStyles.btnDanger}
            >
              Evet, Sıfırla
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

// ─── Field renderer ──────────────────────────────────────────────────────────

function FieldRenderer({ field, settings, onChange }: {
  field: SettingField;
  settings: WidgetSettingsDraft;
  onChange: (s: WidgetSettingsDraft) => void;
}) {
  const value = settings[field.key];

  switch (field.type) {
    case 'toggle':
      // inline-flex + width:fit-content — label sadece checkbox + metin kadar
      // yer kaplar; aksi halde label parent genişliğine uzar ve sağdaki boş
      // alana tıklamak da toggle'ı tetiklerdi.
      return (
        <label style={{ display: 'inline-flex', alignItems: 'center', gap: sp[3], cursor: 'pointer', width: 'fit-content' }}>
          <input
            type="checkbox"
            checked={Boolean(value ?? field.default ?? true)}
            onChange={(e) => onChange({ ...settings, [field.key]: e.target.checked })}
            style={{ width: 16, height: 16, cursor: 'pointer', accentColor: colors.primary }}
          />
          <span style={{ fontSize: typography.fontSize.base, color: colors.textSecondary }}>
            {field.label}
          </span>
        </label>
      );

    case 'text':
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: sp[1] + 2 }}>
          {/* hideLabel: önündeki bir toggle bağlamı veriyorsa label tekrarına
              gerek yok (ör. showTitle + title input). */}
          {!field.hideLabel && (
            <label style={{ fontSize: typography.fontSize.base, fontWeight: typography.fontWeight.medium, color: colors.textSecondary }}>
              {field.label}
            </label>
          )}
          <input
            type="text"
            // value yoksa default'u göster — kullanıcı boş input + gri placeholder
            // yerine doğrudan gerçek metni görür (Shopify pattern'i).
            value={String(value ?? field.default ?? '')}
            aria-label={field.label}
            onChange={(e) => onChange({ ...settings, [field.key]: e.target.value })}
            style={componentStyles.input}
          />
        </div>
      );

    case 'color':
      return (
        <ColorField
          field={field}
          value={String(value ?? field.default ?? '#6f55ff')}
          onCommit={(v) => onChange(applyBasicColorChange(settings, field.key, v))}
        />
      );

    case 'iconSelect':
      return (
        <IconSelect
          label={field.label}
          value={String(value ?? field.default)}
          options={field.options}
          onChange={(v) => onChange({ ...settings, [field.key]: v })}
        />
      );

    case 'select': {
      // Options ya statik dizi ya da settings'e bağlı bir fonksiyon olabilir
      const opts = typeof field.options === 'function' ? field.options(settings) : field.options;
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: sp[1] + 2 }}>
          <label style={{ fontSize: typography.fontSize.base, fontWeight: typography.fontWeight.medium, color: colors.textSecondary }}>
            {field.label}
          </label>
          <div style={{ display: 'flex', gap: sp[2], flexWrap: 'wrap' }}>
            {opts.map((opt) => {
              const isSelected = (value ?? opts[0]?.value) === opt.value;
              return (
                <button
                  key={opt.value}
                  onClick={() => onChange({ ...settings, [field.key]: opt.value })}
                  style={{
                    ...componentStyles.btnSm,
                    backgroundColor: isSelected ? colors.primaryBg : colors.bgWhite,
                    borderColor: isSelected ? colors.primary : colors.borderDefault,
                    color: isSelected ? colors.primary : colors.textPrimary,
                  }}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>
      );
    }

    case 'dropdown': {
      // Native <select> — yer kazandıran kompakt UI. Mobile'da sistemin kendi
      // picker'ını açar; desktop'ta basit liste. Stil componentStyles.select.
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: sp[1] + 2 }}>
          <label style={{ fontSize: typography.fontSize.base, fontWeight: typography.fontWeight.medium, color: colors.textSecondary }}>
            {field.label}
          </label>
          <select
            value={String(value ?? field.default ?? '')}
            onChange={(e) => onChange({ ...settings, [field.key]: e.target.value })}
            style={{ ...componentStyles.select, width: '100%' }}
          >
            {field.options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      );
    }

    case 'range': {
      const numVal = Number(value ?? field.default);
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: sp[2] }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <label style={{ fontSize: typography.fontSize.base, fontWeight: typography.fontWeight.medium, color: colors.textSecondary }}>
              {field.label}
            </label>
            <span style={{ fontSize: typography.fontSize.base, color: colors.textSecondary, minWidth: 36, textAlign: 'right' }}>
              {numVal}px
            </span>
          </div>
          <Slider
            min={field.min}
            max={field.max}
            step={1}
            value={[numVal]}
            onValueChange={([v]) => onChange({ ...settings, [field.key]: v })}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 11, color: colors.textSecondary }}>{field.min}px</span>
            <span style={{ fontSize: 11, color: colors.textSecondary }}>{field.max}px</span>
          </div>
        </div>
      );
    }

    default:
      return null;
  }
}

// ─── Color field ─────────────────────────────────────────────────────────────
// Kompakt: label solda, renk karesi sağda. Kareye tıklayınca native picker açılır.
// Local state + 120ms debounce — picker sürerken parent re-render olmaz.

// Saydam rengi görsel ifade eden checker (dama tahtası) arka plan
const CHECKER_BG =
  'repeating-conic-gradient(#d1d5db 0% 25%, #ffffff 0% 50%) 50% / 10px 10px';

function ColorField({ field, value, onCommit }: {
  field: Extract<SettingField, { type: 'color' }>;
  value: string;
  onCommit: (v: string) => void;
}) {
  const [local, setLocal] = useState(value);
  const [open, setOpen] = useState(false);
  const [popoverPos, setPopoverPos] = useState<{ top: number; left: number } | null>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const commitTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => { setLocal(value); }, [value]);
  useEffect(() => () => { if (commitTimerRef.current) clearTimeout(commitTimerRef.current); }, []);

  // Popover portal olarak body'ye render edilir; accordion/dialog parent'larının
  // overflow/stacking context'inden etkilenmesin. Trigger rect'ine göre konum
  // fixed olarak hesaplanır — scroll veya resize'da yeniden hesaplanmaz çünkü
  // popover açıkken kullanıcı scroll etmeyi bırakır (kısa etkileşim).
  useEffect(() => {
    if (!open) { setPopoverPos(null); return; }
    const r = triggerRef.current?.getBoundingClientRect();
    if (!r) return;
    const popoverWidth = 220;
    const popoverHeight = 230;
    // Sağa hizali (trigger right ile popover right aynı noktada). Viewport'un
    // sol kenarına taşarsa sola kaydır. Viewport altına taşarsa trigger'ın
    // üstünde aç.
    let left = r.right - popoverWidth;
    if (left < 8) left = 8;
    let top = r.bottom + 6;
    if (top + popoverHeight > window.innerHeight - 8) {
      top = Math.max(8, r.top - popoverHeight - 6);
    }
    setPopoverPos({ top, left });
  }, [open]);

  // Popover dışı tıklama → kapat
  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      const t = e.target as Node;
      if (popoverRef.current?.contains(t)) return;
      if (triggerRef.current?.contains(t)) return;
      setOpen(false);
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, [open]);

  const handleChange = (next: string) => {
    setLocal(next);
    if (commitTimerRef.current) clearTimeout(commitTimerRef.current);
    commitTimerRef.current = setTimeout(() => onCommit(next), 120);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: sp[3] }}>
      <label style={{ fontSize: typography.fontSize.base, color: colors.textSecondary }}>
        {field.label}
      </label>
      <div style={{ position: 'relative', flexShrink: 0 }}>
        {/* Renk önizleme butonu — tıklanınca popover açılır.
            Checker (dama) arka plan üstüne seçili renk bindirilir; alpha < 1
            olduğunda altaki checker görünür → kullanıcı saydamlığı anlar. */}
        <button
          ref={triggerRef}
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label={`${field.label} seç`}
          style={{
            width: 24, height: 24,
            border: `1px solid ${colors.borderDefault}`,
            borderRadius: radii.default,
            background: CHECKER_BG,
            padding: 0,
            cursor: 'pointer',
            position: 'relative',
          }}
        >
          <span
            aria-hidden
            style={{
              position: 'absolute', inset: 0,
              borderRadius: radii.default,
              backgroundColor: local,
            }}
          />
        </button>

        {open && popoverPos && typeof window !== 'undefined' && createPortal(
          <div
            ref={popoverRef}
            style={{
              position: 'fixed',
              top: popoverPos.top,
              left: popoverPos.left,
              zIndex: 10000,
              padding: sp[3],
              background: colors.bgWhite,
              border: `1px solid ${colors.borderDefault}`,
              borderRadius: radii.default,
              boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
              display: 'flex',
              flexDirection: 'column',
              gap: sp[3],
              width: 220,
            }}
          >
            <HexAlphaColorPicker
              color={local}
              onChange={handleChange}
              style={{ width: '100%', height: 160 }}
            />
            <HexColorInput
              color={local}
              onChange={handleChange}
              prefixed
              alpha
              aria-label={`${field.label} hex kodu`}
              style={{
                ...componentStyles.input,
                width: '100%',
                fontSize: typography.fontSize.base,
                textTransform: 'uppercase',
              }}
            />
          </div>,
          document.body,
        )}
      </div>
    </div>
  );
}
