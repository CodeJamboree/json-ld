export const getFirstOrAll = values => {
  switch (values.length) {
    case 0: return;
    case 1: return values[0];
    default: return values;
  }
}