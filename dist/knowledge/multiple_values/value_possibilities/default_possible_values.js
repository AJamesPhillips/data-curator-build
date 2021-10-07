import {v4 as uuid_v4} from "../../../../snowpack/pkg/uuid.js";
import {test} from "../../../shared/utils/test.js";
import {action_statuses} from "../../../shared/wcomponent/interfaces/action.js";
import {VAPsType} from "../../../shared/wcomponent/interfaces/generic_value.js";
import {get_max_value_possibilities_order} from "./get_max_value_possibilities_order.js";
export function default_possible_values(VAPs_represent, simple_possibilities) {
  if (VAPs_represent === VAPsType.boolean) {
    if (simple_possibilities.length === 0)
      simple_possibilities = [{value: ""}];
    else if (simple_possibilities.length > 1)
      simple_possibilities = simple_possibilities.slice(0, 1);
  } else if (simple_possibilities.length === 0) {
    (VAPs_represent === VAPsType.action ? action_statuses : [""]).forEach((value, index) => {
      simple_possibilities.push({value, order: index});
    });
  }
  let max_order = get_max_value_possibilities_order(simple_possibilities);
  const possibilities = simple_possibilities.map((possibility) => {
    const id = possibility.id || uuid_v4();
    const order = possibility.order ?? ++max_order;
    return {description: "", ...possibility, id, order};
  });
  return possibilities;
}
function run_tests() {
  const simple_possibilities = [
    {
      id: "730a7cb4-7523-45f7-bfde-a00d0acb9f65",
      value: "",
      description: "",
      order: 0
    },
    {
      id: "724c4da6-f4ee-4680-a493-556ee241f29d",
      value: "",
      description: "",
      order: 1
    }
  ];
  let result = default_possible_values(VAPsType.boolean, simple_possibilities);
  test(result.length, 1, "If boolean and given more than one value possibility, it should be reduced back to 1");
  test(result[0]?.id, simple_possibilities[0]?.id, "ID should match existing ID");
  result = default_possible_values(VAPsType.boolean, []);
  test(result.length, 1, "If boolean and no value possibilities, it should create 1");
  result = default_possible_values(VAPsType.action, []);
  test(result.length, action_statuses.length, "If action and no value possibilities, it should create the set");
}
