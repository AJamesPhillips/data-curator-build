import {test} from "../shared/utils/test.js";
import {bounded} from "../shared/utils/bounded.js";
export const bound_zoom = (new_zoom) => bounded(new_zoom, 10, 400);
export const SCALE_BY = 100;
const zoom_sensitivity = 0.01;
export function calculate_new_zoom(args) {
  const {zoom, wheel_change} = args;
  const raw_zoom = zoom - wheel_change * zoom_sensitivity * zoom;
  const new_zoom = bound_zoom(Math.round(raw_zoom));
  return new_zoom;
}
export function calculate_new_zoom_xy(args) {
  const {old, new_zoom, pointer_x, pointer_y, client_width, client_height} = args;
  const x_factor = pointer_x / client_width;
  const y_factor = pointer_y / client_height;
  const scale = SCALE_BY / new_zoom - SCALE_BY / old.zoom;
  const dx = x_factor * client_width * scale;
  const dy = y_factor * client_height * scale;
  const new_x = old.x - dx;
  const new_y = old.y + dy;
  return {x: new_x, y: new_y};
}
function run_tests() {
  console.log("running tests of calculate_new_zoom_xy etc");
  let result;
  const width = 900;
  const height = 600;
  const canvas_left = 5;
  const canvas_top = 15;
  let zoom;
  let new_zoom;
  let pointer;
  const top_left = {pointer_x: canvas_left + 0, pointer_y: canvas_top + 0};
  const bottom_right = {pointer_x: canvas_left + width, pointer_y: canvas_top + height};
  function calc(args) {
    const pointer2 = args.pointer === "top_left" ? top_left : bottom_right;
    return calculate_new_zoom_xy({
      old: {x: args.x, y: args.y, zoom: args.zoom},
      new_zoom: args.new_zoom,
      ...pointer2,
      client_width: width,
      client_height: height
    });
  }
  pointer = "top_left";
  result = calc({x: 0, y: 0, zoom: 10, new_zoom: 200, pointer});
  test(result, {x: 0, y: 0});
  result = calc({x: 100, y: 100, zoom: 200, new_zoom: 200, pointer});
  test(result, {x: 100, y: 100});
  result = calc({x: 100, y: 100, zoom: 200, new_zoom: 10, pointer});
  test(result, {x: 100, y: 100});
  pointer = "bottom_right";
  zoom = 100;
  new_zoom = 50;
  result = calc({x: 0, y: 0, zoom, new_zoom, pointer});
  test(result, {x: -width, y: height});
  result = calc({x: 100, y: 100, zoom, new_zoom, pointer});
  test(result, {x: -width + 100, y: height + 100});
  zoom = 200;
  new_zoom = 100;
  result = calc({x: 0, y: 0, zoom, new_zoom, pointer});
  test(result, {x: -width / 2, y: height / 2});
  result = calc({x: 100, y: 100, zoom, new_zoom, pointer});
  test(result, {x: -width / 2 + 100, y: height / 2 + 100});
  zoom = 100;
  new_zoom = 200;
  result = calc({x: 0, y: 0, zoom, new_zoom, pointer});
  test(result, {x: width / 2, y: -height / 2});
  result = calc({x: 100, y: 100, zoom, new_zoom, pointer});
  test(result, {x: width / 2 + 100, y: -height / 2 + 100});
  zoom = 50;
  new_zoom = 100;
  result = calc({x: 0, y: 0, zoom, new_zoom, pointer});
  test(result, {x: width, y: -height});
  result = calc({x: 100, y: 100, zoom, new_zoom, pointer});
  test(result, {x: width + 100, y: -height + 100});
  zoom = 50;
  new_zoom = 50;
  result = calc({x: 0, y: 0, zoom, new_zoom, pointer});
  test(result, {x: 0, y: 0});
  result = calc({x: 100, y: 100, zoom, new_zoom, pointer});
  test(result, {x: 100, y: 100});
}
