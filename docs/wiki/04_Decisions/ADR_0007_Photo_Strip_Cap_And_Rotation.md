---
type: decision
project: renuvex-product-reviews
status: active
created: 2026-05-11
updated: 2026-05-27
tags:
  - adr
  - widget
  - photo-strip
related:
  - "[[Decision_Index]]"
  - "[[Photo_Strip]]"
  - "[[Product_Review_Widget]]"
  - "[[ADR_0006_Trusted_Review_Image_URL_Policy]]"
  - "[[Bug_Cloud_Name_Silent_Image_Filter]]"
---

# ADR_0007 — Photo Strip Cap and Rotation Strategy

## Status
Accepted

## Date
2026-05-11

## Context
Ürün yorumları widget'ında review listesinin üzerinde yatay scroll'lu fotoğraf şeridi (`ikr-photo-section`) gösteriliyor. Önceki implementasyonda strip, ana liste çağrısının ilk 10 yorumundan türetiliyordu — bu üç sorun yaratıyordu:

1. **Strip = ilk sayfanın fotoğraflıları**: 10 yorumun 3'ü fotoğraflıysa strip 3 thumbnail gösteriyordu, 0'ı fotoğraflıysa strip hiç görünmüyordu (oysa 11. yorum fotoğraflı olabilirdi).
2. **Load-more sonrası stale**: "Daha Fazla Göster"e basıldığında yeni gelen fotoğraflı yorumlar strip'e yansımıyordu.
3. **Lightbox dead-end**: Strip thumbnail'inden açılan lightbox sadece initial 10 review içinde gezebiliyordu ([[Bug_Review_Detail_Lightbox_Risks]]).

Yotpo ve Judge.me canlı mağazalarında DevTools ile yapılan gözlem: strip 10-20 fotoğrafta sabit, "Tümü gör" benzeri ayrı bir entry-point yok ya da var ama strip'in kendisi 10-20 cap'inde. Strateji "newest-first rotation" — yeni yorum strip'in başına girer, en eski düşer.

## Decision
- **Cap: sabit 15 fotoğraflı yorum**. Admin ayarı yok; dağılım data'sı toplandıktan sonra setting'e taşıma kararı verilebilir.
- **Strateji: A — newest-first rotation**. Backend `?hasImages=true&orderBy=newest&limit=15` ile yeni dedike çağrı; ana liste fetch'inden bağımsız.
- **Cache: 1 dakika** (mevcut `REVIEWS_CACHE_TTL`); yeni onaylı fotoğraflı yorum 1 dakikaya kadar strip'te belirir, en eski düşer.
- **Bağımsızlık**: Sort/filter/load-more değişikliklerinde strip re-fetch yapılmaz — `state.photoStripReviews` review bootstrap sırasında bir kez doldurulur ve tüm widget yaşam döngüsü boyunca aynı kalır. Fetch helper `reviews-api.js` içindedir; `bootstrap.js` yalnızca explicit review mount varsa çağırır.

## Reasoning
- **Endüstri standardına paritedir.** Yotpo (10-20), Judge.me (10-20), Loox (12-20 + paid'da curate).
- **Tek backend çağrısı yeter**: yeni endpoint açmaktansa mevcut `/api/public/reviews` route'una `limit` query param eklemek minimal değişiklik.
- **Sabit 15** dengeli: mevcut 10'a göre +%50 sosyal kanıt, ama Yotpo bandında kalır; mobile'da 3-4× scroll mesafesi yönetilebilir.
- **State.js single source of truth**: render fonksiyonu strip'i parameter olarak değil state'ten okur → sort/filter re-render'larında strip aynı kalır, K1.b kökten kapanır.

## Alternatives Considered
- **Cap 10 (mevcut)**: Sosyal kanıt seyrek; "neden bu kadar az?" algısı.
- **Cap 20-25**: Mobile'da yorucu (5× scroll), thumbnail decode maliyeti yüksek.
- **Admin ayarı**: Erken karmaşıklık; data toplanmadan default belirlemek güç. İleride taşıma seçeneği açık.
- **Strateji B — Highest-rated wins**: Review filtering algısı + SEO/etik riski (Google fake-review sinyali).
- **Strateji C — Admin curated pin**: Manuel iş, ölçeklenmez. İleride Loox-tarzı pro feature olarak eklenebilir.
- **Strateji D — Random shuffle**: Tutarsız UX, returning user kafa karışıklığı, cache stratejisi karmaşık.
- **Yeni dedike endpoint `/api/public/review-images`**: Aşırı mühendislik. Mevcut endpoint'e `limit` param eklemek bu sürüm için yeterli.

## Consequences
**Olumlu:**
- K1 (load-more sonrası stale strip) ve K1.b (lightbox dead-end) kökten çözüldü.
- "Bug_Review_Detail_Lightbox_Risks" içindeki "paged navigation limited to caller review slices" risk noktası kapandı.
- Strip her zaman 15 (mağazada o kadar fotoğraflı yorum varsa) — "ilk 10 yorumun X'i fotoğraflıydı" tutarsızlığı sona erdi.

**Olumsuz / Yeni kısıt:**
- Bootstrap'ta ana liste + strip için 2 paralel istek (önceden 1). İlk paint network ağırlığı küçük artış (~5-15 KB).
- `state.photoStripReviews` SPA mağaza temasında ürün değişiminde manuel temizlenmeli (mevcut `bootstrapCache` ile aynı pattern — ürün geçişinde yeniden fetch).

**Takip işleri:**
- ✅ 2026-05-11 — P1 + M3 kapandı: `optimizeImageUrl(url, width)` parametreli; strip/kart/liste 300, gallery 600, lightbox mini 200, lightbox ana 1200 (default).
- ✅ 2026-05-11 — P2 kapandı: photo strip, card/list/gallery thumbnails ve lightbox mini thumbnails responsive `srcset`, native lazy/eager policy, async decoding ve explicit dimensions kullanıyor. Lightbox ana görsel eager kaldı; explicit dimensions aldı.
- ✅ 2026-05-11 — K3 kapandı: trusted image policy build-time public cloud fallback, last-valid widget cache ve settings `stale-if-error` ile dayanıklı hale getirildi. [[Bug_Cloud_Name_Silent_Image_Filter]]
- K2 (image error fallback) ayrı iş.
- Cap'in admin setting'e taşınması — kullanıcı geri bildirimi sonrası değerlendirilecek.

## Related Source Files
- [src/app/api/public/reviews/route.ts](src/app/api/public/reviews/route.ts) — `limit` query param (1-30 clamp)
- [src/widget/core/state.js](src/widget/core/state.js) — `photoStripReviews` state + setter
- [src/widget/reviews-section/bootstrap.js](src/widget/reviews-section/bootstrap.js) — explicit mount gate + initial photo strip fetch orchestration
- [src/widget/reviews-section/reviews-api.js](src/widget/reviews-section/reviews-api.js) — `fetchPhotoStripReviews`, `PHOTO_STRIP_LIMIT = 15`
- [src/widget/reviews-section/render.js](src/widget/reviews-section/render.js) — strip render bloğu state'ten okur
- [src/widget/reviews-section/review-modal.js](src/widget/reviews-section/review-modal.js) — lightbox stripReviews üzerinde navigate

## Related Notes
- [[Decision_Index]]
- [[Photo_Strip]]
- [[Product_Review_Widget]]
- [[Bug_Review_Detail_Lightbox_Risks]]
- [[ADR_0006_Trusted_Review_Image_URL_Policy]]
