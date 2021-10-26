import {get_max_value_possibilities_order} from "../value_possibilities/get_max_value_possibilities_order.js";
export function update_value_possibilities_with_VAPSets(existing_value_possibilities, values_and_prediction_sets) {
  let max_order = get_max_value_possibilities_order(existing_value_possibilities);
  if (existing_value_possibilities)
    existing_value_possibilities = {...existing_value_possibilities};
  values_and_prediction_sets.forEach((VAP_set) => {
    VAP_set.entries.forEach((VAP) => {
      if (!VAP.value_id)
        return;
      existing_value_possibilities = existing_value_possibilities || {};
      const order = existing_value_possibilities[VAP.value_id]?.order ?? ++max_order;
      existing_value_possibilities[VAP.value_id] = {
        id: VAP.value_id,
        value: VAP.value,
        description: VAP.description,
        order
      };
    });
  });
  return existing_value_possibilities;
}
