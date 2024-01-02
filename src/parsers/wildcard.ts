export interface WildcardEntity {
  type: "wildcard";
  codes: string[];
}

function createEntity(element: string): WildcardEntity {
  var wildcard: WildcardEntity = { type: "wildcard", codes: [] };

  wildcard.codes.push(element);

  return wildcard;
}

// letters, digits and spaces are allowed, must contain at least one * or ?
function canParse(entry: string) {
  if (entry.match(/^[a-zA-Z0-9 \*\?]*$/gim) && entry.match(/([\?\*])/gim)) {
    return true;
  }

  return false;
}

export default function wildcard(element: string) {
  if (!canParse(element)) {
    return undefined;
  }

  return createEntity(element);
}
