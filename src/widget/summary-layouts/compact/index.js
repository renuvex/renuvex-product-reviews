// summary-layouts/compact/index.js
// Loox-style compact layout — header (yıldız + sayı + chevron) her zaman görünür,
// trigger'a tıklayınca POPOVER (overlay) olarak panel açılır — sayfayı itmez.
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

  // Trigger wrap — popover'ı anchor edebilmek için position:relative parent
  var triggerWrap = document.createElement('div');
  triggerWrap.className = 'ikr-compact-trigger-wrap';

  // Trigger: yıldız + sayı + chevron — tıklanınca popover toggle
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
  triggerWrap.appendChild(trigger);
  header.appendChild(triggerWrap);

  // Actions (Yorum Yap + filtre) — buildActionsBlock döndürür: [write-btn, filter-wrap]
  var actions = buildActionsBlock({
    widget: widget,
    currentOrderBy: currentOrderBy,
    currentHasImages: currentHasImages,
    onWriteClick: toggleWriteAccordion,
    onSortChange: onSortChange,
  });

  // Header sağında actions slot — desktop'ta hem write hem filter, mobile'da sadece filter
  var filterWrap = actions.querySelector('.ikr-filter-wrap');
  var writeBtn = actions.querySelector('.ikr-write-btn');

  var actionsSlot = document.createElement('div');
  actionsSlot.className = 'ikr-compact-actions-slot';
  if (writeBtn) actionsSlot.appendChild(writeBtn);
  if (filterWrap) actionsSlot.appendChild(filterWrap);
  header.appendChild(actionsSlot);

  summary.appendChild(header);

  // ─── Popover Panel (trigger'a anchor, overlay) ──────────────
  var panel = document.createElement('div');
  panel.className = 'ikr-compact-panel';
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-hidden', 'true');

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
  // Panel triggerWrap içine — trigger'a anchor (position:absolute relative parent)
  triggerWrap.appendChild(panel);

  // Mobile-only write satırı — header'daki butonun ikinci kopyası, CSS ile sadece mobile'da gözükür
  if (writeBtn) {
    var writeBtnMobile = document.createElement('button');
    writeBtnMobile.className = 'ikr-write-btn';
    writeBtnMobile.textContent = 'Yorum Yap';
    writeBtnMobile.onclick = toggleWriteAccordion;
    var writeRow = document.createElement('div');
    writeRow.className = 'ikr-compact-write-row';
    writeRow.appendChild(writeBtnMobile);
    summary.appendChild(writeRow);
  }

  // ─── Popover toggle davranışı ───────────────────────────────
  function closePanel() {
    panel.classList.remove('ikr-open');
    panel.setAttribute('aria-hidden', 'true');
    trigger.setAttribute('aria-expanded', 'false');
  }
  function openPanel() {
    panel.classList.add('ikr-open');
    panel.setAttribute('aria-hidden', 'false');
    trigger.setAttribute('aria-expanded', 'true');
  }
  trigger.onclick = function(e) {
    e.stopPropagation();
    if (panel.classList.contains('ikr-open')) closePanel();
    else openPanel();
  };
  // Panel içine tıklama popover'ı kapatmasın (filter satırları çalışsın)
  panel.addEventListener('click', function(e) { e.stopPropagation(); });
  // Dış tıklama → kapat
  if (widget) {
    widget.addEventListener('click', function(e) {
      if (!triggerWrap.contains(e.target)) closePanel();
    });
  }
  // ESC ile kapat
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && panel.classList.contains('ikr-open')) closePanel();
  });

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
