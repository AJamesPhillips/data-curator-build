const update_solid_oidc_provider_type = "update_solid_oidc_provider";
const update_solid_oidc_provider = (args) => {
  return {type: update_solid_oidc_provider_type, ...args};
};
export const is_update_solid_oidc_provider = (action) => {
  return action.type === update_solid_oidc_provider_type;
};
const update_users_name_and_solid_pod_URL_type = "update_users_name_and_solid_pod_URL";
const update_users_name_and_solid_pod_URL = (args) => {
  return {type: update_users_name_and_solid_pod_URL_type, ...args};
};
export const is_update_users_name_and_solid_pod_URL = (action) => {
  return action.type === update_users_name_and_solid_pod_URL_type;
};
const update_custom_solid_pod_URLs_type = "update_custom_solid_pod_URLs";
const update_custom_solid_pod_URLs = (args) => {
  return {type: update_custom_solid_pod_URLs_type, ...args};
};
export const is_update_custom_solid_pod_URLs = (action) => {
  return action.type === update_custom_solid_pod_URLs_type;
};
const update_chosen_custom_solid_pod_URL_index_type = "update_chosen_custom_solid_pod_URL_index";
const update_chosen_custom_solid_pod_URL_index = (args) => {
  return {type: update_chosen_custom_solid_pod_URL_index_type, ...args};
};
export const is_update_chosen_custom_solid_pod_URL_index = (action) => {
  return action.type === update_chosen_custom_solid_pod_URL_index_type;
};
const ensure_solid_pod_URL_is_chosen_type = "ensure_solid_pod_URL_is_chosen";
const ensure_solid_pod_URL_is_chosen = (args) => {
  return {type: ensure_solid_pod_URL_is_chosen_type, ...args};
};
export const is_ensure_solid_pod_URL_is_chosen = (action) => {
  return action.type === ensure_solid_pod_URL_is_chosen_type;
};
export const user_info_actions = {
  update_solid_oidc_provider,
  update_users_name_and_solid_pod_URL,
  update_custom_solid_pod_URLs,
  update_chosen_custom_solid_pod_URL_index,
  ensure_solid_pod_URL_is_chosen
};
