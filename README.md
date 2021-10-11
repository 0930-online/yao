# utils function

utility function of object,array,function,date ...

## Install

```
npm install coco-cola
```

## Usage

### date

#### [.format](lib/date/index.js#L8)

Date formatter, transform the date object to the fmt string.

**Params**

- @param {Date} \_this: the date object
- @param {string} fmt: the format string

**Example**

```typescript
import { date } from "coco-cola";

const formatted = date.format(new Date(), "YYYY-MM-dd");
//formatted: 2021-10-10
```

#### [.get](lib/date/index.js#L45)

Gets specific part from the given date

**Params**

- @param {Date} \_this: The given date
- @param {units} unit: Which part to get

**Returns**

- @returns {Number} A numeric value

**Example**

```typescript
import { date } from "coco-cola";

// ‘Mon Sep 06 2021 16:31:02 GMT+0800 (中国标准时间)’
const now = new Date();
date.get(now, "year"); // 2021
date.get(now, "quarter"); // 3
date.get(now, "month"); // 9
date.get(now, "week"); // 1   1:周一 2:周二 3:周三 4:周四 5:周五 6:周六 7:周日
date.get(now, "day"); // 6
date.get(now, "hour"); // 16
date.get(now, "minute"); // 25
date.get(now, "second"); // 28
date.get(now, "millisecond"); // 667
```

#### [.set](lib/date/index.js#L88)

Sets part of the value in the Date object using local time.

**Params**

- @param {Date} \_this: The date to set value
- @param {number} value: The value will be set to
- @param {units} unit: The unit to set

**Returns**

- returns void

**Example**

```typescript
import { date } from "coco-cola";

// ‘2021-09-06 16:31:02’
const now = new Date();
date.set(now, 2020, "year");
// now : 2020-09-06 16:31:02
```

#### [.setDate](lib/date/index.js#L128)

Sets the year, month, date of the Date object using local time.

**Params**

- @param \_this: The Date object.
- @param year: A numeric value for the year.
- @param month: A one-based numeric value for the month (1 for January, 12 for December). Must be specified if numDate is specified.
- @param date: A numeric value equal for the day of the month.

**Returns**

- returns void

**Example**

```typescript
import { date } from "coco-cola";

// ‘2021-09-06 16:31:02’
const now = new Date();
date.setDate(now, 2020, 08, 15);
// now: ‘2020-08-15 16:31:02’
```

#### [.setTime](lib/date/index.js#L140)

Sets the hour, minute, second, millisecond value in the Date object using local time.

**Params**

- @param \_this: The Date object
- @param hours: A numeric value equal to the hours value.
- @param min: A numeric value equal to the minutes value.
- @param sec: A numeric value equal to the seconds value.
- @param ms: A numeric value equal to the milliseconds value.

**Returns**

- returns void

**Example**

```typescript
import { date } from "coco-cola";

// ‘2021-09-06 16:31:02 010’
const now = new Date();
date.setTime(now, 15, 15, 15);
// now: ‘2021-09-06 15:15:15 010’
```

#### [.add](lib/date/index.js#L186)

Date add function with specific time unit.

**Params**

- @param {Date} \_this: Date object
- @param {number} several: The number to be substractted
- @param {units} unit: Time unit

**Returns**

- returns void

**Example**

```typescript
import { date } from "coco-cola";

// ‘2021-09-06 16:31:02 010’
const now = new Date();
date.add(now, 1, "hour");
// now: ‘2021-09-06 17:31:02 010’
```

#### [.substract](lib/date/index.js#L215)

Date substract function with specific time unit.

**Params**

- @param {Date} \_this: Date object
- @param {number} several: The number to be substractted
- @param {units} unit: Time unit

**Returns**

- returns void

**Example**

```typescript
import { date } from "coco-cola";

// ‘2021-09-06 16:31:02 010’
const now = new Date();
date.substract(now, 1, "hour");
// now: ‘2021-09-06 15:31:02 010’
```

#### [.fromNow](lib/date/index.js#L215)

Get relative time from now, it's like xx time ago.

**Params**

- @param {Date} \_this: Target time.

**Returns**

