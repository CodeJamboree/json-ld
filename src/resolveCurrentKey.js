import { resolveValue } from "./resolveValue.js";

export const resolveCurrentKey = (table, node, keyChain, language) => {
  const [key, ...remainingKeys] = keyChain;
  const value = node[key];
  if (value) {
    return resolveValue(table, remainingKeys, language)(value);
  }
}