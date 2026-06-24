/* Renuvex Product Reviews ESM runtime | theme: default */
import{$ as F,C as gi,D as bi,E as we,F as Ai,G as rs,I as ss,J as os,K as U,L as ns,M as C,N as O,O as b,P as g,Q as R,R as L,S as ls,T as ds,U as cs,W as Bt,X as We,Y as Ve,Z as us,a as h,b as w,c as jr,d as s,e as $t,f as es,g as se,h as De,i as Ei,j as X,k as oe,l as ts,n as is,p as as,s as et,u as vi,v as n,w as B,x as fi,y as _i,z as K}from"./chunk-F2BFFALM.js";import{a as Xr,c as Jr,d as m}from"./chunk-JAGRGK2W.js";import{a as Le,d as Ko}from"./chunk-D4BSMMIO.js";var ps={};Ko(ps,{emptyTimeRanges:()=>ms,formatAsTimePhrase:()=>Oe,formatTime:()=>ee,serializeTimeRanges:()=>Yo});var hs=[{singular:"hour",plural:"hours"},{singular:"minute",plural:"minutes"},{singular:"second",plural:"seconds"}],Go=(t,e)=>{let i=t===1?m(hs[e].singular):m(hs[e].plural);return`${t} ${i}`},Oe=t=>{if(!et(t))return"";let e=Math.abs(t),i=e!==t,a=new Date(0,0,0,0,0,e,0),o=[a.getHours(),a.getMinutes(),a.getSeconds()].map((l,d)=>l&&Go(l,d)).filter(l=>l).join(", ");return i?m("{time} remaining",{time:o}):o};function ee(t,e){let i=!1;t<0&&(i=!0,t=0-t),t=t<0?0:t;let a=Math.floor(t%60),r=Math.floor(t/60%60),o=Math.floor(t/3600),l=Math.floor(e/60%60),d=Math.floor(e/3600);return(isNaN(t)||t===1/0)&&(o=r=a="0"),o=o>0||d>0?o+":":"",r=((o||l>=10)&&r<10?"0"+r:r)+":",a=a<10?"0"+a:a,(i?"-":"")+o+r+a}var ms=Object.freeze({length:0,start(t){let e=t>>>0;if(e>=this.length)throw new DOMException(`Failed to execute 'start' on 'TimeRanges': The index provided (${e}) is greater than or equal to the maximum bound (${this.length}).`);return 0},end(t){let e=t>>>0;if(e>=this.length)throw new DOMException(`Failed to execute 'end' on 'TimeRanges': The index provided (${e}) is greater than or equal to the maximum bound (${this.length}).`);return 0}});function Yo(t=ms){return Array.from(t).map((e,i)=>[Number(t.start(i).toFixed(3)),Number(t.end(i).toFixed(3))].join(":")).join(" ")}var Es=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},ne=(t,e,i)=>(Es(t,e,"read from private field"),i?i.call(t):e.get(t)),qo=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},Ti=(t,e,i,a)=>(Es(t,e,"write to private field"),a?a.call(t,i):e.set(t,i),i),Y;function Qo(t){return`
    <style>
      :host {
        display: var(--media-control-display, var(--media-gesture-receiver-display, inline-block));
        box-sizing: border-box;
      }
    </style>
  `}var tt=class extends n.HTMLElement{constructor(){if(super(),qo(this,Y,void 0),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);let e=K(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}}static get observedAttributes(){return[w.MEDIA_CONTROLLER,s.MEDIA_PAUSED]}attributeChangedCallback(e,i,a){var r,o,l,d,c;e===w.MEDIA_CONTROLLER&&(i&&((o=(r=ne(this,Y))==null?void 0:r.unassociateElement)==null||o.call(r,this),Ti(this,Y,null)),a&&this.isConnected&&(Ti(this,Y,(l=this.getRootNode())==null?void 0:l.getElementById(a)),(c=(d=ne(this,Y))==null?void 0:d.associateElement)==null||c.call(d,this)))}connectedCallback(){var e,i;this.tabIndex=-1,this.setAttribute("aria-hidden","true"),Ti(this,Y,zo(this)),this.getAttribute(w.MEDIA_CONTROLLER)&&((i=(e=ne(this,Y))==null?void 0:e.associateElement)==null||i.call(e,this)),ne(this,Y)&&(ne(this,Y).addEventListener("pointerdown",this),ne(this,Y).addEventListener("click",this),ne(this,Y).hasAttribute("tabindex")||(ne(this,Y).tabIndex=0))}disconnectedCallback(){var e,i,a,r;this.getAttribute(w.MEDIA_CONTROLLER)&&((i=(e=ne(this,Y))==null?void 0:e.unassociateElement)==null||i.call(e,this)),(a=ne(this,Y))==null||a.removeEventListener("pointerdown",this),(r=ne(this,Y))==null||r.removeEventListener("click",this),Ti(this,Y,null)}handleEvent(e){var i;let a=(i=e.composedPath())==null?void 0:i[0];if(["video","media-controller"].includes(a==null?void 0:a.localName)){if(e.type==="pointerdown")this._pointerType=e.pointerType;else if(e.type==="click"){let{clientX:o,clientY:l}=e,{left:d,top:c,width:k,height:S}=this.getBoundingClientRect(),I=o-d,f=l-c;if(I<0||f<0||I>k||f>S||k===0&&S===0)return;let p=this._pointerType||"mouse";if(this._pointerType=void 0,p===Ei.TOUCH){this.handleTap(e);return}else if(p===Ei.MOUSE||p===Ei.PEN){this.handleMouseClick(e);return}}}}get mediaPaused(){return b(this,s.MEDIA_PAUSED)}set mediaPaused(e){g(this,s.MEDIA_PAUSED,e)}handleTap(e){}handleMouseClick(e){let i=this.mediaPaused?h.MEDIA_PLAY_REQUEST:h.MEDIA_PAUSE_REQUEST;this.dispatchEvent(new n.CustomEvent(i,{composed:!0,bubbles:!0}))}};Y=new WeakMap;tt.shadowRootOptions={mode:"open"};tt.getTemplateHTML=Qo;function zo(t){var e;let i=t.getAttribute(w.MEDIA_CONTROLLER);return i?(e=t.getRootNode())==null?void 0:e.getElementById(i):Ai(t,"media-controller")}n.customElements.get("media-gesture-receiver")||n.customElements.define("media-gesture-receiver",tt);var Ii=tt;var xa=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},H=(t,e,i)=>(xa(t,e,"read from private field"),i?i.call(t):e.get(t)),z=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},le=(t,e,i,a)=>(xa(t,e,"write to private field"),a?a.call(t,i):e.set(t,i),i),de=(t,e,i)=>(xa(t,e,"access private method"),i),Wt,Mi,it,st,rt,Da,at,Si,Oa,vs,Ua,fs,Vt,yi,Li,Pa,ot,Kt,Ue,ki,_={AUDIO:"audio",AUTOHIDE:"autohide",BREAKPOINTS:"breakpoints",GESTURES_DISABLED:"gesturesdisabled",KEYBOARD_CONTROL:"keyboardcontrol",NO_AUTOHIDE:"noautohide",USER_INACTIVE:"userinactive",AUTOHIDE_OVER_CONTROLS:"autohideovercontrols"};function Zo(t){return`
    <style>
      
      :host([${s.MEDIA_IS_FULLSCREEN}]) ::slotted([slot=media]) {
        outline: none;
      }

      :host {
        box-sizing: border-box;
        position: relative;
        display: inline-block;
        line-height: 0;
        background-color: var(--media-background-color, #000);
        overflow: hidden;
      }

      :host(:not([${_.AUDIO}])) [part~=layer]:not([part~=media-layer]) {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        display: flex;
        flex-flow: column nowrap;
        align-items: start;
        pointer-events: none;
        background: none;
      }

      slot[name=media] {
        display: var(--media-slot-display, contents);
      }

      
      :host([${_.AUDIO}]) slot[name=media] {
        display: var(--media-slot-display, none);
      }

      
      :host([${_.AUDIO}]) [part~=layer][part~=gesture-layer] {
        height: 0;
        display: block;
      }

      
      :host(:not([${_.AUDIO}])[${_.GESTURES_DISABLED}]) ::slotted([slot=gestures-chrome]),
          :host(:not([${_.AUDIO}])[${_.GESTURES_DISABLED}]) media-gesture-receiver[slot=gestures-chrome] {
        display: none;
      }

      
      ::slotted(:not([slot=media]):not([slot=poster]):not(media-loading-indicator):not([role=dialog]):not([hidden])) {
        pointer-events: auto;
      }

      :host(:not([${_.AUDIO}])) *[part~=layer][part~=centered-layer] {
        align-items: center;
        justify-content: center;
      }

      :host(:not([${_.AUDIO}])) ::slotted(media-gesture-receiver[slot=gestures-chrome]),
      :host(:not([${_.AUDIO}])) media-gesture-receiver[slot=gestures-chrome] {
        align-self: stretch;
        flex-grow: 1;
      }

      slot[name=middle-chrome] {
        display: inline;
        flex-grow: 1;
        pointer-events: none;
        background: none;
      }

      
      ::slotted([slot=media]),
      ::slotted([slot=poster]) {
        width: 100%;
        height: 100%;
      }

      
      :host(:not([${_.AUDIO}])) .spacer {
        flex-grow: 1;
      }

      
      :host(:-webkit-full-screen) {
        
        width: 100% !important;
        height: 100% !important;
      }

      
      ::slotted(:not([slot=media]):not([slot=poster]):not([${_.NO_AUTOHIDE}]):not([hidden]):not([role=dialog])) {
        opacity: 1;
        transition: var(--media-control-transition-in, opacity 0.25s);
      }

      
      :host([${_.USER_INACTIVE}]:not([${s.MEDIA_PAUSED}]):not([${s.MEDIA_IS_AIRPLAYING}]):not([${s.MEDIA_IS_CASTING}]):not([${_.AUDIO}])) ::slotted(:not([slot=media]):not([slot=poster]):not([${_.NO_AUTOHIDE}]):not([role=dialog])) {
        opacity: 0;
        transition: var(--media-control-transition-out, opacity 1s);
      }

      :host([${_.USER_INACTIVE}]:not([${_.NO_AUTOHIDE}]):not([${s.MEDIA_PAUSED}]):not([${s.MEDIA_IS_CASTING}]):not([${_.AUDIO}])) ::slotted([slot=media]) {
        cursor: none;
      }

      :host([${_.USER_INACTIVE}][${_.AUTOHIDE_OVER_CONTROLS}]:not([${_.NO_AUTOHIDE}]):not([${s.MEDIA_PAUSED}]):not([${s.MEDIA_IS_CASTING}]):not([${_.AUDIO}])) * {
        --media-cursor: none;
        cursor: none;
      }


      ::slotted(media-control-bar)  {
        align-self: stretch;
      }

      
      :host(:not([${_.AUDIO}])[${s.MEDIA_HAS_PLAYED}]) slot[name=poster] {
        display: none;
      }

      ::slotted([role=dialog]) {
        width: 100%;
        height: 100%;
        align-self: center;
      }

      ::slotted([role=menu]) {
        align-self: end;
      }
    </style>

    <slot name="media" part="layer media-layer"></slot>
    <slot name="poster" part="layer poster-layer"></slot>
    <slot name="gestures-chrome" part="layer gesture-layer">
      <media-gesture-receiver slot="gestures-chrome">
        <template shadowrootmode="${Ii.shadowRootOptions.mode}">
          ${Ii.getTemplateHTML({})}
        </template>
      </media-gesture-receiver>
    </slot>
    <span part="layer vertical-layer">
      <slot name="top-chrome" part="top chrome"></slot>
      <slot name="middle-chrome" part="middle chrome"></slot>
      <slot name="centered-chrome" part="layer centered-layer center centered chrome"></slot>
      
      <slot part="bottom chrome"></slot>
    </span>
    <slot name="dialog" part="layer dialog-layer"></slot>
  `}var Xo=Object.values(s),Jo="sm:384 md:576 lg:768 xl:960";function jo(t){_s(t.target,t.contentRect.width)}function _s(t,e){var i;if(!t.isConnected)return;let a=(i=t.getAttribute(_.BREAKPOINTS))!=null?i:Jo,r=en(a),o=tn(r,e),l=!1;if(Object.keys(r).forEach(d=>{if(o.includes(d)){t.hasAttribute(`breakpoint${d}`)||(t.setAttribute(`breakpoint${d}`,""),l=!0);return}t.hasAttribute(`breakpoint${d}`)&&(t.removeAttribute(`breakpoint${d}`),l=!0)}),l){let d=new CustomEvent($t.BREAKPOINTS_CHANGE,{detail:o});t.dispatchEvent(d)}t.breakpointsComputed||(t.breakpointsComputed=!0,t.dispatchEvent(new CustomEvent($t.BREAKPOINTS_COMPUTED,{bubbles:!0,composed:!0})))}function en(t){let e=t.split(/\s+/);return Object.fromEntries(e.map(i=>i.split(":")))}function tn(t,e){return Object.keys(t).filter(i=>e>=parseInt(t[i]))}var xe=class extends n.HTMLElement{constructor(){if(super(),z(this,Oa),z(this,Ua),z(this,Vt),z(this,Li),z(this,ot),z(this,Wt,void 0),z(this,Mi,0),z(this,it,null),z(this,st,null),z(this,rt,void 0),this.breakpointsComputed=!1,z(this,Da,e=>{let i=this.media;for(let a of e){if(a.type!=="childList")continue;let r=a.removedNodes;for(let o of r){if(o.slot!="media"||a.target!=this)continue;let l=a.previousSibling&&a.previousSibling.previousElementSibling;if(!l||!i)this.mediaUnsetCallback(o);else{let d=l.slot!=="media";for(;(l=l.previousSibling)!==null;)l.slot=="media"&&(d=!1);d&&this.mediaUnsetCallback(o)}}if(i)for(let o of a.addedNodes)o===i&&this.handleMediaUpdated(i)}}),z(this,at,!1),z(this,Si,e=>{H(this,at)||(setTimeout(()=>{jo(e),le(this,at,!1)},0),le(this,at,!0))}),z(this,Ue,void 0),z(this,ki,()=>{if(!H(this,Ue).assignedElements({flatten:!0}).length){H(this,it)&&this.mediaUnsetCallback(H(this,it));return}this.handleMediaUpdated(this.media)}),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);let e=K(this.attributes),i=this.constructor.getTemplateHTML(e);this.shadowRoot.setHTMLUnsafe?this.shadowRoot.setHTMLUnsafe(i):this.shadowRoot.innerHTML=i}le(this,Wt,new MutationObserver(H(this,Da)))}static get observedAttributes(){return[_.AUTOHIDE,_.GESTURES_DISABLED].concat(Xo).filter(e=>![s.MEDIA_RENDITION_LIST,s.MEDIA_AUDIO_TRACK_LIST,s.MEDIA_CHAPTERS_CUES,s.MEDIA_WIDTH,s.MEDIA_HEIGHT,s.MEDIA_ERROR,s.MEDIA_ERROR_MESSAGE].includes(e))}attributeChangedCallback(e,i,a){e.toLowerCase()==_.AUTOHIDE&&(this.autohide=a)}get media(){let e=this.querySelector(":scope > [slot=media]");return(e==null?void 0:e.nodeName)=="SLOT"&&(e=e.assignedElements({flatten:!0})[0]),e}async handleMediaUpdated(e){e&&(le(this,it,e),e.localName.includes("-")&&await n.customElements.whenDefined(e.localName),this.mediaSetCallback(e))}connectedCallback(){var e;H(this,Wt).observe(this,{childList:!0,subtree:!0}),fi(this,H(this,Si));let a=this.getAttribute(_.AUDIO)!=null?m("audio player"):m("video player");this.setAttribute("role","region"),this.setAttribute("aria-label",a),this.handleMediaUpdated(this.media),this.setAttribute(_.USER_INACTIVE,""),_s(this,this.getBoundingClientRect().width);let r=this.querySelector(":scope > slot[slot=media]");r&&(le(this,Ue,r),H(this,Ue).addEventListener("slotchange",H(this,ki))),this.addEventListener("pointerdown",this),this.addEventListener("pointermove",this),this.addEventListener("pointerup",this),this.addEventListener("mouseleave",this),this.addEventListener("keyup",this),(e=n.window)==null||e.addEventListener("mouseup",this)}disconnectedCallback(){var e;_i(this,H(this,Si)),clearTimeout(H(this,st)),H(this,Wt).disconnect(),this.media&&this.mediaUnsetCallback(this.media),(e=n.window)==null||e.removeEventListener("mouseup",this),this.removeEventListener("pointerdown",this),this.removeEventListener("pointermove",this),this.removeEventListener("pointerup",this),this.removeEventListener("mouseleave",this),this.removeEventListener("keyup",this),H(this,Ue)&&(H(this,Ue).removeEventListener("slotchange",H(this,ki)),le(this,Ue,null)),le(this,at,!1)}mediaSetCallback(e){}mediaUnsetCallback(e){le(this,it,null)}handleEvent(e){switch(e.type){case"pointerdown":le(this,Mi,e.timeStamp);break;case"pointermove":de(this,Oa,vs).call(this,e);break;case"pointerup":de(this,Ua,fs).call(this,e);break;case"mouseleave":de(this,Vt,yi).call(this);break;case"mouseup":this.removeAttribute(_.KEYBOARD_CONTROL);break;case"keyup":de(this,ot,Kt).call(this),this.setAttribute(_.KEYBOARD_CONTROL,"");break}}set autohide(e){let i=Number(e);le(this,rt,isNaN(i)?0:i)}get autohide(){return(H(this,rt)===void 0?2:H(this,rt)).toString()}get breakpoints(){return R(this,_.BREAKPOINTS)}set breakpoints(e){L(this,_.BREAKPOINTS,e)}get audio(){return b(this,_.AUDIO)}set audio(e){g(this,_.AUDIO,e)}get gesturesDisabled(){return b(this,_.GESTURES_DISABLED)}set gesturesDisabled(e){g(this,_.GESTURES_DISABLED,e)}get keyboardControl(){return b(this,_.KEYBOARD_CONTROL)}set keyboardControl(e){g(this,_.KEYBOARD_CONTROL,e)}get noAutohide(){return b(this,_.NO_AUTOHIDE)}set noAutohide(e){g(this,_.NO_AUTOHIDE,e)}get autohideOverControls(){return b(this,_.AUTOHIDE_OVER_CONTROLS)}set autohideOverControls(e){g(this,_.AUTOHIDE_OVER_CONTROLS,e)}get userInteractive(){return b(this,_.USER_INACTIVE)}set userInteractive(e){g(this,_.USER_INACTIVE,e)}};Wt=new WeakMap;Mi=new WeakMap;it=new WeakMap;st=new WeakMap;rt=new WeakMap;Da=new WeakMap;at=new WeakMap;Si=new WeakMap;Oa=new WeakSet;vs=function(t){if(t.pointerType!=="mouse"&&t.timeStamp-H(this,Mi)<250)return;de(this,Li,Pa).call(this),clearTimeout(H(this,st));let e=this.hasAttribute(_.AUTOHIDE_OVER_CONTROLS);([this,this.media].includes(t.target)||e)&&de(this,ot,Kt).call(this)};Ua=new WeakSet;fs=function(t){if(t.pointerType==="touch"){let e=!this.hasAttribute(_.USER_INACTIVE);[this,this.media].includes(t.target)&&e?de(this,Vt,yi).call(this):de(this,ot,Kt).call(this)}else t.composedPath().some(e=>["media-play-button","media-fullscreen-button"].includes(e==null?void 0:e.localName))&&de(this,ot,Kt).call(this)};Vt=new WeakSet;yi=function(){if(H(this,rt)<0||this.hasAttribute(_.USER_INACTIVE))return;this.setAttribute(_.USER_INACTIVE,"");let t=new n.CustomEvent($t.USER_INACTIVE_CHANGE,{composed:!0,bubbles:!0,detail:!0});this.dispatchEvent(t)};Li=new WeakSet;Pa=function(){if(!this.hasAttribute(_.USER_INACTIVE))return;this.removeAttribute(_.USER_INACTIVE);let t=new n.CustomEvent($t.USER_INACTIVE_CHANGE,{composed:!0,bubbles:!0,detail:!1});this.dispatchEvent(t)};ot=new WeakSet;Kt=function(){de(this,Li,Pa).call(this),clearTimeout(H(this,st));let t=parseInt(this.autohide);t<0||le(this,st,setTimeout(()=>{de(this,Vt,yi).call(this)},t*1e3))};Ue=new WeakMap;ki=new WeakMap;xe.shadowRootOptions={mode:"open"};xe.getTemplateHTML=Zo;n.customElements.get("media-container")||n.customElements.define("media-container",xe);var an=xe;var bs=t=>{var e;let{media:i,fullscreenElement:a}=t;try{let r=a&&"requestFullscreen"in a?"requestFullscreen":a&&"webkitRequestFullScreen"in a?"webkitRequestFullScreen":void 0;if(r){let o=(e=a[r])==null?void 0:e.call(a);if(o instanceof Promise)return o.catch(()=>{})}else i!=null&&i.webkitEnterFullscreen?i.webkitEnterFullscreen():i!=null&&i.requestFullscreen&&i.requestFullscreen()}catch(r){console.error(r)}},gs="exitFullscreen"in B?"exitFullscreen":"webkitExitFullscreen"in B?"webkitExitFullscreen":"webkitCancelFullScreen"in B?"webkitCancelFullScreen":void 0,As=t=>{var e;let{documentElement:i}=t;if(gs){let a=(e=i==null?void 0:i[gs])==null?void 0:e.call(i);if(a instanceof Promise)return a.catch(()=>{})}},Gt="fullscreenElement"in B?"fullscreenElement":"webkitFullscreenElement"in B?"webkitFullscreenElement":void 0,rn=t=>{let{documentElement:e,media:i}=t,a=e==null?void 0:e[Gt];return!a&&"webkitDisplayingFullscreen"in i&&"webkitPresentationMode"in i&&i.webkitDisplayingFullscreen&&i.webkitPresentationMode===ts.FULLSCREEN?i:a},Ts=t=>{var e;let{media:i,documentElement:a,fullscreenElement:r=i}=t;if(!i||!a)return!1;let o=rn(t);if(!o)return!1;if(o===r||o===i)return!0;if(o.localName.includes("-")){let l=o.shadowRoot;if(!(Gt in l))return we(o,r);for(;l!=null&&l[Gt];){if(l[Gt]===r)return!0;l=(e=l[Gt])==null?void 0:e.shadowRoot}}return!1},sn="fullscreenEnabled"in B?"fullscreenEnabled":"webkitFullscreenEnabled"in B?"webkitFullscreenEnabled":void 0,Is=t=>{let{documentElement:e,media:i}=t;return!!(e!=null&&e[sn])||i&&"webkitSupportsFullscreen"in i};var wi,Na=()=>{var t,e;return wi||(wi=(e=(t=B)==null?void 0:t.createElement)==null?void 0:e.call(t,"video"),wi)},Ss=async(t=Na())=>{if(!t)return!1;let e=t.volume;t.volume=e/2+.1;let i=new AbortController,a=await Promise.race([on(t,i.signal),nn(t,e)]);return i.abort(),a},on=(t,e)=>new Promise(i=>{t.addEventListener("volumechange",()=>i(!0),{signal:e})}),nn=async(t,e)=>{for(let i=0;i<10;i++){if(t.volume===e)return!1;await vi(10)}return t.volume!==e},ln=/.*Version\/.*Safari\/.*/.test(n.navigator.userAgent),Fa=(t=Na())=>n.matchMedia("(display-mode: standalone)").matches&&ln?!1:typeof(t==null?void 0:t.requestPictureInPicture)=="function",Ha=(t=Na())=>Is({documentElement:B,media:t}),ks=Ha(),Ms=Fa(),ys=!!n.WebKitPlaybackTargetAvailabilityEvent,Ls=!!n.chrome;var nt=t=>Ve(t.media,e=>[se.SUBTITLES,se.CAPTIONS].includes(e.kind)).sort((e,i)=>e.kind>=i.kind?1:-1),$a=t=>Ve(t.media,e=>e.mode===De.SHOWING&&[se.SUBTITLES,se.CAPTIONS].includes(e.kind)),Ri=(t,e)=>{let i=nt(t),a=$a(t),r=!!a.length;if(i.length){if(e===!1||r&&e!==!0)We(De.DISABLED,i,a);else if(e===!0||!r&&e!==!1){let o=i[0],{options:l}=t;if(!(l!=null&&l.noSubtitlesLangPref)){let S=n.localStorage.getItem("media-chrome-pref-subtitles-lang"),I=S?[S,...n.navigator.languages]:n.navigator.languages,f=i.filter(p=>I.some(A=>p.language.toLowerCase().startsWith(A.split("-")[0]))).sort((p,A)=>{let v=I.findIndex(T=>p.language.toLowerCase().startsWith(T.split("-")[0])),y=I.findIndex(T=>A.language.toLowerCase().startsWith(T.split("-")[0]));return v-y});f[0]&&(o=f[0])}let{language:d,label:c,kind:k}=o;We(De.DISABLED,i,a),We(De.SHOWING,i,[{language:d,label:c,kind:k}])}}},Ci=(t,e)=>t===e?!0:t==null||e==null||typeof t!=typeof e?!1:typeof t=="number"&&Number.isNaN(t)&&Number.isNaN(e)?!0:typeof t!="object"?!1:Array.isArray(t)?dn(t,e):Object.entries(t).every(([i,a])=>i in e&&Ci(a,e[i])),dn=(t,e)=>{let i=Array.isArray(t),a=Array.isArray(e);return i!==a?!1:i||a?t.length!==e.length?!1:t.every((r,o)=>Ci(r,e[o])):!0};var cn=Object.values(oe),Di,un=Ss().then(t=>(Di=t,Di)),ws=async(...t)=>{await Promise.all(t.filter(e=>e).map(async e=>{if(!("localName"in e&&e instanceof n.HTMLElement))return;let i=e.localName;if(!i.includes("-"))return;let a=n.customElements.get(i);a&&e instanceof a||(await n.customElements.whenDefined(i),n.customElements.upgrade(e))}))},hn=new n.DOMParser,mn=t=>t&&(hn.parseFromString(t,"text/html").body.textContent||t),lt={mediaError:{get(t,e){let{media:i}=t;if((e==null?void 0:e.type)!=="playing")return i==null?void 0:i.error},mediaEvents:["emptied","error","playing"]},mediaErrorCode:{get(t,e){var i;let{media:a}=t;if((e==null?void 0:e.type)!=="playing")return(i=a==null?void 0:a.error)==null?void 0:i.code},mediaEvents:["emptied","error","playing"]},mediaErrorMessage:{get(t,e){var i,a;let{media:r}=t;if((e==null?void 0:e.type)!=="playing")return(a=(i=r==null?void 0:r.error)==null?void 0:i.message)!=null?a:""},mediaEvents:["emptied","error","playing"]},mediaWidth:{get(t){var e;let{media:i}=t;return(e=i==null?void 0:i.videoWidth)!=null?e:0},mediaEvents:["resize"]},mediaHeight:{get(t){var e;let{media:i}=t;return(e=i==null?void 0:i.videoHeight)!=null?e:0},mediaEvents:["resize"]},mediaPaused:{get(t){var e;let{media:i}=t;return(e=i==null?void 0:i.paused)!=null?e:!0},set(t,e){var i;let{media:a}=e;a&&(t?a.pause():(i=a.play())==null||i.catch(()=>{}))},mediaEvents:["play","playing","pause","emptied"]},mediaHasPlayed:{get(t,e){let{media:i}=t;return i?e?e.type==="playing":!i.paused:!1},mediaEvents:["playing","emptied"]},mediaEnded:{get(t){var e;let{media:i}=t;return(e=i==null?void 0:i.ended)!=null?e:!1},mediaEvents:["seeked","ended","emptied"]},mediaPlaybackRate:{get(t){var e;let{media:i}=t;return(e=i==null?void 0:i.playbackRate)!=null?e:1},set(t,e){let{media:i}=e;i&&Number.isFinite(+t)&&(i.playbackRate=+t)},mediaEvents:["ratechange","loadstart"]},mediaMuted:{get(t){var e;let{media:i}=t;return(e=i==null?void 0:i.muted)!=null?e:!1},set(t,e){let{media:i,options:{noMutedPref:a}={}}=e;if(i){i.muted=t;try{let r=n.localStorage.getItem("media-chrome-pref-muted")!==null,o=i.hasAttribute("muted");if(a){r&&n.localStorage.removeItem("media-chrome-pref-muted");return}if(o&&!r)return;n.localStorage.setItem("media-chrome-pref-muted",t?"true":"false")}catch(r){console.debug("Error setting muted pref",r)}}},mediaEvents:["volumechange"],stateOwnersUpdateHandlers:[(t,e)=>{let{options:{noMutedPref:i}}=e,{media:a}=e;if(!(!a||a.muted||i))try{let r=n.localStorage.getItem("media-chrome-pref-muted")==="true";lt.mediaMuted.set(r,e),t(r)}catch(r){console.debug("Error getting muted pref",r)}}]},mediaLoop:{get(t){let{media:e}=t;return e==null?void 0:e.loop},set(t,e){let{media:i}=e;i&&(i.loop=t)},mediaEvents:["medialooprequest"]},mediaVolume:{get(t){var e;let{media:i}=t;return(e=i==null?void 0:i.volume)!=null?e:1},set(t,e){let{media:i,options:{noVolumePref:a}={}}=e;if(i){try{t==null?n.localStorage.removeItem("media-chrome-pref-volume"):!i.hasAttribute("muted")&&!a&&n.localStorage.setItem("media-chrome-pref-volume",t.toString())}catch(r){console.debug("Error setting volume pref",r)}Number.isFinite(+t)&&(i.volume=+t)}},mediaEvents:["volumechange"],stateOwnersUpdateHandlers:[(t,e)=>{let{options:{noVolumePref:i}}=e;if(!i)try{let{media:a}=e;if(!a)return;let r=n.localStorage.getItem("media-chrome-pref-volume");if(r==null)return;lt.mediaVolume.set(+r,e),t(+r)}catch(a){console.debug("Error getting volume pref",a)}}]},mediaVolumeLevel:{get(t){let{media:e}=t;return typeof(e==null?void 0:e.volume)=="undefined"?"high":e.muted||e.volume===0?"off":e.volume<.5?"low":e.volume<.75?"medium":"high"},mediaEvents:["volumechange"]},mediaCurrentTime:{get(t){var e;let{media:i}=t;return(e=i==null?void 0:i.currentTime)!=null?e:0},set(t,e){let{media:i}=e;!i||!et(t)||(i.currentTime=t)},mediaEvents:["timeupdate","loadedmetadata"]},mediaDuration:{get(t){let{media:e,options:{defaultDuration:i}={}}=t;return i&&(!e||!e.duration||Number.isNaN(e.duration)||!Number.isFinite(e.duration))?i:Number.isFinite(e==null?void 0:e.duration)?e.duration:Number.NaN},mediaEvents:["durationchange","loadedmetadata","emptied"]},mediaLoading:{get(t){let{media:e}=t;return(e==null?void 0:e.readyState)<3},mediaEvents:["waiting","playing","emptied"]},mediaSeekable:{get(t){var e;let{media:i}=t;if(!((e=i==null?void 0:i.seekable)!=null&&e.length))return;let a=i.seekable.start(0),r=i.seekable.end(i.seekable.length-1);if(!(!a&&!r))return[Number(a.toFixed(3)),Number(r.toFixed(3))]},mediaEvents:["loadedmetadata","emptied","progress","seekablechange"]},mediaBuffered:{get(t){var e;let{media:i}=t,a=(e=i==null?void 0:i.buffered)!=null?e:[];return Array.from(a).map((r,o)=>[Number(a.start(o).toFixed(3)),Number(a.end(o).toFixed(3))])},mediaEvents:["progress","emptied"]},mediaStreamType:{get(t){let{media:e,options:{defaultStreamType:i}={}}=t,a=[oe.LIVE,oe.ON_DEMAND].includes(i)?i:void 0;if(!e)return a;let{streamType:r}=e;if(cn.includes(r))return r===oe.UNKNOWN?a:r;let o=e.duration;return o===1/0?oe.LIVE:Number.isFinite(o)?oe.ON_DEMAND:a},mediaEvents:["emptied","durationchange","loadedmetadata","streamtypechange"]},mediaTargetLiveWindow:{get(t){let{media:e}=t;if(!e)return Number.NaN;let{targetLiveWindow:i}=e,a=lt.mediaStreamType.get(t);return(i==null||Number.isNaN(i))&&a===oe.LIVE?0:i},mediaEvents:["emptied","durationchange","loadedmetadata","streamtypechange","targetlivewindowchange"]},mediaTimeIsLive:{get(t){let{media:e,options:{liveEdgeOffset:i=10}={}}=t;if(!e)return!1;if(typeof e.liveEdgeStart=="number")return Number.isNaN(e.liveEdgeStart)?!1:e.currentTime>=e.liveEdgeStart;if(!(lt.mediaStreamType.get(t)===oe.LIVE))return!1;let r=e.seekable;if(!r)return!0;if(!r.length)return!1;let o=r.end(r.length-1)-i;return e.currentTime>=o},mediaEvents:["playing","timeupdate","progress","waiting","emptied"]},mediaSubtitlesList:{get(t){return nt(t).map(({kind:e,label:i,language:a})=>({kind:e,label:i,language:a}))},mediaEvents:["loadstart"],textTracksEvents:["addtrack","removetrack"]},mediaSubtitlesShowing:{get(t){return $a(t).map(({kind:e,label:i,language:a})=>({kind:e,label:i,language:a}))},mediaEvents:["loadstart"],textTracksEvents:["addtrack","removetrack","change"],stateOwnersUpdateHandlers:[(t,e)=>{var i,a;let{media:r,options:o}=e;if(!r)return;let l=d=>{var c;!o.defaultSubtitles||d&&![se.CAPTIONS,se.SUBTITLES].includes((c=d==null?void 0:d.track)==null?void 0:c.kind)||Ri(e,!0)};return r.addEventListener("loadstart",l),(i=r.textTracks)==null||i.addEventListener("addtrack",l),(a=r.textTracks)==null||a.addEventListener("removetrack",l),()=>{var d,c;r.removeEventListener("loadstart",l),(d=r.textTracks)==null||d.removeEventListener("addtrack",l),(c=r.textTracks)==null||c.removeEventListener("removetrack",l)}}]},mediaChaptersCues:{get(t){var e;let{media:i}=t;if(!i)return[];let[a]=Ve(i,{kind:se.CHAPTERS});return Array.from((e=a==null?void 0:a.cues)!=null?e:[]).map(({text:r,startTime:o,endTime:l})=>({text:mn(r),startTime:o,endTime:l}))},mediaEvents:["loadstart","loadedmetadata"],textTracksEvents:["addtrack","removetrack","change"],stateOwnersUpdateHandlers:[(t,e)=>{var i;let{media:a}=e;if(!a)return;let r=a.querySelector('track[kind="chapters"][default][src]'),o=(i=a.shadowRoot)==null?void 0:i.querySelector(':is(video,audio) > track[kind="chapters"][default][src]');return r==null||r.addEventListener("load",t),o==null||o.addEventListener("load",t),()=>{r==null||r.removeEventListener("load",t),o==null||o.removeEventListener("load",t)}}]},mediaIsPip:{get(t){var e,i;let{media:a,documentElement:r}=t;if(!a||!r||!r.pictureInPictureElement)return!1;if(r.pictureInPictureElement===a)return!0;if(r.pictureInPictureElement instanceof HTMLMediaElement)return(e=a.localName)!=null&&e.includes("-")?we(a,r.pictureInPictureElement):!1;if(r.pictureInPictureElement.localName.includes("-")){let o=r.pictureInPictureElement.shadowRoot;for(;o!=null&&o.pictureInPictureElement;){if(o.pictureInPictureElement===a)return!0;o=(i=o.pictureInPictureElement)==null?void 0:i.shadowRoot}}return!1},set(t,e){let{media:i}=e;if(i)if(t){if(!B.pictureInPictureEnabled){console.warn("MediaChrome: Picture-in-picture is not enabled");return}if(!i.requestPictureInPicture){console.warn("MediaChrome: The current media does not support picture-in-picture");return}let a=()=>{console.warn("MediaChrome: The media is not ready for picture-in-picture. It must have a readyState > 0.")};i.requestPictureInPicture().catch(r=>{if(r.code===11){if(!i.src){console.warn("MediaChrome: The media is not ready for picture-in-picture. It must have a src set.");return}if(i.readyState===0&&i.preload==="none"){let o=()=>{i.removeEventListener("loadedmetadata",l),i.preload="none"},l=()=>{i.requestPictureInPicture().catch(a),o()};i.addEventListener("loadedmetadata",l),i.preload="metadata",setTimeout(()=>{i.readyState===0&&a(),o()},1e3)}else throw r}else throw r})}else B.pictureInPictureElement&&B.exitPictureInPicture()},mediaEvents:["enterpictureinpicture","leavepictureinpicture"]},mediaRenditionList:{get(t){var e;let{media:i}=t;return[...(e=i==null?void 0:i.videoRenditions)!=null?e:[]].map(a=>Le({},a))},mediaEvents:["emptied","loadstart"],videoRenditionsEvents:["addrendition","removerendition"]},mediaRenditionSelected:{get(t){var e,i,a;let{media:r}=t;return(a=(i=r==null?void 0:r.videoRenditions)==null?void 0:i[(e=r.videoRenditions)==null?void 0:e.selectedIndex])==null?void 0:a.id},set(t,e){let{media:i}=e;if(!(i!=null&&i.videoRenditions)){console.warn("MediaController: Rendition selection not supported by this media.");return}let a=t,r=Array.prototype.findIndex.call(i.videoRenditions,o=>o.id==a);i.videoRenditions.selectedIndex!=r&&(i.videoRenditions.selectedIndex=r)},mediaEvents:["emptied"],videoRenditionsEvents:["addrendition","removerendition","change"]},mediaAudioTrackList:{get(t){var e;let{media:i}=t;return[...(e=i==null?void 0:i.audioTracks)!=null?e:[]]},mediaEvents:["emptied","loadstart"],audioTracksEvents:["addtrack","removetrack"]},mediaAudioTrackEnabled:{get(t){var e,i;let{media:a}=t;return(i=[...(e=a==null?void 0:a.audioTracks)!=null?e:[]].find(r=>r.enabled))==null?void 0:i.id},set(t,e){let{media:i}=e;if(!(i!=null&&i.audioTracks)){console.warn("MediaChrome: Audio track selection not supported by this media.");return}let a=t;for(let r of i.audioTracks)r.enabled=a==r.id},mediaEvents:["emptied"],audioTracksEvents:["addtrack","removetrack","change"]},mediaIsFullscreen:{get(t){return Ts(t)},set(t,e,i){var a,r;t?(bs(e),i.detail&&!((a=e.media)!=null&&a.inert)&&((r=e.media)==null||r.focus())):As(e)},rootEvents:["fullscreenchange","webkitfullscreenchange"],mediaEvents:["webkitbeginfullscreen","webkitendfullscreen","webkitpresentationmodechanged"]},mediaIsCasting:{get(t){var e;let{media:i}=t;return!(i!=null&&i.remote)||((e=i.remote)==null?void 0:e.state)==="disconnected"?!1:i.remote.state==="connected"},set(t,e){var i,a;let{media:r}=e;if(r&&!(t&&((i=r.remote)==null?void 0:i.state)!=="disconnected")&&!(!t&&((a=r.remote)==null?void 0:a.state)!=="connected")){if(typeof r.remote.prompt!="function"){console.warn("MediaChrome: Casting is not supported in this environment");return}r.remote.prompt().catch(()=>{})}},remoteEvents:["connect","connecting","disconnect"]},mediaIsAirplaying:{get(){return!1},set(t,e){let{media:i}=e;if(i){if(!(i.webkitShowPlaybackTargetPicker&&n.WebKitPlaybackTargetAvailabilityEvent)){console.error("MediaChrome: received a request to select AirPlay but AirPlay is not supported in this environment");return}i.webkitShowPlaybackTargetPicker()}},mediaEvents:["webkitcurrentplaybacktargetiswirelesschanged"]},mediaFullscreenUnavailable:{get(t){let{media:e}=t;if(!ks||!Ha(e))return X.UNSUPPORTED}},mediaPipUnavailable:{get(t){let{media:e}=t;if(!Ms||!Fa(e))return X.UNSUPPORTED;if(e!=null&&e.disablePictureInPicture)return X.UNAVAILABLE}},mediaVolumeUnavailable:{get(t){let{media:e}=t;if(Di===!1||(e==null?void 0:e.volume)==null)return X.UNSUPPORTED},stateOwnersUpdateHandlers:[t=>{Di==null&&un.then(e=>t(e?void 0:X.UNSUPPORTED))}]},mediaCastUnavailable:{get(t,{availability:e="not-available"}={}){var i;let{media:a}=t;if(!Ls||!((i=a==null?void 0:a.remote)!=null&&i.state))return X.UNSUPPORTED;if(!(e==null||e==="available"))return X.UNAVAILABLE},stateOwnersUpdateHandlers:[(t,e)=>{var i;let{media:a}=e;return a?(a.disableRemotePlayback||a.hasAttribute("disableremoteplayback")||(i=a==null?void 0:a.remote)==null||i.watchAvailability(o=>{t({availability:o?"available":"not-available"})}).catch(o=>{o.name==="NotSupportedError"?t({availability:null}):t({availability:"not-available"})}),()=>{var o;(o=a==null?void 0:a.remote)==null||o.cancelWatchAvailability().catch(()=>{})}):void 0}]},mediaAirplayUnavailable:{get(t,e){if(!ys)return X.UNSUPPORTED;if((e==null?void 0:e.availability)==="not-available")return X.UNAVAILABLE},mediaEvents:["webkitplaybacktargetavailabilitychanged"],stateOwnersUpdateHandlers:[(t,e)=>{var i;let{media:a}=e;return a?(a.disableRemotePlayback||a.hasAttribute("disableremoteplayback")||(i=a==null?void 0:a.remote)==null||i.watchAvailability(o=>{t({availability:o?"available":"not-available"})}).catch(o=>{o.name==="NotSupportedError"?t({availability:null}):t({availability:"not-available"})}),()=>{var o;(o=a==null?void 0:a.remote)==null||o.cancelWatchAvailability().catch(()=>{})}):void 0}]},mediaRenditionUnavailable:{get(t){var e;let{media:i}=t;if(!(i!=null&&i.videoRenditions))return X.UNSUPPORTED;if(!((e=i.videoRenditions)!=null&&e.length))return X.UNAVAILABLE},mediaEvents:["emptied","loadstart"],videoRenditionsEvents:["addrendition","removerendition"]},mediaAudioTrackUnavailable:{get(t){var e,i;let{media:a}=t;if(!(a!=null&&a.audioTracks))return X.UNSUPPORTED;if(((i=(e=a.audioTracks)==null?void 0:e.length)!=null?i:0)<=1)return X.UNAVAILABLE},mediaEvents:["emptied","loadstart"],audioTracksEvents:["addtrack","removetrack"]},mediaLang:{get(t){let{options:{mediaLang:e}={}}=t;return e!=null?e:"en"}}};var Rs={[h.MEDIA_PREVIEW_REQUEST](t,e,{detail:i}){var a,r,o;let{media:l}=e,d=i!=null?i:void 0,c,k;if(l&&d!=null){let[p]=Ve(l,{kind:se.METADATA,label:"thumbnails"}),A=Array.prototype.find.call((a=p==null?void 0:p.cues)!=null?a:[],(v,y,T)=>y===0?v.endTime>d:y===T.length-1?v.startTime<=d:v.startTime<=d&&v.endTime>d);if(A){let v=/'^(?:[a-z]+:)?\/\//i.test(A.text)||(r=l==null?void 0:l.querySelector('track[label="thumbnails"]'))==null?void 0:r.src,y=new URL(A.text,v);k=new URLSearchParams(y.hash).get("#xywh").split(",").map(Q=>+Q),c=y.href}}let S=t.mediaDuration.get(e),f=(o=t.mediaChaptersCues.get(e).find((p,A,v)=>A===v.length-1&&S===p.endTime?p.startTime<=d&&p.endTime>=d:p.startTime<=d&&p.endTime>d))==null?void 0:o.text;return i!=null&&f==null&&(f=""),{mediaPreviewTime:d,mediaPreviewImage:c,mediaPreviewCoords:k,mediaPreviewChapter:f}},[h.MEDIA_PAUSE_REQUEST](t,e){t["mediaPaused"].set(!0,e)},[h.MEDIA_PLAY_REQUEST](t,e){var i,a,r,o;let l="mediaPaused",c=t.mediaStreamType.get(e)===oe.LIVE,k=!((i=e.options)!=null&&i.noAutoSeekToLive),S=t.mediaTargetLiveWindow.get(e)>0;if(c&&k&&!S){let I=(a=t.mediaSeekable.get(e))==null?void 0:a[1];if(I){let f=(o=(r=e.options)==null?void 0:r.seekToLiveOffset)!=null?o:0,p=I-f;t.mediaCurrentTime.set(p,e)}}t[l].set(!1,e)},[h.MEDIA_PLAYBACK_RATE_REQUEST](t,e,{detail:i}){let a="mediaPlaybackRate",r=i;t[a].set(r,e)},[h.MEDIA_MUTE_REQUEST](t,e){t["mediaMuted"].set(!0,e)},[h.MEDIA_UNMUTE_REQUEST](t,e){let i="mediaMuted";t.mediaVolume.get(e)||t.mediaVolume.set(.25,e),t[i].set(!1,e)},[h.MEDIA_LOOP_REQUEST](t,e,{detail:i}){let a="mediaLoop",r=!!i;return t[a].set(r,e),{mediaLoop:r}},[h.MEDIA_VOLUME_REQUEST](t,e,{detail:i}){let a="mediaVolume",r=i;r&&t.mediaMuted.get(e)&&t.mediaMuted.set(!1,e),t[a].set(r,e)},[h.MEDIA_SEEK_REQUEST](t,e,{detail:i}){let a="mediaCurrentTime",r=i;t[a].set(r,e)},[h.MEDIA_SEEK_TO_LIVE_REQUEST](t,e){var i,a,r;let o="mediaCurrentTime",l=(i=t.mediaSeekable.get(e))==null?void 0:i[1];if(Number.isNaN(Number(l)))return;let d=(r=(a=e.options)==null?void 0:a.seekToLiveOffset)!=null?r:0,c=l-d;t[o].set(c,e)},[h.MEDIA_SHOW_SUBTITLES_REQUEST](t,e,{detail:i}){var a;let{options:r}=e,o=nt(e),l=cs(i),d=(a=l[0])==null?void 0:a.language;d&&!r.noSubtitlesLangPref&&n.localStorage.setItem("media-chrome-pref-subtitles-lang",d),We(De.SHOWING,o,l)},[h.MEDIA_DISABLE_SUBTITLES_REQUEST](t,e,{detail:i}){let a=nt(e),r=i!=null?i:[];We(De.DISABLED,a,r)},[h.MEDIA_TOGGLE_SUBTITLES_REQUEST](t,e,{detail:i}){Ri(e,i)},[h.MEDIA_RENDITION_REQUEST](t,e,{detail:i}){let a="mediaRenditionSelected",r=i;t[a].set(r,e)},[h.MEDIA_AUDIO_TRACK_REQUEST](t,e,{detail:i}){let a="mediaAudioTrackEnabled",r=i;t[a].set(r,e)},[h.MEDIA_ENTER_PIP_REQUEST](t,e){let i="mediaIsPip";t.mediaIsFullscreen.get(e)&&t.mediaIsFullscreen.set(!1,e),t[i].set(!0,e)},[h.MEDIA_EXIT_PIP_REQUEST](t,e){t["mediaIsPip"].set(!1,e)},[h.MEDIA_ENTER_FULLSCREEN_REQUEST](t,e,i){let a="mediaIsFullscreen";t.mediaIsPip.get(e)&&t.mediaIsPip.set(!1,e),t[a].set(!0,e,i)},[h.MEDIA_EXIT_FULLSCREEN_REQUEST](t,e){t["mediaIsFullscreen"].set(!1,e)},[h.MEDIA_ENTER_CAST_REQUEST](t,e){let i="mediaIsCasting";t.mediaIsFullscreen.get(e)&&t.mediaIsFullscreen.set(!1,e),t[i].set(!0,e)},[h.MEDIA_EXIT_CAST_REQUEST](t,e){t["mediaIsCasting"].set(!1,e)},[h.MEDIA_AIRPLAY_REQUEST](t,e){t["mediaIsAirplaying"].set(!0,e)}};var Cs=({media:t,fullscreenElement:e,documentElement:i,stateMediator:a=lt,requestMap:r=Rs,options:o={},monitorStateOwnersOnlyWithSubscriptions:l=!0})=>{let d=[],c={options:Le({},o)},k=Object.freeze({mediaPreviewTime:void 0,mediaPreviewImage:void 0,mediaPreviewCoords:void 0,mediaPreviewChapter:void 0}),S=v=>{v!=null&&(Ci(v,k)||(k=Object.freeze(Le(Le({},k),v)),d.forEach(y=>y(k))))},I=()=>{let v=Object.entries(a).reduce((y,[T,{get:Q}])=>(y[T]=Q(c),y),{});S(v)},f={},p,A=async(v,y)=>{var T,Q,Pt,Nt,Xe,Me,ye,Ft,Be,kr,Mr,yr,Lr,wr,Rr,Cr;let Po=!!p;if(p=Le(Le(Le({},c),p!=null?p:{}),v),Po)return;await ws(...Object.values(v));let Je=d.length>0&&y===0&&l,Dr=c.media!==p.media,Or=((T=c.media)==null?void 0:T.textTracks)!==((Q=p.media)==null?void 0:Q.textTracks),Ur=((Pt=c.media)==null?void 0:Pt.videoRenditions)!==((Nt=p.media)==null?void 0:Nt.videoRenditions),xr=((Xe=c.media)==null?void 0:Xe.audioTracks)!==((Me=p.media)==null?void 0:Me.audioTracks),Pr=((ye=c.media)==null?void 0:ye.remote)!==((Ft=p.media)==null?void 0:Ft.remote),Nr=c.documentElement!==p.documentElement,Fr=!!c.media&&(Dr||Je),Hr=!!((Be=c.media)!=null&&Be.textTracks)&&(Or||Je),$r=!!((kr=c.media)!=null&&kr.videoRenditions)&&(Ur||Je),Br=!!((Mr=c.media)!=null&&Mr.audioTracks)&&(xr||Je),Wr=!!((yr=c.media)!=null&&yr.remote)&&(Pr||Je),Vr=!!c.documentElement&&(Nr||Je),Ca=Fr||Hr||$r||Br||Wr||Vr,je=d.length===0&&y===1&&l,Kr=!!p.media&&(Dr||je),Gr=!!((Lr=p.media)!=null&&Lr.textTracks)&&(Or||je),Yr=!!((wr=p.media)!=null&&wr.videoRenditions)&&(Ur||je),qr=!!((Rr=p.media)!=null&&Rr.audioTracks)&&(xr||je),Qr=!!((Cr=p.media)!=null&&Cr.remote)&&(Pr||je),zr=!!p.documentElement&&(Nr||je),Zr=Kr||Gr||Yr||qr||Qr||zr;if(!(Ca||Zr)){Object.entries(p).forEach(([D,Ht])=>{c[D]=Ht}),I(),p=void 0;return}Object.entries(a).forEach(([D,{get:Ht,mediaEvents:No=[],textTracksEvents:Fo=[],videoRenditionsEvents:Ho=[],audioTracksEvents:$o=[],remoteEvents:Bo=[],rootEvents:Wo=[],stateOwnersUpdateHandlers:Vo=[]}])=>{f[D]||(f[D]={});let J=P=>{let $=Ht(c,P);S({[D]:$})},V;V=f[D].mediaEvents,No.forEach(P=>{V&&Fr&&(c.media.removeEventListener(P,V),f[D].mediaEvents=void 0),Kr&&(p.media.addEventListener(P,J),f[D].mediaEvents=J)}),V=f[D].textTracksEvents,Fo.forEach(P=>{var $,re;V&&Hr&&(($=c.media.textTracks)==null||$.removeEventListener(P,V),f[D].textTracksEvents=void 0),Gr&&((re=p.media.textTracks)==null||re.addEventListener(P,J),f[D].textTracksEvents=J)}),V=f[D].videoRenditionsEvents,Ho.forEach(P=>{var $,re;V&&$r&&(($=c.media.videoRenditions)==null||$.removeEventListener(P,V),f[D].videoRenditionsEvents=void 0),Yr&&((re=p.media.videoRenditions)==null||re.addEventListener(P,J),f[D].videoRenditionsEvents=J)}),V=f[D].audioTracksEvents,$o.forEach(P=>{var $,re;V&&Br&&(($=c.media.audioTracks)==null||$.removeEventListener(P,V),f[D].audioTracksEvents=void 0),qr&&((re=p.media.audioTracks)==null||re.addEventListener(P,J),f[D].audioTracksEvents=J)}),V=f[D].remoteEvents,Bo.forEach(P=>{var $,re;V&&Wr&&(($=c.media.remote)==null||$.removeEventListener(P,V),f[D].remoteEvents=void 0),Qr&&((re=p.media.remote)==null||re.addEventListener(P,J),f[D].remoteEvents=J)}),V=f[D].rootEvents,Wo.forEach(P=>{V&&Vr&&(c.documentElement.removeEventListener(P,V),f[D].rootEvents=void 0),zr&&(p.documentElement.addEventListener(P,J),f[D].rootEvents=J)});let pi=f[D].stateOwnersUpdateHandlers;if(pi&&Ca&&(Array.isArray(pi)?pi:[pi]).forEach($=>{typeof $=="function"&&$()}),Zr){let P=Vo.map($=>$(J,p)).filter($=>typeof $=="function");f[D].stateOwnersUpdateHandlers=P.length===1?P[0]:P}else Ca&&(f[D].stateOwnersUpdateHandlers=void 0)}),Object.entries(p).forEach(([D,Ht])=>{c[D]=Ht}),I(),p=void 0};return A({media:t,fullscreenElement:e,documentElement:i,options:o}),{dispatch(v){let{type:y,detail:T}=v;if(r[y]&&k.mediaErrorCode==null){S(r[y](a,c,v));return}y==="mediaelementchangerequest"?A({media:T}):y==="fullscreenelementchangerequest"?A({fullscreenElement:T}):y==="documentelementchangerequest"?A({documentElement:T}):y==="optionschangerequest"&&(Object.entries(T!=null?T:{}).forEach(([Q,Pt])=>{c.options[Q]=Pt}),I())},getState(){return k},subscribe(v){return A({},d.length+1),d.push(v),v(k),()=>{let y=d.indexOf(v);y>=0&&(A({},d.length-1),d.splice(y,1))}}}};var Ga=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},E=(t,e,i)=>(Ga(t,e,"read from private field"),i?i.call(t):e.get(t)),te=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},ce=(t,e,i,a)=>(Ga(t,e,"write to private field"),a?a.call(t,i):e.set(t,i),i),Yt=(t,e,i)=>(Ga(t,e,"access private method"),i),Re,qt,M,fe,Qt,ve,Oi,zt,Ui,Ba,Ge,xi,Wa,Va,Fs,Hs=["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Enter"," ","f","m","k","c","l","j",">","<","p"],Ds=10,Os=.025,Us=.25,pn=.25,En=2,u={DEFAULT_SUBTITLES:"defaultsubtitles",DEFAULT_STREAM_TYPE:"defaultstreamtype",DEFAULT_DURATION:"defaultduration",FULLSCREEN_ELEMENT:"fullscreenelement",HOTKEYS:"hotkeys",KEYBOARD_BACKWARD_SEEK_OFFSET:"keyboardbackwardseekoffset",KEYBOARD_FORWARD_SEEK_OFFSET:"keyboardforwardseekoffset",KEYBOARD_DOWN_VOLUME_STEP:"keyboarddownvolumestep",KEYBOARD_UP_VOLUME_STEP:"keyboardupvolumestep",KEYS_USED:"keysused",LANG:"lang",LOOP:"loop",LIVE_EDGE_OFFSET:"liveedgeoffset",NO_AUTO_SEEK_TO_LIVE:"noautoseektolive",NO_DEFAULT_STORE:"nodefaultstore",NO_HOTKEYS:"nohotkeys",NO_MUTED_PREF:"nomutedpref",NO_SUBTITLES_LANG_PREF:"nosubtitleslangpref",NO_VOLUME_PREF:"novolumepref",SEEK_TO_LIVE_OFFSET:"seektoliveoffset"},Pi=class extends xe{constructor(){super(),te(this,Ui),te(this,xi),te(this,Va),this.mediaStateReceivers=[],this.associatedElementSubscriptions=new Map,te(this,Re,new ls(this,u.HOTKEYS)),te(this,qt,void 0),te(this,M,void 0),te(this,fe,null),te(this,Qt,void 0),te(this,ve,void 0),te(this,Oi,i=>{var a;(a=E(this,M))==null||a.dispatch(i)}),te(this,zt,void 0),te(this,Ge,i=>{let{key:a,shiftKey:r}=i;if(!(r&&(a==="/"||a==="?")||Hs.includes(a))){this.removeEventListener("keyup",E(this,Ge));return}this.keyboardShortcutHandler(i)}),this.associateElement(this);let e={};ce(this,Qt,i=>{Object.entries(i).forEach(([a,r])=>{if(a in e&&e[a]===r)return;this.propagateMediaState(a,r);let o=a.toLowerCase(),l=new n.CustomEvent(es[o],{composed:!0,detail:r});this.dispatchEvent(l)}),e=i})}static get observedAttributes(){return super.observedAttributes.concat(u.NO_HOTKEYS,u.HOTKEYS,u.DEFAULT_STREAM_TYPE,u.DEFAULT_SUBTITLES,u.DEFAULT_DURATION,u.NO_MUTED_PREF,u.NO_VOLUME_PREF,u.LANG,u.LOOP,u.LIVE_EDGE_OFFSET,u.SEEK_TO_LIVE_OFFSET,u.NO_AUTO_SEEK_TO_LIVE)}get mediaStore(){return E(this,M)}set mediaStore(e){var i,a;if(E(this,M)&&((i=E(this,ve))==null||i.call(this),ce(this,ve,void 0)),ce(this,M,e),!E(this,M)&&!this.hasAttribute(u.NO_DEFAULT_STORE)){Yt(this,Ui,Ba).call(this);return}ce(this,ve,(a=E(this,M))==null?void 0:a.subscribe(E(this,Qt)))}get fullscreenElement(){var e;return(e=E(this,qt))!=null?e:this}set fullscreenElement(e){var i;this.hasAttribute(u.FULLSCREEN_ELEMENT)&&this.removeAttribute(u.FULLSCREEN_ELEMENT),ce(this,qt,e),(i=E(this,M))==null||i.dispatch({type:"fullscreenelementchangerequest",detail:this.fullscreenElement})}get defaultSubtitles(){return b(this,u.DEFAULT_SUBTITLES)}set defaultSubtitles(e){g(this,u.DEFAULT_SUBTITLES,e)}get defaultStreamType(){return R(this,u.DEFAULT_STREAM_TYPE)}set defaultStreamType(e){L(this,u.DEFAULT_STREAM_TYPE,e)}get defaultDuration(){return C(this,u.DEFAULT_DURATION)}set defaultDuration(e){O(this,u.DEFAULT_DURATION,e)}get noHotkeys(){return b(this,u.NO_HOTKEYS)}set noHotkeys(e){g(this,u.NO_HOTKEYS,e)}get keysUsed(){return R(this,u.KEYS_USED)}set keysUsed(e){L(this,u.KEYS_USED,e)}get liveEdgeOffset(){return C(this,u.LIVE_EDGE_OFFSET)}set liveEdgeOffset(e){O(this,u.LIVE_EDGE_OFFSET,e)}get noAutoSeekToLive(){return b(this,u.NO_AUTO_SEEK_TO_LIVE)}set noAutoSeekToLive(e){g(this,u.NO_AUTO_SEEK_TO_LIVE,e)}get noVolumePref(){return b(this,u.NO_VOLUME_PREF)}set noVolumePref(e){g(this,u.NO_VOLUME_PREF,e)}get noMutedPref(){return b(this,u.NO_MUTED_PREF)}set noMutedPref(e){g(this,u.NO_MUTED_PREF,e)}get noSubtitlesLangPref(){return b(this,u.NO_SUBTITLES_LANG_PREF)}set noSubtitlesLangPref(e){g(this,u.NO_SUBTITLES_LANG_PREF,e)}get noDefaultStore(){return b(this,u.NO_DEFAULT_STORE)}set noDefaultStore(e){g(this,u.NO_DEFAULT_STORE,e)}get resolvedLang(){return Jr()}attributeChangedCallback(e,i,a){var r,o,l,d,c,k,S,I,f,p,A,v;if(super.attributeChangedCallback(e,i,a),e===u.NO_HOTKEYS)a!==i&&a===""?(this.hasAttribute(u.HOTKEYS)&&console.warn("Media Chrome: Both `hotkeys` and `nohotkeys` have been set. All hotkeys will be disabled."),this.disableHotkeys()):a!==i&&a===null&&this.enableHotkeys();else if(e===u.HOTKEYS)E(this,Re).value=a;else if(e===u.DEFAULT_SUBTITLES&&a!==i)(r=E(this,M))==null||r.dispatch({type:"optionschangerequest",detail:{defaultSubtitles:this.hasAttribute(u.DEFAULT_SUBTITLES)}});else if(e===u.DEFAULT_STREAM_TYPE)(l=E(this,M))==null||l.dispatch({type:"optionschangerequest",detail:{defaultStreamType:(o=this.getAttribute(u.DEFAULT_STREAM_TYPE))!=null?o:void 0}});else if(e===u.LIVE_EDGE_OFFSET&&a!==i)(d=E(this,M))==null||d.dispatch({type:"optionschangerequest",detail:{liveEdgeOffset:this.hasAttribute(u.LIVE_EDGE_OFFSET)?+this.getAttribute(u.LIVE_EDGE_OFFSET):void 0,seekToLiveOffset:this.hasAttribute(u.SEEK_TO_LIVE_OFFSET)?+this.getAttribute(u.SEEK_TO_LIVE_OFFSET):this.hasAttribute(u.LIVE_EDGE_OFFSET)?+this.getAttribute(u.LIVE_EDGE_OFFSET):void 0}});else if(e===u.SEEK_TO_LIVE_OFFSET&&a!==i)(c=E(this,M))==null||c.dispatch({type:"optionschangerequest",detail:{seekToLiveOffset:this.hasAttribute(u.SEEK_TO_LIVE_OFFSET)?+this.getAttribute(u.SEEK_TO_LIVE_OFFSET):this.hasAttribute(u.LIVE_EDGE_OFFSET)?+this.getAttribute(u.LIVE_EDGE_OFFSET):void 0}});else if(e===u.NO_AUTO_SEEK_TO_LIVE)(k=E(this,M))==null||k.dispatch({type:"optionschangerequest",detail:{noAutoSeekToLive:this.hasAttribute(u.NO_AUTO_SEEK_TO_LIVE)}});else if(e===u.FULLSCREEN_ELEMENT){let y=a?(S=this.getRootNode())==null?void 0:S.getElementById(a):void 0;ce(this,qt,y),(I=E(this,M))==null||I.dispatch({type:"fullscreenelementchangerequest",detail:this.fullscreenElement})}else e===u.LANG&&a!==i?(Xr(a),(f=E(this,M))==null||f.dispatch({type:"optionschangerequest",detail:{mediaLang:a}})):e===u.LOOP&&a!==i?(p=E(this,M))==null||p.dispatch({type:h.MEDIA_LOOP_REQUEST,detail:a!=null}):e===u.NO_VOLUME_PREF&&a!==i?(A=E(this,M))==null||A.dispatch({type:"optionschangerequest",detail:{noVolumePref:this.hasAttribute(u.NO_VOLUME_PREF)}}):e===u.NO_MUTED_PREF&&a!==i&&((v=E(this,M))==null||v.dispatch({type:"optionschangerequest",detail:{noMutedPref:this.hasAttribute(u.NO_MUTED_PREF)}}))}connectedCallback(){var e,i,a;this.associateElement(this),!E(this,M)&&!this.hasAttribute(u.NO_DEFAULT_STORE)&&Yt(this,Ui,Ba).call(this),(e=E(this,M))==null||e.dispatch({type:"documentelementchangerequest",detail:B}),(i=E(this,M))==null||i.dispatch({type:"fullscreenelementchangerequest",detail:this.fullscreenElement}),super.connectedCallback(),E(this,M)&&!E(this,ve)&&ce(this,ve,(a=E(this,M))==null?void 0:a.subscribe(E(this,Qt))),E(this,zt)!==void 0&&E(this,M)&&this.media&&setTimeout(()=>{var r,o,l;(o=(r=this.media)==null?void 0:r.textTracks)!=null&&o.length&&((l=E(this,M))==null||l.dispatch({type:h.MEDIA_TOGGLE_SUBTITLES_REQUEST,detail:E(this,zt)}))},0),this.hasAttribute(u.NO_HOTKEYS)?this.disableHotkeys():this.enableHotkeys()}disconnectedCallback(){var e,i,a,r,o,l;if((e=super.disconnectedCallback)==null||e.call(this),this.disableHotkeys(),E(this,M)){let d=E(this,M).getState();ce(this,zt,!!((i=d.mediaSubtitlesShowing)!=null&&i.length)),(a=E(this,M))==null||a.dispatch({type:"fullscreenelementchangerequest",detail:void 0}),(r=E(this,M))==null||r.dispatch({type:"documentelementchangerequest",detail:void 0}),(o=E(this,M))==null||o.dispatch({type:h.MEDIA_TOGGLE_SUBTITLES_REQUEST,detail:!1})}E(this,ve)&&((l=E(this,ve))==null||l.call(this),ce(this,ve,void 0)),this.unassociateElement(this),E(this,fe)&&(E(this,fe).remove(),ce(this,fe,null))}mediaSetCallback(e){var i;super.mediaSetCallback(e),(i=E(this,M))==null||i.dispatch({type:"mediaelementchangerequest",detail:e}),e.hasAttribute("tabindex")||(e.tabIndex=-1)}mediaUnsetCallback(e){var i;super.mediaUnsetCallback(e),(i=E(this,M))==null||i.dispatch({type:"mediaelementchangerequest",detail:void 0})}propagateMediaState(e,i){Ns(this.mediaStateReceivers,e,i)}associateElement(e){if(!e)return;let{associatedElementSubscriptions:i}=this;if(i.has(e))return;let a=this.registerMediaStateReceiver.bind(this),r=this.unregisterMediaStateReceiver.bind(this),o=An(e,a,r);Object.values(h).forEach(l=>{e.addEventListener(l,E(this,Oi))}),i.set(e,o)}unassociateElement(e){if(!e)return;let{associatedElementSubscriptions:i}=this;if(!i.has(e))return;i.get(e)(),i.delete(e),Object.values(h).forEach(r=>{e.removeEventListener(r,E(this,Oi))})}registerMediaStateReceiver(e){if(!e)return;let i=this.mediaStateReceivers;i.indexOf(e)>-1||(i.push(e),E(this,M)&&Object.entries(E(this,M).getState()).forEach(([r,o])=>{Ns([e],r,o)}))}unregisterMediaStateReceiver(e){let i=this.mediaStateReceivers,a=i.indexOf(e);a<0||i.splice(a,1)}enableHotkeys(){this.addEventListener("keydown",Yt(this,xi,Wa))}disableHotkeys(){this.removeEventListener("keydown",Yt(this,xi,Wa)),this.removeEventListener("keyup",E(this,Ge))}get hotkeys(){return E(this,Re)}set hotkeys(e){L(this,u.HOTKEYS,e)}keyboardShortcutHandler(e){var i,a,r,o,l,d,c,k,S;let I=e.target;if(((r=(a=(i=I.getAttribute(u.KEYS_USED))==null?void 0:i.split(" "))!=null?a:I==null?void 0:I.keysUsed)!=null?r:[]).map(T=>T==="Space"?" ":T).filter(Boolean).includes(e.key))return;let p,A,v;if(!(E(this,Re).contains(`no${e.key.toLowerCase()}`)||e.key===" "&&E(this,Re).contains("nospace")||e.shiftKey&&(e.key==="/"||e.key==="?")&&E(this,Re).contains("noshift+/")))switch(e.key){case" ":case"k":p=E(this,M).getState().mediaPaused?h.MEDIA_PLAY_REQUEST:h.MEDIA_PAUSE_REQUEST,this.dispatchEvent(new n.CustomEvent(p,{composed:!0,bubbles:!0}));break;case"m":p=this.mediaStore.getState().mediaVolumeLevel==="off"?h.MEDIA_UNMUTE_REQUEST:h.MEDIA_MUTE_REQUEST,this.dispatchEvent(new n.CustomEvent(p,{composed:!0,bubbles:!0}));break;case"f":p=this.mediaStore.getState().mediaIsFullscreen?h.MEDIA_EXIT_FULLSCREEN_REQUEST:h.MEDIA_ENTER_FULLSCREEN_REQUEST,this.dispatchEvent(new n.CustomEvent(p,{composed:!0,bubbles:!0}));break;case"c":this.dispatchEvent(new n.CustomEvent(h.MEDIA_TOGGLE_SUBTITLES_REQUEST,{composed:!0,bubbles:!0}));break;case"ArrowLeft":case"j":{let T=this.hasAttribute(u.KEYBOARD_BACKWARD_SEEK_OFFSET)?+this.getAttribute(u.KEYBOARD_BACKWARD_SEEK_OFFSET):Ds;A=Math.max(((o=this.mediaStore.getState().mediaCurrentTime)!=null?o:0)-T,0),v=new n.CustomEvent(h.MEDIA_SEEK_REQUEST,{composed:!0,bubbles:!0,detail:A}),this.dispatchEvent(v);break}case"ArrowRight":case"l":{let T=this.hasAttribute(u.KEYBOARD_FORWARD_SEEK_OFFSET)?+this.getAttribute(u.KEYBOARD_FORWARD_SEEK_OFFSET):Ds;A=Math.max(((l=this.mediaStore.getState().mediaCurrentTime)!=null?l:0)+T,0),v=new n.CustomEvent(h.MEDIA_SEEK_REQUEST,{composed:!0,bubbles:!0,detail:A}),this.dispatchEvent(v);break}case"ArrowUp":{let T=this.hasAttribute(u.KEYBOARD_UP_VOLUME_STEP)?+this.getAttribute(u.KEYBOARD_UP_VOLUME_STEP):Os;A=Math.min(((d=this.mediaStore.getState().mediaVolume)!=null?d:1)+T,1),v=new n.CustomEvent(h.MEDIA_VOLUME_REQUEST,{composed:!0,bubbles:!0,detail:A}),this.dispatchEvent(v);break}case"ArrowDown":{let T=this.hasAttribute(u.KEYBOARD_DOWN_VOLUME_STEP)?+this.getAttribute(u.KEYBOARD_DOWN_VOLUME_STEP):Os;A=Math.max(((c=this.mediaStore.getState().mediaVolume)!=null?c:1)-T,0),v=new n.CustomEvent(h.MEDIA_VOLUME_REQUEST,{composed:!0,bubbles:!0,detail:A}),this.dispatchEvent(v);break}case"<":{let T=(k=this.mediaStore.getState().mediaPlaybackRate)!=null?k:1;A=Math.max(T-Us,pn).toFixed(2),v=new n.CustomEvent(h.MEDIA_PLAYBACK_RATE_REQUEST,{composed:!0,bubbles:!0,detail:A}),this.dispatchEvent(v);break}case">":{let T=(S=this.mediaStore.getState().mediaPlaybackRate)!=null?S:1;A=Math.min(T+Us,En).toFixed(2),v=new n.CustomEvent(h.MEDIA_PLAYBACK_RATE_REQUEST,{composed:!0,bubbles:!0,detail:A}),this.dispatchEvent(v);break}case"/":case"?":{e.shiftKey&&Yt(this,Va,Fs).call(this);break}case"p":{p=this.mediaStore.getState().mediaIsPip?h.MEDIA_EXIT_PIP_REQUEST:h.MEDIA_ENTER_PIP_REQUEST,v=new n.CustomEvent(p,{composed:!0,bubbles:!0}),this.dispatchEvent(v);break}default:break}}};Re=new WeakMap;qt=new WeakMap;M=new WeakMap;fe=new WeakMap;Qt=new WeakMap;ve=new WeakMap;Oi=new WeakMap;zt=new WeakMap;Ui=new WeakSet;Ba=function(){var t;this.mediaStore=Cs({media:this.media,fullscreenElement:this.fullscreenElement,options:{defaultSubtitles:this.hasAttribute(u.DEFAULT_SUBTITLES),defaultDuration:this.hasAttribute(u.DEFAULT_DURATION)?+this.getAttribute(u.DEFAULT_DURATION):void 0,defaultStreamType:(t=this.getAttribute(u.DEFAULT_STREAM_TYPE))!=null?t:void 0,liveEdgeOffset:this.hasAttribute(u.LIVE_EDGE_OFFSET)?+this.getAttribute(u.LIVE_EDGE_OFFSET):void 0,seekToLiveOffset:this.hasAttribute(u.SEEK_TO_LIVE_OFFSET)?+this.getAttribute(u.SEEK_TO_LIVE_OFFSET):this.hasAttribute(u.LIVE_EDGE_OFFSET)?+this.getAttribute(u.LIVE_EDGE_OFFSET):void 0,noAutoSeekToLive:this.hasAttribute(u.NO_AUTO_SEEK_TO_LIVE),noVolumePref:this.hasAttribute(u.NO_VOLUME_PREF),noMutedPref:this.hasAttribute(u.NO_MUTED_PREF),noSubtitlesLangPref:this.hasAttribute(u.NO_SUBTITLES_LANG_PREF)}})};Ge=new WeakMap;xi=new WeakSet;Wa=function(t){var e;let{metaKey:i,altKey:a,key:r,shiftKey:o}=t,l=o&&(r==="/"||r==="?");if(l&&((e=E(this,fe))!=null&&e.open)){this.removeEventListener("keyup",E(this,Ge));return}if(i||a||!l&&!Hs.includes(r)){this.removeEventListener("keyup",E(this,Ge));return}let d=t.target,c=d instanceof HTMLElement&&(d.tagName.toLowerCase()==="media-volume-range"||d.tagName.toLowerCase()==="media-time-range");[" ","ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(r)&&!(E(this,Re).contains(`no${r.toLowerCase()}`)||r===" "&&E(this,Re).contains("nospace"))&&!c&&t.preventDefault(),this.addEventListener("keyup",E(this,Ge),{once:!0})};Va=new WeakSet;Fs=function(){E(this,fe)||(ce(this,fe,B.createElement("media-keyboard-shortcuts-dialog")),this.appendChild(E(this,fe))),E(this,fe).open=!0};var vn=Object.values(s),fn=Object.values(jr),$s=t=>{var e,i,a,r;let{observedAttributes:o}=t.constructor;!o&&((e=t.nodeName)!=null&&e.includes("-"))&&(n.customElements.upgrade(t),{observedAttributes:o}=t.constructor);let l=(r=(a=(i=t==null?void 0:t.getAttribute)==null?void 0:i.call(t,w.MEDIA_CHROME_ATTRIBUTES))==null?void 0:a.split)==null?void 0:r.call(a,/\s+/);return Array.isArray(o||l)?(o||l).filter(d=>vn.includes(d)):[]},_n=t=>{var e,i;return(e=t.nodeName)!=null&&e.includes("-")&&n.customElements.get((i=t.nodeName)==null?void 0:i.toLowerCase())&&!(t instanceof n.customElements.get(t.nodeName.toLowerCase()))&&n.customElements.upgrade(t),fn.some(a=>a in t)},Ka=t=>_n(t)||!!$s(t).length,xs=t=>{var e;return(e=t==null?void 0:t.join)==null?void 0:e.call(t,":")},Ps={[s.MEDIA_SUBTITLES_LIST]:Bt,[s.MEDIA_SUBTITLES_SHOWING]:Bt,[s.MEDIA_SEEKABLE]:xs,[s.MEDIA_BUFFERED]:t=>t==null?void 0:t.map(xs).join(" "),[s.MEDIA_PREVIEW_COORDS]:t=>t==null?void 0:t.join(" "),[s.MEDIA_RENDITION_LIST]:is,[s.MEDIA_AUDIO_TRACK_LIST]:as},gn=async(t,e,i)=>{var a,r;if(t.isConnected||await vi(0),typeof i=="boolean"||i==null)return g(t,e,i);if(typeof i=="number")return O(t,e,i);if(typeof i=="string")return L(t,e,i);if(Array.isArray(i)&&!i.length)return t.removeAttribute(e);let o=(r=(a=Ps[e])==null?void 0:a.call(Ps,i))!=null?r:i;return t.setAttribute(e,o)},bn=t=>{var e;return!!((e=t.closest)!=null&&e.call(t,'*[slot="media"]'))},Ke=(t,e)=>{if(bn(t))return;let i=(r,o)=>{var l,d;Ka(r)&&o(r);let{children:c=[]}=r!=null?r:{},k=(d=(l=r==null?void 0:r.shadowRoot)==null?void 0:l.children)!=null?d:[];[...c,...k].forEach(I=>Ke(I,o))},a=t==null?void 0:t.nodeName.toLowerCase();if(a.includes("-")&&!Ka(t)){n.customElements.whenDefined(a).then(()=>{i(t,e)});return}i(t,e)},Ns=(t,e,i)=>{t.forEach(a=>{if(e in a){a[e]=i;return}let r=$s(a),o=e.toLowerCase();r.includes(o)&&gn(a,o,i)})},An=(t,e,i)=>{Ke(t,e);let a=S=>{var I;let f=(I=S==null?void 0:S.composedPath()[0])!=null?I:S.target;e(f)},r=S=>{var I;let f=(I=S==null?void 0:S.composedPath()[0])!=null?I:S.target;i(f)};t.addEventListener(h.REGISTER_MEDIA_STATE_RECEIVER,a),t.addEventListener(h.UNREGISTER_MEDIA_STATE_RECEIVER,r);let o=S=>{S.forEach(I=>{let{addedNodes:f=[],removedNodes:p=[],type:A,target:v,attributeName:y}=I;A==="childList"?(Array.prototype.forEach.call(f,T=>Ke(T,e)),Array.prototype.forEach.call(p,T=>Ke(T,i))):A==="attributes"&&y===w.MEDIA_CHROME_ATTRIBUTES&&(Ka(v)?e(v):i(v))})},l=[],d=S=>{let I=S.target;I.name!=="media"&&(l.forEach(f=>Ke(f,i)),l=[...I.assignedElements({flatten:!0})],l.forEach(f=>Ke(f,e)))};t.addEventListener("slotchange",d);let c=new MutationObserver(o);return c.observe(t,{childList:!0,attributes:!0,subtree:!0}),()=>{Ke(t,i),t.removeEventListener("slotchange",d),c.disconnect(),t.removeEventListener(h.REGISTER_MEDIA_STATE_RECEIVER,a),t.removeEventListener(h.UNREGISTER_MEDIA_STATE_RECEIVER,r)}};n.customElements.get("media-controller")||n.customElements.define("media-controller",Pi);var Tn=Pi;var Bs=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M22.13 3H3.87a.87.87 0 0 0-.87.87v13.26a.87.87 0 0 0 .87.87h3.4L9 16H5V5h16v11h-4l1.72 2h3.4a.87.87 0 0 0 .87-.87V3.87a.87.87 0 0 0-.86-.87Zm-8.75 11.44a.5.5 0 0 0-.76 0l-4.91 5.73a.5.5 0 0 0 .38.83h9.82a.501.501 0 0 0 .38-.83l-4.91-5.73Z"/>
</svg>
`;function In(t){return`
    <style>
      :host([${s.MEDIA_IS_AIRPLAYING}]) slot[name=icon] slot:not([name=exit]) {
        display: none !important;
      }

      
      :host(:not([${s.MEDIA_IS_AIRPLAYING}])) slot[name=icon] slot:not([name=enter]) {
        display: none !important;
      }

      :host([${s.MEDIA_IS_AIRPLAYING}]) slot[name=tooltip-enter],
      :host(:not([${s.MEDIA_IS_AIRPLAYING}])) slot[name=tooltip-exit] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="enter">${Bs}</slot>
      <slot name="exit">${Bs}</slot>
    </slot>
  `}function Sn(){return`
    <slot name="tooltip-enter">${m("start airplay")}</slot>
    <slot name="tooltip-exit">${m("stop airplay")}</slot>
  `}var Ws=t=>{let e=t.mediaIsAirplaying?m("stop airplay"):m("start airplay");t.setAttribute("aria-label",e)},dt=class extends F{static get observedAttributes(){return[...super.observedAttributes,s.MEDIA_IS_AIRPLAYING,s.MEDIA_AIRPLAY_UNAVAILABLE]}connectedCallback(){super.connectedCallback(),Ws(this)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===s.MEDIA_IS_AIRPLAYING&&Ws(this)}get mediaIsAirplaying(){return b(this,s.MEDIA_IS_AIRPLAYING)}set mediaIsAirplaying(e){g(this,s.MEDIA_IS_AIRPLAYING,e)}get mediaAirplayUnavailable(){return R(this,s.MEDIA_AIRPLAY_UNAVAILABLE)}set mediaAirplayUnavailable(e){L(this,s.MEDIA_AIRPLAY_UNAVAILABLE,e)}handleClick(){let e=new n.CustomEvent(h.MEDIA_AIRPLAY_REQUEST,{composed:!0,bubbles:!0});this.dispatchEvent(e)}};dt.getSlotTemplateHTML=In;dt.getTooltipContentHTML=Sn;n.customElements.get("media-airplay-button")||n.customElements.define("media-airplay-button",dt);var kn=dt;var Mn=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M22.83 5.68a2.58 2.58 0 0 0-2.3-2.5c-3.62-.24-11.44-.24-15.06 0a2.58 2.58 0 0 0-2.3 2.5c-.23 4.21-.23 8.43 0 12.64a2.58 2.58 0 0 0 2.3 2.5c3.62.24 11.44.24 15.06 0a2.58 2.58 0 0 0 2.3-2.5c.23-4.21.23-8.43 0-12.64Zm-11.39 9.45a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.92 3.92 0 0 1 .92-2.77 3.18 3.18 0 0 1 2.43-1 2.94 2.94 0 0 1 2.13.78c.364.359.62.813.74 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.17 1.61 1.61 0 0 0-1.29.58 2.79 2.79 0 0 0-.5 1.89 3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.48 1.48 0 0 0 1-.37 2.1 2.1 0 0 0 .59-1.14l1.4.44a3.23 3.23 0 0 1-1.07 1.69Zm7.22 0a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.88 3.88 0 0 1 .93-2.77 3.14 3.14 0 0 1 2.42-1 3 3 0 0 1 2.16.82 2.8 2.8 0 0 1 .73 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.21 1.61 1.61 0 0 0-1.29.58A2.79 2.79 0 0 0 15 12a3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.44 1.44 0 0 0 1-.37 2.1 2.1 0 0 0 .6-1.15l1.4.44a3.17 3.17 0 0 1-1.1 1.7Z"/>
</svg>`,yn=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M17.73 14.09a1.4 1.4 0 0 1-1 .37 1.579 1.579 0 0 1-1.27-.58A3 3 0 0 1 15 12a2.8 2.8 0 0 1 .5-1.85 1.63 1.63 0 0 1 1.29-.57 1.47 1.47 0 0 1 1.51 1.2l1.43-.34A2.89 2.89 0 0 0 19 9.07a3 3 0 0 0-2.14-.78 3.14 3.14 0 0 0-2.42 1 3.91 3.91 0 0 0-.93 2.78 3.74 3.74 0 0 0 .92 2.66 3.07 3.07 0 0 0 2.34 1 3.07 3.07 0 0 0 1.91-.57 3.17 3.17 0 0 0 1.07-1.74l-1.4-.45c-.083.43-.3.822-.62 1.12Zm-7.22 0a1.43 1.43 0 0 1-1 .37 1.58 1.58 0 0 1-1.27-.58A3 3 0 0 1 7.76 12a2.8 2.8 0 0 1 .5-1.85 1.63 1.63 0 0 1 1.29-.57 1.47 1.47 0 0 1 1.51 1.2l1.43-.34a2.81 2.81 0 0 0-.74-1.32 2.94 2.94 0 0 0-2.13-.78 3.18 3.18 0 0 0-2.43 1 4 4 0 0 0-.92 2.78 3.74 3.74 0 0 0 .92 2.66 3.07 3.07 0 0 0 2.34 1 3.07 3.07 0 0 0 1.91-.57 3.23 3.23 0 0 0 1.07-1.74l-1.4-.45a2.06 2.06 0 0 1-.6 1.07Zm12.32-8.41a2.59 2.59 0 0 0-2.3-2.51C18.72 3.05 15.86 3 13 3c-2.86 0-5.72.05-7.53.17a2.59 2.59 0 0 0-2.3 2.51c-.23 4.207-.23 8.423 0 12.63a2.57 2.57 0 0 0 2.3 2.5c1.81.13 4.67.19 7.53.19 2.86 0 5.72-.06 7.53-.19a2.57 2.57 0 0 0 2.3-2.5c.23-4.207.23-8.423 0-12.63Zm-1.49 12.53a1.11 1.11 0 0 1-.91 1.11c-1.67.11-4.45.18-7.43.18-2.98 0-5.76-.07-7.43-.18a1.11 1.11 0 0 1-.91-1.11c-.21-4.14-.21-8.29 0-12.43a1.11 1.11 0 0 1 .91-1.11C7.24 4.56 10 4.49 13 4.49s5.76.07 7.43.18a1.11 1.11 0 0 1 .91 1.11c.21 4.14.21 8.29 0 12.43Z"/>
</svg>`;function Ln(t){return`
    <style>
      :host([aria-checked="true"]) slot[name=off] {
        display: none !important;
      }

      
      :host(:not([aria-checked="true"])) slot[name=on] {
        display: none !important;
      }

      :host([aria-checked="true"]) slot[name=tooltip-enable],
      :host(:not([aria-checked="true"])) slot[name=tooltip-disable] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="on">${Mn}</slot>
      <slot name="off">${yn}</slot>
    </slot>
  `}function wn(){return`
    <slot name="tooltip-enable">${m("Enable captions")}</slot>
    <slot name="tooltip-disable">${m("Disable captions")}</slot>
  `}var Vs=t=>{t.setAttribute("aria-checked",us(t).toString())},ct=class extends F{static get observedAttributes(){return[...super.observedAttributes,s.MEDIA_SUBTITLES_LIST,s.MEDIA_SUBTITLES_SHOWING]}connectedCallback(){super.connectedCallback(),this.setAttribute("role","button"),this.setAttribute("aria-label",m("closed captions")),Vs(this)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===s.MEDIA_SUBTITLES_SHOWING&&Vs(this)}get mediaSubtitlesList(){return Ks(this,s.MEDIA_SUBTITLES_LIST)}set mediaSubtitlesList(e){Gs(this,s.MEDIA_SUBTITLES_LIST,e)}get mediaSubtitlesShowing(){return Ks(this,s.MEDIA_SUBTITLES_SHOWING)}set mediaSubtitlesShowing(e){Gs(this,s.MEDIA_SUBTITLES_SHOWING,e)}handleClick(){this.dispatchEvent(new n.CustomEvent(h.MEDIA_TOGGLE_SUBTITLES_REQUEST,{composed:!0,bubbles:!0}))}};ct.getSlotTemplateHTML=Ln;ct.getTooltipContentHTML=wn;var Ks=(t,e)=>{let i=t.getAttribute(e);return i?ds(i):[]},Gs=(t,e,i)=>{if(!(i!=null&&i.length)){t.removeAttribute(e);return}let a=Bt(i);t.getAttribute(e)!==a&&t.setAttribute(e,a)};n.customElements.get("media-captions-button")||n.customElements.define("media-captions-button",ct);var Rn=ct;var Cn='<svg aria-hidden="true" viewBox="0 0 24 24"><g><path class="cast_caf_icon_arch0" d="M1,18 L1,21 L4,21 C4,19.3 2.66,18 1,18 L1,18 Z"/><path class="cast_caf_icon_arch1" d="M1,14 L1,16 C3.76,16 6,18.2 6,21 L8,21 C8,17.13 4.87,14 1,14 L1,14 Z"/><path class="cast_caf_icon_arch2" d="M1,10 L1,12 C5.97,12 10,16.0 10,21 L12,21 C12,14.92 7.07,10 1,10 L1,10 Z"/><path class="cast_caf_icon_box" d="M21,3 L3,3 C1.9,3 1,3.9 1,5 L1,8 L3,8 L3,5 L21,5 L21,19 L14,19 L14,21 L21,21 C22.1,21 23,20.1 23,19 L23,5 C23,3.9 22.1,3 21,3 L21,3 Z"/></g></svg>',Dn='<svg aria-hidden="true" viewBox="0 0 24 24"><g><path class="cast_caf_icon_arch0" d="M1,18 L1,21 L4,21 C4,19.3 2.66,18 1,18 L1,18 Z"/><path class="cast_caf_icon_arch1" d="M1,14 L1,16 C3.76,16 6,18.2 6,21 L8,21 C8,17.13 4.87,14 1,14 L1,14 Z"/><path class="cast_caf_icon_arch2" d="M1,10 L1,12 C5.97,12 10,16.0 10,21 L12,21 C12,14.92 7.07,10 1,10 L1,10 Z"/><path class="cast_caf_icon_box" d="M21,3 L3,3 C1.9,3 1,3.9 1,5 L1,8 L3,8 L3,5 L21,5 L21,19 L14,19 L14,21 L21,21 C22.1,21 23,20.1 23,19 L23,5 C23,3.9 22.1,3 21,3 L21,3 Z"/><path class="cast_caf_icon_boxfill" d="M5,7 L5,8.63 C8,8.6 13.37,14 13.37,17 L19,17 L19,7 Z"/></g></svg>';function On(t){return`
    <style>
      :host([${s.MEDIA_IS_CASTING}]) slot[name=icon] slot:not([name=exit]) {
        display: none !important;
      }

      
      :host(:not([${s.MEDIA_IS_CASTING}])) slot[name=icon] slot:not([name=enter]) {
        display: none !important;
      }

      :host([${s.MEDIA_IS_CASTING}]) slot[name=tooltip-enter],
      :host(:not([${s.MEDIA_IS_CASTING}])) slot[name=tooltip-exit] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="enter">${Cn}</slot>
      <slot name="exit">${Dn}</slot>
    </slot>
  `}function Un(){return`
    <slot name="tooltip-enter">${m("Start casting")}</slot>
    <slot name="tooltip-exit">${m("Stop casting")}</slot>
  `}var Ys=t=>{let e=t.mediaIsCasting?m("stop casting"):m("start casting");t.setAttribute("aria-label",e)},ut=class extends F{static get observedAttributes(){return[...super.observedAttributes,s.MEDIA_IS_CASTING,s.MEDIA_CAST_UNAVAILABLE]}connectedCallback(){super.connectedCallback(),Ys(this)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===s.MEDIA_IS_CASTING&&Ys(this)}get mediaIsCasting(){return b(this,s.MEDIA_IS_CASTING)}set mediaIsCasting(e){g(this,s.MEDIA_IS_CASTING,e)}get mediaCastUnavailable(){return R(this,s.MEDIA_CAST_UNAVAILABLE)}set mediaCastUnavailable(e){L(this,s.MEDIA_CAST_UNAVAILABLE,e)}handleClick(){let e=this.mediaIsCasting?h.MEDIA_EXIT_CAST_REQUEST:h.MEDIA_ENTER_CAST_REQUEST;this.dispatchEvent(new n.CustomEvent(e,{composed:!0,bubbles:!0}))}};ut.getSlotTemplateHTML=On;ut.getTooltipContentHTML=Un;n.customElements.get("media-cast-button")||n.customElements.define("media-cast-button",ut);var xn=ut;var Ja=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},qe=(t,e,i)=>(Ja(t,e,"read from private field"),i?i.call(t):e.get(t)),Ce=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},ja=(t,e,i,a)=>(Ja(t,e,"write to private field"),a?a.call(t,i):e.set(t,i),i),Ye=(t,e,i)=>(Ja(t,e,"access private method"),i),Fi,Xt,Qe,Ni,Ya,qa,qs,Qa,Qs,za,zs,Za,Zs,Xa,Xs;function Pn(t){return`
    <style>
      :host {
        font: var(--media-font,
          var(--media-font-weight, normal)
          var(--media-font-size, 14px) /
          var(--media-text-content-height, var(--media-control-height, 24px))
          var(--media-font-family, helvetica neue, segoe ui, roboto, arial, sans-serif));
        color: var(--media-text-color, var(--media-primary-color, rgb(238 238 238)));
        display: var(--media-dialog-display, inline-flex);
        justify-content: center;
        align-items: center;
        
        transition-behavior: allow-discrete;
        visibility: hidden;
        opacity: 0;
        transform: translateY(2px) scale(.99);
        pointer-events: none;
      }

      :host([open]) {
        transition: display .2s, visibility 0s, opacity .2s ease-out, transform .15s ease-out;
        visibility: visible;
        opacity: 1;
        transform: translateY(0) scale(1);
        pointer-events: auto;
      }

      #content {
        display: flex;
        position: relative;
        box-sizing: border-box;
        width: min(320px, 100%);
        word-wrap: break-word;
        max-height: 100%;
        overflow: auto;
        text-align: center;
        line-height: 1.4;
      }
    </style>
    ${this.getSlotTemplateHTML(t)}
  `}function Nn(t){return`
    <slot id="content"></slot>
  `}var Zt={OPEN:"open",ANCHOR:"anchor"},ue=class extends n.HTMLElement{constructor(){super(),Ce(this,Ni),Ce(this,qa),Ce(this,Qa),Ce(this,za),Ce(this,Za),Ce(this,Xa),Ce(this,Fi,!1),Ce(this,Xt,null),Ce(this,Qe,null)}static get observedAttributes(){return[Zt.OPEN,Zt.ANCHOR]}get open(){return b(this,Zt.OPEN)}set open(e){g(this,Zt.OPEN,e)}handleEvent(e){switch(e.type){case"invoke":Ye(this,za,zs).call(this,e);break;case"focusout":Ye(this,Za,Zs).call(this,e);break;case"keydown":Ye(this,Xa,Xs).call(this,e);break}}connectedCallback(){Ye(this,Ni,Ya).call(this),this.role||(this.role="dialog"),this.addEventListener("invoke",this),this.addEventListener("focusout",this),this.addEventListener("keydown",this)}disconnectedCallback(){this.removeEventListener("invoke",this),this.removeEventListener("focusout",this),this.removeEventListener("keydown",this)}attributeChangedCallback(e,i,a){Ye(this,Ni,Ya).call(this),e===Zt.OPEN&&a!==i&&(this.open?Ye(this,qa,qs).call(this):Ye(this,Qa,Qs).call(this))}focus(){ja(this,Xt,rs());let e=!this.dispatchEvent(new Event("focus",{composed:!0,cancelable:!0})),i=!this.dispatchEvent(new Event("focusin",{composed:!0,bubbles:!0,cancelable:!0}));if(e||i)return;let a=this.querySelector('[autofocus], [tabindex]:not([tabindex="-1"]), [role="menu"]');a==null||a.focus()}get keysUsed(){return["Escape","Tab"]}};Fi=new WeakMap;Xt=new WeakMap;Qe=new WeakMap;Ni=new WeakSet;Ya=function(){if(!qe(this,Fi)&&(ja(this,Fi,!0),!this.shadowRoot)){this.attachShadow(this.constructor.shadowRootOptions);let t=K(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(t),queueMicrotask(()=>{let{style:e}=U(this.shadowRoot,":host");e.setProperty("transition","display .15s, visibility .15s, opacity .15s ease-in, transform .15s ease-in")})}};qa=new WeakSet;qs=function(){var t;(t=qe(this,Qe))==null||t.setAttribute("aria-expanded","true"),this.dispatchEvent(new Event("open",{composed:!0,bubbles:!0})),this.addEventListener("transitionend",()=>this.focus(),{once:!0})};Qa=new WeakSet;Qs=function(){var t;(t=qe(this,Qe))==null||t.setAttribute("aria-expanded","false"),this.dispatchEvent(new Event("close",{composed:!0,bubbles:!0}))};za=new WeakSet;zs=function(t){ja(this,Qe,t.relatedTarget),we(this,t.relatedTarget)||(this.open=!this.open)};Za=new WeakSet;Zs=function(t){var e;we(this,t.relatedTarget)||((e=qe(this,Xt))==null||e.focus(),qe(this,Qe)&&qe(this,Qe)!==t.relatedTarget&&this.open&&(this.open=!1))};Xa=new WeakSet;Xs=function(t){var e,i,a,r,o;let{key:l,ctrlKey:d,altKey:c,metaKey:k}=t;d||c||k||this.keysUsed.includes(l)&&(t.preventDefault(),t.stopPropagation(),l==="Tab"?(t.shiftKey?(i=(e=this.previousElementSibling)==null?void 0:e.focus)==null||i.call(e):(r=(a=this.nextElementSibling)==null?void 0:a.focus)==null||r.call(a),this.blur()):l==="Escape"&&((o=qe(this,Xt))==null||o.focus(),this.open=!1))};ue.shadowRootOptions={mode:"open"};ue.getTemplateHTML=Pn;ue.getSlotTemplateHTML=Nn;n.customElements.get("media-chrome-dialog")||n.customElements.define("media-chrome-dialog",ue);var Fn=ue;var or=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},N=(t,e,i)=>(or(t,e,"read from private field"),i?i.call(t):e.get(t)),q=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},Pe=(t,e,i,a)=>(or(t,e,"write to private field"),a?a.call(t,i):e.set(t,i),i),he=(t,e,i)=>(or(t,e,"access private method"),i),_e,Qi,Hi,$i,me,Yi,Bi,Wi,Vi,nr,Js,Ki,er,Gi,tr,qi,lr,ir,js,ar,eo,rr,to,sr,io;function Hn(t){return`
    <style>
      :host {
        --_focus-box-shadow: var(--media-focus-box-shadow, inset 0 0 0 2px rgb(27 127 204 / .9));
        --_media-range-padding: var(--media-range-padding, var(--media-control-padding, 10px));

        box-shadow: var(--_focus-visible-box-shadow, none);
        background: var(--media-control-background, var(--media-secondary-color, rgb(20 20 30 / .7)));
        height: calc(var(--media-control-height, 24px) + 2 * var(--_media-range-padding));
        display: inline-flex;
        align-items: center;
        
        vertical-align: middle;
        box-sizing: border-box;
        position: relative;
        width: 100px;
        transition: background .15s linear;
        cursor: var(--media-cursor, pointer);
        pointer-events: auto;
        touch-action: none; 
      }

      
      input[type=range]:focus {
        outline: 0;
      }
      input[type=range]:focus::-webkit-slider-runnable-track {
        outline: 0;
      }

      :host(:hover) {
        background: var(--media-control-hover-background, rgb(50 50 70 / .7));
      }

      #leftgap {
        padding-left: var(--media-range-padding-left, var(--_media-range-padding));
      }

      #rightgap {
        padding-right: var(--media-range-padding-right, var(--_media-range-padding));
      }

      #startpoint,
      #endpoint {
        position: absolute;
      }

      #endpoint {
        right: 0;
      }

      #container {
        
        width: var(--media-range-track-width, 100%);
        transform: translate(var(--media-range-track-translate-x, 0px), var(--media-range-track-translate-y, 0px));
        position: relative;
        height: 100%;
        display: flex;
        align-items: center;
        min-width: 40px;
      }

      #range {
        
        display: var(--media-time-range-hover-display, block);
        bottom: var(--media-time-range-hover-bottom, 0);
        height: var(--media-time-range-hover-height, max(100% , 25px));
        width: 100%;
        position: absolute;
        cursor: var(--media-cursor, pointer);

        -webkit-appearance: none; 
        -webkit-tap-highlight-color: transparent;
        background: transparent; 
        margin: 0;
        z-index: 1;
      }

      @media (hover: hover) {
        #range {
          bottom: var(--media-time-range-hover-bottom, 0);
          height: var(--media-time-range-hover-height, max(100%, 20px));
        }
      }

      
      
      #range::-webkit-slider-thumb {
        -webkit-appearance: none;
        background: transparent;
        width: .1px;
        height: .1px;
      }

      
      #range::-moz-range-thumb {
        background: transparent;
        border: transparent;
        width: .1px;
        height: .1px;
      }

      #appearance {
        height: var(--media-range-track-height, 4px);
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 100%;
        position: absolute;
        
        will-change: transform;
      }

      #track {
        background: var(--media-range-track-background, rgb(255 255 255 / .2));
        border-radius: var(--media-range-track-border-radius, 1px);
        border: var(--media-range-track-border, none);
        outline: var(--media-range-track-outline);
        outline-offset: var(--media-range-track-outline-offset);
        backdrop-filter: var(--media-range-track-backdrop-filter);
        -webkit-backdrop-filter: var(--media-range-track-backdrop-filter);
        box-shadow: var(--media-range-track-box-shadow, none);
        position: absolute;
        width: 100%;
        height: 100%;
        overflow: hidden;
      }

      #progress,
      #pointer {
        position: absolute;
        height: 100%;
        will-change: width;
      }

      #progress {
        background: var(--media-range-bar-color, var(--media-primary-color, rgb(238 238 238)));
        transition: var(--media-range-track-transition);
      }

      #pointer {
        background: var(--media-range-track-pointer-background);
        border-right: var(--media-range-track-pointer-border-right);
        transition: visibility .25s, opacity .25s;
        visibility: hidden;
        opacity: 0;
      }

      @media (hover: hover) {
        :host(:hover) #pointer {
          transition: visibility .5s, opacity .5s;
          visibility: visible;
          opacity: 1;
        }
      }

      #thumb,
      ::slotted([slot=thumb]) {
        width: var(--media-range-thumb-width, 10px);
        height: var(--media-range-thumb-height, 10px);
        transition: var(--media-range-thumb-transition);
        transform: var(--media-range-thumb-transform, none);
        opacity: var(--media-range-thumb-opacity, 1);
        translate: -50%;
        position: absolute;
        left: 0;
        cursor: var(--media-cursor, pointer);
      }

      #thumb {
        border-radius: var(--media-range-thumb-border-radius, 10px);
        background: var(--media-range-thumb-background, var(--media-primary-color, rgb(238 238 238)));
        box-shadow: var(--media-range-thumb-box-shadow, 1px 1px 1px transparent);
        border: var(--media-range-thumb-border, none);
      }

      :host([disabled]) #thumb {
        background-color: #777;
      }

      .segments #appearance {
        height: var(--media-range-segment-hover-height, 7px);
      }

      #track {
        clip-path: url(#segments-clipping);
      }

      #segments {
        --segments-gap: var(--media-range-segments-gap, 2px);
        position: absolute;
        width: 100%;
        height: 100%;
      }

      #segments-clipping {
        transform: translateX(calc(var(--segments-gap) / 2));
      }

      #segments-clipping:empty {
        display: none;
      }

      #segments-clipping rect {
        height: var(--media-range-track-height, 4px);
        y: calc((var(--media-range-segment-hover-height, 7px) - var(--media-range-track-height, 4px)) / 2);
        transition: var(--media-range-segment-transition, transform .1s ease-in-out);
        transform: var(--media-range-segment-transform, scaleY(1));
        transform-origin: center;
      }

      /* Visible label for accessibility - positioned off-screen but technically visible (Firefox requires visible labels) */
      #range-label {
        position: absolute;
        left: -10000px;
        background: var(--media-control-background, var(--media-secondary-color, rgb(20 20 30 / .7)));
        pointer-events: none;
      }
    </style>
    <div id="leftgap"></div>
    <div id="container">
      <div id="startpoint"></div>
      <div id="endpoint"></div>
      <div id="appearance">
        <div id="track" part="track">
          <div id="pointer"></div>
          <div id="progress" part="progress"></div>
        </div>
        <slot name="thumb">
          <div id="thumb" part="thumb"></div>
        </slot>
        <svg id="segments" aria-hidden="true"><clipPath id="segments-clipping"></clipPath></svg>
      </div>
        <input id="range" type="range" min="0" max="1" step="any" value="0">
        <label for="range" id="range-label"></label>

      ${this.getContainerTemplateHTML(t)}
    </div>
    <div id="rightgap"></div>
  `}function $n(t){return""}var pe=class extends n.HTMLElement{constructor(){if(super(),q(this,nr),q(this,Ki),q(this,Gi),q(this,qi),q(this,ir),q(this,ar),q(this,rr),q(this,sr),q(this,_e,void 0),q(this,Qi,void 0),q(this,Hi,void 0),q(this,$i,void 0),q(this,me,{}),q(this,Yi,[]),q(this,Bi,()=>{if(this.range.matches(":focus-visible")){let{style:e}=U(this.shadowRoot,":host");e.setProperty("--_focus-visible-box-shadow","var(--_focus-box-shadow)")}}),q(this,Wi,()=>{let{style:e}=U(this.shadowRoot,":host");e.removeProperty("--_focus-visible-box-shadow")}),q(this,Vi,()=>{let e=this.shadowRoot.querySelector("#segments-clipping");e&&e.parentNode.append(e)}),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);let e=K(this.attributes),i=this.constructor.getTemplateHTML(e);this.shadowRoot.setHTMLUnsafe?this.shadowRoot.setHTMLUnsafe(i):this.shadowRoot.innerHTML=i}this.container=this.shadowRoot.querySelector("#container"),Pe(this,Hi,this.shadowRoot.querySelector("#startpoint")),Pe(this,$i,this.shadowRoot.querySelector("#endpoint")),this.range=this.shadowRoot.querySelector("#range"),this.appearance=this.shadowRoot.querySelector("#appearance")}static get observedAttributes(){return["disabled","aria-disabled",w.MEDIA_CONTROLLER]}attributeChangedCallback(e,i,a){var r,o,l,d,c;e===w.MEDIA_CONTROLLER?(i&&((o=(r=N(this,_e))==null?void 0:r.unassociateElement)==null||o.call(r,this),Pe(this,_e,null)),a&&this.isConnected&&(Pe(this,_e,(l=this.getRootNode())==null?void 0:l.getElementById(a)),(c=(d=N(this,_e))==null?void 0:d.associateElement)==null||c.call(d,this))):(e==="disabled"||e==="aria-disabled"&&i!==a)&&(a==null?(this.range.removeAttribute(e),he(this,Ki,er).call(this)):(this.range.setAttribute(e,a),he(this,Gi,tr).call(this)))}connectedCallback(){var e,i,a;let{style:r}=U(this.shadowRoot,":host");r.setProperty("display",`var(--media-control-display, var(--${this.localName}-display, inline-flex))`),N(this,me).pointer=U(this.shadowRoot,"#pointer"),N(this,me).progress=U(this.shadowRoot,"#progress"),N(this,me).thumb=U(this.shadowRoot,'#thumb, ::slotted([slot="thumb"])'),N(this,me).activeSegment=U(this.shadowRoot,"#segments-clipping rect:nth-child(0)");let o=this.getAttribute(w.MEDIA_CONTROLLER);o&&(Pe(this,_e,(e=this.getRootNode())==null?void 0:e.getElementById(o)),(a=(i=N(this,_e))==null?void 0:i.associateElement)==null||a.call(i,this)),this.updateBar(),this.shadowRoot.addEventListener("focusin",N(this,Bi)),this.shadowRoot.addEventListener("focusout",N(this,Wi)),he(this,Ki,er).call(this),fi(this.container,N(this,Vi))}disconnectedCallback(){var e,i;he(this,Gi,tr).call(this),(i=(e=N(this,_e))==null?void 0:e.unassociateElement)==null||i.call(e,this),Pe(this,_e,null),this.shadowRoot.removeEventListener("focusin",N(this,Bi)),this.shadowRoot.removeEventListener("focusout",N(this,Wi)),_i(this.container,N(this,Vi))}updatePointerBar(e){var i;(i=N(this,me).pointer)==null||i.style.setProperty("width",`${this.getPointerRatio(e)*100}%`)}updateBar(){var e,i;let a=this.range.valueAsNumber*100;(e=N(this,me).progress)==null||e.style.setProperty("width",`${a}%`),(i=N(this,me).thumb)==null||i.style.setProperty("left",`${a}%`)}updateSegments(e){let i=this.shadowRoot.querySelector("#segments-clipping");if(i.textContent="",this.container.classList.toggle("segments",!!(e!=null&&e.length)),!(e!=null&&e.length))return;let a=[...new Set([+this.range.min,...e.flatMap(o=>[o.start,o.end]),+this.range.max])];Pe(this,Yi,[...a]);let r=a.pop();for(let[o,l]of a.entries()){let[d,c]=[o===0,o===a.length-1],k=d?"calc(var(--segments-gap) / -1)":`${l*100}%`,I=`calc(${((c?r:a[o+1])-l)*100}%${d||c?"":" - var(--segments-gap)"})`,f=B.createElementNS("http://www.w3.org/2000/svg","rect"),p=ns(this.shadowRoot,`#segments-clipping rect:nth-child(${o+1})`);p.style.setProperty("x",k),p.style.setProperty("width",I),i.append(f)}}getPointerRatio(e){return os(e.clientX,e.clientY,N(this,Hi).getBoundingClientRect(),N(this,$i).getBoundingClientRect())}get dragging(){return this.hasAttribute("dragging")}handleEvent(e){switch(e.type){case"pointermove":he(this,sr,io).call(this,e);break;case"input":this.updateBar();break;case"pointerenter":he(this,ir,js).call(this,e);break;case"pointerdown":he(this,qi,lr).call(this,e);break;case"pointerup":he(this,ar,eo).call(this);break;case"pointerleave":he(this,rr,to).call(this);break}}get keysUsed(){return["ArrowUp","ArrowRight","ArrowDown","ArrowLeft"]}};_e=new WeakMap;Qi=new WeakMap;Hi=new WeakMap;$i=new WeakMap;me=new WeakMap;Yi=new WeakMap;Bi=new WeakMap;Wi=new WeakMap;Vi=new WeakMap;nr=new WeakSet;Js=function(t){let e=N(this,me).activeSegment;if(!e)return;let i=this.getPointerRatio(t),r=`#segments-clipping rect:nth-child(${N(this,Yi).findIndex((o,l,d)=>{let c=d[l+1];return c!=null&&i>=o&&i<=c})+1})`;(e.selectorText!=r||!e.style.transform)&&(e.selectorText=r,e.style.setProperty("transform","var(--media-range-segment-hover-transform, scaleY(2))"))};Ki=new WeakSet;er=function(){this.hasAttribute("disabled")||!this.isConnected||(this.addEventListener("input",this),this.addEventListener("pointerdown",this),this.addEventListener("pointerenter",this))};Gi=new WeakSet;tr=function(){var t,e;this.removeEventListener("input",this),this.removeEventListener("pointerdown",this),this.removeEventListener("pointerenter",this),this.removeEventListener("pointerleave",this),(t=n.window)==null||t.removeEventListener("pointerup",this),(e=n.window)==null||e.removeEventListener("pointermove",this)};qi=new WeakSet;lr=function(t){var e;Pe(this,Qi,t.composedPath().includes(this.range)),(e=n.window)==null||e.addEventListener("pointerup",this,{once:!0})};ir=new WeakSet;js=function(t){var e;t.pointerType!=="mouse"&&he(this,qi,lr).call(this,t),this.addEventListener("pointerleave",this,{once:!0}),(e=n.window)==null||e.addEventListener("pointermove",this)};ar=new WeakSet;eo=function(){var t;(t=n.window)==null||t.removeEventListener("pointerup",this),this.toggleAttribute("dragging",!1),this.range.disabled=this.hasAttribute("disabled")};rr=new WeakSet;to=function(){var t,e;this.removeEventListener("pointerleave",this),(t=n.window)==null||t.removeEventListener("pointermove",this),this.toggleAttribute("dragging",!1),this.range.disabled=this.hasAttribute("disabled"),(e=N(this,me).activeSegment)==null||e.style.removeProperty("transform")};sr=new WeakSet;io=function(t){t.pointerType==="pen"&&t.buttons===0||(this.toggleAttribute("dragging",t.buttons===1||t.pointerType!=="mouse"),this.updatePointerBar(t),he(this,nr,Js).call(this,t),this.dragging&&(t.pointerType!=="mouse"||!N(this,Qi))&&(this.range.disabled=!0,this.range.valueAsNumber=this.getPointerRatio(t),this.range.dispatchEvent(new Event("input",{bubbles:!0,composed:!0}))))};pe.shadowRootOptions={mode:"open"};pe.getTemplateHTML=Hn;pe.getContainerTemplateHTML=$n;n.customElements.get("media-chrome-range")||n.customElements.define("media-chrome-range",pe);var Bn=pe;var ao=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},zi=(t,e,i)=>(ao(t,e,"read from private field"),i?i.call(t):e.get(t)),Wn=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},Zi=(t,e,i,a)=>(ao(t,e,"write to private field"),a?a.call(t,i):e.set(t,i),i),ge;function Vn(t){return`
    <style>
      :host {
        
        box-sizing: border-box;
        display: var(--media-control-display, var(--media-control-bar-display, inline-flex));
        color: var(--media-text-color, var(--media-primary-color, rgb(238 238 238)));
        --media-loading-indicator-icon-height: 44px;
      }

      ::slotted(media-time-range),
      ::slotted(media-volume-range) {
        min-height: 100%;
      }

      ::slotted(media-time-range),
      ::slotted(media-clip-selector) {
        flex-grow: 1;
      }

      ::slotted([role="menu"]) {
        position: absolute;
      }
    </style>

    <slot></slot>
  `}var ht=class extends n.HTMLElement{constructor(){if(super(),Wn(this,ge,void 0),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);let e=K(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}}static get observedAttributes(){return[w.MEDIA_CONTROLLER]}attributeChangedCallback(e,i,a){var r,o,l,d,c;e===w.MEDIA_CONTROLLER&&(i&&((o=(r=zi(this,ge))==null?void 0:r.unassociateElement)==null||o.call(r,this),Zi(this,ge,null)),a&&this.isConnected&&(Zi(this,ge,(l=this.getRootNode())==null?void 0:l.getElementById(a)),(c=(d=zi(this,ge))==null?void 0:d.associateElement)==null||c.call(d,this)))}connectedCallback(){var e,i,a;let r=this.getAttribute(w.MEDIA_CONTROLLER);r&&(Zi(this,ge,(e=this.getRootNode())==null?void 0:e.getElementById(r)),(a=(i=zi(this,ge))==null?void 0:i.associateElement)==null||a.call(i,this))}disconnectedCallback(){var e,i;(i=(e=zi(this,ge))==null?void 0:e.unassociateElement)==null||i.call(e,this),Zi(this,ge,null)}};ge=new WeakMap;ht.shadowRootOptions={mode:"open"};ht.getTemplateHTML=Vn;n.customElements.get("media-control-bar")||n.customElements.define("media-control-bar",ht);var Kn=ht;var ro=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},Xi=(t,e,i)=>(ro(t,e,"read from private field"),i?i.call(t):e.get(t)),Gn=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},Ji=(t,e,i,a)=>(ro(t,e,"write to private field"),a?a.call(t,i):e.set(t,i),i),be;function Yn(t,e={}){return`
    <style>
      :host {
        font: var(--media-font,
          var(--media-font-weight, normal)
          var(--media-font-size, 14px) /
          var(--media-text-content-height, var(--media-control-height, 24px))
          var(--media-font-family, helvetica neue, segoe ui, roboto, arial, sans-serif));
        color: var(--media-text-color, var(--media-primary-color, rgb(238 238 238)));
        background: var(--media-text-background, var(--media-control-background, var(--media-secondary-color, rgb(20 20 30 / .7))));
        padding: var(--media-control-padding, 10px);
        display: inline-flex;
        justify-content: center;
        align-items: center;
        vertical-align: middle;
        box-sizing: border-box;
        text-align: center;
        pointer-events: auto;
      }

      
      :host(:focus-visible) {
        box-shadow: var(--media-focus-box-shadow, inset 0 0 0 2px rgb(27 127 204 / .9));
        outline: 0;
      }

      
      :host(:where(:focus)) {
        box-shadow: none;
        outline: 0;
      }
    </style>

    ${this.getSlotTemplateHTML(t,e)}
  `}function qn(t,e){return`
    <slot></slot>
  `}var Z=class extends n.HTMLElement{constructor(){if(super(),Gn(this,be,void 0),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);let e=K(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}}static get observedAttributes(){return[w.MEDIA_CONTROLLER]}attributeChangedCallback(e,i,a){var r,o,l,d,c;e===w.MEDIA_CONTROLLER&&(i&&((o=(r=Xi(this,be))==null?void 0:r.unassociateElement)==null||o.call(r,this),Ji(this,be,null)),a&&this.isConnected&&(Ji(this,be,(l=this.getRootNode())==null?void 0:l.getElementById(a)),(c=(d=Xi(this,be))==null?void 0:d.associateElement)==null||c.call(d,this)))}connectedCallback(){var e,i,a;let{style:r}=U(this.shadowRoot,":host");r.setProperty("display",`var(--media-control-display, var(--${this.localName}-display, inline-flex))`);let o=this.getAttribute(w.MEDIA_CONTROLLER);o&&(Ji(this,be,(e=this.getRootNode())==null?void 0:e.getElementById(o)),(a=(i=Xi(this,be))==null?void 0:i.associateElement)==null||a.call(i,this))}disconnectedCallback(){var e,i;(i=(e=Xi(this,be))==null?void 0:e.unassociateElement)==null||i.call(e,this),Ji(this,be,null)}};be=new WeakMap;Z.shadowRootOptions={mode:"open"};Z.getTemplateHTML=Yn;Z.getSlotTemplateHTML=qn;n.customElements.get("media-text-display")||n.customElements.define("media-text-display",Z);var Qn=Z;var oo=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},so=(t,e,i)=>(oo(t,e,"read from private field"),i?i.call(t):e.get(t)),zn=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},Zn=(t,e,i,a)=>(oo(t,e,"write to private field"),a?a.call(t,i):e.set(t,i),i),Jt;function Xn(t,e){return`
    <slot>${ee(e.mediaDuration)}</slot>
  `}var jt=class extends Z{constructor(){var e;super(),zn(this,Jt,void 0),Zn(this,Jt,this.shadowRoot.querySelector("slot")),so(this,Jt).textContent=ee((e=this.mediaDuration)!=null?e:0)}static get observedAttributes(){return[...super.observedAttributes,s.MEDIA_DURATION]}attributeChangedCallback(e,i,a){e===s.MEDIA_DURATION&&(so(this,Jt).textContent=ee(+a)),super.attributeChangedCallback(e,i,a)}get mediaDuration(){return C(this,s.MEDIA_DURATION)}set mediaDuration(e){O(this,s.MEDIA_DURATION,e)}};Jt=new WeakMap;jt.getSlotTemplateHTML=Xn;n.customElements.get("media-duration-display")||n.customElements.define("media-duration-display",jt);var Jn=jt;var jn={2:m("Network Error"),3:m("Decode Error"),4:m("Source Not Supported"),5:m("Encryption Error")},el={2:m("A network error caused the media download to fail."),3:m("A media error caused playback to be aborted. The media could be corrupt or your browser does not support this format."),4:m("An unsupported error occurred. The server or network failed, or your browser does not support this format."),5:m("The media is encrypted and there are no keys to decrypt it.")},ji=t=>{var e,i;return t.code===1?null:{title:(e=jn[t.code])!=null?e:`Error ${t.code}`,message:(i=el[t.code])!=null?i:t.message}};var lo=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},tl=(t,e,i)=>(lo(t,e,"read from private field"),i?i.call(t):e.get(t)),il=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},al=(t,e,i,a)=>(lo(t,e,"write to private field"),a?a.call(t,i):e.set(t,i),i),ea;function rl(t){return`
    <style>
      :host {
        background: rgb(20 20 30 / .8);
      }

      #content {
        display: block;
        padding: 1.2em 1.5em;
      }

      h3,
      p {
        margin-block: 0 .3em;
      }
    </style>
    <slot name="error-${t.mediaerrorcode}" id="content">
      ${co({code:+t.mediaerrorcode,message:t.mediaerrormessage})}
    </slot>
  `}function sl(t){return t.code&&ji(t)!==null}function co(t){var e;let{title:i,message:a}=(e=ji(t))!=null?e:{},r="";return i&&(r+=`<slot name="error-${t.code}-title"><h3>${i}</h3></slot>`),a&&(r+=`<slot name="error-${t.code}-message"><p>${a}</p></slot>`),r}var no=[s.MEDIA_ERROR_CODE,s.MEDIA_ERROR_MESSAGE],mt=class extends ue{constructor(){super(...arguments),il(this,ea,null)}static get observedAttributes(){return[...super.observedAttributes,...no]}formatErrorMessage(e){return this.constructor.formatErrorMessage(e)}attributeChangedCallback(e,i,a){var r;if(super.attributeChangedCallback(e,i,a),!no.includes(e))return;let o=(r=this.mediaError)!=null?r:{code:this.mediaErrorCode,message:this.mediaErrorMessage};if(this.open=sl(o),this.open&&(this.shadowRoot.querySelector("slot").name=`error-${this.mediaErrorCode}`,this.shadowRoot.querySelector("#content").innerHTML=this.formatErrorMessage(o),!this.hasAttribute("aria-label"))){let{title:l}=ji(o);l&&this.setAttribute("aria-label",l)}}get mediaError(){return tl(this,ea)}set mediaError(e){al(this,ea,e)}get mediaErrorCode(){return C(this,"mediaerrorcode")}set mediaErrorCode(e){O(this,"mediaerrorcode",e)}get mediaErrorMessage(){return R(this,"mediaerrormessage")}set mediaErrorMessage(e){L(this,"mediaerrormessage",e)}};ea=new WeakMap;mt.getSlotTemplateHTML=rl;mt.formatErrorMessage=co;n.customElements.get("media-error-dialog")||n.customElements.define("media-error-dialog",mt);var ol=mt;var nl=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},Ne=(t,e,i)=>(nl(t,e,"read from private field"),i?i.call(t):e.get(t)),uo=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},pt,Et;function ll(t){return`
    <style>
      :host {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 9999;
        background: rgb(20 20 30 / .8);
        backdrop-filter: blur(10px);
      }

      #content {
        display: block;
        width: clamp(400px, 40vw, 700px);
        max-width: 90vw;
        text-align: left;
      }

      h2 {
        margin: 0 0 1.5rem 0;
        font-size: 1.5rem;
        font-weight: 500;
        text-align: center;
      }

      .shortcuts-table {
        width: 100%;
        border-collapse: collapse;
      }

      .shortcuts-table tr {
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      }

      .shortcuts-table tr:last-child {
        border-bottom: none;
      }

      .shortcuts-table td {
        padding: 0.75rem 0.5rem;
      }

      .shortcuts-table td:first-child {
        text-align: right;
        padding-right: 1rem;
        width: 40%;
        min-width: 120px;
      }

      .shortcuts-table td:last-child {
        padding-left: 1rem;
      }

      .key {
        display: inline-block;
        background: rgba(255, 255, 255, 0.15);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 4px;
        padding: 0.25rem 0.5rem;
        font-family: 'Courier New', monospace;
        font-size: 0.9rem;
        font-weight: 500;
        min-width: 1.5rem;
        text-align: center;
        margin: 0 0.2rem;
      }

      .description {
        color: rgba(255, 255, 255, 0.9);
        font-size: 0.95rem;
      }

      .key-combo {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 0.3rem;
      }

      .key-separator {
        color: rgba(255, 255, 255, 0.5);
        font-size: 0.9rem;
      }
    </style>
    <slot id="content">
      ${dl()}
    </slot>
  `}function dl(){return`
    <h2>Keyboard Shortcuts</h2>
    <table class="shortcuts-table">${[{keys:["Space","k"],description:"Toggle Playback"},{keys:["m"],description:"Toggle mute"},{keys:["f"],description:"Toggle fullscreen"},{keys:["c"],description:"Toggle captions or subtitles, if available"},{keys:["p"],description:"Toggle Picture in Picture"},{keys:["\u2190","j"],description:"Seek back 10s"},{keys:["\u2192","l"],description:"Seek forward 10s"},{keys:["\u2191"],description:"Turn volume up"},{keys:["\u2193"],description:"Turn volume down"},{keys:["< (SHIFT+,)"],description:"Decrease playback rate"},{keys:["> (SHIFT+.)"],description:"Increase playback rate"}].map(({keys:i,description:a})=>`
      <tr>
        <td>
          <div class="key-combo">${i.map((o,l)=>l>0?`<span class="key-separator">or</span><span class="key">${o}</span>`:`<span class="key">${o}</span>`).join("")}</div>
        </td>
        <td class="description">${a}</td>
      </tr>
    `).join("")}</table>
  `}var ei=class extends ue{constructor(){super(...arguments),uo(this,pt,e=>{var i;if(!this.open)return;let a=(i=this.shadowRoot)==null?void 0:i.querySelector("#content");if(!a)return;let r=e.composedPath(),o=r[0]===this||r.includes(this),l=r.includes(a);o&&!l&&(this.open=!1)}),uo(this,Et,e=>{if(!this.open)return;let i=e.shiftKey&&(e.key==="/"||e.key==="?");(e.key==="Escape"||i)&&!e.ctrlKey&&!e.altKey&&!e.metaKey&&(this.open=!1,e.preventDefault(),e.stopPropagation())})}connectedCallback(){super.connectedCallback(),this.open&&(this.addEventListener("click",Ne(this,pt)),document.addEventListener("keydown",Ne(this,Et)))}disconnectedCallback(){this.removeEventListener("click",Ne(this,pt)),document.removeEventListener("keydown",Ne(this,Et))}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e==="open"&&(this.open?(this.addEventListener("click",Ne(this,pt)),document.addEventListener("keydown",Ne(this,Et))):(this.removeEventListener("click",Ne(this,pt)),document.removeEventListener("keydown",Ne(this,Et))))}};pt=new WeakMap;Et=new WeakMap;ei.getSlotTemplateHTML=ll;n.customElements.get("media-keyboard-shortcuts-dialog")||n.customElements.define("media-keyboard-shortcuts-dialog",ei);var cl=ei;var mo=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},ul=(t,e,i)=>(mo(t,e,"read from private field"),i?i.call(t):e.get(t)),hl=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},ml=(t,e,i,a)=>(mo(t,e,"write to private field"),a?a.call(t,i):e.set(t,i),i),ta,pl=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M16 3v2.5h3.5V9H22V3h-6ZM4 9h2.5V5.5H10V3H4v6Zm15.5 9.5H16V21h6v-6h-2.5v3.5ZM6.5 15H4v6h6v-2.5H6.5V15Z"/>
</svg>`,El=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M18.5 6.5V3H16v6h6V6.5h-3.5ZM16 21h2.5v-3.5H22V15h-6v6ZM4 17.5h3.5V21H10v-6H4v2.5Zm3.5-11H4V9h6V3H7.5v3.5Z"/>
</svg>`;function vl(t){return`
    <style>
      :host([${s.MEDIA_IS_FULLSCREEN}]) slot[name=icon] slot:not([name=exit]) {
        display: none !important;
      }

      
      :host(:not([${s.MEDIA_IS_FULLSCREEN}])) slot[name=icon] slot:not([name=enter]) {
        display: none !important;
      }

      :host([${s.MEDIA_IS_FULLSCREEN}]) slot[name=tooltip-enter],
      :host(:not([${s.MEDIA_IS_FULLSCREEN}])) slot[name=tooltip-exit] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="enter">${pl}</slot>
      <slot name="exit">${El}</slot>
    </slot>
  `}function fl(){return`
    <slot name="tooltip-enter">${m("Enter fullscreen mode")}</slot>
    <slot name="tooltip-exit">${m("Exit fullscreen mode")}</slot>
  `}var ho=t=>{let e=t.mediaIsFullscreen?m("exit fullscreen mode"):m("enter fullscreen mode");t.setAttribute("aria-label",e)},vt=class extends F{constructor(){super(...arguments),hl(this,ta,null)}static get observedAttributes(){return[...super.observedAttributes,s.MEDIA_IS_FULLSCREEN,s.MEDIA_FULLSCREEN_UNAVAILABLE]}connectedCallback(){super.connectedCallback(),ho(this)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===s.MEDIA_IS_FULLSCREEN&&ho(this)}get mediaFullscreenUnavailable(){return R(this,s.MEDIA_FULLSCREEN_UNAVAILABLE)}set mediaFullscreenUnavailable(e){L(this,s.MEDIA_FULLSCREEN_UNAVAILABLE,e)}get mediaIsFullscreen(){return b(this,s.MEDIA_IS_FULLSCREEN)}set mediaIsFullscreen(e){g(this,s.MEDIA_IS_FULLSCREEN,e)}handleClick(e){ml(this,ta,e);let i=ul(this,ta)instanceof PointerEvent,a=this.mediaIsFullscreen?new n.CustomEvent(h.MEDIA_EXIT_FULLSCREEN_REQUEST,{composed:!0,bubbles:!0}):new n.CustomEvent(h.MEDIA_ENTER_FULLSCREEN_REQUEST,{composed:!0,bubbles:!0,detail:i});this.dispatchEvent(a)}};ta=new WeakMap;vt.getSlotTemplateHTML=vl;vt.getTooltipContentHTML=fl;n.customElements.get("media-fullscreen-button")||n.customElements.define("media-fullscreen-button",vt);var _l=vt;var{MEDIA_TIME_IS_LIVE:ia,MEDIA_PAUSED:ti}=s,{MEDIA_SEEK_TO_LIVE_REQUEST:gl,MEDIA_PLAY_REQUEST:bl}=h,Al='<svg viewBox="0 0 6 12" aria-hidden="true"><circle cx="3" cy="6" r="2"></circle></svg>';function Tl(t){return`
    <style>
      :host { --media-tooltip-display: none; }
      
      slot[name=indicator] > *,
      :host ::slotted([slot=indicator]) {
        
        min-width: auto;
        fill: var(--media-live-button-icon-color, rgb(140, 140, 140));
        color: var(--media-live-button-icon-color, rgb(140, 140, 140));
      }

      :host([${ia}]:not([${ti}])) slot[name=indicator] > *,
      :host([${ia}]:not([${ti}])) ::slotted([slot=indicator]) {
        fill: var(--media-live-button-indicator-color, rgb(255, 0, 0));
        color: var(--media-live-button-indicator-color, rgb(255, 0, 0));
      }

      :host([${ia}]:not([${ti}])) {
        cursor: var(--media-cursor, not-allowed);
      }

      slot[name=text]{
        text-transform: uppercase;
      }

    </style>

    <slot name="indicator">${Al}</slot>
    
    <slot name="spacer">&nbsp;</slot><slot name="text">${m("live")}</slot>
  `}var po=t=>{var e;let i=t.mediaPaused||!t.mediaTimeIsLive,a=i?m("seek to live"):m("playing live");t.setAttribute("aria-label",a);let r=(e=t.shadowRoot)==null?void 0:e.querySelector('slot[name="text"]');r&&(r.textContent=m("live")),i?t.removeAttribute("aria-disabled"):t.setAttribute("aria-disabled","true")},ii=class extends F{static get observedAttributes(){return[...super.observedAttributes,ia,ti]}connectedCallback(){super.connectedCallback(),po(this)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),po(this)}get mediaPaused(){return b(this,s.MEDIA_PAUSED)}set mediaPaused(e){g(this,s.MEDIA_PAUSED,e)}get mediaTimeIsLive(){return b(this,s.MEDIA_TIME_IS_LIVE)}set mediaTimeIsLive(e){g(this,s.MEDIA_TIME_IS_LIVE,e)}handleClick(){!this.mediaPaused&&this.mediaTimeIsLive||(this.dispatchEvent(new n.CustomEvent(gl,{composed:!0,bubbles:!0})),this.hasAttribute(ti)&&this.dispatchEvent(new n.CustomEvent(bl,{composed:!0,bubbles:!0})))}};ii.getSlotTemplateHTML=Tl;n.customElements.get("media-live-button")||n.customElements.define("media-live-button",ii);var Il=ii;var vo=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},ai=(t,e,i)=>(vo(t,e,"read from private field"),i?i.call(t):e.get(t)),Eo=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},ri=(t,e,i,a)=>(vo(t,e,"write to private field"),a?a.call(t,i):e.set(t,i),i),Ae,ra,aa={LOADING_DELAY:"loadingdelay",NO_AUTOHIDE:"noautohide"},fo=500,Sl=`
