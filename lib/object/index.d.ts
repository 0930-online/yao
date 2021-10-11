/**
 * replace obj columns to other columns , according to the given entries
 * @param obj the target to transform columns
 * @param entries collection of column relations, just key-value entries
 * @returns new object after transformed , origin columns has been deleted
 */
declare function replace(obj: IObject, entries: Array<[PropertyKey, string]>): IObject;

/**
 * Returns an object created by key-value entries for properties and methods
 * @param entries An iterable object that contains key-value entries for properties and methods.
 */
export declare function fromEntries(entries: Iterable<[PropertyKey, any]>): { [k: string]: any };

/**
 * Determine if a value is an Object
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
export declare function isObject(val: any): boolean;

/**
 * Determine if value is an empty object.
 * @param {any} value
 * @returns True if value is {}, otherwise false.
 */
export declare function isEmpty(value: any): boolean;

/**
 * Determine if a value is a plain Object,
 *
 * @param {any} value The value to test
 * @return {boolean} True if value is a plain Object, otherwise false
 * @example
 * isPlainObject({});                    // true
 * isPlainObject({a:1});                 // true
 * isPlainObject(new Object());          // true
 * isPlainObject(Object.create(null));   // true
 * isPlainObject(Object.create({}));     // false
 */
declare function isPlainObject(value: any): boolean;

/**
 * Creates a deep clone of value.
 * @param {Record} source The object to deep clone.
 * @param {Map|WeakMap} hash The hash map to inspect circular reference.
 * @returns {Record} Returns the deep cloned value.
 */
declare function cloneDeep(source, hash = new WeakMap()): Record;

export const object = {
  replace,
  fromEntries,
  isPlainObject,
  isEmpty,
};
