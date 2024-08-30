export const prependOrBringToFront = (values, value) => {
  const index = values.indexOf(value);
  if (index === 0) return;
  if (index > 0) values.splice(index, 1);
  values.unshift(value);
}