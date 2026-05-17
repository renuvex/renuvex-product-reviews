// listing-badges/index.js - listing badge orchestration and state.

import { ls } from '../core/state.js';
import { fetchSettings } from '../core/settings.js';
import { collectSlugs } from './collect.js';
import { fetchRatings } from './ratings.js';
import { injectBadges } from './inject.js';

export async function renderListingBadges() {
  if (ls.inProgress) { ls.queued = true; return; }
  if (ls.rendered) return;
  ls.rendered = true;
  ls.inProgress = true;
  try {
    var doCleanup = ls.navCleanup;
    if (doCleanup) ls.navCleanup = false;

    var slugNameMap = collectSlugs();
    if (!Object.keys(slugNameMap).length) { ls.rendered = false; return; }
    var results = await Promise.all([fetchSettings(), fetchRatings(Object.keys(slugNameMap))]);
    var response = results[0];
    if (!response) { ls.rendered = false; return; }
    var ratings = results[1];

    // Badge color: settings badge.color -> default.
    var widgets = (response && response.widgets) || {};
    var badgeColor = (widgets.badge && widgets.badge.color) || '#f59e0b';

    // Do not inject listing badges when the badge widget is disabled.
    if (widgets.badge && widgets.badge.enabled === false) { ls.rendered = false; return; }

    document.documentElement.style.setProperty('--ikr-badge-color', badgeColor);

    // Atomic swap after fetch: remove old badges, then inject the new set.
    if (doCleanup) {
      document.querySelectorAll('[data-ikr-listing-badge]').forEach(function(el) { el.remove(); });
      document.querySelectorAll('[data-ikr-badge]').forEach(function(el) { el.removeAttribute('data-ikr-badge'); });
    }
    injectBadges(slugNameMap, ratings);
  } finally {
    ls.inProgress = false;
    if (ls.queued) {
      ls.queued = false;
      ls.rendered = false;
      renderListingBadges();
    }
  }
}
