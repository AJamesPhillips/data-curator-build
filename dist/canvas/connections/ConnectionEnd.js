import {h} from "../../../snowpack/pkg/preact.js";
import {rads} from "../../utils/angles.js";
import {add_vec, to_vec} from "./utils.js";
export var ConnectionEndType;
(function(ConnectionEndType2) {
  ConnectionEndType2[ConnectionEndType2["positive"] = 0] = "positive";
  ConnectionEndType2[ConnectionEndType2["negative"] = 1] = "negative";
  ConnectionEndType2[ConnectionEndType2["noop"] = 2] = "noop";
})(ConnectionEndType || (ConnectionEndType = {}));
export function ConnectionEnd(props) {
  const {type, x, y, end_angle, opacity, blur, size, is_hovered, is_highlighted} = props;
  let extra_classes = `${is_highlighted ? "highlighted" : ""} ${is_hovered ? "hovered" : ""}`;
  const style_opacity = opacity * (1 - blur / 100);
  const style = {
    fillOpacity: style_opacity
  };
  let points;
  if (type === 0) {
    points = get_connection_arrow_end(end_angle, size);
  } else if (type === 1) {
    points = get_connection_bar_end(end_angle, size);
  } else {
    style.fillOpacity = 0;
    style.strokeOpacity = style_opacity;
    points = get_connection_noop_end(end_angle);
    extra_classes += " noop_end ";
  }
  const path = points_to_path({x, y}, points);
  return /* @__PURE__ */ h("polygon", {
    className: "connection_end " + extra_classes,
    points: path,
    style
  });
}
function points_to_path(start, points) {
  const {x, y} = start;
  let path = `${x}, ${-y} `;
  points.forEach((point) => path += `${x + point.x}, ${-y - point.y} `);
  return path;
}
function get_connection_arrow_end(end_angle, size) {
  const p1 = get_arrow_end_points(end_angle, 1, size);
  const p2 = get_arrow_end_points(end_angle, -1, size);
  return [p1, p2];
}
const arrow_angle = rads._25;
function get_arrow_end_points(angle, type, size) {
  return to_vec(angle + type * arrow_angle, size);
}
const BAR_WIDTH = 12;
const BAR_HALF_WIDTH = BAR_WIDTH / 2;
export const BAR_THICKNESS = 4;
function get_connection_bar_end(end_angle, size) {
  size = size / 10;
  const p1 = to_vec(end_angle + rads._90, BAR_HALF_WIDTH * size);
  const p2 = add_vec(to_vec(end_angle, BAR_THICKNESS * size), p1);
  const p3 = add_vec(to_vec(end_angle - rads._90, BAR_WIDTH * size), p2);
  const p4 = add_vec(to_vec(end_angle - rads._180, BAR_THICKNESS * size), p3);
  return [p1, p2, p3, p4];
}
const NOOP_SIZE = 9;
export const NOOP_THICKNESS = Math.sin(rads._45) * NOOP_SIZE * 2;
function get_connection_noop_end(end_angle) {
  const p1 = to_vec(end_angle + rads._315, NOOP_SIZE);
  const p2 = add_vec(to_vec(end_angle + rads._45, NOOP_SIZE), p1);
  const p3 = add_vec(to_vec(end_angle + rads._135, NOOP_SIZE), p2);
  const p4 = add_vec(to_vec(end_angle + rads._225, NOOP_SIZE), p3);
  return [p1, p2, p3, p4];
}
