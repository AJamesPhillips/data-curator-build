import {bounded} from "../../shared/utils/bounded.js";
import {update_state} from "../../utils/update_state.js";
export function ensure_chosen_index_is_valid(user_info, new_index) {
  const custom_solid_pod_URLs = user_info.custom_solid_pod_URLs.filter((u) => !!u);
  if (custom_solid_pod_URLs.length !== user_info.custom_solid_pod_URLs.length) {
    user_info = update_state(user_info, "custom_solid_pod_URLs", custom_solid_pod_URLs);
  }
  const index = new_index === void 0 ? user_info.chosen_custom_solid_pod_URL_index : new_index;
  let bounded_index = bounded(index, 0, user_info.custom_solid_pod_URLs.length);
  if (bounded_index !== index)
    bounded_index = 0;
  user_info = update_state(user_info, "chosen_custom_solid_pod_URL_index", bounded_index);
  return user_info;
}
export function ensure_chosen_index_is_valid_using_root(state, new_index) {
  const user_info = ensure_chosen_index_is_valid(state.user_info, new_index);
  state = update_state(state, "user_info", user_info);
  return state;
}
