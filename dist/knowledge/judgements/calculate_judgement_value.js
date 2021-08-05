import {get_wcomponent_state_value} from "../../shared/wcomponent/get_wcomponent_state_value.js";
import {wcomponent_VAPs_represent} from "../../shared/wcomponent/value_and_prediction/utils.js";
import {VAPsType} from "../../shared/wcomponent/interfaces/generic_value.js";
export function calculate_judgement_value(args) {
  const {judgement_wcomponent, target_wcomponent, target_counterfactuals, created_at_ms, sim_ms} = args;
  if (judgement_wcomponent.judgement_manual !== void 0)
    return judgement_wcomponent.judgement_manual;
  if (!target_wcomponent)
    return void 0;
  const possibilities = get_wcomponent_state_value({
    wcomponent: target_wcomponent,
    wc_counterfactuals: target_counterfactuals,
    created_at_ms,
    sim_ms
  });
  if (possibilities.length !== 1) {
    return void 0;
  }
  const current_value = possibilities[0];
  const value = current_value.value;
  const target_VAPs_represent = wcomponent_VAPs_represent(target_wcomponent);
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
