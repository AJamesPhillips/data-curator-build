import {VAP_visual_uncertainty_id} from "./utils_to_convert_VAP_set_to_visuals.js";
export function apply_counterfactuals_v2_to_VAP_set(args) {
  const {
    VAP_set_id_to_counterfactual_v2_map
  } = args;
  let {VAP_set} = args;
  const counterfactuals_v2 = VAP_set_id_to_counterfactual_v2_map?.[VAP_set.id] || [];
  let has_any_counterfactual_applied = false;
  let active_counterfactual_v2_id = void 0;
  counterfactuals_v2.forEach((cf) => {
    const {target_VAP_id} = cf;
    if (!target_VAP_id)
      return;
    VAP_set = distort_VAP_set_for_counterfactual(VAP_set, target_VAP_id);
    has_any_counterfactual_applied = true;
    active_counterfactual_v2_id = cf.id;
  });
  return {
    ...VAP_set,
    has_any_counterfactual_applied,
    active_counterfactual_v2_id
  };
}
function distort_VAP_set_for_counterfactual(VAP_set, target_VAP_id) {
  if (target_VAP_id === void 0) {
    target_VAP_id = VAP_set.entries[0]?.id;
  }
  const conviction = target_VAP_id === VAP_visual_uncertainty_id ? 0 : 1;
  const shared_entry_values = {
    ...VAP_set.shared_entry_values,
    conviction
  };
  const entries = VAP_set.entries.map((entry) => {
    const probability = entry.id === target_VAP_id ? 1 : 0;
    return {...entry, probability, relative_probability: 0, conviction};
  });
  return {...VAP_set, shared_entry_values, entries, target_VAP_id};
}
