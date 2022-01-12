const set_action_ids_to_show_type = "set_action_ids_to_show";
const set_action_ids_to_show = (args) => {
  return {type: set_action_ids_to_show_type, ...args};
};
export const is_set_action_ids_to_show = (action) => {
  return action.type === set_action_ids_to_show_type;
};
export const view_priorities_actions = {
  set_action_ids_to_show
};
