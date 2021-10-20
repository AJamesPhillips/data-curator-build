import {pub_sub_factory} from "../pub_sub/pub_sub_factory.js";
export const canvas_pub_sub = pub_sub_factory({
  canvas_node_drag_relative_position: canvas_node_drag_relative_position_middleware
});
let last_node_drag_position = void 0;
function canvas_node_drag_relative_position_middleware(message) {
  const continue_ = last_node_drag_position?.left !== message?.left || last_node_drag_position?.top !== message?.top;
  last_node_drag_position = message;
  return {continue: continue_, message};
}
