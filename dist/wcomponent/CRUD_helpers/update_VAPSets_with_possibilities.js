import {test} from "../../shared/utils/test.js";
import {prepare_new_VAP} from "./prepare_new_VAP.js";
import {get_value_possibilities_by_value} from "../value_possibilities/get_value_possibilities_by_value.js";
export function update_VAPSets_with_possibilities(initial_values_and_prediction_sets, maybe_value_possibilities) {
  if (initial_values_and_prediction_sets === void 0)
    return void 0;
  const value_possibilities = maybe_value_possibilities || {};
  const value_possibilities_by_value = get_value_possibilities_by_value(value_possibilities, false);
  return initial_values_and_prediction_sets.map((VAP_set) => {
    return {
      ...VAP_set,
      entries: VAP_set.entries.map((VAP) => {
        let {value_id, value, description} = VAP;
        let value_possibility = value_possibilities[value_id || ""];
        if (!value_possibility) {
          value_id = void 0;
          value_possibility = value_possibilities_by_value[VAP.value];
        }
        if (value_possibility) {
          value_id = value_possibility.id;
          value = value_possibility.value;
          description = value_possibility.description;
        }
        return {
          ...VAP,
          value_id,
          value,
          description
        };
      })
    };
  });
}
function run_tests() {
  const val_prob_id_123 = "val_prob_id_123";
  const val_prob_id_456 = "val_prob_id_456";
  const val_prob_123_value = "value abc";
  const val_prob_456_value = "value def456";
  const value_possibilities = {
    [val_prob_id_123]: {id: val_prob_id_123, value: val_prob_123_value, description: "description abc", order: 0},
    [val_prob_id_456]: {id: val_prob_id_456, value: val_prob_456_value, description: "description def456", order: 1}
  };
  const initial_values_and_prediction_sets = [
    {
      id: "VAPSet123",
      created_at: new Date(),
      base_id: 1,
      datetime: {},
      entries: [
        {...prepare_new_VAP(), value_id: val_prob_id_123, value: "old abc value", description: "old abc description"},
        {...prepare_new_VAP(), value_id: "defunct_id", value: val_prob_123_value, description: "old abc description"},
        {...prepare_new_VAP(), value_id: val_prob_id_456, value: val_prob_123_value, description: ""}
      ]
    }
  ];
  let result = update_VAPSets_with_possibilities(void 0, void 0);
  test(result, void 0, "Undefined initial VAPs returns undefined");
  result = update_VAPSets_with_possibilities(void 0, value_possibilities);
  test(result, void 0, "Undefined initial VAPs returns undefined");
  result = update_VAPSets_with_possibilities([], value_possibilities);
  test(result, [], "Empty initial VAPs returns empty");
  result = update_VAPSets_with_possibilities(initial_values_and_prediction_sets, void 0);
  test(result?.length, initial_values_and_prediction_sets.length, "Undefined value_possibilities returns all VAPs");
  if (result) {
    test(result[0]?.entries[0]?.value_id, void 0, "Undefined value_possibilities returns VAPs without value_ids");
    test(result[0]?.entries[1]?.value_id, void 0, "Undefined value_possibilities returns VAPs without value_ids");
    test(result[0]?.entries[2]?.value_id, void 0, "Undefined value_possibilities returns VAPs without value_ids");
  }
  console.log("Updates VAPs in VAP Set with value_possibilities ...");
  result = update_VAPSets_with_possibilities(initial_values_and_prediction_sets, value_possibilities);
  test(Array.isArray(result), true, "Returns an array");
  if (result) {
    test(result[0]?.entries[0]?.value, value_possibilities[val_prob_id_123]?.value, "Updates value");
    test(result[0]?.entries[0]?.description, value_possibilities[val_prob_id_123]?.description, "Updates description");
    test(result[0]?.entries[1]?.value_id, val_prob_id_123, "Updates id based on matched value");
    test(result[0]?.entries[1]?.description, value_possibilities[val_prob_id_123]?.description, "Updates description based on matched value/id");
    test(result[0]?.entries[2]?.value_id, val_prob_id_456, "Does not update id based on matched value if ID valid");
    test(result[0]?.entries[2]?.value, val_prob_456_value, "Updates value");
    test(result[0]?.entries[2]?.description, value_possibilities[val_prob_id_456]?.description, "Updates description");
  }
}
