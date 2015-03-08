## Synopsis

This tiny library uses the Web Storage (localStorage) to cache JavaScrip files. Cached files will be loaded much faster than requesting them from a server (even local ones). <br>
  My test showed: 
  
| | |
|---|---|
|Loading jQuery from CDN  | __268ms__|
|Loading jQuery from localStorage  | __47ms__ |

The library is so simple that you can read and understand all of its code!

## Code Example

```javascript   
  requireScript('jquery', '1.11.2', 'http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js', function(){
    requireScript('examplejs', '0.0.3', 'example.js');
  });
```
In this example I cache jQuery and a local file that is dependent on jQuery. On the first load it will be loaded from the provided URL and on the second load it will be loaded from the localStorage. Changing the version string will cause the cache to be cleared (1st load) and a new version to be loaded from the sever (2nd load). Since the `example.js` is dependen on jQuery I load it in withing a callback call that is triggered after loading jQuery.


## Motivation

My feeling was that caching in localStorage should be a simple and straight forward. However I could not find a simple library without depencies that fulfilled this so I created this mini project ,for documentation and learning.

## Installation

Copy the code from `chached-webpgr.min.js` (not updloaded yet) into your .html file (loading it from a server would make it slower!) and use the code from the Code Example to load your scripts. Be aware of depencies, and use the callbacks for dependent scripts like in the example.

## API Reference

```javascript
requireScript(name, version, url, callback)
```
provides the external API. The internal API consits of 3 functions.
```javascript
_loadScript(url, name, version, callback)
_injectScript(content, name, version, callback)
_cacheScript(name, version, url)
```
Please read the code to learn how they work (they are very short!).

## License

cached-webpgr.js is released under the [MIT License](http://webpgr.mit-license.org/).
