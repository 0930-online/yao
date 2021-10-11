/**
 * Returns whether value is an array.
 * @param val the value to inspect.
 */
declare function isArray(val: any): boolean;

/**
 * Determine if a value is an emtpy array
 * @param {any} value
 * @returns {boolean} True if value is an array and length is 0, otherwise false
 */
export function isEmpty(value: any): boolean;

/**
 * shuffle the given array with math.random as the compare function
 * @param {Array} arr the given array
 */
declare function shuffle(arr: Array): void;

/**
 * Flatten tree data in recursion.
 * @param {Array<T>} _this The collection to flat
 * @param {keyof T} children The column name represents children array
 * @returns {Array<T>} Returns a new array with flattened tree data
 */
declare function flat<T extends Record<string, any>, P = keyof T>(_this: Array<T>, children?: P): Array<T>;

/**
 * Group collection by function iteratee
 * @param {Array} collection The collection to iterate over.
 * @param {Function} iteratee The iteratee to transform keys.
 * @returns {Record<string, Array<T>>} Returns the composed aggregate object.
 */
declare function groupBy<T>(
  collection: Array<T>,
  iteratee: (item: T, index: number) => string,
): Record<string, Array<T>>;

/**
 * Creates an array of unique values that are included in all given arrays using SameValueZero for equality comparisons.
 *
 * The order and references of result values are determined by the first array.
 * @param {any[][]} arrays [array, ...others] The array of arrays to insepect.
 * @param {Function} comparator The comparator invoked per element.
 * @returns {Array} The new array of intersecting values.
 */
declare function intersection([array, ...others]: [Array, Array | Array<Array>], comparator?: (a, b) => boolean): Array;

/**
 * Creates an array excluding all given values using SameValueZero for equality comparisons.
 * @param {Array} array The array to inspect.
 * @param {Array|Array<Array>} others The values to exclude.
 * @param {*} comparator The comparator invoked per element.
 * @returns Returns the new array of filtered values.
 */
declare function except([array, ...others]: [Array, Array | Array<Array>], comparator?: (a, b) => boolean): Array;

export const array = {
  isArray,
  isEmpty,
  shuffle,
  flat,
  groupBy,
  intersection,
  except,
};
