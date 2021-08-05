import {project_priorities_derived_reducer} from "../../priorities/old_project_priorities/project_priorities_derived_reducer.js";
import {wcomponent_is_goal, wcomponent_is_judgement_or_objective} from "../../shared/wcomponent/interfaces/SpecialisedObjects.js";
import {is_defined} from "../../shared/utils/is_defined.js";
import {sort_list} from "../../shared/utils/sort.js";
import {update_substate} from "../../utils/update_state.js";
import {knowledge_views_derived_reducer} from "../specialised_objects/knowledge_views/derived_reducer.js";
import {get_wcomponent_ids_by_type} from "./get_wcomponent_ids_by_type.js";
import {get_wcomponents_from_state} from "../specialised_objects/accessors.js";
export function derived_state_reducer(initial_state, state) {
  if (initial_state.specialised_objects.perceptions_by_id !== state.specialised_objects.perceptions_by_id) {
    const perceptions = sort_list(Object.values(state.specialised_objects.perceptions_by_id), ({created_at}) => created_at.getTime(), "ascending");
    state = update_substate(state, "derived", "perceptions", perceptions);
  }
  if (initial_state.specialised_objects.wcomponents_by_id !== state.specialised_objects.wcomponents_by_id) {
    const wcomponents = sort_list(Object.values(state.specialised_objects.wcomponents_by_id), ({created_at}) => created_at.getTime(), "ascending");
    state = update_substate(state, "derived", "wcomponents", wcomponents);
    const ids = Object.keys(state.specialised_objects.wcomponents_by_id);
    const wcomponent_ids_by_type = get_wcomponent_ids_by_type(state, ids);
    state = update_substate(state, "derived", "wcomponent_ids_by_type", wcomponent_ids_by_type);
    const judgement_or_objectives = get_wcomponents_from_state(state, wcomponent_ids_by_type.judgement_or_objective).filter(is_defined).filter(wcomponent_is_judgement_or_objective);
    const judgement_or_objective_ids_by_target_id = update_judgement_or_objective_ids_by_target_id(judgement_or_objectives);
    state = update_substate(state, "derived", "judgement_or_objective_ids_by_target_id", judgement_or_objective_ids_by_target_id);
    const goals = get_wcomponents_from_state(state, state.derived.wcomponent_ids_by_type.goal).filter(is_defined).filter(wcomponent_is_goal);
    const judgement_or_objective_ids_by_goal_id = update_judgement_or_objective_ids_by_goal_id(goals);
    state = update_substate(state, "derived", "judgement_or_objective_ids_by_goal_id", judgement_or_objective_ids_by_goal_id);
  }
  state = knowledge_views_derived_reducer(initial_state, state);
  state = project_priorities_derived_reducer(initial_state, state);
  return state;
}
function update_judgement_or_objective_ids_by_target_id(judgement_or_objectives) {
  const judgement_or_objective_ids_by_target_id = {};
  judgement_or_objectives.forEach((judgement) => {
    const target_id = judgement.judgement_target_wcomponent_id;
    if (!target_id)
      return;
    judgement_or_objective_ids_by_target_id[target_id] = judgement_or_objective_ids_by_target_id[target_id] || [];
    judgement_or_objective_ids_by_target_id[target_id].push(judgement.id);
  });
  return judgement_or_objective_ids_by_target_id;
}
function update_judgement_or_objective_ids_by_goal_id(goals) {
  const judgement_or_objective_ids_by_goal_id = {};
  goals.forEach(({id: goal_id, objective_ids}) => {
    judgement_or_objective_ids_by_goal_id[goal_id] = objective_ids;
  });
  return judgement_or_objective_ids_by_goal_id;
}
