import {get_new_VAP_id} from "../../../shared/utils/ids.js";
import {get_new_created_ats} from "../../../shared/utils/datetime.js";
import {VAPsType} from "../../../shared/wcomponent/interfaces/generic_value.js";
import {get_possibilities_from_VAP_sets} from "../value_possibilities/get_possibilities_from_VAP_sets.js";
export function prepare_new_VAP() {
  return {
    id: get_new_VAP_id(),
    explanation: "",
    probability: 0,
    conviction: 1,
    value: "",
    description: ""
  };
}
export function prepare_new_VAP_set_entries(VAPs_represent, value_possibilities, existing_VAP_sets) {
  const possibilities = get_possibilities_from_VAP_sets(VAPs_represent, value_possibilities, existing_VAP_sets);
  const vanilla_entries = possibilities.map((possibility) => ({
    ...prepare_new_VAP(),
    value: possibility.value,
    value_id: possibility.id,
    description: possibility.description || ""
  }));
  const entries_with_probabilities = set_VAP_probabilities(vanilla_entries, VAPs_represent);
  return entries_with_probabilities;
}
export function create_new_VAP_set_version(current_VAP_set, creation_context) {
  const clone = {
    ...current_VAP_set,
    ...get_new_created_ats(creation_context),
    entries: current_VAP_set.entries.map((e) => ({...e, explanation: ""})),
    shared_entry_values: {
      ...current_VAP_set.shared_entry_values,
      explanation: void 0
    }
  };
  return clone;
}
export function set_VAP_probabilities(VAPs, VAPs_represent) {
  const multiple = VAPs.length > 1;
  let total_relative_probability = 0;
  VAPs = VAPs.map((VAP) => {
    const relative_probability = multiple ? VAP.relative_probability === void 0 ? VAP.probability : VAP.relative_probability : void 0;
    if (relative_probability !== void 0)
      total_relative_probability += relative_probability;
    return {...VAP, relative_probability};
  });
  if (VAPs_represent !== VAPsType.boolean) {
    total_relative_probability = total_relative_probability || 1;
    VAPs = VAPs.map((VAP) => {
      const relative_probability = VAP.relative_probability === void 0 ? 1 : VAP.relative_probability;
      const probability = relative_probability / total_relative_probability;
      return {...VAP, probability};
    });
  }
  return VAPs;
}
