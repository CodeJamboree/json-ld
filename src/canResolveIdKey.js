import { idKey } from "./keys/idKey.js";

export const canResolveIdKey = (table, node, language) => {
  if (!(idKey in node)) return false;
  const id = node[idKey];
  if (!table.has(id)) return false;
  if (table.get(id) === node) return false;
  return true;
}
