'use strict';

var assert = require('assertthat');

var findSuggestions = require('../lib/findSuggestions');

suite('findSuggestions', function () {
  test('is a function.', function (done) {
    assert.that(findSuggestions).is.ofType('function');
    done();
  });

  test('throws an error when options are missing.', function (done) {
    assert.that(function () {
      findSuggestions();
    }).is.throwing('Options are missing.');
    done();
  });

  test('throws an error when options.for are missing.', function (done) {
    assert.that(function () {
      findSuggestions({ in: [ 'foo', 'bar' ]});
    }).is.throwing('Options.for is missing.');
    done();
  });

  test('throws an error when options.in are missing.', function (done) {
    assert.that(function () {
      findSuggestions({ for: 'foo' });
    }).is.throwing('Options.in is missing.');
    done();
  });

  test('returns a perfect match.', function (done) {
    assert.that(findSuggestions({ for: 'foo', in: [ 'foo' ]})).is.equalTo([
      { suggestion: 'foo', similarity: 1 }
    ]);
    done();
  });

  test('returns an imperfect match.', function (done) {
    assert.that(findSuggestions({ for: 'foo', in: [ 'bar' ]})).is.equalTo([
      { suggestion: 'bar', similarity: 0.25 }
    ]);
    done();
  });

  test('returns a list of matches.', function (done) {
    assert.that(findSuggestions({ for: 'foo', in: [ 'foo', 'bar' ]})).is.equalTo([
      { suggestion: 'foo', similarity: 1 },
      { suggestion: 'bar', similarity: 0.25 }
    ]);
    done();
  });

  test('returns a de-duplicated list of matches when duplicates are given.', function (done) {
    assert.that(findSuggestions({ for: 'foo', in: [ 'bar', 'bar' ]})).is.equalTo([
      { suggestion: 'bar', similarity: 0.25 }
    ]);
    done();
  });

  test('returns a sorted list of matches.', function (done) {
    assert.that(findSuggestions({ for: 'foo', in: [ 'bar', 'foo' ]})).is.equalTo([
      { suggestion: 'foo', similarity: 1 },
      { suggestion: 'bar', similarity: 0.25 }
    ]);
    done();
  });
});
