export const coerceArray = value => {
  if (value === undefined || value === null) return [];
  return Array.isArray(value) ? value : [value];
}