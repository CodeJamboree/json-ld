import { findByIds } from "./findByIds.js";
import { getIds } from './getIds.js';
import { getValues } from './getValues.js';

export const getReferencedValues = (table, source, key, refKey, lang) => {
  const ids = getIds(source, key, lang);
  if (!ids) return;
  const refs = findByIds(table, ids);
  if (!refs) return;
  return getValues(table, refs, refKey, lang);
}