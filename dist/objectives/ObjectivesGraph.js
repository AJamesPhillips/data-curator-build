import {h} from "../../snowpack/pkg/preact.js";
import {connect} from "../../snowpack/pkg/react-redux.js";
import {Canvas} from "../canvas/Canvas.js";
import {performance_logger} from "../utils/performance.js";
import {get_objective_connections_props_c} from "./get_objective_connections.js";
import {get_objective_nodes_props_c} from "./get_objective_nodes.js";
import {ObjectiveConnnection} from "./ObjectiveConnnection.js";
import {ObjectiveNode} from "./ObjectiveNode.js";
import {objectives_data} from "./temp_data.js";
const map_state = (state) => {
  const objective_nodes_props = get_objective_nodes_props_c(objectives_data);
  const objective_connections_props = get_objective_connections_props_c(objective_nodes_props);
  const one_or_more_nodes_selected = state.objectives.selected_objective_ids.size !== 0 || state.objectives.priority_selected_objective_ids.size !== 0;
  return {
    one_or_more_nodes_selected,
    objective_nodes_props,
    objective_connections_props
  };
};
const connector = connect(map_state);
function _ObjectivesGraph(props) {
  performance_logger("ObjectivesGraph...");
  return /* @__PURE__ */ h(Canvas, {
    svg_children: props.objective_connections_props.map((p) => /* @__PURE__ */ h(ObjectiveConnnection, {
      ...p
    }))
  }, props.objective_nodes_props.map((p) => /* @__PURE__ */ h(ObjectiveNode, {
    ...p
  })));
}
export const ObjectivesGraph = connector(_ObjectivesGraph);
