import { english } from "./languages/english.js";
import { french } from "./languages/french.js";
import { spanish } from "./languages/spanish.js";
import { isEmpty } from "./utils/isEmpty.js";

const idLanguagePatterns = {
  [english]: /[-=]en(-?(Ca|Inv){1,2})?$/i,
  [french]: /[-=]fr(-?(Ca|Inv){1,2})?$/i,
  [spanish]: /[-=]es(-?(Ca|Inv){1,2})?$/i,
}

export const idTester = (language) => {
  if (isEmpty(language)) return alwaysTrue;
  let pattern = idLanguagePatterns[language] ??
    new RegExp(`[-=]${language}(-?(Ca|Inv){1,2})?$`, 'i');
  return id => pattern.test(id);
}

const alwaysTrue = () => true;