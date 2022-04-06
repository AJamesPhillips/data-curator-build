import {get_wcomponent_VAPs_represent} from "../../wcomponent/get_wcomponent_VAPs_represent.js";
import {VAPsType} from "../../wcomponent/interfaces/VAPsType.js";
import {
  get_wcomponent_state_value_and_probabilities
} from "../../wcomponent_derived/get_wcomponent_state_value.js";
export function calculate_judgement_value(args) {
  const {judgement_wcomponent, target_wcomponent, VAP_set_id_to_counterfactual_v2_map, created_at_ms, sim_ms} = args;
  if (judgement_wcomponent.judgement_manual !== void 0)
    return judgement_wcomponent.judgement_manual;
  if (!target_wcomponent)
    return void 0;
  const {most_probable_VAP_set_values} = get_wcomponent_state_value_and_probabilities({
    wcomponent: target_wcomponent,
    VAP_set_id_to_counterfactual_v2_map,
    created_at_ms,
    sim_ms
  });
  if (most_probable_VAP_set_values.length !== 1) {
    return void 0;
  }
  const current_value = most_probable_VAP_set_values[0];
  const value = current_value.parsed_value;
  const wcomponents_by_id = {};
  const target_VAPs_represent = get_wcomponent_VAPs_represent(target_wcomponent, wcomponents_by_id);
  return core_calculate_judgement_value({judgement_wcomponent, target_VAPs_represent, value});
}
export function core_calculate_judgement_value(args) {
  const {judgement_wcomponent, target_VAPs_represent, value} = args;
  const {
    judgement_operator: operator,
    judgement_comparator_value: comparator,
    judgement_manual: manual
  } = judgement_wcomponent;
  if (manual !== void 0)
    return manual;
  const coerced_comparator = target_VAPs_represent === VAPsType.number ? parseFloat(comparator || "") : target_VAPs_represent === VAPsType.boolean ? comparator === "True" || (comparator === "False" ? false : void 0) : comparator;
  let result = void 0;
  if (value === null || coerced_comparator === void 0)
    result = void 0;
  else if (operator === "==")
    result = value === coerced_comparator;
  else if (operator === "!=")
    result = value !== coerced_comparator;
  else if (operator === "<")
    result = value < coerced_comparator;
  else if (operator === "<=")
    result = value <= coerced_comparator;
  else if (operator === ">")
    result = value > coerced_comparator;
  else if (operator === ">=")
    result = value >= coerced_comparator;
  return result;
}
