// summary-layouts/minimal/index.js
// En yalın layout — bar chart yok, sadece avg + yıldız + sayı + filter + write.
// Yer kazanmak isteyenler için (Trendyol/Allbirds stili).
// onFilterChange (rating filter) burada UI olarak yok — bar chart çıkartıldığı için
// kullanıcı sadece sıralama ve fotoğraf filtresini (filter dropdown) kullanabilir.

import { buildActionsBlock } from '../shared/actions-block.js';
import { openWriteForm } from '../shared/write-action.js';
import { partialStarsHTML, settingText } from '../../core/helpers.js';
import { MINIMAL_CSS } from './styles.js';

export var meta = {
  id: 'minimal',
  name: 'Minimal (Yalın)',
  // Bkz: review-layouts/index.js ve summary-layouts/index.js — supports sözleşmesi.
  supports: { recommendation: false, barChart: false },
};

export var css = MINIMAL_CSS;

export function render(opts) {
  var widget = opts.widget;
  var settings = opts.settings;
  var iconPair = opts.iconPair;
  var allCount = opts.allCount;
  var avgRatingVal = opts.avgRatingVal;
  var currentOrderBy = opts.currentOrderBy;
  var currentMediaFilter = opts.currentMediaFilter;
  var onSortChange = opts.onSortChange;

  var summary = document.createElement('div');
  summary.className = 'renuvex-pr-summary renuvex-pr-summary-minimal';

  // ─── SOL: avg + yıldız + alt satırda "X yorum üzerinden" ───────
  var info = document.createElement('div');
  info.className = 'renuvex-pr-minimal-info';

  var topRow = document.createElement('div');
  topRow.className = 'renuvex-pr-minimal-row';

  var avg = document.createElement('span');
  avg.className = 'renuvex-pr-minimal-avg';
  avg.textContent = avgRatingVal;
  topRow.appendChild(avg);

  var stars = document.createElement('span');
  stars.className = 'renuvex-pr-minimal-stars';
  stars.innerHTML = partialStarsHTML(avgRatingVal, iconPair);
  topRow.appendChild(stars);

  // Count artik avg+stars ile ayni satirda — "4.5 ★★★★★ 8 Yorum"
  var count = document.createElement('span');
  count.className = 'renuvex-pr-minimal-count';
  count.textContent = allCount.toLocaleString('tr-TR') + ' ' + settingText(settings.countLabel, 'Yorum');
  topRow.appendChild(count);

  info.appendChild(topRow);

  summary.appendChild(info);

  // ─── SAĞ: filter + write (desktop) ─────────────────────────────
  var actions = buildActionsBlock({
    widget: widget,
    currentOrderBy: currentOrderBy,
    currentMediaFilter: currentMediaFilter,
    onWriteClick: openWriteForm,
    onSortChange: onSortChange,
  });
  var filterWrap = actions.querySelector('.renuvex-pr-filter-wrap');
  var writeBtn = actions.querySelector('.renuvex-pr-write-btn');

  var actionsSlot = document.createElement('div');
  actionsSlot.className = 'renuvex-pr-minimal-actions';
  if (writeBtn) actionsSlot.appendChild(writeBtn);
  if (filterWrap) actionsSlot.appendChild(filterWrap);
  summary.appendChild(actionsSlot);

  // ─── Mobile-only write + filter satırı (CSS ile sadece <600 görünür) ────
  // Hero ile aynı desen: mobilde filtre yalnız kalıp sol-alt köşede orphan
  // olmasın diye "Yorum Yap" ile aynı satıra alınır. Desktop minimal-actions
  // mobilde gizlenir (styles.js). buildActionsBlock ayrı bir instance döndürür.
  var mobileActions = buildActionsBlock({
    widget: widget,
    currentOrderBy: currentOrderBy,
    currentMediaFilter: currentMediaFilter,
    onWriteClick: openWriteForm,
    onSortChange: onSortChange,
  });
  var mFilter = mobileActions.querySelector('.renuvex-pr-filter-wrap');
  var mWrite = mobileActions.querySelector('.renuvex-pr-write-btn');
  var writeRow = document.createElement('div');
  writeRow.className = 'renuvex-pr-minimal-write-row';
  if (mWrite) writeRow.appendChild(mWrite);
  if (mFilter) writeRow.appendChild(mFilter);
  summary.appendChild(writeRow);

  return summary;
}
