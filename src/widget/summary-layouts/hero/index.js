// summary-layouts/hero/index.js
// Vurgulu (Hero) layout — dev avg puan + yanında yıldız ve sayı + sağda actions.
// Loox/Glow Recipe stili — markaya güven duygusu için "puan" ön planda.

import { buildActionsBlock } from '../shared/actions-block.js';
import { toggleWriteAccordion } from '../shared/write-toggle.js';
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

  var avg = document.createElement('span');
  avg.className = 'ikr-hero-avg';
  avg.textContent = avgRatingVal;
  info.appendChild(avg);

  var metaCol = document.createElement('div');
  metaCol.className = 'ikr-hero-meta';

  var stars = document.createElement('span');
  stars.className = 'ikr-hero-stars';
  stars.innerHTML = partialStarsHTML(avgRatingVal, iconPair);
  metaCol.appendChild(stars);

  var count = document.createElement('div');
  count.className = 'ikr-hero-count';
  count.textContent = allCount.toLocaleString('tr-TR') + ' yorum üzerinden';
  metaCol.appendChild(count);

  info.appendChild(metaCol);
  summary.appendChild(info);

  // ─── SAĞ: filter + write (desktop) ─────────────────────────────
  var actions = buildActionsBlock({
    widget: widget,
    currentOrderBy: currentOrderBy,
    currentHasImages: currentHasImages,
    onWriteClick: toggleWriteAccordion,
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
    writeBtnMobile.onclick = toggleWriteAccordion;
    var writeRow = document.createElement('div');
    writeRow.className = 'ikr-hero-write-row';
    writeRow.appendChild(writeBtnMobile);
    summary.appendChild(writeRow);
  }

  return summary;
}
