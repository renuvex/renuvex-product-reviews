import React from 'react';
import { StoreSettings } from '../types';
import { WidgetSettings } from './WidgetSettings';

// İleride yeni ayar sekmeleri buraya eklenir:
// import { Billing } from './Billing';
// import { Installation } from './Installation';

interface SettingsContainerProps {
  settings: StoreSettings;
  onChange: (settings: StoreSettings) => void;
  onSave: () => void;
}

export function SettingsContainer({ settings, onChange, onSave }: SettingsContainerProps) {
  return (
    <WidgetSettings
      settings={settings}
      onChange={onChange}
      onSave={onSave}
    />
  );
}
