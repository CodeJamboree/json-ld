import { valueKey } from "./keys/valueKey.js";

export const canResolveValueKey = (table, node, language) => {
  return (valueKey in node);
}