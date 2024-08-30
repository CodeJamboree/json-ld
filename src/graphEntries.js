import { idKey } from './keys/idKey.js';

export function* graphEntries(rows) {
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const id = row[idKey];
    yield [id, row];
  }
}
