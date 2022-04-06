import {get_wcomponent_VAPs_represent} from "../../wcomponent/get_wcomponent_VAPs_represent.js";
import {
  get_simple_possibilities_from_values
} from "../../wcomponent/value_possibilities/get_possibilities_from_VAP_sets.js";
import {convert_VAP_set_to_VAP_visuals} from "../value_and_prediction/convert_VAP_set_to_VAP_visuals.js";
export function convert_VAP_sets_to_visual_sub_state_value_possibilities(args) {
  const {selector, target_wcomponent} = args;
  const {target_VAP_set_id, target_value_id_type, target_value} = selector || {};
  const target_VAP_sets = get_substate_target_VAP_sets(target_wcomponent, target_VAP_set_id);
  const wcomponents_by_id = {};
  const VAPs_represent = get_wcomponent_VAPs_represent(target_wcomponent, wcomponents_by_id);
  const values = [];
  target_VAP_sets.forEach((VAP_set) => {
    convert_VAP_set_to_VAP_visuals({VAP_set, VAPs_represent, wcomponent: target_wcomponent}).forEach(({value_id, value_text}) => values.push({value_id, value: value_text}));
  });
  const simple_possibilities = get_simple_possibilities_from_values(values, target_wcomponent.value_possibilities);
  return simple_possibilities.map((possilibity) => {
    const selected = predicate_target_value_possibility({
      target_value_id_type,
      target_value,
      value_text: possilibity.value,
      value_id: possilibity.id
    });
    return {...possilibity, selected};
  });
}
function get_substate_target_VAP_sets(target_wcomponent, target_VAP_set_id) {
  let target_VAP_sets = target_wcomponent.values_and_prediction_sets || [];
  if (target_VAP_set_id)
    target_VAP_sets = target_VAP_sets.filter(({id}) => id === target_VAP_set_id);
  return target_VAP_sets;
}
export function predicate_target_value_possibility(args) {
  const selected = args.target_value_id_type === void 0 ? void 0 : args.target_value_id_type === "value_string" ? args.value_text === args.target_value : args.value_id === args.target_value;
  return selected;
}
