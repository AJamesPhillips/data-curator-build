import {VAPsType} from "./interfaces/generic_value.js";
import {
  wcomponent_is_action,
  wcomponent_is_statev1,
  wcomponent_is_statev2,
  wcomponent_should_have_state_VAP_sets
} from "./interfaces/SpecialisedObjects.js";
import {get_created_at_ms} from "../utils_datetime/utils_datetime.js";
import {get_current_values_and_probabilities} from "./value_and_prediction/get_value.js";
import {subtype_to_VAPsType} from "./value_and_prediction/utils.js";
export function get_wcomponent_VAPsType(wcomponent) {
  const VAPs_represent = wcomponent_is_statev2(wcomponent) ? subtype_to_VAPsType(wcomponent.subtype) : wcomponent_is_action(wcomponent) ? VAPsType.action : VAPsType.other;
  return VAPs_represent;
}
export function get_wcomponent_state_value(args) {
  const {wcomponent, wc_counterfactuals, created_at_ms, sim_ms} = args;
  if (wcomponent_is_statev1(wcomponent))
    return get_wcomponent_statev1_value(wcomponent, created_at_ms, sim_ms);
  else if (wcomponent_should_have_state_VAP_sets(wcomponent)) {
    const VAPs_represent = get_wcomponent_VAPsType(wcomponent);
    return get_current_values_and_probabilities({
      values_and_prediction_sets: wcomponent.values_and_prediction_sets,
      VAPs_represent,
      wc_counterfactuals,
      created_at_ms,
      sim_ms
    });
  } else
    return [];
}
function get_wcomponent_statev1_value(wcomponent, created_at_ms, sim_ms) {
  if (!wcomponent.values)
    return [];
  const state_value_entry = wcomponent.values.filter((v) => get_created_at_ms(v) <= created_at_ms).last();
  if (!state_value_entry)
    return [];
  const possibility = {
    value: state_value_entry.value,
    probability: 1,
    conviction: 1,
    certainty: 1,
    uncertain: false,
    assumed: false
  };
  return [possibility];
}
