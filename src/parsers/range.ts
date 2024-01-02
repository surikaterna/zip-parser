export interface RangeEntity {
  type: "range";
  from: number;
  to: number;
}

function canParse(entry: string) {
  return entry.indexOf("-") > -1;
}

function validate(rangeParts: string[]) {
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

function createEntity(rangeParts: string[]) {
  var zipcodeRange: RangeEntity = {
    type: "range",
    from: parseInt(rangeParts[0], 10),
    to: parseInt(rangeParts[1], 10),
  };
  return zipcodeRange;
}

export default function zipRange(element:string) {
  var parts = element.split("-");
  if (!canParse(element)) {
    return undefined;
  }

  validate(parts);

  return createEntity(parts);
}
