export const grid_small_step = 20;
export const h_step = grid_small_step * 18;
export const v_step = grid_small_step * 8;
export function round_number(num, round_to) {
  return Math.round(num / round_to) * round_to;
}
export function round_coordinate_small_step(num) {
  return round_number(num, grid_small_step);
}
export function position_to_point(position) {
  return {left: position.x, top: -position.y};
}
export function round_canvas_point(point, step = "small") {
  if (step === "small") {
    return {left: round_coordinate_small_step(point.left), top: round_coordinate_small_step(point.top)};
  } else {
    return {left: round_number(point.left, h_step), top: round_number(point.top, v_step)};
  }
}
export const NODE_WIDTH = 250;
export const node_height_approx = (has_image = false) => has_image ? 120 : 59;
const half_node_width = NODE_WIDTH / 2;
const half_node_height = (has_image) => node_height_approx(has_image) / 2;
export function offset_input_by_half_node(point) {
  return {left: point.left - half_node_width, top: point.top - half_node_height(false)};
}
export function offset_entry_by_half_node(kv_entry, has_image) {
  const s = kv_entry.s ?? 1;
  const left = kv_entry.left + s * half_node_width;
  const top = kv_entry.top + s * half_node_height(has_image);
  return {left, top};
}
export function distance_between_kv_entries(position, other_position) {
  return square_distance_between_kv_entries(position, other_position) ** 0.5;
}
export function square_distance_between_kv_entries(position, other_position) {
  if (!position || !other_position)
    return Number.POSITIVE_INFINITY;
  return (position.left - other_position.left) ** 2 + (position.top - other_position.top) ** 2;
}
