import { settingText } from '../../core/helpers.js';

var DEFAULT_RECOMMENDATION_LABEL = 'bu ürünü tavsiye ediyor';

export function getRecommendationPercent(ratingCounts, allCount) {
  var recommendCount = (ratingCounts[3] || 0) + (ratingCounts[4] || 0);
  return allCount > 0 ? Math.round((recommendCount / allCount) * 100) : 0;
}

export function buildRecommendationBlock(settings, recommendPct) {
  var rec = document.createElement('div');
  rec.className = 'renuvex-pr-summary-block renuvex-pr-summary-recommend';

  var pct = document.createElement('span');
  pct.className = 'renuvex-pr-recommend-pct';
  pct.textContent = '%' + recommendPct;
  rec.appendChild(pct);
  rec.appendChild(document.createTextNode(' ' + settingText(settings && settings.recommendationLabel, DEFAULT_RECOMMENDATION_LABEL)));

  return rec;
}
