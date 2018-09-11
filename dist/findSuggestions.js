'use strict';

var leven = require('leven');

var findSuggestions = function findSuggestions(options) {
  if (!options) {
    throw new Error('Options are missing.');
  }
  if (!options.for) {
    throw new Error('Options.for is missing.');
  }
  if (!options.in) {
    throw new Error('Options.in is missing.');
  }

  var suggestions = options.in.reduce(function (currentResults, newItem) {
    if (!currentResults.find(function (item) {
      return item.suggestion === newItem;
    })) {
      currentResults.push({
        suggestion: newItem,
        similarity: 1 / (leven(newItem, options.for) + 1)
      });
    }

    return currentResults;
  }, []).sort(function (item1, item2) {
    return item2.similarity - item1.similarity;
  });

  return suggestions;
};

module.exports = findSuggestions;