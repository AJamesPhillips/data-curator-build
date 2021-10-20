import {v4 as uuid_v4} from "../../../snowpack/pkg/uuid.js";
import {get_max_value_possibilities_order} from "./get_max_value_possibilities_order.js";
export function ensure_possible_values_have_ids(simple_possibilities) {
  let max_order = get_max_value_possibilities_order(simple_possibilities);
  const possibilities = simple_possibilities.map((possibility) => {
    const id = possibility.id || uuid_v4();
    const order = possibility.order ?? ++max_order;
    return {description: "", ...possibility, id, order};
  });
  return possibilities;
}
