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

  /* İçerik konteyneri — wizard layout (step + footer) burada. */
  .ikr-fwizard-content{
    padding:0;
    overflow:hidden;
    flex:1 1 auto;
    display:flex;
    flex-direction:column;
    min-height:320px;
  }

  /* Wizard layout — step içeriği + alttaki progress bar dikey */
  .ikr-fwizard-layout{
    display:flex;
    flex-direction:column;
    flex:1 1 auto;
    min-height:0;
  }

  /* Step içeriği konteyneri — scroll burada */
  .ikr-fwizard-step-wrap{
    flex:1 1 auto;
    overflow-y:auto;
    padding:48px 24px 32px;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    text-align:center;
  }

  /* Step kart — her adımın temel layout'u */
  .ikr-fwizard-step{
    width:100%;
    display:flex;
    flex-direction:column;
    align-items:center;
    gap:32px;
  }

  /* Step başlığı */
  .ikr-fwizard-step-title{
    font-size:18px;
    font-weight:600;
    color:var(--ikr-fwizard-text, rgb(17,17,17));
    line-height:1.3;
  }

  /* ─── Step 1: Yıldız satırı ───
     İkon ve renk admin "Yıldız Stili"nden gelir:
       - SVG: getIconFromSettings (icons.js, currentSettings.reviewIcon)
       - Renk: --ikr-review-star-color (admin "Yıldız Rengi")
     Boş hali için ayrı bir variable yok; review widget pattern'iyle aynı:
     empty SVG'nin currentColor'ı CSS'ten okunur. */
  .ikr-fwizard-stars{
    display:inline-flex;
    gap:8px;
    align-items:center;
  }
  .ikr-fwizard-star{
    width:44px;
    height:44px;
    padding:0;
    border:none;
    background:transparent;
    cursor:pointer;
    color:var(--ikr-bar-track, rgba(0,0,0,0.18));
    transition:color 0.15s, transform 0.1s;
    display:inline-flex;
    align-items:center;
    justify-content:center;
  }
  .ikr-fwizard-star svg{
    width:100%;
    height:100%;
    display:block;
  }
  .ikr-fwizard-star:hover{
    transform:scale(1.05);
  }
  .ikr-fwizard-star-active{
    color:var(--ikr-review-star-color, #f59e0b);
  }

  /* ─── Footer + Progress bar ─── */
  .ikr-fwizard-footer{
    flex:0 0 auto;
    padding:16px 24px;
    border-top:1px solid var(--ikr-fwizard-border, rgba(0,0,0,0.08));
    display:flex;
    align-items:center;
    justify-content:center;
    gap:6px;
  }
  .ikr-fwizard-progress-seg{
    flex:1 1 auto;
    height:4px;
    border-radius:2px;
    background:var(--ikr-fwizard-progress-bg, rgba(0,0,0,0.10));
    transition:background 0.2s;
  }
  .ikr-fwizard-progress-seg-active{
    background:var(--ikr-fwizard-progress-active, rgb(17,17,17));
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
    .ikr-fwizard-step-wrap{
      padding:36px 20px 28px;
    }
    .ikr-fwizard-step{
      gap:24px;
    }
    .ikr-fwizard-star{
      width:40px;
      height:40px;
    }
    .ikr-fwizard-stars{
      gap:6px;
    }
    .ikr-fwizard-footer{
      padding:12px 20px;
    }
  }
`;
