import {h} from "../../snowpack/pkg/preact.js";
import {useMemo} from "../../snowpack/pkg/preact/hooks.js";
import {connect} from "../../snowpack/pkg/react-redux.js";
import {Canvas} from "../canvas/Canvas.js";
import {calculate_canvas_x_for_datetime, default_time_origin_parameters} from "../knowledge_view/datetime_line.js";
import {KnowledgeGraphTimeMarkers} from "../knowledge_view/KnowledgeGraphTimeMarkers.js";
import {MainArea} from "../layout/MainArea.js";
import {get_uncertain_datetime} from "../shared/uncertainty/datetime.js";
import {SortDirection, sort_list} from "../shared/utils/sort.js";
import {get_current_composed_knowledge_view_from_state} from "../state/specialised_objects/accessors.js";
import {WComponentActionsListModal} from "./WComponentActionsListModal.js";
import {DailyActionNode} from "./DailyActionNode.js";
import {PrioritisationEntryNode} from "./PrioritisationEntryNode.js";
import {get_actions_parent_ids, prepare_args_for_actions_parent_ids} from "./utils/get_actions_parent_ids.js";
import {get_action_active_date_strs} from "./utils/get_action_active_date_ranges.js";
const map_state = (state) => {
  const kv = get_current_composed_knowledge_view_from_state(state);
  const prioritisations = kv?.prioritisations;
  const {action: all_action_ids, goal: all_goal_ids} = state.derived.wcomponent_ids_by_type;
  const composed_datetime_line_config = kv?.composed_datetime_line_config;
  return {
    prioritisations,
    time_origin_ms: composed_datetime_line_config?.time_origin_ms,
    time_origin_x: composed_datetime_line_config?.time_origin_x,
    time_scale: composed_datetime_line_config?.time_scale,
    presenting: state.display_options.consumption_formatting,
    all_action_ids,
    all_goal_ids,
    wcomponents_by_id: state.specialised_objects.wcomponents_by_id
  };
};
const connector = connect(map_state);
const get_svg_children = (props) => {
  return [];
};
function has_start_date(p) {
  return !!p.start_date;
}
const get_children = (props) => {
  const {prioritisations = [], all_action_ids, all_goal_ids, wcomponents_by_id} = props;
  const result = useMemo(() => process_prioritisations(prioritisations), [prioritisations]);
  const {
    denormalised_prioritisation_by_id,
    prioritised_goals_and_actions
  } = result;
  const date_str_to_daily_actions_map = useMemo(() => process_actions({
    all_action_ids,
    all_goal_ids,
    wcomponents_by_id,
    prioritised_goals_and_actions
  }), [all_action_ids, all_goal_ids, wcomponents_by_id, prioritised_goals_and_actions]);
  const {time_origin_ms, time_origin_x, time_scale} = default_time_origin_parameters(props);
  const elements = useMemo(() => convert_prioritised_goals_and_actions_to_nodes({
    denormalised_prioritisation_by_id,
    prioritised_goals_and_actions,
    time_origin_ms,
    time_origin_x,
    time_scale
  }), [
    denormalised_prioritisation_by_id,
    prioritised_goals_and_actions,
    time_origin_ms,
    time_origin_x,
    time_scale
  ]);
  const action_elements = useMemo(() => convert_daily_actions_to_nodes({
    date_str_to_daily_actions_map,
    time_origin_ms,
    time_origin_x,
    time_scale,
    prioritised_goals_and_actions
  }), [date_str_to_daily_actions_map, time_origin_ms, time_origin_x, time_scale, prioritised_goals_and_actions]);
  return [...elements, ...action_elements];
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
      overlay: get_overlay_children(),
      plain_background: props.presenting
    }, elements),
    extra_content: /* @__PURE__ */ h(WComponentActionsListModal, null)
  });
}
export const PrioritiesView = connector(_PrioritiesView);
const UNCATEGORISED_PRIORITY_ID = "UNCATEGORISED_PRIORITY_ID";
function process_prioritisations(prioritisations) {
  const date_now = new Date();
  let denormalised_prioritisations = prioritisations.map((prioritisation) => ({
    ...prioritisation,
    total_effort: 0,
    start_date: get_uncertain_datetime(prioritisation.datetime),
    end_date: date_now
  })).filter(has_start_date);
  denormalised_prioritisations = sort_list(denormalised_prioritisations, (p) => p.start_date.getTime(), SortDirection.ascending);
  denormalised_prioritisations.forEach((prioritisation, prioritisation_index) => {
    const next_prioritisation = denormalised_prioritisations[prioritisation_index + 1];
    prioritisation.end_date = get_uncertain_datetime(next_prioritisation?.datetime) || date_now;
  });
  let offset = 0;
  const goal_or_action_id_to_offset = {};
  const prioritised_goals_and_actions = [];
  denormalised_prioritisations.forEach((prioritisation) => {
    Object.entries(prioritisation.goals).forEach(([goal_or_action_id, prioritisation_entry]) => {
      prioritisation.total_effort += prioritisation_entry.effort;
      let offset_index = goal_or_action_id_to_offset[goal_or_action_id];
      if (offset_index === void 0) {
        offset_index = offset++;
        goal_or_action_id_to_offset[goal_or_action_id] = offset_index;
      }
      prioritised_goals_and_actions.push({
        prioritisation_id: prioritisation.id,
        goal_or_action_id,
        effort: prioritisation_entry.effort,
        offset_index
      });
    });
  });
  const denormalised_prioritisation_by_id = {};
  denormalised_prioritisations.forEach((p) => denormalised_prioritisation_by_id[p.id] = p);
  return {
    denormalised_prioritisation_by_id,
    prioritised_goals_and_actions
  };
}
function process_actions(args) {
  const {prioritised_goals_and_actions} = args;
  const prioritised_goal_or_action_ids = new Set(prioritised_goals_and_actions.map((a) => a.goal_or_action_id));
  const date_str_to_daily_actions_map = {};
  const actions_parent_ids_args = prepare_args_for_actions_parent_ids(args);
  const actions = Object.values(actions_parent_ids_args.actions_by_id);
  actions.forEach((action) => {
    const actions_parent_ids = [...get_actions_parent_ids({action, ...actions_parent_ids_args})];
    const active_date_strs = get_action_active_date_strs(action);
    active_date_strs.forEach((date_str) => {
      const daily_action = date_str_to_daily_actions_map[date_str] || {
        prioritised_goal_or_action_ids_to_action_ids_map: {}
      };
      let has_at_least_one_prioritised_parent_goal_or_action = false;
      for (let i = 0; i < actions_parent_ids.length; ++i) {
        const prioritised_entry_id = actions_parent_ids[i];
        if (prioritised_goal_or_action_ids.has(prioritised_entry_id)) {
          has_at_least_one_prioritised_parent_goal_or_action = true;
          const ids = daily_action.prioritised_goal_or_action_ids_to_action_ids_map[prioritised_entry_id] || [];
          ids.push(action.id);
          daily_action.prioritised_goal_or_action_ids_to_action_ids_map[prioritised_entry_id] = ids;
        }
      }
      if (!has_at_least_one_prioritised_parent_goal_or_action) {
        const ids = daily_action.prioritised_goal_or_action_ids_to_action_ids_map[UNCATEGORISED_PRIORITY_ID] || [];
        ids.push(action.id);
        daily_action.prioritised_goal_or_action_ids_to_action_ids_map[UNCATEGORISED_PRIORITY_ID] = ids;
      }
      date_str_to_daily_actions_map[date_str] = daily_action;
    });
  });
  return date_str_to_daily_actions_map;
}
function convert_prioritised_goals_and_actions_to_nodes(args) {
  const {
    denormalised_prioritisation_by_id,
    prioritised_goals_and_actions,
    time_origin_ms,
    time_origin_x,
    time_scale
  } = args;
  return prioritised_goals_and_actions.map(({prioritisation_id, goal_or_action_id, effort, offset_index}) => {
    const {total_effort, start_date, end_date} = denormalised_prioritisation_by_id[prioritisation_id];
    const x = calculate_canvas_x_for_datetime({
      datetime: start_date,
      time_origin_ms,
      time_origin_x,
      time_scale
    });
    const x2 = calculate_canvas_x_for_datetime({
      datetime: end_date,
      time_origin_ms,
      time_origin_x,
      time_scale
    });
    return /* @__PURE__ */ h(PrioritisationEntryNode, {
      effort: effort / total_effort,
      wcomponent_id: goal_or_action_id,
      x,
      y: 100 * offset_index,
      width: x2 - x,
      display: true
    });
  });
}
function convert_daily_actions_to_nodes(args) {
  const {time_origin_ms, time_origin_x, time_scale, prioritised_goals_and_actions} = args;
  const prioritised_goals_and_actions_by_id = {};
  prioritised_goals_and_actions.forEach((prioritised_goal_or_action) => {
    prioritised_goals_and_actions_by_id[prioritised_goal_or_action.goal_or_action_id] = prioritised_goal_or_action;
  });
  const nodes = [];
  Object.entries(args.date_str_to_daily_actions_map).forEach(([date_str, daily_action]) => {
    const date = new Date(date_str);
    const x = calculate_canvas_x_for_datetime({
      datetime: date,
      time_origin_ms,
      time_origin_x,
      time_scale
    });
    Object.entries(daily_action.prioritised_goal_or_action_ids_to_action_ids_map).forEach(([goal_or_action_id, action_ids]) => {
      const prioritised_goal_or_action = prioritised_goals_and_actions_by_id[goal_or_action_id];
      let y = -40;
      if (prioritised_goal_or_action)
        y = 100 * prioritised_goal_or_action.offset_index + 70;
      else if (goal_or_action_id !== UNCATEGORISED_PRIORITY_ID)
        return;
      nodes.push(/* @__PURE__ */ h(DailyActionNode, {
        width: 10,
        height: 10,
        display: true,
        x,
        y,
        action_ids,
        date_shown: date
      }));
    });
  });
  return nodes;
}
