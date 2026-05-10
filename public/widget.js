/* ikas Reviews Widget — built 2026-05-10T23:28:54.854Z | theme: default */
"use strict";(()=>{var ei=Object.defineProperty;var xe=(e,r)=>{for(var t in r)ei(e,t,{get:r[t],enumerable:!0})};var ri=typeof document!="undefined",Vr=ri?document.currentScript||(function(){for(var e=document.getElementsByTagName("script"),r=e.length-1;r>=0;r--)if(e[r].src&&e[r].src.indexOf("/widget.js")!==-1)return e[r];return e[e.length-1]})():null,yr=Vr?Vr.src:"",ti=new URLSearchParams(yr.split("?")[1]||""),Y=ti.get("publicApiKey"),ee=yr?yr.split("?")[0].replace(/\/widget\.js$/,""):"";var le="newest",Ve=1,Ae=null,Ne=!1,re=null,L=null,br=null,ze=null,xr=null,zr=[];function Be(e){le=e}function Ie(e){Ve=e}function tr(e){Ae=e}function Cr(e){Ne=e}function Ur(e){re=e}function Wr(e){L=e}function Kr(e){br=e}function Xr(e){ze=e}function $r(e){xr=e}function Jr(e){zr=Array.isArray(e)?e:[]}var Sr=!1,Ue=null;function ir(e){Sr=e}function ar(e){Ue=e}var I={rendered:!1,inProgress:!1,queued:!1,navCleanup:!1,lastPageView:0},We={},Ke=null;function Qr(e){Ke=e}var et={};function Xe(e){try{return sessionStorage.getItem(e)}catch(r){return et[e]||null}}function P(e,r){try{sessionStorage.setItem(e,r)}catch(t){et[e]=r}}var _e="0 -960 960 960",G="0 0 256 256",te={starFill:"m233-120 65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z",starOutline:"m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-355Z",starRounded:"M480-269 314-169q-11 7-23 6t-21-8q-9-7-14-17.5t-2-23.5l44-189-147-127q-10-9-12.5-20.5T140-571q4-11 12-18t22-9l194-17 75-178q5-12 15.5-18t21.5-6q11 0 21.5 6t15.5 18l75 178 194 17q14 2 22 9t12 18q4 11 1.5 22.5T809-528L662-401l44 189q3 13-2 23.5T690-171q-9 7-21 8t-23-6L480-269Z",starRoundedOutline:"m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143Zm126 18L314-169q-11 7-23 6t-21-8q-9-7-14-17.5t-2-23.5l44-189-147-127q-10-9-12.5-20.5T140-571q4-11 12-18t22-9l194-17 75-178q5-12 15.5-18t21.5-6q11 0 21.5 6t15.5 18l75 178 194 17q14 2 22 9t12 18q4 11 1.5 22.5T809-528L662-401l44 189q3 13-2 23.5T690-171q-9 7-21 8t-23-6L480-269Zm0-201Z",boxSquare:"M160-80h640q33 0 56.5-23.5T880-160v-640q0-33-23.5-56.5T800-880H160q-33 0-56.5 23.5T80-800v640q0 33 23.5 56.5T160-80Z",boxSquareOutline:"M200-200h560v-560H200v560Zm0 80q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Z",phLeafFill:"M223.45,40.07a8,8,0,0,0-7.52-7.52C139.8,28.08,78.82,51,52.82,94a87.09,87.09,0,0,0-12.76,49A101.72,101.72,0,0,0,46.7,175.2a4,4,0,0,0,6.61,1.43l85-86.3a8,8,0,0,1,11.32,11.32L56.74,195.94,42.55,210.13a8.2,8.2,0,0,0-.6,11.1,8,8,0,0,0,11.71.43l16.79-16.79c14.14,6.84,28.41,10.57,42.56,11.07q1.67.06,3.33.06A86.93,86.93,0,0,0,162,203.18C205,177.18,227.93,116.21,223.45,40.07Z",phLeafRegular:"M223.45,40.07a8,8,0,0,0-7.52-7.52C139.8,28.08,78.82,51,52.82,94a87.09,87.09,0,0,0-12.76,49c.57,15.92,5.21,32,13.79,47.85l-19.51,19.5a8,8,0,0,0,11.32,11.32l19.5-19.51C81,210.73,97.09,215.37,113,215.94q1.67.06,3.33.06A86.93,86.93,0,0,0,162,203.18C205,177.18,227.93,116.21,223.45,40.07ZM153.75,189.5c-22.75,13.78-49.68,14-76.71.77l88.63-88.62a8,8,0,0,0-11.32-11.32L65.73,179c-13.19-27-13-54,.77-76.71,22.09-36.47,74.6-56.44,141.31-54.06C210.2,114.89,190.22,167.41,153.75,189.5Z",phHeartFill:"M240,102c0,70-103.79,126.66-108.21,129a8,8,0,0,1-7.58,0C119.79,228.66,16,172,16,102A62.07,62.07,0,0,1,78,40c20.65,0,38.73,8.88,50,23.89C139.27,48.88,157.35,40,178,40A62.07,62.07,0,0,1,240,102Z",phHeartRegular:"M178,40c-20.65,0-38.73,8.88-50,23.89C116.73,48.88,98.65,40,78,40a62.07,62.07,0,0,0-62,62c0,70,103.79,126.66,108.21,129a8,8,0,0,0,7.58,0C136.21,228.66,240,172,240,102A62.07,62.07,0,0,0,178,40ZM128,214.8C109.74,204.16,32,155.69,32,102A46.06,46.06,0,0,1,78,56c19.45,0,35.78,10.36,42.6,27a8,8,0,0,0,14.8,0c6.82-16.67,23.15-27,42.6-27a46.06,46.06,0,0,1,46,46C224,155.61,146.24,204.15,128,214.8Z",phCrownFill:"M239.75,90.81c0,.11,0,.21-.07.32L217,195a16,16,0,0,1-15.72,13H54.71A16,16,0,0,1,39,195L16.32,91.13c0-.11-.05-.21-.07-.32A16,16,0,0,1,44,77.39l33.67,36.29,35.8-80.29a1,1,0,0,0,0-.1,16,16,0,0,1,29.06,0,1,1,0,0,0,0,.1l35.8,80.29L212,77.39a16,16,0,0,1,27.71,13.42Z",phCrownRegular:"M230.9,73.6A15.85,15.85,0,0,0,212,77.39l-33.67,36.29-35.8-80.29a1,1,0,0,1,0-.1,16,16,0,0,0-29.06,0,1,1,0,0,1,0,.1l-35.8,80.29L44,77.39A16,16,0,0,0,16.25,90.81c0,.11,0,.21.07.32L39,195a16,16,0,0,0,15.72,13H201.29A16,16,0,0,0,217,195L239.68,91.13c0-.11,0-.21.07-.32A15.85,15.85,0,0,0,230.9,73.6ZM201.35,191.68l-.06.32H54.71l-.06-.32L32,88l.14.16,42,45.24a8,8,0,0,0,13.18-2.18L128,40l40.69,91.25a8,8,0,0,0,13.18,2.18l42-45.24L224,88Z",phLeafBold:"M227.42,39.86a12,12,0,0,0-11.28-11.28c-39.6-2.33-74.59,2.34-104,13.87C84,53.48,62.31,70.58,49.39,91.9c-17.62,29.11-17.66,64.45-.45,98.19L31.51,207.52a12,12,0,0,0,17,17l17.43-17.43c16.74,8.54,33.88,12.85,50.45,12.85a91.31,91.31,0,0,0,47.74-13.3c21.32-12.92,38.42-34.62,49.45-62.75C225.08,114.46,229.75,79.46,227.42,39.86ZM151.66,186.08C131.57,198.25,108,199.17,83.94,189l84.54-84.54a12,12,0,1,0-17-17L67,172.06c-10.14-24-9.22-47.63,3-67.72,20.91-34.53,70.54-53.72,134-52.25C205.38,115.53,186.19,165.17,151.66,186.08Z",phDiamondFill:"M246,98.73l-56-64A8,8,0,0,0,184,32H72a8,8,0,0,0-6,2.73l-56,64a8,8,0,0,0,.17,10.73l112,120a8,8,0,0,0,11.7,0l112-120A8,8,0,0,0,246,98.73ZM222.37,96H180L144,48h36.37ZM75.63,48H112L76,96H33.63Z"};function nr(e){return'<svg viewBox="'+_e+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="'+e+'"/></svg>'}var rt={star:{label:"Y\u0131ld\u0131z",styles:{rounded:{label:"Tombul (Google)",filled:'<svg viewBox="'+_e+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g transform="translate(-48, 48) scale(1.1)"><path d="'+te.starRounded+'"/></g></svg>',empty:'<svg viewBox="'+_e+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g transform="translate(-48, 48) scale(1.1)"><path d="'+te.starRoundedOutline+'"/></g></svg>'},classic:{label:"Klasik (Google)",filled:'<svg viewBox="'+_e+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g transform="translate(-48, 48) scale(1.1)"><path d="'+te.starFill+'"/></g></svg>',empty:'<svg viewBox="'+_e+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g transform="translate(-48, 48) scale(1.1)"><path d="'+te.starOutline+'"/></g></svg>'},boxed:{label:"Kare (Google)",filled:'<svg viewBox="'+_e+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="'+te.boxSquare+'"/><g transform="translate(120, -120) scale(0.75)" fill="white"><path d="'+te.starFill+'"/></g></svg>',empty:'<svg viewBox="'+_e+'" fill="currentColor" opacity="0.35" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="'+te.boxSquare+'"/><g transform="translate(120, -120) scale(0.75)" fill="white"><path d="'+te.starFill+'"/></g></svg>'}}},favorite:{label:"Kalp",styles:{modern:{label:"Modern (Phosphor)",filled:'<svg viewBox="'+G+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="'+te.phHeartFill+'"/></svg>',empty:'<svg viewBox="'+G+'" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M128,224S24,168,24,102A54,54,0,0,1,78,48c22.59,0,41.94,12.31,50,32,8.06-19.69,27.41-32,50-32a54,54,0,0,1,54,54C232,168,128,224,128,224Z"/></svg>'}}},leaf:{label:"Yaprak",styles:{phosphor:{label:"Modern (Phosphor)",filled:'<svg viewBox="'+G+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="'+te.phLeafFill+'"/></svg>',empty:'<svg viewBox="'+G+'" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M63.81,192.19c-47.89-79.81,16-159.62,151.64-151.64C223.43,176.23,143.62,240.08,63.81,192.19Z"/><line x1="160" y1="96" x2="40" y2="216"/></svg>'}}},crown:{label:"Ta\xE7",styles:{modern:{label:"Modern (Phosphor)",filled:'<svg viewBox="'+G+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="'+te.phCrownFill+'"/></svg>',empty:'<svg viewBox="'+G+'" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M54.71,200H201.29a8,8,0,0,0,7.88-6.61l22.7-104A8,8,0,0,0,218,82.76L176,128,135.26,36.65a8,8,0,0,0-14.52,0L80,128,38,82.76a8,8,0,0,0-13.9,6.66l22.7,104A8,8,0,0,0,54.71,200Z"/></svg>'}}},diamond:{label:"Elmas",styles:{sketch:{label:"M\xFCcevher (Sketch)",filled:'<svg viewBox="'+G+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M246,98.73l-56-64A8,8,0,0,0,184,32H72a8,8,0,0,0-6,2.73l-56,64a8,8,0,0,0,.17,10.73l112,120a8,8,0,0,0,11.7,0l112-120A8,8,0,0,0,246,98.73ZM222.37,96H180L144,48h36.37ZM75.63,48H112L76,96H33.63Z"/></svg>',empty:'<svg viewBox="'+G+'" fill="none" stroke="currentColor" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M246,98.73l-56-64A8,8,0,0,0,184,32H72a8,8,0,0,0-6,2.73l-56,64a8,8,0,0,0,.17,10.73l112,120a8,8,0,0,0,11.7,0l112-120A8,8,0,0,0,246,98.73ZM222.37,96H180L144,48h36.37ZM75.63,48H112L76,96H33.63Z"/></svg>'}}},paw:{label:"Pati",styles:{phosphor:{label:"Modern (Phosphor)",filled:'<svg viewBox="'+G+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M240,108a28,28,0,1,1-28-28A28,28,0,0,1,240,108ZM72,108a28,28,0,1,0-28,28A28,28,0,0,0,72,108ZM92,88A28,28,0,1,0,64,60,28,28,0,0,0,92,88Zm72,0a28,28,0,1,0-28-28A28,28,0,0,0,164,88Zm23.12,60.86a35.3,35.3,0,0,1-16.87-21.14,44,44,0,0,0-84.5,0A35.25,35.25,0,0,1,69,148.82,40,40,0,0,0,88,224a39.48,39.48,0,0,0,15.52-3.13,64.09,64.09,0,0,1,48.87,0,40,40,0,0,0,34.73-72Z"/></svg>',empty:'<svg viewBox="'+G+'" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><circle cx="212" cy="108" r="20"/><circle cx="44" cy="108" r="20"/><circle cx="92" cy="60" r="20"/><circle cx="164" cy="60" r="20"/><path d="M128,104A36,36,0,0,0,93.43,130a43.49,43.49,0,0,1-20.67,25.9,32,32,0,0,0,27.73,57.62,72.49,72.49,0,0,1,55,0,32,32,0,0,0,27.73-57.62A43.46,43.46,0,0,1,162.57,130,36,36,0,0,0,128,104Z"/></svg>'}}},clover:{label:"Yonca",styles:{phosphor:{label:"Modern (Phosphor)",filled:'<svg viewBox="'+G+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M228,120c0,22.63-6,36.72-17.93,41.87a27.3,27.3,0,0,1-11,2.13,41.75,41.75,0,0,1-8.4-.93,4.05,4.05,0,0,1-2.52-1.64,368.49,368.49,0,0,0-47.75-55.26,8,8,0,0,0-11,11.62c14.84,13.91,64.13,63.49,78.32,120.27a8,8,0,0,1-5.82,9.7A8.13,8.13,0,0,1,200,248a8,8,0,0,1-7.75-6.06c-4.12-16.47-11.65-32.48-20.46-47.09a25.85,25.85,0,0,1-1.9,7.21C164.72,214,150.63,220,128,220s-36.72-6-41.88-17.94c-5.45-12.58-.39-30.82,15-54.21.68-1,1.36-2,2-3l-3,2C82.84,158.27,68.35,164,56.89,164a27.3,27.3,0,0,1-11-2.13C34,156.72,28,142.63,28,120s6-36.72,17.93-41.88c12.59-5.45,30.83-.39,54.22,15l3,2q-1-1.5-2-3c-15.41-23.39-20.47-41.63-15-54.22C91.28,26,105.37,20,128,20s36.72,6,41.88,17.93c5.45,12.59.39,30.83-15,54.22q-1,1.53-2,3l3-2c23.39-15.41,41.63-20.47,54.22-15C222,83.28,228,97.37,228,120Z"/></svg>',empty:'<svg viewBox="'+G+'" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M228,120c0,22.63-6,36.72-17.93,41.87a27.3,27.3,0,0,1-11,2.13,41.75,41.75,0,0,1-8.4-.93,4.05,4.05,0,0,1-2.52-1.64,368.49,368.49,0,0,0-47.75-55.26,8,8,0,0,0-11,11.62c14.84,13.91,64.13,63.49,78.32,120.27a8,8,0,0,1-5.82,9.7A8.13,8.13,0,0,1,200,248a8,8,0,0,1-7.75-6.06c-4.12-16.47-11.65-32.48-20.46-47.09a25.85,25.85,0,0,1-1.9,7.21C164.72,214,150.63,220,128,220s-36.72-6-41.88-17.94c-5.45-12.58-.39-30.82,15-54.21.68-1,1.36-2,2-3l-3,2C82.84,158.27,68.35,164,56.89,164a27.3,27.3,0,0,1-11-2.13C34,156.72,28,142.63,28,120s6-36.72,17.93-41.88c12.59-5.45,30.83-.39,54.22,15l3,2q-1-1.5-2-3c-15.41-23.39-20.47-41.63-15-54.22C91.28,26,105.37,20,128,20s36.72,6,41.88,17.93c5.45,12.59.39,30.83-15,54.22q-1,1.53-2,3l3-2c23.39-15.41,41.63-20.47,54.22-15C222,83.28,228,97.37,228,120Z"/></svg>'}}},coffee:{label:"Kahve",styles:{phosphor:{label:"Modern (Phosphor)",filled:'<svg viewBox="'+G+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M208,80H32a8,8,0,0,0-8,8v48a96.3,96.3,0,0,0,32.54,72H32a8,8,0,0,0,0,16H208a8,8,0,0,0,0-16H183.46a96.59,96.59,0,0,0,27-40.09A40,40,0,0,0,248,128v-8A40,40,0,0,0,208,80Zm24,48a24,24,0,0,1-17.2,23,95.78,95.78,0,0,0,1.2-15V97.38A24,24,0,0,1,232,120ZM112,56V24a8,8,0,0,1,16,0V56a8,8,0,0,1-16,0Zm32,0V24a8,8,0,0,1,16,0V56a8,8,0,0,1-16,0ZM80,56V24a8,8,0,0,1,16,0V56a8,8,0,0,1-16,0Z"/></svg>',empty:'<svg viewBox="'+G+'" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M83.3,216A88,88,0,0,1,32,136V88H208v48a88,88,0,0,1-51.3,80"/><line x1="32" y1="216" x2="208" y2="216"/><path d="M208,88h4a32,32,0,0,1,32,32v8a32,32,0,0,1-32,32h-7.38"/><line x1="80" y1="24" x2="80" y2="48"/><line x1="120" y1="24" x2="120" y2="48"/><line x1="160" y1="24" x2="160" y2="48"/></svg>'}}}};function ii(e){var r=String(e||"star"),t=r.indexOf(":");return t===-1?{type:r,style:null}:{type:r.slice(0,t),style:r.slice(t+1)}}function $e(e,r){var t=rt[e]||rt.star,n=t.styles;return n[r]||n[Object.keys(n)[0]]}function Me(e){var r=e&&e.reviewIcon||"star",t=ii(r),n=t.style||e&&e.reviewIconStyle||"classic";return $e(t.type,n)}function it(e,r,t){for(var n=Math.round(parseFloat(e))||0,i=Me(r),a=t&&t.sizePx,s=a?"width:"+a+"px;height:"+a+"px;":"",o="",d=1;d<=5;d++){var c=d<=n;o+='<span class="ikr-icon '+(c?"ikr-icon-filled":"ikr-icon-empty")+'" style="'+s+'">'+(c?i.filled:i.empty)+"</span>"}return o}var or={lines:"M400-240v-80h160v80H400ZM240-440v-80h480v80H240ZM120-640v-80h720v80H120Z",linesAlt:"M440-160v-160h80v40h360v80H520v40h-80Zm-360-80v-80h280v80H80Zm200-160v-80H80v-80h200v-80h80v240h-80Zm160-80v-80h440v80H440Zm160-160v-160h80v40h120v80H680v40h-80Zm-520-80v-80h440v80H80Z",funnel:"M440-160q-17 0-28.5-11.5T400-200v-240L168-736q-15-20-4.5-42t36.5-22h560q26 0 36.5 22t-4.5 42L560-440v240q0 17-11.5 28.5T520-160h-80Z",dense:"M120-160v-80h720v80H120Zm0-160v-80h720v80H120Zm0-160v-80h720v80H120Zm0-160v-80h720v80H120Z"},tt={lines:{label:"\xC7izgili",svg:nr(or.lines)},linesAlt:{label:"\xC7izgili (Alt)",svg:nr(or.linesAlt)},funnel:{label:"Huni",svg:nr(or.funnel)},dense:{label:"Yo\u011Fun \xC7izgili",svg:nr(or.dense)}};function at(e){var r=tt[e]||tt.lines;return r.svg}var ai="var(--ikr-review-star-color,#f59e0b)";var lr=/^(account|pages|blog|search|cart|checkout|siparis|odeme|kategori|category|urun|products?)/;function D(e){try{return new URL(e,window.location.origin).pathname.replace(/^\//,"").split("?")[0].split("/")[0]}catch(r){return""}}function ve(e,r){var t="color:"+ai+";display:inline-flex;gap:2px;align-items:center;";return'<span class="ikr-stars" style="'+t+'">'+it(e,r)+"</span>"}function se(e,r,t){for(var n=Math.max(0,Math.min(5,parseFloat(e)||0)),i=Math.floor(n),a=n-i,s=a<.25?i:a<.75?i+.5:i+1,o=t&&t.sizeStyle||"",d="",c=1;c<=5;c++){var p=c<=s?"full":c-.5===s?"half":"empty";p==="full"?d+='<span class="ikr-star ikr-star-full" style="'+o+'">'+r.filled+"</span>":p==="empty"?d+='<span class="ikr-star ikr-star-empty" style="'+o+'">'+r.empty+"</span>":d+='<span class="ikr-star ikr-star-half" style="'+o+'"><span class="ikr-star-half-bg">'+r.empty+'</span><span class="ikr-star-half-fg">'+r.filled+"</span></span>"}return'<span class="ikr-stars-partial">'+d+"</span>"}function ke(e){return e?new Date(e).toLocaleDateString("tr-TR",{year:"numeric",month:"long",day:"numeric"}):""}function nt(e,r){var t=document.getElementById("ikr-styles");t||(t=document.createElement("style"),t.id="ikr-styles",document.head.appendChild(t)),t.textContent=r}var Er=null,ni={jpg:!0,jpeg:!0,png:!0,webp:!0,gif:!0,avif:!0};function Ce(e){var r=typeof e=="string"?e.trim():"";Er=/^[A-Za-z0-9_-]+$/.test(r)?r:null}function oi(e){return typeof window!="undefined"&&window.__ikasPreviewMode===!0&&e.protocol==="https:"&&e.hostname==="placehold.co"&&!e.search&&!e.hash&&/\.(png|jpe?g|webp|gif|avif)$/i.test(e.pathname)}function Tr(e){if(typeof e!="string")return!1;var r=e.trim();if(!r||r.length>2048)return!1;var t;try{t=new URL(r)}catch(d){return!1}if(oi(t))return!0;if(!Er||t.protocol!=="https:"||t.hostname!=="res.cloudinary.com"||t.username||t.password||t.port||t.search||t.hash)return!1;var n=t.pathname.toLowerCase();if(n.indexOf("%2f")!==-1||n.indexOf("%5c")!==-1)return!1;var i=t.pathname.split("/").filter(Boolean);if(i.length<6||i[0]!==Er||i[1]!=="image"||i[2]!=="upload"||!/^v\d+$/.test(i[3])||i[4]!=="review_images")return!1;for(var a=5;a<i.length;a++)if(i[a]==="."||i[a]==="..")return!1;var s=i[i.length-1],o=s.lastIndexOf(".");return o===-1?!1:!!ni[s.slice(o+1).toLowerCase()]}function ge(e){var r=e&&e.images&&Array.isArray(e.images)?e.images:[],t=[];return r.forEach(function(n){if(Tr(n)){var i=n.trim();t.indexOf(i)===-1&&t.push(i)}}),t}function sr(e){var r=ge(e);return r.length?r[0]:null}var U=300,dr=600,cr=200,Qe=1200;function Je(e,r){if(!e||e.indexOf("res.cloudinary.com")===-1)return e;var t=typeof r=="number"&&r>0?Math.round(r):Qe;return e.replace("/upload/","/upload/q_auto/f_auto/c_scale,w_"+t+"/")}function de(e,r){if(!e)return{src:"",srcset:""};var t=typeof r=="number"&&r>0?Math.round(r):Qe,n=t*2,i=Je(e,t),a=Je(e,n);return{src:i,srcset:i+" 1x, "+a+" 2x"}}function ie(e,r,t){var n=new AbortController,i=setTimeout(function(){n.abort()},t||8e3);return fetch(e,Object.assign({},r,{signal:n.signal})).finally(function(){clearTimeout(i)})}function Pe(e){return ge(e)}function ot(e,r,t){document.body.style.overflow="",document.body.style.paddingRight="",document.removeEventListener("keydown",r),window.removeEventListener("popstate",t),e.parentNode&&e.parentNode.removeChild(e)}function li(e){var r=document.createElement("div");r.className="ikr-modal-right";var t=document.createElement("div");t.className="ikr-modal-scroll-content";var n=document.createElement("div");n.className="ikr-modal-top-row";var i=document.createElement("div");i.className="ikr-modal-stars",i.innerHTML=ve(e.rating,L);var a=document.createElement("span");a.className="ikr-modal-date",a.textContent=ke(e.createdAt),n.appendChild(i),n.appendChild(a),t.appendChild(n);var s=document.createElement("div");s.className="ikr-modal-title",s.textContent=e.title||"",s.style.display=e.title?"":"none",t.appendChild(s);var o=document.createElement("div");o.className="ikr-modal-author",o.textContent=e.author||"",t.appendChild(o);var d=document.createElement("div");d.className="ikr-modal-body",d.textContent=(e.comment||"").trim(),d.style.display=e.comment&&e.comment.trim()?"":"none",t.appendChild(d);var c=document.createElement("div");c.className="ikr-modal-reply";var p=document.createElement("div");p.className="ikr-modal-reply-label",p.textContent="Ma\u011Faza Sahibi";var m=document.createElement("div");return m.className="ikr-modal-reply-text",m.textContent=e.merchantReply||"",c.appendChild(p),c.appendChild(m),c.style.display=e.merchantReply?"":"none",t.appendChild(c),r.appendChild(t),r}function si(e,r){var t=e.querySelector(".ikr-modal-scroll-content");t.querySelector(".ikr-modal-stars").innerHTML=ve(r.rating,L),t.querySelector(".ikr-modal-date").textContent=ke(r.createdAt);var n=t.querySelector(".ikr-modal-title");n.textContent=r.title||"",n.style.display=r.title?"":"none",t.querySelector(".ikr-modal-author").textContent=r.author||"";var i=t.querySelector(".ikr-modal-body");i.textContent=(r.comment||"").trim(),i.style.display=r.comment&&r.comment.trim()?"":"none";var a=t.querySelector(".ikr-modal-reply");a.querySelector(".ikr-modal-reply-text").textContent=r.merchantReply||"",a.style.display=r.merchantReply?"":"none",e.scrollTop=0}function Lr(e,r,t,n,i,a,s,o){var d=Pe(e),c=Math.max(0,Math.min(t||0,d.length-1)),p=document.createElement("div");p.className="ikr-modal-left";var m=document.createElement("img"),l=s==="next"?"ikr-modal-img-enter-right":s==="prev"?"ikr-modal-img-enter-left":"";m.className="ikr-modal-main-img"+(l?" "+l:""),m.src=Je(d[c]||""),m.decoding="async",m.width=Qe,m.height=Math.round(Qe*4/3),m.alt="Yorum foto\u011Fraf\u0131",p.appendChild(m);var v=document.createElement("button");v.className="ikr-modal-close-mobile",v.textContent="\u2715",v.setAttribute("aria-label","Kapat"),v.onclick=function(x){x.stopPropagation(),a()},p.appendChild(v);var f=0;if(p.addEventListener("touchstart",function(x){f=x.touches[0].clientX},{passive:!0}),p.addEventListener("touchend",function(x){var S=f-x.changedTouches[0].clientX;if(!(Math.abs(S)<50)){if(S>0){if(h)he(e,r,c+1,n,i,a,!0,"next",o);else if(g){var E=n[r+1];he(E,r+1,0,n,i,a,!1,"next",o)}}else if(u)he(e,r,c-1,n,i,a,!0,"prev",o);else if(z){var A=n[r-1],T=Pe(A);he(A,r-1,T.length-1,n,i,a,!1,"prev",o)}}},{passive:!0}),d.length>1){var k=document.createElement("div");k.className="ikr-modal-thumbs",d.forEach(function(x,S){var E=document.createElement("img"),A=de(x,cr);E.src=A.src,E.srcset=A.srcset,E.loading="lazy",E.decoding="async",E.width=cr,E.height=cr,E.className="ikr-modal-thumb"+(S===c?" ikr-modal-thumb-active":""),E.alt="K\xFC\xE7\xFCk resim "+(S+1),(function(T){E.onclick=function(){he(e,r,T,n,i,a,!0,null,o)}})(S),k.appendChild(E)}),p.appendChild(k)}var u=c>0,h=c<d.length-1,z=r>0,g=r<n.length-1,w=u||z,C=h||g;if(w){var b=document.createElement("button");b.className="ikr-modal-nav ikr-modal-nav-prev",b.innerHTML="&#8249;",b.setAttribute("aria-label","\xD6nceki"),b.onclick=function(x){if(x.stopPropagation(),u)he(e,r,c-1,n,i,a,!0,"prev",o);else if(z){var S=n[r-1],E=Pe(S);he(S,r-1,E.length-1,n,i,a,!1,"prev",o)}},p.appendChild(b)}if(C){var y=document.createElement("button");y.className="ikr-modal-nav ikr-modal-nav-next",y.innerHTML="&#8250;",y.setAttribute("aria-label","Sonraki"),y.onclick=function(x){if(x.stopPropagation(),h)he(e,r,c+1,n,i,a,!0,"next",o);else if(g){var S=n[r+1];he(S,r+1,0,n,i,a,!1,"next",o)}},p.appendChild(y)}return p}function lt(e,r){[-1,1].forEach(function(t){var n=r[e+t];if(n){var i=Pe(n);i[0]&&(new Image().src=Je(i[0]))}})}function he(e,r,t,n,i,a,s,o,d){if(s){var c=Lr(e,r,t,n,i,a,o,d);i.firstChild&&i.replaceChild(c,i.firstChild)}else{var c=Lr(e,r,t,n,i,a,o,d),p=i.querySelector(".ikr-modal-right");i.firstChild&&i.replaceChild(c,i.firstChild),p&&si(p,e);var m=d&&d.querySelector(".ikr-modal-wrap");m&&(m.scrollTop=0)}lt(r,n)}function ce(e,r,t){var n=Pe(e);if(!n.length)return;var i=(t||[]).filter(function(u){return Pe(u).length>0}),a=i.findIndex(function(u){return u===e||u.id===e.id});a===-1&&(i.unshift(e),a=0);var s=n.indexOf(r);s<0&&(s=0);var o=document.createElement("div");o.className="ikr-modal-overlay";var d=document.createElement("div");d.className="ikr-modal";var c=!1;function p(){c||(c=!0,ot(o,m,p))}function m(u){u.key==="Escape"&&l()}function l(){c||(c=!0,history.go(-1),ot(o,m,p))}document.addEventListener("keydown",m);var v=window.innerWidth-document.documentElement.clientWidth;document.body.style.paddingRight=v+"px",document.body.style.overflow="hidden",history.pushState({ikrModal:!0},""),window.addEventListener("popstate",p),o.onclick=function(){l()},d.onclick=function(u){u.stopPropagation()},d.appendChild(Lr(e,a,s,i,d,l,null,o)),d.appendChild(li(e)),lt(a,i);var f=document.createElement("div");f.className="ikr-modal-wrap",f.appendChild(d);var k=document.createElement("button");k.className="ikr-modal-close",k.textContent="\u2715",k.setAttribute("aria-label","Kapat"),k.onclick=function(u){u.stopPropagation(),l()},f.appendChild(k),o.appendChild(f),document.body.appendChild(o)}function st(e){if(e)for(var r=document.querySelectorAll("h1,h2,h3,h4,h5,h6,div,span,p"),t=0;t<r.length;t++){var n=r[t];if(n.children.length===0&&n.textContent.trim()===e&&n.tagName!=="TITLE"&&!n.closest("[data-ikr-listing-badge]")&&!n.closest("#ikas-reviews")&&!n.closest("nav")&&!n.closest("header")&&!n.closest('[class*="breadcrumb"]')&&!n.closest('[aria-label*="breadcrumb"]'))return n}return document.querySelector("h1")}var dt={small:{icon:14,text:"12px"},medium:{icon:16,text:"14px"},large:{icon:20,text:"16px"}};function di(e,r,t,n,i){var a=$e(r,t),s="width:"+i+"px;height:"+i+"px;";return'<span style="color:'+n+';display:inline-flex;align-items:center;line-height:1;">'+se(e,a,{sizeStyle:s})+"</span>"}function ct(e,r,t,n){var i=document.getElementById("ikr-rating-badge");if(i&&i.remove(),!!e&&!(n&&n.enabled===!1)){var a=document.getElementById("ikr-jsonld");a&&a.remove();var s=document.createElement("script");s.id="ikr-jsonld",s.type="application/ld+json",s.textContent=JSON.stringify({"@context":"https://schema.org","@type":"Product",name:t||document.title,url:window.location.href,aggregateRating:{"@type":"AggregateRating",ratingValue:e,reviewCount:r,bestRating:"5",worstRating:"1"}}),document.head.appendChild(s);var o=st(t);if(!(!o||!o.parentNode)){var d=n&&n.icon||"star",c=n&&n.iconStyle||"classic",p=n&&n.size||"medium",m=n&&n.color||"#f59e0b",l=dt[p]||dt.medium,v=document.createElement("a");v.id="ikr-rating-badge",v.href="#ikas-reviews";var f=window.getComputedStyle(o).textAlign,k=f==="center"?"center":f==="right"?"flex-end":"flex-start";v.style.cssText="display:flex;align-items:center;gap:5px;text-decoration:none;margin-bottom:10px;cursor:pointer;font-weight:400;justify-content:"+k+";",v.innerHTML=di(e,d,c,m,l.icon)+'<span style="font-size:'+l.text+';font-weight:400;color:#555;">'+e+" ("+r+" yorum)</span>",v.onclick=function(u){u.preventDefault();var h=document.getElementById("ikas-reviews-widget")||document.getElementById("ikas-reviews");if(h){var z=document.querySelector("header"),g=z?z.getBoundingClientRect().height:0,w=h.getBoundingClientRect().top+window.pageYOffset-g-16;window.scrollTo({top:w,behavior:"smooth"})}},o.parentNode.insertBefore(v,o.nextSibling)}}}var pt=`
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
  .ikr-date{color:var(--ikr-review-date,#111111);font-size:var(--ikr-review-date-size,12px);font-weight:400;white-space:nowrap;flex-shrink:0;}
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

  /* Review Modal */
  /* Modal document.body'ye portal'lan\u0131r \u2192 widget root scope'undan \xC7IKAR.
     Yorum item gap token'lar\u0131 (--ikr-gap-*) burada da yeniden tan\u0131mlan\u0131r
     ki modal-* selekt\xF6rleri base ile ayn\u0131 dili konu\u015Fsun. Tek do\u011Fruluk
     kayna\u011F\u0131 yine \xFCstteki s\xF6zle\u015Fme yorumudur. */
  .ikr-modal-overlay{position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;padding:16px;background:rgba(0,0,0,0.50);--ikr-gap-tight:4px;--ikr-gap-normal:8px;--ikr-gap-loose:16px;--ikr-gap-section:24px;}
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
  .ikr-photo-strip-thumb{flex:0 0 var(--ikr-thumbnail-size,90px);width:var(--ikr-thumbnail-size,90px);height:auto;aspect-ratio:var(--ikr-photo-thumb-aspect,1/1);border-radius:var(--ikr-radius,8px);object-fit:cover;cursor:pointer;transition:transform 0.2s ease,box-shadow 0.2s ease;border:1px solid var(--ikr-photo-image-border,rgba(0,0,0,0.05));}
  @media(hover:hover){.ikr-photo-strip-thumb:hover{transform:translateY(-2px);box-shadow:0 6px 16px rgba(0,0,0,0.12);}}

  .ikr-photo-strip-wrap{position:relative;display:block;}

  .ikr-modal{background:#ffffff;color:#111111;border-radius:calc(var(--ikr-radius, 8px) * 1.5);overflow:hidden;display:flex;width:100%;height:584px;max-height:80vh;box-shadow:0 16px 48px rgba(0,0,0,0.25);}
  .ikr-modal-left{flex:0 0 438px;background:#222;position:relative;overflow:hidden;}
  .ikr-modal-main-img{position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;display:block;}
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
  .ikr-modal-right{flex:1;min-width:0;min-height:0;overflow-y:auto;padding:0;display:flex;flex-direction:column;background:#ffffff;color:#111111;}
  /* Flex zincirinde her seviye min-width:0 olmazsa unbreakable string parent'\u0131 zorlar.
     scroll-content de flex column \u2192 child'lar\u0131 (modal-body vs.) shrink edebilsin diye
     burada da min-width:0 zorunlu. overflow-wrap:anywhere ancak shrink m\xFCmk\xFCnse i\u015F g\xF6r\xFCr. */
  .ikr-modal-scroll-content > *{min-width:0;}
  .ikr-modal-top-row{display:flex;align-items:center;justify-content:space-between;gap:12px;}
  .ikr-modal-stars{display:inline-flex;gap:2px;align-items:center;}
  .ikr-modal-stars .ikr-icon{width:var(--ikr-star-size,24px);height:var(--ikr-star-size,24px);}
  .ikr-modal-date{font-size:var(--ikr-review-date-size,12px);font-weight:400;color:var(--ikr-review-date,#111111);white-space:nowrap;flex-shrink:0;}
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
  @media(max-width:640px){
    .ikr-modal-overlay{padding:0;background:transparent;}
    .ikr-modal-wrap{position:fixed;inset:0;overflow-y:auto;z-index:100000;width:100%;max-width:100%;overscroll-behavior:contain;background:rgba(0,0,0,0.50);}
    .ikr-modal{flex-direction:column;height:auto;min-height:100vh;border-radius:0;box-shadow:none;overflow:hidden;max-height:none;}
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
`;var _r={};xe(_r,{meta:()=>wi,render:()=>yi});function He(e){var r=e.ratingCounts,t=e.allCount,n=e.iconPair,i=e.currentRatingFilter,a=e.onFilterChange,s=document.createElement("div");s.className="ikr-summary-block ikr-summary-bars";for(var o=5;o>=1;o--){var d=r[o-1]||0,c=t>0?Math.round(d/t*100):0,p=i===o,m=document.createElement("div");m.className="ikr-bar-row"+(p?" ikr-bar-active":""),i&&!p&&(m.style.opacity="0.35");for(var l="",v=1;v<=5;v++){var f=v<=o;l+='<span class="ikr-bar-star ikr-icon '+(f?"ikr-bar-star-filled":"ikr-bar-star-empty")+'">'+(f?n.filled:n.empty)+"</span>"}m.innerHTML='<span class="ikr-bar-label">'+l+'</span><div class="ikr-bar-track"><div class="ikr-bar-fill" style="width:'+c+'%;"></div></div><span class="ikr-bar-count">('+d.toLocaleString("tr-TR")+")</span>",(function(k){m.onclick=function(){a(k)}})(o),s.appendChild(m)}return s}var pe=[],mt=!1;function ci(e){for(var r=pe.length-1;r>=0;r--){var t=pe[r];t.trigger&&t.trigger.contains(e.target)||t.element&&t.element.contains(e.target)||t.close()}}function pi(e){if(e.key==="Escape")for(var r=pe.length-1;r>=0;r--)pe[r].close()}function mi(){mt||typeof document=="undefined"||(document.addEventListener("click",ci,!0),document.addEventListener("keydown",pi),mt=!0)}function pr(e){for(var r=0;r<pe.length;r++)pe[r]!==e&&pe[r].close()}function mr(e){mi();var r={trigger:e.trigger,element:e.element,close:e.close};return pe.push(r),function(){var n=pe.indexOf(r);n!==-1&&pe.splice(n,1)}}function ae(e){var r=e.widget,t=e.currentOrderBy,n=e.currentHasImages,i=e.onWriteClick,a=e.onSortChange,s=document.createElement("div");s.className="ikr-summary-block ikr-summary-actions";var o=document.createElement("button");o.className="ikr-write-btn",o.textContent=L&&L.writeButtonText||"Yorum Yap",o.onclick=i,s.appendChild(o);var d=document.createElement("div");d.className="ikr-filter-wrap";var c=document.createElement("button");c.className="ikr-filter-btn",c.setAttribute("aria-label","Filtrele");var p=L&&L.filterIcon||"lines";c.innerHTML=at(p);var m=document.createElement("div");m.className="ikr-filter-menu";var l=[["newest","En Yeni",!1],["highest","En Y\xFCksek Puan",!1],["lowest","En D\xFC\u015F\xFCk Puan",!1],["photos","Foto\u011Frafl\u0131",!0]];function v(){m.classList.remove("ikr-open"),c.classList.remove("ikr-filter-btn-active")}function f(){pr(k),m.classList.add("ikr-open"),c.classList.add("ikr-filter-btn-active")}l.forEach(function(u){var h=u[2],z=h?n:!n&&(t||"newest")===u[0],g=document.createElement("div");g.className="ikr-filter-item"+(z?" ikr-filter-item-active":""),g.textContent=u[1],g.onclick=function(){v(),a(u[0],h)},m.appendChild(g)}),c.onclick=function(){m.classList.contains("ikr-open")?v():f()};var k=mr({trigger:d,element:m,close:v});return d.appendChild(c),d.appendChild(m),s.appendChild(d),s}function ut(e){var r=e&&e.onClose?e.onClose:function(){},t=e&&e.allowOutsideClose!==!1,n=document.createElement("div");n.className="ikr-fwizard-overlay",n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true");var i=document.createElement("div");i.className="ikr-fwizard",n.appendChild(i);var a=document.createElement("button");a.className="ikr-fwizard-close",a.type="button",a.setAttribute("aria-label","Kapat"),a.innerHTML='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',i.appendChild(a);var s=document.createElement("div");s.className="ikr-fwizard-content",i.appendChild(s);var o=!1,d="",c="";function p(){var g=window.innerWidth-document.documentElement.clientWidth;d=document.body.style.overflow,c=document.body.style.paddingRight,document.body.style.overflow="hidden",g>0&&(document.body.style.paddingRight=g+"px")}function m(){document.body.style.overflow=d,document.body.style.paddingRight=c}function l(){o||(o=!0,document.removeEventListener("keydown",v),n.removeEventListener("click",f),a.removeEventListener("click",l),n.classList.remove("ikr-fwizard-open"),setTimeout(function(){n.parentNode&&n.parentNode.removeChild(n),m();try{r()}catch(g){}},200))}function v(g){g.key==="Escape"&&l()}function f(g){g.target===n&&t&&l()}document.addEventListener("keydown",v),n.addEventListener("click",f),a.addEventListener("click",l);function k(g){g&&s.appendChild(g),document.body.appendChild(n),p(),requestAnimationFrame(function(){n.classList.add("ikr-fwizard-open")})}var u=null,h=null;function z(g,w){if(w=w||"error",u){try{u.remove()}catch(C){}u=null}h&&(clearTimeout(h),h=null),u=document.createElement("div"),u.className="ikr-fwizard-toast ikr-fwizard-toast--"+w,u.textContent=g,i.appendChild(u),h=setTimeout(function(){u&&(u.classList.add("ikr-fwizard-toast--exit"),setTimeout(function(){if(u){try{u.remove()}catch(C){}u=null}},300))},4e3)}return{open:k,close:l,content:s,setAllowOutsideClose:function(g){t=!!g},setStepAttr:function(g){i.setAttribute("data-step",String(g))},showToast:z}}var ft=`
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
`;var Ar=4;function Oe(e,r){if(!r)return!1;switch(e){case 1:return r.rating>0;case 2:return!0;case 3:return!!(r.comment&&r.comment.trim().length>0);case 4:return!!(r.author&&r.author.trim().length>0);default:return!0}}function vt(e){e=e||{};var r=[],t={currentStep:1,rating:0,title:"",comment:"",author:"",email:"",images:[],pendingImages:[],fingerprints:[],productId:e.productId||"",productName:e.productName||""};function n(){r.forEach(function(i){try{i(t)}catch(a){}})}return{get:function(){return t},set:function(i){Object.assign(t,i),n()},goNext:function(){t.currentStep<Ar&&(t.currentStep+=1,n())},goBack:function(){t.currentStep>1&&(t.currentStep-=1,n())},onChange:function(i){return r.push(i),function(){r=r.filter(function(a){return a!==i})}}}}var ui='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6"/></svg>';function kt(e){e=e||{};var r=e.skippableSteps||[],t=e.nextableSteps||[],n=e.onBack||function(){},i=e.onSkip||function(){},a=e.onNext||function(){},s=document.createElement("div");s.className="ikr-fwizard-footer";var o=document.createElement("button");o.type="button",o.className="ikr-fwizard-nav-btn ikr-fwizard-footer-back",o.setAttribute("aria-label","Geri"),o.innerHTML=ui+"<span>Geri</span>",o.addEventListener("click",function(){n()}),s.appendChild(o);var d=document.createElement("div");d.className="ikr-fwizard-footer-progress";for(var c=[],p=0;p<Ar;p++){var m=document.createElement("span");m.className="ikr-fwizard-progress-seg",d.appendChild(m),c.push(m)}s.appendChild(d);var l=document.createElement("button");l.type="button";var v=null;function f(u){v&&l.removeEventListener("click",v),v=u,u&&l.addEventListener("click",u)}s.appendChild(l);function k(u,h){var z=r.indexOf(u)!==-1,g=t.indexOf(u)!==-1,w=h&&(h.images&&h.images.length>0||h.pendingImages&&h.pendingImages.length>0);if(z)u===2&&w?(l.className="ikr-fwizard-cta-btn ikr-fwizard-footer-next",l.setAttribute("aria-label","Devam Et"),l.innerHTML="Devam Et",f(function(){a()})):(l.className="ikr-fwizard-nav-btn ikr-fwizard-footer-skip",l.setAttribute("aria-label","Atla"),l.innerHTML="<span>Atla</span>",f(function(){i()})),l.disabled=!1,l.classList.remove("ikr-fwizard-cta-btn--disabled"),l.style.visibility="",l.tabIndex=0;else if(g){l.className="ikr-fwizard-cta-btn ikr-fwizard-footer-next",l.setAttribute("aria-label","Sonraki"),l.innerHTML="Sonraki",l.style.visibility="",l.tabIndex=0;var C=Oe(u,h);l.disabled=!C,l.classList.toggle("ikr-fwizard-cta-btn--disabled",!C),f(function(){l.disabled||a()})}else l.className="ikr-fwizard-nav-btn ikr-fwizard-footer-skip",l.innerHTML="",l.style.visibility="hidden",l.tabIndex=-1,l.disabled=!0,f(null)}return{el:s,update:function(u,h){c.forEach(function(g,w){w+1<=u?g.classList.add("ikr-fwizard-progress-seg-active"):g.classList.remove("ikr-fwizard-progress-seg-active")});var z=u<=1;o.style.visibility=z?"hidden":"",o.style.pointerEvents=z?"none":"",o.tabIndex=z?-1:0,k(u,h)},setNextDisabled:function(u){l.classList.contains("ikr-fwizard-cta-btn")&&(l.disabled=!!u,l.classList.toggle("ikr-fwizard-cta-btn--disabled",!!u))},setThanksState:function(u){o.style.visibility="hidden",d.style.visibility="hidden",l.className="ikr-fwizard-cta-btn ikr-fwizard-footer-next",l.setAttribute("aria-label","Devam Et"),l.innerHTML="Devam Et",l.style.visibility="",l.disabled=!1,l.classList.remove("ikr-fwizard-cta-btn--disabled"),f(u)}}}function gt(e,r){r=r||{};var t=document.createElement("div");t.className="ikr-fwizard-step ikr-fwizard-step-rating";var n=!1,i=document.createElement("div");i.className="ikr-fwizard-step-title",i.textContent="Bu \xFCr\xFCn\xFC nas\u0131l de\u011Ferlendirirsiniz?",t.appendChild(i);var a=document.createElement("div");a.className="ikr-fwizard-stars",a.setAttribute("role","radiogroup"),a.setAttribute("aria-label","Y\u0131ld\u0131z puan\u0131");var s=Me(L||{}),o=[];function d(m){o.forEach(function(l,v){var f=v<m;l.classList.toggle("ikr-fwizard-star-active",f),l.innerHTML=f?s.filled:s.empty})}for(var c=1;c<=5;c++)(function(m){var l=document.createElement("button");l.type="button",l.className="ikr-fwizard-star",l.setAttribute("role","radio"),l.setAttribute("aria-label",m+" y\u0131ld\u0131z"),l.innerHTML=s.empty,l.addEventListener("mouseenter",function(){d(m)}),l.addEventListener("mouseleave",function(){d(e.get().rating)}),l.addEventListener("click",function(){n||(n=!0,e.set({rating:m}),d(m),setTimeout(function(){var v=!r.canNavigate||r.canNavigate();v&&e.goNext()},400))}),o.push(l),a.appendChild(l)})(c);d(e.get().rating);var p=function(){s=Me(L||{}),d(e.get().rating)};return window.addEventListener("IKR_SETTINGS_UPDATED_PREVIEW",p),t.appendChild(a),{el:t,destroy:function(){window.removeEventListener("IKR_SETTINGS_UPDATED_PREVIEW",p)}}}var Nr=3,fi=10*1024*1024;function ht(e,r){r=r||{};var t=!1,n=document.createElement("div");n.className="ikr-fwizard-step ikr-fwizard-step-photos";var i=document.createElement("div");i.className="ikr-fwizard-step-title ikr-fwizard-step-title--lg",i.textContent="Foto\u011Frafl\u0131 de\u011Ferlendirme",n.appendChild(i);var a=document.createElement("div");a.className="ikr-fwizard-step-subtitle",a.textContent="Foto\u011Fraf ekleyebilirsiniz.",n.appendChild(a);var s=document.createElement("div");s.className="ikr-fwizard-photo-card";var o=document.createElement("label");o.className="ikr-fwizard-photo-add",o.setAttribute("aria-label","Foto\u011Fraf ekle"),o.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg><span>Foto\u011Fraf Ekle</span>';var d=document.createElement("input");d.type="file",d.accept="image/*",d.multiple=!0,d.style.display="none",o.appendChild(d),s.appendChild(o);var c=document.createElement("div");c.className="ikr-fwizard-photo-previews",c.setAttribute("aria-live","polite"),s.appendChild(c),n.appendChild(s);var p=r.blobMap||{},m=r.urlToFinger||{};function l(){if(!t){var g=e.get().images||[],w=e.get().pendingImages||[],C=g.map(function(b){return{url:b,isPending:!1}}).concat(w.map(function(b){return{url:b.url,file:b.file,isPending:!0,error:b.error}}));c.innerHTML="",C.forEach(function(b){var y=p[b.url]||b.url,x=v(b,y);c.appendChild(x)}),h()}}function v(g,w){var C=document.createElement("div");C.className="ikr-fwizard-photo-thumb";var b=document.createElement("img");b.src=w,b.alt="",b.style.cssText="width:100%; height:100%; object-fit:cover; display:block; pointer-events:none; -webkit-user-drag:none; user-select:none;",C.appendChild(b);var y=document.createElement("div");y.className="ikr-fwizard-photo-loading",y.style.display="none",C.appendChild(y);var x=document.createElement("button");return x.type="button",x.className="ikr-fwizard-photo-remove",x.innerHTML="&#x2715;",C.appendChild(x),f(C,g,w),C}function f(g,w,C){var b=g.querySelector("img");b.src!==C&&(b.src=C);var y=g.querySelector(".ikr-fwizard-photo-loading");w.isPending&&w.error?(y.style.display="flex",y.innerHTML='<span class="ikr-upload-error">\u2717 '+w.error+"</span>"):y.style.display="none";var x=g.querySelector(".ikr-fwizard-photo-remove");x.onclick=function(){var S=m[w.url]||(w.file?w.file.name+"_"+w.file.size:null);if(w.url.startsWith("blob:")&&URL.revokeObjectURL(w.url),S){var E=(e.get().fingerprints||[]).filter(function(_){return _!==S});e.set({fingerprints:E})}if(w.isPending){var A=(e.get().pendingImages||[]).filter(function(_){return _.url!==w.url});e.set({pendingImages:A})}else{var T=(e.get().images||[]).filter(function(_){return _!==w.url});e.set({images:T})}}}var k='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>',u='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>';function h(){var g=(e.get().images||[]).length,w=(e.get().pendingImages||[]).length,C=g+w,b=C>=Nr,y=w>0;C>0?(s.classList.add("ikr-fwizard-photo-card--compact"),o.innerHTML=u):(s.classList.remove("ikr-fwizard-photo-card--compact"),o.innerHTML=k+"<span>Foto\u011Fraf Ekle</span>"),b?(o.style.display="none",d.disabled=!0):(o.style.display="flex",d.disabled=y,o.classList.toggle("ikr-fwizard-photo-add--disabled",y),o.appendChild(d))}d.onchange=async function(g){var w=Array.from(g.target.files).slice(0,Nr-(e.get().images||[]).length);d.value="";var C=(e.get().pendingImages||[]).length;if(!(C>0)){var b=e.get().images||[],y=b.length,x=Nr-b.length;if(w.length!==0){for(var S=[],E=[],A=0;A<w.length;A++){var T=w[A],_=T.name+"_"+T.size,W=(e.get().fingerprints||[]).some(function(H){return H===_})||S.some(function(H){return H.file.name+"_"+H.file.size===_});if(W){console.log("[ikr] Duplicate file detected, skipping:",T.name);continue}if(T.size>fi){var K="10MB'dan daha b\xFCy\xFCk foto\u011Fraflar\u0131 y\xFCkleyemezsin.";r.showToast?r.showToast(K,"error"):alert(K);continue}var X=URL.createObjectURL(T);m[X]=_,S.push({url:X,file:T,error:null}),E.push({url:X,file:T});var me=(e.get().fingerprints||[]).slice();me.push(_),e.set({fingerprints:me})}if(S.length!==0){var ne=(e.get().pendingImages||[]).concat(S),oe=async function(){for(var H=0;H<E.length;H++){var V=E[H],Ee=V.file,q=V.url;if(typeof window!="undefined"&&window.__ikasPreviewMode){var Ye=(e.get().pendingImages||[]).filter(function(M){return M.url!==q}),ye=(e.get().images||[]).slice();ye.push(q),e.set({pendingImages:Ye,images:ye});continue}try{var Te=await ie(ee+"/api/public/upload/sign",{method:"POST"});if(!Te.ok)throw Te.status===429?new Error("rate_limit"):new Error("sign failed");var O=await Te.json();Ce(O.cloud_name);var $=new FormData;$.append("file",Ee),$.append("api_key",O.api_key),$.append("timestamp",O.timestamp),$.append("signature",O.signature),$.append("folder","review_images");var Ge=await fetch("https://api.cloudinary.com/v1_1/"+O.cloud_name+"/image/upload",{method:"POST",body:$}),J=await Ge.json();if(J.secure_url&&Tr(J.secure_url)){var ue=(e.get().pendingImages||[]).some(function(M){return M.url===q});if(!ue){console.log("[ikr] Upload finished but image was already deleted by user. Aborting state update.");return}p[J.secure_url]=q,m[J.secure_url]=m[q];var fe=(e.get().pendingImages||[]).filter(function(M){return M.url!==q}),Q=(e.get().images||[]).slice();Q.push(J.secure_url),e.set({pendingImages:fe,images:Q})}else throw new Error("invalid image url")}catch(M){console.error("[ikr] Image upload failed:",M);var be=M.message==="rate_limit"?"\xC7ok fazla deneme. Bekleyin.":"Y\xFCkleme ba\u015Far\u0131s\u0131z.";r.showToast&&r.showToast(be,"error");var Ze=(e.get().pendingImages||[]).map(function(F){return F.url===q?{url:F.url,file:F.file,error:be}:F});e.set({pendingImages:Ze})}}};if(y===0){t=!0;var Z=!r.canNavigate||r.canNavigate();Z&&e.goNext()}e.set({pendingImages:ne}),oe()}}}};var z=e.onChange(l);return l(),{el:n,destroy:function(){t=!0,d.onchange=null,z&&z()}}}var Ir=2e3,vi=60;function wt(e,r){r=r||{};var t=r.onValidityChange||function(){},n=document.createElement("div");n.className="ikr-fwizard-step ikr-fwizard-step-content";var i=document.createElement("div");i.className="ikr-fwizard-step-title ikr-fwizard-step-title--lg",i.textContent="Deneyiminizi anlat\u0131n",n.appendChild(i);var a=document.createElement("div");a.className="ikr-fwizard-content-form";var s=document.createElement("input");s.type="text",s.className="ikr-fwizard-input",s.placeholder="K\u0131sa bir ba\u015Fl\u0131k (opsiyonel)",s.maxLength=vi,s.setAttribute("aria-label","Yorum ba\u015Fl\u0131\u011F\u0131"),s.value=e.get().title||"",s.addEventListener("input",function(){e.set({title:s.value})}),a.appendChild(s);var o=document.createElement("textarea");o.className="ikr-fwizard-textarea",o.placeholder="Deneyiminizi anlat\u0131n\u2026",o.maxLength=Ir,o.rows=6,o.setAttribute("aria-label","Yorum"),o.value=e.get().comment||"",a.appendChild(o);var d=document.createElement("div");d.className="ikr-fwizard-char-counter",d.setAttribute("aria-live","polite"),a.appendChild(d);function c(){var m=o.value.length;d.textContent=m+"/"+Ir,d.classList.toggle("ikr-fwizard-char-counter--max",m>=Ir)}function p(){return Oe(3,e.get())}return o.addEventListener("input",function(){e.set({comment:o.value}),c(),t(p())}),n.appendChild(a),c(),setTimeout(function(){t(p())},0),{el:n,destroy:function(){}}}var ki=40;function yt(e,r){r=r||{};var t=r.onValidityChange||function(){},n=r.onSuccess||function(){},i=document.createElement("div");i.className="ikr-fwizard-step ikr-fwizard-step-author";var a=document.createElement("div");a.className="ikr-fwizard-step-title ikr-fwizard-step-title--lg",a.textContent="Hakk\u0131n\u0131zda",i.appendChild(a);var s=document.createElement("div");s.className="ikr-fwizard-author-form";var o=document.createElement("div");o.className="ikr-fwizard-field";var d=document.createElement("label");d.className="ikr-fwizard-label",d.innerHTML='Ad\u0131n\u0131z <span class="ikr-fwizard-required" aria-hidden="true">*</span>';var c=document.createElement("input");c.type="text",c.className="ikr-fwizard-input",c.maxLength=ki,c.setAttribute("aria-required","true"),c.value=e.get().author||"",o.appendChild(d),o.appendChild(c),s.appendChild(o);var p=document.createElement("div");p.className="ikr-fwizard-field";var m=document.createElement("label");m.className="ikr-fwizard-label",m.textContent="E-posta (opsiyonel)";var l=document.createElement("input");l.type="email",l.className="ikr-fwizard-input",l.setAttribute("autocomplete","email"),l.value=e.get().email||"",p.appendChild(m),p.appendChild(l),s.appendChild(p);var v=document.createElement("div");v.className="ikr-fwizard-notice",v.textContent="G\xF6nder'e t\u0131klayarak yorumumun \xFCr\xFCn sayfas\u0131nda herkese a\xE7\u0131k \u015Fekilde yay\u0131nlanaca\u011F\u0131n\u0131 kabul ediyorum.",s.appendChild(v);var f=document.createElement("div");f.className="ikr-fwizard-msg",f.setAttribute("role","alert"),f.setAttribute("aria-live","assertive"),s.appendChild(f);var k=document.createElement("button");k.type="button",k.className="ikr-fwizard-submit-btn",k.textContent="G\xF6nder",s.appendChild(k),i.appendChild(s);function u(){return Oe(4,e.get())}function h(){var g=!u(),w=(e.get().pendingImages||[]).length,C=w>0;C?(k.disabled=!0,k.classList.add("ikr-fwizard-submit-btn--disabled"),k.textContent="Foto\u011Fraflar Y\xFCkleniyor..."):(k.disabled=g,k.classList.toggle("ikr-fwizard-submit-btn--disabled",g),k.textContent="G\xF6nder")}c.addEventListener("input",function(){e.set({author:c.value}),h(),t(u())}),l.addEventListener("input",function(){e.set({email:l.value})}),h(),setTimeout(function(){t(u())},0),k.onclick=async function(){if(!k.disabled){var g=e.get(),w=(g.author||"").trim(),C=(g.comment||"").trim();if(l.value.trim()&&!l.checkValidity()){l.reportValidity();return}if(!w){f.innerHTML='<div class="ikr-fwizard-msg-error">Gerekli alan</div>';return}if(!g.rating){f.innerHTML='<div class="ikr-fwizard-msg-error">L\xFCtfen bir y\u0131ld\u0131z se\xE7in.</div>';return}k.disabled=!0,k.classList.add("ikr-fwizard-submit-btn--disabled");var b=k.textContent;if(k.textContent="G\xF6nderiliyor\u2026",f.innerHTML="",typeof window!="undefined"&&window.__ikasPreviewMode){setTimeout(function(){n()},600);return}try{var y=D(window.location.href),x=g.productName||(document.querySelector("h1")?document.querySelector("h1").innerText.trim():null),S=await ie(ee+"/api/public/reviews",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({storeId:Y,productId:g.productId||null,slug:y||null,productName:x,author:w,title:(g.title||"").trim()||null,comment:C||null,rating:g.rating,images:g.images||[]})},15e3);if(S.ok)n();else{var E=await S.json().catch(function(){return{}});throw new Error(E.error||"Yorum kaydedilemedi.")}}catch(_){var A=_&&(_.name==="AbortError"||/signal/i.test(_.message||"")),T=A?"Ba\u011Flant\u0131 yava\u015F, l\xFCtfen tekrar deneyin.":_.message||"Yorum g\xF6nderilemedi.";r.showToast?r.showToast(T,"error"):f.innerHTML='<div class="ikr-fwizard-msg-error">'+T+"</div>",k.disabled=!1,k.classList.remove("ikr-fwizard-submit-btn--disabled"),k.textContent=b}}};var z=e.onChange(h);return{el:i,destroy:function(){k.onclick=null,z&&z()}}}var bt=!1;function gi(){if(!bt){var e=document.createElement("style");e.setAttribute("data-ikr-fwizard",""),e.textContent=ft,document.head.appendChild(e),bt=!0}}function hi(e,r,t){if(t=t||{},e===1)return gt(r,{canNavigate:t.canNavigate});if(e===2)return ht(r,{canNavigate:t.canNavigate,blobMap:t.blobMap,urlToFinger:t.urlToFinger,showToast:t.showToast});if(e===3)return wt(r,{onValidityChange:t.onValidityChange});if(e===4)return yt(r,{onValidityChange:t.onValidityChange,onSuccess:t.onSuccess,showToast:t.showToast});var n=document.createElement("div");return n.className="ikr-fwizard-step ikr-fwizard-step-placeholder",{el:n,destroy:function(){}}}function xt(){var e=document.createElement("div");return e.className="ikr-fwizard-step ikr-fwizard-step-thanks",e.innerHTML='<div class="ikr-fwizard-step-title ikr-fwizard-thanks-title">Te\u015Fekk\xFCrler</div><div class="ikr-fwizard-step-subtitle ikr-fwizard-thanks-subtitle">De\u011Ferlendirmeniz al\u0131nd\u0131.</div>',e}function zt(e){e=e||{},gi();var r=vt({productId:e.productId,productName:e.productName}),t={},n={},i=ut({onClose:function(){window.removeEventListener("popstate",s),window.history.state&&window.history.state.ikrReviewModal&&window.history.back(),Object.keys(t).forEach(function(b){var y=t[b];y&&y.startsWith("blob:")&&URL.revokeObjectURL(y)}),e.onClose&&e.onClose()},allowOutsideClose:!1}),a={ikrReviewModal:!0};window.history.pushState(a,null,"");var s=function(b){i&&i.close&&i.close()};window.addEventListener("popstate",s);var o=document.createElement("div");o.className="ikr-fwizard-step-wrap";var d=kt({skippableSteps:[2],nextableSteps:[3],onBack:function(){m==="idle"&&r.goBack()},onSkip:function(){m==="idle"&&r.goNext()},onNext:function(){m==="idle"&&r.goNext()}}),c=document.createElement("div");c.className="ikr-fwizard-layout",c.appendChild(o),c.appendChild(d.el);var p=null,m="idle",l=null,v=!0,f=null;function k(b,y){o.innerHTML="";var x=hi(b,r,{canNavigate:function(){return m==="idle"},blobMap:t,urlToFinger:n,onValidityChange:function(A){d.setNextDisabled(!A)},onSuccess:h,showToast:i.showToast});if(p=x,d.update(b,r.get()),y){m="entering",x.el.classList.add("ikr-fwizard-step--enter");var S=null,E=function(){S&&clearTimeout(S),x.el.removeEventListener("animationend",E),x.el.classList.remove("ikr-fwizard-step--enter"),m="idle",l!==null&&z()};x.el.addEventListener("animationend",E),S=setTimeout(E,700)}else m="idle";o.appendChild(x.el),i.setStepAttr&&i.setStepAttr(b),b===3&&d.setNextDisabled(!0)}var u=!1;function h(){if(!u){if(u=!0,!p){o.innerHTML="";var b=xt();b.classList.add("ikr-fwizard-step--enter"),o.appendChild(b),i.setStepAttr("thanks"),d.setThanksState(i.close);return}var y=p;m="exiting",y.el.classList.add("ikr-fwizard-step--exit");var x=function(){if(f&&clearTimeout(f),y.el.removeEventListener("animationend",x),y.destroy)try{y.destroy()}catch(E){}p===y&&(p=null),o.innerHTML="";var S=xt();S.classList.add("ikr-fwizard-step--enter"),o.appendChild(S),i.setStepAttr("thanks"),d.setThanksState(i.close),m="idle"};y.el.addEventListener("animationend",x),f=setTimeout(x,300)}}function z(){var b=r.get().currentStep;if(m!=="idle"){l=b;return}if(!p){var y=!v;v=!1,k(b,y);return}var x=p;m="exiting",x.el.classList.add("ikr-fwizard-step--exit");var S=function(){if(f&&clearTimeout(f),x.el.removeEventListener("animationend",S),x.destroy)try{x.destroy()}catch(A){}if(p===x){o.innerHTML="",p=null;var E=l!==null?l:r.get().currentStep;l=null,k(E,!0),m="idle"}};x.el.addEventListener("animationend",S),f=setTimeout(S,350)}z();var g=r.get().currentStep,w=r.onChange(function(b){b.currentStep!==g?(g=b.currentStep,z()):d.update(b.currentStep,b)}),C=i.close;return i.close=function(){w&&w(),typeof f!="undefined"&&f&&clearTimeout(f),C()},i.open(c),{close:i.close}}function j(){zt({productId:re||"",productName:ze||""})}var wi={id:"classic",name:"Klasik (A\xE7\u0131k)"};function yi(e){var r=e.widget,t=e.data,n=e.settings,i=e.iconPair,a=e.allCount,s=e.ratingCounts,o=e.avgRatingVal,d=e.currentRatingFilter,c=e.currentOrderBy,p=e.currentHasImages,m=e.onFilterChange,l=e.onSortChange,v=document.createElement("div");v.className="ikr-summary";var f=(s[3]||0)+(s[4]||0),k=a>0?Math.round(f/a*100):0,u=document.createElement("div");u.className="ikr-summary-block ikr-summary-avg",u.innerHTML='<span class="ikr-avg-star ikr-icon">'+i.filled+'</span><span class="ikr-avg-num">'+o+"</span>",v.appendChild(u);var h=document.createElement("div");if(h.className="ikr-summary-block ikr-summary-count",h.textContent=a.toLocaleString("tr-TR")+" Yorum",v.appendChild(h),n.showRecommendation!==!1&&k>0){var z=document.createElement("div");z.className="ikr-summary-block ikr-summary-recommend",z.innerHTML='<span class="ikr-recommend-pct">%'+k+"</span> bu \xFCr\xFCn\xFC tavsiye ediyor",v.appendChild(z)}return v.appendChild(He({ratingCounts:s,allCount:a,iconPair:i,currentRatingFilter:d,onFilterChange:m})),v.appendChild(ae({widget:r,currentOrderBy:c,currentHasImages:p,onWriteClick:j,onSortChange:l})),v}var Mr={};xe(Mr,{css:()=>xi,meta:()=>bi,render:()=>zi});var Ct=`
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
`;var bi={id:"compact",name:"Kompakt (A\xE7\u0131l\u0131r)",sizeOverrides:{small:{"--ikr-compact-star-size":"20px"},medium:{"--ikr-compact-star-size":"24px"},large:{"--ikr-compact-star-size":"28px"}}},xi=Ct;function zi(e){var r=e.widget,t=e.settings,n=e.iconPair,i=e.allCount,a=e.ratingCounts,s=e.avgRatingVal,o=e.currentRatingFilter,d=e.currentOrderBy,c=e.currentHasImages,p=e.onFilterChange,m=e.onSortChange,l=document.createElement("div");l.className="ikr-summary ikr-summary-compact";var v=document.createElement("div");v.className="ikr-compact-header";var f=document.createElement("div");f.className="ikr-compact-trigger-wrap";var k=document.createElement("button");k.className="ikr-compact-trigger",k.type="button",k.setAttribute("aria-expanded","false"),k.innerHTML='<span class="ikr-compact-trigger-stars">'+se(s,n)+'</span><span class="ikr-compact-trigger-text">'+i.toLocaleString("tr-TR")+' Yorum</span><span class="ikr-compact-chevron"><svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M7.11 5.16L2.16 0.21L0.75 1.62L7.11 7.98L13.48 1.62L12.06 0.21L7.11 5.16Z" fill="currentColor"/></svg></span>',f.appendChild(k),v.appendChild(f);var u=ae({widget:r,currentOrderBy:d,currentHasImages:c,onWriteClick:j,onSortChange:m}),h=u.querySelector(".ikr-filter-wrap"),z=u.querySelector(".ikr-write-btn"),g=document.createElement("div");g.className="ikr-compact-actions-slot",z&&g.appendChild(z),h&&g.appendChild(h),v.appendChild(g),l.appendChild(v);var w=document.createElement("div");w.className="ikr-compact-panel",w.setAttribute("role","dialog"),w.setAttribute("aria-hidden","true");var C=document.createElement("div");C.className="ikr-compact-panel-inner";var b=document.createElement("div");b.className="ikr-compact-avg",b.innerHTML='<span class="ikr-icon">'+n.filled+"</span><span>"+s+"</span>",C.appendChild(b),C.appendChild(He({ratingCounts:a,allCount:i,iconPair:n,currentRatingFilter:o,onFilterChange:p})),w.appendChild(C);var y=typeof window!="undefined"&&window.matchMedia?window.matchMedia("(max-width:600px)"):null;function x(Z){var H=Z?l:f;w.parentNode!==H&&(w.classList.contains("ikr-open")&&(w.classList.remove("ikr-open"),w.setAttribute("aria-hidden","true"),k.setAttribute("aria-expanded","false")),H.appendChild(w))}if(x(y?y.matches:!1),y){var S=function(Z){x(Z.matches)};y.addEventListener?y.addEventListener("change",S):y.addListener&&y.addListener(S)}if(z){var E=document.createElement("button");E.className="ikr-write-btn",E.textContent=L&&L.writeButtonText||"Yorum Yap",E.onclick=j;var A=document.createElement("div");A.className="ikr-compact-write-row",A.appendChild(E),l.appendChild(A)}function T(){w.classList.remove("ikr-open"),w.setAttribute("aria-hidden","true"),k.setAttribute("aria-expanded","false")}function _(){pr(W),w.classList.add("ikr-open"),w.setAttribute("aria-hidden","false"),k.setAttribute("aria-expanded","true")}k.onclick=function(){w.classList.contains("ikr-open")?T():_()};var W=null;function K(Z){W&&(W(),W=null),Z||(W=mr({trigger:f,element:w,close:T}))}if(K(y?y.matches:!1),y){var X=function(Z){K(Z.matches)};y.addEventListener?y.addEventListener("change",X):y.addListener&&y.addListener(X)}if(t.showRecommendation!==!1){var me=(a[3]||0)+(a[4]||0),ne=i>0?Math.round(me/i*100):0;if(ne>0){var oe=document.createElement("div");oe.className="ikr-summary-block ikr-summary-recommend",oe.style.marginTop="8px",oe.innerHTML='<span class="ikr-recommend-pct">%'+ne+"</span> bu \xFCr\xFCn\xFC tavsiye ediyor",C.appendChild(oe)}}return l}var Rr={};xe(Rr,{css:()=>Si,meta:()=>Ci,render:()=>Ei});var St=`
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
`;var Ci={id:"split",name:"Yatay B\xF6l\xFCnm\xFC\u015F"},Si=St;function Ei(e){var r=e.widget,t=e.settings,n=e.iconPair,i=e.allCount,a=e.ratingCounts,s=e.avgRatingVal,o=e.currentRatingFilter,d=e.currentOrderBy,c=e.currentHasImages,p=e.onFilterChange,m=e.onSortChange,l=document.createElement("div");l.className="ikr-summary ikr-summary-split";var v=document.createElement("div");v.className="ikr-split-col ikr-split-left";var f=document.createElement("div");f.className="ikr-summary-block ikr-summary-avg ikr-split-left-avg-block",f.innerHTML='<span class="ikr-avg-star ikr-icon">'+n.filled+'</span><span class="ikr-avg-num">'+s+"</span>",v.appendChild(f);var k=document.createElement("div");k.className="ikr-summary-block ikr-summary-count ikr-split-left-count",k.textContent=i.toLocaleString("tr-TR")+" Yorum",v.appendChild(k),l.appendChild(v);var u=document.createElement("div");u.className="ikr-split-col ikr-split-mid",u.appendChild(He({ratingCounts:a,allCount:i,iconPair:n,currentRatingFilter:o,onFilterChange:p})),l.appendChild(u);var h=ae({widget:r,currentOrderBy:d,currentHasImages:c,onWriteClick:j,onSortChange:m}),z=h.querySelector(".ikr-filter-wrap"),g=h.querySelector(".ikr-write-btn"),w=document.createElement("div");w.className="ikr-split-col ikr-split-right",g&&w.appendChild(g),z&&w.appendChild(z),l.appendChild(w);var C=(a[3]||0)+(a[4]||0),b=i>0?Math.round(C/i*100):0,y=document.createElement("div");y.className="ikr-summary-block ikr-summary-recommend",y.innerHTML='<span class="ikr-recommend-pct">%'+b+"</span> bu \xFCr\xFCn\xFC tavsiye ediyor";var x=t.showRecommendation===!1||b===0;return x&&y.classList.add("ikr-split-rec-hidden"),v.appendChild(y),l}var Br={};xe(Br,{css:()=>Li,meta:()=>Ti,render:()=>Ai});var Et=`
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
`;var Ti={id:"minimal",name:"Minimal (Yal\u0131n)",supports:{recommendation:!1,barChart:!1}},Li=Et;function Ai(e){var r=e.widget,t=e.iconPair,n=e.allCount,i=e.avgRatingVal,a=e.currentOrderBy,s=e.currentHasImages,o=e.onSortChange,d=document.createElement("div");d.className="ikr-summary ikr-summary-minimal";var c=document.createElement("div");c.className="ikr-minimal-info";var p=document.createElement("div");p.className="ikr-minimal-row";var m=document.createElement("span");m.className="ikr-minimal-avg",m.textContent=i,p.appendChild(m);var l=document.createElement("span");l.className="ikr-minimal-stars",l.innerHTML=se(i,t),p.appendChild(l);var v=document.createElement("span");v.className="ikr-minimal-count",v.textContent=n.toLocaleString("tr-TR")+" Yorum",p.appendChild(v),c.appendChild(p),d.appendChild(c);var f=ae({widget:r,currentOrderBy:a,currentHasImages:s,onWriteClick:j,onSortChange:o}),k=f.querySelector(".ikr-filter-wrap"),u=f.querySelector(".ikr-write-btn"),h=document.createElement("div");if(h.className="ikr-minimal-actions",u&&h.appendChild(u),k&&h.appendChild(k),d.appendChild(h),u){var z=document.createElement("button");z.className="ikr-write-btn",z.textContent=L&&L.writeButtonText||"Yorum Yap",z.onclick=j;var g=document.createElement("div");g.className="ikr-minimal-write-row",g.appendChild(z),d.appendChild(g)}return d}var Pr={};xe(Pr,{css:()=>Ii,meta:()=>Ni,render:()=>_i});var Tt=`
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
`;var Ni={id:"hero",name:"Vurgulu (B\xFCy\xFCk Puan)",supports:{recommendation:!1,barChart:!1}},Ii=Tt;function _i(e){var r=e.widget,t=e.iconPair,n=e.allCount,i=e.avgRatingVal,a=e.currentOrderBy,s=e.currentHasImages,o=e.onSortChange,d=document.createElement("div");d.className="ikr-summary ikr-summary-hero";var c=document.createElement("div");c.className="ikr-hero-info";var p=document.createElement("div");p.className="ikr-hero-rating-col";var m=document.createElement("span");m.className="ikr-hero-avg",m.textContent=i,p.appendChild(m);var l=document.createElement("div");l.className="ikr-hero-meta-row";var v=document.createElement("span");v.className="ikr-hero-stars",v.innerHTML=se(i,t),l.appendChild(v);var f=document.createElement("div");f.className="ikr-hero-count",f.textContent=n.toLocaleString("tr-TR")+" Yorum",l.appendChild(f),p.appendChild(l),c.appendChild(p),d.appendChild(c);var k=ae({widget:r,currentOrderBy:a,currentHasImages:s,onWriteClick:j,onSortChange:o}),u=k.querySelector(".ikr-filter-wrap"),h=k.querySelector(".ikr-write-btn"),z=document.createElement("div");z.className="ikr-hero-actions ikr-desktop-only",h&&z.appendChild(h),u&&z.appendChild(u),d.appendChild(z);var g=ae({widget:r,currentOrderBy:a,currentHasImages:s,onWriteClick:j,onSortChange:o}),w=g.querySelector(".ikr-filter-wrap"),C=g.querySelector(".ikr-write-btn"),b=document.createElement("div");return b.className="ikr-hero-write-row",C&&b.appendChild(C),w&&b.appendChild(w),d.appendChild(b),d}var ur={classic:_r,compact:Mr,split:Rr,minimal:Br,hero:Pr};function fr(e){return ur[e]||ur.classic}function Lt(){return Object.keys(ur).map(function(e){return ur[e].css||""}).join(`
`)}var Hr={};xe(Hr,{css:()=>Ri,meta:()=>Mi,render:()=>Bi});function Fe(e,r){if(!e)return null;var t=document.createElement("div");t.className="ikr-reply";var n=document.createElement("div");n.className="ikr-reply-header";var i=document.createElement("span");i.className="ikr-reply-label",i.textContent="Ma\u011Faza Sahibi",n.appendChild(i),t.appendChild(n);var a=document.createElement("div");a.className="ikr-reply-text ikr-reply-text-clamped",a.textContent=e,t.appendChild(a);var s=document.createElement("span");return s.className="ikr-read-more ikr-reply-read-more",s.textContent="Devam\u0131n\u0131 oku",s.style.display="none",t.appendChild(s),requestAnimationFrame(function(){if(a.scrollHeight>a.clientHeight+2)if(s.style.display="inline",typeof r=="function")s.onclick=r;else{var o=!1;s.onclick=function(){o=!o,a.classList.toggle("ikr-reply-text-clamped",!o),s.textContent=o?"Daha az g\xF6ster":"Devam\u0131n\u0131 oku"}}}),t}var Mi={id:"card",name:"Kart (Varsay\u0131lan)",sizeOverrides:{small:{"--ikr-card-photo-w":"80px"},medium:{"--ikr-card-photo-w":"110px"},large:{"--ikr-card-photo-w":"140px"}}},Ri="";function Bi(e,r){var t=document.createElement("div");t.className="ikr-review ikr-review-card";var n=document.createElement("div");n.className="ikr-review-top";var i=document.createElement("div");i.className="ikr-review-top-left";var a=document.createElement("span");a.className="ikr-review-stars",a.innerHTML=ve(e.rating,L),i.appendChild(a);var s=document.createElement("span");if(s.className="ikr-date",s.textContent=ke(e.createdAt),n.appendChild(i),n.appendChild(s),t.appendChild(n),e.title){var o=document.createElement("div");o.className="ikr-review-title",o.textContent=e.title,t.appendChild(o)}var d=document.createElement("div");d.className="ikr-author",d.textContent=e.author||"",t.appendChild(d);var c=(e.comment||"").trim();if(c){var p=document.createElement("div");p.className="ikr-body ikr-body-clamped",p.textContent=c,t.appendChild(p);var m=document.createElement("span");m.className="ikr-read-more",m.textContent="Devam\u0131n\u0131 oku",m.style.display="none",t.appendChild(m),requestAnimationFrame(function(){if(p.scrollHeight>p.clientHeight+2){m.style.display="inline";var k=!1;m.onclick=function(){k=!k,p.classList.toggle("ikr-body-clamped",!k),m.textContent=k?"Daha az g\xF6ster":"Devam\u0131n\u0131 oku"}}})}var l=ge(e);if(l.length){var v=document.createElement("div");v.className="ikr-gallery",l.forEach(function(k){var u=document.createElement("img"),h=de(k,U);u.src=h.src,u.srcset=h.srcset,u.loading="lazy",u.decoding="async",u.width=U,u.height=U,u.className="ikr-img",u.setAttribute("data-ikr-img-url",k),(function(z){u.onclick=function(){ce(e,z,r)}})(k),v.appendChild(u)}),t.appendChild(v)}var f=Fe(e.merchantReply);return f&&t.appendChild(f),t}var Or={};xe(Or,{css:()=>Hi,meta:()=>Pi,render:()=>Oi});var At=`
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
  .ikr-review-list-author-date{margin-top:var(--ikr-gap-tight);font-size:var(--ikr-review-date-size,12px);color:var(--ikr-review-date,var(--ikr-text,rgba(0,0,0,0.6)));}
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
`;var Pi={id:"list",name:"Liste",supports:{},sizeOverrides:{small:{"--ikr-list-photo-w":"80px","--ikr-list-photo-w-mobile":"80px"},medium:{"--ikr-list-photo-w":"110px","--ikr-list-photo-w-mobile":"100px"},large:{"--ikr-list-photo-w":"140px","--ikr-list-photo-w-mobile":"110px"}}},Hi=At;function Oi(e,r){var t=ge(e),n=t.length>0,i=document.createElement("div");i.className="ikr-review-list"+(n?"":" ikr-review-list--no-media");var a=document.createElement("div");a.className="ikr-review-list-author";var s=document.createElement("span");s.className="ikr-review-stars ikr-review-list-author-stars",s.innerHTML=ve(e.rating,L),a.appendChild(s);var o=document.createElement("span");o.className="ikr-review-list-author-name",o.textContent=e.author||"",a.appendChild(o);var d=document.createElement("span");d.className="ikr-date ikr-review-list-author-date",d.textContent=ke(e.createdAt),a.appendChild(d),i.appendChild(a);var c=document.createElement("div");if(c.className="ikr-review-list-content",e.title){var p=document.createElement("div");p.className="ikr-review-list-title",p.textContent=e.title,c.appendChild(p)}var m=(e.comment||"").trim();if(m){var l=document.createElement("div");l.className="ikr-review-list-body ikr-body-clamped",l.textContent=m,c.appendChild(l);var v=document.createElement("span");v.className="ikr-read-more",v.textContent="Devam\u0131n\u0131 oku",v.style.display="none",c.appendChild(v),requestAnimationFrame(function(){if(l.scrollHeight>l.clientHeight+2){v.style.display="inline";var u=!1;v.onclick=function(){u=!u,l.classList.toggle("ikr-body-clamped",!u),v.textContent=u?"Daha az g\xF6ster":"Devam\u0131n\u0131 oku"}}})}var f=Fe(e.merchantReply);if(f&&c.appendChild(f),i.appendChild(c),n){var k=document.createElement("div");k.className="ikr-review-list-media",t.forEach(function(u){var h=document.createElement("img"),z=de(u,U);h.src=z.src,h.srcset=z.srcset,h.loading="lazy",h.decoding="async",h.width=U,h.height=Math.round(U*4/3),h.setAttribute("data-ikr-img-url",u),(function(g){h.onclick=function(){ce(e,g,r)}})(u),k.appendChild(h)}),i.appendChild(k)}return i}var Fr={};xe(Fr,{css:()=>Di,meta:()=>Fi,render:()=>ji});var Nt=`
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
    color:var(--ikr-review-date,var(--ikr-text,rgba(0,0,0,0.6)));
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
`;var Fi={id:"gallery",name:"Galeri",supports:{},sizeOverrides:{small:{"--ikr-gallery-photo-w":"80px","--ikr-gallery-photo-w-mobile":"80px"},medium:{"--ikr-gallery-photo-w":"110px","--ikr-gallery-photo-w-mobile":"100px"},large:{"--ikr-gallery-photo-w":"140px","--ikr-gallery-photo-w-mobile":"110px"}}},Di=Nt;function ji(e,r){var t=sr(e),n=!!t,i=document.createElement("div");i.className="ikr-review-gallery"+(n?"":" ikr-review-gallery--no-media");var a=document.createElement("div");a.className="ikr-review-gallery-content";var s=document.createElement("span");if(s.className="ikr-review-stars ikr-review-gallery-stars",s.innerHTML=ve(e.rating,L),a.appendChild(s),e.title){var o=document.createElement("div");o.className="ikr-review-gallery-title",o.textContent=e.title,a.appendChild(o)}var d=document.createElement("div");d.className="ikr-review-gallery-author",d.textContent=e.author||"",a.appendChild(d);var c=document.createElement("div");c.className="ikr-review-gallery-date",c.textContent=ke(e.createdAt),a.appendChild(c);var p=(e.comment||"").trim();if(p){var m=document.createElement("div");m.className="ikr-review-gallery-body ikr-body-clamped",m.textContent=p,a.appendChild(m);var l=document.createElement("span");l.className="ikr-read-more",l.textContent="Devam\u0131n\u0131 oku",l.style.display="none",l.style.cursor="pointer";var v=!1;l.onclick=function(){if(t){ce(e,t,r);return}v=!v,m.classList.toggle("ikr-body-clamped",!v),l.textContent=v?"Daha az g\xF6ster":"Devam\u0131n\u0131 oku"},a.appendChild(l),requestAnimationFrame(function(){m.scrollHeight>m.clientHeight+2&&(l.style.display="inline")})}if(i.appendChild(a),n){var f=document.createElement("div");f.className="ikr-review-gallery-media";var k=document.createElement("img"),u=de(t,dr);k.src=u.src,k.srcset=u.srcset,k.loading="lazy",k.decoding="async",k.width=dr,k.height=Math.round(dr*4/3),k.setAttribute("data-ikr-img-url",t),k.onclick=function(){ce(e,t,r)},f.appendChild(k),i.appendChild(f)}var h=Fe(e.merchantReply,t?function(){ce(e,t,r)}:null);return h&&(h.classList.add("ikr-review-gallery-reply"),i.appendChild(h)),i}var vr={card:Hr,list:Or,gallery:Fr};function er(e){return vr[e]||vr.card}function It(){return Object.keys(vr).map(function(e){return vr[e].css||""}).join(`
`)}function Re(e,r){var t=/^#([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})?$/.exec(e);if(!t)return"rgba(0,0,0,"+r+")";var n=parseInt(t[1],16),i=parseInt(t[2],16),a=parseInt(t[3],16);return"rgba("+n+","+i+","+a+","+r+")"}var _t={small:{titleSize:20,reviewTextSize:12,reviewTitleSize:14,authorSize:12,replyNameSize:12,replyTextSize:12,photoTitleSize:14,avgRatingSize:36,avgStarSize:48,reviewCountSize:16,recommendSize:12,compactCountSize:14,btnTextSize:12,barLabelSize:18,barCountSize:12,reviewDateSize:10,filterTextSize:12,loadMoreSize:12,readMoreSize:10,reviewStarSize:18,minimalAvgSize:18,heroAvgSize:74},medium:{titleSize:24,reviewTextSize:14,reviewTitleSize:16,authorSize:14,replyNameSize:13,replyTextSize:13,photoTitleSize:16,avgRatingSize:46,avgStarSize:58,reviewCountSize:20,recommendSize:14,compactCountSize:16,btnTextSize:14,barLabelSize:22,barCountSize:14,reviewDateSize:12,filterTextSize:14,loadMoreSize:14,readMoreSize:12,reviewStarSize:22,minimalAvgSize:22,heroAvgSize:90},large:{titleSize:28,reviewTextSize:16,reviewTitleSize:18,authorSize:16,replyNameSize:15,replyTextSize:15,photoTitleSize:18,avgRatingSize:56,avgStarSize:68,reviewCountSize:22,recommendSize:16,compactCountSize:18,btnTextSize:16,barLabelSize:26,barCountSize:16,reviewDateSize:14,filterTextSize:16,loadMoreSize:16,readMoreSize:14,reviewStarSize:26,minimalAvgSize:26,heroAvgSize:106}},Mt={small:80,medium:110,large:140};function qi(e,r){var t=r.headerTitleColor||"#111111",n=r.headerAvgColor||"#111111",i=r.headerCountColor||"#111111",a=r.headerRecommendColor||"#111111",s=r.barFillColor||"#111111",o=r.barTrackColor||"#e5e7eb",d=r.barCountColor||"#111111",c=Re(s,.06),p=r.reviewStarColor||"#f59e0b",m=p,l=r.btnBgColor||"#111111",v=r.btnTextColor||"#ffffff",f=r.btnBorderColor||"#111111",k=r.filterBtnBgColor||"#111111",u=r.filterBtnTextColor||"#ffffff",h=r.filterBtnBorderColor||"#111111",z=r.filterMenuBgColor||"#ffffff",g=r.filterMenuBorderColor||"#e5e7eb",w=r.filterItemTextColor||"#111111",C=r.filterItemHoverBgColor||"#f3f4f6",b=r.filterItemActiveColor||"#111111",y=r.reviewTitleColor||"#111111",x=r.reviewAuthorColor||"#111111",S=r.reviewDateColor||"#111111",E=r.reviewBodyColor||"#111111",A=r.reviewBorderColor||"#e5e7eb",T=r.replyBgColor||"#f9fafb",_=r.replyBorderColor||"#747474",W=r.replyLabelColor||"#111111",K=r.replyTextColor||"#111111",X=r.photoTitleColor||"#111111",me=Re("#111111",.05),ne=r.photoArrowBgColor||"#ffffff",oe=r.photoArrowTextColor||"#111111",Z=Re("#111111",.12),H=r.formBgColor||"#ffffff",V=r.formPrimaryTextColor||"#111111",Ee=r.formSecondaryTextColor||"#3b3b3b",q=r.inputTextColor||V,Ye=r.inputBorderColor||"#d1d5db",ye=r.placeholderColor||"#9ca3af",Te=r.formStepBarColor||"#111111",O=r.formBtnBgColor||"#111111",$=r.formBtnTextColor||"#ffffff",Ge=r.formBtnBorderColor||"#111111",J=Re(O,.06),ue=Re(O,.18),fe=Re($,.85),Q=Re(V,.06),be=r.loadMoreBgColor||"#ffffff",Ze=r.loadMoreTextColor||"#111111",M=r.loadMoreBorderColor||"#111111",F={"--ikr-widget-bg":"#ffffff00","--ikr-widget-border":"#ffffff00","--ikr-header-title":t,"--ikr-header-avg":n,"--ikr-header-count":i,"--ikr-header-recommend":a,"--ikr-bar-fill":s,"--ikr-bar-track":o,"--ikr-star-empty-color":m,"--ikr-bar-count":d,"--ikr-bar-hover-bg":c,"--ikr-btn-bg":l,"--ikr-btn-text":v,"--ikr-btn-border":f,"--ikr-filter-btn-bg":k,"--ikr-filter-btn-text":u,"--ikr-filter-btn-border":h,"--ikr-filter-menu-bg":z,"--ikr-filter-menu-border":g,"--ikr-filter-item-text":w,"--ikr-filter-item-hover-bg":C,"--ikr-filter-item-active":b,"--ikr-review-title":y,"--ikr-review-author":x,"--ikr-review-date":S,"--ikr-review-body":E,"--ikr-review-border":A,"--ikr-review-star-color":p,"--ikr-reply-bg-color":T,"--ikr-reply-border":_,"--ikr-reply-label":W,"--ikr-reply-text":K,"--ikr-photo-title":X,"--ikr-photo-image-border":me,"--ikr-photo-arrow-bg":ne,"--ikr-photo-arrow-text":oe,"--ikr-photo-arrow-border":Z,"--ikr-fwizard-bg":H,"--ikr-fwizard-text":V,"--ikr-fwizard-secondary-text":Ee,"--ikr-fwizard-input-bg":H,"--ikr-fwizard-input-text":q,"--ikr-fwizard-input-border":Ye,"--ikr-fwizard-placeholder":ye,"--ikr-fwizard-close-text":V,"--ikr-fwizard-close-hover-bg":Q,"--ikr-fwizard-progress-bg":Q,"--ikr-fwizard-progress-active":Te,"--ikr-fwizard-btn-bg":O,"--ikr-fwizard-btn-text":$,"--ikr-fwizard-btn-border":Ge,"--ikr-fwizard-btn-disabled-bg":ue,"--ikr-fwizard-btn-disabled-text":fe,"--ikr-fwizard-nav-hover-bg":J,"--ikr-load-more-bg":be,"--ikr-load-more-text":Ze,"--ikr-load-more-border":M};Object.keys(F).forEach(function(hr){e.style.setProperty(hr,F[hr])}),typeof window!="undefined"&&window.__ikasPreviewMode&&document.body&&(document.body.style.background="transparent",document.documentElement.style.background="transparent")}async function we(e,r,t,n,i,a,s){if(Sr){ar({productId:e,settings:r,reviewsData:t,productName:n,orderBy:i,page:a,badgeSettings:s});return}ir(!0),Ur(e),Wr(r),s!==void 0&&Kr(s),Xr(n),i&&Be(i),a&&Ie(a),t!=null&&$r(t);try{let wr=function(N,R){if(!(!N||!N.meta||!N.meta.sizeOverrides)){var B=N.meta.sizeOverrides[R];B&&Object.keys(B).forEach(function(Le){l.style.setProperty(Le,B[Le])})}};var hr=wr,o=fr(r.summaryLayout),d=!(o.meta&&o.meta.supports&&o.meta.supports.title===!1),c=r.showTitle!==!1,p=(r.title||"").trim()||"M\xFC\u015Fteri Yorumlar\u0131",m=d&&c?p:"",l=document.documentElement;qi(l,r),nt("#111111",pt+Lt()+It());var v=r.borderRadius!==void 0?r.borderRadius:8,f=_t[r.size]||_t.medium,k=Mt[r.thumbnailSize]||Mt.medium,u=er(r.reviewLayout);if(u.meta&&u.meta.sizeOverrides&&u.meta.sizeOverrides[r.size]){var h=u.meta.sizeOverrides[r.size],z=h["--ikr-list-photo-w"]||h["--ikr-gallery-photo-w"];z&&(k=parseInt(z))}l.style.setProperty("--ikr-title-size",f.titleSize+"px"),l.style.setProperty("--ikr-review-text-size",f.reviewTextSize+"px"),l.style.setProperty("--ikr-review-title-size",f.reviewTitleSize+"px"),l.style.setProperty("--ikr-author-size",f.authorSize+"px"),l.style.setProperty("--ikr-reply-name-size",f.replyNameSize+"px"),l.style.setProperty("--ikr-reply-text-size",f.replyTextSize+"px"),l.style.setProperty("--ikr-radius",v+"px"),l.style.setProperty("--ikr-radius-sm",Math.max(0,v-4)+"px"),l.style.setProperty("--ikr-photo-title-size",f.photoTitleSize+"px"),l.style.setProperty("--ikr-avg-rating-size",f.avgRatingSize+"px"),l.style.setProperty("--ikr-review-count-size",f.reviewCountSize+"px"),l.style.setProperty("--ikr-compact-count-size",f.compactCountSize+"px"),l.style.setProperty("--ikr-recommend-size",f.recommendSize+"px"),l.style.setProperty("--ikr-btn-text-size",f.btnTextSize+"px"),l.style.setProperty("--ikr-bar-label-size",f.barLabelSize+"px"),l.style.setProperty("--ikr-minimal-avg-size",f.minimalAvgSize+"px"),l.style.setProperty("--ikr-hero-avg-size",f.heroAvgSize+"px"),l.style.setProperty("--ikr-bar-count-size",f.barCountSize+"px"),l.style.setProperty("--ikr-review-date-size",f.reviewDateSize+"px"),l.style.setProperty("--ikr-filter-text-size",f.filterTextSize+"px"),l.style.setProperty("--ikr-load-more-size",f.loadMoreSize+"px"),l.style.setProperty("--ikr-read-more-size",f.readMoreSize+"px"),l.style.setProperty("--ikr-thumbnail-size",k+"px");var g=/^#[0-9A-Fa-f]{6}([0-9A-Fa-f]{2})?$/.test(r.reviewStarColor||"")?r.reviewStarColor:"#f59e0b";l.style.setProperty("--ikr-review-star-color",g),l.style.setProperty("--ikr-star-empty-color",g),l.style.setProperty("--ikr-star-size",f.reviewStarSize+"px"),l.style.setProperty("--ikr-avg-star-size",f.avgStarSize+"px"),wr(fr(r.summaryLayout),r.size),wr(er(r.reviewLayout),r.size);var w=Me(r),C=document.getElementById("ikas-reviews");if(!C){var b=document.getElementById("ikas-reviews-anchor");if(!b)return;C=document.createElement("div"),C.id="ikas-reviews",C.style.minHeight="200px",b.appendChild(C)}if(r.enabled===!1){C.style.minHeight="auto",C.innerHTML='<div style="padding: 40px 20px; margin-top: 24px; text-align: center; color: #6e6d7a; font-family: Inter, sans-serif; border: 1px dashed #e3e1e5; border-radius: '+(r.borderRadius!==void 0?r.borderRadius:8)+'px; background: #fafafa; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px;"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #6e6d7a; margin-bottom: 4px;"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg><div style="font-weight: 500; font-size: 18px; color: #1a191a; letter-spacing: -0.01em;">Widget \u015Fu anda Pasif durumda</div><div style="font-size: 16px; color: #6e6d7a; max-width: 380px; line-height: 1.5;">Canl\u0131 ma\u011Fazan\u0131zda m\xFC\u015Fterileriniz hi\xE7bir yorum alan\u0131 g\xF6rmeyecektir.</div></div>',ir(!1);var y=Ue;ar(null),y&&we(y.productId,y.settings,y.reviewsData,y.productName,y.orderBy,y.page,y.badgeSettings);return}C.innerHTML='<p class="ikr-state-msg ikr-state-loading">Yorumlar y\xFCkleniyor...</p>';try{var x=t||{},S=x.data&&x.data.reviews||[],E=x.data&&x.data.totalCount||0,A=C.cloneNode(!1);C.parentNode.replaceChild(A,C),C=A;var T=document.createElement("div");if(T.id="ikas-reviews-widget",typeof window!="undefined"&&window.__ikasPreviewMode&&(T.style.width="100%",T.style.maxWidth="100%",T.style.marginLeft="0",T.style.marginRight="0"),m){var _=document.createElement("div"),W=r.summaryLayout||"classic";_.className="ikr-title ikr-title-"+W,_.textContent=m,T.appendChild(_)}var K=x.data&&x.data.allCount||0,X=x.data&&x.data.ratingCounts||null,me=X||[0,0,0,0,0],ne=x.data&&x.data.avgRating||"0.0";if(!X&&S.length>0){S.forEach(function(N){N.rating>=1&&N.rating<=5&&me[N.rating-1]++});var oe=S.reduce(function(N,R){return N+R.rating},0);ne=(oe/S.length).toFixed(1)}if(K>0){var Z=fr(r.summaryLayout),H=Z.render({widget:T,data:x,settings:r,iconPair:w,allCount:K,ratingCounts:me,avgRatingVal:ne,currentRatingFilter:Ae,currentOrderBy:le,currentHasImages:Ne,onFilterChange:async function(N){tr(Ae===N?null:N),Ie(1);var R=await De(re,le,1,Ae,Ne);await we(re,L,R,ze,le,1)},onSortChange:async function(N,R){Ie(1),R?(Cr(!0),Be("newest")):(Cr(!1),Be(N));var B=await De(re,le,1,Ae,Ne);await we(re,L,B,ze,le,1)}});T.appendChild(H)}else{var V=document.createElement("button");V.className="ikr-write-btn",V.style.cssText="display:block;margin:16px auto 0;",V.textContent=r.writeButtonText||"Yorum Yap",V.onclick=j,T.appendChild(V)}var Ee=(zr||[]).filter(function(N){return ge(N).length>0});if(r.showPhotoGallery!==!1&&!Ne&&Ee.length>0){var q=document.createElement("div");if(q.className="ikr-photo-section",r.showPhotoGalleryTitle!==!1){var Ye=(r.photoGalleryTitle||"").trim()||"Foto\u011Frafl\u0131 Yorumlar",ye=document.createElement("div");ye.className="ikr-photo-title",ye.textContent=Ye,q.appendChild(ye)}var Te=r.reviewLayout==="card"?"1/1":"3/4";l.style.setProperty("--ikr-photo-thumb-aspect",Te);var O=document.createElement("div");O.className="ikr-photo-strip";var $=U,Ge=r.reviewLayout==="card"?U:Math.round(U*4/3),J=0;Ee.forEach(function(N){if(!(J>=15)){var R=sr(N);if(R){var B=document.createElement("img"),Le=de(R,U);B.src=Le.src,B.srcset=Le.srcset,B.loading=J<3?"eager":"lazy",B.decoding="async",B.width=$,B.height=Ge,B.className="ikr-photo-strip-thumb",B.alt="Yorum foto\u011Fraf\u0131",(function(Jt,Qt){B.onclick=function(){ce(Qt,Jt,Ee)}})(R,N),O.appendChild(B),J++}}});var ue=document.createElement("button");ue.className="ikr-photo-strip-arrow ikr-photo-strip-arrow-prev",ue.innerHTML="&#8249;",ue.setAttribute("aria-label","\xD6nceki"),ue.onclick=function(){O.scrollBy({left:-200,behavior:"smooth"})};var fe=document.createElement("button");fe.className="ikr-photo-strip-arrow ikr-photo-strip-arrow-next",fe.innerHTML="&#8250;",fe.setAttribute("aria-label","Sonraki"),fe.onclick=function(){O.scrollBy({left:200,behavior:"smooth"})};var Q=document.createElement("div");Q.className="ikr-photo-strip-wrap",Q.appendChild(ue),Q.appendChild(O),Q.appendChild(fe),q.appendChild(Q),T.appendChild(q)}if(S.length===0){var be=document.createElement("p");be.className="ikr-state-msg",be.textContent="Hen\xFCz yorum yok.",T.appendChild(be)}else{var u=er(r.reviewLayout);S.forEach(function(R){T.appendChild(u.render(R,S))})}var Ze=x.data&&x.data.hasMore;if(Ze){var M=document.createElement("button");M.className="ikr-load-more",M.textContent="Daha Fazla G\xF6ster",M.onclick=async function(){M.disabled=!0,M.textContent="Y\xFCkleniyor...";var N=Ve+1,R=await De(re,le,N,Ae,Ne);if(R&&R.data&&R.data.reviews){Ie(N);var B=er(L.reviewLayout);R.data.reviews.forEach(function(Le){T.insertBefore(B.render(Le,R.data.reviews),M)}),R.data.hasMore?(M.disabled=!1,M.textContent="Daha Fazla G\xF6ster"):M.remove()}else M.remove()},T.appendChild(M)}C.appendChild(T),ct(K>0?ne:null,E,n,br)}catch(N){console.error("[ikr] render error:",N),C.innerHTML='<p style="text-align:center;color:#dc2626;">Yorumlar y\xFCklenirken bir hata olu\u015Ftu.</p>'}}finally{if(ir(!1),Ue){var F=Ue;ar(null),we(F.productId,F.settings,F.reviewsData,F.productName,F.orderBy,F.page,F.badgeSettings)}}}var Yi=15,Se="ikr_settings_"+Y,Gi=300*1e3,Zi=30*1e3;async function jr(){if(window.__ikasPreviewMode){try{var e=window.__ikasPreviewBaseUrl||ee,r=window.__ikasPreviewSettings||sessionStorage.getItem("ikr_preview_settings")||"",t={};if(r)try{t=JSON.parse(r)}catch(p){}var n=await ie(e+"/api/preview/settings");if(n.ok){var i=await n.json();return Ce(i.imagePolicy&&i.imagePolicy.cloudName),i.widgets&&i.widgets.reviews&&Object.keys(t).length&&(i.widgets.reviews=Object.assign({},i.widgets.reviews,t)),i}}catch(p){}return null}var a=null,s=Xe(Se);if(s)try{var o=JSON.parse(s);if(o&&o.t!==void 0)if(o.notFound){if(Date.now()-o.t<Zi)return null;P(Se,"")}else if(o.v){if(Date.now()-o.t<Gi)return Ce(o.v.imagePolicy&&o.v.imagePolicy.cloudName),o.v;a=o.v,P(Se,"")}else P(Se,"");else P(Se,"")}catch(p){P(Se,"")}try{var d=await ie(ee+"/api/public/settings?publicApiKey="+encodeURIComponent(Y));if(!d.ok)return d.status===404&&P(Se,JSON.stringify({t:Date.now(),notFound:!0})),a&&Ce(a.imagePolicy&&a.imagePolicy.cloudName),a||null;var c=await d.json();return Ce(c.imagePolicy&&c.imagePolicy.cloudName),P(Se,JSON.stringify({t:Date.now(),v:c})),c}catch(p){return console.error("[ikr] fetchSettings error:",p),a&&Ce(a.imagePolicy&&a.imagePolicy.cloudName),a||null}}var Vi=60*1e3;async function De(e,r,t,n,i,a){if(window.__ikasPreviewMode){try{var s=window.__ikasPreviewBaseUrl||ee,o=s+"/api/preview/reviews?page="+encodeURIComponent(t||1),d=await ie(o);if(d.ok)return await d.json()}catch(h){}return null}r=r||"newest",t=t||1;var c=a?"_l"+a:"",p="ikr_reviews_"+Y+"_"+e+"_"+r+"_"+t+"_"+(n||"")+"_"+(i?"1":"0")+c,m=null,l=Xe(p);if(l)try{var v=JSON.parse(l);if(v&&v.t!==void 0&&v.v){if(Date.now()-v.t<Vi)return v.v;m=v.v,P(p,"")}else P(p,"")}catch(h){P(p,"")}try{var f=ee+"/api/public/reviews?storeId="+encodeURIComponent(Y)+"&productId="+encodeURIComponent(e)+"&orderBy="+encodeURIComponent(r)+"&page="+encodeURIComponent(t)+(n?"&rating="+encodeURIComponent(n):"")+(i?"&hasImages=true":"")+(a?"&limit="+encodeURIComponent(a):""),k=await ie(f);if(!k.ok)return m||null;var u=await k.json();return P(p,JSON.stringify({t:Date.now(),v:u})),u}catch(h){return console.error("[ikr] fetchReviews error:",h),m||null}}async function Ui(e){var r=await De(e,"newest",1,null,!0,Yi);return!r||!r.data||!Array.isArray(r.data.reviews)?[]:r.data.reviews}var Dr={};async function je(e,r){var t=document.getElementById("ikr-rating-badge");t&&t.remove();var n=document.getElementById("ikr-jsonld");if(n&&n.remove(),!Dr[e]){Dr[e]=!0;var i={title:"M\xFC\u015Fteri Yorumlar\u0131",enabled:!0},a={enabled:!0,icon:"star",size:"medium",color:"#f59e0b"};try{var s=await jr();if(!s)return;var o=s.widgets&&s.widgets.reviews||i,d=s.widgets&&s.widgets.badge||a;if(o.enabled===!1)return;Be("newest"),Ie(1),tr(null);var c=await Promise.all([De(e,"newest",1,null),Ui(e)]),p=c[0];Jr(c[1]),await we(e,o,p,r,"newest",1,d)}catch(m){console.error("[ikr] bootstrap error:",m),await we(e,i,null,r,void 0,void 0,a)}finally{delete Dr[e]}}}function qr(){try{var e=window.__NEXT_DATA__&&window.__NEXT_DATA__.props&&window.__NEXT_DATA__.props.pageProps;if(e&&e.pageType==="PRODUCT"&&e.pageSpecificData&&e.pageSpecificData.id)return{id:e.pageSpecificData.id,name:e.pageSpecificData.name||null}}catch(n){}if(window.IkasStorefront&&window.IkasStorefront.product&&window.IkasStorefront.product.id)return{id:window.IkasStorefront.product.id,name:window.IkasStorefront.product.name||null};var r=window.location.pathname.match(/--([a-f0-9-]{36})(?:\/|$|\?)/);if(r)return{id:r[1],name:null};var t=new URLSearchParams(window.location.search).get("productId");return t?{id:t,name:null}:null}function Rt(){var e={},r={};return document.querySelectorAll("a[href]").forEach(function(t){try{var n=t.getAttribute("href");if(!n||n.charAt(0)==="#"||n.charAt(0)==="?")return;var i=D(t.href);if(!i||r[i]||!/^[a-z0-9][a-z0-9-]{2,}$/.test(i)||lr.test(i))return;r[i]=!0,e[i]=null}catch(a){}}),Object.keys(We).forEach(function(t){e[t]=We[t]}),e}var Wi=300*1e3,Bt=50;async function Pt(e){var r="ikr_ratings_"+Y,t={},n=Xe(r);if(n)try{var i=JSON.parse(n);i&&i.t!==void 0&&Date.now()-i.t<Wi?t=i.v||{}:P(r,"")}catch(c){P(r,"")}var a=e.filter(function(c){return!t[c]});if(!a.length)return t;for(var s=[],o=0;o<a.length;o+=Bt)s.push(a.slice(o,o+Bt));var d=await Promise.all(s.map(function(c){var p=ee+"/api/public/ratings-by-slug?storeId="+encodeURIComponent(Y)+"&slugs="+c.map(encodeURIComponent).join(",");return ie(p).then(function(m){return m.ok?m.json().then(function(l){return l.data||{}}):{}}).catch(function(){return{}})}));return d.forEach(function(c){a.forEach(function(p){t[p]||(t[p]={average:0,count:0,_empty:!0})}),Object.keys(c).forEach(function(p){t[p]=c[p]})}),P(r,JSON.stringify({t:Date.now(),v:t})),t}var Ki="var(--ikr-badge-color,#f59e0b)",Ht=13,Xi="display:flex;align-items:center;gap:3px;margin-top:0px;margin-bottom:4px;font-size:13px;font-weight:400;color:#555;pointer-events:none;";function $i(e){var r=$e("star","classic"),t="width:"+Ht+"px;height:"+Ht+"px;";return'<span style="color:'+Ki+';display:inline-flex;align-items:center;">'+se(e,r,{sizeStyle:t})+"</span>"}function rr(e,r){var t=document.createElement("div");return t.setAttribute("data-ikr-listing-badge","1"),t.style.cssText=Xi+"justify-content:"+(r||"flex-start")+";",t.innerHTML=$i(e.avg)+'<span style="font-weight:400;">'+e.avg+" ("+e.count+")</span>",t}var Ot=".product-name",Ft=".add-to-basket-modal",Dt="h1.product-name",kr=".single-product-container-main",Yr=".single-product-product-name",jt=[".hero-image-banner-main",".hero-image-main",".home-slider-main",'[class*="hero-"]','[class*="banner-"]','[class*="slider-banner"]','[class*="marquee"]'].join(","),qt=[".category-products-main",".products-slider-main",".infinite-scroll-component",'[class*="product-list"]',".single-product-container-main",".product-block-container"].join(",");var Yt='[class*="productTitle"],[class*="productName"],[class*="product_title"],[class*="product_name"],[class*="product-title"],[class*="product-name"]',Ji=/^(tükendi|sold out|out of stock|stokta yok|satıldı|unavailable)$/i;function Gr(e,r){var t=e.querySelector(Ot);if(t)return t;if(e.matches&&e.matches(Yt))return e;var n=e.querySelector(Yt);if(n)return n;if(r){for(var i=e.querySelectorAll("*"),a=0;a<i.length;a++)if(i[a].children.length===0&&i[a].textContent.trim()===r)return i[a]}for(var s=e.querySelectorAll("p, h1, h2, h3, h4, h5, h6, span, div"),o=0;o<s.length;o++){var d=s[o],c=d.textContent.trim();if(!(!c||c.length<2||c.length>150)&&!/^[\d\s.,₺$€£%]+$/.test(c)&&!Ji.test(c)&&!(d.closest("figure")||d.closest("picture"))&&!(d.children.length>1))return d}return null}function Qi(e,r,t,n){if(!e.getAttribute("data-ikr-badge")){var i=D(e.href);if(e.id==="ikr-rating-badge"){e.setAttribute("data-ikr-badge","1");return}if(i===n&&e.getAttribute("href")&&e.getAttribute("href").charAt(0)==="#"){e.setAttribute("data-ikr-badge","1");return}if(e.closest("header")||e.closest("nav")){e.setAttribute("data-ikr-badge","1");return}if(e.closest('[class*="basket"]')||e.closest('[class*="cart"]')){e.setAttribute("data-ikr-badge","1");return}if(e.closest(kr)&&!e.closest(Yr)){e.setAttribute("data-ikr-badge","1");return}if(i===n&&e.closest(Yr)){e.setAttribute("data-ikr-badge","1");return}if(e.closest(jt)){e.setAttribute("data-ikr-badge","1");return}var a=!!e.querySelector("a[href]"),s=Array.from(e.childNodes).filter(function(f){return f.nodeType===3}).map(function(f){return f.textContent.trim()}).join("").trim(),o=!!Gr(e,t);if(!s&&!o&&!a){e.setAttribute("data-ikr-badge","1");return}if(e.setAttribute("data-ikr-badge","1"),a){e.querySelectorAll("a[href]").forEach(function(f){f.setAttribute("data-ikr-badge","1")});var d=Gr(e,t);if(!d||d.querySelector("[data-ikr-listing-badge]"))return;var c=window.getComputedStyle(d).textAlign;d.appendChild(rr(r,c==="center"?"center":c==="right"?"flex-end":"flex-start"));return}var p=Gr(e,t);if(!(p&&p.querySelector("[data-ikr-listing-badge]")))if(p){var m=window.getComputedStyle(p).textAlign;p.appendChild(rr(r,m==="center"?"center":m==="right"?"flex-end":"flex-start"))}else{var l=rr(r,"flex-start"),v=e.firstElementChild;v?e.insertBefore(l,v):e.appendChild(l)}}}function ea(e,r){var t=document.querySelector(Ft);if(t){var n=t.querySelector(Dt);if(!(!n||n.querySelector("[data-ikr-listing-badge]"))){var i=null;if(Ke&&r[Ke]&&(i=Ke),!i){var a=D(window.location.pathname);a&&r[a]&&(i=a)}if(!i){var s=n.textContent.trim();Object.keys(e).forEach(function(m){if(!i){var l=e[m];l&&l.trim()===s&&r[m]&&(i=m)}})}if(!i){var o=document.querySelector(kr);if(o){var d=o.querySelector("a[href]");if(d){var c=D(d.href);c&&r[c]&&(i=c)}}}if(!i){var p=n.textContent.trim().toLowerCase();document.querySelectorAll("a[href]").forEach(function(m){if(!i&&!(m.closest("header")||m.closest("nav"))&&!m.closest(kr)){var l=m.textContent.trim().toLowerCase();if(l&&l===p){var v=D(m.href);v&&r[v]&&(i=v)}}})}!i||!r[i]||r[i]._empty||r[i].count===0||n.appendChild(rr(r[i],"flex-start"))}}}function Gt(e,r){var t=D(window.location.pathname),n=document.querySelectorAll(qt),i=[];n.forEach(function(a){a.tagName==="A"&&a.href?i.push(a):a.querySelectorAll("a[href]").forEach(function(s){i.push(s)})}),Object.keys(e).forEach(function(a){var s=r[a];if(!(!s||s._empty||s.count===0)){var o=e[a];i.forEach(function(d){D(d.href)===a&&Qi(d,s,o,t)})}}),ea(e,r)}async function qe(){if(I.inProgress){I.queued=!0;return}if(!I.rendered){I.rendered=!0,I.inProgress=!0;try{var e=I.navCleanup;e&&(I.navCleanup=!1);var r=Rt();if(!Object.keys(r).length){I.rendered=!1;return}var t=await Promise.all([jr(),Pt(Object.keys(r))]),n=t[0];if(!n){I.rendered=!1;return}var i=t[1],a=n&&n.widgets||{},s=a.badge&&a.badge.color||"#f59e0b";if(a.badge&&a.badge.enabled===!1){I.rendered=!1;return}document.documentElement.style.setProperty("--ikr-badge-color",s),e&&(document.querySelectorAll("[data-ikr-listing-badge]").forEach(function(o){o.remove()}),document.querySelectorAll("[data-ikr-badge]").forEach(function(o){o.removeAttribute("data-ikr-badge")})),Gt(r,i)}finally{I.inProgress=!1,I.queued&&(I.queued=!1,I.rendered=!1,qe())}}}var Zt=!1,Vt=!1;function Kt(){Vt||(Vt=!0,document.addEventListener("click",function(e){var r=e.target.closest("a[href]");if(r&&!(r.closest("header")||r.closest("nav"))&&!(r.closest('[class*="basket"]')||r.closest('[class*="cart"]'))){var t=D(r.href);!t||t.length<3||Qr(t)}},!0))}var Ut=!1,Wt=typeof location!="undefined"?location.pathname:"";function gr(){try{if(location.pathname===Wt)return;Wt=location.pathname;var e=document.getElementById("ikr-rating-badge");e&&e.remove();var r=document.getElementById("ikr-jsonld");r&&r.remove()}catch(t){}}function ra(){if(!Ut){Ut=!0;var e=history.pushState,r=history.replaceState;history.pushState=function(){var t=e.apply(this,arguments);return gr(),t},history.replaceState=function(){var t=r.apply(this,arguments);return gr(),t},window.addEventListener("popstate",gr),window.addEventListener("hashchange",gr)}}function Zr(){if(ra(),window.IkasEvents){if(Zt)return;Zt=!0,window.IkasEvents.subscribe({id:"ikas-reviews-widget",callback:function(a){if(a&&a.type==="VIEW_LISTING"){var s=a.data&&a.data.productDetails;Array.isArray(s)&&s.forEach(function(p){p&&p.metaData&&p.metaData.slug&&p.name&&(We[p.metaData.slug]=p.name)})}if(a&&a.type==="PRODUCT_VIEW"){var o=a.data&&a.data.productDetail&&a.data.productDetail.id,d=a.data&&a.data.productDetail&&a.data.productDetail.name;o&&(P("ikr_reviews_"+Y+"_"+o,""),je(o,d))}if(a&&a.type==="PAGE_VIEW"){var c=Date.now();if(I.lastPageView&&c-I.lastPageView<800)return;I.lastPageView=c,I.navCleanup=!0,I.rendered=!1,qe()}}});var e=qr();if(e)je(e.id,e.name);else{let a=function(){var s=qr();s?je(s.id,s.name):r<20&&(r++,setTimeout(a,100))};var n=a,r=0;setTimeout(a,100)}setTimeout(function(){I.rendered||qe()},2e3)}else{let a=function(){window.IkasEvents?Zr():t<100&&(t++,setTimeout(a,50))};var i=a,t=0;setTimeout(a,50)}}var Xt=null;function $t(){if(typeof MutationObserver!="undefined"){var e=new MutationObserver(function(r){var t=r.some(function(n){return Array.from(n.addedNodes).some(function(i){return!(i.nodeType!==1||i.hasAttribute&&(i.hasAttribute("data-ikr-listing-badge")||i.id==="ikr-rating-badge"||i.id==="ikr-reviews-widget")||i.closest&&(i.closest("[data-ikr-listing-badge]")||i.closest("#ikr-rating-badge")||i.closest("#ikr-reviews-widget"))||i.querySelector&&i.querySelector("[data-ikr-listing-badge],#ikr-reviews-widget,#ikr-rating-badge"))})});t&&(clearTimeout(Xt),Xt=setTimeout(function(){var n=Array.from(document.querySelectorAll("a[href]")).some(function(i){if(i.getAttribute("data-ikr-badge"))return!1;var a=D(i.href);return a&&a.length>=3&&!lr.test(a)});n&&(I.rendered=!1,qe())},300))});e.observe(document.body,{childList:!0,subtree:!0})}}var ta=window.__ikasPreviewMode===!0;if(ta){let e=function(){try{window.parent.postMessage({type:"IKR_WIDGET_READY"},"*")}catch(t){}},r=function(){je("mock-product","\xD6rnek \xDCr\xFCn"),e()};ia=e,aa=r,window.addEventListener("message",function(t){var n=t.data;if(!(!n||n.type!=="IKR_SETTINGS_UPDATE")){var i=n.settings;if(!(!i||!L)){var a=Object.assign({},L,i);we(re,a,xr,ze,le,Ve),window.dispatchEvent(new CustomEvent("IKR_SETTINGS_UPDATED_PREVIEW"))}}}),document.readyState==="loading"?document.addEventListener("DOMContentLoaded",r):r()}else if(Y){let e=function(){Zr(),Kt(),$t()};na=e,document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e):e()}var ia,aa,na;})();
