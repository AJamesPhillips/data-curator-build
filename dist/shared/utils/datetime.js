import {date2str_auto} from "./date_helpers.js";
export function floor_mseconds_to_resolution(ms, time_resolution) {
  const date = floor_datetime_to_resolution(new Date(ms), time_resolution);
  return date.getTime();
}
export function floor_datetime_to_resolution(date, time_resolution) {
  const str = date2str_auto({date, time_resolution});
  return new Date(str);
}
export function get_new_created_ats(creation_context_state) {
  const created_at = new Date();
  let custom_created_at = void 0;
  if (creation_context_state) {
    const {use_creation_context, creation_context: cc} = creation_context_state;
    custom_created_at = use_creation_context ? cc && cc.custom_created_at : void 0;
  }
  return {created_at, custom_created_at};
}
export function get_uncertain_datetime(datetime) {
  return datetime.min || datetime.value || datetime.max;
}
export function uncertain_datetime_is_eternal(datetime) {
  return get_uncertain_datetime(datetime) === void 0;
}
