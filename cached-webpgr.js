/*
 * cached-webpgr.js - simple localStorage based caching of JavaScript files
 * https://github.com/webpgr/cached-webpgr.js
 * Author: Webpgr http://webpgr.com by Falko Krause <falko@webpgr.com>
 * License: MIT
 *
 * usage example:
 *  ```
 *  requireScript('jquery', '1.11.2', 'http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js', function(){
 *    requireScript('examplejs', '0.0.3', 'example.js');
 *  });
 *  ```
 */


/**
 * ##_cacheScript
 * This function requires IE7+, Firefox, Chrome, Opera, Safari.
 * It will make an ajax call to retrive the desired script from the provided url and store it
 * in the localStorage under the provided name. The stored script will be wrapped like in this example:
 * `{content: '// scrip content $(document).ready(...)', version: '1.02.03'}`
 * @param {string} name localStorage identifier; shoud be the same as on the server-side
 * @param {string} url `path/to/script.js`; shoud be on the same server (or with remove with CORS header access-control-allow-origin:*)
 */
function _cacheScript(name, version, url) {
    var xmlhttp = new XMLHttpRequest(); // code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 200) {
          localStorage.setItem(name, JSON.stringify({
            content: xmlhttp.responseText,
            version: version
          }));
        } else {
          console.warn('error loading '+url);
        }
      }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
  }
  /**
   * ##_loadScript
   * For loading external scripts (local or cross domain with CORS)
   * @param {string} url (see `requireScript`)
   * @param {string} name (see `requireScript`)
   * @param {string} version (see `requireScript`)
   * @param {Function} callback (see `requireScript`)
   */
function _loadScript(url, name, version, callback) {
  var s = document.createElement('script');

  if (s.readyState) { //IE
    s.onreadystatechange = function() {
      if (s.readyState == "loaded" || s.readyState == "complete") {
        s.onreadystatechange = null;
        _cacheScript(name, version, url);
        if (callback) callback();
      }
    };
  } else { //Others
    s.onload = function() {
      _cacheScript(name, version, url);
      if (callback) callback();
    };
  }

  s.setAttribute("src", url);
  document.getElementsByTagName("head")[0].appendChild(s)
}

/**
 * ##_injectScript
 * Injects a script loaded from localStorage into the DOM.
 * If the script version is differnt than the requested one, the localStorage key is cleared and a new version will be loaded next time.
 * @param {object} content wrapped serialized code `{content: '// scrip content $(document).ready(...)', version: '1.02.03'}`
 * @param {string} name (see `requireScript`)
 * @param {string} version (see `requireScript`)
 * @param {Function} callback (see `requireScript`)
 */
function _injectScript(content, url, name, version, callback) {
  var c = JSON.parse(content);
  // cached version is not the request version, clear the cache, this will trigger a reload next time
  if (c.version != version) {
    localStorage.removeItem(name);
    _loadScript(url, name, version, callback);
    return;
  }
  var s = document.createElement('script');
  s.type = "text/javascript";
  var scriptContent = document.createTextNode(c.content);
  s.appendChild(scriptContent);
  document.getElementsByTagName("head")[0].appendChild(s);
  if (callback) callback();
}

/**
 * ##requireScript
 * If the requested script is not available in the localStorage it will be loaded from the provided url (see `_loadScript`).
 * If the script is present in the localStorage it will be injected (see `_injectScript`) into the DOM.
 * @param {string} name identifier of the script in the local cache
 * @param {string} version version string that is used to check if the script needs to be updated
 * @param {string} url  `path/to/script.js` that should be caced; can be local (or cross domain with CORS header allowing cross domain access)
 * @param {Function} callback function that is extecuted once the script is loaded
 */
function requireScript(name, version, url, callback) {
  var c = localStorage.getItem(name);
  if (c == null) {
    _loadScript(url, name, version, callback);
  } else {
    _injectScript(c, url, name, version, callback);
  }
}
