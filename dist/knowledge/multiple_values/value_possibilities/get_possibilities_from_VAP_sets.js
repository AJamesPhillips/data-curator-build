import {VAPsType} from "../../../shared/wcomponent/interfaces/generic_value.js";
import {default_possible_values} from "./default_possible_values.js";
import {prepare_new_VAP} from "../value_and_prediction/utils.js";
import {test} from "../../../shared/utils/test.js";
export function get_possibilities_from_VAP_sets(VAPs_represent, value_possibilities, VAP_sets) {
  const simple_possibilities = [];
  const possible_value_strings = new Set();
  VAP_sets.forEach((VAP_set) => {
    VAP_set.entries.forEach(({value_id}) => {
      const value_possibility = value_possibilities && value_possibilities[value_id || ""];
      if (!value_possibility || possible_value_strings.has(value_possibility.value))
        return;
      simple_possibilities.push(value_possibility);
      possible_value_strings.add(value_possibility.value);
    });
  });
  VAP_sets.forEach((VAP_set) => {
    VAP_set.entries.forEach(({value}) => {
      if (possible_value_strings.has(value))
        return;
      simple_possibilities.push({value});
      possible_value_strings.add(value);
    });
  });
  const possibilities = default_possible_values(VAPs_represent, simple_possibilities);
  return possibilities;
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
  test(result.length, 2, "Should get possibilities for all unique values");
  test(result[0]?.value, "abc");
  test(result[0]?.id !== val_prob_id_123, true, "Should set a new ID");
  test(result[1]?.value, "duplicated");
  let value_possibilities = {
    [val_prob_id_123]: {id: val_prob_id_123, value: "new abc", description: "", order: 1}
  };
  result = get_possibilities_from_VAP_sets(VAPs_represent, value_possibilities, VAP_sets);
  test(result[0]?.value, "new abc");
  test(result[0]?.id, val_prob_id_123, "Should reuse existing ID");
  test(result[1]?.order, 2, "Should increment off maximum order");
}
