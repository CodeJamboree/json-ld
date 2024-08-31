import { notEmpty } from "./utils/notEmpty.js";
import { flattenArrays } from './utils/flattenArrays.js';
import { coerceArray } from './utils/coerceArray.js';
import { getFirstOrAll } from './utils/getFirstOrAll.js';
import { valueKey } from "./keys/valueKey.js";
import { filterLanguage } from "./filterLanguage.js";
import { resolve } from "./resolve.js";

export const getValues = (table, sources, keyStack, language) => {
  const [key = valueKey, ...remainingStack] = coerceArray(keyStack);

  let matchingValues = coerceArray(sources)
    .map(value => value[key])
    .reduce(flattenArrays, [])
    .filter(notEmpty);

  if (matchingValues.length === 0) return;

  if (language) {
    matchingValues = filterLanguage(matchingValues, language);
  }
  matchingValues = resolve(table, matchingValues, remainingStack, language);
  return getFirstOrAll(matchingValues);
}
