import {date2str_auto} from "../shared/utils/date_helpers.js";
import {test} from "../shared/utils/test.js";
import {uncertain_datetime_is_eternal} from "../shared/uncertainty/datetime.js";
export function str_to_date(date_str) {
  return new Date(date_str.trim());
}
export function valid_date_str(date_str) {
  return valid_date(str_to_date(date_str));
}
export function date_to_string(args) {
  const {date, time_resolution, trim_midnight} = args;
  const as_string = date && valid_date(date) ? date2str_auto({date, time_resolution, trim_midnight}) : "";
  return as_string;
}
export function uncertain_date_to_string(datetime, time_resolution) {
  let str = "Eternal";
  if (!uncertain_datetime_is_eternal(datetime)) {
    const min = date_to_string({date: datetime.min, time_resolution});
    const value = date_to_string({date: datetime.value, time_resolution});
    const max = date_to_string({date: datetime.max, time_resolution});
    if (value && !min && !max)
      return value;
    const strs = [
      min,
      min ? " " : "",
      "<",
      value ? " " : "",
      value,
      value ? " " : "",
      "<",
      max ? " " : "",
      max
    ];
    str = strs.filter((s) => s).join("");
  }
  return str;
}
export function valid_date(date) {
  return !Number.isNaN(date.getTime());
}
export function correct_datetime_for_local_time_zone(value) {
  const a = new Date(value);
  return valid_date(a) ? a : void 0;
}
function run_tests() {
  console.log("running tests of correct_datetime_for_local_time_zone");
  let result;
  result = correct_datetime_for_local_time_zone("2021-04-16 15:00");
  test(result && result.toISOString(), "2021-04-16T14:00:00.000Z");
  result = correct_datetime_for_local_time_zone("2021-04-16 00:00");
  test(result && result.toISOString(), "2021-04-15T23:00:00.000Z");
  result = correct_datetime_for_local_time_zone("2021-04-16");
  test(result && result.toISOString(), "2021-04-15T23:00:00.000Z");
}
