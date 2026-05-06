import fs from 'fs';
const file = 'src/widget/themes/ozy/styles.js';
let s = fs.readFileSync(file, 'utf8');

// 1. Update comment block — remove old theme tokens, explain current state
const oldComment =
`// themes/ozy/styles.js — Default tema CSS
//
// Tema (açık/koyu/özel) tüm widget görünümünü şu CSS değişkenleri üzerinden
// kontrol eder. render.js themeMode'a göre bu değişkenleri document root'a
// yazar — CSS default'ları sadece fallback olarak kullanılır:
//   --ikr-bg          : widget arka planı
//   --ikr-text        : birincil yazı rengi
//   --ikr-text-muted  : ikincil yazı rengi (tarih, sayaç)
//   --ikr-text-faint  : çok soluk yazı rengi (placeholder vb.)
//   --ikr-border      : ayırıcı çizgi/border rengi
//   --ikr-track-bg    : bar chart track arka planı (border'dan ayrı — koyu
//                       temada track'in görünmesi için daha yüksek kontrast)
//   --ikr-reply-bg    : mağaza yanıtı kutusu arka planı
//   --ikr-surface     : menü/kart üst yüzeyi (bg'den biraz farklı)`;

const newComment =
`// themes/ozy/styles.js — Widget CSS
//
// Her UI elemanı kendi spesifik CSS değişkeniyle renklendirilir.
// Eski genel tema token'ları (--ikr-bg, --ikr-text vb.) kaldırıldı;
// fallback'ler sabit hex default'larına (#111111, #ffffff, #e5e7eb vb.)
// düştüğü için çiftli fallback zincirlerine ihtiyaç kalmadı.
//
// render.js her eleman için kendi değişkenini set eder; buradaki
// default'lar sadece emniyet filesidir.`;

s = s.replace(oldComment, newComment);

// Helper: replace all exact strings safely
function r(oldStr, newStr) {
  const count = (s.match(new RegExp(oldStr.replace(/[.*+?^${}()|[\]\\]/g, '\\\\$&'), 'g')) || []).length;
  s = s.split(oldStr).join(newStr);
  return count;
}

const changes = [];

// 2. Flatten double-var fallbacks with --ikr-text → #111111
changes.push(['header-title', r('var(--ikr-header-title,var(--ikr-text,rgba(0,0,0,1)))', 'var(--ikr-header-title,#111111)')]);
changes.push(['header-avg', r('var(--ikr-header-avg,var(--ikr-text,rgba(0,0,0,1)))', 'var(--ikr-header-avg,#111111)')]);
changes.push(['header-count', r('var(--ikr-header-count,var(--ikr-text,rgba(0,0,0,1)))', 'var(--ikr-header-count,#111111)')]);
changes.push(['header-recommend', r('var(--ikr-header-recommend,var(--ikr-text,rgba(0,0,0,1)))', 'var(--ikr-header-recommend,#111111)')]);
changes.push(['bar-fill', r('var(--ikr-bar-fill,var(--ikr-text,rgba(0,0,0,1)))', 'var(--ikr-bar-fill,#111111)')]);
changes.push(['bar-count', r('var(--ikr-bar-count,var(--ikr-text,rgba(0,0,0,1)))', 'var(--ikr-bar-count,#111111)')]);
changes.push(['filter-item-text', r('var(--ikr-filter-item-text,var(--ikr-text,rgba(0,0,0,1)))', 'var(--ikr-filter-item-text,#111111)')]);
changes.push(['photo-title', r('var(--ikr-photo-title,var(--ikr-text,rgba(0,0,0,1)))', 'var(--ikr-photo-title,#111111)')]);
changes.push(['photo-arrow-text', r('var(--ikr-photo-arrow-text,var(--ikr-text,rgba(0,0,0,1)))', 'var(--ikr-photo-arrow-text,#111111)')]);
changes.push(['review-title', r('var(--ikr-review-title,var(--ikr-text,rgba(0,0,0,1)))', 'var(--ikr-review-title,#111111)')]);
changes.push(['review-author', r('var(--ikr-review-author,var(--ikr-text,rgba(0,0,0,1)))', 'var(--ikr-review-author,#111111)')]);
changes.push(['review-date', r('var(--ikr-review-date,var(--ikr-text,rgba(0,0,0,1)))', 'var(--ikr-review-date,#111111)')]);
changes.push(['review-body', r('var(--ikr-review-body,var(--ikr-text,rgba(0,0,0,1)))', 'var(--ikr-review-body,#111111)')]);
changes.push(['reply-label', r('var(--ikr-reply-label,var(--ikr-text,rgba(0,0,0,1)))', 'var(--ikr-reply-label,#111111)')]);
changes.push(['reply-text', r('var(--ikr-reply-text,var(--ikr-text,rgba(0,0,0,1)))', 'var(--ikr-reply-text,#111111)')]);
changes.push(['load-more-text', r('var(--ikr-load-more-text,var(--ikr-text,rgba(0,0,0,1)))', 'var(--ikr-load-more-text,#111111)')]);
changes.push(['bar-label', r('color:var(--ikr-text,rgba(0,0,0,1))', 'color:#111111')]);

