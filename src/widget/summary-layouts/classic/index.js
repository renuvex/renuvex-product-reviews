// summary-layouts/classic/index.js
// Mevcut "Klasik" tasarım — yıldız + yorum sayısı + tavsiye yüzdesi + bar chart + actions.
// Her şey her zaman görünür (collapsed state yok).

import { buildBarChart } from '../shared/bar-chart.js';
import { buildActionsBlock } from '../shared/actions-block.js';
import { openWriteForm } from '../shared/write-action.js';
import { ensureStarSprite, starUseSvg } from '../../icons/star-sprite.js';

export var meta = {
  id: 'classic',
  name: 'Klasik (Açık)',
};

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
  var currentHasImages = opts.currentHasImages;
  var onFilterChange = opts.onFilterChange;
  var onSortChange = opts.onSortChange;

  ensureStarSprite(iconPair);

  var summary = document.createElement('div');
  summary.className = 'ikr-summary';

  var recommendCount = (ratingCounts[3] || 0) + (ratingCounts[4] || 0);
  var recommendPct = allCount > 0 ? Math.round((recommendCount / allCount) * 100) : 0;

  // Ortalama puan
  var avgBlock = document.createElement('div');
  avgBlock.className = 'ikr-summary-block ikr-summary-avg';
  avgBlock.innerHTML =
    '<span class="ikr-avg-star ikr-icon">' + starUseSvg('full') + '</span>' +
    '<span class="ikr-avg-num">' + avgRatingVal + '</span>';
  summary.appendChild(avgBlock);

  // Toplam yorum sayısı
  var countBlock = document.createElement('div');
  countBlock.className = 'ikr-summary-block ikr-summary-count';
  countBlock.textContent = allCount.toLocaleString('tr-TR') + ' Yorum';
  summary.appendChild(countBlock);

  // Tavsiye yüzdesi (opsiyonel)
  if ((settings.showRecommendation !== false) && recommendPct > 0) {
    var recBlock = document.createElement('div');
    recBlock.className = 'ikr-summary-block ikr-summary-recommend';
    recBlock.innerHTML = '<span class="ikr-recommend-pct">%' + recommendPct + '</span> bu ürünü tavsiye ediyor';
    summary.appendChild(recBlock);
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
    currentHasImages: currentHasImages,
    onWriteClick: openWriteForm,
    onSortChange: onSortChange,
  }));

  return summary;
}
