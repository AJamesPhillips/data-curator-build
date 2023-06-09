import {get_new_created_ats} from "../../shared/utils/datetime.js";
import {get_new_value_and_prediction_set_id} from "../../shared/utils/ids.js";
import {test} from "../../shared/utils/test.js";
import {VAPsType} from "../interfaces/VAPsType.js";
import {prepare_new_VAP, set_VAP_probabilities} from "./prepare_new_VAP.js";
import {get_possibilities_from_VAP_sets} from "../value_possibilities/get_possibilities_from_VAP_sets.js";
export function prepare_new_VAP_set(VAPs_represent, existing_value_possibilities, existing_VAP_sets, base_id, creation_context) {
  const dates = get_new_created_ats(creation_context);
  const entries_with_probabilities = prepare_new_VAP_set_entries(VAPs_represent, existing_value_possibilities, existing_VAP_sets);
  const datetime = VAPs_represent === VAPsType.action ? {value: new Date()} : existing_VAP_sets.length > 0 ? {value: new Date()} : {};
  const new_VAP_set = {
    id: get_new_value_and_prediction_set_id(),
    ...dates,
    base_id,
    datetime,
    entries: entries_with_probabilities
  };
  return new_VAP_set;
}
function prepare_new_VAP_set_entries(VAPs_represent, existing_value_possibilities, existing_VAP_sets) {
  const possibilities = get_possibilities_from_VAP_sets(VAPs_represent, existing_value_possibilities, existing_VAP_sets);
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
function run_tests() {
  const VAP_sets = [
    {...prepare_new_VAP_set(VAPsType.other, void 0, [], 1, {}), entries: [
      {...prepare_new_VAP(), value_id: "1", value: "a"},
      {...prepare_new_VAP(), value_id: "2", value: "b"}
    ]},
    {...prepare_new_VAP_set(VAPsType.other, void 0, [], 1, {}), entries: [
      {...prepare_new_VAP(), value_id: "1", value: "a"},
      {...prepare_new_VAP(), value_id: "2", value: "b"}
    ]}
  ];
  const value_possibilities = {
    "1": {id: "1", value: "a", description: "", order: 0},
    "2": {id: "2", value: "b", description: "", order: 1}
  };
  let result = prepare_new_VAP_set(VAPsType.other, value_possibilities, VAP_sets, 1, {});
  test(result.entries.length, 2, "If there are only two unique possibilities, only return 2 VAPs");
}
