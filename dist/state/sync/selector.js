export function get_last_source_of_truth_wcomponent_from_state(state, id) {
  return state.sync.last_source_of_truth_specialised_objects_by_id.wcomponents[id || ""];
}
export function get_last_source_of_truth_knowledge_view_from_state(state, id) {
  return state.sync.last_source_of_truth_specialised_objects_by_id.knowledge_views[id || ""];
}
