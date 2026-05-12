/* ikas Reviews Widget — built 2026-05-12T00:30:25.832Z | theme: default */
"use strict";(()=>{var xi=Object.defineProperty;var Te=(e,r)=>{for(var t in r)xi(e,t,{get:r[t],enumerable:!0})};var zi=typeof document!="undefined",at=zi?document.currentScript||(function(){for(var e=document.getElementsByTagName("script"),r=e.length-1;r>=0;r--)if(e[r].src&&e[r].src.indexOf("/widget.js")!==-1)return e[r];return e[e.length-1]})():null,Sr=at?at.src:"",Ci=new URLSearchParams(Sr.split("?")[1]||""),F=Ci.get("publicApiKey"),q=Sr?Sr.split("?")[0].replace(/\/widget\.js$/,""):"";var nt=typeof window!="undefined";if(nt&&q){let e=function(i,a){return!!(i&&i.indexOf("/widget.js")!==-1||a&&a.indexOf("widget.js")!==-1)},r=function(i,a){if(Tr>=ot)return!1;var s=Date.now();if(s-Lr<lt)return!1;var o=String(i)+"|"+String(a||"").slice(0,200);return Ar[o]?!1:(Ar[o]=!0,Lr=s,Tr+=1,!0)},t=function(i){try{var a=JSON.stringify(i);if(typeof navigator!="undefined"&&typeof navigator.sendBeacon=="function"){var s=new Blob([a],{type:"application/json"});navigator.sendBeacon(Er,s);return}typeof fetch=="function"&&fetch(Er,{method:"POST",headers:{"Content-Type":"application/json"},body:a,keepalive:!0}).catch(function(){})}catch(o){}},n=function(i,a,s){return{message:String(i||"unknown").slice(0,500),stack:a?String(a).slice(0,4e3):void 0,url:nt&&window.location?String(window.location.href).slice(0,2e3):void 0,userAgent:typeof navigator!="undefined"?String(navigator.userAgent||"").slice(0,500):void 0,publicApiKey:F||null,timestamp:Date.now(),extra:s||void 0}};Si=e,Ei=r,Ti=t,Li=n,Er=q+"/api/public/widget-error",ot=5,lt=2e3,Tr=0,Lr=0,Ar={},window.addEventListener("error",function(i){if(i){var a=i.filename||i.error&&i.error.fileName||"",s=i.error&&i.error.stack;if(e(a,s)){var o=i.message||i.error&&i.error.message||"window.onerror";r(o,s)&&t(n(o,s,{type:"error",filename:a||void 0,lineno:i.lineno||void 0,colno:i.colno||void 0}))}}}),window.addEventListener("unhandledrejection",function(i){if(i){var a=i.reason,s=a&&a.stack,o=a&&a.fileName||"";if(e(o,s)){var d=a&&a.message||String(a||"unhandled rejection");r(d,s)&&t(n(d,s,{type:"unhandledrejection"}))}}})}var Er,ot,lt,Tr,Lr,Ar,Si,Ei,Ti,Li;var $="newest",Je=1,Le=null,Ae=!1,Z=null,I=null,lr=null,we=null,Ir=null,De=[],Pr=[];function je(e){$=e}function Re(e){Je=e}function sr(e){Le=e}function Nr(e){Ae=e}function st(e){Z=e}function dt(e){I=e}function ct(e){lr=e}function pt(e){we=e}function ut(e){Ir=e}function mt(e){Pr=Array.isArray(e)?e:[]}function Ai(e){return!e||typeof e!="object"?"":e.id!==void 0&&e.id!==null?"id:"+String(e.id):e._id!==void 0&&e._id!==null?"_id:"+String(e._id):""}function ft(e){var r=Array.isArray(e)?e:[],t={},n=[];return r.forEach(function(i){if(i){var a=Ai(i);a&&t[a]||(a&&(t[a]=!0),n.push(i))}}),n}function vt(e){De.length=0,e.forEach(function(r){De.push(r)})}function gt(e){vt(ft(e))}function kt(e){vt(ft(De.concat(Array.isArray(e)?e:[])))}var _r=!1,$e=null;function dr(e){_r=e}function cr(e){$e=e}var N={rendered:!1,inProgress:!1,queued:!1,navCleanup:!1,lastPageView:0},Qe={},er=null;function ht(e){er=e}var yt={};function rr(e){try{return sessionStorage.getItem(e)}catch(r){return yt[e]||null}}function H(e,r){try{sessionStorage.setItem(e,r)}catch(t){yt[e]=r}}var Be="0 -960 960 960",G="0 0 256 256",ee={starFill:"m233-120 65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z",starOutline:"m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-355Z",starRounded:"M480-269 314-169q-11 7-23 6t-21-8q-9-7-14-17.5t-2-23.5l44-189-147-127q-10-9-12.5-20.5T140-571q4-11 12-18t22-9l194-17 75-178q5-12 15.5-18t21.5-6q11 0 21.5 6t15.5 18l75 178 194 17q14 2 22 9t12 18q4 11 1.5 22.5T809-528L662-401l44 189q3 13-2 23.5T690-171q-9 7-21 8t-23-6L480-269Z",starRoundedOutline:"m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143Zm126 18L314-169q-11 7-23 6t-21-8q-9-7-14-17.5t-2-23.5l44-189-147-127q-10-9-12.5-20.5T140-571q4-11 12-18t22-9l194-17 75-178q5-12 15.5-18t21.5-6q11 0 21.5 6t15.5 18l75 178 194 17q14 2 22 9t12 18q4 11 1.5 22.5T809-528L662-401l44 189q3 13-2 23.5T690-171q-9 7-21 8t-23-6L480-269Zm0-201Z",boxSquare:"M160-80h640q33 0 56.5-23.5T880-160v-640q0-33-23.5-56.5T800-880H160q-33 0-56.5 23.5T80-800v640q0 33 23.5 56.5T160-80Z",boxSquareOutline:"M200-200h560v-560H200v560Zm0 80q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Z",phLeafFill:"M223.45,40.07a8,8,0,0,0-7.52-7.52C139.8,28.08,78.82,51,52.82,94a87.09,87.09,0,0,0-12.76,49A101.72,101.72,0,0,0,46.7,175.2a4,4,0,0,0,6.61,1.43l85-86.3a8,8,0,0,1,11.32,11.32L56.74,195.94,42.55,210.13a8.2,8.2,0,0,0-.6,11.1,8,8,0,0,0,11.71.43l16.79-16.79c14.14,6.84,28.41,10.57,42.56,11.07q1.67.06,3.33.06A86.93,86.93,0,0,0,162,203.18C205,177.18,227.93,116.21,223.45,40.07Z",phLeafRegular:"M223.45,40.07a8,8,0,0,0-7.52-7.52C139.8,28.08,78.82,51,52.82,94a87.09,87.09,0,0,0-12.76,49c.57,15.92,5.21,32,13.79,47.85l-19.51,19.5a8,8,0,0,0,11.32,11.32l19.5-19.51C81,210.73,97.09,215.37,113,215.94q1.67.06,3.33.06A86.93,86.93,0,0,0,162,203.18C205,177.18,227.93,116.21,223.45,40.07ZM153.75,189.5c-22.75,13.78-49.68,14-76.71.77l88.63-88.62a8,8,0,0,0-11.32-11.32L65.73,179c-13.19-27-13-54,.77-76.71,22.09-36.47,74.6-56.44,141.31-54.06C210.2,114.89,190.22,167.41,153.75,189.5Z",phHeartFill:"M240,102c0,70-103.79,126.66-108.21,129a8,8,0,0,1-7.58,0C119.79,228.66,16,172,16,102A62.07,62.07,0,0,1,78,40c20.65,0,38.73,8.88,50,23.89C139.27,48.88,157.35,40,178,40A62.07,62.07,0,0,1,240,102Z",phHeartRegular:"M178,40c-20.65,0-38.73,8.88-50,23.89C116.73,48.88,98.65,40,78,40a62.07,62.07,0,0,0-62,62c0,70,103.79,126.66,108.21,129a8,8,0,0,0,7.58,0C136.21,228.66,240,172,240,102A62.07,62.07,0,0,0,178,40ZM128,214.8C109.74,204.16,32,155.69,32,102A46.06,46.06,0,0,1,78,56c19.45,0,35.78,10.36,42.6,27a8,8,0,0,0,14.8,0c6.82-16.67,23.15-27,42.6-27a46.06,46.06,0,0,1,46,46C224,155.61,146.24,204.15,128,214.8Z",phCrownFill:"M239.75,90.81c0,.11,0,.21-.07.32L217,195a16,16,0,0,1-15.72,13H54.71A16,16,0,0,1,39,195L16.32,91.13c0-.11-.05-.21-.07-.32A16,16,0,0,1,44,77.39l33.67,36.29,35.8-80.29a1,1,0,0,0,0-.1,16,16,0,0,1,29.06,0,1,1,0,0,0,0,.1l35.8,80.29L212,77.39a16,16,0,0,1,27.71,13.42Z",phCrownRegular:"M230.9,73.6A15.85,15.85,0,0,0,212,77.39l-33.67,36.29-35.8-80.29a1,1,0,0,1,0-.1,16,16,0,0,0-29.06,0,1,1,0,0,1,0,.1l-35.8,80.29L44,77.39A16,16,0,0,0,16.25,90.81c0,.11,0,.21.07.32L39,195a16,16,0,0,0,15.72,13H201.29A16,16,0,0,0,217,195L239.68,91.13c0-.11,0-.21.07-.32A15.85,15.85,0,0,0,230.9,73.6ZM201.35,191.68l-.06.32H54.71l-.06-.32L32,88l.14.16,42,45.24a8,8,0,0,0,13.18-2.18L128,40l40.69,91.25a8,8,0,0,0,13.18,2.18l42-45.24L224,88Z",phLeafBold:"M227.42,39.86a12,12,0,0,0-11.28-11.28c-39.6-2.33-74.59,2.34-104,13.87C84,53.48,62.31,70.58,49.39,91.9c-17.62,29.11-17.66,64.45-.45,98.19L31.51,207.52a12,12,0,0,0,17,17l17.43-17.43c16.74,8.54,33.88,12.85,50.45,12.85a91.31,91.31,0,0,0,47.74-13.3c21.32-12.92,38.42-34.62,49.45-62.75C225.08,114.46,229.75,79.46,227.42,39.86ZM151.66,186.08C131.57,198.25,108,199.17,83.94,189l84.54-84.54a12,12,0,1,0-17-17L67,172.06c-10.14-24-9.22-47.63,3-67.72,20.91-34.53,70.54-53.72,134-52.25C205.38,115.53,186.19,165.17,151.66,186.08Z",phDiamondFill:"M246,98.73l-56-64A8,8,0,0,0,184,32H72a8,8,0,0,0-6,2.73l-56,64a8,8,0,0,0,.17,10.73l112,120a8,8,0,0,0,11.7,0l112-120A8,8,0,0,0,246,98.73ZM222.37,96H180L144,48h36.37ZM75.63,48H112L76,96H33.63Z"};function pr(e){return'<svg viewBox="'+Be+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="'+e+'"/></svg>'}var bt={star:{label:"Y\u0131ld\u0131z",styles:{rounded:{label:"Tombul (Google)",filled:'<svg viewBox="'+Be+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g transform="translate(-48, 48) scale(1.1)"><path d="'+ee.starRounded+'"/></g></svg>',empty:'<svg viewBox="'+Be+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g transform="translate(-48, 48) scale(1.1)"><path d="'+ee.starRoundedOutline+'"/></g></svg>'},classic:{label:"Klasik (Google)",filled:'<svg viewBox="'+Be+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g transform="translate(-48, 48) scale(1.1)"><path d="'+ee.starFill+'"/></g></svg>',empty:'<svg viewBox="'+Be+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g transform="translate(-48, 48) scale(1.1)"><path d="'+ee.starOutline+'"/></g></svg>'},boxed:{label:"Kare (Google)",filled:'<svg viewBox="'+Be+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="'+ee.boxSquare+'"/><g transform="translate(120, -120) scale(0.75)" fill="white"><path d="'+ee.starFill+'"/></g></svg>',empty:'<svg viewBox="'+Be+'" fill="currentColor" opacity="0.35" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="'+ee.boxSquare+'"/><g transform="translate(120, -120) scale(0.75)" fill="white"><path d="'+ee.starFill+'"/></g></svg>'}}},favorite:{label:"Kalp",styles:{modern:{label:"Modern (Phosphor)",filled:'<svg viewBox="'+G+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="'+ee.phHeartFill+'"/></svg>',empty:'<svg viewBox="'+G+'" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M128,224S24,168,24,102A54,54,0,0,1,78,48c22.59,0,41.94,12.31,50,32,8.06-19.69,27.41-32,50-32a54,54,0,0,1,54,54C232,168,128,224,128,224Z"/></svg>'}}},leaf:{label:"Yaprak",styles:{phosphor:{label:"Modern (Phosphor)",filled:'<svg viewBox="'+G+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="'+ee.phLeafFill+'"/></svg>',empty:'<svg viewBox="'+G+'" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M63.81,192.19c-47.89-79.81,16-159.62,151.64-151.64C223.43,176.23,143.62,240.08,63.81,192.19Z"/><line x1="160" y1="96" x2="40" y2="216"/></svg>'}}},crown:{label:"Ta\xE7",styles:{modern:{label:"Modern (Phosphor)",filled:'<svg viewBox="'+G+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="'+ee.phCrownFill+'"/></svg>',empty:'<svg viewBox="'+G+'" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M54.71,200H201.29a8,8,0,0,0,7.88-6.61l22.7-104A8,8,0,0,0,218,82.76L176,128,135.26,36.65a8,8,0,0,0-14.52,0L80,128,38,82.76a8,8,0,0,0-13.9,6.66l22.7,104A8,8,0,0,0,54.71,200Z"/></svg>'}}},diamond:{label:"Elmas",styles:{sketch:{label:"M\xFCcevher (Sketch)",filled:'<svg viewBox="'+G+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M246,98.73l-56-64A8,8,0,0,0,184,32H72a8,8,0,0,0-6,2.73l-56,64a8,8,0,0,0,.17,10.73l112,120a8,8,0,0,0,11.7,0l112-120A8,8,0,0,0,246,98.73ZM222.37,96H180L144,48h36.37ZM75.63,48H112L76,96H33.63Z"/></svg>',empty:'<svg viewBox="'+G+'" fill="none" stroke="currentColor" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M246,98.73l-56-64A8,8,0,0,0,184,32H72a8,8,0,0,0-6,2.73l-56,64a8,8,0,0,0,.17,10.73l112,120a8,8,0,0,0,11.7,0l112-120A8,8,0,0,0,246,98.73ZM222.37,96H180L144,48h36.37ZM75.63,48H112L76,96H33.63Z"/></svg>'}}},paw:{label:"Pati",styles:{phosphor:{label:"Modern (Phosphor)",filled:'<svg viewBox="'+G+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M240,108a28,28,0,1,1-28-28A28,28,0,0,1,240,108ZM72,108a28,28,0,1,0-28,28A28,28,0,0,0,72,108ZM92,88A28,28,0,1,0,64,60,28,28,0,0,0,92,88Zm72,0a28,28,0,1,0-28-28A28,28,0,0,0,164,88Zm23.12,60.86a35.3,35.3,0,0,1-16.87-21.14,44,44,0,0,0-84.5,0A35.25,35.25,0,0,1,69,148.82,40,40,0,0,0,88,224a39.48,39.48,0,0,0,15.52-3.13,64.09,64.09,0,0,1,48.87,0,40,40,0,0,0,34.73-72Z"/></svg>',empty:'<svg viewBox="'+G+'" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><circle cx="212" cy="108" r="20"/><circle cx="44" cy="108" r="20"/><circle cx="92" cy="60" r="20"/><circle cx="164" cy="60" r="20"/><path d="M128,104A36,36,0,0,0,93.43,130a43.49,43.49,0,0,1-20.67,25.9,32,32,0,0,0,27.73,57.62,72.49,72.49,0,0,1,55,0,32,32,0,0,0,27.73-57.62A43.46,43.46,0,0,1,162.57,130,36,36,0,0,0,128,104Z"/></svg>'}}},clover:{label:"Yonca",styles:{phosphor:{label:"Modern (Phosphor)",filled:'<svg viewBox="'+G+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M228,120c0,22.63-6,36.72-17.93,41.87a27.3,27.3,0,0,1-11,2.13,41.75,41.75,0,0,1-8.4-.93,4.05,4.05,0,0,1-2.52-1.64,368.49,368.49,0,0,0-47.75-55.26,8,8,0,0,0-11,11.62c14.84,13.91,64.13,63.49,78.32,120.27a8,8,0,0,1-5.82,9.7A8.13,8.13,0,0,1,200,248a8,8,0,0,1-7.75-6.06c-4.12-16.47-11.65-32.48-20.46-47.09a25.85,25.85,0,0,1-1.9,7.21C164.72,214,150.63,220,128,220s-36.72-6-41.88-17.94c-5.45-12.58-.39-30.82,15-54.21.68-1,1.36-2,2-3l-3,2C82.84,158.27,68.35,164,56.89,164a27.3,27.3,0,0,1-11-2.13C34,156.72,28,142.63,28,120s6-36.72,17.93-41.88c12.59-5.45,30.83-.39,54.22,15l3,2q-1-1.5-2-3c-15.41-23.39-20.47-41.63-15-54.22C91.28,26,105.37,20,128,20s36.72,6,41.88,17.93c5.45,12.59.39,30.83-15,54.22q-1,1.53-2,3l3-2c23.39-15.41,41.63-20.47,54.22-15C222,83.28,228,97.37,228,120Z"/></svg>',empty:'<svg viewBox="'+G+'" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M228,120c0,22.63-6,36.72-17.93,41.87a27.3,27.3,0,0,1-11,2.13,41.75,41.75,0,0,1-8.4-.93,4.05,4.05,0,0,1-2.52-1.64,368.49,368.49,0,0,0-47.75-55.26,8,8,0,0,0-11,11.62c14.84,13.91,64.13,63.49,78.32,120.27a8,8,0,0,1-5.82,9.7A8.13,8.13,0,0,1,200,248a8,8,0,0,1-7.75-6.06c-4.12-16.47-11.65-32.48-20.46-47.09a25.85,25.85,0,0,1-1.9,7.21C164.72,214,150.63,220,128,220s-36.72-6-41.88-17.94c-5.45-12.58-.39-30.82,15-54.21.68-1,1.36-2,2-3l-3,2C82.84,158.27,68.35,164,56.89,164a27.3,27.3,0,0,1-11-2.13C34,156.72,28,142.63,28,120s6-36.72,17.93-41.88c12.59-5.45,30.83-.39,54.22,15l3,2q-1-1.5-2-3c-15.41-23.39-20.47-41.63-15-54.22C91.28,26,105.37,20,128,20s36.72,6,41.88,17.93c5.45,12.59.39,30.83-15,54.22q-1,1.53-2,3l3-2c23.39-15.41,41.63-20.47,54.22-15C222,83.28,228,97.37,228,120Z"/></svg>'}}},coffee:{label:"Kahve",styles:{phosphor:{label:"Modern (Phosphor)",filled:'<svg viewBox="'+G+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M208,80H32a8,8,0,0,0-8,8v48a96.3,96.3,0,0,0,32.54,72H32a8,8,0,0,0,0,16H208a8,8,0,0,0,0-16H183.46a96.59,96.59,0,0,0,27-40.09A40,40,0,0,0,248,128v-8A40,40,0,0,0,208,80Zm24,48a24,24,0,0,1-17.2,23,95.78,95.78,0,0,0,1.2-15V97.38A24,24,0,0,1,232,120ZM112,56V24a8,8,0,0,1,16,0V56a8,8,0,0,1-16,0Zm32,0V24a8,8,0,0,1,16,0V56a8,8,0,0,1-16,0ZM80,56V24a8,8,0,0,1,16,0V56a8,8,0,0,1-16,0Z"/></svg>',empty:'<svg viewBox="'+G+'" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M83.3,216A88,88,0,0,1,32,136V88H208v48a88,88,0,0,1-51.3,80"/><line x1="32" y1="216" x2="208" y2="216"/><path d="M208,88h4a32,32,0,0,1,32,32v8a32,32,0,0,1-32,32h-7.38"/><line x1="80" y1="24" x2="80" y2="48"/><line x1="120" y1="24" x2="120" y2="48"/><line x1="160" y1="24" x2="160" y2="48"/></svg>'}}}};function Ii(e){var r=String(e||"star"),t=r.indexOf(":");return t===-1?{type:r,style:null}:{type:r.slice(0,t),style:r.slice(t+1)}}function tr(e,r){var t=bt[e]||bt.star,n=t.styles;return n[r]||n[Object.keys(n)[0]]}function Me(e){var r=e&&e.reviewIcon||"star",t=Ii(r),n=t.style||e&&e.reviewIconStyle||"classic";return tr(t.type,n)}function xt(e,r,t){for(var n=Math.round(parseFloat(e))||0,i=Me(r),a=t&&t.sizePx,s=a?"width:"+a+"px;height:"+a+"px;":"",o="",d=1;d<=5;d++){var c=d<=n;o+='<span class="ikr-icon '+(c?"ikr-icon-filled":"ikr-icon-empty")+'" style="'+s+'">'+(c?i.filled:i.empty)+"</span>"}return o}var ur={lines:"M400-240v-80h160v80H400ZM240-440v-80h480v80H240ZM120-640v-80h720v80H120Z",linesAlt:"M440-160v-160h80v40h360v80H520v40h-80Zm-360-80v-80h280v80H80Zm200-160v-80H80v-80h200v-80h80v240h-80Zm160-80v-80h440v80H440Zm160-160v-160h80v40h120v80H680v40h-80Zm-520-80v-80h440v80H80Z",funnel:"M440-160q-17 0-28.5-11.5T400-200v-240L168-736q-15-20-4.5-42t36.5-22h560q26 0 36.5 22t-4.5 42L560-440v240q0 17-11.5 28.5T520-160h-80Z",dense:"M120-160v-80h720v80H120Zm0-160v-80h720v80H120Zm0-160v-80h720v80H120Zm0-160v-80h720v80H120Z"},wt={lines:{label:"\xC7izgili",svg:pr(ur.lines)},linesAlt:{label:"\xC7izgili (Alt)",svg:pr(ur.linesAlt)},funnel:{label:"Huni",svg:pr(ur.funnel)},dense:{label:"Yo\u011Fun \xC7izgili",svg:pr(ur.dense)}};function zt(e){var r=wt[e]||wt.lines;return r.svg}var Pi="var(--ikr-review-star-color,#f59e0b)";var mr=/^(account|pages|blog|search|cart|checkout|siparis|odeme|kategori|category|urun|products?)/;function j(e){try{return new URL(e,window.location.origin).pathname.replace(/^\//,"").split("?")[0].split("/")[0]}catch(r){return""}}function xe(e,r){var t="color:"+Pi+";display:inline-flex;gap:2px;align-items:center;";return'<span class="ikr-stars" style="'+t+'">'+xt(e,r)+"</span>"}function oe(e,r,t){for(var n=Math.max(0,Math.min(5,parseFloat(e)||0)),i=Math.floor(n),a=n-i,s=a<.25?i:a<.75?i+.5:i+1,o=t&&t.sizeStyle||"",d="",c=1;c<=5;c++){var u=c<=s?"full":c-.5===s?"half":"empty";u==="full"?d+='<span class="ikr-star ikr-star-full" style="'+o+'">'+r.filled+"</span>":u==="empty"?d+='<span class="ikr-star ikr-star-empty" style="'+o+'">'+r.empty+"</span>":d+='<span class="ikr-star ikr-star-half" style="'+o+'"><span class="ikr-star-half-bg">'+r.empty+'</span><span class="ikr-star-half-fg">'+r.filled+"</span></span>"}return'<span class="ikr-stars-partial">'+d+"</span>"}function ze(e){return e?new Date(e).toLocaleDateString("tr-TR",{year:"numeric",month:"long",day:"numeric"}):""}function Ct(e,r){var t=document.getElementById("ikr-styles");t||(t=document.createElement("style"),t.id="ikr-styles",document.head.appendChild(t)),t.textContent=r}var Ni={jpg:!0,jpeg:!0,png:!0,webp:!0,gif:!0,avif:!0};function _i(e){var r=typeof e=="string"?e.trim():"";return/^[A-Za-z0-9_-]+$/.test(r)?r:""}var Rr=_i("dtn7jhhuy");Rr||console.error("[ikr] NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME is missing at build time; review images will be hidden until widget is rebuilt with a valid cloud name.");function Ri(e){return typeof window!="undefined"&&window.__ikasPreviewMode===!0&&e.protocol==="https:"&&e.hostname==="placehold.co"&&!e.search&&!e.hash&&/\.(png|jpe?g|webp|gif|avif)$/i.test(e.pathname)}function Br(e){if(typeof e!="string")return!1;var r=e.trim();if(!r||r.length>2048)return!1;var t;try{t=new URL(r)}catch(d){return!1}if(Ri(t))return!0;if(!Rr||t.protocol!=="https:"||t.hostname!=="res.cloudinary.com"||t.username||t.password||t.port||t.search||t.hash)return!1;var n=t.pathname.toLowerCase();if(n.indexOf("%2f")!==-1||n.indexOf("%5c")!==-1)return!1;var i=t.pathname.split("/").filter(Boolean);if(i.length<6||i[0]!==Rr||i[1]!=="image"||i[2]!=="upload"||!/^v\d+$/.test(i[3])||i[4]!=="review_images")return!1;for(var a=5;a<i.length;a++)if(i[a]==="."||i[a]==="..")return!1;var s=i[i.length-1],o=s.lastIndexOf(".");return o===-1?!1:!!Ni[s.slice(o+1).toLowerCase()]}function Ce(e){var r=e&&e.images&&Array.isArray(e.images)?e.images:[],t=[];return r.forEach(function(n){if(Br(n)){var i=n.trim();t.indexOf(i)===-1&&t.push(i)}}),t}function fr(e){var r=Ce(e);return r.length?r[0]:null}var W=300,vr=600,gr=200,ar=1200;function ir(e,r){if(!e||e.indexOf("res.cloudinary.com")===-1)return e;var t=typeof r=="number"&&r>0?Math.round(r):ar;return e.replace("/upload/","/upload/q_auto/f_auto/c_scale,w_"+t+"/")}function le(e,r){if(!e)return{src:"",srcset:""};var t=typeof r=="number"&&r>0?Math.round(r):ar,n=t*2,i=ir(e,t),a=ir(e,n);return{src:i,srcset:i+" 1x, "+a+" 2x"}}function Mr(e,r){if(!e||typeof e.addEventListener!="function")return;var t=!1;function n(){if(!t){t=!0,e.removeEventListener("error",n);var i=e.currentSrc||e.getAttribute("src")||"";if(console.warn("[ikr] image failed to load:",i),typeof r=="function")try{r(e)}catch(a){}}}e.addEventListener("error",n),e.complete&&e.naturalWidth===0&&(e.currentSrc||e.getAttribute("src"))&&n()}function se(e){Mr(e,function(r){r.style.display="none"})}function re(e,r,t){var n=new AbortController,i=setTimeout(function(){n.abort()},t||8e3);return fetch(e,Object.assign({},r,{signal:n.signal})).finally(function(){clearTimeout(i)})}function Ye(e){return Ce(e)}function Bi(){var e=document.body.style,r=document.documentElement.style;return{scrollX:window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft||0,scrollY:window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0,fixedBodyLock:!1,bodyOverflow:e.getPropertyValue("overflow"),bodyOverflowPriority:e.getPropertyPriority("overflow"),bodyPaddingRight:e.getPropertyValue("padding-right"),bodyPaddingRightPriority:e.getPropertyPriority("padding-right"),bodyPosition:e.getPropertyValue("position"),bodyPositionPriority:e.getPropertyPriority("position"),bodyTop:e.getPropertyValue("top"),bodyTopPriority:e.getPropertyPriority("top"),bodyLeft:e.getPropertyValue("left"),bodyLeftPriority:e.getPropertyPriority("left"),bodyRight:e.getPropertyValue("right"),bodyRightPriority:e.getPropertyPriority("right"),bodyWidth:e.getPropertyValue("width"),bodyWidthPriority:e.getPropertyPriority("width"),bodyOverscrollBehaviorY:e.getPropertyValue("overscroll-behavior-y"),bodyOverscrollBehaviorYPriority:e.getPropertyPriority("overscroll-behavior-y"),rootOverflow:r.getPropertyValue("overflow"),rootOverflowPriority:r.getPropertyPriority("overflow"),rootOverscrollBehaviorY:r.getPropertyValue("overscroll-behavior-y"),rootOverscrollBehaviorYPriority:r.getPropertyPriority("overscroll-behavior-y")}}function de(e,r,t,n){t?e.setProperty(r,t,n||""):e.removeProperty(r)}function Mi(){if(typeof navigator=="undefined")return!1;var e=navigator.platform||"",r=navigator.userAgent||"",t=navigator.maxTouchPoints||0,n=/iP(ad|hone|od)/.test(e)||e==="MacIntel"&&t>1;return n&&/AppleWebKit/i.test(r)}function Hi(){var e=Bi(),r=document.body.style,t=document.documentElement.style,n=Math.max(0,window.innerWidth-document.documentElement.clientWidth),i=window.getComputedStyle(document.body).position==="fixed",a=Mi()&&!i;if(n>0){var s=parseFloat(window.getComputedStyle(document.body).paddingRight)||0;r.setProperty("padding-right",s+n+"px","important")}return t.setProperty("overflow","hidden","important"),t.setProperty("overscroll-behavior-y","none","important"),r.setProperty("overflow","hidden","important"),r.setProperty("overscroll-behavior-y","none","important"),a&&(e.fixedBodyLock=!0,r.setProperty("position","fixed","important"),r.setProperty("top",-e.scrollY+"px","important"),r.setProperty("left",-e.scrollX+"px","important"),r.setProperty("right","0","important"),r.setProperty("width","100%","important")),e}function Oi(e){if(e){var r=document.body.style,t=document.documentElement.style;de(t,"overflow",e.rootOverflow,e.rootOverflowPriority),de(t,"overscroll-behavior-y",e.rootOverscrollBehaviorY,e.rootOverscrollBehaviorYPriority),de(r,"overflow",e.bodyOverflow,e.bodyOverflowPriority),de(r,"padding-right",e.bodyPaddingRight,e.bodyPaddingRightPriority),de(r,"overscroll-behavior-y",e.bodyOverscrollBehaviorY,e.bodyOverscrollBehaviorYPriority),de(r,"position",e.bodyPosition,e.bodyPositionPriority),de(r,"top",e.bodyTop,e.bodyTopPriority),de(r,"left",e.bodyLeft,e.bodyLeftPriority),de(r,"right",e.bodyRight,e.bodyRightPriority),de(r,"width",e.bodyWidth,e.bodyWidthPriority),e.fixedBodyLock&&window.scrollTo(e.scrollX,e.scrollY)}}function Fi(){var e=document.activeElement;return!e||e===document.body||e===document.documentElement?null:e}function qe(e){if(!(!e||!document.contains(e)||typeof e.focus!="function"))try{e.focus({preventScroll:!0})}catch(r){try{e.focus()}catch(t){}}}function Di(e){return!e||e.disabled||e.getAttribute("aria-hidden")==="true"?!1:!!(e.offsetWidth||e.offsetHeight||e.getClientRects().length)}function Et(e){var r=["a[href]","button:not([disabled])","input:not([disabled])","select:not([disabled])","textarea:not([disabled])",'[tabindex]:not([tabindex="-1"])'].join(",");return Array.prototype.slice.call(e.querySelectorAll(r)).filter(Di)}function Tt(e){var r=Et(e),t=r[0]||e.querySelector('[role="dialog"]')||e;qe(t)}function ji(e,r){if(e.key==="Tab"){var t=Et(r);if(!t.length){e.preventDefault(),Tt(r);return}var n=t[0],i=t[t.length-1],a=document.activeElement;if(!r.contains(a)){e.preventDefault(),qe(n);return}e.shiftKey&&a===n?(e.preventDefault(),qe(i)):!e.shiftKey&&a===i&&(e.preventDefault(),qe(n))}}function Yi(){var e={id:"ikr-modal-"+Date.now()+"-"+Math.random().toString(36).slice(2),previousState:null,pushed:!1,url:window.location.href};try{e.previousState=history.state,history.pushState({ikrModal:e.id},"",e.url),e.pushed=!0}catch(r){}return e}function qi(e){return!!(e&&e.pushed&&window.location.href===e.url&&history.state&&history.state.ikrModal===e.id)}function Gi(e){if(qi(e))try{history.replaceState(e.previousState,"",e.url)}catch(r){}}function St(e,r,t,n,i){Oi(n),document.removeEventListener("keydown",r),window.removeEventListener("popstate",t),e.parentNode&&e.parentNode.removeChild(e),qe(i)}function Vi(e){var r=document.createElement("div");r.className="ikr-modal-right";var t=document.createElement("div");t.className="ikr-modal-scroll-content";var n=document.createElement("div");n.className="ikr-modal-top-row";var i=document.createElement("div");i.className="ikr-modal-stars",i.innerHTML=xe(e.rating,I);var a=document.createElement("span");a.className="ikr-modal-date",a.textContent=ze(e.createdAt),n.appendChild(i),n.appendChild(a),t.appendChild(n);var s=document.createElement("div");s.className="ikr-modal-title",s.textContent=e.title||"",s.style.display=e.title?"":"none",t.appendChild(s);var o=document.createElement("div");o.className="ikr-modal-author",o.textContent=e.author||"",t.appendChild(o);var d=document.createElement("div");d.className="ikr-modal-body",d.textContent=(e.comment||"").trim(),d.style.display=e.comment&&e.comment.trim()?"":"none",t.appendChild(d);var c=document.createElement("div");c.className="ikr-modal-reply";var u=document.createElement("div");u.className="ikr-modal-reply-label",u.textContent="Ma\u011Faza Sahibi";var p=document.createElement("div");return p.className="ikr-modal-reply-text",p.textContent=e.merchantReply||"",c.appendChild(u),c.appendChild(p),c.style.display=e.merchantReply?"":"none",t.appendChild(c),r.appendChild(t),r}function Ui(e,r){var t=e.querySelector(".ikr-modal-scroll-content");t.querySelector(".ikr-modal-stars").innerHTML=xe(r.rating,I),t.querySelector(".ikr-modal-date").textContent=ze(r.createdAt);var n=t.querySelector(".ikr-modal-title");n.textContent=r.title||"",n.style.display=r.title?"":"none",t.querySelector(".ikr-modal-author").textContent=r.author||"";var i=t.querySelector(".ikr-modal-body");i.textContent=(r.comment||"").trim(),i.style.display=r.comment&&r.comment.trim()?"":"none";var a=t.querySelector(".ikr-modal-reply");a.querySelector(".ikr-modal-reply-text").textContent=r.merchantReply||"",a.style.display=r.merchantReply?"":"none",e.scrollTop=0}function Or(e,r,t,n,i,a,s,o){var d=Ye(e),c=Math.max(0,Math.min(t||0,d.length-1)),u=document.createElement("div");u.className="ikr-modal-left";var p=document.createElement("img"),l=s==="next"?"ikr-modal-img-enter-right":s==="prev"?"ikr-modal-img-enter-left":"";p.className="ikr-modal-main-img"+(l?" "+l:""),p.src=ir(d[c]||""),p.decoding="async",p.width=ar,p.height=Math.round(ar*4/3),p.alt="Yorum foto\u011Fraf\u0131",Mr(p,function(b){if(b.style.display="none",!u.querySelector(".ikr-modal-img-error")){var E=document.createElement("div");E.className="ikr-modal-img-error",E.setAttribute("role","status"),E.textContent="Bu g\xF6rsel \u015Fu anda y\xFCklenemiyor.",u.insertBefore(E,b)}}),u.appendChild(p);var f=document.createElement("button");f.className="ikr-modal-close-mobile",f.textContent="\u2715",f.setAttribute("aria-label","Kapat"),f.onclick=function(b){b.stopPropagation(),a()},u.appendChild(f);var m=0;if(u.addEventListener("touchstart",function(b){m=b.touches[0].clientX},{passive:!0}),u.addEventListener("touchend",function(b){var E=m-b.changedTouches[0].clientX;if(!(Math.abs(E)<50)){if(E>0){if(y)Se(e,r,c+1,n,i,a,!0,"next",o);else if(x){var k=n[r+1];Se(k,r+1,0,n,i,a,!1,"next",o)}}else if(v)Se(e,r,c-1,n,i,a,!0,"prev",o);else if(z){var L=n[r-1],A=Ye(L);Se(L,r-1,A.length-1,n,i,a,!1,"prev",o)}}},{passive:!0}),d.length>1){var g=document.createElement("div");g.className="ikr-modal-thumbs",d.forEach(function(b,E){var k=document.createElement("img"),L=le(b,gr);k.src=L.src,k.srcset=L.srcset,k.loading="lazy",k.decoding="async",k.width=gr,k.height=gr,k.className="ikr-modal-thumb"+(E===c?" ikr-modal-thumb-active":""),k.alt="K\xFC\xE7\xFCk resim "+(E+1),se(k),k.tabIndex=0,k.setAttribute("role","button"),k.setAttribute("aria-label","K\xFC\xE7\xFCk resim "+(E+1)+" se\xE7"),E===c&&k.setAttribute("aria-current","true"),(function(A){function T(){Se(e,r,A,n,i,a,!0,null,o)}k.onclick=T,k.onkeydown=function(_){(_.key==="Enter"||_.key===" ")&&(_.preventDefault(),T())}})(E),g.appendChild(k)}),u.appendChild(g)}var v=c>0,y=c<d.length-1,z=r>0,x=r<n.length-1,w=v||z,S=y||x;if(w){var C=document.createElement("button");C.className="ikr-modal-nav ikr-modal-nav-prev",C.innerHTML="&#8249;",C.setAttribute("aria-label","\xD6nceki"),C.onclick=function(b){if(b.stopPropagation(),v)Se(e,r,c-1,n,i,a,!0,"prev",o);else if(z){var E=n[r-1],k=Ye(E);Se(E,r-1,k.length-1,n,i,a,!1,"prev",o)}},u.appendChild(C)}if(S){var h=document.createElement("button");h.className="ikr-modal-nav ikr-modal-nav-next",h.innerHTML="&#8250;",h.setAttribute("aria-label","Sonraki"),h.onclick=function(b){if(b.stopPropagation(),y)Se(e,r,c+1,n,i,a,!0,"next",o);else if(x){var E=n[r+1];Se(E,r+1,0,n,i,a,!1,"next",o)}},u.appendChild(h)}return u}function Lt(e,r){[-1,1].forEach(function(t){var n=r[e+t];if(n){var i=Ye(n);i[0]&&(new Image().src=ir(i[0]))}})}function Hr(e){if(e){if(typeof e.scrollTo=="function")try{e.scrollTo({top:0,left:0,behavior:"auto"});return}catch(r){}e.scrollTop=0,e.scrollLeft=0}}function Zi(e,r){var t=e&&e.querySelector(".ikr-modal-wrap"),n=r&&r.querySelector(".ikr-modal-right"),i=r&&r.querySelector(".ikr-modal-scroll-content");function a(){Hr(t),Hr(n),Hr(i)}a(),t&&qe(t),typeof requestAnimationFrame=="function"?requestAnimationFrame(function(){a(),requestAnimationFrame(a)}):setTimeout(a,0)}function Se(e,r,t,n,i,a,s,o,d){if(s){var c=Or(e,r,t,n,i,a,o,d);i.firstChild&&i.replaceChild(c,i.firstChild)}else{var c=Or(e,r,t,n,i,a,o,d),u=i.querySelector(".ikr-modal-right");i.firstChild&&i.replaceChild(c,i.firstChild),u&&Ui(u,e),Zi(d,i)}Lt(r,n)}function ce(e,r,t){var n=Ye(e);if(!n.length)return;var i=(t||[]).filter(function(z){return Ye(z).length>0}),a=i.findIndex(function(z){return z===e||z.id===e.id});a===-1&&(i.unshift(e),a=0);var s=n.indexOf(r);s<0&&(s=0);var o=document.createElement("div");o.className="ikr-modal-overlay";var d=document.createElement("div");d.className="ikr-modal";var c=!1,u=Fi(),p=Hi(),l=Yi();function f(){c||(c=!0,St(o,m,f,p,u))}function m(z){if(z.key==="Escape"){g();return}ji(z,o)}function g(){c||(c=!0,St(o,m,f,p,u),Gi(l))}document.addEventListener("keydown",m),window.addEventListener("popstate",f),o.onclick=function(){g()},d.onclick=function(z){z.stopPropagation()},d.appendChild(Or(e,a,s,i,d,g,null,o)),d.appendChild(Vi(e)),Lt(a,i);var v=document.createElement("div");v.className="ikr-modal-wrap",v.tabIndex=-1,v.setAttribute("role","dialog"),v.setAttribute("aria-modal","true"),v.setAttribute("aria-label","Yorum foto\u011Fraf\u0131 detay\u0131"),v.appendChild(d);var y=document.createElement("button");y.className="ikr-modal-close",y.textContent="\u2715",y.setAttribute("aria-label","Kapat"),y.onclick=function(z){z.stopPropagation(),g()},v.appendChild(y),o.appendChild(v),document.body.appendChild(o),Tt(o)}function At(e){if(e)for(var r=document.querySelectorAll("h1,h2,h3,h4,h5,h6,div,span,p"),t=0;t<r.length;t++){var n=r[t];if(n.children.length===0&&n.textContent.trim()===e&&n.tagName!=="TITLE"&&!n.closest("[data-ikr-listing-badge]")&&!n.closest("#ikas-reviews")&&!n.closest("nav")&&!n.closest("header")&&!n.closest('[class*="breadcrumb"]')&&!n.closest('[aria-label*="breadcrumb"]'))return n}return document.querySelector("h1")}var It={small:{icon:14,text:"12px"},medium:{icon:16,text:"14px"},large:{icon:20,text:"16px"}};function Wi(e,r,t,n,i){var a=tr(r,t),s="width:"+i+"px;height:"+i+"px;";return'<span style="color:'+n+';display:inline-flex;align-items:center;line-height:1;">'+oe(e,a,{sizeStyle:s})+"</span>"}function Pt(e,r,t,n){var i=document.getElementById("ikr-rating-badge");if(i&&i.remove(),!!e&&!(n&&n.enabled===!1)){var a=document.getElementById("ikr-jsonld");a&&a.remove();var s=document.createElement("script");s.id="ikr-jsonld",s.type="application/ld+json",s.textContent=JSON.stringify({"@context":"https://schema.org","@type":"Product",name:t||document.title,url:window.location.href,aggregateRating:{"@type":"AggregateRating",ratingValue:e,reviewCount:r,bestRating:"5",worstRating:"1"}}),document.head.appendChild(s);var o=At(t);if(!(!o||!o.parentNode)){var d=n&&n.icon||"star",c=n&&n.iconStyle||"classic",u=n&&n.size||"medium",p=n&&n.color||"#f59e0b",l=It[u]||It.medium,f=document.createElement("a");f.id="ikr-rating-badge",f.href="#ikas-reviews";var m=window.getComputedStyle(o).textAlign,g=m==="center"?"center":m==="right"?"flex-end":"flex-start";f.style.cssText="display:flex;align-items:center;gap:5px;text-decoration:none;margin-bottom:10px;cursor:pointer;font-weight:400;justify-content:"+g+";",f.innerHTML=Wi(e,d,c,p,l.icon)+'<span style="font-size:'+l.text+';font-weight:400;color:#555;">'+e+" ("+r+" yorum)</span>",f.onclick=function(v){v.preventDefault();var y=document.getElementById("ikas-reviews-widget")||document.getElementById("ikas-reviews");if(y){var z=document.querySelector("header"),x=z?z.getBoundingClientRect().height:0,w=y.getBoundingClientRect().top+window.pageYOffset-x-16;window.scrollTo({top:w,behavior:"smooth"})}},o.parentNode.insertBefore(f,o.nextSibling)}}}var Nt=`
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
  .ikr-title{font-size:var(--ikr-title-size,24px);font-weight:500;text-align:left;margin-bottom:12px;color:var(--ikr-header-title,#111111);}
  /* Classic layout basligi ortali \u2014 classic disindaki layout'lar sola yasli */
  .ikr-title-classic{text-align:center;}

  /* \u2500\u2500\u2500 SVG ICON WRAPPER \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
     .ikr-icon span'\u0131 SVG'yi sarar. Boyut parent'tan (em veya inline style) gelir,
     SVG de ona g\xF6re \xF6l\xE7eklenir. color \u2192 fill (currentColor) \u2014 yani renk
     .ikr-icon'a veya parent'\u0131na verildi\u011Finde SVG o rengi al\u0131r. */
  .ikr-icon{display:inline-flex;align-items:center;justify-content:center;line-height:1;flex-shrink:0;}
  .ikr-icon > svg{width:100%;height:100%;display:block;}

  /* \u2500\u2500\u2500 PARTIAL STARS (bireysel star + clip-path) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
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
  .ikr-star-half-fg > svg{width:100%;height:100%;display:block;}

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
  .ikr-filter-item{padding:10px 16px;font-size:var(--ikr-filter-text-size,14px);color:var(--ikr-filter-item-text,#111111);cursor:pointer;}
  @media(hover:hover){.ikr-filter-item:hover{background:var(--ikr-filter-item-hover-bg,rgba(17,17,17,0.07));}}
  .ikr-filter-item-active{font-weight:700;color:var(--ikr-filter-item-active,#111111);}

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
  .ikr-reply-label{font-weight:600;font-size:var(--ikr-reply-name-size,13px);color:var(--ikr-reply-label,#111111);}
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
  .ikr-modal-reply-label{font-weight:600;font-size:var(--ikr-reply-name-size,13px);color:var(--ikr-reply-label,#111111);margin-bottom:4px;}
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
`;var _t=".product-name",Rt=".add-to-basket-modal",Bt="h1.product-name",Ge=".single-product-container-main",Fr=".single-product-product-name",Mt=[".hero-image-banner-main",".hero-image-main",".home-slider-main",'[class*="hero-"]','[class*="banner-"]','[class*="slider-banner"]','[class*="marquee"]'].join(","),Ht=[".category-products-main",".products-slider-main",".infinite-scroll-component",'[class*="product-list"]',".single-product-container-main",".product-block-container"].join(",");var Gr={};Te(Gr,{meta:()=>aa,render:()=>na});function Ve(e){var r=e.ratingCounts,t=e.allCount,n=e.iconPair,i=e.currentRatingFilter,a=e.onFilterChange,s=document.createElement("div");s.className="ikr-summary-block ikr-summary-bars";for(var o=5;o>=1;o--){var d=r[o-1]||0,c=t>0?Math.round(d/t*100):0,u=i===o,p=document.createElement("div");p.className="ikr-bar-row"+(u?" ikr-bar-active":""),i&&!u&&(p.style.opacity="0.35");for(var l="",f=1;f<=5;f++){var m=f<=o;l+='<span class="ikr-bar-star ikr-icon '+(m?"ikr-bar-star-filled":"ikr-bar-star-empty")+'">'+(m?n.filled:n.empty)+"</span>"}p.innerHTML='<span class="ikr-bar-label">'+l+'</span><div class="ikr-bar-track"><div class="ikr-bar-fill" style="width:'+c+'%;"></div></div><span class="ikr-bar-count">('+d.toLocaleString("tr-TR")+")</span>",(function(g){p.onclick=function(){a(g)}})(o),s.appendChild(p)}return s}var pe=[],Ot=!1;function Ki(e){for(var r=pe.length-1;r>=0;r--){var t=pe[r];t.trigger&&t.trigger.contains(e.target)||t.element&&t.element.contains(e.target)||t.close()}}function Xi(e){if(e.key==="Escape")for(var r=pe.length-1;r>=0;r--)pe[r].close()}function Ji(){Ot||typeof document=="undefined"||(document.addEventListener("click",Ki,!0),document.addEventListener("keydown",Xi),Ot=!0)}function kr(e){for(var r=0;r<pe.length;r++)pe[r]!==e&&pe[r].close()}function hr(e){Ji();var r={trigger:e.trigger,element:e.element,close:e.close};return pe.push(r),function(){var n=pe.indexOf(r);n!==-1&&pe.splice(n,1)}}function te(e){var r=e.widget,t=e.currentOrderBy,n=e.currentHasImages,i=e.onWriteClick,a=e.onSortChange,s=document.createElement("div");s.className="ikr-summary-block ikr-summary-actions";var o=document.createElement("button");o.className="ikr-write-btn",o.textContent=I&&I.writeButtonText||"Yorum Yap",o.onclick=i,s.appendChild(o);var d=document.createElement("div");d.className="ikr-filter-wrap";var c=document.createElement("button");c.className="ikr-filter-btn",c.setAttribute("aria-label","Filtrele");var u=I&&I.filterIcon||"lines";c.innerHTML=zt(u);var p=document.createElement("div");p.className="ikr-filter-menu";var l=[["newest","En Yeni",!1],["highest","En Y\xFCksek Puan",!1],["lowest","En D\xFC\u015F\xFCk Puan",!1],["photos","Foto\u011Frafl\u0131",!0]];function f(){p.classList.remove("ikr-open"),c.classList.remove("ikr-filter-btn-active")}function m(){kr(g),p.classList.add("ikr-open"),c.classList.add("ikr-filter-btn-active")}l.forEach(function(v){var y=v[2],z=y?n:!n&&(t||"newest")===v[0],x=document.createElement("div");x.className="ikr-filter-item"+(z?" ikr-filter-item-active":""),x.textContent=v[1],x.onclick=function(){f(),a(v[0],y)},p.appendChild(x)}),c.onclick=function(){p.classList.contains("ikr-open")?f():m()};var g=hr({trigger:d,element:p,close:f});return d.appendChild(c),d.appendChild(p),s.appendChild(d),s}function Ft(e){var r=e&&e.onClose?e.onClose:function(){},t=e&&e.allowOutsideClose!==!1,n=document.createElement("div");n.className="ikr-fwizard-overlay",n.tabIndex=-1,n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true"),n.setAttribute("aria-label","Yorum yapma formu");var i=document.createElement("div");i.className="ikr-fwizard",n.appendChild(i);var a=document.createElement("button");a.className="ikr-fwizard-close",a.type="button",a.setAttribute("aria-label","Kapat"),a.innerHTML='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',i.appendChild(a);var s=document.createElement("div");s.className="ikr-fwizard-content",i.appendChild(s);var o=!1,d=null,c="",u="";function p(){var k=document.activeElement;return!k||k===document.body||k===document.documentElement?null:k}function l(k){if(!(!k||!document.contains(k)||typeof k.focus!="function"))try{k.focus({preventScroll:!0})}catch(L){try{k.focus()}catch(A){}}}function f(k){if(!k||k.disabled||k.getAttribute("aria-hidden")==="true")return!1;var L=window.getComputedStyle?window.getComputedStyle(k):null;return L&&(L.display==="none"||L.visibility==="hidden")?!1:!!(k.offsetWidth||k.offsetHeight||k.getClientRects().length)}function m(k){var L=["a[href]","button:not([disabled])","input:not([disabled])","select:not([disabled])","textarea:not([disabled])",'[tabindex]:not([tabindex="-1"])'].join(",");return Array.prototype.slice.call(k.querySelectorAll(L)).filter(f)}function g(){var k=m(s),L=m(n),A=k[0]||L[0]||n;l(A)}function v(k){if(k.key==="Tab"){var L=m(n);if(!L.length){k.preventDefault(),l(n);return}var A=L[0],T=L[L.length-1],_=document.activeElement;if(!n.contains(_)){k.preventDefault(),l(A);return}k.shiftKey&&_===A?(k.preventDefault(),l(T)):!k.shiftKey&&_===T&&(k.preventDefault(),l(A))}}function y(){var k=window.innerWidth-document.documentElement.clientWidth;c=document.body.style.overflow,u=document.body.style.paddingRight,document.body.style.overflow="hidden",k>0&&(document.body.style.paddingRight=k+"px")}function z(){document.body.style.overflow=c,document.body.style.paddingRight=u}function x(){o||(o=!0,document.removeEventListener("keydown",w),n.removeEventListener("click",S),a.removeEventListener("click",x),n.classList.remove("ikr-fwizard-open"),setTimeout(function(){n.parentNode&&n.parentNode.removeChild(n),z(),l(d);try{r()}catch(k){}},200))}function w(k){if(k.key==="Escape"){x();return}v(k)}function S(k){k.target===n&&t&&x()}document.addEventListener("keydown",w),n.addEventListener("click",S),a.addEventListener("click",x);function C(k){d=p(),k&&s.appendChild(k),document.body.appendChild(n),y(),requestAnimationFrame(function(){n.classList.add("ikr-fwizard-open"),g()})}var h=null,b=null;function E(k,L){if(L=L||"error",h){try{h.remove()}catch(A){}h=null}b&&(clearTimeout(b),b=null),h=document.createElement("div"),h.className="ikr-fwizard-toast ikr-fwizard-toast--"+L,h.textContent=k,i.appendChild(h),b=setTimeout(function(){h&&(h.classList.add("ikr-fwizard-toast--exit"),setTimeout(function(){if(h){try{h.remove()}catch(A){}h=null}},300))},4e3)}return{open:C,close:x,content:s,setAllowOutsideClose:function(k){t=!!k},setStepAttr:function(k){i.setAttribute("data-step",String(k))},focusFirstControl:g,showToast:E}}var Dt=`
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
  .ikr-fwizard-input:focus,
  .ikr-fwizard-textarea:focus{
    outline:none;
    /* Aktiflik efekti kald\u0131r\u0131ld\u0131, border rengi sabit kal\u0131r */
  }
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
       - SVG: getIconFromSettings (icons.js, currentSettings.reviewIcon)
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

  .ikr-fwizard-input:focus-visible,
  .ikr-fwizard-textarea:focus-visible{
    outline:3px solid var(--ikr-fwizard-focus-ring, rgba(17,17,17,0.42));
    outline-offset:2px;
    border-color:var(--ikr-fwizard-btn-bg, rgb(17,17,17));
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
`;var Dr=4;function Ue(e,r){if(!r)return!1;switch(e){case 1:return r.rating>0;case 2:return!0;case 3:return!!(r.comment&&r.comment.trim().length>0);case 4:return!!(r.author&&r.author.trim().length>0);default:return!0}}function jt(e){e=e||{};var r=[],t={currentStep:1,rating:0,title:"",comment:"",author:"",email:"",images:[],pendingImages:[],fingerprints:[],productId:e.productId||"",productName:e.productName||""};function n(){r.forEach(function(i){try{i(t)}catch(a){}})}return{get:function(){return t},set:function(i){Object.assign(t,i),n()},goNext:function(){t.currentStep<Dr&&(t.currentStep+=1,n())},goBack:function(){t.currentStep>1&&(t.currentStep-=1,n())},onChange:function(i){return r.push(i),function(){r=r.filter(function(a){return a!==i})}}}}var $i='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6"/></svg>';function Yt(e){e=e||{};var r=e.skippableSteps||[],t=e.nextableSteps||[],n=e.onBack||function(){},i=e.onSkip||function(){},a=e.onNext||function(){},s=document.createElement("div");s.className="ikr-fwizard-footer";var o=document.createElement("button");o.type="button",o.className="ikr-fwizard-nav-btn ikr-fwizard-footer-back",o.setAttribute("aria-label","Geri"),o.innerHTML=$i+"<span>Geri</span>",o.addEventListener("click",function(){n()}),s.appendChild(o);var d=document.createElement("div");d.className="ikr-fwizard-footer-progress";for(var c=[],u=0;u<Dr;u++){var p=document.createElement("span");p.className="ikr-fwizard-progress-seg",d.appendChild(p),c.push(p)}s.appendChild(d);var l=document.createElement("button");l.type="button";var f=null;function m(v){f&&l.removeEventListener("click",f),f=v,v&&l.addEventListener("click",v)}s.appendChild(l);function g(v,y){var z=r.indexOf(v)!==-1,x=t.indexOf(v)!==-1,w=y&&(y.images&&y.images.length>0||y.pendingImages&&y.pendingImages.length>0);if(z)v===2&&w?(l.className="ikr-fwizard-cta-btn ikr-fwizard-footer-next",l.setAttribute("aria-label","Devam Et"),l.innerHTML="Devam Et",m(function(){a()})):(l.className="ikr-fwizard-nav-btn ikr-fwizard-footer-skip",l.setAttribute("aria-label","Atla"),l.innerHTML="<span>Atla</span>",m(function(){i()})),l.disabled=!1,l.classList.remove("ikr-fwizard-cta-btn--disabled"),l.style.visibility="",l.tabIndex=0;else if(x){l.className="ikr-fwizard-cta-btn ikr-fwizard-footer-next",l.setAttribute("aria-label","Sonraki"),l.innerHTML="Sonraki",l.style.visibility="",l.tabIndex=0;var S=Ue(v,y);l.disabled=!S,l.classList.toggle("ikr-fwizard-cta-btn--disabled",!S),m(function(){l.disabled||a()})}else l.className="ikr-fwizard-nav-btn ikr-fwizard-footer-skip",l.innerHTML="",l.style.visibility="hidden",l.tabIndex=-1,l.disabled=!0,m(null)}return{el:s,update:function(v,y){c.forEach(function(x,w){w+1<=v?x.classList.add("ikr-fwizard-progress-seg-active"):x.classList.remove("ikr-fwizard-progress-seg-active")});var z=v<=1;o.style.visibility=z?"hidden":"",o.style.pointerEvents=z?"none":"",o.tabIndex=z?-1:0,g(v,y)},setNextDisabled:function(v){l.classList.contains("ikr-fwizard-cta-btn")&&(l.disabled=!!v,l.classList.toggle("ikr-fwizard-cta-btn--disabled",!!v))},setThanksState:function(v){o.style.visibility="hidden",d.style.visibility="hidden",l.className="ikr-fwizard-cta-btn ikr-fwizard-footer-next",l.setAttribute("aria-label","Devam Et"),l.innerHTML="Devam Et",l.style.visibility="",l.disabled=!1,l.classList.remove("ikr-fwizard-cta-btn--disabled"),m(v)}}}function qt(e,r){r=r||{};var t=document.createElement("div");t.className="ikr-fwizard-step ikr-fwizard-step-rating";var n=!1,i=document.createElement("div");i.className="ikr-fwizard-step-title",i.textContent="Bu \xFCr\xFCn\xFC nas\u0131l de\u011Ferlendirirsiniz?",t.appendChild(i);var a=document.createElement("div");a.className="ikr-fwizard-stars",a.setAttribute("role","radiogroup"),a.setAttribute("aria-label","Y\u0131ld\u0131z puan\u0131");var s=Me(I||{}),o=[];function d(p){o.forEach(function(l,f){var m=f<p;l.classList.toggle("ikr-fwizard-star-active",m),l.setAttribute("aria-checked",f+1===p?"true":"false"),l.innerHTML=m?s.filled:s.empty})}for(var c=1;c<=5;c++)(function(p){var l=document.createElement("button");l.type="button",l.className="ikr-fwizard-star",l.setAttribute("role","radio"),l.setAttribute("aria-label",p+" y\u0131ld\u0131z"),l.innerHTML=s.empty,l.addEventListener("mouseenter",function(){d(p)}),l.addEventListener("mouseleave",function(){d(e.get().rating)}),l.addEventListener("click",function(){n||(n=!0,e.set({rating:p}),d(p),setTimeout(function(){var f=!r.canNavigate||r.canNavigate();f&&e.goNext()},400))}),o.push(l),a.appendChild(l)})(c);d(e.get().rating);var u=function(){s=Me(I||{}),d(e.get().rating)};return window.addEventListener("IKR_SETTINGS_UPDATED_PREVIEW",u),t.appendChild(a),{el:t,destroy:function(){window.removeEventListener("IKR_SETTINGS_UPDATED_PREVIEW",u)}}}var jr=3,Qi=10*1024*1024;function Gt(e,r){r=r||{};var t=!1,n=document.createElement("div");n.className="ikr-fwizard-step ikr-fwizard-step-photos";var i=document.createElement("div");i.className="ikr-fwizard-step-title ikr-fwizard-step-title--lg",i.textContent="Foto\u011Frafl\u0131 de\u011Ferlendirme",n.appendChild(i);var a=document.createElement("div");a.className="ikr-fwizard-step-subtitle",a.textContent="Foto\u011Fraf ekleyebilirsiniz.",n.appendChild(a);var s=document.createElement("div");s.className="ikr-fwizard-photo-card";var o=document.createElement("button");o.type="button",o.className="ikr-fwizard-photo-add",o.setAttribute("aria-label","Foto\u011Fraf ekle"),o.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg><span>Foto\u011Fraf Ekle</span>';var d=document.createElement("input");d.type="file",d.accept="image/*",d.multiple=!0,d.style.display="none",s.appendChild(o),s.appendChild(d);var c=document.createElement("div");c.className="ikr-fwizard-photo-previews",c.setAttribute("aria-live","polite"),s.appendChild(c),n.appendChild(s);var u=r.blobMap||{},p=r.urlToFinger||{};function l(){if(!t){var x=e.get().images||[],w=e.get().pendingImages||[],S=x.map(function(C){return{url:C,isPending:!1}}).concat(w.map(function(C){return{url:C.url,file:C.file,isPending:!0,error:C.error}}));c.innerHTML="",S.forEach(function(C){var h=u[C.url]||C.url,b=f(C,h);c.appendChild(b)}),y()}}function f(x,w){var S=document.createElement("div");S.className="ikr-fwizard-photo-thumb";var C=document.createElement("img");C.src=w,C.alt="",C.style.cssText="width:100%; height:100%; object-fit:cover; display:block; pointer-events:none; -webkit-user-drag:none; user-select:none;",S.appendChild(C);var h=document.createElement("div");h.className="ikr-fwizard-photo-loading",h.style.display="none",S.appendChild(h);var b=document.createElement("button");return b.type="button",b.className="ikr-fwizard-photo-remove",b.innerHTML="&#x2715;",S.appendChild(b),m(S,x,w),S}function m(x,w,S){var C=x.querySelector("img");C.src!==S&&(C.src=S);var h=x.querySelector(".ikr-fwizard-photo-loading");w.isPending&&w.error?(h.style.display="flex",h.innerHTML='<span class="ikr-upload-error">\u2717 '+w.error+"</span>"):h.style.display="none";var b=x.querySelector(".ikr-fwizard-photo-remove");b.onclick=function(){var E=p[w.url]||(w.file?w.file.name+"_"+w.file.size:null);if(w.url.startsWith("blob:")&&URL.revokeObjectURL(w.url),E){var k=(e.get().fingerprints||[]).filter(function(T){return T!==E});e.set({fingerprints:k})}if(w.isPending){var L=(e.get().pendingImages||[]).filter(function(T){return T.url!==w.url});e.set({pendingImages:L})}else{var A=(e.get().images||[]).filter(function(T){return T!==w.url});e.set({images:A})}}}var g='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>',v='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>';function y(){var x=(e.get().images||[]).length,w=(e.get().pendingImages||[]).length,S=x+w,C=S>=jr,h=w>0;S>0?(s.classList.add("ikr-fwizard-photo-card--compact"),o.innerHTML=v):(s.classList.remove("ikr-fwizard-photo-card--compact"),o.innerHTML=g+"<span>Foto\u011Fraf Ekle</span>"),C?(o.style.display="none",o.disabled=!0,d.disabled=!0):(o.style.display="flex",o.disabled=h,d.disabled=h,o.classList.toggle("ikr-fwizard-photo-add--disabled",h))}o.addEventListener("click",function(){d.disabled||d.click()}),d.onchange=async function(x){var w=Array.from(x.target.files).slice(0,jr-(e.get().images||[]).length);d.value="";var S=(e.get().pendingImages||[]).length;if(!(S>0)){var C=e.get().images||[],h=C.length,b=jr-C.length;if(w.length!==0){for(var E=[],k=[],L=0;L<w.length;L++){var A=w[L],T=A.name+"_"+A.size,_=(e.get().fingerprints||[]).some(function(O){return O===T})||E.some(function(O){return O.file.name+"_"+O.file.size===T});if(_){console.log("[ikr] Duplicate file detected, skipping:",A.name);continue}if(A.size>Qi){var me="10MB'dan daha b\xFCy\xFCk foto\u011Fraflar\u0131 y\xFCkleyemezsin.";r.showToast?r.showToast(me,"error"):alert(me);continue}var K=URL.createObjectURL(A);p[K]=T,E.push({url:K,file:A,error:null}),k.push({url:K,file:A});var fe=(e.get().fingerprints||[]).slice();fe.push(T),e.set({fingerprints:fe})}if(E.length!==0){var ve=(e.get().pendingImages||[]).concat(E),X=async function(){for(var O=0;O<k.length;O++){var ge=k[O],ke=ge.file,U=ge.url;if(typeof window!="undefined"&&window.__ikasPreviewMode){var Ee=(e.get().pendingImages||[]).filter(function(J){return J.url!==U}),Fe=(e.get().images||[]).slice();Fe.push(U),e.set({pendingImages:Ee,images:Fe});continue}try{var he=await re(q+"/api/public/upload/sign",{method:"POST"});if(!he.ok)throw he.status===429?new Error("rate_limit"):new Error("sign failed");var ie=await he.json(),D=new FormData;D.append("file",ke),D.append("api_key",ie.api_key),D.append("timestamp",ie.timestamp),D.append("signature",ie.signature),D.append("folder","review_images");var Xe=await fetch("https://api.cloudinary.com/v1_1/"+ie.cloud_name+"/image/upload",{method:"POST",body:D}),ye=await Xe.json();if(ye.secure_url&&Br(ye.secure_url)){var Pe=(e.get().pendingImages||[]).some(function(J){return J.url===U});if(!Pe){console.log("[ikr] Upload finished but image was already deleted by user. Aborting state update.");return}u[ye.secure_url]=U,p[ye.secure_url]=p[U];var be=(e.get().pendingImages||[]).filter(function(J){return J.url!==U}),Q=(e.get().images||[]).slice();Q.push(ye.secure_url),e.set({pendingImages:be,images:Q})}else throw new Error("invalid image url")}catch(J){console.error("[ikr] Image upload failed:",J);var ae=J.message==="rate_limit"?"\xC7ok fazla deneme. Bekleyin.":"Y\xFCkleme ba\u015Far\u0131s\u0131z.";r.showToast&&r.showToast(ae,"error");var Ne=(e.get().pendingImages||[]).map(function(B){return B.url===U?{url:B.url,file:B.file,error:ae}:B});e.set({pendingImages:Ne})}}};if(h===0){t=!0;var V=!r.canNavigate||r.canNavigate();V&&e.goNext()}e.set({pendingImages:ve}),X()}}}};var z=e.onChange(l);return l(),{el:n,destroy:function(){t=!0,d.onchange=null,z&&z()}}}var Yr=2e3,ea=60;function Vt(e,r){r=r||{};var t=r.onValidityChange||function(){},n=document.createElement("div");n.className="ikr-fwizard-step ikr-fwizard-step-content";var i=document.createElement("div");i.className="ikr-fwizard-step-title ikr-fwizard-step-title--lg",i.textContent="Deneyiminizi anlat\u0131n",n.appendChild(i);var a=document.createElement("div");a.className="ikr-fwizard-content-form";var s=document.createElement("input");s.type="text",s.className="ikr-fwizard-input",s.placeholder="K\u0131sa bir ba\u015Fl\u0131k (opsiyonel)",s.maxLength=ea,s.setAttribute("aria-label","Yorum ba\u015Fl\u0131\u011F\u0131"),s.value=e.get().title||"",s.addEventListener("input",function(){e.set({title:s.value})}),a.appendChild(s);var o=document.createElement("textarea");o.className="ikr-fwizard-textarea",o.placeholder="Deneyiminizi anlat\u0131n\u2026",o.maxLength=Yr,o.rows=6,o.setAttribute("aria-label","Yorum"),o.value=e.get().comment||"",a.appendChild(o);var d=document.createElement("div");d.className="ikr-fwizard-char-counter",d.setAttribute("aria-live","polite"),a.appendChild(d);function c(){var p=o.value.length;d.textContent=p+"/"+Yr,d.classList.toggle("ikr-fwizard-char-counter--max",p>=Yr)}function u(){return Ue(3,e.get())}return o.addEventListener("input",function(){e.set({comment:o.value}),c(),t(u())}),n.appendChild(a),c(),setTimeout(function(){t(u())},0),{el:n,destroy:function(){}}}var ra=40;function Ut(e,r){r=r||{};var t=r.onValidityChange||function(){},n=r.onSuccess||function(){},i=document.createElement("div");i.className="ikr-fwizard-step ikr-fwizard-step-author";var a=document.createElement("div");a.className="ikr-fwizard-step-title ikr-fwizard-step-title--lg",a.textContent="Hakk\u0131n\u0131zda",i.appendChild(a);var s=document.createElement("div");s.className="ikr-fwizard-author-form";var o=document.createElement("div");o.className="ikr-fwizard-field";var d=document.createElement("label");d.className="ikr-fwizard-label",d.innerHTML='Ad\u0131n\u0131z <span class="ikr-fwizard-required" aria-hidden="true">*</span>';var c=document.createElement("input");c.type="text",c.className="ikr-fwizard-input",c.maxLength=ra,c.setAttribute("aria-required","true"),c.value=e.get().author||"",o.appendChild(d),o.appendChild(c),s.appendChild(o);var u=document.createElement("div");u.className="ikr-fwizard-field";var p=document.createElement("label");p.className="ikr-fwizard-label",p.textContent="E-posta (opsiyonel)";var l=document.createElement("input");l.type="email",l.className="ikr-fwizard-input",l.setAttribute("autocomplete","email"),l.value=e.get().email||"",u.appendChild(p),u.appendChild(l),s.appendChild(u);var f=document.createElement("div");f.className="ikr-fwizard-notice",f.textContent="G\xF6nder'e t\u0131klayarak yorumumun \xFCr\xFCn sayfas\u0131nda herkese a\xE7\u0131k \u015Fekilde yay\u0131nlanaca\u011F\u0131n\u0131 kabul ediyorum.",s.appendChild(f);var m=document.createElement("div");m.className="ikr-fwizard-msg",m.setAttribute("role","alert"),m.setAttribute("aria-live","assertive"),s.appendChild(m);var g=document.createElement("button");g.type="button",g.className="ikr-fwizard-submit-btn",g.textContent="G\xF6nder",s.appendChild(g),i.appendChild(s);function v(){return Ue(4,e.get())}function y(){var x=!v(),w=(e.get().pendingImages||[]).length,S=w>0;S?(g.disabled=!0,g.classList.add("ikr-fwizard-submit-btn--disabled"),g.textContent="Foto\u011Fraflar Y\xFCkleniyor..."):(g.disabled=x,g.classList.toggle("ikr-fwizard-submit-btn--disabled",x),g.textContent="G\xF6nder")}c.addEventListener("input",function(){e.set({author:c.value}),y(),t(v())}),l.addEventListener("input",function(){e.set({email:l.value})}),y(),setTimeout(function(){t(v())},0),g.onclick=async function(){if(!g.disabled){var x=e.get(),w=(x.author||"").trim(),S=(x.comment||"").trim();if(l.value.trim()&&!l.checkValidity()){l.reportValidity();return}if(!w){m.innerHTML='<div class="ikr-fwizard-msg-error">Gerekli alan</div>';return}if(!x.rating){m.innerHTML='<div class="ikr-fwizard-msg-error">L\xFCtfen bir y\u0131ld\u0131z se\xE7in.</div>';return}g.disabled=!0,g.classList.add("ikr-fwizard-submit-btn--disabled");var C=g.textContent;if(g.textContent="G\xF6nderiliyor\u2026",m.innerHTML="",typeof window!="undefined"&&window.__ikasPreviewMode){setTimeout(function(){n()},600);return}try{var h=j(window.location.href),b=x.productName||(document.querySelector("h1")?document.querySelector("h1").innerText.trim():null),E=await re(q+"/api/public/reviews",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({storeId:F,productId:x.productId||null,slug:h||null,productName:b,author:w,title:(x.title||"").trim()||null,comment:S||null,rating:x.rating,images:x.images||[]})},15e3);if(E.ok)n();else{var k=await E.json().catch(function(){return{}});throw new Error(k.error||"Yorum kaydedilemedi.")}}catch(T){var L=T&&(T.name==="AbortError"||/signal/i.test(T.message||"")),A=L?"Ba\u011Flant\u0131 yava\u015F, l\xFCtfen tekrar deneyin.":T.message||"Yorum g\xF6nderilemedi.";r.showToast?r.showToast(A,"error"):m.innerHTML='<div class="ikr-fwizard-msg-error">'+A+"</div>",g.disabled=!1,g.classList.remove("ikr-fwizard-submit-btn--disabled"),g.textContent=C}}};var z=e.onChange(y);return{el:i,destroy:function(){g.onclick=null,z&&z()}}}var Zt=!1;function ta(){if(!Zt){var e=document.createElement("style");e.setAttribute("data-ikr-fwizard",""),e.textContent=Dt,document.head.appendChild(e),Zt=!0}}function ia(e,r,t){if(t=t||{},e===1)return qt(r,{canNavigate:t.canNavigate});if(e===2)return Gt(r,{canNavigate:t.canNavigate,blobMap:t.blobMap,urlToFinger:t.urlToFinger,showToast:t.showToast});if(e===3)return Vt(r,{onValidityChange:t.onValidityChange});if(e===4)return Ut(r,{onValidityChange:t.onValidityChange,onSuccess:t.onSuccess,showToast:t.showToast});var n=document.createElement("div");return n.className="ikr-fwizard-step ikr-fwizard-step-placeholder",{el:n,destroy:function(){}}}function Wt(){var e=document.createElement("div");return e.className="ikr-fwizard-step ikr-fwizard-step-thanks",e.innerHTML='<div class="ikr-fwizard-step-title ikr-fwizard-thanks-title">Te\u015Fekk\xFCrler</div><div class="ikr-fwizard-step-subtitle ikr-fwizard-thanks-subtitle">De\u011Ferlendirmeniz al\u0131nd\u0131.</div>',e}function qr(e){!e||!e.focusFirstControl||setTimeout(function(){e.focusFirstControl()},0)}function Kt(e){e=e||{},ta();var r=jt({productId:e.productId,productName:e.productName}),t={},n={},i=Ft({onClose:function(){window.removeEventListener("popstate",s),window.history.state&&window.history.state.ikrReviewModal&&window.history.back(),Object.keys(t).forEach(function(C){var h=t[C];h&&h.startsWith("blob:")&&URL.revokeObjectURL(h)}),e.onClose&&e.onClose()},allowOutsideClose:!1}),a={ikrReviewModal:!0};window.history.pushState(a,null,"");var s=function(C){i&&i.close&&i.close()};window.addEventListener("popstate",s);var o=document.createElement("div");o.className="ikr-fwizard-step-wrap";var d=Yt({skippableSteps:[2],nextableSteps:[3],onBack:function(){p==="idle"&&r.goBack()},onSkip:function(){p==="idle"&&r.goNext()},onNext:function(){p==="idle"&&r.goNext()}}),c=document.createElement("div");c.className="ikr-fwizard-layout",c.appendChild(o),c.appendChild(d.el);var u=null,p="idle",l=null,f=!0,m=null;function g(C,h){o.innerHTML="";var b=ia(C,r,{canNavigate:function(){return p==="idle"},blobMap:t,urlToFinger:n,onValidityChange:function(L){d.setNextDisabled(!L)},onSuccess:y,showToast:i.showToast});if(u=b,d.update(C,r.get()),h){p="entering",b.el.classList.add("ikr-fwizard-step--enter");var E=null,k=function(){E&&clearTimeout(E),b.el.removeEventListener("animationend",k),b.el.classList.remove("ikr-fwizard-step--enter"),p="idle",l!==null&&z()};b.el.addEventListener("animationend",k),E=setTimeout(k,700)}else p="idle";o.appendChild(b.el),i.setStepAttr&&i.setStepAttr(C),C===3&&d.setNextDisabled(!0),qr(i)}var v=!1;function y(){if(!v){if(v=!0,!u){o.innerHTML="";var C=Wt();C.classList.add("ikr-fwizard-step--enter"),o.appendChild(C),i.setStepAttr("thanks"),d.setThanksState(i.close),qr(i);return}var h=u;p="exiting",h.el.classList.add("ikr-fwizard-step--exit");var b=function(){if(m&&clearTimeout(m),h.el.removeEventListener("animationend",b),h.destroy)try{h.destroy()}catch(k){}u===h&&(u=null),o.innerHTML="";var E=Wt();E.classList.add("ikr-fwizard-step--enter"),o.appendChild(E),i.setStepAttr("thanks"),d.setThanksState(i.close),p="idle",qr(i)};h.el.addEventListener("animationend",b),m=setTimeout(b,300)}}function z(){var C=r.get().currentStep;if(p!=="idle"){l=C;return}if(!u){var h=!f;f=!1,g(C,h);return}var b=u;p="exiting",b.el.classList.add("ikr-fwizard-step--exit");var E=function(){if(m&&clearTimeout(m),b.el.removeEventListener("animationend",E),b.destroy)try{b.destroy()}catch(L){}if(u===b){o.innerHTML="",u=null;var k=l!==null?l:r.get().currentStep;l=null,g(k,!0),p="idle"}};b.el.addEventListener("animationend",E),m=setTimeout(E,350)}z();var x=r.get().currentStep,w=r.onChange(function(C){C.currentStep!==x?(x=C.currentStep,z()):d.update(C.currentStep,C)}),S=i.close;return i.close=function(){w&&w(),typeof m!="undefined"&&m&&clearTimeout(m),S()},i.open(c),{close:i.close}}function Y(){Kt({productId:Z||"",productName:we||""})}var aa={id:"classic",name:"Klasik (A\xE7\u0131k)"};function na(e){var r=e.widget,t=e.data,n=e.settings,i=e.iconPair,a=e.allCount,s=e.ratingCounts,o=e.avgRatingVal,d=e.currentRatingFilter,c=e.currentOrderBy,u=e.currentHasImages,p=e.onFilterChange,l=e.onSortChange,f=document.createElement("div");f.className="ikr-summary";var m=(s[3]||0)+(s[4]||0),g=a>0?Math.round(m/a*100):0,v=document.createElement("div");v.className="ikr-summary-block ikr-summary-avg",v.innerHTML='<span class="ikr-avg-star ikr-icon">'+i.filled+'</span><span class="ikr-avg-num">'+o+"</span>",f.appendChild(v);var y=document.createElement("div");if(y.className="ikr-summary-block ikr-summary-count",y.textContent=a.toLocaleString("tr-TR")+" Yorum",f.appendChild(y),n.showRecommendation!==!1&&g>0){var z=document.createElement("div");z.className="ikr-summary-block ikr-summary-recommend",z.innerHTML='<span class="ikr-recommend-pct">%'+g+"</span> bu \xFCr\xFCn\xFC tavsiye ediyor",f.appendChild(z)}return f.appendChild(Ve({ratingCounts:s,allCount:a,iconPair:i,currentRatingFilter:d,onFilterChange:p})),f.appendChild(te({widget:r,currentOrderBy:c,currentHasImages:u,onWriteClick:Y,onSortChange:l})),f}var Vr={};Te(Vr,{css:()=>la,meta:()=>oa,render:()=>sa});var Xt=`
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
`;var oa={id:"compact",name:"Kompakt (A\xE7\u0131l\u0131r)",sizeOverrides:{small:{"--ikr-compact-star-size":"20px"},medium:{"--ikr-compact-star-size":"24px"},large:{"--ikr-compact-star-size":"28px"}}},la=Xt;function sa(e){var r=e.widget,t=e.settings,n=e.iconPair,i=e.allCount,a=e.ratingCounts,s=e.avgRatingVal,o=e.currentRatingFilter,d=e.currentOrderBy,c=e.currentHasImages,u=e.onFilterChange,p=e.onSortChange,l=document.createElement("div");l.className="ikr-summary ikr-summary-compact";var f=document.createElement("div");f.className="ikr-compact-header";var m=document.createElement("div");m.className="ikr-compact-trigger-wrap";var g=document.createElement("button");g.className="ikr-compact-trigger",g.type="button",g.setAttribute("aria-expanded","false"),g.innerHTML='<span class="ikr-compact-trigger-stars">'+oe(s,n)+'</span><span class="ikr-compact-trigger-text">'+i.toLocaleString("tr-TR")+' Yorum</span><span class="ikr-compact-chevron"><svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M7.11 5.16L2.16 0.21L0.75 1.62L7.11 7.98L13.48 1.62L12.06 0.21L7.11 5.16Z" fill="currentColor"/></svg></span>',m.appendChild(g),f.appendChild(m);var v=te({widget:r,currentOrderBy:d,currentHasImages:c,onWriteClick:Y,onSortChange:p}),y=v.querySelector(".ikr-filter-wrap"),z=v.querySelector(".ikr-write-btn"),x=document.createElement("div");x.className="ikr-compact-actions-slot",z&&x.appendChild(z),y&&x.appendChild(y),f.appendChild(x),l.appendChild(f);var w=document.createElement("div");w.className="ikr-compact-panel",w.setAttribute("role","dialog"),w.setAttribute("aria-hidden","true");var S=document.createElement("div");S.className="ikr-compact-panel-inner";var C=document.createElement("div");C.className="ikr-compact-avg",C.innerHTML='<span class="ikr-icon">'+n.filled+"</span><span>"+s+"</span>",S.appendChild(C),S.appendChild(Ve({ratingCounts:a,allCount:i,iconPair:n,currentRatingFilter:o,onFilterChange:u})),w.appendChild(S);var h=typeof window!="undefined"&&window.matchMedia?window.matchMedia("(max-width:600px)"):null;function b(V){var O=V?l:m;w.parentNode!==O&&(w.classList.contains("ikr-open")&&(w.classList.remove("ikr-open"),w.setAttribute("aria-hidden","true"),g.setAttribute("aria-expanded","false")),O.appendChild(w))}if(b(h?h.matches:!1),h){var E=function(V){b(V.matches)};h.addEventListener?h.addEventListener("change",E):h.addListener&&h.addListener(E)}if(z){var k=document.createElement("button");k.className="ikr-write-btn",k.textContent=I&&I.writeButtonText||"Yorum Yap",k.onclick=Y;var L=document.createElement("div");L.className="ikr-compact-write-row",L.appendChild(k),l.appendChild(L)}function A(){w.classList.remove("ikr-open"),w.setAttribute("aria-hidden","true"),g.setAttribute("aria-expanded","false")}function T(){kr(_),w.classList.add("ikr-open"),w.setAttribute("aria-hidden","false"),g.setAttribute("aria-expanded","true")}g.onclick=function(){w.classList.contains("ikr-open")?A():T()};var _=null;function me(V){_&&(_(),_=null),V||(_=hr({trigger:m,element:w,close:A}))}if(me(h?h.matches:!1),h){var K=function(V){me(V.matches)};h.addEventListener?h.addEventListener("change",K):h.addListener&&h.addListener(K)}if(t.showRecommendation!==!1){var fe=(a[3]||0)+(a[4]||0),ve=i>0?Math.round(fe/i*100):0;if(ve>0){var X=document.createElement("div");X.className="ikr-summary-block ikr-summary-recommend",X.style.marginTop="8px",X.innerHTML='<span class="ikr-recommend-pct">%'+ve+"</span> bu \xFCr\xFCn\xFC tavsiye ediyor",S.appendChild(X)}}return l}var Ur={};Te(Ur,{css:()=>ca,meta:()=>da,render:()=>pa});var Jt=`
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
`;var da={id:"split",name:"Yatay B\xF6l\xFCnm\xFC\u015F"},ca=Jt;function pa(e){var r=e.widget,t=e.settings,n=e.iconPair,i=e.allCount,a=e.ratingCounts,s=e.avgRatingVal,o=e.currentRatingFilter,d=e.currentOrderBy,c=e.currentHasImages,u=e.onFilterChange,p=e.onSortChange,l=document.createElement("div");l.className="ikr-summary ikr-summary-split";var f=document.createElement("div");f.className="ikr-split-col ikr-split-left";var m=document.createElement("div");m.className="ikr-summary-block ikr-summary-avg ikr-split-left-avg-block",m.innerHTML='<span class="ikr-avg-star ikr-icon">'+n.filled+'</span><span class="ikr-avg-num">'+s+"</span>",f.appendChild(m);var g=document.createElement("div");g.className="ikr-summary-block ikr-summary-count ikr-split-left-count",g.textContent=i.toLocaleString("tr-TR")+" Yorum",f.appendChild(g),l.appendChild(f);var v=document.createElement("div");v.className="ikr-split-col ikr-split-mid",v.appendChild(Ve({ratingCounts:a,allCount:i,iconPair:n,currentRatingFilter:o,onFilterChange:u})),l.appendChild(v);var y=te({widget:r,currentOrderBy:d,currentHasImages:c,onWriteClick:Y,onSortChange:p}),z=y.querySelector(".ikr-filter-wrap"),x=y.querySelector(".ikr-write-btn"),w=document.createElement("div");w.className="ikr-split-col ikr-split-right",x&&w.appendChild(x),z&&w.appendChild(z),l.appendChild(w);var S=(a[3]||0)+(a[4]||0),C=i>0?Math.round(S/i*100):0,h=document.createElement("div");h.className="ikr-summary-block ikr-summary-recommend",h.innerHTML='<span class="ikr-recommend-pct">%'+C+"</span> bu \xFCr\xFCn\xFC tavsiye ediyor";var b=t.showRecommendation===!1||C===0;return b&&h.classList.add("ikr-split-rec-hidden"),f.appendChild(h),l}var Zr={};Te(Zr,{css:()=>ma,meta:()=>ua,render:()=>fa});var $t=`
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
`;var ua={id:"minimal",name:"Minimal (Yal\u0131n)",supports:{recommendation:!1,barChart:!1}},ma=$t;function fa(e){var r=e.widget,t=e.iconPair,n=e.allCount,i=e.avgRatingVal,a=e.currentOrderBy,s=e.currentHasImages,o=e.onSortChange,d=document.createElement("div");d.className="ikr-summary ikr-summary-minimal";var c=document.createElement("div");c.className="ikr-minimal-info";var u=document.createElement("div");u.className="ikr-minimal-row";var p=document.createElement("span");p.className="ikr-minimal-avg",p.textContent=i,u.appendChild(p);var l=document.createElement("span");l.className="ikr-minimal-stars",l.innerHTML=oe(i,t),u.appendChild(l);var f=document.createElement("span");f.className="ikr-minimal-count",f.textContent=n.toLocaleString("tr-TR")+" Yorum",u.appendChild(f),c.appendChild(u),d.appendChild(c);var m=te({widget:r,currentOrderBy:a,currentHasImages:s,onWriteClick:Y,onSortChange:o}),g=m.querySelector(".ikr-filter-wrap"),v=m.querySelector(".ikr-write-btn"),y=document.createElement("div");if(y.className="ikr-minimal-actions",v&&y.appendChild(v),g&&y.appendChild(g),d.appendChild(y),v){var z=document.createElement("button");z.className="ikr-write-btn",z.textContent=I&&I.writeButtonText||"Yorum Yap",z.onclick=Y;var x=document.createElement("div");x.className="ikr-minimal-write-row",x.appendChild(z),d.appendChild(x)}return d}var Wr={};Te(Wr,{css:()=>ga,meta:()=>va,render:()=>ka});var Qt=`
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
`;var va={id:"hero",name:"Vurgulu (B\xFCy\xFCk Puan)",supports:{recommendation:!1,barChart:!1}},ga=Qt;function ka(e){var r=e.widget,t=e.iconPair,n=e.allCount,i=e.avgRatingVal,a=e.currentOrderBy,s=e.currentHasImages,o=e.onSortChange,d=document.createElement("div");d.className="ikr-summary ikr-summary-hero";var c=document.createElement("div");c.className="ikr-hero-info";var u=document.createElement("div");u.className="ikr-hero-rating-col";var p=document.createElement("span");p.className="ikr-hero-avg",p.textContent=i,u.appendChild(p);var l=document.createElement("div");l.className="ikr-hero-meta-row";var f=document.createElement("span");f.className="ikr-hero-stars",f.innerHTML=oe(i,t),l.appendChild(f);var m=document.createElement("div");m.className="ikr-hero-count",m.textContent=n.toLocaleString("tr-TR")+" Yorum",l.appendChild(m),u.appendChild(l),c.appendChild(u),d.appendChild(c);var g=te({widget:r,currentOrderBy:a,currentHasImages:s,onWriteClick:Y,onSortChange:o}),v=g.querySelector(".ikr-filter-wrap"),y=g.querySelector(".ikr-write-btn"),z=document.createElement("div");z.className="ikr-hero-actions ikr-desktop-only",y&&z.appendChild(y),v&&z.appendChild(v),d.appendChild(z);var x=te({widget:r,currentOrderBy:a,currentHasImages:s,onWriteClick:Y,onSortChange:o}),w=x.querySelector(".ikr-filter-wrap"),S=x.querySelector(".ikr-write-btn"),C=document.createElement("div");return C.className="ikr-hero-write-row",S&&C.appendChild(S),w&&C.appendChild(w),d.appendChild(C),d}var yr={classic:Gr,compact:Vr,split:Ur,minimal:Zr,hero:Wr};function br(e){return yr[e]||yr.classic}function ei(){return Object.keys(yr).map(function(e){return yr[e].css||""}).join(`
`)}var Kr={};Te(Kr,{css:()=>ya,meta:()=>ha,render:()=>ba});function Ze(e,r){if(!e)return null;var t=document.createElement("div");t.className="ikr-reply";var n=document.createElement("div");n.className="ikr-reply-header";var i=document.createElement("span");i.className="ikr-reply-label",i.textContent="Ma\u011Faza Sahibi",n.appendChild(i),t.appendChild(n);var a=document.createElement("div");a.className="ikr-reply-text ikr-reply-text-clamped",a.textContent=e,t.appendChild(a);var s=document.createElement("span");return s.className="ikr-read-more ikr-reply-read-more",s.textContent="Devam\u0131n\u0131 oku",s.style.display="none",t.appendChild(s),requestAnimationFrame(function(){if(a.scrollHeight>a.clientHeight+2)if(s.style.display="inline",typeof r=="function")s.onclick=r;else{var o=!1;s.onclick=function(){o=!o,a.classList.toggle("ikr-reply-text-clamped",!o),s.textContent=o?"Daha az g\xF6ster":"Devam\u0131n\u0131 oku"}}}),t}var ha={id:"card",name:"Kart (Varsay\u0131lan)",sizeOverrides:{small:{"--ikr-card-photo-w":"80px"},medium:{"--ikr-card-photo-w":"110px"},large:{"--ikr-card-photo-w":"140px"}}},ya="";function ba(e,r){var t=document.createElement("div");t.className="ikr-review ikr-review-card";var n=document.createElement("div");n.className="ikr-review-top";var i=document.createElement("div");i.className="ikr-review-top-left";var a=document.createElement("span");a.className="ikr-review-stars",a.innerHTML=xe(e.rating,I),i.appendChild(a);var s=document.createElement("span");if(s.className="ikr-date",s.textContent=ze(e.createdAt),n.appendChild(i),n.appendChild(s),t.appendChild(n),e.title){var o=document.createElement("div");o.className="ikr-review-title",o.textContent=e.title,t.appendChild(o)}var d=document.createElement("div");d.className="ikr-author",d.textContent=e.author||"",t.appendChild(d);var c=(e.comment||"").trim();if(c){var u=document.createElement("div");u.className="ikr-body ikr-body-clamped",u.textContent=c,t.appendChild(u);var p=document.createElement("span");p.className="ikr-read-more",p.textContent="Devam\u0131n\u0131 oku",p.style.display="none",t.appendChild(p),requestAnimationFrame(function(){if(u.scrollHeight>u.clientHeight+2){p.style.display="inline";var g=!1;p.onclick=function(){g=!g,u.classList.toggle("ikr-body-clamped",!g),p.textContent=g?"Daha az g\xF6ster":"Devam\u0131n\u0131 oku"}}})}var l=Ce(e);if(l.length){var f=document.createElement("div");f.className="ikr-gallery",l.forEach(function(g){var v=document.createElement("img"),y=le(g,W);v.src=y.src,v.srcset=y.srcset,v.loading="lazy",v.decoding="async",v.width=W,v.height=W,v.className="ikr-img",se(v),v.setAttribute("data-ikr-img-url",g),(function(z){v.onclick=function(){ce(e,z,r)}})(g),f.appendChild(v)}),t.appendChild(f)}var m=Ze(e.merchantReply);return m&&t.appendChild(m),t}var Xr={};Te(Xr,{css:()=>xa,meta:()=>wa,render:()=>za});var ri=`
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
`;var wa={id:"list",name:"Liste",supports:{},sizeOverrides:{small:{"--ikr-list-photo-w":"80px","--ikr-list-photo-w-mobile":"80px"},medium:{"--ikr-list-photo-w":"110px","--ikr-list-photo-w-mobile":"100px"},large:{"--ikr-list-photo-w":"140px","--ikr-list-photo-w-mobile":"110px"}}},xa=ri;function za(e,r){var t=Ce(e),n=t.length>0,i=document.createElement("div");i.className="ikr-review-list"+(n?"":" ikr-review-list--no-media");var a=document.createElement("div");a.className="ikr-review-list-author";var s=document.createElement("span");s.className="ikr-review-stars ikr-review-list-author-stars",s.innerHTML=xe(e.rating,I),a.appendChild(s);var o=document.createElement("span");o.className="ikr-review-list-author-name",o.textContent=e.author||"",a.appendChild(o);var d=document.createElement("span");d.className="ikr-date ikr-review-list-author-date",d.textContent=ze(e.createdAt),a.appendChild(d),i.appendChild(a);var c=document.createElement("div");if(c.className="ikr-review-list-content",e.title){var u=document.createElement("div");u.className="ikr-review-list-title",u.textContent=e.title,c.appendChild(u)}var p=(e.comment||"").trim();if(p){var l=document.createElement("div");l.className="ikr-review-list-body ikr-body-clamped",l.textContent=p,c.appendChild(l);var f=document.createElement("span");f.className="ikr-read-more",f.textContent="Devam\u0131n\u0131 oku",f.style.display="none",c.appendChild(f),requestAnimationFrame(function(){if(l.scrollHeight>l.clientHeight+2){f.style.display="inline";var v=!1;f.onclick=function(){v=!v,l.classList.toggle("ikr-body-clamped",!v),f.textContent=v?"Daha az g\xF6ster":"Devam\u0131n\u0131 oku"}}})}var m=Ze(e.merchantReply);if(m&&c.appendChild(m),i.appendChild(c),n){var g=document.createElement("div");g.className="ikr-review-list-media",t.forEach(function(v){var y=document.createElement("img"),z=le(v,W);y.src=z.src,y.srcset=z.srcset,y.loading="lazy",y.decoding="async",y.width=W,y.height=Math.round(W*4/3),y.setAttribute("data-ikr-img-url",v),se(y),(function(x){y.onclick=function(){ce(e,x,r)}})(v),g.appendChild(y)}),i.appendChild(g)}return i}var Jr={};Te(Jr,{css:()=>Sa,meta:()=>Ca,render:()=>Ea});var ti=`
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
`;var Ca={id:"gallery",name:"Galeri",supports:{},sizeOverrides:{small:{"--ikr-gallery-photo-w":"80px","--ikr-gallery-photo-w-mobile":"80px"},medium:{"--ikr-gallery-photo-w":"110px","--ikr-gallery-photo-w-mobile":"100px"},large:{"--ikr-gallery-photo-w":"140px","--ikr-gallery-photo-w-mobile":"110px"}}},Sa=ti;function Ea(e,r){var t=fr(e),n=!!t,i=document.createElement("div");i.className="ikr-review-gallery"+(n?"":" ikr-review-gallery--no-media");var a=document.createElement("div");a.className="ikr-review-gallery-content";var s=document.createElement("span");if(s.className="ikr-review-stars ikr-review-gallery-stars",s.innerHTML=xe(e.rating,I),a.appendChild(s),e.title){var o=document.createElement("div");o.className="ikr-review-gallery-title",o.textContent=e.title,a.appendChild(o)}var d=document.createElement("div");d.className="ikr-review-gallery-author",d.textContent=e.author||"",a.appendChild(d);var c=document.createElement("div");c.className="ikr-review-gallery-date",c.textContent=ze(e.createdAt),a.appendChild(c);var u=(e.comment||"").trim();if(u){var p=document.createElement("div");p.className="ikr-review-gallery-body ikr-body-clamped",p.textContent=u,a.appendChild(p);var l=document.createElement("span");l.className="ikr-read-more",l.textContent="Devam\u0131n\u0131 oku",l.style.display="none",l.style.cursor="pointer";var f=!1;l.onclick=function(){if(t){ce(e,t,r);return}f=!f,p.classList.toggle("ikr-body-clamped",!f),l.textContent=f?"Daha az g\xF6ster":"Devam\u0131n\u0131 oku"},a.appendChild(l),requestAnimationFrame(function(){p.scrollHeight>p.clientHeight+2&&(l.style.display="inline")})}if(i.appendChild(a),n){var m=document.createElement("div");m.className="ikr-review-gallery-media";var g=document.createElement("img"),v=le(t,vr);g.src=v.src,g.srcset=v.srcset,g.loading="lazy",g.decoding="async",g.width=vr,g.height=Math.round(vr*4/3),se(g),g.setAttribute("data-ikr-img-url",t),g.onclick=function(){ce(e,t,r)},m.appendChild(g),i.appendChild(m)}var y=Ze(e.merchantReply,t?function(){ce(e,t,r)}:null);return y&&(y.classList.add("ikr-review-gallery-reply"),i.appendChild(y)),i}var wr={card:Kr,list:Xr,gallery:Jr};function nr(e){return wr[e]||wr.card}function ii(){return Object.keys(wr).map(function(e){return wr[e].css||""}).join(`
`)}function He(e,r){var t=/^#([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})?$/.exec(e);if(!t)return"rgba(0,0,0,"+r+")";var n=parseInt(t[1],16),i=parseInt(t[2],16),a=parseInt(t[3],16);return"rgba("+n+","+i+","+a+","+r+")"}function Ta(){var e=document.getElementById("ikas-reviews-anchor");if(e)return e;e=document.createElement("div"),e.id="ikas-reviews-anchor",e.setAttribute("data-ikr-auto-anchor","1");var r=null;try{r=document.querySelector(Ge)}catch(n){}if(r&&r.parentNode)return r.parentNode.insertBefore(e,r.nextSibling),e;var t=document.querySelector("main")||document.body;return t?(t.appendChild(e),e):null}var ai={small:{titleSize:20,reviewTextSize:12,reviewTitleSize:14,authorSize:12,replyNameSize:12,replyTextSize:12,photoTitleSize:14,avgRatingSize:36,avgStarSize:48,reviewCountSize:16,recommendSize:12,compactCountSize:14,btnTextSize:12,barLabelSize:18,barCountSize:12,reviewDateSize:10,filterTextSize:12,loadMoreSize:12,readMoreSize:10,reviewStarSize:18,minimalAvgSize:18,heroAvgSize:74},medium:{titleSize:24,reviewTextSize:14,reviewTitleSize:16,authorSize:14,replyNameSize:13,replyTextSize:13,photoTitleSize:16,avgRatingSize:46,avgStarSize:58,reviewCountSize:20,recommendSize:14,compactCountSize:16,btnTextSize:14,barLabelSize:22,barCountSize:14,reviewDateSize:12,filterTextSize:14,loadMoreSize:14,readMoreSize:12,reviewStarSize:22,minimalAvgSize:22,heroAvgSize:90},large:{titleSize:28,reviewTextSize:16,reviewTitleSize:18,authorSize:16,replyNameSize:15,replyTextSize:15,photoTitleSize:18,avgRatingSize:56,avgStarSize:68,reviewCountSize:22,recommendSize:16,compactCountSize:18,btnTextSize:16,barLabelSize:26,barCountSize:16,reviewDateSize:14,filterTextSize:16,loadMoreSize:16,readMoreSize:14,reviewStarSize:26,minimalAvgSize:26,heroAvgSize:106}},ni={small:80,medium:110,large:140};function La(e,r){var t=document.createElement("div");t.className="ikr-state-msg ikr-state-error",t.setAttribute("role","status"),t.setAttribute("aria-live","polite");var n=document.createElement("div");n.className="ikr-state-error-text",n.textContent=e||"Yorumlar \u015Fu anda y\xFCklenemiyor.",t.appendChild(n);var i=document.createElement("button");return i.type="button",i.className="ikr-state-retry",i.textContent="Tekrar Dene",i.onclick=async function(){i.disabled=!0,i.textContent="Tekrar deneniyor...",await r()},t.appendChild(i),t}function Aa(e,r){var t=r.headerTitleColor||"#111111",n=r.headerAvgColor||"#111111",i=r.headerCountColor||"#111111",a=r.headerRecommendColor||"#111111",s=r.barFillColor||"#111111",o=r.barTrackColor||"#e5e7eb",d=r.barCountColor||"#111111",c=He(s,.06),u=r.reviewStarColor||"#f59e0b",p=u,l=r.btnBgColor||"#111111",f=r.btnTextColor||"#ffffff",m=r.btnBorderColor||"#111111",g=r.filterBtnBgColor||"#111111",v=r.filterBtnTextColor||"#ffffff",y=r.filterBtnBorderColor||"#111111",z=r.filterMenuBgColor||"#ffffff",x=r.filterMenuBorderColor||"#e5e7eb",w=r.filterItemTextColor||"#111111",S=r.filterItemHoverBgColor||"#f3f4f6",C=r.filterItemActiveColor||"#111111",h=r.reviewTitleColor||"#111111",b=r.reviewAuthorColor||"#111111",E=r.reviewDateColor||"#5e5e5e",k=r.reviewBodyColor||"#111111",L=r.reviewBorderColor||"#e5e7eb",A=r.replyBgColor||"#f9fafb",T=r.replyBorderColor||"#747474",_=r.replyLabelColor||"#111111",me=r.replyTextColor||"#111111",K=r.photoTitleColor||"#111111",fe=He("#111111",.05),ve=r.photoArrowBgColor||"#ffffff",X=r.photoArrowTextColor||"#111111",V=He("#111111",.12),O=r.formBgColor||"#ffffff",ge=r.formPrimaryTextColor||"#111111",ke=r.formSecondaryTextColor||"#3b3b3b",U=r.inputTextColor||ge,Ee=r.inputBorderColor||"#d1d5db",Fe=r.placeholderColor||"#9ca3af",he=r.formStepBarColor||"#111111",ie=r.formBtnBgColor||"#111111",D=r.formBtnTextColor||"#ffffff",Xe=r.formBtnBorderColor||"#111111",ye=He(ie,.06),Pe=He(ie,.18),be=He(D,.85),Q=He(ge,.06),ae=r.loadMoreBgColor||"#ffffff",Ne=r.loadMoreTextColor||"#111111",J=r.loadMoreBorderColor||"#111111",B={"--ikr-widget-bg":"#ffffff00","--ikr-widget-border":"#ffffff00","--ikr-header-title":t,"--ikr-header-avg":n,"--ikr-header-count":i,"--ikr-header-recommend":a,"--ikr-bar-fill":s,"--ikr-bar-track":o,"--ikr-star-empty-color":p,"--ikr-bar-count":d,"--ikr-bar-hover-bg":c,"--ikr-btn-bg":l,"--ikr-btn-text":f,"--ikr-btn-border":m,"--ikr-filter-btn-bg":g,"--ikr-filter-btn-text":v,"--ikr-filter-btn-border":y,"--ikr-filter-menu-bg":z,"--ikr-filter-menu-border":x,"--ikr-filter-item-text":w,"--ikr-filter-item-hover-bg":S,"--ikr-filter-item-active":C,"--ikr-review-title":h,"--ikr-review-author":b,"--ikr-review-date":E,"--ikr-review-body":k,"--ikr-review-border":L,"--ikr-review-star-color":u,"--ikr-reply-bg-color":A,"--ikr-reply-border":T,"--ikr-reply-label":_,"--ikr-reply-text":me,"--ikr-photo-title":K,"--ikr-photo-image-border":fe,"--ikr-photo-arrow-bg":ve,"--ikr-photo-arrow-text":X,"--ikr-photo-arrow-border":V,"--ikr-fwizard-bg":O,"--ikr-fwizard-text":ge,"--ikr-fwizard-secondary-text":ke,"--ikr-fwizard-input-bg":O,"--ikr-fwizard-input-text":U,"--ikr-fwizard-input-border":Ee,"--ikr-fwizard-placeholder":Fe,"--ikr-fwizard-close-text":ge,"--ikr-fwizard-close-hover-bg":Q,"--ikr-fwizard-progress-bg":Q,"--ikr-fwizard-progress-active":he,"--ikr-fwizard-btn-bg":ie,"--ikr-fwizard-btn-text":D,"--ikr-fwizard-btn-border":Xe,"--ikr-fwizard-btn-disabled-bg":Pe,"--ikr-fwizard-btn-disabled-text":be,"--ikr-fwizard-nav-hover-bg":ye,"--ikr-load-more-bg":ae,"--ikr-load-more-text":Ne,"--ikr-load-more-border":J};Object.keys(B).forEach(function(ne){e.style.setProperty(ne,B[ne])}),typeof window!="undefined"&&window.__ikasPreviewMode&&document.body&&(document.body.style.background="transparent",document.documentElement.style.background="transparent")}async function ue(e,r,t,n,i,a,s){if(_r){cr({productId:e,settings:r,reviewsData:t,productName:n,orderBy:i,page:a,badgeSettings:s});return}dr(!0),st(e),dt(r),s!==void 0&&ct(s),pt(n),i&&je(i),a&&Re(a),t!=null&&ut(t);try{let Cr=function(P,R){if(!(!P||!P.meta||!P.meta.sizeOverrides)){var M=P.meta.sizeOverrides[R];M&&Object.keys(M).forEach(function(_e){l.style.setProperty(_e,M[_e])})}};var Wa=Cr,o=br(r.summaryLayout),d=!(o.meta&&o.meta.supports&&o.meta.supports.title===!1),c=r.showTitle!==!1,u=(r.title||"").trim()||"M\xFC\u015Fteri Yorumlar\u0131",p=d&&c?u:"",l=document.documentElement;Aa(l,r),Ct("#111111",Nt+ei()+ii());var f=r.borderRadius!==void 0?r.borderRadius:8,m=ai[r.size]||ai.medium,g=ni[r.thumbnailSize]||ni.medium,v=nr(r.reviewLayout);if(v.meta&&v.meta.sizeOverrides&&v.meta.sizeOverrides[r.size]){var y=v.meta.sizeOverrides[r.size],z=y["--ikr-list-photo-w"]||y["--ikr-gallery-photo-w"];z&&(g=parseInt(z))}l.style.setProperty("--ikr-title-size",m.titleSize+"px"),l.style.setProperty("--ikr-review-text-size",m.reviewTextSize+"px"),l.style.setProperty("--ikr-review-title-size",m.reviewTitleSize+"px"),l.style.setProperty("--ikr-author-size",m.authorSize+"px"),l.style.setProperty("--ikr-reply-name-size",m.replyNameSize+"px"),l.style.setProperty("--ikr-reply-text-size",m.replyTextSize+"px"),l.style.setProperty("--ikr-radius",f+"px"),l.style.setProperty("--ikr-radius-sm",Math.max(0,f-4)+"px"),l.style.setProperty("--ikr-photo-title-size",m.photoTitleSize+"px"),l.style.setProperty("--ikr-avg-rating-size",m.avgRatingSize+"px"),l.style.setProperty("--ikr-review-count-size",m.reviewCountSize+"px"),l.style.setProperty("--ikr-compact-count-size",m.compactCountSize+"px"),l.style.setProperty("--ikr-recommend-size",m.recommendSize+"px"),l.style.setProperty("--ikr-btn-text-size",m.btnTextSize+"px"),l.style.setProperty("--ikr-bar-label-size",m.barLabelSize+"px"),l.style.setProperty("--ikr-minimal-avg-size",m.minimalAvgSize+"px"),l.style.setProperty("--ikr-hero-avg-size",m.heroAvgSize+"px"),l.style.setProperty("--ikr-bar-count-size",m.barCountSize+"px"),l.style.setProperty("--ikr-review-date-size",m.reviewDateSize+"px"),l.style.setProperty("--ikr-filter-text-size",m.filterTextSize+"px"),l.style.setProperty("--ikr-load-more-size",m.loadMoreSize+"px"),l.style.setProperty("--ikr-read-more-size",m.readMoreSize+"px"),l.style.setProperty("--ikr-thumbnail-size",g+"px");var x=/^#[0-9A-Fa-f]{6}([0-9A-Fa-f]{2})?$/.test(r.reviewStarColor||"")?r.reviewStarColor:"#f59e0b";l.style.setProperty("--ikr-review-star-color",x),l.style.setProperty("--ikr-star-empty-color",x),l.style.setProperty("--ikr-star-size",m.reviewStarSize+"px"),l.style.setProperty("--ikr-avg-star-size",m.avgStarSize+"px"),Cr(br(r.summaryLayout),r.size),Cr(nr(r.reviewLayout),r.size);var w=Me(r),S=document.getElementById("ikas-reviews");if(!S){var C=Ta();if(!C)return;S=document.createElement("div"),S.id="ikas-reviews",S.style.minHeight="200px",C.appendChild(S)}if(r.enabled===!1){S.style.minHeight="auto",S.innerHTML='<div style="padding: 40px 20px; margin-top: 24px; text-align: center; color: #6e6d7a; font-family: Inter, sans-serif; border: 1px dashed #e3e1e5; border-radius: '+(r.borderRadius!==void 0?r.borderRadius:8)+'px; background: #fafafa; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px;"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #6e6d7a; margin-bottom: 4px;"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg><div style="font-weight: 500; font-size: 18px; color: #1a191a; letter-spacing: -0.01em;">Widget \u015Fu anda Pasif durumda</div><div style="font-size: 16px; color: #6e6d7a; max-width: 380px; line-height: 1.5;">Canl\u0131 ma\u011Fazan\u0131zda m\xFC\u015Fterileriniz hi\xE7bir yorum alan\u0131 g\xF6rmeyecektir.</div></div>',dr(!1);var h=$e;cr(null),h&&ue(h.productId,h.settings,h.reviewsData,h.productName,h.orderBy,h.page,h.badgeSettings);return}S.innerHTML='<p class="ikr-state-msg ikr-state-loading">Yorumlar y\xFCkleniyor...</p>';try{var b=t||{},E=$r(b),k=E?[]:b.data&&b.data.reviews||[],L=E?0:b.data&&b.data.totalCount||0;gt(k);var A=S.cloneNode(!1);S.parentNode.replaceChild(A,S),S=A;var T=document.createElement("div");if(T.id="ikas-reviews-widget",typeof window!="undefined"&&window.__ikasPreviewMode&&(T.style.width="100%",T.style.maxWidth="100%",T.style.marginLeft="0",T.style.marginRight="0"),p){var _=document.createElement("div"),me=r.summaryLayout||"classic";_.className="ikr-title ikr-title-"+me,_.textContent=p,T.appendChild(_)}if(E){T.appendChild(La(b.message,async function(){var P=await Oe(Z,$,1,Le,Ae);await ue(Z,I,P,we,$,1,lr)})),S.appendChild(T);return}var K=b.data&&b.data.allCount||0,fe=b.data&&b.data.ratingCounts||null,ve=fe||[0,0,0,0,0],X=b.data&&b.data.avgRating||"0.0";if(!fe&&k.length>0){k.forEach(function(P){P.rating>=1&&P.rating<=5&&ve[P.rating-1]++});var V=k.reduce(function(P,R){return P+R.rating},0);X=(V/k.length).toFixed(1)}if(K>0){var O=br(r.summaryLayout),ge=O.render({widget:T,data:b,settings:r,iconPair:w,allCount:K,ratingCounts:ve,avgRatingVal:X,currentRatingFilter:Le,currentOrderBy:$,currentHasImages:Ae,onFilterChange:async function(P){sr(Le===P?null:P),Re(1);var R=await Oe(Z,$,1,Le,Ae);await ue(Z,I,R,we,$,1)},onSortChange:async function(P,R){Re(1),R?(Nr(!0),je("newest")):(Nr(!1),je(P));var M=await Oe(Z,$,1,Le,Ae);await ue(Z,I,M,we,$,1)}});T.appendChild(ge)}else{var ke=document.createElement("button");ke.className="ikr-write-btn",ke.style.cssText="display:block;margin:16px auto 0;",ke.textContent=r.writeButtonText||"Yorum Yap",ke.onclick=Y,T.appendChild(ke)}var U=(Pr||[]).filter(function(P){return Ce(P).length>0});if(r.showPhotoGallery!==!1&&!Ae&&U.length>0){var Ee=document.createElement("div");if(Ee.className="ikr-photo-section",r.showPhotoGalleryTitle!==!1){var Fe=(r.photoGalleryTitle||"").trim()||"Foto\u011Frafl\u0131 Yorumlar",he=document.createElement("div");he.className="ikr-photo-title",he.textContent=Fe,Ee.appendChild(he)}var ie=r.reviewLayout==="card"?"1/1":"3/4";l.style.setProperty("--ikr-photo-thumb-aspect",ie);var D=document.createElement("div");D.className="ikr-photo-strip";var Xe=W,ye=r.reviewLayout==="card"?W:Math.round(W*4/3),Pe=0;U.forEach(function(P){if(!(Pe>=15)){var R=fr(P);if(R){var M=document.createElement("img"),_e=le(R,W);M.src=_e.src,M.srcset=_e.srcset,M.loading=Pe<3?"eager":"lazy",M.decoding="async",M.width=Xe,M.height=ye,M.className="ikr-photo-strip-thumb",M.alt="Yorum foto\u011Fraf\u0131",se(M),(function(bi,wi){M.onclick=function(){ce(wi,bi,U)}})(R,P),D.appendChild(M),Pe++}}});var be=document.createElement("button");be.className="ikr-photo-strip-arrow ikr-photo-strip-arrow-prev",be.innerHTML="&#8249;",be.setAttribute("aria-label","\xD6nceki"),be.onclick=function(){D.scrollBy({left:-200,behavior:"smooth"})};var Q=document.createElement("button");Q.className="ikr-photo-strip-arrow ikr-photo-strip-arrow-next",Q.innerHTML="&#8250;",Q.setAttribute("aria-label","Sonraki"),Q.onclick=function(){D.scrollBy({left:200,behavior:"smooth"})};var ae=document.createElement("div");ae.className="ikr-photo-strip-wrap",ae.appendChild(be),ae.appendChild(D),ae.appendChild(Q),Ee.appendChild(ae),T.appendChild(Ee)}if(k.length===0){var Ne=document.createElement("p");Ne.className="ikr-state-msg",Ne.textContent="Hen\xFCz yorum yok.",T.appendChild(Ne)}else{var v=nr(r.reviewLayout);k.forEach(function(R){T.appendChild(v.render(R,De))})}var J=b.data&&b.data.hasMore;if(J){var B=document.createElement("button");B.className="ikr-load-more",B.textContent="Daha Fazla G\xF6ster",B.onclick=async function(){B.disabled=!0,B.textContent="Y\xFCkleniyor...";var P=Je+1,R=await Oe(Z,$,P,Le,Ae);if(R&&!$r(R)&&R.data&&Array.isArray(R.data.reviews)){kt(R.data.reviews),Re(P);var M=nr(I.reviewLayout);R.data.reviews.forEach(function(_e){T.insertBefore(M.render(_e,De),B)}),R.data.hasMore?(B.disabled=!1,B.textContent="Daha Fazla G\xF6ster"):B.remove()}else B.disabled=!1,B.textContent="Tekrar Dene"},T.appendChild(B)}S.appendChild(T),Pt(K>0?X:null,L,n,lr)}catch(P){console.error("[ikr] render error:",P),S.innerHTML='<p style="text-align:center;color:#dc2626;">Yorumlar y\xFCklenirken bir hata olu\u015Ftu.</p>'}}finally{if(dr(!1),$e){var ne=$e;cr(null),ue(ne.productId,ne.settings,ne.reviewsData,ne.productName,ne.orderBy,ne.page,ne.badgeSettings)}}}var Ia=15,Ie="ikr_settings_"+F,Pa=300*1e3,Na=10080*60*1e3,_a=30*1e3;async function et(){if(window.__ikasPreviewMode){try{var e=window.__ikasPreviewBaseUrl||q,r=window.__ikasPreviewSettings||sessionStorage.getItem("ikr_preview_settings")||"",t={};if(r)try{t=JSON.parse(r)}catch(p){}var n=await re(e+"/api/preview/settings");if(n.ok){var i=await n.json();return i.widgets&&i.widgets.reviews&&Object.keys(t).length&&(i.widgets.reviews=Object.assign({},i.widgets.reviews,t)),i}}catch(p){}return null}var a=null,s=rr(Ie);if(s)try{var o=JSON.parse(s);if(o&&o.t!==void 0)if(o.notFound){if(Date.now()-o.t<_a)return null;H(Ie,"")}else if(o.v){var d=Date.now()-o.t;if(d<Pa)return o.v;d<Na?a=o.v:H(Ie,"")}else H(Ie,"");else H(Ie,"")}catch(p){H(Ie,"")}try{var c=await re(q+"/api/public/settings?publicApiKey="+encodeURIComponent(F));if(!c.ok)return c.status===404&&H(Ie,JSON.stringify({t:Date.now(),notFound:!0})),a||null;var u=await c.json();return H(Ie,JSON.stringify({t:Date.now(),v:u})),u}catch(p){return console.error("[ikr] fetchSettings error:",p),a||null}}var Ra=60*1e3,oi="__ikrReviewsFetchError";function xr(e){return{type:oi,message:e||"Yorumlar \u015Fu anda y\xFCklenemiyor."}}function $r(e){return!!(e&&e.type===oi)}async function Oe(e,r,t,n,i,a){if(window.__ikasPreviewMode){try{var s=window.__ikasPreviewBaseUrl||q,o=s+"/api/preview/reviews?page="+encodeURIComponent(t||1),d=await re(o);if(d.ok)return await d.json()}catch(y){}return xr()}r=r||"newest",t=t||1;var c=a?"_l"+a:"",u="ikr_reviews_"+F+"_"+e+"_"+r+"_"+t+"_"+(n||"")+"_"+(i?"1":"0")+c,p=null,l=rr(u);if(l)try{var f=JSON.parse(l);if(f&&f.t!==void 0&&f.v){if(Date.now()-f.t<Ra)return f.v;p=f.v,H(u,"")}else H(u,"")}catch(y){H(u,"")}try{var m=q+"/api/public/reviews?storeId="+encodeURIComponent(F)+"&productId="+encodeURIComponent(e)+"&orderBy="+encodeURIComponent(r)+"&page="+encodeURIComponent(t)+(n?"&rating="+encodeURIComponent(n):"")+(i?"&hasImages=true":"")+(a?"&limit="+encodeURIComponent(a):""),g=await re(m);if(!g.ok)return p||xr();var v=await g.json();return H(u,JSON.stringify({t:Date.now(),v})),v}catch(y){return console.error("[ikr] fetchReviews error:",y),p||xr()}}async function Ba(e){var r=await Oe(e,"newest",1,null,!0,Ia);return!r||!r.data||!Array.isArray(r.data.reviews)?[]:r.data.reviews}var Qr={};async function We(e,r){var t=document.getElementById("ikr-rating-badge");t&&t.remove();var n=document.getElementById("ikr-jsonld");if(n&&n.remove(),!Qr[e]){Qr[e]=!0;var i={title:"M\xFC\u015Fteri Yorumlar\u0131",enabled:!0},a={enabled:!0,icon:"star",size:"medium",color:"#f59e0b"};try{var s=await et();if(!s)return;var o=s.widgets&&s.widgets.reviews||i,d=s.widgets&&s.widgets.badge||a;if(o.enabled===!1)return;je("newest"),Re(1),sr(null);var c=await Promise.all([Oe(e,"newest",1,null),Ba(e)]),u=c[0];mt(c[1]),await ue(e,o,u,r,"newest",1,d)}catch(p){console.error("[ikr] bootstrap error:",p),await ue(e,i,xr(),r,void 0,void 0,a)}finally{delete Qr[e]}}}function rt(){try{var e=window.__NEXT_DATA__&&window.__NEXT_DATA__.props&&window.__NEXT_DATA__.props.pageProps;if(e&&e.pageType==="PRODUCT"&&e.pageSpecificData&&e.pageSpecificData.id)return{id:e.pageSpecificData.id,name:e.pageSpecificData.name||null}}catch(n){}if(window.IkasStorefront&&window.IkasStorefront.product&&window.IkasStorefront.product.id)return{id:window.IkasStorefront.product.id,name:window.IkasStorefront.product.name||null};var r=window.location.pathname.match(/--([a-f0-9-]{36})(?:\/|$|\?)/);if(r)return{id:r[1],name:null};var t=new URLSearchParams(window.location.search).get("productId");return t?{id:t,name:null}:null}function li(){var e={},r={};return document.querySelectorAll("a[href]").forEach(function(t){try{var n=t.getAttribute("href");if(!n||n.charAt(0)==="#"||n.charAt(0)==="?")return;var i=j(t.href);if(!i||r[i]||!/^[a-z0-9][a-z0-9-]{2,}$/.test(i)||mr.test(i))return;r[i]=!0,e[i]=null}catch(a){}}),Object.keys(Qe).forEach(function(t){e[t]=Qe[t]}),e}var Ma=300*1e3,si=50;async function di(e){var r="ikr_ratings_"+F,t={},n=rr(r);if(n)try{var i=JSON.parse(n);i&&i.t!==void 0&&Date.now()-i.t<Ma?t=i.v||{}:H(r,"")}catch(c){H(r,"")}var a=e.filter(function(c){return!t[c]});if(!a.length)return t;for(var s=[],o=0;o<a.length;o+=si)s.push(a.slice(o,o+si));var d=await Promise.all(s.map(function(c){var u=q+"/api/public/ratings-by-slug?storeId="+encodeURIComponent(F)+"&slugs="+c.map(encodeURIComponent).join(",");return re(u).then(function(p){return p.ok?p.json().then(function(l){return l.data||{}}):{}}).catch(function(){return{}})}));return d.forEach(function(c){a.forEach(function(u){t[u]||(t[u]={average:0,count:0,_empty:!0})}),Object.keys(c).forEach(function(u){t[u]=c[u]})}),H(r,JSON.stringify({t:Date.now(),v:t})),t}var Ha="var(--ikr-badge-color,#f59e0b)",ci=13,Oa="display:flex;align-items:center;gap:3px;margin-top:0px;margin-bottom:4px;font-size:13px;font-weight:400;color:#555;pointer-events:none;";function Fa(e){var r=tr("star","classic"),t="width:"+ci+"px;height:"+ci+"px;";return'<span style="color:'+Ha+';display:inline-flex;align-items:center;">'+oe(e,r,{sizeStyle:t})+"</span>"}function or(e,r){var t=document.createElement("div");return t.setAttribute("data-ikr-listing-badge","1"),t.style.cssText=Oa+"justify-content:"+(r||"flex-start")+";",t.innerHTML=Fa(e.avg)+'<span style="font-weight:400;">'+e.avg+" ("+e.count+")</span>",t}var pi='[class*="productTitle"],[class*="productName"],[class*="product_title"],[class*="product_name"],[class*="product-title"],[class*="product-name"]',Da=/^(tükendi|sold out|out of stock|stokta yok|satıldı|unavailable)$/i;function tt(e,r){var t=e.querySelector(_t);if(t)return t;if(e.matches&&e.matches(pi))return e;var n=e.querySelector(pi);if(n)return n;if(r){for(var i=e.querySelectorAll("*"),a=0;a<i.length;a++)if(i[a].children.length===0&&i[a].textContent.trim()===r)return i[a]}for(var s=e.querySelectorAll("p, h1, h2, h3, h4, h5, h6, span, div"),o=0;o<s.length;o++){var d=s[o],c=d.textContent.trim();if(!(!c||c.length<2||c.length>150)&&!/^[\d\s.,₺$€£%]+$/.test(c)&&!Da.test(c)&&!(d.closest("figure")||d.closest("picture"))&&!(d.children.length>1))return d}return null}function ja(e,r,t,n){if(!e.getAttribute("data-ikr-badge")){var i=j(e.href);if(e.id==="ikr-rating-badge"){e.setAttribute("data-ikr-badge","1");return}if(i===n&&e.getAttribute("href")&&e.getAttribute("href").charAt(0)==="#"){e.setAttribute("data-ikr-badge","1");return}if(e.closest("header")||e.closest("nav")){e.setAttribute("data-ikr-badge","1");return}if(e.closest('[class*="basket"]')||e.closest('[class*="cart"]')){e.setAttribute("data-ikr-badge","1");return}if(e.closest(Ge)&&!e.closest(Fr)){e.setAttribute("data-ikr-badge","1");return}if(i===n&&e.closest(Fr)){e.setAttribute("data-ikr-badge","1");return}if(e.closest(Mt)){e.setAttribute("data-ikr-badge","1");return}var a=!!e.querySelector("a[href]"),s=Array.from(e.childNodes).filter(function(m){return m.nodeType===3}).map(function(m){return m.textContent.trim()}).join("").trim(),o=!!tt(e,t);if(!s&&!o&&!a){e.setAttribute("data-ikr-badge","1");return}if(e.setAttribute("data-ikr-badge","1"),a){e.querySelectorAll("a[href]").forEach(function(m){m.setAttribute("data-ikr-badge","1")});var d=tt(e,t);if(!d||d.querySelector("[data-ikr-listing-badge]"))return;var c=window.getComputedStyle(d).textAlign;d.appendChild(or(r,c==="center"?"center":c==="right"?"flex-end":"flex-start"));return}var u=tt(e,t);if(!(u&&u.querySelector("[data-ikr-listing-badge]")))if(u){var p=window.getComputedStyle(u).textAlign;u.appendChild(or(r,p==="center"?"center":p==="right"?"flex-end":"flex-start"))}else{var l=or(r,"flex-start"),f=e.firstElementChild;f?e.insertBefore(l,f):e.appendChild(l)}}}function Ya(e,r){var t=document.querySelector(Rt);if(t){var n=t.querySelector(Bt);if(!(!n||n.querySelector("[data-ikr-listing-badge]"))){var i=null;if(er&&r[er]&&(i=er),!i){var a=j(window.location.pathname);a&&r[a]&&(i=a)}if(!i){var s=n.textContent.trim();Object.keys(e).forEach(function(p){if(!i){var l=e[p];l&&l.trim()===s&&r[p]&&(i=p)}})}if(!i){var o=document.querySelector(Ge);if(o){var d=o.querySelector("a[href]");if(d){var c=j(d.href);c&&r[c]&&(i=c)}}}if(!i){var u=n.textContent.trim().toLowerCase();document.querySelectorAll("a[href]").forEach(function(p){if(!i&&!(p.closest("header")||p.closest("nav"))&&!p.closest(Ge)){var l=p.textContent.trim().toLowerCase();if(l&&l===u){var f=j(p.href);f&&r[f]&&(i=f)}}})}!i||!r[i]||r[i]._empty||r[i].count===0||n.appendChild(or(r[i],"flex-start"))}}}function ui(e,r){var t=j(window.location.pathname),n=document.querySelectorAll(Ht),i=[];n.forEach(function(a){a.tagName==="A"&&a.href?i.push(a):a.querySelectorAll("a[href]").forEach(function(s){i.push(s)})}),Object.keys(e).forEach(function(a){var s=r[a];if(!(!s||s._empty||s.count===0)){var o=e[a];i.forEach(function(d){j(d.href)===a&&ja(d,s,o,t)})}}),Ya(e,r)}async function Ke(){if(N.inProgress){N.queued=!0;return}if(!N.rendered){N.rendered=!0,N.inProgress=!0;try{var e=N.navCleanup;e&&(N.navCleanup=!1);var r=li();if(!Object.keys(r).length){N.rendered=!1;return}var t=await Promise.all([et(),di(Object.keys(r))]),n=t[0];if(!n){N.rendered=!1;return}var i=t[1],a=n&&n.widgets||{},s=a.badge&&a.badge.color||"#f59e0b";if(a.badge&&a.badge.enabled===!1){N.rendered=!1;return}document.documentElement.style.setProperty("--ikr-badge-color",s),e&&(document.querySelectorAll("[data-ikr-listing-badge]").forEach(function(o){o.remove()}),document.querySelectorAll("[data-ikr-badge]").forEach(function(o){o.removeAttribute("data-ikr-badge")})),ui(r,i)}finally{N.inProgress=!1,N.queued&&(N.queued=!1,N.rendered=!1,Ke())}}}var mi=!1,fi=!1;function ki(){fi||(fi=!0,document.addEventListener("click",function(e){var r=e.target.closest("a[href]");if(r&&!(r.closest("header")||r.closest("nav"))&&!(r.closest('[class*="basket"]')||r.closest('[class*="cart"]'))){var t=j(r.href);!t||t.length<3||ht(t)}},!0))}var vi=!1,gi=typeof location!="undefined"?location.pathname:"";function zr(){try{if(location.pathname===gi)return;gi=location.pathname;var e=document.getElementById("ikr-rating-badge");e&&e.remove();var r=document.getElementById("ikr-jsonld");r&&r.remove()}catch(t){}}function qa(){if(!vi){vi=!0;var e=history.pushState,r=history.replaceState;history.pushState=function(){var t=e.apply(this,arguments);return zr(),t},history.replaceState=function(){var t=r.apply(this,arguments);return zr(),t},window.addEventListener("popstate",zr),window.addEventListener("hashchange",zr)}}function it(){if(qa(),window.IkasEvents){if(mi)return;mi=!0,window.IkasEvents.subscribe({id:"ikas-reviews-widget",callback:function(a){if(a&&a.type==="VIEW_LISTING"){var s=a.data&&a.data.productDetails;Array.isArray(s)&&s.forEach(function(u){u&&u.metaData&&u.metaData.slug&&u.name&&(Qe[u.metaData.slug]=u.name)})}if(a&&a.type==="PRODUCT_VIEW"){var o=a.data&&a.data.productDetail&&a.data.productDetail.id,d=a.data&&a.data.productDetail&&a.data.productDetail.name;o&&(H("ikr_reviews_"+F+"_"+o,""),We(o,d))}if(a&&a.type==="PAGE_VIEW"){var c=Date.now();if(N.lastPageView&&c-N.lastPageView<800)return;N.lastPageView=c,N.navCleanup=!0,N.rendered=!1,Ke()}}});var e=rt();if(e)We(e.id,e.name);else{let a=function(){var s=rt();s?We(s.id,s.name):r<20&&(r++,setTimeout(a,100))};var n=a,r=0;setTimeout(a,100)}setTimeout(function(){N.rendered||Ke()},2e3)}else{let a=function(){window.IkasEvents?it():t<100&&(t++,setTimeout(a,50))};var i=a,t=0;setTimeout(a,50)}}var hi=null;function yi(){if(typeof MutationObserver!="undefined"){var e=new MutationObserver(function(r){var t=r.some(function(n){return Array.from(n.addedNodes).some(function(i){return!(i.nodeType!==1||i.hasAttribute&&(i.hasAttribute("data-ikr-listing-badge")||i.id==="ikr-rating-badge"||i.id==="ikr-reviews-widget")||i.closest&&(i.closest("[data-ikr-listing-badge]")||i.closest("#ikr-rating-badge")||i.closest("#ikr-reviews-widget"))||i.querySelector&&i.querySelector("[data-ikr-listing-badge],#ikr-reviews-widget,#ikr-rating-badge"))})});t&&(clearTimeout(hi),hi=setTimeout(function(){var n=Array.from(document.querySelectorAll("a[href]")).some(function(i){if(i.getAttribute("data-ikr-badge"))return!1;var a=j(i.href);return a&&a.length>=3&&!mr.test(a)});n&&(N.rendered=!1,Ke())},300))});e.observe(document.body,{childList:!0,subtree:!0})}}var Ga=window.__ikasPreviewMode===!0;if(Ga){let e=function(){try{window.parent.postMessage({type:"IKR_WIDGET_READY"},"*")}catch(t){}},r=function(){We("mock-product","\xD6rnek \xDCr\xFCn"),e()};Va=e,Ua=r,window.addEventListener("message",function(t){var n=t.data;if(!(!n||n.type!=="IKR_SETTINGS_UPDATE")){var i=n.settings;if(!(!i||!I)){var a=Object.assign({},I,i);ue(Z,a,Ir,we,$,Je),window.dispatchEvent(new CustomEvent("IKR_SETTINGS_UPDATED_PREVIEW"))}}}),document.readyState==="loading"?document.addEventListener("DOMContentLoaded",r):r()}else if(F){let e=function(){it(),ki(),yi()};Za=e,document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e):e()}var Va,Ua,Za;})();
