// summary-layouts/shared/actions-block.js
// Actions row — Yorum Yap butonu + filtre dropdown.
// Tüm summary layout'ları bu shared parçayı kullanır.

import { registerPopover, notifyOpening } from './popover-registry.js';
import { getFilterIconSvg } from '../../icons.js';
import { currentSettings } from '../../core/state.js';

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
  // Buton metni admin "Yorum Yap Butonu Metni" alanından gelir; boşsa fallback.
  writeBtn.textContent = (currentSettings && currentSettings.writeButtonText) || 'Yorum Yap';
  writeBtn.onclick = onWriteClick;
  actionsBlock.appendChild(writeBtn);

  var filterWrap = document.createElement('div');
  filterWrap.className = 'ikr-filter-wrap';

  var filterBtn = document.createElement('button');
  filterBtn.type = 'button';
  filterBtn.className = 'ikr-filter-btn';
  filterBtn.setAttribute('aria-label', 'Filtrele');
  filterBtn.setAttribute('aria-haspopup', 'menu');
  filterBtn.setAttribute('aria-expanded', 'false');
  // İkon admin panelinden seçili (settings.filterIcon); fallback "lines".
  var filterIconKey = (currentSettings && currentSettings.filterIcon) || 'lines';
  filterBtn.innerHTML = getFilterIconSvg(filterIconKey);

  var filterMenu = document.createElement('div');
  filterMenu.className = 'ikr-filter-menu';
  filterMenu.setAttribute('role', 'menu');

  var filterOpts = [
    ['newest', 'En Yeni', false],
    ['highest', 'En Yüksek Puan', false],
    ['lowest', 'En Düşük Puan', false],
    ['photos', 'Fotoğraflı', true],
  ];
  function closeFilter(opts) {
    var wasOpen = filterMenu.classList.contains('ikr-open');
    filterMenu.classList.remove('ikr-open');
    filterBtn.classList.remove('ikr-filter-btn-active');
    filterBtn.setAttribute('aria-expanded', 'false');
    if (wasOpen && opts && opts.restoreFocus) {
      try { filterBtn.focus({ preventScroll: true }); } catch (_) {
        try { filterBtn.focus(); } catch (_) {}
      }
    }
  }
  function openFilter() {
    notifyOpening(filterRegistration);
    filterMenu.classList.add('ikr-open');
    filterBtn.classList.add('ikr-filter-btn-active');
    filterBtn.setAttribute('aria-expanded', 'true');
    var firstItem = filterMenu.querySelector('.ikr-filter-item-active') || filterMenu.querySelector('.ikr-filter-item');
    if (firstItem) {
      requestAnimationFrame(function () {
        try { firstItem.focus({ preventScroll: true }); } catch (_) {
          try { firstItem.focus(); } catch (_) {}
        }
      });
    }
  }

  filterOpts.forEach(function(opt) {
    var isPhotos = opt[2];
    var isActive = isPhotos ? currentHasImages : (!currentHasImages && (currentOrderBy || 'newest') === opt[0]);
    var item = document.createElement('button');
    item.type = 'button';
    item.className = 'ikr-filter-item' + (isActive ? ' ikr-filter-item-active' : '');
    item.setAttribute('role', 'menuitem');
    item.textContent = opt[1];
    item.onclick = function() {
      closeFilter({ restoreFocus: true });
      onSortChange(opt[0], isPhotos);
    };
    filterMenu.appendChild(item);
  });

  filterBtn.onclick = function() {
    if (filterMenu.classList.contains('ikr-open')) closeFilter({ restoreFocus: true });
    else openFilter();
  };

  // Klavye: menü açıkken Escape kapatır ve odağı tetikleyiciye döndürür.
  filterWrap.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && filterMenu.classList.contains('ikr-open')) {
      e.stopPropagation();
      closeFilter({ restoreFocus: true });
    }
  });

  // Tab ile odak filterWrap dışına çıkarsa menüyü kapat (yeniden tetikleyiciye dönüş yapmadan).
  filterWrap.addEventListener('focusout', function (e) {
    if (!filterMenu.classList.contains('ikr-open')) return;
    var nextFocus = e.relatedTarget;
    if (nextFocus && filterWrap.contains(nextFocus)) return;
    closeFilter();
  });

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
