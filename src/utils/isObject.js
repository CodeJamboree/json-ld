export const isObject = (value, nullAllowed = false) =>
  typeof value === 'object' && (nullAllowed || value !== null);
