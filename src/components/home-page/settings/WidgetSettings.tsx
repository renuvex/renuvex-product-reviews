import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { componentStyles, typography } from '@/lib/design-tokens';
import { StoreSettings } from '../types';

interface WidgetSettingsProps {
  settings: StoreSettings;
  onChange: (settings: StoreSettings) => void;
  onSave: () => void;
}

export function WidgetSettings({ settings, onChange, onSave }: WidgetSettingsProps) {
  return (
    <Card className="border-border/50 shadow-sm">
      <CardHeader>
        <CardTitle style={{ fontSize: typography.fontSize.xl, fontWeight: typography.fontWeight.medium }}>Widget Görünüm Ayarları</CardTitle>
        <CardDescription>Müşterilerin ürün sayfalarında göreceği yorum panelinin tasarımını özelleştirin.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="title">Widget Başlığı</Label>
            <Input
              id="title"
              value={settings.widgetTitle || "Müşteri Değerlendirmeleri"}
              onChange={(e) => onChange({ ...settings, widgetTitle: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="color">Ana Tema Rengi</Label>
            <div className="flex gap-2">
              <Input
                id="color"
                type="color"
                className="w-[80px] p-1 h-10"
                value={settings.widgetColor || "#000000"}
                onChange={(e) => onChange({ ...settings, widgetColor: e.target.value })}
              />
              <Input
                value={settings.widgetColor || "#000000"}
                onChange={(e) => onChange({ ...settings, widgetColor: e.target.value })}
                className="flex-1"
              />
            </div>
          </div>

          <div className="space-y-3 col-span-2">
            <Label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4"
                checked={settings.autoApprove || false}
                onChange={(e) => onChange({ ...settings, autoApprove: e.target.checked })}
              />
              Yeni Yorumları Otomatik Onayla
            </Label>
            <Label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4"
                checked={settings.showHelpful ?? true}
                onChange={(e) => onChange({ ...settings, showHelpful: e.target.checked })}
              />
              Faydalı Butonu Göster
            </Label>
          </div>
        </div>

        <button style={componentStyles.btnPrimary} onClick={onSave}>Ayarları Kaydet</button>
      </CardContent>
    </Card>
  );
}
