/*
 * cached-webpgr.js - simple localStorage based caching of JavaScript files
 * https://github.com/webpgr/cached-webpgr.js
 * Author: Webpgr http://webpgr.com by Falko Krause <falko@webpgr.com>
 * License: MIT
 */
function _cacheScript(c,a,b){var d=new XMLHttpRequest();d.onreadystatechange=function(){if(d.readyState==4){if(d.status==200){localStorage.setItem(c,JSON.stringify({content:d.responseText,version:a}))}else{console.warn("error loading "+b)}}};d.open("GET",b,true);d.send()}function _loadScript(c,b,a,e){var d=document.createElement("script");if(d.readyState){d.onreadystatechange=function(){if(d.readyState=="loaded"||d.readyState=="complete"){d.onreadystatechange=null;_cacheScript(b,a,c);if(e){e()}}}}else{d.onload=function(){_cacheScript(b,a,c);if(e){e()}}}d.setAttribute("src",c);document.getElementsByTagName("head")[0].appendChild(d)}function _injectScript(g,e,d,b,i){var h=JSON.parse(g);if(h.version!=b){localStorage.removeItem(d);_loadScript(e,d,b,i);return}var f=document.createElement("script");f.type="text/javascript";var a=document.createTextNode(h.content);f.appendChild(a);document.getElementsByTagName("head")[0].appendChild(f);if(i){i()}}function requireScript(d,a,b,f){var e=localStorage.getItem(d);if(e==null){_loadScript(b,d,a,f)}else{_injectScript(e,b,d,a,f)}};
