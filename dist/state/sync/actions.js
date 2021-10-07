const update_sync_status_type = "update_sync_status";
const update_sync_status = (args) => {
  return {type: update_sync_status_type, ...args};
};
export const is_update_sync_status = (action) => {
  return action.type === update_sync_status_type;
};
const debug_refresh_all_specialised_object_ids_pending_save_type = "debug_refresh_all_specialised_object_ids_pending_save";
const debug_refresh_all_specialised_object_ids_pending_save = () => {
  return {type: debug_refresh_all_specialised_object_ids_pending_save_type};
};
export const is_debug_refresh_all_specialised_object_ids_pending_save = (action) => {
  return action.type === debug_refresh_all_specialised_object_ids_pending_save_type;
};
const update_specialised_object_sync_info_type = "update_specialised_object_sync_info";
const update_specialised_object_sync_info = (args) => {
  return {type: update_specialised_object_sync_info_type, ...args};
};
export const is_update_specialised_object_sync_info = (action) => {
  return action.type === update_specialised_object_sync_info_type;
};
const update_network_status_type = "update_network_status";
const update_network_status = (args) => {
  return {type: update_network_status_type, ...args};
};
export const is_update_network_status = (action) => {
  return action.type === update_network_status_type;
};
export const sync_actions = {
  update_sync_status,
  debug_refresh_all_specialised_object_ids_pending_save,
  update_specialised_object_sync_info,
  update_network_status
};
