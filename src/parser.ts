import zipWildcard, { type WildcardEntity } from "./parsers/wildcard";
import zipRange, { type RangeEntity } from "./parsers/range";
import zipRegexp, { type RegexpEntity } from "./parsers/regexp";
import zipcode, { type ZipcodeEntity } from "./parsers/zipcode";
const _strategies = [zipRegexp, zipWildcard, zipRange, zipcode];

type ZipEntity = WildcardEntity | RangeEntity | RegexpEntity | ZipcodeEntity;
type EntityType = string;

function entityTypeExists(entities: ZipEntity[], entityType: EntityType) {
  return entities.find((e) => e.type === entityType);
}

function consolidateZipEntites(oldEntity: ZipEntity, newEntity: ZipEntity) {
  //@ts-ignore
  oldEntity.codes = oldEntity.codes.concat(newEntity.codes);
}

function consolidateIfPossible(entities: ZipEntity[], entity: ZipEntity) {
  var exists = entityTypeExists(entities, entity.type);
  //@ts-ignore
  if (entity.codes && exists) {
    consolidateZipEntites(exists, entity);
  } else {
    entities.push(entity);
  }
}

function trimmer(entity: string) {
  return entity.trim();
}

export default function parser(zipString: string = "") {
  var entities: ZipEntity[] = [];
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
