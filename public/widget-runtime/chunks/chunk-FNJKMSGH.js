/* Renuvex Product Reviews ESM runtime | theme: default */
import{$ as mi,A as u,B as ge,E as ft,F as li,G as di,H as z,L as hi,M as D,N as R,Q as O,R as N,S as ci,T as Rt,V as be,W as Ht,Z as ui,a as w,b as ve,ba as pi,ca as fi,d as a,da as K,o as ri,q as oi,v as r,w as ut,x as mt,y as pt,z as Dt}from"./chunk-F2BFFALM.js";import{d as f}from"./chunk-JAGRGK2W.js";import{c as fe}from"./chunk-D4BSMMIO.js";function vi({anchor:e,floating:t,placement:i}){let n=Yi({anchor:e,floating:t}),{x:s,y:o}=Fi(n,i);return{x:s,y:o}}function Yi({anchor:e,floating:t}){return{anchor:zi(e,t.offsetParent),floating:{x:0,y:0,width:t.offsetWidth,height:t.offsetHeight}}}function zi(e,t){var i;let n=e.getBoundingClientRect(),s=(i=t==null?void 0:t.getBoundingClientRect())!=null?i:{x:0,y:0};return{x:n.x-s.x,y:n.y-s.y,width:n.width,height:n.height}}function Fi({anchor:e,floating:t},i){let n=Ji(i)==="x"?"y":"x",s=n==="y"?"height":"width",o=gi(i),l=e.x+e.width/2-t.width/2,p=e.y+e.height/2-t.height/2,m=e[s]/2-t[s]/2,A;switch(o){case"top":A={x:l,y:e.y-t.height};break;case"bottom":A={x:l,y:e.y+e.height};break;case"right":A={x:e.x+e.width,y:p};break;case"left":A={x:e.x-t.width,y:p};break;default:A={x:e.x,y:e.y}}switch(i.split("-")[1]){case"start":A[n]-=m;break;case"end":A[n]+=m;break}return A}function gi(e){return e.split("-")[0]}function Ji(e){return["top","bottom"].includes(gi(e))?"y":"x"}var U=class extends Event{constructor(s){var o=s,{action:t="auto",relatedTarget:i}=o,n=fe(o,["action","relatedTarget"]);super("invoke",n),this.action=t,this.relatedTarget=i}},Wt=class extends Event{constructor(s){var o=s,{newState:t,oldState:i}=o,n=fe(o,["newState","oldState"]);super("toggle",n),this.newState=t,this.oldState=i}};var Le=(e,t,i)=>{if(!t.has(e))throw TypeError("Cannot "+i)},d=(e,t,i)=>(Le(e,t,"read from private field"),i?i.call(e):t.get(e)),h=(e,t,i)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,i)},E=(e,t,i,n)=>(Le(e,t,"write to private field"),n?n.call(e,i):t.set(e,i),i),c=(e,t,i)=>(Le(e,t,"access private method"),i),y,$,H,Bt,vt,G,_t,_e,bi,Ut,we,$t,Ot,Ee,ke,_i,Te,Ei,Ae,ki,F,J,Q,Et,Pt,De,Se,Ti,Re,Ai,ye,Si,He,yi,Me,Mi,Ie,Ii,gt,Kt,xe,xi,bt,qt,Nt,Ce;function M({type:e,text:t,value:i,checked:n}){let s=ut.createElement("media-chrome-menu-item");s.type=e!=null?e:"",s.part.add("menu-item"),e&&s.part.add(e),s.value=i,s.checked=n;let o=ut.createElement("span");return o.textContent=t,s.append(o),s}function S(e,t){let i=e.querySelector(`:scope > [slot="${t}"]`);if((i==null?void 0:i.nodeName)=="SLOT"&&(i=i.assignedElements({flatten:!0})[0]),i)return i=i.cloneNode(!0),i;let n=e.shadowRoot.querySelector(`[name="${t}"] > svg`);return n?n.cloneNode(!0):""}function Qi(e){return`
    <style>
      :host {
        font: var(--media-font,
          var(--media-font-weight, normal)
          var(--media-font-size, 14px) /
          var(--media-text-content-height, var(--media-control-height, 24px))
          var(--media-font-family, helvetica neue, segoe ui, roboto, arial, sans-serif));
        color: var(--media-text-color, var(--media-primary-color, rgb(238 238 238)));
        --_menu-bg: rgb(20 20 30 / .8);
        background: var(--media-menu-background, var(--media-control-background, var(--media-secondary-color, var(--_menu-bg))));
        border-radius: var(--media-menu-border-radius);
        border: var(--media-menu-border, none);
        display: var(--media-menu-display, inline-flex) !important;
        
        transition: var(--media-menu-transition-in,
          visibility 0s,
          opacity .2s ease-out,
          transform .15s ease-out,
          left .2s ease-in-out,
          min-width .2s ease-in-out,
          min-height .2s ease-in-out
        ) !important;
        
        visibility: var(--media-menu-visibility, visible);
        opacity: var(--media-menu-opacity, 1);
        max-height: var(--media-menu-max-height, var(--_menu-max-height, 300px));
        transform: var(--media-menu-transform-in, translateY(0) scale(1));
        flex-direction: column;
        
        min-height: 0;
        position: relative;
        bottom: var(--_menu-bottom);
        box-sizing: border-box;
      } 

      @-moz-document url-prefix() {
        :host{
          --_menu-bg: rgb(20 20 30);
        }
      }

      :host([hidden]) {
        transition: var(--media-menu-transition-out,
          visibility .15s ease-in,
          opacity .15s ease-in,
          transform .15s ease-in
        ) !important;
        visibility: var(--media-menu-hidden-visibility, hidden);
        opacity: var(--media-menu-hidden-opacity, 0);
        max-height: var(--media-menu-hidden-max-height,
          var(--media-menu-max-height, var(--_menu-max-height, 300px)));
        transform: var(--media-menu-transform-out, translateY(2px) scale(.99));
        pointer-events: none;
      }

      :host([slot="submenu"]) {
        background: none;
        width: 100%;
        min-height: 100%;
        position: absolute;
        bottom: 0;
        right: -100%;
      }

      #container {
        display: flex;
        flex-direction: column;
        min-height: 0;
        transition: transform .2s ease-out;
        transform: translate(0, 0);
      }

      #container.has-expanded {
        transition: transform .2s ease-in;
        transform: translate(-100%, 0);
      }

      button {
        background: none;
        color: inherit;
        border: none;
        padding: 0;
        font: inherit;
        outline: inherit;
        display: inline-flex;
        align-items: center;
      }

      slot[name="header"][hidden] {
        display: none;
      }

      slot[name="header"] > *,
      slot[name="header"]::slotted(*) {
        padding: .4em .7em;
        border-bottom: 1px solid rgb(255 255 255 / .25);
        cursor: var(--media-cursor, default);
      }

      slot[name="header"] > button[part~="back"],
      slot[name="header"]::slotted(button[part~="back"]) {
        cursor: var(--media-cursor, pointer);
      }

      svg[part~="back"] {
        height: var(--media-menu-icon-height, var(--media-control-height, 24px));
        fill: var(--media-icon-color, var(--media-primary-color, rgb(238 238 238)));
        display: block;
        margin-right: .5ch;
      }

      slot:not([name]) {
        gap: var(--media-menu-gap);
        flex-direction: var(--media-menu-flex-direction, column);
        overflow: var(--media-menu-overflow, hidden auto);
        display: flex;
        min-height: 0;
      }

      :host([role="menu"]) slot:not([name]) {
        padding-block: .4em;
      }

      slot:not([name])::slotted([role="menu"]) {
        background: none;
      }

      media-chrome-menu-item > span {
        margin-right: .5ch;
        max-width: var(--media-menu-item-max-width);
        text-overflow: ellipsis;
        overflow: hidden;
      }
    </style>
    <style id="layout-row" media="width:0">

      slot[name="header"] > *,
      slot[name="header"]::slotted(*) {
        padding: .4em .5em;
      }

      slot:not([name]) {
        gap: var(--media-menu-gap, .25em);
        flex-direction: var(--media-menu-flex-direction, row);
        padding-inline: .5em;
      }

      media-chrome-menu-item {
        padding: .3em .5em;
      }

      media-chrome-menu-item[aria-checked="true"] {
        background: var(--media-menu-item-checked-background, rgb(255 255 255 / .2));
      }

      
      media-chrome-menu-item::part(checked-indicator) {
        display: var(--media-menu-item-checked-indicator-display, none);
      }
    </style>
    <div id="container" part="container">
      <slot name="header" hidden>
        <button part="back button" aria-label="Back to previous menu">
          <slot name="back-icon">
            <svg aria-hidden="true" viewBox="0 0 20 24" part="back indicator">
              <path d="m11.88 17.585.742-.669-4.2-4.665 4.2-4.666-.743-.669-4.803 5.335 4.803 5.334Z"/>
            </svg>
          </slot>
          <slot name="title"></slot>
        </button>
      </slot>
      <slot></slot>
    </div>
    <slot name="checked-indicator" hidden></slot>
  `}var q={STYLE:"style",HIDDEN:"hidden",DISABLED:"disabled",ANCHOR:"anchor"},v=class extends r.HTMLElement{constructor(){if(super(),h(this,_e),h(this,Ut),h(this,Ot),h(this,ke),h(this,Te),h(this,Ae),h(this,Q),h(this,Pt),h(this,Se),h(this,Re),h(this,ye),h(this,He),h(this,Me),h(this,Ie),h(this,gt),h(this,xe),h(this,bt),h(this,Nt),h(this,y,null),h(this,$,null),h(this,H,null),h(this,Bt,new Set),h(this,vt,void 0),h(this,G,!1),h(this,_t,null),h(this,$t,()=>{let t=d(this,Bt),i=new Set(this.items);for(let n of t)i.has(n)||this.dispatchEvent(new CustomEvent("removemenuitem",{detail:n}));for(let n of i)t.has(n)||this.dispatchEvent(new CustomEvent("addmenuitem",{detail:n}));E(this,Bt,i)}),h(this,F,()=>{c(this,Q,Et).call(this),c(this,Pt,De).call(this,!1)}),h(this,J,()=>{c(this,Q,Et).call(this)}),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);let t=Dt(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(t)}this.container=this.shadowRoot.querySelector("#container"),this.defaultSlot=this.shadowRoot.querySelector("slot:not([name])"),E(this,vt,new MutationObserver(d(this,$t)))}static get observedAttributes(){return[q.DISABLED,q.HIDDEN,q.STYLE,q.ANCHOR,ve.MEDIA_CONTROLLER]}static formatMenuItemText(t,i){return t}enable(){this.addEventListener("click",this),this.addEventListener("focusout",this),this.addEventListener("keydown",this),this.addEventListener("invoke",this),this.addEventListener("toggle",this)}disable(){this.removeEventListener("click",this),this.removeEventListener("focusout",this),this.removeEventListener("keyup",this),this.removeEventListener("invoke",this),this.removeEventListener("toggle",this)}handleEvent(t){switch(t.type){case"slotchange":c(this,_e,bi).call(this,t);break;case"invoke":c(this,ke,_i).call(this,t);break;case"click":c(this,Se,Ti).call(this,t);break;case"toggle":c(this,ye,Si).call(this,t);break;case"focusout":c(this,Me,Mi).call(this,t);break;case"keydown":c(this,Ie,Ii).call(this,t);break}}connectedCallback(){var t,i;d(this,vt).observe(this.defaultSlot,{childList:!0}),E(this,_t,hi(this.shadowRoot,":host")),c(this,Ot,Ee).call(this),this.hasAttribute("disabled")||this.enable(),this.role||(this.role="menu"),E(this,y,ge(this)),(i=(t=d(this,y))==null?void 0:t.associateElement)==null||i.call(t,this),this.hidden||(mt(kt(this),d(this,F)),mt(this,d(this,J))),c(this,Ut,we).call(this),this.shadowRoot.addEventListener("slotchange",this)}disconnectedCallback(){var t,i;d(this,vt).disconnect(),pt(kt(this),d(this,F)),pt(this,d(this,J)),this.disable(),(i=(t=d(this,y))==null?void 0:t.unassociateElement)==null||i.call(t,this),E(this,y,null),E(this,$,null),E(this,H,null),this.shadowRoot.removeEventListener("slotchange",this)}attributeChangedCallback(t,i,n){var s,o,l,p;t===q.HIDDEN&&n!==i?(d(this,G)||E(this,G,!0),this.hidden?c(this,Ae,ki).call(this):c(this,Te,Ei).call(this),this.dispatchEvent(new Wt({oldState:this.hidden?"open":"closed",newState:this.hidden?"closed":"open",bubbles:!0}))):t===ve.MEDIA_CONTROLLER?(i&&((o=(s=d(this,y))==null?void 0:s.unassociateElement)==null||o.call(s,this),E(this,y,null)),n&&this.isConnected&&(E(this,y,ge(this)),(p=(l=d(this,y))==null?void 0:l.associateElement)==null||p.call(l,this))):t===q.DISABLED&&n!==i?n==null?this.enable():this.disable():t===q.STYLE&&n!==i&&c(this,Ot,Ee).call(this)}formatMenuItemText(t,i){return this.constructor.formatMenuItemText(t,i)}get anchor(){return this.getAttribute("anchor")}set anchor(t){this.setAttribute("anchor",`${t}`)}get anchorElement(){var t;return this.anchor?(t=z(this))==null?void 0:t.querySelector(`#${this.anchor}`):null}get items(){return this.defaultSlot.assignedElements({flatten:!0}).filter(Xi)}get radioGroupItems(){return this.items.filter(t=>t.role==="menuitemradio")}get checkedItems(){return this.items.filter(t=>t.checked)}get value(){var t,i;return(i=(t=this.checkedItems[0])==null?void 0:t.value)!=null?i:""}set value(t){let i=this.items.find(n=>n.value===t);i&&c(this,Nt,Ce).call(this,i)}focus(){if(E(this,$,di()),this.items.length){c(this,bt,qt).call(this,this.items[0]),this.items[0].focus();return}let t=this.querySelector('[autofocus], [tabindex]:not([tabindex="-1"]), [role="menu"]');t==null||t.focus()}handleSelect(t){var i;let n=c(this,gt,Kt).call(this,t);n&&(c(this,Nt,Ce).call(this,n,n.type==="checkbox"),d(this,H)&&!this.hidden&&((i=d(this,$))==null||i.focus(),this.hidden=!0))}get keysUsed(){return["Enter","Escape","Tab"," ","ArrowDown","ArrowUp","Home","End"]}handleMove(t){var i,n;let{key:s}=t,o=this.items,l=(n=(i=c(this,gt,Kt).call(this,t))!=null?i:c(this,xe,xi).call(this))!=null?n:o[0],p=o.indexOf(l),m=Math.max(0,p);s==="ArrowDown"?m++:s==="ArrowUp"?m--:t.key==="Home"?m=0:t.key==="End"&&(m=o.length-1),m<0&&(m=o.length-1),m>o.length-1&&(m=0),c(this,bt,qt).call(this,o[m]),o[m].focus()}};y=new WeakMap;$=new WeakMap;H=new WeakMap;Bt=new WeakMap;vt=new WeakMap;G=new WeakMap;_t=new WeakMap;_e=new WeakSet;bi=function(e){let t=e.target;for(let i of t.assignedNodes({flatten:!0}))i.nodeType===3&&i.textContent.trim()===""&&i.remove();["header","title"].includes(t.name)&&c(this,Ut,we).call(this),t.name||d(this,$t).call(this)};Ut=new WeakSet;we=function(){let e=this.shadowRoot.querySelector('slot[name="header"]'),t=this.shadowRoot.querySelector('slot[name="title"]');e.hidden=t.assignedNodes().length===0&&e.assignedNodes().length===0};$t=new WeakMap;Ot=new WeakSet;Ee=function(){var e;let t=this.shadowRoot.querySelector("#layout-row"),i=(e=getComputedStyle(this).getPropertyValue("--media-menu-layout"))==null?void 0:e.trim();t.setAttribute("media",i==="row"?"":"width:0")};ke=new WeakSet;_i=function(e){E(this,H,e.relatedTarget),ft(this,e.relatedTarget)||(this.hidden=!this.hidden)};Te=new WeakSet;Ei=function(){var e;(e=d(this,H))==null||e.setAttribute("aria-expanded","true"),this.addEventListener("transitionend",()=>this.focus(),{once:!0}),mt(kt(this),d(this,F)),mt(this,d(this,J))};Ae=new WeakSet;ki=function(){var e;(e=d(this,H))==null||e.setAttribute("aria-expanded","false"),pt(kt(this),d(this,F)),pt(this,d(this,J))};F=new WeakMap;J=new WeakMap;Q=new WeakSet;Et=function(e){if(this.hasAttribute("mediacontroller")&&!this.anchor||this.hidden||!this.anchorElement)return;let{x:t,y:i}=vi({anchor:this.anchorElement,floating:this,placement:"top-start"});e!=null||(e=this.offsetWidth);let s=kt(this).getBoundingClientRect(),o=s.width-t-e,l=s.height-i-this.offsetHeight,{style:p}=d(this,_t);p.setProperty("position","absolute"),p.setProperty("right",`${Math.max(0,o)}px`),p.setProperty("--_menu-bottom",`${l}px`);let m=getComputedStyle(this),Gi=p.getPropertyValue("--_menu-bottom")===m.bottom?l:parseFloat(m.bottom),Zi=s.height-Gi-parseFloat(m.marginBottom);this.style.setProperty("--_menu-max-height",`${Zi}px`)};Pt=new WeakSet;De=function(e){let t=this.querySelector('[role="menuitem"][aria-haspopup][aria-expanded="true"]'),i=t==null?void 0:t.querySelector('[role="menu"]'),{style:n}=d(this,_t);if(e||n.setProperty("--media-menu-transition-in","none"),i){let s=i.offsetHeight,o=Math.max(i.offsetWidth,t.offsetWidth);this.style.setProperty("min-width",`${o}px`),this.style.setProperty("min-height",`${s}px`),c(this,Q,Et).call(this,o)}else this.style.removeProperty("min-width"),this.style.removeProperty("min-height"),c(this,Q,Et).call(this);n.removeProperty("--media-menu-transition-in")};Se=new WeakSet;Ti=function(e){var t;if(e.stopPropagation(),e.composedPath().includes(d(this,Re,Ai))){(t=d(this,$))==null||t.focus(),this.hidden=!0;return}let i=c(this,gt,Kt).call(this,e);!i||i.hasAttribute("disabled")||(c(this,bt,qt).call(this,i),this.handleSelect(e))};Re=new WeakSet;Ai=function(){var e;return(e=this.shadowRoot.querySelector('slot[name="header"]').assignedElements({flatten:!0}))==null?void 0:e.find(i=>i.matches('button[part~="back"]'))};ye=new WeakSet;Si=function(e){if(e.target===this)return;c(this,He,yi).call(this);let t=Array.from(this.querySelectorAll('[role="menuitem"][aria-haspopup]'));for(let i of t)i.invokeTargetElement!=e.target&&e.newState=="open"&&i.getAttribute("aria-expanded")=="true"&&!i.invokeTargetElement.hidden&&i.invokeTargetElement.dispatchEvent(new U({relatedTarget:i}));for(let i of t)i.setAttribute("aria-expanded",`${!i.submenuElement.hidden}`);c(this,Pt,De).call(this,!0)};He=new WeakSet;yi=function(){let t=this.querySelector('[role="menuitem"] > [role="menu"]:not([hidden])');this.container.classList.toggle("has-expanded",!!t)};Me=new WeakSet;Mi=function(e){var t;ft(this,e.relatedTarget)||(d(this,G)&&((t=d(this,$))==null||t.focus()),d(this,H)&&d(this,H)!==e.relatedTarget&&!this.hidden&&(this.hidden=!0))};Ie=new WeakSet;Ii=function(e){var t,i,n,s,o;let{key:l,ctrlKey:p,altKey:m,metaKey:A}=e;if(!(p||m||A)&&this.keysUsed.includes(l))if(e.preventDefault(),e.stopPropagation(),l==="Tab"){if(d(this,G)){this.hidden=!0;return}e.shiftKey?(i=(t=this.previousElementSibling)==null?void 0:t.focus)==null||i.call(t):(s=(n=this.nextElementSibling)==null?void 0:n.focus)==null||s.call(n),this.blur()}else l==="Escape"?((o=d(this,$))==null||o.focus(),d(this,G)&&(this.hidden=!0)):l==="Enter"||l===" "?this.handleSelect(e):this.handleMove(e)};gt=new WeakSet;Kt=function(e){return e.composedPath().find(t=>["menuitemradio","menuitemcheckbox"].includes(t.role))};xe=new WeakSet;xi=function(){return this.items.find(e=>e.tabIndex===0)};bt=new WeakSet;qt=function(e){for(let t of this.items)t.tabIndex=t===e?0:-1};Nt=new WeakSet;Ce=function(e,t){let i=[...this.checkedItems];e.type==="radio"&&this.radioGroupItems.forEach(n=>n.checked=!1),t?e.checked=!e.checked:e.checked=!0,this.checkedItems.some((n,s)=>n!=i[s])&&this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))};v.shadowRootOptions={mode:"open"};v.getTemplateHTML=Qi;function Xi(e){return["menuitem","menuitemradio","menuitemcheckbox"].includes(e==null?void 0:e.role)}function kt(e){var t;return(t=e.getAttribute("bounds")?li(e,`#${e.getAttribute("bounds")}`):u(e)||e.parentElement)!=null?t:e}r.customElements.get("media-chrome-menu")||r.customElements.define("media-chrome-menu",v);var $e=(e,t,i)=>{if(!t.has(e))throw TypeError("Cannot "+i)},g=(e,t,i)=>($e(e,t,"read from private field"),i?i.call(e):t.get(e)),W=(e,t,i)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,i)},We=(e,t,i,n)=>($e(e,t,"write to private field"),n?n.call(e,i):t.set(e,i),i),V=(e,t,i)=>($e(e,t,"access private method"),i),Gt,At,Be,Ci,Yt,Pe,Ke,Li,I,X,Oe,Zt,Ne;function Vi(e){return`
    <style>
      :host {
        transition: var(--media-menu-item-transition,
          background .15s linear,
          opacity .2s ease-in-out
        );
        outline: var(--media-menu-item-outline, 0);
        outline-offset: var(--media-menu-item-outline-offset, -1px);
        cursor: var(--media-cursor, pointer);
        display: flex;
        align-items: center;
        align-self: stretch;
        justify-self: stretch;
        white-space: nowrap;
        white-space-collapse: collapse;
        text-wrap: nowrap;
        padding: .4em .8em .4em 1em;
      }

      :host(:focus-visible) {
        box-shadow: var(--media-menu-item-focus-shadow, inset 0 0 0 2px rgb(27 127 204 / .9));
        outline: var(--media-menu-item-hover-outline, 0);
        outline-offset: var(--media-menu-item-hover-outline-offset,  var(--media-menu-item-outline-offset, -1px));
      }

      :host(:hover) {
        cursor: var(--media-cursor, pointer);
        background: var(--media-menu-item-hover-background, rgb(92 92 102 / .5));
        outline: var(--media-menu-item-hover-outline);
        outline-offset: var(--media-menu-item-hover-outline-offset,  var(--media-menu-item-outline-offset, -1px));
      }

      :host([aria-checked="true"]) {
        background: var(--media-menu-item-checked-background);
      }

      :host([hidden]) {
        display: none;
      }

      :host([disabled]) {
        pointer-events: none;
        color: rgba(255, 255, 255, .3);
      }

      slot:not([name]) {
        width: 100%;
      }

      slot:not([name="submenu"]) {
        display: inline-flex;
        align-items: center;
        transition: inherit;
        opacity: var(--media-menu-item-opacity, 1);
      }

      slot[name="description"] {
        justify-content: end;
      }

      slot[name="description"] > span {
        display: inline-block;
        margin-inline: 1em .2em;
        max-width: var(--media-menu-item-description-max-width, 100px);
        text-overflow: ellipsis;
        overflow: hidden;
        font-size: .8em;
        font-weight: 400;
        text-align: right;
        position: relative;
        top: .04em;
      }

      slot[name="checked-indicator"] {
        display: none;
      }

      :host(:is([role="menuitemradio"],[role="menuitemcheckbox"])) slot[name="checked-indicator"] {
        display: var(--media-menu-item-checked-indicator-display, inline-block);
      }

      
      svg, img, ::slotted(svg), ::slotted(img) {
        height: var(--media-menu-item-icon-height, var(--media-control-height, 24px));
        fill: var(--media-icon-color, var(--media-primary-color, rgb(238 238 238)));
        display: block;
      }

      
      [part~="indicator"],
      ::slotted([part~="indicator"]) {
        fill: var(--media-menu-item-indicator-fill,
          var(--media-icon-color, var(--media-primary-color, rgb(238 238 238))));
        height: var(--media-menu-item-indicator-height, 1.25em);
        margin-right: .5ch;
      }

      [part~="checked-indicator"] {
        visibility: hidden;
      }

      :host([aria-checked="true"]) [part~="checked-indicator"] {
        visibility: visible;
      }
    </style>
    <slot name="checked-indicator">
      <svg aria-hidden="true" viewBox="0 1 24 24" part="checked-indicator indicator">
        <path d="m10 15.17 9.193-9.191 1.414 1.414-10.606 10.606-6.364-6.364 1.414-1.414 4.95 4.95Z"/>
      </svg>
    </slot>
    <slot name="prefix"></slot>
    <slot></slot>
    <slot name="description"></slot>
    <slot name="suffix">
      ${this.getSuffixSlotInnerHTML(e)}
    </slot>
    <slot name="submenu"></slot>
  `}function ji(e){return""}var k={TYPE:"type",VALUE:"value",CHECKED:"checked",DISABLED:"disabled"},_=class extends r.HTMLElement{constructor(){if(super(),W(this,Be),W(this,Yt),W(this,Ke),W(this,Zt),W(this,Gt,!1),W(this,At,void 0),W(this,I,()=>{var t,i;this.submenuElement.items&&this.setAttribute("submenusize",`${this.submenuElement.items.length}`);let n=this.shadowRoot.querySelector('slot[name="description"]'),s=(t=this.submenuElement.checkedItems)==null?void 0:t[0],o=(i=s==null?void 0:s.dataset.description)!=null?i:s==null?void 0:s.text,l=ut.createElement("span");l.textContent=o!=null?o:"",n.replaceChildren(l)}),W(this,X,t=>{let{key:i}=t;if(!this.keysUsed.includes(i)){this.removeEventListener("keyup",g(this,X));return}this.handleClick(t)}),W(this,Oe,t=>{let{metaKey:i,altKey:n,key:s}=t;if(i||n||!this.keysUsed.includes(s)){this.removeEventListener("keyup",g(this,X));return}this.addEventListener("keyup",g(this,X),{once:!0})}),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);let t=Dt(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(t)}}static get observedAttributes(){return[k.TYPE,k.DISABLED,k.CHECKED,k.VALUE]}enable(){this.hasAttribute("tabindex")||this.setAttribute("tabindex","-1"),Tt(this)&&!this.hasAttribute("aria-checked")&&this.setAttribute("aria-checked","false"),this.addEventListener("click",this),this.addEventListener("keydown",this)}disable(){this.removeAttribute("tabindex"),this.removeEventListener("click",this),this.removeEventListener("keydown",this),this.removeEventListener("keyup",this)}handleEvent(t){switch(t.type){case"slotchange":V(this,Be,Ci).call(this,t);break;case"click":this.handleClick(t);break;case"keydown":g(this,Oe).call(this,t);break;case"keyup":g(this,X).call(this,t);break}}attributeChangedCallback(t,i,n){t===k.CHECKED&&Tt(this)&&!g(this,Gt)?this.setAttribute("aria-checked",n!=null?"true":"false"):t===k.TYPE&&n!==i?this.role="menuitem"+n:t===k.DISABLED&&n!==i&&(n==null?this.enable():this.disable())}connectedCallback(){this.hasAttribute(k.DISABLED)||this.enable(),this.role="menuitem"+this.type,We(this,At,Ue(this,this.parentNode)),V(this,Zt,Ne).call(this),this.submenuElement&&V(this,Yt,Pe).call(this),this.shadowRoot.addEventListener("slotchange",this)}disconnectedCallback(){this.disable(),V(this,Zt,Ne).call(this),We(this,At,null),this.shadowRoot.removeEventListener("slotchange",this)}get invokeTarget(){return this.getAttribute("invoketarget")}set invokeTarget(t){this.setAttribute("invoketarget",`${t}`)}get invokeTargetElement(){var t;return this.invokeTarget?(t=z(this))==null?void 0:t.querySelector(`#${this.invokeTarget}`):this.submenuElement}get submenuElement(){return this.shadowRoot.querySelector('slot[name="submenu"]').assignedElements({flatten:!0})[0]}get type(){var t;return(t=this.getAttribute(k.TYPE))!=null?t:""}set type(t){this.setAttribute(k.TYPE,`${t}`)}get value(){var t;return(t=this.getAttribute(k.VALUE))!=null?t:this.text}set value(t){this.setAttribute(k.VALUE,t)}get text(){var t;return((t=this.textContent)!=null?t:"").trim()}get checked(){if(Tt(this))return this.getAttribute("aria-checked")==="true"}set checked(t){Tt(this)&&(We(this,Gt,!0),this.setAttribute("aria-checked",t?"true":"false"),t?this.part.add("checked"):this.part.remove("checked"))}handleClick(t){Tt(this)||this.invokeTargetElement&&ft(this,t.target)&&this.invokeTargetElement.dispatchEvent(new U({relatedTarget:this}))}get keysUsed(){return["Enter"," "]}};Gt=new WeakMap;At=new WeakMap;Be=new WeakSet;Ci=function(e){let t=e.target;if(!(t!=null&&t.name))for(let n of t.assignedNodes({flatten:!0}))n instanceof Text&&n.textContent.trim()===""&&n.remove();t.name==="submenu"&&(this.submenuElement?V(this,Yt,Pe).call(this):V(this,Ke,Li).call(this))};Yt=new WeakSet;Pe=async function(){this.setAttribute("aria-haspopup","menu"),this.setAttribute("aria-expanded",`${!this.submenuElement.hidden}`),this.submenuElement.addEventListener("change",g(this,I)),this.submenuElement.addEventListener("addmenuitem",g(this,I)),this.submenuElement.addEventListener("removemenuitem",g(this,I)),g(this,I).call(this)};Ke=new WeakSet;Li=function(){this.removeAttribute("aria-haspopup"),this.removeAttribute("aria-expanded"),this.submenuElement.removeEventListener("change",g(this,I)),this.submenuElement.removeEventListener("addmenuitem",g(this,I)),this.submenuElement.removeEventListener("removemenuitem",g(this,I)),g(this,I).call(this)};I=new WeakMap;X=new WeakMap;Oe=new WeakMap;Zt=new WeakSet;Ne=function(){var e;let t=(e=g(this,At))==null?void 0:e.radioGroupItems;if(!t)return;let i=t.filter(n=>n.getAttribute("aria-checked")==="true").pop();i||(i=t[0]);for(let n of t)n.setAttribute("aria-checked","false");i==null||i.setAttribute("aria-checked","true")};_.shadowRootOptions={mode:"open"};_.getTemplateHTML=Vi;_.getSuffixSlotInnerHTML=ji;function Tt(e){return e.type==="radio"||e.type==="checkbox"}function Ue(e,t){if(!e)return null;let{host:i}=e.getRootNode();return!t&&i?Ue(e,i):t!=null&&t.items?t:Ue(t,t==null?void 0:t.parentNode)}r.customElements.get("media-chrome-menu-item")||r.customElements.define("media-chrome-menu-item",_);function tn(e){return`
    ${v.getTemplateHTML(e)}
    <style>
      :host {
        --_menu-bg: rgb(20 20 30 / .8);
        background: var(--media-settings-menu-background,
            var(--media-menu-background,
              var(--media-control-background,
                var(--media-secondary-color, var(--_menu-bg)))));
        min-width: var(--media-settings-menu-min-width, 170px);
        border-radius: 2px 2px 0 0;
        overflow: hidden;
      }

      @-moz-document url-prefix() {
        :host{
          --_menu-bg: rgb(20 20 30);
        }
      }

      :host([role="menu"]) {
        
        justify-content: end;
      }

      slot:not([name]) {
        justify-content: var(--media-settings-menu-justify-content);
        flex-direction: var(--media-settings-menu-flex-direction, column);
        overflow: visible;
      }

      #container.has-expanded {
        --media-settings-menu-item-opacity: 0;
      }
    </style>
  `}var St=class extends v{get anchorElement(){return this.anchor!=="auto"?super.anchorElement:u(this).querySelector("media-settings-menu-button")}};St.getTemplateHTML=tn;r.customElements.get("media-settings-menu")||r.customElements.define("media-settings-menu",St);function en(e){return`
    ${_.getTemplateHTML.call(this,e)}
    <style>
      slot:not([name="submenu"]) {
        opacity: var(--media-settings-menu-item-opacity, var(--media-menu-item-opacity));
      }

      :host([aria-expanded="true"]:hover) {
        background: transparent;
      }
    </style>
  `}function nn(e){return`
    <svg aria-hidden="true" viewBox="0 0 20 24">
      <path d="m8.12 17.585-.742-.669 4.2-4.665-4.2-4.666.743-.669 4.803 5.335-4.803 5.334Z"/>
    </svg>
  `}var Z=class extends _{};Z.shadowRootOptions={mode:"open"};Z.getTemplateHTML=en;Z.getSuffixSlotInnerHTML=nn;r.customElements.get("media-settings-menu-item")||r.customElements.define("media-settings-menu-item",Z);var b=class extends mi{connectedCallback(){super.connectedCallback(),this.invokeTargetElement&&this.setAttribute("aria-haspopup","menu")}get invokeTarget(){return this.getAttribute("invoketarget")}set invokeTarget(t){this.setAttribute("invoketarget",`${t}`)}get invokeTargetElement(){var t;return this.invokeTarget?(t=z(this))==null?void 0:t.querySelector(`#${this.invokeTarget}`):null}handleClick(){var t;(t=this.invokeTargetElement)==null||t.dispatchEvent(new U({relatedTarget:this}))}};r.customElements.get("media-chrome-menu-button")||r.customElements.define("media-chrome-menu-button",b);function sn(){return`
    <style>
      :host([aria-expanded="true"]) slot[name=tooltip] {
        display: none;
      }
    </style>
    <slot name="icon">
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d="M4.5 14.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Zm7.5 0a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Zm7.5 0a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"/>
      </svg>
    </slot>
  `}function an(){return f("Settings")}var j=class extends b{static get observedAttributes(){return[...super.observedAttributes,"target"]}connectedCallback(){super.connectedCallback(),this.setAttribute("aria-label",f("settings"))}get invokeTargetElement(){return this.invokeTarget!=null?super.invokeTargetElement:u(this).querySelector("media-settings-menu")}};j.getSlotTemplateHTML=sn;j.getTooltipContentHTML=an;r.customElements.get("media-settings-menu-button")||r.customElements.define("media-settings-menu-button",j);var Ye=(e,t,i)=>{if(!t.has(e))throw TypeError("Cannot "+i)},wi=(e,t,i)=>(Ye(e,t,"read from private field"),i?i.call(e):t.get(e)),zt=(e,t,i)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,i)},qe=(e,t,i,n)=>(Ye(e,t,"write to private field"),n?n.call(e,i):t.set(e,i),i),Ft=(e,t,i)=>(Ye(e,t,"access private method"),i),yt,Xt,Jt,Ge,Qt,Ze,Vt=class extends v{constructor(){super(...arguments),zt(this,Jt),zt(this,Qt),zt(this,yt,[]),zt(this,Xt,void 0)}static get observedAttributes(){return[...super.observedAttributes,a.MEDIA_AUDIO_TRACK_LIST,a.MEDIA_AUDIO_TRACK_ENABLED,a.MEDIA_AUDIO_TRACK_UNAVAILABLE]}attributeChangedCallback(t,i,n){super.attributeChangedCallback(t,i,n),t===a.MEDIA_AUDIO_TRACK_ENABLED&&i!==n?this.value=n:t===a.MEDIA_AUDIO_TRACK_LIST&&i!==n&&(qe(this,yt,oi(n!=null?n:"")),Ft(this,Jt,Ge).call(this))}connectedCallback(){super.connectedCallback(),this.addEventListener("change",Ft(this,Qt,Ze))}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("change",Ft(this,Qt,Ze))}get anchorElement(){var t;return this.anchor!=="auto"?super.anchorElement:(t=u(this))==null?void 0:t.querySelector("media-audio-track-menu-button")}get mediaAudioTrackList(){return wi(this,yt)}set mediaAudioTrackList(t){qe(this,yt,t),Ft(this,Jt,Ge).call(this)}get mediaAudioTrackEnabled(){var t;return(t=O(this,a.MEDIA_AUDIO_TRACK_ENABLED))!=null?t:""}set mediaAudioTrackEnabled(t){N(this,a.MEDIA_AUDIO_TRACK_ENABLED,t)}};yt=new WeakMap;Xt=new WeakMap;Jt=new WeakSet;Ge=function(){if(wi(this,Xt)===JSON.stringify(this.mediaAudioTrackList))return;qe(this,Xt,JSON.stringify(this.mediaAudioTrackList));let e=this.mediaAudioTrackList;this.defaultSlot.textContent="",e.sort((t,i)=>t.id.localeCompare(i.id,void 0,{numeric:!0}));for(let t of e){let i=this.formatMenuItemText(t.label,t),n=M({type:"radio",text:i,value:`${t.id}`,checked:t.enabled});n.prepend(S(this,"checked-indicator")),this.defaultSlot.append(n)}};Qt=new WeakSet;Ze=function(){if(this.value==null)return;let e=new r.CustomEvent(w.MEDIA_AUDIO_TRACK_REQUEST,{composed:!0,bubbles:!0,detail:this.value});this.dispatchEvent(e)};r.customElements.get("media-audio-track-menu")||r.customElements.define("media-audio-track-menu",Vt);var rn=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M11 17H9.5V7H11v10Zm-3-3H6.5v-4H8v4Zm6-5h-1.5v6H14V9Zm3 7h-1.5V8H17v8Z"/>
  <path d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10Zm-2 0a8 8 0 1 0-16 0 8 8 0 0 0 16 0Z"/>
