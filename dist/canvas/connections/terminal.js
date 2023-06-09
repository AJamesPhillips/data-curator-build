import {NODE_WIDTH} from "../position_utils.js";
const connection_diameter = 12;
export const connection_radius = connection_diameter / 2;
const connection_left = -6;
const connection_top = 27;
let connection_top_increment = 22;
try {
  if (navigator.platform.indexOf("Win") > -1)
    connection_top_increment = 17;
} catch (e) {
}
const attribute_type_to_ordinal = {
  meta: 0,
  validity: 1,
  state: 2
};
export function get_top_left_for_terminal_type(type, node_scale = 1) {
  const ordinal = attribute_type_to_ordinal[type.attribute];
  const top_offset_node_scale_fudge = node_scale ** 1.14;
  const top_offset = (connection_top + ordinal * connection_top_increment) * top_offset_node_scale_fudge;
  const left_offset = connection_left + (type.direction === "from" ? NODE_WIDTH : 0) * node_scale;
  return {left: left_offset, top: top_offset};
}
export function get_connection_point(objective_node_position, type) {
  const node_scale = objective_node_position.s || 1;
  let {left, top} = get_top_left_for_terminal_type(type, node_scale);
  left += objective_node_position.left + connection_radius;
  top += objective_node_position.top + connection_radius;
  return {left, top};
}
