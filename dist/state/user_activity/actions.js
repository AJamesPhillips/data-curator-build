const set_editing_text_flag_type = "set_editing_text_flag";
const set_editing_text_flag = (editing_text) => {
  return {type: set_editing_text_flag_type, editing_text};
};
export const is_set_editing_text_flag = (action) => {
  return action.type === set_editing_text_flag_type;
};
export const user_activity_actions = {
  set_editing_text_flag
};
