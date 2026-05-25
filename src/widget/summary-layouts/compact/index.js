// summary-layouts/compact/index.js
// Premium compact layout — header (yıldız + sayı + chevron) her zaman görünür,
// trigger'a tıklayınca POPOVER (overlay) olarak panel açılır — sayfayı itmez.
// Yorum Yap + filtre butonu header'da kalır.

import { buildBarChart } from '../shared/bar-chart.js';
import { buildActionsBlock } from '../shared/actions-block.js';
import { openWriteForm } from '../shared/write-action.js';
import { registerPopover, notifyOpening } from '../shared/popover-registry.js';
import { partialStarsHTML } from '../../core/helpers.js';
import { starUseSvg, iconUseSvg } from '../../icons/star-sprite.js';
import { currentSettings } from '../../core/state.js';
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

export function render(opts) {
  var widget = opts.widget;
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
    '<span class="renuvex-pr-compact-trigger-text">' + allCount.toLocaleString('tr-TR') + ' Yorum</span>' +
    '<span class="renuvex-pr-compact-chevron">' +
      iconUseSvg('<svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M7.11 5.16L2.16 0.21L0.75 1.62L7.11 7.98L13.48 1.62L12.06 0.21L7.11 5.16Z" fill="currentColor"/></svg>') +
    '</span>';
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
    onFilterChange: onFilterChange,
  }));

  panel.appendChild(panelInner);
  // Mobile (<600): panel summary'nin direkt çocuğu → flow'da accordion full-width.
  // Desktop: panel triggerWrap'a anchor → popover overlay.
  // matchMedia.change event'i ile resize/orientation/devtools değişimine adapte olur.
  var mql = typeof window !== 'undefined' && window.matchMedia
    ? window.matchMedia('(max-width:600px)')
    : null;
  function placePanel(isMobile) {
    var targetParent = isMobile ? summary : triggerWrap;
    if (panel.parentNode === targetParent) return;
    // Eşik geçişinde state karışmasın — açıksa kapat (CSS değişiyor)
    if (panel.classList.contains('renuvex-pr-open')) {
      panel.classList.remove('renuvex-pr-open');
      panel.setAttribute('aria-hidden', 'true');
      trigger.setAttribute('aria-expanded', 'false');
    }
    targetParent.appendChild(panel);
  }
  placePanel(mql ? mql.matches : false);
  if (mql) {
    var onMqlChange = function(e) { placePanel(e.matches); };
    if (mql.addEventListener) mql.addEventListener('change', onMqlChange);
    else if (mql.addListener) mql.addListener(onMqlChange); // Safari <14 fallback
  }

  // Mobile-only write satırı — header'daki butonun ikinci kopyası, CSS ile sadece mobile'da gözükür
  if (writeBtn) {
    var writeBtnMobile = document.createElement('button');
    writeBtnMobile.className = 'renuvex-pr-write-btn';
    writeBtnMobile.textContent = (currentSettings && currentSettings.writeButtonText) || 'Yorum Yap';
    writeBtnMobile.onclick = openWriteForm;
    var writeRow = document.createElement('div');
    writeRow.className = 'renuvex-pr-compact-write-row';
    writeRow.appendChild(writeBtnMobile);
    summary.appendChild(writeRow);
  }

  // ─── Toggle davranışı ───────────────────────────────────────
  function closePanel() {
    panel.classList.remove('renuvex-pr-open');
    panel.setAttribute('aria-hidden', 'true');
    trigger.setAttribute('aria-expanded', 'false');
  }
  function openPanel() {
    // Desktop popover'da: diğer açık popover'ları kapat (one-at-a-time).
    // Mobile accordion'da kayıt yapılmadığı için no-op gibi davranır.
    notifyOpening(panelRegistration);
    panel.classList.add('renuvex-pr-open');
    panel.setAttribute('aria-hidden', 'false');
    trigger.setAttribute('aria-expanded', 'true');
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
    if (panelRegistration) { panelRegistration(); panelRegistration = null; }
    if (!isMobile) {
      panelRegistration = registerPopover({
        trigger: triggerWrap,
        element: panel,
        close: closePanel,
      });
    }
  }
  syncRegistration(mql ? mql.matches : false);
  if (mql) {
    var onSyncChange = function(e) { syncRegistration(e.matches); };
    if (mql.addEventListener) mql.addEventListener('change', onSyncChange);
    else if (mql.addListener) mql.addListener(onSyncChange);
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
