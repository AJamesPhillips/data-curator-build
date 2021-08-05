const set_apply_filter_type = "set_apply_filter";
const set_apply_filter = (apply_filter) => {
  return {type: set_apply_filter_type, apply_filter};
};
export const is_set_apply_filter = (action) => {
  return action.type === set_apply_filter_type;
};
const set_filters_type = "set_filters";
const set_filters = (args) => {
  return {type: set_filters_type, ...args};
};
export const is_set_filters = (action) => {
  return action.type === set_filters_type;
};
export const filter_context_actions = {
  set_apply_filter,
  set_filters
};
