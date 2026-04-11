'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Slider } from '@/components/ui/slider';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { colors, componentStyles, typography, radii } from '@/lib/design-tokens';
import { SettingsGroup, SettingField } from '../widgetDefs';
import { WidgetSettingsDraft } from './WidgetEditor';

interface SettingsPanelProps {
  groups: SettingsGroup[];
  settings: WidgetSettingsDraft;
  onChange: (s: WidgetSettingsDraft) => void;
}

export function SettingsPanel({ groups, settings, onChange }: SettingsPanelProps) {
  const [showConfirm, setShowConfirm] = useState(false);

  if (groups.length === 0) {
    return (
      <div style={{ color: colors.textMuted, fontSize: typography.fontSize.base, padding: '16px 0' }}>
        Bu widget için henüz ayar tanımlanmamış.
      </div>
    );
  }

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

  return (
    <>
      <Accordion type="multiple" defaultValue={groups.length > 0 ? ['group-0'] : []} className="w-full">
        {groups.map((group, i) => (
          <AccordionItem key={group.title} value={`group-${i}`} style={{ borderBottom: `1px solid ${colors.borderDefault}` }}>
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
                {group.fields.map((field) => {
                  // Conditional field: showWhen kuralı varsa, bağlı ayar eşleşmediğinde gizle.
                  if (field.showWhen) {
                    const dep = settings[field.showWhen.key];
                    if (dep !== field.showWhen.equals) return null;
                  }
                  return (
                    <FieldRenderer
                      key={field.key}
                      field={field}
                      settings={settings}
                      onChange={onChange}
                    />
                  );
                })}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {/* Varsayılanlara Sıfırla Butonu */}
      <div style={{ padding: '24px 0', marginTop: 16 }}>
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
            e.currentTarget.style.color = colors.errorText;          // rgb(255, 0, 0)
            e.currentTarget.style.borderColor = colors.errorBorder;  // rgb(227, 225, 229)
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

      {/* Sipariş Modal / Dialog */}
      <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle style={{ fontSize: typography.fontSize.lg, color: colors.textPrimary }}>Varsayılanlara Sıfırla</DialogTitle>
          </DialogHeader>
          <div style={{ padding: '16px 0', color: colors.textSecondary, fontSize: typography.fontSize.base }}>
            Tüm tasarım değişiklikleriniz silinecek ve widget varsayılan tasarıma dönecektir. Bu işlem geri alınamaz, onaylıyor musunuz?
          </div>
          <DialogFooter style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', paddingTop: 8 }}>
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
      return (
        <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={Boolean(value ?? field.default ?? true)}
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
