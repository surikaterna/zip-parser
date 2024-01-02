export interface RegexpEntity {
  type: "regexp";
  codes: string[];
}

function createEntity(element: string) {
  var regExp: RegexpEntity = {
    type: "regexp",
    codes: [],
  };
  regExp.codes.push(element);

  return regExp;
}

function canParse(entry: string) {
  if (!entry.match(/^\/(.*)\/$/gim)) {
    return false;
  }

  return true;
}

export default function regexp(element: string) {
  if (!canParse(element)) {
    return undefined;
  }

  return createEntity(element);
}