<svg aria-hidden="true" viewBox="0 0 100 100">
  <path d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50">
    <animateTransform
       attributeName="transform"
       attributeType="XML"
       type="rotate"
       dur="1s"
       from="0 50 50"
       to="360 50 50"
       repeatCount="indefinite" />
  </path>
</svg>
`;function kl(t){return`
    <style>
      :host {
        display: var(--media-control-display, var(--media-loading-indicator-display, inline-block));
        vertical-align: middle;
        box-sizing: border-box;
        --_loading-indicator-delay: var(--media-loading-indicator-transition-delay, ${fo}ms);
      }

      #status {
        color: rgba(0,0,0,0);
        width: 0px;
        height: 0px;
      }

      :host slot[name=icon] > *,
      :host ::slotted([slot=icon]) {
        opacity: var(--media-loading-indicator-opacity, 0);
        transition: opacity 0.15s;
      }

      :host([${s.MEDIA_LOADING}]:not([${s.MEDIA_PAUSED}])) slot[name=icon] > *,
      :host([${s.MEDIA_LOADING}]:not([${s.MEDIA_PAUSED}])) ::slotted([slot=icon]) {
        opacity: var(--media-loading-indicator-opacity, 1);
        transition: opacity 0.15s var(--_loading-indicator-delay);
      }

      :host #status {
        visibility: var(--media-loading-indicator-opacity, hidden);
        transition: visibility 0.15s;
      }

      :host([${s.MEDIA_LOADING}]:not([${s.MEDIA_PAUSED}])) #status {
        visibility: var(--media-loading-indicator-opacity, visible);
        transition: visibility 0.15s var(--_loading-indicator-delay);
      }

      svg, img, ::slotted(svg), ::slotted(img) {
        width: var(--media-loading-indicator-icon-width);
        height: var(--media-loading-indicator-icon-height, 100px);
        fill: var(--media-icon-color, var(--media-primary-color, rgb(238 238 238)));
        vertical-align: middle;
      }
    </style>

    <slot name="icon">${Sl}</slot>
    <div id="status" role="status" aria-live="polite">${m("media loading")}</div>
  `}var ft=class extends n.HTMLElement{constructor(){if(super(),Eo(this,Ae,void 0),Eo(this,ra,fo),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);let e=K(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}}static get observedAttributes(){return[w.MEDIA_CONTROLLER,s.MEDIA_PAUSED,s.MEDIA_LOADING,aa.LOADING_DELAY]}attributeChangedCallback(e,i,a){var r,o,l,d,c;e===aa.LOADING_DELAY&&i!==a?this.loadingDelay=Number(a):e===w.MEDIA_CONTROLLER&&(i&&((o=(r=ai(this,Ae))==null?void 0:r.unassociateElement)==null||o.call(r,this),ri(this,Ae,null)),a&&this.isConnected&&(ri(this,Ae,(l=this.getRootNode())==null?void 0:l.getElementById(a)),(c=(d=ai(this,Ae))==null?void 0:d.associateElement)==null||c.call(d,this)))}connectedCallback(){var e,i,a;let r=this.getAttribute(w.MEDIA_CONTROLLER);r&&(ri(this,Ae,(e=this.getRootNode())==null?void 0:e.getElementById(r)),(a=(i=ai(this,Ae))==null?void 0:i.associateElement)==null||a.call(i,this))}disconnectedCallback(){var e,i;(i=(e=ai(this,Ae))==null?void 0:e.unassociateElement)==null||i.call(e,this),ri(this,Ae,null)}get loadingDelay(){return ai(this,ra)}set loadingDelay(e){ri(this,ra,e);let{style:i}=U(this.shadowRoot,":host");i.setProperty("--_loading-indicator-delay",`var(--media-loading-indicator-transition-delay, ${e}ms)`)}get mediaPaused(){return b(this,s.MEDIA_PAUSED)}set mediaPaused(e){g(this,s.MEDIA_PAUSED,e)}get mediaLoading(){return b(this,s.MEDIA_LOADING)}set mediaLoading(e){g(this,s.MEDIA_LOADING,e)}get mediaController(){return R(this,w.MEDIA_CONTROLLER)}set mediaController(e){L(this,w.MEDIA_CONTROLLER,e)}get noAutohide(){return b(this,aa.NO_AUTOHIDE)}set noAutohide(e){g(this,aa.NO_AUTOHIDE,e)}};Ae=new WeakMap;ra=new WeakMap;ft.shadowRootOptions={mode:"open"};ft.getTemplateHTML=kl;n.customElements.get("media-loading-indicator")||n.customElements.define("media-loading-indicator",ft);var Ml=ft;var yl=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M16.5 12A4.5 4.5 0 0 0 14 8v2.18l2.45 2.45a4.22 4.22 0 0 0 .05-.63Zm2.5 0a6.84 6.84 0 0 1-.54 2.64L20 16.15A8.8 8.8 0 0 0 21 12a9 9 0 0 0-7-8.77v2.06A7 7 0 0 1 19 12ZM4.27 3 3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25A6.92 6.92 0 0 1 14 18.7v2.06A9 9 0 0 0 17.69 19l2 2.05L21 19.73l-9-9L4.27 3ZM12 4 9.91 6.09 12 8.18V4Z"/>
</svg>`,_o=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M3 9v6h4l5 5V4L7 9H3Zm13.5 3A4.5 4.5 0 0 0 14 8v8a4.47 4.47 0 0 0 2.5-4Z"/>
</svg>`,Ll=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M3 9v6h4l5 5V4L7 9H3Zm13.5 3A4.5 4.5 0 0 0 14 8v8a4.47 4.47 0 0 0 2.5-4ZM14 3.23v2.06a7 7 0 0 1 0 13.42v2.06a9 9 0 0 0 0-17.54Z"/>
</svg>`;function wl(t){return`
    <style>
      :host(:not([${s.MEDIA_VOLUME_LEVEL}])) slot[name=icon] slot:not([name=high]),
      :host([${s.MEDIA_VOLUME_LEVEL}=high]) slot[name=icon] slot:not([name=high]) {
        display: none !important;
      }

      :host([${s.MEDIA_VOLUME_LEVEL}=off]) slot[name=icon] slot:not([name=off]) {
        display: none !important;
      }

      :host([${s.MEDIA_VOLUME_LEVEL}=low]) slot[name=icon] slot:not([name=low]) {
        display: none !important;
      }

      :host([${s.MEDIA_VOLUME_LEVEL}=medium]) slot[name=icon] slot:not([name=medium]) {
        display: none !important;
      }

      :host(:not([${s.MEDIA_VOLUME_LEVEL}=off])) slot[name=tooltip-unmute],
      :host([${s.MEDIA_VOLUME_LEVEL}=off]) slot[name=tooltip-mute] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="off">${yl}</slot>
      <slot name="low">${_o}</slot>
      <slot name="medium">${_o}</slot>
      <slot name="high">${Ll}</slot>
    </slot>
  `}function Rl(){return`
    <slot name="tooltip-mute">${m("Mute")}</slot>
    <slot name="tooltip-unmute">${m("Unmute")}</slot>
  `}var go=t=>{let i=t.mediaVolumeLevel==="off"?m("unmute"):m("mute");t.setAttribute("aria-label",i)},_t=class extends F{static get observedAttributes(){return[...super.observedAttributes,s.MEDIA_VOLUME_LEVEL]}connectedCallback(){super.connectedCallback(),go(this)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===s.MEDIA_VOLUME_LEVEL&&go(this)}get mediaVolumeLevel(){return R(this,s.MEDIA_VOLUME_LEVEL)}set mediaVolumeLevel(e){L(this,s.MEDIA_VOLUME_LEVEL,e)}handleClick(){let e=this.mediaVolumeLevel==="off"?h.MEDIA_UNMUTE_REQUEST:h.MEDIA_MUTE_REQUEST;this.dispatchEvent(new n.CustomEvent(e,{composed:!0,bubbles:!0}))}};_t.getSlotTemplateHTML=wl;_t.getTooltipContentHTML=Rl;n.customElements.get("media-mute-button")||n.customElements.define("media-mute-button",_t);var Cl=_t;var bo=`<svg aria-hidden="true" viewBox="0 0 28 24">
  <path d="M24 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h20a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1Zm-1 16H5V5h18v14Zm-3-8h-7v5h7v-5Z"/>
</svg>`;function Dl(t){return`
    <style>
      :host([${s.MEDIA_IS_PIP}]) slot[name=icon] slot:not([name=exit]) {
        display: none !important;
      }

      :host(:not([${s.MEDIA_IS_PIP}])) slot[name=icon] slot:not([name=enter]) {
        display: none !important;
      }

      :host([${s.MEDIA_IS_PIP}]) slot[name=tooltip-enter],
      :host(:not([${s.MEDIA_IS_PIP}])) slot[name=tooltip-exit] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="enter">${bo}</slot>
      <slot name="exit">${bo}</slot>
    </slot>
  `}function Ol(){return`
    <slot name="tooltip-enter">${m("Enter picture in picture mode")}</slot>
    <slot name="tooltip-exit">${m("Exit picture in picture mode")}</slot>
  `}var Ao=t=>{let e=t.mediaIsPip?m("exit picture in picture mode"):m("enter picture in picture mode");t.setAttribute("aria-label",e)},gt=class extends F{static get observedAttributes(){return[...super.observedAttributes,s.MEDIA_IS_PIP,s.MEDIA_PIP_UNAVAILABLE]}connectedCallback(){super.connectedCallback(),Ao(this)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===s.MEDIA_IS_PIP&&Ao(this)}get mediaPipUnavailable(){return R(this,s.MEDIA_PIP_UNAVAILABLE)}set mediaPipUnavailable(e){L(this,s.MEDIA_PIP_UNAVAILABLE,e)}get mediaIsPip(){return b(this,s.MEDIA_IS_PIP)}set mediaIsPip(e){g(this,s.MEDIA_IS_PIP,e)}handleClick(){let e=this.mediaIsPip?h.MEDIA_EXIT_PIP_REQUEST:h.MEDIA_ENTER_PIP_REQUEST;this.dispatchEvent(new n.CustomEvent(e,{composed:!0,bubbles:!0}))}};gt.getSlotTemplateHTML=Dl;gt.getTooltipContentHTML=Ol;n.customElements.get("media-pip-button")||n.customElements.define("media-pip-button",gt);var Ul=gt;var xl=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="m6 21 15-9L6 3v18Z"/>
