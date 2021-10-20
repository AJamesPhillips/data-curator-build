export function get_uncertain_datetime(datetime) {
  return datetime && (datetime.min || datetime.value || datetime.max);
}
export function uncertain_datetime_is_eternal(datetime) {
  return get_uncertain_datetime(datetime) === void 0;
}
