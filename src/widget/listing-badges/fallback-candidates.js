// listing-badges/fallback-candidates.js - cheap DOM probe for legacy listing fallback.
//
// This module must stay lightweight: it is imported by the always-loaded
// runtime, before the listing-badges chunk is requested. Keep it heuristic-only
// and avoid importing listing badge implementation modules here.

var SYSTEM_SLUGS = /^(account|cart|checkout|login|register|search|pages)$/;

function getPathnameFromHref(href) {
  try {
    var url = new URL(href, window.location.href);
    if (url.origin !== window.location.origin) return '';
    return url.pathname;
  } catch (_) {
    return '';
  }
}

function isLikelyProductPath(pathname) {
  if (!pathname || pathname === '/') return false;
  var parts = pathname.split('/').filter(Boolean);
  if (parts.length !== 1) return false;
  var slug = parts[0].toLowerCase();
  if (SYSTEM_SLUGS.test(slug)) return false;
  return slug.length > 2;
}

function hasNearbyImage(anchor) {
  var el = anchor;
  var depth = 0;
  while (el && depth < 5) {
    if (typeof el.querySelector === 'function' && el.querySelector('img,picture')) return true;
    el = el.parentElement;
    depth++;
  }
  return false;
}

function isIgnoredListingScope(anchor) {
  var href = anchor && anchor.getAttribute ? anchor.getAttribute('href') || '' : '';
  if (href.charAt(0) === '#' || href.charAt(0) === '?') return true;
  if (anchor && anchor.closest && anchor.closest('[data-renuvex-slot],[data-renuvex-listing-badge],#renuvex-pr-reviews-widget,#renuvex-pr-rating-badge')) return true;

  var el = anchor;
  while (el && el !== document.body) {
    var tag = el.tagName ? el.tagName.toLowerCase() : '';
    if (tag === 'header' || tag === 'nav' || tag === 'footer') return true;
    var label = String(el.getAttribute && el.getAttribute('aria-label') || '').toLowerCase();
    var className = String(el.className || '').toLowerCase();
    if (
      label.indexOf('breadcrumb') !== -1 ||
      className.indexOf('breadcrumb') !== -1 ||
      className.indexOf('account') !== -1 ||
      className.indexOf('cart') !== -1 ||
      className.indexOf('basket') !== -1 ||
      className.indexOf('menu') !== -1
    ) {
      return true;
    }
    el = el.parentElement;
  }
  return false;
}

export function hasListingFallbackCandidates(root) {
  var scope = root || document.querySelector('main') || document.body;
  if (!scope) return false;
  var anchors = scope.querySelectorAll('a[href]');
  var seen = {};
  var count = 0;
  for (var i = 0; i < anchors.length; i++) {
    var a = anchors[i];
    if (isIgnoredListingScope(a)) continue;
    var pathname = getPathnameFromHref(a.href);
    if (!isLikelyProductPath(pathname)) continue;
    if (!hasNearbyImage(a)) continue;
    if (seen[pathname]) continue;
    seen[pathname] = true;
    count++;
    if (count >= 2) return true;
  }
  return false;
}
