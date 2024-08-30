import { notEmpty } from "./utils/notEmpty.js";

export const findByIds = (table, ids) => {
  if (!ids) return;
  if (!Array.isArray(ids)) return table.get(ids);
  const values = ids.map(id => table.get(id)).filter(notEmpty);
  return values.length === 0 ? undefined : values;
}