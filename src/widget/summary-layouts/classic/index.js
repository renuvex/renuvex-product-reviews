// summary-layouts/classic/index.js
// Mevcut "Klasik" tasarım — yıldız + yorum sayısı + tavsiye yüzdesi + bar chart + actions.
// Her şey her zaman görünür (collapsed state yok).

import { buildBarChart } from '../shared/bar-chart.js';
import { buildActionsBlock } from '../shared/actions-block.js';
import { openWriteForm } from '../shared/write-action.js';
import { buildRecommendationBlock, getRecommendationPercent } from '../shared/recommendation.js';
import { settingText } from '../../core/helpers.js';
import { ensureStarSprite, starUseSvg } from '../../icons/star-sprite.js';
import { CLASSIC_SUMMARY_CSS } from './styles.js';

export var meta = {
  id: 'classic',
  name: 'Klasik (Açık)',
};

export var css = CLASSIC_SUMMARY_CSS;

/**
 * @param {import('../index.js').SummaryRenderOpts} opts
 * @returns {HTMLElement}
 */
export function render(opts) {
  var widget = opts.widget;
  var data = opts.data;
  var settings = opts.settings;
  var iconPair = opts.iconPair;
  var allCount = opts.allCount;
  var ratingCounts = opts.ratingCounts;
  var avgRatingVal = opts.avgRatingVal;
  var currentRatingFilter = opts.currentRatingFilter;
  var currentOrderBy = opts.currentOrderBy;
  var currentMediaFilter = opts.currentMediaFilter;
  var onFilterChange = opts.onFilterChange;
  var onSortChange = opts.onSortChange;

  ensureStarSprite(iconPair);

  var summary = document.createElement('div');
  summary.className = 'renuvex-pr-summary';

  var recommendPct = getRecommendationPercent(ratingCounts, allCount);

  // Ortalama puan
  var avgBlock = document.createElement('div');
  avgBlock.className = 'renuvex-pr-summary-block renuvex-pr-summary-avg';
  avgBlock.innerHTML =
    '<span class="renuvex-pr-avg-star renuvex-pr-icon">' + starUseSvg('full') + '</span>' +
    '<span class="renuvex-pr-avg-num">' + avgRatingVal + '</span>';
  summary.appendChild(avgBlock);

  // Toplam yorum sayısı
  var countBlock = document.createElement('div');
  countBlock.className = 'renuvex-pr-summary-block renuvex-pr-summary-count';
  countBlock.textContent = allCount.toLocaleString('tr-TR') + ' ' + settingText(settings.countLabel, 'Yorum');
  summary.appendChild(countBlock);

  // Tavsiye yüzdesi (opsiyonel)
  if ((settings.showRecommendation !== false) && recommendPct > 0) {
    summary.appendChild(buildRecommendationBlock(settings, recommendPct));
  }

  // Bar chart
  summary.appendChild(buildBarChart({
    ratingCounts: ratingCounts,
    allCount: allCount,
    iconPair: iconPair,
    currentRatingFilter: currentRatingFilter,
    onFilterChange: onFilterChange,
  }));

  // Actions (Yorum Yap + filtre)
  summary.appendChild(buildActionsBlock({
    widget: widget,
    currentOrderBy: currentOrderBy,
    currentMediaFilter: currentMediaFilter,
    onWriteClick: openWriteForm,
    onSortChange: onSortChange,
  }));

  return summary;
}
