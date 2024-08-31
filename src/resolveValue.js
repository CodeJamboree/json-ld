

import { canResolveValueKey } from './canResolveValueKey.js';
import { canResolveIdKey } from "./canResolveIdKey.js";
import { isObject } from "./utils/isObject.js";
import { resolve } from "./resolve.js";
import { resolveCurrentKey } from "./resolveCurrentKey.js";
import { resolveIdKey } from "./resolveIdKey.js";
import { resolveValueKey } from "./resolveValueKey.js";
import { getValues } from "./getValues.js";

export const resolveValue = (table, keyChain, language) => node => {
  if (Array.isArray(node)) return resolve(table, node, keyChain, language);
  if (isObject(node)) {
    const [key] = keyChain;
    if (key && (key in node)) {
      return resolveCurrentKey(table, node, keyChain, language);
    }
    if (canResolveIdKey(table, node, language)) {
      return resolveIdKey(table, node, keyChain, language);
    }
    if (canResolveValueKey(table, node, language)) {
      return resolveValueKey(table, node, keyChain, language);
    }
  }
  if (keyChain.length === 0) {
    return node;
  }
  return getValues(table, value, keyChain, language);
}