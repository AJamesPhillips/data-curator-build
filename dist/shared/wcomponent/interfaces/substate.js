export function make_valid_selector(selector) {
  let new_selector;
  if (!selector)
    return void 0;
  const {target_VAP_set_id, target_value, target_value_id_type} = selector;
  if (!target_VAP_set_id) {
    if (target_value && target_value_id_type) {
      new_selector = {target_value, target_value_id_type};
    } else
      new_selector = void 0;
  } else {
    if (target_value && target_value_id_type) {
      new_selector = {target_VAP_set_id, target_value, target_value_id_type};
    } else
      new_selector = {target_VAP_set_id};
  }
  return new_selector;
}
