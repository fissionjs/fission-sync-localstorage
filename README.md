# fission-sync-localstorage
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url]

> localStorage Sync adapter for [fissionjs](https://github.com/fissionjs/fission)


## Install
`npm install fission-sync-localstorage --save`

## Example

```js
// app.js
var Fission = require('fission');
var localSync = require('fission-sync-localstorage');
var fission = new Fission({
  sync: localSync
});
module.exports = fission;


// model.js
var fission = require('../app');
fission.model({
  props: {
    text: 'string',
    content: 'string',
    id: 'string'
  },
  url: 'items' // Required. Must be a single name relating to the model.
});

```

#### Note:
**Model.url is the main index prefix used.**
It should be set to a string excluding any network protocol.


## LICENSE

(MIT License)

Copyright (c) 2014 Steve Lacy <me@slacy.me> (http://slacy.me)

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.









[npm-url]: https://npmjs.org/package/fission-sync-localstorage
[npm-image]: http://img.shields.io/npm/v/fission-sync-localstorage.svg

[travis-url]: https://travis-ci.org/fissionjs/fission-sync-localstorage
[travis-image]: https://travis-ci.org/fissionjs/fission-sync-localstorage.png?branch=master
