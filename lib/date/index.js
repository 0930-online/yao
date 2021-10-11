/* eslint-disable no-case-declarations */
/**
 * Date formatter
 * @param {Date} _this
 * @param {string} fmt
 * @returns formatted date string
 */
function format(_this, fmt = "YYYY-MM-DD hh:mm:ss") {
  if (!_this || _this == null) return null;
  var o = {
    "M+": _this.getMonth() + 1, // 月份
    "D+": _this.getDate(), // 日
    "h+": _this.getHours(), // 小时
    "m+": _this.getMinutes(), // 分
    "s+": _this.getSeconds(), // 秒
    "q+": Math.floor((_this.getMonth() + 3) / 3), // 季度
    "S+": _this.getMilliseconds(), // 毫秒
  };
  if (/([Y,y]+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (_this.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
  }
  return fmt;
}

/**
 * Gets specific part from the given date
 * @param {Date} _this The given date
 * @param {units} unit Which part to get
 * @returns {Number} A numeric value
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
function get(_this, unit = "timestamp") {
  let value;
  switch (unit) {
    case "year":
      value = _this.getFullYear();
      break;
    case "quarter":
      value = Math.floor((_this.getMonth() + 3) / 3);
      break;
    case "month":
      value = _this.getMonth() + 1;
      break;
    case "week":
      value = _this.getDay() === 0 ? 7 : _this.getDay();
      break;
    case "day":
      value = _this.getDate();
      break;
    case "hour":
      value = _this.getHours();
      break;
    case "minute":
      value = _this.getMinutes();
      break;
    case "second":
      value = _this.getSeconds();
      break;
    case "millisecond":
      value = _this.getMilliseconds();
      break;
    default:
      value = +_this;
      break;
  }
  return value;
}

/**
 * Sets part of the value in the Date object using local time.
 * @param {Date} _this The date to set value
 * @param {number} value The value will be set to
 * @param {units} unit The unit to set
 */
function set(_this, value, unit = "timestamp") {
  switch (unit) {
    case "year":
      _this.setFullyear(value);
      break;
    case "quarter":
      break;
    case "month":
      _this.setMonth(value - 1);
      break;
    case "week":
      break;
    case "day":
      _this.setDate(value);
      break;
    case "hour":
      _this.setHours(value);
      break;
    case "minute":
      _this.setMinutes(value);
      break;
    case "second":
      _this.setSeconds(value);
      break;
    case "millisecond":
      _this.setMilliseconds(value);
      break;
    default:
      _this.setTime(value);
      break;
  }
}

/**
 * Sets the year, month, date of the Date object using local time.
 * @param _this The Date object.
 * @param year A numeric value for the year.
 * @param month A one-based numeric value for the month (1 for January, 12 for December). Must be specified if numDate is specified.
 * @param date A numeric value equal for the day of the month.
 */
function setDate(
  _this,
  year,
  month = _this.getMonth() + 1,
  date = _this.getDate()
) {
  _this.setFullYear(year, month - 1, date);
}

/**
 * Sets the hour, minute, second, millisecond value in the Date object using local time.
 * @param _this The Date object
 * @param hours A numeric value equal to the hours value.
 * @param min A numeric value equal to the minutes value.
 * @param sec A numeric value equal to the seconds value.
 * @param ms A numeric value equal to the milliseconds value.
 */
function setTime(
  _this,
  hours,
  min = _this.getMinutes(),
  sec = _this.getSeconds(),
  ms = _this.getMilliseconds()
) {
  _this.setHours(hours, min, sec, ms);
}

/**
 * Enum for time units
 */
const UNITS = Object.freeze({
  year: "year",
  quartar: "quartar",
  month: "month",
  week: "week",
  day: "day",
  hour: "hour",
  minute: "minute",
  second: "second",
  millisecond: "millisecond",
});

/**
 * Mapping relations bewteen each unit and the minimum unit - millisecond
 */
const RELATIONS = Object.freeze({
  [UNITS.week]: 7 * 24 * 60 * 60 * 1000,
  [UNITS.day]: 24 * 60 * 60 * 1000,
  [UNITS.hour]: 60 * 60 * 1000,
  [UNITS.minute]: 60 * 1000,
  [UNITS.second]: 1000,
  [UNITS.millisecond]: 1,
});

/**
 * Gets the amount needed to transform the given unit to millisecond
 * @param {units} unit Time unit
 * @returns {number}
 */
function getFixedUnitCount(unit) {
  return Reflect.ownKeys(RELATIONS, unit) ? RELATIONS[unit] : 0;
}

/**
 * Date add function with specific time unit.
 * @param {Date} _this Date object
 * @param {number} several The number to be added
 * @param {units} unit Time unit
 */
function add(_this, several, unit = UNITS.day) {
  let year, month;
  switch (unit) {
    case "year":
      year = get(_this, UNITS.year) + several;
      set(_this, year, UNITS.year);
      break;
    case "quartar":
      add(_this, several * 3, UNITS.month);
      break;
    case "month":
      year = get(_this, UNITS.year);
      month = get(_this, UNITS.month) + several;
      setDate(_this, year, month);
      break;
    default:
      /** get the specification */
      let spec = getFixedUnitCount(unit);
      _this.setTime(_this.getTime() + several * spec);
      break;
  }
}

/**
 * Date substract function with specific time unit.
 * @param {Date} _this Date object
 * @param {number} several The number to be substractted
 * @param {units} unit Time unit
 */
function substract(_this, several, unit = UNITS.day) {
  add(_this, 0 - several, unit);
}

/**
 * Define thresholds for each length of time
 */
const THRESHOLDS = [
  {
    key: "s",
    min: { value: 0, unit: UNITS.second },
    max: { value: 29, unit: UNITS.second },
    times: (range) => 1,
    output: (times) => `几秒前`,
  },
  {
    key: "ss",
    min: { value: 30, unit: UNITS.second },
    max: { value: 44, unit: UNITS.second },
    times: (range) => Math.round(range / RELATIONS[UNITS.second]),
    output: (times) => `${times}秒前`,
  },
  {
    key: "m",
    unit: UNITS.second,
    min: { value: 45, unit: UNITS.second },
    max: { value: 89, unit: UNITS.second },
    times: (range) => Math.round(range / RELATIONS[UNITS.hour]),
    output: (times) => `1分钟前`,
  },
  {
    key: "mm",
    min: { value: 90, unit: UNITS.second },
    max: { value: 44, unit: UNITS.minute },
    times: (range) => Math.round(range / RELATIONS[UNITS.minute]),
    output: (times) => `${times}分钟前`,
  },
  {
    key: "h",
    unit: UNITS.hour,
    min: { value: 45, unit: UNITS.minute },
    max: { value: 89, unit: UNITS.minute },
    times: (range) => Math.round(range / RELATIONS[UNITS.hour]),
    output: (times) => `1小时前`,
  },
  {
    key: "hh",
    min: { value: 90, unit: UNITS.minute },
    max: { value: 21, unit: UNITS.hour },
    times: (range) => Math.round(range / RELATIONS[UNITS.hour]),
    output: (times) => `${times}小时前`,
  },
  {
    key: "d",
    min: { value: 22, unit: UNITS.hour },
    max: { value: 35, unit: UNITS.hour },
    times: (range) => 1,
    output: (times) => `1天前`,
  },
  {
    key: "dd",
    min: { value: 36, unit: UNITS.hour },
    max: { value: 25, unit: UNITS.day },
    times: (range) => Math.round(range / (1 * RELATIONS[UNITS.day])),
    output: (times) => `${times}天前`,
  },
  {
    key: "M",
    min: { value: 26, unit: UNITS.day },
    max: { value: 44, unit: UNITS.day },
    times: (range) => 1,
    output: (times) => `1个月前`,
  },
  {
    key: "MM",
    min: { value: 45, unit: UNITS.day },
    max: { value: 319, unit: UNITS.day },
    times: (range) => Math.round(range / (30.416 * RELATIONS[UNITS.day])),
    output: (times) => `${times}个月前`,
  },
  {
    key: "y",
    min: { value: 320, unit: UNITS.day },
    max: { value: 547, unit: UNITS.day },
    times: (range) => 1,
    output: (times) => `1年前`,
  },
  {
    key: "yy",
    min: { value: 548, unit: UNITS.day },
    max: { value: 36500, unit: UNITS.day },
    times: (range) => Math.round(range / (365 * RELATIONS[UNITS.day])),
    output: (times) => `${times}年前`,
  },
];

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
function fromNow(_this) {
  const range = new Date() - _this;
  /** calculate from the end of thresholds  */
  for (let i = THRESHOLDS.length - 1; i >= 0; i--) {
    const { min, max, times, output } = THRESHOLDS[i];
    if (
      range >= min.value * RELATIONS[min.unit] &&
      range <= max.value * RELATIONS[max.unit]
    ) {
      const n = times(range);
      return output(n);
    }
  }
  return "";
}

export const date = {
  format,
  get,
  set,
  setDate,
  setTime,
  add,
  substract,
  fromNow,
};
