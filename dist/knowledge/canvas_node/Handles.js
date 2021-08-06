import {h} from "../../../snowpack/pkg/preact.js";
import "./Handles.css.proxy.js";
import {ExploreButtonHandle} from "./ExploreButtonHandle.js";
export function Handles(props) {
  return /* @__PURE__ */ h("div", {
    className: "handles"
  }, /* @__PURE__ */ h(HandleForMoving, {
    set_node_is_moving: props.set_node_is_moving
  }), /* @__PURE__ */ h(ExploreButtonHandle, {
    wcomponent_id: props.wcomponent_id,
    wcomponent_current_kv_entry: props.wcomponent_current_kv_entry,
    is_highlighted: props.is_highlighted
  }));
}
function HandleForMoving(props) {
  const {set_node_is_moving} = props;
  if (!set_node_is_moving)
    return /* @__PURE__ */ h("div", {
      className: "node_handle movement"
    }, " ");
  const handle_pointer_down = (e) => {
    e.stopPropagation();
    set_node_is_moving();
  };
  return /* @__PURE__ */ h("div", {
    className: "node_handle movement",
    onPointerDown: handle_pointer_down
  }, "✥");
}
