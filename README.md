# JSON-LD

This is a class to retrieve data from JSON Linked Data (JSON-LD) files.

# Basic usage

```js
import JsonLD from "@codejamboree/json-ld";
import fs from 'fs';

const data = {
  '@graph': [
    {
      '@id': '1',
      '@value': 'Hello World',
      'foo': 'bar',
      'bar': { '@id': '2'}
    },
    {
      '@id': '2',
      '@value': 'none',
      'code': {
        '@value': 'scanner'
      }
    }
  ]
};
jsonld = new JsonLD(data, 'en');

console.log(jsonld.getValue('1'));
// Hello World
console.log(jsonld.getValue('1', 'foo'));
// bar
console.log(jsonld.getValue('1', 'bar'));
// none
console.log(jsonld.getValue('1', 'bar', 'code'));
// scanner
```

# Languages

A value may different based on the language being accessed.
If a language is not present, then the default behavior resolves to English.

```js
const data = {
  '@graph': [
    {
      '@id': 'greetings',
      'hello': [
        {'@language': 'en', '@value': 'Hello'},
        {'@language': 'fr', '@value': 'Bojour'},
      ]
    }
  ]
};
jsonld = new JsonLD(data, 'en');
console.log(jsonld.getValue('greetings', 'hello'));
// Hello
jsonld.setLanguage('fr');
console.log(jsonld.getValue('greetings', 'hello'));
// Bonjour
jsonld.setLanguage('es');
console.log(jsonld.getValue('greetings', 'hello'));
// Hello
```