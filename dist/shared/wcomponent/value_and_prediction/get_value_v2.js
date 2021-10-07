import {wcomponent_has_knowledge_view} from "../../../state/specialised_objects/accessors.js";
import {partition_and_prune_items_by_datetimes_and_versions} from "./utils.js";
import {clean_VAP_set_for_counterfactual} from "../../counterfactuals/clean_VAP_set.js";
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
    VAP_set_ids_to_counterfactuals_map,
    active_counterfactual_v2_ids = [],
    knowledge_views_by_id
  } = args;
  let {VAP_set} = args;
  const counterfactuals_v2 = VAP_set_ids_to_counterfactuals_map?.[VAP_set.id] || [];
  const active_cf_ids = new Set(active_counterfactual_v2_ids);
  let has_counterfactual_applied = false;
  const target_VAP_id_counterfactual_map = {};
  let active_counterfactual_v2_id = void 0;
  counterfactuals_v2.forEach((cf) => {
    const {target_VAP_id} = cf;
    if (!target_VAP_id)
      return;
    if (active_cf_ids.has(cf.id) && !has_counterfactual_applied) {
      VAP_set = clean_VAP_set_for_counterfactual(VAP_set, target_VAP_id);
      has_counterfactual_applied = true;
      active_counterfactual_v2_id = cf.id;
    }
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
    has_counterfactual_applied,
    target_VAP_id_counterfactual_map,
    active_counterfactual_v2_id
  };
}
