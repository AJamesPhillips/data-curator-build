export function get_wc_id_counterfactuals_map(state) {
  return state.derived.current_composed_knowledge_view && state.derived.current_composed_knowledge_view.wc_id_counterfactuals_map;
}
export function get_wcomponent_counterfactuals(state, wcomponent_id) {
  const map = get_wc_id_counterfactuals_map(state);
  return map && map[wcomponent_id];
}
export function get_wcomponent_VAP_set_counterfactuals(state, wcomponent_id) {
  const counterfactuals = get_wcomponent_counterfactuals(state, wcomponent_id);
  return counterfactuals && counterfactuals.VAP_set;
}
