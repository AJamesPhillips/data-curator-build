import {h} from "../../_snowpack/pkg/preact.js";
import {connect} from "../../_snowpack/pkg/react-redux.js";
import {Canvas} from "../canvas/Canvas.js";
import {x, vertical_ordinal_to_y} from "../canvas/display.js";
import {MainArea} from "../layout/MainArea.js";
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
const get_children = (props) => {
  const elements = props.objective_nodes_props.map((p) => /* @__PURE__ */ h(ObjectiveNode, {
    ...p
  }));
  if (props.objective_nodes_props.length) {
    const {created_at, vertical_ordinal} = props.objective_nodes_props[0];
    const left = x(created_at.getTime());
    const top = vertical_ordinal_to_y(vertical_ordinal);
  }
  return elements;
};
const get_svg_upper_children = (props) => [/* @__PURE__ */ h("g", {
  className: props.one_or_more_nodes_selected ? "highlighting_connection_lines" : ""
}, props.objective_connections_props.map((p) => /* @__PURE__ */ h(ObjectiveConnnection, {
  ...p
})))];
function _ObjectivesView(props) {
  const elements = get_children(props);
  return /* @__PURE__ */ h(MainArea, {
    main_content: /* @__PURE__ */ h(Canvas, {
      svg_children: [],
      svg_upper_children: get_svg_upper_children(props)
    }, elements)
  });
}
export const ObjectivesView = connector(_ObjectivesView);
