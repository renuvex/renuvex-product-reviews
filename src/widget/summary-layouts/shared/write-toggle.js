// summary-layouts/shared/write-toggle.js
// "Yorum Yap" butonunun ortak click handler'ı — form accordion'unu açar/kapatır.

export function toggleWriteAccordion() {
  var accordion = document.getElementById('ikr-form-accordion');
  if (!accordion) return;
  var isOpen = accordion.style.maxHeight && accordion.style.maxHeight !== '0px';
  if (isOpen) {
    accordion.style.maxHeight = '0px';
    accordion.style.opacity = '0';
  } else {
    accordion.style.maxHeight = accordion.scrollHeight + 'px';
    accordion.style.opacity = '1';
    setTimeout(function() { accordion.style.maxHeight = 'none'; }, 360);
    setTimeout(function() {
      var stickyHeader = document.querySelector('header');
      var headerH = stickyHeader ? stickyHeader.getBoundingClientRect().height : 0;
      var top = accordion.getBoundingClientRect().top + window.pageYOffset - headerH - 16;
      window.scrollTo({ top: top, behavior: 'smooth' });
    }, 50);
  }
}
