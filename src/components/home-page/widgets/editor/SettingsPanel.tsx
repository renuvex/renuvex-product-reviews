'use client';

import React, { useEffect, useRef, useState } from 'react';
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

  return (
    <Accordion type="multiple" defaultValue={[]} className="w-full">
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
        <ColorField
          field={field}
          value={String(value ?? '#6f55ff')}
          onCommit={(v) => onChange({ ...settings, [field.key]: v })}
        />
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

// ─── Color field ─────────────────────────────────────────────────────────────
// Kompakt: label solda, renk karesi sağda. Kareye tıklayınca native picker açılır.
// Local state + 120ms debounce — picker sürerken parent re-render olmaz.

function ColorField({ field, value, onCommit }: {
  field: Extract<SettingField, { type: 'color' }>;
  value: string;
  onCommit: (v: string) => void;
}) {
  const [local, setLocal] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);
  const commitTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => { setLocal(value); }, [value]);
  useEffect(() => () => { if (commitTimerRef.current) clearTimeout(commitTimerRef.current); }, []);

  const handleChange = (next: string) => {
    setLocal(next);
    if (commitTimerRef.current) clearTimeout(commitTimerRef.current);
    commitTimerRef.current = setTimeout(() => onCommit(next), 120);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
      <label style={{ fontSize: typography.fontSize.base, color: colors.textSecondary }}>
        {field.label}
      </label>
      <div style={{ position: 'relative', width: 24, height: 24, flexShrink: 0 }}>
        {/* Renk önizleme — pointer events yok, sadece görsel */}
        <div style={{
          width: 24, height: 24,
          border: `1px solid ${colors.borderDefault}`,
          borderRadius: radii.default,
          backgroundColor: local,
          pointerEvents: 'none',
        }} />
        {/* Native picker tam üstüne bindirildi, opacity 0 ama tıklanabilir */}
        <input
          ref={inputRef}
          type="color"
          value={local}
          onChange={(e) => handleChange(e.target.value)}
          aria-label={`${field.label} seç`}
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            opacity: 0, cursor: 'pointer',
            border: 'none', padding: 0,
          }}
        />
      </div>
    </div>
  );
}
