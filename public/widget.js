/* ikas Reviews Widget — built 2026-05-16T23:40:38.936Z | theme: default */
"use strict";(()=>{var $i=Object.defineProperty;var Ee=(e,r)=>{for(var t in r)$i(e,t,{get:r[t],enumerable:!0})};var Qi=typeof document!="undefined",ht=Qi?document.currentScript||(function(){for(var e=document.getElementsByTagName("script"),r=e.length-1;r>=0;r--)if(e[r].src&&e[r].src.indexOf("/widget.js")!==-1)return e[r];return e[e.length-1]})():null,Ar=ht?ht.src:"",ea=new URLSearchParams(Ar.split("?")[1]||""),D=ea.get("publicApiKey"),V=Ar?Ar.split("?")[0].replace(/\/widget\.js$/,""):"";var yt=typeof window!="undefined";if(yt&&V){let e=function(i,n){return!!(i&&i.indexOf("/widget.js")!==-1||n&&n.indexOf("widget.js")!==-1)},r=function(i,n){if(Pr>=bt)return!1;var s=Date.now();if(s-_r<wt)return!1;var o=String(i)+"|"+String(n||"").slice(0,200);return Nr[o]?!1:(Nr[o]=!0,_r=s,Pr+=1,!0)},t=function(i){try{var n=JSON.stringify(i);if(typeof navigator!="undefined"&&typeof navigator.sendBeacon=="function"){var s=new Blob([n],{type:"application/json"});navigator.sendBeacon(Ir,s);return}typeof fetch=="function"&&fetch(Ir,{method:"POST",headers:{"Content-Type":"application/json"},body:n,keepalive:!0}).catch(function(){})}catch(o){}},a=function(i,n,s){return{message:String(i||"unknown").slice(0,500),stack:n?String(n).slice(0,4e3):void 0,url:yt&&window.location?String(window.location.href).slice(0,2e3):void 0,userAgent:typeof navigator!="undefined"?String(navigator.userAgent||"").slice(0,500):void 0,publicApiKey:D||null,timestamp:Date.now(),extra:s||void 0}};ra=e,ta=r,ia=t,aa=a,Ir=V+"/api/public/widget-error",bt=5,wt=2e3,Pr=0,_r=0,Nr={},window.addEventListener("error",function(i){if(i){var n=i.filename||i.error&&i.error.fileName||"",s=i.error&&i.error.stack;if(e(n,s)){var o=i.message||i.error&&i.error.message||"window.onerror";r(o,s)&&t(a(o,s,{type:"error",filename:n||void 0,lineno:i.lineno||void 0,colno:i.colno||void 0}))}}}),window.addEventListener("unhandledrejection",function(i){if(i){var n=i.reason,s=n&&n.stack,o=n&&n.fileName||"";if(e(o,s)){var d=n&&n.message||String(n||"unhandled rejection");r(d,s)&&t(a(d,s,{type:"unhandledrejection"}))}}})}var Ir,bt,wt,Pr,_r,Nr,ra,ta,ia,aa;var na=['[class^="ikr-"],[class*=" ikr-"]{-webkit-tap-highlight-color:transparent;}','button[class^="ikr-"],button[class*=" ikr-"],[class^="ikr-"][role="button"],[class*=" ikr-"][role="button"],[class^="ikr-"][role="menuitem"],[class*=" ikr-"][role="menuitem"]{touch-action:manipulation;-webkit-touch-callout:none;user-select:none;}','button[class^="ikr-"]:active,button[class*=" ikr-"]:active,[class^="ikr-"][role="button"]:active,[class*=" ikr-"][role="button"]:active,[class^="ikr-"][role="menuitem"]:active,[class*=" ikr-"][role="menuitem"]:active{opacity:0.85;}',".ikr-press-dim:active{opacity:0.85;}",".ikr-press-scale{transition:transform 90ms ease-out;}",".ikr-press-scale:active{transform:scale(0.97);}"].join(`
`),Rr=!1;function Br(){if(!(Rr||typeof document=="undefined")){if(!document.head){document.addEventListener("DOMContentLoaded",Br,{once:!0});return}if(document.getElementById("ikr-base-reset")){Rr=!0;return}var e=document.createElement("style");e.id="ikr-base-reset",e.textContent=na,document.head.insertBefore(e,document.head.firstChild),Rr=!0}}var Or=!1,xt=!1,oa={Tab:1,Enter:1," ":1,Spacebar:1,ArrowUp:1,ArrowDown:1,ArrowLeft:1,ArrowRight:1,Home:1,End:1,PageUp:1,PageDown:1,Escape:1};function la(e){oa[e.key]&&(Or=!0)}function Mr(){Or=!1}function zt(){xt||typeof document=="undefined"||(document.addEventListener("keydown",la,!0),document.addEventListener("pointerdown",Mr,!0),typeof window!="undefined"&&!("PointerEvent"in window)&&(document.addEventListener("mousedown",Mr,!0),document.addEventListener("touchstart",Mr,!0)),xt=!0)}function or(){return Or}var Q="newest",Ze=1,Te=null,Le=!1,Z=null,I=null,lr=null,be=null,Hr=null,Fe=[],Fr=[];function De(e){Q=e}function Re(e){Ze=e}function sr(e){Te=e}function Dr(e){Le=e}function Ct(e){Z=e}function St(e){I=e}function Et(e){lr=e}function Tt(e){be=e}function Lt(e){Hr=e}function At(e){Fr=Array.isArray(e)?e:[]}function sa(e){return!e||typeof e!="object"?"":e.id!==void 0&&e.id!==null?"id:"+String(e.id):e._id!==void 0&&e._id!==null?"_id:"+String(e._id):""}function It(e){var r=Array.isArray(e)?e:[],t={},a=[];return r.forEach(function(i){if(i){var n=sa(i);n&&t[n]||(n&&(t[n]=!0),a.push(i))}}),a}function Pt(e){Fe.length=0,e.forEach(function(r){Fe.push(r)})}function _t(e){Pt(It(e))}function Nt(e){Pt(It(Fe.concat(Array.isArray(e)?e:[])))}var jr=!1,Xe=null;function dr(e){jr=e}function cr(e){Xe=e}var _={rendered:!1,inProgress:!1,queued:!1,navCleanup:!1,lastPageView:0},Je={},$e=null;function Rt(e){$e=e}var q="0 0 256 256",Qe={phStarOutline:"M128,189.09l54.72,33.65a8.4,8.4,0,0,0,12.52-9.17l-14.88-62.79,48.7-42A8.46,8.46,0,0,0,224.27,94L160.36,88.8,135.74,29.2a8.36,8.36,0,0,0-15.48,0L95.64,88.8,31.73,94a8.46,8.46,0,0,0-4.79,14.83l48.7,42L60.76,213.57a8.4,8.4,0,0,0,12.52,9.17Z",phStarFill:"M234.29,114.85l-45,38.83L203,211.75a16.4,16.4,0,0,1-24.5,17.82L128,198.49,77.47,229.57A16.4,16.4,0,0,1,53,211.75l13.76-58.07-45-38.83A16.46,16.46,0,0,1,31.08,86l59-4.76,22.76-55.08a16.36,16.36,0,0,1,30.27,0l22.75,55.08,59,4.76a16.46,16.46,0,0,1,9.37,28.86Z",phLeafFill:"M223.45,40.07a8,8,0,0,0-7.52-7.52C139.8,28.08,78.82,51,52.82,94a87.09,87.09,0,0,0-12.76,49A101.72,101.72,0,0,0,46.7,175.2a4,4,0,0,0,6.61,1.43l85-86.3a8,8,0,0,1,11.32,11.32L56.74,195.94,42.55,210.13a8.2,8.2,0,0,0-.6,11.1,8,8,0,0,0,11.71.43l16.79-16.79c14.14,6.84,28.41,10.57,42.56,11.07q1.67.06,3.33.06A86.93,86.93,0,0,0,162,203.18C205,177.18,227.93,116.21,223.45,40.07Z",phHeartFill:"M240,102c0,70-103.79,126.66-108.21,129a8,8,0,0,1-7.58,0C119.79,228.66,16,172,16,102A62.07,62.07,0,0,1,78,40c20.65,0,38.73,8.88,50,23.89C139.27,48.88,157.35,40,178,40A62.07,62.07,0,0,1,240,102Z",phCrownFill:"M239.75,90.81c0,.11,0,.21-.07.32L217,195a16,16,0,0,1-15.72,13H54.71A16,16,0,0,1,39,195L16.32,91.13c0-.11-.05-.21-.07-.32A16,16,0,0,1,44,77.39l33.67,36.29,35.8-80.29a1,1,0,0,0,0-.1,16,16,0,0,1,29.06,0,1,1,0,0,0,0,.1l35.8,80.29L212,77.39a16,16,0,0,1,27.71,13.42Z"},Vr={star:{label:"Star",styles:{classic:{label:"Star",filled:'<svg viewBox="'+q+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="'+Qe.phStarFill+'"/></svg>',empty:'<svg viewBox="'+q+'" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="'+Qe.phStarOutline+'"/></svg>'}}},favorite:{label:"Heart",styles:{modern:{label:"Heart",filled:'<svg viewBox="'+q+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="'+Qe.phHeartFill+'"/></svg>',empty:'<svg viewBox="'+q+'" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M128,224S24,168,24,102A54,54,0,0,1,78,48c22.59,0,41.94,12.31,50,32,8.06-19.69,27.41-32,50-32a54,54,0,0,1,54,54C232,168,128,224,128,224Z"/></svg>'}}},leaf:{label:"Leaf",styles:{phosphor:{label:"Leaf",filled:'<svg viewBox="'+q+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="'+Qe.phLeafFill+'"/></svg>',empty:'<svg viewBox="'+q+'" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M63.81,192.19c-47.89-79.81,16-159.62,151.64-151.64C223.43,176.23,143.62,240.08,63.81,192.19Z"/><line x1="160" y1="96" x2="40" y2="216"/></svg>'}}},crown:{label:"Crown",styles:{modern:{label:"Crown",filled:'<svg viewBox="'+q+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="'+Qe.phCrownFill+'"/></svg>',empty:'<svg viewBox="'+q+'" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M54.71,200H201.29a8,8,0,0,0,7.88-6.61l22.7-104A8,8,0,0,0,218,82.76L176,128,135.26,36.65a8,8,0,0,0-14.52,0L80,128,38,82.76a8,8,0,0,0-13.9,6.66l22.7,104A8,8,0,0,0,54.71,200Z"/></svg>'}}},paw:{label:"Paw",styles:{phosphor:{label:"Paw",filled:'<svg viewBox="'+q+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M240,108a28,28,0,1,1-28-28A28,28,0,0,1,240,108ZM72,108a28,28,0,1,0-28,28A28,28,0,0,0,72,108ZM92,88A28,28,0,1,0,64,60,28,28,0,0,0,92,88Zm72,0a28,28,0,1,0-28-28A28,28,0,0,0,164,88Zm23.12,60.86a35.3,35.3,0,0,1-16.87-21.14,44,44,0,0,0-84.5,0A35.25,35.25,0,0,1,69,148.82,40,40,0,0,0,88,224a39.48,39.48,0,0,0,15.52-3.13,64.09,64.09,0,0,1,48.87,0,40,40,0,0,0,34.73-72Z"/></svg>',empty:'<svg viewBox="'+q+'" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><circle cx="212" cy="108" r="20"/><circle cx="44" cy="108" r="20"/><circle cx="92" cy="60" r="20"/><circle cx="164" cy="60" r="20"/><path d="M128,104A36,36,0,0,0,93.43,130a43.49,43.49,0,0,1-20.67,25.9,32,32,0,0,0,27.73,57.62,72.49,72.49,0,0,1,55,0,32,32,0,0,0,27.73-57.62A43.46,43.46,0,0,1,162.57,130,36,36,0,0,0,128,104Z"/></svg>'}}},clover:{label:"Clover",styles:{phosphor:{label:"Clover",filled:'<svg viewBox="'+q+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M228,120c0,22.63-6,36.72-17.93,41.87a27.3,27.3,0,0,1-11,2.13,41.75,41.75,0,0,1-8.4-.93,4.05,4.05,0,0,1-2.52-1.64,368.49,368.49,0,0,0-47.75-55.26,8,8,0,0,0-11,11.62c14.84,13.91,64.13,63.49,78.32,120.27a8,8,0,0,1-5.82,9.7A8.13,8.13,0,0,1,200,248a8,8,0,0,1-7.75-6.06c-4.12-16.47-11.65-32.48-20.46-47.09a25.85,25.85,0,0,1-1.9,7.21C164.72,214,150.63,220,128,220s-36.72-6-41.88-17.94c-5.45-12.58-.39-30.82,15-54.21.68-1,1.36-2,2-3l-3,2C82.84,158.27,68.35,164,56.89,164a27.3,27.3,0,0,1-11-2.13C34,156.72,28,142.63,28,120s6-36.72,17.93-41.88c12.59-5.45,30.83-.39,54.22,15l3,2q-1-1.5-2-3c-15.41-23.39-20.47-41.63-15-54.22C91.28,26,105.37,20,128,20s36.72,6,41.88,17.93c5.45,12.59.39,30.83-15,54.22q-1,1.53-2,3l3-2c23.39-15.41,41.63-20.47,54.22-15C222,83.28,228,97.37,228,120Z"/></svg>',empty:'<svg viewBox="'+q+'" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M228,120c0,22.63-6,36.72-17.93,41.87a27.3,27.3,0,0,1-11,2.13,41.75,41.75,0,0,1-8.4-.93,4.05,4.05,0,0,1-2.52-1.64,368.49,368.49,0,0,0-47.75-55.26,8,8,0,0,0-11,11.62c14.84,13.91,64.13,63.49,78.32,120.27a8,8,0,0,1-5.82,9.7A8.13,8.13,0,0,1,200,248a8,8,0,0,1-7.75-6.06c-4.12-16.47-11.65-32.48-20.46-47.09a25.85,25.85,0,0,1-1.9,7.21C164.72,214,150.63,220,128,220s-36.72-6-41.88-17.94c-5.45-12.58-.39-30.82,15-54.21.68-1,1.36-2,2-3l-3,2C82.84,158.27,68.35,164,56.89,164a27.3,27.3,0,0,1-11-2.13C34,156.72,28,142.63,28,120s6-36.72,17.93-41.88c12.59-5.45,30.83-.39,54.22,15l3,2q-1-1.5-2-3c-15.41-23.39-20.47-41.63-15-54.22C91.28,26,105.37,20,128,20s36.72,6,41.88,17.93c5.45,12.59.39,30.83-15,54.22q-1,1.53-2,3l3-2c23.39-15.41,41.63-20.47,54.22-15C222,83.28,228,97.37,228,120Z"/></svg>'}}},coffee:{label:"Coffee",styles:{phosphor:{label:"Coffee",filled:'<svg viewBox="'+q+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M208,80H32a8,8,0,0,0-8,8v48a96.3,96.3,0,0,0,32.54,72H32a8,8,0,0,0,0,16H208a8,8,0,0,0,0-16H183.46a96.59,96.59,0,0,0,27-40.09A40,40,0,0,0,248,128v-8A40,40,0,0,0,208,80Zm24,48a24,24,0,0,1-17.2,23,95.78,95.78,0,0,0,1.2-15V97.38A24,24,0,0,1,232,120ZM112,56V24a8,8,0,0,1,16,0V56a8,8,0,0,1-16,0Zm32,0V24a8,8,0,0,1,16,0V56a8,8,0,0,1-16,0ZM80,56V24a8,8,0,0,1,16,0V56a8,8,0,0,1-16,0Z"/></svg>',empty:'<svg viewBox="'+q+'" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M83.3,216A88,88,0,0,1,32,136V88H208v48a88,88,0,0,1-51.3,80"/><line x1="32" y1="216" x2="208" y2="216"/><path d="M208,88h4a32,32,0,0,1,32,32v8a32,32,0,0,1-32,32h-7.38"/><line x1="80" y1="24" x2="80" y2="48"/><line x1="120" y1="24" x2="120" y2="48"/><line x1="160" y1="24" x2="160" y2="48"/></svg>'}}}};function Bt(e){var r=String(e||"star"),t=r.indexOf(":");return t===-1?{type:r,style:null}:{type:r.slice(0,t),style:r.slice(t+1)}}function je(e,r){var t=Vr[e]||Vr.star,a=t.styles;return a[r]||a[Object.keys(a)[0]]}function Ae(e){var r=e&&e.reviewIcon||"star",t=Bt(r),a=t.style||e&&e.reviewIconStyle||"classic";return je(t.type,a)}function Yr(e,r,t){for(var a=Math.round(parseFloat(e))||0,i=Ae(r),n=t&&t.sizePx,s=n?"width:"+n+"px;height:"+n+"px;":"",o="",d=1;d<=5;d++){var p=d<=a;o+='<span class="ikr-icon '+(p?"ikr-icon-filled":"ikr-icon-empty")+'" style="'+s+'">'+(p?i.filled:i.empty)+"</span>"}return o}var da="0 -960 960 960",Gr="0 0 256 256";function pr(e,r){return'<svg viewBox="'+(r||da)+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="'+e+'"/></svg>'}var ur={lines:"M400-240v-80h160v80H400ZM240-440v-80h480v80H240ZM120-640v-80h720v80H120Z",funnel:"M227.81,66.76l-.08.09L160,139.17v55.49A16,16,0,0,1,152.87,208l-32,21.34A16,16,0,0,1,96,216V139.17L28.27,66.85l-.08-.09A16,16,0,0,1,40,40H216a16,16,0,0,1,11.84,26.76Z",controls:"M84,136a28,28,0,0,1-20,26.83V216a8,8,0,0,1-16,0V162.83a28,28,0,0,1,0-53.66V40a8,8,0,0,1,16,0v69.17A28,28,0,0,1,84,136Zm52-74.83V40a8,8,0,0,0-16,0V61.17a28,28,0,0,0,0,53.66V216a8,8,0,0,0,16,0V114.83a28,28,0,0,0,0-53.66Zm72,80V40a8,8,0,0,0-16,0V141.17a28,28,0,0,0,0,53.66V216a8,8,0,0,0,16,0V194.83a28,28,0,0,0,0-53.66Z",sliders:"M32,80a8,8,0,0,1,8-8H77.17a28,28,0,0,1,53.66,0H216a8,8,0,0,1,0,16H130.83a28,28,0,0,1-53.66,0H40A8,8,0,0,1,32,80Zm184,88H194.83a28,28,0,0,0-53.66,0H40a8,8,0,0,0,0,16H141.17a28,28,0,0,0,53.66,0H216a8,8,0,0,0,0-16Z"},qr={lines:{label:"Lines",svg:pr(ur.lines)},funnel:{label:"Funnel",svg:pr(ur.funnel,Gr)},controls:{label:"Controls",svg:pr(ur.controls,Gr)},sliders:{label:"Sliders",svg:pr(ur.sliders,Gr)}};function Ur(e){var r=e==="star"?"funnel":e,t=qr[r]||qr.lines;return t.svg}var ca="var(--ikr-review-star-color,#f59e0b)";var mr=/^(account|pages|blog|search|cart|checkout|siparis|odeme|kategori|category|urun|products?)/;function Y(e){try{return new URL(e,window.location.origin).pathname.replace(/^\//,"").split("?")[0].split("/")[0]}catch(r){return""}}function we(e,r){var t="color:"+ca+";display:inline-flex;gap:2px;align-items:center;";return'<span class="ikr-stars" style="'+t+'">'+Yr(e,r)+"</span>"}function le(e,r,t){for(var a=Math.max(0,Math.min(5,parseFloat(e)||0)),i=Math.floor(a),n=a-i,s=n<.25?i:n<.75?i+.5:i+1,o=t&&t.sizeStyle||"",d="",p=1;p<=5;p++){var u=p<=s?"full":p-.5===s?"half":"empty";u==="full"?d+='<span class="ikr-star ikr-star-full" style="'+o+'">'+r.filled+"</span>":u==="empty"?d+='<span class="ikr-star ikr-star-empty" style="'+o+'">'+r.empty+"</span>":d+='<span class="ikr-star ikr-star-half" style="'+o+'"><span class="ikr-star-half-bg">'+r.empty+'</span><span class="ikr-star-half-fg">'+r.filled+"</span></span>"}return'<span class="ikr-stars-partial">'+d+"</span>"}var fr=`  /* \u2500\u2500\u2500 PARTIAL STARS (bireysel star + clip-path) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
     Her y\u0131ld\u0131z ba\u011F\u0131ms\u0131z .ikr-star kapsay\u0131c\u0131s\u0131nda. Half state'te tek filled
     geometri iki katmanda: alt katman bo\u015F-renk full, \xFCst katman dolu-renk
     + clip-path:inset(0 50% 0 0) ile sol %50. Tek SVG path kullan\u0131ld\u0131\u011F\u0131
     i\xE7in kare/kalp ikonlar\u0131nda bile geometri uyumsuzlu\u011Fu fiziksel olarak
     imk\xE2ns\u0131z. Material UI Rating decimal mode + react-stars pattern. */
  .ikr-stars-partial{display:inline-flex;gap:2px;align-items:center;line-height:1;}
  .ikr-star{
    position:relative;
    display:inline-flex;
    align-items:center;
    justify-content:center;
    flex-shrink:0;
    line-height:1;
  }
  .ikr-star > svg{width:100%;height:100%;display:block;}
  .ikr-star-full  { color: var(--ikr-review-star-color, #f59e0b); }
  .ikr-star-empty { color: var(--ikr-star-empty-color,  #e5e7eb); }
  /* Half: iki katman, \xFCst katman clip ile sol %50. */
  .ikr-star-half-bg,
  .ikr-star-half-fg{
    position:absolute;
    inset:0;
    display:inline-flex;
    align-items:center;
    justify-content:center;
  }
  .ikr-star-half-bg{ color: var(--ikr-star-empty-color, #e5e7eb); }
  .ikr-star-half-fg{
    color: var(--ikr-review-star-color, #f59e0b);
    -webkit-clip-path: inset(0 50% 0 0);
            clip-path: inset(0 50% 0 0);
  }
  .ikr-star-half-bg > svg,
  .ikr-star-half-fg > svg{width:100%;height:100%;display:block;}`;function xe(e){return e?new Date(e).toLocaleDateString("tr-TR",{year:"numeric",month:"long",day:"numeric"}):""}function Mt(e,r){var t=document.getElementById("ikr-styles");t||(t=document.createElement("style"),t.id="ikr-styles",document.head.appendChild(t)),t.textContent=r}var pa={jpg:!0,jpeg:!0,png:!0,webp:!0,gif:!0,avif:!0};function ua(e){var r=typeof e=="string"?e.trim():"";return/^[A-Za-z0-9_-]+$/.test(r)?r:""}var Wr=ua("dtn7jhhuy");Wr||console.error("[ikr] NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME is missing at build time; review images will be hidden until widget is rebuilt with a valid cloud name.");function ma(e){return typeof window!="undefined"&&window.__ikasPreviewMode===!0&&e.protocol==="https:"&&e.hostname==="placehold.co"&&!e.search&&!e.hash&&/\.(png|jpe?g|webp|gif|avif)$/i.test(e.pathname)}function Kr(e){if(typeof e!="string")return!1;var r=e.trim();if(!r||r.length>2048)return!1;var t;try{t=new URL(r)}catch(d){return!1}if(ma(t))return!0;if(!Wr||t.protocol!=="https:"||t.hostname!=="res.cloudinary.com"||t.username||t.password||t.port||t.search||t.hash)return!1;var a=t.pathname.toLowerCase();if(a.indexOf("%2f")!==-1||a.indexOf("%5c")!==-1)return!1;var i=t.pathname.split("/").filter(Boolean);if(i.length<6||i[0]!==Wr||i[1]!=="image"||i[2]!=="upload"||!/^v\d+$/.test(i[3])||i[4]!=="review_images")return!1;for(var n=5;n<i.length;n++)if(i[n]==="."||i[n]==="..")return!1;var s=i[i.length-1],o=s.lastIndexOf(".");return o===-1?!1:!!pa[s.slice(o+1).toLowerCase()]}function ze(e){var r=e&&e.images&&Array.isArray(e.images)?e.images:[],t=[];return r.forEach(function(a){if(Kr(a)){var i=a.trim();t.indexOf(i)===-1&&t.push(i)}}),t}function vr(e){var r=ze(e);return r.length?r[0]:null}var X=300,kr=600,gr=200,rr=1200;function er(e,r){if(!e||e.indexOf("res.cloudinary.com")===-1)return e;var t=typeof r=="number"&&r>0?Math.round(r):rr;return e.replace("/upload/","/upload/q_auto/f_auto/c_scale,w_"+t+"/")}function se(e,r){if(!e)return{src:"",srcset:""};var t=typeof r=="number"&&r>0?Math.round(r):rr,a=t*2,i=er(e,t),n=er(e,a);return{src:i,srcset:i+" 1x, "+n+" 2x"}}function Zr(e,r){if(!e||typeof e.addEventListener!="function")return;var t=!1;function a(){if(!t){t=!0,e.removeEventListener("error",a);var i=e.currentSrc||e.getAttribute("src")||"";if(console.warn("[ikr] image failed to load:",i),typeof r=="function")try{r(e)}catch(n){}}}e.addEventListener("error",a),e.complete&&e.naturalWidth===0&&(e.currentSrc||e.getAttribute("src"))&&a()}function de(e){Zr(e,function(r){r.style.display="none"})}var Ot=!1;function Dt(){Ot||(Ot=!0,document.addEventListener("click",function(e){var r=e.target.closest("a[href]");if(r&&!(r.closest("header")||r.closest("nav"))&&!(r.closest('[class*="basket"]')||r.closest('[class*="cart"]'))){var t=Y(r.href);!t||t.length<3||Rt(t)}},!0))}var Ht=!1,Ft=typeof location!="undefined"?location.pathname:"";function hr(){try{if(location.pathname===Ft)return;Ft=location.pathname;var e=document.getElementById("ikr-rating-badge");e&&e.remove();var r=document.getElementById("ikr-jsonld");r&&r.remove()}catch(t){}}function jt(){if(!Ht){Ht=!0;var e=history.pushState,r=history.replaceState;history.pushState=function(){var t=e.apply(this,arguments);return hr(),t},history.replaceState=function(){var t=r.apply(this,arguments);return hr(),t},window.addEventListener("popstate",hr),window.addEventListener("hashchange",hr)}}var Vt={};function tr(e){try{return sessionStorage.getItem(e)}catch(r){return Vt[e]||null}}function O(e,r){try{sessionStorage.setItem(e,r)}catch(t){Vt[e]=r}}function ee(e,r,t){var a=new AbortController,i=setTimeout(function(){a.abort()},t||8e3);return fetch(e,Object.assign({},r,{signal:a.signal})).finally(function(){clearTimeout(i)})}function Ve(e){return ze(e)}function fa(){var e=document.body.style,r=document.documentElement.style;return{scrollX:window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft||0,scrollY:window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0,fixedBodyLock:!1,bodyOverflow:e.getPropertyValue("overflow"),bodyOverflowPriority:e.getPropertyPriority("overflow"),bodyPaddingRight:e.getPropertyValue("padding-right"),bodyPaddingRightPriority:e.getPropertyPriority("padding-right"),bodyPosition:e.getPropertyValue("position"),bodyPositionPriority:e.getPropertyPriority("position"),bodyTop:e.getPropertyValue("top"),bodyTopPriority:e.getPropertyPriority("top"),bodyLeft:e.getPropertyValue("left"),bodyLeftPriority:e.getPropertyPriority("left"),bodyRight:e.getPropertyValue("right"),bodyRightPriority:e.getPropertyPriority("right"),bodyWidth:e.getPropertyValue("width"),bodyWidthPriority:e.getPropertyPriority("width"),bodyOverscrollBehaviorY:e.getPropertyValue("overscroll-behavior-y"),bodyOverscrollBehaviorYPriority:e.getPropertyPriority("overscroll-behavior-y"),rootOverflow:r.getPropertyValue("overflow"),rootOverflowPriority:r.getPropertyPriority("overflow"),rootOverscrollBehaviorY:r.getPropertyValue("overscroll-behavior-y"),rootOverscrollBehaviorYPriority:r.getPropertyPriority("overscroll-behavior-y")}}function ce(e,r,t,a){t?e.setProperty(r,t,a||""):e.removeProperty(r)}function va(){if(typeof navigator=="undefined")return!1;var e=navigator.platform||"",r=navigator.userAgent||"",t=navigator.maxTouchPoints||0,a=/iP(ad|hone|od)/.test(e)||e==="MacIntel"&&t>1;return a&&/AppleWebKit/i.test(r)}function ka(){var e=fa(),r=document.body.style,t=document.documentElement.style,a=Math.max(0,window.innerWidth-document.documentElement.clientWidth),i=window.getComputedStyle(document.body).position==="fixed",n=va()&&!i;if(a>0){var s=parseFloat(window.getComputedStyle(document.body).paddingRight)||0;r.setProperty("padding-right",s+a+"px","important")}return t.setProperty("overflow","hidden","important"),t.setProperty("overscroll-behavior-y","none","important"),r.setProperty("overflow","hidden","important"),r.setProperty("overscroll-behavior-y","none","important"),n&&(e.fixedBodyLock=!0,r.setProperty("position","fixed","important"),r.setProperty("top",-e.scrollY+"px","important"),r.setProperty("left",-e.scrollX+"px","important"),r.setProperty("right","0","important"),r.setProperty("width","100%","important")),e}function ga(e){if(e){var r=document.body.style,t=document.documentElement.style;ce(t,"overflow",e.rootOverflow,e.rootOverflowPriority),ce(t,"overscroll-behavior-y",e.rootOverscrollBehaviorY,e.rootOverscrollBehaviorYPriority),ce(r,"overflow",e.bodyOverflow,e.bodyOverflowPriority),ce(r,"padding-right",e.bodyPaddingRight,e.bodyPaddingRightPriority),ce(r,"overscroll-behavior-y",e.bodyOverscrollBehaviorY,e.bodyOverscrollBehaviorYPriority),ce(r,"position",e.bodyPosition,e.bodyPositionPriority),ce(r,"top",e.bodyTop,e.bodyTopPriority),ce(r,"left",e.bodyLeft,e.bodyLeftPriority),ce(r,"right",e.bodyRight,e.bodyRightPriority),ce(r,"width",e.bodyWidth,e.bodyWidthPriority),e.fixedBodyLock&&window.scrollTo(e.scrollX,e.scrollY)}}function ha(){var e=document.activeElement;return!e||e===document.body||e===document.documentElement?null:e}function Ye(e){if(!(!e||!document.contains(e)||typeof e.focus!="function"))try{e.focus({preventScroll:!0})}catch(r){try{e.focus()}catch(t){}}}function ya(e){return!e||e.disabled||e.getAttribute("aria-hidden")==="true"?!1:!!(e.offsetWidth||e.offsetHeight||e.getClientRects().length)}function Gt(e){var r=["a[href]","button:not([disabled])","input:not([disabled])","select:not([disabled])","textarea:not([disabled])",'[tabindex]:not([tabindex="-1"])'].join(",");return Array.prototype.slice.call(e.querySelectorAll(r)).filter(ya)}function qt(e){var r=Gt(e),t=r[0]||e.querySelector('[role="dialog"]')||e;Ye(t)}function ba(e,r){if(e.key==="Tab"){var t=Gt(r);if(!t.length){e.preventDefault(),qt(r);return}var a=t[0],i=t[t.length-1],n=document.activeElement;if(!r.contains(n)){e.preventDefault(),Ye(a);return}e.shiftKey&&n===a?(e.preventDefault(),Ye(i)):!e.shiftKey&&n===i&&(e.preventDefault(),Ye(a))}}function wa(){var e={id:"ikr-modal-"+Date.now()+"-"+Math.random().toString(36).slice(2),previousState:null,pushed:!1,url:window.location.href};try{e.previousState=history.state,history.pushState({ikrModal:e.id},"",e.url),e.pushed=!0}catch(r){}return e}function xa(e){return!!(e&&e.pushed&&window.location.href===e.url&&history.state&&history.state.ikrModal===e.id)}function za(e){if(xa(e))try{history.replaceState(e.previousState,"",e.url)}catch(r){}}function Yt(e,r,t,a,i){ga(a),document.removeEventListener("keydown",r),window.removeEventListener("popstate",t),e.parentNode&&e.parentNode.removeChild(e),Ye(i)}function Ca(e){var r=document.createElement("div");r.className="ikr-modal-right";var t=document.createElement("div");t.className="ikr-modal-scroll-content";var a=document.createElement("div");a.className="ikr-modal-top-row";var i=document.createElement("div");i.className="ikr-modal-stars",i.innerHTML=we(e.rating,I);var n=document.createElement("span");n.className="ikr-modal-date",n.textContent=xe(e.createdAt),a.appendChild(i),a.appendChild(n),t.appendChild(a);var s=document.createElement("div");s.className="ikr-modal-title",s.textContent=e.title||"",s.style.display=e.title?"":"none",t.appendChild(s);var o=document.createElement("div");o.className="ikr-modal-author",o.textContent=e.author||"",t.appendChild(o);var d=document.createElement("div");d.className="ikr-modal-body",d.textContent=(e.comment||"").trim(),d.style.display=e.comment&&e.comment.trim()?"":"none",t.appendChild(d);var p=document.createElement("div");p.className="ikr-modal-reply";var u=document.createElement("div");u.className="ikr-modal-reply-label",u.textContent=I&&I.merchantReplyLabel||"Ma\u011Faza Sahibi";var c=document.createElement("div");return c.className="ikr-modal-reply-text",c.textContent=e.merchantReply||"",p.appendChild(u),p.appendChild(c),p.style.display=e.merchantReply?"":"none",t.appendChild(p),r.appendChild(t),r}function Ut(e,r,t){var a=t||I,i=e.querySelector(".ikr-modal-scroll-content"),n=i.querySelector(".ikr-modal-stars");n.innerHTML=we(r.rating,a),i.querySelector(".ikr-modal-date").textContent=xe(r.createdAt);var s=i.querySelector(".ikr-modal-title");s.textContent=r.title||"",s.style.display=r.title?"":"none",i.querySelector(".ikr-modal-author").textContent=r.author||"";var o=i.querySelector(".ikr-modal-body");o.textContent=(r.comment||"").trim(),o.style.display=r.comment&&r.comment.trim()?"":"none";var d=i.querySelector(".ikr-modal-reply");d.querySelector(".ikr-modal-reply-label").textContent=a&&a.merchantReplyLabel||"Ma\u011Faza Sahibi",d.querySelector(".ikr-modal-reply-text").textContent=r.merchantReply||"",d.style.display=r.merchantReply?"":"none",e.scrollTop=0}function Jr(e,r,t,a,i,n,s,o,d){var p=Ve(e),u=Math.max(0,Math.min(t||0,p.length-1)),c=document.createElement("div");c.className="ikr-modal-left";var l=document.createElement("img"),m=s==="next"?"ikr-modal-img-enter-right":s==="prev"?"ikr-modal-img-enter-left":"";l.className="ikr-modal-main-img"+(m?" "+m:""),l.src=er(p[u]||""),l.decoding="async",l.width=rr,l.height=Math.round(rr*4/3),l.alt="Yorum foto\u011Fraf\u0131",Zr(l,function(E){if(E.style.display="none",!c.querySelector(".ikr-modal-img-error")){var T=document.createElement("div");T.className="ikr-modal-img-error",T.setAttribute("role","status"),T.textContent="Bu g\xF6rsel \u015Fu anda y\xFCklenemiyor.",c.insertBefore(T,E)}}),c.appendChild(l);var f=document.createElement("button");f.className="ikr-modal-close-mobile",f.textContent="\u2715",f.setAttribute("aria-label","Kapat"),f.onclick=function(E){E.stopPropagation(),n()},c.appendChild(f);var k=0;if(c.addEventListener("touchstart",function(E){k=E.touches[0].clientX},{passive:!0}),c.addEventListener("touchend",function(E){var T=k-E.changedTouches[0].clientX;if(!(Math.abs(T)<50)){if(T>0){if(x)Ce(e,r,u+1,a,i,n,!0,"next",o,d);else if(g){var h=a[r+1];Ce(h,r+1,0,a,i,n,!1,"next",o,d)}}else if(y)Ce(e,r,u-1,a,i,n,!0,"prev",o,d);else if(b){var A=a[r-1],L=Ve(A);Ce(A,r-1,L.length-1,a,i,n,!1,"prev",o,d)}}},{passive:!0}),p.length>1){var v=document.createElement("div");v.className="ikr-modal-thumbs",p.forEach(function(E,T){var h=document.createElement("img"),A=se(E,gr);h.src=A.src,h.srcset=A.srcset,h.loading="lazy",h.decoding="async",h.width=gr,h.height=gr,h.className="ikr-modal-thumb"+(T===u?" ikr-modal-thumb-active":""),h.alt="K\xFC\xE7\xFCk resim "+(T+1),de(h),h.tabIndex=0,h.setAttribute("role","button"),h.setAttribute("aria-label","K\xFC\xE7\xFCk resim "+(T+1)+" se\xE7"),T===u&&h.setAttribute("aria-current","true"),(function(L){function B(){Ce(e,r,L,a,i,n,!0,null,o,d)}h.onclick=B,h.onkeydown=function(H){(H.key==="Enter"||H.key===" ")&&(H.preventDefault(),B())}})(T),v.appendChild(h)}),c.appendChild(v)}var y=u>0,x=u<p.length-1,b=r>0,g=r<a.length-1,S=y||b,z=x||g;if(S){var C=document.createElement("button");C.className="ikr-modal-nav ikr-modal-nav-prev",C.innerHTML="&#8249;",C.setAttribute("aria-label","\xD6nceki"),C.onclick=function(E){if(E.stopPropagation(),y)Ce(e,r,u-1,a,i,n,!0,"prev",o,d);else if(b){var T=a[r-1],h=Ve(T);Ce(T,r-1,h.length-1,a,i,n,!1,"prev",o,d)}},c.appendChild(C)}if(z){var w=document.createElement("button");w.className="ikr-modal-nav ikr-modal-nav-next",w.innerHTML="&#8250;",w.setAttribute("aria-label","Sonraki"),w.onclick=function(E){if(E.stopPropagation(),x)Ce(e,r,u+1,a,i,n,!0,"next",o,d);else if(g){var T=a[r+1];Ce(T,r+1,0,a,i,n,!1,"next",o,d)}},c.appendChild(w)}return c}function Wt(e,r){[-1,1].forEach(function(t){var a=r[e+t];if(a){var i=Ve(a);i[0]&&(new Image().src=er(i[0]))}})}function Xr(e){if(e){if(typeof e.scrollTo=="function")try{e.scrollTo({top:0,left:0,behavior:"auto"});return}catch(r){}e.scrollTop=0,e.scrollLeft=0}}function Sa(e,r){var t=e&&e.querySelector(".ikr-modal-wrap"),a=r&&r.querySelector(".ikr-modal-right"),i=r&&r.querySelector(".ikr-modal-scroll-content");function n(){Xr(t),Xr(a),Xr(i)}n(),t&&Ye(t),typeof requestAnimationFrame=="function"?requestAnimationFrame(function(){n(),requestAnimationFrame(n)}):setTimeout(n,0)}function Ce(e,r,t,a,i,n,s,o,d,p){if(p&&(p.currentReview=e),s){var u=Jr(e,r,t,a,i,n,o,d,p);i.firstChild&&i.replaceChild(u,i.firstChild)}else{var u=Jr(e,r,t,a,i,n,o,d,p),c=i.querySelector(".ikr-modal-right");i.firstChild&&i.replaceChild(u,i.firstChild),c&&Ut(c,e,p&&p.currentSettings),Sa(d,i)}Wt(r,a)}function pe(e,r,t){var a=Ve(e);if(!a.length)return;var i=(t||[]).filter(function(g){return Ve(g).length>0}),n=i.findIndex(function(g){return g===e||g.id===e.id});n===-1&&(i.unshift(e),n=0);var s=a.indexOf(r);s<0&&(s=0);var o=document.createElement("div");o.className="ikr-modal-overlay";var d=document.createElement("div");d.className="ikr-modal";var p=!1,u=ha(),c=ka(),l=wa(),m={currentReview:e,currentSettings:I};function f(g){var S=g&&g.detail&&g.detail.settings;m.currentSettings=S||I;var z=d.querySelector(".ikr-modal-right");!z||!m.currentReview||Ut(z,m.currentReview,m.currentSettings)}function k(){p||(p=!0,window.removeEventListener("IKR_SETTINGS_UPDATED_PREVIEW",f),Yt(o,v,k,c,u))}function v(g){if(g.key==="Escape"){y();return}ba(g,o)}function y(){p||(p=!0,window.removeEventListener("IKR_SETTINGS_UPDATED_PREVIEW",f),Yt(o,v,k,c,u),za(l))}document.addEventListener("keydown",v),window.addEventListener("popstate",k),window.addEventListener("IKR_SETTINGS_UPDATED_PREVIEW",f),o.onclick=function(){y()},d.onclick=function(g){g.stopPropagation()},d.appendChild(Jr(e,n,s,i,d,y,null,o,m)),d.appendChild(Ca(e)),Wt(n,i);var x=document.createElement("div");x.className="ikr-modal-wrap",x.tabIndex=-1,x.setAttribute("role","dialog"),x.setAttribute("aria-modal","true"),x.setAttribute("aria-label","Yorum foto\u011Fraf\u0131 detay\u0131"),x.appendChild(d);var b=document.createElement("button");b.className="ikr-modal-close",b.textContent="\u2715",b.setAttribute("aria-label","Kapat"),b.onclick=function(g){g.stopPropagation(),y()},x.appendChild(b),o.appendChild(x),document.body.appendChild(o),qt(o)}function Kt(e){if(e)for(var r=document.querySelectorAll("h1,h2,h3,h4,h5,h6,div,span,p"),t=0;t<r.length;t++){var a=r[t];if(a.children.length===0&&a.textContent.trim()===e&&a.tagName!=="TITLE"&&!a.closest("[data-ikr-listing-badge]")&&!a.closest("#ikas-reviews")&&!a.closest("nav")&&!a.closest("header")&&!a.closest('[class*="breadcrumb"]')&&!a.closest('[aria-label*="breadcrumb"]'))return a}return document.querySelector("h1")}var Zt={small:{icon:14,text:"12px"},medium:{icon:16,text:"14px"},large:{icon:20,text:"16px"}};function Ea(e,r,t,a,i){var n=je(r,t),s="width:"+i+"px;height:"+i+"px;";return'<span style="color:'+a+';display:inline-flex;align-items:center;line-height:1;">'+le(e,n,{sizeStyle:s})+"</span>"}function Xt(e,r,t,a){var i=document.getElementById("ikr-rating-badge");if(i&&i.remove(),!!e&&!(a&&a.enabled===!1)){var n=document.getElementById("ikr-jsonld");n&&n.remove();var s=document.createElement("script");s.id="ikr-jsonld",s.type="application/ld+json",s.textContent=JSON.stringify({"@context":"https://schema.org","@type":"Product",name:t||document.title,url:window.location.href,aggregateRating:{"@type":"AggregateRating",ratingValue:e,reviewCount:r,bestRating:"5",worstRating:"1"}}),document.head.appendChild(s);var o=Kt(t);if(!(!o||!o.parentNode)){var d=a&&a.icon||"star",p=a&&a.iconStyle||"classic",u=a&&a.size||"medium",c=a&&a.color||"#f59e0b",l=Zt[u]||Zt.medium,m=document.createElement("a");m.id="ikr-rating-badge",m.href="#ikas-reviews";var f=window.getComputedStyle(o).textAlign,k=f==="center"?"center":f==="right"?"flex-end":"flex-start";m.style.cssText="display:flex;align-items:center;gap:5px;text-decoration:none;margin-bottom:10px;cursor:pointer;font-weight:400;justify-content:"+k+";",m.innerHTML=Ea(e,d,p,c,l.icon)+'<span style="font-size:'+l.text+';font-weight:400;color:#555;">'+e+" ("+r+" yorum)</span>",m.onclick=function(v){v.preventDefault();var y=document.getElementById("ikas-reviews-widget")||document.getElementById("ikas-reviews");if(y){var x=document.querySelector("header"),b=x?x.getBoundingClientRect().height:0,g=y.getBoundingClientRect().top+window.pageYOffset-b-16;window.scrollTo({top:g,behavior:"smooth"})}},o.parentNode.insertBefore(m,o.nextSibling)}}}var Jt=`
  /* Widget d\u0131\u015F kutu \u2014 full-bleed: ma\u011Faza temas\u0131 widget'\u0131 padding'li bir
     section/container i\xE7ine koymu\u015F olsa bile, viewport geni\u015Fli\u011Finde yay\u0131l\u0131r.
     Teknik: width:100vw + margin-left:calc(-50vw + 50%). Bu kural widget'\u0131
     parent container'\u0131n padding'inden "d\u0131\u015Far\u0131 ta\u015F\u0131r\u0131r". Arka plan\u0131 temadan
     gelir, i\xE7erideki b\xF6l\xFCmler > * kural\u0131yla 1200px ortalan\u0131r.
     NOT: 100vw scrollbar'\u0131 hesaba katmaz \u2014 scroll varsa margin-left yerine
     parent.getBoundingClientRect() ile runtime d\xFCzeltme de yap\u0131labilir, ama
     genelde bu kural yeterli. */
  #ikas-reviews-widget{color:#111111;background:transparent;border:1px solid var(--ikr-widget-border,transparent);width:100vw;max-width:100vw;margin-left:calc(50% - 50vw);margin-right:calc(50% - 50vw);margin-top:40px;margin-bottom:40px;padding:40px 16px;box-sizing:border-box;--ikr-gap-tight:4px;--ikr-gap-normal:8px;--ikr-gap-loose:16px;--ikr-gap-section:24px;--ikr-pad-summary-mobile:16px;--ikr-pad-review-mobile:16px;}
  /* Do\u011Frudan widget \xE7ocuklar\u0131 \u2014 inner wrap (1200px ortal\u0131). Summary'deki
     3 s\xFCtun (puan + bars + buton) max boyutlarda ancak ~1030px tutuyor,
     1200px tavan wrap riskini pratik olarak s\u0131f\u0131rlar. */
  #ikas-reviews-widget > *{max-width:1200px;margin-left:auto;margin-right:auto;}
  /* NOT: Eskiden burada .ikr-body ve .ikr-reply-text i\xE7in max-width:70ch vard\u0131
     (okunabilirlik). Card layout'ta "Devam\u0131n\u0131 oku" sonras\u0131 body 70ch'de kesiliyor,
     parent geni\u015Fli\u011Fini kullanm\u0131yordu \u2014 kald\u0131r\u0131ld\u0131. Sat\u0131r uzunlu\u011Fu art\u0131k layout
     container'\u0131na ba\u011Fl\u0131. Uzun-kelime ta\u015Fma korumas\u0131 overflow-wrap:anywhere ile
     ayr\u0131 kuralda (a\u015Fa\u011F\u0131da), o davran\u0131\u015F de\u011Fi\u015Fmedi. */
  /* Kullan\u0131c\u0131 i\xE7eri\u011Fi ta\u015Fma korumas\u0131 \u2014 uzun bo\u015Fluksuz string (URL, "aaaa...",
     \xFCr\xFCn kodu) container'\u0131 zorlamas\u0131n diye yumu\u015Fak k\u0131rma. Sadece text class'lar\u0131na
     uygulan\u0131r, buton/UI tipografisine dokunulmaz. Gallery masonry i\xE7in kritik:
     tek bir uzun string break-inside:avoid'a ra\u011Fmen kolon dengesini bozard\u0131. */
  #ikas-reviews-widget .ikr-body,
  #ikas-reviews-widget .ikr-author,
  #ikas-reviews-widget .ikr-review-title,
  #ikas-reviews-widget .ikr-review-list-body,
  #ikas-reviews-widget .ikr-review-list-title,
  #ikas-reviews-widget .ikr-review-list-author-name,
  #ikas-reviews-widget .ikr-review-gallery-body,
  #ikas-reviews-widget .ikr-review-gallery-title,
  #ikas-reviews-widget .ikr-review-gallery-author,
  #ikas-reviews-widget .ikr-reply-text{overflow-wrap:anywhere;}
  /* Modal document.body'ye portal'lan\u0131r \u2192 widget scope'undan \xC7IKAR. Global kural \u015Fart. */
  .ikr-modal-body,
  .ikr-modal-title,
  .ikr-modal-author,
  .ikr-modal-reply-text{overflow-wrap:anywhere;}
  .ikr-title{font-size:var(--ikr-title-size,24px);font-weight:500;text-align:left;margin-bottom:12px;color:var(--ikr-header-title,#111111);overflow-wrap:anywhere;}
  /* Classic layout basligi ortali \u2014 classic disindaki layout'lar sola yasli */
  .ikr-title-classic{text-align:center;}

  /* \u2500\u2500\u2500 SVG ICON WRAPPER \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
     .ikr-icon span'\u0131 SVG'yi sarar. Boyut parent'tan (em veya inline style) gelir,
     SVG de ona g\xF6re \xF6l\xE7eklenir. color \u2192 fill (currentColor) \u2014 yani renk
     .ikr-icon'a veya parent'\u0131na verildi\u011Finde SVG o rengi al\u0131r. */
  .ikr-icon{display:inline-flex;align-items:center;justify-content:center;line-height:1;flex-shrink:0;}
  .ikr-icon > svg{width:100%;height:100%;display:block;}

${fr}

  /* \u2500\u2500\u2500 SUMMARY LAYOUT \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
     Her blok ba\u011F\u0131ms\u0131z \u2014 s\u0131ra/gizleme CSS ile kolayca de\u011Fi\u015Ftirilebilir.
     Kolon geni\u015Flikleri CSS variable ile payla\u015F\u0131l\u0131r (label/count s\xFCtunlar\u0131).
     Bu sayede bar-row ve actions-row ayn\u0131 hizada kal\u0131r. */
  .ikr-summary{
    --ikr-col-label:104px;
    --ikr-col-count:60px;
    --ikr-col-gap:4px;
    --ikr-summary-max:340px;
    display:flex;flex-direction:column;align-items:center;gap:20px;
    padding:16px 28px 24px;border-radius:var(--ikr-radius,6px);margin:0 auto 24px;
  }
  .ikr-summary-block{display:flex;flex-direction:column;align-items:center;width:100%;max-width:var(--ikr-summary-max);}

  /* Blok: Ortalama puan (b\xFCy\xFCk) */
  .ikr-summary-avg{flex-direction:row;gap:8px;max-width:none;width:auto;}
  .ikr-avg-star{width:var(--ikr-avg-star-size,52px);height:var(--ikr-avg-star-size,52px);color:var(--ikr-review-star-color,#f59e0b);line-height:1;}
  .ikr-avg-num{font-size:var(--ikr-avg-rating-size,46px);font-weight:500;line-height:1;color:var(--ikr-header-avg,#111111);}

  /* Blok: Toplam yorum say\u0131s\u0131 */
  .ikr-summary-count{font-size:var(--ikr-review-count-size,16px);color:var(--ikr-header-count,#111111);white-space:nowrap;font-weight:400;max-width:none;width:auto;}

  /* Blok: Tavsiye y\xFCzdesi */
  .ikr-summary-recommend{display:block;font-size:var(--ikr-recommend-size,14px);color:var(--ikr-header-recommend,#111111);text-align:center;max-width:none;width:auto;}
  .ikr-recommend-pct{font-weight:700;color:var(--ikr-header-recommend,#111111);margin-right:3px;}

  /* Blok: Bar chart \u2014 her sat\u0131r 3 kolon (label | track | count) */
  /* Bar chart \u2014 flex layout. Track her sat\u0131rda sabit geni\u015Flik (label+count
     kolonu \xE7\u0131kart\u0131lm\u0131\u015F kalan alan). Count absolute, track'in sa\u011F\u0131nda
     say\u0131 kadar yer kaplar \u2014 di\u011Fer sat\u0131rlar\u0131n track'ini etkilemez. */
  .ikr-summary-bars{display:flex;flex-direction:column;gap:4px;width:100%;max-width:var(--ikr-summary-max);}
  .ikr-bar-row{
    display:flex;align-items:center;justify-content:flex-start;gap:var(--ikr-col-gap);width:100%;
    cursor:pointer;border-radius:var(--ikr-radius,6px);padding:3px 6px;
    box-sizing:border-box;position:relative;
  }
  @media(hover:hover){.ikr-bar-row:hover{background:var(--ikr-bar-hover-bg,rgba(17,17,17,0.07));}}
  .ikr-bar-active{background:var(--ikr-bar-hover-bg,rgba(17,17,17,0.07))!important;}
  .ikr-bar-label{flex:0 0 var(--ikr-col-label);display:inline-flex;align-items:center;gap:2px;white-space:nowrap;font-size:var(--ikr-bar-label-size,16px);color:#111111;}
  .ikr-bar-star{width:var(--ikr-bar-label-size,20px);height:var(--ikr-bar-label-size,20px);}
  .ikr-bar-star-filled{color:var(--ikr-review-star-color,#f59e0b);}
  .ikr-bar-star-empty{color:var(--ikr-star-empty-color,#e5e7eb);}
  .ikr-bar-track{flex:1 1 auto;min-width:0;background:var(--ikr-bar-track,#e5e7eb);border-radius:var(--ikr-radius-sm,4px);height:10px;overflow:hidden;}
  .ikr-bar-fill{height:10px;background:var(--ikr-bar-fill,#111111);border-radius:var(--ikr-radius-sm,4px);}
  .ikr-bar-count{flex:0 0 var(--ikr-col-count);white-space:nowrap;text-align:right;color:var(--ikr-bar-count,#111111);font-size:var(--ikr-bar-count-size,14px);}

  /* Blok: Aksiyon sat\u0131r\u0131 (yorum yap + filtre) \u2014 bar row sol kenar\u0131ndan ba\u015Flar, filtre count hizas\u0131nda.
     Padding yok ki wrapper tam 340px kullansin; bar chart ile kenar hizasi
     tutsun. Bar row'un kendi 3px 6px padding'i hover alani icin, actions'in
     buna ihtiyaci yok. */
  .ikr-summary-actions{
    display:flex;flex-direction:row;align-items:stretch;gap:var(--ikr-col-gap);
    box-sizing:border-box;
  }
  /* min-height:36px \u2014 filter butonu (36\xD736 sabit) ile ayni yukseklikte tutar.
     Font small/medium'da yukseklik 36'ya kilitlenir; large font'ta padding
     katkisi ile bir miktar buyur ama filter'la dengeli kalir. */
  .ikr-write-btn{flex:1 1 auto;min-width:0;min-height:36px;background:var(--ikr-btn-bg,#111111);color:var(--ikr-btn-text,#ffffff);padding:10px 24px;border-radius:var(--ikr-radius,6px);cursor:pointer;border:1px solid var(--ikr-btn-border,#111111);font-weight:500;font-size:var(--ikr-btn-text-size,14px);white-space:nowrap;transition:opacity 0.15s;}
  @media(hover:hover){.ikr-write-btn:hover{opacity:0.92;}}
  .ikr-filter-wrap{flex:0 0 var(--ikr-col-count);position:relative;display:flex;justify-content:flex-end;align-items:stretch;}
  /* Filter button colors come from the Filtre color group in admin. */
  .ikr-filter-btn{display:flex;align-items:center;justify-content:center;width:36px;min-height:36px;height:auto;border-radius:var(--ikr-radius,6px);border:1px solid var(--ikr-filter-btn-border,#111111);background:var(--ikr-filter-btn-bg,transparent);color:var(--ikr-filter-btn-text,#111111);cursor:pointer;}
  /* Material Symbols viewBox 0 -960 960 960 \u2014 buton i\xE7ine s\u0131\u011Fmas\u0131 i\xE7in 16x16 */
  .ikr-filter-btn svg{width:16px;height:16px;flex-shrink:0;}

  /* Filtre dropdown (wrap yukar\u0131da tan\u0131mland\u0131) */
  /* Filter dropdown \u2014 Premium growOut animasyonu (200ms ease-in-out) */
  @keyframes ikr-grow-out {
    0%   { opacity: 0; transform: scale(0.7) translateY(-20px); }
    100% { opacity: 1; transform: scale(1) translateY(0); }
  }
  .ikr-filter-menu{position:absolute;top:calc(100% + 6px);right:0;background:var(--ikr-filter-menu-bg,#ffffff);border:1px solid var(--ikr-filter-menu-border,#e5e7eb);border-radius:var(--ikr-radius,6px);box-shadow:0 4px 16px rgba(0,0,0,0.08);min-width:180px;overflow:hidden;z-index:999;visibility:hidden;opacity:0;pointer-events:none;transform-origin:top right;}
  .ikr-filter-menu.ikr-open{visibility:visible;pointer-events:auto;animation:ikr-grow-out 200ms ease-in-out forwards;}
  .ikr-filter-item{display:block;width:100%;text-align:left;padding:10px 16px;font:inherit;font-size:var(--ikr-filter-text-size,14px);color:var(--ikr-filter-item-text,#111111);background:transparent;border:0;cursor:pointer;}
  @media(hover:hover){.ikr-filter-item:hover{background:var(--ikr-filter-item-hover-bg,rgba(17,17,17,0.07));}}
  .ikr-filter-item-active{font-weight:700;color:var(--ikr-filter-item-active,#111111);}
  .ikr-filter-btn:focus-visible,
  .ikr-filter-item:focus-visible{outline:2px solid var(--ikr-filter-focus-ring,rgba(17,17,17,0.55));outline-offset:2px;}
  .ikr-filter-item:focus-visible{outline-offset:-2px;background:var(--ikr-filter-item-hover-bg,rgba(17,17,17,0.07));}

  /* Foto\u011Frafl\u0131 Yorumlar b\xF6l\xFCm\xFC */
  .ikr-photo-section{margin-bottom:24px;padding:0 var(--ikr-pad-review-mobile);}
  /* Strip \xFCst\xFCndeki b\xF6l\xFCm ba\u015Fl\u0131\u011F\u0131 (End\xFCstri standard\u0131: "Customer Photos") \u2014
     admin "Foto\u011Fraf Galerisi \u2192 Ba\u015Fl\u0131k Rengi" ve SIZE_PRESETS.photoTitleSize
     bu \xF6\u011Feyi kontrol eder. */
  .ikr-photo-title{
    font-size:var(--ikr-photo-title-size,16px);
    font-weight:500;
    color:var(--ikr-photo-title,#111111);
    margin-bottom:12px;
    overflow-wrap:anywhere;
  }
  .ikr-photo-strip-wrap{position:relative;}
  /* .ikr-photo-strip ve .ikr-photo-strip-thumb as\u0131l tan\u0131mlar\u0131 a\u015Fa\u011F\u0131da
     (sat\u0131r 266 ve 268). Bu \xF6l\xFC duplicate kurallar temizlendi.
     .ikr-photo-thumb hi\xE7bir DOM taraf\u0131ndan kullan\u0131lm\u0131yordu \u2014 silindi. */

  .ikr-photo-strip-arrow{position:absolute;top:50%;transform:translateY(-50%);z-index:10;background:var(--ikr-photo-arrow-bg,#fff);border:1px solid var(--ikr-photo-arrow-border,rgba(0,0,0,0.12));border-radius:var(--ikr-radius,6px);width:32px;height:32px;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:18px;color:var(--ikr-photo-arrow-text,#111111);box-shadow:0 2px 8px rgba(0,0,0,0.08);transition:all 0.2s ease;}
  @media(hover:hover){.ikr-photo-strip-arrow:hover{background:var(--ikr-photo-arrow-bg,#fff);transform:translateY(-50%) scale(1.08);box-shadow:0 4px 12px rgba(0,0,0,0.12);}}
  .ikr-photo-strip-arrow-prev{left:-16px;}
  .ikr-photo-strip-arrow-next{right:-16px;}
  @media(max-width:600px){.ikr-photo-strip-arrow{display:none;}}

  /* Yorumlar */
  /* Card review item \u2014 yan padding mobile'da --ikr-pad-review-mobile uzerinden
     (mobile blo\u011Funda set edilir). Burada sadece top/bottom; shorthand yerine
     ayr\u0131 property ki mobile yan override'\u0131 specificity sava\u015F\u0131nda kaybetmesin. */
  .ikr-review{padding-top:20px;padding-bottom:20px;border-bottom:1px solid var(--ikr-review-border,#e5e7eb);}
  .ikr-review-top{display:flex;align-items:flex-start;justify-content:space-between;gap:8px;}
  .ikr-review-top-left{display:flex;align-items:center;gap:8px;flex-wrap:wrap;}
  .ikr-review-stars{display:inline-flex;gap:2px;align-items:center;}
  .ikr-review-stars .ikr-icon{width:var(--ikr-star-size,20px);height:var(--ikr-star-size,20px);}
  .ikr-stars .ikr-icon-filled{color:var(--ikr-review-star-color,#f59e0b);}
  .ikr-stars .ikr-icon-empty{color:var(--ikr-star-empty-color,#e5e7eb);}
  /* Yorum item dikey ritm: stars\u2192title (normal), title\u2192author (normal),
     author\u2192body (normal), body\u2192reply (loose). Bkz: gap s\xF6zle\u015Fmesi (\xFCst yorum). */
  .ikr-review-title{font-weight:600;font-size:var(--ikr-review-title-size,16px);color:var(--ikr-review-title,#111111);margin-top:var(--ikr-gap-normal);}
  .ikr-author{font-size:var(--ikr-author-size,14px);font-weight:600;font-style:normal;color:var(--ikr-review-author,#111111);margin-top:var(--ikr-gap-normal);}
  .ikr-date{color:var(--ikr-review-date,#5e5e5e);font-size:var(--ikr-review-date-size,12px);font-weight:400;white-space:nowrap;flex-shrink:0;}
  .ikr-body{margin-top:var(--ikr-gap-normal);line-height:1.65;color:var(--ikr-review-body,#111111);font-size:var(--ikr-review-text-size,14px);font-weight:400;}
  .ikr-body-clamped{display:-webkit-box;-webkit-line-clamp:4;-webkit-box-orient:vertical;overflow:hidden;}
  .ikr-read-more{display:block;margin-top:var(--ikr-gap-tight);color:var(--ikr-review-body,#111111);font-weight:600;cursor:pointer;font-size:var(--ikr-read-more-size,12px);}
  .ikr-gallery{display:flex;gap:10px;flex-wrap:wrap;margin-top:var(--ikr-gap-loose);}
  .ikr-img{width:var(--ikr-card-photo-w,var(--ikr-thumbnail-size,90px));height:var(--ikr-card-photo-w,var(--ikr-thumbnail-size,90px));object-fit:cover;border-radius:var(--ikr-radius,6px);border:1px solid var(--ikr-photo-image-border,rgba(0,0,0,0.05));cursor:zoom-in;}
  .ikr-reply{margin-top:var(--ikr-gap-loose);padding:12px 16px;background:var(--ikr-reply-bg-color,#f9fafb);border-radius:var(--ikr-radius,6px);border-left:3px solid var(--ikr-reply-border,#747474);}
  .ikr-reply-header{display:flex;align-items:center;gap:8px;margin-bottom:6px;}
  .ikr-reply-label{font-weight:600;font-size:var(--ikr-reply-name-size,13px);color:var(--ikr-reply-label,#111111);overflow-wrap:anywhere;}
  .ikr-reply-text{font-size:var(--ikr-reply-text-size,13px);font-weight:400;color:var(--ikr-reply-text,#111111);line-height:1.6;}
  /* Reply clamp: yorum metni (.ikr-body-clamped) 4 sat\u0131r; reply 2 sat\u0131r
     (subordinate, m\xFC\u015Fteri yorumundan k\u0131sa kal\u0131r). "Devam\u0131n\u0131 oku" sadece
     clamp devreye girdiyse g\xF6r\xFCn\xFCr \u2014 buildReplyEl helper'\u0131 runtime kontrol eder. */
  .ikr-reply-text-clamped{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}
  .ikr-reply-read-more{margin-top:var(--ikr-gap-tight);}

  /* Daha Fazla G\xF6ster butonu \u2014 tema uyumlu, outline stil */
  .ikr-load-more{display:block;margin:20px auto 0;padding:10px 28px;border:1px solid var(--ikr-load-more-border,#111111);border-radius:var(--ikr-radius,6px);background:var(--ikr-load-more-bg,#ffffff);color:var(--ikr-load-more-text,#111111);font-size:var(--ikr-load-more-size,14px);cursor:pointer;}
  .ikr-load-more:disabled{opacity:.6;cursor:not-allowed;}

  /* Y\xFCkleniyor / bo\u015F durum mesajlar\u0131 \u2014 tema uyumlu */
  .ikr-state-msg{text-align:center;color:rgba(17,17,17,0.45);font-size:14px;padding:30px 0;}
  .ikr-state-loading{padding:40px;}
  .ikr-state-error{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;color:#991b1b;}
  .ikr-state-error-text{max-width:360px;line-height:1.45;}
  .ikr-state-retry{padding:9px 22px;border:1px solid var(--ikr-load-more-border,#111111);border-radius:var(--ikr-radius,6px);background:var(--ikr-load-more-bg,#ffffff);color:var(--ikr-load-more-text,#111111);font-size:var(--ikr-load-more-size,14px);cursor:pointer;}
  .ikr-state-retry:disabled{opacity:.6;cursor:not-allowed;}

  /* Review Modal */
  /* Modal document.body'ye portal'lan\u0131r \u2192 widget root scope'undan \xC7IKAR.
     Yorum item gap token'lar\u0131 (--ikr-gap-*) burada da yeniden tan\u0131mlan\u0131r
     ki modal-* selekt\xF6rleri base ile ayn\u0131 dili konu\u015Fsun. Tek do\u011Fruluk
     kayna\u011F\u0131 yine \xFCstteki s\xF6zle\u015Fme yorumudur. */
  .ikr-modal-overlay{position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;padding:16px;background:rgba(0,0,0,0.50);overscroll-behavior:contain;--ikr-gap-tight:4px;--ikr-gap-normal:8px;--ikr-gap-loose:16px;--ikr-gap-section:24px;}
  .ikr-modal-wrap{position:relative;width:100%;max-width:813px;}
  .ikr-photo-section{margin:24px 0 32px;padding:0 var(--ikr-pad-review-mobile);display:block;}
  .ikr-photo-strip-container{position:relative;}
  /* Desktop: ok'lar icin negatif margin. Mobile'da ok yok, margin gerekmez. */
  @media(min-width:601px){
    .ikr-photo-strip-container{margin:0 calc(-1 * var(--ikr-pad-review-mobile));}
  }
  .ikr-photo-strip{display:flex;gap:10px;overflow-x:auto;padding:4px 0;scroll-behavior:smooth;-webkit-overflow-scrolling:touch;scrollbar-width:none;}
  .ikr-photo-strip::-webkit-scrollbar{display:none;}
  /* Thumbnail geni\u015Fli\u011Fi sabit (--ikr-thumbnail-size); y\xFCksekli\u011Fi aspect-ratio
     ile gelir. --ikr-photo-thumb-aspect render.js'de review layout'a g\xF6re set
     edilir: card -> 1/1 (kare), list & gallery -> 3/4 (portre, item fotolar\u0131yla
     tutarl\u0131). Fallback 1/1, eski davran\u0131\u015F. */
  .ikr-photo-strip-thumb{flex:0 0 var(--ikr-thumbnail-size,90px);width:var(--ikr-thumbnail-size,90px);height:auto;aspect-ratio:var(--ikr-photo-thumb-aspect,1/1);border-radius:var(--ikr-radius,8px);object-fit:cover;cursor:pointer;transition:transform 0.2s ease;border:1px solid var(--ikr-photo-image-border,rgba(0,0,0,0.05));}
  @media(hover:hover){.ikr-photo-strip-thumb:hover{transform:translateY(-2px);}}

  .ikr-photo-strip-wrap{position:relative;display:block;}

  .ikr-modal{background:#ffffff;color:#111111;border-radius:calc(var(--ikr-radius, 8px) * 1.5);overflow:hidden;display:flex;width:100%;height:584px;max-height:80vh;box-shadow:0 16px 48px rgba(0,0,0,0.25);}
  .ikr-modal-left{flex:0 0 438px;background:#222;position:relative;overflow:hidden;}
  .ikr-modal-main-img{position:absolute;top:0;left:0;width:100%;height:100%;object-fit:contain;display:block;background:#222;}
  /* G\xF6rsel y\xFCklenemedi\u011Finde ana <img> gizlenir, yerine bu placeholder konur.
     ikr-modal-left koyu zemini koruyor, metin n\xF6tr kal\u0131yor. */
  .ikr-modal-img-error{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;padding:24px;color:#cccccc;background:#222;font-size:14px;line-height:1.4;text-align:center;}
  .ikr-modal-img-enter-right{animation:ikrSlideInRight 0.2s ease forwards;}
  .ikr-modal-img-enter-left{animation:ikrSlideInLeft 0.2s ease forwards;}
  @keyframes ikrSlideInRight{from{transform:translateX(60px);opacity:0;}to{transform:translateX(0);opacity:1;}}
  @keyframes ikrSlideInLeft{from{transform:translateX(-60px);opacity:0;}to{transform:translateX(0);opacity:1;}}
  .ikr-modal-close,
  .ikr-modal-close-mobile{background:#00000080;border:1px solid #ffffff33;box-sizing:border-box;color:#ffffff;font-size:14px;cursor:pointer;line-height:1;padding:0;border-radius:var(--ikr-radius,6px);width:32px;height:32px;align-items:center;justify-content:center;}
  .ikr-modal-close{position:absolute;top:-42px;right:0;display:flex;z-index:100000;}
  @media(hover:hover){.ikr-modal-close:hover{opacity:0.85;}}
  @media(max-width:640px){.ikr-modal-close{display:none;}}
  .ikr-modal-close-mobile{display:none;position:absolute;top:12px;right:12px;z-index:2;}
  @media(hover:hover){.ikr-modal-close-mobile:hover{opacity:0.85;}}
  .ikr-modal-nav{position:absolute;top:50%;transform:translateY(-50%);background:#00000059;border:1px solid #ffffff33;box-sizing:border-box;color:#ffffff;width:36px;height:36px;border-radius:var(--ikr-radius,6px);cursor:pointer;font-size:18px;display:flex;align-items:center;justify-content:center;line-height:1;}
  @media(hover:hover){.ikr-modal-nav:hover{opacity:0.85;}}
  .ikr-modal-nav-prev{left:10px;}
  .ikr-modal-nav-next{right:10px;}
  .ikr-modal-thumbs{position:absolute;bottom:12px;left:0;right:0;display:flex;justify-content:center;gap:6px;padding:0 12px;}
  .ikr-modal-thumb{width:52px;height:52px;object-fit:cover;border-radius:var(--ikr-radius,6px);cursor:pointer;border:2px solid transparent;opacity:0.7;}
  .ikr-modal-thumb-active{border-color:#fff;opacity:1;}
  .ikr-modal-close:focus-visible,.ikr-modal-close-mobile:focus-visible,.ikr-modal-nav:focus-visible,.ikr-modal-thumb:focus-visible{outline:2px solid #ffffff;outline-offset:2px;}
  .ikr-modal-right{flex:1;min-width:0;min-height:0;overflow-y:auto;overscroll-behavior:contain;-webkit-overflow-scrolling:touch;padding:0;display:flex;flex-direction:column;background:#ffffff;color:#111111;}
  /* Flex zincirinde her seviye min-width:0 olmazsa unbreakable string parent'\u0131 zorlar.
     scroll-content de flex column \u2192 child'lar\u0131 (modal-body vs.) shrink edebilsin diye
     burada da min-width:0 zorunlu. overflow-wrap:anywhere ancak shrink m\xFCmk\xFCnse i\u015F g\xF6r\xFCr. */
  .ikr-modal-scroll-content > *{min-width:0;}
  .ikr-modal-top-row{display:flex;align-items:center;justify-content:space-between;gap:12px;}
  .ikr-modal-stars{display:inline-flex;gap:2px;align-items:center;}
  .ikr-modal-stars .ikr-icon{width:var(--ikr-star-size,24px);height:var(--ikr-star-size,24px);}
  .ikr-modal-date{font-size:var(--ikr-review-date-size,12px);font-weight:400;color:var(--ikr-review-date,#5e5e5e);white-space:nowrap;flex-shrink:0;}
  /* Modal yorum item dikey ritm \u2014 base ile ayn\u0131 s\xF6zle\u015Fme. scroll-content
     uniform gap kullanmaz, her child kendi margin-top'unu token ile al\u0131r. */
  .ikr-modal-title{font-weight:600;font-size:var(--ikr-review-title-size,16px);color:var(--ikr-review-title,#111111);margin-top:var(--ikr-gap-normal);}
  .ikr-modal-author{font-size:var(--ikr-author-size,14px);font-weight:600;font-style:normal;color:var(--ikr-review-author,#111111);margin-top:var(--ikr-gap-normal);}
  .ikr-modal-scroll-content{padding:24px 24px 24px;display:flex;flex-direction:column;min-width:0;}
  .ikr-modal-body{font-size:var(--ikr-review-text-size,14px);font-weight:400;line-height:1.65;color:var(--ikr-review-body,#111111);margin-top:var(--ikr-gap-normal);}
  .ikr-modal-reply{margin-top:var(--ikr-gap-loose);padding:12px 16px;background:var(--ikr-reply-bg-color,#f9fafb);border-radius:var(--ikr-radius,6px);border-left:3px solid var(--ikr-reply-border,#747474);}
  .ikr-modal-reply-label{font-weight:600;font-size:var(--ikr-reply-name-size,13px);color:var(--ikr-reply-label,#111111);margin-bottom:4px;overflow-wrap:anywhere;}
  .ikr-modal-reply-text{font-size:var(--ikr-reply-text-size,13px);font-weight:400;color:var(--ikr-reply-text,#111111);line-height:1.6;}

  /* Responsive */
  @media(min-width:641px) and (max-width:800px){
    .ikr-modal-wrap{width:100%;max-width:640px;max-height:calc(100vh - 32px);max-height:calc(100svh - 32px);max-height:calc(100dvh - 32px);overflow-y:auto;overscroll-behavior:contain;-webkit-overflow-scrolling:touch;}
    .ikr-modal{flex-direction:column;height:auto;max-height:none;}
    .ikr-modal-left{flex:none;width:100%;height:420px;height:min(420px, 56vh);height:min(420px, 56svh);height:min(420px, 56dvh);}
    .ikr-modal-right{flex:none;width:100%;overflow-y:visible;}
    .ikr-modal-scroll-content{padding:20px 20px 32px;}
    .ikr-modal-close{display:none;}
    .ikr-modal-close-mobile{display:flex;}
  }
  @media(max-width:640px){
    .ikr-modal-overlay{padding:0;background:transparent;}
    .ikr-modal-wrap{position:fixed;inset:0;overflow-y:scroll;z-index:100000;width:100%;max-width:100%;height:100vh;height:100svh;height:100dvh;overscroll-behavior:contain;-webkit-overflow-scrolling:touch;background:rgba(0,0,0,0.50);}
    .ikr-modal{flex-direction:column;height:auto;min-height:100vh;min-height:100svh;min-height:100dvh;border-radius:0;box-shadow:none;overflow:hidden;max-height:none;}
    .ikr-modal-left{flex:none;width:100%;aspect-ratio:3/4;overflow:hidden;}
    .ikr-modal-right{overflow-y:visible;flex:none;width:100%;}
    .ikr-modal-scroll-content{padding:16px 16px 48px;}
    .ikr-modal-close{display:none;}
    .ikr-modal-close-mobile{display:flex;}
  }
  @media(max-width:600px){
    /* Mobile'da yan padding bagimsiz: summary ve review listesi ayri
       CSS degiskenleri uzerinden. Root frame padding 0 olur, her blok
       kendi yan bosluklarini verir.
       --ikr-pad-summary-mobile: summary bloklari (classic/split/compact/hero/minimal)
       --ikr-pad-review-mobile:  yorum listesi container'i (#ikas-reviews)
       Ileride admin panelinden degistirmek icin: settings -> CSS variable. */
    #ikas-reviews-widget{padding-left:0;padding-right:0;}
    /* Summary yan padding'i .ikr-summary mobile bloguna eklendi (--ikr-pad-summary-mobile) */
    /* Review layoutlari widget direct child \u2014 her item kendi yan padding'ini
       --ikr-pad-review-mobile uzerinden alir. #ikas-reviews container'ina
       padding vermek yerine item class'larina vermek gerek cunku review'lar
       widget'in child'i, #ikas-reviews icinde degil. */
    .ikr-review-card,
    .ikr-review-list,
    .ikr-review-gallery{
      padding-left:var(--ikr-pad-review-mobile);
      padding-right:var(--ikr-pad-review-mobile);
      box-sizing:border-box;
    }
    /* Yan padding --ikr-pad-summary-mobile uzerinden; top/bottom 16px sabit */
    .ikr-summary{padding:16px var(--ikr-pad-summary-mobile);gap:14px;--ikr-col-label:92px;--ikr-col-count:32px;}
    /* Widget basligi summary'nin disinda, widget direct child \u2014 kendi yan
       padding'ini ayni variable'dan alir (summary ile hizali kalsin). */
    .ikr-title{
      padding-left:var(--ikr-pad-summary-mobile);
      padding-right:var(--ikr-pad-summary-mobile);
      text-align:center;
    }
    /* Review item yan padding'i mobile'da --ikr-pad-review-mobile. Card
       (.ikr-review), list (.ikr-review-list) ve gallery (.ikr-review-gallery)
       kendi top/bottom padding'lerini koruyarak yan padding'i variable'dan alir.
       Shorthand kullanilmadigi icin her layout'un kendi kuralini ezmez. */
    .ikr-review,
    .ikr-review-list,
    .ikr-review-list.ikr-review-list--no-media,
    .ikr-review-gallery{
      padding-left:var(--ikr-pad-review-mobile);
      padding-right:var(--ikr-pad-review-mobile);
    }
    .ikr-review-top-left{flex-direction:column;align-items:flex-start;gap:4px;}
    /* Gallery \u2014 foto\u011Frafl\u0131 yorumlar strip'i mant\u0131\u011F\u0131: flex-wrap:nowrap +
       overflow-x:auto, thumb'lar flex-shrink:0 ile orjinal boyutta kal\u0131yor,
       s\u0131\u011Fmayanlar yatay scroll'da kayd\u0131r\u0131l\u0131yor. */
    .ikr-gallery{flex-wrap:nowrap;overflow-x:auto;padding-bottom:4px;scrollbar-width:none;}
    .ikr-gallery::-webkit-scrollbar{display:none;}
    .ikr-img{flex-shrink:0;}
  }
`;var $t=".product-name",Qt=".add-to-basket-modal",ei="h1.product-name",Ge=".single-product-container-main",$r=".single-product-product-name",ri=[".hero-image-banner-main",".hero-image-main",".home-slider-main",'[class*="hero-"]','[class*="banner-"]','[class*="slider-banner"]','[class*="marquee"]'].join(","),ti=[".category-products-main",".products-slider-main",".infinite-scroll-component",'[class*="product-list"]',".single-product-container-main",".product-block-container"].join(",");var rt={};Ee(rt,{meta:()=>Ma,render:()=>Oa});function qe(e){var r=e.ratingCounts,t=e.allCount,a=e.iconPair,i=e.currentRatingFilter,n=e.onFilterChange,s=document.createElement("div");s.className="ikr-summary-block ikr-summary-bars";for(var o=5;o>=1;o--){var d=r[o-1]||0,p=t>0?Math.round(d/t*100):0,u=i===o,c=document.createElement("div");c.className="ikr-bar-row"+(u?" ikr-bar-active":""),i&&!u&&(c.style.opacity="0.35");for(var l="",m=1;m<=5;m++){var f=m<=o;l+='<span class="ikr-bar-star ikr-icon '+(f?"ikr-bar-star-filled":"ikr-bar-star-empty")+'">'+(f?a.filled:a.empty)+"</span>"}c.innerHTML='<span class="ikr-bar-label">'+l+'</span><div class="ikr-bar-track"><div class="ikr-bar-fill" style="width:'+p+'%;"></div></div><span class="ikr-bar-count">('+d.toLocaleString("tr-TR")+")</span>",(function(k){c.onclick=function(){n(k)}})(o),s.appendChild(c)}return s}var ue=[],ii=!1;function Ta(e){for(var r=ue.length-1;r>=0;r--){var t=ue[r];t.trigger&&t.trigger.contains(e.target)||t.element&&t.element.contains(e.target)||t.close()}}function La(e){if(e.key==="Escape")for(var r=ue.length-1;r>=0;r--)ue[r].close()}function Aa(){ii||typeof document=="undefined"||(document.addEventListener("click",Ta,!0),document.addEventListener("keydown",La),ii=!0)}function yr(e){for(var r=0;r<ue.length;r++)ue[r]!==e&&ue[r].close()}function br(e){Aa();var r={trigger:e.trigger,element:e.element,close:e.close};return ue.push(r),function(){var a=ue.indexOf(r);a!==-1&&ue.splice(a,1)}}function te(e){var r=e.widget,t=e.currentOrderBy,a=e.currentHasImages,i=e.onWriteClick,n=e.onSortChange,s=document.createElement("div");s.className="ikr-summary-block ikr-summary-actions";var o=document.createElement("button");o.className="ikr-write-btn",o.textContent=I&&I.writeButtonText||"Yorum Yap",o.onclick=i,s.appendChild(o);var d=document.createElement("div");d.className="ikr-filter-wrap";var p=document.createElement("button");p.type="button",p.className="ikr-filter-btn",p.setAttribute("aria-label","Filtrele"),p.setAttribute("aria-haspopup","menu"),p.setAttribute("aria-expanded","false");var u=I&&I.filterIcon||"lines";p.innerHTML=Ur(u);var c=document.createElement("div");c.className="ikr-filter-menu",c.setAttribute("role","menu");var l=[["newest","En Yeni",!1],["highest","En Y\xFCksek Puan",!1],["lowest","En D\xFC\u015F\xFCk Puan",!1],["photos","Foto\u011Frafl\u0131",!0]];function m(v){var y=c.classList.contains("ikr-open");c.classList.remove("ikr-open"),p.classList.remove("ikr-filter-btn-active"),p.setAttribute("aria-expanded","false");var x=v&&(v.restoreFocus===!0||v.restoreFocus==="auto"&&or());if(y&&x)try{p.focus({preventScroll:!0})}catch(b){try{p.focus()}catch(g){}}}function f(){yr(k),c.classList.add("ikr-open"),p.classList.add("ikr-filter-btn-active"),p.setAttribute("aria-expanded","true");var v=c.querySelector(".ikr-filter-item-active")||c.querySelector(".ikr-filter-item");v&&requestAnimationFrame(function(){try{v.focus({preventScroll:!0})}catch(y){try{v.focus()}catch(x){}}})}l.forEach(function(v){var y=v[2],x=y?a:!a&&(t||"newest")===v[0],b=document.createElement("button");b.type="button",b.className="ikr-filter-item"+(x?" ikr-filter-item-active":""),b.setAttribute("role","menuitem"),b.textContent=v[1],b.onclick=function(){m({restoreFocus:"auto"}),n(v[0],y)},c.appendChild(b)}),p.onclick=function(){c.classList.contains("ikr-open")?m({restoreFocus:"auto"}):f()},d.addEventListener("keydown",function(v){v.key==="Escape"&&c.classList.contains("ikr-open")&&(v.stopPropagation(),m({restoreFocus:!0}))}),d.addEventListener("focusout",function(v){if(c.classList.contains("ikr-open")){var y=v.relatedTarget;y&&d.contains(y)||m()}});var k=br({trigger:d,element:c,close:m});return d.appendChild(p),d.appendChild(c),s.appendChild(d),s}function ai(e){var r=e&&e.onClose?e.onClose:function(){},t=e&&e.allowOutsideClose!==!1,a=document.createElement("div");a.className="ikr-fwizard-overlay",a.tabIndex=-1,a.setAttribute("role","dialog"),a.setAttribute("aria-modal","true"),a.setAttribute("aria-label","Yorum yapma formu");var i=document.createElement("div");i.className="ikr-fwizard",a.appendChild(i);var n=document.createElement("button");n.className="ikr-fwizard-close",n.type="button",n.setAttribute("aria-label","Kapat"),n.innerHTML='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',i.appendChild(n);var s=document.createElement("div");s.className="ikr-fwizard-content",i.appendChild(s);var o=!1,d=null,p=!1,u="",c="";function l(){var h=document.activeElement;return!h||h===document.body||h===document.documentElement?null:h}function m(h){if(!(!h||!document.contains(h)||typeof h.focus!="function"))try{h.focus({preventScroll:!0})}catch(A){try{h.focus()}catch(L){}}}function f(h){if(!h||h.disabled||h.getAttribute("aria-hidden")==="true")return!1;var A=window.getComputedStyle?window.getComputedStyle(h):null;return A&&(A.display==="none"||A.visibility==="hidden")?!1:!!(h.offsetWidth||h.offsetHeight||h.getClientRects().length)}function k(h){var A=["a[href]","button:not([disabled])","input:not([disabled])","select:not([disabled])","textarea:not([disabled])",'[tabindex]:not([tabindex="-1"])'].join(",");return Array.prototype.slice.call(h.querySelectorAll(A)).filter(f)}function v(){var h=k(s),A=k(a),L=h[0]||A[0]||a;m(L)}function y(h){if(h.key==="Tab"){var A=k(a);if(!A.length){h.preventDefault(),m(a);return}var L=A[0],B=A[A.length-1],H=document.activeElement;if(!a.contains(H)){h.preventDefault(),m(L);return}h.shiftKey&&H===L?(h.preventDefault(),m(B)):!h.shiftKey&&H===B&&(h.preventDefault(),m(L))}}function x(){var h=window.innerWidth-document.documentElement.clientWidth;u=document.body.style.overflow,c=document.body.style.paddingRight,document.body.style.overflow="hidden",h>0&&(document.body.style.paddingRight=h+"px")}function b(){document.body.style.overflow=u,document.body.style.paddingRight=c}function g(){o||(o=!0,document.removeEventListener("keydown",S),a.removeEventListener("click",z),n.removeEventListener("click",g),a.classList.remove("ikr-fwizard-open"),setTimeout(function(){a.parentNode&&a.parentNode.removeChild(a),b(),p&&m(d);try{r()}catch(h){}},200))}function S(h){if(h.key==="Escape"){g();return}y(h)}function z(h){h.target===a&&t&&g()}document.addEventListener("keydown",S),a.addEventListener("click",z),n.addEventListener("click",g);function C(h){d=l(),p=or(),h&&s.appendChild(h),document.body.appendChild(a),x(),requestAnimationFrame(function(){a.classList.add("ikr-fwizard-open"),v()})}var w=null,E=null;function T(h,A){if(A=A||"error",w){try{w.remove()}catch(L){}w=null}E&&(clearTimeout(E),E=null),w=document.createElement("div"),w.className="ikr-fwizard-toast ikr-fwizard-toast--"+A,w.textContent=h,i.appendChild(w),E=setTimeout(function(){w&&(w.classList.add("ikr-fwizard-toast--exit"),setTimeout(function(){if(w){try{w.remove()}catch(L){}w=null}},300))},4e3)}return{open:C,close:g,content:s,setAllowOutsideClose:function(h){t=!!h},setStepAttr:function(h){i.setAttribute("data-step",String(h))},focusFirstControl:v,showToast:T}}var ni=`
  /* Backdrop \u2014 viewport'u kaplar, modal kutusunu ortalar */
  .ikr-fwizard-overlay{
    position:fixed;
    inset:0;
    z-index:99999;
    display:flex;
    align-items:center;
    justify-content:center;
    padding:16px;
    background:var(--ikr-fwizard-overlay-bg, rgba(0,0,0,0.50));
    /* A\xE7\u0131l\u0131\u015F fade animasyonu */
    opacity:0;
    transition:opacity 0.2s ease;
  }
  .ikr-fwizard-overlay.ikr-fwizard-open{
    opacity:1;
  }

  /* Modal kutusu \u2014 680\xD7600, max 85vh */
  .ikr-fwizard{
    position:relative;
    width:100%;
    max-width:680px;
    height:600px;
    max-height:85vh;
    background:var(--ikr-fwizard-bg, #ffffff);
    color:var(--ikr-fwizard-text, rgb(17,17,17));
    border:none;
    border-radius:var(--ikr-radius,12px);
    display:flex;
    flex-direction:column;
    overflow:hidden;
    /* Scale kald\u0131r\u0131ld\u0131 \u2014 sayfa i\xE7eri\u011Finde sub-pixel kayma yarat\u0131yordu */
  }

  /* Close (X) butonu \u2014 sa\u011F \xFCst k\xF6\u015Fe */
  .ikr-fwizard-close{
    position:absolute;
    top:8px;
    right:8px;
    width:44px;
    height:44px;
    border-radius:var(--ikr-radius-sm,8px);
    border:none;
    background:transparent;
    color:var(--ikr-fwizard-close-text, #6b7280);
    cursor:pointer;
    font-size:18px;
    line-height:1;
    display:flex;
    align-items:center;
    justify-content:center;
    z-index:1;
    transition:background 0.15s, color 0.15s;
  }

  /* X Butonu G\xF6r\xFCn\xFCrl\xFCk Kurallar\u0131 (Desktop + Mobile) */
  .ikr-fwizard[data-step="1"] .ikr-fwizard-close,
  .ikr-fwizard[data-step="thanks"] .ikr-fwizard-close{
    display:flex;
  }
  .ikr-fwizard[data-step="2"] .ikr-fwizard-close,
  .ikr-fwizard[data-step="3"] .ikr-fwizard-close,
  .ikr-fwizard[data-step="4"] .ikr-fwizard-close{
    display:none;
  }

  @media(hover:hover){
    .ikr-fwizard-close:hover{
      background:var(--ikr-fwizard-close-hover-bg, rgba(0,0,0,0.05));
      color:var(--ikr-fwizard-text, #111111);
    }
  }

  /* \u0130\xE7erik konteyneri \u2014 wizard layout (step + footer) burada. */
  .ikr-fwizard-content{
    padding:0;
    overflow:hidden;
    flex:1 1 auto;
    display:flex;
    flex-direction:column;
    min-height:320px;
  }

  /* Wizard layout \u2014 step i\xE7eri\u011Fi + alttaki progress bar dikey */
  .ikr-fwizard-layout{
    display:flex;
    flex-direction:column;
    flex:1 1 auto;
    min-height:0;
  }

  /* Step i\xE7eri\u011Fi konteyneri \u2014 scroll burada */
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

  /* Step kart \u2014 her ad\u0131m\u0131n temel layout'u */
  .ikr-fwizard-step{
    width:100%;
    display:flex;
    flex-direction:column;
    align-items:center;
    gap:32px;
  }

  /* Step ge\xE7i\u015F animasyonlar\u0131 \u2014 Standart, belirgin ve s\xFCreyi optimize eden "Deep Fade & Slide" tasar\u0131m\u0131.
     Hem masa\xFCst\xFC hem mobil i\xE7in standart. Arka plan i\u015Flemlerine (upload vb.) zaman kazand\u0131r\u0131r. */
  .ikr-fwizard-step--enter{
    animation:ikrStepEnter 0.65s ease forwards;
    will-change:opacity;
  }
  .ikr-fwizard-step--exit{
    animation:ikrStepExit 0.3s ease forwards;
    will-change:opacity;
  }
  @keyframes ikrStepEnter{
    0%   { opacity:0; }
    100% { opacity:1; }
  }
  @keyframes ikrStepExit{
    0%   { opacity:1; }
    100% { opacity:0; }
  }


  /* Step ba\u015Fl\u0131\u011F\u0131 \u2014 varsay\u0131lan (step 1: y\u0131ld\u0131z) */
  .ikr-fwizard-step-title{
    font-size:18px;
    font-weight:500;
    color:var(--ikr-fwizard-text, rgb(17,17,17));
    line-height:1.3;
  }

  /* B\xFCy\xFCk ba\u015Fl\u0131k varyant\u0131 \u2014 step 2/3/4 ba\u015Fl\u0131klar\u0131 daha g\xFC\xE7l\xFC
     g\xF6r\xFCn\xFCm gerektirir. Mobile'da @media i\xE7inde 18px/700'e iner. */
  .ikr-fwizard-step-title--lg{
    font-size:26px;
    font-weight:700;
    line-height:1.25;
  }

  /* Step alt ba\u015Fl\u0131\u011F\u0131 \u2014 ba\u015Fl\u0131\u011F\u0131n hemen alt\u0131nda, daha s\xF6n\xFCk */
  .ikr-fwizard-step-subtitle{
    margin-top:-20px;
    font-size:16px;
    font-weight:400;
    color:var(--ikr-fwizard-secondary-text, #6b7280);
    line-height:1.4;
  }

  /* Te\u015Fekk\xFCr Ekran\u0131 \xD6zel (Extra Large) */
  .ikr-fwizard-thanks-title{
    font-size:38px !important;
    font-weight:700 !important;
    line-height:1.1;
  }
  .ikr-fwizard-thanks-subtitle{
    font-size:16px !important;
    margin-top:0 !important;
    font-weight:400;
  }
  .ikr-fwizard-step-thanks{
    justify-content:center;
    padding-bottom:40px;
    gap:12px !important;
  }

  /* \u2500\u2500\u2500 Step 2: Foto kart\u0131 \u2500\u2500\u2500 */
  .ikr-fwizard-photo-card{
    width:100%;
    max-width:420px;
    border:1px solid var(--ikr-fwizard-input-border, #AFAFAF);
    border-radius:var(--ikr-radius,12px);
    padding:12px;
    display:flex;
    flex-direction:column;
    align-items:stretch;
    gap:16px;
    box-sizing:border-box;
    transition:all 0.3s ease;
  }
  /* Kompakt mod: Foto\u011Fraflar yan yana, buton kare */
  .ikr-fwizard-photo-card--compact{
    flex-direction:row;
    flex-wrap:wrap;
    align-items:center;
    gap:10px;
  }
  .ikr-fwizard-photo-add{
    display:flex;
    align-items:center;
    justify-content:center;
    gap:10px;
    width:100%;
    padding:14px 20px;
    background:var(--ikr-fwizard-btn-bg, rgb(17,17,17));
    color:var(--ikr-fwizard-btn-text, #ffffff);
    border-radius:var(--ikr-radius-sm,8px);
    font-size:15px;
    font-weight:500;
    cursor:pointer;
    user-select:none;
    transition:all 0.2s;
    box-sizing:border-box;
    border:1px solid transparent;
  }
  /* Kompakt buton tasar\u0131m\u0131 */
  .ikr-fwizard-photo-card--compact .ikr-fwizard-photo-add{
    width:88px;
    height:88px;
    padding:0;
    background:var(--ikr-fwizard-bg, #f9f9f9);
    color:var(--ikr-fwizard-text, #000000);
    border:1px solid var(--ikr-fwizard-input-border, #AFAFAF);
    order:10; /* Listenin sonuna atar */
  }
  .ikr-fwizard-photo-add:hover{
    opacity:0.92;
  }
  .ikr-fwizard-photo-card--compact .ikr-fwizard-photo-add:hover{
    opacity:0.92;
  }
  .ikr-fwizard-photo-add--disabled{
    opacity:0.4;
    cursor:not-allowed;
    pointer-events:none;
  }
  .ikr-fwizard-photo-add svg{
    flex-shrink:0;
    width:20px;
    height:20px;
  }
  .ikr-fwizard-photo-card--compact .ikr-fwizard-photo-add span{
    display:none;
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
    border-radius:var(--ikr-radius-sm,8px);
    overflow:hidden;
    border:1px solid var(--ikr-fwizard-input-border, #AFAFAF);
  }
  .ikr-fwizard-photo-thumb img{
    width:100%;
    height:100%;
    object-fit:cover;
    display:block;
    pointer-events:none;
    -webkit-user-drag:none;
    user-select:none;
  }
  .ikr-fwizard-photo-loading{
    position:absolute;
    top:0;left:0;
    width:100%;height:100%;
    background:rgba(255,255,255,0.75);
    display:flex;
    align-items:center;
    justify-content:center;
    border-radius:var(--ikr-radius-sm,8px);
  }
  .ikr-upload-error {
    color: #ff3333;
    font-size: 13px;
    font-weight: 600;
    text-align: center;
    padding: 0 4px;
  }
  .ikr-fwizard-photo-remove{
    position:absolute;
    top:-6px;
    right:-6px;
    width:24px;
    height:24px;
    border-radius:50%;
    background:#fff;
    border:none;
    color:#000;
    font-size:14px;
    font-weight:bold;
    line-height:1;
    cursor:pointer;
    display:flex;
    align-items:center;
    justify-content:center;
    box-shadow:none;
    padding:0;
  }

  /* \u2500\u2500\u2500 Step 3: \u0130\xE7erik formu (ba\u015Fl\u0131k + textarea) \u2500\u2500\u2500 */
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
    border:1px solid var(--ikr-fwizard-input-border, #AFAFAF);
    border-radius:var(--ikr-radius-sm,8px);
    font-size:16px; /* iOS zoom bug'\u0131n\u0131 \xF6nlemek i\xE7in min 16px olmal\u0131 */
    font-family:inherit;
    color:var(--ikr-fwizard-input-text, var(--ikr-fwizard-text, rgb(17,17,17)));
    box-sizing:border-box;
    transition:border-color 0.15s;
  }
  /* Input ve textarea i\xE7in klavye odak g\xF6stergesi sadece native caret \u2014
     ekstra outline a\u015Fa\u011F\u0131da :focus i\xE7in kapat\u0131l\u0131yor. */
  .ikr-fwizard-input::placeholder,
  .ikr-fwizard-textarea::placeholder{
    color:var(--ikr-fwizard-placeholder, rgba(0,0,0,0.35));
  }
  .ikr-fwizard-textarea{
    resize:none;
    min-height:140px;
    line-height:1.5;
  }
  .ikr-fwizard-char-counter{
    display:none;
  }
  .ikr-fwizard-char-counter--max{
    color:#dc2626;
  }

  /* \u2500\u2500\u2500 Step 4: Hakk\u0131n\u0131zda (Ad + E-posta + Submit) \u2500\u2500\u2500 */
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
    font-size:14px;
    font-weight:600;
    color:var(--ikr-fwizard-secondary-text, #6b7280);
  }
  .ikr-fwizard-required{
    color:#dc2626;
    margin-left:2px;
  }
  .ikr-fwizard-notice{
    font-size:12px;
    line-height:1.5;
    color:var(--ikr-fwizard-secondary-text, #6b7280);
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
    background:var(--ikr-fwizard-btn-bg, rgb(17,17,17));
    color:var(--ikr-fwizard-btn-text, #ffffff);
    border:1px solid var(--ikr-fwizard-btn-border, rgb(17,17,17));
    border-radius:var(--ikr-radius-sm,8px);
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
    background:var(--ikr-fwizard-btn-disabled-bg, rgba(0,0,0,0.18));
    color:var(--ikr-fwizard-btn-disabled-text, rgba(255,255,255,0.85));
    border-color:var(--ikr-fwizard-btn-disabled-border, transparent);
    cursor:not-allowed;
  }



  /* \u2500\u2500\u2500 Step 1: Y\u0131ld\u0131z sat\u0131r\u0131 \u2500\u2500\u2500
     \u0130kon ve renk admin "Y\u0131ld\u0131z Stili"nden gelir:
       - SVG: getIconFromSettings (icons/index.js, currentSettings.reviewIcon)
       - Renk: --ikr-review-star-color (admin "Y\u0131ld\u0131z Rengi")
     Empty color uses --ikr-star-empty-color, shared with review and bar stars. */
  .ikr-fwizard-stars{
    display:inline-flex;
    gap:8px;
    align-items:center;
  }
  .ikr-fwizard-star{
    width:48px;
    height:48px;
    padding:0;
    border:none;
    background:transparent;
    cursor:pointer;
    color:var(--ikr-star-empty-color, #e5e7eb);
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

  /* \u2500\u2500\u2500 Footer: [Geri]  [progress]  [Atla|Sonraki] \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
     3-kolon grid: yan kolonlar 120px sabit, orta esnek.
       - Yan kolon geni\u015Fli\u011Fi step'ten ba\u011F\u0131ms\u0131z (her step'te ayn\u0131).
       - Buton i\xE7erikleri justify-self ile kolon kenarlar\u0131na yasl\u0131:
         Geri \u2192 start, Atla/Sonraki \u2192 end. B\xF6ylece buton geni\u015Fli\u011Fi
         k\xFC\xE7\xFCk olsa da konum sabit; her step'te ayn\u0131 X koordinat\u0131.
       - Orta kolon 1fr \u2192 progress pills do\u011Fal olarak ortalan\u0131r,
         absolute hile yok, butonlar\u0131n \xFCst\xFCne binmez. */
  .ikr-fwizard-footer{
    flex:0 0 auto;
    padding:16px;
    /* min-height: butonlar art\u0131k sabit 40px kutu, dikey padding 16px*2.
       Footer toplam 72px sabit \u2192 progress hi\xE7bir step'te dikey kaymaz. */
    min-height:72px;
    box-sizing:border-box;
    border-top:none;
    display:grid;
    grid-template-columns:auto 1fr auto;
    align-items:center;
    gap:16px;
  }
  .ikr-fwizard-footer-back{
    justify-self:start;
  }
  .ikr-fwizard-footer-next,
  .ikr-fwizard-footer-skip{
    justify-self:end;
  }
  .ikr-fwizard-footer-progress{
    justify-self:center;
    display:flex;
    align-items:center;
    gap:6px;
  }
  /* Step 1'de progress bar'\u0131 gizle (Desktop & Mobile) */
  .ikr-fwizard[data-step="1"] .ikr-fwizard-footer-progress{
    display:none;
  }
  /* CTA ve nav butonlar\u0131 \u2014 sabit width \xD7 height kutu, i\xE7erik flex
     center ile ortalan\u0131r. Step'ten step'e buton \u015Fekli birebir ayn\u0131
     kal\u0131r. Hiyerar\u015Fi: CTA dolu siyah, nav transparent. */
  .ikr-fwizard-cta-btn{
    background:var(--ikr-fwizard-btn-bg, rgb(17,17,17));
    color:var(--ikr-fwizard-btn-text, #ffffff);
    border:1px solid var(--ikr-fwizard-btn-border, rgb(17,17,17));
    border-radius:var(--ikr-radius-sm,8px);
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
    background:var(--ikr-fwizard-btn-disabled-bg, rgba(0,0,0,0.18));
    color:var(--ikr-fwizard-btn-disabled-text, rgba(255,255,255,0.85));
    border-color:var(--ikr-fwizard-btn-disabled-border, transparent);
    cursor:not-allowed;
  }
  .ikr-fwizard-cta-btn[hidden]{
    display:none;
  }
  .ikr-fwizard-progress-seg{
    flex:0 0 auto;
    width:80px;
    height:8px;
    border-radius:var(--ikr-radius-sm,8px);
    background:var(--ikr-fwizard-progress-bg, rgba(0,0,0,0.08));
    transition:background 0.2s;
  }
  .ikr-fwizard-progress-seg-active{
    background:var(--ikr-fwizard-progress-active, rgb(17,17,17));
  }
  /* Nav butonlar\u0131 (Geri / Atla) \u2014 CTA ile ayn\u0131 kutu (108\xD740), sadece
     arkaplan transparent. Hiyerar\u015Fi fill vs transparent ile, boyut
     ile de\u011Fil. Hover: sadece renk de\u011Fi\u015Fikli\u011Fi \u2014 background hover
     asimetrik g\xF6z\xFCkt\xFC\u011F\xFC i\xE7in kald\u0131r\u0131ld\u0131 (ok+metin kutuda farkl\u0131
     X koordinatlar\u0131nda, hover bg buton kutusu b\xFCy\xFCkl\xFC\u011F\xFCnde olunca
     metnin ortas\u0131nda de\u011Fil, kutunun ortas\u0131nda g\xF6r\xFCn\xFCr). */
  .ikr-fwizard-nav-btn{
    background:transparent;
    border:none;
    width:108px;
    height:40px;
    padding:0;
    color:var(--ikr-fwizard-btn-bg, rgb(17,17,17));
    font-size:15px;
    font-weight:600;
    line-height:1;
    cursor:pointer;
    display:inline-flex;
    align-items:center;
    justify-content:center;
    gap:6px;
    border-radius:var(--ikr-radius-sm,8px);
    font-family:inherit;
    box-sizing:border-box;
    transition:background 0.15s;
  }
  .ikr-fwizard-nav-btn:hover{
    background:var(--ikr-fwizard-nav-hover-bg, rgba(17,17,17,0.06));
  }
  .ikr-fwizard-nav-btn[hidden]{
    display:none;
  }

  .ikr-fwizard-close:focus-visible,
  .ikr-fwizard-star:focus-visible,
  .ikr-fwizard-photo-add:focus-visible,
  .ikr-fwizard-photo-remove:focus-visible,
  .ikr-fwizard-submit-btn:focus-visible,
  .ikr-fwizard-cta-btn:focus-visible,
  .ikr-fwizard-nav-btn:focus-visible{
    outline:3px solid var(--ikr-fwizard-focus-ring, rgba(17,17,17,0.42));
    outline-offset:3px;
  }

  /* Input ve textarea klavye oda\u011F\u0131 i\xE7in ek outline \xE7izilmez \u2014 caret zaten
     yeterli odak g\xF6stergesi. Border rengi sabit; a\u011F\u0131r halka mobilde de
     masa\xFCst\xFCnde de g\xF6rsel olarak yoruyordu. Sadece native caret kals\u0131n. */
  .ikr-fwizard-input:focus,
  .ikr-fwizard-textarea:focus{
    outline:none;
  }

  /* \u2500\u2500\u2500 Mobile d\xFCzenlemeleri \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
     Mobil yap\u0131:
       - Modal tam ekran (100dvh \xD7 100vw)
       - Step 1: sa\u011F-\xFCstte X butonu, progress gizli (\xFCst bo\u015F)
       - Step 2-4: X gizli, progress \xFCst kenara absolute
       - Butonlar her zaman altta (footer do\u011Fal yeri):
           sol: "Geri" yaz\u0131s\u0131 (ok ikonu gizli, sadece text)
           sa\u011F: "Atla" / "Sonraki" \u2014 desktop ile ayn\u0131
       - \u0130\xE7erik dikey ortada, header ve footer aras\u0131na padded
     DOM dokunulmaz, step state'i shell.setStepAttr ile data-step
     attribute'u olarak modal kutusuna i\u015Flenir. */
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

    /* X butonu ve Progress bar kurallar\u0131 global k\u0131s\u0131mda ve data-step ile y\xF6netiliyor */


    /* Progress bar \xFCst kenara absolute \u2014 sadece step 2-4'te g\xF6r\xFCn\xFCr */
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
    /* Step 1'de \xFCst padding'e gerek yok \u2014 X kendi position:absolute */
    .ikr-fwizard[data-step="1"] .ikr-fwizard-content{
      padding-top:0;
    }

    /* Footer butonlar\u0131 altta, do\u011Fal yerde. Geri = sadece "Geri" yaz\u0131s\u0131,
       ok ikonu gizli. Atla zaten yaz\u0131+ok (desktop ile ayn\u0131).
       Grid kolonlar\u0131 mobile'da auto/1fr/auto: yan kolonlar buton kadar,
       orta esnek. */
    .ikr-fwizard-footer{
      padding:20px;
      min-height:80px;
      grid-template-columns:auto 1fr auto;
    }
    .ikr-fwizard-footer-back > svg{
      display:none;
    }
    /* Sa\u011F slot butonu (Atla / Sonraki) grid item olarak kolonun sa\u011F
       ucuna yasl\u0131 dursun. Refactor sonras\u0131 eski .footer-right wrapper
       div'i kalkt\u0131, buton do\u011Frudan footer grid item \u2014 justify-self
       atamas\u0131 burada yap\u0131l\u0131r. */
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
    /* B\xFCy\xFCk ba\u015Fl\u0131k varyant\u0131 mobile'da k\xFC\xE7\xFCl\xFCr: 26 \u2192 18, weight korunur */
    .ikr-fwizard-step-title--lg{
      font-size:20px;
    }
    .ikr-fwizard-star{
      width:48px;
      height:48px;
    }
    .ikr-fwizard-stars{
      gap:8px;
    }
  }

  /* \u2500\u2500\u2500 Toast bildirim \xE7ubu\u011Fu \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
  .ikr-fwizard-toast{
    position:absolute;
    top:12px;
    left:50%;
    transform:translateX(-50%) translateY(-100%);
    z-index:9999;
    padding:6px 14px;
    border-radius:8px;
    font-size:14px;
    font-weight:500;
    line-height:1.4;
    white-space:nowrap;
    pointer-events:none;
    opacity:0;
    animation:ikrToastEnter 0.35s cubic-bezier(0.21,1.02,0.73,1) forwards;
    box-shadow:rgba(0,0,0,0.1) 0px 3px 10px 0px, rgba(0,0,0,0.05) 0px 3px 3px 0px;
  }
  .ikr-fwizard-toast--error{
    background:rgb(186,26,26);
    color:#ffffff;
  }
  .ikr-fwizard-toast--exit{
    animation:ikrToastExit 0.3s ease forwards;
  }
  @keyframes ikrToastEnter{
    0%   { opacity:0; transform:translateX(-50%) translateY(-100%); }
    100% { opacity:1; transform:translateX(-50%) translateY(0); }
  }
  @keyframes ikrToastExit{
    0%   { opacity:1; transform:translateX(-50%) translateY(0); }
    100% { opacity:0; transform:translateX(-50%) translateY(-100%); }
  }
`;var Qr=4;function Ue(e,r){if(!r)return!1;switch(e){case 1:return r.rating>0;case 2:return!0;case 3:return!!(r.comment&&r.comment.trim().length>0);case 4:return!!(r.author&&r.author.trim().length>0);default:return!0}}function oi(e){e=e||{};var r=[],t={currentStep:1,rating:0,title:"",comment:"",author:"",email:"",images:[],pendingImages:[],fingerprints:[],productId:e.productId||"",productName:e.productName||""};function a(){r.forEach(function(i){try{i(t)}catch(n){}})}return{get:function(){return t},set:function(i){Object.assign(t,i),a()},goNext:function(){t.currentStep<Qr&&(t.currentStep+=1,a())},goBack:function(){t.currentStep>1&&(t.currentStep-=1,a())},onChange:function(i){return r.push(i),function(){r=r.filter(function(n){return n!==i})}}}}var Ia='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6"/></svg>';function li(e){e=e||{};var r=e.skippableSteps||[],t=e.nextableSteps||[],a=e.onBack||function(){},i=e.onSkip||function(){},n=e.onNext||function(){},s=document.createElement("div");s.className="ikr-fwizard-footer";var o=document.createElement("button");o.type="button",o.className="ikr-fwizard-nav-btn ikr-fwizard-footer-back",o.setAttribute("aria-label","Geri"),o.innerHTML=Ia+"<span>Geri</span>",o.addEventListener("click",function(){a()}),s.appendChild(o);var d=document.createElement("div");d.className="ikr-fwizard-footer-progress";for(var p=[],u=0;u<Qr;u++){var c=document.createElement("span");c.className="ikr-fwizard-progress-seg",d.appendChild(c),p.push(c)}s.appendChild(d);var l=document.createElement("button");l.type="button";var m=null;function f(v){m&&l.removeEventListener("click",m),m=v,v&&l.addEventListener("click",v)}s.appendChild(l);function k(v,y){var x=r.indexOf(v)!==-1,b=t.indexOf(v)!==-1,g=y&&(y.images&&y.images.length>0||y.pendingImages&&y.pendingImages.length>0);if(x)v===2&&g?(l.className="ikr-fwizard-cta-btn ikr-fwizard-footer-next",l.setAttribute("aria-label","Devam Et"),l.innerHTML="Devam Et",f(function(){n()})):(l.className="ikr-fwizard-nav-btn ikr-fwizard-footer-skip",l.setAttribute("aria-label","Atla"),l.innerHTML="<span>Atla</span>",f(function(){i()})),l.disabled=!1,l.classList.remove("ikr-fwizard-cta-btn--disabled"),l.style.visibility="",l.tabIndex=0;else if(b){l.className="ikr-fwizard-cta-btn ikr-fwizard-footer-next",l.setAttribute("aria-label","Sonraki"),l.innerHTML="Sonraki",l.style.visibility="",l.tabIndex=0;var S=Ue(v,y);l.disabled=!S,l.classList.toggle("ikr-fwizard-cta-btn--disabled",!S),f(function(){l.disabled||n()})}else l.className="ikr-fwizard-nav-btn ikr-fwizard-footer-skip",l.innerHTML="",l.style.visibility="hidden",l.tabIndex=-1,l.disabled=!0,f(null)}return{el:s,update:function(v,y){p.forEach(function(b,g){g+1<=v?b.classList.add("ikr-fwizard-progress-seg-active"):b.classList.remove("ikr-fwizard-progress-seg-active")});var x=v<=1;o.style.visibility=x?"hidden":"",o.style.pointerEvents=x?"none":"",o.tabIndex=x?-1:0,k(v,y)},setNextDisabled:function(v){l.classList.contains("ikr-fwizard-cta-btn")&&(l.disabled=!!v,l.classList.toggle("ikr-fwizard-cta-btn--disabled",!!v))},setThanksState:function(v){o.style.visibility="hidden",d.style.visibility="hidden",l.className="ikr-fwizard-cta-btn ikr-fwizard-footer-next",l.setAttribute("aria-label","Devam Et"),l.innerHTML="Devam Et",l.style.visibility="",l.disabled=!1,l.classList.remove("ikr-fwizard-cta-btn--disabled"),f(v)}}}function si(e,r){r=r||{};var t=document.createElement("div");t.className="ikr-fwizard-step ikr-fwizard-step-rating";var a=!1,i=document.createElement("div");i.className="ikr-fwizard-step-title",i.textContent="Bu \xFCr\xFCn\xFC nas\u0131l de\u011Ferlendirirsiniz?",t.appendChild(i);var n=document.createElement("div");n.className="ikr-fwizard-stars",n.setAttribute("role","radiogroup"),n.setAttribute("aria-label","Y\u0131ld\u0131z puan\u0131");var s=Ae(I||{}),o=[];function d(c){o.forEach(function(l,m){var f=m<c;l.classList.toggle("ikr-fwizard-star-active",f),l.setAttribute("aria-checked",m+1===c?"true":"false"),l.innerHTML=f?s.filled:s.empty})}for(var p=1;p<=5;p++)(function(c){var l=document.createElement("button");l.type="button",l.className="ikr-fwizard-star",l.setAttribute("role","radio"),l.setAttribute("aria-label",c+" y\u0131ld\u0131z"),l.innerHTML=s.empty,l.addEventListener("mouseenter",function(){d(c)}),l.addEventListener("mouseleave",function(){d(e.get().rating)}),l.addEventListener("click",function(){a||(a=!0,e.set({rating:c}),d(c),setTimeout(function(){var m=!r.canNavigate||r.canNavigate();m&&e.goNext()},400))}),o.push(l),n.appendChild(l)})(p);d(e.get().rating);var u=function(c){var l=c&&c.detail&&c.detail.settings;s=Ae(l||I||{}),d(e.get().rating)};return window.addEventListener("IKR_SETTINGS_UPDATED_PREVIEW",u),t.appendChild(n),{el:t,destroy:function(){window.removeEventListener("IKR_SETTINGS_UPDATED_PREVIEW",u)}}}var di=3,Pa=10*1024*1024;function ci(e,r){r=r||{};var t=!1,a=document.createElement("div");a.className="ikr-fwizard-step ikr-fwizard-step-photos";var i=document.createElement("div");i.className="ikr-fwizard-step-title ikr-fwizard-step-title--lg",i.textContent="Foto\u011Frafl\u0131 de\u011Ferlendirme",a.appendChild(i);var n=document.createElement("div");n.className="ikr-fwizard-step-subtitle",n.textContent="Foto\u011Fraf ekleyebilirsiniz.",a.appendChild(n);var s=document.createElement("div");s.className="ikr-fwizard-photo-card";var o=document.createElement("button");o.type="button",o.className="ikr-fwizard-photo-add",o.setAttribute("aria-label","Foto\u011Fraf ekle"),o.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg><span>Foto\u011Fraf Ekle</span>';var d=document.createElement("input");d.type="file",d.accept="image/*",d.multiple=!0,d.style.display="none",s.appendChild(o),s.appendChild(d);var p=document.createElement("div");p.className="ikr-fwizard-photo-previews",p.setAttribute("aria-live","polite"),s.appendChild(p),a.appendChild(s);var u=r.blobMap||{},c=r.urlToFinger||{};function l(){if(!t){var b=e.get().images||[],g=e.get().pendingImages||[],S=b.map(function(z){return{url:z,isPending:!1}}).concat(g.map(function(z){return{url:z.url,file:z.file,isPending:!0,error:z.error}}));p.innerHTML="",S.forEach(function(z){var C=u[z.url]||z.url,w=m(z,C);p.appendChild(w)}),y()}}function m(b,g){var S=document.createElement("div");S.className="ikr-fwizard-photo-thumb";var z=document.createElement("img");z.src=g,z.alt="",z.style.cssText="width:100%; height:100%; object-fit:cover; display:block; pointer-events:none; -webkit-user-drag:none; user-select:none;",S.appendChild(z);var C=document.createElement("div");C.className="ikr-fwizard-photo-loading",C.style.display="none",S.appendChild(C);var w=document.createElement("button");return w.type="button",w.className="ikr-fwizard-photo-remove",w.innerHTML="&#x2715;",S.appendChild(w),f(S,b,g),S}function f(b,g,S){var z=b.querySelector("img");z.src!==S&&(z.src=S);var C=b.querySelector(".ikr-fwizard-photo-loading");g.isPending&&g.error?(C.style.display="flex",C.innerHTML='<span class="ikr-upload-error">\u2717 '+g.error+"</span>"):C.style.display="none";var w=b.querySelector(".ikr-fwizard-photo-remove");w.onclick=function(){var E=c[g.url]||(g.file?g.file.name+"_"+g.file.size:null);if(g.url.startsWith("blob:")&&URL.revokeObjectURL(g.url),E){var T=(e.get().fingerprints||[]).filter(function(L){return L!==E});e.set({fingerprints:T})}if(g.isPending){var h=(e.get().pendingImages||[]).filter(function(L){return L.url!==g.url});e.set({pendingImages:h})}else{var A=(e.get().images||[]).filter(function(L){return L!==g.url});e.set({images:A})}}}var k='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>',v='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>';function y(){var b=(e.get().images||[]).length,g=(e.get().pendingImages||[]).length,S=b+g,z=S>=di;S>0?(s.classList.add("ikr-fwizard-photo-card--compact"),o.innerHTML=v):(s.classList.remove("ikr-fwizard-photo-card--compact"),o.innerHTML=k+"<span>Foto\u011Fraf Ekle</span>"),z?(o.style.display="none",o.disabled=!0,d.disabled=!0):(o.style.display="flex",o.disabled=!1,d.disabled=!1,o.classList.remove("ikr-fwizard-photo-add--disabled"))}o.addEventListener("click",function(){d.disabled||d.click()}),d.onchange=async function(b){var g=(e.get().images||[]).length+(e.get().pendingImages||[]).length,S=Array.from(b.target.files).slice(0,di-g);d.value="";var z=(e.get().pendingImages||[]).length,C=e.get().images||[],w=C.length;if(S.length!==0){for(var E=[],T=[],h=0;h<S.length;h++){var A=S[h],L=A.name+"_"+A.size,B=(e.get().fingerprints||[]).some(function(F){return F===L})||E.some(function(F){return F.file.name+"_"+F.file.size===L});if(B){console.log("[ikr] Duplicate file detected, skipping:",A.name);continue}if(A.size>Pa){var H="10MB'dan daha b\xFCy\xFCk foto\u011Fraflar\u0131 y\xFCkleyemezsin.";r.showToast?r.showToast(H,"error"):alert(H);continue}var J=URL.createObjectURL(A);c[J]=L,E.push({url:J,file:A,error:null}),T.push({url:J,file:A});var fe=(e.get().fingerprints||[]).slice();fe.push(L),e.set({fingerprints:fe})}if(E.length!==0){var ve=(e.get().pendingImages||[]).concat(E),$=async function(){for(var F=0;F<T.length;F++){var ke=T[F],ge=ke.file,W=ke.url;if(typeof window!="undefined"&&window.__ikasPreviewMode){var Se=(e.get().pendingImages||[]).filter(function(K){return K.url!==W}),He=(e.get().images||[]).slice();He.push(W),e.set({pendingImages:Se,images:He});continue}try{var he=await ee(V+"/api/public/upload/sign",{method:"POST"});if(!he.ok)throw he.status===429?new Error("rate_limit"):new Error("sign failed");var ie=await he.json(),j=new FormData;j.append("file",ge),j.append("api_key",ie.api_key),j.append("timestamp",ie.timestamp),j.append("signature",ie.signature),j.append("folder","review_images");var Ke=await fetch("https://api.cloudinary.com/v1_1/"+ie.cloud_name+"/image/upload",{method:"POST",body:j}),ae=await Ke.json();if(ae.secure_url&&Kr(ae.secure_url)){var Pe=(e.get().pendingImages||[]).some(function(K){return K.url===W});if(!Pe){console.log("[ikr] Upload finished but image was already deleted by user. Aborting state update.");return}u[ae.secure_url]=W,c[ae.secure_url]=c[W];var ye=(e.get().pendingImages||[]).filter(function(K){return K.url!==W}),re=(e.get().images||[]).slice();re.push(ae.secure_url),e.set({pendingImages:ye,images:re});try{ee(V+"/api/public/upload/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({secureUrl:ae.secure_url})}).catch(function(){})}catch(K){}}else throw new Error("invalid image url")}catch(K){console.error("[ikr] Image upload failed:",K);var ne=K.message==="rate_limit"?"\xC7ok fazla deneme. Bekleyin.":"Y\xFCkleme ba\u015Far\u0131s\u0131z.";r.showToast&&r.showToast(ne,"error");var _e=(e.get().pendingImages||[]).map(function(R){return R.url===W?{url:R.url,file:R.file,error:ne}:R});e.set({pendingImages:_e})}}};if(w===0&&z===0){t=!0;var U=!r.canNavigate||r.canNavigate();U&&e.goNext()}e.set({pendingImages:ve}),$()}}};var x=e.onChange(l);return l(),{el:a,destroy:function(){t=!0,d.onchange=null,x&&x()}}}var et=2e3,_a=60;function pi(e,r){r=r||{};var t=r.onValidityChange||function(){},a=document.createElement("div");a.className="ikr-fwizard-step ikr-fwizard-step-content";var i=document.createElement("div");i.className="ikr-fwizard-step-title ikr-fwizard-step-title--lg",i.textContent="Deneyiminizi anlat\u0131n",a.appendChild(i);var n=document.createElement("div");n.className="ikr-fwizard-content-form";var s=document.createElement("input");s.type="text",s.className="ikr-fwizard-input",s.placeholder="K\u0131sa bir ba\u015Fl\u0131k (opsiyonel)",s.maxLength=_a,s.setAttribute("aria-label","Yorum ba\u015Fl\u0131\u011F\u0131"),s.value=e.get().title||"",s.addEventListener("input",function(){e.set({title:s.value})}),n.appendChild(s);var o=document.createElement("textarea");o.className="ikr-fwizard-textarea",o.placeholder="Deneyiminizi anlat\u0131n\u2026",o.maxLength=et,o.rows=6,o.setAttribute("aria-label","Yorum"),o.value=e.get().comment||"",n.appendChild(o);var d=document.createElement("div");d.className="ikr-fwizard-char-counter",d.setAttribute("aria-live","polite"),n.appendChild(d);function p(){var c=o.value.length;d.textContent=c+"/"+et,d.classList.toggle("ikr-fwizard-char-counter--max",c>=et)}function u(){return Ue(3,e.get())}return o.addEventListener("input",function(){e.set({comment:o.value}),p(),t(u())}),a.appendChild(n),p(),setTimeout(function(){t(u())},0),{el:a,destroy:function(){}}}var Na=40;function ui(e,r){r=r||{};var t=r.onValidityChange||function(){},a=r.onSuccess||function(){},i=document.createElement("div");i.className="ikr-fwizard-step ikr-fwizard-step-author";var n=document.createElement("div");n.className="ikr-fwizard-step-title ikr-fwizard-step-title--lg",n.textContent="Hakk\u0131n\u0131zda",i.appendChild(n);var s=document.createElement("div");s.className="ikr-fwizard-author-form";var o=document.createElement("div");o.className="ikr-fwizard-field";var d=document.createElement("label");d.className="ikr-fwizard-label",d.innerHTML='Ad\u0131n\u0131z <span class="ikr-fwizard-required" aria-hidden="true">*</span>';var p=document.createElement("input");p.type="text",p.className="ikr-fwizard-input",p.maxLength=Na,p.setAttribute("aria-required","true"),p.value=e.get().author||"",o.appendChild(d),o.appendChild(p),s.appendChild(o);var u=document.createElement("div");u.className="ikr-fwizard-field";var c=document.createElement("label");c.className="ikr-fwizard-label",c.textContent="E-posta (opsiyonel)";var l=document.createElement("input");l.type="email",l.className="ikr-fwizard-input",l.setAttribute("autocomplete","email"),l.value=e.get().email||"",u.appendChild(c),u.appendChild(l),s.appendChild(u);var m=document.createElement("div");m.className="ikr-fwizard-notice",m.textContent="G\xF6nder'e t\u0131klayarak yorumumun \xFCr\xFCn sayfas\u0131nda herkese a\xE7\u0131k \u015Fekilde yay\u0131nlanaca\u011F\u0131n\u0131 kabul ediyorum.",s.appendChild(m);var f=document.createElement("div");f.className="ikr-fwizard-msg",f.setAttribute("role","alert"),f.setAttribute("aria-live","assertive"),s.appendChild(f);var k=document.createElement("button");k.type="button",k.className="ikr-fwizard-submit-btn",k.textContent="G\xF6nder",s.appendChild(k),i.appendChild(s);function v(){return Ue(4,e.get())}function y(){var b=!v(),g=(e.get().pendingImages||[]).length,S=g>0;S?(k.disabled=!0,k.classList.add("ikr-fwizard-submit-btn--disabled"),k.textContent="Foto\u011Fraflar Y\xFCkleniyor..."):(k.disabled=b,k.classList.toggle("ikr-fwizard-submit-btn--disabled",b),k.textContent="G\xF6nder")}p.addEventListener("input",function(){e.set({author:p.value}),y(),t(v())}),l.addEventListener("input",function(){e.set({email:l.value})}),y(),setTimeout(function(){t(v())},0),k.onclick=async function(){if(!k.disabled){var b=e.get(),g=(b.author||"").trim(),S=(b.comment||"").trim();if(l.value.trim()&&!l.checkValidity()){l.reportValidity();return}if(!g){f.innerHTML='<div class="ikr-fwizard-msg-error">Gerekli alan</div>';return}if(!b.rating){f.innerHTML='<div class="ikr-fwizard-msg-error">L\xFCtfen bir y\u0131ld\u0131z se\xE7in.</div>';return}k.disabled=!0,k.classList.add("ikr-fwizard-submit-btn--disabled");var z=k.textContent;if(k.textContent="G\xF6nderiliyor\u2026",f.innerHTML="",typeof window!="undefined"&&window.__ikasPreviewMode){setTimeout(function(){a()},600);return}try{var C=Y(window.location.href),w=b.productName||(document.querySelector("h1")?document.querySelector("h1").innerText.trim():null),E=await ee(V+"/api/public/reviews",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({storeId:D,productId:b.productId||null,slug:C||null,productName:w,author:g,title:(b.title||"").trim()||null,comment:S||null,rating:b.rating,images:b.images||[]})},15e3);if(E.ok)a();else{var T=await E.json().catch(function(){return{}});throw new Error(T.error||"Yorum kaydedilemedi.")}}catch(L){var h=L&&(L.name==="AbortError"||/signal/i.test(L.message||"")),A=h?"Ba\u011Flant\u0131 yava\u015F, l\xFCtfen tekrar deneyin.":L.message||"Yorum g\xF6nderilemedi.";r.showToast?r.showToast(A,"error"):f.innerHTML='<div class="ikr-fwizard-msg-error">'+A+"</div>",k.disabled=!1,k.classList.remove("ikr-fwizard-submit-btn--disabled"),k.textContent=z}}};var x=e.onChange(y);return{el:i,destroy:function(){k.onclick=null,x&&x()}}}var mi=!1;function Ra(){if(!mi){var e=document.createElement("style");e.setAttribute("data-ikr-fwizard",""),e.textContent=ni,document.head.appendChild(e),mi=!0}}function Ba(e,r,t){if(t=t||{},e===1)return si(r,{canNavigate:t.canNavigate});if(e===2)return ci(r,{canNavigate:t.canNavigate,blobMap:t.blobMap,urlToFinger:t.urlToFinger,showToast:t.showToast});if(e===3)return pi(r,{onValidityChange:t.onValidityChange});if(e===4)return ui(r,{onValidityChange:t.onValidityChange,onSuccess:t.onSuccess,showToast:t.showToast});var a=document.createElement("div");return a.className="ikr-fwizard-step ikr-fwizard-step-placeholder",{el:a,destroy:function(){}}}function fi(){var e=document.createElement("div");return e.className="ikr-fwizard-step ikr-fwizard-step-thanks",e.innerHTML='<div class="ikr-fwizard-step-title ikr-fwizard-thanks-title">Te\u015Fekk\xFCrler</div><div class="ikr-fwizard-step-subtitle ikr-fwizard-thanks-subtitle">De\u011Ferlendirmeniz al\u0131nd\u0131.</div>',e}function vi(e){e=e||{},Ra();var r=oi({productId:e.productId,productName:e.productName}),t={},a={},i=ai({onClose:function(){window.removeEventListener("popstate",s),window.history.state&&window.history.state.ikrReviewModal&&window.history.back(),Object.keys(t).forEach(function(z){var C=t[z];C&&C.startsWith("blob:")&&URL.revokeObjectURL(C)}),e.onClose&&e.onClose()},allowOutsideClose:!1}),n={ikrReviewModal:!0};window.history.pushState(n,null,"");var s=function(z){i&&i.close&&i.close()};window.addEventListener("popstate",s);var o=document.createElement("div");o.className="ikr-fwizard-step-wrap";var d=li({skippableSteps:[2],nextableSteps:[3],onBack:function(){c==="idle"&&r.goBack()},onSkip:function(){c==="idle"&&r.goNext()},onNext:function(){c==="idle"&&r.goNext()}}),p=document.createElement("div");p.className="ikr-fwizard-layout",p.appendChild(o),p.appendChild(d.el);var u=null,c="idle",l=null,m=!0,f=null;function k(z,C){o.innerHTML="";var w=Ba(z,r,{canNavigate:function(){return c==="idle"},blobMap:t,urlToFinger:a,onValidityChange:function(h){d.setNextDisabled(!h)},onSuccess:y,showToast:i.showToast});if(u=w,d.update(z,r.get()),C){c="entering",w.el.classList.add("ikr-fwizard-step--enter");var E=null,T=function(){E&&clearTimeout(E),w.el.removeEventListener("animationend",T),w.el.classList.remove("ikr-fwizard-step--enter"),c="idle",l!==null&&x()};w.el.addEventListener("animationend",T),E=setTimeout(T,700)}else c="idle";o.appendChild(w.el),i.setStepAttr&&i.setStepAttr(z),z===3&&d.setNextDisabled(!0)}var v=!1;function y(){if(!v){if(v=!0,!u){o.innerHTML="";var z=fi();z.classList.add("ikr-fwizard-step--enter"),o.appendChild(z),i.setStepAttr("thanks"),d.setThanksState(i.close);return}var C=u;c="exiting",C.el.classList.add("ikr-fwizard-step--exit");var w=function(){if(f&&clearTimeout(f),C.el.removeEventListener("animationend",w),C.destroy)try{C.destroy()}catch(T){}u===C&&(u=null),o.innerHTML="";var E=fi();E.classList.add("ikr-fwizard-step--enter"),o.appendChild(E),i.setStepAttr("thanks"),d.setThanksState(i.close),c="idle"};C.el.addEventListener("animationend",w),f=setTimeout(w,300)}}function x(){var z=r.get().currentStep;if(c!=="idle"){l=z;return}if(!u){var C=!m;m=!1,k(z,C);return}var w=u;c="exiting",w.el.classList.add("ikr-fwizard-step--exit");var E=function(){if(f&&clearTimeout(f),w.el.removeEventListener("animationend",E),w.destroy)try{w.destroy()}catch(h){}if(u===w){o.innerHTML="",u=null;var T=l!==null?l:r.get().currentStep;l=null,k(T,!0),c="idle"}};w.el.addEventListener("animationend",E),f=setTimeout(E,350)}x();var b=r.get().currentStep,g=r.onChange(function(z){z.currentStep!==b?(b=z.currentStep,x()):d.update(z.currentStep,z)}),S=i.close;return i.close=function(){g&&g(),typeof f!="undefined"&&f&&clearTimeout(f),S()},i.open(p),{close:i.close}}function G(){vi({productId:Z||"",productName:be||""})}var Ma={id:"classic",name:"Klasik (A\xE7\u0131k)"};function Oa(e){var r=e.widget,t=e.data,a=e.settings,i=e.iconPair,n=e.allCount,s=e.ratingCounts,o=e.avgRatingVal,d=e.currentRatingFilter,p=e.currentOrderBy,u=e.currentHasImages,c=e.onFilterChange,l=e.onSortChange,m=document.createElement("div");m.className="ikr-summary";var f=(s[3]||0)+(s[4]||0),k=n>0?Math.round(f/n*100):0,v=document.createElement("div");v.className="ikr-summary-block ikr-summary-avg",v.innerHTML='<span class="ikr-avg-star ikr-icon">'+i.filled+'</span><span class="ikr-avg-num">'+o+"</span>",m.appendChild(v);var y=document.createElement("div");if(y.className="ikr-summary-block ikr-summary-count",y.textContent=n.toLocaleString("tr-TR")+" Yorum",m.appendChild(y),a.showRecommendation!==!1&&k>0){var x=document.createElement("div");x.className="ikr-summary-block ikr-summary-recommend",x.innerHTML='<span class="ikr-recommend-pct">%'+k+"</span> bu \xFCr\xFCn\xFC tavsiye ediyor",m.appendChild(x)}return m.appendChild(qe({ratingCounts:s,allCount:n,iconPair:i,currentRatingFilter:d,onFilterChange:c})),m.appendChild(te({widget:r,currentOrderBy:p,currentHasImages:u,onWriteClick:G,onSortChange:l})),m}var tt={};Ee(tt,{css:()=>Fa,meta:()=>Ha,render:()=>Da});var ki=`
  /* Compact layout ba\u015Fl\u0131\u011F\u0131 sola hizal\u0131 \u2014 t\xFCm layout'larda tutarl\u0131 */
  .ikr-title-compact{text-align:left;}

  .ikr-compact-header{
    display:flex;align-items:center;gap:12px;
    width:100%;padding:0;
  }

  /* Trigger wrap \u2014 popover anchor'\u0131 (position:relative parent) */
  .ikr-compact-trigger-wrap{
    position:relative;flex:1 1 auto;min-width:0;display:flex;align-items:center;
  }

  .ikr-compact-trigger{
    display:flex;align-items:center;gap:10px;
    background:transparent;border:0;padding:0;cursor:pointer;
    font-family:inherit;color:inherit;flex:0 0 auto;
  }
  .ikr-compact-trigger-stars{display:inline-flex;gap:2px;flex-shrink:0;}
  /* Compact trigger yildizlari kendi degiskeni; global bar-label-size'i etkilemez.
     Fallback bar-label-size, eski davranista geri donus icin. */
  .ikr-compact-trigger-stars .ikr-icon,
  .ikr-compact-trigger-stars .ikr-star{
    width:var(--ikr-compact-star-size,var(--ikr-bar-label-size,20px));
    height:var(--ikr-compact-star-size,var(--ikr-bar-label-size,20px));
    color:var(--ikr-review-star-color,#f59e0b);line-height:1;
  }
  .ikr-compact-trigger-text{
    font-size:var(--ikr-compact-count-size,16px);
    color:var(--ikr-header-count,var(--ikr-text,rgba(0,0,0,1)));
    font-weight:500;white-space:nowrap;
  }
  .ikr-compact-chevron{
    display:inline-flex;align-items:center;justify-content:center;
    width:14px;height:14px;flex-shrink:0;
    color:var(--ikr-header-count,var(--ikr-text,rgba(0,0,0,1)));
    transition:transform 200ms cubic-bezier(0.4,0,0.2,1);
  }
  .ikr-compact-trigger[aria-expanded="true"] .ikr-compact-chevron{transform:rotate(180deg);}

  .ikr-compact-actions-slot{
    flex:0 0 auto;display:flex;align-items:center;gap:var(--ikr-col-gap,8px);
  }
  /* filter-wrap basis'i (--ikr-col-count, 60px) global tanimli \u2014 diger summary
     layoutlariyla ayni buton arasi gorsel gap icin override'i kaldirdik. */
  .ikr-compact-actions-slot .ikr-write-btn{flex:0 0 auto;}

  /* Mobile-only write sat\u0131r\u0131 */
  .ikr-compact-write-row{display:none;}
  .ikr-compact-write-row .ikr-write-btn{flex:1 1 auto;justify-content:center;}

  /* \u2500\u2500\u2500 POPOVER \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
     Premium tarzda: scale(0.7) translateY(-20px) \u2192 scale(1), opacity 0 \u2192 1.
     200ms ease-in-out, forwards (son state'te kal\u0131r). */
  @keyframes ikr-grow-out {
    0%   { opacity: 0; transform: scale(0.7) translateY(-20px); }
    100% { opacity: 1; transform: scale(1) translateY(0); }
  }
  .ikr-compact-panel{
    position:absolute;top:calc(100% + 8px);left:0;
    z-index:1000;
    /* Bar chart 340px + panel-inner padding (28*2) + border (2) = 398px sabit */
    width:calc(var(--ikr-summary-max,340px) + 58px);
    opacity:0;visibility:hidden;pointer-events:none;
    transform-origin:top left;
  }
  .ikr-compact-panel.ikr-open{
    visibility:visible;pointer-events:auto;
    animation:ikr-grow-out 200ms ease-in-out forwards;
  }

  .ikr-compact-panel-inner{
    display:flex;flex-direction:column;align-items:center;gap:20px;
    padding:16px 28px 24px;
    border:1px solid var(--ikr-widget-border,var(--ikr-border,rgba(0,0,0,0.10)));
    border-radius:var(--ikr-radius,6px);
    background:#ffffff;
    box-shadow:0 8px 24px rgba(0,0,0,0.10), 0 2px 6px rgba(0,0,0,0.06);
    width:100%;box-sizing:border-box;
  }
  .ikr-compact-avg{
    display:flex;align-items:center;justify-content:center;gap:8px;
    font-size:var(--ikr-avg-rating-size,46px);line-height:1;
    color:var(--ikr-header-avg,var(--ikr-text,rgba(0,0,0,1)));font-weight:500;
  }
  .ikr-compact-avg .ikr-icon{
    width:var(--ikr-avg-star-size,58px);height:var(--ikr-avg-star-size,58px);
    color:var(--ikr-review-star-color,#f59e0b);
  }
  /* Bar chart 340px max, ortalanm\u0131\u015F */
  .ikr-compact-panel-inner .ikr-summary-bars{
    max-width:var(--ikr-summary-max,340px);width:100%;margin:0 auto;
  }

  /* Desktop: summary padding s\u0131f\u0131r \u2014 trigger sola yasl\u0131 */
  @media(min-width:601px){
    .ikr-summary-compact{display:flex;flex-direction:column;width:100%;gap:8px;padding:0;}
  }

  @media(max-width:600px){
    /* Header: trigger sola, filter sa\u011Fa; panel JS ile summary'nin direkt
       \xE7ocu\u011Fu olarak header'\u0131n alt\u0131na eklendi \u2192 flow'da accordion. */
    /* Mobile: trigger ve filter arasi gap acilir, yapisik gorunmesin */
    .ikr-compact-header{gap:16px;align-items:center;}
    .ikr-compact-actions-slot .ikr-write-btn{display:none;}
    .ikr-compact-write-row{display:flex;width:100%;}

    .ikr-compact-trigger-wrap{
      position:static;display:flex;align-items:center;
      flex:1 1 auto;min-width:0;
    }

    /* Panel mobilde flow i\xE7inde \u2014 trigger-wrap d\u0131\u015F\u0131nda, summary'nin \xE7ocu\u011Fu.
       Static position, max-height accordion animasyonu. */
    .ikr-compact-panel{
      position:static;
      width:100%;max-width:100%;min-width:0;
      transform:none;visibility:visible;pointer-events:auto;
      max-height:0;overflow:hidden;opacity:1;
      transition:max-height 280ms cubic-bezier(0.4,0,0.2,1);
      z-index:1;
    }
    .ikr-compact-panel.ikr-open{max-height:600px;}

    /* Filter men\xFC panel'in \xFCst\xFCnde kals\u0131n \u2014 header z-index panel'den y\xFCksek */
    .ikr-compact-header{position:relative;z-index:2;}
    .ikr-compact-actions-slot{position:relative;z-index:3;}

    .ikr-compact-panel-inner{
      padding:16px;
      box-shadow:none;
    }
  }
`;var Ha={id:"compact",name:"Kompakt (A\xE7\u0131l\u0131r)",sizeOverrides:{small:{"--ikr-compact-star-size":"20px"},medium:{"--ikr-compact-star-size":"24px"},large:{"--ikr-compact-star-size":"28px"}}},Fa=ki;function Da(e){var r=e.widget,t=e.settings,a=e.iconPair,i=e.allCount,n=e.ratingCounts,s=e.avgRatingVal,o=e.currentRatingFilter,d=e.currentOrderBy,p=e.currentHasImages,u=e.onFilterChange,c=e.onSortChange,l=document.createElement("div");l.className="ikr-summary ikr-summary-compact";var m=document.createElement("div");m.className="ikr-compact-header";var f=document.createElement("div");f.className="ikr-compact-trigger-wrap";var k=document.createElement("button");k.className="ikr-compact-trigger",k.type="button",k.setAttribute("aria-expanded","false"),k.innerHTML='<span class="ikr-compact-trigger-stars">'+le(s,a)+'</span><span class="ikr-compact-trigger-text">'+i.toLocaleString("tr-TR")+' Yorum</span><span class="ikr-compact-chevron"><svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M7.11 5.16L2.16 0.21L0.75 1.62L7.11 7.98L13.48 1.62L12.06 0.21L7.11 5.16Z" fill="currentColor"/></svg></span>',f.appendChild(k),m.appendChild(f);var v=te({widget:r,currentOrderBy:d,currentHasImages:p,onWriteClick:G,onSortChange:c}),y=v.querySelector(".ikr-filter-wrap"),x=v.querySelector(".ikr-write-btn"),b=document.createElement("div");b.className="ikr-compact-actions-slot",x&&b.appendChild(x),y&&b.appendChild(y),m.appendChild(b),l.appendChild(m);var g=document.createElement("div");g.className="ikr-compact-panel",g.setAttribute("role","dialog"),g.setAttribute("aria-hidden","true");var S=document.createElement("div");S.className="ikr-compact-panel-inner";var z=document.createElement("div");z.className="ikr-compact-avg",z.innerHTML='<span class="ikr-icon">'+a.filled+"</span><span>"+s+"</span>",S.appendChild(z),S.appendChild(qe({ratingCounts:n,allCount:i,iconPair:a,currentRatingFilter:o,onFilterChange:u})),g.appendChild(S);var C=typeof window!="undefined"&&window.matchMedia?window.matchMedia("(max-width:600px)"):null;function w(U){var F=U?l:f;g.parentNode!==F&&(g.classList.contains("ikr-open")&&(g.classList.remove("ikr-open"),g.setAttribute("aria-hidden","true"),k.setAttribute("aria-expanded","false")),F.appendChild(g))}if(w(C?C.matches:!1),C){var E=function(U){w(U.matches)};C.addEventListener?C.addEventListener("change",E):C.addListener&&C.addListener(E)}if(x){var T=document.createElement("button");T.className="ikr-write-btn",T.textContent=I&&I.writeButtonText||"Yorum Yap",T.onclick=G;var h=document.createElement("div");h.className="ikr-compact-write-row",h.appendChild(T),l.appendChild(h)}function A(){g.classList.remove("ikr-open"),g.setAttribute("aria-hidden","true"),k.setAttribute("aria-expanded","false")}function L(){yr(B),g.classList.add("ikr-open"),g.setAttribute("aria-hidden","false"),k.setAttribute("aria-expanded","true")}k.onclick=function(){g.classList.contains("ikr-open")?A():L()};var B=null;function H(U){B&&(B(),B=null),U||(B=br({trigger:f,element:g,close:A}))}if(H(C?C.matches:!1),C){var J=function(U){H(U.matches)};C.addEventListener?C.addEventListener("change",J):C.addListener&&C.addListener(J)}if(t.showRecommendation!==!1){var fe=(n[3]||0)+(n[4]||0),ve=i>0?Math.round(fe/i*100):0;if(ve>0){var $=document.createElement("div");$.className="ikr-summary-block ikr-summary-recommend",$.style.marginTop="8px",$.innerHTML='<span class="ikr-recommend-pct">%'+ve+"</span> bu \xFCr\xFCn\xFC tavsiye ediyor",S.appendChild($)}}return l}var it={};Ee(it,{css:()=>Va,meta:()=>ja,render:()=>Ya});var gi=`
  /* Ba\u015Fl\u0131k sola hizali \u2014 t\xFCm layout'larda tutarl\u0131 */
  .ikr-title-split{text-align:left;}

  /* Mobile (<=600): split = classic. Sol ve orta wrapper'lar seffaf
     (cocuklar dogrudan summary'nin child'i olur). Sag wrapper kalir ve
     classic'in .ikr-summary-actions wrapper'iyla ayni davranisi alir
     (flex row + width 100%) \u2014 write-btn yan yana filter ile durur. */
  @media(max-width:768px){
    /* Mobile'da split classic gibi davranir -> baslik ortali. */
    .ikr-title-split{text-align:center;}
    .ikr-split-left,.ikr-split-mid{display:contents;}
    /* .ikr-split-right classic'in .ikr-summary-actions pattern'ini taklit
       eder: max-width:340 ortali, bar chart ile ayni genislikte. Width:100%
       + tam genislige yayilmasini onler. */
    .ikr-split-right{
      display:flex;flex-direction:row;align-items:stretch;
      gap:var(--ikr-col-gap,8px);
      width:100%;max-width:var(--ikr-summary-max,340px);
      margin-left:auto;margin-right:auto;
      box-sizing:border-box;
    }
    /* Split mobile = classic mobile birebir: bar ve actions classic'teki
       max-width:340 sinirinden gelir (override yok). */
  }

  /* Desktop-only: split'in 3-kolon yatay tasarimi sadece >=601px'te aktif.
     Mobile'da hicbiri uygulanmaz -> base classic gorunum. */
  @media(min-width:769px){
    .ikr-split-col{
      display:flex;flex-direction:column;align-items:center;justify-content:flex-start;
      min-width:0;
    }

    .ikr-summary-split{
      display:flex;flex-direction:row;align-items:flex-start;justify-content:space-between;
      gap:24px;width:100%;max-width:none;padding:16px 8px;
    }

    /* Sol: avg (buyuk yildiz + sayi) -> sayi -> tavsiye, sol hizali */
    .ikr-split-left{flex:0 0 auto;gap:12px;text-align:left;align-items:flex-start;align-self:flex-start;}
    .ikr-split-left .ikr-split-left-avg-block{align-self:flex-start;margin:0;}
    /* Count ve tavsiye ortalama puanin altinda, center hizali */
    .ikr-split-left .ikr-split-left-count{align-self:center;text-align:center;}
    .ikr-split-left .ikr-summary-recommend{align-self:center;text-align:center;}

    /* Orta: bar chart sola hizali. align-items:stretch sart -
       flex-start ile child width:auto'ya duser ve track'ler buzusur. */
    .ikr-split-mid{flex:1 1 auto;align-items:stretch;}
    /* Split desktop'ta bar chart okunabilir genislikte: 500px max.
       Full genislik okuma mesafesini uzatiyordu, 500 dengeli. */
    .ikr-split-mid .ikr-summary-bars{
      max-width:400px;width:100%;margin:0;
    }
    /* Bar row sikilastir: satirlar arasi ve satir ici padding daralir.
       Premium tarzda kompakt his. */
    .ikr-split-mid .ikr-summary-bars{gap:2px;}
    .ikr-split-mid .ikr-bar-row{padding:2px 4px;}

    /* Sag: write + filter yan yana, dikey ortali */
    .ikr-split-right{
      flex:0 0 auto;flex-direction:row;align-items:stretch;gap:8px;align-self:center;
    }
    .ikr-split-right .ikr-write-btn{flex:0 0 auto;}
    .ikr-split-right .ikr-filter-wrap{flex:0 0 auto; align-self:stretch;}
    
    /* Gizli tavsiye yuzdesi desktop'ta yer kaplar (sol kolonu cokertmemek icin) */
    .ikr-split-rec-hidden { visibility: hidden; }
  }

  @media(max-width:768px){
    /* Mobilde split = classic stack. Eger tavsiye yuzdesi kapaliysa,
       yer kaplamasina gerek yok cunku yan yana kolon dengesi diye bir sey yok.
       Bu sayede mobildeki devasa boslugu onleriz. */
    .ikr-split-rec-hidden { display: none !important; }
  }
`;var ja={id:"split",name:"Yatay B\xF6l\xFCnm\xFC\u015F"},Va=gi;function Ya(e){var r=e.widget,t=e.settings,a=e.iconPair,i=e.allCount,n=e.ratingCounts,s=e.avgRatingVal,o=e.currentRatingFilter,d=e.currentOrderBy,p=e.currentHasImages,u=e.onFilterChange,c=e.onSortChange,l=document.createElement("div");l.className="ikr-summary ikr-summary-split";var m=document.createElement("div");m.className="ikr-split-col ikr-split-left";var f=document.createElement("div");f.className="ikr-summary-block ikr-summary-avg ikr-split-left-avg-block",f.innerHTML='<span class="ikr-avg-star ikr-icon">'+a.filled+'</span><span class="ikr-avg-num">'+s+"</span>",m.appendChild(f);var k=document.createElement("div");k.className="ikr-summary-block ikr-summary-count ikr-split-left-count",k.textContent=i.toLocaleString("tr-TR")+" Yorum",m.appendChild(k),l.appendChild(m);var v=document.createElement("div");v.className="ikr-split-col ikr-split-mid",v.appendChild(qe({ratingCounts:n,allCount:i,iconPair:a,currentRatingFilter:o,onFilterChange:u})),l.appendChild(v);var y=te({widget:r,currentOrderBy:d,currentHasImages:p,onWriteClick:G,onSortChange:c}),x=y.querySelector(".ikr-filter-wrap"),b=y.querySelector(".ikr-write-btn"),g=document.createElement("div");g.className="ikr-split-col ikr-split-right",b&&g.appendChild(b),x&&g.appendChild(x),l.appendChild(g);var S=(n[3]||0)+(n[4]||0),z=i>0?Math.round(S/i*100):0,C=document.createElement("div");C.className="ikr-summary-block ikr-summary-recommend",C.innerHTML='<span class="ikr-recommend-pct">%'+z+"</span> bu \xFCr\xFCn\xFC tavsiye ediyor";var w=t.showRecommendation===!1||z===0;return w&&C.classList.add("ikr-split-rec-hidden"),m.appendChild(C),l}var at={};Ee(at,{css:()=>qa,meta:()=>Ga,render:()=>Ua});var hi=`
  .ikr-title-minimal{text-align:left;}

  .ikr-summary-minimal{
    display:flex;flex-direction:row;align-items:center;justify-content:space-between;
    gap:16px;width:100%;max-width:none;padding:8px;
  }

  .ikr-minimal-info{
    display:flex;flex-direction:column;align-items:flex-start;gap:6px;min-width:0;
  }
  .ikr-minimal-row{
    display:flex;align-items:center;gap:8px;
  }
  .ikr-minimal-avg{
    font-size:var(--ikr-minimal-avg-size,22px);
    color:var(--ikr-header-avg,var(--ikr-text,rgba(0,0,0,1)));
    font-weight:400;line-height:1;
  }
  .ikr-minimal-stars{
    display:inline-flex;gap:2px;
    color:var(--ikr-review-star-color,#f59e0b);
  }
  .ikr-minimal-stars .ikr-icon,
  .ikr-minimal-stars .ikr-star{
    width:var(--ikr-bar-label-size,20px);height:var(--ikr-bar-label-size,20px);
  }
  .ikr-minimal-count{
    font-size:var(--ikr-recommend-size,14px);
    color:var(--ikr-header-count,var(--ikr-text,rgba(0,0,0,1)));
    font-weight:400;line-height:1.2;
  }

  .ikr-minimal-actions{
    display:flex;align-items:center;gap:var(--ikr-col-gap,8px);flex:0 0 auto;
  }

  @media(max-width:600px){
    .ikr-summary-minimal{
      flex-wrap:wrap;gap:12px;
    }
    .ikr-minimal-info{flex:1 1 auto;}
    .ikr-minimal-actions{flex:0 0 auto;}
    /* Filter info'nun yaninda kalir (sag ust kose), Yorum Yap full-genislik
       alta tek basina duser. Hero ve minimal'in kompakt karakterine uygun. */
    .ikr-minimal-actions .ikr-write-btn{display:none;}
    .ikr-minimal-write-row{display:flex;width:100%;}
    .ikr-minimal-write-row .ikr-write-btn{flex:1 1 auto;justify-content:center;}
  }
  @media(min-width:601px){
    .ikr-minimal-write-row{display:none;}
  }
`;var Ga={id:"minimal",name:"Minimal (Yal\u0131n)",supports:{recommendation:!1,barChart:!1}},qa=hi;function Ua(e){var r=e.widget,t=e.iconPair,a=e.allCount,i=e.avgRatingVal,n=e.currentOrderBy,s=e.currentHasImages,o=e.onSortChange,d=document.createElement("div");d.className="ikr-summary ikr-summary-minimal";var p=document.createElement("div");p.className="ikr-minimal-info";var u=document.createElement("div");u.className="ikr-minimal-row";var c=document.createElement("span");c.className="ikr-minimal-avg",c.textContent=i,u.appendChild(c);var l=document.createElement("span");l.className="ikr-minimal-stars",l.innerHTML=le(i,t),u.appendChild(l);var m=document.createElement("span");m.className="ikr-minimal-count",m.textContent=a.toLocaleString("tr-TR")+" Yorum",u.appendChild(m),p.appendChild(u),d.appendChild(p);var f=te({widget:r,currentOrderBy:n,currentHasImages:s,onWriteClick:G,onSortChange:o}),k=f.querySelector(".ikr-filter-wrap"),v=f.querySelector(".ikr-write-btn"),y=document.createElement("div");if(y.className="ikr-minimal-actions",v&&y.appendChild(v),k&&y.appendChild(k),d.appendChild(y),v){var x=document.createElement("button");x.className="ikr-write-btn",x.textContent=I&&I.writeButtonText||"Yorum Yap",x.onclick=G;var b=document.createElement("div");b.className="ikr-minimal-write-row",b.appendChild(x),d.appendChild(b)}return d}var nt={};Ee(nt,{css:()=>Ka,meta:()=>Wa,render:()=>Za});var yi=`
  .ikr-title-hero{text-align:left;}

  .ikr-summary-hero{
    display:flex;flex-direction:row;align-items:center;justify-content:space-between;
    gap:24px;width:100%;max-width:none;padding:12px 8px;
  }

  .ikr-hero-info{
    display:flex;flex-direction:row;align-items:center;gap:24px;min-width:0;flex:1;
  }
  .ikr-hero-rating-col{
    display:flex;flex-direction:row;align-items:center;gap:20px;
  }
  .ikr-hero-meta-row{
    display:flex;flex-direction:row;align-items:center;gap:8px;
  }
  .ikr-hero-avg{
    font-size:var(--ikr-hero-avg-size,90px);
    color:var(--ikr-header-avg,var(--ikr-text,rgba(0,0,0,1)));
    font-weight:700;line-height:1;letter-spacing:-2px;
  }
  .ikr-hero-stars{
    display:inline-flex;gap:2px;
    color:var(--ikr-review-star-color,#f59e0b);
  }
  .ikr-hero-stars .ikr-icon,
  .ikr-hero-stars .ikr-star{
    width:var(--ikr-bar-label-size,22px);height:var(--ikr-bar-label-size,22px);
  }
  .ikr-hero-count{
    font-size:var(--ikr-recommend-size,14px);
    color:var(--ikr-header-count,var(--ikr-text,rgba(0,0,0,0.6)));
    font-weight:400;line-height:1;
  }

  .ikr-hero-actions{
    display:flex;align-items:center;gap:var(--ikr-col-gap,8px);flex:0 0 auto;
  }
  .ikr-desktop-only{display:flex;}

  @media(max-width:600px){
    .ikr-summary-hero{
      flex-wrap:wrap;gap:16px;
    }
    .ikr-hero-info{gap:12px;justify-content:flex-start;width:100%;}
    .ikr-hero-rating-col{flex-direction:row;align-items:center;gap:16px;}
    .ikr-hero-avg{font-size:calc(var(--ikr-hero-avg-size,90px) * 0.65);letter-spacing:-1px;}
    .ikr-hero-meta-row{width:auto;gap:8px;}
    
    .ikr-desktop-only{display:none !important;}

    /* Filter ve Yorum Yap butonu yan yana */
    .ikr-hero-write-row{display:flex;width:100%;gap:8px;align-items:stretch;}
    .ikr-hero-write-row .ikr-write-btn{flex:1;justify-content:center;}
    .ikr-hero-write-row .ikr-filter-wrap{flex:0 0 auto;display:flex;}
    .ikr-hero-write-row .ikr-filter-btn{height:100%;aspect-ratio:1/1;}
  }
  @media(min-width:601px){
    .ikr-hero-write-row{display:none;}
  }
`;var Wa={id:"hero",name:"Vurgulu (B\xFCy\xFCk Puan)",supports:{recommendation:!1,barChart:!1}},Ka=yi;function Za(e){var r=e.widget,t=e.iconPair,a=e.allCount,i=e.avgRatingVal,n=e.currentOrderBy,s=e.currentHasImages,o=e.onSortChange,d=document.createElement("div");d.className="ikr-summary ikr-summary-hero";var p=document.createElement("div");p.className="ikr-hero-info";var u=document.createElement("div");u.className="ikr-hero-rating-col";var c=document.createElement("span");c.className="ikr-hero-avg",c.textContent=i,u.appendChild(c);var l=document.createElement("div");l.className="ikr-hero-meta-row";var m=document.createElement("span");m.className="ikr-hero-stars",m.innerHTML=le(i,t),l.appendChild(m);var f=document.createElement("div");f.className="ikr-hero-count",f.textContent=a.toLocaleString("tr-TR")+" Yorum",l.appendChild(f),u.appendChild(l),p.appendChild(u),d.appendChild(p);var k=te({widget:r,currentOrderBy:n,currentHasImages:s,onWriteClick:G,onSortChange:o}),v=k.querySelector(".ikr-filter-wrap"),y=k.querySelector(".ikr-write-btn"),x=document.createElement("div");x.className="ikr-hero-actions ikr-desktop-only",y&&x.appendChild(y),v&&x.appendChild(v),d.appendChild(x);var b=te({widget:r,currentOrderBy:n,currentHasImages:s,onWriteClick:G,onSortChange:o}),g=b.querySelector(".ikr-filter-wrap"),S=b.querySelector(".ikr-write-btn"),z=document.createElement("div");return z.className="ikr-hero-write-row",S&&z.appendChild(S),g&&z.appendChild(g),d.appendChild(z),d}var wr={classic:rt,compact:tt,split:it,minimal:at,hero:nt};function xr(e){return wr[e]||wr.classic}function bi(){return Object.keys(wr).map(function(e){return wr[e].css||""}).join(`
`)}var ot={};Ee(ot,{css:()=>Ja,meta:()=>Xa,render:()=>$a});function We(e,r){if(!e)return null;var t=document.createElement("div");t.className="ikr-reply";var a=document.createElement("div");a.className="ikr-reply-header";var i=document.createElement("span");i.className="ikr-reply-label",i.textContent=I&&I.merchantReplyLabel||"Ma\u011Faza Sahibi",a.appendChild(i),t.appendChild(a);var n=document.createElement("div");n.className="ikr-reply-text ikr-reply-text-clamped",n.textContent=e,t.appendChild(n);var s=document.createElement("span");return s.className="ikr-read-more ikr-reply-read-more",s.textContent="Devam\u0131n\u0131 oku",s.style.display="none",t.appendChild(s),requestAnimationFrame(function(){if(n.scrollHeight>n.clientHeight+2)if(s.style.display="inline",typeof r=="function")s.onclick=r;else{var o=!1;s.onclick=function(){o=!o,n.classList.toggle("ikr-reply-text-clamped",!o),s.textContent=o?"Daha az g\xF6ster":"Devam\u0131n\u0131 oku"}}}),t}var Xa={id:"card",name:"Kart (Varsay\u0131lan)",sizeOverrides:{small:{"--ikr-card-photo-w":"80px"},medium:{"--ikr-card-photo-w":"110px"},large:{"--ikr-card-photo-w":"140px"}}},Ja="";function $a(e,r){var t=document.createElement("div");t.className="ikr-review ikr-review-card";var a=document.createElement("div");a.className="ikr-review-top";var i=document.createElement("div");i.className="ikr-review-top-left";var n=document.createElement("span");n.className="ikr-review-stars",n.innerHTML=we(e.rating,I),i.appendChild(n);var s=document.createElement("span");if(s.className="ikr-date",s.textContent=xe(e.createdAt),a.appendChild(i),a.appendChild(s),t.appendChild(a),e.title){var o=document.createElement("div");o.className="ikr-review-title",o.textContent=e.title,t.appendChild(o)}var d=document.createElement("div");d.className="ikr-author",d.textContent=e.author||"",t.appendChild(d);var p=(e.comment||"").trim();if(p){var u=document.createElement("div");u.className="ikr-body ikr-body-clamped",u.textContent=p,t.appendChild(u);var c=document.createElement("span");c.className="ikr-read-more",c.textContent="Devam\u0131n\u0131 oku",c.style.display="none",t.appendChild(c),requestAnimationFrame(function(){if(u.scrollHeight>u.clientHeight+2){c.style.display="inline";var k=!1;c.onclick=function(){k=!k,u.classList.toggle("ikr-body-clamped",!k),c.textContent=k?"Daha az g\xF6ster":"Devam\u0131n\u0131 oku"}}})}var l=ze(e);if(l.length){var m=document.createElement("div");m.className="ikr-gallery",l.forEach(function(k){var v=document.createElement("img"),y=se(k,X);v.src=y.src,v.srcset=y.srcset,v.loading="lazy",v.decoding="async",v.width=X,v.height=X,v.className="ikr-img",de(v),v.setAttribute("data-ikr-img-url",k),(function(x){v.onclick=function(){pe(e,x,r)}})(k),m.appendChild(v)}),t.appendChild(m)}var f=We(e.merchantReply);return f&&t.appendChild(f),t}var lt={};Ee(lt,{css:()=>en,meta:()=>Qa,render:()=>rn});var wi=`
  .ikr-review-list{
    display:grid;
    grid-template-columns:140px 1fr var(--ikr-list-photo-w,120px);
    gap:60px;
    align-items:start;
    /* Yan padding theme mobile blo\u011Fundan gelir (--ikr-pad-review-mobile).
       Shorthand padding:24px 0 yan padding'i 0'a resetler ve theme kural\u0131n\u0131
       specifity sava\u015F\u0131nda ezer. Sadece top/bottom ayr\u0131 set. */
    padding-top:24px;padding-bottom:24px;
    border-top:1px solid var(--ikr-review-border,#e5e7eb);
    border-bottom:none;
  }
  .ikr-review-list.ikr-review-list--no-media{grid-template-columns:140px 1fr;}
  /* Sol kolon imza grubu: y\u0131ld\u0131z \u2192 yazar \u2192 tarih.
     y\u0131ld\u0131z\u2192yazar normal (8), yazar\u2192tarih tight (4) ayn\u0131 imza grubu. */
  .ikr-review-list-author{
    display:flex;flex-direction:column;
    font-size:var(--ikr-author-size,14px);
    color:var(--ikr-review-author,var(--ikr-text,rgba(0,0,0,1)));
  }
  .ikr-review-list-author-stars{margin-bottom:var(--ikr-gap-normal);}
  .ikr-review-list-author-name{font-weight:600;font-style:normal;}
  .ikr-review-list-author-date{margin-top:var(--ikr-gap-tight);font-size:var(--ikr-review-date-size,12px);color:var(--ikr-review-date,#5e5e5e);}
  .ikr-review-list-content{display:flex;flex-direction:column;min-width:0;}
  /* Title art\u0131k orta kolonun ilk eleman\u0131; \xFCst margin gerekmez. */
  .ikr-review-list-title{font-weight:600;font-size:var(--ikr-review-title-size,16px);color:var(--ikr-review-title,var(--ikr-text,rgba(0,0,0,1)));margin:0;}
  .ikr-review-list-body{margin-top:var(--ikr-gap-normal);line-height:1.6;color:var(--ikr-review-body,var(--ikr-text,rgba(0,0,0,1)));font-size:var(--ikr-review-text-size,14px);}
  .ikr-review-list-media{display:flex;justify-content:flex-end;}
  .ikr-review-list-media img{
    width:100%;max-width:var(--ikr-list-photo-w,120px);aspect-ratio:3/4;object-fit:cover;
    border-radius:var(--ikr-radius,6px);
    border:1px solid var(--ikr-photo-image-border,rgba(0,0,0,0.05));
    cursor:zoom-in;
  }
  /* Desktop: sadece ilk foto g\xF6r\xFCn\xFCr (sa\u011F kolonda tek delil g\xF6rseli). DOM'da
     t\xFCm fotolar var, modal i\xE7in kullan\u0131l\u0131r. Mobile'da kural\u0131n aktif olmamas\u0131
     i\xE7in min-width:601 media query i\xE7inde tan\u0131mland\u0131 \u2014 b\xF6ylece mobile strip
     t\xFCm fotolar\u0131 g\xF6stermeye engel olmaz. */
  @media (min-width:601px){
    .ikr-review-list-media img:not(:first-child){display:none;}
  }
  @media (max-width:600px){
    /* Mobile s\u0131ra: y\u0131ld\u0131z \u2192 title \u2192 yazar \u2192 tarih \u2192 body \u2192 foto \u2192 reply.
       Sol kolondaki author blo\u011Fu DOM'da y\u0131ld\u0131z+yazar+tarih s\u0131ras\u0131ndad\u0131r.
       Mobile'da author display:contents ile \u015Feffafla\u015F\u0131r; y\u0131ld\u0131z/yazar/tarih
       ayr\u0131 flex item olur. Content de display:contents \u2192 title/body/reply
       ayr\u0131 flex item olur. Tek seviyede order ile s\u0131ralan\u0131r. DOM dokunulmaz. */
    .ikr-review-list,
    .ikr-review-list.ikr-review-list--no-media{
      /* Yan padding theme mobile bloguna tasindi (--ikr-pad-review-mobile).
         Burada sadece top/bottom set edilir ki theme kuralini ezmesin. */
      display:flex;flex-direction:column;gap:8px;padding-top:16px;padding-bottom:16px;
    }
    .ikr-review-list-author{display:contents;}
    .ikr-review-list-content{display:contents;}
    .ikr-review-list-author-stars{order:1;margin-bottom:0;}
    .ikr-review-list-title{order:2;}
    .ikr-review-list-author-name{order:3;}
    /* yazar\u2192tarih ayn\u0131 imza grubu, galeri ile tutarl\u0131 kompakt 4px (gap 8 - margin -4) */
    .ikr-review-list-author-date{order:4;margin-top:-4px;}
    .ikr-review-list-body{order:5;margin-top:0;}
    /* body sonras\u0131 read-more body ile ayn\u0131 blo\u011Fa ait;
       reviewEl 8px gap sonras\u0131 net 4px kalmas\u0131 i\xE7in -4px (galeri/card uyumu) */
    .ikr-review-list-content > .ikr-read-more{order:6;margin-top:-4px;}
    .ikr-review-list-media{order:7;justify-content:flex-start;}
    .ikr-reply{order:8;width:100%;}
    /* Mobile media: t\xFCm fotolar yatay strip (overflow-x:auto). flex-shrink:0
       ile fotolar k\xFC\xE7\xFClmez, s\u0131\u011Fmayanlar yatay scroll. Desktop'taki "sadece ilk
       foto" kural\u0131 burada ezilir. Scroll bar gizli, parmakla kayd\u0131rma. */
    .ikr-review-list-media{
      flex-wrap:nowrap;overflow-x:auto;gap:8px;
      padding-bottom:4px;scrollbar-width:none;
      justify-content:flex-start;
    }
    .ikr-review-list-media::-webkit-scrollbar{display:none;}
    .ikr-review-list-media img{
      flex-shrink:0;
      max-width:var(--ikr-list-photo-w-mobile,100px);
      aspect-ratio:3/4;
      display:block;
    }
  }
`;var Qa={id:"list",name:"Liste",supports:{},sizeOverrides:{small:{"--ikr-list-photo-w":"80px","--ikr-list-photo-w-mobile":"80px"},medium:{"--ikr-list-photo-w":"110px","--ikr-list-photo-w-mobile":"100px"},large:{"--ikr-list-photo-w":"140px","--ikr-list-photo-w-mobile":"110px"}}},en=wi;function rn(e,r){var t=ze(e),a=t.length>0,i=document.createElement("div");i.className="ikr-review-list"+(a?"":" ikr-review-list--no-media");var n=document.createElement("div");n.className="ikr-review-list-author";var s=document.createElement("span");s.className="ikr-review-stars ikr-review-list-author-stars",s.innerHTML=we(e.rating,I),n.appendChild(s);var o=document.createElement("span");o.className="ikr-review-list-author-name",o.textContent=e.author||"",n.appendChild(o);var d=document.createElement("span");d.className="ikr-date ikr-review-list-author-date",d.textContent=xe(e.createdAt),n.appendChild(d),i.appendChild(n);var p=document.createElement("div");if(p.className="ikr-review-list-content",e.title){var u=document.createElement("div");u.className="ikr-review-list-title",u.textContent=e.title,p.appendChild(u)}var c=(e.comment||"").trim();if(c){var l=document.createElement("div");l.className="ikr-review-list-body ikr-body-clamped",l.textContent=c,p.appendChild(l);var m=document.createElement("span");m.className="ikr-read-more",m.textContent="Devam\u0131n\u0131 oku",m.style.display="none",p.appendChild(m),requestAnimationFrame(function(){if(l.scrollHeight>l.clientHeight+2){m.style.display="inline";var v=!1;m.onclick=function(){v=!v,l.classList.toggle("ikr-body-clamped",!v),m.textContent=v?"Daha az g\xF6ster":"Devam\u0131n\u0131 oku"}}})}var f=We(e.merchantReply);if(f&&p.appendChild(f),i.appendChild(p),a){var k=document.createElement("div");k.className="ikr-review-list-media",t.forEach(function(v){var y=document.createElement("img"),x=se(v,X);y.src=x.src,y.srcset=x.srcset,y.loading="lazy",y.decoding="async",y.width=X,y.height=Math.round(X*4/3),y.setAttribute("data-ikr-img-url",v),de(y),(function(b){y.onclick=function(){pe(e,b,r)}})(v),k.appendChild(y)}),i.appendChild(k)}return i}var st={};Ee(st,{css:()=>an,meta:()=>tn,render:()=>nn});var xi=`
  /* Galeri se\xE7iliyken widget full-bleed yerine 1200px ile s\u0131n\u0131rl\u0131 \u2014
     CSS columns parent geni\u015Fli\u011Fine yay\u0131ld\u0131\u011F\u0131 i\xE7in widget kendisi s\u0131n\u0131rlanmal\u0131.
     Di\u011Fer layoutlar (card/list) full-bleed olarak kal\u0131r. */
  #ikas-reviews-widget:has(.ikr-review-gallery){
    width:auto;
    max-width:1200px;
    margin-left:auto;
    margin-right:auto;
    column-count:2;
    column-gap:32px;
  }
  /* Non-review elemanlar kolon d\u0131\u015F\u0131na \xE7\u0131kar \u2014 summary, ba\u015Fl\u0131k, foto strip vs. */
  #ikas-reviews-widget:has(.ikr-review-gallery) > .ikr-title,
  #ikas-reviews-widget:has(.ikr-review-gallery) > .ikr-summary,
  #ikas-reviews-widget:has(.ikr-review-gallery) > .ikr-photo-section,
  #ikas-reviews-widget:has(.ikr-review-gallery) > .ikr-write-btn,
  #ikas-reviews-widget:has(.ikr-review-gallery) > .ikr-load-more,
  #ikas-reviews-widget:has(.ikr-review-gallery) > .ikr-state-msg{
    column-span:all;
    -webkit-column-span:all;
  }
  /* Item \u2014 column i\xE7inde kal\u0131r, i\xE7inde sol-sa\u011F split */
  .ikr-review-gallery{
    break-inside:avoid;
    -webkit-column-break-inside:avoid;
    page-break-inside:avoid;
    display:grid;
    grid-template-columns:1fr var(--ikr-gallery-photo-w,120px);
    column-gap:32px;
    row-gap:8px;
    align-items:start;
    /* Yan padding theme mobile blo\u011Fundan gelir (--ikr-pad-review-mobile).
       Shorthand yan padding'i 0'a resetleyip theme kural\u0131n\u0131 ezmesin diye
       top/bottom ayr\u0131 set. */
    padding-top:18px;padding-bottom:18px;
    margin:0;
    border-top:1px solid var(--ikr-review-border,#e5e7eb);
  }
  .ikr-review-gallery.ikr-review-gallery--no-media{
    grid-template-columns:1fr;
  }
  .ikr-review-gallery-content{
    display:flex;flex-direction:column;min-width:0;
  }
  /* Galeri dikey s\u0131ra: stars \u2192 title \u2192 author \u2192 date \u2192 body \u2192 reply.
     stars\u2192title (normal); title\u2192author (normal); author\u2192date (tight, ayn\u0131 imza
     grubu); date\u2192body (normal). Bkz: gap s\xF6zle\u015Fmesi. */
  .ikr-review-gallery-stars{
    /* en \xFCstte; margin yok */
  }
  .ikr-review-gallery-title{
    font-weight:600;
    font-size:var(--ikr-review-title-size,15px);
    color:var(--ikr-review-title,var(--ikr-text,rgba(0,0,0,1)));
    margin:var(--ikr-gap-normal) 0 0 0;
  }
  .ikr-review-gallery-author{
    font-weight:600;
    font-size:var(--ikr-author-size,14px);
    color:var(--ikr-review-author,var(--ikr-text,rgba(0,0,0,1)));
    margin-top:var(--ikr-gap-normal);
  }
  .ikr-review-gallery-date{
    font-size:var(--ikr-review-date-size,12px);
    color:var(--ikr-review-date,#5e5e5e);
    margin-top:var(--ikr-gap-tight);
  }
  .ikr-review-gallery-body{
    line-height:1.55;
    color:var(--ikr-review-body,var(--ikr-text,rgba(0,0,0,1)));
    font-size:var(--ikr-review-text-size,14px);
    margin-top:var(--ikr-gap-normal);
    max-width:340px;
  }
  /* Mobile tap highlight kald\u0131r\u0131ld\u0131 \u2014 modal a\xE7\u0131l\u0131rken g\xF6r\xFCn\xFCr kal\u0131yordu */
  .ikr-review-gallery .ikr-read-more{
    -webkit-tap-highlight-color:transparent;
    tap-highlight-color:transparent;
    user-select:none;-webkit-user-select:none;
  }
  .ikr-review-gallery-media{
    cursor:zoom-in;
  }
  /* Reply full-width: foto+metin alt\u0131nda her iki kolona yay\u0131l\u0131r */
  .ikr-review-gallery-reply{
    grid-column:1 / -1;
  }
  .ikr-review-gallery-media img{
    display:block;width:100%;height:auto;
    aspect-ratio:3/4;object-fit:cover;
    border-radius:var(--ikr-radius,6px);
    border:1px solid var(--ikr-photo-image-border,rgba(0,0,0,0.05));
  }
  @media (max-width:600px){
    #ikas-reviews-widget:has(.ikr-review-gallery){
      column-count:1;
      column-gap:0;
    }
    .ikr-review-gallery{
      grid-template-columns:1fr var(--ikr-gallery-photo-w-mobile,100px);
      column-gap:12px;row-gap:12px;
      /* Yan padding theme mobile bloguna tasindi (--ikr-pad-review-mobile).
         Burada sadece top/bottom set edilir ki theme kuralini ezmesin. */
      padding-top:16px;padding-bottom:16px;
    }
    .ikr-review-gallery.ikr-review-gallery--no-media{
      grid-template-columns:1fr;
    }
  }
`;var tn={id:"gallery",name:"Galeri",supports:{},sizeOverrides:{small:{"--ikr-gallery-photo-w":"80px","--ikr-gallery-photo-w-mobile":"80px"},medium:{"--ikr-gallery-photo-w":"110px","--ikr-gallery-photo-w-mobile":"100px"},large:{"--ikr-gallery-photo-w":"140px","--ikr-gallery-photo-w-mobile":"110px"}}},an=xi;function nn(e,r){var t=vr(e),a=!!t,i=document.createElement("div");i.className="ikr-review-gallery"+(a?"":" ikr-review-gallery--no-media");var n=document.createElement("div");n.className="ikr-review-gallery-content";var s=document.createElement("span");if(s.className="ikr-review-stars ikr-review-gallery-stars",s.innerHTML=we(e.rating,I),n.appendChild(s),e.title){var o=document.createElement("div");o.className="ikr-review-gallery-title",o.textContent=e.title,n.appendChild(o)}var d=document.createElement("div");d.className="ikr-review-gallery-author",d.textContent=e.author||"",n.appendChild(d);var p=document.createElement("div");p.className="ikr-review-gallery-date",p.textContent=xe(e.createdAt),n.appendChild(p);var u=(e.comment||"").trim();if(u){var c=document.createElement("div");c.className="ikr-review-gallery-body ikr-body-clamped",c.textContent=u,n.appendChild(c);var l=document.createElement("span");l.className="ikr-read-more",l.textContent="Devam\u0131n\u0131 oku",l.style.display="none",l.style.cursor="pointer";var m=!1;l.onclick=function(){if(t){pe(e,t,r);return}m=!m,c.classList.toggle("ikr-body-clamped",!m),l.textContent=m?"Daha az g\xF6ster":"Devam\u0131n\u0131 oku"},n.appendChild(l),requestAnimationFrame(function(){c.scrollHeight>c.clientHeight+2&&(l.style.display="inline")})}if(i.appendChild(n),a){var f=document.createElement("div");f.className="ikr-review-gallery-media";var k=document.createElement("img"),v=se(t,kr);k.src=v.src,k.srcset=v.srcset,k.loading="lazy",k.decoding="async",k.width=kr,k.height=Math.round(kr*4/3),de(k),k.setAttribute("data-ikr-img-url",t),k.onclick=function(){pe(e,t,r)},f.appendChild(k),i.appendChild(f)}var y=We(e.merchantReply,t?function(){pe(e,t,r)}:null);return y&&(y.classList.add("ikr-review-gallery-reply"),i.appendChild(y)),i}var zr={card:ot,list:lt,gallery:st};function ir(e){return zr[e]||zr.card}function zi(){return Object.keys(zr).map(function(e){return zr[e].css||""}).join(`
`)}function Be(e,r){var t=/^#([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})?$/.exec(e);if(!t)return"rgba(0,0,0,"+r+")";var a=parseInt(t[1],16),i=parseInt(t[2],16),n=parseInt(t[3],16);return"rgba("+a+","+i+","+n+","+r+")"}function on(){var e=document.getElementById("ikas-reviews-anchor");if(e)return e;e=document.createElement("div"),e.id="ikas-reviews-anchor",e.setAttribute("data-ikr-auto-anchor","1");var r=null;try{r=document.querySelector(Ge)}catch(a){}if(r&&r.parentNode)return r.parentNode.insertBefore(e,r.nextSibling),e;var t=document.querySelector("main")||document.body;return t?(t.appendChild(e),e):null}var Ci={small:{titleSize:20,reviewTextSize:12,reviewTitleSize:14,authorSize:12,replyNameSize:12,replyTextSize:12,photoTitleSize:14,avgRatingSize:36,avgStarSize:48,reviewCountSize:16,recommendSize:12,compactCountSize:14,btnTextSize:12,barLabelSize:18,barCountSize:12,reviewDateSize:10,filterTextSize:12,loadMoreSize:12,readMoreSize:10,reviewStarSize:18,minimalAvgSize:18,heroAvgSize:74},medium:{titleSize:24,reviewTextSize:14,reviewTitleSize:16,authorSize:14,replyNameSize:13,replyTextSize:13,photoTitleSize:16,avgRatingSize:46,avgStarSize:58,reviewCountSize:20,recommendSize:14,compactCountSize:16,btnTextSize:14,barLabelSize:22,barCountSize:14,reviewDateSize:12,filterTextSize:14,loadMoreSize:14,readMoreSize:12,reviewStarSize:22,minimalAvgSize:22,heroAvgSize:90},large:{titleSize:28,reviewTextSize:16,reviewTitleSize:18,authorSize:16,replyNameSize:15,replyTextSize:15,photoTitleSize:18,avgRatingSize:56,avgStarSize:68,reviewCountSize:22,recommendSize:16,compactCountSize:18,btnTextSize:16,barLabelSize:26,barCountSize:16,reviewDateSize:14,filterTextSize:16,loadMoreSize:16,readMoreSize:14,reviewStarSize:26,minimalAvgSize:26,heroAvgSize:106}},Si={small:80,medium:110,large:140};function ln(e,r){var t=document.createElement("div");t.className="ikr-state-msg ikr-state-error",t.setAttribute("role","status"),t.setAttribute("aria-live","polite");var a=document.createElement("div");a.className="ikr-state-error-text",a.textContent=e||"Yorumlar \u015Fu anda y\xFCklenemiyor.",t.appendChild(a);var i=document.createElement("button");return i.type="button",i.className="ikr-state-retry",i.textContent="Tekrar Dene",i.onclick=async function(){i.disabled=!0,i.textContent="Tekrar deneniyor...",await r()},t.appendChild(i),t}function sn(e,r){var t=r.headerTitleColor||"#111111",a=r.headerAvgColor||"#111111",i=r.headerCountColor||"#111111",n=r.headerRecommendColor||"#111111",s=r.barFillColor||"#111111",o=r.barTrackColor||"#e5e7eb",d=r.barCountColor||"#111111",p=Be(s,.06),u=r.reviewStarColor||"#f59e0b",c=u,l=r.btnBgColor||"#111111",m=r.btnTextColor||"#ffffff",f=r.btnBorderColor||"#111111",k=r.filterBtnBgColor||"#111111",v=r.filterBtnTextColor||"#ffffff",y=r.filterBtnBorderColor||"#111111",x=r.filterMenuBgColor||"#ffffff",b=r.filterMenuBorderColor||"#e5e7eb",g=r.filterItemTextColor||"#111111",S=r.filterItemHoverBgColor||"#f3f4f6",z=r.filterItemActiveColor||"#111111",C=r.reviewTitleColor||"#111111",w=r.reviewAuthorColor||"#111111",E=r.reviewDateColor||"#5e5e5e",T=r.reviewBodyColor||"#111111",h=r.reviewBorderColor||"#e5e7eb",A=r.replyBgColor||"#f9fafb",L=r.replyBorderColor||"#747474",B=r.replyLabelColor||"#111111",H=r.replyTextColor||"#111111",J=r.photoTitleColor||"#111111",fe=Be("#111111",.05),ve=r.photoArrowBgColor||"#ffffff",$=r.photoArrowTextColor||"#111111",U=Be("#111111",.12),F=r.formBgColor||"#ffffff",ke=r.formPrimaryTextColor||"#111111",ge=r.formSecondaryTextColor||"#3b3b3b",W=r.inputTextColor||ke,Se=r.inputBorderColor||"#d1d5db",He=r.placeholderColor||"#9ca3af",he=r.formStepBarColor||"#111111",ie=r.formBtnBgColor||"#111111",j=r.formBtnTextColor||"#ffffff",Ke=r.formBtnBorderColor||"#111111",ae=Be(ie,.06),Pe=Be(ie,.18),ye=Be(j,.85),re=Be(ke,.06),ne=r.loadMoreBgColor||"#ffffff",_e=r.loadMoreTextColor||"#111111",K=r.loadMoreBorderColor||"#111111",R={"--ikr-widget-bg":"#ffffff00","--ikr-widget-border":"#ffffff00","--ikr-header-title":t,"--ikr-header-avg":a,"--ikr-header-count":i,"--ikr-header-recommend":n,"--ikr-bar-fill":s,"--ikr-bar-track":o,"--ikr-star-empty-color":c,"--ikr-bar-count":d,"--ikr-bar-hover-bg":p,"--ikr-btn-bg":l,"--ikr-btn-text":m,"--ikr-btn-border":f,"--ikr-filter-btn-bg":k,"--ikr-filter-btn-text":v,"--ikr-filter-btn-border":y,"--ikr-filter-menu-bg":x,"--ikr-filter-menu-border":b,"--ikr-filter-item-text":g,"--ikr-filter-item-hover-bg":S,"--ikr-filter-item-active":z,"--ikr-review-title":C,"--ikr-review-author":w,"--ikr-review-date":E,"--ikr-review-body":T,"--ikr-review-border":h,"--ikr-review-star-color":u,"--ikr-reply-bg-color":A,"--ikr-reply-border":L,"--ikr-reply-label":B,"--ikr-reply-text":H,"--ikr-photo-title":J,"--ikr-photo-image-border":fe,"--ikr-photo-arrow-bg":ve,"--ikr-photo-arrow-text":$,"--ikr-photo-arrow-border":U,"--ikr-fwizard-bg":F,"--ikr-fwizard-text":ke,"--ikr-fwizard-secondary-text":ge,"--ikr-fwizard-input-bg":F,"--ikr-fwizard-input-text":W,"--ikr-fwizard-input-border":Se,"--ikr-fwizard-placeholder":He,"--ikr-fwizard-close-text":ke,"--ikr-fwizard-close-hover-bg":re,"--ikr-fwizard-progress-bg":re,"--ikr-fwizard-progress-active":he,"--ikr-fwizard-btn-bg":ie,"--ikr-fwizard-btn-text":j,"--ikr-fwizard-btn-border":Ke,"--ikr-fwizard-btn-disabled-bg":Pe,"--ikr-fwizard-btn-disabled-text":ye,"--ikr-fwizard-nav-hover-bg":ae,"--ikr-load-more-bg":ne,"--ikr-load-more-text":_e,"--ikr-load-more-border":K};Object.keys(R).forEach(function(oe){e.style.setProperty(oe,R[oe])}),typeof window!="undefined"&&window.__ikasPreviewMode&&document.body&&(document.body.style.background="transparent",document.documentElement.style.background="transparent")}async function me(e,r,t,a,i,n,s){if(jr){cr({productId:e,settings:r,reviewsData:t,productName:a,orderBy:i,page:n,badgeSettings:s});return}dr(!0),Ct(e),St(r),s!==void 0&&Et(s),Tt(a),i&&De(i),n&&Re(n),t!=null&&Lt(t);try{let Lr=function(P,N){if(!(!P||!P.meta||!P.meta.sizeOverrides)){var M=P.meta.sizeOverrides[N];M&&Object.keys(M).forEach(function(Ne){l.style.setProperty(Ne,M[Ne])})}};var Tn=Lr,o=xr(r.summaryLayout),d=!(o.meta&&o.meta.supports&&o.meta.supports.title===!1),p=r.showTitle!==!1,u=(r.title||"").trim()||"M\xFC\u015Fteri Yorumlar\u0131",c=d&&p?u:"",l=document.documentElement;sn(l,r),Mt("#111111",Jt+bi()+zi());var m=r.borderRadius!==void 0?r.borderRadius:8,f=Ci[r.size]||Ci.medium,k=Si[r.thumbnailSize]||Si.medium,v=ir(r.reviewLayout);if(v.meta&&v.meta.sizeOverrides&&v.meta.sizeOverrides[r.size]){var y=v.meta.sizeOverrides[r.size],x=y["--ikr-list-photo-w"]||y["--ikr-gallery-photo-w"];x&&(k=parseInt(x))}l.style.setProperty("--ikr-title-size",f.titleSize+"px"),l.style.setProperty("--ikr-review-text-size",f.reviewTextSize+"px"),l.style.setProperty("--ikr-review-title-size",f.reviewTitleSize+"px"),l.style.setProperty("--ikr-author-size",f.authorSize+"px"),l.style.setProperty("--ikr-reply-name-size",f.replyNameSize+"px"),l.style.setProperty("--ikr-reply-text-size",f.replyTextSize+"px"),l.style.setProperty("--ikr-radius",m+"px"),l.style.setProperty("--ikr-radius-sm",Math.max(0,m-4)+"px"),l.style.setProperty("--ikr-photo-title-size",f.photoTitleSize+"px"),l.style.setProperty("--ikr-avg-rating-size",f.avgRatingSize+"px"),l.style.setProperty("--ikr-review-count-size",f.reviewCountSize+"px"),l.style.setProperty("--ikr-compact-count-size",f.compactCountSize+"px"),l.style.setProperty("--ikr-recommend-size",f.recommendSize+"px"),l.style.setProperty("--ikr-btn-text-size",f.btnTextSize+"px"),l.style.setProperty("--ikr-bar-label-size",f.barLabelSize+"px"),l.style.setProperty("--ikr-minimal-avg-size",f.minimalAvgSize+"px"),l.style.setProperty("--ikr-hero-avg-size",f.heroAvgSize+"px"),l.style.setProperty("--ikr-bar-count-size",f.barCountSize+"px"),l.style.setProperty("--ikr-review-date-size",f.reviewDateSize+"px"),l.style.setProperty("--ikr-filter-text-size",f.filterTextSize+"px"),l.style.setProperty("--ikr-load-more-size",f.loadMoreSize+"px"),l.style.setProperty("--ikr-read-more-size",f.readMoreSize+"px"),l.style.setProperty("--ikr-thumbnail-size",k+"px");var b=/^#[0-9A-Fa-f]{6}([0-9A-Fa-f]{2})?$/.test(r.reviewStarColor||"")?r.reviewStarColor:"#f59e0b";l.style.setProperty("--ikr-review-star-color",b),l.style.setProperty("--ikr-star-empty-color",b),l.style.setProperty("--ikr-star-size",f.reviewStarSize+"px"),l.style.setProperty("--ikr-avg-star-size",f.avgStarSize+"px"),Lr(xr(r.summaryLayout),r.size),Lr(ir(r.reviewLayout),r.size);var g=Ae(r),S=document.getElementById("ikas-reviews");if(!S){var z=on();if(!z)return;S=document.createElement("div"),S.id="ikas-reviews",S.style.minHeight="200px",z.appendChild(S)}if(r.enabled===!1){S.style.minHeight="auto",S.innerHTML='<div style="padding: 40px 20px; margin-top: 24px; text-align: center; color: #6e6d7a; font-family: Inter, sans-serif; border: 1px dashed #e3e1e5; border-radius: '+(r.borderRadius!==void 0?r.borderRadius:8)+'px; background: #fafafa; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px;"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #6e6d7a; margin-bottom: 4px;"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg><div style="font-weight: 500; font-size: 18px; color: #1a191a; letter-spacing: -0.01em;">Widget \u015Fu anda Pasif durumda</div><div style="font-size: 16px; color: #6e6d7a; max-width: 380px; line-height: 1.5;">Canl\u0131 ma\u011Fazan\u0131zda m\xFC\u015Fterileriniz hi\xE7bir yorum alan\u0131 g\xF6rmeyecektir.</div></div>',dr(!1);var C=Xe;cr(null),C&&me(C.productId,C.settings,C.reviewsData,C.productName,C.orderBy,C.page,C.badgeSettings);return}S.innerHTML='<p class="ikr-state-msg ikr-state-loading">Yorumlar y\xFCkleniyor...</p>';try{var w=t||{},E=dt(w),T=E?[]:w.data&&w.data.reviews||[],h=E?0:w.data&&w.data.totalCount||0;_t(T);var A=S.cloneNode(!1);S.parentNode.replaceChild(A,S),S=A;var L=document.createElement("div");if(L.id="ikas-reviews-widget",typeof window!="undefined"&&window.__ikasPreviewMode&&(L.style.width="100%",L.style.maxWidth="100%",L.style.marginLeft="0",L.style.marginRight="0"),c){var B=document.createElement("div"),H=r.summaryLayout||"classic";B.className="ikr-title ikr-title-"+H,B.textContent=c,L.appendChild(B)}if(E){L.appendChild(ln(w.message,async function(){var P=await Me(Z,Q,1,Te,Le);await me(Z,I,P,be,Q,1,lr)})),S.appendChild(L);return}var J=w.data&&w.data.allCount||0,fe=w.data&&w.data.ratingCounts||null,ve=fe||[0,0,0,0,0],$=w.data&&w.data.avgRating||"0.0";if(!fe&&T.length>0){T.forEach(function(P){P.rating>=1&&P.rating<=5&&ve[P.rating-1]++});var U=T.reduce(function(P,N){return P+N.rating},0);$=(U/T.length).toFixed(1)}if(J>0){var F=xr(r.summaryLayout),ke=F.render({widget:L,data:w,settings:r,iconPair:g,allCount:J,ratingCounts:ve,avgRatingVal:$,currentRatingFilter:Te,currentOrderBy:Q,currentHasImages:Le,onFilterChange:async function(P){sr(Te===P?null:P),Re(1);var N=await Me(Z,Q,1,Te,Le);await me(Z,I,N,be,Q,1)},onSortChange:async function(P,N){Re(1),N?(Dr(!0),De("newest")):(Dr(!1),De(P));var M=await Me(Z,Q,1,Te,Le);await me(Z,I,M,be,Q,1)}});L.appendChild(ke)}else{var ge=document.createElement("button");ge.className="ikr-write-btn",ge.style.cssText="display:block;margin:16px auto 0;",ge.textContent=r.writeButtonText||"Yorum Yap",ge.onclick=G,L.appendChild(ge)}var W=(Fr||[]).filter(function(P){return ze(P).length>0});if(r.showPhotoGallery!==!1&&!Le&&W.length>0){var Se=document.createElement("div");if(Se.className="ikr-photo-section",r.showPhotoGalleryTitle!==!1){var He=(r.photoGalleryTitle||"").trim()||"Foto\u011Frafl\u0131 Yorumlar",he=document.createElement("div");he.className="ikr-photo-title",he.textContent=He,Se.appendChild(he)}var ie=r.reviewLayout==="card"?"1/1":"3/4";l.style.setProperty("--ikr-photo-thumb-aspect",ie);var j=document.createElement("div");j.className="ikr-photo-strip";var Ke=X,ae=r.reviewLayout==="card"?X:Math.round(X*4/3),Pe=0;W.forEach(function(P){if(!(Pe>=15)){var N=vr(P);if(N){var M=document.createElement("img"),Ne=se(N,X);M.src=Ne.src,M.srcset=Ne.srcset,M.loading=Pe<3?"eager":"lazy",M.decoding="async",M.width=Ke,M.height=ae,M.className="ikr-photo-strip-thumb",M.alt="Yorum foto\u011Fraf\u0131",de(M),(function(Xi,Ji){M.onclick=function(){pe(Ji,Xi,W)}})(N,P),j.appendChild(M),Pe++}}});var ye=document.createElement("button");ye.className="ikr-photo-strip-arrow ikr-photo-strip-arrow-prev",ye.innerHTML="&#8249;",ye.setAttribute("aria-label","\xD6nceki"),ye.onclick=function(){j.scrollBy({left:-200,behavior:"smooth"})};var re=document.createElement("button");re.className="ikr-photo-strip-arrow ikr-photo-strip-arrow-next",re.innerHTML="&#8250;",re.setAttribute("aria-label","Sonraki"),re.onclick=function(){j.scrollBy({left:200,behavior:"smooth"})};var ne=document.createElement("div");ne.className="ikr-photo-strip-wrap",ne.appendChild(ye),ne.appendChild(j),ne.appendChild(re),Se.appendChild(ne),L.appendChild(Se)}if(T.length===0){var _e=document.createElement("p");_e.className="ikr-state-msg",_e.textContent="Hen\xFCz yorum yok.",L.appendChild(_e)}else{var v=ir(r.reviewLayout);T.forEach(function(N){L.appendChild(v.render(N,Fe))})}var K=w.data&&w.data.hasMore;if(K){var R=document.createElement("button");R.className="ikr-load-more",R.textContent="Daha Fazla G\xF6ster",R.onclick=async function(){R.disabled=!0,R.textContent="Y\xFCkleniyor...";var P=Ze+1,N=await Me(Z,Q,P,Te,Le);if(N&&!dt(N)&&N.data&&Array.isArray(N.data.reviews)){Nt(N.data.reviews),Re(P);var M=ir(I.reviewLayout);N.data.reviews.forEach(function(Ne){L.insertBefore(M.render(Ne,Fe),R)}),N.data.hasMore?(R.disabled=!1,R.textContent="Daha Fazla G\xF6ster"):R.remove()}else R.disabled=!1,R.textContent="Tekrar Dene"},L.appendChild(R)}S.appendChild(L),Xt(J>0?$:null,h,a,lr)}catch(P){console.error("[ikr] render error:",P),S.innerHTML='<p style="text-align:center;color:#dc2626;">Yorumlar y\xFCklenirken bir hata olu\u015Ftu.</p>'}}finally{if(dr(!1),Xe){var oe=Xe;cr(null),me(oe.productId,oe.settings,oe.reviewsData,oe.productName,oe.orderBy,oe.page,oe.badgeSettings)}}}var dn=15,Ie="ikr_settings_"+D,cn=300*1e3,pn=10080*60*1e3,un=30*1e3;async function pt(){if(window.__ikasPreviewMode){try{var e=window.__ikasPreviewBaseUrl||V,r=window.__ikasPreviewSettings||sessionStorage.getItem("ikr_preview_settings")||"",t={};if(r)try{t=JSON.parse(r)}catch(c){}var a=await ee(e+"/api/preview/settings");if(a.ok){var i=await a.json();return i.widgets&&i.widgets.reviews&&Object.keys(t).length&&(i.widgets.reviews=Object.assign({},i.widgets.reviews,t)),i}}catch(c){}return null}var n=null,s=tr(Ie);if(s)try{var o=JSON.parse(s);if(o&&o.t!==void 0)if(o.notFound){if(Date.now()-o.t<un)return null;O(Ie,"")}else if(o.v){var d=Date.now()-o.t;if(d<cn)return o.v;d<pn?n=o.v:O(Ie,"")}else O(Ie,"");else O(Ie,"")}catch(c){O(Ie,"")}try{var p=await ee(V+"/api/public/settings?publicApiKey="+encodeURIComponent(D));if(!p.ok)return p.status===404&&O(Ie,JSON.stringify({t:Date.now(),notFound:!0})),n||null;var u=await p.json();return O(Ie,JSON.stringify({t:Date.now(),v:u})),u}catch(c){return console.error("[ikr] fetchSettings error:",c),n||null}}var mn=60*1e3,Ei="__ikrReviewsFetchError";function Cr(e){return{type:Ei,message:e||"Yorumlar \u015Fu anda y\xFCklenemiyor."}}function dt(e){return!!(e&&e.type===Ei)}async function Me(e,r,t,a,i,n){if(window.__ikasPreviewMode){try{var s=window.__ikasPreviewBaseUrl||V,o=s+"/api/preview/reviews?page="+encodeURIComponent(t||1),d=await ee(o);if(d.ok)return await d.json()}catch(y){}return Cr()}r=r||"newest",t=t||1;var p=n?"_l"+n:"",u="ikr_reviews_"+D+"_"+e+"_"+r+"_"+t+"_"+(a||"")+"_"+(i?"1":"0")+p,c=null,l=tr(u);if(l)try{var m=JSON.parse(l);if(m&&m.t!==void 0&&m.v){if(Date.now()-m.t<mn)return m.v;c=m.v,O(u,"")}else O(u,"")}catch(y){O(u,"")}try{var f=V+"/api/public/reviews?storeId="+encodeURIComponent(D)+"&productId="+encodeURIComponent(e)+"&orderBy="+encodeURIComponent(r)+"&page="+encodeURIComponent(t)+(a?"&rating="+encodeURIComponent(a):"")+(i?"&hasImages=true":"")+(n?"&limit="+encodeURIComponent(n):""),k=await ee(f);if(!k.ok)return c||Cr();var v=await k.json();return O(u,JSON.stringify({t:Date.now(),v})),v}catch(y){return console.error("[ikr] fetchReviews error:",y),c||Cr()}}async function fn(e){var r=await Me(e,"newest",1,null,!0,dn);return!r||!r.data||!Array.isArray(r.data.reviews)?[]:r.data.reviews}var ct={};async function Sr(e,r){var t=document.getElementById("ikr-rating-badge");t&&t.remove();var a=document.getElementById("ikr-jsonld");if(a&&a.remove(),!ct[e]){ct[e]=!0;var i={title:"M\xFC\u015Fteri Yorumlar\u0131",enabled:!0},n={enabled:!0,icon:"star",size:"medium",color:"#f59e0b"};try{var s=await pt();if(!s)return;var o=s.widgets&&s.widgets.reviews||i,d=s.widgets&&s.widgets.badge||n;if(o.enabled===!1)return;De("newest"),Re(1),sr(null);var p=await Promise.all([Me(e,"newest",1,null),fn(e)]),u=p[0];At(p[1]),await me(e,o,u,r,"newest",1,d)}catch(c){console.error("[ikr] bootstrap error:",c),await me(e,i,Cr(),r,void 0,void 0,n)}finally{delete ct[e]}}}function Ti(){var e={},r={};return document.querySelectorAll("a[href]").forEach(function(t){try{var a=t.getAttribute("href");if(!a||a.charAt(0)==="#"||a.charAt(0)==="?")return;var i=Y(t.href);if(!i||r[i]||!/^[a-z0-9][a-z0-9-]{2,}$/.test(i)||mr.test(i))return;r[i]=!0,e[i]=null}catch(n){}}),Object.keys(Je).forEach(function(t){e[t]=Je[t]}),e}var vn=300*1e3,Li=50;async function Ai(e){var r="ikr_ratings_"+D,t={},a=tr(r);if(a)try{var i=JSON.parse(a);i&&i.t!==void 0&&Date.now()-i.t<vn?t=i.v||{}:O(r,"")}catch(p){O(r,"")}var n=e.filter(function(p){return!t[p]});if(!n.length)return t;for(var s=[],o=0;o<n.length;o+=Li)s.push(n.slice(o,o+Li));var d=await Promise.all(s.map(function(p){var u=V+"/api/public/ratings-by-slug?storeId="+encodeURIComponent(D)+"&slugs="+p.map(encodeURIComponent).join(",");return ee(u).then(function(c){return c.ok?c.json().then(function(l){return l.data||{}}):{}}).catch(function(){return{}})}));return d.forEach(function(p){n.forEach(function(u){t[u]||(t[u]={average:0,count:0,_empty:!0})}),Object.keys(p).forEach(function(u){t[u]=p[u]})}),O(r,JSON.stringify({t:Date.now(),v:t})),t}var kn="var(--ikr-badge-color,#f59e0b)",Ii=13,gn="display:flex;align-items:center;gap:3px;margin-top:0px;margin-bottom:4px;font-size:13px;font-weight:400;color:#555;pointer-events:none;";function hn(e){var r=je("star","classic"),t="width:"+Ii+"px;height:"+Ii+"px;";return'<span style="color:'+kn+';display:inline-flex;align-items:center;">'+le(e,r,{sizeStyle:t})+"</span>"}function yn(){if(!document.getElementById("ikr-badge-styles")){var e=document.createElement("style");e.id="ikr-badge-styles",e.textContent=fr,document.head.appendChild(e)}}function ar(e,r){yn();var t=document.createElement("div");return t.setAttribute("data-ikr-listing-badge","1"),t.style.cssText=gn+"justify-content:"+(r||"flex-start")+";",t.innerHTML=hn(e.avg)+'<span style="font-weight:400;">'+e.avg+" ("+e.count+")</span>",t}var Pi='[class*="productTitle"],[class*="productName"],[class*="product_title"],[class*="product_name"],[class*="product-title"],[class*="product-name"]',bn=/^(tükendi|sold out|out of stock|stokta yok|satıldı|unavailable)$/i;function ut(e,r){var t=e.querySelector($t);if(t)return t;if(e.matches&&e.matches(Pi))return e;var a=e.querySelector(Pi);if(a)return a;if(r){for(var i=e.querySelectorAll("*"),n=0;n<i.length;n++)if(i[n].children.length===0&&i[n].textContent.trim()===r)return i[n]}for(var s=e.querySelectorAll("p, h1, h2, h3, h4, h5, h6, span, div"),o=0;o<s.length;o++){var d=s[o],p=d.textContent.trim();if(!(!p||p.length<2||p.length>150)&&!/^[\d\s.,₺$€£%]+$/.test(p)&&!bn.test(p)&&!(d.closest("figure")||d.closest("picture"))&&!(d.children.length>1))return d}return null}function wn(e,r,t,a){if(!e.getAttribute("data-ikr-badge")){var i=Y(e.href);if(e.id==="ikr-rating-badge"){e.setAttribute("data-ikr-badge","1");return}if(i===a&&e.getAttribute("href")&&e.getAttribute("href").charAt(0)==="#"){e.setAttribute("data-ikr-badge","1");return}if(e.closest("header")||e.closest("nav")){e.setAttribute("data-ikr-badge","1");return}if(e.closest('[class*="basket"]')||e.closest('[class*="cart"]')){e.setAttribute("data-ikr-badge","1");return}if(e.closest(Ge)&&!e.closest($r)){e.setAttribute("data-ikr-badge","1");return}if(i===a&&e.closest($r)){e.setAttribute("data-ikr-badge","1");return}if(e.closest(ri)){e.setAttribute("data-ikr-badge","1");return}var n=!!e.querySelector("a[href]"),s=Array.from(e.childNodes).filter(function(f){return f.nodeType===3}).map(function(f){return f.textContent.trim()}).join("").trim(),o=!!ut(e,t);if(!s&&!o&&!n){e.setAttribute("data-ikr-badge","1");return}if(e.setAttribute("data-ikr-badge","1"),n){e.querySelectorAll("a[href]").forEach(function(f){f.setAttribute("data-ikr-badge","1")});var d=ut(e,t);if(!d||d.querySelector("[data-ikr-listing-badge]"))return;var p=window.getComputedStyle(d).textAlign;d.appendChild(ar(r,p==="center"?"center":p==="right"?"flex-end":"flex-start"));return}var u=ut(e,t);if(!(u&&u.querySelector("[data-ikr-listing-badge]")))if(u){var c=window.getComputedStyle(u).textAlign;u.appendChild(ar(r,c==="center"?"center":c==="right"?"flex-end":"flex-start"))}else{var l=ar(r,"flex-start"),m=e.firstElementChild;m?e.insertBefore(l,m):e.appendChild(l)}}}function xn(e,r){var t=document.querySelector(Qt);if(t){var a=t.querySelector(ei);if(!(!a||a.querySelector("[data-ikr-listing-badge]"))){var i=null;if($e&&r[$e]&&(i=$e),!i){var n=Y(window.location.pathname);n&&r[n]&&(i=n)}if(!i){var s=a.textContent.trim();Object.keys(e).forEach(function(c){if(!i){var l=e[c];l&&l.trim()===s&&r[c]&&(i=c)}})}if(!i){var o=document.querySelector(Ge);if(o){var d=o.querySelector("a[href]");if(d){var p=Y(d.href);p&&r[p]&&(i=p)}}}if(!i){var u=a.textContent.trim().toLowerCase();document.querySelectorAll("a[href]").forEach(function(c){if(!i&&!(c.closest("header")||c.closest("nav"))&&!c.closest(Ge)){var l=c.textContent.trim().toLowerCase();if(l&&l===u){var m=Y(c.href);m&&r[m]&&(i=m)}}})}!i||!r[i]||r[i]._empty||r[i].count===0||a.appendChild(ar(r[i],"flex-start"))}}}function _i(e,r){var t=Y(window.location.pathname),a=document.querySelectorAll(ti),i=[];a.forEach(function(n){n.tagName==="A"&&n.href?i.push(n):n.querySelectorAll("a[href]").forEach(function(s){i.push(s)})}),Object.keys(e).forEach(function(n){var s=r[n];if(!(!s||s._empty||s.count===0)){var o=e[n];i.forEach(function(d){Y(d.href)===n&&wn(d,s,o,t)})}}),xn(e,r)}async function Oe(){if(_.inProgress){_.queued=!0;return}if(!_.rendered){_.rendered=!0,_.inProgress=!0;try{var e=_.navCleanup;e&&(_.navCleanup=!1);var r=Ti();if(!Object.keys(r).length){_.rendered=!1;return}var t=await Promise.all([pt(),Ai(Object.keys(r))]),a=t[0];if(!a){_.rendered=!1;return}var i=t[1],n=a&&a.widgets||{},s=n.badge&&n.badge.color||"#f59e0b";if(n.badge&&n.badge.enabled===!1){_.rendered=!1;return}document.documentElement.style.setProperty("--ikr-badge-color",s),e&&(document.querySelectorAll("[data-ikr-listing-badge]").forEach(function(o){o.remove()}),document.querySelectorAll("[data-ikr-badge]").forEach(function(o){o.removeAttribute("data-ikr-badge")})),_i(r,i)}finally{_.inProgress=!1,_.queued&&(_.queued=!1,_.rendered=!1,Oe())}}}var Ni=null;function Ri(){if(typeof MutationObserver!="undefined"){var e=new MutationObserver(function(r){var t=r.some(function(a){return Array.from(a.addedNodes).some(function(i){return!(i.nodeType!==1||i.hasAttribute&&(i.hasAttribute("data-ikr-listing-badge")||i.id==="ikr-rating-badge"||i.id==="ikr-reviews-widget")||i.closest&&(i.closest("[data-ikr-listing-badge]")||i.closest("#ikr-rating-badge")||i.closest("#ikr-reviews-widget"))||i.querySelector&&i.querySelector("[data-ikr-listing-badge],#ikr-reviews-widget,#ikr-rating-badge"))})});t&&(clearTimeout(Ni),Ni=setTimeout(function(){var a=Array.from(document.querySelectorAll("a[href]")).some(function(i){if(i.getAttribute("data-ikr-badge"))return!1;var n=Y(i.href);return n&&n.length>=3&&!mr.test(n)});a&&(_.rendered=!1,Oe())},300))});e.observe(document.body,{childList:!0,subtree:!0})}}var mt=Object.freeze({PAGE_VIEW:"PAGE_VIEW",PRODUCT_VIEW:"PRODUCT_VIEW",LISTING_VIEW:"VIEW_LISTING"}),Bi=!1,Er=!1,ft=null,Tr=null,Hi=[],Fi=[];function Di(){Bi||(Bi=!0,zn(),Sn())}function ji(e){if(typeof e=="function"&&(Hi.push(e),ft))try{e(ft)}catch(r){console.error("[ikr] onProductView replay error:",r)}}function Vi(e){if(typeof e=="function"&&(Fi.push(e),Tr))try{e(Tr)}catch(r){console.error("[ikr] onPageView replay error:",r)}}function zn(){if(!Er){if(window.IkasEvents){Er=!0,window.IkasEvents.subscribe({id:"ikas-reviews-widget",callback:Mi});return}var e=0;(function r(){Er||(window.IkasEvents?(Er=!0,window.IkasEvents.subscribe({id:"ikas-reviews-widget",callback:Mi})):e<100&&(e++,setTimeout(r,50)))})()}}function Mi(e){if(e){if(e.type===mt.LISTING_VIEW){var r=e.data&&e.data.productDetails;Array.isArray(r)&&r.forEach(function(s){s&&s.metaData&&s.metaData.slug&&s.name&&(Je[s.metaData.slug]=s.name)});return}if(e.type===mt.PRODUCT_VIEW){var t=e.data&&e.data.productDetail,a=t&&t.id,i=t&&t.name;a&&(O("ikr_reviews_"+D+"_"+a,""),vt({id:a,name:i||null}));return}if(e.type===mt.PAGE_VIEW){var n=Date.now();if(_.lastPageView&&n-_.lastPageView<800)return;_.lastPageView=n,Tr={pageType:e.data&&e.data.pageType||null},Cn(Tr);return}}}function vt(e){ft=e,Hi.forEach(function(r){try{r(e)}catch(t){console.error("[ikr] onProductView callback error:",t)}})}function Cn(e){Fi.forEach(function(r){try{r(e)}catch(t){console.error("[ikr] onPageView callback error:",t)}})}function Sn(){var e=Oi();if(e){vt(e);return}var r=0;(function t(){var a=Oi();a?vt(a):r<20&&(r++,setTimeout(t,100))})()}function Oi(){try{var e=window.__NEXT_DATA__&&window.__NEXT_DATA__.props&&window.__NEXT_DATA__.props.pageProps;if(e&&e.pageType==="PRODUCT"&&e.pageSpecificData&&e.pageSpecificData.id)return{id:e.pageSpecificData.id,name:e.pageSpecificData.name||null}}catch(a){}if(window.IkasStorefront&&window.IkasStorefront.product&&window.IkasStorefront.product.id)return{id:window.IkasStorefront.product.id,name:window.IkasStorefront.product.name||null};var r=window.location.pathname.match(/--([a-f0-9-]{36})(?:\/|$|\?)/);if(r)return{id:r[1],name:null};var t=new URLSearchParams(window.location.search).get("productId");return t?{id:t,name:null}:null}var nr=[];function kt(e){if(!(!e||typeof e.key!="string")&&!(typeof e.detect!="function"||typeof e.mount!="function")){for(var r=0;r<nr.length;r++)if(nr[r].key===e.key)return;nr.push(e)}}function gt(e){for(var r=0;r<nr.length;r++){var t=nr[r],a=!1;try{a=!!t.detect(e)}catch(i){console.error("[ikr] surface detect error ("+t.key+"):",i);continue}if(a)try{t.mount(e)}catch(i){console.error("[ikr] surface mount error ("+t.key+"):",i)}}}var Yi={key:"reviews-main",detect:function(e){return e.trigger==="product"&&!!(e.product&&e.product.id)},mount:function(e){Sr(e.product.id,e.product.name)}};var Gi={key:"listing-badge",detect:function(e){return e.trigger==="page"},mount:function(){_.navCleanup=!0,_.rendered=!1,Oe()}};function qi(){kt(Yi),kt(Gi)}function Ui(){qi(),Di(),jt(),Dt(),Ri(),ji(function(e){gt({trigger:"product",product:e})}),Vi(function(e){gt({trigger:"page",pageType:e.pageType})}),setTimeout(function(){_.rendered||Oe()},2e3)}function Ki(){document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Ui):Ui()}function En(e){var r=e.data;if(!(!r||r.type!=="IKR_SETTINGS_UPDATE")){var t=r.settings;if(!(!t||!I)){var a=Object.assign({},I,t);me(Z,a,Hr,be,Q,Ze),window.dispatchEvent(new CustomEvent("IKR_SETTINGS_UPDATED_PREVIEW",{detail:{settings:a}}))}}}function Wi(){Sr("mock-product","\xD6rnek \xDCr\xFCn");try{window.parent.postMessage({type:"IKR_WIDGET_READY"},"*")}catch(e){}}function Zi(){window.addEventListener("message",En),document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Wi):Wi()}Br();zt();window.__ikasPreviewMode===!0?Zi():D&&Ki();})();
