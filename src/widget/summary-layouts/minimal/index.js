// summary-layouts/minimal/index.js
// En yalın layout — bar chart yok, sadece avg + yıldız + sayı + filter + write.
// Yer kazanmak isteyenler için (Trendyol/Allbirds stili).
// onFilterChange (rating filter) burada UI olarak yok — bar chart çıkartıldığı için
// kullanıcı sadece sıralama ve fotoğraf filtresini (filter dropdown) kullanabilir.

import { buildActionsBlock } from '../shared/actions-block.js';
import { toggleWriteAccordion } from '../shared/write-toggle.js';
import { partialStarsHTML } from '../../core/helpers.js';
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
  var iconPair = opts.iconPair;
  var allCount = opts.allCount;
  var avgRatingVal = opts.avgRatingVal;
  var currentOrderBy = opts.currentOrderBy;
  var currentHasImages = opts.currentHasImages;
  var onSortChange = opts.onSortChange;

  var summary = document.createElement('div');
  summary.className = 'ikr-summary ikr-summary-minimal';

  // ─── SOL: avg + yıldız + alt satırda "X yorum üzerinden" ───────
  var info = document.createElement('div');
  info.className = 'ikr-minimal-info';

  var topRow = document.createElement('div');
  topRow.className = 'ikr-minimal-row';

  var avg = document.createElement('span');
  avg.className = 'ikr-minimal-avg';
  avg.textContent = avgRatingVal;
  topRow.appendChild(avg);

  var stars = document.createElement('span');
  stars.className = 'ikr-minimal-stars';
  stars.innerHTML = partialStarsHTML(avgRatingVal, iconPair);
  topRow.appendChild(stars);

  info.appendChild(topRow);

  var count = document.createElement('div');
  count.className = 'ikr-minimal-count';
  count.textContent = allCount.toLocaleString('tr-TR') + ' yorum üzerinden';
  info.appendChild(count);

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
  actionsSlot.className = 'ikr-minimal-actions';
  if (writeBtn) actionsSlot.appendChild(writeBtn);
  if (filterWrap) actionsSlot.appendChild(filterWrap);
  summary.appendChild(actionsSlot);

  // ─── Mobile-only write satırı (CSS ile sadece <600 görünür) ────
  if (writeBtn) {
    var writeBtnMobile = document.createElement('button');
    writeBtnMobile.className = 'ikr-write-btn';
    writeBtnMobile.textContent = 'Yorum Yap';
    writeBtnMobile.onclick = toggleWriteAccordion;
    var writeRow = document.createElement('div');
    writeRow.className = 'ikr-minimal-write-row';
    writeRow.appendChild(writeBtnMobile);
    summary.appendChild(writeRow);
  }

  return summary;
}
