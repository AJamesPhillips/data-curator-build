import {h} from "../../snowpack/pkg/preact.js";
import {connect} from "../../snowpack/pkg/react-redux.js";
import "./PrioritiesListView.css.proxy.js";
import {MainArea} from "../layout/MainArea.js";
import {wcomponent_has_objectives} from "../wcomponent/interfaces/SpecialisedObjects.js";
import {get_current_composed_knowledge_view_from_state} from "../state/specialised_objects/accessors.js";
import {create_wcomponent} from "../state/specialised_objects/wcomponents/create_wcomponent_type.js";
import {Prioritisation} from "./Prioritisation.js";
import {ACTIONS} from "../state/actions.js";
import {PrioritisableGoal} from "./PrioritisableGoal.js";
import {SortDirection, sort_list} from "../shared/utils/sort.js";
import {get_created_at_ms} from "../shared/utils_datetime/utils_datetime.js";
import {selector_chosen_base_id} from "../state/user_info/selector.js";
import {SIDE_PANEL_WIDTH} from "../side_panel/width.js";
import {Button} from "../sharedf/Button.js";
import {get_next_available_wc_map_position} from "../knowledge_view/utils/next_wc_map_position.js";
export function PrioritiesListView(props) {
  return /* @__PURE__ */ h(MainArea, {
    main_content: /* @__PURE__ */ h(PrioritiesListViewContent, null)
  });
}
const map_state = (state) => {
  const wcomponents_by_id = state.specialised_objects.wcomponents_by_id;
  const composed_knowledge_view = get_current_composed_knowledge_view_from_state(state);
  const goals_and_actions = [];
  let prioritisations = void 0;
  let selected_prioritisation = void 0;
  if (composed_knowledge_view) {
    composed_knowledge_view.wc_ids_by_type.has_objectives.forEach((id) => {
      const goal_or_action = wcomponents_by_id[id];
      if (!wcomponent_has_objectives(goal_or_action, id))
        return;
      goals_and_actions.push(goal_or_action);
    });
    prioritisations = composed_knowledge_view.prioritisations;
    const {item_id} = state.routing;
    selected_prioritisation = prioritisations.find(({id}) => id === item_id);
    Object.keys(selected_prioritisation?.goals || {}).forEach((id) => {
      if (composed_knowledge_view.wc_ids_by_type.has_objectives.has(id))
        return;
      const goal_or_action = wcomponents_by_id[id];
      if (!wcomponent_has_objectives(goal_or_action, id))
        return;
      goals_and_actions.push(goal_or_action);
    });
  }
  return {
    composed_knowledge_view,
    goals_and_actions,
    prioritisations,
    selected_prioritisation,
    base_id: selector_chosen_base_id(state),
    wcomponents_by_id,
    display_side_panel: state.controls.display_side_panel
  };
};
const map_dispatch = {
  upsert_wcomponent: ACTIONS.specialised_object.upsert_wcomponent
};
const connector = connect(map_state, map_dispatch);
function _PrioritiesListViewContent(props) {
  const {
    goals_and_actions,
    prioritisations,
    composed_knowledge_view,
    selected_prioritisation,
    base_id,
    wcomponents_by_id
  } = props;
  const knowledge_view_id = composed_knowledge_view?.id;
  const composed_wc_id_map = composed_knowledge_view?.composed_wc_id_map || {};
  const selected_goal_prioritisation_attributes = selected_prioritisation && selected_prioritisation.goals;
  const {potential_goals, prioritised_goals, deprioritised_goals} = partition_and_sort_goals(goals_and_actions, selected_goal_prioritisation_attributes);
  if (base_id === void 0)
    return /* @__PURE__ */ h("div", null, "No base id chosen");
  return /* @__PURE__ */ h("div", {
    className: "priorities_list_view_content"
  }, /* @__PURE__ */ h("div", {
    className: "priorities_list goals"
  }, /* @__PURE__ */ h("h1", null, "Potential"), potential_goals.map((goal) => /* @__PURE__ */ h(PrioritisableGoal, {
    key: goal.id,
    goal,
    selected_prioritisation
  })), /* @__PURE__ */ h("h1", null, "Deprioritised"), deprioritised_goals.map((goal) => /* @__PURE__ */ h(PrioritisableGoal, {
    key: goal.id,
    goal,
    selected_prioritisation
  }))), /* @__PURE__ */ h("div", {
    className: "priorities_list goals"
  }, /* @__PURE__ */ h("h1", null, "Prioritised"), prioritised_goals.map((goal) => /* @__PURE__ */ h(PrioritisableGoal, {
    key: goal.id,
    goal,
    selected_prioritisation
  }))), /* @__PURE__ */ h("div", {
    className: "priorities_list prioritisations"
  }, /* @__PURE__ */ h("h1", null, "Prioritisations", knowledge_view_id && /* @__PURE__ */ h("span", {
    className: "button_add_new"
  }, " ", /* @__PURE__ */ h(Button, {
    fullWidth: false,
    onClick: (e) => {
      const most_recent_prioritisation_id = (prioritisations || [])[0]?.id || "";
      const next_prioritisation_position = get_next_available_wc_map_position(composed_wc_id_map, most_recent_prioritisation_id, wcomponents_by_id) || {left: 0, top: 0};
      create_wcomponent({
        wcomponent: {
          base_id,
          type: "prioritisation",
          goals: selected_goal_prioritisation_attributes || {}
        },
        add_to_knowledge_view: {
          id: knowledge_view_id,
          position: next_prioritisation_position
        }
      });
    }
  }, selected_goal_prioritisation_attributes ? "Copy" : "Add"))), /* @__PURE__ */ h("div", {
    className: "prioritisations_list"
  }, (prioritisations || []).map((p) => /* @__PURE__ */ h(Prioritisation, {
    prioritisation: p
  })))), /* @__PURE__ */ h("div", {
    className: "side_panel_padding",
    style: {minWidth: props.display_side_panel ? SIDE_PANEL_WIDTH : 0}
  }));
}
const PrioritiesListViewContent = connector(_PrioritiesListViewContent);
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
  potential_goals = sort_list(potential_goals, get_created_at_ms, SortDirection.descending);
  prioritised_goals = sort_list(prioritised_goals, factory_get_effort(goal_prioritisation_attributes), SortDirection.descending);
  deprioritised_goals = sort_list(deprioritised_goals, get_created_at_ms, SortDirection.descending);
  return {potential_goals, prioritised_goals, deprioritised_goals};
}
function factory_get_effort(goal_prioritisation_attributes) {
  return (goal) => (goal_prioritisation_attributes || {})[goal.id]?.effort || 0;
}
