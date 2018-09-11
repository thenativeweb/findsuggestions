'use strict';

const assert = require('assertthat');

const findSuggestions = require('../../src/findSuggestions');

suite('findSuggestions', () => {
  test('is a function.', async () => {
    assert.that(findSuggestions).is.ofType('function');
  });

  test('throws an error when options are missing.', async () => {
    assert.that(() => {
      findSuggestions();
    }).is.throwing('Options are missing.');
  });

  test('throws an error when options.for are missing.', async () => {
    assert.that(() => {
      findSuggestions({ in: [ 'foo', 'bar' ]});
    }).is.throwing('Options.for is missing.');
  });

  test('throws an error when options.in are missing.', async () => {
    assert.that(() => {
      findSuggestions({ for: 'foo' });
    }).is.throwing('Options.in is missing.');
  });

  test('returns a perfect match.', async () => {
    assert.that(findSuggestions({ for: 'foo', in: [ 'foo' ]})).is.equalTo([
      { suggestion: 'foo', similarity: 1 }
    ]);
  });

  test('returns an imperfect match.', async () => {
    assert.that(findSuggestions({ for: 'foo', in: [ 'bar' ]})).is.equalTo([
      { suggestion: 'bar', similarity: 0.25 }
    ]);
  });

  test('returns a list of matches.', async () => {
    assert.that(findSuggestions({ for: 'foo', in: [ 'foo', 'bar' ]})).is.equalTo([
      { suggestion: 'foo', similarity: 1 },
      { suggestion: 'bar', similarity: 0.25 }
    ]);
  });

  test('returns a de-duplicated list of matches when duplicates are given.', async () => {
    assert.that(findSuggestions({ for: 'foo', in: [ 'bar', 'bar' ]})).is.equalTo([
      { suggestion: 'bar', similarity: 0.25 }
    ]);
  });

  test('returns a sorted list of matches.', async () => {
    assert.that(findSuggestions({ for: 'foo', in: [ 'bar', 'foo' ]})).is.equalTo([
      { suggestion: 'foo', similarity: 1 },
      { suggestion: 'bar', similarity: 0.25 }
    ]);
  });
});
