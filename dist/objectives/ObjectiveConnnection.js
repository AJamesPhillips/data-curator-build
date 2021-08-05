import {h} from "../../_snowpack/pkg/preact.js";
import {connect} from "../../_snowpack/pkg/react-redux.js";
import {CanvasConnnection} from "../canvas/connections/CanvasConnnection.js";
import {get_objective_node_position} from "./get_objective_nodes.js";
const map_state = (state, own_props) => {
  const {selected_objective_ids: selected, priority_selected_objective_ids: priority} = state.objectives;
  const is_highlighted = priority.size === 0 && selected.has(own_props.from_id) || priority.has(own_props.from_id) || priority.has(own_props.to_id);
  return {
    is_highlighted
  };
};
const connector = connect(map_state);
function _ObjectiveConnnection(props) {
  const from_node_position = get_objective_node_position({
    created_at_ms: props.from_ms,
    vertical_ordinal: props.from_vertical_ordinal
  });
  const to_node_position = get_objective_node_position({
    created_at_ms: props.to_ms,
    vertical_ordinal: props.to_vertical_ordinal
  });
  return /* @__PURE__ */ h(CanvasConnnection, {
    from_node_position,
    to_node_position,
    from_connection_type: {attribute: "meta", direction: "from"},
    to_connection_type: {attribute: "meta", direction: "to"},
    is_highlighted: props.is_highlighted
  });
}
export const ObjectiveConnnection = connector(_ObjectiveConnnection);
