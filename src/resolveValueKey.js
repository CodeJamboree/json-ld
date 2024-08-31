import { valueKey } from "./keys/valueKey.js";
import { languageKey } from "./keys/languageKey.js";
import { resolveValue } from "./resolveValue.js";

export const resolveValueKey = (table, node, keyChain, language) => {
  const [key, ...remainingKeys] = keyChain;
  const value = node[valueKey];
  if ((languageKey in node) && node[languageKey] !== language) return;
  if (key === valueKey && remainingKeys.length === 0) {
    return value;
  } else if (key !== valueKey && keyChain.length === 0) {
    return value;
  } else if (key === valueKey) {
    return resolveValue(table, remainingKeys, language)(value);
  } else {
    return resolveValue(table, keyChain, language)(value);
  }
}