</svg>`;function on(){return`
    <style>
      :host([aria-expanded="true"]) slot[name=tooltip] {
        display: none;
      }
    </style>
    <slot name="icon">${rn}</slot>
  `}function ln(){return f("Audio")}var Di=e=>{let t=f("Audio");e.setAttribute("aria-label",t)},tt=class extends b{static get observedAttributes(){return[...super.observedAttributes,a.MEDIA_AUDIO_TRACK_ENABLED,a.MEDIA_AUDIO_TRACK_UNAVAILABLE]}connectedCallback(){super.connectedCallback(),Di(this)}attributeChangedCallback(t,i,n){super.attributeChangedCallback(t,i,n),t===a.MEDIA_LANG&&Di(this)}get invokeTargetElement(){var t;return this.invokeTarget!=null?super.invokeTargetElement:(t=u(this))==null?void 0:t.querySelector("media-audio-track-menu")}get mediaAudioTrackEnabled(){var t;return(t=O(this,a.MEDIA_AUDIO_TRACK_ENABLED))!=null?t:""}set mediaAudioTrackEnabled(t){N(this,a.MEDIA_AUDIO_TRACK_ENABLED,t)}};tt.getSlotTemplateHTML=on;tt.getTooltipContentHTML=ln;r.customElements.get("media-audio-track-menu-button")||r.customElements.define("media-audio-track-menu-button",tt);var Qe=(e,t,i)=>{if(!t.has(e))throw TypeError("Cannot "+i)},dn=(e,t,i)=>(Qe(e,t,"read from private field"),i?i.call(e):t.get(e)),ze=(e,t,i)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,i)},hn=(e,t,i,n)=>(Qe(e,t,"write to private field"),n?n.call(e,i):t.set(e,i),i),jt=(e,t,i)=>(Qe(e,t,"access private method"),i),ie,te,Fe,ee,Je,cn=`
  <svg aria-hidden="true" viewBox="0 0 26 24" part="captions-indicator indicator">
    <path d="M22.83 5.68a2.58 2.58 0 0 0-2.3-2.5c-3.62-.24-11.44-.24-15.06 0a2.58 2.58 0 0 0-2.3 2.5c-.23 4.21-.23 8.43 0 12.64a2.58 2.58 0 0 0 2.3 2.5c3.62.24 11.44.24 15.06 0a2.58 2.58 0 0 0 2.3-2.5c.23-4.21.23-8.43 0-12.64Zm-11.39 9.45a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.92 3.92 0 0 1 .92-2.77 3.18 3.18 0 0 1 2.43-1 2.94 2.94 0 0 1 2.13.78c.364.359.62.813.74 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.17 1.61 1.61 0 0 0-1.29.58 2.79 2.79 0 0 0-.5 1.89 3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.48 1.48 0 0 0 1-.37 2.1 2.1 0 0 0 .59-1.14l1.4.44a3.23 3.23 0 0 1-1.07 1.69Zm7.22 0a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.88 3.88 0 0 1 .93-2.77 3.14 3.14 0 0 1 2.42-1 3 3 0 0 1 2.16.82 2.8 2.8 0 0 1 .73 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.21 1.61 1.61 0 0 0-1.29.58A2.79 2.79 0 0 0 15 12a3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.44 1.44 0 0 0 1-.37 2.1 2.1 0 0 0 .6-1.15l1.4.44a3.17 3.17 0 0 1-1.1 1.7Z"/>
  </svg>`;function un(e){return`
    ${v.getTemplateHTML(e)}
    <slot name="captions-indicator" hidden>${cn}</slot>
  `}var Mt=class extends v{constructor(){super(...arguments),ze(this,te),ze(this,ee),ze(this,ie,void 0)}static get observedAttributes(){return[...super.observedAttributes,a.MEDIA_SUBTITLES_LIST,a.MEDIA_SUBTITLES_SHOWING]}attributeChangedCallback(t,i,n){super.attributeChangedCallback(t,i,n),t===a.MEDIA_SUBTITLES_LIST&&i!==n?jt(this,te,Fe).call(this):t===a.MEDIA_SUBTITLES_SHOWING&&i!==n&&(this.value=n||"",jt(this,te,Fe).call(this))}connectedCallback(){super.connectedCallback(),this.addEventListener("change",jt(this,ee,Je))}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("change",jt(this,ee,Je))}get anchorElement(){return this.anchor!=="auto"?super.anchorElement:u(this).querySelector("media-captions-menu-button")}get mediaSubtitlesList(){return Ri(this,a.MEDIA_SUBTITLES_LIST)}set mediaSubtitlesList(t){Hi(this,a.MEDIA_SUBTITLES_LIST,t)}get mediaSubtitlesShowing(){return Ri(this,a.MEDIA_SUBTITLES_SHOWING)}set mediaSubtitlesShowing(t){Hi(this,a.MEDIA_SUBTITLES_SHOWING,t)}};ie=new WeakMap;te=new WeakSet;Fe=function(){var e;let t=dn(this,ie)!==JSON.stringify(this.mediaSubtitlesList),i=this.value!==this.getAttribute(a.MEDIA_SUBTITLES_SHOWING);if(!t&&!i)return;hn(this,ie,JSON.stringify(this.mediaSubtitlesList)),this.defaultSlot.textContent="";let n=!this.value,s=M({type:"radio",text:this.formatMenuItemText(f("Off")),value:"off",checked:n});s.prepend(S(this,"checked-indicator")),this.defaultSlot.append(s);let o=this.mediaSubtitlesList;for(let l of o){let p=M({type:"radio",text:this.formatMenuItemText(l.label,l),value:be(l),checked:this.value==be(l)});p.prepend(S(this,"checked-indicator")),((e=l.kind)!=null?e:"subs")==="captions"&&p.append(S(this,"captions-indicator")),this.defaultSlot.append(p)}};ee=new WeakSet;Je=function(){let e=this.mediaSubtitlesShowing,t=this.getAttribute(a.MEDIA_SUBTITLES_SHOWING),i=this.value!==t;if(e!=null&&e.length&&i&&this.dispatchEvent(new r.CustomEvent(w.MEDIA_DISABLE_SUBTITLES_REQUEST,{composed:!0,bubbles:!0,detail:e})),!this.value||!i)return;let n=new r.CustomEvent(w.MEDIA_SHOW_SUBTITLES_REQUEST,{composed:!0,bubbles:!0,detail:this.value});this.dispatchEvent(n)};Mt.getTemplateHTML=un;var Ri=(e,t)=>{let i=e.getAttribute(t);return i?Rt(i):[]},Hi=(e,t,i)=>{if(!(i!=null&&i.length)){e.removeAttribute(t);return}let n=Ht(i);e.getAttribute(t)!==n&&e.setAttribute(t,n)};r.customElements.get("media-captions-menu")||r.customElements.define("media-captions-menu",Mt);var mn=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M22.83 5.68a2.58 2.58 0 0 0-2.3-2.5c-3.62-.24-11.44-.24-15.06 0a2.58 2.58 0 0 0-2.3 2.5c-.23 4.21-.23 8.43 0 12.64a2.58 2.58 0 0 0 2.3 2.5c3.62.24 11.44.24 15.06 0a2.58 2.58 0 0 0 2.3-2.5c.23-4.21.23-8.43 0-12.64Zm-11.39 9.45a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.92 3.92 0 0 1 .92-2.77 3.18 3.18 0 0 1 2.43-1 2.94 2.94 0 0 1 2.13.78c.364.359.62.813.74 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.17 1.61 1.61 0 0 0-1.29.58 2.79 2.79 0 0 0-.5 1.89 3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.48 1.48 0 0 0 1-.37 2.1 2.1 0 0 0 .59-1.14l1.4.44a3.23 3.23 0 0 1-1.07 1.69Zm7.22 0a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.88 3.88 0 0 1 .93-2.77 3.14 3.14 0 0 1 2.42-1 3 3 0 0 1 2.16.82 2.8 2.8 0 0 1 .73 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.21 1.61 1.61 0 0 0-1.29.58A2.79 2.79 0 0 0 15 12a3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.44 1.44 0 0 0 1-.37 2.1 2.1 0 0 0 .6-1.15l1.4.44a3.17 3.17 0 0 1-1.1 1.7Z"/>
</svg>`,pn=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M17.73 14.09a1.4 1.4 0 0 1-1 .37 1.579 1.579 0 0 1-1.27-.58A3 3 0 0 1 15 12a2.8 2.8 0 0 1 .5-1.85 1.63 1.63 0 0 1 1.29-.57 1.47 1.47 0 0 1 1.51 1.2l1.43-.34A2.89 2.89 0 0 0 19 9.07a3 3 0 0 0-2.14-.78 3.14 3.14 0 0 0-2.42 1 3.91 3.91 0 0 0-.93 2.78 3.74 3.74 0 0 0 .92 2.66 3.07 3.07 0 0 0 2.34 1 3.07 3.07 0 0 0 1.91-.57 3.17 3.17 0 0 0 1.07-1.74l-1.4-.45c-.083.43-.3.822-.62 1.12Zm-7.22 0a1.43 1.43 0 0 1-1 .37 1.58 1.58 0 0 1-1.27-.58A3 3 0 0 1 7.76 12a2.8 2.8 0 0 1 .5-1.85 1.63 1.63 0 0 1 1.29-.57 1.47 1.47 0 0 1 1.51 1.2l1.43-.34a2.81 2.81 0 0 0-.74-1.32 2.94 2.94 0 0 0-2.13-.78 3.18 3.18 0 0 0-2.43 1 4 4 0 0 0-.92 2.78 3.74 3.74 0 0 0 .92 2.66 3.07 3.07 0 0 0 2.34 1 3.07 3.07 0 0 0 1.91-.57 3.23 3.23 0 0 0 1.07-1.74l-1.4-.45a2.06 2.06 0 0 1-.6 1.07Zm12.32-8.41a2.59 2.59 0 0 0-2.3-2.51C18.72 3.05 15.86 3 13 3c-2.86 0-5.72.05-7.53.17a2.59 2.59 0 0 0-2.3 2.51c-.23 4.207-.23 8.423 0 12.63a2.57 2.57 0 0 0 2.3 2.5c1.81.13 4.67.19 7.53.19 2.86 0 5.72-.06 7.53-.19a2.57 2.57 0 0 0 2.3-2.5c.23-4.207.23-8.423 0-12.63Zm-1.49 12.53a1.11 1.11 0 0 1-.91 1.11c-1.67.11-4.45.18-7.43.18-2.98 0-5.76-.07-7.43-.18a1.11 1.11 0 0 1-.91-1.11c-.21-4.14-.21-8.29 0-12.43a1.11 1.11 0 0 1 .91-1.11C7.24 4.56 10 4.49 13 4.49s5.76.07 7.43.18a1.11 1.11 0 0 1 .91 1.11c.21 4.14.21 8.29 0 12.43Z"/>
</svg>`;function fn(){return`
    <style>
      :host([data-captions-enabled="true"]) slot[name=off] {
        display: none !important;
      }

      
      :host(:not([data-captions-enabled="true"])) slot[name=on] {
        display: none !important;
      }

      :host([aria-expanded="true"]) slot[name=tooltip] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="on">${mn}</slot>
      <slot name="off">${pn}</slot>
    </slot>
  `}function vn(){return f("Captions")}var Wi=e=>{e.setAttribute("data-captions-enabled",ui(e).toString())},Bi=e=>{e.setAttribute("aria-label",f("closed captions"))},et=class extends b{static get observedAttributes(){return[...super.observedAttributes,a.MEDIA_SUBTITLES_LIST,a.MEDIA_SUBTITLES_SHOWING,a.MEDIA_LANG]}connectedCallback(){super.connectedCallback(),Bi(this),Wi(this)}attributeChangedCallback(t,i,n){super.attributeChangedCallback(t,i,n),t===a.MEDIA_SUBTITLES_SHOWING?Wi(this):t===a.MEDIA_LANG&&Bi(this)}get invokeTargetElement(){var t;return this.invokeTarget!=null?super.invokeTargetElement:(t=u(this))==null?void 0:t.querySelector("media-captions-menu")}get mediaSubtitlesList(){return Oi(this,a.MEDIA_SUBTITLES_LIST)}set mediaSubtitlesList(t){Ni(this,a.MEDIA_SUBTITLES_LIST,t)}get mediaSubtitlesShowing(){return Oi(this,a.MEDIA_SUBTITLES_SHOWING)}set mediaSubtitlesShowing(t){Ni(this,a.MEDIA_SUBTITLES_SHOWING,t)}};et.getSlotTemplateHTML=fn;et.getTooltipContentHTML=vn;var Oi=(e,t)=>{let i=e.getAttribute(t);return i?Rt(i):[]},Ni=(e,t,i)=>{if(!(i!=null&&i.length)){e.removeAttribute(t);return}let n=Ht(i);e.getAttribute(t)!==n&&e.setAttribute(t,n)};r.customElements.get("media-captions-menu-button")||r.customElements.define("media-captions-menu-button",et);var Ui=(e,t,i)=>{if(!t.has(e))throw TypeError("Cannot "+i)},nt=(e,t,i)=>(Ui(e,t,"read from private field"),i?i.call(e):t.get(e)),Xe=(e,t,i)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,i)},it=(e,t,i)=>(Ui(e,t,"access private method"),i),P,st,It,ne,je,Ve={RATES:"rates"},se=class extends v{constructor(){super(),Xe(this,st),Xe(this,ne),Xe(this,P,new ci(this,Ve.RATES,{defaultValue:pi})),it(this,st,It).call(this)}static get observedAttributes(){return[...super.observedAttributes,a.MEDIA_PLAYBACK_RATE,Ve.RATES]}attributeChangedCallback(t,i,n){super.attributeChangedCallback(t,i,n),t===a.MEDIA_PLAYBACK_RATE&&i!=n?(this.value=n,it(this,st,It).call(this)):t===Ve.RATES&&i!=n&&(nt(this,P).value=n,it(this,st,It).call(this))}connectedCallback(){super.connectedCallback(),this.addEventListener("change",it(this,ne,je))}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("change",it(this,ne,je))}get anchorElement(){return this.anchor!=="auto"?super.anchorElement:u(this).querySelector("media-playback-rate-menu-button")}get rates(){return nt(this,P)}set rates(t){t?Array.isArray(t)?nt(this,P).value=t.join(" "):typeof t=="string"&&(nt(this,P).value=t):nt(this,P).value="",it(this,st,It).call(this)}get mediaPlaybackRate(){return D(this,a.MEDIA_PLAYBACK_RATE,fi)}set mediaPlaybackRate(t){R(this,a.MEDIA_PLAYBACK_RATE,t)}};P=new WeakMap;st=new WeakSet;It=function(){this.defaultSlot.textContent="";let e=K(this.mediaPlaybackRate),t=new Set(Array.from(nt(this,P)).map(n=>K(Number(n))));e>0&&!t.has(e)&&t.add(e);let i=Array.from(t).sort((n,s)=>n-s);for(let n of i){let s=M({type:"radio",text:this.formatMenuItemText(`${n}x`,n),value:n.toString(),checked:e===n});s.prepend(S(this,"checked-indicator")),this.defaultSlot.append(s)}};ne=new WeakSet;je=function(){if(!this.value)return;let e=new r.CustomEvent(w.MEDIA_PLAYBACK_RATE_REQUEST,{composed:!0,bubbles:!0,detail:this.value});this.dispatchEvent(e)};r.customElements.get("media-playback-rate-menu")||r.customElements.define("media-playback-rate-menu",se);var ae=1;function gn(e){return`
    <style>
      :host {
        min-width: 5ch;
        padding: var(--media-button-padding, var(--media-control-padding, 10px 5px));
      }

      :host([aria-expanded="true"]) slot {
        display: block;
      }

      :host([aria-expanded="true"]) slot[name=tooltip] {
        display: none;
      }
    </style>
    <slot name="icon">${e.mediaplaybackrate?K(+e.mediaplaybackrate):ae}x</slot>
  `}function bn(){return f("Playback rate")}var at=class extends b{static get observedAttributes(){return[...super.observedAttributes,a.MEDIA_PLAYBACK_RATE]}constructor(){var t;super(),this.container=this.shadowRoot.querySelector('slot[name="icon"]'),this.container.innerHTML=`${K((t=this.mediaPlaybackRate)!=null?t:ae)}x`}attributeChangedCallback(t,i,n){if(super.attributeChangedCallback(t,i,n),t===a.MEDIA_PLAYBACK_RATE){let s=n?+n:Number.NaN,o=K(Number.isNaN(s)?ae:s);this.container.innerHTML=`${o}x`,this.setAttribute("aria-label",f("Playback rate {playbackRate}",{playbackRate:o}))}}get invokeTargetElement(){return this.invokeTarget!=null?super.invokeTargetElement:u(this).querySelector("media-playback-rate-menu")}get mediaPlaybackRate(){return D(this,a.MEDIA_PLAYBACK_RATE,ae)}set mediaPlaybackRate(t){R(this,a.MEDIA_PLAYBACK_RATE,t)}};at.getSlotTemplateHTML=gn;at.getTooltipContentHTML=bn;r.customElements.get("media-playback-rate-menu-button")||r.customElements.define("media-playback-rate-menu-button",at);var ei=(e,t,i)=>{if(!t.has(e))throw TypeError("Cannot "+i)},B=(e,t,i)=>(ei(e,t,"read from private field"),i?i.call(e):t.get(e)),re=(e,t,i)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,i)},$i=(e,t,i,n)=>(ei(e,t,"write to private field"),n?n.call(e,i):t.set(e,i),i),rt=(e,t,i)=>(ei(e,t,"access private method"),i),xt,x,ot,Ct,oe,ti,le=class extends v{constructor(){super(...arguments),re(this,ot),re(this,oe),re(this,xt,[]),re(this,x,{})}static get observedAttributes(){return[...super.observedAttributes,a.MEDIA_RENDITION_LIST,a.MEDIA_RENDITION_SELECTED,a.MEDIA_RENDITION_UNAVAILABLE,a.MEDIA_HEIGHT,a.MEDIA_WIDTH]}static formatMenuItemText(t,i){return super.formatMenuItemText(t,i)}static formatRendition(t,{showBitrate:i=!1}={}){let n=`${Math.min(t.width,t.height)}p`;if(i&&t.bitrate){let s=t.bitrate/1e6,o=`${s.toFixed(s<1?1:0)} Mbps`;return`${n} (${o})`}return this.formatMenuItemText(n,t)}static compareRendition(t,i){var n,s;return i.height===t.height?((n=i.bitrate)!=null?n:0)-((s=t.bitrate)!=null?s:0):i.height-t.height}attributeChangedCallback(t,i,n){if(super.attributeChangedCallback(t,i,n),i!==n)switch(t){case a.MEDIA_RENDITION_SELECTED:this.value=n!=null?n:"auto",rt(this,ot,Ct).call(this);break;case a.MEDIA_RENDITION_LIST:$i(this,xt,ri(n)),rt(this,ot,Ct).call(this);break;case a.MEDIA_HEIGHT:case a.MEDIA_WIDTH:rt(this,ot,Ct).call(this);break}}connectedCallback(){super.connectedCallback(),this.addEventListener("change",rt(this,oe,ti))}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("change",rt(this,oe,ti))}get anchorElement(){return this.anchor!=="auto"?super.anchorElement:u(this).querySelector("media-rendition-menu-button")}get mediaRenditionList(){return B(this,xt)}set mediaRenditionList(t){$i(this,xt,t),rt(this,ot,Ct).call(this)}get mediaRenditionSelected(){return O(this,a.MEDIA_RENDITION_SELECTED)}set mediaRenditionSelected(t){N(this,a.MEDIA_RENDITION_SELECTED,t)}get mediaHeight(){return D(this,a.MEDIA_HEIGHT)}set mediaHeight(t){R(this,a.MEDIA_HEIGHT,t)}get mediaWidth(){return D(this,a.MEDIA_WIDTH)}set mediaWidth(t){R(this,a.MEDIA_WIDTH,t)}compareRendition(t,i){return this.constructor.compareRendition(t,i)}formatMenuItemText(t,i){return this.constructor.formatMenuItemText(t,i)}formatRendition(t,i){return this.constructor.formatRendition(t,i)}showRenditionBitrate(t){return this.mediaRenditionList.some(i=>i!==t&&i.height===t.height&&i.bitrate!==t.bitrate)}};xt=new WeakMap;x=new WeakMap;ot=new WeakSet;Ct=function(){let e=!this.mediaRenditionSelected;if(B(this,x).mediaRenditionList===JSON.stringify(this.mediaRenditionList)&&B(this,x).mediaHeight===this.mediaHeight&&B(this,x).mediaWidth===this.mediaWidth&&B(this,x).isAuto===e)return;B(this,x).mediaRenditionList=JSON.stringify(this.mediaRenditionList),B(this,x).mediaHeight=this.mediaHeight,B(this,x).mediaWidth=this.mediaWidth,B(this,x).isAuto=e;let t=this.mediaRenditionList.sort(this.compareRendition.bind(this)),i=t.find(l=>l.id===this.mediaRenditionSelected);for(let l of t)l.selected=l===i;this.defaultSlot.textContent="";for(let l of t){let p=this.formatRendition(l,{showBitrate:this.showRenditionBitrate(l)}),m=M({type:"radio",text:p,value:`${l.id}`,checked:l.selected&&!e});m.prepend(S(this,"checked-indicator")),this.defaultSlot.append(m)}let n=i&&this.showRenditionBitrate(i),s;e&&(i?s=this.formatMenuItemText(`${f("Auto")} \u2022 ${this.formatRendition(i,{showBitrate:n})}`,i):this.mediaHeight>0&&this.mediaWidth>0&&(s=this.formatMenuItemText(`${f("Auto")} (${Math.min(this.mediaWidth,this.mediaHeight)}p)`))),s||(s=this.formatMenuItemText(f("Auto")));let o=M({type:"radio",text:s,value:"auto",checked:e});o.dataset.description=s,o.prepend(S(this,"checked-indicator")),this.defaultSlot.append(o)};oe=new WeakSet;ti=function(){if(this.value==null)return;let e=new r.CustomEvent(w.MEDIA_RENDITION_REQUEST,{composed:!0,bubbles:!0,detail:this.value});this.dispatchEvent(e)};r.customElements.get("media-rendition-menu")||r.customElements.define("media-rendition-menu",le);var _n=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M13.5 2.5h2v6h-2v-2h-11v-2h11v-2Zm4 2h4v2h-4v-2Zm-12 4h2v6h-2v-2h-3v-2h3v-2Zm4 2h12v2h-12v-2Zm1 4h2v6h-2v-2h-8v-2h8v-2Zm4 2h7v2h-7v-2Z" />
</svg>`;function En(){return`
    <style>
      :host([aria-expanded="true"]) slot[name=tooltip] {
        display: none;
      }
    </style>
    <slot name="icon">${_n}</slot>
  `}function kn(){return f("Quality")}var lt=class extends b{static get observedAttributes(){return[...super.observedAttributes,a.MEDIA_RENDITION_SELECTED,a.MEDIA_RENDITION_UNAVAILABLE,a.MEDIA_HEIGHT]}connectedCallback(){super.connectedCallback(),this.setAttribute("aria-label",f("quality"))}get invokeTargetElement(){return this.invokeTarget!=null?super.invokeTargetElement:u(this).querySelector("media-rendition-menu")}get mediaRenditionSelected(){return O(this,a.MEDIA_RENDITION_SELECTED)}set mediaRenditionSelected(t){N(this,a.MEDIA_RENDITION_SELECTED,t)}get mediaHeight(){return D(this,a.MEDIA_HEIGHT)}set mediaHeight(t){R(this,a.MEDIA_HEIGHT,t)}};lt.getSlotTemplateHTML=En;lt.getTooltipContentHTML=kn;r.customElements.get("media-rendition-menu-button")||r.customElements.define("media-rendition-menu-button",lt);var si=(e,t,i)=>{if(!t.has(e))throw TypeError("Cannot "+i)},L=(e,t,i)=>(si(e,t,"read from private field"),i?i.call(e):t.get(e)),C=(e,t,i)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,i)},Pi=(e,t,i,n)=>(si(e,t,"write to private field"),n?n.call(e,i):t.set(e,i),i),T=(e,t,i)=>(si(e,t,"access private method"),i),ht,Lt,pe,Y,dt,ai,Ki,de,ii,he,ni,qi,ue,me,ce;function Tn(e){return`
      ${v.getTemplateHTML(e)}
      <style>
        :host {
          --_menu-bg: rgb(20 20 30 / .8);
          background: var(--media-settings-menu-background,
            var(--media-menu-background,
              var(--media-control-background,
                var(--media-secondary-color, var(--_menu-bg)))));
          min-width: var(--media-settings-menu-min-width, 170px);
          border-radius: 2px;
          overflow: hidden;
        }
      </style>
    `}var wt=class extends v{constructor(){super(),C(this,Lt),C(this,Y),C(this,ai),C(this,de),C(this,ni),C(this,ht,!1),C(this,he,t=>{let i=t.target,n=(i==null?void 0:i.nodeName)==="VIDEO",s=T(this,de,ii).call(this,i);(n||s)&&(L(this,ht)?T(this,Y,dt).call(this):T(this,ni,qi).call(this,t))}),C(this,ue,t=>{let i=t.target,n=this.contains(i),s=t.button===2,o=(i==null?void 0:i.nodeName)==="VIDEO",l=T(this,de,ii).call(this,i);n||s&&(o||l)||T(this,Y,dt).call(this)}),C(this,me,t=>{t.key==="Escape"&&T(this,Y,dt).call(this)}),C(this,ce,t=>{var i,n;let s=t.target;if((i=s.matches)!=null&&i.call(s,'button[invoke="copy"]')){let o=(n=s.closest("media-context-menu-item"))==null?void 0:n.querySelector('input[slot="copy"]');o&&navigator.clipboard.writeText(o.value)}T(this,Y,dt).call(this)}),this.setAttribute("noautohide",""),T(this,Lt,pe).call(this)}connectedCallback(){super.connectedCallback(),u(this).addEventListener("contextmenu",L(this,he)),this.addEventListener("click",L(this,ce))}disconnectedCallback(){super.disconnectedCallback(),u(this).removeEventListener("contextmenu",L(this,he)),this.removeEventListener("click",L(this,ce)),document.removeEventListener("mousedown",L(this,ue)),document.removeEventListener("keydown",L(this,me))}};ht=new WeakMap;Lt=new WeakSet;pe=function(){this.hidden=!L(this,ht)};Y=new WeakSet;dt=function(){Pi(this,ht,!1),T(this,Lt,pe).call(this)};ai=new WeakSet;Ki=function(){document.querySelectorAll("media-context-menu").forEach(t=>{var i;t!==this&&T(i=t,Y,dt).call(i)})};de=new WeakSet;ii=function(e){return e?e.hasAttribute("slot")&&e.getAttribute("slot")==="media"?!0:e.nodeName.includes("-")&&e.tagName.includes("-")?e.hasAttribute("src")||e.hasAttribute("poster")||e.hasAttribute("preload")||e.hasAttribute("playsinline"):!1:!1};he=new WeakMap;ni=new WeakSet;qi=function(e){e.preventDefault(),T(this,ai,Ki).call(this),Pi(this,ht,!0),this.style.position="fixed",this.style.left=`${e.clientX}px`,this.style.top=`${e.clientY}px`,T(this,Lt,pe).call(this),document.addEventListener("mousedown",L(this,ue),{once:!0}),document.addEventListener("keydown",L(this,me),{once:!0})};ue=new WeakMap;me=new WeakMap;ce=new WeakMap;wt.getTemplateHTML=Tn;r.customElements.get("media-context-menu")||r.customElements.define("media-context-menu",wt);function An(e){return`
    ${_.getTemplateHTML.call(this,e)}
    <style>
        ::slotted(*) {
            color: var(--media-text-color, white);
            text-decoration: none;
            border: none;
            background: none;
            cursor: pointer;
            padding: 0;
            min-height: var(--media-control-height, 24px);
        }
    </style>
  `}var ct=class extends _{};ct.shadowRootOptions={mode:"open"};ct.getTemplateHTML=An;r.customElements.get("media-context-menu-item")||r.customElements.define("media-context-menu-item",ct);export{v as a,_ as b,St as c,Z as d,b as e,j as f,Vt as g,tt as h,Mt as i,et as j,se as k,at as l,le as m,lt as n,wt as o,ct as p};
