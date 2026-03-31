/**
 * IKR Badge Test Script
 * Konsola yapıştır — sayfayı değiştirmez, sadece raporlar + badge simüle eder.
 * Kullanım: tüm içeriği kopyala, kategori/listing sayfasında konsola yapıştır.
 */
(function () {
  var STAR_COLOR = '#f59e0b';
  var TITLE_CLASS_SELECTOR = '[class*="productTitle"],[class*="productName"],[class*="product_title"],[class*="product_name"],[class*="product-title"],[class*="product-name"]';

  function extractSlug(url) {
    try { return new URL(url, window.location.origin).pathname.replace(/^\//, '').split('?')[0].split('/')[0]; } catch (_) { return ''; }
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
      if (/^[\d\s.,₺$€£%]+$/.test(text)) continue;
      if (cel.closest('figure') || cel.closest('picture')) continue;
      if (cel.children.length > 1) continue;
      return cel;
    }
    return null;
  }

  // Sayfadaki tüm ürün linklerini topla (slug → linkler)
  var slugMap = {};
  document.querySelectorAll('a[href]').forEach(function (a) {
    var href = a.getAttribute('href');
    if (!href || href.charAt(0) === '#' || href.charAt(0) === '?') return;
    var slug = extractSlug(a.href);
    if (!slug || slug.length < 3) return;
    if (/^(account|pages|blog|search|cart|checkout|siparis|odeme|kategori|category|urun|products?)/.test(slug)) return;
    if (!slugMap[slug]) slugMap[slug] = [];
    slugMap[slug].push(a);
  });

  var slugs = Object.keys(slugMap);
  if (!slugs.length) {
    console.warn('[IKR TEST] Sayfada ürün linki bulunamadı.');
    return;
  }

  console.log('%c[IKR TEST] ' + slugs.length + ' ürün slug\'u bulundu', 'color:#7c3aed;font-weight:bold;font-size:14px');
  console.log('Sluglar:', slugs);

  var report = [];
  var globalDuplicateWarnings = [];

  slugs.forEach(function (slug) {
    var links = slugMap[slug];
    var injected = [];
    var skipped = [];

    links.forEach(function (a, idx) {
      var hasNestedA = !!a.querySelector('a[href]');
      var hasImage   = !!a.querySelector('img, picture, svg');
      var hasText    = a.textContent.trim().length > 0;

      // Pattern X — resim linki
      if (hasImage && !hasText) {
        skipped.push({ idx: idx, reason: 'Pattern X — resim linki (img var, metin yok)' });
        return;
      }

      // Pattern 1 — wrapper <a>
      if (hasNestedA) {
        var nameEl1 = findTitleEl(a, null);
        if (!nameEl1) {
          skipped.push({ idx: idx, reason: 'Pattern 1 — wrapper <a> ama title el bulunamadı' });
          return;
        }
        var rect1 = nameEl1.getBoundingClientRect();
        injected.push({
          idx: idx,
          pattern: '1 (Wrapper <a> → başlık div içeride)',
          targetTag: nameEl1.tagName,
          targetClass: nameEl1.className || '(yok)',
          targetText: nameEl1.textContent.trim().substring(0, 50),
          position: 'nameEl\'in hemen altına',
          rect: { top: Math.round(rect1.top + window.scrollY), left: Math.round(rect1.left) },
        });
        return;
      }

      // Pattern 2/3/4 — bağımsız <a>
      var nameEl = findTitleEl(a, null);
      if (nameEl) {
        var isP4 = nameEl.matches && nameEl.matches(TITLE_CLASS_SELECTOR);
        var rect2 = nameEl.getBoundingClientRect();
        injected.push({
          idx: idx,
          pattern: isP4 ? '4 (<a> kendisi productTitle class\'lı)' : '2 (Ayrı başlık <a>, title el bulundu)',
          targetTag: nameEl.tagName,
          targetClass: nameEl.className || '(yok)',
          targetText: nameEl.textContent.trim().substring(0, 50),
          position: 'nameEl\'in hemen altına',
          rect: { top: Math.round(rect2.top + window.scrollY), left: Math.round(rect2.left) },
        });
      } else {
        var rect3 = a.getBoundingClientRect();
        injected.push({
          idx: idx,
          pattern: '3 (<a> içinde direkt text node, title el yok)',
          targetTag: a.tagName,
          targetClass: a.className || '(yok)',
          targetText: a.textContent.trim().substring(0, 50),
          position: '<a> içindeki ilk child\'dan önce',
          rect: { top: Math.round(rect3.top + window.scrollY), left: Math.round(rect3.left) },
        });
      }
    });

    // Duplicate kontrolü: aynı slug için 1'den fazla inject varsa uyar
    var isDuplicate = injected.length > 1;
    if (isDuplicate) globalDuplicateWarnings.push(slug);

    report.push({ slug: slug, totalLinks: links.length, injected: injected, skipped: skipped, isDuplicate: isDuplicate });
  });

  // Rapor çıktısı
  report.forEach(function (r) {
    var status = r.isDuplicate ? '❌ DUPLICATE' : r.injected.length === 0 ? '⚠️  BADGE YOK' : '✅ OK';
    console.group('%c[IKR TEST] ' + status + ' — ' + r.slug, 'font-weight:bold;color:' + (r.isDuplicate ? '#dc2626' : r.injected.length === 0 ? '#d97706' : '#059669'));
    console.log('Toplam link:', r.totalLinks, '| Badge inject:', r.injected.length, '| Skip:', r.skipped.length);

    r.injected.forEach(function (inj) {
      console.log(
        '  → Inject [link ' + inj.idx + '] Pattern ' + inj.pattern,
        '\n    Hedef:', inj.targetTag + (inj.targetClass ? '.' + inj.targetClass.split(' ')[0] : ''),
        '\n    Metin:', '"' + inj.targetText + '"',
        '\n    Konum:', inj.position,
        '\n    Sayfa pozisyonu: top=' + inj.rect.top + 'px, left=' + inj.rect.left + 'px'
      );
    });

    r.skipped.forEach(function (sk) {
      console.log('  ↷ Skip [link ' + sk.idx + ']:', sk.reason);
    });

    if (r.injected.length === 0 && r.skipped.length > 0) {
      console.warn('  ⚠️  Tüm linkler skip edildi — bu ürün için badge çıkmayacak!');
      console.log('  DOM örneği:', r.skipped.map(function(sk) { return slugMap[r.slug][sk.idx].outerHTML.substring(0, 200); }));
    }

    console.groupEnd();
  });

  // Özet
  console.log('');
  console.log('%c[IKR TEST] ÖZET', 'color:#7c3aed;font-weight:bold;font-size:14px');
  console.log('Toplam ürün:', report.length);
  console.log('Badge OK:', report.filter(function(r) { return r.injected.length > 0 && !r.isDuplicate; }).length);
  console.log('Badge YOK:', report.filter(function(r) { return r.injected.length === 0; }).length);
  console.log('Duplicate:', globalDuplicateWarnings.length, globalDuplicateWarnings.length ? '→ ' + globalDuplicateWarnings.join(', ') : '');

  if (globalDuplicateWarnings.length === 0 && report.every(function(r) { return r.injected.length > 0; })) {
    console.log('%c✅ Tüm ürünler için badge doğru — deploy edilebilir.', 'color:#059669;font-weight:bold;font-size:14px');
  } else {
    console.warn('%c⚠️  Sorun var — yukarıdaki ürünleri incele.', 'color:#dc2626;font-weight:bold;font-size:14px');
  }
})();
