import { idTester } from "./idTester.js";
import { languageKey } from "./keys/languageKey.js";
import { idKey } from "./keys/idKey.js";
import { isObject } from "./utils/isObject.js";
import { english } from "./languages/english.js";

export const filterLanguage = (values, language) => {
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
