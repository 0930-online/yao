import { fromEntries, isEmpty as isEmptyObject } from "../object/index.js";
import { isEmpty as isEmptyArray } from "../array/index.js";

/**
 * Returns an object from URLSearchParams entries
 * @returns Object from URLSearchParams entries
 */
function URLSearchObject() {
  const urlParams = new URLSearchParams(location.search);
  return fromEntries(urlParams.entries());
}

/**
 * Generates a unique ID
 * @returns uuid
 *
 * @example
 * uuid() // cd205467-0120-47b0-9444-894736d873c7
 */
function uuid() {
  const url = URL.createObjectURL(new Blob([]));
  const uuid = url.substring(url.lastIndexOf("/") + 1);
  URL.revokeObjectURL(url);
  return uuid;
}

/**
 * Determine if the use agent is mobile
 * @returns {boolean} True if the user agent is mobile device, otherwise false
 */
function isMobilePhone() {
  let info = navigator.userAgent;
  let agents = ["Android", "iPhone", "iPod", "iPad"];
  return agents.some((x) => info.indexOf(x) >= 0);
}

/**
 * Determine if a value is undefined
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === "undefined";
}

/**
 * Determine if a value is a String
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === "string";
}

/**
 * Determine if a value is a Number
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === "number";
}

function isArray(val) {
  return Object.prototype.toString.call(val) === "[object Array]";
}

/**
 * Determine if a value is an Object
 * @param {any} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === "object";
}

/**
 * Determine whether the value is null, undefined, "", NaN, [] or {}.
 * @param {any} value The value to inspect
 * @returns True if value is null, undefined, "", NaN, [] or {}.
 */
function isEmptyValue(value) {
  return (
    value === null ||
    value === undefined ||
    value === "" ||
    Number.isNaN(value) ||
    isEmptyArray(value) ||
    isEmptyObject(value)
  );
}

/**
 * Omit all entries with the predictable iteratee function.
 * @param {Record} source The source object.
 * @param {(key:string,value:any):=> boolean} iteratee A predictable func to go through each entry of the source object
 * @returns Returns a new object.
 */
function omit(source, iteratee = (key, value) => isEmptyValue(value)) {
  const entries = Object.entries(source);
  const restEntries = entries.filter(([key, value]) => !iteratee(key, value));
  return fromEntries(restEntries);
}

/**
 * Delays invoking func until after 'delay' milliseconds have elapsed since the last time the debounced function was invoked
 * @param {Function} fn The function to debounce.
 * @param {number} delay The number of milliseconds to delay.
 * @default delay 50
 * @returns {Function} Returns the new debounced function.
 */
function debounce(fn, delay = 50) {
  let timer = null;
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

/**
 * Only invokes func at most once per every 'duration' milliseconds.
 * @param {Function} fn The function to throttle.
 * @param {number} duration The number of milliseconds to throttle invocations to.
 * @returns {Function} Returns the new throttled function.
 */
function throttle(fn, duration = 50) {
  let previous = 0;
  return function (...args) {
    let now = +new Date();
    if (now - previous > duration) {
      previous = now;
      fn.apply(this, args);
    }
  };
}

export const utility = {
  debounce,
  throttle,
  uuid,
  URLSearchObject,
  isMobilePhone,
  isEmptyValue,
  omit,
};
