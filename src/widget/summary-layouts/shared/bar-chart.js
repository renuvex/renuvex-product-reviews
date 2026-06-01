// summary-layouts/shared/bar-chart.js
// Bar chart component — tüm summary layout'ları bu shared parçayı kullanır.
// 5★→1★ satır, her satır: yıldız label + track + count.
// Satıra tıklayınca veya klavyeden Enter/Space ile rating filtresi toggle olur.

import { ensureStarSprite, starUseSvg } from '../../icons/star-sprite.js';

export function buildBarChart(opts) {
  var ratingCounts = opts.ratingCounts;
  var allCount = opts.allCount;
  var iconPair = opts.iconPair;
  var currentFilter = opts.currentRatingFilter;
  var onFilterChange = opts.onFilterChange;
  // Stars reference the shared SVG sprite (ADR_0019); ensure it exists before
  // the <use> markup below is inserted.
  ensureStarSprite(iconPair);

  var bars = document.createElement('div');
  bars.className = 'renuvex-pr-summary-block renuvex-pr-summary-bars';

  for (var si = 5; si >= 1; si--) {
    var cnt = ratingCounts[si - 1] || 0;
    var pct = allCount > 0 ? Math.round((cnt / allCount) * 100) : 0;
    var isActive = currentFilter === si;
    var row = document.createElement('div');
    row.className = 'renuvex-pr-bar-row' + (isActive ? ' renuvex-pr-bar-active' : '');
    row.setAttribute('role', 'button');
    row.setAttribute('tabindex', '0');
    row.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    row.setAttribute(
      'aria-label',
      si + ' yıldız, ' + cnt.toLocaleString('tr-TR') + ' yorum, ' + (isActive ? 'filtreyi kaldır' : 'filtrele')
    );
    if (currentFilter && !isActive) row.style.opacity = '0.35';

    var starsHtml = '';
    for (var s = 1; s <= 5; s++) {
      var filled = s <= si;
      starsHtml +=
        '<span class="renuvex-pr-bar-star renuvex-pr-icon ' +
        (filled ? 'renuvex-pr-bar-star-filled' : 'renuvex-pr-bar-star-empty') +
        '">' +
        starUseSvg(filled ? 'full' : 'outline') +
        '</span>';
    }

    row.innerHTML =
      '<span class="renuvex-pr-bar-label">' + starsHtml + '</span>' +
      '<div class="renuvex-pr-bar-track"><div class="renuvex-pr-bar-fill" style="width:' + pct + '%;"></div></div>' +
      '<span class="renuvex-pr-bar-count">(' + cnt.toLocaleString('tr-TR') + ')</span>';

    (function(starVal) {
      function activate() {
        onFilterChange(starVal);
      }
      row.onclick = activate;
      row.onkeydown = function(e) {
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'Space' || e.key === 'Spacebar') {
          e.preventDefault();
          activate();
        }
      };
    })(si);

    bars.appendChild(row);
  }

  return bars;
}
