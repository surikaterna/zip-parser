
function createEntity(element) {
  var regExp = {};

  regExp.type = 'regexp';
  regExp.codes = [];
  regExp.codes.push(element);

  return regExp;
}

function canParse(entry) {
  if (!entry.match(/^\/(.*)\/$/gmi)) {
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
