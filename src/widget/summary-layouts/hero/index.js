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
  summary.className = 'ikr-summary ikr-summary-hero';

  // ─── SOL: dev avg + (yanında) yıldız + sayı ───────────────────
  var info = document.createElement('div');
  info.className = 'ikr-hero-info';

  var ratingCol = document.createElement('div');
  ratingCol.className = 'ikr-hero-rating-col';
  
  var avg = document.createElement('span');
  avg.className = 'ikr-hero-avg';
  avg.textContent = avgRatingVal;
  ratingCol.appendChild(avg);

  var stars = document.createElement('span');
  stars.className = 'ikr-hero-stars';
  stars.innerHTML = partialStarsHTML(avgRatingVal, iconPair);
  ratingCol.appendChild(stars);
  info.appendChild(ratingCol);

  var countCol = document.createElement('div');
  countCol.className = 'ikr-hero-meta'; // Sınıf ismini koruyoruz ki CSS kırılmasın ama yapı değişti

  var count = document.createElement('div');
  count.className = 'ikr-hero-count';
  count.textContent = allCount.toLocaleString('tr-TR') + ' Yorum';
  countCol.appendChild(count);

  info.appendChild(countCol);
  summary.appendChild(info);

  // ─── SAĞ: filter + write (desktop) ─────────────────────────────
  var actions = buildActionsBlock({
    widget: widget,
    currentOrderBy: currentOrderBy,
    currentHasImages: currentHasImages,
    onWriteClick: openWriteForm,
    onSortChange: onSortChange,
  });
  var filterWrap = actions.querySelector('.ikr-filter-wrap');
  var writeBtn = actions.querySelector('.ikr-write-btn');

  var actionsSlot = document.createElement('div');
  actionsSlot.className = 'ikr-hero-actions';
  if (writeBtn) actionsSlot.appendChild(writeBtn);
  if (filterWrap) actionsSlot.appendChild(filterWrap);
  summary.appendChild(actionsSlot);

  // ─── Mobile-only write satırı ─────────────────────────────────
  if (writeBtn) {
    var writeBtnMobile = document.createElement('button');
    writeBtnMobile.className = 'ikr-write-btn';
    writeBtnMobile.textContent = 'Yorum Yap';
    writeBtnMobile.onclick = openWriteForm;
    var writeRow = document.createElement('div');
    writeRow.className = 'ikr-hero-write-row';
    writeRow.appendChild(writeBtnMobile);
    summary.appendChild(writeRow);
  }

  return summary;
}
