import { utility } from "../utility";

/**
 * replace obj columns to other columns , according to the given entries
 * @param obj the target to transform columns
 * @param entries collection of column relations, just key-value entries
 * @returns new object after transformed , origin columns has been deleted
 */
function replace(obj, entries) {
  const res = { ...obj };
  const existEntries = entries.filter(([k, v]) => Object.prototype.hasOwnProperty.call(res, k));
  for (const [from, to] of existEntries) {
    [res[from], res[to]] = [res[to], res[from]];
    typeof res[from] === "undefined" && delete res[from];
  }
  return res;
}

/**
 * Returns an object created by key-value entries for properties and methods
 * @param entries An iterable object that contains key-value entries for properties and methods.
 */
export function fromEntries(entries) {
  const func = Object.fromEntries || from_entries;
  return func(entries);
}

/**
 * Returns an object created by key-value entries for properties and methods
 * @param entries An iterable object that contains key-value entries for properties and methods.
 */
function from_entries(entries) {
  return Array.from(entries).reduce((pre, [key, value]) => ((pre[key] = value), pre), {});
}

/**
 * Determine if a value is an Object
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
export function isObject(val) {
  return val !== null && typeof val === "object";
}

/**
 * Determine if value is an empty object.
 * @param {any} value
 * @returns True if value is {}, otherwise false.
 */
export function isEmpty(value) {
  return isObject(value) && Reflect.ownKeys(value).length === 0 && value.constructor === Object;
}

/**
 * Determine if a value is a plain Object,
 *
 * @param {any} value The value to test
 * @return {boolean} True if value is a plain Object, otherwise false
 * @example
 *
 * isPlainObject({});                    // true
 * isPlainObject({a:1});                 // true
 * isPlainObject(new Object());          // true
 * isPlainObject(Object.create(null));   // true
 * isPlainObject(Object.create({}));     // false
 */
function isPlainObject(value) {
  if (!isObject(value) || Object.prototype.toString.call(value) !== "[object Object]") {
    return false;
  }
  const proto = Object.getPrototypeOf(value);
  return proto === null || Object.getPrototypeOf(proto) === null;
}

/**
 * Creates a deep clone of value.
 * @param {Record} source The object to deep clone.
 * @param {Map|WeakMap} hash The hash map to inspect circular reference.
 * @returns {Record} Returns the deep cloned value.
 */
function cloneDeep(source, hash = new WeakMap()) {
  if (!isObject(source)) return source;
  /** use hash in case of circular reference */
  if (hash.has(source)) return hash.get(source);

  let target = Array.isArray(source) ? [] : {};
  hash.set(source, target);
  /** use Reflect.ownKeys to get own symbol keys */
  Reflect.ownKeys(source).forEach((key) => {
    target[key] = isObject(source[key]) ? cloneDeep(source[key], hash) : source[key];
  });
  return target;
}

export const object = {
  replace,
  fromEntries,
  isPlainObject,
  isEmpty,
  cloneDeep,
};
