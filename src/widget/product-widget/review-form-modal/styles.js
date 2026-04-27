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

  /* Modal kutusu — 720×612, max 85vh */
  .ikr-fwizard{
    position:relative;
    width:100%;
    max-width:720px;
    height:612px;
    max-height:85vh;
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
    font-weight:400;
    color:var(--ikr-fwizard-text, rgb(17,17,17));
    line-height:1.3;
  }

  /* Step alt başlığı — başlığın hemen altında, daha sönük */
  .ikr-fwizard-step-subtitle{
    margin-top:-20px;
    font-size:14px;
    font-weight:400;
    color:var(--ikr-fwizard-muted, rgba(0,0,0,0.55));
    line-height:1.4;
  }

  /* ─── Step 2: Foto kartı ─── */
  .ikr-fwizard-photo-card{
    width:100%;
    max-width:420px;
    border:1px solid var(--ikr-fwizard-border, rgba(0,0,0,0.12));
    border-radius:12px;
    padding:20px;
    display:flex;
    flex-direction:column;
    align-items:stretch;
    gap:16px;
    box-sizing:border-box;
  }
  .ikr-fwizard-photo-add{
    display:flex;
    align-items:center;
    justify-content:center;
    gap:10px;
    width:100%;
    padding:14px 20px;
    background:var(--ikr-fwizard-cta-bg, rgb(17,17,17));
    color:var(--ikr-fwizard-cta-text, #ffffff);
    border-radius:8px;
    font-size:15px;
    font-weight:500;
    cursor:pointer;
    user-select:none;
    transition:opacity 0.15s;
  }
  .ikr-fwizard-photo-add:hover{
    opacity:0.92;
  }
  .ikr-fwizard-photo-add--disabled{
    opacity:0.4;
    cursor:not-allowed;
    pointer-events:none;
  }
  .ikr-fwizard-photo-add svg{
    flex-shrink:0;
  }
  .ikr-fwizard-photo-previews{
    display:flex;
    flex-wrap:wrap;
    gap:10px;
  }
  .ikr-fwizard-photo-previews:empty{
    display:none;
  }
  .ikr-fwizard-photo-thumb{
    position:relative;
    width:88px;
    height:88px;
    border-radius:8px;
    overflow:hidden;
    border:1px solid rgba(0,0,0,0.06);
  }
  .ikr-fwizard-photo-thumb img{
    width:100%;
    height:100%;
    object-fit:cover;
    display:block;
  }
  .ikr-fwizard-photo-loading{
    position:absolute;
    top:0;left:0;
    width:100%;height:100%;
    background:rgba(255,255,255,0.75);
    display:flex;
    align-items:center;
    justify-content:center;
    border-radius:8px;
  }
  .ikr-fwizard-photo-remove{
    position:absolute;
    top:-6px;
    right:-6px;
    width:20px;
    height:20px;
    border-radius:50%;
    background:#fff;
    border:1px solid rgba(0,0,0,0.15);
    color:rgba(0,0,0,0.65);
    font-size:11px;
    line-height:1;
    cursor:pointer;
    display:flex;
    align-items:center;
    justify-content:center;
    box-shadow:0 1px 4px rgba(0,0,0,0.12);
    padding:0;
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

  /* ─── Footer: [Geri]  [progress]  [Atla] ─── */
  .ikr-fwizard-footer{
    flex:0 0 auto;
    padding:16px 24px;
    border-top:1px solid var(--ikr-fwizard-border, rgba(0,0,0,0.08));
    display:grid;
    grid-template-columns:1fr 2fr 1fr;
    align-items:center;
    gap:16px;
  }
  .ikr-fwizard-footer-back{
    justify-self:start;
  }
  .ikr-fwizard-footer-progress{
    display:flex;
    align-items:center;
    justify-content:center;
    gap:6px;
  }
  .ikr-fwizard-footer-skip{
    justify-self:end;
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
  .ikr-fwizard-nav-btn{
    background:transparent;
    border:none;
    padding:6px 4px;
    color:var(--ikr-fwizard-muted, rgba(0,0,0,0.60));
    font-size:14px;
    font-weight:500;
    cursor:pointer;
    display:inline-flex;
    align-items:center;
    gap:4px;
    border-radius:6px;
  }
  .ikr-fwizard-nav-btn:hover{
    color:var(--ikr-fwizard-text, rgb(17,17,17));
  }
  .ikr-fwizard-nav-btn[hidden]{
    display:none;
  }

  /* Mobile düzenlemeleri */
  @media(max-width:640px){
    .ikr-fwizard-overlay{
      padding:8px;
    }
    .ikr-fwizard{
      max-width:none;
      height:auto;
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
