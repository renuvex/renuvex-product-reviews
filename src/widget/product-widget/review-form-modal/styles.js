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

  /* Modal kutusu — 680×600, max 85vh */
  .ikr-fwizard{
    position:relative;
    width:100%;
    max-width:680px;
    height:600px;
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

  /* Step geçiş animasyonları — scale + fade + ufak translateY.
     animation-end ile orchestrator senkronize. prefers-reduced-motion
     altında süreler 0.01ms'ye düşer (görsel olarak anlık) ama
     animationend yine atılır → orchestrator çalışmaya devam eder. */
  /* Desktop varsayılanı — büyük ekranda küçük hareket gözden kaçtığı
     için daha uzun süre + daha büyük translateY/scale. Mobile aşağıda
     ayrı keyframe'ler kullanır (küçük ekranda hareket göze büyük gelir). */
  .ikr-fwizard-step--enter{
    animation:ikrStepInDesktop 0.42s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    will-change:transform, opacity;
  }
  .ikr-fwizard-step--exit{
    animation:ikrStepOutDesktop 0.24s ease-in forwards;
    will-change:transform, opacity;
  }
  @keyframes ikrStepInDesktop{
    0%   { opacity:0; transform:scale(0.94) translateY(18px); }
    100% { opacity:1; transform:scale(1)    translateY(0);    }
  }
  @keyframes ikrStepOutDesktop{
    0%   { opacity:1; transform:scale(1)    translateY(0);     }
    100% { opacity:0; transform:scale(0.97) translateY(-10px); }
  }
  @keyframes ikrStepInMobile{
    0%   { opacity:0; transform:scale(0.96) translateY(8px); }
    100% { opacity:1; transform:scale(1)    translateY(0);   }
  }
  @keyframes ikrStepOutMobile{
    0%   { opacity:1; transform:scale(1)    translateY(0);    }
    100% { opacity:0; transform:scale(0.98) translateY(-4px); }
  }
  @media(max-width:640px){
    .ikr-fwizard-step--enter{
      animation:ikrStepInMobile 0.30s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
    .ikr-fwizard-step--exit{
      animation:ikrStepOutMobile 0.20s ease-in forwards;
    }
  }
  @media (prefers-reduced-motion: reduce){
    .ikr-fwizard-step--enter,
    .ikr-fwizard-step--exit{
      animation-duration:0.01ms;
    }
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

  /* ─── Step 3: İçerik formu (başlık + textarea) ─── */
  .ikr-fwizard-content-form{
    width:100%;
    max-width:520px;
    display:flex;
    flex-direction:column;
    gap:12px;
    text-align:left;
  }
  .ikr-fwizard-input,
  .ikr-fwizard-textarea{
    width:100%;
    padding:12px 14px;
    background:var(--ikr-fwizard-input-bg, #ffffff);
    border:1px solid var(--ikr-fwizard-input-border, rgba(0,0,0,0.15));
    border-radius:8px;
    font-size:14px;
    font-family:inherit;
    color:var(--ikr-fwizard-text, rgb(17,17,17));
    box-sizing:border-box;
    transition:border-color 0.15s;
  }
  .ikr-fwizard-input:focus,
  .ikr-fwizard-textarea:focus{
    outline:none;
    border-color:var(--ikr-fwizard-input-focus, rgba(0,0,0,0.55));
  }
  .ikr-fwizard-textarea{
    resize:vertical;
    min-height:140px;
    line-height:1.5;
  }
  .ikr-fwizard-char-counter{
    font-size:12px;
    color:var(--ikr-fwizard-muted, rgba(0,0,0,0.50));
    text-align:right;
  }
  .ikr-fwizard-char-counter--max{
    color:#dc2626;
  }

  /* ─── Step 4: Hakkınızda (Ad + E-posta + Submit) ─── */
  .ikr-fwizard-author-form{
    width:100%;
    max-width:520px;
    display:flex;
    flex-direction:column;
    gap:16px;
    text-align:left;
  }
  .ikr-fwizard-field{
    display:flex;
    flex-direction:column;
    gap:6px;
  }
  .ikr-fwizard-label{
    font-size:13px;
    font-weight:500;
    color:var(--ikr-fwizard-text, rgb(17,17,17));
  }
  .ikr-fwizard-required{
    color:#dc2626;
    margin-left:2px;
  }
  .ikr-fwizard-notice{
    font-size:12px;
    line-height:1.5;
    color:var(--ikr-fwizard-muted, rgba(0,0,0,0.55));
    text-align:center;
    padding:4px 8px;
  }
  .ikr-fwizard-msg{
    min-height:20px;
  }
  .ikr-fwizard-msg-error{
    color:#dc2626;
    font-size:13px;
  }
  .ikr-fwizard-submit-btn{
    background:var(--ikr-fwizard-cta-bg, rgb(17,17,17));
    color:var(--ikr-fwizard-cta-text, #ffffff);
    border:none;
    border-radius:8px;
    padding:14px 24px;
    font-size:15px;
    font-weight:500;
    cursor:pointer;
    transition:opacity 0.15s, background 0.15s;
    font-family:inherit;
    margin-top:4px;
  }
  .ikr-fwizard-submit-btn:hover:not(:disabled){
    opacity:0.92;
  }
  .ikr-fwizard-submit-btn--disabled,
  .ikr-fwizard-submit-btn:disabled{
    background:var(--ikr-fwizard-cta-disabled-bg, rgba(0,0,0,0.18));
    color:var(--ikr-fwizard-cta-disabled-text, rgba(255,255,255,0.85));
    cursor:not-allowed;
  }

  /* ─── Teşekkür ekranı (submit sonrası) ─── */
  .ikr-fwizard-thanks{
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    gap:12px;
    padding:32px 16px;
    text-align:center;
  }
  .ikr-fwizard-thanks-icon{
    color:var(--ikr-review-star-color, #f59e0b);
    line-height:0;
  }
  .ikr-fwizard-thanks-title{
    font-size:18px;
    font-weight:500;
    color:var(--ikr-fwizard-text, rgb(17,17,17));
  }
  .ikr-fwizard-thanks-text{
    font-size:14px;
    color:var(--ikr-fwizard-muted, rgba(0,0,0,0.55));
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

  /* ─── Footer: [Geri]  [progress]  [Atla|Sonraki] ─────────────────
     3-kolon grid: yan kolonlar 120px sabit, orta esnek.
       - Yan kolon genişliği step'ten bağımsız (her step'te aynı).
       - Buton içerikleri justify-self ile kolon kenarlarına yaslı:
         Geri → start, Atla/Sonraki → end. Böylece buton genişliği
         küçük olsa da konum sabit; her step'te aynı X koordinatı.
       - Orta kolon 1fr → progress pills doğal olarak ortalanır,
         absolute hile yok, butonların üstüne binmez. */
  .ikr-fwizard-footer{
    flex:0 0 auto;
    padding:16px 24px;
    /* min-height: butonlar artık sabit 40px kutu, dikey padding 16px*2.
       Footer toplam 72px sabit → progress hiçbir step'te dikey kaymaz. */
    min-height:72px;
    box-sizing:border-box;
    border-top:1px solid var(--ikr-fwizard-border, rgba(0,0,0,0.08));
    display:grid;
    grid-template-columns:120px 1fr 120px;
    align-items:center;
    gap:16px;
  }
  .ikr-fwizard-footer-back{
    justify-self:start;
  }
  .ikr-fwizard-footer-progress{
    justify-self:center;
    display:flex;
    align-items:center;
    gap:6px;
  }
  /* CTA ve nav butonları — sabit width × height kutu, içerik flex
     center ile ortalanır. Step'ten step'e buton şekli birebir aynı
     kalır. Hiyerarşi: CTA dolu siyah, nav transparent. */
  .ikr-fwizard-cta-btn{
    background:var(--ikr-fwizard-cta-bg, rgb(17,17,17));
    color:var(--ikr-fwizard-cta-text, #ffffff);
    border:none;
    border-radius:8px;
    width:108px;
    height:40px;
    padding:0;
    font-size:15px;
    font-weight:600;
    line-height:1;
    cursor:pointer;
    display:inline-flex;
    align-items:center;
    justify-content:center;
    transition:opacity 0.15s, background 0.15s;
    font-family:inherit;
    box-sizing:border-box;
  }
  .ikr-fwizard-cta-btn:hover:not(:disabled){
    opacity:0.92;
  }
  .ikr-fwizard-cta-btn--disabled,
  .ikr-fwizard-cta-btn:disabled{
    background:var(--ikr-fwizard-cta-disabled-bg, rgba(0,0,0,0.18));
    color:var(--ikr-fwizard-cta-disabled-text, rgba(255,255,255,0.85));
    cursor:not-allowed;
  }
  .ikr-fwizard-cta-btn[hidden]{
    display:none;
  }
  .ikr-fwizard-progress-seg{
    flex:0 0 auto;
    width:80px;
    height:8px;
    border-radius:16px;
    background:var(--ikr-fwizard-progress-bg, rgba(0,0,0,0.08));
    transition:background 0.2s;
  }
  .ikr-fwizard-progress-seg-active{
    background:var(--ikr-fwizard-progress-active, rgb(17,17,17));
  }
  /* Nav butonları (Geri / Atla) — CTA ile aynı kutu (108×40), sadece
     arkaplan transparent. Hiyerarşi fill vs transparent ile, boyut
     ile değil. Hover: sadece renk değişikliği — background hover
     asimetrik gözüktüğü için kaldırıldı (ok+metin kutuda farklı
     X koordinatlarında, hover bg buton kutusu büyüklüğünde olunca
     metnin ortasında değil, kutunun ortasında görünür). */
  .ikr-fwizard-nav-btn{
    background:transparent;
    border:none;
    width:108px;
    height:40px;
    padding:0;
    color:var(--ikr-fwizard-muted, rgba(0,0,0,0.60));
    font-size:15px;
    font-weight:600;
    line-height:1;
    cursor:pointer;
    display:inline-flex;
    align-items:center;
    justify-content:center;
    gap:6px;
    border-radius:8px;
    font-family:inherit;
    box-sizing:border-box;
  }
  .ikr-fwizard-nav-btn:hover{
    color:var(--ikr-fwizard-text, rgb(17,17,17));
  }
  .ikr-fwizard-nav-btn[hidden]{
    display:none;
  }

  /* ─── Mobile düzenlemeleri ────────────────────────────────────────
     Mobil yapı:
       - Modal tam ekran (100dvh × 100vw)
       - Step 1: sağ-üstte X butonu, progress gizli (üst boş)
       - Step 2-4: X gizli, progress üst kenara absolute
       - Butonlar her zaman altta (footer doğal yeri):
           sol: "Geri" yazısı (ok ikonu gizli, sadece text)
           sağ: "Atla" / "Sonraki" — desktop ile aynı
       - İçerik dikey ortada, header ve footer arasına padded
     DOM dokunulmaz, step state'i shell.setStepAttr ile data-step
     attribute'u olarak modal kutusuna işlenir. */
  @media(max-width:640px){
    .ikr-fwizard-overlay{
      padding:0;
    }
    .ikr-fwizard{
      width:100vw;
      max-width:none;
      height:100vh;       /* fallback */
      height:100dvh;      /* dynamic viewport */
      max-height:none;
      border-radius:0;
      border:none;
    }

    /* X butonu — step 1'de görünür, diğer step'lerde gizli */
    .ikr-fwizard[data-step="1"] .ikr-fwizard-close{
      display:flex;
    }
    .ikr-fwizard[data-step="2"] .ikr-fwizard-close,
    .ikr-fwizard[data-step="3"] .ikr-fwizard-close,
    .ikr-fwizard[data-step="4"] .ikr-fwizard-close{
      display:none;
    }

    /* Progress bar üst kenara absolute — sadece step 2-4'te görünür */
    .ikr-fwizard-content{
      position:relative;
      padding-top:32px;
      box-sizing:border-box;
    }
    .ikr-fwizard-footer-progress{
      position:absolute;
      top:16px;
      bottom:auto;
      left:0;
      right:0;
      width:100%;
      justify-content:center;
      transform:none;
      z-index:2;
    }
    /* Step 1: progress gizli (X üstte yer kaplıyor zaten) */
    .ikr-fwizard[data-step="1"] .ikr-fwizard-footer-progress{
      display:none;
    }
    /* Step 1'de üst padding'e gerek yok — X kendi position:absolute */
    .ikr-fwizard[data-step="1"] .ikr-fwizard-content{
      padding-top:0;
    }

    /* Footer butonları altta, doğal yerde. Geri = sadece "Geri" yazısı,
       ok ikonu gizli. Atla zaten yazı+ok (desktop ile aynı).
       Grid kolonları mobile'da auto/1fr/auto: yan kolonlar buton kadar,
       orta esnek. */
    .ikr-fwizard-footer{
      padding:12px 20px;
      grid-template-columns:auto 1fr auto;
    }
    .ikr-fwizard-footer-back > svg{
      display:none;
    }
    /* Sağ slot butonu (Atla / Sonraki) grid item olarak kolonun sağ
       ucuna yaslı dursun. Refactor sonrası eski .footer-right wrapper
       div'i kalktı, buton doğrudan footer grid item — justify-self
       ataması burada yapılır. */
    .ikr-fwizard-footer-skip,
    .ikr-fwizard-footer-next{
      justify-self:end;
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
  }
`;
