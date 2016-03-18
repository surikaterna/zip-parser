
function createEntity(element) {
  var wildcard = {};

  wildcard.type = 'wildcard';
  wildcard.codes = [];
  wildcard.codes.push(element);

  return wildcard;
}

// letters, digits and spaces are allowed, followed by one * or one or multiple ?
function canParse(entry) {
  if (!entry.match(/^([a-zA-Z0-9 ]+)(\?+|\*)/gmi)) {
    return false;
  }

  return true;
}

function wildcard(element) {
  if (!canParse(element)) {
    return undefined;
  }

  return createEntity(element);
}

module.exports = wildcard;
