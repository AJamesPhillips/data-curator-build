import {SCALE_BY} from "./zoom_utils.js";
export function client_to_canvas(zoom, client_xy) {
  return client_xy * (SCALE_BY / zoom);
}
export function client_to_canvas_x(x, zoom, client_x) {
  return x + client_to_canvas(zoom, client_x);
}
export function client_to_canvas_y(y, zoom, client_y) {
  return y - client_to_canvas(zoom, client_y);
}
