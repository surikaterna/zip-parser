var _ = require('lodash');
var _zipRange = require('./range_parser');
var _zip = require('./zip_parser');

var Parser = function Parser() {
  this._strategies = [_zipRange, _zip];
};

function consolidateZipEntites(entities, foundEntity) {
  var codeEntity = _.find(entities, { type: 'code' });
  if (!codeEntity) {
    entities.push(foundEntity);
  } else {
    codeEntity.codes.push(foundEntity.codes[0]);
  }
}

Parser.prototype.parse = function parse(zipString) {
  var entities = [];
  var self = this;
  var entries;

  if (!zipString) {
    return [];
  }

  entries = zipString.split(',');

  _.forEach(entries, function eachEntry(entry) {
    var foundEntity;
    _.forEach(self._strategies, function eachStrategy(strategy) {
      var entity = strategy(entry);
      if (entity) {
        foundEntity = entity;
        return false;
      }
      return true;
    });

    if (foundEntity) {
      if (foundEntity.type === 'code') { // Fuggly
        consolidateZipEntites(entities, foundEntity);
      } else {
        entities.push(foundEntity);
      }
    } else {
      throw new Error('Found no parser for: ' + entry);
    }
  });

  return entities;
};

module.exports = Parser;
