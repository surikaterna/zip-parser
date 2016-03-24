var _ = require('lodash');
var _zip = require('./zip_parser');
var _zipRange = require('./range_parser');
var _zipRegExp = require('./regexp_parser');
var _zipWildcard = require('./wildcard_parser');

var Parser = function Parser() {
  this._strategies = [_zipRegExp, _zipWildcard, _zipRange, _zip];
};

function entityTypeExists(entities, entityType) {
  return _.find(entities, { type: entityType });
}

function consolidateZipEntites(oldEntity, newEntity) {
  oldEntity.codes = oldEntity.codes.concat(newEntity.codes);
}

function consolidateIfPossible(entities, entity) {
  var exists = entityTypeExists(entities, entity.type);
  if (entity.codes && exists) {
    consolidateZipEntites(exists, entity);
  } else {
    entities.push(entity);
  }
}

function trimmer(entity) {
  return entity.trim();
}

Parser.prototype.parse = function parse(zipString) {
  var entities = [];
  var self = this;
  var entries;

  if (!zipString) {
    return [];
  }

  entries = zipString.split(',').map(trimmer);

  _.forEach(entries, function eachEntry(entry) {
    var foundEntity = false;

    _.forEach(self._strategies, function eachStrategy(strategy) {
      var entity = strategy(entry);
      if (entity) {
        consolidateIfPossible(entities, entity);
        foundEntity = true;
        return false;
      }
      return true;
    });

    if (!foundEntity) {
      throw new Error('Found no parser for: ' + entry);
    }
  });

  return entities;
};

module.exports = Parser;
