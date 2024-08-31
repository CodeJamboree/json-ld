import { idKey } from "./keys/idKey.js";
import { languageKey } from "./keys/languageKey.js";
import { resolveValue } from "./resolveValue.js";

export const resolveIdKey = (table, node, keyChain, language) => {
  if ((languageKey in node) && node[languageKey] !== language) return;
  const [key, ...remainingKeys] = keyChain;
  const id = node[idKey];
  if (!table.has(id)) {
    if (key === idKey && remainingKeys.length === 0) return id;
    if (key !== idKey && keyChain.length === 0) return node;
    return;
  }
  const refNode = table.get(id);
  if (refNode === node) return node;
  if (key === idKey) {
    return resolveValue(table, remainingKeys, language)(refNode);
  }
  return resolveValue(table, keyChain, language)(refNode);
}
