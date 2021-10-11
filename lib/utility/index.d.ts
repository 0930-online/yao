/**
 * Generates a unique ID
 * @example
 *
 * uuid() // cd205467-0120-47b0-9444-894736d873c7
 */
declare function uuid(): string;

/**
 * Returns an object from URLSearchParams entries
 * @returns Object from URLSearchParams entries
 */
declare function URLSearchObject(): Record;

/** return whether user agent is mobile phone */
declare function isMobilePhone(): boolean;

/**
 * Determine whether the value is null, undefined, "", NaN, [] or {}.
 * @param {any} value The value to inspect
 * @returns True if value is null, undefined, "", NaN, [] or {}.
 */
declare function isEmptyValue(value: any): boolean;

/**
 * Omit all entries with the predictable iteratee function.
 * @param {Record} source The source object.
 * @param {(key:string,value:any)=> boolean} iteratee A predictable func to go through each entry of the source object
 * @returns Returns a new object.
 */
declare function omit(source: Record, iteratee?: (key: string, value: any) => boolean): Record;

/**
 * Delays invoking func until after 'delay' milliseconds have elapsed since the last time the debounced function was invoked
 * @param {Function} fn The function to debounce.
 * @param {number} delay The number of milliseconds to delay.
 * @returns {Function} Returns the new debounced function.
 */
// eslint-disable-next-line @typescript-eslint/ban-types
declare function debounce(fn: Function, delay?: number): Function;

/**
 * Only invokes func at most once per every 'duration' milliseconds.
 * @param {Function} fn The function to throttle.
 * @param {number} duration The number of milliseconds to throttle invocations to.
 * @returns {Function} Returns the new throttled function.
 */
// eslint-disable-next-line @typescript-eslint/ban-types
declare function throttle(fn: Function, duration?: number): Function;

export const utility = {
  debounce,
  throttle,
  uuid,
  URLSearchObject,
  isMobilePhone,
  isEmptyValue,
  omit,
};
