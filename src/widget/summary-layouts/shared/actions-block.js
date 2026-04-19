// summary-layouts/shared/actions-block.js
// Actions row — Yorum Yap butonu + filtre dropdown.
// Tüm summary layout'ları bu shared parçayı kullanır.

import { registerPopover, notifyOpening } from './popover-registry.js';

export function buildActionsBlock(opts) {
  var widget = opts.widget;
  var currentOrderBy = opts.currentOrderBy;
  var currentHasImages = opts.currentHasImages;
  var onWriteClick = opts.onWriteClick;
  var onSortChange = opts.onSortChange;

  var actionsBlock = document.createElement('div');
  actionsBlock.className = 'ikr-summary-block ikr-summary-actions';

  var writeBtn = document.createElement('button');
  writeBtn.className = 'ikr-write-btn';
  writeBtn.textContent = 'Yorum Yap';
  writeBtn.onclick = onWriteClick;
  actionsBlock.appendChild(writeBtn);

  var filterWrap = document.createElement('div');
  filterWrap.className = 'ikr-filter-wrap';

  var filterBtn = document.createElement('button');
  filterBtn.className = 'ikr-filter-btn';
  filterBtn.setAttribute('aria-label', 'Filtrele');
  filterBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="4" y1="6" x2="20" y2="6"/><line x1="7" y1="12" x2="17" y2="12"/><line x1="10" y1="18" x2="14" y2="18"/></svg>';

  var filterMenu = document.createElement('div');
  filterMenu.className = 'ikr-filter-menu';

  var filterOpts = [
    ['newest', 'En Yeni', false],
    ['highest', 'En Yüksek Puan', false],
    ['lowest', 'En Düşük Puan', false],
    ['photos', 'Fotoğraflı', true],
  ];
  function closeFilter() {
    filterMenu.classList.remove('ikr-open');
    filterBtn.classList.remove('ikr-filter-btn-active');
  }
  function openFilter() {
    notifyOpening(filterRegistration);
    filterMenu.classList.add('ikr-open');
    filterBtn.classList.add('ikr-filter-btn-active');
  }

  filterOpts.forEach(function(opt) {
    var isPhotos = opt[2];
    var isActive = isPhotos ? currentHasImages : (!currentHasImages && (currentOrderBy || 'newest') === opt[0]);
    var item = document.createElement('div');
    item.className = 'ikr-filter-item' + (isActive ? ' ikr-filter-item-active' : '');
    item.textContent = opt[1];
    item.onclick = function() {
      closeFilter();
      onSortChange(opt[0], isPhotos);
    };
    filterMenu.appendChild(item);
  });

  filterBtn.onclick = function() {
    if (filterMenu.classList.contains('ikr-open')) closeFilter();
    else openFilter();
  };

  // Filter her zaman popover (overlay) — desktop ve mobile'da light dismiss.
  var filterRegistration = registerPopover({
    trigger: filterWrap,
    element: filterMenu,
    close: closeFilter,
  });

  filterWrap.appendChild(filterBtn);
  filterWrap.appendChild(filterMenu);
  actionsBlock.appendChild(filterWrap);

  return actionsBlock;
}
