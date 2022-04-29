const SCALE = 10;
export const MSECONDS_PER_DAY = 864e5;
const scale_days = SCALE / MSECONDS_PER_DAY;
export function x(start_datetime_ms) {
  return start_datetime_ms * scale_days;
}
export function vertical_ordinal_to_y(vertical_ordinal) {
  return vertical_ordinal * 100;
}
export function calc_width(start_datetime_ms, stop_datetime_ms) {
  const w = stop_datetime_ms - start_datetime_ms;
  return w * scale_days;
}
const y_factory = (offset) => (vertical_position) => offset * SCALE + vertical_position * 11 * SCALE;
export const project_priority_y = y_factory(0);
export const project_priority_height = 7 * SCALE;
export const action_y = y_factory(8);
export const action_height = 1 * SCALE;
export const COLOURS = {
  white: {r: 255, g: 255, b: 255, a: 1},
  white_a75: {r: 255, g: 255, b: 255, a: 0.75}
};
