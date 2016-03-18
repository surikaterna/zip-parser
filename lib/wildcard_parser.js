
function createEntity(element) {
  var regExp = {};

  regExp.type = 'regexp';
  regExp.codes = [];
  regExp.codes.push(element);

  return regExp;
}

function canParse(entry) {
  //letters, digits and spaces are allowed, followed by one * or one or multiple ?
  if (!entry.match(/^([a-zA-Z0-9 ]+)(\?+|\*)$/gmi)) { 
    return false;
  }

  return true;
}

function regexp(element) {
  if (!canParse(element)) {
    return undefined;
  }

  return createEntity(element);
}

module.exports = regexp;
