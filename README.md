# findsuggestions

findsuggestions searches haystacks for needles and nails.

## Installation

```shell
$ npm install findsuggestions
```

## Quick start

First you need to add a reference to findsuggestions in your application.

```javascript
const findSuggestions = require('findsuggestions');
```

Then to get suggestions for a term, call `findSuggestions` and provide the term as well as replacement terms.

```javascript
const suggestions = findSuggestions({
  for: 'bar',
  in: [ 'bar', 'baz', 'bas' ]
});
```

The result is an array that contains objects ranked by the similarity of a match.

```javascript
console.log(findSuggestions({
  for: 'bar',
  in: [ 'bar', 'baz', 'bas' ]
}));

// => [
//      { suggestion: 'bar', similarity: 1 },
//      { suggestion: 'baz', similarity: 0.5 },
//      { suggestion: 'bas', similarity: 0.5 }
//    ]
```

## Running the build

To build this module use [roboter](https://www.npmjs.com/package/roboter).

```shell
$ npx roboter
```

## License

The MIT License (MIT)
Copyright (c) 2015-2018 the native web.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
