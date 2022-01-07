import {min_throttle} from "../../utils/throttle.js";
import {pub_sub_factory} from "../pub_sub/pub_sub_factory.js";
export const canvas_pub_sub = pub_sub_factory({
  canvas_node_drag_relative_position: canvas_node_drag_relative_position_middleware
});
let last_node_drag_position = void 0;
function canvas_node_drag_relative_position_middleware(message) {
  const continue_ = last_node_drag_position?.left !== message.left || last_node_drag_position?.top !== message.top;
  last_node_drag_position = message;
  return {continue: continue_, message};
}
function handle_canvas_node_drag_relative_position(new_relative_position) {
  canvas_pub_sub.pub("throttled_canvas_node_drag_relative_position", new_relative_position);
}
const throttled_handle_canvas_node_drag_relative_position = min_throttle(handle_canvas_node_drag_relative_position, 30);
canvas_pub_sub.sub("canvas_node_drag_relative_position", throttled_handle_canvas_node_drag_relative_position.throttled);