</svg>`,Pl=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M6 20h4V4H6v16Zm8-16v16h4V4h-4Z"/>
</svg>`;function Nl(t){return`
    <style>
      :host([${s.MEDIA_PAUSED}]) slot[name=pause],
      :host(:not([${s.MEDIA_PAUSED}])) slot[name=play] {
        display: none !important;
      }

      :host([${s.MEDIA_PAUSED}]) slot[name=tooltip-pause],
      :host(:not([${s.MEDIA_PAUSED}])) slot[name=tooltip-play] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="play">${xl}</slot>
      <slot name="pause">${Pl}</slot>
    </slot>
  `}function Fl(){return`
    <slot name="tooltip-play">${m("Play")}</slot>
    <slot name="tooltip-pause">${m("Pause")}</slot>
  `}var To=t=>{let e=t.mediaPaused?m("play"):m("pause");t.setAttribute("aria-label",e)},bt=class extends F{static get observedAttributes(){return[...super.observedAttributes,s.MEDIA_PAUSED,s.MEDIA_ENDED]}connectedCallback(){super.connectedCallback(),To(this)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),(e===s.MEDIA_PAUSED||e===s.MEDIA_LANG)&&To(this)}get mediaPaused(){return b(this,s.MEDIA_PAUSED)}set mediaPaused(e){g(this,s.MEDIA_PAUSED,e)}handleClick(){let e=this.mediaPaused?h.MEDIA_PLAY_REQUEST:h.MEDIA_PAUSE_REQUEST;this.dispatchEvent(new n.CustomEvent(e,{composed:!0,bubbles:!0}))}};bt.getSlotTemplateHTML=Nl;bt.getTooltipContentHTML=Fl;n.customElements.get("media-play-button")||n.customElements.define("media-play-button",bt);var Hl=bt;var Te={PLACEHOLDER_SRC:"placeholdersrc",SRC:"src"};function $l(t){return`
    <style>
      :host {
        pointer-events: none;
        display: var(--media-poster-image-display, inline-block);
        box-sizing: border-box;
      }

      img {
        max-width: 100%;
        max-height: 100%;
        min-width: 100%;
        min-height: 100%;
        background-repeat: no-repeat;
        background-position: var(--media-poster-image-background-position, var(--media-object-position, center));
        background-size: var(--media-poster-image-background-size, var(--media-object-fit, contain));
        object-fit: var(--media-object-fit, contain);
        object-position: var(--media-object-position, center);
      }
    </style>

    <img part="poster img" aria-hidden="true" id="image"/>
  `}var Bl=t=>{t.style.removeProperty("background-image")},Wl=(t,e)=>{t.style["background-image"]=`url('${e}')`},At=class extends n.HTMLElement{static get observedAttributes(){return[Te.PLACEHOLDER_SRC,Te.SRC]}constructor(){if(super(),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);let e=K(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}this.image=this.shadowRoot.querySelector("#image")}attributeChangedCallback(e,i,a){e===Te.SRC&&(a==null?this.image.removeAttribute(Te.SRC):this.image.setAttribute(Te.SRC,a)),e===Te.PLACEHOLDER_SRC&&(a==null?Bl(this.image):Wl(this.image,a))}get placeholderSrc(){return R(this,Te.PLACEHOLDER_SRC)}set placeholderSrc(e){L(this,Te.SRC,e)}get src(){return R(this,Te.SRC)}set src(e){L(this,Te.SRC,e)}};At.shadowRootOptions={mode:"open"};At.getTemplateHTML=$l;n.customElements.get("media-poster-image")||n.customElements.define("media-poster-image",At);var Vl=At;var Io=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},Kl=(t,e,i)=>(Io(t,e,"read from private field"),i?i.call(t):e.get(t)),Gl=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},Yl=(t,e,i,a)=>(Io(t,e,"write to private field"),a?a.call(t,i):e.set(t,i),i),sa,oa=class extends Z{constructor(){super(),Gl(this,sa,void 0),Yl(this,sa,this.shadowRoot.querySelector("slot"))}static get observedAttributes(){return[...super.observedAttributes,s.MEDIA_PREVIEW_CHAPTER,s.MEDIA_LANG]}attributeChangedCallback(e,i,a){if(super.attributeChangedCallback(e,i,a),(e===s.MEDIA_PREVIEW_CHAPTER||e===s.MEDIA_LANG)&&a!==i&&a!=null)if(Kl(this,sa).textContent=a,a!==""){let r=m("chapter: {chapterName}",{chapterName:a});this.setAttribute("aria-valuetext",r)}else this.removeAttribute("aria-valuetext")}get mediaPreviewChapter(){return R(this,s.MEDIA_PREVIEW_CHAPTER)}set mediaPreviewChapter(e){L(this,s.MEDIA_PREVIEW_CHAPTER,e)}};sa=new WeakMap;n.customElements.get("media-preview-chapter-display")||n.customElements.define("media-preview-chapter-display",oa);var ql=oa;var So=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},na=(t,e,i)=>(So(t,e,"read from private field"),i?i.call(t):e.get(t)),Ql=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},la=(t,e,i,a)=>(So(t,e,"write to private field"),a?a.call(t,i):e.set(t,i),i),Ie;function zl(t){return`
    <style>
      :host {
        box-sizing: border-box;
        display: var(--media-control-display, var(--media-preview-thumbnail-display, inline-block));
        overflow: hidden;
      }

      img {
        display: none;
        position: relative;
      }
    </style>
    <img crossorigin loading="eager" decoding="async">
  `}var Tt=class extends n.HTMLElement{constructor(){if(super(),Ql(this,Ie,void 0),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);let e=K(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}}static get observedAttributes(){return[w.MEDIA_CONTROLLER,s.MEDIA_PREVIEW_IMAGE,s.MEDIA_PREVIEW_COORDS]}connectedCallback(){var e,i,a;let r=this.getAttribute(w.MEDIA_CONTROLLER);r&&(la(this,Ie,(e=this.getRootNode())==null?void 0:e.getElementById(r)),(a=(i=na(this,Ie))==null?void 0:i.associateElement)==null||a.call(i,this))}disconnectedCallback(){var e,i;(i=(e=na(this,Ie))==null?void 0:e.unassociateElement)==null||i.call(e,this),la(this,Ie,null)}attributeChangedCallback(e,i,a){var r,o,l,d,c;[s.MEDIA_PREVIEW_IMAGE,s.MEDIA_PREVIEW_COORDS].includes(e)&&this.update(),e===w.MEDIA_CONTROLLER&&(i&&((o=(r=na(this,Ie))==null?void 0:r.unassociateElement)==null||o.call(r,this),la(this,Ie,null)),a&&this.isConnected&&(la(this,Ie,(l=this.getRootNode())==null?void 0:l.getElementById(a)),(c=(d=na(this,Ie))==null?void 0:d.associateElement)==null||c.call(d,this)))}get mediaPreviewImage(){return R(this,s.MEDIA_PREVIEW_IMAGE)}set mediaPreviewImage(e){L(this,s.MEDIA_PREVIEW_IMAGE,e)}get mediaPreviewCoords(){let e=this.getAttribute(s.MEDIA_PREVIEW_COORDS);if(e)return e.split(/\s+/).map(i=>+i)}set mediaPreviewCoords(e){if(!e){this.removeAttribute(s.MEDIA_PREVIEW_COORDS);return}this.setAttribute(s.MEDIA_PREVIEW_COORDS,e.join(" "))}update(){let e=this.mediaPreviewCoords,i=this.mediaPreviewImage;if(!(e&&i))return;let[a,r,o,l]=e,d=i.split("#")[0],c=getComputedStyle(this),{maxWidth:k,maxHeight:S,minWidth:I,minHeight:f}=c,p=c.getPropertyValue("--media-preview-thumbnail-object-fit").trim()||"contain",A,v;if(p==="fill"){let Me=parseInt(k)/o,ye=parseInt(S)/l,Ft=parseInt(I)/o,Be=parseInt(f)/l;A=Me<1?Me:Math.max(Me,Ft),v=ye<1?ye:Math.max(ye,Be)}else{let Me=Math.min(parseInt(k)/o,parseInt(S)/l),ye=Math.max(parseInt(I)/o,parseInt(f)/l),Be=Me<1?Me:ye>1?ye:1;A=Be,v=Be}let{style:y}=U(this.shadowRoot,":host"),T=U(this.shadowRoot,"img").style,Q=this.shadowRoot.querySelector("img"),Nt=Math.min(A,v)<1?"min":"max";y.setProperty(`${Nt}-width`,"initial","important"),y.setProperty(`${Nt}-height`,"initial","important"),y.width=`${o*A}px`,y.height=`${l*v}px`;let Xe=()=>{T.width=`${this.imgWidth*A}px`,T.height=`${this.imgHeight*v}px`,T.display="block"};Q.src!==d&&(Q.onload=()=>{this.imgWidth=Q.naturalWidth,this.imgHeight=Q.naturalHeight,Xe(),Q.onload=null},Q.src=d,Xe()),Xe(),T.transform=`translate(-${a*A}px, -${r*v}px)`}};Ie=new WeakMap;Tt.shadowRootOptions={mode:"open"};Tt.getTemplateHTML=zl;n.customElements.get("media-preview-thumbnail")||n.customElements.define("media-preview-thumbnail",Tt);var da=Tt;var Mo=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},ko=(t,e,i)=>(Mo(t,e,"read from private field"),i?i.call(t):e.get(t)),Zl=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},Xl=(t,e,i,a)=>(Mo(t,e,"write to private field"),a?a.call(t,i):e.set(t,i),i),si,ca=class extends Z{constructor(){super(),Zl(this,si,void 0),Xl(this,si,this.shadowRoot.querySelector("slot")),ko(this,si).textContent=ee(0)}static get observedAttributes(){return[...super.observedAttributes,s.MEDIA_PREVIEW_TIME]}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===s.MEDIA_PREVIEW_TIME&&a!=null&&(ko(this,si).textContent=ee(parseFloat(a)))}get mediaPreviewTime(){return C(this,s.MEDIA_PREVIEW_TIME)}set mediaPreviewTime(e){O(this,s.MEDIA_PREVIEW_TIME,e)}};si=new WeakMap;n.customElements.get("media-preview-time-display")||n.customElements.define("media-preview-time-display",ca);var Jl=ca;var It={SEEK_OFFSET:"seekoffset"},dr=30,jl=t=>`
  <svg aria-hidden="true" viewBox="0 0 20 24">
    <defs>
      <style>.text{font-size:8px;font-family:Arial-BoldMT, Arial;font-weight:700;}</style>
    </defs>
    <text class="text value" transform="translate(2.18 19.87)">${t}</text>
    <path d="M10 6V3L4.37 7 10 10.94V8a5.54 5.54 0 0 1 1.9 10.48v2.12A7.5 7.5 0 0 0 10 6Z"/>
  </svg>`;function ed(t,e){return`
    <slot name="icon">${jl(e.seekOffset)}</slot>
  `}var td=(t,e)=>{t.setAttribute("aria-label",m("seek back {seekOffset} seconds",{seekOffset:e}))};function id(){return m("Seek backward")}var ad=0,St=class extends F{static get observedAttributes(){return[...super.observedAttributes,s.MEDIA_CURRENT_TIME,It.SEEK_OFFSET]}connectedCallback(){super.connectedCallback(),this.seekOffset=C(this,It.SEEK_OFFSET,dr)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),td(this,this.seekOffset),e===It.SEEK_OFFSET&&(this.seekOffset=C(this,It.SEEK_OFFSET,dr))}get seekOffset(){return C(this,It.SEEK_OFFSET,dr)}set seekOffset(e){O(this,It.SEEK_OFFSET,e),this.setAttribute("aria-label",m("seek back {seekOffset} seconds",{seekOffset:this.seekOffset})),gi(bi(this,"icon"),this.seekOffset)}get mediaCurrentTime(){return C(this,s.MEDIA_CURRENT_TIME,ad)}set mediaCurrentTime(e){O(this,s.MEDIA_CURRENT_TIME,e)}handleClick(){let e=Math.max(this.mediaCurrentTime-this.seekOffset,0),i=new n.CustomEvent(h.MEDIA_SEEK_REQUEST,{composed:!0,bubbles:!0,detail:e});this.dispatchEvent(i)}};St.getSlotTemplateHTML=ed;St.getTooltipContentHTML=id;n.customElements.get("media-seek-backward-button")||n.customElements.define("media-seek-backward-button",St);var rd=St;var kt={SEEK_OFFSET:"seekoffset"},cr=30,sd=t=>`
  <svg aria-hidden="true" viewBox="0 0 20 24">
    <defs>
      <style>.text{font-size:8px;font-family:Arial-BoldMT, Arial;font-weight:700;}</style>
    </defs>
    <text class="text value" transform="translate(8.9 19.87)">${t}</text>
    <path d="M10 6V3l5.61 4L10 10.94V8a5.54 5.54 0 0 0-1.9 10.48v2.12A7.5 7.5 0 0 1 10 6Z"/>
  </svg>`;function od(t,e){return`
    <slot name="icon">${sd(e.seekOffset)}</slot>
  `}var nd=(t,e)=>{t.setAttribute("aria-label",m("seek forward {seekOffset} seconds",{seekOffset:e}))};function ld(){return m("Seek forward")}var dd=0,Mt=class extends F{static get observedAttributes(){return[...super.observedAttributes,s.MEDIA_CURRENT_TIME,kt.SEEK_OFFSET]}connectedCallback(){super.connectedCallback(),this.seekOffset=C(this,kt.SEEK_OFFSET,cr)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),nd(this,this.seekOffset),e===kt.SEEK_OFFSET&&(this.seekOffset=C(this,kt.SEEK_OFFSET,cr))}get seekOffset(){return C(this,kt.SEEK_OFFSET,cr)}set seekOffset(e){O(this,kt.SEEK_OFFSET,e),this.setAttribute("aria-label",m("seek forward {seekOffset} seconds",{seekOffset:this.seekOffset})),gi(bi(this,"icon"),this.seekOffset)}get mediaCurrentTime(){return C(this,s.MEDIA_CURRENT_TIME,dd)}set mediaCurrentTime(e){O(this,s.MEDIA_CURRENT_TIME,e)}handleClick(){let e=this.mediaCurrentTime+this.seekOffset,i=new n.CustomEvent(h.MEDIA_SEEK_REQUEST,{composed:!0,bubbles:!0,detail:e});this.dispatchEvent(i)}};Mt.getSlotTemplateHTML=od;Mt.getTooltipContentHTML=ld;n.customElements.get("media-seek-forward-button")||n.customElements.define("media-seek-forward-button",Mt);var cd=Mt;var mr=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},Ee=(t,e,i)=>(mr(t,e,"read from private field"),i?i.call(t):e.get(t)),ze=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},pr=(t,e,i,a)=>(mr(t,e,"write to private field"),a?a.call(t,i):e.set(t,i),i),He=(t,e,i)=>(mr(t,e,"access private method"),i),yt,Se,pa,Er,Lo,ma,vr,oi,ua,ha,ur,Fe={REMAINING:"remaining",SHOW_DURATION:"showduration",NO_TOGGLE:"notoggle"},yo=[...Object.values(Fe),s.MEDIA_CURRENT_TIME,s.MEDIA_DURATION,s.MEDIA_SEEKABLE],wo=["Enter"," "],ud="&nbsp;/&nbsp;",hr=(t,{timesSep:e=ud}={})=>{var i,a;let r=(i=t.mediaCurrentTime)!=null?i:0,[,o]=(a=t.mediaSeekable)!=null?a:[],l=0;Number.isFinite(t.mediaDuration)?l=t.mediaDuration:Number.isFinite(o)&&(l=o);let d=t.remaining?ee(0-(l-r)):ee(r);return t.showDuration?`${d}${e}${ee(l)}`:d},hd=t=>{var e;let i=t.mediaCurrentTime,[,a]=(e=t.mediaSeekable)!=null?e:[],r=null;if(Number.isFinite(t.mediaDuration)?r=t.mediaDuration:Number.isFinite(a)&&(r=a),i==null||r===null){t.setAttribute("aria-description",m("video not loaded, unknown time."));return}let o=t.remaining?Oe(0-(r-i)):Oe(i);if(!t.showDuration){t.setAttribute("aria-description",o);return}let l=Oe(r),d=m("{currentTime} of {totalTime}",{currentTime:o,totalTime:l});t.setAttribute("aria-description",d)};function md(t,e){return`
    <slot>${hr(e)}</slot>
  `}var pd=t=>{t.setAttribute("aria-label",m("playback time"))},ni=class extends Z{constructor(){super(),ze(this,Er),ze(this,ma),ze(this,oi),ze(this,ha),ze(this,yt,void 0),ze(this,Se,null),ze(this,pa,e=>{let{metaKey:i,altKey:a,key:r}=e;if(i||a||!wo.includes(r)){this.removeEventListener("keyup",Ee(this,Se));return}this.addEventListener("keyup",Ee(this,Se))}),pr(this,yt,this.shadowRoot.querySelector("slot")),Ee(this,yt).innerHTML=`${hr(this)}`}static get observedAttributes(){return[...super.observedAttributes,...yo,"disabled"]}connectedCallback(){let{style:e}=U(this.shadowRoot,":host(:hover:not([notoggle]))");e.setProperty("cursor","var(--media-cursor, pointer)"),e.setProperty("background","var(--media-control-hover-background, rgba(50 50 70 / .7))"),this.setAttribute("aria-label",m("playback time")),He(this,oi,ua).call(this),super.connectedCallback()}toggleTimeDisplay(){this.noToggle||(this.hasAttribute("remaining")?this.removeAttribute("remaining"):this.setAttribute("remaining",""))}disconnectedCallback(){this.disable(),He(this,ma,vr).call(this),super.disconnectedCallback()}attributeChangedCallback(e,i,a){pd(this),yo.includes(e)?this.update():e==="disabled"&&a!==i?a==null?He(this,oi,ua).call(this):He(this,ha,ur).call(this):e===Fe.NO_TOGGLE&&a!==i&&(this.noToggle?He(this,ha,ur).call(this):He(this,oi,ua).call(this)),super.attributeChangedCallback(e,i,a)}enable(){this.noToggle||(this.tabIndex=0)}disable(){this.tabIndex=-1}get remaining(){return b(this,Fe.REMAINING)}set remaining(e){g(this,Fe.REMAINING,e)}get showDuration(){return b(this,Fe.SHOW_DURATION)}set showDuration(e){g(this,Fe.SHOW_DURATION,e)}get noToggle(){return b(this,Fe.NO_TOGGLE)}set noToggle(e){g(this,Fe.NO_TOGGLE,e)}get mediaDuration(){return C(this,s.MEDIA_DURATION)}set mediaDuration(e){O(this,s.MEDIA_DURATION,e)}get mediaCurrentTime(){return C(this,s.MEDIA_CURRENT_TIME)}set mediaCurrentTime(e){O(this,s.MEDIA_CURRENT_TIME,e)}get mediaSeekable(){let e=this.getAttribute(s.MEDIA_SEEKABLE);if(e)return e.split(":").map(i=>+i)}set mediaSeekable(e){if(e==null){this.removeAttribute(s.MEDIA_SEEKABLE);return}this.setAttribute(s.MEDIA_SEEKABLE,e.join(":"))}update(){let e=hr(this);hd(this),e!==Ee(this,yt).innerHTML&&(Ee(this,yt).innerHTML=e)}};yt=new WeakMap;Se=new WeakMap;pa=new WeakMap;Er=new WeakSet;Lo=function(){Ee(this,Se)||(pr(this,Se,t=>{let{key:e}=t;if(!wo.includes(e)){this.removeEventListener("keyup",Ee(this,Se));return}this.toggleTimeDisplay()}),this.addEventListener("keydown",Ee(this,pa)),this.addEventListener("click",this.toggleTimeDisplay))};ma=new WeakSet;vr=function(){Ee(this,Se)&&(this.removeEventListener("keyup",Ee(this,Se)),this.removeEventListener("keydown",Ee(this,pa)),this.removeEventListener("click",this.toggleTimeDisplay),pr(this,Se,null))};oi=new WeakSet;ua=function(){!this.noToggle&&!this.hasAttribute("disabled")&&(this.setAttribute("role","button"),this.enable(),He(this,Er,Lo).call(this))};ha=new WeakSet;ur=function(){this.removeAttribute("role"),this.disable(),He(this,ma,vr).call(this)};ni.getSlotTemplateHTML=md;n.customElements.get("media-time-display")||n.customElements.define("media-time-display",ni);var Ed=ni;var Ro=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},G=(t,e,i)=>(Ro(t,e,"read from private field"),i?i.call(t):e.get(t)),ke=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},j=(t,e,i,a)=>(Ro(t,e,"write to private field"),a?a.call(t,i):e.set(t,i),i),vd=(t,e,i,a)=>({set _(r){j(t,e,r,i)},get _(){return G(t,e,a)}}),Lt,Ea,wt,li,va,fa,_a,Rt,Ze,ga,ba=class{constructor(e,i,a){ke(this,Lt,void 0),ke(this,Ea,void 0),ke(this,wt,void 0),ke(this,li,void 0),ke(this,va,void 0),ke(this,fa,void 0),ke(this,_a,void 0),ke(this,Rt,void 0),ke(this,Ze,0),ke(this,ga,(r=performance.now())=>{j(this,Ze,requestAnimationFrame(G(this,ga))),j(this,li,performance.now()-G(this,wt));let o=1e3/this.fps;if(G(this,li)>o){j(this,wt,r-G(this,li)%o);let l=1e3/((r-G(this,Ea))/++vd(this,va)._),d=(r-G(this,fa))/1e3/this.duration,c=G(this,_a)+d*this.playbackRate;c-G(this,Lt).valueAsNumber>0?j(this,Rt,this.playbackRate/this.duration/l):(j(this,Rt,.995*G(this,Rt)),c=G(this,Lt).valueAsNumber+G(this,Rt)),this.callback(c)}}),j(this,Lt,e),this.callback=i,this.fps=a}start(){G(this,Ze)===0&&(j(this,wt,performance.now()),j(this,Ea,G(this,wt)),j(this,va,0),G(this,ga).call(this))}stop(){G(this,Ze)!==0&&(cancelAnimationFrame(G(this,Ze)),j(this,Ze,0))}update({start:e,duration:i,playbackRate:a}){let r=e-G(this,Lt).valueAsNumber,o=Math.abs(i-this.duration);(r>0||r<-.03||o>=.5)&&this.callback(e),j(this,_a,e),j(this,fa,performance.now()),this.duration=i,this.playbackRate=a}};Lt=new WeakMap;Ea=new WeakMap;wt=new WeakMap;li=new WeakMap;va=new WeakMap;fa=new WeakMap;_a=new WeakMap;Rt=new WeakMap;Ze=new WeakMap;ga=new WeakMap;var Ar=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},x=(t,e,i)=>(Ar(t,e,"read from private field"),i?i.call(t):e.get(t)),W=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},ie=(t,e,i,a)=>(Ar(t,e,"write to private field"),a?a.call(t,i):e.set(t,i),i),ae=(t,e,i)=>(Ar(t,e,"access private method"),i),Ct,$e,Ia,ci,Sa,Ta,ui,hi,Dt,Ot,di,fr,Co,_r,ka,Tr,Ma,Ir,ya,Sr,gr,Do,mi,La,br,Oo,fd=t=>{let e=t.range,i=Oe(+Uo(t)),a=Oe(+t.mediaSeekableEnd),r=i&&a?m("{currentTime} of {totalTime}",{currentTime:i,totalTime:a}):m("video not loaded, unknown time.");e.setAttribute("aria-valuetext",r)};function _d(t){return`
    <style>
      :host {
        --media-box-border-radius: 4px;
        --media-box-padding-left: 10px;
        --media-box-padding-right: 10px;
        --media-preview-border-radius: var(--media-box-border-radius);
        --media-box-arrow-offset: var(--media-box-border-radius);
        --_control-background: var(--media-control-background, var(--media-secondary-color, rgb(20 20 30 / .7)));
        --_preview-background: var(--media-preview-background, var(--_control-background));

        
        contain: layout;
      }

      #buffered {
        background: var(--media-time-range-buffered-color, rgb(255 255 255 / .4));
        position: absolute;
        height: 100%;
        will-change: width;
      }

      #preview-rail,
      #current-rail {
        width: 100%;
        position: absolute;
        left: 0;
        bottom: 100%;
        pointer-events: none;
        will-change: transform;
      }

      [part~="box"] {
        width: min-content;
        
        position: absolute;
        bottom: 100%;
        flex-direction: column;
        align-items: center;
        transform: translateX(-50%);
      }

      [part~="current-box"] {
        display: var(--media-current-box-display, var(--media-box-display, flex));
        margin: var(--media-current-box-margin, var(--media-box-margin, 0 0 5px));
        visibility: hidden;
      }

      [part~="preview-box"] {
        display: var(--media-preview-box-display, var(--media-box-display, flex));
        margin: var(--media-preview-box-margin, var(--media-box-margin, 0 0 5px));
        transition-property: var(--media-preview-transition-property, visibility, opacity);
        transition-duration: var(--media-preview-transition-duration-out, .25s);
        transition-delay: var(--media-preview-transition-delay-out, 0s);
        visibility: hidden;
        opacity: 0;
      }

      :host(:is([${s.MEDIA_PREVIEW_IMAGE}], [${s.MEDIA_PREVIEW_TIME}])[dragging]) [part~="preview-box"] {
        transition-duration: var(--media-preview-transition-duration-in, .5s);
        transition-delay: var(--media-preview-transition-delay-in, .25s);
        visibility: visible;
        opacity: 1;
      }

      @media (hover: hover) {
        :host(:is([${s.MEDIA_PREVIEW_IMAGE}], [${s.MEDIA_PREVIEW_TIME}]):hover) [part~="preview-box"] {
          transition-duration: var(--media-preview-transition-duration-in, .5s);
          transition-delay: var(--media-preview-transition-delay-in, .25s);
          visibility: visible;
          opacity: 1;
        }
      }

      media-preview-thumbnail,
      ::slotted(media-preview-thumbnail) {
        visibility: hidden;
        
        transition: visibility 0s .25s;
        transition-delay: calc(var(--media-preview-transition-delay-out, 0s) + var(--media-preview-transition-duration-out, .25s));
        background: var(--media-preview-thumbnail-background, var(--_preview-background));
        box-shadow: var(--media-preview-thumbnail-box-shadow, 0 0 4px rgb(0 0 0 / .2));
        max-width: var(--media-preview-thumbnail-max-width, 180px);
        max-height: var(--media-preview-thumbnail-max-height, 160px);
        min-width: var(--media-preview-thumbnail-min-width, 120px);
        min-height: var(--media-preview-thumbnail-min-height, 80px);
        border: var(--media-preview-thumbnail-border);
        border-radius: var(--media-preview-thumbnail-border-radius,
          var(--media-preview-border-radius) var(--media-preview-border-radius) 0 0);
      }

      :host([${s.MEDIA_PREVIEW_IMAGE}][dragging]) media-preview-thumbnail,
      :host([${s.MEDIA_PREVIEW_IMAGE}][dragging]) ::slotted(media-preview-thumbnail) {
        transition-delay: var(--media-preview-transition-delay-in, .25s);
        visibility: visible;
      }

      @media (hover: hover) {
        :host([${s.MEDIA_PREVIEW_IMAGE}]:hover) media-preview-thumbnail,
        :host([${s.MEDIA_PREVIEW_IMAGE}]:hover) ::slotted(media-preview-thumbnail) {
          transition-delay: var(--media-preview-transition-delay-in, .25s);
          visibility: visible;
        }

        :host([${s.MEDIA_PREVIEW_TIME}]:hover) {
          --media-time-range-hover-display: block;
        }
      }

      media-preview-chapter-display,
      ::slotted(media-preview-chapter-display) {
        font-size: var(--media-font-size, 13px);
        line-height: 17px;
        min-width: 0;
        visibility: hidden;
        
        transition: min-width 0s, border-radius 0s, margin 0s, padding 0s, visibility 0s;
        transition-delay: calc(var(--media-preview-transition-delay-out, 0s) + var(--media-preview-transition-duration-out, .25s));
        background: var(--media-preview-chapter-background, var(--_preview-background));
        border-radius: var(--media-preview-chapter-border-radius,
          var(--media-preview-border-radius) var(--media-preview-border-radius)
          var(--media-preview-border-radius) var(--media-preview-border-radius));
        padding: var(--media-preview-chapter-padding, 3.5px 9px);
        margin: var(--media-preview-chapter-margin, 0 0 5px);
        text-shadow: var(--media-preview-chapter-text-shadow, 0 0 4px rgb(0 0 0 / .75));
      }

      :host([${s.MEDIA_PREVIEW_IMAGE}]) media-preview-chapter-display,
      :host([${s.MEDIA_PREVIEW_IMAGE}]) ::slotted(media-preview-chapter-display) {
        transition-delay: var(--media-preview-transition-delay-in, .25s);
        border-radius: var(--media-preview-chapter-border-radius, 0);
        padding: var(--media-preview-chapter-padding, 3.5px 9px 0);
        margin: var(--media-preview-chapter-margin, 0);
        min-width: 100%;
      }

      media-preview-chapter-display[${s.MEDIA_PREVIEW_CHAPTER}],
      ::slotted(media-preview-chapter-display[${s.MEDIA_PREVIEW_CHAPTER}]) {
        visibility: visible;
      }

      media-preview-chapter-display:not([aria-valuetext]),
      ::slotted(media-preview-chapter-display:not([aria-valuetext])) {
        display: none;
      }

      media-preview-time-display,
      ::slotted(media-preview-time-display),
      media-time-display,
      ::slotted(media-time-display) {
        font-size: var(--media-font-size, 13px);
        line-height: 17px;
        min-width: 0;
        
        transition: min-width 0s, border-radius 0s;
        transition-delay: calc(var(--media-preview-transition-delay-out, 0s) + var(--media-preview-transition-duration-out, .25s));
        background: var(--media-preview-time-background, var(--_preview-background));
        border-radius: var(--media-preview-time-border-radius,
          var(--media-preview-border-radius) var(--media-preview-border-radius)
          var(--media-preview-border-radius) var(--media-preview-border-radius));
        padding: var(--media-preview-time-padding, 3.5px 9px);
        margin: var(--media-preview-time-margin, 0);
        text-shadow: var(--media-preview-time-text-shadow, 0 0 4px rgb(0 0 0 / .75));
        transform: translateX(min(
          max(calc(50% - var(--_box-width) / 2),
          calc(var(--_box-shift, 0))),
          calc(var(--_box-width) / 2 - 50%)
        ));
      }

      :host([${s.MEDIA_PREVIEW_IMAGE}]) media-preview-time-display,
      :host([${s.MEDIA_PREVIEW_IMAGE}]) ::slotted(media-preview-time-display) {
        transition-delay: var(--media-preview-transition-delay-in, .25s);
        border-radius: var(--media-preview-time-border-radius,
          0 0 var(--media-preview-border-radius) var(--media-preview-border-radius));
        min-width: 100%;
      }

      :host([${s.MEDIA_PREVIEW_TIME}]:hover) {
        --media-time-range-hover-display: block;
      }

      [part~="arrow"],
      ::slotted([part~="arrow"]) {
        display: var(--media-box-arrow-display, inline-block);
        transform: translateX(min(
          max(calc(50% - var(--_box-width) / 2 + var(--media-box-arrow-offset)),
          calc(var(--_box-shift, 0))),
          calc(var(--_box-width) / 2 - 50% - var(--media-box-arrow-offset))
        ));
        
        border-color: transparent;
        border-top-color: var(--media-box-arrow-background, var(--_control-background));
        border-width: var(--media-box-arrow-border-width,
          var(--media-box-arrow-height, 5px) var(--media-box-arrow-width, 6px) 0);
        border-style: solid;
        justify-content: center;
        height: 0;
      }
    </style>
    <div id="preview-rail">
      <slot name="preview" part="box preview-box">
        <media-preview-thumbnail>
          <template shadowrootmode="${da.shadowRootOptions.mode}">
            ${da.getTemplateHTML({})}
          </template>
        </media-preview-thumbnail>
        <media-preview-chapter-display></media-preview-chapter-display>
        <media-preview-time-display></media-preview-time-display>
        <slot name="preview-arrow"><div part="arrow"></div></slot>
      </slot>
    </div>
    <div id="current-rail">
      <slot name="current" part="box current-box">
        
      </slot>
    </div>
  `}var Aa=(t,e=t.mediaCurrentTime)=>{let i=Number.isFinite(t.mediaSeekableStart)?t.mediaSeekableStart:0,a=Number.isFinite(t.mediaDuration)?t.mediaDuration:t.mediaSeekableEnd;if(Number.isNaN(a))return 0;let r=(e-i)/(a-i);return Math.max(0,Math.min(r,1))},Uo=(t,e=t.range.valueAsNumber)=>{let i=Number.isFinite(t.mediaSeekableStart)?t.mediaSeekableStart:0,a=Number.isFinite(t.mediaDuration)?t.mediaDuration:t.mediaSeekableEnd;return Number.isNaN(a)?0:e*(a-i)+i},Ut=class extends pe{constructor(){super(),W(this,fr),W(this,ka),W(this,Ma),W(this,ya),W(this,gr),W(this,mi),W(this,br),W(this,Ct,null),W(this,$e,void 0),W(this,Ia,void 0),W(this,ci,void 0),W(this,Sa,void 0),W(this,Ta,void 0),W(this,ui,void 0),W(this,hi,void 0),W(this,Dt,void 0),W(this,Ot,void 0),W(this,di,()=>{ae(this,fr,Co).call(this)?x(this,$e).start():x(this,$e).stop()}),W(this,_r,a=>{this.dragging||(et(a)&&(this.range.valueAsNumber=a),x(this,Ot)||this.updateBar())}),this.shadowRoot.querySelector("#track").insertAdjacentHTML("afterbegin",'<div id="buffered" part="buffered"></div>'),ie(this,Ia,this.shadowRoot.querySelectorAll('[part~="box"]')),ie(this,Sa,this.shadowRoot.querySelector('[part~="preview-box"]')),ie(this,Ta,this.shadowRoot.querySelector('[part~="current-box"]'));let i=getComputedStyle(this);ie(this,ui,parseInt(i.getPropertyValue("--media-box-padding-left"))),ie(this,hi,parseInt(i.getPropertyValue("--media-box-padding-right"))),ie(this,$e,new ba(this.range,x(this,_r),60))}static get observedAttributes(){return[...super.observedAttributes,s.MEDIA_PAUSED,s.MEDIA_DURATION,s.MEDIA_SEEKABLE,s.MEDIA_CURRENT_TIME,s.MEDIA_PREVIEW_IMAGE,s.MEDIA_PREVIEW_TIME,s.MEDIA_PREVIEW_CHAPTER,s.MEDIA_BUFFERED,s.MEDIA_PLAYBACK_RATE,s.MEDIA_LOADING,s.MEDIA_ENDED]}connectedCallback(){var e;super.connectedCallback(),this.range.setAttribute("aria-label",m("seek")),x(this,di).call(this),ie(this,Ct,this.getRootNode()),(e=x(this,Ct))==null||e.addEventListener("transitionstart",this)}disconnectedCallback(){var e;super.disconnectedCallback(),x(this,$e).stop(),(e=x(this,Ct))==null||e.removeEventListener("transitionstart",this),ie(this,Ct,null)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),i!=a&&(e===s.MEDIA_CURRENT_TIME||e===s.MEDIA_PAUSED||e===s.MEDIA_ENDED||e===s.MEDIA_LOADING||e===s.MEDIA_DURATION||e===s.MEDIA_SEEKABLE?(x(this,$e).update({start:Aa(this),duration:this.mediaSeekableEnd-this.mediaSeekableStart,playbackRate:this.mediaPlaybackRate}),x(this,di).call(this),fd(this)):e===s.MEDIA_BUFFERED&&this.updateBufferedBar(),(e===s.MEDIA_DURATION||e===s.MEDIA_SEEKABLE)&&(this.mediaChaptersCues=x(this,Dt),this.updateBar()))}get mediaChaptersCues(){return x(this,Dt)}set mediaChaptersCues(e){var i;ie(this,Dt,e),this.updateSegments((i=x(this,Dt))==null?void 0:i.map(a=>({start:Aa(this,a.startTime),end:Aa(this,a.endTime)})))}get mediaPaused(){return b(this,s.MEDIA_PAUSED)}set mediaPaused(e){g(this,s.MEDIA_PAUSED,e)}get mediaLoading(){return b(this,s.MEDIA_LOADING)}set mediaLoading(e){g(this,s.MEDIA_LOADING,e)}get mediaDuration(){return C(this,s.MEDIA_DURATION)}set mediaDuration(e){O(this,s.MEDIA_DURATION,e)}get mediaCurrentTime(){return C(this,s.MEDIA_CURRENT_TIME)}set mediaCurrentTime(e){O(this,s.MEDIA_CURRENT_TIME,e)}get mediaPlaybackRate(){return C(this,s.MEDIA_PLAYBACK_RATE,1)}set mediaPlaybackRate(e){O(this,s.MEDIA_PLAYBACK_RATE,e)}get mediaBuffered(){let e=this.getAttribute(s.MEDIA_BUFFERED);return e?e.split(" ").map(i=>i.split(":").map(a=>+a)):[]}set mediaBuffered(e){if(!e){this.removeAttribute(s.MEDIA_BUFFERED);return}let i=e.map(a=>a.join(":")).join(" ");this.setAttribute(s.MEDIA_BUFFERED,i)}get mediaSeekable(){let e=this.getAttribute(s.MEDIA_SEEKABLE);if(e)return e.split(":").map(i=>+i)}set mediaSeekable(e){if(e==null){this.removeAttribute(s.MEDIA_SEEKABLE);return}this.setAttribute(s.MEDIA_SEEKABLE,e.join(":"))}get mediaSeekableEnd(){var e;let[,i=this.mediaDuration]=(e=this.mediaSeekable)!=null?e:[];return i}get mediaSeekableStart(){var e;let[i=0]=(e=this.mediaSeekable)!=null?e:[];return i}get mediaPreviewImage(){return R(this,s.MEDIA_PREVIEW_IMAGE)}set mediaPreviewImage(e){L(this,s.MEDIA_PREVIEW_IMAGE,e)}get mediaPreviewTime(){return C(this,s.MEDIA_PREVIEW_TIME)}set mediaPreviewTime(e){O(this,s.MEDIA_PREVIEW_TIME,e)}get mediaEnded(){return b(this,s.MEDIA_ENDED)}set mediaEnded(e){g(this,s.MEDIA_ENDED,e)}updateBar(){super.updateBar(),this.updateBufferedBar(),this.updateCurrentBox()}updateBufferedBar(){var e;let i=this.mediaBuffered;if(!i.length)return;let a;if(this.mediaEnded)a=1;else{let o=this.mediaCurrentTime,[,l=this.mediaSeekableStart]=(e=i.find(([d,c])=>d<=o&&o<=c))!=null?e:[];a=Aa(this,l)}let{style:r}=U(this.shadowRoot,"#buffered");r.setProperty("width",`${a*100}%`)}updateCurrentBox(){if(!this.shadowRoot.querySelector('slot[name="current"]').assignedElements().length)return;let i=U(this.shadowRoot,"#current-rail"),a=U(this.shadowRoot,'[part~="current-box"]'),r=ae(this,ka,Tr).call(this,x(this,Ta)),o=ae(this,Ma,Ir).call(this,r,this.range.valueAsNumber),l=ae(this,ya,Sr).call(this,r,this.range.valueAsNumber);i.style.transform=`translateX(${o})`,i.style.setProperty("--_range-width",`${r.range.width}`),a.style.setProperty("--_box-shift",`${l}`),a.style.setProperty("--_box-width",`${r.box.width}px`),a.style.setProperty("visibility","initial")}handleEvent(e){switch(super.handleEvent(e),e.type){case"input":ae(this,br,Oo).call(this);break;case"pointermove":ae(this,gr,Do).call(this,e);break;case"pointerup":x(this,Ot)&&ie(this,Ot,!1);break;case"pointerdown":ie(this,Ot,!0);break;case"pointerleave":ae(this,mi,La).call(this,null);break;case"transitionstart":we(e.target,this)&&setTimeout(()=>x(this,di).call(this),0);break}}};Ct=new WeakMap;$e=new WeakMap;Ia=new WeakMap;ci=new WeakMap;Sa=new WeakMap;Ta=new WeakMap;ui=new WeakMap;hi=new WeakMap;Dt=new WeakMap;Ot=new WeakMap;di=new WeakMap;fr=new WeakSet;Co=function(){return this.isConnected&&!this.mediaPaused&&!this.mediaLoading&&!this.mediaEnded&&this.mediaSeekableEnd>0&&ss(this)};_r=new WeakMap;ka=new WeakSet;Tr=function(t){var e;let a=((e=this.getAttribute("bounds")?Ai(this,`#${this.getAttribute("bounds")}`):this.parentElement)!=null?e:this).getBoundingClientRect(),r=this.range.getBoundingClientRect(),o=t.offsetWidth,l=-(r.left-a.left-o/2),d=a.right-r.left-o/2;return{box:{width:o,min:l,max:d},bounds:a,range:r}};Ma=new WeakSet;Ir=function(t,e){let i=`${e*100}%`,{width:a,min:r,max:o}=t.box;if(!a)return i;if(Number.isNaN(r)||(i=`max(${`calc(1 / var(--_range-width) * 100 * ${r}% + var(--media-box-padding-left))`}, ${i})`),!Number.isNaN(o)){let d=`calc(1 / var(--_range-width) * 100 * ${o}% - var(--media-box-padding-right))`;i=`min(${i}, ${d})`}return i};ya=new WeakSet;Sr=function(t,e){let{width:i,min:a,max:r}=t.box,o=e*t.range.width;if(o<a+x(this,ui)){let l=t.range.left-t.bounds.left-x(this,ui);return`${o-i/2+l}px`}if(o>r-x(this,hi)){let l=t.bounds.right-t.range.right-x(this,hi);return`${o+i/2-l-t.range.width}px`}return 0};gr=new WeakSet;Do=function(t){let e=[...x(this,Ia)].some(S=>t.composedPath().includes(S));if(!this.dragging&&(e||!t.composedPath().includes(this))){ae(this,mi,La).call(this,null);return}let i=this.mediaSeekableEnd;if(!i)return;let a=U(this.shadowRoot,"#preview-rail"),r=U(this.shadowRoot,'[part~="preview-box"]'),o=ae(this,ka,Tr).call(this,x(this,Sa)),l=(t.clientX-o.range.left)/o.range.width;l=Math.max(0,Math.min(1,l));let d=ae(this,Ma,Ir).call(this,o,l),c=ae(this,ya,Sr).call(this,o,l);a.style.transform=`translateX(${d})`,a.style.setProperty("--_range-width",`${o.range.width}`),r.style.setProperty("--_box-shift",`${c}`),r.style.setProperty("--_box-width",`${o.box.width}px`);let k=Math.round(x(this,ci))-Math.round(l*i);Math.abs(k)<1&&l>.01&&l<.99||(ie(this,ci,l*i),ae(this,mi,La).call(this,x(this,ci)))};mi=new WeakSet;La=function(t){this.dispatchEvent(new n.CustomEvent(h.MEDIA_PREVIEW_REQUEST,{composed:!0,bubbles:!0,detail:t}))};br=new WeakSet;Oo=function(){x(this,$e).stop();let t=Uo(this);this.dispatchEvent(new n.CustomEvent(h.MEDIA_SEEK_REQUEST,{composed:!0,bubbles:!0,detail:t}))};Ut.shadowRootOptions={mode:"open"};Ut.getContainerTemplateHTML=_d;n.customElements.get("media-time-range")||n.customElements.define("media-time-range",Ut);var gd=Ut;var bd=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},xo=(t,e,i)=>(bd(t,e,"read from private field"),i?i.call(t):e.get(t)),Ad=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},wa,Td=1,Id=t=>t.mediaMuted?0:t.mediaVolume,Sd=t=>`${Math.round(t*100)}%`,Ra=class extends pe{constructor(){super(...arguments),Ad(this,wa,()=>{let e=this.range.value,i=new n.CustomEvent(h.MEDIA_VOLUME_REQUEST,{composed:!0,bubbles:!0,detail:e});this.dispatchEvent(i)})}static get observedAttributes(){return[...super.observedAttributes,s.MEDIA_VOLUME,s.MEDIA_MUTED,s.MEDIA_VOLUME_UNAVAILABLE]}connectedCallback(){super.connectedCallback(),this.range.setAttribute("aria-label",m("volume")),this.range.addEventListener("input",xo(this,wa))}disconnectedCallback(){this.range.removeEventListener("input",xo(this,wa)),super.disconnectedCallback()}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),(e===s.MEDIA_VOLUME||e===s.MEDIA_MUTED)&&(this.range.valueAsNumber=Id(this),this.range.setAttribute("aria-valuetext",Sd(this.range.valueAsNumber)),this.updateBar())}get mediaVolume(){return C(this,s.MEDIA_VOLUME,Td)}set mediaVolume(e){O(this,s.MEDIA_VOLUME,e)}get mediaMuted(){return b(this,s.MEDIA_MUTED)}set mediaMuted(e){g(this,s.MEDIA_MUTED,e)}get mediaVolumeUnavailable(){return R(this,s.MEDIA_VOLUME_UNAVAILABLE)}set mediaVolumeUnavailable(e){L(this,s.MEDIA_VOLUME_UNAVAILABLE,e)}};wa=new WeakMap;n.customElements.get("media-volume-range")||n.customElements.define("media-volume-range",Ra);var kd=Ra;function Md(t){return`
      <style>
        :host {
          min-width: 4ch;
          padding: var(--media-button-padding, var(--media-control-padding, 10px 5px));
          width: 100%;
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 1rem;
          font-weight: var(--media-button-font-weight, normal);
        }

        #checked-indicator {
          display: none;
        }

        :host([${s.MEDIA_LOOP}]) #checked-indicator {
          display: block;
        }
      </style>
      
      <span id="icon">
     </span>

      <div id="checked-indicator">
        <svg aria-hidden="true" viewBox="0 1 24 24" part="checked-indicator indicator">
          <path d="m10 15.17 9.193-9.191 1.414 1.414-10.606 10.606-6.364-6.364 1.414-1.414 4.95 4.95Z"/>
        </svg>
      </div>
    `}function yd(){return m("Loop")}var xt=class extends F{constructor(){super(...arguments),this.container=null}static get observedAttributes(){return[...super.observedAttributes,s.MEDIA_LOOP]}connectedCallback(){var e;super.connectedCallback(),this.container=((e=this.shadowRoot)==null?void 0:e.querySelector("#icon"))||null,this.container&&(this.container.textContent=m("Loop"))}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===s.MEDIA_LOOP&&this.container&&this.setAttribute("aria-checked",this.mediaLoop?"true":"false")}get mediaLoop(){return b(this,s.MEDIA_LOOP)}set mediaLoop(e){g(this,s.MEDIA_LOOP,e)}handleClick(){let e=!this.mediaLoop,i=new n.CustomEvent(h.MEDIA_LOOP_REQUEST,{composed:!0,bubbles:!0,detail:e});this.dispatchEvent(i)}};xt.getSlotTemplateHTML=Md;xt.getTooltipContentHTML=yd;n.customElements.get("media-loop-button")||n.customElements.define("media-loop-button",xt);var Ld=xt;export{ps as a,Ii as b,_ as c,an as d,Tn as e,kn as f,Rn as g,xn as h,Fn as i,Bn as j,Kn as k,Qn as l,Jn as m,ol as n,cl as o,_l as p,Il as q,Ml as r,Cl as s,Ul as t,Hl as u,Vl as v,ql as w,da as x,Jl as y,rd as z,cd as A,Ed as B,gd as C,kd as D,Ld as E};
