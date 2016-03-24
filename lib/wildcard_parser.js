
function createEntity(element) {
  var wildcard = {};

  wildcard.type = 'wildcard';
  wildcard.codes = [];
  wildcard.codes.push(element);

  return wildcard;
}

// letters, digits and spaces are allowed, must contain at least one * or ?
function canParse(entry) {
  if (entry.match(/^[a-zA-Z0-9 \*\?]*$/gmi) && entry.match(/([\?\*])/gmi)) {
    return true;
  }

  return false;
}

function wildcard(element) {
  if (!canParse(element)) {
    return undefined;
  }

  return createEntity(element);
}

module.exports = wildcard;
