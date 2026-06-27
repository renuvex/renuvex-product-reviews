// summary-layouts/shared/actions-block.js
// Shared actions row: write button + filter dropdown.

import { registerPopover, swallowNextDismissGesture } from './popover-registry.js';
import { getFilterIconSvg } from '../../icons/index.js';
import { iconUseSvg } from '../../icons/star-sprite.js';
import { currentSettings } from '../../core/state.js';
import { settingText } from '../../core/helpers.js';
import { wasLastInputKeyboard } from '../../shared/input-modality.js';

export function buildActionsBlock(opts) {
  var widget = opts.widget;
  var currentOrderBy = opts.currentOrderBy;
  var currentMediaFilter = opts.currentMediaFilter || 'none';
  var onWriteClick = opts.onWriteClick;
  var onSortChange = opts.onSortChange;

  var actionsBlock = document.createElement('div');
  actionsBlock.className = 'renuvex-pr-summary-block renuvex-pr-summary-actions';

  var writeBtn = document.createElement('button');
  writeBtn.className = 'renuvex-pr-write-btn';
  writeBtn.textContent = settingText(currentSettings && currentSettings.writeButtonText, 'Yorum Yap');
  writeBtn.onclick = onWriteClick;
  actionsBlock.appendChild(writeBtn);

  var filterWrap = document.createElement('div');
  filterWrap.className = 'renuvex-pr-filter-wrap';

  var filterBtn = document.createElement('button');
  filterBtn.type = 'button';
  filterBtn.className = 'renuvex-pr-filter-btn';
  filterBtn.setAttribute('aria-label', 'Filtrele');
  filterBtn.setAttribute('aria-haspopup', 'menu');
  filterBtn.setAttribute('aria-expanded', 'false');
  var filterIconKey = (currentSettings && currentSettings.filterIcon) || 'lines';
  filterBtn.innerHTML = iconUseSvg(getFilterIconSvg(filterIconKey));

  var filterMenu = document.createElement('div');
  filterMenu.className = 'renuvex-pr-filter-menu';
  filterMenu.setAttribute('role', 'menu');

  var mediaFilterMode = currentSettings && currentSettings.videoReviewsEnabled === true ? 'media' : 'images';
  var mediaFilterLabel = mediaFilterMode === 'media' ? 'Fotoğraf ve Video' : 'Fotoğraflı';
  var filterOpts = [
    { orderBy: 'newest', label: 'En Yeni', mediaFilter: 'none' },
    { orderBy: 'highest', label: 'En Yüksek Puan', mediaFilter: 'none' },
    { orderBy: 'lowest', label: 'En Düşük Puan', mediaFilter: 'none' },
    { orderBy: 'newest', label: mediaFilterLabel, mediaFilter: mediaFilterMode },
  ];
  var isActivatingOption = false;

  function getGestureShieldScope() {
    return (widget && widget.parentNode) || widget || null;
  }

  function armDismissAfterPointerActivation(e, restoreFocus) {
    if (restoreFocus === true || !e) return;
    if (e.type === 'touchstart') {
      swallowNextDismissGesture(getGestureShieldScope());
      return;
    }
    if (e.type === 'pointerdown') {
      var pointerType = e.pointerType || '';
      if (pointerType && pointerType !== 'mouse') {
        swallowNextDismissGesture(getGestureShieldScope());
      }
    }
  }

  function closeFilter(opts) {
    var wasOpen = filterMenu.classList.contains('renuvex-pr-open');
    filterMenu.classList.remove('renuvex-pr-open');
    filterBtn.classList.remove('renuvex-pr-filter-btn-active');
    filterBtn.setAttribute('aria-expanded', 'false');
    var shouldRestore = opts && (opts.restoreFocus === true || (opts.restoreFocus === 'auto' && wasLastInputKeyboard()));
    if (wasOpen && shouldRestore) {
      try { filterBtn.focus({ preventScroll: true }); } catch (_) {
        try { filterBtn.focus(); } catch (_) {}
      }
    }
    return wasOpen;
  }

  function openFilter() {
    filterRegistration.notifyOpening();
    filterMenu.classList.add('renuvex-pr-open');
    filterBtn.classList.add('renuvex-pr-filter-btn-active');
    filterBtn.setAttribute('aria-expanded', 'true');
    var firstItem = filterMenu.querySelector('.renuvex-pr-filter-item-active') || filterMenu.querySelector('.renuvex-pr-filter-item');
    if (firstItem) {
      requestAnimationFrame(function () {
        try { firstItem.focus({ preventScroll: true }); } catch (_) {
          try { firstItem.focus(); } catch (_) {}
        }
      });
    }
  }

  filterOpts.forEach(function(opt) {
    var isMediaFilter = opt.mediaFilter !== 'none';
    var isActive = isMediaFilter
      ? currentMediaFilter === opt.mediaFilter
      : (currentMediaFilter === 'none' && (currentOrderBy || 'newest') === opt.orderBy);
    var item = document.createElement('button');
    item.type = 'button';
    item.className = 'renuvex-pr-filter-item' + (isActive ? ' renuvex-pr-filter-item-active' : '');
    item.setAttribute('role', 'menuitem');
    item.textContent = opt.label;
    var activated = false;

    function activateOption(e, restoreFocus) {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      if (activated) return;
      activated = true;
      isActivatingOption = true;
      armDismissAfterPointerActivation(e, restoreFocus);
      closeFilter({ restoreFocus: restoreFocus });
      onSortChange(opt.orderBy, opt.mediaFilter);
      setTimeout(function () {
        activated = false;
        isActivatingOption = false;
      }, 0);
    }

    item.addEventListener('pointerdown', function (e) {
      if (e.button !== undefined && e.button !== 0) return;
      if (e.pointerType === 'mouse') return;
      activateOption(e, false);
    });
    if (typeof window !== 'undefined' && !window.PointerEvent) {
      item.addEventListener('touchstart', function (e) {
        activateOption(e, false);
      }, { passive: false });
    }
    item.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') activateOption(e, true);
    });
    item.onclick = function(e) {
      activateOption(e, false);
    };
    filterMenu.appendChild(item);
  });

  filterBtn.onclick = function() {
    if (filterMenu.classList.contains('renuvex-pr-open')) closeFilter({ restoreFocus: 'auto' });
    else openFilter();
  };

  filterWrap.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && filterMenu.classList.contains('renuvex-pr-open')) {
      e.stopPropagation();
      closeFilter({ restoreFocus: true });
    }
  });

  filterWrap.addEventListener('focusout', function (e) {
    if (!filterMenu.classList.contains('renuvex-pr-open')) return;
    if (isActivatingOption) return;
    var nextFocus = e.relatedTarget;
    if (nextFocus && filterWrap.contains(nextFocus)) return;
    closeFilter();
  });

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
