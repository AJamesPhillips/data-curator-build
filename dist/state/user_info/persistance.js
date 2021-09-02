import {pick} from "../../shared/utils/pick.js";
import {get_persisted_state_object, persist_state_object} from "../persistence/persistence_utils.js";
import {ensure_chosen_index_is_valid} from "./utils.js";
export function user_info_persist(state) {
  const to_persist = pick([
    "solid_oidc_provider",
    "custom_solid_pod_URLs",
    "chosen_custom_solid_pod_URL_index"
  ], state.user_info);
  persist_state_object("user_info", to_persist);
}
export function user_info_starting_state(storage_location) {
  const obj = get_persisted_state_object("user_info");
  let state = {
    solid_oidc_provider: "",
    user_name: "",
    default_solid_pod_URL: "",
    custom_solid_pod_URLs: [],
    chosen_custom_solid_pod_URL_index: 0,
    ...obj
  };
  if (storage_location) {
    const index = state.custom_solid_pod_URLs.findIndex((url) => url === storage_location);
    if (state.default_solid_pod_URL === storage_location) {
      state.chosen_custom_solid_pod_URL_index = 0;
      state.custom_solid_pod_URLs = state.custom_solid_pod_URLs.filter((url) => url !== storage_location);
    } else if (index >= 0) {
      state.chosen_custom_solid_pod_URL_index = index + 1;
    } else {
      state.custom_solid_pod_URLs.push(storage_location);
      state.chosen_custom_solid_pod_URL_index = state.custom_solid_pod_URLs.length;
    }
  }
  state = ensure_chosen_index_is_valid(state);
  return state;
}
