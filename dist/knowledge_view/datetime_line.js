import {round_coordinate_small_step} from "../canvas/position_utils.js";
import {time_scale_days_to_ms_pixels_fudge_factor} from "../shared/constants.js";
import {get_current_datetime_from_wcomponent} from "../state/specialised_objects/accessors.js";
export const DEFAULT_DATETIME_LINE_CONFIG = {
  time_origin_x: 0,
  time_scale: 1,
  time_line_number: 4,
  time_line_spacing_days: 30
};
export function default_time_origin_parameters(args) {
  const time_origin_ms = args.time_origin_ms ?? new Date().getTime();
  const time_origin_x = args.time_origin_x ?? 0;
  const time_scale = args.time_scale ?? 1;
  return {time_origin_ms, time_origin_x, time_scale};
}
export function calculate_canvas_x_for_wcomponent_temporal_uncertainty(args) {
  const datetime = get_current_datetime_from_wcomponent(args.wcomponent_id, args.wcomponents_by_id, args.created_at_ms);
  if (!datetime)
    return void 0;
  const left = calculate_canvas_x_for_datetime({
    datetime,
    ...args
  });
  return round_coordinate_small_step(left);
}
export function calculate_canvas_x_for_datetime(args) {
  const time_diff = args.datetime.getTime() - args.time_origin_ms;
  const time_scalar = args.time_scale / time_scale_days_to_ms_pixels_fudge_factor;
  return time_diff * time_scalar + args.time_origin_x;
}
