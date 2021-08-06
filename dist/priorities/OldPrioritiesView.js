import {h} from "../../snowpack/pkg/preact.js";
import {connect} from "../../snowpack/pkg/react-redux.js";
import {Canvas} from "../canvas/Canvas.js";
import {project_priority_y} from "../canvas/display.js";
import {MainArea} from "../layout/MainArea.js";
import {CurrentDatetimeLine} from "./CurrentDatetimeLine.js";
import {DailyActionNode} from "./old_daily_actions/DailyActionNode.js";
import {convert_daily_actions_to_nodes} from "./old_daily_actions/daily_actions_to_nodes.js";
import {get_daily_actions_meta_c} from "./old_daily_actions/get_daily_actions.js";
import {ProjectPriorityNode} from "./old_project_priorities/ProjectPriorityNode.js";
import {convert_project_priorities_to_nodes} from "./old_project_priorities/project_priorities_to_nodes.js";
const map_state = (state) => {
  const display_at_datetime_ms = state.routing.args.created_at_ms;
  const daily_actions_meta = get_daily_actions_meta_c(state);
  return {
    display_at_datetime_ms,
    project_priorities_meta: state.derived.project_priorities_meta,
    daily_actions_meta
  };
};
const connector = connect(map_state);
const get_svg_children = (props) => {
  const {priorities_by_project} = get_nodes_from_props(props);
  const project_count = Object.keys(priorities_by_project).length;
  const max_y = project_priority_y(project_count);
  return [/* @__PURE__ */ h(CurrentDatetimeLine, {
    max_y,
    display_last_n_months: 5
  })];
};
const get_children = (props) => {
  const {
    project_priority_nodes,
    daily_action_nodes
  } = get_nodes_from_props(props);
  const elements = [
    ...project_priority_nodes.map((node_props) => /* @__PURE__ */ h(ProjectPriorityNode, {
      ...node_props
    })),
    ...daily_action_nodes.map((node_props) => /* @__PURE__ */ h(DailyActionNode, {
      ...node_props
    }))
  ];
  const first_project_priority_nodes = project_priority_nodes.first();
  if (first_project_priority_nodes) {
    const {x: left, y: top} = first_project_priority_nodes;
  }
  return elements;
};
function get_nodes_from_props(props) {
  const {
    project_priorities_meta,
    display_at_datetime_ms,
    daily_actions_meta
  } = props;
  const {priorities_by_project, project_id_to_vertical_position} = project_priorities_meta;
  const project_priority_nodes = convert_project_priorities_to_nodes({
    priorities_by_project,
    display_at_datetime_ms
  });
  const daily_action_nodes = convert_daily_actions_to_nodes({
    daily_actions_meta,
    display_at_datetime_ms,
    project_id_to_vertical_position
  });
  return {
    project_priority_nodes,
    daily_action_nodes,
    priorities_by_project
  };
}
function _OldPrioritiesView(props) {
  const elements = get_children(props);
  return /* @__PURE__ */ h(MainArea, {
    main_content: /* @__PURE__ */ h(Canvas, {
      svg_children: get_svg_children(props),
      svg_upper_children: []
    }, elements)
  });
}
export const OldPrioritiesView = connector(_OldPrioritiesView);
