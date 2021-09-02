import {
  merge_all_counterfactuals_into_all_VAPs
} from "../../counterfactuals/merge.js";
import {VAPsType} from "../interfaces/generic_value.js";
import {calc_is_uncertain} from "../uncertainty_utils.js";
import {partition_and_prune_items_by_datetimes} from "../utils_datetime.js";
import {get_VAPs_ordered_by_prob} from "./utils.js";
export function get_current_value(probabilities) {
  let value = {
    probabilities,
    is_defined: probabilities.length > 0,
    value: void 0,
    probability: 1,
    conviction: 1,
    certainty: 1,
    uncertain: probabilities.length > 1,
    assumed: false
  };
  if (probabilities.length === 1) {
    value = {...value, ...probabilities[0], probabilities};
  }
  return value;
}
export function get_current_values_and_probabilities(args) {
  const counterfactual_VAPs = get_current_counterfactual_VAP_sets(args);
  return get_probable_VAP_values(counterfactual_VAPs, args.VAPs_represent);
}
function get_current_counterfactual_VAP_sets(args) {
  const {
    values_and_prediction_sets,
    VAPs_represent,
    wc_counterfactuals,
    created_at_ms,
    sim_ms
  } = args;
  const {present_items} = partition_and_prune_items_by_datetimes({
    items: values_and_prediction_sets || [],
    created_at_ms,
    sim_ms
  });
  const all_present_VAPs = get_all_VAPs_from_VAP_sets(present_items, VAPs_represent);
  const VAP_counterfactuals_maps = Object.values(wc_counterfactuals && wc_counterfactuals.VAP_set || {});
  return merge_all_counterfactuals_into_all_VAPs(all_present_VAPs, VAP_counterfactuals_maps);
}
export function clean_VAP_set_entries(VAP_set, VAPs_represent) {
  const subtype_specific_VAPs = VAPs_represent === VAPsType.boolean ? VAP_set.entries.slice(0, 1) : VAP_set.entries;
  return {...VAP_set, entries: subtype_specific_VAPs};
}
function get_all_VAPs_from_VAP_sets(VAP_sets, VAPs_represent) {
  let all_VAPs = [];
  VAP_sets.forEach((VAP_set) => {
    const subtype_specific_VAPs = clean_VAP_set_entries(VAP_set, VAPs_represent).entries;
    all_VAPs = all_VAPs.concat(subtype_specific_VAPs);
  });
  return all_VAPs;
}
export function parse_VAP_value(VAP, VAPs_represent) {
  const value = VAPs_represent === VAPsType.boolean ? VAP.probability > 0.5 : VAPs_represent === VAPsType.number ? parseFloat(VAP.value) : VAP.value;
  return value;
}
function get_probable_VAP_values(all_VAPs, VAPs_represent) {
  if (!all_VAPs.length)
    return [];
  const VAPs_by_prob = get_VAPs_ordered_by_prob(all_VAPs, VAPs_represent);
  const possibilities = VAPs_by_prob.map((VAP) => {
    const value = parse_VAP_value(VAP, VAPs_represent);
    const certainty = Math.min(VAP.probability, VAP.conviction);
    return {
      ...VAP,
      certainty,
      uncertain: calc_is_uncertain(VAP),
      assumed: VAP.is_counterfactual,
      value
    };
  }).filter((possibility) => {
    return VAPs_represent === VAPsType.boolean || possibility.uncertain || possibility.probability > 0;
  });
  return possibilities;
}
