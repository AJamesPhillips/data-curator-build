const set_user_type = "set_user";
const set_user = (args) => {
  return {type: set_user_type, ...args};
};
export const is_set_user = (action) => {
  return action.type === set_user_type;
};
const set_need_to_handle_password_recovery_type = "set_need_to_handle_password_recovery";
const set_need_to_handle_password_recovery = (need_to_handle_password_recovery) => {
  return {type: set_need_to_handle_password_recovery_type, need_to_handle_password_recovery};
};
export const is_set_need_to_handle_password_recovery = (action) => {
  return action.type === set_need_to_handle_password_recovery_type;
};
const set_users_type = "set_users";
const set_users = (args) => {
  return {type: set_users_type, ...args};
};
export const is_set_users = (action) => {
  return action.type === set_users_type;
};
const update_chosen_base_id_type = "update_chosen_base_id";
const update_chosen_base_id = (args) => {
  return {type: update_chosen_base_id_type, ...args};
};
export const is_update_chosen_base_id = (action) => {
  return action.type === update_chosen_base_id_type;
};
const update_bases_type = "update_bases";
const update_bases = (args) => {
  return {type: update_bases_type, ...args};
};
export const is_update_bases = (action) => {
  return action.type === update_bases_type;
};
export const user_info_actions = {
  set_user,
  set_need_to_handle_password_recovery,
  set_users,
  update_chosen_base_id,
  update_bases
};
