import {h} from "../../../snowpack/pkg/preact.js";
import "./Handles.css.proxy.js";
import {ExploreButtonHandle} from "./ExploreButtonHandle.js";
import {OverlappingNodesHandle} from "./OverlappingNodesHandle.js";
export function Handles(props) {
  return /* @__PURE__ */ h("div", {
    className: "handles"
  }, /* @__PURE__ */ h(HandleForMoving, {
    show_move_handle: props.show_move_handle,
    user_requested_node_move: props.user_requested_node_move
  }), /* @__PURE__ */ h(ExploreButtonHandle, {
    wcomponent_id: props.wcomponent_id,
    wcomponent_current_kv_entry: props.wcomponent_current_kv_entry,
    is_highlighted: props.is_highlighted
  }), /* @__PURE__ */ h(OverlappingNodesHandle, {
    wcomponent_id: props.wcomponent_id
  }));
}
function HandleForMoving(props) {
  const {show_move_handle, user_requested_node_move} = props;
  if (!show_move_handle)
    return /* @__PURE__ */ h("div", {
      className: "node_handle movement"
    }, " ");
  const handle_pointer_down = (e) => {
    e.stopPropagation();
    user_requested_node_move();
  };
  return /* @__PURE__ */ h("div", {
    className: "node_handle movement",
    onPointerDown: handle_pointer_down
  }, "✥");
}
