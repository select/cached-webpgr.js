## Synopsis

This tiny library uses the Web Storage (localStorage) to cache JavaScrip files. Cached files will be loaded much faster than requesting them from a server (even local ones). <br>
  My test showed: 
Loading jQuery from CDN  | 268ms
Loading jQuery from localStorage  | 47ms

The library is so simple that you can read and understand all of its code!

## Code Example

In this example I cache jquery, on the first load it will be loaded from the provided url and on the second load it will be loaded from the localStorage. Changing the version string will cause the cache to be cleared (1st load) and a new version to be loaded from the sever (2nd load).

```javascript
  requireScript('jquery', '1.11.2', 'http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js', function(){
    requireScript('examplejs', '0.0.3', 'example.js');
  });
```

## Motivation

A short description of the motivation behind the creation and maintenance of the project. This should explain **why** the project exists.

## Installation

Provide code examples and explanations of how to get the project.

## API Reference

Depending on the size of the project, if it is small and simple enough the reference docs can be added to the README. For medium size to larger projects it is important to at least provide a link to where the API reference docs live.

## Tests

Describe and show how to run the tests with code examples.

## Contributors

Let people know how they can dive into the project, include important links to things like issue trackers, irc, twitter accounts if applicable.

## License

A short snippet describing the license (MIT, Apache, etc.)
