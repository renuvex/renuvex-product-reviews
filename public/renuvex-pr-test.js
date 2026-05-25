/**
 * Renuvex Product Reviews badge placement test helper.
 * Paste into the browser console on a listing/category/search page.
 * It does not mutate the page; it reports the target each badge would use.
 */
(function () {
  var TITLE_CLASS_SELECTOR = '[class*="productTitle"],[class*="productName"],[class*="product_title"],[class*="product_name"],[class*="product-title"],[class*="product-name"]';

  function extractSlug(url) {
    try {
      return new URL(url, window.location.origin).pathname.replace(/^\//, '').split('?')[0].split('/')[0];
    } catch (_) {
      return '';
    }
  }

  function findTitleEl(scope, productName) {
    if (scope.matches && scope.matches(TITLE_CLASS_SELECTOR)) return scope;
    var byClass = scope.querySelector(TITLE_CLASS_SELECTOR);
    if (byClass) return byClass;

    if (productName) {
      var allEls = scope.querySelectorAll('*');
      for (var i = 0; i < allEls.length; i++) {
        var el = allEls[i];
        if (el.children.length === 0 && el.textContent.trim() === productName) return el;
      }
    }

    var candidates = scope.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, div');
    for (var j = 0; j < candidates.length; j++) {
      var cel = candidates[j];
      var text = cel.textContent.trim();
      if (!text || text.length < 2 || text.length > 150) continue;
      if (/^[\d\s.,TRY$EURGBP%]+$/.test(text)) continue;
      if (cel.closest('figure') || cel.closest('picture')) continue;
      if (cel.children.length > 1) continue;
      return cel;
    }
    return null;
  }

  var slugMap = {};
  document.querySelectorAll('a[href]').forEach(function (a) {
    var href = a.getAttribute('href');
    if (!href || href.charAt(0) === '#' || href.charAt(0) === '?') return;
    if (a.getAttribute('data-renuvex-pr-badge')) return;
    if (a.closest('header') || a.closest('nav')) return;

    var slug = extractSlug(a.href);
    if (!slug || slug.length < 3) return;
    if (/^(account|pages|blog|search|cart|checkout|siparis|odeme|kategori|category|urun|products?)/.test(slug)) return;

    if (!slugMap[slug]) slugMap[slug] = [];
    slugMap[slug].push(a);
  });

  var slugs = Object.keys(slugMap);
  if (!slugs.length) {
    console.warn('[RENUVEX PR TEST] No product links were found on this page.');
    return;
  }

  console.log('%c[RENUVEX PR TEST] Found ' + slugs.length + ' product slugs', 'color:#7c3aed;font-weight:bold;font-size:14px');
  console.log('Slugs:', slugs);

  var report = [];
  var globalDuplicateWarnings = [];

  slugs.forEach(function (slug) {
    var links = slugMap[slug];
    var injected = [];
    var skipped = [];
    var slugInjected = false;

    links.forEach(function (a, idx) {
      var hasNestedA = !!a.querySelector('a[href]');
      var realText = Array.from(a.childNodes)
        .filter(function (n) { return n.nodeType === 3; })
        .map(function (n) { return n.textContent.trim(); })
        .join('').trim();
      var hasText = realText.length > 0;
      var hasTitleEl = !!findTitleEl(a, null);

      if (a.closest('header') || a.closest('nav')) {
        skipped.push({ idx: idx, reason: 'Header/nav navigation link' });
        return;
      }

      if (slugInjected) {
        skipped.push({ idx: idx, reason: 'Duplicate product link for this slug' });
        return;
      }

      if (!hasText && !hasTitleEl && !hasNestedA) {
        skipped.push({ idx: idx, reason: 'Image-only link without title text' });
        return;
      }

      if (hasNestedA) {
        var nameEl1 = findTitleEl(a, null);
        if (!nameEl1) {
          skipped.push({ idx: idx, reason: 'Wrapper link without a detectable title element' });
          return;
        }
        var rect1 = nameEl1.getBoundingClientRect();
        injected.push({
          idx: idx,
          pattern: 'Wrapper link with nested title',
          targetTag: nameEl1.tagName,
          targetClass: nameEl1.className || '(none)',
          targetText: nameEl1.textContent.trim().substring(0, 50),
          position: 'Immediately after the title element',
          rect: { top: Math.round(rect1.top + window.scrollY), left: Math.round(rect1.left) },
        });
        slugInjected = true;
        return;
      }

      var nameEl = findTitleEl(a, null);
      if (nameEl) {
        var isDirectTitle = nameEl.matches && nameEl.matches(TITLE_CLASS_SELECTOR);
        var rect2 = nameEl.getBoundingClientRect();
        injected.push({
          idx: idx,
          pattern: isDirectTitle ? 'Title link with product-title class' : 'Separate link with detectable title',
          targetTag: nameEl.tagName,
          targetClass: nameEl.className || '(none)',
          targetText: nameEl.textContent.trim().substring(0, 50),
          position: 'Immediately after the title element',
          rect: { top: Math.round(rect2.top + window.scrollY), left: Math.round(rect2.left) },
        });
      } else {
        var rect3 = a.getBoundingClientRect();
        injected.push({
          idx: idx,
          pattern: 'Direct text link without a separate title element',
          targetTag: a.tagName,
          targetClass: a.className || '(none)',
          targetText: a.textContent.trim().substring(0, 50),
          position: 'Before the first child inside the link',
          rect: { top: Math.round(rect3.top + window.scrollY), left: Math.round(rect3.left) },
        });
      }
      slugInjected = true;
    });

    var isDuplicate = injected.length > 1;
    if (isDuplicate) globalDuplicateWarnings.push(slug);
    report.push({ slug: slug, totalLinks: links.length, injected: injected, skipped: skipped, isDuplicate: isDuplicate });
  });

  report.forEach(function (r) {
    var status = r.isDuplicate ? 'DUPLICATE' : r.injected.length === 0 ? 'NO BADGE TARGET' : 'OK';
    console.group('%c[RENUVEX PR TEST] ' + status + ' - ' + r.slug, 'font-weight:bold;color:' + (r.isDuplicate ? '#dc2626' : r.injected.length === 0 ? '#d97706' : '#059669'));
    console.log('Total links:', r.totalLinks, '| Badge targets:', r.injected.length, '| Skipped:', r.skipped.length);

    r.injected.forEach(function (inj) {
      console.log(
        '  -> Target [link ' + inj.idx + '] ' + inj.pattern,
        '\n    Element:', inj.targetTag + (inj.targetClass ? '.' + inj.targetClass.split(' ')[0] : ''),
        '\n    Text:', '"' + inj.targetText + '"',
        '\n    Position:', inj.position,
        '\n    Page position: top=' + inj.rect.top + 'px, left=' + inj.rect.left + 'px'
      );
    });

    r.skipped.forEach(function (sk) {
      console.log('  -> Skip [link ' + sk.idx + ']:', sk.reason);
    });

    if (r.injected.length === 0 && r.skipped.length > 0) {
      console.warn('  No usable badge target was found for this product.');
      console.log('  DOM sample:', r.skipped.map(function (sk) { return slugMap[r.slug][sk.idx].outerHTML.substring(0, 200); }));
    }

    console.groupEnd();
  });

  console.log('');
  console.log('%c[RENUVEX PR TEST] SUMMARY', 'color:#7c3aed;font-weight:bold;font-size:14px');
  console.log('Total products:', report.length);
  console.log('Badge OK:', report.filter(function (r) { return r.injected.length > 0 && !r.isDuplicate; }).length);
  console.log('No badge target:', report.filter(function (r) { return r.injected.length === 0; }).length);
  console.log('Duplicate:', globalDuplicateWarnings.length, globalDuplicateWarnings.length ? '-> ' + globalDuplicateWarnings.join(', ') : '');

  if (globalDuplicateWarnings.length === 0 && report.every(function (r) { return r.injected.length > 0; })) {
    console.log('%cAll detected products have one badge target.', 'color:#059669;font-weight:bold;font-size:14px');
  } else {
    console.warn('%cSome products need selector review. Inspect the groups above.', 'color:#dc2626;font-weight:bold;font-size:14px');
  }
})();
