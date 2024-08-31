import { notEmpty } from "./utils/notEmpty.js";
import { isObject } from "./utils/isObject.js";
import { flattenArrays } from './utils/flattenArrays.js';
import { english } from "./languages/english.js";
import { resolveValue } from './resolveValue.js';

export const resolve = (table, values, fullStack, language) => {
  return values.map(value => {
    if (!isObject(value)) return value;
    if (Array.isArray(value)) {
      const resolved = value.map(resolveValue(table, fullStack, language))
        .filter(notEmpty);
      if (resolved.length === 0 && language !== english) {
        return value.map(resolveValue(table, fullStack, english));
      }
      return resolved;
    }
    const resolved = resolveValue(table, fullStack, language)(value);
    if (resolved === undefined && language !== english) {
      return resolveValue(table, fullStack, english)(value);
    }
    return resolved;
  }).reduce(flattenArrays, []);
}