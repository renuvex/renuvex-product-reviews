/* ikas Reviews Widget — built 2026-04-24T15:56:24.033Z | theme: default */
"use strict";(()=>{var Ei=Object.defineProperty;var le=(e,r)=>{for(var i in r)Ei(e,i,{get:r[i],enumerable:!0})};var zr=document.currentScript||(function(){for(var e=document.getElementsByTagName("script"),r=e.length-1;r>=0;r--)if(e[r].src&&e[r].src.indexOf("/widget.js")!==-1)return e[r];return e[e.length-1]})(),ir=zr?zr.src:"",Ti=new URLSearchParams(ir.split("?")[1]||""),q=Ti.get("publicApiKey"),V=ir?ir.split("?")[0].replace(/\/widget\.js$/,""):"";var Z="newest",_e=1,ke=null,fe=!1,ie=null,_=null,tr=null,ye=null,ar=null;function be(e){Z=e}function ge(e){_e=e}function De(e){ke=e}function nr(e){fe=e}function Er(e){ie=e}function Tr(e){_=e}function Lr(e){tr=e}function Ar(e){ye=e}function Nr(e){ar=e}var or=!1,Re=null;function Fe(e){or=e}function Ye(e){Re=e}var A={rendered:!1,inProgress:!1,queued:!1,navCleanup:!1,lastPageView:0},Be={},Ie=null;function _r(e){Ie=e}var Rr={};function Oe(e){try{return sessionStorage.getItem(e)}catch(r){return Rr[e]||null}}function B(e,r){try{sessionStorage.setItem(e,r)}catch(i){Rr[e]=r}}var se="0 -960 960 960",W={starFill:"m233-120 65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z",starOutline:"m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-355Z",starRounded:"M480-269 314-169q-11 7-23 6t-21-8q-9-7-14-17.5t-2-23.5l44-189-147-127q-10-9-12.5-20.5T140-571q4-11 12-18t22-9l194-17 75-178q5-12 15.5-18t21.5-6q11 0 21.5 6t15.5 18l75 178 194 17q14 2 22 9t12 18q4 11 1.5 22.5T809-528L662-401l44 189q3 13-2 23.5T690-171q-9 7-21 8t-23-6L480-269Z",starRoundedOutline:"m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-355Z",heartRounded:"M480-120 432-164q-114-104-190-176.5T121-456q-45-43-63-86.5T40-639q0-111 74.5-185.5T300-899q62 0 118 29t62 76q6-47 62-76t118-29q111 0 185.5 74.5T920-639q0 53-18 96.5T839-456q-45 42-120.5 115.5T528-164l-48 44Z",heartOutline:"m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z",boxSquare:"M160-80h640q33 0 56.5-23.5T880-160v-640q0-33-23.5-56.5T800-880H160q-33 0-56.5 23.5T80-800v640q0 33 23.5 56.5T160-80Z",boxSquareOutline:"M200-200h560v-560H200v560Zm0 80q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Z"};var Br={star:{label:"Y\u0131ld\u0131z",styles:{rounded:{label:"Tombul (Google)",filled:'<svg viewBox="'+se+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g transform="translate(-48, 48) scale(1.1)"><path d="'+W.starRounded+'"/></g></svg>',empty:'<svg viewBox="'+se+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g transform="translate(-48, 48) scale(1.1)"><path d="'+W.starRoundedOutline+'"/></g></svg>'},classic:{label:"Klasik (Google)",filled:'<svg viewBox="'+se+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g transform="translate(-48, 48) scale(1.1)"><path d="'+W.starFill+'"/></g></svg>',empty:'<svg viewBox="'+se+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g transform="translate(-48, 48) scale(1.1)"><path d="'+W.starOutline+'"/></g></svg>'},boxed:{label:"Kare (Google)",filled:'<svg viewBox="'+se+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="'+W.boxSquare+'"/><g transform="translate(120, -120) scale(0.75)" fill="white"><path d="'+W.starFill+'"/></g></svg>',empty:'<svg viewBox="'+se+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="'+W.boxSquareOutline+'"/><g transform="translate(120, -120) scale(0.75)"><path d="'+W.starOutline+'"/></g></svg>'}}},favorite:{label:"Kalp",styles:{rounded:{label:"Yuvarlak (Google)",filled:'<svg viewBox="'+se+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g transform="translate(24, -24) scale(0.95)"><path d="'+W.heartRounded+'"/></g></svg>',empty:'<svg viewBox="'+se+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g transform="translate(24, -24) scale(0.95)"><path d="'+W.heartOutline+'"/></g></svg>'}}}};function Li(e){var r=String(e||"star"),i=r.indexOf(":");return i===-1?{type:r,style:null}:{type:r.slice(0,i),style:r.slice(i+1)}}function Pe(e,r){var i=Br[e]||Br.star,t=i.styles;return t[r]||t[Object.keys(t)[0]]}function Me(e){var r=e&&e.reviewIcon||"star",i=Li(r),t=i.style||e&&e.reviewIconStyle||"classic";return Pe(i.type,t)}function Ir(e,r,i){for(var t=Math.round(parseFloat(e))||0,a=Me(r),n=i&&i.sizePx,s=n?"width:"+n+"px;height:"+n+"px;":"",l="",d=1;d<=5;d++){var c=d<=t;l+='<span class="ikr-icon '+(c?"ikr-icon-filled":"ikr-icon-empty")+'" style="'+s+'">'+(c?a.filled:a.empty)+"</span>"}return l}var Ge="var(--ikr-review-star-color,#f59e0b)",Ue=/^(account|pages|blog|search|cart|checkout|siparis|odeme|kategori|category|urun|products?)/;function O(e){try{return new URL(e,window.location.origin).pathname.replace(/^\//,"").split("?")[0].split("/")[0]}catch(r){return""}}function te(e,r){var i="color:"+Ge+";display:inline-flex;gap:2px;align-items:center;";return'<span class="ikr-stars" style="'+i+'">'+Ir(e,r)+"</span>"}function J(e,r,i){for(var t=Math.max(0,Math.min(5,parseFloat(e)||0)),a=Math.floor(t),n=t-a,s=n<.25?a:n<.75?a+.5:a+1,l=s/5*100,d=i&&i.sizeStyle||"",c="",o="",p=0;p<5;p++)c+='<span class="ikr-icon" style="'+d+'">'+r.filled+"</span>",o+='<span class="ikr-icon" style="'+d+'">'+r.filled+"</span>";return'<span class="ikr-stars-partial"><span class="ikr-stars-partial-empty">'+c+'</span><span class="ikr-stars-partial-fill" style="width:'+l+'%;">'+o+"</span></span>"}function ae(e){return e?new Date(e).toLocaleDateString("tr-TR",{year:"numeric",month:"long",day:"numeric"}):""}function Ai(e){var r=/^#([0-9A-Fa-f]{6})$/.exec(e);return r?[parseInt(r[1].slice(0,2),16),parseInt(r[1].slice(2,4),16),parseInt(r[1].slice(4,6),16)]:null}function Ni(e){var r=/^#[0-9A-Fa-f]{6}$/.test(e)?e:"#111111";document.documentElement.style.setProperty("--ikr-color",r);var i=Ai(r);document.documentElement.style.setProperty("--ikr-color-light",i?"rgba("+i[0]+","+i[1]+","+i[2]+",0.07)":"rgba(17,17,17,0.07)")}function Pr(e,r){var i=document.getElementById("ikr-styles");i||(i=document.createElement("style"),i.id="ikr-styles",document.head.appendChild(i)),i.textContent=r,Ni(e)}function U(e){return!e||e.indexOf("res.cloudinary.com")===-1?e:e.replace("/upload/","/upload/q_auto/f_auto/c_scale,w_1200/")}function Mr(e,r,i,t){var a=Me(t),n="ikr-rating-"+Math.random().toString(36).slice(2,9),s=document.createElement("div");if(s.className="ikr-rating"+(r?" ikr-rating-interactive":""),s.style.cssText="display:inline-flex;flex-direction:row-reverse;justify-content:flex-end;gap:4px;",!r){s.style.flexDirection="row";for(var l=1;l<=5;l++){var d=document.createElement("span");d.className="ikr-icon",d.style.cssText="width:24px;height:24px;display:inline-flex;color:"+(l<=e?Ge:"#ddd")+";",d.innerHTML=l<=e?a.filled:a.empty,s.appendChild(d)}return s}for(var c=5;c>=1;c--)(function(o){var p=document.createElement("input");p.type="radio",p.name=n,p.value=String(o),p.id=n+"-"+o,p.className="ikr-rating-input",o===e&&(p.checked=!0),p.style.cssText="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;",p.addEventListener("change",function(){i&&i(o)});var u=document.createElement("label");u.htmlFor=p.id,u.className="ikr-rating-label",u.setAttribute("aria-label",o+" y\u0131ld\u0131z"),u.style.cssText="width:24px;height:24px;display:inline-flex;cursor:pointer;transition:color .15s;",u.addEventListener("click",function(k){k.preventDefault();for(var m=s.querySelectorAll(".ikr-rating-input"),v=0;v<m.length;v++)m[v].checked=!1;p.checked=!0,i&&i(o)}),u.innerHTML='<span class="ikr-rating-filled" style="position:absolute;width:24px;height:24px;color:'+Ge+';pointer-events:none;">'+a.filled+'</span><span class="ikr-rating-empty" style="position:relative;width:24px;height:24px;color:#ddd;pointer-events:none;">'+a.empty+"</span>",u.style.position="relative",s.appendChild(p),s.appendChild(u)})(c);return _i(),s}var Or=!1;function _i(){if(!Or){Or=!0;var e=".ikr-rating-interactive .ikr-rating-filled{opacity:0; transition:opacity .15s;}.ikr-rating-interactive .ikr-rating-empty{opacity:1; transition:opacity .15s;}.ikr-rating-interactive .ikr-rating-input:checked ~ .ikr-rating-label .ikr-rating-filled{opacity:1 !important;}.ikr-rating-interactive .ikr-rating-input:checked ~ .ikr-rating-label .ikr-rating-empty{opacity:0 !important;}.ikr-rating-interactive .ikr-rating-input:focus-visible + .ikr-rating-label{outline:2px solid "+Ge+";outline-offset:2px;border-radius:4px;}",r=document.createElement("style");r.setAttribute("data-ikr","rating"),r.textContent=e,document.head.appendChild(r)}}function X(e,r,i){var t=new AbortController,a=setTimeout(function(){t.abort()},i||8e3);return fetch(e,Object.assign({},r,{signal:t.signal})).finally(function(){clearTimeout(a)})}function Hr(e,r,i){document.body.style.overflow="",document.body.style.paddingRight="",document.removeEventListener("keydown",r),window.removeEventListener("popstate",i),e.parentNode&&e.parentNode.removeChild(e)}function Ri(e){var r=document.createElement("div");r.className="ikr-modal-right";var i=document.createElement("div");i.className="ikr-modal-scroll-content";var t=document.createElement("div");t.className="ikr-modal-top-row";var a=document.createElement("div");a.className="ikr-modal-stars",a.innerHTML=te(e.rating,_);var n=document.createElement("span");n.className="ikr-modal-date",n.textContent=ae(e.createdAt),t.appendChild(a),t.appendChild(n),i.appendChild(t);var s=document.createElement("div");s.className="ikr-modal-title",s.textContent=e.title||"",s.style.display=e.title?"":"none",i.appendChild(s);var l=document.createElement("div");l.className="ikr-modal-author",l.textContent=e.author||"",i.appendChild(l);var d=document.createElement("div");d.className="ikr-modal-body",d.textContent=(e.comment||"").trim(),d.style.display=e.comment&&e.comment.trim()?"":"none",i.appendChild(d);var c=document.createElement("div");c.className="ikr-modal-reply";var o=document.createElement("div");o.className="ikr-modal-reply-label",o.textContent="Ma\u011Faza Sahibi";var p=document.createElement("div");return p.className="ikr-modal-reply-text",p.textContent=e.merchantReply||"",c.appendChild(o),c.appendChild(p),c.style.display=e.merchantReply?"":"none",i.appendChild(c),r.appendChild(i),r}function Bi(e,r){var i=e.querySelector(".ikr-modal-scroll-content");i.querySelector(".ikr-modal-stars").innerHTML=te(r.rating,_),i.querySelector(".ikr-modal-date").textContent=ae(r.createdAt);var t=i.querySelector(".ikr-modal-title");t.textContent=r.title||"",t.style.display=r.title?"":"none",i.querySelector(".ikr-modal-author").textContent=r.author||"";var a=i.querySelector(".ikr-modal-body");a.textContent=(r.comment||"").trim(),a.style.display=r.comment&&r.comment.trim()?"":"none";var n=i.querySelector(".ikr-modal-reply");n.querySelector(".ikr-modal-reply-text").textContent=r.merchantReply||"",n.style.display=r.merchantReply?"":"none",e.scrollTop=0}function lr(e,r,i,t,a,n,s,l){var d=e.images&&Array.isArray(e.images)?e.images.filter(function(S){return S&&(S.indexOf("https://")===0||S.indexOf("data:image/")===0)}):[],c=Math.min(i,d.length-1),o=document.createElement("div");o.className="ikr-modal-left";var p=document.createElement("img"),u=s==="next"?"ikr-modal-img-enter-right":s==="prev"?"ikr-modal-img-enter-left":"";p.className="ikr-modal-main-img"+(u?" "+u:""),p.src=U(d[c]||""),p.alt="Yorum foto\u011Fraf\u0131",o.appendChild(p);var k=document.createElement("button");k.className="ikr-modal-close-mobile",k.textContent="\u2715",k.setAttribute("aria-label","Kapat"),k.onclick=function(S){S.stopPropagation(),n()},o.appendChild(k);var m=0;if(o.addEventListener("touchstart",function(S){m=S.touches[0].clientX},{passive:!0}),o.addEventListener("touchend",function(S){var y=m-S.changedTouches[0].clientX;if(!(Math.abs(y)<50)){if(y>0){if(h)ne(e,r,c+1,t,a,n,!0,"next",l);else if(C){var T=t[r+1];ne(T,r+1,0,t,a,n,!1,"next",l)}}else if(f)ne(e,r,c-1,t,a,n,!0,"prev",l);else if(g){var N=t[r-1],j=(N.images||[]).filter(function(D){return D&&(D.indexOf("https://")===0||D.indexOf("data:image/")===0)});ne(N,r-1,j.length-1,t,a,n,!1,"prev",l)}}},{passive:!0}),d.length>1){var v=document.createElement("div");v.className="ikr-modal-thumbs",d.forEach(function(S,y){var T=document.createElement("img");T.src=U(S),T.className="ikr-modal-thumb"+(y===c?" ikr-modal-thumb-active":""),T.alt="K\xFC\xE7\xFCk resim "+(y+1),(function(N){T.onclick=function(){ne(e,r,N,t,a,n,!0,null,l)}})(y),v.appendChild(T)}),o.appendChild(v)}var f=c>0,h=c<d.length-1,g=r>0,C=r<t.length-1,x=f||g,z=h||C;if(x||z){var E=document.createElement("button");E.className="ikr-modal-nav ikr-modal-nav-prev",E.innerHTML="&#8249;",E.setAttribute("aria-label","\xD6nceki"),E.style.opacity=x?"1":"0.3",E.onclick=function(S){if(S.stopPropagation(),f)ne(e,r,c-1,t,a,n,!0,"prev",l);else if(g){var y=t[r-1],T=(y.images||[]).filter(function(N){return N&&N.indexOf("https://")===0});ne(y,r-1,T.length-1,t,a,n,!1,"prev",l)}},o.appendChild(E);var w=document.createElement("button");w.className="ikr-modal-nav ikr-modal-nav-next",w.innerHTML="&#8250;",w.setAttribute("aria-label","Sonraki"),w.style.opacity=z?"1":"0.3",w.onclick=function(S){if(S.stopPropagation(),h)ne(e,r,c+1,t,a,n,!0,"next",l);else if(C){var y=t[r+1];ne(y,r+1,0,t,a,n,!1,"next",l)}},o.appendChild(w)}return o}function qr(e,r){[-1,1].forEach(function(i){var t=r[e+i];if(t){var a=(t.images||[]).filter(function(n){return n&&(n.indexOf("https://")===0||n.indexOf("data:image/")===0)});a[0]&&(new Image().src=U(a[0]))}})}function ne(e,r,i,t,a,n,s,l,d){if(s){var c=lr(e,r,i,t,a,n,l,d);a.firstChild&&a.replaceChild(c,a.firstChild)}else{var c=lr(e,r,i,t,a,n,l,d),o=a.querySelector(".ikr-modal-right");a.firstChild&&a.replaceChild(c,a.firstChild),o&&Bi(o,e);var p=d&&d.querySelector(".ikr-modal-wrap");p&&(p.scrollTop=0)}qr(r,t)}function $(e,r,i){var t=(i||[]).filter(function(f){return f.images&&Array.isArray(f.images)&&f.images.some(function(h){return h&&(h.indexOf("https://")===0||h.indexOf("data:image/")===0)})}),a=t.findIndex(function(f){return f===e||f.id===e.id});a===-1&&(a=0);var n=e.images&&Array.isArray(e.images)?e.images.filter(function(f){return f&&(f.indexOf("https://")===0||f.indexOf("data:image/")===0)}):[],s=Math.max(0,n.indexOf(r)),l=document.createElement("div");l.className="ikr-modal-overlay";var d=document.createElement("div");d.className="ikr-modal";var c=!1;function o(){c||(c=!0,Hr(l,p,o))}function p(f){f.key==="Escape"&&u()}function u(){c||(c=!0,history.go(-1),Hr(l,p,o))}document.addEventListener("keydown",p);var k=window.innerWidth-document.documentElement.clientWidth;document.body.style.paddingRight=k+"px",document.body.style.overflow="hidden",history.pushState({ikrModal:!0},""),window.addEventListener("popstate",o),l.onclick=function(){u()},d.onclick=function(f){f.stopPropagation()},d.appendChild(lr(e,a,s,t,d,u,null,l)),d.appendChild(Ri(e)),qr(a,t);var m=document.createElement("div");m.className="ikr-modal-wrap",m.appendChild(d);var v=document.createElement("button");v.className="ikr-modal-close",v.textContent="\u2715",v.setAttribute("aria-label","Kapat"),v.onclick=function(f){f.stopPropagation(),u()},m.appendChild(v),l.appendChild(m),document.body.appendChild(l)}function jr(e,r){var i=document.createElement("div");i.className="ikr-form",i.id="ikr-form-section",i.setAttribute("aria-label","Yorum formu"),i.setAttribute("role","form"),i.innerHTML=['<div style="margin-top:0;"><label style="font-weight:600;" id="ikr-stars-label">De\u011Ferlendirme <span style="color:#dc2626;">*</span></label><div id="ikr-stars-input" role="group" aria-labelledby="ikr-stars-label"></div></div>','<label for="ikr-title" style="font-weight:600;margin-top:16px;display:block;">Ba\u015Fl\u0131k</label>','<input type="text" id="ikr-title" class="ikr-input" placeholder="K\u0131sa bir ba\u015Fl\u0131k ekleyin" aria-label="Yorum ba\u015Fl\u0131\u011F\u0131" maxlength="60">','<label for="ikr-comment" style="font-weight:600;margin-top:16px;display:block;">Yorum</label>','<textarea id="ikr-comment" class="ikr-textarea" placeholder="Deneyiminizi payla\u015F\u0131n..." rows="5" aria-label="Yorum" maxlength="2000"></textarea>','<div id="ikr-comment-counter" class="ikr-char-counter" aria-live="polite">0/2000</div>','<label for="ikr-name" style="font-weight:600;margin-top:16px;display:block;">Ad <span style="color:#dc2626;">*</span></label>','<input type="text" id="ikr-name" class="ikr-input" placeholder="Ad\u0131n\u0131z" aria-label="Ad" aria-required="true" maxlength="40">','<div id="ikr-photo-section" style="margin-top:16px;">','  <label style="font-weight:600;display:block;margin-bottom:8px;">Foto\u011Fraf</label>','  <label class="ikr-photo-btn" aria-label="Foto\u011Fraf ekle"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg><input type="file" id="ikr-file-input" style="display:none" accept="image/*" multiple aria-label="Foto\u011Fraf se\xE7"></label>','  <div id="ikr-photo-previews" style="margin-top:10px" aria-live="polite"></div>',"</div>",'<button id="ikr-submit" class="ikr-btn" aria-label="G\xF6nder">G\xF6nder</button>','<div id="ikr-msg" style="margin-top:10px;" role="alert" aria-live="assertive"></div>'].join("");var t=0,a=[],n=i.querySelector("#ikr-comment"),s=i.querySelector("#ikr-comment-counter");function l(){var v=n.value.length;s.textContent=v+"/2000",s.classList.toggle("ikr-char-counter--max",v>=2e3)}n.addEventListener("input",l);var d=Mr(0,!0,function(v){t=v},_);i.querySelector("#ikr-stars-input").appendChild(d);var c=i.querySelector("#ikr-file-input"),o=i.querySelector("#ikr-photo-previews"),p=!1,u=i.querySelector("label.ikr-photo-btn"),k=3;function m(){var v=a.length;v>=k?(c.disabled=!0,u&&(u.style.opacity="0.4")):(c.disabled=!1,u&&(u.style.opacity="1"))}return c.onchange=async function(v){if(!p){p=!0,c.disabled=!0;var f=k-a.length,h=Array.from(v.target.files).slice(0,f);for(let C=0;C<h.length;C++){let x=h[C];if(x.size>5*1024*1024){alert(x.name+" dosyas\u0131 5MB s\u0131n\u0131r\u0131n\u0131 a\u015F\u0131yor. L\xFCtfen daha k\xFC\xE7\xFCk bir g\xF6rsel se\xE7in.");continue}let z=document.createElement("div");z.className="ikr-preview-item";let E=URL.createObjectURL(x);z.innerHTML='<img class="ikr-preview-img" src="'+E+'"><div class="ikr-preview-loading"><div class="ikr-spinner"></div></div>',o.appendChild(z);let w=z.querySelector(".ikr-preview-loading");if(typeof window!="undefined"&&window.__ikasPreviewMode){a.push(E),w.innerHTML='<span class="ikr-upload-check">\u2713</span>',setTimeout(function(){w.style.opacity="0",w.style.transition="opacity 0.4s",setTimeout(function(){w.style.display="none";let S=document.createElement("button");S.className="ikr-preview-remove",S.innerHTML="&#x2715;",S.setAttribute("aria-label","Foto\u011Fraf\u0131 kald\u0131r"),S.onclick=function(){a=a.filter(function(y){return y!==E}),z.remove(),m()},z.appendChild(S)},400)},800);continue}try{let S=await X(V+"/api/public/upload/sign",{method:"POST"});if(!S.ok)throw S.status===429?new Error("rate_limit"):new Error("sign failed");let y=await S.json(),T=new FormData;T.append("file",x),T.append("api_key",y.api_key),T.append("timestamp",y.timestamp),T.append("signature",y.signature),T.append("folder","review_images");let j=await(await fetch("https://api.cloudinary.com/v1_1/"+y.cloud_name+"/image/upload",{method:"POST",body:T})).json();if(j.secure_url){let D=j.secure_url;a.push(D),w.innerHTML='<span class="ikr-upload-check">\u2713</span>',setTimeout(function(){w.style.opacity="0",w.style.transition="opacity 0.4s",setTimeout(function(){w.style.display="none";let I=document.createElement("button");I.className="ikr-preview-remove",I.innerHTML="&#x2715;",I.setAttribute("aria-label","Foto\u011Fraf\u0131 kald\u0131r"),I.onclick=function(){a=a.filter(function(K){return K!==D}),z.remove(),m()},z.appendChild(I)},400)},800)}}catch(S){console.error("[ikr] Image upload failed:",S);var g=S.message==="rate_limit"?"\xC7ok fazla deneme. L\xFCtfen bekleyin.":"Y\xFCkleme ba\u015Far\u0131s\u0131z.";w.innerHTML='<span class="ikr-upload-error">\u2717 '+g+"</span>"}}p=!1,c.value="",m()}},i.querySelector("#ikr-submit").onclick=async function(){var v=this,f=i.querySelector("#ikr-name").value.trim(),h=i.querySelector("#ikr-title").value.trim(),g=i.querySelector("#ikr-comment").value.trim(),C=i.querySelector("#ikr-msg");if(!t){C.innerHTML='<div style="color:#dc2626;font-size:12px;margin-top:8px;">L\xFCtfen bir y\u0131ld\u0131z se\xE7in.</div>';return}if(!f){C.innerHTML='<div style="color:#dc2626;font-size:12px;margin-top:8px;">L\xFCtfen ad\u0131n\u0131z\u0131 girin.</div>';return}if(v.disabled=!0,v.textContent="G\xF6nderiliyor\u2026",C.innerHTML="",typeof window!="undefined"&&window.__ikasPreviewMode){setTimeout(function(){i.innerHTML='<div style="text-align:center;padding:30px 20px;"><div style="font-weight:700;font-size:14px;color:var(--ikr-color,#000);">Yorumunuz i\xE7in te\u015Fekk\xFCrler!</div></div>'},600);return}try{var x=O(window.location.href),z=r||(document.querySelector("h1")?document.querySelector("h1").innerText.trim():null),E=await X(V+"/api/public/reviews",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({storeId:q,productId:e,slug:x||null,productName:z,author:f,title:h||null,comment:g,rating:t,images:a})},15e3);if(E.ok)i.innerHTML='<div style="text-align:center;padding:30px 20px;"><div style="font-weight:700;font-size:14px;color:var(--ikr-color,#000);">Yorumunuz i\xE7in te\u015Fekk\xFCrler!</div></div>';else{var w=await E.json().catch(function(){return{}});throw new Error(w.error||"Yorum kaydedilemedi.")}}catch(N){var S=N&&(N.name==="AbortError"||/signal/i.test(N.message||"")),y=S?"Ba\u011Flant\u0131 yava\u015F, l\xFCtfen tekrar deneyin.":N.message||"Yorum g\xF6nderilemedi.",T=document.createElement("div");T.style.cssText="color:#dc2626;font-size:12px;margin-top:8px;",T.textContent=y,C.innerHTML="",C.appendChild(T),v.disabled=!1,v.textContent="G\xF6nder"}},i}function Dr(e){if(e)for(var r=document.querySelectorAll("h1,h2,h3,h4,h5,h6,div,span,p"),i=0;i<r.length;i++){var t=r[i];if(t.children.length===0&&t.textContent.trim()===e&&t.tagName!=="TITLE"&&!t.closest("[data-ikr-listing-badge]")&&!t.closest("#ikas-reviews")&&!t.closest("nav")&&!t.closest("header")&&!t.closest('[class*="breadcrumb"]')&&!t.closest('[aria-label*="breadcrumb"]'))return t}return document.querySelector("h1")}var Fr={small:{icon:14,text:"12px"},medium:{icon:16,text:"14px"},large:{icon:20,text:"16px"}};function Ii(e,r,i,t,a){var n=Pe(r,i),s="width:"+a+"px;height:"+a+"px;";return'<span style="color:'+t+';display:inline-flex;align-items:center;line-height:1;">'+J(e,n,{sizeStyle:s})+"</span>"}function Yr(e,r,i,t){var a=document.getElementById("ikr-rating-badge");if(a&&a.remove(),!!e&&!(t&&t.enabled===!1)){var n=document.getElementById("ikr-jsonld");n&&n.remove();var s=document.createElement("script");s.id="ikr-jsonld",s.type="application/ld+json",s.textContent=JSON.stringify({"@context":"https://schema.org","@type":"Product",name:i||document.title,url:window.location.href,aggregateRating:{"@type":"AggregateRating",ratingValue:e,reviewCount:r,bestRating:"5",worstRating:"1"}}),document.head.appendChild(s);var l=Dr(i);if(!(!l||!l.parentNode)){var d=t&&t.icon||"star",c=t&&t.iconStyle||"classic",o=t&&t.size||"medium",p=t&&t.color||"#f59e0b",u=Fr[o]||Fr.medium,k=document.createElement("a");k.id="ikr-rating-badge",k.href="#ikas-reviews";var m=window.getComputedStyle(l).textAlign,v=m==="center"?"center":m==="right"?"flex-end":"flex-start";k.style.cssText="display:flex;align-items:center;gap:5px;text-decoration:none;margin-bottom:10px;cursor:pointer;font-weight:400;justify-content:"+v+";",k.innerHTML=Ii(e,d,c,p,u.icon)+'<span style="font-size:'+u.text+';font-weight:400;color:#555;">'+e+" ("+r+" yorum)</span>",k.onclick=function(f){f.preventDefault();var h=document.getElementById("ikas-reviews-widget")||document.getElementById("ikas-reviews");if(h){var g=document.querySelector("header"),C=g?g.getBoundingClientRect().height:0,x=h.getBoundingClientRect().top+window.pageYOffset-C-16;window.scrollTo({top:x,behavior:"smooth"})}},l.parentNode.insertBefore(k,l.nextSibling)}}}var Gr=`
  /* Widget d\u0131\u015F kutu \u2014 full-bleed: ma\u011Faza temas\u0131 widget'\u0131 padding'li bir
     section/container i\xE7ine koymu\u015F olsa bile, viewport geni\u015Fli\u011Finde yay\u0131l\u0131r.
     Teknik: width:100vw + margin-left:calc(-50vw + 50%). Bu kural widget'\u0131
     parent container'\u0131n padding'inden "d\u0131\u015Far\u0131 ta\u015F\u0131r\u0131r". Arka plan\u0131 temadan
     gelir, i\xE7erideki b\xF6l\xFCmler > * kural\u0131yla 1200px ortalan\u0131r.
     NOT: 100vw scrollbar'\u0131 hesaba katmaz \u2014 scroll varsa margin-left yerine
     parent.getBoundingClientRect() ile runtime d\xFCzeltme de yap\u0131labilir, ama
     genelde bu kural yeterli. */
  #ikas-reviews-widget{color:var(--ikr-text,rgba(0,0,0,1));background:var(--ikr-widget-bg,var(--ikr-bg,transparent));border:1px solid var(--ikr-widget-border,transparent);width:100vw;max-width:100vw;margin-left:calc(50% - 50vw);margin-right:calc(50% - 50vw);margin-top:40px;margin-bottom:40px;padding:40px 16px;box-sizing:border-box;--ikr-gap-tight:4px;--ikr-gap-normal:8px;--ikr-gap-loose:16px;--ikr-gap-section:24px;--ikr-pad-summary-mobile:4px;--ikr-pad-review-mobile:10px;}
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
  .ikr-title{font-size:var(--ikr-title-size,24px);font-weight:500;text-align:center;margin-bottom:12px;color:var(--ikr-header-title,var(--ikr-text,rgba(0,0,0,1)));}

  /* \u2500\u2500\u2500 SVG ICON WRAPPER \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
     .ikr-icon span'\u0131 SVG'yi sarar. Boyut parent'tan (em veya inline style) gelir,
     SVG de ona g\xF6re \xF6l\xE7eklenir. color \u2192 fill (currentColor) \u2014 yani renk
     .ikr-icon'a veya parent'\u0131na verildi\u011Finde SVG o rengi al\u0131r. */
  .ikr-icon{display:inline-flex;align-items:center;justify-content:center;line-height:1;flex-shrink:0;}
  .ikr-icon > svg{width:100%;height:100%;display:block;}

  /* \u2500\u2500\u2500 PARTIAL STARS (yar\u0131m y\u0131ld\u0131z overlay) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
     Empty katman tabanda, filled katman \xFCstte clip ile %X kadar g\xF6sterilir.
     Loox/Yotpo/Material UI Rating standard\u0131. Boyut yine .ikr-icon parent'\u0131ndan
     gelir (.ikr-hero-stars .ikr-icon { width:22px } gibi).
     gap parent'tan (.ikr-stars-partial-empty/fill inline-flex) miras al\u0131nmaz \u2014
     overlay ayn\u0131 yap\u0131y\u0131 tekrar etti\u011Fi i\xE7in iki katman birebir \xFCst \xFCste oturur. */
  .ikr-stars-partial{position:relative;display:inline-flex;line-height:1;}
  .ikr-stars-partial-empty,.ikr-stars-partial-fill{display:inline-flex;gap:2px;align-items:center;}
  .ikr-stars-partial-empty{opacity:0.22;}
  .ikr-stars-partial-fill{
    position:absolute;left:0;top:0;height:100%;
    overflow:hidden;pointer-events:none;
  }

  /* \u2500\u2500\u2500 SUMMARY LAYOUT \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
     Her blok ba\u011F\u0131ms\u0131z \u2014 s\u0131ra/gizleme CSS ile kolayca de\u011Fi\u015Ftirilebilir.
     Kolon geni\u015Flikleri CSS variable ile payla\u015F\u0131l\u0131r (label/count s\xFCtunlar\u0131).
     Bu sayede bar-row ve actions-row ayn\u0131 hizada kal\u0131r. */
  .ikr-summary{
    --ikr-col-label:104px;
    --ikr-col-count:60px;
    --ikr-col-gap:4px;
    --ikr-summary-max:340px;
    display:flex;flex-direction:column;align-items:center;gap:12px;
    padding:16px 28px 24px;border-radius:var(--ikr-radius,6px);margin:0 auto 24px;
  }
  .ikr-summary-block{display:flex;flex-direction:column;align-items:center;width:100%;max-width:var(--ikr-summary-max);}

  /* Blok: Ortalama puan (b\xFCy\xFCk) */
  .ikr-summary-avg{flex-direction:row;gap:8px;max-width:none;width:auto;}
  .ikr-avg-star{width:var(--ikr-avg-star-size,52px);height:var(--ikr-avg-star-size,52px);color:var(--ikr-review-star-color,#f59e0b);line-height:1;}
  .ikr-avg-num{font-size:var(--ikr-avg-rating-size,46px);font-weight:500;line-height:1;color:var(--ikr-header-avg,var(--ikr-text,rgba(0,0,0,1)));}

  /* Blok: Toplam yorum say\u0131s\u0131 */
  .ikr-summary-count{font-size:var(--ikr-review-count-size,16px);color:var(--ikr-header-count,var(--ikr-text,rgba(0,0,0,1)));white-space:nowrap;font-weight:400;max-width:none;width:auto;}

  /* Blok: Tavsiye y\xFCzdesi */
  .ikr-summary-recommend{display:block;font-size:var(--ikr-recommend-size,14px);color:var(--ikr-header-recommend,var(--ikr-text,rgba(0,0,0,1)));text-align:center;max-width:none;width:auto;}
  .ikr-recommend-pct{font-weight:700;color:var(--ikr-header-recommend,var(--ikr-text,rgba(0,0,0,1)));margin-right:3px;}

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
  @media(hover:hover){.ikr-bar-row:hover{background:var(--ikr-bar-hover-bg,var(--ikr-color-light));}}
  .ikr-bar-active{background:var(--ikr-bar-hover-bg,var(--ikr-color-light))!important;}
  .ikr-bar-label{flex:0 0 var(--ikr-col-label);display:inline-flex;align-items:center;gap:2px;white-space:nowrap;font-size:var(--ikr-bar-label-size,16px);color:var(--ikr-bar-label,var(--ikr-text,rgba(0,0,0,1)));}
  .ikr-bar-star{width:var(--ikr-bar-label-size,20px);height:var(--ikr-bar-label-size,20px);}
  .ikr-bar-star-filled{color:var(--ikr-review-star-color,#f59e0b);}
  .ikr-bar-star-empty{color:var(--ikr-bar-track,#e5e7eb);}
  .ikr-bar-track{flex:1 1 auto;min-width:0;background:var(--ikr-bar-track,var(--ikr-track-bg,rgba(0,0,0,0.10)));border-radius:var(--ikr-radius-sm,4px);height:10px;overflow:hidden;}
  .ikr-bar-fill{height:10px;background:var(--ikr-bar-fill,var(--ikr-text,rgba(0,0,0,1)));border-radius:var(--ikr-radius-sm,4px);}
  .ikr-bar-count{flex:0 0 var(--ikr-col-count);white-space:nowrap;text-align:right;color:var(--ikr-bar-count,var(--ikr-text,rgba(0,0,0,1)));font-size:var(--ikr-bar-count-size,14px);}

  /* Blok: Aksiyon sat\u0131r\u0131 (yorum yap + filtre) \u2014 bar row sol kenar\u0131ndan ba\u015Flar, filtre count hizas\u0131nda.
     Padding yok ki wrapper tam 340px kullansin; bar chart ile kenar hizasi
     tutsun. Bar row'un kendi 3px 6px padding'i hover alani icin, actions'in
     buna ihtiyaci yok. */
  .ikr-summary-actions{
    display:flex;flex-direction:row;align-items:center;gap:var(--ikr-col-gap);
    box-sizing:border-box;
  }
  .ikr-write-btn{flex:1 1 auto;min-width:0;background:var(--ikr-btn-bg,var(--ikr-color,#000));color:var(--ikr-btn-text,var(--ikr-color-text,#fff));padding:12px 24px;border-radius:var(--ikr-radius,6px);cursor:pointer;border:2px solid var(--ikr-btn-border,var(--ikr-color,#000));font-weight:400;font-size:var(--ikr-btn-text-size,14px);white-space:nowrap;}
  .ikr-filter-wrap{flex:0 0 var(--ikr-col-count);position:relative;display:flex;justify-content:flex-end;}
  .ikr-filter-btn{display:flex;align-items:center;justify-content:center;width:44px;height:44px;border-radius:var(--ikr-radius,6px);border:2px solid var(--ikr-filter-btn-border,var(--ikr-color,#000));background:var(--ikr-filter-btn-bg,var(--ikr-color,#000));color:var(--ikr-filter-btn-text,var(--ikr-color-text,#fff));cursor:pointer;}
  .ikr-filter-btn-active{opacity:0.85;}

  /* Filtre dropdown (wrap yukar\u0131da tan\u0131mland\u0131) */
  /* Filter dropdown \u2014 Loox-style growOut animasyonu (200ms ease-in-out) */
  @keyframes ikr-grow-out {
    0%   { opacity: 0; transform: scale(0.7) translateY(-20px); }
    100% { opacity: 1; transform: scale(1) translateY(0); }
  }
  .ikr-filter-menu{position:absolute;top:calc(100% + 6px);right:0;background:var(--ikr-filter-menu-bg,var(--ikr-surface,#fff));border:1px solid var(--ikr-filter-menu-border,var(--ikr-border,rgba(0,0,0,0.12)));border-radius:var(--ikr-radius,6px);box-shadow:0 4px 16px rgba(0,0,0,0.08);min-width:180px;overflow:hidden;z-index:999;visibility:hidden;opacity:0;pointer-events:none;transform-origin:top right;}
  .ikr-filter-menu.ikr-open{visibility:visible;pointer-events:auto;animation:ikr-grow-out 200ms ease-in-out forwards;}
  .ikr-filter-item{padding:10px 16px;font-size:var(--ikr-filter-text-size,14px);color:var(--ikr-filter-item-text,var(--ikr-text,rgba(0,0,0,1)));cursor:pointer;}
  @media(hover:hover){.ikr-filter-item:hover{background:var(--ikr-filter-item-hover-bg,var(--ikr-color-light));}}
  .ikr-filter-item-active{font-weight:700;color:var(--ikr-filter-item-active,var(--ikr-color,#000));}

  /* Foto\u011Frafl\u0131 Yorumlar b\xF6l\xFCm\xFC */
  .ikr-photo-section{margin-bottom:24px;}
  .ikr-photo-strip-wrap{position:relative;}
  .ikr-photo-strip{display:flex;gap:8px;overflow-x:auto;padding-bottom:4px;scrollbar-width:none;}
  .ikr-photo-strip::-webkit-scrollbar{display:none;}
  .ikr-photo-thumb{width:var(--ikr-thumbnail-size,90px);height:var(--ikr-thumbnail-size,90px);object-fit:cover;border-radius:var(--ikr-radius,6px);cursor:pointer;border:1px solid var(--ikr-photo-border,var(--ikr-border,rgba(0,0,0,0.10)));transition:transform 0.2s,border-color 0.2s;flex-shrink:0;}
  @media(hover:hover){.ikr-photo-thumb:hover{transform:scale(1.03);border-color:var(--ikr-color,#000);}}

  .ikr-photo-strip-arrow{position:absolute;top:50%;transform:translateY(-50%);z-index:10;background:var(--ikr-photo-bg,var(--ikr-surface,rgba(255,255,255,0.95)));border:1px solid var(--ikr-photo-border,var(--ikr-border,rgba(0,0,0,0.12)));border-radius:var(--ikr-radius,6px);width:32px;height:32px;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:18px;color:var(--ikr-photo-title,var(--ikr-text,rgba(0,0,0,1)));box-shadow:0 2px 8px rgba(0,0,0,0.08);transition:all 0.2s ease;}
  @media(hover:hover){.ikr-photo-strip-arrow:hover{background:var(--ikr-photo-bg,var(--ikr-surface,#fff));transform:translateY(-50%) scale(1.08);box-shadow:0 4px 12px rgba(0,0,0,0.12);}}
  .ikr-photo-strip-arrow-prev{left:-16px;}
  .ikr-photo-strip-arrow-next{right:-16px;}
  @media(max-width:600px){.ikr-photo-strip-arrow{display:none;}}

  /* Yorumlar */
  /* Card review item \u2014 yan padding mobile'da --ikr-pad-review-mobile uzerinden
     (mobile blo\u011Funda set edilir). Burada sadece top/bottom; shorthand yerine
     ayr\u0131 property ki mobile yan override'\u0131 specificity sava\u015F\u0131nda kaybetmesin. */
  .ikr-review{padding-top:20px;padding-bottom:20px;border-bottom:1px solid var(--ikr-review-border,var(--ikr-separator,rgba(0,0,0,0.08)));}
  .ikr-review-top{display:flex;align-items:flex-start;justify-content:space-between;gap:8px;}
  .ikr-review-top-left{display:flex;align-items:center;gap:8px;flex-wrap:wrap;}
  .ikr-review-stars{display:inline-flex;gap:2px;align-items:center;}
  .ikr-review-stars .ikr-icon{width:var(--ikr-star-size,20px);height:var(--ikr-star-size,20px);}
  /* Yorum item dikey ritm: stars\u2192title (normal), title\u2192author (normal),
     author\u2192body (normal), body\u2192reply (loose). Bkz: gap s\xF6zle\u015Fmesi (\xFCst yorum). */
  .ikr-review-title{font-weight:600;font-size:var(--ikr-review-title-size,16px);color:var(--ikr-review-title,var(--ikr-text,rgba(0,0,0,1)));margin-top:var(--ikr-gap-normal);}
  .ikr-author{font-size:var(--ikr-author-size,14px);font-weight:600;font-style:normal;color:var(--ikr-review-author,var(--ikr-text,rgba(0,0,0,1)));margin-top:var(--ikr-gap-normal);}
  .ikr-date{color:var(--ikr-review-date,var(--ikr-text,rgba(0,0,0,1)));font-size:var(--ikr-review-date-size,12px);font-weight:400;white-space:nowrap;flex-shrink:0;}
  .ikr-body{margin-top:var(--ikr-gap-normal);line-height:1.65;color:var(--ikr-review-body,var(--ikr-text,rgba(0,0,0,1)));font-size:var(--ikr-review-text-size,14px);font-weight:400;}
  .ikr-body-clamped{display:-webkit-box;-webkit-line-clamp:4;-webkit-box-orient:vertical;overflow:hidden;}
  .ikr-read-more{display:block;margin-top:var(--ikr-gap-tight);color:var(--ikr-review-body,var(--ikr-text,rgba(0,0,0,1)));font-weight:600;cursor:pointer;font-size:var(--ikr-read-more-size,12px);}
  .ikr-gallery{display:flex;gap:10px;flex-wrap:wrap;margin-top:var(--ikr-gap-loose);}
  .ikr-img{width:var(--ikr-card-photo-w,var(--ikr-thumbnail-size,90px));height:var(--ikr-card-photo-w,var(--ikr-thumbnail-size,90px));object-fit:cover;border-radius:var(--ikr-radius,6px);border:1px solid var(--ikr-photo-border,var(--ikr-border,rgba(0,0,0,0.10)));cursor:zoom-in;}
  .ikr-reply{margin-top:var(--ikr-gap-loose);padding:12px 16px;background:var(--ikr-reply-bg-color,var(--ikr-reply-bg,rgba(0,0,0,0.03)));border-radius:var(--ikr-radius,6px);border-left:3px solid var(--ikr-reply-border,var(--ikr-color,#000));}
  .ikr-reply-header{display:flex;align-items:center;gap:8px;margin-bottom:6px;}
  .ikr-reply-label{font-weight:600;font-size:var(--ikr-reply-name-size,13px);color:var(--ikr-reply-label,var(--ikr-text,rgba(0,0,0,1)));}
  .ikr-reply-text{font-size:var(--ikr-reply-text-size,13px);font-weight:400;color:var(--ikr-reply-text,var(--ikr-text,rgba(0,0,0,1)));line-height:1.6;}
  /* Reply clamp: yorum metni (.ikr-body-clamped) 4 sat\u0131r; reply 2 sat\u0131r
     (subordinate, m\xFC\u015Fteri yorumundan k\u0131sa kal\u0131r). "Devam\u0131n\u0131 oku" sadece
     clamp devreye girdiyse g\xF6r\xFCn\xFCr \u2014 buildReplyEl helper'\u0131 runtime kontrol eder. */
  .ikr-reply-text-clamped{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}
  .ikr-reply-read-more{margin-top:var(--ikr-gap-tight);}

  /* Accordion form wrapper */
  #ikr-form-accordion{overflow:hidden;transition:max-height 0.35s ease,opacity 0.25s ease;}

  /* Form */
  .ikr-form{background:var(--ikr-form-bg,var(--ikr-surface,#fff));border:1px solid var(--ikr-form-border,var(--ikr-border,rgba(0,0,0,0.08)));padding:25px;border-radius:var(--ikr-radius,6px);margin:16px auto;color:var(--ikr-review-body,var(--ikr-text,rgba(0,0,0,1)));}
  .ikr-form label{font-size:14px;color:var(--ikr-review-body,var(--ikr-text,rgba(0,0,0,1)));}
  .ikr-input,.ikr-textarea{width:100%;padding:10px;margin-top:8px;background:var(--ikr-input-bg-color,var(--ikr-input-bg,#fff));border:1px solid var(--ikr-input-border,var(--ikr-border,rgba(0,0,0,0.20)));border-radius:var(--ikr-radius,6px);font-size:14px;box-sizing:border-box;color:var(--ikr-input-text-color,var(--ikr-input-text,rgba(0,0,0,0.90)));}
  /* Karakter sayac\u0131 \u2014 textarea alt\u0131, sa\u011Fa hizal\u0131, soluk renk. Limit doluyken
     k\u0131rm\u0131z\u0131 (max modifier). aria-live="polite" ekran okuyucu deste\u011Fi i\xE7in. */
  .ikr-char-counter{font-size:12px;color:var(--ikr-review-date,rgba(0,0,0,0.55));text-align:right;margin-top:4px;}
  .ikr-char-counter--max{color:#dc2626;}
  .ikr-input::placeholder,.ikr-textarea::placeholder{font-size:14px;color:var(--ikr-placeholder,var(--ikr-text-faint,rgba(0,0,0,0.35)));}
  .ikr-btn{background:var(--ikr-btn-bg,var(--ikr-color,#000));color:var(--ikr-btn-text,var(--ikr-color-text,#fff));padding:12px 24px;border-radius:var(--ikr-radius,6px);cursor:pointer;border:2px solid var(--ikr-btn-border,var(--ikr-color,#000));font-weight:700;font-size:14px;margin-top:15px;width:100%}
  .ikr-btn:disabled{opacity:.6;cursor:not-allowed}

  /* Daha Fazla G\xF6ster butonu \u2014 tema uyumlu, outline stil */
  .ikr-load-more{display:block;margin:20px auto 0;padding:10px 28px;border:1px solid var(--ikr-load-more-border,var(--ikr-border,rgba(0,0,0,0.30)));border-radius:var(--ikr-radius,6px);background:var(--ikr-load-more-bg,var(--ikr-surface,#fff));color:var(--ikr-load-more-text,var(--ikr-text,rgba(0,0,0,1)));font-size:var(--ikr-load-more-size,14px);cursor:pointer;}
  .ikr-load-more:disabled{opacity:.6;cursor:not-allowed;}

  /* Y\xFCkleniyor / bo\u015F durum mesajlar\u0131 \u2014 tema uyumlu */
  .ikr-state-msg{text-align:center;color:var(--ikr-text-faint,rgba(0,0,0,0.45));font-size:14px;padding:30px 0;}
  .ikr-state-loading{padding:40px;}
  .ikr-photo-btn{background:var(--ikr-reply-bg,rgba(0,0,0,0.03));color:var(--ikr-text,rgba(0,0,0,0.50));width:100%;height:56px;border-radius:var(--ikr-radius,6px);cursor:pointer;border:1px dashed var(--ikr-border,rgba(0,0,0,0.20));font-size:14px;display:flex;align-items:center;justify-content:center;box-sizing:border-box;}
  .ikr-preview-item{position:relative;display:inline-block;margin-right:8px;margin-top:8px;}
  .ikr-preview-remove{position:absolute;top:-6px;right:-6px;width:18px;height:18px;border-radius:50%;background:#fff;border:1px solid rgba(0,0,0,0.15);color:rgba(0,0,0,0.6);font-size:11px;line-height:1;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 1px 4px rgba(0,0,0,0.12);}
  @media(hover:hover){.ikr-preview-remove:hover{background:#fee2e2;border-color:#dc2626;color:#dc2626;}}
  .ikr-preview-img{width:90px;height:90px;object-fit:cover;border-radius:var(--ikr-radius,6px)}
  .ikr-preview-loading{position:absolute;top:0;left:0;width:100%;height:100%;background:rgba(255,255,255,.75);display:flex;align-items:center;justify-content:center;border-radius:var(--ikr-radius,6px);}
  .ikr-spinner{width:20px;height:20px;border:2px solid rgba(0,0,0,0.12);border-top-color:var(--ikr-color,#000);border-radius:50%;animation:ikrSpin 0.7s linear infinite;}
  @keyframes ikrSpin{to{transform:rotate(360deg);}}
  .ikr-upload-check{font-size:22px;color:#059669;line-height:1;}
  .ikr-upload-error{font-size:10px;color:#dc2626;line-height:1.3;text-align:center;padding:4px;word-break:break-word;}

  /* Review Modal */
  /* Modal document.body'ye portal'lan\u0131r \u2192 widget root scope'undan \xC7IKAR.
     Yorum item gap token'lar\u0131 (--ikr-gap-*) burada da yeniden tan\u0131mlan\u0131r
     ki modal-* selekt\xF6rleri base ile ayn\u0131 dili konu\u015Fsun. Tek do\u011Fruluk
     kayna\u011F\u0131 yine \xFCstteki s\xF6zle\u015Fme yorumudur. */
  .ikr-modal-overlay{position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;padding:16px;background:rgba(0,0,0,0.50);--ikr-gap-tight:4px;--ikr-gap-normal:8px;--ikr-gap-loose:16px;--ikr-gap-section:24px;}
  .ikr-modal-wrap{position:relative;width:100%;max-width:813px;}
  .ikr-photo-section{margin:24px 0 32px;padding:0 4px;display:block;}
  .ikr-photo-strip-container{position:relative;margin:0 -4px;}
  .ikr-photo-strip{display:flex;gap:10px;overflow-x:auto;padding:4px;scroll-behavior:smooth;-webkit-overflow-scrolling:touch;scrollbar-width:none;}
  .ikr-photo-strip::-webkit-scrollbar{display:none;}
  .ikr-photo-strip-thumb{flex:0 0 var(--ikr-thumbnail-size,90px);width:var(--ikr-thumbnail-size,90px);height:var(--ikr-thumbnail-size,90px);border-radius:var(--ikr-radius,8px);object-fit:cover;cursor:pointer;transition:transform 0.2s ease,box-shadow 0.2s ease;border:1px solid rgba(0,0,0,0.05);}
  @media(hover:hover){.ikr-photo-strip-thumb:hover{transform:translateY(-2px);box-shadow:0 6px 16px rgba(0,0,0,0.12);}}

  .ikr-photo-strip-wrap{position:relative;display:block;}

  .ikr-modal{background:var(--ikr-modal-bg,var(--ikr-bg,#fff));color:var(--ikr-modal-text,var(--ikr-text,rgba(0,0,0,1)));border-radius:calc(var(--ikr-radius, 8px) * 1.5);overflow:hidden;display:flex;width:100%;height:584px;max-height:80vh;box-shadow:0 16px 48px rgba(0,0,0,0.25);}
  .ikr-modal-left{flex:0 0 438px;background:#222;position:relative;overflow:hidden;}
  .ikr-modal-main-img{position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;display:block;}
  .ikr-modal-img-enter-right{animation:ikrSlideInRight 0.2s ease forwards;}
  .ikr-modal-img-enter-left{animation:ikrSlideInLeft 0.2s ease forwards;}
  @keyframes ikrSlideInRight{from{transform:translateX(60px);opacity:0;}to{transform:translateX(0);opacity:1;}}
  @keyframes ikrSlideInLeft{from{transform:translateX(-60px);opacity:0;}to{transform:translateX(0);opacity:1;}}
  .ikr-modal-close{position:absolute;top:-42px;right:0;background:var(--ikr-modal-close-bg,var(--ikr-color,#000));border:2px solid var(--ikr-modal-close-border,var(--ikr-color,#000));color:var(--ikr-modal-close-text,var(--ikr-color-text,#fff));font-size:14px;cursor:pointer;line-height:1;padding:0;border-radius:var(--ikr-radius,6px);width:32px;height:32px;display:flex;align-items:center;justify-content:center;z-index:100000;box-shadow:0 2px 8px rgba(0,0,0,0.20);}
  @media(hover:hover){.ikr-modal-close:hover{opacity:0.85;}}
  @media(max-width:640px){.ikr-modal-close{display:none;}}
  .ikr-modal-close-mobile{display:none;position:absolute;top:12px;right:12px;background:rgba(0,0,0,0.45);border:none;color:#fff;width:32px;height:32px;border-radius:var(--ikr-radius,6px);font-size:15px;cursor:pointer;align-items:center;justify-content:center;line-height:1;z-index:2;}
  @media(hover:hover){.ikr-modal-close-mobile:hover{background:rgba(0,0,0,0.70);}}
  .ikr-modal-nav{position:absolute;top:50%;transform:translateY(-50%);background:var(--ikr-modal-nav-bg,rgba(0,0,0,0.45));border:none;color:var(--ikr-modal-nav-text,#fff);width:36px;height:36px;border-radius:var(--ikr-radius,6px);cursor:pointer;font-size:18px;display:flex;align-items:center;justify-content:center;line-height:1;}
  .ikr-modal-nav-prev{left:10px;}
  .ikr-modal-nav-next{right:10px;}
  .ikr-modal-thumbs{position:absolute;bottom:12px;left:0;right:0;display:flex;justify-content:center;gap:6px;padding:0 12px;}
  .ikr-modal-thumb{width:52px;height:52px;object-fit:cover;border-radius:var(--ikr-radius,6px);cursor:pointer;border:2px solid transparent;opacity:0.7;}
  .ikr-modal-thumb-active{border-color:#fff;opacity:1;}
  .ikr-modal-right{flex:1;min-width:0;min-height:0;overflow-y:auto;padding:0;display:flex;flex-direction:column;background:var(--ikr-modal-bg,var(--ikr-bg,#fff));color:var(--ikr-modal-text,var(--ikr-text,rgba(0,0,0,1)));}
  /* Flex zincirinde her seviye min-width:0 olmazsa unbreakable string parent'\u0131 zorlar.
     scroll-content de flex column \u2192 child'lar\u0131 (modal-body vs.) shrink edebilsin diye
     burada da min-width:0 zorunlu. overflow-wrap:anywhere ancak shrink m\xFCmk\xFCnse i\u015F g\xF6r\xFCr. */
  .ikr-modal-scroll-content > *{min-width:0;}
  .ikr-modal-top-row{display:flex;align-items:center;justify-content:space-between;gap:12px;}
  .ikr-modal-stars{display:inline-flex;gap:2px;align-items:center;}
  .ikr-modal-stars .ikr-icon{width:var(--ikr-star-size,24px);height:var(--ikr-star-size,24px);}
  .ikr-modal-date{font-size:var(--ikr-review-date-size,12px);font-weight:400;color:var(--ikr-review-date,var(--ikr-modal-text,var(--ikr-text,rgba(0,0,0,1))));white-space:nowrap;flex-shrink:0;}
  /* Modal yorum item dikey ritm \u2014 base ile ayn\u0131 s\xF6zle\u015Fme. scroll-content
     uniform gap kullanmaz, her child kendi margin-top'unu token ile al\u0131r. */
  .ikr-modal-title{font-weight:600;font-size:var(--ikr-review-title-size,16px);color:var(--ikr-review-title,var(--ikr-modal-text,var(--ikr-text,rgba(0,0,0,1))));margin-top:var(--ikr-gap-normal);}
  .ikr-modal-author{font-size:var(--ikr-author-size,14px);font-weight:600;font-style:normal;color:var(--ikr-review-author,var(--ikr-modal-text,var(--ikr-text,rgba(0,0,0,1))));margin-top:var(--ikr-gap-normal);}
  .ikr-modal-scroll-content{padding:24px 24px 24px;display:flex;flex-direction:column;min-width:0;}
  .ikr-modal-body{font-size:var(--ikr-review-text-size,14px);font-weight:400;line-height:1.65;color:var(--ikr-review-body,var(--ikr-modal-text,var(--ikr-text,rgba(0,0,0,1))));margin-top:var(--ikr-gap-normal);}
  .ikr-modal-reply{margin-top:var(--ikr-gap-loose);padding:12px 16px;background:var(--ikr-modal-reply-bg,var(--ikr-reply-bg-color,var(--ikr-reply-bg,rgba(0,0,0,0.03))));border-radius:var(--ikr-radius,6px);border-left:3px solid var(--ikr-modal-reply-border,var(--ikr-reply-border,var(--ikr-color,#000)));}
  .ikr-modal-reply-label{font-weight:600;font-size:var(--ikr-reply-name-size,13px);color:var(--ikr-reply-label,var(--ikr-modal-text,var(--ikr-text,rgba(0,0,0,1))));margin-bottom:4px;}
  .ikr-modal-reply-text{font-size:var(--ikr-reply-text-size,13px);font-weight:400;color:var(--ikr-reply-text,var(--ikr-modal-text,var(--ikr-text,rgba(0,0,0,1))));line-height:1.6;}

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
    .ikr-btn{width:100%;}
    /* Gallery \u2014 foto\u011Frafl\u0131 yorumlar strip'i mant\u0131\u011F\u0131: flex-wrap:nowrap +
       overflow-x:auto, thumb'lar flex-shrink:0 ile orjinal boyutta kal\u0131yor,
       s\u0131\u011Fmayanlar yatay scroll'da kayd\u0131r\u0131l\u0131yor. */
    .ikr-gallery{flex-wrap:nowrap;overflow-x:auto;padding-bottom:4px;scrollbar-width:none;}
    .ikr-gallery::-webkit-scrollbar{display:none;}
    .ikr-img{flex-shrink:0;}
  }
`;var sr={};le(sr,{meta:()=>Hi,render:()=>qi});function we(e){var r=e.ratingCounts,i=e.allCount,t=e.iconPair,a=e.currentRatingFilter,n=e.onFilterChange,s=document.createElement("div");s.className="ikr-summary-block ikr-summary-bars";for(var l=5;l>=1;l--){var d=r[l-1]||0,c=i>0?Math.round(d/i*100):0,o=a===l,p=document.createElement("div");p.className="ikr-bar-row"+(o?" ikr-bar-active":""),a&&!o&&(p.style.opacity="0.35");for(var u="",k=1;k<=5;k++){var m=k<=l;u+='<span class="ikr-bar-star ikr-icon '+(m?"ikr-bar-star-filled":"ikr-bar-star-empty")+'">'+(m?t.filled:t.empty)+"</span>"}p.innerHTML='<span class="ikr-bar-label">'+u+'</span><div class="ikr-bar-track"><div class="ikr-bar-fill" style="width:'+c+'%;"></div></div><span class="ikr-bar-count">('+d.toLocaleString("tr-TR")+")</span>",(function(v){p.onclick=function(){n(v)}})(l),s.appendChild(p)}return s}var Q=[],Ur=!1;function Oi(e){for(var r=Q.length-1;r>=0;r--){var i=Q[r];i.trigger&&i.trigger.contains(e.target)||i.element&&i.element.contains(e.target)||i.close()}}function Pi(e){if(e.key==="Escape")for(var r=Q.length-1;r>=0;r--)Q[r].close()}function Mi(){Ur||typeof document=="undefined"||(document.addEventListener("click",Oi,!0),document.addEventListener("keydown",Pi),Ur=!0)}function Ke(e){for(var r=0;r<Q.length;r++)Q[r]!==e&&Q[r].close()}function Ve(e){Mi();var r={trigger:e.trigger,element:e.element,close:e.close};return Q.push(r),function(){var t=Q.indexOf(r);t!==-1&&Q.splice(t,1)}}function ee(e){var r=e.widget,i=e.currentOrderBy,t=e.currentHasImages,a=e.onWriteClick,n=e.onSortChange,s=document.createElement("div");s.className="ikr-summary-block ikr-summary-actions";var l=document.createElement("button");l.className="ikr-write-btn",l.textContent="Yorum Yap",l.onclick=a,s.appendChild(l);var d=document.createElement("div");d.className="ikr-filter-wrap";var c=document.createElement("button");c.className="ikr-filter-btn",c.setAttribute("aria-label","Filtrele"),c.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="4" y1="6" x2="20" y2="6"/><line x1="7" y1="12" x2="17" y2="12"/><line x1="10" y1="18" x2="14" y2="18"/></svg>';var o=document.createElement("div");o.className="ikr-filter-menu";var p=[["newest","En Yeni",!1],["highest","En Y\xFCksek Puan",!1],["lowest","En D\xFC\u015F\xFCk Puan",!1],["photos","Foto\u011Frafl\u0131",!0]];function u(){o.classList.remove("ikr-open"),c.classList.remove("ikr-filter-btn-active")}function k(){Ke(m),o.classList.add("ikr-open"),c.classList.add("ikr-filter-btn-active")}p.forEach(function(v){var f=v[2],h=f?t:!t&&(i||"newest")===v[0],g=document.createElement("div");g.className="ikr-filter-item"+(h?" ikr-filter-item-active":""),g.textContent=v[1],g.onclick=function(){u(),n(v[0],f)},o.appendChild(g)}),c.onclick=function(){o.classList.contains("ikr-open")?u():k()};var m=Ve({trigger:d,element:o,close:u});return d.appendChild(c),d.appendChild(o),s.appendChild(d),s}function Y(){var e=document.getElementById("ikr-form-accordion");if(e){var r=e.style.maxHeight&&e.style.maxHeight!=="0px";r?(e.style.maxHeight="0px",e.style.opacity="0"):(e.style.maxHeight=e.scrollHeight+"px",e.style.opacity="1",setTimeout(function(){e.style.maxHeight="none"},360),setTimeout(function(){var i=document.querySelector("header"),t=i?i.getBoundingClientRect().height:0,a=e.getBoundingClientRect().top+window.pageYOffset-t-16;window.scrollTo({top:a,behavior:"smooth"})},50))}}var Hi={id:"classic",name:"Klasik (A\xE7\u0131k)"};function qi(e){var r=e.widget,i=e.data,t=e.settings,a=e.iconPair,n=e.allCount,s=e.ratingCounts,l=e.avgRatingVal,d=e.currentRatingFilter,c=e.currentOrderBy,o=e.currentHasImages,p=e.onFilterChange,u=e.onSortChange,k=document.createElement("div");k.className="ikr-summary";var m=(s[3]||0)+(s[4]||0),v=n>0?Math.round(m/n*100):0,f=document.createElement("div");f.className="ikr-summary-block ikr-summary-avg",f.innerHTML='<span class="ikr-avg-star ikr-icon">'+a.filled+'</span><span class="ikr-avg-num">'+l+"</span>",k.appendChild(f);var h=document.createElement("div");if(h.className="ikr-summary-block ikr-summary-count",h.textContent=n.toLocaleString("tr-TR")+" Yorum",k.appendChild(h),t.showRecommendation!==!1&&v>0){var g=document.createElement("div");g.className="ikr-summary-block ikr-summary-recommend",g.innerHTML='<span class="ikr-recommend-pct">%'+v+"</span> bu \xFCr\xFCn\xFC tavsiye ediyor",k.appendChild(g)}return k.appendChild(we({ratingCounts:s,allCount:n,iconPair:a,currentRatingFilter:d,onFilterChange:p})),k.appendChild(ee({widget:r,currentOrderBy:c,currentHasImages:o,onWriteClick:Y,onSortChange:u})),k}var dr={};le(dr,{css:()=>Di,meta:()=>ji,render:()=>Fi});var Kr=`
  /* Compact layout ba\u015Fl\u0131\u011F\u0131 sola hizal\u0131 */
  .ikr-title-compact{text-align:left;}

  /* Compact'te ana .ikr-summary padding'ini s\u0131f\u0131rla \u2014 y\u0131ld\u0131zlar ba\u015Fl\u0131k ile ayn\u0131 sol kenar */
  .ikr-summary-compact{display:flex;flex-direction:column;width:100%;gap:8px;padding:0;}

  .ikr-compact-header{
    display:flex;align-items:center;gap:12px;
    width:100%;padding:8px 0;
  }

  /* Trigger wrap \u2014 popover anchor'\u0131 (position:relative parent) */
  .ikr-compact-trigger-wrap{
    position:relative;flex:1 1 auto;min-width:0;display:flex;align-items:center;
  }

  .ikr-compact-trigger{
    display:flex;align-items:center;gap:10px;
    background:transparent;border:0;padding:8px 0;cursor:pointer;
    font-family:inherit;color:inherit;flex:0 0 auto;
  }
  .ikr-compact-trigger-stars{display:inline-flex;gap:2px;flex-shrink:0;}
  /* Compact trigger yildizlari kendi degiskeni; global bar-label-size'i etkilemez.
     Fallback bar-label-size, eski davranista geri donus icin. */
  .ikr-compact-trigger-stars .ikr-icon{
    width:var(--ikr-compact-star-size,var(--ikr-bar-label-size,20px));
    height:var(--ikr-compact-star-size,var(--ikr-bar-label-size,20px));
    color:var(--ikr-review-star-color,#f59e0b);line-height:1;
  }
  .ikr-compact-trigger-text{
    font-size:var(--ikr-review-count-size,16px);
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
  .ikr-compact-actions-slot .ikr-filter-wrap{flex:0 0 auto;}
  .ikr-compact-actions-slot .ikr-write-btn{flex:0 0 auto;}

  /* Mobile-only write sat\u0131r\u0131 */
  .ikr-compact-write-row{display:none;}
  .ikr-compact-write-row .ikr-write-btn{flex:1 1 auto;justify-content:center;}

  /* \u2500\u2500\u2500 POPOVER \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
     Loox-style: scale(0.7) translateY(-20px) \u2192 scale(1), opacity 0 \u2192 1.
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
    display:flex;flex-direction:column;align-items:center;gap:16px;
    padding:16px 28px 24px;
    border:1px solid var(--ikr-widget-border,var(--ikr-border,rgba(0,0,0,0.10)));
    border-radius:var(--ikr-radius,6px);
    background:var(--ikr-widget-bg,var(--ikr-surface,#fff));
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
      margin-top:8px;
    }
  }
`;var ji={id:"compact",name:"Kompakt (A\xE7\u0131l\u0131r)",sizeOverrides:{small:{"--ikr-compact-star-size":"20px"},medium:{"--ikr-compact-star-size":"24px"},large:{"--ikr-compact-star-size":"28px"}}},Di=Kr;function Fi(e){var r=e.widget,i=e.settings,t=e.iconPair,a=e.allCount,n=e.ratingCounts,s=e.avgRatingVal,l=e.currentRatingFilter,d=e.currentOrderBy,c=e.currentHasImages,o=e.onFilterChange,p=e.onSortChange,u=document.createElement("div");u.className="ikr-summary ikr-summary-compact";var k=document.createElement("div");k.className="ikr-compact-header";var m=document.createElement("div");m.className="ikr-compact-trigger-wrap";var v=document.createElement("button");v.className="ikr-compact-trigger",v.type="button",v.setAttribute("aria-expanded","false"),v.innerHTML='<span class="ikr-compact-trigger-stars">'+J(s,t)+'</span><span class="ikr-compact-trigger-text">'+a.toLocaleString("tr-TR")+' Yorum</span><span class="ikr-compact-chevron"><svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M7.11 5.16L2.16 0.21L0.75 1.62L7.11 7.98L13.48 1.62L12.06 0.21L7.11 5.16Z" fill="currentColor"/></svg></span>',m.appendChild(v),k.appendChild(m);var f=ee({widget:r,currentOrderBy:d,currentHasImages:c,onWriteClick:Y,onSortChange:p}),h=f.querySelector(".ikr-filter-wrap"),g=f.querySelector(".ikr-write-btn"),C=document.createElement("div");C.className="ikr-compact-actions-slot",g&&C.appendChild(g),h&&C.appendChild(h),k.appendChild(C),u.appendChild(k);var x=document.createElement("div");x.className="ikr-compact-panel",x.setAttribute("role","dialog"),x.setAttribute("aria-hidden","true");var z=document.createElement("div");z.className="ikr-compact-panel-inner";var E=document.createElement("div");E.className="ikr-compact-avg",E.innerHTML='<span class="ikr-icon">'+t.filled+"</span><span>"+s+"</span>",z.appendChild(E),z.appendChild(we({ratingCounts:n,allCount:a,iconPair:t,currentRatingFilter:l,onFilterChange:o})),x.appendChild(z);var w=typeof window!="undefined"&&window.matchMedia?window.matchMedia("(max-width:600px)"):null;function S(M){var ce=M?u:m;x.parentNode!==ce&&(x.classList.contains("ikr-open")&&(x.classList.remove("ikr-open"),x.setAttribute("aria-hidden","true"),v.setAttribute("aria-expanded","false")),ce.appendChild(x))}if(S(w?w.matches:!1),w){var y=function(M){S(M.matches)};w.addEventListener?w.addEventListener("change",y):w.addListener&&w.addListener(y)}if(g){var T=document.createElement("button");T.className="ikr-write-btn",T.textContent="Yorum Yap",T.onclick=Y;var N=document.createElement("div");N.className="ikr-compact-write-row",N.appendChild(T),u.appendChild(N)}function j(){x.classList.remove("ikr-open"),x.setAttribute("aria-hidden","true"),v.setAttribute("aria-expanded","false")}function D(){Ke(I),x.classList.add("ikr-open"),x.setAttribute("aria-hidden","false"),v.setAttribute("aria-expanded","true")}v.onclick=function(){x.classList.contains("ikr-open")?j():D()};var I=null;function K(M){I&&(I(),I=null),M||(I=Ve({trigger:m,element:x,close:j}))}if(K(w?w.matches:!1),w){var he=function(M){K(M.matches)};w.addEventListener?w.addEventListener("change",he):w.addListener&&w.addListener(he)}if(i.showRecommendation!==!1){var Ee=(n[3]||0)+(n[4]||0),xe=a>0?Math.round(Ee/a*100):0;if(xe>0){var G=document.createElement("div");G.className="ikr-summary-block ikr-summary-recommend",G.style.marginTop="8px",G.innerHTML='<span class="ikr-recommend-pct">%'+xe+"</span> bu \xFCr\xFCn\xFC tavsiye ediyor",z.appendChild(G)}}return u}var cr={};le(cr,{css:()=>Gi,meta:()=>Yi,render:()=>Ui});var Vr=`
  .ikr-title-split{text-align:center;}

  /* Mobile (<=768): split = classic. Sol ve orta wrapper'lar seffaf
     (cocuklar dogrudan summary'nin child'i olur). Sag wrapper kalir ve
     classic'in .ikr-summary-actions wrapper'iyla ayni davranisi alir
     (flex row + width 100%) \u2014 write-btn yan yana filter ile durur. */
  @media(max-width:600px){
    .ikr-split-left,.ikr-split-mid{display:contents;}
    /* .ikr-split-right classic'in .ikr-summary-actions pattern'ini taklit
       eder: max-width:340 ortali, bar chart ile ayni genislikte. Width:100%
       + tam genislige yayilmasini onler. */
    .ikr-split-right{
      display:flex;flex-direction:row;align-items:center;
      gap:var(--ikr-col-gap,8px);
      width:100%;max-width:var(--ikr-summary-max,340px);
      margin-left:auto;margin-right:auto;
      box-sizing:border-box;
    }
    /* Split mobile = classic mobile birebir: bar ve actions classic'teki
       max-width:340 sinirinden gelir (override yok). */
  }

  /* Desktop-only: split'in 3-kolon yatay tasarimi sadece >=769px'te aktif.
     Mobile'da hicbiri uygulanmaz -> base classic gorunum. */
  @media(min-width:601px){
    .ikr-split-col{
      display:flex;flex-direction:column;align-items:center;justify-content:center;
      min-width:0;
    }

    .ikr-summary-split{
      display:flex;flex-direction:row;align-items:center;justify-content:space-between;
      gap:24px;width:100%;max-width:none;padding:16px 0;
    }

    /* Sol: avg (buyuk yildiz + sayi) -> sayi -> tavsiye, sol hizali */
    .ikr-split-left{flex:0 0 auto;gap:12px;text-align:left;align-items:flex-start;}
    .ikr-split-left .ikr-split-left-avg-block{align-self:flex-start;margin:0;}
    /* Count classic .ikr-summary-count kullanir (font-size/weight/color
       oradan gelir). Burada sadece sola yaslama override. */
    .ikr-split-left .ikr-split-left-count{align-self:flex-start;text-align:left;}

    /* Orta: bar chart sola hizali. align-items:stretch sart -
       flex-start ile child width:auto'ya duser ve track'ler buzusur. */
    .ikr-split-mid{flex:1 1 auto;align-items:stretch;}
    /* Split desktop'ta bar chart mid kolonun tamam\u0131n\u0131 kullanir - test.
       Classic'teki 340px siniri yok, .ikr-summary-block max-width'i ezilir. */
    .ikr-split-mid .ikr-summary-bars{
      max-width:none;width:100%;margin:0;
    }

    /* Sag: write + filter yan yana */
    .ikr-split-right{
      flex:0 0 auto;flex-direction:row;align-items:center;gap:8px;
    }
    .ikr-split-right .ikr-write-btn{flex:0 0 auto;}
    .ikr-split-right .ikr-filter-wrap{align-self:auto;}
  }
`;var Yi={id:"split",name:"Yatay B\xF6l\xFCnm\xFC\u015F"},Gi=Vr;function Ui(e){var r=e.widget,i=e.settings,t=e.iconPair,a=e.allCount,n=e.ratingCounts,s=e.avgRatingVal,l=e.currentRatingFilter,d=e.currentOrderBy,c=e.currentHasImages,o=e.onFilterChange,p=e.onSortChange,u=document.createElement("div");u.className="ikr-summary ikr-summary-split";var k=document.createElement("div");k.className="ikr-split-col ikr-split-left";var m=document.createElement("div");m.className="ikr-summary-block ikr-summary-avg ikr-split-left-avg-block",m.innerHTML='<span class="ikr-avg-star ikr-icon">'+t.filled+'</span><span class="ikr-avg-num">'+s+"</span>",k.appendChild(m);var v=document.createElement("div");v.className="ikr-summary-block ikr-summary-count ikr-split-left-count",v.textContent=a.toLocaleString("tr-TR")+" Yorum",k.appendChild(v),u.appendChild(k);var f=document.createElement("div");f.className="ikr-split-col ikr-split-mid",f.appendChild(we({ratingCounts:n,allCount:a,iconPair:t,currentRatingFilter:l,onFilterChange:o})),u.appendChild(f);var h=ee({widget:r,currentOrderBy:d,currentHasImages:c,onWriteClick:Y,onSortChange:p}),g=h.querySelector(".ikr-filter-wrap"),C=h.querySelector(".ikr-write-btn"),x=document.createElement("div");if(x.className="ikr-split-col ikr-split-right",C&&x.appendChild(C),g&&x.appendChild(g),u.appendChild(x),i.showRecommendation!==!1){var z=(n[3]||0)+(n[4]||0),E=a>0?Math.round(z/a*100):0;if(E>0){var w=document.createElement("div");w.className="ikr-summary-block ikr-summary-recommend",w.innerHTML='<span class="ikr-recommend-pct">%'+E+"</span> bu \xFCr\xFCn\xFC tavsiye ediyor",k.appendChild(w)}}return u}var pr={};le(pr,{css:()=>Vi,meta:()=>Ki,render:()=>Zi});var Zr=`
  .ikr-title-minimal{text-align:left;}

  .ikr-summary-minimal{
    display:flex;flex-direction:row;align-items:center;justify-content:space-between;
    gap:16px;width:100%;max-width:none;padding:8px 0;
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
  .ikr-minimal-stars .ikr-icon{
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
    /* Write btn alta tek ba\u015F\u0131na d\xFC\u015Fer, filter sa\u011F \xFCstte info'nun yan\u0131nda kal\u0131r */
    .ikr-minimal-actions .ikr-write-btn{display:none;}
    .ikr-minimal-write-row{display:flex;width:100%;}
    .ikr-minimal-write-row .ikr-write-btn{flex:1 1 auto;justify-content:center;}
  }
  @media(min-width:601px){
    .ikr-minimal-write-row{display:none;}
  }
`;var Ki={id:"minimal",name:"Minimal (Yal\u0131n)",supports:{recommendation:!1,barChart:!1}},Vi=Zr;function Zi(e){var r=e.widget,i=e.iconPair,t=e.allCount,a=e.avgRatingVal,n=e.currentOrderBy,s=e.currentHasImages,l=e.onSortChange,d=document.createElement("div");d.className="ikr-summary ikr-summary-minimal";var c=document.createElement("div");c.className="ikr-minimal-info";var o=document.createElement("div");o.className="ikr-minimal-row";var p=document.createElement("span");p.className="ikr-minimal-avg",p.textContent=a,o.appendChild(p);var u=document.createElement("span");u.className="ikr-minimal-stars",u.innerHTML=J(a,i),o.appendChild(u),c.appendChild(o);var k=document.createElement("div");k.className="ikr-minimal-count",k.textContent=t.toLocaleString("tr-TR")+" yorum \xFCzerinden",c.appendChild(k),d.appendChild(c);var m=ee({widget:r,currentOrderBy:n,currentHasImages:s,onWriteClick:Y,onSortChange:l}),v=m.querySelector(".ikr-filter-wrap"),f=m.querySelector(".ikr-write-btn"),h=document.createElement("div");if(h.className="ikr-minimal-actions",f&&h.appendChild(f),v&&h.appendChild(v),d.appendChild(h),f){var g=document.createElement("button");g.className="ikr-write-btn",g.textContent="Yorum Yap",g.onclick=Y;var C=document.createElement("div");C.className="ikr-minimal-write-row",C.appendChild(g),d.appendChild(C)}return d}var mr={};le(mr,{css:()=>Ji,meta:()=>Wi,render:()=>Xi});var Wr=`
  .ikr-title-hero{text-align:left;}

  .ikr-summary-hero{
    display:flex;flex-direction:row;align-items:center;justify-content:space-between;
    gap:24px;width:100%;max-width:none;padding:12px 0;
  }

  .ikr-hero-info{
    display:flex;flex-direction:row;align-items:center;gap:16px;min-width:0;
  }
  .ikr-hero-avg{
    font-size:var(--ikr-hero-avg-size,64px);
    color:var(--ikr-header-avg,var(--ikr-text,rgba(0,0,0,1)));
    font-weight:700;line-height:1;letter-spacing:-1px;
  }
  .ikr-hero-meta{
    display:flex;flex-direction:row;align-items:center;gap:12px;min-width:0;
  }
  .ikr-hero-stars{
    display:inline-flex;gap:2px;
    color:var(--ikr-review-star-color,#f59e0b);
  }
  .ikr-hero-stars .ikr-icon{
    width:var(--ikr-bar-label-size,22px);height:var(--ikr-bar-label-size,22px);
  }
  .ikr-hero-count{
    font-size:var(--ikr-recommend-size,14px);
    color:var(--ikr-header-count,var(--ikr-text,rgba(0,0,0,1)));
    font-weight:400;line-height:1.2;white-space:nowrap;
  }

  .ikr-hero-actions{
    display:flex;align-items:center;gap:var(--ikr-col-gap,8px);flex:0 0 auto;
  }

  @media(max-width:600px){
    .ikr-summary-hero{
      flex-wrap:wrap;gap:16px;
    }
    .ikr-hero-info{flex:1 1 auto;gap:12px;}
    .ikr-hero-avg{font-size:calc(var(--ikr-hero-avg-size,64px) * 0.75);}
    .ikr-hero-meta{flex-direction:column;align-items:flex-start;gap:4px;}
    .ikr-hero-actions{flex:0 0 auto;}
    .ikr-hero-actions .ikr-write-btn{display:none;}
    .ikr-hero-write-row{display:flex;width:100%;}
    .ikr-hero-write-row .ikr-write-btn{flex:1 1 auto;justify-content:center;}
  }
  @media(min-width:601px){
    .ikr-hero-write-row{display:none;}
  }
`;var Wi={id:"hero",name:"Vurgulu (B\xFCy\xFCk Puan)",supports:{recommendation:!1,barChart:!1}},Ji=Wr;function Xi(e){var r=e.widget,i=e.iconPair,t=e.allCount,a=e.avgRatingVal,n=e.currentOrderBy,s=e.currentHasImages,l=e.onSortChange,d=document.createElement("div");d.className="ikr-summary ikr-summary-hero";var c=document.createElement("div");c.className="ikr-hero-info";var o=document.createElement("span");o.className="ikr-hero-avg",o.textContent=a,c.appendChild(o);var p=document.createElement("div");p.className="ikr-hero-meta";var u=document.createElement("span");u.className="ikr-hero-stars",u.innerHTML=J(a,i),p.appendChild(u);var k=document.createElement("div");k.className="ikr-hero-count",k.textContent=t.toLocaleString("tr-TR")+" yorum \xFCzerinden",p.appendChild(k),c.appendChild(p),d.appendChild(c);var m=ee({widget:r,currentOrderBy:n,currentHasImages:s,onWriteClick:Y,onSortChange:l}),v=m.querySelector(".ikr-filter-wrap"),f=m.querySelector(".ikr-write-btn"),h=document.createElement("div");if(h.className="ikr-hero-actions",f&&h.appendChild(f),v&&h.appendChild(v),d.appendChild(h),f){var g=document.createElement("button");g.className="ikr-write-btn",g.textContent="Yorum Yap",g.onclick=Y;var C=document.createElement("div");C.className="ikr-hero-write-row",C.appendChild(g),d.appendChild(C)}return d}var Ze={classic:sr,compact:dr,split:cr,minimal:pr,hero:mr};function We(e){return Ze[e]||Ze.classic}function Jr(){return Object.keys(Ze).map(function(e){return Ze[e].css||""}).join(`
`)}var ur={};le(ur,{css:()=>Qi,meta:()=>$i,render:()=>et});function Ce(e,r){if(!e)return null;var i=document.createElement("div");i.className="ikr-reply";var t=document.createElement("div");t.className="ikr-reply-header";var a=document.createElement("span");a.className="ikr-reply-label",a.textContent="Ma\u011Faza Sahibi",t.appendChild(a),i.appendChild(t);var n=document.createElement("div");n.className="ikr-reply-text ikr-reply-text-clamped",n.textContent=e,i.appendChild(n);var s=document.createElement("span");return s.className="ikr-read-more ikr-reply-read-more",s.textContent="Devam\u0131n\u0131 oku",s.style.display="none",i.appendChild(s),requestAnimationFrame(function(){if(n.scrollHeight>n.clientHeight+2)if(s.style.display="inline",typeof r=="function")s.onclick=r;else{var l=!1;s.onclick=function(){l=!l,n.classList.toggle("ikr-reply-text-clamped",!l),s.textContent=l?"Daha az g\xF6ster":"Devam\u0131n\u0131 oku"}}}),i}var $i={id:"card",name:"Kart (Varsay\u0131lan)",sizeOverrides:{small:{"--ikr-card-photo-w":"80px"},medium:{"--ikr-card-photo-w":"110px"},large:{"--ikr-card-photo-w":"140px"}}},Qi="";function et(e,r){var i=document.createElement("div");i.className="ikr-review ikr-review-card";var t=document.createElement("div");t.className="ikr-review-top";var a=document.createElement("div");a.className="ikr-review-top-left";var n=document.createElement("span");n.className="ikr-review-stars",n.innerHTML=te(e.rating,_),a.appendChild(n);var s=document.createElement("span");if(s.className="ikr-date",s.textContent=ae(e.createdAt),t.appendChild(a),t.appendChild(s),i.appendChild(t),e.title){var l=document.createElement("div");l.className="ikr-review-title",l.textContent=e.title,i.appendChild(l)}var d=document.createElement("div");d.className="ikr-author",d.textContent=e.author||"",i.appendChild(d);var c=(e.comment||"").trim();if(c){var o=document.createElement("div");o.className="ikr-body ikr-body-clamped",o.textContent=c,i.appendChild(o);var p=document.createElement("span");p.className="ikr-read-more",p.textContent="Devam\u0131n\u0131 oku",p.style.display="none",i.appendChild(p),requestAnimationFrame(function(){if(o.scrollHeight>o.clientHeight+2){p.style.display="inline";var m=!1;p.onclick=function(){m=!m,o.classList.toggle("ikr-body-clamped",!m),p.textContent=m?"Daha az g\xF6ster":"Devam\u0131n\u0131 oku"}}})}if(e.images&&Array.isArray(e.images)&&e.images.length){var u=document.createElement("div");u.className="ikr-gallery",e.images.forEach(function(m){if(!(!m||m.indexOf("https://")!==0&&m.indexOf("data:image/")!==0)){var v=document.createElement("img");v.src=U(m),v.className="ikr-img",v.setAttribute("data-ikr-img-url",m),(function(f){v.onclick=function(){$(e,f,r)}})(m),u.appendChild(v)}}),i.appendChild(u)}var k=Ce(e.merchantReply);return k&&i.appendChild(k),i}var vr={};le(vr,{css:()=>it,meta:()=>rt,render:()=>tt});var Xr=`
  .ikr-review-list{
    display:grid;
    grid-template-columns:140px 1fr var(--ikr-list-photo-w,200px);
    gap:24px;
    align-items:start;
    /* Yan padding theme mobile blo\u011Fundan gelir (--ikr-pad-review-mobile).
       Shorthand padding:24px 0 yan padding'i 0'a resetler ve theme kural\u0131n\u0131
       specifity sava\u015F\u0131nda ezer. Sadece top/bottom ayr\u0131 set. */
    padding-top:24px;padding-bottom:24px;
    border-top:1px solid var(--ikr-review-border,var(--ikr-separator,rgba(0,0,0,0.08)));
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
    width:100%;max-width:var(--ikr-list-photo-w,200px);aspect-ratio:3/4;object-fit:cover;
    border-radius:var(--ikr-radius,6px);
    border:1px solid var(--ikr-photo-border,var(--ikr-border,rgba(0,0,0,0.10)));
    cursor:zoom-in;
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
    .ikr-review-list-media img{max-width:160px;aspect-ratio:1/1;}
  }
`;var rt={id:"list",name:"Liste",supports:{},sizeOverrides:{small:{"--ikr-list-photo-w":"110px"},medium:{"--ikr-list-photo-w":"154px"},large:{"--ikr-list-photo-w":"198px"}}},it=Xr;function tt(e,r){var i=!!(e.images&&Array.isArray(e.images)&&e.images.length),t=document.createElement("div");t.className="ikr-review-list"+(i?"":" ikr-review-list--no-media");var a=document.createElement("div");a.className="ikr-review-list-author";var n=document.createElement("span");n.className="ikr-review-stars ikr-review-list-author-stars",n.innerHTML=te(e.rating,_),a.appendChild(n);var s=document.createElement("span");s.className="ikr-review-list-author-name",s.textContent=e.author||"",a.appendChild(s);var l=document.createElement("span");l.className="ikr-date ikr-review-list-author-date",l.textContent=ae(e.createdAt),a.appendChild(l),t.appendChild(a);var d=document.createElement("div");if(d.className="ikr-review-list-content",e.title){var c=document.createElement("div");c.className="ikr-review-list-title",c.textContent=e.title,d.appendChild(c)}var o=(e.comment||"").trim();if(o){var p=document.createElement("div");p.className="ikr-review-list-body ikr-body-clamped",p.textContent=o,d.appendChild(p);var u=document.createElement("span");u.className="ikr-read-more",u.textContent="Devam\u0131n\u0131 oku",u.style.display="none",d.appendChild(u),requestAnimationFrame(function(){if(p.scrollHeight>p.clientHeight+2){u.style.display="inline";var h=!1;u.onclick=function(){h=!h,p.classList.toggle("ikr-body-clamped",!h),u.textContent=h?"Daha az g\xF6ster":"Devam\u0131n\u0131 oku"}}})}var k=Ce(e.merchantReply);if(k&&d.appendChild(k),t.appendChild(d),i){var m=document.createElement("div");m.className="ikr-review-list-media";var v=e.images[0];if(v&&(v.indexOf("https://")===0||v.indexOf("data:image/")===0)){var f=document.createElement("img");f.src=U(v),f.setAttribute("data-ikr-img-url",v),f.onclick=function(){$(e,v,r)},m.appendChild(f)}t.appendChild(m)}return t}var kr={};le(kr,{css:()=>nt,meta:()=>at,render:()=>ot});var $r=`
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
  /* Non-review elemanlar kolon d\u0131\u015F\u0131na \xE7\u0131kar \u2014 summary, ba\u015Fl\u0131k, form, foto strip vs. */
  #ikas-reviews-widget:has(.ikr-review-gallery) > .ikr-title,
  #ikas-reviews-widget:has(.ikr-review-gallery) > .ikr-summary,
  #ikas-reviews-widget:has(.ikr-review-gallery) > #ikr-form-accordion,
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
    border-top:1px solid var(--ikr-review-border,var(--ikr-separator,rgba(0,0,0,0.08)));
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
    border:1px solid var(--ikr-photo-border,var(--ikr-border,rgba(0,0,0,0.10)));
  }
  @media (max-width:600px){
    #ikas-reviews-widget:has(.ikr-review-gallery){
      column-count:1;
      column-gap:0;
    }
    .ikr-review-gallery{
      grid-template-columns:1fr 100px;
      column-gap:12px;row-gap:12px;
      /* Yan padding theme mobile bloguna tasindi (--ikr-pad-review-mobile).
         Burada sadece top/bottom set edilir ki theme kuralini ezmesin. */
      padding-top:16px;padding-bottom:16px;
    }
    .ikr-review-gallery.ikr-review-gallery--no-media{
      grid-template-columns:1fr;
    }
  }
`;var at={id:"gallery",name:"Galeri",supports:{},sizeOverrides:{small:{"--ikr-gallery-photo-w":"90px"},medium:{"--ikr-gallery-photo-w":"120px"},large:{"--ikr-gallery-photo-w":"160px"}}},nt=$r;function ot(e,r){var i=!!(e.images&&Array.isArray(e.images)&&e.images.length&&e.images[0]&&(e.images[0].indexOf("https://")===0||e.images[0].indexOf("data:image/")===0)),t=document.createElement("div");t.className="ikr-review-gallery"+(i?"":" ikr-review-gallery--no-media");var a=document.createElement("div");a.className="ikr-review-gallery-content";var n=document.createElement("span");if(n.className="ikr-review-stars ikr-review-gallery-stars",n.innerHTML=te(e.rating,_),a.appendChild(n),e.title){var s=document.createElement("div");s.className="ikr-review-gallery-title",s.textContent=e.title,a.appendChild(s)}var l=document.createElement("div");l.className="ikr-review-gallery-author",l.textContent=e.author||"",a.appendChild(l);var d=document.createElement("div");d.className="ikr-review-gallery-date",d.textContent=ae(e.createdAt),a.appendChild(d);var c=(e.comment||"").trim();if(c){var o=document.createElement("div");o.className="ikr-review-gallery-body ikr-body-clamped",o.textContent=c,a.appendChild(o);var p=document.createElement("span");p.className="ikr-read-more",p.textContent="Devam\u0131n\u0131 oku",p.style.display="none",p.style.cursor="pointer",p.onclick=function(){var f=e.images&&Array.isArray(e.images)&&e.images.length?e.images[0]:null;$(e,f,r)},a.appendChild(p),requestAnimationFrame(function(){o.scrollHeight>o.clientHeight+2&&(p.style.display="inline")})}if(t.appendChild(a),i){var u=e.images[0],k=document.createElement("div");k.className="ikr-review-gallery-media";var m=document.createElement("img");m.src=U(u),m.loading="lazy",m.setAttribute("data-ikr-img-url",u),m.onclick=function(){$(e,u,r)},k.appendChild(m),t.appendChild(k)}var v=Ce(e.merchantReply,function(){var f=e.images&&Array.isArray(e.images)&&e.images.length?e.images[0]:null;$(e,f,r)});return v&&(v.classList.add("ikr-review-gallery-reply"),t.appendChild(v)),t}var Je={card:ur,list:vr,gallery:kr};function Xe(e){return Je[e]||Je.card}function Qr(){return Object.keys(Je).map(function(e){return Je[e].css||""}).join(`
`)}function P(e,r){var i=/^#([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})$/.exec(e);if(!i)return"rgba(0,0,0,"+r+")";var t=parseInt(i[1],16),a=parseInt(i[2],16),n=parseInt(i[3],16);return"rgba("+t+","+a+","+n+","+r+")"}var ei={small:{titleSize:20,reviewTextSize:12,reviewTitleSize:14,authorSize:12,replyNameSize:12,replyTextSize:12,photoTitleSize:14,avgRatingSize:36,avgStarSize:48,reviewCountSize:14,recommendSize:12,btnTextSize:12,barLabelSize:18,barCountSize:12,reviewDateSize:10,filterTextSize:12,loadMoreSize:12,readMoreSize:10,reviewStarSize:18,minimalAvgSize:18,heroAvgSize:52},medium:{titleSize:24,reviewTextSize:14,reviewTitleSize:16,authorSize:14,replyNameSize:13,replyTextSize:13,photoTitleSize:16,avgRatingSize:46,avgStarSize:58,reviewCountSize:16,recommendSize:14,btnTextSize:14,barLabelSize:22,barCountSize:14,reviewDateSize:12,filterTextSize:14,loadMoreSize:14,readMoreSize:12,reviewStarSize:22,minimalAvgSize:22,heroAvgSize:64},large:{titleSize:28,reviewTextSize:16,reviewTitleSize:18,authorSize:16,replyNameSize:15,replyTextSize:15,photoTitleSize:18,avgRatingSize:56,avgStarSize:68,reviewCountSize:18,recommendSize:16,btnTextSize:16,barLabelSize:26,barCountSize:16,reviewDateSize:14,filterTextSize:16,loadMoreSize:16,readMoreSize:14,reviewStarSize:26,minimalAvgSize:26,heroAvgSize:76}},ri={small:80,medium:110,large:140};function lt(e,r){var i=r.bgColor||"#ffffff",t=r.textColor||"#111111",a=r.replyBgColor||"#f3f4f6",n=r.inputBgColor||"#ffffff",s=r.widgetBgColor||i,l=r.widgetBorderColor||"transparent",d=r.separatorColor||P(t,.08),c=r.headerTitleColor||t,o=r.headerAvgColor||t,p=r.headerCountColor||t,u=r.headerRecommendColor||t,k=r.barLabelColor||t,m=r.barFillColor||t,v=r.barTrackColor||P(t,.1),f=r.barCountColor||t,h=r.barHoverBgColor||P(t,.05),g=r.primaryColor||"#111111",C=r.primaryTextColor||"#ffffff",x=r.btnBgColor||g,z=r.btnTextColor||C,E=r.btnBorderColor||g,w=r.filterBtnBgColor||g,S=r.filterBtnTextColor||C,y=r.filterBtnBorderColor||g,T=r.filterMenuBgColor||i,N=r.filterMenuBorderColor||P(t,.12),j=r.filterItemTextColor||t,D=r.filterItemHoverBgColor||P(g,.07),I=r.filterItemActiveColor||g,K=r.reviewTitleColor||t,he=r.reviewAuthorColor||t,Ee=r.reviewDateColor||t,xe=r.reviewBodyColor||t,G=r.reviewBorderColor||P(t,.08),M=r.reviewStarColor||"#f59e0b",ce=r.replyBgColor||a,Te=r.replyBorderColor||g,pe=r.replyLabelColor||t,je=r.replyTextColor||t,me=r.photoBgColor||P(t,.03),ue=r.photoBorderColor||P(t,.1),ve=r.photoTitleColor||t,Le=r.formBgColor||i,er=r.formBorderColor||P(t,.08),rr=r.inputBgColor||n,F=r.inputTextColor||t,re=r.inputBorderColor||P(t,.2),wr=r.placeholderColor||P(t,.35),Ae=r.loadMoreBgColor||i,b=r.loadMoreTextColor||t,L=r.loadMoreBorderColor||P(t,.3),R=r.modalBgColor||i,H=r.modalTextColor||t,Ne=r.modalCloseBgColor||g,yi=r.modalCloseTextColor||C,bi=r.modalCloseBorderColor||g,wi=r.modalNavBgColor||"rgba(0,0,0,0.45)",Ci=r.modalNavTextColor||"#ffffff",Si=r.modalReplyBgColor||a,zi=r.modalReplyBorderColor||g,Cr={"--ikr-widget-bg":s,"--ikr-widget-border":l,"--ikr-separator":d,"--ikr-header-title":c,"--ikr-header-avg":o,"--ikr-header-count":p,"--ikr-header-recommend":u,"--ikr-bar-label":k,"--ikr-bar-fill":m,"--ikr-bar-track":v,"--ikr-bar-count":f,"--ikr-bar-hover-bg":h,"--ikr-btn-bg":x,"--ikr-btn-text":z,"--ikr-btn-border":E,"--ikr-filter-btn-bg":w,"--ikr-filter-btn-text":S,"--ikr-filter-btn-border":y,"--ikr-filter-menu-bg":T,"--ikr-filter-menu-border":N,"--ikr-filter-item-text":j,"--ikr-filter-item-hover-bg":D,"--ikr-filter-item-active":I,"--ikr-review-title":K,"--ikr-review-author":he,"--ikr-review-date":Ee,"--ikr-review-body":xe,"--ikr-review-border":G,"--ikr-review-star-color":M,"--ikr-reply-bg-color":ce,"--ikr-reply-border":Te,"--ikr-reply-label":pe,"--ikr-reply-text":je,"--ikr-photo-bg":me,"--ikr-photo-border":ue,"--ikr-photo-title":ve,"--ikr-form-bg":Le,"--ikr-form-border":er,"--ikr-input-bg-color":rr,"--ikr-input-text-color":F,"--ikr-input-border":re,"--ikr-placeholder":wr,"--ikr-load-more-bg":Ae,"--ikr-load-more-text":b,"--ikr-load-more-border":L,"--ikr-modal-bg":R,"--ikr-modal-text":H,"--ikr-modal-close-bg":Ne,"--ikr-modal-close-text":yi,"--ikr-modal-close-border":bi,"--ikr-modal-nav-bg":wi,"--ikr-modal-nav-text":Ci,"--ikr-modal-reply-bg":Si,"--ikr-modal-reply-border":zi,"--ikr-bg":i,"--ikr-surface":i,"--ikr-text":t,"--ikr-text-faint":P(t,.45),"--ikr-border":P(t,.12),"--ikr-track-bg":P(t,.22),"--ikr-reply-bg":a,"--ikr-input-bg":n,"--ikr-input-text":t};Object.keys(Cr).forEach(function(Sr){e.style.setProperty(Sr,Cr[Sr])}),typeof window!="undefined"&&window.__ikasPreviewMode&&document.body&&(document.body.style.background=i)}async function oe(e,r,i,t,a,n,s){if(or){Ye({productId:e,settings:r,reviewsData:i,productName:t,orderBy:a,page:n,badgeSettings:s});return}Fe(!0),Er(e),Tr(r),s!==void 0&&Lr(s),Ar(t),a&&be(a),n&&ge(n),i!=null&&Nr(i);try{let Ae=function(b,L){if(!(!b||!b.meta||!b.meta.sizeOverrides)){var R=b.meta.sizeOverrides[L];R&&Object.keys(R).forEach(function(H){o.style.setProperty(H,R[H])})}};var wr=Ae,l=We(r.summaryLayout),d=l.meta&&l.meta.defaultTitle!==void 0?l.meta.defaultTitle:"M\xFC\u015Fteri Yorumlar\u0131",c=d===""?"":r.title!==void 0?r.title:d,o=document.documentElement;lt(o,r);var p=r.primaryColor||"#111111",u=r.primaryTextColor||"#ffffff";Pr(p,Gr+Jr()+Qr());var k=r.borderRadius!==void 0?r.borderRadius:8,m=ei[r.size]||ei.medium,v=ri[r.thumbnailSize]||ri.medium;o.style.setProperty("--ikr-title-size",m.titleSize+"px"),o.style.setProperty("--ikr-review-text-size",m.reviewTextSize+"px"),o.style.setProperty("--ikr-review-title-size",m.reviewTitleSize+"px"),o.style.setProperty("--ikr-author-size",m.authorSize+"px"),o.style.setProperty("--ikr-reply-name-size",m.replyNameSize+"px"),o.style.setProperty("--ikr-reply-text-size",m.replyTextSize+"px"),o.style.setProperty("--ikr-color-text",u),o.style.setProperty("--ikr-radius",k+"px"),o.style.setProperty("--ikr-radius-sm",Math.max(0,k-4)+"px"),o.style.setProperty("--ikr-photo-title-size",m.photoTitleSize+"px"),o.style.setProperty("--ikr-avg-rating-size",m.avgRatingSize+"px"),o.style.setProperty("--ikr-review-count-size",m.reviewCountSize+"px"),o.style.setProperty("--ikr-recommend-size",m.recommendSize+"px"),o.style.setProperty("--ikr-btn-text-size",m.btnTextSize+"px"),o.style.setProperty("--ikr-bar-label-size",m.barLabelSize+"px"),o.style.setProperty("--ikr-minimal-avg-size",m.minimalAvgSize+"px"),o.style.setProperty("--ikr-hero-avg-size",m.heroAvgSize+"px"),o.style.setProperty("--ikr-bar-count-size",m.barCountSize+"px"),o.style.setProperty("--ikr-review-date-size",m.reviewDateSize+"px"),o.style.setProperty("--ikr-filter-text-size",m.filterTextSize+"px"),o.style.setProperty("--ikr-load-more-size",m.loadMoreSize+"px"),o.style.setProperty("--ikr-read-more-size",m.readMoreSize+"px"),o.style.setProperty("--ikr-thumbnail-size",v+"px");var f=/^#[0-9A-Fa-f]{6}$/.test(r.reviewStarColor||"")?r.reviewStarColor:"#f59e0b";o.style.setProperty("--ikr-review-star-color",f),o.style.setProperty("--ikr-star-size",m.reviewStarSize+"px"),o.style.setProperty("--ikr-avg-star-size",m.avgStarSize+"px"),Ae(We(r.summaryLayout),r.size),Ae(Xe(r.reviewLayout),r.size);var h=Me(r),g=document.getElementById("ikas-reviews");if(!g){var C=document.getElementById("ikas-reviews-anchor");if(!C)return;g=document.createElement("div"),g.id="ikas-reviews",g.style.minHeight="200px",C.appendChild(g)}if(r.enabled===!1){g.style.minHeight="auto",g.innerHTML='<div style="padding: 40px 20px; margin-top: 24px; text-align: center; color: #6e6d7a; font-family: Inter, sans-serif; border: 1px dashed #e3e1e5; border-radius: '+(r.borderRadius!==void 0?r.borderRadius:8)+'px; background: #fafafa; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px;"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #6e6d7a; margin-bottom: 4px;"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg><div style="font-weight: 500; font-size: 18px; color: #1a191a; letter-spacing: -0.01em;">Widget \u015Fu anda Pasif durumda</div><div style="font-size: 16px; color: #6e6d7a; max-width: 380px; line-height: 1.5;">Canl\u0131 ma\u011Fazan\u0131zda m\xFC\u015Fterileriniz hi\xE7bir yorum alan\u0131 g\xF6rmeyecektir.</div></div>',Fe(!1);var x=Re;Ye(null),x&&oe(x.productId,x.settings,x.reviewsData,x.productName,x.orderBy,x.page,x.badgeSettings);return}g.innerHTML='<p class="ikr-state-msg ikr-state-loading">Yorumlar y\xFCkleniyor...</p>';try{var z=i||{},E=z.data&&z.data.reviews||[],w=z.data&&z.data.totalCount||0,S=g.cloneNode(!1);g.parentNode.replaceChild(S,g),g=S;var y=document.createElement("div");if(y.id="ikas-reviews-widget",typeof window!="undefined"&&window.__ikasPreviewMode&&(y.style.width="100%",y.style.maxWidth="100%",y.style.marginLeft="0",y.style.marginRight="0"),c){var T=document.createElement("div"),N=r.summaryLayout||"classic";T.className="ikr-title ikr-title-"+N,T.textContent=c,y.appendChild(T)}var j=z.data&&z.data.allCount||0,D=z.data&&z.data.ratingCounts||null,I=D||[0,0,0,0,0],K=z.data&&z.data.avgRating||"0.0";if(!D&&E.length>0){E.forEach(function(b){b.rating>=1&&b.rating<=5&&I[b.rating-1]++});var he=E.reduce(function(b,L){return b+L.rating},0);K=(he/E.length).toFixed(1)}if(j>0){var Ee=We(r.summaryLayout),xe=Ee.render({widget:y,data:z,settings:r,iconPair:h,allCount:j,ratingCounts:I,avgRatingVal:K,currentRatingFilter:ke,currentOrderBy:Z,currentHasImages:fe,onFilterChange:async function(b){De(ke===b?null:b),ge(1);var L=await He(ie,Z,1,ke,fe);await oe(ie,_,L,ye,Z,1)},onSortChange:async function(b,L){ge(1),L?(nr(!0),be("newest")):(nr(!1),be(b));var R=await He(ie,Z,1,ke,fe);await oe(ie,_,R,ye,Z,1)}});y.appendChild(xe)}else{var G=document.createElement("button");G.className="ikr-write-btn",G.style.cssText="display:block;margin:16px auto 0;",G.textContent="Yorum Yap",G.onclick=function(){var b=document.getElementById("ikr-form-accordion");if(b){var L=b.style.maxHeight&&b.style.maxHeight!=="0px";L?(b.style.maxHeight="0px",b.style.opacity="0"):(b.style.maxHeight=b.scrollHeight+"px",b.style.opacity="1",setTimeout(function(){b.style.maxHeight="none"},360),setTimeout(function(){var R=document.querySelector("header"),H=R?R.getBoundingClientRect().height:0,Ne=b.getBoundingClientRect().top+window.pageYOffset-H-16;window.scrollTo({top:Ne,behavior:"smooth"})},50))}},y.appendChild(G)}var M=document.createElement("div");M.id="ikr-form-accordion",M.style.cssText="overflow:hidden;max-height:0px;opacity:0;transition:max-height 0.35s ease,opacity 0.25s ease;",M.appendChild(jr(e,t)),y.appendChild(M);var ce=E.filter(function(b){return b.images&&Array.isArray(b.images)&&b.images.some(function(L){return L&&(L.indexOf("https://")===0||L.indexOf("data:image/")===0)})});if(r.showPhotoGallery!==!1&&!fe&&ce.length>0){var Te=document.createElement("div");Te.className="ikr-photo-section";var pe=document.createElement("div");pe.className="ikr-photo-strip";var je=0;ce.forEach(function(b){if(!(je>=10)){var L=b.images.find(function(H){return H&&(H.indexOf("https://")===0||H.indexOf("data:image/")===0)});if(L){var R=document.createElement("img");R.src=U(L),R.className="ikr-photo-strip-thumb",R.alt="Yorum foto\u011Fraf\u0131",(function(H,Ne){R.onclick=function(){$(Ne,H,E)}})(L,b),pe.appendChild(R),je++}}});var me=document.createElement("button");me.className="ikr-photo-strip-arrow ikr-photo-strip-arrow-prev",me.innerHTML="&#8249;",me.setAttribute("aria-label","\xD6nceki"),me.onclick=function(){pe.scrollBy({left:-200,behavior:"smooth"})};var ue=document.createElement("button");ue.className="ikr-photo-strip-arrow ikr-photo-strip-arrow-next",ue.innerHTML="&#8250;",ue.setAttribute("aria-label","Sonraki"),ue.onclick=function(){pe.scrollBy({left:200,behavior:"smooth"})};var ve=document.createElement("div");ve.className="ikr-photo-strip-wrap",ve.appendChild(me),ve.appendChild(pe),ve.appendChild(ue),Te.appendChild(ve),y.appendChild(Te)}if(E.length===0){var Le=document.createElement("p");Le.className="ikr-state-msg",Le.textContent="Hen\xFCz yorum yok.",y.appendChild(Le)}else{var er=Xe(r.reviewLayout);E.forEach(function(b){y.appendChild(er.render(b,E))})}var rr=z.data&&z.data.hasMore;if(rr){var F=document.createElement("button");F.className="ikr-load-more",F.textContent="Daha Fazla G\xF6ster",F.onclick=async function(){F.disabled=!0,F.textContent="Y\xFCkleniyor...";var b=_e+1,L=await He(ie,Z,b,ke,fe);if(L&&L.data&&L.data.reviews){ge(b);var R=Xe(_.reviewLayout);L.data.reviews.forEach(function(H){y.insertBefore(R.render(H,L.data.reviews),F)}),L.data.hasMore?(F.disabled=!1,F.textContent="Daha Fazla G\xF6ster"):F.remove()}else F.remove()},y.appendChild(F)}g.appendChild(y),Yr(j>0?K:null,w,t,tr)}catch(b){console.error("[ikr] render error:",b),g.innerHTML='<p style="text-align:center;color:#dc2626;">Yorumlar y\xFCklenirken bir hata olu\u015Ftu.</p>'}}finally{if(Fe(!1),Re){var re=Re;Ye(null),oe(re.productId,re.settings,re.reviewsData,re.productName,re.orderBy,re.page,re.badgeSettings)}}}var de="ikr_settings_"+q,st=300*1e3,dt=30*1e3;async function gr(){if(window.__ikasPreviewMode){try{var e=window.__ikasPreviewBaseUrl||V,r=window.__ikasPreviewSettings||sessionStorage.getItem("ikr_preview_settings")||"",i={};if(r)try{i=JSON.parse(r)}catch(o){}var t=await X(e+"/api/preview/settings");if(t.ok){var a=await t.json();return a.widgets&&a.widgets.reviews&&Object.keys(i).length&&(a.widgets.reviews=Object.assign({},a.widgets.reviews,i)),a}}catch(o){}return null}var n=null,s=Oe(de);if(s)try{var l=JSON.parse(s);if(l&&l.t!==void 0)if(l.notFound){if(Date.now()-l.t<dt)return null;B(de,"")}else if(l.v){if(Date.now()-l.t<st)return l.v;n=l.v,B(de,"")}else B(de,"");else B(de,"")}catch(o){B(de,"")}try{var d=await X(V+"/api/public/settings?publicApiKey="+encodeURIComponent(q));if(!d.ok)return d.status===404&&B(de,JSON.stringify({t:Date.now(),notFound:!0})),n||null;var c=await d.json();return B(de,JSON.stringify({t:Date.now(),v:c})),c}catch(o){return console.error("[ikr] fetchSettings error:",o),n||null}}var ct=60*1e3;async function He(e,r,i,t,a){if(window.__ikasPreviewMode){try{var n=window.__ikasPreviewBaseUrl||V,s=n+"/api/preview/reviews?page="+encodeURIComponent(i||1),l=await X(s);if(l.ok)return await l.json()}catch(v){}return null}r=r||"newest",i=i||1;var d="ikr_reviews_"+q+"_"+e+"_"+r+"_"+i+"_"+(t||"")+"_"+(a?"1":"0"),c=null,o=Oe(d);if(o)try{var p=JSON.parse(o);if(p&&p.t!==void 0&&p.v){if(Date.now()-p.t<ct)return p.v;c=p.v,B(d,"")}else B(d,"")}catch(v){B(d,"")}try{var u=V+"/api/public/reviews?storeId="+encodeURIComponent(q)+"&productId="+encodeURIComponent(e)+"&orderBy="+encodeURIComponent(r)+"&page="+encodeURIComponent(i)+(t?"&rating="+encodeURIComponent(t):"")+(a?"&hasImages=true":""),k=await X(u);if(!k.ok)return c||null;var m=await k.json();return B(d,JSON.stringify({t:Date.now(),v:m})),m}catch(v){return console.error("[ikr] fetchReviews error:",v),c||null}}var fr={};async function Se(e,r){var i=document.getElementById("ikr-rating-badge");i&&i.remove();var t=document.getElementById("ikr-jsonld");if(t&&t.remove(),!fr[e]){fr[e]=!0;var a={primaryColor:"#111111",title:"M\xFC\u015Fteri Yorumlar\u0131",enabled:!0},n={enabled:!0,icon:"star",size:"medium",color:"#f59e0b"};try{var s=await gr();if(!s)return;var l=s.widgets&&s.widgets.reviews||a,d=s.widgets&&s.widgets.badge||n;if(l.enabled===!1)return;be("newest"),ge(1),De(null);var c=await He(e,"newest",1,null);await oe(e,l,c,r,"newest",1,d)}catch(o){console.error("[ikr] bootstrap error:",o),await oe(e,a,null,r,void 0,void 0,n)}finally{delete fr[e]}}}function hr(){try{var e=window.__NEXT_DATA__&&window.__NEXT_DATA__.props&&window.__NEXT_DATA__.props.pageProps;if(e&&e.pageType==="PRODUCT"&&e.pageSpecificData&&e.pageSpecificData.id)return{id:e.pageSpecificData.id,name:e.pageSpecificData.name||null}}catch(t){}if(window.IkasStorefront&&window.IkasStorefront.product&&window.IkasStorefront.product.id)return{id:window.IkasStorefront.product.id,name:window.IkasStorefront.product.name||null};var r=window.location.pathname.match(/--([a-f0-9-]{36})(?:\/|$|\?)/);if(r)return{id:r[1],name:null};var i=new URLSearchParams(window.location.search).get("productId");return i?{id:i,name:null}:null}function ii(){var e={},r={};return document.querySelectorAll("a[href]").forEach(function(i){try{var t=i.getAttribute("href");if(!t||t.charAt(0)==="#"||t.charAt(0)==="?")return;var a=O(i.href);if(!a||r[a]||!/^[a-z0-9][a-z0-9-]{2,}$/.test(a)||Ue.test(a))return;r[a]=!0,e[a]=null}catch(n){}}),Object.keys(Be).forEach(function(i){e[i]=Be[i]}),e}var pt=300*1e3,ti=50;async function ai(e){var r="ikr_ratings_"+q,i={},t=Oe(r);if(t)try{var a=JSON.parse(t);a&&a.t!==void 0&&Date.now()-a.t<pt?i=a.v||{}:B(r,"")}catch(c){B(r,"")}var n=e.filter(function(c){return!i[c]});if(!n.length)return i;for(var s=[],l=0;l<n.length;l+=ti)s.push(n.slice(l,l+ti));var d=await Promise.all(s.map(function(c){var o=V+"/api/public/ratings-by-slug?storeId="+encodeURIComponent(q)+"&slugs="+c.map(encodeURIComponent).join(",");return X(o).then(function(p){return p.ok?p.json().then(function(u){return u.data||{}}):{}}).catch(function(){return{}})}));return d.forEach(function(c){n.forEach(function(o){i[o]||(i[o]={average:0,count:0,_empty:!0})}),Object.keys(c).forEach(function(o){i[o]=c[o]})}),B(r,JSON.stringify({t:Date.now(),v:i})),i}var mt="var(--ikr-badge-color,#f59e0b)",ni=13,ut="display:flex;align-items:center;gap:3px;margin-top:0px;margin-bottom:4px;font-size:13px;font-weight:400;color:#555;pointer-events:none;";function vt(e){var r=Pe("star","classic"),i="width:"+ni+"px;height:"+ni+"px;";return'<span style="color:'+mt+';display:inline-flex;align-items:center;">'+J(e,r,{sizeStyle:i})+"</span>"}function qe(e,r){var i=document.createElement("div");return i.setAttribute("data-ikr-listing-badge","1"),i.style.cssText=ut+"justify-content:"+(r||"flex-start")+";",i.innerHTML=vt(e.avg)+'<span style="font-weight:400;">'+e.avg+" ("+e.count+")</span>",i}var oi=".product-name",li=".add-to-basket-modal",si="h1.product-name",$e=".single-product-container-main",xr=".single-product-product-name",di=[".hero-image-banner-main",".hero-image-main",".home-slider-main",'[class*="hero-"]','[class*="banner-"]','[class*="slider-banner"]','[class*="marquee"]'].join(","),ci=[".category-products-main",".products-slider-main",".infinite-scroll-component",'[class*="product-list"]',".single-product-container-main",".product-block-container"].join(",");var pi='[class*="productTitle"],[class*="productName"],[class*="product_title"],[class*="product_name"],[class*="product-title"],[class*="product-name"]',kt=/^(tükendi|sold out|out of stock|stokta yok|satıldı|unavailable)$/i;function yr(e,r){var i=e.querySelector(oi);if(i)return i;if(e.matches&&e.matches(pi))return e;var t=e.querySelector(pi);if(t)return t;if(r){for(var a=e.querySelectorAll("*"),n=0;n<a.length;n++)if(a[n].children.length===0&&a[n].textContent.trim()===r)return a[n]}for(var s=e.querySelectorAll("p, h1, h2, h3, h4, h5, h6, span, div"),l=0;l<s.length;l++){var d=s[l],c=d.textContent.trim();if(!(!c||c.length<2||c.length>150)&&!/^[\d\s.,₺$€£%]+$/.test(c)&&!kt.test(c)&&!(d.closest("figure")||d.closest("picture"))&&!(d.children.length>1))return d}return null}function ft(e,r,i,t){if(!e.getAttribute("data-ikr-badge")){var a=O(e.href);if(e.id==="ikr-rating-badge"){e.setAttribute("data-ikr-badge","1");return}if(a===t&&e.getAttribute("href")&&e.getAttribute("href").charAt(0)==="#"){e.setAttribute("data-ikr-badge","1");return}if(e.closest("header")||e.closest("nav")){e.setAttribute("data-ikr-badge","1");return}if(e.closest('[class*="basket"]')||e.closest('[class*="cart"]')){e.setAttribute("data-ikr-badge","1");return}if(e.closest($e)&&!e.closest(xr)){e.setAttribute("data-ikr-badge","1");return}if(a===t&&e.closest(xr)){e.setAttribute("data-ikr-badge","1");return}if(e.closest(di)){e.setAttribute("data-ikr-badge","1");return}var n=!!e.querySelector("a[href]"),s=Array.from(e.childNodes).filter(function(m){return m.nodeType===3}).map(function(m){return m.textContent.trim()}).join("").trim(),l=!!yr(e,i);if(!s&&!l&&!n){e.setAttribute("data-ikr-badge","1");return}if(e.setAttribute("data-ikr-badge","1"),n){e.querySelectorAll("a[href]").forEach(function(m){m.setAttribute("data-ikr-badge","1")});var d=yr(e,i);if(!d||d.querySelector("[data-ikr-listing-badge]"))return;var c=window.getComputedStyle(d).textAlign;d.appendChild(qe(r,c==="center"?"center":c==="right"?"flex-end":"flex-start"));return}var o=yr(e,i);if(!(o&&o.querySelector("[data-ikr-listing-badge]")))if(o){var p=window.getComputedStyle(o).textAlign;o.appendChild(qe(r,p==="center"?"center":p==="right"?"flex-end":"flex-start"))}else{var u=qe(r,"flex-start"),k=e.firstElementChild;k?e.insertBefore(u,k):e.appendChild(u)}}}function gt(e,r){var i=document.querySelector(li);if(i){var t=i.querySelector(si);if(!(!t||t.querySelector("[data-ikr-listing-badge]"))){var a=null;if(Ie&&r[Ie]&&(a=Ie),!a){var n=O(window.location.pathname);n&&r[n]&&(a=n)}if(!a){var s=t.textContent.trim();Object.keys(e).forEach(function(p){if(!a){var u=e[p];u&&u.trim()===s&&r[p]&&(a=p)}})}if(!a){var l=document.querySelector($e);if(l){var d=l.querySelector("a[href]");if(d){var c=O(d.href);c&&r[c]&&(a=c)}}}if(!a){var o=t.textContent.trim().toLowerCase();document.querySelectorAll("a[href]").forEach(function(p){if(!a&&!(p.closest("header")||p.closest("nav"))&&!p.closest($e)){var u=p.textContent.trim().toLowerCase();if(u&&u===o){var k=O(p.href);k&&r[k]&&(a=k)}}})}!a||!r[a]||r[a]._empty||r[a].count===0||t.appendChild(qe(r[a],"flex-start"))}}}function mi(e,r){var i=O(window.location.pathname),t=document.querySelectorAll(ci),a=[];t.forEach(function(n){n.tagName==="A"&&n.href?a.push(n):n.querySelectorAll("a[href]").forEach(function(s){a.push(s)})}),Object.keys(e).forEach(function(n){var s=r[n];if(!(!s||s._empty||s.count===0)){var l=e[n];a.forEach(function(d){O(d.href)===n&&ft(d,s,l,i)})}}),gt(e,r)}async function ze(){if(A.inProgress){A.queued=!0;return}if(!A.rendered){A.rendered=!0,A.inProgress=!0;try{var e=A.navCleanup;e&&(A.navCleanup=!1);var r=ii();if(!Object.keys(r).length){A.rendered=!1;return}var i=await Promise.all([gr(),ai(Object.keys(r))]),t=i[0];if(!t){A.rendered=!1;return}var a=i[1],n=t&&t.widgets||{},s=n.badge&&n.badge.color||"#f59e0b";if(n.badge&&n.badge.enabled===!1){A.rendered=!1;return}document.documentElement.style.setProperty("--ikr-badge-color",s),e&&(document.querySelectorAll("[data-ikr-listing-badge]").forEach(function(l){l.remove()}),document.querySelectorAll("[data-ikr-badge]").forEach(function(l){l.removeAttribute("data-ikr-badge")})),mi(r,a)}finally{A.inProgress=!1,A.queued&&(A.queued=!1,A.rendered=!1,ze())}}}var ui=!1,vi=!1;function gi(){vi||(vi=!0,document.addEventListener("click",function(e){var r=e.target.closest("a[href]");if(r&&!(r.closest("header")||r.closest("nav"))&&!(r.closest('[class*="basket"]')||r.closest('[class*="cart"]'))){var i=O(r.href);!i||i.length<3||_r(i)}},!0))}var ki=!1,fi=typeof location!="undefined"?location.pathname:"";function Qe(){try{if(location.pathname===fi)return;fi=location.pathname;var e=document.getElementById("ikr-rating-badge");e&&e.remove();var r=document.getElementById("ikr-jsonld");r&&r.remove()}catch(i){}}function ht(){if(!ki){ki=!0;var e=history.pushState,r=history.replaceState;history.pushState=function(){var i=e.apply(this,arguments);return Qe(),i},history.replaceState=function(){var i=r.apply(this,arguments);return Qe(),i},window.addEventListener("popstate",Qe),window.addEventListener("hashchange",Qe)}}function br(){if(ht(),window.IkasEvents){if(ui)return;ui=!0,window.IkasEvents.subscribe({id:"ikas-reviews-widget",callback:function(n){if(n&&n.type==="VIEW_LISTING"){var s=n.data&&n.data.productDetails;Array.isArray(s)&&s.forEach(function(o){o&&o.metaData&&o.metaData.slug&&o.name&&(Be[o.metaData.slug]=o.name)})}if(n&&n.type==="PRODUCT_VIEW"){var l=n.data&&n.data.productDetail&&n.data.productDetail.id,d=n.data&&n.data.productDetail&&n.data.productDetail.name;l&&(B("ikr_reviews_"+q+"_"+l,""),Se(l,d))}if(n&&n.type==="PAGE_VIEW"){var c=Date.now();if(A.lastPageView&&c-A.lastPageView<800)return;A.lastPageView=c,A.navCleanup=!0,A.rendered=!1,ze()}}});var e=hr();if(e)Se(e.id,e.name);else{let n=function(){var s=hr();s?Se(s.id,s.name):r<20&&(r++,setTimeout(n,100))};var t=n,r=0;setTimeout(n,100)}setTimeout(function(){A.rendered||ze()},2e3)}else{let n=function(){window.IkasEvents?br():i<100&&(i++,setTimeout(n,50))};var a=n,i=0;setTimeout(n,50)}}var hi=null;function xi(){if(typeof MutationObserver!="undefined"){var e=new MutationObserver(function(r){var i=r.some(function(t){return Array.from(t.addedNodes).some(function(a){return!(a.nodeType!==1||a.hasAttribute&&(a.hasAttribute("data-ikr-listing-badge")||a.id==="ikr-rating-badge"||a.id==="ikr-reviews-widget")||a.closest&&(a.closest("[data-ikr-listing-badge]")||a.closest("#ikr-rating-badge")||a.closest("#ikr-reviews-widget"))||a.querySelector&&a.querySelector("[data-ikr-listing-badge],#ikr-reviews-widget,#ikr-rating-badge"))})});i&&(clearTimeout(hi),hi=setTimeout(function(){var t=Array.from(document.querySelectorAll("a[href]")).some(function(a){if(a.getAttribute("data-ikr-badge"))return!1;var n=O(a.href);return n&&n.length>=3&&!Ue.test(n)});t&&(A.rendered=!1,ze())},300))});e.observe(document.body,{childList:!0,subtree:!0})}}var xt=window.__ikasPreviewMode===!0;if(xt){let e=function(){try{window.parent.postMessage({type:"IKR_WIDGET_READY"},"*")}catch(i){}},r=function(){Se("mock-product","\xD6rnek \xDCr\xFCn"),e()};yt=e,bt=r,window.addEventListener("message",function(i){var t=i.data;if(!(!t||t.type!=="IKR_SETTINGS_UPDATE")){var a=t.settings;if(!(!a||!_)){var n=Object.assign({},_,a);oe(ie,n,ar,ye,Z,_e)}}}),document.readyState==="loading"?document.addEventListener("DOMContentLoaded",r):r()}else if(q){let e=function(){br(),gi(),xi()};wt=e,document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e):e()}var yt,bt,wt;})();
