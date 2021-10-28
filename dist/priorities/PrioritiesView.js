import {h} from "../../snowpack/pkg/preact.js";
import {connect} from "../../snowpack/pkg/react-redux.js";
import {Canvas} from "../canvas/Canvas.js";
import {round_coordinate_small_step} from "../canvas/position_utils.js";
import {calculate_canvas_x_for_datetime, default_time_origin_parameters} from "../knowledge_view/datetime_line.js";
import {KnowledgeGraphTimeMarkers} from "../knowledge_view/KnowledgeGraphTimeMarkers.js";
import {MainArea} from "../layout/MainArea.js";
import {get_uncertain_datetime} from "../shared/uncertainty/datetime.js";
import {sort_list} from "../shared/utils/sort.js";
import {get_created_at_ms} from "../shared/utils_datetime/utils_datetime.js";
import {get_current_composed_knowledge_view_from_state} from "../state/specialised_objects/accessors.js";
import {ProjectPriorityNode} from "./old_project_priorities/ProjectPriorityNode.js";
const map_state = (state) => {
  const kv = get_current_composed_knowledge_view_from_state(state);
  const prioritisations = kv?.prioritisations;
  const composed_datetime_line_config = kv?.composed_datetime_line_config;
  return {
    prioritisations,
    time_origin_ms: composed_datetime_line_config?.time_origin_ms,
    time_origin_x: composed_datetime_line_config?.time_origin_x,
    time_scale: composed_datetime_line_config?.time_scale
  };
};
const connector = connect(map_state);
const get_svg_children = (props) => {
  return [];
};
const get_children = (props) => {
  let {prioritisations = []} = props;
  prioritisations = sort_list(prioritisations, (p) => get_created_at_ms(p), "ascending").filter((p) => !!get_uncertain_datetime(p.datetime));
  let offset = 0;
  const goal_or_action_id_to_offset = {};
  const prioritised_goal_or_action_data = [];
  const prioritisation_data_by_id = {};
  prioritisations.forEach((prioritisation, prioritisation_index) => {
    const start_date = get_uncertain_datetime(prioritisation.datetime);
    if (!start_date)
      return;
    let total_effort = 0;
    Object.entries(prioritisation.goals).forEach(([goal_or_action_id, prioritisation_entry]) => {
      total_effort += prioritisation_entry.effort;
      prioritised_goal_or_action_data.push({
        prioritisation_id: prioritisation.id,
        goal_or_action_id,
        effort: prioritisation_entry.effort
      });
      if (goal_or_action_id_to_offset[goal_or_action_id] !== void 0)
        return;
      goal_or_action_id_to_offset[goal_or_action_id] = offset++;
    });
    const next_prioritisation = prioritisations[prioritisation_index + 1];
    const end_date = get_uncertain_datetime(next_prioritisation?.datetime) || new Date();
    prioritisation_data_by_id[prioritisation.id] = {
      total_effort,
      start_date,
      end_date
    };
  });
  const {time_origin_ms, time_origin_x, time_scale} = default_time_origin_parameters(props);
  const elements = prioritised_goal_or_action_data.map(({prioritisation_id, goal_or_action_id, effort}) => {
    const offset2 = goal_or_action_id_to_offset[goal_or_action_id] || 0;
    const {total_effort, start_date, end_date} = prioritisation_data_by_id[prioritisation_id];
    const x = round_coordinate_small_step(calculate_canvas_x_for_datetime({
      datetime: start_date,
      time_origin_ms,
      time_origin_x,
      time_scale
    }));
    const x2 = round_coordinate_small_step(calculate_canvas_x_for_datetime({
      datetime: end_date,
      time_origin_ms,
      time_origin_x,
      time_scale
    }));
    return /* @__PURE__ */ h(ProjectPriorityNode, {
      effort: effort / total_effort,
      wcomponent_id: goal_or_action_id,
      x,
      y: 100 * offset2,
      width: x2 - x,
      height: 100,
      display: true
    });
  });
  return elements;
};
const get_overlay_children = () => {
  return /* @__PURE__ */ h(KnowledgeGraphTimeMarkers, {
    force_display: true,
    show_by_now: true
  });
};
function _PrioritiesView(props) {
  const elements = get_children(props);
  return /* @__PURE__ */ h(MainArea, {
    main_content: /* @__PURE__ */ h(Canvas, {
      svg_children: get_svg_children(props),
      svg_upper_children: [],
      overlay: get_overlay_children()
    }, elements)
  });
}
export const PrioritiesView = connector(_PrioritiesView);
