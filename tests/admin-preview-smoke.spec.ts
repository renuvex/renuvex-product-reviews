import { expect, test } from '@playwright/test';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { WIDGETS, collectSettingFields } from '../src/components/home-page/widgets/widgetDefs';
import {
  MERCHANT_ORIGIN,
  dispatchPreviewSettingsUpdate,
  hasInReviewsShadow,
  hasReviewsWidget,
  setupPreviewRoutes,
  textInReviewsShadow,
  widgetErrors,
} from './widget-harness';

test('admin preview applies layout, toggle, and color updates through preview message path', async ({ page }) => {
  const log = await setupPreviewRoutes(page, {
    reviewsSettings: {
      summaryLayout: 'classic',
      reviewLayout: 'card',
      reviewStarColor: '#f59e0b',
      showMediaGallery: true,
    },
  });

  await page.goto(`${MERCHANT_ORIGIN}/preview`);
  await expect.poll(() => hasReviewsWidget(page)).toBe(true);
  expect(await textInReviewsShadow(page, '.renuvex-pr-title')).toBe('Musteri Yorumlari');
  expect(await hasInReviewsShadow(page, '.renuvex-pr-summary:not(.renuvex-pr-summary-compact)')).toBe(true);
  expect(await hasInReviewsShadow(page, '.renuvex-pr-review-card')).toBe(true);
  expect(await hasInReviewsShadow(page, '.renuvex-pr-media-gallery-section')).toBe(true);

  await dispatchPreviewSettingsUpdate(page, {
    summaryLayout: 'compact',
    reviewLayout: 'gallery',
    reviewStarColor: '#22c55e',
    showMediaGallery: false,
  });

  await expect.poll(() => hasInReviewsShadow(page, '.renuvex-pr-summary-compact')).toBe(true);
  await expect.poll(() => hasInReviewsShadow(page, '.renuvex-pr-review-gallery')).toBe(true);
  expect(await hasInReviewsShadow(page, '.renuvex-pr-media-gallery-section')).toBe(false);
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--renuvex-pr-review-star-color').trim())).toBe('#22c55e');
  expect(widgetErrors(log)).toEqual([]);
});

test('admin widget schema stays aligned with summary and review layout registries', async () => {
  const reviewsWidget = WIDGETS.find((widget) => widget.id === 'reviews');
  expect(reviewsWidget).toBeTruthy();

  const fields = collectSettingFields(reviewsWidget?.settings || []);
  const summaryLayoutField = fields.find((field) => field.key === 'summaryLayout');
  const reviewLayoutField = fields.find((field) => field.key === 'reviewLayout');
  const thumbnailSizeField = fields.find((field) => field.key === 'thumbnailSize');
  const recommendationField = fields.find((field) => field.key === 'showRecommendation');
  const recommendationLabelField = fields.find((field) => field.key === 'recommendationLabel');
  const barFillField = fields.find((field) => field.key === 'barFillColor');
  const richSnippetsField = fields.find((field) => field.key === 'richSnippetsEnabled');
  const textGroup = reviewsWidget?.settings.find((group) => group.title === 'Metin');
  const reviewFormTextGroup = textGroup?.subGroups?.find((group) => group.title === 'Yorum Formu');

  expect(summaryLayoutField?.type).toBe('select');
  expect(reviewLayoutField?.type).toBe('select');
  if (summaryLayoutField?.type !== 'select' || Array.isArray(summaryLayoutField.options) === false) throw new Error('summaryLayout options must be static');
  if (reviewLayoutField?.type !== 'select' || Array.isArray(reviewLayoutField.options) === false) throw new Error('reviewLayout options must be static');

  const summaryOptions = summaryLayoutField.options.map((option) => option.value);
  const reviewOptions = reviewLayoutField.options.map((option) => option.value);

  expect(summaryOptions).toEqual(['classic', 'split', 'compact', 'minimal', 'hero']);
  expect(reviewOptions).toEqual(['card', 'list', 'gallery']);
  expect(await readLayoutRegistryKeys('src/widget/summary-layouts/index.js')).toEqual([...summaryOptions].sort());
  expect(await readLayoutRegistryKeys('src/widget/review-layouts/index.js')).toEqual([...reviewOptions].sort());

  expect(thumbnailSizeField?.showWhen).toEqual({ layoutKey: 'reviewLayout', supports: 'thumbnailSize' });
  expect(recommendationField?.showWhen).toEqual({ layoutKey: 'summaryLayout', supports: 'recommendation' });
  expect(recommendationLabelField).toEqual(expect.objectContaining({
    type: 'text',
    label: 'Tavsiye Yüzdesi Metni',
    default: 'bu ürünü tavsiye ediyor',
    maxLength: 40,
    showWhen: { layoutKey: 'summaryLayout', supports: 'recommendation' },
  }));
  expect(barFillField?.showWhen).toEqual({ layoutKey: 'summaryLayout', supports: 'barChart' });
  expect(richSnippetsField).toEqual(expect.objectContaining({
    type: 'toggle',
    label: 'Google Rich Snippets',
    default: true,
  }));
  expect(reviewFormTextGroup?.fields.map((field) => field.key)).toEqual([
    'formStepRatingTitle',
    'formStepPhotosTitle',
    'formStepPhotosSubtitle',
    'formStepMediaTitle',
    'formStepMediaSubtitle',
    'formStepContentTitle',
    'formStepAuthorTitle',
  ]);
  expect(fields.find((field) => field.key === 'formStepPhotosSubtitle')).toEqual(expect.objectContaining({
    type: 'text',
    maxLength: 90,
  }));
});

async function readLayoutRegistryKeys(relativePath: string): Promise<string[]> {
  const source = await readFile(path.join(process.cwd(), relativePath), 'utf8');
  const block = /export var LAYOUTS = \{([\s\S]*?)\};/.exec(source)?.[1] || '';
  return Array.from(block.matchAll(/^\s+([A-Za-z0-9_-]+):/gm))
    .map((match) => match[1])
    .sort();
}
