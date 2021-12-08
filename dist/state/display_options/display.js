import {h_step, position_to_point, round_number, v_step} from "../../canvas/position_utils.js";
import {SCALE_BY} from "../../canvas/zoom_utils.js";
import {STARTING_ZOOM} from "../routing/starting_state.js";
export const TOP_HEADER_FUDGE = 48;
const bottom_controls_fudge = (display_time_sliders) => display_time_sliders ? 215 : 57;
const side_panel_fudge = (display_side_panel) => display_side_panel ? 440 : 0;
export const screen_width = (display_side_panel) => document.body.clientWidth - side_panel_fudge(display_side_panel);
const screen_height = () => document.body.clientHeight;
export const visible_screen_height = (display_time_sliders) => screen_height() - TOP_HEADER_FUDGE - bottom_controls_fudge(display_time_sliders);
const half_screen_width = (display_side_panel) => screen_width(display_side_panel) / 2;
const half_screen_height = () => screen_height() / 2;
function calculate_xy_for_middle(args, display_side_panel) {
  const x = round_number(args.x + half_screen_width(display_side_panel) * (SCALE_BY / args.zoom), h_step);
  const y = round_number(args.y - half_screen_height() * (SCALE_BY / args.zoom), v_step);
  return {x, y};
}
function calculate_xy_for_put_middle(args, display_side_panel) {
  const x = args.x - (half_screen_width(display_side_panel) * (SCALE_BY / args.zoom) - h_step / 2);
  const y = args.y + (half_screen_height() * (SCALE_BY / args.zoom) - v_step / 2);
  return {x, y};
}
export function get_middle_of_screen(state) {
  const result = calculate_xy_for_middle(state.routing.args, state.controls.display_side_panel);
  return position_to_point(result);
}
export function lefttop_to_xy(position, middle) {
  if (!position)
    return void 0;
  const {left: x, top, zoom = STARTING_ZOOM} = position;
  const y = top !== void 0 ? -1 * top : void 0;
  if (middle && x !== void 0 && y !== void 0) {
    const middle2 = calculate_xy_for_put_middle({x, y, zoom}, false);
    return {...middle2, zoom};
  }
  return {x, y, zoom};
}
