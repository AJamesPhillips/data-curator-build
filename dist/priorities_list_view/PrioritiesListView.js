import {h} from "../../_snowpack/pkg/preact.js";
import {connect} from "../../_snowpack/pkg/react-redux.js";
import "./PrioritiesListView.css.proxy.js";
import {MainArea} from "../layout/MainArea.js";
import {
  alert_wcomponent_is_goal
} from "../shared/wcomponent/interfaces/SpecialisedObjects.js";
import {get_current_composed_knowledge_view_from_state} from "../state/specialised_objects/accessors.js";
import {ListHeaderAddButton} from "../form/editable_list/ListHeaderAddButton.js";
import {create_wcomponent} from "../knowledge/create_wcomponent_type.js";
import {Prioritisation} from "./Prioritisation.js";
import {ACTIONS} from "../state/actions.js";
import {PrioritisableGoal} from "./PrioritisableGoal.js";
import {sort_list} from "../shared/utils/sort.js";
import {get_created_at_ms} from "../shared/wcomponent/utils_datetime.js";
export function PrioritiesListView(props) {
  return /* @__PURE__ */ h(MainArea, {
    main_content: /* @__PURE__ */ h(PrioritiesListViewContent, null)
  });
}
const map_state = (state) => {
  const wcomponents_by_id = state.specialised_objects.wcomponents_by_id;
  const knowledge_view = get_current_composed_knowledge_view_from_state(state);
  const goals = [];
  let prioritisations = [];
  let selected_prioritisation = void 0;
  if (knowledge_view) {
    prioritisations = knowledge_view.prioritisations;
    const {item_id} = state.routing;
    selected_prioritisation = prioritisations.find(({id}) => id === item_id);
    knowledge_view.wc_ids_by_type.goal.forEach((id) => {
      const goal = wcomponents_by_id[id];
      if (!alert_wcomponent_is_goal(goal, id))
        return;
      goals.push(goal);
    });
    if (selected_prioritisation) {
      Object.keys(selected_prioritisation.goals).forEach((id) => {
        if (knowledge_view.wc_ids_by_type.goal.has(id))
          return;
        const goal = wcomponents_by_id[id];
        if (!alert_wcomponent_is_goal(goal, id))
          return;
        goals.push(goal);
      });
    }
  }
  return {
    knowledge_view_id: knowledge_view && knowledge_view.id,
    goals,
    prioritisations,
    editing: !state.display_options.consumption_formatting,
    creation_context: state.creation_context,
    selected_prioritisation
  };
};
const map_dispatch = {
  upsert_wcomponent: ACTIONS.specialised_object.upsert_wcomponent
};
const connector = connect(map_state, map_dispatch);
function _PrioritiesListViewContent(props) {
  const {goals, prioritisations, editing, knowledge_view_id, selected_prioritisation} = props;
  const goal_prioritisation_attributes = selected_prioritisation && selected_prioritisation.goals;
  const {potential_goals, prioritised_goals, deprioritised_goals} = partition_and_sort_goals(goals, goal_prioritisation_attributes);
  return /* @__PURE__ */ h("div", {
    className: "priorities_list_view_content"
  }, /* @__PURE__ */ h("div", {
    className: "goals"
  }, /* @__PURE__ */ h("h1", null, "Potential"), potential_goals.map((goal) => /* @__PURE__ */ h(PrioritisableGoal, {
    goal,
    selected_prioritisation
  })), /* @__PURE__ */ h("h1", null, "Prioritised"), prioritised_goals.map((goal) => /* @__PURE__ */ h(PrioritisableGoal, {
    goal,
    selected_prioritisation
  })), /* @__PURE__ */ h("h1", null, "Deprioritised"), deprioritised_goals.map((goal) => /* @__PURE__ */ h(PrioritisableGoal, {
    goal,
    selected_prioritisation
  }))), /* @__PURE__ */ h("div", {
    className: "prioritisations"
  }, /* @__PURE__ */ h("div", {
    className: "prioritisations_header"
  }, /* @__PURE__ */ h("h1", null, "Prioritisations"), editing && knowledge_view_id && /* @__PURE__ */ h(ListHeaderAddButton, {
    new_item_descriptor: "Prioritisation",
    on_pointer_down_new_list_entry: () => {
      create_wcomponent({
        wcomponent: {type: "prioritisation", goals: goal_prioritisation_attributes || {}},
        creation_context: props.creation_context,
        add_to_knowledge_view: {
          id: knowledge_view_id,
          position: {left: 0, top: 0}
        }
      });
    }
  })), prioritisations.map((p) => /* @__PURE__ */ h(Prioritisation, {
    prioritisation: p
  }))));
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
  potential_goals = sort_list(potential_goals, get_created_at_ms, "descending");
  prioritised_goals = sort_list(prioritised_goals, factory_get_effort(goal_prioritisation_attributes), "descending");
  deprioritised_goals = sort_list(deprioritised_goals, get_created_at_ms, "descending");
  return {potential_goals, prioritised_goals, deprioritised_goals};
}
function factory_get_effort(goal_prioritisation_attributes) {
  return (goal) => (goal_prioritisation_attributes || {})[goal.id]?.effort || 0;
}
