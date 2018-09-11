'use strict';

const leven = require('leven');

const findSuggestions = function (options) {
  if (!options) {
    throw new Error('Options are missing.');
  }
  if (!options.for) {
    throw new Error('Options.for is missing.');
  }
  if (!options.in) {
    throw new Error('Options.in is missing.');
  }

  const suggestions = options.in.reduce((currentResults, newItem) => {
    if (!currentResults.find(item => item.suggestion === newItem)) {
      currentResults.push({
        suggestion: newItem,
        similarity: 1 / (leven(newItem, options.for) + 1)
      });
    }

    return currentResults;
  }, []).
    sort((item1, item2) => item2.similarity - item1.similarity);

  return suggestions;
};

module.exports = findSuggestions;
