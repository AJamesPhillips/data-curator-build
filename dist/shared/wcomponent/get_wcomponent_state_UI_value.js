import {percentage_to_string} from "../../sharedf/percentages.js";
import {get_wcomponent_state_value} from "./get_wcomponent_state_value.js";
import {wcomponent_is_statev2} from "./interfaces/SpecialisedObjects.js";
export function get_wcomponent_state_UI_value(args) {
  const possibilities = get_wcomponent_state_value(args);
  const is_defined = possibilities.length > 0;
  const display_string_values = get_display_strings(args.wcomponent, possibilities);
  const display_strings = reduce_display_string_values(display_string_values);
  let assumed = false;
  let uncertain = false;
  possibilities.forEach((possibility) => {
    assumed = assumed || possibility.assumed;
    uncertain = uncertain || possibility.uncertain;
  });
  return {
    ...display_strings,
    is_defined,
    assumed,
    uncertain
  };
}
function get_display_strings(wcomponent, possibilities) {
  const boolean_representation = get_boolean_representation({wcomponent});
  const value_strings = [];
  const probability_strings = [];
  const conviction_strings = [];
  possibilities.forEach(({value, probability, conviction}) => {
    const value_string = VAP_value_to_string(value, boolean_representation);
    value_strings.push(value_string);
    probability_strings.push(percentage_to_string(probability));
    conviction_strings.push(percentage_to_string(conviction));
  });
  return {value_strings, probability_strings, conviction_strings};
}
export function get_boolean_representation(args) {
  const {wcomponent, append_boolean} = args;
  let boolean_true_str = "";
  let boolean_false_str = "";
  if (!wcomponent)
    "";
  else if (wcomponent_is_statev2(wcomponent)) {
    boolean_true_str = wcomponent.boolean_true_str || boolean_true_str;
    boolean_false_str = wcomponent.boolean_false_str || boolean_false_str;
  }
  boolean_true_str = boolean_true_str ? append_boolean ? boolean_true_str + " (True)" : boolean_true_str : "True";
  boolean_false_str = boolean_false_str ? append_boolean ? boolean_false_str + " (False)" : boolean_false_str : "False";
  return {true: boolean_true_str, false: boolean_false_str};
}
export function VAP_value_to_string(value, boolean_representation) {
  let value_string;
  if (typeof value === "boolean") {
    value_string = value ? boolean_representation.true : boolean_representation.false;
  } else
    value_string = `${value}`;
  return value_string;
}
const max_items = 3;
function reduce_display_string_values(args) {
  const {value_strings, probability_strings, conviction_strings} = args;
  let values_string = value_strings.length ? value_strings.slice(0, max_items).join(", ") : "not defined";
  if (value_strings.length > max_items)
    values_string += `, (${value_strings.length - max_items} more)`;
  let probabilities_string = probability_strings.length ? probability_strings.slice(0, max_items).join(", ") + "%" : "";
  if (probability_strings.length > max_items)
    probabilities_string += `, (${probability_strings.length - max_items} more)`;
  let convictions_string = conviction_strings.length ? conviction_strings.slice(0, max_items).join(", ") + "%" : "";
  if (conviction_strings.length > max_items)
    convictions_string += `, (${conviction_strings.length - max_items} more)`;
  return {values_string, probabilities_string, convictions_string};
}
