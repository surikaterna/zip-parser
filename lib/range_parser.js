
function canParse(entry) {
  return entry.indexOf('-') > -1;
}

function validate(rangeParts) {
  if (rangeParts.length !== 2) {
    throw new Error('Could not parse zipcode range');
  }

  if (isNaN(parseInt(rangeParts[0], 10))) {
    throw new Error('From is not a number');
  }

  if (isNaN(parseInt(rangeParts[1], 10))) {
    throw new Error('To is not a number');
  }
}

function createEntity(rangeParts) {
  var zipcodeRange = {};

  zipcodeRange.type = 'range';
  zipcodeRange.from = parseInt(rangeParts[0], 10);
  zipcodeRange.to = parseInt(rangeParts[1], 10);

  return zipcodeRange;
}

function zipRange(element) {
  var parts = element.split('-');
  if (!canParse(element)) {
    return undefined;
  }

  validate(parts);

  return createEntity(parts);
}

module.exports = zipRange;
