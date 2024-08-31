import { notEmpty } from "./utils/notEmpty.js";
import { isObject } from "./utils/isObject.js";
import { flattenArrays } from './utils/flattenArrays.js';
import { coerceArray } from './utils/coerceArray.js';
import { getFirstOrAll } from './utils/getFirstOrAll.js';
import { english } from "./languages/english.js";
import { languageKey } from "./keys/languageKey.js";
import { valueKey } from "./keys/valueKey.js";
import { idKey } from "./keys/idKey.js";
import { idTester } from "./idTester.js";

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

const resolve = (table, values, fullStack, language) => {
  const resolver = resolveValue(table, fullStack, language);

  return values.map(value => {
    if (!isObject(value)) return value;
    if (Array.isArray(value)) {
      return value.map(resolver);
    }
    return resolver(value);
  }).reduce(flattenArrays, []);
}
const resolveValue = (table, fullStack, language) => value => {
  const [key, ...remainingStack] = fullStack;
  if (isObject(value)) {
    if (key in value) {
      const nextValue = value[key];
      if (remainingStack.length !== 0) {
        return getValues(table, nextValue, remainingStack, language);
      }
      if (valueKey in nextValue) return nextValue[valueKey];
      return nextValue;
    }
    if (idKey in value) {
      const id = value[idKey];
      if (!table.has(id)) return;
      const nextValue = table.get(id);
      if (fullStack.length !== 0) {
        return getValues(table, nextValue, fullStack, language);
      }
      if (valueKey in nextValue) return nextValue[valueKey];
      return nextValue;
    }
    if (valueKey in value) {
      const nextValue = value[valueKey];
      if (fullStack.length !== 0) {
        return getValues(table, nextValue, fullStack, language);
      }
      return nextValue;
    }
  }
  if (fullStack.length === 0) {
    return value;
  }
  return getValues(table, value, fullStack, language);
}
const filterLanguage = (values, language) => {
  const languageValues = values
    .filter(value => {
      if (!isObject(value)) return true;
      if ((languageKey in value)) return value[languageKey] === language;
      if ((idKey in value)) return idTester(language)(value[idKey])
      return true;
    });

  if (languageValues.length === 0) {
    if (language !== english) return filterLanguage(values, english);
    // Find anything without language key
    return values
      .filter(isObject)
      .filter(value => !(languageKey in value));
  }
  return languageValues;
}
