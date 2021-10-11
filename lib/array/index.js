function isArray(val) {
  return Object.prototype.toString.call(val) === "[object Array]";
}

/**
 * Determine if a value is an emtpy array
 * @param {any} value
 * @returns {boolean} True if value is an empty array, otherwise false
 */
export function isEmpty(value) {
  return Array.isArray(value) && value.length === 0;
}

/**
 * shuffle the given array with math.random as the compare function
 * @param {Array} arr the given array
 */
function shuffle(arr) {
  arr.sort(() => 0.5 - Math.random());
}

/**
 * Flatten tree data in recursion.
 * @param {Array<T>} _this The collection to flat
 * @param {keyof T} children The column name represents children array
 * @returns {Array<T>} Returns a new array with flattened tree data
 */
function flat(_this, children = "children") {
  return _this.reduce((result, item) => {
    const shallow = { ...item };
    delete shallow[children];
    result.push(shallow);
    if (isArray(item[children])) {
      return result.concat(flat(item[children], children));
    }
    return result;
  }, []);
}

/**
 * Group collection by function iteratee
 * @param {Array} collection The collection to iterate over.
 * @param {Function} iteratee The iteratee to transform keys.
 * @returns {Record<string, Array<T>>} Returns the composed aggregate object.
 */
function groupBy(collection, iteratee) {
  const init = {};
  return collection.reduce((result, item, index) => {
    const key = iteratee(item, index);
    const hasKey = Object.hasOwnProperty.call(result, key);
    hasKey ? result[key].push(item) : (result[key] = [item]);
    return result;
  }, init);
}

/**
 * Creates an array of unique values that are included in all given arrays using SameValueZero for equality comparisons.
 *
 * The order and references of result values are determined by the first array.
 * @param {any[][]} arrays [array, ...others] The array of arrays to insepect.
 * @param {Function} comparator The comparator invoked per element.
 * @returns {Array} The new array of intersecting values.
 */
function intersection([array, ...others], comparator = (a, b) => a == b) {
  return others.reduce(
    (previous, [...current]) => {
      const intersected = [];
      for (const item of previous) {
        const findIndex = current.findIndex((x) => comparator(x, item));
        if (findIndex !== -1) {
          intersected.push(item);
          current.splice(findIndex, 1);
        }
      }
      return intersected;
    },
    [...array],
  );
}

/**
 * Creates an array excluding all given values using SameValueZero for equality comparisons.
 * @param {Array} array The array to inspect.
 * @param {Array|Array<Array>} others The values to exclude.
 * @param {*} comparator The comparator invoked per element.
 * @returns Returns the new array of filtered values.
 */
function except([array, ...others], comparator = (a, b) => a == b) {
  return others.reduce(
    (previous, current) => {
      for (const item of current) {
        const findIndex = previous.findIndex((x) => comparator(x, item));
        if (findIndex !== -1) {
          previous.splice(findIndex, 1);
        }
      }
      return previous;
    },
    [...array],
  );
}

export const array = {
  isArray,
  isEmpty,
  shuffle,
  flat,
  groupBy,
  intersection,
  except,
};
