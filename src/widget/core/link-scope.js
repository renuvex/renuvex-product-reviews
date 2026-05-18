// core/link-scope.js - shared scoped link discovery for storefront DOM fallbacks.

export var MAIN_CONTENT_SELECTOR = 'main,[role="main"]';
export var STRUCTURAL_SKIP_SELECTOR = 'header,nav,footer,[role="navigation"],[role="banner"],[role="contentinfo"]';

export function isStructurallySkipped(el) {
  return !!(el && el.closest && el.closest(STRUCTURAL_SKIP_SELECTOR));
}

function pushLink(links, seen, link) {
  if (!link || !link.href || seen.indexOf(link) !== -1) return;
  if (isStructurallySkipped(link)) return;
  seen.push(link);
  links.push(link);
}

function pushLinksFromScope(links, seen, scope) {
  if (!scope || isStructurallySkipped(scope)) return;
  if (scope.tagName === 'A' && scope.href) {
    pushLink(links, seen, scope);
    return;
  }
  scope.querySelectorAll('a[href]').forEach(function (a) {
    pushLink(links, seen, a);
  });
}

export function getMainContentScopes() {
  var scopes = Array.from(document.querySelectorAll(MAIN_CONTENT_SELECTOR)).filter(function (scope) {
    return !isStructurallySkipped(scope);
  });
  return scopes.length ? scopes : (document.body ? [document.body] : []);
}

export function collectLinksFromScopes(scopes) {
  var links = [];
  var seen = [];

  (scopes || []).forEach(function (scope) {
    pushLinksFromScope(links, seen, scope);
  });

  return links;
}
