import {v4 as uuid_v4} from "../../../snowpack/pkg/uuid.js";
import {get_max_value_possibilities_order} from "../value_possibilities/get_max_value_possibilities_order.js";
export function prepare_new_value_possibility(existing_value_possibilities) {
  const max_order = get_max_value_possibilities_order(existing_value_possibilities);
  return {
    id: uuid_v4(),
    value: "",
    description: "",
    order: max_order + 1
  };
}
