// summary-layouts/split/index.js
// Yatay 3 kolon layout (Allbirds/Loox stili):
// SOL: yıldızlar + ortalama "X out of 5" + toplam yorum sayısı
// ORTA: bar chart
// SAĞ: filter butonu + write butonu (dikey)
// Mobile (<768): 3 kolon alt alta diziliyor.

import { buildBarChart } from '../shared/bar-chart.js';
import { buildActionsBlock } from '../shared/actions-block.js';
import { toggleWriteAccordion } from '../shared/write-toggle.js';
import { SPLIT_CSS } from './styles.js';

export var meta = {
  id: 'split',
  name: 'Yatay Bölünmüş',
};

export var css = SPLIT_CSS;

export function render(opts) {
  var widget = opts.widget;
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

  var summary = document.createElement('div');
  summary.className = 'ikr-summary ikr-summary-split';

  // ─── SOL: yıldızlar + ortalama + toplam ───────────────────────
  var left = document.createElement('div');
  left.className = 'ikr-split-col ikr-split-left';

  var starsHtml = '';
  for (var s = 1; s <= 5; s++) {
    starsHtml += '<span class="ikr-icon">' + iconPair.filled + '</span>';
  }
  var stars = document.createElement('div');
  stars.className = 'ikr-split-left-stars';
  stars.innerHTML = starsHtml;
  left.appendChild(stars);

  var avg = document.createElement('div');
  avg.className = 'ikr-split-left-avg';
  avg.textContent = avgRatingVal + ' / 5';
  left.appendChild(avg);

  var count = document.createElement('div');
  count.className = 'ikr-split-left-count';
  count.textContent = allCount.toLocaleString('tr-TR') + ' yorum';
  left.appendChild(count);

  summary.appendChild(left);

  // ─── ORTA: bar chart ──────────────────────────────────────────
  var mid = document.createElement('div');
  mid.className = 'ikr-split-col ikr-split-mid';
  mid.appendChild(buildBarChart({
    ratingCounts: ratingCounts,
    allCount: allCount,
    iconPair: iconPair,
    currentRatingFilter: currentRatingFilter,
    onFilterChange: onFilterChange,
  }));
  summary.appendChild(mid);

  // ─── SAĞ: filter (üstte) + write (altta) ──────────────────────
  // buildActionsBlock döndürür: actionsBlock { write-btn, filter-wrap }
  // Bunları parçalayıp sağ kolona dikey diziyoruz.
  var actions = buildActionsBlock({
    widget: widget,
    currentOrderBy: currentOrderBy,
    currentHasImages: currentHasImages,
    onWriteClick: toggleWriteAccordion,
    onSortChange: onSortChange,
  });
  var filterWrap = actions.querySelector('.ikr-filter-wrap');
  var writeBtn = actions.querySelector('.ikr-write-btn');

  var right = document.createElement('div');
  right.className = 'ikr-split-col ikr-split-right';
  if (filterWrap) right.appendChild(filterWrap);
  if (writeBtn) right.appendChild(writeBtn);
  summary.appendChild(right);

  // Tavsiye yüzdesi (opsiyonel) — sol kolonun altına eklensin
  if ((settings.showRecommendation !== false)) {
    var recommendCount = (ratingCounts[3] || 0) + (ratingCounts[4] || 0);
    var recommendPct = allCount > 0 ? Math.round((recommendCount / allCount) * 100) : 0;
    if (recommendPct > 0) {
      var rec = document.createElement('div');
      rec.className = 'ikr-summary-block ikr-summary-recommend';
      rec.style.marginTop = '4px';
      rec.innerHTML = '<span class="ikr-recommend-pct">%' + recommendPct + '</span> tavsiye ediyor';
      left.appendChild(rec);
    }
  }

  return summary;
}
