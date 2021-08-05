import {get_current_composed_knowledge_view_from_state} from "../accessors.js";
export function get_props_for_get_counterfactual_v2_VAP_set(wcomponent, state) {
  const current_composed_kv = get_current_composed_knowledge_view_from_state(state);
  let VAP_set_counterfactuals_map = void 0;
  let active_counterfactual_v2_ids = void 0;
  if (current_composed_kv) {
    active_counterfactual_v2_ids = current_composed_kv.active_counterfactual_v2_ids;
    const cf = current_composed_kv.wc_id_counterfactuals_v2_map[wcomponent.id];
    VAP_set_counterfactuals_map = cf && cf.VAP_set;
  }
  return {
    VAP_set_counterfactuals_map,
    active_counterfactual_v2_ids,
    knowledge_views_by_id: state.specialised_objects.knowledge_views_by_id
  };
}
