export function routing_arg_datetime_strings_to_datetime(date, time) {
  if (!date)
    return new Date();
  return date_and_time_strings_to_datetime(date, time || "");
}
function date_and_time_strings_to_datetime(date, time) {
  const datetime = new Date(date + " " + time);
  if (Number.isNaN(datetime.getTime()))
    return new Date();
  return datetime;
}
export function get_datetime_and_ms(args) {
  if (args.ms === void 0)
    return {ms: args.datetime.getTime(), datetime: args.datetime};
  return {ms: args.ms, datetime: new Date(args.ms)};
}
export function get_datetime_or_ms(new_datetime, new_ms, logger = console.warn) {
  if (new_ms === void 0)
    return new_datetime ? new_datetime.getTime() : void 0;
  if (new_datetime !== void 0)
    logger("do not set both new_ms and new_datetime");
  return new_ms;
}