- @returns A string displayed for each length of time.

**Example**

```typescript
import { date } from "coco-cola";

const now = new Date(); // Now Time : ‘Mon Sep 06 2021 16:31:02 GMT+0800 (中国标准时间)’
date.substract(45, "minutes"); // minus 45 minutes
const fromNowString = date.fromNow(); // fromNowString: 一小时前
```

### array

#### [.isArray](lib/array/index.js#L1)

Determine if a value is an array.

**Params**

- @param {any} value: the value to test

**Returns**

- @returns {boolean} True if value is an array, otherwise false

**Example**

```typescript
import { array } from "coco-cola";

array.isArray([]); // true
```

#### [.isEmpty](lib/array/index.js#L10)

Determine if a value is an emtpy array.

**Params**

- @param {any} value: the value to test

**Returns**

- @returns {boolean} True if value is an empty array, otherwise false

**Example**

```typescript
import { array } from "coco-cola";

array.isEmpty([]); // true
```

#### [.shuffle](lib/array/index.js#L18)

Shuffle the given array with math.random as the compare function.

**Params**

- @param {Array} arr: the given array

**Returns**

- @returns {boolean} True if value is an empty array, otherwise false

**Example**

```typescript
import { array } from "coco-cola";

const arr = [1, 2, 3, 4, 5];
array.shuffle(arr); // might output: [1,3,2,5,4] ...
```

#### [.flat](lib/array/index.js#L28)

Flatten tree data in recursion.

**Params**

- @param {Array<T>} \_this: The collection to flat
- @param {keyof T} children: The column name represents children array

**Returns**

- @returns {Array<T>} Returns a new array with flattened tree data.

**Example**

```typescript
import { array } from "coco-cola";

const arr = [
  {
    id: 0,
    title: "NO1",
    children: [
      {
        id: 1,
        title: "NO2",
        children: [
          {
            id: 2,
            title: "NO3",
          },
        ],
      },
    ],
  },
];
array.flat(arr);
/* 
[
  {
    id:0,
    title:'NO1'
  },
  {
    id:1,
    title:'NO2'
  },
  {
    id:2,
    title:'NO3'
  }
];
*/
```

#### [.groupBy](lib/array/index.js#L46)

Group collection by function iteratee.

**Params**

- @param {Array} collection: The collection to iterate over.
- @param {Function} iteratee: The iteratee to transform keys.

**Returns**

- @returns {Record<string, Array<T>>} Returns the composed aggregate object.

**Example**

```typescript
import { array } from "coco-cola";

const arr = [
  {
    id: 0,
    title: "NO0",
    user_id: 0,
  },
  {
    id: 1,
    title: "NO1",
    user_id: 0,
  },
  {
    id: 2,
    title: "NO2",
    user_id: 0,
  },
  {
    id: 3,
    title: "NO3",
    user_id: 1,
  },
  {
    id: 4,
    title: "NO4",
    user_id: 1,
  },
];
array.groupBy(arr, (item, index) => item.user_id);
/* 
{
  0: [
    {
      id: 0,
      title: "NO0",
      user_id: 0
    },
    {
      id: 1,
      title: "NO1",
      user_id: 0
    },
    {
      id: 2,
      title: "NO2",
      user_id: 0
    },
  ],

  1: [
    {
      id: 3,
      title: "NO3",
      user_id: 1
    },
    {
      id: 4,
      title: "NO4",
      user_id: 1
    },
  ]
};
*/
```

#### [.intersection](lib/array/index.js#L64)

Creates an array of unique values that are included in all given arrays using SameValueZero for equality comparisons.

The order and references of result values are determined by the first array.

**Params**

- @param {any[][]} [array, ...others]: The array of arrays to insepect.
- @param {Function} comparator: The comparator invoked per element.

**Returns**

- @returns {Record<string, Array<T>>} Returns the composed aggregate object.

**Example**

```typescript
import { array } from "coco-cola";
```

#### [.except](lib/array/index.js#L88)

Creates an array excluding all given values using SameValueZero for equality comparisons.

**Params**

- @param {Array} array: The array to inspect.
- @param {Array|Array<Array>} others: The values to exclude.
- @param {\*} comparator: The comparator invoked per element.

