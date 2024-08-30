export const isEmpty = value => {
  if (value === undefined || value === null) return true;
  switch (typeof value) {
    case 'string':
      return value.trim() === '';
    case 'object':
      if (value instanceof Error) return false;
      if (value instanceof Date) {
        return value.getTime() === 0;
      }
      if (value instanceof Promise) {
        return false;
      }
      if (Array.isArray(value)) {
        return value.length === 0 || value.every(isEmpty);
      }
      const keys = Object.keys(value);
      return keys.length === 0 || keys.every(
        key => isEmpty(value[key])
      );
    default: // number, boolean, function
      return false;
  }
}