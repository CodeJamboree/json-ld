import { coerceArray } from "./coerceArray.js";

export const flattenArrays = (flat, value) => [...flat, ...coerceArray(value)];