// 3. Flatten double-var fallbacks with --ikr-bg / --ikr-surface / --ikr-border / --ikr-track-bg / --ikr-reply-bg
changes.push(['widget-bg', r('background:var(--ikr-widget-bg,var(--ikr-bg,transparent))', 'background:transparent')]);
changes.push(['bar-track', r('var(--ikr-bar-track,var(--ikr-track-bg,rgba(0,0,0,0.10)))', 'var(--ikr-bar-track,#e5e7eb)')]);
changes.push(['filter-menu-bg', r('var(--ikr-filter-menu-bg,var(--ikr-surface,#fff))', 'var(--ikr-filter-menu-bg,#ffffff)')]);
changes.push(['filter-menu-border', r('var(--ikr-filter-menu-border,var(--ikr-border,rgba(0,0,0,0.12)))', 'var(--ikr-filter-menu-border,#e5e7eb)')]);
changes.push(['load-more-border', r('var(--ikr-load-more-border,var(--ikr-border,rgba(0,0,0,0.30)))', 'var(--ikr-load-more-border,#111111)')]);
changes.push(['load-more-bg', r('var(--ikr-load-more-bg,var(--ikr-surface,#fff))', 'var(--ikr-load-more-bg,#ffffff)')]);
changes.push(['modal-bg', r('var(--ikr-modal-bg,var(--ikr-bg,#fff))', 'var(--ikr-modal-bg,#ffffff)')]);
changes.push(['reply-bg-color', r('var(--ikr-reply-bg-color,var(--ikr-reply-bg,rgba(0,0,0,0.03)))', 'var(--ikr-reply-bg-color,#f9fafb)')]);

// 4. Fix direct var(--ikr-text) and var(--ikr-bg) usages
changes.push(['widget-text', r('color:var(--ikr-text,rgba(0,0,0,1))', 'color:#111111')]);
changes.push(['modal-text', r('color:var(--ikr-text,rgba(0,0,0,1))', 'color:#111111')]);
changes.push(['modal-right-bg', r('background:var(--ikr-modal-bg,var(--ikr-bg,#fff))', 'background:var(--ikr-modal-bg,#ffffff)')]);

// 5. Fix --ikr-color and --ikr-color-text references (legacy primary color)
changes.push(['btn-bg', r('var(--ikr-btn-bg,var(--ikr-color,#000))', 'var(--ikr-btn-bg,#111111)')]);
changes.push(['btn-text', r('var(--ikr-btn-text,var(--ikr-color-text,#fff))', 'var(--ikr-btn-text,#ffffff)')]);
changes.push(['btn-border', r('var(--ikr-btn-border,var(--ikr-color,#000))', 'var(--ikr-btn-border,#111111)')]);
changes.push(['filter-btn-border', r('var(--ikr-filter-btn-border,var(--ikr-color,#000))', 'var(--ikr-filter-btn-border,#111111)')]);
changes.push(['filter-btn-text', r('var(--ikr-filter-btn-text,var(--ikr-color,#000))', 'var(--ikr-filter-btn-text,#111111)')]);
changes.push(['filter-item-active', r('var(--ikr-filter-item-active,var(--ikr-color,#000))', 'var(--ikr-filter-item-active,#111111)')]);
changes.push(['reply-border', r('var(--ikr-reply-border,var(--ikr-color,#000))', 'var(--ikr-reply-border,#747474)')]);
changes.push(['modal-close-text', r('var(--ikr-modal-close-text,var(--ikr-color-text,#fff))', 'var(--ikr-modal-close-text,#ffffff)')]);

fs.writeFileSync(file, s, 'utf8');

changes.forEach(([name, count]) => {
  console.log(name + ': ' + count + ' replacements');
});

// Verify no broken var() left
const broken = s.match(/var\(\s*,/g);
console.log('Broken var() count:', broken ? broken.length : 0);

// Verify no --ikr-text / --ikr-bg / --ikr-surface / --ikr-border / --ikr-track-bg / --ikr-reply-bg left
const legacy = ['--ikr-text', '--ikr-bg', '--ikr-surface', '--ikr-border', '--ikr-track-bg', '--ikr-reply-bg', '--ikr-color', '--ikr-color-text'];
legacy.forEach(v => {
  const matches = s.match(new RegExp(v, 'g'));
  console.log(v + ' refs:', matches ? matches.length : 0);
});
