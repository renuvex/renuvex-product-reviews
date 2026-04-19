/* ikas Reviews Widget — built 2026-04-19T06:28:41.454Z | theme: default */
"use strict";(()=>{var bt=Object.defineProperty;var he=(e,r)=>{for(var t in r)bt(e,t,{get:r[t],enumerable:!0})};var yr=document.currentScript||(function(){for(var e=document.getElementsByTagName("script"),r=e.length-1;r>=0;r--)if(e[r].src&&e[r].src.indexOf("/widget.js")!==-1)return e[r];return e[e.length-1]})(),Qe=yr?yr.src:"",yt=new URLSearchParams(Qe.split("?")[1]||""),H=yt.get("publicApiKey"),Y=Qe?Qe.split("?")[0].replace(/\/widget\.js$/,""):"";var G="newest",ze=1,ue=null,fe=!1,ee=null,B=null,er=null,xe=null,rr=null;function be(e){G=e}function ve(e){ze=e}function je(e){ue=e}function tr(e){fe=e}function wr(e){ee=e}function Cr(e){B=e}function Sr(e){er=e}function Er(e){xe=e}function Tr(e){rr=e}var ir=!1,Le=null;function qe(e){ir=e}function Fe(e){Le=e}var A={rendered:!1,inProgress:!1,queued:!1,navCleanup:!1,lastPageView:0},Ae={},_e=null;function zr(e){_e=e}var Lr={};function Ne(e){try{return sessionStorage.getItem(e)}catch(r){return Lr[e]||null}}function N(e,r){try{sessionStorage.setItem(e,r)}catch(t){Lr[e]=r}}var ae="0 -960 960 960",U={starFill:"m233-120 65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z",starRounded:"M480-269 314-169q-11 7-23 6t-21-8q-9-7-14-17.5t-2-23.5l44-189-147-127q-10-9-12.5-20.5T140-571q4-11 12-18t22-9l194-17 75-178q5-12 15.5-18t21.5-6q11 0 21.5 6t15.5 18l75 178 194 17q14 2 22 9t12 18q4 11 1.5 22.5T809-528L662-401l44 189q3 13-2 23.5T690-171q-9 7-21 8t-23-6L480-269Z",heartRounded:"M480-120 432-164q-114-104-190-176.5T121-456q-45-43-63-86.5T40-639q0-111 74.5-185.5T300-899q62 0 118 29t62 76q6-47 62-76t118-29q111 0 185.5 74.5T920-639q0 53-18 96.5T839-456q-45 42-120.5 115.5T528-164l-48 44Z",boxSquare:"M160-80h640q33 0 56.5-23.5T880-160v-640q0-33-23.5-56.5T800-880H160q-33 0-56.5 23.5T80-800v640q0 33 23.5 56.5T160-80Z"};var Ar={star:{label:"Y\u0131ld\u0131z",styles:{rounded:{label:"Tombul (Google)",filled:'<svg viewBox="'+ae+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g transform="translate(-48, 48) scale(1.1)"><path d="'+U.starRounded+'"/></g></svg>',empty:'<svg viewBox="'+ae+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g transform="translate(-48, 48) scale(1.1)"><path d="'+U.starRounded+'"/></g></svg>'},classic:{label:"Klasik (Google)",filled:'<svg viewBox="'+ae+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g transform="translate(-48, 48) scale(1.1)"><path d="'+U.starFill+'"/></g></svg>',empty:'<svg viewBox="'+ae+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g transform="translate(-48, 48) scale(1.1)"><path d="'+U.starFill+'"/></g></svg>'},boxed:{label:"Kare (Google)",filled:'<svg viewBox="'+ae+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="'+U.boxSquare+'"/><g transform="translate(120, -120) scale(0.75)" fill="white"><path d="'+U.starFill+'"/></g></svg>',empty:'<svg viewBox="'+ae+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="'+U.boxSquare+'"/><g transform="translate(120, -120) scale(0.75)" fill="white"><path d="'+U.starFill+'"/></g></svg>'}}},favorite:{label:"Kalp",styles:{rounded:{label:"Yuvarlak (Google)",filled:'<svg viewBox="'+ae+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g transform="translate(24, -24) scale(0.95)"><path d="'+U.heartRounded+'"/></g></svg>',empty:'<svg viewBox="'+ae+'" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g transform="translate(24, -24) scale(0.95)"><path d="'+U.heartRounded+'"/></g></svg>'}}}};function wt(e){var r=String(e||"star"),t=r.indexOf(":");return t===-1?{type:r,style:null}:{type:r.slice(0,t),style:r.slice(t+1)}}function Be(e,r){var t=Ar[e]||Ar.star,i=t.styles;return i[r]||i[Object.keys(i)[0]]}function Re(e){var r=e&&e.reviewIcon||"star",t=wt(r),i=t.style||e&&e.reviewIconStyle||"classic";return Be(t.type,i)}function _r(e,r,t){for(var i=Math.round(parseFloat(e))||0,a=Re(r),n=t&&t.sizePx,c=n?"width:"+n+"px;height:"+n+"px;":"",l="",s=1;s<=5;s++){var d=s<=i;l+='<span class="ikr-icon '+(d?"ikr-icon-filled":"ikr-icon-empty")+'" style="'+c+'">'+(d?a.filled:a.empty)+"</span>"}return l}var De="var(--ikr-review-star-color,#f59e0b)",Ye=/^(account|pages|blog|search|cart|checkout|siparis|odeme|kategori|category|urun|products?)/;function R(e){try{return new URL(e,window.location.origin).pathname.replace(/^\//,"").split("?")[0].split("/")[0]}catch(r){return""}}function Ie(e,r){var t="color:"+De+";display:inline-flex;gap:2px;align-items:center;";return'<span class="ikr-stars" style="'+t+'">'+_r(e,r)+"</span>"}function Pe(e){return e?new Date(e).toLocaleDateString("tr-TR",{year:"numeric",month:"long",day:"numeric"}):""}function Ct(e){var r=/^#([0-9A-Fa-f]{6})$/.exec(e);return r?[parseInt(r[1].slice(0,2),16),parseInt(r[1].slice(2,4),16),parseInt(r[1].slice(4,6),16)]:null}function St(e){var r=/^#[0-9A-Fa-f]{6}$/.test(e)?e:"#111111";document.documentElement.style.setProperty("--ikr-color",r);var t=Ct(r);document.documentElement.style.setProperty("--ikr-color-light",t?"rgba("+t[0]+","+t[1]+","+t[2]+",0.07)":"rgba(17,17,17,0.07)")}function Br(e,r){var t=document.getElementById("ikr-styles");t||(t=document.createElement("style"),t.id="ikr-styles",document.head.appendChild(t)),t.textContent=r,St(e)}function ne(e){return!e||e.indexOf("res.cloudinary.com")===-1?e:e.replace("/upload/","/upload/q_auto/f_auto/c_scale,w_1200/")}function Rr(e,r,t,i){var a=Re(i),n="ikr-rating-"+Math.random().toString(36).slice(2,9),c=document.createElement("div");if(c.className="ikr-rating"+(r?" ikr-rating-interactive":""),c.style.cssText="display:inline-flex;flex-direction:row-reverse;justify-content:flex-end;gap:4px;",!r){c.style.flexDirection="row";for(var l=1;l<=5;l++){var s=document.createElement("span");s.className="ikr-icon",s.style.cssText="width:24px;height:24px;display:inline-flex;color:"+(l<=e?De:"#ddd")+";",s.innerHTML=l<=e?a.filled:a.empty,c.appendChild(s)}return c}for(var d=5;d>=1;d--)(function(o){var p=document.createElement("input");p.type="radio",p.name=n,p.value=String(o),p.id=n+"-"+o,p.className="ikr-rating-input",o===e&&(p.checked=!0),p.style.cssText="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;",p.addEventListener("change",function(){t&&t(o)});var m=document.createElement("label");m.htmlFor=p.id,m.className="ikr-rating-label",m.setAttribute("aria-label",o+" y\u0131ld\u0131z"),m.style.cssText="width:24px;height:24px;display:inline-flex;cursor:pointer;transition:color .15s;",m.addEventListener("click",function(f){f.preventDefault();for(var u=c.querySelectorAll(".ikr-rating-input"),g=0;g<u.length;g++)u[g].checked=!1;p.checked=!0,t&&t(o)}),m.innerHTML='<span class="ikr-rating-filled" style="position:absolute;width:24px;height:24px;color:'+De+';pointer-events:none;">'+a.filled+'</span><span class="ikr-rating-empty" style="position:relative;width:24px;height:24px;color:#ddd;pointer-events:none;">'+a.empty+"</span>",m.style.position="relative",c.appendChild(p),c.appendChild(m)})(d);return Et(),c}var Nr=!1;function Et(){if(!Nr){Nr=!0;var e=".ikr-rating-interactive .ikr-rating-filled{opacity:0; transition:opacity .15s;}.ikr-rating-interactive .ikr-rating-empty{opacity:1; transition:opacity .15s;}.ikr-rating-interactive .ikr-rating-input:checked ~ .ikr-rating-label .ikr-rating-filled{opacity:1 !important;}.ikr-rating-interactive .ikr-rating-input:checked ~ .ikr-rating-label .ikr-rating-empty{opacity:0 !important;}.ikr-rating-interactive .ikr-rating-input:focus-visible + .ikr-rating-label{outline:2px solid "+De+";outline-offset:2px;border-radius:4px;}",r=document.createElement("style");r.setAttribute("data-ikr","rating"),r.textContent=e,document.head.appendChild(r)}}function V(e,r,t){var i=new AbortController,a=setTimeout(function(){i.abort()},t||8e3);return fetch(e,Object.assign({},r,{signal:i.signal})).finally(function(){clearTimeout(a)})}function Ir(e,r,t){document.body.style.overflow="",document.body.style.paddingRight="",document.removeEventListener("keydown",r),window.removeEventListener("popstate",t),e.parentNode&&e.parentNode.removeChild(e)}function Tt(e){var r=document.createElement("div");r.className="ikr-modal-right";var t=document.createElement("div");t.className="ikr-modal-scroll-content";var i=document.createElement("div");i.className="ikr-modal-top-row";var a=document.createElement("div");a.className="ikr-modal-stars",a.innerHTML=Ie(e.rating,B);var n=document.createElement("span");n.className="ikr-modal-date",n.textContent=Pe(e.createdAt),i.appendChild(a),i.appendChild(n),t.appendChild(i);var c=document.createElement("div");c.className="ikr-modal-title",c.textContent=e.title||"",c.style.display=e.title?"":"none",t.appendChild(c);var l=document.createElement("div");l.className="ikr-modal-author",l.textContent=e.author||"",t.appendChild(l);var s=document.createElement("div");s.className="ikr-modal-body",s.textContent=(e.comment||"").trim(),s.style.display=e.comment&&e.comment.trim()?"":"none",t.appendChild(s);var d=document.createElement("div");d.className="ikr-modal-reply";var o=document.createElement("div");o.className="ikr-modal-reply-label",o.textContent="Ma\u011Faza Sahibi";var p=document.createElement("div");return p.className="ikr-modal-reply-text",p.textContent=e.merchantReply||"",d.appendChild(o),d.appendChild(p),d.style.display=e.merchantReply?"":"none",t.appendChild(d),r.appendChild(t),r}function zt(e,r){var t=e.querySelector(".ikr-modal-scroll-content");t.querySelector(".ikr-modal-stars").innerHTML=Ie(r.rating,B),t.querySelector(".ikr-modal-date").textContent=Pe(r.createdAt);var i=t.querySelector(".ikr-modal-title");i.textContent=r.title||"",i.style.display=r.title?"":"none",t.querySelector(".ikr-modal-author").textContent=r.author||"";var a=t.querySelector(".ikr-modal-body");a.textContent=(r.comment||"").trim(),a.style.display=r.comment&&r.comment.trim()?"":"none";var n=t.querySelector(".ikr-modal-reply");n.querySelector(".ikr-modal-reply-text").textContent=r.merchantReply||"",n.style.display=r.merchantReply?"":"none",e.scrollTop=0}function ar(e,r,t,i,a,n,c,l){var s=e.images&&Array.isArray(e.images)?e.images.filter(function(T){return T&&(T.indexOf("https://")===0||T.indexOf("data:image/")===0)}):[],d=Math.min(t,s.length-1),o=document.createElement("div");o.className="ikr-modal-left";var p=document.createElement("img"),m=c==="next"?"ikr-modal-img-enter-right":c==="prev"?"ikr-modal-img-enter-left":"";p.className="ikr-modal-main-img"+(m?" "+m:""),p.src=ne(s[d]||""),p.alt="Yorum foto\u011Fraf\u0131",o.appendChild(p);var f=document.createElement("button");f.className="ikr-modal-close-mobile",f.textContent="\u2715",f.setAttribute("aria-label","Kapat"),f.onclick=function(T){T.stopPropagation(),n()},o.appendChild(f);var u=0;if(o.addEventListener("touchstart",function(T){u=T.touches[0].clientX},{passive:!0}),o.addEventListener("touchend",function(T){var b=u-T.changedTouches[0].clientX;if(!(Math.abs(b)<50)){if(b>0){if(h)re(e,r,d+1,i,a,n,!0,"next",l);else if(C){var z=i[r+1];re(z,r+1,0,i,a,n,!1,"next",l)}}else if(k)re(e,r,d-1,i,a,n,!0,"prev",l);else if(v){var _=i[r-1],P=(_.images||[]).filter(function(F){return F&&(F.indexOf("https://")===0||F.indexOf("data:image/")===0)});re(_,r-1,P.length-1,i,a,n,!1,"prev",l)}}},{passive:!0}),s.length>1){var g=document.createElement("div");g.className="ikr-modal-thumbs",s.forEach(function(T,b){var z=document.createElement("img");z.src=ne(T),z.className="ikr-modal-thumb"+(b===d?" ikr-modal-thumb-active":""),z.alt="K\xFC\xE7\xFCk resim "+(b+1),(function(_){z.onclick=function(){re(e,r,_,i,a,n,!0,null,l)}})(b),g.appendChild(z)}),o.appendChild(g)}var k=d>0,h=d<s.length-1,v=r>0,C=r<i.length-1,w=k||v,x=h||C;if(w||x){var y=document.createElement("button");y.className="ikr-modal-nav ikr-modal-nav-prev",y.innerHTML="&#8249;",y.setAttribute("aria-label","\xD6nceki"),y.style.opacity=w?"1":"0.3",y.onclick=function(T){if(T.stopPropagation(),k)re(e,r,d-1,i,a,n,!0,"prev",l);else if(v){var b=i[r-1],z=(b.images||[]).filter(function(_){return _&&_.indexOf("https://")===0});re(b,r-1,z.length-1,i,a,n,!1,"prev",l)}},o.appendChild(y);var E=document.createElement("button");E.className="ikr-modal-nav ikr-modal-nav-next",E.innerHTML="&#8250;",E.setAttribute("aria-label","Sonraki"),E.style.opacity=x?"1":"0.3",E.onclick=function(T){if(T.stopPropagation(),h)re(e,r,d+1,i,a,n,!0,"next",l);else if(C){var b=i[r+1];re(b,r+1,0,i,a,n,!1,"next",l)}},o.appendChild(E)}return o}function Pr(e,r){[-1,1].forEach(function(t){var i=r[e+t];if(i){var a=(i.images||[]).filter(function(n){return n&&(n.indexOf("https://")===0||n.indexOf("data:image/")===0)});a[0]&&(new Image().src=ne(a[0]))}})}function re(e,r,t,i,a,n,c,l,s){if(c){var d=ar(e,r,t,i,a,n,l,s);a.firstChild&&a.replaceChild(d,a.firstChild)}else{var d=ar(e,r,t,i,a,n,l,s),o=a.querySelector(".ikr-modal-right");a.firstChild&&a.replaceChild(d,a.firstChild),o&&zt(o,e);var p=s&&s.querySelector(".ikr-modal-wrap");p&&(p.scrollTop=0)}Pr(r,i)}function Ge(e,r,t){var i=(t||[]).filter(function(k){return k.images&&Array.isArray(k.images)&&k.images.some(function(h){return h&&(h.indexOf("https://")===0||h.indexOf("data:image/")===0)})}),a=i.findIndex(function(k){return k===e||k.id===e.id});a===-1&&(a=0);var n=e.images&&Array.isArray(e.images)?e.images.filter(function(k){return k&&(k.indexOf("https://")===0||k.indexOf("data:image/")===0)}):[],c=Math.max(0,n.indexOf(r)),l=document.createElement("div");l.className="ikr-modal-overlay";var s=document.createElement("div");s.className="ikr-modal";var d=!1;function o(){d||(d=!0,Ir(l,p,o))}function p(k){k.key==="Escape"&&m()}function m(){d||(d=!0,history.go(-1),Ir(l,p,o))}document.addEventListener("keydown",p);var f=window.innerWidth-document.documentElement.clientWidth;document.body.style.paddingRight=f+"px",document.body.style.overflow="hidden",history.pushState({ikrModal:!0},""),window.addEventListener("popstate",o),l.onclick=function(){m()},s.onclick=function(k){k.stopPropagation()},s.appendChild(ar(e,a,c,i,s,m,null,l)),s.appendChild(Tt(e)),Pr(a,i);var u=document.createElement("div");u.className="ikr-modal-wrap",u.appendChild(s);var g=document.createElement("button");g.className="ikr-modal-close",g.textContent="\u2715",g.setAttribute("aria-label","Kapat"),g.onclick=function(k){k.stopPropagation(),m()},u.appendChild(g),l.appendChild(u),document.body.appendChild(l)}function Or(e,r){var t=document.createElement("div");t.className="ikr-form",t.id="ikr-form-section",t.setAttribute("aria-label","Yorum formu"),t.setAttribute("role","form"),t.innerHTML=['<div style="margin-top:0;"><label style="font-weight:600;" id="ikr-stars-label">De\u011Ferlendirme <span style="color:#dc2626;">*</span></label><div id="ikr-stars-input" role="group" aria-labelledby="ikr-stars-label"></div></div>','<label for="ikr-title" style="font-weight:600;margin-top:16px;display:block;">Ba\u015Fl\u0131k</label>','<input type="text" id="ikr-title" class="ikr-input" placeholder="K\u0131sa bir ba\u015Fl\u0131k ekleyin" aria-label="Yorum ba\u015Fl\u0131\u011F\u0131" maxlength="60">','<label for="ikr-comment" style="font-weight:600;margin-top:16px;display:block;">Yorum</label>','<textarea id="ikr-comment" class="ikr-textarea" placeholder="Deneyiminizi payla\u015F\u0131n..." rows="5" aria-label="Yorum" maxlength="2000"></textarea>','<label for="ikr-name" style="font-weight:600;margin-top:16px;display:block;">Ad <span style="color:#dc2626;">*</span></label>','<input type="text" id="ikr-name" class="ikr-input" placeholder="Ad\u0131n\u0131z" aria-label="Ad" aria-required="true" maxlength="40">','<div id="ikr-photo-section" style="margin-top:16px;">','  <label style="font-weight:600;display:block;margin-bottom:8px;">Foto\u011Fraf</label>','  <label class="ikr-photo-btn" aria-label="Foto\u011Fraf ekle"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg><input type="file" id="ikr-file-input" style="display:none" accept="image/*" multiple aria-label="Foto\u011Fraf se\xE7"></label>','  <div id="ikr-photo-previews" style="margin-top:10px" aria-live="polite"></div>',"</div>",'<button id="ikr-submit" class="ikr-btn" aria-label="G\xF6nder">G\xF6nder</button>','<div id="ikr-msg" style="margin-top:10px;" role="alert" aria-live="assertive"></div>'].join("");var i=0,a=[],n=Rr(0,!0,function(m){i=m},B);t.querySelector("#ikr-stars-input").appendChild(n);var c=t.querySelector("#ikr-file-input"),l=t.querySelector("#ikr-photo-previews"),s=!1,d=t.querySelector("label.ikr-photo-btn"),o=3;function p(){var m=a.length;m>=o?(c.disabled=!0,d&&(d.style.opacity="0.4")):(c.disabled=!1,d&&(d.style.opacity="1"))}return c.onchange=async function(m){if(!s){s=!0,c.disabled=!0;var f=o-a.length,u=Array.from(m.target.files).slice(0,f);for(let k=0;k<u.length;k++){let h=u[k];if(h.size>5*1024*1024){alert(h.name+" dosyas\u0131 5MB s\u0131n\u0131r\u0131n\u0131 a\u015F\u0131yor. L\xFCtfen daha k\xFC\xE7\xFCk bir g\xF6rsel se\xE7in.");continue}let v=document.createElement("div");v.className="ikr-preview-item";let C=URL.createObjectURL(h);v.innerHTML='<img class="ikr-preview-img" src="'+C+'"><div class="ikr-preview-loading"><div class="ikr-spinner"></div></div>',l.appendChild(v);let w=v.querySelector(".ikr-preview-loading");if(typeof window!="undefined"&&window.__ikasPreviewMode){a.push(C),w.innerHTML='<span class="ikr-upload-check">\u2713</span>',setTimeout(function(){w.style.opacity="0",w.style.transition="opacity 0.4s",setTimeout(function(){w.style.display="none";let x=document.createElement("button");x.className="ikr-preview-remove",x.innerHTML="&#x2715;",x.setAttribute("aria-label","Foto\u011Fraf\u0131 kald\u0131r"),x.onclick=function(){a=a.filter(function(y){return y!==C}),v.remove(),p()},v.appendChild(x)},400)},800);continue}try{let x=await V(Y+"/api/public/upload/sign",{method:"POST"});if(!x.ok)throw x.status===429?new Error("rate_limit"):new Error("sign failed");let y=await x.json(),E=new FormData;E.append("file",h),E.append("api_key",y.api_key),E.append("timestamp",y.timestamp),E.append("signature",y.signature),E.append("folder","review_images");let b=await(await fetch("https://api.cloudinary.com/v1_1/"+y.cloud_name+"/image/upload",{method:"POST",body:E})).json();if(b.secure_url){let z=b.secure_url;a.push(z),w.innerHTML='<span class="ikr-upload-check">\u2713</span>',setTimeout(function(){w.style.opacity="0",w.style.transition="opacity 0.4s",setTimeout(function(){w.style.display="none";let _=document.createElement("button");_.className="ikr-preview-remove",_.innerHTML="&#x2715;",_.setAttribute("aria-label","Foto\u011Fraf\u0131 kald\u0131r"),_.onclick=function(){a=a.filter(function(P){return P!==z}),v.remove(),p()},v.appendChild(_)},400)},800)}}catch(x){console.error("[ikr] Image upload failed:",x);var g=x.message==="rate_limit"?"\xC7ok fazla deneme. L\xFCtfen bekleyin.":"Y\xFCkleme ba\u015Far\u0131s\u0131z.";w.innerHTML='<span class="ikr-upload-error">\u2717 '+g+"</span>"}}s=!1,c.value="",p()}},t.querySelector("#ikr-submit").onclick=async function(){var m=this,f=t.querySelector("#ikr-name").value.trim(),u=t.querySelector("#ikr-title").value.trim(),g=t.querySelector("#ikr-comment").value.trim(),k=t.querySelector("#ikr-msg");if(!i){k.innerHTML='<div style="color:#dc2626;font-size:12px;margin-top:8px;">L\xFCtfen bir y\u0131ld\u0131z se\xE7in.</div>';return}if(!f){k.innerHTML='<div style="color:#dc2626;font-size:12px;margin-top:8px;">L\xFCtfen ad\u0131n\u0131z\u0131 girin.</div>';return}if(m.disabled=!0,m.textContent="G\xF6nderiliyor\u2026",k.innerHTML="",typeof window!="undefined"&&window.__ikasPreviewMode){setTimeout(function(){t.innerHTML='<div style="text-align:center;padding:30px 20px;"><div style="font-weight:700;font-size:14px;color:var(--ikr-color,#000);">Yorumunuz i\xE7in te\u015Fekk\xFCrler!</div></div>'},600);return}try{var h=R(window.location.href),v=r||(document.querySelector("h1")?document.querySelector("h1").innerText.trim():null),C=await V(Y+"/api/public/reviews",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({storeId:H,productId:e,slug:h||null,productName:v,author:f,title:u||null,comment:g,rating:i,images:a})});if(C.ok)t.innerHTML='<div style="text-align:center;padding:30px 20px;"><div style="font-weight:700;font-size:14px;color:var(--ikr-color,#000);">Yorumunuz i\xE7in te\u015Fekk\xFCrler!</div></div>';else{var w=await C.json().catch(function(){return{}});throw new Error(w.error||"Yorum kaydedilemedi.")}}catch(y){var x=document.createElement("div");x.style.cssText="color:#dc2626;font-size:12px;margin-top:8px;",x.textContent=y.message,k.innerHTML="",k.appendChild(x),m.disabled=!1,m.textContent="G\xF6nder"}},t}function Mr(e){if(e)for(var r=document.querySelectorAll("h1,h2,h3,h4,h5,h6,div,span,p"),t=0;t<r.length;t++){var i=r[t];if(i.children.length===0&&i.textContent.trim()===e&&i.tagName!=="TITLE"&&!i.closest("[data-ikr-listing-badge]")&&!i.closest("#ikas-reviews")&&!i.closest("nav")&&!i.closest("header")&&!i.closest('[class*="breadcrumb"]')&&!i.closest('[aria-label*="breadcrumb"]'))return i}return document.querySelector("h1")}var Hr={small:{icon:14,text:"12px"},medium:{icon:16,text:"14px"},large:{icon:20,text:"16px"}};function Lt(e,r,t,i,a){for(var n=Be(r,t),c=Math.round(parseFloat(e))||0,l="",s=1;s<=5;s++){var d=s<=c;l+='<span class="ikr-icon" style="width:'+a+"px;height:"+a+'px;display:inline-flex;">'+(d?n.filled:n.empty)+"</span>"}return'<span style="color:'+i+';display:inline-flex;gap:2px;align-items:center;line-height:1;">'+l+"</span>"}function jr(e,r,t,i){var a=document.getElementById("ikr-rating-badge");if(a&&a.remove(),!!e&&!(i&&i.enabled===!1)){var n=document.getElementById("ikr-jsonld");n&&n.remove();var c=document.createElement("script");c.id="ikr-jsonld",c.type="application/ld+json",c.textContent=JSON.stringify({"@context":"https://schema.org","@type":"Product",name:t||document.title,url:window.location.href,aggregateRating:{"@type":"AggregateRating",ratingValue:e,reviewCount:r,bestRating:"5",worstRating:"1"}}),document.head.appendChild(c);var l=Mr(t);if(!(!l||!l.parentNode)){var s=i&&i.icon||"star",d=i&&i.iconStyle||"classic",o=i&&i.size||"medium",p=i&&i.color||"#f59e0b",m=Hr[o]||Hr.medium,f=document.createElement("a");f.id="ikr-rating-badge",f.href="#ikas-reviews";var u=window.getComputedStyle(l).textAlign,g=u==="center"?"center":u==="right"?"flex-end":"flex-start";f.style.cssText="display:flex;align-items:center;gap:5px;text-decoration:none;margin-bottom:10px;cursor:pointer;font-weight:400;justify-content:"+g+";",f.innerHTML=Lt(e,s,d,p,m.icon)+'<span style="font-size:'+m.text+';font-weight:400;color:#555;">'+e+" ("+r+" yorum)</span>",f.onclick=function(k){k.preventDefault();var h=document.getElementById("ikas-reviews-widget")||document.getElementById("ikas-reviews");if(h){var v=document.querySelector("header"),C=v?v.getBoundingClientRect().height:0,w=h.getBoundingClientRect().top+window.pageYOffset-C-16;window.scrollTo({top:w,behavior:"smooth"})}},l.parentNode.insertBefore(f,l.nextSibling)}}}var qr=`
  /* Widget d\u0131\u015F kutu \u2014 full-bleed: ma\u011Faza temas\u0131 widget'\u0131 padding'li bir
     section/container i\xE7ine koymu\u015F olsa bile, viewport geni\u015Fli\u011Finde yay\u0131l\u0131r.
     Teknik: width:100vw + margin-left:calc(-50vw + 50%). Bu kural widget'\u0131
     parent container'\u0131n padding'inden "d\u0131\u015Far\u0131 ta\u015F\u0131r\u0131r". Arka plan\u0131 temadan
     gelir, i\xE7erideki b\xF6l\xFCmler > * kural\u0131yla 1200px ortalan\u0131r.
     NOT: 100vw scrollbar'\u0131 hesaba katmaz \u2014 scroll varsa margin-left yerine
     parent.getBoundingClientRect() ile runtime d\xFCzeltme de yap\u0131labilir, ama
     genelde bu kural yeterli. */
  #ikas-reviews-widget{color:var(--ikr-text,rgba(0,0,0,1));background:var(--ikr-widget-bg,var(--ikr-bg,transparent));border:1px solid var(--ikr-widget-border,transparent);width:100vw;max-width:100vw;margin-left:calc(50% - 50vw);margin-right:calc(50% - 50vw);margin-top:40px;margin-bottom:40px;padding:40px 16px;box-sizing:border-box;}
  /* Do\u011Frudan widget \xE7ocuklar\u0131 \u2014 inner wrap (1200px ortal\u0131). Summary'deki
     3 s\xFCtun (puan + bars + buton) max boyutlarda ancak ~1030px tutuyor,
     1200px tavan wrap riskini pratik olarak s\u0131f\u0131rlar. */
  #ikas-reviews-widget > *{max-width:1200px;margin-left:auto;margin-right:auto;}
  /* Yorum metni ve ma\u011Faza yan\u0131t\u0131 \u2014 70ch ile okunabilir tutulur, inner 1200 olsa
     bile sat\u0131rlar 800-900px civar\u0131nda kal\u0131r. Ba\u015Fl\u0131k, summary, galeri serbest. */
  #ikas-reviews-widget .ikr-body,
  #ikas-reviews-widget .ikr-reply-text{max-width:70ch;}
  .ikr-title{font-size:var(--ikr-title-size,24px);font-weight:500;text-align:center;margin-bottom:12px;color:var(--ikr-header-title,var(--ikr-text,rgba(0,0,0,1)));}

  /* \u2500\u2500\u2500 SVG ICON WRAPPER \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
     .ikr-icon span'\u0131 SVG'yi sarar. Boyut parent'tan (em veya inline style) gelir,
     SVG de ona g\xF6re \xF6l\xE7eklenir. color \u2192 fill (currentColor) \u2014 yani renk
     .ikr-icon'a veya parent'\u0131na verildi\u011Finde SVG o rengi al\u0131r. */
  .ikr-icon{display:inline-flex;align-items:center;justify-content:center;line-height:1;flex-shrink:0;}
  .ikr-icon > svg{width:100%;height:100%;display:block;}

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

  /* Blok: Aksiyon sat\u0131r\u0131 (yorum yap + filtre) \u2014 bar row sol kenar\u0131ndan ba\u015Flar, filtre count hizas\u0131nda */
  .ikr-summary-actions{
    display:flex;flex-direction:row;align-items:center;gap:var(--ikr-col-gap);
    padding:3px 6px;box-sizing:border-box;
  }
  .ikr-write-btn{flex:1 1 auto;min-width:0;background:var(--ikr-btn-bg,var(--ikr-color,#000));color:var(--ikr-btn-text,var(--ikr-color-text,#fff));padding:12px 24px;border-radius:var(--ikr-radius,6px);cursor:pointer;border:2px solid var(--ikr-btn-border,var(--ikr-color,#000));font-weight:700;font-size:var(--ikr-btn-text-size,14px);white-space:nowrap;}
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
  .ikr-photo-section-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;}
  .ikr-photo-section-title{font-size:14px;font-weight:600;color:var(--ikr-photo-title,var(--ikr-text,rgba(0,0,0,1)));}
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
  .ikr-review{padding:20px 0;border-bottom:1px solid var(--ikr-review-border,var(--ikr-separator,rgba(0,0,0,0.08)));}
  .ikr-review-top{display:flex;align-items:flex-start;justify-content:space-between;gap:8px;}
  .ikr-review-top-left{display:flex;align-items:center;gap:8px;flex-wrap:wrap;}
  .ikr-review-stars{display:inline-flex;gap:2px;align-items:center;}
  .ikr-review-stars .ikr-icon{width:var(--ikr-star-size,20px);height:var(--ikr-star-size,20px);}
  .ikr-review-title{font-weight:700;font-size:var(--ikr-review-title-size,16px);color:var(--ikr-review-title,var(--ikr-text,rgba(0,0,0,1)));}
  .ikr-author{font-size:var(--ikr-author-size,14px);font-weight:400;font-style:italic;color:var(--ikr-review-author,var(--ikr-text,rgba(0,0,0,1)));margin-top:6px;}
  .ikr-date{color:var(--ikr-review-date,var(--ikr-text,rgba(0,0,0,1)));font-size:var(--ikr-review-date-size,12px);font-weight:400;white-space:nowrap;flex-shrink:0;}
  .ikr-body{margin-top:8px;line-height:1.65;color:var(--ikr-review-body,var(--ikr-text,rgba(0,0,0,1)));font-size:var(--ikr-review-text-size,14px);font-weight:400;}
  .ikr-body-clamped{display:-webkit-box;-webkit-line-clamp:4;-webkit-box-orient:vertical;overflow:hidden;}
  .ikr-read-more{display:block;margin-top:4px;color:var(--ikr-review-body,var(--ikr-text,rgba(0,0,0,1)));font-weight:600;cursor:pointer;font-size:var(--ikr-read-more-size,12px);}
  .ikr-gallery{display:flex;gap:10px;flex-wrap:wrap;margin-top:12px;}
  .ikr-img{width:var(--ikr-thumbnail-size,90px);height:var(--ikr-thumbnail-size,90px);object-fit:cover;border-radius:var(--ikr-radius,6px);border:1px solid var(--ikr-photo-border,var(--ikr-border,rgba(0,0,0,0.10)));cursor:zoom-in;}
  .ikr-reply{margin-top:12px;padding:12px 16px;background:var(--ikr-reply-bg-color,var(--ikr-reply-bg,rgba(0,0,0,0.03)));border-radius:var(--ikr-radius,6px);border-left:3px solid var(--ikr-reply-border,var(--ikr-color,#000));}
  .ikr-reply-header{display:flex;align-items:center;gap:8px;margin-bottom:6px;}
  .ikr-reply-label{font-weight:600;font-size:var(--ikr-reply-name-size,14px);color:var(--ikr-reply-label,var(--ikr-text,rgba(0,0,0,1)));}
  .ikr-reply-text{font-size:var(--ikr-reply-text-size,14px);font-weight:400;color:var(--ikr-reply-text,var(--ikr-text,rgba(0,0,0,1)));line-height:1.6;}

  /* Accordion form wrapper */
  #ikr-form-accordion{overflow:hidden;transition:max-height 0.35s ease,opacity 0.25s ease;}

  /* Form */
  .ikr-form{background:var(--ikr-form-bg,var(--ikr-surface,#fff));border:1px solid var(--ikr-form-border,var(--ikr-border,rgba(0,0,0,0.08)));padding:25px;border-radius:var(--ikr-radius,6px);margin:16px auto;color:var(--ikr-review-body,var(--ikr-text,rgba(0,0,0,1)));}
  .ikr-form label{font-size:14px;color:var(--ikr-review-body,var(--ikr-text,rgba(0,0,0,1)));}
  .ikr-input,.ikr-textarea{width:100%;padding:10px;margin-top:8px;background:var(--ikr-input-bg-color,var(--ikr-input-bg,#fff));border:1px solid var(--ikr-input-border,var(--ikr-border,rgba(0,0,0,0.20)));border-radius:var(--ikr-radius,6px);font-size:14px;box-sizing:border-box;color:var(--ikr-input-text-color,var(--ikr-input-text,rgba(0,0,0,0.90)));}
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
  .ikr-modal-overlay{position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;padding:16px;background:rgba(0,0,0,0.50);}
  .ikr-modal-wrap{position:relative;width:100%;max-width:813px;}
  .ikr-photo-section{margin:24px 0 32px;padding:0 4px;display:block;}
  .ikr-photo-section-header{margin-bottom:12px;display:flex;align-items:center;justify-content:space-between;}
  .ikr-photo-section-title{font-size:var(--ikr-photo-title-size,16px);font-weight:600;color:var(--ikr-text,#121926);}
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
  .ikr-modal-right{flex:1;min-height:0;overflow-y:auto;padding:0;display:flex;flex-direction:column;background:var(--ikr-modal-bg,var(--ikr-bg,#fff));color:var(--ikr-modal-text,var(--ikr-text,rgba(0,0,0,1)));}
  .ikr-modal-top-row{display:flex;align-items:center;justify-content:space-between;gap:12px;}
  .ikr-modal-stars{display:inline-flex;gap:2px;align-items:center;}
  .ikr-modal-stars .ikr-icon{width:var(--ikr-star-size,24px);height:var(--ikr-star-size,24px);}
  .ikr-modal-date{font-size:var(--ikr-review-date-size,12px);font-weight:400;color:var(--ikr-review-date,var(--ikr-modal-text,var(--ikr-text,rgba(0,0,0,1))));white-space:nowrap;flex-shrink:0;}
  .ikr-modal-title{font-weight:700;font-size:var(--ikr-review-title-size,16px);color:var(--ikr-review-title,var(--ikr-modal-text,var(--ikr-text,rgba(0,0,0,1))));}
  .ikr-modal-author{font-size:var(--ikr-author-size,14px);font-weight:400;font-style:italic;color:var(--ikr-review-author,var(--ikr-modal-text,var(--ikr-text,rgba(0,0,0,1))));}
  .ikr-modal-scroll-content{padding:24px 24px 24px;display:flex;flex-direction:column;gap:6px;}
  .ikr-modal-body{font-size:var(--ikr-review-text-size,14px);font-weight:400;line-height:1.65;color:var(--ikr-review-body,var(--ikr-modal-text,var(--ikr-text,rgba(0,0,0,1))));}
  .ikr-modal-reply{margin-top:8px;padding:12px 16px;background:var(--ikr-modal-reply-bg,var(--ikr-reply-bg-color,var(--ikr-reply-bg,rgba(0,0,0,0.03))));border-radius:var(--ikr-radius,6px);border-left:3px solid var(--ikr-modal-reply-border,var(--ikr-reply-border,var(--ikr-color,#000)));}
  .ikr-modal-reply-label{font-weight:600;font-size:var(--ikr-reply-name-size,14px);color:var(--ikr-reply-label,var(--ikr-modal-text,var(--ikr-text,rgba(0,0,0,1))));margin-bottom:4px;}
  .ikr-modal-reply-text{font-size:var(--ikr-reply-text-size,14px);font-weight:400;color:var(--ikr-reply-text,var(--ikr-modal-text,var(--ikr-text,rgba(0,0,0,1))));line-height:1.6;}

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
    .ikr-summary{padding:16px;gap:14px;--ikr-col-label:92px;--ikr-col-count:32px;}
    .ikr-review-top-left{flex-direction:column;align-items:flex-start;gap:4px;}
    .ikr-btn{width:100%;}
    /* Gallery \u2014 foto\u011Frafl\u0131 yorumlar strip'i mant\u0131\u011F\u0131: flex-wrap:nowrap +
       overflow-x:auto, thumb'lar flex-shrink:0 ile orjinal boyutta kal\u0131yor,
       s\u0131\u011Fmayanlar yatay scroll'da kayd\u0131r\u0131l\u0131yor. */
    .ikr-gallery{flex-wrap:nowrap;overflow-x:auto;padding-bottom:4px;scrollbar-width:none;}
    .ikr-gallery::-webkit-scrollbar{display:none;}
    .ikr-img{flex-shrink:0;}
  }
`;var nr={};he(nr,{meta:()=>Bt,render:()=>Rt});function ye(e){var r=e.ratingCounts,t=e.allCount,i=e.iconPair,a=e.currentRatingFilter,n=e.onFilterChange,c=document.createElement("div");c.className="ikr-summary-block ikr-summary-bars";for(var l=5;l>=1;l--){var s=r[l-1]||0,d=t>0?Math.round(s/t*100):0,o=a===l,p=document.createElement("div");p.className="ikr-bar-row"+(o?" ikr-bar-active":""),a&&!o&&(p.style.opacity="0.35");for(var m="",f=1;f<=5;f++){var u=f<=l;m+='<span class="ikr-bar-star ikr-icon '+(u?"ikr-bar-star-filled":"ikr-bar-star-empty")+'">'+(u?i.filled:i.empty)+"</span>"}p.innerHTML='<span class="ikr-bar-label">'+m+'</span><div class="ikr-bar-track"><div class="ikr-bar-fill" style="width:'+d+'%;"></div></div><span class="ikr-bar-count">('+s.toLocaleString("tr-TR")+")</span>",(function(g){p.onclick=function(){n(g)}})(l),c.appendChild(p)}return c}var K=[],Fr=!1;function At(e){for(var r=K.length-1;r>=0;r--){var t=K[r];t.trigger&&t.trigger.contains(e.target)||t.element&&t.element.contains(e.target)||t.close()}}function _t(e){if(e.key==="Escape")for(var r=K.length-1;r>=0;r--)K[r].close()}function Nt(){Fr||typeof document=="undefined"||(document.addEventListener("click",At,!0),document.addEventListener("keydown",_t),Fr=!0)}function Ue(e){for(var r=0;r<K.length;r++)K[r]!==e&&K[r].close()}function Ve(e){Nt();var r={trigger:e.trigger,element:e.element,close:e.close};return K.push(r),function(){var i=K.indexOf(r);i!==-1&&K.splice(i,1)}}function W(e){var r=e.widget,t=e.currentOrderBy,i=e.currentHasImages,a=e.onWriteClick,n=e.onSortChange,c=document.createElement("div");c.className="ikr-summary-block ikr-summary-actions";var l=document.createElement("button");l.className="ikr-write-btn",l.textContent="Yorum Yap",l.onclick=a,c.appendChild(l);var s=document.createElement("div");s.className="ikr-filter-wrap";var d=document.createElement("button");d.className="ikr-filter-btn",d.setAttribute("aria-label","Filtrele"),d.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="4" y1="6" x2="20" y2="6"/><line x1="7" y1="12" x2="17" y2="12"/><line x1="10" y1="18" x2="14" y2="18"/></svg>';var o=document.createElement("div");o.className="ikr-filter-menu";var p=[["newest","En Yeni",!1],["highest","En Y\xFCksek Puan",!1],["lowest","En D\xFC\u015F\xFCk Puan",!1],["photos","Foto\u011Frafl\u0131",!0]];function m(){o.classList.remove("ikr-open"),d.classList.remove("ikr-filter-btn-active")}function f(){Ue(u),o.classList.add("ikr-open"),d.classList.add("ikr-filter-btn-active")}p.forEach(function(g){var k=g[2],h=k?i:!i&&(t||"newest")===g[0],v=document.createElement("div");v.className="ikr-filter-item"+(h?" ikr-filter-item-active":""),v.textContent=g[1],v.onclick=function(){m(),n(g[0],k)},o.appendChild(v)}),d.onclick=function(){o.classList.contains("ikr-open")?m():f()};var u=Ve({trigger:s,element:o,close:m});return s.appendChild(d),s.appendChild(o),c.appendChild(s),c}function q(){var e=document.getElementById("ikr-form-accordion");if(e){var r=e.style.maxHeight&&e.style.maxHeight!=="0px";r?(e.style.maxHeight="0px",e.style.opacity="0"):(e.style.maxHeight=e.scrollHeight+"px",e.style.opacity="1",setTimeout(function(){e.style.maxHeight="none"},360),setTimeout(function(){var t=document.querySelector("header"),i=t?t.getBoundingClientRect().height:0,a=e.getBoundingClientRect().top+window.pageYOffset-i-16;window.scrollTo({top:a,behavior:"smooth"})},50))}}var Bt={id:"classic",name:"Klasik (A\xE7\u0131k)"};function Rt(e){var r=e.widget,t=e.data,i=e.settings,a=e.iconPair,n=e.allCount,c=e.ratingCounts,l=e.avgRatingVal,s=e.currentRatingFilter,d=e.currentOrderBy,o=e.currentHasImages,p=e.onFilterChange,m=e.onSortChange,f=document.createElement("div");f.className="ikr-summary";var u=(c[3]||0)+(c[4]||0),g=n>0?Math.round(u/n*100):0,k=document.createElement("div");k.className="ikr-summary-block ikr-summary-avg",k.innerHTML='<span class="ikr-avg-star ikr-icon">'+a.filled+'</span><span class="ikr-avg-num">'+l+"</span>",f.appendChild(k);var h=document.createElement("div");if(h.className="ikr-summary-block ikr-summary-count",h.textContent=n.toLocaleString("tr-TR")+" Yorum",f.appendChild(h),i.showRecommendation!==!1&&g>0){var v=document.createElement("div");v.className="ikr-summary-block ikr-summary-recommend",v.innerHTML='<span class="ikr-recommend-pct">%'+g+"</span> bu \xFCr\xFCn\xFC tavsiye ediyor",f.appendChild(v)}return f.appendChild(ye({ratingCounts:c,allCount:n,iconPair:a,currentRatingFilter:s,onFilterChange:p})),f.appendChild(W({widget:r,currentOrderBy:d,currentHasImages:o,onWriteClick:q,onSortChange:m})),f}var or={};he(or,{css:()=>Pt,meta:()=>It,render:()=>Ot});var Dr=`
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
  .ikr-compact-trigger-stars .ikr-icon{
    width:var(--ikr-bar-label-size,20px);height:var(--ikr-bar-label-size,20px);
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
    .ikr-compact-header{gap:8px;align-items:center;}
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
`;var It={id:"compact",name:"Kompakt (A\xE7\u0131l\u0131r)"},Pt=Dr;function Ot(e){var r=e.widget,t=e.settings,i=e.iconPair,a=e.allCount,n=e.ratingCounts,c=e.avgRatingVal,l=e.currentRatingFilter,s=e.currentOrderBy,d=e.currentHasImages,o=e.onFilterChange,p=e.onSortChange,m=document.createElement("div");m.className="ikr-summary ikr-summary-compact";var f=document.createElement("div");f.className="ikr-compact-header";var u=document.createElement("div");u.className="ikr-compact-trigger-wrap";var g=document.createElement("button");g.className="ikr-compact-trigger",g.type="button",g.setAttribute("aria-expanded","false");for(var k="",h=1;h<=5;h++)k+='<span class="ikr-icon">'+i.filled+"</span>";g.innerHTML='<span class="ikr-compact-trigger-stars">'+k+'</span><span class="ikr-compact-trigger-text">'+a.toLocaleString("tr-TR")+' Yorum</span><span class="ikr-compact-chevron"><svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M7.11 5.16L2.16 0.21L0.75 1.62L7.11 7.98L13.48 1.62L12.06 0.21L7.11 5.16Z" fill="currentColor"/></svg></span>',u.appendChild(g),f.appendChild(u);var v=W({widget:r,currentOrderBy:s,currentHasImages:d,onWriteClick:q,onSortChange:p}),C=v.querySelector(".ikr-filter-wrap"),w=v.querySelector(".ikr-write-btn"),x=document.createElement("div");x.className="ikr-compact-actions-slot",w&&x.appendChild(w),C&&x.appendChild(C),f.appendChild(x),m.appendChild(f);var y=document.createElement("div");y.className="ikr-compact-panel",y.setAttribute("role","dialog"),y.setAttribute("aria-hidden","true");var E=document.createElement("div");E.className="ikr-compact-panel-inner";var T=document.createElement("div");T.className="ikr-compact-avg",T.innerHTML='<span class="ikr-icon">'+i.filled+"</span><span>"+c+"</span>",E.appendChild(T),E.appendChild(ye({ratingCounts:n,allCount:a,iconPair:i,currentRatingFilter:l,onFilterChange:o})),y.appendChild(E);var b=typeof window!="undefined"&&window.matchMedia?window.matchMedia("(max-width:600px)"):null;function z(O){var ie=O?m:u;y.parentNode!==ie&&(y.classList.contains("ikr-open")&&(y.classList.remove("ikr-open"),y.setAttribute("aria-hidden","true"),g.setAttribute("aria-expanded","false")),ie.appendChild(y))}if(z(b?b.matches:!1),b){var _=function(O){z(O.matches)};b.addEventListener?b.addEventListener("change",_):b.addListener&&b.addListener(_)}if(w){var P=document.createElement("button");P.className="ikr-write-btn",P.textContent="Yorum Yap",P.onclick=q;var F=document.createElement("div");F.className="ikr-compact-write-row",F.appendChild(P),m.appendChild(F)}function le(){y.classList.remove("ikr-open"),y.setAttribute("aria-hidden","true"),g.setAttribute("aria-expanded","false")}function se(){Ue(J),y.classList.add("ikr-open"),y.setAttribute("aria-hidden","false"),g.setAttribute("aria-expanded","true")}g.onclick=function(){y.classList.contains("ikr-open")?le():se()};var J=null;function ge(O){J&&(J(),J=null),O||(J=Ve({trigger:u,element:y,close:le}))}if(ge(b?b.matches:!1),b){var ke=function(O){ge(O.matches)};b.addEventListener?b.addEventListener("change",ke):b.addListener&&b.addListener(ke)}if(t.showRecommendation!==!1){var X=(n[3]||0)+(n[4]||0),$=a>0?Math.round(X/a*100):0;if($>0){var Z=document.createElement("div");Z.className="ikr-summary-block ikr-summary-recommend",Z.style.marginTop="8px",Z.innerHTML='<span class="ikr-recommend-pct">%'+$+"</span> bu \xFCr\xFCn\xFC tavsiye ediyor",E.appendChild(Z)}}return m}var lr={};he(lr,{css:()=>Ht,meta:()=>Mt,render:()=>jt});var Yr=`
  .ikr-title-split{text-align:center;}

  /* Ana grid \u2014 base .ikr-summary'nin column flex'ini override et */
  .ikr-summary-split{
    display:flex;flex-direction:row;align-items:center;justify-content:space-between;
    gap:24px;width:100%;max-width:none;padding:16px 0;
  }

  .ikr-split-col{
    display:flex;flex-direction:column;align-items:center;justify-content:center;
    min-width:0;
  }

  /* Sol: ortalama puan + y\u0131ld\u0131zlar + toplam yorum */
  .ikr-split-left{flex:0 0 auto;gap:6px;text-align:center;}
  .ikr-split-left-stars{
    display:inline-flex;gap:2px;
    color:var(--ikr-review-star-color,#f59e0b);
  }
  .ikr-split-left-stars .ikr-icon{
    width:var(--ikr-bar-label-size,20px);height:var(--ikr-bar-label-size,20px);
  }
  .ikr-split-left-avg{
    font-size:var(--ikr-review-count-size,16px);
    color:var(--ikr-header-avg,var(--ikr-text,rgba(0,0,0,1)));
    font-weight:500;
  }
  .ikr-split-left-count{
    font-size:var(--ikr-review-count-size,16px);
    color:var(--ikr-header-count,var(--ikr-text,rgba(0,0,0,1)));
    font-weight:400;
  }

  /* Orta: bar chart \u2014 kendi max-width'i (340px) korunur */
  .ikr-split-mid{
    flex:1 1 auto;align-items:stretch;
  }
  .ikr-split-mid .ikr-summary-bars{
    max-width:var(--ikr-summary-max,340px);width:100%;margin:0 auto;
  }

  /* Sa\u011F: filter + write dikey */
  .ikr-split-right{
    flex:0 0 auto;gap:8px;align-items:stretch;min-width:160px;
  }
  .ikr-split-right .ikr-write-btn{
    width:100%;flex:0 0 auto;
  }
  .ikr-split-right .ikr-filter-wrap{
    align-self:flex-end;
  }

  @media(max-width:768px){
    /* Mobile: 3 kolon alt alta */
    .ikr-summary-split{
      flex-direction:column;align-items:center;gap:16px;padding:12px 0;
    }
    .ikr-split-col{width:100%;}
    .ikr-split-mid .ikr-summary-bars{max-width:100%;}
    .ikr-split-right{min-width:0;}
    .ikr-split-right .ikr-filter-wrap{align-self:flex-end;}
  }
`;var Mt={id:"split",name:"Yatay B\xF6l\xFCnm\xFC\u015F"},Ht=Yr;function jt(e){var r=e.widget,t=e.settings,i=e.iconPair,a=e.allCount,n=e.ratingCounts,c=e.avgRatingVal,l=e.currentRatingFilter,s=e.currentOrderBy,d=e.currentHasImages,o=e.onFilterChange,p=e.onSortChange,m=document.createElement("div");m.className="ikr-summary ikr-summary-split";var f=document.createElement("div");f.className="ikr-split-col ikr-split-left";for(var u="",g=1;g<=5;g++)u+='<span class="ikr-icon">'+i.filled+"</span>";var k=document.createElement("div");k.className="ikr-split-left-stars",k.innerHTML=u,f.appendChild(k);var h=document.createElement("div");h.className="ikr-split-left-avg",h.textContent=c+" / 5",f.appendChild(h);var v=document.createElement("div");v.className="ikr-split-left-count",v.textContent=a.toLocaleString("tr-TR")+" yorum",f.appendChild(v),m.appendChild(f);var C=document.createElement("div");C.className="ikr-split-col ikr-split-mid",C.appendChild(ye({ratingCounts:n,allCount:a,iconPair:i,currentRatingFilter:l,onFilterChange:o})),m.appendChild(C);var w=W({widget:r,currentOrderBy:s,currentHasImages:d,onWriteClick:q,onSortChange:p}),x=w.querySelector(".ikr-filter-wrap"),y=w.querySelector(".ikr-write-btn"),E=document.createElement("div");if(E.className="ikr-split-col ikr-split-right",x&&E.appendChild(x),y&&E.appendChild(y),m.appendChild(E),t.showRecommendation!==!1){var T=(n[3]||0)+(n[4]||0),b=a>0?Math.round(T/a*100):0;if(b>0){var z=document.createElement("div");z.className="ikr-summary-block ikr-summary-recommend",z.style.marginTop="4px",z.innerHTML='<span class="ikr-recommend-pct">%'+b+"</span> tavsiye ediyor",f.appendChild(z)}}return m}var sr={};he(sr,{css:()=>Ft,meta:()=>qt,render:()=>Dt});var Gr=`
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
`;var qt={id:"minimal",name:"Minimal (Yal\u0131n)",defaultTitle:""},Ft=Gr;function Dt(e){var r=e.widget,t=e.iconPair,i=e.allCount,a=e.avgRatingVal,n=e.currentOrderBy,c=e.currentHasImages,l=e.onSortChange,s=document.createElement("div");s.className="ikr-summary ikr-summary-minimal";var d=document.createElement("div");d.className="ikr-minimal-info";var o=document.createElement("div");o.className="ikr-minimal-row";var p=document.createElement("span");p.className="ikr-minimal-avg",p.textContent=a,o.appendChild(p);var m=document.createElement("span");m.className="ikr-minimal-stars";for(var f="",u=1;u<=5;u++)f+='<span class="ikr-icon">'+t.filled+"</span>";m.innerHTML=f,o.appendChild(m),d.appendChild(o);var g=document.createElement("div");g.className="ikr-minimal-count",g.textContent=i.toLocaleString("tr-TR")+" yorum \xFCzerinden",d.appendChild(g),s.appendChild(d);var k=W({widget:r,currentOrderBy:n,currentHasImages:c,onWriteClick:q,onSortChange:l}),h=k.querySelector(".ikr-filter-wrap"),v=k.querySelector(".ikr-write-btn"),C=document.createElement("div");if(C.className="ikr-minimal-actions",v&&C.appendChild(v),h&&C.appendChild(h),s.appendChild(C),v){var w=document.createElement("button");w.className="ikr-write-btn",w.textContent="Yorum Yap",w.onclick=q;var x=document.createElement("div");x.className="ikr-minimal-write-row",x.appendChild(w),s.appendChild(x)}return s}var dr={};he(dr,{css:()=>Gt,meta:()=>Yt,render:()=>Ut});var Ur=`
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
`;var Yt={id:"hero",name:"Vurgulu (B\xFCy\xFCk Puan)",defaultTitle:""},Gt=Ur;function Ut(e){var r=e.widget,t=e.iconPair,i=e.allCount,a=e.avgRatingVal,n=e.currentOrderBy,c=e.currentHasImages,l=e.onSortChange,s=document.createElement("div");s.className="ikr-summary ikr-summary-hero";var d=document.createElement("div");d.className="ikr-hero-info";var o=document.createElement("span");o.className="ikr-hero-avg",o.textContent=a,d.appendChild(o);var p=document.createElement("div");p.className="ikr-hero-meta";var m=document.createElement("span");m.className="ikr-hero-stars";for(var f="",u=1;u<=5;u++)f+='<span class="ikr-icon">'+t.filled+"</span>";m.innerHTML=f,p.appendChild(m);var g=document.createElement("div");g.className="ikr-hero-count",g.textContent=i.toLocaleString("tr-TR")+" yorum \xFCzerinden",p.appendChild(g),d.appendChild(p),s.appendChild(d);var k=W({widget:r,currentOrderBy:n,currentHasImages:c,onWriteClick:q,onSortChange:l}),h=k.querySelector(".ikr-filter-wrap"),v=k.querySelector(".ikr-write-btn"),C=document.createElement("div");if(C.className="ikr-hero-actions",v&&C.appendChild(v),h&&C.appendChild(h),s.appendChild(C),v){var w=document.createElement("button");w.className="ikr-write-btn",w.textContent="Yorum Yap",w.onclick=q;var x=document.createElement("div");x.className="ikr-hero-write-row",x.appendChild(w),s.appendChild(x)}return s}var Ke={classic:nr,compact:or,split:lr,minimal:sr,hero:dr};function cr(e){return Ke[e]||Ke.classic}function Vr(){return Object.keys(Ke).map(function(e){return Ke[e].css||""}).join(`
`)}var pr={};he(pr,{css:()=>Kt,meta:()=>Vt,render:()=>Wt});var Vt={id:"card",name:"Kart (Varsay\u0131lan)"},Kt="";function Wt(e,r){var t=document.createElement("div");t.className="ikr-review ikr-review-card";var i=document.createElement("div");i.className="ikr-review-top";var a=document.createElement("div");a.className="ikr-review-top-left";var n=document.createElement("span");if(n.className="ikr-review-stars",n.innerHTML=Ie(e.rating,B),a.appendChild(n),e.title){var c=document.createElement("span");c.className="ikr-review-title",c.textContent=e.title,a.appendChild(c)}var l=document.createElement("span");l.className="ikr-date",l.textContent=Pe(e.createdAt),i.appendChild(a),i.appendChild(l),t.appendChild(i);var s=document.createElement("div");s.className="ikr-author",s.textContent=e.author||"",t.appendChild(s);var d=(e.comment||"").trim();if(d){var o=document.createElement("div");o.className="ikr-body ikr-body-clamped",o.textContent=d,t.appendChild(o);var p=document.createElement("span");p.className="ikr-read-more",p.textContent="Devam\u0131n\u0131 oku",p.style.display="none",t.appendChild(p),requestAnimationFrame(function(){if(o.scrollHeight>o.clientHeight+2){p.style.display="inline";var h=!1;p.onclick=function(){h=!h,o.classList.toggle("ikr-body-clamped",!h),p.textContent=h?"Daha az g\xF6ster":"Devam\u0131n\u0131 oku"}}})}if(e.images&&Array.isArray(e.images)&&e.images.length){var m=document.createElement("div");m.className="ikr-gallery",e.images.forEach(function(h){if(!(!h||h.indexOf("https://")!==0&&h.indexOf("data:image/")!==0)){var v=document.createElement("img");v.src=ne(h),v.className="ikr-img",v.setAttribute("data-ikr-img-url",h),(function(C){v.onclick=function(){Ge(e,C,r)}})(h),m.appendChild(v)}}),t.appendChild(m)}if(e.merchantReply){var f=document.createElement("div");f.className="ikr-reply";var u=document.createElement("div");u.className="ikr-reply-header";var g=document.createElement("span");g.className="ikr-reply-label",g.textContent="Ma\u011Faza Sahibi",u.appendChild(g);var k=document.createElement("div");k.className="ikr-reply-text",k.textContent=e.merchantReply,f.appendChild(u),f.appendChild(k),t.appendChild(f)}return t}var We={card:pr};function mr(e){return We[e]||We.card}function Kr(){return Object.keys(We).map(function(e){return We[e].css||""}).join(`
`)}function I(e,r){var t=/^#([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})$/.exec(e);if(!t)return"rgba(0,0,0,"+r+")";var i=parseInt(t[1],16),a=parseInt(t[2],16),n=parseInt(t[3],16);return"rgba("+i+","+a+","+n+","+r+")"}var Wr={small:{titleSize:20,reviewTextSize:12,reviewTitleSize:12,authorSize:12,replyNameSize:12,replyTextSize:12,photoTitleSize:14,avgRatingSize:36,avgStarSize:48,reviewCountSize:14,recommendSize:12,btnTextSize:12,barLabelSize:18,barCountSize:12,reviewDateSize:10,filterTextSize:12,loadMoreSize:12,readMoreSize:10,reviewStarSize:18,minimalAvgSize:18,heroAvgSize:52},medium:{titleSize:24,reviewTextSize:14,reviewTitleSize:14,authorSize:14,replyNameSize:14,replyTextSize:14,photoTitleSize:16,avgRatingSize:46,avgStarSize:58,reviewCountSize:16,recommendSize:14,btnTextSize:14,barLabelSize:22,barCountSize:14,reviewDateSize:12,filterTextSize:14,loadMoreSize:14,readMoreSize:12,reviewStarSize:22,minimalAvgSize:22,heroAvgSize:64},large:{titleSize:28,reviewTextSize:16,reviewTitleSize:16,authorSize:16,replyNameSize:16,replyTextSize:16,photoTitleSize:18,avgRatingSize:56,avgStarSize:68,reviewCountSize:18,recommendSize:16,btnTextSize:16,barLabelSize:26,barCountSize:16,reviewDateSize:14,filterTextSize:16,loadMoreSize:16,readMoreSize:14,reviewStarSize:26,minimalAvgSize:26,heroAvgSize:76}},Jr={small:60,medium:90,large:120};function Jt(e,r){var t=r.bgColor||"#ffffff",i=r.textColor||"#111111",a=r.replyBgColor||"#f3f4f6",n=r.inputBgColor||"#ffffff",c=r.widgetBgColor||t,l=r.widgetBorderColor||"transparent",s=r.separatorColor||I(i,.08),d=r.headerTitleColor||i,o=r.headerAvgColor||i,p=r.headerCountColor||i,m=r.headerRecommendColor||i,f=r.barLabelColor||i,u=r.barFillColor||i,g=r.barTrackColor||I(i,.1),k=r.barCountColor||i,h=r.barHoverBgColor||I(i,.05),v=r.primaryColor||"#111111",C=r.primaryTextColor||"#ffffff",w=r.btnBgColor||v,x=r.btnTextColor||C,y=r.btnBorderColor||v,E=r.filterBtnBgColor||v,T=r.filterBtnTextColor||C,b=r.filterBtnBorderColor||v,z=r.filterMenuBgColor||t,_=r.filterMenuBorderColor||I(i,.12),P=r.filterItemTextColor||i,F=r.filterItemHoverBgColor||I(v,.07),le=r.filterItemActiveColor||v,se=r.reviewTitleColor||i,J=r.reviewAuthorColor||i,ge=r.reviewDateColor||i,ke=r.reviewBodyColor||i,X=r.reviewBorderColor||I(i,.08),$=r.reviewStarColor||"#f59e0b",Z=r.replyBgColor||a,O=r.replyBorderColor||v,ie=r.replyLabelColor||i,Se=r.replyTextColor||i,de=r.photoBgColor||I(i,.03),He=r.photoBorderColor||I(i,.1),ce=r.photoTitleColor||i,pe=r.formBgColor||t,me=r.formBorderColor||I(i,.08),Ee=r.inputBgColor||n,$e=r.inputTextColor||i,Ze=r.inputBorderColor||I(i,.2),j=r.placeholderColor||I(i,.35),Q=r.loadMoreBgColor||t,S=r.loadMoreTextColor||i,L=r.loadMoreBorderColor||I(i,.3),M=r.modalBgColor||t,D=r.modalTextColor||i,Te=r.modalCloseBgColor||v,ft=r.modalCloseTextColor||C,vt=r.modalCloseBorderColor||v,gt=r.modalNavBgColor||"rgba(0,0,0,0.45)",kt=r.modalNavTextColor||"#ffffff",ht=r.modalReplyBgColor||a,xt=r.modalReplyBorderColor||v,xr={"--ikr-widget-bg":c,"--ikr-widget-border":l,"--ikr-separator":s,"--ikr-header-title":d,"--ikr-header-avg":o,"--ikr-header-count":p,"--ikr-header-recommend":m,"--ikr-bar-label":f,"--ikr-bar-fill":u,"--ikr-bar-track":g,"--ikr-bar-count":k,"--ikr-bar-hover-bg":h,"--ikr-btn-bg":w,"--ikr-btn-text":x,"--ikr-btn-border":y,"--ikr-filter-btn-bg":E,"--ikr-filter-btn-text":T,"--ikr-filter-btn-border":b,"--ikr-filter-menu-bg":z,"--ikr-filter-menu-border":_,"--ikr-filter-item-text":P,"--ikr-filter-item-hover-bg":F,"--ikr-filter-item-active":le,"--ikr-review-title":se,"--ikr-review-author":J,"--ikr-review-date":ge,"--ikr-review-body":ke,"--ikr-review-border":X,"--ikr-review-star-color":$,"--ikr-reply-bg-color":Z,"--ikr-reply-border":O,"--ikr-reply-label":ie,"--ikr-reply-text":Se,"--ikr-photo-bg":de,"--ikr-photo-border":He,"--ikr-photo-title":ce,"--ikr-form-bg":pe,"--ikr-form-border":me,"--ikr-input-bg-color":Ee,"--ikr-input-text-color":$e,"--ikr-input-border":Ze,"--ikr-placeholder":j,"--ikr-load-more-bg":Q,"--ikr-load-more-text":S,"--ikr-load-more-border":L,"--ikr-modal-bg":M,"--ikr-modal-text":D,"--ikr-modal-close-bg":Te,"--ikr-modal-close-text":ft,"--ikr-modal-close-border":vt,"--ikr-modal-nav-bg":gt,"--ikr-modal-nav-text":kt,"--ikr-modal-reply-bg":ht,"--ikr-modal-reply-border":xt,"--ikr-bg":t,"--ikr-surface":t,"--ikr-text":i,"--ikr-text-faint":I(i,.45),"--ikr-border":I(i,.12),"--ikr-track-bg":I(i,.22),"--ikr-reply-bg":a,"--ikr-input-bg":n,"--ikr-input-text":i};Object.keys(xr).forEach(function(br){e.style.setProperty(br,xr[br])}),typeof window!="undefined"&&window.__ikasPreviewMode&&document.body&&(document.body.style.background=t)}async function te(e,r,t,i,a,n,c){if(ir){Fe({productId:e,settings:r,reviewsData:t,productName:i,orderBy:a,page:n,badgeSettings:c});return}qe(!0),wr(e),Cr(r),c!==void 0&&Sr(c),Er(i),a&&be(a),n&&ve(n),t!=null&&Tr(t);try{var l=cr(r.summaryLayout),s=l.meta&&l.meta.defaultTitle!==void 0?l.meta.defaultTitle:"M\xFC\u015Fteri Yorumlar\u0131",d=r.title!==void 0?r.title:s,o=document.documentElement;Jt(o,r);var p=r.primaryColor||"#111111",m=r.primaryTextColor||"#ffffff";Br(p,qr+Vr()+Kr());var f=r.borderRadius!==void 0?r.borderRadius:8,u=Wr[r.size]||Wr.medium,g=Jr[r.thumbnailSize]||Jr.medium;o.style.setProperty("--ikr-title-size",u.titleSize+"px"),o.style.setProperty("--ikr-review-text-size",u.reviewTextSize+"px"),o.style.setProperty("--ikr-review-title-size",u.reviewTitleSize+"px"),o.style.setProperty("--ikr-author-size",u.authorSize+"px"),o.style.setProperty("--ikr-reply-name-size",u.replyNameSize+"px"),o.style.setProperty("--ikr-reply-text-size",u.replyTextSize+"px"),o.style.setProperty("--ikr-color-text",m),o.style.setProperty("--ikr-radius",f+"px"),o.style.setProperty("--ikr-radius-sm",Math.max(0,f-4)+"px"),o.style.setProperty("--ikr-photo-title-size",u.photoTitleSize+"px"),o.style.setProperty("--ikr-avg-rating-size",u.avgRatingSize+"px"),o.style.setProperty("--ikr-review-count-size",u.reviewCountSize+"px"),o.style.setProperty("--ikr-recommend-size",u.recommendSize+"px"),o.style.setProperty("--ikr-btn-text-size",u.btnTextSize+"px"),o.style.setProperty("--ikr-bar-label-size",u.barLabelSize+"px"),o.style.setProperty("--ikr-minimal-avg-size",u.minimalAvgSize+"px"),o.style.setProperty("--ikr-hero-avg-size",u.heroAvgSize+"px"),o.style.setProperty("--ikr-bar-count-size",u.barCountSize+"px"),o.style.setProperty("--ikr-review-date-size",u.reviewDateSize+"px"),o.style.setProperty("--ikr-filter-text-size",u.filterTextSize+"px"),o.style.setProperty("--ikr-load-more-size",u.loadMoreSize+"px"),o.style.setProperty("--ikr-read-more-size",u.readMoreSize+"px"),o.style.setProperty("--ikr-thumbnail-size",g+"px");var k=/^#[0-9A-Fa-f]{6}$/.test(r.reviewStarColor||"")?r.reviewStarColor:"#f59e0b";o.style.setProperty("--ikr-review-star-color",k),o.style.setProperty("--ikr-star-size",u.reviewStarSize+"px"),o.style.setProperty("--ikr-avg-star-size",u.avgStarSize+"px");var h=Re(r),v=document.getElementById("ikas-reviews");if(!v){var C=document.getElementById("ikas-reviews-anchor");if(!C)return;v=document.createElement("div"),v.id="ikas-reviews",v.style.minHeight="200px",C.appendChild(v)}if(r.enabled===!1){v.style.minHeight="auto",v.innerHTML='<div style="padding: 40px 20px; margin-top: 24px; text-align: center; color: #6e6d7a; font-family: Inter, sans-serif; border: 1px dashed #e3e1e5; border-radius: '+(r.borderRadius!==void 0?r.borderRadius:8)+'px; background: #fafafa; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px;"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #6e6d7a; margin-bottom: 4px;"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg><div style="font-weight: 500; font-size: 18px; color: #1a191a; letter-spacing: -0.01em;">Widget \u015Fu anda Pasif durumda</div><div style="font-size: 16px; color: #6e6d7a; max-width: 380px; line-height: 1.5;">Canl\u0131 ma\u011Fazan\u0131zda m\xFC\u015Fterileriniz hi\xE7bir yorum alan\u0131 g\xF6rmeyecektir.</div></div>',qe(!1);var w=Le;Fe(null),w&&te(w.productId,w.settings,w.reviewsData,w.productName,w.orderBy,w.page,w.badgeSettings);return}v.innerHTML='<p class="ikr-state-msg ikr-state-loading">Yorumlar y\xFCkleniyor...</p>';try{var x=t||{},y=x.data&&x.data.reviews||[],E=x.data&&x.data.totalCount||0,T=v.cloneNode(!1);v.parentNode.replaceChild(T,v),v=T;var b=document.createElement("div");if(b.id="ikas-reviews-widget",typeof window!="undefined"&&window.__ikasPreviewMode&&(b.style.width="100%",b.style.maxWidth="100%",b.style.marginLeft="0",b.style.marginRight="0"),d){var z=document.createElement("div"),_=r.summaryLayout||"classic";z.className="ikr-title ikr-title-"+_,z.textContent=d,b.appendChild(z)}var P=x.data&&x.data.allCount||0,F=x.data&&x.data.ratingCounts||null,le=F||[0,0,0,0,0],se=x.data&&x.data.avgRating||"0.0";if(!F&&y.length>0){y.forEach(function(S){S.rating>=1&&S.rating<=5&&le[S.rating-1]++});var J=y.reduce(function(S,L){return S+L.rating},0);se=(J/y.length).toFixed(1)}if(P>0){var ge=cr(r.summaryLayout),ke=ge.render({widget:b,data:x,settings:r,iconPair:h,allCount:P,ratingCounts:le,avgRatingVal:se,currentRatingFilter:ue,currentOrderBy:G,currentHasImages:fe,onFilterChange:async function(S){je(ue===S?null:S),ve(1);var L=await Oe(ee,G,1,ue,fe);await te(ee,B,L,xe,G,1)},onSortChange:async function(S,L){ve(1),L?(tr(!0),be("newest")):(tr(!1),be(S));var M=await Oe(ee,G,1,ue,fe);await te(ee,B,M,xe,G,1)}});b.appendChild(ke)}else{var X=document.createElement("button");X.className="ikr-write-btn",X.style.cssText="display:block;margin:16px auto 0;",X.textContent="Yorum Yap",X.onclick=function(){var S=document.getElementById("ikr-form-accordion");if(S){var L=S.style.maxHeight&&S.style.maxHeight!=="0px";L?(S.style.maxHeight="0px",S.style.opacity="0"):(S.style.maxHeight=S.scrollHeight+"px",S.style.opacity="1",setTimeout(function(){S.style.maxHeight="none"},360),setTimeout(function(){var M=document.querySelector("header"),D=M?M.getBoundingClientRect().height:0,Te=S.getBoundingClientRect().top+window.pageYOffset-D-16;window.scrollTo({top:Te,behavior:"smooth"})},50))}},b.appendChild(X)}var $=document.createElement("div");$.id="ikr-form-accordion",$.style.cssText="overflow:hidden;max-height:0px;opacity:0;transition:max-height 0.35s ease,opacity 0.25s ease;",$.appendChild(Or(e,i)),b.appendChild($);var Z=y.filter(function(S){return S.images&&Array.isArray(S.images)&&S.images.some(function(L){return L&&(L.indexOf("https://")===0||L.indexOf("data:image/")===0)})});if(r.showPhotoGallery!==!1&&!fe&&Z.length>0){var O=document.createElement("div");O.className="ikr-photo-section";var ie=document.createElement("div");ie.className="ikr-photo-section-header";var Se=document.createElement("span");Se.className="ikr-photo-section-title",Se.textContent="Foto\u011Frafl\u0131 Yorumlar",ie.appendChild(Se),O.appendChild(ie);var de=document.createElement("div");de.className="ikr-photo-strip";var He=0;Z.forEach(function(S){if(!(He>=10)){var L=S.images.find(function(D){return D&&(D.indexOf("https://")===0||D.indexOf("data:image/")===0)});if(L){var M=document.createElement("img");M.src=ne(L),M.className="ikr-photo-strip-thumb",M.alt="Yorum foto\u011Fraf\u0131",(function(D,Te){M.onclick=function(){Ge(Te,D,y)}})(L,S),de.appendChild(M),He++}}});var ce=document.createElement("button");ce.className="ikr-photo-strip-arrow ikr-photo-strip-arrow-prev",ce.innerHTML="&#8249;",ce.setAttribute("aria-label","\xD6nceki"),ce.onclick=function(){de.scrollBy({left:-200,behavior:"smooth"})};var pe=document.createElement("button");pe.className="ikr-photo-strip-arrow ikr-photo-strip-arrow-next",pe.innerHTML="&#8250;",pe.setAttribute("aria-label","Sonraki"),pe.onclick=function(){de.scrollBy({left:200,behavior:"smooth"})};var me=document.createElement("div");me.className="ikr-photo-strip-wrap",me.appendChild(ce),me.appendChild(de),me.appendChild(pe),O.appendChild(me),b.appendChild(O)}if(y.length===0){var Ee=document.createElement("p");Ee.className="ikr-state-msg",Ee.textContent="Hen\xFCz yorum yok.",b.appendChild(Ee)}else{var $e=mr(r.reviewLayout);y.forEach(function(S){b.appendChild($e.render(S,y))})}var Ze=x.data&&x.data.hasMore;if(Ze){var j=document.createElement("button");j.className="ikr-load-more",j.textContent="Daha Fazla G\xF6ster",j.onclick=async function(){j.disabled=!0,j.textContent="Y\xFCkleniyor...";var S=ze+1,L=await Oe(ee,G,S,ue,fe);if(L&&L.data&&L.data.reviews){ve(S);var M=mr(B.reviewLayout);L.data.reviews.forEach(function(D){b.insertBefore(M.render(D,L.data.reviews),j)}),L.data.hasMore?(j.disabled=!1,j.textContent="Daha Fazla G\xF6ster"):j.remove()}else j.remove()},b.appendChild(j)}v.appendChild(b),jr(P>0?se:null,E,i,er)}catch(S){console.error("[ikr] render error:",S),v.innerHTML='<p style="text-align:center;color:#dc2626;">Yorumlar y\xFCklenirken bir hata olu\u015Ftu.</p>'}}finally{if(qe(!1),Le){var Q=Le;Fe(null),te(Q.productId,Q.settings,Q.reviewsData,Q.productName,Q.orderBy,Q.page,Q.badgeSettings)}}}var oe="ikr_settings_"+H,Xt=300*1e3,$t=30*1e3;async function fr(){if(window.__ikasPreviewMode){try{var e=window.__ikasPreviewBaseUrl||Y,r=window.__ikasPreviewSettings||sessionStorage.getItem("ikr_preview_settings")||"",t={};if(r)try{t=JSON.parse(r)}catch(o){}var i=await V(e+"/api/preview/settings");if(i.ok){var a=await i.json();return a.widgets&&a.widgets.reviews&&Object.keys(t).length&&(a.widgets.reviews=Object.assign({},a.widgets.reviews,t)),a}}catch(o){}return null}var n=null,c=Ne(oe);if(c)try{var l=JSON.parse(c);if(l&&l.t!==void 0)if(l.notFound){if(Date.now()-l.t<$t)return null;N(oe,"")}else if(l.v){if(Date.now()-l.t<Xt)return l.v;n=l.v,N(oe,"")}else N(oe,"");else N(oe,"")}catch(o){N(oe,"")}try{var s=await V(Y+"/api/public/settings?publicApiKey="+encodeURIComponent(H));if(!s.ok)return s.status===404&&N(oe,JSON.stringify({t:Date.now(),notFound:!0})),n||null;var d=await s.json();return N(oe,JSON.stringify({t:Date.now(),v:d})),d}catch(o){return console.error("[ikr] fetchSettings error:",o),n||null}}var Zt=60*1e3;async function Oe(e,r,t,i,a){if(window.__ikasPreviewMode){try{var n=window.__ikasPreviewBaseUrl||Y,c=n+"/api/preview/reviews?page="+encodeURIComponent(t||1),l=await V(c);if(l.ok)return await l.json()}catch(g){}return null}r=r||"newest",t=t||1;var s="ikr_reviews_"+H+"_"+e+"_"+r+"_"+t+"_"+(i||"")+"_"+(a?"1":"0"),d=null,o=Ne(s);if(o)try{var p=JSON.parse(o);if(p&&p.t!==void 0&&p.v){if(Date.now()-p.t<Zt)return p.v;d=p.v,N(s,"")}else N(s,"")}catch(g){N(s,"")}try{var m=Y+"/api/public/reviews?storeId="+encodeURIComponent(H)+"&productId="+encodeURIComponent(e)+"&orderBy="+encodeURIComponent(r)+"&page="+encodeURIComponent(t)+(i?"&rating="+encodeURIComponent(i):"")+(a?"&hasImages=true":""),f=await V(m);if(!f.ok)return d||null;var u=await f.json();return N(s,JSON.stringify({t:Date.now(),v:u})),u}catch(g){return console.error("[ikr] fetchReviews error:",g),d||null}}var ur={};async function we(e,r){var t=document.getElementById("ikr-rating-badge");t&&t.remove();var i=document.getElementById("ikr-jsonld");if(i&&i.remove(),!ur[e]){ur[e]=!0;var a={primaryColor:"#111111",title:"M\xFC\u015Fteri Yorumlar\u0131",enabled:!0},n={enabled:!0,icon:"star",size:"medium",color:"#f59e0b"};try{var c=await fr();if(!c)return;var l=c.widgets&&c.widgets.reviews||a,s=c.widgets&&c.widgets.badge||n;if(l.enabled===!1)return;be("newest"),ve(1),je(null);var d=await Oe(e,"newest",1,null);await te(e,l,d,r,"newest",1,s)}catch(o){console.error("[ikr] bootstrap error:",o),await te(e,a,null,r,void 0,void 0,n)}finally{delete ur[e]}}}function vr(){try{var e=window.__NEXT_DATA__&&window.__NEXT_DATA__.props&&window.__NEXT_DATA__.props.pageProps;if(e&&e.pageType==="PRODUCT"&&e.pageSpecificData&&e.pageSpecificData.id)return{id:e.pageSpecificData.id,name:e.pageSpecificData.name||null}}catch(i){}if(window.IkasStorefront&&window.IkasStorefront.product&&window.IkasStorefront.product.id)return{id:window.IkasStorefront.product.id,name:window.IkasStorefront.product.name||null};var r=window.location.pathname.match(/--([a-f0-9-]{36})(?:\/|$|\?)/);if(r)return{id:r[1],name:null};var t=new URLSearchParams(window.location.search).get("productId");return t?{id:t,name:null}:null}function Xr(){var e={},r={};return document.querySelectorAll("a[href]").forEach(function(t){try{var i=t.getAttribute("href");if(!i||i.charAt(0)==="#"||i.charAt(0)==="?")return;var a=R(t.href);if(!a||r[a]||!/^[a-z0-9][a-z0-9-]{2,}$/.test(a)||Ye.test(a))return;r[a]=!0,e[a]=null}catch(n){}}),Object.keys(Ae).forEach(function(t){e[t]=Ae[t]}),e}var Qt=300*1e3,$r=50;async function Zr(e){var r="ikr_ratings_"+H,t={},i=Ne(r);if(i)try{var a=JSON.parse(i);a&&a.t!==void 0&&Date.now()-a.t<Qt?t=a.v||{}:N(r,"")}catch(d){N(r,"")}var n=e.filter(function(d){return!t[d]});if(!n.length)return t;for(var c=[],l=0;l<n.length;l+=$r)c.push(n.slice(l,l+$r));var s=await Promise.all(c.map(function(d){var o=Y+"/api/public/ratings-by-slug?storeId="+encodeURIComponent(H)+"&slugs="+d.map(encodeURIComponent).join(",");return V(o).then(function(p){return p.ok?p.json().then(function(m){return m.data||{}}):{}}).catch(function(){return{}})}));return s.forEach(function(d){n.forEach(function(o){t[o]||(t[o]={average:0,count:0,_empty:!0})}),Object.keys(d).forEach(function(o){t[o]=d[o]})}),N(r,JSON.stringify({t:Date.now(),v:t})),t}var ei="var(--ikr-badge-color,#f59e0b)",Qr=13,ri="display:flex;align-items:center;gap:3px;margin-top:0px;margin-bottom:4px;font-size:13px;font-weight:400;color:#555;pointer-events:none;";function ti(e){for(var r=Be("star","classic"),t=Math.round(parseFloat(e))||0,i="",a=1;a<=5;a++){var n=a<=Math.min(t,5);i+='<span class="ikr-icon" style="width:'+Qr+"px;height:"+Qr+'px;display:inline-flex;">'+(n?r.filled:r.empty)+"</span>"}return'<span style="color:'+ei+';display:inline-flex;gap:1px;align-items:center;">'+i+"</span>"}function Me(e,r){var t=document.createElement("div");return t.setAttribute("data-ikr-listing-badge","1"),t.style.cssText=ri+"justify-content:"+(r||"flex-start")+";",t.innerHTML=ti(e.avg)+'<span style="font-weight:400;">'+e.avg+" ("+e.count+")</span>",t}var et=".product-name",rt=".add-to-basket-modal",tt="h1.product-name",Je=".single-product-container-main",gr=".single-product-product-name",it=[".hero-image-banner-main",".hero-image-main",".home-slider-main",'[class*="hero-"]','[class*="banner-"]','[class*="slider-banner"]','[class*="marquee"]'].join(","),at=[".category-products-main",".products-slider-main",".infinite-scroll-component",'[class*="product-list"]',".single-product-container-main",".product-block-container"].join(",");var nt='[class*="productTitle"],[class*="productName"],[class*="product_title"],[class*="product_name"],[class*="product-title"],[class*="product-name"]',ii=/^(tükendi|sold out|out of stock|stokta yok|satıldı|unavailable)$/i;function kr(e,r){var t=e.querySelector(et);if(t)return t;if(e.matches&&e.matches(nt))return e;var i=e.querySelector(nt);if(i)return i;if(r){for(var a=e.querySelectorAll("*"),n=0;n<a.length;n++)if(a[n].children.length===0&&a[n].textContent.trim()===r)return a[n]}for(var c=e.querySelectorAll("p, h1, h2, h3, h4, h5, h6, span, div"),l=0;l<c.length;l++){var s=c[l],d=s.textContent.trim();if(!(!d||d.length<2||d.length>150)&&!/^[\d\s.,₺$€£%]+$/.test(d)&&!ii.test(d)&&!(s.closest("figure")||s.closest("picture"))&&!(s.children.length>1))return s}return null}function ai(e,r,t,i){if(!e.getAttribute("data-ikr-badge")){var a=R(e.href);if(e.id==="ikr-rating-badge"){e.setAttribute("data-ikr-badge","1");return}if(a===i&&e.getAttribute("href")&&e.getAttribute("href").charAt(0)==="#"){e.setAttribute("data-ikr-badge","1");return}if(e.closest("header")||e.closest("nav")){e.setAttribute("data-ikr-badge","1");return}if(e.closest('[class*="basket"]')||e.closest('[class*="cart"]')){e.setAttribute("data-ikr-badge","1");return}if(e.closest(Je)&&!e.closest(gr)){e.setAttribute("data-ikr-badge","1");return}if(a===i&&e.closest(gr)){e.setAttribute("data-ikr-badge","1");return}if(e.closest(it)){e.setAttribute("data-ikr-badge","1");return}var n=!!e.querySelector("a[href]"),c=Array.from(e.childNodes).filter(function(u){return u.nodeType===3}).map(function(u){return u.textContent.trim()}).join("").trim(),l=!!kr(e,t);if(!c&&!l&&!n){e.setAttribute("data-ikr-badge","1");return}if(e.setAttribute("data-ikr-badge","1"),n){e.querySelectorAll("a[href]").forEach(function(u){u.setAttribute("data-ikr-badge","1")});var s=kr(e,t);if(!s||s.querySelector("[data-ikr-listing-badge]"))return;var d=window.getComputedStyle(s).textAlign;s.appendChild(Me(r,d==="center"?"center":d==="right"?"flex-end":"flex-start"));return}var o=kr(e,t);if(!(o&&o.querySelector("[data-ikr-listing-badge]")))if(o){var p=window.getComputedStyle(o).textAlign;o.appendChild(Me(r,p==="center"?"center":p==="right"?"flex-end":"flex-start"))}else{var m=Me(r,"flex-start"),f=e.firstElementChild;f?e.insertBefore(m,f):e.appendChild(m)}}}function ni(e,r){var t=document.querySelector(rt);if(t){var i=t.querySelector(tt);if(!(!i||i.querySelector("[data-ikr-listing-badge]"))){var a=null;if(_e&&r[_e]&&(a=_e),!a){var n=R(window.location.pathname);n&&r[n]&&(a=n)}if(!a){var c=i.textContent.trim();Object.keys(e).forEach(function(p){if(!a){var m=e[p];m&&m.trim()===c&&r[p]&&(a=p)}})}if(!a){var l=document.querySelector(Je);if(l){var s=l.querySelector("a[href]");if(s){var d=R(s.href);d&&r[d]&&(a=d)}}}if(!a){var o=i.textContent.trim().toLowerCase();document.querySelectorAll("a[href]").forEach(function(p){if(!a&&!(p.closest("header")||p.closest("nav"))&&!p.closest(Je)){var m=p.textContent.trim().toLowerCase();if(m&&m===o){var f=R(p.href);f&&r[f]&&(a=f)}}})}!a||!r[a]||r[a]._empty||r[a].count===0||i.appendChild(Me(r[a],"flex-start"))}}}function ot(e,r){var t=R(window.location.pathname),i=document.querySelectorAll(at),a=[];i.forEach(function(n){n.tagName==="A"&&n.href?a.push(n):n.querySelectorAll("a[href]").forEach(function(c){a.push(c)})}),Object.keys(e).forEach(function(n){var c=r[n];if(!(!c||c._empty||c.count===0)){var l=e[n];a.forEach(function(s){R(s.href)===n&&ai(s,c,l,t)})}}),ni(e,r)}async function Ce(){if(A.inProgress){A.queued=!0;return}if(!A.rendered){A.rendered=!0,A.inProgress=!0;try{var e=A.navCleanup;e&&(A.navCleanup=!1);var r=Xr();if(!Object.keys(r).length){A.rendered=!1;return}var t=await Promise.all([fr(),Zr(Object.keys(r))]),i=t[0];if(!i){A.rendered=!1;return}var a=t[1],n=i&&i.widgets||{},c=n.badge&&n.badge.color||"#f59e0b";if(n.badge&&n.badge.enabled===!1){A.rendered=!1;return}document.documentElement.style.setProperty("--ikr-badge-color",c),e&&(document.querySelectorAll("[data-ikr-listing-badge]").forEach(function(l){l.remove()}),document.querySelectorAll("[data-ikr-badge]").forEach(function(l){l.removeAttribute("data-ikr-badge")})),ot(r,a)}finally{A.inProgress=!1,A.queued&&(A.queued=!1,A.rendered=!1,Ce())}}}var lt=!1,st=!1;function pt(){st||(st=!0,document.addEventListener("click",function(e){var r=e.target.closest("a[href]");if(r&&!(r.closest("header")||r.closest("nav"))&&!(r.closest('[class*="basket"]')||r.closest('[class*="cart"]'))){var t=R(r.href);!t||t.length<3||zr(t)}},!0))}var dt=!1,ct=typeof location!="undefined"?location.pathname:"";function Xe(){try{if(location.pathname===ct)return;ct=location.pathname;var e=document.getElementById("ikr-rating-badge");e&&e.remove();var r=document.getElementById("ikr-jsonld");r&&r.remove()}catch(t){}}function oi(){if(!dt){dt=!0;var e=history.pushState,r=history.replaceState;history.pushState=function(){var t=e.apply(this,arguments);return Xe(),t},history.replaceState=function(){var t=r.apply(this,arguments);return Xe(),t},window.addEventListener("popstate",Xe),window.addEventListener("hashchange",Xe)}}function hr(){if(oi(),window.IkasEvents){if(lt)return;lt=!0,window.IkasEvents.subscribe({id:"ikas-reviews-widget",callback:function(n){if(n&&n.type==="VIEW_LISTING"){var c=n.data&&n.data.productDetails;Array.isArray(c)&&c.forEach(function(o){o&&o.metaData&&o.metaData.slug&&o.name&&(Ae[o.metaData.slug]=o.name)})}if(n&&n.type==="PRODUCT_VIEW"){var l=n.data&&n.data.productDetail&&n.data.productDetail.id,s=n.data&&n.data.productDetail&&n.data.productDetail.name;l&&(N("ikr_reviews_"+H+"_"+l,""),we(l,s))}if(n&&n.type==="PAGE_VIEW"){var d=Date.now();if(A.lastPageView&&d-A.lastPageView<800)return;A.lastPageView=d,A.navCleanup=!0,A.rendered=!1,Ce()}}});var e=vr();if(e)we(e.id,e.name);else{let n=function(){var c=vr();c?we(c.id,c.name):r<20&&(r++,setTimeout(n,100))};var i=n,r=0;setTimeout(n,100)}setTimeout(function(){A.rendered||Ce()},2e3)}else{let n=function(){window.IkasEvents?hr():t<100&&(t++,setTimeout(n,50))};var a=n,t=0;setTimeout(n,50)}}var mt=null;function ut(){if(typeof MutationObserver!="undefined"){var e=new MutationObserver(function(r){var t=r.some(function(i){return Array.from(i.addedNodes).some(function(a){return!(a.nodeType!==1||a.hasAttribute&&(a.hasAttribute("data-ikr-listing-badge")||a.id==="ikr-rating-badge"||a.id==="ikr-reviews-widget")||a.closest&&(a.closest("[data-ikr-listing-badge]")||a.closest("#ikr-rating-badge")||a.closest("#ikr-reviews-widget"))||a.querySelector&&a.querySelector("[data-ikr-listing-badge],#ikr-reviews-widget,#ikr-rating-badge"))})});t&&(clearTimeout(mt),mt=setTimeout(function(){var i=Array.from(document.querySelectorAll("a[href]")).some(function(a){if(a.getAttribute("data-ikr-badge"))return!1;var n=R(a.href);return n&&n.length>=3&&!Ye.test(n)});i&&(A.rendered=!1,Ce())},300))});e.observe(document.body,{childList:!0,subtree:!0})}}var li=window.__ikasPreviewMode===!0;if(li){let e=function(){try{window.parent.postMessage({type:"IKR_WIDGET_READY"},"*")}catch(t){}},r=function(){we("mock-product","\xD6rnek \xDCr\xFCn"),e()};si=e,di=r,window.addEventListener("message",function(t){var i=t.data;if(!(!i||i.type!=="IKR_SETTINGS_UPDATE")){var a=i.settings;if(!(!a||!B)){var n=Object.assign({},B,a);te(ee,n,rr,xe,G,ze)}}}),document.readyState==="loading"?document.addEventListener("DOMContentLoaded",r):r()}else if(H){let e=function(){hr(),pt(),ut()};ci=e,document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e):e()}var si,di,ci;})();
