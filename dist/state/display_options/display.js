import {h_step, round_number, v_step} from "../../canvas/position_utils.js";
const half_screen_width = 1e3 / 2;
const half_screen_height = 600 / 2;
function calculate_xy_for_middle(args) {
  const x = round_number(args.x + half_screen_width * (100 / args.zoom), h_step);
  const y = round_number(args.y - half_screen_height * (100 / args.zoom), v_step);
  return {x, y};
}
function calculate_xy_for_put_middle(args) {
  const x = args.x - (half_screen_width * (100 / args.zoom) - h_step / 2);
  const y = args.y + (half_screen_height * (100 / args.zoom) - v_step / 2);
  return {x, y};
}
export function get_middle_of_screen(state) {
  const result = calculate_xy_for_middle(state.routing.args);
  return {left: result.x, top: -result.y};
}
export function lefttop_to_xy(position, middle) {
  if (!position)
    return void 0;
  const {left: x, top, zoom} = position;
  const y = top !== void 0 ? -1 * top : void 0;
  if (middle && x !== void 0 && y !== void 0 && zoom !== void 0) {
    const middle2 = calculate_xy_for_put_middle({x, y, zoom});
    return {...middle2, zoom};
  }
  return {x, y, zoom};
}
