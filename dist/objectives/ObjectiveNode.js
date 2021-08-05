import {h} from "../../_snowpack/pkg/preact.js";
import {connect} from "../../_snowpack/pkg/react-redux.js";
import {ConnectableCanvasNode} from "../canvas/ConnectableCanvasNode.js";
import {COLOURS} from "../canvas/display.js";
import {ACTIONS} from "../state/actions.js";
import {get_objective_node_position} from "./get_objective_nodes.js";
const map_state = (state, own_props) => ({
  is_selected: state.objectives.selected_objective_ids.has(own_props.id),
  is_priority_selected: state.objectives.priority_selected_objective_ids.has(own_props.id),
  ctrl_key_is_down: state.global_keys.keys_down.has("Control")
});
const map_dispatch = {
  select_objectives: ACTIONS.objectives.select_objectives,
  add_to_selected_objectives: ACTIONS.objectives.add_to_selected_objectives,
  remove_from_selected_objectives: ACTIONS.objectives.remove_from_selected_objectives,
  select_priority_objectives: ACTIONS.objectives.select_priority_objectives
};
const connector = connect(map_state, map_dispatch);
function get_colour(type) {
  if (type === "value")
    return COLOURS.green;
  if (type === "process")
    return COLOURS.yellow;
  if (type === "state")
    return COLOURS.blue;
  if (type === "event")
    return COLOURS.red;
  return COLOURS.white;
}
function _ObjectiveNode(props) {
  const on_click = () => {
    if (props.is_selected) {
      if (props.ctrl_key_is_down)
        props.remove_from_selected_objectives([props.id]);
      else
        props.select_objectives([]);
    } else {
      if (props.ctrl_key_is_down)
        props.add_to_selected_objectives([props.id]);
      else
        props.select_objectives([props.id]);
    }
  };
  return /* @__PURE__ */ h(ConnectableCanvasNode, {
    position: get_objective_node_position(props),
    node_main_content: /* @__PURE__ */ h("div", null, /* @__PURE__ */ h("div", null, props.type), /* @__PURE__ */ h("b", null, props.title)),
    unlimited_width: props.is_selected || props.is_priority_selected,
    glow: (props.is_selected || props.is_priority_selected) && "blue",
    color: get_colour(props.type),
    on_click,
    on_pointer_enter: () => props.select_priority_objectives([props.id]),
    on_pointer_leave: () => props.select_priority_objectives([]),
    terminals
  });
}
export const ObjectiveNode = connector(_ObjectiveNode);
const terminals = [
  {type: {attribute: "meta", direction: "to"}, style: {}, label: ""},
  {type: {attribute: "meta", direction: "from"}, style: {}, label: ""}
];
