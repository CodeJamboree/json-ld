import { graphEntries } from './graphEntries.js';
import { getValues } from './getValues.js';
import { findByIds } from './findByIds.js';
import { english } from './languages/english.js';
import { graphKey } from './keys/graphKey.js';
import { CacheById } from './CacheById.js';

export class JsonLD {
  language = english;
  lookup;

  constructor(data, language = english) {
    this.cache = new CacheById();
    this.lookup = new Map(graphEntries(data[graphKey]));
    this.language = language;
  }

  setLanguage = language => {
    this.language = language;
  }

  getValue = (id, ...key) => {
    return getValues(this.lookup, this.getRow(id), key, this.language)
  }

  getRow = id => this.findById(id)

  getRowValue = (row, ...key) => {
    return getValues(this.lookup, row, key, this.language);
  }

  findById = (id) => {
    if (!id) return;
    let value = this.cache.get(id);
    if (!value) {
      value = findByIds(this.lookup, id);
      this.cache.set(id, value);
    }
    return value;
  }
}