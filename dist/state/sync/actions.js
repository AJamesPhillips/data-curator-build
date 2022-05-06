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
const request_searching_for_wcomponents_by_id_in_any_base_type = "request_searching_for_wcomponents_by_id_in_any_base";
const request_searching_for_wcomponents_by_id_in_any_base = (args) => {
  return {type: request_searching_for_wcomponents_by_id_in_any_base_type, ...args};
};
export const is_request_searching_for_wcomponents_by_id_in_any_base = (action) => {
  return action.type === request_searching_for_wcomponents_by_id_in_any_base_type;
};
const searching_for_wcomponents_by_id_in_any_base_type = "searching_for_wcomponents_by_id_in_any_base";
const searching_for_wcomponents_by_id_in_any_base = () => {
  return {type: searching_for_wcomponents_by_id_in_any_base_type};
};
export const is_searching_for_wcomponents_by_id_in_any_base = (action) => {
  return action.type === searching_for_wcomponents_by_id_in_any_base_type;
};
const searched_for_wcomponents_by_id_in_any_base_type = "searched_for_wcomponents_by_id_in_any_base";
const searched_for_wcomponents_by_id_in_any_base = (args) => {
  return {type: searched_for_wcomponents_by_id_in_any_base_type, ...args};
};
export const is_searched_for_wcomponents_by_id_in_any_base = (action) => {
  return action.type === searched_for_wcomponents_by_id_in_any_base_type;
};
export const sync_actions = {
  update_sync_status,
  debug_refresh_all_specialised_object_ids_pending_save,
  update_specialised_object_sync_info,
  update_network_status,
  request_searching_for_wcomponents_by_id_in_any_base,
  searching_for_wcomponents_by_id_in_any_base,
  searched_for_wcomponents_by_id_in_any_base
};
