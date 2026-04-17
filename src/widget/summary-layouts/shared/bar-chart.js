// summary-layouts/shared/bar-chart.js
// Bar chart component — tüm summary layout'ları bu shared parçayı kullanır.
// 5★→1★ satır, her satır: yıldız label + track + count.
// Satıra tıklayınca rating filtresi toggle olur.

export function buildBarChart(opts) {
  var ratingCounts = opts.ratingCounts;
  var allCount = opts.allCount;
  var iconPair = opts.iconPair;
  var currentFilter = opts.currentRatingFilter;
  var onFilterChange = opts.onFilterChange;

  var bars = document.createElement('div');
  bars.className = 'ikr-summary-block ikr-summary-bars';

  for (var si = 5; si >= 1; si--) {
    var cnt = ratingCounts[si - 1] || 0;
    var pct = allCount > 0 ? Math.round((cnt / allCount) * 100) : 0;
    var isActive = currentFilter === si;
    var row = document.createElement('div');
    row.className = 'ikr-bar-row' + (isActive ? ' ikr-bar-active' : '');
    if (currentFilter && !isActive) row.style.opacity = '0.35';

    var starsHtml = '';
    for (var s = 1; s <= 5; s++) {
      var filled = s <= si;
      starsHtml +=
        '<span class="ikr-bar-star ikr-icon ' +
        (filled ? 'ikr-bar-star-filled' : 'ikr-bar-star-empty') +
        '">' +
        (filled ? iconPair.filled : iconPair.empty) +
        '</span>';
    }

    row.innerHTML =
      '<span class="ikr-bar-label">' + starsHtml + '</span>' +
      '<div class="ikr-bar-track"><div class="ikr-bar-fill" style="width:' + pct + '%;"></div></div>' +
      '<span class="ikr-bar-count">(' + cnt.toLocaleString('tr-TR') + ')</span>';

    (function(starVal) {
      row.onclick = function() { onFilterChange(starVal); };
    })(si);

    bars.appendChild(row);
  }

  return bars;
}
