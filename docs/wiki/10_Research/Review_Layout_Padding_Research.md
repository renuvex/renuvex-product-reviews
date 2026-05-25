---
type: research
project: renuvex-product-reviews
status: active
created: 2026-05-07
updated: 2026-05-07
tags:
  - widget
  - review-layout
  - padding
  - mobile
  - desktop
  - UX
  - accessibility
related:
  - "[[Summary_Layout_Padding_Strategy]]"
  - "[[Widget_Customization]]"
  - "[[Storefront_Widget_Overview]]"
---

# Review Layout Padding Research & Recommendations

## Summary

Review layout'lar (card, list, gallery) icin mobil ve desktop padding stratejisinin endustri standartlari, erisilebilirlik kurallari ve rakip uygulamalar temelinde analizi. Bu rapor, 2026-05-07 tarihinde yapilan arastirmayi dokumante eder.

## Methodology

Arastirma uc kaynaktan beslendi:
1. **WCAG 2.2 ve erisilebilirlik standartlari** (W3C, Apple HIG, Google Material Design)
2. **Rakip uygulamalarin widget davranislari** (Loox, Yotpo, Okendo, Judge.me)
3. **E-ticaret UX arastirmalari** (MIT Touch Lab, Baymard Institute)

## 1. Endustri Standartlari

### 1.1 Touch Target Boyutu (Mobil)

| Standart | Minimum | Onerilen | Kaynak |
|---|---|---|---|
| WCAG 2.2 AA | 24×24px | 44×44px | W3C |
| Apple HIG | 44×44pt | 44×44pt | iOS Guidelines |
| Google Material | 48×48dp | 48×48dp | Material Design |
| Pratik UX | 44×44px | 48-56px | Build Grow Scale |

**Onemli**: 24px yasal minimumdur (AA). 44px ise endustri best-practice'dir. Insan parmak ucu 10-14mm genisligindedir; standart ekran yogunlugunda bu 44-57 CSS piksele karsilik gelir.

### 1.2 Elementler Arasi Bosluk (Spacing)

| Senaryo | Minimum Bosluk | Kaynak |
|---|---|---|
| List item'lar arasi (dikey) | 8px | WCAG 2.5.8 |
| Toolbar ikonlari arasi | 12px | Heurilens |
| Kartlar arasi | 16px | Material Design |
| Tappable alanlar arasi | 8px | BBC Accessibility |
| Form elemanlari arasi | 12-16px | Baymard Institute |

### 1.3 Yazi Boyutlari (Mobil)

| Element | Minimum | Ideal | Not |
|---|---|---|---|
| Body text | 16px | 16-18px | 16px alti zoom'a zorlar |
| H2 (section header) | 20px | 20-24px | |
| Secondary text | 14px | 14-16px | Etiketler, tarihler |
| Small print | 12px | 12-14px | Az kullanilmali |

## 2. Rakip Uygulama Analizi

### 2.1 Loox

