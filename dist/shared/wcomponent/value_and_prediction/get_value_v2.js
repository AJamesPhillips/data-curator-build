import {wcomponent_has_knowledge_view} from "../../../state/specialised_objects/accessors.js";
import {partition_and_prune_items_by_datetimes_and_versions} from "./utils.js";
export function get_current_VAP_set(args) {
  const {
    values_and_prediction_sets,
    created_at_ms,
    sim_ms
  } = args;
  const {present_items} = partition_and_prune_items_by_datetimes_and_versions({
    items: values_and_prediction_sets || [],
    created_at_ms,
    sim_ms
  });
  const VAP_set = present_items[0];
  if (!VAP_set)
    return void 0;
  return VAP_set;
}
export function get_counterfactual_v2_VAP_set(args) {
  const {
    VAP_set,
    VAP_set_counterfactuals_map: cf_map,
    active_counterfactual_v2_ids = []
  } = args;
  const counterfactual_v2 = cf_map && cf_map[VAP_set.id];
  const active_cf_ids = new Set(active_counterfactual_v2_ids);
  return merge_counterfactuals_v2_into_composed_VAP_set(VAP_set, counterfactual_v2, active_cf_ids, args.knowledge_views_by_id);
}
function merge_counterfactuals_v2_into_composed_VAP_set(VAP_set, counterfactuals_v2 = [], active_cf_ids, knowledge_views_by_id) {
  let is_counterfactual = false;
  const target_VAP_id_counterfactual_map = {};
  let active_counterfactual_v2_id = void 0;
  counterfactuals_v2.forEach((cf) => {
    if (active_cf_ids.has(cf.id)) {
      VAP_set = {...VAP_set, ...cf.counterfactual_VAP_set};
      is_counterfactual = true;
      active_counterfactual_v2_id = cf.id;
    }
    const target_VAP_id = cf.counterfactual_VAP_set && cf.counterfactual_VAP_set.target_VAP_id;
    if (!target_VAP_id)
      return;
    const counterfactual_has_knowledge_view = wcomponent_has_knowledge_view(cf.id, knowledge_views_by_id);
    const entry = {
      counterfactual_v2_id: cf.id,
      counterfactual_has_knowledge_view
    };
    const cf_data = target_VAP_id_counterfactual_map[target_VAP_id] || [];
    cf_data.push(entry);
    target_VAP_id_counterfactual_map[target_VAP_id] = cf_data;
  });
  return {
    ...VAP_set,
    is_counterfactual,
    target_VAP_id_counterfactual_map,
    active_counterfactual_v2_id
  };
}
