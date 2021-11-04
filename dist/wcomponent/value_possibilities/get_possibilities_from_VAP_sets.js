import {test} from "../../shared/utils/test.js";
import {
  ensure_possible_values_have_ids
} from "./ensure_possible_values_have_ids.js";
import {prepare_new_VAP} from "../CRUD_helpers/prepare_new_VAP.js";
import {VAPsType} from "../interfaces/VAPsType.js";
import {default_possible_values} from "./default_possible_values.js";
export function get_possibilities_from_VAP_sets(VAPs_represent, value_possibilities_by_id, VAP_sets) {
  const simple_possibilities = get_simple_possibilities_from_VAP_sets(VAPs_represent, value_possibilities_by_id, VAP_sets);
  const possibilities = ensure_possible_values_have_ids(simple_possibilities);
  return possibilities;
}
function get_simple_possibilities_from_VAP_sets(VAPs_represent, value_possibilities_by_id, VAP_sets) {
  const value_cores = Object.values(value_possibilities_by_id || {}).map((possibility) => ({...possibility, id: void 0, value_id: possibility.id}));
  VAP_sets.forEach((VAP_set) => {
    VAP_set.entries.forEach(({value_id, value}) => {
      value_cores.push({value_id, value});
    });
  });
  const simple_possibilities = get_simple_possibilities_from_values(value_cores, value_possibilities_by_id);
  return default_possible_values(VAPs_represent, simple_possibilities);
}
export function get_simple_possibilities_from_values(values, value_possibilities_by_id) {
  let simple_possibilities = [];
  const possible_value_strings = new Set();
  let max_order = 0;
  values.forEach(({value_id}) => {
    const value_possibility = value_possibilities_by_id && value_possibilities_by_id[value_id || ""];
    if (!value_possibility || possible_value_strings.has(value_possibility.value))
      return;
    simple_possibilities.push(value_possibility);
    max_order = Math.max(max_order, value_possibility.order);
    possible_value_strings.add(value_possibility.value);
  });
  values.forEach(({value, value_id}) => {
    if (possible_value_strings.has(value))
      return;
    simple_possibilities.push({value, id: value_id, order: ++max_order});
    possible_value_strings.add(value);
  });
  return simple_possibilities.sort((a, b) => (a.order ?? 0) < (b.order ?? 0) ? -1 : 1);
}
function run_tests() {
  const VAPs_represent = VAPsType.number;
  const val_prob_id_123 = "val_prob_id_123";
  const VAP_sets = [
    {
      id: "VAPSet123",
      created_at: new Date(),
      base_id: 1,
      datetime: {},
      entries: [
        {...prepare_new_VAP(), value_id: val_prob_id_123, value: "abc", description: ""},
        {...prepare_new_VAP(), value_id: void 0, value: "duplicated", description: ""},
        {...prepare_new_VAP(), value_id: void 0, value: "duplicated", description: ""}
      ]
    }
  ];
  let result = get_possibilities_from_VAP_sets(VAPs_represent, void 0, VAP_sets);
  test(result.length, 2, "Should get possibilities for all unique values and remove duplicates");
  test(result[0]?.value, "abc");
  test(result[0]?.id !== val_prob_id_123, true, "Should set a new ID");
  test(result[1]?.value, "duplicated");
  test(result[1]?.id !== void 0, true, "Should set a new ID if original is undefined");
  let value_possibilities = {
    [val_prob_id_123]: {id: val_prob_id_123, value: "new abc", description: "", order: 1}
  };
  result = get_possibilities_from_VAP_sets(VAPs_represent, value_possibilities, VAP_sets);
  test(result[0]?.value, "new abc");
  test(result[0]?.id, val_prob_id_123, "Should reuse existing ID");
  test(result[1]?.order, 2, "Should increment off maximum order");
}
