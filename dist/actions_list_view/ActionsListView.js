import {h} from "../../snowpack/pkg/preact.js";
import {connect} from "../../snowpack/pkg/react-redux.js";
import "./ActionsListView.css.proxy.js";
import {MainArea} from "../layout/MainArea.js";
import {wcomponent_is_action} from "../wcomponent/interfaces/SpecialisedObjects.js";
import {get_current_composed_knowledge_view_from_state} from "../state/specialised_objects/accessors.js";
import {ACTIONS} from "../state/actions.js";
import {PrioritisableAction} from "./PrioritisableAction.js";
import {sort_list} from "../shared/utils/sort.js";
import {get_created_at_ms} from "../shared/utils_datetime/utils_datetime.js";
import {selector_chosen_base_id} from "../state/user_info/selector.js";
import {get_wcomponent_state_value_and_probabilities} from "../wcomponent_derived/get_wcomponent_state_value.js";
import {VALUE_POSSIBILITY_IDS} from "../wcomponent/value/parse_value.js";
export function ActionsListView(props) {
  return /* @__PURE__ */ h(MainArea, {
    main_content: /* @__PURE__ */ h(ActionsListViewContent, null)
  });
}
const map_state = (state) => {
  const wcomponents_by_id = state.specialised_objects.wcomponents_by_id;
  let filtered_by_knowledge_view_id = "";
  const filter_by_knowledge_view = false;
  let action_ids = void 0;
  if (filter_by_knowledge_view) {
    const knowledge_view = get_current_composed_knowledge_view_from_state(state);
    if (knowledge_view) {
      filtered_by_knowledge_view_id = knowledge_view.id;
      action_ids = knowledge_view.wc_ids_by_type.action;
    }
  } else
    action_ids = state.derived.wcomponent_ids_by_type.action;
  return {
    filtered_by_knowledge_view_id,
    action_ids,
    wcomponents_by_id,
    editing: !state.display_options.consumption_formatting,
    base_id: selector_chosen_base_id(state)
  };
};
const map_dispatch = {
  upsert_wcomponent: ACTIONS.specialised_object.upsert_wcomponent
};
const connector = connect(map_state, map_dispatch);
function _ActionsListViewContent(props) {
  const {action_ids, wcomponents_by_id, editing, base_id} = props;
  if (base_id === void 0)
    return /* @__PURE__ */ h("div", null, "No base id chosen");
  if (action_ids === void 0)
    return /* @__PURE__ */ h("div", null, "No actions");
  const actions_icebox = [];
  const actions_todo = [];
  const actions_in_progress = [];
  const actions_done_or_rejected = [];
  const now = new Date().getTime();
  let actions = Array.from(action_ids).map((id) => wcomponents_by_id[id]).filter(wcomponent_is_action);
  actions = sort_list(actions, (a) => get_created_at_ms(a), "descending");
  actions.forEach((action) => {
    const attribute_values = get_wcomponent_state_value_and_probabilities({
      wcomponent: action,
      VAP_set_id_to_counterfactual_v2_map: {},
      created_at_ms: now,
      sim_ms: now
    });
    const most_probable = attribute_values.most_probable_VAP_set_values[0];
    if (most_probable?.value_id === VALUE_POSSIBILITY_IDS.action_in_progress)
      actions_in_progress.push(action);
    else if (most_probable?.value_id === VALUE_POSSIBILITY_IDS.action_completed || most_probable?.value_id === VALUE_POSSIBILITY_IDS.action_rejected || most_probable?.value_id === VALUE_POSSIBILITY_IDS.action_failed)
      actions_done_or_rejected.push(action);
    else
      actions_icebox.push(action);
  });
  return /* @__PURE__ */ h("div", {
    className: "action_list_view_content"
  }, /* @__PURE__ */ h("div", {
    className: "icebox"
  }, /* @__PURE__ */ h("h1", null, "Icebox"), actions_icebox.map((action) => /* @__PURE__ */ h(PrioritisableAction, {
    key: action.id,
    action
  }))), /* @__PURE__ */ h("div", {
    className: "todo"
  }, /* @__PURE__ */ h("div", {
    className: "prioritisations_header"
  }, /* @__PURE__ */ h("h1", null, "Todo")), actions_todo.map((action) => /* @__PURE__ */ h(PrioritisableAction, {
    key: action.id,
    action
  }))), /* @__PURE__ */ h("div", {
    className: "in_progress"
  }, /* @__PURE__ */ h("div", {
    className: "prioritisations_header"
  }, /* @__PURE__ */ h("h1", null, "In progress")), actions_in_progress.map((action) => /* @__PURE__ */ h(PrioritisableAction, {
    key: action.id,
    action
  }))), /* @__PURE__ */ h("div", {
    className: "done_or_rejected"
  }, /* @__PURE__ */ h("div", {
    className: "prioritisations_header"
  }, /* @__PURE__ */ h("h1", null, "Done")), actions_done_or_rejected.map((action) => /* @__PURE__ */ h(PrioritisableAction, {
    key: action.id,
    action
  }))));
}
const ActionsListViewContent = connector(_ActionsListViewContent);
function partition_and_sort_goals(goals, goal_prioritisation_attributes) {
  let potential_goals = [];
  let prioritised_goals = [];
  let deprioritised_goals = [];
  if (!goal_prioritisation_attributes) {
    potential_goals = goals;
  } else {
    goals.forEach((goal) => {
      const goal_prioritisation_attribute = goal_prioritisation_attributes[goal.id];
      if (!goal_prioritisation_attribute)
        potential_goals.push(goal);
      else if (goal_prioritisation_attribute.effort > 0)
        prioritised_goals.push(goal);
      else
        deprioritised_goals.push(goal);
    });
  }
  potential_goals = sort_list(potential_goals, get_created_at_ms, "descending");
  prioritised_goals = sort_list(prioritised_goals, factory_get_effort(goal_prioritisation_attributes), "descending");
  deprioritised_goals = sort_list(deprioritised_goals, get_created_at_ms, "descending");
  return {potential_goals, prioritised_goals, deprioritised_goals};
}
function factory_get_effort(goal_prioritisation_attributes) {
  return (goal) => (goal_prioritisation_attributes || {})[goal.id]?.effort || 0;
}
