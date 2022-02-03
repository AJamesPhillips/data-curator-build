import {h_step, position_to_point, round_number, v_step} from "../../canvas/position_utils.js";
import {SCALE_BY} from "../../canvas/zoom_utils.js";
import {SIDE_PANEL_WIDTH} from "../../side_panel/width.js";
import {STARTING_ZOOM} from "../routing/starting_state.js";
export const TOP_HEADER_FUDGE = 48;
const bottom_controls_fudge = (display_time_sliders) => display_time_sliders ? 300 : 120;
const side_panel_fudge = (display_side_panel) => display_side_panel ? SIDE_PANEL_WIDTH : 0;
export const get_screen_width = (display_side_panel) => document.body.clientWidth - side_panel_fudge(display_side_panel);
export const get_visible_screen_height = (display_time_sliders) => document.body.clientHeight - TOP_HEADER_FUDGE - bottom_controls_fudge(display_time_sliders);
const half_screen_width = (display_side_panel) => get_screen_width(display_side_panel) / 2;
const half_screen_height = (display_time_sliders) => get_visible_screen_height(display_time_sliders) / 2;
function calculate_xy_for_middle(args, display_side_panel, display_time_sliders) {
  const x = round_number(args.x + half_screen_width(display_side_panel) * (SCALE_BY / args.zoom), h_step);
  const y = round_number(args.y - half_screen_height(display_time_sliders) * (SCALE_BY / args.zoom), v_step) + TOP_HEADER_FUDGE;
  return {x, y};
}
function calculate_xy_for_put_middle(args, display_args) {
  const x = args.x - half_screen_width(display_args.display_side_panel) * (SCALE_BY / args.zoom);
  const y = args.y + (half_screen_height(display_args.display_time_sliders) + TOP_HEADER_FUDGE) * (SCALE_BY / args.zoom);
  return {x, y};
}
export function get_middle_of_screen(state) {
  const result = calculate_xy_for_middle(state.routing.args, state.controls.display_side_panel, state.controls.display_time_sliders);
  return position_to_point(result);
}
const DEFAULT_DISPLAY_ARGS = {display_side_panel: false, display_time_sliders: false};
export function lefttop_to_xy(position, middle, display_args) {
  if (!position)
    return void 0;
  const {left: x, top, zoom = STARTING_ZOOM} = position;
  const y = top !== void 0 ? -1 * top : void 0;
  if (middle && x !== void 0 && y !== void 0) {
    const middle_xy = calculate_xy_for_put_middle({x, y, zoom}, display_args || DEFAULT_DISPLAY_ARGS);
    return {...middle_xy, zoom};
  }
  return {x, y, zoom};
}
