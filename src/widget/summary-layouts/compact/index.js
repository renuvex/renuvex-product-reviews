// summary-layouts/compact/index.js
// Premium compact layout — header (yıldız + sayı + chevron) her zaman görünür,
// trigger'a tıklayınca POPOVER (overlay) olarak panel açılır — sayfayı itmez.
// Yorum Yap + filtre butonu header'da kalır.

import { buildBarChart } from '../shared/bar-chart.js';
import { buildActionsBlock } from '../shared/actions-block.js';
import { openWriteForm } from '../shared/write-action.js';
import { registerPopover } from '../shared/popover-registry.js';
import { partialStarsHTML } from '../../core/helpers.js';
import { starUseSvg, iconUseSvg } from '../../icons/star-sprite.js';
import { UI_CARET_DOWN } from '../../icons/index.js';
import { COMPACT_CSS } from './styles.js';

export var meta = {
  id: 'compact',
  name: 'Kompakt (Açılır)',
  // Trigger yıldızı global size ayarına bağlı, bar-label-size'den bağımsız.
  sizeOverrides: {
    small:  { '--renuvex-pr-compact-star-size': '20px' },
    medium: { '--renuvex-pr-compact-star-size': '24px' },
    large:  { '--renuvex-pr-compact-star-size': '28px' },
  },
};

export var css = COMPACT_CSS;

var MOBILE_PANEL_STATE_FALLBACK_KEY = '__unknown_product__';
var mobilePanelOpenByProduct = Object.create(null);

function getMobilePanelStateKey(productId) {
  return productId ? String(productId) : MOBILE_PANEL_STATE_FALLBACK_KEY;
}

// Compact renders fresh on every review-section re-render (rating filter, sort,
// preview update). Each render builds a new MediaQueryList; without teardown its
// 'change' listener — and the detached panel/trigger DOM the closure retains —
// would accumulate for the page's lifetime. There is exactly ONE compact summary
// live at a time (render.js replaces the section content), so a single
// module-scoped handle is enough: detach the previous render's listener before
// attaching the current one.
var activeMediaQuery = null;
var activeMediaListener = null;

function detachActiveMediaListener() {
  if (!activeMediaQuery || !activeMediaListener) return;
  if (activeMediaQuery.removeEventListener) {
    activeMediaQuery.removeEventListener('change', activeMediaListener);
  } else if (activeMediaQuery.removeListener) {
    activeMediaQuery.removeListener(activeMediaListener); // Safari <14 fallback
  }
  activeMediaQuery = null;
  activeMediaListener = null;
}

