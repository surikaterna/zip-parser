export interface ZipcodeEntity {
  type: "code";
  codes: string[];
}

function createEntity(element: string) {
  const zipCode: ZipcodeEntity = { type: "code", codes: [] };

  zipCode.codes.push(element);

  return zipCode;
}

function canParse(entry: string) {
  if (!entry.match(/^[a-zA-Z0-9 ]*$/gim)) {
    return false;
  }

  return true;
}

export default function zip(element: string) {
  if (!canParse(element)) {
    return undefined;
  }

  return createEntity(element);
}