**Returns**

- @returns Returns the new array of filtered values.

**Example**

```typescript
import { array } from "coco-cola";
```

### object

#### [.replace](lib/object/index.js#L9)

Replace obj columns to other columns , according to the given entries.

**Params**

- @param obj: the target to transform columns
- @param entries: collection of column relations, just key-value entries

**Returns**

- @returns new object after transformed , origin columns has been deleted

**Example**

```typescript
import { object } from "coco-cola";
object.replace({ a: 1, b: 2 }, [
  [a, c],
  [b, d],
]);
// { c: 1, d: 2 }
```

#### [.fromEntries](lib/object/index.js#L23)

Returns an object created by key-value entries for properties and methods.

**Params**

- @param entries: An iterable object that contains key-value entries for properties and methods.

**Returns**

- @returns new object

**Example**

```typescript
import { object } from "coco-cola";
object.fromEntries([
  [a, 1],
  [b, 2],
]);
// { a: 1, b: 2 }
```

#### [.isEmpty](lib/object/index.js#L50)

Determine if value is an empty object.

**Params**

- @param {any} value: The value to test

**Returns**

- @returns True if value is {}, otherwise false.

**Example**

```typescript
import { object } from "coco-cola";
object.isEmpty({}); // true
```

#### [.cloneDeep](lib/object/index.js#L81)

Creates a deep clone of value.

**Params**

- @param {Record} source: The object to deep clone.
- @param {Map|WeakMap} hash: The hash map to inspect circular reference.

**Returns**

- @returns {Record} Returns the deep cloned value.

**Example**

```typescript
import { object } from "coco-cola";
object.cloneDeep({ a: 1, b: 2 }); // { a: 1, b: 2 }
```

### utility

#### [.URLSearchObject](lib/utility/index.js#L8)

Returns an object from URLSearchParams entries.

**Params**

**Returns**

- @returns Object from URLSearchParams entries.

**Example**

```typescript
import { utility } from "coco-cola";
// http://www.xxx.com?a=1&b=2
utility.URLSearchObject(); // { a: 1, b: 2 }
```

#### [.uuid](lib/utility/index.js#L20)

Generates a unique ID.

**Params**

**Returns**

- @returns uuid

**Example**

```typescript
import { utility } from "coco-cola";
utility.uuid(); // cd205467-0120-47b0-9444-894736d873c7
```

#### [.isEmptyValue](lib/utility/index.js#L82)

Determine whether the value is null, undefined, "", NaN, [] or {}.

**Params**

- @param {any} value: The value to inspect

**Returns**

- @returns True if value is null, undefined, "", NaN, [] or {}.

**Example**

```typescript
import { utility } from "coco-cola";

utility.isEmptyValue({}); // true
utility.isEmptyValue([]); // true
```

#### [.omit](lib/utility/index.js#L99)

Omit all entries with the predictable iteratee function.

**Params**

- @param {Record} source: The source object.
- @param {(key:string,value:any):=> boolean} iteratee: A predictable func to go through each entry of the source object

**Returns**

- @returns Returns a new object.

**Example**

```typescript
import { utility } from "coco-cola";

utility.omit({ a: 1, b: 2, c: {}, d: "" }, (key, value) =>
  utility.isEmptyValue(value)
); // { a: 1, b: 2 }
```

#### [.debounce](lib/utility/index.js#L111)

Delays invoking func until after 'delay' milliseconds have elapsed since the last time the debounced function was invoked.

**Params**

- @param {Function} fn: The function to debounce.
- @param {number} delay: The number of milliseconds to delay.
- @default delay 50

**Returns**

- @returns {Function} Returns the new debounced function.

**Example**

```typescript
import { utility } from "coco-cola";
```

#### [.throttle](lib/utility/index.js#L99)

Only invokes func at most once per every 'duration' milliseconds.

**Params**

- @param {Function} fn: The function to throttle.
- @param {number} duration: The number of milliseconds to throttle invocations to.

**Returns**

- @returns {Function} Returns the new throttled function.

**Example**

```typescript
import { utility } from "coco-cola";
```