export function render(opts) {
  var widget = opts.widget;
  var productId = opts.productId;
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
  var mobilePanelStateKey = getMobilePanelStateKey(productId);

  var summary = document.createElement('div');
  summary.className = 'renuvex-pr-summary renuvex-pr-summary-compact';

  // ─── Header (her zaman görünür) ─────────────────────────────
  var header = document.createElement('div');
  header.className = 'renuvex-pr-compact-header';

  // Trigger wrap — popover'ı anchor edebilmek için position:relative parent
  var triggerWrap = document.createElement('div');
  triggerWrap.className = 'renuvex-pr-compact-trigger-wrap';

  // Trigger: yıldız + sayı + chevron — tıklanınca popover toggle
  var trigger = document.createElement('button');
  trigger.className = 'renuvex-pr-compact-trigger';
  trigger.type = 'button';
  trigger.setAttribute('aria-expanded', 'false');

  trigger.innerHTML =
    '<span class="renuvex-pr-compact-trigger-stars">' + partialStarsHTML(avgRatingVal, iconPair) + '</span>' +
    '<span class="renuvex-pr-compact-trigger-text">' + allCount.toLocaleString('tr-TR') + ' ' + (settings.countLabel || 'Yorum') + '</span>' +
    '<span class="renuvex-pr-compact-chevron">' +
      iconUseSvg(UI_CARET_DOWN) +
    '</span>';
  // Sayaç + chevron'u tek gruba al (DOM ile, innerHTML'e dokunmadan): trigger sarınca
  // ikisi BİRLİKTE yıldızların altına iner — chevron tek başına alt satıra düşmez.
  var countTextEl = trigger.querySelector('.renuvex-pr-compact-trigger-text');
  var countChevronEl = trigger.querySelector('.renuvex-pr-compact-chevron');
  if (countTextEl && countChevronEl) {
    var countGroupEl = document.createElement('span');
    countGroupEl.className = 'renuvex-pr-compact-trigger-count';
    trigger.insertBefore(countGroupEl, countTextEl);
    countGroupEl.appendChild(countTextEl);
    countGroupEl.appendChild(countChevronEl);
  }
  triggerWrap.appendChild(trigger);
  header.appendChild(triggerWrap);

  // Actions (Yorum Yap + filtre) — buildActionsBlock döndürür: [write-btn, filter-wrap]
  var actions = buildActionsBlock({
    widget: widget,
    currentOrderBy: currentOrderBy,
    currentHasImages: currentHasImages,
    onWriteClick: openWriteForm,
    onSortChange: onSortChange,
  });

  // Header sağında actions slot — desktop'ta hem write hem filter, mobile'da sadece filter
  var filterWrap = actions.querySelector('.renuvex-pr-filter-wrap');
  var writeBtn = actions.querySelector('.renuvex-pr-write-btn');

  var actionsSlot = document.createElement('div');
  actionsSlot.className = 'renuvex-pr-compact-actions-slot';
  if (writeBtn) actionsSlot.appendChild(writeBtn);
  if (filterWrap) actionsSlot.appendChild(filterWrap);
  header.appendChild(actionsSlot);

  summary.appendChild(header);

  // ─── Popover Panel (trigger'a anchor, overlay) ──────────────
  var panel = document.createElement('div');
  panel.className = 'renuvex-pr-compact-panel';
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-label', 'Puan dağılımı');
  panel.setAttribute('aria-hidden', 'true');

  var panelInner = document.createElement('div');
  panelInner.className = 'renuvex-pr-compact-panel-inner';

  // Büyük ortalama puan — tek dolu yıldız + sayı (classic'e benzer pattern,
  // panel zaten avg'ı vurgulu gösteriyor; partial stars trigger'da var)
  var avg = document.createElement('div');
  avg.className = 'renuvex-pr-compact-avg';
  avg.innerHTML =
    '<span class="renuvex-pr-icon">' + starUseSvg('full') + '</span>' +
    '<span>' + avgRatingVal + '</span>';
  panelInner.appendChild(avg);

  // Bar chart
  panelInner.appendChild(buildBarChart({
    ratingCounts: ratingCounts,
    allCount: allCount,
    iconPair: iconPair,
    currentRatingFilter: currentRatingFilter,
    onFilterChange: function(starVal) {
      // Mobile compact is a flow accordion, not a dismissible popover. A rating
      // filter re-renders the whole review section, so keep the accordion open
      // until the user closes it with the compact trigger.
      if (isMobilePanelMode() && panel.classList.contains('renuvex-pr-open')) {
        mobilePanelOpenByProduct[mobilePanelStateKey] = true;
      }
      onFilterChange(starVal);
    },
  }));

  panel.appendChild(panelInner);
  // Mobile (<600): panel summary'nin direkt çocuğu → flow'da accordion full-width.
  // Desktop: panel triggerWrap'a anchor → popover overlay.
  // matchMedia.change event'i ile resize/orientation/devtools değişimine adapte olur.
  var mql = typeof window !== 'undefined' && window.matchMedia
    ? window.matchMedia('(max-width:600px)')
    : null;
  function isMobilePanelMode() {
    return !!(mql && mql.matches);
  }
  function setPanelOpen(isOpen) {
    if (isOpen) panel.classList.add('renuvex-pr-open');
    else panel.classList.remove('renuvex-pr-open');
    panel.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
    trigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  }
  function placePanel(isMobile) {
    var targetParent = isMobile ? summary : triggerWrap;
    if (panel.parentNode === targetParent) return;
    var hadParent = !!panel.parentNode;
    // Eşik geçişinde state karışmasın — açıksa kapat (CSS değişiyor)
    if (panel.classList.contains('renuvex-pr-open')) {
      setPanelOpen(false);
    }
    if (hadParent) mobilePanelOpenByProduct[mobilePanelStateKey] = false;
    targetParent.appendChild(panel);
  }
  placePanel(mql ? mql.matches : false);

  // Mobile-only write + filter satırı — hero/minimal mobil deseni: filtre Yorum Yap'ın
  // yanında alta iner (header actions-slot mobilde gizlenir; styles.js). Desktop original
  // kalır. buildActionsBlock ayrı bir instance döndürür (header'dakini etkilemez).
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
  writeRow.className = 'renuvex-pr-compact-write-row';
  if (mWrite) writeRow.appendChild(mWrite);
  if (mFilter) writeRow.appendChild(mFilter);
  summary.appendChild(writeRow);

  // ─── Toggle davranışı ───────────────────────────────────────
  // close() popover-registry kontratı: yalnızca GERÇEKTEN açıkken kapatıldıysa
  // true döner (dismiss-swallow buna bağlı). Zaten kapalıysa false.
  function closePanel() {
    var wasOpen = panel.classList.contains('renuvex-pr-open');
    setPanelOpen(false);
    if (isMobilePanelMode()) mobilePanelOpenByProduct[mobilePanelStateKey] = false;
    return wasOpen;
  }
  function openPanel() {
    // Desktop popover'da: diğer açık popover'ları kapat (one-at-a-time).
    // Mobile accordion'da kayıt yapılmadığı için panelRegistration null → no-op.
    if (panelRegistration) panelRegistration.notifyOpening();
    setPanelOpen(true);
    if (isMobilePanelMode()) mobilePanelOpenByProduct[mobilePanelStateKey] = true;
  }
  trigger.onclick = function() {
    if (panel.classList.contains('renuvex-pr-open')) closePanel();
    else openPanel();
  };

  // Desktop popover ise registry'e kaydol — light dismiss + ESC + one-at-a-time.
  // Mobile accordion ise registry'e KAYDOLMAZ — flow içeriği gibi davranır,
  // sadece chevron ile manuel toggle (Endüstri standardı).
  var panelRegistration = null;
  function syncRegistration(isMobile) {
    if (panelRegistration) { panelRegistration.unregister(); panelRegistration = null; }
    if (!isMobile) {
      panelRegistration = registerPopover({
        trigger: triggerWrap,
        element: panel,
        close: closePanel,
      });
    }
  }
  syncRegistration(mql ? mql.matches : false);
  // One 'change' listener drives both the placement swap and the registry sync,
  // in the original order (placePanel then syncRegistration). Detach the previous
  // render's listener first so listeners + detached panel DOM never pile up across
  // re-renders. placePanel/syncRegistration are defined above, so the combined
  // handler must be attached here (not at the initial placePanel call).
  detachActiveMediaListener();
  if (mql) {
    var onMediaChange = function(e) {
      placePanel(e.matches);
      syncRegistration(e.matches);
    };
    if (mql.addEventListener) mql.addEventListener('change', onMediaChange);
    else if (mql.addListener) mql.addListener(onMediaChange); // Safari <14 fallback
    activeMediaQuery = mql;
    activeMediaListener = onMediaChange;
  }

  // Mobile accordion stays open across review-section re-renders until the
  // user closes it with the compact trigger. Desktop stays a popover.
  if (isMobilePanelMode() && mobilePanelOpenByProduct[mobilePanelStateKey]) {
    setPanelOpen(true);
  }

  // showRecommendation hâlâ destekli — panel altında küçük metin
  if ((settings.showRecommendation !== false)) {
    var recommendCount = (ratingCounts[3] || 0) + (ratingCounts[4] || 0);
    var recommendPct = allCount > 0 ? Math.round((recommendCount / allCount) * 100) : 0;
    if (recommendPct > 0) {
      var rec = document.createElement('div');
      rec.className = 'renuvex-pr-summary-block renuvex-pr-summary-recommend';
      rec.style.marginTop = '8px';
      rec.innerHTML = '<span class="renuvex-pr-recommend-pct">%' + recommendPct + '</span> bu ürünü tavsiye ediyor';
      panelInner.appendChild(rec);
    }
  }

  return summary;
}
