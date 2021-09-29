import {get_new_value_and_prediction_set_id, get_new_VAP_id} from "../../shared/utils/ids.js";
import {get_new_created_ats} from "../../shared/utils/datetime.js";
import {VAPsType} from "../../shared/wcomponent/interfaces/generic_value.js";
import {action_statuses} from "../../shared/wcomponent/interfaces/action.js";
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
export function prepare_new_VAP_set_entries(VAPs_represent, existing_VAP_sets) {
  const options = VAPs_represent === VAPsType.other ? all_options_in_VAP_set(VAPs_represent, existing_VAP_sets) : VAPs_represent === VAPsType.action ? action_statuses : [""];
  const vanilla_entries = options.map((value) => ({...prepare_new_VAP(), value}));
  const entries_with_probabilities = set_VAP_probabilities(vanilla_entries, VAPs_represent);
  return entries_with_probabilities;
}
export function prepare_new_VAP_set(VAPs_represent, existing_VAP_sets, base_id, creation_context) {
  const dates = get_new_created_ats(creation_context);
  const entries_with_probabilities = prepare_new_VAP_set_entries(VAPs_represent, existing_VAP_sets);
  const new_VAP_set = {
    id: get_new_value_and_prediction_set_id(),
    ...dates,
    base_id,
    datetime: {},
    entries: entries_with_probabilities
  };
  return new_VAP_set;
}
function all_options_in_VAP_set(VAPs_represent, VAP_sets) {
  if (VAPs_represent !== VAPsType.other)
    return [""];
  const options = [];
  const options_set = new Set();
  for (let i = VAP_sets.length - 1; i >= 0; --i) {
    const VAP_set = VAP_sets[i];
    VAP_set.entries.forEach(({value}) => {
      if (options_set.has(value))
        return;
      options.push(value);
      options_set.add(value);
    });
  }
  return options;
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