- **Tasarim felsefesi**: "Generous whitespace", "crafted-by-a-design-team"
- **Padding**: Mobilde review item'lar arasi genis bosluk; fotograf merkezli yapi
- **Widget yuku**: 80-150ms daha hafif (Yotpo'ya gore)
- **Foto odakli**: Kart icinde fotograflar buyuk, padding fotografa gore ayarlanmis
- **Sonuc**: Modern, havalı gorunum; padding konusunda spesifik degerler aciklanmamis ama "coklu bosluk" vurgusu var

### 2.2 Okendo

- **Tasarim felsefesi**: "Modern & customizable", "fast-loading displays"
- **Padding**: DTC markalar icin optimize edilmis; temiz araliklar
- **Ozel ozellik**: Custom attribute questions (fit, size, age) — bu alanlar da padding kurallarina tabi
- **Sonuc**: Daha yalin widget; gereksiz bosluklardan kacinilmis

### 2.3 Yotpo

- **Tasarim felsefesi**: "Enterprise-functional", "feature-dense"
- **Padding**: Daha az opinionated; konfigurasyon alani genis
- **Widget yuku**: 200-400ms daha agir (mobil page load'a etki)
- **Sonuc**: Padding konusunda esnek ama varsayilanlari daha dar olabilir

### 2.4 Judge.me

- **Tasarim felsefesi**: Basit, hizli, lightweight
- **Padding**: Minimalist; fazla bosluk yok
- **Sonuc**: Fonksiyonel ama gorsel olarak daha az "premium"

## 3. Mevcut Durum Analizi (Bizim Proje)

### 3.1 Desktop Padding

| Layout | Yan Padding | Kaynak | Degerlendirme |
|---|---|---|---|
| **card** | `0` (base `.ikr-review`) | `styles.js` | ❌ Kenara yapisik olabilir |
| **list** | `0` (base) | `list/styles.js` | ❌ Grid yapiya uygun degil |
| **gallery** | `0` (base) | `gallery/styles.js` | ❌ Masonry kolon dengesi riski |

### 3.2 Mobile Padding

| Layout | Yan Padding | Degisken | Degerlendirme |
|---|---|---|---|
| **card** | `var(--ikr-pad-review-mobile)` | `16px` | ✅ Uygun |
| **list** | `var(--ikr-pad-review-mobile)` | `16px` | ✅ Uygun |
| **gallery** | `var(--ikr-pad-review-mobile)` | `16px` | ✅ Uygun |

### 3.3 Diger Parametreler

| Parametre | Mevcut Deger | Standart | Durum |
|---|---|---|---|
| Review item top/bottom padding (card) | `20px` | 16-24px | ✅ Uygun |
| Review item top/bottom padding (list) | `24px` | 16-24px | ✅ Uygun |
| Review item top/bottom padding (gallery) | `18px` | 16-24px | ✅ Uygun |
| Mobile summary padding | `16px` | 8-16px | ✅ Uygun |
| Touch target (filter btn) | `36×36px` | Min 24px, oneri 44px | ⚠️ Sınırda |
| Touch target (write btn) | `min-height:36px` | Min 24px, oneri 44px | ⚠️ Sınırda |

## 4. Sorunlar ve Riskler

### 4.1 Desktop Yan Padding — Mevcut Durum Kabul Edilebilir

**Guncelleme (2026-05-07)**: Desktop testlerinde (`#ikas-reviews-widget > * { max-width:1200px; margin:auto }`) icerik zaten dengeli ve kenara yapismiyor. Review layout'lara ek desktop yan padding gerekli **degil**.

**Mevcut Durum**:
- Widget container: `max-width:1200px; margin:auto` ✅
- Review item'lar: container sinirlari icinde dengeli ✅
- Gorsel test: classic/card layout'larda hizalama sorunsuz ✅

### 4.2 Gallery Masonry Etkisi

**Sorun**: Gallery `column-count:2` kullaniyor. Yan padding eklemek kolon genisligini daraltabilir.

**Hesaplama**:
- Widget max-width: `1200px`
- Column-gap: `32px`
- Her kolon: `(1200 - 32) / 2 = 584px`
- 8px yan padding her tarafta = `584 - 16 = 568px` icerik alani
- Bu hala yeterli bir genislik (568px)

### 4.3 List Layout Grid Etkisi

**Sorun**: List `grid-template-columns:140px 1fr var(--ikr-list-photo-w,120px)` kullaniyor.

**Hesaplama**:
- Grid gap: `24px`
- Toplam sabit genislik: `140 + 24 + 120 = 284px`
- 8px yan padding her tarafta = toplam `16px` ek kayip
- Kalan orta kolon: `1200 - 284 - 16 = 900px` (yeterli)

## 5. Oneriler

### 5.1 Desktop Yan Padding — Mevcut Durum Kabul Edilebilir

**Guncelleme (2026-05-07)**: Desktop testlerinde (`#ikas-reviews-widget > * { max-width:1200px; margin:auto }`) icerik zaten dengeli ve kenara yapismiyor. Review layout'lara ek desktop yan padding gerekli **degil**.

**Mevcut Durum**:
- Widget container: `max-width:1200px; margin:auto` ✅
- Review item'lar: container sinirlari icinde dengeli ✅
- Gorsel test: classic/card layout'larda hizalama sorunsuz ✅

**Sonuc**: Desktop yan padding degisikligi **yapilmayacak**.

### 5.2 Touch Target Buyutme (Istege Bagli)

**Oneri**: Filter butonu (`36×36px`) ve Write butonu (`min-height:36px`) `44px`'e cikarilabilir.

**Gerekce**:
- WCAG 2.2 AA: 24px minimum (gecerli)
- Apple/Google best practice: 44-48px (daha iyi)
- Mobil conversion uzerinde etkisi olabilir

**Risk**: Butonlarin buyumesi layout'lari etkileyebilir (ozellikle compact header).

### 5.3 Review Item Arasi Bosluk

**Oneri**: Mevcut top/bottom padding'ler (`18-24px`) korunmali.

**Gerekce**:
- Endustri standardi: 16-24px arasi
- Card: `20px` ✅
- List: `24px` ✅
- Gallery: `18px` ✅

## 6. Sonuc

### Mobil

Mevcut durum **uygundur**:
- `10px` yan padding (`--ikr-pad-review-mobile`)
- `18-24px` top/bottom padding
- `36px` touch target (yasal minimum uzerinde)

### Desktop

**Duzeltme gerekmez**:
- Widget container `max-width:1200px; margin:auto` icerigi zaten dengeli tutuyor
- Desktop testlerinde kenara yapismadigi gozlendi
- Mevcut `0px` yan padding kabul edilebilir

## 7. Karsilastirma Tablosu (Guncel Son Durum)

| Layout | Desktop Yan Padding | Mobile Yan Padding | Top/Bottom | Touch Target |
|---|---|---|---|---|
| **card** | `0` (container) | `16px` | `20px` | `36px` (mevcut) |
| **list** | `0` (container) | `16px` | `24px` | `36px` (mevcut) |
| **gallery** | `0` (container) | `16px` | `18px` | `36px` (mevcut) |

## 8. Source Files

- [src/widget/themes/ozy/styles.js](src/widget/themes/ozy/styles.js) — base `.ikr-review`, mobile padding block
- [src/widget/review-layouts/card/index.js](src/widget/review-layouts/card/index.js) — card render
- [src/widget/review-layouts/list/styles.js](src/widget/review-layouts/list/styles.js) — list CSS
- [src/widget/review-layouts/gallery/styles.js](src/widget/review-layouts/gallery/styles.js) — gallery CSS

## 9. Obsidian Links

- [[Summary_Layout_Padding_Strategy]]
- [[Widget_Customization]]
- [[Storefront_Widget_Overview]]

## Change Log

- **2026-05-07**: Rapor olusturuldu. Endustri standartlari (WCAG 2.2, Apple HIG, Material Design), rakip uygulamalar (Loox, Yotpo, Okendo, Judge.me) ve mevcut durum analizi yapildi.
- **2026-05-07**: Desktop padding onerisi revize edildi. Gorsel testler sonucunda desktop'ta review layout'lara ek yan padding gerekli olmadigi tespit edildi. Widget container `max-width:1200px; margin:auto` icerigi zaten dengeli tutuyor.
- **2026-05-07**: Mobile padding token'lari ikas temasi ile senkronize edildi. `--ikr-pad-review-mobile` `10px` -> `16px`. Foto galeri section ve strip padding'leri review token'ina baglandi.
- **2026-05-07**: Foto galeri negatif margin sorunu duzeltildi. `.ikr-photo-strip-container` negatif margin sadece desktop'a (`@media(min-width:601px)`) sinirlandirildi. Mobile'da negatif margin kalkti, thumbnail'lar padding ile hizali kaldi.
