import {h} from "../../../_snowpack/pkg/preact.js";
import {useState} from "../../../_snowpack/pkg/preact/hooks.js";
import {connect} from "../../../_snowpack/pkg/react-redux.js";
import {ACTIONS} from "../../state/actions.js";
import {CanvasNode} from "../../canvas/CanvasNode.js";
const map_dispatch = (dispatch, own_props) => ({
  change_route: () => dispatch(ACTIONS.routing.change_route({route: "objects", item_id: own_props.id}))
});
const connector = connect(null, map_dispatch);
function _ProjectPriorityNode(props) {
  const [is_focused, set_is_focused] = useState(false);
  const {x, y, width, height, title, fields, effort, display} = props;
  const w = effort > 0 ? Math.max(width, 150) : 150;
  const percent = `${Math.round(effort * 100)}%`;
  const backgroundImage = `linear-gradient(to top, #a6eaff ${percent}, rgba(0,0,0,0) ${percent})`;
  const style_inner = {
    backgroundImage
  };
  return /* @__PURE__ */ h(CanvasNode, {
    position: {left: x, top: y, width: w, height},
    display,
    extra_css_class: is_focused ? "focused" : "",
    on_pointer_enter: () => set_is_focused(true),
    on_pointer_leave: () => set_is_focused(false),
    on_click: () => props.change_route()
  }, /* @__PURE__ */ h("div", {
    className: "node_main_content",
    style: style_inner
  }, /* @__PURE__ */ h("span", {
    title
  }, title), /* @__PURE__ */ h("hr", null), fields.map((field) => /* @__PURE__ */ h("div", null, field.name, ": ", field.value))));
}
export const ProjectPriorityNode = connector(_ProjectPriorityNode);
