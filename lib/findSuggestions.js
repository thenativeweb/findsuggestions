'use strict';

var _ = require('lodash'),
    leven = require('leven');

var findSuggestions = function (options) {
  if (!options) {
    throw new Error('Options are missing.');
  }
  if (!options.for) {
    throw new Error('Options.for is missing.');
  }
  if (!options.in) {
    throw new Error('Options.in is missing.');
  }

  return _(options.in).map(function (item) {
    return {
      suggestion: item,
      similarity: 1 / (leven(item, options.for) + 1)
    };
  }).sortBy('similarity').reverse().uniq(true, 'suggestion').value();
};

module.exports = findSuggestions;
