// summary-layouts/hero/index.js
// Vurgulu (Hero) layout — dev avg puan + yanında yıldız ve sayı + sağda actions.
// Modern stil — markaya güven duygusu için "puan" ön planda.

import { buildActionsBlock } from '../shared/actions-block.js';
import { openWriteForm } from '../shared/write-action.js';
import { partialStarsHTML } from '../../core/helpers.js';
import { HERO_CSS } from './styles.js';

export var meta = {
  id: 'hero',
  name: 'Vurgulu (Büyük Puan)',
  // Bkz: review-layouts/index.js ve summary-layouts/index.js — supports sözleşmesi.
  supports: { recommendation: false, barChart: false },
};

export var css = HERO_CSS;

export function render(opts) {
  var widget = opts.widget;
  var iconPair = opts.iconPair;
  var allCount = opts.allCount;
  var avgRatingVal = opts.avgRatingVal;
  var currentOrderBy = opts.currentOrderBy;
  var currentHasImages = opts.currentHasImages;
  var onSortChange = opts.onSortChange;

  var summary = document.createElement('div');
  summary.className = 'renuvex-pr-summary renuvex-pr-summary-hero';

  // ─── SOL: dev avg + (yanında) yıldız + sayı ───────────────────
  var info = document.createElement('div');
  info.className = 'renuvex-pr-hero-info';

  var ratingCol = document.createElement('div');
  ratingCol.className = 'renuvex-pr-hero-rating-col';
  
  var avg = document.createElement('span');
  avg.className = 'renuvex-pr-hero-avg';
  avg.textContent = avgRatingVal;
  ratingCol.appendChild(avg);

  var metaRow = document.createElement('div');
  metaRow.className = 'renuvex-pr-hero-meta-row';

  var stars = document.createElement('span');
  stars.className = 'renuvex-pr-hero-stars';
  stars.innerHTML = partialStarsHTML(avgRatingVal, iconPair);
  metaRow.appendChild(stars);

  var count = document.createElement('div');
  count.className = 'renuvex-pr-hero-count';
  count.textContent = allCount.toLocaleString('tr-TR') + ' Yorum';
  metaRow.appendChild(count);

  ratingCol.appendChild(metaRow);
  info.appendChild(ratingCol);
  summary.appendChild(info);

  // ─── SAĞ: filter + write (desktop) ─────────────────────────────
  var actions = buildActionsBlock({
    widget: widget,
    currentOrderBy: currentOrderBy,
    currentHasImages: currentHasImages,
    onWriteClick: openWriteForm,
    onSortChange: onSortChange,
  });
  var filterWrap = actions.querySelector('.renuvex-pr-filter-wrap');
  var writeBtn = actions.querySelector('.renuvex-pr-write-btn');

  var actionsSlot = document.createElement('div');
  actionsSlot.className = 'renuvex-pr-hero-actions renuvex-pr-desktop-only';
  if (writeBtn) actionsSlot.appendChild(writeBtn);
  if (filterWrap) actionsSlot.appendChild(filterWrap);
  summary.appendChild(actionsSlot);

  // ─── Mobile-only write + filter satırı ─────────────────────────
  var mobileActions = buildActionsBlock({
    widget: widget,
    currentOrderBy: currentOrderBy,
    currentHasImages: currentHasImages,
    onWriteClick: openWriteForm,
    onSortChange: onSortChange,
  });
  var mFilter = mobileActions.querySelector('.renuvex-pr-filter-wrap');
  var mWrite = mobileActions.querySelector('.renuvex-pr-write-btn');
  
  var writeRow = document.createElement('div');
  writeRow.className = 'renuvex-pr-hero-write-row';
  if (mWrite) writeRow.appendChild(mWrite);
  if (mFilter) writeRow.appendChild(mFilter);
  summary.appendChild(writeRow);

  return summary;
}
