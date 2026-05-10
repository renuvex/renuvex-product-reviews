/* ikas Reviews Widget — built 2026-05-10T18:54:05.764Z | theme: default */
"use strict";(()=>{var Fi=Object.defineProperty;var ye=(e,r)=>{for(var i in r)Fi(e,i,{get:r[i],enumerable:!0})};var ji=typeof document!="undefined",Br=ji?document.currentScript||(function(){for(var e=document.getElementsByTagName("script"),r=e.length-1;r>=0;r--)if(e[r].src&&e[r].src.indexOf("/widget.js")!==-1)return e[r];return e[e.length-1]})():null,cr=Br?Br.src:"",Di=new URLSearchParams(cr.split("?")[1]||""),D=Di.get("publicApiKey"),re=cr?cr.split("?")[0].replace(/\/widget\.js$/,""):"";var de="newest",qe=1,Te=null,Le=!1,ie=null,L=null,pr=null,xe=null,mr=null;function _e(e){de=e}function Ae(e){qe=e}function Je(e){Te=e}function ur(e){Le=e}function _r(e){ie=e}function Rr(e){L=e}function Pr(e){pr=e}function Hr(e){xe=e}function Or(e){mr=e}var fr=!1,Ye=null;function $e(e){fr=e}function Qe(e){Ye=e}var M={rendered:!1,inProgress:!1,queued:!1,navCleanup:!1,lastPageView:0},Ge={},Ze=null;function Fr(e){Ze=e}var jr={};function Ve(e){try{return sessionStorage.getItem(e)}catch(r){return jr[e]||null}}function _(e,r){try{sessionStorage.setItem(e,r)}catch(i){jr[e]=r}}var Ne="0 -960 960 960",q="0 0 256 256",te={starFill:"m233-120 65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z",starOutline:"m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-355Z",starRounded:"M480-269 314-169q-11 7-23 6t-21-8q-9-7-14-17.5t-2-23.5l44-189-147-127q-10-9-12.5-20.5T140-571q4-11 12-18t22-9l194-17 75-178q5-12 15.5-18t21.5-6q11 0 21.5 6t15.5 18l75 178 194 17q14 2 22 9t12 18q4 11 1.5 22.5T809-528L662-401l44 189q3 13-2 23.5T690-171q-9 7-21 8t-23-6L480-269Z",starRoundedOutline:"m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143Zm126 18L314-169q-11 7-23 6t-21-8q-9-7-14-17.5t-2-23.5l44-189-147-127q-10-9-12.5-20.5T140-571q4-11 12-18t22-9l194-17 75-178q5-12 15.5-18t21.5-6q11 0 21.5 6t15.5 18l75 178 194 17q14 2 22 9t12 18q4 11 1.5 22.5T809-528L662-401l44 189q3 13-2 23.5T690-171q-9 7-21 8t-23-6L480-269Zm0-201Z",boxSquare:"M160-80h640q33 0 56.5-23.5T880-160v-640q0-33-23.5-56.5T800-880H160q-33 0-56.5 23.5T80-800v640q0 33 23.5 56.5T160-80Z",boxSquareOutline:"M200-200h560v-560H200v560Zm0 80q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Z",phLeafFill:"M223.45,40.07a8,8,0,0,0-7.52-7.52C139.8,28.08,78.82,51,52.82,94a87.09,87.09,0,0,0-12.76,49A101.72,101.72,0,0,0,46.7,175.2a4,4,0,0,0,6.61,1.43l85-86.3a8,8,0,0,1,11.32,11.32L56.74,195.94,42.55,210.13a8.2,8.2,0,0,0-.6,11.1,8,8,0,0,0,11.71.43l16.79-16.79c14.14,6.84,28.41,10.57,42.56,11.07q1.67.06,3.33.06A86.93,86.93,0,0,0,162,203.18C205,177.18,227.93,116.21,223.45,40.07Z",phLeafRegular:"M223.45,40.07a8,8,0,0,0-7.52-7.52C139.8,28.08,78.82,51,52.82,94a87.09,87.09,0,0,0-12.76,49c.57,15.92,5.21,32,13.79,47.85l-19.51,19.5a8,8,0,0,0,11.32,11.32l19.5-19.51C81,210.73,97.09,215.37,113,215.94q1.67.06,3.33.06A86.93,86.93,0,0,0,162,203.18C205,177.18,227.93,116.21,223.45,40.07ZM153.75,189.5c-22.75,13.78-49.68,14-76.71.77l88.63-88.62a8,8,0,0,0-11.32-11.32L65.73,179c-13.19-27-13-54,.77-76.71,22.09-36.47,74.6-56.44,141.31-54.06C210.2,114.89,190.22,167.41,153.75,189.5Z",phHeartFill:"M240,102c0,70-103.79,126.66-108.21,129a8,8,0,0,1-7.58,0C119.79,228.66,16,172,16,102A62.07,62.07,0,0,1,78,40c20.65,0,38.73,8.88,50,23.89C139.27,48.88,157.35,40,178,40A62.07,62.07,0,0,1,240,102Z",phHeartRegular:"M178,40c-20.65,0-38.73,8.88-50,23.89C116.73,48.88,98.65,40,78,40a62.07,62.07,0,0,0-62,62c0,70,103.79,126.66,108.21,129a8,8,0,0,0,7.58,0C136.21,228.66,240,172,240,102A62.07,62.07,0,0,0,178,40ZM128,214.8C109.74,204.16,32,155.69,32,102A46.06,46.06,0,0,1,78,56c19.45,0,35.78,10.36,42.6,27a8,8,0,0,0,14.8,0c6.82-16.67,23.15-27,42.6-27a46.06,46.06,0,0,1,46,46C224,155.61,146.24,204.15,128,214.8Z",phCrownFill:"M239.75,90.81c0,.11,0,.21-.07.32L217,195a16,16,0,0,1-15.72,13H54.71A16,16,0,0,1,39,195L16.32,91.13c0-.11-.05-.21-.07-.32A16,16,0,0,1,44,77.39l33.67,36.29,35.8-80.29a1,1,0,0,0,0-.1,16,16,0,0,1,29.06,0,1,1,0,0,0,0,.1l35.8,80.29L212,77.39a16,16,0,0,1,27.71,13.42Z",phCrownRegular:"M230.9,73.6A15.85,15.85,0,0,0,212,77.39l-33.67,36.29-35.8-80.29a1,1,0,0,1,0-.1,16,16,0,0,0-29.06,0,1,1,0,0,1,0,.1l-35.8,80.29L44,77.39A16,16,0,0,0,16.25,90.81c0,.11,0,.21.07.32L39,195a16,16,0,0,0,15.72,13H201.29A16,16,0,0,0,217,195L239.68,91.13c0-.11,0-.21.07-.32A15.85,15.85,0,0,0,230.9,73.6ZM201.35,191.68l-.06.32H54.71l-.06-.32L32,88l.14.16,42,45.24a8,8,0,0,0,13.18-2.18L128,40l40.69,91.25a8,8,0,0,0,13.18,2.18l42-45.24L224,88Z",phLeafBold:"M227.42,39.86a12,12,0,0,0-11.28-11.28c-39.6-2.33-74.59,2.34-104,13.87C84,53.48,62.31,70.58,49.39,91.9c-17.62,29.11-17.66,64.45-.45,98.19L31.51,207.52a12,12,0,0,0,17,17l17.43-17.43c16.74,8.54,33.88,12.85,50.45,12.85a91.31,91.31,0,0,0,47.74-13.3c21.32-12.92,38.42-34.62,49.45-62.75C225.08,114.46,229.75,79.46,227.42,39.86ZM151.66,186.08C131.57,198.25,108,199.17,83.94,189l84.54-84.54a12,12,0,1,0-17-17L67,172.06c-10.14-24-9.22-47.63,3-67.72,20.91-34.53,70.54-53.72,134-52.25C205.38,115.53,186.19,165.17,151.66,186.08Z",phDiamondFill:"M246,98.73l-56-64A8,8,0,0,0,184,32H72a8,8,0,0,0-6,2.73l-56,64a8,8,0,0,0,.17,10.73l112,120a8,8,0,0,0,11.7,0l112-120A8,8,0,0,0,246,98.73ZM222.37,96H180L144,48h36.37ZM75.63,48H112L76,96H33.63Z"};function er(e){return'<svg viewBox="'+Ne+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="'+e+'"/></svg>'}var Dr={star:{label:"Y\u0131ld\u0131z",styles:{rounded:{label:"Tombul (Google)",filled:'<svg viewBox="'+Ne+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g transform="translate(-48, 48) scale(1.1)"><path d="'+te.starRounded+'"/></g></svg>',empty:'<svg viewBox="'+Ne+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g transform="translate(-48, 48) scale(1.1)"><path d="'+te.starRoundedOutline+'"/></g></svg>'},classic:{label:"Klasik (Google)",filled:'<svg viewBox="'+Ne+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g transform="translate(-48, 48) scale(1.1)"><path d="'+te.starFill+'"/></g></svg>',empty:'<svg viewBox="'+Ne+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g transform="translate(-48, 48) scale(1.1)"><path d="'+te.starOutline+'"/></g></svg>'},boxed:{label:"Kare (Google)",filled:'<svg viewBox="'+Ne+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="'+te.boxSquare+'"/><g transform="translate(120, -120) scale(0.75)" fill="white"><path d="'+te.starFill+'"/></g></svg>',empty:'<svg viewBox="'+Ne+'" fill="currentColor" opacity="0.35" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="'+te.boxSquare+'"/><g transform="translate(120, -120) scale(0.75)" fill="white"><path d="'+te.starFill+'"/></g></svg>'}}},favorite:{label:"Kalp",styles:{modern:{label:"Modern (Phosphor)",filled:'<svg viewBox="'+q+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="'+te.phHeartFill+'"/></svg>',empty:'<svg viewBox="'+q+'" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M128,224S24,168,24,102A54,54,0,0,1,78,48c22.59,0,41.94,12.31,50,32,8.06-19.69,27.41-32,50-32a54,54,0,0,1,54,54C232,168,128,224,128,224Z"/></svg>'}}},leaf:{label:"Yaprak",styles:{phosphor:{label:"Modern (Phosphor)",filled:'<svg viewBox="'+q+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="'+te.phLeafFill+'"/></svg>',empty:'<svg viewBox="'+q+'" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M63.81,192.19c-47.89-79.81,16-159.62,151.64-151.64C223.43,176.23,143.62,240.08,63.81,192.19Z"/><line x1="160" y1="96" x2="40" y2="216"/></svg>'}}},crown:{label:"Ta\xE7",styles:{modern:{label:"Modern (Phosphor)",filled:'<svg viewBox="'+q+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="'+te.phCrownFill+'"/></svg>',empty:'<svg viewBox="'+q+'" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M54.71,200H201.29a8,8,0,0,0,7.88-6.61l22.7-104A8,8,0,0,0,218,82.76L176,128,135.26,36.65a8,8,0,0,0-14.52,0L80,128,38,82.76a8,8,0,0,0-13.9,6.66l22.7,104A8,8,0,0,0,54.71,200Z"/></svg>'}}},diamond:{label:"Elmas",styles:{sketch:{label:"M\xFCcevher (Sketch)",filled:'<svg viewBox="'+q+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M246,98.73l-56-64A8,8,0,0,0,184,32H72a8,8,0,0,0-6,2.73l-56,64a8,8,0,0,0,.17,10.73l112,120a8,8,0,0,0,11.7,0l112-120A8,8,0,0,0,246,98.73ZM222.37,96H180L144,48h36.37ZM75.63,48H112L76,96H33.63Z"/></svg>',empty:'<svg viewBox="'+q+'" fill="none" stroke="currentColor" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M246,98.73l-56-64A8,8,0,0,0,184,32H72a8,8,0,0,0-6,2.73l-56,64a8,8,0,0,0,.17,10.73l112,120a8,8,0,0,0,11.7,0l112-120A8,8,0,0,0,246,98.73ZM222.37,96H180L144,48h36.37ZM75.63,48H112L76,96H33.63Z"/></svg>'}}},paw:{label:"Pati",styles:{phosphor:{label:"Modern (Phosphor)",filled:'<svg viewBox="'+q+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M240,108a28,28,0,1,1-28-28A28,28,0,0,1,240,108ZM72,108a28,28,0,1,0-28,28A28,28,0,0,0,72,108ZM92,88A28,28,0,1,0,64,60,28,28,0,0,0,92,88Zm72,0a28,28,0,1,0-28-28A28,28,0,0,0,164,88Zm23.12,60.86a35.3,35.3,0,0,1-16.87-21.14,44,44,0,0,0-84.5,0A35.25,35.25,0,0,1,69,148.82,40,40,0,0,0,88,224a39.48,39.48,0,0,0,15.52-3.13,64.09,64.09,0,0,1,48.87,0,40,40,0,0,0,34.73-72Z"/></svg>',empty:'<svg viewBox="'+q+'" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><circle cx="212" cy="108" r="20"/><circle cx="44" cy="108" r="20"/><circle cx="92" cy="60" r="20"/><circle cx="164" cy="60" r="20"/><path d="M128,104A36,36,0,0,0,93.43,130a43.49,43.49,0,0,1-20.67,25.9,32,32,0,0,0,27.73,57.62,72.49,72.49,0,0,1,55,0,32,32,0,0,0,27.73-57.62A43.46,43.46,0,0,1,162.57,130,36,36,0,0,0,128,104Z"/></svg>'}}},clover:{label:"Yonca",styles:{phosphor:{label:"Modern (Phosphor)",filled:'<svg viewBox="'+q+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M228,120c0,22.63-6,36.72-17.93,41.87a27.3,27.3,0,0,1-11,2.13,41.75,41.75,0,0,1-8.4-.93,4.05,4.05,0,0,1-2.52-1.64,368.49,368.49,0,0,0-47.75-55.26,8,8,0,0,0-11,11.62c14.84,13.91,64.13,63.49,78.32,120.27a8,8,0,0,1-5.82,9.7A8.13,8.13,0,0,1,200,248a8,8,0,0,1-7.75-6.06c-4.12-16.47-11.65-32.48-20.46-47.09a25.85,25.85,0,0,1-1.9,7.21C164.72,214,150.63,220,128,220s-36.72-6-41.88-17.94c-5.45-12.58-.39-30.82,15-54.21.68-1,1.36-2,2-3l-3,2C82.84,158.27,68.35,164,56.89,164a27.3,27.3,0,0,1-11-2.13C34,156.72,28,142.63,28,120s6-36.72,17.93-41.88c12.59-5.45,30.83-.39,54.22,15l3,2q-1-1.5-2-3c-15.41-23.39-20.47-41.63-15-54.22C91.28,26,105.37,20,128,20s36.72,6,41.88,17.93c5.45,12.59.39,30.83-15,54.22q-1,1.53-2,3l3-2c23.39-15.41,41.63-20.47,54.22-15C222,83.28,228,97.37,228,120Z"/></svg>',empty:'<svg viewBox="'+q+'" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M228,120c0,22.63-6,36.72-17.93,41.87a27.3,27.3,0,0,1-11,2.13,41.75,41.75,0,0,1-8.4-.93,4.05,4.05,0,0,1-2.52-1.64,368.49,368.49,0,0,0-47.75-55.26,8,8,0,0,0-11,11.62c14.84,13.91,64.13,63.49,78.32,120.27a8,8,0,0,1-5.82,9.7A8.13,8.13,0,0,1,200,248a8,8,0,0,1-7.75-6.06c-4.12-16.47-11.65-32.48-20.46-47.09a25.85,25.85,0,0,1-1.9,7.21C164.72,214,150.63,220,128,220s-36.72-6-41.88-17.94c-5.45-12.58-.39-30.82,15-54.21.68-1,1.36-2,2-3l-3,2C82.84,158.27,68.35,164,56.89,164a27.3,27.3,0,0,1-11-2.13C34,156.72,28,142.63,28,120s6-36.72,17.93-41.88c12.59-5.45,30.83-.39,54.22,15l3,2q-1-1.5-2-3c-15.41-23.39-20.47-41.63-15-54.22C91.28,26,105.37,20,128,20s36.72,6,41.88,17.93c5.45,12.59.39,30.83-15,54.22q-1,1.53-2,3l3-2c23.39-15.41,41.63-20.47,54.22-15C222,83.28,228,97.37,228,120Z"/></svg>'}}},coffee:{label:"Kahve",styles:{phosphor:{label:"Modern (Phosphor)",filled:'<svg viewBox="'+q+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M208,80H32a8,8,0,0,0-8,8v48a96.3,96.3,0,0,0,32.54,72H32a8,8,0,0,0,0,16H208a8,8,0,0,0,0-16H183.46a96.59,96.59,0,0,0,27-40.09A40,40,0,0,0,248,128v-8A40,40,0,0,0,208,80Zm24,48a24,24,0,0,1-17.2,23,95.78,95.78,0,0,0,1.2-15V97.38A24,24,0,0,1,232,120ZM112,56V24a8,8,0,0,1,16,0V56a8,8,0,0,1-16,0Zm32,0V24a8,8,0,0,1,16,0V56a8,8,0,0,1-16,0ZM80,56V24a8,8,0,0,1,16,0V56a8,8,0,0,1-16,0Z"/></svg>',empty:'<svg viewBox="'+q+'" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M83.3,216A88,88,0,0,1,32,136V88H208v48a88,88,0,0,1-51.3,80"/><line x1="32" y1="216" x2="208" y2="216"/><path d="M208,88h4a32,32,0,0,1,32,32v8a32,32,0,0,1-32,32h-7.38"/><line x1="80" y1="24" x2="80" y2="48"/><line x1="120" y1="24" x2="120" y2="48"/><line x1="160" y1="24" x2="160" y2="48"/></svg>'}}}};function qi(e){var r=String(e||"star"),i=r.indexOf(":");return i===-1?{type:r,style:null}:{type:r.slice(0,i),style:r.slice(i+1)}}function Ue(e,r){var i=Dr[e]||Dr.star,a=i.styles;return a[r]||a[Object.keys(a)[0]]}function Ie(e){var r=e&&e.reviewIcon||"star",i=qi(r),a=i.style||e&&e.reviewIconStyle||"classic";return Ue(i.type,a)}function Yr(e,r,i){for(var a=Math.round(parseFloat(e))||0,t=Ie(r),n=i&&i.sizePx,s=n?"width:"+n+"px;height:"+n+"px;":"",l="",d=1;d<=5;d++){var c=d<=a;l+='<span class="ikr-icon '+(c?"ikr-icon-filled":"ikr-icon-empty")+'" style="'+s+'">'+(c?t.filled:t.empty)+"</span>"}return l}var rr={lines:"M400-240v-80h160v80H400ZM240-440v-80h480v80H240ZM120-640v-80h720v80H120Z",linesAlt:"M440-160v-160h80v40h360v80H520v40h-80Zm-360-80v-80h280v80H80Zm200-160v-80H80v-80h200v-80h80v240h-80Zm160-80v-80h440v80H440Zm160-160v-160h80v40h120v80H680v40h-80Zm-520-80v-80h440v80H80Z",funnel:"M440-160q-17 0-28.5-11.5T400-200v-240L168-736q-15-20-4.5-42t36.5-22h560q26 0 36.5 22t-4.5 42L560-440v240q0 17-11.5 28.5T520-160h-80Z",dense:"M120-160v-80h720v80H120Zm0-160v-80h720v80H120Zm0-160v-80h720v80H120Zm0-160v-80h720v80H120Z"},qr={lines:{label:"\xC7izgili",svg:er(rr.lines)},linesAlt:{label:"\xC7izgili (Alt)",svg:er(rr.linesAlt)},funnel:{label:"Huni",svg:er(rr.funnel)},dense:{label:"Yo\u011Fun \xC7izgili",svg:er(rr.dense)}};function Gr(e){var r=qr[e]||qr.lines;return r.svg}var Yi="var(--ikr-review-star-color,#f59e0b)";var ir=/^(account|pages|blog|search|cart|checkout|siparis|odeme|kategori|category|urun|products?)/;function H(e){try{return new URL(e,window.location.origin).pathname.replace(/^\//,"").split("?")[0].split("/")[0]}catch(r){return""}}function ke(e,r){var i="color:"+Yi+";display:inline-flex;gap:2px;align-items:center;";return'<span class="ikr-stars" style="'+i+'">'+Yr(e,r)+"</span>"}function ce(e,r,i){for(var a=Math.max(0,Math.min(5,parseFloat(e)||0)),t=Math.floor(a),n=a-t,s=n<.25?t:n<.75?t+.5:t+1,l=i&&i.sizeStyle||"",d="",c=1;c<=5;c++){var m=c<=s?"full":c-.5===s?"half":"empty";m==="full"?d+='<span class="ikr-star ikr-star-full" style="'+l+'">'+r.filled+"</span>":m==="empty"?d+='<span class="ikr-star ikr-star-empty" style="'+l+'">'+r.empty+"</span>":d+='<span class="ikr-star ikr-star-half" style="'+l+'"><span class="ikr-star-half-bg">'+r.empty+'</span><span class="ikr-star-half-fg">'+r.filled+"</span></span>"}return'<span class="ikr-stars-partial">'+d+"</span>"}function ge(e){return e?new Date(e).toLocaleDateString("tr-TR",{year:"numeric",month:"long",day:"numeric"}):""}function Zr(e,r){var i=document.getElementById("ikr-styles");i||(i=document.createElement("style"),i.id="ikr-styles",document.head.appendChild(i)),i.textContent=r}function K(e){return!e||e.indexOf("res.cloudinary.com")===-1?e:e.replace("/upload/","/upload/q_auto/f_auto/c_scale,w_1200/")}function ae(e,r,i){var a=new AbortController,t=setTimeout(function(){a.abort()},i||8e3);return fetch(e,Object.assign({},r,{signal:a.signal})).finally(function(){clearTimeout(t)})}function Gi(e){return!!e&&(e.indexOf("https://")===0||e.indexOf("data:image/")===0)}function Re(e){return e.images&&Array.isArray(e.images)?e.images.filter(Gi):[]}function Vr(e,r,i){document.body.style.overflow="",document.body.style.paddingRight="",document.removeEventListener("keydown",r),window.removeEventListener("popstate",i),e.parentNode&&e.parentNode.removeChild(e)}function Zi(e){var r=document.createElement("div");r.className="ikr-modal-right";var i=document.createElement("div");i.className="ikr-modal-scroll-content";var a=document.createElement("div");a.className="ikr-modal-top-row";var t=document.createElement("div");t.className="ikr-modal-stars",t.innerHTML=ke(e.rating,L);var n=document.createElement("span");n.className="ikr-modal-date",n.textContent=ge(e.createdAt),a.appendChild(t),a.appendChild(n),i.appendChild(a);var s=document.createElement("div");s.className="ikr-modal-title",s.textContent=e.title||"",s.style.display=e.title?"":"none",i.appendChild(s);var l=document.createElement("div");l.className="ikr-modal-author",l.textContent=e.author||"",i.appendChild(l);var d=document.createElement("div");d.className="ikr-modal-body",d.textContent=(e.comment||"").trim(),d.style.display=e.comment&&e.comment.trim()?"":"none",i.appendChild(d);var c=document.createElement("div");c.className="ikr-modal-reply";var m=document.createElement("div");m.className="ikr-modal-reply-label",m.textContent="Ma\u011Faza Sahibi";var p=document.createElement("div");return p.className="ikr-modal-reply-text",p.textContent=e.merchantReply||"",c.appendChild(m),c.appendChild(p),c.style.display=e.merchantReply?"":"none",i.appendChild(c),r.appendChild(i),r}function Vi(e,r){var i=e.querySelector(".ikr-modal-scroll-content");i.querySelector(".ikr-modal-stars").innerHTML=ke(r.rating,L),i.querySelector(".ikr-modal-date").textContent=ge(r.createdAt);var a=i.querySelector(".ikr-modal-title");a.textContent=r.title||"",a.style.display=r.title?"":"none",i.querySelector(".ikr-modal-author").textContent=r.author||"";var t=i.querySelector(".ikr-modal-body");t.textContent=(r.comment||"").trim(),t.style.display=r.comment&&r.comment.trim()?"":"none";var n=i.querySelector(".ikr-modal-reply");n.querySelector(".ikr-modal-reply-text").textContent=r.merchantReply||"",n.style.display=r.merchantReply?"":"none",e.scrollTop=0}function vr(e,r,i,a,t,n,s,l){var d=Re(e),c=Math.max(0,Math.min(i||0,d.length-1)),m=document.createElement("div");m.className="ikr-modal-left";var p=document.createElement("img"),o=s==="next"?"ikr-modal-img-enter-right":s==="prev"?"ikr-modal-img-enter-left":"";p.className="ikr-modal-main-img"+(o?" "+o:""),p.src=K(d[c]||""),p.alt="Yorum foto\u011Fraf\u0131",m.appendChild(p);var k=document.createElement("button");k.className="ikr-modal-close-mobile",k.textContent="\u2715",k.setAttribute("aria-label","Kapat"),k.onclick=function(x){x.stopPropagation(),n()},m.appendChild(k);var u=0;if(m.addEventListener("touchstart",function(x){u=x.touches[0].clientX},{passive:!0}),m.addEventListener("touchend",function(x){var S=u-x.changedTouches[0].clientX;if(!(Math.abs(S)<50)){if(S>0){if(z)he(e,r,c+1,a,t,n,!0,"next",l);else if(g){var T=a[r+1];he(T,r+1,0,a,t,n,!1,"next",l)}}else if(v)he(e,r,c-1,a,t,n,!0,"prev",l);else if(C){var N=a[r-1],E=Re(N);he(N,r-1,E.length-1,a,t,n,!1,"prev",l)}}},{passive:!0}),d.length>1){var f=document.createElement("div");f.className="ikr-modal-thumbs",d.forEach(function(x,S){var T=document.createElement("img");T.src=K(x),T.className="ikr-modal-thumb"+(S===c?" ikr-modal-thumb-active":""),T.alt="K\xFC\xE7\xFCk resim "+(S+1),(function(N){T.onclick=function(){he(e,r,N,a,t,n,!0,null,l)}})(S),f.appendChild(T)}),m.appendChild(f)}var v=c>0,z=c<d.length-1,C=r>0,g=r<a.length-1,h=v||C,y=z||g;if(h){var b=document.createElement("button");b.className="ikr-modal-nav ikr-modal-nav-prev",b.innerHTML="&#8249;",b.setAttribute("aria-label","\xD6nceki"),b.onclick=function(x){if(x.stopPropagation(),v)he(e,r,c-1,a,t,n,!0,"prev",l);else if(C){var S=a[r-1],T=Re(S);he(S,r-1,T.length-1,a,t,n,!1,"prev",l)}},m.appendChild(b)}if(y){var w=document.createElement("button");w.className="ikr-modal-nav ikr-modal-nav-next",w.innerHTML="&#8250;",w.setAttribute("aria-label","Sonraki"),w.onclick=function(x){if(x.stopPropagation(),z)he(e,r,c+1,a,t,n,!0,"next",l);else if(g){var S=a[r+1];he(S,r+1,0,a,t,n,!1,"next",l)}},m.appendChild(w)}return m}function Ur(e,r){[-1,1].forEach(function(i){var a=r[e+i];if(a){var t=Re(a);t[0]&&(new Image().src=K(t[0]))}})}function he(e,r,i,a,t,n,s,l,d){if(s){var c=vr(e,r,i,a,t,n,l,d);t.firstChild&&t.replaceChild(c,t.firstChild)}else{var c=vr(e,r,i,a,t,n,l,d),m=t.querySelector(".ikr-modal-right");t.firstChild&&t.replaceChild(c,t.firstChild),m&&Vi(m,e);var p=d&&d.querySelector(".ikr-modal-wrap");p&&(p.scrollTop=0)}Ur(r,a)}function pe(e,r,i){var a=Re(e);if(!a.length)return;var t=(i||[]).filter(function(v){return Re(v).length>0}),n=t.findIndex(function(v){return v===e||v.id===e.id});n===-1&&(t.unshift(e),n=0);var s=a.indexOf(r);s<0&&(s=0);var l=document.createElement("div");l.className="ikr-modal-overlay";var d=document.createElement("div");d.className="ikr-modal";var c=!1;function m(){c||(c=!0,Vr(l,p,m))}function p(v){v.key==="Escape"&&o()}function o(){c||(c=!0,history.go(-1),Vr(l,p,m))}document.addEventListener("keydown",p);var k=window.innerWidth-document.documentElement.clientWidth;document.body.style.paddingRight=k+"px",document.body.style.overflow="hidden",history.pushState({ikrModal:!0},""),window.addEventListener("popstate",m),l.onclick=function(){o()},d.onclick=function(v){v.stopPropagation()},d.appendChild(vr(e,n,s,t,d,o,null,l)),d.appendChild(Zi(e)),Ur(n,t);var u=document.createElement("div");u.className="ikr-modal-wrap",u.appendChild(d);var f=document.createElement("button");f.className="ikr-modal-close",f.textContent="\u2715",f.setAttribute("aria-label","Kapat"),f.onclick=function(v){v.stopPropagation(),o()},u.appendChild(f),l.appendChild(u),document.body.appendChild(l)}function Kr(e){if(e)for(var r=document.querySelectorAll("h1,h2,h3,h4,h5,h6,div,span,p"),i=0;i<r.length;i++){var a=r[i];if(a.children.length===0&&a.textContent.trim()===e&&a.tagName!=="TITLE"&&!a.closest("[data-ikr-listing-badge]")&&!a.closest("#ikas-reviews")&&!a.closest("nav")&&!a.closest("header")&&!a.closest('[class*="breadcrumb"]')&&!a.closest('[aria-label*="breadcrumb"]'))return a}return document.querySelector("h1")}var Wr={small:{icon:14,text:"12px"},medium:{icon:16,text:"14px"},large:{icon:20,text:"16px"}};function Ui(e,r,i,a,t){var n=Ue(r,i),s="width:"+t+"px;height:"+t+"px;";return'<span style="color:'+a+';display:inline-flex;align-items:center;line-height:1;">'+ce(e,n,{sizeStyle:s})+"</span>"}function Xr(e,r,i,a){var t=document.getElementById("ikr-rating-badge");if(t&&t.remove(),!!e&&!(a&&a.enabled===!1)){var n=document.getElementById("ikr-jsonld");n&&n.remove();var s=document.createElement("script");s.id="ikr-jsonld",s.type="application/ld+json",s.textContent=JSON.stringify({"@context":"https://schema.org","@type":"Product",name:i||document.title,url:window.location.href,aggregateRating:{"@type":"AggregateRating",ratingValue:e,reviewCount:r,bestRating:"5",worstRating:"1"}}),document.head.appendChild(s);var l=Kr(i);if(!(!l||!l.parentNode)){var d=a&&a.icon||"star",c=a&&a.iconStyle||"classic",m=a&&a.size||"medium",p=a&&a.color||"#f59e0b",o=Wr[m]||Wr.medium,k=document.createElement("a");k.id="ikr-rating-badge",k.href="#ikas-reviews";var u=window.getComputedStyle(l).textAlign,f=u==="center"?"center":u==="right"?"flex-end":"flex-start";k.style.cssText="display:flex;align-items:center;gap:5px;text-decoration:none;margin-bottom:10px;cursor:pointer;font-weight:400;justify-content:"+f+";",k.innerHTML=Ui(e,d,c,p,o.icon)+'<span style="font-size:'+o.text+';font-weight:400;color:#555;">'+e+" ("+r+" yorum)</span>",k.onclick=function(v){v.preventDefault();var z=document.getElementById("ikas-reviews-widget")||document.getElementById("ikas-reviews");if(z){var C=document.querySelector("header"),g=C?C.getBoundingClientRect().height:0,h=z.getBoundingClientRect().top+window.pageYOffset-g-16;window.scrollTo({top:h,behavior:"smooth"})}},l.parentNode.insertBefore(k,l.nextSibling)}}}var Jr=`
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
`;var wr={};ye(wr,{meta:()=>tt,render:()=>at});function Pe(e){var r=e.ratingCounts,i=e.allCount,a=e.iconPair,t=e.currentRatingFilter,n=e.onFilterChange,s=document.createElement("div");s.className="ikr-summary-block ikr-summary-bars";for(var l=5;l>=1;l--){var d=r[l-1]||0,c=i>0?Math.round(d/i*100):0,m=t===l,p=document.createElement("div");p.className="ikr-bar-row"+(m?" ikr-bar-active":""),t&&!m&&(p.style.opacity="0.35");for(var o="",k=1;k<=5;k++){var u=k<=l;o+='<span class="ikr-bar-star ikr-icon '+(u?"ikr-bar-star-filled":"ikr-bar-star-empty")+'">'+(u?a.filled:a.empty)+"</span>"}p.innerHTML='<span class="ikr-bar-label">'+o+'</span><div class="ikr-bar-track"><div class="ikr-bar-fill" style="width:'+c+'%;"></div></div><span class="ikr-bar-count">('+d.toLocaleString("tr-TR")+")</span>",(function(f){p.onclick=function(){n(f)}})(l),s.appendChild(p)}return s}var me=[],$r=!1;function Ki(e){for(var r=me.length-1;r>=0;r--){var i=me[r];i.trigger&&i.trigger.contains(e.target)||i.element&&i.element.contains(e.target)||i.close()}}function Wi(e){if(e.key==="Escape")for(var r=me.length-1;r>=0;r--)me[r].close()}function Xi(){$r||typeof document=="undefined"||(document.addEventListener("click",Ki,!0),document.addEventListener("keydown",Wi),$r=!0)}function tr(e){for(var r=0;r<me.length;r++)me[r]!==e&&me[r].close()}function ar(e){Xi();var r={trigger:e.trigger,element:e.element,close:e.close};return me.push(r),function(){var a=me.indexOf(r);a!==-1&&me.splice(a,1)}}function ne(e){var r=e.widget,i=e.currentOrderBy,a=e.currentHasImages,t=e.onWriteClick,n=e.onSortChange,s=document.createElement("div");s.className="ikr-summary-block ikr-summary-actions";var l=document.createElement("button");l.className="ikr-write-btn",l.textContent=L&&L.writeButtonText||"Yorum Yap",l.onclick=t,s.appendChild(l);var d=document.createElement("div");d.className="ikr-filter-wrap";var c=document.createElement("button");c.className="ikr-filter-btn",c.setAttribute("aria-label","Filtrele");var m=L&&L.filterIcon||"lines";c.innerHTML=Gr(m);var p=document.createElement("div");p.className="ikr-filter-menu";var o=[["newest","En Yeni",!1],["highest","En Y\xFCksek Puan",!1],["lowest","En D\xFC\u015F\xFCk Puan",!1],["photos","Foto\u011Frafl\u0131",!0]];function k(){p.classList.remove("ikr-open"),c.classList.remove("ikr-filter-btn-active")}function u(){tr(f),p.classList.add("ikr-open"),c.classList.add("ikr-filter-btn-active")}o.forEach(function(v){var z=v[2],C=z?a:!a&&(i||"newest")===v[0],g=document.createElement("div");g.className="ikr-filter-item"+(C?" ikr-filter-item-active":""),g.textContent=v[1],g.onclick=function(){k(),n(v[0],z)},p.appendChild(g)}),c.onclick=function(){p.classList.contains("ikr-open")?k():u()};var f=ar({trigger:d,element:p,close:k});return d.appendChild(c),d.appendChild(p),s.appendChild(d),s}function Qr(e){var r=e&&e.onClose?e.onClose:function(){},i=e&&e.allowOutsideClose!==!1,a=document.createElement("div");a.className="ikr-fwizard-overlay",a.setAttribute("role","dialog"),a.setAttribute("aria-modal","true");var t=document.createElement("div");t.className="ikr-fwizard",a.appendChild(t);var n=document.createElement("button");n.className="ikr-fwizard-close",n.type="button",n.setAttribute("aria-label","Kapat"),n.innerHTML='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',t.appendChild(n);var s=document.createElement("div");s.className="ikr-fwizard-content",t.appendChild(s);var l=!1,d="",c="";function m(){var g=window.innerWidth-document.documentElement.clientWidth;d=document.body.style.overflow,c=document.body.style.paddingRight,document.body.style.overflow="hidden",g>0&&(document.body.style.paddingRight=g+"px")}function p(){document.body.style.overflow=d,document.body.style.paddingRight=c}function o(){l||(l=!0,document.removeEventListener("keydown",k),a.removeEventListener("click",u),n.removeEventListener("click",o),a.classList.remove("ikr-fwizard-open"),setTimeout(function(){a.parentNode&&a.parentNode.removeChild(a),p();try{r()}catch(g){}},200))}function k(g){g.key==="Escape"&&o()}function u(g){g.target===a&&i&&o()}document.addEventListener("keydown",k),a.addEventListener("click",u),n.addEventListener("click",o);function f(g){g&&s.appendChild(g),document.body.appendChild(a),m(),requestAnimationFrame(function(){a.classList.add("ikr-fwizard-open")})}var v=null,z=null;function C(g,h){if(h=h||"error",v){try{v.remove()}catch(y){}v=null}z&&(clearTimeout(z),z=null),v=document.createElement("div"),v.className="ikr-fwizard-toast ikr-fwizard-toast--"+h,v.textContent=g,t.appendChild(v),z=setTimeout(function(){v&&(v.classList.add("ikr-fwizard-toast--exit"),setTimeout(function(){if(v){try{v.remove()}catch(y){}v=null}},300))},4e3)}return{open:f,close:o,content:s,setAllowOutsideClose:function(g){i=!!g},setStepAttr:function(g){t.setAttribute("data-step",String(g))},showToast:C}}var ei=`
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
`;var kr=4;function He(e,r){if(!r)return!1;switch(e){case 1:return r.rating>0;case 2:return!0;case 3:return!!(r.comment&&r.comment.trim().length>0);case 4:return!!(r.author&&r.author.trim().length>0);default:return!0}}function ri(e){e=e||{};var r=[],i={currentStep:1,rating:0,title:"",comment:"",author:"",email:"",images:[],pendingImages:[],fingerprints:[],productId:e.productId||"",productName:e.productName||""};function a(){r.forEach(function(t){try{t(i)}catch(n){}})}return{get:function(){return i},set:function(t){Object.assign(i,t),a()},goNext:function(){i.currentStep<kr&&(i.currentStep+=1,a())},goBack:function(){i.currentStep>1&&(i.currentStep-=1,a())},onChange:function(t){return r.push(t),function(){r=r.filter(function(n){return n!==t})}}}}var Ji='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6"/></svg>';function ii(e){e=e||{};var r=e.skippableSteps||[],i=e.nextableSteps||[],a=e.onBack||function(){},t=e.onSkip||function(){},n=e.onNext||function(){},s=document.createElement("div");s.className="ikr-fwizard-footer";var l=document.createElement("button");l.type="button",l.className="ikr-fwizard-nav-btn ikr-fwizard-footer-back",l.setAttribute("aria-label","Geri"),l.innerHTML=Ji+"<span>Geri</span>",l.addEventListener("click",function(){a()}),s.appendChild(l);var d=document.createElement("div");d.className="ikr-fwizard-footer-progress";for(var c=[],m=0;m<kr;m++){var p=document.createElement("span");p.className="ikr-fwizard-progress-seg",d.appendChild(p),c.push(p)}s.appendChild(d);var o=document.createElement("button");o.type="button";var k=null;function u(v){k&&o.removeEventListener("click",k),k=v,v&&o.addEventListener("click",v)}s.appendChild(o);function f(v,z){var C=r.indexOf(v)!==-1,g=i.indexOf(v)!==-1,h=z&&(z.images&&z.images.length>0||z.pendingImages&&z.pendingImages.length>0);if(C)v===2&&h?(o.className="ikr-fwizard-cta-btn ikr-fwizard-footer-next",o.setAttribute("aria-label","Devam Et"),o.innerHTML="Devam Et",u(function(){n()})):(o.className="ikr-fwizard-nav-btn ikr-fwizard-footer-skip",o.setAttribute("aria-label","Atla"),o.innerHTML="<span>Atla</span>",u(function(){t()})),o.disabled=!1,o.classList.remove("ikr-fwizard-cta-btn--disabled"),o.style.visibility="",o.tabIndex=0;else if(g){o.className="ikr-fwizard-cta-btn ikr-fwizard-footer-next",o.setAttribute("aria-label","Sonraki"),o.innerHTML="Sonraki",o.style.visibility="",o.tabIndex=0;var y=He(v,z);o.disabled=!y,o.classList.toggle("ikr-fwizard-cta-btn--disabled",!y),u(function(){o.disabled||n()})}else o.className="ikr-fwizard-nav-btn ikr-fwizard-footer-skip",o.innerHTML="",o.style.visibility="hidden",o.tabIndex=-1,o.disabled=!0,u(null)}return{el:s,update:function(v,z){c.forEach(function(g,h){h+1<=v?g.classList.add("ikr-fwizard-progress-seg-active"):g.classList.remove("ikr-fwizard-progress-seg-active")});var C=v<=1;l.style.visibility=C?"hidden":"",l.style.pointerEvents=C?"none":"",l.tabIndex=C?-1:0,f(v,z)},setNextDisabled:function(v){o.classList.contains("ikr-fwizard-cta-btn")&&(o.disabled=!!v,o.classList.toggle("ikr-fwizard-cta-btn--disabled",!!v))},setThanksState:function(v){l.style.visibility="hidden",d.style.visibility="hidden",o.className="ikr-fwizard-cta-btn ikr-fwizard-footer-next",o.setAttribute("aria-label","Devam Et"),o.innerHTML="Devam Et",o.style.visibility="",o.disabled=!1,o.classList.remove("ikr-fwizard-cta-btn--disabled"),u(v)}}}function ti(e,r){r=r||{};var i=document.createElement("div");i.className="ikr-fwizard-step ikr-fwizard-step-rating";var a=!1,t=document.createElement("div");t.className="ikr-fwizard-step-title",t.textContent="Bu \xFCr\xFCn\xFC nas\u0131l de\u011Ferlendirirsiniz?",i.appendChild(t);var n=document.createElement("div");n.className="ikr-fwizard-stars",n.setAttribute("role","radiogroup"),n.setAttribute("aria-label","Y\u0131ld\u0131z puan\u0131");var s=Ie(L||{}),l=[];function d(p){l.forEach(function(o,k){var u=k<p;o.classList.toggle("ikr-fwizard-star-active",u),o.innerHTML=u?s.filled:s.empty})}for(var c=1;c<=5;c++)(function(p){var o=document.createElement("button");o.type="button",o.className="ikr-fwizard-star",o.setAttribute("role","radio"),o.setAttribute("aria-label",p+" y\u0131ld\u0131z"),o.innerHTML=s.empty,o.addEventListener("mouseenter",function(){d(p)}),o.addEventListener("mouseleave",function(){d(e.get().rating)}),o.addEventListener("click",function(){a||(a=!0,e.set({rating:p}),d(p),setTimeout(function(){var k=!r.canNavigate||r.canNavigate();k&&e.goNext()},400))}),l.push(o),n.appendChild(o)})(c);d(e.get().rating);var m=function(){s=Ie(L||{}),d(e.get().rating)};return window.addEventListener("IKR_SETTINGS_UPDATED_PREVIEW",m),i.appendChild(n),{el:i,destroy:function(){window.removeEventListener("IKR_SETTINGS_UPDATED_PREVIEW",m)}}}var gr=3,$i=10*1024*1024;function ai(e,r){r=r||{};var i=!1,a=document.createElement("div");a.className="ikr-fwizard-step ikr-fwizard-step-photos";var t=document.createElement("div");t.className="ikr-fwizard-step-title ikr-fwizard-step-title--lg",t.textContent="Foto\u011Frafl\u0131 de\u011Ferlendirme",a.appendChild(t);var n=document.createElement("div");n.className="ikr-fwizard-step-subtitle",n.textContent="Foto\u011Fraf ekleyebilirsiniz.",a.appendChild(n);var s=document.createElement("div");s.className="ikr-fwizard-photo-card";var l=document.createElement("label");l.className="ikr-fwizard-photo-add",l.setAttribute("aria-label","Foto\u011Fraf ekle"),l.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg><span>Foto\u011Fraf Ekle</span>';var d=document.createElement("input");d.type="file",d.accept="image/*",d.multiple=!0,d.style.display="none",l.appendChild(d),s.appendChild(l);var c=document.createElement("div");c.className="ikr-fwizard-photo-previews",c.setAttribute("aria-live","polite"),s.appendChild(c),a.appendChild(s);var m=r.blobMap||{},p=r.urlToFinger||{};function o(){if(!i){var g=e.get().images||[],h=e.get().pendingImages||[],y=g.map(function(b){return{url:b,isPending:!1}}).concat(h.map(function(b){return{url:b.url,file:b.file,isPending:!0,error:b.error}}));c.innerHTML="",y.forEach(function(b){var w=m[b.url]||b.url,x=k(b,w);c.appendChild(x)}),z()}}function k(g,h){var y=document.createElement("div");y.className="ikr-fwizard-photo-thumb",y.innerHTML='<img src="'+h+'" alt="" style="width:100%; height:100%; object-fit:cover; display:block; pointer-events:none; -webkit-user-drag:none; user-select:none;">';var b=document.createElement("div");b.className="ikr-fwizard-photo-loading",b.style.display="none",y.appendChild(b);var w=document.createElement("button");return w.type="button",w.className="ikr-fwizard-photo-remove",w.innerHTML="&#x2715;",y.appendChild(w),u(y,g,h),y}function u(g,h,y){var b=g.querySelector("img");b.src!==y&&(b.src=y);var w=g.querySelector(".ikr-fwizard-photo-loading");h.isPending&&h.error?(w.style.display="flex",w.innerHTML='<span class="ikr-upload-error">\u2717 '+h.error+"</span>"):w.style.display="none";var x=g.querySelector(".ikr-fwizard-photo-remove");x.onclick=function(){var S=p[h.url]||(h.file?h.file.name+"_"+h.file.size:null);if(h.url.startsWith("blob:")&&URL.revokeObjectURL(h.url),S){var T=(e.get().fingerprints||[]).filter(function(B){return B!==S});e.set({fingerprints:T})}if(h.isPending){var N=(e.get().pendingImages||[]).filter(function(B){return B.url!==h.url});e.set({pendingImages:N})}else{var E=(e.get().images||[]).filter(function(B){return B!==h.url});e.set({images:E})}}}var f='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>',v='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>';function z(){var g=(e.get().images||[]).length,h=(e.get().pendingImages||[]).length,y=g+h,b=y>=gr,w=h>0;y>0?(s.classList.add("ikr-fwizard-photo-card--compact"),l.innerHTML=v):(s.classList.remove("ikr-fwizard-photo-card--compact"),l.innerHTML=f+"<span>Foto\u011Fraf Ekle</span>"),b?(l.style.display="none",d.disabled=!0):(l.style.display="flex",d.disabled=w,l.classList.toggle("ikr-fwizard-photo-add--disabled",w),l.appendChild(d))}d.onchange=async function(g){var h=Array.from(g.target.files).slice(0,gr-(e.get().images||[]).length);d.value="";var y=(e.get().pendingImages||[]).length;if(!(y>0)){var b=e.get().images||[],w=b.length,x=gr-b.length;if(h.length!==0){for(var S=[],T=[],N=0;N<h.length;N++){var E=h[N],B=E.name+"_"+E.size,W=(e.get().fingerprints||[]).some(function(R){return R===B})||S.some(function(R){return R.file.name+"_"+R.file.size===B});if(W){console.log("[ikr] Duplicate file detected, skipping:",E.name);continue}if(E.size>$i){var X="10MB'dan daha b\xFCy\xFCk foto\u011Fraflar\u0131 y\xFCkleyemezsin.";r.showToast?r.showToast(X,"error"):alert(X);continue}var J=URL.createObjectURL(E);p[J]=B,S.push({url:J,file:E,error:null}),T.push({url:J,file:E});var ue=(e.get().fingerprints||[]).slice();ue.push(B),e.set({fingerprints:ue})}if(S.length!==0){var oe=(e.get().pendingImages||[]).concat(S),le=async function(){for(var R=0;R<T.length;R++){var G=T[R],Be=G.file,F=G.url;if(typeof window!="undefined"&&window.__ikasPreviewMode){var De=(e.get().pendingImages||[]).filter(function(Q){return Q.url!==F}),be=(e.get().images||[]).slice();be.push(F),e.set({pendingImages:De,images:be});continue}try{var Ce=await ae(re+"/api/public/upload/sign",{method:"POST"});if(!Ce.ok)throw Ce.status===429?new Error("rate_limit"):new Error("sign failed");var j=await Ce.json(),V=new FormData;V.append("file",Be),V.append("api_key",j.api_key),V.append("timestamp",j.timestamp),V.append("signature",j.signature),V.append("folder","review_images");var fe=await fetch("https://api.cloudinary.com/v1_1/"+j.cloud_name+"/image/upload",{method:"POST",body:V}),U=await fe.json();if(U.secure_url){var ve=(e.get().pendingImages||[]).some(function(Q){return Q.url===F});if(!ve){console.log("[ikr] Upload finished but image was already deleted by user. Aborting state update.");return}m[U.secure_url]=F,p[U.secure_url]=p[F];var Se=(e.get().pendingImages||[]).filter(function(Q){return Q.url!==F}),Ee=(e.get().images||[]).slice();Ee.push(U.secure_url),e.set({pendingImages:Se,images:Ee})}}catch(Q){console.error("[ikr] Image upload failed:",Q);var P=Q.message==="rate_limit"?"\xC7ok fazla deneme. Bekleyin.":"Y\xFCkleme ba\u015Far\u0131s\u0131z.";r.showToast&&r.showToast(P,"error");var $=(e.get().pendingImages||[]).map(function(ee){return ee.url===F?{url:ee.url,file:ee.file,error:P}:ee});e.set({pendingImages:$})}}};if(w===0){i=!0;var Y=!r.canNavigate||r.canNavigate();Y&&e.goNext()}e.set({pendingImages:oe}),le()}}}};var C=e.onChange(o);return o(),{el:a,destroy:function(){i=!0,d.onchange=null,C&&C()}}}var hr=2e3,Qi=60;function ni(e,r){r=r||{};var i=r.onValidityChange||function(){},a=document.createElement("div");a.className="ikr-fwizard-step ikr-fwizard-step-content";var t=document.createElement("div");t.className="ikr-fwizard-step-title ikr-fwizard-step-title--lg",t.textContent="Deneyiminizi anlat\u0131n",a.appendChild(t);var n=document.createElement("div");n.className="ikr-fwizard-content-form";var s=document.createElement("input");s.type="text",s.className="ikr-fwizard-input",s.placeholder="K\u0131sa bir ba\u015Fl\u0131k (opsiyonel)",s.maxLength=Qi,s.setAttribute("aria-label","Yorum ba\u015Fl\u0131\u011F\u0131"),s.value=e.get().title||"",s.addEventListener("input",function(){e.set({title:s.value})}),n.appendChild(s);var l=document.createElement("textarea");l.className="ikr-fwizard-textarea",l.placeholder="Deneyiminizi anlat\u0131n\u2026",l.maxLength=hr,l.rows=6,l.setAttribute("aria-label","Yorum"),l.value=e.get().comment||"",n.appendChild(l);var d=document.createElement("div");d.className="ikr-fwizard-char-counter",d.setAttribute("aria-live","polite"),n.appendChild(d);function c(){var p=l.value.length;d.textContent=p+"/"+hr,d.classList.toggle("ikr-fwizard-char-counter--max",p>=hr)}function m(){return He(3,e.get())}return l.addEventListener("input",function(){e.set({comment:l.value}),c(),i(m())}),a.appendChild(n),c(),setTimeout(function(){i(m())},0),{el:a,destroy:function(){}}}var et=40;function oi(e,r){r=r||{};var i=r.onValidityChange||function(){},a=r.onSuccess||function(){},t=document.createElement("div");t.className="ikr-fwizard-step ikr-fwizard-step-author";var n=document.createElement("div");n.className="ikr-fwizard-step-title ikr-fwizard-step-title--lg",n.textContent="Hakk\u0131n\u0131zda",t.appendChild(n);var s=document.createElement("div");s.className="ikr-fwizard-author-form";var l=document.createElement("div");l.className="ikr-fwizard-field";var d=document.createElement("label");d.className="ikr-fwizard-label",d.innerHTML='Ad\u0131n\u0131z <span class="ikr-fwizard-required" aria-hidden="true">*</span>';var c=document.createElement("input");c.type="text",c.className="ikr-fwizard-input",c.maxLength=et,c.setAttribute("aria-required","true"),c.value=e.get().author||"",l.appendChild(d),l.appendChild(c),s.appendChild(l);var m=document.createElement("div");m.className="ikr-fwizard-field";var p=document.createElement("label");p.className="ikr-fwizard-label",p.textContent="E-posta (opsiyonel)";var o=document.createElement("input");o.type="email",o.className="ikr-fwizard-input",o.setAttribute("autocomplete","email"),o.value=e.get().email||"",m.appendChild(p),m.appendChild(o),s.appendChild(m);var k=document.createElement("div");k.className="ikr-fwizard-notice",k.textContent="G\xF6nder'e t\u0131klayarak yorumumun \xFCr\xFCn sayfas\u0131nda herkese a\xE7\u0131k \u015Fekilde yay\u0131nlanaca\u011F\u0131n\u0131 kabul ediyorum.",s.appendChild(k);var u=document.createElement("div");u.className="ikr-fwizard-msg",u.setAttribute("role","alert"),u.setAttribute("aria-live","assertive"),s.appendChild(u);var f=document.createElement("button");f.type="button",f.className="ikr-fwizard-submit-btn",f.textContent="G\xF6nder",s.appendChild(f),t.appendChild(s);function v(){return He(4,e.get())}function z(){var g=!v(),h=(e.get().pendingImages||[]).length,y=h>0;y?(f.disabled=!0,f.classList.add("ikr-fwizard-submit-btn--disabled"),f.textContent="Foto\u011Fraflar Y\xFCkleniyor..."):(f.disabled=g,f.classList.toggle("ikr-fwizard-submit-btn--disabled",g),f.textContent="G\xF6nder")}c.addEventListener("input",function(){e.set({author:c.value}),z(),i(v())}),o.addEventListener("input",function(){e.set({email:o.value})}),z(),setTimeout(function(){i(v())},0),f.onclick=async function(){if(!f.disabled){var g=e.get(),h=(g.author||"").trim(),y=(g.comment||"").trim();if(o.value.trim()&&!o.checkValidity()){o.reportValidity();return}if(!h){u.innerHTML='<div class="ikr-fwizard-msg-error">Gerekli alan</div>';return}if(!g.rating){u.innerHTML='<div class="ikr-fwizard-msg-error">L\xFCtfen bir y\u0131ld\u0131z se\xE7in.</div>';return}f.disabled=!0,f.classList.add("ikr-fwizard-submit-btn--disabled");var b=f.textContent;if(f.textContent="G\xF6nderiliyor\u2026",u.innerHTML="",typeof window!="undefined"&&window.__ikasPreviewMode){setTimeout(function(){a()},600);return}try{var w=H(window.location.href),x=g.productName||(document.querySelector("h1")?document.querySelector("h1").innerText.trim():null),S=await ae(re+"/api/public/reviews",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({storeId:D,productId:g.productId||null,slug:w||null,productName:x,author:h,title:(g.title||"").trim()||null,comment:y||null,rating:g.rating,images:g.images||[]})},15e3);if(S.ok)a();else{var T=await S.json().catch(function(){return{}});throw new Error(T.error||"Yorum kaydedilemedi.")}}catch(B){var N=B&&(B.name==="AbortError"||/signal/i.test(B.message||"")),E=N?"Ba\u011Flant\u0131 yava\u015F, l\xFCtfen tekrar deneyin.":B.message||"Yorum g\xF6nderilemedi.";r.showToast?r.showToast(E,"error"):u.innerHTML='<div class="ikr-fwizard-msg-error">'+E+"</div>",f.disabled=!1,f.classList.remove("ikr-fwizard-submit-btn--disabled"),f.textContent=b}}};var C=e.onChange(z);return{el:t,destroy:function(){f.onclick=null,C&&C()}}}var li=!1;function rt(){if(!li){var e=document.createElement("style");e.setAttribute("data-ikr-fwizard",""),e.textContent=ei,document.head.appendChild(e),li=!0}}function it(e,r,i){if(i=i||{},e===1)return ti(r,{canNavigate:i.canNavigate});if(e===2)return ai(r,{canNavigate:i.canNavigate,blobMap:i.blobMap,urlToFinger:i.urlToFinger,showToast:i.showToast});if(e===3)return ni(r,{onValidityChange:i.onValidityChange});if(e===4)return oi(r,{onValidityChange:i.onValidityChange,onSuccess:i.onSuccess,showToast:i.showToast});var a=document.createElement("div");return a.className="ikr-fwizard-step ikr-fwizard-step-placeholder",{el:a,destroy:function(){}}}function si(){var e=document.createElement("div");return e.className="ikr-fwizard-step ikr-fwizard-step-thanks",e.innerHTML='<div class="ikr-fwizard-step-title ikr-fwizard-thanks-title">Te\u015Fekk\xFCrler</div><div class="ikr-fwizard-step-subtitle ikr-fwizard-thanks-subtitle">De\u011Ferlendirmeniz al\u0131nd\u0131.</div>',e}function di(e){e=e||{},rt();var r=ri({productId:e.productId,productName:e.productName}),i={},a={},t=Qr({onClose:function(){window.removeEventListener("popstate",s),window.history.state&&window.history.state.ikrReviewModal&&window.history.back(),Object.keys(i).forEach(function(b){var w=i[b];w&&w.startsWith("blob:")&&URL.revokeObjectURL(w)}),e.onClose&&e.onClose()},allowOutsideClose:!1}),n={ikrReviewModal:!0};window.history.pushState(n,null,"");var s=function(b){t&&t.close&&t.close()};window.addEventListener("popstate",s);var l=document.createElement("div");l.className="ikr-fwizard-step-wrap";var d=ii({skippableSteps:[2],nextableSteps:[3],onBack:function(){p==="idle"&&r.goBack()},onSkip:function(){p==="idle"&&r.goNext()},onNext:function(){p==="idle"&&r.goNext()}}),c=document.createElement("div");c.className="ikr-fwizard-layout",c.appendChild(l),c.appendChild(d.el);var m=null,p="idle",o=null,k=!0,u=null;function f(b,w){l.innerHTML="";var x=it(b,r,{canNavigate:function(){return p==="idle"},blobMap:i,urlToFinger:a,onValidityChange:function(N){d.setNextDisabled(!N)},onSuccess:z,showToast:t.showToast});if(m=x,d.update(b,r.get()),w){p="entering",x.el.classList.add("ikr-fwizard-step--enter");var S=null,T=function(){S&&clearTimeout(S),x.el.removeEventListener("animationend",T),x.el.classList.remove("ikr-fwizard-step--enter"),p="idle",o!==null&&C()};x.el.addEventListener("animationend",T),S=setTimeout(T,700)}else p="idle";l.appendChild(x.el),t.setStepAttr&&t.setStepAttr(b),b===3&&d.setNextDisabled(!0)}var v=!1;function z(){if(!v){if(v=!0,!m){l.innerHTML="";var b=si();b.classList.add("ikr-fwizard-step--enter"),l.appendChild(b),t.setStepAttr("thanks"),d.setThanksState(t.close);return}var w=m;p="exiting",w.el.classList.add("ikr-fwizard-step--exit");var x=function(){if(u&&clearTimeout(u),w.el.removeEventListener("animationend",x),w.destroy)try{w.destroy()}catch(T){}m===w&&(m=null),l.innerHTML="";var S=si();S.classList.add("ikr-fwizard-step--enter"),l.appendChild(S),t.setStepAttr("thanks"),d.setThanksState(t.close),p="idle"};w.el.addEventListener("animationend",x),u=setTimeout(x,300)}}function C(){var b=r.get().currentStep;if(p!=="idle"){o=b;return}if(!m){var w=!k;k=!1,f(b,w);return}var x=m;p="exiting",x.el.classList.add("ikr-fwizard-step--exit");var S=function(){if(u&&clearTimeout(u),x.el.removeEventListener("animationend",S),x.destroy)try{x.destroy()}catch(N){}if(m===x){l.innerHTML="",m=null;var T=o!==null?o:r.get().currentStep;o=null,f(T,!0),p="idle"}};x.el.addEventListener("animationend",S),u=setTimeout(S,350)}C();var g=r.get().currentStep,h=r.onChange(function(b){b.currentStep!==g?(g=b.currentStep,C()):d.update(b.currentStep,b)}),y=t.close;return t.close=function(){h&&h(),typeof u!="undefined"&&u&&clearTimeout(u),y()},t.open(c),{close:t.close}}function O(){di({productId:ie||"",productName:xe||""})}var tt={id:"classic",name:"Klasik (A\xE7\u0131k)"};function at(e){var r=e.widget,i=e.data,a=e.settings,t=e.iconPair,n=e.allCount,s=e.ratingCounts,l=e.avgRatingVal,d=e.currentRatingFilter,c=e.currentOrderBy,m=e.currentHasImages,p=e.onFilterChange,o=e.onSortChange,k=document.createElement("div");k.className="ikr-summary";var u=(s[3]||0)+(s[4]||0),f=n>0?Math.round(u/n*100):0,v=document.createElement("div");v.className="ikr-summary-block ikr-summary-avg",v.innerHTML='<span class="ikr-avg-star ikr-icon">'+t.filled+'</span><span class="ikr-avg-num">'+l+"</span>",k.appendChild(v);var z=document.createElement("div");if(z.className="ikr-summary-block ikr-summary-count",z.textContent=n.toLocaleString("tr-TR")+" Yorum",k.appendChild(z),a.showRecommendation!==!1&&f>0){var C=document.createElement("div");C.className="ikr-summary-block ikr-summary-recommend",C.innerHTML='<span class="ikr-recommend-pct">%'+f+"</span> bu \xFCr\xFCn\xFC tavsiye ediyor",k.appendChild(C)}return k.appendChild(Pe({ratingCounts:s,allCount:n,iconPair:t,currentRatingFilter:d,onFilterChange:p})),k.appendChild(ne({widget:r,currentOrderBy:c,currentHasImages:m,onWriteClick:O,onSortChange:o})),k}var br={};ye(br,{css:()=>ot,meta:()=>nt,render:()=>lt});var ci=`
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
`;var nt={id:"compact",name:"Kompakt (A\xE7\u0131l\u0131r)",sizeOverrides:{small:{"--ikr-compact-star-size":"20px"},medium:{"--ikr-compact-star-size":"24px"},large:{"--ikr-compact-star-size":"28px"}}},ot=ci;function lt(e){var r=e.widget,i=e.settings,a=e.iconPair,t=e.allCount,n=e.ratingCounts,s=e.avgRatingVal,l=e.currentRatingFilter,d=e.currentOrderBy,c=e.currentHasImages,m=e.onFilterChange,p=e.onSortChange,o=document.createElement("div");o.className="ikr-summary ikr-summary-compact";var k=document.createElement("div");k.className="ikr-compact-header";var u=document.createElement("div");u.className="ikr-compact-trigger-wrap";var f=document.createElement("button");f.className="ikr-compact-trigger",f.type="button",f.setAttribute("aria-expanded","false"),f.innerHTML='<span class="ikr-compact-trigger-stars">'+ce(s,a)+'</span><span class="ikr-compact-trigger-text">'+t.toLocaleString("tr-TR")+' Yorum</span><span class="ikr-compact-chevron"><svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M7.11 5.16L2.16 0.21L0.75 1.62L7.11 7.98L13.48 1.62L12.06 0.21L7.11 5.16Z" fill="currentColor"/></svg></span>',u.appendChild(f),k.appendChild(u);var v=ne({widget:r,currentOrderBy:d,currentHasImages:c,onWriteClick:O,onSortChange:p}),z=v.querySelector(".ikr-filter-wrap"),C=v.querySelector(".ikr-write-btn"),g=document.createElement("div");g.className="ikr-compact-actions-slot",C&&g.appendChild(C),z&&g.appendChild(z),k.appendChild(g),o.appendChild(k);var h=document.createElement("div");h.className="ikr-compact-panel",h.setAttribute("role","dialog"),h.setAttribute("aria-hidden","true");var y=document.createElement("div");y.className="ikr-compact-panel-inner";var b=document.createElement("div");b.className="ikr-compact-avg",b.innerHTML='<span class="ikr-icon">'+a.filled+"</span><span>"+s+"</span>",y.appendChild(b),y.appendChild(Pe({ratingCounts:n,allCount:t,iconPair:a,currentRatingFilter:l,onFilterChange:m})),h.appendChild(y);var w=typeof window!="undefined"&&window.matchMedia?window.matchMedia("(max-width:600px)"):null;function x(Y){var R=Y?o:u;h.parentNode!==R&&(h.classList.contains("ikr-open")&&(h.classList.remove("ikr-open"),h.setAttribute("aria-hidden","true"),f.setAttribute("aria-expanded","false")),R.appendChild(h))}if(x(w?w.matches:!1),w){var S=function(Y){x(Y.matches)};w.addEventListener?w.addEventListener("change",S):w.addListener&&w.addListener(S)}if(C){var T=document.createElement("button");T.className="ikr-write-btn",T.textContent=L&&L.writeButtonText||"Yorum Yap",T.onclick=O;var N=document.createElement("div");N.className="ikr-compact-write-row",N.appendChild(T),o.appendChild(N)}function E(){h.classList.remove("ikr-open"),h.setAttribute("aria-hidden","true"),f.setAttribute("aria-expanded","false")}function B(){tr(W),h.classList.add("ikr-open"),h.setAttribute("aria-hidden","false"),f.setAttribute("aria-expanded","true")}f.onclick=function(){h.classList.contains("ikr-open")?E():B()};var W=null;function X(Y){W&&(W(),W=null),Y||(W=ar({trigger:u,element:h,close:E}))}if(X(w?w.matches:!1),w){var J=function(Y){X(Y.matches)};w.addEventListener?w.addEventListener("change",J):w.addListener&&w.addListener(J)}if(i.showRecommendation!==!1){var ue=(n[3]||0)+(n[4]||0),oe=t>0?Math.round(ue/t*100):0;if(oe>0){var le=document.createElement("div");le.className="ikr-summary-block ikr-summary-recommend",le.style.marginTop="8px",le.innerHTML='<span class="ikr-recommend-pct">%'+oe+"</span> bu \xFCr\xFCn\xFC tavsiye ediyor",y.appendChild(le)}}return o}var yr={};ye(yr,{css:()=>dt,meta:()=>st,render:()=>ct});var pi=`
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
`;var st={id:"split",name:"Yatay B\xF6l\xFCnm\xFC\u015F"},dt=pi;function ct(e){var r=e.widget,i=e.settings,a=e.iconPair,t=e.allCount,n=e.ratingCounts,s=e.avgRatingVal,l=e.currentRatingFilter,d=e.currentOrderBy,c=e.currentHasImages,m=e.onFilterChange,p=e.onSortChange,o=document.createElement("div");o.className="ikr-summary ikr-summary-split";var k=document.createElement("div");k.className="ikr-split-col ikr-split-left";var u=document.createElement("div");u.className="ikr-summary-block ikr-summary-avg ikr-split-left-avg-block",u.innerHTML='<span class="ikr-avg-star ikr-icon">'+a.filled+'</span><span class="ikr-avg-num">'+s+"</span>",k.appendChild(u);var f=document.createElement("div");f.className="ikr-summary-block ikr-summary-count ikr-split-left-count",f.textContent=t.toLocaleString("tr-TR")+" Yorum",k.appendChild(f),o.appendChild(k);var v=document.createElement("div");v.className="ikr-split-col ikr-split-mid",v.appendChild(Pe({ratingCounts:n,allCount:t,iconPair:a,currentRatingFilter:l,onFilterChange:m})),o.appendChild(v);var z=ne({widget:r,currentOrderBy:d,currentHasImages:c,onWriteClick:O,onSortChange:p}),C=z.querySelector(".ikr-filter-wrap"),g=z.querySelector(".ikr-write-btn"),h=document.createElement("div");h.className="ikr-split-col ikr-split-right",g&&h.appendChild(g),C&&h.appendChild(C),o.appendChild(h);var y=(n[3]||0)+(n[4]||0),b=t>0?Math.round(y/t*100):0,w=document.createElement("div");w.className="ikr-summary-block ikr-summary-recommend",w.innerHTML='<span class="ikr-recommend-pct">%'+b+"</span> bu \xFCr\xFCn\xFC tavsiye ediyor";var x=i.showRecommendation===!1||b===0;return x&&w.classList.add("ikr-split-rec-hidden"),k.appendChild(w),o}var xr={};ye(xr,{css:()=>mt,meta:()=>pt,render:()=>ut});var mi=`
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
`;var pt={id:"minimal",name:"Minimal (Yal\u0131n)",supports:{recommendation:!1,barChart:!1}},mt=mi;function ut(e){var r=e.widget,i=e.iconPair,a=e.allCount,t=e.avgRatingVal,n=e.currentOrderBy,s=e.currentHasImages,l=e.onSortChange,d=document.createElement("div");d.className="ikr-summary ikr-summary-minimal";var c=document.createElement("div");c.className="ikr-minimal-info";var m=document.createElement("div");m.className="ikr-minimal-row";var p=document.createElement("span");p.className="ikr-minimal-avg",p.textContent=t,m.appendChild(p);var o=document.createElement("span");o.className="ikr-minimal-stars",o.innerHTML=ce(t,i),m.appendChild(o);var k=document.createElement("span");k.className="ikr-minimal-count",k.textContent=a.toLocaleString("tr-TR")+" Yorum",m.appendChild(k),c.appendChild(m),d.appendChild(c);var u=ne({widget:r,currentOrderBy:n,currentHasImages:s,onWriteClick:O,onSortChange:l}),f=u.querySelector(".ikr-filter-wrap"),v=u.querySelector(".ikr-write-btn"),z=document.createElement("div");if(z.className="ikr-minimal-actions",v&&z.appendChild(v),f&&z.appendChild(f),d.appendChild(z),v){var C=document.createElement("button");C.className="ikr-write-btn",C.textContent=L&&L.writeButtonText||"Yorum Yap",C.onclick=O;var g=document.createElement("div");g.className="ikr-minimal-write-row",g.appendChild(C),d.appendChild(g)}return d}var zr={};ye(zr,{css:()=>vt,meta:()=>ft,render:()=>kt});var ui=`
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
`;var ft={id:"hero",name:"Vurgulu (B\xFCy\xFCk Puan)",supports:{recommendation:!1,barChart:!1}},vt=ui;function kt(e){var r=e.widget,i=e.iconPair,a=e.allCount,t=e.avgRatingVal,n=e.currentOrderBy,s=e.currentHasImages,l=e.onSortChange,d=document.createElement("div");d.className="ikr-summary ikr-summary-hero";var c=document.createElement("div");c.className="ikr-hero-info";var m=document.createElement("div");m.className="ikr-hero-rating-col";var p=document.createElement("span");p.className="ikr-hero-avg",p.textContent=t,m.appendChild(p);var o=document.createElement("div");o.className="ikr-hero-meta-row";var k=document.createElement("span");k.className="ikr-hero-stars",k.innerHTML=ce(t,i),o.appendChild(k);var u=document.createElement("div");u.className="ikr-hero-count",u.textContent=a.toLocaleString("tr-TR")+" Yorum",o.appendChild(u),m.appendChild(o),c.appendChild(m),d.appendChild(c);var f=ne({widget:r,currentOrderBy:n,currentHasImages:s,onWriteClick:O,onSortChange:l}),v=f.querySelector(".ikr-filter-wrap"),z=f.querySelector(".ikr-write-btn"),C=document.createElement("div");C.className="ikr-hero-actions ikr-desktop-only",z&&C.appendChild(z),v&&C.appendChild(v),d.appendChild(C);var g=ne({widget:r,currentOrderBy:n,currentHasImages:s,onWriteClick:O,onSortChange:l}),h=g.querySelector(".ikr-filter-wrap"),y=g.querySelector(".ikr-write-btn"),b=document.createElement("div");return b.className="ikr-hero-write-row",y&&b.appendChild(y),h&&b.appendChild(h),d.appendChild(b),d}var nr={classic:wr,compact:br,split:yr,minimal:xr,hero:zr};function or(e){return nr[e]||nr.classic}function fi(){return Object.keys(nr).map(function(e){return nr[e].css||""}).join(`
`)}var Cr={};ye(Cr,{css:()=>ht,meta:()=>gt,render:()=>wt});function Oe(e,r){if(!e)return null;var i=document.createElement("div");i.className="ikr-reply";var a=document.createElement("div");a.className="ikr-reply-header";var t=document.createElement("span");t.className="ikr-reply-label",t.textContent="Ma\u011Faza Sahibi",a.appendChild(t),i.appendChild(a);var n=document.createElement("div");n.className="ikr-reply-text ikr-reply-text-clamped",n.textContent=e,i.appendChild(n);var s=document.createElement("span");return s.className="ikr-read-more ikr-reply-read-more",s.textContent="Devam\u0131n\u0131 oku",s.style.display="none",i.appendChild(s),requestAnimationFrame(function(){if(n.scrollHeight>n.clientHeight+2)if(s.style.display="inline",typeof r=="function")s.onclick=r;else{var l=!1;s.onclick=function(){l=!l,n.classList.toggle("ikr-reply-text-clamped",!l),s.textContent=l?"Daha az g\xF6ster":"Devam\u0131n\u0131 oku"}}}),i}var gt={id:"card",name:"Kart (Varsay\u0131lan)",sizeOverrides:{small:{"--ikr-card-photo-w":"80px"},medium:{"--ikr-card-photo-w":"110px"},large:{"--ikr-card-photo-w":"140px"}}},ht="";function wt(e,r){var i=document.createElement("div");i.className="ikr-review ikr-review-card";var a=document.createElement("div");a.className="ikr-review-top";var t=document.createElement("div");t.className="ikr-review-top-left";var n=document.createElement("span");n.className="ikr-review-stars",n.innerHTML=ke(e.rating,L),t.appendChild(n);var s=document.createElement("span");if(s.className="ikr-date",s.textContent=ge(e.createdAt),a.appendChild(t),a.appendChild(s),i.appendChild(a),e.title){var l=document.createElement("div");l.className="ikr-review-title",l.textContent=e.title,i.appendChild(l)}var d=document.createElement("div");d.className="ikr-author",d.textContent=e.author||"",i.appendChild(d);var c=(e.comment||"").trim();if(c){var m=document.createElement("div");m.className="ikr-body ikr-body-clamped",m.textContent=c,i.appendChild(m);var p=document.createElement("span");p.className="ikr-read-more",p.textContent="Devam\u0131n\u0131 oku",p.style.display="none",i.appendChild(p),requestAnimationFrame(function(){if(m.scrollHeight>m.clientHeight+2){p.style.display="inline";var u=!1;p.onclick=function(){u=!u,m.classList.toggle("ikr-body-clamped",!u),p.textContent=u?"Daha az g\xF6ster":"Devam\u0131n\u0131 oku"}}})}if(e.images&&Array.isArray(e.images)&&e.images.length){var o=document.createElement("div");o.className="ikr-gallery",e.images.forEach(function(u){if(!(!u||u.indexOf("https://")!==0&&u.indexOf("data:image/")!==0)){var f=document.createElement("img");f.src=K(u),f.className="ikr-img",f.setAttribute("data-ikr-img-url",u),(function(v){f.onclick=function(){pe(e,v,r)}})(u),o.appendChild(f)}}),i.appendChild(o)}var k=Oe(e.merchantReply);return k&&i.appendChild(k),i}var Sr={};ye(Sr,{css:()=>yt,meta:()=>bt,render:()=>xt});var vi=`
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
`;var bt={id:"list",name:"Liste",supports:{},sizeOverrides:{small:{"--ikr-list-photo-w":"80px","--ikr-list-photo-w-mobile":"80px"},medium:{"--ikr-list-photo-w":"110px","--ikr-list-photo-w-mobile":"100px"},large:{"--ikr-list-photo-w":"140px","--ikr-list-photo-w-mobile":"110px"}}},yt=vi;function xt(e,r){var i=!!(e.images&&Array.isArray(e.images)&&e.images.length),a=document.createElement("div");a.className="ikr-review-list"+(i?"":" ikr-review-list--no-media");var t=document.createElement("div");t.className="ikr-review-list-author";var n=document.createElement("span");n.className="ikr-review-stars ikr-review-list-author-stars",n.innerHTML=ke(e.rating,L),t.appendChild(n);var s=document.createElement("span");s.className="ikr-review-list-author-name",s.textContent=e.author||"",t.appendChild(s);var l=document.createElement("span");l.className="ikr-date ikr-review-list-author-date",l.textContent=ge(e.createdAt),t.appendChild(l),a.appendChild(t);var d=document.createElement("div");if(d.className="ikr-review-list-content",e.title){var c=document.createElement("div");c.className="ikr-review-list-title",c.textContent=e.title,d.appendChild(c)}var m=(e.comment||"").trim();if(m){var p=document.createElement("div");p.className="ikr-review-list-body ikr-body-clamped",p.textContent=m,d.appendChild(p);var o=document.createElement("span");o.className="ikr-read-more",o.textContent="Devam\u0131n\u0131 oku",o.style.display="none",d.appendChild(o),requestAnimationFrame(function(){if(p.scrollHeight>p.clientHeight+2){o.style.display="inline";var f=!1;o.onclick=function(){f=!f,p.classList.toggle("ikr-body-clamped",!f),o.textContent=f?"Daha az g\xF6ster":"Devam\u0131n\u0131 oku"}}})}var k=Oe(e.merchantReply);if(k&&d.appendChild(k),a.appendChild(d),i){var u=document.createElement("div");u.className="ikr-review-list-media",e.images.forEach(function(f){if(!(!f||f.indexOf("https://")!==0&&f.indexOf("data:image/")!==0)){var v=document.createElement("img");v.src=K(f),v.setAttribute("data-ikr-img-url",f),(function(z){v.onclick=function(){pe(e,z,r)}})(f),u.appendChild(v)}}),a.appendChild(u)}return a}var Er={};ye(Er,{css:()=>Ct,meta:()=>zt,render:()=>Tt});var ki=`
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
`;var zt={id:"gallery",name:"Galeri",supports:{},sizeOverrides:{small:{"--ikr-gallery-photo-w":"80px","--ikr-gallery-photo-w-mobile":"80px"},medium:{"--ikr-gallery-photo-w":"110px","--ikr-gallery-photo-w-mobile":"100px"},large:{"--ikr-gallery-photo-w":"140px","--ikr-gallery-photo-w-mobile":"110px"}}},Ct=ki;function St(e){return!!e&&(e.indexOf("https://")===0||e.indexOf("data:image/")===0)}function Et(e){if(!e.images||!Array.isArray(e.images))return null;for(var r=0;r<e.images.length;r++)if(St(e.images[r]))return e.images[r];return null}function Tt(e,r){var i=Et(e),a=!!i,t=document.createElement("div");t.className="ikr-review-gallery"+(a?"":" ikr-review-gallery--no-media");var n=document.createElement("div");n.className="ikr-review-gallery-content";var s=document.createElement("span");if(s.className="ikr-review-stars ikr-review-gallery-stars",s.innerHTML=ke(e.rating,L),n.appendChild(s),e.title){var l=document.createElement("div");l.className="ikr-review-gallery-title",l.textContent=e.title,n.appendChild(l)}var d=document.createElement("div");d.className="ikr-review-gallery-author",d.textContent=e.author||"",n.appendChild(d);var c=document.createElement("div");c.className="ikr-review-gallery-date",c.textContent=ge(e.createdAt),n.appendChild(c);var m=(e.comment||"").trim();if(m){var p=document.createElement("div");p.className="ikr-review-gallery-body ikr-body-clamped",p.textContent=m,n.appendChild(p);var o=document.createElement("span");o.className="ikr-read-more",o.textContent="Devam\u0131n\u0131 oku",o.style.display="none",o.style.cursor="pointer";var k=!1;o.onclick=function(){if(i){pe(e,i,r);return}k=!k,p.classList.toggle("ikr-body-clamped",!k),o.textContent=k?"Daha az g\xF6ster":"Devam\u0131n\u0131 oku"},n.appendChild(o),requestAnimationFrame(function(){p.scrollHeight>p.clientHeight+2&&(o.style.display="inline")})}if(t.appendChild(n),a){var u=document.createElement("div");u.className="ikr-review-gallery-media";var f=document.createElement("img");f.src=K(i),f.loading="lazy",f.setAttribute("data-ikr-img-url",i),f.onclick=function(){pe(e,i,r)},u.appendChild(f),t.appendChild(u)}var v=Oe(e.merchantReply,i?function(){pe(e,i,r)}:null);return v&&(v.classList.add("ikr-review-gallery-reply"),t.appendChild(v)),t}var lr={card:Cr,list:Sr,gallery:Er};function Ke(e){return lr[e]||lr.card}function gi(){return Object.keys(lr).map(function(e){return lr[e].css||""}).join(`
`)}function Me(e,r){var i=/^#([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})?$/.exec(e);if(!i)return"rgba(0,0,0,"+r+")";var a=parseInt(i[1],16),t=parseInt(i[2],16),n=parseInt(i[3],16);return"rgba("+a+","+t+","+n+","+r+")"}var hi={small:{titleSize:20,reviewTextSize:12,reviewTitleSize:14,authorSize:12,replyNameSize:12,replyTextSize:12,photoTitleSize:14,avgRatingSize:36,avgStarSize:48,reviewCountSize:16,recommendSize:12,compactCountSize:14,btnTextSize:12,barLabelSize:18,barCountSize:12,reviewDateSize:10,filterTextSize:12,loadMoreSize:12,readMoreSize:10,reviewStarSize:18,minimalAvgSize:18,heroAvgSize:74},medium:{titleSize:24,reviewTextSize:14,reviewTitleSize:16,authorSize:14,replyNameSize:13,replyTextSize:13,photoTitleSize:16,avgRatingSize:46,avgStarSize:58,reviewCountSize:20,recommendSize:14,compactCountSize:16,btnTextSize:14,barLabelSize:22,barCountSize:14,reviewDateSize:12,filterTextSize:14,loadMoreSize:14,readMoreSize:12,reviewStarSize:22,minimalAvgSize:22,heroAvgSize:90},large:{titleSize:28,reviewTextSize:16,reviewTitleSize:18,authorSize:16,replyNameSize:15,replyTextSize:15,photoTitleSize:18,avgRatingSize:56,avgStarSize:68,reviewCountSize:22,recommendSize:16,compactCountSize:18,btnTextSize:16,barLabelSize:26,barCountSize:16,reviewDateSize:14,filterTextSize:16,loadMoreSize:16,readMoreSize:14,reviewStarSize:26,minimalAvgSize:26,heroAvgSize:106}},wi={small:80,medium:110,large:140};function Lt(e,r){var i=r.headerTitleColor||"#111111",a=r.headerAvgColor||"#111111",t=r.headerCountColor||"#111111",n=r.headerRecommendColor||"#111111",s=r.barFillColor||"#111111",l=r.barTrackColor||"#e5e7eb",d=r.barCountColor||"#111111",c=Me(s,.06),m=r.reviewStarColor||"#f59e0b",p=m,o=r.btnBgColor||"#111111",k=r.btnTextColor||"#ffffff",u=r.btnBorderColor||"#111111",f=r.filterBtnBgColor||"#111111",v=r.filterBtnTextColor||"#ffffff",z=r.filterBtnBorderColor||"#111111",C=r.filterMenuBgColor||"#ffffff",g=r.filterMenuBorderColor||"#e5e7eb",h=r.filterItemTextColor||"#111111",y=r.filterItemHoverBgColor||"#f3f4f6",b=r.filterItemActiveColor||"#111111",w=r.reviewTitleColor||"#111111",x=r.reviewAuthorColor||"#111111",S=r.reviewDateColor||"#111111",T=r.reviewBodyColor||"#111111",N=r.reviewBorderColor||"#e5e7eb",E=r.replyBgColor||"#f9fafb",B=r.replyBorderColor||"#747474",W=r.replyLabelColor||"#111111",X=r.replyTextColor||"#111111",J=r.photoTitleColor||"#111111",ue=Me("#111111",.05),oe=r.photoArrowBgColor||"#ffffff",le=r.photoArrowTextColor||"#111111",Y=Me("#111111",.12),R=r.formBgColor||"#ffffff",G=r.formPrimaryTextColor||"#111111",Be=r.formSecondaryTextColor||"#3b3b3b",F=r.inputTextColor||G,De=r.inputBorderColor||"#d1d5db",be=r.placeholderColor||"#9ca3af",Ce=r.formStepBarColor||"#111111",j=r.formBtnBgColor||"#111111",V=r.formBtnTextColor||"#ffffff",fe=r.formBtnBorderColor||"#111111",U=Me(j,.06),ve=Me(j,.18),Se=Me(V,.85),Ee=Me(G,.06),P=r.loadMoreBgColor||"#ffffff",$=r.loadMoreTextColor||"#111111",Q=r.loadMoreBorderColor||"#111111",ee={"--ikr-widget-bg":"#ffffff00","--ikr-widget-border":"#ffffff00","--ikr-header-title":i,"--ikr-header-avg":a,"--ikr-header-count":t,"--ikr-header-recommend":n,"--ikr-bar-fill":s,"--ikr-bar-track":l,"--ikr-star-empty-color":p,"--ikr-bar-count":d,"--ikr-bar-hover-bg":c,"--ikr-btn-bg":o,"--ikr-btn-text":k,"--ikr-btn-border":u,"--ikr-filter-btn-bg":f,"--ikr-filter-btn-text":v,"--ikr-filter-btn-border":z,"--ikr-filter-menu-bg":C,"--ikr-filter-menu-border":g,"--ikr-filter-item-text":h,"--ikr-filter-item-hover-bg":y,"--ikr-filter-item-active":b,"--ikr-review-title":w,"--ikr-review-author":x,"--ikr-review-date":S,"--ikr-review-body":T,"--ikr-review-border":N,"--ikr-review-star-color":m,"--ikr-reply-bg-color":E,"--ikr-reply-border":B,"--ikr-reply-label":W,"--ikr-reply-text":X,"--ikr-photo-title":J,"--ikr-photo-image-border":ue,"--ikr-photo-arrow-bg":oe,"--ikr-photo-arrow-text":le,"--ikr-photo-arrow-border":Y,"--ikr-fwizard-bg":R,"--ikr-fwizard-text":G,"--ikr-fwizard-secondary-text":Be,"--ikr-fwizard-input-bg":R,"--ikr-fwizard-input-text":F,"--ikr-fwizard-input-border":De,"--ikr-fwizard-placeholder":be,"--ikr-fwizard-close-text":G,"--ikr-fwizard-close-hover-bg":Ee,"--ikr-fwizard-progress-bg":Ee,"--ikr-fwizard-progress-active":Ce,"--ikr-fwizard-btn-bg":j,"--ikr-fwizard-btn-text":V,"--ikr-fwizard-btn-border":fe,"--ikr-fwizard-btn-disabled-bg":ve,"--ikr-fwizard-btn-disabled-text":Se,"--ikr-fwizard-nav-hover-bg":U,"--ikr-load-more-bg":P,"--ikr-load-more-text":$,"--ikr-load-more-border":Q};Object.keys(ee).forEach(function(A){e.style.setProperty(A,ee[A])}),typeof window!="undefined"&&window.__ikasPreviewMode&&document.body&&(document.body.style.background="transparent",document.documentElement.style.background="transparent")}async function we(e,r,i,a,t,n,s){if(fr){Qe({productId:e,settings:r,reviewsData:i,productName:a,orderBy:t,page:n,badgeSettings:s});return}$e(!0),_r(e),Rr(r),s!==void 0&&Pr(s),Hr(a),t&&_e(t),n&&Ae(n),i!=null&&Or(i);try{let ee=function(A,I){if(!(!A||!A.meta||!A.meta.sizeOverrides)){var Z=A.meta.sizeOverrides[I];Z&&Object.keys(Z).forEach(function(se){o.style.setProperty(se,Z[se])})}};var Q=ee,l=or(r.summaryLayout),d=!(l.meta&&l.meta.supports&&l.meta.supports.title===!1),c=r.showTitle!==!1,m=(r.title||"").trim()||"M\xFC\u015Fteri Yorumlar\u0131",p=d&&c?m:"",o=document.documentElement;Lt(o,r),Zr("#111111",Jr+fi()+gi());var k=r.borderRadius!==void 0?r.borderRadius:8,u=hi[r.size]||hi.medium,f=wi[r.thumbnailSize]||wi.medium,v=Ke(r.reviewLayout);if(v.meta&&v.meta.sizeOverrides&&v.meta.sizeOverrides[r.size]){var z=v.meta.sizeOverrides[r.size],C=z["--ikr-list-photo-w"]||z["--ikr-gallery-photo-w"];C&&(f=parseInt(C))}o.style.setProperty("--ikr-title-size",u.titleSize+"px"),o.style.setProperty("--ikr-review-text-size",u.reviewTextSize+"px"),o.style.setProperty("--ikr-review-title-size",u.reviewTitleSize+"px"),o.style.setProperty("--ikr-author-size",u.authorSize+"px"),o.style.setProperty("--ikr-reply-name-size",u.replyNameSize+"px"),o.style.setProperty("--ikr-reply-text-size",u.replyTextSize+"px"),o.style.setProperty("--ikr-radius",k+"px"),o.style.setProperty("--ikr-radius-sm",Math.max(0,k-4)+"px"),o.style.setProperty("--ikr-photo-title-size",u.photoTitleSize+"px"),o.style.setProperty("--ikr-avg-rating-size",u.avgRatingSize+"px"),o.style.setProperty("--ikr-review-count-size",u.reviewCountSize+"px"),o.style.setProperty("--ikr-compact-count-size",u.compactCountSize+"px"),o.style.setProperty("--ikr-recommend-size",u.recommendSize+"px"),o.style.setProperty("--ikr-btn-text-size",u.btnTextSize+"px"),o.style.setProperty("--ikr-bar-label-size",u.barLabelSize+"px"),o.style.setProperty("--ikr-minimal-avg-size",u.minimalAvgSize+"px"),o.style.setProperty("--ikr-hero-avg-size",u.heroAvgSize+"px"),o.style.setProperty("--ikr-bar-count-size",u.barCountSize+"px"),o.style.setProperty("--ikr-review-date-size",u.reviewDateSize+"px"),o.style.setProperty("--ikr-filter-text-size",u.filterTextSize+"px"),o.style.setProperty("--ikr-load-more-size",u.loadMoreSize+"px"),o.style.setProperty("--ikr-read-more-size",u.readMoreSize+"px"),o.style.setProperty("--ikr-thumbnail-size",f+"px");var g=/^#[0-9A-Fa-f]{6}([0-9A-Fa-f]{2})?$/.test(r.reviewStarColor||"")?r.reviewStarColor:"#f59e0b";o.style.setProperty("--ikr-review-star-color",g),o.style.setProperty("--ikr-star-empty-color",g),o.style.setProperty("--ikr-star-size",u.reviewStarSize+"px"),o.style.setProperty("--ikr-avg-star-size",u.avgStarSize+"px"),ee(or(r.summaryLayout),r.size),ee(Ke(r.reviewLayout),r.size);var h=Ie(r),y=document.getElementById("ikas-reviews");if(!y){var b=document.getElementById("ikas-reviews-anchor");if(!b)return;y=document.createElement("div"),y.id="ikas-reviews",y.style.minHeight="200px",b.appendChild(y)}if(r.enabled===!1){y.style.minHeight="auto",y.innerHTML='<div style="padding: 40px 20px; margin-top: 24px; text-align: center; color: #6e6d7a; font-family: Inter, sans-serif; border: 1px dashed #e3e1e5; border-radius: '+(r.borderRadius!==void 0?r.borderRadius:8)+'px; background: #fafafa; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px;"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #6e6d7a; margin-bottom: 4px;"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg><div style="font-weight: 500; font-size: 18px; color: #1a191a; letter-spacing: -0.01em;">Widget \u015Fu anda Pasif durumda</div><div style="font-size: 16px; color: #6e6d7a; max-width: 380px; line-height: 1.5;">Canl\u0131 ma\u011Fazan\u0131zda m\xFC\u015Fterileriniz hi\xE7bir yorum alan\u0131 g\xF6rmeyecektir.</div></div>',$e(!1);var w=Ye;Qe(null),w&&we(w.productId,w.settings,w.reviewsData,w.productName,w.orderBy,w.page,w.badgeSettings);return}y.innerHTML='<p class="ikr-state-msg ikr-state-loading">Yorumlar y\xFCkleniyor...</p>';try{var x=i||{},S=x.data&&x.data.reviews||[],T=x.data&&x.data.totalCount||0,N=y.cloneNode(!1);y.parentNode.replaceChild(N,y),y=N;var E=document.createElement("div");if(E.id="ikas-reviews-widget",typeof window!="undefined"&&window.__ikasPreviewMode&&(E.style.width="100%",E.style.maxWidth="100%",E.style.marginLeft="0",E.style.marginRight="0"),p){var B=document.createElement("div"),W=r.summaryLayout||"classic";B.className="ikr-title ikr-title-"+W,B.textContent=p,E.appendChild(B)}var X=x.data&&x.data.allCount||0,J=x.data&&x.data.ratingCounts||null,ue=J||[0,0,0,0,0],oe=x.data&&x.data.avgRating||"0.0";if(!J&&S.length>0){S.forEach(function(A){A.rating>=1&&A.rating<=5&&ue[A.rating-1]++});var le=S.reduce(function(A,I){return A+I.rating},0);oe=(le/S.length).toFixed(1)}if(X>0){var Y=or(r.summaryLayout),R=Y.render({widget:E,data:x,settings:r,iconPair:h,allCount:X,ratingCounts:ue,avgRatingVal:oe,currentRatingFilter:Te,currentOrderBy:de,currentHasImages:Le,onFilterChange:async function(A){Je(Te===A?null:A),Ae(1);var I=await We(ie,de,1,Te,Le);await we(ie,L,I,xe,de,1)},onSortChange:async function(A,I){Ae(1),I?(ur(!0),_e("newest")):(ur(!1),_e(A));var Z=await We(ie,de,1,Te,Le);await we(ie,L,Z,xe,de,1)}});E.appendChild(R)}else{var G=document.createElement("button");G.className="ikr-write-btn",G.style.cssText="display:block;margin:16px auto 0;",G.textContent=r.writeButtonText||"Yorum Yap",G.onclick=O,E.appendChild(G)}var Be=S.filter(function(A){return A.images&&Array.isArray(A.images)&&A.images.some(function(I){return I&&(I.indexOf("https://")===0||I.indexOf("data:image/")===0)})});if(r.showPhotoGallery!==!1&&!Le&&Be.length>0){var F=document.createElement("div");if(F.className="ikr-photo-section",r.showPhotoGalleryTitle!==!1){var De=(r.photoGalleryTitle||"").trim()||"Foto\u011Frafl\u0131 Yorumlar",be=document.createElement("div");be.className="ikr-photo-title",be.textContent=De,F.appendChild(be)}var Ce=r.reviewLayout==="card"?"1/1":"3/4";o.style.setProperty("--ikr-photo-thumb-aspect",Ce);var j=document.createElement("div");j.className="ikr-photo-strip";var V=0;Be.forEach(function(A){if(!(V>=10)){var I=A.images.find(function(se){return se&&(se.indexOf("https://")===0||se.indexOf("data:image/")===0)});if(I){var Z=document.createElement("img");Z.src=K(I),Z.className="ikr-photo-strip-thumb",Z.alt="Yorum foto\u011Fraf\u0131",(function(se,Oi){Z.onclick=function(){pe(Oi,se,S)}})(I,A),j.appendChild(Z),V++}}});var fe=document.createElement("button");fe.className="ikr-photo-strip-arrow ikr-photo-strip-arrow-prev",fe.innerHTML="&#8249;",fe.setAttribute("aria-label","\xD6nceki"),fe.onclick=function(){j.scrollBy({left:-200,behavior:"smooth"})};var U=document.createElement("button");U.className="ikr-photo-strip-arrow ikr-photo-strip-arrow-next",U.innerHTML="&#8250;",U.setAttribute("aria-label","Sonraki"),U.onclick=function(){j.scrollBy({left:200,behavior:"smooth"})};var ve=document.createElement("div");ve.className="ikr-photo-strip-wrap",ve.appendChild(fe),ve.appendChild(j),ve.appendChild(U),F.appendChild(ve),E.appendChild(F)}if(S.length===0){var Se=document.createElement("p");Se.className="ikr-state-msg",Se.textContent="Hen\xFCz yorum yok.",E.appendChild(Se)}else{var v=Ke(r.reviewLayout);S.forEach(function(I){E.appendChild(v.render(I,S))})}var Ee=x.data&&x.data.hasMore;if(Ee){var P=document.createElement("button");P.className="ikr-load-more",P.textContent="Daha Fazla G\xF6ster",P.onclick=async function(){P.disabled=!0,P.textContent="Y\xFCkleniyor...";var A=qe+1,I=await We(ie,de,A,Te,Le);if(I&&I.data&&I.data.reviews){Ae(A);var Z=Ke(L.reviewLayout);I.data.reviews.forEach(function(se){E.insertBefore(Z.render(se,I.data.reviews),P)}),I.data.hasMore?(P.disabled=!1,P.textContent="Daha Fazla G\xF6ster"):P.remove()}else P.remove()},E.appendChild(P)}y.appendChild(E),Xr(X>0?oe:null,T,a,pr)}catch(A){console.error("[ikr] render error:",A),y.innerHTML='<p style="text-align:center;color:#dc2626;">Yorumlar y\xFCklenirken bir hata olu\u015Ftu.</p>'}}finally{if($e(!1),Ye){var $=Ye;Qe(null),we($.productId,$.settings,$.reviewsData,$.productName,$.orderBy,$.page,$.badgeSettings)}}}var ze="ikr_settings_"+D,At=300*1e3,Nt=30*1e3;async function Lr(){if(window.__ikasPreviewMode){try{var e=window.__ikasPreviewBaseUrl||re,r=window.__ikasPreviewSettings||sessionStorage.getItem("ikr_preview_settings")||"",i={};if(r)try{i=JSON.parse(r)}catch(m){}var a=await ae(e+"/api/preview/settings");if(a.ok){var t=await a.json();return t.widgets&&t.widgets.reviews&&Object.keys(i).length&&(t.widgets.reviews=Object.assign({},t.widgets.reviews,i)),t}}catch(m){}return null}var n=null,s=Ve(ze);if(s)try{var l=JSON.parse(s);if(l&&l.t!==void 0)if(l.notFound){if(Date.now()-l.t<Nt)return null;_(ze,"")}else if(l.v){if(Date.now()-l.t<At)return l.v;n=l.v,_(ze,"")}else _(ze,"");else _(ze,"")}catch(m){_(ze,"")}try{var d=await ae(re+"/api/public/settings?publicApiKey="+encodeURIComponent(D));if(!d.ok)return d.status===404&&_(ze,JSON.stringify({t:Date.now(),notFound:!0})),n||null;var c=await d.json();return _(ze,JSON.stringify({t:Date.now(),v:c})),c}catch(m){return console.error("[ikr] fetchSettings error:",m),n||null}}var It=60*1e3;async function We(e,r,i,a,t){if(window.__ikasPreviewMode){try{var n=window.__ikasPreviewBaseUrl||re,s=n+"/api/preview/reviews?page="+encodeURIComponent(i||1),l=await ae(s);if(l.ok)return await l.json()}catch(f){}return null}r=r||"newest",i=i||1;var d="ikr_reviews_"+D+"_"+e+"_"+r+"_"+i+"_"+(a||"")+"_"+(t?"1":"0"),c=null,m=Ve(d);if(m)try{var p=JSON.parse(m);if(p&&p.t!==void 0&&p.v){if(Date.now()-p.t<It)return p.v;c=p.v,_(d,"")}else _(d,"")}catch(f){_(d,"")}try{var o=re+"/api/public/reviews?storeId="+encodeURIComponent(D)+"&productId="+encodeURIComponent(e)+"&orderBy="+encodeURIComponent(r)+"&page="+encodeURIComponent(i)+(a?"&rating="+encodeURIComponent(a):"")+(t?"&hasImages=true":""),k=await ae(o);if(!k.ok)return c||null;var u=await k.json();return _(d,JSON.stringify({t:Date.now(),v:u})),u}catch(f){return console.error("[ikr] fetchReviews error:",f),c||null}}var Tr={};async function Fe(e,r){var i=document.getElementById("ikr-rating-badge");i&&i.remove();var a=document.getElementById("ikr-jsonld");if(a&&a.remove(),!Tr[e]){Tr[e]=!0;var t={title:"M\xFC\u015Fteri Yorumlar\u0131",enabled:!0},n={enabled:!0,icon:"star",size:"medium",color:"#f59e0b"};try{var s=await Lr();if(!s)return;var l=s.widgets&&s.widgets.reviews||t,d=s.widgets&&s.widgets.badge||n;if(l.enabled===!1)return;_e("newest"),Ae(1),Je(null);var c=await We(e,"newest",1,null);await we(e,l,c,r,"newest",1,d)}catch(m){console.error("[ikr] bootstrap error:",m),await we(e,t,null,r,void 0,void 0,n)}finally{delete Tr[e]}}}function Ar(){try{var e=window.__NEXT_DATA__&&window.__NEXT_DATA__.props&&window.__NEXT_DATA__.props.pageProps;if(e&&e.pageType==="PRODUCT"&&e.pageSpecificData&&e.pageSpecificData.id)return{id:e.pageSpecificData.id,name:e.pageSpecificData.name||null}}catch(a){}if(window.IkasStorefront&&window.IkasStorefront.product&&window.IkasStorefront.product.id)return{id:window.IkasStorefront.product.id,name:window.IkasStorefront.product.name||null};var r=window.location.pathname.match(/--([a-f0-9-]{36})(?:\/|$|\?)/);if(r)return{id:r[1],name:null};var i=new URLSearchParams(window.location.search).get("productId");return i?{id:i,name:null}:null}function bi(){var e={},r={};return document.querySelectorAll("a[href]").forEach(function(i){try{var a=i.getAttribute("href");if(!a||a.charAt(0)==="#"||a.charAt(0)==="?")return;var t=H(i.href);if(!t||r[t]||!/^[a-z0-9][a-z0-9-]{2,}$/.test(t)||ir.test(t))return;r[t]=!0,e[t]=null}catch(n){}}),Object.keys(Ge).forEach(function(i){e[i]=Ge[i]}),e}var Mt=300*1e3,yi=50;async function xi(e){var r="ikr_ratings_"+D,i={},a=Ve(r);if(a)try{var t=JSON.parse(a);t&&t.t!==void 0&&Date.now()-t.t<Mt?i=t.v||{}:_(r,"")}catch(c){_(r,"")}var n=e.filter(function(c){return!i[c]});if(!n.length)return i;for(var s=[],l=0;l<n.length;l+=yi)s.push(n.slice(l,l+yi));var d=await Promise.all(s.map(function(c){var m=re+"/api/public/ratings-by-slug?storeId="+encodeURIComponent(D)+"&slugs="+c.map(encodeURIComponent).join(",");return ae(m).then(function(p){return p.ok?p.json().then(function(o){return o.data||{}}):{}}).catch(function(){return{}})}));return d.forEach(function(c){n.forEach(function(m){i[m]||(i[m]={average:0,count:0,_empty:!0})}),Object.keys(c).forEach(function(m){i[m]=c[m]})}),_(r,JSON.stringify({t:Date.now(),v:i})),i}var Bt="var(--ikr-badge-color,#f59e0b)",zi=13,_t="display:flex;align-items:center;gap:3px;margin-top:0px;margin-bottom:4px;font-size:13px;font-weight:400;color:#555;pointer-events:none;";function Rt(e){var r=Ue("star","classic"),i="width:"+zi+"px;height:"+zi+"px;";return'<span style="color:'+Bt+';display:inline-flex;align-items:center;">'+ce(e,r,{sizeStyle:i})+"</span>"}function Xe(e,r){var i=document.createElement("div");return i.setAttribute("data-ikr-listing-badge","1"),i.style.cssText=_t+"justify-content:"+(r||"flex-start")+";",i.innerHTML=Rt(e.avg)+'<span style="font-weight:400;">'+e.avg+" ("+e.count+")</span>",i}var Ci=".product-name",Si=".add-to-basket-modal",Ei="h1.product-name",sr=".single-product-container-main",Nr=".single-product-product-name",Ti=[".hero-image-banner-main",".hero-image-main",".home-slider-main",'[class*="hero-"]','[class*="banner-"]','[class*="slider-banner"]','[class*="marquee"]'].join(","),Li=[".category-products-main",".products-slider-main",".infinite-scroll-component",'[class*="product-list"]',".single-product-container-main",".product-block-container"].join(",");var Ai='[class*="productTitle"],[class*="productName"],[class*="product_title"],[class*="product_name"],[class*="product-title"],[class*="product-name"]',Pt=/^(tükendi|sold out|out of stock|stokta yok|satıldı|unavailable)$/i;function Ir(e,r){var i=e.querySelector(Ci);if(i)return i;if(e.matches&&e.matches(Ai))return e;var a=e.querySelector(Ai);if(a)return a;if(r){for(var t=e.querySelectorAll("*"),n=0;n<t.length;n++)if(t[n].children.length===0&&t[n].textContent.trim()===r)return t[n]}for(var s=e.querySelectorAll("p, h1, h2, h3, h4, h5, h6, span, div"),l=0;l<s.length;l++){var d=s[l],c=d.textContent.trim();if(!(!c||c.length<2||c.length>150)&&!/^[\d\s.,₺$€£%]+$/.test(c)&&!Pt.test(c)&&!(d.closest("figure")||d.closest("picture"))&&!(d.children.length>1))return d}return null}function Ht(e,r,i,a){if(!e.getAttribute("data-ikr-badge")){var t=H(e.href);if(e.id==="ikr-rating-badge"){e.setAttribute("data-ikr-badge","1");return}if(t===a&&e.getAttribute("href")&&e.getAttribute("href").charAt(0)==="#"){e.setAttribute("data-ikr-badge","1");return}if(e.closest("header")||e.closest("nav")){e.setAttribute("data-ikr-badge","1");return}if(e.closest('[class*="basket"]')||e.closest('[class*="cart"]')){e.setAttribute("data-ikr-badge","1");return}if(e.closest(sr)&&!e.closest(Nr)){e.setAttribute("data-ikr-badge","1");return}if(t===a&&e.closest(Nr)){e.setAttribute("data-ikr-badge","1");return}if(e.closest(Ti)){e.setAttribute("data-ikr-badge","1");return}var n=!!e.querySelector("a[href]"),s=Array.from(e.childNodes).filter(function(u){return u.nodeType===3}).map(function(u){return u.textContent.trim()}).join("").trim(),l=!!Ir(e,i);if(!s&&!l&&!n){e.setAttribute("data-ikr-badge","1");return}if(e.setAttribute("data-ikr-badge","1"),n){e.querySelectorAll("a[href]").forEach(function(u){u.setAttribute("data-ikr-badge","1")});var d=Ir(e,i);if(!d||d.querySelector("[data-ikr-listing-badge]"))return;var c=window.getComputedStyle(d).textAlign;d.appendChild(Xe(r,c==="center"?"center":c==="right"?"flex-end":"flex-start"));return}var m=Ir(e,i);if(!(m&&m.querySelector("[data-ikr-listing-badge]")))if(m){var p=window.getComputedStyle(m).textAlign;m.appendChild(Xe(r,p==="center"?"center":p==="right"?"flex-end":"flex-start"))}else{var o=Xe(r,"flex-start"),k=e.firstElementChild;k?e.insertBefore(o,k):e.appendChild(o)}}}function Ot(e,r){var i=document.querySelector(Si);if(i){var a=i.querySelector(Ei);if(!(!a||a.querySelector("[data-ikr-listing-badge]"))){var t=null;if(Ze&&r[Ze]&&(t=Ze),!t){var n=H(window.location.pathname);n&&r[n]&&(t=n)}if(!t){var s=a.textContent.trim();Object.keys(e).forEach(function(p){if(!t){var o=e[p];o&&o.trim()===s&&r[p]&&(t=p)}})}if(!t){var l=document.querySelector(sr);if(l){var d=l.querySelector("a[href]");if(d){var c=H(d.href);c&&r[c]&&(t=c)}}}if(!t){var m=a.textContent.trim().toLowerCase();document.querySelectorAll("a[href]").forEach(function(p){if(!t&&!(p.closest("header")||p.closest("nav"))&&!p.closest(sr)){var o=p.textContent.trim().toLowerCase();if(o&&o===m){var k=H(p.href);k&&r[k]&&(t=k)}}})}!t||!r[t]||r[t]._empty||r[t].count===0||a.appendChild(Xe(r[t],"flex-start"))}}}function Ni(e,r){var i=H(window.location.pathname),a=document.querySelectorAll(Li),t=[];a.forEach(function(n){n.tagName==="A"&&n.href?t.push(n):n.querySelectorAll("a[href]").forEach(function(s){t.push(s)})}),Object.keys(e).forEach(function(n){var s=r[n];if(!(!s||s._empty||s.count===0)){var l=e[n];t.forEach(function(d){H(d.href)===n&&Ht(d,s,l,i)})}}),Ot(e,r)}async function je(){if(M.inProgress){M.queued=!0;return}if(!M.rendered){M.rendered=!0,M.inProgress=!0;try{var e=M.navCleanup;e&&(M.navCleanup=!1);var r=bi();if(!Object.keys(r).length){M.rendered=!1;return}var i=await Promise.all([Lr(),xi(Object.keys(r))]),a=i[0];if(!a){M.rendered=!1;return}var t=i[1],n=a&&a.widgets||{},s=n.badge&&n.badge.color||"#f59e0b";if(n.badge&&n.badge.enabled===!1){M.rendered=!1;return}document.documentElement.style.setProperty("--ikr-badge-color",s),e&&(document.querySelectorAll("[data-ikr-listing-badge]").forEach(function(l){l.remove()}),document.querySelectorAll("[data-ikr-badge]").forEach(function(l){l.removeAttribute("data-ikr-badge")})),Ni(r,t)}finally{M.inProgress=!1,M.queued&&(M.queued=!1,M.rendered=!1,je())}}}var Ii=!1,Mi=!1;function Ri(){Mi||(Mi=!0,document.addEventListener("click",function(e){var r=e.target.closest("a[href]");if(r&&!(r.closest("header")||r.closest("nav"))&&!(r.closest('[class*="basket"]')||r.closest('[class*="cart"]'))){var i=H(r.href);!i||i.length<3||Fr(i)}},!0))}var Bi=!1,_i=typeof location!="undefined"?location.pathname:"";function dr(){try{if(location.pathname===_i)return;_i=location.pathname;var e=document.getElementById("ikr-rating-badge");e&&e.remove();var r=document.getElementById("ikr-jsonld");r&&r.remove()}catch(i){}}function Ft(){if(!Bi){Bi=!0;var e=history.pushState,r=history.replaceState;history.pushState=function(){var i=e.apply(this,arguments);return dr(),i},history.replaceState=function(){var i=r.apply(this,arguments);return dr(),i},window.addEventListener("popstate",dr),window.addEventListener("hashchange",dr)}}function Mr(){if(Ft(),window.IkasEvents){if(Ii)return;Ii=!0,window.IkasEvents.subscribe({id:"ikas-reviews-widget",callback:function(n){if(n&&n.type==="VIEW_LISTING"){var s=n.data&&n.data.productDetails;Array.isArray(s)&&s.forEach(function(m){m&&m.metaData&&m.metaData.slug&&m.name&&(Ge[m.metaData.slug]=m.name)})}if(n&&n.type==="PRODUCT_VIEW"){var l=n.data&&n.data.productDetail&&n.data.productDetail.id,d=n.data&&n.data.productDetail&&n.data.productDetail.name;l&&(_("ikr_reviews_"+D+"_"+l,""),Fe(l,d))}if(n&&n.type==="PAGE_VIEW"){var c=Date.now();if(M.lastPageView&&c-M.lastPageView<800)return;M.lastPageView=c,M.navCleanup=!0,M.rendered=!1,je()}}});var e=Ar();if(e)Fe(e.id,e.name);else{let n=function(){var s=Ar();s?Fe(s.id,s.name):r<20&&(r++,setTimeout(n,100))};var a=n,r=0;setTimeout(n,100)}setTimeout(function(){M.rendered||je()},2e3)}else{let n=function(){window.IkasEvents?Mr():i<100&&(i++,setTimeout(n,50))};var t=n,i=0;setTimeout(n,50)}}var Pi=null;function Hi(){if(typeof MutationObserver!="undefined"){var e=new MutationObserver(function(r){var i=r.some(function(a){return Array.from(a.addedNodes).some(function(t){return!(t.nodeType!==1||t.hasAttribute&&(t.hasAttribute("data-ikr-listing-badge")||t.id==="ikr-rating-badge"||t.id==="ikr-reviews-widget")||t.closest&&(t.closest("[data-ikr-listing-badge]")||t.closest("#ikr-rating-badge")||t.closest("#ikr-reviews-widget"))||t.querySelector&&t.querySelector("[data-ikr-listing-badge],#ikr-reviews-widget,#ikr-rating-badge"))})});i&&(clearTimeout(Pi),Pi=setTimeout(function(){var a=Array.from(document.querySelectorAll("a[href]")).some(function(t){if(t.getAttribute("data-ikr-badge"))return!1;var n=H(t.href);return n&&n.length>=3&&!ir.test(n)});a&&(M.rendered=!1,je())},300))});e.observe(document.body,{childList:!0,subtree:!0})}}var jt=window.__ikasPreviewMode===!0;if(jt){let e=function(){try{window.parent.postMessage({type:"IKR_WIDGET_READY"},"*")}catch(i){}},r=function(){Fe("mock-product","\xD6rnek \xDCr\xFCn"),e()};Dt=e,qt=r,window.addEventListener("message",function(i){var a=i.data;if(!(!a||a.type!=="IKR_SETTINGS_UPDATE")){var t=a.settings;if(!(!t||!L)){var n=Object.assign({},L,t);we(ie,n,mr,xe,de,qe),window.dispatchEvent(new CustomEvent("IKR_SETTINGS_UPDATED_PREVIEW"))}}}),document.readyState==="loading"?document.addEventListener("DOMContentLoaded",r):r()}else if(D){let e=function(){Mr(),Ri(),Hi()};Yt=e,document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e):e()}var Dt,qt,Yt;})();
