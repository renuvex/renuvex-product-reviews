import type { WidgetVideoUsageMeta } from './WidgetSettingsLoadState';

export type VideoUsageStatusTone = 'neutral' | 'success' | 'warning';

export interface VideoUsageStatusView {
  title: string;
  detail: string;
  tone: VideoUsageStatusTone;
}

export function buildVideoUsageStatus(
  usage: WidgetVideoUsageMeta,
  merchantToggleEnabled: boolean,
): VideoUsageStatusView {
  const usageText = `Aylık kullanım: ${usage.usedCount} / ${usage.monthlyLimit}.`;

  if (!merchantToggleEnabled) {
    return { title: 'Video yorumları kapalı.', detail: usageText, tone: 'neutral' };
  }
  if (usage.reason === 'global_disabled') {
    return { title: 'Video yükleme genel olarak kapalı.', detail: usageText, tone: 'warning' };
  }
  if (usage.monthlyLimit <= 0 || usage.reason === 'quota_disabled') {
    return { title: 'Aylık video kotası tanımlı değil.', detail: `${usageText} Müşteriler video ekleyemez.`, tone: 'warning' };
  }
  if (usage.usedCount >= usage.monthlyLimit || usage.reason === 'quota_exceeded') {
    return {
      title: 'Bu ayki video kotası doldu.',
      detail: `${usageText} Müşteriler yeni video ekleyemez; ayarınız açık kalır.`,
      tone: 'warning',
    };
  }
  if (usage.reason === 'provider_unavailable') {
    return { title: 'Video altyapısı geçici olarak kullanılamıyor.', detail: usageText, tone: 'warning' };
  }
  if (usage.reason === 'store_missing') {
    return { title: 'Video kullanım bilgisi alınamadı.', detail: usageText, tone: 'warning' };
  }
  if (usage.reason === 'merchant_disabled') {
    return {
      title: 'Video yorumları kaydedildiğinde açılacak.',
      detail: `${usageText} Kalan: ${usage.remainingCount}.`,
      tone: 'neutral',
    };
  }
  return {
    title: 'Video yorumları açık.',
    detail: `${usageText} Kalan: ${usage.remainingCount}.`,
    tone: 'success',
  };
}
