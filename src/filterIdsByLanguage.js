import { idTester } from './idTester.js';
import { english } from './languages/english.js';

export const filterIdsByLanguage = (ids, language) => {
  let filteredIds = ids.filter(idTester(language)) ?? [];
  if (filteredIds.length === 0 && language !== english) {
    filteredIds = ids.filter(idTester(english)) ?? []
  }
  return filteredIds.length === 0 ? ids : filteredIds;
}