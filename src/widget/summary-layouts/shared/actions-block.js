// summary-layouts/shared/actions-block.js
// Actions row — Yorum Yap butonu + filtre dropdown.
// Tüm summary layout'ları bu shared parçayı kullanır.

import { registerPopover, notifyOpening } from './popover-registry.js';
import { getFilterIconSvg } from '../../icons/index.js';
import { iconUseSvg } from '../../icons/star-sprite.js';
import { currentSettings } from '../../core/state.js';
import { wasLastInputKeyboard } from '../../shared/input-modality.js';

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
  filterBtn.innerHTML = iconUseSvg(getFilterIconSvg(filterIconKey));

  var filterMenu = document.createElement('div');
  filterMenu.className = 'ikr-filter-menu';
  filterMenu.setAttribute('role', 'menu');

  var filterOpts = [
    ['newest', 'En Yeni', false],
    ['highest', 'En Yüksek Puan', false],
    ['lowest', 'En Düşük Puan', false],
    ['photos', 'Fotoğraflı', true],
  ];
  var isActivatingOption = false;
  // Pointer-vs-keyboard origin: restore focus to the trigger only when the
  // close was driven by keyboard. Pointer/touch closes leave focus alone so
  // the mobile button does not retain a stuck pressed/focus appearance.
  function closeFilter(opts) {
    var wasOpen = filterMenu.classList.contains('ikr-open');
    filterMenu.classList.remove('ikr-open');
    filterBtn.classList.remove('ikr-filter-btn-active');
    filterBtn.setAttribute('aria-expanded', 'false');
    var shouldRestore = opts && (opts.restoreFocus === true || (opts.restoreFocus === 'auto' && wasLastInputKeyboard()));
    if (wasOpen && shouldRestore) {
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
    var activated = false;
    function activateOption(e, restoreFocus) {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      if (activated) return;
      activated = true;
      isActivatingOption = true;
      closeFilter({ restoreFocus: restoreFocus });
      onSortChange(opt[0], isPhotos);
      setTimeout(function () {
        activated = false;
        isActivatingOption = false;
      }, 0);
    }
    item.addEventListener('pointerdown', function (e) {
      if (e.button !== undefined && e.button !== 0) return;
      activateOption(e, false);
    });
    if (typeof window !== 'undefined' && !window.PointerEvent) {
      item.addEventListener('touchstart', function (e) {
        activateOption(e, false);
      }, { passive: false });
    }
    item.addEventListener('mousedown', function (e) {
      if (e.button !== undefined && e.button !== 0) return;
      activateOption(e, false);
    });
    item.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') activateOption(e, true);
    });
    item.onclick = function(e) {
      activateOption(e, false);
    };
    filterMenu.appendChild(item);
  });

  filterBtn.onclick = function() {
    if (filterMenu.classList.contains('ikr-open')) closeFilter({ restoreFocus: 'auto' });
    else openFilter();
  };

  // Klavye: menü açıkken Escape kapatır ve odağı tetikleyiciye döndürür.
  // Escape doğası gereği klavye olayıdır — restoreFocus burada koşulsuz.
  filterWrap.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && filterMenu.classList.contains('ikr-open')) {
      e.stopPropagation();
      closeFilter({ restoreFocus: true });
    }
  });

  // Tab ile odak filterWrap dışına çıkarsa menüyü kapat (yeniden tetikleyiciye dönüş yapmadan).
  filterWrap.addEventListener('focusout', function (e) {
    if (!filterMenu.classList.contains('ikr-open')) return;
    if (isActivatingOption) return;
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
