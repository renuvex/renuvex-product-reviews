/* Renuvex Product Reviews ESM runtime | theme: default */
import{d as Y}from"./chunk-JAGRGK2W.js";import{a as k,d as Dt}from"./chunk-D4BSMMIO.js";var Wt={};Dt(Wt,{AttributeToStateChangeEventMap:()=>Ut,AvailabilityStates:()=>Ot,MediaStateChangeEvents:()=>j,MediaStateReceiverAttributes:()=>m,MediaUIAttributes:()=>c,MediaUIEvents:()=>X,MediaUIProps:()=>pt,PointerTypes:()=>Pt,ReadyStates:()=>Nt,StateChangeEventToAttributeMap:()=>kt,StreamTypes:()=>Ht,TextTrackKinds:()=>O,TextTrackModes:()=>xt,VolumeLevels:()=>Bt,WebkitPresentationModes:()=>Vt});var X={MEDIA_PLAY_REQUEST:"mediaplayrequest",MEDIA_PAUSE_REQUEST:"mediapauserequest",MEDIA_MUTE_REQUEST:"mediamuterequest",MEDIA_UNMUTE_REQUEST:"mediaunmuterequest",MEDIA_LOOP_REQUEST:"medialooprequest",MEDIA_VOLUME_REQUEST:"mediavolumerequest",MEDIA_SEEK_REQUEST:"mediaseekrequest",MEDIA_AIRPLAY_REQUEST:"mediaairplayrequest",MEDIA_ENTER_FULLSCREEN_REQUEST:"mediaenterfullscreenrequest",MEDIA_EXIT_FULLSCREEN_REQUEST:"mediaexitfullscreenrequest",MEDIA_PREVIEW_REQUEST:"mediapreviewrequest",MEDIA_ENTER_PIP_REQUEST:"mediaenterpiprequest",MEDIA_EXIT_PIP_REQUEST:"mediaexitpiprequest",MEDIA_ENTER_CAST_REQUEST:"mediaentercastrequest",MEDIA_EXIT_CAST_REQUEST:"mediaexitcastrequest",MEDIA_SHOW_TEXT_TRACKS_REQUEST:"mediashowtexttracksrequest",MEDIA_HIDE_TEXT_TRACKS_REQUEST:"mediahidetexttracksrequest",MEDIA_SHOW_SUBTITLES_REQUEST:"mediashowsubtitlesrequest",MEDIA_DISABLE_SUBTITLES_REQUEST:"mediadisablesubtitlesrequest",MEDIA_TOGGLE_SUBTITLES_REQUEST:"mediatogglesubtitlesrequest",MEDIA_PLAYBACK_RATE_REQUEST:"mediaplaybackraterequest",MEDIA_RENDITION_REQUEST:"mediarenditionrequest",MEDIA_AUDIO_TRACK_REQUEST:"mediaaudiotrackrequest",MEDIA_SEEK_TO_LIVE_REQUEST:"mediaseektoliverequest",REGISTER_MEDIA_STATE_RECEIVER:"registermediastatereceiver",UNREGISTER_MEDIA_STATE_RECEIVER:"unregistermediastatereceiver"},m={MEDIA_CHROME_ATTRIBUTES:"mediachromeattributes",MEDIA_CONTROLLER:"mediacontroller"},pt={MEDIA_AIRPLAY_UNAVAILABLE:"mediaAirplayUnavailable",MEDIA_AUDIO_TRACK_ENABLED:"mediaAudioTrackEnabled",MEDIA_AUDIO_TRACK_LIST:"mediaAudioTrackList",MEDIA_AUDIO_TRACK_UNAVAILABLE:"mediaAudioTrackUnavailable",MEDIA_BUFFERED:"mediaBuffered",MEDIA_CAST_UNAVAILABLE:"mediaCastUnavailable",MEDIA_CHAPTERS_CUES:"mediaChaptersCues",MEDIA_CURRENT_TIME:"mediaCurrentTime",MEDIA_DURATION:"mediaDuration",MEDIA_ENDED:"mediaEnded",MEDIA_ERROR:"mediaError",MEDIA_ERROR_CODE:"mediaErrorCode",MEDIA_ERROR_MESSAGE:"mediaErrorMessage",MEDIA_FULLSCREEN_UNAVAILABLE:"mediaFullscreenUnavailable",MEDIA_HAS_PLAYED:"mediaHasPlayed",MEDIA_HEIGHT:"mediaHeight",MEDIA_IS_AIRPLAYING:"mediaIsAirplaying",MEDIA_IS_CASTING:"mediaIsCasting",MEDIA_IS_FULLSCREEN:"mediaIsFullscreen",MEDIA_IS_PIP:"mediaIsPip",MEDIA_LOADING:"mediaLoading",MEDIA_MUTED:"mediaMuted",MEDIA_LOOP:"mediaLoop",MEDIA_PAUSED:"mediaPaused",MEDIA_PIP_UNAVAILABLE:"mediaPipUnavailable",MEDIA_PLAYBACK_RATE:"mediaPlaybackRate",MEDIA_PREVIEW_CHAPTER:"mediaPreviewChapter",MEDIA_PREVIEW_COORDS:"mediaPreviewCoords",MEDIA_PREVIEW_IMAGE:"mediaPreviewImage",MEDIA_PREVIEW_TIME:"mediaPreviewTime",MEDIA_RENDITION_LIST:"mediaRenditionList",MEDIA_RENDITION_SELECTED:"mediaRenditionSelected",MEDIA_RENDITION_UNAVAILABLE:"mediaRenditionUnavailable",MEDIA_SEEKABLE:"mediaSeekable",MEDIA_STREAM_TYPE:"mediaStreamType",MEDIA_SUBTITLES_LIST:"mediaSubtitlesList",MEDIA_SUBTITLES_SHOWING:"mediaSubtitlesShowing",MEDIA_TARGET_LIVE_WINDOW:"mediaTargetLiveWindow",MEDIA_TIME_IS_LIVE:"mediaTimeIsLive",MEDIA_VOLUME:"mediaVolume",MEDIA_VOLUME_LEVEL:"mediaVolumeLevel",MEDIA_VOLUME_UNAVAILABLE:"mediaVolumeUnavailable",MEDIA_LANG:"mediaLang",MEDIA_WIDTH:"mediaWidth"},mt=Object.entries(pt),c=mt.reduce((e,[t,i])=>(e[t]=i.toLowerCase(),e),{}),Ct={USER_INACTIVE_CHANGE:"userinactivechange",BREAKPOINTS_CHANGE:"breakpointchange",BREAKPOINTS_COMPUTED:"breakpointscomputed"},j=mt.reduce((e,[t,i])=>(e[t]=i.toLowerCase(),e),k({},Ct)),kt=Object.entries(j).reduce((e,[t,i])=>{let o=c[t];return o&&(e[i]=o),e},{userinactivechange:"userinactive"}),Ut=Object.entries(c).reduce((e,[t,i])=>{let o=j[t];return o&&(e[i]=o),e},{userinactive:"userinactivechange"}),O={SUBTITLES:"subtitles",CAPTIONS:"captions",DESCRIPTIONS:"descriptions",CHAPTERS:"chapters",METADATA:"metadata"},xt={DISABLED:"disabled",HIDDEN:"hidden",SHOWING:"showing"},Nt={HAVE_NOTHING:0,HAVE_METADATA:1,HAVE_CURRENT_DATA:2,HAVE_FUTURE_DATA:3,HAVE_ENOUGH_DATA:4},Pt={MOUSE:"mouse",PEN:"pen",TOUCH:"touch"},Ot={UNAVAILABLE:"unavailable",UNSUPPORTED:"unsupported"},Ht={LIVE:"live",ON_DEMAND:"on-demand",UNKNOWN:"unknown"},Bt={HIGH:"high",MEDIUM:"medium",LOW:"low",OFF:"off"},Vt={INLINE:"inline",FULLSCREEN:"fullscreen",PICTURE_IN_PICTURE:"picture-in-picture"};function H(e){let t={};for(let i of e)t[i.name]=i.value;return t}function Et(e){var t;return(t=qt(e))!=null?t:B(e,"media-controller")}function qt(e){var t;let{MEDIA_CONTROLLER:i}=m,o=e.getAttribute(i);if(o)return(t=Kt(e))==null?void 0:t.getElementById(o)}var fe=(e,t,i=".value")=>{let o=e.querySelector(i);o&&(o.textContent=t)},Gt=(e,t)=>{let i=`slot[name="${t}"]`,o=e.shadowRoot.querySelector(i);return o?o.children:[]},_e=(e,t)=>Gt(e,t)[0],$t=(e,t)=>!e||!t?!1:e!=null&&e.contains(t)?!0:$t(e,t.getRootNode().host),B=(e,t)=>{if(!e)return null;let i=e.closest(t);return i||B(e.getRootNode().host,t)};function Qt(e=document){var t;let i=e==null?void 0:e.activeElement;return i?(t=Qt(i.shadowRoot))!=null?t:i:null}function Kt(e){var t;let i=(t=e==null?void 0:e.getRootNode)==null?void 0:t.call(e);return i instanceof ShadowRoot||i instanceof Document?i:null}function ft(e,{depth:t=3,checkOpacity:i=!0,checkVisibilityCSS:o=!0}={}){if(e.checkVisibility)return e.checkVisibility({checkOpacity:i,checkVisibilityCSS:o});let r=e;for(;r&&t>0;){let a=getComputedStyle(r);if(i&&a.opacity==="0"||o&&a.visibility==="hidden"||a.display==="none")return!1;r=r.parentElement,t--}return!0}function ve(e,t,i,o){let r=o.x-i.x,a=o.y-i.y,n=r*r+a*a;if(n===0)return 0;let u=((e-i.x)*r+(t-i.y)*a)/n;return Math.max(0,Math.min(1,u))}function _t(e,t){let i=Ft(e,o=>o===t);return i||zt(e,t)}function Ft(e,t){var i,o;let r;for(r of(i=e.querySelectorAll("style:not([media])"))!=null?i:[]){let a;try{a=(o=r.sheet)==null?void 0:o.cssRules}catch(n){continue}for(let n of a!=null?a:[])if(t(n.selectorText))return n}}function zt(e,t){var i,o;let r=(i=e.querySelectorAll("style:not([media])"))!=null?i:[],a=r==null?void 0:r[r.length-1];if(!(a!=null&&a.sheet))return console.warn("Media Chrome: No style sheet found on style tag of",e),{style:{setProperty:()=>{},removeProperty:()=>"",getPropertyValue:()=>""}};let n=a==null?void 0:a.sheet.insertRule(`${t}{}`,a.sheet.cssRules.length);return(o=a.sheet.cssRules)==null?void 0:o[n]}function J(e,t,i=Number.NaN){let o=e.getAttribute(t);return o!=null?+o:i}function vt(e,t,i){let o=+i;if(i==null||Number.isNaN(o)){e.hasAttribute(t)&&e.removeAttribute(t);return}J(e,t,void 0)!==o&&e.setAttribute(t,`${o}`)}function V(e,t){return e.hasAttribute(t)}function Z(e,t,i){if(i==null){e.hasAttribute(t)&&e.removeAttribute(t);return}V(e,t)!=i&&e.toggleAttribute(t,i)}function T(e,t,i=null){var o;return(o=e.getAttribute(t))!=null?o:i}function b(e,t,i){if(i==null){e.hasAttribute(t)&&e.removeAttribute(t);return}let o=`${i}`;T(e,t,void 0)!==o&&e.setAttribute(t,o)}var W=class{addEventListener(){}removeEventListener(){}dispatchEvent(){return!0}},q=class extends W{},G=class extends q{constructor(){super(...arguments),this.role=null}},tt=class{observe(){}unobserve(){}disconnect(){}},At={createElement:function(){return new U.HTMLElement},createElementNS:function(){return new U.HTMLElement},addEventListener(){},removeEventListener(){},dispatchEvent(e){return!1}},U={ResizeObserver:tt,document:At,Node:q,Element:G,HTMLElement:class extends G{constructor(){super(...arguments),this.innerHTML=""}get content(){return new U.DocumentFragment}},DocumentFragment:class extends W{},customElements:{get:function(){},define:function(){},whenDefined:function(){}},localStorage:{getItem(e){return null},setItem(e,t){},removeItem(e){}},CustomEvent:function(){},getComputedStyle:function(){},navigator:{languages:[],get userAgent(){return""}},matchMedia(e){return{matches:!1,media:e}},DOMParser:class{parseFromString(t,i){return{body:{textContent:t}}}}},Tt="global"in globalThis&&(globalThis==null?void 0:globalThis.global)===globalThis||typeof window=="undefined"||typeof window.customElements=="undefined",gt=Object.keys(U).every(e=>e in globalThis),d=Tt&&!gt?U:globalThis,Ie=Tt&&!gt?At:globalThis.document;var I={PLACEMENT:"placement",BOUNDS:"bounds"};function Yt(e){return`
    <style>
      :host {
        --_tooltip-background-color: var(--media-tooltip-background-color, var(--media-secondary-color, rgba(20, 20, 30, .7)));
        --_tooltip-background: var(--media-tooltip-background, var(--_tooltip-background-color));
        --_tooltip-arrow-half-width: calc(var(--media-tooltip-arrow-width, 12px) / 2);
        --_tooltip-arrow-height: var(--media-tooltip-arrow-height, 5px);
        --_tooltip-arrow-background: var(--media-tooltip-arrow-color, var(--_tooltip-background-color));
        position: relative;
        pointer-events: none;
        display: var(--media-tooltip-display, inline-flex);
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        z-index: var(--media-tooltip-z-index, 1);
        background: var(--_tooltip-background);
        color: var(--media-text-color, var(--media-primary-color, rgb(238 238 238)));
        font: var(--media-font,
          var(--media-font-weight, 400)
          var(--media-font-size, 13px) /
          var(--media-text-content-height, var(--media-control-height, 18px))
          var(--media-font-family, helvetica neue, segoe ui, roboto, arial, sans-serif));
        padding: var(--media-tooltip-padding, .35em .7em);
        border: var(--media-tooltip-border, none);
        border-radius: var(--media-tooltip-border-radius, 5px);
        filter: var(--media-tooltip-filter, drop-shadow(0 0 4px rgba(0, 0, 0, .2)));
        white-space: var(--media-tooltip-white-space, nowrap);
      }

      :host([hidden]) {
        display: none;
      }

      img, svg {
        display: inline-block;
      }

      #arrow {
        position: absolute;
        width: 0px;
        height: 0px;
        border-style: solid;
        display: var(--media-tooltip-arrow-display, block);
      }

      :host(:not([placement])),
      :host([placement="top"]) {
        position: absolute;
        bottom: calc(100% + var(--media-tooltip-distance, 12px));
        left: 50%;
        transform: translate(calc(-50% - var(--media-tooltip-offset-x, 0px)), 0);
      }
      :host(:not([placement])) #arrow,
      :host([placement="top"]) #arrow {
        top: 100%;
        left: 50%;
        border-width: var(--_tooltip-arrow-height) var(--_tooltip-arrow-half-width) 0 var(--_tooltip-arrow-half-width);
        border-color: var(--_tooltip-arrow-background) transparent transparent transparent;
        transform: translate(calc(-50% + var(--media-tooltip-offset-x, 0px)), 0);
      }

      :host([placement="right"]) {
        position: absolute;
        left: calc(100% + var(--media-tooltip-distance, 12px));
        top: 50%;
        transform: translate(0, -50%);
      }
      :host([placement="right"]) #arrow {
        top: 50%;
        right: 100%;
        border-width: var(--_tooltip-arrow-half-width) var(--_tooltip-arrow-height) var(--_tooltip-arrow-half-width) 0;
        border-color: transparent var(--_tooltip-arrow-background) transparent transparent;
        transform: translate(0, -50%);
      }

      :host([placement="bottom"]) {
        position: absolute;
        top: calc(100% + var(--media-tooltip-distance, 12px));
        left: 50%;
        transform: translate(calc(-50% - var(--media-tooltip-offset-x, 0px)), 0);
      }
      :host([placement="bottom"]) #arrow {
        bottom: 100%;
        left: 50%;
        border-width: 0 var(--_tooltip-arrow-half-width) var(--_tooltip-arrow-height) var(--_tooltip-arrow-half-width);
        border-color: transparent transparent var(--_tooltip-arrow-background) transparent;
        transform: translate(calc(-50% + var(--media-tooltip-offset-x, 0px)), 0);
      }

      :host([placement="left"]) {
        position: absolute;
        right: calc(100% + var(--media-tooltip-distance, 12px));
        top: 50%;
        transform: translate(0, -50%);
      }
      :host([placement="left"]) #arrow {
        top: 50%;
        left: 100%;
        border-width: var(--_tooltip-arrow-half-width) 0 var(--_tooltip-arrow-half-width) var(--_tooltip-arrow-height);
        border-color: transparent transparent transparent var(--_tooltip-arrow-background);
        transform: translate(0, -50%);
      }
      
      :host([placement="none"]) #arrow {
        display: none;
      }
    </style>
    <slot></slot>
    <div id="arrow"></div>
  `}var M=class extends d.HTMLElement{constructor(){if(super(),this.updateXOffset=()=>{var t;if(!ft(this,{checkOpacity:!1,checkVisibilityCSS:!1}))return;let i=this.placement;if(i==="left"||i==="right"){this.style.removeProperty("--media-tooltip-offset-x");return}let o=getComputedStyle(this),r=(t=B(this,"#"+this.bounds))!=null?t:Et(this);if(!r)return;let{x:a,width:n}=r.getBoundingClientRect(),{x:u,width:P}=this.getBoundingClientRect(),yt=u+P,wt=a+n,st=o.getPropertyValue("--media-tooltip-offset-x"),lt=st?parseFloat(st.replace("px","")):0,dt=o.getPropertyValue("--media-tooltip-container-margin"),ct=dt?parseFloat(dt.replace("px","")):0,ut=u-a+lt-ct,ht=yt-wt+lt+ct;if(ut<0){this.style.setProperty("--media-tooltip-offset-x",`${ut}px`);return}if(ht>0){this.style.setProperty("--media-tooltip-offset-x",`${ht}px`);return}this.style.removeProperty("--media-tooltip-offset-x")},!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);let t=H(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(t)}if(this.arrowEl=this.shadowRoot.querySelector("#arrow"),Object.prototype.hasOwnProperty.call(this,"placement")){let t=this.placement;delete this.placement,this.placement=t}}static get observedAttributes(){return[I.PLACEMENT,I.BOUNDS]}get placement(){return T(this,I.PLACEMENT)}set placement(t){b(this,I.PLACEMENT,t)}get bounds(){return T(this,I.BOUNDS)}set bounds(t){b(this,I.BOUNDS,t)}};M.shadowRootOptions={mode:"open"};M.getTemplateHTML=Yt;d.customElements.get("media-tooltip")||d.customElements.define("media-tooltip",M);var et=M;var ot=(e,t,i)=>{if(!t.has(e))throw TypeError("Cannot "+i)},s=(e,t,i)=>(ot(e,t,"read from private field"),i?i.call(e):t.get(e)),S=(e,t,i)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,i)},$=(e,t,i,o)=>(ot(e,t,"write to private field"),o?o.call(e,i):t.set(e,i),i),Xt=(e,t,i)=>(ot(e,t,"access private method"),i),h,R,_,L,Q,it,bt,f={TOOLTIP_PLACEMENT:"tooltipplacement",DISABLED:"disabled",NO_TOOLTIP:"notooltip"};function jt(e,t={}){return`
    <style>
      :host {
        position: relative;
        font: var(--media-font,
          var(--media-font-weight, bold)
          var(--media-font-size, 14px) /
          var(--media-text-content-height, var(--media-control-height, 24px))
          var(--media-font-family, helvetica neue, segoe ui, roboto, arial, sans-serif));
        color: var(--media-text-color, var(--media-primary-color, rgb(238 238 238)));
        background: var(--media-control-background, var(--media-secondary-color, rgb(20 20 30 / .7)));
        padding: var(--media-button-padding, var(--media-control-padding, 10px));
        justify-content: var(--media-button-justify-content, center);
        display: inline-flex;
        align-items: center;
        vertical-align: middle;
        box-sizing: border-box;
        transition: background .15s linear;
        pointer-events: auto;
        cursor: var(--media-cursor, pointer);
        -webkit-tap-highlight-color: transparent;
      }

      
      :host(:focus-visible) {
        box-shadow: var(--media-focus-box-shadow, inset 0 0 0 2px rgb(27 127 204 / .9));
        outline: 0;
      }
      
      :host(:where(:focus)) {
        box-shadow: none;
        outline: 0;
      }

      :host(:hover) {
        background: var(--media-control-hover-background, rgba(50 50 70 / .7));
      }

      slot[name="icon"] {
        display: inline-flex;
        align-items: center;
      }

      svg, img, ::slotted(svg), ::slotted(img) {
        width: var(--media-button-icon-width);
        height: var(--media-button-icon-height, var(--media-control-height, 24px));
        transform: var(--media-button-icon-transform);
        transition: var(--media-button-icon-transition);
        fill: var(--media-icon-color, var(--media-primary-color, rgb(238 238 238)));
        vertical-align: middle;
        max-width: 100%;
        max-height: 100%;
        min-width: 100%;
      }

      media-tooltip {
        
        max-width: 0;
        overflow-x: clip;
        opacity: 0;
        transition: opacity .3s, max-width 0s 9s;
      }

      :host(:hover) media-tooltip,
      :host(:focus-visible) media-tooltip {
        max-width: 100vw;
        opacity: 1;
        transition: opacity .3s;
      }

      :host([notooltip]) slot[name="tooltip"] {
        display: none;
      }
    </style>

    ${this.getSlotTemplateHTML(e,t)}

    <slot name="tooltip">
      <media-tooltip part="tooltip" aria-hidden="true">
        <template shadowrootmode="${et.shadowRootOptions.mode}">
          ${et.getTemplateHTML({})}
        </template>
        <slot name="tooltip-content">
          ${this.getTooltipContentHTML(e)}
        </slot>
      </media-tooltip>
    </slot>
  `}function Jt(e,t){return`
    <slot></slot>
  `}function Zt(){return""}var p=class extends d.HTMLElement{constructor(){if(super(),S(this,it),S(this,h,void 0),this.preventClick=!1,this.tooltipEl=null,S(this,R,t=>{this.preventClick||this.handleClick(t),setTimeout(s(this,_),0)}),S(this,_,()=>{var t,i;(i=(t=this.tooltipEl)==null?void 0:t.updateXOffset)==null||i.call(t)}),S(this,L,t=>{let{key:i}=t;if(!this.keysUsed.includes(i)){this.removeEventListener("keyup",s(this,L));return}this.preventClick||this.handleClick(t)}),S(this,Q,t=>{let{metaKey:i,altKey:o,key:r}=t;if(i||o||!this.keysUsed.includes(r)){this.removeEventListener("keyup",s(this,L));return}this.addEventListener("keyup",s(this,L),{once:!0})}),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);let t=H(this.attributes),i=this.constructor.getTemplateHTML(t);this.shadowRoot.setHTMLUnsafe?this.shadowRoot.setHTMLUnsafe(i):this.shadowRoot.innerHTML=i}this.tooltipEl=this.shadowRoot.querySelector("media-tooltip")}static get observedAttributes(){return["disabled",f.TOOLTIP_PLACEMENT,m.MEDIA_CONTROLLER,c.MEDIA_LANG]}enable(){this.addEventListener("click",s(this,R)),this.addEventListener("keydown",s(this,Q)),this.tabIndex=0}disable(){this.removeEventListener("click",s(this,R)),this.removeEventListener("keydown",s(this,Q)),this.removeEventListener("keyup",s(this,L)),this.tabIndex=-1}attributeChangedCallback(t,i,o){var r,a,n,u,P;t===m.MEDIA_CONTROLLER?(i&&((a=(r=s(this,h))==null?void 0:r.unassociateElement)==null||a.call(r,this),$(this,h,null)),o&&this.isConnected&&($(this,h,(n=this.getRootNode())==null?void 0:n.getElementById(o)),(P=(u=s(this,h))==null?void 0:u.associateElement)==null||P.call(u,this))):t==="disabled"&&o!==i?o==null?this.enable():this.disable():t===f.TOOLTIP_PLACEMENT&&this.tooltipEl&&o!==i?this.tooltipEl.placement=o:t===c.MEDIA_LANG&&(this.shadowRoot.querySelector('slot[name="tooltip-content"]').innerHTML=this.constructor.getTooltipContentHTML()),s(this,_).call(this)}connectedCallback(){var t,i,o;let{style:r}=_t(this.shadowRoot,":host");r.setProperty("display",`var(--media-control-display, var(--${this.localName}-display, inline-flex))`),this.hasAttribute("disabled")?this.disable():this.enable(),this.setAttribute("role","button");let a=this.getAttribute(m.MEDIA_CONTROLLER);a&&($(this,h,(t=this.getRootNode())==null?void 0:t.getElementById(a)),(o=(i=s(this,h))==null?void 0:i.associateElement)==null||o.call(i,this)),d.customElements.whenDefined("media-tooltip").then(()=>Xt(this,it,bt).call(this))}disconnectedCallback(){var t,i;this.disable(),(i=(t=s(this,h))==null?void 0:t.unassociateElement)==null||i.call(t,this),$(this,h,null),this.removeEventListener("mouseenter",s(this,_)),this.removeEventListener("focus",s(this,_)),this.removeEventListener("click",s(this,R))}get keysUsed(){return["Enter"," "]}get tooltipPlacement(){return T(this,f.TOOLTIP_PLACEMENT)}set tooltipPlacement(t){b(this,f.TOOLTIP_PLACEMENT,t)}get mediaController(){return T(this,m.MEDIA_CONTROLLER)}set mediaController(t){b(this,m.MEDIA_CONTROLLER,t)}get disabled(){return V(this,f.DISABLED)}set disabled(t){Z(this,f.DISABLED,t)}get noTooltip(){return V(this,f.NO_TOOLTIP)}set noTooltip(t){Z(this,f.NO_TOOLTIP,t)}handleClick(t){}};h=new WeakMap;R=new WeakMap;_=new WeakMap;L=new WeakMap;Q=new WeakMap;it=new WeakSet;bt=function(){this.addEventListener("mouseenter",s(this,_)),this.addEventListener("focus",s(this,_)),this.addEventListener("click",s(this,R));let e=this.tooltipPlacement;e&&this.tooltipEl&&(this.tooltipEl.placement=e)};p.shadowRootOptions={mode:"open"};p.getTemplateHTML=jt;p.getSlotTemplateHTML=Jt;p.getTooltipContentHTML=Zt;d.customElements.get("media-chrome-button")||d.customElements.define("media-chrome-button",p);var ke=p;var It=(e,t,i)=>{if(!t.has(e))throw TypeError("Cannot "+i)},l=(e,t,i)=>(It(e,t,"read from private field"),i?i.call(e):t.get(e)),x=(e,t,i)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,i)},K=(e,t,i,o)=>(It(e,t,"write to private field"),o?o.call(e,i):t.set(e,i),i),y,w,F,g,E,v,z=class{constructor(t,i,{defaultValue:o}={defaultValue:void 0}){x(this,E),x(this,y,void 0),x(this,w,void 0),x(this,F,void 0),x(this,g,new Set),K(this,y,t),K(this,w,i),K(this,F,new Set(o))}[Symbol.iterator](){return l(this,E,v).values()}get length(){return l(this,E,v).size}get value(){var t;return(t=[...l(this,E,v)].join(" "))!=null?t:""}set value(t){var i;t!==this.value&&(K(this,g,new Set),this.add(...(i=t==null?void 0:t.split(" "))!=null?i:[]))}toString(){return this.value}item(t){return[...l(this,E,v)][t]}values(){return l(this,E,v).values()}forEach(t,i){l(this,E,v).forEach(t,i)}add(...t){var i,o;t.forEach(r=>l(this,g).add(r)),!(this.value===""&&!((i=l(this,y))!=null&&i.hasAttribute(`${l(this,w)}`)))&&((o=l(this,y))==null||o.setAttribute(`${l(this,w)}`,`${this.value}`))}remove(...t){var i;t.forEach(o=>l(this,g).delete(o)),(i=l(this,y))==null||i.setAttribute(`${l(this,w)}`,`${this.value}`)}contains(t){return l(this,E,v).has(t)}toggle(t,i){return typeof i!="undefined"?i?(this.add(t),!0):(this.remove(t),!1):this.contains(t)?(this.remove(t),!1):(this.add(t),!0)}replace(t,i){return this.remove(t),this.add(i),t===i}};y=new WeakMap;w=new WeakMap;F=new WeakMap;g=new WeakMap;E=new WeakSet;v=function(){return l(this,g).size?l(this,g):l(this,F)};var te=(e,t,i)=>{if(!t.has(e))throw TypeError("Cannot "+i)},D=(e,t,i)=>(te(e,t,"read from private field"),i?i.call(e):t.get(e)),ee=(e,t,i)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,i)},A,rt={RATES:"rates"},ie=[1,1.2,1.5,1.7,2],N=1;function at(e){return Math.round(e*100)/100}function oe(e){return`
    <style>
      :host {
        min-width: 5ch;
        padding: var(--media-button-padding, var(--media-control-padding, 10px 5px));
      }
    </style>
    <slot name="icon">${e.mediaplaybackrate?at(+e.mediaplaybackrate):N}x</slot>
  `}function re(){return Y("Playback rate")}var C=class extends p{constructor(){var t;super(),ee(this,A,new z(this,rt.RATES,{defaultValue:ie})),this.container=this.shadowRoot.querySelector('slot[name="icon"]'),this.container.innerHTML=`${at((t=this.mediaPlaybackRate)!=null?t:N)}x`}static get observedAttributes(){return[...super.observedAttributes,c.MEDIA_PLAYBACK_RATE,rt.RATES]}attributeChangedCallback(t,i,o){if(super.attributeChangedCallback(t,i,o),t===rt.RATES&&(D(this,A).value=o),t===c.MEDIA_PLAYBACK_RATE){let r=o?+o:Number.NaN,a=at(Number.isNaN(r)?N:r);this.container.innerHTML=`${a}x`,this.setAttribute("aria-label",Y("Playback rate {playbackRate}",{playbackRate:a}))}}get rates(){return D(this,A)}set rates(t){t?Array.isArray(t)?D(this,A).value=t.join(" "):typeof t=="string"&&(D(this,A).value=t):D(this,A).value=""}get mediaPlaybackRate(){return J(this,c.MEDIA_PLAYBACK_RATE,N)}set mediaPlaybackRate(t){vt(this,c.MEDIA_PLAYBACK_RATE,t)}handleClick(){var t,i;let o=Array.from(D(this,A).values(),n=>+n).sort((n,u)=>n-u),r=(i=(t=o.find(n=>n>this.mediaPlaybackRate))!=null?t:o[0])!=null?i:N,a=new d.CustomEvent(X.MEDIA_PLAYBACK_RATE_REQUEST,{composed:!0,bubbles:!0,detail:r});this.dispatchEvent(a)}};A=new WeakMap;C.getSlotTemplateHTML=oe;C.getTooltipContentHTML=re;d.customElements.get("media-playback-rate-button")||d.customElements.define("media-playback-rate-button",C);var We=C;function Ge(e){return e==null?void 0:e.map(ae).join(" ")}function $e(e){return e==null?void 0:e.split(/\s+/).map(ne)}function ae(e){if(e){let{id:t,width:i,height:o}=e;return[t,i,o].filter(r=>r!=null).join(":")}}function ne(e){if(e){let[t,i,o]=e.split(":");return{id:t,width:+i,height:+o}}}function Qe(e){return e==null?void 0:e.map(se).join(" ")}function Ke(e){return e==null?void 0:e.split(/\s+/).map(le)}function se(e){if(e){let{id:t,kind:i,language:o,label:r}=e;return[t,i,o,r].filter(a=>a!=null).join(":")}}function le(e){if(e){let[t,i,o,r]=e.split(":");return{id:t,kind:i,language:o,label:r}}}function Fe(e){return e.replace(/[-_]([a-z])/g,(t,i)=>i.toUpperCase())}function ze(e){return typeof e=="number"&&!Number.isNaN(e)&&Number.isFinite(e)}function Ye(e){return typeof e!="string"?!1:!isNaN(e)&&!isNaN(parseFloat(e))}var Xe=e=>new Promise(t=>setTimeout(t,e));var Mt=new WeakMap,nt=e=>{let t=Mt.get(e);return t||Mt.set(e,t=new Set),t},St=new d.ResizeObserver(e=>{for(let t of e)for(let i of nt(t.target))i(t)});function Ze(e,t){nt(e).add(t),St.observe(e)}function ti(e,t){let i=nt(e);i.delete(t),i.size||St.unobserve(e)}var de=(e="")=>e.split(/\s+/),Lt=(e="")=>{let[t,i,o]=e.split(":"),r=o?decodeURIComponent(o):void 0;return{kind:t==="cc"?O.CAPTIONS:O.SUBTITLES,language:i,label:r}},ce=(e="",t={})=>de(e).map(i=>{let o=Lt(i);return k(k({},t),o)}),ue=e=>e?Array.isArray(e)?e.map(t=>typeof t=="string"?Lt(t):t):typeof e=="string"?ce(e):[e]:[],he=({kind:e,label:t,language:i}={kind:"subtitles"})=>t?`${e==="captions"?"cc":"sb"}:${i}:${encodeURIComponent(t)}`:i,oi=(e=[])=>Array.prototype.map.call(e,he).join(" "),pe=(e,t)=>i=>i[e]===t,Rt=e=>{let t=Object.entries(e).map(([i,o])=>pe(i,o));return i=>t.every(o=>o(i))},ri=(e,t=[],i=[])=>{let o=ue(i).map(Rt),r=a=>o.some(n=>n(a));Array.from(t).filter(r).forEach(a=>{a.mode=e})},ai=(e,t=()=>!0)=>{if(!(e!=null&&e.textTracks))return[];let i=typeof t=="function"?t:Rt(t);return Array.from(e.textTracks).filter(i)},ni=e=>{var t;return!!((t=e.mediaSubtitlesShowing)!=null&&t.length)||e.hasAttribute(c.MEDIA_SUBTITLES_SHOWING)};export{X as a,m as b,pt as c,c as d,j as e,Ut as f,O as g,xt as h,Pt as i,Ot as j,Ht as k,Vt as l,Wt as m,Ge as n,$e as o,Qe as p,Ke as q,Fe as r,ze as s,Ye as t,Xe as u,d as v,Ie as w,Ze as x,ti as y,H as z,Et as A,qt as B,fe as C,_e as D,$t as E,B as F,Qt as G,Kt as H,ft as I,ve as J,_t as K,zt as L,J as M,vt as N,V as O,Z as P,T as Q,b as R,z as S,ce as T,ue as U,he as V,oi as W,ri as X,ai as Y,ni as Z,et as _,p as $,ke as aa,ie as ba,N as ca,at as da,We as ea};
