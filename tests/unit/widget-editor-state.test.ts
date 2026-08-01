import { describe, expect, it } from 'vitest';
import { resolveConfigurableWidget } from '../../src/lib/widgets/catalog';
import {
  buildWidgetPreviewSettings,
  mergeWithDefaults,
  sameSettingsDraft,
  shouldSyncDraftFromSaved,
  type WidgetSettingsDraft,
} from '../../src/features/widget-management/components/editor/WidgetEditorState';

const reviewsResolution = resolveConfigurableWidget('reviews');
const badgeResolution = resolveConfigurableWidget('badge');

if (!reviewsResolution.ok || !badgeResolution.ok) {
  throw new Error('implemented widget definition is missing');
}

const reviewsWidget = reviewsResolution.widget;
const badgeWidget = badgeResolution.widget;

describe('WidgetEditor state helpers', () => {
  it('merges saved review settings over widget defaults', () => {
    const merged = mergeWithDefaults(reviewsWidget, {
      title: 'Kayitli baslik',
      size: 'large',
    });

    expect(merged.title).toBe('Kayitli baslik');
    expect(merged.size).toBe('large');
    expect(merged.summaryLayout).toBe('classic');
    expect(merged.reviewLayout).toBe('card');
    expect(merged.paginationMode).toBe('loadMore');
  });

  it('compares drafts without key-order false positives', () => {
    expect(sameSettingsDraft({ a: 1, b: 'x' }, { b: 'x', a: 1 })).toBe(true);
  });

  it('syncs late saved settings when the user has not edited the local draft', () => {
    const previousSavedDraft = mergeWithDefaults(reviewsWidget, {});
    const currentDraft = { ...previousSavedDraft };
    const nextSavedDraft = mergeWithDefaults(reviewsWidget, {
      title: 'Gercek kayitli baslik',
      size: 'large',
    });

    expect(shouldSyncDraftFromSaved(currentDraft, previousSavedDraft, false)).toBe(true);
    expect(sameSettingsDraft(currentDraft, nextSavedDraft)).toBe(false);
  });

  it('does not overwrite a local edit when saved settings hydrate later', () => {
    const previousSavedDraft = mergeWithDefaults(reviewsWidget, {});
    const currentDraft: WidgetSettingsDraft = {
      ...previousSavedDraft,
      title: 'Kullanici yerel degisiklik',
    };

    expect(shouldSyncDraftFromSaved(currentDraft, previousSavedDraft, false)).toBe(false);
  });

  it('syncs when the edited widget changes', () => {
    const previousSavedDraft = mergeWithDefaults(reviewsWidget, {});
    const currentDraft: WidgetSettingsDraft = {
      ...previousSavedDraft,
      title: 'Kullanici yerel degisiklik',
    };

    expect(shouldSyncDraftFromSaved(currentDraft, previousSavedDraft, true)).toBe(true);
  });

  it('builds a complete preview settings map while overlaying only the active draft', () => {
    const result = buildWidgetPreviewSettings(
      {
        reviews: { title: 'Kayitli baslik', reviewStarColor: '#123456' },
        badge: { size: 'small', showCount: false },
      },
      badgeWidget,
      { size: 'large', alignment: 'right' },
    );

    expect(result.reviews).toEqual(expect.objectContaining({
      title: 'Kayitli baslik',
      reviewStarColor: '#123456',
      summaryLayout: 'classic',
    }));
    expect(result.badge).toEqual(expect.objectContaining({
      size: 'large',
      alignment: 'right',
      showCount: false,
      showValue: true,
    }));
    expect(result.carousel).toBeUndefined();
  });
});
