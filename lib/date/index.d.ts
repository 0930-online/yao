/**
 * Date formatter
 * @param {Date} _this
 * @param {string} fmt
 * @returns formatted date string
 */
declare function format(_this: Date, fmt?: string): string;

declare type units =
  | "year"
  | "quarter"
  | "month"
  | "week"
  | "day"
  | "hour"
  | "minute"
  | "second"
  | "millisecond";

/**
 * Gets specific part from the given date
 * @param {Date} _this the given date
 * @param {units} unit which part to get
 * @returns {Number} a number
 *
 * @example
 * const now = new Date();  // ‘Mon Sep 06 2021 16:31:02 GMT+0800 (中国标准时间)’
 * get(now, "year");        // 2021
 * get(now, "quarter");     // 3
 * get(now, "month");       // 9
 * get(now, "week");        // 1   1:周一 2:周二 3:周三 4:周四 5:周五 6:周六 7:周日
 * get(now, "day");         // 6
 * get(now, "hour");        // 16
 * get(now, "minute");      // 25
 * get(now, "second");      // 28
 * get(now, "millisecond"); // 667
 */
declare function get(_this: Date, unit?: units): number;

/**
 * Sets part of the value in the Date object using local time.
 * @param {Date} _this The date to set value
 * @param {number} value The value will be set to
 * @param {units} unit The unit to set
 */
declare function set(_this: Date, value: number, unit?: units): void;

/**
 * Sets the year, month, date of the Date object using local time.
 * @param {Date} _this The Date object.
 * @param {number} year A numeric value for the year.
 * @param {number} month A one-based numeric value for the month (1 for January, 12 for December). Must be specified if numDate is specified.
 * @param {number} date A numeric value equal for the day of the month.
 */
declare function setDate(
  _this: Date,
  year: number,
  month?: number,
  date?: number
): void;

/**
 * Sets the hour, minute, second, millisecond value in the Date object using local time.
 * @param {Date} _this The Date object
 * @param {number} hours A numeric value equal to the hours value.
 * @param {number} min A numeric value equal to the minutes value.
 * @param {number} sec A numeric value equal to the seconds value.
 * @param {number} ms A numeric value equal to the milliseconds value.
 */
declare function setTime(
  _this: Date,
  hours: number,
  min?: number,
  sec?: number,
  ms?: number
): void;

/**
 * Date add function with specific time unit.
 * @param {Date} _this Date object
 * @param {number} several The number to be added
 * @param {units} unit Time unit
 */
declare function add(_this: Date, several: number, unit?: units): void;

/**
 * Date substract function with specific time unit.
 * @param {Date} _this Date object
 * @param {number} several The number to be substractted
 * @param {units} unit Time unit
 */
declare function substract(_this: Date, several: number, unit?: units): void;

/**
 * Get relative time from now, it's like xx time ago.
 * @param {Date} _this Target time.
 * @returns A string displayed for each length of time.
 * @example
 *  import { date } from "utils-common";
 *
 *  const now = new Date();        // Now Time : ‘Mon Sep 06 2021 16:31:02 GMT+0800 (中国标准时间)’
 *  date.substract(45,"minutes");  // minus 45 minutes
 *  const ago = date.fromNow();    // 一小时前
 */
function fromNow(_this: Date): string;

export const date = {
  /** Date formatter */
  format,
  /** Gets part of the value in the Date object using local time. */
  get,
  /** Sets part of the value in the Date object using local time. */
  set,
  /** Sets the year, month, date of the Date object using local time. */
  setDate,
  /** Sets the hour, minute, second, millisecond value in the Date object using local time. */
  setTime,
  /** Date add function with specific time unit. */
  add,
  /** Date substract function with specific time unit.*/
  substract,
  /** Get relative time from now, it's like xx time ago. */
  fromNow,
};
