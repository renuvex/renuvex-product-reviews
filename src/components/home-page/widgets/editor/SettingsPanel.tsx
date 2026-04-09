'use client';

import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Slider } from '@/components/ui/slider';
import { colors, componentStyles, typography, radii } from '@/lib/design-tokens';
import { SettingsGroup, SettingField } from '../widgetDefs';
import { WidgetSettingsDraft } from './WidgetEditor';

interface SettingsPanelProps {
  groups: SettingsGroup[];
  settings: WidgetSettingsDraft;
  onChange: (s: WidgetSettingsDraft) => void;
}

export function SettingsPanel({ groups, settings, onChange }: SettingsPanelProps) {
  if (groups.length === 0) {
    return (
      <div style={{ color: colors.textMuted, fontSize: typography.fontSize.base, padding: '16px 0' }}>
        Bu widget için henüz ayar tanımlanmamış.
      </div>
    );
  }

  const defaultOpen = groups.map((_, i) => `group-${i}`);

  return (
    <Accordion type="multiple" defaultValue={defaultOpen} className="w-full">
      {groups.map((group, i) => (
        <AccordionItem key={i} value={`group-${i}`} style={{ borderBottom: `1px solid ${colors.borderDefault}` }}>
          <AccordionTrigger style={{
            fontSize: typography.fontSize.base,
            fontWeight: typography.fontWeight.medium,
            color: colors.textPrimary,
            padding: '14px 0',
          }}>
            {group.title}
          </AccordionTrigger>
          <AccordionContent>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, paddingBottom: 16 }}>
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
      return (
        <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={Boolean(value ?? true)}
            onChange={(e) => onChange({ ...settings, [field.key]: e.target.checked })}
            style={{ width: 16, height: 16, cursor: 'pointer', accentColor: colors.primary }}
          />
          <span style={{ fontSize: typography.fontSize.base, color: colors.textPrimary }}>
            {field.label}
          </span>
        </label>
      );

    case 'text':
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <label style={{ fontSize: typography.fontSize.base, fontWeight: typography.fontWeight.medium, color: colors.textPrimary }}>
            {field.label}
          </label>
          <input
            type="text"
            value={String(value ?? '')}
            placeholder={field.placeholder}
            onChange={(e) => onChange({ ...settings, [field.key]: e.target.value })}
            style={componentStyles.input}
          />
        </div>
      );

    case 'color':
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <label style={{ fontSize: typography.fontSize.base, fontWeight: typography.fontWeight.medium, color: colors.textPrimary }}>
            {field.label}
          </label>
          <div style={{ display: 'flex', gap: 8 }}>
            <input
              type="color"
              value={String(value ?? '#6f55ff')}
              onChange={(e) => onChange({ ...settings, [field.key]: e.target.value })}
              style={{
                width: 44,
                height: 40,
                padding: 4,
                border: `1px solid ${colors.borderDefault}`,
                borderRadius: radii.default,
                cursor: 'pointer',
                backgroundColor: colors.bgWhite,
              }}
            />
            <input
              type="text"
              value={String(value ?? '#6f55ff')}
              onChange={(e) => onChange({ ...settings, [field.key]: e.target.value })}
              style={{ ...componentStyles.input, flex: 1 }}
            />
          </div>
        </div>
      );

    case 'select':
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <label style={{ fontSize: typography.fontSize.base, fontWeight: typography.fontWeight.medium, color: colors.textPrimary }}>
            {field.label}
          </label>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {field.options.map((opt) => {
              const isSelected = (value ?? field.options[0]?.value) === opt.value;
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

    case 'range': {
      const numVal = Number(value ?? field.default);
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <label style={{ fontSize: typography.fontSize.base, fontWeight: typography.fontWeight.medium, color: colors.textPrimary }}>
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
            <span style={{ fontSize: 11, color: colors.textMuted }}>{field.min}px</span>
            <span style={{ fontSize: 11, color: colors.textMuted }}>{field.max}px</span>
          </div>
        </div>
      );
    }

    default:
      return null;
  }
}
