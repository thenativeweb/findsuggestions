'use strict';

var _ = require('lodash'),
    leven = require('leven');

var findSuggestions = function (options) {
  var suggestions;

  if (!options) {
    throw new Error('Options are missing.');
  }
  if (!options.for) {
    throw new Error('Options.for is missing.');
  }
  if (!options.in) {
    throw new Error('Options.in is missing.');
  }

  suggestions = [];

  options.in.forEach(function (haystackItem) {
    suggestions.push({
      suggestion: haystackItem,
      similarity: 1 / (leven(haystackItem, options.for) + 1)
    });
  });

  suggestions.sort(function (left, right) {
    if (left.similarity < right.similarity) {
      return 1;
    }
    if (left.similarity > right.similarity) {
      return -1;
    }
    return 0;
  });

  suggestions = _.uniq(suggestions, true, function (item) {
    return item.suggestion;
  });

  return suggestions;
};

module.exports = findSuggestions;
