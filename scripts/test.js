import JsonLD from "../src/index.js";
import fs from 'fs';

let jsonld;
const cacheLimit = 100;

const main = () => {

  const json = fs.readFileSync('scripts/test.json', 'utf8');
  const data = JSON.parse(json);
  for (let i = 0; i < cacheLimit + 1; i++) {
    data['@graph'].push({ '@id': `cache:${i}`, '@value': `Value ${i}` });
  }
  jsonld = new JsonLD(data, 'en');

  const state = {
    total: 0,
    passed: 0,
    failed: 0
  };

  [
    getValue,
    getValueByKey,
    getArrayWithNone,
    getArrayWithOne,
    getArrayWithMany,
    getValueByRef,
    getValueByRefOne,
    getValueByRefMany,
    getValueByRefDefaultLanguage,
    getValueByRefDifferentLanguage,
    getValueByRefUnknownLanguage,
    getValueByRefDefaultLanguageId,
    getValueByRefDifferentLanguageId,
    getValueByRefUnknownLanguageId,
    getDeeplyReferencedValue1,
    getDeeplyReferencedValue2,
    getDeeplyReferencedValue3,
    getExcessCache
  ].reduce(runNextTest, state);
  if (state.failed > 0) {
    console.error(`${state.failed} of ${state.total} tests failed.`);
  } else {
    console.info(`${state.total} tests passed.`);
  }
}

const beforeEach = () => {
  jsonld.setLanguage('en');
}
const afterEach = () => {
  jsonld.setLanguage('en');
}

const runNextTest = (state, test) => {
  const { name } = test;
  state.total++;
  beforeEach();
  try {
    test();
    state.passed++;
    console.info(`pass: ${name}`);
  } catch (e) {
    state.failed++;
    console.error(`fail: ${name} ${e}`);
  }
  afterEach();
  return state;
}

const getValue = () => {
  let value = jsonld.getValue('id:1');
  expectEqual(value, 'value:1');
}
const getValueByKey = () => {
  let value = jsonld.getValue('id:1', 'custom-key');
  expectEqual(value, 'custom value');
}
const getArrayWithOne = () => {
  let value = jsonld.getValue('id:1', 'array-1-key');
  expectEqual(value, 'one value');
}
const getArrayWithMany = () => {
  let value = jsonld.getValue('id:1', 'array-many-key');
  expectEqual(value, ['value 1 of 2', 'value 2 of 2']);
}
const getArrayWithNone = () => {
  let value = jsonld.getValue('id:1', 'array-0-key');
  expectEqual(value, undefined);
}
const getValueByRef = () => {
  let value = jsonld.getValue('id:1', 'ref-key');
  expectEqual(value, 'value of id 2');
}
const getValueByRefOne = () => {
  let value = jsonld.getValue('id:1', 'array-ref-1-key');
  expectEqual(value, 'value of id 2');
}
const getValueByRefMany = () => {
  let value = jsonld.getValue('id:1', 'array-ref-many-key');
  expectEqual(value, ['value of id 2', 'value of id 3']);
}
const getValueByRefDefaultLanguage = () => {
  let value = jsonld.getValue('id:1', 'array-ref-lang-key');
  expectEqual(value, 'English Value');
}
const getValueByRefDifferentLanguage = () => {
  jsonld.setLanguage('fr');
  let value = jsonld.getValue('id:1', 'array-ref-lang-key');
  expectEqual(value, 'French Value');
}
const getValueByRefUnknownLanguage = () => {
  jsonld.setLanguage('es');
  let value = jsonld.getValue('id:1', 'array-ref-lang-key');
  expectEqual(value, 'English Value');
}
const getValueByRefDefaultLanguageId = () => {
  let value = jsonld.getValue('id:1', 'lang-id-key');
  expectEqual(value, 'English-Value');
}
const getValueByRefDifferentLanguageId = () => {
  jsonld.setLanguage('fr');
  let value = jsonld.getValue('id:1', 'lang-id-key');
  expectEqual(value, 'French-Value');
}
const getValueByRefUnknownLanguageId = () => {
  jsonld.setLanguage('es');
  let value = jsonld.getValue('id:1', 'lang-id-key');
  expectEqual(value, 'English-Value');
}
const getDeeplyReferencedValue1 = () => {
  let value = jsonld.getValue('id:1', 'level-1');
  expectEqual(value, 'value of level:1');
}
const getDeeplyReferencedValue2 = () => {
  let value = jsonld.getValue('id:1', 'level-1', 'level-2');
  expectEqual(value, 'value of level:2');
}
const getDeeplyReferencedValue3 = () => {
  let value = jsonld.getValue('id:1', 'level-1', 'level-2', 'level-3');
  expectEqual(value, ["Level 3 English-1", "Level 3 English-2"]);
}

const getExcessCache = () => {
  for (let i = 0; i < cacheLimit + 1; i++) {
    let value = jsonld.getValue(`cache:${i}`);
    expectEqual(value, `Value ${i}`);
  }
}


const expectEqual = (actualValue, expectedValue) => {
  const actual = JSON.stringify(actualValue);
  const expected = JSON.stringify(expectedValue);

  if (actual !== expected) {
    throw `${actual} is not equal to ${expected}`;
  };
}
try {
  main();
  console.info('done');
} catch (e) {
  console.error('Error', e);
}