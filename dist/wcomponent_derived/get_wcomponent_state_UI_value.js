import {get_wcomponent_state_value_and_probabilities} from "./get_wcomponent_state_value.js";
import {get_boolean_representation, parsed_value_to_string} from "./value/parsed_value_presentation.js";
export function get_wcomponent_state_UI_value(args) {
  const {
    most_probable_VAP_set_values,
    any_uncertainty,
    counterfactual_applied
  } = get_wcomponent_state_value_and_probabilities(args);
  const boolean_representation = get_boolean_representation(args.wcomponent);
  const value_strings = [];
  most_probable_VAP_set_values.forEach((possibility) => {
    const value_string = parsed_value_to_string(possibility.parsed_value, boolean_representation);
    value_strings.push(value_string);
  });
  const is_defined = most_probable_VAP_set_values.length > 0;
  const values_string = reduce_display_string_values(value_strings);
  return {
    values_string,
    is_defined,
    counterfactual_applied,
    uncertain: any_uncertainty
  };
}
const max_items = 3;
function reduce_display_string_values(value_strings) {
  let values_string = value_strings.length ? value_strings.slice(0, max_items).join(", ") : "not defined";
  if (value_strings.length > max_items)
    values_string += `, (${value_strings.length - max_items} more)`;
  return values_string;
}
