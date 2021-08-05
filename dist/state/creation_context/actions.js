const toggle_use_creation_context_type = "toggle_use_creation_context";
const toggle_use_creation_context = () => {
  return {type: toggle_use_creation_context_type};
};
export const is_toggle_use_creation_context = (action) => {
  return action.type === toggle_use_creation_context_type;
};
const set_custom_created_at_type = "set_custom_created_at";
const set_custom_created_at = (args) => {
  return {type: set_custom_created_at_type, ...args};
};
export const is_set_custom_created_at = (action) => {
  return action.type === set_custom_created_at_type;
};
const set_label_ids_type = "set_label_ids";
const set_label_ids = (args) => {
  return {type: set_label_ids_type, ...args};
};
export const is_set_label_ids = (action) => {
  return action.type === set_label_ids_type;
};
export const creation_context_actions = {
  toggle_use_creation_context,
  set_custom_created_at,
  set_label_ids
};
