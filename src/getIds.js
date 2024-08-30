import { getFirstOrAll } from './utils/getFirstOrAll.js';
import { coerceArray } from './utils/coerceArray.js';
import { isEmpty } from './utils/isEmpty.js';
import { filterIdsByLanguage } from './filterIdsByLanguage.js';
import { idKey } from './keys/idKey.js';
export const getIds = (source, key, language) => {
  let value = source?.[key];
  if (isEmpty(value)) return;
  const values = coerceArray(value);
  let ids = values.map(value => value[idKey]);
  if (language) ids = filterIdsByLanguage(ids, language);
  return getFirstOrAll(ids);
}
