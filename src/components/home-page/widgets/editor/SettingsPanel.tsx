'use client';

import { useState } from 'react';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Slider } from '@/components/ui/slider';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { colors, componentStyles, radii, typography, sp } from '@/lib/design-tokens';
import { SettingsGroup, SettingField } from '../widgetDefs';
import { WidgetSettingsDraft } from './WidgetEditor';
import { IconSelect } from './IconSelect';
import { ColorPickerField } from './ColorPickerField';
import { InfoTooltip } from './InfoTooltip';
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

type PanelView =
  | { type: 'main' }
  | { type: 'group'; title: string; groups: SettingsGroup[] }
  | { type: 'colors' };

export function SettingsPanel({ groups, settings, onChange }: SettingsPanelProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [view, setView] = useState<PanelView>({ type: 'main' });

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

  const getVisibleGroups = (list: SettingsGroup[]) =>
    list
      .map(group => ({ ...group, fields: group.fields.filter(isFieldVisible) }))
      .filter(group => group.fields.length > 0);

  const renderFields = (group: SettingsGroup, padded = false) => (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: sp[6],
      ...(padded ? { padding: `${sp[6]}px ${sp[3]}px` } : {}),
    }}>
      {group.fields.map((field) => (
        <FieldRenderer
          key={field.key}
          field={field}
          settings={settings}
          onChange={onChange}
        />
      ))}
    </div>
  );

  const renderAccordion = (list: SettingsGroup[]) => {
    const visibleGroups = getVisibleGroups(list);

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
              {renderFields(group)}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    );
  };

  const visibleMainGroups = getVisibleGroups(mainGroups);
  const visibleSettingsGroups = settingsGroup ? getVisibleGroups([settingsGroup]) : [];

  const renderNavButton = (title: string, onClick: () => void) => (
    <button
      type="button"
      onClick={onClick}
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
        {title}
      </span>
      <ChevronRight size={16} style={{ color: colors.textMuted }} />
    </button>
  );

  const renderBackHeader = (title: string) => (
    <button
      type="button"
      onClick={() => setView({ type: 'main' })}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: sp[2],
        padding: '14px 0',
        backgroundColor: colors.bgWhite || '#ffffff',
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
      <span>{title}</span>
    </button>
  );

  const renderGroupNavRows = (list: SettingsGroup[]) =>
    list.map((group) => (
      <div key={group.title}>
        {renderNavButton(group.title, () => setView({ type: 'group', title: group.title, groups: [group] }))}
      </div>
    ));

  return (
    <>
      {view.type === 'main' ? (
        <>
          {renderGroupNavRows(visibleMainGroups)}

          {hasColorGroups && renderNavButton('Renkler', () => setView({ type: 'colors' }))}

          {renderGroupNavRows(visibleSettingsGroups)}

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
      ) : view.type === 'group' ? (
        <>
          {renderBackHeader(view.title)}

          {getVisibleGroups(view.groups).map((group) => (
            <div key={group.title}>
              {renderFields(group, true)}
            </div>
          ))}
        </>
      ) : (
        <>
          {renderBackHeader('Renkler')}
          {renderAccordion(colorGroups)}
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
            // HTML maxLength kullanıcıyı yazarken durdurur; server tarafı validateSettings
            // ile aynı limit'i tekrarlar (savunmada katman sayısı = güvenlik).
            maxLength={field.maxLength}
            onChange={(e) => onChange({ ...settings, [field.key]: e.target.value })}
            style={componentStyles.input}
          />
        </div>
      );

    case 'color': {
      const isInputText = field.key === 'inputTextColor';
      const isPlaceholder = field.key === 'placeholderColor';
      return (
        <ColorPickerField
          label={field.label}
          value={String(value ?? field.default ?? '#6f55ff')}
          onCommit={(v) => onChange({ ...settings, [field.key]: v })}
          labelAddon={
            isInputText ? (
              <InfoTooltip
                label="Alan yazı rengi"
                message="Müşterinin form alanlarına yazdığı metin rengi."
              />
            ) : isPlaceholder ? (
              <InfoTooltip
                label="Placeholder rengi"
                message="Boş alanlarda görünen örnek metin rengi."
              />
            ) : undefined
          }
        />
      );
    }

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
      const isBorderRadius = field.key === 'borderRadius';
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: sp[2] }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: sp[1], fontSize: typography.fontSize.base, fontWeight: typography.fontWeight.medium, color: colors.textSecondary }}>
              {field.label}
              {isBorderRadius && (
                <InfoTooltip
                  label="Köşe ovalliği"
                  message="Tüm kart, buton ve görsellerin köşe yuvarlaklığını ayarlar."
                />
              )}
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

