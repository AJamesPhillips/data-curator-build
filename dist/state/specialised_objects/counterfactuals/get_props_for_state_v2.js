import {get_current_composed_knowledge_view_from_state} from "../accessors.js";
export function get_partial_args_for_get_counterfactual_v2_VAP_set(wcomponent_id, state) {
  const current_composed_kv = get_current_composed_knowledge_view_from_state(state);
  let active_counterfactual_v2_ids = void 0;
  let VAP_set_ids_to_counterfactuals_map = void 0;
  if (current_composed_kv) {
    active_counterfactual_v2_ids = current_composed_kv.active_counterfactual_v2_ids;
    const CFs_by_attribute = current_composed_kv.wc_id_counterfactuals_v2_map[wcomponent_id];
    VAP_set_ids_to_counterfactuals_map = CFs_by_attribute?.VAP_sets;
  }
  return {
    active_counterfactual_v2_ids,
    VAP_set_ids_to_counterfactuals_map,
    knowledge_views_by_id: state.specialised_objects.knowledge_views_by_id
  };
}
