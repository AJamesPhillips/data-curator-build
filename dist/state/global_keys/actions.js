const key_down_type = "key_down";
const key_down = (global_key_press_args) => {
  return {type: key_down_type, ...global_key_press_args};
};
export const is_key_down = (action) => {
  return action.type === key_down_type;
};
const key_up_type = "key_up";
const key_up = (global_key_press_args) => {
  return {type: key_up_type, ...global_key_press_args};
};
export const is_key_up = (action) => {
  return action.type === key_up_type;
};
const clear_all_keys_type = "clear_all_keys";
const clear_all_keys = () => {
  return {type: clear_all_keys_type};
};
export const is_clear_all_keys = (action) => {
  return action.type === clear_all_keys_type;
};
export const global_keys_actions = {
  key_down,
  key_up,
  clear_all_keys
};
