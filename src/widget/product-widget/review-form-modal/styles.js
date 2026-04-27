// product-widget/review-form-modal/styles.js
// Yorum yazma wizard modal'ı — bağımsız stil dosyası.
// Tüm class'lar 'ikr-fwizard-' prefix'iyle, mevcut review-modal'dan tamamen
// izole. CSS variable'ları da kendi seti (--ikr-fwizard-*) → tema güncellenince
// review modal'a yansır ama form wizard etkilenmez.
//
// Kullanım: index.js bu CSS'i ilk açılışta document'a inject eder.

export var FWIZARD_CSS = `
  /* Backdrop — viewport'u kaplar, modal kutusunu ortalar */
  .ikr-fwizard-overlay{
    position:fixed;
    inset:0;
    z-index:99999;
    display:flex;
    align-items:center;
    justify-content:center;
    padding:16px;
    background:var(--ikr-fwizard-overlay-bg, rgba(0,0,0,0.50));
    /* Açılış fade animasyonu */
    opacity:0;
    transition:opacity 0.2s ease;
  }
  .ikr-fwizard-overlay.ikr-fwizard-open{
    opacity:1;
  }

  /* Modal kutusu — desktop'ta max 480px, mobile'da viewport'a sığar */
  .ikr-fwizard{
    position:relative;
    width:100%;
    max-width:480px;
    max-height:90vh;
    background:var(--ikr-fwizard-bg, #ffffff);
    color:var(--ikr-fwizard-text, rgb(17,17,17));
    border:1px solid var(--ikr-fwizard-border, rgba(0,0,0,0.08));
    border-radius:12px;
    box-shadow:0 16px 48px rgba(0,0,0,0.25);
    display:flex;
    flex-direction:column;
    overflow:hidden;
    /* Açılış scale animasyonu */
    transform:scale(0.96);
    transition:transform 0.2s ease;
  }
  .ikr-fwizard-overlay.ikr-fwizard-open .ikr-fwizard{
    transform:scale(1);
  }

  /* Close (X) butonu — sağ üst köşe */
  .ikr-fwizard-close{
    position:absolute;
    top:12px;
    right:12px;
    width:32px;
    height:32px;
    border-radius:8px;
    border:none;
    background:var(--ikr-fwizard-close-bg, rgba(0,0,0,0.06));
    color:var(--ikr-fwizard-close-text, rgb(17,17,17));
    cursor:pointer;
    font-size:18px;
    line-height:1;
    display:flex;
    align-items:center;
    justify-content:center;
    z-index:1;
    transition:background 0.15s;
  }
  @media(hover:hover){
    .ikr-fwizard-close:hover{
      background:var(--ikr-fwizard-close-bg-hover, rgba(0,0,0,0.10));
    }
  }

  /* İçerik konteyneri — step'ler buraya gelecek (Faz 2+).
     Şimdilik boş placeholder. Scroll içeriği taşarsa burada olur. */
  .ikr-fwizard-content{
    padding:32px 24px;
    overflow-y:auto;
    flex:1 1 auto;
    min-height:200px;
  }

  /* Faz 1 placeholder — geçici görünüm. Faz 2'de step layout'u alır. */
  .ikr-fwizard-placeholder{
    text-align:center;
    color:var(--ikr-fwizard-text-muted, rgba(0,0,0,0.55));
    padding:40px 0;
    font-size:14px;
  }

  /* Mobile düzenlemeleri */
  @media(max-width:600px){
    .ikr-fwizard-overlay{
      padding:8px;
    }
    .ikr-fwizard{
      max-width:none;
      max-height:95vh;
    }
    .ikr-fwizard-content{
      padding:28px 20px;
    }
  }
`;
