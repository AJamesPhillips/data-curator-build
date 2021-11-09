import {h} from "../../snowpack/pkg/preact.js";
import {useEffect, useState} from "../../snowpack/pkg/preact/hooks.js";
import {connect} from "../../snowpack/pkg/react-redux.js";
import {ACTIONS} from "../state/actions.js";
import {pub_sub} from "../state/pub_sub/pub_sub.js";
import {WComponentCanvasNode} from "../wcomponent_canvas/node/WComponentCanvasNode.js";
const map_state = (state) => ({
  wcomponent_ids_to_move_list: state.meta_wcomponents.wcomponent_ids_to_move_list
});
const map_dispatch = {
  bulk_edit_knowledge_view_entries: ACTIONS.specialised_object.bulk_edit_knowledge_view_entries,
  set_wcomponent_ids_to_move: ACTIONS.specialised_object.set_wcomponent_ids_to_move
};
const connector = connect(map_state, map_dispatch);
function _TemporaryDraggedCanvasNodes(props) {
  const [relative_position, set_relative_position] = useState(void 0);
  useEffect(() => {
    function handle_canvas_node_drag_relative_position(new_relative_position) {
      if (relative_position && new_relative_position === void 0) {
        props.bulk_edit_knowledge_view_entries({
          wcomponent_ids: props.wcomponent_ids_to_move_list,
          change_left: relative_position.left,
          change_top: relative_position.top
        });
      }
      set_relative_position(new_relative_position);
    }
    const unsubscribe_position = pub_sub.canvas.sub("throttled_canvas_node_drag_relative_position", handle_canvas_node_drag_relative_position);
    return () => unsubscribe_position();
  });
  useEffect(() => {
    if (relative_position !== void 0)
      return;
    if (props.wcomponent_ids_to_move_list.length === 0)
      return;
    props.set_wcomponent_ids_to_move({wcomponent_ids_to_move: new Set()});
  }, [relative_position]);
  if (!relative_position)
    return null;
  return /* @__PURE__ */ h("div", null, props.wcomponent_ids_to_move_list.map((wcomponent_id) => /* @__PURE__ */ h(WComponentCanvasNode, {
    key: `temporary_dragged_canvas_node_${wcomponent_id}`,
    id: wcomponent_id,
    drag_relative_position: relative_position
  })));
}
export const TemporaryDraggedCanvasNodes = connector(_TemporaryDraggedCanvasNodes);
