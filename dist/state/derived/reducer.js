import {project_priorities_derived_reducer} from "../../priorities/old_project_priorities/project_priorities_derived_reducer.js";
import {wcomponent_is_goal, wcomponent_is_judgement_or_objective} from "../../wcomponent/interfaces/SpecialisedObjects.js";
import {is_defined} from "../../shared/utils/is_defined.js";
import {sort_list} from "../../shared/utils/sort.js";
import {update_substate} from "../../utils/update_state.js";
import {knowledge_views_derived_reducer} from "../specialised_objects/knowledge_views/knowledge_views_derived_reducer.js";
import {get_wcomponent_ids_by_type} from "./get_wcomponent_ids_by_type.js";
import {get_wcomponents_from_state} from "../specialised_objects/accessors.js";
import {get_wcomponent_validity_value} from "../../wcomponent_derived/get_wcomponent_validity_value.js";
export function derived_state_reducer(initial_state, state) {
  if (initial_state.specialised_objects.perceptions_by_id !== state.specialised_objects.perceptions_by_id) {
    const perceptions = sort_list(Object.values(state.specialised_objects.perceptions_by_id), ({created_at}) => created_at.getTime(), "ascending");
    state = update_substate(state, "derived", "perceptions", perceptions);
  }
  if (initial_state.specialised_objects.wcomponents_by_id !== state.specialised_objects.wcomponents_by_id) {
    const wcomponents = sort_list(Object.values(state.specialised_objects.wcomponents_by_id), ({created_at}) => created_at.getTime(), "ascending");
    state = update_substate(state, "derived", "wcomponents", wcomponents);
    const ids = Object.keys(state.specialised_objects.wcomponents_by_id);
    const wcomponent_ids_by_type = get_wcomponent_ids_by_type(state.specialised_objects.wcomponents_by_id, ids);
    state = update_substate(state, "derived", "wcomponent_ids_by_type", wcomponent_ids_by_type);
    const judgement_or_objectives = get_judgement_or_objectives(state, state.derived.wcomponent_ids_by_type.judgement_or_objective);
    const judgement_or_objective_ids_by_target_id = update_judgement_or_objective_ids_by_target_id(judgement_or_objectives);
    state = update_substate(state, "derived", "judgement_or_objective_ids_by_target_id", judgement_or_objective_ids_by_target_id);
    const goals = get_wcomponents_from_state(state, state.derived.wcomponent_ids_by_type.goal).filter(is_defined).filter(wcomponent_is_goal);
    const judgement_or_objective_ids_by_goal_or_action_id = update_judgement_or_objective_ids_by_goal_or_action_id(goals);
    state = update_substate(state, "derived", "judgement_or_objective_ids_by_goal_or_action_id", judgement_or_objective_ids_by_goal_or_action_id);
  }
  state = knowledge_views_derived_reducer(initial_state, state);
  state = conditionally_update_active_judgement_or_objective_ids(initial_state, state);
  state = project_priorities_derived_reducer(initial_state, state);
  return state;
}
function get_judgement_or_objectives(state, judgement_or_objective_ids) {
  const judgement_or_objectives = get_wcomponents_from_state(state, judgement_or_objective_ids).filter(is_defined).filter(wcomponent_is_judgement_or_objective);
  return judgement_or_objectives;
}
function update_judgement_or_objective_ids_by_target_id(judgement_or_objectives) {
  const judgement_or_objective_ids_by_target_id = {};
  judgement_or_objectives.forEach((judgement) => {
    const target_id = judgement.judgement_target_wcomponent_id;
    if (!target_id)
      return;
    const judgement_or_objective_ids = judgement_or_objective_ids_by_target_id[target_id] || [];
    judgement_or_objective_ids.push(judgement.id);
    judgement_or_objective_ids_by_target_id[target_id] = judgement_or_objective_ids;
  });
  return judgement_or_objective_ids_by_target_id;
}
function update_judgement_or_objective_ids_by_goal_or_action_id(goals_and_actions) {
  const judgement_or_objective_ids_by_goal_or_action_id = {};
  goals_and_actions.forEach(({id: goal_or_action_id, objective_ids}) => {
    judgement_or_objective_ids_by_goal_or_action_id[goal_or_action_id] = objective_ids || [];
  });
  return judgement_or_objective_ids_by_goal_or_action_id;
}
function conditionally_update_active_judgement_or_objective_ids(initial_state, state) {
  let {current_composed_knowledge_view} = state.derived;
  const kv_id_changed = initial_state.derived.current_composed_knowledge_view?.id !== current_composed_knowledge_view?.id;
  const judgement_or_objective_ids_by_target_id_changed = initial_state.derived.judgement_or_objective_ids_by_target_id !== state.derived.judgement_or_objective_ids_by_target_id;
  const {created_at_ms, sim_ms} = state.routing.args;
  const created_at_ms_changed = initial_state.routing.args.created_at_ms !== created_at_ms;
  const sim_ms_changed = initial_state.routing.args.sim_ms !== sim_ms;
  if (current_composed_knowledge_view && (kv_id_changed || judgement_or_objective_ids_by_target_id_changed || created_at_ms_changed || sim_ms_changed)) {
    let judgement_or_objective_id_is_active = function(id) {
      return active_judgement_or_objectives_by_id[id];
    };
    const active_judgement_or_objective_ids_by_target_id = {};
    const active_judgement_or_objective_ids_by_goal_or_action_id = {};
    const {wc_ids_by_type, composed_visible_wc_id_map} = current_composed_knowledge_view;
    const judgement_or_objectives = get_judgement_or_objectives(state, wc_ids_by_type.judgement_or_objective);
    const active_judgement_or_objectives_by_id = {};
    judgement_or_objectives.forEach((judgement) => {
      if (!composed_visible_wc_id_map[judgement.id])
        return;
      const {is_valid} = get_wcomponent_validity_value({wcomponent: judgement, created_at_ms, sim_ms});
      if (!is_valid)
        return;
      active_judgement_or_objectives_by_id[judgement.id] = true;
    });
    const {
      judgement_or_objective_ids_by_target_id,
      judgement_or_objective_ids_by_goal_or_action_id
    } = state.derived;
    Object.keys(composed_visible_wc_id_map).forEach((id) => {
      const target_ids = judgement_or_objective_ids_by_target_id[id];
      const ids_from_goal_or_action = judgement_or_objective_ids_by_goal_or_action_id[id];
      if (target_ids) {
        const active_judgement_or_objective_ids = target_ids.filter(judgement_or_objective_id_is_active);
        if (active_judgement_or_objective_ids.length) {
          active_judgement_or_objective_ids_by_target_id[id] = active_judgement_or_objective_ids;
        }
      }
      if (ids_from_goal_or_action) {
        const active_judgement_or_objective_ids = ids_from_goal_or_action.filter(judgement_or_objective_id_is_active);
        if (active_judgement_or_objective_ids.length) {
          active_judgement_or_objective_ids_by_goal_or_action_id[id] = active_judgement_or_objective_ids;
        }
      }
    });
    current_composed_knowledge_view = {
      ...current_composed_knowledge_view,
      active_judgement_or_objective_ids_by_target_id,
      active_judgement_or_objective_ids_by_goal_or_action_id
    };
    state = update_substate(state, "derived", "current_composed_knowledge_view", current_composed_knowledge_view);
  }
  return state;
}
