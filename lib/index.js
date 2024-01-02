"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  default: () => parser
});
module.exports = __toCommonJS(src_exports);

// src/parsers/wildcard.ts
function createEntity(element) {
  var wildcard2 = { type: "wildcard", codes: [] };
  wildcard2.codes.push(element);
  return wildcard2;
}
function canParse(entry) {
  if (entry.match(/^[a-zA-Z0-9 \*\?]*$/gim) && entry.match(/([\?\*])/gim)) {
    return true;
  }
  return false;
}
function wildcard(element) {
  if (!canParse(element)) {
    return void 0;
  }
  return createEntity(element);
}

// src/parsers/range.ts
function canParse2(entry) {
  return entry.indexOf("-") > -1;
}
function validate(rangeParts) {
  if (rangeParts.length !== 2) {
    throw new Error("Could not parse zipcode range");
  }
  if (isNaN(parseInt(rangeParts[0], 10))) {
    throw new Error("From is not a number");
  }
  if (isNaN(parseInt(rangeParts[1], 10))) {
    throw new Error("To is not a number");
  }
}
function createEntity2(rangeParts) {
  var zipcodeRange = {
    type: "range",
    from: parseInt(rangeParts[0], 10),
    to: parseInt(rangeParts[1], 10)
  };
  return zipcodeRange;
}
function zipRange(element) {
  var parts = element.split("-");
  if (!canParse2(element)) {
    return void 0;
  }
  validate(parts);
  return createEntity2(parts);
}

// src/parsers/regexp.ts
function createEntity3(element) {
  var regExp = {
    type: "regexp",
    codes: []
  };
  regExp.codes.push(element);
  return regExp;
}
function canParse3(entry) {
  if (!entry.match(/^\/(.*)\/$/gim)) {
    return false;
  }
  return true;
}
function regexp(element) {
  if (!canParse3(element)) {
    return void 0;
  }
  return createEntity3(element);
}

// src/parsers/zipcode.ts
function createEntity4(element) {
  const zipCode = { type: "code", codes: [] };
  zipCode.codes.push(element);
  return zipCode;
}
function canParse4(entry) {
  if (!entry.match(/^[a-zA-Z0-9 ]*$/gim)) {
    return false;
  }
  return true;
}
function zip(element) {
  if (!canParse4(element)) {
    return void 0;
  }
  return createEntity4(element);
}

// src/parser.ts
var _strategies = [regexp, wildcard, zipRange, zip];
function entityTypeExists(entities, entityType) {
  return entities.find((e) => e.type === entityType);
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
function parser(zipString = "") {
  var entities = [];
  var entries;
  if (!zipString) {
    return [];
  }
  entries = zipString.split(",").map(trimmer);
  entries.forEach(function eachEntry(entry) {
    var foundEntity = false;
    _strategies.every(function eachStrategy(strategy) {
      var entity = strategy(entry);
      if (entity) {
        consolidateIfPossible(entities, entity);
        foundEntity = true;
        return false;
      }
      return true;
    });
    if (!foundEntity) {
      throw new Error("Found no parser for: " + entry);
    }
  });
  return entities;
}
//# sourceMappingURL=index.js.map
