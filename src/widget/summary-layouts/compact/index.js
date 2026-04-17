// summary-layouts/compact/index.js
// Loox-style compact layout — header (yıldız + sayı + chevron) her zaman görünür,
// dropdown panel ortalama puan + bar chart içerir, tıklayınca açılır.
// Yorum Yap + filtre butonu header'da kalır.

import { buildBarChart } from '../shared/bar-chart.js';
import { buildActionsBlock } from '../shared/actions-block.js';
import { toggleWriteAccordion } from '../shared/write-toggle.js';
import { COMPACT_CSS } from './styles.js';

export var meta = {
  id: 'compact',
  name: 'Kompakt (Açılır)',
};

export var css = COMPACT_CSS;

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
  summary.className = 'ikr-summary ikr-summary-compact';

  // ─── Header (her zaman görünür) ─────────────────────────────
  var header = document.createElement('div');
  header.className = 'ikr-compact-header';

  // Trigger: yıldız + sayı + chevron — tıklanınca panel toggle
  var trigger = document.createElement('button');
  trigger.className = 'ikr-compact-trigger';
  trigger.type = 'button';
  trigger.setAttribute('aria-expanded', 'false');

  var starsHtml = '';
  for (var s = 1; s <= 5; s++) {
    starsHtml += '<span class="ikr-icon">' + iconPair.filled + '</span>';
  }
  trigger.innerHTML =
    '<span class="ikr-compact-trigger-stars">' + starsHtml + '</span>' +
    '<span class="ikr-compact-trigger-text">' + allCount.toLocaleString('tr-TR') + ' Yorum</span>' +
    '<span class="ikr-compact-chevron">' +
      '<svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
        '<path d="M7.11 5.16L2.16 0.21L0.75 1.62L7.11 7.98L13.48 1.62L12.06 0.21L7.11 5.16Z" fill="currentColor"/>' +
      '</svg>' +
    '</span>';
  header.appendChild(trigger);

  // Actions (Yorum Yap + filtre) — buildActionsBlock döndürür: [write-btn, filter-wrap]
  var actions = buildActionsBlock({
    widget: widget,
    currentOrderBy: currentOrderBy,
    currentHasImages: currentHasImages,
    onWriteClick: toggleWriteAccordion,
    onSortChange: onSortChange,
  });

  // Filter wrap — header'da (trigger ile aynı satırda, sağda)
  var filterWrap = actions.querySelector('.ikr-filter-wrap');
  var writeBtn = actions.querySelector('.ikr-write-btn');

  if (filterWrap) {
    var filterSlot = document.createElement('div');
    filterSlot.className = 'ikr-compact-filter-slot';
    filterSlot.appendChild(filterWrap);
    header.appendChild(filterSlot);
  }

  summary.appendChild(header);

  // ─── Panel (collapsed default) ──────────────────────────────
  var panel = document.createElement('div');
  panel.className = 'ikr-compact-panel';

  var panelInner = document.createElement('div');
  panelInner.className = 'ikr-compact-panel-inner';

  // Büyük ortalama puan
  var avg = document.createElement('div');
  avg.className = 'ikr-compact-avg';
  avg.innerHTML =
    '<span class="ikr-icon">' + iconPair.filled + '</span>' +
    '<span>' + avgRatingVal + '</span>';
  panelInner.appendChild(avg);

  // Bar chart
  panelInner.appendChild(buildBarChart({
    ratingCounts: ratingCounts,
    allCount: allCount,
    iconPair: iconPair,
    currentRatingFilter: currentRatingFilter,
    onFilterChange: onFilterChange,
  }));

  panel.appendChild(panelInner);
  summary.appendChild(panel);

  // Write button — en altta tek satır (mobilde de desktop'ta da full-width)
  if (writeBtn) {
    var writeRow = document.createElement('div');
    writeRow.className = 'ikr-compact-write-row';
    writeRow.appendChild(writeBtn);
    summary.appendChild(writeRow);
  }

  // ─── Toggle davranışı ───────────────────────────────────────
  trigger.onclick = function() {
    var isOpen = panel.classList.contains('ikr-open');
    if (isOpen) {
      panel.style.maxHeight = '0px';
      panel.classList.remove('ikr-open');
      trigger.setAttribute('aria-expanded', 'false');
    } else {
      panel.style.maxHeight = panelInner.scrollHeight + 32 + 'px';
      panel.classList.add('ikr-open');
      trigger.setAttribute('aria-expanded', 'true');
    }
  };

  // showRecommendation hâlâ destekli — panel altında küçük metin
  if ((settings.showRecommendation !== false)) {
    var recommendCount = (ratingCounts[3] || 0) + (ratingCounts[4] || 0);
    var recommendPct = allCount > 0 ? Math.round((recommendCount / allCount) * 100) : 0;
    if (recommendPct > 0) {
      var rec = document.createElement('div');
      rec.className = 'ikr-summary-block ikr-summary-recommend';
      rec.style.marginTop = '8px';
      rec.innerHTML = '<span class="ikr-recommend-pct">%' + recommendPct + '</span> bu ürünü tavsiye ediyor';
      panelInner.appendChild(rec);
    }
  }

  return summary;
}
