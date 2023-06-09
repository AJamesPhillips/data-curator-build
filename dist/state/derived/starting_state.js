import {get_empty_wcomponent_ids_by_type} from "./get_wcomponent_ids_by_type.js";
export function get_derived_starting_state() {
  return {
    composed_wcomponents_by_id: {},
    wcomponent_ids_by_type: get_empty_wcomponent_ids_by_type(),
    knowledge_views: [],
    nested_knowledge_view_ids: {top_ids: [], map: {}},
    judgement_or_objective_ids_by_target_id: {},
    judgement_or_objective_ids_by_goal_or_action_id: {},
    current_composed_knowledge_view: void 0
  };
}
